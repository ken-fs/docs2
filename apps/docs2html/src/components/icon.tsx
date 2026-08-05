"use client";

import { Icon as OfflineIcon, addCollection } from "@iconify/react/offline";
import { phSubset } from "./icon-data";

/**
 * 图标数据打进包里，不走 Iconify CDN。
 * 理由：这站主打「文件不出你电脑」，运行时再去外部拉图标就自相矛盾了。
 * 顺带一提，断网也能用。
 *
 * 只收录实际用到的那二十个（icon-data.ts 由 pnpm icons 生成）。整个 ph 集合
 * 有 9161 个图标、约 4.5MB，addCollection 整包会把它们全带进首屏。
 */
addCollection(phSubset);

export const Icon = OfflineIcon;
