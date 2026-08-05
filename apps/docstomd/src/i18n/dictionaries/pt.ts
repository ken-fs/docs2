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
};

export default pt;
