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
    guide: {
      cta: "Open the converter",
      pairedWith: "Uses",
      moreHeading: "The other guides",
    },
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
    wrongType: "This page doesn't take {ext} files. This one does:",
    wrongTypeElsewhere:
      "This page doesn't take {ext} files, and neither does this site. DocsToMD handles them.",
    wrongTypeNowhere:
      "This page doesn't take {ext} files. This site converts documents, spreadsheets and text — not {ext}.",
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
  guideIndex: {
    short: "Guides",
    eyebrow: "Guides",
    title: "Guides — the awkward parts of converting documents to HTML",
    description:
      "Six walkthroughs for the conversions that don't go smoothly the first time: Markdown tables, Word formatting, Google Docs class soup, plain-text paragraphs, big CSV files and Excel formulas.",
    h1: "Guides",
    lede: [
      "Each converter has a page that tells you what it does. These are for the part after that — the file that came out wrong, and why.",
      "One guide per tool, written from the questions people actually send in. No sign-up, and every page links straight to the converter it's about.",
    ],
  },
  guides: {
    "markdown-tables-to-html": {
      short: "Markdown tables",
      eyebrow: "Guide · Markdown → HTML",
      title: "How to convert Markdown tables to HTML tables (with alignment)",
      description:
        "Pipe tables become real <table> markup with <thead> and th scope attributes. Here's how to write the alignment row, what happens to it in the HTML, and why a table can come out as one long line of text.",
      keywords: [
        "markdown table to html",
        "markdown table to html table",
        "convert markdown table to html",
        "markdown pipe table html",
        "markdown table alignment html",
      ],
      h1: "Markdown tables to HTML tables",
      lede: [
        "A pipe table is the one bit of Markdown that people most often see fail. It renders on GitHub and then comes out as a paragraph of pipes somewhere else.",
        "This walks through the syntax that survives conversion, what the HTML looks like on the other side, and the three mistakes that turn a table back into text.",
      ],
      tool: "markdown-to-html",
      sections: [
        {
          heading: "What a table needs to be a table",
          body: [
            "Pipe tables are not part of CommonMark. They come from GitHub Flavoured Markdown, which means a converter has to opt into them — and some don't. This one does.",
            "Three things are required. A header row. A delimiter row of hyphens under it. And at least one body row. Drop any of the three and you get paragraphs.",
          ],
          steps: [
            "Write the header row with a pipe between each cell. The outer pipes at the start and end of the line are optional, but they make ragged tables much easier to spot.",
            "Write the delimiter row directly under it, with no blank line between. At least three hyphens per column is the safe minimum.",
            "Write your body rows. They don't have to line up in the source; the cells are split on the pipes, not on the columns.",
          ],
          sample: {
            beforeLabel: "Markdown",
            before: "| Part | Qty |\n| ---- | --- |\n| Bolt | 12 |\n| Nut  | 12 |",
            afterLabel: "HTML",
            after: '<table>\n  <thead>\n    <tr>\n      <th scope="col">Part</th>\n      <th scope="col">Qty</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Bolt</td>\n      <td>12</td>\n    </tr>\n  </tbody>\n</table>',
          },
        },
        {
          heading: "The scope attribute, and why it's there",
          body: [
            "Header cells come out as <th scope=\"col\">, not as bold <td>. That attribute is the whole reason a screen reader can announce \"Qty, 12\" instead of reading a bare number with no idea what column it belongs to.",
            "It costs nothing and it's the difference between a table and a grid of numbers. A layout faked out of divs can't express it at all, which is the strongest argument against ever building one.",
          ],
        },
        {
          heading: "Alignment: the colon row",
          body: [
            "Colons in the delimiter row set alignment per column. A colon on the left aligns left, both sides centres, the right aligns right — which is what you want for numbers.",
            "In the HTML you get a class, not an inline style: align-left, align-center or align-right. Inline styles are stripped from every output on this site, because a style attribute is the doorway CSS injection walks through.",
            "That means full-page output has the alignment already working — the stylesheet in the <head> defines those three classes. Fragment output leaves them for your own CSS, which is the point of fragment output: three one-line rules and it matches your site instead of fighting it.",
          ],
          sample: {
            beforeLabel: "Markdown",
            before: "| Item | Cost |\n| :--- | ---: |\n| Bolt | 0.40 |",
            afterLabel: "HTML",
            after: '<th scope="col" class="align-left">Item</th>\n<th scope="col" class="align-right">Cost</th>\n...\n<td class="align-left">Bolt</td>\n<td class="align-right">0.40</td>',
          },
        },
        {
          heading: "When the table comes out as a paragraph",
          body: [
            "Three causes, in the order they turn up.",
          ],
          steps: [
            "A blank line between the header and the delimiter row. That splits it into two paragraphs before the table parser ever sees it.",
            "A pipe inside a cell's text. Escape it as \\| or the cell splits in two and the row ends up with more cells than the header.",
            "Not enough hyphens. A single hyphen per column works in some parsers and not others; three is the version everything agrees on.",
          ],
        },
        {
          heading: "Cells that hold more than text",
          body: [
            "Inline Markdown works inside cells: bold, italic, code spans, links. Block-level content does not — no lists, no paragraphs, no fenced code blocks. That's a limit of the table syntax itself, not of this converter.",
            "A line break inside a cell needs a literal <br>, written by hand. Raw HTML in Markdown is passed through here rather than escaped, so it works, and it gets sanitised on the way out like everything else.",
          ],
        },
      ],
      outro:
        "That's every part of a pipe table that behaves differently once it's HTML. The converter takes pasted Markdown or a dropped .md file, and nothing leaves your browser.",
    },
    "word-to-html-keep-formatting": {
      short: "Word formatting",
      eyebrow: "Guide · DOCX → HTML",
      title: "Convert Word to HTML: what formatting survives, and what doesn't",
      description:
        "Which parts of a .docx come through as HTML and which are dropped on purpose. Headings, tables, lists and images survive as structure; fonts, colours and page layout don't. Here's how to tell them apart before you convert.",
      keywords: [
        "word to html keep formatting",
        "docx to html formatting",
        "convert word to html preserve formatting",
        "word document to html without losing formatting",
        "docx to clean html",
      ],
      h1: "What survives when Word becomes HTML",
      lede: [
        "\"Keep the formatting\" means two different things, and which one you mean decides whether you'll be happy with the result.",
        "Structure — headings, lists, tables, emphasis — comes through. Appearance — fonts, colours, margins, page breaks — does not, and that's a deliberate choice rather than a missing feature.",
      ],
      tool: "docx-to-html",
      sections: [
        {
          heading: "Structure survives, appearance doesn't",
          body: [
            "A .docx stores two separate things about every paragraph: what it is, and what it looks like. \"Heading 2\" is what it is. 16pt Calibri bold with 6pt space after is what it looks like.",
            "The converter reads the first and throws away the second. A Heading 2 becomes an <h2> — not a <p> with a font size on it. On your site it then picks up your own heading style, which is almost certainly what you wanted.",
            "The alternative is what Word's own Save As Web Page does: a few thousand lines of mso- styles that reproduce the page exactly and can't be edited or restyled afterwards.",
          ],
        },
        {
          heading: "Style your headings, don't just embolden them",
          body: [
            "This is the one thing worth doing in Word before you convert, and it's the difference between good output and flat output.",
            "Text that merely looks like a heading — bigger, bold, manually sized — is stored as a normal paragraph. It converts to <p>, because that's genuinely what it is. Nothing can recover the intent from the font size.",
          ],
          steps: [
            "In Word, put the cursor in a heading and check the Styles gallery. If it says Normal, that's the problem.",
            "Apply Heading 1, 2 or 3 instead. It'll change how it looks; restyle the heading style itself if you don't like it.",
            "Do the same for lists: use the list buttons rather than typing \"1.\" and a tab. Manually typed numbers convert to literal text, not to an <ol>.",
            "Convert, then check the output for <h2> and <ul>. If you see a wall of <p>, the document was never structured to begin with.",
          ],
        },
        {
          heading: "What comes through",
          body: [
            "Heading levels as <h1> through <h6>, taken from Word's styles. Bold, italic and strikethrough as <strong>, <em> and <s>. Superscript and subscript. Links, with Google's and Office's tracking parameters stripped off.",
            "Lists as real <ul> and <ol>, nested up to five levels. Tables as <table>, including merged cells: horizontal merges come through as colspan and vertical ones as rowspan.",
            "Blockquotes from the Quote style. Paragraphs styled Code or Preformatted as <pre><code>. Captions as <p class=\"caption\">.",
          ],
        },
        {
          heading: "What gets dropped, and why",
          body: [
            "Fonts, sizes, colours, highlighting, alignment, indentation, line spacing, page breaks, headers and footers, margins. All of it is presentation that belongs to a page, and HTML isn't a page.",
            "Two drops are worth knowing about because they're easy to miss. Underlined text loses its underline — on the web an underline means a link, so Word's underline maps to nothing rather than to something misleading. And blank spacer paragraphs disappear, because they're layout, not content.",
            "Track changes and comments are dropped: you get the final text, not the editing history. Text boxes, SmartArt and charts don't survive — only their text, if they contain any.",
          ],
        },
        {
          heading: "Images: three choices",
          steps: [
            "Inline as base64 gives you one self-contained .html file you can email or double-click. It's about a third bigger than the images were.",
            "Separate files gives you a zip: the HTML plus an images/ folder, with every <img> already pointing at the right path. Use this for anything going on a real site.",
            "Dropped leaves the <img> tags in place with an empty src, so you'll see broken-image placeholders. Delete them, or use one of the other two.",
          ],
          body: [
            "Old .doc files are the exception: images can't be recovered from that format at all, no matter which option you pick. Everything else — text, headings, tables, bold — comes through.",
          ],
        },
      ],
      outro:
        "Set your heading styles first, then convert. Files are read in your browser and never uploaded, so you can try it on something confidential.",
    },
    "google-docs-to-html-clean": {
      short: "Google Docs class soup",
      eyebrow: "Guide · Google Docs → HTML",
      title: "Clean HTML from Google Docs: removing the c1/c17 class soup",
      description:
        "Copying from a Google Doc gives you HTML full of c1 and c17 class names, a font-weight:normal <b> wrapper and google.com/url redirects on every link. Here's what each one is and how to get rid of all of them.",
      keywords: [
        "google docs to clean html",
        "remove google docs classes html",
        "google docs html class soup",
        "google docs export clean html",
        "copy from google docs html",
      ],
      h1: "Getting clean HTML out of a Google Doc",
      lede: [
        "Copy a few paragraphs out of a Doc, paste them into a CMS, and you get text wrapped in class names like c1 and c17 that point at a stylesheet you don't have.",
        "Three specific things are wrong with that markup. Once you know what they are, the fix is one paste.",
      ],
      tool: "google-docs-to-html",
      sections: [
        {
          heading: "Copy the content, not the link",
          body: [
            "This trips people up first: Download → Web Page from the Doc's menu gives you a zip with a full HTML document and an embedded stylesheet — the whole page, styles and all.",
            "What you want instead is the clipboard. Selecting content in a Doc and copying puts a rich-text HTML version on it, and that version carries the structure without the stylesheet.",
          ],
          steps: [
            "Open the Doc and select the content you want. Ctrl+A works if you want all of it.",
            "Copy with Ctrl+C — not \"Copy link\", which only gives you a URL to the document.",
            "Paste into the box on the converter page, or press Ctrl+V anywhere on that page. There's no sign-in and no Drive permission involved; your browser hands over the clipboard, nothing else.",
          ],
        },
        {
          heading: "Problem one: the class soup",
          body: [
            "Google's clipboard HTML puts a class on almost every element — c0, c1, c17, and lst-kix_ names on list items. They're generated per document and refer to CSS that stays behind in the Doc.",
            "So they're not just noise. They're dead references: they do nothing on your page, they collide with class names of your own, and they make the markup unreadable when you go to edit it.",
            "They're removed by pattern — c followed by digits, lst-kix_ anything, docs-internal-guid ids. Classes of your own that happen to be in the paste are left alone.",
          ],
          sample: {
            beforeLabel: "Pasted from Docs",
            before: '<p class="c3"><span class="c1">A sentence.</span></p>',
            afterLabel: "After cleaning",
            after: "<p>A sentence.</p>",
          },
        },
        {
          heading: "Problem two: the bold wrapper that isn't bold",
          body: [
            "Docs wraps copied content in <b style=\"font-weight:normal\">. It's a <b> tag that explicitly turns bold off — a quirk of how the editor tracks formatting internally.",
            "Paste that anywhere the style attribute gets stripped, which is most CMSes, and the whole block turns bold. The tag is unwrapped here rather than kept, so the content comes out at the nesting level it should have been at all along.",
            "The same pass removes empty <span> elements left behind after their class names go. Those are what make a two-paragraph paste twelve lines long.",
          ],
        },
        {
          heading: "Problem three: every link is a redirect",
          body: [
            "Links in a Doc come out pointing at google.com/url?q=https://example.com/… rather than at the destination. Google uses it for click tracking inside the editor.",
            "Published on a page, it means every outbound link on your site routes through Google, shows the wrong URL in the status bar, and breaks the day that redirector changes.",
            "The wrapper is unwound back to the real destination, repeatedly if it's nested. Tracking parameters go too — utm_source and friends, gclid, fbclid, and a handful of others.",
          ],
          sample: {
            beforeLabel: "Pasted from Docs",
            before: '<a href="https://www.google.com/url?q=https://example.com/a%3Futm_source%3Ddoc">link</a>',
            afterLabel: "After cleaning",
            after: '<a href="https://example.com/a">link</a>',
          },
        },
        {
          heading: "What's left, and what's still on you",
          body: [
            "Headings, paragraphs, lists, tables, links, bold and italic — the document, in other words. Scripts, event handlers and inline styles are gone, because clipboard HTML can come from any page on the web and gets treated as untrusted input.",
            "Two things the cleaner leaves for you. Google's empty spacer paragraphs come through as <p></p>, so delete the ones you don't want. And Docs' images are hosted on Google's servers with URLs that expire — download them and host them yourself, or they'll vanish from your page later.",
          ],
        },
      ],
      outro:
        "Select, copy, paste. The clipboard is read in your browser and nothing is sent anywhere.",
    },
    "plain-text-to-html-paragraphs": {
      short: "Text to paragraphs",
      eyebrow: "Guide · Text → HTML",
      title: "Plain text to HTML paragraphs: blank lines, <br> and links",
      description:
        "A blank line starts a new paragraph, a single newline becomes a <br> or a space depending on one switch, and bare URLs can be linked automatically. What plain text can and can't turn into.",
      keywords: [
        "plain text to html",
        "text to html paragraphs",
        "convert text to html p tags",
        "text file to html",
        "txt to html converter",
      ],
      h1: "Plain text into HTML paragraphs",
      lede: [
        "Text pasted straight into a page collapses into one block, because HTML ignores your newlines. Every run of whitespace is one space as far as a browser is concerned.",
        "Two rules decide the whole result: blank lines separate paragraphs, and single newlines are yours to choose about. Everything else follows from those.",
      ],
      tool: "text-to-html",
      sections: [
        {
          heading: "Blank lines make paragraphs",
          body: [
            "One blank line between two blocks of text produces two <p> elements. That's the only paragraph rule there is, and it's the same convention every plain-text email has used for thirty years.",
            "A line with spaces or tabs on it still counts as blank. Several blank lines in a row still make one break, not empty paragraphs.",
            "If your text has no blank lines at all, you get one long paragraph — correctly, since there was nothing to split on. The converter says so when it spots that, rather than letting you find out later.",
          ],
          sample: {
            beforeLabel: "Text",
            before: "First thought.\n\nSecond thought.",
            afterLabel: "HTML",
            after: "<p>First thought.</p>\n<p>Second thought.</p>",
          },
        },
        {
          heading: "Single newlines: <br> or a space",
          body: [
            "Inside a paragraph, a single newline can go one of two ways, and the right answer depends entirely on what the text is.",
            "Keep them as <br> for anything where the line ending is meaningful: an address, a poem, a signature block, song lyrics. Let the text flow — newlines become spaces — for prose that was hard-wrapped at 72 columns by an old editor. Leaving those as <br> gives you a paragraph with a ragged right edge that won't reflow on a phone.",
          ],
          sample: {
            beforeLabel: "Text",
            before: "12 Bridge Street\nManchester",
            afterLabel: "HTML, breaks kept",
            after: "<p>12 Bridge Street<br>\nManchester</p>",
          },
        },
        {
          heading: "Turning bare URLs into links",
          body: [
            "With linking on, anything starting http://, https:// or www. becomes an <a>. Email addresses become mailto: links.",
            "The matching is deliberately narrow. A bare example.com is not linked, because there's no way to tell it from a sentence that ends in a filename or an abbreviation with a dot in it. Guessing wrong there produces links to nowhere.",
            "Trailing punctuation is left out of the link, so a URL at the end of a sentence doesn't swallow the full stop. Links get rel=\"noopener nofollow\" and don't open in a new tab.",
          ],
        },
        {
          heading: "What plain text can't tell the converter",
          body: [
            "Everything here becomes a paragraph. There is no other output, and that's a property of the input rather than a shortcoming.",
            "A line starting with a hyphen looks like a list to you, but it's a hyphen and a space. Underlining a line with equals signs looks like a heading, but it's a row of equals signs. Guessing would be wrong often enough to be worse than not guessing.",
            "So: no lists, no headings, no code blocks. Indentation is preserved as characters but collapses in the browser, which means ASCII tables and indented code come out as run-together prose. If your text is really Markdown, use the Markdown page — those conventions mean something there.",
          ],
        },
        {
          heading: "One thing you don't have to worry about",
          body: [
            "Angle brackets, ampersands and quotes are escaped, every one of them. Text containing <b>bold</b> shows those characters on the page instead of turning bold.",
            "That's the definition of the tool rather than a safety feature bolted on. Plain text is plain text: if it could contain markup, it wouldn't be.",
          ],
        },
      ],
      outro:
        "Paste the text or drop a .txt file, pick how single newlines should behave, and copy the HTML out. It all runs in your browser.",
    },
    "csv-to-html-table-large-files": {
      short: "Big CSV files",
      eyebrow: "Guide · CSV → table",
      title: "CSV to HTML table: delimiters, quoted fields and large files",
      description:
        "How the delimiter is detected, what happens to quoted fields and embedded newlines, why a one-column file reports a delimiter problem, and what the 100,000-cell limit means in practice.",
      keywords: [
        "csv to html table",
        "convert csv to html table",
        "large csv to html",
        "csv semicolon to html table",
        "tsv to html table",
      ],
      h1: "CSV to an HTML table, including the big ones",
      lede: [
        "A CSV is a text file with a punctuation convention, and there are several conventions. Most conversion problems are really disagreements about which one a file is using.",
        "This covers how the delimiter gets picked, what quoting does, and where the size limits actually sit.",
      ],
      tool: "csv-to-html-table",
      sections: [
        {
          heading: "The delimiter is detected, not assumed",
          body: [
            "Commas, semicolons, tabs and pipes are all in use. Semicolons especially: export a spreadsheet in a locale where the comma is the decimal separator and you'll get semicolons, because commas are already taken.",
            "Detection reads the first ten rows, tries each candidate, and picks the one that gives a consistent column count. A file whose first rows are unusual — a title line above the header, say — can be misread, so the detected delimiter is stated in the output. If it's wrong, override it.",
          ],
          steps: [
            "Drop the file and look at the note above the table saying which delimiter was used.",
            "If the table has one column when it should have six, set the delimiter by hand from the dropdown.",
            "Check the first row landed in the header. If the file has no header, switch that off and every row becomes a body row.",
          ],
        },
        {
          heading: "Quoted fields, and the comma inside a cell",
          body: [
            "A field wrapped in double quotes can contain the delimiter, and a doubled quote inside it means a literal quote character. That's RFC 4180 and it's handled properly.",
            "A quoted field can also contain a newline. In the HTML those become <br> inside the cell, so a two-line address stays on two lines instead of breaking the row apart.",
          ],
          sample: {
            beforeLabel: "CSV",
            before: 'name,note\nBolt,"M6, 40mm"\n',
            afterLabel: "HTML",
            after: '<tr>\n  <td>Bolt</td>\n  <td>M6, 40mm</td>\n</tr>',
          },
        },
        {
          heading: "The one-column file warning",
          body: [
            "A single-column CSV reports a delimiter problem. It's worth explaining because the file is usually fine.",
            "Detection works by finding which character splits rows consistently. With one column there's nothing to split on, so nothing looks like a delimiter and it says so. The output is still correct: one column, every row present.",
            "If you'd rather not see it, set the delimiter explicitly instead of leaving it on automatic.",
          ],
        },
        {
          heading: "What \"large\" means here",
          body: [
            "Two separate ceilings. 25 MB per file, and 100,000 cells — that's rows times columns, so a six-column file gets you to about 16,000 rows and a hundred-column file stops at around a thousand.",
            "The cell limit is the one you'll hit first, and it's about the browser rather than the parser. Every cell becomes DOM nodes in the preview, and a table of a few hundred thousand cells will lock up the tab. Refusing is better than freezing.",
            "For something genuinely bigger, split it by rows and convert each piece — the header row can be repeated in each one. Empty rows are dropped automatically, including rows that are nothing but delimiters, which is what a trailing block of \",,,\" usually is.",
          ],
        },
        {
          heading: "What the table looks like",
          body: [
            "The header row becomes a <thead> with <th scope=\"col\"> cells; everything else goes in <tbody>. Ragged rows are padded out to the widest row so the table stays rectangular, and the output says how many rows needed it — usually a sign something upstream is broken.",
            "Nothing is type-converted. 007 stays 007, and a value like 1-2 doesn't turn into a date. Excel does that to you; this doesn't.",
            "With the responsive option on, the table is wrapped in a <div class=\"table-wrap\"> that scrolls sideways. A twelve-column table can't fit on a phone, and letting it overflow stretches the whole page instead of just itself.",
          ],
        },
      ],
      outro:
        "Drop the CSV or paste the rows straight in. Files are parsed in your browser, so client data never leaves the machine.",
    },
    "excel-to-html-table-formulas": {
      short: "Excel formulas",
      eyebrow: "Guide · Excel → table",
      title: "Excel to HTML table: what happens to formulas and formatting",
      description:
        "Formulas convert to their calculated values, not the formulas themselves — and there's one case where they come out empty. Plus what happens to currency formats, dates, merged cells and multiple sheets.",
      keywords: [
        "excel to html table",
        "xlsx to html table",
        "convert excel to html",
        "excel formulas to html",
        "excel spreadsheet to html table",
      ],
      h1: "Excel to HTML: formulas and formatting",
      lede: [
        "A spreadsheet holds more than its contents: formulas behind the numbers, number formats over them, merges across them. HTML has none of that.",
        "So the question isn't whether things are lost — it's which things, and whether any of them are the ones you needed.",
      ],
      tool: "excel-to-html-table",
      sections: [
        {
          heading: "Formulas become their answers",
          body: [
            "A cell containing =SUM(B2:B9) comes out as 4211. That's almost always what you want in a web page — a formula on a page is a string, and a string that looks like a formula is worse than the number.",
            "It works because Excel caches the calculated value next to the formula every time it saves. The converter reads the cached value, which is why it doesn't need a formula engine of its own.",
          ],
          sample: {
            beforeLabel: "Cell in Excel",
            before: "B10:  =SUM(B2:B9)",
            afterLabel: "HTML",
            after: "<td>4211</td>",
          },
        },
        {
          heading: "The one case where they come out empty",
          body: [
            "If the workbook was generated by a script — a Python export, a reporting job, something using a spreadsheet library — and never opened in Excel, there's no cached value. Nothing wrote one. Those cells convert to empty.",
            "The fix is to open the file in Excel or LibreOffice and save it once. That calculates everything and writes the values in. The converter warns you when a sheet's formula cells read as empty, so you're not left guessing.",
            "Formula errors also come out empty rather than as #DIV/0! or #REF!. A sheet with a broken lookup down one column produces a column of blanks, so it's worth checking the source when a column turns out empty for no obvious reason.",
          ],
        },
        {
          heading: "Number formats don't survive",
          body: [
            "This is the surprise most worth knowing in advance. A number format is a mask Excel paints over a value; the value underneath is plain.",
            "So $1,234.50 converts to 1234.5 — currency symbol, thousands separator and fixed decimals all gone. A cell showing 12.50% converts to 0.125, because that's the number that was always there.",
            "If the formatting matters in the output, add a column in the spreadsheet with the formatted string built by a TEXT() formula, and use that column instead. Then it's a string, and strings come through exactly.",
            "Dates are the exception: they're detected by their number format and come out as 2026-03-14, or with a time appended if there is one. Read back in UTC on purpose — the naive version shifts every date back a day for anyone west of Greenwich.",
          ],
        },
        {
          heading: "Merged cells split",
          body: [
            "A title merged across A1:C1 becomes one cell with the text and two empty cells beside it. Excel keeps the value in the top-left cell and leaves the rest genuinely empty; without the merge information, that's what there is to read.",
            "HTML can express a merge with colspan and rowspan, so the fix is a one-line edit afterwards. Or unmerge in Excel first — often the merges were only there to centre a heading anyway.",
          ],
        },
        {
          heading: "Sheets, and the size ceilings",
          steps: [
            "The first sheet is converted by default. The rest are listed by name, so tick the ones you want.",
            "Pick several and each comes out as its own <table> with an <h2> above it carrying the sheet name. Pick one and the name goes in the table's <caption> instead.",
            "A sheet that's empty after trailing blank rows are trimmed says so, rather than producing an empty table.",
          ],
          body: [
            "Two limits. 10 MB per workbook — lower than the 25 MB for other formats, because an .xlsx is a zip and unpacking it in a tab costs far more memory than its file size suggests. And 100,000 cells across everything you've selected, which is why picking fewer sheets can get a large workbook through.",
            "Password-protected workbooks are refused rather than half-read, as are the old binary .xls files. Save as .xlsx first for those.",
          ],
        },
      ],
      outro:
        "Drop the workbook, pick your sheets, and copy the table out. Everything is read in your browser — a financial model never leaves your machine.",
    },
  },
};

export default en;
