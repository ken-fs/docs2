/**
 * HTML 净化层。所有不可信 HTML 都得先过这里，再进 turndown 或 DOM。
 *
 * 为什么必须有：mammoth 的文档明确写了它不对输出做安全清理 —— 它只是把
 * DOCX 里的东西如实翻成 HTML。一份 .docx 可以带上 <script>、on* 事件属性、
 * javascript: 链接，mammoth 会原样吐出来。
 *
 * 其中 href 是真正会落进 markdown 的那一类：turndown 照抄 URL，
 * [label](javascript:alert(1)) 在下游的 markdown 渲染器里就是一个能点的 XSS。
 * 危害不在我们这站，而是转移给了拿这段 markdown 去发布的人 —— 所以这层是
 * 替下游把的关，不是替自己。
 *
 * 顺序是死的：净化必须在 turndown 之前。反过来先转 markdown 再净化没用，
 * markdown 里的 <script> 对 DOMPurify 来说只是一段纯文本。
 */
import DOMPurify, { type Config } from "dompurify";

/**
 * 只保留能映射成 markdown 的那些标签。
 *
 * 用白名单而不是 FORBID_TAGS 黑名单：黑名单得预判所有危险标签，漏一个就是漏洞，
 * 而且新的 HTML 标签还会不断出现。这里反过来 —— 除了这张表里的，一律丢掉。
 */
const ALLOWED_TAGS = [
  "p", "br", "hr", "div", "span",
  "h1", "h2", "h3", "h4", "h5", "h6",
  "strong", "b", "em", "i", "u", "s", "del", "strike", "sup", "sub",
  "a", "img",
  "ul", "ol", "li",
  "blockquote", "pre", "code",
  "table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption",
];

/**
 * 属性同样是白名单。style / class / id 全部不要 —— markdown 里用不上，
 * 留着只是给 CSS 注入和 DOM clobbering 留门。
 */
const ALLOWED_ATTR = ["href", "src", "alt", "title", "colspan", "rowspan", "start"];

/** 上面那张表里真正装 URL 的两个。只有它们该按协议白名单校验。 */
const URL_ATTR = ["href", "src"];

/**
 * 允许的 URL 协议。DOMPurify 默认还放过 tel/sms/callto/cid/xmpp/matrix，
 * 这里收窄到文档里真正会出现的四种。
 *
 * 关键是 javascript: 不在其中 —— Word 的超链接字段可以塞任意协议。
 *
 * 写法是「列出允许的协议 + 拒绝其它任何 scheme」，而不是「列出允许的协议再补
 * 几种相对路径的写法」：后者要枚举相对路径的所有形态，裸相对路径
 * `images/photo.png` 会被漏掉。负向断言里的 `[a-z][a-z0-9+.\-]*:` 是
 * RFC 3986 的 scheme 语法，所以 `foo/bar:baz` 不会被误判 —— 冒号在 / 之后。
 */
export const SAFE_URI = /^(?:(?:https?|mailto|ftp):|(?![a-z][a-z0-9+.\-]*:))/i;

/**
 * 校验 URL 前要先剥掉的空白。抄的是 DOMPurify 自己那张表：`java\nscript:` 在
 * 浏览器眼里等于 `javascript:`，所以不能只 trim 普通空格。
 */
export const ATTR_WHITESPACE =
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g;

const CONFIG: Config = {
  ALLOWED_TAGS,
  ALLOWED_ATTR,
  ALLOWED_URI_REGEXP: SAFE_URI,
  // ALLOWED_URI_REGEXP 会套在每一个不在 URI_SAFE_ATTRIBUTES 里的属性上，不只是
  // href/src。不声明这条的话 colspan="2" 和 start="5" 会被当成非法 URL 删掉，
  // 表格的跨列和有序列表的起始编号就这么没了。
  ADD_URI_SAFE_ATTR: ALLOWED_ATTR.filter((a) => !URL_ATTR.includes(a)),
  // 白名单已经挡住了 script/iframe/object/embed，但连里面的文字一起删掉：
  // 默认行为是保留被删标签的内容，那样 script 的代码会变成可见正文
  FORBID_CONTENTS: ["script", "style", "iframe", "object", "embed", "noscript", "template"],
  // 这里刻意不设 USE_PROFILES。它不是在上面的白名单之上再收一道，而是整个替换掉
  // ALLOWED_TAGS / ALLOWED_ATTR（dompurify 3.4 的 _parseConfig 先把两者重置成
  // 空表，再灌入 profile 自己那张表）。后果是 style 和 id 被放回来，而下面的
  // assertClean 认得出它们不该在 —— 于是任何一段带 style 的 HTML 都会抛异常，
  // 用户看到的是「文件可能已损坏」。<math>/<svg> 不在 ALLOWED_TAGS 里，白名单
  // 已经挡住了，不靠 profile 再挡一遍。
  // 别让 <div id="body"> 这种覆盖 document.body
  SANITIZE_DOM: true,
  SANITIZE_NAMED_PROPS: true,
  // data: 只给 img 用（Word 内嵌图片就是走这个），其它标签一律不许
  ADD_DATA_URI_TAGS: ["img"],
  KEEP_CONTENT: true,
};

/** DOMPurify 在没有 DOM 的环境里会原样返回输入。这种情况必须报错而不是放行。 */
export class SanitizerUnavailableError extends Error {
  constructor() {
    super("HTML sanitizing needs a browser DOM. Refusing to pass HTML through unchecked.");
    this.name = "SanitizerUnavailableError";
  }
}

export type SanitizeReport = {
  html: string;
  /** 被删掉的标签名和属性名，去重后按出现顺序。用来给用户提示「有东西被移走了」。 */
  removed: string[];
  /**
   * 改写过的链接：拆掉的 google.com/url 包装、摘掉的跟踪参数。
   *
   * 跟 removed 分开，因为两件事的分量不一样 —— removed 是「删掉了不该在的东西」，
   * 这个是「我们动了你的链接指向」。后者必须单独说，混在一起会被死 class 挤掉。
   */
  tidied: string[];
};

/**
 * 跟踪参数。Google Docs 会把外链包一层 google.com/url?q=…，
 * 从别处复制的链接常带 utm_*。方案 §6.3 要求清掉。
 *
 * 定义在这里而不是 html-out.ts：两条链路（→Markdown 和 →HTML）必须清同一批
 * 参数，否则同一个链接在两个站上会得到两个不同的结果。
 */
const TRACKING_PARAM =
  /^(?:utm_[a-z_]+|gclid|fbclid|msclkid|mc_[a-z]+|_hs[a-z]+|igshid|si|ref_src|ref_url|usp)$/i;

/**
 * 剥掉 Google 的 /url?q= 包装和 utm_* 之类的参数。
 *
 * 拆出来的目标 URL 必须重新过一遍 SAFE_URI —— 包装里可以塞
 * ?q=javascript:alert(1)，那串东西没经过 DOMPurify 的检查。这是整条链路里
 * 唯一会往 href 写入新值的地方，所以校验就放在这儿。
 */
export function unwrapLink(href: string, tidied: Set<string>): string {
  let url: URL;
  try {
    url = new URL(href, "https://example.invalid/");
  } catch {
    return href;
  }

  // Google Docs 的外链包装：google.com/url?q=<真地址>
  if (/(?:^|\.)google\.[a-z.]+$/i.test(url.hostname) && url.pathname === "/url") {
    const target = url.searchParams.get("q") ?? url.searchParams.get("url");
    if (target && SAFE_URI.test(target.replace(ATTR_WHITESPACE, ""))) {
      tidied.add("google.com/url wrapper");
      return unwrapLink(target, tidied);
    }
  }

  let touched = false;
  for (const key of [...url.searchParams.keys()]) {
    if (TRACKING_PARAM.test(key)) {
      url.searchParams.delete(key);
      tidied.add(`?${key}`);
      touched = true;
    }
  }
  if (!touched) return href;

  // 相对地址是借了个假 origin 解析的，还得还原成相对形式
  const rebuilt = url.href.replace(/\?$/, "");
  return rebuilt.startsWith("https://example.invalid/")
    ? rebuilt.slice("https://example.invalid".length)
    : rebuilt;
}

/**
 * Google Docs 的「把全文加粗」外壳。
 *
 * 复制出来的内容被包在 <b style="font-weight:normal"> 里 —— Google 用它承载
 * 文档级样式，而 style 会被上面的属性白名单删掉，剩一个语义正好相反的 <b>。
 * 落到 Markdown 里就是首尾各一个孤立的 `**`（turndown 照实翻译它看见的标签）。
 *
 * 判据是「这个行内标签直接装着块级元素」：<b> 是行内标签，合法 HTML 里它不会
 * 包着 <p> 或 <h1>。会这么写的只有 Google 那层文档级外壳，所以拆它不会误伤
 * 真的要加粗的内容。
 *
 * 移动节点不新建标签，所以仍然满足 §13 的「净化后不得重新引入危险标签」。
 */
const BLOCK_CHILD = "p,h1,h2,h3,h4,h5,h6,ul,ol,table,blockquote,pre,div,section";

/**
 * 净化后的收尾：拆掉 Google 的外壳、把链接还原成真地址。
 *
 * 只做三件事 —— 移动已有节点、删属性、改 href。都不可能把标签变回来，
 * 所以放在净化之后是安全的（§13）。
 *
 * 跟 html-out.ts 的 declutter 分开是因为那边还要清死 class（class 在这条
 * 链路上早被属性白名单删干净了，Markdown 里也用不上），而这边要拆 <b> 外壳
 * ——那件事在 HTML 输出侧由 clean-html.ts 单独做。共用的部分是 unwrapLink。
 */
function tidyLinks(html: string): { html: string; tidied: string[] } {
  if (typeof DOMParser === "undefined") return { html, tidied: [] };

  const doc = new DOMParser().parseFromString(html, "text/html");
  const notes = new Set<string>();

  // 外壳可能套了几层，倒着走（querySelectorAll 是文档顺序）能保证拆掉一个
  // 之后剩下的引用仍然有效
  const shells = Array.from(doc.body.querySelectorAll("b,strong,i,em,span,u"));
  let unwrapped = 0;
  for (const el of shells.reverse()) {
    if (!el.querySelector(BLOCK_CHILD)) continue;
    el.replaceWith(...Array.from(el.childNodes));
    unwrapped++;
  }

  for (const el of Array.from(doc.body.querySelectorAll("a[href]"))) {
    const href = el.getAttribute("href") ?? "";
    const next = unwrapLink(href, notes);
    if (next !== href) el.setAttribute("href", next);
  }

  // 链接的事排在前面：一次 Google Docs 粘贴只会带一个外壳，但可能带十几个
  // 被重写的链接，而「我们改了你的链接指向」是更该被看见的那条
  const tidied = [...notes];
  if (unwrapped) {
    tidied.push(`${unwrapped} redundant wrapper ${unwrapped === 1 ? "tag" : "tags"}`);
  }
  return { html: doc.body.innerHTML, tidied };
}

/**
 * DOMPurify.removed 里不是用户内容的那几项。
 *
 * 它报的是「我从 DOM 上摘掉了这个节点」，而那棵 DOM 是它自己 parse 出来的 ——
 * 里面有用户没写过的东西：
 *
 *   body —— 每次净化都会有一条。DOMPurify 把输入塞进一份完整文档再解析，
 *   收工时把那层 <body> 壳子摘掉也记一笔。于是「移除了不安全的 HTML：<body>」
 *   出现在每一次转换上，包括输入只有一行 `Hello there.` 的时候。
 *
 *   #comment —— DOM 里注释节点的 nodeName 就长这样，不是标签名。
 *   `<!-- 待补 -->` 是 Markdown 和 HTML 里都完全合法的写法，说它不安全是不对的；
 *   而且印出来的 `<#comment>` 根本不是用户能在自己文件里找到的字符串。
 *
 * 这两条都会让那句提示变成谎话 —— 指着用户写对的东西说危险。真有 <script>
 * 时提示照旧，那才是它该出现的时候。
 *
 * 判断放在这一层而不是让 UI 去过滤：两条链路（sanitize.ts / html-out.ts）
 * 都要这个结论，而「哪些是解析器痕迹」是净化器自己的知识，不是界面的知识。
 */
const PARSER_ARTIFACT = new Set(["body", "#comment", "html", "head"]);

/**
 * DOMPurify.removed → 给人看的名字表。
 *
 * 两个净化器（这里和 html-out.ts）共用，因为「删了什么」这件事的报告口径
 * 必须一致：同一份输入在 HTML→Markdown 和 Markdown→HTML 两条路上，不该一边
 * 说被删了东西、一边说没有。
 */
export function describeRemoved(removed: typeof DOMPurify.removed): string[] {
  const names = removed.flatMap((item) => {
    if ("attribute" in item && item.attribute) return [`@${item.attribute.name}`];
    const node = "element" in item ? item.element : undefined;
    const name = (node?.nodeName ?? "unknown").toLowerCase();
    return PARSER_ARTIFACT.has(name) ? [] : [`<${name}>`];
  });
  return Array.from(new Set(names));
}

/**
 * 净化一段 HTML，并报告删了什么。
 *
 * 返回 removed 是为了让用户知情：一份 docx 里带 <script> 属于异常情况，
 * 静悄悄删掉不如明说 —— 用户可能想知道自己的文件里有什么。
 */
export function sanitizeHtml(dirty: string): SanitizeReport {
  // isSupported 为 false 时 DOMPurify.sanitize 直接 return dirty（fail-open）。
  // 静态导出的页面只在浏览器里跑转换，真跑到这儿说明环境不对，宁可失败。
  if (!DOMPurify.isSupported) throw new SanitizerUnavailableError();

  const html = DOMPurify.sanitize(dirty, CONFIG);
  const removed = describeRemoved(DOMPurify.removed);

  const { html: tidyHtml, tidied } = tidyLinks(html);
  return { html: tidyHtml, removed, tidied };
}

/**
 * 净化后再确认一遍：白名单之外的标签一个都不该剩。
 *
 * 这层冗余是给「以后有人往 CONFIG 里加标签」准备的 —— 真正的坏事不是配置写错，
 * 而是配置写错了却没人发现。这里直接把 DOM 走一遍，不信正则。
 */
export function assertClean(html: string): void {
  if (typeof DOMParser === "undefined") return;
  const doc = new DOMParser().parseFromString(html, "text/html");
  const allowed = new Set(ALLOWED_TAGS);

  for (const el of Array.from(doc.body.querySelectorAll("*"))) {
    const tag = el.nodeName.toLowerCase();
    if (!allowed.has(tag)) {
      throw new Error(`sanitizer let <${tag}> through`);
    }
    for (const attr of Array.from(el.attributes)) {
      const name = attr.name.toLowerCase();
      if (name.startsWith("on") || !ALLOWED_ATTR.includes(name)) {
        throw new Error(`sanitizer let ${tag}[${name}] through`);
      }
      if (
        (name === "href" || name === "src") &&
        // img 的 data: 是允许的，别把内嵌图片误判成漏网
        !(tag === "img" && name === "src" && attr.value.startsWith("data:")) &&
        !SAFE_URI.test(attr.value.replace(ATTR_WHITESPACE, ""))
      ) {
        throw new Error(`sanitizer let ${tag}[${name}="${attr.value.slice(0, 40)}"] through`);
      }
    }
  }
}
