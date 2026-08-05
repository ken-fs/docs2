/**
 * XLSX → 语义化 HTML 表格（方案 §6.6）。
 *
 * 读文件那一半直接用 excel-to-markdown 里的 readWorkbook —— 同一份 .xlsx，
 * 同样的格式嗅探、同样的加密判断、同样的日期处理。为 HTML 再写一份只会多一处
 * 会漂的地方。这里也顺手把它再导出一次，页面就不用为了读文件去 import
 * markdown 那个模块（名字看着莫名其妙，而且会把它一起带进包）。
 *
 * 一期明确不还原 Excel 的颜色、字体、公式和合并单元格（方案 §6.6）。这不是
 * 偷懒的边界，而是产物定位的选择：抄一份带内联颜色的表格贴到别人的网站上，
 * 十次有九次和那个站的样式打架。要的是干净的 <table>，样式归页面自己管。
 * 但这个取舍必须在 warnings 里说出来，否则用户会以为是转坏了。
 */
import { readWorkbook } from "./excel-to-markdown";
import { countHtmlStats, escapeHtml, prettyHtml, tableHtml, wrapDocument } from "./html-out";
import {
  DEFAULT_HTML_OPTIONS,
  TooLargeError,
  type HtmlOptions,
  type HtmlResult,
  type Workbook,
} from "./types";

export { readWorkbook };
export type { Workbook };

const MAX_CELLS = 100_000;

/**
 * 选中的工作表 → HTML。
 *
 * 多张表时每张前面加一个 <h2> 当分隔。HTML 里也可以用 <section> 包起来，
 * 但那要求用户的页面自己有对应样式；一个标题加一张表是到哪都能用的写法。
 */
export function renderSheetsToHtml(
  book: Workbook,
  picked: number[],
  opts: HtmlOptions = DEFAULT_HTML_OPTIONS,
  name = "Workbook",
): HtmlResult {
  const started = performance.now();

  const pick = picked.filter((i) => i >= 0 && i < book.data.length);
  if (pick.length === 0) {
    throw new Error("No sheet selected.");
  }

  const cells = pick.reduce(
    (n, i) => n + book.data[i].reduce((m, row) => m + row.length, 0),
    0,
  );
  if (cells > MAX_CELLS) {
    throw new TooLargeError(
      `That's ${cells.toLocaleString("en-US")} cells. The cap here is ${MAX_CELLS.toLocaleString("en-US")} — pick fewer sheets.`,
    );
  }

  const warnings: string[] = [];
  const parts: string[] = [];
  let empties = 0;

  for (const i of pick) {
    const sheet = book.sheets[i];
    const rows = trimTrailing(book.data[i]);

    // 只转一张表时用户已经知道是哪张，标题纯属噪音
    if (pick.length > 1) parts.push(`<h2>${escapeHtml(sheet.name)}</h2>`);

    if (rows.length === 0) {
      empties++;
      parts.push("<p><em>(empty sheet)</em></p>");
      continue;
    }

    parts.push(
      tableHtml(rows, {
        firstRowHeader: opts.firstRowHeader,
        responsive: opts.responsive,
        // 单张表时表名放进 <caption>：这是 HTML 给表格配标题的正规位置，
        // 屏幕阅读器会先读它，用户就知道这张表是关于什么的。多张表时表名
        // 已经在 h2 上了，再来一遍是重复。
        caption: pick.length > 1 ? undefined : sheet.name,
      }),
    );
  }

  const fragment0 = parts.join("\n");
  const fragment = opts.pretty ? prettyHtml(fragment0) : fragment0;

  const document = wrapDocument(fragment, {
    title: pick.length === 1 ? book.sheets[pick[0]].name : name,
    lang: opts.lang,
    // 整页一定要带表格样式，否则是一堆没有框线的文字
    responsive: true,
    pretty: opts.pretty,
  });

  const html = opts.mode === "document" ? document : fragment;

  if (empties) {
    warnings.push(
      `${empties} of the selected sheets had no data. Formula-only sheets read as empty unless the file was last saved by Excel.`,
    );
  }

  const skipped = book.sheets.length - pick.length;
  if (skipped > 0) {
    warnings.push(
      `${skipped} of ${book.sheets.length} sheets weren't included.`,
    );
  }

  // 这条每次都说。用户看到自己精心配色的表格变成朴素的黑白框线，第一反应是
  // 工具出错了 —— 明说是有意为之，并给出「样式归你的页面管」这个方向。
  warnings.push(
    "Colours, fonts, merged cells and formulas aren't carried over — you get the cell values in a clean <table>. Style it with your own CSS.",
  );

  if (opts.mode === "fragment" && opts.responsive) {
    warnings.push(
      "Each table sits in a .table-wrap div for horizontal scrolling — add the CSS for it on your page, or switch to a full HTML document to get it inline.",
    );
  }

  return {
    html,
    preview: document,
    warnings,
    sheets: book.sheets,
    picked: pick,
    stats: {
      ...countHtmlStats(fragment),
      bytes: new TextEncoder().encode(html).length,
      ms: Math.round(performance.now() - started),
    },
  };
}

/** 末尾的空行删掉。Excel 里随手点过的空单元格会让工作表凭空多出几百行。 */
function trimTrailing(rows: string[][]) {
  let end = rows.length;
  while (end > 0 && rows[end - 1].every((c) => c === "")) end--;
  return rows.slice(0, end);
}
