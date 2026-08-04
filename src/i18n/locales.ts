/**
 * 六个语种。英文是底座，其余五个是加上去的。
 * 用 BCP-47 的 script 子标签写中文（zh-Hans / zh-Hant），
 * Google 认这个写法，比 zh-CN / zh-TW 更准 —— 我们分的是字，不是地区。
 */
export const LOCALES = ["en", "zh-Hans", "zh-Hant", "es", "pt", "ja"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** 语言切换器里显示的名字，一律用该语言自己的说法。 */
export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  "zh-Hans": "简体中文",
  "zh-Hant": "繁體中文",
  es: "Español",
  pt: "Português",
  ja: "日本語",
};

/** 切换器收起时显示的短码。 */
export const LOCALE_SHORT: Record<Locale, string> = {
  en: "EN",
  "zh-Hans": "简",
  "zh-Hant": "繁",
  es: "ES",
  pt: "PT",
  ja: "日",
};

/**
 * og:locale 只认 language_TERRITORY，不认裸标签也不认 script 子标签。
 * 所以这里得挑一个代表地区：中文按字分到 CN / TW，葡语走巴西。
 */
export const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  "zh-Hans": "zh_CN",
  "zh-Hant": "zh_TW",
  es: "es_ES",
  pt: "pt_BR",
  ja: "ja_JP",
};

export function ogAlternates(locale: Locale) {
  return LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALE[l]);
}

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
