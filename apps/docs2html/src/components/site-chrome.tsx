import Link from "next/link";
import { Icon } from "@/components/icon";
import { LangSwitch } from "@/components/lang-switch";
import { SIBLING_SITE } from "@/content/site";
import { LEGAL_KEYS, pathOf, TOOL_KEYS, type AnyKey } from "@/content/tools";
import type { Locale } from "@/i18n/locales";
import type { Dictionary } from "@/i18n/types";

/**
 * 页头和页脚。工具页和正式页面共用 —— 方案 §15 要求「清晰导航」，
 * AdSense 审核看的就是随便点进哪一页都能找到 About / Privacy 这些。
 */

export function SiteHeader({
  locale,
  current,
  dict,
}: {
  locale: Locale;
  /** 当前页，用来把导航里对应那条标出来 */
  current: AnyKey;
  dict: Dictionary;
}) {
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
          <LangSwitch locale={locale} pageKey={current} label={dict.chrome.langLabel} />
        </div>
        {/* 六个工具入口挤不进 logo 那一行，所以导航自己占一行、宽度不够就横向滚动。
            滚动而不是折行：折行会让页头在窄屏上高度乱跳。 */}
        <nav className="-mx-5 mt-3 flex items-center gap-5 overflow-x-auto px-5 pb-0.5 font-mono text-[11px] tracking-[0.12em] text-graphite-faint uppercase [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TOOL_KEYS.map((k) => (
            <Link
              key={k}
              href={pathOf(locale, k)}
              className={
                k === current
                  ? "whitespace-nowrap text-prussian"
                  : "whitespace-nowrap transition-colors duration-150 hover:text-prussian"
              }
            >
              {dict.pages[k].short}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter({
  locale,
  current,
  dict,
}: {
  locale: Locale;
  current: AnyKey;
  dict: Dictionary;
}) {
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
                k === current
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

/** 面包屑。首页不画，其余页面一律 home / 当前页。 */
export function Breadcrumb({
  locale,
  label,
  homeLabel,
}: {
  locale: Locale;
  label: string;
  homeLabel: string;
}) {
  return (
    <nav className="pt-4 font-mono text-[11px] text-graphite-faint">
      <Link href={pathOf(locale, "home")} className="hover:text-prussian">
        {homeLabel}
      </Link>
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
