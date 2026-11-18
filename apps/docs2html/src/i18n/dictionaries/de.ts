import { CONTACT_EMAIL } from "@/content/site";
import type { Dictionary, Faq } from "../types";

/** 每页都该有的那几个问题，措辞不必因页面而变。 */
const PRIVACY: Faq = {
  q: "Wird meine Datei hochgeladen?",
  a: "Nein. Alles passiert in deinem Browser – der Parser, die Bereinigung, der HTML-Generator. Deine Datei landet nie auf einem Server. Schalt dein WLAN aus und probier es: Es funktioniert trotzdem.",
  shared: true,
};

const SAFETY: Faq = {
  q: "Kann ich das HTML gefahrlos auf meine Website stellen?",
  a: "Das ist der Teil, den wir am ernstesten nehmen. Jede Eingabe läuft durch DOMPurify, bevor du sie zu sehen bekommst: Script-Tags, onclick-artige Attribute, javascript:-URLs, iframes, objects und embeds fliegen raus. Die Vorschau läuft in einem abgeschotteten iframe (Sandbox). Selbst wenn etwas durchrutschen würde, könnte es dort nicht ausgeführt werden. Und nichts Unbereinigtes wird jemals in diese Seite eingefügt.",
  shared: true,
};

const MODES: Faq = {
  q: "Fragment oder ganzes Dokument – was brauche ich?",
  a: "Ein Fragment, wenn du das HTML in eine Seite einfügst, die es schon gibt: einen CMS-Editor, ein Template, eine React-Komponente. Du bekommst nur das Markup, ohne <html>-Hülle und ohne <style>, also kommt es deinem CSS nicht in die Quere. Ein ganzes Dokument, wenn du eine Datei willst, die du per Doppelklick öffnest: mit Charset, Viewport, Titel und schlichtem eingebautem Styling.",
  shared: true,
};

const PRETTY: Faq = {
  q: "Warum ist das HTML so eingerückt?",
  a: "Weil du es lesen wirst und wahrscheinlich auch committest. Die Einrückung ist standardmäßig an und setzt Zeilenumbrüche nur zwischen Block-Elemente – nie in ein <pre> und nie zwischen Inline-Tags, wo Leerraum die Darstellung ändert. Schalt sie aus, wenn du die kleinstmögliche Ausgabe willst.",
  shared: true,
};

const de: Dictionary = {
  htmlLang: "de",
  chrome: {
    breadcrumbHome: "Start",
    cleanHeading: "Was rausfliegt",
    cleanLede:
      "Word und Google Docs packen ihren Inhalt in eine Schicht Müll, die nur im eigenen Editor etwas bedeutet. Die kommt weg.",
    cleanNote:
      "Die Struktur bleibt: Überschriften bleiben Überschriften, Tabellen Tabellen, Listen Listen. Weg ist nur die Deko.",
    cleans: {
      scripts: "<script>-Tags",
      handlers: "onclick und Co.",
      styles: "Inline-mso-Stile",
      classes: "Tote Klassen wie c1 / c17",
      tracking: "Tracking-Parameter in Links",
      office: "Reine Office-Tags",
      semantics: "Bleibt: die semantische Struktur",
      entities: "Maskiert: & < > und Anführungszeichen",
    },
    faqHeading: "Was Leute fragen",
    crossHeading: "Was diese Seite sonst noch umwandelt",
    startOver: "Von vorn",
    startOverNote: "Markdown in HTML, das Tool auf der Startseite",
    footerLeft: "docs2html.com – ein kleines Tool, gebaut von einer Person",
    footerRight: "läuft in deinem Browser · speichert nichts · keine Analyse, außer du erlaubst sie",
    langLabel: "Sprache",
    footerLegal: "Das Formelle",
    legalContactCue: "Ist hier etwas unklar, oder willst du etwas geändert haben?",
    legalUpdated: "Gültig seit",
    consent: {
      text: "Dürfen wir deinen Besuch mit Google Analytics zählen? Das setzt Cookies, deshalb bleibt es aus, bis du Ja sagst. Deine Dateien sind nie Teil davon.",
      privacy: "Datenschutz",
      accept: "Erlauben",
      decline: "Nein danke",
      settings: "Analyse-Einstellungen",
    },
    siblingHeading: "Du willst in die andere Richtung?",
    siblingNote:
      "DocsToMD ist dasselbe Tool, nur umgedreht – Word, PDF, Excel und HTML zu Markdown. Gleicher Ansatz, gleicher Datenschutz, umgekehrtes Ergebnis.",
    siblingCta: "docstomd.com",
    guide: {
      cta: "Zum Konverter",
      pairedWith: "Nutzt",
      moreHeading: "Die anderen Anleitungen",
    },
    features: [
      "Markdown in HTML umwandeln, mit GFM-Tabellen und Aufgabenlisten",
      ".docx in sauberes, semantisches HTML umwandeln",
      "Aus Google Docs eingefügtes HTML aufräumen",
      "Klartext in HTML-Absätze umwandeln",
      "CSV und Excel in HTML-Tabellen umwandeln",
      "Läuft komplett im Browser, kein Upload",
      "Ausgabe als HTML-Fragment oder ganzes Dokument",
    ],
  },
  converter: {
    dropTitle: "Datei hier ablegen.",
    dropActive: "Loslassen.",
    dropHint:
      "Oder wähl eine über den Button aus. Oder füg sie einfach mit Strg+V ein. Dutzende auf einmal gehen auch.",
    dropMeta: "25 MB pro Datei / läuft in deinem Browser, nichts wird hochgeladen",
    elsewhereLead: "Andere Formate:",
    pick: "Datei auswählen",
    clear: "Leeren",
    knobs: "Ausgabe",
    mode: "Ausgabe",
    modeFragment: "Fragment",
    modeDocument: "ganze Seite",
    modeHint:
      "Fragment: nur das Markup, zum Einfügen in eine bestehende Seite. Ganze Seite: eine eigenständige .html-Datei mit Charset, Viewport und einfachem Styling.",
    pretty: "Einrückung",
    prettyOn: "lesbar",
    prettyOff: "kompakt",
    responsive: "Tabellen-CSS",
    responsiveOn: "mitliefern",
    responsiveOff: "ohne",
    linkify: "URLs im Text",
    linkifyOn: "verlinken",
    linkifyOff: "als Text lassen",
    lineBreaks: "Zeilenumbrüche",
    lineBreaksOn: "als <br> behalten",
    lineBreaksOff: "Text fließen lassen",
    header: "Kopfzeile",
    headerFirstRow: "erste Zeile",
    headerNone: "keine",
    delimiter: "Trennzeichen",
    delimiterAuto: "automatisch",
    delimiterComma: "Komma",
    delimiterSemicolon: "Semikolon",
    delimiterTab: "Tab",
    delimiterPipe: "senkrechter Strich",
    images: "Bilder",
    imageInline: "inline als base64",
    imageExtract: "als eigene Dateien",
    imageStrip: "weglassen",
    sheets: "Tabellenblätter",
    sheetsAll: "alle auswählen",
    sheetMeta: { one: "{n} Zeile", other: "{n} Zeilen" },
    stale:
      "Du hast eine Einstellung geändert. Die anderen Ergebnisse sind noch mit den alten Einstellungen entstanden – wandle sie neu um, damit die Änderung greift.",
    queue: "Warteschlange",
    zip: { one: "{n} Datei als ZIP", other: "{n} Dateien als ZIP" },
    chewing: "wird umgewandelt…",
    failed: "fehlgeschlagen",
    tooBig: "Über 25 MB. Zu groß.",
    readFail: "Ließ sich nicht lesen. Die Datei ist vielleicht beschädigt oder mit einem Passwort geschützt.",
    wrongType: "Diese Seite nimmt keine {ext}-Dateien. Diese hier schon:",
    wrongTypeAmbiguous:
      "Diese Seite nimmt keine {ext}-Dateien. In einer {ext}-Datei kann jedes davon stecken – nimm die Seite, die zu deiner passt:",
    wrongTypeElsewhere:
      "Diese Seite nimmt keine {ext}-Dateien, und der Rest dieser Website auch nicht. DocsToMD kann sie umwandeln.",
    wrongTypeNowhere:
      "Diese Seite nimmt keine {ext}-Dateien. Diese Website wandelt Dokumente, Tabellen und Text um – aber kein {ext}.",
    pastedName: "eingefügter Inhalt",
    typedName: "eingefügter Text",
    pasteHeading: "Oder hier einfügen",
    pastePlaceholderMarkdown:
      "# Markdown hier einfügen\n\nTabellen, Aufgabenlisten und ~~Durchgestrichenes~~ funktionieren.\n\n| Tool | Ausgabe |\n| --- | --- |\n| diese Seite | HTML |",
    pastePlaceholderHtml:
      '<div class="c1"><b style="font-weight:normal">HTML-Quelltext hier einfügen.</b></div>\n<p>Google-Docs-Müll, mso-Stile und Tracking-Parameter werden rausgeputzt.</p>',
    pastePlaceholderText:
      "Klartext hier einfügen.\n\nEine Leerzeile beginnt einen neuen Absatz. URLs wie https://example.com werden zu Links, außer du schaltest das aus.",
    pastePlaceholderCsv:
      "name,beruf,stadt\nAda,Ingenieurin,London\nGrace,Admiralin,Arlington",
    pasteRun: "Umwandeln",
    pasteClear: "Leeren",
    pasteRichHint:
      "Markier den Inhalt in deinem Dokument und kopier ihn – nicht den Freigabelink. Dann füg ihn hier ein oder drück irgendwo auf dieser Seite Strg+V.",
    source: "Quelltext",
    preview: "Vorschau",
    previewNote:
      "Die Vorschau läuft in einem abgeschotteten Frame, Skripte sind aus. Das ist Absicht, kein Fehler.",
    copy: "Kopieren",
    copied: "kopiert",
    download: ".html herunterladen",
    downloadZip: "HTML + Bilder",
    legacyWarn: "Altes .doc-Format – gelesen, was ging",
    styleWarn: {
      one: "{n} Hinweis zu dieser Umwandlung",
      other: "{n} Hinweise zu dieser Umwandlung",
    },
    emptyDoc: "(es kam nichts raus)",
    pickOne: "Wähl links eine Datei aus, um das Ergebnis zu sehen.",
    chewingFirst: "Die erste wird umgewandelt…",
    units: {
      words: { one: "{n} Wort", other: "{n} Wörter" },
      headings: { one: "{n} Überschrift", other: "{n} Überschriften" },
      tables: { one: "{n} Tabelle", other: "{n} Tabellen" },
      images: { one: "{n} Bild", other: "{n} Bilder" },
      links: { one: "{n} Link", other: "{n} Links" },
      bytes: "Größe",
    },
  },
  pages: {
    home: {
      short: "Start",
      eyebrow: "Markdown → HTML",
      title: "Markdown in HTML umwandeln – kostenlos & privat | Docs 2 HTML",
      description:
        "Markdown einfügen, sauberes HTML bekommen. Mit GFM-Tabellen, Aufgabenlisten und Durchstreichen. Fragment oder ganze Seite. Läuft im Browser, kein Upload.",
      keywords: [
        "markdown in html umwandeln",
        "markdown in html",
        "md in html umwandeln",
        "markdown html converter",
        "markdown in html konvertieren",
        "docs 2 html",
      ],
      h1: ["Markdown in HTML umwandeln", "Markdown rein. Sauberes HTML raus."],
      lede: [
        "Einfügen, und das HTML steht schon da, während du hinschaust. Kein Button, kein Warten, kein Upload.",
        "Nimm ein Fragment für dein CMS oder eine ganze Seite, die du direkt vom Desktop öffnest.",
      ],
      note: {
        heading: "Kurz gesagt",
        items: [
          "CommonMark plus GFM-Tabellen, Aufgabenlisten und Durchstreichen",
          "Fragment oder ganzes Dokument, du entscheidest",
          "Funktioniert auch mit ausgeschaltetem WLAN",
        ],
      },
      body: {
        stepsHeading: "So funktioniert's",
        steps: [
          "Füg dein Markdown in das Feld ein oder zieh oben eine .md-Datei rein. Beides liest dein eigener Browser.",
          "markdown-it parst den Text, danach läuft alles durch DOMPurify – denn Markdown erlaubt rohes HTML, und Markdown, das du von irgendwoher hast, ist nicht automatisch sicher.",
          "Wechsle zwischen Quelltext und abgeschotteter Vorschau, dann kopier das HTML oder lade die .html-Datei herunter.",
        ],
        supportedHeading: "Was unterstützt wird",
        supported: [
          "CommonMark komplett: Überschriften, Absätze, Listen, Links, Bilder, Zitate, Codeblöcke mit Fences",
          "Die GitHub-Extras: Pipe-Tabellen, Checkboxen für Aufgabenlisten und ~~Durchgestrichenes~~",
          "Rohes HTML in deinem Markdown – wird bereinigt statt weggeworfen",
          "URLs im Text werden zu Links, das kannst du abschalten",
          "Fragment ohne Hülle oder ganze Seite mit Charset, Viewport und Titel",
        ],
        limitsHeading: "Was es nicht kann",
        limits: [
          "Kein Syntax-Highlighting in Codeblöcken – du bekommst ein sauberes <pre><code> und stylst es selbst",
          "Fußnoten, Definitionslisten und andere Nicht-Standard-Erweiterungen werden nicht geparst",
          "Front Matter am Anfang der Datei wird als Text behandelt, nicht als Metadaten",
          "Skripte im rohen HTML deines Markdowns werden entfernt, nicht übernommen",
          "Andere Formate haben eigene Seiten: DOCX, Google Docs, Klartext, CSV und Excel",
        ],
      },
      faq: [
        PRIVACY,
        MODES,
        {
          q: "Welche Markdown-Variante ist das?",
          a: "CommonMark als Basis, plus die drei GitHub-Erweiterungen, die man wirklich nutzt: Pipe-Tabellen, Aufgabenlisten und Durchstreichen. Was auf GitHub richtig aussieht, sieht hier sehr wahrscheinlich genauso aus.",
        },
        {
          q: "Darf ich rohes HTML in mein Markdown schreiben?",
          a: "Ja, und es kommt auch durch – nach der Bereinigung. Ein <div> oder ein <span class=\"note\"> überlebt, ein <script> nicht. Das ist der richtige Deal: Markdown von Kollegen oder aus einem CMS ist eine fremde Eingabe wie jede andere.",
        },
        PRETTY,
        {
          q: "Wird Code farbig hervorgehoben?",
          a: "Nein. Du bekommst <pre><code class=\"language-js\">, und genau daran hängt sich jeder Highlighter. Würden wir hier Farben einbauen, käme ein Farbschema mit, das sich mit dem deiner Website beißt.",
        },
      ],
    },
    "markdown-to-html": {
      short: "MD → HTML",
      eyebrow: "Markdown → HTML",
      title: "Markdown zu HTML Konverter – mit GFM-Tabellen, kostenlos",
      description:
        "Markdown in HTML umwandeln: CommonMark plus GitHub-Tabellen, Aufgabenlisten und Durchstreichen. Live-Vorschau, Fragment oder ganze Seite, alles im Browser.",
      keywords: [
        "markdown zu html",
        "markdown in html",
        "markdown html converter",
        "md in html umwandeln",
        "markdown in html konvertieren",
        "commonmark in html",
        "gfm in html",
      ],
      h1: ["Markdown zu HTML, mit GFM", "Tabellen und Aufgabenlisten inklusive."],
      lede: [
        "Die komplette CommonMark-Spezifikation, plus die GitHub-Erweiterungen, die dir sonst fehlen würden.",
        "Schau es dir in der abgeschotteten Vorschau an, dann kopier den Quelltext oder lade die Datei herunter.",
      ],
      note: {
        heading: "Was du bekommst",
        items: [
          "Echtes <table>-Markup, mit <thead> und scope-Attributen",
          "Aufgabenlisten als deaktivierte Checkboxen, nicht als eckige Klammern",
          "Eingerückte, lesbare Ausgabe, die du ohne Bauchschmerzen committest",
        ],
      },
      body: {
        stepsHeading: "So funktioniert's",
        steps: [
          "Füg Markdown in das Feld ein oder zieh eine .md-, .markdown- oder .txt-Datei auf das Feld oben.",
          "markdown-it parst es nach den CommonMark-Regeln, plus die Erweiterungen für Tabellen, Durchstreichen und Aufgabenlisten. Das Ergebnis läuft durch DOMPurify, bevor es bei dir ankommt.",
          "Wähl Fragment oder ganze Seite, schalte die Einrückung um, dann kopier das HTML oder lade es als Datei herunter.",
        ],
        supportedHeading: "Was unterstützt wird",
        supported: [
          "Ganz CommonMark: ATX- und Setext-Überschriften, verschachtelte Listen, Referenz-Links, Code mit Fences und eingerückter Code",
          "GFM-Pipe-Tabellen, ausgegeben als <table><thead><th scope=\"col\">",
          "Aufgabenlisten als deaktivierte Checkboxen, mit der Klasse .task-list-item zum Stylen",
          "Durchstreichen, und URLs im Text werden automatisch verlinkt – abschaltbar",
          "Rohe HTML-Blöcke und Inline-HTML, unterwegs bereinigt",
          "Einfache Zeilenumbrüche als <br> behalten oder fließen lassen, wie du willst",
        ],
        limitsHeading: "Was es nicht kann",
        limits: [
          "Kein Syntax-Highlighting – die Sprachklasse wird gesetzt, die Farben machst du",
          "Fußnoten, Definitionslisten, Abkürzungen und Container-Direktiven werden nicht geparst",
          "YAML-Front-Matter wird weder entfernt noch gelesen; lösch es vorher, wenn es nicht in der Ausgabe landen soll",
          "Mathe-Notation ($...$ oder \\[...\\]) kommt als normaler Text durch",
          "Dateien über 25 MB",
        ],
      },
      faq: [
        {
          q: "Werden GitHub-Tabellen unterstützt?",
          a: "Ja, und sie kommen als ordentliches Markup raus: ein <thead> mit <th scope=\"col\">-Zellen, ein <tbody> für den Rest, und die Ausrichtung wird als Inline-Style text-align übernommen. Screenreader lesen das Ergebnis als Tabelle vor. Bei einem Raster aus nachgebauten Divs geht das nicht.",
        },
        {
          q: "Was passiert mit Aufgabenlisten?",
          a: "- [ ] und - [x] werden zu echten, deaktivierten Checkboxen im Listenpunkt, und der Punkt bekommt die Klasse task-list-item, damit du das Standard-Aufzählungszeichen ausblenden kannst. Deaktiviert, weil eine Checkbox auf einer statischen Seite, die klickbar aussieht, aber nichts speichert, schlimmer ist als gar keine.",
        },
        MODES,
        PRETTY,
        {
          q: "Kann ich mehrere Dateien auf einmal umwandeln?",
          a: "Ja. Zieh einen ganzen Ordner voller .md-Dateien rein, dann stellen sie sich in die Warteschlange. Lad sie einzeln herunter oder alle zusammen als ZIP. Praktisch, wenn ein Doku-Ordner in ein Template umziehen soll.",
        },
        PRIVACY,
      ],
    },
    "markdown-to-pdf": {
      short: "MD → PDF",
      eyebrow: "Markdown → PDF",
      title: "Markdown in PDF umwandeln – echter Text, echte Seiten, gratis",
      description:
        "Markdown über den Druckdialog des Browsers in PDF umwandeln: markierbarer Text, Tabellen am Stück, keine verwaisten Überschriften. Kein Upload.",
      keywords: [
        "markdown in pdf umwandeln",
        "markdown in pdf",
        "markdown zu pdf",
        "markdown pdf converter",
        "markdown datei in pdf umwandeln",
        "markdown pdf online",
        "markdown drucken",
      ],
      h1: ["Markdown in PDF umwandeln", "Drucken, speichern, verschicken."],
      lede: [
        "Markdown einfügen oder reinziehen, Vorschau prüfen, dann als PDF drucken. Heraus kommt Text, den du markieren und durchsuchen kannst – kein Bild einer Seite.",
        "Kein Konto, kein Upload, kein Wasserzeichen – das ganze Layout entsteht in deinem Tab.",
      ],
      print: {
        button: "Drucken / Als PDF speichern",
        hint: "Öffnet den Druckdialog deines Browsers – wähl dort „Als PDF speichern“ als Ziel. Papierformat, Ränder und Seitenzahlen stellst du dort ein.",
      },
      note: {
        heading: "Was du bekommst",
        items: [
          "Markierbarer Text, echte Schriften, Links, die noch funktionieren",
          "A4 mit 18 mm Rand, Überschriften bleiben nie allein unten auf der Seite",
          "Tabellen und Codeblöcke bleiben am Stück, statt mittendrin getrennt zu werden",
        ],
      },
      body: {
        stepsHeading: "So funktioniert's",
        steps: [
          "Füg Markdown in das Feld ein oder zieh eine .md-Datei drauf.",
          "Die Vorschau rechts ist die gedruckte Seite: gleiche Breite, gleiche Schrift, gleiche Seitenumbrüche.",
          "Drück den Button und wähl im Druckdialog „Als PDF speichern“. Diese Datei ist dein Ergebnis.",
        ],
        supportedHeading: "Was unterstützt wird",
        supported: [
          "Überschriften, Absätze, nummerierte und einfache Listen, Zitate, Trennlinien",
          "GFM-Pipe-Tabellen mit Rahmen und grau hinterlegter Kopfzeile, auf Seitenbreite gebracht",
          "Codeblöcke in Monospace-Schrift, umbrochen statt über den Rand hinaus",
          "Bilder, verlinkt oder eingebettet; Links bleiben im PDF klickbar",
        ],
        limitsHeading: "Was es nicht kann",
        limits: [
          "Kein PDF/A, keine digitale Signatur, keine Metadaten-Bearbeitung – die Datei schreibt dein Browser",
          "Seitenzahlen und Kopfzeilen kommen aus dem Druckdialog, nicht von dieser Seite",
          "Das Papierformat richtet sich nach deinen Druckeinstellungen; das Layout ist auf A4 hochkant abgestimmt",
          "Eine Tabelle, die breiter als die Seite ist, wird verkleinert, nicht in Spalten aufgeteilt",
          "Dateien über 25 MB",
        ],
      },
      faq: [
        {
          q: "Wo landet das PDF?",
          a: "Im Druckdialog deines Browsers, als Ziel. Chrome und Edge nennen es „Als PDF speichern“, bei Safari steht es unter „PDF“, Firefox nennt es „In Datei drucken“. Auswählen, auf Speichern klicken, dann den Ordner wählen.",
        },
        {
          q: "Warum der Druckdialog und kein direkter Download?",
          a: "Weil die Druck-Engine des Browsers besseren Satz macht als jede JavaScript-PDF-Bibliothek, die wir mitliefern könnten: echte Schriften, Seitenumbrüche an sinnvollen Stellen und markierbarer Text – ohne die Seite um Megabytes aufzublähen. Du bekommst dieselbe Datei, als würdest du auf Papier drucken.",
        },
        {
          q: "Kann ich Seitenzahlen oder eine Kopfzeile hinzufügen?",
          a: "Ja, im Druckdialog. Jeder Desktop-Browser hat einen Schalter „Kopf- und Fußzeilen“, der Titel, URL und Seitenzahl einfügt und sich an die Ränder hält, die du dort einstellst. Eigene zeichnen wir nicht, weil unsere diese Einstellungen ignorieren würden.",
        },
        {
          q: "Funktioniert das offline?",
          a: "Ja, sobald die Seite geladen ist. Umwandlung, Vorschau und Druckdokument entstehen alle im Tab, dein Markdown geht also nirgendwohin.",
        },
        PRIVACY,
      ],
    },
    "docx-to-html": {
      short: "DOCX → HTML",
      eyebrow: "DOCX → HTML",
      title: "Word in HTML umwandeln online – DOCX zu sauberem HTML, gratis",
      description:
        "Word-Dokument (.docx) im Browser in sauberes HTML umwandeln. Words mso-Stile und Extra-Klassen fliegen raus. Bilder inline als base64 oder als ZIP.",
      keywords: [
        "word in html umwandeln",
        "word in html umwandeln online",
        "word dokument in html umwandeln",
        "word in html converter",
        "docx in html umwandeln",
        "word tabelle in html umwandeln",
        "doc in html",
        "word in sauberes html",
      ],
      h1: ["Word in HTML umwandeln", "DOCX rein, sauberes Markup raus."],
      lede: [
        "„Speichern unter → Webseite“ erzeugt Tausende Zeilen mso-Stile. Hier kommt Markup raus, wie du es von Hand schreiben würdest.",
        "Überschriften werden zu <h2>, Tabellen zu <table>, und nichts Microsoft-Spezifisches bleibt übrig.",
      ],
      note: {
        heading: "Was du bekommst",
        items: [
          "Semantische Tags, kein <o:p> und kein style=\"mso-...\"",
          "Bilder inline oder als eigene Dateien im ZIP",
          "Alte .doc-Dateien gehen auch, ohne vorher neu zu speichern",
        ],
      },
      body: {
        stepsHeading: "So funktioniert's",
        steps: [
          "Zieh eine .docx auf das Feld oben oder klick, um eine auszuwählen. Dutzende auf einmal sind kein Problem.",
          "Mammoth liest die Struktur des Dokuments – echte Überschriftenebenen, echte Tabellen, echte Listen – und schreibt daraus HTML. Dieses HTML läuft danach durch DOMPurify, weil Mammoths eigene Doku klar sagt, dass seine Ausgabe nicht bereinigt ist.",
          "Leg fest, was mit Bildern passiert, dann kopier das HTML, lade die Datei herunter oder nimm ein ZIP mit den Bildern daneben.",
        ],
        supportedHeading: "Was unterstützt wird",
        supported: [
          "Jede .docx, die Word seit 2007 geschrieben hat, plus Word Online und Word für Mac",
          "Alte .doc aus Word 97–2003, erkannt am Dateikopf statt an der Endung",
          "Überschriftenebenen als <h1>–<h6>, aus Words Formatvorlagen übernommen statt aus der Schriftgröße geraten",
          "Tabellen als <table>, Listen als <ul>/<ol> mit echter Verschachtelung, Links, fett, kursiv, durchgestrichen",
          "Zitate, als Code formatierte Absätze als <pre><code> und Beschriftungen als <p class=\"caption\">",
          "Eingebettete Bilder: inline als base64, für das ZIP in einen images/-Ordner gelegt oder weggelassen",
        ],
        limitsHeading: "Was es nicht kann",
        limits: [
          "Words optische Formatierung – Schriften, Farben, exakte Abstände – wird bewusst nicht übernommen",
          "Verbundene Tabellenzellen verlieren colspan und rowspan; jede Zelle wird zu einem eigenen <td>",
          "Änderungsverfolgung und Kommentare fallen weg – du bekommst den finalen Text, nicht den Bearbeitungsverlauf",
          "Textfelder, SmartArt und Diagramme überleben nicht; höchstens ihr Text",
          "Aus alten .doc-Dateien kommen keine Bilder – das Format versteckt sie dort, wo ein Browser nicht hinkommt",
          "Verschlüsselte Dokumente werden abgelehnt statt halb gelesen",
        ],
      },
      faq: [
        {
          q: "Was ist anders als bei Words eigenem „Speichern als Webseite“?",
          a: "Words Export soll die Seite im Browser exakt gleich aussehen lassen. Deshalb schreibt er einen riesigen CSS-Block, ein mso-style-Attribut an fast jedes Element, Klassennamen wie MsoNormal und reine Office-Tags wie <o:p>. Hier passiert das Gegenteil: Die Struktur wird gelesen, die Optik weggeworfen. Du bekommst ein paar Dutzend Zeilen semantisches HTML statt ein paar Tausend Zeilen Markup, das du nicht bearbeiten kannst.",
        },
        {
          q: "Was passiert mit meinen Bildern?",
          a: "Du hast drei Optionen. Inline als base64 packt alles in eine einzige, eigenständige Datei – bequem, aber etwa ein Drittel größer als das Originalbild. Eigene Dateien gibt dir ein ZIP: das HTML plus einen images/-Ordner, und die <img>-Tags zeigen schon auf die richtigen Pfade. Oder du lässt sie ganz weg, wenn du nur den Text willst.",
        },
        SAFETY,
        {
          q: "Gehen auch alte .doc-Dateien?",
          a: "Ja. .doc ist das OLE-Binärformat von vor 2007. Es wird in deinem Browser Byte für Byte gelesen und läuft dann durch dieselbe Ausgabestufe. Du bekommst Text, Überschriften, Tabellen, fett und kursiv. Zwei Dinge lassen sich aus dem Format nicht retten: Bilder und die genaue Listennummerierung. Wenn du Word zur Hand hast, liefert „Speichern unter → .docx“ ein saubereres Ergebnis.",
        },
        MODES,
        {
          q: "Warum sind meine verbundenen Zellen wieder getrennt?",
          a: "Weil colspan und rowspan in dieser Version nicht übernommen werden. Eine verbundene Zelle wird zu einer normalen Zelle, und ihre Nachbarn kommen leer raus. Die Tabelle ist trotzdem gültiges HTML und lesbar – sie ist nur nicht so angeordnet wie in Word. Ein colspan nachträglich von Hand zu ergänzen, ist meist eine Sache von einer Zeile.",
        },
      ],
    },
    "google-docs-to-html": {
      short: "Google Docs → HTML",
      eyebrow: "Google Docs → HTML",
      title: "Google Docs in HTML – Klassen-Müll raus, gratis, ohne Login",
      description:
        "Aus Google Docs einfügen, sauberes HTML bekommen. c1/c17-Klassen, der <b>-Wrapper und Googles Link-Umleitungen fliegen raus. Kein Drive, kein Login.",
      keywords: [
        "google docs html",
        "google docs in html",
        "google docs html export",
        "google docs html code",
        "google docs html einfügen",
        "sauberes html aus google docs",
      ],
      h1: ["Google Docs in HTML", "Ohne die Klassensuppe."],
      lede: [
        "Wenn du aus einem Doc kopierst, steckt das HTML in Klassennamen, die auf ein Stylesheet zeigen, das du nicht hast.",
        "Füg es hier ein, und übrig bleibt das Dokument: Überschriften, Listen, Tabellen, Links.",
      ],
      note: {
        heading: "So kriegst du es rein",
        items: [
          "Den Inhalt im Doc markieren und kopieren – nicht den Freigabelink",
          "Unten einfügen oder irgendwo auf dieser Seite Strg+V drücken",
          "Kein OAuth, keine Berechtigungen, kein Add-on",
        ],
      },
      body: {
        stepsHeading: "So funktioniert's",
        steps: [
          "Öffne dein Doc, markier den Inhalt, kopier ihn. Dann füg ihn unten ins Feld ein oder drück irgendwo auf dieser Seite Strg+V – dein Browser legt eine Rich-Text-Version in die Zwischenablage, und die wird gelesen.",
          "Zuerst läuft alles durch DOMPurify, denn HTML aus der Zwischenablage kann von jeder Seite im Netz stammen. Danach kommt der Google-Müll weg: die c1/c17-Klassen, der <b style=\"font-weight:normal\">-Wrapper, den Docs um alles legt, die docs-internal-guid-IDs und die google.com/url?q=-Umleitung um jeden Link.",
          "Prüf die abgeschottete Vorschau, dann kopier das HTML oder lade es als Datei herunter.",
        ],
        supportedHeading: "Was unterstützt wird",
        supported: [
          "Rich Text direkt aus Google Docs, Word Online, Notion oder einem anderen Web-Editor",
          "HTML-Quelltext, als Text eingefügt, und gespeicherte .html-Dateien",
          "Überschriften, Absätze, Listen mit echter Verschachtelung, Tabellen, Links, fett, kursiv, durchgestrichen",
          "Entfernen der sinnlosen <b style=\"font-weight:normal\">-Hülle, in die Docs das ganze Dokument packt",
          "Auflösen von google.com/url?q=-Umleitungen zurück auf die URL, die du wirklich verlinkt hast",
          "Entfernen von utm_- und anderen Tracking-Parametern aus den Links in deinem Dokument",
        ],
        limitsHeading: "Was es nicht kann",
        limits: [
          "Keine Verbindung zu deinem Google-Konto – nichts hier kann dein Drive sehen",
          "Beim Einfügen kommen keine Bilder mit: Die Zwischenablage verweist nur auf sie, auf Googles Servern",
          "Kommentare und Vorschläge fallen weg; klär sie vor dem Kopieren",
          "Diagramme, Zeichnungen und Smart Chips kommen bestenfalls als einfacher Text an",
          "Wer den Freigabelink statt des Inhalts kopiert, bekommt einen Link – und mehr gibt es dann nicht umzuwandeln",
          "Googles eigene Schrift- und Farbwahl wird mit dem restlichen Styling entfernt",
        ],
      },
      faq: [
        {
          q: "Warum ist das HTML von Google Docs so chaotisch?",
          a: "Weil es nie dafür gedacht war, dass du es liest. Docs schreibt ein Stylesheet voller Regeln wie .c1 und .c17 und hängt jedem Element die passende Klasse an. Kopierst du den Inhalt raus, kommen die Klassen mit, das Stylesheet aber nicht – also hast du Markup voller Klassennamen, die nichts mehr bedeuten. Obendrauf sitzt ein <b style=\"font-weight:normal\"> um das ganze Dokument, das formatierungsmäßig nichts tut, und jeder Link wird so umgeschrieben, dass er über google.com/url?q= läuft.",
        },
        {
          q: "Muss ich ein Add-on installieren oder mich anmelden?",
          a: "Nein, und es gibt auch nichts, wo man sich anmelden könnte. Diese Seite liest deine Zwischenablage, wenn du einfügst – das macht dein Browser für jede Seite. Drive-Zugriff hieße, Rechte für alle deine Dateien anzufordern und einen Server zu betreiben, der ein Token dafür aufbewahrt. Kopieren und Einfügen kostet dich zwei Sekunden und gibt uns nichts in die Hand.",
        },
        {
          q: "Wo sind meine Bilder geblieben?",
          a: "Die sind nicht mitgekommen, und das geht auch nicht. Wenn du aus einem Doc kopierst, zeigt das HTML in der Zwischenablage auf Bild-URLs auf Googles Servern, statt die Bilddaten mitzunehmen. Diese Links brauchen deine Sitzung zum Laden, für alle anderen wären sie kaputt. Wenn du Bilder brauchst, nimm Datei → Herunterladen → Microsoft Word (.docx) und bring die Datei zur DOCX-Seite.",
        },
        SAFETY,
        {
          q: "Geht das auch mit Notion, Word Online oder Confluence?",
          a: "Ja. Das Aufräumen speziell für Google ist der gründlichste Teil, aber die allgemeine Arbeit – bereinigen, sinnlose Hüll-Elemente auspacken, tote Klassen und Tracking-Parameter entfernen – gilt für alles, was du einfügst. Rich Text aus jedem Web-Editor ist einen Versuch wert.",
        },
        MODES,
      ],
    },
    "text-to-html": {
      short: "Text → HTML",
      eyebrow: "Klartext → HTML",
      title: "Text in HTML umwandeln – kostenlos, mit Absätzen und Links",
      description:
        "Klartext kostenlos in HTML-Absätze umwandeln. Leerzeilen trennen Absätze, URLs werden zu Links, Umbrüche zu <br> (beides optional), & < > werden maskiert.",
      keywords: [
        "text in html umwandeln",
        "text in html umwandeln kostenlos",
        "text in html umwandeln online",
        "txt in html umwandeln",
        "text zu html converter",
        "text datei in html umwandeln",
      ],
      h1: ["Text in HTML umwandeln", "Mit Absätzen, wie es sich gehört."],
      lede: [
        "Eine Leerzeile beginnt ein neues <p>. URLs werden zu Links, wenn du willst. Spitze Klammern werden maskiert, damit Text auch Text bleibt.",
        "Das einfachste Tool auf dieser Seite – und das, das Leute am häufigsten von Hand nachbauen.",
      ],
      note: {
        heading: "Gut zu wissen",
        items: [
          "Eine Leerzeile heißt: neuer Absatz",
          "URLs und E-Mail-Adressen verlinkt oder in Ruhe gelassen",
          "&, < und > maskiert, damit nichts verschluckt wird",
        ],
      },
      body: {
        stepsHeading: "So funktioniert's",
        steps: [
          "Füg deinen Text in das Feld ein oder zieh oben eine .txt-Datei rein. Zeilenenden von Windows, Mac und Unix werden gleich behandelt.",
          "Leerzeilen teilen den Text in Absätze. Innerhalb eines Absatzes werden einfache Zeilenumbrüche entweder zu <br> oder fließen zusammen – du entscheidest. Die Sonderzeichen von HTML werden dabei maskiert.",
          "Schalt die URL-Erkennung an oder aus, wähl Fragment oder ganze Seite, dann kopier das HTML oder lade die Datei herunter.",
        ],
        supportedHeading: "Was unterstützt wird",
        supported: [
          "Absätze an Leerzeilen trennen; mehrere Leerzeilen am Stück zählen als ein Umbruch",
          "Einfache Zeilenumbrüche als <br> behalten oder zu einer Zeile fließen lassen",
          "URLs mit http:// und https:// sowie Adressen mit www. werden zu Links",
          "E-Mail-Adressen werden zu mailto:-Links",
          "&, <, > und Anführungszeichen werden maskiert, damit ein <b> in deinem Text als Text sichtbar bleibt",
          "Zeilenenden als CRLF, CR und LF, und ein Byte Order Mark am Dateianfang",
        ],
        limitsHeading: "Was es nicht kann",
        limits: [
          "Kein Markdown – **fett** bleibt als Sternchen stehen. Dafür gibt es die Markdown-Seite.",
          "Einrückung wird nicht als Struktur gelesen: Ein mit Tab eingerückter Block wird weder Liste noch Codeblock",
          "Überschriften werden nicht geraten – eine kurze Zeile in Großbuchstaben bleibt ein Absatz",
          "Mit Leerzeichen ausgerichtete Tabellen bleiben Text; für echte Tabellen nimm die CSV-Seite",
          "Dateien über 25 MB",
        ],
      },
      faq: [
        {
          q: "Woran erkennt das Tool, wo ein Absatz anfängt?",
          a: "An einer Leerzeile. Das ist die eine Konvention, an die sich jeder hält, der Klartext schreibt, und da muss nichts geraten werden. Mehrere Leerzeilen hintereinander zählen als ein Umbruch. Hat dein Text gar keine Leerzeilen, bekommst du einen langen Absatz – und einen Hinweis darauf, damit du nicht rätseln musst.",
        },
        {
          q: "Was, wenn meine URLs keine Links werden sollen?",
          a: "Schalt „URLs im Text“ aus, dann bleiben sie normaler Text. Lohnt sich, wenn du über URLs schreibst statt auf sie zu verlinken – in einem Tutorial, einem Fehlerlog, einer Konfigurationsdatei.",
        },
        {
          q: "Warum steht mein <b> als Text da, statt etwas fett zu machen?",
          a: "Weil genau das „Klartext in HTML“ bedeutet. Deine Eingabe ist Text, also ist ein <b> drei sichtbare Zeichen und kommt als &lt;b&gt; raus. Wenn Tags wirken sollen, ist deine Eingabe kein Klartext – probier die Markdown-Seite oder, wenn du Rich Text einfügst, die Google-Docs-Seite.",
        },
        {
          q: "Wofür ist die <br>-Option?",
          a: "Für Gedichte, Adressen, Log-Ausgaben – alles, wo die Zeilenumbrüche zur Bedeutung gehören. Schalt sie aus bei Fließtext, der hart nach 80 Zeichen umbrochen wurde. Dann bricht der Browser ihn passend zum Fenster neu um.",
        },
        MODES,
        PRIVACY,
      ],
    },
    "csv-to-html-table": {
      short: "CSV → Tabelle",
      eyebrow: "CSV → HTML-Tabelle",
      title: "CSV in HTML-Tabelle umwandeln – kostenlos & online",
      description:
        "CSV in eine HTML-Tabelle umwandeln: Zeilen einfügen oder Datei reinziehen. Komma, Semikolon und Tab werden erkannt, Zeile 1 wird ein echtes <thead>.",
      keywords: [
        "csv in html tabelle umwandeln",
        "csv in html umwandeln",
        "csv in html",
        "csv datei in html umwandeln",
        "csv zu html",
        "html tabelle aus csv",
        "tsv in html tabelle",
      ],
      h1: ["CSV in HTML-Tabelle umwandeln", "Semantisch, kein Raster aus Divs."],
      lede: [
        "Um CSV in HTML umzuwandeln, füg die Zeilen ein oder zieh eine Datei rein. Die erste Zeile wird ein echtes <thead> mit scope-Attributen, damit Screenreader die Tabelle als Tabelle vorlesen.",
        "Kommas in Anführungszeichen, Zeilenumbrüche in Zellen und europäische Exporte mit Semikolon klappen alle.",
      ],
      note: {
        heading: "Gut zu wissen",
        items: [
          "Trennzeichen wird aus der Datei gelesen, du kannst es überschreiben",
          "<thead> und <th scope=\"col\">, keine gestylten Divs",
          "Optionales responsives CSS für schmale Bildschirme",
        ],
      },
      body: {
        stepsHeading: "So funktioniert's",
        steps: [
          "Zieh oben eine .csv oder .tsv rein oder füg die Zeilen direkt in das Feld ein. Nichts verlässt den Tab.",
          "Das Trennzeichen wird aus der Datei ermittelt – Komma, Semikolon, Tab oder senkrechter Strich – und über der Ausgabe angezeigt. Liegt die Erkennung daneben, stell es selbst ein.",
          "Leg fest, ob die erste Zeile eine Kopfzeile ist und ob das responsive CSS mitkommt, dann kopier das HTML oder lade die Datei herunter.",
        ],
        supportedHeading: "Was unterstützt wird",
        supported: [
          "Jedes Trennzeichen, das der Export benutzt hat, aus der Datei ermittelt oder von Hand gesetzt",
          "Felder in Anführungszeichen bleiben ganz; ein Zeilenumbruch in einer Zelle wird zu <br> statt zu einer kaputten Zeile",
          "Deutsche, französische und spanische Exporte, bei denen das Trennzeichen ein Semikolon ist, weil das Komma schon das Dezimalzeichen ist",
          "Erste Zeile als <thead> mit <th scope=\"col\"> oder gar keine Kopfzeile",
          "Ein Byte Order Mark am Anfang wird entfernt, damit es nicht in deinem ersten <th> landet",
          "Zu kurze Zeilen werden mit leeren <td> aufgefüllt, damit jede Zeile gleich viele Zellen hat",
        ],
        limitsHeading: "Was es nicht kann",
        limits: [
          "UTF-8 rein und UTF-8 raus, so wie es das meta charset angibt; andere Kodierungen kommen eventuell verstümmelt an",
          "25 MB Text und 100.000 Zellen auf einmal",
          "Zelltext wird maskiert, nie umformatiert – 007 kommt als 007 im <td> an",
          "Kein Sortieren, Filtern oder Summieren – es wandelt um, es rechnet nicht",
          "Kein JavaScript in der Ausgabe, die Tabelle ist also nicht interaktiv",
          "Unausgeglichene Anführungszeichen bringen jeden CSV-Leser aus dem Tritt, und Zellen können in der falschen Spalte landen",
        ],
      },
      faq: [
        {
          q: "Warum ein <table> und keine Divs mit CSS Grid?",
          a: "Weil Tabellendaten genau das sind, wofür das Table-Element da ist. Ein Screenreader sagt die Größe an, lässt dich Zelle für Zelle wandern und liest bei jeder Zelle die Spaltenüberschrift mit vor – nichts davon bietet ein Raster aus Divs. Suchmaschinen lesen es ebenfalls als Daten. Styling ist kein Grund, das aufzugeben.",
        },
        {
          q: "Was macht das responsive CSS eigentlich?",
          a: "Sehr wenig, mit Absicht. Es packt die Tabelle in ein Div, das waagerecht scrollt, wenn sie zu breit ist, und setzt border-collapse plus etwas Innenabstand und Rahmen. Das ist das Minimum, damit eine Tabelle auf dem Handy benutzbar ist. Alles andere überlässt es deinem eigenen Stylesheet. Schalt es aus, und du bekommst das nackte <table>.",
        },
        {
          q: "Mein Export nutzt Semikolons. Geht das?",
          a: "Ja. Überall, wo das Komma das Dezimalzeichen ist, exportiert eine Tabellenkalkulation stattdessen mit Semikolons – das wird aus der Datei gelesen und über der Ausgabe angezeigt. Liegt die Erkennung daneben, stell es selbst ein.",
        },
        {
          q: "In einer Zelle steht ein Komma. Verrutschen meine Spalten?",
          a: "Nein, solange das Feld in Anführungszeichen steht, was jedes korrekte CSV-Programm macht. \"Smith, John\" kommt als ein einziges <td> an. Ein Zeilenumbruch in einem Feld mit Anführungszeichen bleibt auch erhalten, als <br>, damit die Zeile nicht in zwei zerfällt.",
        },
        {
          q: "Kann ich mir eine CSV einfach als Tabelle im Browser ansehen?",
          a: "Ja. Stell auf „ganze Seite“ und lade die Datei herunter. Doppelklick drauf, und der Browser zeigt deine Zeilen als echte Tabelle, mit Rahmen, grau hinterlegter Kopfzeile und gestreiften Zeilen. Keine Tabellenkalkulation nötig, und die Datei lässt sich auch nächstes Jahr noch öffnen.",
        },
        {
          q: "Welche CSV-Option nehme ich in Excel oder Google Sheets?",
          a: "In Excel „CSV UTF-8 (durch Trennzeichen getrennt)“. Die einfache Option „CSV“ speichert in einer älteren, systemabhängigen Kodierung, dann können Umlaute und €-Zeichen verstümmelt ankommen. Google Sheets exportiert immer UTF-8: Datei → Herunterladen → Kommagetrennte Werte. Du hast die .xlsx schon? Dann spar dir den Umweg über CSV und nimm die Excel-Seite.",
        },
        {
          q: "Wie bekomme ich die Tabelle auf eine WordPress-Seite oder in ein CMS?",
          a: "Lass es auf „Fragment“ und kopier das HTML. In WordPress fügst du einen Block „Individuelles HTML“ hinzu und fügst es dort ein. Die meisten anderen Editoren haben eine HTML- oder Quelltextansicht, die das Gleiche tut. Mit eingeschaltetem responsivem CSS steckt die Tabelle in einem .table-wrap-Div – ergänz diese eine Regel in deinem Theme, sonst tut der Wrapper nichts.",
        },
        PRIVACY,
        MODES,
      ],
    },
    "excel-to-html-table": {
      short: "Excel → Tabelle",
      eyebrow: "Excel → HTML-Tabelle",
      title: "Excel in HTML-Tabelle umwandeln – Blätter wählen, kostenlos",
      description:
        "Excel-Arbeitsmappe (.xlsx) in semantische HTML-Tabellen umwandeln. Blätter auswählen, Kopfzeile festlegen, Werte statt Formeln. Kein Upload.",
      keywords: [
        "excel in html tabelle umwandeln",
        "excel in html umwandeln",
        "excel tabelle in html umwandeln",
        "excel in html",
        "xlsx in html",
        "excel tabelle als html code",
      ],
      h1: ["Excel in HTML-Tabelle umwandeln", "Werte, keine Formeln."],
      lede: [
        "Zieh eine .xlsx rein, wähl die Blätter, die du willst, und bekomm für jedes ein sauberes <table>.",
        "Farben und Schriften bleiben bewusst zurück – eine Tabelle mit eigenem Styling legt sich mit jeder Website an, in die du sie einfügst.",
      ],
      note: {
        heading: "Gut zu wissen",
        items: [
          "Jedes Blatt wird aufgelistet – hak die an, die du willst",
          "Zellwerte so, wie sie angezeigt werden, nicht der Formeltext",
          "100.000 Zellen pro Durchlauf",
        ],
      },
      body: {
        stepsHeading: "So funktioniert's",
        steps: [
          "Zieh oben eine .xlsx rein. Die Arbeitsmappe wird im Tab geöffnet, und jeder Blattname taucht als Button auf.",
          "Blatt eins wird sofort umgewandelt. Die anderen schaltest du an und aus – die Arbeitsmappe bleibt im Speicher, also wird nichts zweimal gelesen.",
          "Sag, ob die oberste Zeile die Überschriften enthält und ob du das responsive CSS willst. Danach kopierst du das HTML oder speicherst die Datei.",
        ],
        supportedHeading: "Was unterstützt wird",
        supported: [
          "Alles, was .xlsx speichert: Excel ab 2007, LibreOffice Calc, Numbers, Google Sheets",
          "Mehrere Blätter, jedes als eigene Tabelle unter einem <h2> mit dem Namen des Blatts",
          "Der Wert, den ein Leser sehen würde – ein <td> bekommt 42, nie =SUMME(A1:A9)",
          "Datumswerte als ISO-Text statt als Seriennummer à la 45000, die Excel intern speichert",
          "Oberste Zeile als <thead> (Zellen mit <th scope=\"col\">) oder ohne Kopf",
          "Ein <caption> an der Tabelle, wenn du ein einzelnes Blatt umwandelst – das lesen Screenreader zuerst vor",
        ],
        limitsHeading: "Was es nicht kann",
        limits: [
          "Farben, Schriften, Rahmen und bedingte Formatierung werden nicht nachgebaut – in dieser Version mit Absicht",
          "Verbundene Zellen verlieren colspan und rowspan; jede Zelle wird zu einem eigenen <td>",
          "Formeln werden nicht als Formeln übernommen, und es wird nichts neu berechnet",
          "Das alte .xls-Binärformat von vor 2007 ist ein ganz anderes Format und wird nicht unterstützt",
          "Diagramme, Pivot-Tabellen und Bilder im Blatt werden nicht exportiert",
          "Eine verschlüsselte Arbeitsmappe lässt sich hier nicht öffnen – speicher vorher eine ungeschützte Kopie",
          "Auswahlen über 100.000 Zellen",
        ],
      },
      faq: [
        {
          q: "Warum werden meine Farben und Schriften nicht übernommen?",
          a: "Weil eine Tabelle mit eigenen Farben in neun von zehn Fällen gegen das Stylesheet deiner Website verliert, und dann löschst du die Inline-Styles von Hand. Nützlich ist ein sauberes <table> mit der richtigen Struktur, das von der Seite gestylt wird, auf der es landet. Wenn du exakt den Originallook brauchst, liefert dir Excels eigenes „Speichern unter → Webseite“ genau das – zusammen mit mehreren Tausend Zeilen Markup.",
        },
        {
          q: "Steht im <td> die Formel oder das Ergebnis?",
          a: "Das Ergebnis. Eine Arbeitsmappe speichert die Formel und ihren zuletzt berechneten Wert, und auf eine Webseite gehört der Wert – also wird aus =SUMME(A1:A9) eine 42.",
        },
        {
          q: "Eine Formelzelle kam leer raus. Warum?",
          a: "Weil in der Datei kein gespeicherter Wert zum Lesen war. Excel schreibt ihn bei jedem Speichern, aber eine Arbeitsmappe, die ein Skript erzeugt hat und die nie in Excel offen war, hat gar keinen. Einmal öffnen, speichern, dann umwandeln.",
        },
        {
          q: "Können mehrere Blätter in eine Datei?",
          a: "Ja. Hak so viele Blattnamen an, wie du willst; jedes kommt als eigenes <table> raus, mit einem <h2> darüber, in dem der Name des Blatts steht.",
        },
        {
          q: "Was passiert mit verbundenen Zellen?",
          a: "Sie werden getrennt. Jede Zelle im Bereich wird zu einem eigenen <td>, der Wert steht in der ersten, der Rest bleibt leer. HTML kann eine Verbindung mit colspan und rowspan ausdrücken, aber sie aus einer Arbeitsmappe korrekt zu rekonstruieren, ist Arbeit für Phase zwei – deshalb sagt die Ausgabe vorerst ehrlich, dass sie ein einfaches Raster ist.",
        },
        PRIVACY,
      ],
    },
  },
  legal: {
    about: {
      short: "Über",
      eyebrow: "Über diese Seite",
      title: "Über Docs 2 HTML – wer es macht und warum",
      description:
        "Docs 2 HTML wandelt Markdown, Word, Google Docs, Text, CSV und Excel kostenlos im Browser in sauberes HTML um. Kein Konto, kein Upload. Wie und warum.",
      h1: "Ein kleines Tool, und die Gedanken dahinter",
      lede: [
        "Docs 2 HTML macht aus Dokumenten HTML, unter das du deinen Namen setzen würdest. Das ist das ganze Produkt.",
        "Gebaut und gepflegt wird es von einem unabhängigen Entwickler, und es läuft komplett in deinem Browser.",
      ],
      sections: [
        {
          heading: "Warum es das gibt",
          body: [
            "Jedes Schreibprogramm kann schon HTML exportieren. Genau das ist das Problem. Words „Speichern als Webseite“ erzeugt Tausende Zeilen mit einem mso-style-Attribut an fast jedem Element. Google Docs gibt dir Klassennamen wie c1 und c17, die auf ein Stylesheet verweisen, das du nicht mitbekommen hast. Beides ist technisch HTML, und beides taugt nicht als Quelltext für eine Webseite – du kannst es nicht lesen, nicht bearbeiten und nicht in ein Template einfügen, ohne dass es sich mit deinem CSS anlegt.",
            "Was Leute eigentlich wollen, ist das Markup, das sie von Hand geschrieben hätten: ein <h2>, wo eine Überschrift ist, ein <table>, wo eine Tabelle ist, und sonst nichts. Von einem offiziellen Export dahin zu kommen, heißt, mehr zu löschen als zu behalten. Also machen es die meisten von Hand oder geben auf und fügen das Chaos ein.",
            "Diese Seite übernimmt das Löschen. Sie liest die Struktur deines Dokuments, schreibt daraus semantisches HTML und wirft die Optik weg, statt sie nachzubauen.",
          ],
        },
        {
          heading: "Warum es in deinem Browser läuft",
          body: [
            "Die meisten Konverter laden deine Datei auf einen Server hoch, wandeln sie dort um und geben dir einen Download. Das ist ein vernünftiger Aufbau – und einer, bei dem dein Dokument eine Weile auf dem Rechner von jemand anderem liegt. Für einen Blog-Entwurf ist das okay. Für einen Vertrag, eine Patientenakte, interne Zahlen oder ein unveröffentlichtes Manuskript nicht.",
            "Deshalb läuft die Umwandlung auf deinem eigenen Gerät, in JavaScript, in dem Tab, den du sowieso offen hast. Es gibt keinen Upload-Schritt, weil es nichts gibt, wohin hochgeladen werden könnte. Das kannst du nachprüfen: Trenn die Netzwerkverbindung und wandle etwas um, oder beobachte den Netzwerk-Tab deines Browsers, während du eine Datei reinziehst.",
          ],
        },
        {
          heading: "Wie es tatsächlich funktioniert",
          body: [
            "Wenn du eine Datei reinziehst, liest dein Browser sie lokal und gibt die Bytes an einen Parser, der ebenfalls in deinem Browser läuft. Der Parser erzeugt eine Struktur, daraus wird HTML, und das HTML wird bereinigt, bevor du es überhaupt siehst. Die Parser sind Open-Source-Bibliotheken, ausgewählt je nach Format:",
          ],
          items: [
            "markdown-it parst Markdown, nach der CommonMark-Spezifikation plus GitHub-Tabellen, Aufgabenlisten und Durchstreichen.",
            "Mammoth liest .docx. Das alte .doc parst unser eigener Leser, Byte für Byte – es ist ein Binärformat von vor 2007, und dafür gibt es keine Bibliothek, die im Browser läuft.",
            "DOMPurify bereinigt jedes Stück HTML, das durchläuft – auch das HTML, das wir selbst erzeugen, weil der Text darin aus deinem Dokument stammt.",
            "Papa Parse liest CSV und TSV; read-excel-file liest .xlsx-Arbeitsmappen.",
          ],
        },
        {
          heading: "Zum Thema Sicherheit",
          body: [
            "Ein Tool, das HTML ausgibt, hat eine Pflicht, die ein Markdown-Konverter nicht hat: Was es dir gibt, wird vielleicht auf eine Live-Website kopiert und läuft dort. Bereinigung ist hier also kein Feature, sondern das Mindeste. Script-Tags, Event-Handler-Attribute, javascript:-URLs, iframes, objects und embeds werden aus allem entfernt, und nichts Unbereinigtes wird jemals in das DOM dieser Seite eingefügt.",
            "Die Vorschau ist eine eigene Baustelle. Sie wird in einem abgeschotteten iframe dargestellt, mit ausgeschalteten Skripten und einem opaken Origin. Sie kann diese Seite also nicht erreichen, nichts lesen und nichts ausführen – selbst wenn die Bereinigung irgendwie etwas übersehen hätte. Zwei unabhängige Mauern, weil eine allein ein Single Point of Failure ist.",
          ],
        },
        {
          heading: "Was es bewusst nicht macht",
          body: [
            "Es gibt keine Konten, weil es nichts zu speichern gibt. Es gibt keine API, weil es keinen Server gibt, den man aufrufen könnte. Es gibt keine Google-Drive-Anbindung, weil das hieße, Zugriff auf alle deine Dateien anzufordern und ein Token dafür aufzubewahren.",
            "Jede Umwandlung hat auch echte Grenzen, und jede Tool-Seite listet ihre eigenen auf. Verbundene Tabellenzellen werden getrennt. Farben und Schriften aus Excel werden nicht nachgebaut. Bilder kommen beim Einfügen aus Google Docs nicht mit. Das steht vorher da, statt dass du es erst merkst, nachdem du etwas Wichtiges umgewandelt hast.",
          ],
        },
        {
          heading: "Wie es sich finanziert",
          body: [
            "Das Tool ist kostenlos und hat keine Bezahlversion. Der Plan ist, das Hosting über Werbung zu decken, deshalb siehst du auf diesen Seiten künftig vielleicht Anzeigen. Anzeigen werden nie so platziert, dass man sie für einen Download- oder Umwandeln-Button halten könnte, und sie werden nach einer Umwandlung nicht so eingeblendet, dass die Seite unter deinem Mauszeiger verrutscht.",
            "Werbung ändert nichts daran, wie die Umwandlung funktioniert. Deine Dateien bleiben so oder so auf deinem Gerät – das ist keine Richtlinie, die man für mehr Einnahmen kippen könnte, sondern die Folge davon, dass es überhaupt keinen Server gibt.",
          ],
        },
        {
          heading: "Die Schwesterseite",
          body: [
            "DocsToMD macht denselben Job in die andere Richtung: Word, PDF, HTML, CSV und Excel zu Markdown. Gleicher Ansatz, gleicher Datenschutz, umgekehrtes Ausgabeformat. Wenn du hier gelandet bist und eigentlich Markdown willst, ist das die richtige Seite.",
          ],
        },
      ],
    },
    contact: {
      short: "Kontakt",
      eyebrow: "Melde dich",
      title: "Kontakt – Docs 2 HTML",
      description:
        "Schreib uns zu Dateien, die nicht klappen, zu falschem HTML, holprigen Übersetzungen oder Feature-Wünschen. Ein Entwickler liest alles.",
      h1: "Schreib uns",
      lede: [
        "Dieses Postfach liest eine einzige Person, Antworten kommen also nicht sofort – aber es sind echte Antworten, keine Ticketnummer.",
        `E-Mail: ${CONTACT_EMAIL}`,
      ],
      sections: [
        {
          heading: "Das HTML ist falsch rausgekommen",
          body: [
            "Das ist die nützlichste Meldung, die du machen kannst, und zugleich die kniffligste, weil wir deine Datei nicht sehen können. Beschreib sie deshalb bitte, statt sie zu schicken:",
          ],
          items: [
            "Auf welcher Seite du warst und was die Eingabe war – eine .docx, etwas aus Google Docs Eingefügtes, eine .csv",
            "Was du in der Ausgabe erwartet hast und was du bekommen hast: eine fehlende Tabelle, eine Überschrift, die als Absatz rauskam, ein Attribut, das hätte entfernt werden sollen",
            "Den betreffenden Ausschnitt aus dem HTML, das du bekommen hast, wenn du ihn teilen kannst – ein paar Zeilen reichen meistens",
            "Deinen Browser und dein Betriebssystem, weil sich Zwischenablage und Parsing je nachdem unterschiedlich verhalten",
          ],
        },
        {
          heading: "Sicherheitsmeldungen",
          body: [
            "Wenn du eine Eingabe gefunden hast, aus der HTML mit etwas Ausführbarem entsteht – ein übrig gebliebener Event-Handler, eine javascript:-URL, ein Tag, das hätte entfernt werden sollen –, schreib uns bitte und schick die genaue Eingabe mit, die es auslöst. Das ist hier die einzige Art von Fehler, die später jemandem schaden könnte, und sie wird vor allem anderen behoben.",
            "Melde es bitte zuerst privat, statt es zu veröffentlichen. Es gibt kein Bug-Bounty – aber einen schnellen Fix und ein ehrliches Dankeschön.",
          ],
        },
        {
          heading: "Bitte schick uns keine Dokumente per E-Mail",
          body: [
            "Der Sinn dieser Seite ist, dass deine Dateien auf deinem Computer bleiben. Wenn du uns eine mailst, hebelst du das auf deiner Seite aus und bringst uns in eine Lage, in der wir lieber nicht wären. Wenn du das Problem mit einer unwichtigen Datei nachstellen kannst – ein paar Überschriften und eine Tabelle in einem frischen Dokument –, ist das ohnehin nützlicher, weil es den Fehler eingrenzt.",
            "Wenn sich ein Problem wirklich nicht ohne die Originaldatei nachstellen lässt, schreib zuerst, dann klären wir, was nötig ist. Meist reicht eine Beschreibung der Struktur, nicht des Inhalts.",
          ],
        },
        {
          heading: "Übersetzungen",
          body: [
            "Diese Seite gibt es in mehreren Sprachen. Englisch ist das Original, der Rest wurde sorgfältig übersetzt – aber Muttersprachler finden trotzdem Dinge, die einer sorgfältigen Übersetzung entgehen: einen Satz, der technisch stimmt und sich komisch liest, einen Begriff, den man in der Software-Welt vor Ort anders sagt.",
            "Wenn dir so etwas auffällt, sag uns, welche Sprache und welche Seite, und zitier die Stelle. Kleine Korrekturen sind willkommen und werden schnell eingespielt.",
          ],
        },
        {
          heading: "Features, und was wir nicht bauen",
          body: [
            "Feature-Wünsche werden gelesen und oft umgesetzt, vor allem kleine – ein Schalter für einen Ausgabestil, die Unterstützung einer Formatvariante, ein Trennzeichen, das wir nicht erkennen, ein CSS-Hook, den du in der Ausgabe brauchst.",
            "Manches ist bewusst außen vor, und Nachfragen ändert daran nichts: Dateien auf einen Server hochladen, eine Google-Drive-Anbindung, Benutzerkonten oder das exakte Nachbauen von Word- und Excel-Styling. Für das Letzte entschuldigen wir uns nicht – sauberes Markup ist das Produkt.",
          ],
        },
        {
          heading: "Datenschutz und Rechtliches",
          body: [
            "Fragen dazu, welche Daten diese Seite erhebt, oder Anfragen zu deinen Daten nach DSGVO, CCPA oder ähnlichen Gesetzen gehen an dieselbe Adresse. Lies vorher die Datenschutzerklärung – kurz gesagt erheben wir nichts, was dich identifiziert, wodurch sich die meisten solcher Anfragen erledigen, und die Erklärung sagt genau, warum.",
          ],
        },
      ],
    },
    privacy: {
      short: "Datenschutz",
      eyebrow: "Datenschutzerklärung",
      title: "Datenschutzerklärung – Docs 2 HTML",
      description:
        "Was Docs 2 HTML erhebt und was nicht. Deine Dokumente bleiben im Browser und werden nie hochgeladen. Keine Konten, keine Analyse deiner Dateien.",
      h1: "Datenschutzerklärung",
      lede: [
        "Die Dokumente, die du hier umwandelst, verlassen nie deinen Computer. Das ist kein Versprechen darüber, wie wir mit deinen Daten umgehen – es gibt schlicht keinen Schritt, in dem wir sie bekommen.",
        "Diese Seite erklärt das im Detail und sagt ehrlich, wo ein Drittanbieter beteiligt ist.",
      ],
      sections: [
        {
          heading: "Deine Dokumente",
          body: [
            "Dateien, die du auf dieser Seite ablegst, auswählst oder einfügst, liest dein eigener Browser, und Code auf deinem eigenen Gerät wandelt sie um. Sie werden nicht an uns übertragen, nicht an einen Hosting-Anbieter und auch an niemanden sonst. Es gibt keine serverseitige Umwandlung, keine Warteschlange, keinen Zwischenspeicher und keinen Cache deiner Inhalte.",
            "Auch auf deinem Gerät wird nichts gespeichert. Wir legen deine Dateien und ihre umgewandelte Ausgabe weder im Local Storage noch in IndexedDB noch in einem Cookie ab. Schließt du den Tab, ist der Inhalt weg; die einzigen Kopien sind die Datei, mit der du angefangen hast, und alles, was du bewusst kopiert oder heruntergeladen hast.",
            "Die Vorschau verdient einen eigenen Hinweis, weil sie wie eine Ausnahme aussehen könnte. Sie ist keine: Die Vorschau ist ein iframe, dessen Inhalt ihm direkt von der Seite übergeben wird, die du schon offen hast, per srcdoc. Es wird nichts abgerufen und nichts gesendet. Der Frame ist abgeschottet (Sandbox) und hat einen opaken Origin, er kann also auch nichts lesen.",
            "Das alles kannst du nachprüfen. Trenn die Netzwerkverbindung und wandle eine Datei um – es funktioniert trotzdem. Oder öffne die Entwicklertools deines Browsers, beobachte den Netzwerk-Tab und überzeug dich, dass beim Ablegen einer Datei kein Upload passiert.",
          ],
        },
        {
          heading: "Was wir erheben",
          body: [
            "Wir fragen weder nach deinem Namen noch nach deiner E-Mail-Adresse oder Kontodaten und speichern nichts davon, denn es gibt keine Konten.",
            "Die Seite wird auf Cloudflare Workers gehostet. Wie jeder Webhost verarbeitet es die üblichen Anfragedaten, wenn dein Browser eine Seite anfordert – IP-Adresse, User-Agent, die angeforderte URL und die Uhrzeit. Das gehört zur Funktionsweise des Webs und dient dazu, die Seite auszuliefern und Missbrauch zu blockieren. Wir nutzen es zusammengefasst, um zu sehen, welche Seiten Besuche bekommen. Es ist mit nichts verknüpft, was du umwandelst, weil deine Umwandlungen nie einen Server erreichen.",
          ],
        },
        {
          heading: "Analyse, nur wenn du Ja sagst",
          body: [
            "Beim ersten Besuch fragt eine kleine Leiste unten auf der Seite, ob wir deinen Besuch zählen dürfen. Bis du auf „Erlauben“ klickst, wird kein Analyse-Skript geladen und kein Cookie gesetzt.",
            "Wenn du es erlaubst, wird Google Analytics geladen und setzt eigene Cookies, damit es Besuche zählen und neue von wiederkehrenden Besuchern unterscheiden kann. Es sieht, auf welcher Seite du bist, deinen ungefähren Standort und deinen Browser. Deine Dateien oder das, was du umwandelst, sieht es nie. Google Signals und personalisierte Werbung sind ausgeschaltet.",
            "Deine Antwort wird im Local Storage dieses Browsers gespeichert, damit wir nicht auf jeder Seite neu fragen. Wenn du es dir anders überlegst, klick unten auf jeder Seite auf „Analyse-Einstellungen“. Sagst du nach einem Ja doch Nein, wird die Analyse abgeschaltet und ihre Cookies werden gelöscht.",
          ],
        },
        {
          heading: "Cookies und Werbung",
          body: [
            "Solange du die Analyse nicht erlaubst, setzt die Seite keine Cookies. Es gibt keinen Login, keinen Warenkorb und auch sonst nichts, was ein Cookie speichern müsste. Die einzigen Cookies, die auftauchen können, sind die von Google Analytics, nachdem du Ja gesagt hast.",
            "Wir haben vor, Werbung von Google AdSense einzublenden, um die Hosting-Kosten zu decken. Sobald das aktiv ist, kann Google gemäß seinen eigenen Richtlinien Cookies setzen oder Gerätekennungen auslesen, um Anzeigen auszuliefern und zu messen. Das ist der einzige Teil dieser Seite, bei dem ein Drittanbieter etwas über deinen Besuch erfährt – und zwar über die Seite, auf der du bist, nicht über das Dokument, das du umgewandelt hast. Das kann Google gar nicht sehen.",
            "Wenn du dich im Europäischen Wirtschaftsraum, im Vereinigten Königreich oder in der Schweiz befindest, wirst du um Einwilligung gebeten, bevor nicht notwendige Cookies verwendet werden, und du kannst sie später widerrufen. Die Cookie-Richtlinie erklärt die Kategorien und wie du deine Meinung änderst.",
          ],
        },
        {
          heading: "Drittanbieter",
          body: ["Die Liste ist bewusst kurz:"],
          items: [
            "Cloudflare Workers hostet die statischen Dateien, aus denen diese Seite besteht.",
            "Google AdSense liefert, sobald aktiviert, die oben beschriebene Werbung aus.",
            "Die Dateien von Google Fonts liegen auf unserem eigenen Server und werden von dieser Domain ausgeliefert. Ein Seitenaufruf verrät Google also nicht, dass du hier warst.",
            "Google Analytics zählt Besuche, aber erst, nachdem du auf „Erlauben“ geklickt hast, wie oben beschrieben.",
            "Auf keiner Seite werden Sitzungsaufzeichnung, Heatmap, Chat-Widget oder Social-Media-Einbettungen geladen.",
          ],
        },
        {
          heading: "Kinder",
          body: [
            "Das hier ist ein Werkzeug zum Umwandeln von Dokumenten, ohne soziale Funktionen und ohne Konten. Es richtet sich nicht an Kinder unter 13 Jahren, und da wir von niemandem personenbezogene Daten erheben, erheben wir wissentlich auch keine von Kindern.",
          ],
        },
        {
          heading: "Deine Rechte",
          body: [
            "Nach der DSGVO, dem CCPA und ähnlichen Gesetzen hast du das Recht auf Auskunft, Berichtigung, Löschung und Übertragung deiner personenbezogenen Daten sowie das Recht, ihrer Verarbeitung zu widersprechen. Wir respektieren all diese Rechte – und in der Praxis sind solche Anfragen hier ungewöhnlich einfach zu beantworten, weil wir weder eine Datei haben, die du umgewandelt hast, noch ein Profil von dir, das wir herausgeben, berichtigen oder löschen könnten.",
            "Für die oben beschriebenen Analyse- und Werbe-Cookies ist Google der Verantwortliche, und Googles eigene Tools geben dir die direkteste Kontrolle über personalisierte Werbung. Schreib uns, dann sagen wir dir, wo du das findest.",
          ],
        },
        {
          heading: "Änderungen an dieser Erklärung",
          body: [
            "Wenn sich diese Erklärung wesentlich ändert – ein neuer Drittanbieter, eine neue Art von Daten –, ändert sich auch das Datum oben auf dieser Seite. Da die Seite keine E-Mail-Adressen speichert, können wir dich nicht direkt benachrichtigen. Das Datum ist also das ehrliche Signal, auf das du achten solltest.",
          ],
        },
      ],
    },
    terms: {
      short: "Nutzungsbedingungen",
      eyebrow: "Nutzungsbedingungen",
      title: "Nutzungsbedingungen – Docs 2 HTML",
      description:
        "Bedingungen für Docs 2 HTML: kostenlos für jeden Zweck, auch kommerziell, ohne Gewähr. Deine Dokumente bleiben deine. Ausgabe vorher prüfen.",
      h1: "Nutzungsbedingungen",
      lede: [
        "Wer diese Seite nutzt, akzeptiert, was unten steht. Es ist kurz, denn ein kostenloses Browser-Tool, das nichts speichert, braucht nicht viel.",
      ],
      sections: [
        {
          heading: "Was du damit machen darfst",
          body: [
            "Nutz es für alles, auch für kommerzielle Arbeit. Wandle so viele Dateien um, wie du willst. Kein Konto, kein Lizenzschlüssel, keine Namensnennung nötig, und keine Einschränkung, wie die Ausgabe verwendet wird – das HTML, das hier entsteht, darfst du veröffentlichen, verkaufen oder ändern.",
            "Es gibt zwei praktische Einschränkungen, und die gibt es dem Tool zuliebe, nicht uns: Jede Datei muss unter der Größengrenze bleiben, die auf der Seite angegeben ist, und die Umwandlung läuft auf deinem Gerät. Ein sehr großes Dokument wird also durch deinen eigenen Arbeitsspeicher und Prozessor begrenzt, nicht durch ein Kontingent, das wir festlegen.",
          ],
        },
        {
          heading: "Deine Dokumente bleiben deine",
          body: [
            "Du behältst alle Rechte, die du an den umgewandelten Dateien hattest, und an dem HTML, das dabei herauskommt. Wir beanspruchen an keinem von beidem eine Lizenz und könnten sie auch nicht nutzen, wenn wir wollten – die Umwandlung passiert in deinem Browser, und deine Inhalte erreichen uns nie.",
            "Du bist dafür verantwortlich, dass du das, was du umwandelst, auch umwandeln darfst. Wenn ein Dokument nicht dir gehört, ändert dieses Tool daran nichts.",
          ],
        },
        {
          heading: "Prüf die Ausgabe, bevor du sie veröffentlichst",
          body: [
            "Die Seite ist kostenlos und wird ohne Gewähr bereitgestellt. Wir zielen auf eine genaue, sichere Umwandlung und dokumentieren die bekannten Grenzen jedes Formats auf dessen eigener Seite, aber kein Konverter ist perfekt.",
            "Das ist hier wichtiger als bei den meisten Tools, denn die Ausgabe ist HTML, und du stellst sie wahrscheinlich auf eine Live-Website. Jede Eingabe wird bereinigt – Skripte, Event-Handler, javascript:-URLs und Einbettungen werden entfernt –, und ein Versagen dabei behandeln wir als die schwerste Art von Fehler. Wir können aber nicht garantieren, dass Markup aus einer beliebigen Eingabe in jedem Kontext sicher ist, in den du es einfügen könntest. Prüf, was du veröffentlichst, genau so, wie du HTML aus jeder anderen fremden Quelle prüfen würdest.",
            "Auch die Struktur hat Grenzen: Verbundene Tabellenzellen werden getrennt, Excel-Styling wird nicht nachgebaut, und komplexe Word-Layouts werden flach. Bei allem, worauf es ankommt, vergleich die Ausgabe mit dem Original.",
            "Soweit gesetzlich zulässig, haften wir nicht für verlorene Daten, verlorene Arbeit, entgangenen Gewinn oder andere Schäden, die durch die Nutzung der Seite oder das Verlassen auf ihre Ausgabe entstehen.",
          ],
        },
        {
          heading: "Zulässige Nutzung",
          body: [
            "Verarbeite mit der Seite kein Material, zu dem du nicht berechtigt bist, und nutz sie nicht so, dass du ihr oder anderen schadest:",
          ],
          items: [
            "Versuch nicht, die Seite kaputt zu machen, zu überlasten oder Schwachstellen zu suchen, um ihr oder ihren Nutzern zu schaden. Wenn du ein Sicherheitsproblem findest, melde es bitte stattdessen.",
            "Scrape oder automatisiere die Seite nicht so, dass sie für andere schlechter wird.",
            "Veröffentliche die Seite nicht als deine eigene und stell sie nicht so dar, als würde sie von jemand anderem betrieben.",
            "Stör, blockier oder bläh die Werbung, die das Hosting finanziert, nicht künstlich auf.",
          ],
        },
        {
          heading: "Die Software, auf der es aufbaut",
          body: [
            "Dieses Tool steht auf Open-Source-Bibliotheken – markdown-it, Mammoth, DOMPurify, Papa Parse, read-excel-file und weiteren –, jede unter ihrer eigenen Lizenz, deren Hinweise im ausgelieferten Code erhalten bleiben. Ihre Lizenzen gelten für diese Komponenten; diese Bedingungen gelten für diese Seite.",
          ],
        },
        {
          heading: "Verfügbarkeit und Änderungen",
          body: [
            "Das hier ist ein kostenloser Dienst, betrieben von einer Person. Wir können ohne Ankündigung ändern, wie er funktioniert, ein Format hinzufügen oder entfernen oder ihn vom Netz nehmen. Weil hier nichts von dir gespeichert ist, kostet dich ein Ausfall den Zugang zu einem Konverter und sonst nichts.",
            "Wenn sich diese Bedingungen ändern, ändert sich auch das Datum oben auf dieser Seite. Wer die Seite danach weiter nutzt, akzeptiert die überarbeitete Fassung.",
          ],
        },
      ],
    },
    cookies: {
      short: "Cookies",
      eyebrow: "Cookie-Richtlinie",
      title: "Cookie-Richtlinie – Docs 2 HTML",
      description:
        "Cookies bei Docs 2 HTML: keine, außer du erlaubst die Analyse – dann setzt Google Analytics eigene. Werbung braucht in EWR, UK und Schweiz dein Okay.",
      h1: "Cookie-Richtlinie",
      lede: [
        "Diese Seite setzt keine Cookies, außer du sagst Ja zur Analyse. Es gibt keinen Login und sonst nichts, was sich die Seite zwischen Besuchen merken müsste.",
        "Hier steht genau, was die Analyse und später die Werbung mit sich bringen.",
      ],
      sections: [
        {
          heading: "Was ein Cookie ist, kurz gesagt",
          body: [
            "Ein Cookie ist ein kleines Stück Text, das eine Seite deinen Browser aufbewahren und bei späteren Besuchen zurückschicken lässt. So erkennt eine Seite, dass zwei Seitenaufrufe vom selben Browser kamen – praktisch, um eingeloggt zu bleiben, und genauso praktisch fürs Tracking. Verwandte Techniken wie Local Storage und Gerätekennungen erledigen mit anderen Mitteln ziemlich dasselbe und sind hier mit gemeint.",
          ],
        },
        {
          heading: "Cookies, die diese Seite setzt",
          body: [
            "Keine, außer du klickst in der Analyse-Leiste auf „Erlauben“. Dann setzt Google Analytics zwei: _ga, das neue von wiederkehrenden Besuchern unterscheidet, und _ga_ gefolgt von einer ID, das den aktuellen Besuch verfolgt. Beide können bis zu zwei Jahre halten. Klickst du auf „Nein danke“ oder ignorierst die Leiste, wird nichts gesetzt.",
            "Es gibt kein Konto, in dem man eingeloggt bleiben müsste, keinen Warenkorb und keine Einstellung, die über Besuche hinweg gespeichert werden müsste. Selbst die Einstellungen am Konverter – Fragment oder ganze Seite, Einrückung, Kopfzeile, Trennzeichen – leben nur in der Seite, solange du sie offen hast, und werden beim Neuladen zurückgesetzt. Auch deine Dateien und ihre umgewandelte Ausgabe landen nie im Local Storage, in IndexedDB oder in einem Cookie.",
            "Das Einzige, was wir behalten, ist deine Antwort in der Analyse-Leiste, im Local Storage dieses Browsers, damit du nicht auf jeder Seite gefragt wirst.",
          ],
        },
        {
          heading: "Werbe-Cookies",
          body: [
            "Das Hosting wird über Werbung bezahlt, und wir haben vor, Google AdSense zu nutzen. Sobald das läuft, kann Google Cookies setzen oder Gerätekennungen auslesen, um Anzeigen auszuliefern, zu begrenzen, wie oft du dieselbe siehst, und Klicks zu messen. In manchen Einstellungen werden diese Cookies genutzt, um Anzeigen anhand deines Surfverhaltens auf anderen Seiten zu personalisieren.",
            "Diese Cookies setzt Google, nicht wir, und Google ist der Verantwortliche für die Daten, die sie enthalten. Sehen können sie die Seite, auf der du bist. Nicht sehen können sie irgendetwas, das du umwandelst – das verlässt deinen Browser nie, also gibt es für ein Werbe-Skript nichts zu lesen.",
          ],
        },
        {
          heading: "Einwilligung, wenn du in Europa bist",
          body: [
            "Wenn du dich im Europäischen Wirtschaftsraum, im Vereinigten Königreich oder in der Schweiz befindest, werden nicht notwendige Cookies erst verwendet, nachdem du zugestimmt hast. Du wirst einmal gefragt, über einen Einwilligungsdialog, und du kannst ablehnen und trotzdem jeden Teil der Seite nutzen – hier ist nichts hinter einer Einwilligung versteckt.",
            "Du kannst deine Antwort jederzeit ändern: Klick unten auf jeder Seite auf „Analyse-Einstellungen“, und die Leiste kommt zurück. Sagst du nach einem Ja doch Nein, wird die Analyse abgeschaltet und die gesetzten Cookies werden gelöscht.",
          ],
        },
        {
          heading: "Cookies selbst steuern",
          body: [
            "Unabhängig von allem auf dieser Seite hat dein Browser das letzte Wort:",
          ],
          items: [
            "Jeder große Browser kann Drittanbieter-Cookies in seinen Datenschutzeinstellungen komplett blockieren.",
            "Du kannst bestehende Cookies für eine Seite oder für alle Seiten jederzeit löschen.",
            "Private Fenster bzw. Inkognito-Fenster verwerfen Cookies, wenn du sie schließt.",
            "In Googles eigenen Anzeigeneinstellungen kannst du personalisierte Werbung auf allen Seiten abschalten, die sein Netzwerk nutzen.",
          ],
        },
        {
          heading: "Änderungen",
          body: [
            "Wenn diese Seite ein Cookie verwenden sollte, das sie heute nicht verwendet, wird diese Richtlinie vorher aktualisiert, und das Datum oben ändert sich. Wenn du wissen willst, was gerade gesetzt ist, statt uns einfach zu glauben: Die Entwicklertools deines Browsers zeigen dir die komplette Liste unter „Anwendung“ bzw. „Speicher“.",
          ],
        },
      ],
    },
  },
  guideIndex: {
    short: "Anleitungen",
    eyebrow: "Anleitungen",
    title: "Anleitungen – die kniffligen Stellen beim Umwandeln in HTML",
    description:
      "Sieben Anleitungen: sechs zu Umwandlungen, die oft haken – Markdown-Tabellen, Word, Google Docs, Absätze, große CSVs, Excel – und eine zu „ohne Upload“.",
    h1: "Anleitungen",
    lede: [
      "Jeder Konverter hat eine Seite, die sagt, was er macht. Diese hier sind für den Teil danach – die Datei, die falsch rauskam, und warum.",
      "Eine Anleitung pro Tool, plus eine dazu, wie die Datei vom Netz fernbleibt – alle geschrieben nach den Fragen, die Leute wirklich schicken. Keine Anmeldung, und jede Seite verlinkt direkt auf den passenden Konverter.",
    ],
  },
  guides: {
    "word-to-html-without-uploading": {
      short: "Ohne Upload",
      eyebrow: "Anleitung · Word → HTML",
      title: "Dokumente ohne Upload umwandeln: HTML im Tab, Vorschau in der Sandbox",
      description:
        "Das Dokument wird in diesem Tab zu HTML, die Vorschau läuft in einer Sandbox. Warum das besser ist als ein Server, wie du es prüfst und wo es aufhört.",
      keywords: [
        "word in html ohne upload",
        "docx in html offline",
        "word in html datenschutz",
        "dokument sicher in html umwandeln",
        "word in html ohne server",
      ],
      h1: "Deine .docx verlässt den Tab nie: So prüfst du das selbst",
      lede: [
        "Dieser Konverter baut das HTML auf deinem eigenen Gerät zusammen und zeigt es in einer Vorschau, die nicht ins Netz kommt. Zwei getrennte Versprechen, und beide lassen sich prüfen.",
        "Wenn das Dokument eine Kundenlieferung ist oder etwas, das noch nicht öffentlich ist, lautet die sinnvolle Frage nicht, ob der Anbieter es löscht – sondern ob es überhaupt verschickt wurde. Hier wurde es das nicht.",
      ],
      tool: "docx-to-html",
      sections: [
        {
          heading: "Das Markup entsteht, bevor überhaupt eine Anfrage rausgehen könnte",
          body: [
            "Eine .docx ist ein ZIP voller XML. Dieses Tool entpackt es und baut die Struktur komplett in Seitenskripten als HTML neu auf – Code, der beim Öffnen der Seite ankam und ab dann lokal arbeitet.",
            "Dahinter wartet kein Server auf eine Datei. Die Seite besteht aus statischen Dateien, es gibt also keine Adresse, an die ein Dokument geschickt werden könnte, selbst wenn der Code es versuchen würde.",
          ],
        },
        {
          heading: "Die Vorschau ist mit Absicht abgeschottet",
          body: [
            "Das erzeugte HTML wird in einem eingeschränkten Sandbox-iframe dargestellt. Dieser Frame kann das Markup zeichnen, darf aber keine Skripte ausführen, keine externen Schriften laden und keine Anfragen stellen – Markup, das zufällig etwas Aktives enthält, kann also trotzdem nichts tun.",
            "Die Sandbox schützt die Vorschau; das ist nicht dasselbe wie der Datenschutz der Datei. Aber deshalb kannst du dir ein Dokument ansehen, das du nicht selbst geschrieben hast, ohne dass die Vorschau selbst zur Tür ins Netz wird.",
          ],
        },
        {
          heading: "Lies das HTML, bevor du ihm traust",
          steps: [
            "Wandle die Datei um und schau dir dann den Quelltext an, nicht nur die gerenderte Ansicht.",
            "Such nach allem, was du nicht erwartest – ein Script-Tag, ein externes Bild, ein Beacon. Standardmäßig ist da nichts: Es ist dein Dokument als Tags, ohne etwas Angeschraubtes.",
            "Kopier das Markup in einen einfachen Editor und prüf dasselbe noch einmal abseits der Seite.",
          ],
          body: [
            "Markup, das du lesen kannst, ist Markup, für das du geradestehen kannst – eine andere Art von Vertrauen als bei einem Dienst, der dir eine fertige Datei zurückgibt, die du nie öffnest.",
          ],
        },
        {
          heading: "Jetzt probier es ohne Netz",
          steps: [
            "Öffne die Seite und trenn dann die Internetverbindung.",
            "Gib ihr eine .docx. Es kommt dasselbe HTML raus; es gab nie einen Weg zum Server und zurück, der abreißen könnte.",
          ],
          body: [
            "Lass während einer Umwandlung den Netzwerk-Tab offen, dann siehst du es auch, ohne etwas auszustecken: Das Dokument löst keine einzige ausgehende Anfrage aus.",
          ],
        },
        {
          heading: "Was das nicht abdeckt",
          body: [
            "Dass die Datei nicht übers Netz geht, ist die starke Aussage, aber nicht die einzige, die zählt. Sobald das HTML in ein Repo, ein CMS oder eine eingefügte E-Mail wandert, reicht es so weit wie dieser Ort.",
            "Und ein Browser bleibt ein Browser: Eine Erweiterung, die die Seite liest, oder etwas, das schon auf dem Computer ist, sieht das Dokument so oder so. Weg ist das größte Risiko – eine Kopie auf den Servern eines Konverters. Der Rest bleibt, wie er ist.",
          ],
        },
      ],
      outro:
        "Umwandeln, Quelltext lesen und, wenn du magst, zur Live-Vorführung das Netz trennen. Das Dokument wird in diesem Tab als HTML neu gebaut und nirgendwohin geschickt.",
    },
    "markdown-tables-to-html": {
      short: "Markdown-Tabellen",
      eyebrow: "Anleitung · Markdown → HTML",
      title: "Markdown-Tabelle in HTML-Tabelle umwandeln (mit Ausrichtung)",
      description:
        "Pipe-Tabellen werden zu echtem <table> mit <thead> und scope. Wie die Ausrichtungszeile geht, wie sie im HTML aussieht und warum Tabellen zu Text werden.",
      keywords: [
        "markdown tabelle in html",
        "markdown tabelle html",
        "markdown tabelle formatieren",
        "markdown tabelle ausrichtung",
        "markdown pipe tabelle",
        "markdown html table",
      ],
      h1: "Markdown-Tabellen als HTML-Tabellen",
      lede: [
        "Die Pipe-Tabelle ist das Stück Markdown, das Leute am häufigsten scheitern sehen. Auf GitHub sieht sie gut aus, woanders kommt sie als Absatz voller senkrechter Striche raus.",
        "Hier geht es um die Syntax, die die Umwandlung übersteht, wie das HTML auf der anderen Seite aussieht und um die drei Fehler, die eine Tabelle wieder zu Text machen.",
      ],
      tool: "markdown-to-html",
      sections: [
        {
          heading: "Was eine Tabelle braucht, um eine Tabelle zu sein",
          body: [
            "Pipe-Tabellen gehören nicht zu CommonMark. Sie kommen aus GitHub Flavored Markdown, ein Konverter muss sie also eigens unterstützen – und manche tun das nicht. Dieser schon.",
            "Drei Dinge sind Pflicht: eine Kopfzeile, darunter eine Trennzeile aus Bindestrichen und mindestens eine Datenzeile. Fehlt eins davon, bekommst du Absätze.",
          ],
          steps: [
            "Schreib die Kopfzeile mit einem senkrechten Strich zwischen den Zellen. Die äußeren Striche am Zeilenanfang und -ende sind optional, aber mit ihnen erkennst du schiefe Tabellen viel leichter.",
            "Schreib die Trennzeile direkt darunter, ohne Leerzeile dazwischen. Mindestens drei Bindestriche pro Spalte sind das sichere Minimum.",
            "Schreib deine Datenzeilen. Im Quelltext müssen sie nicht bündig stehen; die Zellen werden an den Strichen getrennt, nicht an den Spalten.",
          ],
          sample: {
            beforeLabel: "Markdown",
            before: "| Part | Qty |\n| ---- | --- |\n| Bolt | 12 |\n| Nut  | 12 |",
            afterLabel: "HTML",
            after: '<table>\n  <thead>\n    <tr>\n      <th scope="col">Part</th>\n      <th scope="col">Qty</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Bolt</td>\n      <td>12</td>\n    </tr>\n  </tbody>\n</table>',
          },
        },
        {
          heading: "Das scope-Attribut, und warum es da ist",
          body: [
            "Kopfzellen kommen als <th scope=\"col\"> raus, nicht als fettes <td>. Dieses Attribut ist der ganze Grund, warum ein Screenreader „Qty, 12“ ansagen kann, statt eine nackte Zahl vorzulesen, ohne zu wissen, zu welcher Spalte sie gehört.",
            "Es kostet nichts und macht den Unterschied zwischen einer Tabelle und einem Haufen Zahlen. Ein aus Divs nachgebautes Layout kann das gar nicht ausdrücken – das stärkste Argument dagegen, je eins zu bauen.",
          ],
        },
        {
          heading: "Ausrichtung: die Doppelpunkt-Zeile",
          body: [
            "Doppelpunkte in der Trennzeile legen die Ausrichtung pro Spalte fest. Ein Doppelpunkt links richtet links aus, auf beiden Seiten zentriert, rechts richtet rechts aus – genau das willst du für Zahlen.",
            "Im HTML bekommst du eine Klasse, keinen Inline-Style: align-left, align-center oder align-right. Inline-Styles werden aus jeder Ausgabe auf dieser Seite entfernt, weil ein style-Attribut die Tür ist, durch die CSS-Injection hereinspaziert.",
            "Das heißt: Bei der Ausgabe als ganze Seite funktioniert die Ausrichtung schon – das Stylesheet im <head> definiert die drei Klassen. Beim Fragment bleiben sie deinem eigenen CSS überlassen, und genau dafür ist das Fragment da: drei einzeilige Regeln, und es passt zu deiner Seite, statt gegen sie zu arbeiten.",
          ],
          sample: {
            beforeLabel: "Markdown",
            before: "| Item | Cost |\n| :--- | ---: |\n| Bolt | 0.40 |",
            afterLabel: "HTML",
            after: '<th scope="col" class="align-left">Item</th>\n<th scope="col" class="align-right">Cost</th>\n...\n<td class="align-left">Bolt</td>\n<td class="align-right">0.40</td>',
          },
        },
        {
          heading: "Wenn die Tabelle als Absatz rauskommt",
          body: [
            "Drei Ursachen, in der Reihenfolge, in der sie auftauchen.",
          ],
          steps: [
            "Eine Leerzeile zwischen Kopfzeile und Trennzeile. Die zerlegt alles in zwei Absätze, bevor der Tabellen-Parser es überhaupt zu sehen bekommt.",
            "Ein senkrechter Strich im Text einer Zelle. Maskier ihn als \\|, sonst zerfällt die Zelle in zwei und die Zeile hat mehr Zellen als die Kopfzeile.",
            "Zu wenige Bindestriche. Ein einziger Bindestrich pro Spalte geht in manchen Parsern und in anderen nicht; drei sind die Variante, auf die sich alle einigen.",
          ],
        },
        {
          heading: "Zellen mit mehr als Text",
          body: [
            "Inline-Markdown funktioniert in Zellen: fett, kursiv, Code-Spans, Links. Block-Inhalte nicht – keine Listen, keine Absätze, keine Codeblöcke. Das ist eine Grenze der Tabellensyntax selbst, nicht dieses Konverters.",
            "Ein Zeilenumbruch in einer Zelle braucht ein wörtliches <br>, von Hand geschrieben. Rohes HTML in Markdown wird hier durchgereicht statt maskiert, also funktioniert es – und wird auf dem Weg nach draußen wie alles andere bereinigt.",
          ],
        },
      ],
      outro:
        "Das sind alle Teile einer Pipe-Tabelle, die sich als HTML anders verhalten. Der Konverter nimmt eingefügtes Markdown oder eine reingezogene .md-Datei, und nichts verlässt deinen Browser.",
    },
    "word-to-html-keep-formatting": {
      short: "Word-Formatierung",
      eyebrow: "Anleitung · DOCX → HTML",
      title: "Word-Formatierung in HTML: Was bleibt und was nicht",
      description:
        "Welche Teile einer .docx als HTML ankommen und welche bewusst wegfallen: Überschriften, Tabellen, Listen, Bilder bleiben; Schriften, Farben, Layout nicht.",
      keywords: [
        "word formatierung in html umwandeln",
        "word in html mit formatierung",
        "docx in html formatierung",
        "word dokument in html ohne formatierungsverlust",
        "docx in sauberes html",
      ],
      h1: "Was übrig bleibt, wenn Word zu HTML wird",
      lede: [
        "„Die Formatierung behalten“ kann zwei verschiedene Dinge heißen, und welches du meinst, entscheidet, ob dir das Ergebnis gefällt.",
        "Struktur – Überschriften, Listen, Tabellen, Hervorhebungen – kommt durch. Aussehen – Schriften, Farben, Ränder, Seitenumbrüche – nicht, und das ist eine bewusste Entscheidung, kein fehlendes Feature.",
      ],
      tool: "docx-to-html",
      sections: [
        {
          heading: "Struktur bleibt, Aussehen nicht",
          body: [
            "Eine .docx speichert zu jedem Absatz zwei getrennte Dinge: was er ist und wie er aussieht. „Überschrift 2“ ist, was er ist. 16 pt Calibri fett mit 6 pt Abstand danach ist, wie er aussieht.",
            "Der Konverter liest das Erste und wirft das Zweite weg. Aus einer Überschrift 2 wird ein <h2> – kein <p> mit Schriftgröße. Auf deiner Website übernimmt sie dann deinen eigenen Überschriftenstil, und das wolltest du so gut wie sicher.",
            "Die Alternative ist das, was Words eigenes „Speichern als Webseite“ macht: ein paar Tausend Zeilen mso-Stile, die die Seite exakt nachbilden und sich danach weder bearbeiten noch neu stylen lassen.",
          ],
        },
        {
          heading: "Formatvorlagen für Überschriften nutzen, nicht nur fett machen",
          body: [
            "Das ist das Einzige, was sich vor dem Umwandeln in Word lohnt, und es macht den Unterschied zwischen guter und flacher Ausgabe.",
            "Text, der nur wie eine Überschrift aussieht – größer, fett, von Hand vergrößert –, ist als normaler Absatz gespeichert. Er wird zu <p>, weil er genau das ist. Aus der Schriftgröße lässt sich die Absicht nicht zurückgewinnen.",
          ],
          steps: [
            "Setz in Word den Cursor in eine Überschrift und schau in den Formatvorlagen-Katalog. Steht da „Standard“, ist das das Problem.",
            "Wende stattdessen Überschrift 1, 2 oder 3 an. Das ändert das Aussehen; wenn es dir nicht gefällt, pass die Formatvorlage selbst an.",
            "Mach dasselbe bei Listen: Nimm die Listen-Buttons, statt „1.“ und einen Tab zu tippen. Von Hand getippte Nummern werden zu normalem Text, nicht zu einem <ol>.",
            "Wandle um und prüf die Ausgabe auf <h2> und <ul>. Siehst du nur eine Wand aus <p>, war das Dokument von Anfang an nicht strukturiert.",
          ],
        },
        {
          heading: "Was durchkommt",
          body: [
            "Überschriftenebenen als <h1> bis <h6>, aus Words Formatvorlagen übernommen. Fett, kursiv und durchgestrichen als <strong>, <em> und <s>. Hoch- und tiefgestellt. Links, ohne die Tracking-Parameter von Google und Office.",
            "Listen als echte <ul> und <ol>, bis zu fünf Ebenen tief verschachtelt. Tabellen als <table>, einschließlich verbundener Zellen: Waagerechte Verbindungen kommen als colspan durch, senkrechte als rowspan.",
            "Zitate aus der Formatvorlage „Zitat“. Absätze mit einer Code- oder Vorformatiert-Formatvorlage als <pre><code>. Beschriftungen als <p class=\"caption\">.",
          ],
        },
        {
          heading: "Was wegfällt, und warum",
          body: [
            "Schriften, Größen, Farben, Hervorhebungen, Ausrichtung, Einzüge, Zeilenabstand, Seitenumbrüche, Kopf- und Fußzeilen, Ränder. Das alles ist Gestaltung, die zu einer Seite gehört – und HTML ist keine Seite.",
            "Zwei Dinge, die wegfallen, solltest du kennen, weil man sie leicht übersieht. Unterstrichener Text verliert die Unterstreichung – im Web heißt Unterstreichung Link, also wird Words Unterstreichung zu nichts statt zu etwas Irreführendem. Und leere Abstandsabsätze verschwinden, weil sie Layout sind, kein Inhalt.",
            "Änderungsverfolgung und Kommentare fallen weg: Du bekommst den finalen Text, nicht den Bearbeitungsverlauf. Textfelder, SmartArt und Diagramme überleben nicht – nur ihr Text, falls sie welchen enthalten.",
          ],
        },
        {
          heading: "Bilder: drei Optionen",
          steps: [
            "Inline als base64 ergibt eine einzige, eigenständige .html-Datei, die du mailen oder per Doppelklick öffnen kannst. Sie ist etwa ein Drittel größer als die Bilder vorher.",
            "Eigene Dateien ergibt ein ZIP: das HTML plus einen images/-Ordner, und jedes <img> zeigt schon auf den richtigen Pfad. Nimm das für alles, was auf eine echte Website kommt.",
            "Weglassen lässt die <img>-Tags mit leerem src stehen, du siehst also Platzhalter für kaputte Bilder. Lösch sie oder nimm eine der anderen beiden Optionen.",
          ],
          body: [
            "Alte .doc-Dateien sind die Ausnahme: Aus diesem Format lassen sich Bilder überhaupt nicht retten, egal welche Option du wählst. Alles andere – Text, Überschriften, Tabellen, fett – kommt durch.",
          ],
        },
      ],
      outro:
        "Erst die Überschriften-Formatvorlagen setzen, dann umwandeln. Die Dateien werden in deinem Browser gelesen und nie hochgeladen, du kannst es also auch mit etwas Vertraulichem probieren.",
    },
    "google-docs-to-html-clean": {
      short: "Google-Docs-Klassensuppe",
      eyebrow: "Anleitung · Google Docs → HTML",
      title: "Sauberes HTML aus Google Docs: die c1/c17-Klassensuppe entfernen",
      description:
        "Aus Google Docs kopiertes HTML steckt voller c1/c17-Klassen, einem <b>-Wrapper und google.com/url-Umleitungen. Was das ist und wie du alles loswirst.",
      keywords: [
        "sauberes html aus google docs",
        "google docs html klassen entfernen",
        "google docs html code",
        "google docs html export",
        "google docs html einfügen",
      ],
      h1: "Sauberes HTML aus einem Google Doc holen",
      lede: [
        "Kopier ein paar Absätze aus einem Doc, füg sie in ein CMS ein, und du hast Text in Klassennamen wie c1 und c17, die auf ein Stylesheet zeigen, das du nicht hast.",
        "An diesem Markup sind drei konkrete Dinge falsch. Wenn du weißt, welche, ist die Lösung ein einziges Einfügen.",
      ],
      tool: "google-docs-to-html",
      sections: [
        {
          heading: "Den Inhalt kopieren, nicht den Link",
          body: [
            "Hier stolpern Leute als Erstes: Datei → Herunterladen → Webseite im Menü des Docs gibt dir ein ZIP mit einem vollständigen HTML-Dokument und eingebettetem Stylesheet – die ganze Seite, mit allen Stilen.",
            "Was du stattdessen willst, ist die Zwischenablage. Wenn du in einem Doc Inhalt markierst und kopierst, landet dort eine Rich-Text-HTML-Version, und die bringt die Struktur ohne das Stylesheet mit.",
          ],
          steps: [
            "Öffne das Doc und markier den Inhalt, den du willst. Strg+A geht, wenn du alles willst.",
            "Kopier mit Strg+C – nicht über „Link kopieren“, das gibt dir nur eine URL zum Dokument.",
            "Füg es auf der Konverter-Seite ins Feld ein oder drück irgendwo auf der Seite Strg+V. Keine Anmeldung, keine Drive-Berechtigung; dein Browser gibt die Zwischenablage weiter, sonst nichts.",
          ],
        },
        {
          heading: "Problem eins: die Klassensuppe",
          body: [
            "Googles HTML in der Zwischenablage hängt an fast jedes Element eine Klasse – c0, c1, c17 und lst-kix_-Namen an Listenpunkten. Sie werden pro Dokument erzeugt und verweisen auf CSS, das im Doc zurückbleibt.",
            "Sie sind also nicht nur Rauschen. Es sind tote Verweise: Sie tun auf deiner Seite nichts, sie kollidieren mit deinen eigenen Klassennamen, und sie machen das Markup unlesbar, wenn du es bearbeiten willst.",
            "Entfernt werden sie nach Muster – c gefolgt von Ziffern, alles mit lst-kix_, docs-internal-guid-IDs. Eigene Klassen, die zufällig im Eingefügten stecken, bleiben in Ruhe.",
          ],
          sample: {
            beforeLabel: "Aus Docs eingefügt",
            before: '<p class="c3"><span class="c1">A sentence.</span></p>',
            afterLabel: "Nach dem Aufräumen",
            after: "<p>A sentence.</p>",
          },
        },
        {
          heading: "Problem zwei: der Fett-Wrapper, der nicht fett ist",
          body: [
            "Docs packt kopierte Inhalte in <b style=\"font-weight:normal\">. Das ist ein <b>-Tag, das Fettdruck ausdrücklich abschaltet – eine Eigenheit, wie der Editor intern Formatierung verwaltet.",
            "Füg das irgendwo ein, wo das style-Attribut entfernt wird – das sind die meisten CMS –, und der ganze Block wird fett. Hier wird das Tag ausgepackt statt behalten, der Inhalt landet also auf der Verschachtelungsebene, auf der er von Anfang an hätte stehen sollen.",
            "Im selben Durchgang verschwinden leere <span>-Elemente, die übrig bleiben, wenn ihre Klassennamen weg sind. Die sind der Grund, warum zwei eingefügte Absätze zwölf Zeilen lang werden.",
          ],
        },
        {
          heading: "Problem drei: Jeder Link ist eine Umleitung",
          body: [
            "Links aus einem Doc zeigen auf google.com/url?q=https://example.com/… statt aufs Ziel. Google nutzt das, um Klicks im Editor zu tracken.",
            "Auf einer Seite veröffentlicht, heißt das: Jeder ausgehende Link deiner Website läuft über Google, zeigt in der Statusleiste die falsche URL und geht kaputt, sobald Google diese Umleitung ändert.",
            "Die Umleitung wird bis zum echten Ziel aufgelöst, notfalls mehrfach, wenn sie verschachtelt ist. Tracking-Parameter fliegen auch raus – utm_source und Co., gclid, fbclid und eine Handvoll weitere.",
          ],
          sample: {
            beforeLabel: "Aus Docs eingefügt",
            before: '<a href="https://www.google.com/url?q=https://example.com/a%3Futm_source%3Ddoc">link</a>',
            afterLabel: "Nach dem Aufräumen",
            after: '<a href="https://example.com/a">link</a>',
          },
        },
        {
          heading: "Was übrig bleibt, und was noch bei dir liegt",
          body: [
            "Überschriften, Absätze, Listen, Tabellen, Links, fett und kursiv – mit anderen Worten: das Dokument. Skripte, Event-Handler und Inline-Styles sind weg, weil HTML aus der Zwischenablage von jeder Seite im Netz stammen kann und als fremde Eingabe behandelt wird.",
            "Zwei Dinge lässt das Aufräumen für dich übrig. Googles leere Abstandsabsätze kommen als <p></p> durch, lösch also die, die du nicht willst. Und die Bilder aus Docs liegen auf Googles Servern, mit URLs, die ablaufen – lad sie herunter und hoste sie selbst, sonst verschwinden sie später von deiner Seite.",
          ],
        },
      ],
      outro:
        "Markieren, kopieren, einfügen. Die Zwischenablage wird in deinem Browser gelesen, und nichts wird irgendwohin geschickt.",
    },
    "plain-text-to-html-paragraphs": {
      short: "Text zu Absätzen",
      eyebrow: "Anleitung · Text → HTML",
      title: "HTML-Leerzeile einfügen: Abstand zwischen zwei Absätzen",
      description:
        "Enter drücken bringt in HTML keinen Abstand. Leerzeile mit zwei <br>, <p>&nbsp;</p> oder CSS-Margin einfügen, und so werden Leerzeilen im Text zu <p>-Tags.",
      keywords: [
        "html leerzeile",
        "html leerzeile einfügen",
        "leerzeile html code",
        "html leerzeile &nbsp",
        "html mehrere leerzeilen einfügen",
        "html absatz einfügen",
        "html absatz br",
        "text in html umwandeln",
      ],
      h1: "Leerzeile in HTML einfügen: so geht's",
      lede: [
        "Text, den du direkt in eine Seite einfügst, fällt zu einem einzigen Block zusammen, weil HTML deine Zeilenumbrüche ignoriert. Für einen Browser ist jede Folge von Leerraum ein einziges Leerzeichen.",
        "Zwei Regeln entscheiden über das ganze Ergebnis: Leerzeilen trennen Absätze, und bei einfachen Zeilenumbrüchen entscheidest du. Alles andere folgt daraus.",
      ],
      tool: "text-to-html",
      sections: [
        {
          heading: "Vier Wege zu einer Leerzeile",
          body: [
            "Zweimal Enter in deinem HTML bewirkt auf dem Bildschirm nichts. Das hier schon, das Häufigste zuerst.",
            "Zwischen Absätzen: ein <p> schließen und ein neues öffnen. Browser geben jedem <p> oben und unten 1em Außenabstand, ungefähr eine Zeile – der Abstand ist also schon da.",
            "Innerhalb eines Absatzes: zwei <br>-Tags hintereinander, wie in line one<br><br>line three. Das erste beendet die Zeile, das zweite lässt eine leere stehen.",
            "Ein leerer Absatz: <p>&nbsp;</p>. Ein nacktes <p></p> hat keine Höhe und zeigt nichts. Das geschützte Leerzeichen gibt ihm eine Zeile Höhe.",
            "Mehr oder weniger Abstand als eine Zeile: Leg es in CSS fest, zum Beispiel p { margin-bottom: 2em; }. Das ist die saubere Lösung, wenn der Abstand eine Designfrage ist und nicht Teil des Textes.",
          ],
        },
        {
          heading: "Leerzeilen im Klartext werden zu <p>-Tags",
          body: [
            "Eine Leerzeile zwischen zwei Textblöcken ergibt zwei <p>-Elemente. Das ist die einzige Absatzregel, die es gibt, und dieselbe Konvention, die jede Klartext-E-Mail seit dreißig Jahren nutzt.",
            "In HTML selbst werden leere Zeilen im Quelltext ignoriert – ein Browser macht aus jeder Folge von Leerraum ein einziges Leerzeichen –, also bringt Enter in deinem Markup keinen sichtbaren Abstand. Der Abstand zwischen Absätzen kommt von den <p>-Tags selbst; ein einzelnes <br> bricht nur die Zeile um. Dieser Konverter macht aus jeder Leerzeile in deinem Text einen echten <p>-Umbruch, damit du nichts davon von Hand schreiben musst.",
            "Eine Zeile, in der nur Leerzeichen oder Tabs stehen, zählt trotzdem als leer. Mehrere Leerzeilen hintereinander ergeben immer noch einen Umbruch, keine leeren Absätze.",
            "Hat dein Text gar keine Leerzeilen, bekommst du einen langen Absatz – zu Recht, denn es gab nichts zum Trennen. Der Konverter sagt dir das, wenn er es bemerkt, statt dich es später selbst herausfinden zu lassen.",
          ],
          sample: {
            beforeLabel: "Text",
            before: "First thought.\n\nSecond thought.",
            afterLabel: "HTML",
            after: "<p>First thought.</p>\n<p>Second thought.</p>",
          },
        },
        {
          heading: "Einfache Zeilenumbrüche: <br> oder Leerzeichen",
          body: [
            "Innerhalb eines Absatzes kann ein einfacher Zeilenumbruch zweierlei werden, und was richtig ist, hängt ganz davon ab, was der Text ist.",
            "Behalt sie als <br> bei allem, wo das Zeilenende eine Bedeutung hat: eine Adresse, ein Gedicht, ein Signaturblock, Songtexte. Lass den Text fließen – Umbrüche werden zu Leerzeichen – bei Fließtext, den ein alter Editor hart nach 72 Zeichen umbrochen hat. Lässt du die als <br> stehen, bekommst du einen Absatz mit ausgefranstem rechtem Rand, der auf dem Handy nicht neu umbricht.",
          ],
          sample: {
            beforeLabel: "Text",
            before: "12 Bridge Street\nManchester",
            afterLabel: "HTML, Umbrüche behalten",
            after: "<p>12 Bridge Street<br>\nManchester</p>",
          },
        },
        {
          heading: "URLs im Text zu Links machen",
          body: [
            "Mit eingeschalteter Verlinkung wird alles, was mit http://, https:// oder www. anfängt, zu einem <a>. E-Mail-Adressen werden zu mailto:-Links.",
            "Die Erkennung ist bewusst eng. Ein nacktes example.com wird nicht verlinkt, weil es sich nicht von einem Satz unterscheiden lässt, der auf einen Dateinamen oder eine Abkürzung mit Punkt endet. Falsch geraten heißt dort: Links ins Nichts.",
            "Satzzeichen am Ende bleiben außerhalb des Links, damit eine URL am Satzende nicht den Punkt verschluckt. Links bekommen rel=\"noopener nofollow\" und öffnen sich nicht in einem neuen Tab.",
          ],
        },
        {
          heading: "Was Klartext dem Konverter nicht sagen kann",
          body: [
            "Alles hier wird zu einem Absatz. Eine andere Ausgabe gibt es nicht, und das liegt an der Eingabe, nicht an einer Schwäche des Tools.",
            "Eine Zeile, die mit einem Bindestrich anfängt, sieht für dich wie eine Liste aus, ist aber ein Bindestrich und ein Leerzeichen. Eine mit Gleichheitszeichen unterstrichene Zeile sieht wie eine Überschrift aus, ist aber eine Reihe Gleichheitszeichen. Raten läge oft genug daneben, um schlimmer zu sein als gar nicht zu raten.",
            "Also: keine Listen, keine Überschriften, keine Codeblöcke. Einrückung bleibt als Zeichen erhalten, fällt im Browser aber zusammen – ASCII-Tabellen und eingerückter Code kommen also als zusammengelaufener Fließtext raus. Wenn dein Text eigentlich Markdown ist, nimm die Markdown-Seite – dort bedeuten diese Konventionen etwas.",
          ],
        },
        {
          heading: "Worum du dir keine Sorgen machen musst",
          body: [
            "Spitze Klammern, kaufmännische Und-Zeichen und Anführungszeichen werden maskiert, jedes einzelne. Steht in deinem Text <b>bold</b>, zeigt die Seite diese Zeichen, statt fett zu werden.",
            "Das ist die Definition des Tools, keine angeschraubte Sicherheitsfunktion. Klartext ist Klartext: Könnte er Markup enthalten, wäre er keiner.",
          ],
        },
      ],
      outro:
        "Text einfügen oder eine .txt-Datei reinziehen, festlegen, wie sich einfache Zeilenumbrüche verhalten sollen, und das HTML rauskopieren. Alles läuft in deinem Browser.",
    },
    "csv-to-html-table-large-files": {
      short: "Große CSV-Dateien",
      eyebrow: "Anleitung · CSV → Tabelle",
      title: "CSV in HTML-Tabelle: Trennzeichen, Anführungszeichen, große Dateien",
      description:
        "Wie das Trennzeichen erkannt wird, was mit Anführungszeichen und Umbrüchen in Feldern passiert, warum einspaltige Dateien warnen, was 100.000 Zellen sind.",
      keywords: [
        "csv in html tabelle umwandeln",
        "csv in html umwandeln",
        "große csv in html",
        "csv semikolon html tabelle",
        "tsv in html tabelle",
      ],
      h1: "CSV als HTML-Tabelle, auch die großen",
      lede: [
        "Eine CSV ist eine Textdatei mit einer Satzzeichen-Konvention, und davon gibt es mehrere. Die meisten Probleme beim Umwandeln sind eigentlich Uneinigkeit darüber, welche eine Datei benutzt.",
        "Hier geht es darum, wie das Trennzeichen gewählt wird, was Anführungszeichen bewirken und wo die Größengrenzen wirklich liegen.",
      ],
      tool: "csv-to-html-table",
      sections: [
        {
          heading: "Das Trennzeichen wird erkannt, nicht angenommen",
          body: [
            "Kommas, Semikolons, Tabs und senkrechte Striche sind alle im Einsatz. Vor allem Semikolons: Exportier eine Tabelle in einer Region, in der das Komma das Dezimalzeichen ist, und du bekommst Semikolons, weil die Kommas schon vergeben sind.",
            "Die Erkennung liest die ersten zehn Zeilen, probiert jeden Kandidaten aus und nimmt den, der eine gleichbleibende Spaltenzahl ergibt. Eine Datei mit ungewöhnlichen ersten Zeilen – etwa einer Titelzeile über der Kopfzeile – kann falsch gelesen werden. Deshalb steht das erkannte Trennzeichen in der Ausgabe. Stimmt es nicht, stell es selbst ein.",
          ],
          steps: [
            "Zieh die Datei rein und schau auf den Hinweis über der Tabelle, welches Trennzeichen benutzt wurde.",
            "Hat die Tabelle eine Spalte, obwohl es sechs sein sollten, stell das Trennzeichen im Auswahlmenü von Hand ein.",
            "Prüf, ob die erste Zeile in der Kopfzeile gelandet ist. Hat die Datei keine Kopfzeile, schalt sie aus, dann wird jede Zeile eine Datenzeile.",
          ],
        },
        {
          heading: "Felder in Anführungszeichen, und das Komma in der Zelle",
          body: [
            "Ein Feld in doppelten Anführungszeichen darf das Trennzeichen enthalten, und ein verdoppeltes Anführungszeichen darin bedeutet ein wörtliches Anführungszeichen. Das ist RFC 4180, und das wird korrekt umgesetzt.",
            "Ein Feld in Anführungszeichen kann auch einen Zeilenumbruch enthalten. Im HTML wird der zu einem <br> in der Zelle, damit eine zweizeilige Adresse zweizeilig bleibt, statt die Zeile zu zerreißen.",
          ],
          sample: {
            beforeLabel: "CSV",
            before: 'name,note\nBolt,"M6, 40mm"\n',
            afterLabel: "HTML",
            after: '<tr>\n  <td>Bolt</td>\n  <td>M6, 40mm</td>\n</tr>',
          },
        },
        {
          heading: "Die Warnung bei einspaltigen Dateien",
          body: [
            "Eine CSV mit nur einer Spalte meldet ein Trennzeichen-Problem. Das lohnt eine Erklärung, weil die Datei meistens in Ordnung ist.",
            "Die Erkennung sucht das Zeichen, das die Zeilen gleichmäßig teilt. Bei einer Spalte gibt es nichts zu teilen, also sieht nichts wie ein Trennzeichen aus, und das wird gemeldet. Die Ausgabe stimmt trotzdem: eine Spalte, alle Zeilen da.",
            "Wenn du die Meldung nicht sehen willst, stell das Trennzeichen fest ein, statt es auf automatisch zu lassen.",
          ],
        },
        {
          heading: "Was „groß“ hier bedeutet",
          body: [
            "Zwei getrennte Obergrenzen. 25 MB pro Datei und 100.000 Zellen – das ist Zeilen mal Spalten. Eine Datei mit sechs Spalten kommt also auf etwa 16.000 Zeilen, eine mit hundert Spalten ist bei rund tausend Schluss.",
            "Die Zellgrenze erreichst du zuerst, und sie hat mit dem Browser zu tun, nicht mit dem Parser. Jede Zelle wird in der Vorschau zu DOM-Knoten, und eine Tabelle mit ein paar Hunderttausend Zellen friert den Tab ein. Ablehnen ist besser als einfrieren.",
            "Für etwas wirklich Größeres teil die Datei zeilenweise und wandle jedes Stück einzeln um – die Kopfzeile kannst du in jedem wiederholen. Leere Zeilen werden automatisch entfernt, auch Zeilen, die nur aus Trennzeichen bestehen – genau das ist ein „,,,“-Block am Ende meistens.",
          ],
        },
        {
          heading: "Wie die Tabelle aussieht",
          body: [
            "Die Kopfzeile wird ein <thead> mit <th scope=\"col\">-Zellen; alles andere kommt ins <tbody>. Ungleich lange Zeilen werden auf die breiteste Zeile aufgefüllt, damit die Tabelle rechteckig bleibt, und die Ausgabe sagt, wie viele Zeilen das gebraucht haben – meist ein Zeichen, dass vorher etwas kaputtgegangen ist.",
            "Es wird nichts in andere Typen umgewandelt. 007 bleibt 007, und ein Wert wie 1-2 wird nicht zum Datum. Das macht Excel mit dir; das hier nicht.",
            "Mit der responsiven Option wird die Tabelle in ein <div class=\"table-wrap\"> gepackt, das seitlich scrollt. Eine Tabelle mit zwölf Spalten passt nicht auf ein Handy, und wenn sie überläuft, wird die ganze Seite breiter statt nur die Tabelle.",
          ],
        },
      ],
      outro:
        "Zieh die CSV rein oder füg die Zeilen direkt ein. Die Dateien werden in deinem Browser geparst, Kundendaten verlassen das Gerät also nie.",
    },
    "excel-to-html-table-formulas": {
      short: "Excel-Formeln",
      eyebrow: "Anleitung · Excel → Tabelle",
      title: "Excel in HTML-Tabelle: Was mit Formeln und Formatierung passiert",
      description:
        "Formeln werden zu ihren berechneten Werten – und in einem Fall kommen sie leer raus. Dazu: Währungsformate, Datum, verbundene Zellen, mehrere Blätter.",
      keywords: [
        "excel in html tabelle umwandeln",
        "excel in html umwandeln",
        "xlsx in html tabelle",
        "excel formeln in html",
        "excel tabelle als html code",
      ],
      h1: "Excel in HTML: Formeln und Formatierung",
      lede: [
        "Eine Tabellenkalkulation enthält mehr als ihren Inhalt: Formeln hinter den Zahlen, Zahlenformate darüber, Verbindungen quer durch. HTML hat nichts davon.",
        "Die Frage ist also nicht, ob etwas verloren geht – sondern was, und ob etwas davon das ist, was du gebraucht hättest.",
      ],
      tool: "excel-to-html-table",
      sections: [
        {
          heading: "Formeln werden zu ihren Ergebnissen",
          body: [
            "Eine Zelle mit =SUM(B2:B9) kommt als 4211 raus. Das willst du auf einer Webseite fast immer – eine Formel auf einer Seite ist ein String, und ein String, der wie eine Formel aussieht, ist schlechter als die Zahl.",
            "Das klappt, weil Excel bei jedem Speichern den berechneten Wert neben der Formel ablegt. Der Konverter liest diesen gespeicherten Wert und braucht deshalb keine eigene Formel-Engine.",
          ],
          sample: {
            beforeLabel: "Zelle in Excel",
            before: "B10:  =SUM(B2:B9)",
            afterLabel: "HTML",
            after: "<td>4211</td>",
          },
        },
        {
          heading: "Der eine Fall, in dem sie leer rauskommen",
          body: [
            "Wenn die Arbeitsmappe von einem Skript erzeugt wurde – ein Python-Export, ein Reporting-Job, irgendwas mit einer Tabellen-Bibliothek – und nie in Excel offen war, gibt es keinen gespeicherten Wert. Niemand hat einen geschrieben. Diese Zellen werden leer umgewandelt.",
            "Die Lösung: die Datei einmal in Excel oder LibreOffice öffnen und speichern. Dabei wird alles berechnet und die Werte werden geschrieben. Der Konverter warnt dich, wenn die Formelzellen eines Blatts leer gelesen werden, damit du nicht rätseln musst.",
            "Auch Formelfehler kommen leer raus statt als #DIV/0! oder #BEZUG!. Ein Blatt mit einem kaputten Verweis in einer Spalte ergibt eine Spalte voller Lücken. Es lohnt sich also, die Quelle zu prüfen, wenn eine Spalte ohne erkennbaren Grund leer ist.",
          ],
        },
        {
          heading: "Zahlenformate überleben nicht",
          body: [
            "Das ist die Überraschung, die du am ehesten vorher kennen solltest. Ein Zahlenformat ist eine Maske, die Excel über einen Wert legt; der Wert darunter ist schlicht.",
            "Aus $1,234.50 wird also 1234.5 – Währungssymbol, Tausendertrennzeichen und feste Nachkommastellen sind alle weg. Eine Zelle, die 12.50% zeigt, wird zu 0.125, weil das die Zahl ist, die immer schon drinstand.",
            "Wenn die Formatierung in der Ausgabe wichtig ist, füg in der Tabelle eine Spalte hinzu, die den formatierten String per TEXT()-Formel baut, und nimm diese Spalte. Dann ist es ein String, und Strings kommen exakt durch.",
            "Datumswerte sind die Ausnahme: Sie werden an ihrem Zahlenformat erkannt und kommen als 2026-03-14 raus, oder mit angehängter Uhrzeit, wenn es eine gibt. Sie werden mit Absicht in UTC zurückgelesen – die naive Variante verschiebt für alle westlich von Greenwich jedes Datum um einen Tag nach hinten.",
          ],
        },
        {
          heading: "Verbundene Zellen werden getrennt",
          body: [
            "Ein über A1:C1 verbundener Titel wird zu einer Zelle mit dem Text und zwei leeren Zellen daneben. Excel hält den Wert in der linken oberen Zelle und lässt den Rest wirklich leer; ohne die Verbindungsinformation ist genau das zu lesen.",
            "HTML kann eine Verbindung mit colspan und rowspan ausdrücken, die Lösung ist also eine Änderung von einer Zeile hinterher. Oder du hebst die Verbindung in Excel vorher auf – oft waren die Verbindungen sowieso nur da, um eine Überschrift zu zentrieren.",
          ],
        },
        {
          heading: "Blätter, und die Größengrenzen",
          steps: [
            "Standardmäßig wird das erste Blatt umgewandelt. Die anderen stehen mit Namen in der Liste, hak die an, die du willst.",
            "Wählst du mehrere, kommt jedes als eigenes <table> raus, mit einem <h2> darüber, in dem der Blattname steht. Wählst du eins, steht der Name stattdessen im <caption> der Tabelle.",
            "Ein Blatt, das nach dem Abschneiden leerer Zeilen am Ende leer ist, sagt das, statt eine leere Tabelle zu erzeugen.",
          ],
          body: [
            "Zwei Grenzen. 10 MB pro Arbeitsmappe – weniger als die 25 MB bei anderen Formaten, weil eine .xlsx ein ZIP ist und das Entpacken im Tab viel mehr Arbeitsspeicher kostet, als die Dateigröße vermuten lässt. Und 100.000 Zellen über alles, was du ausgewählt hast – deshalb kommt eine große Arbeitsmappe durch, wenn du weniger Blätter wählst.",
            "Mit Passwort geschützte Arbeitsmappen werden abgelehnt statt halb gelesen, genauso die alten binären .xls-Dateien. Speicher die vorher als .xlsx.",
          ],
        },
      ],
      outro:
        "Arbeitsmappe reinziehen, Blätter wählen, Tabelle rauskopieren. Alles wird in deinem Browser gelesen – ein Finanzmodell verlässt dein Gerät nie.",
    },
  },
};

export default de;
