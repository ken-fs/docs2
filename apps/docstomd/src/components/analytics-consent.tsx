"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/i18n/types";

/**
 * 同意之后才加载的 Google Analytics（和 stlpal / takehomepal / game-template-next 同一套）。
 *
 * 首屏 HTML 里没有任何 Google 的东西：gtag.js 是点「允许」之后才由这里插进
 * <head> 的。没选、选了「不用」= 零第三方请求、零 cookie —— 隐私政策写的就是这个，
 * verify/site.spec.ts 也盯着。别把 Google 原版 snippet 贴回 layout，那会让
 * 所有人一进来就被统计，这个条就成了摆设。
 *
 * 选择存 localStorage（只存这一个键）。页脚的「统计设置」按钮发
 * OPEN_EVENT 把条叫回来；同意过又改成不用，就关掉 gtag 并删掉 _ga cookie。
 */

const GA_ID = "G-06NR7QZ94Q";
const KEY = "analytics-consent";
const OPEN_EVENT = "analytics-consent:open";

type Choice = "accepted" | "declined";
type Copy = Dictionary["chrome"]["consent"];

export function AnalyticsConsent({ copy, privacyHref }: { copy: Copy; privacyHref: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const reopen = () => setShow(true);
    window.addEventListener(OPEN_EVENT, reopen);

    let stored: string | null = null;
    try {
      stored = localStorage.getItem(KEY);
    } catch {
      // 隐私模式读不了：当作没选，也就是不统计
    }
    if (stored === "accepted") loadAnalytics();
    // 晚一点再出来：不跟首屏抢，一进来就走的人也不会被打扰
    const t = stored ? undefined : setTimeout(() => setShow(true), 1200);
    return () => {
      window.removeEventListener(OPEN_EVENT, reopen);
      if (t) clearTimeout(t);
    };
  }, []);

  function decide(choice: Choice) {
    try {
      localStorage.setItem(KEY, choice);
    } catch {
      /* 存不下也照样对这一页生效 */
    }
    setShow(false);
    if (choice === "accepted") loadAnalytics();
    else stopAnalytics();
  }

  if (!show) return null;

  return (
    <div
      role="region"
      aria-label={copy.settings}
      className="fixed inset-x-3 bottom-3 z-50 border border-ink bg-paper p-4 shadow-[4px_4px_0_0_var(--pine-deep)] sm:inset-x-auto sm:right-5 sm:bottom-5 sm:max-w-sm"
    >
      <p className="text-[13px] leading-relaxed text-ink-soft">
        {copy.text}{" "}
        <Link
          href={privacyHref}
          className="text-pine underline decoration-pine/40 underline-offset-2 hover:decoration-pine"
        >
          {copy.privacy}
        </Link>
      </p>
      <div className="mt-3 flex items-center justify-end gap-2">
        <Button tone="bare" size="sm" onClick={() => decide("declined")}>
          {copy.decline}
        </Button>
        <Button tone="pine" size="sm" onClick={() => decide("accepted")}>
          {copy.accept}
        </Button>
      </div>
    </div>
  );
}

/** 页脚那个「统计设置」：把同意条叫回来改主意。 */
export function AnalyticsSettingsButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
      className="text-[12px] text-ink-soft transition-colors duration-150 hover:text-pine focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine"
    >
      {label}
    </button>
  );
}

type GaWindow = {
  __gaLoaded?: boolean;
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  [k: `ga-disable-${string}`]: boolean;
};

/** 插一次 gtag.js；重复调用什么也不做。 */
function loadAnalytics() {
  const w = window as unknown as GaWindow;
  w[`ga-disable-${GA_ID}`] = false;
  if (w.__gaLoaded) return;
  w.__gaLoaded = true;
  w.dataLayer = w.dataLayer || [];
  // 必须 push `arguments` 对象，跟 Google 原版 snippet 一样。gtag.js 不认普通数组：
  // 写成 push(args) 会照常加载、一条数据都不发（2026-10-01 在 6 个站上踩过）。
  w.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer!.push(arguments);
  };
  w.gtag("js", new Date());
  w.gtag("config", GA_ID, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
}

/** 同意过又改成不用：这一页上的 gtag 停发，已经设下的 _ga cookie 删掉。 */
function stopAnalytics() {
  const w = window as unknown as GaWindow;
  w[`ga-disable-${GA_ID}`] = true;
  const host = location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  for (const c of document.cookie.split(";")) {
    const name = c.split("=")[0].trim();
    if (!name.startsWith("_ga")) continue;
    for (const d of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ""}`;
    }
  }
}
