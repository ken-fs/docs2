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
 * 表格的两处修正：表头补 scope，对齐从 style 换成 class。
 *
 * 两个问题都是 markdown-it 的输出撞上净化白名单撞出来的：
 *
 * scope —— markdown-it 出的是光溜溜的 <th>。屏幕阅读器靠 scope 才知道
 * 这一格是列头还是行头，没有它，一张表读出来就是一串没有归属的数字。
 * CSV / Excel 那两条路走 tableHtml，本来就带 scope，同一个站的两种表格
 * 不该一个有一个没有。
 *
 * 对齐 —— `|:---:|` 在 markdown-it 那儿变成 style="text-align:center"，
 * 而 style 是全站禁掉的（CSS 注入入口，html-out.ts 里连 id 一起不留）。
 * 于是三件事同时发生：对齐没了、用户看到一句「移除了不安全的 HTML：@style」、
 * 而他写的其实是完全合法的 Markdown。第二件最糟 —— 那是在指着用户的正确输入
 * 说它危险。
 *
 * 改成 class：align-left / align-center / align-right。整页模式的 TABLE_CSS
 * 里给了这三个类的定义，所以下载下来的 .html 是真的对齐的；片段模式交给
 * 用户自己的 CSS —— 那正是片段模式的意思。
 */
function tableFixes(md: Md) {
  md.core.ruler.push("table_fixes", (state) => {
    for (const tok of state.tokens) {
      // markdown-it 的 GFM 表格只有列头，没有行头，所以一律 col；
      // 哪天支持了行头，这个判断得跟着改。
      if (tok.type === "th_open") tok.attrSet("scope", "col");
      if (tok.type !== "th_open" && tok.type !== "td_open") continue;

      // attrGet 的返回类型是 string | number（markdown-it 允许数字属性值），
      // 对齐那条永远是字符串，但还是照类型收窄，别拿 as 糊过去
      const style = tok.attrGet("style");
      if (typeof style !== "string") continue;
      const side = /text-align:\s*(left|center|right)/.exec(style);
      if (!side) continue;

      tok.attrJoin("class", `align-${side[1]}`);
      // 整条抹掉而不是只删 text-align 那一段：markdown-it 在这个属性里
      // 只放对齐，没有别的东西会被顺手删掉
      const rest = tok.attrs?.filter(([n]) => n !== "style");
      tok.attrs = rest?.length ? rest : null;
    }
    return true;
  });
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
  tableFixes(md);

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
  // 改了用户的链接就必须说 —— declutter 会摘掉 utm_* 之类的参数、拆掉
  // google.com/url?q= 的包装，那是在动内容，不是在删死属性。clean-html 和
  // docx 两条路本来就报这一条，Markdown 这条之前拿到了 tidied 却没往外说，
  // 于是 [x](…?utm_source=z) 转完 href 变了而页面上一句话都没有。
  if (tidied.length) {
    warnings.push(`Cleaned out: ${listSome(tidied, 8)}`);
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
