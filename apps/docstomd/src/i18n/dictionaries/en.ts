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
};

export default en;
