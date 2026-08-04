import type { Dictionary, Faq } from "../types";

const SHARED: Faq[] = [
  {
    q: "Do my files get uploaded?",
    a: "No. The whole thing runs in your browser. Your file never touches a server. Turn off your wifi and try it — still works.",
  },
  {
    q: "Will my tables survive?",
    a: "Yes. They come out as standard Markdown pipe tables, and pipes inside cells get escaped. Merged cells are the one exception — Markdown has no syntax for them, so they get flattened.",
  },
  {
    q: "How many files at once?",
    a: "No cap. Drop forty in and they queue up. Grab them all as one zip when it's done. Each file has to be under 25 MB.",
  },
];

const LEGACY: Faq = {
  q: "What about old .doc files?",
  a: "They work too. .doc is pre-2007 binary, so we read the format byte by byte in your browser. You get text, headings, tables, bold and italic. Two things don't come back: images and exact list numbering. If you have Word handy, a Save As .docx gives a cleaner result.",
};

const en: Dictionary = {
  htmlLang: "en",
  chrome: {
    eyebrow: "Word → Markdown",
    breadcrumbHome: "home",
    keepsHeading: "What survives",
    keepsLede:
      "These carry over as-is. Anything else gets a best effort, and you'll be told when it doesn't line up.",
    keepsDocNote:
      "Old .doc files skip the images — that format hides them where a browser can't reach.",
    keeps: {
      headings: "Heading levels",
      tables: "Tables",
      lists: "Ordered / bulleted lists",
      links: "Links",
      emphasis: "Bold / italic / strikethrough",
      quotes: "Blockquotes",
      code: "Code blocks",
      images: "Images",
    },
    faqHeading: "Questions people ask",
    crossHeading: "Same tool, other doors",
    startOver: "Start over",
    startOverNote: "The plain version, no format in the name",
    footerLeft: "docstomd.com — a small tool, made by one person",
    footerRight: "runs in your browser · stores nothing · tracks nothing",
    langLabel: "Language",
    features: [
      "Convert .docx to Markdown",
      "Convert legacy .doc to Markdown",
      "Batch convert and download as zip",
      "Runs fully client-side, no upload",
      "Keeps tables, headings, lists and links",
    ],
  },
  converter: {
    dropTitle: "Drop a Word document here.",
    dropActive: "Let go.",
    dropHint:
      "Or pick one with the button. Or just paste with Ctrl+V. Dozens at a time is fine.",
    dropMeta:
      ".docx and .doc / 25 MB per file / runs in your browser, nothing uploaded",
    pick: "Pick a file",
    clear: "Clear",
    knobs: "Knobs",
    bullets: "Bullets",
    fence: "Fence",
    images: "Images",
    imageInline: "inline base64",
    imagePlaceholder: "keep a slot",
    imageStrip: "drop them",
    tables: "Tables",
    tableKeep: "keep",
    tableFlatten: "flatten",
    stale: "A knob moved. Drop the files in again to apply it.",
    queue: "Queue",
    zip: { one: "zip {n} file", other: "zip {n} files" },
    chewing: "chewing…",
    failed: "failed",
    tooBig: "Over 25 MB. Too big.",
    readFail: "Couldn't read it. The file may be damaged or password-protected.",
    pastedName: "pasted content",
    source: "source",
    preview: "preview",
    copy: "Copy",
    copied: "copied",
    download: "Download .md",
    legacyWarn: "Old .doc format — read what we could",
    styleWarn: {
      one: "{n} Word style did not line up",
      other: "{n} Word styles did not line up",
    },
    emptyDoc: "(empty document)",
    pickOne: "Pick one on the left to see the result.",
    chewingFirst: "Chewing the first one…",
    units: {
      words: { one: "{n} word", other: "{n} words" },
      headings: { one: "{n} heading", other: "{n} headings" },
      tables: { one: "{n} table", other: "{n} tables" },
      images: { one: "{n} image", other: "{n} images" },
      links: { one: "{n} link", other: "{n} links" },
    },
  },
  pages: {
    home: {
      short: "Home",
      title: "Docs to MD — Convert Word to Markdown, free and private",
      description:
        "Drop a .docx or .doc and get clean Markdown. Headings, tables, lists and links survive. Runs entirely in your browser — your files never leave your computer.",
      keywords: [
        "docs to md",
        "docx to markdown",
        "word to markdown",
        "doc to md converter",
        "convert word to markdown online",
      ],
      h1: ["Pull the words out of Word.", "Get clean Markdown."],
      lede: [
        "Drop a file in. Results in a few hundred milliseconds.",
        "Tables and headings stay put. Nothing gets uploaded.",
      ],
      note: {
        heading: "Straight up",
        items: [
          "Both .docx and old .doc, no Save As needed",
          "No signup, no limits, no watermark",
          "Works with your wifi off",
        ],
      },
      faq: [
        SHARED[0],
        LEGACY,
        SHARED[1],
        {
          q: "What happens to images?",
          a: "By default they get inlined as base64, so one .md file holds everything. If that makes the file too fat, switch to 'keep a slot' — you get the path, you bring the image.",
        },
        SHARED[2],
        {
          q: "Does every Word style map over?",
          a: "The ones people actually use do: headings, lists, bold, italic, strikethrough, quotes, code, links, super and subscript. When a custom style doesn't map, it gets listed above your result. Nothing is hidden from you.",
        },
      ],
    },
    "docx-to-markdown": {
      short: "DOCX → MD",
      title: "DOCX to Markdown Converter — free, in your browser",
      description:
        "Convert .docx to Markdown without uploading anything. Headings, tables, lists, links and code blocks come through clean. Old .doc files work too. Batch convert and download as a zip.",
      keywords: [
        "docx to markdown",
        "docx to markdown converter",
        "docx to md",
        "convert docx to markdown online",
        "docx to markdown free",
        "doc to markdown",
      ],
      h1: ["Turn .docx into Markdown.", "No upload, no signup."],
      lede: [
        "Built for the file Word actually saves. Drop it in, read the Markdown, take it.",
        "Everything happens on your machine.",
      ],
      note: {
        heading: "What you get",
        items: [
          "Real pipe tables, not mangled text",
          "Heading levels kept as # ## ###",
          "Forty files at once, one zip out",
        ],
      },
      faq: [
        {
          q: "What's the difference between .docx and .doc here?",
          a: "A .docx is a zip full of XML, so it reads cleanly and images come along. A .doc is OLE binary from 1997 — we parse it in your browser too, but images and list numbering can't be recovered from it. Same tool, one is just a richer file.",
        },
        SHARED[0],
        SHARED[1],
        {
          q: "Does it handle code blocks?",
          a: "Yes. Paragraphs styled as Code or Source Code become fenced blocks. Pick ``` or ~~~ with the fence knob.",
        },
        SHARED[2],
        {
          q: "Is there an API?",
          a: "Not yet. It's a browser tool by design — no server means no API to call. If you need one in a script, pandoc does this well offline.",
        },
      ],
    },
    "word-to-markdown": {
      short: "Word → MD",
      title: "Word to Markdown Converter — free, nothing uploaded",
      description:
        "Convert a Word document to Markdown in your browser. Takes .docx and old .doc. Keeps headings, tables, bold, links and lists. No account, no upload, no file size games.",
      keywords: [
        "word to markdown",
        "word to markdown converter",
        "word document to markdown",
        "convert word to markdown free",
        "word to md",
        "doc to markdown converter",
      ],
      h1: ["Word document in.", "Markdown out."],
      lede: [
        "For anyone who writes in Word and ships in Markdown.",
        "Drag the file over. Copy the result. Done in seconds.",
      ],
      note: {
        heading: "Straight up",
        items: [
          "Takes .docx and old .doc alike",
          "Formatting survives, junk gets dropped",
          "Nothing uploaded, nothing stored",
        ],
      },
      faq: [
        {
          q: "Which Word files work?",
          a: "Both formats. .docx from Word 2007 and newer, including Word on Mac and Word Online. Old .doc from Word 97–2003 works as well, minus images. Word 6 and 95 are too old.",
        },
        SHARED[0],
        {
          q: "What about track changes and comments?",
          a: "Both get dropped. You get the final text as it reads on the page, not the editing history. Accept or reject your changes in Word first.",
        },
        SHARED[1],
        {
          q: "Do footnotes come through?",
          a: "Footnote text lands at the end of the document. The little reference numbers don't survive as links — Markdown footnotes aren't universally supported, so we don't fake them.",
        },
        SHARED[2],
      ],
    },
    "google-docs-to-markdown": {
      short: "Google Docs → MD",
      title: "Google Docs to Markdown — export and convert, free",
      description:
        "Turn a Google Doc into clean Markdown. Download as .docx, drop it here, copy the Markdown. No add-on to install, no access to your Drive.",
      keywords: [
        "google docs to markdown",
        "google docs to markdown converter",
        "docs to markdown",
        "export google docs to markdown",
        "google doc to md",
      ],
      h1: ["Google Doc to Markdown.", "Two steps, no add-on."],
      lede: [
        "We never ask for your Drive. You export the file, we do the conversion.",
        "That way nothing of yours is ours.",
      ],
      note: {
        heading: "The two steps",
        items: [
          "In your Doc: File → Download → Microsoft Word (.docx)",
          "Drop that .docx below",
          "No OAuth, no permissions, no add-on",
        ],
      },
      faq: [
        {
          q: "Why do I have to download first?",
          a: "Because the alternative is asking for access to your entire Drive. An export takes you five seconds and hands us nothing. That trade is worth it.",
        },
        {
          q: "Google Docs already exports Markdown — why use this?",
          a: "Fair question. If the built-in export works for you, use it. This is for when you want the knobs: bullet style, fence style, whether images get inlined or slotted, and batch converting a folder of files at once.",
        },
        SHARED[0],
        SHARED[1],
        {
          q: "Do comments and suggestions come over?",
          a: "No. You get the document text, not the conversation around it. Resolve suggestions before exporting if you want them included.",
        },
        SHARED[2],
      ],
    },
  },
};

export default en;
