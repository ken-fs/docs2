/**
 * CSV → Markdown 表格。
 *
 * 用 papaparse 而不是自己 split(",")：CSV 的难点全在引号里 —— 单元格里可以有
 * 逗号、换行、被转义成 "" 的引号，split 一上手就散架。papaparse 按 RFC 4180
 * 处理这些，还能自己猜分隔符（逗号 / 分号 / Tab —— 欧洲导出的 CSV 用分号，
 * 因为那边小数点是逗号）。
 *
 * 这条路上没有 HTML，所以不需要 DOMPurify。但输出还是要防一手：单元格里的
 * 管道和换行会把管道表格截断，得转义 —— 那是 renderTable 的事。
 */
import Papa from "papaparse";
import {
  countStats,
  DEFAULT_OPTIONS,
  renderTable,
  TooLargeError,
  type ConvertOptions,
  type ConvertResult,
} from "./types";

/** 一次最多这么多格。超了浏览器渲染 markdown 预览就开始卡。 */
const MAX_CELLS = 100_000;
/** 文本上限。CSV 是纯文本，25MB 已经是几十万行。 */
const MAX_CHARS = 25 * 1024 * 1024;

export function convertCsv(
  text: string,
  opts: ConvertOptions = DEFAULT_OPTIONS,
): ConvertResult {
  const started = performance.now();

  if (text.length > MAX_CHARS) {
    throw new TooLargeError("That CSV is too large to convert here. 25 MB is the cap.");
  }

  // BOM 不剥掉的话会粘在第一个表头上，变成 "﻿Name"
  const clean = text.replace(/^﻿/, "");

  const parsed = Papa.parse<string[]>(clean, {
    // 空串 = 让 papaparse 自己猜。它试的是逗号/Tab/分号/竖线/RS/US。
    delimiter: opts.delimiter,
    // 不要 dynamicTyping：表格转出来是给人看的，把 "007" 变成 7、
    // 把 "1-2" 认成日期都是在改用户的数据
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

  const markdown = renderTable(rows, opts);

  const warnings: string[] = [];

  // papaparse 会报「这行的格数和别行不一样」之类的问题。这在实践中很常见
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

  return {
    markdown,
    warnings,
    stats: { ...countStats(markdown), ms: Math.round(performance.now() - started) },
  };
}

/** Tab 打印出来是看不见的，得给它个名字。 */
function label(delimiter: string) {
  return delimiter === "\t" ? "tab" : delimiter;
}
