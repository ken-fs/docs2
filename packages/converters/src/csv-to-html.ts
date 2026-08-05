/**
 * CSV → 语义化 HTML 表格（方案 §6.5）。
 *
 * 解析这一半和 csv-to-markdown 是同一个道理：CSV 的难点全在引号里 —— 单元格
 * 可以含逗号、含换行、含被写成 "" 的引号，split(",") 一上手就散架。papaparse
 * 按 RFC 4180 处理，还能自己猜分隔符（欧洲导出的 CSV 用分号，因为那边小数点
 * 是逗号）。
 *
 * 输出这一半和 markdown 那条路差别很大，值得说清楚：
 *   - markdown 的管道表格里单元格换行必须变 <br>，否则整行会被截断；HTML 里
 *     <br> 是为了让换行看得见，不是语法要求。
 *   - HTML 能表达 <thead> / <th scope="col">，markdown 只有一行分隔符。
 *   - 这条路上没有任何 HTML 输入，所以不需要 DOMPurify：每一格都是纯文本经
 *     escapeHtml 出来的，标签全是 tableHtml 写死的。
 */
import Papa from "papaparse";
import { countHtmlStats, prettyHtml, tableHtml, wrapDocument } from "./html-out";
import {
  DEFAULT_HTML_OPTIONS,
  TooLargeError,
  type HtmlOptions,
  type HtmlResult,
} from "./types";

/** 一次最多这么多格。超了浏览器渲染这张表就开始卡。 */
const MAX_CELLS = 100_000;
const MAX_CHARS = 25 * 1024 * 1024;

export function convertCsvToHtml(
  text: string,
  opts: HtmlOptions = DEFAULT_HTML_OPTIONS,
  name = "Table",
): HtmlResult {
  const started = performance.now();

  if (text.length > MAX_CHARS) {
    throw new TooLargeError("That CSV is too large to convert here. 25 MB is the cap.");
  }

  // BOM 不剥掉会粘在第一个表头上，变成 "﻿Name"
  const clean = text.replace(/^﻿/, "");

  const parsed = Papa.parse<string[]>(clean, {
    // 空串 = 让 papaparse 自己猜
    delimiter: opts.delimiter,
    // 不要 dynamicTyping：表格是给人看的，把 "007" 变成 7、把 "1-2" 认成日期
    // 都是在改用户的数据
    dynamicTyping: false,
    skipEmptyLines: "greedy",
  });

  const rows = parsed.data.filter((r) => r.length > 0);
  if (rows.length === 0) {
    throw new Error("Nothing to convert — no rows found in this CSV.");
  }

  const cells = rows.reduce((n, r) => n + r.length, 0);
  if (cells > MAX_CELLS) {
    throw new TooLargeError(
      `That's ${cells.toLocaleString("en-US")} cells. The cap here is ${MAX_CELLS.toLocaleString("en-US")}.`,
    );
  }

  const table = tableHtml(rows, {
    firstRowHeader: opts.firstRowHeader,
    responsive: opts.responsive,
  });
  const fragment = opts.pretty ? prettyHtml(table) : table;

  const document = wrapDocument(fragment, {
    // 表格没有 h1 可猜，用文件名
    title: name,
    lang: opts.lang,
    // 整页里的表格样式一定要带上：一张不带 border-collapse 的表在浏览器默认
    // 样式下是没有框线的一堆文字
    responsive: true,
    pretty: opts.pretty,
  });

  const html = opts.mode === "document" ? document : fragment;

  const warnings: string[] = [];

  // papaparse 会报「这行的格数和别行不一样」之类的问题。实践中很常见
  // （末尾多个逗号、单元格里有裸引号），补齐就能用，所以提示而不是拒绝。
  const kinds = new Set(parsed.errors.map((e) => e.type));
  if (kinds.size) {
    warnings.push(
      `The CSV isn't perfectly formed (${[...kinds].join(", ")}). Short rows were padded out.`,
    );
  }

  const detected = parsed.meta.delimiter;
  if (!opts.delimiter && detected && detected !== ",") {
    warnings.push(`Detected "${label(detected)}" as the delimiter, not a comma.`);
  }

  const widths = new Set(rows.map((r) => r.length));
  if (widths.size > 1) {
    warnings.push(
      `Rows have different column counts (${[...widths].sort((a, b) => a - b).join(", ")}). Padded to the widest.`,
    );
  }

  // 片段模式 + 响应式：那个 .table-wrap 容器要靠 CSS 才起作用，而片段不带
  // <style>。不说清楚的话用户会以为响应式没生效。
  if (opts.mode === "fragment" && opts.responsive) {
    warnings.push(
      "The table sits in a .table-wrap div for horizontal scrolling — add the CSS for it on your page, or switch to a full HTML document to get it inline.",
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

/** Tab 打印出来是看不见的，得给它个名字。 */
function label(delimiter: string) {
  return delimiter === "\t" ? "tab" : delimiter;
}
