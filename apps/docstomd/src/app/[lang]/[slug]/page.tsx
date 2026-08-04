import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolShell } from "@/components/tool-shell";
import { keyOfSlug, languageAlternates, pathOf, TOOL_KEYS } from "@/content/tools";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, OG_LOCALE, ogAlternates } from "@/i18n/locales";
import { faqJsonLd, softwareJsonLd } from "@/lib/jsonld";

export const dynamicParams = false;

/** lang 由上层 layout 的 generateStaticParams 铺开，这里只管 slug。 */
export function generateStaticParams() {
  return TOOL_KEYS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const key = keyOfSlug(slug);
  if (!isLocale(lang) || !key || key === "home") return {};
  const page = (await getDictionary(lang)).pages[key];

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: {
      canonical: pathOf(lang, key),
      languages: languageAlternates(key),
    },
    openGraph: {
      type: "website",
      url: pathOf(lang, key),
      siteName: "Docs to MD",
      title: page.title,
      description: page.description,
      // 同上：这里不写，layout 里的 locale 就被覆盖掉了
      locale: OG_LOCALE[lang],
      alternateLocale: ogAlternates(lang),
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
  };
}

export default async function ToolPageRoute({
  params,
}: PageProps<"/[lang]/[slug]">) {
  const { lang, slug } = await params;
  const key = keyOfSlug(slug);
  if (!isLocale(lang) || !key || key === "home") notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            softwareJsonLd(lang, key, dict),
            faqJsonLd(lang, key, dict),
          ]),
        }}
      />
      <ToolShell locale={lang} pageKey={key} dict={dict} />
    </>
  );
}
