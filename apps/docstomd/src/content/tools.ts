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
