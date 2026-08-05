/**
 * Markdown → HTML：markdown-it 渲染，DOMPurify 净化。
 *
 * 顺序是方案 §12 定的，而且必须是这个方向：markdown 里可以直接写内嵌 HTML
 * （`<script>alert(1)</script>` 在 CommonMark 里是合法的 HTML block），
 * markdown-it 会原样透出去 —— 实测确认过。所以渲染之后必须净化。
 *
 * 反过来先净化 markdown 源码没有意义 —— 那时它还是纯文本，DOMPurify 眼里
 * 一段 `<script>` 和一段普通文字没有区别。
 *
 * 另一条更隐蔽的路是链接：`[x](javascript:alert(1))` 在 markdown 里就是个
 * 普通链接语法。markdown-it 自带 validateLink 会挡一部分，但我们不指望它 ——
 * DOMPurify 的 ALLOWED_URI_REGEXP 才是兜底的那道。
 */
// 默认导出是个「不用 new 也能调」的兼容包装（值），同名的 type 是实例类型 ——
// 两个都要，所以类型那份改个名进来
import MarkdownIt, { type MarkdownIt as Md } from "markdown-it";
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

/** 25MB 的 markdown 是几百万字，远超任何正常输入。 */
const MAX_CHARS = 25 * 1024 * 1024;

/**
 * GFM 任务列表：`- [x] done` → 一个勾上的复选框。
 *
 * markdown-it 不内置这条（CommonMark 里没有），所以自己加一条 core 规则，
 * 在 inline 解析之后改 token 流。
 *
 * 为什么是 core 规则而不是接管 renderer 的 text 规则：text 规则拿到的是
 * inline 的每个子 token，看不出自己在不在列表项开头 —— 正文里随手写的
 * `[x] 这不是任务` 会被一起改掉。在 token 层做能准确地只认
 * list_item_open → paragraph_open → inline 的第一个 text。
 *
 * checkbox 一定要 disabled：输出的是一份静态 HTML，一个能勾的框会让人
 * 以为勾选状态存得住。GitHub 自己渲染出来的也是 disabled。
 */
function taskLists(md: Md) {
  md.core.ruler.after("inline", "task_lists", (state) => {
    const toks = state.tokens;
    for (let i = 0; i < toks.length; i++) {
      if (toks[i].type !== "list_item_open") continue;
      if (toks[i + 1]?.type !== "paragraph_open") continue;
      const inline = toks[i + 2];
      if (inline?.type !== "inline") continue;

      const first = inline.children?.[0];
      if (!first || first.type !== "text") continue;
      const box = /^\[([ xX])\][ \t]+/.exec(first.content);
      if (!box) continue;

      first.content = first.content.slice(box[0].length);
      const input = new state.Token("task_checkbox", "input", 0);
      input.attrSet("type", "checkbox");
      input.attrSet("disabled", "");
      if (box[1].toLowerCase() === "x") input.attrSet("checked", "");
      inline.children?.unshift(input);
      toks[i].attrJoin("class", "task-list-item");
    }
    return true;
  });

  // 复选框和后面的文字之间要有个空格，否则渲染出来是 "☐done"
  md.renderer.rules.task_checkbox = (tokens, idx, opts, _env, self) =>
    `${self.renderToken(tokens, idx, opts)} `;
}

/**
 * markdown-it 的配置。
 *
 * html: true 是刻意的 —— 用户的 markdown 里常有手写的 <br>、<sub>、<details>，
 * 关掉会把它们当纯文本转义掉，那是在改用户的内容。放行的安全代价由后面的
 * DOMPurify 承担，这正是那一步存在的理由。
 */
function build(opts: HtmlOptions) {
  const md = new MarkdownIt({
    html: true,
    // 裸 URL 自动变链接，和 GitHub 一致
    linkify: opts.linkify,
    // 印刷体引号和破折号替换。默认关掉：那是在改用户的字符
    typographer: false,
    // 段内单换行是否变 <br>。CommonMark 说不变，但多数人写 markdown 时
    // 以为会变 —— 交给用户自己选
    breaks: opts.lineBreaks,
    xhtmlOut: false,
  });

  // 删除线和表格是 GFM 的一部分，markdown-it 内置但默认没开
  md.enable(["strikethrough", "table"]);
  taskLists(md);

  return md;
}

export function convertMarkdown(
  markdown: string,
  opts: HtmlOptions = DEFAULT_HTML_OPTIONS,
  name = "Document",
): HtmlResult {
  const started = performance.now();

  if (markdown.length > MAX_CHARS) {
    throw new TooLargeError("That Markdown file is too large to convert here.");
  }

  const rendered = build(opts).render(markdown);

  const { html: clean, removed, tidied } = sanitizeForHtml(rendered);
  // 净化之后只剩美化和套壳，两者都不会重新引入标签。走一遍 DOM 确认这一点。
  assertCleanHtml(clean);

  const fragment = opts.pretty ? prettyHtml(clean) : clean;
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
    warnings.push(
      `Removed unsafe HTML that was embedded in the Markdown: ${listSome(removed, 8)}`,
    );
  }
  if (!fragment.trim()) {
    warnings.push("Nothing to show — the Markdown had no content.");
  }

  return {
    html,
    preview: document,
    warnings,
    removed,
    tidied,
    stats: {
      ...countHtmlStats(fragment),
      bytes: new TextEncoder().encode(html).length,
      ms: Math.round(performance.now() - started),
    },
  };
}
