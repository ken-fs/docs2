import type { MetadataRoute } from "next";
import { ALL_KEYS, LEGAL_KEYS, type AnyKey, urlOf } from "@/content/tools";
import { LOCALES } from "@/i18n/locales";

// 静态导出下 Next 要求元数据路由显式声明是静态的
export const dynamic = "force-static";

const isLegal = (key: AnyKey) => (LEGAL_KEYS as string[]).includes(key);

/**
 * 六语种 × 十三个页面 = 78 条，每条都带上全部 hreflang 互指。
 * Google 要求这个关系是双向的，所以 alternates 里也包含自己。
 *
 * 方案 §8.5 要求 sitemap 收全首页、工具页、各语言版本和 About / Contact /
 * Privacy / Terms 这类正式页面，而且只能收真实存在的 URL —— 这里就是
 * 页面路由那张表本身，不会漂。
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = (key: AnyKey) =>
    Object.fromEntries([
      ...LOCALES.map((l) => [l, urlOf(l, key)]),
      ["x-default", urlOf("en", key)],
    ]);

  return LOCALES.flatMap((locale) =>
    ALL_KEYS.map((key) => ({
      url: urlOf(locale, key),
      // 法律条文一年动一次，工具页会随功能变
      changeFrequency: isLegal(key) ? ("yearly" as const) : ("weekly" as const),
      priority: key === "home" ? 1 : isLegal(key) ? 0.3 : 0.8,
      alternates: { languages: languages(key) },
    })),
  );
}
