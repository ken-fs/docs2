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

/**
 * 教程文章。每个工具页配一篇，回答那种「工具页装不下」的问题 ——
 * 工具页的 FAQ 是三五句就该说完的，而「Word 的表格转过来为什么会散」
 * 要摊开讲清原因、怎么看出来、怎么绕过去。
 *
 * slug 写成搜索的人真会打的那串字，不是内部代号。带 -in-<year> 之类的
 * 时效词一律不要 —— 这些是操作步骤，不是新闻，一年后还得是对的。
 *
 * key 就是 slug（跟 LegalKey 同一套做法），因为它们一一对应，
 * 再加一层映射只会多一个能对不上的地方。
 */
export type GuideKey =
  | "markdown-tables-to-html"
  | "word-to-html-keep-formatting"
  | "google-docs-to-html-clean"
  | "plain-text-to-html-paragraphs"
  | "csv-to-html-table-large-files"
  | "excel-to-html-table-formulas";

/** 一节正文：标题 + 若干段落，需要时再挂一个列表。 */
export type LegalSection = {
  heading: string;
  body: string[];
  items?: string[];
};

/**
 * 一篇教程。
 *
 * 跟 LegalCopy 分开建模而不是复用：正式页面是一坨说明文字，教程有它自己
 * 要交代的东西 —— 配哪个工具页（tool，用来生成那条「直接去转」的链接和
 * 面包屑）、正文里的分步骤、以及结尾指回工具页的那一句。
 *
 * 没有 date / author 字段。这些文章不按时间序排，加个日期只会让它们从第二年
 * 起看着像过期内容 —— 而内容本身不会过期。Article 结构化数据里那个
 * datePublished 也因此不发（宁可不发，不发假的）。
 */
export type GuideCopy = {
  /** 导航和面包屑用的短名 */
  short: string;
  eyebrow: string;
  title: string;
  description: string;
  keywords: string[];
  h1: string;
  /** 开头两三句：这篇解决什么问题，读完能做到什么 */
  lede: string[];
  /** 这篇配哪个工具页 —— 面包屑和结尾的 CTA 都用它 */
  tool: PageKey;
  sections: GuideSection[];
  /** 结尾那句「现在去转」。CTA 的字面在 chrome 里，这里只写引导句。 */
  outro: string;
};

/**
 * 教程的一节。body 是段落，steps 是有序步骤（真的有先后才用，不是拿来
 * 装饰的编号），两者都可选但不能都没有。
 */
export type GuideSection = {
  heading: string;
  body?: string[];
  steps?: string[];
  /** 转换前后对照。给出真实的输入和输出，不写「示例内容」这种占位。 */
  sample?: { beforeLabel: string; before: string; afterLabel: string; after: string };
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
    /**
     * 教程壳子上的字。文章正文在 guides 里，这儿只有布局自己要说的那几句。
     *
     * 单独一组而不是平铺进 chrome：chrome 已经二十来个键了，教程这几个是
     * 一起加、一起用的，归堆之后翻译六份时不会漏掉其中一个。
     */
    guide: {
      /** 文章结尾那个按钮，点过去是这篇配的工具页 */
      cta: string;
      /** 列表页每张卡片底下那行：这篇配哪个工具 */
      pairedWith: string;
      /** 文章末尾「另外几篇」那一段的标题 */
      moreHeading: string;
    };
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
  guides: Record<GuideKey, GuideCopy>;
  /**
   * 教程列表页 /guides/ 自己的文案。
   *
   * 不塞进 guides 里当第七篇：它没有 sections、没有配套工具页，
   * 而每篇文章都必须有 —— 混在一起就得把那两个字段改成可选的，
   * 于是真正漏写了 sections 的文章也能编译过。
   */
  guideIndex: {
    short: string;
    eyebrow: string;
    title: string;
    description: string;
    h1: string;
    lede: string[];
  };
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
