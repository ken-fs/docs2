/**
 * PDF → Markdown。只处理有文字层的 PDF。
 *
 * 必须先讲清楚这件事的性质：PDF 里没有「段落」和「标题」这些结构。它存的是
 * 「在坐标 (x, y) 用 12pt 的某个字体画这串字符」—— 一份排好版的印刷品，
 * 而不是一棵文档树。DOCX 那边有真的 <h1>，这里什么都没有。
 *
 * 所以这个转换是重建，不是翻译：靠字号猜标题，靠垂直间距猜段落边界，
 * 靠 x 坐标猜列表缩进。对单栏的正常文档效果不错，多栏、复杂表格、公式
 * 只能是尽力而为 —— 这条限制必须在页面上写明白，别让用户以为是自己用错了。
 *
 * 完全取不到字的那种是扫描件：整页只有一张位图，抽出来是空的。这时抛
 * NoTextLayerError 而不是返回空结果 —— 用户需要知道原因是「这是张图片」，
 * 否则只会一遍遍重试。一期不做 OCR。
 */
import {
  countStats,
  DEFAULT_OPTIONS,
  EncryptedError,
  NoTextLayerError,
  TooLargeError,
  tidy,
  WrongFormatError,
  sniff,
  type ConvertOptions,
  type ConvertResult,
} from "./types";

/** pdf.js 的资源位置。由调用方给，这个包不该知道站点的 public 目录长什么样。 */
export type PdfAssets = {
  workerSrc: string;
  cMapUrl: string;
  standardFontDataUrl: string;
  /** 复制资源时的 pdfjs-dist 版本，和库自报的版本对不上就报错。 */
  assetVersion: string;
};

const MAX_BYTES = 25 * 1024 * 1024;
/** 页数上限。再多的话光解析就要几十秒，浏览器标签页会像卡死一样。 */
const MAX_PAGES = 500;

type Line = {
  /** 基线的 y。PDF 的坐标系原点在左下角，所以 y 越大越靠上。 */
  y: number;
  x: number;
  /** 行里最大的字号。标题判定看这个。 */
  size: number;
  text: string;
};

export async function convertPdf(
  file: File,
  assets: PdfAssets,
  opts: ConvertOptions = DEFAULT_OPTIONS,
): Promise<ConvertResult> {
  const started = performance.now();

  if (file.size > MAX_BYTES) {
    throw new TooLargeError("That PDF is over 25 MB. Too big for the browser.");
  }

  const buffer = await file.arrayBuffer();
  const kind = sniff(new Uint8Array(buffer));
  if (kind !== "pdf") {
    throw new WrongFormatError(
      kind === "zip"
        ? "That's an Office file, not a PDF. Try the DOCX or Excel page."
        : "Not a PDF. The file header doesn't match.",
    );
  }

  const pdfjs = await import("pdfjs-dist");

  // 版本对不上就是有人升了依赖但没重跑资源复制脚本。让它现在就响，
  // 而不是等到用户转一份日文 PDF 时 cmap 加载失败。
  if (pdfjs.version !== assets.assetVersion) {
    throw new Error(
      `pdf.js is ${pdfjs.version} but its assets are ${assets.assetVersion}. Re-run the asset copy step.`,
    );
  }

  // worker 是同源的自托管文件。pdf.js 默认会去 CDN 拿 —— 那等于把用户在用
  // 这个工具的事告诉第三方，和「文件不出你电脑」的承诺冲突。
  pdfjs.GlobalWorkerOptions.workerSrc = assets.workerSrc;

  const task = pdfjs.getDocument({
    data: new Uint8Array(buffer),
    // 中日韩的 PDF 靠预定义 CMap 把字符码映射回 Unicode，没有这个抽出来是乱码
    cMapUrl: assets.cMapUrl,
    cMapPacked: true,
    standardFontDataUrl: assets.standardFontDataUrl,
    // 只抽文字，不渲染 —— jbig2/openjpeg 那些 wasm 解码器是给图像用的，白占带宽
    useWasm: false,
    // 字体只用来量字号，不需要真的注册进页面
    disableFontFace: true,
    // 出错的页跳过，别让一页坏了整份文件都读不出来
    stopAtErrors: false,
  });

  let doc;
  try {
    doc = await task.promise;
  } catch (err) {
    const name = (err as { name?: string }).name;
    if (name === "PasswordException") {
      throw new EncryptedError(
        "This PDF is password-protected. Remove the password first — we can't ask for it here.",
      );
    }
    if (name === "InvalidPDFException") {
      throw new WrongFormatError("This PDF is damaged — its structure doesn't parse.");
    }
    throw err;
  }

  try {
    if (doc.numPages > MAX_PAGES) {
      throw new TooLargeError(
        `That's ${doc.numPages} pages. The cap here is ${MAX_PAGES}.`,
      );
    }

    const parts: string[] = [];
    const failed: number[] = [];
    const blankPages: number[] = [];

    for (let n = 1; n <= doc.numPages; n++) {
      let lines: Line[];
      let height: number;
      try {
        const page = await doc.getPage(n);
        try {
          const content = await page.getTextContent();
          lines = toLines(content.items);
          // view 是 [x1, y1, x2, y2]。页高用来判断哪些行贴在页眉页脚位置 ——
          // A4 和 Letter 高度不同，写死 792 在 A4 上就错了。
          height = page.view[3] - page.view[1];
        } finally {
          // 每页的中间结构不主动清掉会一直堆在内存里，几百页的文件很可观
          page.cleanup();
        }
      } catch {
        failed.push(n);
        continue;
      }

      if (lines.length === 0) {
        blankPages.push(n);
        continue;
      }

      // 页码标记要在正文之前，不然「第 N 页」标在了上一页的末尾
      if (opts.pageMarks) parts.push(`<!-- page ${n} -->`);
      parts.push(toMarkdown(lines, height, opts));
    }

    const markdown = tidy(parts.join("\n\n"));

    if (!markdown) {
      throw new NoTextLayerError(
        "No text found in this PDF. It's most likely a scan — the pages are images, and reading them needs OCR, which this tool doesn't do.",
      );
    }

    const warnings: string[] = [];

    // 大部分页空、只有零星几页有字，通常是「扫描件 + 一页文字目录」这种混合件。
    // 结果不完整但看不出来，必须提。
    if (blankPages.length > 0) {
      const all = blankPages.length === doc.numPages;
      warnings.push(
        all
          ? "No page had a text layer."
          : `${blankPages.length} of ${doc.numPages} pages had no text layer (${brief(blankPages)}) — those pages are probably scans.`,
      );
    }
    if (failed.length > 0) {
      warnings.push(`${failed.length} pages failed to parse and were skipped (${brief(failed)}).`);
    }
    warnings.push(
      "Headings and paragraphs are inferred from font size and spacing — a PDF has no real structure. Multi-column pages, tables and formulas are best-effort.",
    );

    return {
      markdown,
      warnings,
      stats: { ...countStats(markdown), ms: Math.round(performance.now() - started) },
    };
  } finally {
    // destroy 在 loading task 上，不在 document 上 —— 它要连 worker 一起关。
    // 不关的话转十个文件就是十个 worker 线程一直挂着。
    await task.destroy();
  }
}

/** 页码列表太长就省略，报错信息不该是一屏数字。 */
function brief(pages: number[]) {
  const head = pages.slice(0, 6).join(", ");
  return pages.length > 6 ? `${head}, …` : head;
}

/**
 * 文字片段 → 行。
 *
 * pdf.js 给的是一个个片段，一行字常常被切成好几段（换字体、换字号、
 * 甚至只是字距微调都会切）。按 y 坐标归拢回行是重建结构的第一步。
 */
function toLines(items: unknown[]): Line[] {
  const lines: Line[] = [];
  // 上一个片段带了 hasEOL：pdf.js 明确说这里断行了，不管坐标怎么写。
  // 有些 PDF 会在同一个 y 上先画正文再画行号，坐标分不开，这个标志分得开。
  let broken = true;

  for (const item of items) {
    // items 里还混着 TextMarkedContent（标记结构的标签），没有 str
    if (!isTextItem(item)) continue;

    // pdf.js 会吐出 str 为空、只带 hasEOL 的片段，那是纯换行信号。
    // 要在这里就地记下断行再跳过 —— 当成"没有内容"直接忽略会丢掉换行。
    if (!item.str) {
      broken ||= item.hasEOL;
      continue;
    }

    const [, , , scaleY, x, y] = item.transform;
    // 字号是变换矩阵里的 y 方向缩放，不是 item.height —— 后者带行高
    const size = Math.abs(scaleY);

    const prev = lines[lines.length - 1];
    // 同一行的判定：y 差在字号的一半以内。用字号而不是固定像素，
    // 因为 8pt 的脚注和 24pt 的标题，"同一行" 的容差本来就不一样。
    const sameLine =
      !broken && prev && Math.abs(prev.y - y) < Math.max(1, size * 0.5);

    if (sameLine) {
      prev.text += item.str;
      prev.size = Math.max(prev.size, size);
    } else if (item.str.trim()) {
      lines.push({ y, x, size, text: item.str });
    }

    broken = item.hasEOL;
  }

  return lines
    .map((l) => ({ ...l, text: l.text.replace(/[ \t]+/g, " ").trim() }))
    .filter((l) => l.text.length > 0);
}

function isTextItem(
  item: unknown,
): item is { str: string; transform: number[]; hasEOL: boolean } {
  return typeof (item as { str?: unknown }).str === "string";
}

/**
 * 行 → Markdown。
 *
 * 三件事：认标题（字号明显大于正文）、认列表（行首是项目符号或编号）、
 * 把断成多行的段落接回一段。
 */
function toMarkdown(
  lines: Line[],
  height: number,
  opts: ConvertOptions,
): string {
  const body = bodySize(lines);
  // 上下各 9% 的页边距算页眉页脚区。按比例而不是按点数，A4 和 Letter 才通用。
  const margin = height * 0.09;
  const out: Block[] = [];
  let para: string[] = [];

  const flush = () => {
    if (para.length) {
      out.push({ kind: "para", text: join(para) });
      para = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const prev = lines[i - 1];

    // 页眉页脚：字号明显小于正文，而且贴在页面的上下边缘。这类内容
    // （页码、"内部资料"、章节名）在每页重复，混进正文里会打断阅读。
    // 方案里也写了页眉页脚不保证保留。
    if (line.size < body * 0.9 && (line.y < margin || line.y > height - margin)) {
      continue;
    }

    // 标题：字号比正文大一档以上，而且不长 —— 大字号的整段正文（比如引言）
    // 不是标题，长度是最有效的区分信号
    const ratio = line.size / body;
    if (ratio >= 1.15 && line.text.length <= 120) {
      flush();
      // 1.15 / 1.35 / 1.6 三档对应 h3 / h2 / h1。原文的层级信息已经没了，
      // 能保住的只是「这几个标题是同一级」这个相对关系。
      const level = ratio >= 1.6 ? 1 : ratio >= 1.35 ? 2 : 3;
      out.push({ kind: "head", text: `${"#".repeat(level)} ${line.text}` });
      continue;
    }

    // 列表项：行首的 • - * 或 "1." "1)"
    const bullet = line.text.match(/^[•·▪◦‣∙]\s*(.*)$/);
    const ordered = line.text.match(/^(\d{1,3})[.)]\s+(.*)$/);
    if (bullet || ordered) {
      flush();
      out.push(
        bullet
          ? { kind: "item", ordered: false, text: `${opts.bullet} ${bullet[1]}` }
          : {
              kind: "item",
              ordered: true,
              text: `${ordered![1]}. ${ordered![2]}`,
            },
      );
      continue;
    }

    // 段落边界：行距明显大于正常行距。PDF 里段间距就是靠这个表现的。
    if (prev && prev.y - line.y > line.size * 1.8) flush();

    para.push(line.text);
  }

  flush();

  // 相邻的列表项之间空一行会变成 loose list，渲染出来每项都套一层 <p>，
  // 行距很松。所以同一个列表内部用单换行，块之间才空行。
  //
  // 但有序和无序之间必须空行：紧挨着写的话，是不是同一个列表要看渲染器的
  // 脾气 —— 空行让它没有歧义。
  return out
    .map((block, i) => {
      const prev = out[i - 1];
      if (!prev) return block.text;
      const tight =
        prev.kind === "item" &&
        block.kind === "item" &&
        prev.ordered === block.ordered;
      return (tight ? "\n" : "\n\n") + block.text;
    })
    .join("");
}

type Block =
  | { kind: "head" | "para"; text: string; ordered?: undefined }
  | { kind: "item"; text: string; ordered: boolean };

/**
 * 正文字号 = 出现得最多的那个字号。
 *
 * 不用平均值：一页里标题和页码都是少数，但它们会把平均值往两边拽。
 * 众数才是「这份文档的正文有多大」。字号取整到 0.5pt，免得 11.999 和 12
 * 被当成两种。
 */
function bodySize(lines: Line[]): number {
  const tally = new Map<number, number>();
  for (const line of lines) {
    const key = Math.round(line.size * 2) / 2;
    // 按字符数计权，不是按行数 —— 一行长正文比一行短标题更能代表正文
    tally.set(key, (tally.get(key) ?? 0) + line.text.length);
  }
  let best = 12;
  let most = 0;
  for (const [size, weight] of tally) {
    if (weight > most) {
      most = weight;
      best = size;
    }
  }
  return best || 12;
}

/**
 * 把一段里的多行接成一行。
 *
 * 关键是连字符：印刷排版会把单词断在行尾（"conver-" / "sion"），直接用空格
 * 接起来会得到 "conver- sion"。但真正带连字符的复合词（"well-known"）不能
 * 拼掉。区分办法是看下一行的开头 —— 小写字母接上去就是断词，大写或数字
 * 就当它本来就有连字符。
 */
function join(lines: string[]): string {
  let out = "";
  for (const line of lines) {
    if (!out) {
      out = line;
      continue;
    }
    if (/[-‐‑]$/.test(out) && /^[a-zà-ÿ]/.test(line)) {
      out = out.slice(0, -1) + line;
    } else if (/[　-鿿＀-￯]$/.test(out)) {
      // 中日韩不用空格分词，接空格反而多出一个空隙
      out += line;
    } else {
      out += ` ${line}`;
    }
  }
  return out;
}
