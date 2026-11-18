/**
 * 十个语种。英文是底座，其余是加上去的。de / fr / it / ko 是 2026-11-18 加的
 * （非英语页排第 5–30、英文页排第 40–70，德法意韩是高 CPM 市场里还没覆盖的）。
 * docstomd 只有前六个，所以这四种语言的页面不跟 docstomd 互链。
 *
 * 中文用 zh-CN / zh-TW 而不是 zh-Hans / zh-Hant：论准确性 script 子标签更对
 * （我们分的是字，不是地区），但 hreflang 用地区码是业界惯例，Search Console
 * 的语言报告也按地区分。
 */
export const LOCALES = ["en", "zh-CN", "zh-TW", "es", "pt", "ja", "de", "fr", "it", "ko"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/**
 * URL 前缀。英文不带前缀（docstomd.com/docx-to-markdown/），其余用小写语言码
 * （docstomd.com/zh-cn/docx-to-markdown/）—— 路径按惯例全小写，但 hreflang
 * 和 <html lang> 要保留 zh-CN 这种大小写。
 */
export const LOCALE_PREFIX: Record<Locale, string> = {
  en: "",
  "zh-CN": "zh-cn",
  "zh-TW": "zh-tw",
  es: "es",
  pt: "pt",
  ja: "ja",
  de: "de",
  fr: "fr",
  it: "it",
  ko: "ko",
};

/** 路径前缀 → 语种。英文没有前缀，所以不在表里。 */
const BY_PREFIX = new Map(
  LOCALES.filter((l) => LOCALE_PREFIX[l]).map((l) => [LOCALE_PREFIX[l], l]),
);

/** 认出 URL 首段是不是语言前缀。认不出返回 undefined —— 那它可能是 slug。 */
export function localeOfPrefix(segment: string): Locale | undefined {
  return BY_PREFIX.get(segment.toLowerCase());
}

/** 语言切换器里显示的名字，一律用该语言自己的说法。 */
export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文",
  es: "Español",
  pt: "Português",
  ja: "日本語",
  de: "Deutsch",
  fr: "Français",
  it: "Italiano",
  ko: "한국어",
};

/** 切换器收起时显示的短码。 */
export const LOCALE_SHORT: Record<Locale, string> = {
  en: "EN",
  "zh-CN": "简",
  "zh-TW": "繁",
  es: "ES",
  pt: "PT",
  ja: "日",
  de: "DE",
  fr: "FR",
  it: "IT",
  ko: "한",
};

/**
 * og:locale 只认 language_TERRITORY，连字符和裸标签都不行。
 */
export const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  "zh-CN": "zh_CN",
  "zh-TW": "zh_TW",
  es: "es_ES",
  pt: "pt_BR",
  ja: "ja_JP",
  de: "de_DE",
  fr: "fr_FR",
  it: "it_IT",
  ko: "ko_KR",
};

export function ogAlternates(locale: Locale) {
  return LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALE[l]);
}

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
