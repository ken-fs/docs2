/**
 * Word 97–2003 (.doc) 读取器 —— 纯前端，不上传。
 *
 * .doc 是 OLE 复合文件里的一堆二进制流，格式见 MS-DOC。这里只做「转 Markdown
 * 需要的那部分」：段落切分、样式名/字号推标题、粗体斜体删除线、表格单元格。
 * 页眉页脚、批注、图片、域代码一律丢掉 —— 转 Markdown 时它们本来也留不住。
 *
 * 用 cfb 读容器（它的 package.json 把 fs/process 映射成 false，能进浏览器），
 * FIB / 分片表 / FKP 这些是自己解的。
 */
import * as CFB from "cfb";

/* ── 字符常量 ─────────────────────────────────────────────── */
const CP_PARA = 0x0d; // 段落结束
const CP_CELL = 0x07; // 单元格 / 行结束
const CP_LINE = 0x0b; // 软换行
const CP_PAGE = 0x0c; // 分页
const CP_TAB = 0x09;
const CP_FIELD_BEGIN = 0x13;
const CP_FIELD_SEP = 0x14;
const CP_FIELD_END = 0x15;

/** cp1252 里和 latin1 不一样的那 27 个位置（0x80–0x9F）。 */
const CP1252_HIGH = [
  0x20ac, 0x81, 0x201a, 0x192, 0x201e, 0x2026, 0x2020, 0x2021, 0x2c6, 0x2030,
  0x160, 0x2039, 0x152, 0x8d, 0x17d, 0x8f, 0x90, 0x2018, 0x2019, 0x201c,
  0x201d, 0x2022, 0x2013, 0x2014, 0x2dc, 0x2122, 0x161, 0x203a, 0x153, 0x9d,
  0x17e, 0x178,
];

export type DocRun = {
  text: string;
  bold: boolean;
  italic: boolean;
  strike: boolean;
  /** 半点为单位（hps），24 = 12pt。用来推标题级别。 */
  size: number;
};

export type DocParagraph = {
  runs: DocRun[];
  /** 样式表里的名字，textutil 之类的生成器常常只给 "Normal"。 */
  styleName: string;
  /** 内建样式号：1–9 是 heading 1–9，10 是 Title。 */
  sti: number;
  inTable: boolean;
  /** 段落结尾是 cell mark，说明这是表格里的一格。 */
  cellEnd: boolean;
  /** 段落结尾是 row mark。 */
  rowEnd: boolean;
  listLevel: number;
  isList: boolean;
};

export class DocParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DocParseError";
  }
}

/* ── 小工具 ───────────────────────────────────────────────── */

function u8(b: Uint8Array, o: number) {
  if (o < 0 || o >= b.length) throw new DocParseError("read past end of stream");
  return b[o];
}

function u16(b: Uint8Array, o: number) {
  if (o < 0 || o + 1 >= b.length)
    throw new DocParseError("read past end of stream");
  return b[o] | (b[o + 1] << 8);
}

function u32(b: Uint8Array, o: number) {
  if (o < 0 || o + 3 >= b.length)
    throw new DocParseError("read past end of stream");
  return (
    (b[o] | (b[o + 1] << 8) | (b[o + 2] << 16) | (b[o + 3] << 24)) >>> 0
  );
}

/**
 * sprm 的操作数长度由 spra（高 3 位）决定。返回 -1 表示变长（首字节是长度），
 * 变长的我们一律跳过 —— 里面是列表定义、边框之类，Markdown 用不上。
 */
function spraSize(sprm: number): number {
  switch ((sprm >> 13) & 7) {
    case 0:
    case 1:
      return 1;
    case 2:
    case 4:
    case 5:
      return 2;
    case 3:
      return 4;
    case 7:
      return 3;
    default:
      return -1; // spra 6：变长
  }
}

/* ── 主入口 ───────────────────────────────────────────────── */

export function parseDoc(buffer: ArrayBuffer): DocParagraph[] {
  let container: CFB.CFB$Container;
  try {
    container = CFB.read(new Uint8Array(buffer), { type: "array" });
  } catch {
    throw new DocParseError("Not a readable Word 97–2003 file.");
  }

  const stream = (name: string): Uint8Array | null => {
    const entry = CFB.find(container, name);
    if (!entry?.content) return null;
    const c = entry.content as Uint8Array | number[];
    return c instanceof Uint8Array ? c : new Uint8Array(c);
  };

  const wd = stream("WordDocument");
  if (!wd) throw new DocParseError("No WordDocument stream — not a .doc file.");

  // ── FIB ──
  if (u16(wd, 0) !== 0xa5ec) throw new DocParseError("Bad .doc signature.");
  const nFib = u16(wd, 2);
  if (nFib < 101) {
    throw new DocParseError("This is Word 6/95, too old to read here.");
  }

  const flags = u16(wd, 10);
  const fEncrypted = !!(flags & 0x0100);
  if (fEncrypted) throw new DocParseError("This file is password-protected.");

  // fibRgW / fibRgLw / fibRgFcLcb 都是变长的，得顺着 count 往下走
  const csw = u16(wd, 32);
  const cslwOff = 34 + csw * 2;
  const cslw = u16(wd, cslwOff);
  const fibRgLwOff = cslwOff + 2;
  const rgFcLcbOff = fibRgLwOff + cslw * 4 + 2;

  const ccpText = u32(wd, fibRgLwOff + 12);
  const tableName = flags & 0x0200 ? "1Table" : "0Table";
  const tbl = stream(tableName);
  if (!tbl) throw new DocParseError(`Missing ${tableName} stream.`);

  const fc = (i: number) => u32(wd, rgFcLcbOff + i * 8);
  const lcb = (i: number) => u32(wd, rgFcLcbOff + i * 8 + 4);

  const styles = readStylesheet(tbl, fc(1), lcb(1));
  const pieces = readPieceTable(tbl, fc(33), lcb(33));
  if (!pieces.length) throw new DocParseError("Empty or unreadable piece table.");

  const papx = readFkps(wd, tbl, fc(13), lcb(13), "papx");
  const chpx = readFkps(wd, tbl, fc(12), lcb(12), "chpx");

  return assemble(wd, pieces, papx, chpx, styles, ccpText);
}

/* ── 样式表：只要名字和内建样式号 ─────────────────────────── */

type StyleInfo = { name: string; sti: number; istdBase: number };

function readStylesheet(
  tbl: Uint8Array,
  start: number,
  len: number,
): StyleInfo[] {
  const out: StyleInfo[] = [];
  if (!len || start + len > tbl.length) return out;

  try {
    const cbStshi = u16(tbl, start);
    const stshi = start + 2;
    const cstd = u16(tbl, stshi);
    const cbBase = u16(tbl, stshi + 2);
    let p = stshi + cbStshi;

    for (let i = 0; i < cstd && p + 2 <= start + len; i++) {
      const cbStd = u16(tbl, p);
      p += 2;
      if (cbStd === 0) {
        out.push({ name: "", sti: 0x0fff, istdBase: 0x0fff });
        continue;
      }
      const base = p;
      const sti = u16(tbl, base) & 0x0fff;
      const istdBase = u16(tbl, base + 2) & 0x0fff;

      // 名字是 xstz：cch(2) + UTF-16 + NUL，紧跟在 STD 定长头后面
      let name = "";
      const nameOff = base + cbBase;
      if (nameOff + 2 <= tbl.length) {
        const cch = u16(tbl, nameOff);
        if (cch > 0 && cch < 256 && nameOff + 2 + cch * 2 <= tbl.length) {
          const chars: number[] = [];
          for (let k = 0; k < cch; k++) chars.push(u16(tbl, nameOff + 2 + k * 2));
          name = String.fromCharCode(...chars);
        }
      }
      out.push({ name, sti, istdBase });
      p = base + cbStd;
    }
  } catch {
    // 样式表坏了不致命：正文照样能出，标题退化成看字号
  }
  return out;
}

/* ── 分片表：文字散落在 WordDocument 流的多个位置 ─────────── */

type Piece = { cpStart: number; cpEnd: number; fc: number; compressed: boolean };

function readPieceTable(tbl: Uint8Array, start: number, len: number): Piece[] {
  if (!len || start + len > tbl.length) return [];
  let p = start;
  const end = start + len;

  while (p < end) {
    const clxt = u8(tbl, p);
    if (clxt === 1) {
      // Prc：跳过
      p += 1 + 2 + u16(tbl, p + 1);
      continue;
    }
    if (clxt !== 2) break;

    const cbPlc = u32(tbl, p + 1);
    const arr = p + 5;
    const n = Math.floor((cbPlc - 4) / 12); // (n+1) 个 CP + n 个 8 字节 PCD
    if (n <= 0) return [];

    const pieces: Piece[] = [];
    for (let i = 0; i < n; i++) {
      const cpStart = u32(tbl, arr + i * 4);
      const cpEnd = u32(tbl, arr + (i + 1) * 4);
      const pcd = arr + (n + 1) * 4 + i * 8;
      const raw = u32(tbl, pcd + 2);
      // bit 30 置位 = 单字节压缩存储（cp1252），实际偏移要 /2
      const compressed = !!(raw & 0x40000000);
      const offset = raw & 0x3fffffff;
      pieces.push({
        cpStart,
        cpEnd,
        fc: compressed ? offset / 2 : offset,
        compressed,
      });
    }
    return pieces;
  }
  return [];
}

/* ── FKP：格式按 512 字节页存，每页管一段字节区间 ─────────── */

type Fkp = { fcStart: number; fcEnd: number; props: Uint8Array | null };

function readFkps(
  wd: Uint8Array,
  tbl: Uint8Array,
  start: number,
  len: number,
  kind: "papx" | "chpx",
): Fkp[] {
  const out: Fkp[] = [];
  if (!len || start + len > tbl.length) return out;

  const n = Math.floor((len - 4) / 8);
  const pnStart = start + (n + 1) * 4;

  for (let i = 0; i < n; i++) {
    let pn: number;
    try {
      pn = u32(tbl, pnStart + i * 4);
    } catch {
      break;
    }
    const off = pn * 512;
    if (off + 512 > wd.length) continue;

    const crun = wd[off + 511];
    // PAPX 的 rgbx 每项 13 字节，CHPX 每项 1 字节
    const stride = kind === "papx" ? 13 : 1;
    const rgbxOff = off + (crun + 1) * 4;

    for (let r = 0; r < crun; r++) {
      try {
        const fcFirst = u32(wd, off + r * 4);
        const fcLim = u32(wd, off + (r + 1) * 4);
        const bOffset = wd[rgbxOff + r * stride];
        if (!bOffset) {
          out.push({ fcStart: fcFirst, fcEnd: fcLim, props: null });
          continue;
        }
        const po = off + bOffset * 2;
        if (po >= off + 511) continue;

        let propStart: number;
        let propLen: number;
        if (kind === "papx") {
          // PAPX：cb=0 时长度在下一字节，单位都是「字」
          const cb = wd[po];
          if (cb === 0) {
            propLen = wd[po + 1] * 2;
            propStart = po + 2;
          } else {
            propLen = cb * 2 - 1;
            propStart = po + 1;
          }
        } else {
          propLen = wd[po];
          propStart = po + 1;
        }
        if (propLen <= 0 || propStart + propLen > off + 512) {
          out.push({ fcStart: fcFirst, fcEnd: fcLim, props: null });
          continue;
        }
        out.push({
          fcStart: fcFirst,
          fcEnd: fcLim,
          props: wd.subarray(propStart, propStart + propLen),
        });
      } catch {
        break;
      }
    }
  }
  out.sort((a, b) => a.fcStart - b.fcStart);
  return out;
}

function findFkp(fkps: Fkp[], fcPos: number): Fkp | null {
  let lo = 0;
  let hi = fkps.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const f = fkps[mid];
    if (fcPos < f.fcStart) hi = mid - 1;
    else if (fcPos >= f.fcEnd) lo = mid + 1;
    else return f;
  }
  return null;
}

/* ── sprm 解读 ────────────────────────────────────────────── */

type ParaProps = { istd: number; ilvl: number; isList: boolean; inTable: boolean };

function readPapx(props: Uint8Array | null): ParaProps {
  const out: ParaProps = { istd: 0, ilvl: 0, isList: false, inTable: false };
  if (!props || props.length < 2) return out;
  out.istd = u16(props, 0);

  let k = 2;
  while (k + 1 < props.length) {
    const sprm = u16(props, k);
    k += 2;
    const size = spraSize(sprm);
    if (size < 0) {
      // 变长：首字节是操作数长度
      const varLen = props[k];
      k += 1 + varLen;
      continue;
    }
    if (k + size > props.length) break;
    const val =
      size === 1 ? props[k] : size === 2 ? u16(props, k) : u32(props, k);

    switch (sprm) {
      case 0x2416: // sprmPFInTable
        out.inTable = !!val;
        break;
      case 0x2417: // sprmPFTtp（行结束标记所在段）
        out.inTable = true;
        break;
      case 0x260a: // sprmPIlvl
        out.ilvl = val;
        break;
      case 0x460b: // sprmPIlfo：非 0 表示挂在列表上
        out.isList = val !== 0;
        break;
    }
    k += size;
  }
  return out;
}

type CharProps = { bold: boolean; italic: boolean; strike: boolean; size: number };

function readChpx(props: Uint8Array | null, base: CharProps): CharProps {
  const out = { ...base };
  if (!props) return out;

  let k = 0;
  while (k + 1 < props.length) {
    const sprm = u16(props, k);
    k += 2;
    const size = spraSize(sprm);
    if (size < 0) {
      const varLen = props[k];
      k += 1 + varLen;
      continue;
    }
    if (k + size > props.length) break;
    const val =
      size === 1 ? props[k] : size === 2 ? u16(props, k) : u32(props, k);

    switch (sprm) {
      case 0x0835: // sprmCFBold
        out.bold = toggle(val, out.bold);
        break;
      case 0x0836: // sprmCFItalic
        out.italic = toggle(val, out.italic);
        break;
      case 0x0837: // sprmCFStrike
        out.strike = toggle(val, out.strike);
        break;
      case 0x083c: // sprmCFVanish：隐藏文字，直接当没有
        if (val === 1) out.size = 0;
        break;
      case 0x4a43: // sprmCHps：半点字号
        out.size = val;
        break;
    }
    k += size;
  }
  return out;
}

/** Word 的开关型 sprm：0/1 是关/开，128 表示「沿用」，129 表示「取反」。 */
function toggle(val: number, current: boolean) {
  if (val === 0) return false;
  if (val === 1) return true;
  if (val === 129) return !current;
  return current;
}

/* ── 拼装：文字 + 格式 → 段落数组 ─────────────────────────── */

function decodeChar(wd: Uint8Array, piece: Piece, index: number): number {
  if (piece.compressed) {
    const byte = wd[piece.fc + index];
    if (byte === undefined) return 0;
    return byte >= 0x80 && byte <= 0x9f ? CP1252_HIGH[byte - 0x80] : byte;
  }
  const o = piece.fc + index * 2;
  if (o + 1 >= wd.length) return 0;
  return wd[o] | (wd[o + 1] << 8);
}

function assemble(
  wd: Uint8Array,
  pieces: Piece[],
  papxFkps: Fkp[],
  chpxFkps: Fkp[],
  styles: StyleInfo[],
  ccpText: number,
): DocParagraph[] {
  const paragraphs: DocParagraph[] = [];
  let runs: DocRun[] = [];
  let buf = "";
  let cur: CharProps = { bold: false, italic: false, strike: false, size: 24 };
  let fieldDepth = 0;
  let skippingFieldCode = false;

  const flushRun = () => {
    if (buf) {
      runs.push({ text: buf, ...cur });
      buf = "";
    }
  };

  const endParagraph = (fcPos: number, cellEnd: boolean, rowEnd: boolean) => {
    flushRun();
    const pp = readPapx(findFkp(papxFkps, fcPos)?.props ?? null);
    const style = styles[pp.istd];
    // sti 1–9 = heading 1–9，10 = Title；样式名坏掉时靠它兜底
    const sti = style?.sti ?? 0x0fff;
    paragraphs.push({
      runs,
      styleName: style?.name ?? "",
      sti,
      inTable: pp.inTable || cellEnd || rowEnd,
      cellEnd,
      rowEnd,
      listLevel: pp.ilvl,
      isList: pp.isList,
    });
    runs = [];
  };

  let cp = 0;
  for (const piece of pieces) {
    const count = piece.cpEnd - piece.cpStart;
    for (let i = 0; i < count && cp < ccpText; i++, cp++) {
      const fcPos = piece.compressed ? piece.fc + i : piece.fc + i * 2;

      // 每个字符都查一次 CHPX 太慢，但边界只在 FKP 换段时变，
      // 这里靠 fcPos 直接定位，findFkp 是二分，开销可接受。
      const next = readChpx(findFkp(chpxFkps, fcPos)?.props ?? null, {
        bold: false,
        italic: false,
        strike: false,
        size: 24,
      });
      if (
        next.bold !== cur.bold ||
        next.italic !== cur.italic ||
        next.strike !== cur.strike ||
        next.size !== cur.size
      ) {
        flushRun();
        cur = next;
      }

      const ch = decodeChar(wd, piece, i);

      // 域：{ 代码 } 结果 —— 只留结果，代码扔掉
      if (ch === CP_FIELD_BEGIN) {
        fieldDepth++;
        skippingFieldCode = true;
        continue;
      }
      if (ch === CP_FIELD_SEP) {
        skippingFieldCode = false;
        continue;
      }
      if (ch === CP_FIELD_END) {
        fieldDepth = Math.max(0, fieldDepth - 1);
        skippingFieldCode = false;
        continue;
      }
      if (skippingFieldCode && fieldDepth > 0) continue;

      switch (ch) {
        case CP_PARA:
          endParagraph(fcPos, false, false);
          break;
        case CP_CELL:
          // 表格里 0x07 既是单元格结束也是行结束，靠 PAPX 的 fTtp 区分
          {
            const pp = readPapx(findFkp(papxFkps, fcPos)?.props ?? null);
            endParagraph(fcPos, true, pp.inTable && isRowEnd(papxFkps, fcPos));
          }
          break;
        case CP_LINE:
          buf += "\n";
          break;
        case CP_PAGE:
          break;
        case CP_TAB:
          buf += "\t";
          break;
        case 0x00:
        case 0x01: // 内嵌对象/图片占位
        case 0x02: // 脚注引用
        case 0x05: // 批注锚点
        case 0x08: // 绘图对象
          break;
        default:
          if (ch >= 0x20 || ch === 0x0a) buf += String.fromCharCode(ch);
      }
    }
  }

  flushRun();
  if (runs.length) {
    paragraphs.push({
      runs,
      styleName: "",
      sti: 0x0fff,
      inTable: false,
      cellEnd: false,
      rowEnd: false,
      listLevel: 0,
      isList: false,
    });
  }
  return paragraphs;
}

/** 行结束标记（sprmPFTtp）单独探一次，避免 endParagraph 里重复解析。 */
function isRowEnd(papxFkps: Fkp[], fcPos: number) {
  const props = findFkp(papxFkps, fcPos)?.props ?? null;
  if (!props || props.length < 2) return false;
  let k = 2;
  while (k + 1 < props.length) {
    const sprm = u16(props, k);
    k += 2;
    const size = spraSize(sprm);
    if (size < 0) {
      k += 1 + props[k];
      continue;
    }
    if (k + size > props.length) break;
    if (sprm === 0x2417) return props[k] !== 0;
    k += size;
  }
  return false;
}
