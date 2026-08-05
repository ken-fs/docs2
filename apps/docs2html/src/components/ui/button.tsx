"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * shadcn 的 Button，换成蓝图工作台那一套：细硬边、2px 圆角、按下往下沉一格。
 * 保留 Base UI 的 Button 基元（disabled 焦点处理、render 组合），
 * 丢掉默认的柔和阴影和 primary/secondary 配色。
 *
 * 和 docstomd 那边的凸版按钮刻意不同：那边是斜向硬偏移（像盖章），这边是
 * 纵向单向位移（像按下一个仪器按钮）。两站的手感应该一摸就分得出来。
 */
const buttonVariants = cva(
  [
    "relative inline-flex shrink-0 items-center justify-center gap-2 border font-medium tracking-tight whitespace-nowrap select-none",
    "transition-[transform,box-shadow,background-color,color] duration-150 ease-draft",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-prussian",
    "disabled:pointer-events-none disabled:opacity-45 data-disabled:pointer-events-none data-disabled:opacity-45",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      tone: {
        prussian:
          "rounded-[2px] border-prussian-deep bg-prussian text-sheet shadow-[0_2px_0_0_var(--prussian-deep)] hover:-translate-y-[1px] hover:shadow-[0_3px_0_0_var(--prussian-deep)] active:translate-y-[1px] active:shadow-none",
        graphite:
          "rounded-[2px] border-graphite bg-graphite text-sheet shadow-[0_2px_0_0_var(--prussian-deep)] hover:-translate-y-[1px] hover:shadow-[0_3px_0_0_var(--prussian-deep)] active:translate-y-[1px] active:shadow-none",
        ghost:
          "rounded-[2px] border-grid-firm bg-sheet text-graphite-soft hover:border-prussian hover:bg-sheet hover:text-graphite active:translate-y-[1px]",
        bare: "border-transparent bg-transparent text-graphite-soft hover:text-prussian",
      },
      size: {
        sm: "px-3 py-1.5 text-[13px] [&_svg]:h-3.5 [&_svg]:w-3.5",
        md: "px-5 py-2.5 text-sm [&_svg]:h-4 [&_svg]:w-4",
      },
    },
    defaultVariants: { tone: "prussian", size: "md" },
  },
);

function Button({
  className,
  tone,
  size,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ tone, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
