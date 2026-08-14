/**
 * 方案 §16：无障碍分数 ≥ 90。这一条是它下面最容易悄悄退化的部分 ——
 * 文字对比度。
 *
 * Lighthouse 的 color-contrast 审计只看首屏、只抽样，改色板时不够用。这个脚本
 * 把两个站每一页 header / main / footer 里所有直接含文字的元素全走一遍，按
 * WCAG 2.1 AA 判定：正文 4.5:1，大字（≥24px，或 ≥18.66px 且 bold）3:1。
 *
 * 写它的直接原因：给 docstomd 换色板时发现改版前的 --ink-faint 在纸上只有
 * 3.98:1，不达标，而 112 条 Playwright 测试和 Lighthouse 都没报 —— 因为前者
 * 不查颜色，后者只抽查首屏。把旧值塞回去，这个脚本报 70 处。
 *
 * 跑之前两个站都要 build，两个 verify/serve.mjs 都要起着（3311 / 3312）。
 */
import { chromium } from "@playwright/test";

const SITES = [
  {
    name: "docstomd",
    origin: "http://localhost:3311",
    slugs: [
      "", "docx-to-markdown", "word-to-markdown", "pdf-to-markdown",
      "html-to-markdown", "csv-to-markdown", "excel-to-markdown",
      "google-docs-to-markdown", "pptx-to-markdown",
      "about", "contact", "privacy", "terms", "cookies",
      // 内容页有工具页没有的排版元素：眉标、示例前后对照、正文里的行内代码
      "guides",
      "guides/word-to-markdown-keep-formatting",
      "guides/pdf-to-markdown-layout",
      "guides/google-docs-to-markdown-paste",
      "guides/html-to-markdown-clean",
      "guides/csv-to-markdown-tables",
      "guides/excel-to-markdown-formulas",
    ],
  },
  {
    name: "docs2html",
    origin: "http://localhost:3312",
    slugs: [
      "", "markdown-to-html", "docx-to-html", "google-docs-to-html",
      "text-to-html", "csv-to-html-table", "excel-to-html-table",
      "about", "contact", "privacy", "terms", "cookies",
      "guides",
      "guides/markdown-tables-to-html",
      "guides/word-to-html-keep-formatting",
      "guides/google-docs-to-html-clean",
      "guides/plain-text-to-html-paragraphs",
      "guides/csv-to-html-table-large-files",
      "guides/excel-to-html-table-formulas",
    ],
  },
];

/**
 * 只跑英文。对比度是颜色和字号的函数，跟文案语言无关 —— 六种语言跑一遍
 * 是同样的色值配同样的 CSS，纯属把 25 页变成 150 页。唯一的例外是 CJK 字体
 * 的字形粗细差异，但 WCAG 的判据里没有这一项。
 */
async function auditPage(page, url) {
  await page.goto(url, { waitUntil: "networkidle" });
  // 折叠面板不展开的话，里面的文字根本不在 DOM 里（Base UI 的 Accordion 是
  // 真的不渲染收起的面板，不是 hidden），FAQ 那一整块就查不到。
  for (let i = 0; i < 40; i++) {
    const t = page
      .locator('[data-slot="accordion-trigger"][aria-expanded="false"]')
      .first();
    if (!(await t.count())) break;
    await t.click();
    await page.waitForTimeout(120);
  }
  return page.evaluate(() => {
    // 色板是 oklch，getComputedStyle 会返回 lab(...) 而不是 rgb(...)。直接用
    // 正则抠三个数会把 lab 的 L/a/b 当成 RGB 通道读 —— 黑字白底能算出 1.47。
    // 让浏览器自己转：画到 1×1 canvas 上取实际像素。
    const cv = document.createElement("canvas");
    cv.width = cv.height = 1;
    const cx = cv.getContext("2d", { willReadFrequently: true });
    const px = (css) => {
      cx.clearRect(0, 0, 1, 1);
      cx.fillStyle = "#000";
      cx.fillStyle = css; // 非法值被忽略，于是留下上一行的 #000
      cx.fillRect(0, 0, 1, 1);
      return [...cx.getImageData(0, 0, 1, 1).data];
    };
    const chan = (c) => {
      c /= 255;
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    };
    const lum = (css) => {
      const [r, g, b] = px(css);
      return 0.2126 * chan(r) + 0.7152 * chan(g) + 0.0722 * chan(b);
    };

    /** 往上找第一个基本不透明的背景。半透明的叠加不算，会低估对比度。 */
    const bgOf = (el) => {
      for (let n = el; n; n = n.parentElement) {
        const c = getComputedStyle(n).backgroundColor;
        if (px(c)[3] > 229) return c; // alpha > 0.9
      }
      return "rgb(255,255,255)";
    };

    const out = [];
    for (const el of document.querySelectorAll(
      "header *, main *, footer *",
    )) {
      // 只看直接持有文字的元素 —— 否则父容器会被算一遍，报告里全是重复
      if (!el.firstChild || el.firstChild.nodeType !== 3) continue;
      if (!el.textContent.trim() || !el.getClientRects().length) continue;
      const cs = getComputedStyle(el);
      if (cs.visibility === "hidden" || cs.opacity === "0") continue;

      const size = parseFloat(cs.fontSize);
      const bold = Number(cs.fontWeight) >= 700;
      const large = size >= 24 || (size >= 18.66 && bold);
      const need = large ? 3 : 4.5;

      const [hi, lo] = [lum(cs.color), lum(bgOf(el))].sort((a, b) => b - a);
      const ratio = (hi + 0.05) / (lo + 0.05);
      if (ratio < need) {
        out.push({
          text: el.textContent.trim().slice(0, 46),
          ratio: +ratio.toFixed(2),
          need,
          size,
          fg: cs.color,
          bg: bgOf(el),
        });
      }
    }
    return out;
  });
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
let failures = 0;
let pages = 0;

for (const site of SITES) {
  console.log(`\n── ${site.name} ${"─".repeat(46 - site.name.length)}`);
  for (const slug of site.slugs) {
    const url = `${site.origin}/${slug}${slug ? "/" : ""}`;
    const bad = await auditPage(page, url);
    pages++;
    const label = ("/" + slug + (slug ? "/" : "")).padEnd(26);
    if (!bad.length) {
      console.log(`  ✅ ${label}`);
      continue;
    }
    failures += bad.length;
    console.log(`  ❌ ${label} ${bad.length} 处`);
    for (const b of bad) {
      console.log(
        `       ${b.ratio} < ${b.need}  ${b.size}px  "${b.text}"\n` +
          `         ${b.fg} on ${b.bg}`,
      );
    }
  }
}

await browser.close();
console.log(
  failures
    ? `\n❌ ${pages} 个页面里有 ${failures} 处文字对比度不达 WCAG AA`
    : `\n✅ ${pages} 个页面，所有文字都过 WCAG AA（正文 4.5:1，大字 3:1）`,
);
process.exit(failures ? 1 : 0);
