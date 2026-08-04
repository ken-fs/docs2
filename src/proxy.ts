import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextResponse, type NextRequest } from "next/server";
import { keyOfSlug } from "@/content/tools";
import { DEFAULT_LOCALE, LOCALES, isLocale } from "@/i18n/locales";

/**
 * 语言标签的形状。裸标签只收两个字母（de / fr / ko），带子标签的放宽到三个
 * （zh-CN / pt-BR / fil-PH）—— 不然 /foo /abc 这种普通错路径也会被当成语言，
 * 白白变成软 404。真实世界会被人手敲进 URL 的语种都有两字母 ISO 639-1 码。
 */
const LANG_SHAPED = /^([a-z]{2}|[a-z]{2,3}(-[a-z0-9]{2,8})+)$/i;

/** 把一串候选语言折算成我们支持的那六个，畸形标签不至于把整站带崩。 */
function bestOf(wanted: string[]) {
  if (!wanted.length) return DEFAULT_LOCALE;
  try {
    return match(wanted, LOCALES as unknown as string[], DEFAULT_LOCALE);
  } catch {
    // Accept-Language 或 URL 里有畸形标签时 match 会抛，别让整站 500
    return DEFAULT_LOCALE;
  }
}

function pickLocale(request: NextRequest) {
  const saved = request.cookies.get("locale")?.value;
  if (saved && isLocale(saved)) return saved;

  const header = request.headers.get("accept-language");
  if (!header) return DEFAULT_LOCALE;

  return bestOf(
    new Negotiator({ headers: { "accept-language": header } }).languages(),
  );
}

/**
 * 裸路径（/ 或 /docx-to-markdown）没有语言前缀，
 * 这里按 cookie → Accept-Language → 英文的顺序挑一个，然后 307 过去。
 * Next 16 把 middleware 改叫 Proxy，文件名也变成 proxy.ts。
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return;

  const url = request.nextUrl.clone();
  const [, first, ...rest] = pathname.split("/");

  // 首段像语言但不是我们支持的（/de、/zh-CN、/fr/word-to-markdown）：
  // 折算成最近的语种并把它替换掉，而不是前缀成 /en/de 然后 404。
  if (first && LANG_SHAPED.test(first) && !keyOfSlug(first)) {
    const tail = rest.join("/");
    url.pathname = tail ? `/${bestOf([first])}/${tail}` : `/${bestOf([first])}`;
    return NextResponse.redirect(url);
  }

  const locale = pickLocale(request);
  url.pathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // 放过 _next、静态文件，以及 sitemap/robots/favicon 这类根级文件
  matcher: ["/((?!_next|.*\\..*|sitemap\\.xml|robots\\.txt).*)"],
};
