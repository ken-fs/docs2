import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideIndex } from "@/components/guide-index";
import { GuideShell } from "@/components/guide-shell";
import { LegalShell } from "@/components/legal-shell";
import { ToolShell } from "@/components/tool-shell";
import {
  allSegments,
  parseSegments,
  routeAlternates,
  routePath,
} from "@/content/tools";
import { getDictionary } from "@/i18n/get-dictionary";
import { OG_LOCALE, ogAlternates } from "@/i18n/locales";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  guideCrumbJsonLd,
  guideIndexCrumbJsonLd,
  legalJsonLd,
  softwareJsonLd,
} from "@/lib/jsonld";

/**
 * 六语种 × 十九个页面 = 114 条，全在构建时铺开
 * （首页 + 6 工具页 + 5 正式页面 + 教程列表 + 6 篇教程）。
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

  const { locale } = hit;
  const dict = await getDictionary(locale);

  /*
   * 四种页面的文案存在四个不同的地方，但要出的元数据字段是同一套。先收敛成
   * 「文案 + 关键词」两样，路径和 hreflang 交给 routePath / routeAlternates ——
   * 否则 title/description/canonical/hreflang 每样都要判四次 kind，
   * 漏一处就是一个页面缺 canonical。
   */
  const { page, keywords } =
    hit.kind === "tool"
      ? { page: dict.pages[hit.key], keywords: dict.pages[hit.key].keywords }
      : hit.kind === "legal"
        ? // 法律文本没有要抢的关键词，硬塞只会显得在堆词
          { page: dict.legal[hit.key], keywords: undefined }
        : hit.kind === "guide"
          ? { page: dict.guides[hit.key], keywords: dict.guides[hit.key].keywords }
          : // 列表页的关键词都归到六篇文章身上了，它自己不争
            { page: dict.guideIndex, keywords: undefined };

  const path = routePath(locale, hit);

  return {
    title: page.title,
    description: page.description,
    keywords,
    alternates: {
      // 自引用 canonical：每个本地化页面指自己，不能全指英文
      canonical: path,
      // 全语种互指 + 自引用，Google 要这个关系双向成立
      languages: routeAlternates(hit),
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

  const { locale } = hit;
  const dict = await getDictionary(locale);

  // 结构化数据是我们自己生成的常量，不是用户输入。null 过掉：首页没有面包屑。
  const graph = (
    hit.kind === "tool"
      ? [
          softwareJsonLd(locale, hit.key, dict),
          faqJsonLd(locale, hit.key, dict),
          breadcrumbJsonLd(locale, hit.key, dict.pages[hit.key].short, dict),
        ]
      : hit.kind === "legal"
        ? [
            legalJsonLd(locale, hit.key, dict),
            breadcrumbJsonLd(locale, hit.key, dict.legal[hit.key].short, dict),
          ]
        : hit.kind === "guide"
          ? [articleJsonLd(locale, hit.key, dict), guideCrumbJsonLd(locale, hit.key, dict)]
          : [guideIndexCrumbJsonLd(locale, dict)]
  ).filter(Boolean);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
      {hit.kind === "tool" ? (
        <ToolShell locale={locale} pageKey={hit.key} dict={dict} />
      ) : hit.kind === "legal" ? (
        <LegalShell locale={locale} legalKey={hit.key} dict={dict} />
      ) : hit.kind === "guide" ? (
        <GuideShell locale={locale} guideKey={hit.key} dict={dict} />
      ) : (
        <GuideIndex locale={locale} dict={dict} />
      )}
    </>
  );
}
