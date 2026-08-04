import type { Dictionary, Faq } from "../types";

const SHARED: Faq[] = [
  {
    q: "ファイルはアップロードされますか？",
    a: "されません。処理はぜんぶブラウザの中で終わります。ファイルがサーバーに触れることはありません。Wi-Fi を切って試してみてください。ちゃんと動きます。",
  },
  {
    q: "表はそのまま残りますか？",
    a: "残ります。標準的な Markdown のパイプ表になり、セル内のパイプはエスケープされます。例外は結合セルだけ。Markdown に書き方がないので、平らにほどきます。",
  },
  {
    q: "一度に何個まで？",
    a: "上限はありません。40 個入れれば順番に処理します。終わったら zip 一つでまとめて持ち帰れます。1 ファイル 25 MB までです。",
  },
];

const LEGACY: Faq = {
  q: "古い .doc はどうなりますか？",
  a: "こちらも変換できます。.doc は 2007 年より前のバイナリ形式なので、ブラウザの中で 1 バイトずつ読み解いています。本文・見出し・表・太字・斜体は取り出せます。戻らないものが二つ、画像と正確なリスト番号です。Word が手元にあるなら、いちど .docx で保存し直したほうがきれいに出ます。",
};

const ja: Dictionary = {
  htmlLang: "ja",
  chrome: {
    eyebrow: "Word → Markdown",
    breadcrumbHome: "ホーム",
    keepsHeading: "残るもの",
    keepsLede:
      "これはそのまま移ります。ほかは最善を尽くしますし、合わなかったところは必ずお知らせします。",
    keepsDocNote:
      "古い .doc は画像だけ落ちます。あの形式は、ブラウザから手が届かない場所に画像をしまっています。",
    keeps: {
      headings: "見出しレベル",
      tables: "表",
      lists: "番号付き / 箇条書きリスト",
      links: "リンク",
      emphasis: "太字 / 斜体 / 打ち消し線",
      quotes: "引用",
      code: "コードブロック",
      images: "画像",
    },
    faqHeading: "よく聞かれること",
    crossHeading: "同じ道具、別の入口",
    startOver: "ホームに戻る",
    startOverNote: "名前に形式が入っていない、素の版",
    footerLeft: "docstomd.com — 一人で作った小さな道具",
    footerRight: "ブラウザで動く · 保存しない · 追跡しない",
    langLabel: "言語",
    features: [
      ".docx を Markdown に変換",
      "古い .doc を Markdown に変換",
      "まとめて変換して zip で保存",
      "すべてブラウザ内で動作、送信なし",
      "表・見出し・リスト・リンクを保持",
    ],
  },
  converter: {
    dropTitle: "Word 文書をここに落としてください。",
    dropActive: "離してどうぞ。",
    dropHint:
      "ボタンから選んでも、Ctrl+V で貼っても構いません。何十個いっぺんでも平気です。",
    dropMeta:
      ".docx と .doc / 1 ファイル 25 MB / ブラウザで動きます、送信はしません",
    pick: "ファイルを選ぶ",
    clear: "消す",
    knobs: "つまみ",
    bullets: "箇条書き記号",
    fence: "コード囲み",
    images: "画像",
    imageInline: "base64 で埋める",
    imagePlaceholder: "場所だけ残す",
    imageStrip: "落とす",
    tables: "表",
    tableKeep: "残す",
    tableFlatten: "平らにする",
    stale: "つまみが動きました。反映するには、もう一度ファイルを落としてください。",
    queue: "順番待ち",
    zip: { one: "{n} 件を zip に", other: "{n} 件を zip に" },
    chewing: "噛んでいます…",
    failed: "失敗",
    tooBig: "25 MB を超えています。大きすぎます。",
    readFail:
      "読めませんでした。ファイルが壊れているか、パスワードがかかっているかもしれません。",
    source: "ソース",
    preview: "プレビュー",
    copy: "コピー",
    copied: "コピーしました",
    download: ".md を保存",
    legacyWarn: "古い .doc 形式 — 読めたぶんだけ出しました",
    styleWarn: {
      one: "Word のスタイル {n} 件が合いませんでした",
      other: "Word のスタイル {n} 件が合いませんでした",
    },
    emptyDoc: "（空の文書）",
    pickOne: "左から一つ選ぶと、結果がここに出ます。",
    chewingFirst: "最初のを噛んでいます…",
    units: {
      words: { one: "{n} 語", other: "{n} 語" },
      headings: { one: "見出し {n} 個", other: "見出し {n} 個" },
      tables: { one: "表 {n} 個", other: "表 {n} 個" },
      images: { one: "画像 {n} 枚", other: "画像 {n} 枚" },
      links: { one: "リンク {n} 本", other: "リンク {n} 本" },
    },
  },
  pages: {
    home: {
      short: "ホーム",
      title: "Docs to MD — Word を Markdown に変換、無料・非公開",
      description:
        ".docx か .doc を落とすと、きれいな Markdown が出てきます。見出し・表・リスト・リンクはそのまま残ります。処理はすべてブラウザ内。ファイルがパソコンから出ることはありません。",
      keywords: [
        "word markdown 変換",
        "docx markdown 変換",
        "word md 変換",
        "doc markdown 変換",
        "word markdown 変換 オンライン",
      ],
      h1: ["Word の中から言葉を取り出す。", "きれいな Markdown へ。"],
      lede: [
        "ファイルを落とすだけ。結果は数百ミリ秒で出ます。",
        "表と見出しは元の位置のまま。何も送信しません。",
      ],
      note: {
        heading: "はっきり言うと",
        items: [
          ".docx も古い .doc も、保存し直さずそのまま",
          "登録なし、上限なし、透かしなし",
          "Wi-Fi を切っていても動きます",
        ],
      },
      faq: [
        SHARED[0],
        LEGACY,
        SHARED[1],
        {
          q: "画像はどうなりますか？",
          a: "初期設定では base64 で埋め込むので、.md 一枚に全部入ります。それで重くなりすぎるなら「場所だけ残す」に切り替えてください。パスはこちらが書き、画像はあなたが用意する形です。",
        },
        SHARED[2],
        {
          q: "Word のスタイルは全部対応しますか？",
          a: "実際に使われているものは対応します。見出し、リスト、太字、斜体、打ち消し線、引用、コード、リンク、上付き・下付き。独自スタイルが当てはまらなかったときは、結果の上に一覧で出します。隠しません。",
        },
      ],
    },
    "docx-to-markdown": {
      short: "DOCX → MD",
      title: "DOCX を Markdown に変換 — 無料、ブラウザ内で完結",
      description:
        "何もアップロードせずに .docx を Markdown へ変換します。見出し・表・リスト・リンク・コードブロックがきれいに通ります。古い .doc も対応。まとめて変換して zip で保存できます。",
      keywords: [
        "docx markdown 変換",
        "docx md 変換",
        "docx markdown 変換 ツール",
        "docx markdown 変換 オンライン",
        "docx markdown 変換 無料",
        "doc markdown 変換",
      ],
      h1: [".docx を Markdown に。", "送信なし、登録なし。"],
      lede: [
        "Word が実際に保存するあのファイルのために作りました。落として、Markdown を読んで、持っていってください。",
        "ぜんぶあなたの機械の中で起きます。",
      ],
      note: {
        heading: "手に入るもの",
        items: [
          "崩れた文字列ではなく、本物のパイプ表",
          "見出しレベルは # ## ### のまま",
          "40 個いっぺんに、zip 一つで",
        ],
      },
      faq: [
        {
          q: "ここでの .docx と .doc の違いは？",
          a: ".docx は XML を詰めた zip なので、きれいに読めて画像も付いてきます。.doc は 1997 年の OLE バイナリ。こちらもブラウザで解析しますが、画像とリスト番号は取り戻せません。道具は同じで、前者のほうが情報が多いだけです。",
        },
        SHARED[0],
        SHARED[1],
        {
          q: "コードブロックは扱えますか？",
          a: "扱えます。Code や Source Code のスタイルが付いた段落は、囲みブロックになります。囲みのつまみで ``` か ~~~ を選べます。",
        },
        SHARED[2],
        {
          q: "API はありますか？",
          a: "まだありません。あえてブラウザだけの道具にしているので、サーバーがない＝呼ぶ API もない、という理屈です。スクリプトで必要なら、pandoc がオフラインでうまくやってくれます。",
        },
      ],
    },
    "word-to-markdown": {
      short: "Word → MD",
      title: "Word を Markdown に変換 — 無料、何も送信しない",
      description:
        "ブラウザの中で Word 文書を Markdown に変換します。.docx と古い .doc に対応。見出し・表・太字・リンク・リストを保ちます。アカウント不要、アップロードなし、容量で駆け引きもしません。",
      keywords: [
        "word markdown 変換",
        "word markdown 変換 ツール",
        "word 文書 markdown 変換",
        "word markdown 変換 無料",
        "word md 変換",
        "doc markdown 変換 ツール",
      ],
      h1: ["Word 文書が入る。", "Markdown が出る。"],
      lede: [
        "Word で書いて Markdown で納める人のために。",
        "ファイルをドラッグして、結果をコピー。数秒で終わります。",
      ],
      note: {
        heading: "はっきり言うと",
        items: [
          ".docx も古い .doc も同じように受けます",
          "書式は残り、余計なものは落ちます",
          "送信しない、保存しない",
        ],
      },
      faq: [
        {
          q: "どの Word ファイルが使えますか？",
          a: "両方の形式です。Word 2007 以降の .docx（Mac 版と Word Online も含む）。Word 97–2003 の古い .doc も、画像を除けば使えます。Word 6 と 95 は古すぎます。",
        },
        SHARED[0],
        {
          q: "変更履歴とコメントは？",
          a: "どちらも落ちます。編集の履歴ではなく、ページ上で読めるままの最終テキストが出ます。必要なら Word で先に反映か却下をしてください。",
        },
        SHARED[1],
        {
          q: "脚注は移りますか？",
          a: "脚注の文章は文書の末尾に置かれます。本文中の小さな参照番号はリンクとしては残りません。Markdown の脚注はどこでも通る書き方ではないので、あるふりはしません。",
        },
        SHARED[2],
      ],
    },
    "google-docs-to-markdown": {
      short: "Google Docs → MD",
      title: "Google ドキュメントを Markdown に — 書き出して変換、無料",
      description:
        "Google ドキュメントをきれいな Markdown にします。.docx でダウンロードして、ここに落として、Markdown をコピー。アドオンのインストールも、ドライブへのアクセスも要りません。",
      keywords: [
        "google ドキュメント markdown 変換",
        "google docs markdown 変換",
        "docs markdown 変換",
        "google ドキュメント markdown 書き出し",
        "google ドキュメント md 変換",
      ],
      h1: ["Google ドキュメントを Markdown に。", "2 手順、アドオン不要。"],
      lede: [
        "あなたのドライブは絶対に要求しません。書き出すのはあなた、変換するのがこちらです。",
        "そうすれば、あなたのものが誰かのものになりません。",
      ],
      note: {
        heading: "2 つの手順",
        items: [
          "ドキュメントで：ファイル → ダウンロード → Microsoft Word (.docx)",
          "その .docx を下に落とす",
          "OAuth なし、権限なし、アドオンなし",
        ],
      },
      faq: [
        {
          q: "なぜ先にダウンロードが必要なのですか？",
          a: "もう一つの道は、あなたのドライブ全体へのアクセスを求めることだからです。書き出しは 5 秒で済み、こちらには何も渡りません。この取引は割に合います。",
        },
        {
          q: "Google ドキュメントにも Markdown 書き出しがあります。なぜこれを？",
          a: "もっともな疑問です。標準の書き出しで足りるならそれで十分。ここが向くのは、つまみを回したいときです。箇条書き記号、囲みの種類、画像を埋め込むか場所だけ残すか、そしてフォルダ一つ分をまとめて変換したいとき。",
        },
        SHARED[0],
        SHARED[1],
        {
          q: "コメントや提案は移りますか？",
          a: "移りません。文書の本文が手に入り、そのまわりの会話は入りません。含めたい提案は、書き出す前に反映しておいてください。",
        },
        SHARED[2],
      ],
    },
  },
};

export default ja;
