import type { Dictionary, Faq } from "../types";

const SHARED: Faq[] = [
  {
    q: "文件会上传到服务器吗？",
    a: "不会。整个转换在你的浏览器里跑完，文件根本没离开这台电脑。不信就把网断了再试一次，照样能用。",
  },
  {
    q: "表格能保住吗？",
    a: "能。出来是标准的 Markdown 竖线表格，单元格里的竖线会自动转义。只有合并单元格例外 —— Markdown 没这个语法，只能拆平。",
  },
  {
    q: "一次能转几个？",
    a: "不限。拖四十个进来也会排队跑完，最后打包成一个 zip 拿走。单个文件别超过 25 MB。",
  },
];

const LEGACY: Faq = {
  q: "老的 .doc 文件能转吗？",
  a: "能。.doc 是 2007 年以前的二进制格式，我们在浏览器里逐字节把它读开。正文、标题、表格、粗体斜体都能出来。两样东西回不来：图片和精确的列表编号。手边有 Word 的话，先另存为 .docx，结果会更干净。",
};

const zhHans: Dictionary = {
  htmlLang: "zh-CN",
  chrome: {
    eyebrow: "Word → Markdown",
    breadcrumbHome: "首页",
    keepsHeading: "什么能留下",
    keepsLede:
      "这些原样带过去。别的会尽力试，哪里没对上会明确告诉你。",
    keepsDocNote:
      "老 .doc 的图片留不住 —— 那个格式把图藏在浏览器摸不到的地方。",
    keeps: {
      headings: "标题层级",
      tables: "表格",
      lists: "有序 / 无序列表",
      links: "链接",
      emphasis: "粗体 / 斜体 / 删除线",
      quotes: "引用块",
      code: "代码块",
      images: "图片",
    },
    faqHeading: "常有人问",
    crossHeading: "同一个工具，别的入口",
    startOver: "回到首页",
    startOverNote: "不带格式名的那个版本",
    footerLeft: "docstomd.com — 一个人做的小工具",
    footerRight: "在浏览器里跑 · 不存 · 不追踪",
    langLabel: "语言",
    features: [
      "把 .docx 转成 Markdown",
      "把老 .doc 转成 Markdown",
      "批量转换并打包成 zip 下载",
      "全程在浏览器里跑，不上传",
      "保留表格、标题、列表和链接",
    ],
  },
  converter: {
    dropTitle: "把 Word 文档拖到这儿。",
    dropActive: "松手。",
    dropHint: "也可以点按钮选，或者直接 Ctrl+V 粘。几十个一起来都行。",
    dropMeta: ".docx 和 .doc / 单个 25 MB / 在浏览器里跑，不上传",
    pick: "选个文件",
    clear: "清空",
    knobs: "旋钮",
    bullets: "项目符号",
    fence: "代码围栏",
    images: "图片",
    imageInline: "转成 base64",
    imagePlaceholder: "只留位置",
    imageStrip: "直接丢掉",
    tables: "表格",
    tableKeep: "保留",
    tableFlatten: "拆平",
    stale: "旋钮转过了。想让新设置生效，把文件再拖一次。",
    queue: "队列",
    zip: { one: "打包 {n} 个", other: "打包 {n} 个" },
    chewing: "正在嚼…",
    failed: "没成",
    tooBig: "超过 25 MB，太大了。",
    readFail: "读不动。文件可能损坏了，或者设了密码。",
    pastedName: "粘贴的内容",
    source: "源码",
    preview: "预览",
    copy: "复制",
    copied: "已复制",
    download: "下载 .md",
    legacyWarn: "老 .doc 格式 —— 能读的都读出来了",
    styleWarn: { one: "有 {n} 个 Word 样式没对上", other: "有 {n} 个 Word 样式没对上" },
    emptyDoc: "（空文档）",
    pickOne: "在左边点一个，结果显示在这里。",
    chewingFirst: "正在嚼第一个…",
    units: {
      words: { one: "{n} 字", other: "{n} 字" },
      headings: { one: "{n} 个标题", other: "{n} 个标题" },
      tables: { one: "{n} 个表格", other: "{n} 个表格" },
      images: { one: "{n} 张图", other: "{n} 张图" },
      links: { one: "{n} 个链接", other: "{n} 个链接" },
    },
  },
  pages: {
    home: {
      short: "首页",
      title: "Docs to MD — Word 转 Markdown，免费且不上传",
      description:
        "拖入 .docx 或 .doc，拿到干净的 Markdown。标题、表格、列表、链接都能留下。全程在浏览器里完成，文件不离开你的电脑。",
      keywords: [
        "word转markdown",
        "docx转markdown",
        "doc转md",
        "word转md工具",
        "在线word转markdown",
      ],
      h1: ["把字从 Word 里捞出来。", "得到干净的 Markdown。"],
      lede: [
        "拖一个文件进来，几百毫秒就有结果。",
        "表格和标题都在原位。什么都不上传。",
      ],
      note: {
        heading: "话说明白",
        items: [
          ".docx 和老 .doc 都收，不用先另存为",
          "不注册、不限量、不加水印",
          "断网也能用",
        ],
      },
      faq: [
        SHARED[0],
        LEGACY,
        SHARED[1],
        {
          q: "图片会怎么处理？",
          a: "默认转成 base64 内嵌，一个 .md 文件装下全部内容。要是这样文件太胖，切到「只留位置」—— 我们给路径，图你自己带。",
        },
        SHARED[2],
        {
          q: "Word 的样式都能对上吗？",
          a: "常用的都行：标题、列表、粗体、斜体、删除线、引用、代码、链接、上下标。自定义样式对不上时，会列在结果上方。不瞒着你。",
        },
      ],
    },
    "docx-to-markdown": {
      short: "DOCX → MD",
      title: "DOCX 转 Markdown — 免费，在浏览器里完成",
      description:
        "把 .docx 转成 Markdown，不用上传任何东西。标题、表格、列表、链接、代码块都干净地过来。老 .doc 也能转。支持批量并打包成 zip 下载。",
      keywords: [
        "docx转markdown",
        "docx转md",
        "docx转markdown工具",
        "在线docx转markdown",
        "docx转markdown免费",
        "doc转markdown",
      ],
      h1: ["把 .docx 变成 Markdown。", "不上传，不注册。"],
      lede: [
        "就是冲着 Word 实际存出来的那种文件做的。拖进来，看 Markdown，拿走。",
        "所有事都在你机器上发生。",
      ],
      note: {
        heading: "你能拿到什么",
        items: [
          "真的竖线表格，不是搅烂的文字",
          "标题层级还是 # ## ###",
          "四十个一起来，一个 zip 出去",
        ],
      },
      faq: [
        {
          q: ".docx 和 .doc 在这儿有什么区别？",
          a: ".docx 是一包 XML 压缩文件，读起来干净，图片也跟着过来。.doc 是 1997 年的 OLE 二进制 —— 我们照样在浏览器里解，但图片和列表编号救不回来。同一个工具，只是前者信息更全。",
        },
        SHARED[0],
        SHARED[1],
        {
          q: "代码块能处理吗？",
          a: "能。样式是 Code 或 Source Code 的段落会变成围栏代码块。用围栏旋钮选 ``` 还是 ~~~。",
        },
        SHARED[2],
        {
          q: "有 API 吗？",
          a: "还没有。这是刻意做成纯浏览器工具的 —— 没有服务器，也就没有接口可调。要在脚本里用，pandoc 离线做这件事很在行。",
        },
      ],
    },
    "word-to-markdown": {
      short: "Word → MD",
      title: "Word 转 Markdown — 免费，什么都不上传",
      description:
        "在浏览器里把 Word 文档转成 Markdown。收 .docx 和老 .doc。标题、表格、粗体、链接、列表都保住。不用账号，不上传，不玩文件大小的把戏。",
      keywords: [
        "word转markdown",
        "word转markdown工具",
        "word文档转markdown",
        "word转markdown免费",
        "word转md",
        "doc转markdown工具",
      ],
      h1: ["Word 文档进。", "Markdown 出。"],
      lede: [
        "给那些用 Word 写、拿 Markdown 交活的人。",
        "把文件拖过来，复制结果，几秒钟的事。",
      ],
      note: {
        heading: "话说明白",
        items: [
          ".docx 和老 .doc 一样收",
          "格式留下，杂七杂八的丢掉",
          "不上传，不留存",
        ],
      },
      faq: [
        {
          q: "哪些 Word 文件能用？",
          a: "两种格式都行。Word 2007 以后的 .docx，包括 Mac 版和网页版 Word。Word 97–2003 的老 .doc 也能读，只是没图片。Word 6 和 95 太老了。",
        },
        SHARED[0],
        {
          q: "修订记录和批注呢？",
          a: "都会丢掉。你拿到的是页面上最终读到的文字，不是编辑过程。想留就先在 Word 里接受或拒绝修订。",
        },
        SHARED[1],
        {
          q: "脚注会过来吗？",
          a: "脚注文字会落在文档末尾。正文里那个小编号不会变成链接 —— Markdown 的脚注语法各家支持不一，我们不硬造。",
        },
        SHARED[2],
      ],
    },
    "google-docs-to-markdown": {
      short: "Google Docs → MD",
      title: "Google Docs 转 Markdown — 导出即转，免费",
      description:
        "把 Google 文档变成干净的 Markdown。下载成 .docx，拖到这儿，复制 Markdown。不用装插件，也不碰你的云端硬盘。",
      keywords: [
        "google docs转markdown",
        "google文档转markdown",
        "docs转markdown",
        "google docs导出markdown",
        "google文档转md",
      ],
      h1: ["Google 文档转 Markdown。", "两步，不用插件。"],
      lede: [
        "我们从不要你的云端硬盘权限。你导出文件，我们负责转换。",
        "这样你的东西还是你的。",
      ],
      note: {
        heading: "就两步",
        items: [
          "在文档里：文件 → 下载 → Microsoft Word (.docx)",
          "把这个 .docx 拖到下面",
          "不用授权，不要权限，不装插件",
        ],
      },
      faq: [
        {
          q: "为什么要先下载一次？",
          a: "因为另一条路是向你要整个云端硬盘的权限。导出花你五秒钟，却什么都没交给我们。这笔账值得。",
        },
        {
          q: "Google Docs 自己就能导出 Markdown，为什么用这个？",
          a: "问得对。自带导出够用就用自带的。这儿是给想调旋钮的人：项目符号样式、代码围栏样式、图片内嵌还是留位置，以及一次转一整个文件夹。",
        },
        SHARED[0],
        SHARED[1],
        {
          q: "批注和建议会过来吗？",
          a: "不会。你拿到的是文档正文，不是围绕它的讨论。想要就先把建议接受掉再导出。",
        },
        SHARED[2],
      ],
    },
  },
};

export default zhHans;
