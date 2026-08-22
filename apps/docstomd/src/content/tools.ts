import type { GuideKey, LegalKey, PageKey } from "@/i18n/types";
import {
  LOCALES,
  LOCALE_PREFIX,
  localeOfPrefix,
  type Locale,
} from "@/i18n/locales";

/**
 * slug 一律留英文。它们本身就是关键词，"docx to markdown" 这种查询
 * 在西语葡语圈也是照英文打的 —— 翻译 slug 只会把流量弄丢。
 * 语言靠路径前缀区分：/es/docx-to-markdown/，英文不带前缀。
 */
export const PAGE_KEYS: PageKey[] = [
  "home",
  "docx-to-markdown",
  "word-to-markdown",
  "pdf-to-markdown",
  "excel-to-markdown",
  "csv-to-markdown",
  "html-to-markdown",
  "google-docs-to-markdown",
  "pptx-to-markdown",
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
 * 教程文章。前六篇一篇配一个转换引擎；外加一篇讲所有转换器共通的
 * 「文件不上传」，配挂在流量最大的 word-to-markdown 上。列表页照这个顺序排。
 *
 * 六篇而不是七篇（工具页有七个）：docx-to-markdown 和 word-to-markdown 走的
 * 是同一个转换器，各写一篇就是两篇内容重合的文章抢同一批查询。Word 那篇
 * 两页都指得过来。
 *
 * 它们挂在 /guides/ 下面而不是根目录：跟工具页 slug 抢名字空间是一件麻烦事
 * （"word-to-markdown" 和 "word-to-markdown-keep-formatting" 摆在同一层，
 * 导航里分不清哪个是工具哪个是文章），而多一层目录也把「这是读的，那是用的」
 * 说清楚了。不叫 /blog/ —— 那个词暗示时间序和更新频率，这些教程放着不动
 * 会看着像废弃的博客，而它们本来就不需要更新。
 */
export const GUIDE_KEYS: GuideKey[] = [
  "word-to-markdown-keep-formatting",
  "pdf-to-markdown-layout",
  "google-docs-to-markdown-paste",
  "html-to-markdown-clean",
  "csv-to-markdown-tables",
  "excel-to-markdown-formulas",
  // 放最后，它是「另外那篇」—— 不配单个引擎，讲全站共通的隐私承诺。
  "word-to-markdown-without-uploading",
];

/** /guides/ 这一段。改它等于改全部教程的 URL，所以只在这里写一次。 */
export const GUIDES_SEGMENT = "guides";

/**
 * markdown 预览页那一段：/markdown-preview/。
 *
 * 单独一个常量而不是塞进 PAGE_KEYS：预览页不是「文件 → markdown」的转换器，
 * 它没有 TOOL_INPUT（engine/accept/paste），把它列进 PAGE_KEYS 会让
 * pickerAccept / pagesForExtension 这些按「转换器」遍历 TOOL_KEYS 的逻辑
 * 把预览页也算进去。所以它走自己的 Route kind，slug 只在这里写一次。
 */
export const PREVIEW_SEGMENT = "markdown-preview";

/**
 * 一条路径指向工具页、正式页面还是教程。
 *
 * 做成可辨识联合而不是让 key 变成 PageKey | LegalKey：几类页面的字典结构
 * 不一样（工具页有转换器和 FAQ，正式页面是纯正文，教程有分步骤和配套工具），
 * 编译器得能替我们挡住拿 LegalKey 去查 dict.pages 这种错。
 */
export type Route =
  | { kind: "tool"; key: PageKey }
  | { kind: "legal"; key: LegalKey }
  | { kind: "guide"; key: GuideKey }
  /** /guides/ 本身：教程列表页。没有 key，它不属于任何一篇。 */
  | { kind: "guideIndex" }
  /** /markdown-preview/：markdown 预览页。单页，没有 key。 */
  | { kind: "preview" };

const LEGAL_SET = new Set<string>(LEGAL_KEYS);
const GUIDE_SET = new Set<string>(GUIDE_KEYS);

/** slug 反查成路由。认不出返回 undefined。 */
function routeOfSlug(slug: string): Route | undefined {
  if (slug === GUIDES_SEGMENT) return { kind: "guideIndex" };
  if (slug === PREVIEW_SEGMENT) return { kind: "preview" };
  if (LEGAL_SET.has(slug)) return { kind: "legal", key: slug as LegalKey };
  const key = PAGE_KEYS.find((k) => slugOf(k) === slug);
  return key ? { kind: "tool", key } : undefined;
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
 * 每个页面收什么输入。
 *
 * 页面之间的差别不只是文案 —— PDF 收文件、CSV 收文件或粘贴的文本、HTML 收
 * 粘贴的源码。这张表把差异集中在一处，ToolShell 照着它决定渲染哪套 UI，
 * 而不是让每个页面各写一遍。
 *
 *   engine  走哪个转换器
 *   accept  <input type=file> 的 accept，空串表示这页不收文件
 *   paste   有没有粘贴/输入框，以及占位文案用哪种
 */
export type ToolInput = {
  engine: "docx" | "pdf" | "html" | "csv" | "xlsx" | "office";
  accept: string;
  paste: "none" | "html" | "csv";
};

const DOCX_INPUT: ToolInput = {
  engine: "docx",
  accept:
    ".docx,.doc,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword",
  // Word 网页版和 Google Docs 复制出来的富文本走整站的 paste 事件，
  // 不需要输入框 —— 那条路在 Converter 里接的是 clipboard 的 text/html
  paste: "none",
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

/**
 * 交给系统文件选择器的过滤器 —— 全站任何一页能处理的格式，不只是本页的。
 *
 * 为什么不能直接用 `input.accept`：那是「这一页转什么」，而选择器问的是
 * 「这个站能拿这个文件做什么」，两件事不一样。用前者当过滤器，.xlsx 在 CSV 页
 * 是灰的、.docx 在 HTML 页是灰的 —— 灰掉的文件进不了 run()，那套「这一页不收，
 * 去那一页」的路由一句都不会触发。用户看到的只是文件点不动。
 *
 * 这个坑在 docs2html 上踩了两次（先是 Word，再是 Excel）。第一次的修法是在
 * 拖放区上方加一行指路文案，不够 —— 人是先点按钮再读字的。真正的修法是让
 * 选择器别撒谎：能选，选完了再解释这个文件该去哪一页。
 *
 * 仍然保留 MIME 类型：Finder 里有些文件没有扩展名，靠 MIME 才认得出。
 * 而 `input.accept` 继续是本页的真实边界，`acceptSummary` 和 run() 里的
 * 扩展名预检都还用它 —— 放宽的只是选择器。
 */
export function pickerAccept(): string {
  const mimes = TOOL_KEYS.flatMap((k) =>
    TOOL_INPUT[k].accept
      .split(",")
      .map((x) => x.trim())
      .filter((x) => x.includes("/")),
  );
  return [...ELSEWHERE_EXTENSIONS, ...mimes].filter(
    (v, i, a) => a.indexOf(v) === i,
  ).join(",");
}

/**
 * 本页不收、但站内有地方收的格式，按目标页归并成「.csv .tsv → CSV → Markdown」
 * 这样的指路条目。
 *
 * 为什么必须在拖放区就说：`accept` 会把这些文件在系统选择器里变灰，用户点不动
 * 它们，而灰掉的文件永远进不了 run()，那套「本站有专门页 → 谁都不收」的报错
 * 一句也不会出现。走按钮的人得到的是彻底的静默 —— 实际发生过：有人在
 * Markdown 页打开选择器，Word 文档是灰的，没有任何解释，结论是「这站坏了」。
 * 拖进来的人反而有指路，两条入口的待遇正好反了。
 *
 * 按目标页归并而不是按扩展名逐条列：.docx 和 .doc 去的是同一页，列两条等于
 * 让人读两遍同一个结论。
 */
export function elsewhereHints(
  accept: string,
  elsewhere: Record<string, { label: string; href: string }[]>,
): { label: string; href: string; extensions: string[] }[] {
  const mine = acceptExtensions(accept);
  const byHref = new Map<string, { label: string; href: string; extensions: string[] }>();
  for (const [ext, targets] of Object.entries(elsewhere)) {
    // 本页自己收的扩展名不算「别处」
    if (mine.includes(ext)) continue;
    // 一个扩展名可能有几个都对的去处（见 pagesForExtension），每个都要在
    // 这行字里露出来，否则用户看到的选项少于实际存在的
    for (const target of targets) {
      const hit = byHref.get(target.href);
      if (hit) hit.extensions.push(ext);
      else byHref.set(target.href, { ...target, extensions: [ext] });
    }
  }
  return [...byHref.values()];
}

export const TOOL_INPUT: Record<PageKey, ToolInput> = {
  home: DOCX_INPUT,
  "docx-to-markdown": DOCX_INPUT,
  "word-to-markdown": DOCX_INPUT,
  "google-docs-to-markdown": DOCX_INPUT,
  "pdf-to-markdown": { engine: "pdf", accept: ".pdf,application/pdf", paste: "none" },
  "html-to-markdown": {
    engine: "html",
    accept: ".html,.htm,text/html",
    paste: "html",
  },
  "csv-to-markdown": {
    engine: "csv",
    accept: ".csv,.tsv,.txt,text/csv,text/tab-separated-values",
    paste: "csv",
  },
  "excel-to-markdown": {
    engine: "xlsx",
    accept:
      ".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    paste: "none",
  },
  "pptx-to-markdown": {
    engine: "office",
    // 演示文稿家族。.pptx 排最前（最认得），.ppt 次之，.odp 是 LibreOffice
    // 的对应格式。三个都由 anydoc 的 WASM 转，同一块 blob。
    accept:
      ".pptx,.ppt,.odp,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.ms-powerpoint,application/vnd.oasis.opendocument.presentation",
    paste: "none",
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
/**
 * 一个扩展名该去哪一页。
 *
 * 派生自 TOOL_INPUT，不是另抄一份清单 —— 加工具页时自动就有，不会漏。
 * 同一个扩展名可能有多页收（.docx 有四页），取第一个匹配的：PAGE_KEYS 的
 * 声明顺序就是优先级，最专门的那页排前面。
 *
 * 跳过 home —— 它跟 docx-to-markdown 是同一个转换器，但报错里说「去首页」
 * 没有信息量，用户要的是那个专门页的名字。
 *
 * 用在「拖错文件」的报错里：以前拖一个 PDF 进 CSV 页，转换器会把二进制
 * 当文本硬解，输出一张全是乱码的表格然后标成「成功」—— 用户拿到的是看着
 * 像成功的垃圾。docx / pdf / xlsx 三个引擎会自己嗅文件头拒掉，但 csv 和
 * html 走的是纯文本，什么都吃得下，那两页正是漏的地方。
 */
export function pageForExtension(ext: string): PageKey | undefined {
  return pagesForExtension(ext)[0];
}

/**
 * 一个扩展名该去哪些页 —— 按引擎去重，PAGE_KEYS 的顺序就是优先级。
 *
 * 判据是引擎，不是页数。这个站上 `.docx` 有三页收（docx-to-markdown、
 * word-to-markdown、google-docs-to-markdown），但那三页是**同一个引擎**的
 * 三个入口，转出来的东西一字不差 —— 列三个链接就是拿三个同义词烦用户，
 * 所以按引擎去重之后只剩最专门的那一页。今天这个站每个扩展名都只对应
 * 一个引擎，所以它返回的永远是一个元素，跟旧的 `pageForExtension` 等价。
 *
 * 那为什么还要返回数组：docs2html 上 `.txt` 有三页收，而且是**三个不同的
 * 引擎**（Markdown / 纯文本 / CSV）—— 一个 .txt 里装的可能是这三样中的任何
 * 一样，光看扩展名分不出来，只给一个答案有三分之二的概率指错。那边已经因此
 * 出过事。这个站现在没有这种扩展名，但加页面的时候很容易造出来（比如再开一个
 * 收 .txt 的纯文本页），而那时候会出问题的地方不是这里，是报错文案 ——
 * 所以两个站的这套机制保持一样，别让下一个人重踩一遍。
 */
export function pagesForExtension(ext: string): PageKey[] {
  const want = ext.toLowerCase();
  const seen = new Set<ToolInput["engine"]>();
  return TOOL_KEYS.filter((k) => {
    if (!acceptExtensions(TOOL_INPUT[k].accept).includes(want)) return false;
    const { engine } = TOOL_INPUT[k];
    if (seen.has(engine)) return false;
    seen.add(engine);
    return true;
  });
}

/**
 * 全站任何一页收的扩展名，去重。ToolShell 拿它摊成「扩展名 → 去哪页」的
 * 表传给 Converter —— 传表而不传函数，因为 ToolShell 是 Server Component，
 * 函数过不了那道边界。
 */
export const ELSEWHERE_EXTENSIONS: string[] = [
  ...new Set(TOOL_KEYS.flatMap((k) => acceptExtensions(TOOL_INPUT[k].accept))),
];

/** 文件名里的扩展名，含点，小写。没有扩展名返回空串。 */
export function extensionOf(name: string): string {
  const i = name.lastIndexOf(".");
  return i > 0 ? name.slice(i).toLowerCase() : "";
}

export const ALL_KEYS: AnyKey[] = [...PAGE_KEYS, ...LEGAL_KEYS];

/** home 的 slug 是空串，其余的 slug 就是 key 本身。 */
export function slugOf(key: AnyKey) {
  return key === "home" ? "" : key;
}

export function keyOfSlug(slug: string): PageKey | undefined {
  return PAGE_KEYS.find((k) => slugOf(k) === slug);
}

/**
 * 站内路径。全站 trailingSlash，所以一律以 / 结尾 —— 少一次 308 跳转，
 * canonical 和 hreflang 也才对得上真实地址。
 *
 *   pathOf("en", "home")              → /
 *   pathOf("en", "word-to-markdown")  → /word-to-markdown/
 *   pathOf("ja", "word-to-markdown")  → /ja/word-to-markdown/
 *   pathOf("ja", "privacy")           → /ja/privacy/
 */
export function pathOf(locale: Locale, key: AnyKey) {
  const parts = [LOCALE_PREFIX[locale], slugOf(key)].filter(Boolean);
  return `/${parts.map((p) => `${p}/`).join("")}`;
}

/**
 * 教程的路径。
 *
 *   guidePath("en")                              → /guides/
 *   guidePath("en", "pdf-to-markdown-layout")    → /guides/pdf-to-markdown-layout/
 *   guidePath("ja", "pdf-to-markdown-layout")    → /ja/guides/pdf-to-markdown-layout/
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
 * 预览页的路径。单段固定 slug，跟 guidePath 一样以 / 结尾：
 *
 *   previewPath("en")  → /markdown-preview/
 *   previewPath("ja")  → /ja/markdown-preview/
 *
 * 没并进 pathOf：那个收的是 AnyKey（等于某个页面 key），而预览页没有 key，
 * 塞进去就得把参数放宽成联合类型、每个调用点跟着判一次。
 */
export function previewPath(locale: Locale) {
  const parts = [LOCALE_PREFIX[locale], PREVIEW_SEGMENT].filter(Boolean);
  return `/${parts.map((p) => `${p}/`).join("")}`;
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

  // 带语言前缀：/ja/ 或 /ja/word-to-markdown/ 或 /ja/guides/<slug>/
  if (prefixed) {
    if (second === undefined) return { locale: prefixed, ...home };
    if (third !== undefined) {
      const guide = guideOfSlug(second, third);
      return guide ? { locale: prefixed, ...guide } : null;
    }
    const route = routeOfSlug(second);
    return route ? { locale: prefixed, ...route } : null;
  }

  // 不带前缀就是英文：/ 或 /word-to-markdown/ 或 /guides/<slug>/
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
 * 静态导出得把每条路径都列出来：
 *   14 页（首页 + 8 工具 + 5 正式）+ 1 个教程列表 + 6 篇教程
 *   + 1 个 markdown 预览页 = 22
 *   × 6 语种 = 132 条
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
      { segments: [prefix, PREVIEW_SEGMENT].filter(Boolean) },
    ];
  });
}

export const SITE = "https://docstomd.com";

export function urlOf(locale: Locale, key: AnyKey) {
  return `${SITE}${pathOf(locale, key)}`;
}

/** hreflang 用的表：六个语种 + x-default 指向英文。 */
export function languageAlternates(key: AnyKey) {
  const map: Record<string, string> = {};
  for (const locale of LOCALES) map[locale] = pathOf(locale, key);
  map["x-default"] = pathOf("en", key);
  return map;
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

/** 预览页的绝对地址。sitemap 和 JSON-LD 用。 */
export function previewUrl(locale: Locale) {
  return `${SITE}${previewPath(locale)}`;
}

/**
 * 预览页的 hreflang 表。六语种互指 + x-default 指英文，且包含自己 ——
 * Google 要这个关系双向成立。
 */
export function previewAlternates() {
  const map: Record<string, string> = {};
  for (const locale of LOCALES) map[locale] = previewPath(locale);
  map["x-default"] = previewPath("en");
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
 * /guides/pdf-to-markdown-layout/ 切日语会落到 /ja/guides/，
 * 读者看了半篇文章换个语言就被扔回目录。
 */
export function routePath(locale: Locale, route: Route) {
  return route.kind === "guide"
    ? guidePath(locale, route.key)
    : route.kind === "guideIndex"
      ? guidePath(locale)
      : route.kind === "preview"
        ? previewPath(locale)
        : pathOf(locale, route.key);
}

export function routeAlternates(route: Route) {
  return route.kind === "guide"
    ? guideAlternates(route.key)
    : route.kind === "guideIndex"
      ? guideAlternates()
      : route.kind === "preview"
        ? previewAlternates()
        : languageAlternates(route.key);
}
