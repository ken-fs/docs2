import { CONTACT_EMAIL } from "@/content/site";
import type { Dictionary, Faq } from "../types";

/** 每页都该有的那几个问题，措辞不必因页面而变。 */
const PRIVACY: Faq = {
  q: "Mon fichier est-il envoyé quelque part ?",
  a: "Non. Tout se passe dans votre navigateur : la lecture, le nettoyage, la génération du HTML. Votre fichier ne passe par aucun serveur. Coupez le wifi et essayez : ça marche toujours.",
  shared: true,
};

const SAFETY: Faq = {
  q: "Ce HTML est-il sûr à mettre sur mon site ?",
  a: "C’est la partie qu’on prend le plus au sérieux. Tout ce qui entre passe par DOMPurify avant que vous le voyiez : balises script, attributs du genre onclick, URL javascript:, iframe, object et embed sont supprimés. L’aperçu tourne dans un iframe en sandbox, donc même si quelque chose passait entre les mailles, ça ne pourrait pas s’exécuter. Et rien de non nettoyé n’est jamais inséré dans cette page.",
  shared: true,
};

const MODES: Faq = {
  q: "Fragment ou document complet : lequel choisir ?",
  a: "Le fragment, si vous collez dans une page qui existe déjà : l’éditeur d’un CMS, un template, un composant React. Vous obtenez le balisage sans enveloppe <html> et sans <style>, donc il ne se bat pas avec le CSS de votre site. Le document complet, si vous voulez un fichier à ouvrir d’un double-clic : il arrive avec charset, viewport, un titre et un style intégré discret.",
  shared: true,
};

const PRETTY: Faq = {
  q: "Pourquoi le HTML est-il indenté comme ça ?",
  a: "Parce que vous allez le lire, et sans doute le commiter. L’indentation est activée par défaut et ajoute des retours à la ligne uniquement entre les éléments de bloc. Jamais dans un <pre> ni entre des balises inline, où les espaces changent le rendu. Désactivez-la si vous voulez la sortie la plus légère possible.",
  shared: true,
};

const fr: Dictionary = {
  htmlLang: "fr",
  chrome: {
    breadcrumbHome: "accueil",
    cleanHeading: "Ce qui part à la poubelle",
    cleanLede:
      "Word et Google Docs enrobent tous les deux le contenu d’une couche de bazar qui n’a de sens que dans leur propre éditeur. Elle dégage.",
    cleanNote:
      "La structure reste : un titre reste un titre, un tableau un tableau, une liste une liste. C’est la déco qui s’en va.",
    cleans: {
      scripts: "Balises <script>",
      handlers: "onclick et compagnie",
      styles: "Styles mso- en ligne",
      classes: "Classes mortes c1 / c17",
      tracking: "Paramètres de suivi des liens",
      office: "Balises propres à Office",
      semantics: "Gardé : la structure sémantique",
      entities: "Échappés : & < > et guillemets",
    },
    faqHeading: "Les questions qu’on nous pose",
    crossHeading: "Les autres conversions du site",
    startOver: "Recommencer",
    startOverNote: "Markdown en HTML, celui de la page d’accueil",
    footerLeft: "docs2html.com — un petit outil, fait par une seule personne",
    footerRight: "tourne dans votre navigateur · ne stocke rien · pas de mesure d’audience sans votre accord",
    langLabel: "Langue",
    footerLegal: "Les pages officielles",
    legalContactCue: "Quelque chose n’est pas clair, ou vous voulez qu’on change un point ?",
    legalUpdated: "En vigueur depuis le",
    consent: {
      text: "On peut compter votre visite avec Google Analytics ? Ça dépose des cookies, donc c’est coupé tant que vous ne dites pas oui. Vos fichiers n’en font jamais partie.",
      privacy: "Confidentialité",
      accept: "Accepter",
      decline: "Non merci",
      settings: "Réglages de mesure d’audience",
    },
    siblingHeading: "Vous allez dans l’autre sens ?",
    siblingNote:
      "DocsToMD, c’est le même outil à l’envers : Word, PDF, Excel et HTML vers Markdown. Même approche, même confidentialité, sortie inverse.",
    siblingCta: "docstomd.com",
    guide: {
      cta: "Ouvrir le convertisseur",
      pairedWith: "Outil",
      moreHeading: "Les autres guides",
    },
    features: [
      "Convertir du Markdown en HTML avec tableaux GFM et listes de tâches",
      "Convertir un .docx en HTML sémantique propre",
      "Nettoyer le HTML collé depuis Google Docs",
      "Convertir du texte brut en paragraphes HTML",
      "Convertir CSV et Excel en tableaux HTML",
      "Tout se passe dans le navigateur, sans envoi",
      "Sortie en fragment HTML ou en document complet",
    ],
  },
  converter: {
    dropTitle: "Déposez un fichier ici.",
    dropActive: "Lâchez.",
    dropHint:
      "Ou choisissez-le avec le bouton. Ou collez simplement avec Ctrl+V. Des dizaines d’un coup, pas de souci.",
    dropMeta: "25 Mo par fichier / tourne dans votre navigateur, rien n’est envoyé",
    elsewhereLead: "Autres formats :",
    pick: "Choisir un fichier",
    clear: "Vider",
    knobs: "Sortie",
    mode: "Sortie",
    modeFragment: "fragment",
    modeDocument: "page complète",
    modeHint:
      "Fragment : le balisage seul, à coller dans une page existante. Page complète : un fichier .html autonome avec charset, viewport et un style de base.",
    pretty: "Indentation",
    prettyOn: "lisible",
    prettyOff: "compacte",
    responsive: "CSS du tableau",
    responsiveOn: "inclure",
    responsiveOff: "aucun",
    linkify: "URL brutes",
    linkifyOn: "en faire des liens",
    linkifyOff: "laisser en texte",
    lineBreaks: "Retours à la ligne",
    lineBreaksOn: "garder en <br>",
    lineBreaksOff: "laisser le texte couler",
    header: "Ligne d’en-tête",
    headerFirstRow: "première ligne",
    headerNone: "aucune",
    delimiter: "Séparateur",
    delimiterAuto: "auto",
    delimiterComma: "virgule",
    delimiterSemicolon: "point-virgule",
    delimiterTab: "tabulation",
    delimiterPipe: "barre verticale",
    images: "Images",
    imageInline: "base64 intégré",
    imageExtract: "fichiers à part",
    imageStrip: "les supprimer",
    sheets: "Feuilles",
    sheetsAll: "tout sélectionner",
    sheetMeta: { one: "{n} ligne", other: "{n} lignes" },
    stale:
      "Un réglage a changé. Les autres résultats datent des anciens réglages : relancez-les pour l’appliquer.",
    queue: "File d’attente",
    zip: { one: "zipper {n} fichier", other: "zipper {n} fichiers" },
    chewing: "conversion…",
    failed: "échec",
    tooBig: "Plus de 25 Mo. Trop gros.",
    readFail: "Impossible de le lire. Le fichier est peut-être abîmé ou protégé par mot de passe.",
    wrongType: "Cette page ne prend pas les fichiers {ext}. Celle-ci, oui :",
    wrongTypeAmbiguous:
      "Cette page ne prend pas les fichiers {ext}. Un {ext} peut contenir l’un de ces formats, choisissez celui qui correspond au vôtre :",
    wrongTypeElsewhere:
      "Cette page ne prend pas les fichiers {ext}, et ce site non plus. DocsToMD, lui, s’en occupe.",
    wrongTypeNowhere:
      "Cette page ne prend pas les fichiers {ext}. Ce site convertit des documents, des tableurs et du texte, pas des {ext}.",
    pastedName: "contenu collé",
    typedName: "texte collé",
    pasteHeading: "Ou collez-le ici",
    pastePlaceholderMarkdown:
      "# Collez votre Markdown ici\n\nLes tableaux, les listes de tâches et le ~~barré~~ fonctionnent.\n\n| outil | sortie |\n| --- | --- |\n| cette page | HTML |",
    pastePlaceholderHtml:
      '<div class="c1"><b style="font-weight:normal">Collez le code HTML ici.</b></div>\n<p>Le bazar de Google Docs, les styles mso- et les paramètres de suivi sont nettoyés.</p>',
    pastePlaceholderText:
      "Collez du texte brut ici.\n\nUne ligne vide commence un nouveau paragraphe. Les URL brutes comme https://example.com deviennent des liens, sauf si vous désactivez l’option.",
    pastePlaceholderCsv:
      "nom,métier,ville\nAda,ingénieure,Londres\nGrace,amirale,Arlington",
    pasteRun: "Convertir",
    pasteClear: "Vider",
    pasteRichHint:
      "Sélectionnez le contenu dans votre document et copiez-le, pas le lien de partage. Puis collez ici, ou faites Ctrl+V n’importe où sur cette page.",
    source: "code",
    preview: "aperçu",
    previewNote:
      "L’aperçu tourne dans un cadre en sandbox, scripts désactivés. C’est voulu, pas un bug.",
    copy: "Copier",
    copied: "copié",
    download: "Télécharger le .html",
    downloadZip: "HTML + images",
    legacyWarn: "Ancien format .doc : on a lu ce qu’on a pu",
    styleWarn: {
      one: "{n} chose à savoir sur cette conversion",
      other: "{n} choses à savoir sur cette conversion",
    },
    emptyDoc: "(rien n’est sorti)",
    pickOne: "Choisissez un fichier à gauche pour voir le résultat.",
    chewingFirst: "Conversion du premier…",
    units: {
      words: { one: "{n} mot", other: "{n} mots" },
      headings: { one: "{n} titre", other: "{n} titres" },
      tables: { one: "{n} tableau", other: "{n} tableaux" },
      images: { one: "{n} image", other: "{n} images" },
      links: { one: "{n} lien", other: "{n} liens" },
      bytes: "taille",
    },
  },
  pages: {
    home: {
      short: "Accueil",
      eyebrow: "Markdown → HTML",
      title: "Convertir Markdown en HTML gratuit et privé — Docs 2 HTML",
      description:
        "Collez du Markdown, récupérez du HTML propre, tableaux GFM et listes de tâches compris. Fragment pour votre CMS ou page complète. Rien n’est envoyé.",
      keywords: [
        "docs 2 html",
        "convertir markdown en html",
        "markdown en html",
        "convertisseur markdown html",
        "md en html",
        "conversion md en html",
      ],
      h1: ["Convertir Markdown en HTML", "Du Markdown en entrée. Du HTML propre en sortie."],
      lede: [
        "Collez, et le HTML apparaît sous vos yeux. Pas de bouton, pas d’attente, pas d’envoi.",
        "Prenez un fragment pour votre CMS, ou une page complète à ouvrir direct depuis votre bureau.",
      ],
      note: {
        heading: "En bref",
        items: [
          "CommonMark, plus les tableaux, listes de tâches et barré de GFM",
          "Fragment ou document complet, à vous de voir",
          "Marche même wifi coupé",
        ],
      },
      body: {
        stepsHeading: "Comment ça marche",
        steps: [
          "Collez votre Markdown dans la zone, ou déposez un fichier .md au-dessus. Dans les deux cas, c’est votre navigateur qui le lit.",
          "Il est analysé par markdown-it, puis passé dans DOMPurify. Pourquoi ? Le Markdown accepte du HTML brut, et un Markdown récupéré ailleurs n’est pas sûr d’office.",
          "Basculez entre le code et un aperçu en sandbox, puis copiez le HTML ou téléchargez le fichier .html.",
        ],
        supportedHeading: "Ce qui marche",
        supported: [
          "CommonMark au complet : titres, paragraphes, listes, liens, images, citations, blocs de code",
          "Les extras de GitHub : tableaux à barres verticales, cases de listes de tâches et ~~barré~~",
          "Le HTML brut dans votre Markdown, nettoyé plutôt que supprimé",
          "Les URL brutes transformées en liens, option désactivable",
          "Sortie en fragment sans enveloppe, ou page complète avec charset, viewport et titre",
        ],
        limitsHeading: "Ce qu’il ne fait pas",
        limits: [
          "Pas de coloration syntaxique dans les blocs de code : vous obtenez un <pre><code> propre, à styler vous-même",
          "Notes de bas de page, listes de définitions et autres extensions non standard ne sont pas analysées",
          "Le front matter en haut du fichier est traité comme du texte, pas comme des métadonnées",
          "Les scripts dans le HTML brut de votre Markdown sont supprimés, pas conservés",
          "Les autres formats ont leur propre page : DOCX, Google Docs, texte brut, CSV et Excel",
        ],
      },
      faq: [
        PRIVACY,
        MODES,
        {
          q: "C’est quelle variante de Markdown ?",
          a: "CommonMark comme base, plus les trois extensions GitHub que les gens utilisent vraiment : tableaux à barres verticales, listes de tâches et barré. Si ça s’affiche sur GitHub, ça s’affiche très probablement pareil ici.",
        },
        {
          q: "Je peux mettre du HTML brut dans mon Markdown ?",
          a: "Oui, et il passe, après nettoyage. Un <div> ou un <span class=\"note\"> survit, un <script> non. C’est le bon compromis : le Markdown d’un collègue ou d’un CMS est une entrée non fiable comme une autre.",
        },
        PRETTY,
        {
          q: "Les blocs de code sont-ils colorés ?",
          a: "Non. Vous obtenez <pre><code class=\"language-js\">, le point d’accroche standard que lit n’importe quel outil de coloration. En ajouter une ici voudrait dire livrer un jeu de couleurs qui se battrait avec celui de votre site.",
        },
      ],
    },
    "markdown-to-html": {
      short: "MD → HTML",
      eyebrow: "Markdown → HTML",
      title: "Markdown en HTML : convertisseur gratuit, tableaux GFM",
      description:
        "Convertissez du Markdown en HTML : CommonMark complet, tableaux, listes de tâches et barré GitHub. Aperçu en sandbox, rien ne quitte votre navigateur.",
      keywords: [
        "markdown en html",
        "convertir markdown en html",
        "convertisseur markdown html",
        "md en html",
        "convertir md en html",
        "markdown html table",
        "gfm en html",
      ],
      h1: ["Markdown en HTML, version GFM", "Tableaux et listes de tâches compris."],
      lede: [
        "Toute la spec CommonMark, plus les extensions GitHub qui vous manqueraient si elles n’étaient pas là.",
        "Vérifiez le rendu dans un cadre en sandbox, puis copiez le code ou téléchargez le fichier.",
      ],
      note: {
        heading: "Ce que vous obtenez",
        items: [
          "De vraies balises <table>, avec <thead> et attributs scope",
          "Les listes de tâches en cases désactivées, pas en crochets bruts",
          "Une sortie indentée et lisible, que vous pouvez commiter sans honte",
        ],
      },
      body: {
        stepsHeading: "Comment ça marche",
        steps: [
          "Collez le Markdown dans la zone, ou déposez un fichier .md, .markdown ou .txt dans le cadre au-dessus.",
          "markdown-it l’analyse selon les règles CommonMark, avec les extensions tableaux, barré et listes de tâches. Le résultat passe par DOMPurify avant de vous arriver.",
          "Choisissez fragment ou page complète, réglez l’indentation, puis copiez le HTML ou téléchargez-le.",
        ],
        supportedHeading: "Ce qui marche",
        supported: [
          "Tout CommonMark : titres ATX et setext, listes imbriquées, liens de référence, code délimité et indenté",
          "Les tableaux GFM à barres verticales, rendus en <table><thead><th scope=\"col\">",
          "Les listes de tâches, rendues en cases désactivées avec une classe .task-list-item à styler",
          "Le barré, et les URL brutes transformées en liens, avec une option pour l’éviter",
          "Les blocs HTML bruts et le HTML en ligne, nettoyés au passage",
          "Les retours à la ligne simples gardés en <br>, ou fondus dans le texte, comme vous voulez",
        ],
        limitsHeading: "Ce qu’il ne fait pas",
        limits: [
          "Pas de coloration syntaxique : la classe de langage est écrite, les couleurs sont pour vous",
          "Notes de bas de page, listes de définitions, abréviations et directives de conteneur ne sont pas analysées",
          "Le front matter YAML n’est ni retiré ni lu : supprimez-le avant si vous n’en voulez pas dans la sortie",
          "Les maths ($...$ ou \\[...\\]) passent en texte littéral",
          "Les fichiers de plus de 25 Mo",
        ],
      },
      faq: [
        {
          q: "Les tableaux GitHub sont-ils pris en charge ?",
          a: "Oui, et ils sortent avec un vrai balisage : un <thead> avec des cellules <th scope=\"col\">, un <tbody> pour le reste, et l’alignement reporté en text-align en ligne. Un lecteur d’écran lit le résultat comme un tableau, ce qu’il ne peut pas faire avec une grille bricolée en div.",
        },
        {
          q: "Que deviennent les listes de tâches ?",
          a: "- [ ] et - [x] deviennent de vraies cases désactivées dans l’élément de liste, et l’élément reçoit une classe task-list-item pour masquer la puce par défaut. Désactivées, parce qu’une case HTML sur une page statique qui a l’air cliquable mais n’enregistre rien, c’est pire que pas de case du tout.",
        },
        MODES,
        PRETTY,
        {
          q: "Je peux convertir plusieurs fichiers d’un coup ?",
          a: "Oui. Déposez tout un dossier de fichiers .md et ils se mettent en file d’attente. Téléchargez-les un par un ou tous ensemble dans un zip. Pratique pour passer un dossier de doc dans un template.",
        },
        PRIVACY,
      ],
    },
    "markdown-to-pdf": {
      short: "MD → PDF",
      eyebrow: "Markdown → PDF",
      title: "Convertir Markdown en PDF gratuit — vrai texte, vraies pages",
      description:
        "Transformez du Markdown en PDF via la boîte d’impression du navigateur : texte sélectionnable, tableaux entiers, titres jamais isolés. Rien n’est envoyé.",
      keywords: [
        "markdown en pdf",
        "convertir markdown en pdf",
        "convertir markdown en pdf gratuit",
        "transformer markdown en pdf",
        "convertisseur markdown en pdf",
        "md en pdf",
        "convertir md en pdf",
      ],
      h1: ["Convertir Markdown en PDF", "Imprimez, enregistrez, envoyez."],
      lede: [
        "Collez ou déposez votre Markdown, vérifiez l’aperçu, puis imprimez-le en PDF. Ce qui sort, c’est du texte qu’on peut sélectionner et chercher, pas une photo de page.",
        "Pas de compte, pas d’envoi, pas de filigrane : toute la mise en page se fait dans votre onglet.",
      ],
      print: {
        button: "Imprimer / Enregistrer en PDF",
        hint: "Ouvre la boîte d’impression de votre navigateur : choisissez « Enregistrer au format PDF » comme destination. Format du papier, marges et numéros de page se règlent là.",
      },
      note: {
        heading: "Ce que vous obtenez",
        items: [
          "Du texte sélectionnable, de vraies polices, des liens qui marchent encore",
          "A4 avec marges de 18 mm, jamais de titre abandonné en bas de page",
          "Tableaux et blocs de code gardés entiers au lieu d’être coupés en deux",
        ],
      },
      body: {
        stepsHeading: "Comment ça marche",
        steps: [
          "Collez le Markdown dans la zone, ou déposez-y un fichier .md.",
          "L’aperçu à droite, c’est la page imprimée : même largeur, mêmes caractères, mêmes sauts de page.",
          "Cliquez sur le bouton et choisissez « Enregistrer au format PDF » dans la boîte d’impression. Ce fichier, c’est le résultat.",
        ],
        supportedHeading: "Ce qui marche",
        supported: [
          "Titres, paragraphes, listes numérotées ou à puces, citations, filets",
          "Tableaux GFM à barres verticales avec bordures et ligne d’en-tête grisée, à la taille de la page",
          "Blocs de code en police à chasse fixe, renvoyés à la ligne au lieu de déborder",
          "Images distantes ou intégrées ; les liens restent cliquables dans le PDF",
        ],
        limitsHeading: "Ce qu’il ne fait pas",
        limits: [
          "Pas de PDF/A, pas de signature numérique, pas d’édition des métadonnées : c’est votre navigateur qui écrit le fichier",
          "Numéros de page et en-têtes viennent de la boîte d’impression, pas de cette page",
          "Le format du papier suit vos réglages d’impression ; la mise en page est pensée pour l’A4 portrait",
          "Un tableau plus large que la page est réduit, pas découpé en colonnes",
          "Les fichiers de plus de 25 Mo",
        ],
      },
      faq: [
        {
          q: "Où se retrouve le PDF ?",
          a: "Dans la boîte d’impression de votre navigateur, comme destination. Chrome et Edge l’appellent « Enregistrer au format PDF », Safari le range sous « PDF », Firefox dit « Imprimer dans un fichier ». Sélectionnez-le, cliquez sur Enregistrer, puis choisissez le dossier.",
        },
        {
          q: "Pourquoi passer par l’impression plutôt qu’un téléchargement direct ?",
          a: "Parce que le moteur d’impression du navigateur compose mieux le texte que n’importe quelle bibliothèque PDF en JavaScript qu’on pourrait embarquer : vraies polices, sauts de page aux bons endroits, texte sélectionnable, et tout ça sans alourdir la page de plusieurs mégaoctets. Le fichier obtenu est le même que si vous imprimiez sur papier.",
        },
        {
          q: "Je peux ajouter des numéros de page ou un en-tête ?",
          a: "Oui, depuis la boîte d’impression. Tous les navigateurs de bureau ont une option « En-têtes et pieds de page » qui ajoute le titre, l’URL et le numéro de page, en respectant les marges réglées à cet endroit. On ne dessine pas les nôtres, parce qu’ils ignoreraient ces réglages.",
        },
        {
          q: "Ça marche hors ligne ?",
          a: "Oui, une fois la page chargée. La conversion, l’aperçu et le document à imprimer sont tous construits dans l’onglet, donc le Markdown ne part nulle part.",
        },
        PRIVACY,
      ],
    },
    "docx-to-html": {
      short: "DOCX → HTML",
      eyebrow: "DOCX → HTML",
      title: "Convertir Word en HTML gratuit — DOCX en HTML propre",
      description:
        "Convertissez un document Word (.docx) en HTML propre, dans votre navigateur. Styles mso- et classes en trop supprimés. Images en base64 ou dans un zip.",
      keywords: [
        "convertir word en html",
        "convertir word en html gratuit",
        "convertisseur word en html",
        "transformer word en html",
        "word en html",
        "conversion word en html",
        "docx en html",
        "convertir docx en html",
        "doc en html",
      ],
      h1: ["Convertir Word en HTML", "Du DOCX en entrée, du balisage propre en sortie."],
      lede: [
        "« Enregistrer en tant que page web » produit des milliers de lignes de styles mso-. Ici, vous obtenez le balisage que vous auriez écrit à la main.",
        "Les titres deviennent des <h2>, les tableaux des <table>, et rien de propre à Microsoft ne survit.",
      ],
      note: {
        heading: "Ce que vous obtenez",
        items: [
          "Des balises sémantiques, sans <o:p> ni style=\"mso-...\"",
          "Les images intégrées, ou en fichiers séparés dans un zip",
          "Les vieux .doc marchent aussi, pas besoin de « Enregistrer sous »",
        ],
      },
      body: {
        stepsHeading: "Comment ça marche",
        steps: [
          "Déposez un .docx dans le cadre au-dessus, ou cliquez pour en choisir un. Des dizaines d’un coup, pas de souci.",
          "Mammoth lit la structure du document (vrais niveaux de titre, vrais tableaux, vraies listes) et en tire du HTML. Ce HTML passe ensuite par DOMPurify, car la doc de Mammoth dit clairement que sa sortie n’est pas nettoyée.",
          "Choisissez quoi faire des images, puis copiez le HTML, téléchargez le fichier, ou prenez un zip avec les images à côté.",
        ],
        supportedHeading: "Ce qui marche",
        supported: [
          "Tous les .docx écrits par Word depuis 2007, plus Word Online et Word pour Mac",
          "Les vieux .doc de Word 97–2003, détectés par l’en-tête du fichier plutôt que par l’extension",
          "Les niveaux de titre en <h1>–<h6>, tirés des styles Word au lieu d’être devinés d’après la taille de police",
          "Tableaux en <table>, listes en <ul>/<ol> avec une vraie imbrication, liens, gras, italique, barré",
          "Citations, paragraphes au style code en <pre><code>, et légendes en <p class=\"caption\">",
          "Images intégrées : en base64 dans le fichier, extraites dans un dossier images/ pour le zip, ou supprimées",
        ],
        limitsHeading: "Ce qu’il ne fait pas",
        limits: [
          "La mise en forme visuelle de Word (polices, couleurs, espacements exacts) n’est volontairement pas reprise",
          "Les cellules fusionnées perdent leur colspan et rowspan ; chaque cellule devient son propre <td>",
          "Le suivi des modifications et les commentaires sont supprimés : vous avez le texte final, pas l’historique",
          "Zones de texte, SmartArt et graphiques ne survivent pas, à part leur texte s’il y en a",
          "Les images ne sortent pas des vieux .doc : ce format les cache là où un navigateur ne peut pas aller",
          "Les documents chiffrés sont refusés plutôt qu’à moitié lus",
        ],
      },
      faq: [
        {
          q: "Quelle différence avec « Enregistrer en tant que page web » de Word ?",
          a: "L’export de Word cherche à rendre la page identique dans un navigateur. Il écrit donc un énorme bloc de CSS, un attribut de style mso- sur presque chaque élément, des classes comme MsoNormal et des balises propres à Office comme <o:p>. Ici, c’est l’inverse : on lit la structure et on jette la présentation. Vous obtenez quelques dizaines de lignes de HTML sémantique au lieu de quelques milliers de lignes impossibles à modifier.",
        },
        {
          q: "Que deviennent mes images ?",
          a: "Trois choix. Le base64 intégré met tout dans un seul fichier autonome : pratique, et environ un tiers plus lourd que l’image brute. Les fichiers séparés vous donnent un zip : le HTML plus un dossier images/, avec des balises <img> qui pointent déjà vers les bons chemins. Ou vous les supprimez, si seul le texte vous intéresse.",
        },
        SAFETY,
        {
          q: "Les vieux fichiers .doc marchent ?",
          a: "Oui. Le .doc est un format binaire OLE d’avant 2007 : il est lu octet par octet dans votre navigateur, puis passe par la même étape de sortie. Vous récupérez le texte, les titres, les tableaux, le gras et l’italique. Deux choses ne se récupèrent pas dans ce format : les images et la numérotation exacte des listes. Si vous avez Word sous la main, un « Enregistrer sous » en .docx donne un résultat plus propre.",
        },
        MODES,
        {
          q: "Pourquoi mes cellules fusionnées se sont-elles séparées ?",
          a: "Parce que colspan et rowspan ne sont pas repris dans cette version. Une cellule fusionnée devient une cellule normale et ses voisines sortent vides. Le tableau reste du HTML valide et lisible, simplement pas disposé comme dans Word. Ajouter un colspan à la main après coup, c’est en général une ligne à modifier.",
        },
      ],
    },
    "google-docs-to-html": {
      short: "Google Docs → HTML",
      eyebrow: "Google Docs → HTML",
      title: "Google Docs en HTML — code nettoyé, gratuit, sans connexion",
      description:
        "Collez depuis Google Docs, récupérez du HTML propre. Classes c1/c17, enveloppe <b> font-weight:normal et redirections Google : tout part. Sans connexion.",
      keywords: [
        "google docs en html",
        "google docs html",
        "google doc code html",
        "convertir google docs en html",
        "exporter google docs en html",
        "google docs html propre",
      ],
      h1: ["Google Docs en HTML", "Sans la soupe de classes."],
      lede: [
        "Copier depuis un Doc vous donne du HTML truffé de noms de classes qui renvoient à une feuille de style que vous n’avez pas.",
        "Collez-le ici, et il ne reste que le document : titres, listes, tableaux, liens.",
      ],
      note: {
        heading: "Comment le faire entrer",
        items: [
          "Sélectionnez le contenu dans votre Doc et copiez-le, pas le lien de partage",
          "Collez ci-dessous, ou faites Ctrl+V n’importe où sur cette page",
          "Pas d’OAuth, pas d’autorisations, pas de module complémentaire",
        ],
      },
      body: {
        stepsHeading: "Comment ça marche",
        steps: [
          "Ouvrez votre Doc, sélectionnez le contenu, copiez. Puis collez dans la zone ci-dessous ou faites Ctrl+V n’importe où sur la page. Votre navigateur met une version en texte enrichi dans le presse-papiers, et c’est elle qui est lue.",
          "Elle passe d’abord par DOMPurify, car le HTML du presse-papiers peut venir de n’importe quelle page web. Ensuite, le bazar propre à Google s’en va : les classes c1/c17, l’enveloppe <b style=\"font-weight:normal\"> que Docs met autour de tout, les id docs-internal-guid, et la redirection google.com/url?q= autour de chaque lien.",
          "Vérifiez l’aperçu en sandbox, puis copiez le HTML ou téléchargez-le en fichier.",
        ],
        supportedHeading: "Ce qui marche",
        supported: [
          "Le texte enrichi collé directement depuis Google Docs, Word Online, Notion ou n’importe quel éditeur web",
          "Le code HTML collé en texte, et les fichiers .html enregistrés",
          "Titres, paragraphes, listes avec une vraie imbrication, tableaux, liens, gras, italique, barré",
          "Le retrait de l’enveloppe <b style=\"font-weight:normal\"> inutile dont Docs entoure tout le document",
          "Le retrait des redirections google.com/url?q= pour retrouver l’URL que vous aviez vraiment mise",
          "La suppression des paramètres utm_ et autres paramètres de suivi dans les liens du document",
        ],
        limitsHeading: "Ce qu’il ne fait pas",
        limits: [
          "Aucune connexion à votre compte Google : rien ici ne peut voir votre Drive",
          "Le collage n’emporte pas les images : le presse-papiers ne fait que pointer vers les serveurs de Google",
          "Commentaires et suggestions sont supprimés ; réglez-les avant de copier",
          "Graphiques, dessins et chips intelligents arrivent au mieux en texte brut",
          "Copier le lien de partage au lieu du contenu vous donne un lien, et il n’y a rien d’autre à convertir",
          "Les choix de polices et de couleurs de Google partent avec le reste de la mise en forme",
        ],
      },
      faq: [
        {
          q: "Pourquoi le HTML de Google Docs est-il un tel bazar ?",
          a: "Parce qu’il n’a jamais été fait pour être lu par vous. Docs écrit une feuille de style pleine de règles comme .c1 et .c17, puis colle la classe correspondante sur chaque élément. Copiez le contenu, et les classes suivent alors que la feuille de style reste là-bas. Résultat : un balisage couvert de noms de classes qui ne veulent plus rien dire. Par-dessus, un <b style=\"font-weight:normal\"> enveloppe tout le document sans rien changer à la mise en forme, et chaque lien est réécrit pour passer par google.com/url?q=.",
        },
        {
          q: "Faut-il installer un module ou se connecter ?",
          a: "Non, et il n’y a rien où se connecter. Cette page lit votre presse-papiers quand vous collez, ce que votre navigateur fait pour n’importe quelle page. Demander l’accès au Drive, ce serait réclamer des droits sur tous vos fichiers et faire tourner un serveur pour garder un jeton. Un copier-coller vous coûte deux secondes et ne nous donne rien.",
        },
        {
          q: "Où sont passées mes images ?",
          a: "Elles ne sont pas passées, et elles ne peuvent pas. Quand vous copiez depuis un Doc, le HTML du presse-papiers pointe vers des URL d’images sur les serveurs de Google au lieu de contenir les images. Ces liens ont besoin de votre session pour s’afficher, donc ils seraient cassés pour tout le monde. Si vous avez besoin des images, faites Fichier → Télécharger → Microsoft Word (.docx) et passez ce fichier sur la page DOCX.",
        },
        SAFETY,
        {
          q: "Ça marche avec Notion, Word Online ou Confluence ?",
          a: "Oui. Le nettoyage propre à Google est la partie la plus agressive, mais le reste du travail (nettoyage de sécurité, retrait des enveloppes inutiles, suppression des classes mortes et des paramètres de suivi) s’applique à tout ce que vous collez. Le texte enrichi de n’importe quel éditeur web vaut la peine d’être essayé ici.",
        },
        MODES,
      ],
    },
    "text-to-html": {
      short: "Texte → HTML",
      eyebrow: "Texte brut → HTML",
      title: "Convertir texte en HTML — paragraphes, sauts de ligne, entités",
      description:
        "Transformez du texte brut en paragraphes HTML. Lignes vides en <p>, URL en liens et sauts de ligne en <br> au choix, &, < et > bien échappés.",
      keywords: [
        "convertir texte en html",
        "texte en html",
        "convertir texte en html gratuit",
        "convertir txt en html",
        "txt en html",
        "texte brut en html",
      ],
      h1: ["Convertir texte en HTML", "Des paragraphes, comme il faut."],
      lede: [
        "Une ligne vide ouvre un nouveau <p>. Les URL brutes deviennent des liens si vous le voulez. Les chevrons sont échappés, donc le texte reste du texte.",
        "L’outil le plus simple du site, et celui que les gens refont le plus souvent à la main.",
      ],
      note: {
        heading: "Bon à savoir",
        items: [
          "Une ligne vide = un nouveau paragraphe",
          "URL et adresses e-mail en liens, ou laissées telles quelles",
          "&, < et > échappés pour que rien ne disparaisse",
        ],
      },
      body: {
        stepsHeading: "Comment ça marche",
        steps: [
          "Collez votre texte dans la zone, ou déposez un fichier .txt au-dessus. Fins de ligne Windows, Mac et Unix sont traitées pareil.",
          "Les lignes vides découpent le texte en paragraphes. Dans un paragraphe, un retour à la ligne simple devient un <br> ou se fond dans le texte, à vous de choisir. Les caractères spéciaux du HTML sont échappés au passage.",
          "Activez ou non la détection des URL, choisissez fragment ou page complète, puis copiez le HTML ou téléchargez le fichier.",
        ],
        supportedHeading: "Ce qui marche",
        supported: [
          "Découpage en paragraphes sur les lignes vides, plusieurs lignes vides d’affilée comptant pour une seule coupure",
          "Retours à la ligne simples gardés en <br>, ou fondus sur une seule ligne",
          "URL en http:// et https://, plus les adresses www. seules, transformées en liens",
          "Adresses e-mail transformées en liens mailto:",
          "&, <, > et guillemets échappés, donc un <b> littéral dans votre texte reste visible en texte",
          "Fins de ligne CRLF, CR et LF, et marque d’ordre des octets (BOM) en début de fichier",
        ],
        limitsHeading: "Ce qu’il ne fait pas",
        limits: [
          "Pas d’analyse Markdown : **gras** reste avec ses astérisques. Pour ça, utilisez la page Markdown.",
          "L’indentation n’est pas lue comme une structure : un bloc indenté par tabulation ne devient ni une liste ni un bloc de code",
          "Il ne devine pas les titres : une ligne courte en majuscules reste un paragraphe",
          "Les tableaux alignés avec des espaces restent du texte ; pour de vrais tableaux, passez par la page CSV",
          "Les fichiers de plus de 25 Mo",
        ],
      },
      faq: [
        {
          q: "Comment il décide où sont les paragraphes ?",
          a: "Avec une ligne vide. C’est la seule convention que tout le monde suit déjà en texte brut, et elle ne demande aucune devinette. Plusieurs lignes vides d’affilée comptent pour une seule coupure. Si votre texte n’a aucune ligne vide, vous aurez un seul long paragraphe, et on vous le dira au lieu de vous laisser deviner.",
        },
        {
          q: "Et si je ne veux pas que mes URL deviennent des liens ?",
          a: "Désactivez le réglage URL brutes et elles restent en texte. Utile quand vous parlez d’URL au lieu d’y renvoyer : un tutoriel, un journal d’erreurs, un fichier de config.",
        },
        {
          q: "Pourquoi mon <b> s’affiche en texte au lieu de mettre en gras ?",
          a: "Parce que c’est le principe du texte brut vers HTML. Votre entrée est du texte, donc un <b> littéral, c’est trois caractères visibles, qui sortent en &lt;b&gt;. Si vous voulez que les balises marchent, votre entrée n’est pas du texte brut : essayez la page Markdown, ou la page Google Docs si vous collez du texte enrichi.",
        },
        {
          q: "À quoi sert l’option <br> ?",
          a: "Poèmes, adresses, sorties de logs : tout ce où les retours à la ligne font partie du sens. Coupez-la pour de la prose coupée en dur à 80 colonnes, où vous voulez que le navigateur la remette en forme selon la fenêtre du lecteur.",
        },
        MODES,
        PRIVACY,
      ],
    },
    "csv-to-html-table": {
      short: "CSV → tableau",
      eyebrow: "CSV → tableau HTML",
      title: "Convertir CSV en HTML : tableau HTML gratuit en ligne",
      description:
        "Convertissez un CSV en tableau HTML : collez les lignes ou déposez un fichier. Virgule, point-virgule et tabulation détectés, 1re ligne en vrai <thead>.",
      keywords: [
        "convertir csv en html",
        "csv en html",
        "csv en tableau html",
        "csv html table",
        "convertir csv en tableau",
        "tableau html depuis un csv",
        "tsv en tableau html",
      ],
      h1: ["CSV en tableau HTML", "Sémantique, pas une grille de div."],
      lede: [
        "Pour convertir un CSV en HTML, collez les lignes ou déposez un fichier. La première ligne devient un vrai <thead> avec attributs scope, pour qu’un lecteur d’écran lise le tableau comme un tableau.",
        "Virgules entre guillemets, retours à la ligne dans les cellules et exports européens au point-virgule : tout est géré.",
      ],
      note: {
        heading: "Bon à savoir",
        items: [
          "Séparateur lu dans le fichier, modifiable",
          "<thead> et <th scope=\"col\">, pas des div stylées",
          "CSS responsive en option pour les petits écrans",
        ],
      },
      body: {
        stepsHeading: "Comment ça marche",
        steps: [
          "Déposez un .csv ou un .tsv au-dessus, ou collez les lignes directement dans la zone. Rien ne quitte l’onglet.",
          "Le séparateur est déduit du fichier (virgule, point-virgule, tabulation ou barre verticale) et indiqué au-dessus du résultat. Changez-le si la déduction est fausse.",
          "Choisissez si la première ligne est un en-tête et s’il faut inclure le CSS responsive, puis copiez le HTML ou téléchargez le fichier.",
        ],
        supportedHeading: "Ce qui marche",
        supported: [
          "N’importe quel séparateur utilisé par l’export, déduit du fichier ou réglé à la main",
          "Champs entre guillemets gardés entiers ; un retour à la ligne dans une cellule devient un <br> au lieu de casser la ligne",
          "Les exports allemands, français et espagnols, où le séparateur est un point-virgule parce que la virgule sert de séparateur décimal",
          "Première ligne en <thead> avec <th scope=\"col\">, ou pas d’en-tête du tout",
          "Une marque d’ordre des octets (BOM) en tête, retirée pour qu’elle ne finisse pas dans votre premier <th>",
          "Les lignes trop courtes complétées par des <td> vides, pour que chaque ligne ait le même nombre de cellules",
        ],
        limitsHeading: "Ce qu’il ne fait pas",
        limits: [
          "UTF-8 en entrée et en sortie, ce que déclare le meta charset ; d’autres encodages peuvent arriver illisibles",
          "25 Mo de texte et 100 000 cellules d’un coup",
          "Le texte des cellules est échappé, jamais reformaté : 007 arrive dans le <td> en 007",
          "Pas de tri, de filtre ni de totaux : il convertit, il ne calcule pas",
          "Pas de JavaScript dans la sortie, donc le tableau n’est pas interactif",
          "Des guillemets mal fermés font échouer n’importe quel lecteur CSV, et des cellules peuvent atterrir dans la mauvaise colonne",
        ],
      },
      faq: [
        {
          q: "Pourquoi un <table> plutôt que des div en CSS grid ?",
          a: "Parce que des données en tableau, c’est exactement ce à quoi sert l’élément table. Un lecteur d’écran annonce ses dimensions, permet d’avancer cellule par cellule et lit l’en-tête de colonne avec chaque cellule. Une grille de div ne fait rien de tout ça. Les moteurs de recherche le lisent aussi comme des données. Le style n’est pas une raison d’y renoncer.",
        },
        {
          q: "Que fait vraiment le CSS responsive ?",
          a: "Très peu, exprès. Il met le tableau dans une div qui défile à l’horizontale quand il est trop large, et règle border-collapse plus des marges internes et bordures discrètes. C’est le minimum pour qu’un tableau soit utilisable sur téléphone. Tout le reste est laissé à votre feuille de style. Désactivez-le et vous obtenez le <table> nu.",
        },
        {
          q: "Mon export utilise des points-virgules. Ça va marcher ?",
          a: "Oui. Partout où la virgule sert de séparateur décimal, un tableur exporte avec des points-virgules à la place. C’est lu dans le fichier et indiqué au-dessus du résultat. Changez-le si la déduction est fausse.",
        },
        {
          q: "Une cellule contient une virgule. Mes colonnes vont se décaler ?",
          a: "Non, du moment que le champ est entre guillemets, ce que fait tout générateur CSV correct. \"Smith, John\" arrive dans un seul <td>. Un retour à la ligne dans un champ entre guillemets est gardé aussi, sous forme de <br>, pour que la ligne ne se coupe pas en deux.",
        },
        {
          q: "Je peux juste afficher un CSV en tableau dans mon navigateur ?",
          a: "Oui. Passez en page complète et téléchargez le fichier. Double-cliquez dessus et le navigateur affiche vos lignes en vrai tableau, avec bordures, en-tête grisé et lignes alternées. Pas besoin de tableur, et le fichier s’ouvrira encore l’an prochain.",
        },
        {
          q: "Quelle option CSV choisir dans Excel ou Google Sheets ?",
          a: "Dans Excel, prenez « CSV UTF-8 (délimité par des virgules) ». L’option « CSV » simple enregistre dans un ancien encodage propre au système, et les accents ou le signe € peuvent sortir illisibles. Google Sheets exporte toujours en UTF-8 : Fichier → Télécharger → Valeurs séparées par des virgules. Vous avez déjà le .xlsx ? Sautez l’étape CSV et utilisez la page Excel.",
        },
        {
          q: "Comment mettre le tableau sur une page WordPress ou dans un CMS ?",
          a: "Laissez sur Fragment et copiez le HTML. Dans WordPress, ajoutez un bloc HTML personnalisé et collez-le dedans. La plupart des autres éditeurs ont une vue HTML ou code source qui fait le même travail. Avec le CSS responsive activé, le tableau est dans une div .table-wrap : ajoutez cette règle à votre thème, sinon l’enveloppe ne sert à rien.",
        },
        PRIVACY,
        MODES,
      ],
    },
    "excel-to-html-table": {
      short: "Excel → tableau",
      eyebrow: "Excel → tableau HTML",
      title: "Excel en HTML : convertir un tableau Excel en HTML, gratuit",
      description:
        "Transformez un classeur .xlsx en tableaux HTML sémantiques. Choisissez les feuilles et la ligne d’en-tête : vous avez les valeurs, pas les formules.",
      keywords: [
        "excel en html",
        "convertir excel en html",
        "transformer excel en html",
        "xlsx en html",
        "convertir tableau excel en html",
        "tableau excel en html",
        "fichier excel en html",
      ],
      h1: ["Excel en tableau HTML", "Les valeurs, pas les formules."],
      lede: [
        "Déposez un .xlsx, cochez les feuilles voulues, et récupérez un <table> propre pour chacune.",
        "Couleurs et polices restent volontairement de côté : un tableau qui apporte son propre style se bat avec chaque site où vous le collez.",
      ],
      note: {
        heading: "Bon à savoir",
        items: [
          "Toutes les feuilles listées, cochez celles que vous voulez",
          "Les valeurs telles qu’affichées, pas le texte des formules",
          "100 000 cellules par conversion",
        ],
      },
      body: {
        stepsHeading: "Comment ça marche",
        steps: [
          "Déposez un .xlsx au-dessus. Le classeur s’ouvre dans l’onglet et chaque nom de feuille apparaît sous forme de bouton.",
          "La première feuille est convertie tout de suite. Activez ou désactivez les autres : le classeur reste en mémoire, donc rien n’est lu deux fois.",
          "Indiquez si la ligne du haut sert d’en-tête et si vous voulez le CSS responsive. Ensuite, copiez le HTML ou récupérez le fichier.",
        ],
        supportedHeading: "Ce qui marche",
        supported: [
          "Tout ce qui enregistre en .xlsx : Excel 2007 et suivants, LibreOffice Calc, Numbers, Google Sheets",
          "Plusieurs feuilles, chacune devenant son propre tableau sous un <h2> qui porte le nom de la feuille",
          "La valeur qu’un lecteur verrait : un <td> reçoit 42, jamais =SUM(A1:A9)",
          "Les dates écrites en texte ISO au lieu du numéro de série façon 45000 qu’Excel garde en interne",
          "La ligne du haut en <thead> (cellules <th scope=\"col\">), ou aucun en-tête",
          "Un <caption> sur le tableau quand vous convertissez une seule feuille, lu en premier par les lecteurs d’écran",
        ],
        limitsHeading: "Ce qu’il ne fait pas",
        limits: [
          "Couleurs, polices, bordures et mise en forme conditionnelle ne sont pas reproduites : c’est voulu dans cette version",
          "Une plage fusionnée n’a ni colspan ni rowspan : elle redevient des <td> séparés",
          "Les formules ne sont pas reprises en tant que formules, et rien n’est recalculé",
          "L’ancien format binaire .xls d’avant 2007 est un format complètement différent, non pris en charge",
          "Graphiques, tableaux croisés dynamiques et images de la feuille ne sont pas exportés",
          "Un classeur chiffré ne peut pas être ouvert ici : enregistrez d’abord une copie non protégée",
          "Les sélections de plus de 100 000 cellules",
        ],
      },
      faq: [
        {
          q: "Pourquoi mes couleurs et polices ne sont pas reprises ?",
          a: "Parce qu’un tableau qui apporte ses propres couleurs perd neuf fois sur dix contre la feuille de style de votre site, et vous finissez par supprimer les styles en ligne à la main. Ce qui sert, c’est un <table> propre avec la bonne structure, stylé par la page où il atterrit. Si vous voulez exactement l’apparence d’origine, « Enregistrer en tant que page web » d’Excel vous la donnera, avec quelques milliers de lignes de balisage en prime.",
        },
        {
          q: "Le <td> contient la formule ou le résultat ?",
          a: "Le résultat. Un classeur garde à la fois la formule et sa dernière valeur calculée, et c’est la valeur qui a sa place sur une page web. Donc =SUM(A1:A9) est écrit 42.",
        },
        {
          q: "Une cellule avec formule est sortie vide. Pourquoi ?",
          a: "Parce que le fichier ne contenait aucune valeur en cache à lire. Excel en écrit une à chaque enregistrement, mais un classeur produit par un script et jamais ouvert dans Excel n’en a aucune. Ouvrez-le une fois, enregistrez, puis convertissez.",
        },
        {
          q: "Plusieurs feuilles peuvent aller dans un seul fichier ?",
          a: "Oui. Cochez autant de feuilles que vous voulez ; chacune sort en <table> séparé, avec au-dessus un <h2> qui porte son nom.",
        },
        {
          q: "Que deviennent les cellules fusionnées ?",
          a: "Elles se séparent. Chaque cellule de la plage devient son propre <td>, avec la valeur dans la première et les autres vides. Le HTML sait exprimer une fusion avec colspan et rowspan, mais les reconstruire correctement depuis un classeur, c’est pour une deuxième phase. Pour l’instant, la sortie assume d’être une simple grille.",
        },
        PRIVACY,
      ],
    },
  },
  legal: {
    about: {
      short: "À propos",
      eyebrow: "À propos du site",
      title: "À propos de Docs 2 HTML — qui le fait et pourquoi",
      description:
        "Docs 2 HTML est un convertisseur gratuit qui tourne dans le navigateur et transforme Markdown, Word, Google Docs, texte, CSV et Excel en HTML propre. Pas de compte, pas d’envoi, pas de mesure d’audience sans votre accord. Voici comment, et pourquoi.",
      h1: "Un petit outil, et ce qui l’explique",
      lede: [
        "Docs 2 HTML transforme des documents en HTML que vous oseriez signer. C’est tout le produit.",
        "Il est fait et entretenu par un développeur indépendant, et il tourne entièrement dans votre navigateur.",
      ],
      sections: [
        {
          heading: "Pourquoi il existe",
          body: [
            "Tous les outils d’écriture savent déjà exporter en HTML. C’est justement le problème. « Enregistrer en tant que page web » dans Word produit des milliers de lignes, avec un attribut de style mso- sur presque chaque élément. Google Docs vous donne des noms de classes comme c1 et c17 qui renvoient à une feuille de style que vous n’avez pas reçue. Les deux sont techniquement du HTML, et les deux sont inutilisables comme source d’une page web : impossible à lire, à modifier, ou à coller dans un template sans qu’ils se battent avec votre CSS.",
            "Ce que les gens veulent vraiment, c’est le balisage qu’ils auraient écrit à la main : un <h2> là où il y a un titre, un <table> là où il y a un tableau, et rien d’autre. Y arriver depuis un export officiel, c’est supprimer plus que ce qu’on garde. Du coup, la plupart le font à la main, ou abandonnent et collent le bazar tel quel.",
            "Ce site fait le ménage. Il lit la structure de votre document et en tire du HTML sémantique, en jetant la présentation au lieu d’essayer de la reproduire.",
          ],
        },
        {
          heading: "Pourquoi il tourne dans votre navigateur",
          body: [
            "La plupart des convertisseurs envoient votre fichier sur un serveur, le convertissent là-bas et vous rendent un téléchargement. C’est un choix raisonnable, et c’est aussi un choix où votre document reste un moment sur l’ordinateur de quelqu’un d’autre. Pour un brouillon de blog, ça va. Pour un contrat, un dossier médical, des chiffres internes ou un manuscrit pas encore publié, non.",
            "Donc la conversion tourne sur votre propre machine, en JavaScript, dans l’onglet que vous avez déjà ouvert. Il n’y a pas d’étape d’envoi parce qu’il n’y a nulle part où envoyer. Vous pouvez le vérifier : coupez votre connexion et convertissez quelque chose, ou regardez l’onglet Réseau de votre navigateur pendant que vous déposez un fichier.",
          ],
        },
        {
          heading: "Comment ça marche concrètement",
          body: [
            "Quand vous déposez un fichier, votre navigateur le lit en local et passe les octets à un analyseur qui tourne lui aussi dans votre navigateur. L’analyseur produit une structure, cette structure devient du HTML, et ce HTML est nettoyé avant même que vous le voyiez. Les analyseurs sont des bibliothèques open source, choisies format par format :",
          ],
          items: [
            "markdown-it analyse le Markdown, selon la spec CommonMark plus les tableaux, listes de tâches et barré de GitHub.",
            "Mammoth lit les .docx. Les vieux .doc sont lus par notre propre lecteur, octet par octet, car c’est un format binaire d’avant 2007 sans aucune bibliothèque qui tourne dans un navigateur.",
            "DOMPurify nettoie chaque morceau de HTML qui passe, y compris celui qu’on génère nous-mêmes, parce que le texte qu’il contient vient de votre document.",
            "Papa Parse lit les CSV et TSV ; read-excel-file lit les classeurs .xlsx.",
          ],
        },
        {
          heading: "À propos de la sécurité",
          body: [
            "Un outil qui produit du HTML a un devoir qu’un convertisseur Markdown n’a pas : ce qu’il vous donne peut finir collé sur un site en ligne, où il s’exécutera. Ici, le nettoyage n’est donc pas une fonctionnalité, c’est le minimum. Balises script, attributs de gestionnaires d’événements, URL javascript:, iframe, object et embed sont retirés de tout, et rien de non nettoyé n’est jamais inséré dans le DOM de cette page.",
            "L’aperçu est un sujet à part : il s’affiche dans un iframe en sandbox, scripts désactivés et origine opaque. Il ne peut donc pas atteindre cette page, ne peut rien lire et ne peut rien exécuter, même si le nettoyeur avait raté quelque chose. Deux murs indépendants, parce qu’un seul, c’est un point de défaillance unique.",
          ],
        },
        {
          heading: "Ce qu’il ne fait pas, exprès",
          body: [
            "Il n’y a pas de compte, parce qu’il n’y a rien à stocker. Pas d’API, parce qu’il n’y a pas de serveur à appeler. Pas de connexion à Google Drive, parce qu’il faudrait demander l’accès à tous vos fichiers et garder un jeton pour eux.",
            "Chaque conversion a aussi de vraies limites, et chaque page d’outil liste les siennes. Les cellules fusionnées se séparent. Les couleurs et polices d’Excel ne sont pas reproduites. Les images ne passent pas avec un collage depuis Google Docs. Tout ça est dit d’entrée, au lieu d’être découvert après avoir converti quelque chose d’important.",
          ],
        },
        {
          heading: "Comment il est financé",
          body: [
            "L’outil est gratuit et n’a pas de version payante. L’idée est de couvrir l’hébergement avec de la publicité, c’est pourquoi vous verrez peut-être des pubs sur ces pages à l’avenir. Elles ne seront jamais placées de façon à être confondues avec un bouton de téléchargement ou de conversion, et elles ne seront pas injectées après une conversion d’une manière qui ferait bouger la page sous votre curseur.",
            "La publicité ne change rien à la conversion. Vos fichiers restent sur votre machine dans tous les cas. Ce n’est pas une décision qu’on pourrait annuler pour gagner plus : c’est la conséquence du fait qu’il n’y a pas de serveur au départ.",
          ],
        },
        {
          heading: "Le site jumeau",
          body: [
            "DocsToMD fait le même travail dans l’autre sens : Word, PDF, HTML, CSV et Excel vers Markdown. Même approche, même confidentialité, format de sortie inverse. Si vous êtes arrivé ici en cherchant du Markdown, c’est celui-là qu’il vous faut.",
          ],
        },
      ],
    },
    contact: {
      short: "Contact",
      eyebrow: "Nous écrire",
      title: "Contacter Docs 2 HTML",
      description:
        "Écrivez-nous pour un fichier qui ne se convertit pas, un HTML qui sort mal, une traduction maladroite ou une fonction qui vous manque. Un seul développeur lit tout.",
      h1: "Écrivez-nous",
      lede: [
        "Une seule personne lit cette boîte mail, donc les réponses ne sont pas instantanées. Mais ce sont de vraies réponses, pas un numéro de ticket.",
        `E-mail : ${CONTACT_EMAIL}`,
      ],
      sections: [
        {
          heading: "Le HTML est sorti de travers",
          body: [
            "C’est le signalement le plus utile, et aussi le plus délicat, parce qu’on ne peut pas voir votre fichier. Alors décrivez-le au lieu de l’envoyer :",
          ],
          items: [
            "Sur quelle page vous étiez, et ce que vous avez donné en entrée : un .docx, un collage depuis Google Docs, un .csv",
            "Ce que vous attendiez en sortie et ce que vous avez eu : un tableau manquant, un titre sorti en paragraphe, un attribut qui aurait dû être retiré",
            "Le bout de HTML concerné, si vous pouvez le partager : quelques lignes suffisent en général",
            "Votre navigateur et votre système, car le presse-papiers et l’analyse ne se comportent pas pareil partout",
          ],
        },
        {
          heading: "Signaler une faille",
          body: [
            "Si vous avez trouvé une entrée qui produit du HTML contenant quelque chose d’exécutable (un gestionnaire d’événement qui survit, une URL javascript:, une balise qui aurait dû être retirée), écrivez-nous, et joignez l’entrée exacte qui le déclenche. C’est le seul type de bug ici qui pourrait faire du tort à quelqu’un en aval, et il passe avant tout le reste.",
            "Merci de le signaler en privé avant de le publier. Il n’y a pas de prime ; il y a une correction rapide et un vrai merci.",
          ],
        },
        {
          heading: "Merci de ne pas nous envoyer vos documents",
          body: [
            "Le principe de ce site, c’est que vos fichiers restent sur votre ordinateur. Nous en envoyer un par e-mail casse ça de votre côté, et nous met dans une position où on préfère ne pas être du nôtre. Si vous pouvez reproduire le problème avec un fichier sans importance (deux ou trois titres et un tableau tapés dans un nouveau document), c’est de toute façon plus utile, parce que ça isole le bug.",
            "Si un problème ne se reproduit vraiment pas sans le fichier d’origine, écrivez d’abord et on verra ensemble ce qu’il faut. En général, une description de la structure suffit, pas le contenu.",
          ],
        },
        {
          heading: "Traductions",
          body: [
            "Ce site existe en plusieurs langues. L’anglais est l’original et le reste a été traduit avec soin, mais un locuteur natif repérera toujours ce qu’une traduction soignée laisse passer : une phrase juste techniquement mais qui sonne bizarre, un terme que le monde du logiciel local dit autrement.",
            "Si vous en voyez une, dites-nous quelle langue et quelle page, et citez la phrase. Les petites corrections sont les bienvenues et sont appliquées vite.",
          ],
        },
        {
          heading: "Fonctionnalités, et ce qu’on ne fera pas",
          body: [
            "Les demandes de fonctionnalités sont lues et souvent réalisées, surtout les petites : un réglage pour un style de sortie, une variante de format, un séparateur qu’on ne détecte pas, un point d’accroche CSS dont vous avez besoin dans la sortie.",
            "Certaines choses sont hors champ par principe, et les demander n’y changera rien : envoyer les fichiers sur un serveur, une intégration Google Drive, des comptes utilisateur, ou reproduire exactement la mise en forme de Word et d’Excel. Ce dernier point n’est pas une limite dont on s’excuse : le balisage propre, c’est le produit.",
          ],
        },
        {
          heading: "Confidentialité et questions juridiques",
          body: [
            "Les questions sur les données que ce site collecte, ou les demandes concernant vos données au titre du RGPD, du CCPA ou d’une loi similaire, vont à la même adresse. Lisez d’abord la politique de confidentialité. En résumé, on ne collecte rien qui vous identifie, ce qui rend la plupart de ces demandes sans objet, et la politique explique précisément pourquoi.",
          ],
        },
      ],
    },
    privacy: {
      short: "Confidentialité",
      eyebrow: "Politique de confidentialité",
      title: "Politique de confidentialité — Docs 2 HTML",
      description:
        "Ce que Docs 2 HTML collecte et ne collecte pas. Vos documents sont traités dans votre navigateur et jamais envoyés. Pas de compte, pas de mesure sur vos fichiers, aucune revente de données.",
      h1: "Politique de confidentialité",
      lede: [
        "Les documents que vous convertissez ici ne quittent jamais votre ordinateur. Ce n’est pas une promesse sur la façon dont on traite vos données : il n’existe aucune étape où on les reçoit.",
        "Cette page l’explique en détail, et dit honnêtement où un tiers intervient.",
      ],
      sections: [
        {
          heading: "Vos documents",
          body: [
            "Les fichiers que vous déposez, choisissez ou collez sur ce site sont lus par votre propre navigateur et convertis par du code qui tourne sur votre propre machine. Ils ne sont transmis ni à nous, ni à un hébergeur, ni à qui que ce soit. Il n’y a pas de conversion côté serveur, pas de file d’attente, pas de stockage temporaire et pas de cache de votre contenu.",
            "Rien n’est écrit non plus sur votre appareil. On n’enregistre ni vos fichiers ni leur résultat dans le stockage local, IndexedDB ou un cookie. Fermez l’onglet et le contenu disparaît ; les seules copies sont le fichier de départ et ce que vous avez volontairement copié ou téléchargé.",
            "Le volet d’aperçu mérite une précision, parce qu’il pourrait ressembler à une exception. Ce n’en est pas une : l’aperçu est un iframe dont le contenu lui est passé directement par la page que vous avez déjà ouverte, via srcdoc. Rien n’est récupéré et rien n’est envoyé. Le cadre est en sandbox avec une origine opaque, donc il ne peut rien lire non plus.",
            "Vous pouvez vérifier tout ça. Coupez votre connexion et convertissez un fichier : ça marche toujours. Ou ouvrez les outils de développement de votre navigateur, regardez l’onglet Réseau, et constatez que déposer un fichier ne déclenche aucun envoi.",
          ],
        },
        {
          heading: "Ce qu’on collecte",
          body: [
            "On ne demande ni ne stocke votre nom, votre adresse e-mail ou des informations de compte, puisqu’il n’y a pas de compte.",
            "Le site est hébergé sur Cloudflare Workers. Comme tout hébergeur web, il traite les données standard d’une requête quand votre navigateur demande une page : adresse IP, user agent, URL demandée et heure. C’est inhérent au fonctionnement du web, et ça sert à livrer le site et à bloquer les abus. On s’en sert de façon agrégée pour voir quelles pages reçoivent du trafic. Ce n’est lié à rien de ce que vous convertissez, puisque vos conversions n’atteignent jamais aucun serveur.",
          ],
        },
        {
          heading: "Mesure d’audience, seulement si vous dites oui",
          body: [
            "À votre première visite, une petite barre en bas de page vous demande si on peut compter votre visite. Tant que vous n’avez pas cliqué sur Accepter, aucun script de mesure ne se charge et aucun cookie n’est déposé.",
            "Si vous acceptez, Google Analytics se charge et dépose ses propres cookies pour compter les visites et distinguer un nouveau visiteur d’un visiteur qui revient. Il voit la page où vous êtes, votre localisation approximative et votre navigateur. Il ne voit jamais vos fichiers ni ce que vous convertissez. Les signaux Google et la personnalisation des annonces sont désactivés.",
            "Votre réponse est enregistrée dans le stockage local de ce navigateur pour qu’on ne vous la redemande pas à chaque page. Pour changer d’avis, cliquez sur « Réglages de mesure d’audience » en bas de n’importe quelle page. Dire non après un oui coupe la mesure d’audience et supprime ses cookies.",
          ],
        },
        {
          heading: "Cookies et publicité",
          body: [
            "Sauf si vous acceptez la mesure d’audience, le site ne dépose aucun cookie. Il n’a ni connexion, ni panier, ni rien d’autre qu’un cookie pourrait garder. Les seuls cookies qui peuvent apparaître sont ceux de Google Analytics, après votre oui.",
            "On prévoit d’afficher de la publicité Google AdSense pour couvrir les frais d’hébergement. Une fois activée, Google pourra déposer des cookies ou lire des identifiants d’appareil pour diffuser et mesurer les annonces, selon ses propres règles. C’est le seul endroit du site où un tiers voit quelque chose de votre visite, et ça concerne la page où vous êtes, pas le document que vous avez converti, que Google n’a aucun moyen de voir.",
            "Des fournisseurs tiers, dont Google, utilisent des cookies pour diffuser des annonces en fonction des visites précédentes d’un utilisateur sur ce site ou sur d’autres sites. Grâce aux cookies publicitaires, Google et ses partenaires peuvent vous montrer des annonces selon vos visites sur ce site et/ou sur d’autres sites Internet. Vous pouvez désactiver la publicité personnalisée dans les Paramètres des annonces Google (adssettings.google.com), et refuser l’utilisation de cookies par certains fournisseurs tiers pour la publicité personnalisée sur optout.aboutads.info ou, en Europe, sur youronlinechoices.eu.",
            "Si vous êtes dans l’Espace économique européen, au Royaume-Uni ou en Suisse, votre consentement vous sera demandé avant l’utilisation de tout cookie non essentiel, et vous pourrez le retirer plus tard. La politique cookies explique les catégories et comment changer d’avis.",
          ],
        },
        {
          heading: "Tiers",
          body: ["La liste est courte, exprès :"],
          items: [
            "Cloudflare Workers héberge les fichiers statiques qui composent ce site.",
            "Google AdSense, une fois activé, diffuse la publicité décrite plus haut.",
            "Les fichiers Google Fonts sont auto-hébergés, servis depuis ce domaine, donc demander une page ne dit pas à Google que vous êtes passé.",
            "Google Analytics compte les visites, mais seulement après votre clic sur Accepter, comme décrit plus haut.",
            "Aucun enregistreur de session, carte de chaleur, widget de chat ou contenu de réseau social n’est chargé sur aucune page.",
          ],
        },
        {
          heading: "Enfants",
          body: [
            "C’est un utilitaire de conversion de documents, sans fonctions sociales ni comptes. Il ne s’adresse pas aux enfants de moins de 13 ans, et comme on ne collecte de données personnelles auprès de personne, on n’en collecte pas sciemment auprès d’enfants.",
          ],
        },
        {
          heading: "Vos droits",
          body: [
            "Au titre du RGPD, du CCPA et de lois similaires, vous avez le droit d’accéder à vos données personnelles, de les rectifier, de les effacer et de les récupérer, ainsi que de vous opposer à leur traitement. On les respecte tous. En pratique, les demandes sont ici particulièrement simples à traiter, puisqu’on ne détient aucun fichier que vous avez converti et aucun profil de vous à remettre, corriger ou supprimer.",
            "Pour les cookies de mesure d’audience et de publicité décrits plus haut, le responsable de traitement est Google, et ses propres outils vous donnent le contrôle le plus direct sur la personnalisation des annonces. Écrivez-nous et on vous indiquera où aller.",
          ],
        },
        {
          heading: "Modifications de cette politique",
          body: [
            "Si cette politique change de façon importante (un nouveau tiers, une nouvelle catégorie de données), la date en haut de cette page change avec elle. Comme le site ne détient aucune adresse e-mail, on ne peut pas vous prévenir directement : la date est donc le signal honnête à surveiller.",
          ],
        },
      ],
    },
    terms: {
      short: "Conditions",
      eyebrow: "Conditions d’utilisation",
      title: "Conditions d’utilisation — Docs 2 HTML",
      description:
        "Les conditions d’utilisation de Docs 2 HTML : gratuit pour tout usage, y compris commercial, fourni tel quel, vos documents restent à vous, et vous vérifiez le résultat avant de le publier.",
      h1: "Conditions d’utilisation",
      lede: [
        "Utiliser ce site, c’est accepter ce qui suit. C’est court, parce qu’un outil gratuit dans le navigateur qui ne stocke rien n’a pas besoin de grand-chose.",
      ],
      sections: [
        {
          heading: "Ce que vous pouvez en faire",
          body: [
            "L’utiliser pour tout, y compris un travail commercial. Convertir autant de fichiers que vous voulez. Pas de compte, pas de clé de licence, pas d’attribution exigée, et aucune limite sur l’usage du résultat : le HTML produit est à vous, pour le publier, le vendre ou le modifier.",
            "Il y a deux réserves pratiques, qui existent pour le bon fonctionnement de l’outil plutôt que pour nous : chaque fichier doit rester sous la taille maximale indiquée sur la page, et la conversion tourne sur votre machine, donc un très gros document est limité par votre propre mémoire et votre processeur plutôt que par un quota fixé par nous.",
          ],
        },
        {
          heading: "Vos documents restent à vous",
          body: [
            "Vous gardez tous les droits que vous aviez sur les fichiers que vous convertissez, et sur le HTML qui en sort. On ne revendique aucune licence sur l’un ou l’autre, et on ne pourrait pas s’en servir même si on le voulait : la conversion se passe dans votre navigateur et votre contenu ne nous parvient jamais.",
            "C’est à vous de vous assurer que vous avez le droit de convertir ce que vous convertissez. Si un document n’est pas à vous, cet outil n’y change rien.",
          ],
        },
        {
          heading: "Vérifiez le résultat avant de le publier",
          body: [
            "Le site est gratuit et fourni sans garantie. On vise une conversion exacte et sûre, et on documente les limites connues de chaque format sur sa propre page, mais aucun convertisseur n’est parfait.",
            "C’est encore plus vrai ici que pour la plupart des outils, parce que le résultat est du HTML et que vous allez sans doute le mettre sur un site en ligne. Toute entrée est nettoyée (scripts, gestionnaires d’événements, URL javascript: et contenus intégrés sont retirés), et on traite un échec de ce nettoyage comme le bug le plus grave qui soit. Mais on ne peut pas garantir qu’un balisage produit à partir de n’importe quelle entrée soit sûr dans tous les contextes où vous pourriez le coller. Relisez ce que vous publiez, exactement comme vous relireriez du HTML venant de n’importe quelle autre source extérieure.",
            "La structure a aussi ses limites : les cellules fusionnées se séparent, la mise en forme d’Excel n’est pas reproduite, et les mises en page Word complexes sont aplaties. Pour tout ce qui compte vraiment, comparez le résultat avec l’original.",
            "Dans la mesure permise par la loi, on n’est pas responsables des pertes de données, de travail ou de bénéfices, ni d’autres dommages liés à l’utilisation du site ou au fait de vous fier à son résultat.",
          ],
        },
        {
          heading: "Utilisation acceptable",
          body: [
            "N’utilisez pas le site pour traiter des contenus sur lesquels vous n’avez aucun droit, et ne l’utilisez pas d’une façon qui lui nuit ou nuit à d’autres :",
          ],
          items: [
            "N’essayez pas de casser le site, de le surcharger ou d’y chercher des failles dans le but de lui nuire ou de nuire à ses utilisateurs. Si vous trouvez un problème de sécurité, signalez-le plutôt.",
            "Ne faites pas de scraping ni d’automatisation qui dégrade le site pour les autres.",
            "Ne republiez pas le site comme s’il était le vôtre, et ne le présentez pas comme s’il était exploité par quelqu’un d’autre.",
            "Ne perturbez pas, ne bloquez pas et ne gonflez pas artificiellement la publicité qui finance l’hébergement.",
          ],
        },
        {
          heading: "Les logiciels sur lesquels il repose",
          body: [
            "Cet outil s’appuie sur des bibliothèques open source (markdown-it, Mammoth, DOMPurify, Papa Parse, read-excel-file et d’autres), chacune sous sa propre licence, avec les mentions conservées dans le code distribué. Leurs licences couvrent ces composants ; ces conditions couvrent ce site.",
          ],
        },
        {
          heading: "Disponibilité et modifications",
          body: [
            "C’est un service gratuit géré par une seule personne. On peut changer son fonctionnement, ajouter ou retirer un format, ou le mettre hors ligne, sans préavis. Comme rien de ce qui vous appartient n’est stocké ici, une panne vous prive d’un convertisseur, et de rien d’autre.",
            "Si ces conditions changent, la date en haut de cette page change avec elles. Continuer à utiliser le site après ça vaut acceptation de la version révisée.",
          ],
        },
      ],
    },
    cookies: {
      short: "Cookies",
      eyebrow: "Politique cookies",
      title: "Politique cookies — Docs 2 HTML",
      description:
        "Les cookies utilisés par Docs 2 HTML : aucun sauf si vous acceptez la mesure d’audience, auquel cas Google Analytics dépose les siens. La publicité, une fois activée, demande votre consentement dans l’EEE, au Royaume-Uni et en Suisse.",
      h1: "Politique cookies",
      lede: [
        "Ce site ne dépose aucun cookie tant que vous ne dites pas oui à la mesure d’audience. Il n’y a pas de connexion, ni rien d’autre à retenir d’une visite à l’autre.",
        "Cette page dit précisément ce qu’impliquent la mesure d’audience, et plus tard la publicité.",
      ],
      sections: [
        {
          heading: "Un cookie, en bref",
          body: [
            "Un cookie est un petit bout de texte qu’un site demande à votre navigateur de garder et de renvoyer lors des visites suivantes. C’est comme ça qu’un site reconnaît que deux chargements de page viennent du même navigateur : utile pour rester connecté, et tout aussi utile pour pister. Des technologies voisines comme le stockage local et les identifiants d’appareil font à peu près le même travail par d’autres moyens, et sont aussi couvertes ici.",
          ],
        },
        {
          heading: "Les cookies que ce site dépose",
          body: [
            "Aucun, sauf si vous cliquez sur Accepter dans la barre de mesure d’audience. Google Analytics en dépose alors deux : _ga, qui distingue un nouveau visiteur d’un visiteur qui revient, et _ga_ suivi d’un identifiant, qui suit la visite en cours. Les deux peuvent durer jusqu’à deux ans. Cliquez sur Non merci, ou ignorez la barre, et rien n’est déposé.",
            "Il n’y a pas de compte où rester connecté, pas de panier, et aucune préférence à garder d’une visite à l’autre. Même les réglages du convertisseur (fragment ou page complète, indentation, ligne d’en-tête, séparateur) ne vivent que dans la page tant qu’elle est ouverte, et se réinitialisent au rechargement. Vos fichiers et leur résultat ne sont pas non plus écrits dans le stockage local, IndexedDB ou un cookie.",
            "La seule chose qu’on garde, c’est votre réponse à la barre de mesure d’audience, dans le stockage local de ce navigateur, pour ne pas vous la reposer à chaque page.",
          ],
        },
        {
          heading: "Cookies publicitaires",
          body: [
            "L’hébergement est payé par la publicité, et on prévoit d’utiliser Google AdSense. Une fois en place, Google pourra déposer des cookies ou lire des identifiants d’appareil pour diffuser des annonces, limiter le nombre de fois où vous voyez la même, et mesurer les clics. Dans certaines configurations, ces cookies servent à personnaliser les annonces en fonction de votre navigation ailleurs.",
            "Ces cookies sont déposés par Google, pas par nous, et Google est le responsable des données qu’ils transportent. Ce qu’ils peuvent voir, c’est la page où vous êtes. Ce qu’ils ne peuvent pas voir, c’est ce que vous convertissez : ça ne quitte jamais votre navigateur, donc un script publicitaire n’a rien à lire.",
          ],
        },
        {
          heading: "Le consentement, si vous êtes en Europe",
          body: [
            "Si vous êtes dans l’Espace économique européen, au Royaume-Uni ou en Suisse, les cookies non essentiels ne sont utilisés qu’après votre accord. On vous le demandera une fois, via une fenêtre de consentement, et vous pouvez refuser tout en continuant à utiliser chaque partie du site : rien ici n’est bloqué derrière le consentement.",
            "Vous pouvez changer de réponse à tout moment : cliquez sur « Réglages de mesure d’audience » en bas de n’importe quelle page et la barre revient. Dire non après un oui coupe la mesure d’audience et supprime les cookies qu’elle avait déposés.",
          ],
        },
        {
          heading: "Gérer les cookies vous-même",
          body: [
            "Indépendamment de tout ce que fait ce site, c’est votre navigateur qui a le dernier mot :",
          ],
          items: [
            "Tous les grands navigateurs peuvent bloquer complètement les cookies tiers, dans leurs réglages de confidentialité.",
            "Vous pouvez supprimer les cookies existants d’un site, ou de tous les sites, à tout moment.",
            "Les fenêtres privées ou de navigation privée effacent les cookies à leur fermeture.",
            "Les paramètres publicitaires de Google vous permettent de désactiver les annonces personnalisées sur les sites qui utilisent son réseau.",
          ],
        },
        {
          heading: "Modifications",
          body: [
            "Si ce site se met à utiliser un cookie qu’il n’utilise pas aujourd’hui, cette page est mise à jour avant, et la date en haut change. Si vous voulez savoir ce qui est déposé en ce moment sans nous croire sur parole, les outils de développement de votre navigateur vous montrent la liste complète, sous Application ou Stockage.",
          ],
        },
      ],
    },
  },
  guideIndex: {
    short: "Guides",
    eyebrow: "Guides",
    title: "Guides — les pièges de la conversion de documents en HTML",
    description:
      "Sept guides : six pour les conversions qui coincent la première fois (tableaux Markdown, mise en forme Word, soupe de classes Google Docs, paragraphes en texte brut, gros CSV, formules Excel), plus un sur la conversion sans que le fichier quitte le navigateur.",
    h1: "Guides",
    lede: [
      "Chaque convertisseur a une page qui dit ce qu’il fait. Ces guides, c’est pour la suite : le fichier qui sort de travers, et pourquoi.",
      "Un guide par outil, plus un sur la façon de garder le fichier hors du réseau, tous écrits à partir des questions qu’on nous envoie vraiment. Pas d’inscription, et chaque page renvoie directement vers son convertisseur.",
    ],
  },
  guides: {
    "word-to-html-without-uploading": {
      short: "Sans envoi",
      eyebrow: "Guide pratique · Word → HTML",
      title: "Convertir sans envoi : HTML créé dans l’onglet, aperçu en sandbox",
      description:
        "Le document devient du HTML dans cet onglet, l’aperçu tourne dans une sandbox verrouillée. Pourquoi c’est mieux qu’un serveur, et comment le vérifier.",
      keywords: [
        "convertir word en html sans upload",
        "convertisseur docx en html hors ligne",
        "word en html confidentiel",
        "convertir un document en html sans l’envoyer",
        "word en html sans serveur",
      ],
      h1: "Votre .docx ne quitte jamais l’onglet : vérifiez-le vous-même",
      lede: [
        "Ce convertisseur assemble le HTML sur votre propre machine et l’affiche dans un aperçu qui ne peut pas joindre le réseau. Deux promesses distinctes, et les deux se vérifient.",
        "Quand le document est un livrable client ou quelque chose qui n’est pas encore public, la bonne question n’est pas de savoir s’ils le suppriment. C’est de savoir s’il a été envoyé. Ici, non.",
      ],
      tool: "docx-to-html",
      sections: [
        {
          heading: "Le balisage est construit avant qu’une requête puisse partir",
          body: [
            "Un .docx, c’est un zip de XML. Cet outil le décompresse et reconstruit la structure en HTML entièrement dans les scripts de la page : du code arrivé quand vous avez ouvert la page, qui travaille ensuite en local.",
            "Aucun serveur n’attend un fichier derrière. Le site n’est fait que de fichiers statiques, donc il n’existe aucune adresse où un document pourrait être envoyé, même si le code essayait.",
          ],
        },
        {
          heading: "L’aperçu est en sandbox, exprès",
          body: [
            "Le HTML généré s’affiche dans un iframe en sandbox restreinte. Ce cadre peut dessiner le balisage, mais il ne peut ni lancer de scripts, ni charger des polices distantes, ni faire de requêtes. Un balisage qui contiendrait par hasard quelque chose d’actif ne peut donc rien faire.",
            "La sandbox protège l’aperçu ; ce n’est pas la même chose que la confidentialité du fichier. Mais c’est grâce à elle que vous pouvez prévisualiser un document que vous n’avez pas écrit sans que l’aperçu devienne une porte vers le réseau.",
          ],
        },
        {
          heading: "Lisez le HTML avant de lui faire confiance",
          steps: [
            "Convertissez le fichier, puis regardez le volet du code, pas seulement le rendu.",
            "Cherchez ce que vous n’attendiez pas : une balise script, une image distante, un mouchard. Par défaut, il n’y en a aucun : c’est votre document en balises, sans rien d’ajouté.",
            "Copiez le balisage dans un éditeur de texte simple pour le confirmer en dehors de la page.",
          ],
          body: [
            "Un balisage que vous pouvez lire, c’est un balisage dont vous pouvez répondre. Rien à voir avec un service qui vous rend un fichier fini que vous n’ouvrez jamais.",
          ],
        },
        {
          heading: "Maintenant, essayez réseau coupé",
          steps: [
            "Ouvrez la page, puis déconnectez-vous d’internet.",
            "Donnez-lui un .docx. Le même HTML sort : il n’y a jamais eu d’aller-retour à couper.",
          ],
          body: [
            "Laissez l’onglet Réseau ouvert pendant une conversion et vous verrez la même chose sans rien débrancher : le document ne déclenche aucune requête sortante.",
          ],
        },
        {
          heading: "Ce que ça ne couvre pas",
          body: [
            "Garder le fichier hors du réseau, c’est la garantie forte, pas la seule qui compte. Une fois que le HTML part vers un dépôt, un CMS ou un e-mail, il est aussi exposé que cet endroit.",
            "Et un navigateur reste un navigateur : une extension qui lit la page, ou quelque chose déjà installé sur l’ordinateur, voit le document de toute façon. Ce qui disparaît, c’est le plus gros risque : une copie stockée sur les serveurs d’un convertisseur. Le reste ne change pas.",
          ],
        },
      ],
      outro:
        "Convertissez, lisez le code, et coupez le réseau pour une démonstration en direct si vous voulez. Le document est reconstruit en HTML dans cet onglet et n’est jamais envoyé ailleurs.",
    },
    "markdown-tables-to-html": {
      short: "Tableaux Markdown",
      eyebrow: "Guide pratique · Markdown → HTML",
      title: "Convertir un tableau Markdown en tableau HTML (avec alignement)",
      description:
        "Les tableaux Markdown deviennent de vrais <table> avec <thead> et scope. Écrire la ligne d’alignement, et pourquoi un tableau sort parfois en texte.",
      keywords: [
        "tableau markdown en html",
        "table markdown html",
        "convertir tableau markdown en html",
        "tableau markdown",
        "alignement tableau markdown",
      ],
      h1: "Tableaux Markdown en tableaux HTML",
      lede: [
        "Le tableau à barres verticales, c’est le morceau de Markdown qu’on voit le plus souvent rater. Il s’affiche sur GitHub, puis sort ailleurs en paragraphe plein de barres.",
        "Voici la syntaxe qui survit à la conversion, ce que donne le HTML de l’autre côté, et les trois erreurs qui retransforment un tableau en texte.",
      ],
      tool: "markdown-to-html",
      sections: [
        {
          heading: "Ce qu’il faut pour qu’un tableau soit un tableau",
          body: [
            "Les tableaux à barres verticales ne font pas partie de CommonMark. Ils viennent de GitHub Flavored Markdown : un convertisseur doit donc les activer, et certains ne le font pas. Celui-ci, si.",
            "Il faut trois choses. Une ligne d’en-tête. Une ligne de séparation en tirets juste en dessous. Et au moins une ligne de contenu. Oubliez l’une des trois et vous obtenez des paragraphes.",
          ],
          steps: [
            "Écrivez la ligne d’en-tête avec une barre verticale entre chaque cellule. Les barres au début et à la fin de la ligne sont facultatives, mais elles aident beaucoup à repérer un tableau mal aligné.",
            "Écrivez la ligne de séparation juste en dessous, sans ligne vide entre les deux. Trois tirets par colonne minimum, c’est la valeur sûre.",
            "Écrivez vos lignes de contenu. Pas besoin qu’elles soient alignées dans la source : les cellules sont découpées sur les barres, pas sur les colonnes.",
          ],
          sample: {
            beforeLabel: "Markdown",
            before: "| Part | Qty |\n| ---- | --- |\n| Bolt | 12 |\n| Nut  | 12 |",
            afterLabel: "HTML",
            after: '<table>\n  <thead>\n    <tr>\n      <th scope="col">Part</th>\n      <th scope="col">Qty</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Bolt</td>\n      <td>12</td>\n    </tr>\n  </tbody>\n</table>',
          },
        },
        {
          heading: "L’attribut scope, et à quoi il sert",
          body: [
            "Les cellules d’en-tête sortent en <th scope=\"col\">, pas en <td> en gras. C’est grâce à cet attribut qu’un lecteur d’écran peut annoncer « Qty, 12 » au lieu de lire un nombre seul sans savoir à quelle colonne il appartient.",
            "Ça ne coûte rien, et c’est toute la différence entre un tableau et une grille de chiffres. Une mise en page bricolée en div ne peut pas l’exprimer du tout, et c’est le meilleur argument pour ne jamais en faire.",
          ],
        },
        {
          heading: "L’alignement : la ligne des deux-points",
          body: [
            "Les deux-points dans la ligne de séparation règlent l’alignement de chaque colonne. Un deux-points à gauche aligne à gauche, des deux côtés centre, à droite aligne à droite. C’est ce qu’il vous faut pour les nombres.",
            "Dans le HTML, vous obtenez une classe, pas un style en ligne : align-left, align-center ou align-right. Les styles en ligne sont retirés de toutes les sorties du site, parce qu’un attribut style, c’est la porte d’entrée de l’injection CSS.",
            "En page complète, l’alignement marche donc tout de suite : la feuille de style du <head> définit ces trois classes. En fragment, elles sont laissées à votre propre CSS, et c’est tout l’intérêt du fragment : trois règles d’une ligne, et ça colle à votre site au lieu de se battre avec.",
          ],
          sample: {
            beforeLabel: "Markdown",
            before: "| Item | Cost |\n| :--- | ---: |\n| Bolt | 0.40 |",
            afterLabel: "HTML",
            after: '<th scope="col" class="align-left">Item</th>\n<th scope="col" class="align-right">Cost</th>\n...\n<td class="align-left">Bolt</td>\n<td class="align-right">0.40</td>',
          },
        },
        {
          heading: "Quand le tableau sort en paragraphe",
          body: [
            "Trois causes, dans l’ordre où on les rencontre.",
          ],
          steps: [
            "Une ligne vide entre l’en-tête et la ligne de séparation. Ça coupe le tout en deux paragraphes avant même que l’analyseur de tableaux ne le voie.",
            "Une barre verticale dans le texte d’une cellule. Échappez-la en \\| sinon la cellule se coupe en deux et la ligne se retrouve avec plus de cellules que l’en-tête.",
            "Pas assez de tirets. Un seul tiret par colonne marche avec certains analyseurs et pas d’autres ; trois, c’est la version sur laquelle tout le monde est d’accord.",
          ],
        },
        {
          heading: "Les cellules qui contiennent plus que du texte",
          body: [
            "Le Markdown en ligne marche dans les cellules : gras, italique, code, liens. Les éléments de bloc, non : pas de listes, pas de paragraphes, pas de blocs de code. C’est une limite de la syntaxe des tableaux elle-même, pas de ce convertisseur.",
            "Un retour à la ligne dans une cellule demande un <br> littéral, écrit à la main. Le HTML brut dans le Markdown passe ici au lieu d’être échappé, donc ça marche, et il est nettoyé à la sortie comme tout le reste.",
          ],
        },
      ],
      outro:
        "Voilà tout ce qui change dans un tableau Markdown une fois en HTML. Le convertisseur prend du Markdown collé ou un fichier .md déposé, et rien ne quitte votre navigateur.",
    },
    "word-to-html-keep-formatting": {
      short: "Mise en forme Word",
      eyebrow: "Guide pratique · DOCX → HTML",
      title: "Word en HTML : la mise en forme qui survit, et celle qui part",
      description:
        "Ce qui passe d’un .docx au HTML, et ce qui est jeté exprès. Titres, tableaux, listes et images restent ; polices, couleurs et mise en page, non.",
      keywords: [
        "word en html garder la mise en forme",
        "convertir word en html mise en forme",
        "docx en html mise en forme",
        "word en html sans perdre la mise en forme",
        "docx en html propre",
      ],
      h1: "Ce qui survit quand Word devient du HTML",
      lede: [
        "« Garder la mise en forme » veut dire deux choses différentes, et celle que vous visez décide si le résultat vous plaira.",
        "La structure (titres, listes, tableaux, mise en valeur) passe. L’apparence (polices, couleurs, marges, sauts de page) ne passe pas, et c’est un choix délibéré, pas une fonction manquante.",
      ],
      tool: "docx-to-html",
      sections: [
        {
          heading: "La structure survit, l’apparence non",
          body: [
            "Un .docx stocke deux choses distinctes sur chaque paragraphe : ce qu’il est, et à quoi il ressemble. « Titre 2 », c’est ce qu’il est. Calibri 16 pt gras avec 6 pt d’espace après, c’est son apparence.",
            "Le convertisseur lit la première et jette la seconde. Un Titre 2 devient un <h2>, pas un <p> avec une taille de police. Sur votre site, il prend ensuite votre propre style de titre, ce qui est presque sûrement ce que vous vouliez.",
            "L’autre option, c’est ce que fait « Enregistrer en tant que page web » de Word : quelques milliers de lignes de styles mso- qui reproduisent la page à l’identique, et qu’on ne peut ensuite ni modifier ni restyler.",
          ],
        },
        {
          heading: "Utilisez les styles de titre, ne vous contentez pas du gras",
          body: [
            "C’est la seule chose qui vaut la peine d’être faite dans Word avant de convertir, et c’est ce qui sépare une bonne sortie d’une sortie plate.",
            "Un texte qui ressemble seulement à un titre (plus gros, en gras, taille réglée à la main) est enregistré comme un paragraphe normal. Il sort en <p>, parce que c’est vraiment ce qu’il est. Rien ne peut retrouver l’intention à partir de la taille de police.",
          ],
          steps: [
            "Dans Word, placez le curseur dans un titre et regardez la galerie des styles. Si elle affiche Normal, voilà le problème.",
            "Appliquez Titre 1, 2 ou 3 à la place. L’apparence va changer ; modifiez le style de titre lui-même s’il ne vous plaît pas.",
            "Faites pareil pour les listes : utilisez les boutons de liste plutôt que de taper « 1. » et une tabulation. Les numéros tapés à la main sortent en texte littéral, pas en <ol>.",
            "Convertissez, puis cherchez des <h2> et des <ul> dans la sortie. Si vous voyez un mur de <p>, le document n’a jamais été structuré au départ.",
          ],
        },
        {
          heading: "Ce qui passe",
          body: [
            "Les niveaux de titre en <h1> à <h6>, tirés des styles Word. Gras, italique et barré en <strong>, <em> et <s>. Exposant et indice. Les liens, débarrassés des paramètres de suivi de Google et d’Office.",
            "Les listes en vrais <ul> et <ol>, imbriquées jusqu’à cinq niveaux. Les tableaux en <table>, cellules fusionnées comprises : les fusions horizontales passent en colspan et les verticales en rowspan.",
            "Les citations à partir du style Citation. Les paragraphes au style Code ou Préformaté en <pre><code>. Les légendes en <p class=\"caption\">.",
          ],
        },
        {
          heading: "Ce qui est jeté, et pourquoi",
          body: [
            "Polices, tailles, couleurs, surlignage, alignement, retraits, interlignes, sauts de page, en-têtes et pieds de page, marges. Tout ça, c’est de la présentation qui appartient à une page, et le HTML n’est pas une page.",
            "Deux pertes valent d’être connues parce qu’elles passent facilement inaperçues. Le texte souligné perd son soulignement : sur le web, un soulignement signifie un lien, donc le soulignement de Word ne donne rien plutôt que quelque chose de trompeur. Et les paragraphes vides servant d’espacement disparaissent, parce que c’est de la mise en page, pas du contenu.",
            "Le suivi des modifications et les commentaires sont supprimés : vous avez le texte final, pas l’historique. Zones de texte, SmartArt et graphiques ne survivent pas, à part leur texte s’ils en contiennent.",
          ],
        },
        {
          heading: "Les images : trois choix",
          steps: [
            "Le base64 intégré vous donne un seul fichier .html autonome, à envoyer par e-mail ou à ouvrir d’un double-clic. Il est environ un tiers plus lourd que les images d’origine.",
            "Les fichiers séparés vous donnent un zip : le HTML plus un dossier images/, avec chaque <img> qui pointe déjà vers le bon chemin. À utiliser pour tout ce qui va sur un vrai site.",
            "Supprimer laisse les balises <img> en place avec un src vide, donc vous verrez des icônes d’image cassée. Supprimez-les, ou prenez l’une des deux autres options.",
          ],
          body: [
            "Les vieux fichiers .doc font exception : impossible d’en récupérer les images, quelle que soit l’option choisie. Tout le reste (texte, titres, tableaux, gras) passe.",
          ],
        },
      ],
      outro:
        "Réglez d’abord vos styles de titre, puis convertissez. Les fichiers sont lus dans votre navigateur et jamais envoyés, donc vous pouvez essayer sur un document confidentiel.",
    },
    "google-docs-to-html-clean": {
      short: "Soupe de classes Google Docs",
      eyebrow: "Guide pratique · Google Docs → HTML",
      title: "HTML propre depuis Google Docs : virer la soupe de classes c1/c17",
      description:
        "Copier un Google Doc donne des classes c1 et c17, un <b> font-weight:normal et des redirections google.com/url. Ce que c’est, et comment s’en débarrasser.",
      keywords: [
        "google docs html propre",
        "supprimer classes google docs html",
        "google doc code html",
        "exporter google docs en html propre",
        "copier google docs en html",
      ],
      h1: "Obtenir du HTML propre depuis un Google Doc",
      lede: [
        "Copiez quelques paragraphes d’un Doc, collez-les dans un CMS, et vous récupérez du texte enrobé de classes comme c1 et c17 qui renvoient à une feuille de style que vous n’avez pas.",
        "Ce balisage a trois défauts précis. Une fois que vous les connaissez, la solution tient en un collage.",
      ],
      tool: "google-docs-to-html",
      sections: [
        {
          heading: "Copiez le contenu, pas le lien",
          body: [
            "Premier piège : Télécharger → Page web dans le menu du Doc vous donne un zip avec un document HTML complet et une feuille de style intégrée. Toute la page, styles compris.",
            "Ce qu’il vous faut, c’est le presse-papiers. Sélectionner du contenu dans un Doc et le copier y place une version HTML en texte enrichi, qui porte la structure sans la feuille de style.",
          ],
          steps: [
            "Ouvrez le Doc et sélectionnez le contenu voulu. Ctrl+A marche si vous voulez tout.",
            "Copiez avec Ctrl+C, pas avec « Copier le lien », qui ne vous donne qu’une URL vers le document.",
            "Collez dans la zone de la page du convertisseur, ou faites Ctrl+V n’importe où sur cette page. Pas de connexion, pas d’autorisation Drive : votre navigateur transmet le presse-papiers, rien d’autre.",
          ],
        },
        {
          heading: "Problème n° 1 : la soupe de classes",
          body: [
            "Le HTML que Google met dans le presse-papiers colle une classe sur presque chaque élément : c0, c1, c17, et des noms en lst-kix_ sur les éléments de liste. Ils sont générés pour chaque document et renvoient à du CSS resté dans le Doc.",
            "Ce n’est donc pas que du bruit. Ce sont des références mortes : elles ne font rien sur votre page, elles entrent en conflit avec vos propres noms de classes, et elles rendent le balisage illisible quand vous voulez le modifier.",
            "Elles sont retirées par motif : c suivi de chiffres, tout ce qui commence par lst-kix_, les id docs-internal-guid. Vos propres classes qui se trouveraient dans le collage ne sont pas touchées.",
          ],
          sample: {
            beforeLabel: "Collé depuis Docs",
            before: '<p class="c3"><span class="c1">A sentence.</span></p>',
            afterLabel: "Après nettoyage",
            after: "<p>A sentence.</p>",
          },
        },
        {
          heading: "Problème n° 2 : le gras qui n’en est pas",
          body: [
            "Docs enveloppe le contenu copié dans un <b style=\"font-weight:normal\">. C’est une balise <b> qui désactive explicitement le gras : une bizarrerie liée à la façon dont l’éditeur suit la mise en forme en interne.",
            "Collez ça n’importe où l’attribut style est retiré, c’est-à-dire dans la plupart des CMS, et tout le bloc passe en gras. Ici, la balise est retirée au lieu d’être gardée, donc le contenu sort au niveau d’imbrication où il aurait toujours dû être.",
            "Le même passage supprime les <span> vides laissés après le retrait de leurs classes. Ce sont eux qui transforment un collage de deux paragraphes en douze lignes.",
          ],
        },
        {
          heading: "Problème n° 3 : chaque lien est une redirection",
          body: [
            "Les liens d’un Doc sortent en pointant vers google.com/url?q=https://example.com/… au lieu de la vraie destination. Google s’en sert pour suivre les clics dans l’éditeur.",
            "Publié sur une page, ça veut dire que chaque lien sortant de votre site passe par Google, affiche la mauvaise URL dans la barre d’état, et cassera le jour où ce redirecteur changera.",
            "L’enveloppe est retirée pour retrouver la vraie destination, plusieurs fois si elle est imbriquée. Les paramètres de suivi partent aussi : utm_source et compagnie, gclid, fbclid et quelques autres.",
          ],
          sample: {
            beforeLabel: "Collé depuis Docs",
            before: '<a href="https://www.google.com/url?q=https://example.com/a%3Futm_source%3Ddoc">link</a>',
            afterLabel: "Après nettoyage",
            after: '<a href="https://example.com/a">link</a>',
          },
        },
        {
          heading: "Ce qui reste, et ce qui reste à faire",
          body: [
            "Titres, paragraphes, listes, tableaux, liens, gras et italique : le document, en somme. Scripts, gestionnaires d’événements et styles en ligne sont partis, parce que le HTML du presse-papiers peut venir de n’importe quelle page web et est traité comme une entrée non fiable.",
            "Le nettoyeur vous laisse deux choses. Les paragraphes vides d’espacement de Google arrivent en <p></p> : supprimez ceux dont vous ne voulez pas. Et les images de Docs sont hébergées chez Google avec des URL qui expirent : téléchargez-les et hébergez-les vous-même, sinon elles disparaîtront de votre page plus tard.",
          ],
        },
      ],
      outro:
        "Sélectionnez, copiez, collez. Le presse-papiers est lu dans votre navigateur et rien n’est envoyé nulle part.",
    },
    "plain-text-to-html-paragraphs": {
      short: "Texte en paragraphes",
      eyebrow: "Guide pratique · Texte → HTML",
      title: "Sauter une ligne en HTML : ligne vide entre deux paragraphes",
      description:
        "Appuyer sur Entrée en HTML n’ajoute aucun espace. Sautez une ligne avec deux <br>, un <p>&nbsp;</p> ou une marge CSS. Et comment le texte devient des <p>.",
      keywords: [
        "sauter une ligne html",
        "comment sauter une ligne en html",
        "ligne vide html",
        "saut de ligne html",
        "double saut de ligne html",
        "espace entre paragraphe html",
        "convertir texte en html",
        "texte en paragraphes html",
      ],
      h1: "Comment sauter une ligne en HTML",
      lede: [
        "Du texte collé tel quel dans une page se tasse en un seul bloc, parce que le HTML ignore vos retours à la ligne. Pour un navigateur, toute suite d’espaces vaut un seul espace.",
        "Deux règles décident de tout le résultat : les lignes vides séparent les paragraphes, et pour les retours à la ligne simples, c’est vous qui choisissez. Tout le reste en découle.",
      ],
      tool: "text-to-html",
      sections: [
        {
          heading: "Quatre façons d’avoir une ligne vide",
          body: [
            "Appuyer deux fois sur Entrée dans votre HTML ne change rien à l’écran. Voici ce qui marche, du plus courant au moins courant.",
            "Entre deux paragraphes : fermez un <p> et ouvrez-en un autre. Les navigateurs donnent à chaque <p> une marge de 1em au-dessus et en dessous, à peu près une ligne, donc l’espace est déjà là.",
            "Dans un même paragraphe : deux <br> d’affilée, comme dans ligne un<br><br>ligne trois. Le premier termine la ligne, le second en laisse une vide.",
            "Un paragraphe vide : <p>&nbsp;</p>. Un <p></p> nu n’a pas de hauteur, donc il n’affiche rien. L’espace insécable lui donne une ligne de haut.",
            "Plus ou moins d’une ligne d’espace : réglez-le en CSS, par exemple p { margin-bottom: 2em; }. C’est l’option propre quand l’espace est un choix de design plutôt qu’une partie du texte.",
          ],
        },
        {
          heading: "Les lignes vides du texte brut deviennent des <p>",
          body: [
            "Une ligne vide entre deux blocs de texte produit deux éléments <p>. C’est la seule règle de paragraphe qui existe, et c’est la convention qu’utilise tout e-mail en texte brut depuis trente ans.",
            "Dans le HTML lui-même, les lignes vides de la source sont ignorées (un navigateur réduit toute suite d’espaces à un seul espace), donc appuyer sur Entrée dans votre balisage n’ajoute aucun espace visible. L’espacement des paragraphes vient des balises <p> elles-mêmes ; un <br> seul ne fait que couper la ligne. Ce convertisseur transforme chaque ligne vide de votre texte en vraie coupure <p>, pour que vous n’ayez rien de tout ça à écrire à la main.",
            "Une ligne qui ne contient que des espaces ou des tabulations compte quand même comme vide. Plusieurs lignes vides d’affilée font toujours une seule coupure, pas des paragraphes vides.",
            "Si votre texte n’a aucune ligne vide, vous obtenez un seul long paragraphe, et c’est normal, puisqu’il n’y avait rien pour couper. Le convertisseur vous le signale quand il le repère, au lieu de vous laisser le découvrir plus tard.",
          ],
          sample: {
            beforeLabel: "Texte",
            before: "First thought.\n\nSecond thought.",
            afterLabel: "HTML",
            after: "<p>First thought.</p>\n<p>Second thought.</p>",
          },
        },
        {
          heading: "Retours à la ligne simples : <br> ou espace",
          body: [
            "Dans un paragraphe, un retour à la ligne simple peut aller dans deux directions, et la bonne réponse dépend entièrement de ce qu’est le texte.",
            "Gardez-les en <br> pour tout ce où la fin de ligne a un sens : une adresse, un poème, un bloc de signature, des paroles de chanson. Laissez le texte couler (les retours deviennent des espaces) pour de la prose coupée en dur à 72 colonnes par un vieil éditeur. Laisser ceux-là en <br> vous donne un paragraphe au bord droit irrégulier qui ne se remet pas en forme sur un téléphone.",
          ],
          sample: {
            beforeLabel: "Texte",
            before: "12 Bridge Street\nManchester",
            afterLabel: "HTML, retours gardés",
            after: "<p>12 Bridge Street<br>\nManchester</p>",
          },
        },
        {
          heading: "Transformer les URL brutes en liens",
          body: [
            "Avec les liens activés, tout ce qui commence par http://, https:// ou www. devient un <a>. Les adresses e-mail deviennent des liens mailto:.",
            "La détection est volontairement stricte. Un example.com seul n’est pas transformé en lien, parce qu’on ne peut pas le distinguer d’une phrase qui finit par un nom de fichier ou d’une abréviation avec un point. Se tromper là-dessus donne des liens vers nulle part.",
            "La ponctuation finale est laissée hors du lien, donc une URL en fin de phrase n’avale pas le point. Les liens reçoivent rel=\"noopener nofollow\" et ne s’ouvrent pas dans un nouvel onglet.",
          ],
        },
        {
          heading: "Ce que le texte brut ne peut pas dire au convertisseur",
          body: [
            "Ici, tout devient un paragraphe. Il n’y a pas d’autre sortie, et c’est une propriété de l’entrée, pas un défaut.",
            "Une ligne qui commence par un tiret ressemble à une liste pour vous, mais c’est un tiret et un espace. Souligner une ligne avec des signes égal ressemble à un titre, mais c’est une rangée de signes égal. Deviner se tromperait assez souvent pour être pire que ne pas deviner.",
            "Donc : pas de listes, pas de titres, pas de blocs de code. L’indentation est conservée en caractères mais se tasse dans le navigateur, ce qui veut dire que les tableaux ASCII et le code indenté sortent en prose collée. Si votre texte est en fait du Markdown, utilisez la page Markdown : là-bas, ces conventions veulent dire quelque chose.",
          ],
        },
        {
          heading: "Une chose dont vous n’avez pas à vous soucier",
          body: [
            "Chevrons, esperluettes et guillemets sont échappés, tous sans exception. Un texte qui contient <b>bold</b> affiche ces caractères sur la page au lieu de passer en gras.",
            "C’est la définition même de l’outil, pas une sécurité ajoutée après coup. Le texte brut, c’est du texte brut : s’il pouvait contenir du balisage, il ne le serait pas.",
          ],
        },
      ],
      outro:
        "Collez le texte ou déposez un fichier .txt, choisissez le comportement des retours à la ligne simples, et copiez le HTML. Tout se passe dans votre navigateur.",
    },
    "csv-to-html-table-large-files": {
      short: "Gros fichiers CSV",
      eyebrow: "Guide pratique · CSV → tableau",
      title: "CSV en tableau HTML : séparateurs, guillemets et gros fichiers",
      description:
        "Comment le séparateur est détecté, ce que deviennent guillemets et retours à la ligne, l’alerte du CSV à une colonne, et la limite de 100 000 cellules.",
      keywords: [
        "csv en tableau html",
        "convertir csv en html",
        "gros fichier csv en html",
        "csv point-virgule en tableau html",
        "tsv en tableau html",
      ],
      h1: "Un CSV en tableau HTML, même les gros",
      lede: [
        "Un CSV, c’est un fichier texte avec une convention de ponctuation, et des conventions, il y en a plusieurs. La plupart des problèmes de conversion sont en fait des désaccords sur celle qu’utilise le fichier.",
        "Voici comment le séparateur est choisi, à quoi servent les guillemets, et où se situent vraiment les limites de taille.",
      ],
      tool: "csv-to-html-table",
      sections: [
        {
          heading: "Le séparateur est détecté, pas supposé",
          body: [
            "Virgules, points-virgules, tabulations et barres verticales sont tous utilisés. Surtout les points-virgules : exportez un tableur dans une langue où la virgule sert de séparateur décimal, comme en français, et vous obtenez des points-virgules, puisque les virgules sont déjà prises.",
            "La détection lit les dix premières lignes, essaie chaque candidat, et garde celui qui donne un nombre de colonnes constant. Un fichier dont les premières lignes sont inhabituelles (une ligne de titre au-dessus de l’en-tête, par exemple) peut être mal lu, donc le séparateur détecté est indiqué dans la sortie. S’il est faux, changez-le.",
          ],
          steps: [
            "Déposez le fichier et regardez la note au-dessus du tableau qui indique le séparateur utilisé.",
            "Si le tableau a une colonne au lieu de six, réglez le séparateur à la main dans la liste déroulante.",
            "Vérifiez que la première ligne est bien dans l’en-tête. Si le fichier n’a pas d’en-tête, désactivez-le et chaque ligne devient une ligne de contenu.",
          ],
        },
        {
          heading: "Champs entre guillemets, et la virgule dans une cellule",
          body: [
            "Un champ entre guillemets doubles peut contenir le séparateur, et un guillemet doublé à l’intérieur signifie un guillemet littéral. C’est la RFC 4180, et c’est géré correctement.",
            "Un champ entre guillemets peut aussi contenir un retour à la ligne. Dans le HTML, il devient un <br> dans la cellule, donc une adresse sur deux lignes reste sur deux lignes au lieu de casser la ligne du tableau.",
          ],
          sample: {
            beforeLabel: "CSV",
            before: 'name,note\nBolt,"M6, 40mm"\n',
            afterLabel: "HTML",
            after: '<tr>\n  <td>Bolt</td>\n  <td>M6, 40mm</td>\n</tr>',
          },
        },
        {
          heading: "L’alerte du fichier à une colonne",
          body: [
            "Un CSV à une seule colonne signale un problème de séparateur. Ça vaut une explication, parce que le fichier est en général correct.",
            "La détection cherche le caractère qui découpe les lignes de façon régulière. Avec une seule colonne, il n’y a rien à découper, donc rien ne ressemble à un séparateur, et elle le dit. La sortie reste juste : une colonne, toutes les lignes présentes.",
            "Si vous préférez ne pas voir l’alerte, réglez le séparateur explicitement au lieu de le laisser en automatique.",
          ],
        },
        {
          heading: "Ce que « gros » veut dire ici",
          body: [
            "Deux plafonds distincts. 25 Mo par fichier, et 100 000 cellules, c’est-à-dire lignes × colonnes : un fichier à six colonnes vous mène à environ 16 000 lignes, et un fichier à cent colonnes s’arrête vers mille.",
            "La limite de cellules est celle que vous atteindrez en premier, et elle tient au navigateur plutôt qu’à l’analyseur. Chaque cellule devient des nœuds DOM dans l’aperçu, et un tableau de quelques centaines de milliers de cellules bloque l’onglet. Refuser vaut mieux que figer.",
            "Pour quelque chose de vraiment plus gros, découpez par lignes et convertissez chaque morceau ; la ligne d’en-tête peut être répétée dans chacun. Les lignes vides sont supprimées automatiquement, y compris celles qui ne contiennent que des séparateurs, ce qu’est en général un bloc final de \",,,\".",
          ],
        },
        {
          heading: "À quoi ressemble le tableau",
          body: [
            "La ligne d’en-tête devient un <thead> avec des cellules <th scope=\"col\"> ; tout le reste va dans <tbody>. Les lignes trop courtes sont complétées jusqu’à la plus large pour que le tableau reste rectangulaire, et la sortie dit combien de lignes en ont eu besoin. C’est en général le signe qu’un truc est cassé en amont.",
            "Rien n’est converti en type. 007 reste 007, et une valeur comme 1-2 ne se transforme pas en date. Excel vous fait ce coup-là ; ici, non.",
            "Avec l’option responsive, le tableau est placé dans un <div class=\"table-wrap\"> qui défile sur le côté. Un tableau de douze colonnes ne tient pas sur un téléphone, et le laisser déborder étire toute la page au lieu de lui seul.",
          ],
        },
      ],
      outro:
        "Déposez le CSV ou collez les lignes directement. Les fichiers sont analysés dans votre navigateur, donc les données de vos clients ne quittent jamais la machine.",
    },
    "excel-to-html-table-formulas": {
      short: "Formules Excel",
      eyebrow: "Guide pratique · Excel → tableau",
      title: "Excel en tableau HTML : que deviennent formules et mise en forme",
      description:
        "Les formules sortent en valeurs calculées, sauf un cas où elles sortent vides. Et ce que deviennent formats monétaires, dates, fusions et feuilles.",
      keywords: [
        "excel en tableau html",
        "xlsx en html",
        "convertir excel en html",
        "formules excel en html",
        "convertir tableau excel en html",
      ],
      h1: "Excel en HTML : formules et mise en forme",
      lede: [
        "Un tableur contient plus que son contenu : des formules derrière les nombres, des formats par-dessus, des fusions en travers. Le HTML n’a rien de tout ça.",
        "La question n’est donc pas de savoir si des choses se perdent, mais lesquelles, et si l’une d’elles est celle dont vous aviez besoin.",
      ],
      tool: "excel-to-html-table",
      sections: [
        {
          heading: "Les formules deviennent leur résultat",
          body: [
            "Une cellule qui contient =SUM(B2:B9) sort en 4211. C’est presque toujours ce que vous voulez sur une page web : une formule sur une page, c’est une chaîne de caractères, et une chaîne qui ressemble à une formule est pire que le nombre.",
            "Ça marche parce qu’Excel garde en cache la valeur calculée à côté de la formule à chaque enregistrement. Le convertisseur lit cette valeur en cache, c’est pourquoi il n’a pas besoin de son propre moteur de formules.",
          ],
          sample: {
            beforeLabel: "Cellule dans Excel",
            before: "B10:  =SUM(B2:B9)",
            afterLabel: "HTML",
            after: "<td>4211</td>",
          },
        },
        {
          heading: "Le seul cas où elles sortent vides",
          body: [
            "Si le classeur a été généré par un script (un export Python, une tâche de reporting, un outil qui utilise une bibliothèque de tableur) et jamais ouvert dans Excel, il n’y a pas de valeur en cache. Personne n’en a écrit. Ces cellules sortent vides.",
            "La solution : ouvrir le fichier dans Excel ou LibreOffice et l’enregistrer une fois. Tout est calculé et les valeurs sont écrites. Le convertisseur vous prévient quand les cellules à formule d’une feuille se lisent vides, pour que vous ne restiez pas à deviner.",
            "Les erreurs de formule sortent aussi vides, au lieu de #DIV/0! ou #REF!. Une feuille avec une recherche cassée sur toute une colonne donne une colonne de vides, donc vérifiez la source quand une colonne sort vide sans raison évidente.",
          ],
        },
        {
          heading: "Les formats de nombre ne survivent pas",
          body: [
            "C’est la surprise qu’il vaut le plus la peine de connaître à l’avance. Un format de nombre est un masque qu’Excel peint par-dessus une valeur ; la valeur en dessous est brute.",
            "Donc $1,234.50 sort en 1234.5 : symbole monétaire, séparateur de milliers et décimales fixes, tout part. Une cellule qui affiche 12.50% sort en 0.125, parce que c’est le nombre qui était là depuis le début.",
            "Si la mise en forme compte dans la sortie, ajoutez une colonne dans le tableur avec la chaîne formatée construite par une formule TEXT(), et utilisez cette colonne à la place. C’est alors une chaîne, et les chaînes passent à l’identique.",
            "Les dates font exception : elles sont détectées par leur format de nombre et sortent en 2026-03-14, avec l’heure ajoutée s’il y en a une. Elles sont relues en UTC exprès : la version naïve recule chaque date d’un jour pour tous ceux qui sont à l’ouest de Greenwich.",
          ],
        },
        {
          heading: "Les cellules fusionnées se séparent",
          body: [
            "Un titre fusionné sur A1:C1 devient une cellule avec le texte et deux cellules vides à côté. Excel garde la valeur dans la cellule en haut à gauche et laisse les autres vraiment vides ; sans l’information de fusion, c’est tout ce qu’il y a à lire.",
            "Le HTML sait exprimer une fusion avec colspan et rowspan, donc la correction tient en une ligne après coup. Ou défusionnez dans Excel d’abord : souvent, les fusions ne servaient qu’à centrer un titre.",
          ],
        },
        {
          heading: "Les feuilles, et les plafonds de taille",
          steps: [
            "La première feuille est convertie par défaut. Les autres sont listées par nom : cochez celles que vous voulez.",
            "Prenez-en plusieurs et chacune sort en <table> séparé, avec au-dessus un <h2> qui porte le nom de la feuille. Prenez-en une seule et le nom va dans le <caption> du tableau.",
            "Une feuille vide une fois les lignes vides de fin retirées vous le signale, au lieu de produire un tableau vide.",
          ],
          body: [
            "Deux limites. 10 Mo par classeur, moins que les 25 Mo des autres formats, parce qu’un .xlsx est un zip et que le décompresser dans un onglet coûte bien plus de mémoire que sa taille ne le laisse penser. Et 100 000 cellules sur l’ensemble de ce que vous avez sélectionné, c’est pourquoi prendre moins de feuilles peut faire passer un gros classeur.",
            "Les classeurs protégés par mot de passe sont refusés plutôt qu’à moitié lus, tout comme les vieux fichiers binaires .xls. Pour ceux-là, enregistrez d’abord en .xlsx.",
          ],
        },
      ],
      outro:
        "Déposez le classeur, choisissez vos feuilles, et copiez le tableau. Tout est lu dans votre navigateur : un modèle financier ne quitte jamais votre machine.",
    },
  },
};

export default fr;
