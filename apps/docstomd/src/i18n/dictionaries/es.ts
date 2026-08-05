import { CONTACT_EMAIL } from "@/content/site";
import type { Dictionary, Faq } from "../types";

/** Las dos o tres preguntas que toda página debe tener; el texto no cambia por página. */
const PRIVACY: Faq = {
  q: "¿Se suben mis archivos?",
  a: "No. Todo corre en tu navegador. Tu archivo nunca toca un servidor. Apaga el wifi y pruébalo: sigue funcionando.",
  shared: true,
};

const TABLES: Faq = {
  q: "¿Sobreviven mis tablas?",
  a: "Sí. Salen como tablas Markdown de barras, y las barras dentro de las celdas se escapan. La única excepción son las celdas combinadas: Markdown no tiene sintaxis para eso, así que se aplanan.",
  shared: true,
};

const BATCH: Faq = {
  q: "¿Cuántos archivos a la vez?",
  a: "Sin límite. Suelta cuarenta y hacen fila. Al terminar te los llevas todos en un zip. Cada archivo debe pesar menos de 25 MB.",
  shared: true,
};

const LEGACY: Faq = {
  q: "¿Y los .doc antiguos?",
  a: "También funcionan. El .doc es binario de antes de 2007, así que leemos el formato byte a byte en tu navegador. Obtienes texto, títulos, tablas, negrita y cursiva. Dos cosas no vuelven: las imágenes y la numeración exacta de las listas. Si tienes Word a mano, un Guardar como .docx da un resultado más limpio.",
  shared: true,
};

/** Suelta, convierte, llévatelo. Los tres pasos son iguales; solo cambia el tipo de archivo. */
const steps = (what: string) => [
  `Suelta tu ${what} en la caja de arriba, o haz clic para elegirlo. Docenas a la vez está bien.`,
  "La conversión empieza en cuanto el archivo aterriza: sin botón, sin cola en un servidor. Tarda unos cientos de milisegundos.",
  "Lee el Markdown, mueve los ajustes si quieres otro estilo de viñeta o cercado, y luego cópialo o descarga el .md.",
];

const es: Dictionary = {
  htmlLang: "es",
  chrome: {
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
    footerLegal: "Las páginas formales",
    legalContactCue: "¿Algo aquí no queda claro, o hay algo que quieres que cambiemos?",
    legalUpdated: "En vigor desde",
    guide: {
      cta: "Abrir el conversor",
      pairedWith: "Usa",
      moreHeading: "Las otras guías",
    },
    features: [
      "Convertir .docx a Markdown",
      "Convertir .doc antiguo a Markdown",
      "Convertir PDF, HTML, CSV y Excel a Markdown",
      "Convertir por lotes y descargar en zip",
      "Corre entero en el navegador, sin subidas",
      "Mantiene tablas, títulos, listas y enlaces",
    ],
  },
  converter: {
    dropTitle: "Suelta un archivo aquí.",
    dropActive: "Suéltalo.",
    dropHint:
      "O elígelo con el botón. O pégalo con Ctrl+V. Docenas a la vez está bien.",
    dropMeta: "25 MB por archivo / corre en tu navegador, nada se sube",
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
    stale:
      "Moviste un ajuste. Los demás resultados son de la configuración anterior: vuelve a convertirlos para aplicarlo.",
    queue: "Cola",
    zip: { one: "zip de {n} archivo", other: "zip de {n} archivos" },
    chewing: "masticando…",
    failed: "falló",
    tooBig: "Más de 25 MB. Demasiado grande.",
    readFail:
      "No se pudo leer. El archivo puede estar dañado o protegido con contraseña.",
    wrongType: "Esta página no acepta archivos {ext}. Esta sí:",
    wrongTypeNowhere:
      "Esta página no acepta archivos {ext}. Este sitio convierte Word, PDF, Excel, CSV y HTML — no {ext}.",
    pastedName: "contenido pegado",
    typedName: "texto pegado",
    pasteHeading: "O pégalo aquí",
    pastePlaceholderHtml:
      "<h1>Pega aquí el código HTML</h1>\n<p>Los scripts y los atributos de evento se quitan antes de leer nada.</p>",
    pastePlaceholderCsv: "nombre,puesto,ciudad\nAda,ingeniera,Londres\nGrace,almiranta,Arlington",
    pasteRun: "Convertir",
    pasteClear: "Limpiar",
    header: "Fila de encabezado",
    headerFirstRow: "primera fila",
    headerNone: "ninguna",
    align: "Alineación",
    alignNone: "por defecto",
    alignLeft: "izquierda",
    alignCenter: "centro",
    alignRight: "derecha",
    delimiter: "Delimitador",
    delimiterAuto: "automático",
    delimiterComma: "coma",
    delimiterSemicolon: "punto y coma",
    delimiterTab: "tabulador",
    delimiterPipe: "barra",
    pageMarks: "Marcas de página",
    pageMarksOn: "marcar páginas",
    pageMarksOff: "no",
    sheets: "Hojas",
    sheetsAll: "seleccionar todas",
    sheetMeta: { one: "{n} fila", other: "{n} filas" },
    source: "fuente",
    preview: "vista",
    copy: "Copiar",
    copied: "copiado",
    download: "Descargar .md",
    legacyWarn: "Formato .doc antiguo — leímos lo que se pudo",
    styleWarn: {
      one: "{n} cosa que conviene saber de esta conversión",
      other: "{n} cosas que conviene saber de esta conversión",
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
      eyebrow: "Documentos → Markdown",
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
      body: {
        stepsHeading: "Cómo funciona",
        steps: steps("documento de Word"),
        supportedHeading: "Qué admite",
        supported: [
          ".docx de Word 2007 en adelante, incluidos Word para Mac y Word Online",
          ".doc antiguo de Word 97–2003, leído byte a byte en el navegador",
          "Títulos, tablas, listas, enlaces, negrita, cursiva, tachado, citas y bloques de código",
          "Imágenes incrustadas en base64, reducidas a una ruta o eliminadas: tú decides",
          "Conversión por lotes con una sola descarga en zip",
        ],
        limitsHeading: "Qué no hace",
        limits: [
          "El control de cambios y los comentarios se caen: obtienes el texto final, no el historial de edición",
          "Las celdas combinadas se aplanan; Markdown no tiene sintaxis para ellas",
          "El texto de las notas al pie acaba al final, sin numeritos enlazados",
          "Los archivos protegidos con contraseña no se pueden abrir: quítala primero",
          "Los demás formatos tienen su propia página: PDF, HTML, CSV y Excel",
        ],
      },
      faq: [
        PRIVACY,
        LEGACY,
        TABLES,
        {
          q: "¿Qué pasa con las imágenes?",
          a: "Por defecto se incrustan en base64, así un solo .md lo contiene todo. Si eso engorda demasiado el archivo, cambia a «dejar el hueco»: tú tienes la ruta, tú traes la imagen.",
        },
        BATCH,
        {
          q: "¿Se traducen todos los estilos de Word?",
          a: "Los que se usan de verdad sí: títulos, listas, negrita, cursiva, tachado, citas, código, enlaces, superíndices y subíndices. Cuando un estilo propio no cuadra, aparece listado encima de tu resultado. No te ocultamos nada.",
        },
      ],
    },
    "docx-to-markdown": {
      short: "DOCX → MD",
      eyebrow: "DOCX → Markdown",
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
      body: {
        stepsHeading: "Cómo funciona",
        steps: steps("archivo .docx"),
        supportedHeading: "Qué admite",
        supported: [
          "Todos los .docx que Word ha escrito desde 2007, más Word Online y Word para Mac",
          ".doc antiguo de propina: el formato se detecta por la cabecera del archivo, no por la extensión",
          "Niveles de título, tablas de barras, listas anidadas, enlaces, formato en línea y bloques de código",
          "Imágenes incrustadas, en base64 o reducidas a una ruta",
          "Docenas de archivos de una vez, descargables en un solo zip",
        ],
        limitsHeading: "Qué no hace",
        limits: [
          "Las celdas combinadas se aplanan: las tablas de barras no pueden expresarlas",
          "El control de cambios, los comentarios y el historial de revisiones se caen",
          "Cuadros de texto, SmartArt y gráficos no pasan; como mucho, su texto",
          "Los documentos cifrados se rechazan en lugar de leerse a medias",
          "Archivos de más de 25 MB, y cualquiera cuya tasa de compresión parezca una bomba zip",
        ],
      },
      faq: [
        {
          q: "¿Qué diferencia hay aquí entre .docx y .doc?",
          a: "Un .docx es un zip lleno de XML, así que se lee limpio y las imágenes vienen incluidas. Un .doc es binario OLE de 1997: también lo analizamos en tu navegador, pero de ahí no se recuperan las imágenes ni la numeración de listas. Misma herramienta; uno es solo un archivo más rico.",
        },
        PRIVACY,
        TABLES,
        {
          q: "¿Maneja bloques de código?",
          a: "Sí. Los párrafos con estilo Code o Source Code se convierten en bloques cercados. Elige ``` o ~~~ con el ajuste de cercado.",
        },
        BATCH,
        {
          q: "¿Hay una API?",
          a: "Todavía no. Es una herramienta de navegador por diseño: sin servidor no hay API que llamar. Si la necesitas en un script, pandoc hace esto muy bien sin conexión.",
        },
      ],
    },
    "word-to-markdown": {
      short: "Word → MD",
      eyebrow: "Word → Markdown",
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
      body: {
        stepsHeading: "Cómo funciona",
        steps: steps("archivo de Word"),
        supportedHeading: "Qué admite",
        supported: [
          "Los dos formatos de Word: .docx de 2007 en adelante y .doc de Word 97–2003",
          "Archivos de Word para Mac y Word Online, que son .docx con otra insignia",
          "Títulos como # ## ###, tablas de barras de verdad, listas numeradas y con viñetas",
          "Negrita, cursiva, tachado, superíndice, subíndice, enlaces y citas",
          "Una carpeta entera de una vez, todo en un zip",
        ],
        limitsHeading: "Qué no hace",
        limits: [
          "Los archivos de Word 6 y Word 95 son demasiado viejos para leerse",
          "Las imágenes no salen de un .doc: ese formato las esconde donde un navegador no llega",
          "Encabezados, pies y números de página son mobiliario de la página, no contenido, así que se van",
          "Los comentarios y los cambios registrados se caen; acéptalos o recházalos en Word antes",
          "Las columnas, el ajuste de texto y los saltos de página no tienen equivalente en Markdown",
        ],
      },
      faq: [
        {
          q: "¿Qué archivos de Word funcionan?",
          a: "Los dos formatos. .docx de Word 2007 en adelante, incluidos Word para Mac y Word Online. El .doc antiguo de Word 97–2003 también, menos las imágenes. Word 6 y 95 son demasiado viejos.",
        },
        PRIVACY,
        {
          q: "¿Y el control de cambios y los comentarios?",
          a: "Se caen los dos. Obtienes el texto final tal como se lee en la página, no el historial de edición. Acepta o rechaza tus cambios en Word antes.",
        },
        TABLES,
        {
          q: "¿Pasan las notas al pie?",
          a: "El texto de las notas acaba al final del documento. Los numeritos de referencia no sobreviven como enlaces: las notas al pie de Markdown no están soportadas en todas partes, así que no las fingimos.",
        },
        BATCH,
      ],
    },
    "pdf-to-markdown": {
      short: "PDF → MD",
      eyebrow: "PDF → Markdown",
      title: "Convertidor PDF a Markdown — gratis, sin subidas, sin OCR",
      description:
        "Extrae el texto de un PDF como Markdown, en tu propio navegador. Los títulos y los párrafos se reconstruyen a partir del tamaño de letra y el espaciado. Solo PDF con capa de texto: los escaneos necesitan OCR, y esta herramienta no lo hace.",
      keywords: [
        "pdf a markdown",
        "convertidor pdf a markdown",
        "pdf a md",
        "convertir pdf a markdown online",
        "extraer texto de pdf a markdown",
        "pdf a markdown gratis",
      ],
      h1: ["Saca el texto de un PDF.", "Como Markdown, no como un caos."],
      lede: [
        "Un PDF no tiene títulos: tiene instrucciones para pintar glifos en unas coordenadas.",
        "Así que reconstruimos la estructura a partir del tamaño de letra y el espaciado. Y decimos dónde eso es una conjetura.",
      ],
      note: {
        heading: "Lee esto primero",
        items: [
          "Solo PDF con capa de texto: en un escaneo no hay texto que extraer",
          "Sin OCR, y no vamos a fingir lo contrario",
          "Los títulos y los párrafos se deducen, no se leen",
        ],
      },
      body: {
        stepsHeading: "Cómo funciona",
        steps: [
          "Suelta un PDF en la caja de arriba. Se analiza con pdf.js de Mozilla, y tanto la biblioteca como sus fuentes se sirven desde este sitio: no se pide nada a ninguna CDN.",
          "El texto se extrae página a página en orden de lectura. El tamaño de letra decide qué es un título; los huecos verticales, dónde rompen los párrafos; la letra pequeña pegada al borde superior o inferior se trata como encabezado o pie y se descarta.",
          "Activa las marcas de página si quieres un comentario HTML entre páginas. Luego copia el Markdown o descarga el .md.",
        ],
        supportedHeading: "Qué admite",
        supported: [
          "Cualquier PDF con capa de texto real: exportado desde Word, LaTeX, Pages o el Imprimir a PDF de un navegador",
          "Texto en chino, japonés y coreano, mediante las tablas CMap que este sitio incluye",
          "Títulos deducidos del tamaño de letra, en tres niveles relativos",
          "Listas con viñetas y numeradas, detectadas por sus caracteres iniciales",
          "Palabras partidas con guion al final de línea, reunidas en una sola",
          "Marcas de separación de página opcionales, y hasta 500 páginas por archivo",
        ],
        limitsHeading: "Qué no hace",
        limits: [
          "Los PDF escaneados no dan nada. Si no se encuentra texto, te diremos que el archivo es probablemente un escaneo.",
          "Sin OCR. Leer fotografías de texto necesita otra herramienta por completo.",
          "Las maquetaciones a varias columnas, las tablas complejas y las fórmulas son, como mucho, un intento",
          "Los PDF cifrados o protegidos con contraseña se rechazan: aquí no hay dónde escribir una contraseña",
          "Las imágenes, los colores y la posición exacta desaparecen; Markdown no tiene manera de guardarlos",
          "Archivos de más de 25 MB, o documentos de más de 500 páginas",
        ],
      },
      faq: [
        {
          q: "¿Por qué mi PDF escaneado sale vacío?",
          a: "Porque no hay nada que extraer. Un escaneo es la fotografía de una página: las letras son píxeles, no caracteres. Leerlas necesita OCR, que esta herramienta no hace, y preferimos decirlo antes que darte un archivo vacío sin explicación.",
        },
        {
          q: "¿Cómo sé si mi PDF tiene capa de texto?",
          a: "Ábrelo en cualquier visor e intenta seleccionar una frase con el ratón. Si el texto se resalta, hay capa de texto y esto funcionará. Si te sale un rectángulo sobre toda la página, es un escaneo.",
        },
        PRIVACY,
        {
          q: "¿Por qué están mal los niveles de título?",
          a: "Porque un PDF no los registra. Los adivinamos por el tamaño de letra: un poco más grande que el cuerpo se vuelve ###; mucho más grande, #. Lo que sobrevive es la estructura relativa, qué títulos están al mismo nivel. Puede que tengas que mover algunos a mano.",
        },
        {
          q: "¿Qué pasa con las tablas?",
          a: "Normalmente, poco bueno. Una tabla en un PDF suele ser texto en unas coordenadas con líneas dibujadas alrededor: no hay ninguna cuadrícula que leer. Las sencillas pueden salir como líneas de texto normal. Si la tabla importa y tienes la hoja de cálculo original, la página de Excel o de CSV lo hará mucho mejor.",
        },
        {
          q: "¿Dónde han ido los números de página?",
          a: "Se descartan a propósito. La letra pequeña clavada en el margen superior o inferior es mobiliario de la página: números, títulos de página, sellos de «Confidencial». Repetida en cada página, destrozaría la prosa. Activa las marcas de página si necesitas saber dónde acababa cada una.",
        },
      ],
    },
    "excel-to-markdown": {
      short: "Excel → MD",
      eyebrow: "Excel → Markdown",
      title: "Convertidor Excel a tabla Markdown — gratis, en tu navegador",
      description:
        "Convierte un libro .xlsx en tablas Markdown. Elige las hojas que quieras y define la fila de encabezado y la alineación de las columnas. Corre en tu navegador: el archivo nunca se sube.",
      keywords: [
        "excel a markdown",
        "excel a tabla markdown",
        "xlsx a markdown",
        "convertir excel a markdown online",
        "hoja de cálculo a markdown",
        "excel a md",
      ],
      h1: ["Hoja de cálculo a tabla Markdown.", "Elige tus hojas."],
      lede: [
        "Suelta un .xlsx y obtén una tabla de barras en regla por cada hoja que quieras.",
        "Recibes los valores tal como se muestran, no las fórmulas que hay detrás.",
      ],
      note: {
        heading: "Conviene saberlo",
        items: [
          "Libros con varias hojas: elige qué incluir",
          "Valores de las celdas, no el código de las fórmulas",
          "10 MB y 100.000 celdas por conversión",
        ],
      },
      body: {
        stepsHeading: "Cómo funciona",
        steps: [
          "Suelta un .xlsx en la caja de arriba. Los nombres de las hojas se leen del libro y se te muestran en una lista.",
          "La primera hoja se convierte al instante. Haz clic en los nombres para añadirlas o quitarlas: el archivo solo se lee una vez, así que cambiar es inmediato.",
          "Define si la primera fila es el encabezado y cómo se alinean las columnas, y luego copia el Markdown o descarga el .md.",
        ],
        supportedHeading: "Qué admite",
        supported: [
          "Libros .xlsx de Excel 2007 en adelante, y de LibreOffice, Numbers y exportaciones de Google Sheets",
          "Varias hojas: cada una se convierte en su propia tabla bajo un título ##",
          "Los valores mostrados: una celda con fórmula te da 42, no =SUMA(A1:A9)",
          "Fechas escritas como fechas ISO normales, no como números de serie",
          "Celdas con barras o saltos de línea, escapadas para que la tabla no se rompa",
          "Fila de encabezado activada o no, y alineación de columnas a la izquierda, al centro o a la derecha",
        ],
        limitsHeading: "Qué no hace",
        limits: [
          "Archivos de más de 10 MB, o selecciones de más de 100.000 celdas",
          "El .xls antiguo es un formato distinto y mucho más viejo, y aquí no se lee",
          "Los libros protegidos con contraseña se rechazan: guarda una copia sin ella",
          "Celdas combinadas, colores, tipos de letra, formato condicional, gráficos y tablas dinámicas se van; Markdown no tiene sintaxis para nada de eso",
          "Una celda con fórmula de un archivo generado por un programa y nunca abierto en Excel puede no tener valor en caché, y sale vacía",
        ],
      },
      faq: [
        {
          q: "¿Recibo la fórmula o el resultado?",
          a: "El resultado. Excel guarda en el archivo tanto la fórmula como su último resultado calculado; nosotros leemos el resultado. =SUMA(A1:A9) se convierte en 42. Es casi siempre lo que se quiere de una tabla.",
        },
        {
          q: "¿Por qué está vacía una celda con fórmula?",
          a: "Porque el resultado en caché no está en el archivo. Excel lo escribe cada vez que guarda, pero un libro generado por un script y nunca abierto en Excel puede no tenerlo. Ábrelo en Excel, guarda y vuelve a intentarlo.",
        },
        {
          q: "¿Puedo convertir varias hojas a la vez?",
          a: "Sí. En cuanto se lee el archivo aparecen todas las hojas, y puedes seleccionar cuantas quieras. Cada una se convierte en su propia tabla con el nombre de la hoja como título encima.",
        },
        PRIVACY,
        {
          q: "¿Qué pasa con las celdas combinadas?",
          a: "Se aplanan. Una tabla de barras de Markdown es una cuadrícula simple: todas las filas tienen el mismo número de celdas y no existe colspan. El valor acaba en una celda y las demás salen vacías.",
        },
        {
          q: "¿Por qué el límite de 100.000 celdas?",
          a: "Más allá, dibujar la vista previa en el navegador empieza a arrastrarse, y una tabla Markdown tan larga tampoco se puede leer. Si te pasas, elige menos hojas.",
        },
      ],
    },
    "csv-to-markdown": {
      short: "CSV → MD",
      eyebrow: "CSV → Markdown",
      title: "Convertidor CSV a tabla Markdown — gratis, pega o sube",
      description:
        "Convierte CSV en una tabla Markdown. Pégalo o suelta un archivo; las comas, los puntos y comas y los tabuladores se detectan automáticamente. Los campos entrecomillados con comas y saltos de línea se tratan bien.",
      keywords: [
        "csv a markdown",
        "csv a tabla markdown",
        "convertir csv a markdown",
        "tsv a markdown",
        "csv a md",
        "csv a markdown online",
      ],
      h1: ["CSV a una tabla Markdown.", "Pégalo o suéltalo."],
      lede: [
        "Comas entrecomilladas, saltos de línea dentro de una celda, exportaciones europeas con punto y coma: todo se trata.",
        "El delimitador se detecta por ti, o lo eliges tú.",
      ],
      note: {
        heading: "Conviene saberlo",
        items: [
          "Coma, punto y coma, tabulador y barra, detectados automáticamente",
          "Campos entrecomillados con comas y saltos de línea, bien interpretados",
          "Tus valores se quedan exactamente como los escribiste",
        ],
      },
      body: {
        stepsHeading: "Cómo funciona",
        steps: [
          "Pega tu CSV en la caja, o suelta un archivo .csv o .tsv arriba. En ambos casos se procesa en tu navegador.",
          "El delimitador se detecta automáticamente: coma, punto y coma, tabulador o barra. Defínelo tú si la deducción falla.",
          "Elige si la primera fila es el encabezado y cómo se alinean las columnas, y luego copia el Markdown o descarga el .md.",
        ],
        supportedHeading: "Qué admite",
        supported: [
          "Archivos separados por coma, punto y coma, tabulador y barra, detectados o elegidos a mano",
          "Entrecomillado según RFC 4180: comas dentro de campos entrecomillados, comillas dobladas, saltos de línea dentro de una celda",
          "Exportaciones con punto y coma de configuraciones regionales donde la coma es el separador decimal",
          "Una marca de orden de bytes al inicio del archivo, que se quita para que no se pegue al primer encabezado",
          "Filas desiguales: las cortas se rellenan hasta la más ancha y se te avisa de que ocurrió",
          "Fila de encabezado activada o no, y alineación de columnas a la izquierda, al centro o a la derecha",
        ],
        limitsHeading: "Qué no hace",
        limits: [
          "En esta versión, solo texto UTF-8: otras codificaciones pueden salir con caracteres extraños",
          "Hasta 100.000 celdas y 25 MB de texto por conversión",
          "Los valores nunca se reinterpretan: 007 sigue siendo 007 y 1-2 sigue siendo 1-2, ni número ni fecha",
          "Sin ordenar, filtrar ni calcular columnas: convierte, no computa",
          "Un archivo realmente mal formado, con comillas sin cerrar, puede partirse en sitios inesperados",
        ],
      },
      faq: [
        {
          q: "Mi archivo usa punto y coma. ¿Funcionará?",
          a: "Sí. Las exportaciones con punto y coma son lo normal donde la coma es el separador decimal, y el delimitador se detecta automáticamente. Verás una nota que dice cuál se encontró. También puedes definirlo a mano.",
        },
        {
          q: "¿Y las comas dentro de una celda?",
          a: "Se tratan bien, siempre que el campo esté entrecomillado, que es lo que hace cualquier escritor de CSV correcto. \"Pérez, Juan\" sigue siendo una celda. Los saltos de línea dentro de un campo entrecomillado también valen: se convierten en <br> en la tabla, porque un salto de verdad partiría la fila en dos.",
        },
        {
          q: "¿Por qué sobrevivieron mis ceros iniciales?",
          a: "Porque no reinterpretamos tus valores. Convertir 007 en 7 o 1-2 en una fecha es el peor vicio de una hoja de cálculo. Lo que escribiste es lo que recibes.",
        },
        PRIVACY,
        {
          q: "¿Puedo convertir sin fila de encabezado?",
          a: "Sí, desactiva el ajuste de encabezado. Ten en cuenta que una tabla Markdown tiene que llevar fila de encabezado —es la sintaxis, no hay alternativa—, así que recibes una vacía y todas tus filas van al cuerpo.",
        },
        {
          q: "¿Admite TSV?",
          a: "Sí. Los archivos separados por tabuladores son CSV con otro delimitador, y el tabulador es uno de los cuatro que se detectan. Suelta un .tsv o pega el contenido directamente.",
        },
      ],
    },
    "html-to-markdown": {
      short: "HTML → MD",
      eyebrow: "HTML → Markdown",
      title: "Convertidor HTML a Markdown — gratis, seguro, en tu navegador",
      description:
        "Convierte HTML en Markdown limpio. Pega el código o suelta un archivo .html. Los scripts, los atributos de evento y las etiquetas peligrosas se quitan antes de leer nada. Con tablas al estilo de GitHub.",
      keywords: [
        "html a markdown",
        "convertidor html a markdown",
        "convertir html a markdown",
        "html a md",
        "html a markdown online",
        "página web a markdown",
      ],
      h1: ["HTML a Markdown.", "Saneado por el camino."],
      lede: [
        "Pega el código o suelta una página guardada. Sale Markdown al estilo de GitHub.",
        "Los scripts y los atributos de evento se quitan primero: el HTML no confiable nunca llega a la página.",
      ],
      note: {
        heading: "Conviene saberlo",
        items: [
          "Scripts, atributos onclick y enlaces javascript: eliminados",
          "Las tablas salen como tablas de barras GFM",
          "Pega desde cualquier página, o suelta un archivo .html",
        ],
      },
      body: {
        stepsHeading: "Cómo funciona",
        steps: [
          "Pega el código HTML en la caja, o suelta un archivo .html arriba. También puedes copiar de una página ya dibujada y pulsar Ctrl+V en cualquier parte de esta página.",
          "El HTML se sanea primero con DOMPurify: las etiquetas script, los atributos de evento, las URL javascript:, los iframes y los embeds se quitan antes de convertir, y nada sin sanear se inserta jamás en esta página.",
          "Lo que queda se convierte en Markdown al estilo de GitHub. Cópialo o descarga el .md.",
        ],
        supportedHeading: "Qué admite",
        supported: [
          "Código HTML pegado, archivos .html y .htm guardados, y texto con formato copiado directamente de una página web",
          "Títulos, párrafos, listas, enlaces, imágenes, citas y código preformateado",
          "Tablas como tablas de barras al estilo de GitHub, incluidos el tachado y las listas de tareas",
          "Listas anidadas, y formato en línea dentro de las celdas de una tabla",
          "Documentos completos igual que fragmentos: no se exige un body",
        ],
        limitsHeading: "Qué no hace",
        limits: [
          "Los scripts, los atributos de evento, los iframes, los objects y los embeds se eliminan, no se convierten",
          "El CSS no se aplica: un elemento con estilo de título sigue siendo un párrafo en el HTML, y así se queda",
          "No descarga nada: las URL relativas de imágenes y enlaces siguen siendo relativas, y no se baja ninguna página por ti",
          "La maquetación hecha con divs y CSS grid se aplana en bloques simples",
          "Formularios, botones y componentes interactivos no tienen equivalente en Markdown",
        ],
      },
      faq: [
        {
          q: "¿Es seguro pegar HTML de cualquier sitio?",
          a: "Para eso está hecho. Toda entrada pasa por DOMPurify antes de convertirse: las etiquetas script, los atributos tipo onclick, las URL javascript:, los iframes y los embeds desaparecen. Nada sin sanear se pone jamás en el DOM de esta página, así que el HTML pegado no puede ejecutarse.",
        },
        {
          q: "¿Puedo darle una URL?",
          a: "No, y es a propósito. Descargar una página por ti significaría un servidor haciendo peticiones en tu nombre: lo contrario de cómo funciona este sitio. Abre la página tú, copia lo que quieras y pégalo aquí.",
        },
        PRIVACY,
        TABLES,
        {
          q: "¿Por qué mi texto con estilo no es un título?",
          a: "Porque el CSS no forma parte de la conversión. Si la página usó un div con letra grande en lugar de un h2, el HTML dice párrafo y el Markdown también. Las páginas hechas con etiquetas de título reales se convierten mucho mejor.",
        },
        {
          q: "¿Funciona copiar de una página ya dibujada?",
          a: "Sí. Cuando copias de una página web, tu navegador pone en el portapapeles una versión HTML junto al texto plano. Pulsa Ctrl+V en cualquier parte de esta página y es ese HTML el que se convierte, con formato y enlaces incluidos.",
        },
      ],
    },
    "google-docs-to-markdown": {
      short: "Google Docs → MD",
      eyebrow: "Google Docs → Markdown",
      title: "Google Docs a Markdown — exporta y convierte, gratis",
      description:
        "Convierte un documento de Google en Markdown limpio. Cópialo y pégalo directamente, o descárgalo como .docx y suéltalo aquí. Sin complementos que instalar, sin acceso a tu Drive.",
      keywords: [
        "google docs a markdown",
        "convertidor google docs a markdown",
        "docs a markdown",
        "exportar google docs a markdown",
        "documento de google a md",
      ],
      h1: ["Google Docs a Markdown.", "Sin complementos ni acceso a Drive."],
      lede: [
        "Nunca te pedimos tu Drive. Tú copias o exportas, nosotros hacemos la conversión.",
        "Así nada tuyo pasa a ser nuestro.",
      ],
      note: {
        heading: "Dos maneras de entrar",
        items: [
          "Selecciona todo en tu documento, copia y pega aquí con Ctrl+V",
          "O bien: Archivo → Descargar → Microsoft Word (.docx), y suéltalo aquí abajo",
          "Sin OAuth, sin permisos, sin complementos",
        ],
      },
      body: {
        stepsHeading: "Cómo funciona",
        steps: [
          "La vía rápida: abre tu documento, selecciona todo, copia. Luego pulsa Ctrl+V en cualquier parte de esta página: el portapapeles lleva una versión con formato, y eso es lo que se convierte.",
          "La vía completa: Archivo → Descargar → Microsoft Word (.docx), y suelta ese archivo en la caja de arriba. Por aquí pasan las imágenes, y los documentos largos mantienen mejor su estructura.",
          "En cualquier caso, lee el Markdown y luego cópialo o descarga el .md.",
        ],
        supportedHeading: "Qué admite",
        supported: [
          "Pegar directamente desde un documento, usando el texto con formato que tu navegador pone en el portapapeles",
          "Exportaciones .docx descargadas, que es la vía más completa",
          "Títulos, listas, tablas, enlaces, negrita, cursiva y tachado",
          "Imágenes, cuando vas por la vía de la exportación .docx",
          "Varios documentos exportados a la vez, todo en un zip",
        ],
        limitsHeading: "Qué no hace",
        limits: [
          "Sin conexión con tu cuenta de Google: nada de aquí puede ver tu Drive",
          "Los comentarios y las ediciones sugeridas se caen; resuélvelos antes de exportar",
          "Al pegar no vienen las imágenes, porque el portapapeles solo las referencia en los servidores de Google",
          "Gráficos, dibujos y chips inteligentes pasan como texto plano en el mejor de los casos",
          "Encabezados, pies y números de página son mobiliario de la página y se van",
        ],
      },
      faq: [
        {
          q: "¿Tengo que descargar el archivo primero?",
          a: "No: copiar y pegar suele bastar. Selecciona todo en tu documento, copia y pulsa Ctrl+V aquí. Descárgalo como .docx cuando también quieras las imágenes, o cuando el documento sea lo bastante largo para que importe la estructura.",
        },
        {
          q: "¿Por qué no os conectáis directamente a mi Drive?",
          a: "Porque supondría pedir acceso a todos tus archivos, y mantener un servidor que guarde un token para ellos. Un copiar y pegar te cuesta dos segundos y no nos entrega nada. Ese trato vale la pena.",
        },
        {
          q: "Google Docs ya exporta Markdown, ¿por qué usar esto?",
          a: "Pregunta justa. Si la exportación integrada te sirve, úsala. Esto es para cuando quieres los ajustes: estilo de viñeta, estilo de cercado, si las imágenes se incrustan o dejan hueco, y convertir una carpeta entera de una vez.",
        },
        PRIVACY,
        {
          q: "¿Pasan los comentarios y las sugerencias?",
          a: "No. Obtienes el texto del documento, no la conversación a su alrededor. Resuelve las sugerencias antes de exportar si quieres incluirlas.",
        },
        BATCH,
      ],
    },
  },
  legal: {
    about: {
      short: "Acerca de",
      eyebrow: "Sobre este sitio",
      title: "Acerca de Docs to MD — quién lo hace y por qué",
      description:
        "Docs to MD es un convertidor de documentos gratuito que corre en el navegador, hecho por un desarrollador independiente. Sin cuentas, sin subidas, sin rastreo. Aquí está cómo funciona y por qué se hizo así.",
      h1: "Una herramienta pequeña, y el razonamiento detrás",
      lede: [
        "Docs to MD convierte documentos a Markdown. Eso es todo el producto.",
        "Lo hace y lo mantiene un desarrollador independiente, y corre por completo dentro de tu navegador.",
      ],
      sections: [
        {
          heading: "Por qué existe",
          body: [
            "Escribir pasa en Word, en Google Docs y en hojas de cálculo. Publicar pasa en Markdown: en un sitio estático, un wiki, un README, una carpeta docs de un repositorio git. Ese hueco se cruza a mano más veces de las que debería, y hacerlo a mano significa volver a teclear títulos, rearmar tablas y reponer enlaces uno por uno.",
            "Convertidores que hagan esto no faltan. Casi todos funcionan igual: subes tu archivo a un servidor, allí un programa lo convierte y tú descargas el resultado. Es un diseño razonable, y también un diseño en el que tu documento pasa un rato en la computadora de otra persona. Para el borrador de un blog está bien. Para un contrato, un expediente médico, un conjunto de cifras internas o un manuscrito sin publicar, no.",
            "Así que este sitio está hecho al revés. La conversión corre en tu navegador, con JavaScript, en tu propia máquina. No hay paso de subida porque no hay ningún lugar al que subir.",
          ],
        },
        {
          heading: "Cómo funciona de verdad",
          body: [
            "Cuando sueltas un archivo, tu navegador lo lee localmente y le pasa los bytes a un analizador que también corre en tu navegador. El analizador convierte el documento en una estructura, y esa estructura se escribe como Markdown. Todo ocurre entre tu archivo y tu pantalla.",
            "Los analizadores son bibliotecas de código abierto, una por formato:",
          ],
          items: [
            "Mammoth lee .docx. El .doc antiguo lo analiza nuestro propio lector, byte a byte, porque es un formato binario anterior a 2007 y no existe biblioteca que corra en un navegador.",
            "pdf.js de Mozilla lee los PDF. Tanto la biblioteca como sus fuentes y tablas de caracteres se sirven desde este sitio y no desde un CDN: un analizador de documentos que va a pedirle cosas a terceros anularía el sentido de todo esto.",
            "DOMPurify limpia el HTML antes de que se lea nada, y Turndown convierte el HTML limpio a Markdown.",
            "Papa Parse lee CSV y TSV; read-excel-file lee libros .xlsx.",
          ],
        },
        {
          heading: "Lo que deliberadamente no hace",
          body: [
            "No hay cuentas, porque no hay nada que guardar. No hay API, porque no hay servidor al que llamar. No hay OCR, así que los PDF escaneados no funcionan, y la herramienta lo dice en vez de entregarte un archivo vacío. No hay conexión con Google Drive, porque eso implicaría pedir acceso a todos tus archivos y guardar un token para ellos.",
            "Cada conversión tiene además límites reales, y cada página de herramienta lista los suyos. Las celdas combinadas se aplanan, porque las tablas de barras de Markdown no pueden expresarlas. Los cambios rastreados se descartan. Los niveles de título de un PDF se infieren del tamaño de letra, no se leen, porque un PDF no los registra. Eso se dice por adelantado, no se descubre después de convertir algo importante.",
          ],
        },
        {
          heading: "Cómo se paga",
          body: [
            "La herramienta es gratuita y no tiene plan de pago. El plan es cubrir el alojamiento con publicidad, así que en el futuro puede que veas anuncios en estas páginas. Los anuncios nunca se colocarán donde puedan confundirse con un botón de descarga o de convertir, y no se insertarán después de una conversión de forma que la página se mueva bajo tu cursor.",
            "La publicidad no cambia cómo funciona la conversión. Tus archivos se quedan en tu máquina de todos modos: eso no es una decisión de política que pueda revertirse por ingresos, es la consecuencia de que no haya servidor en primer lugar.",
          ],
        },
        {
          heading: "El sitio hermano",
          body: [
            "Docs2HTML hace el mismo trabajo en la dirección contraria: Markdown, DOCX, CSV y Excel a HTML. Mismo enfoque, mismo modelo de privacidad, formato de salida distinto.",
          ],
        },
      ],
    },
    contact: {
      short: "Contacto",
      eyebrow: "Escríbenos",
      title: "Contacto — Docs to MD",
      description:
        "Escríbenos por un archivo que no convierte, una traducción que se lee mal, un error o una función que quieres. Una sola persona lee todo.",
      h1: "Escríbenos",
      lede: [
        "Una sola persona lee este buzón, así que las respuestas no son inmediatas, pero son respuestas de verdad, no un número de ticket.",
        `Correo: ${CONTACT_EMAIL}`,
      ],
      sections: [
        {
          heading: "Un archivo no convierte",
          body: [
            "Es lo más útil que puedes reportar, y también lo más difícil, porque no podemos ver tu archivo. Así que descríbelo en lugar de enviarlo:",
          ],
          items: [
            "En qué página estabas y cuál es la extensión del archivo",
            "Qué esperabas y qué obtuviste: un mensaje de error, un resultado vacío, una tabla destrozada",
            "Más o menos cuánto pesa el archivo y qué lo produjo (Word 2021, una exportación de Google Docs, un script, un escáner)",
            "Tu navegador y sistema operativo, porque el análisis puede comportarse distinto entre ellos",
          ],
        },
        {
          heading: "Por favor no nos envíes tus documentos",
          body: [
            "El sentido de este sitio es que tus archivos se queden en tu computadora. Enviarnos uno anula eso de tu lado y nos pone en una posición en la que preferimos no estar del nuestro. Si puedes reproducir el problema con un archivo que no importa —un par de títulos y una tabla escritos en un documento nuevo—, eso es incluso más útil, porque aísla el error.",
            "Si de verdad no se puede reproducir sin el archivo original, escribe primero y vemos qué hace falta. Casi siempre la respuesta es una descripción de la estructura, no del contenido.",
          ],
        },
        {
          heading: "Traducciones",
          body: [
            "Este sitio está en seis idiomas. El inglés es el original y el resto se tradujo con cuidado, pero un hablante nativo siempre detecta cosas que una traducción cuidadosa no ve: una frase técnicamente correcta que suena raro, un término que el mundo del software local dice de otra manera.",
            "Si ves una, dinos qué idioma y qué página, y cita la frase. Las correcciones pequeñas son bienvenidas y se aplican rápido.",
          ],
        },
        {
          heading: "Funciones, y cosas que no vamos a construir",
          body: [
            "Las peticiones de funciones se leen y a menudo se construyen, sobre todo las pequeñas: un control para un estilo de salida, soporte para una variante de formato, un delimitador que no detectamos.",
            "Algunas cosas quedan fuera del alcance por diseño, y pedirlas no lo cambiará: subir archivos a un servidor, un motor de OCR para PDF escaneados, una integración con Google Drive o cuentas de usuario. Cada una obligaría al sitio a retener tus datos. Es lo único que esta herramienta está hecha para no hacer.",
          ],
        },
        {
          heading: "Privacidad y asuntos legales",
          body: [
            "Las preguntas sobre qué datos recoge este sitio, y las solicitudes relativas a tus datos bajo el RGPD, la CCPA o leyes similares, van a la misma dirección. Lee primero la política de privacidad: la versión corta es que no recogemos nada que te identifique, lo que deja sin objeto a la mayoría de esas solicitudes, y la política explica exactamente por qué.",
          ],
        },
      ],
    },
    privacy: {
      short: "Privacidad",
      eyebrow: "Política de privacidad",
      title: "Política de privacidad — Docs to MD",
      description:
        "Qué recoge y qué no recoge Docs to MD. Tus documentos se procesan en tu navegador y nunca se suben. Sin cuentas, sin analítica sobre tus archivos, sin venta de datos.",
      h1: "Política de privacidad",
      lede: [
        "Los documentos que conviertes aquí nunca salen de tu computadora. No es una promesa sobre cómo tratamos tus datos: es que no existe ningún paso en el que los recibamos.",
        "Esta página lo explica en detalle, y es honesta sobre las partes donde sí hay un tercero involucrado.",
      ],
      sections: [
        {
          heading: "Tus documentos",
          body: [
            "Los archivos que sueltas, eliges o pegas en este sitio los lee tu propio navegador y los convierte código que corre en tu propia máquina. No se transmiten a nosotros, ni a un proveedor de alojamiento, ni a nadie más. No hay conversión en servidor, ni cola, ni almacenamiento temporal, ni caché de tu contenido.",
            "Tampoco se escribe nada en tu dispositivo. No guardamos tus archivos ni su resultado en almacenamiento local, IndexedDB o una cookie. Cierras la pestaña y el contenido desaparece; las únicas copias son el archivo con el que empezaste y lo que copiaste o descargaste a propósito.",
            "Todo esto se puede verificar. Desconecta la red y convierte un archivo: sigue funcionando. O abre las herramientas de desarrollo de tu navegador, mira la pestaña Red y comprueba que soltar un archivo no produce ninguna subida.",
          ],
        },
        {
          heading: "Qué sí recogemos",
          body: [
            "No pedimos ni almacenamos tu nombre, correo ni datos de cuenta, porque no hay cuentas.",
            "El sitio está alojado en Cloudflare Pages. Como cualquier alojamiento web, procesa datos estándar de la petición cuando tu navegador pide una página: dirección IP, agente de usuario, la URL solicitada y la hora. Es inherente al funcionamiento de la web y sirve para entregar el sitio y bloquear abusos. Lo usamos de forma agregada para ver qué páginas reciben tráfico. No está ligado a nada que conviertes, porque tus conversiones nunca llegan a ningún servidor.",
          ],
        },
        {
          heading: "Cookies y publicidad",
          body: [
            "El sitio en sí no pone ninguna cookie. No tiene inicio de sesión, ni carrito, ni preferencias que recordar entre visitas, así que no hay nada que una cookie pueda guardar.",
            "Tenemos intención de mostrar publicidad de Google AdSense para cubrir los costes de alojamiento. Cuando eso se active, Google podrá poner cookies o leer identificadores de dispositivo para servir y medir anuncios, de acuerdo con sus propias políticas. Es la única parte de este sitio donde un tercero ve algo sobre tu visita, y es sobre la página en la que estás, no sobre el documento que convertiste, que Google no tiene forma de ver.",
            "Si estás en el Espacio Económico Europeo, el Reino Unido o Suiza, se te pedirá consentimiento antes de usar cualquier cookie no esencial, y podrás retirarlo después. La política de cookies explica las categorías y cómo cambiar de opinión.",
          ],
        },
        {
          heading: "Terceros",
          body: [
            "La lista es deliberadamente corta:",
          ],
          items: [
            "Cloudflare Pages aloja los archivos estáticos que componen este sitio.",
            "Google AdSense, una vez activado, sirve la publicidad descrita arriba.",
            "Las fuentes de Google Fonts se alojan en este dominio, así que pedir una página no le dice a Google que estuviste aquí.",
            "Ninguna página carga plataformas de analítica, grabadores de sesión, mapas de calor, widgets de chat ni incrustaciones de redes sociales.",
          ],
        },
        {
          heading: "Menores",
          body: [
            "Esta es una utilidad de conversión de documentos, sin funciones sociales y sin cuentas. No está dirigida a menores de 13 años y, como no recogemos información personal de nadie, tampoco la recogemos a sabiendas de menores.",
          ],
        },
        {
          heading: "Tus derechos",
          body: [
            "Bajo el RGPD, la CCPA y leyes similares tienes derecho a acceder, corregir, borrar y portar tus datos personales, y a oponerte a su tratamiento. Los respetamos todos, y en la práctica las solicitudes aquí son inusualmente fáciles de responder, porque no tenemos ningún archivo que hayas convertido ni un perfil tuyo que entregar, corregir o borrar.",
            "Para las cookies publicitarias descritas arriba el responsable es Google, y sus propias herramientas te dan el control más directo sobre la personalización de anuncios. Escríbenos y te indicamos dónde.",
          ],
        },
        {
          heading: "Cambios en esta política",
          body: [
            "Si esta política cambia de forma sustancial —un nuevo tercero, una nueva categoría de datos—, la fecha al principio de la página cambia con ella. Como el sitio no guarda direcciones de correo, no podemos avisarte directamente, así que esa fecha es la señal honesta que hay que mirar.",
          ],
        },
      ],
    },
    terms: {
      short: "Términos",
      eyebrow: "Términos del servicio",
      title: "Términos del servicio — Docs to MD",
      description:
        "Los términos de uso de Docs to MD: gratis para cualquier propósito, se ofrece tal cual, conservas todos los derechos sobre tus documentos y revisas la salida antes de confiar en ella.",
      h1: "Términos del servicio",
      lede: [
        "Usar este sitio implica aceptar lo que sigue. Es corto, porque una herramienta de navegador gratuita que no guarda nada no necesita mucho más.",
      ],
      sections: [
        {
          heading: "Qué puedes hacer con ella",
          body: [
            "Úsala para lo que quieras, incluido trabajo comercial. Convierte tantos archivos como quieras. Sin cuenta, sin clave de licencia, sin atribución obligatoria y sin límites sobre cómo se usa la salida.",
            "Hay dos advertencias prácticas, y existen por el bien de la herramienta más que por el nuestro: cada archivo debe estar por debajo del límite de tamaño indicado en la página, y la conversión corre en tu máquina, así que un documento muy grande lo limita tu propia memoria y procesador, no una cuota que hayamos puesto.",
          ],
        },
        {
          heading: "Tus documentos siguen siendo tuyos",
          body: [
            "Conservas todos los derechos que tenías sobre los archivos que conviertes y sobre el Markdown que sale. No reclamamos ninguna licencia sobre ninguno de los dos, y no podríamos usarlos aunque quisiéramos: la conversión ocurre en tu navegador y tu contenido nunca nos llega.",
            "Eres responsable de tener derecho a convertir lo que conviertes. Si un documento no es tuyo para procesarlo, esta herramienta no cambia eso.",
          ],
        },
        {
          heading: "Se ofrece tal cual",
          body: [
            "El sitio es gratuito y no incluye ninguna garantía. Buscamos una conversión precisa y documentamos los límites conocidos de cada formato en su propia página, pero ningún convertidor es perfecto y no podemos garantizar que un documento concreto se convierta correcta o completamente.",
            "Revisa la salida antes de confiar en ella. Esto importa sobre todo donde la estructura se infiere en lugar de leerse: los niveles de título de un PDF se adivinan por el tamaño de letra, las celdas combinadas se aplanan, los cambios rastreados se descartan y los diseños complejos no sobreviven. Para cualquier cosa con consecuencias —legal, financiera, médica, académica—, compara el Markdown con el original.",
            "En la medida que la ley lo permita, no somos responsables de pérdida de datos, de trabajo, de beneficios u otros daños derivados del uso del sitio o de confiar en su salida.",
          ],
        },
        {
          heading: "Uso aceptable",
          body: [
            "No uses el sitio para procesar material sobre el que no tengas derechos, y no lo uses de formas que lo dañen o dañen a otros:",
          ],
          items: [
            "No intentes romper, sobrecargar o encontrar vulnerabilidades en el sitio con intención de perjudicarlo o perjudicar a sus usuarios. Si encuentras un problema de seguridad, repórtalo.",
            "No hagas scraping ni automatices el sitio de forma que lo degrade para los demás.",
            "No republiques el sitio como si fuera tuyo, ni lo presentes como si lo operara otra persona.",
            "No interfieras, bloquees ni infles artificialmente la publicidad que financia el alojamiento.",
          ],
        },
        {
          heading: "El software sobre el que está construido",
          body: [
            "Esta herramienta se apoya en bibliotecas de código abierto —Mammoth, Turndown, DOMPurify, pdf.js, Papa Parse, read-excel-file y otras—, cada una bajo su propia licencia, con los avisos conservados en el código distribuido. Esas licencias cubren esos componentes; estos términos cubren este sitio.",
          ],
        },
        {
          heading: "Disponibilidad y cambios",
          body: [
            "Este es un servicio gratuito llevado por una sola persona. Podemos cambiar cómo funciona, añadir o quitar un formato, o desconectarlo, sin avisar. Como aquí no se guarda nada tuyo, una caída te cuesta el acceso a un convertidor y nada más.",
            "Si estos términos cambian, la fecha al principio de la página cambia con ellos. Seguir usando el sitio después de eso implica aceptar la versión revisada.",
          ],
        },
      ],
    },
    cookies: {
      short: "Cookies",
      eyebrow: "Política de cookies",
      title: "Política de cookies — Docs to MD",
      description:
        "Qué cookies usa Docs to MD. El sitio en sí no pone ninguna. La publicidad, una vez activada, puede ponerlas — y en el EEE, el Reino Unido y Suiza solo con tu consentimiento.",
      h1: "Política de cookies",
      lede: [
        "Este sitio no pone ninguna cookie propia. No hay inicio de sesión ni nada que recordar entre visitas.",
        "La excepción es la publicidad, y esta página dice exactamente qué implica.",
      ],
      sections: [
        {
          heading: "Qué es una cookie, en breve",
          body: [
            "Una cookie es un pequeño texto que un sitio le pide a tu navegador guardar y devolver en visitas posteriores. Es como un sitio reconoce que dos cargas de página vienen del mismo navegador: útil para mantener la sesión, e igual de útil para rastrear. Tecnologías relacionadas como el almacenamiento local y los identificadores de dispositivo hacen algo parecido por otros medios, y también están cubiertas aquí.",
          ],
        },
        {
          heading: "Cookies que pone este sitio",
          body: [
            "Ninguna. Ni una, al momento de escribir esto.",
            "No hay cuenta en la que permanecer, ni carrito, ni preferencia que guardar entre visitas. Incluso los ajustes del convertidor —estilo de viñeta, estilo de cercado, fila de encabezado, alineación— viven solo en la página mientras la tienes abierta, y se reinician al recargar. Tus archivos y su resultado tampoco se escriben nunca en almacenamiento local, IndexedDB o una cookie.",
          ],
        },
        {
          heading: "Cookies publicitarias",
          body: [
            "El alojamiento se paga con publicidad, y tenemos intención de usar Google AdSense. Cuando esté activo, Google podrá poner cookies o leer identificadores de dispositivo para servir anuncios, limitar cuántas veces ves el mismo y medir clics. En algunas configuraciones esas cookies se usan para personalizar anuncios según tu navegación en otros sitios.",
            "Esas cookies las pone Google, no nosotros, y Google es el responsable de los datos que llevan. Lo que pueden ver es la página en la que estás. Lo que no pueden ver es nada de lo que conviertes: eso nunca sale de tu navegador, así que no hay nada que un script de anuncios pueda leer.",
          ],
        },
        {
          heading: "Consentimiento, si estás en Europa",
          body: [
            "Si estás en el Espacio Económico Europeo, el Reino Unido o Suiza, las cookies no esenciales solo se usan después de que hayas aceptado. Se te preguntará una vez, mediante un diálogo de consentimiento, y puedes rechazarlo y seguir usando cada parte del sitio: aquí nada está condicionado al consentimiento.",
            "Puedes cambiar tu respuesta en cualquier momento desde el mismo diálogo, accesible desde el pie de página una vez activada la publicidad. Retirar el consentimiento detiene la puesta de nuevas cookies no esenciales.",
          ],
        },
        {
          heading: "Controlar las cookies tú mismo",
          body: [
            "Con independencia de lo que haya en este sitio, tu navegador tiene la última palabra:",
          ],
          items: [
            "Todos los navegadores principales pueden bloquear las cookies de terceros por completo, en sus ajustes de privacidad.",
            "Puedes borrar las cookies existentes de un sitio, o de todos, cuando quieras.",
            "Las ventanas privadas o de incógnito descartan las cookies al cerrarse.",
            "Los propios ajustes de anuncios de Google te permiten desactivar la publicidad personalizada en los sitios que usan su red.",
          ],
        },
        {
          heading: "Cambios",
          body: [
            "Si este sitio empieza a usar una cookie que hoy no usa, esta página se actualizará antes de que ocurra y la fecha del principio cambiará. Y si quieres saber qué hay puesto ahora mismo en lugar de creernos, las herramientas de desarrollo de tu navegador te muestran la lista completa en Aplicación o Almacenamiento.",
          ],
        },
      ],
    },
  },
  guideIndex: {
    short: "Guías",
    eyebrow: "Guías",
    title: "Guías — las partes incómodas de convertir documentos a Markdown",
    description:
      "Seis recorridos por las conversiones que no salen bien la primera vez: formato de Word, maquetación de PDF, pegar desde Google Docs, HTML desordenado, tablas CSV y fórmulas de Excel.",
    h1: "Guías",
    lede: [
      "Cada conversor tiene una página que explica lo que hace. Estas son para lo que viene después: el archivo que salió mal, y por qué.",
      "Una guía por motor de conversión, escritas a partir de las preguntas que la gente manda de verdad. Cada página enlaza directo a la herramienta de la que habla.",
    ],
  },
  guides: {
    "word-to-markdown-keep-formatting": {
      short: "Formato de Word",
      eyebrow: "Guía · Word → Markdown",
      title: "Convertir Word a Markdown: qué formato sobrevive y qué no",
      description:
        "Qué partes de un .docx llegan a Markdown y cuáles se descartan a propósito. Títulos, listas, tablas y énfasis sobreviven como estructura; tipografías, colores y maquetación de página no. Cómo distinguirlos antes de convertir.",
      keywords: [
        "word a markdown conservar formato",
        "docx a markdown formato",
        "convertir word a markdown sin perder formato",
        "documento word a markdown",
        "docx a markdown limpio",
      ],
      h1: "Qué sobrevive cuando Word se vuelve Markdown",
      lede: [
        "«Conservar el formato» significa dos cosas distintas, y de cuál de las dos hables depende que te guste el resultado.",
        "Lo que sobrevive es el esqueleto: títulos, listas, tablas, énfasis — las partes que dicen cómo está armado el documento. La otra mitad, su aspecto, no tiene dónde ir: Markdown es texto plano, y el texto plano no tiene tipografías, colores, márgenes ni saltos de página. Ese es el techo del formato, no una función que falte.",
      ],
      tool: "word-to-markdown",
      sections: [
        {
          heading: "La estructura sobrevive, la apariencia no",
          body: [
            "Abre un .docx y cada párrafo lleva un nombre de estilo al lado de su formato. El nombre del estilo es la parte con significado — Título 2, Párrafo de lista, Cita — y el formato es solo cómo Word decidió dibujarlo hoy.",
            "El conversor lee lo primero y descarta lo segundo. Un Título 2 se vuelve ##, no un texto con un tamaño de letra pegado. Donde acabe ese Markdown, adopta el estilo de títulos de ese proyecto.",
            "Markdown no tiene sintaxis para una tipografía ni para un margen, lo que significa que no existe ninguna versión de esto que los conserve. Si necesitas que la página se vea idéntica, lo que quieres es un PDF, no Markdown.",
          ],
        },
        {
          heading: "Los signos # salen de los estilos de título de verdad",
          body: [
            "Es lo único que vale la pena hacer en Word antes de convertir, y es la diferencia entre una buena salida y un muro de párrafos.",
            "Una línea que agrandaste y pusiste en negrita a mano sigue siendo un párrafo normal para el archivo, así que se convierte en un párrafo. Ninguna regla podría devolver «16pt y negrita» a ## sin destrozar de paso cada frase enfatizada del documento.",
          ],
          steps: [
            "En Word, haz clic dentro de uno de tus títulos y echa un ojo a la galería de estilos. Un Normal resaltado es el problema entero en una palabra.",
            "Elige Título 1, 2 o 3 en esa galería. El aspecto cambiará: edita la definición del estilo si el nuevo aspecto te molesta, en vez de volver a poner tamaños a mano.",
            "Haz lo mismo con las listas: usa los botones de lista en vez de escribir «1.» y un tabulador. Los números escritos a mano se convierten en texto literal que ya no se renumera.",
            "Convierte y luego busca # y - en la salida. Un archivo sin ningún # nunca tuvo estructura.",
          ],
        },
        {
          heading: "Qué llega",
          body: [
            "Los seis niveles de título, a partir de los estilos de Word. Los estilos Título y Subtítulo de Word también se mapean a # y ##, porque eso es lo que significan.",
            "La negrita como **, la cursiva como _, el tachado como ~~. Superíndices y subíndices se quedan como <sup> y <sub>: Markdown no tiene sintaxis para ellos y quitarlos cambiaría lo que dice una fórmula o una llamada a nota.",
            "Enlaces, listas numeradas y con viñetas a cualquier nivel de anidamiento, citas a partir de los estilos Cita y Cita destacada, y párrafos con estilo Código o Con formato previo como bloques de código con vallas.",
          ],
          sample: {
            beforeLabel: "En Word",
            before: "Una lista con viñetas anidada,\ny una lista numerada que empieza en 3",
            afterLabel: "Markdown",
            after: "- Outer\n  - Inner\n- Second\n\n3. Third\n4. Fourth",
          },
        },
        {
          heading: "Qué se descarta, y por qué",
          body: [
            "Tipografías, tamaños, colores, resaltado, alineación, sangrías, interlineado, saltos de página, encabezados, pies y márgenes. Todo eso es presentación que pertenece a una página, y Markdown no es una página.",
            "El subrayado es lo que más sorprende. Markdown no tiene subrayado, y lo más parecido — un enlace — sería peor que nada, así que el texto subrayado sale como texto normal.",
            "El control de cambios y los comentarios se van: obtienes el texto final, no el historial de edición. Los cuadros de texto, SmartArt y gráficos tampoco sobreviven, solo su texto si tienen alguno. Word además le cuenta al conversor los estilos que no pudo mapear; esas notas aparecen encima de la salida, sin repeticiones y con un tope de ocho, seguidas de una línea que dice cuántas más había.",
          ],
        },
        {
          heading: "Las tablas llegan, las celdas combinadas no",
          body: [
            "Las tablas se vuelven tablas de barras estándar. Las barras dentro del texto de una celda se escapan como \\| para que una celda con una barra no parta la fila en dos, y las filas más cortas que la más ancha se rellenan para que la tabla siga siendo rectangular.",
            "Las celdas combinadas son la excepción, y es una excepción dura: Markdown no tiene colspan ni rowspan. Una celda combinada en dos columnas conserva su texto y deja una celda vacía al lado. Si las combinaciones significan algo, deshazlas en Word primero: muchas veces solo estaban para centrar un título.",
            "Las celdas admiten formato en línea sin problema: negrita, cursiva, código, enlaces. El contenido de bloque dentro de una celda no sobrevive como bloque: una lista con viñetas dentro de una celda sale con sus elementos pegados, porque una fila de tabla de barras es una sola línea.",
          ],
          sample: {
            beforeLabel: "En Word",
            before: "Celda de encabezado combinada en dos columnas",
            afterLabel: "Markdown",
            after: "| Merged head |  |\n| --- | --- |\n| 1 | 2 |",
          },
        },
        {
          heading: "Imágenes, y lo único que .doc no puede darte",
          steps: [
            "Base64 incrustado mete cada imagen en el propio Markdown. Un archivo autónomo, sin imágenes perdidas — pero un data URI es como un tercio más grande que la imagen, y hace que el archivo sea incómodo de leer en un editor de texto.",
            "Dejar un hueco escribe ![alt](./images/nombre.png) y te deja el archivo a ti. Úsalo cuando el Markdown vaya a un repositorio que ya tiene una carpeta de imágenes. El nombre se construye a partir del texto alternativo, en minúsculas y con guiones.",
            "Quitarlas elimina las imágenes por completo. Correcto para una exportación solo de texto, incorrecto si luego te vas a preguntar qué había ahí.",
          ],
          body: [
            "Los .doc antiguos son la excepción. Ese formato es binario, previo a 2007, y aquí se lee byte a byte en tu navegador: las imágenes no se pueden recuperar de él, ni tampoco la numeración exacta de las listas. El texto, los títulos, las tablas, la negrita y la cursiva sí llegan, y la salida dice que tomó ese camino para que no te quedes con la duda. Si tienes Word a mano, un Guardar como .docx da un resultado más limpio.",
            "Otra cosa que conviene saber: los hipervínculos de Word suelen llevar parámetros de seguimiento, y los documentos guardados desde Google Docs envuelven sus enlaces en una redirección de google.com/url. Ambos se deshacen hasta el destino real, y la salida lo dice: cambiar a dónde apunta un enlace merece un aviso.",
          ],
        },
      ],
      outro:
        "Arregla los estilos de título y después suelta el archivo. Nada se sube — el .docx se descomprime en esta pestaña — así que un borrador sin publicar sirve perfectamente para probar.",
    },
    "pdf-to-markdown-layout": {
      short: "Maquetación de PDF",
      eyebrow: "Guía · PDF → Markdown",
      title: "PDF a Markdown: por qué los títulos y los párrafos salen mal",
      description:
        "Un PDF no tiene títulos, ni párrafos, ni listas: solo glifos en coordenadas. Así se deduce la estructura a partir del tamaño de letra y el espaciado, en qué falla eso, y por qué una página escaneada no produce nada.",
      keywords: [
        "pdf a markdown",
        "convertir pdf a markdown",
        "pdf a markdown títulos",
        "extraer texto pdf a markdown",
        "pdf escaneado a markdown",
      ],
      h1: "PDF a Markdown, y por qué la estructura es una deducción",
      lede: [
        "Todos los demás conversores de aquí leen una estructura que está de verdad en el archivo. Este no puede, porque un PDF no tiene ninguna.",
        "Lo que guarda un PDF son caracteres en coordenadas con un tamaño de letra. «Esto es un título» no está ahí dentro. Así que la estructura se deduce, y saber cómo se deduce te dice exactamente cuándo va a estar mal.",
      ],
      tool: "pdf-to-markdown",
      sections: [
        {
          heading: "En un PDF no hay estructura",
          body: [
            "Un PDF es un formato de impresión. Su trabajo es poner el glifo correcto en el punto correcto de la página, y lo hace guardando fragmentos de texto con una posición y una tipografía. Nada en el archivo dice cuál de ellos es un título, dónde acaba un párrafo, o que seis líneas son una lista con viñetas.",
            "Así que un documento de Word se convierte; un PDF se reconstruye. Todo lo que viene abajo es una heurística, y cada heurística tiene casos en los que falla. Por eso aparece un aviso encima de la salida en cada conversión de PDF, se vea raro algo o no.",
            "Si tienes el .docx original, usa ese. Se convierte como debe, porque la estructura está de verdad ahí.",
          ],
        },
        {
          heading: "Cómo se encuentran los títulos",
          body: [
            "Primero se calcula el tamaño del texto de cuerpo: se cuentan los tamaños de letra de todas las líneas, ponderados por cuántos caracteres tiene cada una, y gana el más común. Ponderar por caracteres y no por líneas importa: una línea larga de párrafo dice más sobre cuál es el tamaño de cuerpo que una línea corta de título.",
            "Después, una línea es un título si es claramente más grande que eso y es corta. La proporción de tamaño elige el nivel: 1,6× o más pasa a #, 1,35× pasa a ##, y 1,15× pasa a ###. Los niveles de título originales ya no están, así que lo que se conserva es solo la relación relativa: estos títulos son del mismo rango entre sí.",
            "El límite de longitud son 120 caracteres, y está ahí por un fallo concreto: un documento cuyo párrafo de apertura va en letra grande no es un título, y el tamaño por sí solo no puede notar la diferencia. La longitud sí.",
            "Esta es también la heurística que más se pierde cosas. Un documento que da estilo a sus títulos por grosor y no por tamaño — negrita al mismo tamaño que el cuerpo — no tiene ninguna señal de tamaño, y esos títulos salen como párrafos.",
          ],
        },
        {
          heading: "Elementos de página, párrafos y listas",
          body: [
            "Los encabezados y pies se descartan cuando son a la vez más pequeños que el texto de cuerpo y están dentro del 9% de la altura de la página desde el borde superior o inferior. Es proporcional en lugar de una medida fija, así que A4 y Carta se comportan igual. Si no, un número de página o un sello de «Confidencial» repetido en cada página interrumpiría el texto cuarenta veces.",
            "Un salto de párrafo es un hueco vertical mayor que 1,8× el tamaño de letra de esa misma línea. Así es como un PDF expresa uno, porque no hay marca de párrafo que leer.",
            "Las listas se detectan por sus primeros caracteres: un glifo de viñeta (•, ·, ▪, ◦, ‣, ∙) o un número de hasta tres cifras seguido de un punto o un paréntesis de cierre. Una lista dibujada de otra forma no es una lista para el conversor.",
          ],
        },
        {
          heading: "Palabras partidas entre líneas",
          body: [
            "Los PDF cortan palabras con guion al final de línea, y una unión ingenua te da «in- forme». Las líneas se vuelven a pegar en una sola palabra cuando una línea acaba en guion y la siguiente empieza en minúscula: esa combinación es un guion de salto de línea casi siempre.",
            "Cuando la siguiente línea empieza en mayúscula, el guion se queda. «State-of-the-art» partido después de «state-» conserva su guion, y eso es correcto, porque ese sí es parte de la palabra.",
            "Las líneas en chino, japonés y coreano se unen sin ningún espacio. Esas escrituras no separan palabras con espacios, así que meter uno en cada salto de línea abriría un hueco en medio de una frase.",
          ],
          sample: {
            beforeLabel: "Dos líneas en el PDF",
            before: "The quarterly re-\nport is attached.",
            afterLabel: "Markdown",
            after: "The quarterly report is attached.",
          },
        },
        {
          heading: "Un PDF escaneado no te da nada",
          body: [
            "Si una página es una imagen de texto — un escaneo, una foto, un fax — no hay caracteres en el archivo que leer, solo un mapa de bits. El conversor lo dice y se detiene, en lugar de devolverte un documento vacío que parece un error.",
            "Sacar texto de eso necesita OCR, que no es parte de esta herramienta. Un PDF en el que algunas páginas son escaneos y otras no convertirá las páginas reales y listará los números de las que salieron vacías, hasta seis.",
            "Dos techos: 25 MB y 500 páginas. Los dos van de lo que una pestaña del navegador puede hacer sin bloquearse: un PDF se procesa aquí, en tu navegador, sin ningún servidor de por medio.",
          ],
        },
        {
          heading: "Qué hacer con las páginas a varias columnas",
          body: [
            "Los diseños a dos columnas son el caso más difícil y salen lo mejor posible. El texto se lee en el orden en que lo guarda el archivo, que en un PDF a dos columnas bien hecho es columna por columna, y en uno mal hecho alterna entre columnas línea a línea. No hay forma fiable de saber cuál tienes antes de leerlo.",
            "Las tablas y las fórmulas son la misma historia: una tabla en un PDF son líneas dibujadas y texto en coordenadas, sin nada que la marque como tabla. Espera las celdas como líneas separadas, no como una tabla de barras.",
            "Activa las marcas de página si vas a arreglar cosas a mano. Eso inserta un comentario HTML antes de cada página, así puedes encontrar de qué página venía un trozo destrozado y compararlo con el original.",
          ],
          sample: {
            beforeLabel: "Con marcas de página",
            before: "…fin de la página uno.",
            afterLabel: "Markdown",
            after: "…fin de la página uno.\n\n<!-- page 2 -->\n\n## Method",
          },
        },
      ],
      outro:
        "Suelta el PDF y lee los avisos de encima de la salida: dicen qué páginas se saltaron y te recuerdan que la estructura se dedujo. Todo se lee en tu navegador; el archivo nunca se sube.",
    },
    "google-docs-to-markdown-paste": {
      short: "Pegar de Google Docs",
      eyebrow: "Guía · Google Docs → Markdown",
      title: "Google Docs a Markdown: copiar y pegar, o exportar primero",
      description:
        "Dos formas de salir de un documento de Google, y lo que cuesta cada una. Pegar es más rápido y pierde las imágenes; exportar .docx las conserva. Ninguna de las dos necesita acceso a tu Drive.",
      keywords: [
        "google docs a markdown",
        "copiar google docs a markdown",
        "google docs pegar markdown",
        "exportar google docs a markdown",
        "documento google a md",
      ],
      h1: "Sacar Markdown de un documento de Google",
      lede: [
        "Hay dos caminos y no son equivalentes. Pegar son dos segundos y se lleva las imágenes; exportar el .docx son unos cuantos clics y las conserva.",
        "Los dos corren enteros en tu navegador, y ninguno pide tu cuenta de Google. Nada de aquí puede ver tu Drive.",
      ],
      tool: "google-docs-to-markdown",
      sections: [
        {
          heading: "Copia el contenido, no un enlace a él",
          body: [
            "Esto es lo primero que atrapa a la gente. Copiar la URL del documento, o usar «Copiar vínculo», te da una dirección: ahí no hay nada que convertir.",
            "Lo que quieres es el contenido en el portapapeles. Seleccionar texto en un documento y copiarlo pone ahí una versión HTML con formato junto al texto plano, y ese HTML lleva los títulos, las listas y las tablas.",
          ],
          steps: [
            "Abre el documento y selecciona lo que quieras. Ctrl+A si es todo.",
            "Copia con Ctrl+C.",
            "Pulsa Ctrl+V en cualquier parte de la página del conversor. No hay que buscar una caja ni pulsar ningún botón: el pegado lo recoge la propia página.",
          ],
        },
        {
          heading: "Cómo llega el HTML del portapapeles",
          body: [
            "El HTML del portapapeles de Google no es ordenado. Casi todos los elementos llevan un nombre de clase generado como c1 o c17, los elementos de lista reciben nombres lst-kix_, y toda la selección va envuelta en una etiqueta <b> que pone font-weight en normal: una etiqueta de negrita que apaga la negrita, que es la forma en la que el editor lleva la cuenta del formato a nivel de documento.",
            "Nada de eso llega al Markdown. Las clases, los id y los atributos style los quita el sanitizador, porque Markdown no puede expresar ninguno y el HTML del portapapeles de una página web cualquiera no es algo en lo que confiar. La envoltura <b> se desmonta por separado: dejarla ahí produciría un ** suelto al principio y al final de tu documento.",
            "Los enlaces también se desmontan. Google enruta los enlaces salientes por google.com/url?q=… para contar clics dentro del editor, y a menudo viajan con ellos parámetros de seguimiento como utm_source. Los dos se quitan para que el enlace apunte a donde dice apuntar. La salida te dice cuándo ha pasado esto: cambiar el destino de un enlace merece una mención.",
          ],
          sample: {
            beforeLabel: "En el portapapeles",
            before: "<a href=\"https://www.google.com/url?q=\n  https://example.com/a%3Futm_source%3Ddocs\">figures</a>",
            afterLabel: "Markdown",
            after: "[figures](https://example.com/a)",
          },
        },
        {
          heading: "Por qué al pegar se pierden las imágenes",
          body: [
            "Las imágenes de un documento viven en los servidores de Google. El HTML del portapapeles las referencia por URL en lugar de llevar los bytes, y esas URL están atadas a tu sesión: caducan, y no resuelven para nadie más.",
            "Así que un documento pegado llega con su texto intacto y sus imágenes ausentes. Es el límite del formato, no un ajuste.",
            "Si las imágenes importan, toma el otro camino.",
          ],
        },
        {
          heading: "La exportación a .docx, para imágenes y documentos largos",
          steps: [
            "En el documento: Archivo → Descargar → Microsoft Word (.docx).",
            "Suelta ese archivo en la caja de la página del conversor. Varios a la vez está bien: vuelven en un solo zip.",
            "Elige cómo tratar las imágenes antes de copiar el resultado: incrustadas en el archivo, dejadas como referencias ./images/, o quitadas.",
          ],
          body: [
            "Este camino es el más completo y vale la pena para cualquier cosa larga. El .docx lleva información de estilo real, así que los títulos vienen de los estilos de Word y no del mejor intento de un portapapeles, y los documentos largos mantienen mejor su estructura.",
            "También significa que la página de Google Docs y la de Word corren el mismo conversor sobre el mismo tipo de archivo. Todo lo que es cierto de una lo es de la otra.",
          ],
        },
        {
          heading: "Qué no llega por ninguno de los dos caminos",
          body: [
            "Los comentarios y las sugerencias se descartan: obtienes el documento, no sus márgenes. Resuélvelos o acéptalos antes de exportar si importan.",
            "Los gráficos, dibujos y chips inteligentes llegan como texto plano en el mejor de los casos. Son objetos que dibuja el editor, y la mayoría no tiene equivalente textual.",
            "Los encabezados, pies y números de página se van. Pertenecen a una página impresa, y Markdown no tiene páginas.",
          ],
        },
        {
          heading: "Por qué no hay integración con Drive",
          body: [
            "Conectar con Drive significaría pedirte acceso a tus archivos y ejecutar un servidor que guarde un token para ellos. Es un riesgo real y permanente para ti a cambio de ahorrarte un Ctrl+C.",
            "Un copiar y pegar entrega exactamente los párrafos que seleccionaste y nada más. No hay cuenta, ni pantalla de OAuth, ni complemento que instalar, y no hay nada de nuestro lado que pudiera filtrarse, porque no hay nuestro lado: la conversión ocurre en tu navegador.",
            "Google Docs también exporta Markdown por su cuenta ahora. Si esa salida te sirve, úsala. Esto existe para los casos en los que quieres elegir el carácter de viñeta, el estilo de las vallas o qué pasa con las imágenes, y para pegar un fragmento en lugar de exportar un documento entero.",
          ],
        },
      ],
      outro:
        "Selecciona, copia, pega — o exporta el .docx si necesitas las imágenes. El portapapeles se lee en tu navegador y nada se manda a ninguna parte.",
    },
    "html-to-markdown-clean": {
      short: "HTML desordenado",
      eyebrow: "Guía · HTML → Markdown",
      title: "HTML a Markdown: qué se conserva, qué se quita y qué se aplana",
      description:
        "Qué etiquetas HTML se mapean a Markdown, cuáles se eliminan por seguridad, y qué les pasa a las tablas, los bloques de código y los estilos en línea. Y los dos ajustes que cambian la forma de la salida.",
      keywords: [
        "html a markdown",
        "convertir html a markdown",
        "html a md",
        "html a markdown limpio",
        "página web a markdown",
      ],
      h1: "HTML a Markdown",
      lede: [
        "HTML puede expresar muchísimo más que Markdown. Así que esta conversión es sobre todo una cuestión de qué hacer con todo lo que no tiene equivalente.",
        "Tres respuestas, según la etiqueta: mapearla, quitar la etiqueta y conservar el texto, o quitar las dos cosas. Cuál se aplica lo decide una lista blanca, y vale la pena saber qué hay en ella.",
      ],
      tool: "html-to-markdown",
      sections: [
        {
          heading: "Una lista blanca, no una negra",
          body: [
            "Solo sobreviven a la primera pasada las etiquetas que significan algo en Markdown: títulos, párrafos, listas, enlaces, imágenes, énfasis, citas, código, tablas y el puñado de etiquetas en línea que las rodea. Todo lo demás se elimina, conservando su texto.",
            "La razón de que sea una lista blanca es que una lista negra tiene que predecir cada etiqueta peligrosa, y HTML sigue añadiendo etiquetas nuevas. Una entrada que falte es un agujero. Así, la respuesta por defecto para cualquier cosa desconocida es no.",
            "Los scripts, los manejadores de eventos y los enlaces javascript: se van, y en script, style, iframe, object y embed también se va el contenido, no solo la etiqueta. Conservar el texto de un <script> pegaría su código en tu documento como prosa visible.",
            "Los atributos van en lista blanca igual: solo href, src, alt, title, colspan, rowspan y start. Así que class, id y style nunca llegan a la salida. Y no es solo seguridad: Markdown tampoco tiene dónde ponerlos.",
          ],
        },
        {
          heading: "Por qué importa sanear aunque no se renderice nada",
          body: [
            "Esta página nunca renderiza tu HTML, así que aquí no hay nada que pueda ejecutarse. El sanitizador existe por lo que pasa después.",
            "Un enlace escrito como [click me](javascript:alert(1)) lo copia fielmente cualquier conversor de Markdown, y se convierte en un ataque funcional en el momento en que alguien publica ese Markdown en un sitio que lo renderiza. El riesgo no es nuestro, se le entrega a quien use la salida.",
            "Así que las URL se comprueban contra una lista blanca de protocolos — http, https, mailto, ftp y rutas relativas — y cualquier otra cosa se descarta. Cuando se elimina algo, la salida dice qué era, en lugar de limpiar tu entrada a tus espaldas.",
          ],
        },
        {
          heading: "Tablas: conservarlas o aplanarlas",
          body: [
            "Por defecto una tabla se vuelve una tabla de barras de Markdown. Las barras dentro de las celdas se escapan, el espacio en blanco dentro de una celda se reduce a espacios simples, y las filas cortas se rellenan hasta el ancho de la fila más ancha para que la tabla siga siendo rectangular.",
            "Aplanar es la alternativa, y existe para las tablas que nunca fueron tablas. Una página maquetada con una tabla para colocar cosas se convierte en una tabla de barras llena de celdas vacías; aplanada, cada fila se vuelve una línea de texto con las celdas unidas por un punto medio, y se lee muchísimo mejor.",
            "Dos cosas no sobreviven por ninguna de las dos vías. Un <caption> se descarta, porque una tabla de barras no tiene dónde ponerlo: cópialo como una línea encima de la tabla si lo necesitas. Y el contenido de bloque dentro de una celda se colapsa: una lista en una celda sale con sus elementos pegados, porque una fila de tabla de barras tiene que ser una sola línea.",
          ],
          sample: {
            beforeLabel: "HTML",
            before: "<table><tr><th>Part</th><th>Qty</th></tr>\n<tr><td>Bolt | M6</td><td>12</td></tr></table>",
            afterLabel: "Markdown",
            after: "| Part | Qty |\n| --- | --- |\n| Bolt \\| M6 | 12 |",
          },
        },
        {
          heading: "Las etiquetas que conservan su HTML",
          body: [
            "Los superíndices y subíndices se quedan como <sup> y <sub>. Markdown no tiene sintaxis para ellos, y x2 en lugar de x² cambia lo que dice una fórmula: el HTML en crudo es válido en Markdown y estas dos etiquetas las maneja cualquier renderizador.",
            "El subrayado no recibe ese trato. No tiene un significado que preservar: en la web un subrayado es un enlace, así que conservarlo sería directamente engañoso. El texto subrayado sale como texto normal.",
            "El tachado se vuelve ~~, que es Markdown de GitHub y no la especificación original, pero hoy es lo bastante universal como para que quitarlo fuera la opción más rara.",
          ],
        },
        {
          heading: "Listas, bloques de código y los ajustes",
          body: [
            "Los elementos de lista se escriben como «- item», con un solo espacio. Casi todas las cadenas de herramientas de Markdown lo escriben así, y la alternativa habitual — tres espacios tras la marca — hace diffs ruidosos cuando un archivo lo editan las dos.",
            "Las listas anidadas se sangran al ancho de la marca, y un párrafo que continúa dentro de un elemento de lista se sangra hasta alinearse con el texto de arriba en lugar de salirse de la lista. Un <ol> con atributo start conserva su numeración.",
            "El carácter de viñeta puede ser -, * o +, y la valla de código ``` o ~~~. Elige según el lugar al que vaya el archivo; no hay diferencia funcional. Los títulos también pueden ir en el estilo subrayado, aunque solo los dos primeros niveles tienen uno: del tercero para abajo se quedan con las marcas # de todos modos, y conviene saberlo antes de elegirlo.",
          ],
          sample: {
            beforeLabel: "HTML",
            before: "<ol><li><p>First para</p>\n<p>Still item one</p></li></ol>",
            afterLabel: "Markdown",
            after: "1. First para\n\n   Still item one",
          },
        },
        {
          heading: "Dos entradas, un camino",
          body: [
            "Puedes pegar código HTML en la caja, o soltar un archivo .html. Los dos se tratan igual, porque para el código son la misma cosa: una cadena de HTML no confiable.",
            "El techo de 25 MB es por entrada, que es muchísimo más que el código de cualquier página. Nada se sube: el análisis, el saneado y la conversión pasan todos en la pestaña.",
            "Si el resultado vuelve vacío, la salida lo dice. Normalmente significa que la entrada era todo marcado y ningún texto: el <head> de una página, o un fragmento que solo eran estilos.",
          ],
        },
      ],
      outro:
        "Pega el código o suelta el archivo, elige si las tablas siguen siendo tablas y copia el Markdown. Todo corre en tu navegador.",
    },
    "csv-to-markdown-tables": {
      short: "Tablas CSV",
      eyebrow: "Guía · CSV → Markdown",
      title: "CSV a tabla Markdown: delimitadores, campos entre comillas y alineación",
      description:
        "Cómo se detecta el delimitador, qué pasa con las comas y los saltos de línea dentro de campos entre comillas, cómo funciona la fila de alineación, y qué significa en la práctica el límite de 100 000 celdas.",
      keywords: [
        "csv a tabla markdown",
        "convertir csv a markdown",
        "csv a markdown",
        "tsv a tabla markdown",
        "csv con punto y coma a markdown",
      ],
      h1: "De CSV a una tabla Markdown",
      lede: [
        "Nada dentro de un CSV declara sus propias reglas. Qué carácter separa las columnas, cómo se comportan las comillas, si la primera línea es un encabezado: todo es convención, y circulan varias. Una tabla que sale mal es casi siempre un archivo leído con el juego equivocado.",
        "Esto cubre cómo se elige el delimitador, qué hacen las comillas, y cómo conseguir que los números queden alineados a la derecha.",
      ],
      tool: "csv-to-markdown",
      sections: [
        {
          heading: "Qué carácter separa las columnas",
          body: [
            "En archivos reales aparecen cuatro caracteres: coma, punto y coma, tabulador, barra. Los puntos y comas más de lo que se espera — donde 1,50 significa uno y medio la coma ya está tomada, así que las hojas de cálculo recurren al punto y coma.",
            "La detección es automática, y cuando la respuesta no es una coma la salida dice qué carácter usó. Esa línea vale la pena leerla: un archivo con algo inusual en sus primeras filas, como una línea de título encima del encabezado, puede leerse mal, y así es como te darías cuenta.",
            "Si lo adivinó mal, fija el delimitador a mano. Coma, punto y coma, tabulador y barra se pueden elegir.",
          ],
          steps: [
            "Suelta el archivo, o pega las filas directamente en la caja.",
            "Mira la nota de encima de la salida por si detectó un delimitador que no es una coma.",
            "Si la tabla salió con una columna cuando debería tener seis, elige tú el delimitador.",
          ],
        },
        {
          heading: "Cuando una celda contiene el separador mismo",
          body: [
            "Un campo envuelto en comillas dobles puede contener el delimitador, y unas comillas dobles dentro significan un carácter de comilla literal. Eso es RFC 4180 y se maneja como debe: es la razón entera de que el archivo no se parta simplemente por las comas.",
            "Los saltos de línea también se esconden entre comillas, y eso choca con el formato de salida: una fila de tabla de barras tiene que ocupar exactamente una línea. Así que un salto dentro de una celda se reescribe como <br>, lo que conserva las dos líneas de una dirección sin partir la fila en dos.",
            "Las barras verticales en el texto de una celda se escapan como \\|. Sin eso, una barra en un campo de notas convierte una fila de cinco columnas en una de seis.",
          ],
          sample: {
            beforeLabel: "CSV",
            before: "name,note\nBolt,\"M6 | 40mm\nsteel\"",
            afterLabel: "Markdown",
            after: "| name | note |\n| --- | --- |\n| Bolt | M6 \\| 40mm<br>steel |",
          },
        },
        {
          heading: "La fila de alineación",
          body: [
            "La fila de guiones bajo el encabezado puede llevar dos puntos, y fijan cómo se alinea una columna cuando la tabla se renderiza. Izquierda, centro, derecha — la derecha es la que quieres para números.",
            "Una cosa que hay que saber: el ajuste se aplica a toda la tabla, no por columna. Aquí no hay control por columna, porque un CSV no lleva información sobre qué columnas tienen números, y adivinarlo por los valores fallaría con códigos postales, números de teléfono y cadenas de versión.",
            "Así que para una tabla casi toda de números, pon derecha y arregla a mano la única columna de texto. Para cualquier cosa mixta, déjalo por defecto: una fila lisa de guiones, que todos los renderizadores tratan como izquierda.",
          ],
          sample: {
            beforeLabel: "Alineación: derecha",
            before: "Item,Cost\nBolt,0.40",
            afterLabel: "Markdown",
            after: "| Item | Cost |\n| ---: | ---: |\n| Bolt | 0.40 |",
          },
        },
        {
          heading: "Filas de encabezado, y archivos que no tienen ninguna",
          body: [
            "La primera fila pasa a ser el encabezado por defecto. Desactívalo y todas las filas serán filas de cuerpo — pero la fila de encabezado en sí no desaparece, sale vacía.",
            "Eso se ve raro y no es un error: una tabla de barras de Markdown está obligada a tener una fila de encabezado. Una tabla sin ella no se analizaría como tabla en absoluto, así que un encabezado vacío es la única forma de expresar «sin encabezado» y seguir produciendo algo que se renderice.",
            "Rellénalo después con nombres de columna, o déjalo: una fila de encabezado vacía se renderiza como una franja fina en blanco encima de los datos.",
          ],
          sample: {
            beforeLabel: "Fila de encabezado: ninguna",
            before: "Bolt,12\nNut,12",
            afterLabel: "Markdown",
            after: "|  |  |\n| --- | --- |\n| Bolt | 12 |\n| Nut | 12 |",
          },
        },
        {
          heading: "Filas irregulares y archivos mal formados",
          body: [
            "Las filas con distinto número de columnas se rellenan hasta la más ancha, y la salida te dice qué cuentas vio. Ese mensaje suele ser señal de que algo está roto más arriba: una fila con tres celdas en un archivo de seis columnas normalmente significa que una comilla sin escapar se tragó un delimitador.",
            "Las líneas vacías se descartan, incluidas las líneas que no son más que delimitadores, que es lo que suele ser un bloque de «,,,» al final.",
            "Los valores nunca se convierten de tipo. 007 sigue siendo 007 y 1-2 no se vuelve una fecha. Excel te hace eso; esto no, porque cambiar el valor es cambiar tus datos.",
            "Una marca de orden de bytes al principio del archivo se quita, para que el encabezado de la primera columna no salga con un carácter invisible pegado.",
          ],
        },
        {
          heading: "Qué significa «grande» aquí",
          body: [
            "Dos techos. 25 MB de texto, y 100 000 celdas — eso es filas por columnas, así que un archivo de seis columnas te llega hasta unas 16 000 filas y uno de cien columnas se detiene cerca de las mil.",
            "El límite de celdas es el que vas a alcanzar, y es cuestión de renderizado más que de análisis. La previsualización construye nodos DOM para cada celda, y unos cuantos cientos de miles bloquearán la pestaña. Negarse es mejor que congelarse.",
            "Para algo de verdad más grande, pártelo por filas y convierte cada trozo, repitiendo la fila de encabezado en cada uno.",
          ],
        },
      ],
      outro:
        "Suelta el CSV o pega las filas, cambia la alineación si las cifras van a la derecha, y copia la tabla. El análisis ocurre en esta pestaña, así que una exportación de clientes se queda en tu disco.",
    },
    "excel-to-markdown-formulas": {
      short: "Fórmulas de Excel",
      eyebrow: "Guía · Excel → Markdown",
      title: "Excel a Markdown: qué pasa con las fórmulas y el formato",
      description:
        "Las fórmulas se convierten en sus valores calculados, y hay un caso en el que salen vacías. Además, qué pasa con los formatos de moneda y porcentaje, las fechas, las celdas combinadas y las hojas múltiples.",
      keywords: [
        "excel a markdown",
        "xlsx a tabla markdown",
        "convertir excel a markdown",
        "fórmulas excel a markdown",
        "hoja de cálculo a tabla markdown",
      ],
      h1: "Excel a Markdown: fórmulas y formato",
      lede: [
        "Una tabla Markdown es un rectángulo de texto. Una hoja es un rectángulo de celdas, y una celda puede llevar una fórmula debajo, una máscara de visualización encima y una combinación que la estira sobre sus vecinas. Tres de esas cuatro no tienen dónde aterrizar.",
        "Lo que deja una pregunta estrecha: de todo lo que sabe la hoja, ¿qué llega a la tabla, y está entre eso lo que viniste a buscar?",
      ],
      tool: "excel-to-markdown",
      sections: [
        {
          heading: "Las fórmulas se vuelven sus respuestas",
          body: [
            "=SUM(B2:B9) llega como 4211. Esa es la dirección útil, porque Markdown no calcula nada: una fórmula pegada se quedaría en el documento como caracteres inertes que parecen significar algo y no lo hacen.",
            "Funciona porque Excel guarda en caché el valor calculado junto a la fórmula cada vez que guarda el archivo. El conversor lee ese valor en caché, y por eso no necesita un motor de fórmulas propio y todo esto puede correr en una pestaña del navegador.",
          ],
          sample: {
            beforeLabel: "Celda en Excel",
            before: "B10:  =SUM(B2:B9)",
            afterLabel: "Markdown",
            after: "| Total | 4211 |",
          },
        },
        {
          heading: "Los libros que nadie ha abierto nunca",
          body: [
            "Si el libro lo generó un script — una exportación de Python, un proceso de informes, cualquier cosa que use una biblioteca de hojas de cálculo — y nunca se abrió en Excel, no hay valor en caché. Nadie escribió uno. Esas celdas se convierten en vacías.",
            "Un viaje de ida y vuelta lo arregla: abre el libro en Excel o LibreOffice, guarda, cierra. Guardar es lo que rellena la caché. Y una hoja que aun así se lee vacía queda señalada encima de la salida, así que no copiarás una tabla de huecos por descuido.",
            "Los errores de fórmula también salen vacíos, en lugar de como #DIV/0! o #REF!. Una búsqueda rota a lo largo de una columna produce una columna de huecos, así que si una columna está vacía sin motivo aparente, revisa el origen.",
          ],
        },
        {
          heading: "Los formatos de número no sobreviven",
          body: [
            "De todo lo que hay en esta página, esto es lo que conviene leer antes de convertir. Excel guarda la máscara de visualización y el número almacenado en sitios distintos, y solo el número almacenado es dato: la máscara es una instrucción de renderizado.",
            "Por eso $1.234,50 aterriza como 1234.5 y una celda que muestra 12,50 % aterriza como 0.125. Nada se estropeó: esos son los números que el archivo siempre tuvo, mostrados sin la máscara.",
            "Si el formato importa, añade en la hoja una columna con la cadena ya formateada, construida con una fórmula TEXTO(), y usa esa columna. Entonces es texto, y el texto llega exactamente como está escrito.",
            "Las fechas son la excepción. También se guardan como números, pero el formato de número las identifica, así que salen como 1995-01-01, con la hora añadida cuando la hay. Se leen en UTC a propósito: la versión ingenua desplaza cada fecha un día hacia atrás para cualquiera al oeste de Greenwich.",
          ],
        },
        {
          heading: "Las celdas combinadas se separan",
          body: [
            "Un título combinado en A1:C1 se vuelve una celda con el texto y dos celdas vacías al lado. Excel guarda el valor en la celda superior izquierda de una combinación y deja el resto realmente vacío, así que eso es lo que hay que leer.",
            "Markdown no tiene colspan, así que no hay forma de volver a montarlo. Deshaz las combinaciones en Excel primero si la maquetación importa: muchas veces solo estaban para centrar un título.",
            "Los colores, tipografías, bordes, formato condicional y comentarios de celda se van por el mismo camino y por la misma razón: Markdown no tiene sintaxis para nada de eso.",
          ],
        },
        {
          heading: "Hojas, una a una o varias",
          steps: [
            "Suelta el libro. Los nombres de las hojas vuelven en una lista con el número de filas, y la primera hoja se convierte.",
            "Marca las hojas que quieras. Cambiar la selección vuelve a generar la salida a partir de la copia que ya está en memoria: el archivo no se lee otra vez.",
            "Varias hojas seleccionadas salen como un solo documento, cada tabla bajo un título ## con el nombre de la hoja.",
          ],
          body: [
            "El título solo aparece cuando hay más de una hoja seleccionada. Con una sola ya sabes cuál es, y un título sería ruido.",
            "Las filas vacías del final se recortan primero, y eso importa más de lo que parece: hacer clic por una zona vacía en Excel puede dejar una hoja diciendo que tiene varios cientos de filas que no contienen nada. Una hoja que queda vacía después del recorte lo dice, en lugar de producir una tabla de huecos.",
          ],
        },
        {
          heading: "Los techos de tamaño, y los archivos que se rechazan",
          body: [
            "10 MB por libro, más bajo que los 25 MB de los otros formatos. Un .xlsx es un zip, y descomprimirlo en una pestaña cuesta muchísima más memoria de lo que sugiere el tamaño del archivo.",
            "100 000 celdas entre todo lo seleccionado, y por eso elegir menos hojas puede hacer pasar un libro grande que entero no cabe.",
            "Los libros protegidos con contraseña se rechazan en lugar de leerse a medias. Igual que los .xls binarios antiguos: los dos son contenedores OLE en lugar de zips, y ninguno se puede leer aquí. Ábrelo en Excel y guárdalo como .xlsx sin contraseña.",
            "Si sueltas un .docx o un PDF en esta página por error, no lo intentará: la cabecera del archivo se comprueba primero, y el mensaje nombra la página que sí lo acepta.",
          ],
        },
      ],
      outro:
        "Suelta el libro, marca las hojas que quieras, copia la tabla. El .xlsx se descomprime en esta pestaña y no va a ninguna otra parte, lo que importa cuando el archivo es un modelo financiero.",
    },
  },
};

export default es;
