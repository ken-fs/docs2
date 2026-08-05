/**
 * HTML 输出侧的公共层：净化配置、片段美化、整页包装、表格生成。
 *
 * 和 sanitize.ts 的区别在目标不同，不是同一份配置改个参数就能兼用：
 *
 *   sanitize.ts  产物要喂给 turndown，所以只留能映射成 markdown 的标签，
 *                多留的一律丢掉 —— 反正 turndown 也表达不出来。
 *   这里         产物就是给人用的 HTML，语义标签要尽量留住（thead / tfoot /
 *                figure / dl / 任务列表的 checkbox），删掉反而是在降级。
 *
 * 危险的东西两边一样不留：script、on* 事件、javascript: 链接、iframe /
 * object / embed。方案 §13 的要求对两条链路都成立。
 *
 * 顺序也一样是死的：净化在前，包装在后。包装只是把净化过的片段夹进我们自己
 * 写死的模板里 —— 那是拼接常量，不是「净化后又做了会重新引入危险标签的处理」。
 */
import DOMPurify, { type Config } from "dompurify";
import {
  describeRemoved,
  SanitizerUnavailableError,
  unwrapLink,
  type SanitizeReport,
} from "./sanitize";

/**
 * 输出 HTML 的白名单。比 markdown 那份宽，但宽出来的都是纯语义标签。
 *
 * 仍然是白名单而不是黑名单：黑名单要预判所有危险标签，漏一个就是漏洞，
 * 而 HTML 还在不断加新标签。
 */
const HTML_TAGS = [
  "p", "br", "hr", "div", "span",
  "h1", "h2", "h3", "h4", "h5", "h6",
  "strong", "b", "em", "i", "u", "s", "del", "ins", "mark", "small",
  "sup", "sub", "abbr", "cite", "q", "time", "kbd", "samp", "var",
  "a", "img", "figure", "figcaption", "picture",
  "ul", "ol", "li", "dl", "dt", "dd",
  "blockquote", "pre", "code",
  "table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption", "colgroup", "col",
  "section", "article", "aside", "header", "footer", "main", "nav",
  "details", "summary",
  // GFM 任务列表就是一个禁用的 checkbox，这是 GitHub 的约定写法
  "input",
];

/**
 * 属性白名单。style / id 一律不留 —— style 是 CSS 注入的入口，
 * id 能做 DOM clobbering，而这两样对输出的 HTML 都不是必需的。
 *
 * class 留着：Word 和 Google Docs 的 class 会在下面单独清掉，
 * 而我们自己生成的表格要靠 class 挂响应式样式。
 */
const HTML_ATTR = [
  "href", "src", "srcset", "alt", "title", "class", "lang", "dir",
  "colspan", "rowspan", "scope", "headers", "span",
  "start", "reversed", "value", "type", "checked", "disabled",
  "datetime", "cite", "open", "loading", "decoding", "width", "height",
];

/** HTML_ATTR 里真正装 URL 的那几个。只有它们该按协议白名单校验。 */
const URL_ATTR = ["href", "src", "srcset", "cite"];

/**
 * 允许的协议。javascript: 不在其中 —— 这是最要紧的一条。
 *
 * 写成「列出允许的协议 + 拒绝其它任何 scheme」，而不是「列出允许的协议再补几种
 * 相对路径的写法」：后者要枚举相对路径的所有形态，而最常见的裸相对路径
 * `images/image-01.png` 恰恰会被漏掉 —— 抽图模式生成的 src 就是这个形状，
 * 一漏就是导出的 HTML 里图片全丢。这里反过来，没有 scheme 就是相对路径，放行。
 *
 * 负向断言里的 `[a-z][a-z0-9+.\-]*:` 是 RFC 3986 的 scheme 语法，所以
 * `foo/bar:baz` 不会被误判成协议 —— 那个冒号在第一个 / 之后。
 */
const SAFE_URI = /^(?:(?:https?|mailto|ftp):|(?![a-z][a-z0-9+.\-]*:))/i;

const ATTR_WHITESPACE =
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g;

const CONFIG: Config = {
  ALLOWED_TAGS: HTML_TAGS,
  ALLOWED_ATTR: HTML_ATTR,
  ALLOWED_URI_REGEXP: SAFE_URI,
  // ALLOWED_URI_REGEXP 套在每一个不在 URI_SAFE_ATTRIBUTES 里的属性上，不只是
  // href/src。不声明这条的话 type="checkbox"、datetime、scope、colspan 会被
  // 当成非法 URL 一起删掉 —— GFM 任务列表的复选框就是这么消失的。
  ADD_URI_SAFE_ATTR: HTML_ATTR.filter((a) => !URL_ATTR.includes(a)),
  // 白名单已经挡掉了这些标签，但内容也要一起删：默认保留被删标签的文字，
  // 那样 <script> 里的代码会变成页面上的可见正文
  FORBID_CONTENTS: ["script", "style", "iframe", "object", "embed", "noscript", "template"],
  // 这里刻意不设 USE_PROFILES。它不是在上面的白名单之上再收一道，而是整个替换掉
  // ALLOWED_TAGS / ALLOWED_ATTR（dompurify 3.4 的 _parseConfig 先把两者重置成
  // 空表，再灌入 profile 自己那张表）。后果是 style 和 id 被放回来，而下面的
  // assertCleanHtml 认得出它们不该在 —— 于是每一份带 style 的输入都会抛异常，
  // 用户看到的是一句「文件可能已损坏」。svg / math 不在 HTML_TAGS 里，白名单
  // 已经挡住了，不需要 profile 再挡一遍。
  SANITIZE_DOM: true,
  SANITIZE_NAMED_PROPS: true,
  ADD_DATA_URI_TAGS: ["img"],
  KEEP_CONTENT: true,
};

/**
 * Word / Google Docs 塞进来的 class。
 *
 * mammoth 不带这些，但从 Word 网页版或 Google Docs 直接复制的富文本会带上
 * 一大堆 c1 / c17 / docs-internal-guid-… / MsoNormal —— 它们指向的样式表不在
 * 用户的页面里，留着就是一串死 class。方案 §6.2 和 §6.3 明确要求清掉。
 */
const JUNK_CLASS =
  // lst-kix_… 是 Google Docs 给每个列表生成的编号计数器名（kix 是它的内部
  // 代号）。复制出来的 <ul> 一定带一个，而它指向的 counter-reset 规则在
  // 那份没被复制的样式表里 —— 留着就是一串死 class，跟 c1/c17 是一类东西。
  /^(?:c\d+|Mso[A-Za-z]*|docs-internal-guid-[0-9a-f-]+|lst-kix_[\w-]+|ListParagraph|TableGrid|western|calibre\d*|western\d*)$/i;

/**
 * 清掉的死 class 和跟踪参数，用来告诉用户「顺手收拾了这些」。
 *
 * tidied 现在由 SanitizeReport 自己带（两条链路都要报这件事），
 * 所以这里不再加字段 —— 留个别名是为了调用方读起来仍然明确。
 */
export type HtmlSanitizeReport = SanitizeReport;

/**
 * 净化一段不可信 HTML，产出可以直接给人用的片段。
 *
 * 拆链接和清 class 都在净化之后做，但只做删除 —— 删属性、删 query 参数、
 * 换 href 里的一个 URL。这三件事都不可能把标签变回来，所以不违反 §13 的
 * 「净化后不得再做会重新引入危险标签的处理」。而且换上去的 URL 还要再过一遍
 * SAFE_URI，见 sanitize.ts 的 unwrapLink()。
 */
export function sanitizeForHtml(dirty: string): HtmlSanitizeReport {
  // isSupported 为 false 时 DOMPurify.sanitize 直接返回入参（fail-open）。
  // 这种环境下宁可失败，也不能把没净化的 HTML 交出去。
  if (!DOMPurify.isSupported) throw new SanitizerUnavailableError();

  const html = DOMPurify.sanitize(dirty, CONFIG);
  // 报告口径跟 HTML→Markdown 那条路共用一份，解析器痕迹（<body>、#comment）
  // 在那儿滤掉 —— 见 describeRemoved
  const removed = describeRemoved(DOMPurify.removed);

  const { html: tidyHtml, tidied } = declutter(html);
  return { html: tidyHtml, removed, tidied };
}

/**
 * 收拾净化后的片段：死 class、跟踪参数、Google 的重定向包装。
 *
 * 走 DOM 而不是正则：class 属性里有多个值要逐个判断，href 要按 URL 结构拆。
 * 只调用 removeAttribute / setAttribute("href")，不新建也不移动任何节点。
 */
function declutter(html: string): { html: string; tidied: string[] } {
  if (typeof DOMParser === "undefined") return { html, tidied: [] };

  const doc = new DOMParser().parseFromString(html, "text/html");
  // 分两组是为了报告的顺序，不是为了分类本身：改写 href 是真的动了用户的内容
  // （链接指向变了），删死 class 只是拿掉一个不起作用的属性。一份 Google Docs
  // 粘贴会带来十几个 c1/c17，同一条报告里它们会把「我们重写了你的链接」挤到
  // 截断线之外 —— 那正好是最该被看见的一条。所以链接的事永远排前面。
  const linkNotes = new Set<string>();
  const classNotes = new Set<string>();

  for (const el of Array.from(doc.body.querySelectorAll("[class]"))) {
    const keep = el.className
      .split(/\s+/)
      .filter(Boolean)
      .filter((name) => {
        if (!JUNK_CLASS.test(name)) return true;
        classNotes.add(`.${name}`);
        return false;
      });
    if (keep.length) el.className = keep.join(" ");
    else el.removeAttribute("class");
  }

  for (const el of Array.from(doc.body.querySelectorAll("a[href]"))) {
    const href = el.getAttribute("href") ?? "";
    const next = unwrapLink(href, linkNotes);
    if (next !== href) el.setAttribute("href", next);
  }

  return { html: doc.body.innerHTML, tidied: [...linkNotes, ...classNotes] };
}

/**
 * 净化后再走一遍 DOM 复查，白名单之外的东西一个都不该剩。
 *
 * 这层冗余不是为了防配置写错，而是为了让配置写错时有人发现 —— 以后有人往
 * HTML_TAGS 里加标签，这里会当场炸，而不是安静地放行。
 */
export function assertCleanHtml(html: string): void {
  if (typeof DOMParser === "undefined") return;
  const doc = new DOMParser().parseFromString(html, "text/html");
  const allowed = new Set(HTML_TAGS);

  for (const el of Array.from(doc.body.querySelectorAll("*"))) {
    const tag = el.nodeName.toLowerCase();
    if (!allowed.has(tag)) throw new Error(`sanitizer let <${tag}> through`);

    for (const attr of Array.from(el.attributes)) {
      const name = attr.name.toLowerCase();
      if (name.startsWith("on") || !HTML_ATTR.includes(name)) {
        throw new Error(`sanitizer let ${tag}[${name}] through`);
      }
      if (
        (name === "href" || name === "src" || name === "cite") &&
        !(tag === "img" && name === "src" && attr.value.startsWith("data:")) &&
        !SAFE_URI.test(attr.value.replace(ATTR_WHITESPACE, ""))
      ) {
        throw new Error(
          `sanitizer let ${tag}[${name}="${attr.value.slice(0, 40)}"] through`,
        );
      }
    }
  }
}

/**
 * 一个 URL 能不能放进 href。
 *
 * 自己生成 <a> 的地方（纯文本自动识别链接）必须过这一关：那串 URL 是从用户的
 * 文本里抓出来的，没有经过 DOMPurify 的属性检查。空白字符先剥掉 —— 浏览器
 * 解析 URL 前会自己剥，`java\nscript:` 在它眼里就是 `javascript:`。
 */
export function safeUrl(url: string): boolean {
  return SAFE_URI.test(url.replace(ATTR_WHITESPACE, ""));
}

/** 文本 → HTML 文本节点。五个字符全转，`'` 用 &#39; 因为 &apos; 在 HTML4 里不通。 */
export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** 块级标签，美化输出时在它们前后断行。 */
const BLOCK =
  "address|article|aside|blockquote|caption|colgroup|dd|details|div|dl|dt|fieldset|figcaption|figure|footer|h[1-6]|header|hr|li|main|nav|ol|p|pre|section|summary|table|tbody|tfoot|thead|tr|ul";

/**
 * 给净化过的片段加换行和缩进。
 *
 * 只做插入，不删不换：往标签之间塞 \n 和空格，一个原有字符都不动。这是刻意的
 * —— 这一步跑在 DOMPurify 之后，任何"重写"都可能把危险标签拼回来，而纯插入
 * 空白在语法上不可能变出标签。方案 §13 的最后一条就是这个意思。
 *
 * <pre> 内部一律不碰：那里的空白是内容。
 */
export function prettyHtml(html: string): string {
  // <pre>…</pre> 先抠出来占位，免得缩进改了代码块里的空白
  const stash: string[] = [];
  const masked = html.replace(/<pre\b[\s\S]*?<\/pre>/gi, (m) => {
    stash.push(m);
    return `\u0000${stash.length - 1}\u0000`;
  });

  const broken = masked
    // 块级开标签前断行
    .replace(new RegExp(`(?<!\\n)<(${BLOCK})\\b`, "gi"), "\n<$1")
    // 块级闭标签后断行
    .replace(new RegExp(`</(${BLOCK})>(?!\\n)`, "gi"), "</$1>\n")
    .replace(/\n{2,}/g, "\n");

  let depth = 0;
  const lines: string[] = [];
  for (const raw of broken.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    // 这一行是闭标签开头就先退一格，缩进才对得上开标签
    if (/^<\//.test(line)) depth = Math.max(0, depth - 1);
    lines.push("  ".repeat(depth) + line);
    // 开标签且没在同一行闭上，下一行进一格
    const opens = new RegExp(`^<(${BLOCK})\\b(?![\\s\\S]*</\\1>)`, "i").test(line);
    if (opens) depth++;
  }

  return lines
    .join("\n")
    .replace(/\u0000(\d+)\u0000/g, (_m, i) => stash[Number(i)]);
}

/**
 * 基础样式。整页模式才带，片段模式不带 —— 片段是要贴进别人已有页面的，
 * 塞一段 <style> 进去会去改人家其它内容的样子。
 */
const BASE_CSS = `
:root { color-scheme: light dark; }
body {
  margin: 0 auto;
  padding: 2rem 1.25rem 4rem;
  max-width: 46rem;
  font: 16px/1.7 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  color: #1c1917;
  background: #fff;
}
h1, h2, h3, h4, h5, h6 { line-height: 1.25; margin: 2rem 0 0.6rem; }
h1 { font-size: 2rem; }
h2 { font-size: 1.5rem; }
h3 { font-size: 1.2rem; }
p, ul, ol, dl, blockquote, pre, figure, table { margin: 0 0 1rem; }
a { color: #9a3412; }
blockquote {
  margin-left: 0;
  padding: 0.1rem 0 0.1rem 1rem;
  border-left: 3px solid #d6d3d1;
  color: #57534e;
}
pre {
  padding: 0.9rem 1rem;
  overflow-x: auto;
  background: #f5f5f4;
  border-radius: 4px;
}
code { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 0.92em; }
pre code { font-size: 0.88em; }
img { max-width: 100%; height: auto; }
hr { border: 0; border-top: 1px solid #d6d3d1; margin: 2rem 0; }
@media (prefers-color-scheme: dark) {
  body { color: #e7e5e4; background: #1c1917; }
  a { color: #fdba74; }
  blockquote { border-color: #44403c; color: #a8a29e; }
  pre { background: #292524; }
  hr { border-color: #44403c; }
}`.trim();

/**
 * 表格样式。可选，方案 §6.5 / §6.6 的「基础响应式样式」。
 *
 * 响应式的关键是那个包着表格的滚动容器：窄屏上一张十列的表不可能塞进
 * 375px，只能让它自己横向滚动。硬挤会把整个页面撑宽，页面上别的内容一起遭殃。
 */
const TABLE_CSS = `
.table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; margin: 0 0 1rem; }
.table-wrap table { margin: 0; }
table { border-collapse: collapse; width: 100%; font-size: 0.94rem; }
caption { padding-bottom: 0.5rem; text-align: left; font-weight: 600; }
th, td { padding: 0.5rem 0.7rem; border: 1px solid #d6d3d1; text-align: left; vertical-align: top; }
thead th { background: #f5f5f4; font-weight: 600; }
/* Markdown 表格的 |:---:| 对齐。markdown-it 本来出的是行内 style，
   而 style 全站不留，所以换成类名，定义放在这儿。 */
.align-left { text-align: left; }
.align-center { text-align: center; }
.align-right { text-align: right; }
tbody tr:nth-child(even) { background: #fafaf9; }
@media (prefers-color-scheme: dark) {
  th, td { border-color: #44403c; }
  thead th { background: #292524; }
  tbody tr:nth-child(even) { background: #232020; }
}`.trim();

export type WrapOptions = {
  title: string;
  lang: string;
  /** 带上表格样式。片段模式下这个开关只影响是否包滚动容器。 */
  responsive: boolean;
  pretty: boolean;
};

/**
 * 片段 → 整页文档。
 *
 * 模板是写死的常量，唯一来自用户的是片段本身（已净化）和标题（转义）。
 * charset 必须在前 1024 字节内，否则浏览器会先猜错编码再重来。
 */
export function wrapDocument(fragment: string, opts: WrapOptions): string {
  const css = [BASE_CSS, opts.responsive ? TABLE_CSS : ""].filter(Boolean).join("\n\n");
  const body = opts.pretty ? indent(fragment, 1) : fragment;

  return `<!DOCTYPE html>
<html lang="${escapeHtml(opts.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(opts.title)}</title>
<style>
${css}
</style>
</head>
<body>
${body}
</body>
</html>`;
}

/** 每行前面加 n 层缩进。空行不加，免得留下一串尾随空格。 */
function indent(text: string, levels: number) {
  const pad = "  ".repeat(levels);
  return text
    .split("\n")
    .map((line) => (line.trim() ? pad + line : line))
    .join("\n");
}

/**
 * 一份从整页文档里猜出来的标题。
 *
 * 优先用第一个 h1 的文字 —— 它几乎总是文档标题。取不到就退回调用方给的
 * 默认值（通常是文件名）。<title> 空着或写死 "Document" 对用户没用。
 */
export function guessTitle(fragment: string, fallback: string): string {
  const h1 = fragment.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1];
  const text = h1
    ?.replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return text && text.length <= 120 ? decodeEntities(text) : fallback;
}

/**
 * 把 h1 里的实体还原成字符 —— 它要被塞进 <title>，而 wrapDocument 会再转义
 * 一次，不还原的话 &amp; 会变成 &amp;amp;。
 */
function decodeEntities(text: string) {
  return text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    // & 放最后，否则 &amp;lt; 会被解成 <
    .replace(/&amp;/g, "&");
}

/**
 * 一行行数据 → 语义化 <table>。CSV 和 XLSX 共用。
 *
 * 自己拼字符串而不是过 DOMPurify：每一格都从纯文本经 escapeHtml 转义过来，
 * 标签和属性全是这个函数写死的，产物里不可能出现用户控制的标签。
 *
 * 表头用 <th scope="col"> 而不是加粗的 <td>：屏幕阅读器靠 scope 把数据格和
 * 表头对应起来，视觉加粗它读不出来。
 */
export function tableHtml(
  rows: string[][],
  opts: { firstRowHeader: boolean; responsive: boolean; caption?: string },
): string {
  if (rows.length === 0) return "";

  const width = Math.max(...rows.map((r) => r.length));
  const pad = (r: string[]) => {
    const copy = [...r];
    while (copy.length < width) copy.push("");
    return copy;
  };

  const grid = rows.map(pad);
  const head = opts.firstRowHeader ? grid[0] : null;
  const body = opts.firstRowHeader ? grid.slice(1) : grid;

  const cell = (value: string, tag: "th" | "td") => {
    const attr = tag === "th" ? ' scope="col"' : "";
    // 单元格里的换行在 HTML 里塌成空格，得显式换行 —— 这是内容，不是排版
    const text = escapeHtml(value.replace(/\r\n?/g, "\n")).replace(/\n/g, "<br>");
    return `<${tag}${attr}>${text}</${tag}>`;
  };

  const parts = ["<table>"];
  if (opts.caption) parts.push(`<caption>${escapeHtml(opts.caption)}</caption>`);
  if (head) {
    parts.push("<thead>", `<tr>${head.map((c) => cell(c, "th")).join("")}</tr>`, "</thead>");
  }
  parts.push("<tbody>");
  for (const row of body) {
    parts.push(`<tr>${row.map((c) => cell(c, "td")).join("")}</tr>`);
  }
  parts.push("</tbody>", "</table>");

  const table = parts.join("");
  // 滚动容器只在开了响应式样式时才有意义 —— 不带 CSS 的裸 div 什么都不做
  return opts.responsive ? `<div class="table-wrap">${table}</div>` : table;
}

/**
 * 数一数产物里有什么。给 UI 显示，也顺便让用户能看出转换是不是丢东西了。
 *
 * 正则数标签够用：这里数的是我们刚生成的、已净化的 HTML，形状是可控的。
 */
export function countHtmlStats(html: string) {
  const text = html
    .replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, "")
    .replace(/<[^>]*>/g, " ");
  return {
    words: (text.match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) ?? []).length,
    headings: (html.match(/<h[1-6]\b/gi) ?? []).length,
    tables: (html.match(/<table\b/gi) ?? []).length,
    images: (html.match(/<img\b/gi) ?? []).length,
    links: (html.match(/<a\s[^>]*href=/gi) ?? []).length,
  };
}
