/**
 * 方案 §17 里两条只有换浏览器才能验的：
 *
 *   「Chrome / Safari / Edge / Firefox 可完成基本转换」
 *   「移动端可以上传、复制和下载」
 *
 * 主测试套件（apps/*​/verify/site.spec.ts）跑的是 Desktop Chrome 一种，一百多条
 * 断言全压在同一个引擎上 —— 那些细节（Indicator 位移、剪贴板、下载文件名）也
 * 只有 Chromium 值得那么细测。这个脚本反过来：断言少，引擎多，只证「基本转换
 * 这条路在每个引擎上都走得通」。
 *
 * 引擎而不是浏览器：Edge 和 Chrome 同是 Blink + V8，Edge 在 Chromium 之上加的
 * 是界面和企业策略，不改 File API、Web Worker、Blob 下载这些我们用到的东西。
 * 这台机器上没装 Edge（Playwright 的 msedge channel 要求本机装了才能跑），所以
 * 它是靠「与 Chrome 同引擎」覆盖的，不是真跑过 —— 下面会照实打印出来。
 * Safari 用 WebKit 引擎覆盖，这是 Playwright 能给的最接近的东西。
 *
 * 跑之前两个站都要 build，两个 verify/serve.mjs 都要起着（3311 / 3312）。
 */
import { chromium, firefox, webkit, devices } from "@playwright/test";
import { existsSync } from "node:fs";
import path from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const FIX_A = path.join(ROOT, "apps/docstomd/verify/fixtures");
const FIX_B = path.join(ROOT, "apps/docs2html/verify/fixtures");

/**
 * 每个站一个「基本转换」用例。
 *
 * 选 .docx 是因为它是两个站最主要的入口，而且是最难的那条链：解 zip、读 XML、
 * 过 DOMPurify、再转出去。它能过，CSV 那种纯文本解析不可能不过。
 */
const CASES = [
  {
    site: "docstomd",
    url: "http://localhost:3311/",
    file: path.join(FIX_A, "rich.docx"),
    // Markdown 产物里必须出现的东西：标题、表格、强调 —— 三种不同的转换规则
    expect: ["# Quarterly Report", "| Region |", "**bold**"],
    downloadExt: /\.md$/,
  },
  {
    site: "docs2html",
    url: "http://localhost:3312/docx-to-html/",
    file: path.join(FIX_B, "rich.docx"),
    // HTML 产物：语义标签，而不是 Word 那堆 mso- 样式
    expect: ["<h1>", "<table>", "<strong>"],
    downloadExt: /\.html?$/,
  },
];

/**
 * 引擎清单。channel: "chrome" 是本机真的 Google Chrome，不是 Playwright 自带的
 * Chromium —— §17 写的是 Chrome，那就真拿 Chrome 跑一遍，两者的媒体解码和
 * 部分 API 开关确实不完全一样。
 */
const ENGINES = [
  { name: "Chromium", launcher: chromium, opts: {} },
  { name: "Chrome", launcher: chromium, opts: { channel: "chrome" }, optional: true },
  { name: "Firefox", launcher: firefox, opts: {} },
  { name: "WebKit (Safari)", launcher: webkit, opts: {} },
];

/** 移动端那条：用 iPhone 的视口和 UA 跑一遍 WebKit，证明小屏也能上传/复制/下载。 */
const MOBILE = { name: "WebKit / iPhone 14", launcher: webkit, opts: {}, context: devices["iPhone 14"] };

const problems = [];
const skipped = [];

/** 在一个 context 里把一个 case 走完：上传 → 出结果 → 复制 → 下载。 */
async function runCase(engine, ctx, c) {
  const page = await ctx.newPage();
  const label = `${engine} · ${c.site}`;

  // 转换必须完全在本地：任何跨源请求都说明文件被传出去了（§17「文件没有上传服务器」）
  const external = [];
  page.on("request", (r) => {
    const u = new URL(r.url());
    if (u.hostname !== "localhost" && u.protocol !== "data:" && u.protocol !== "blob:") {
      external.push(r.url());
    }
  });

  await page.goto(c.url, { waitUntil: "load" });
  await page.locator("input[type=file]").setInputFiles(c.file);

  // 源码框出现即视为转换完成。15s 是给 WebKit 留的余量 —— 它解 zip 比 V8 慢。
  const pre = page.locator("pre").first();
  await pre.waitFor({ state: "visible", timeout: 15_000 });
  const out = await pre.innerText();

  const missing = c.expect.filter((s) => !out.includes(s));
  if (missing.length) {
    problems.push(`${label}: 产物缺少 ${missing.join(" / ")}`);
  }

  // 下载。这条在每个引擎上都要过 —— Blob + a[download] 的行为是有差异的，
  // 尤其 WebKit 历史上对 download 属性和文件名的处理跟 Blink 不一样。
  const btn = page
    .getByRole("button", { name: /download|下载|下載|descargar|baixar|ダウンロード/i })
    .first();
  try {
    const [dl] = await Promise.all([
      page.waitForEvent("download", { timeout: 15_000 }),
      btn.click(),
    ]);
    if (!c.downloadExt.test(dl.suggestedFilename())) {
      problems.push(`${label}: 下载文件名 ${dl.suggestedFilename()} 不符合 ${c.downloadExt}`);
    }
  } catch (e) {
    problems.push(`${label}: 下载失败 ${String(e).slice(0, 120)}`);
  }

  // 复制。
  //
  // 点完之后必须拿 elementHandle 读状态，不能再用 getByRole 那个 locator 读 ——
  // 按钮文案本身就是状态（"Copy" → "copied"），而 "copied" 里没有 "copy" 这个
  // 子串，于是按可访问名字匹配的 locator 在点击后匹配数直接变成 0，重新解析时
  // 要么超时要么落到页面上别的带 copy 字样的元素上。我第一版就是这么写的，四个
  // 引擎里三个报「点了复制但按钮没进入已复制状态」，而 MutationObserver 明明看到
  // 文案变成了 copied —— 假故障，出在选择器不是出在产品。handle 是点击前拿的，
  // 指向同一个 DOM 节点，文案怎么变都还指着它。
  const copyBtn = await page
    .getByRole("button", { name: /copy|复制|複製|copiar|コピー/i })
    .first()
    .elementHandle();
  const labelBefore = await copyBtn.evaluate((el) => el.innerText.trim());
  await copyBtn.click();

  // 「文案变了」就是证据：变了说明 onClick 跑完、navigator.clipboard.writeText
  // 没抛、setCopied(true) 生效了。这个判据不认具体文案，六种语言通用。
  // 注意 1600ms 后状态会自己复位成 "Copy"，所以要在那之前读完。
  let flipped = false;
  for (let i = 0; i < 12 && !flipped; i++) {
    flipped = (await copyBtn.evaluate((el) => el.innerText.trim())) !== labelBefore;
    if (!flipped) await page.waitForTimeout(60);
  }
  if (!flipped) problems.push(`${label}: 点了复制但按钮文案没变（仍是 ${labelBefore}）`);

  // 能读剪贴板的引擎再核对一次内容。只有 Chromium 给得了这个权限 ——
  // Firefox 和 WebKit 下 readText 会抛，那就只能靠上面的文案判据。
  // readText 必须带超时。无头 Chromium 在系统剪贴板为空时这个 promise 不 resolve
  // 也不 reject，就那么挂着 —— 验证这个检查本身能不能失败的时候撞上过：把上面
  // 那次 click 注掉，整个脚本在这一行卡到十分钟超时被打断。产品正常时剪贴板里
  // 有东西，读得到，所以平时看不出来；正是「测试失败的那条路」上才会挂。
  const clip = await Promise.race([
    page.evaluate(() => navigator.clipboard.readText()).catch(() => null),
    page.waitForTimeout(3000).then(() => null),
  ]);
  if (clip !== null) {
    if (!clip.includes(c.expect[0])) {
      problems.push(`${label}: 剪贴板内容不对（拿到 ${clip.slice(0, 60)}）`);
    }
  } else {
    skipped.push(`${engine}: 剪贴板内容未核对（该引擎不给读权限），只验了按钮状态变化`);
  }

  if (external.length) {
    problems.push(`${label}: 转换过程发出了跨源请求 ${external.slice(0, 3).join(", ")}`);
  }

  await page.close();
  return out.length;
}

console.log("=== 桌面引擎");
for (const eng of ENGINES) {
  let browser;
  try {
    browser = await eng.launcher.launch(eng.opts);
  } catch (e) {
    if (eng.optional) {
      skipped.push(`${eng.name}: 本机没装，跳过（${String(e).slice(0, 80)}）`);
      console.log(`  – ${eng.name} 跳过：本机没装`);
      continue;
    }
    problems.push(`${eng.name}: 起不来 ${String(e).slice(0, 120)}`);
    continue;
  }
  // 剪贴板权限只有 Chromium 认。WebKit 上 grantPermissions 本身不抛 ——
  // 它把权限记下来，等到 newPage 的时候才报 "Unknown permission: clipboard-write"，
  // 而且这个 context 从此每次 newPage 都抛，等于整个引擎的用例全废。所以按引擎
  // 决定要不要给，不能靠在 grant 那一行 catch。
  const ctx = await browser.newContext();
  if (eng.launcher === chromium) {
    await ctx.grantPermissions(["clipboard-read", "clipboard-write"]);
  }
  const before = problems.length;
  for (const c of CASES) {
    const n = await runCase(eng.name, ctx, c).catch((e) => {
      problems.push(`${eng.name} · ${c.site}: 抛了 ${String(e).slice(0, 160)}`);
      return -1;
    });
    if (n > 0) console.log(`  ✓ ${eng.name} · ${c.site} 产物 ${n} 字`);
  }
  if (problems.length > before) console.log(`  ✗ ${eng.name} 有 ${problems.length - before} 处问题`);
  await browser.close();
}

console.log("=== 移动端（§17「移动端可以上传、复制和下载」）");
{
  const browser = await MOBILE.launcher.launch(MOBILE.opts);
  const ctx = await browser.newContext(MOBILE.context);
  for (const c of CASES) {
    const n = await runCase(MOBILE.name, ctx, c).catch((e) => {
      problems.push(`${MOBILE.name} · ${c.site}: 抛了 ${String(e).slice(0, 160)}`);
      return -1;
    });
    if (n > 0) console.log(`  ✓ ${MOBILE.name} · ${c.site} 产物 ${n} 字`);
  }
  await browser.close();
}

if (skipped.length) {
  console.log("\n未覆盖到的部分（照实记下来，不算通过也不算失败）:");
  for (const s of new Set(skipped)) console.log(`  · ${s}`);
}
console.log(
  "  · Edge：本机未安装，靠「与 Chrome 同为 Blink 引擎」覆盖，不是真跑过",
);

console.log(`\n${problems.length ? `❌ ${problems.length} 处问题` : "✅ 各引擎基本转换都通过"}`);
for (const p of problems) console.log(`  ✗ ${p}`);
process.exit(problems.length ? 1 : 0);
