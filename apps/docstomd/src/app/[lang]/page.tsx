import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolShell } from "@/components/tool-shell";
import { languageAlternates, pathOf } from "@/content/tools";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, OG_LOCALE, ogAlternates } from "@/i18n/locales";
import { faqJsonLd, softwareJsonLd } from "@/lib/jsonld";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const page = (await getDictionary(lang)).pages.home;

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: {
      canonical: pathOf(lang, "home"),
      languages: languageAlternates("home"),
    },
    openGraph: {
      type: "website",
      url: pathOf(lang, "home"),
      siteName: "Docs to MD",
      title: page.title,
      description: page.description,
      // 页面级 openGraph 会整体覆盖 layout 的，locale 得在这儿再写一遍
      locale: OG_LOCALE[lang],
      alternateLocale: ogAlternates(lang),
    },
  };
}

export default async function HomeRoute({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <script
        type="application/ld+json"
        // 结构化数据是我们自己生成的常量，不是用户输入
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            softwareJsonLd(lang, "home", dict),
            faqJsonLd(lang, "home", dict),
          ]),
        }}
      />
      <ToolShell locale={lang} pageKey="home" dict={dict} />
    </>
  );
}
