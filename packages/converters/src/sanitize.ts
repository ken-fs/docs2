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

/**
 * 允许的 URL 协议。DOMPurify 默认还放过 tel/sms/callto/cid/xmpp/matrix，
 * 这里收窄到文档里真正会出现的四种。
 *
 * 关键是 javascript: 不在其中 —— Word 的超链接字段可以塞任意协议。
 */
const SAFE_URI = /^(?:https?:|mailto:|ftp:|#|\/|\.{1,2}\/)/i;

/**
 * 校验 URL 前要先剥掉的空白。抄的是 DOMPurify 自己那张表：`java\nscript:` 在
 * 浏览器眼里等于 `javascript:`，所以不能只 trim 普通空格。
 */
const ATTR_WHITESPACE =
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g;

const CONFIG: Config = {
  ALLOWED_TAGS,
  ALLOWED_ATTR,
  ALLOWED_URI_REGEXP: SAFE_URI,
  // 白名单已经挡住了 script/iframe/object/embed，但连里面的文字一起删掉：
  // 默认行为是保留被删标签的内容，那样 script 的代码会变成可见正文
  FORBID_CONTENTS: ["script", "style", "iframe", "object", "embed", "noscript", "template"],
  // <math>/<svg> 里能藏 foreignObject 之类的绕过手法，文档转换也用不上
  USE_PROFILES: { html: true },
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
};

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

  const removed = Array.from(
    new Set(
      DOMPurify.removed.map((item) => {
        if ("attribute" in item && item.attribute) return `@${item.attribute.name}`;
        const node = "element" in item ? item.element : undefined;
        return `<${(node?.nodeName ?? "unknown").toLowerCase()}>`;
      }),
    ),
  );

  return { html, removed };
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
