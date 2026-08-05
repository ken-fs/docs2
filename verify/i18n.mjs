/**
 * 方案 §17：「六种语言不存在明显漏翻。」
 *
 * 查的是构建出来的 HTML，不是字典源码 —— 字典里有值不代表页面上用的是它，
 * 漏翻的典型样子恰恰是「字典里加了 ja 的键，组件里却写死了英文」或者「翻译时
 * 整段漏掉，键还在，值直接复制了英文」。只有看渲染结果才抓得到。
 *
 * 判据是「同一个 DOM 位置上，非英语页面的文字和英语页面逐字相同」。按位置比而
 * 不是按集合比，是因为集合比会漏掉一类真漏翻：某个键翻了、另一个键漏了，但两者
 * 文字碰巧一样时，集合比看不出差别。
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
      "google-docs-to-markdown",
      // 正式页面也要查：AdSense 审核会看，而它们最容易被漏在翻译流程外面
      "about", "contact", "privacy", "terms", "cookies",
      // 内容页的字数是工具页的好几倍，漏翻一段的概率也高好几倍
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

const LOCALES = ["zh-cn", "zh-tw", "es", "pt", "ja"];

const pathOf = (locale, slug) =>
  "/" + [locale, slug].filter(Boolean).join("/") + (locale || slug ? "/" : "");

/**
 * 允许和英文一样的东西。
 *
 * 这些不是漏翻，翻了反而是错的：格式名和扩展名是专有名词（把 Markdown 译成
 * 「标记语言」用户就搜不到了），品牌名同理，纯符号和数字没有语言。
 *
 * 这个名单必须窄。放宽一格就等于把真漏翻也放过去 —— 所以它只匹配「整条文字
 * 就是这个词」，不做包含匹配：一句话里出现 Markdown 不代表这句话不用翻。
 */
const PROPER = new Set(
  [
    "markdown", "md", "html", "csv", "tsv", "pdf", "docx", "doc", "xlsx", "excel",
    "word", "google docs", "docstomd", "docs2html", "docstomd.com",
    "docs2html.com", "adsense", "cloudflare", "github", "email", "zip",
    ".md", ".html", ".htm", ".docx", ".doc", ".csv", ".tsv", ".xlsx", ".pdf",
    "mammoth", "turndown", "markdown-it", "dompurify", "pdf.js", "utf-8",
    "commonmark", "gfm", "mit", "bsd", "apache", "mpl",
  ].map((s) => s.toLowerCase()),
);

/** 至少要有几个字母才算「话」。"25 MB" "Ctrl+V" "→" 这种不算。 */
const MIN_LETTERS = 12;

/**
 * 「格式名 → 格式名」这种整条文字。
 *
 * 页面上 H1 上面那行小字（eyebrow）就是这个形状：`DOCX → Markdown`、
 * `Google Docs → MD`。它六种语言都不翻，这是故意的而且是一致的 —— 六份字典里
 * 同一个键都写着格式名，只有 home 那条泛指的（Documents / 文档 / 文書 /
 * Documentos）才翻。用户搜的就是 "docx to markdown"，把箭头两边译过去等于
 * 把关键词从页面上拿掉。
 *
 * 判据是「箭头两边分别都是专有名词」，而不是把 "Google Docs → MD" 整条塞进
 * PROPER 名单。名单那么写要穷举所有组合（两个站十几个页面几十种搭配），漏一个
 * 就误报一次；而放宽成「包含专有名词就放过」又会把 "Drop a .docx here" 这种真
 * 该翻的句子也放过去。拆箭头两边各自判定，正好卡在中间。
 */
const ARROW = /\s*(?:→|->|➔|＞|>)\s*/;

function isFormatPair(t) {
  const parts = t.split(ARROW);
  if (parts.length < 2) return false;
  return parts.every((p) => PROPER.has(p.trim().toLowerCase()));
}

/** 邮箱地址没有语言。整条就是一个邮箱时放过，句子里带邮箱不放过。 */
const EMAIL_ONLY = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isProse(s) {
  const t = s.trim();
  if (PROPER.has(t.toLowerCase())) return false;
  if (isFormatPair(t)) return false;
  if (EMAIL_ONLY.test(t)) return false;
  // 数一下拉丁字母。少于 MIN_LETTERS 的当成标签、数字、符号
  const letters = (t.match(/[A-Za-z]/g) ?? []).length;
  return letters >= MIN_LETTERS;
}

/**
 * 把一页上「有文字的叶子元素」按文档顺序抓下来，带上定位路径。
 *
 * 只取叶子（没有元素子节点的那些）是为了不把同一句话数好几遍 —— 取父元素的话
 * 一句话会在 div/p/span 三层各出现一次，漏翻数量凭空翻三倍。
 */
async function proseOf(page, origin, path) {
  const res = await page.goto(origin + path, { waitUntil: "load" });
  if (res.status() !== 200) throw new Error(`${origin}${path} → ${res.status()}`);

  // FAQ 收起来的时候答案不在 DOM 里（Base UI 是不渲染，不是 hidden），
  // 而 FAQ 的答案是页面上最长的散文，也是最容易整段漏翻的地方。先全部展开。
  const triggers = page.locator('#faq [data-slot="accordion-trigger"][aria-expanded="false"]');
  for (let i = await triggers.count(); i > 0; i--) await triggers.first().click();
  await page.waitForTimeout(150);

  return page.evaluate(() => {
    const out = [];
    const walk = (el, trail) => {
      // svg 里面是图标路径，不是文字
      if (el.tagName === "SVG" || el.closest("svg")) return;
      // <pre> 里是代码样例：转换器的真实输入和输出。它六种语言必须逐字一样 ——
      // 「| Part | Qty |」翻成「| 零件 | 数量 |」就不再是这个转换器会吐出的东西，
      // 而样例的全部价值就在于它是真的。这不是漏翻，翻了才是错。
      //
      // 排除整棵 <pre> 子树，不是只跳过 <pre> 这一个节点：里面还套着 <code>，
      // 而叶子文字在 <code> 上，跳过父节点等于什么都没排除。
      if (el.tagName === "PRE" || el.closest("pre")) return;
      const kids = [...el.children];
      if (kids.length === 0) {
        const t = el.innerText?.trim();
        if (t) out.push({ path: trail, text: t });
        return;
      }
      kids.forEach((k, i) => walk(k, `${trail}/${k.tagName.toLowerCase()}[${i}]`));
      // 元素既有子元素、又有自己的直接文字节点（例如 <li>文字<span>…</span></li>）
      for (const n of el.childNodes) {
        if (n.nodeType === 3 && n.textContent.trim()) {
          out.push({ path: `${trail}#text`, text: n.textContent.trim() });
        }
      }
    };
    for (const root of ["main", "header", "footer"]) {
      const el = document.querySelector(root);
      if (el) walk(el, root);
    }
    // <title> 和 meta description 也要翻，而且它们直接进搜索结果
    out.push({ path: "head/title", text: document.title });
    const d = document.querySelector('meta[name="description"]')?.content;
    if (d) out.push({ path: "head/description", text: d });
    return out;
  });
}

const browser = await chromium.launch();
const problems = [];

for (const site of SITES) {
  console.log(`\n######## ${site.name}`);
  for (const slug of site.slugs) {
    const page = await browser.newPage();
    const en = await proseOf(page, site.origin, pathOf("", slug));
    const enByPath = new Map(en.map((e) => [e.path, e.text]));

    for (const locale of LOCALES) {
      const loc = await proseOf(page, site.origin, pathOf(locale, slug));
      const leaked = [];
      for (const { path, text } of loc) {
        const enText = enByPath.get(path);
        // 同一位置、逐字相同、而且是句子 —— 那就是没翻
        if (enText && enText === text && isProse(text)) leaked.push(text);
      }
      const label = `${site.name} ${locale}${pathOf(locale, slug)}`;
      if (leaked.length) {
        problems.push(`${label}: ${leaked.length} 处`);
        console.log(`  ✗ ${label}  ${leaked.length} 处未翻`);
        for (const s of leaked) console.log(`      "${s.slice(0, 88)}"`);
      }
    }
    await page.close();
    process.stdout.write(`  · ${pathOf("", slug)} 查完\n`);
  }
}

await browser.close();
console.log(`\n${problems.length ? `❌ ${problems.length} 个页面有漏翻` : "✅ 六种语言没有明显漏翻"}`);
process.exit(problems.length ? 1 : 0);
