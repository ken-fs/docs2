import { CONTACT_EMAIL } from "@/content/site";
import type { Dictionary, Faq } from "../types";

/** Las preguntas que toda página debería responder; el texto no cambia según la página. */
const PRIVACY: Faq = {
  q: "¿Se sube mi archivo?",
  a: "No. Todo ocurre en tu navegador: el análisis, la limpieza, la generación del HTML. Tu archivo no llega a ningún servidor. Desconecta el wifi y pruébalo; sigue funcionando.",
  shared: true,
};

const SAFETY: Faq = {
  q: "¿Es seguro publicar este HTML en mi sitio?",
  a: "Es la parte que nos tomamos más en serio. Toda entrada pasa por DOMPurify antes de que la veas: se eliminan las etiquetas script, los atributos tipo onclick, las URL javascript:, los iframe, los object y los embed. La vista previa se muestra dentro de un iframe con sandbox, así que aunque algo se colara, no podría ejecutarse. Y nada sin desinfectar se inserta jamás en esta página.",
  shared: true,
};

const MODES: Faq = {
  q: "¿Fragmento o documento completo?",
  a: "Fragmento, si vas a pegarlo en una página que ya existe: el editor de un CMS, una plantilla, un componente de React. Recibes el marcado sin envoltorio <html> y sin <style>, así que no pelea con el CSS de tu sitio. Documento completo, si quieres un archivo que puedas abrir con doble clic: viene con charset, viewport, un título y un estilo básico y discreto.",
  shared: true,
};

const PRETTY: Faq = {
  q: "¿Por qué viene el HTML con sangría?",
  a: "Porque vas a leerlo y probablemente a versionarlo. La sangría está activada por defecto y solo añade saltos de línea entre elementos de bloque; nunca dentro de un <pre> ni entre etiquetas en línea, donde los espacios cambian lo que se muestra. Desactívala si quieres la salida más compacta posible.",
  shared: true,
};

const es: Dictionary = {
  htmlLang: "es",
  chrome: {
    breadcrumbHome: "inicio",
    cleanHeading: "Qué se tira a la basura",
    cleanLede:
      "Word y Google Docs envuelven el contenido en una capa de basura que solo significa algo dentro de su propio editor. Se va.",
    cleanNote:
      "La estructura se queda: los títulos siguen siendo títulos, las tablas tablas y las listas listas. Lo que se elimina es la decoración.",
    cleans: {
      scripts: "Etiquetas <script>",
      handlers: "onclick y compañía",
      styles: "Estilos mso- en línea",
      classes: "Clases c1 / c17 muertas",
      tracking: "Parámetros de seguimiento",
      office: "Etiquetas exclusivas de Office",
      semantics: "Se conserva: la estructura semántica",
      entities: "Se escapan: & < > y las comillas",
    },
    faqHeading: "Preguntas que nos hacen",
    crossHeading: "Otras conversiones de este sitio",
    startOver: "Empezar de nuevo",
    startOverNote: "Markdown a HTML, el de la portada",
    footerLeft: "docs2html.com — una herramienta pequeña, hecha por una persona",
    footerRight: "corre en tu navegador · no guarda nada · no te rastrea",
    langLabel: "Idioma",
    footerLegal: "Las páginas formales",
    legalContactCue: "¿Algo aquí no queda claro, o hay algo que quieras cambiar?",
    legalUpdated: "En vigor desde",
    siblingHeading: "¿Vas en la otra dirección?",
    siblingNote:
      "DocsToMD es esta misma herramienta al revés: Word, PDF, Excel y HTML a Markdown. Mismo enfoque, mismo modelo de privacidad, salida opuesta.",
    siblingCta: "docstomd.com",
    features: [
      "Convertir Markdown a HTML con tablas GFM y listas de tareas",
      "Convertir .docx a HTML semántico limpio",
      "Limpiar el HTML pegado desde Google Docs",
      "Convertir texto plano a párrafos HTML",
      "Convertir CSV y Excel a tablas HTML",
      "Funciona íntegramente en el navegador, sin subida",
      "Salida como fragmento HTML o documento completo",
    ],
  },
  converter: {
    dropTitle: "Suelta un archivo aquí.",
    dropActive: "Suelta ya.",
    dropHint:
      "O elígelo con el botón. O simplemente pega con Ctrl+V. Decenas a la vez no es problema.",
    dropMeta: "25 MB por archivo / corre en tu navegador, nada se sube",
    pick: "Elegir archivo",
    clear: "Limpiar",
    knobs: "Salida",
    mode: "Salida",
    modeFragment: "fragmento",
    modeDocument: "página completa",
    modeHint:
      "Fragmento: solo el marcado, para pegar en una página existente. Página completa: un archivo .html independiente con charset, viewport y estilos básicos.",
    pretty: "Sangría",
    prettyOn: "legible",
    prettyOff: "compacto",
    responsive: "CSS de tabla",
    responsiveOn: "incluir",
    responsiveOff: "sin nada",
    linkify: "URL sueltas",
    linkifyOn: "convertir en enlaces",
    linkifyOff: "dejar como texto",
    lineBreaks: "Saltos de línea",
    lineBreaksOn: "mantener como <br>",
    lineBreaksOff: "dejar fluir el texto",
    header: "Fila de encabezado",
    headerFirstRow: "primera fila",
    headerNone: "ninguna",
    delimiter: "Delimitador",
    delimiterAuto: "automático",
    delimiterComma: "coma",
    delimiterSemicolon: "punto y coma",
    delimiterTab: "tabulador",
    delimiterPipe: "barra vertical",
    images: "Imágenes",
    imageInline: "base64 incrustado",
    imageExtract: "archivos aparte",
    imageStrip: "descartarlas",
    sheets: "Hojas",
    sheetsAll: "seleccionar todas",
    sheetMeta: { one: "{n} fila", other: "{n} filas" },
    stale:
      "Has cambiado un ajuste. Los otros resultados son de la configuración anterior: vuelve a ejecutarlos para aplicarlo.",
    queue: "Cola",
    zip: { one: "zip de {n} archivo", other: "zip de {n} archivos" },
    chewing: "convirtiendo…",
    failed: "falló",
    tooBig: "Más de 25 MB. Demasiado grande.",
    readFail:
      "No se pudo leer. El archivo puede estar dañado o protegido con contraseña.",
    pastedName: "contenido pegado",
    typedName: "texto pegado",
    pasteHeading: "O pégalo aquí",
    pastePlaceholderMarkdown:
      "# Pega Markdown aquí\n\nLas tablas, las listas de tareas y el ~~tachado~~ funcionan.\n\n| herramienta | salida |\n| --- | --- |\n| esta página | HTML |",
    pastePlaceholderHtml:
      '<div class="c1"><b style="font-weight:normal">Pega código HTML aquí.</b></div>\n<p>La basura de Google Docs, los estilos mso- y los parámetros de seguimiento se limpian.</p>',
    pastePlaceholderText:
      "Pega texto plano aquí.\n\nUna línea en blanco inicia un párrafo nuevo. Las URL sueltas como https://example.com se convierten en enlaces, salvo que lo desactives.",
    pastePlaceholderCsv:
      "nombre,puesto,ciudad\nAda,ingeniera,Londres\nGrace,almirante,Arlington",
    pasteRun: "Convertir",
    pasteClear: "Limpiar",
    pasteRichHint:
      "Selecciona el contenido dentro de tu documento y cópialo, no el enlace para compartir. Después pega aquí, o pulsa Ctrl+V en cualquier parte de esta página.",
    source: "código",
    preview: "vista previa",
    previewNote:
      "La vista previa corre en un marco con sandbox y los scripts desactivados. Es a propósito, no un fallo.",
    copy: "Copiar",
    copied: "copiado",
    download: "Descargar .html",
    downloadZip: "HTML + imágenes",
    legacyWarn: "Formato .doc antiguo: se leyó lo que se pudo",
    styleWarn: {
      one: "{n} detalle que conviene saber de esta conversión",
      other: "{n} detalles que conviene saber de esta conversión",
    },
    emptyDoc: "(no salió nada)",
    pickOne: "Elige uno de la izquierda para ver el resultado.",
    chewingFirst: "Convirtiendo el primero…",
    units: {
      words: { one: "{n} palabra", other: "{n} palabras" },
      headings: { one: "{n} título", other: "{n} títulos" },
      tables: { one: "{n} tabla", other: "{n} tablas" },
      images: { one: "{n} imagen", other: "{n} imágenes" },
      links: { one: "{n} enlace", other: "{n} enlaces" },
      bytes: "tamaño",
    },
  },
  pages: {
    home: {
      short: "Inicio",
      eyebrow: "Markdown → HTML",
      title: "Docs 2 HTML — Convertir Markdown a HTML, gratis y privado",
      description:
        "Pega Markdown y obtén HTML limpio. Con tablas GFM, listas de tareas y tachado. Elige un fragmento para tu CMS o una página completa independiente. Todo en tu navegador: nada se sube.",
      keywords: [
        "docs 2 html",
        "markdown a html",
        "convertidor md a html",
        "convertir markdown a html online",
        "markdown a html gratis",
      ],
      h1: ["Markdown entra.", "Sale HTML limpio."],
      lede: [
        "Pégalo y el HTML aparece mientras lo miras. Sin botón, sin espera, sin subida.",
        "Llévate un fragmento para tu CMS o una página completa que puedas abrir desde el escritorio.",
      ],
      note: {
        heading: "Sin rodeos",
        items: [
          "CommonMark más tablas GFM, listas de tareas y tachado",
          "Fragmento o documento completo, tú decides",
          "Funciona con el wifi apagado",
        ],
      },
      body: {
        stepsHeading: "Cómo funciona",
        steps: [
          "Pega tu Markdown en el cuadro o suelta un archivo .md arriba. Las dos vías las lee tu propio navegador.",
          "Se analiza con markdown-it y luego pasa por DOMPurify, porque Markdown admite HTML en crudo y el Markdown que te llega de otra parte no es seguro por defecto.",
          "Alterna entre el código y una vista previa con sandbox, y después copia el HTML o descarga el archivo .html.",
        ],
        supportedHeading: "Qué se admite",
        supported: [
          "CommonMark completo: títulos, párrafos, listas, enlaces, imágenes, citas y bloques de código",
          "Los extras de GitHub: tablas con barras, casillas de listas de tareas y ~~tachado~~",
          "HTML en crudo dentro de tu Markdown, desinfectado en lugar de eliminado",
          "URL sueltas convertidas en enlaces, con opción de desactivarlo",
          "Salida en fragmento sin envoltorio, o página completa con charset, viewport y título",
        ],
        limitsHeading: "Qué no hace",
        limits: [
          "No resalta la sintaxis en los bloques de código: recibes un <pre><code> limpio y le das estilo tú",
          "Las notas al pie, las listas de definición y otras extensiones no estándar no se analizan",
          "El front matter del principio del archivo se trata como texto, no como metadatos",
          "Los scripts dentro del HTML en crudo de tu Markdown se eliminan, no se conservan",
          "Los demás formatos tienen su propia página: DOCX, Google Docs, texto plano, CSV y Excel",
        ],
      },
      faq: [
        PRIVACY,
        MODES,
        {
          q: "¿Qué variante de Markdown es esta?",
          a: "CommonMark como base, más las tres extensiones de GitHub que la gente realmente usa: tablas con barras, listas de tareas y tachado. Si se muestra bien en GitHub, es muy probable que aquí se vea igual.",
        },
        {
          q: "¿Puedo poner HTML en crudo en mi Markdown?",
          a: "Sí, y sale al otro lado, después de desinfectarlo. Un <div> o un <span class=\"note\"> sobreviven; un <script> no. Es el equilibrio correcto: el Markdown que te manda un colega o que exporta un CMS es entrada no confiable como cualquier otra.",
        },
        PRETTY,
        {
          q: "¿Se resaltan los bloques de código?",
          a: "No. Obtienes <pre><code class=\"language-js\">, que es el gancho estándar que lee cualquier resaltador. Hacerlo aquí implicaría enviar una paleta de colores que pelearía con la que ya usa tu sitio.",
        },
      ],
    },
    "markdown-to-html": {
      short: "MD → HTML",
      eyebrow: "Markdown → HTML",
      title: "Convertidor de Markdown a HTML — gratis, tablas GFM, en tu navegador",
      description:
        "Convierte Markdown a HTML con CommonMark completo más tablas, listas de tareas y tachado de GitHub. Vista previa con sandbox, salida en fragmento o página completa, y nada sale nunca de tu navegador.",
      keywords: [
        "markdown a html",
        "convertidor markdown a html",
        "md a html",
        "convertir markdown a html",
        "commonmark a html",
        "gfm a html",
      ],
      h1: ["Convierte Markdown en HTML.", "Con tablas y listas de tareas."],
      lede: [
        "La especificación CommonMark completa, más las extensiones de GitHub que echarías de menos si faltaran.",
        "Míralo en un marco con sandbox y después copia el código o descarga el archivo.",
      ],
      note: {
        heading: "Qué obtienes",
        items: [
          "Marcado <table> de verdad, con <thead> y atributos scope",
          "Listas de tareas como casillas desactivadas, no como corchetes literales",
          "Salida legible y con sangría que no te dará vergüenza versionar",
        ],
      },
      body: {
        stepsHeading: "Cómo funciona",
        steps: [
          "Pega Markdown en el cuadro, o suelta un archivo .md, .markdown o .txt en la zona de arriba.",
          "markdown-it lo analiza con las reglas de CommonMark, más las extensiones de tablas, tachado y listas de tareas. El resultado pasa por DOMPurify antes de llegar a ti.",
          "Elige fragmento o página completa, activa o desactiva la sangría, y copia el HTML o descárgalo como archivo.",
        ],
        supportedHeading: "Qué se admite",
        supported: [
          "Todo CommonMark: títulos ATX y setext, listas anidadas, enlaces por referencia, código con vallas y con sangría",
          "Tablas GFM con barras, generadas como <table><thead><th scope=\"col\">",
          "Listas de tareas como casillas desactivadas, con la clase .task-list-item para darles estilo",
          "Tachado, y URL sueltas enlazadas automáticamente con opción de evitarlo",
          "Bloques de HTML en crudo y HTML en línea, desinfectados al pasar",
          "Saltos de línea suaves conservados como <br>, o dejados fluir, según prefieras",
        ],
        limitsHeading: "Qué no hace",
        limits: [
          "No resalta la sintaxis: se emite la clase del lenguaje, los colores son cosa tuya",
          "Notas al pie, listas de definición, abreviaturas y directivas de contenedor no se analizan",
          "El front matter YAML no se elimina ni se interpreta; bórralo antes si no quieres verlo en la salida",
          "La notación matemática ($...$ o \\[...\\]) sale como texto literal",
          "Archivos de más de 25 MB",
        ],
      },
      faq: [
        {
          q: "¿Se admiten las tablas de GitHub?",
          a: "Sí, y salen como marcado correcto: un <thead> con celdas <th scope=\"col\">, un <tbody> para el resto y la alineación trasladada como text-align en línea. Un lector de pantalla puede leer el resultado como una tabla, algo imposible con una cuadrícula fingida a base de div.",
        },
        {
          q: "¿Qué pasa con las listas de tareas?",
          a: "- [ ] y - [x] se convierten en casillas desactivadas de verdad dentro del elemento de lista, y ese elemento recibe la clase task-list-item para que puedas ocultar la viñeta. Desactivadas, porque en una página estática una casilla que parece pulsable y no registra nada es peor que ninguna casilla.",
        },
        MODES,
        PRETTY,
        {
          q: "¿Puedo convertir varios archivos a la vez?",
          a: "Sí. Suelta un directorio entero de archivos .md y se ponen en cola; descárgalos uno a uno o todos juntos en un zip. Útil para llevar una carpeta de documentación a una plantilla.",
        },
        PRIVACY,
      ],
    },
    "docx-to-html": {
      short: "DOCX → HTML",
      eyebrow: "DOCX → HTML",
      title: "Convertidor de DOCX a HTML — HTML semántico limpio, sin basura de Word",
      description:
        "Convierte .docx a HTML semántico limpio en tu navegador. Los estilos mso- y las clases redundantes de Word se eliminan. Las imágenes se incrustan en base64 o se descargan junto al HTML en un zip.",
      keywords: [
        "docx a html",
        "word a html",
        "convertidor docx a html",
        "convertir documento word a html",
        "doc a html",
        "word a html limpio",
      ],
      h1: ["Documento de Word a HTML.", "Sin la basura de Word."],
      lede: [
        "Guardar como página web produce miles de líneas de estilos mso-. Esto produce marcado como el que escribirías a mano.",
        "Los títulos se vuelven <h2>, las tablas <table>, y no sobrevive nada específico de Microsoft.",
      ],
      note: {
        heading: "Qué obtienes",
        items: [
          "Etiquetas semánticas, sin <o:p> ni style=\"mso-...\"",
          "Imágenes incrustadas, o como archivos aparte en un zip",
          "Los .doc antiguos también funcionan, sin volver a guardar",
        ],
      },
      body: {
        stepsHeading: "Cómo funciona",
        steps: [
          "Suelta un .docx en la zona de arriba, o pulsa para elegirlo. Decenas a la vez no es problema.",
          "Mammoth lee la estructura del documento (niveles de título reales, tablas reales, listas reales) y escribe HTML a partir de ella. Ese HTML pasa después por DOMPurify, porque la propia documentación de Mammoth dice explícitamente que su salida no está desinfectada.",
          "Decide qué hacer con las imágenes y copia el HTML, descarga el archivo o llévate un zip con las imágenes al lado.",
        ],
        supportedHeading: "Qué se admite",
        supported: [
          "Todos los .docx que Word ha escrito desde 2007, además de Word Online y Word para Mac",
          "Los .doc antiguos de Word 97–2003, detectados por la cabecera del archivo y no por la extensión",
          "Niveles de título como <h1>–<h6>, tomados de los estilos de Word y no adivinados por el tamaño de letra",
          "Tablas como <table>, listas como <ul>/<ol> con anidamiento real, enlaces, negrita, cursiva y tachado",
          "Citas, párrafos con estilo de código como <pre><code> y leyendas como <p class=\"caption\">",
          "Imágenes incrustadas: en base64, extraídas a una carpeta images/ para el zip, o descartadas",
        ],
        limitsHeading: "Qué no hace",
        limits: [
          "El formato visual de Word (tipografías, colores, espaciado exacto) no se traslada, y es deliberado",
          "Las celdas combinadas pierden colspan y rowspan; cada celda pasa a ser su propio <td>",
          "El control de cambios y los comentarios se descartan: recibes el texto final, no el historial de edición",
          "Los cuadros de texto, SmartArt y gráficos no sobreviven; solo su texto, si lo hay",
          "De los .doc antiguos no salen imágenes: ese formato las esconde donde un navegador no llega",
          "Los documentos cifrados se rechazan en lugar de leerse a medias",
        ],
      },
      faq: [
        {
          q: "¿En qué se diferencia de «Guardar como página web» de Word?",
          a: "La exportación de Word busca que la página se vea idéntica en un navegador, así que escribe un bloque enorme de CSS, un atributo de estilo mso- en casi todos los elementos, nombres de clase como MsoNormal y etiquetas exclusivas de Office como <o:p>. Esto hace lo contrario: lee la estructura y tira la presentación. Recibes unas decenas de líneas de HTML semántico en lugar de unos miles de líneas de marcado que no puedes editar.",
        },
        {
          q: "¿Qué pasa con mis imágenes?",
          a: "Tú eliges entre tres opciones. Base64 incrustado deja todo en un único archivo autocontenido, lo cual es cómodo y ocupa alrededor de un tercio más que la imagen original. Archivos aparte te da un zip: el HTML más una carpeta images/, con las etiquetas <img> ya apuntando a las rutas correctas. O descártalas del todo si solo quieres el texto.",
        },
        SAFETY,
        {
          q: "¿Funcionan los .doc antiguos?",
          a: "Sí. .doc es el binario OLE anterior a 2007, así que se lee byte a byte en tu navegador y se encamina por la misma etapa de salida. Obtienes texto, títulos, tablas, negrita y cursiva. Dos cosas no se pueden recuperar de ese formato: las imágenes y la numeración exacta de las listas. Si tienes Word a mano, un «Guardar como .docx» da un resultado más limpio.",
        },
        MODES,
        {
          q: "¿Por qué se han separado mis celdas combinadas?",
          a: "Porque en esta versión no se trasladan colspan ni rowspan. Una celda combinada pasa a ser una celda normal y sus vecinas salen vacías. La tabla sigue siendo HTML válido y se sigue leyendo; simplemente no está maquetada como en Word. Añadir un colspan a mano después suele ser un arreglo de una línea.",
        },
      ],
    },
    "google-docs-to-html": {
      short: "Google Docs → HTML",
      eyebrow: "Google Docs → HTML",
      title: "Google Docs a HTML — limpia la basura, gratis, sin iniciar sesión",
      description:
        "Pega desde Google Docs y obtén HTML limpio. La sopa de clases c1/c17, el envoltorio <b> con font-weight:normal y las redirecciones de enlaces de Google se eliminan. Sin acceso a Drive, sin complemento, sin iniciar sesión.",
      keywords: [
        "google docs a html",
        "exportar google docs a html",
        "limpiar html de google docs",
        "convertir documento de google a html",
        "google docs a html limpio",
      ],
      h1: ["Documento de Google a HTML.", "Menos la sopa de clases."],
      lede: [
        "Copiar de un documento te da HTML envuelto en nombres de clase que apuntan a una hoja de estilos que tú no tienes.",
        "Pégalo aquí y lo que queda es el documento: títulos, listas, tablas, enlaces.",
      ],
      note: {
        heading: "Cómo traerlo",
        items: [
          "Selecciona el contenido de tu documento y cópialo, no el enlace para compartir",
          "Pega abajo, o pulsa Ctrl+V en cualquier parte de esta página",
          "Sin OAuth, sin permisos, sin complementos",
        ],
      },
      body: {
        stepsHeading: "Cómo funciona",
        steps: [
          "Abre tu documento, selecciona el contenido y cópialo. Después pega en el cuadro de abajo o pulsa Ctrl+V en cualquier parte de esta página: tu navegador deja una versión con formato en el portapapeles y es la que se lee.",
          "Primero pasa por DOMPurify, porque el HTML del portapapeles puede venir de cualquier página de la web. Después se quita la basura específica de Google: las clases c1/c17, el envoltorio <b style=\"font-weight:normal\"> que Docs pone alrededor de todo, los identificadores docs-internal-guid y la redirección google.com/url?q= que envuelve cada enlace.",
          "Revisa la vista previa con sandbox y después copia el HTML o descárgalo como archivo.",
        ],
        supportedHeading: "Qué se admite",
        supported: [
          "Texto con formato copiado directamente de Google Docs, Word Online, Notion o cualquier otro editor web",
          "Código HTML pegado como texto, y archivos .html guardados",
          "Títulos, párrafos, listas con anidamiento real, tablas, enlaces, negrita, cursiva y tachado",
          "Desenvolver el <b style=\"font-weight:normal\"> sin sentido con el que Docs rodea todo el documento",
          "Deshacer las redirecciones google.com/url?q= para recuperar la URL que enlazaste de verdad",
          "Quitar los parámetros utm_ y otros de seguimiento de los enlaces de tu documento",
        ],
        limitsHeading: "Qué no hace",
        limits: [
          "No se conecta con tu cuenta de Google: nada de aquí puede ver tu Drive",
          "Al pegar no vienen las imágenes: el portapapeles solo las referencia en los servidores de Google",
          "Los comentarios y las sugerencias se descartan; resuélvelos antes de copiar",
          "Los gráficos, dibujos y chips inteligentes llegan como texto plano, en el mejor de los casos",
          "Copiar el enlace para compartir en lugar del contenido te deja con un enlace, y eso es todo lo que hay que convertir",
          "Las tipografías y los colores de Google se eliminan junto con el resto del estilo",
        ],
      },
      faq: [
        {
          q: "¿Por qué es tan desastroso el HTML de Google Docs?",
          a: "Porque nunca se pensó para que lo leyeras tú. Docs escribe una hoja de estilos llena de reglas como .c1 y .c17, y luego etiqueta cada elemento con la clase correspondiente. Copias el contenido y las clases se vienen contigo, pero la hoja de estilos no: acabas con marcado cubierto de nombres de clase que ya no significan nada. Encima de eso hay un <b style=\"font-weight:normal\"> que envuelve el documento entero, algo que no hace nada en cuanto a formato, y cada enlace se reescribe para pasar por google.com/url?q=.",
        },
        {
          q: "¿Hace falta instalar un complemento o iniciar sesión?",
          a: "No, y aquí no hay nada donde iniciar sesión. Esta página lee tu portapapeles cuando pegas, algo que tu navegador hace en cualquier sitio. Pedir acceso a Drive significaría solicitar permiso sobre todos tus archivos y mantener un servidor que guarde un token. Un copiar y pegar te cuesta dos segundos y no nos entrega nada.",
        },
        {
          q: "¿Qué ha pasado con mis imágenes?",
          a: "No han llegado, y no pueden. Al copiar de un documento, el HTML del portapapeles apunta a URL de imágenes en los servidores de Google en lugar de llevar los datos de la imagen. Esas direcciones necesitan tu sesión para cargarse, así que se romperían para cualquier otra persona. Si necesitas las imágenes, usa Archivo → Descargar → Microsoft Word (.docx) y lleva ese archivo a la página de DOCX.",
        },
        SAFETY,
        {
          q: "¿Funciona con Notion, Word Online o Confluence?",
          a: "Sí. La limpieza específica de Google es la parte más agresiva, pero el trabajo general (desinfectar, desenvolver elementos inútiles, eliminar clases muertas y parámetros de seguimiento) se aplica a cualquier cosa que pegues. Merece la pena probar aquí el texto con formato de cualquier editor web.",
        },
        MODES,
      ],
    },
    "text-to-html": {
      short: "Texto → HTML",
      eyebrow: "Texto plano → HTML",
      title: "Convertidor de texto a HTML — párrafos, saltos de línea, entidades escapadas",
      description:
        "Convierte texto plano en párrafos HTML. Las líneas en blanco separan párrafos, las URL sueltas se enlazan (opcional), los saltos de línea se vuelven <br> (opcional) y &, < y > se escapan correctamente.",
      keywords: [
        "texto a html",
        "texto plano a html",
        "convertidor txt a html",
        "texto a párrafos html",
        "convertir texto a html online",
      ],
      h1: ["Texto plano a HTML.", "Con los párrafos bien puestos."],
      lede: [
        "Una línea en blanco abre un <p> nuevo. Las URL sueltas se enlazan si quieres. Los signos de menor y mayor se escapan, así que el texto sigue siendo texto.",
        "La herramienta más simple del sitio, y la que más gente rehace a mano.",
      ],
      note: {
        heading: "Conviene saber",
        items: [
          "Una línea en blanco significa párrafo nuevo",
          "URL y correos enlazados, o intactos",
          "&, < y > escapados para que nada se pierda",
        ],
      },
      body: {
        stepsHeading: "Cómo funciona",
        steps: [
          "Pega tu texto en el cuadro o suelta un archivo .txt arriba. Los finales de línea de Windows, Mac y Unix se tratan igual.",
          "Las líneas en blanco parten el texto en párrafos. Dentro de un párrafo, los saltos de línea sueltos se vuelven <br> o se dejan fluir: tú eliges. Los caracteres especiales de HTML se escapan al pasar.",
          "Activa o desactiva la detección de URL, elige fragmento o página completa, y copia el HTML o descarga el archivo.",
        ],
        supportedHeading: "Qué se admite",
        supported: [
          "Separación de párrafos por líneas en blanco, con varias seguidas contando como una sola",
          "Saltos de línea sueltos conservados como <br>, o unidos en una sola línea",
          "URL con http:// y https://, además de direcciones que empiezan por www., convertidas en enlaces",
          "Direcciones de correo convertidas en enlaces mailto:",
          "&, <, > y las comillas escapados, así que un <b> literal en tu texto sigue viéndose como texto",
          "Finales de línea CRLF, CR y LF, y una marca de orden de bytes al principio del archivo",
        ],
        limitsHeading: "Qué no hace",
        limits: [
          "No analiza Markdown: **negrita** se queda en asteriscos. Para eso usa la página de Markdown.",
          "La sangría no se lee como estructura: un bloque sangrado con tabuladores no se vuelve lista ni bloque de código",
          "No adivina títulos: una línea corta en mayúsculas sigue siendo un párrafo",
          "Las tablas maquetadas con espacios se quedan en texto; para tablas de verdad usa la página de CSV",
          "Archivos de más de 25 MB",
        ],
      },
      faq: [
        {
          q: "¿Cómo decide dónde están los párrafos?",
          a: "Por la línea en blanco. Es la única convención que ya sigue todo el que escribe en texto plano, y no hace falta adivinar nada. Varias líneas en blanco seguidas cuentan como una. Si tu texto no tiene ninguna, tendrás un solo párrafo largo, y se te avisa en lugar de dejarte con la duda.",
        },
        {
          q: "¿Y si no quiero que mis URL se conviertan en enlaces?",
          a: "Desactiva la opción de URL sueltas y se quedan como texto plano. Merece la pena cuando escribes sobre URL en lugar de enlazarlas: un tutorial, un registro de errores, un archivo de configuración.",
        },
        {
          q: "¿Por qué mi <b> aparece como texto en lugar de poner algo en negrita?",
          a: "Porque eso es lo que significa convertir texto plano a HTML. Tu entrada es texto, así que un <b> literal son tres caracteres visibles y sale como &lt;b&gt;. Si quieres que las etiquetas funcionen, tu entrada no es texto plano: prueba la página de Markdown, o la de Google Docs si vas a pegar texto con formato.",
        },
        {
          q: "¿Para qué sirve la opción de <br>?",
          a: "Para poesía, direcciones, salidas de registro: cualquier cosa donde los saltos de línea forman parte del significado. Desactívala para prosa que se ajustó a mano a 80 columnas, donde quieres que el navegador la reajuste al ancho del lector.",
        },
        MODES,
        PRIVACY,
      ],
    },
    "csv-to-html-table": {
      short: "CSV → tabla",
      eyebrow: "CSV → tabla HTML",
      title: "Convertidor de CSV a tabla HTML — gratis, pegando o subiendo",
      description:
        "Convierte CSV en una tabla HTML semántica. Las comas, los puntos y coma y los tabuladores se detectan automáticamente, la primera fila se vuelve <thead> y un CSS responsive opcional permite desplazarla en pantallas estrechas.",
      keywords: [
        "csv a tabla html",
        "csv a html",
        "convertir csv a tabla html",
        "tsv a tabla html",
        "csv a tabla online",
      ],
      h1: ["CSV a una tabla HTML.", "Semántica, no una rejilla de div."],
      lede: [
        "La primera fila se vuelve un <thead> real con atributos scope, así que un lector de pantalla puede leer la tabla como una tabla.",
        "Las comas entre comillas, los saltos de línea dentro de una celda y las exportaciones europeas con punto y coma están cubiertos.",
      ],
      note: {
        heading: "Conviene saber",
        items: [
          "El separador se lee del archivo y puedes cambiarlo",
          "<thead> y <th scope=\"col\">, no div con estilos",
          "CSS responsive opcional para pantallas estrechas",
        ],
      },
      body: {
        stepsHeading: "Cómo funciona",
        steps: [
          "Suelta un .csv o .tsv arriba, o pega las filas directamente en el cuadro. Nada sale de la pestaña.",
          "El separador se deduce del propio archivo (coma, punto y coma, tabulador o barra vertical) y se indica encima de la salida. Cámbialo si la deducción falla.",
          "Elige si la primera fila es un encabezado y si incluir el CSS responsive, y copia el HTML o descarga el archivo.",
        ],
        supportedHeading: "Qué se admite",
        supported: [
          "Cualquier separador que haya usado la exportación, deducido del archivo o puesto a mano",
          "Los campos entrecomillados llegan enteros; un salto de línea dentro de una celda se vuelve <br> en lugar de romper la fila",
          "Exportaciones alemanas, francesas y españolas, donde el separador es el punto y coma porque la coma es el decimal",
          "Primera fila como <thead> con <th scope=\"col\">, o sin encabezado",
          "Una marca de orden de bytes inicial, descartada para que no acabe dentro de tu primer <th>",
          "Filas cortas rellenadas con <td> vacíos para que todas lleven el mismo número de celdas",
        ],
        limitsHeading: "Qué no hace",
        limits: [
          "UTF-8 a la entrada y a la salida, que es lo que declara el meta charset; otras codificaciones pueden llegar con caracteres extraños",
          "25 MB de texto y 100.000 celdas de una vez",
          "El texto de la celda se escapa, nunca se reformatea: 007 llega al <td> como 007",
          "Sin ordenar, filtrar ni totalizar: convierte, no calcula",
          "No hay JavaScript en la salida, así que la tabla no es interactiva",
          "Las comillas sin cerrar derrotan a cualquier lector de CSV, y las celdas pueden caer en la columna equivocada",
        ],
      },
      faq: [
        {
          q: "¿Por qué una <table> y no div con CSS grid?",
          a: "Porque los datos tabulares son justo para lo que existe el elemento table. Un lector de pantalla anuncia las dimensiones, permite moverse celda a celda y lee el encabezado de columna con cada celda; nada de eso lo da una rejilla de div. Los motores de búsqueda también lo leen como datos. El estilo no es razón para renunciar a ello.",
        },
        {
          q: "¿Qué hace exactamente el CSS responsive?",
          a: "Muy poco, a propósito. Envuelve la tabla en un div que se desplaza horizontalmente cuando es demasiado ancha, y aplica border-collapse con un relleno y unos bordes discretos. Es el mínimo que una tabla necesita para ser usable en un móvil. Todo lo demás queda para tu hoja de estilos. Desactívalo y obtienes la <table> desnuda.",
        },
        {
          q: "Mi exportación usa punto y coma. ¿Funcionará?",
          a: "Sí. Donde la coma hace de separador decimal, la hoja de cálculo exporta con punto y coma; eso se lee del archivo y se indica encima de la salida. Cámbialo si la deducción falla.",
        },
        {
          q: "Una celda tiene una coma. ¿Se me desplazan las columnas?",
          a: "No, siempre que el campo esté entrecomillado, que es lo que hace cualquier escritor de CSV correcto. \"Smith, John\" llega como un único <td>. Un salto de línea dentro de un campo entrecomillado también se conserva: se emite como <br> para que la fila no se parta en dos.",
        },
        PRIVACY,
        MODES,
      ],
    },
    "excel-to-html-table": {
      short: "Excel → tabla",
      eyebrow: "Excel → tabla HTML",
      title: "Convertidor de Excel a tabla HTML — elige tus hojas, gratis",
      description:
        "Convierte un libro .xlsx en tablas HTML semánticas. Elige qué hojas incluir, define la fila de encabezado y obtén los valores mostrados en las celdas en lugar del código de las fórmulas. Nada se sube.",
      keywords: [
        "excel a tabla html",
        "xlsx a html",
        "excel a html",
        "convertir excel a tabla html",
        "hoja de cálculo a tabla html",
      ],
      h1: ["Hoja de cálculo a tabla HTML.", "Valores, no fórmulas."],
      lede: [
        "Suelta un .xlsx, elige las hojas que quieras y obtén una <table> limpia por cada una.",
        "Los colores y las tipografías se quedan fuera a propósito: una tabla que trae su propio estilo pelea con todos los sitios donde la pegues.",
      ],
      note: {
        heading: "Conviene saber",
        items: [
          "Todas las hojas listadas: marca las que quieras",
          "Valores de celda tal como se muestran, no el código de la fórmula",
          "100.000 celdas por ejecución",
        ],
      },
      body: {
        stepsHeading: "Cómo funciona",
        steps: [
          "Suelta un .xlsx arriba. El libro se abre en la pestaña y cada nombre de hoja aparece como un botón.",
          "La hoja uno se convierte al momento. Activa y desactiva las demás: el libro se queda en memoria, así que nada se lee dos veces.",
          "Define si la primera fila es un encabezado y si incluir el CSS responsive, y copia el HTML o descarga el archivo.",
        ],
        supportedHeading: "Qué se admite",
        supported: [
          "Todo lo que guarde .xlsx: Excel 2007 y posterior, LibreOffice Calc, Numbers, Google Sheets",
          "Varias hojas, cada una convertida en su propia tabla bajo un <h2> con el nombre de la hoja",
          "El valor que vería un lector: un <td> recibe 42, nunca =SUMA(A1:A9)",
          "Fechas escritas como texto ISO en lugar del número de serie estilo 45000 que Excel guarda por dentro",
          "Primera fila como <thead> con <th scope=\"col\">, o sin encabezado",
          "Un <caption> en la tabla cuando conviertes una sola hoja, que los lectores de pantalla leen primero",
        ],
        limitsHeading: "Qué no hace",
        limits: [
          "Los colores, las tipografías, los bordes y el formato condicional no se reproducen: es una decisión de diseño en esta versión",
          "Las celdas combinadas pierden colspan y rowspan; cada celda pasa a ser su propio <td>",
          "Las fórmulas no se trasladan como fórmulas y nada se recalcula",
          "El binario .xls anterior a 2007 es un formato completamente distinto, y no se procesa",
          "Los gráficos, las tablas dinámicas y las imágenes de la hoja no se exportan",
          "Un libro cifrado no se puede abrir aquí: guarda antes una copia sin protección",
          "Selecciones de más de 100.000 celdas",
        ],
      },
      faq: [
        {
          q: "¿Por qué no se trasladan mis colores y tipografías?",
          a: "Porque una tabla que trae sus propios colores pierde la pelea con la hoja de estilos de tu sitio nueve veces de cada diez, y acabas borrando los estilos en línea a mano. Lo útil es una <table> limpia con la estructura correcta, con el estilo que le dé la página donde aterrice. Si necesitas exactamente el aspecto original, «Guardar como página web» de Excel te lo dará, junto con varios miles de líneas de marcado.",
        },
        {
          q: "¿El <td> lleva la fórmula o el resultado?",
          a: "El resultado. Un libro conserva tanto la fórmula como su último valor calculado, y el valor es lo que corresponde a una página web: así que =SUMA(A1:A9) se escribe como 42.",
        },
        {
          q: "Una celda con fórmula salió vacía. ¿Por qué?",
          a: "Porque no había ningún valor en caché que leer en el archivo. Excel escribe uno en cada guardado, pero un libro producido por un script y nunca abierto en Excel no tiene ninguno. Ábrelo una vez, guárdalo y luego conviértelo.",
        },
        {
          q: "¿Pueden ir varias hojas a un mismo archivo?",
          a: "Sí. Marca todos los nombres de hoja que quieras; cada uno sale como su propia <table>, con un <h2> encima que lleva el nombre de esa hoja.",
        },
        {
          q: "¿Y una combinación de celdas?",
          a: "Se deshace. Cada celda del rango sale como su propio <td>, el valor en la primera y las demás vacías. HTML sabe expresar eso con colspan y rowspan, pero deducir los rangos correctamente desde un libro es trabajo de una segunda fase; por ahora la salida se presenta como la rejilla simple que es.",
        },
        PRIVACY,
      ],
    },
  },
  legal: {
    about: {
      short: "Acerca de",
      eyebrow: "Sobre este sitio",
      title: "Sobre Docs 2 HTML — quién lo hace y por qué",
      description:
        "Docs 2 HTML es un convertidor gratuito que funciona en el navegador y transforma Markdown, Word, Google Docs, texto, CSV y Excel en HTML limpio. Sin cuentas, sin subidas, sin rastreo. Aquí explicamos cómo y por qué.",
      h1: "Una herramienta pequeña, y el razonamiento detrás",
      lede: [
        "Docs 2 HTML convierte documentos en HTML que estarías dispuesto a firmar. Ese es todo el producto.",
        "Lo construye y mantiene una sola persona, de forma independiente, y funciona íntegramente dentro de tu navegador.",
      ],
      sections: [
        {
          heading: "Por qué existe",
          body: [
            "Todas las herramientas de escritura ya exportan HTML. Ahí está el problema. «Guardar como página web» de Word produce miles de líneas con un atributo de estilo mso- en casi cada elemento. Google Docs te entrega nombres de clase como c1 y c17 que apuntan a una hoja de estilos que no has recibido. Ambos son técnicamente HTML y ambos son inservibles como código fuente de una página web: no puedes leerlos, no puedes editarlos y no puedes pegarlos en una plantilla sin que peleen con tu CSS.",
            "Lo que la gente quiere en realidad es el marcado que habría escrito a mano: un <h2> donde hay un título, una <table> donde hay una tabla, y nada más. Llegar ahí desde una exportación oficial significa borrar más de lo que conservas, así que la mayoría lo hace a mano o se rinde y pega el desastre.",
            "Este sitio hace el borrado. Lee la estructura de tu documento y escribe HTML semántico a partir de ella, tirando la presentación en lugar de intentar reproducirla.",
          ],
        },
        {
          heading: "Por qué funciona en tu navegador",
          body: [
            "La mayoría de los convertidores suben tu archivo a un servidor, lo convierten allí y te dan una descarga. Es un diseño razonable, y también un diseño en el que tu documento pasa un rato en el ordenador de otra persona. Para el borrador de una entrada de blog da igual. Para un contrato, un historial médico, unas cifras internas o un manuscrito inédito, no.",
            "Así que la conversión corre en tu propia máquina, en JavaScript, en la pestaña que ya tienes abierta. No hay paso de subida porque no hay ningún sitio al que subir. Puedes comprobarlo: desconecta la red y convierte algo, o mira la pestaña de red de tu navegador mientras sueltas un archivo.",
          ],
        },
        {
          heading: "Cómo funciona en realidad",
          body: [
            "Cuando sueltas un archivo, tu navegador lo lee localmente y entrega los bytes a un analizador que también corre en tu navegador. El analizador produce una estructura, esa estructura se convierte en HTML y el HTML se desinfecta antes de que lo veas. Los analizadores son bibliotecas de código abierto, elegidas según el formato:",
          ],
          items: [
            "markdown-it analiza Markdown, con la especificación CommonMark más las tablas, listas de tareas y tachado de GitHub.",
            "Mammoth lee .docx. El .doc antiguo lo analiza nuestro propio lector, byte a byte, porque es un formato binario anterior a 2007 sin ninguna biblioteca que funcione en un navegador.",
            "DOMPurify desinfecta cada trozo de HTML que pasa por aquí, incluido el que generamos nosotros, porque el texto que contiene viene de tu documento.",
            "Papa Parse lee CSV y TSV; read-excel-file lee libros .xlsx.",
          ],
        },
        {
          heading: "Sobre la parte de la seguridad",
          body: [
            "Una herramienta que produce HTML tiene un deber que un convertidor a Markdown no tiene: lo que te entrega puede acabar pegado en un sitio web en funcionamiento, donde se ejecutará. Así que desinfectar no es aquí una función, es el suelo. Las etiquetas script, los atributos de manejadores de eventos, las URL javascript:, los iframe, los object y los embed se eliminan de todo, y nada sin desinfectar se inserta jamás en el DOM de esta página.",
            "La vista previa es un asunto aparte, y se muestra dentro de un iframe con sandbox, con los scripts desactivados y un origen opaco. Es decir: no puede alcanzar esta página, no puede leer nada y no puede ejecutarse, aunque el desinfectante hubiera pasado algo por alto. Dos muros independientes, porque uno solo es un punto único de fallo.",
          ],
        },
        {
          heading: "Lo que deliberadamente no hace",
          body: [
            "No hay cuentas, porque no hay nada que guardar. No hay API, porque no hay servidor al que llamar. No hay conexión con Google Drive, porque eso implicaría pedir acceso a todos tus archivos y custodiar un token.",
            "Cada conversión tiene además límites reales, y cada página de herramienta enumera los suyos. Las celdas combinadas se separan. Los colores y las tipografías de Excel no se reproducen. Las imágenes no pueden pasar por un pegado desde Google Docs. Eso se dice de antemano en lugar de descubrirse después de convertir algo que importaba.",
          ],
        },
        {
          heading: "Cómo se paga",
          body: [
            "La herramienta es gratuita y no tiene versión de pago. El plan es cubrir el alojamiento con publicidad, por lo que en el futuro puede que veas anuncios en estas páginas. Los anuncios nunca se colocarán de forma que se confundan con un botón de descargar o convertir, y no se insertarán después de una conversión de manera que la página se mueva bajo tu cursor.",
            "La publicidad no cambia el funcionamiento de la conversión. Tus archivos se quedan en tu máquina de todas formas: no es una decisión de política que pudiera revertirse por dinero, es la consecuencia de que no haya servidor en primer lugar.",
          ],
        },
        {
          heading: "El sitio hermano",
          body: [
            "DocsToMD hace el mismo trabajo en la dirección contraria: Word, PDF, HTML, CSV y Excel a Markdown. Mismo enfoque, mismo modelo de privacidad, formato de salida opuesto. Si has llegado aquí buscando Markdown, ese es el que quieres.",
          ],
        },
      ],
    },
    contact: {
      short: "Contacto",
      eyebrow: "Ponte en contacto",
      title: "Contactar con Docs 2 HTML",
      description:
        "Escríbenos sobre un archivo que no se convierte, un HTML que ha salido mal, una traducción que suena rara o una función que quieres. Una sola persona lo lee todo.",
      h1: "Escríbenos",
      lede: [
        "Una sola persona lee este buzón, así que las respuestas no son instantáneas, pero son respuestas de verdad, no un número de ticket.",
        `Correo: ${CONTACT_EMAIL}`,
      ],
      sections: [
        {
          heading: "El HTML ha salido mal",
          body: [
            "Es lo más útil que puedes contarnos, y también lo más delicado, porque no podemos ver tu archivo. Así que descríbelo en lugar de enviarlo:",
          ],
          items: [
            "En qué página estabas y cuál era la entrada: un .docx, un pegado desde Google Docs, un .csv",
            "Qué esperabas en la salida y qué obtuviste: una tabla que falta, un título convertido en párrafo, un atributo que debería haberse eliminado",
            "El fragmento relevante del HTML que obtuviste, si puedes compartirlo; unas pocas líneas suelen bastar",
            "Tu navegador y sistema operativo, ya que el portapapeles y el análisis se comportan de forma distinta según el entorno",
          ],
        },
        {
          heading: "Informes de seguridad",
          body: [
            "Si has encontrado una entrada que produce HTML con algo ejecutable (un manejador de eventos que sobrevive, una URL javascript:, una etiqueta que debería haberse eliminado), escríbenos e incluye la entrada exacta que lo provoca. Es la única clase de fallo aquí que podría dañar a alguien más adelante, y se corrige antes que cualquier otra cosa.",
            "Comunícalo primero en privado en lugar de publicarlo. No hay programa de recompensas; hay una corrección rápida y un agradecimiento sincero.",
          ],
        },
        {
          heading: "Por favor, no nos envíes tus documentos",
          body: [
            "El sentido de este sitio es que tus archivos se queden en tu ordenador. Enviarnos uno por correo lo desmonta por tu parte y nos pone en una posición en la que preferimos no estar. Si puedes reproducir el problema con un archivo que no importe (un par de títulos y una tabla escritos en un documento nuevo), en realidad es más útil, porque aísla el fallo.",
            "Si un problema no se puede reproducir de verdad sin el archivo original, escríbenos primero y vemos qué hace falta. Normalmente la respuesta es una descripción de la estructura, no del contenido.",
          ],
        },
        {
          heading: "Traducciones",
          body: [
            "Este sitio está en seis idiomas. El inglés es el original y el resto se tradujo con cuidado, pero un hablante nativo seguirá detectando cosas que una traducción cuidadosa no ve: una frase técnicamente correcta que suena rara, un término que el mundo local del software dice de otra manera.",
            "Si detectas alguna, dinos el idioma y la página, y cita la frase. Las correcciones pequeñas son bienvenidas y se aplican rápido.",
          ],
        },
        {
          heading: "Funciones, y cosas que no vamos a hacer",
          body: [
            "Las peticiones de funciones se leen y a menudo se implementan, sobre todo las pequeñas: un ajuste para un estilo de salida, la compatibilidad con una variante de formato, un delimitador que no detectamos, un gancho CSS que necesitas en la salida.",
            "Algunas cosas están fuera del alcance por diseño y pedirlas no las cambiará: subir archivos a un servidor, integración con Google Drive, cuentas de usuario o reproducir con exactitud el estilo de Word y Excel. Lo último no es una limitación por la que nos disculpemos: el marcado limpio es el producto.",
          ],
        },
        {
          heading: "Privacidad y aspectos legales",
          body: [
            "Las preguntas sobre qué datos recoge este sitio, o las solicitudes relativas a tus datos según el RGPD, la CCPA o leyes similares, van a la misma dirección. Lee antes la política de privacidad: la versión corta es que no recogemos nada que te identifique, lo que deja sin objeto la mayoría de esas solicitudes, y la política explica exactamente por qué.",
          ],
        },
      ],
    },
    privacy: {
      short: "Privacidad",
      eyebrow: "Política de privacidad",
      title: "Política de privacidad — Docs 2 HTML",
      description:
        "Qué recoge y qué no recoge Docs 2 HTML. Tus documentos se procesan en tu navegador y nunca se suben. Sin cuentas, sin analíticas de tus archivos, sin venta de datos.",
      h1: "Política de privacidad",
      lede: [
        "Los documentos que convieres aquí nunca salen de tu ordenador. No es una promesa sobre cómo tratamos tus datos: no existe ningún paso en el que los recibamos.",
        "Esta página lo explica en detalle y es honesta con las partes en las que interviene un tercero.",
      ],
      sections: [
        {
          heading: "Tus documentos",
          body: [
            "Los archivos que sueltas, eliges o pegas en este sitio los lee tu propio navegador y los convierte código que corre en tu propia máquina. No se transmiten a nosotros, ni a un proveedor de alojamiento, ni a nadie más. No hay conversión en el servidor, ni cola, ni almacenamiento temporal, ni caché de tu contenido.",
            "Tampoco se escribe nada en tu dispositivo. No guardamos tus archivos ni su resultado convertido en almacenamiento local, IndexedDB o una cookie. Cierra la pestaña y el contenido desaparece; las únicas copias son el archivo con el que empezaste y lo que hayas copiado o descargado a propósito.",
            "El panel de vista previa merece una nota, porque parece una excepción. No lo es: la vista previa es un iframe cuyo contenido le entrega directamente la página que ya tienes abierta, usando srcdoc. No se descarga nada y no se envía nada. El marco tiene sandbox y un origen opaco, así que tampoco puede leer nada.",
            "Puedes verificar todo esto. Desconecta la red y convierte un archivo: sigue funcionando. O abre las herramientas de desarrollo, mira la pestaña de red y confirma que soltar un archivo no produce ninguna subida.",
          ],
        },
        {
          heading: "Qué sí recogemos",
          body: [
            "No pedimos ni almacenamos tu nombre, tu correo ni datos de cuenta, porque no hay cuentas.",
            "El sitio se aloja en Cloudflare Pages. Como cualquier alojamiento web, procesa datos de petición estándar cuando tu navegador solicita una página: dirección IP, agente de usuario, la URL solicitada y la hora. Es inherente al funcionamiento de la web y se usa para servir el sitio y bloquear abusos. Lo consultamos de forma agregada para ver qué páginas reciben tráfico. No está vinculado a nada que conviertas, porque tus conversiones nunca llegan a ningún servidor.",
          ],
        },
        {
          heading: "Cookies y publicidad",
          body: [
            "El sitio en sí no establece ninguna cookie. No tiene inicio de sesión, ni carrito, ni preferencias que recordar entre visitas, así que no hay nada que una cookie deba guardar.",
            "Tenemos la intención de mostrar publicidad de Google AdSense para cubrir los costes de alojamiento. Cuando esté activada, Google podrá establecer cookies o leer identificadores de dispositivo para servir y medir anuncios, conforme a sus propias políticas. Es la única parte de este sitio donde un tercero ve algo sobre tu visita, y se refiere a la página en la que estás, no al documento que convertiste, que Google no tiene forma de ver.",
            "Si estás en el Espacio Económico Europeo, el Reino Unido o Suiza, se te pedirá consentimiento antes de usar cookies no esenciales, y podrás retirarlo después. La política de cookies explica las categorías y cómo cambiar de opinión.",
          ],
        },
        {
          heading: "Terceros",
          body: ["La lista es deliberadamente corta:"],
          items: [
            "Cloudflare Pages aloja los archivos estáticos que componen este sitio.",
            "Google AdSense, una vez activado, sirve la publicidad descrita más arriba.",
            "Los archivos de Google Fonts se alojan aquí, servidos desde este dominio, así que pedir una página no le dice a Google que has estado.",
            "No se carga ninguna plataforma de analítica, grabador de sesiones, mapa de calor, widget de chat ni contenido social incrustado en ninguna página.",
          ],
        },
        {
          heading: "Menores",
          body: [
            "Esta es una utilidad de conversión de documentos sin funciones sociales y sin cuentas. No está dirigida a menores de 13 años y, como no recogemos información personal de nadie, tampoco la recogemos a sabiendas de menores.",
          ],
        },
        {
          heading: "Tus derechos",
          body: [
            "Según el RGPD, la CCPA y leyes similares, tienes derecho a acceder, corregir, eliminar y portar tus datos personales, y a oponerte a su tratamiento. Los respetamos todos y, en la práctica, aquí las solicitudes son inusualmente fáciles de responder, porque no conservamos ningún archivo que hayas convertido ni ningún perfil tuyo que entregar, corregir o eliminar.",
            "Para las cookies publicitarias descritas antes, el responsable es Google, y sus propias herramientas te dan el control más directo sobre la personalización de anuncios. Escríbenos y te indicaremos el sitio adecuado.",
          ],
        },
        {
          heading: "Cambios en esta política",
          body: [
            "Si esta política cambia de forma sustancial (un nuevo tercero, una nueva categoría de datos), la fecha de la parte superior de esta página cambia con ella. Como el sitio no guarda direcciones de correo, no podemos avisarte directamente, así que esa fecha es la señal honesta que hay que vigilar.",
          ],
        },
      ],
    },
    terms: {
      short: "Términos",
      eyebrow: "Términos del servicio",
      title: "Términos del servicio — Docs 2 HTML",
      description:
        "Los términos de uso de Docs 2 HTML: gratis para cualquier fin, incluido el comercial; se ofrece tal cual; conservas todos los derechos sobre tus documentos; y revisas la salida antes de publicarla.",
      h1: "Términos del servicio",
      lede: [
        "Usar este sitio implica aceptar lo que sigue. Es corto, porque una herramienta gratuita de navegador que no guarda nada no necesita mucho más.",
      ],
      sections: [
        {
          heading: "Qué puedes hacer con esto",
          body: [
            "Úsalo para lo que quieras, incluido trabajo comercial. Convierte tantos archivos como quieras. Sin cuenta, sin clave de licencia, sin atribución obligatoria y sin límite en el uso de la salida: el HTML que produce es tuyo para publicarlo, venderlo o modificarlo.",
            "Hay dos advertencias prácticas, y existen en beneficio de la herramienta más que del nuestro: cada archivo debe estar por debajo del límite de tamaño indicado en la página, y la conversión corre en tu máquina, así que un documento muy grande lo limita tu propia memoria y procesador, no una cuota que hayamos puesto nosotros.",
          ],
        },
        {
          heading: "Tus documentos siguen siendo tuyos",
          body: [
            "Conservas todos los derechos que tenías sobre los archivos que convieres y sobre el HTML resultante. No reclamamos ninguna licencia sobre ninguno de los dos, y no podríamos aprovecharlos ni queriendo: la conversión ocurre en tu navegador y tu contenido no llega a nosotros.",
            "Eres responsable de tener derecho a convertir lo que convieres. Si un documento no es tuyo para procesarlo, esta herramienta no cambia eso.",
          ],
        },
        {
          heading: "Revisa la salida antes de publicarla",
          body: [
            "El sitio es gratuito y se ofrece sin garantía. Buscamos una conversión precisa y segura, y documentamos los límites conocidos de cada formato en su propia página, pero ningún convertidor es perfecto.",
            "Aquí esto importa más que en la mayoría de herramientas, porque la salida es HTML y es probable que la pongas en un sitio web en funcionamiento. Toda entrada se desinfecta (se eliminan scripts, manejadores de eventos, URL javascript: y contenidos incrustados) y tratamos un fallo de eso como el tipo de error más grave. Pero no podemos garantizar que el marcado producido a partir de una entrada arbitraria sea seguro para todos los contextos en los que puedas pegarlo. Revisa lo que publicas, exactamente igual que revisarías HTML de cualquier otra fuente externa.",
            "La estructura también tiene límites: las celdas combinadas se separan, el estilo de Excel no se reproduce y las maquetaciones complejas de Word se aplanan. Para cualquier cosa importante, compara la salida con el original.",
            "En la medida en que la ley lo permita, no somos responsables de pérdidas de datos, de trabajo, de beneficios ni de otros daños derivados del uso del sitio o de la confianza en su salida.",
          ],
        },
        {
          heading: "Uso aceptable",
          body: [
            "No uses el sitio para procesar material sobre el que no tengas derechos, ni de formas que perjudiquen al sitio o a otras personas:",
          ],
          items: [
            "No intentes romper, sobrecargar o encontrar vulnerabilidades en el sitio con el fin de dañarlo o dañar a sus usuarios. Si encuentras un problema de seguridad, comunícalo.",
            "No hagas scraping ni automatices el sitio de forma que lo degrade para los demás.",
            "No republiques el sitio como si fuera tuyo, ni lo presentes como si lo gestionara otra persona.",
            "No interfieras con la publicidad que financia el alojamiento, ni la bloquees ni la infles artificialmente.",
          ],
        },
        {
          heading: "El software en el que se apoya",
          body: [
            "Esta herramienta se sostiene sobre bibliotecas de código abierto (markdown-it, Mammoth, DOMPurify, Papa Parse, read-excel-file y otras), cada una con su propia licencia y con los avisos conservados en el código distribuido. Esas licencias cubren esos componentes; estos términos cubren este sitio.",
          ],
        },
        {
          heading: "Disponibilidad y cambios",
          body: [
            "Este es un servicio gratuito gestionado por una persona. Podemos cambiar su funcionamiento, añadir o retirar un formato, o dejarlo fuera de servicio, sin avisar. Como aquí no se guarda nada tuyo, una caída te cuesta el acceso a un convertidor y nada más.",
            "Si estos términos cambian, la fecha de la parte superior de esta página cambia con ellos. Seguir usando el sitio después de eso significa aceptar la versión revisada.",
          ],
        },
      ],
    },
    cookies: {
      short: "Cookies",
      eyebrow: "Política de cookies",
      title: "Política de cookies — Docs 2 HTML",
      description:
        "Qué cookies usa Docs 2 HTML. El sitio en sí no establece ninguna. La publicidad, una vez activada, puede establecerlas, y en el EEE, el Reino Unido y Suiza solo con tu consentimiento.",
      h1: "Política de cookies",
      lede: [
        "Este sitio no establece cookies propias. No hay inicio de sesión ni nada que recordar entre visitas.",
        "La excepción es la publicidad, y esta página dice exactamente qué implica.",
      ],
      sections: [
        {
          heading: "Qué es una cookie, en breve",
          body: [
            "Una cookie es un pequeño fragmento de texto que un sitio pide a tu navegador que guarde y devuelva en visitas posteriores. Es como un sitio reconoce que dos cargas de página vienen del mismo navegador: útil para mantener la sesión, e igual de útil para rastrear. Tecnologías relacionadas como el almacenamiento local y los identificadores de dispositivo hacen prácticamente lo mismo por otros medios, y también quedan cubiertas aquí.",
          ],
        },
        {
          heading: "Cookies que establece este sitio",
          body: [
            "Ninguna. Ni una, a día de hoy.",
            "No hay cuenta en la que mantener la sesión, ni carrito, ni preferencia que guardar entre visitas. Incluso los ajustes del convertidor (fragmento o página completa, sangría, fila de encabezado, delimitador) viven solo en la página mientras la tienes abierta y se reinician al recargar. Tus archivos y su resultado convertido tampoco se escriben nunca en almacenamiento local, IndexedDB o una cookie.",
          ],
        },
        {
          heading: "Cookies publicitarias",
          body: [
            "El alojamiento se paga con publicidad, y tenemos la intención de usar Google AdSense. Cuando esté en marcha, Google podrá establecer cookies o leer identificadores de dispositivo para servir anuncios, limitar cuántas veces ves el mismo y medir clics. En algunas configuraciones, esas cookies se usan para personalizar anuncios según tu navegación en otros sitios.",
            "Estas cookies las establece Google, no nosotros, y Google es el responsable de los datos que llevan. Lo que pueden ver es la página en la que estás. Lo que no pueden ver es nada de lo que convieres: eso nunca sale de tu navegador, así que no hay nada que un script publicitario pueda leer.",
          ],
        },
        {
          heading: "Consentimiento, si estás en Europa",
          body: [
            "Si estás en el Espacio Económico Europeo, el Reino Unido o Suiza, las cookies no esenciales solo se usan después de que hayas aceptado. Se te preguntará una vez, mediante un diálogo de consentimiento, y puedes rechazarlo y seguir usando todas las partes del sitio: aquí nada está condicionado al consentimiento.",
            "Puedes cambiar tu respuesta en cualquier momento mediante el mismo diálogo, accesible desde el pie de página una vez activada la publicidad. Retirar el consentimiento detiene el establecimiento de nuevas cookies no esenciales.",
          ],
        },
        {
          heading: "Controlar las cookies por tu cuenta",
          body: [
            "Al margen de lo que haya en este sitio, tu navegador tiene la última palabra:",
          ],
          items: [
            "Todos los navegadores principales pueden bloquear directamente las cookies de terceros en sus ajustes de privacidad.",
            "Puedes eliminar las cookies existentes de un sitio, o de todos, en cualquier momento.",
            "Las ventanas privadas o de incógnito descartan las cookies al cerrarlas.",
            "Los propios ajustes de anuncios de Google permiten desactivar la publicidad personalizada en los sitios que usan su red.",
          ],
        },
        {
          heading: "Cambios",
          body: [
            "Si este sitio empieza a usar una cookie que hoy no usa, esta página se actualizará antes de que eso ocurra y la fecha de arriba cambiará. Y si quieres saber qué se establece ahora mismo en lugar de creernos a nosotros, las herramientas de desarrollo de tu navegador te muestran la lista completa en Aplicación o Almacenamiento.",
          ],
        },
      ],
    },
  },
};

export default es;
