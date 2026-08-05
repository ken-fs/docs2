/**
 * shared 为真表示「这条每页都一样，而且就该一样」——「文件会上传吗」这种问题
 * 不该因为你在哪个工具页而换个说法。渲染时会带上 data-shared，
 * verify/cross-site.mjs 靠它把这些条目从原创性比对里排掉：它们的重合是设计
 * 的一部分，跟页头页脚同一性质。
 *
 * 标记写在数据上而不是让检查脚本自己认，是因为「哪几条是公用的」只有写文案的
 * 人知道；让脚本按文本相似度猜，早晚会把真的抄袭当成公用条目放过去。
 */
export type Faq = { q: string; a: string; shared?: true };

/**
 * 复数形态存成数据而不是函数 —— 字典要作为 props 传给客户端组件，
 * 函数过不了 RSC 边界。中文和日文两个槽填一样的字就行。
 * {n} 是占位符。
 */
export type Plural = { one: string; other: string };

export type PageCopy = {
  /** 导航和面包屑用的短名 */
  short: string;
  /** H1 上面那行小字，写明这页做的是哪种转换 */
  eyebrow: string;
  title: string;
  description: string;
  keywords: string[];
  /** H1 拆两半，后半截带下划线强调 */
  h1: [string, string];
  lede: string[];
  /** 便签条 */
  note: { heading: string; items: string[] };
  /** 方案 §8.7 要求的正文段落：怎么用、支持什么、限制是什么。 */
  body: {
    stepsHeading: string;
    steps: string[];
    supportedHeading: string;
    supported: string[];
    limitsHeading: string;
    limits: string[];
  };
  faq: Faq[];
};

export type PageKey =
  | "home"
  | "markdown-to-html"
  | "docx-to-html"
  | "google-docs-to-html"
  | "text-to-html"
  | "csv-to-html-table"
  | "excel-to-html-table";

/**
 * 正式页面。AdSense 审核要求 About / Contact / Privacy / Terms / Cookie 五页
 * 齐备（方案 §15），而且得是真内容，不是占位。
 *
 * 和工具页分开建模：它们没有转换器、没有 FAQ 手风琴、没有 featureList，
 * 硬塞进 PageCopy 只会让每个字段都变成可选的。
 */
export type LegalKey = "about" | "contact" | "privacy" | "terms" | "cookies";

/** 一节正文：标题 + 若干段落，需要时再挂一个列表。 */
export type LegalSection = {
  heading: string;
  body: string[];
  items?: string[];
};

export type LegalCopy = {
  /** 页脚和面包屑用的短名 */
  short: string;
  eyebrow: string;
  title: string;
  description: string;
  h1: string;
  lede: string[];
  sections: LegalSection[];
};

export type Dictionary = {
  /** <html lang> 用的值 */
  htmlLang: string;
  chrome: {
    breadcrumbHome: string;
    cleanHeading: string;
    cleanLede: string;
    cleanNote: string;
    /** 「清掉了什么」那张表的标签。全是输出 HTML 该有的样子，不是 markdown。 */
    cleans: {
      scripts: string;
      handlers: string;
      styles: string;
      classes: string;
      tracking: string;
      office: string;
      semantics: string;
      entities: string;
    };
    faqHeading: string;
    crossHeading: string;
    startOver: string;
    startOverNote: string;
    footerLeft: string;
    footerRight: string;
    langLabel: string;
    footerLegal: string;
    legalContactCue: string;
    legalUpdated: string;
    /** 站点之间互指：这站转出 HTML，另一站转出 Markdown */
    siblingHeading: string;
    siblingNote: string;
    siblingCta: string;
    /** JSON-LD 的 featureList，给结构化数据用，页面上不显示 */
    features: string[];
  };
  converter: {
    dropTitle: string;
    dropActive: string;
    dropHint: string;
    dropMeta: string;
    pick: string;
    clear: string;
    knobs: string;
    /* ── 输出形态：片段 / 整页 ── */
    mode: string;
    modeFragment: string;
    modeDocument: string;
    modeHint: string;
    pretty: string;
    prettyOn: string;
    prettyOff: string;
    responsive: string;
    responsiveOn: string;
    responsiveOff: string;
    /* ── 纯文本专属 ── */
    linkify: string;
    linkifyOn: string;
    linkifyOff: string;
    lineBreaks: string;
    lineBreaksOn: string;
    lineBreaksOff: string;
    /* ── 表格 ── */
    header: string;
    headerFirstRow: string;
    headerNone: string;
    delimiter: string;
    delimiterAuto: string;
    delimiterComma: string;
    delimiterSemicolon: string;
    delimiterTab: string;
    delimiterPipe: string;
    /* ── DOCX 的图片 ── */
    images: string;
    imageInline: string;
    imageExtract: string;
    imageStrip: string;
    /* ── XLSX 的工作表选择 ── */
    sheets: string;
    sheetsAll: string;
    sheetMeta: Plural;
    stale: string;
    queue: string;
    zip: Plural;
    chewing: string;
    failed: string;
    tooBig: string;
    readFail: string;
    /**
     * 拖错文件类型：{ext} 换成扩展名。目标页名不写在这里 —— 它由紧跟着的
     * 那个链接承担，文案里再点一次名就是同一件事说两遍。
     */
    wrongType: string;
    /** 同上，但本站不收、兄弟站收（只有 .pdf）—— 后面跟着去 docstomd 的链接。 */
    wrongTypeElsewhere: string;
    /**
     * 两个站都不收（.zip、.rtf、.epub…）。这条后面没有链接 —— 无处可去时
     * 给一个链接就是骗人跑一趟。所以它得自己把话说完整：不收，以及收什么。
     */
    wrongTypeNowhere: string;
    pastedName: string;
    typedName: string;
    /* ── 粘贴 / 输入区 ── */
    pasteHeading: string;
    pastePlaceholderMarkdown: string;
    pastePlaceholderHtml: string;
    pastePlaceholderText: string;
    pastePlaceholderCsv: string;
    pasteRun: string;
    pasteClear: string;
    /** Google Docs 那页专属：教用户怎么把内容弄进来 */
    pasteRichHint: string;
    source: string;
    preview: string;
    /** 预览是 sandbox iframe，脚本一律不跑 —— 要跟用户说清这不是 bug */
    previewNote: string;
    copy: string;
    copied: string;
    download: string;
    downloadZip: string;
    legacyWarn: string;
    styleWarn: Plural;
    emptyDoc: string;
    pickOne: string;
    chewingFirst: string;
    units: {
      words: Plural;
      headings: Plural;
      tables: Plural;
      images: Plural;
      links: Plural;
      /** 产物体积。内嵌图片会让它涨十几倍，值得摆出来。 */
      bytes: string;
    };
  };
  pages: Record<PageKey, PageCopy>;
  legal: Record<LegalKey, LegalCopy>;
};

/** 把 {n} 换成数字，按单复数挑句子。 */
export function count(n: number, forms: Plural) {
  return (n === 1 ? forms.one : forms.other).replace("{n}", String(n));
}

/** 字节数变成人看的样子。KB 起步 —— 一段 HTML 不会只有几个字节。 */
export function bytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}
