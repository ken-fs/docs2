/**
 * DOCX → Markdown：mammoth 出 HTML，turndown 转 Markdown。
 * 老 .doc 没有 HTML 中间层，走 legacy-doc.ts 的二进制解析器。
 */
import mammoth from "mammoth";
import TurndownService from "turndown";
import { DocParseError, parseDoc } from "./legacy-doc";
import { docToMarkdown } from "./legacy-doc-to-markdown";
import {
  countStats,
  DEFAULT_OPTIONS,
  LegacyDocError,
  NotADocxError,
  sniff,
  tidy,
  wrapFence,
  type ConvertOptions,
  type ConvertResult,
} from "./types";

function buildTurndown(opts: ConvertOptions) {
  const td = new TurndownService({
    headingStyle: opts.heading,
    bulletListMarker: opts.bullet,
    codeBlockStyle: "fenced",
    fence: opts.codeFence,
    emDelimiter: "_",
    strongDelimiter: "**",
    linkStyle: "inlined",
    br: "  ",
  });

  // Word 的删除线走 <s>/<strike>，turndown 默认丢掉
  td.addRule("strikethrough", {
    filter: ["del", "s"],
    replacement: (content) => `~~${content}~~`,
  });

  // turndown 默认给列表补成 "-   item"（三个空格）。多数 markdown 工具链写的是
  // "- item"，差异会让 diff 变脏，所以自己接管前缀和续行缩进。
  td.addRule("listItem", {
    filter: "li",
    replacement: (content, node) => {
      const parent = node.parentNode as HTMLElement | null;
      let prefix = `${opts.bullet} `;

      if (parent?.nodeName === "OL") {
        const start = Number(parent.getAttribute("start") ?? 1) || 1;
        const index = Array.prototype.indexOf.call(parent.children, node);
        prefix = `${start + index}. `;
      }

      const body = content
        .replace(/^\n+/, "")
        .replace(/\n+$/, "\n")
        .replace(/\n/gm, `\n${" ".repeat(prefix.length)}`);

      const tail =
        (node as HTMLElement).nextSibling && !/\n$/.test(body) ? "\n" : "";
      return prefix + body + tail;
    },
  });

  // Word 的 Code 段落映射成裸 <pre>，turndown 只给 <pre><code> 加围栏，
  // 裸 <pre> 会被当普通文本漏出去。
  td.addRule("bareCodeBlock", {
    filter: (node) =>
      node.nodeName === "PRE" && node.firstChild?.nodeName !== "CODE",
    replacement: (_content, node) => {
      const text = (node.textContent ?? "").replace(/\n+$/, "");
      return `\n\n${wrapFence(text, opts.codeFence)}\n\n`;
    },
  });

  // 上下标在学术文档里很常见，丢了会改变含义
  td.addRule("sup", {
    filter: ["sup"],
    replacement: (content) => `<sup>${content}</sup>`,
  });
  td.addRule("sub", {
    filter: ["sub"],
    replacement: (content) => `<sub>${content}</sub>`,
  });

  if (opts.keepTables) {
    td.addRule("table", {
      filter: "table",
      replacement: (_content, node) => {
        const rows = Array.from((node as HTMLElement).querySelectorAll("tr"));
        if (rows.length === 0) return "";

        const grid = rows.map((tr) =>
          Array.from(tr.querySelectorAll("th,td")).map((cell) =>
            (cell.textContent ?? "")
              .replace(/\s+/g, " ")
              .replace(/\|/g, "\\|")
              .trim(),
          ),
        );

        const width = Math.max(...grid.map((r) => r.length));
        const pad = (r: string[]) => {
          const copy = [...r];
          while (copy.length < width) copy.push("");
          return copy;
        };

        const [head, ...body] = grid.map(pad);
        const lines = [
          `| ${head.join(" | ")} |`,
          `| ${head.map(() => "---").join(" | ")} |`,
          ...body.map((r) => `| ${r.join(" | ")} |`),
        ];
        return `\n\n${lines.join("\n")}\n\n`;
      },
    });
  } else {
    // 关掉表格时，退化成按行的纯文本，别让 HTML 漏出来
    td.addRule("tableAsText", {
      filter: "table",
      replacement: (_content, node) => {
        const rows = Array.from((node as HTMLElement).querySelectorAll("tr"))
          .map((tr) =>
            Array.from(tr.querySelectorAll("th,td"))
              .map((c) => (c.textContent ?? "").replace(/\s+/g, " ").trim())
              .filter(Boolean)
              .join(" · "),
          )
          .filter(Boolean);
        return rows.length ? `\n\n${rows.join("\n\n")}\n\n` : "";
      },
    });
  }

  if (opts.images === "strip") {
    td.addRule("dropImages", { filter: "img", replacement: () => "" });
  } else if (opts.images === "placeholder") {
    td.addRule("placeholderImages", {
      filter: "img",
      replacement: (_c, node) => {
        const alt = (node as HTMLImageElement).getAttribute("alt") || "image";
        return `![${alt}](./images/${slug(alt)}.png)`;
      },
    });
  }

  return td;
}

function slug(s: string) {
  return (
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 40) || "image"
  );
}

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
  const kind = sniff(new Uint8Array(buffer.slice(0, 8)));

  if (kind === "doc") return convertLegacyDoc(buffer, opts, started);
  if (kind === "unknown") {
    throw new NotADocxError("Not a Word document. The file header doesn't match.");
  }

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

  const markdown = tidy(buildTurndown(opts).turndown(html));

  const warnings = Array.from(
    new Set(
      messages
        .filter((m) => m.type === "warning" || m.type === "error")
        .map((m) => m.message),
    ),
  ).slice(0, 8);

  return {
    markdown,
    warnings,
    stats: { ...countStats(markdown), ms: Math.round(performance.now() - started) },
  };
}
