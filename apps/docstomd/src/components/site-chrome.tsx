import Link from "next/link";
import { Icon } from "@/components/icon";
import { LangSwitch } from "@/components/lang-switch";
import { LEGAL_KEYS, pathOf, TOOL_KEYS, type AnyKey } from "@/content/tools";
import type { Locale } from "@/i18n/locales";
import type { Dictionary } from "@/i18n/types";

/**
 * 页头和页脚。工具页和正式页面共用 —— 方案 §15 要求"清晰导航"，
 * 而 AdSense 审核看的就是随便点进哪一页都能找到 About / Privacy 这些。
 */

export function SiteHeader({
  locale,
  current,
  dict,
}: {
  locale: Locale;
  /** 当前页，用来把导航里对应那条标红 */
  current: AnyKey;
  dict: Dictionary;
}) {
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
          <LangSwitch locale={locale} pageKey={current} label={dict.chrome.langLabel} />
        </div>
        {/* 七个工具入口挤不进 logo 那一行，所以导航自己占一行、宽度不够就横向滚动。
            滚动而不是折行：折行会让页头在窄屏上高度乱跳。 */}
        <nav className="-mx-5 mt-3 flex items-center gap-5 overflow-x-auto px-5 pb-0.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TOOL_KEYS.map((k) => (
            <Link
              key={k}
              href={pathOf(locale, k)}
              className={
                k === current
                  ? "whitespace-nowrap text-pine"
                  : "whitespace-nowrap transition-colors duration-150 hover:text-pine"
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
                k === current
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
    <nav className="pt-4 font-mono text-[11px] text-ink-faint">
      <Link href={pathOf(locale, "home")} className="hover:text-pine">
        {homeLabel}
      </Link>
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
