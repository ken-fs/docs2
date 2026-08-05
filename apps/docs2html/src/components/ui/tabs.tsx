"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * shadcn 的 Tabs，改成仪器面板上的挡位开关：
 * 一块靛蓝实心 Indicator 在标签间滑动，滑动用 ease-draft。
 * 丢掉了默认的 bg-muted 圆角胶囊和 ring 焦点环。
 */
function Tabs({ className, ...props }: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col", className)}
      {...props}
    />
  );
}

const tabsListVariants = cva("group/tabs-list relative z-1 flex items-stretch", {
  variants: {
    variant: {
      /** 色块在框内滑动，整组带细描边 —— 用在结果区的 source / preview */
      slab: "rounded-[2px] border border-grid-firm bg-sheet",
      /** 只有底部一条线跟着走 —— 用在正文里不抢戏的地方 */
      underline: "gap-4 border-b border-grid",
    },
  },
  defaultVariants: { variant: "slab" },
});

function TabsList({
  className,
  variant = "slab",
  children,
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    >
      {children}
      <TabsPrimitive.Indicator
        data-slot="tabs-indicator"
        className={cn(
          "absolute left-0 -z-1 w-(--active-tab-width) translate-x-(--active-tab-left) bg-prussian",
          "transition-[translate,width] duration-200 ease-draft",
          variant === "slab" ? "top-0 h-full" : "bottom-[-1px] h-[2px]",
        )}
      />
    </TabsPrimitive.List>
  );
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex items-center justify-center gap-1.5 bg-transparent px-3 py-1.5 font-mono text-[11px] whitespace-nowrap select-none",
        "text-graphite-soft transition-colors duration-150 hover:text-graphite",
        "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-prussian",
        "data-disabled:pointer-events-none data-disabled:opacity-45",
        // Indicator 是实心色块，所以选中态的字要反白
        "group-data-[variant=slab]/tabs-list:data-active:text-sheet",
        "group-data-[variant=underline]/tabs-list:data-active:text-prussian",
        "[&_svg]:pointer-events-none [&_svg]:h-3.5 [&_svg]:w-3.5",
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn(
        "outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-prussian",
        className,
      )}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants };
