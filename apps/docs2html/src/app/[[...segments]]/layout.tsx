import type { Metadata } from "next";
import Script from "next/script";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { parseSegments, SITE } from "@/content/tools";
import { getDictionary } from "@/i18n/get-dictionary";
import { DEFAULT_LOCALE } from "@/i18n/locales";
import "../globals.css";

/**
 * 字体和 docstomd 那边完全不同一套。那边是 Bricolage Grotesque + IBM Plex
 * （畸变的字怀、切角末端，暖），这边是 Space Grotesk + Inter + JetBrains Mono
 * （几何、规整、冷）—— 两站放一起一眼分得出，不会让人以为点错了返回键。
 *
 * 换色板那轮考虑过把 Space Grotesk 也换掉（它和 Inter 是当前被选中频率最高
 * 的一对），量了 Familjen Grotesk / Archivo / Chivo / Syne / Darker Grotesque
 * 一圈 —— 保住现有行数（3/2/2）的只有前两个。最后决定不换：docstomd 刚换成
 * Bricolage Grotesque，这边再挑一个 grotesque，两站的标题只会更像，而「一眼
 * 分得开」是硬要求，比「避开常见字体」优先。几何 vs 畸变这个对比已经够。
 *
 * 等宽字体在这站的分量比那边重：产物是 HTML 源码，源码框是页面主体。
 * JetBrains Mono 有连字和清晰的 0/O 区分，读代码比 Plex Mono 舒服。
 *
 * 字重按「全 72 个页面上真正渲染出来的」来声明 —— 每个字重都是一次挡在 LCP
 * 前面的字体下载。数出来的组合是 Inter 400/500、JetBrains Mono 400、
 * Space Grotesk 400 和 600。
 *
 * Space Grotesk 保留 500 而不换成 400：它是可变字体（三个字重共用一个文件，
 * 声明多少个都只下载一次），标题那些 computed 400 的文字是靠 500 这个面
 * 就近匹配渲染的。改成 400 会让所有标题变细，那是改设计不是改性能。
 *
 * 想验证字体改动对 LCP 的影响，别看 Lighthouse 默认那遍 —— 它是 Lantern 模拟，
 * 在 localhost 上会把整包 JS 都算成 LCP 的前置依赖，八个页面一律 2.6s，改什么
 * 都不动。要加 --throttling-method=devtools。详见 verify/lighthouse.mjs 里 run()
 * 上面那段注释。
 */
const display = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600"],
});

const sans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400"],
});

/**
 * 只放跟具体页面无关的东西。title / description / canonical / hreflang 全在
 * page.tsx 里 —— layout 这层没法可靠地知道「这是哪一页」，英文没有前缀，
 * /docx-to-html/ 和 /es/ 的 segments 形状一模一样。
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
          src="https://www.googletagmanager.com/gtag/js?id=G-Y81QDNRL1R"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Y81QDNRL1R');
          `}
        </Script>
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
