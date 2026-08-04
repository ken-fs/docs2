"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * shadcn 的 Button，但换成凸版印刷那一套：硬边偏移阴影、直角、按下真的压进纸里。
 * 保留 Base UI 的 Button 基元（disabled 焦点处理、render 组合），
 * 丢掉默认的圆角 + 柔和阴影 + primary/secondary 配色。
 */
const buttonVariants = cva(
  [
    "relative inline-flex shrink-0 items-center justify-center gap-2 border font-medium tracking-tight whitespace-nowrap select-none",
    "transition-[transform,box-shadow,background-color,color] duration-150 ease-snap",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust",
    "disabled:pointer-events-none disabled:opacity-45 data-disabled:pointer-events-none data-disabled:opacity-45",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      tone: {
        ink: "border-ink bg-ink text-paper shadow-[3px_3px_0_0_var(--rust-deep)] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[5px_5px_0_0_var(--rust-deep)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0_0_var(--rust-deep)]",
        rust: "border-rust-deep bg-rust text-paper shadow-[3px_3px_0_0_var(--ink)] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[5px_5px_0_0_var(--ink)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0_0_var(--ink)]",
        ghost:
          "border-rule-firm bg-paper/70 text-ink-soft hover:border-ink hover:bg-paper hover:text-ink active:translate-x-[1px] active:translate-y-[1px]",
        bare: "border-transparent bg-transparent text-ink-soft hover:text-rust",
      },
      size: {
        sm: "px-3 py-1.5 text-[13px] [&_svg]:h-3.5 [&_svg]:w-3.5",
        md: "px-5 py-2.5 text-sm [&_svg]:h-4 [&_svg]:w-4",
      },
    },
    defaultVariants: { tone: "ink", size: "md" },
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
