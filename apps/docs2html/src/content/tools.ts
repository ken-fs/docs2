import type { GuideKey, LegalKey, PageKey } from "@/i18n/types";
import {
  LOCALES,
  LOCALE_PREFIX,
  localeOfPrefix,
  type Locale,
} from "@/i18n/locales";

/**
 * slug 一律留英文，而且照方案 §6 的写法：markdown-to-html、docx-to-html、
 * csv-to-html-table…… 后两个带 -table 后缀不是笔误 —— 搜 "csv to html table"
 * 的人要的是一张 <table>，搜 "csv to html" 的可能想要整页，方案分开命名是对的。
 *
 * 语言靠路径前缀区分：/es/docx-to-html/，英文不带前缀。
 */
export const PAGE_KEYS: PageKey[] = [
  "home",
  "markdown-to-html",
  "docx-to-html",
  "google-docs-to-html",
  "text-to-html",
  "csv-to-html-table",
  "excel-to-html-table",
];

/** 导航里露出的 slug 页，首页不算。 */
export const TOOL_KEYS = PAGE_KEYS.filter(
  (k): k is Exclude<PageKey, "home"> => k !== "home",
);

/**
 * 正式页面。顺序就是页脚里的排列顺序：先介绍自己，再给联系方式，
 * 然后是三份法律文本。
 */
export const LEGAL_KEYS: LegalKey[] = [
  "about",
  "contact",
  "privacy",
  "terms",
  "cookies",
];

/**
 * 教程文章，一个工具页配一篇。顺序跟 TOOL_KEYS 对齐，列表页照这个顺序排。
 *
 * 它们挂在 /guides/ 下面而不是根目录：跟工具页 slug 抢名字空间是一件麻烦事
 * （"markdown-to-html" 和 "markdown-tables-to-html" 摆在同一层，导航里分不清
 * 哪个是工具哪个是文章），而多一层目录也把「这是读的，那是用的」说清楚了。
 * 不叫 /blog/ —— 那个词暗示时间序和更新频率，六篇教程放着不动会看着像
 * 废弃的博客，而它们本来就不需要更新。
 */
export const GUIDE_KEYS: GuideKey[] = [
  "markdown-tables-to-html",
  "word-to-html-keep-formatting",
  "google-docs-to-html-clean",
  "plain-text-to-html-paragraphs",
  "csv-to-html-table-large-files",
  "excel-to-html-table-formulas",
];

/** /guides/ 这一段。改它等于改全部教程的 URL，所以只在这里写一次。 */
export const GUIDES_SEGMENT = "guides";

/**
 * 一条路径指向工具页还是正式页面。
 *
 * 做成可辨识联合而不是让 key 变成 PageKey | LegalKey：两类页面的字典结构
 * 不一样（工具页有转换器和 FAQ，正式页面是纯正文），编译器得能替我们
 * 挡住拿 LegalKey 去查 dict.pages 这种错。
 */
export type Route =
  | { kind: "tool"; key: PageKey }
  | { kind: "legal"; key: LegalKey }
  | { kind: "guide"; key: GuideKey }
  /** /guides/ 本身：教程列表页。没有 key，它不属于任何一篇。 */
  | { kind: "guideIndex" };

const LEGAL_SET = new Set<string>(LEGAL_KEYS);

/** slug 反查成路由。认不出返回 undefined。 */
function routeOfSlug(slug: string): Route | undefined {
  if (LEGAL_SET.has(slug)) return { kind: "legal", key: slug as LegalKey };
  if (slug === GUIDES_SEGMENT) return { kind: "guideIndex" };
  const key = PAGE_KEYS.find((k) => slugOf(k) === slug);
  return key ? { kind: "tool", key } : undefined;
}

const GUIDE_SET = new Set<string>(GUIDE_KEYS);

/**
 * 每个页面收什么输入。
 *
 * 页面之间的差别不只是文案 —— Markdown 页收文本或 .md 文件，DOCX 页只收文件，
 * Google Docs 页靠富文本粘贴，Excel 页要先读工作表再让用户挑。这张表把差异
 * 集中在一处，ToolShell 照着它决定渲染哪套 UI。
 *
 *   engine  走哪个转换器
 *   accept  <input type=file> 的 accept，空串表示这页不收文件
 *   paste   有没有粘贴/输入框，以及占位文案用哪种
 *   rich    要不要监听整站的 paste 事件读剪贴板里的 text/html
 */
export type ToolInput = {
  engine: "markdown" | "docx" | "richhtml" | "text" | "csv" | "xlsx";
  accept: string;
  paste: "none" | "markdown" | "html" | "text" | "csv";
  rich: boolean;
};

/**
 * 从 accept 里抠出扩展名，给拖拽区的说明文案用（".docx,.doc,application/…"
 * → ".docx .doc"）。
 *
 * 为什么派生而不另写文案：格式列表一旦手写，就会跟 accept 走散 —— 文案说
 * 收 PDF 而选择器其实不收，比不写更糟。而且这句话要出现在六种语言里，
 * 手写就是六份要同步维护的清单。扩展名本身不用翻译。
 *
 * 起因是有人看着首页那句「Drop a file here / 25 MB per file」问「只能传
 * txt 吗，不能 pdf、docx 吗」。当时那行字只说了大小和隐私，没说本页收什么，
 * 唯一的知情途径是点开系统文件选择器看过滤器 —— 那就太晚了。
 */
export function acceptExtensions(accept: string): string[] {
  return accept
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.startsWith("."));
}

/**
 * 同上，但截到三个 —— 这行字是给人读的，不是 accept 的完整回显。Markdown 页
 * 收四个扩展名，全列出来一行太挤。多出来的用「+N」收掉，选择器仍然全收。
 *
 * 所以 accept 里扩展名的先后是有语义的：按用户熟悉度排，别名放最后。
 * 加扩展名时别往前插。第一版把 .mdown 排在 .txt 前面，结果 Markdown 页显示
 * 「.md .markdown .mdown +1」，正好把最该露出来的 .txt 藏进了那个 +1。
 */
export function acceptSummary(accept: string): string {
  const all = acceptExtensions(accept);
  return all.length > 3
    ? `${all.slice(0, 3).join(" ")} +${all.length - 3}`
    : all.join(" ");
}

export const TOOL_INPUT: Record<PageKey, ToolInput> = {
  // 首页放 Markdown → HTML：六个里它是最常被搜的，也是唯一一个不需要文件、
  // 打开就能贴进去试的 —— 首屏能立刻用比先介绍自己有说服力
  home: {
    engine: "markdown",
    accept: ".md,.markdown,.txt,.mdown,text/markdown,text/plain",
    paste: "markdown",
    rich: false,
  },
  "markdown-to-html": {
    engine: "markdown",
    accept: ".md,.markdown,.txt,.mdown,text/markdown,text/plain",
    paste: "markdown",
    rich: false,
  },
  "docx-to-html": {
    engine: "docx",
    accept:
      ".docx,.doc,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword",
    paste: "none",
    rich: false,
  },
  // 方案 §6.3：不用 Google API、不需要登录，靠复制粘贴。所以这页既接
  // 剪贴板里的富文本（rich），也接直接贴进来的 HTML 源码
  "google-docs-to-html": {
    engine: "richhtml",
    accept: ".html,.htm,text/html",
    paste: "html",
    rich: true,
  },
  "text-to-html": {
    engine: "text",
    accept: ".txt,.text,text/plain",
    paste: "text",
    rich: false,
  },
  "csv-to-html-table": {
    engine: "csv",
    accept: ".csv,.tsv,.txt,text/csv,text/tab-separated-values",
    paste: "csv",
    rich: false,
  },
  "excel-to-html-table": {
    engine: "xlsx",
    accept:
      ".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    paste: "none",
    rich: false,
  },
};

/**
 * 任何一个静态页面的 key。
 *
 * 两个联合的字面量互不相交，而正式页面的 slug 就等于它的 key，所以算路径、
 * canonical、hreflang 这些事对两类页面是同一套逻辑，不必分开写。
 */
export type AnyKey = PageKey | LegalKey;

/** 全站页面，页脚和 sitemap 按这个顺序列。 */
export const ALL_KEYS: AnyKey[] = [...PAGE_KEYS, ...LEGAL_KEYS];

/** home 的 slug 是空串，其余的 slug 就是 key 本身。 */
export function slugOf(key: AnyKey) {
  return key === "home" ? "" : key;
}

/**
 * 站内路径。全站 trailingSlash，所以一律以 / 结尾 —— 少一次 308 跳转，
 * canonical 和 hreflang 也才对得上真实地址。
 *
 *   pathOf("en", "home")               → /
 *   pathOf("en", "markdown-to-html")   → /markdown-to-html/
 *   pathOf("ja", "markdown-to-html")   → /ja/markdown-to-html/
 *   pathOf("ja", "privacy")            → /ja/privacy/
 */
export function pathOf(locale: Locale, key: AnyKey) {
  const parts = [LOCALE_PREFIX[locale], slugOf(key)].filter(Boolean);
  return `/${parts.map((p) => `${p}/`).join("")}`;
}

/**
 * 教程的路径。
 *
 *   guidePath("en")                          → /guides/
 *   guidePath("en", "markdown-tables-to-html") → /guides/markdown-tables-to-html/
 *   guidePath("ja", "markdown-tables-to-html") → /ja/guides/markdown-tables-to-html/
 *
 * 没有并进 pathOf：那个函数收的是 AnyKey，而教程多一段路径。把两者塞进
 * 一个函数就得让参数变成联合类型，每个调用点都要跟着判一次 kind ——
 * 全站几十处调 pathOf 的地方并不关心教程。
 */
export function guidePath(locale: Locale, key?: GuideKey) {
  const parts = [LOCALE_PREFIX[locale], GUIDES_SEGMENT, key].filter(Boolean);
  return `/${parts.map((p) => `${p}/`).join("")}`;
}

/**
 * 一个扩展名该去哪一页。
 *
 * 派生自 TOOL_INPUT，不是另抄一份清单 —— 加工具页时自动就有，不会漏。
 * 同一个扩展名可能有多页收（.txt 有三页），取第一个匹配的：PAGE_KEYS 的
 * 声明顺序就是优先级，最专门的那页排前面。
 *
 * 跳过 home —— 它跟 markdown-to-html 是同一个转换器，但报错里说「去首页」
 * 没有信息量，用户要的是那个专门页的名字。
 *
 * 用在「拖错文件」的报错里：以前拖一个 PDF 进 Markdown 页，转换器会把
 * 二进制当文本转成 <p>%PDF-1.7<br>… 然后显示成功，还生成 report.pdf.html
 * 让人下载 —— 用户拿到的是看着像成功的垃圾。现在先按扩展名挡掉，并且直接
 * 说去哪一页。
 */
export function pageForExtension(ext: string): PageKey | undefined {
  const want = ext.toLowerCase();
  return TOOL_KEYS.find((k) =>
    acceptExtensions(TOOL_INPUT[k].accept).includes(want),
  );
}

/**
 * 全站任何一页收的扩展名，去重。ToolShell 拿它摊成「扩展名 → 去哪页」的
 * 表传给 Converter —— 传表而不传函数，因为 ToolShell 是 Server Component，
 * 函数过不了那道边界。
 */
/**
 * 兄弟站 docstomd 收、这边一页都不收的扩展名。
 *
 * 为什么要手写这一份（全站唯一一处手写的格式清单）：这是另一个站的能力，
 * 这个仓库里查不到 —— docstomd 的 TOOL_INPUT 不在本包的依赖里。
 * 改 docstomd 的工具页时要顺手改这儿。
 *
 * 为什么不能"认不出就说去 docstomd"：那是撒谎。拖一个 .zip 进来，
 * 「DocsToMD 收」是假的，用户点过去发现也不收，白跑一趟 ——
 * 比直接说「不收这个格式」糟。所以只对确实收的那几个指路。
 */
export const SIBLING_EXTENSIONS = [
  ".docx",
  ".doc",
  ".pdf",
  ".html",
  ".htm",
  ".csv",
  ".tsv",
  ".txt",
  ".xlsx",
];

export const ELSEWHERE_EXTENSIONS: string[] = [
  ...new Set(TOOL_KEYS.flatMap((k) => acceptExtensions(TOOL_INPUT[k].accept))),
];

/** 文件名里的扩展名，含点，小写。没有扩展名返回空串。 */
export function extensionOf(name: string): string {
  const i = name.lastIndexOf(".");
  return i > 0 ? name.slice(i).toLowerCase() : "";
}

/**
 * 把 catch-all 的 segments 解析回语种 + 页面。认不出来返回 null，由页面
 * notFound() —— 别把打错的路径兜成英文首页，软 404 比真 404 更伤 SEO。
 */
export function parseSegments(
  segments: string[] | undefined,
): (Route & { locale: Locale }) | null {
  const parts = segments ?? [];
  // 最长的合法路径是 /ja/guides/<slug>/ —— 三段。再长的一律 null，
  // 由页面 notFound()，别兜成首页（软 404 比真 404 更伤 SEO）。
  if (parts.length > 3) return null;

  const [first, second, third] = parts;
  const prefixed = first === undefined ? undefined : localeOfPrefix(first);
  const home = { kind: "tool", key: "home" } as const;

  // 带语言前缀：/ja/ 或 /ja/docx-to-html/ 或 /ja/guides/<slug>/
  if (prefixed) {
    if (second === undefined) return { locale: prefixed, ...home };
    if (third !== undefined) {
      const guide = guideOfSlug(second, third);
      return guide ? { locale: prefixed, ...guide } : null;
    }
    const route = routeOfSlug(second);
    return route ? { locale: prefixed, ...route } : null;
  }

  // 不带前缀就是英文：/ 或 /docx-to-html/ 或 /guides/<slug>/
  if (third !== undefined) return null;
  if (first === undefined) return { locale: "en", ...home };
  if (second !== undefined) {
    const guide = guideOfSlug(first, second);
    return guide ? { locale: "en", ...guide } : null;
  }
  const route = routeOfSlug(first);
  return route ? { locale: "en", ...route } : null;
}

/**
 * 两段路径是不是「guides/<某篇>」。不是就返回 undefined，让调用方 404 ——
 * /guides/ 下面认不出的 slug 不能兜到列表页，那样每个打错的地址都会变成
 * 一个内容重复的软 404。
 */
function guideOfSlug(a: string, b: string): Route | undefined {
  if (a !== GUIDES_SEGMENT) return undefined;
  return GUIDE_SET.has(b) ? { kind: "guide", key: b as GuideKey } : undefined;
}

/**
 * 静态导出得把每条路径都列出来：
 *   12 页（首页 + 6 工具 + 5 正式）+ 1 个教程列表 + 6 篇教程 = 19
 *   × 6 语种 = 114 条
 */
export function allSegments(): { segments: string[] }[] {
  return LOCALES.flatMap((locale) => {
    const prefix = LOCALE_PREFIX[locale];
    return [
      ...ALL_KEYS.map((key) => ({
        segments: [prefix, slugOf(key)].filter(Boolean),
      })),
      { segments: [prefix, GUIDES_SEGMENT].filter(Boolean) },
      ...GUIDE_KEYS.map((key) => ({
        segments: [prefix, GUIDES_SEGMENT, key].filter(Boolean),
      })),
    ];
  });
}

export const SITE = "https://docs2html.com";

export function urlOf(locale: Locale, key: AnyKey) {
  return `${SITE}${pathOf(locale, key)}`;
}

/** 教程的绝对地址。不传 key 就是列表页。sitemap 和 JSON-LD 用。 */
export function guideUrl(locale: Locale, key?: GuideKey) {
  return `${SITE}${guidePath(locale, key)}`;
}

/**
 * 教程的 hreflang 表。不传 key 就是列表页 /guides/ 自己。
 *
 * 跟 languageAlternates 分开是因为路径多一段，而那个函数收的是 AnyKey。
 * 两个都必须包含自己（自引用），Google 要求这个关系双向成立。
 */
export function guideAlternates(key?: GuideKey) {
  const map: Record<string, string> = {};
  for (const locale of LOCALES) map[locale] = guidePath(locale, key);
  map["x-default"] = guidePath("en", key);
  return map;
}

/**
 * 一条路由的路径 / hreflang 表。
 *
 * pathOf 和 guidePath 分开是对的（前者收 AnyKey，多一段路径塞不进去），
 * 但页头、语言切换器、metadata 这三处拿到的是「当前这一页」，不是一个 key ——
 * 它们不该关心这一页是不是教程。这两个函数就是那道收口：判一次 kind，
 * 后面的代码只跟 Route 打交道。
 *
 * 尤其是语言切换器：它必须知道具体是哪一篇。只传「在教程区」的话，从
 * /guides/word-to-html-keep-formatting/ 切日语会落到 /ja/guides/，
 * 读者看了半篇文章换个语言就被扔回目录。
 */
export function routePath(locale: Locale, route: Route) {
  return route.kind === "guide"
    ? guidePath(locale, route.key)
    : route.kind === "guideIndex"
      ? guidePath(locale)
      : pathOf(locale, route.key);
}

export function routeAlternates(route: Route) {
  return route.kind === "guide"
    ? guideAlternates(route.key)
    : route.kind === "guideIndex"
      ? guideAlternates()
      : languageAlternates(route.key);
}

/** hreflang 用的表：六个语种 + x-default 指向英文。 */
export function languageAlternates(key: AnyKey) {
  const map: Record<string, string> = {};
  for (const locale of LOCALES) map[locale] = pathOf(locale, key);
  map["x-default"] = pathOf("en", key);
  return map;
}
