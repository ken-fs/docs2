import type { MetadataRoute } from "next";
import { PAGE_KEYS, urlOf } from "@/content/tools";
import { LOCALES } from "@/i18n/locales";

/**
 * 六语种 × 四个页面 = 24 条，每条都带上全部 hreflang 互指。
 * Google 要求这个关系是双向的，所以 alternates 里也包含自己。
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = (key: (typeof PAGE_KEYS)[number]) =>
    Object.fromEntries([
      ...LOCALES.map((l) => [l, urlOf(l, key)]),
      ["x-default", urlOf("en", key)],
    ]);

  return LOCALES.flatMap((locale) =>
    PAGE_KEYS.map((key) => ({
      url: urlOf(locale, key),
      changeFrequency: "weekly" as const,
      priority: key === "home" ? 1 : 0.8,
      alternates: { languages: languages(key) },
    })),
  );
}
