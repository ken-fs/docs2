import Link from "next/link";
import { Icon } from "@/components/icon";
import { LangSwitch } from "@/components/lang-switch";
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
 * 页头和页脚。工具页和正式页面共用 —— 方案 §15 要求"清晰导航"，
 * 而 AdSense 审核看的就是随便点进哪一页都能找到 About / Privacy 这些。
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
    <header className="border-b border-rule-firm">
      {/* 窄屏放不下 logo + 三个入口 + 语言，所以导航自己占一行、横向滚动 */}
      <div className="mx-auto max-w-6xl px-5 pb-3 pt-5 sm:px-8">
        <div className="flex items-end justify-between gap-4">
          <Link href={pathOf(locale, "home")} className="flex items-baseline gap-2">
            <span className="font-display text-[22px] font-semibold tracking-tight text-ink">
              docs<span className="text-pine">to</span>md
            </span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint sm:inline">
              .com
            </span>
          </Link>
          <LangSwitch locale={locale} route={route} label={dict.chrome.langLabel} />
        </div>
        {/* 七个工具入口挤不进 logo 那一行，所以导航自己占一行、宽度不够就横向滚动。
            滚动而不是折行：折行会让页头在窄屏上高度乱跳。 */}
        <nav className="-mx-5 mt-3 flex items-center gap-5 overflow-x-auto px-5 pb-0.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TOOL_KEYS.map((k) => (
            <Link
              key={k}
              href={pathOf(locale, k)}
              className={
                route.kind === "tool" && route.key === k
                  ? "whitespace-nowrap text-pine"
                  : "whitespace-nowrap transition-colors duration-150 hover:text-pine"
              }
            >
              {dict.pages[k].short}
            </Link>
          ))}
          {/* 教程入口排在七个工具后面，前面加一道竖线：它不是第八个工具，
              是另一类东西（读的，不是用的）。没有这个入口的话，六篇文章
              只能靠 sitemap 和工具页底部那条链接进去 —— 页头是唯一每页都在
              的地方，内容区要在这儿有一个门。 */}
          <span aria-hidden className="h-3 w-px shrink-0 bg-rule-firm" />
          <Link
            href={guidePath(locale)}
            className={
              inGuides
                ? "whitespace-nowrap text-pine"
                : "whitespace-nowrap transition-colors duration-150 hover:text-pine"
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
    <footer className="border-t border-rule-firm">
      <div className="mx-auto max-w-6xl px-5 py-6 sm:px-8">
        <nav className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
            {c.footerLegal}
          </span>
          {LEGAL_KEYS.map((k) => (
            <Link
              key={k}
              href={pathOf(locale, k)}
              className={
                route.kind === "legal" && route.key === k
                  ? "text-[12px] text-pine"
                  : "text-[12px] text-ink-soft transition-colors duration-150 hover:text-pine"
              }
            >
              {dict.legal[k].short}
            </Link>
          ))}
        </nav>
        <div className="mt-4 flex flex-wrap items-baseline justify-between gap-3 border-t border-rule pt-4">
          <p className="font-mono text-[11px] text-ink-faint">{c.footerLeft}</p>
          <p className="font-mono text-[11px] text-ink-faint">{c.footerRight}</p>
        </div>
      </div>
    </footer>
  );
}

/**
 * 面包屑。首页不画，其余页面一律 home / 当前页。
 *
 * mid 是给教程文章的第三级用的（home / 教程 / 这一篇）—— 那一层必须
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
    <nav className="pt-4 font-mono text-[11px] text-ink-faint">
      <Link href={pathOf(locale, "home")} className="hover:text-pine">
        {homeLabel}
      </Link>
      {mid && (
        <>
          <span className="px-1.5">/</span>
          <Link href={mid.href} className="hover:text-pine">
            {mid.label}
          </Link>
        </>
      )}
      <span className="px-1.5">/</span>
      <span className="text-ink-soft">{label}</span>
    </nav>
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
    <p className="mt-10 flex items-baseline gap-2 border-t border-rule pt-5 text-[13px] text-ink-soft">
      <Icon icon="ph:envelope-simple-bold" className="mt-[3px] h-3.5 w-3.5 shrink-0 text-ink-faint" />
      <span>
        {cue}{" "}
        <Link href={pathOf(locale, "contact")} className="text-pine underline decoration-pine/40 underline-offset-2 hover:decoration-pine">
          {label}
        </Link>
      </span>
    </p>
  );
}
