import { urlOf } from "@/content/tools";
import type { Locale } from "@/i18n/locales";
import type { Dictionary, PageKey } from "@/i18n/types";

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

export function softwareJsonLd(
  locale: Locale,
  key: PageKey,
  dict: Dictionary,
) {
  const page = dict.pages[key];
  const url = urlOf(locale, key);
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${url}#app`,
    name: key === "home" ? "Docs to MD" : `Docs to MD — ${page.short}`,
    url,
    inLanguage: dict.htmlLang,
    description: page.description,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any browser",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: dict.chrome.features,
  };
}
