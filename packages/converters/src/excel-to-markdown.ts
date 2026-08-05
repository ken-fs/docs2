/**
 * XLSX → Markdown 表格。
 *
 * 用 read-excel-file 而不是完整的表格 SDK：这个包本来就是给浏览器写的，
 * 只做「读出单元格的值」这一件事，不带公式引擎、不带写入、不带图表 —— 一期
 * 要的就是值。
 *
 * 读到的是「显示值」，不是公式源码。.xlsx 里每个公式单元格除了 <f> 里的公式，
 * 还存了一份上次计算出来的 <v>；这个包读的是 <v>。所以 =SUM(A1:A9) 出来是
 * 42，不是 "=SUM(A1:A9)" —— 这正是用户想要的，他们要的是表格的内容。
 *
 * 代价要说清楚：如果这份文件是被程序生成的、从没在 Excel 里打开过，
 * 缓存值可能是空的，那格就会是空的。这种情况会在 warnings 里提。
 */
import {
  countStats,
  DEFAULT_OPTIONS,
  EncryptedError,
  renderTable,
  sniff,
  TooLargeError,
  WrongFormatError,
  zipKind,
  type ConvertOptions,
  type ConvertResult,
  type Workbook,
} from "./types";

export type { Workbook };

/** 方案 §5.5 定的上限。 */
const MAX_BYTES = 10 * 1024 * 1024;
const MAX_CELLS = 100_000;

/**
 * 转换分两步是刻意的：先 readWorkbook 拿到表清单交给 UI，用户挑完再
 * renderSheets —— 一个工作簿常有十几张表，默认全转出来没人看得下去。
 */
export async function readWorkbook(file: File): Promise<Workbook> {
  if (file.size > MAX_BYTES) {
    throw new TooLargeError("That workbook is over 10 MB. Too big for the browser.");
  }

  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const kind = sniff(bytes);

  // 加了密码的 .xlsx 不是 zip 而是 OLE 容器（真正的表格被加密后塞在里面）。
  // 老的 .xls 也是 OLE。两种都读不了，而且用户要做的事一样：在 Excel 里
  // 另存成不带密码的 .xlsx。
  if (kind === "ole") {
    throw new EncryptedError(
      "This is either a password-protected workbook or an old .xls. Open it in Excel and save as .xlsx without a password.",
    );
  }
  if (kind === "pdf") {
    throw new WrongFormatError(
      "That's a PDF, not a spreadsheet. Use the PDF to Markdown page instead.",
    );
  }
  if (kind !== "zip") {
    throw new WrongFormatError("Not an .xlsx file. The file header doesn't match.");
  }
  if (zipKind(bytes) === "docx") {
    throw new WrongFormatError(
      "That's a Word document, not a spreadsheet. Use the DOCX to Markdown page instead.",
    );
  }

  // read-excel-file 的 browser 版：不碰 fs，自带 zip 解压
  const { default: readXlsxFile } = await import("read-excel-file/browser");

  let raw;
  try {
    raw = await readXlsxFile(buffer);
  } catch (err) {
    throw new WrongFormatError(
      err instanceof Error && err.name === "InvalidSpreadsheetError"
        ? "This .xlsx looks damaged — the spreadsheet parts are missing or malformed."
        : "Couldn't read this workbook.",
    );
  }

  const data = raw.map((sheet) => sheet.data.map((row) => row.map(text)));

  return {
    sheets: raw.map((sheet, i) => ({
      name: sheet.sheet,
      rows: data[i].length,
      cols: Math.max(0, ...data[i].map((r) => r.length)),
    })),
    data,
  };
}

/**
 * 把选中的工作表拼成 markdown。多张表时每张前面加一个二级标题当分隔 ——
 * markdown 没有「工作表」的概念，标题是唯一能说明「这里换了一张表」的办法。
 */
export function renderSheets(
  book: Workbook,
  picked: number[],
  opts: ConvertOptions = DEFAULT_OPTIONS,
): ConvertResult {
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

    // 多张表才加标题。只转一张时用户已经知道是哪张，标题纯属噪音。
    if (pick.length > 1) parts.push(`## ${sheet.name}`);

    if (rows.length === 0) {
      empties++;
      parts.push("_(empty sheet)_");
      continue;
    }
    parts.push(renderTable(rows, opts));
  }

  if (empties) {
    warnings.push(
      `${empties} of the selected sheets had no data. Formula-only sheets read as empty unless the file was last saved by Excel.`,
    );
  }

  const skipped = book.sheets.length - pick.length;
  if (skipped > 0) {
    warnings.push(
      `${skipped} of ${book.sheets.length} sheets weren't included. Merged cells, colours and fonts are dropped in every case — Markdown has no syntax for them.`,
    );
  }

  const markdown = parts.join("\n\n");

  return {
    markdown,
    warnings,
    sheets: book.sheets,
    picked: pick,
    stats: { ...countStats(markdown), ms: Math.round(performance.now() - started) },
  };
}

/**
 * 单元格值 → 文本。
 *
 * 日期要特别处理：这个包把日期格式的单元格解析成 Date 对象，直接 String()
 * 出来是 "Sun Jan 01 1995 00:00:00 GMT+0800 (…)" —— 又长又带本地时区。
 * 表格里想看到的是 1995-01-01。
 */
function text(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (value instanceof Date) {
    // xlsx 存的日期没有时区概念，Date 是按 UTC 造出来的，所以按 UTC 读回去。
    // 用本地时间会让 1995-01-01 在西半球变成 1994-12-31。
    const iso = value.toISOString();
    // 午夜整点就当纯日期看，带时分秒的才连时间一起显示
    return iso.endsWith("T00:00:00.000Z") ? iso.slice(0, 10) : iso.slice(0, 19).replace("T", " ");
  }
  if (typeof value === "boolean") return value ? "TRUE" : "FALSE";
  return String(value);
}

/** 末尾的空行删掉。Excel 里随手点过的空单元格会让工作表凭空多出几百行。 */
function trimTrailing(rows: string[][]) {
  let end = rows.length;
  while (end > 0 && rows[end - 1].every((c) => c === "")) end--;
  return rows.slice(0, end);
}
