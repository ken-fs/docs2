import Link from "next/link";
import {
  Breadcrumb,
  ContactCue,
  SiteFooter,
  SiteHeader,
} from "@/components/site-chrome";
import { CONTACT_EMAIL, EFFECTIVE_DATE } from "@/content/site";
import { LEGAL_KEYS, pathOf } from "@/content/tools";
import type { Locale } from "@/i18n/locales";
import type { Dictionary, LegalKey } from "@/i18n/types";

/**
 * About / Contact / Privacy / Terms / Cookie 五页共用的排版。
 *
 * 单列窄栏，没有转换器、没有手风琴 —— 这些页面是给人读的（和给 AdSense
 * 审核员读的），折叠起来只会让人觉得在藏东西。
 */

/**
 * 文案里出现邮箱的地方要变成能点的 mailto，不能只是一串字。
 * 六份字典都是纯字符串，在这儿统一加链接比在每种语言里塞 JSX 干净。
 */
function withMailto(text: string, key: string) {
  const at = text.indexOf(CONTACT_EMAIL);
  if (at === -1) return text;
  return (
    <>
      {text.slice(0, at)}
      <a
        href={`mailto:${CONTACT_EMAIL}`}
        className="text-pine underline decoration-pine/40 underline-offset-2 hover:decoration-pine"
        key={key}
      >
        {CONTACT_EMAIL}
      </a>
      {text.slice(at + CONTACT_EMAIL.length)}
    </>
  );
}

export function LegalShell({
  locale,
  legalKey,
  dict,
}: {
  locale: Locale;
  legalKey: LegalKey;
  dict: Dictionary;
}) {
  const page = dict.legal[legalKey];
  const c = dict.chrome;
  const others = LEGAL_KEYS.filter((k) => k !== legalKey);

  return (
    <>
      <SiteHeader locale={locale} current={legalKey} dict={dict} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 sm:px-8">
        <Breadcrumb
          locale={locale}
          label={page.short}
          homeLabel={c.breadcrumbHome}
        />

        <article className="max-w-[44rem] pb-16 pt-7 lg:pt-9">
          <p className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-pine">
            <span className="inline-block h-[7px] w-[7px] bg-pine" />
            {page.eyebrow}
          </p>
          <h1 className="font-display text-[2.1rem] leading-[1.1] tracking-tight text-ink sm:text-[2.6rem]">
            {page.h1}
          </h1>
          <div className="mt-5 space-y-1.5 text-[15px] leading-relaxed text-ink-soft">
            {page.lede.map((line) => (
              <p key={line}>{withMailto(line, line)}</p>
            ))}
          </div>
          <p className="mt-6 font-mono text-[11px] text-ink-faint">
            {/* 写死成常量而不是 new Date()：静态导出会把构建那天的日期烙进
                HTML，每次部署都变一次，看着像条款天天在改。 */}
            {c.legalUpdated} {EFFECTIVE_DATE}
          </p>

          {page.sections.map((section) => (
            <section key={section.heading} className="mt-10 border-t border-rule pt-6">
              <h2 className="font-display text-xl leading-tight text-ink">
                {section.heading}
              </h2>
              <div className="mt-3 space-y-3 text-[14px] leading-relaxed text-ink-soft">
                {section.body.map((para) => (
                  <p key={para}>{withMailto(para, para)}</p>
                ))}
              </div>
              {section.items && (
                <ul className="mt-3.5 space-y-2 text-[14px] leading-relaxed text-ink-soft">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <span className="mt-[9px] h-[3px] w-[3px] shrink-0 bg-pine" />
                      {withMailto(item, item)}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {/* contact 页本身就是联系方式，别让它指向自己 */}
          {legalKey !== "contact" && (
            <ContactCue
              locale={locale}
              cue={c.legalContactCue}
              label={dict.legal.contact.short}
            />
          )}

          <nav className="mt-12 border-t border-rule-firm pt-6">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
              {c.footerLegal}
            </h2>
            <ul className="mt-3.5 flex flex-wrap gap-x-5 gap-y-2">
              {others.map((k) => (
                <li key={k}>
                  <Link
                    href={pathOf(locale, k)}
                    className="text-[13px] text-ink-soft transition-colors duration-150 hover:text-pine"
                  >
                    {dict.legal[k].short}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </article>
      </main>

      <SiteFooter locale={locale} current={legalKey} dict={dict} />
    </>
  );
}
