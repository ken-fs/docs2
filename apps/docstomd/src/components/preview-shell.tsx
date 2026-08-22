"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/icon";
import { MarkdownPreview } from "@/components/markdown-preview";
import { Breadcrumb, SiteFooter, SiteHeader } from "@/components/site-chrome";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { pathOf, TOOL_KEYS } from "@/content/tools";
import type { Locale } from "@/i18n/locales";
import { count, type Dictionary } from "@/i18n/types";

/**
 * markdown 预览页 /markdown-preview/。
 *
 * 跟 ToolShell 分开：这页不收文件、没有转换器旋钮，主体是「左边输入 markdown、
 * 右边实时看渲染」的两栏编辑器。渲染复用 MarkdownPreview（跟转换器的预览标签
 * 同一份逻辑，走 React 节点、不碰 dangerouslySetInnerHTML —— 粘进来的内容
 * 同样不可信）。页头页脚 / 面包屑 / FAQ / 交叉链接的骨架照 ToolShell 走，
 * 保持全站一致。
 */
export function PreviewShell({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const p = dict.preview;
  const c = dict.chrome;
  const route = { kind: "preview" } as const;

  const [md, setMd] = useState("");
  const chars = md.length;

  return (
    <>
      <SiteHeader locale={locale} route={route} dict={dict} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 sm:px-8">
        <Breadcrumb
          locale={locale}
          label={p.short}
          homeLabel={c.breadcrumbHome}
        />

        <section className="grid gap-8 pb-10 pt-7 lg:grid-cols-12 lg:gap-10 lg:pt-9">
          <div className="lg:col-span-7">
            <p className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-pine">
              <span className="inline-block h-[7px] w-[7px] bg-pine" />
              {p.eyebrow}
            </p>
            <h1 className="font-display text-[2.5rem] leading-[1.05] tracking-tight text-ink sm:text-[3.4rem]">
              {p.h1[0]}
              <br />
              <span className="scribble">{p.h1[1]}</span>
            </h1>
            <div className="mt-5 max-w-[34rem] space-y-1 text-[15px] leading-relaxed text-ink-soft">
              {p.lede.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-5 lg:pt-14">
            <div className="rotate-[-0.8deg] border border-ink bg-marker/22 px-5 py-4 press">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
                {p.note.heading}
              </p>
              <ul className="mt-2.5 space-y-1.5 text-[13px] leading-relaxed text-ink">
                {p.note.items.map((item) => (
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

        {/* 编辑器 / 预览两栏。窄屏堆叠，宽屏并排等高。 */}
        <section className="grid gap-4 lg:grid-cols-2 lg:gap-5">
          <div className="flex flex-col border border-rule-firm">
            <div className="flex items-center justify-between border-b border-rule-firm bg-paper-deep px-3 py-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
                {p.editorLabel}
              </span>
              <div className="flex items-center gap-2">
                <Button
                  tone="ghost"
                  size="sm"
                  onClick={() => setMd(p.sampleMarkdown)}
                >
                  <Icon icon="ph:sparkle-bold" />
                  {p.sample}
                </Button>
                <Button
                  tone="bare"
                  size="sm"
                  disabled={!md}
                  onClick={() => setMd("")}
                >
                  {p.clear}
                </Button>
              </div>
            </div>
            <textarea
              value={md}
              onChange={(e) => setMd(e.target.value)}
              spellCheck={false}
              placeholder={p.placeholder}
              className="min-h-[22rem] flex-1 resize-y bg-paper p-4 font-mono text-[13px] leading-relaxed text-ink outline-none placeholder:text-ink-faint lg:min-h-[34rem]"
            />
            <div className="border-t border-rule-firm px-3 py-1.5 text-right font-mono text-[11px] text-ink-faint">
              {count(chars, p.charCount)}
            </div>
          </div>

          <div className="flex flex-col border border-rule-firm">
            <div className="border-b border-rule-firm bg-paper-deep px-3 py-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
                {p.previewLabel}
              </span>
            </div>
            <div className="min-h-[22rem] flex-1 overflow-auto p-4 lg:min-h-[34rem]">
              {md.trim() ? (
                <MarkdownPreview md={md} />
              ) : (
                <p className="flex items-center gap-2 text-[13px] text-ink-faint">
                  <Icon
                    icon="ph:eye-bold"
                    className="h-4 w-4 shrink-0 text-ink-faint"
                  />
                  {p.emptyState}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* 正文：怎么用、支持什么、限制是什么。与工具页同结构。 */}
        <section
          id="how"
          className="mt-20 grid gap-8 border-t border-rule-firm pt-10 md:grid-cols-3 md:gap-10"
        >
          <div>
            <h2 className="font-display text-xl leading-tight text-ink">
              {p.body.stepsHeading}
            </h2>
            <ol className="mt-3 space-y-2.5 text-[13px] leading-relaxed text-ink-soft">
              {p.body.steps.map((step, i) => (
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
              {p.body.supportedHeading}
            </h2>
            <ul className="mt-3 space-y-2.5 text-[13px] leading-relaxed text-ink-soft">
              {p.body.supported.map((item) => (
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
              {p.body.limitsHeading}
            </h2>
            <ul className="mt-3 space-y-2.5 text-[13px] leading-relaxed text-ink-soft">
              {p.body.limits.map((item) => (
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

        <section id="faq" className="mt-16 border-t border-rule-firm pt-10">
          <h2 className="font-display text-2xl leading-tight text-ink">
            {c.faqHeading}
          </h2>
          <Accordion
            multiple
            defaultValue={[0]}
            className="mt-4 max-w-[46rem] border-t border-rule"
          >
            {p.faq.map((item, i) => (
              <AccordionItem key={item.q} value={i} data-shared={item.shared}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* 交叉链接：预览页把权重导去八个转换器页。 */}
        <section id="related" className="mt-14 border-t border-rule-firm pb-20 pt-8">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
            {c.crossHeading}
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {TOOL_KEYS.map((k) => (
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
          </ul>
        </section>
      </main>

      <SiteFooter locale={locale} route={route} dict={dict} />
    </>
  );
}
