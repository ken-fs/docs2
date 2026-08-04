import type { PageKey } from "@/i18n/types";
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
  "google-docs-to-markdown",
];

/** 导航里露出的三个 slug 页，首页不算。 */
export const TOOL_KEYS = PAGE_KEYS.filter(
  (k): k is Exclude<PageKey, "home"> => k !== "home",
);

/** home 的 slug 是空串。 */
export function slugOf(key: PageKey) {
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
 */
export function pathOf(locale: Locale, key: PageKey) {
  const parts = [LOCALE_PREFIX[locale], slugOf(key)].filter(Boolean);
  return `/${parts.map((p) => `${p}/`).join("")}`;
}

/**
 * 把 catch-all 的 segments 解析回语种 + 页面。认不出来返回 null，由页面
 * notFound() —— 别把打错的路径兜成英文首页，软 404 比真 404 更伤 SEO。
 */
export function parseSegments(
  segments: string[] | undefined,
): { locale: Locale; key: PageKey } | null {
  const parts = segments ?? [];
  if (parts.length > 2) return null;

  const [first, second] = parts;
  const prefixed = first === undefined ? undefined : localeOfPrefix(first);

  // 带语言前缀：/ja/ 或 /ja/word-to-markdown/
  if (prefixed) {
    if (second === undefined) return { locale: prefixed, key: "home" };
    const key = keyOfSlug(second);
    return key && key !== "home" ? { locale: prefixed, key } : null;
  }

  // 不带前缀就是英文：/ 或 /word-to-markdown/
  if (second !== undefined) return null;
  if (first === undefined) return { locale: "en", key: "home" };
  const key = keyOfSlug(first);
  return key && key !== "home" ? { locale: "en", key } : null;
}

/** 静态导出得把 24 条路径全列出来。 */
export function allSegments(): { segments: string[] }[] {
  return LOCALES.flatMap((locale) =>
    PAGE_KEYS.map((key) => ({
      segments: [LOCALE_PREFIX[locale], slugOf(key)].filter(Boolean),
    })),
  );
}

export const SITE = "https://docstomd.com";

export function urlOf(locale: Locale, key: PageKey) {
  return `${SITE}${pathOf(locale, key)}`;
}

/** hreflang 用的表：六个语种 + x-default 指向英文。 */
export function languageAlternates(key: PageKey) {
  const map: Record<string, string> = {};
  for (const locale of LOCALES) map[locale] = pathOf(locale, key);
  map["x-default"] = pathOf("en", key);
  return map;
}
