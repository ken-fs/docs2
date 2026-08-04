import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { parseSegments, SITE } from "@/content/tools";
import { getDictionary } from "@/i18n/get-dictionary";
import { DEFAULT_LOCALE } from "@/i18n/locales";
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

/**
 * 只放跟具体页面无关的东西。title / description / canonical / hreflang 全在
 * page.tsx 里 —— layout 这层没法可靠地知道「这是哪一页」，英文没有前缀，
 * /word-to-markdown/ 和 /es/ 的 segments 形状一模一样。
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[[...segments]]">) {
  const { segments } = await params;
  // 认不出的路径会渲染 not-found，这时 <html lang> 兜英文
  const locale = parseSegments(segments)?.locale ?? DEFAULT_LOCALE;
  const { htmlLang } = await getDictionary(locale);

  return (
    <html
      lang={htmlLang}
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
