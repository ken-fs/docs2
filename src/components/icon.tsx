"use client";

import { Icon as OfflineIcon, addCollection } from "@iconify/react/offline";
import { icons } from "@iconify-json/ph";

/**
 * 图标数据打进包里，不走 Iconify CDN。
 * 理由：这站主打「文件不出你电脑」，运行时再去外部拉图标就自相矛盾了。
 * 顺带一提，断网也能用。
 */
addCollection(icons);

export const Icon = OfflineIcon;
