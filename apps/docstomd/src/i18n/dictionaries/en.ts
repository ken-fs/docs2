import { CONTACT_EMAIL } from "@/content/site";
import type { Dictionary, Faq } from "../types";

/** 每页都该有的那两三个问题，措辞不必因页面而变。 */
const PRIVACY: Faq = {
  q: "Do my files get uploaded?",
  a: "No. The whole thing runs in your browser. Your file never touches a server. Turn off your wifi and try it — still works.",
  shared: true,
};

const TABLES: Faq = {
  q: "Will my tables survive?",
  a: "Yes. They come out as standard Markdown pipe tables, and pipes inside cells get escaped. Merged cells are the one exception — Markdown has no syntax for them, so they get flattened.",
  shared: true,
};

const BATCH: Faq = {
  q: "How many files at once?",
  a: "No cap. Drop forty in and they queue up. Grab them all as one zip when it's done. Each file has to be under 25 MB.",
  shared: true,
};

const LEGACY: Faq = {
  q: "What about old .doc files?",
  a: "They work too. .doc is pre-2007 binary, so we read the format byte by byte in your browser. You get text, headings, tables, bold and italic. Two things don't come back: images and exact list numbering. If you have Word handy, a Save As .docx gives a cleaner result.",
  shared: true,
};

/** 上传 / 转换 / 拿走。文档类的三步都一样，只有第一步的文件类型不同。 */
const steps = (what: string) => [
  `Drop your ${what} onto the box above, or click to pick one. Dozens at a time is fine.`,
  "Conversion starts the moment the file lands — no button, no queue on a server. It takes a few hundred milliseconds.",
  "Read the Markdown, tweak the knobs if you want a different bullet or fence style, then copy it or download the .md.",
];

const en: Dictionary = {
  htmlLang: "en",
  chrome: {
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
    footerLegal: "The formal pages",
    legalContactCue: "Something here unclear, or something you want changed?",
    legalUpdated: "In effect since",
    guide: {
      cta: "Open the converter",
      pairedWith: "Uses",
      moreHeading: "The other guides",
    },
    features: [
      "Convert .docx to Markdown",
      "Convert legacy .doc to Markdown",
      "Convert PDF, HTML, CSV and Excel to Markdown",
      "Batch convert and download as zip",
      "Runs fully client-side, no upload",
      "Keeps tables, headings, lists and links",
    ],
  },
  converter: {
    dropTitle: "Drop a file here.",
    dropActive: "Let go.",
    dropHint:
      "Or pick one with the button. Or just paste with Ctrl+V. Dozens at a time is fine.",
    dropMeta: "25 MB per file / runs in your browser, nothing uploaded",
    elsewhereLead: "Other formats:",
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
    stale: "A knob moved. The other results are from the old settings — run them again to apply it.",
    queue: "Queue",
    zip: { one: "zip {n} file", other: "zip {n} files" },
    chewing: "chewing…",
    failed: "failed",
    tooBig: "Over 25 MB. Too big.",
    readFail: "Couldn't read it. The file may be damaged or password-protected.",
    wrongType: "This page doesn't take {ext} files. This one does:",
    wrongTypeAmbiguous:
      "This page doesn't take {ext} files. A {ext} could be any of these — pick the one that matches yours:",
    wrongTypeNowhere:
      "This page doesn't take {ext} files. This site converts Word, PDF, Excel, CSV and HTML — not {ext}.",
    pastedName: "pasted content",
    typedName: "pasted text",
    pasteHeading: "Or paste it here",
    pastePlaceholderHtml:
      "<h1>Paste HTML source here</h1>\n<p>Scripts and event handlers get stripped before anything is read.</p>",
    pastePlaceholderCsv: "name,role,city\nAda,engineer,London\nGrace,admiral,Arlington",
    pasteRun: "Convert",
    pasteClear: "Clear",
    header: "Header row",
    headerFirstRow: "first row",
    headerNone: "none",
    align: "Align",
    alignNone: "default",
    alignLeft: "left",
    alignCenter: "center",
    alignRight: "right",
    delimiter: "Delimiter",
    delimiterAuto: "auto",
    delimiterComma: "comma",
    delimiterSemicolon: "semicolon",
    delimiterTab: "tab",
    delimiterPipe: "pipe",
    pageMarks: "Page marks",
    pageMarksOn: "mark pages",
    pageMarksOff: "off",
    sheets: "Sheets",
    sheetsAll: "select all",
    sheetMeta: { one: "{n} row", other: "{n} rows" },
    source: "source",
    preview: "preview",
    copy: "Copy",
    copied: "copied",
    download: "Download .md",
    legacyWarn: "Old .doc format — read what we could",
    styleWarn: {
      one: "{n} thing worth knowing about this conversion",
      other: "{n} things worth knowing about this conversion",
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
      eyebrow: "Documents → Markdown",
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
      body: {
        stepsHeading: "How it works",
        steps: steps("Word document"),
        supportedHeading: "What's supported",
        supported: [
          ".docx from Word 2007 and later, including Word for Mac and Word Online",
          "Old .doc from Word 97–2003, read byte by byte in the browser",
          "Headings, tables, lists, links, bold, italic, strikethrough, quotes and code blocks",
          "Images inlined as base64, kept as a path, or dropped — your call",
          "Batch conversion with a single zip download",
        ],
        limitsHeading: "What it won't do",
        limits: [
          "Track changes and comments are dropped — you get the final text, not the editing history",
          "Merged table cells get flattened; Markdown has no syntax for them",
          "Footnote text lands at the end without linked reference numbers",
          "Password-protected files can't be opened — remove the password first",
          "Other formats have their own pages: PDF, HTML, CSV and Excel",
        ],
      },
      faq: [
        PRIVACY,
        LEGACY,
        TABLES,
        {
          q: "What happens to images?",
          a: "By default they get inlined as base64, so one .md file holds everything. If that makes the file too fat, switch to 'keep a slot' — you get the path, you bring the image.",
        },
        BATCH,
        {
          q: "Does every Word style map over?",
          a: "The ones people actually use do: headings, lists, bold, italic, strikethrough, quotes, code, links, super and subscript. When a custom style doesn't map, it gets listed above your result. Nothing is hidden from you.",
        },
      ],
    },
    "docx-to-markdown": {
      short: "DOCX → MD",
      eyebrow: "DOCX → Markdown",
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
      body: {
        stepsHeading: "How it works",
        steps: steps(".docx file"),
        supportedHeading: "What's supported",
        supported: [
          "Every .docx Word has written since 2007, plus Word Online and Word for Mac",
          "Old .doc as a bonus — the format is detected from the file header, not the extension",
          "Heading levels, pipe tables, nested lists, links, inline formatting and code blocks",
          "Embedded images, inlined as base64 or reduced to a path",
          "Dozens of files in one go, downloadable as a single zip",
        ],
        limitsHeading: "What it won't do",
        limits: [
          "Merged cells are flattened — Markdown pipe tables can't express them",
          "Track changes, comments and revision history are dropped",
          "Text boxes, SmartArt and charts don't come across; only their text, if any",
          "Encrypted documents are refused rather than half-read",
          "Files over 25 MB, and anything whose compression ratio looks like a zip bomb",
        ],
      },
      faq: [
        {
          q: "What's the difference between .docx and .doc here?",
          a: "A .docx is a zip full of XML, so it reads cleanly and images come along. A .doc is OLE binary from 1997 — we parse it in your browser too, but images and list numbering can't be recovered from it. Same tool, one is just a richer file.",
        },
        PRIVACY,
        TABLES,
        {
          q: "Does it handle code blocks?",
          a: "Yes. Paragraphs styled as Code or Source Code become fenced blocks. Pick ``` or ~~~ with the fence knob.",
        },
        BATCH,
        {
          q: "Is there an API?",
          a: "Not yet. It's a browser tool by design — no server means no API to call. If you need one in a script, pandoc does this well offline.",
        },
      ],
    },
    "word-to-markdown": {
      short: "Word → MD",
      eyebrow: "Word → Markdown",
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
      body: {
        stepsHeading: "How it works",
        steps: steps("Word file"),
        supportedHeading: "What's supported",
        supported: [
          "Both Word formats: .docx from 2007 onward and .doc from Word 97–2003",
          "Word for Mac and Word Online files, which are .docx under a different badge",
          "Headings as # ## ###, real pipe tables, ordered and bulleted lists",
          "Bold, italic, strikethrough, superscript, subscript, links and blockquotes",
          "A whole folder at once, out as one zip",
        ],
        limitsHeading: "What it won't do",
        limits: [
          "Word 6 and Word 95 files are too old to read",
          "Images don't come out of .doc — that format hides them where a browser can't reach",
          "Headers, footers and page numbers are page furniture, not document content, so they go",
          "Comments and tracked changes are dropped; accept or reject them in Word first",
          "Columns, text wrapping and page breaks have no Markdown equivalent",
        ],
      },
      faq: [
        {
          q: "Which Word files work?",
          a: "Both formats. .docx from Word 2007 and newer, including Word on Mac and Word Online. Old .doc from Word 97–2003 works as well, minus images. Word 6 and 95 are too old.",
        },
        PRIVACY,
        {
          q: "What about track changes and comments?",
          a: "Both get dropped. You get the final text as it reads on the page, not the editing history. Accept or reject your changes in Word first.",
        },
        TABLES,
        {
          q: "Do footnotes come through?",
          a: "Footnote text lands at the end of the document. The little reference numbers don't survive as links — Markdown footnotes aren't universally supported, so we don't fake them.",
        },
        BATCH,
      ],
    },
    "pdf-to-markdown": {
      short: "PDF → MD",
      eyebrow: "PDF → Markdown",
      title: "PDF to Markdown Converter — free, no upload, no OCR needed",
      description:
        "Extract text from a PDF as Markdown, right in your browser. Headings and paragraphs are rebuilt from font size and spacing. Text-layer PDFs only — scans need OCR, which this tool doesn't do.",
      keywords: [
        "pdf to markdown",
        "pdf to markdown converter",
        "pdf to md",
        "convert pdf to markdown online",
        "extract text from pdf to markdown",
        "pdf to markdown free",
      ],
      h1: ["Get the text out of a PDF.", "As Markdown, not a mess."],
      lede: [
        "A PDF has no headings — it has instructions for painting glyphs at coordinates.",
        "So we rebuild the structure from font size and spacing. Honest about where that guesses.",
      ],
      note: {
        heading: "Read this first",
        items: [
          "Text-layer PDFs only — scans have no text to extract",
          "No OCR, and we won't pretend otherwise",
          "Headings and paragraphs are inferred, not read",
        ],
      },
      body: {
        stepsHeading: "How it works",
        steps: [
          "Drop a PDF onto the box above. It's parsed with Mozilla's pdf.js, and both the library and its fonts are served from this site — nothing is fetched from a CDN.",
          "Text is pulled page by page in reading order. Font size decides what's a heading; vertical gaps decide where paragraphs break; small type at the top or bottom of a page is treated as a header or footer and dropped.",
          "Turn on page marks if you want an HTML comment between pages. Then copy the Markdown or download the .md.",
        ],
        supportedHeading: "What's supported",
        supported: [
          "Any PDF with a real text layer — exported from Word, LaTeX, Pages, a browser's Print to PDF",
          "Chinese, Japanese and Korean text, via the CMap tables bundled with this site",
          "Headings inferred from font size, in three relative levels",
          "Bulleted and numbered lists spotted from their leading characters",
          "Words hyphenated across a line break, rejoined into one word",
          "Optional page separator markers, and up to 500 pages per file",
        ],
        limitsHeading: "What it won't do",
        limits: [
          "Scanned PDFs produce nothing. If no text is found you'll be told the file is probably a scan.",
          "No OCR. Reading pictures of text needs a different tool entirely.",
          "Multi-column layouts, complex tables and formulas are best-effort at most",
          "Password-protected and encrypted PDFs are refused — there's nowhere here to type a password",
          "Images, colours and exact positioning are gone; Markdown has no way to hold them",
          "Files over 25 MB, or documents over 500 pages",
        ],
      },
      faq: [
        {
          q: "Why does my scanned PDF come out empty?",
          a: "Because there's nothing to extract. A scan is a photograph of a page — the letters are pixels, not characters. Reading them needs OCR, which this tool doesn't do, and we'd rather say so than hand you an empty file with no explanation.",
        },
        {
          q: "How do I know if my PDF has a text layer?",
          a: "Open it in any viewer and try to select a sentence with your mouse. If the text highlights, there's a text layer and this will work. If you get a rectangle over the whole page, it's a scan.",
        },
        PRIVACY,
        {
          q: "Why are the heading levels wrong?",
          a: "Because a PDF doesn't record them. We guess from font size: bigger than the body text by a little becomes ###, by a lot becomes #. What survives is the relative structure — which headings are peers. You may need to shift a few levels by hand.",
        },
        {
          q: "What happens to tables?",
          a: "Usually not much good. A table in a PDF is often just text at coordinates with lines drawn around it — there's no grid to read. Simple ones may come out as plain lines of text. If the table matters, and you have the original spreadsheet, the Excel or CSV page will do far better.",
        },
        {
          q: "Where did the page numbers go?",
          a: "Deliberately dropped. Small text pinned to the top or bottom margin is page furniture — page numbers, running heads, 'Confidential' stamps. Repeated on every page, it would shred the prose. Turn on page marks if you need to know where pages ended.",
        },
      ],
    },
    "excel-to-markdown": {
      short: "Excel → MD",
      eyebrow: "Excel → Markdown",
      title: "Excel to Markdown Table Converter — free, in your browser",
      description:
        "Convert an .xlsx workbook into Markdown tables. Pick which sheets you want, set the header row and column alignment. Runs in your browser — the file is never uploaded.",
      keywords: [
        "excel to markdown",
        "excel to markdown table",
        "xlsx to markdown",
        "convert excel to markdown online",
        "spreadsheet to markdown",
        "excel to md",
      ],
      h1: ["Spreadsheet to Markdown table.", "Pick your sheets."],
      lede: [
        "Drop an .xlsx in and get a proper pipe table for each sheet you want.",
        "You get the values as displayed, not the formulas behind them.",
      ],
      note: {
        heading: "Good to know",
        items: [
          "Multi-sheet workbooks: choose what to include",
          "Cell values, not formula source",
          "10 MB and 100,000 cells per run",
        ],
      },
      body: {
        stepsHeading: "How it works",
        steps: [
          "Drop an .xlsx onto the box above. Sheet names are read out of the workbook and listed for you.",
          "The first sheet is converted straight away. Click sheet names to add or remove them — the file is only read once, so switching is instant.",
          "Set whether the first row is a header and how columns should align, then copy the Markdown or download the .md.",
        ],
        supportedHeading: "What's supported",
        supported: [
          ".xlsx workbooks from Excel 2007 onward, and from LibreOffice, Numbers and Google Sheets exports",
          "Multiple sheets, each becoming its own table under an ## heading",
          "Displayed cell values — a formula cell gives you 42, not =SUM(A1:A9)",
          "Dates rendered as plain ISO dates rather than raw serial numbers",
          "Cells containing pipes or line breaks, escaped so the table doesn't break",
          "Header row on or off, and left, centre or right column alignment",
        ],
        limitsHeading: "What it won't do",
        limits: [
          "Files over 10 MB, or selections over 100,000 cells",
          "Old .xls is a different, much older format and isn't read here",
          "Password-protected workbooks are refused — save a copy without the password",
          "Merged cells, colours, fonts, conditional formatting, charts and pivot tables all go; Markdown has no syntax for any of them",
          "A formula cell whose file was generated by a program and never opened in Excel may have no cached value, and reads as empty",
        ],
      },
      faq: [
        {
          q: "Do I get the formula or the answer?",
          a: "The answer. Excel stores both the formula and its last computed result in the file; we read the result. =SUM(A1:A9) becomes 42. That's almost always what people want from a table.",
        },
        {
          q: "Why is a formula cell empty?",
          a: "Because the cached result isn't in the file. Excel writes it every time it saves, but a workbook generated by a script and never opened in Excel may not have one. Open it in Excel, save, and try again.",
        },
        {
          q: "Can I convert several sheets at once?",
          a: "Yes. Every sheet is listed once the file is read, and you can select any number of them. Each becomes its own table with the sheet name as a heading above it.",
        },
        PRIVACY,
        {
          q: "What happens to merged cells?",
          a: "They flatten. A Markdown pipe table is a plain grid — every row has the same number of cells, and there's no colspan. The value ends up in one cell and the rest come out empty.",
        },
        {
          q: "Why the 100,000 cell limit?",
          a: "Past that, rendering the preview in the browser starts to crawl, and a Markdown table that long isn't readable anyway. If you're over it, pick fewer sheets.",
        },
      ],
    },
    "csv-to-markdown": {
      short: "CSV → MD",
      eyebrow: "CSV → Markdown",
      title: "CSV to Markdown Table Converter — free, paste or upload",
      description:
        "Turn CSV into a Markdown table. Paste it or drop a file; commas, semicolons and tabs are detected automatically. Quoted fields with commas and line breaks are handled properly.",
      keywords: [
        "csv to markdown",
        "csv to markdown table",
        "convert csv to markdown",
        "tsv to markdown",
        "csv to md",
        "csv to markdown online",
      ],
      h1: ["CSV to a Markdown table.", "Paste it or drop it."],
      lede: [
        "Quoted commas, embedded line breaks, semicolon-separated European exports — all handled.",
        "The delimiter is detected for you, or pick it yourself.",
      ],
      note: {
        heading: "Good to know",
        items: [
          "Comma, semicolon, tab and pipe, detected automatically",
          "Quoted fields with commas and newlines parsed properly",
          "Your values are left exactly as written",
        ],
      },
      body: {
        stepsHeading: "How it works",
        steps: [
          "Paste your CSV into the box, or drop a .csv or .tsv file above. Either way it's parsed in your browser.",
          "The delimiter is detected automatically — comma, semicolon, tab or pipe. Set it yourself if the guess is wrong.",
          "Choose whether the first row is the header and how columns align, then copy the Markdown or download the .md.",
        ],
        supportedHeading: "What's supported",
        supported: [
          "Comma, semicolon, tab and pipe delimited files, detected or chosen by hand",
          "Proper RFC 4180 quoting: commas inside quoted fields, doubled quotes, line breaks inside a cell",
          "Semicolon exports from European locales, where the comma is the decimal separator",
          "A byte order mark at the start of the file, stripped so it doesn't stick to the first header",
          "Ragged rows — short rows are padded out to the widest and you're told it happened",
          "Header row on or off, and left, centre or right column alignment",
        ],
        limitsHeading: "What it won't do",
        limits: [
          "UTF-8 text only in this version — other encodings may come through garbled",
          "Up to 100,000 cells and 25 MB of text per run",
          "Values are never reinterpreted: 007 stays 007 and 1-2 stays 1-2, not a number or a date",
          "No column sorting, filtering or arithmetic — it converts, it doesn't compute",
          "A truly malformed file, with unbalanced quotes, may split in unexpected places",
        ],
      },
      faq: [
        {
          q: "My file uses semicolons. Will that work?",
          a: "Yes. Semicolon-separated exports are standard anywhere the comma is the decimal separator, and the delimiter is detected automatically. You'll see a note saying which one was found. You can also set it by hand.",
        },
        {
          q: "What about commas inside a cell?",
          a: "Handled, as long as the field is quoted — which is what any correct CSV writer does. \"Smith, John\" stays one cell. Line breaks inside a quoted field work too; they become <br> in the table, since a real newline would break the row in half.",
        },
        {
          q: "Why did my leading zeros survive?",
          a: "Because we don't reinterpret your values. Turning 007 into 7 or 1-2 into a date is a spreadsheet's worst habit. What you typed is what you get.",
        },
        PRIVACY,
        {
          q: "Can I convert without a header row?",
          a: "Yes, switch the header knob off. Note that a Markdown table has to have a header row — that's the syntax, there's no alternative — so you get an empty one instead, and all your rows land in the body.",
        },
        {
          q: "Does it handle TSV?",
          a: "Yes. Tab-separated files are just CSV with a different delimiter, and tabs are one of the four detected. Drop a .tsv or paste the content directly.",
        },
      ],
    },
    "html-to-markdown": {
      short: "HTML → MD",
      eyebrow: "HTML → Markdown",
      title: "HTML to Markdown Converter — free, safe, in your browser",
      description:
        "Convert HTML to clean Markdown. Paste the source or drop an .html file. Scripts, event handlers and dangerous tags are stripped before anything is read. GitHub-flavoured tables included.",
      keywords: [
        "html to markdown",
        "html to markdown converter",
        "convert html to markdown",
        "html to md",
        "html to markdown online",
        "web page to markdown",
      ],
      h1: ["HTML into Markdown.", "Sanitised on the way through."],
      lede: [
        "Paste the source or drop a saved page. Out comes GitHub-flavoured Markdown.",
        "Scripts and event handlers are removed first — untrusted HTML never reaches the page.",
      ],
      note: {
        heading: "Good to know",
        items: [
          "Scripts, onclick handlers and javascript: links stripped",
          "Tables come out as GFM pipe tables",
          "Paste from any page, or drop an .html file",
        ],
      },
      body: {
        stepsHeading: "How it works",
        steps: [
          "Paste HTML source into the box, or drop an .html file above. You can also copy from a rendered web page and press Ctrl+V anywhere on this page.",
          "The HTML is sanitised with DOMPurify first: script tags, event attributes, javascript: URLs, iframes and embeds are all removed before conversion, and nothing unsanitised is ever inserted into this page.",
          "What's left is converted to GitHub-flavoured Markdown. Copy it or download the .md.",
        ],
        supportedHeading: "What's supported",
        supported: [
          "Pasted HTML source, saved .html and .htm files, and rich text copied straight from a web page",
          "Headings, paragraphs, lists, links, images, blockquotes and preformatted code",
          "Tables as GitHub-flavoured pipe tables, including strikethrough and task lists",
          "Nested lists, and inline formatting inside table cells",
          "Whole-document files as well as fragments — a body isn't required",
        ],
        limitsHeading: "What it won't do",
        limits: [
          "Scripts, event handlers, iframes, objects and embeds are removed, not converted",
          "CSS is not applied — an element styled to look like a heading is still a paragraph in the HTML, and stays one",
          "It doesn't fetch anything: relative image and link URLs stay relative, and no page is downloaded for you",
          "Layout done with divs and CSS grid flattens into plain blocks",
          "Forms, buttons and interactive widgets have no Markdown equivalent",
        ],
      },
      faq: [
        {
          q: "Is it safe to paste HTML from anywhere?",
          a: "That's exactly what it's built for. Every input goes through DOMPurify before conversion — script tags, onclick-style attributes, javascript: URLs, iframes and embeds are gone. Nothing unsanitised is ever put into this page's DOM, so pasted HTML can't run.",
        },
        {
          q: "Can I give it a URL?",
          a: "No, and that's deliberate. Fetching a page for you would mean a server making requests on your behalf — the opposite of how this site works. Open the page yourself, copy what you want, and paste it here.",
        },
        PRIVACY,
        TABLES,
        {
          q: "Why is my styled text not a heading?",
          a: "Because CSS isn't part of the conversion. If the page used a div with a large font instead of an h2, the HTML says paragraph and so does the Markdown. Pages built with real heading tags convert far better.",
        },
        {
          q: "Does copying from a rendered page work?",
          a: "Yes. When you copy from a web page, your browser puts an HTML version on the clipboard alongside the plain text. Press Ctrl+V anywhere on this page and that HTML is what gets converted — formatting and links included.",
        },
      ],
    },
    "google-docs-to-markdown": {
      short: "Google Docs → MD",
      eyebrow: "Google Docs → Markdown",
      title: "Google Docs to Markdown — export and convert, free",
      description:
        "Turn a Google Doc into clean Markdown. Copy and paste it straight in, or download as .docx and drop it here. No add-on to install, no access to your Drive.",
      keywords: [
        "google docs to markdown",
        "google docs to markdown converter",
        "docs to markdown",
        "export google docs to markdown",
        "google doc to md",
      ],
      h1: ["Google Doc to Markdown.", "No add-on, no Drive access."],
      lede: [
        "We never ask for your Drive. You copy or export, we do the conversion.",
        "That way nothing of yours is ours.",
      ],
      note: {
        heading: "Two ways in",
        items: [
          "Select all in your Doc, copy, then paste here with Ctrl+V",
          "Or: File → Download → Microsoft Word (.docx), and drop it below",
          "No OAuth, no permissions, no add-on",
        ],
      },
      body: {
        stepsHeading: "How it works",
        steps: [
          "The quick way: open your Doc, select all, copy. Then press Ctrl+V anywhere on this page — the clipboard carries a rich-text version, and that's what gets converted.",
          "The thorough way: File → Download → Microsoft Word (.docx), then drop that file onto the box above. Images come across this way, and long documents hold their structure better.",
          "Either way, read the Markdown, then copy it or download the .md.",
        ],
        supportedHeading: "What's supported",
        supported: [
          "Pasting straight from a Doc, using the rich text your browser puts on the clipboard",
          "Downloaded .docx exports, which is the more complete route",
          "Headings, lists, tables, links, bold, italic and strikethrough",
          "Images, when you go via the .docx export",
          "Several exported documents at once, out as one zip",
        ],
        limitsHeading: "What it won't do",
        limits: [
          "No connection to your Google account — nothing here can see your Drive",
          "Comments and suggested edits are dropped; resolve them before exporting",
          "Pasting doesn't carry images, since the clipboard only references them on Google's servers",
          "Charts, drawings and smart chips come across as plain text at best",
          "Headers, footers and page numbers are page furniture and go",
        ],
      },
      faq: [
        {
          q: "Do I have to download the file first?",
          a: "No — copy and paste is usually enough. Select all in your Doc, copy, and press Ctrl+V here. Download as .docx when you want images too, or when the document is long enough that structure matters.",
        },
        {
          q: "Why don't you just connect to my Drive?",
          a: "Because it would mean asking for access to all your files, and running a server that holds a token for them. A copy-paste costs you two seconds and hands us nothing. That trade is worth it.",
        },
        {
          q: "Google Docs already exports Markdown — why use this?",
          a: "Fair question. If the built-in export works for you, use it. This is for when you want the knobs: bullet style, fence style, whether images get inlined or slotted, and batch converting a folder of files at once.",
        },
        PRIVACY,
        {
          q: "Do comments and suggestions come over?",
          a: "No. You get the document text, not the conversation around it. Resolve suggestions before exporting if you want them included.",
        },
        BATCH,
      ],
    },
    "pptx-to-markdown": {
      short: "PPTX → MD",
      eyebrow: "PPTX → Markdown",
      title: "PPTX to Markdown Converter — free, slides and speaker notes",
      description:
        "Convert a PowerPoint deck to Markdown in your browser. Each slide's title, bullets and speaker notes come through as plain sections. Takes .pptx, .ppt and OpenDocument .odp. Nothing is uploaded.",
      keywords: [
        "pptx to markdown",
        "powerpoint to markdown",
        "pptx to markdown converter",
        "convert pptx to markdown online",
        "ppt to md",
        "slides to markdown",
      ],
      h1: ["Pull the text out of a deck.", "Speaker notes included."],
      lede: [
        "Drop a .pptx in and get the words — slide titles, bullets, tables and the notes under each slide.",
        "It runs on your machine, so an internal deck is a fine thing to test with.",
      ],
      note: {
        heading: "Good to know",
        items: [
          "Slide titles become headings, in slide order",
          "Speaker notes come through, not just the slides",
          "Takes .pptx, old .ppt and OpenDocument .odp",
        ],
      },
      body: {
        stepsHeading: "How it works",
        steps: [
          "Drop a .pptx, .ppt or .odp onto the box above, or click to pick one. Dozens at a time is fine.",
          "The deck is read in your browser by anydoc, a Rust converter compiled to WebAssembly — the code is served from this site, so nothing is fetched from a CDN and no file is uploaded.",
          "Each slide comes out as its own section: the title as a heading, the body as text and lists, the speaker notes after it. Read it, then copy the Markdown or download the .md.",
        ],
        supportedHeading: "What's supported",
        supported: [
          ".pptx from PowerPoint 2007 onward, plus PowerPoint for Mac and the web",
          "Old .ppt from PowerPoint 97–2003, read from its binary format",
          "OpenDocument .odp presentations from LibreOffice Impress and Google Slides exports",
          "Slide titles as headings, bullet and numbered lists at their nesting depth",
          "Speaker notes, tables on a slide, and embedded links",
          "Dozens of files in one go, downloadable as a single zip",
        ],
        limitsHeading: "What it won't do",
        limits: [
          "The visual layout is gone — a deck is a canvas of positioned boxes, and Markdown is a single column of text",
          "Images come through as alt text, not embedded; a slide that's mostly a picture reads thin",
          "Animations, transitions, and embedded video or audio have no text equivalent",
          "SmartArt, charts and WordArt come across as their text at best, often as nothing",
          "Password-protected decks are refused rather than half-read — remove the password first",
          "Files over 25 MB, and anything whose compression ratio looks like a zip bomb",
        ],
      },
      faq: [
        {
          q: "Do the speaker notes come through?",
          a: "Yes, and that's often the point. Each slide's notes land right after the slide's content, so a deck you narrated still carries what you meant to say. If a slide has no notes, nothing is added.",
        },
        PRIVACY,
        {
          q: "What happens to the images on my slides?",
          a: "They come through as alt text — the description PowerPoint stored, in a placeholder — not as embedded pictures. A deck is a visual medium, so a slide that's mostly a diagram or a screenshot will read thin. The words, titles and notes are what survive.",
        },
        {
          q: "Why is there no layout, just a list of sections?",
          a: "Because a slide is a canvas: text boxes, images and shapes placed at coordinates. Markdown is one column of text, top to bottom. So each slide is flattened to a section in slide order — the reading you'd get top-to-bottom, not the arrangement on the page.",
        },
        {
          q: "Does old .ppt work, or only .pptx?",
          a: "Both, plus OpenDocument .odp. The format is detected from the file itself, not the extension, so a .ppt renamed to .pptx still reads correctly. Charts and images are thinner in the older format, but titles, text and notes come across.",
        },
        BATCH,
      ],
    },
  },
  legal: {
    about: {
      short: "About",
      eyebrow: "About this site",
      title: "About Docs to MD — who makes it and why",
      description:
        "Docs to MD is a free browser-based document converter built by one independent developer. No accounts, no uploads, no tracking. Here's how it works and why it was built this way.",
      h1: "A small tool, and the reasoning behind it",
      lede: [
        "Docs to MD turns documents into Markdown. That's the whole product.",
        "It's built and maintained by one independent developer, and it runs entirely inside your browser.",
      ],
      sections: [
        {
          heading: "Why this exists",
          body: [
            "Writing happens in Word, Google Docs and spreadsheets. Publishing happens in Markdown — in a static site, a wiki, a README, a docs folder in a git repository. The gap between the two gets crossed by hand more often than it should, and doing it by hand means retyping headings, rebuilding tables and re-adding links.",
            "There is no shortage of converters that do this. Almost all of them work the same way: you upload your file to a server, a program there converts it, and you download the result. That's a reasonable design, and it's also a design where your document sits on someone else's computer for a while. For a blog draft that's fine. For a contract, a medical record, a set of internal figures or an unpublished manuscript, it isn't.",
            "So this site is built the other way around. The conversion runs in your browser, with JavaScript, on your own machine. There is no upload step because there is nowhere to upload to.",
          ],
        },
        {
          heading: "How it actually works",
          body: [
            "When you drop a file in, your browser reads it locally and hands the bytes to a parser that is also running in your browser. The parser turns the document into a structure, and that structure is written out as Markdown. All of it happens between your file and your screen.",
            "The parsers are open-source libraries, chosen per format:",
          ],
          items: [
            "Mammoth reads .docx. Legacy .doc is parsed by our own reader, byte by byte, since it's a pre-2007 binary format with no library that runs in a browser.",
            "Mozilla's pdf.js reads PDFs. It, and its font and character-map data, are served from this site rather than a CDN — a document parser fetching things from third parties would undo the point.",
            "DOMPurify sanitises HTML before anything is read, and Turndown converts the cleaned HTML into Markdown.",
            "Papa Parse reads CSV and TSV; read-excel-file reads .xlsx workbooks.",
          ],
        },
        {
          heading: "What it deliberately doesn't do",
          body: [
            "There are no accounts, because there's nothing to store. There's no API, because there's no server to call. There's no OCR, so scanned PDFs won't work — and the tool says so rather than handing you an empty file. There's no Google Drive connection, because that would mean asking for access to all your files and holding a token for them.",
            "Every conversion also has real limits, and each tool page lists its own. Merged table cells flatten, because Markdown pipe tables can't express them. Tracked changes are dropped. A PDF's heading levels are inferred from font size, not read, because a PDF doesn't record them. Those are stated up front rather than discovered after you've converted something important.",
          ],
        },
        {
          heading: "How it's paid for",
          body: [
            "The tool is free and has no paid tier. The plan is to cover hosting with advertising, which is why you may see ads on these pages in future. Ads will never be placed so as to be mistaken for a download or convert button, and they won't be injected after a conversion in a way that shifts the page under your cursor.",
            "Advertising does not change how conversion works. Your files stay on your machine either way — that isn't a policy decision that could be reversed for revenue, it's a consequence of there being no server in the first place.",
          ],
        },
        {
          heading: "The sister site",
          body: [
            "Docs2HTML does the same job in the other direction: Markdown, DOCX, CSV and Excel into HTML. Same approach, same privacy model, different output format.",
          ],
        },
      ],
    },
    contact: {
      short: "Contact",
      eyebrow: "Get in touch",
      title: "Contact Docs to MD",
      description:
        "Email us about a file that won't convert, a translation that reads badly, a bug, or a feature you want. One developer reads everything.",
      h1: "Write to us",
      lede: [
        "One person reads this inbox, so replies aren't instant — but they're real replies, not a ticket number.",
        `Email: ${CONTACT_EMAIL}`,
      ],
      sections: [
        {
          heading: "A file won't convert",
          body: [
            "This is the most useful thing you can report, and also the trickiest, because we can't see your file. So please describe it instead of sending it:",
          ],
          items: [
            "Which page you were on, and what the file extension is",
            "What you expected, and what you got — an error message, an empty result, a mangled table",
            "Roughly how big the file is, and what produced it (Word 2021, Google Docs export, a script, a scanner)",
            "Your browser and operating system, since parsing behaviour can differ between them",
          ],
        },
        {
          heading: "Please don't email us your documents",
          body: [
            "The point of this site is that your files stay on your computer. Emailing one to us defeats that on your end and puts us in a position we'd rather not be in on ours. If you can reproduce the problem with a file that doesn't matter — a couple of headings and a table typed into a fresh document — that's genuinely more useful anyway, because it isolates the bug.",
            "If a problem truly can't be reproduced without the original file, write first and we'll work out what's needed. Usually the answer is a description of the structure, not the content.",
          ],
        },
        {
          heading: "Translations",
          body: [
            "This site is in six languages. English is the original and the rest were translated with care, but a native speaker will still catch things a careful translation misses — a phrase that's technically right and reads oddly, a term the local software world says differently.",
            "If you spot one, tell us which language and which page, and quote the phrase. Small corrections are welcome and get applied quickly.",
          ],
        },
        {
          heading: "Features, and things we won't build",
          body: [
            "Feature requests are read and often built, especially small ones — a knob for an output style, support for a format variant, a delimiter we don't detect.",
            "Some things are out of scope by design, and asking won't change them: uploading files to a server, an OCR engine for scanned PDFs, a Google Drive integration, or user accounts. Each of those would require the site to hold your data. It's the one thing this tool is built not to do.",
          ],
        },
        {
          heading: "Privacy and legal",
          body: [
            "Questions about what data this site collects, or requests concerning your data under GDPR, CCPA or similar law, go to the same address. Read the privacy policy first — the short version is that we don't collect anything that identifies you, which makes most such requests moot, and the policy explains exactly why.",
          ],
        },
      ],
    },
    privacy: {
      short: "Privacy",
      eyebrow: "Privacy policy",
      title: "Privacy Policy — Docs to MD",
      description:
        "What Docs to MD does and doesn't collect. Your documents are processed in your browser and never uploaded. No accounts, no analytics on your files, no selling data.",
      h1: "Privacy policy",
      lede: [
        "The documents you convert here never leave your computer. That's not a promise about how we handle your data — there is no step where we receive it.",
        "This page explains that in detail, and is honest about the parts where a third party is involved.",
      ],
      sections: [
        {
          heading: "Your documents",
          body: [
            "Files you drop, pick or paste on this site are read by your own browser and converted by code running on your own machine. They are not transmitted to us, to a hosting provider, or to anyone else. There is no server-side conversion, no queue, no temporary storage and no cache of your content.",
            "Nothing is written to your device either. We don't save your files or their converted output to local storage, IndexedDB, or a cookie. Close the tab and the content is gone; the only copies are the file you started with and anything you deliberately copied or downloaded.",
            "You can verify all of this. Turn off your network connection and convert a file — it still works. Or open your browser's developer tools, watch the Network tab, and confirm that dropping a file produces no upload.",
          ],
        },
        {
          heading: "What we do collect",
          body: [
            "We don't ask for or store your name, email address, or any account details, because there are no accounts.",
            "The site is hosted on Cloudflare Pages. Like any web host, it processes standard request data when your browser asks for a page — IP address, user agent, the URL requested, and the time. This is inherent to how the web works and is used for delivering the site and blocking abuse. We use it in aggregate to see which pages get traffic. It is not linked to anything you convert, because your conversions never reach any server.",
          ],
        },
        {
          heading: "Cookies and advertising",
          body: [
            "The site itself sets no cookies. It has no login, no shopping cart and no preferences to remember across visits, so there's nothing for a cookie to hold.",
            "We intend to show advertising from Google AdSense to cover hosting costs. When that is enabled, Google may set cookies or read device identifiers to serve and measure ads, in accordance with its own policies. That is the one part of this site where a third party sees something about your visit — and it's about the page you're on, not the document you converted, which Google has no way of seeing.",
            "If you're in the European Economic Area, the United Kingdom or Switzerland, you will be asked for consent before any non-essential cookies are used, and you can withdraw it later. The cookie policy explains the categories and how to change your mind.",
          ],
        },
        {
          heading: "Third parties",
          body: [
            "The list is deliberately short:",
          ],
          items: [
            "Cloudflare Pages hosts the static files that make up this site.",
            "Google AdSense, once enabled, serves the advertising described above.",
            "Google Fonts files are self-hosted, served from this domain, so requesting a page doesn't tell Google you visited.",
            "No analytics platform, session recorder, heatmap, chat widget or social embed is loaded on any page.",
          ],
        },
        {
          heading: "Children",
          body: [
            "This is a document conversion utility with no social features and no accounts. It isn't directed at children under 13, and since we don't collect personal information from anyone, we don't knowingly collect it from children.",
          ],
        },
        {
          heading: "Your rights",
          body: [
            "Under the GDPR, the CCPA and similar laws you have rights to access, correct, delete and port your personal data, and to object to its processing. We honour all of them — and in practice, requests are unusually simple to answer here, because we hold no file you've converted and no profile of you to hand over, correct or delete.",
            "For the advertising cookies described above, the controller is Google, and its own tools give you the most direct control over ad personalisation. Write to us and we'll point you to the right place.",
          ],
        },
        {
          heading: "Changes to this policy",
          body: [
            "If this policy changes materially — a new third party, a new category of data — the date at the top of this page changes with it. Since the site holds no email addresses, we can't notify you directly, so the date is the honest signal to watch.",
          ],
        },
      ],
    },
    terms: {
      short: "Terms",
      eyebrow: "Terms of service",
      title: "Terms of Service — Docs to MD",
      description:
        "The terms for using Docs to MD: free to use for any purpose, provided as-is, you keep all rights to your documents, and you check the output before relying on it.",
      h1: "Terms of service",
      lede: [
        "Using this site means accepting what's below. It's short, because a free browser tool that stores nothing doesn't need much.",
      ],
      sections: [
        {
          heading: "What you may do with it",
          body: [
            "Use it for anything, including commercial work. Convert as many files as you like. No account, no licence key, no attribution required, and no limit on how the output is used.",
            "There are two practical caveats, and they exist for the tool's benefit rather than ours: each file must be under the size limit shown on the page, and conversion runs on your machine, so a very large document is limited by your own memory and processor rather than by a quota we set.",
          ],
        },
        {
          heading: "Your documents remain yours",
          body: [
            "You keep every right you had in the files you convert, and in the Markdown that comes out. We claim no licence to either, and couldn't make use of them if we wanted to — the conversion happens in your browser and your content never reaches us.",
            "You are responsible for having the right to convert what you convert. If a document isn't yours to process, this tool doesn't change that.",
          ],
        },
        {
          heading: "Provided as-is",
          body: [
            "The site is free and comes with no warranty. We aim for accurate conversion and document the known limits of each format on its own page, but no converter is perfect, and we can't guarantee that any particular document will convert correctly or completely.",
            "Check the output before you rely on it. That matters most where structure is inferred rather than read: heading levels in a PDF are guessed from font size, merged table cells are flattened, tracked changes are dropped, and complex layouts don't survive. For anything consequential — legal, financial, medical, academic — compare the Markdown against the original.",
            "To the extent the law allows, we're not liable for lost data, lost work, lost profit or other damages arising from using the site or relying on its output.",
          ],
        },
        {
          heading: "Acceptable use",
          body: [
            "Don't use the site to process material you have no right to, and don't use it in ways that damage it or others:",
          ],
          items: [
            "Don't attempt to break, overload or find vulnerabilities in the site with a view to harming it or its users. If you find a security problem, please report it instead.",
            "Don't scrape or automate the site in a way that degrades it for other people.",
            "Don't republish the site as your own, or present it as if it were operated by someone else.",
            "Don't interfere with, block or artificially inflate the advertising that funds hosting.",
          ],
        },
        {
          heading: "The software it's built on",
          body: [
            "This tool stands on open-source libraries — Mammoth, Turndown, DOMPurify, pdf.js, Papa Parse, read-excel-file and others — each under its own licence, with notices retained in the distributed code. Their licences cover those components; these terms cover this site.",
          ],
        },
        {
          heading: "Availability and changes",
          body: [
            "This is a free service run by one person. We may change how it works, add or remove a format, or take it offline, without notice. Because nothing of yours is stored here, an outage costs you access to a converter and nothing more.",
            "If these terms change, the date at the top of this page changes with them. Continuing to use the site after that means accepting the revised version.",
          ],
        },
      ],
    },
    cookies: {
      short: "Cookies",
      eyebrow: "Cookie policy",
      title: "Cookie Policy — Docs to MD",
      description:
        "Which cookies Docs to MD uses. The site itself sets none. Advertising, once enabled, may set cookies — and in the EEA, UK and Switzerland only with your consent.",
      h1: "Cookie policy",
      lede: [
        "This site sets no cookies of its own. There's no login and nothing to remember between visits.",
        "The exception is advertising, and this page says exactly what that involves.",
      ],
      sections: [
        {
          heading: "What a cookie is, briefly",
          body: [
            "A cookie is a small piece of text a site asks your browser to keep and send back on later visits. It's how a site recognises that two page loads came from the same browser — useful for staying logged in, and equally useful for tracking. Related technologies like local storage and device identifiers do much the same job by different means, and are covered here too.",
          ],
        },
        {
          heading: "Cookies this site sets",
          body: [
            "None. Not one, at the time of writing.",
            "There's no account to stay logged into, no cart, and no cross-visit preference to store. Even the settings on the converter — bullet style, fence style, header row, alignment — live only in the page while you have it open, and reset when you reload. Your files and their converted output are likewise never written to local storage, IndexedDB or a cookie.",
          ],
        },
        {
          heading: "Advertising cookies",
          body: [
            "Hosting is paid for by advertising, and we intend to use Google AdSense. When it's live, Google may set cookies or read device identifiers in order to serve ads, cap how often you see the same one, and measure clicks. In some configurations those cookies are used to personalise ads based on your browsing elsewhere.",
            "These cookies are set by Google, not by us, and Google is the controller for the data they carry. What they can see is the page you're on. What they cannot see is anything you convert — that never leaves your browser, so there is nothing for an ad script to read.",
          ],
        },
        {
          heading: "Consent, if you're in Europe",
          body: [
            "If you're in the European Economic Area, the United Kingdom or Switzerland, non-essential cookies are only used after you've agreed. You'll be asked once, through a consent dialogue, and you can decline and keep using every part of the site — nothing here is gated behind consent.",
            "You can change your answer at any time through the same dialogue, reachable from the footer once advertising is enabled. Withdrawing consent stops further non-essential cookies being set.",
          ],
        },
        {
          heading: "Controlling cookies yourself",
          body: [
            "Independently of anything on this site, your browser gives you the final say:",
          ],
          items: [
            "Every major browser can block third-party cookies outright, in its privacy settings.",
            "You can delete existing cookies for a site, or for all sites, at any time.",
            "Private or incognito windows discard cookies when you close them.",
            "Google's own ad settings let you turn off personalised advertising across sites that use its network.",
          ],
        },
        {
          heading: "Changes",
          body: [
            "If this site starts using a cookie it doesn't use today, this page is updated before that happens, and the date at the top changes. If you want to know what's set right now rather than take our word for it, your browser's developer tools will show you the whole list under Application or Storage.",
          ],
        },
      ],
    },
  },
  guideIndex: {
    short: "Guides",
    eyebrow: "Guides",
    title: "Guides — the awkward parts of converting documents to Markdown",
    description:
      "Seven walkthroughs: six for the conversions that don't come out right the first time — Word formatting, PDF layout, Google Docs pastes, messy HTML, CSV tables, Excel formulas — and one on converting without uploading the file at all.",
    h1: "Guides",
    lede: [
      "Every converter has a page that says what it does. These are for what comes after — the file that converted badly, and the reason why.",
      "One guide per conversion engine, plus one on keeping the file off the network — all written from the questions people actually send in. Each links straight to the tool it's about.",
    ],
  },
  guides: {
    "word-to-markdown-without-uploading": {
      short: "No upload",
      eyebrow: "Guide · Word → Markdown",
      title: "Convert Word to Markdown without uploading the file anywhere",
      description:
        "The .docx is unzipped in this browser tab, not sent to a server. How to confirm that yourself, why a plain-text result is the private part, and what converting in the browser still can't protect.",
      keywords: [
        "convert word to markdown without uploading",
        "offline word to markdown converter",
        "private docx to markdown",
        "is it safe to convert word to markdown online",
        "word to markdown no upload",
      ],
      h1: "Turning Word into Markdown without the file leaving your computer",
      lede: [
        "Most online converters take your file, send it to a server, and hand back the result. This one sends nothing — the .docx is opened right here, in the tab.",
        "That matters most for the documents you'd hesitate to upload: a contract, an unreleased draft, anything with a client's name in it. So it's worth checking the claim rather than taking it on faith.",
      ],
      tool: "word-to-markdown",
      sections: [
        {
          heading: "Where the file goes: nowhere",
          body: [
            "A .docx is a zip archive. Opening it means unzipping it and reading the XML inside, and every step of that runs in JavaScript on this page — the same code the browser already downloaded when the page loaded.",
            "There is no upload because there is nothing to upload to. The tool is a handful of static files; nothing behind it is waiting for your document. The bytes stay on the machine you're sitting at.",
          ],
        },
        {
          heading: "Confirm it: pull the network cable",
          steps: [
            "Load this page once, then switch off wifi or unplug the network.",
            "Drop a .docx in. It converts exactly as before — offline, with nowhere to send it.",
            "Want proof instead of a demo? Open developer tools, watch the Network tab, and convert a file. Nothing goes out carrying it.",
          ],
          body: [
            "An offline conversion is the entire argument in one gesture: code that phones home cannot work with the phone unplugged.",
          ],
        },
        {
          heading: "The plain-text result is the private part",
          body: [
            "Markdown is plain text. Every character of the output is on the screen in front of you, and you can read all of it before pasting it anywhere — there is no hidden layer left to trust.",
            "A .docx is the opposite. It carries author names, an editing history, revision marks and template paths, tucked where you never see them. Converting to Markdown leaves that behind: the words come through, the buried metadata does not, because plain text has nowhere to keep it.",
          ],
        },
        {
          heading: "What an ordinary online converter does instead",
          body: [
            "It uploads. Your file lands in temporary storage on someone else's computer, is converted there, and is meant to be deleted afterwards — on a schedule you can't see and can't check.",
            "For a meme, fine. For anything under an NDA, \"deleted within an hour\" is a promise, and a promise is a different thing from a file that was never sent.",
          ],
        },
        {
          heading: "What converting in the browser can't do",
          body: [
            "It's fair to name the edges. Keeping the file off the network says nothing about what you do with the result: paste the Markdown into a public gist and it's public, however it got there.",
            "Anything already watching your own machine still sees it — a browser extension with access to the page, or malware, reads what you read. Converting locally removes the upload, not every risk. What it removes is the largest one: a copy of your document resting on a stranger's server.",
          ],
        },
      ],
      outro:
        "Unplug the network if you want to be sure, then drop the .docx in. It's unzipped in this tab and goes no further.",
    },
    "word-to-markdown-keep-formatting": {
      short: "Word formatting",
      eyebrow: "Guide · Word → Markdown",
      title: "Convert Word to Markdown: what formatting survives, and what doesn't",
      description:
        "Which parts of a .docx come through as Markdown and which are dropped on purpose. Headings, lists, tables and emphasis survive as structure; fonts, colours and page layout don't. How to tell them apart before you convert.",
      keywords: [
        "word to markdown keep formatting",
        "docx to markdown formatting",
        "convert word to markdown preserve formatting",
        "word document to markdown without losing formatting",
        "docx to clean markdown",
      ],
      h1: "What survives when Word becomes Markdown",
      lede: [
        "\"Keep the formatting\" means two different things, and which one you mean decides whether you'll like the result.",
        "One of them survives: the outline. Headings, lists, tables, emphasis — the parts that say how the document is put together. The other one, the look of it, has nowhere to go, because Markdown is plain text and plain text has no fonts, colours, margins or page breaks. That's the format's ceiling, not a missing feature.",
      ],
      tool: "word-to-markdown",
      sections: [
        {
          heading: "Structure survives, appearance doesn't",
          body: [
            "Open a .docx and every paragraph carries a style name alongside its formatting. The style name is the part with meaning — Heading 2, List Paragraph, Quote — and the formatting is only how Word chose to draw it today.",
            "The converter reads the first and discards the second. A Heading 2 becomes ## — not text with a font size attached. Wherever the Markdown ends up, it picks up that project's own heading style.",
            "Markdown has no syntax for a typeface or a margin, which means there is no version of this that keeps them. If you need the page to look identical, you want a PDF, not Markdown.",
          ],
        },
        {
          heading: "The # signs come from real heading styles",
          body: [
            "This is the one thing worth doing in Word before you convert, and it's the difference between good output and a wall of paragraphs.",
            "A line you enlarged and bolded by hand is still a normal paragraph as far as the file is concerned, so it converts to a paragraph. No rule could turn 16pt-and-bold back into ## without also mangling every emphasised sentence in the document.",
          ],
          steps: [
            "In Word, click into one of your headings and glance at the Styles gallery. A highlighted Normal is the whole problem in one word.",
            "Pick Heading 1, 2 or 3 from that gallery. The look will change — edit the style's definition if the new look bothers you, rather than going back to sizing by hand.",
            "Do the same for lists — use the list buttons rather than typing \"1.\" and a tab. Hand-typed numbers convert to literal text that no longer renumbers.",
            "Convert, then scan the output for # and -. A file with no # in it was never structured to begin with.",
          ],
        },
        {
          heading: "What comes through",
          body: [
            "Heading levels one through six, from Word's styles. Word's Title and Subtitle styles map to # and ## as well, since that's what they mean.",
            "Bold as **, italic as _, strikethrough as ~~. Superscript and subscript stay as <sup> and <sub> — Markdown has no syntax for them and dropping them would change what a formula or a footnote marker says.",
            "Links, ordered and unordered lists at any nesting depth, blockquotes from the Quote and Intense Quote styles, and paragraphs styled Code or Preformatted as fenced code blocks.",
          ],
          sample: {
            beforeLabel: "In Word",
            before: "A nested bulleted list,\nand a numbered list starting at 3",
            afterLabel: "Markdown",
            after: "- Outer\n  - Inner\n- Second\n\n3. Third\n4. Fourth",
          },
        },
        {
          heading: "What gets dropped, and why",
          body: [
            "Fonts, sizes, colours, highlighting, alignment, indentation, line spacing, page breaks, headers, footers and margins. All of it is presentation belonging to a page, and Markdown isn't a page.",
            "Underline is the drop most likely to surprise you. Markdown has no underline, and the nearest thing — a link — would be worse than nothing, so underlined text comes out as plain text.",
            "Track changes and comments go: you get the final text, not the editing history. Text boxes, SmartArt and charts don't survive either, only their text if they hold any. Word will also tell the converter about styles it couldn't map; those notes appear above the output, deduplicated and capped at eight, with a line saying how many more there were.",
          ],
        },
        {
          heading: "Tables come through, merges don't",
          body: [
            "Tables become standard pipe tables. Pipes inside cell text are escaped as \\| so a cell containing a pipe doesn't split the row in two, and rows shorter than the widest row are padded out so the table stays rectangular.",
            "Merged cells are the exception, and it's a hard one: Markdown has no colspan or rowspan. A cell merged across two columns keeps its text and leaves an empty cell beside it. If the merges carry meaning, unmerge them in Word first — often they were only there to centre a title.",
            "Cells hold inline formatting fine — bold, italic, code, links. Block content inside a cell does not survive as blocks: a bulleted list in a cell comes out as its items run together, because a pipe table row is one line.",
          ],
          sample: {
            beforeLabel: "In Word",
            before: "Header cell merged across two columns",
            afterLabel: "Markdown",
            after: "| Merged head |  |\n| --- | --- |\n| 1 | 2 |",
          },
        },
        {
          heading: "Images, and the one thing .doc can't give you",
          steps: [
            "Inline base64 embeds every image in the Markdown itself. One self-contained file, no missing pictures — but a data URI is about a third larger than the image was, and it makes the file unpleasant to read in a text editor.",
            "Keep a slot writes ![alt](./images/name.png) and leaves the file to you. Use this when the Markdown is going into a repo that already has an images folder. The name is built from the alt text, lowercased and hyphenated.",
            "Drop them removes images entirely. Right for a text-only export, wrong if you'll wonder later what was there.",
          ],
          body: [
            "Old .doc files are the exception. That format is pre-2007 binary, read here byte by byte in your browser, and images can't be recovered from it at all — nor can exact list numbering. Text, headings, tables, bold and italic do come through, and the output says it took that route so you're not left guessing. If Word is handy, a Save As .docx gives a cleaner result.",
            "One more thing worth knowing: Word hyperlinks often carry tracking parameters, and documents saved out of Google Docs wrap their links in a google.com/url redirect. Both are unwound to the real destination, and the output says so — changing where a link points is worth being told about.",
          ],
        },
      ],
      outro:
        "Fix the heading styles, then drop the file in. Nothing is uploaded — the .docx is unzipped in this tab — so an unreleased draft is a fine thing to test with.",
    },
    "pdf-to-markdown-layout": {
      short: "PDF layout",
      eyebrow: "Guide · PDF → Markdown",
      title: "PDF to Markdown: why headings and paragraphs come out wrong",
      description:
        "A PDF has no headings, paragraphs or lists — only glyphs at coordinates. Here's how structure gets inferred from font size and spacing, what that gets wrong, and why a scanned page produces nothing at all.",
      keywords: [
        "pdf to markdown",
        "convert pdf to markdown",
        "pdf to markdown headings",
        "pdf to md converter",
        "scanned pdf to markdown",
      ],
      h1: "PDF to Markdown, and why the structure is guesswork",
      lede: [
        "Every other converter here reads structure that's genuinely in the file. This one can't, because a PDF doesn't have any.",
        "What a PDF stores is characters at coordinates with a font size. \"This is a heading\" isn't in there. So the structure is inferred, and knowing how it's inferred tells you exactly when it will be wrong.",
      ],
      tool: "pdf-to-markdown",
      sections: [
        {
          heading: "There is no structure in a PDF",
          body: [
            "A PDF is a print format. Its job is to put the right glyph at the right spot on the page, and it does that by storing text runs with a position and a font. Nothing in the file says which of them is a heading, where one paragraph ends, or that six lines are a bulleted list.",
            "So a Word document converts; a PDF gets reconstructed. Everything below is a heuristic, and every heuristic has cases it gets wrong. That's why one warning appears above the output on every single PDF conversion, whether or not anything looked odd.",
            "If you have the original .docx, use it instead. It converts properly, because the structure is really in it.",
          ],
        },
        {
          heading: "How headings are found",
          body: [
            "First the body text size is worked out: every line's font size is tallied, weighted by how many characters it holds, and the most common one wins. Weighting by characters rather than by lines matters — one long paragraph line says more about what the body size is than one short heading line does.",
            "A line is then a heading if it's meaningfully bigger than that, and short. The size ratio picks the level: 1.6× or more becomes #, 1.35× becomes ##, and 1.15× becomes ###. The original heading levels are gone, so what's preserved is only the relative relationship — these headings are the same rank as each other.",
            "The length limit is 120 characters, and it's there for a specific failure: a document whose opening paragraph is set in large type is not a heading, and font size alone can't tell the difference. Length can.",
            "This is also the heuristic that misses most often. A document that styles its headings by weight rather than size — bold at the same size as the body — has no size signal at all, and those headings come out as paragraphs.",
          ],
        },
        {
          heading: "Page furniture, paragraphs and lists",
          body: [
            "Headers and footers are dropped when they're both smaller than the body text and sitting within 9% of the page height from the top or bottom edge. Proportional rather than a fixed measurement, so A4 and Letter behave the same. A page number or a \"Confidential\" stamp repeated on every page would otherwise interrupt the text forty times.",
            "A paragraph break is a vertical gap wider than 1.8× the line's own font size. That's how a PDF expresses one, since there's no paragraph mark to read.",
            "Lists are found by their first characters: a bullet glyph (•, ·, ▪, ◦, ‣, ∙) or a number up to three digits followed by a dot or a closing bracket. A list drawn some other way is not a list to the converter.",
          ],
        },
        {
          heading: "Words split across lines",
          body: [
            "PDFs hyphenate at line ends, and a naive join gives you \"re- port\". The lines get spliced back into one word when a line ends in a hyphen and the next line starts with a lowercase letter — that combination is a line-break hyphen almost every time.",
            "When the next line starts with a capital, the hyphen stays. \"State-of-the-art\" broken after \"state-\" keeps its hyphen, which is correct, because that one is part of the word.",
            "Chinese, Japanese and Korean lines are joined with no space at all. Those scripts don't separate words with spaces, so inserting one on every line break would put a gap in the middle of a sentence.",
          ],
          sample: {
            beforeLabel: "Two lines in the PDF",
            before: "The quarterly re-\nport is attached.",
            afterLabel: "Markdown",
            after: "The quarterly report is attached.",
          },
        },
        {
          heading: "A scanned PDF gives you nothing",
          body: [
            "If a page is an image of text — a scan, a photo, a fax — there are no characters in the file to read, only a bitmap. The converter says so and stops, rather than handing back an empty document that looks like a bug.",
            "Getting text out of that needs OCR, which isn't part of this tool. A PDF where some pages are scans and others aren't will convert the real pages and list the page numbers of the ones that came back empty, up to six of them.",
            "Two ceilings: 25 MB and 500 pages. Both are about what a browser tab can do without locking up — a PDF is rendered here, in your browser, with no server involved.",
          ],
        },
        {
          heading: "What to do about multi-column pages",
          body: [
            "Two-column layouts are the hardest case and they're best-effort. Text is read in the order the file stores it, which for a well-made two-column PDF is column by column, and for a badly-made one alternates between columns line by line. There's no reliable way to tell which you have before reading it.",
            "Tables and formulas are the same story: a PDF table is ruled lines and text at coordinates, with nothing marking it as a table. Expect the cells as separate lines rather than a pipe table.",
            "Turn on page marks if you're going to fix things up by hand. That inserts an HTML comment before each page, so you can find the page a mangled section came from and check it against the original.",
          ],
          sample: {
            beforeLabel: "Page marks on",
            before: "…end of page one.",
            afterLabel: "Markdown",
            after: "…end of page one.\n\n<!-- page 2 -->\n\n## Method",
          },
        },
      ],
      outro:
        "Drop the PDF and read the warnings above the output — they say which pages were skipped and remind you that the structure was inferred. Everything is read in your browser; the file is never uploaded.",
    },
    "google-docs-to-markdown-paste": {
      short: "Google Docs paste",
      eyebrow: "Guide · Google Docs → Markdown",
      title: "Google Docs to Markdown: copy and paste, or export first",
      description:
        "Two ways out of a Google Doc, and what each one costs you. Pasting is faster and loses images; exporting .docx keeps them. Neither one needs access to your Drive.",
      keywords: [
        "google docs to markdown",
        "copy google docs to markdown",
        "google docs paste markdown",
        "export google doc to markdown",
        "google doc to md",
      ],
      h1: "Getting Markdown out of a Google Doc",
      lede: [
        "There are two routes and they're not equivalent. Paste is two seconds and drops images; the .docx export takes a few clicks and keeps them.",
        "Both run entirely in your browser, and neither asks for your Google account. Nothing here can see your Drive.",
      ],
      tool: "google-docs-to-markdown",
      sections: [
        {
          heading: "Copy the content, not a link to it",
          body: [
            "This catches people first. Copying the document's URL, or using \"Copy link\", gives you an address — there's nothing to convert in that.",
            "What you want is the content on your clipboard. Selecting text in a Doc and copying puts a rich-text HTML version there alongside the plain text, and that HTML carries the headings, lists and tables.",
          ],
          steps: [
            "Open the Doc and select what you want. Ctrl+A if it's the whole thing.",
            "Copy with Ctrl+C.",
            "Press Ctrl+V anywhere on the converter page. There's no box to find and no button to press — the paste is caught by the page itself.",
          ],
        },
        {
          heading: "What the clipboard HTML arrives looking like",
          body: [
            "Google's clipboard HTML is not tidy. Almost every element carries a generated class name like c1 or c17, list items get lst-kix_ names, and the whole selection is wrapped in a <b> tag that sets font-weight to normal — a bold tag that turns bold off, which is how the editor tracks document-level formatting internally.",
            "None of that reaches the Markdown. Classes, ids and style attributes are stripped by the sanitiser, because Markdown can't express any of them and clipboard HTML from an arbitrary web page isn't something to trust. The <b> wrapper is unwrapped separately: left in place it would produce a stray ** at the top and bottom of your document.",
            "Links get unwound too. Google routes outbound links through google.com/url?q=… for click tracking inside the editor, and tracking parameters like utm_source often ride along. Both are removed so the link points where it says it points. The output tells you when this happened — changing a link's destination is worth mentioning.",
          ],
          sample: {
            beforeLabel: "On the clipboard",
            before: "<a href=\"https://www.google.com/url?q=\n  https://example.com/a%3Futm_source%3Ddocs\">figures</a>",
            afterLabel: "Markdown",
            after: "[figures](https://example.com/a)",
          },
        },
        {
          heading: "Why pasting loses images",
          body: [
            "Images in a Doc live on Google's servers. The clipboard HTML references them by URL rather than carrying the bytes, and those URLs are tied to your session — they expire, and they don't resolve for anyone else.",
            "So a pasted document comes through with its text intact and its pictures missing. That's the format's limit, not a setting.",
            "If the images matter, take the other route.",
          ],
        },
        {
          heading: "The .docx export, for images and long documents",
          steps: [
            "In the Doc: File → Download → Microsoft Word (.docx).",
            "Drop that file onto the box on the converter page. Several at once is fine — they come back as one zip.",
            "Pick how images should be handled before you copy the result: embedded in the file, left as ./images/ references, or dropped.",
          ],
          body: [
            "This is the more complete route and it's worth using for anything long. The .docx carries real style information, so headings come from Word styles rather than from a clipboard's best effort, and long documents hold their structure better.",
            "It also means the Google Docs page and the Word page are running the same converter on the same kind of file. Anything true of one is true of the other.",
          ],
        },
        {
          heading: "What doesn't come across either way",
          body: [
            "Comments and suggested edits are dropped — you get the document, not its margins. Resolve or accept them before exporting if they matter.",
            "Charts, drawings and smart chips come through as plain text at best. They're objects rendered by the editor, and there's no text equivalent for most of them.",
            "Headers, footers and page numbers go. They belong to a printed page, and Markdown doesn't have pages.",
          ],
        },
        {
          heading: "Why there's no Drive integration",
          body: [
            "Connecting to Drive would mean asking for access to your files and running a server that holds a token for them. That's a real ongoing risk to you in exchange for saving you one Ctrl+C.",
            "A copy-paste hands over exactly the paragraphs you selected and nothing else. There's no account, no OAuth screen and no add-on to install, and there's nothing on our side that could leak, because there is no our side — the conversion happens in your browser.",
            "Google Docs can also export Markdown itself now. If that output suits you, use it. This exists for the cases where you want to choose the bullet character, the fence style or what happens to images, and for pasting a fragment rather than exporting a whole document.",
          ],
        },
      ],
      outro:
        "Select, copy, paste — or export the .docx if you need the images. The clipboard is read in your browser and nothing is sent anywhere.",
    },
    "html-to-markdown-clean": {
      short: "Messy HTML",
      eyebrow: "Guide · HTML → Markdown",
      title: "HTML to Markdown: what gets kept, stripped and flattened",
      description:
        "Which HTML tags map to Markdown, which are removed for safety, and what happens to tables, code blocks and inline styles. Plus the two knobs that change the output shape.",
      keywords: [
        "html to markdown",
        "convert html to markdown",
        "html to md converter",
        "clean html to markdown",
        "web page to markdown",
      ],
      h1: "HTML to Markdown",
      lede: [
        "HTML can express far more than Markdown can. So this conversion is mostly a question of what to do with everything that has no equivalent.",
        "Three answers, depending on the tag: map it, drop the tag and keep the text, or drop both. Which one applies is decided by a whitelist, and it's worth knowing what's on it.",
      ],
      tool: "html-to-markdown",
      sections: [
        {
          heading: "A whitelist, not a blacklist",
          body: [
            "Only tags that mean something in Markdown survive the first pass: headings, paragraphs, lists, links, images, emphasis, blockquotes, code, tables, and the handful of inline tags around them. Everything else is removed, with its text kept.",
            "The reason it's a whitelist is that a blacklist has to predict every dangerous tag, and HTML keeps adding new ones. One missed entry is a hole. This way the default answer for anything unfamiliar is no.",
            "Scripts, event handlers and javascript: links go, and for script, style, iframe, object and embed the contents go too — not just the tag. Keeping the text of a <script> would paste its code into your document as visible prose.",
            "Attributes are whitelisted the same way: only href, src, alt, title, colspan, rowspan and start. So class, id and style never reach the output. That's not only safety — Markdown has nowhere to put them.",
          ],
        },
        {
          heading: "Why sanitising matters even when nothing is rendered",
          body: [
            "This page never renders your HTML, so nothing can execute here. The reason the sanitiser exists is what happens next.",
            "A link written as [click me](javascript:alert(1)) is copied through faithfully by a Markdown converter, and becomes a working attack the moment someone publishes that Markdown on a site that renders it. The risk isn't ours, it's handed to whoever uses the output.",
            "So the URLs are checked against a protocol whitelist — http, https, mailto, ftp, and relative paths — and anything else is dropped. When something gets removed, the output says what it was, rather than quietly cleaning up your input behind your back.",
          ],
        },
        {
          heading: "Tables: keep them or flatten them",
          body: [
            "By default a table becomes a Markdown pipe table. Pipes inside cells are escaped, whitespace inside a cell is collapsed to single spaces, and short rows are padded to the width of the widest row so the table stays rectangular.",
            "Flattening is the alternative, and it exists for tables that were never tables. A page laid out with a table for positioning converts to a pipe table full of empty cells; flattened, each row becomes a line of text with cells joined by a middle dot, which reads far better.",
            "Two things don't survive either way. A <caption> is dropped, because a pipe table has nowhere to put one — copy it out as a line above the table if you need it. And block content inside a cell collapses: a list in a cell comes out as its items joined together, since a pipe table row has to be one line.",
          ],
          sample: {
            beforeLabel: "HTML",
            before: "<table><tr><th>Part</th><th>Qty</th></tr>\n<tr><td>Bolt | M6</td><td>12</td></tr></table>",
            afterLabel: "Markdown",
            after: "| Part | Qty |\n| --- | --- |\n| Bolt \\| M6 | 12 |",
          },
        },
        {
          heading: "The tags that keep their HTML",
          body: [
            "Superscript and subscript stay as <sup> and <sub>. Markdown has no syntax for them, and x2 instead of x² changes what a formula says — raw HTML is legal in Markdown and every renderer handles these two.",
            "Underline doesn't get that treatment. It has no meaning to preserve: on the web an underline is a link, so keeping it would be actively misleading. Underlined text comes out as plain text.",
            "Strikethrough becomes ~~, which is GitHub Flavoured Markdown rather than the original spec, but it's universal enough now that dropping it would be the stranger choice.",
          ],
        },
        {
          heading: "Lists, code blocks and the knobs",
          body: [
            "List items are written as \"- item\" with a single space. Most Markdown toolchains write it that way, and the common alternative — three spaces after the marker — makes for noisy diffs when a file is edited by both.",
            "Nested lists indent to the width of the marker, and a paragraph continuing inside a list item is indented to line up with the text above it rather than breaking out of the list. An <ol> with a start attribute keeps its numbering.",
            "The bullet character can be -, * or +, and the code fence can be ``` or ~~~. Pick to match whatever the file is going into; there's no functional difference. Headings can also be set to the underlined style, though only the first two levels have one — the third and below stay as # marks either way, which is worth knowing before you choose it.",
          ],
          sample: {
            beforeLabel: "HTML",
            before: "<ol><li><p>First para</p>\n<p>Still item one</p></li></ol>",
            afterLabel: "Markdown",
            after: "1. First para\n\n   Still item one",
          },
        },
        {
          heading: "Two inputs, one path",
          body: [
            "You can paste HTML source into the box, or drop an .html file. Both are treated identically, because to the code they're the same thing: a string of untrusted HTML.",
            "The 25 MB cap is per input, which is far more than any page's source. Nothing is uploaded — the parsing, the sanitising and the conversion all happen in the tab.",
            "If the result comes back empty, the output says so. Usually that means the input was all markup and no text: a page's <head>, or a fragment that was only styling.",
          ],
        },
      ],
      outro:
        "Paste the source or drop the file, choose whether tables stay tables, and copy the Markdown out. It all runs in your browser.",
    },
    "csv-to-markdown-tables": {
      short: "CSV tables",
      eyebrow: "Guide · CSV → Markdown",
      title: "CSV to Markdown table: delimiters, quoted fields and alignment",
      description:
        "How the delimiter gets detected, what happens to commas and newlines inside quoted fields, how the alignment row works, and what the 100,000-cell limit means in practice.",
      keywords: [
        "csv to markdown table",
        "convert csv to markdown",
        "csv to markdown converter",
        "tsv to markdown table",
        "semicolon csv to markdown",
      ],
      h1: "CSV to a Markdown table",
      lede: [
        "Nothing inside a CSV declares its own rules. Which character splits the columns, how quotes behave, whether the first line is a header — all of it is convention, and several are in circulation. A table that comes out wrong is nearly always a file read against the wrong set.",
        "This covers how the delimiter is picked, what quoting does, and how to get numbers to line up on the right.",
      ],
      tool: "csv-to-markdown",
      sections: [
        {
          heading: "Which character splits the columns",
          body: [
            "Four characters turn up in real files: comma, semicolon, tab, pipe. Semicolons more often than people expect — anywhere 1,50 means one and a half, the comma is already spoken for, so spreadsheets reach for the semicolon instead.",
            "Detection is automatic, and when the answer isn't a comma the output says which character it used. That line is worth reading — a file with something unusual in its first rows, like a title line above the header, can be read wrong, and this is how you'd notice.",
            "If it guessed wrong, set the delimiter by hand. Comma, semicolon, tab and pipe are all selectable.",
          ],
          steps: [
            "Drop the file, or paste the rows straight into the box.",
            "Check the note above the output for a detected delimiter that isn't a comma.",
            "If the table came out as one column when it should be six, pick the delimiter yourself.",
          ],
        },
        {
          heading: "When a cell contains the separator itself",
          body: [
            "A field wrapped in double quotes can contain the delimiter, and a doubled quote inside it means one literal quote character. That's RFC 4180 and it's handled properly — this is the whole reason the file isn't just split on commas.",
            "Newlines hide inside quotes too, and that collides with the output format: a pipe table row must occupy exactly one line. So a break inside a cell is rewritten as <br>, which keeps both lines of a two-line address without splitting the row in half.",
            "Pipe characters in cell text are escaped as \\|. Without that, one pipe in a note field turns a five-column row into a six-column one.",
          ],
          sample: {
            beforeLabel: "CSV",
            before: "name,note\nBolt,\"M6 | 40mm\nsteel\"",
            afterLabel: "Markdown",
            after: "| name | note |\n| --- | --- |\n| Bolt | M6 \\| 40mm<br>steel |",
          },
        },
        {
          heading: "The alignment row",
          body: [
            "The row of hyphens under the header can carry colons, and they set how a column is aligned when the table is rendered. Left, centre, right — right being the one you want for numbers.",
            "One thing to know: the setting applies to the whole table, not per column. There's no per-column control here, because a CSV carries no information about which columns hold numbers, and guessing from the values would get it wrong on postcodes, phone numbers and version strings.",
            "So for a table of mostly numbers, set right and fix the one text column by hand afterwards. For anything mixed, leave it on default — a plain row of hyphens, which every renderer treats as left.",
          ],
          sample: {
            beforeLabel: "Align: right",
            before: "Item,Cost\nBolt,0.40",
            afterLabel: "Markdown",
            after: "| Item | Cost |\n| ---: | ---: |\n| Bolt | 0.40 |",
          },
        },
        {
          heading: "Header rows, and files that don't have one",
          body: [
            "The first row becomes the header by default. Turn that off and every row becomes a body row — but the header row itself doesn't disappear, it comes out empty.",
            "That looks odd and it isn't a bug: a Markdown pipe table is required to have a header row. A table without one wouldn't parse as a table at all, so an empty header is the only way to express \"no header\" while still producing something that renders.",
            "Fill it in with column names afterwards, or leave it — an empty header row renders as a thin blank strip above the data.",
          ],
          sample: {
            beforeLabel: "Header row: none",
            before: "Bolt,12\nNut,12",
            afterLabel: "Markdown",
            after: "|  |  |\n| --- | --- |\n| Bolt | 12 |\n| Nut | 12 |",
          },
        },
        {
          heading: "Ragged rows and malformed files",
          body: [
            "Rows with different column counts are padded out to the widest row, and the output tells you which counts it saw. That message is usually a sign something upstream is broken — a row with three cells in a six-column file normally means an unescaped quote swallowed a delimiter.",
            "Empty lines are dropped, including lines that are nothing but delimiters, which is what a trailing block of \",,,\" usually is.",
            "Values are never type-converted. 007 stays 007 and 1-2 doesn't become a date. Excel does that to you; this doesn't, because changing the value is changing your data.",
            "A byte-order mark at the start of the file is stripped, so the first column header doesn't come out with an invisible character stuck to it.",
          ],
        },
        {
          heading: "What \"large\" means here",
          body: [
            "Two ceilings. 25 MB of text, and 100,000 cells — that's rows times columns, so a six-column file gets you to roughly 16,000 rows and a hundred-column file stops near a thousand.",
            "The cell limit is the one you'll hit, and it's about rendering rather than parsing. The preview builds DOM nodes for every cell, and a few hundred thousand of them will lock up the tab. Refusing is better than freezing.",
            "For something genuinely bigger, split it by rows and convert each piece — repeat the header row in each one.",
          ],
        },
      ],
      outro:
        "Drop the CSV or paste the rows, switch the alignment if the figures belong on the right, then copy the table. Parsing happens in this tab, so a customer export stays on your disk.",
    },
    "excel-to-markdown-formulas": {
      short: "Excel formulas",
      eyebrow: "Guide · Excel → Markdown",
      title: "Excel to Markdown: what happens to formulas and formatting",
      description:
        "Formulas convert to their calculated values, and there's one case where they come out empty. Plus what happens to currency and percentage formats, dates, merged cells and multiple sheets.",
      keywords: [
        "excel to markdown",
        "xlsx to markdown table",
        "convert excel to markdown",
        "excel formulas to markdown",
        "spreadsheet to markdown table",
      ],
      h1: "Excel to Markdown: formulas and formatting",
      lede: [
        "A Markdown table is a rectangle of text. A worksheet is a rectangle of cells, and a cell can carry a formula underneath it, a display mask over it, and a merge stretching it across its neighbours. Three of those four have nowhere to land.",
        "Which makes the useful question a narrow one: of everything the sheet knows, what reaches the table, and is the part you came for among it?",
      ],
      tool: "excel-to-markdown",
      sections: [
        {
          heading: "Formulas become their answers",
          body: [
            "=SUM(B2:B9) arrives as 4211. That's the useful direction, because Markdown computes nothing — a pasted formula would sit in the document as inert characters that look like they mean something and don't.",
            "It works because Excel caches the calculated value next to the formula every time it saves the file. The converter reads the cached value, which is why it doesn't need a formula engine of its own and why the whole thing can run in a browser tab.",
          ],
          sample: {
            beforeLabel: "Cell in Excel",
            before: "B10:  =SUM(B2:B9)",
            afterLabel: "Markdown",
            after: "| Total | 4211 |",
          },
        },
        {
          heading: "Workbooks nobody has ever opened",
          body: [
            "If the workbook was generated by a script — a Python export, a reporting job, anything using a spreadsheet library — and never opened in Excel, there's no cached value. Nothing wrote one. Those cells convert to empty.",
            "One round trip fixes it: open the workbook in Excel or LibreOffice, save, close. Saving is what fills the cache in. And a sheet that still reads as empty gets named above the output, so you won't copy away a table of blanks by accident.",
            "Formula errors come out empty too, rather than as #DIV/0! or #REF!. A broken lookup down one column produces a column of blanks — so if a column is empty for no obvious reason, check the source.",
          ],
        },
        {
          heading: "Number formats don't survive",
          body: [
            "Of everything on this page, this is the one to read before converting. Excel keeps the display mask and the stored number in different places, and only the stored number is data — the mask is a rendering instruction.",
            "Which is why $1,234.50 lands as 1234.5 and a cell reading 12.50% lands as 0.125. Nothing was mangled: those are the numbers the file has always held, shown without the mask.",
            "If the formatting matters, add a column in the spreadsheet holding the formatted string built with a TEXT() formula, and use that column instead. Then it's text, and text comes through exactly as written.",
            "Dates are the exception. They're stored as numbers too, but the number format identifies them, so they come out as 1995-01-01, with a time appended when there is one. They're read back in UTC deliberately — the naive version shifts every date back a day for anyone west of Greenwich.",
          ],
        },
        {
          heading: "Merged cells split",
          body: [
            "A title merged across A1:C1 becomes one cell holding the text and two empty cells beside it. Excel keeps the value in the top-left cell of a merge and leaves the rest genuinely empty, so that's what there is to read.",
            "Markdown has no colspan, so there's no way to put it back. Unmerge in Excel first if the layout matters — often the merges were only there to centre a heading.",
            "Colours, fonts, borders, conditional formatting and cell comments go the same way, for the same reason: Markdown has no syntax for any of them.",
          ],
        },
        {
          heading: "Sheets, one at a time or several",
          steps: [
            "Drop the workbook. The sheet names come back as a list with row counts, and the first sheet is converted.",
            "Tick the sheets you want. Changing the selection re-renders from the copy already in memory — the file isn't read again.",
            "Several selected sheets come out as one document, each table under a ## heading carrying the sheet name.",
          ],
          body: [
            "The heading only appears when more than one sheet is selected. With a single sheet you already know which one it is, and a heading would be noise.",
            "Trailing empty rows are trimmed first, which matters more than it sounds: clicking around an empty area in Excel can leave a sheet claiming several hundred rows that hold nothing. A sheet that's empty after trimming says so instead of producing a table of blanks.",
          ],
        },
        {
          heading: "The size ceilings, and the files that get refused",
          body: [
            "10 MB per workbook — lower than the 25 MB other formats get. An .xlsx is a zip, and unpacking one in a tab costs far more memory than the file size suggests.",
            "100,000 cells across everything selected, which is why picking fewer sheets can get a large workbook through when the whole thing won't fit.",
            "Password-protected workbooks are refused rather than half-read. So are the old binary .xls files — both are OLE containers rather than zips, and neither can be read here. Open it in Excel and save as .xlsx without a password.",
            "Drop a .docx or a PDF on this page by mistake and it won't try: the file header is checked first, and the message names the page that does take it.",
          ],
        },
      ],
      outro:
        "Drop the workbook, tick the sheets you want, copy the table. The .xlsx is unzipped in this tab and goes nowhere else, which matters when the file is a financial model.",
    },
  },
  preview: {
    short: "Markdown Preview",
    eyebrow: "Preview Markdown",
    title: "Markdown Preview — Render Markdown Live in Your Browser",
    description:
      "Paste or type Markdown and see it rendered instantly. A free, private Markdown viewer that runs entirely in your browser — nothing is uploaded.",
    keywords: [
      "markdown preview",
      "markdown viewer",
      "preview markdown online",
      "render markdown",
      "markdown editor",
    ],
    h1: ["Paste Markdown,", "see it rendered"],
    lede: [
      "Type or paste Markdown on the left and watch it render on the right, live as you edit.",
      "It runs in your browser — the text never leaves your machine and nothing is uploaded.",
    ],
    editorLabel: "Markdown",
    previewLabel: "Preview",
    placeholder: "Paste or type Markdown here…",
    sample: "Load sample",
    sampleMarkdown: `# Markdown preview

Type on the left, see it **rendered** on the right — live, in your browser.

## What it renders

- Headings, **bold**, _italic_, and \`inline code\`
- Ordered and unordered lists
- [Links](https://docstomd.com) and images

> Blockquotes render too, with a rule down the side.

| Format | Goes to |
| --- | --- |
| .docx | Markdown |
| .pdf | Markdown |

\`\`\`
Fenced code blocks keep their spacing.
\`\`\`
`,
    clear: "Clear",
    emptyState: "Your rendered Markdown appears here as you type.",
    charCount: { one: "{n} character", other: "{n} characters" },
    note: {
      heading: "Runs in your browser",
      items: [
        "Nothing is uploaded — the text stays on your machine",
        "Renders live as you type, no button to press",
        "Free, no sign-up, works offline once loaded",
      ],
    },
    body: {
      stepsHeading: "How to use it",
      steps: [
        "Paste or type your Markdown into the box on the left.",
        "Watch the formatted result appear on the right as you edit.",
        "Tweak the source until the preview looks right — it updates instantly.",
      ],
      supportedHeading: "What it renders",
      supported: [
        "Headings, paragraphs, bold, italic, and strikethrough",
        "Ordered and unordered lists",
        "Tables with a header row",
        "Blockquotes and fenced code blocks",
        "Links and image placeholders",
      ],
      limitsHeading: "What it doesn't do",
      limits: [
        "It's a viewer, not an exporter — there's no HTML download.",
        "Raw HTML in the Markdown is shown as text, not executed, so nothing untrusted runs.",
        "Deeply nested or exotic syntax may render more plainly than a full CommonMark engine.",
      ],
    },
    faq: [
      {
        q: "Is my Markdown sent to a server?",
        a: "No. The preview is rendered in your browser with JavaScript. The text you paste never leaves your machine and nothing is uploaded.",
      },
      {
        q: "Does it export HTML?",
        a: "This page is a live viewer, not a converter — it shows how your Markdown renders. If you need to turn documents into Markdown, use one of the converters linked below.",
      },
      {
        q: "Why does some HTML in my Markdown show as plain text?",
        a: "Pasted content is treated as untrusted, so raw HTML is displayed literally rather than executed. That keeps the preview safe from anything hidden in the source.",
      },
      {
        q: "Does it work offline?",
        a: "Once the page has loaded it keeps working without a connection, because the rendering happens locally in your browser.",
      },
    ],
  },
};

export default en;
