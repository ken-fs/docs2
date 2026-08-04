import type { PageKey } from "@/i18n/types";
import { LOCALES, type Locale } from "@/i18n/locales";

/**
 * slug 一律留英文。它们本身就是关键词，"docx to markdown" 这种查询
 * 在西语葡语圈也是照英文打的 —— 翻译 slug 只会把流量弄丢。
 * 语言靠路径前缀区分：/es/docx-to-markdown。
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

/** 站内路径，例如 /ja/word-to-markdown 或 /ja。 */
export function pathOf(locale: Locale, key: PageKey) {
  const slug = slugOf(key);
  return slug ? `/${locale}/${slug}` : `/${locale}`;
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
