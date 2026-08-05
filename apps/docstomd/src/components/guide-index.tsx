import Link from "next/link";
import { Icon } from "@/components/icon";
import { Breadcrumb, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { GUIDE_KEYS, guidePath, pathOf } from "@/content/tools";
import type { Locale } from "@/i18n/locales";
import type { Dictionary } from "@/i18n/types";

/**
 * /guides/ 列表页。
 *
 * 六张卡片一列，不做网格：每张要摆标题、一句摘要、还有「配哪个工具页」那行，
 * 挤到三栏里摘要就只剩半句，读者只能靠标题猜。六条内容纵向排完也就两屏。
 *
 * 每张卡片有两个可点的东西（标题去文章，底下那行去工具页）。<a> 不能套
 * <a>，所以卡片本身不是链接 —— 标题是链接，卡片只做 hover 反馈。
 */
export function GuideIndex({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const page = dict.guideIndex;
  const c = dict.chrome;
  const route = { kind: "guideIndex" } as const;

  return (
    <>
      <SiteHeader locale={locale} route={route} dict={dict} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 sm:px-8">
        <Breadcrumb
          locale={locale}
          label={page.short}
          homeLabel={c.breadcrumbHome}
        />

        <div className="pt-7 pb-16 lg:pt-9">
          <header className="max-w-[44rem]">
            <p className="mb-4 flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-pine uppercase">
              <span className="inline-block h-[7px] w-[7px] bg-pine" />
              {page.eyebrow}
            </p>
            <h1 className="font-display text-[2.1rem] leading-[1.1] tracking-tight text-ink sm:text-[2.6rem]">
              {page.h1}
            </h1>
            <div className="mt-5 space-y-2 text-[15px] leading-relaxed text-ink-soft">
              {page.lede.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </header>

          <ul className="mt-10 max-w-[52rem] border-t border-rule-firm">
            {GUIDE_KEYS.map((k) => {
              const guide = dict.guides[k];
              return (
                <li
                  key={k}
                  className="group border-b border-rule py-5 transition-colors duration-150 hover:border-rule-firm"
                >
                  <h2 className="font-display text-[19px] leading-snug text-ink">
                    <Link
                      href={guidePath(locale, k)}
                      className="transition-colors duration-150 group-hover:text-pine"
                    >
                      {guide.h1}
                    </Link>
                  </h2>
                  <p className="mt-2 max-w-[44rem] text-[13.5px] leading-relaxed text-ink-soft">
                    {guide.description}
                  </p>
                  {/* 「配哪个工具」那行用中性色，只有工具页名是绿的 ——
                      一行里主色只标真正能点的那几个字。 */}
                  <p className="mt-2.5 font-mono text-[11px] text-ink-faint">
                    {c.guide.pairedWith}{" "}
                    <Link
                      href={pathOf(locale, guide.tool)}
                      className="inline-flex items-baseline gap-1 text-pine transition-colors hover:text-ink"
                    >
                      {dict.pages[guide.tool].short}
                      <Icon icon="ph:arrow-right-bold" className="h-2.5 w-2.5" />
                    </Link>
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </main>

      <SiteFooter locale={locale} route={route} dict={dict} />
    </>
  );
}
