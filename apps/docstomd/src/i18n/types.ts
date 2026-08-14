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
  /** H1 拆两半，后半截带荧光笔下划线 */
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
  | "docx-to-markdown"
  | "word-to-markdown"
  | "google-docs-to-markdown"
  | "pdf-to-markdown"
  | "html-to-markdown"
  | "csv-to-markdown"
  | "excel-to-markdown"
  | "pptx-to-markdown";

/**
 * 正式页面。AdSense 审核要求 About / Contact / Privacy / Terms / Cookie 五页
 * 齐备（方案 §15），而且得是真内容，不是占位。
 *
 * 和工具页分开建模：它们没有转换器、没有 FAQ 手风琴、没有 featureList，
 * 硬塞进 PageCopy 只会让每个字段都变成可选的。
 */
export type LegalKey = "about" | "contact" | "privacy" | "terms" | "cookies";

/**
 * 教程文章。一篇配一个转换器，回答那种「工具页装不下」的问题 ——
 * 工具页的 FAQ 是三五句就该说完的，而「Word 的表格转过来为什么会散」
 * 要摊开讲清原因、怎么看出来、怎么绕过去。
 *
 * 六篇对六个转换引擎（docx / pdf / html / csv / xlsx / Google 文档那条
 * 粘贴路），不是对七个工具页：docx-to-markdown 和 word-to-markdown 走的是
 * 同一个转换器，给它们各写一篇就是两篇内容重合的文章互相抢同一批查询。
 *
 * slug 写成搜索的人真会打的那串字，不是内部代号。带 -in-<year> 之类的
 * 时效词一律不要 —— 这些是操作步骤，不是新闻，一年后还得是对的。
 *
 * key 就是 slug（跟 LegalKey 同一套做法），因为它们一一对应，
 * 再加一层映射只会多一个能对不上的地方。
 */
export type GuideKey =
  | "word-to-markdown-keep-formatting"
  | "pdf-to-markdown-layout"
  | "google-docs-to-markdown-paste"
  | "html-to-markdown-clean"
  | "csv-to-markdown-tables"
  | "excel-to-markdown-formulas";

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

export type Dictionary = {
  /** <html lang> 用的值 */
  htmlLang: string;
  chrome: {
    breadcrumbHome: string;
    keepsHeading: string;
    keepsLede: string;
    keepsDocNote: string;
    keeps: {
      headings: string;
      tables: string;
      lists: string;
      links: string;
      emphasis: string;
      quotes: string;
      code: string;
      images: string;
    };
    faqHeading: string;
    crossHeading: string;
    startOver: string;
    startOverNote: string;
    footerLeft: string;
    footerRight: string;
    langLabel: string;
    /** 页脚里那排正式页面链接上方的小标题 */
    footerLegal: string;
    /** 正式页面末尾「有问题去这儿」的那句 */
    legalContactCue: string;
    /** 正式页面上标注生效日期的前缀，后面接日期 */
    legalUpdated: string;
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
    /** 「别的格式：」—— 后面跟本页不收但别处收的扩展名和链接，见 elsewhereHints */
    elsewhereLead: string;
    pick: string;
    clear: string;
    knobs: string;
    bullets: string;
    fence: string;
    images: string;
    imageInline: string;
    imagePlaceholder: string;
    imageStrip: string;
    tables: string;
    tableKeep: string;
    tableFlatten: string;
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
    /**
     * 本站有好几页都收，而且哪个都可能对 —— 后面跟的是一串链接。
     *
     * 为什么不能复用 wrongType：那句是「这一页不收，那一页收」，一个确定的
     * 答案。当去处不止一个时它读起来是错的（「这一页收：」后面跟三个链接，
     * 到底哪一页？），而且它没说清为什么有几个 —— 得让用户知道这是要他
     * 自己认哪个是他的文件，不是随便挑一个。
     *
     * 这个站今天没有这种扩展名（每个都只对应一个引擎），但 docs2html 的
     * `.txt` 是，而且加页面很容易在这边造出来。文案先备着，比到时候拿
     * wrongType 硬凑强。
     */
    wrongTypeAmbiguous: string;
    /**
     * 全站都不收（.zip、.epub…）。这条后面没有链接 —— 无处可去时给一个链接
     * 就是骗人跑一趟。所以它得自己把话说完整：不收，以及这个站收什么。
     */
    wrongTypeNowhere: string;
    /** 粘贴富文本时给这份内容起的名字，没有文件名可用 */
    pastedName: string;
    /** 直接在文本框里贴内容时用的名字（HTML 源码 / CSV） */
    typedName: string;
    /* ── 粘贴 / 输入区（HTML、CSV、Google Docs 页用） ── */
    pasteHeading: string;
    pastePlaceholderHtml: string;
    pastePlaceholderCsv: string;
    pasteRun: string;
    pasteClear: string;
    /* ── CSV / XLSX 的表格旋钮 ── */
    header: string;
    headerFirstRow: string;
    headerNone: string;
    align: string;
    alignNone: string;
    alignLeft: string;
    alignCenter: string;
    alignRight: string;
    delimiter: string;
    delimiterAuto: string;
    delimiterComma: string;
    delimiterSemicolon: string;
    delimiterTab: string;
    delimiterPipe: string;
    /* ── PDF ── */
    pageMarks: string;
    pageMarksOn: string;
    pageMarksOff: string;
    /* ── XLSX 的工作表选择 ── */
    sheets: string;
    sheetsAll: string;
    sheetMeta: Plural;
    source: string;
    preview: string;
    copy: string;
    copied: string;
    download: string;
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
