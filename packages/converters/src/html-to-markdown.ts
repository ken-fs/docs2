/**
 * HTML → Markdown：DOMPurify 净化，turndown 转换。
 *
 * 两个来源都不可信，处理方式一样：
 *   - 从 Google Docs / Word 网页版复制过来的富文本（剪贴板里的 text/html）
 *   - 用户直接贴进来的 HTML 源码
 *
 * 前者尤其要小心：剪贴板里的 HTML 来自任意网页，页面完全可以在里面埋
 * onmouseover 或 javascript: 链接，等着被复制走。
 */
import { assertClean, sanitizeHtml } from "./sanitize";
import { buildTurndown } from "./turndown-rules";
import {
  countStats,
  DEFAULT_OPTIONS,
  listSome,
  tidy,
  type ConvertOptions,
  type ConvertResult,
} from "./types";

/** 单次输入的上限。25MB 的 HTML 已经远超任何正常的复制粘贴。 */
const MAX_CHARS = 25 * 1024 * 1024;

export function convertHtml(
  html: string,
  opts: ConvertOptions = DEFAULT_OPTIONS,
): ConvertResult {
  const started = performance.now();

  if (html.length > MAX_CHARS) {
    throw new Error("That HTML is too large to convert here.");
  }

  const { html: clean, removed, tidied } = sanitizeHtml(html);
  // 净化之后不能再有任何会重新引入标签的处理
  assertClean(clean);

  const markdown = tidy(buildTurndown(opts).turndown(clean));

  const warnings: string[] = [];
  if (removed.length) {
    warnings.push(
      `Removed unsafe HTML from this input: ${listSome(removed, 8)}`,
    );
  }
  // 改了用户的链接就必须说 —— 拆掉 google.com/url 包装、摘掉 utm_* 都是在动
  // 内容，不是在删死属性。这条以前拿到了 tidied 却没往外说：从 Google Docs
  // 粘贴进来的链接被重写了，页面上一句话都没有。
  if (tidied.length) {
    warnings.push(`Cleaned out: ${listSome(tidied, 8)}`);
  }
  if (!markdown) {
    warnings.push("Nothing left after conversion — the input had no text content.");
  }

  return {
    markdown,
    warnings,
    stats: { ...countStats(markdown), ms: Math.round(performance.now() - started) },
  };
}
