import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalShell } from "@/components/legal-shell";
import { ToolShell } from "@/components/tool-shell";
import {
  allSegments,
  languageAlternates,
  parseSegments,
  pathOf,
} from "@/content/tools";
import { getDictionary } from "@/i18n/get-dictionary";
import { OG_LOCALE, ogAlternates } from "@/i18n/locales";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  legalJsonLd,
  softwareJsonLd,
} from "@/lib/jsonld";

/**
 * 六语种 × 十二个页面 = 72 条，全在构建时铺开（6 个工具页 + 5 个正式页面 + 首页）。
 *
 * 用一个 optional catch-all 而不是 [lang]/[slug]：英文不带前缀，
 * /docx-to-html/ 和 /es/ 都是单段路径，两个动态段会打架。
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

  const { locale, kind, key } = hit;
  const dict = await getDictionary(locale);
  const page = kind === "tool" ? dict.pages[key] : dict.legal[key];
  const path = pathOf(locale, key);

  return {
    title: page.title,
    description: page.description,
    // 法律文本没有要抢的关键词，硬塞只会显得在堆词
    keywords: kind === "tool" ? dict.pages[key].keywords : undefined,
    alternates: {
      // 自引用 canonical：每个本地化页面指自己，不能全指英文
      canonical: path,
      languages: languageAlternates(key),
    },
    openGraph: {
      type: "website",
      url: path,
      siteName: "Docs 2 HTML",
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

export default async function Route({ params }: PageProps<"/[[...segments]]">) {
  const { segments } = await params;
  const hit = parseSegments(segments);
  if (!hit) notFound();

  const { locale, kind, key } = hit;
  const dict = await getDictionary(locale);

  // 结构化数据是我们自己生成的常量，不是用户输入。null 过掉：首页没有面包屑。
  const graph = (
    kind === "tool"
      ? [
          softwareJsonLd(locale, key, dict),
          faqJsonLd(locale, key, dict),
          breadcrumbJsonLd(locale, key, dict.pages[key].short, dict),
        ]
      : [
          legalJsonLd(locale, key, dict),
          breadcrumbJsonLd(locale, key, dict.legal[key].short, dict),
        ]
  ).filter(Boolean);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
      {kind === "tool" ? (
        <ToolShell locale={locale} pageKey={key} dict={dict} />
      ) : (
        <LegalShell locale={locale} legalKey={key} dict={dict} />
      )}
    </>
  );
}
