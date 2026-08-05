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
  | "excel-to-markdown";

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
};

/** 把 {n} 换成数字，按单复数挑句子。 */
export function count(n: number, forms: Plural) {
  return (n === 1 ? forms.one : forms.other).replace("{n}", String(n));
}
