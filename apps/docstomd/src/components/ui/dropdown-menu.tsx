"use client";

import { Menu as MenuPrimitive } from "@base-ui/react/menu";

import { Icon } from "@/components/icon";
import { cn } from "@/lib/utils";

/**
 * shadcn 的 DropdownMenu，重写成一张贴在纸上的小标签：
 * 直角、硬边偏移阴影、墨色描边，展开是「盖章」而不是淡入缩放。
 * 只留语言切换用得到的那几个零件，子菜单和 destructive 变体删掉了 —— 用不上就别留。
 */
function DropdownMenu({ ...props }: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuTrigger({ ...props }: MenuPrimitive.Trigger.Props) {
  return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}

function DropdownMenuContent({
  align = "end",
  side = "bottom",
  sideOffset = 6,
  className,
  ...props
}: MenuPrimitive.Popup.Props &
  Pick<MenuPrimitive.Positioner.Props, "align" | "side" | "sideOffset">) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        className="isolate z-50 outline-none"
        align={align}
        side={side}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          className={cn(
            "max-h-(--available-height) min-w-44 origin-(--transform-origin) overflow-y-auto",
            "border border-ink bg-paper p-1 shadow-[4px_4px_0_0_var(--ink)]",
            "transition-[opacity,transform] duration-150 ease-spring outline-none",
            "data-starting-style:scale-[0.96] data-starting-style:opacity-0",
            "data-ending-style:scale-[0.98] data-ending-style:opacity-0",
            className,
          )}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}

function DropdownMenuGroupLabel({
  className,
  ...props
}: MenuPrimitive.GroupLabel.Props) {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="dropdown-menu-label"
      className={cn(
        "px-2.5 pt-1.5 pb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuItem({
  className,
  ...props
}: MenuPrimitive.Item.Props) {
  return (
    <MenuPrimitive.Item
      data-slot="dropdown-menu-item"
      className={cn(
        "relative flex cursor-pointer items-center gap-2 px-2.5 py-1.5 text-[13px] text-ink-soft select-none outline-none",
        "transition-colors duration-100 data-highlighted:bg-ink data-highlighted:text-paper",
        "data-disabled:pointer-events-none data-disabled:opacity-45",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuRadioGroup({ ...props }: MenuPrimitive.RadioGroup.Props) {
  return (
    <MenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  );
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: MenuPrimitive.RadioItem.Props) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(
        "relative flex cursor-pointer items-center gap-2 py-1.5 pr-2.5 pl-7 text-[13px] text-ink-soft select-none outline-none",
        "transition-colors duration-100 data-highlighted:bg-ink data-highlighted:text-paper",
        "data-checked:text-ink data-checked:font-medium",
        "data-disabled:pointer-events-none data-disabled:opacity-45",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex items-center">
        <MenuPrimitive.RadioItemIndicator>
          <Icon icon="ph:check-bold" className="h-3 w-3 text-pine" />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: MenuPrimitive.Separator.Props) {
  return (
    <MenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-rule", className)}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroupLabel,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
};
