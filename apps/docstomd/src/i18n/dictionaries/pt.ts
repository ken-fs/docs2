import { CONTACT_EMAIL } from "@/content/site";
import type { Dictionary, Faq } from "../types";

/** Português do Brasil — é de onde vem a maior parte do tráfego lusófono. */

/** As duas ou três perguntas que toda página precisa ter; o texto não muda de página para página. */
const PRIVACY: Faq = {
  q: "Meus arquivos são enviados para algum servidor?",
  a: "Não. Tudo roda no seu navegador. Seu arquivo nunca toca um servidor. Desligue o wi-fi e teste: continua funcionando.",
  shared: true,
};

const TABLES: Faq = {
  q: "Minhas tabelas sobrevivem?",
  a: "Sim. Elas saem como tabelas Markdown de barras, e as barras dentro das células são escapadas. A única exceção são as células mescladas: o Markdown não tem sintaxe para isso, então elas são achatadas.",
  shared: true,
};

const BATCH: Faq = {
  q: "Quantos arquivos de uma vez?",
  a: "Sem limite. Solte quarenta e eles entram na fila. No fim você leva todos em um zip. Cada arquivo precisa ter menos de 25 MB.",
  shared: true,
};

const LEGACY: Faq = {
  q: "E os .doc antigos?",
  a: "Funcionam também. O .doc é binário de antes de 2007, então lemos o formato byte a byte no seu navegador. Você recebe texto, títulos, tabelas, negrito e itálico. Duas coisas não voltam: imagens e a numeração exata das listas. Se tiver o Word por perto, um Salvar como .docx dá um resultado mais limpo.",
  shared: true,
};

/** Solte, converta, leve. Os três passos são iguais; só muda o tipo de arquivo. */
const steps = (what: string) => [
  `Solte seu ${what} na caixa acima, ou clique para escolher um. Dezenas de uma vez está tudo bem.`,
  "A conversão começa no instante em que o arquivo cai: sem botão, sem fila em servidor. Leva algumas centenas de milissegundos.",
  "Leia o Markdown, mexa nos ajustes se quiser outro estilo de marcador ou de cerca, e depois copie ou baixe o .md.",
];

const pt: Dictionary = {
  htmlLang: "pt",
  chrome: {
    breadcrumbHome: "início",
    keepsHeading: "O que sobrevive",
    keepsLede:
      "Isto passa direto. Do resto a gente dá conta do que dá, e avisa quando algo não fecha.",
    keepsDocNote:
      "Os .doc antigos ficam sem imagens: aquele formato as esconde onde um navegador não alcança.",
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
    faqHeading: "O que costumam perguntar",
    crossHeading: "A mesma ferramenta, outras portas",
    startOver: "Voltar ao início",
    startOverNote: "A versão simples, sem formato no nome",
    footerLeft: "docstomd.com — uma ferramenta pequena, feita por uma pessoa",
    footerRight: "roda no seu navegador · não guarda nada · não rastreia nada",
    langLabel: "Idioma",
    footerLegal: "As páginas formais",
    legalContactCue: "Ficou alguma coisa aqui pouco clara, ou tem algo que você quer que a gente mude?",
    legalUpdated: "Em vigor desde",
    guide: {
      cta: "Abrir o conversor",
      pairedWith: "Usa",
      moreHeading: "Os outros guias",
    },
    features: [
      "Converter .docx em Markdown",
      "Converter .doc antigo em Markdown",
      "Converter PDF, HTML, CSV e Excel em Markdown",
      "Converter em lote e baixar em zip",
      "Roda inteiro no navegador, sem uploads",
      "Mantém tabelas, títulos, listas e links",
    ],
  },
  converter: {
    dropTitle: "Solte um arquivo aqui.",
    dropActive: "Pode soltar.",
    dropHint:
      "Ou escolha pelo botão. Ou cole com Ctrl+V. Dezenas de uma vez está tudo bem.",
    dropMeta: "25 MB por arquivo / roda no seu navegador, nada é enviado",
    elsewhereLead: "Outros formatos:",
    pick: "Escolher arquivo",
    clear: "Limpar",
    knobs: "Ajustes",
    bullets: "Marcadores",
    fence: "Cerca",
    images: "Imagens",
    imageInline: "base64 embutido",
    imagePlaceholder: "deixar o espaço",
    imageStrip: "remover",
    tables: "Tabelas",
    tableKeep: "manter",
    tableFlatten: "achatar",
    stale:
      "Um ajuste mudou. Os outros resultados são das configurações antigas: converta de novo para aplicar.",
    queue: "Fila",
    zip: { one: "zip de {n} arquivo", other: "zip de {n} arquivos" },
    chewing: "mastigando…",
    failed: "falhou",
    tooBig: "Passa de 25 MB. Grande demais.",
    readFail:
      "Não deu para ler. O arquivo pode estar corrompido ou protegido por senha.",
    wrongType: "Esta página não aceita arquivos {ext}. Esta sim:",
    wrongTypeAmbiguous:
      "Esta página não aceita arquivos {ext}. Um {ext} pode ser qualquer um destes: escolha o que corresponde ao seu:",
    wrongTypeNowhere:
      "Esta página não aceita arquivos {ext}. Este site converte Word, PDF, Excel, CSV e HTML — não {ext}.",
    pastedName: "conteúdo colado",
    typedName: "texto colado",
    pasteHeading: "Ou cole aqui",
    pastePlaceholderHtml:
      "<h1>Cole seu HTML aqui</h1>\n<p>Scripts e atributos de evento são removidos antes de qualquer leitura.</p>",
    pastePlaceholderCsv:
      "nome,cargo,cidade\nAda,engenheira,Londres\nGrace,almirante,Arlington",
    pasteRun: "Converter",
    pasteClear: "Limpar",
    header: "Linha de cabeçalho",
    headerFirstRow: "primeira linha",
    headerNone: "nenhuma",
    align: "Alinhamento",
    alignNone: "padrão",
    alignLeft: "à esquerda",
    alignCenter: "centralizado",
    alignRight: "à direita",
    delimiter: "Delimitador",
    delimiterAuto: "automático",
    delimiterComma: "vírgula",
    delimiterSemicolon: "ponto e vírgula",
    delimiterTab: "tabulação",
    delimiterPipe: "barra",
    pageMarks: "Marcas de página",
    pageMarksOn: "marcar páginas",
    pageMarksOff: "não",
    sheets: "Planilhas",
    sheetsAll: "selecionar todas",
    sheetMeta: { one: "{n} linha", other: "{n} linhas" },
    source: "fonte",
    preview: "prévia",
    copy: "Copiar",
    copied: "copiado",
    download: "Baixar .md",
    legacyWarn: "Formato .doc antigo — lemos o que foi possível",
    styleWarn: {
      one: "{n} coisa que vale saber sobre esta conversão",
      other: "{n} coisas que valem saber sobre esta conversão",
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
      eyebrow: "Documentos → Markdown",
      title: "Docs to MD — Converta Word em Markdown, grátis e privado",
      description:
        "Solte um .docx ou um .doc e receba Markdown limpo. Títulos, tabelas, listas e links sobrevivem. Tudo roda no seu navegador: seus arquivos nunca saem do seu computador.",
      keywords: [
        "word para markdown",
        "docx para markdown",
        "converter word em markdown",
        "doc para md",
        "converter word em markdown online",
      ],
      h1: ["Tire as palavras do Word.", "Receba Markdown limpo."],
      lede: [
        "Solte um arquivo. Resultado em algumas centenas de milissegundos.",
        "Tabelas e títulos ficam no lugar. Nada é enviado.",
      ],
      note: {
        heading: "Sem rodeios",
        items: [
          ".docx e .doc antigo, sem precisar de Salvar como",
          "Sem cadastro, sem limite, sem marca d'água",
          "Funciona com o wi-fi desligado",
        ],
      },
      body: {
        stepsHeading: "Como funciona",
        steps: steps("documento do Word"),
        supportedHeading: "O que ele aceita",
        supported: [
          ".docx do Word 2007 em diante, incluindo Word para Mac e Word Online",
          ".doc antigo do Word 97–2003, lido byte a byte no navegador",
          "Títulos, tabelas, listas, links, negrito, itálico, riscado, citações e blocos de código",
          "Imagens embutidas em base64, reduzidas a um caminho ou removidas: você escolhe",
          "Conversão em lote com um único download em zip",
        ],
        limitsHeading: "O que ele não faz",
        limits: [
          "Controle de alterações e comentários caem fora: você recebe o texto final, não o histórico de edição",
          "Células mescladas são achatadas; o Markdown não tem sintaxe para elas",
          "O texto das notas de rodapé vai para o fim, sem os numerinhos com link",
          "Arquivos protegidos por senha não abrem: tire a senha primeiro",
          "Os outros formatos têm página própria: PDF, HTML, CSV e Excel",
        ],
      },
      faq: [
        PRIVACY,
        LEGACY,
        TABLES,
        {
          q: "E as imagens?",
          a: "Por padrão elas são embutidas em base64, então um único .md carrega tudo. Se isso deixar o arquivo pesado, troque para «deixar o espaço»: você fica com o caminho e traz a imagem por conta.",
        },
        BATCH,
        {
          q: "Todos os estilos do Word são traduzidos?",
          a: "Os que as pessoas usam de verdade, sim: títulos, listas, negrito, itálico, riscado, citações, código, links, sobrescrito e subscrito. Quando um estilo personalizado não encaixa, ele aparece listado acima do seu resultado. Nada fica escondido.",
        },
      ],
    },
    "docx-to-markdown": {
      short: "DOCX → MD",
      eyebrow: "DOCX → Markdown",
      title: "Conversor DOCX para Markdown — grátis, no seu navegador",
      description:
        "Converta .docx em Markdown sem enviar nada. Títulos, tabelas, listas, links e blocos de código passam limpos. Os .doc antigos também valem. Converta em lote e baixe em zip.",
      keywords: [
        "docx para markdown",
        "conversor docx para markdown",
        "docx para md",
        "converter docx em markdown online",
        "docx para markdown grátis",
        "doc para markdown",
      ],
      h1: ["Transforme .docx em Markdown.", "Sem upload, sem cadastro."],
      lede: [
        "Feito para o arquivo que o Word realmente salva. Solte, leia o Markdown, leve embora.",
        "Tudo acontece na sua máquina.",
      ],
      note: {
        heading: "O que você leva",
        items: [
          "Tabelas de barras de verdade, não texto destruído",
          "Níveis de título como # ## ###",
          "Quarenta arquivos de uma vez, um zip só",
        ],
      },
      body: {
        stepsHeading: "Como funciona",
        steps: steps("arquivo .docx"),
        supportedHeading: "O que ele aceita",
        supported: [
          "Todos os .docx que o Word escreveu desde 2007, mais Word Online e Word para Mac",
          ".doc antigo de brinde: o formato é detectado pelo cabeçalho do arquivo, não pela extensão",
          "Níveis de título, tabelas de barras, listas aninhadas, links, formatação em linha e blocos de código",
          "Imagens embutidas, em base64 ou reduzidas a um caminho",
          "Dezenas de arquivos de uma vez, para baixar em um único zip",
        ],
        limitsHeading: "O que ele não faz",
        limits: [
          "Células mescladas são achatadas: tabelas de barras não conseguem expressá-las",
          "Controle de alterações, comentários e histórico de revisões caem fora",
          "Caixas de texto, SmartArt e gráficos não passam; no máximo o texto deles",
          "Documentos criptografados são recusados em vez de lidos pela metade",
          "Arquivos acima de 25 MB, e qualquer um cuja taxa de compressão pareça uma bomba zip",
        ],
      },
      faq: [
        {
          q: "Qual a diferença entre .docx e .doc aqui?",
          a: "Um .docx é um zip cheio de XML, então ele lê limpo e traz as imagens. Um .doc é binário OLE de 1997: também analisamos ele no seu navegador, mas dali não saem imagens nem a numeração das listas. Mesma ferramenta; um dos arquivos é só mais rico.",
        },
        PRIVACY,
        TABLES,
        {
          q: "Ele dá conta de blocos de código?",
          a: "Sim. Parágrafos com o estilo Code ou Source Code viram blocos cercados. Escolha entre ``` e ~~~ no ajuste de cerca.",
        },
        BATCH,
        {
          q: "Existe uma API?",
          a: "Ainda não. Por projeto, é uma ferramenta de navegador: sem servidor não há API para chamar. Se você precisa disso num script, o pandoc faz muito bem esse trabalho offline.",
        },
      ],
    },
    "word-to-markdown": {
      short: "Word → MD",
      eyebrow: "Word → Markdown",
      title: "Conversor Word para Markdown — grátis, nada é enviado",
      description:
        "Converta um documento do Word em Markdown no seu navegador. Aceita .docx e .doc antigo. Mantém títulos, tabelas, negrito, links e listas. Sem conta, sem upload, sem joguinho com o tamanho do arquivo.",
      keywords: [
        "word para markdown",
        "conversor word para markdown",
        "documento word para markdown",
        "converter word em markdown grátis",
        "word para md",
        "conversor doc para markdown",
      ],
      h1: ["Entra um documento do Word.", "Sai Markdown."],
      lede: [
        "Para quem escreve no Word e entrega em Markdown.",
        "Arraste o arquivo. Copie o resultado. Pronto em segundos.",
      ],
      note: {
        heading: "Sem rodeios",
        items: [
          "Aceita .docx e .doc antigo do mesmo jeito",
          "A formatação sobrevive, o lixo cai fora",
          "Nada é enviado, nada é guardado",
        ],
      },
      body: {
        stepsHeading: "Como funciona",
        steps: steps("arquivo do Word"),
        supportedHeading: "O que ele aceita",
        supported: [
          "Os dois formatos do Word: .docx de 2007 em diante e .doc do Word 97–2003",
          "Arquivos do Word para Mac e do Word Online, que são .docx com outro crachá",
          "Títulos como # ## ###, tabelas de barras de verdade, listas numeradas e com marcadores",
          "Negrito, itálico, riscado, sobrescrito, subscrito, links e citações",
          "Uma pasta inteira de uma vez, tudo num zip",
        ],
        limitsHeading: "O que ele não faz",
        limits: [
          "Arquivos do Word 6 e do Word 95 são velhos demais para serem lidos",
          "Imagens não saem de um .doc: aquele formato as esconde onde um navegador não alcança",
          "Cabeçalhos, rodapés e números de página são mobília da página, não conteúdo, então saem",
          "Comentários e alterações controladas caem fora; aceite ou rejeite no Word antes",
          "Colunas, quebra de texto ao redor de imagens e quebras de página não têm equivalente em Markdown",
        ],
      },
      faq: [
        {
          q: "Quais arquivos do Word funcionam?",
          a: "Os dois formatos. .docx do Word 2007 em diante, incluindo Word para Mac e Word Online. O .doc antigo do Word 97–2003 também, menos as imagens. Word 6 e 95 são velhos demais.",
        },
        PRIVACY,
        {
          q: "E o controle de alterações e os comentários?",
          a: "Os dois caem fora. Você recebe o texto final como ele se lê na página, não o histórico de edição. Aceite ou rejeite suas alterações no Word antes.",
        },
        TABLES,
        {
          q: "As notas de rodapé passam?",
          a: "O texto das notas vai para o fim do documento. Os numerinhos de referência não sobrevivem como links: notas de rodapé em Markdown não são suportadas em todo lugar, então a gente não finge que são.",
        },
        BATCH,
      ],
    },
    "pdf-to-markdown": {
      short: "PDF → MD",
      eyebrow: "PDF → Markdown",
      title: "Conversor PDF para Markdown — grátis, sem upload, sem OCR",
      description:
        "Extraia o texto de um PDF como Markdown, no seu próprio navegador. Títulos e parágrafos são reconstruídos a partir do tamanho da fonte e do espaçamento. Só PDF com camada de texto: digitalizações precisam de OCR, e esta ferramenta não faz OCR.",
      keywords: [
        "pdf para markdown",
        "conversor pdf para markdown",
        "pdf para md",
        "converter pdf em markdown online",
        "extrair texto de pdf para markdown",
        "pdf para markdown grátis",
      ],
      h1: ["Tire o texto de um PDF.", "Como Markdown, não como bagunça."],
      lede: [
        "Um PDF não tem títulos: ele tem instruções para pintar glifos em certas coordenadas.",
        "Então a estrutura é reconstruída a partir do tamanho da fonte e do espaçamento. E a gente diz onde isso é chute.",
      ],
      note: {
        heading: "Leia isto primeiro",
        items: [
          "Só PDF com camada de texto: numa digitalização não há texto para extrair",
          "Sem OCR, e não vamos fingir o contrário",
          "Títulos e parágrafos são deduzidos, não lidos",
        ],
      },
      body: {
        stepsHeading: "Como funciona",
        steps: [
          "Solte um PDF na caixa acima. Ele é analisado pelo pdf.js da Mozilla, e tanto a biblioteca quanto as fontes vêm deste site: nada é pedido a nenhuma CDN.",
          "O texto é extraído página por página, na ordem de leitura. O tamanho da fonte decide o que é título; os vãos verticais, onde os parágrafos quebram; a letra pequena colada na borda de cima ou de baixo é tratada como cabeçalho ou rodapé e descartada.",
          "Ligue as marcas de página se quiser um comentário HTML entre as páginas. Depois copie o Markdown ou baixe o .md.",
        ],
        supportedHeading: "O que ele aceita",
        supported: [
          "Qualquer PDF com camada de texto real: exportado do Word, do LaTeX, do Pages ou do Imprimir em PDF de um navegador",
          "Texto em chinês, japonês e coreano, pelas tabelas CMap que este site já traz",
          "Títulos deduzidos do tamanho da fonte, em três níveis relativos",
          "Listas com marcadores e numeradas, detectadas pelos caracteres iniciais",
          "Palavras cortadas por hífen no fim da linha, remontadas em uma só",
          "Marcas opcionais de separação de página, e até 500 páginas por arquivo",
        ],
        limitsHeading: "O que ele não faz",
        limits: [
          "PDFs digitalizados não produzem nada. Se nenhum texto for encontrado, avisamos que o arquivo provavelmente é uma digitalização.",
          "Sem OCR. Ler fotografia de texto exige uma ferramenta completamente diferente.",
          "Layouts de várias colunas, tabelas complexas e fórmulas são, no máximo, uma tentativa",
          "PDFs criptografados ou protegidos por senha são recusados: aqui não há onde digitar senha",
          "Imagens, cores e a posição exata desaparecem; o Markdown não tem como guardá-los",
          "Arquivos acima de 25 MB, ou documentos com mais de 500 páginas",
        ],
      },
      faq: [
        {
          q: "Por que meu PDF digitalizado sai vazio?",
          a: "Porque não há nada para extrair. Uma digitalização é a fotografia de uma página: as letras são pixels, não caracteres. Lê-las exige OCR, que esta ferramenta não faz, e preferimos dizer isso a te entregar um arquivo vazio sem explicação.",
        },
        {
          q: "Como sei se meu PDF tem camada de texto?",
          a: "Abra em qualquer leitor e tente selecionar uma frase com o mouse. Se o texto ficar destacado, existe camada de texto e isto vai funcionar. Se aparecer um retângulo sobre a página inteira, é uma digitalização.",
        },
        PRIVACY,
        {
          q: "Por que os níveis de título estão errados?",
          a: "Porque um PDF não registra isso. Nós adivinhamos pelo tamanho da fonte: um pouco maior que o corpo vira ###; muito maior vira #. O que sobrevive é a estrutura relativa, quais títulos estão no mesmo nível. Talvez você precise ajustar alguns à mão.",
        },
        {
          q: "E as tabelas?",
          a: "Normalmente, nada de bom. Uma tabela num PDF costuma ser texto em coordenadas com linhas desenhadas em volta: não existe grade para ler. As simples podem sair como linhas de texto comum. Se a tabela importa e você tem a planilha original, a página do Excel ou do CSV faz um trabalho muito melhor.",
        },
        {
          q: "Para onde foram os números de página?",
          a: "Eles são descartados de propósito. A letra pequena presa na margem de cima ou de baixo é mobília da página: números, títulos correntes, selos de «Confidencial». Repetida em cada página, ela destruiria a prosa. Ligue as marcas de página se precisar saber onde cada uma terminava.",
        },
      ],
    },
    "excel-to-markdown": {
      short: "Excel → MD",
      eyebrow: "Excel → Markdown",
      title: "Conversor Excel para tabela Markdown — grátis, no navegador",
      description:
        "Converta uma pasta de trabalho .xlsx em tabelas Markdown. Escolha as planilhas que quiser e defina a linha de cabeçalho e o alinhamento das colunas. Roda no seu navegador: o arquivo nunca é enviado.",
      keywords: [
        "excel para markdown",
        "excel para tabela markdown",
        "xlsx para markdown",
        "converter excel em markdown online",
        "planilha para markdown",
        "excel para md",
      ],
      h1: ["Planilha em tabela Markdown.", "Escolha suas abas."],
      lede: [
        "Solte um .xlsx e receba uma tabela de barras em ordem para cada aba que você quiser.",
        "Você recebe os valores como eles aparecem, não as fórmulas por trás.",
      ],
      note: {
        heading: "Vale saber",
        items: [
          "Pastas com várias abas: escolha o que incluir",
          "Valores das células, não o código das fórmulas",
          "10 MB e 100.000 células por conversão",
        ],
      },
      body: {
        stepsHeading: "Como funciona",
        steps: [
          "Solte um .xlsx na caixa acima. Os nomes das abas são lidos da pasta de trabalho e mostrados numa lista.",
          "A primeira aba é convertida na hora. Clique nos nomes para incluir ou tirar: o arquivo é lido uma única vez, então trocar é instantâneo.",
          "Defina se a primeira linha é o cabeçalho e como as colunas se alinham, e depois copie o Markdown ou baixe o .md.",
        ],
        supportedHeading: "O que ele aceita",
        supported: [
          "Pastas .xlsx do Excel 2007 em diante, e do LibreOffice, do Numbers e de exportações do Google Sheets",
          "Várias abas: cada uma vira sua própria tabela sob um título ##",
          "Os valores exibidos: uma célula com fórmula te dá 42, não =SOMA(A1:A9)",
          "Datas escritas como datas ISO normais, não como números de série",
          "Células com barras ou quebras de linha, escapadas para a tabela não quebrar",
          "Linha de cabeçalho ligada ou não, e alinhamento de coluna à esquerda, ao centro ou à direita",
        ],
        limitsHeading: "O que ele não faz",
        limits: [
          "Arquivos acima de 10 MB, ou seleções com mais de 100.000 células",
          "O .xls antigo é um formato diferente e muito mais velho, e não é lido aqui",
          "Pastas protegidas por senha são recusadas: salve uma cópia sem senha",
          "Células mescladas, cores, fontes, formatação condicional, gráficos e tabelas dinâmicas saem; o Markdown não tem sintaxe para nada disso",
          "Uma célula com fórmula, num arquivo gerado por programa e nunca aberto no Excel, pode não ter valor em cache, e sai vazia",
        ],
      },
      faq: [
        {
          q: "Recebo a fórmula ou o resultado?",
          a: "O resultado. O Excel guarda no arquivo tanto a fórmula quanto o último resultado calculado; nós lemos o resultado. =SOMA(A1:A9) vira 42. É quase sempre o que se quer de uma tabela.",
        },
        {
          q: "Por que uma célula com fórmula saiu vazia?",
          a: "Porque o resultado em cache não está no arquivo. O Excel o escreve a cada Salvar, mas uma pasta gerada por script e nunca aberta no Excel pode não ter isso. Abra no Excel, salve e tente de novo.",
        },
        {
          q: "Posso converter várias abas de uma vez?",
          a: "Sim. Assim que o arquivo é lido, todas as abas aparecem e você pode selecionar quantas quiser. Cada uma vira sua própria tabela, com o nome da aba como título acima.",
        },
        PRIVACY,
        {
          q: "E as células mescladas?",
          a: "Elas são achatadas. Uma tabela de barras em Markdown é uma grade simples: toda linha tem o mesmo número de células e colspan não existe. O valor fica em uma célula e as outras saem vazias.",
        },
        {
          q: "Por que o limite de 100.000 células?",
          a: "Acima disso, desenhar a prévia no navegador começa a arrastar, e uma tabela Markdown desse tamanho também não se lê. Se você passar do limite, escolha menos abas.",
        },
      ],
    },
    "csv-to-markdown": {
      short: "CSV → MD",
      eyebrow: "CSV → Markdown",
      title: "Conversor CSV para tabela Markdown — grátis, cole ou envie",
      description:
        "Converta CSV numa tabela Markdown. Cole o texto ou solte um arquivo; vírgulas, pontos e vírgulas e tabulações são detectados automaticamente. Campos entre aspas com vírgulas e quebras de linha são tratados direito.",
      keywords: [
        "csv para markdown",
        "csv para tabela markdown",
        "converter csv em markdown",
        "tsv para markdown",
        "csv para md",
        "csv para markdown online",
      ],
      h1: ["CSV em tabela Markdown.", "Cole ou solte."],
      lede: [
        "Vírgulas entre aspas, quebras de linha dentro de uma célula, exportações europeias com ponto e vírgula: tudo tratado.",
        "O delimitador é detectado para você, ou escolhido por você.",
      ],
      note: {
        heading: "Vale saber",
        items: [
          "Vírgula, ponto e vírgula, tabulação e barra, detectados automaticamente",
          "Campos entre aspas com vírgulas e quebras de linha, lidos corretamente",
          "Seus valores ficam exatamente como você os escreveu",
        ],
      },
      body: {
        stepsHeading: "Como funciona",
        steps: [
          "Cole seu CSV na caixa, ou solte um arquivo .csv ou .tsv acima. Nos dois casos ele é processado no seu navegador.",
          "O delimitador é detectado automaticamente: vírgula, ponto e vírgula, tabulação ou barra. Defina você mesmo se o palpite errar.",
          "Escolha se a primeira linha é o cabeçalho e como as colunas se alinham, e depois copie o Markdown ou baixe o .md.",
        ],
        supportedHeading: "O que ele aceita",
        supported: [
          "Arquivos separados por vírgula, ponto e vírgula, tabulação e barra, detectados ou escolhidos à mão",
          "Aspas conforme o RFC 4180: vírgulas dentro de campos entre aspas, aspas duplicadas, quebras de linha dentro de uma célula",
          "Exportações com ponto e vírgula, de configurações regionais em que a vírgula é o separador decimal",
          "Uma marca de ordem de bytes no começo do arquivo, removida para não colar no primeiro cabeçalho",
          "Linhas desiguais: as curtas são preenchidas até a mais larga e você é avisado de que isso aconteceu",
          "Linha de cabeçalho ligada ou não, e alinhamento de coluna à esquerda, ao centro ou à direita",
        ],
        limitsHeading: "O que ele não faz",
        limits: [
          "Nesta versão, só texto UTF-8: outras codificações podem sair com caracteres estranhos",
          "Até 100.000 células e 25 MB de texto por conversão",
          "Os valores nunca são reinterpretados: 007 continua 007 e 1-2 continua 1-2, nem número nem data",
          "Sem ordenar, filtrar ou calcular colunas: ele converte, não computa",
          "Um arquivo realmente malformado, com aspas não fechadas, pode se dividir em lugares inesperados",
        ],
      },
      faq: [
        {
          q: "Meu arquivo usa ponto e vírgula. Vai funcionar?",
          a: "Sim. Exportações com ponto e vírgula são o normal onde a vírgula é o separador decimal, e o delimitador é detectado automaticamente. Você verá uma nota dizendo qual foi encontrado. Também pode definir à mão.",
        },
        {
          q: "E as vírgulas dentro de uma célula?",
          a: 'São tratadas direito, desde que o campo esteja entre aspas, que é o que todo gerador de CSV correto faz. "Silva, João" continua sendo uma célula. Quebras de linha dentro de um campo entre aspas também valem: elas viram <br> na tabela, porque uma quebra de verdade dividiria a linha em duas.',
        },
        {
          q: "Por que meus zeros à esquerda sobreviveram?",
          a: "Porque não reinterpretamos seus valores. Transformar 007 em 7, ou 1-2 numa data, é o pior vício de uma planilha. O que você escreveu é o que você recebe.",
        },
        PRIVACY,
        {
          q: "Posso converter sem linha de cabeçalho?",
          a: "Sim, desligue o ajuste de cabeçalho. Só saiba que uma tabela Markdown é obrigada a ter uma linha de cabeçalho — é a sintaxe, não tem alternativa —, então você recebe uma vazia e todas as suas linhas vão para o corpo.",
        },
        {
          q: "Ele aceita TSV?",
          a: "Sim. Arquivos separados por tabulação são CSV com outro delimitador, e a tabulação é um dos quatro detectados. Solte um .tsv ou cole o conteúdo direto.",
        },
      ],
    },
    "html-to-markdown": {
      short: "HTML → MD",
      eyebrow: "HTML → Markdown",
      title: "Conversor HTML para Markdown — grátis, seguro, no navegador",
      description:
        "Converta HTML em Markdown limpo. Cole o código ou solte um arquivo .html. Scripts, atributos de evento e tags perigosas são removidos antes de qualquer leitura. Com tabelas no estilo do GitHub.",
      keywords: [
        "html para markdown",
        "conversor html para markdown",
        "converter html em markdown",
        "html para md",
        "html para markdown online",
        "página web para markdown",
      ],
      h1: ["HTML em Markdown.", "Higienizado no caminho."],
      lede: [
        "Cole o código ou solte uma página salva. Sai Markdown no estilo do GitHub.",
        "Scripts e atributos de evento são removidos primeiro: HTML não confiável nunca chega à página.",
      ],
      note: {
        heading: "Vale saber",
        items: [
          "Scripts, atributos onclick e links javascript: removidos",
          "Tabelas saem como tabelas de barras GFM",
          "Cole de qualquer página, ou solte um arquivo .html",
        ],
      },
      body: {
        stepsHeading: "Como funciona",
        steps: [
          "Cole seu HTML na caixa, ou solte um arquivo .html acima. Você também pode copiar de uma página já renderizada e apertar Ctrl+V em qualquer lugar desta página.",
          "O HTML passa primeiro pelo DOMPurify: tags script, atributos de evento, URLs javascript:, iframes e embeds são removidos antes da conversão, e nada sem higienização é inserido nesta página.",
          "O que sobra vira Markdown no estilo do GitHub. Copie ou baixe o .md.",
        ],
        supportedHeading: "O que ele aceita",
        supported: [
          "Código HTML colado, arquivos .html e .htm salvos, e texto formatado copiado direto de uma página web",
          "Títulos, parágrafos, listas, links, imagens, citações e código pré-formatado",
          "Tabelas como tabelas de barras no estilo do GitHub, incluindo riscado e listas de tarefas",
          "Listas aninhadas, e formatação em linha dentro das células de uma tabela",
          "Documentos completos tanto quanto fragmentos: um body não é exigido",
        ],
        limitsHeading: "O que ele não faz",
        limits: [
          "Scripts, atributos de evento, iframes, objects e embeds são removidos, não convertidos",
          "O CSS não é aplicado: um elemento estilizado como título continua um parágrafo no HTML, e assim ele fica",
          "Nada é baixado: URLs relativas de imagens e links continuam relativas, e nenhuma página é buscada por você",
          "Layout feito com divs e CSS grid é achatado em blocos simples",
          "Formulários, botões e componentes interativos não têm equivalente em Markdown",
        ],
      },
      faq: [
        {
          q: "É seguro colar HTML de qualquer lugar?",
          a: "É para isso que ele foi feito. Toda entrada passa pelo DOMPurify antes da conversão: tags script, atributos tipo onclick, URLs javascript:, iframes e embeds desaparecem. Nada sem higienização é colocado no DOM desta página, então o HTML colado não tem como executar.",
        },
        {
          q: "Posso dar uma URL para ele?",
          a: "Não, e isso é de propósito. Buscar uma página por você significaria um servidor fazendo requisições em seu nome: o oposto de como este site funciona. Abra a página você mesmo, copie o que quiser e cole aqui.",
        },
        PRIVACY,
        TABLES,
        {
          q: "Por que meu texto estilizado não virou título?",
          a: "Porque o CSS não faz parte da conversão. Se a página usou uma div com fonte grande em vez de um h2, o HTML diz parágrafo e o Markdown também. Páginas escritas com tags de título de verdade convertem muito melhor.",
        },
        {
          q: "Copiar de uma página renderizada funciona?",
          a: "Sim. Quando você copia de uma página web, seu navegador coloca uma versão HTML na área de transferência junto com o texto puro. Aperte Ctrl+V em qualquer lugar desta página e é esse HTML que é convertido, com formatação e links inclusos.",
        },
      ],
    },
    "google-docs-to-markdown": {
      short: "Google Docs → MD",
      eyebrow: "Google Docs → Markdown",
      title: "Google Docs para Markdown — exporte e converta, grátis",
      description:
        "Converta um documento do Google em Markdown limpo. Copie e cole direto, ou baixe como .docx e solte aqui. Sem complemento para instalar, sem acesso ao seu Drive.",
      keywords: [
        "google docs para markdown",
        "conversor google docs para markdown",
        "docs para markdown",
        "exportar google docs para markdown",
        "documento do google para md",
      ],
      h1: ["Google Docs em Markdown.", "Sem complemento, sem acesso ao Drive."],
      lede: [
        "A gente nunca pede seu Drive. Você copia ou exporta, nós fazemos a conversão.",
        "Assim nada seu passa a ser nosso.",
      ],
      note: {
        heading: "Dois caminhos de entrada",
        items: [
          "Selecione tudo no seu documento, copie e cole aqui com Ctrl+V",
          "Ou: Arquivo → Fazer download → Microsoft Word (.docx), e solte aqui embaixo",
          "Sem OAuth, sem permissões, sem complementos",
        ],
      },
      body: {
        stepsHeading: "Como funciona",
        steps: [
          "O caminho rápido: abra seu documento, selecione tudo, copie. Depois aperte Ctrl+V em qualquer lugar desta página: a área de transferência leva uma versão formatada, e é ela que é convertida.",
          "O caminho completo: Arquivo → Fazer download → Microsoft Word (.docx), e solte esse arquivo na caixa acima. Por aqui as imagens passam, e documentos longos mantêm a estrutura melhor.",
          "Nos dois casos, leia o Markdown e depois copie ou baixe o .md.",
        ],
        supportedHeading: "O que ele aceita",
        supported: [
          "Colar direto de um documento, usando o texto formatado que seu navegador coloca na área de transferência",
          "Exportações .docx baixadas, que é o caminho mais completo",
          "Títulos, listas, tabelas, links, negrito, itálico e riscado",
          "Imagens, quando você vai pelo caminho da exportação .docx",
          "Vários documentos exportados de uma vez, tudo num zip",
        ],
        limitsHeading: "O que ele não faz",
        limits: [
          "Sem conexão com sua conta do Google: nada daqui consegue ver seu Drive",
          "Comentários e edições sugeridas caem fora; resolva antes de exportar",
          "Ao colar, as imagens não vêm, porque a área de transferência só as referencia nos servidores do Google",
          "Gráficos, desenhos e chips inteligentes passam como texto puro, no melhor dos casos",
          "Cabeçalhos, rodapés e números de página são mobília da página e saem",
        ],
      },
      faq: [
        {
          q: "Preciso baixar o arquivo primeiro?",
          a: "Não: copiar e colar normalmente basta. Selecione tudo no seu documento, copie e aperte Ctrl+V aqui. Baixe como .docx quando quiser as imagens também, ou quando o documento for longo o bastante para a estrutura importar.",
        },
        {
          q: "Por que vocês não se conectam direto ao meu Drive?",
          a: "Porque isso significaria pedir acesso a todos os seus arquivos, e manter um servidor guardando um token para eles. Um copiar e colar te custa dois segundos e não nos entrega nada. Vale a troca.",
        },
        {
          q: "O Google Docs já exporta Markdown; por que usar isto?",
          a: "Pergunta justa. Se a exportação nativa te serve, use. Isto é para quando você quer os ajustes: estilo de marcador, estilo de cerca, se as imagens são embutidas ou deixam espaço, e converter uma pasta inteira de uma vez.",
        },
        PRIVACY,
        {
          q: "Comentários e sugestões passam?",
          a: "Não. Você recebe o texto do documento, não a conversa em volta dele. Resolva as sugestões antes de exportar se quiser incluí-las.",
        },
        BATCH,
      ],
    },
    "pptx-to-markdown": {
      short: "PPTX → MD",
      eyebrow: "PPTX → Markdown",
      title: "Converter PPTX para Markdown — grátis, com as notas do apresentador",
      description:
        "Converta uma apresentação do PowerPoint em Markdown no seu navegador. O título, os tópicos e as notas do apresentador de cada slide saem como seções de texto. Aceita .pptx, .ppt e .odp do OpenDocument. Nada é enviado.",
      keywords: [
        "pptx para markdown",
        "powerpoint para markdown",
        "converter pptx para markdown",
        "slides para markdown",
        "ppt para md online",
      ],
      h1: ["Tire o texto de uma apresentação.", "Com as notas."],
      lede: [
        "Solte um .pptx e leve as palavras: os títulos, os tópicos, as tabelas e as notas embaixo de cada slide.",
        "Roda na sua máquina, então uma apresentação interna é boa para testar.",
      ],
      note: {
        heading: "Bom saber",
        items: [
          "Os títulos dos slides viram cabeçalhos, na ordem dos slides",
          "As notas do apresentador também saem, não só os slides",
          "Aceita .pptx, o antigo .ppt e o .odp do OpenDocument",
        ],
      },
      body: {
        stepsHeading: "Como funciona",
        steps: [
          "Solte um .pptx, .ppt ou .odp na caixa acima, ou clique para escolher um. Dezenas de uma vez está tudo bem.",
          "A apresentação é lida pelo anydoc no seu navegador: um conversor em Rust compilado para WebAssembly, servido a partir deste site, então nada é buscado numa CDN e nenhum arquivo é enviado.",
          "Cada slide sai como sua própria seção: o título como cabeçalho, o corpo como texto e listas, e as notas do apresentador depois. Leia e então copie o Markdown ou baixe o .md.",
        ],
        supportedHeading: "O que é aceito",
        supported: [
          ".pptx do PowerPoint 2007 em diante, incluindo PowerPoint para Mac e para a web",
          "O antigo .ppt do PowerPoint 97–2003, lido do seu formato binário",
          "Apresentações .odp do OpenDocument, do LibreOffice Impress e de exportações do Google Slides",
          "Títulos de slide como cabeçalhos, e listas com marcadores ou numeradas conforme o nível",
          "As notas do apresentador, as tabelas de um slide e os links incorporados",
          "Dezenas de arquivos de uma vez, baixáveis em um único zip",
        ],
        limitsHeading: "O que não faz",
        limits: [
          "O layout visual se perde: uma apresentação é uma tela de caixas posicionadas, e o Markdown é uma única coluna de texto",
          "As imagens saem como texto alternativo, não incorporadas; um slide que é quase todo imagem fica pobre",
          "Animações, transições e o vídeo ou áudio incorporado não têm equivalente em texto",
          "SmartArt, gráficos e WordArt saem como o seu texto na melhor das hipóteses, muitas vezes como nada",
          "Apresentações protegidas por senha são recusadas em vez de lidas pela metade: tire a senha primeiro",
          "Arquivos com mais de 25 MB, e qualquer um cuja taxa de compressão pareça uma bomba zip",
        ],
      },
      faq: [
        {
          q: "As notas do apresentador vêm junto?",
          a: "Vêm, e muitas vezes é esse o ponto. As notas de cada slide ficam logo depois do conteúdo dele, então uma apresentação que você narrou ainda carrega o que você ia dizer. Se um slide não tem notas, nada é adicionado.",
        },
        PRIVACY,
        {
          q: "O que acontece com as imagens dos meus slides?",
          a: "Saem como texto alternativo — a descrição que o PowerPoint guardou, num marcador — não como imagens incorporadas. Uma apresentação é um meio visual, então um slide que é sobretudo um diagrama ou uma captura fica pobre. O que sobrevive é o texto, os títulos e as notas.",
        },
        {
          q: "Por que não há layout, só uma lista de seções?",
          a: "Porque um slide é uma tela: caixas de texto, imagens e formas posicionadas por coordenadas. O Markdown é uma coluna de texto, de cima para baixo. Então cada slide é achatado em uma seção, na ordem dos slides: a leitura de cima para baixo, não a disposição na página.",
        },
        {
          q: "O antigo .ppt funciona, ou só o .pptx?",
          a: "Ambos, mais o .odp do OpenDocument. O formato é detectado do próprio arquivo, não da extensão, então um .ppt renomeado para .pptx é lido corretamente do mesmo jeito. No formato antigo os gráficos e as imagens saem mais pobres, mas os títulos, o texto e as notas passam.",
        },
        BATCH,
      ],
    },
  },
  legal: {
    about: {
      short: "Sobre",
      eyebrow: "Sobre este site",
      title: "Sobre o Docs to MD — quem faz e por quê",
      description:
        "O Docs to MD é um conversor de documentos gratuito que roda no navegador, feito por um desenvolvedor independente. Sem contas, sem upload, sem rastreamento. Aqui está como funciona e por que foi feito assim.",
      h1: "Uma ferramenta pequena, e o raciocínio por trás dela",
      lede: [
        "O Docs to MD transforma documentos em Markdown. É esse o produto inteiro.",
        "Feito e mantido por um desenvolvedor independente, e roda inteiramente dentro do seu navegador.",
      ],
      sections: [
        {
          heading: "Por que isso existe",
          body: [
            "A escrita acontece no Word, no Google Docs e em planilhas. A publicação acontece em Markdown: num site estático, num wiki, num README, numa pasta docs de um repositório git. Esse vão é atravessado à mão mais vezes do que deveria, e fazer à mão significa redigitar títulos, remontar tabelas e repor links um por um.",
            "Conversores que fazem isso não faltam. Quase todos funcionam do mesmo jeito: você envia seu arquivo para um servidor, um programa lá converte e você baixa o resultado. É um design razoável, e também um design em que seu documento fica um tempo no computador de outra pessoa. Para um rascunho de blog, tudo bem. Para um contrato, um prontuário médico, um conjunto de números internos ou um manuscrito não publicado, não.",
            "Então este site é construído do jeito oposto. A conversão roda no seu navegador, com JavaScript, na sua própria máquina. Não existe etapa de upload porque não existe lugar para onde enviar.",
          ],
        },
        {
          heading: "Como funciona de verdade",
          body: [
            "Quando você solta um arquivo, seu navegador o lê localmente e entrega os bytes a um analisador que também está rodando no seu navegador. O analisador transforma o documento numa estrutura, e essa estrutura é escrita como Markdown. Tudo acontece entre o seu arquivo e a sua tela.",
            "Os analisadores são bibliotecas de código aberto, uma por formato:",
          ],
          items: [
            "O Mammoth lê .docx. O .doc antigo é lido pelo nosso próprio leitor, byte a byte, já que é um formato binário anterior a 2007 e não existe biblioteca que rode num navegador.",
            "O pdf.js da Mozilla lê PDFs. Ele, junto com suas fontes e tabelas de caracteres, é servido a partir deste site e não de uma CDN — um analisador de documentos buscando coisas em terceiros desfaria o sentido de tudo isso.",
            "O DOMPurify limpa o HTML antes de qualquer leitura, e o Turndown converte o HTML limpo em Markdown.",
            "O Papa Parse lê CSV e TSV; o read-excel-file lê pastas de trabalho .xlsx.",
          ],
        },
        {
          heading: "O que ele deliberadamente não faz",
          body: [
            "Não há contas, porque não há nada para guardar. Não há API, porque não há servidor para chamar. Não há OCR, então PDFs digitalizados não funcionam — e a ferramenta diz isso em vez de entregar um arquivo vazio. Não há conexão com o Google Drive, porque isso exigiria pedir acesso a todos os seus arquivos e guardar um token para eles.",
            "Cada conversão também tem limites reais, e cada página de ferramenta lista os seus. Células mescladas são achatadas, porque tabelas de barras em Markdown não conseguem expressá-las. Alterações controladas são descartadas. Os níveis de título de um PDF são inferidos do tamanho da fonte, não lidos, porque o PDF não registra isso. Essas coisas são ditas de antemão, não descobertas depois de você converter algo importante.",
          ],
        },
        {
          heading: "Como isso é pago",
          body: [
            "A ferramenta é gratuita e não tem plano pago. O plano é cobrir a hospedagem com publicidade, então no futuro você pode ver anúncios nestas páginas. Anúncios nunca serão colocados onde possam ser confundidos com um botão de download ou de converter, e não serão inseridos depois de uma conversão de um jeito que empurre a página sob o seu cursor.",
            "A publicidade não muda como a conversão funciona. Seus arquivos ficam na sua máquina de qualquer forma — isso não é uma decisão de política que possa ser revertida por receita, é a consequência de não haver servidor nenhum para começo de conversa.",
          ],
        },
        {
          heading: "O site irmão",
          body: [
            "O Docs2HTML faz o mesmo trabalho na direção contrária: Markdown, DOCX, CSV e Excel para HTML. Mesma abordagem, mesmo modelo de privacidade, formato de saída diferente.",
          ],
        },
      ],
    },
    contact: {
      short: "Contato",
      eyebrow: "Fale com a gente",
      title: "Contato — Docs to MD",
      description:
        "Escreva sobre um arquivo que não converte, uma tradução que soa estranha, um bug ou um recurso que você quer. Uma pessoa só lê tudo.",
      h1: "Escreva para nós",
      lede: [
        "Uma pessoa só lê esta caixa de entrada, então as respostas não são instantâneas — mas são respostas de verdade, não um número de ticket.",
        `E-mail: ${CONTACT_EMAIL}`,
      ],
      sections: [
        {
          heading: "Um arquivo não converte",
          body: [
            "Esse é o relato mais útil que você pode enviar, e também o mais difícil, porque não podemos ver o seu arquivo. Então descreva em vez de enviar:",
          ],
          items: [
            "Em qual página você estava e qual é a extensão do arquivo",
            "O que você esperava e o que recebeu — uma mensagem de erro, um resultado vazio, uma tabela destruída",
            "Mais ou menos o tamanho do arquivo e o que o produziu (Word 2021, exportação do Google Docs, um script, um scanner)",
            "Seu navegador e sistema operacional, já que o comportamento da análise pode variar entre eles",
          ],
        },
        {
          heading: "Por favor, não mande seus documentos por e-mail",
          body: [
            "O sentido deste site é que seus arquivos fiquem no seu computador. Nos enviar um por e-mail anula isso do seu lado e nos coloca numa posição em que preferimos não estar do nosso. Se você conseguir reproduzir o problema com um arquivo que não importa — dois títulos e uma tabela digitados num documento novo —, isso é ainda mais útil, porque isola o bug.",
            "Se o problema realmente não pode ser reproduzido sem o arquivo original, escreva primeiro e a gente descobre o que é necessário. Quase sempre a resposta é uma descrição da estrutura, não do conteúdo.",
          ],
        },
        {
          heading: "Traduções",
          body: [
            "Este site está em seis idiomas. O inglês é o original e os outros foram traduzidos com cuidado, mas um falante nativo ainda percebe coisas que uma tradução cuidadosa deixa passar — uma frase tecnicamente correta que soa esquisita, um termo que o mundo do software local diz de outro jeito.",
            "Se você notar uma, diga qual idioma e qual página, e cite a frase. Correções pequenas são bem-vindas e são aplicadas rápido.",
          ],
        },
        {
          heading: "Recursos, e coisas que não vamos construir",
          body: [
            "Pedidos de recursos são lidos e muitas vezes construídos, especialmente os pequenos — um controle para um estilo de saída, suporte a uma variante de formato, um delimitador que não detectamos.",
            "Algumas coisas estão fora do escopo por design, e pedir não vai mudar isso: enviar arquivos para um servidor, um motor de OCR para PDFs digitalizados, uma integração com o Google Drive ou contas de usuário. Cada uma delas exigiria que o site guardasse seus dados. É a única coisa que esta ferramenta foi feita para não fazer.",
          ],
        },
        {
          heading: "Privacidade e assuntos legais",
          body: [
            "Dúvidas sobre quais dados este site coleta, e solicitações relativas aos seus dados sob a LGPD, o GDPR, a CCPA ou leis semelhantes, vão para o mesmo endereço. Leia a política de privacidade primeiro — a versão curta é que não coletamos nada que identifique você, o que torna a maioria dessas solicitações sem objeto, e a política explica exatamente por quê.",
          ],
        },
      ],
    },
    privacy: {
      short: "Privacidade",
      eyebrow: "Política de privacidade",
      title: "Política de privacidade — Docs to MD",
      description:
        "O que o Docs to MD coleta e o que não coleta. Seus documentos são processados no seu navegador e nunca enviados. Sem contas, sem análise dos seus arquivos, sem venda de dados.",
      h1: "Política de privacidade",
      lede: [
        "Os documentos que você converte aqui nunca saem do seu computador. Isso não é uma promessa sobre como tratamos seus dados — é que não existe etapa alguma em que a gente os receba.",
        "Esta página explica isso em detalhe, e é honesta sobre as partes em que existe um terceiro envolvido.",
      ],
      sections: [
        {
          heading: "Seus documentos",
          body: [
            "Arquivos que você solta, escolhe ou cola neste site são lidos pelo seu próprio navegador e convertidos por código rodando na sua própria máquina. Eles não são transmitidos para nós, para um provedor de hospedagem, nem para mais ninguém. Não há conversão no servidor, nem fila, nem armazenamento temporário, nem cache do seu conteúdo.",
            "Nada é escrito no seu dispositivo tampouco. Não salvamos seus arquivos nem o resultado convertido em armazenamento local, IndexedDB ou cookie. Feche a aba e o conteúdo desaparece; as únicas cópias são o arquivo com que você começou e o que você copiou ou baixou de propósito.",
            "Tudo isso pode ser verificado. Desligue sua conexão de rede e converta um arquivo — continua funcionando. Ou abra as ferramentas de desenvolvimento do navegador, observe a aba Rede e confirme que soltar um arquivo não produz upload nenhum.",
          ],
        },
        {
          heading: "O que a gente coleta",
          body: [
            "Não pedimos nem armazenamos seu nome, e-mail ou qualquer dado de conta, porque não existem contas.",
            "O site é hospedado no Cloudflare Pages. Como qualquer hospedagem web, ele processa dados padrão de requisição quando seu navegador pede uma página — endereço IP, user agent, a URL solicitada e a hora. Isso é inerente ao funcionamento da web e serve para entregar o site e bloquear abusos. Usamos de forma agregada para ver quais páginas recebem tráfego. Não está ligado a nada que você converte, porque suas conversões nunca chegam a servidor algum.",
          ],
        },
        {
          heading: "Cookies e publicidade",
          body: [
            "O site em si não define nenhum cookie. Ele não tem login, nem carrinho, nem preferências para lembrar entre visitas, então não há nada para um cookie guardar.",
            "Pretendemos exibir publicidade do Google AdSense para cobrir os custos de hospedagem. Quando isso for ativado, o Google poderá definir cookies ou ler identificadores de dispositivo para exibir e medir anúncios, de acordo com as políticas dele. Essa é a única parte deste site em que um terceiro vê algo sobre a sua visita — e é sobre a página em que você está, não sobre o documento que você converteu, que o Google não tem como ver.",
            "Se você está no Espaço Econômico Europeu, no Reino Unido ou na Suíça, será pedido consentimento antes do uso de qualquer cookie não essencial, e você pode retirá-lo depois. A política de cookies explica as categorias e como mudar de ideia.",
          ],
        },
        {
          heading: "Terceiros",
          body: [
            "A lista é deliberadamente curta:",
          ],
          items: [
            "O Cloudflare Pages hospeda os arquivos estáticos que compõem este site.",
            "O Google AdSense, quando ativado, exibe a publicidade descrita acima.",
            "As fontes do Google Fonts são hospedadas neste domínio, então pedir uma página não conta ao Google que você esteve aqui.",
            "Nenhuma página carrega plataforma de análise, gravador de sessão, mapa de calor, widget de chat ou incorporação de rede social.",
          ],
        },
        {
          heading: "Crianças",
          body: [
            "Este é um utilitário de conversão de documentos, sem recursos sociais e sem contas. Não é direcionado a crianças menores de 13 anos e, como não coletamos informações pessoais de ninguém, também não as coletamos conscientemente de crianças.",
          ],
        },
        {
          heading: "Seus direitos",
          body: [
            "Sob a LGPD, o GDPR, a CCPA e leis semelhantes, você tem direito de acessar, corrigir, excluir e portar seus dados pessoais, e de se opor ao tratamento deles. Respeitamos todos — e na prática os pedidos aqui são incomumente simples de responder, porque não temos nenhum arquivo que você converteu nem um perfil seu para entregar, corrigir ou excluir.",
            "Para os cookies de publicidade descritos acima, o controlador é o Google, e as ferramentas dele dão o controle mais direto sobre a personalização de anúncios. Escreva e a gente indica o lugar certo.",
          ],
        },
        {
          heading: "Mudanças nesta política",
          body: [
            "Se esta política mudar de forma relevante — um novo terceiro, uma nova categoria de dados —, a data no topo desta página muda junto. Como o site não guarda endereços de e-mail, não podemos avisar você diretamente, então essa data é o sinal honesto para observar.",
          ],
        },
      ],
    },
    terms: {
      short: "Termos",
      eyebrow: "Termos de serviço",
      title: "Termos de serviço — Docs to MD",
      description:
        "Os termos de uso do Docs to MD: livre para qualquer finalidade, fornecido como está, você mantém todos os direitos sobre seus documentos e confere a saída antes de confiar nela.",
      h1: "Termos de serviço",
      lede: [
        "Usar este site significa aceitar o que vem abaixo. É curto, porque uma ferramenta de navegador gratuita que não guarda nada não precisa de muito.",
      ],
      sections: [
        {
          heading: "O que você pode fazer com ela",
          body: [
            "Use para o que quiser, inclusive trabalho comercial. Converta quantos arquivos quiser. Sem conta, sem chave de licença, sem exigência de atribuição, e sem limite sobre como a saída é usada.",
            "Há duas ressalvas práticas, e elas existem em benefício da ferramenta, não do nosso: cada arquivo precisa estar abaixo do limite de tamanho mostrado na página, e a conversão roda na sua máquina, então um documento muito grande é limitado pela sua própria memória e processador, não por uma cota definida por nós.",
          ],
        },
        {
          heading: "Seus documentos continuam seus",
          body: [
            "Você mantém todos os direitos que tinha sobre os arquivos que converte e sobre o Markdown que sai. Não reivindicamos licença sobre nenhum dos dois, e não conseguiríamos usá-los nem se quiséssemos — a conversão acontece no seu navegador e seu conteúdo nunca chega até nós.",
            "Você é responsável por ter o direito de converter o que converte. Se um documento não é seu para processar, esta ferramenta não muda isso.",
          ],
        },
        {
          heading: "Fornecido como está",
          body: [
            "O site é gratuito e vem sem garantia. Buscamos conversão precisa e documentamos os limites conhecidos de cada formato na página dele, mas nenhum conversor é perfeito, e não podemos garantir que um documento específico converta corretamente ou completamente.",
            "Confira a saída antes de confiar nela. Isso importa mais onde a estrutura é inferida em vez de lida: níveis de título num PDF são adivinhados pelo tamanho da fonte, células mescladas são achatadas, alterações controladas são descartadas, e layouts complexos não sobrevivem. Para qualquer coisa que tenha consequência — jurídica, financeira, médica, acadêmica —, compare o Markdown com o original.",
            "Na medida permitida por lei, não somos responsáveis por perda de dados, de trabalho, de lucro ou outros danos decorrentes do uso do site ou da confiança na saída dele.",
          ],
        },
        {
          heading: "Uso aceitável",
          body: [
            "Não use o site para processar material que você não tem o direito de processar, e não use de formas que prejudiquem o site ou outras pessoas:",
          ],
          items: [
            "Não tente quebrar, sobrecarregar ou encontrar vulnerabilidades no site com a intenção de prejudicá-lo ou prejudicar seus usuários. Se encontrar um problema de segurança, por favor relate.",
            "Não faça scraping nem automatize o site de um jeito que o degrade para as outras pessoas.",
            "Não republique o site como se fosse seu, nem o apresente como se fosse operado por outra pessoa.",
            "Não interfira, bloqueie nem infle artificialmente a publicidade que financia a hospedagem.",
          ],
        },
        {
          heading: "O software sobre o qual ele é construído",
          body: [
            "Esta ferramenta se apoia em bibliotecas de código aberto — Mammoth, Turndown, DOMPurify, pdf.js, Papa Parse, read-excel-file e outras —, cada uma sob a própria licença, com os avisos preservados no código distribuído. Essas licenças cobrem esses componentes; estes termos cobrem este site.",
          ],
        },
        {
          heading: "Disponibilidade e mudanças",
          body: [
            "Este é um serviço gratuito mantido por uma pessoa. Podemos mudar como ele funciona, adicionar ou remover um formato, ou tirá-lo do ar, sem aviso. Como nada seu fica guardado aqui, uma queda custa a você o acesso a um conversor e nada mais.",
            "Se estes termos mudarem, a data no topo desta página muda junto. Continuar usando o site depois disso significa aceitar a versão revisada.",
          ],
        },
      ],
    },
    cookies: {
      short: "Cookies",
      eyebrow: "Política de cookies",
      title: "Política de cookies — o Docs to MD não usa cookies próprios",
      description:
        "Quais cookies o Docs to MD usa. O site em si não define nenhum. A publicidade, quando ativada, pode definir — e no EEE, no Reino Unido e na Suíça, só com o seu consentimento.",
      h1: "Política de cookies",
      lede: [
        "Este site não define nenhum cookie próprio. Não há login e não há nada para lembrar entre visitas.",
        "A exceção é a publicidade, e esta página diz exatamente o que isso envolve.",
      ],
      sections: [
        {
          heading: "O que é um cookie, rapidamente",
          body: [
            "Um cookie é um pequeno texto que um site pede ao seu navegador para guardar e devolver em visitas seguintes. É assim que um site reconhece que dois carregamentos de página vieram do mesmo navegador — útil para manter você logado, e igualmente útil para rastrear. Tecnologias relacionadas, como armazenamento local e identificadores de dispositivo, fazem quase a mesma coisa por outros meios, e também estão cobertas aqui.",
          ],
        },
        {
          heading: "Cookies que este site define",
          body: [
            "Nenhum. Nem um, no momento em que isto foi escrito.",
            "Não há conta em que permanecer logado, nem carrinho, nem preferência para guardar entre visitas. Até os ajustes do conversor — estilo de marcador, estilo de cerca, linha de cabeçalho, alinhamento — vivem apenas na página enquanto ela está aberta, e voltam ao padrão ao recarregar. Seus arquivos e o resultado convertido também nunca são escritos em armazenamento local, IndexedDB ou cookie.",
          ],
        },
        {
          heading: "Cookies de publicidade",
          body: [
            "A hospedagem é paga com publicidade, e pretendemos usar o Google AdSense. Quando estiver ativo, o Google poderá definir cookies ou ler identificadores de dispositivo para exibir anúncios, limitar quantas vezes você vê o mesmo e medir cliques. Em algumas configurações, esses cookies são usados para personalizar anúncios com base na sua navegação em outros lugares.",
            "Esses cookies são definidos pelo Google, não por nós, e o Google é o controlador dos dados que eles carregam. O que eles conseguem ver é a página em que você está. O que não conseguem ver é qualquer coisa que você converte — isso nunca sai do seu navegador, então não há nada para um script de anúncio ler.",
          ],
        },
        {
          heading: "Consentimento, se você está na Europa",
          body: [
            "Se você está no Espaço Econômico Europeu, no Reino Unido ou na Suíça, cookies não essenciais só são usados depois que você concordar. Você será perguntado uma vez, por meio de uma caixa de consentimento, e pode recusar e continuar usando todas as partes do site — nada aqui depende de consentimento.",
            "Você pode mudar sua resposta a qualquer momento pela mesma caixa, acessível no rodapé quando a publicidade estiver ativa. Retirar o consentimento interrompe a definição de novos cookies não essenciais.",
          ],
        },
        {
          heading: "Controlar cookies por conta própria",
          body: [
            "Independentemente do que exista neste site, seu navegador dá a palavra final:",
          ],
          items: [
            "Todos os navegadores principais podem bloquear cookies de terceiros por completo, nas configurações de privacidade.",
            "Você pode apagar os cookies existentes de um site, ou de todos os sites, a qualquer momento.",
            "Janelas privativas ou anônimas descartam os cookies quando você as fecha.",
            "As próprias configurações de anúncios do Google permitem desligar a publicidade personalizada nos sites que usam a rede dele.",
          ],
        },
        {
          heading: "Mudanças",
          body: [
            "Se este site começar a usar um cookie que hoje não usa, esta página é atualizada antes de isso acontecer, e a data no topo muda. E se você quiser saber o que está definido agora em vez de acreditar na nossa palavra, as ferramentas de desenvolvimento do seu navegador mostram a lista inteira em Aplicativo ou Armazenamento.",
          ],
        },
      ],
    },
  },
  guideIndex: {
    short: "Guias",
    eyebrow: "Guias",
    title: "Guias — as partes chatas de converter documentos para Markdown",
    description:
      "Sete percursos: seis pelas conversões que não dão certo na primeira tentativa — formatação do Word, layout de PDF, colar do Google Docs, HTML desarrumado, tabelas CSV e fórmulas do Excel — e um sobre converter sem enviar o arquivo para lugar nenhum.",
    h1: "Guias",
    lede: [
      "Cada conversor tem uma página que explica o que ele faz. Estes aqui são sobre o que vem depois: o arquivo que saiu errado, e por quê.",
      "Um guia por motor de conversão, mais um sobre manter o arquivo fora da rede, escritos a partir das perguntas que as pessoas mandam de verdade. Cada página leva direto para a ferramenta de que fala.",
    ],
  },
  guides: {
    "word-to-markdown-without-uploading": {
      short: "Sem upload",
      eyebrow: "Guia · Word → Markdown",
      title: "Converter Word para Markdown sem enviar o arquivo para lugar nenhum",
      description:
        "O .docx é descompactado nesta aba do navegador, não enviado a um servidor. Como confirmar isso você mesmo, por que um resultado em texto puro é a parte privada, e o que converter no navegador ainda não protege.",
      keywords: [
        "word para markdown sem enviar",
        "conversor word para markdown offline",
        "docx para markdown privado",
        "é seguro converter word para markdown online",
        "word para markdown sem upload",
      ],
      h1: "Transformar Word em Markdown sem o arquivo sair do seu computador",
      lede: [
        "A maioria dos conversores online pega seu arquivo, manda para um servidor e devolve o resultado. Este não manda nada — o .docx é aberto aqui mesmo, na aba.",
        "Isso importa mais para os documentos que você pensaria duas vezes antes de enviar: um contrato, um rascunho não publicado, qualquer coisa com o nome de um cliente. Então vale conferir a afirmação em vez de acreditar nela de olhos fechados.",
      ],
      tool: "word-to-markdown",
      sections: [
        {
          heading: "Para onde o arquivo vai: lugar nenhum",
          body: [
            "Um .docx é um arquivo zip. Abri-lo significa descompactá-lo e ler o XML lá dentro, e cada etapa disso roda em JavaScript nesta página — o mesmo código que o navegador já baixou quando a página carregou.",
            "Não há upload porque não existe para onde enviar. A ferramenta é um punhado de arquivos estáticos; não há nada por trás dela esperando pelo seu documento. Os bytes ficam na máquina em que você está sentado.",
          ],
        },
        {
          heading: "Confirme: tire o cabo de rede",
          steps: [
            "Carregue esta página uma vez, depois desligue o wi-fi ou tire o cabo de rede.",
            "Solte um .docx. Ele converte exatamente como antes — offline, sem ter para onde ser enviado.",
            "Quer prova em vez de demonstração? Abra as ferramentas de desenvolvimento, observe a aba Rede e converta um arquivo. Nada sai levando ele.",
          ],
          body: [
            "Uma conversão offline é o argumento inteiro em um só gesto: um código que telefona para casa não funciona com o telefone fora da tomada.",
          ],
        },
        {
          heading: "O resultado em texto puro é a parte privada",
          body: [
            "Markdown é texto puro. Cada caractere da saída está na tela à sua frente, e você pode ler tudo antes de colar em qualquer lugar — não sobra nenhuma camada escondida para você ter de confiar.",
            "Um .docx é o oposto. Ele carrega nomes de autores, um histórico de edição, marcas de revisão e caminhos de modelo, metidos onde você nunca vê. Converter para Markdown deixa tudo isso para trás: as palavras passam, os metadados enterrados não, porque texto puro não tem onde guardá-los.",
          ],
        },
        {
          heading: "O que um conversor online comum faz no lugar",
          body: [
            "Ele faz upload. Seu arquivo aterrissa num armazenamento temporário no computador de outra pessoa, é convertido lá e deve ser apagado depois — num prazo que você não vê e não tem como conferir.",
            "Para um meme, tudo bem. Para qualquer coisa sob um acordo de confidencialidade, «apagado em até uma hora» é uma promessa, e uma promessa é uma coisa bem diferente de um arquivo que nunca foi enviado.",
          ],
        },
        {
          heading: "O que converter no navegador não consegue fazer",
          body: [
            "É justo apontar os limites. Manter o arquivo fora da rede não diz nada sobre o que você faz com o resultado: cole o Markdown num gist público e ele fica público, não importa como chegou lá.",
            "Qualquer coisa que já esteja de olho na sua própria máquina continua vendo — uma extensão de navegador com acesso à página, ou um malware, lê o que você lê. Converter localmente tira o upload, não todo risco. O que ele tira é o maior deles: uma cópia do seu documento parada no servidor de um estranho.",
          ],
        },
      ],
      outro:
        "Tire a rede da tomada se quiser ter certeza, depois solte o .docx. Ele é descompactado nesta aba e não vai além disso.",
    },
    "word-to-markdown-keep-formatting": {
      short: "Formatação do Word",
      eyebrow: "Guia · Word → Markdown",
      title: "Converter Word para Markdown: que formatação sobrevive e qual não",
      description:
        "Quais partes de um .docx chegam ao Markdown e quais são descartadas de propósito. Títulos, listas, tabelas e ênfase sobrevivem como estrutura; fontes, cores e layout de página não. Como distinguir antes de converter.",
      keywords: [
        "word para markdown manter formatação",
        "docx para markdown formatação",
        "converter word para markdown sem perder formatação",
        "documento word para markdown",
        "docx para markdown limpo",
      ],
      h1: "O que sobrevive quando o Word vira Markdown",
      lede: [
        "«Manter a formatação» quer dizer duas coisas diferentes, e de qual delas você está falando decide se vai gostar do resultado.",
        "O que sobrevive é o esqueleto: títulos, listas, tabelas, ênfase — as partes que dizem como o documento foi montado. A outra metade, a aparência dele, não tem para onde ir: Markdown é texto puro, e texto puro não tem fontes, cores, margens nem quebras de página. Esse é o teto do formato, não um recurso que falta.",
      ],
      tool: "word-to-markdown",
      sections: [
        {
          heading: "A estrutura sobrevive, a aparência não",
          body: [
            "Abra um .docx e cada parágrafo carrega um nome de estilo ao lado da formatação. O nome do estilo é a parte com significado — Título 2, Parágrafo da Lista, Citação — e a formatação é só como o Word escolheu desenhar hoje.",
            "O conversor lê a primeira e descarta a segunda. Um Título 2 vira ##, não um texto com um tamanho de fonte grudado. Onde esse Markdown for parar, ele assume o estilo de títulos daquele projeto.",
            "O Markdown não tem sintaxe para uma fonte nem para uma margem, o que significa que não existe versão disso que preserve essas coisas. Se você precisa que a página fique idêntica, o que você quer é um PDF, não Markdown.",
          ],
        },
        {
          heading: "Os sinais # nascem dos estilos de título de verdade",
          body: [
            "É a única coisa que vale a pena fazer no Word antes de converter, e é a diferença entre uma saída boa e um muro de parágrafos.",
            "Uma linha que você aumentou e deixou em negrito à mão continua sendo um parágrafo comum para o arquivo, então ela vira um parágrafo. Nenhuma regra devolveria «16pt e negrito» para ## sem estragar no caminho cada frase enfatizada do documento.",
          ],
          steps: [
            "No Word, clique dentro de um dos seus títulos e dê uma olhada na galeria de estilos. Um Normal destacado é o problema inteiro em uma palavra.",
            "Escolha Título 1, 2 ou 3 nessa galeria. A aparência vai mudar — edite a definição do estilo se a nova aparência incomodar, em vez de voltar a ajustar tamanhos à mão.",
            "Faça o mesmo com as listas: use os botões de lista em vez de digitar «1.» e um tab. Números digitados à mão viram texto literal que não se renumera mais.",
            "Converta e depois procure # e - na saída. Um arquivo sem nenhum # nunca teve estrutura.",
          ],
        },
        {
          heading: "O que chega",
          body: [
            "Os seis níveis de título, a partir dos estilos do Word. Os estilos Título e Subtítulo do Word também mapeiam para # e ##, porque é isso que eles significam.",
            "Negrito como **, itálico como _, riscado como ~~. Sobrescrito e subscrito ficam como <sup> e <sub>: o Markdown não tem sintaxe para eles e remover mudaria o que uma fórmula ou uma chamada de nota diz.",
            "Links, listas numeradas e com marcadores em qualquer nível de aninhamento, citações a partir dos estilos Citação e Citação Intensa, e parágrafos com estilo Código ou Pré-formatado como blocos de código cercados.",
          ],
          sample: {
            beforeLabel: "No Word",
            before: "Uma lista com marcadores aninhada,\ne uma lista numerada começando em 3",
            afterLabel: "Markdown",
            after: "- Outer\n  - Inner\n- Second\n\n3. Third\n4. Fourth",
          },
        },
        {
          heading: "O que é descartado, e por quê",
          body: [
            "Fontes, tamanhos, cores, realce, alinhamento, recuos, espaçamento entre linhas, quebras de página, cabeçalhos, rodapés e margens. Tudo isso é apresentação que pertence a uma página, e Markdown não é uma página.",
            "O sublinhado é o que mais surpreende. O Markdown não tem sublinhado, e a coisa mais próxima — um link — seria pior que nada, então o texto sublinhado sai como texto normal.",
            "Controle de alterações e comentários vão embora: você recebe o texto final, não o histórico de edição. Caixas de texto, SmartArt e gráficos também não sobrevivem, só o texto deles se tiverem algum. O Word ainda conta ao conversor quais estilos ele não conseguiu mapear; essas notas aparecem acima da saída, sem repetições e com um teto de oito, seguidas de uma linha dizendo quantas mais havia.",
          ],
        },
        {
          heading: "As tabelas chegam, as células mescladas não",
          body: [
            "Tabelas viram tabelas de barras padrão. Barras dentro do texto de uma célula são escapadas como \\| para que uma célula com uma barra não parta a linha em duas, e as linhas mais curtas que a mais larga são preenchidas para a tabela continuar retangular.",
            "Células mescladas são a exceção, e é uma exceção dura: o Markdown não tem colspan nem rowspan. Uma célula mesclada em duas colunas mantém seu texto e deixa uma célula vazia ao lado. Se as mesclagens significam algo, desfaça-as no Word primeiro: muitas vezes elas só estavam ali para centralizar um título.",
            "As células aceitam formatação em linha sem problema: negrito, itálico, código, links. Conteúdo de bloco dentro de uma célula não sobrevive como bloco: uma lista com marcadores dentro de uma célula sai com os itens colados, porque uma linha de tabela de barras é uma única linha.",
          ],
          sample: {
            beforeLabel: "No Word",
            before: "Célula de cabeçalho mesclada em duas colunas",
            afterLabel: "Markdown",
            after: "| Merged head |  |\n| --- | --- |\n| 1 | 2 |",
          },
        },
        {
          heading: "Imagens, e a única coisa que o .doc não consegue dar",
          steps: [
            "Base64 embutido coloca cada imagem dentro do próprio Markdown. Um arquivo autossuficiente, sem imagens perdidas — mas um data URI é cerca de um terço maior que a imagem, e deixa o arquivo desconfortável de ler em um editor de texto.",
            "Deixar um espaço escreve ![alt](./images/nome.png) e deixa o arquivo para você. Use quando o Markdown vai para um repositório que já tem uma pasta de imagens. O nome é construído a partir do texto alternativo, em minúsculas e com hifens.",
            "Remover apaga as imagens de vez. Certo para uma exportação só de texto, errado se depois você vai se perguntar o que havia ali.",
          ],
          body: [
            "Os .doc antigos são a exceção. Aquele formato é binário, anterior a 2007, e aqui ele é lido byte a byte no seu navegador: as imagens não podem ser recuperadas dele, nem a numeração exata das listas. O texto, os títulos, as tabelas, o negrito e o itálico chegam, e a saída diz que tomou esse caminho para você não ficar na dúvida. Se você tem o Word à mão, um Salvar como .docx dá um resultado mais limpo.",
            "Outra coisa que vale saber: os hiperlinks do Word costumam levar parâmetros de rastreamento, e documentos salvos do Google Docs embrulham seus links em um redirecionamento do google.com/url. Os dois são desfeitos até o destino real, e a saída avisa: mudar para onde um link aponta merece um aviso.",
          ],
        },
      ],
      outro:
        "Arrume os estilos de título e depois solte o arquivo. Nada é enviado — o .docx é descompactado nesta aba — então um rascunho não publicado serve muito bem para testar.",
    },
    "pdf-to-markdown-layout": {
      short: "Layout de PDF",
      eyebrow: "Guia · PDF → Markdown",
      title: "PDF para Markdown: por que os títulos e os parágrafos saem errados",
      description:
        "Um PDF não tem títulos, nem parágrafos, nem listas: só glifos em coordenadas. Como a estrutura é deduzida a partir do tamanho da fonte e do espaçamento, onde isso falha, e por que uma página digitalizada não produz nada.",
      keywords: [
        "pdf para markdown",
        "converter pdf para markdown",
        "pdf para markdown títulos",
        "extrair texto pdf para markdown",
        "pdf digitalizado para markdown",
      ],
      h1: "PDF para Markdown, e por que a estrutura é uma dedução",
      lede: [
        "Todos os outros conversores daqui leem uma estrutura que realmente está no arquivo. Este não pode, porque um PDF não tem nenhuma.",
        "O que um PDF guarda são caracteres em coordenadas com um tamanho de fonte. «Isto é um título» não está lá dentro. Então a estrutura é deduzida, e saber como ela é deduzida diz exatamente quando ela vai estar errada.",
      ],
      tool: "pdf-to-markdown",
      sections: [
        {
          heading: "Não existe estrutura dentro de um PDF",
          body: [
            "Um PDF é um formato de impressão. O trabalho dele é pôr o glifo certo no ponto certo da página, e ele faz isso guardando pedaços de texto com uma posição e uma fonte. Nada no arquivo diz qual deles é um título, onde um parágrafo termina, ou que seis linhas são uma lista com marcadores.",
            "Então um documento do Word é convertido; um PDF é reconstruído. Tudo o que vem abaixo é uma heurística, e cada heurística tem casos em que falha. Por isso um aviso aparece acima da saída em toda conversão de PDF, mesmo que nada pareça estranho.",
            "Se você tem o .docx original, use ele. Ele converte direito, porque a estrutura realmente está lá.",
          ],
        },
        {
          heading: "Como os títulos são encontrados",
          body: [
            "Primeiro o tamanho do texto de corpo é calculado: os tamanhos de fonte de todas as linhas são contados, ponderados por quantos caracteres cada linha tem, e o mais comum ganha. Ponderar por caractere e não por linha importa: uma linha longa de parágrafo diz mais sobre qual é o tamanho do corpo do que uma linha curta de título.",
            "Depois, uma linha é um título se for claramente maior que isso e for curta. A proporção de tamanho escolhe o nível: 1,6× ou mais vira #, 1,35× vira ##, e 1,15× vira ###. Os níveis de título originais não existem mais, então o que se preserva é só a relação relativa: estes títulos são do mesmo patamar entre si.",
            "O limite de comprimento é 120 caracteres, e está ali por uma falha específica: um documento cujo parágrafo de abertura está em letra grande não é um título, e o tamanho sozinho não percebe a diferença. O comprimento percebe.",
            "Essa também é a heurística que perde mais coisas. Um documento que estiliza seus títulos por peso e não por tamanho — negrito no mesmo tamanho do corpo — não tem nenhum sinal de tamanho, e esses títulos saem como parágrafos.",
          ],
        },
        {
          heading: "Elementos de página, parágrafos e listas",
          body: [
            "Cabeçalhos e rodapés são descartados quando são ao mesmo tempo menores que o texto de corpo e estão dentro de 9% da altura da página a partir da borda de cima ou de baixo. É proporcional em vez de uma medida fixa, então A4 e Carta se comportam igual. Sem isso, um número de página ou um selo de «Confidencial» repetido em cada página interromperia o texto quarenta vezes.",
            "Uma quebra de parágrafo é um vão vertical maior que 1,8× o tamanho da fonte daquela mesma linha. É assim que um PDF expressa uma, porque não há marca de parágrafo para ler.",
            "Listas são detectadas pelos primeiros caracteres: um glifo de marcador (•, ·, ▪, ◦, ‣, ∙) ou um número de até três dígitos seguido de um ponto ou um parêntese de fechamento. Uma lista desenhada de outro jeito não é uma lista para o conversor.",
          ],
        },
        {
          heading: "Palavras partidas entre linhas",
          body: [
            "PDFs cortam palavras com hífen no fim da linha, e uma junção ingênua dá «re- latório». As linhas são recolhidas em uma única palavra quando uma linha termina em hífen e a seguinte começa em minúscula: essa combinação é um hífen de quebra de linha quase sempre.",
            "Quando a linha seguinte começa em maiúscula, o hífen fica. «State-of-the-art» partido depois de «state-» mantém o hífen, e isso está certo, porque esse é parte da palavra.",
            "Linhas em chinês, japonês e coreano são juntadas sem nenhum espaço. Essas escritas não separam palavras com espaços, então enfiar um em cada quebra de linha abriria um vão no meio de uma frase.",
          ],
          sample: {
            beforeLabel: "Duas linhas no PDF",
            before: "The quarterly re-\nport is attached.",
            afterLabel: "Markdown",
            after: "The quarterly report is attached.",
          },
        },
        {
          heading: "Um PDF digitalizado não dá nada",
          body: [
            "Se uma página é uma imagem de texto — uma digitalização, uma foto, um fax — não há caracteres no arquivo para ler, só um mapa de bits. O conversor diz isso e para, em vez de devolver um documento vazio que parece um erro.",
            "Tirar texto disso exige OCR, que não faz parte desta ferramenta. Um PDF em que algumas páginas são digitalizações e outras não vai converter as páginas reais e listar os números das que saíram vazias, até seis.",
            "Dois tetos: 25 MB e 500 páginas. Os dois são sobre o que uma aba do navegador consegue fazer sem travar: um PDF é processado aqui, no seu navegador, sem nenhum servidor no meio.",
          ],
        },
        {
          heading: "O que fazer com páginas em várias colunas",
          body: [
            "Layouts de duas colunas são o caso mais difícil e saem do melhor jeito possível. O texto é lido na ordem em que o arquivo o guarda, que em um PDF de duas colunas bem feito é coluna por coluna, e em um mal feito alterna entre colunas linha a linha. Não há como saber com segurança qual você tem antes de ler.",
            "Tabelas e fórmulas são a mesma história: uma tabela em um PDF são linhas desenhadas e texto em coordenadas, sem nada que a marque como tabela. Espere as células como linhas separadas, não como uma tabela de barras.",
            "Ligue as marcas de página se você for corrigir coisas à mão. Isso insere um comentário HTML antes de cada página, então você consegue achar de qual página veio um trecho destruído e comparar com o original.",
          ],
          sample: {
            beforeLabel: "Com marcas de página",
            before: "…fim da página um.",
            afterLabel: "Markdown",
            after: "…fim da página um.\n\n<!-- page 2 -->\n\n## Method",
          },
        },
      ],
      outro:
        "Solte o PDF e leia os avisos acima da saída: eles dizem quais páginas foram puladas e lembram que a estrutura foi deduzida. Tudo é lido no seu navegador; o arquivo nunca é enviado.",
    },
    "google-docs-to-markdown-paste": {
      short: "Colar do Google Docs",
      eyebrow: "Guia · Google Docs → Markdown",
      title: "Google Docs para Markdown: copiar e colar, ou exportar primeiro",
      description:
        "Dois jeitos de sair de um documento do Google, e o que cada um custa. Colar é mais rápido e perde as imagens; exportar .docx mantém elas. Nenhum dos dois precisa de acesso ao seu Drive.",
      keywords: [
        "google docs para markdown",
        "copiar google docs para markdown",
        "google docs colar markdown",
        "exportar google docs para markdown",
        "documento google para md",
      ],
      h1: "Tirar Markdown de um documento do Google",
      lede: [
        "Há dois caminhos e eles não são equivalentes. Colar leva dois segundos e leva embora as imagens; exportar o .docx leva alguns cliques e mantém elas.",
        "Os dois rodam inteiros no seu navegador, e nenhum pede sua conta do Google. Nada daqui consegue ver o seu Drive.",
      ],
      tool: "google-docs-to-markdown",
      sections: [
        {
          heading: "Copie o conteúdo, não um link para ele",
          body: [
            "Essa é a primeira coisa que pega as pessoas. Copiar a URL do documento, ou usar «Copiar link», dá um endereço: não há nada ali para converter.",
            "O que você quer é o conteúdo na área de transferência. Selecionar texto em um documento e copiar coloca ali uma versão HTML com formatação junto com o texto puro, e esse HTML carrega os títulos, as listas e as tabelas.",
          ],
          steps: [
            "Abra o documento e selecione o que quiser. Ctrl+A se for tudo.",
            "Copie com Ctrl+C.",
            "Aperte Ctrl+V em qualquer parte da página do conversor. Não precisa achar uma caixa nem clicar em nenhum botão: a própria página recolhe a colagem.",
          ],
        },
        {
          heading: "Como o HTML da área de transferência chega",
          body: [
            "O HTML da área de transferência do Google não é arrumado. Quase todo elemento vem com um nome de classe gerado, como c1 ou c17, os itens de lista recebem nomes lst-kix_, e a seleção toda vem embrulhada em uma tag <b> que põe font-weight em normal: uma tag de negrito que desliga o negrito, que é como o editor controla a formatação no nível do documento.",
            "Nada disso chega ao Markdown. Classes, ids e atributos style são removidos pelo sanitizador, porque o Markdown não consegue expressar nenhum deles e o HTML da área de transferência de qualquer página web não é algo em que confiar. O embrulho <b> é desmontado separadamente: deixá-lo produziria um ** solto no começo e no fim do seu documento.",
            "Os links também são desmontados. O Google roteia links de saída por google.com/url?q=… para contar cliques dentro do editor, e parâmetros de rastreamento como utm_source muitas vezes viajam com eles. Os dois são removidos para o link apontar para onde ele diz apontar. A saída avisa quando isso acontece: mudar o destino de um link merece uma menção.",
          ],
          sample: {
            beforeLabel: "Na área de transferência",
            before: "<a href=\"https://www.google.com/url?q=\n  https://example.com/a%3Futm_source%3Ddocs\">figures</a>",
            afterLabel: "Markdown",
            after: "[figures](https://example.com/a)",
          },
        },
        {
          heading: "Por que colar perde as imagens",
          body: [
            "As imagens de um documento moram nos servidores do Google. O HTML da área de transferência as referencia por URL em vez de carregar os bytes, e essas URLs estão amarradas à sua sessão: elas expiram, e não resolvem para mais ninguém.",
            "Então um documento colado chega com o texto intacto e as imagens ausentes. É o limite do formato, não uma configuração.",
            "Se as imagens importam, siga o outro caminho.",
          ],
        },
        {
          heading: "A exportação .docx, para imagens e documentos longos",
          steps: [
            "No documento: Arquivo → Fazer download → Microsoft Word (.docx).",
            "Solte esse arquivo na caixa da página do conversor. Vários de uma vez está bem: eles voltam em um único zip.",
            "Escolha como tratar as imagens antes de copiar o resultado: embutidas no arquivo, deixadas como referências ./images/, ou removidas.",
          ],
          body: [
            "Esse caminho é o mais completo e vale a pena para qualquer coisa longa. O .docx carrega informação de estilo real, então os títulos vêm dos estilos do Word e não da melhor tentativa de uma área de transferência, e documentos longos mantêm melhor a estrutura.",
            "Também significa que a página do Google Docs e a do Word rodam o mesmo conversor sobre o mesmo tipo de arquivo. Tudo o que é verdade de uma é verdade da outra.",
          ],
        },
        {
          heading: "O que não chega por nenhum dos caminhos",
          body: [
            "Comentários e sugestões são descartados: você recebe o documento, não as margens dele. Resolva ou aceite antes de exportar se importarem.",
            "Gráficos, desenhos e chips inteligentes chegam como texto puro no melhor dos casos. São objetos que o editor desenha, e a maioria não tem equivalente textual.",
            "Cabeçalhos, rodapés e números de página vão embora. Eles pertencem a uma página impressa, e Markdown não tem páginas.",
          ],
        },
        {
          heading: "Por que não há integração com o Drive",
          body: [
            "Conectar com o Drive significaria pedir acesso aos seus arquivos e rodar um servidor que guarda um token para eles. É um risco real e permanente para você em troca de economizar um Ctrl+C.",
            "Um copiar e colar entrega exatamente os parágrafos que você selecionou e nada mais. Sem conta, sem tela de OAuth, sem extensão para instalar, e nada do nosso lado que pudesse vazar, porque não existe nosso lado: a conversão acontece no seu navegador.",
            "O Google Docs também exporta Markdown por conta própria agora. Se aquela saída te serve, use. Isto existe para quando você quer escolher o caractere de marcador, o estilo das cercas ou o que acontece com as imagens, e para colar um trecho em vez de exportar um documento inteiro.",
          ],
        },
      ],
      outro:
        "Selecione, copie, cole — ou exporte o .docx se precisar das imagens. A área de transferência é lida no seu navegador e nada é mandado para lugar nenhum.",
    },
    "html-to-markdown-clean": {
      short: "HTML desarrumado",
      eyebrow: "Guia · HTML → Markdown",
      title: "HTML para Markdown: o que é mantido, removido e achatado",
      description:
        "Quais tags HTML mapeiam para Markdown, quais são apagadas por segurança, e o que acontece com tabelas, blocos de código e estilos em linha. E as duas configurações que mudam a forma da saída.",
      keywords: [
        "html para markdown",
        "converter html para markdown",
        "html para md",
        "html para markdown limpo",
        "página web para markdown",
      ],
      h1: "HTML para Markdown",
      lede: [
        "O HTML consegue expressar muito mais que o Markdown. Então essa conversão é sobretudo uma questão do que fazer com tudo que não tem equivalente.",
        "Três respostas, dependendo da tag: mapear, tirar a tag e manter o texto, ou tirar as duas coisas. Qual delas se aplica é decidido por uma lista de permissão, e vale saber o que está nela.",
      ],
      tool: "html-to-markdown",
      sections: [
        {
          heading: "Uma lista de permissão, não de bloqueio",
          body: [
            "Só sobrevivem à primeira passada as tags que significam algo em Markdown: títulos, parágrafos, listas, links, imagens, ênfase, citações, código, tabelas e o punhado de tags em linha em volta delas. Todo o resto é apagado, mantendo o texto.",
            "A razão de ser uma lista de permissão é que uma lista de bloqueio precisa prever cada tag perigosa, e o HTML continua ganhando tags novas. Uma entrada que falta é um buraco. Assim, a resposta padrão para qualquer coisa desconhecida é não.",
            "Scripts, manipuladores de evento e links javascript: vão embora, e em script, style, iframe, object e embed o conteúdo também vai, não só a tag. Manter o texto de um <script> colaria o código dele no seu documento como prosa visível.",
            "Os atributos entram em lista de permissão do mesmo jeito: só href, src, alt, title, colspan, rowspan e start. Então class, id e style nunca chegam à saída. E não é só segurança: o Markdown também não tem onde colocá-los.",
          ],
        },
        {
          heading: "Por que sanitizar importa mesmo que nada seja renderizado",
          body: [
            "Esta página nunca renderiza o seu HTML, então não há nada aqui que possa executar. O sanitizador existe pelo que vem depois.",
            "Um link escrito como [click me](javascript:alert(1)) é copiado fielmente por qualquer conversor de Markdown, e vira um ataque funcional no momento em que alguém publica esse Markdown em um site que o renderiza. O risco não é nosso, ele é entregue a quem usar a saída.",
            "Então as URLs são checadas contra uma lista de protocolos permitidos — http, https, mailto, ftp e caminhos relativos — e qualquer outra coisa é descartada. Quando algo é removido, a saída diz o que era, em vez de limpar a sua entrada nas suas costas.",
          ],
        },
        {
          heading: "Tabelas: manter ou achatar",
          body: [
            "Por padrão uma tabela vira uma tabela de barras do Markdown. Barras dentro das células são escapadas, espaço em branco dentro de uma célula é reduzido a espaços simples, e linhas curtas são preenchidas até a largura da linha mais larga para a tabela continuar retangular.",
            "Achatar é a alternativa, e existe para as tabelas que nunca foram tabelas. Uma página montada com uma tabela para posicionar coisas vira uma tabela de barras cheia de células vazias; achatada, cada linha vira uma linha de texto com as células unidas por um ponto médio, e lê muito melhor.",
            "Duas coisas não sobrevivem por nenhum dos caminhos. Um <caption> é descartado, porque uma tabela de barras não tem onde colocá-lo: copie-o como uma linha acima da tabela se precisar. E conteúdo de bloco dentro de uma célula colapsa: uma lista em uma célula sai com os itens colados, porque uma linha de tabela de barras tem que ser uma única linha.",
          ],
          sample: {
            beforeLabel: "HTML",
            before: "<table><tr><th>Part</th><th>Qty</th></tr>\n<tr><td>Bolt | M6</td><td>12</td></tr></table>",
            afterLabel: "Markdown",
            after: "| Part | Qty |\n| --- | --- |\n| Bolt \\| M6 | 12 |",
          },
        },
        {
          heading: "As tags que mantêm o HTML delas",
          body: [
            "Sobrescrito e subscrito ficam como <sup> e <sub>. O Markdown não tem sintaxe para eles, e x2 em vez de x² muda o que uma fórmula diz: HTML puro é válido em Markdown e essas duas tags qualquer renderizador dá conta.",
            "O sublinhado não recebe esse tratamento. Ele não tem um significado a preservar: na web um sublinhado é um link, então mantê-lo seria francamente enganoso. Texto sublinhado sai como texto normal.",
            "O riscado vira ~~, que é Markdown do GitHub e não a especificação original, mas hoje é universal o bastante para que remover fosse a opção mais estranha.",
          ],
        },
        {
          heading: "Listas, blocos de código e as configurações",
          body: [
            "Itens de lista são escritos como «- item», com um espaço só. Quase toda cadeia de ferramentas Markdown escreve assim, e a alternativa comum — três espaços depois do marcador — gera diffs barulhentos quando um arquivo é editado pelas duas.",
            "Listas aninhadas são recuadas até a largura do marcador, e um parágrafo que continua dentro de um item de lista é recuado para alinhar com o texto de cima em vez de sair da lista. Um <ol> com atributo start mantém a numeração.",
            "O caractere de marcador pode ser -, * ou +, e a cerca de código ``` ou ~~~. Escolha pelo lugar em que o arquivo vai ficar; não há diferença funcional. Os títulos também podem sair no estilo sublinhado, mas só os dois primeiros níveis têm um: do terceiro para baixo eles ficam com as marcas # de qualquer forma, e vale saber disso antes de escolher.",
          ],
          sample: {
            beforeLabel: "HTML",
            before: "<ol><li><p>First para</p>\n<p>Still item one</p></li></ol>",
            afterLabel: "Markdown",
            after: "1. First para\n\n   Still item one",
          },
        },
        {
          heading: "Duas entradas, um caminho",
          body: [
            "Você pode colar código HTML na caixa, ou soltar um arquivo .html. Os dois são tratados igual, porque para o código eles são a mesma coisa: uma string de HTML não confiável.",
            "O teto de 25 MB é por entrada, o que é muito mais que o código de qualquer página. Nada é enviado: a análise, a sanitização e a conversão acontecem todas na aba.",
            "Se o resultado voltar vazio, a saída diz. Normalmente significa que a entrada era só marcação e nenhum texto: o <head> de uma página, ou um trecho que era só estilos.",
          ],
        },
      ],
      outro:
        "Cole o código ou solte o arquivo, escolha se as tabelas continuam tabelas e copie o Markdown. Tudo roda no seu navegador.",
    },
    "csv-to-markdown-tables": {
      short: "Tabelas CSV",
      eyebrow: "Guia · CSV → Markdown",
      title: "CSV para tabela Markdown: delimitadores, campos entre aspas e alinhamento",
      description:
        "Como o delimitador é detectado, o que acontece com vírgulas e quebras de linha dentro de campos entre aspas, como funciona a linha de alinhamento, e o que o limite de 100 000 células significa na prática.",
      keywords: [
        "csv para tabela markdown",
        "converter csv para markdown",
        "csv para markdown",
        "tsv para tabela markdown",
        "csv com ponto e vírgula para markdown",
      ],
      h1: "De CSV para uma tabela Markdown",
      lede: [
        "Nada dentro de um CSV declara as suas próprias regras. Qual caractere separa as colunas, como as aspas se comportam, se a primeira linha é cabeçalho: tudo é convenção, e circulam várias. Uma tabela que sai errada é quase sempre um arquivo lido com o conjunto errado.",
        "Isto cobre como o delimitador é escolhido, o que as aspas fazem, e como deixar os números alinhados à direita.",
      ],
      tool: "csv-to-markdown",
      sections: [
        {
          heading: "Qual caractere separa as colunas",
          body: [
            "Em arquivos reais aparecem quatro caracteres: vírgula, ponto e vírgula, tabulação, barra. Pontos e vírgulas mais do que se espera — onde 1,50 significa um e meio a vírgula já está tomada, então as planilhas recorrem ao ponto e vírgula.",
            "A detecção é automática, e quando a resposta não é uma vírgula a saída diz qual caractere ela usou. Vale ler essa linha: um arquivo com algo incomum nas primeiras linhas, como uma linha de título acima do cabeçalho, pode ser lido errado, e é assim que você descobriria.",
            "Se ela errou, fixe o delimitador à mão. Vírgula, ponto e vírgula, tabulação e barra podem ser escolhidos.",
          ],
          steps: [
            "Solte o arquivo, ou cole as linhas direto na caixa.",
            "Olhe a nota acima da saída para ver se ela detectou um delimitador que não é vírgula.",
            "Se a tabela saiu com uma coluna quando deveria ter seis, escolha você o delimitador.",
          ],
        },
        {
          heading: "Quando uma célula contém o próprio separador",
          body: [
            "Um campo envolvido em aspas duplas pode conter o delimitador, e aspas duplas dentro significam um caractere de aspas literal. Isso é RFC 4180 e é tratado direito: é a razão inteira de o arquivo não ser simplesmente partido nas vírgulas.",
            "Quebras de linha também se escondem entre aspas, e isso bate de frente com o formato de saída: uma linha de tabela de barras tem que ocupar exatamente uma linha. Então uma quebra dentro de uma célula é reescrita como <br>, o que mantém as duas linhas de um endereço sem partir a linha em duas.",
            "Barras verticais no texto de uma célula são escapadas como \\|. Sem isso, uma barra em um campo de observações transforma uma linha de cinco colunas em uma de seis.",
          ],
          sample: {
            beforeLabel: "CSV",
            before: "name,note\nBolt,\"M6 | 40mm\nsteel\"",
            afterLabel: "Markdown",
            after: "| name | note |\n| --- | --- |\n| Bolt | M6 \\| 40mm<br>steel |",
          },
        },
        {
          heading: "A linha de alinhamento",
          body: [
            "A linha de traços embaixo do cabeçalho pode levar dois-pontos, e eles fixam como uma coluna se alinha quando a tabela é renderizada. Esquerda, centro, direita — direita é a que você quer para números.",
            "Uma coisa a saber: a configuração vale para a tabela toda, não por coluna. Não há controle por coluna aqui, porque um CSV não carrega informação sobre quais colunas têm números, e adivinhar pelos valores erraria com CEPs, telefones e strings de versão.",
            "Então para uma tabela quase toda de números, escolha direita e corrija à mão a única coluna de texto. Para qualquer coisa mista, deixe no padrão: uma linha lisa de traços, que todos os renderizadores tratam como esquerda.",
          ],
          sample: {
            beforeLabel: "Alinhamento: direita",
            before: "Item,Cost\nBolt,0.40",
            afterLabel: "Markdown",
            after: "| Item | Cost |\n| ---: | ---: |\n| Bolt | 0.40 |",
          },
        },
        {
          heading: "Linhas de cabeçalho, e arquivos que não têm nenhuma",
          body: [
            "A primeira linha vira o cabeçalho por padrão. Desligue isso e todas as linhas serão linhas de corpo — mas a linha de cabeçalho em si não desaparece, ela sai vazia.",
            "Isso parece estranho e não é um bug: uma tabela de barras do Markdown é obrigada a ter uma linha de cabeçalho. Uma tabela sem ela não seria analisada como tabela nenhuma, então um cabeçalho vazio é o único jeito de expressar «sem cabeçalho» e ainda produzir algo que renderize.",
            "Preencha depois com nomes de coluna, ou deixe: uma linha de cabeçalho vazia renderiza como uma faixa fina em branco acima dos dados.",
          ],
          sample: {
            beforeLabel: "Linha de cabeçalho: nenhuma",
            before: "Bolt,12\nNut,12",
            afterLabel: "Markdown",
            after: "|  |  |\n| --- | --- |\n| Bolt | 12 |\n| Nut | 12 |",
          },
        },
        {
          heading: "Linhas irregulares e arquivos malformados",
          body: [
            "Linhas com contagens de colunas diferentes são preenchidas até a mais larga, e a saída diz quais contagens ela viu. Essa mensagem costuma ser sinal de que algo quebrou mais acima: uma linha com três células em um arquivo de seis colunas normalmente quer dizer que uma aspa sem escape engoliu um delimitador.",
            "Linhas vazias são descartadas, inclusive as linhas que não são nada além de delimitadores, que é o que um bloco de «,,,» no fim geralmente é.",
            "Os valores nunca são convertidos de tipo. 007 continua 007 e 1-2 não vira uma data. O Excel faz isso com você; isto não, porque mudar o valor é mudar os seus dados.",
            "Uma marca de ordem de bytes no começo do arquivo é removida, para o cabeçalho da primeira coluna não sair com um caractere invisível grudado.",
          ],
        },
        {
          heading: "O que «grande» significa aqui",
          body: [
            "Dois tetos. 25 MB de texto, e 100 000 células — isso é linhas × colunas, então um arquivo de seis colunas chega a umas 16 000 linhas e um de cem colunas para perto de mil.",
            "O limite de células é o que você vai alcançar, e é questão de renderização mais que de análise. A pré-visualização constrói nós DOM para cada célula, e algumas centenas de milhares travam a aba. Recusar é melhor que congelar.",
            "Para algo realmente maior, parta por linhas e converta cada pedaço, repetindo a linha de cabeçalho em cada um.",
          ],
        },
      ],
      outro:
        "Solte o CSV ou cole as linhas, troque o alinhamento se os números vão à direita, e copie a tabela. A análise acontece nesta aba, então uma exportação de clientes fica no seu disco.",
    },
    "excel-to-markdown-formulas": {
      short: "Fórmulas do Excel",
      eyebrow: "Guia · Excel → Markdown",
      title: "Excel para Markdown: o que acontece com as fórmulas e a formatação",
      description:
        "As fórmulas viram os valores calculados, e há um caso em que elas saem vazias. Além disso, o que acontece com formatos de moeda e porcentagem, datas, células mescladas e várias planilhas.",
      keywords: [
        "excel para markdown",
        "xlsx para tabela markdown",
        "converter excel para markdown",
        "fórmulas excel para markdown",
        "planilha para tabela markdown",
      ],
      h1: "Excel para Markdown: fórmulas e formatação",
      lede: [
        "Uma tabela Markdown é um retângulo de texto. Uma planilha é um retângulo de células, e uma célula pode carregar uma fórmula embaixo, uma máscara de exibição em cima e uma mesclagem esticando-a sobre as vizinhas. Três dessas quatro não têm onde pousar.",
        "O que deixa uma pergunta estreita: de tudo o que a planilha sabe, o que chega à tabela, e a parte que você veio buscar está entre isso?",
      ],
      tool: "excel-to-markdown",
      sections: [
        {
          heading: "As fórmulas viram as respostas delas",
          body: [
            "=SUM(B2:B9) chega como 4211. Essa é a direção útil, porque o Markdown não calcula nada: uma fórmula colada ficaria no documento como caracteres inertes que parecem significar algo e não significam.",
            "Funciona porque o Excel guarda em cache o valor calculado ao lado da fórmula cada vez que salva o arquivo. O conversor lê esse valor em cache, e é por isso que ele não precisa de um motor de fórmulas próprio e tudo isso consegue rodar em uma aba do navegador.",
          ],
          sample: {
            beforeLabel: "Célula no Excel",
            before: "B10:  =SUM(B2:B9)",
            afterLabel: "Markdown",
            after: "| Total | 4211 |",
          },
        },
        {
          heading: "As pastas que ninguém nunca abriu",
          body: [
            "Se a pasta de trabalho foi gerada por um script — uma exportação em Python, um processo de relatórios, qualquer coisa que use uma biblioteca de planilhas — e nunca foi aberta no Excel, não há valor em cache. Ninguém escreveu um. Essas células viram vazias.",
            "Uma ida e volta resolve: abra a pasta no Excel ou no LibreOffice, salve, feche. Salvar é o que preenche o cache. E uma planilha que ainda assim é lida como vazia fica apontada acima da saída, então você não vai copiar uma tabela de vãos sem perceber.",
            "Erros de fórmula também saem vazios, em vez de como #DIV/0! ou #REF!. Uma busca quebrada ao longo de uma coluna produz uma coluna de vãos, então se uma coluna está vazia sem motivo aparente, confira a origem.",
          ],
        },
        {
          heading: "Os formatos de número não sobrevivem",
          body: [
            "De tudo o que está nesta página, isto é o que vale ler antes de converter. O Excel guarda a máscara de exibição e o número armazenado em lugares diferentes, e só o número armazenado é dado: a máscara é uma instrução de renderização.",
            "Por isso R$ 1.234,50 chega como 1234.5 e uma célula que mostra 12,50 % chega como 0.125. Nada foi estragado: esses são os números que o arquivo sempre teve, mostrados sem a máscara.",
            "Se a formatação importa, acrescente na planilha uma coluna com a string já formatada, montada com uma fórmula TEXTO(), e use essa coluna. Aí é texto, e o texto chega exatamente como está escrito.",
            "As datas são a exceção. Elas também são guardadas como números, mas o formato de número as identifica, então elas saem como 1995-01-01, com a hora acrescentada quando existe. Elas são lidas em UTC de propósito: a versão ingênua desloca cada data um dia para trás para qualquer pessoa a oeste de Greenwich.",
          ],
        },
        {
          heading: "As células mescladas se separam",
          body: [
            "Um título mesclado em A1:C1 vira uma célula com o texto e duas células vazias ao lado. O Excel guarda o valor na célula superior esquerda de uma mesclagem e deixa o resto realmente vazio, então é isso que há para ler.",
            "O Markdown não tem colspan, então não há como montar de volta. Desfaça as mesclagens no Excel primeiro se o layout importar: muitas vezes elas só estavam ali para centralizar um título.",
            "Cores, fontes, bordas, formatação condicional e comentários de célula vão pelo mesmo caminho e pela mesma razão: o Markdown não tem sintaxe para nada disso.",
          ],
        },
        {
          heading: "Planilhas, uma por vez ou várias",
          steps: [
            "Solte a pasta de trabalho. Os nomes das planilhas voltam em uma lista com a contagem de linhas, e a primeira planilha é convertida.",
            "Marque as planilhas que quiser. Mudar a seleção gera a saída de novo a partir da cópia que já está na memória: o arquivo não é lido outra vez.",
            "Várias planilhas selecionadas saem como um único documento, cada tabela sob um título ## com o nome da planilha.",
          ],
          body: [
            "O título só aparece quando há mais de uma planilha selecionada. Com uma só você já sabe qual é, e um título seria ruído.",
            "Linhas vazias no fim são cortadas primeiro, e isso importa mais do que parece: clicar por uma área vazia no Excel pode deixar uma planilha dizendo que tem várias centenas de linhas que não contêm nada. Uma planilha que fica vazia depois do corte avisa, em vez de produzir uma tabela de vãos.",
          ],
        },
        {
          heading: "Os tetos de tamanho, e os arquivos que são recusados",
          body: [
            "10 MB por pasta de trabalho, mais baixo que os 25 MB dos outros formatos. Um .xlsx é um zip, e descompactá-lo em uma aba custa muito mais memória do que o tamanho do arquivo sugere.",
            "100 000 células no total do que está selecionado, e é por isso que escolher menos planilhas pode fazer passar uma pasta grande que inteira não cabe.",
            "Pastas protegidas por senha são recusadas em vez de lidas pela metade. O mesmo vale para os .xls binários antigos: os dois são contêineres OLE em vez de zips, e nenhum pode ser lido aqui. Abra no Excel e salve como .xlsx sem senha.",
            "Se você soltar um .docx ou um PDF nesta página por engano, ela não vai tentar: o cabeçalho do arquivo é checado primeiro, e a mensagem nomeia a página que aceita aquilo.",
          ],
        },
      ],
      outro:
        "Solte a pasta de trabalho, marque as planilhas que quiser, copie a tabela. O .xlsx é descompactado nesta aba e não vai a nenhum outro lugar, o que importa quando o arquivo é um modelo financeiro.",
    },
  },
  preview: {
    short: "Prévia de Markdown",
    eyebrow: "Pré-visualizar Markdown",
    title: "Prévia de Markdown — Renderize Markdown no seu navegador",
    description:
      "Cole ou digite Markdown e veja renderizado na hora. Um visualizador de Markdown gratuito e privado que roda inteiramente no seu navegador — nada é enviado.",
    keywords: [
      "prévia de markdown",
      "visualizador de markdown",
      "pré-visualizar markdown online",
      "renderizar markdown",
      "editor de markdown",
    ],
    h1: ["Cole Markdown,", "veja renderizado"],
    lede: [
      "Digite ou cole Markdown à esquerda e veja renderizar à direita, ao vivo enquanto edita.",
      "Roda no seu navegador — o texto nunca sai da sua máquina e nada é enviado.",
    ],
    editorLabel: "Markdown",
    previewLabel: "Prévia",
    placeholder: "Cole ou digite Markdown aqui…",
    sample: "Carregar exemplo",
    sampleMarkdown: `# Prévia de Markdown

Digite à esquerda e veja **renderizado** à direita — ao vivo, no seu navegador.

## O que ele renderiza

- Títulos, **negrito**, _itálico_ e \`código embutido\`
- Listas ordenadas e não ordenadas
- [Links](https://docstomd.com) e imagens

> Citações também são renderizadas, com uma linha na lateral.

| Formato | Vira |
| --- | --- |
| .docx | Markdown |
| .pdf | Markdown |

\`\`\`
Blocos de código mantêm o espaçamento.
\`\`\`
`,
    clear: "Limpar",
    emptyState: "Seu Markdown renderizado aparece aqui enquanto você digita.",
    charCount: { one: "{n} caractere", other: "{n} caracteres" },
    note: {
      heading: "Roda no seu navegador",
      items: [
        "Nada é enviado — o texto fica na sua máquina",
        "Renderiza ao vivo enquanto você digita, sem apertar botão",
        "Grátis, sem cadastro, funciona offline depois de carregado",
      ],
    },
    body: {
      stepsHeading: "Como usar",
      steps: [
        "Cole ou digite seu Markdown na caixa à esquerda.",
        "Veja o resultado formatado surgir à direita enquanto edita.",
        "Ajuste a origem até a prévia ficar certa — ela atualiza na hora.",
      ],
      supportedHeading: "O que ele renderiza",
      supported: [
        "Títulos, parágrafos, negrito, itálico e tachado",
        "Listas ordenadas e não ordenadas",
        "Tabelas com linha de cabeçalho",
        "Citações e blocos de código",
        "Links e marcadores de imagem",
      ],
      limitsHeading: "O que ele não faz",
      limits: [
        "É um visualizador, não um exportador — não há download de HTML.",
        "HTML bruto dentro do Markdown é mostrado como texto, não executado, então nada não confiável roda.",
        "Sintaxe muito aninhada ou exótica pode renderizar de forma mais simples que um motor CommonMark completo.",
      ],
    },
    faq: [
      {
        q: "Meu Markdown é enviado para um servidor?",
        a: "Não. A prévia é renderizada no seu navegador com JavaScript. O texto que você cola nunca sai da sua máquina e nada é enviado.",
      },
      {
        q: "Ele exporta HTML?",
        a: "Esta página é um visualizador ao vivo, não um conversor — ela mostra como seu Markdown renderiza. Se você precisa converter documentos em Markdown, use um dos conversores nos links abaixo.",
      },
      {
        q: "Por que parte do HTML no meu Markdown aparece como texto puro?",
        a: "O conteúdo colado é tratado como não confiável, então o HTML bruto é exibido literalmente em vez de executado. Isso mantém a prévia segura contra qualquer coisa escondida na origem.",
      },
      {
        q: "Funciona offline?",
        a: "Depois que a página carrega, ela continua funcionando sem conexão, porque a renderização acontece localmente no seu navegador.",
      },
    ],
  },
};

export default pt;
