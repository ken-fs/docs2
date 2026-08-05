/**
 * DOCX → Markdown：mammoth 出 HTML，DOMPurify 净化，turndown 转 Markdown。
 *
 * 中间那步不能省。mammoth 只负责如实翻译，不做安全清理，所以 .docx 里的
 * <script>、on* 事件、javascript: 链接都会原样出现在它的输出里 —— 其中
 * javascript: 会被 turndown 照抄进 [label](javascript:...)，在下游的 markdown
 * 渲染器里就是一个能点的 XSS。详见 sanitize.ts。
 *
 * 老 .doc 没有 HTML 中间层，走 legacy-doc.ts 的二进制解析器，输出是纯文本
 * 拼出来的 markdown，不经过 HTML，所以也不需要净化。
 */
import mammoth from "mammoth";
import { DocParseError, parseDoc } from "./legacy-doc";
import { docToMarkdown } from "./legacy-doc-to-markdown";
import { assertClean, sanitizeHtml } from "./sanitize";
import { buildTurndown } from "./turndown-rules";
import {
  checkZipSize,
  countStats,
  DEFAULT_OPTIONS,
  LegacyDocError,
  listSome,
  NotADocxError,
  sniff,
  tidy,
  zipKind,
  type ConvertOptions,
  type ConvertResult,
} from "./types";

function convertLegacyDoc(
  buffer: ArrayBuffer,
  opts: ConvertOptions,
  started: number,
): ConvertResult {
  let paragraphs;
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

  const markdown = tidy(docToMarkdown(paragraphs, opts));
  const warnings = [
    "Read as legacy .doc — images and exact list numbering can't be recovered from this format.",
  ];
  if (!markdown) {
    warnings.push("No text found. The document may hold only images or objects.");
  }

  return {
    markdown,
    warnings,
    legacy: true,
    stats: { ...countStats(markdown), ms: Math.round(performance.now() - started) },
  };
}

export async function convertDocx(
  file: File,
  opts: ConvertOptions = DEFAULT_OPTIONS,
): Promise<ConvertResult> {
  const started = performance.now();
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const kind = sniff(bytes);

  if (kind === "ole") return convertLegacyDoc(buffer, opts, started);
  if (kind === "pdf") {
    throw new NotADocxError(
      "That's a PDF, not a Word document. Use the PDF to Markdown page instead.",
    );
  }
  if (kind === "unknown") {
    throw new NotADocxError("Not a Word document. The file header doesn't match.");
  }

  // .docx 和 .xlsx 的文件头一样，认不出来会让 mammoth 报一句看不懂的错
  if (zipKind(bytes) === "xlsx") {
    throw new NotADocxError(
      "That's an Excel workbook, not a Word document. Use the Excel to Markdown page instead.",
    );
  }

  // .docx 就是个 zip，解压前先看看它声称会展开成多大
  checkZipSize(bytes);

  const { value: html, messages } = await mammoth.convertToHtml(
    { arrayBuffer: buffer },
    {
      convertImage:
        opts.images === "inline"
          ? mammoth.images.imgElement(async (image) => {
              const b64 = await image.read("base64");
              return {
                src: `data:${image.contentType};base64,${b64}`,
                alt: (image as { altText?: string }).altText ?? "",
              };
            })
          : undefined,
      styleMap: [
        "p[style-name='Title'] => h1:fresh",
        "p[style-name='Subtitle'] => h2:fresh",
        "p[style-name='Quote'] => blockquote:fresh",
        "p[style-name='Intense Quote'] => blockquote:fresh",
        "p[style-name='Code'] => pre:separator('\\n')",
        "p[style-name='Source Code'] => pre:separator('\\n')",
        // Word 自己的预格式化样式名，和 LibreOffice 的写法
        "p[style-name='HTML Preformatted'] => pre:separator('\\n')",
        "p[style-name='Preformatted Text'] => pre:separator('\\n')",
        "r[style-name='Code Char'] => code",
        "r[style-name='Strong'] => strong",
      ],
    },
  );

  const { html: clean, removed, tidied } = sanitizeHtml(html);
  // 净化之后不再做任何会重新引入标签的处理，走一遍 DOM 确认这一点
  assertClean(clean);

  const markdown = tidy(buildTurndown(opts).turndown(clean));

  const notes = Array.from(
    new Set(
      messages
        .filter((m) => m.type === "warning" || m.type === "error")
        .map((m) => m.message),
    ),
  );
  // 一份样式很杂的文档能出几十条，全列出来没人看。但截断了要说一声 ——
  // 「这里只显示前 8 条」和「一共就 8 条」对用户是两件不同的事。
  const warnings = notes.slice(0, 8);
  if (notes.length > warnings.length) {
    warnings.push(`…and ${notes.length - warnings.length} more notes like these.`);
  }

  // Word 里的超链接常带 utm_*，从 Google Docs 转存的 .docx 还带 /url?q= 包装。
  // 改了链接指向就要说，排在 mammoth 那些样式提示前面 —— 那些是「这里没转好」，
  // 这条是「我们动了你的内容」。
  if (tidied.length) {
    warnings.unshift(`Cleaned out: ${listSome(tidied, 8)}`);
  }

  // 文档里带脚本或事件属性属于异常，明确告诉用户删了什么，别静悄悄处理
  if (removed.length) {
    warnings.unshift(
      `Removed unsafe HTML from this document: ${listSome(removed, 8)}`,
    );
  }

  return {
    markdown,
    warnings,
    stats: { ...countStats(markdown), ms: Math.round(performance.now() - started) },
  };
}
