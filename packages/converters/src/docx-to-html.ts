/**
 * DOCX → HTML：mammoth 出 HTML，DOMPurify 净化，再收拾成语义化片段。
 *
 * mammoth 的文档明确写了它不做安全清理 —— 一份 .docx 可以带 <script>、
 * on* 事件属性和 javascript: 超链接，它会原样翻出来。这条链上净化是必需的，
 * 不是加固（方案 §12 的处理链就是 Mammoth → DOMPurify）。
 *
 * 和 docx-to-markdown 的差别不只是最后一步换成"不转 markdown"：
 *   - 语义标签要留住。markdown 那边 <thead> 会被压成一行分隔符，这边要保留。
 *   - Word 的冗余 class 要清掉（方案 §6.2）—— MsoNormal 之类指向的样式表
 *     不在用户的页面里，留着就是死 class。
 *   - 图片可以抽成 ZIP，因为 HTML 能引用外部文件，而 markdown 那边内嵌
 *     data: URI 更常用。
 *
 * 老 .doc 没有 HTML 中间层：它先走 legacy-doc.ts 的二进制解析器出 Markdown，
 * 再走 markdown-to-html。绕这一圈是有意的 —— 那套段落→Markdown 的逻辑
 * （标题级别推断、伪列表识别、表格聚合）已经在 .doc → Markdown 那条路上验过，
 * 为 HTML 再写一份平行实现只会多一处会漂的地方。这种格式本来就拿不到图片和
 * 精确编号，Markdown 表达得下。
 */
import mammoth from "mammoth";
import {
  assertCleanHtml,
  countHtmlStats,
  guessTitle,
  prettyHtml,
  sanitizeForHtml,
  wrapDocument,
} from "./html-out";
import { DocParseError, parseDoc, type DocParagraph } from "./legacy-doc";
import { docToMarkdown } from "./legacy-doc-to-markdown";
import { convertMarkdown } from "./markdown-to-html";
import {
  checkZipSize,
  DEFAULT_HTML_OPTIONS,
  DEFAULT_OPTIONS,
  LegacyDocError,
  listSome,
  NotADocxError,
  sniff,
  zipKind,
  type HtmlAsset,
  type HtmlOptions,
  type HtmlResult,
} from "./types";

/**
 * Word 的样式名 → HTML 标签。
 *
 * 比 markdown 那份多两条：Caption 映射成 <figcaption> 的语义，
 * Word 的 Emphasis 字符样式映射成 <em> —— markdown 那边这些差别会被抹平，
 * 这边留得住就该留。
 */
const STYLE_MAP = [
  "p[style-name='Title'] => h1:fresh",
  "p[style-name='Subtitle'] => h2:fresh",
  "p[style-name='Quote'] => blockquote:fresh",
  "p[style-name='Intense Quote'] => blockquote:fresh",
  "p[style-name='Code'] => pre:separator('\\n')",
  "p[style-name='Source Code'] => pre:separator('\\n')",
  "p[style-name='HTML Preformatted'] => pre:separator('\\n')",
  "p[style-name='Preformatted Text'] => pre:separator('\\n')",
  "p[style-name='Caption'] => p.caption:fresh",
  "r[style-name='Code Char'] => code",
  "r[style-name='Strong'] => strong",
  "r[style-name='Emphasis'] => em",
];

export async function convertDocxToHtml(
  file: File,
  opts: HtmlOptions = DEFAULT_HTML_OPTIONS,
): Promise<HtmlResult> {
  const started = performance.now();
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const kind = sniff(bytes);
  const name = file.name.replace(/\.(docx?|zip)$/i, "") || "Document";

  if (kind === "ole") return legacy(buffer, opts, name, started);
  if (kind === "pdf") {
    throw new NotADocxError(
      "That's a PDF, not a Word document. This page reads .docx and .doc.",
    );
  }
  if (kind === "unknown") {
    throw new NotADocxError("Not a Word document. The file header doesn't match.");
  }
  // .docx 和 .xlsx 的文件头一模一样，认不出来会让 mammoth 报一句看不懂的错
  if (zipKind(bytes) === "xlsx") {
    throw new NotADocxError(
      "That's an Excel workbook, not a Word document. Use the Excel to HTML Table page instead.",
    );
  }

  // .docx 就是个 zip，解压前先看看它声称会展开成多大
  checkZipSize(bytes);

  const assets: HtmlAsset[] = [];
  const { value: raw, messages } = await mammoth.convertToHtml(
    { arrayBuffer: buffer },
    {
      convertImage: imageHandler(opts, assets),
      styleMap: STYLE_MAP,
    },
  );

  const { html: clean, removed, tidied } = sanitizeForHtml(raw);
  // 净化之后只剩美化和套壳。走一遍 DOM 确认没有标签漏过来。
  assertCleanHtml(clean);

  const fragment = opts.pretty ? prettyHtml(clean) : clean;
  const title = guessTitle(fragment, name);
  const document = wrapDocument(fragment, {
    title,
    lang: opts.lang,
    responsive: opts.responsive,
    pretty: opts.pretty,
  });

  // mammoth 会报「这个样式我不认识」之类的信息。多数无害，但去重后给用户看，
  // 因为它们解释了「为什么这段的格式没了」。
  const notes = Array.from(
    new Set(
      messages
        .filter((m) => m.type === "warning" || m.type === "error")
        .map((m) => m.message),
    ),
  );
  // 截断了要说一声：「只显示前 8 条」和「一共 8 条」对用户是两件事
  const warnings = notes.slice(0, 8);
  if (notes.length > warnings.length) {
    warnings.push(`…and ${notes.length - warnings.length} more notes like these.`);
  }

  // 文档里带脚本或事件属性属于异常，明说删了什么，别静悄悄处理
  if (removed.length) {
    warnings.unshift(
      `Removed unsafe HTML from this document: ${listSome(removed, 8)}`,
    );
  }
  if (tidied.length) {
    warnings.push(`Cleaned out Word's leftover markup: ${listSome(tidied, 6)}`);
  }

  const html = opts.mode === "document" ? document : fragment;

  return {
    html,
    preview: document,
    warnings,
    removed,
    tidied,
    assets: assets.length ? assets : undefined,
    stats: {
      ...countHtmlStats(fragment),
      bytes: new TextEncoder().encode(html).length,
      ms: Math.round(performance.now() - started),
    },
  };
}

/**
 * 图片处理。三种模式：
 *
 *   inline    转成 data: URI 塞进 src。单文件，能直接双击打开，代价是
 *             HTML 体积会涨十几倍 —— 一张 2MB 的照片 base64 后是 2.7MB。
 *   extract   写成 images/ 下的文件，src 指向相对路径，图片另出一个 ZIP。
 *             方案 §6.2 要的「下载 HTML 与图片 ZIP」。
 *   strip     整个丢掉。
 */
function imageHandler(opts: HtmlOptions, assets: HtmlAsset[]) {
  if (opts.images === "strip") {
    // mammoth 没有「跳过图片」的开关，映射成空元素等于丢掉
    return mammoth.images.imgElement(async () => ({ src: "" }));
  }

  if (opts.images === "extract") {
    let n = 0;
    return mammoth.images.imgElement(async (image) => {
      n++;
      const ext = extOf(image.contentType);
      const path = `images/image-${String(n).padStart(2, "0")}.${ext}`;
      const b64 = await image.read("base64");
      assets.push({ path, bytes: fromBase64(b64), type: image.contentType });
      return {
        src: path,
        alt: (image as { altText?: string }).altText ?? "",
        // 抽出来的图片尺寸未知，交给 CSS 兜 max-width。给 loading=lazy 是
        // 因为导出的整页文档里可能有几十张图。
        loading: "lazy",
      };
    });
  }

  return mammoth.images.imgElement(async (image) => {
    const b64 = await image.read("base64");
    return {
      src: `data:${image.contentType};base64,${b64}`,
      alt: (image as { altText?: string }).altText ?? "",
    };
  });
}

function extOf(contentType: string) {
  const known: Record<string, string> = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/gif": "gif",
    "image/webp": "webp",
    "image/bmp": "bmp",
    "image/tiff": "tiff",
    "image/svg+xml": "svg",
    "image/x-emf": "emf",
    "image/x-wmf": "wmf",
  };
  return known[contentType] ?? "bin";
}

function fromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

/**
 * 老 .doc → HTML，经 Markdown 中转。
 *
 * docToMarkdown 已经处理好了这种格式的所有麻烦事（sti 标题号、字号兜底、
 * 伪列表、表格单元格聚合），产物再交给 markdown-to-html 就是完整的一条链。
 * 中间的 Markdown 是我们自己生成的，但仍然照常过 DOMPurify —— 里面的文字
 * 来自用户的文档，不是常量。
 */
function legacy(
  buffer: ArrayBuffer,
  opts: HtmlOptions,
  name: string,
  started: number,
): HtmlResult {
  let paragraphs: DocParagraph[];
  try {
    paragraphs = parseDoc(buffer);
  } catch (err) {
    // 解析器自己报的错话说得清楚，直接透给用户；其它错兜成一句人话
    throw new LegacyDocError(
      err instanceof DocParseError
        ? err.message
        : "Couldn't read this .doc. Try re-saving it as .docx in Word.",
    );
  }

  const markdown = docToMarkdown(paragraphs, DEFAULT_OPTIONS);
  // .doc 里没有软换行信息，breaks 开着只会把长段落切碎
  const result = convertMarkdown(markdown, { ...opts, lineBreaks: false }, name);

  const warnings = [
    "Read as legacy .doc — images and exact list numbering can't be recovered from this format.",
    ...result.warnings,
  ];
  if (!markdown.trim()) {
    warnings.push("No text found. The document may hold only images or objects.");
  }

  return {
    ...result,
    warnings,
    legacy: true,
    // 时间要从读文件算起，不是从 Markdown 那一步
    stats: { ...result.stats, ms: Math.round(performance.now() - started) },
  };
}
