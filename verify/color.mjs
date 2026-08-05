/**
 * oklch → hex + WCAG 对比度。改色板时先在这儿算，别靠肉眼估。
 *
 * 为什么不用 verify/contrast.mjs 代替：那个跑真页面，要先 build 再起服务，
 * 而且只查已经用上的组合。这个是纯算，改一个值立刻能看到它跟其他所有色的
 * 关系 —— 包括还没写进 CSS 的候选值。两个一起用：这边挑值，那边验落地。
 *
 * 主色的明度会被两头夹住：既要在纸上当正文色（≥4.5），又要当填充块配白字
 * （≥4.5）。两个方向都随明度变暗而变好，所以不冲突，但可用区间很窄 ——
 * 动主色之前把这两项都打出来看。
 *
 *   pnpm verify:color              两个站的实测表
 *   pnpm verify:color 0.44 .148 252   单个 oklch 值对两站纸色的比值
 */

/** oklch → 线性 sRGB。转换矩阵取自 Björn Ottosson 的 oklab 原文。 */
function toLinear(L, C, H) {
  const h = (H * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

const clamp = (x) => Math.max(0, Math.min(1, x));
const encode = (x) =>
  x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055;

export const oklch = (L, C, H) => toLinear(L, C, H);
export const hex = (v) =>
  "#" +
  v
    .map((x) =>
      Math.round(clamp(encode(clamp(x))) * 255)
        .toString(16)
        .padStart(2, "0"),
    )
    .join("");

/** WCAG 相对亮度。线性 sRGB 直接加权，不用再解 gamma。 */
export const lum = (v) =>
  0.2126 * clamp(v[0]) + 0.7152 * clamp(v[1]) + 0.0722 * clamp(v[2]);

export const ratio = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (hi + 0.05) / (lo + 0.05);
};

// ── 以下只在直接运行时执行 ────────────────────────────────────────
if (import.meta.url === `file://${process.argv[1]}`) {
  const white = [1, 1, 1];
  const fmt = (n) => n.toFixed(2).padStart(5);

  const SITES = {
    docstomd: {
      paper: [0.968, 0.004, 120],
      "paper-deep": [0.932, 0.008, 124],
      ink: [0.205, 0.011, 150],
      "ink-soft": [0.398, 0.014, 152],
      "ink-faint": [0.498, 0.015, 154],
      pine: [0.487, 0.094, 152],
      "pine-deep": [0.396, 0.078, 154],
      marker: [0.902, 0.142, 118],
      redline: [0.505, 0.17, 22],
    },
    docs2html: {
      sheet: [0.972, 0.006, 232],
      "sheet-deep": [0.944, 0.01, 230],
      graphite: [0.226, 0.021, 254],
      "graphite-soft": [0.406, 0.024, 252],
      "graphite-faint": [0.526, 0.022, 250],
      prussian: [0.44, 0.148, 252],
      "prussian-deep": [0.352, 0.132, 254],
      wash: [0.888, 0.046, 250],
      amber: [0.54, 0.148, 74],
    },
  };

  const arg = process.argv.slice(2).map(Number);
  if (arg.length === 3) {
    const c = oklch(...arg);
    console.log(`\noklch(${arg.join(" ")}) = ${hex(c)}\n`);
    for (const [site, pal] of Object.entries(SITES)) {
      const bg = site === "docstomd" ? pal.paper : pal.sheet;
      const deep = site === "docstomd" ? pal["paper-deep"] : pal["sheet-deep"];
      console.log(
        `  ${site.padEnd(10)} 纸上 ${fmt(ratio(c, oklch(...bg)))}` +
          `   深纸上 ${fmt(ratio(c, oklch(...deep)))}` +
          `   白字压在上面 ${fmt(ratio(white, c))}`,
      );
    }
    console.log("\n  4.5 是正文门槛，3.0 是大字和图形门槛。\n");
    process.exit(0);
  }

  for (const [site, pal] of Object.entries(SITES)) {
    const bgs = site === "docstomd"
      ? ["paper", "paper-deep"]
      : ["sheet", "sheet-deep"];
    console.log(`\n── ${site} ${"─".repeat(52 - site.length)}`);
    console.log(
      `  ${"".padEnd(15)}${bgs.map((b) => b.padStart(12)).join("")}` +
        `${"白字在其上".padStart(11)}`,
    );
    for (const [name, v] of Object.entries(pal)) {
      const c = oklch(...v);
      const row = bgs.map((b) => fmt(ratio(c, oklch(...pal[b]))).padStart(12));
      const onWhite = bgs.includes(name) ? "     —" : fmt(ratio(white, c));
      console.log(
        `  ${name.padEnd(15)}${row.join("")}${onWhite.padStart(13)}` +
          `   ${hex(c)}`,
      );
    }
  }
  console.log(
    "\n  4.5 = 正文门槛，3.0 = 大字（≥24px 或 ≥18.66px bold）和图形门槛。" +
      "\n  背景色自己那两列没有意义，看的是其他色压在它们上面。\n",
  );
}
