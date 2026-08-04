/**
 * .doc 段落 → Markdown。
 *
 * .docx 那条路是 mammoth 出 HTML、turndown 转 Markdown；.doc 没有 HTML 中间层，
 * 所以这里直接拼 Markdown，但输出风格要和 .docx 那边对齐（同样的 bullet、
 * 同样的围栏、同样的管道表格），否则两种输入出来的东西看着像两个工具。
 */
import type { DocParagraph, DocRun } from "./doc";
import type { ConvertOptions } from "./convert";

/** 行内 Markdown 元字符，转义掉免得正文里的 * _ 被当标记。 */
function escapeInline(text: string) {
  return text
    .replace(/([\\`*_[\]<>])/g, "\\$1")
    .replace(/^(\s*)(#{1,6})(\s)/gm, "$1\\$2$3")
    .replace(/^(\s*)(\d+)\.(\s)/gm, "$1$2\\.$3")
    .replace(/^(\s*)([-+])(\s)/gm, "$1\\$2$3");
}

function renderRuns(runs: DocRun[]) {
  let out = "";
  for (const run of runs) {
    // 隐藏文字在解析层被标成 size 0
    if (run.size === 0) continue;
    const raw = run.text.replace(/\t/g, "    ");
    if (!raw) continue;

    // 首尾空白必须留在标记外面，**foo ** 在多数渲染器里不生效
    const lead = raw.match(/^\s*/)?.[0] ?? "";
    const trail = raw.match(/\s*$/)?.[0] ?? "";
    const core = raw.slice(lead.length, raw.length - trail.length);
    if (!core) {
      out += raw;
      continue;
    }

    let body = escapeInline(core);
    if (run.strike) body = `~~${body}~~`;
    if (run.bold) body = `**${body}**`;
    if (run.italic) body = `_${body}_`;
    out += lead + body + trail;
  }
  return out.replace(/[ \t]+$/g, "");
}

function plainText(runs: DocRun[]) {
  return runs
    .filter((r) => r.size !== 0)
    .map((r) => r.text)
    .join("")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * 标题级别。先认样式（真 Word 存的是 sti 1–9 / Title），
 * 认不出来再看字号 —— textutil、WPS 之类的生成器经常所有段落都是 Normal。
 */
function headingLevel(p: DocParagraph, bodySize: number): number {
  if (p.sti === 10) return 1; // Title
  if (p.sti >= 1 && p.sti <= 9) return Math.min(6, p.sti);

  const name = p.styleName.toLowerCase();
  const m = name.match(/^heading\s*(\d)/) ?? name.match(/^h(\d)$/);
  if (m) return Math.min(6, Number(m[1]));
  if (name === "title") return 1;
  if (name === "subtitle") return 2;

  // 字号兜底：明显比正文大且整段加粗，才算标题
  const sizes = p.runs.filter((r) => r.size > 0).map((r) => r.size);
  if (!sizes.length) return 0;
  const size = Math.max(...sizes);
  const allBold = p.runs.filter((r) => r.text.trim()).every((r) => r.bold);
  const words = plainText(p.runs).split(/\s+/).length;

  // 长段落再大也是正文，不是标题
  if (words > 14) return 0;
  if (size >= bodySize * 1.7) return 1;
  if (size >= bodySize * 1.35) return 2;
  if (size >= bodySize * 1.15 && allBold) return 3;
  return 0;
}

/** 正文字号 = 出现字符数最多的那个字号。 */
function bodySize(paragraphs: DocParagraph[]) {
  const tally = new Map<number, number>();
  for (const p of paragraphs) {
    for (const r of p.runs) {
      if (r.size > 0 && r.text.trim()) {
        tally.set(r.size, (tally.get(r.size) ?? 0) + r.text.length);
      }
    }
  }
  let best = 24;
  let most = 0;
  for (const [size, n] of tally) {
    if (n > most) {
      most = n;
      best = size;
    }
  }
  return best;
}

/**
 * 有些生成器（textutil、老 WPS）不写列表属性，直接把项目符号当正文字符塞进去，
 * 长这样："\t•\tTables survive"。这里认出来还原成真列表。
 */
const FAKE_BULLET = /^[\s ]*([•·▪◦‣∙*o-])[\s ]+/;
const FAKE_NUMBER = /^[\s ]*(\d{1,3}|[ivxlcdm]{1,6}|[a-z])[.)]?[\s ]+/i;

function sniffFakeList(text: string): { kind: "ul" | "ol"; rest: string } | null {
  const bullet = text.match(FAKE_BULLET);
  if (bullet) return { kind: "ul", rest: text.slice(bullet[0].length) };

  // 数字列表要求原文有制表符引导，否则 "1997 was" 这种会被误判
  if (/^[\s ]*\t/.test(text) || /^\s{2,}/.test(text)) {
    const num = text.match(FAKE_NUMBER);
    if (num) return { kind: "ol", rest: text.slice(num[0].length) };
  }
  return null;
}

/** 代码里本来含围栏字符时，围栏要加长。 */
function fence(text: string, fenceChars: "```" | "~~~") {
  const char = fenceChars[0];
  const runs = text.match(new RegExp(`^\\${char}{3,}`, "gm")) ?? [];
  const longest = runs.reduce((m, r) => Math.max(m, r.length), 0);
  const bar = char.repeat(Math.max(3, longest + 1));
  return `${bar}\n${text}\n${bar}`;
}

type TableRow = string[];

function renderTable(rows: TableRow[], keepTables: boolean) {
  if (!rows.length) return "";
  if (!keepTables) {
    return rows.map((r) => r.filter(Boolean).join(" · ")).join("\n\n");
  }

  const width = Math.max(...rows.map((r) => r.length));
  const pad = (r: TableRow) => {
    const copy = [...r];
    while (copy.length < width) copy.push("");
    return copy;
  };
  const [head, ...body] = rows.map(pad);
  return [
    `| ${head.join(" | ")} |`,
    `| ${head.map(() => "---").join(" | ")} |`,
    ...body.map((r) => `| ${r.join(" | ")} |`),
  ].join("\n");
}

export function docToMarkdown(
  paragraphs: DocParagraph[],
  opts: ConvertOptions,
): string {
  const body = bodySize(paragraphs);
  const blocks: string[] = [];

  // 表格状态：单元格攒成行，行攒成表
  let cells: string[] = [];
  let rows: TableRow[] = [];
  let cellParts: string[] = [];

  const flushTable = () => {
    if (cellParts.length) {
      cells.push(cellParts.join(" ").trim());
      cellParts = [];
    }
    if (cells.length) {
      rows.push(cells);
      cells = [];
    }
    if (rows.length) {
      blocks.push(renderTable(rows, opts.keepTables));
      rows = [];
    }
  };

  // 有序列表按缩进层级各自计数
  const counters = new Map<number, number>();

  for (const p of paragraphs) {
    if (p.inTable) {
      // 单元格里可能有多个段落，先拼一起
      const text = plainText(p.runs).replace(/\|/g, "\\|");
      if (text) cellParts.push(text);

      // 行结束标记本身也是一个 0x07，会凑出一个空的末列 —— 别让它进表
      if (p.cellEnd && !p.rowEnd) {
        cells.push(cellParts.join(" ").trim());
        cellParts = [];
      }
      if (p.rowEnd) {
        const tail = cellParts.join(" ").trim();
        if (tail) cells.push(tail);
        cellParts = [];
        if (cells.length) rows.push(cells);
        cells = [];
      }
      continue;
    }
    flushTable();

    const rendered = renderRuns(p.runs);
    const bare = plainText(p.runs);

    if (!bare) {
      counters.clear();
      continue;
    }

    // 标题
    const level = headingLevel(p, body);
    if (level > 0) {
      counters.clear();
      blocks.push(`${"#".repeat(level)} ${bare}`);
      continue;
    }

    // 代码样式的段落走围栏
    const styleName = p.styleName.toLowerCase();
    if (styleName === "code" || styleName === "source code") {
      counters.clear();
      blocks.push(fence(bare, opts.codeFence));
      continue;
    }

    // 引用
    if (styleName.includes("quote")) {
      counters.clear();
      blocks.push(
        rendered
          .split("\n")
          .map((line) => `> ${line}`)
          .join("\n"),
      );
      continue;
    }

    // 真列表（有列表属性）
    if (p.isList) {
      const indent = "  ".repeat(Math.min(p.listLevel, 6));
      // 没有编号信息时按无序处理，Word 的编号格式存在 LSTF 里，这里不解
      blocks.push(`${indent}${opts.bullet} ${rendered.trim()}`);
      continue;
    }

    // 伪列表（符号被当正文写进去了）
    const fake = sniffFakeList(rendered);
    if (fake) {
      const level2 = 0;
      if (fake.kind === "ul") {
        counters.clear();
        blocks.push(`${opts.bullet} ${fake.rest.trim()}`);
      } else {
        const n = (counters.get(level2) ?? 0) + 1;
        counters.set(level2, n);
        blocks.push(`${n}. ${fake.rest.trim()}`);
      }
      continue;
    }

    counters.clear();
    blocks.push(rendered.trim());
  }

  flushTable();

  // 同类列表项之间不空行；无序接有序要空行，否则渲染器会当成一个列表
  const kindOf = (s?: string): "ul" | "ol" | null => {
    if (!s) return null;
    if (new RegExp(`^\\s*\\${opts.bullet}\\s`).test(s)) return "ul";
    if (/^\s*\d+\.\s/.test(s)) return "ol";
    return null;
  };

  let md = "";
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const kind = kindOf(block);
    const prevKind = kindOf(blocks[i - 1]);
    const tight = kind !== null && kind === prevKind;
    md += (i === 0 ? "" : tight ? "\n" : "\n\n") + block;
  }
  return md.replace(/\n{3,}/g, "\n\n").trim();
}
