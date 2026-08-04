import type { Dictionary, Faq } from "../types";

/** 用台灣那邊的講法：檔案、清單、貼上、儲存，不是簡體那套詞。 */
const SHARED: Faq[] = [
  {
    q: "檔案會上傳到伺服器嗎？",
    a: "不會。整個轉換都在你的瀏覽器裡跑完，檔案根本沒離開這台電腦。不信把網路關掉再試一次，照樣能用。",
  },
  {
    q: "表格保得住嗎？",
    a: "保得住。出來是標準的 Markdown 直線表格，格子裡的直線會自動轉義。只有合併儲存格例外 —— Markdown 沒這個語法，只能攤平。",
  },
  {
    q: "一次能轉幾個？",
    a: "沒有上限。丟四十個進來也會排隊跑完，最後打包成一個 zip 帶走。單一檔案別超過 25 MB。",
  },
];

const LEGACY: Faq = {
  q: "舊的 .doc 檔能轉嗎？",
  a: "能。.doc 是 2007 年以前的二進位格式，我們在瀏覽器裡逐位元組把它讀開。內文、標題、表格、粗體斜體都出得來。兩樣東西回不來：圖片和精確的清單編號。手邊有 Word 的話，先另存成 .docx，結果會更乾淨。",
};

const zhHant: Dictionary = {
  htmlLang: "zh-TW",
  chrome: {
    eyebrow: "Word → Markdown",
    breadcrumbHome: "首頁",
    keepsHeading: "什麼留得下來",
    keepsLede: "這些原樣帶過去。其他的會盡力試，哪裡沒對上會明確告訴你。",
    keepsDocNote: "舊 .doc 的圖片留不住 —— 那個格式把圖藏在瀏覽器摸不到的地方。",
    keeps: {
      headings: "標題層級",
      tables: "表格",
      lists: "編號 / 項目清單",
      links: "連結",
      emphasis: "粗體 / 斜體 / 刪除線",
      quotes: "引用區塊",
      code: "程式碼區塊",
      images: "圖片",
    },
    faqHeading: "常有人問",
    crossHeading: "同一個工具，別的入口",
    startOver: "回到首頁",
    startOverNote: "不帶格式名稱的那個版本",
    footerLeft: "docstomd.com — 一個人做的小工具",
    footerRight: "在瀏覽器裡跑 · 不儲存 · 不追蹤",
    langLabel: "語言",
    features: [
      "把 .docx 轉成 Markdown",
      "把舊 .doc 轉成 Markdown",
      "批次轉換並打包成 zip 下載",
      "全程在瀏覽器裡跑，不上傳",
      "保留表格、標題、清單和連結",
    ],
  },
  converter: {
    dropTitle: "把 Word 文件拖到這裡。",
    dropActive: "放手。",
    dropHint: "也可以按按鈕選，或直接 Ctrl+V 貼上。幾十個一起來都行。",
    dropMeta: ".docx 和 .doc / 單檔 25 MB / 在瀏覽器裡跑，不上傳",
    pick: "選個檔案",
    clear: "清空",
    knobs: "旋鈕",
    bullets: "項目符號",
    fence: "程式碼圍籬",
    images: "圖片",
    imageInline: "轉成 base64",
    imagePlaceholder: "只留位置",
    imageStrip: "直接丟掉",
    tables: "表格",
    tableKeep: "保留",
    tableFlatten: "攤平",
    stale: "旋鈕轉過了。想讓新設定生效，把檔案再拖一次。",
    queue: "佇列",
    zip: { one: "打包 {n} 個", other: "打包 {n} 個" },
    chewing: "正在嚼…",
    failed: "沒成",
    tooBig: "超過 25 MB，太大了。",
    readFail: "讀不動。檔案可能損壞了，或設了密碼。",
    source: "原始碼",
    preview: "預覽",
    copy: "複製",
    copied: "已複製",
    download: "下載 .md",
    legacyWarn: "舊 .doc 格式 —— 能讀的都讀出來了",
    styleWarn: {
      one: "有 {n} 個 Word 樣式沒對上",
      other: "有 {n} 個 Word 樣式沒對上",
    },
    emptyDoc: "（空文件）",
    pickOne: "在左邊點一個，結果顯示在這裡。",
    chewingFirst: "正在嚼第一個…",
    units: {
      words: { one: "{n} 字", other: "{n} 字" },
      headings: { one: "{n} 個標題", other: "{n} 個標題" },
      tables: { one: "{n} 個表格", other: "{n} 個表格" },
      images: { one: "{n} 張圖", other: "{n} 張圖" },
      links: { one: "{n} 個連結", other: "{n} 個連結" },
    },
  },
  pages: {
    home: {
      short: "首頁",
      title: "Docs to MD — Word 轉 Markdown，免費且不上傳",
      description:
        "拖入 .docx 或 .doc，拿到乾淨的 Markdown。標題、表格、清單、連結都留得下來。全程在瀏覽器裡完成，檔案不離開你的電腦。",
      keywords: [
        "word轉markdown",
        "docx轉markdown",
        "doc轉md",
        "word轉md工具",
        "線上word轉markdown",
      ],
      h1: ["把字從 Word 裡撈出來。", "得到乾淨的 Markdown。"],
      lede: [
        "拖一個檔案進來，幾百毫秒就有結果。",
        "表格和標題都在原位。什麼都不上傳。",
      ],
      note: {
        heading: "話說明白",
        items: [
          ".docx 和舊 .doc 都收，不用先另存新檔",
          "不註冊、不限量、不加浮水印",
          "斷網也能用",
        ],
      },
      faq: [
        SHARED[0],
        LEGACY,
        SHARED[1],
        {
          q: "圖片會怎麼處理？",
          a: "預設轉成 base64 內嵌，一個 .md 檔裝下全部內容。要是這樣檔案太肥，切到「只留位置」—— 我們給路徑，圖你自己帶。",
        },
        SHARED[2],
        {
          q: "Word 的樣式都對得上嗎？",
          a: "常用的都行：標題、清單、粗體、斜體、刪除線、引用、程式碼、連結、上下標。自訂樣式對不上時，會列在結果上方。不瞞著你。",
        },
      ],
    },
    "docx-to-markdown": {
      short: "DOCX → MD",
      title: "DOCX 轉 Markdown — 免費，在瀏覽器裡完成",
      description:
        "把 .docx 轉成 Markdown，不用上傳任何東西。標題、表格、清單、連結、程式碼區塊都乾淨地過來。舊 .doc 也能轉。支援批次並打包成 zip 下載。",
      keywords: [
        "docx轉markdown",
        "docx轉md",
        "docx轉markdown工具",
        "線上docx轉markdown",
        "docx轉markdown免費",
        "doc轉markdown",
      ],
      h1: ["把 .docx 變成 Markdown。", "不上傳，不註冊。"],
      lede: [
        "就是衝著 Word 實際存出來的那種檔案做的。拖進來，看 Markdown，帶走。",
        "所有事都在你的機器上發生。",
      ],
      note: {
        heading: "你能拿到什麼",
        items: [
          "真的直線表格，不是攪爛的文字",
          "標題層級還是 # ## ###",
          "四十個一起來，一個 zip 出去",
        ],
      },
      faq: [
        {
          q: ".docx 和 .doc 在這裡差在哪？",
          a: ".docx 是一包 XML 壓縮檔，讀起來乾淨，圖片也跟著過來。.doc 是 1997 年的 OLE 二進位 —— 我們照樣在瀏覽器裡解，但圖片和清單編號救不回來。同一個工具，只是前者資訊更全。",
        },
        SHARED[0],
        SHARED[1],
        {
          q: "程式碼區塊處理得了嗎？",
          a: "行。樣式是 Code 或 Source Code 的段落會變成圍籬程式碼區塊。用圍籬旋鈕選 ``` 還是 ~~~。",
        },
        SHARED[2],
        {
          q: "有 API 嗎？",
          a: "還沒有。這是刻意做成純瀏覽器工具的 —— 沒有伺服器，也就沒有介面可呼叫。要在腳本裡用，pandoc 離線做這件事很在行。",
        },
      ],
    },
    "word-to-markdown": {
      short: "Word → MD",
      title: "Word 轉 Markdown — 免費，什麼都不上傳",
      description:
        "在瀏覽器裡把 Word 文件轉成 Markdown。收 .docx 和舊 .doc。標題、表格、粗體、連結、清單都保得住。不用帳號，不上傳，不玩檔案大小的把戲。",
      keywords: [
        "word轉markdown",
        "word轉markdown工具",
        "word文件轉markdown",
        "word轉markdown免費",
        "word轉md",
        "doc轉markdown工具",
      ],
      h1: ["Word 文件進。", "Markdown 出。"],
      lede: [
        "給那些用 Word 寫、拿 Markdown 交活的人。",
        "把檔案拖過來，複製結果，幾秒鐘的事。",
      ],
      note: {
        heading: "話說明白",
        items: [
          ".docx 和舊 .doc 一樣收",
          "格式留下，雜七雜八的丟掉",
          "不上傳，不留存",
        ],
      },
      faq: [
        {
          q: "哪些 Word 檔能用？",
          a: "兩種格式都行。Word 2007 以後的 .docx，包括 Mac 版和網頁版 Word。Word 97–2003 的舊 .doc 也讀得動，只是沒圖片。Word 6 和 95 太老了。",
        },
        SHARED[0],
        {
          q: "追蹤修訂和註解呢？",
          a: "都會丟掉。你拿到的是頁面上最終讀到的文字，不是編輯過程。想留就先在 Word 裡接受或拒絕修訂。",
        },
        SHARED[1],
        {
          q: "註腳會過來嗎？",
          a: "註腳文字會落在文件末尾。內文裡那個小編號不會變成連結 —— Markdown 的註腳語法各家支援不一，我們不硬造。",
        },
        SHARED[2],
      ],
    },
    "google-docs-to-markdown": {
      short: "Google Docs → MD",
      title: "Google Docs 轉 Markdown — 匯出即轉，免費",
      description:
        "把 Google 文件變成乾淨的 Markdown。下載成 .docx，拖到這裡，複製 Markdown。不用裝外掛，也不碰你的雲端硬碟。",
      keywords: [
        "google docs轉markdown",
        "google文件轉markdown",
        "docs轉markdown",
        "google docs匯出markdown",
        "google文件轉md",
      ],
      h1: ["Google 文件轉 Markdown。", "兩步，不用外掛。"],
      lede: [
        "我們從不要你的雲端硬碟權限。你匯出檔案，我們負責轉換。",
        "這樣你的東西還是你的。",
      ],
      note: {
        heading: "就兩步",
        items: [
          "在文件裡：檔案 → 下載 → Microsoft Word (.docx)",
          "把這個 .docx 拖到下面",
          "不用授權，不要權限，不裝外掛",
        ],
      },
      faq: [
        {
          q: "為什麼要先下載一次？",
          a: "因為另一條路是向你要整個雲端硬碟的權限。匯出花你五秒鐘，卻什麼都沒交給我們。這筆帳值得。",
        },
        {
          q: "Google Docs 自己就能匯出 Markdown，為什麼用這個？",
          a: "問得對。內建匯出夠用就用內建的。這裡是給想調旋鈕的人：項目符號樣式、圍籬樣式、圖片內嵌還是留位置，以及一次轉一整個資料夾。",
        },
        SHARED[0],
        SHARED[1],
        {
          q: "註解和建議會過來嗎？",
          a: "不會。你拿到的是文件內文，不是圍繞它的討論。想要就先把建議接受掉再匯出。",
        },
        SHARED[2],
      ],
    },
  },
};

export default zhHant;
