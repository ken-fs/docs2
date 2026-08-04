/**
 * turndown 的配置和自定义规则。DOCX 和粘贴的富文本共用这一套，
 * 所以拆出来 —— html-to-markdown 不该为了这些规则把 mammoth 一起拉进包里。
 *
 * 进来的 HTML 必须已经过 sanitize.ts。这里只管排版，不管安全。
 */
import TurndownService from "turndown";
import { wrapFence, type ConvertOptions } from "./types";

export function buildTurndown(opts: ConvertOptions) {
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
