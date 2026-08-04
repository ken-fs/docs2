import type { Dictionary } from "./types";
import type { Locale } from "./locales";

/**
 * 动态 import：每个语种一个 chunk，构建时按路由静态化，
 * 不会把六份文案全塞进同一个包。
 */
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en").then((m) => m.default),
  "zh-CN": () => import("./dictionaries/zh-CN").then((m) => m.default),
  "zh-TW": () => import("./dictionaries/zh-TW").then((m) => m.default),
  es: () => import("./dictionaries/es").then((m) => m.default),
  pt: () => import("./dictionaries/pt").then((m) => m.default),
  ja: () => import("./dictionaries/ja").then((m) => m.default),
};

export const getDictionary = (locale: Locale) => dictionaries[locale]();
