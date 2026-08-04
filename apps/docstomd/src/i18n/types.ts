export type Faq = { q: string; a: string };

/**
 * 复数形态存成数据而不是函数 —— 字典要作为 props 传给客户端组件，
 * 函数过不了 RSC 边界。中文和日文两个槽填一样的字就行。
 * {n} 是占位符。
 */
export type Plural = { one: string; other: string };

export type PageCopy = {
  /** 导航和面包屑用的短名 */
  short: string;
  title: string;
  description: string;
  keywords: string[];
  /** H1 拆两半，后半截带荧光笔下划线 */
  h1: [string, string];
  lede: string[];
  /** 便签条 */
  note: { heading: string; items: string[] };
  faq: Faq[];
};

export type PageKey =
  | "home"
  | "docx-to-markdown"
  | "word-to-markdown"
  | "google-docs-to-markdown";

export type Dictionary = {
  /** <html lang> 用的值 */
  htmlLang: string;
  chrome: {
    eyebrow: string;
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
};

/** 把 {n} 换成数字，按单复数挑句子。 */
export function count(n: number, forms: Plural) {
  return (n === 1 ? forms.one : forms.other).replace("{n}", String(n));
}
