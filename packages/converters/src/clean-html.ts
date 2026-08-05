/**
 * 富文本 HTML → 干净 HTML。Google Docs 粘贴那页走的就是这条（方案 §6.3）。
 *
 * 没有 Google API，也不需要登录：用户在 Google Docs 里选中内容按复制，
 * 剪贴板里就有一份 text/html。那份 HTML 的正文结构是对的，但被塞满了垃圾：
 *
 *   - 每个元素一个 c1 / c17 这样的 class，指向一段随剪贴板一起走的 <style>。
 *     样式表被我们的白名单挡掉了，class 就成了死引用 —— 必须一起清掉，
 *     否则粘出来的 HTML 全是没有意义的属性。
 *   - <b style="font-weight:normal"> 包着整篇内容。Google 用它承载文档级样式，
 *     去掉 style 之后剩一个「把全文加粗」的标签，语义是反的。
 *   - 外链被包成 google.com/url?q=<真地址>&sa=D&usg=…，还常带 utm_*。
 *   - id="docs-internal-guid-…" 这种只对 Google 自己有意义的锚点。
 *
 * 危险的部分和别的入口一视同仁：剪贴板里的 HTML 可以来自任意网页，一个页面
 * 完全可以在自己的 DOM 里埋 onmouseover 和 javascript: 链接等着被复制走。
 * 所以这里也是 DOMPurify 先过（方案 §12 的 HTML→* 链路），再收拾。
 *
 * 这个模块同时服务「直接贴 HTML 源码」的场景 —— 两种输入在代码眼里都只是
 * 一段不可信的 HTML 字符串，没有区别。
 */
import {
  assertCleanHtml,
  countHtmlStats,
  guessTitle,
  prettyHtml,
  sanitizeForHtml,
  wrapDocument,
} from "./html-out";
import {
  DEFAULT_HTML_OPTIONS,
  listSome,
  TooLargeError,
  type HtmlOptions,
  type HtmlResult,
} from "./types";

/** 25MB 的 HTML 远超任何一次复制粘贴。 */
const MAX_CHARS = 25 * 1024 * 1024;

/**
 * 只在这条链上做的一件额外事：拆掉 Google 那个「加粗全文」的外壳。
 *
 * 放在这儿而不是 html-out.ts 的 declutter 里，是因为它只对 Google Docs 的
 * 粘贴成立。别的来源里 <b> 就是真的要加粗，无条件拆是在改用户的内容。
 *
 * 判据是「这个 b 或 span 直接装着块级元素」：<b> 是行内标签，合法的 HTML 里
 * 它不会包着 <p> 或 <h1>。会这么写的只有 Google 那层文档级外壳。
 */
const BLOCK_CHILD = "p,h1,h2,h3,h4,h5,h6,ul,ol,table,blockquote,pre,div,section";

function unwrapWrappers(html: string): { html: string; unwrapped: number } {
  if (typeof DOMParser === "undefined") return { html, unwrapped: 0 };

  const doc = new DOMParser().parseFromString(html, "text/html");
  let unwrapped = 0;

  // 外壳可能套了几层，从里往外拆：querySelectorAll 是文档顺序，倒着走能保证
  // 拆掉一个之后剩下的引用仍然有效
  const suspects = Array.from(doc.body.querySelectorAll("b,span,i,em,strong"));
  for (const el of suspects.reverse()) {
    if (!el.querySelector(BLOCK_CHILD)) continue;
    // 把孩子提到自己的位置上，再把自己删掉。移动节点不会生成新标签，
    // 所以这一步仍然满足 §13 的「净化后不得重新引入危险标签」。
    el.replaceWith(...Array.from(el.childNodes));
    unwrapped++;
  }

  // 没有任何属性的 <span> 一起拆掉。
  //
  // Google Docs 把每一段文字都拆成若干个 <span class="c1">，class 在上一步
  // 被当死引用清掉之后，剩下的是一个不表达任何东西的空壳 —— <span> 本身没有
  // 语义，全靠属性说话。留着的话粘出来的 HTML 每个句子都套三层壳。
  //
  // 只认 span：<b>/<em> 哪怕没有属性也仍然是「加粗」「强调」，拆了就是在改
  // 用户的内容。倒着走同样是为了先拆里层。
  for (const el of Array.from(doc.body.querySelectorAll("span")).reverse()) {
    if (el.attributes.length) continue;
    el.replaceWith(...Array.from(el.childNodes));
    unwrapped++;
  }

  return { html: doc.body.innerHTML, unwrapped };
}

export function cleanHtml(
  dirty: string,
  opts: HtmlOptions = DEFAULT_HTML_OPTIONS,
  name = "Document",
): HtmlResult {
  const started = performance.now();

  if (dirty.length > MAX_CHARS) {
    throw new TooLargeError("That HTML is too large to clean here. 25 MB is the cap.");
  }

  const { html: sanitized, removed, tidied } = sanitizeForHtml(dirty);
  const { html: unshelled, unwrapped } = unwrapWrappers(sanitized);
  // 拆外壳之后再复查一遍，因为上一步动过 DOM
  assertCleanHtml(unshelled);

  const fragment = opts.pretty ? prettyHtml(unshelled) : unshelled;
  const title = guessTitle(fragment, name);
  const document = wrapDocument(fragment, {
    title,
    lang: opts.lang,
    responsive: opts.responsive,
    pretty: opts.pretty,
  });

  const html = opts.mode === "document" ? document : fragment;

  const warnings: string[] = [];
  if (removed.length) {
    warnings.push(`Removed unsafe HTML from this input: ${listSome(removed, 8)}`);
  }
  const notes = [...tidied];
  if (unwrapped) {
    notes.push(`${unwrapped} redundant wrapper ${unwrapped === 1 ? "tag" : "tags"}`);
  }
  if (notes.length) {
    warnings.push(`Cleaned out: ${listSome(notes, 8)}`);
  }
  if (!fragment.trim()) {
    warnings.push(
      "Nothing came through. If you copied from Google Docs, make sure you copied the content itself, not a link to the document.",
    );
  }

  return {
    html,
    preview: document,
    warnings,
    removed,
    tidied: notes,
    stats: {
      ...countHtmlStats(fragment),
      bytes: new TextEncoder().encode(html).length,
      ms: Math.round(performance.now() - started),
    },
  };
}
