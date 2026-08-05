"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { pathOf, type AnyKey } from "@/content/tools";
import { LOCALES, LOCALE_NAMES, LOCALE_SHORT, type Locale } from "@/i18n/locales";

/**
 * 语言切换器：真 <a href>，而且一直在 DOM 里。
 *
 * 用原生 <details> 而不是 Base UI 的 Menu：Menu 把弹层放进 Portal、只在展开时
 * 挂载，静态 HTML 里就没有那六个链接。爬虫不跑 JS 也得能顺着链接找到另外五个
 * 语种版本，所以这里必须「HTML 里本来就有」，不能靠脚本生成。
 *
 * 换语言时把当前 slug 带过去 —— 从 /ja/word-to-markdown/ 切西语应该落在
 * /es/word-to-markdown/，而不是被踢回首页。
 */
export function LangSwitch({
  locale,
  pageKey,
  label,
}: {
  locale: Locale;
  pageKey: AnyKey;
  label: string;
}) {
  const box = useRef<HTMLDetailsElement>(null);

  // <details> 原生不管「点外面关掉」和 Esc，这两条自己补
  useEffect(() => {
    const close = () => {
      if (box.current) box.current.open = false;
    };
    const onDown = (e: PointerEvent) => {
      if (box.current?.open && !box.current.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <details ref={box} data-slot="lang-switch" className="group/lang relative">
      <summary
        aria-label={label}
        className="flex cursor-pointer list-none items-center gap-1.5 border border-grid-firm bg-sheet px-2 py-1 font-mono text-[11px] text-graphite-soft transition-all duration-150 ease-draft select-none hover:border-prussian hover:text-graphite focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-prussian group-open/lang:border-prussian group-open/lang:bg-sheet group-open/lang:text-graphite [&::-webkit-details-marker]:hidden"
      >
        <Icon icon="ph:translate-bold" className="h-3.5 w-3.5" />
        {LOCALE_SHORT[locale]}
        <Icon
          icon="ph:caret-down-bold"
          className="h-2.5 w-2.5 transition-transform duration-200 ease-tick group-open/lang:rotate-180"
        />
      </summary>

      <div className="absolute top-full right-0 z-50 mt-1.5 min-w-44 border border-grid-firm bg-sheet p-1 shadow-[0_6px_18px_-6px_oklch(0.226_0.021_254_/_0.34)]">
        <p className="px-2.5 pt-1.5 pb-1 font-mono text-[10px] tracking-[0.18em] text-graphite-faint uppercase">
          {label}
        </p>
        <div className="-mx-1 my-1 h-px bg-grid" />
        <ul>
          {LOCALES.map((l) => {
            const current = l === locale;
            return (
              <li key={l}>
                <Link
                  href={pathOf(l, pageKey)}
                  hrefLang={l}
                  aria-current={current ? "true" : undefined}
                  className={
                    current
                      ? "relative flex items-center gap-2 py-1.5 pr-2.5 pl-7 text-[13px] font-medium text-graphite"
                      : "relative flex items-center gap-2 py-1.5 pr-2.5 pl-7 text-[13px] text-graphite-soft transition-colors duration-100 hover:bg-prussian hover:text-sheet"
                  }
                >
                  {current && (
                    <Icon
                      icon="ph:check-bold"
                      className="pointer-events-none absolute left-2 h-3 w-3 text-prussian"
                    />
                  )}
                  {LOCALE_NAMES[l]}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </details>
  );
}
