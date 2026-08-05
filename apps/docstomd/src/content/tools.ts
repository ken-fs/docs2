import type { LegalKey, PageKey } from "@/i18n/types";
import {
  LOCALES,
  LOCALE_PREFIX,
  localeOfPrefix,
  type Locale,
} from "@/i18n/locales";

/**
 * slug 一律留英文。它们本身就是关键词，"docx to markdown" 这种查询
 * 在西语葡语圈也是照英文打的 —— 翻译 slug 只会把流量弄丢。
 * 语言靠路径前缀区分：/es/docx-to-markdown/，英文不带前缀。
 */
export const PAGE_KEYS: PageKey[] = [
  "home",
  "docx-to-markdown",
  "word-to-markdown",
  "pdf-to-markdown",
  "excel-to-markdown",
  "csv-to-markdown",
  "html-to-markdown",
  "google-docs-to-markdown",
];

/** 导航里露出的 slug 页，首页不算。 */
export const TOOL_KEYS = PAGE_KEYS.filter(
  (k): k is Exclude<PageKey, "home"> => k !== "home",
);

/**
 * 正式页面。顺序就是页脚里的排列顺序：先介绍自己，再给联系方式，
 * 然后是三份法律文本。
 */
export const LEGAL_KEYS: LegalKey[] = [
  "about",
  "contact",
  "privacy",
  "terms",
  "cookies",
];

/**
 * 一条路径指向工具页还是正式页面。
 *
 * 做成可辨识联合而不是让 key 变成 PageKey | LegalKey：两类页面的字典结构
 * 不一样（工具页有转换器和 FAQ，正式页面是纯正文），编译器得能替我们
 * 挡住拿 LegalKey 去查 dict.pages 这种错。
 */
export type Route =
  | { kind: "tool"; key: PageKey }
  | { kind: "legal"; key: LegalKey };

const LEGAL_SET = new Set<string>(LEGAL_KEYS);

/** slug 反查成路由。认不出返回 undefined。 */
function routeOfSlug(slug: string): Route | undefined {
  if (LEGAL_SET.has(slug)) return { kind: "legal", key: slug as LegalKey };
  const key = PAGE_KEYS.find((k) => slugOf(k) === slug);
  return key ? { kind: "tool", key } : undefined;
}

/**
 * 每个页面收什么输入。
 *
 * 页面之间的差别不只是文案 —— PDF 收文件、CSV 收文件或粘贴的文本、HTML 收
 * 粘贴的源码。这张表把差异集中在一处，ToolShell 照着它决定渲染哪套 UI，
 * 而不是让每个页面各写一遍。
 *
 *   engine  走哪个转换器
 *   accept  <input type=file> 的 accept，空串表示这页不收文件
 *   paste   有没有粘贴/输入框，以及占位文案用哪种
 */
export type ToolInput = {
  engine: "docx" | "pdf" | "html" | "csv" | "xlsx";
  accept: string;
  paste: "none" | "html" | "csv";
};

const DOCX_INPUT: ToolInput = {
  engine: "docx",
  accept:
    ".docx,.doc,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword",
  // Word 网页版和 Google Docs 复制出来的富文本走整站的 paste 事件，
  // 不需要输入框 —— 那条路在 Converter 里接的是 clipboard 的 text/html
  paste: "none",
};

/**
 * 从 accept 里抠出扩展名，给拖拽区的说明文案用（".docx,.doc,application/…"
 * → ".docx .doc"）。
 *
 * 为什么派生而不另写文案：格式列表一旦手写，就会跟 accept 走散 —— 文案说
 * 收 PDF 而选择器其实不收，比不写更糟。而且这句话要出现在六种语言里，
 * 手写就是六份要同步维护的清单。扩展名本身不用翻译。
 *
 * 起因是有人看着首页那句「Drop a file here / 25 MB per file」问「只能传
 * txt 吗，不能 pdf、docx 吗」。当时那行字只说了大小和隐私，没说本页收什么，
 * 唯一的知情途径是点开系统文件选择器看过滤器 —— 那就太晚了。
 */
export function acceptExtensions(accept: string): string[] {
  return accept
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.startsWith("."));
}

/**
 * 同上，但截到三个 —— 这行字是给人读的，不是 accept 的完整回显。Markdown 页
 * 收四个扩展名，全列出来一行太挤。多出来的用「+N」收掉，选择器仍然全收。
 *
 * 所以 accept 里扩展名的先后是有语义的：按用户熟悉度排，别名放最后。
 * 加扩展名时别往前插。第一版把 .mdown 排在 .txt 前面，结果 Markdown 页显示
 * 「.md .markdown .mdown +1」，正好把最该露出来的 .txt 藏进了那个 +1。
 */
export function acceptSummary(accept: string): string {
  const all = acceptExtensions(accept);
  return all.length > 3
    ? `${all.slice(0, 3).join(" ")} +${all.length - 3}`
    : all.join(" ");
}

export const TOOL_INPUT: Record<PageKey, ToolInput> = {
  home: DOCX_INPUT,
  "docx-to-markdown": DOCX_INPUT,
  "word-to-markdown": DOCX_INPUT,
  "google-docs-to-markdown": DOCX_INPUT,
  "pdf-to-markdown": { engine: "pdf", accept: ".pdf,application/pdf", paste: "none" },
  "html-to-markdown": {
    engine: "html",
    accept: ".html,.htm,text/html",
    paste: "html",
  },
  "csv-to-markdown": {
    engine: "csv",
    accept: ".csv,.tsv,.txt,text/csv,text/tab-separated-values",
    paste: "csv",
  },
  "excel-to-markdown": {
    engine: "xlsx",
    accept:
      ".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    paste: "none",
  },
};

/**
 * 任何一个静态页面的 key。
 *
 * 两个联合的字面量互不相交，而正式页面的 slug 就等于它的 key，所以算路径、
 * canonical、hreflang 这些事对两类页面是同一套逻辑，不必分开写。
 */
export type AnyKey = PageKey | LegalKey;

/** 全站页面，页脚和 sitemap 按这个顺序列。 */
/**
 * 一个扩展名该去哪一页。
 *
 * 派生自 TOOL_INPUT，不是另抄一份清单 —— 加工具页时自动就有，不会漏。
 * 同一个扩展名可能有多页收（.docx 有四页），取第一个匹配的：PAGE_KEYS 的
 * 声明顺序就是优先级，最专门的那页排前面。
 *
 * 跳过 home —— 它跟 docx-to-markdown 是同一个转换器，但报错里说「去首页」
 * 没有信息量，用户要的是那个专门页的名字。
 *
 * 用在「拖错文件」的报错里：以前拖一个 PDF 进 CSV 页，转换器会把二进制
 * 当文本硬解，输出一张全是乱码的表格然后标成「成功」—— 用户拿到的是看着
 * 像成功的垃圾。docx / pdf / xlsx 三个引擎会自己嗅文件头拒掉，但 csv 和
 * html 走的是纯文本，什么都吃得下，那两页正是漏的地方。
 */
export function pageForExtension(ext: string): PageKey | undefined {
  const want = ext.toLowerCase();
  return TOOL_KEYS.find((k) =>
    acceptExtensions(TOOL_INPUT[k].accept).includes(want),
  );
}

/**
 * 全站任何一页收的扩展名，去重。ToolShell 拿它摊成「扩展名 → 去哪页」的
 * 表传给 Converter —— 传表而不传函数，因为 ToolShell 是 Server Component，
 * 函数过不了那道边界。
 */
export const ELSEWHERE_EXTENSIONS: string[] = [
  ...new Set(TOOL_KEYS.flatMap((k) => acceptExtensions(TOOL_INPUT[k].accept))),
];

/** 文件名里的扩展名，含点，小写。没有扩展名返回空串。 */
export function extensionOf(name: string): string {
  const i = name.lastIndexOf(".");
  return i > 0 ? name.slice(i).toLowerCase() : "";
}

export const ALL_KEYS: AnyKey[] = [...PAGE_KEYS, ...LEGAL_KEYS];

/** home 的 slug 是空串，其余的 slug 就是 key 本身。 */
export function slugOf(key: AnyKey) {
  return key === "home" ? "" : key;
}

export function keyOfSlug(slug: string): PageKey | undefined {
  return PAGE_KEYS.find((k) => slugOf(k) === slug);
}

/**
 * 站内路径。全站 trailingSlash，所以一律以 / 结尾 —— 少一次 308 跳转，
 * canonical 和 hreflang 也才对得上真实地址。
 *
 *   pathOf("en", "home")              → /
 *   pathOf("en", "word-to-markdown")  → /word-to-markdown/
 *   pathOf("ja", "word-to-markdown")  → /ja/word-to-markdown/
 *   pathOf("ja", "privacy")           → /ja/privacy/
 */
export function pathOf(locale: Locale, key: AnyKey) {
  const parts = [LOCALE_PREFIX[locale], slugOf(key)].filter(Boolean);
  return `/${parts.map((p) => `${p}/`).join("")}`;
}

/**
 * 把 catch-all 的 segments 解析回语种 + 页面。认不出来返回 null，由页面
 * notFound() —— 别把打错的路径兜成英文首页，软 404 比真 404 更伤 SEO。
 */
export function parseSegments(
  segments: string[] | undefined,
): (Route & { locale: Locale }) | null {
  const parts = segments ?? [];
  if (parts.length > 2) return null;

  const [first, second] = parts;
  const prefixed = first === undefined ? undefined : localeOfPrefix(first);
  const home = { kind: "tool", key: "home" } as const;

  // 带语言前缀：/ja/ 或 /ja/word-to-markdown/
  if (prefixed) {
    if (second === undefined) return { locale: prefixed, ...home };
    const route = routeOfSlug(second);
    return route ? { locale: prefixed, ...route } : null;
  }

  // 不带前缀就是英文：/ 或 /word-to-markdown/
  if (second !== undefined) return null;
  if (first === undefined) return { locale: "en", ...home };
  const route = routeOfSlug(first);
  return route ? { locale: "en", ...route } : null;
}

/** 静态导出得把 78 条路径全列出来（13 页 × 6 语种）。 */
export function allSegments(): { segments: string[] }[] {
  return LOCALES.flatMap((locale) =>
    ALL_KEYS.map((key) => ({
      segments: [LOCALE_PREFIX[locale], slugOf(key)].filter(Boolean),
    })),
  );
}

export const SITE = "https://docstomd.com";

export function urlOf(locale: Locale, key: AnyKey) {
  return `${SITE}${pathOf(locale, key)}`;
}

/** hreflang 用的表：六个语种 + x-default 指向英文。 */
export function languageAlternates(key: AnyKey) {
  const map: Record<string, string> = {};
  for (const locale of LOCALES) map[locale] = pathOf(locale, key);
  map["x-default"] = pathOf("en", key);
  return map;
}
