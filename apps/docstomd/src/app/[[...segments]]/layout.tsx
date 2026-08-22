import type { Metadata } from "next";
import Script from "next/script";
import {
  Bricolage_Grotesque,
  IBM_Plex_Mono,
  IBM_Plex_Sans,
} from "next/font/google";
import { parseSegments, SITE } from "@/content/tools";
import { getDictionary } from "@/i18n/get-dictionary";
import { DEFAULT_LOCALE } from "@/i18n/locales";
import "../globals.css";

/**
 * 只声明真正会渲染出来的字重。
 *
 * 每个字重都是一次额外的字体下载，而字体挡在 LCP 前面：文字要等字体到了才
 * 定版。这里的字重是数出来的，不是估的 —— 把全部 78 个页面走一遍，收集每个
 * 有文字的元素的 computed fontWeight，得到的只有五种组合：
 *
 *   IBM Plex Sans        400 / 500
 *   IBM Plex Mono        400
 *   Bricolage Grotesque  400 / 600
 *
 * 原先多声明的 sans 600、mono 500、display 700 一次都没用上。Bricolage 跟换掉的
 * Fraunces 一样是可变字体（400..600 全在一个文件里，实测 Google Fonts 只返回一个
 * woff2），多写几个字重不会多下载文件；IBM Plex 不是，每个字重一个文件，所以
 * mono 500 是实打实白下载的 10KB。
 *
 * 别拿 Lighthouse 默认的分数来验证这类改动。它默认 throttling-method=simulate
 * （Lantern）—— 先在真实网络上跑一遍再把请求图套上慢4G参数换算。而这里的真实
 * 网络是 localhost，260KB 全在 67ms 内到齐，Lantern 于是认为整包 JS 都是 LCP
 * 的前置依赖，把它们的下载时间全算进去，每个页面都得出 2.6s 左右、彼此相差不到
 * 12ms —— 一个静态法律页和 pdfjs 那个页面同分，这个数就是这么来的。真开着慢4G
 * 量（--throttling-method=devtools）是 1.5s。verify/lighthouse.mjs 因此两种都跑。
 *
 * 改样式时如果要用新的字重，记得在这儿加上，否则浏览器会拿现有字重去合成
 * （伪粗体），看起来比真字重脏。
 */
/**
 * Bricolage Grotesque —— 刻意画歪的 grotesque，字怀不对称、末端有切角。
 * 换掉原来的 Fraunces（高对比衬线）是因为「奶油底 + 高对比衬线 + 陶土色」
 * 是当前 AI 生成设计最常见的那副长相，跟题材无关地到处出现。
 *
 * 宽度也是挑出来的，不是随手换的：H1 容器 618px、字号 54.4px，用真实标题
 * 逐个量过单行自然宽度 —— Fraunces 853px，Bricolage 856px，几乎重合，所以
 * 换完行数不变（2/3/2）。Zilla Slab 789px 和 Newsreader 800px 也好看，但会
 * 把首页标题从 3 行压成 2 行 —— 那是变相改布局，这轮不动布局。
 */
const display = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const sans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400"],
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
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-06NR7QZ94Q"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-06NR7QZ94Q');
          `}
        </Script>
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
