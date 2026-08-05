import type { MetadataRoute } from "next";
import {
  ALL_KEYS,
  GUIDE_KEYS,
  guideUrl,
  LEGAL_KEYS,
  type AnyKey,
  urlOf,
} from "@/content/tools";
import { LOCALES } from "@/i18n/locales";

// 静态导出下 Next 要求元数据路由显式声明是静态的
export const dynamic = "force-static";

const isLegal = (key: AnyKey) => (LEGAL_KEYS as string[]).includes(key);

/**
 * 六语种 × 十九个页面 = 114 条，每条都带上全部 hreflang 互指。
 * Google 要求这个关系是双向的，所以 alternates 里也包含自己。
 *
 * 方案 §8.5 要求 sitemap 收全首页、工具页、各语言版本和 About / Contact /
 * Privacy / Terms 这类正式页面，而且只能收真实存在的 URL —— 这里就是
 * 页面路由那张表本身，不会漂。
 *
 * changeFrequency 是照实写的，不是拿来抬权重的（Google 早就基本不看它了，
 * 填假的只会让 sitemap 本身不可信）：工具页跟着功能变，教程是写完就定的
 * 操作步骤，法律条文一年动一次。
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = (key: AnyKey) =>
    Object.fromEntries([
      ...LOCALES.map((l) => [l, urlOf(l, key)]),
      ["x-default", urlOf("en", key)],
    ]);

  const guideLanguages = (key?: (typeof GUIDE_KEYS)[number]) =>
    Object.fromEntries([
      ...LOCALES.map((l) => [l, guideUrl(l, key)]),
      ["x-default", guideUrl("en", key)],
    ]);

  return LOCALES.flatMap((locale) => [
    ...ALL_KEYS.map((key) => ({
      url: urlOf(locale, key),
      changeFrequency: isLegal(key) ? ("yearly" as const) : ("weekly" as const),
      priority: key === "home" ? 1 : isLegal(key) ? 0.3 : 0.8,
      alternates: { languages: languages(key) },
    })),
    {
      url: guideUrl(locale),
      // 列表页只在加文章时变，六篇写完就不动了
      changeFrequency: "monthly" as const,
      priority: 0.5,
      alternates: { languages: guideLanguages() },
    },
    ...GUIDE_KEYS.map((key) => ({
      url: guideUrl(locale, key),
      changeFrequency: "yearly" as const,
      // 比工具页低：文章是把流量导去工具页的，工具页才是要排上去的那个
      priority: 0.6,
      alternates: { languages: guideLanguages(key) },
    })),
  ]);
}
