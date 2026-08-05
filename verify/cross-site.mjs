/**
 * 方案 §17 的最后几条里，有一条是任何单站测试都测不到的：
 *
 *   「两个网站的正文内容不是互相复制。」
 *
 * 这条必须同时看两个站才有意义，所以放在这儿而不是各自的 site.spec.ts 里。
 * 跑之前两个站都要 build，而且两个 verify/serve.mjs 都要起着（3311 / 3312）。
 *
 * 判据是句子级的重合率，不是整页比对：两个站的页头页脚、法律条款、按钮文案
 * 本来就该像 —— 同一个作者做的两个工具站，「拖进来，转换，复制」这种话没有
 * 第二种写法。真正不能重合的是「正文」：讲这个格式怎么转、有什么坑的那部分，
 * 也就是方案 §8.7 要求「不同工具页必须有格式特有的内容，而不是换关键词」的
 * 那些段落。所以这里只比 main 里的正文段落，且排除 §8.7 之外的公共结构。
 */
import { chromium } from "@playwright/test";

const A = "http://localhost:3311"; // docstomd
const B = "http://localhost:3312"; // docs2html

const SLUGS_A = [
  "", "docx-to-markdown", "word-to-markdown", "pdf-to-markdown",
  "html-to-markdown", "csv-to-markdown", "excel-to-markdown",
  "google-docs-to-markdown",
];
const SLUGS_B = [
  "", "markdown-to-html", "docx-to-html", "google-docs-to-html",
  "text-to-html", "csv-to-html-table", "excel-to-html-table",
];

/**
 * 六种语言全查，不是只查英文。
 *
 * 一开始只查了英文，然后发现 CSV 和 Excel 两对页面确实在跨站互抄；改完英文
 * 再想，抄的是「先写英文再翻译」这条流水线的源头 —— 六份译文全都跟着抄了一遍。
 * 只查英文的话，改完英文这个检查就绿了，而线上五种语言仍然是复制品。
 */
const LOCALES = ["", "zh-cn", "zh-tw", "es", "pt", "ja"];

const pathOf = (locale, slug) =>
  "/" + [locale, slug].filter(Boolean).join("/") + (locale || slug ? "/" : "");

/** 句子级重合率的上限。超过就说明正文在互相抄。 */
const MAX_OVERLAP = 0.2;
/**
 * 重合句数的上限，和上面的比率是「或」的关系 —— 任一条超了就算抄。
 *
 * 光看比率抓不住真实的抄袭。实际验过一次：把 docstomd 那份 CSV「支持什么」
 * 列表六条原样抄进 docs2html，检查器确实认出了六句重合，但一页有三十多句，
 * 6/36 = 17%，压在 20% 底下，报绿。
 *
 * 也就是说抄一整段（正好是复制粘贴最自然的粒度）永远不会超过比率线 —— 页面
 * 越长越安全，方向完全反了。四句是「碰巧撞车」和「整段搬过来」之间的分界：
 * 三句以内可能是两页都得提同一个客观限制，四句连着就是复制了。
 */
const MAX_SHARED = 4;
/**
 * 太短的句子不算 —— "Copy" "Download HTML" 这种必然重合，也没必要不重合。
 *
 * 中日文按字数、西文按词数，两套阈值。中日文不用空格断词，
 * `split(" ").length` 对一整句中文永远返回 1，全站的句子会被这个过滤器
 * 一句不留地筛掉 —— 那样中日文页面就是零句参与比对，「没抄」是假的。
 */
const MIN_WORDS = 6;
const MIN_CJK_CHARS = 12;
const CJK = /[぀-ヿ㐀-䶿一-鿿]/;

function longEnough(s) {
  return CJK.test(s) ? s.length >= MIN_CJK_CHARS : s.split(" ").length >= MIN_WORDS;
}

const browser = await chromium.launch();

/** 抓一页正文里的句子。页头页脚不算，那是公共结构。 */
async function sentencesOf(origin, path) {
  const page = await browser.newPage();
  const res = await page.goto(origin + path, { waitUntil: "load" });
  if (res.status() !== 200) throw new Error(`${origin}${path} → ${res.status()}`);

  // FAQ 必须先全部展开再读。手风琴收起来的时候答案那个 <div> 根本不在 DOM 里
  // （不是 hidden，是没渲染），只有默认展开的第一条读得到 —— 六条答案里五条
  // 看不见。而 FAQ 正好是 §8.7 正文里最长、最容易「复制上一页改几个词」的部分,
  // 漏掉它等于这个检查只看了一半。
  const triggers = page.locator('#faq [data-slot="accordion-trigger"][aria-expanded="false"]');
  for (let i = await triggers.count(); i > 0; i--) {
    // 每点一次剩下的 aria-expanded="false" 就少一个，所以始终点第一个
    await triggers.first().click();
  }
  await page.waitForTimeout(150); // 展开有过渡动画，等它把内容挂上去
  const text = await page.evaluate(() => {
    const main = document.querySelector("main");
    if (!main) return "";
    // 先整段砍掉三块「每页一模一样」的结构，它们不是 §8.7 说的正文：
    //
    //   #convert  转换器本体。拖放提示、开关说明来自同一份 converter 字典，
    //             每页字字相同 —— 「Dozens at a time is fine.」这种话不可能
    //             也不应该每页换一种写法。
    //   #cleans   清理清单（docs2html）和
    //   #keeps    保留清单（docstomd），两者是镜像关系，文案都取自
    //             dict.chrome 而不是 dict.pages —— 也就是说结构上就每页一样。
    //   #related  交叉链接卡片，就是同一份工具清单，本来就该每页都有。
    //
    // 不砍的话这三块能让任意两个工具页凭空得到三成重合率，真正该看的
    // 「怎么用 / 支持什么 / 限制是什么」反而被淹掉。
    for (const el of main.querySelectorAll("#convert, #cleans, #keeps, #related")) el.remove();
    // 标了 data-shared 的 FAQ 条目同理：「我的文件会上传吗」这种问题每页都得有，
    // 也不该为了避嫌而每页换一种说法。哪几条算公用写在字典数据里（Faq.shared），
    // 不由这个脚本猜 —— 猜的话早晚把真抄袭当公用条目放过去。
    for (const el of main.querySelectorAll("#faq [data-shared]")) el.remove();
    // 剩下的正文里还有代码框（FAQ 示例）和表单控件，不算正文。
    //
    // button 这里故意不删：FAQ 的问题文字就在 <button> 里（手风琴的触发器），
    // 而问题跟答案一样是写出来的正文 —— 「Do I get the formula or the answer?」
    // 抄过去也是抄。删了就等于只比答案不比问题。
    for (const el of main.querySelectorAll("select, option, pre, code, input, label, nav"))
      el.remove();
    // 必须用 innerText 而不是 textContent。textContent 把相邻块级元素直接
    // 拼在一起 —— 标题会和它下面的第一段黏成 "CSV → MarkdownCSV to a
    // Markdown table."，几个段落连成一个 170 词的怪句子。这种怪句子跨页
    // 永远不会完全相同，重合率于是恒等于 0，测出来「没抄」是假的。
    // innerText 按渲染结果换行，句子边界才是真的。
    return main.innerText;
  });
  await page.close();

  return new Set(
    text
      .split(/(?<=[.!?。！？])\s+|\n+/)
      .map((s) => s.replace(/\s+/g, " ").trim().toLowerCase())
      .filter(longEnough),
  );
}

const overlap = (a, b) => {
  const shared = [...a].filter((s) => b.has(s));
  const floor = Math.min(a.size, b.size);
  return { shared, rate: floor ? shared.length / floor : 0 };
};

const problems = [];

function report(kind, la, pa, lb, pb, a, b) {
  const { shared, rate } = overlap(a, b);
  if (rate <= MAX_OVERLAP && shared.length <= MAX_SHARED) return false;
  const tag = `${kind} ${la || "en"}${pa} × ${lb || "en"}${pb}`;
  problems.push(`${tag}: ${(rate * 100).toFixed(0)}% (${shared.length} 句)`);
  console.log(`  ✗ ${tag}  ${(rate * 100).toFixed(0)}% / ${shared.length} 句`);
  for (const s of shared.slice(0, 3)) console.log(`      "${s.slice(0, 90)}"`);
  return true;
}

// 每种语言各自成一组比。跨语言比没有意义 —— 中文页和英文页不可能有相同句子。
for (const locale of LOCALES) {
  console.log(`\n######## ${locale || "en"}`);
  const setsA = new Map();
  const setsB = new Map();
  for (const s of SLUGS_A) setsA.set(pathOf(locale, s), await sentencesOf(A, pathOf(locale, s)));
  for (const s of SLUGS_B) setsB.set(pathOf(locale, s), await sentencesOf(B, pathOf(locale, s)));

  // 1. 跨站：docstomd 的每一页 vs docs2html 的每一页
  let bad = 0;
  console.log("=== 跨站重合（docstomd × docs2html）");
  for (const [pa, sa] of setsA) {
    for (const [pb, sb] of setsB) {
      if (report("跨站", locale, pa, locale, pb, sa, sb)) bad++;
    }
  }
  if (!bad) console.log("  ✓ 没有超标的组合");

  // 2. 站内：方案 §8.7「不同工具页必须有格式特有的内容，而不是换关键词」
  //    同一个站里两个工具页互相抄，比跨站抄更容易发生 —— 复制上一页改几个词最省事
  for (const [label, sets] of [["docstomd", setsA], ["docs2html", setsB]]) {
    console.log(`=== 站内重合（${label} 工具页之间）`);
    const entries = [...sets];
    bad = 0;
    for (let i = 0; i < entries.length; i++) {
      for (let j = i + 1; j < entries.length; j++) {
        const [pi, si] = entries[i];
        const [pj, sj] = entries[j];
        if (report(`站内 ${label}`, locale, pi, locale, pj, si, sj)) bad++;
      }
    }
    if (!bad) console.log("  ✓ 没有超标的组合");
  }

  // 顺带报一下正文体量：AdSense 审核和 SEO 都看这个，太薄的页面单独拎出来
  const thin = [];
  for (const [label, sets] of [["docstomd", setsA], ["docs2html", setsB]]) {
    for (const [p, s] of sets) if (s.size < 12) thin.push(`${label}${p}(${s.size})`);
  }
  if (thin.length) console.log(`=== 正文偏薄（少于 12 句）：${thin.join(" ")}`);
}

await browser.close();

console.log(`\n${problems.length ? `❌ ${problems.length} 处超标` : "✅ 正文没有互相复制"}`);
process.exit(problems.length ? 1 : 0);
