/**
 * PPTX / PPT / ODT / ODS / ODP / RTF / EPUB → Markdown，走 anydoc 的 WASM。
 *
 * 这几种格式现有的 JS 栈都没有，而各写一个解析器不现实（PPTX 的 DrawingML、
 * ODF 的 flat/zip 两种封装、EPUB 的 spine 顺序，每个都是一个 mammoth 量级的
 * 工程）。anydoc 是纯 Rust 编译的 WASM，一块 blob 就覆盖全部，MIT，转换全在
 * 本地跑，文件不出浏览器 —— 和这两个站的承诺对得上。
 *
 * 代价是那块 .wasm 有 6.7MB（gzip 2.8MB）且不能按格式拆。所以它只该在这些
 * 新格式的工具页上懒加载，绝不进首屏，也不碰已经调好、且过了敌意样本测试的
 * docx（mammoth）/ pdf（pdfjs）/ html / csv / excel 那几条链。
 *
 * .wasm 的加载交给打包器：anydoc 的胶水用 `new URL('…_bg.wasm',
 * import.meta.url)` 定位它，Next（Turbopack/webpack）会把这块 .wasm 当成资源
 * 发到 `_next/static/media/` 下，同源、带 hash、自动解析 —— 不碰任何 CDN，也就
 * 不用像 pdf.js 那样手动 copy 进 public/（pdf.js 的 worker 是运行时按 URL 起的
 * Web Worker，打包器管不到，才必须自托管；wasm 不是那种情况）。
 */
import {
  checkZipSize,
  countStats,
  DEFAULT_OPTIONS,
  EncryptedError,
  TooLargeError,
  tidy,
  WrongFormatError,
  type ConvertOptions,
  type ConvertResult,
} from "./types";

/** 这个转换器认领的格式。docx/doc/xlsx/csv/pdf/html 都另有专门链路，不走这里。 */
const OFFICE_FORMATS = new Set([
  "pptx",
  "ppt",
  "odt",
  "ods",
  "odp",
  "rtf",
  "epub",
]);

const MAX_BYTES = 25 * 1024 * 1024;

/**
 * WASM 初始化一次就够，缓存这个 promise。多个页面切换、连转几个文件都复用同一个
 * 实例 —— 6.7MB 的东西没有理由 fetch 两遍。
 */
let ready: Promise<typeof import("@firecrawl/anydoc-wasm")> | null = null;

function init() {
  if (!ready) {
    ready = import("@firecrawl/anydoc-wasm").then(async (mod) => {
      // 不传参：胶水走 `new URL('…_bg.wasm', import.meta.url)`，打包器已把 .wasm
      // 发到同源的 _next/static/media/ 下，这里 fetch + instantiate 它。
      await mod.default();
      return mod;
    });
  }
  return ready;
}

export async function convertOffice(
  file: File,
  opts: ConvertOptions = DEFAULT_OPTIONS,
): Promise<ConvertResult> {
  const started = performance.now();

  if (file.size > MAX_BYTES) {
    throw new TooLargeError("That file is over 25 MB. Too big for the browser.");
  }

  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);

  const mod = await init();

  // 靠内容认格式，不信扩展名 —— 和站里其它转换器一个规矩。
  const format = mod.formatFromBytes(bytes);
  if (!format || !OFFICE_FORMATS.has(format)) {
    throw new WrongFormatError(
      wrongFormatMessage(format),
    );
  }

  // PPTX / ODF / EPUB 都是 zip，同样有 zip bomb 风险，解析前先按声明大小挡一道。
  if (format !== "rtf") checkZipSize(bytes);

  let markdown: string;
  try {
    markdown = tidy(mod.toMarkdownBytes(bytes, format));
  } catch (err) {
    throw mapError(err);
  }

  const warnings: string[] = [];
  if (!markdown) {
    warnings.push("No text found. The file may hold only images or media.");
  }
  // PPTX/ODP 的演讲者备注、EPUB 的多章顺序这些都由 anydoc 决定，效果尽力而为，
  // 复杂排版（分栏、浮动图文框）可能拉平成线性文本。这条要在页面上写明。
  warnings.push(
    "Layout is flattened to linear Markdown — slides, speaker notes and multi-column pages come through as plain sections.",
  );

  return {
    markdown,
    warnings,
    stats: { ...countStats(markdown), ms: Math.round(performance.now() - started) },
  };
}

function wrongFormatMessage(format: string | undefined): string {
  // anydoc 认出来是站里另有专页的格式时，指个明确去处，别只说"不支持"。
  switch (format) {
    case "docx":
    case "doc":
      return "That's a Word document. Use the DOCX to Markdown page instead.";
    case "xlsx":
      return "That's an Excel workbook. Use the Excel to Markdown page instead.";
    case "csv":
      return "That's a CSV. Use the CSV to Markdown page instead.";
    case "pdf":
      return "That's a PDF. Use the PDF to Markdown page instead.";
    default:
      return "This file isn't a presentation, OpenDocument, RTF or EPUB file.";
  }
}

/** anydoc 的 ConvertErrorCode → 站里已有的错误类，文案跟其它转换器保持一致。 */
function mapError(err: unknown): Error {
  const code = (err as { code?: string }).code;
  switch (code) {
    case "encrypted":
      return new EncryptedError(
        "This file is password-protected. Remove the password first — we can't ask for it here.",
      );
    case "resourceLimit":
      return new TooLargeError(
        "This file crossed a safety limit (size, nesting or complexity). Refusing to open it.",
      );
    case "unsupported":
      return new WrongFormatError(
        "This file can't be converted — it may be an image-only document with no extractable text.",
      );
    case "malformed":
    case "missingPart":
      return new WrongFormatError(
        "This file is damaged — its structure doesn't parse.",
      );
    default:
      return err instanceof Error ? err : new Error(String(err));
  }
}
