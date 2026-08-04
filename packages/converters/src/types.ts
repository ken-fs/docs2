/**
 * 转换器的轻量壳：类型、选项、错误类和文件头嗅探。
 *
 * 这个文件刻意不 import 任何解析库。页面静态 import 它拿类型和 instanceof，
 * 真正的 mammoth / turndown / cfb 只在用户选了文件之后动态 import 进来
 * —— 否则首屏包会把几 MB 的解析器全带上。
 */

export type ImageMode = "inline" | "strip" | "placeholder";

export type ConvertOptions = {
  bullet: "-" | "*" | "+";
  heading: "atx" | "setext";
  codeFence: "```" | "~~~";
  images: ImageMode;
  keepTables: boolean;
};

export const DEFAULT_OPTIONS: ConvertOptions = {
  bullet: "-",
  heading: "atx",
  codeFence: "```",
  images: "inline",
  keepTables: true,
};

export type ConvertResult = {
  markdown: string;
  warnings: string[];
  /** 走的是 .doc 二进制解析器，结果比 .docx 粗糙。 */
  legacy?: boolean;
  stats: {
    words: number;
    headings: number;
    tables: number;
    images: number;
    links: number;
    ms: number;
  };
};

/**
 * .doc 走的是自己写的二进制解析器（legacy-doc.ts），能出正文/标题/表格/
 * 粗斜体删除线，但拿不到图片和精确的列表编号格式。留这个类型是为了让 UI
 * 能提示「这是老格式，结果比 .docx 粗糙」。
 */
export class LegacyDocError extends Error {
  constructor(message = "legacy-doc") {
    super(message);
    this.name = "LegacyDocError";
  }
}

export class NotADocxError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotADocxError";
  }
}

const ZIP_MAGIC = [0x50, 0x4b, 0x03, 0x04];
const OLE_MAGIC = [0xd0, 0xcf, 0x11, 0xe0];

function startsWith(bytes: Uint8Array, magic: number[]) {
  return magic.every((b, i) => bytes[i] === b);
}

/**
 * 靠文件头判断真实格式，不信扩展名 —— 很多 .doc 其实是改名的 .docx，反之亦然。
 */
export function sniff(bytes: Uint8Array): "docx" | "doc" | "unknown" {
  if (startsWith(bytes, ZIP_MAGIC)) return "docx";
  if (startsWith(bytes, OLE_MAGIC)) return "doc";
  return "unknown";
}

/** 连续空行压到最多一个，行尾空格清掉（除了 markdown 的双空格换行）。 */
export function tidy(md: string) {
  return md
    .replace(/\r\n?/g, "\n")
    .replace(/[ \t]+$/gm, (m) => (m === "  " ? m : ""))
    .replace(/\n{3,}/g, "\n\n")
    .replace(/^\n+/, "")
    .trimEnd();
}

export function countStats(md: string) {
  // 围栏里的 # 和 | 不算标题/表格，两种围栏字符都要剥掉
  const withoutCode = md
    .replace(/^(`{3,})[\s\S]*?^\1/gm, "")
    .replace(/^(~{3,})[\s\S]*?^\1/gm, "");
  return {
    words: (md.match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) ?? []).length,
    headings: (withoutCode.match(/^#{1,6}\s+\S/gm) ?? []).length,
    tables: (withoutCode.match(/^\|[^\n]*\|\s*$/gm) ?? []).length
      ? (withoutCode.match(/^\|\s*---/gm) ?? []).length
      : 0,
    images: (md.match(/!\[[^\]]*\]\(/g) ?? []).length,
    links: (md.match(/(?<!!)\[[^\]]*\]\(/g) ?? []).length,
  };
}

/** 代码里本来就有围栏字符时，围栏要更长，否则块会提前闭合。 */
export function wrapFence(text: string, fence: "```" | "~~~") {
  const char = fence[0];
  const longest = Math.max(
    0,
    ...(text.match(new RegExp(`^\\${char}{3,}`, "gm")) ?? []).map(
      (m) => m.length,
    ),
  );
  const bar = char.repeat(Math.max(3, longest + 1));
  return `${bar}\n${text}\n${bar}`;
}
