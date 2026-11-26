import { CONTACT_EMAIL } from "@/content/site";
import type { Dictionary, Faq } from "../types";

/** 每页都该有的那几个问题，措辞不必因页面而变。 */
const PRIVACY: Faq = {
  q: "Il mio file viene caricato da qualche parte?",
  a: "No. Succede tutto nel tuo browser: la lettura, la pulizia, la creazione dell'HTML. Il file non arriva su nessun server. Spegni il wifi e prova: funziona lo stesso.",
  shared: true,
};

const SAFETY: Faq = {
  q: "Posso mettere questo HTML sul mio sito senza rischi?",
  a: "È la parte che prendiamo più sul serio. Ogni input passa da DOMPurify prima che tu lo veda: vengono tolti i tag script, gli attributi tipo onclick, gli URL javascript:, gli iframe, gli object e gli embed. L'anteprima gira dentro un iframe in sandbox, quindi anche se qualcosa sfuggisse non potrebbe eseguirsi. E in questa pagina non finisce mai niente che non sia stato ripulito.",
  shared: true,
};

const MODES: Faq = {
  q: "Frammento o documento completo: quale mi serve?",
  a: "Il frammento, se lo incolli in una pagina che esiste già: l'editor di un CMS, un template, un componente React. Ricevi il markup senza <html> intorno e senza <style>, così non litiga con il CSS del tuo sito. Il documento completo, se vuoi un file da aprire con un doppio clic: ha charset, viewport, un titolo e uno stile di base molto sobrio.",
  shared: true,
};

const PRETTY: Faq = {
  q: "Perché l'HTML è indentato così?",
  a: "Perché lo leggerai, e probabilmente lo metterai in un repository. L'indentazione è attiva di default e aggiunge a capo solo tra elementi di blocco: mai dentro un <pre> o tra tag inline, dove gli spazi cambiano quello che si vede. Spegnila se vuoi l'output più compatto possibile.",
  shared: true,
};

const it: Dictionary = {
  htmlLang: "it",
  chrome: {
    breadcrumbHome: "home",
    cleanHeading: "Cosa finisce nel cestino",
    cleanLede:
      "Word e Google Docs avvolgono il contenuto in uno strato di spazzatura che ha senso solo dentro il loro editor. Qui sparisce.",
    cleanNote:
      "La struttura resta: i titoli restano titoli, le tabelle tabelle, gli elenchi elenchi. Se ne va solo la decorazione.",
    cleans: {
      scripts: "Tag <script>",
      handlers: "onclick e compagnia",
      styles: "Stili mso- inline",
      classes: "Classi morte c1 / c17",
      tracking: "Parametri di tracciamento nei link",
      office: "Tag che esistono solo in Office",
      semantics: "Resta: la struttura semantica",
      entities: "Escape: & < > e virgolette",
    },
    faqHeading: "Le domande che ci fanno",
    crossHeading: "Cos'altro converte questo sito",
    startOver: "Ricomincia",
    startOverNote: "Markdown in HTML, quello della home",
    footerLeft: "docs2html.com — un piccolo strumento, fatto da una persona",
    footerRight: "gira nel tuo browser · non salva niente · niente statistiche se non le consenti",
    langLabel: "Lingua",
    footerLegal: "Le pagine formali",
    legalContactCue: "Qualcosa non è chiaro, o vuoi che cambi qualcosa?",
    legalUpdated: "In vigore dal",
    consent: {
      text: "Possiamo contare la tua visita con Google Analytics? Usa dei cookie, quindi resta spento finché non dici di sì. I tuoi file non c'entrano mai.",
      privacy: "Privacy",
      accept: "Consenti",
      decline: "No, grazie",
      settings: "Impostazioni statistiche",
    },
    siblingHeading: "Ti serve il contrario?",
    siblingNote:
      "DocsToMD è lo stesso strumento, ma al contrario: Word, PDF, Excel e HTML in Markdown. Stesso approccio, stessa privacy, output opposto.",
    siblingCta: "docstomd.com",
    guide: {
      cta: "Apri il convertitore",
      pairedWith: "Usa",
      moreHeading: "Le altre guide",
    },
    features: [
      "Convertire Markdown in HTML con tabelle GFM e liste di attività",
      "Convertire .docx in HTML semantico pulito",
      "Ripulire l'HTML incollato da Google Docs",
      "Convertire testo semplice in paragrafi HTML",
      "Convertire CSV ed Excel in tabelle HTML",
      "Funziona tutto nel browser, senza upload",
      "Output come frammento HTML o documento completo",
    ],
  },
  converter: {
    dropTitle: "Trascina qui un file.",
    dropActive: "Lascia pure.",
    dropHint:
      "Oppure sceglilo con il pulsante. O incolla con Ctrl+V. Anche decine alla volta vanno bene.",
    dropMeta: "25 MB per file / gira nel tuo browser, non si carica niente",
    elsewhereLead: "Altri formati:",
    pick: "Scegli un file",
    clear: "Svuota",
    knobs: "Output",
    mode: "Output",
    modeFragment: "frammento",
    modeDocument: "pagina completa",
    modeHint:
      "Frammento: solo il markup, da incollare in una pagina che esiste già. Pagina completa: un file .html a sé, con charset, viewport e uno stile di base.",
    pretty: "Indentazione",
    prettyOn: "leggibile",
    prettyOff: "compatta",
    responsive: "CSS tabella",
    responsiveOn: "includi",
    responsiveOff: "niente",
    linkify: "URL nudi",
    linkifyOn: "trasforma in link",
    linkifyOff: "lascia come testo",
    lineBreaks: "A capo",
    lineBreaksOn: "tieni come <br>",
    lineBreaksOff: "lascia scorrere il testo",
    header: "Riga di intestazione",
    headerFirstRow: "prima riga",
    headerNone: "nessuna",
    delimiter: "Separatore",
    delimiterAuto: "automatico",
    delimiterComma: "virgola",
    delimiterSemicolon: "punto e virgola",
    delimiterTab: "tabulazione",
    delimiterPipe: "barra verticale",
    images: "Immagini",
    imageInline: "base64 incorporato",
    imageExtract: "file separati",
    imageStrip: "eliminale",
    sheets: "Fogli",
    sheetsAll: "seleziona tutti",
    sheetMeta: { one: "{n} riga", other: "{n} righe" },
    stale:
      "Hai cambiato un'impostazione. Gli altri risultati usano quelle vecchie: rilanciali per applicarla.",
    queue: "Coda",
    zip: { one: "zip di {n} file", other: "zip di {n} file" },
    chewing: "conversione…",
    failed: "non riuscito",
    tooBig: "Più di 25 MB. Troppo grande.",
    readFail: "Non riesco a leggerlo. Il file potrebbe essere danneggiato o protetto da password.",
    wrongType: "Questa pagina non accetta file {ext}. Questa sì:",
    wrongTypeAmbiguous:
      "Questa pagina non accetta file {ext}. Un {ext} può contenere una di queste cose: scegli quella che corrisponde al tuo:",
    wrongTypeElsewhere:
      "Questa pagina non accetta file {ext}, e nemmeno questo sito. Li converte DocsToMD.",
    wrongTypeNowhere:
      "Questa pagina non accetta file {ext}. Questo sito converte documenti, fogli di calcolo e testo, non {ext}.",
    pastedName: "contenuto incollato",
    typedName: "testo incollato",
    pasteHeading: "Oppure incollalo qui",
    pastePlaceholderMarkdown:
      "# Incolla qui il Markdown\n\nTabelle, liste di attività e ~~barrato~~ funzionano.\n\n| strumento | output |\n| --- | --- |\n| questa pagina | HTML |",
    pastePlaceholderHtml:
      '<div class="c1"><b style="font-weight:normal">Incolla qui il codice HTML.</b></div>\n<p>La spazzatura di Google Docs, gli stili mso- e i parametri di tracciamento vengono tolti.</p>',
    pastePlaceholderText:
      "Incolla qui il testo semplice.\n\nUna riga vuota inizia un nuovo paragrafo. Gli URL nudi come https://example.com diventano link, a meno che tu non lo disattivi.",
    pastePlaceholderCsv:
      "nome,ruolo,città\nAda,ingegnera,Londra\nGrace,ammiraglia,Arlington",
    pasteRun: "Converti",
    pasteClear: "Svuota",
    pasteRichHint:
      "Seleziona il contenuto dentro il documento e copialo, non il link di condivisione. Poi incolla qui, o premi Ctrl+V in un punto qualsiasi della pagina.",
    source: "codice",
    preview: "anteprima",
    previewNote:
      "L'anteprima gira in un riquadro in sandbox con gli script disattivati. È voluto, non è un bug.",
    copy: "Copia",
    copied: "copiato",
    download: "Scarica .html",
    downloadZip: "HTML + immagini",
    legacyWarn: "Vecchio formato .doc: letto quello che si poteva",
    styleWarn: {
      one: "{n} cosa da sapere su questa conversione",
      other: "{n} cose da sapere su questa conversione",
    },
    emptyDoc: "(non è uscito niente)",
    pickOne: "Scegline uno a sinistra per vedere il risultato.",
    chewingFirst: "Converto il primo…",
    units: {
      words: { one: "{n} parola", other: "{n} parole" },
      headings: { one: "{n} titolo", other: "{n} titoli" },
      tables: { one: "{n} tabella", other: "{n} tabelle" },
      images: { one: "{n} immagine", other: "{n} immagini" },
      links: { one: "{n} link", other: "{n} link" },
      bytes: "dimensione",
    },
  },
  pages: {
    home: {
      short: "Home",
      eyebrow: "Markdown → HTML",
      title: "Docs 2 HTML — Convertire Markdown in HTML, gratis e privato",
      description:
        "Incolla Markdown, ottieni HTML pulito: tabelle GFM, liste di attività e barrato. Frammento per il CMS o pagina completa. Tutto nel browser, senza upload.",
      keywords: [
        "docs 2 html",
        "markdown in html",
        "da markdown a html",
        "convertire markdown in html",
        "convertitore markdown html online",
        "markdown in html gratis",
      ],
      h1: ["Convertire Markdown in HTML", "Entra Markdown. Esce HTML pulito."],
      lede: [
        "Incollalo e l'HTML compare mentre guardi. Niente pulsanti, niente attese, niente upload.",
        "Prendi un frammento per il tuo CMS, o una pagina completa da aprire direttamente dal desktop.",
      ],
      note: {
        heading: "In breve",
        items: [
          "CommonMark più tabelle GFM, liste di attività e barrato",
          "Frammento o documento completo, scegli tu",
          "Funziona anche con il wifi spento",
        ],
      },
      body: {
        stepsHeading: "Come funziona",
        steps: [
          "Incolla il Markdown nel riquadro, o trascina un file .md qui sopra. In entrambi i casi lo legge il tuo browser.",
          "Viene analizzato con markdown-it e poi passa da DOMPurify: il Markdown ammette HTML grezzo, e un Markdown arrivato da chissà dove non è sicuro per forza.",
          "Passa dal codice all'anteprima in sandbox, poi copia l'HTML o scarica il file .html.",
        ],
        supportedHeading: "Cosa supporta",
        supported: [
          "CommonMark completo: titoli, paragrafi, elenchi, link, immagini, citazioni, blocchi di codice delimitati",
          "Le estensioni di GitHub: tabelle con barre verticali, caselle delle liste di attività e ~~barrato~~",
          "HTML grezzo dentro il Markdown, ripulito invece che buttato via",
          "URL nudi trasformati in link, cosa che puoi disattivare",
          "Output come frammento senza contenitore, o pagina completa con charset, viewport e titolo",
        ],
        limitsHeading: "Cosa non fa",
        limits: [
          "Niente evidenziazione della sintassi nei blocchi di codice: ricevi un <pre><code> pulito, lo stile lo decidi tu",
          "Note a piè di pagina, liste di definizioni e altre estensioni non standard non vengono interpretate",
          "Il front matter in cima al file viene trattato come testo, non come metadati",
          "Gli script nell'HTML grezzo del tuo Markdown vengono tolti, non conservati",
          "Gli altri formati hanno le loro pagine: DOCX, Google Docs, testo semplice, CSV ed Excel",
        ],
      },
      faq: [
        PRIVACY,
        MODES,
        {
          q: "Che tipo di Markdown è?",
          a: "CommonMark come base, più le tre estensioni di GitHub che si usano davvero: tabelle, liste di attività e barrato. Se si vede bene su GitHub, molto probabilmente qui si vede uguale.",
        },
        {
          q: "Posso mettere HTML grezzo nel Markdown?",
          a: "Sì, e passa, dopo essere stato ripulito. Un <div> o uno <span class=\"note\"> sopravvivono, uno <script> no. È il compromesso giusto: il Markdown di un collega o di un CMS è input non fidato come qualsiasi altro.",
        },
        PRETTY,
        {
          q: "I blocchi di codice vengono evidenziati?",
          a: "No. Ricevi <pre><code class=\"language-js\">, che è l'aggancio standard letto da ogni evidenziatore. Aggiungere l'evidenziazione qui vorrebbe dire imporre uno schema di colori che litiga con quello che il tuo sito usa già.",
        },
      ],
    },
    "markdown-to-html": {
      short: "MD → HTML",
      eyebrow: "Markdown → HTML",
      title: "Markdown in HTML: convertitore gratis con tabelle GFM",
      description:
        "Converti Markdown in HTML: CommonMark più tabelle, liste di attività e barrato di GitHub. Anteprima in sandbox, frammento o pagina intera, senza upload.",
      keywords: [
        "markdown in html",
        "convertire markdown in html",
        "da markdown a html",
        "md in html",
        "convertitore markdown html",
        "commonmark in html",
        "gfm in html",
      ],
      h1: ["Markdown GFM in HTML", "Tabelle e liste di attività comprese."],
      lede: [
        "Tutta la specifica CommonMark, più le estensioni di GitHub di cui sentiresti la mancanza.",
        "Guardalo in un'anteprima in sandbox, poi copia il codice o scarica il file.",
      ],
      note: {
        heading: "Cosa ottieni",
        items: [
          "Markup <table> vero, con <thead> e attributi scope",
          "Liste di attività come caselle disattivate, non parentesi quadre",
          "Output indentato e leggibile, che puoi mettere in un repository senza vergogna",
        ],
      },
      body: {
        stepsHeading: "Come funziona",
        steps: [
          "Incolla il Markdown nel riquadro, o trascina un file .md, .markdown o .txt nel riquadro qui sopra.",
          "markdown-it lo analizza con le regole CommonMark, più le estensioni per tabelle, barrato e liste di attività. Il risultato passa da DOMPurify prima di arrivare a te.",
          "Scegli frammento o pagina completa, attiva o spegni l'indentazione, poi copia l'HTML o scaricalo come file.",
        ],
        supportedHeading: "Cosa supporta",
        supported: [
          "Tutto CommonMark: titoli ATX e setext, elenchi annidati, link di riferimento, codice delimitato e indentato",
          "Tabelle GFM con barre verticali, rese come <table><thead><th scope=\"col\">",
          "Liste di attività, rese come caselle disattivate con una classe .task-list-item da stilizzare",
          "Barrato, e URL nudi trasformati in link, con un'opzione per evitarlo",
          "Blocchi HTML grezzi e HTML inline, ripuliti al passaggio",
          "A capo semplici tenuti come <br>, o lasciati scorrere, come preferisci",
        ],
        limitsHeading: "Cosa non fa",
        limits: [
          "Niente evidenziazione della sintassi: la classe della lingua c'è, i colori li metti tu",
          "Note a piè di pagina, liste di definizioni, abbreviazioni e direttive contenitore non vengono interpretate",
          "Il front matter YAML non viene tolto né letto: cancellalo prima se non lo vuoi nell'output",
          "Le formule matematiche ($...$ o \\[...\\]) passano come testo letterale",
          "File oltre i 25 MB",
        ],
      },
      faq: [
        {
          q: "Le tabelle di GitHub sono supportate?",
          a: "Sì, ed escono come markup vero: un <thead> con celle <th scope=\"col\">, un <tbody> per il resto, e l'allineamento riportato come text-align inline. Gli screen reader leggono il risultato come una tabella, cosa che non possono fare con una griglia finta fatta di div.",
        },
        {
          q: "Che fine fanno le liste di attività?",
          a: "- [ ] e - [x] diventano vere caselle disattivate dentro la voce dell'elenco, e la voce prende la classe task-list-item così puoi nascondere il pallino di default. Disattivate, perché una casella in una pagina statica che sembra cliccabile ma non registra niente è peggio di nessuna casella.",
        },
        MODES,
        PRETTY,
        {
          q: "Posso convertire più file insieme?",
          a: "Sì. Trascina dentro una cartella intera di file .md e si mettono in coda; scaricali uno per uno o tutti insieme in uno zip. Comodo per spostare una cartella di documentazione dentro un template.",
        },
        PRIVACY,
      ],
    },
    "markdown-to-pdf": {
      short: "MD → PDF",
      eyebrow: "Markdown → PDF",
      title: "Convertire Markdown in PDF online: testo vero, gratis",
      description:
        "Da Markdown a PDF con la stampa del browser: testo selezionabile, tabelle intere, titoli mai soli a fondo pagina. Niente upload.",
      keywords: [
        "convertire markdown in pdf",
        "markdown in pdf",
        "da markdown a pdf",
        "da markdown a pdf online",
        "md in pdf",
        "convertitore markdown pdf",
        "stampare markdown",
      ],
      h1: ["Convertire Markdown in PDF", "Stampalo, salvalo, mandalo."],
      lede: [
        "Incolla o trascina il tuo Markdown, controlla l'anteprima, poi stampalo in PDF. Quello che esce è testo che puoi selezionare e cercare, non la foto di una pagina.",
        "Niente account, niente upload, niente filigrana: l'impaginazione si fa tutta nella tua scheda.",
      ],
      print: {
        button: "Stampa / Salva come PDF",
        hint: "Apre la finestra di stampa del browser: come destinazione scegli “Salva come PDF”. Formato carta, margini e numeri di pagina si impostano lì.",
      },
      note: {
        heading: "Cosa ottieni",
        items: [
          "Testo selezionabile, font veri, link che funzionano ancora",
          "A4 con margini di 18 mm, titoli mai lasciati soli a fondo pagina",
          "Tabelle e blocchi di codice interi, non tagliati a metà",
        ],
      },
      body: {
        stepsHeading: "Come funziona",
        steps: [
          "Incolla il Markdown nel riquadro, o trascinaci sopra un file .md.",
          "L'anteprima a destra è la pagina stampata: stessa larghezza, stesso carattere, stesse interruzioni di pagina.",
          "Premi il pulsante e scegli “Salva come PDF” nella finestra di stampa. Quel file è il risultato.",
        ],
        supportedHeading: "Cosa supporta",
        supported: [
          "Titoli, paragrafi, elenchi numerati e puntati, citazioni, linee orizzontali",
          "Tabelle GFM con bordi e riga di intestazione ombreggiata, adattate alla pagina",
          "Blocchi di codice delimitati in carattere monospazio, che vanno a capo invece di uscire dai margini",
          "Immagini, remote o incorporate; i link restano cliccabili nel PDF",
          "Interruzioni di pagina: scrivi <div class=\"page\"/>, \\newpage, \\pagebreak o <!-- pagebreak --> da solo su una riga e lì inizia la pagina successiva. Nell'anteprima appare come una linea tratteggiata",
        ],
        limitsHeading: "Cosa non fa",
        limits: [
          "Niente PDF/A, niente firma digitale, niente modifica dei metadati: il file lo scrive il tuo browser",
          "Numeri di pagina e intestazioni arrivano dalla finestra di stampa, non da questa pagina",
          "Il formato carta segue le tue impostazioni di stampa; l'impaginazione è pensata per A4 verticale",
          "Una tabella più larga della pagina viene rimpicciolita, non divisa in colonne",
          "File oltre i 25 MB",
        ],
      },
      faq: [
        {
          q: "Dove finisce il PDF?",
          a: "Nella finestra di stampa del browser, come destinazione. Chrome ed Edge la chiamano “Salva come PDF”, Safari la mette sotto “PDF”, Firefox la chiama “Stampa su file”. Sceglila, premi Salva, poi scegli la cartella.",
        },
        {
          q: "Perché la finestra di stampa e non un download diretto?",
          a: "Perché il motore di stampa del browser impagina meglio di qualsiasi libreria PDF in JavaScript che potremmo includere: font veri, interruzioni di pagina nei punti giusti e testo selezionabile, senza aggiungere megabyte alla pagina. Il file che ottieni è lo stesso che otterresti stampando su carta.",
        },
        {
          q: "Posso aggiungere numeri di pagina o un'intestazione?",
          a: "Sì, dalla finestra di stampa. Ogni browser desktop ha un'opzione “Intestazioni e piè di pagina” che aggiunge titolo, URL e numero di pagina, e rispetta i margini che imposti lì. Non disegniamo i nostri, perché ignorerebbero quelle impostazioni.",
        },
        {
          q: "Funziona offline?",
          a: "Sì, una volta caricata la pagina. Conversione, anteprima e documento di stampa si costruiscono tutti nella scheda, quindi il Markdown non viaggia da nessuna parte.",
        },
        PRIVACY,
      ],
    },
    "docx-to-html": {
      short: "DOCX → HTML",
      eyebrow: "DOCX → HTML",
      title: "Convertire Word in HTML gratis: da DOCX a HTML pulito",
      description:
        "Converti un documento Word (.docx) in HTML pulito, nel browser. Via gli stili mso- e le classi inutili di Word. Immagini in base64 o in uno zip a parte.",
      keywords: [
        "convertire word in html",
        "convertire word in html gratis",
        "convertire file word in html",
        "da word a html",
        "convertitore word html online",
        "convertire docx in html",
        "docx in html",
        "convertire tabella word in html",
        "convertire testo word in html",
      ],
      h1: ["Convertire Word in HTML", "Entra il DOCX, esce markup pulito."],
      lede: [
        "“Salva come pagina Web” produce migliaia di righe di stili mso-. Questo produce il markup che scriveresti a mano.",
        "I titoli diventano <h2>, le tabelle <table>, e di Microsoft non resta niente.",
      ],
      note: {
        heading: "Cosa ottieni",
        items: [
          "Tag semantici, niente <o:p> e niente style=\"mso-...\"",
          "Immagini incorporate, o come file separati in uno zip",
          "Funzionano anche i vecchi .doc, senza bisogno di “Salva con nome”",
        ],
      },
      body: {
        stepsHeading: "Come funziona",
        steps: [
          "Trascina un .docx nel riquadro qui sopra, o clicca per sceglierlo. Anche decine alla volta vanno bene.",
          "Mammoth legge la struttura del documento (veri livelli di titolo, vere tabelle, veri elenchi) e ne scrive l'HTML. Poi quell'HTML passa da DOMPurify, perché la documentazione di Mammoth dice chiaro e tondo che il suo output non è ripulito.",
          "Scegli cosa fare con le immagini, poi copia l'HTML, scarica il file, o prendi uno zip con le immagini accanto.",
        ],
        supportedHeading: "Cosa supporta",
        supported: [
          "Ogni .docx scritto da Word dal 2007 in poi, più Word Online e Word per Mac",
          "I vecchi .doc di Word 97–2003, riconosciuti dall'intestazione del file e non dall'estensione",
          "Livelli di titolo come <h1>–<h6>, presi dagli stili di Word e non indovinati dalla dimensione del carattere",
          "Tabelle come <table>, elenchi come <ul>/<ol> con annidamento vero, link, grassetto, corsivo, barrato",
          "Citazioni, paragrafi in stile codice come <pre><code>, e didascalie come <p class=\"caption\">",
          "Immagini incorporate: in base64, estratte in una cartella images/ per lo zip, o eliminate",
        ],
        limitsHeading: "Cosa non fa",
        limits: [
          "La formattazione visiva di Word (font, colori, spaziature esatte) di proposito non viene riportata",
          "Le celle unite perdono colspan e rowspan; ogni cella diventa un <td> a sé",
          "Revisioni e commenti vengono tolti: ricevi il testo finale, non la cronologia delle modifiche",
          "Caselle di testo, SmartArt e grafici non sopravvivono; resta solo il loro testo, se ce n'è",
          "Dai vecchi .doc le immagini non escono: quel formato le nasconde dove un browser non arriva",
          "I documenti cifrati vengono rifiutati invece che letti a metà",
        ],
      },
      faq: [
        {
          q: "Che differenza c'è con “Salva come pagina Web” di Word?",
          a: "L'esportazione di Word serve a far sembrare la pagina identica nel browser, quindi scrive un enorme blocco di CSS, un attributo di stile mso- su quasi ogni elemento, classi come MsoNormal e tag che esistono solo in Office, come <o:p>. Qui si fa il contrario: si legge la struttura e si butta via la presentazione. Ottieni qualche decina di righe di HTML semantico invece di qualche migliaio di righe di markup che non puoi modificare.",
        },
        {
          q: "Che fine fanno le immagini?",
          a: "Scegli tu fra tre opzioni. Il base64 incorporato mette tutto in un unico file autonomo: comodo, e circa un terzo più pesante dell'immagine originale. I file separati ti danno uno zip: l'HTML più una cartella images/, con i tag <img> che puntano già ai percorsi giusti. Oppure eliminale del tutto, se ti serve solo il testo.",
        },
        SAFETY,
        {
          q: "I vecchi file .doc funzionano?",
          a: "Sì. Il .doc è il formato binario OLE di prima del 2007, quindi viene letto byte per byte nel tuo browser e passa dalla stessa fase di output. Ottieni testo, titoli, tabelle, grassetto e corsivo. Due cose da quel formato non si recuperano: le immagini e la numerazione esatta degli elenchi. Se hai Word a portata di mano, un “Salva con nome” in .docx dà un risultato più pulito.",
        },
        MODES,
        {
          q: "Perché le mie celle unite si sono divise?",
          a: "Perché in questa versione colspan e rowspan non vengono riportati. Una cella unita diventa una cella normale e quelle accanto escono vuote. La tabella resta HTML valido e leggibile: solo che non è disposta come in Word. Aggiungere un colspan a mano dopo di solito è una modifica di una riga.",
        },
      ],
    },
    "google-docs-to-html": {
      short: "Google Docs → HTML",
      eyebrow: "Google Docs → HTML",
      title: "Google Docs in HTML: via la spazzatura, gratis e senza login",
      description:
        "Incolla da Google Docs e ottieni HTML pulito. Via le classi c1/c17, il <b> con font-weight:normal e i redirect nei link. Niente Drive, niente login.",
      keywords: [
        "google docs in html",
        "google docs html",
        "convertire google docs in html",
        "html pulito da google docs",
        "esportare google docs in html",
        "google docs html export",
      ],
      h1: ["Google Docs in HTML", "Senza la zuppa di classi."],
      lede: [
        "Se copi da un Doc, ricevi HTML pieno di classi che puntano a un foglio di stile che non hai.",
        "Incollalo qui e resta il documento: titoli, elenchi, tabelle, link.",
      ],
      note: {
        heading: "Come farlo entrare",
        items: [
          "Seleziona il contenuto nel Doc e copialo, non il link di condivisione",
          "Incolla qui sotto, o premi Ctrl+V in un punto qualsiasi della pagina",
          "Niente OAuth, niente permessi, niente componenti aggiuntivi",
        ],
      },
      body: {
        stepsHeading: "Come funziona",
        steps: [
          "Apri il Doc, seleziona il contenuto, copia. Poi incolla nel riquadro qui sotto o premi Ctrl+V in un punto qualsiasi della pagina: il browser mette negli appunti una versione in testo formattato, ed è quella che viene letta.",
          "Prima passa da DOMPurify, perché l'HTML degli appunti può arrivare da qualsiasi pagina del web. Poi si toglie la spazzatura di Google: le classi c1/c17, il contenitore <b style=\"font-weight:normal\"> che Docs mette intorno a tutto, gli id docs-internal-guid e il redirect google.com/url?q= intorno a ogni link.",
          "Controlla l'anteprima in sandbox, poi copia l'HTML o scaricalo come file.",
        ],
        supportedHeading: "Cosa supporta",
        supported: [
          "Testo formattato incollato direttamente da Google Docs, Word Online, Notion o qualsiasi altro editor web",
          "Codice HTML incollato come testo, e file .html salvati",
          "Titoli, paragrafi, elenchi con annidamento vero, tabelle, link, grassetto, corsivo, barrato",
          "Rimozione del guscio inutile <b style=\"font-weight:normal\"> che Docs mette intorno a tutto il documento",
          "Rimozione dei redirect google.com/url?q=, per tornare all'URL che avevi davvero inserito",
          "Rimozione dei parametri utm_ e degli altri parametri di tracciamento dai link del documento",
        ],
        limitsHeading: "Cosa non fa",
        limits: [
          "Nessun collegamento al tuo account Google: niente qui può vedere il tuo Drive",
          "Incollando non arrivano le immagini: gli appunti contengono solo il loro indirizzo sui server di Google",
          "Commenti e modifiche suggerite vengono tolti; risolvili prima di copiare",
          "Grafici, disegni e smart chip arrivano al massimo come testo semplice",
          "Se copi il link di condivisione invece del contenuto, ricevi un link e basta, e c'è solo quello da convertire",
          "I font e i colori scelti da Google vengono tolti insieme al resto dello stile",
        ],
      },
      faq: [
        {
          q: "Perché l'HTML di Google Docs è un tale disastro?",
          a: "Perché non è mai stato pensato per essere letto da te. Docs scrive un foglio di stile pieno di regole come .c1 e .c17, poi mette su ogni elemento la classe corrispondente. Copi il contenuto, le classi vengono con te e il foglio di stile no: così ti ritrovi un markup coperto di classi che ormai non significano niente. Sopra c'è un <b style=\"font-weight:normal\"> che avvolge tutto il documento e non cambia nessuna formattazione, e ogni link viene riscritto per passare da google.com/url?q=.",
        },
        {
          q: "Devo installare un componente aggiuntivo o fare login?",
          a: "No, e non c'è niente a cui fare login. Questa pagina legge gli appunti quando incolli, cosa che il browser fa per qualsiasi pagina. Chiedere l'accesso al Drive vorrebbe dire chiedere il permesso su tutti i tuoi file e tenere un server per conservare un token. Un copia e incolla ti costa due secondi e a noi non consegna niente.",
        },
        {
          q: "Che fine hanno fatto le mie immagini?",
          a: "Non sono arrivate, e non possono arrivare. Quando copi da un Doc, l'HTML degli appunti punta a indirizzi di immagini sui server di Google invece di contenere l'immagine. Quei link hanno bisogno della tua sessione per caricarsi, quindi per tutti gli altri sarebbero rotti. Se ti servono le immagini, usa File → Scarica → Microsoft Word (.docx) e porta quel file alla pagina DOCX.",
        },
        SAFETY,
        {
          q: "Funziona con Notion, Word Online o Confluence?",
          a: "Sì. La pulizia specifica di Google è la parte più aggressiva, ma il lavoro generale (ripulire, togliere contenitori inutili, eliminare classi morte e parametri di tracciamento) vale per tutto quello che incolli. Il testo formattato di qualsiasi editor web vale la pena di provarlo qui.",
        },
        MODES,
      ],
    },
    "text-to-html": {
      short: "Testo → HTML",
      eyebrow: "Testo semplice → HTML",
      title: "Convertire testo in HTML online: paragrafi, a capo, entità",
      description:
        "Trasforma testo semplice in paragrafi HTML. Le righe vuote dividono i paragrafi, URL in link e a capo in <br> se vuoi, e &, < e > con l'escape giusto.",
      keywords: [
        "convertire testo in html",
        "testo in html",
        "convertitore testo in html",
        "convertire testo in html online",
        "da testo a html",
        "testo in paragrafi html",
      ],
      h1: ["Convertire testo in HTML", "Paragrafi fatti bene."],
      lede: [
        "Una riga vuota apre un nuovo <p>. Gli URL nudi diventano link, se vuoi. Le parentesi angolari ricevono l'escape, così il testo resta testo.",
        "Lo strumento più semplice del sito, e quello che la gente rifà a mano più spesso.",
      ],
      note: {
        heading: "Da sapere",
        items: [
          "Una riga vuota vuol dire nuovo paragrafo",
          "URL e indirizzi email trasformati in link, o lasciati stare",
          "&, < e > con l'escape, così non sparisce niente",
        ],
      },
      body: {
        stepsHeading: "Come funziona",
        steps: [
          "Incolla il testo nel riquadro, o trascina un file .txt qui sopra. Gli a capo di Windows, Mac e Unix sono trattati allo stesso modo.",
          "Le righe vuote dividono il testo in paragrafi. Dentro un paragrafo, gli a capo singoli diventano <br> oppure si uniscono, decidi tu. I caratteri speciali dell'HTML ricevono l'escape strada facendo.",
          "Attiva o spegni il riconoscimento degli URL, scegli frammento o pagina completa, poi copia l'HTML o scarica il file.",
        ],
        supportedHeading: "Cosa supporta",
        supported: [
          "Divisione in paragrafi sulle righe vuote, con più righe vuote di fila contate come una sola",
          "A capo singoli tenuti come <br>, o uniti in una sola riga",
          "URL http:// e https://, più indirizzi www. senza protocollo, trasformati in link",
          "Indirizzi email trasformati in link mailto:",
          "Escape di &, <, > e virgolette, così un <b> scritto nel testo resta visibile come testo",
          "A capo CRLF, CR e LF, e il byte order mark all'inizio del file",
        ],
        limitsHeading: "Cosa non fa",
        limits: [
          "Niente Markdown: **grassetto** resta con gli asterischi. Per quello c'è la pagina Markdown.",
          "L'indentazione non diventa struttura: un blocco rientrato con tab non diventa un elenco né un blocco di codice",
          "Non indovina i titoli: una riga corta in maiuscolo resta un paragrafo",
          "Le tabelle allineate con gli spazi restano testo; per tabelle vere usa la pagina CSV",
          "File oltre i 25 MB",
        ],
      },
      faq: [
        {
          q: "Come decide dove sono i paragrafi?",
          a: "Con una riga vuota. È l'unica convenzione che chiunque scriva testo semplice segue già, e non serve indovinare niente. Più righe vuote di fila contano come una sola interruzione. Se il testo non ha nessuna riga vuota ottieni un unico paragrafo lungo, e te lo diciamo, invece di lasciarti a chiederti perché.",
        },
        {
          q: "E se non voglio che gli URL diventino link?",
          a: "Spegni l'opzione degli URL nudi e restano testo semplice. Conviene quando scrivi di URL invece di linkarli: un tutorial, un log di errori, un file di configurazione.",
        },
        {
          q: "Perché il mio <b> si vede come testo invece di mettere in grassetto?",
          a: "Perché è proprio questo che significa da testo semplice a HTML. Il tuo input è testo, quindi un <b> scritto così sono tre caratteri visibili ed esce come &lt;b&gt;. Se vuoi che i tag funzionino, il tuo input non è testo semplice: prova la pagina Markdown, o quella di Google Docs se stai incollando testo formattato.",
        },
        {
          q: "A cosa serve l'opzione <br>?",
          a: "Poesie, indirizzi, output di log: tutto quello in cui gli a capo fanno parte del significato. Spegnila per la prosa spezzata a 80 colonne, dove vuoi che sia il browser a rimandare a capo il testo in base alla finestra di chi legge.",
        },
        MODES,
        PRIVACY,
      ],
    },
    "csv-to-html-table": {
      short: "CSV → tabella",
      eyebrow: "CSV → tabella HTML",
      title: "Convertire CSV in HTML: da CSV a tabella HTML, gratis",
      description:
        "Converti un CSV in tabella HTML: incolla le righe o trascina un file. Virgola, punto e virgola e tab riconosciuti; la prima riga diventa un vero <thead>.",
      keywords: [
        "convertire csv in html",
        "csv in html",
        "da csv a html",
        "csv in tabella html",
        "convertire csv in tabella html",
        "tabella html da csv",
        "tsv in tabella html",
      ],
      h1: ["Convertire CSV in tabella HTML", "Semantica, non una griglia di div."],
      lede: [
        "Per convertire un CSV in HTML, incolla le righe o trascina un file. La prima riga diventa un vero <thead> con gli attributi scope, così gli screen reader leggono la tabella come una tabella.",
        "Virgole tra virgolette, a capo dentro le celle ed esportazioni europee con il punto e virgola: tutto gestito.",
      ],
      note: {
        heading: "Da sapere",
        items: [
          "Separatore letto dal file, modificabile",
          "<thead> e <th scope=\"col\">, non div con lo stile",
          "CSS responsive opzionale per schermi stretti",
        ],
      },
      body: {
        stepsHeading: "Come funziona",
        steps: [
          "Trascina un .csv o un .tsv qui sopra, o incolla le righe direttamente nel riquadro. Niente esce dalla scheda.",
          "Il separatore si ricava dal file (virgola, punto e virgola, tab o barra verticale) e viene indicato sopra l'output. Cambialo se ha indovinato male.",
          "Scegli se la prima riga è un'intestazione e se includere il CSS responsive, poi copia l'HTML o scarica il file.",
        ],
        supportedHeading: "Cosa supporta",
        supported: [
          "Qualsiasi separatore abbia usato l'esportazione, ricavato dal file o impostato a mano",
          "Campi tra virgolette tenuti interi; un a capo dentro una cella diventa un <br> invece di una riga spezzata",
          "Esportazioni italiane, tedesche, francesi e spagnole, dove il separatore è il punto e virgola perché la virgola è il separatore decimale",
          "Prima riga come <thead> con <th scope=\"col\">, o nessuna intestazione",
          "Il byte order mark iniziale, tolto così non finisce dentro il tuo primo <th>",
          "Righe corte completate con <td> vuoti, così ogni riga ha lo stesso numero di celle",
        ],
        limitsHeading: "Cosa non fa",
        limits: [
          "Entra UTF-8 ed esce UTF-8, che è quello che dichiara il meta charset; altre codifiche possono arrivare con caratteri strani",
          "25 MB di testo e 100.000 celle per volta",
          "Il testo delle celle riceve l'escape, mai una nuova formattazione: 007 arriva nel <td> come 007",
          "Niente ordinamento, filtri o totali: converte, non calcola",
          "Niente JavaScript nell'output, quindi la tabella non è interattiva",
          "Le virgolette non chiuse mandano in tilt qualsiasi lettore CSV, e le celle possono finire sotto la colonna sbagliata",
        ],
      },
      faq: [
        {
          q: "Perché una <table> e non dei div con CSS grid?",
          a: "Perché i dati tabellari sono esattamente il lavoro dell'elemento table. Uno screen reader annuncia le dimensioni, permette di spostarsi cella per cella e legge l'intestazione di colonna con ogni cella: niente di questo arriva da una griglia di div. Anche i motori di ricerca la leggono come dati. Lo stile non è un motivo per rinunciarci.",
        },
        {
          q: "Cosa fa davvero il CSS responsive?",
          a: "Pochissimo, apposta. Mette la tabella in un div che scorre in orizzontale quando è troppo larga, e imposta border-collapse più padding e bordi sobri. È il minimo perché una tabella sia usabile su un telefono. Tutto il resto lo lascia al tuo foglio di stile. Spegnilo e ricevi la <table> nuda.",
        },
        {
          q: "La mia esportazione usa il punto e virgola. Funziona?",
          a: "Sì. Dove la virgola fa da separatore decimale, come in Italia, un foglio di calcolo esporta con il punto e virgola: lo si legge dal file e lo si indica sopra l'output. Cambialo se ha indovinato male.",
        },
        {
          q: "Una cella contiene una virgola. Le colonne si spostano?",
          a: "No, se il campo è tra virgolette, come fa ogni programma che scrive CSV corretti. \"Rossi, Mario\" arriva come un solo <td>. Anche un a capo dentro un campo tra virgolette viene conservato, come <br>, così la riga non si spezza in due.",
        },
        {
          q: "Posso semplicemente vedere un CSV come tabella nel browser?",
          a: "Sì. Passa a Pagina completa e scarica il file. Fai doppio clic e il browser apre le tue righe come una vera tabella, con bordi, intestazione ombreggiata e righe alternate. Non serve un foglio di calcolo, e il file si apre anche l'anno prossimo.",
        },
        {
          q: "Quale opzione CSV scelgo in Excel o Fogli Google?",
          a: "In Excel scegli \"CSV UTF-8 (delimitato da virgole)\". L'opzione \"CSV\" semplice salva in una codifica più vecchia che dipende dal sistema, quindi lettere accentate e simboli € possono uscire storpiati. Fogli Google esporta sempre in UTF-8: File → Scarica → Valori separati da virgola. Hai già il file .xlsx? Salta il CSV e usa la pagina Excel.",
        },
        {
          q: "Come metto la tabella in una pagina WordPress o in un CMS?",
          a: "Lascia Frammento e copia l'HTML. In WordPress aggiungi un blocco HTML personalizzato e incollalo lì. Quasi tutti gli altri editor hanno una vista HTML o sorgente che fa lo stesso lavoro. Con il CSS responsive attivo, la tabella sta in un div .table-wrap: aggiungi quella regola al tuo tema, altrimenti il contenitore non fa niente.",
        },
        PRIVACY,
        MODES,
      ],
    },
    "excel-to-html-table": {
      short: "Excel → tabella",
      eyebrow: "Excel → tabella HTML",
      title: "Convertire Excel in tabella HTML: scegli i fogli, gratis",
      description:
        "Converti un .xlsx in tabelle HTML semantiche. Scegli i fogli e la riga di intestazione: ottieni i valori visualizzati, non le formule. Niente upload.",
      keywords: [
        "convertire excel in html",
        "convertire tabella excel in html",
        "da excel a html",
        "excel in html",
        "converti excel in html",
        "xlsx in html",
        "foglio di calcolo in tabella html",
      ],
      h1: ["Convertire Excel in tabella HTML", "I valori, non le formule."],
      lede: [
        "Trascina un .xlsx, scegli i fogli che ti servono e ricevi una <table> pulita per ognuno.",
        "Colori e font restano indietro di proposito: una tabella con il suo stile addosso litiga con ogni sito in cui la incolli.",
      ],
      note: {
        heading: "Da sapere",
        items: [
          "Tutti i fogli in elenco: spunta quelli che vuoi",
          "Valori delle celle come li vedi, non la formula",
          "100.000 celle per volta",
        ],
      },
      body: {
        stepsHeading: "Come funziona",
        steps: [
          "Trascina un .xlsx qui sopra. La cartella di lavoro si apre nella scheda e ogni nome di foglio compare come pulsante.",
          "Il primo foglio si converte subito. Attiva e disattiva gli altri: la cartella resta in memoria, quindi niente viene letto due volte.",
          "Scegli se la prima riga è un'intestazione e se includere il CSS responsive, poi copia l'HTML o scarica il file.",
        ],
        supportedHeading: "Cosa supporta",
        supported: [
          "Tutto quello che salva in .xlsx: Excel 2007 e successivi, LibreOffice Calc, Numbers, Fogli Google",
          "Più fogli, ognuno come tabella a sé sotto un <h2> con il nome del foglio",
          "Il valore che vedrebbe chi legge: un <td> riceve 42, mai =SUM(A1:A9)",
          "Date scritte come testo ISO invece del numero seriale tipo 45000 che Excel tiene internamente",
          "Prima riga come <thead> con <th scope=\"col\">, o nessuna intestazione",
          "Una <caption> sulla tabella quando converti un solo foglio, che gli screen reader leggono per prima",
        ],
        limitsHeading: "Cosa non fa",
        limits: [
          "Colori, font, bordi e formattazione condizionale non vengono riprodotti: in questa versione è una scelta",
          "Le celle unite perdono colspan e rowspan; ogni cella diventa un <td> a sé",
          "Le formule non vengono riportate come formule, e non si ricalcola niente",
          "Il vecchio formato binario .xls di prima del 2007 è un formato tutto diverso, e non è gestito",
          "Grafici, tabelle pivot e immagini nel foglio non vengono esportati",
          "Una cartella di lavoro cifrata non si apre qui: salva prima una copia non protetta",
          "Selezioni oltre le 100.000 celle",
        ],
      },
      faq: [
        {
          q: "Perché i miei colori e font non vengono riportati?",
          a: "Perché una tabella che si porta dietro i suoi colori perde la lotta con il foglio di stile del tuo sito nove volte su dieci, e finisci per cancellare gli stili inline a mano. Quello che serve è una <table> pulita con la struttura giusta, che prende lo stile dalla pagina in cui finisce. Se ti serve esattamente l'aspetto originale, “Salva come pagina Web” di Excel te lo dà, insieme a qualche migliaio di righe di markup.",
        },
        {
          q: "Nel <td> c'è la formula o il risultato?",
          a: "Il risultato. Una cartella di lavoro tiene sia la formula sia l'ultimo valore calcolato, e su una pagina web ci va il valore: quindi =SUM(A1:A9) esce come 42.",
        },
        {
          q: "Una cella con formula è uscita vuota. Perché?",
          a: "Perché nel file non c'era nessun valore salvato da leggere. Excel lo scrive a ogni salvataggio, ma una cartella creata da uno script e mai aperta in Excel non ne ha nessuno. Aprila una volta, salva, poi converti.",
        },
        {
          q: "Posso mettere più fogli in un solo file?",
          a: "Sì. Spunta tutti i fogli che vuoi; ognuno esce come <table> a sé, con sopra un <h2> che riporta il nome del foglio.",
        },
        {
          q: "Che fine fanno le celle unite?",
          a: "Si dividono. Ogni cella dell'intervallo diventa un <td> a sé, con il valore nella prima e le altre vuote. L'HTML può esprimere un'unione con colspan e rowspan, ma ricostruirle bene da una cartella di lavoro è un lavoro da seconda fase: per ora l'output dice onestamente di essere una griglia semplice.",
        },
        PRIVACY,
      ],
    },
  },
  legal: {
    about: {
      short: "Chi siamo",
      eyebrow: "Su questo sito",
      title: "Su Docs 2 HTML: chi lo fa e perché",
      description:
        "Convertitore gratuito nel browser: Markdown, Word, Google Docs, testo, CSV ed Excel in HTML pulito. Niente account, niente upload. Ecco come e perché.",
      h1: "Un piccolo strumento, e il ragionamento dietro",
      lede: [
        "Docs 2 HTML trasforma documenti in HTML su cui metteresti la tua firma. Tutto qui, il prodotto è questo.",
        "Lo costruisce e lo mantiene uno sviluppatore indipendente, e gira tutto dentro il tuo browser.",
      ],
      sections: [
        {
          heading: "Perché esiste",
          body: [
            "Ogni programma di scrittura sa già esportare in HTML. Il problema è proprio quello. “Salva come pagina Web” di Word produce migliaia di righe con un attributo di stile mso- su quasi ogni elemento. Google Docs ti dà classi come c1 e c17 che rimandano a un foglio di stile che non hai ricevuto. Tutti e due sono tecnicamente HTML e tutti e due sono inutilizzabili come sorgente di una pagina web: non li leggi, non li modifichi, e non li incolli in un template senza che litighino con il tuo CSS.",
            "Quello che la gente vuole davvero è il markup che avrebbe scritto a mano: un <h2> dove c'è un titolo, una <table> dove c'è una tabella, e nient'altro. Arrivarci da un'esportazione ufficiale vuol dire cancellare più di quanto tieni, quindi quasi tutti o lo fanno a mano o si arrendono e incollano il pasticcio.",
            "Questo sito fa la parte del cancellare. Legge la struttura del documento e ne scrive HTML semantico, buttando via la presentazione invece di provare a riprodurla.",
          ],
        },
        {
          heading: "Perché gira nel tuo browser",
          body: [
            "Quasi tutti i convertitori caricano il file su un server, lo convertono lì e ti danno un download. È un progetto ragionevole, ed è anche un progetto in cui il tuo documento resta per un po' sul computer di qualcun altro. Per la bozza di un blog va bene. Per un contratto, una cartella clinica, dei numeri interni o un manoscritto non ancora pubblicato, no.",
            "Quindi la conversione gira sulla tua macchina, in JavaScript, nella scheda che hai già aperto. Non c'è un passaggio di upload perché non c'è nessun posto dove caricare. Puoi verificarlo: stacca la connessione e converti qualcosa, oppure guarda la scheda Rete del browser mentre trascini un file.",
          ],
        },
        {
          heading: "Come funziona davvero",
          body: [
            "Quando trascini un file, il browser lo legge in locale e passa i byte a un parser che gira anche lui nel browser. Il parser produce una struttura, la struttura diventa HTML, e l'HTML viene ripulito prima che tu lo veda. I parser sono librerie open source, scelte formato per formato:",
          ],
          items: [
            "markdown-it analizza il Markdown, con la specifica CommonMark più tabelle, liste di attività e barrato di GitHub.",
            "Mammoth legge i .docx. I vecchi .doc li analizza un nostro lettore, byte per byte, perché è un formato binario di prima del 2007 e non esiste una libreria che giri in un browser.",
            "DOMPurify ripulisce ogni pezzo di HTML che passa, compreso l'HTML che generiamo noi, perché il testo al suo interno arriva dal tuo documento.",
            "Papa Parse legge CSV e TSV; read-excel-file legge le cartelle di lavoro .xlsx.",
          ],
        },
        {
          heading: "Sulla sicurezza",
          body: [
            "Uno strumento che produce HTML ha un dovere che un convertitore in Markdown non ha: quello che ti consegna può finire incollato su un sito vero, dove verrà eseguito. Quindi qui ripulire non è una funzione in più, è il minimo. Tag script, attributi di gestione eventi, URL javascript:, iframe, object ed embed vengono tolti da tutto, e niente di non ripulito viene mai inserito nel DOM di questa pagina.",
            "L'anteprima è un discorso a parte: viene mostrata dentro un iframe in sandbox, con gli script disattivati e un'origine opaca. Vuol dire che non può raggiungere questa pagina, non può leggere niente e non può eseguire niente, anche se il filtro per qualche motivo si fosse lasciato sfuggire qualcosa. Due muri indipendenti, perché uno solo è un punto unico di rottura.",
          ],
        },
        {
          heading: "Cosa non fa, di proposito",
          body: [
            "Non ci sono account, perché non c'è niente da conservare. Non c'è un'API, perché non c'è un server da chiamare. Non c'è un collegamento a Google Drive, perché vorrebbe dire chiedere accesso a tutti i tuoi file e tenere un token per loro.",
            "Ogni conversione ha anche dei limiti veri, e ogni pagina strumento elenca i suoi. Le celle unite si dividono. Colori e font di Excel non vengono riprodotti. Le immagini non passano da un incolla da Google Docs. Lo diciamo subito, invece di fartelo scoprire dopo aver convertito qualcosa di importante.",
          ],
        },
        {
          heading: "Come si paga",
          body: [
            "Lo strumento è gratuito e non ha una versione a pagamento. L'idea è coprire l'hosting con la pubblicità, quindi in futuro potresti vedere annunci su queste pagine. Gli annunci non saranno mai messi in modo da sembrare un pulsante di download o di conversione, e non verranno inseriti dopo una conversione in modo da spostarti la pagina sotto il cursore.",
            "La pubblicità non cambia il modo in cui funziona la conversione. I tuoi file restano sulla tua macchina comunque: non è una scelta di policy che si potrebbe ribaltare per guadagnare, è una conseguenza del fatto che il server non c'è proprio.",
          ],
        },
        {
          heading: "Il sito gemello",
          body: [
            "DocsToMD fa lo stesso lavoro nella direzione opposta: Word, PDF, HTML, CSV ed Excel in Markdown. Stesso approccio, stessa privacy, formato di output opposto. Se sei arrivato qui cercando Markdown, ti serve quello.",
          ],
        },
      ],
    },
    contact: {
      short: "Contatti",
      eyebrow: "Scrivici",
      title: "Contatti — Docs 2 HTML",
      description:
        "Scrivici per un file che non si converte, un HTML uscito male, una traduzione strana o una funzione che vorresti. Legge tutto un solo sviluppatore.",
      h1: "Scrivici",
      lede: [
        "Questa casella la legge una persona sola, quindi le risposte non sono immediate: ma sono risposte vere, non un numero di ticket.",
        `Email: ${CONTACT_EMAIL}`,
      ],
      sections: [
        {
          heading: "L'HTML è uscito male",
          body: [
            "È la segnalazione più utile che puoi farci, e anche la più delicata, perché il tuo file noi non lo vediamo. Quindi descrivilo invece di mandarlo:",
          ],
          items: [
            "In che pagina eri, e qual era l'input: un .docx, un incolla da Google Docs, un .csv",
            "Cosa ti aspettavi nell'output e cosa hai ottenuto: una tabella mancante, un titolo uscito come paragrafo, un attributo che andava tolto",
            "Il pezzo di HTML interessato, se puoi condividerlo: di solito bastano poche righe",
            "Browser e sistema operativo, perché appunti e parsing si comportano in modo diverso da uno all'altro",
          ],
        },
        {
          heading: "Segnalazioni di sicurezza",
          body: [
            "Se hai trovato un input che produce HTML con dentro qualcosa di eseguibile (un gestore di eventi sopravvissuto, un URL javascript:, un tag che andava tolto), scrivici, e includi l'input esatto che lo provoca. È l'unico tipo di bug qui che può fare danni a qualcuno a valle, e viene sistemato prima di qualsiasi altra cosa.",
            "Segnalalo prima in privato, invece di pubblicarlo. Non c'è un bug bounty; c'è una correzione veloce e un grazie sincero.",
          ],
        },
        {
          heading: "Per favore non mandarci i tuoi documenti",
          body: [
            "Il senso di questo sito è che i tuoi file restano sul tuo computer. Mandarcene uno per email annulla questo dalla tua parte e ci mette in una posizione in cui preferiremmo non stare dalla nostra. Se riesci a riprodurre il problema con un file che non conta niente (un paio di titoli e una tabella scritti in un documento nuovo), è davvero più utile, perché isola il bug.",
            "Se un problema proprio non si riproduce senza il file originale, scrivici prima e capiamo insieme cosa serve. Di solito basta una descrizione della struttura, non il contenuto.",
          ],
        },
        {
          heading: "Traduzioni",
          body: [
            "Questo sito è disponibile in più lingue. L'inglese è l'originale e le altre sono state tradotte con cura, ma un madrelingua noterà comunque cose che una traduzione attenta si lascia sfuggire: una frase tecnicamente giusta che suona strana, un termine che nel mondo del software locale si dice in un altro modo.",
            "Se ne trovi una, dicci la lingua e la pagina, e riporta la frase. Le piccole correzioni sono benvenute e vengono applicate in fretta.",
          ],
        },
        {
          heading: "Funzioni, e cose che non faremo",
          body: [
            "Le richieste di funzioni vengono lette e spesso realizzate, soprattutto quelle piccole: un'opzione per uno stile di output, il supporto per una variante di formato, un separatore che non riconosciamo, un aggancio CSS che ti serve nell'output.",
            "Alcune cose sono fuori dal progetto per scelta, e chiederle non le cambia: caricare file su un server, un'integrazione con Google Drive, gli account utente, o riprodurre esattamente lo stile di Word ed Excel. L'ultima non è un limite di cui ci scusiamo: il markup pulito è il prodotto.",
          ],
        },
        {
          heading: "Privacy e questioni legali",
          body: [
            "Domande su quali dati raccoglie questo sito, o richieste sui tuoi dati in base a GDPR, CCPA o leggi simili, vanno allo stesso indirizzo. Leggi prima l'informativa sulla privacy: in breve, non raccogliamo niente che ti identifichi, il che rende inutili quasi tutte queste richieste, e l'informativa spiega esattamente perché.",
          ],
        },
      ],
    },
    privacy: {
      short: "Privacy",
      eyebrow: "Informativa sulla privacy",
      title: "Informativa sulla privacy — Docs 2 HTML",
      description:
        "Cosa raccoglie Docs 2 HTML e cosa no. I documenti restano nel browser e non vengono mai caricati. Niente account, niente statistiche sui file.",
      h1: "Informativa sulla privacy",
      lede: [
        "I documenti che converti qui non lasciano mai il tuo computer. Non è una promessa su come trattiamo i tuoi dati: non c'è nessun passaggio in cui li riceviamo.",
        "Questa pagina lo spiega nel dettaglio, ed è onesta sulle parti in cui entra in gioco una terza parte.",
      ],
      sections: [
        {
          heading: "I tuoi documenti",
          body: [
            "I file che trascini, scegli o incolli su questo sito vengono letti dal tuo browser e convertiti da codice che gira sulla tua macchina. Non vengono trasmessi a noi, a un fornitore di hosting o a nessun altro. Non c'è conversione lato server, nessuna coda, nessuna memorizzazione temporanea e nessuna cache dei tuoi contenuti.",
            "Non viene scritto niente nemmeno sul tuo dispositivo. Non salviamo i tuoi file né il risultato della conversione in local storage, IndexedDB o in un cookie. Chiudi la scheda e il contenuto sparisce; le uniche copie sono il file di partenza e quello che hai deciso tu di copiare o scaricare.",
            "Il riquadro dell'anteprima merita una nota a parte, perché potrebbe sembrare un'eccezione. Non lo è: l'anteprima è un iframe il cui contenuto gli viene passato direttamente dalla pagina che hai già aperto, tramite srcdoc. Non si scarica niente e non si invia niente. Il riquadro è in sandbox con un'origine opaca, quindi non può nemmeno leggere niente.",
            "Puoi verificare tutto questo. Stacca la connessione e converti un file: funziona lo stesso. Oppure apri gli strumenti per sviluppatori del browser, guarda la scheda Rete e controlla che trascinare un file non produca nessun upload.",
          ],
        },
        {
          heading: "Cosa raccogliamo",
          body: [
            "Non chiediamo né conserviamo il tuo nome, il tuo indirizzo email o dati di un account, perché gli account non esistono.",
            "Il sito è ospitato su Cloudflare Workers. Come ogni hosting web, elabora i dati standard della richiesta quando il browser chiede una pagina: indirizzo IP, user agent, URL richiesto e orario. È intrinseco a come funziona il web e serve a consegnare il sito e bloccare gli abusi. Lo usiamo in forma aggregata per vedere quali pagine ricevono traffico. Non è collegato a niente di quello che converti, perché le tue conversioni non raggiungono mai nessun server.",
          ],
        },
        {
          heading: "Statistiche, solo se dici di sì",
          body: [
            "Alla prima visita una piccola barra in fondo alla pagina ti chiede se possiamo contare la tua visita. Finché non clicchi Consenti, nessuno script di statistiche si carica e nessun cookie viene impostato.",
            "Se acconsenti, si carica Google Analytics, che imposta i suoi cookie per contare le visite e distinguere un nuovo visitatore da uno che ritorna. Vede in che pagina sei, la tua posizione approssimativa e il tuo browser. Non vede mai i tuoi file né quello che converti. Google Signals e la personalizzazione degli annunci sono disattivati.",
            "La tua risposta viene salvata nel local storage di questo browser, così non te lo chiediamo su ogni pagina. Per cambiare idea, clicca “Impostazioni statistiche” in fondo a qualsiasi pagina. Dire no dopo un sì spegne le statistiche e cancella i loro cookie.",
          ],
        },
        {
          heading: "Cookie e pubblicità",
          body: [
            "Se non consenti le statistiche, il sito non imposta cookie. Non ha login, carrello o altro da far ricordare a un cookie. Gli unici cookie che possono comparire sono quelli di Google Analytics, dopo che hai detto sì.",
            "Intendiamo mostrare pubblicità di Google AdSense per coprire i costi di hosting. Quando sarà attiva, Google potrà impostare cookie o leggere identificatori del dispositivo per mostrare e misurare gli annunci, secondo le sue policy. È l'unica parte di questo sito in cui una terza parte vede qualcosa della tua visita, e riguarda la pagina in cui sei, non il documento che hai convertito, che Google non ha modo di vedere.",
            "I fornitori di terze parti, tra cui Google, usano cookie per mostrare annunci in base alle visite precedenti di un utente a questo sito o ad altri siti. I cookie pubblicitari permettono a Google e ai suoi partner di mostrarti annunci in base alle tue visite a questo sito e/o ad altri siti su Internet. Puoi disattivare la pubblicità personalizzata nelle Impostazioni annunci di Google (adssettings.google.com), e disattivare l'uso dei cookie di alcuni fornitori di terze parti per la pubblicità personalizzata su optout.aboutads.info o, in Europa, su youronlinechoices.eu.",
            "Se ti trovi nello Spazio economico europeo, nel Regno Unito o in Svizzera, ti verrà chiesto il consenso prima che vengano usati cookie non essenziali, e potrai ritirarlo in seguito. La cookie policy spiega le categorie e come cambiare idea.",
          ],
        },
        {
          heading: "Terze parti",
          body: ["L'elenco è corto di proposito:"],
          items: [
            "Cloudflare Workers ospita i file statici che compongono questo sito.",
            "Google AdSense, una volta attivato, mostra la pubblicità descritta sopra.",
            "I file di Google Fonts sono ospitati da noi, serviti da questo dominio, quindi richiedere una pagina non dice a Google che l'hai visitata.",
            "Google Analytics conta le visite, ma solo dopo che hai cliccato Consenti, come descritto sopra.",
            "Nessuna pagina carica registratori di sessione, heatmap, widget di chat o contenuti incorporati dai social.",
          ],
        },
        {
          heading: "Minori",
          body: [
            "È uno strumento di conversione di documenti, senza funzioni social e senza account. Non è rivolto ai minori di 13 anni e, dato che non raccogliamo dati personali da nessuno, non li raccogliamo consapevolmente nemmeno dai minori.",
          ],
        },
        {
          heading: "I tuoi diritti",
          body: [
            "In base al GDPR, al CCPA e a leggi simili hai il diritto di accedere ai tuoi dati personali, correggerli, cancellarli e trasferirli, e di opporti al loro trattamento. Li rispettiamo tutti, e in pratica qui le richieste sono insolitamente semplici da soddisfare, perché non abbiamo nessun file che hai convertito e nessun tuo profilo da consegnare, correggere o cancellare.",
            "Per i cookie di statistiche e pubblicità descritti sopra, il titolare del trattamento è Google, e sono i suoi strumenti a darti il controllo più diretto sulla personalizzazione degli annunci. Scrivici e ti indichiamo il posto giusto.",
          ],
        },
        {
          heading: "Modifiche a questa informativa",
          body: [
            "Se questa informativa cambia in modo sostanziale (una nuova terza parte, una nuova categoria di dati), cambia anche la data in cima alla pagina. Dato che il sito non conserva indirizzi email, non possiamo avvisarti direttamente: la data è il segnale onesto da tenere d'occhio.",
          ],
        },
      ],
    },
    terms: {
      short: "Termini",
      eyebrow: "Termini di servizio",
      title: "Termini di servizio — Docs 2 HTML",
      description:
        "Termini d'uso di Docs 2 HTML: gratis per ogni scopo, anche commerciale, così com'è. I documenti restano tuoi; controlla l'output prima di pubblicarlo.",
      h1: "Termini di servizio",
      lede: [
        "Usare questo sito vuol dire accettare quello che c'è qui sotto. È breve, perché a uno strumento gratuito nel browser che non conserva niente non serve molto.",
      ],
      sections: [
        {
          heading: "Cosa puoi farci",
          body: [
            "Usalo per qualsiasi cosa, anche per lavoro commerciale. Converti tutti i file che vuoi. Niente account, niente chiave di licenza, nessuna attribuzione richiesta e nessun limite su come usi l'output: l'HTML che produce è tuo, da pubblicare, vendere o modificare.",
            "Ci sono due avvertenze pratiche, e servono allo strumento più che a noi: ogni file deve stare sotto il limite di dimensione indicato nella pagina, e la conversione gira sulla tua macchina, quindi un documento molto grande è limitato dalla tua memoria e dal tuo processore, non da una quota decisa da noi.",
          ],
        },
        {
          heading: "I tuoi documenti restano tuoi",
          body: [
            "Mantieni tutti i diritti che avevi sui file che converti, e sull'HTML che ne esce. Non rivendichiamo nessuna licenza su nessuno dei due, e non potremmo usarli nemmeno volendo: la conversione avviene nel tuo browser e i tuoi contenuti non ci arrivano mai.",
            "Sei tu responsabile di avere il diritto di convertire quello che converti. Se un documento non è tuo da elaborare, questo strumento non cambia le cose.",
          ],
        },
        {
          heading: "Controlla l'output prima di pubblicarlo",
          body: [
            "Il sito è gratuito e non offre alcuna garanzia. Puntiamo a una conversione accurata e sicura e documentiamo i limiti noti di ogni formato nella sua pagina, ma nessun convertitore è perfetto.",
            "Qui conta più che per la maggior parte degli strumenti, perché l'output è HTML ed è probabile che tu lo metta su un sito vero. Ogni input viene ripulito (script, gestori di eventi, URL javascript: ed embed vengono tolti) e consideriamo un fallimento di questa pulizia il tipo di bug più grave. Ma non possiamo garantire che il markup prodotto da un input qualsiasi sia sicuro in ogni contesto in cui potresti incollarlo. Rivedi quello che pubblichi, esattamente come rivedresti l'HTML di qualsiasi altra fonte esterna.",
            "Anche la struttura ha dei limiti: le celle unite si dividono, lo stile di Excel non viene riprodotto e le impaginazioni complesse di Word si appiattiscono. Per qualsiasi cosa importante, confronta l'output con l'originale.",
            "Nei limiti consentiti dalla legge, non siamo responsabili per dati persi, lavoro perso, mancati guadagni o altri danni derivanti dall'uso del sito o dall'affidamento sul suo output.",
          ],
        },
        {
          heading: "Uso consentito",
          body: [
            "Non usare il sito per elaborare materiale su cui non hai diritti, e non usarlo in modi che danneggino il sito o altre persone:",
          ],
          items: [
            "Non cercare di rompere, sovraccaricare o trovare vulnerabilità nel sito allo scopo di danneggiare il sito o chi lo usa. Se trovi un problema di sicurezza, segnalacelo invece.",
            "Non fare scraping o automatizzare il sito in un modo che lo peggiori per gli altri.",
            "Non ripubblicare il sito come se fosse tuo, né presentarlo come se fosse gestito da qualcun altro.",
            "Non interferire con la pubblicità che paga l'hosting, non bloccarla e non gonfiarla artificialmente.",
          ],
        },
        {
          heading: "Il software su cui si basa",
          body: [
            "Questo strumento poggia su librerie open source (markdown-it, Mammoth, DOMPurify, Papa Parse, read-excel-file e altre), ognuna con la sua licenza, con le relative note mantenute nel codice distribuito. Le loro licenze coprono quei componenti; questi termini coprono questo sito.",
          ],
        },
        {
          heading: "Disponibilità e modifiche",
          body: [
            "È un servizio gratuito gestito da una persona. Possiamo cambiare come funziona, aggiungere o togliere un formato, o metterlo offline, senza preavviso. Dato che qui non è conservato niente di tuo, un'interruzione ti costa l'accesso a un convertitore e nient'altro.",
            "Se questi termini cambiano, cambia anche la data in cima alla pagina. Continuare a usare il sito dopo vuol dire accettare la versione aggiornata.",
          ],
        },
      ],
    },
    cookies: {
      short: "Cookie",
      eyebrow: "Informativa sui cookie",
      title: "Informativa sui cookie — Docs 2 HTML",
      description:
        "Cookie di Docs 2 HTML: nessuno senza il tuo sì alle statistiche, poi quelli di Google Analytics. La pubblicità chiederà il consenso in SEE, UK e Svizzera.",
      h1: "Informativa sui cookie",
      lede: [
        "Questo sito non imposta cookie se non dici di sì alle statistiche. Non c'è un login e nient'altro da ricordare tra una visita e l'altra.",
        "Questa pagina dice esattamente cosa comportano le statistiche e, più avanti, la pubblicità.",
      ],
      sections: [
        {
          heading: "Cos'è un cookie, in breve",
          body: [
            "Un cookie è un piccolo pezzo di testo che un sito chiede al tuo browser di conservare e rimandare nelle visite successive. È così che un sito riconosce che due caricamenti di pagina arrivano dallo stesso browser: utile per restare connessi, e altrettanto utile per tracciare. Tecnologie simili come il local storage e gli identificatori del dispositivo fanno più o meno lo stesso lavoro con mezzi diversi, e sono trattate anche qui.",
          ],
        },
        {
          heading: "I cookie che imposta questo sito",
          body: [
            "Nessuno, a meno che tu non clicchi Consenti sulla barra delle statistiche. In quel caso Google Analytics ne imposta due: _ga, che distingue un nuovo visitatore da uno che ritorna, e _ga_ seguito da un ID, che tiene traccia della visita in corso. Possono durare entrambi fino a due anni. Clicca No, grazie, o ignora la barra, e non viene impostato niente.",
            "Non c'è un account in cui restare connessi, nessun carrello e nessuna preferenza da ricordare tra le visite. Anche le impostazioni del convertitore (frammento o pagina completa, indentazione, riga di intestazione, separatore) vivono solo nella pagina finché la tieni aperta, e si azzerano quando la ricarichi. Allo stesso modo, i tuoi file e il risultato della conversione non vengono mai scritti in local storage, IndexedDB o in un cookie.",
            "L'unica cosa che conserviamo è la tua risposta alla barra delle statistiche, nel local storage di questo browser, così non te lo chiediamo su ogni pagina.",
          ],
        },
        {
          heading: "Cookie pubblicitari",
          body: [
            "L'hosting si paga con la pubblicità, e intendiamo usare Google AdSense. Quando sarà attivo, Google potrà impostare cookie o leggere identificatori del dispositivo per mostrare annunci, limitare quante volte vedi lo stesso e misurare i clic. In alcune configurazioni quei cookie servono a personalizzare gli annunci in base alla tua navigazione altrove.",
            "Questi cookie li imposta Google, non noi, e Google è il titolare dei dati che contengono. Quello che possono vedere è la pagina in cui sei. Quello che non possono vedere è qualsiasi cosa tu converta: non lascia mai il browser, quindi uno script pubblicitario non ha niente da leggere.",
          ],
        },
        {
          heading: "Consenso, se sei in Europa",
          body: [
            "Se ti trovi nello Spazio economico europeo, nel Regno Unito o in Svizzera, i cookie non essenziali vengono usati solo dopo che hai acconsentito. Ti verrà chiesto una volta, con una finestra di consenso, e puoi rifiutare e continuare a usare ogni parte del sito: qui niente è bloccato dietro al consenso.",
            "Puoi cambiare risposta in qualsiasi momento: clicca “Impostazioni statistiche” in fondo a qualsiasi pagina e la barra ricompare. Dire no dopo un sì spegne le statistiche e cancella i cookie che avevano impostato.",
          ],
        },
        {
          heading: "Gestire i cookie da solo",
          body: [
            "Indipendentemente da quello che c'è su questo sito, l'ultima parola ce l'ha il tuo browser:",
          ],
          items: [
            "Tutti i browser principali possono bloccare del tutto i cookie di terze parti, nelle impostazioni della privacy.",
            "Puoi cancellare i cookie esistenti di un sito, o di tutti i siti, in qualsiasi momento.",
            "Le finestre private o in incognito cancellano i cookie quando le chiudi.",
            "Le impostazioni annunci di Google ti permettono di disattivare la pubblicità personalizzata sui siti che usano la sua rete.",
          ],
        },
        {
          heading: "Modifiche",
          body: [
            "Se questo sito inizia a usare un cookie che oggi non usa, questa pagina viene aggiornata prima che succeda, e cambia la data in cima. Se vuoi sapere cosa è impostato in questo momento invece di fidarti della nostra parola, gli strumenti per sviluppatori del browser ti mostrano l'elenco completo sotto Applicazione o Archiviazione.",
          ],
        },
      ],
    },
  },
  guideIndex: {
    short: "Guide",
    eyebrow: "Guide",
    title: "Guide: i punti difficili quando converti documenti in HTML",
    description:
      "Sette guide: sei sulle conversioni che si inceppano (tabelle Markdown, Word, Google Docs, testo, CSV, Excel) e una sul farlo senza far uscire il file.",
    h1: "Guide",
    lede: [
      "Ogni convertitore ha una pagina che dice cosa fa. Queste servono per il dopo: il file uscito male, e perché.",
      "Una guida per strumento, più una su come tenere il file lontano dalla rete, tutte scritte a partire dalle domande che la gente ci manda davvero. Niente registrazione, e ogni pagina porta dritta al convertitore di cui parla.",
    ],
  },
  guides: {
    "word-to-html-without-uploading": {
      short: "Senza upload",
      eyebrow: "Guida · Word → HTML",
      title: "Conversione senza upload: l'HTML nasce nella tua scheda",
      description:
        "Il documento diventa HTML in questa scheda e l'anteprima gira in una sandbox chiusa. Perché batte un server, come controllare il markup e dove non basta.",
      keywords: [
        "convertire word in html senza caricare",
        "convertitore docx html offline",
        "word in html privato",
        "convertitore documenti html sicuro",
        "word in html senza server",
      ],
      h1: "Il tuo .docx non lascia mai la scheda: come verificarlo da solo",
      lede: [
        "Questo convertitore monta l'HTML sulla tua macchina e lo mostra in un'anteprima che non può raggiungere la rete. Due promesse separate, e si possono verificare tutte e due.",
        "Quando il documento è un lavoro per un cliente o qualcosa di non ancora pubblico, la domanda utile non è se lo cancellano: è se è mai stato inviato. Qui no.",
      ],
      tool: "docx-to-html",
      sections: [
        {
          heading: "Il markup è pronto prima che possa partire qualsiasi richiesta",
          body: [
            "Un .docx è uno zip di XML. Questo strumento lo scompatta e ricostruisce la struttura come HTML interamente con gli script della pagina: codice arrivato quando hai aperto la pagina, che da lì in poi lavora in locale.",
            "Dietro non c'è nessun server ad aspettare un file. Il sito è fatto di file statici, quindi non esiste un indirizzo a cui mandare un documento, nemmeno se il codice ci provasse.",
          ],
        },
        {
          heading: "L'anteprima è in sandbox apposta",
          body: [
            "L'HTML generato viene mostrato dentro un iframe in sandbox con restrizioni. Quel riquadro può disegnare il markup ma non può eseguire script, scaricare font remoti o fare richieste: quindi anche un markup che per caso contenesse qualcosa di attivo non può fare niente.",
            "La sandbox protegge l'anteprima; non è la stessa cosa della privacy del file. Ma è il motivo per cui puoi vedere l'anteprima di un documento che non hai scritto tu senza che l'anteprima diventi una porta verso la rete.",
          ],
        },
        {
          heading: "Leggi l'HTML prima di fidarti",
          steps: [
            "Converti il file, poi guarda il riquadro del codice, non solo la vista renderizzata.",
            "Cerca qualsiasi cosa non ti aspetti: un tag script, un'immagine remota, un beacon. Di default non c'è niente: è il tuo documento sotto forma di tag, senza aggiunte.",
            "Copia il markup in un editor semplice per controllare la stessa cosa lontano dalla pagina.",
          ],
          body: [
            "Un markup che puoi leggere è un markup di cui puoi rispondere: un tipo di fiducia diverso da quello di un servizio che ti restituisce un file finito che non apri mai.",
          ],
        },
        {
          heading: "Ora prova con la rete spenta",
          steps: [
            "Apri la pagina, poi scollegati da internet.",
            "Dagli un .docx. Esce lo stesso HTML; non c'è mai stato un viaggio di andata e ritorno da interrompere.",
          ],
          body: [
            "Lascia aperta la scheda Rete durante una conversione e il punto è chiaro senza staccare niente: il documento non provoca nessuna richiesta in uscita.",
          ],
        },
        {
          heading: "Quello che questo non copre",
          body: [
            "Tenere il file fuori dalla rete è la garanzia forte, non l'unica che conta. Appena l'HTML parte verso un repository, un CMS o un'email, arriva dove arriva quel posto.",
            "E un browser resta un browser: un'estensione che legge la pagina, o qualcosa che è già sul computer, vede il documento in ogni caso. Quello che sparisce è il rischio più grosso: una copia che vive sui server di un convertitore. Il resto non cambia.",
          ],
        },
      ],
      outro:
        "Converti, leggi il codice, e se vuoi scollegati per una prova dal vivo. Il documento viene ricostruito come HTML in questa scheda e non viene mandato da nessuna parte.",
    },
    "markdown-tables-to-html": {
      short: "Tabelle Markdown",
      eyebrow: "Guida · Markdown → HTML",
      title: "Tabelle Markdown in HTML: come convertirle, con allineamento",
      description:
        "Le tabelle con barre verticali diventano vere <table> con <thead> e th scope. Come scrivere la riga di allineamento e perché una tabella esce come testo.",
      keywords: [
        "tabella markdown in html",
        "tabelle markdown",
        "convertire tabella markdown in html",
        "tabella markdown html",
        "allineamento tabella markdown",
      ],
      h1: "Da tabelle Markdown a tabelle HTML",
      lede: [
        "La tabella con le barre verticali è il pezzo di Markdown che si vede fallire più spesso. Su GitHub si vede bene, e altrove esce come un paragrafo pieno di barre.",
        "Qui vediamo la sintassi che sopravvive alla conversione, com'è l'HTML dall'altra parte, e i tre errori che trasformano una tabella di nuovo in testo.",
      ],
      tool: "markdown-to-html",
      sections: [
        {
          heading: "Cosa serve a una tabella per essere una tabella",
          body: [
            "Le tabelle con barre verticali non fanno parte di CommonMark. Arrivano da GitHub Flavored Markdown, quindi un convertitore deve scegliere di supportarle, e alcuni non lo fanno. Questo sì.",
            "Servono tre cose. Una riga di intestazione. Sotto, una riga separatrice fatta di trattini. E almeno una riga di contenuto. Se ne manca una delle tre, ottieni paragrafi.",
          ],
          steps: [
            "Scrivi la riga di intestazione con una barra verticale tra una cella e l'altra. Le barre all'inizio e alla fine della riga sono facoltative, ma rendono molto più facile accorgersi delle tabelle storte.",
            "Scrivi la riga separatrice subito sotto, senza righe vuote in mezzo. Almeno tre trattini per colonna è il minimo sicuro.",
            "Scrivi le righe di contenuto. Nel sorgente non devono essere allineate: le celle si dividono sulle barre, non sulle colonne.",
          ],
          sample: {
            beforeLabel: "Markdown",
            before: "| Part | Qty |\n| ---- | --- |\n| Bolt | 12 |\n| Nut  | 12 |",
            afterLabel: "HTML",
            after: '<table>\n  <thead>\n    <tr>\n      <th scope="col">Part</th>\n      <th scope="col">Qty</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Bolt</td>\n      <td>12</td>\n    </tr>\n  </tbody>\n</table>',
          },
        },
        {
          heading: "L'attributo scope, e perché c'è",
          body: [
            "Le celle di intestazione escono come <th scope=\"col\">, non come <td> in grassetto. Quell'attributo è il motivo per cui uno screen reader può dire \"Qty, 12\" invece di leggere un numero nudo senza sapere a che colonna appartiene.",
            "Non costa niente ed è la differenza tra una tabella e una griglia di numeri. Una disposizione finta fatta di div non può esprimerlo per niente, ed è l'argomento più forte per non costruirne mai una.",
          ],
        },
        {
          heading: "Allineamento: la riga dei due punti",
          body: [
            "I due punti nella riga separatrice impostano l'allineamento colonna per colonna. Due punti a sinistra allineano a sinistra, da tutti e due i lati centrano, a destra allineano a destra, che è quello che vuoi per i numeri.",
            "Nell'HTML ricevi una classe, non uno stile inline: align-left, align-center o align-right. Gli stili inline vengono tolti da ogni output di questo sito, perché un attributo style è la porta da cui passa la CSS injection.",
            "Vuol dire che con la pagina completa l'allineamento funziona già: il foglio di stile nell'<head> definisce quelle tre classi. Con il frammento le lasci al tuo CSS, ed è proprio il senso del frammento: tre regole di una riga e si adatta al tuo sito invece di litigarci.",
          ],
          sample: {
            beforeLabel: "Markdown",
            before: "| Item | Cost |\n| :--- | ---: |\n| Bolt | 0.40 |",
            afterLabel: "HTML",
            after: '<th scope="col" class="align-left">Item</th>\n<th scope="col" class="align-right">Cost</th>\n...\n<td class="align-left">Bolt</td>\n<td class="align-right">0.40</td>',
          },
        },
        {
          heading: "Quando la tabella esce come paragrafo",
          body: [
            "Tre cause, nell'ordine in cui capitano.",
          ],
          steps: [
            "Una riga vuota tra l'intestazione e la riga separatrice. La divide in due paragrafi prima ancora che il parser delle tabelle la veda.",
            "Una barra verticale dentro il testo di una cella. Scrivila come \\|, altrimenti la cella si divide in due e la riga finisce con più celle dell'intestazione.",
            "Troppi pochi trattini. Un trattino per colonna funziona con alcuni parser e con altri no; tre è la versione su cui sono d'accordo tutti.",
          ],
        },
        {
          heading: "Celle con dentro più del testo",
          body: [
            "Il Markdown inline funziona dentro le celle: grassetto, corsivo, codice, link. I contenuti di blocco no: niente elenchi, niente paragrafi, niente blocchi di codice delimitati. È un limite della sintassi delle tabelle, non di questo convertitore.",
            "Per andare a capo dentro una cella serve un <br> scritto a mano. Qui l'HTML grezzo nel Markdown passa invece di ricevere l'escape, quindi funziona, e in uscita viene ripulito come tutto il resto.",
          ],
        },
      ],
      outro:
        "Queste sono tutte le parti di una tabella Markdown che si comportano diversamente una volta diventate HTML. Il convertitore accetta Markdown incollato o un file .md trascinato, e niente lascia il tuo browser.",
    },
    "word-to-html-keep-formatting": {
      short: "Formattazione Word",
      eyebrow: "Guida · DOCX → HTML",
      title: "Da Word a HTML con formattazione: cosa resta e cosa no",
      description:
        "Cosa di un .docx arriva in HTML e cosa viene tolto apposta. Titoli, tabelle, elenchi e immagini restano come struttura; font, colori e impaginazione no.",
      keywords: [
        "da word a html con formattazione",
        "convertire word in html mantenendo la formattazione",
        "docx in html formattazione",
        "word in html senza perdere la formattazione",
        "da docx a html pulito",
      ],
      h1: "Cosa sopravvive quando Word diventa HTML",
      lede: [
        "\"Mantenere la formattazione\" vuol dire due cose diverse, e quale intendi decide se il risultato ti piacerà.",
        "La struttura (titoli, elenchi, tabelle, enfasi) passa. L'aspetto (font, colori, margini, interruzioni di pagina) no, ed è una scelta voluta, non una funzione che manca.",
      ],
      tool: "docx-to-html",
      sections: [
        {
          heading: "La struttura resta, l'aspetto no",
          body: [
            "Un .docx salva due cose diverse su ogni paragrafo: cos'è e che aspetto ha. \"Titolo 2\" è cos'è. Calibri 16 pt grassetto con 6 pt di spazio dopo è l'aspetto.",
            "Il convertitore legge la prima e butta via la seconda. Un Titolo 2 diventa un <h2>, non un <p> con una dimensione del carattere. Sul tuo sito prende poi lo stile dei tuoi titoli, che quasi sicuramente è quello che volevi.",
            "L'alternativa è quello che fa “Salva come pagina Web” di Word: qualche migliaio di righe di stili mso- che riproducono la pagina alla perfezione e che poi non si possono modificare né restilizzare.",
          ],
        },
        {
          heading: "Usa gli stili per i titoli, non solo il grassetto",
          body: [
            "È l'unica cosa che vale la pena fare in Word prima di convertire, ed è la differenza tra un output buono e uno piatto.",
            "Un testo che sembra solo un titolo (più grande, in grassetto, dimensionato a mano) viene salvato come paragrafo normale. Diventa <p>, perché è davvero quello che è. Dalla dimensione del carattere non si può ricavare l'intenzione.",
          ],
          steps: [
            "In Word, metti il cursore in un titolo e guarda la raccolta Stili. Se dice Normale, il problema è quello.",
            "Applica invece Titolo 1, 2 o 3. Cambierà aspetto; se non ti piace, modifica lo stile del titolo stesso.",
            "Fai lo stesso con gli elenchi: usa i pulsanti degli elenchi invece di scrivere \"1.\" e un tab. I numeri scritti a mano diventano testo, non un <ol>.",
            "Converti, poi cerca <h2> e <ul> nell'output. Se vedi un muro di <p>, il documento non era mai stato strutturato.",
          ],
        },
        {
          heading: "Cosa passa",
          body: [
            "Livelli di titolo come <h1>–<h6>, presi dagli stili di Word. Grassetto, corsivo e barrato come <strong>, <em> e <s>. Apice e pedice. Link, con i parametri di tracciamento di Google e Office tolti.",
            "Elenchi come veri <ul> e <ol>, annidati fino a cinque livelli. Tabelle come <table>, comprese le celle unite: le unioni orizzontali passano come colspan e quelle verticali come rowspan.",
            "Citazioni dallo stile Citazione. Paragrafi in stile Codice o Preformattato come <pre><code>. Didascalie come <p class=\"caption\">.",
          ],
        },
        {
          heading: "Cosa viene tolto, e perché",
          body: [
            "Font, dimensioni, colori, evidenziazione, allineamento, rientri, interlinea, interruzioni di pagina, intestazioni e piè di pagina, margini. È tutta presentazione che appartiene a una pagina, e l'HTML non è una pagina.",
            "Due cose tolte vale la pena saperle, perché sono facili da non notare. Il testo sottolineato perde la sottolineatura: sul web una sottolineatura vuol dire link, quindi la sottolineatura di Word non diventa niente invece di qualcosa di fuorviante. E i paragrafi vuoti usati per fare spazio spariscono, perché sono impaginazione, non contenuto.",
            "Revisioni e commenti vengono tolti: ricevi il testo finale, non la cronologia delle modifiche. Caselle di testo, SmartArt e grafici non sopravvivono: resta solo il loro testo, se ne contengono.",
          ],
        },
        {
          heading: "Immagini: tre scelte",
          steps: [
            "Il base64 incorporato ti dà un unico file .html autonomo, da mandare per email o aprire con un doppio clic. È circa un terzo più grande delle immagini di partenza.",
            "I file separati ti danno uno zip: l'HTML più una cartella images/, con ogni <img> che punta già al percorso giusto. Usalo per tutto quello che va su un sito vero.",
            "Eliminale lascia i tag <img> al loro posto con un src vuoto, quindi vedrai i segnaposto delle immagini rotte. Cancellali, o usa una delle altre due opzioni.",
          ],
          body: [
            "I vecchi file .doc sono l'eccezione: da quel formato le immagini non si recuperano proprio, qualunque opzione scegli. Tutto il resto (testo, titoli, tabelle, grassetto) passa.",
          ],
        },
      ],
      outro:
        "Prima sistema gli stili dei titoli, poi converti. I file vengono letti nel tuo browser e mai caricati, quindi puoi provarlo anche su qualcosa di riservato.",
    },
    "google-docs-to-html-clean": {
      short: "Zuppa di classi di Google Docs",
      eyebrow: "Guida · Google Docs → HTML",
      title: "HTML pulito da Google Docs: via la zuppa di classi c1/c17",
      description:
        "Da un Google Doc copi HTML pieno di classi c1 e c17, un <b> con font-weight:normal e redirect google.com/url nei link. Cosa sono e come toglierli.",
      keywords: [
        "html pulito da google docs",
        "google docs in html pulito",
        "togliere classi google docs html",
        "esportare google docs in html pulito",
        "copiare da google docs html",
      ],
      h1: "Ottenere HTML pulito da un Google Doc",
      lede: [
        "Copia qualche paragrafo da un Doc, incollalo in un CMS, e ottieni testo avvolto in classi come c1 e c17 che puntano a un foglio di stile che non hai.",
        "In quel markup ci sono tre problemi precisi. Una volta capito cosa sono, la soluzione è un incolla.",
      ],
      tool: "google-docs-to-html",
      sections: [
        {
          heading: "Copia il contenuto, non il link",
          body: [
            "È la prima cosa che frega: File → Scarica → Pagina web dal menu del Doc ti dà uno zip con un documento HTML completo e un foglio di stile incorporato, tutta la pagina con tutti gli stili.",
            "Quello che ti serve invece sono gli appunti. Se selezioni il contenuto in un Doc e lo copi, negli appunti finisce una versione HTML in testo formattato, e quella porta la struttura senza il foglio di stile.",
          ],
          steps: [
            "Apri il Doc e seleziona il contenuto che ti serve. Ctrl+A va bene se lo vuoi tutto.",
            "Copia con Ctrl+C, non con \"Copia link\", che ti dà solo un URL al documento.",
            "Incolla nel riquadro della pagina del convertitore, o premi Ctrl+V in un punto qualsiasi di quella pagina. Niente login e nessun permesso sul Drive: il browser passa gli appunti, nient'altro.",
          ],
        },
        {
          heading: "Problema uno: la zuppa di classi",
          body: [
            "L'HTML che Google mette negli appunti dà una classe a quasi ogni elemento: c0, c1, c17, e nomi lst-kix_ sulle voci degli elenchi. Sono generate documento per documento e rimandano a un CSS che resta nel Doc.",
            "Quindi non sono solo rumore. Sono riferimenti morti: sulla tua pagina non fanno niente, si scontrano con le tue classi e rendono il markup illeggibile quando vai a modificarlo.",
            "Vengono tolte per schema: c seguito da cifre, qualsiasi cosa che inizi con lst-kix_, id docs-internal-guid. Le tue classi, se per caso sono nell'incolla, restano dove sono.",
          ],
          sample: {
            beforeLabel: "Incollato da Docs",
            before: '<p class="c3"><span class="c1">A sentence.</span></p>',
            afterLabel: "Dopo la pulizia",
            after: "<p>A sentence.</p>",
          },
        },
        {
          heading: "Problema due: il grassetto che non è grassetto",
          body: [
            "Docs avvolge il contenuto copiato in <b style=\"font-weight:normal\">. È un tag <b> che spegne esplicitamente il grassetto: una stranezza del modo in cui l'editor tiene traccia della formattazione.",
            "Incollalo dove l'attributo style viene tolto, cioè nella maggior parte dei CMS, e tutto il blocco diventa grassetto. Qui il tag viene rimosso invece di essere tenuto, così il contenuto esce al livello di annidamento in cui doveva stare fin dall'inizio.",
            "Lo stesso passaggio toglie gli <span> rimasti vuoti dopo che le loro classi se ne sono andate. Sono loro che rendono lungo dodici righe un incolla di due paragrafi.",
          ],
        },
        {
          heading: "Problema tre: ogni link è un redirect",
          body: [
            "I link in un Doc escono puntando a google.com/url?q=https://example.com/… invece che alla destinazione. Google lo usa per tracciare i clic dentro l'editor.",
            "Pubblicato su una pagina, vuol dire che ogni link in uscita dal tuo sito passa da Google, mostra l'URL sbagliato nella barra di stato e si rompe il giorno in cui quel redirect cambia.",
            "Il contenitore viene srotolato fino alla vera destinazione, più volte se è annidato. Spariscono anche i parametri di tracciamento: utm_source e compagnia, gclid, fbclid e qualche altro.",
          ],
          sample: {
            beforeLabel: "Incollato da Docs",
            before: '<a href="https://www.google.com/url?q=https://example.com/a%3Futm_source%3Ddoc">link</a>',
            afterLabel: "Dopo la pulizia",
            after: '<a href="https://example.com/a">link</a>',
          },
        },
        {
          heading: "Cosa resta, e cosa tocca ancora a te",
          body: [
            "Titoli, paragrafi, elenchi, tabelle, link, grassetto e corsivo: il documento, insomma. Script, gestori di eventi e stili inline spariscono, perché l'HTML degli appunti può arrivare da qualsiasi pagina del web e viene trattato come input non fidato.",
            "Due cose il pulitore le lascia a te. I paragrafi vuoti di Google per fare spazio arrivano come <p></p>, quindi cancella quelli che non vuoi. E le immagini di Docs stanno sui server di Google con URL che scadono: scaricale e ospitale tu, altrimenti più avanti spariranno dalla tua pagina.",
          ],
        },
      ],
      outro:
        "Seleziona, copia, incolla. Gli appunti vengono letti nel tuo browser e non viene inviato niente da nessuna parte.",
    },
    "plain-text-to-html-paragraphs": {
      short: "Testo in paragrafi",
      eyebrow: "Guida · Testo → HTML",
      title: "Riga vuota in HTML: come lasciarla tra i paragrafi",
      description:
        "Invio nell'HTML non crea spazio. Lascia una riga vuota con due <br>, <p>&nbsp;</p> o un margine CSS, e guarda come le righe vuote diventano tag <p>.",
      keywords: [
        "riga vuota html",
        "come lasciare una riga vuota in html",
        "spazio tra paragrafi html",
        "andare a capo html",
        "spazio vuoto html",
        "convertire testo in html",
        "testo in paragrafi html",
        "convertire testo in tag p html",
      ],
      h1: "Come lasciare una riga vuota in HTML",
      lede: [
        "Il testo incollato così com'è in una pagina si schiaccia in un unico blocco, perché l'HTML ignora i tuoi a capo. Per un browser, qualsiasi serie di spazi è un solo spazio.",
        "Due regole decidono tutto il risultato: le righe vuote separano i paragrafi, e sugli a capo singoli decidi tu. Tutto il resto viene da lì.",
      ],
      tool: "text-to-html",
      sections: [
        {
          heading: "Quattro modi per avere una riga vuota",
          body: [
            "Premere Invio due volte nel tuo HTML non cambia niente sullo schermo. Ecco cosa funziona, dal più comune.",
            "Tra due paragrafi: chiudi un <p> e aprine un altro. I browser danno a ogni <p> un margine di 1em sopra e sotto, più o meno una riga, quindi lo spazio c'è già.",
            "Dentro un paragrafo: due <br> di fila, come in riga uno<br><br>riga tre. Il primo chiude la riga, il secondo ne lascia una vuota.",
            "Un paragrafo vuoto: <p>&nbsp;</p>. Un <p></p> nudo non ha altezza, quindi non si vede niente. Lo spazio non separabile gli dà l'altezza di una riga.",
            "Più o meno spazio di una riga: impostalo nel CSS, per esempio p { margin-bottom: 2em; }. È la soluzione pulita quando lo spazio è una scelta grafica e non parte del testo.",
          ],
        },
        {
          heading: "Le righe vuote del testo diventano tag <p>",
          body: [
            "Una riga vuota tra due blocchi di testo produce due elementi <p>. È l'unica regola per i paragrafi, ed è la stessa convenzione che usa da trent'anni ogni email in testo semplice.",
            "Nell'HTML vero e proprio le righe vuote nel sorgente vengono ignorate (un browser riduce qualsiasi serie di spazi a uno solo), quindi premere Invio nel markup non aggiunge nessuno spazio visibile. Lo spazio tra i paragrafi viene dai tag <p>; un <br> da solo va solo a capo. Questo convertitore trasforma ogni riga vuota del testo in una vera interruzione <p>, così non devi scrivere niente di tutto questo a mano.",
            "Una riga con solo spazi o tab conta comunque come vuota. Più righe vuote di fila fanno comunque una sola interruzione, non paragrafi vuoti.",
            "Se il testo non ha nessuna riga vuota, ottieni un unico paragrafo lungo, ed è giusto così, perché non c'era niente su cui dividere. Il convertitore te lo dice quando se ne accorge, invece di fartelo scoprire dopo.",
          ],
          sample: {
            beforeLabel: "Testo",
            before: "First thought.\n\nSecond thought.",
            afterLabel: "HTML",
            after: "<p>First thought.</p>\n<p>Second thought.</p>",
          },
        },
        {
          heading: "A capo singoli: <br> o uno spazio",
          body: [
            "Dentro un paragrafo, un a capo singolo può andare in due modi, e la risposta giusta dipende solo da cos'è il testo.",
            "Tienili come <br> per tutto quello in cui la fine della riga ha un senso: un indirizzo, una poesia, una firma, il testo di una canzone. Lascia scorrere il testo (gli a capo diventano spazi) per la prosa spezzata a 72 colonne da un vecchio editor. Se lì li lasci come <br>, ottieni un paragrafo con il margine destro frastagliato che su un telefono non si riadatta.",
          ],
          sample: {
            beforeLabel: "Testo",
            before: "12 Bridge Street\nManchester",
            afterLabel: "HTML, a capo tenuti",
            after: "<p>12 Bridge Street<br>\nManchester</p>",
          },
        },
        {
          heading: "Trasformare gli URL nudi in link",
          body: [
            "Con i link attivi, tutto quello che inizia con http://, https:// o www. diventa un <a>. Gli indirizzi email diventano link mailto:.",
            "Il riconoscimento è stretto di proposito. Un example.com nudo non diventa link, perché non c'è modo di distinguerlo da una frase che finisce con un nome di file o da un'abbreviazione con un punto. Sbagliare lì produce link verso il nulla.",
            "La punteggiatura finale resta fuori dal link, così un URL a fine frase non si mangia il punto. I link ricevono rel=\"noopener nofollow\" e non si aprono in una nuova scheda.",
          ],
        },
        {
          heading: "Cosa il testo semplice non può dire al convertitore",
          body: [
            "Qui tutto diventa paragrafo. Non c'è un altro tipo di output, ed è una caratteristica dell'input, non un difetto.",
            "Una riga che inizia con un trattino a te sembra un elenco, ma è un trattino e uno spazio. Una riga sottolineata con segni di uguale sembra un titolo, ma è una fila di segni di uguale. Indovinare sbaglierebbe abbastanza spesso da essere peggio che non indovinare.",
            "Quindi: niente elenchi, niente titoli, niente blocchi di codice. L'indentazione resta come caratteri ma nel browser si schiaccia, quindi tabelle ASCII e codice indentato escono come prosa tutta attaccata. Se il tuo testo in realtà è Markdown, usa la pagina Markdown: lì quelle convenzioni hanno un significato.",
          ],
        },
        {
          heading: "Una cosa di cui non devi preoccuparti",
          body: [
            "Parentesi angolari, e commerciali e virgolette ricevono l'escape, tutte. Un testo che contiene <b>bold</b> mostra quei caratteri sulla pagina invece di diventare grassetto.",
            "È la definizione stessa dello strumento, non una misura di sicurezza aggiunta. Il testo semplice è testo semplice: se potesse contenere markup, non lo sarebbe.",
          ],
        },
      ],
      outro:
        "Incolla il testo o trascina un file .txt, scegli come trattare gli a capo singoli e copia l'HTML. Gira tutto nel tuo browser.",
    },
    "csv-to-html-table-large-files": {
      short: "CSV grandi",
      eyebrow: "Guida · CSV → tabella",
      title: "CSV in tabella HTML: separatori, virgolette e file grandi",
      description:
        "Come si riconosce il separatore, cosa succede a virgolette e a capo nelle celle, perché un file a una colonna dà un avviso, e il limite di 100.000 celle.",
      keywords: [
        "convertire csv in tabella html",
        "csv in html",
        "csv grande in html",
        "csv punto e virgola in tabella html",
        "tsv in tabella html",
      ],
      h1: "Da CSV a tabella HTML, anche per i file grandi",
      lede: [
        "Un CSV è un file di testo con una convenzione di punteggiatura, e le convenzioni sono parecchie. Quasi tutti i problemi di conversione sono in realtà disaccordi su quale convenzione usa un file.",
        "Qui vediamo come si sceglie il separatore, cosa fanno le virgolette, e dove stanno davvero i limiti di dimensione.",
      ],
      tool: "csv-to-html-table",
      sections: [
        {
          heading: "Il separatore si riconosce, non si dà per scontato",
          body: [
            "Virgole, punti e virgola, tab e barre verticali si usano tutti. Soprattutto il punto e virgola: esporta un foglio di calcolo in un paese dove la virgola è il separatore decimale, come l'Italia, e avrai punti e virgola, perché le virgole sono già occupate.",
            "Il riconoscimento legge le prime dieci righe, prova ogni candidato e sceglie quello che dà un numero di colonne coerente. Un file con le prime righe insolite (per esempio una riga di titolo sopra l'intestazione) può essere letto male, quindi il separatore riconosciuto viene indicato nell'output. Se è sbagliato, cambialo.",
          ],
          steps: [
            "Trascina il file e guarda la nota sopra la tabella che dice quale separatore è stato usato.",
            "Se la tabella ha una colonna quando dovrebbe averne sei, imposta il separatore a mano dal menu a tendina.",
            "Controlla che la prima riga sia finita nell'intestazione. Se il file non ha intestazione, disattivala e ogni riga diventa una riga di contenuto.",
          ],
        },
        {
          heading: "Campi tra virgolette, e la virgola dentro una cella",
          body: [
            "Un campo tra virgolette doppie può contenere il separatore, e una virgoletta doppia ripetuta al suo interno vuol dire una virgoletta vera. È la RFC 4180 ed è gestita come si deve.",
            "Un campo tra virgolette può contenere anche un a capo. Nell'HTML diventa un <br> dentro la cella, così un indirizzo su due righe resta su due righe invece di spezzare la riga della tabella.",
          ],
          sample: {
            beforeLabel: "CSV",
            before: 'name,note\nBolt,"M6, 40mm"\n',
            afterLabel: "HTML",
            after: '<tr>\n  <td>Bolt</td>\n  <td>M6, 40mm</td>\n</tr>',
          },
        },
        {
          heading: "L'avviso sui file a una colonna",
          body: [
            "Un CSV con una sola colonna segnala un problema di separatore. Vale la pena spiegarlo, perché di solito il file va benissimo.",
            "Il riconoscimento funziona cercando il carattere che divide le righe in modo coerente. Con una sola colonna non c'è niente da dividere, quindi niente sembra un separatore e lo dice. L'output è comunque corretto: una colonna, tutte le righe presenti.",
            "Se preferisci non vederlo, imposta il separatore esplicitamente invece di lasciarlo su automatico.",
          ],
        },
        {
          heading: "Cosa vuol dire \"grande\" qui",
          body: [
            "Due tetti separati. 25 MB per file e 100.000 celle, cioè righe per colonne: quindi un file a sei colonne arriva a circa 16.000 righe e uno a cento colonne si ferma intorno a mille.",
            "Il limite di celle è quello che raggiungi per primo, e dipende dal browser più che dal parser. Ogni cella diventa nodi del DOM nell'anteprima, e una tabella di qualche centinaio di migliaia di celle blocca la scheda. Meglio rifiutare che congelare.",
            "Per qualcosa di davvero più grande, dividilo per righe e converti ogni pezzo: la riga di intestazione si può ripetere in ognuno. Le righe vuote vengono tolte in automatico, comprese quelle fatte solo di separatori, che è di solito quello che è un blocco finale di \",,,\".",
          ],
        },
        {
          heading: "Com'è fatta la tabella",
          body: [
            "La riga di intestazione diventa un <thead> con celle <th scope=\"col\">; tutto il resto va nel <tbody>. Le righe irregolari vengono completate fino alla riga più larga, così la tabella resta rettangolare, e l'output dice quante righe ne hanno avuto bisogno: di solito è il segno che qualcosa a monte è rotto.",
            "Non si converte nessun tipo. 007 resta 007, e un valore come 1-2 non diventa una data. Excel te lo fa; questo no.",
            "Con l'opzione responsive attiva, la tabella viene messa in un <div class=\"table-wrap\"> che scorre di lato. Una tabella a dodici colonne non sta su un telefono, e se la lasci sbordare allarga tutta la pagina invece di solo se stessa.",
          ],
        },
      ],
      outro:
        "Trascina il CSV o incolla direttamente le righe. I file vengono analizzati nel tuo browser, quindi i dati dei clienti non lasciano mai la macchina.",
    },
    "excel-to-html-table-formulas": {
      short: "Formule Excel",
      eyebrow: "Guida · Excel → tabella",
      title: "Excel in tabella HTML: che fine fanno formule e formati",
      description:
        "Le formule diventano il loro valore calcolato, non la formula, e in un caso escono vuote. Più cosa succede a valute, date, celle unite e fogli multipli.",
      keywords: [
        "convertire excel in tabella html",
        "convertire tabella excel in html",
        "da excel a html",
        "formule excel in html",
        "xlsx in tabella html",
      ],
      h1: "Da Excel a HTML: formule e formattazione",
      lede: [
        "Un foglio di calcolo contiene più dei suoi dati: formule dietro i numeri, formati numerici sopra, unioni a cavallo. L'HTML non ha niente di tutto questo.",
        "Quindi la domanda non è se qualcosa si perde: è cosa, e se è proprio quello che ti serviva.",
      ],
      tool: "excel-to-html-table",
      sections: [
        {
          heading: "Le formule diventano il loro risultato",
          body: [
            "Una cella con =SUM(B2:B9) esce come 4211. Su una pagina web è quasi sempre quello che vuoi: una formula su una pagina è una stringa, e una stringa che sembra una formula è peggio del numero.",
            "Funziona perché Excel salva il valore calcolato accanto alla formula a ogni salvataggio. Il convertitore legge quel valore salvato, ed è per questo che non gli serve un suo motore di calcolo.",
          ],
          sample: {
            beforeLabel: "Cella in Excel",
            before: "B10:  =SUM(B2:B9)",
            afterLabel: "HTML",
            after: "<td>4211</td>",
          },
        },
        {
          heading: "L'unico caso in cui escono vuote",
          body: [
            "Se la cartella di lavoro è stata generata da uno script (un'esportazione Python, un report automatico, qualcosa che usa una libreria per fogli di calcolo) e mai aperta in Excel, non c'è nessun valore salvato. Nessuno l'ha scritto. Quelle celle escono vuote.",
            "La soluzione è aprire il file in Excel o LibreOffice e salvarlo una volta. Così si calcola tutto e i valori vengono scritti. Il convertitore ti avvisa quando le celle con formula di un foglio risultano vuote, così non devi tirare a indovinare.",
            "Anche gli errori nelle formule escono vuoti invece che come #DIV/0! o #RIF!. Un foglio con un CERCA.VERT rotto lungo una colonna produce una colonna di celle vuote, quindi conviene controllare il file di origine quando una colonna esce vuota senza un motivo evidente.",
          ],
        },
        {
          heading: "I formati numerici non sopravvivono",
          body: [
            "È la sorpresa che più vale la pena conoscere in anticipo. Un formato numerico è una maschera che Excel dipinge sopra un valore; sotto, il valore è semplice.",
            "Quindi 1.234,50 € diventa 1234.5: simbolo della valuta, separatore delle migliaia e decimali fissi spariscono tutti. Una cella che mostra 12,50% diventa 0.125, perché quello è il numero che c'è sempre stato.",
            "Se la formattazione ti serve nell'output, aggiungi nel foglio una colonna con la stringa già formattata da una formula TESTO(), e usa quella. Così è una stringa, e le stringhe passano esattamente come sono.",
            "Le date sono l'eccezione: vengono riconosciute dal loro formato numerico ed escono come 2026-03-14, con l'ora aggiunta se c'è. Rilette in UTC apposta: la versione ingenua sposta ogni data indietro di un giorno per chiunque stia a ovest di Greenwich.",
          ],
        },
        {
          heading: "Le celle unite si dividono",
          body: [
            "Un titolo unito su A1:C1 diventa una cella con il testo e due celle vuote accanto. Excel tiene il valore nella cella in alto a sinistra e lascia le altre davvero vuote; senza l'informazione sull'unione, è quello che c'è da leggere.",
            "L'HTML può esprimere un'unione con colspan e rowspan, quindi dopo basta una modifica di una riga. Oppure separa le celle in Excel prima: spesso le unioni servivano solo a centrare un titolo.",
          ],
        },
        {
          heading: "Fogli, e i limiti di dimensione",
          steps: [
            "Di default si converte il primo foglio. Gli altri sono elencati per nome: spunta quelli che vuoi.",
            "Scegline più di uno e ognuno esce come <table> a sé con sopra un <h2> con il nome del foglio. Scegline uno solo e il nome va invece nella <caption> della tabella.",
            "Un foglio che resta vuoto dopo aver tolto le righe vuote finali te lo dice, invece di produrre una tabella vuota.",
          ],
          body: [
            "Due limiti. 10 MB per cartella di lavoro, meno dei 25 MB degli altri formati, perché un .xlsx è uno zip e scompattarlo in una scheda costa molta più memoria di quanto dica la dimensione del file. E 100.000 celle su tutto quello che hai selezionato, ed è per questo che scegliere meno fogli può far passare una cartella grande.",
            "Le cartelle protette da password vengono rifiutate invece che lette a metà, e così i vecchi file binari .xls. Per quelli, salva prima in .xlsx.",
          ],
        },
      ],
      outro:
        "Trascina la cartella di lavoro, scegli i fogli e copia la tabella. Viene letto tutto nel tuo browser: un modello finanziario non lascia mai la tua macchina.",
    },
  },
};

export default it;
