import Link from "next/link";
import { Icon } from "@/components/icon";
import { LangSwitch } from "@/components/lang-switch";
import { SIBLING_SITE } from "@/content/site";
import {
  guidePath,
  LEGAL_KEYS,
  pathOf,
  TOOL_KEYS,
  type Route,
} from "@/content/tools";
import type { Locale } from "@/i18n/locales";
import type { Dictionary } from "@/i18n/types";

/**
 * 页头和页脚。工具页和正式页面共用 —— 方案 §15 要求「清晰导航」，
 * AdSense 审核看的就是随便点进哪一页都能找到 About / Privacy 这些。
 */

/**
 * 页头页脚都收整条 Route，不是一个 key。
 *
 * 因为教程页在这两处要用到两件 key 说不了的事：语言切换器得知道具体哪一篇
 * （见 LangSwitch 的注释），而导航高亮要知道「在教程区但不在任何工具页上」——
 * 硬指一个工具（比如这篇配的那个）会让人以为自己站在那个工具页上。
 */
type ChromeProps = { locale: Locale; route: Route; dict: Dictionary };

export function SiteHeader({ locale, route, dict }: ChromeProps) {
  const inGuides = route.kind === "guide" || route.kind === "guideIndex";

  return (
    <header className="border-b border-grid-firm">
      <div className="mx-auto max-w-6xl px-5 pt-5 pb-3 sm:px-8">
        <div className="flex items-end justify-between gap-4">
          <Link href={pathOf(locale, "home")} className="flex items-baseline gap-2">
            {/* 数字 2 是这个域名的记忆点，单独上色 */}
            <span className="font-display text-[22px] font-semibold tracking-tight text-graphite">
              docs<span className="text-prussian">2</span>html
            </span>
            <span className="hidden font-mono text-[10px] tracking-[0.2em] text-graphite-faint uppercase sm:inline">
              .com
            </span>
          </Link>
          <LangSwitch locale={locale} route={route} label={dict.chrome.langLabel} />
        </div>
        {/* 六个工具入口挤不进 logo 那一行，所以导航自己占一行、宽度不够就横向滚动。
            滚动而不是折行：折行会让页头在窄屏上高度乱跳。 */}
        <nav className="-mx-5 mt-3 flex items-center gap-5 overflow-x-auto px-5 pb-0.5 font-mono text-[11px] tracking-[0.12em] text-graphite-faint uppercase [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TOOL_KEYS.map((k) => (
            <Link
              key={k}
              href={pathOf(locale, k)}
              className={
                route.kind === "tool" && route.key === k
                  ? "whitespace-nowrap text-prussian"
                  : "whitespace-nowrap transition-colors duration-150 hover:text-prussian"
              }
            >
              {dict.pages[k].short}
            </Link>
          ))}
          {/* 教程入口排在六个工具后面，前面加一道竖线：它不是第七个工具，
              是另一类东西（读的，不是用的）。没有这个入口的话，六篇文章
              只能靠 sitemap 和工具页底部那条链接进去 —— 页头是唯一每页都在
              的地方，内容区要在这儿有一个门。 */}
          <span aria-hidden className="h-3 w-px shrink-0 bg-grid-firm" />
          <Link
            href={guidePath(locale)}
            className={
              inGuides
                ? "whitespace-nowrap text-prussian"
                : "whitespace-nowrap transition-colors duration-150 hover:text-prussian"
            }
          >
            {dict.guideIndex.short}
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter({ locale, route, dict }: ChromeProps) {
  const c = dict.chrome;

  return (
    <footer className="border-t border-grid-firm">
      <div className="mx-auto max-w-6xl px-5 py-6 sm:px-8">
        <nav className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <span className="font-mono text-[10px] tracking-[0.18em] text-graphite-faint uppercase">
            {c.footerLegal}
          </span>
          {LEGAL_KEYS.map((k) => (
            <Link
              key={k}
              href={pathOf(locale, k)}
              className={
                route.kind === "legal" && route.key === k
                  ? "text-[12px] text-prussian"
                  : "text-[12px] text-graphite-soft transition-colors duration-150 hover:text-prussian"
              }
            >
              {dict.legal[k].short}
            </Link>
          ))}
        </nav>
        <div className="mt-4 flex flex-wrap items-baseline justify-between gap-3 border-t border-grid pt-4">
          <p className="font-mono text-[11px] text-graphite-faint">{c.footerLeft}</p>
          <p className="font-mono text-[11px] text-graphite-faint">{c.footerRight}</p>
        </div>
      </div>
    </footer>
  );
}

/**
 * 面包屑。首页不画，其余页面一律 home / 当前页。
 *
 * mid 是给教程文章的第三级用的（home / Guides / 这一篇）—— 那一层必须
 * 可点，不然读者从搜索结果直接落在一篇文章上，就没有路子发现还有另外五篇。
 * JSON-LD 的 BreadcrumbList 也是照这个层级发的，两处得一致。
 */
export function Breadcrumb({
  locale,
  label,
  homeLabel,
  mid,
}: {
  locale: Locale;
  label: string;
  homeLabel: string;
  mid?: { label: string; href: string };
}) {
  return (
    <nav className="pt-4 font-mono text-[11px] text-graphite-faint">
      <Link href={pathOf(locale, "home")} className="hover:text-prussian">
        {homeLabel}
      </Link>
      {mid && (
        <>
          <span className="px-1.5">/</span>
          <Link href={mid.href} className="hover:text-prussian">
            {mid.label}
          </Link>
        </>
      )}
      <span className="px-1.5">/</span>
      <span className="text-graphite-soft">{label}</span>
    </nav>
  );
}

/**
 * 指向姐妹站的那一块。工具页底部放一次就够。
 *
 * 跨域名只能写绝对地址，而且不加 nofollow —— 这是自己的站，权重要传过去。
 * target 也不开新窗口：用户如果是找错了门，就该顺着走过去，不该留一个
 * 没用的标签页在这边。
 */
export function SiblingSite({ dict }: { dict: Dictionary }) {
  const c = dict.chrome;
  return (
    <section className="mt-14 border-t border-grid-firm pt-8">
      <div className="plate flex flex-wrap items-center justify-between gap-4 border border-grid-firm bg-sheet px-5 py-4">
        <div className="max-w-[34rem]">
          <h2 className="font-display text-[17px] leading-snug text-graphite">
            {c.siblingHeading}
          </h2>
          <p className="mt-1 text-[13px] leading-relaxed text-graphite-soft">
            {c.siblingNote}
          </p>
        </div>
        <a
          href={SIBLING_SITE}
          rel="noopener"
          className="inline-flex shrink-0 items-center gap-1.5 border border-prussian px-3 py-1.5 font-mono text-[11px] tracking-[0.1em] text-prussian uppercase transition-colors duration-150 hover:bg-prussian hover:text-sheet"
        >
          {c.siblingCta}
          <Icon icon="ph:arrow-up-right-bold" className="h-3 w-3" />
        </a>
      </div>
    </section>
  );
}

/** 正式页面末尾指回联系页的那一句。cookies 页也指这儿，别让人无处可问。 */
export function ContactCue({
  locale,
  cue,
  label,
}: {
  locale: Locale;
  cue: string;
  label: string;
}) {
  return (
    <p className="mt-10 flex items-baseline gap-2 border-t border-grid pt-5 text-[13px] text-graphite-soft">
      <Icon
        icon="ph:envelope-simple-bold"
        className="mt-[3px] h-3.5 w-3.5 shrink-0 text-graphite-faint"
      />
      <span>
        {cue}{" "}
        <Link
          href={pathOf(locale, "contact")}
          className="text-prussian underline decoration-prussian/40 underline-offset-2 hover:decoration-prussian"
        >
          {label}
        </Link>
      </span>
    </p>
  );
}
