import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolShell } from "@/components/tool-shell";
import {
  allSegments,
  languageAlternates,
  parseSegments,
  pathOf,
} from "@/content/tools";
import { getDictionary } from "@/i18n/get-dictionary";
import { OG_LOCALE, ogAlternates } from "@/i18n/locales";
import { faqJsonLd, softwareJsonLd } from "@/lib/jsonld";

/**
 * 六语种 × 四个页面 = 24 条，全在构建时铺开。
 *
 * 用一个 optional catch-all 而不是 [lang]/[slug]：英文不带前缀，
 * /word-to-markdown/ 和 /es/ 都是单段路径，两个动态段会打架。
 */
export function generateStaticParams() {
  return allSegments();
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/[[...segments]]">): Promise<Metadata> {
  const { segments } = await params;
  const hit = parseSegments(segments);
  if (!hit) return {};

  const { locale, key } = hit;
  const page = (await getDictionary(locale)).pages[key];
  const path = pathOf(locale, key);

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: {
      // 自引用 canonical：每个本地化页面指自己，不能全指英文
      canonical: path,
      languages: languageAlternates(key),
    },
    openGraph: {
      type: "website",
      url: path,
      siteName: "Docs to MD",
      title: page.title,
      description: page.description,
      locale: OG_LOCALE[locale],
      alternateLocale: ogAlternates(locale),
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
  };
}

export default async function ToolRoute({
  params,
}: PageProps<"/[[...segments]]">) {
  const { segments } = await params;
  const hit = parseSegments(segments);
  if (!hit) notFound();

  const { locale, key } = hit;
  const dict = await getDictionary(locale);

  return (
    <>
      <script
        type="application/ld+json"
        // 结构化数据是我们自己生成的常量，不是用户输入
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            softwareJsonLd(locale, key, dict),
            faqJsonLd(locale, key, dict),
          ]),
        }}
      />
      <ToolShell locale={locale} pageKey={key} dict={dict} />
    </>
  );
}
