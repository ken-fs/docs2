"use client";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";

import { cn } from "@/lib/utils";

/**
 * shadcn 的 Accordion，重写成活字排版那一套。
 * 改掉的东西：圆角、chevron 换成加号／减号（更像印刷标记）、
 * ring 焦点环换成实线描边、不再引 lucide。
 * 高度过渡用 Base UI 给的 --accordion-panel-height，缓动是 ease-thud（急停，不是 ease-in-out）。
 */
function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  );
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-rule last:border-b-0", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/acc flex flex-1 items-start gap-2.5 bg-transparent py-4 text-left text-[15px] font-medium text-ink select-none",
          "transition-colors duration-150 ease-snap hover:text-rust",
          "focus-visible:relative focus-visible:z-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust",
          "data-disabled:pointer-events-none data-disabled:opacity-50",
          className,
        )}
        {...props}
      >
        <span
          aria-hidden
          className="mt-[7px] inline-block h-[6px] w-[6px] shrink-0 bg-rust transition-transform duration-200 ease-spring group-data-panel-open/acc:rotate-45 group-data-panel-open/acc:scale-125"
        />
        <span className="flex-1">{children}</span>
        {/* 加号转 45° 会变成 ×，看着像「删除」；所以展开时直接换成减号 */}
        <span
          aria-hidden
          className="relative mt-[3px] h-3.5 w-3.5 shrink-0 text-ink-faint transition-colors duration-150 group-hover/acc:text-rust"
        >
          <span className="absolute top-1/2 left-0 h-[1.5px] w-full -translate-y-1/2 bg-current" />
          <span className="absolute top-0 left-1/2 h-full w-[1.5px] -translate-x-1/2 bg-current transition-transform duration-200 ease-spring group-data-panel-open/acc:scale-y-0" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="h-(--accordion-panel-height) overflow-hidden transition-[height] duration-200 ease-thud data-ending-style:h-0 data-starting-style:h-0"
      {...props}
    >
      <div
        className={cn(
          "pb-4 pl-[18px] text-[14px] leading-relaxed text-ink-soft",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
