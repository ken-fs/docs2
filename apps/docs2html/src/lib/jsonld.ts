import { urlOf, type AnyKey } from "@/content/tools";
import type { Locale } from "@/i18n/locales";
import type { Dictionary, LegalKey, PageKey } from "@/i18n/types";

/** FAQPage：让问答有机会以富媒体结果出现，也方便 AI 抓取。 */
export function faqJsonLd(locale: Locale, key: PageKey, dict: Dictionary) {
  const page = dict.pages[key];
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${urlOf(locale, key)}#faq`,
    inLanguage: dict.htmlLang,
    mainEntity: page.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/**
 * WebApplication。方案 §8.6 允许 WebApplication 或 SoftwareApplication，
 * 而且明确禁止编造评分、评论和下载量 —— 所以这里没有 aggregateRating。
 * 价格是真的 0，那个可以写。
 */
export function softwareJsonLd(locale: Locale, key: PageKey, dict: Dictionary) {
  const page = dict.pages[key];
  const url = urlOf(locale, key);
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${url}#app`,
    name: key === "home" ? "Docs 2 HTML" : `Docs 2 HTML — ${page.short}`,
    url,
    inLanguage: dict.htmlLang,
    description: page.description,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any browser",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: dict.chrome.features,
  };
}

/**
 * BreadcrumbList，方案 §8.6 要求的另一半。
 *
 * 首页只有它自己一层，就不发了 —— 单元素的面包屑对搜索引擎没有信息量。
 */
export function breadcrumbJsonLd(
  locale: Locale,
  key: AnyKey,
  label: string,
  dict: Dictionary,
) {
  if (key === "home") return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${urlOf(locale, key)}#crumbs`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: dict.chrome.breadcrumbHome,
        item: urlOf(locale, "home"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: label,
        item: urlOf(locale, key),
      },
    ],
  };
}

/**
 * 正式页面用 WebPage，不用 WebApplication —— 隐私政策不是一个应用。
 */
export function legalJsonLd(locale: Locale, key: LegalKey, dict: Dictionary) {
  const page = dict.legal[key];
  const url = urlOf(locale, key);
  return {
    "@context": "https://schema.org",
    "@type": key === "contact" ? "ContactPage" : "WebPage",
    "@id": `${url}#page`,
    url,
    name: page.title,
    description: page.description,
    inLanguage: dict.htmlLang,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${urlOf(locale, "home")}#site`,
      name: "Docs 2 HTML",
      url: urlOf(locale, "home"),
      inLanguage: dict.htmlLang,
    },
  };
}
