import type { Dictionary, Faq } from "../types";

const SHARED: Faq[] = [
  {
    q: "¿Se suben mis archivos?",
    a: "No. Todo corre en tu navegador. Tu archivo nunca toca un servidor. Apaga el wifi y pruébalo: sigue funcionando.",
  },
  {
    q: "¿Sobreviven mis tablas?",
    a: "Sí. Salen como tablas Markdown de barras, y las barras dentro de las celdas se escapan. La única excepción son las celdas combinadas: Markdown no tiene sintaxis para eso, así que se aplanan.",
  },
  {
    q: "¿Cuántos archivos a la vez?",
    a: "Sin límite. Suelta cuarenta y hacen fila. Al terminar te los llevas todos en un zip. Cada archivo debe pesar menos de 25 MB.",
  },
];

const LEGACY: Faq = {
  q: "¿Y los .doc antiguos?",
  a: "También funcionan. El .doc es binario de antes de 2007, así que leemos el formato byte a byte en tu navegador. Obtienes texto, títulos, tablas, negrita y cursiva. Dos cosas no vuelven: las imágenes y la numeración exacta de las listas. Si tienes Word a mano, un Guardar como .docx da un resultado más limpio.",
};

const es: Dictionary = {
  htmlLang: "es",
  chrome: {
    eyebrow: "Word → Markdown",
    breadcrumbHome: "inicio",
    keepsHeading: "Qué sobrevive",
    keepsLede:
      "Esto pasa tal cual. Con lo demás hacemos lo posible, y te avisamos cuando algo no cuadra.",
    keepsDocNote:
      "Los .doc antiguos se quedan sin imágenes: ese formato las esconde donde un navegador no llega.",
    keeps: {
      headings: "Niveles de título",
      tables: "Tablas",
      lists: "Listas numeradas y con viñetas",
      links: "Enlaces",
      emphasis: "Negrita / cursiva / tachado",
      quotes: "Citas",
      code: "Bloques de código",
      images: "Imágenes",
    },
    faqHeading: "Lo que suele preguntarse",
    crossHeading: "La misma herramienta, otras puertas",
    startOver: "Volver al inicio",
    startOverNote: "La versión sencilla, sin formato en el nombre",
    footerLeft: "docstomd.com — una herramienta pequeña, hecha por una persona",
    footerRight: "corre en tu navegador · no guarda nada · no rastrea nada",
    langLabel: "Idioma",
    features: [
      "Convertir .docx a Markdown",
      "Convertir .doc antiguo a Markdown",
      "Convertir por lotes y descargar en zip",
      "Corre entero en el navegador, sin subidas",
      "Mantiene tablas, títulos, listas y enlaces",
    ],
  },
  converter: {
    dropTitle: "Suelta aquí un documento de Word.",
    dropActive: "Suéltalo.",
    dropHint:
      "O elígelo con el botón. O pégalo con Ctrl+V. Docenas a la vez está bien.",
    dropMeta:
      ".docx y .doc / 25 MB por archivo / corre en tu navegador, nada se sube",
    pick: "Elegir archivo",
    clear: "Limpiar",
    knobs: "Ajustes",
    bullets: "Viñetas",
    fence: "Cercado",
    images: "Imágenes",
    imageInline: "base64 incrustado",
    imagePlaceholder: "dejar el hueco",
    imageStrip: "quitarlas",
    tables: "Tablas",
    tableKeep: "mantener",
    tableFlatten: "aplanar",
    stale: "Moviste un ajuste. Vuelve a soltar los archivos para aplicarlo.",
    queue: "Cola",
    zip: { one: "zip de {n} archivo", other: "zip de {n} archivos" },
    chewing: "masticando…",
    failed: "falló",
    tooBig: "Más de 25 MB. Demasiado grande.",
    readFail:
      "No se pudo leer. El archivo puede estar dañado o protegido con contraseña.",
    source: "fuente",
    preview: "vista",
    copy: "Copiar",
    copied: "copiado",
    download: "Descargar .md",
    legacyWarn: "Formato .doc antiguo — leímos lo que se pudo",
    styleWarn: {
      one: "{n} estilo de Word no cuadró",
      other: "{n} estilos de Word no cuadraron",
    },
    emptyDoc: "(documento vacío)",
    pickOne: "Elige uno a la izquierda para ver el resultado.",
    chewingFirst: "Masticando el primero…",
    units: {
      words: { one: "{n} palabra", other: "{n} palabras" },
      headings: { one: "{n} título", other: "{n} títulos" },
      tables: { one: "{n} tabla", other: "{n} tablas" },
      images: { one: "{n} imagen", other: "{n} imágenes" },
      links: { one: "{n} enlace", other: "{n} enlaces" },
    },
  },
  pages: {
    home: {
      short: "Inicio",
      title: "Docs to MD — Convierte Word a Markdown, gratis y privado",
      description:
        "Suelta un .docx o un .doc y obtén Markdown limpio. Los títulos, las tablas, las listas y los enlaces sobreviven. Todo corre en tu navegador: tus archivos nunca salen de tu ordenador.",
      keywords: [
        "word a markdown",
        "docx a markdown",
        "convertir word a markdown",
        "doc a md",
        "convertir word a markdown online",
      ],
      h1: ["Saca las palabras de Word.", "Consigue Markdown limpio."],
      lede: [
        "Suelta un archivo. Resultados en unos cientos de milisegundos.",
        "Las tablas y los títulos se quedan en su sitio. Nada se sube.",
      ],
      note: {
        heading: "Sin rodeos",
        items: [
          ".docx y .doc antiguo, sin Guardar como",
          "Sin registro, sin límites, sin marca de agua",
          "Funciona con el wifi apagado",
        ],
      },
      faq: [
        SHARED[0],
        LEGACY,
        SHARED[1],
        {
          q: "¿Qué pasa con las imágenes?",
          a: "Por defecto se incrustan en base64, así un solo .md lo contiene todo. Si eso engorda demasiado el archivo, cambia a «dejar el hueco»: tú tienes la ruta, tú traes la imagen.",
        },
        SHARED[2],
        {
          q: "¿Se traducen todos los estilos de Word?",
          a: "Los que se usan de verdad sí: títulos, listas, negrita, cursiva, tachado, citas, código, enlaces, superíndices y subíndices. Cuando un estilo propio no cuadra, aparece listado encima de tu resultado. No te ocultamos nada.",
        },
      ],
    },
    "docx-to-markdown": {
      short: "DOCX → MD",
      title: "Convertidor DOCX a Markdown — gratis, en tu navegador",
      description:
        "Convierte .docx a Markdown sin subir nada. Títulos, tablas, listas, enlaces y bloques de código pasan limpios. Los .doc antiguos también valen. Convierte por lotes y descarga en zip.",
      keywords: [
        "docx a markdown",
        "convertidor docx a markdown",
        "docx a md",
        "convertir docx a markdown online",
        "docx a markdown gratis",
        "doc a markdown",
      ],
      h1: ["Convierte .docx en Markdown.", "Sin subidas, sin registro."],
      lede: [
        "Hecho para el archivo que Word guarda de verdad. Suéltalo, lee el Markdown, llévatelo.",
        "Todo ocurre en tu máquina.",
      ],
      note: {
        heading: "Lo que te llevas",
        items: [
          "Tablas de barras de verdad, no texto destrozado",
          "Niveles de título como # ## ###",
          "Cuarenta archivos de golpe, un solo zip",
        ],
      },
      faq: [
        {
          q: "¿Qué diferencia hay aquí entre .docx y .doc?",
          a: "Un .docx es un zip lleno de XML, así que se lee limpio y las imágenes vienen incluidas. Un .doc es binario OLE de 1997: también lo analizamos en tu navegador, pero de ahí no se recuperan las imágenes ni la numeración de listas. Misma herramienta; uno es solo un archivo más rico.",
        },
        SHARED[0],
        SHARED[1],
        {
          q: "¿Maneja bloques de código?",
          a: "Sí. Los párrafos con estilo Code o Source Code se convierten en bloques cercados. Elige ``` o ~~~ con el ajuste de cercado.",
        },
        SHARED[2],
        {
          q: "¿Hay una API?",
          a: "Todavía no. Es una herramienta de navegador por diseño: sin servidor no hay API que llamar. Si la necesitas en un script, pandoc hace esto muy bien sin conexión.",
        },
      ],
    },
    "word-to-markdown": {
      short: "Word → MD",
      title: "Convertidor Word a Markdown — gratis, nada se sube",
      description:
        "Convierte un documento de Word a Markdown en tu navegador. Acepta .docx y .doc antiguo. Mantiene títulos, tablas, negrita, enlaces y listas. Sin cuenta, sin subidas, sin juegos con el tamaño del archivo.",
      keywords: [
        "word a markdown",
        "convertidor word a markdown",
        "documento word a markdown",
        "convertir word a markdown gratis",
        "word a md",
        "convertidor doc a markdown",
      ],
      h1: ["Entra un documento de Word.", "Sale Markdown."],
      lede: [
        "Para quien escribe en Word y entrega en Markdown.",
        "Arrastra el archivo. Copia el resultado. Listo en segundos.",
      ],
      note: {
        heading: "Sin rodeos",
        items: [
          "Acepta .docx y .doc antiguo por igual",
          "El formato sobrevive, la basura se cae",
          "Nada se sube, nada se guarda",
        ],
      },
      faq: [
        {
          q: "¿Qué archivos de Word funcionan?",
          a: "Los dos formatos. .docx de Word 2007 en adelante, incluidos Word para Mac y Word Online. El .doc antiguo de Word 97–2003 también, menos las imágenes. Word 6 y 95 son demasiado viejos.",
        },
        SHARED[0],
        {
          q: "¿Y el control de cambios y los comentarios?",
          a: "Se caen los dos. Obtienes el texto final tal como se lee en la página, no el historial de edición. Acepta o rechaza tus cambios en Word antes.",
        },
        SHARED[1],
        {
          q: "¿Pasan las notas al pie?",
          a: "El texto de las notas acaba al final del documento. Los numeritos de referencia no sobreviven como enlaces: las notas al pie de Markdown no están soportadas en todas partes, así que no las fingimos.",
        },
        SHARED[2],
      ],
    },
    "google-docs-to-markdown": {
      short: "Google Docs → MD",
      title: "Google Docs a Markdown — exporta y convierte, gratis",
      description:
        "Convierte un documento de Google en Markdown limpio. Descárgalo como .docx, suéltalo aquí, copia el Markdown. Sin complementos que instalar, sin acceso a tu Drive.",
      keywords: [
        "google docs a markdown",
        "convertidor google docs a markdown",
        "docs a markdown",
        "exportar google docs a markdown",
        "documento de google a md",
      ],
      h1: ["Google Docs a Markdown.", "Dos pasos, sin complementos."],
      lede: [
        "Nunca te pedimos tu Drive. Tú exportas el archivo, nosotros hacemos la conversión.",
        "Así nada tuyo pasa a ser nuestro.",
      ],
      note: {
        heading: "Los dos pasos",
        items: [
          "En tu documento: Archivo → Descargar → Microsoft Word (.docx)",
          "Suelta ese .docx aquí abajo",
          "Sin OAuth, sin permisos, sin complementos",
        ],
      },
      faq: [
        {
          q: "¿Por qué tengo que descargarlo primero?",
          a: "Porque la alternativa es pedirte acceso a todo tu Drive. Exportar te lleva cinco segundos y no nos entrega nada. Ese trato vale la pena.",
        },
        {
          q: "Google Docs ya exporta Markdown, ¿por qué usar esto?",
          a: "Pregunta justa. Si la exportación integrada te sirve, úsala. Esto es para cuando quieres los ajustes: estilo de viñeta, estilo de cercado, si las imágenes se incrustan o dejan hueco, y convertir una carpeta entera de una vez.",
        },
        SHARED[0],
        SHARED[1],
        {
          q: "¿Pasan los comentarios y las sugerencias?",
          a: "No. Obtienes el texto del documento, no la conversación a su alrededor. Resuelve las sugerencias antes de exportar si quieres incluirlas.",
        },
        SHARED[2],
      ],
    },
  },
};

export default es;
