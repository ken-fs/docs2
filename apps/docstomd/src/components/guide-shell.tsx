import Link from "next/link";
import { Icon } from "@/components/icon";
import { Breadcrumb, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { GUIDE_KEYS, guidePath, pathOf } from "@/content/tools";
import type { Locale } from "@/i18n/locales";
import type { Dictionary, GuideKey } from "@/i18n/types";

/**
 * 一篇教程的排版。
 *
 * 沿用 LegalShell 的单列窄栏（44rem，约 75 字符一行）—— 这两类页面的活儿
 * 是同一个：让人从头读到尾。没有做成两栏带侧边目录：六篇文章都在四五屏之内，
 * 目录会占掉首屏最值钱的位置去解决一个不存在的迷路问题。
 *
 * 跟 LegalShell 不一样的地方只有三处，都是为了「读完能动手」：
 *   - 面包屑三级，中间那层可点回 /guides/
 *   - 步骤用真编号（<ol>），因为那儿的先后是真的有意义
 *   - 结尾一个指回工具页的按钮，文章讲的就是那一页做的事
 */
export function GuideShell({
  locale,
  guideKey,
  dict,
}: {
  locale: Locale;
  guideKey: GuideKey;
  dict: Dictionary;
}) {
  const page = dict.guides[guideKey];
  const c = dict.chrome;
  const g = c.guide;
  const others = GUIDE_KEYS.filter((k) => k !== guideKey);
  const route = { kind: "guide", key: guideKey } as const;
  const toolHref = pathOf(locale, page.tool);

  return (
    <>
      <SiteHeader locale={locale} route={route} dict={dict} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 sm:px-8">
        <Breadcrumb
          locale={locale}
          label={page.short}
          homeLabel={c.breadcrumbHome}
          mid={{ label: dict.guideIndex.short, href: guidePath(locale) }}
        />

        <article className="max-w-[44rem] pt-7 pb-16 lg:pt-9">
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

          {/* 工具页的入口在正文上面也放一次。
              读者分两种：想弄明白为什么的，和只想马上把文件转掉的。
              第二种人不该被迫读完五节才看见那个链接 —— 但也不能只放上面，
              读完的人手边同样要有一个。所以上下各一个，样式刻意不同：
              上面是一行小字，下面是按钮块。 */}
          <Link
            href={toolHref}
            className="mt-6 inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.1em] text-pine uppercase underline decoration-dotted underline-offset-4 transition-colors hover:text-ink"
          >
            {g.cta}
            <Icon icon="ph:arrow-right-bold" className="h-3 w-3" />
          </Link>

          {page.sections.map((section) => (
            <section key={section.heading} className="mt-10 border-t border-rule pt-6">
              <h2 className="font-display text-xl leading-tight text-ink">
                {section.heading}
              </h2>
              {section.body && (
                <div className="mt-3 space-y-3 text-[14px] leading-relaxed text-ink-soft">
                  {section.body.map((para) => (
                    <p key={para}>{para}</p>
                  ))}
                </div>
              )}
              {/* 编号是 <ol> 生成的，不是写在文案里的「1.」——
                  文案里带序号的话，中间插一步就得重排后面全部。 */}
              {section.steps && (
                <ol className="mt-3.5 space-y-2.5 text-[14px] leading-relaxed text-ink-soft">
                  {section.steps.map((step, i) => (
                    <li key={step} className="flex gap-3">
                      <span className="mt-[1px] shrink-0 font-mono text-[11px] text-pine tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              )}
              {section.sample && (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    [section.sample.beforeLabel, section.sample.before],
                    [section.sample.afterLabel, section.sample.after],
                  ].map(([label, code]) => (
                    <figure key={label} className="min-w-0">
                      <figcaption className="font-mono text-[10px] tracking-[0.18em] text-ink-faint uppercase">
                        {label}
                      </figcaption>
                      {/* 横向滚动而不是折行：这里面是代码，折行会把一个标签
                          切成两半，读的人分不清哪个换行是原文里的。 */}
                      <pre className="mt-1.5 overflow-x-auto border border-rule-firm bg-paper-deep px-3 py-2.5 font-mono text-[11.5px] leading-relaxed text-ink">
                        <code>{code}</code>
                      </pre>
                    </figure>
                  ))}
                </div>
              )}
            </section>
          ))}

          <section className="mt-12 border-t border-rule-firm pt-7">
            <p className="text-[14px] leading-relaxed text-ink-soft">{page.outro}</p>
            <Link
              href={toolHref}
              className="press-lift mt-4 inline-flex items-center gap-2 border border-pine bg-paper px-4 py-2 font-mono text-[11px] tracking-[0.1em] text-pine uppercase hover:bg-pine hover:text-paper"
            >
              {dict.pages[page.tool].short}
              <Icon icon="ph:arrow-right-bold" className="h-3 w-3" />
            </Link>
          </section>

          <nav className="mt-12 border-t border-rule pt-6">
            <h2 className="font-mono text-[11px] tracking-[0.18em] text-ink-faint uppercase">
              {g.moreHeading}
            </h2>
            <ul className="mt-3.5 space-y-2">
              {others.map((k) => (
                <li key={k}>
                  <Link
                    href={guidePath(locale, k)}
                    className="text-[13px] text-ink-soft transition-colors duration-150 hover:text-pine"
                  >
                    {dict.guides[k].short}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </article>
      </main>

      <SiteFooter locale={locale} route={route} dict={dict} />
    </>
  );
}
