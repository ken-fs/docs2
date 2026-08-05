import { CONTACT_EMAIL } from "@/content/site";
import type { Dictionary, Faq } from "../types";

/** 每页都该有的那几个问题，措辞不必因页面而变。 */
const PRIVACY: Faq = {
  q: "Does my file get uploaded?",
  a: "No. Everything happens in your browser — the parser, the sanitiser, the HTML generator. Your file never touches a server. Turn off your wifi and try it; it still works.",
  shared: true,
};

const SAFETY: Faq = {
  q: "Is the HTML safe to put on my site?",
  a: "That's the part we take most seriously. Every input goes through DOMPurify before you see it: script tags, onclick-style attributes, javascript: URLs, iframes, objects and embeds are removed. The preview runs inside a sandboxed iframe, so even if something slipped through, it couldn't execute. And nothing unsanitised is ever inserted into this page.",
  shared: true,
};

const MODES: Faq = {
  q: "Fragment or full document — which do I want?",
  a: "Fragment, if you're pasting into a page that already exists: a CMS editor, a template, a React component. You get the markup with no <html> wrapper and no <style>, so it won't fight your site's CSS. Full document, if you want a file you can double-click and open: it comes with charset, viewport, a title and modest built-in styling.",
  shared: true,
};

const PRETTY: Faq = {
  q: "Why is the HTML indented like that?",
  a: "Because you're going to read it, and probably commit it. Indentation is on by default and adds newlines between block elements only — never inside a <pre> or between inline tags, where whitespace changes what's rendered. Switch it off if you want the smallest possible output.",
  shared: true,
};

const en: Dictionary = {
  htmlLang: "en",
  chrome: {
    breadcrumbHome: "home",
    cleanHeading: "What gets thrown away",
    cleanLede:
      "Word and Google Docs both wrap their content in a layer of junk that only means something inside their own editor. It goes.",
    cleanNote:
      "Structure stays: headings are headings, tables are tables, lists are lists. It's the decoration that's removed.",
    cleans: {
      scripts: "<script> tags",
      handlers: "onclick and friends",
      styles: "Inline mso- styles",
      classes: "Dead c1 / c17 classes",
      tracking: "Link tracking parameters",
      office: "Office-only tags",
      semantics: "Kept: semantic structure",
      entities: "Escaped: & < > and quotes",
    },
    faqHeading: "Questions people ask",
    crossHeading: "Other things this site converts",
    startOver: "Start over",
    startOverNote: "Markdown to HTML, the one on the front page",
    footerLeft: "docs2html.com — a small tool, made by one person",
    footerRight: "runs in your browser · stores nothing · tracks nothing",
    langLabel: "Language",
    footerLegal: "The formal pages",
    legalContactCue: "Something here unclear, or something you want changed?",
    legalUpdated: "In effect since",
    siblingHeading: "Going the other way?",
    siblingNote:
      "DocsToMD is this same tool pointed in reverse — Word, PDF, Excel and HTML into Markdown. Same approach, same privacy model, opposite output.",
    siblingCta: "docstomd.com",
    features: [
      "Convert Markdown to HTML with GFM tables and task lists",
      "Convert .docx to clean semantic HTML",
      "Clean up HTML pasted from Google Docs",
      "Convert plain text to HTML paragraphs",
      "Convert CSV and Excel to HTML tables",
      "Runs fully client-side, no upload",
      "Output as an HTML fragment or a full document",
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
    knobs: "Output",
    mode: "Output",
    modeFragment: "fragment",
    modeDocument: "full page",
    modeHint:
      "Fragment: markup only, for pasting into an existing page. Full page: a standalone .html file with charset, viewport and basic styling.",
    pretty: "Indent",
    prettyOn: "readable",
    prettyOff: "compact",
    responsive: "Table CSS",
    responsiveOn: "include",
    responsiveOff: "bare",
    linkify: "Bare URLs",
    linkifyOn: "make links",
    linkifyOff: "leave as text",
    lineBreaks: "Line breaks",
    lineBreaksOn: "keep as <br>",
    lineBreaksOff: "let text flow",
    header: "Header row",
    headerFirstRow: "first row",
    headerNone: "none",
    delimiter: "Delimiter",
    delimiterAuto: "auto",
    delimiterComma: "comma",
    delimiterSemicolon: "semicolon",
    delimiterTab: "tab",
    delimiterPipe: "pipe",
    images: "Images",
    imageInline: "inline base64",
    imageExtract: "separate files",
    imageStrip: "drop them",
    sheets: "Sheets",
    sheetsAll: "select all",
    sheetMeta: { one: "{n} row", other: "{n} rows" },
    stale:
      "A knob moved. The other results are from the old settings — run them again to apply it.",
    queue: "Queue",
    zip: { one: "zip {n} file", other: "zip {n} files" },
    chewing: "converting…",
    failed: "failed",
    tooBig: "Over 25 MB. Too big.",
    readFail: "Couldn't read it. The file may be damaged or password-protected.",
    pastedName: "pasted content",
    typedName: "pasted text",
    pasteHeading: "Or paste it here",
    pastePlaceholderMarkdown:
      "# Paste Markdown here\n\nTables, task lists and ~~strikethrough~~ all work.\n\n| tool | output |\n| --- | --- |\n| this page | HTML |",
    pastePlaceholderHtml:
      '<div class="c1"><b style="font-weight:normal">Paste HTML source here.</b></div>\n<p>Google Docs junk, mso- styles and tracking parameters get cleaned out.</p>',
    pastePlaceholderText:
      "Paste plain text here.\n\nA blank line starts a new paragraph. Bare URLs like https://example.com become links, unless you switch that off.",
    pastePlaceholderCsv:
      "name,role,city\nAda,engineer,London\nGrace,admiral,Arlington",
    pasteRun: "Convert",
    pasteClear: "Clear",
    pasteRichHint:
      "Select the content inside your document and copy it — not the share link. Then paste here, or press Ctrl+V anywhere on this page.",
    source: "source",
    preview: "preview",
    previewNote:
      "Preview runs in a sandboxed frame with scripts disabled. That's deliberate, not a bug.",
    copy: "Copy",
    copied: "copied",
    download: "Download .html",
    downloadZip: "HTML + images",
    legacyWarn: "Old .doc format — read what we could",
    styleWarn: {
      one: "{n} thing worth knowing about this conversion",
      other: "{n} things worth knowing about this conversion",
    },
    emptyDoc: "(nothing came out)",
    pickOne: "Pick one on the left to see the result.",
    chewingFirst: "Converting the first one…",
    units: {
      words: { one: "{n} word", other: "{n} words" },
      headings: { one: "{n} heading", other: "{n} headings" },
      tables: { one: "{n} table", other: "{n} tables" },
      images: { one: "{n} image", other: "{n} images" },
      links: { one: "{n} link", other: "{n} links" },
      bytes: "size",
    },
  },
  pages: {
    home: {
      short: "Home",
      eyebrow: "Markdown → HTML",
      title: "Docs 2 HTML — Convert Markdown to HTML, free and private",
      description:
        "Paste Markdown, get clean HTML. GFM tables, task lists and strikethrough included. Choose a fragment for your CMS or a full standalone page. Runs entirely in your browser — nothing is uploaded.",
      keywords: [
        "docs 2 html",
        "markdown to html",
        "md to html converter",
        "convert markdown to html online",
        "markdown to html free",
      ],
      h1: ["Markdown in.", "Clean HTML out."],
      lede: [
        "Paste it and the HTML appears as you look at it. No button, no wait, no upload.",
        "Take a fragment for your CMS, or a full page you can open straight from your desktop.",
      ],
      note: {
        heading: "Straight up",
        items: [
          "CommonMark plus GFM tables, task lists and strikethrough",
          "Fragment or full document, your call",
          "Works with your wifi off",
        ],
      },
      body: {
        stepsHeading: "How it works",
        steps: [
          "Paste your Markdown into the box, or drop a .md file above. Both are read by your own browser.",
          "It's parsed with markdown-it, then run through DOMPurify — because Markdown allows raw HTML, and Markdown you got from somewhere else is not automatically safe.",
          "Switch between the source and a sandboxed preview, then copy the HTML or download the .html file.",
        ],
        supportedHeading: "What's supported",
        supported: [
          "CommonMark in full: headings, paragraphs, lists, links, images, blockquotes, fenced code",
          "GitHub-flavoured extras: pipe tables, task list checkboxes and ~~strikethrough~~",
          "Raw HTML inside your Markdown, sanitised rather than dropped",
          "Bare URLs turned into links, which you can switch off",
          "Fragment output with no wrapper, or a full page with charset, viewport and title",
        ],
        limitsHeading: "What it won't do",
        limits: [
          "No syntax highlighting inside code blocks — you get a clean <pre><code>, style it yourself",
          "Footnotes, definition lists and other non-standard extensions aren't parsed",
          "Front matter at the top of the file is treated as text, not metadata",
          "Scripts inside your Markdown's raw HTML are removed, not preserved",
          "Other formats have their own pages: DOCX, Google Docs, plain text, CSV and Excel",
        ],
      },
      faq: [
        PRIVACY,
        MODES,
        {
          q: "Which flavour of Markdown is this?",
          a: "CommonMark as the base, plus the three GitHub extensions people actually use: pipe tables, task lists and strikethrough. If it renders on GitHub, it very probably renders the same here.",
        },
        {
          q: "Can I put raw HTML in my Markdown?",
          a: "Yes, and it comes through — after sanitising. A <div> or a <span class=\"note\"> survives; a <script> doesn't. That's the right trade: Markdown from a colleague or a CMS is untrusted input like any other.",
        },
        PRETTY,
        {
          q: "Do code blocks get highlighted?",
          a: "No. You get <pre><code class=\"language-js\">, which is the standard hook every highlighter reads. Adding highlighting here would mean shipping a colour scheme that fights whatever your site already uses.",
        },
      ],
    },
    "markdown-to-html": {
      short: "MD → HTML",
      eyebrow: "Markdown → HTML",
      title: "Markdown to HTML Converter — free, GFM tables, in your browser",
      description:
        "Convert Markdown to HTML with full CommonMark plus GitHub tables, task lists and strikethrough. Live sandboxed preview, fragment or full-page output, and nothing ever leaves your browser.",
      keywords: [
        "markdown to html",
        "markdown to html converter",
        "md to html",
        "convert markdown to html",
        "commonmark to html",
        "gfm to html",
      ],
      h1: ["Turn Markdown into HTML.", "Tables and task lists included."],
      lede: [
        "The full CommonMark spec, plus the GitHub extensions you'd miss if they were absent.",
        "Preview it in a sandboxed frame, then copy the source or download the file.",
      ],
      note: {
        heading: "What you get",
        items: [
          "Real <table> markup, with <thead> and scope attributes",
          "Task lists as disabled checkboxes, not literal brackets",
          "Indented, readable output you won't mind committing",
        ],
      },
      body: {
        stepsHeading: "How it works",
        steps: [
          "Paste Markdown into the box, or drop a .md, .markdown or .txt file onto the box above.",
          "markdown-it parses it with CommonMark rules, plus the table, strikethrough and task-list extensions. The result goes through DOMPurify before it reaches you.",
          "Pick fragment or full page, toggle indentation, then copy the HTML or download it as a file.",
        ],
        supportedHeading: "What's supported",
        supported: [
          "All of CommonMark: ATX and setext headings, nested lists, reference links, fenced and indented code",
          "GFM pipe tables, rendered as <table><thead><th scope=\"col\">",
          "Task lists, rendered as disabled checkboxes with a .task-list-item class to style",
          "Strikethrough, and bare URLs auto-linked with an option to stop it",
          "Raw HTML blocks and inline HTML, sanitised on the way through",
          "Soft line breaks kept as <br>, or allowed to flow, whichever you pick",
        ],
        limitsHeading: "What it won't do",
        limits: [
          "No syntax highlighting — the language class is emitted, the colours are yours",
          "Footnotes, definition lists, abbreviations and container directives aren't parsed",
          "YAML front matter isn't stripped or read; delete it first if you don't want it in the output",
          "Math notation ($...$ or \\[...\\]) passes through as literal text",
          "Files over 25 MB",
        ],
      },
      faq: [
        {
          q: "Are GitHub tables supported?",
          a: "Yes, and they come out as proper markup: a <thead> with <th scope=\"col\"> cells, a <tbody> for the rest, and alignment carried across as inline text-align. Screen readers can read the result as a table, which they can't do with a grid faked out of divs.",
        },
        {
          q: "What happens to task lists?",
          a: "- [ ] and - [x] become real disabled checkboxes inside the list item, and the item gets a task-list-item class so you can hide the default bullet. Disabled, because an HTML checkbox in a static page that appears clickable but records nothing is worse than no checkbox at all.",
        },
        MODES,
        PRETTY,
        {
          q: "Can I convert several files at once?",
          a: "Yes. Drop a folder's worth of .md files in and they queue up; download them individually or all together as a zip. Handy for moving a docs directory into a template.",
        },
        PRIVACY,
      ],
    },
    "docx-to-html": {
      short: "DOCX → HTML",
      eyebrow: "DOCX → HTML",
      title: "DOCX to HTML Converter — clean semantic HTML, no Word junk",
      description:
        "Convert .docx to clean semantic HTML in your browser. Word's mso- styles and redundant classes are stripped out. Images inline as base64 or download alongside the HTML as a zip.",
      keywords: [
        "docx to html",
        "word to html",
        "docx to html converter",
        "convert word document to html",
        "doc to html",
        "word to clean html",
      ],
      h1: ["Word document to HTML.", "Without the Word junk."],
      lede: [
        "Save As Web Page produces thousands of lines of mso- styles. This produces markup you'd write by hand.",
        "Headings become <h2>, tables become <table>, and nothing Microsoft-specific survives.",
      ],
      note: {
        heading: "What you get",
        items: [
          "Semantic tags, no <o:p> and no style=\"mso-...\"",
          "Images inline, or as separate files in a zip",
          "Old .doc files work too, no Save As needed",
        ],
      },
      body: {
        stepsHeading: "How it works",
        steps: [
          "Drop a .docx onto the box above, or click to pick one. Dozens at a time is fine.",
          "Mammoth reads the document's structure — real heading levels, real tables, real lists — and writes HTML from it. That HTML then goes through DOMPurify, because Mammoth's own docs are explicit that its output isn't sanitised.",
          "Choose what happens to images, then copy the HTML, download the file, or take a zip with the images beside it.",
        ],
        supportedHeading: "What's supported",
        supported: [
          "Every .docx Word has written since 2007, plus Word Online and Word for Mac",
          "Old .doc from Word 97–2003, detected from the file header rather than the extension",
          "Heading levels as <h1>–<h6>, taken from Word's styles rather than guessed from font size",
          "Tables as <table>, lists as <ul>/<ol> with real nesting, links, bold, italic, strikethrough",
          "Blockquotes, code-styled paragraphs as <pre><code>, and captions as <p class=\"caption\">",
          "Embedded images: inlined as base64, extracted into an images/ folder for the zip, or dropped",
        ],
        limitsHeading: "What it won't do",
        limits: [
          "Word's visual formatting — fonts, colours, exact spacing — is deliberately not carried over",
          "Merged table cells lose their colspan and rowspan; each cell becomes its own <td>",
          "Track changes and comments are dropped — you get the final text, not the editing history",
          "Text boxes, SmartArt and charts don't survive; only their text, if any",
          "Images don't come out of old .doc files — that format hides them where a browser can't reach",
          "Encrypted documents are refused rather than half-read",
        ],
      },
      faq: [
        {
          q: "How is this different from Word's own Save As Web Page?",
          a: "Word's export is built to make the page look identical in a browser, so it writes an enormous block of CSS, an mso- style attribute on nearly every element, class names like MsoNormal, and Office-only tags like <o:p>. This does the opposite: it reads the structure and throws the presentation away. You get a few dozen lines of semantic HTML instead of a few thousand lines of markup you can't edit.",
        },
        {
          q: "What happens to my images?",
          a: "Your choice of three. Inline base64 puts everything in one self-contained file, which is convenient and roughly a third larger than the raw image. Separate files gives you a zip: the HTML plus an images/ folder, with the <img> tags already pointing at the right paths. Or drop them entirely, if you only want the text.",
        },
        SAFETY,
        {
          q: "Do old .doc files work?",
          a: "Yes. .doc is pre-2007 OLE binary, so it's read byte by byte in your browser and routed through the same output stage. You get text, headings, tables, bold and italic. Two things can't be recovered from that format: images and exact list numbering. If Word is handy, a Save As .docx gives a cleaner result.",
        },
        MODES,
        {
          q: "Why did my merged cells split apart?",
          a: "Because the colspan and rowspan aren't carried over in this version. A merged cell becomes a normal cell and its neighbours come out empty. The table is still valid HTML and still readable — it just isn't laid out the way it was in Word. Adding a colspan by hand afterwards is usually a one-line fix.",
        },
      ],
    },
    "google-docs-to-html": {
      short: "Google Docs → HTML",
      eyebrow: "Google Docs → HTML",
      title: "Google Docs to HTML — clean the junk out, free, no sign-in",
      description:
        "Paste from Google Docs and get clean HTML. The c1/c17 class soup, the font-weight:normal <b> wrapper and Google's link redirects are all removed. No Drive access, no add-on, no sign-in.",
      keywords: [
        "google docs to html",
        "google docs html export",
        "clean google docs html",
        "convert google doc to html",
        "google docs to clean html",
      ],
      h1: ["Google Doc to HTML.", "Minus the class soup."],
      lede: [
        "Copying from a Doc gives you HTML wrapped in class names that point at a stylesheet you don't have.",
        "Paste it here and what's left is the document: headings, lists, tables, links.",
      ],
      note: {
        heading: "How to get it in",
        items: [
          "Select the content in your Doc and copy it — not the share link",
          "Paste below, or press Ctrl+V anywhere on this page",
          "No OAuth, no permissions, no add-on",
        ],
      },
      body: {
        stepsHeading: "How it works",
        steps: [
          "Open your Doc, select the content, copy. Then paste into the box below or press Ctrl+V anywhere on this page — your browser puts a rich-text version on the clipboard and that's what gets read.",
          "It goes through DOMPurify first, because clipboard HTML can come from any page on the web. Then the Google-specific junk comes off: the c1/c17 classes, the <b style=\"font-weight:normal\"> wrapper Docs puts around everything, the docs-internal-guid ids, and the google.com/url?q= redirect around every link.",
          "Check the sandboxed preview, then copy the HTML or download it as a file.",
        ],
        supportedHeading: "What's supported",
        supported: [
          "Rich text pasted straight out of Google Docs, Word Online, Notion or any other web editor",
          "HTML source pasted in as text, and saved .html files",
          "Headings, paragraphs, lists with real nesting, tables, links, bold, italic, strikethrough",
          "Unwrapping the meaningless <b style=\"font-weight:normal\"> shell Docs wraps the whole document in",
          "Unwrapping google.com/url?q= redirects back to the URL you actually linked to",
          "Stripping utm_ and other tracking parameters off the links inside your document",
        ],
        limitsHeading: "What it won't do",
        limits: [
          "No connection to your Google account — nothing here can see your Drive",
          "Pasting doesn't carry images: the clipboard only references them on Google's servers",
          "Comments and suggested edits are dropped; resolve them before copying",
          "Charts, drawings and smart chips come across as plain text at best",
          "Copying the share link instead of the content gives you a link, and that's all there is to convert",
          "Google's own font and colour choices are removed along with the rest of the styling",
        ],
      },
      faq: [
        {
          q: "Why is Google Docs HTML such a mess?",
          a: "Because it was never meant to be read by you. Docs writes a stylesheet full of rules like .c1 and .c17, then tags every element with the matching class. Copy the content out and the classes come with it while the stylesheet doesn't — so you get markup covered in class names that now mean nothing. On top of that sits a <b style=\"font-weight:normal\"> wrapping the entire document, which is a formatting no-op, and every link is rewritten to route through google.com/url?q=.",
        },
        {
          q: "Do I need to install an add-on or sign in?",
          a: "No, and there's nothing to sign in to. This page reads your clipboard when you paste, which is something your browser does for any page. Asking for Drive access would mean requesting permission over all your files and running a server to hold a token for them. A copy-paste costs you two seconds and hands us nothing.",
        },
        {
          q: "What happened to my images?",
          a: "They didn't come through, and they can't. When you copy from a Doc, the clipboard HTML points at image URLs on Google's servers rather than carrying the image data. Those links need your session to load, so they'd break for everyone else. If you need images, use File → Download → Microsoft Word (.docx) and take that file to the DOCX page.",
        },
        SAFETY,
        {
          q: "Does this work with Notion, Word Online or Confluence?",
          a: "Yes. The Google-specific cleanup is the most aggressive part, but the general work — sanitising, unwrapping pointless wrapper elements, removing dead classes and tracking parameters — applies to anything you paste. Rich text from any web editor is worth trying here.",
        },
        MODES,
      ],
    },
    "text-to-html": {
      short: "Text → HTML",
      eyebrow: "Plain text → HTML",
      title: "Text to HTML Converter — paragraphs, line breaks, escaped entities",
      description:
        "Turn plain text into HTML paragraphs. Blank lines split paragraphs, bare URLs become links (optional), line breaks become <br> (optional), and &, < and > are escaped properly.",
      keywords: [
        "text to html",
        "plain text to html",
        "txt to html converter",
        "text to html paragraphs",
        "convert text to html online",
      ],
      h1: ["Plain text to HTML.", "Paragraphs, properly."],
      lede: [
        "A blank line starts a new <p>. Bare URLs become links if you want them to. Angle brackets get escaped, so text stays text.",
        "The simplest tool on this site, and the one people rebuild by hand most often.",
      ],
      note: {
        heading: "Good to know",
        items: [
          "A blank line means a new paragraph",
          "URLs and email addresses linked, or left alone",
          "&, < and > escaped so nothing gets swallowed",
        ],
      },
      body: {
        stepsHeading: "How it works",
        steps: [
          "Paste your text into the box, or drop a .txt file above. Windows, Mac and Unix line endings are all treated the same.",
          "Blank lines split the text into paragraphs. Inside a paragraph, single line breaks either become <br> or are allowed to flow together — your choice. HTML's special characters are escaped as they go.",
          "Turn URL detection on or off, pick fragment or full page, then copy the HTML or download the file.",
        ],
        supportedHeading: "What's supported",
        supported: [
          "Blank-line paragraph splitting, with runs of blank lines treated as one break",
          "Single line breaks kept as <br>, or allowed to flow into one line",
          "http:// and https:// URLs, plus bare www. addresses, turned into links",
          "Email addresses turned into mailto: links",
          "&, <, > and quotes escaped, so a literal <b> in your text stays visible as text",
          "CRLF, CR and LF line endings, and a byte order mark at the start of the file",
        ],
        limitsHeading: "What it won't do",
        limits: [
          "No Markdown parsing — **bold** stays as asterisks. Use the Markdown page for that.",
          "Indentation isn't read as structure: a tab-indented block doesn't become a list or a code block",
          "It doesn't guess headings — a short line in caps is still a paragraph",
          "Tables laid out with spaces stay as text; use the CSV page for real tables",
          "Files over 25 MB",
        ],
      },
      faq: [
        {
          q: "How does it decide where paragraphs are?",
          a: "A blank line. That's the one convention every plain-text writer already follows, and it needs no guessing. Several blank lines in a row count as one break. If your text has no blank lines at all you'll get one long paragraph, and you'll be told so rather than left to wonder.",
        },
        {
          q: "What if I don't want my URLs turned into links?",
          a: "Switch the bare-URLs knob off and they stay as plain text. Worth doing when you're writing about URLs rather than linking to them — a tutorial, an error log, a config file.",
        },
        {
          q: "Why is my <b> showing up as text instead of making things bold?",
          a: "Because that's what plain text to HTML means. Your input is text, so a literal <b> is three visible characters and comes out as &lt;b&gt;. If you want tags to work, your input isn't plain text — try the Markdown page, or the Google Docs page if you're pasting rich text.",
        },
        {
          q: "What's the <br> option for?",
          a: "Poetry, addresses, log output — anything where the line breaks are part of the meaning. Turn it off for prose that was hard-wrapped at 80 columns, where you want the browser to rewrap it to the reader's window.",
        },
        MODES,
        PRIVACY,
      ],
    },
    "csv-to-html-table": {
      short: "CSV → table",
      eyebrow: "CSV → HTML table",
      title: "CSV to HTML Table Converter — free, paste or upload",
      description:
        "Turn CSV into a semantic HTML table. Commas, semicolons and tabs are detected automatically, the first row becomes <thead>, and optional responsive CSS makes it scroll on narrow screens.",
      keywords: [
        "csv to html table",
        "csv to html",
        "convert csv to html table",
        "tsv to html table",
        "csv to table online",
      ],
      h1: ["CSV to an HTML table.", "Semantic, not a grid of divs."],
      lede: [
        "The first row becomes a real <thead> with scope attributes, so screen readers can read the table as a table.",
        "Quoted commas, embedded line breaks and European semicolon exports are all handled.",
      ],
      note: {
        heading: "Good to know",
        items: [
          "Delimiter read out of the file, overridable",
          "<thead> and <th scope=\"col\">, not styled divs",
          "Optional responsive CSS for narrow screens",
        ],
      },
      body: {
        stepsHeading: "How it works",
        steps: [
          "Drop a .csv or .tsv above, or paste the rows straight into the box. Nothing leaves the tab.",
          "The separator is worked out from the file — comma, semicolon, tab or pipe — and reported above the output. Override it if the guess is wrong.",
          "Choose whether the first row is a header and whether to include the responsive CSS, then copy the HTML or download the file.",
        ],
        supportedHeading: "What's supported",
        supported: [
          "Whatever separator the export used, worked out from the file or set by hand",
          "Quoted fields kept whole; a newline inside a cell becomes a <br> rather than a broken row",
          "German, French and Spanish exports, where the separator is a semicolon because the comma is the decimal point",
          "First row as <thead> with <th scope=\"col\">, or no header at all",
          "A leading byte order mark, dropped so it doesn't end up inside your first <th>",
          "Short rows padded with empty <td> so every row carries the same cell count",
        ],
        limitsHeading: "What it won't do",
        limits: [
          "UTF-8 in and UTF-8 out, which is what the meta charset declares; other encodings may arrive garbled",
          "25 MB of text and 100,000 cells in one go",
          "Cell text is escaped, never reformatted — 007 reaches the <td> as 007",
          "No sorting, filtering or totals — it converts, it doesn't compute",
          "No JavaScript in the output, so the table isn't interactive",
          "Unbalanced quotes defeat any CSV reader, and cells may land under the wrong column",
        ],
      },
      faq: [
        {
          q: "Why a <table> rather than divs with CSS grid?",
          a: "Because tabular data is what a table element is for. A screen reader announces the dimensions, lets the user move cell by cell, and reads the column header with each cell — none of which a grid of divs provides. Search engines read it as data too. Styling isn't a reason to give that up.",
        },
        {
          q: "What does the responsive CSS actually do?",
          a: "Very little, on purpose. It wraps the table in a div that scrolls horizontally when it's too wide, and sets border-collapse plus modest padding and borders. That's the minimum a table needs to be usable on a phone. Everything else is left to your own stylesheet. Switch it off and you get the bare <table>.",
        },
        {
          q: "My export uses semicolons. Will that work?",
          a: "Yes. Anywhere the comma serves as the decimal point, a spreadsheet exports with semicolons instead — which is read out of the file and reported above the output. Override it if the guess is wrong.",
        },
        {
          q: "A cell contains a comma. Will my columns shift?",
          a: "No, provided the field is quoted, which every correct CSV writer does. \"Smith, John\" arrives as a single <td>. A newline inside a quoted field is kept as well, emitted as a <br> so the row doesn't split in two.",
        },
        PRIVACY,
        MODES,
      ],
    },
    "excel-to-html-table": {
      short: "Excel → table",
      eyebrow: "Excel → HTML table",
      title: "Excel to HTML Table Converter — pick your sheets, free",
      description:
        "Convert an .xlsx workbook into semantic HTML tables. Choose which sheets to include, set the header row, and get the displayed cell values rather than formula source. Nothing is uploaded.",
      keywords: [
        "excel to html table",
        "xlsx to html",
        "excel to html",
        "convert excel to html table",
        "spreadsheet to html table",
      ],
      h1: ["Spreadsheet to HTML table.", "Values, not formulas."],
      lede: [
        "Drop an .xlsx in, pick the sheets you want, and get a clean <table> for each one.",
        "Colours and fonts are left behind deliberately — a table carrying its own styling fights every site you paste it into.",
      ],
      note: {
        heading: "Good to know",
        items: [
          "Every sheet listed — tick the ones you want",
          "Cell values as displayed, not formula source",
          "100,000 cells per run",
        ],
      },
      body: {
        stepsHeading: "How it works",
        steps: [
          "Drop an .xlsx above. The workbook is opened in the tab and every sheet name turns up as a button.",
          "Sheet one converts right away. Toggle the rest on and off — the workbook stays in memory, so nothing is read twice.",
          "Set whether the first row is a header and whether to include the responsive CSS, then copy the HTML or download the file.",
        ],
        supportedHeading: "What's supported",
        supported: [
          "Anything that saves .xlsx: Excel 2007 and later, LibreOffice Calc, Numbers, Google Sheets",
          "Multiple sheets, each becoming its own table under an <h2> with the sheet's name",
          "The value a reader would see — a <td> gets 42, never =SUM(A1:A9)",
          "Dates written out as ISO text instead of the 45000-style serial Excel keeps internally",
          "First row as <thead> with <th scope=\"col\">, or no header at all",
          "A <caption> on the table when you convert a single sheet, which screen readers read first",
        ],
        limitsHeading: "What it won't do",
        limits: [
          "Colours, fonts, borders and conditional formatting are not reproduced — this is by design in this version",
          "Merged cells lose their colspan and rowspan; each cell becomes its own <td>",
          "Formulas aren't carried over as formulas, and nothing is recalculated",
          "The pre-2007 .xls binary is an entirely different format, and isn't handled",
          "Charts, pivot tables and images in the sheet are not exported",
          "An encrypted workbook can't be opened here — save an unprotected copy first",
          "Selections over 100,000 cells",
        ],
      },
      faq: [
        {
          q: "Why aren't my colours and fonts carried over?",
          a: "Because a table that brings its own colours loses a fight with your site's stylesheet nine times out of ten, and you end up deleting the inline styles by hand. What's useful is a clean <table> with the right structure, styled by the page it lands in. If you need the original look exactly, Excel's own Save As Web Page will give you that — along with several thousand lines of markup.",
        },
        {
          q: "Does the <td> hold the formula or the result?",
          a: "The result. A workbook keeps both the formula and its last computed value, and the value is what belongs on a web page — so =SUM(A1:A9) is written out as 42.",
        },
        {
          q: "A formula cell came out empty. Why?",
          a: "Because there was no cached value in the file to read. Excel writes one on every save, but a workbook produced by a script and never opened in Excel has none at all. Open it once, save, then convert.",
        },
        {
          q: "Can several sheets go into one file?",
          a: "Yes. Tick as many sheet names as you like; each one comes out as its own <table>, with an <h2> above it carrying that sheet's name.",
        },
        {
          q: "What happens to merged cells?",
          a: "They split. Each cell in the range becomes its own <td>, with the value in the first one and the rest empty. HTML can express a merge with colspan and rowspan, but reconstructing them correctly from a workbook is a phase-two job — so for now the output is honest about being a plain grid.",
        },
        PRIVACY,
      ],
    },
  },
  legal: {
    about: {
      short: "About",
      eyebrow: "About this site",
      title: "About Docs 2 HTML — who makes it and why",
      description:
        "Docs 2 HTML is a free browser-based converter that turns Markdown, Word, Google Docs, text, CSV and Excel into clean HTML. No accounts, no uploads, no tracking. Here's how and why.",
      h1: "A small tool, and the reasoning behind it",
      lede: [
        "Docs 2 HTML turns documents into HTML you'd be willing to put your name on. That's the whole product.",
        "It's built and maintained by one independent developer, and it runs entirely inside your browser.",
      ],
      sections: [
        {
          heading: "Why this exists",
          body: [
            "Every writing tool can already export HTML. That's the problem. Word's Save As Web Page produces thousands of lines with an mso- style attribute on nearly every element. Google Docs hands you class names like c1 and c17 that reference a stylesheet you didn't get. Both are technically HTML and both are unusable as the source of a web page — you can't read them, can't edit them, and can't paste them into a template without them fighting your CSS.",
            "What people actually want is the markup they would have written by hand: an <h2> where there's a heading, a <table> where there's a table, and nothing else. Getting there from an official export means deleting more than you keep, so most people either do it manually or give up and paste the mess.",
            "This site does the deleting. It reads the structure of your document and writes semantic HTML from it, throwing the presentation away rather than trying to reproduce it.",
          ],
        },
        {
          heading: "Why it runs in your browser",
          body: [
            "Most converters work by uploading your file to a server, converting it there, and giving you a download. That's a reasonable design, and it's also a design where your document sits on someone else's computer for a while. For a blog draft that's fine. For a contract, a medical record, a set of internal figures or an unpublished manuscript, it isn't.",
            "So the conversion runs on your own machine, in JavaScript, in the tab you already have open. There is no upload step because there is nowhere to upload to. You can check this: turn off your network connection and convert something, or watch your browser's Network tab while you drop a file in.",
          ],
        },
        {
          heading: "How it actually works",
          body: [
            "When you drop a file in, your browser reads it locally and hands the bytes to a parser also running in your browser. The parser produces a structure, that structure becomes HTML, and the HTML is sanitised before you ever see it. The parsers are open-source libraries, chosen per format:",
          ],
          items: [
            "markdown-it parses Markdown, with the CommonMark spec plus GitHub tables, task lists and strikethrough.",
            "Mammoth reads .docx. Legacy .doc is parsed by our own reader, byte by byte, since it's a pre-2007 binary format with no library that runs in a browser.",
            "DOMPurify sanitises every piece of HTML that passes through — including HTML we generated ourselves, because the text inside it came from your document.",
            "Papa Parse reads CSV and TSV; read-excel-file reads .xlsx workbooks.",
          ],
        },
        {
          heading: "About the safety part",
          body: [
            "A tool that outputs HTML has a duty a Markdown converter doesn't: whatever it hands you may get pasted onto a live website, where it will run. So sanitising isn't a feature here, it's the floor. Script tags, event-handler attributes, javascript: URLs, iframes, objects and embeds are removed from everything, and nothing unsanitised is ever inserted into this page's DOM.",
            "The preview is a separate concern, and it's rendered inside a sandboxed iframe with scripts disabled and an opaque origin. That means it can't reach this page, can't read anything, and can't execute — even if the sanitiser somehow missed something. Two independent walls, because one is a single point of failure.",
          ],
        },
        {
          heading: "What it deliberately doesn't do",
          body: [
            "There are no accounts, because there's nothing to store. There's no API, because there's no server to call. There's no Google Drive connection, because that would mean asking for access to all your files and holding a token for them.",
            "Every conversion also has real limits, and each tool page lists its own. Merged table cells split apart. Excel colours and fonts aren't reproduced. Images can't come through a Google Docs paste. Those are stated up front rather than discovered after you've converted something that mattered.",
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
            "DocsToMD does the same job in the other direction: Word, PDF, HTML, CSV and Excel into Markdown. Same approach, same privacy model, opposite output format. If you landed here wanting Markdown, that's the one you want.",
          ],
        },
      ],
    },
    contact: {
      short: "Contact",
      eyebrow: "Get in touch",
      title: "Contact Docs 2 HTML",
      description:
        "Email us about a file that won't convert, HTML that came out wrong, a translation that reads badly, or a feature you want. One developer reads everything.",
      h1: "Write to us",
      lede: [
        "One person reads this inbox, so replies aren't instant — but they're real replies, not a ticket number.",
        `Email: ${CONTACT_EMAIL}`,
      ],
      sections: [
        {
          heading: "The HTML came out wrong",
          body: [
            "This is the most useful thing you can report, and also the trickiest, because we can't see your file. So please describe it instead of sending it:",
          ],
          items: [
            "Which page you were on, and what the input was — a .docx, a paste from Google Docs, a .csv",
            "What you expected in the output and what you got: a missing table, a heading that came out as a paragraph, an attribute that should have been stripped",
            "The relevant snippet of the HTML you got, if you can share it — a few lines is usually enough",
            "Your browser and operating system, since clipboard and parsing behaviour differ between them",
          ],
        },
        {
          heading: "Security reports",
          body: [
            "If you've found input that produces HTML containing something executable — a surviving event handler, a javascript: URL, a tag that should have been removed — please write, and please include the exact input that triggers it. That's the one class of bug here that could hurt someone downstream, and it gets fixed ahead of anything else.",
            "Please report it privately first rather than publishing it. There's no bug bounty; there is a fast fix and a genuine thank you.",
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
            "Feature requests are read and often built, especially small ones — a knob for an output style, support for a format variant, a delimiter we don't detect, a CSS hook you need in the output.",
            "Some things are out of scope by design, and asking won't change them: uploading files to a server, a Google Drive integration, user accounts, or reproducing Word and Excel styling exactly. The last one isn't a limitation we're apologising for — clean markup is the product.",
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
      title: "Privacy Policy — Docs 2 HTML",
      description:
        "What Docs 2 HTML does and doesn't collect. Your documents are processed in your browser and never uploaded. No accounts, no analytics on your files, no selling data.",
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
            "The preview pane deserves a specific note, because it looks like it might be an exception. It isn't: the preview is an iframe whose content is handed to it directly from the page you already have open, using srcdoc. Nothing is fetched and nothing is sent. The frame is sandboxed with an opaque origin, so it can't read anything either.",
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
          body: ["The list is deliberately short:"],
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
      title: "Terms of Service — Docs 2 HTML",
      description:
        "The terms for using Docs 2 HTML: free for any purpose including commercial, provided as-is, you keep all rights to your documents, and you check the output before publishing it.",
      h1: "Terms of service",
      lede: [
        "Using this site means accepting what's below. It's short, because a free browser tool that stores nothing doesn't need much.",
      ],
      sections: [
        {
          heading: "What you may do with it",
          body: [
            "Use it for anything, including commercial work. Convert as many files as you like. No account, no licence key, no attribution required, and no limit on how the output is used — the HTML this produces is yours to publish, sell or modify.",
            "There are two practical caveats, and they exist for the tool's benefit rather than ours: each file must be under the size limit shown on the page, and conversion runs on your machine, so a very large document is limited by your own memory and processor rather than by a quota we set.",
          ],
        },
        {
          heading: "Your documents remain yours",
          body: [
            "You keep every right you had in the files you convert, and in the HTML that comes out. We claim no licence to either, and couldn't make use of them if we wanted to — the conversion happens in your browser and your content never reaches us.",
            "You are responsible for having the right to convert what you convert. If a document isn't yours to process, this tool doesn't change that.",
          ],
        },
        {
          heading: "Check the output before you publish it",
          body: [
            "The site is free and comes with no warranty. We aim for accurate, safe conversion and document the known limits of each format on its own page, but no converter is perfect.",
            "This matters more here than for most tools, because the output is HTML and you are likely to put it on a live website. Every input is sanitised — scripts, event handlers, javascript: URLs and embeds are removed — and we treat a failure of that as the most serious kind of bug. But we cannot guarantee that markup produced from an arbitrary input is safe for every context you might paste it into. Review what you're publishing, exactly as you would review HTML from any other outside source.",
            "Structure has limits too: merged table cells split apart, Excel styling isn't reproduced, and complex Word layouts flatten. For anything consequential, compare the output against the original.",
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
            "This tool stands on open-source libraries — markdown-it, Mammoth, DOMPurify, Papa Parse, read-excel-file and others — each under its own licence, with notices retained in the distributed code. Their licences cover those components; these terms cover this site.",
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
      title: "Cookie Policy — Docs 2 HTML",
      description:
        "Which cookies Docs 2 HTML uses. The site itself sets none. Advertising, once enabled, may set cookies — and in the EEA, UK and Switzerland only with your consent.",
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
            "There's no account to stay logged into, no cart, and no cross-visit preference to store. Even the settings on the converter — fragment or full page, indentation, header row, delimiter — live only in the page while you have it open, and reset when you reload. Your files and their converted output are likewise never written to local storage, IndexedDB or a cookie.",
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
