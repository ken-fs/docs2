"use client";

import { useRouter } from "next/navigation";
import { Icon } from "@/components/icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroupLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { pathOf } from "@/content/tools";
import { LOCALES, LOCALE_NAMES, LOCALE_SHORT, type Locale } from "@/i18n/locales";
import type { PageKey } from "@/i18n/types";

/**
 * 换语言时把当前 slug 带过去 —— 从 /ja/word-to-markdown 切西语，
 * 应该落在 /es/word-to-markdown，而不是被踢回首页。
 * 顺手写一个一年期 cookie，proxy 下次就不用再猜了。
 */
export function LangSwitch({
  locale,
  pageKey,
  label,
}: {
  locale: Locale;
  pageKey: PageKey;
  label: string;
}) {
  const router = useRouter();

  const go = (next: string) => {
    if (!LOCALES.includes(next as Locale)) return;
    document.cookie = `locale=${next}; path=/; max-age=31536000; samesite=lax`;
    router.push(pathOf(next as Locale, pageKey));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={label}
        className="group/lang flex items-center gap-1.5 border border-rule-firm bg-paper/70 px-2 py-1 font-mono text-[11px] text-ink-soft transition-all duration-150 ease-snap select-none hover:border-ink hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust data-popup-open:border-ink data-popup-open:bg-paper data-popup-open:text-ink"
      >
        <Icon icon="ph:translate-bold" className="h-3.5 w-3.5" />
        {LOCALE_SHORT[locale]}
        <Icon
          icon="ph:caret-down-bold"
          className="h-2.5 w-2.5 transition-transform duration-200 ease-spring group-data-popup-open/lang:rotate-180"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* GroupLabel 必须待在 RadioGroup 里面，Base UI 在外面会直接抛错 */}
        <DropdownMenuRadioGroup value={locale} onValueChange={go}>
          <DropdownMenuGroupLabel>{label}</DropdownMenuGroupLabel>
          <DropdownMenuSeparator />
          {LOCALES.map((l) => (
            <DropdownMenuRadioItem key={l} value={l}>
              {LOCALE_NAMES[l]}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
