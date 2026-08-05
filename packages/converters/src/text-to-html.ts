/**
 * 纯文本 → HTML（方案 §6.4）。
 *
 * 这条链上没有解析库，也不需要 DOMPurify —— 输入是纯文本，输出的每个标签都是
 * 这个文件写死的常量，用户的内容全部经过 escapeHtml。用户想要一个 <b>，
 * 得到的就该是可见的 "<b>" 三个字符，这正是「纯文本转 HTML」的定义。
 *
 * 反过来说，正因为不过 DOMPurify，转义就不能漏：escapeHtml 之前不做任何
 * 会产生 < 或 & 的处理，之后也只插入我们自己的标签。
 *
 * 段落划分按空行 —— 这是纯文本世界里唯一通行的约定（RFC 3676 之前的邮件、
 * README、粘贴出来的文档都是这么写的）。
 */
import {
  countHtmlStats,
  escapeHtml,
  prettyHtml,
  safeUrl,
  wrapDocument,
} from "./html-out";
import {
  DEFAULT_HTML_OPTIONS,
  TooLargeError,
  type HtmlOptions,
  type HtmlResult,
} from "./types";

const MAX_CHARS = 25 * 1024 * 1024;

/**
 * 裸 URL 的识别。方案 §6.4 要求这个功能可以关掉。
 *
 * 刻意收得比通用 URL 正则窄：只认 http/https 开头和 www. 开头，不认 ftp、
 * 不认裸域名。写在正文里的 "example.com" 十次有九次不是想要一个链接，而
 * "看 www.example.com" 是。宁可少认，误认成链接是改了用户的内容。
 *
 * 结尾的标点要排除：一句话里的 "见 https://example.com/a。" 那个句号是句子的，
 * 不是 URL 的。所以最后一个字符不收 .,;:!?、。）] 这些。
 */
const BARE_URL = /\b(?:https?:\/\/|www\.)[^\s<>"'）】]+[^\s<>"'）】.,;:!?、。，；：！？)\]}]/g;

/** 邮箱也顺手连上 mailto —— 文本里的邮箱是明确要给人点的。 */
const BARE_MAIL = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;

/**
 * 一段文本 → 一段 HTML 行内内容。
 *
 * 在**原始文本**上找 URL，然后把每一段分别转义 —— 不是先转义再在转义结果上
 * 找 URL。后者看起来更省事，但 URL 里的 & 和 " 转义后变成 &amp; / &quot;，
 * 再塞进 href 时要不要还原、还原几次，是个能反复出错的地方。分段处理之后
 * 每个字符串只经过一次 escapeHtml，规则简单到不会错。
 */
function inline(text: string, opts: HtmlOptions): string {
  const out: string[] = [];
  let cursor = 0;

  if (opts.linkify) {
    // 两种模式一起扫，谁先出现算谁的 —— 分开 replace 两遍会让邮箱里的
    // 域名被 URL 那条规则先咬掉一半
    const scan = new RegExp(`${BARE_URL.source}|${BARE_MAIL.source}`, "g");
    for (const m of text.matchAll(scan)) {
      const found = m[0];
      const at = m.index;
      out.push(escapeHtml(text.slice(cursor, at)));
      cursor = at + found.length;

      const mail = !/^(?:https?:\/\/|www\.)/i.test(found);
      const href = mail
        ? `mailto:${found}`
        : /^www\./i.test(found)
          ? `https://${found}`
          : found;

      // 走一遍协议白名单。上面的正则本来就不匹配 javascript:，但校验放在
      // 唯一一处会往 href 写值的地方才靠得住 —— 以后有人放宽正则也拦得住
      if (!safeUrl(href)) {
        out.push(escapeHtml(found));
        continue;
      }

      // rel 是给用户的产物用的：这段 HTML 会贴到别人的站点上，站外链接带
      // noopener 是基本卫生。mailto 没有目标窗口，不用带。
      const rel = mail ? "" : ' rel="noopener nofollow"';
      out.push(`<a href="${escapeHtml(href)}"${rel}>${escapeHtml(found)}</a>`);
    }
  }
  out.push(escapeHtml(text.slice(cursor)));

  const joined = out.join("");
  if (opts.lineBreaks) {
    // 段内的单换行 → <br>。方案 §6.4 要求可关；关掉时同一段的几行会并成
    // 一行连续文本，由浏览器自己排版 —— CommonMark 的做法
    return joined.replace(/\n/g, "<br>\n");
  }
  return joined.replace(/\n/g, " ");
}

export function convertText(
  text: string,
  opts: HtmlOptions = DEFAULT_HTML_OPTIONS,
  name = "Document",
): HtmlResult {
  const started = performance.now();

  if (text.length > MAX_CHARS) {
    throw new TooLargeError("That text is too large to convert here. 25 MB is the cap.");
  }

  const normalized = text
    // 三种换行都归一，否则 Windows 文本里的 \r 会留在段落末尾
    .replace(/\r\n?/g, "\n")
    // BOM 会变成段首一个看不见的字符
    .replace(/^﻿/, "");

  // 空行分段。两个以上连续空行还是一段分隔，不是多个空段落。
  const blocks = normalized
    .split(/\n[ \t]*\n+/)
    .map((b) => b.replace(/^\n+|\n+$/g, ""))
    .filter((b) => b.trim());

  const fragment0 = blocks.map((b) => `<p>${inline(b, opts)}</p>`).join("\n");
  const fragment = opts.pretty ? prettyHtml(fragment0) : fragment0;

  const document = wrapDocument(fragment, {
    // 纯文本里没有标题结构可猜，用文件名
    title: name,
    lang: opts.lang,
    responsive: opts.responsive,
    pretty: opts.pretty,
  });

  const html = opts.mode === "document" ? document : fragment;

  const warnings: string[] = [];
  if (!blocks.length) {
    warnings.push("Nothing to convert — the text was empty.");
  }
  if (blocks.length === 1 && normalized.split("\n").length > 8) {
    // 没有空行的长文本会变成一个巨大的段落。这几乎总是「原文用单换行分段」，
    // 提示一下比默默交出一坨东西好
    warnings.push(
      "No blank lines found, so this came out as one paragraph. Separate paragraphs with a blank line, or turn on line breaks.",
    );
  }

  return {
    html,
    preview: document,
    warnings,
    stats: {
      ...countHtmlStats(fragment),
      bytes: new TextEncoder().encode(html).length,
      ms: Math.round(performance.now() - started),
    },
  };
}
