import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fraunces, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { languageAlternates, SITE } from "@/content/tools";
import { getDictionary } from "@/i18n/get-dictionary";
import { LOCALES, OG_LOCALE, isLocale, ogAlternates } from "@/i18n/locales";
import "../globals.css";

const display = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const sans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

/** 六个语种全静态生成，别的 lang 进不来。 */
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const home = dict.pages.home;

  return {
    metadataBase: new URL(SITE),
    title: { default: home.title, template: "%s | Docs to MD" },
    description: home.description,
    keywords: home.keywords,
    alternates: {
      canonical: `/${lang}`,
      languages: languageAlternates("home"),
    },
    openGraph: {
      type: "website",
      url: `/${lang}`,
      siteName: "Docs to MD",
      locale: OG_LOCALE[lang],
      alternateLocale: ogAlternates(lang),
      title: home.title,
      description: home.description,
    },
    twitter: {
      card: "summary_large_image",
      title: home.title,
      description: home.description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <html
      lang={dict.htmlLang}
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
