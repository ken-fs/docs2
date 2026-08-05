/**
 * 跑 Lighthouse，对着方案 §16 的三条门槛报结果。
 *
 * 只测移动端：§16 写的是「移动端 Lighthouse Performance ≥ 90」，而移动端的
 * 节流配置远比桌面严 —— 桌面过了不代表移动端过。
 *
 * 测的是 out/ 里的静态文件（靠 verify/serve.mjs 起的服务），不是 next dev。
 * dev 模式带 HMR 和未压缩的包，分数没有参考价值。
 *
 * 抽样而不是全测：72 个 URL × 每个十几秒不现实，而同一个工具页的六个语言版本
 * 走的是同一份组件和同一个包，性能差异只来自文案长度。所以每站取「首页 + 最重
 * 的工具页 + 一个非英语版本 + 一个正式页面」四种形状。
 */
import { writeFileSync } from "node:fs";
import { spawn } from "node:child_process";

const TARGETS = [
  // [标签, URL]。挑的是形状不同的页面，不是随机抽的：
  { label: "docstomd home", url: "http://localhost:3311/" },
  // PDF 页是最重的一个：pdfjs 加 worker
  { label: "docstomd pdf-to-markdown", url: "http://localhost:3311/pdf-to-markdown/" },
  // 中文版：CJK 字体和更长的文案会影响 LCP
  { label: "docstomd zh-cn docx", url: "http://localhost:3311/zh-cn/docx-to-markdown/" },
  { label: "docstomd privacy", url: "http://localhost:3311/privacy/" },
  { label: "docs2html home", url: "http://localhost:3312/" },
  { label: "docs2html docx-to-html", url: "http://localhost:3312/docx-to-html/" },
  { label: "docs2html ja markdown", url: "http://localhost:3312/ja/markdown-to-html/" },
  { label: "docs2html privacy", url: "http://localhost:3312/privacy/" },
];

/** 方案 §16 的分数门槛。 */
const FLOOR = { performance: 90, seo: 95, accessibility: 90 };
/** 方案 §16 的 Core Web Vitals 预算。这三条以前只打印不判定，现在算达标条件。 */
const BUDGET = { lcpMs: 2500, cls: 0.1, tbtMs: 200 };

/**
 * 两种节流方式各跑一遍，Core Web Vitals 取 devtools 那遍的。
 *
 * Lighthouse 默认的 simulate（Lantern）在 localhost 上量 LCP 会虚高，而且是
 * 系统性的：它先在无节流的真实网络上跑，再把请求图套上慢4G参数换算。localhost
 * 零延迟，260KB 的首屏资源全在 67ms 内到齐，Lantern 于是把整包 JS 都当成 LCP
 * 的前置依赖，按 184KB/s 算出 1400ms 的下载时间加进 LCP。症状很好认：八个页面
 * 全是 2594–2606ms（彼此相差不到 12ms，静态法律页和 pdfjs 页同分）、
 * observedLargestContentfulPaint 只有 67ms、LCP 恰好等于 interactive、
 * largest-contentful-paint-element 认不出元素。线上有真实 RTT 时资源是错开
 * 到达的，文字早画完了，依赖图不会这么大。
 *
 * devtools 是真开着慢4G跑，观测到的就是观测到的 —— 同样八个页面 1537–1613ms。
 * 所以 CWV 判 devtools 那遍。
 *
 * 分数仍然看 simulate，因为 Lighthouse 的分数曲线是按 Lantern 校准的，而且
 * PageSpeed Insights 的实验室数据也用 Lantern —— 报告出去要对得上。
 * 分数在 simulate 下本来就过（97–100），虚高的 LCP 只扣掉了几分。
 */
function run(url, extra = []) {
  return new Promise((resolve, reject) => {
    const args = [
      url,
      "--quiet",
      "--output=json",
      "--output-path=stdout",
      "--only-categories=performance,seo,accessibility,best-practices",
      "--form-factor=mobile",
      "--screenEmulation.mobile",
      // 无头 + 关掉扩展和后台流量，免得别的东西干扰计时
      '--chrome-flags=--headless=new --no-sandbox --disable-extensions --disable-background-networking',
      ...extra,
    ];
    const child = spawn("npx", ["--no-install", "lighthouse", ...args], {
      stdio: ["ignore", "pipe", "pipe"],
    });
    let out = "";
    let err = "";
    child.stdout.on("data", (d) => (out += d));
    child.stderr.on("data", (d) => (err += d));
    child.on("close", (code) => {
      if (code !== 0) return reject(new Error(`lighthouse exited ${code}: ${err.slice(-800)}`));
      try {
        resolve(JSON.parse(out));
      } catch (e) {
        reject(new Error(`unparseable report: ${String(e)} / ${out.slice(0, 300)}`));
      }
    });
  });
}

const rows = [];
for (const { label, url } of TARGETS) {
  process.stdout.write(`running ${label} … `);
  try {
    const report = await run(url);
    const real = await run(url, ["--throttling-method=devtools"]);
    const score = (id) => Math.round((report.categories[id]?.score ?? 0) * 100);
    const audit = (rep, id) => rep.audits[id]?.numericValue;
    const row = {
      label,
      url,
      performance: score("performance"),
      seo: score("seo"),
      accessibility: score("accessibility"),
      bestPractices: score("best-practices"),
      // §16 的三个 Core Web Vitals，取真节流那遍（见上面 run() 的注释）。
      // TBT 是实验室里对 INP 的代理指标 —— INP 要真人交互才有，Lighthouse 给不出。
      lcpMs: Math.round(audit(real, "largest-contentful-paint") ?? -1),
      cls: Number((audit(real, "cumulative-layout-shift") ?? -1).toFixed(3)),
      tbtMs: Math.round(audit(real, "total-blocking-time") ?? -1),
      // Lantern 那遍的 LCP 也留着：跟上面差一倍是正常的，别当成回归
      lcpSimulatedMs: Math.round(audit(report, "largest-contentful-paint") ?? -1),
      // 分数没过时用来定位原因
      failed: Object.entries(report.audits)
        .filter(([, a]) => a.score !== null && a.score < 0.9 && a.scoreDisplayMode !== "informative")
        .map(([id]) => id),
    };
    rows.push(row);
    const bad = [
      ...["performance", "seo", "accessibility"].filter((k) => row[k] < FLOOR[k]),
      ...Object.keys(BUDGET).filter((k) => row[k] > BUDGET[k]),
    ];
    console.log(
      `P ${row.performance} SEO ${row.seo} A11y ${row.accessibility} BP ${row.bestPractices} ` +
        `| LCP ${row.lcpMs}ms (Lantern ${row.lcpSimulatedMs}) CLS ${row.cls} TBT ${row.tbtMs}ms ` +
        `${bad.length ? `❌ ${bad.join(",")}` : "✓"}`,
    );
  } catch (e) {
    console.log(`FAILED: ${String(e).slice(0, 200)}`);
    rows.push({ label, url, error: String(e) });
  }
}

writeFileSync(
  new URL("./lighthouse-report.json", import.meta.url),
  JSON.stringify({ floor: FLOOR, budget: BUDGET, rows }, null, 2),
);

const failing = rows.filter(
  (r) =>
    r.error ||
    ["performance", "seo", "accessibility"].some((k) => r[k] < FLOOR[k]) ||
    Object.keys(BUDGET).some((k) => r[k] > BUDGET[k]),
);
console.log(`\n${rows.length - failing.length}/${rows.length} 达标`);
for (const r of failing) {
  const why =
    r.error ??
    `P${r.performance}/SEO${r.seo}/A${r.accessibility} LCP${r.lcpMs}/CLS${r.cls}/TBT${r.tbtMs}`;
  console.log(`  ✗ ${r.label}: ${why}`);
  if (r.failed?.length) console.log(`      ${r.failed.slice(0, 12).join(", ")}`);
}
process.exit(failing.length ? 1 : 0);
