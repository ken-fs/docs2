import type { Dictionary, Faq } from "../types";

/** Português do Brasil — é de onde vem a maior parte do tráfego lusófono. */
const SHARED: Faq[] = [
  {
    q: "Meus arquivos são enviados para algum servidor?",
    a: "Não. Tudo roda no seu navegador. Seu arquivo nunca toca um servidor. Desligue o wi-fi e teste: continua funcionando.",
  },
  {
    q: "Minhas tabelas sobrevivem?",
    a: "Sim. Elas saem como tabelas Markdown de barras, e as barras dentro das células são escapadas. A única exceção são as células mescladas: o Markdown não tem sintaxe para isso, então elas são achatadas.",
  },
  {
    q: "Quantos arquivos de uma vez?",
    a: "Sem limite. Solte quarenta e eles entram na fila. No fim você leva todos em um zip. Cada arquivo precisa ter menos de 25 MB.",
  },
];

const LEGACY: Faq = {
  q: "E os .doc antigos?",
  a: "Funcionam também. O .doc é binário de antes de 2007, então lemos o formato byte a byte no seu navegador. Você recebe texto, títulos, tabelas, negrito e itálico. Duas coisas não voltam: imagens e a numeração exata das listas. Se tiver o Word por perto, um Salvar como .docx dá um resultado mais limpo.",
};

const pt: Dictionary = {
  htmlLang: "pt",
  chrome: {
    eyebrow: "Word → Markdown",
    breadcrumbHome: "início",
    keepsHeading: "O que sobrevive",
    keepsLede:
      "Isso passa igual. No resto a gente faz o possível, e avisa quando algo não bate.",
    keepsDocNote:
      "Os .doc antigos ficam sem imagens: aquele formato as esconde onde o navegador não alcança.",
    keeps: {
      headings: "Níveis de título",
      tables: "Tabelas",
      lists: "Listas numeradas e com marcadores",
      links: "Links",
      emphasis: "Negrito / itálico / riscado",
      quotes: "Citações",
      code: "Blocos de código",
      images: "Imagens",
    },
    faqHeading: "O que as pessoas perguntam",
    crossHeading: "Mesma ferramenta, outras portas",
    startOver: "Voltar ao início",
    startOverNote: "A versão simples, sem formato no nome",
    footerLeft: "docstomd.com — uma ferramenta pequena, feita por uma pessoa",
    footerRight: "roda no seu navegador · não guarda nada · não rastreia nada",
    langLabel: "Idioma",
    features: [
      "Converter .docx em Markdown",
      "Converter .doc antigo em Markdown",
      "Converter em lote e baixar em zip",
      "Roda inteiro no navegador, sem envio",
      "Mantém tabelas, títulos, listas e links",
    ],
  },
  converter: {
    dropTitle: "Solte um documento do Word aqui.",
    dropActive: "Pode soltar.",
    dropHint:
      "Ou escolha com o botão. Ou cole com Ctrl+V. Dezenas de uma vez está tudo bem.",
    dropMeta:
      ".docx e .doc / 25 MB por arquivo / roda no seu navegador, nada é enviado",
    pick: "Escolher arquivo",
    clear: "Limpar",
    knobs: "Ajustes",
    bullets: "Marcadores",
    fence: "Cerca",
    images: "Imagens",
    imageInline: "base64 embutido",
    imagePlaceholder: "deixar o espaço",
    imageStrip: "tirar",
    tables: "Tabelas",
    tableKeep: "manter",
    tableFlatten: "achatar",
    stale: "Um ajuste mudou. Solte os arquivos de novo para valer.",
    queue: "Fila",
    zip: { one: "zip de {n} arquivo", other: "zip de {n} arquivos" },
    chewing: "mastigando…",
    failed: "falhou",
    tooBig: "Passa de 25 MB. Grande demais.",
    readFail:
      "Não foi possível ler. O arquivo pode estar danificado ou protegido por senha.",
    pastedName: "conteúdo colado",
    source: "fonte",
    preview: "prévia",
    copy: "Copiar",
    copied: "copiado",
    download: "Baixar .md",
    legacyWarn: "Formato .doc antigo — lemos o que deu",
    styleWarn: {
      one: "{n} estilo do Word não bateu",
      other: "{n} estilos do Word não bateram",
    },
    emptyDoc: "(documento vazio)",
    pickOne: "Escolha um à esquerda para ver o resultado.",
    chewingFirst: "Mastigando o primeiro…",
    units: {
      words: { one: "{n} palavra", other: "{n} palavras" },
      headings: { one: "{n} título", other: "{n} títulos" },
      tables: { one: "{n} tabela", other: "{n} tabelas" },
      images: { one: "{n} imagem", other: "{n} imagens" },
      links: { one: "{n} link", other: "{n} links" },
    },
  },
  pages: {
    home: {
      short: "Início",
      title: "Docs to MD — Converta Word em Markdown, grátis e privado",
      description:
        "Solte um .docx ou um .doc e receba Markdown limpo. Títulos, tabelas, listas e links sobrevivem. Roda inteiramente no seu navegador: seus arquivos nunca saem do seu computador.",
      keywords: [
        "word para markdown",
        "docx para markdown",
        "converter word em markdown",
        "doc para md",
        "converter word para markdown online",
      ],
      h1: ["Tire as palavras de dentro do Word.", "Receba Markdown limpo."],
      lede: [
        "Solte um arquivo. Resultado em algumas centenas de milissegundos.",
        "Tabelas e títulos ficam no lugar. Nada é enviado.",
      ],
      note: {
        heading: "Sem enrolação",
        items: [
          ".docx e .doc antigo, sem precisar de Salvar como",
          "Sem cadastro, sem limite, sem marca de água",
          "Funciona com o wi-fi desligado",
        ],
      },
      faq: [
        SHARED[0],
        LEGACY,
        SHARED[1],
        {
          q: "O que acontece com as imagens?",
          a: "Por padrão elas viram base64 embutido, então um único .md guarda tudo. Se isso deixar o arquivo gordo demais, troque para «deixar o espaço»: você fica com o caminho e traz a imagem.",
        },
        SHARED[2],
        {
          q: "Todo estilo do Word é convertido?",
          a: "Os que as pessoas realmente usam, sim: títulos, listas, negrito, itálico, riscado, citações, código, links, sobrescrito e subscrito. Quando um estilo personalizado não bate, ele aparece listado acima do seu resultado. Nada fica escondido de você.",
        },
      ],
    },
    "docx-to-markdown": {
      short: "DOCX → MD",
      title: "Conversor DOCX para Markdown — grátis, no seu navegador",
      description:
        "Converta .docx em Markdown sem enviar nada. Títulos, tabelas, listas, links e blocos de código passam limpos. Os .doc antigos também funcionam. Converta em lote e baixe em zip.",
      keywords: [
        "docx para markdown",
        "conversor docx para markdown",
        "docx para md",
        "converter docx em markdown online",
        "docx para markdown grátis",
        "doc para markdown",
      ],
      h1: ["Transforme .docx em Markdown.", "Sem envio, sem cadastro."],
      lede: [
        "Feito para o arquivo que o Word realmente salva. Solte, leia o Markdown, leve.",
        "Tudo acontece na sua máquina.",
      ],
      note: {
        heading: "O que você leva",
        items: [
          "Tabelas de barras de verdade, não texto destruído",
          "Níveis de título mantidos como # ## ###",
          "Quarenta arquivos de uma vez, um zip só",
        ],
      },
      faq: [
        {
          q: "Qual a diferença entre .docx e .doc aqui?",
          a: "Um .docx é um zip cheio de XML, então lê limpo e as imagens vêm junto. Um .doc é binário OLE de 1997: também analisamos no seu navegador, mas dele não se recuperam imagens nem numeração de listas. Mesma ferramenta; um é só um arquivo mais rico.",
        },
        SHARED[0],
        SHARED[1],
        {
          q: "Ele lida com blocos de código?",
          a: "Sim. Parágrafos com estilo Code ou Source Code viram blocos cercados. Escolha ``` ou ~~~ no ajuste de cerca.",
        },
        SHARED[2],
        {
          q: "Existe uma API?",
          a: "Ainda não. É uma ferramenta de navegador por escolha: sem servidor, não há API para chamar. Se precisar disso num script, o pandoc faz muito bem offline.",
        },
      ],
    },
    "word-to-markdown": {
      short: "Word → MD",
      title: "Conversor Word para Markdown — grátis, nada é enviado",
      description:
        "Converta um documento do Word em Markdown no seu navegador. Aceita .docx e .doc antigo. Mantém títulos, tabelas, negrito, links e listas. Sem conta, sem envio, sem joguinho de tamanho de arquivo.",
      keywords: [
        "word para markdown",
        "conversor word para markdown",
        "documento word para markdown",
        "converter word em markdown grátis",
        "word para md",
        "conversor doc para markdown",
      ],
      h1: ["Entra documento do Word.", "Sai Markdown."],
      lede: [
        "Para quem escreve no Word e entrega em Markdown.",
        "Arraste o arquivo. Copie o resultado. Pronto em segundos.",
      ],
      note: {
        heading: "Sem enrolação",
        items: [
          "Aceita .docx e .doc antigo do mesmo jeito",
          "A formatação sobrevive, a sujeira cai",
          "Nada enviado, nada guardado",
        ],
      },
      faq: [
        {
          q: "Quais arquivos do Word funcionam?",
          a: "Os dois formatos. .docx do Word 2007 para cima, incluindo Word no Mac e Word Online. O .doc antigo do Word 97–2003 também, sem as imagens. Word 6 e 95 são velhos demais.",
        },
        SHARED[0],
        {
          q: "E o controle de alterações e os comentários?",
          a: "Os dois caem. Você recebe o texto final como se lê na página, não o histórico de edição. Aceite ou rejeite suas alterações no Word antes.",
        },
        SHARED[1],
        {
          q: "As notas de rodapé passam?",
          a: "O texto das notas cai no fim do documento. Os numerozinhos de referência não sobrevivem como links: notas de rodapé no Markdown não têm suporte universal, então não fingimos que têm.",
        },
        SHARED[2],
      ],
    },
    "google-docs-to-markdown": {
      short: "Google Docs → MD",
      title: "Google Docs para Markdown — exporte e converta, grátis",
      description:
        "Transforme um documento do Google em Markdown limpo. Baixe como .docx, solte aqui, copie o Markdown. Nenhum complemento para instalar, nenhum acesso ao seu Drive.",
      keywords: [
        "google docs para markdown",
        "conversor google docs para markdown",
        "docs para markdown",
        "exportar google docs para markdown",
        "documento do google para md",
      ],
      h1: ["Google Docs para Markdown.", "Dois passos, sem complemento."],
      lede: [
        "A gente nunca pede seu Drive. Você exporta o arquivo, nós fazemos a conversão.",
        "Assim nada seu passa a ser nosso.",
      ],
      note: {
        heading: "Os dois passos",
        items: [
          "No seu documento: Arquivo → Fazer download → Microsoft Word (.docx)",
          "Solte esse .docx aqui embaixo",
          "Sem OAuth, sem permissões, sem complemento",
        ],
      },
      faq: [
        {
          q: "Por que preciso baixar primeiro?",
          a: "Porque a alternativa é pedir acesso ao seu Drive inteiro. Exportar leva cinco segundos e não nos entrega nada. Essa troca vale a pena.",
        },
        {
          q: "O Google Docs já exporta Markdown — por que usar isso?",
          a: "Pergunta justa. Se a exportação nativa resolve, use. Isso aqui é para quando você quer os ajustes: estilo de marcador, estilo de cerca, imagens embutidas ou com espaço reservado, e converter uma pasta inteira de uma vez.",
        },
        SHARED[0],
        SHARED[1],
        {
          q: "Comentários e sugestões passam?",
          a: "Não. Você recebe o texto do documento, não a conversa em volta dele. Resolva as sugestões antes de exportar se quiser incluí-las.",
        },
        SHARED[2],
      ],
    },
  },
};

export default pt;
