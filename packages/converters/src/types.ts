/**
 * 转换器的轻量壳：类型、选项、错误类和文件头嗅探。
 *
 * 这个文件刻意不 import 任何解析库。页面静态 import 它拿类型和 instanceof，
 * 真正的 mammoth / turndown / cfb 只在用户选了文件之后动态 import 进来
 * —— 否则首屏包会把几 MB 的解析器全带上。
 */

export type ImageMode = "inline" | "strip" | "placeholder";

/** GFM 的表头对齐标记。none 就是不写 :，让渲染器用默认。 */
export type Align = "none" | "left" | "center" | "right";

export type ConvertOptions = {
  bullet: "-" | "*" | "+";
  heading: "atx" | "setext";
  codeFence: "```" | "~~~";
  images: ImageMode;
  keepTables: boolean;
  /** CSV / XLSX：第一行当表头。关掉时表头留空，因为 GFM 的表格必须有表头行。 */
  firstRowHeader: boolean;
  align: Align;
  /** PDF：在页与页之间插入 `<!-- page N -->`。 */
  pageMarks: boolean;
  /** CSV：留空表示自动识别分隔符。 */
  delimiter: "" | "," | ";" | "\t" | "|";
};

export const DEFAULT_OPTIONS: ConvertOptions = {
  bullet: "-",
  heading: "atx",
  codeFence: "```",
  images: "inline",
  keepTables: true,
  firstRowHeader: true,
  align: "none",
  pageMarks: false,
  delimiter: "",
};

/**
 * 读进来的工作簿。放在这个壳里而不是 excel-to-markdown.ts，是为了让页面能
 * 只 import 类型 —— 类型在编译期就擦掉了，read-excel-file 不会进首屏包。
 */
export type Workbook = {
  sheets: { name: string; rows: number; cols: number }[];
  /** 原始数据，按 sheets 的顺序。留在内存里，用户换选择时不用重新解析文件。 */
  data: string[][][];
};

export type ConvertResult = {
  markdown: string;
  warnings: string[];
  /** 走的是 .doc 二进制解析器，结果比 .docx 粗糙。 */
  legacy?: boolean;
  /**
   * XLSX 的工作表清单，按文件里的顺序。UI 拿它画选择器 —— 一个工作簿里
   * 常有十几张表，全转出来没人看得下去。
   */
  sheets?: { name: string; rows: number; cols: number }[];
  /** 当前转的是哪几张表（sheets 里的下标）。 */
  picked?: number[];
  stats: {
    words: number;
    headings: number;
    tables: number;
    images: number;
    links: number;
    ms: number;
  };
};

/* ── HTML 输出侧（docs2html）──────────────────────────────── */

/**
 * 片段还是整页。方案 §6.1 / §6.4 明确要两种模式。
 *
 * 差别不只是有没有 <html> 壳：片段是要贴进别人已有页面的，所以不能带
 * <style> —— 那会去改人家其它内容的样子。整页是能直接双击打开的文件，
 * 得自带 charset、viewport 和基础排版。
 */
export type HtmlMode = "fragment" | "document";

export type HtmlOptions = {
  mode: HtmlMode;
  /** 加换行和缩进。产物要给人读、要进 git，所以默认开。 */
  pretty: boolean;
  /** 表格的基础响应式样式（滚动容器 + 边框）。方案 §6.5 / §6.6。 */
  responsive: boolean;
  /** CSV / XLSX：第一行当表头，输出 <thead><th scope="col">。 */
  firstRowHeader: boolean;
  /** CSV：留空表示自动识别分隔符。 */
  delimiter: "" | "," | ";" | "\t" | "|";
  /** 纯文本：把裸 URL 变成链接。方案 §6.4 要求可关。 */
  linkify: boolean;
  /** 纯文本：段内换行转 <br>，而不是并成一行。方案 §6.4 要求可关。 */
  lineBreaks: boolean;
  /** DOCX：图片内嵌成 data: URI，还是抽成 images/ 目录另附 ZIP。 */
  images: "inline" | "extract" | "strip";
  /** 整页模式的 <html lang>。 */
  lang: string;
};

export const DEFAULT_HTML_OPTIONS: HtmlOptions = {
  mode: "fragment",
  pretty: true,
  responsive: true,
  firstRowHeader: true,
  delimiter: "",
  linkify: true,
  lineBreaks: true,
  images: "inline",
  lang: "en",
};

/**
 * 抽出来的图片。images: "extract" 时 DOCX 里的图片走这条路，
 * UI 拿它打包成 ZIP —— 方案 §6.2 的「下载 HTML 与图片 ZIP」。
 */
export type HtmlAsset = { path: string; bytes: Uint8Array; type: string };

export type HtmlResult = {
  /** 用户复制和下载的那份。片段模式是裸片段，整页模式带完整文档壳。 */
  html: string;
  /**
   * 预览用的完整文档，一律带壳。
   *
   * 和 html 分开是因为预览要塞进 sandbox iframe 的 srcdoc（方案 §13），
   * 而 iframe 里没有外层页面的样式 —— 片段模式下光有片段会是一坨无格式文本。
   * 在这儿拼好，UI 就不必也去引一份 CSS。
   */
  preview: string;
  warnings: string[];
  /**
   * 走了老 .doc 那条路。同 ConvertResult.legacy —— UI 拿它把警告框的标题
   * 换成「这是老格式」，而不是罗列条数。
   */
  legacy?: boolean;
  /** 净化时删掉的危险标签/属性，和顺手清掉的死 class、跟踪参数。 */
  removed?: string[];
  tidied?: string[];
  assets?: HtmlAsset[];
  /** XLSX 的工作表清单和当前选中项，同 ConvertResult。 */
  sheets?: { name: string; rows: number; cols: number }[];
  picked?: number[];
  stats: {
    words: number;
    headings: number;
    tables: number;
    images: number;
    links: number;
    /** 产物字节数。HTML 的体积用户是要在意的 —— 内嵌图片会让它涨十几倍。 */
    bytes: number;
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

export class ZipBombError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ZipBombError";
  }
}

/**
 * 输入的格式不是这个页面要的。带上 got 是为了能说清「你给的是 PDF，这页要 xlsx」
 * —— 比笼统的「文件无法读取」有用得多，用户下一步该做什么是明确的。
 */
export class WrongFormatError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WrongFormatError";
  }
}

/** 加密文件。浏览器里没有要密码的交互，直接说清楚让用户先去掉密码。 */
export class EncryptedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EncryptedError";
  }
}

/**
 * PDF 里一个字都取不到。这几乎一定是扫描件 —— 整页只有一张位图，
 * 文字得靠 OCR 才能拿到，而一期不做 OCR。这种情况必须明说是扫描件，
 * 报「转换失败」会让用户以为是工具的 bug，反复重试。
 */
export class NoTextLayerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NoTextLayerError";
  }
}

/** 内容超出这个页面愿意处理的规模（单元格数、页数）。 */
export class TooLargeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TooLargeError";
  }
}

/**
 * 一串条目拼成一句话，超出上限的说清还剩多少条。
 *
 * 存在的理由是「别静悄悄少说」：警告里罗列的是我们对用户内容做了什么，
 * 而 `slice(0, 8).join()` 截断之后读起来跟「一共就这些」完全一样 —— 一次
 * Google Docs 粘贴会带来十几个死 class，「我们重写了你的链接」这条正好被挤掉，
 * 而那是唯一真的改了内容的一条。少说比说得长要糟。
 */
export function listSome(items: string[], limit: number): string {
  const head = items.slice(0, limit).join(", ");
  const rest = items.length - limit;
  return rest > 0 ? `${head} (+${rest} more)` : head;
}

/** 解压后的总大小上限。正常 .docx 展开后是几 MB 量级，400MB 只可能是恶意构造。 */
const MAX_INFLATED = 400 * 1024 * 1024;
/** 压缩比上限。文本压 20 倍很常见，1000 倍的只有全零填充。 */
const MAX_RATIO = 1000;

/**
 * 读 zip 中央目录里声明的解压后大小，超限就拒绝，别让 mammoth 真去解压。
 *
 * .docx 本身就是个 zip，所以用户丢进来的每个文件都是一个潜在的 zip bomb：
 * 几十 KB 的输入能展开成几 GB，浏览器标签页直接 OOM 掉。文件大小限制挡不住
 * 这个 —— 炸弹的特点恰恰是压缩前很小。
 *
 * 只信中央目录里的声明值做预筛：这个值可以撒谎，但撒谎往小了说没有意义（本来
 * 就是想蒙过检查再爆开），而往大了说会被这里挡掉。真正的兜底还是浏览器自己的
 * 内存限制 —— 这里图的是把明显的恶意输入挡在解压之前。
 */
export function checkZipSize(bytes: Uint8Array): void {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);

  let total = 0;
  // 中央目录项的签名是 PK\x01\x02，逐个扫过去累加 uncompressed size
  for (let i = 0; i + 46 <= bytes.length; i++) {
    if (
      bytes[i] === 0x50 &&
      bytes[i + 1] === 0x4b &&
      bytes[i + 2] === 0x01 &&
      bytes[i + 3] === 0x02
    ) {
      total += view.getUint32(i + 24, true);
    }
  }

  if (total > MAX_INFLATED) {
    throw new ZipBombError(
      "This file expands to far more than it should. Refusing to open it.",
    );
  }
  if (bytes.length > 0 && total / bytes.length > MAX_RATIO) {
    throw new ZipBombError(
      "This file's compression ratio looks like a zip bomb. Refusing to open it.",
    );
  }
}

const ZIP_MAGIC = [0x50, 0x4b, 0x03, 0x04];
const OLE_MAGIC = [0xd0, 0xcf, 0x11, 0xe0];
const PDF_MAGIC = [0x25, 0x50, 0x44, 0x46]; // %PDF

function startsWith(bytes: Uint8Array, magic: number[]) {
  return magic.every((b, i) => bytes[i] === b);
}

/**
 * 靠文件头判断真实格式，不信扩展名 —— 很多 .doc 其实是改名的 .docx，反之亦然。
 *
 * zip 只能判到「是个 zip」：.docx 和 .xlsx 的文件头一模一样，要分清得看
 * 里面有没有 word/ 还是 xl/ 目录，那是 zipKind 的事。
 */
export function sniff(bytes: Uint8Array): "zip" | "ole" | "pdf" | "unknown" {
  if (startsWith(bytes, ZIP_MAGIC)) return "zip";
  if (startsWith(bytes, OLE_MAGIC)) return "ole";
  if (startsWith(bytes, PDF_MAGIC)) return "pdf";
  return "unknown";
}

/**
 * 一个 zip 是 docx 还是 xlsx：看中央目录里的文件名。
 *
 * 不解压 —— 中央目录里的文件名是明文存的，扫一遍字节就够。这样才能在
 * 「把 .xlsx 拖到 docx 页面」时说出「这是个 Excel 文件」，而不是让
 * mammoth 解压完再报一句看不懂的错。
 */
export function zipKind(bytes: Uint8Array): "docx" | "xlsx" | "zip" {
  // 只看前 64KB。中央目录在文件尾部，但每个条目在数据前也有一份本地头，
  // 里面同样带文件名，而 word/document.xml、xl/workbook.xml 都排在很前面。
  const head = bytes.subarray(0, Math.min(bytes.length, 65536));
  const text = new TextDecoder("latin1").decode(head);
  if (text.includes("word/document.xml")) return "docx";
  if (text.includes("xl/workbook.xml")) return "xlsx";
  return "zip";
}

/**
 * 一行行数据 → GFM 管道表格。CSV 和 XLSX 共用。
 *
 * GFM 的表格必须有表头行，没有别的写法。所以 firstRowHeader 关掉时不是
 * 「不要表头」，而是给一行空表头 —— 否则输出就不是合法的 GFM 表格了。
 */
export function renderTable(
  rows: string[][],
  opts: { firstRowHeader: boolean; align: Align },
): string {
  if (rows.length === 0) return "";

  const width = Math.max(...rows.map((r) => r.length));
  const pad = (r: string[]) => {
    const copy = r.map(cell);
    while (copy.length < width) copy.push("");
    return copy;
  };

  const grid = rows.map(pad);
  const head = opts.firstRowHeader ? grid[0] : new Array(width).fill("");
  const body = opts.firstRowHeader ? grid.slice(1) : grid;

  const bar = {
    none: "---",
    left: ":---",
    center: ":---:",
    right: "---:",
  }[opts.align];

  return [
    `| ${head.join(" | ")} |`,
    `| ${head.map(() => bar).join(" | ")} |`,
    ...body.map((r) => `| ${r.join(" | ")} |`),
  ].join("\n");
}

/**
 * 单元格文本 → 能安全放进管道表格的一格。
 *
 * 管道要转义，换行也必须处理：单元格里的换行会把一行表格截断成两行，
 * 后半截变成正文。GFM 的格子里只能用 <br>。
 */
function cell(value: string) {
  return value
    .replace(/\r\n?/g, "\n")
    .replace(/\|/g, "\\|")
    .replace(/\n/g, "<br>")
    .replace(/[ \t]+/g, " ")
    .trim();
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
