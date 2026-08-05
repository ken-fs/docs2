import Link from "next/link";
import { Converter } from "@/components/converter";
import { Icon } from "@/components/icon";
import { Breadcrumb, SiteFooter, SiteHeader } from "@/components/site-chrome";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { pathOf, TOOL_INPUT, TOOL_KEYS } from "@/content/tools";
import type { Locale } from "@/i18n/locales";
import type { Dictionary, PageKey } from "@/i18n/types";

/** icon 固定，标签跟着语言走。 */
const KEEP_ICONS = [
  ["headings", "ph:text-h-bold"],
  ["tables", "ph:table-bold"],
  ["lists", "ph:list-bullets-bold"],
  ["links", "ph:link-bold"],
  ["emphasis", "ph:text-b-bold"],
  ["quotes", "ph:quotes-bold"],
  ["code", "ph:code-bold"],
  ["images", "ph:image-square-bold"],
] as const;

export function ToolShell({
  locale,
  pageKey,
  dict,
}: {
  locale: Locale;
  pageKey: PageKey;
  dict: Dictionary;
}) {
  const page = dict.pages[pageKey];
  const c = dict.chrome;
  const isHome = pageKey === "home";
  const others = TOOL_KEYS.filter((k) => k !== pageKey);
  const input = TOOL_INPUT[pageKey];

  return (
    <>
      <SiteHeader locale={locale} current={pageKey} dict={dict} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 sm:px-8">
        {!isHome && (
          <Breadcrumb
            locale={locale}
            label={page.short}
            homeLabel={c.breadcrumbHome}
          />
        )}

        <section
          className={`grid gap-8 pb-10 lg:grid-cols-12 lg:gap-10 lg:pb-14 ${
            isHome ? "pt-12 lg:pt-16" : "pt-7 lg:pt-9"
          }`}
        >
          <div className="lg:col-span-7">
            <p className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-pine">
              <span className="inline-block h-[7px] w-[7px] bg-pine" />
              {page.eyebrow}
            </p>
            <h1 className="font-display text-[2.5rem] leading-[1.05] tracking-tight text-ink sm:text-[3.4rem]">
              {page.h1[0]}
              <br />
              <span className="scribble">{page.h1[1]}</span>
            </h1>
            <div className="mt-5 max-w-[34rem] space-y-1 text-[15px] leading-relaxed text-ink-soft">
              {page.lede.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-5 lg:pt-14">
            <div className="rotate-[-0.8deg] border border-ink bg-marker/22 px-5 py-4 press">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
                {page.note.heading}
              </p>
              <ul className="mt-2.5 space-y-1.5 text-[13px] leading-relaxed text-ink">
                {page.note.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <Icon
                      icon="ph:check-bold"
                      className="mt-[3px] h-3.5 w-3.5 shrink-0 text-pine"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </section>

        <Converter t={dict.converter} input={input} />

        {/* 方案 §8.7 要求的正文：怎么用、支持什么、限制是什么。
            这三段不是给爬虫凑字数的 —— 每个转换器的限制都是真的（PDF 不认扫描件、
            Excel 读的是显示值），说在前面比让用户试出来强。 */}
        <section
          id="how"
          className="mt-20 grid gap-8 border-t border-rule-firm pt-10 md:grid-cols-3 md:gap-10"
        >
          <div>
            <h2 className="font-display text-xl leading-tight text-ink">
              {page.body.stepsHeading}
            </h2>
            <ol className="mt-3 space-y-2.5 text-[13px] leading-relaxed text-ink-soft">
              {page.body.steps.map((step, i) => (
                <li key={step} className="flex gap-2.5">
                  <span className="mt-[1px] shrink-0 font-mono text-[11px] text-pine">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h2 className="font-display text-xl leading-tight text-ink">
              {page.body.supportedHeading}
            </h2>
            <ul className="mt-3 space-y-2.5 text-[13px] leading-relaxed text-ink-soft">
              {page.body.supported.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <Icon
                    icon="ph:check-bold"
                    className="mt-[3px] h-3.5 w-3.5 shrink-0 text-pine"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl leading-tight text-ink">
              {page.body.limitsHeading}
            </h2>
            <ul className="mt-3 space-y-2.5 text-[13px] leading-relaxed text-ink-soft">
              {page.body.limits.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <Icon
                    icon="ph:minus-bold"
                    className="mt-[3px] h-3.5 w-3.5 shrink-0 text-pine"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {(input.engine === "docx" || input.engine === "html") && (
        <section
          id="keeps"
          className="mt-20 grid gap-7 border-t border-rule-firm pt-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12"
        >
          <div>
            <h2 className="font-display text-2xl leading-tight text-ink">
              {c.keepsHeading}
            </h2>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
              {c.keepsLede}
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-faint">
              {c.keepsDocNote}
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
            {KEEP_ICONS.map(([slot, icon]) => (
              <li
                key={slot}
                className="flex items-center gap-2.5 border-b border-rule pb-2.5 text-[13px] text-ink"
              >
                <Icon icon={icon} className="h-4 w-4 shrink-0 text-ink-faint" />
                {c.keeps[slot]}
                {slot === "images" && (
                  <span className="ml-auto font-mono text-[10px] text-ink-faint">
                    .docx
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
        )}

        <section id="faq" className="mt-16 border-t border-rule-firm pt-10">
          <h2 className="font-display text-2xl leading-tight text-ink">
            {c.faqHeading}
          </h2>
          {/* 第一条默认展开，剩下的收起来 —— 长页面不该一屏全是问答 */}
          <Accordion
            multiple
            defaultValue={[0]}
            className="mt-4 max-w-[46rem] border-t border-rule"
          >
            {/* data-shared 标出「每页都一样而且就该一样」的那几条（文件会不会
                上传之类）。verify/cross-site.mjs 靠它把这些条目从原创性比对里
                排掉 —— 它们的重合是设计的一部分。 */}
            {page.faq.map((item, i) => (
              <AccordionItem key={item.q} value={i} data-shared={item.shared}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* 交叉链接：把权重在几个 slug 页之间传起来。
            id 是给 verify/cross-site.mjs 用的：这一段每页都一样（就是同一份
            工具清单），比原创性的时候必须排除，否则六个工具页互相之间会凭
            这几张卡片刷出三成重合率。 */}
        <section id="related" className="mt-14 border-t border-rule-firm pb-20 pt-8">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
            {c.crossHeading}
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {others.map((k) => (
              <li key={k}>
                <Link
                  href={pathOf(locale, k)}
                  className="press-lift block h-full border border-rule-firm bg-paper/60 px-4 py-3.5 hover:border-ink"
                >
                  <span className="font-display text-[15px] leading-snug text-ink">
                    {dict.pages[k].short}
                  </span>
                  <span className="mt-1 block text-[12px] leading-relaxed text-ink-soft">
                    {dict.pages[k].note.items[0]}
                  </span>
                </Link>
              </li>
            ))}
            {!isHome && (
              <li>
                <Link
                  href={pathOf(locale, "home")}
                  className="press-lift block h-full border border-rule-firm bg-paper/60 px-4 py-3.5 hover:border-ink"
                >
                  <span className="font-display text-[15px] leading-snug text-ink">
                    {c.startOver}
                  </span>
                  <span className="mt-1 block text-[12px] leading-relaxed text-ink-soft">
                    {c.startOverNote}
                  </span>
                </Link>
              </li>
            )}
          </ul>
        </section>
      </main>

      <SiteFooter locale={locale} current={pageKey} dict={dict} />
    </>
  );
}
