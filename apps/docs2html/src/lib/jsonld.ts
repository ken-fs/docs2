import { guideUrl, urlOf, type AnyKey } from "@/content/tools";
import type { Locale } from "@/i18n/locales";
import type { Dictionary, GuideKey, LegalKey, PageKey } from "@/i18n/types";

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

/**
 * 教程用 Article。
 *
 * 没有 datePublished / dateModified / author —— 这三个字段 Google 只把它们
 * 当增强信息，不是必填，而我们没有诚实的值可填：这些文章不按时间序组织
 * （所以 GuideCopy 里就没有 date 字段），作者是这个站本身而不是一个人。
 * 方案 §8.6 明确禁止编造结构化数据，「随便填个日期」正是它禁的那类事。
 *
 * publisher 用 Organization 指回站点，这个是真的。
 */
export function articleJsonLd(locale: Locale, key: GuideKey, dict: Dictionary) {
  const guide = dict.guides[key];
  const url = guideUrl(locale, key);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    url,
    headline: guide.h1,
    description: guide.description,
    inLanguage: dict.htmlLang,
    publisher: {
      "@type": "Organization",
      "@id": `${urlOf(locale, "home")}#site`,
      name: "Docs 2 HTML",
      url: urlOf(locale, "home"),
    },
    /* 文章讲的就是那个工具页做的事，明确指过去 —— 对搜索引擎是「这两页
       是一组」，对 AI 抓取是「读完这篇能在哪儿动手」。 */
    about: { "@id": `${urlOf(locale, guide.tool)}#app` },
  };
}

/** 教程的面包屑：首页 / 教程列表 / 这一篇。三层，比普通页多一层。 */
export function guideCrumbJsonLd(
  locale: Locale,
  key: GuideKey,
  dict: Dictionary,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${guideUrl(locale, key)}#crumbs`,
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
        name: dict.guideIndex.short,
        item: guideUrl(locale),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: dict.guides[key].short,
        item: guideUrl(locale, key),
      },
    ],
  };
}

/** 教程列表页的面包屑：首页 / 教程。两层。 */
export function guideIndexCrumbJsonLd(locale: Locale, dict: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${guideUrl(locale)}#crumbs`,
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
        name: dict.guideIndex.short,
        item: guideUrl(locale),
      },
    ],
  };
}
