import { CONTACT_EMAIL } from "@/content/site";
import type { Dictionary, Faq } from "../types";

/** As perguntas que toda página deveria responder; o texto não muda por página. */
const PRIVACY: Faq = {
  q: "Meu arquivo é enviado para algum servidor?",
  a: "Não. Tudo acontece no seu navegador: a leitura do arquivo, a limpeza, a geração do HTML. Seu arquivo não passa por servidor nenhum. Desligue o wi-fi e teste; continua funcionando.",
  shared: true,
};

const SAFETY: Faq = {
  q: "É seguro publicar esse HTML no meu site?",
  a: "É a parte que levamos mais a sério. Toda entrada passa pelo DOMPurify antes de você vê-la: tags script, atributos do tipo onclick, URLs javascript:, iframe, object e embed são removidos. A pré-visualização roda dentro de um iframe em sandbox, então mesmo que algo escapasse não teria como executar. E nada sem limpeza é inserido nesta página.",
  shared: true,
};

const MODES: Faq = {
  q: "Fragmento ou documento completo?",
  a: "Fragmento, se você vai colar dentro de uma página que já existe: o editor de um CMS, um template, um componente React. Você recebe a marcação sem invólucro <html> e sem <style>, então ela não briga com o CSS do seu site. Documento completo, se quer um arquivo para abrir com dois cliques: vem com charset, viewport, um título e um estilo básico e discreto.",
  shared: true,
};

const PRETTY: Faq = {
  q: "Por que o HTML sai indentado?",
  a: "Porque você vai ler esse código e provavelmente versioná-lo. A indentação vem ligada e só insere quebras entre elementos de bloco; nunca dentro de um <pre> nem entre tags inline, onde espaço em branco muda o que aparece na tela. Desligue se quiser a saída mais compacta possível.",
  shared: true,
};

const pt: Dictionary = {
  htmlLang: "pt",
  chrome: {
    breadcrumbHome: "início",
    cleanHeading: "O que vai para o lixo",
    cleanLede:
      "Word e Google Docs embrulham o conteúdo numa camada de entulho que só significa algo dentro do editor deles. Isso sai.",
    cleanNote:
      "A estrutura fica: títulos continuam títulos, tabelas continuam tabelas, listas continuam listas. O que sai é a decoração.",
    cleans: {
      scripts: "Tags <script>",
      handlers: "onclick e parentes",
      styles: "Estilos mso- inline",
      classes: "Classes c1 / c17 mortas",
      tracking: "Parâmetros de rastreamento",
      office: "Tags exclusivas do Office",
      semantics: "Preservado: a estrutura semântica",
      entities: "Escapado: & < > e as aspas",
    },
    faqHeading: "Perguntas que chegam aqui",
    crossHeading: "Outras conversões deste site",
    startOver: "Começar de novo",
    startOverNote: "Markdown para HTML, o da capa",
    footerLeft: "docs2html.com — uma ferramenta pequena, feita por uma pessoa",
    footerRight: "roda no seu navegador · não guarda nada · não te rastreia",
    langLabel: "Idioma",
    footerLegal: "As páginas formais",
    legalContactCue: "Ficou algo confuso aqui, ou tem algo que você queria mudar?",
    legalUpdated: "Em vigor desde",
    siblingHeading: "Indo no sentido oposto?",
    siblingNote:
      "O DocsToMD é esta mesma ferramenta ao contrário: Word, PDF, Excel e HTML para Markdown. Mesma abordagem, mesmo modelo de privacidade, saída inversa.",
    siblingCta: "docstomd.com",
    features: [
      "Converter Markdown em HTML com tabelas GFM e listas de tarefas",
      "Converter .docx em HTML semântico limpo",
      "Limpar o HTML colado do Google Docs",
      "Converter texto puro em parágrafos HTML",
      "Converter CSV e Excel em tabelas HTML",
      "Funciona inteiramente no navegador, sem upload",
      "Saída como fragmento HTML ou documento completo",
    ],
  },
  converter: {
    dropTitle: "Solte um arquivo aqui.",
    dropActive: "Pode soltar.",
    dropHint:
      "Ou escolha pelo botão. Ou simplesmente cole com Ctrl+V. Dezenas de uma vez não é problema.",
    dropMeta: "25 MB por arquivo / roda no seu navegador, nada é enviado",
    pick: "Escolher arquivo",
    clear: "Limpar",
    knobs: "Saída",
    mode: "Saída",
    modeFragment: "fragmento",
    modeDocument: "página inteira",
    modeHint:
      "Fragmento: só a marcação, para colar numa página que já existe. Página inteira: um arquivo .html independente com charset, viewport e estilos básicos.",
    pretty: "Indentação",
    prettyOn: "legível",
    prettyOff: "compacta",
    responsive: "CSS da tabela",
    responsiveOn: "incluir",
    responsiveOff: "nenhum",
    linkify: "URLs soltas",
    linkifyOn: "virar links",
    linkifyOff: "deixar como texto",
    lineBreaks: "Quebras de linha",
    lineBreaksOn: "manter como <br>",
    lineBreaksOff: "deixar o texto fluir",
    header: "Linha de cabeçalho",
    headerFirstRow: "primeira linha",
    headerNone: "nenhuma",
    delimiter: "Delimitador",
    delimiterAuto: "automático",
    delimiterComma: "vírgula",
    delimiterSemicolon: "ponto e vírgula",
    delimiterTab: "tabulação",
    delimiterPipe: "barra vertical",
    images: "Imagens",
    imageInline: "base64 embutido",
    imageExtract: "arquivos separados",
    imageStrip: "descartar",
    sheets: "Planilhas",
    sheetsAll: "selecionar todas",
    sheetMeta: { one: "{n} linha", other: "{n} linhas" },
    stale:
      "Você mudou um ajuste. Os outros resultados são da configuração anterior — rode de novo para aplicar.",
    queue: "Fila",
    zip: { one: "zip com {n} arquivo", other: "zip com {n} arquivos" },
    chewing: "convertendo…",
    failed: "falhou",
    tooBig: "Acima de 25 MB. Grande demais.",
    readFail:
      "Não foi possível ler. O arquivo pode estar corrompido ou protegido por senha.",
    pastedName: "conteúdo colado",
    typedName: "texto colado",
    pasteHeading: "Ou cole aqui",
    pastePlaceholderMarkdown:
      "# Cole Markdown aqui\n\nTabelas, listas de tarefas e ~~riscado~~ funcionam.\n\n| ferramenta | saída |\n| --- | --- |\n| esta página | HTML |",
    pastePlaceholderHtml:
      '<div class="c1"><b style="font-weight:normal">Cole código HTML aqui.</b></div>\n<p>O entulho do Google Docs, os estilos mso- e os parâmetros de rastreamento são limpos.</p>',
    pastePlaceholderText:
      "Cole texto puro aqui.\n\nUma linha em branco começa um parágrafo novo. URLs soltas como https://example.com viram links, a menos que você desligue isso.",
    pastePlaceholderCsv:
      "nome,cargo,cidade\nAda,engenheira,Londres\nGrace,almirante,Arlington",
    pasteRun: "Converter",
    pasteClear: "Limpar",
    pasteRichHint:
      "Selecione o conteúdo dentro do documento e copie — não copie o link de compartilhamento. Depois cole aqui, ou aperte Ctrl+V em qualquer ponto desta página.",
    source: "código",
    preview: "pré-visualização",
    previewNote:
      "A pré-visualização roda num quadro em sandbox com scripts desligados. Isso é de propósito, não um defeito.",
    copy: "Copiar",
    copied: "copiado",
    download: "Baixar .html",
    downloadZip: "HTML + imagens",
    legacyWarn: "Formato .doc antigo — foi lido o que era possível",
    styleWarn: {
      one: "{n} detalhe que vale saber sobre esta conversão",
      other: "{n} detalhes que valem saber sobre esta conversão",
    },
    emptyDoc: "(não saiu nada)",
    pickOne: "Escolha um item à esquerda para ver o resultado.",
    chewingFirst: "Convertendo o primeiro…",
    units: {
      words: { one: "{n} palavra", other: "{n} palavras" },
      headings: { one: "{n} título", other: "{n} títulos" },
      tables: { one: "{n} tabela", other: "{n} tabelas" },
      images: { one: "{n} imagem", other: "{n} imagens" },
      links: { one: "{n} link", other: "{n} links" },
      bytes: "tamanho",
    },
  },
  pages: {
    home: {
      short: "Início",
      eyebrow: "Markdown → HTML",
      title: "Docs 2 HTML — Converter Markdown em HTML, grátis e privado",
      description:
        "Cole Markdown e receba HTML limpo. Com tabelas GFM, listas de tarefas e riscado. Escolha um fragmento para o seu CMS ou uma página inteira independente. Tudo no seu navegador — nada é enviado.",
      keywords: [
        "docs 2 html",
        "markdown para html",
        "conversor md para html",
        "converter markdown em html online",
        "markdown para html grátis",
      ],
      h1: ["Markdown entra.", "Sai HTML limpo."],
      lede: [
        "Cole e o HTML aparece enquanto você olha. Sem botão, sem espera, sem upload.",
        "Leve um fragmento para o seu CMS ou uma página inteira que abre direto da área de trabalho.",
      ],
      note: {
        heading: "Direto ao ponto",
        items: [
          "CommonMark mais tabelas GFM, listas de tarefas e riscado",
          "Fragmento ou documento completo, você escolhe",
          "Funciona com o wi-fi desligado",
        ],
      },
      body: {
        stepsHeading: "Como funciona",
        steps: [
          "Cole seu Markdown na caixa ou solte um arquivo .md acima. Os dois caminhos são lidos pelo seu próprio navegador.",
          "O texto é analisado pelo markdown-it e depois passa pelo DOMPurify, porque Markdown aceita HTML bruto e Markdown que veio de outra pessoa não é confiável por padrão.",
          "Alterne entre o código e uma pré-visualização em sandbox, e depois copie o HTML ou baixe o arquivo .html.",
        ],
        supportedHeading: "O que funciona",
        supported: [
          "CommonMark completo: títulos, parágrafos, listas, links, imagens, citações e blocos de código",
          "Os extras do GitHub: tabelas com barras, caixas de listas de tarefas e ~~riscado~~",
          "HTML bruto dentro do seu Markdown, higienizado em vez de removido",
          "URLs soltas convertidas em links, com opção de desligar",
          "Saída em fragmento sem invólucro, ou página inteira com charset, viewport e título",
        ],
        limitsHeading: "O que não faz",
        limits: [
          "Não colore a sintaxe dos blocos de código — você recebe um <pre><code> limpo e estiliza do seu lado",
          "Notas de rodapé, listas de definição e outras extensões fora do padrão não são interpretadas",
          "O front matter no topo do arquivo é tratado como texto, não como metadado",
          "Scripts dentro do HTML bruto do seu Markdown são removidos, não preservados",
          "Os outros formatos têm páginas próprias: DOCX, Google Docs, texto puro, CSV e Excel",
        ],
      },
      faq: [
        PRIVACY,
        MODES,
        {
          q: "Qual variante de Markdown é essa?",
          a: "CommonMark como base, mais as três extensões do GitHub que as pessoas realmente usam: tabelas com barras, listas de tarefas e riscado. Se aparece certo no GitHub, é bem provável que apareça igual aqui.",
        },
        {
          q: "Posso colocar HTML bruto no meu Markdown?",
          a: "Sim, e ele sai do outro lado — depois de higienizado. Um <div> ou um <span class=\"nota\"> sobrevive; um <script> não. É o equilíbrio certo: Markdown que chegou de um colega ou saiu de um CMS é entrada não confiável como qualquer outra.",
        },
        PRETTY,
        {
          q: "Os blocos de código ganham cores?",
          a: "Não. Você recebe <pre><code class=\"language-js\">, que é o gancho padrão que qualquer destacador de sintaxe lê. Fazer isso aqui significaria embutir uma paleta de cores que brigaria com a que seu site já usa.",
        },
      ],
    },
    "markdown-to-html": {
      short: "MD → HTML",
      eyebrow: "Markdown → HTML",
      title: "Conversor de Markdown para HTML — grátis, tabelas GFM, no navegador",
      description:
        "Converta Markdown em HTML com CommonMark completo mais tabelas, listas de tarefas e riscado do GitHub. Pré-visualização em sandbox, saída em fragmento ou página inteira, e nada sai do seu navegador.",
      keywords: [
        "markdown para html",
        "conversor markdown html",
        "md para html",
        "converter markdown em html",
        "commonmark para html",
        "gfm para html",
      ],
      h1: ["Transforme Markdown em HTML.", "Com tabelas e listas de tarefas."],
      lede: [
        "A especificação CommonMark inteira, mais as extensões do GitHub que você sentiria falta se não estivessem.",
        "Veja num quadro em sandbox e depois copie o código ou baixe o arquivo.",
      ],
      note: {
        heading: "O que você recebe",
        items: [
          "Marcação <table> de verdade, com <thead> e atributos scope",
          "Listas de tarefas como caixas desabilitadas, não colchetes literais",
          "Saída indentada e legível que não dá vergonha de versionar",
        ],
      },
      body: {
        stepsHeading: "Como funciona",
        steps: [
          "Cole Markdown na caixa, ou solte um arquivo .md, .markdown ou .txt na área acima.",
          "O markdown-it interpreta com as regras do CommonMark, mais as extensões de tabela, riscado e lista de tarefas. O resultado passa pelo DOMPurify antes de chegar até você.",
          "Escolha fragmento ou página inteira, ligue ou desligue a indentação, e copie o HTML ou baixe como arquivo.",
        ],
        supportedHeading: "O que funciona",
        supported: [
          "Todo o CommonMark: títulos ATX e setext, listas aninhadas, links por referência, código cercado e indentado",
          "Tabelas GFM com barras, geradas como <table><thead><th scope=\"col\">",
          "Listas de tarefas como caixas desabilitadas, com a classe .task-list-item para estilizar",
          "Riscado, e URLs soltas viradas em links automaticamente, com opção de evitar",
          "Blocos de HTML bruto e HTML inline, higienizados na passagem",
          "Quebras de linha simples mantidas como <br>, ou deixadas fluir, como você preferir",
        ],
        limitsHeading: "O que não faz",
        limits: [
          "Não colore a sintaxe — a classe do idioma é emitida, as cores são sua parte",
          "Notas de rodapé, listas de definição, abreviaturas e diretivas de contêiner não são interpretadas",
          "Front matter YAML não é removido nem interpretado; apague antes se não quiser vê-lo na saída",
          "Notação matemática ($...$ ou \\[...\\]) sai como texto literal",
          "Arquivos acima de 25 MB",
        ],
      },
      faq: [
        {
          q: "As tabelas do GitHub funcionam?",
          a: "Sim, e saem como marcação correta: um <thead> com células <th scope=\"col\">, um <tbody> para o resto e o alinhamento transferido como text-align inline. Um leitor de tela consegue ler o resultado como tabela, o que é impossível numa grade fingida com div.",
        },
        {
          q: "E as listas de tarefas?",
          a: "- [ ] e - [x] viram caixas de seleção desabilitadas de verdade dentro do item de lista, e o item recebe a classe task-list-item para você esconder o marcador. Desabilitadas porque, numa página estática, uma caixa que parece clicável e não registra nada é pior do que caixa nenhuma.",
        },
        MODES,
        PRETTY,
        {
          q: "Consigo converter vários arquivos de uma vez?",
          a: "Sim. Solte uma pasta inteira de arquivos .md e eles entram na fila; baixe um por um ou tudo junto num zip. Útil para levar uma pasta de documentação para um template.",
        },
        PRIVACY,
      ],
    },
    "docx-to-html": {
      short: "DOCX → HTML",
      eyebrow: "DOCX → HTML",
      title: "Conversor de DOCX para HTML — HTML semântico limpo, sem entulho do Word",
      description:
        "Converta .docx em HTML semântico limpo no seu navegador. Estilos mso- e classes redundantes do Word são removidos. As imagens são embutidas em base64 ou baixadas junto com o HTML num zip.",
      keywords: [
        "docx para html",
        "word para html",
        "conversor docx html",
        "converter documento word em html",
        "doc para html",
        "word para html limpo",
      ],
      h1: ["Documento do Word em HTML.", "Sem o entulho do Word."],
      lede: [
        "Salvar como página da web produz milhares de linhas de estilo mso-. Isto produz marcação como a que você escreveria à mão.",
        "Títulos viram <h2>, tabelas viram <table>, e nada específico da Microsoft sobrevive.",
      ],
      note: {
        heading: "O que você recebe",
        items: [
          "Tags semânticas, sem <o:p> nem style=\"mso-...\"",
          "Imagens embutidas, ou como arquivos separados num zip",
          "Os .doc antigos também funcionam, sem precisar salvar de novo",
        ],
      },
      body: {
        stepsHeading: "Como funciona",
        steps: [
          "Solte um .docx na área acima, ou clique para escolher. Dezenas de uma vez não é problema.",
          "O Mammoth lê a estrutura do documento — níveis reais de título, tabelas reais, listas reais — e escreve HTML a partir dela. Esse HTML passa depois pelo DOMPurify, porque a própria documentação do Mammoth diz explicitamente que a saída dele não é higienizada.",
          "Decida o que fazer com as imagens e copie o HTML, baixe o arquivo ou leve um zip com as imagens ao lado.",
        ],
        supportedHeading: "O que funciona",
        supported: [
          "Todo .docx que o Word escreveu desde 2007, além do Word Online e do Word para Mac",
          "Os .doc antigos do Word 97–2003, identificados pelo cabeçalho do arquivo e não pela extensão",
          "Níveis de título como <h1>–<h6>, tirados dos estilos do Word e não adivinhados pelo tamanho da fonte",
          "Tabelas como <table>, listas como <ul>/<ol> com aninhamento real, links, negrito, itálico e riscado",
          "Citações, parágrafos com estilo de código como <pre><code> e legendas como <p class=\"caption\">",
          "Imagens embutidas: em base64, extraídas para uma pasta images/ no zip, ou descartadas",
        ],
        limitsHeading: "O que não faz",
        limits: [
          "A formatação visual do Word (fontes, cores, espaçamento exato) não é transportada, e isso é deliberado",
          "Células mescladas perdem colspan e rowspan; cada célula passa a ser um <td> próprio",
          "Controle de alterações e comentários são descartados — você recebe o texto final, não o histórico de edição",
          "Caixas de texto, SmartArt e gráficos não sobrevivem; só o texto deles, quando existe",
          "Dos .doc antigos não saem imagens — aquele formato as guarda onde um navegador não alcança",
          "Documentos criptografados são recusados em vez de lidos pela metade",
        ],
      },
      faq: [
        {
          q: "Qual a diferença em relação a «Salvar como página da Web» do Word?",
          a: "A exportação do Word quer que a página fique idêntica num navegador, então ela escreve um bloco enorme de CSS, um atributo de estilo mso- em quase todo elemento, nomes de classe como MsoNormal e tags exclusivas do Office como <o:p>. Isto faz o oposto: lê a estrutura e joga fora a apresentação. Você recebe algumas dezenas de linhas de HTML semântico em vez de alguns milhares de linhas de marcação que não dá para editar.",
        },
        {
          q: "O que acontece com as minhas imagens?",
          a: "Você escolhe entre três caminhos. Base64 embutido deixa tudo num único arquivo autocontido — conveniente, e cerca de um terço maior que a imagem original. Arquivos separados devolvem um zip: o HTML mais uma pasta images/, com as tags <img> já apontando para os caminhos certos. Ou descarte de vez, se quiser apenas o texto.",
        },
        SAFETY,
        {
          q: "Os .doc antigos funcionam?",
          a: "Sim. .doc é o binário OLE de antes de 2007, então ele é lido byte a byte no seu navegador e segue pela mesma etapa de saída. Você recebe texto, títulos, tabelas, negrito e itálico. Duas coisas não são recuperáveis daquele formato: as imagens e a numeração exata das listas. Se tiver o Word por perto, um «Salvar como .docx» dá um resultado mais limpo.",
        },
        MODES,
        {
          q: "Por que minhas células mescladas se separaram?",
          a: "Porque colspan e rowspan não são transportados nesta versão. Uma célula mesclada passa a ser uma célula normal e as vizinhas saem vazias. A tabela continua sendo HTML válido e continua legível — só não está diagramada como no Word. Acrescentar um colspan à mão depois normalmente é um ajuste de uma linha.",
        },
      ],
    },
    "google-docs-to-html": {
      short: "Google Docs → HTML",
      eyebrow: "Google Docs → HTML",
      title: "Google Docs para HTML — limpe o entulho, grátis, sem login",
      description:
        "Cole do Google Docs e receba HTML limpo. A sopa de classes c1/c17, o invólucro <b> com font-weight:normal e os redirecionamentos de link do Google são removidos. Sem acesso ao Drive, sem extensão, sem login.",
      keywords: [
        "google docs para html",
        "exportar google docs em html",
        "limpar html do google docs",
        "converter documento do google em html",
        "google docs html limpo",
      ],
      h1: ["Documento do Google em HTML.", "Menos a sopa de classes."],
      lede: [
        "Copiar de um documento devolve HTML embrulhado em nomes de classe que apontam para uma folha de estilo que você não tem.",
        "Cole aqui e o que sobra é o documento: títulos, listas, tabelas, links.",
      ],
      note: {
        heading: "Como trazer o conteúdo",
        items: [
          "Selecione o conteúdo do documento e copie — não o link de compartilhamento",
          "Cole abaixo, ou aperte Ctrl+V em qualquer ponto desta página",
          "Sem OAuth, sem permissões, sem extensões",
        ],
      },
      body: {
        stepsHeading: "Como funciona",
        steps: [
          "Abra seu documento, selecione o conteúdo e copie. Depois cole na caixa abaixo ou aperte Ctrl+V em qualquer ponto desta página — seu navegador deixa uma versão formatada na área de transferência, e é ela que é lida.",
          "Primeiro vem o DOMPurify, porque HTML da área de transferência pode ter vindo de qualquer página da web. Depois sai o entulho específico do Google: as classes c1/c17, o invólucro <b style=\"font-weight:normal\"> que o Docs coloca em volta de tudo, os identificadores docs-internal-guid e o redirecionamento google.com/url?q= que embrulha cada link.",
          "Confira a pré-visualização em sandbox e depois copie o HTML ou baixe como arquivo.",
        ],
        supportedHeading: "O que funciona",
        supported: [
          "Texto formatado copiado direto do Google Docs, Word Online, Notion ou qualquer outro editor web",
          "Código HTML colado como texto, e arquivos .html salvos",
          "Títulos, parágrafos, listas com aninhamento real, tabelas, links, negrito, itálico e riscado",
          "Desembrulhar o <b style=\"font-weight:normal\"> sem sentido que o Docs põe em volta do documento inteiro",
          "Desfazer os redirecionamentos google.com/url?q= para recuperar a URL que você realmente linkou",
          "Remover parâmetros utm_ e outros rastreadores dos links do seu documento",
        ],
        limitsHeading: "O que não faz",
        limits: [
          "Não se conecta à sua conta Google — nada aqui consegue ver o seu Drive",
          "Imagens não vêm na colagem: a área de transferência apenas as referencia nos servidores do Google",
          "Comentários e sugestões são descartados; resolva antes de copiar",
          "Gráficos, desenhos e chips inteligentes chegam como texto puro, na melhor das hipóteses",
          "Copiar o link de compartilhamento em vez do conteúdo deixa você com um link, e é só isso que haverá para converter",
          "Fontes e cores do Google saem junto com o resto do estilo",
        ],
      },
      faq: [
        {
          q: "Por que o HTML do Google Docs é tão bagunçado?",
          a: "Porque nunca foi feito para você ler. O Docs escreve uma folha de estilo cheia de regras como .c1 e .c17 e depois marca cada elemento com a classe correspondente. Você copia o conteúdo e as classes vêm junto — a folha de estilo, não. O resultado é marcação coberta de nomes de classe que já não significam nada. Em cima disso há um <b style=\"font-weight:normal\"> em volta do documento inteiro, que não faz nada em termos de formatação, e cada link é reescrito para passar por google.com/url?q=.",
        },
        {
          q: "Preciso instalar uma extensão ou fazer login?",
          a: "Não, e aqui não existe onde fazer login. Esta página lê sua área de transferência quando você cola, algo que seu navegador faz em qualquer lugar. Pedir acesso ao Drive significaria solicitar permissão sobre todos os seus arquivos e manter um servidor guardando um token. Um copiar e colar custa dois segundos e não nos entrega nada.",
        },
        {
          q: "O que aconteceu com as minhas imagens?",
          a: "Elas não chegaram, e não podem chegar. Ao copiar de um documento, o HTML da área de transferência aponta para URLs de imagem nos servidores do Google em vez de trazer os dados da imagem. Esses endereços dependem da sua sessão para carregar, então quebrariam para qualquer outra pessoa. Se você precisa das imagens, use Arquivo → Fazer download → Microsoft Word (.docx) e leve esse arquivo para a página de DOCX.",
        },
        SAFETY,
        {
          q: "Funciona com Notion, Word Online ou Confluence?",
          a: "Sim. A limpeza específica do Google é a parte mais agressiva, mas o trabalho geral — higienizar, desembrulhar elementos inúteis, remover classes mortas e parâmetros de rastreamento — vale para qualquer coisa que você colar. Vale testar aqui o texto formatado de qualquer editor web.",
        },
        MODES,
      ],
    },
    "text-to-html": {
      short: "Texto → HTML",
      eyebrow: "Texto puro → HTML",
      title: "Conversor de texto para HTML — parágrafos, quebras de linha, entidades escapadas",
      description:
        "Converta texto puro em parágrafos HTML. Linhas em branco separam parágrafos, URLs soltas viram links (opcional), quebras de linha viram <br> (opcional) e &, < e > são escapados corretamente.",
      keywords: [
        "texto para html",
        "texto puro para html",
        "conversor txt para html",
        "texto em parágrafos html",
        "converter texto em html online",
      ],
      h1: ["Texto puro em HTML.", "Com os parágrafos no lugar."],
      lede: [
        "Uma linha em branco abre um <p> novo. URLs soltas viram links, se você quiser. Sinais de menor e maior são escapados, então texto continua texto.",
        "A ferramenta mais simples do site, e a que mais gente refaz à mão.",
      ],
      note: {
        heading: "Vale saber",
        items: [
          "Linha em branco significa parágrafo novo",
          "URLs e e-mails virando links, ou intactos",
          "&, < e > escapados para nada se perder",
        ],
      },
      body: {
        stepsHeading: "Como funciona",
        steps: [
          "Cole seu texto na caixa ou solte um arquivo .txt acima. Finais de linha do Windows, do Mac e do Unix são tratados igual.",
          "Linhas em branco quebram o texto em parágrafos. Dentro de um parágrafo, quebras simples viram <br> ou são deixadas fluir — você escolhe. Caracteres especiais de HTML são escapados na passagem.",
          "Ligue ou desligue a detecção de URLs, escolha fragmento ou página inteira, e copie o HTML ou baixe o arquivo.",
        ],
        supportedHeading: "O que funciona",
        supported: [
          "Separação de parágrafos por linhas em branco, com várias seguidas contando como uma só",
          "Quebras de linha simples mantidas como <br>, ou juntadas numa linha corrida",
          "URLs com http:// e https://, além de endereços que começam com www., convertidos em links",
          "Endereços de e-mail convertidos em links mailto:",
          "&, <, > e aspas escapados, então um <b> literal no seu texto continua aparecendo como texto",
          "Finais de linha CRLF, CR e LF, e uma marca de ordem de bytes no começo do arquivo",
        ],
        limitsHeading: "O que não faz",
        limits: [
          "Não interpreta Markdown: **negrito** continua sendo asteriscos. Para isso, use a página de Markdown.",
          "Indentação não é lida como estrutura — um bloco recuado com tabulações não vira lista nem bloco de código",
          "Não adivinha títulos: uma linha curta em maiúsculas continua sendo parágrafo",
          "Tabelas diagramadas com espaços continuam texto; para tabelas de verdade, use a página de CSV",
          "Arquivos acima de 25 MB",
        ],
      },
      faq: [
        {
          q: "Como ele decide onde ficam os parágrafos?",
          a: "Pela linha em branco. É a única convenção que todo mundo que escreve em texto puro já segue, e não exige adivinhação. Várias linhas em branco seguidas contam como uma. Se o seu texto não tiver nenhuma, você recebe um parágrafo único e longo — e um aviso, em vez de ficar na dúvida.",
        },
        {
          q: "E se eu não quiser que minhas URLs virem links?",
          a: "Desligue a opção de URLs soltas e elas continuam texto puro. Vale a pena quando você escreve sobre URLs em vez de linká-las: um tutorial, um log de erros, um arquivo de configuração.",
        },
        {
          q: "Por que meu <b> aparece como texto em vez de deixar algo em negrito?",
          a: "Porque é exatamente o que converter texto puro em HTML significa. Sua entrada é texto, então um <b> literal são três caracteres visíveis e sai como &lt;b&gt;. Se você quer que as tags funcionem, sua entrada não é texto puro — tente a página de Markdown, ou a de Google Docs se for colar texto formatado.",
        },
        {
          q: "Para que serve a opção de <br>?",
          a: "Para poesia, endereços, saídas de log — qualquer coisa em que as quebras de linha façam parte do significado. Desligue para prosa que foi quebrada à mão em 80 colunas, onde você quer que o navegador reflua no tamanho da tela do leitor.",
        },
        MODES,
        PRIVACY,
      ],
    },
    "csv-to-html-table": {
      short: "CSV → tabela",
      eyebrow: "CSV → tabela HTML",
      title: "Conversor de CSV para tabela HTML — grátis, colando ou enviando",
      description:
        "Converta CSV numa tabela HTML semântica. Vírgulas, ponto e vírgula e tabulações são detectados automaticamente, a primeira linha vira <thead>, e um CSS responsivo opcional permite rolagem em telas estreitas.",
      keywords: [
        "csv para tabela html",
        "csv para html",
        "converter csv em tabela html",
        "tsv para tabela html",
        "csv em tabela online",
      ],
      h1: ["CSV numa tabela HTML.", "Semântica, não uma grade de div."],
      lede: [
        "A primeira linha vira um <thead> de verdade com atributos scope, então um leitor de tela consegue ler a tabela como tabela.",
        "Vírgulas entre aspas, quebras de linha dentro de uma célula e exportações europeias com ponto e vírgula estão cobertas.",
      ],
      note: {
        heading: "Vale saber",
        items: [
          "O separador é lido do arquivo e você pode trocar",
          "<thead> e <th scope=\"col\">, não div estilizados",
          "CSS responsivo opcional para telas estreitas",
        ],
      },
      body: {
        stepsHeading: "Como funciona",
        steps: [
          "Solte um .csv ou .tsv acima, ou cole as linhas direto na caixa. Nada sai da aba.",
          "O separador é deduzido do próprio arquivo — vírgula, ponto e vírgula, tabulação ou barra vertical — e informado acima da saída. Troque se o palpite errar.",
          "Escolha se a primeira linha é cabeçalho e se quer o CSS responsivo, e depois copie o HTML ou baixe o arquivo.",
        ],
        supportedHeading: "O que funciona",
        supported: [
          "Qualquer separador que a exportação tenha usado, deduzido do arquivo ou definido à mão",
          "Campos entre aspas chegam inteiros; uma quebra de linha dentro de uma célula vira <br> em vez de partir a linha",
          "Exportações alemãs, francesas e brasileiras, onde o separador é ponto e vírgula porque a vírgula é o decimal",
          "Primeira linha como <thead> com <th scope=\"col\">, ou sem cabeçalho",
          "Uma marca de ordem de bytes inicial, descartada para não acabar dentro do seu primeiro <th>",
          "Linhas curtas completadas com <td> vazios para que todas carreguem o mesmo número de células",
        ],
        limitsHeading: "O que não faz",
        limits: [
          "UTF-8 na entrada e na saída, que é o que o meta charset declara; outras codificações podem chegar com caracteres estranhos",
          "25 MB de texto e 100.000 células de uma vez",
          "O texto da célula é escapado, nunca reformatado: 007 chega ao <td> como 007",
          "Sem ordenar, filtrar nem somar — ele converte, não calcula",
          "Não há JavaScript na saída, então a tabela não é interativa",
          "Aspas não fechadas derrotam qualquer leitor de CSV, e células podem cair na coluna errada",
        ],
      },
      faq: [
        {
          q: "Por que uma <table> e não div com CSS grid?",
          a: "Porque dados tabulares são exatamente o motivo pelo qual o elemento table existe. Um leitor de tela anuncia as dimensões, permite navegar célula por célula e lê o cabeçalho da coluna junto com cada célula — nada disso uma grade de div oferece. Mecanismos de busca também leem isso como dados. Estilo não é motivo para abrir mão disso.",
        },
        {
          q: "O que o CSS responsivo faz exatamente?",
          a: "Bem pouco, de propósito. Ele embrulha a tabela num div que rola horizontalmente quando ela fica larga demais, e aplica border-collapse com um espaçamento e bordas discretos. É o mínimo que uma tabela precisa para ser usável no celular. Todo o resto fica para a sua folha de estilo. Desligue e você recebe a <table> pura.",
        },
        {
          q: "Minha exportação usa ponto e vírgula. Vai funcionar?",
          a: "Sim. Onde a vírgula faz papel de separador decimal, a planilha exporta com ponto e vírgula — isso é lido do arquivo e informado acima da saída. Troque se o palpite errar.",
        },
        {
          q: "Uma célula tem uma vírgula. Minhas colunas vão deslocar?",
          a: "Não, desde que o campo esteja entre aspas — que é o que qualquer gerador de CSV correto faz. \"Silva, João\" chega como um único <td>. Uma quebra de linha dentro de um campo entre aspas também é preservada: sai como <br> para a linha não se partir em duas.",
        },
        PRIVACY,
        MODES,
      ],
    },
    "excel-to-html-table": {
      short: "Excel → tabela",
      eyebrow: "Excel → tabela HTML",
      title: "Conversor de Excel para tabela HTML — escolha suas planilhas, grátis",
      description:
        "Converta uma pasta de trabalho .xlsx em tabelas HTML semânticas. Escolha quais planilhas incluir, defina a linha de cabeçalho e receba os valores exibidos nas células em vez do código das fórmulas. Nada é enviado.",
      keywords: [
        "excel para tabela html",
        "xlsx para html",
        "excel para html",
        "converter excel em tabela html",
        "planilha para tabela html",
      ],
      h1: ["Planilha em tabela HTML.", "Valores, não fórmulas."],
      lede: [
        "Solte um .xlsx, escolha as planilhas que quiser e receba uma <table> limpa para cada uma.",
        "Cores e fontes ficam de fora de propósito: uma tabela que traz o próprio estilo briga com todo lugar onde você a colar.",
      ],
      note: {
        heading: "Vale saber",
        items: [
          "Todas as planilhas listadas — marque as que quiser",
          "Valores das células como aparecem, não o código da fórmula",
          "100.000 células por execução",
        ],
      },
      body: {
        stepsHeading: "Como funciona",
        steps: [
          "Solte um .xlsx acima. A pasta de trabalho é aberta na aba e cada nome de planilha aparece como um botão.",
          "A planilha um converte de imediato. Ligue e desligue as outras — a pasta fica na memória, então nada é lido duas vezes.",
          "Defina se a primeira linha é cabeçalho e se quer o CSS responsivo, e depois copie o HTML ou baixe o arquivo.",
        ],
        supportedHeading: "O que funciona",
        supported: [
          "Tudo que salva .xlsx: Excel 2007 e posterior, LibreOffice Calc, Numbers, Google Planilhas",
          "Várias planilhas, cada uma virando sua própria tabela sob um <h2> com o nome da planilha",
          "O valor que um leitor veria: um <td> recebe 42, nunca =SOMA(A1:A9)",
          "Datas escritas como texto ISO em vez do número de série no estilo 45000 que o Excel guarda por dentro",
          "Primeira linha como <thead> com <th scope=\"col\">, ou sem cabeçalho",
          "Um <caption> na tabela quando você converte uma planilha só, que leitores de tela leem primeiro",
        ],
        limitsHeading: "O que não faz",
        limits: [
          "Cores, fontes, bordas e formatação condicional não são reproduzidos — é uma decisão de projeto nesta versão",
          "Células mescladas perdem colspan e rowspan; cada célula passa a ser um <td> próprio",
          "Fórmulas não são transportadas como fórmulas e nada é recalculado",
          "O binário .xls anterior a 2007 é um formato completamente diferente, e não é processado",
          "Gráficos, tabelas dinâmicas e imagens na planilha não são exportados",
          "Uma pasta criptografada não pode ser aberta aqui — salve antes uma cópia sem proteção",
          "Seleções acima de 100.000 células",
        ],
      },
      faq: [
        {
          q: "Por que minhas cores e fontes não vêm junto?",
          a: "Porque uma tabela que traz as próprias cores perde a briga com a folha de estilo do seu site em nove de cada dez vezes, e você acaba apagando estilos inline à mão. O que é útil é uma <table> limpa com a estrutura correta, estilizada pela página onde ela aterrissa. Se você precisa exatamente da aparência original, o «Salvar como página da Web» do Excel entrega isso — junto com alguns milhares de linhas de marcação.",
        },
        {
          q: "O <td> leva a fórmula ou o resultado?",
          a: "O resultado. Uma pasta de trabalho guarda tanto a fórmula quanto seu último valor calculado, e o valor é o que cabe numa página web — então =SOMA(A1:A9) sai escrito como 42.",
        },
        {
          q: "Uma célula com fórmula saiu vazia. Por quê?",
          a: "Porque não havia valor em cache no arquivo para ler. O Excel escreve um a cada salvamento, mas uma pasta produzida por script e nunca aberta no Excel não tem nenhum. Abra uma vez, salve, e então converta.",
        },
        {
          q: "Várias planilhas podem ir num mesmo arquivo?",
          a: "Sim. Marque quantos nomes de planilha quiser; cada um sai como sua própria <table>, com um <h2> acima trazendo o nome daquela planilha.",
        },
        {
          q: "E uma mesclagem de células?",
          a: "Ela é desfeita. Cada célula do intervalo sai como um <td> próprio, o valor na primeira e as demais vazias. HTML sabe expressar isso com colspan e rowspan, mas deduzir os intervalos corretamente a partir de uma pasta é trabalho de uma segunda fase; por ora a saída se apresenta como a grade simples que é.",
        },
        PRIVACY,
      ],
    },
  },
  legal: {
    about: {
      short: "Sobre",
      eyebrow: "Sobre este site",
      title: "Sobre o Docs 2 HTML — quem faz e por quê",
      description:
        "O Docs 2 HTML é um conversor gratuito que roda no navegador e transforma Markdown, Word, Google Docs, texto, CSV e Excel em HTML limpo. Sem contas, sem uploads, sem rastreamento. Aqui está o como e o porquê.",
      h1: "Uma ferramenta pequena, e o raciocínio por trás dela",
      lede: [
        "O Docs 2 HTML converte documentos em HTML que você assinaria embaixo. É esse o produto inteiro.",
        "É construído e mantido por uma pessoa, de forma independente, e roda inteiramente dentro do seu navegador.",
      ],
      sections: [
        {
          heading: "Por que existe",
          body: [
            "Toda ferramenta de escrita já exporta HTML. É exatamente aí que está o problema. O «Salvar como página da Web» do Word produz milhares de linhas com um atributo de estilo mso- em quase todo elemento. O Google Docs entrega nomes de classe como c1 e c17 que apontam para uma folha de estilo que você não recebeu. Os dois são tecnicamente HTML e os dois são inúteis como código-fonte de uma página web: você não consegue ler, não consegue editar e não consegue colar num template sem que eles briguem com o seu CSS.",
            "O que as pessoas querem de verdade é a marcação que teriam escrito à mão: um <h2> onde há um título, uma <table> onde há uma tabela, e nada além disso. Chegar lá partindo de uma exportação oficial significa apagar mais do que preservar, então a maioria faz isso à mão ou desiste e cola a bagunça.",
            "Este site faz a parte de apagar. Ele lê a estrutura do seu documento e escreve HTML semântico a partir dela, jogando fora a apresentação em vez de tentar reproduzi-la.",
          ],
        },
        {
          heading: "Por que roda no seu navegador",
          body: [
            "A maioria dos conversores envia o seu arquivo para um servidor, converte lá e devolve um download. É um projeto razoável, e também um projeto em que o seu documento passa um tempo no computador de outra pessoa. Para o rascunho de um post de blog, tanto faz. Para um contrato, um prontuário médico, números internos ou um manuscrito inédito, não.",
            "Então a conversão roda na sua própria máquina, em JavaScript, na aba que você já tem aberta. Não existe etapa de upload porque não existe para onde enviar. Você pode verificar: desconecte a rede e converta algo, ou observe a aba de rede do seu navegador enquanto solta um arquivo.",
          ],
        },
        {
          heading: "Como funciona de fato",
          body: [
            "Quando você solta um arquivo, seu navegador o lê localmente e entrega os bytes a um analisador que também roda no seu navegador. O analisador produz uma estrutura, essa estrutura se torna HTML, e o HTML é higienizado antes de você vê-lo. Os analisadores são bibliotecas de código aberto, escolhidas por formato:",
          ],
          items: [
            "O markdown-it interpreta Markdown, com a especificação CommonMark mais as tabelas, listas de tarefas e riscado do GitHub.",
            "O Mammoth lê .docx. O .doc antigo é interpretado pelo nosso próprio leitor, byte a byte, porque é um formato binário de antes de 2007 sem nenhuma biblioteca que funcione num navegador.",
            "O DOMPurify higieniza todo pedaço de HTML que passa por aqui, incluindo o que nós mesmos geramos, porque o texto dentro dele veio do seu documento.",
            "O Papa Parse lê CSV e TSV; o read-excel-file lê pastas de trabalho .xlsx.",
          ],
        },
        {
          heading: "Sobre a parte da segurança",
          body: [
            "Uma ferramenta que produz HTML tem um dever que um conversor para Markdown não tem: o que ela entrega pode acabar colado num site em funcionamento, onde vai executar. Então higienizar aqui não é um recurso, é o piso. Tags script, atributos de manipuladores de evento, URLs javascript:, iframe, object e embed são removidos de tudo, e nada sem higienização é inserido no DOM desta página.",
            "A pré-visualização é um assunto separado, e roda dentro de um iframe em sandbox, com scripts desligados e uma origem opaca. Isso significa: não consegue alcançar esta página, não consegue ler nada e não consegue executar, mesmo que o higienizador tivesse deixado algo passar. Duas paredes independentes, porque uma só é um ponto único de falha.",
          ],
        },
        {
          heading: "O que ele deliberadamente não faz",
          body: [
            "Não há contas, porque não há nada para guardar. Não há API, porque não há servidor para chamar. Não há integração com o Google Drive, porque isso significaria pedir acesso a todos os seus arquivos e guardar um token.",
            "Cada conversão também tem limites reais, e cada página de ferramenta lista os seus. Células mescladas se separam. Cores e fontes do Excel não são reproduzidas. Imagens não conseguem passar por uma colagem do Google Docs. Isso é dito de antemão, em vez de descoberto depois de converter algo que importava.",
          ],
        },
        {
          heading: "Como isso se paga",
          body: [
            "A ferramenta é gratuita e não tem versão paga. O plano é cobrir a hospedagem com publicidade, então no futuro você pode ver anúncios nestas páginas. Os anúncios nunca serão posicionados de modo a se confundir com um botão de baixar ou converter, e não serão inseridos depois de uma conversão de modo a fazer a página se mexer sob o seu cursor.",
            "A publicidade não muda o funcionamento da conversão. Seus arquivos ficam na sua máquina de qualquer jeito — não é uma decisão de política que poderia ser revertida por dinheiro, é a consequência de não existir servidor em primeiro lugar.",
          ],
        },
        {
          heading: "O site irmão",
          body: [
            "O DocsToMD faz o mesmo trabalho no sentido inverso: Word, PDF, HTML, CSV e Excel para Markdown. Mesma abordagem, mesmo modelo de privacidade, formato de saída oposto. Se você chegou aqui procurando Markdown, é aquele que você quer.",
          ],
        },
      ],
    },
    contact: {
      short: "Contato",
      eyebrow: "Fale com a gente",
      title: "Contato — Docs 2 HTML",
      description:
        "Escreva sobre um arquivo que não converte, um HTML que saiu errado, uma tradução que soa estranha ou um recurso que você quer. Uma pessoa lê tudo.",
      h1: "Fale com a gente",
      lede: [
        "Uma pessoa lê esta caixa de entrada, então as respostas não são instantâneas — mas são respostas de verdade, não um número de protocolo.",
        `E-mail: ${CONTACT_EMAIL}`,
      ],
      sections: [
        {
          heading: "O HTML saiu errado",
          body: [
            "É a coisa mais útil que você pode nos contar, e também a mais delicada, porque não conseguimos ver o seu arquivo. Então descreva em vez de enviar:",
          ],
          items: [
            "Em que página você estava e qual era a entrada: um .docx, uma colagem do Google Docs, um .csv",
            "O que você esperava na saída e o que recebeu: uma tabela faltando, um título que virou parágrafo, um atributo que deveria ter sido removido",
            "O trecho relevante do HTML que você recebeu, se puder compartilhar; algumas linhas normalmente bastam",
            "Seu navegador e sistema operacional, já que área de transferência e leitura de arquivo se comportam de formas diferentes",
          ],
        },
        {
          heading: "Relatos de segurança",
          body: [
            "Se você encontrou uma entrada que produz HTML com algo executável — um manipulador de evento que sobreviveu, uma URL javascript:, uma tag que deveria ter sido removida — escreva e inclua a entrada exata que provoca isso. É a única classe de bug aqui que poderia prejudicar outra pessoa mais tarde, e é corrigida antes de qualquer outra coisa.",
            "Relate em privado primeiro, em vez de publicar. Não há programa de recompensas; há uma correção rápida e um agradecimento sincero.",
          ],
        },
        {
          heading: "Por favor, não nos envie seus documentos",
          body: [
            "O sentido deste site é que seus arquivos fiquem no seu computador. Enviar um por e-mail desfaz isso do seu lado e nos coloca numa posição em que preferimos não estar. Se você consegue reproduzir o problema com um arquivo que não importa — dois títulos e uma tabela digitados num documento novo — na verdade isso é mais útil, porque isola a falha.",
            "Se um problema realmente não pode ser reproduzido sem o arquivo original, escreva primeiro e vamos ver o que é necessário. Normalmente a resposta é uma descrição da estrutura, não do conteúdo.",
          ],
        },
        {
          heading: "Traduções",
          body: [
            "Este site está em seis idiomas. O inglês é o original e o resto foi traduzido com cuidado, mas um falante nativo ainda vai notar o que uma tradução cuidadosa não vê: uma frase tecnicamente correta que soa estranha, um termo que o mundo local do software chama de outro jeito.",
            "Se você notar algum, diga o idioma e a página, e cite a frase. Correções pequenas são bem-vindas e entram rápido.",
          ],
        },
        {
          heading: "Recursos, e coisas que não vamos fazer",
          body: [
            "Pedidos de recurso são lidos e muitas vezes implementados, sobretudo os pequenos: um ajuste para um estilo de saída, suporte a uma variante de formato, um delimitador que não detectamos, um gancho de CSS que você precisa na saída.",
            "Algumas coisas estão fora do escopo por projeto, e pedir não vai mudar: upload de arquivos para um servidor, integração com o Google Drive, contas de usuário ou reproduzir com exatidão o estilo do Word e do Excel. O último não é uma limitação pela qual nos desculpamos — a marcação limpa é o produto.",
          ],
        },
        {
          heading: "Privacidade e questões legais",
          body: [
            "Perguntas sobre quais dados este site coleta, ou pedidos relativos aos seus dados sob a LGPD, o GDPR, a CCPA ou leis semelhantes, vão para o mesmo endereço. Leia a política de privacidade primeiro: a versão curta é que não coletamos nada que identifique você, o que deixa a maioria desses pedidos sem objeto — e a política explica exatamente por quê.",
          ],
        },
      ],
    },
    privacy: {
      short: "Privacidade",
      eyebrow: "Política de privacidade",
      title: "Política de privacidade — Docs 2 HTML",
      description:
        "O que o Docs 2 HTML coleta e o que não coleta. Seus documentos são processados no seu navegador e nunca enviados. Sem contas, sem análise dos seus arquivos, sem venda de dados.",
      h1: "Política de privacidade",
      lede: [
        "Os documentos que você converte aqui nunca saem do seu computador. Não é uma promessa sobre como tratamos seus dados — não existe etapa em que os recebamos.",
        "Esta página explica isso em detalhe e é honesta sobre as partes em que um terceiro entra em cena.",
      ],
      sections: [
        {
          heading: "Seus documentos",
          body: [
            "Os arquivos que você solta, escolhe ou cola neste site são lidos pelo seu próprio navegador e convertidos por código que roda na sua própria máquina. Eles não são transmitidos para nós, nem para um provedor de hospedagem, nem para mais ninguém. Não há conversão no servidor, nem fila, nem armazenamento temporário, nem cache do seu conteúdo.",
            "Também não gravamos nada no seu dispositivo. Seus arquivos e o resultado convertido não são salvos em armazenamento local, IndexedDB ou cookie. Feche a aba e o conteúdo desaparece; as únicas cópias são o arquivo com que você começou e o que você copiou ou baixou de propósito.",
            "O painel de pré-visualização merece uma nota, porque parece uma exceção. Não é: a pré-visualização é um iframe cujo conteúdo é entregue diretamente pela página que você já tem aberta, via srcdoc. Nada é baixado e nada é enviado. O quadro está em sandbox e tem origem opaca, então também não consegue ler nada.",
            "Você pode verificar tudo isso. Desconecte a rede e converta um arquivo — continua funcionando. Ou abra as ferramentas de desenvolvedor, olhe a aba de rede e confirme que soltar um arquivo não produz upload nenhum.",
          ],
        },
        {
          heading: "O que nós coletamos",
          body: [
            "Não pedimos nem armazenamos seu nome, seu e-mail ou dados de conta, porque não existem contas.",
            "O site é hospedado no Cloudflare Pages. Como qualquer hospedagem web, ele processa dados de requisição padrão quando o seu navegador pede uma página: endereço IP, agente de usuário, a URL pedida e a hora. Isso é inerente ao funcionamento da web e serve para entregar o site e barrar abusos. Nós olhamos esses dados de forma agregada para saber quais páginas recebem tráfego. Eles não estão ligados a nada que você converta, porque suas conversões nunca chegam a servidor nenhum.",
          ],
        },
        {
          heading: "Cookies e publicidade",
          body: [
            "O site em si não define nenhum cookie. Não há login, nem carrinho, nem preferência para lembrar entre visitas, então não há nada que um cookie precise guardar.",
            "Pretendemos exibir anúncios do Google AdSense para cobrir os custos de hospedagem. Quando isso estiver ligado, o Google pode definir cookies ou ler identificadores de dispositivo para entregar e medir anúncios, conforme as políticas dele. É a única parte deste site em que um terceiro vê algo sobre a sua visita, e diz respeito à página em que você está — não ao documento que você converteu, que o Google não tem como ver.",
            "Se você estiver no Espaço Econômico Europeu, no Reino Unido ou na Suíça, será pedido o seu consentimento antes de qualquer cookie não essencial, e você poderá retirá-lo depois. A política de cookies explica as categorias e como mudar de ideia.",
          ],
        },
        {
          heading: "Terceiros",
          body: ["A lista é deliberadamente curta:"],
          items: [
            "O Cloudflare Pages hospeda os arquivos estáticos que compõem este site.",
            "O Google AdSense, quando ligado, entrega os anúncios descritos acima.",
            "Os arquivos do Google Fonts são hospedados aqui, servidos deste domínio, então pedir uma página não conta ao Google que você passou por aqui.",
            "Nenhuma plataforma de análise, gravador de sessão, mapa de calor, widget de chat ou conteúdo social incorporado é carregado em qualquer página.",
          ],
        },
        {
          heading: "Crianças",
          body: [
            "Este é um utilitário de conversão de documentos, sem recursos sociais e sem contas. Não é direcionado a menores de 13 anos e, como não coletamos informações pessoais de ninguém, também não as coletamos de crianças conscientemente.",
          ],
        },
        {
          heading: "Seus direitos",
          body: [
            "Sob a LGPD, o GDPR, a CCPA e leis semelhantes, você tem direito de acessar, corrigir, excluir e portar seus dados pessoais, e de se opor ao tratamento deles. Respeitamos todos esses direitos e, na prática, os pedidos aqui são incomumente fáceis de atender: não guardamos nenhum arquivo que você converteu nem qualquer perfil seu para entregar, corrigir ou excluir.",
            "Para os cookies de publicidade descritos acima, o responsável é o Google, e as ferramentas dele dão o controle mais direto sobre personalização de anúncios. Escreva e indicamos o lugar certo.",
          ],
        },
        {
          heading: "Mudanças nesta política",
          body: [
            "Se esta política mudar de forma significativa — um novo terceiro, uma nova categoria de dados — a data no topo desta página muda com ela. Como o site não guarda endereços de e-mail, não temos como avisar você diretamente, então essa data é o sinal honesto a acompanhar.",
          ],
        },
      ],
    },
    terms: {
      short: "Termos",
      eyebrow: "Termos de serviço",
      title: "Termos de serviço — Docs 2 HTML",
      description:
        "Os termos de uso do Docs 2 HTML: gratuito para qualquer finalidade, inclusive comercial; fornecido como está; você mantém todos os direitos sobre seus documentos; e revise a saída antes de publicar.",
      h1: "Termos de serviço",
      lede: [
        "Usar este site significa concordar com o que vem abaixo. É curto, porque uma ferramenta gratuita de navegador que não guarda nada não precisa de muito mais.",
      ],
      sections: [
        {
          heading: "O que você pode fazer com isto",
          body: [
            "Use para o que quiser, inclusive trabalho comercial. Converta quantos arquivos quiser. Sem conta, sem chave de licença, sem atribuição obrigatória e sem limite no uso da saída: o HTML produzido é seu para publicar, vender ou modificar.",
            "Existem duas ressalvas práticas, e elas existem em benefício da ferramenta mais do que do nosso: cada arquivo precisa ficar abaixo do limite de tamanho indicado na página, e a conversão roda na sua máquina, então um documento muito grande é limitado pela sua própria memória e processador, não por uma cota que tenhamos definido.",
          ],
        },
        {
          heading: "Seus documentos continuam seus",
          body: [
            "Você mantém todos os direitos que já tinha sobre os arquivos que converte e sobre o HTML resultante. Não reivindicamos licença nenhuma sobre nenhum dos dois, e não poderíamos aproveitá-los nem se quiséssemos: a conversão acontece no seu navegador e o seu conteúdo não chega até nós.",
            "Você é responsável por ter o direito de converter o que converte. Se um documento não é seu para processar, esta ferramenta não muda isso.",
          ],
        },
        {
          heading: "Revise a saída antes de publicar",
          body: [
            "O site é gratuito e fornecido sem garantia. Buscamos conversão precisa e segura, e documentamos os limites conhecidos de cada formato na página dele, mas nenhum conversor é perfeito.",
            "Aqui isso importa mais do que na maioria das ferramentas, porque a saída é HTML e é provável que você a coloque num site em funcionamento. Toda entrada é higienizada — scripts, manipuladores de evento, URLs javascript: e conteúdos incorporados são removidos — e tratamos uma falha nisso como o tipo mais grave de bug. Mas não podemos garantir que a marcação produzida a partir de uma entrada arbitrária seja segura para todos os contextos em que você possa colá-la. Revise o que você publica, exatamente como revisaria HTML de qualquer outra fonte externa.",
            "A estrutura também tem limites: células mescladas se separam, o estilo do Excel não é reproduzido e diagramações complexas do Word são achatadas. Para qualquer coisa importante, compare a saída com o original.",
            "Na medida permitida pela lei, não somos responsáveis por perda de dados, de trabalho, de lucros ou por outros danos decorrentes do uso do site ou da confiança na saída dele.",
          ],
        },
        {
          heading: "Uso aceitável",
          body: [
            "Não use o site para processar material sobre o qual você não tem direitos, nem de formas que prejudiquem o site ou outras pessoas:",
          ],
          items: [
            "Não tente quebrar, sobrecarregar ou encontrar vulnerabilidades no site com o objetivo de prejudicá-lo ou prejudicar seus usuários. Se encontrar um problema de segurança, relate.",
            "Não faça scraping nem automatize o site de formas que o degradem para os demais.",
            "Não republique o site como se fosse seu, nem o apresente como se fosse operado por outra pessoa.",
            "Não interfira na publicidade que paga a hospedagem, nem bloqueando nem inflando artificialmente.",
          ],
        },
        {
          heading: "O software por baixo",
          body: [
            "Esta ferramenta se apoia em bibliotecas de código aberto — markdown-it, Mammoth, DOMPurify, Papa Parse, read-excel-file e outras — cada uma com a própria licença, com os avisos preservados no código distribuído. Essas licenças cobrem esses componentes; estes termos cobrem este site.",
          ],
        },
        {
          heading: "Disponibilidade e mudanças",
          body: [
            "Este é um serviço gratuito mantido por uma pessoa. Podemos mudar como ele funciona, acrescentar ou retirar um formato, ou desligá-lo, sem aviso. Como nada seu fica guardado aqui, uma queda custa a você o acesso a um conversor e nada mais.",
            "Se estes termos mudarem, a data no topo desta página muda com eles. Continuar usando o site depois disso significa aceitar a versão revisada.",
          ],
        },
      ],
    },
    cookies: {
      short: "Cookies",
      eyebrow: "Política de cookies",
      title: "Política de cookies — o Docs 2 HTML não usa cookies próprios",
      description:
        "Quais cookies o Docs 2 HTML usa. O site em si não define nenhum. A publicidade, quando ligada, pode definir, e no EEE, no Reino Unido e na Suíça apenas com o seu consentimento.",
      h1: "Política de cookies",
      lede: [
        "Este site não define cookies próprios. Não há login e não há nada para lembrar entre visitas.",
        "A exceção é a publicidade, e esta página diz exatamente o que isso envolve.",
      ],
      sections: [
        {
          heading: "O que é um cookie, em resumo",
          body: [
            "Um cookie é um pequeno trecho de texto que um site pede ao seu navegador para guardar e devolver em visitas seguintes. É assim que um site reconhece que dois carregamentos de página vêm do mesmo navegador — útil para manter você conectado, e igualmente útil para rastrear. Tecnologias relacionadas, como armazenamento local e identificadores de dispositivo, fazem praticamente a mesma coisa por outros meios, e também estão cobertas aqui.",
          ],
        },
        {
          heading: "Cookies que este site define",
          body: [
            "Nenhum. Nem um, hoje.",
            "Não há conta em que manter você conectado, nem carrinho, nem preferência para salvar entre visitas. Até os ajustes do conversor — fragmento ou página inteira, indentação, linha de cabeçalho, delimitador — vivem apenas na página enquanto ela está aberta, e voltam ao padrão quando você recarrega. Seus arquivos e o resultado convertido também nunca são gravados em armazenamento local, IndexedDB ou cookie.",
          ],
        },
        {
          heading: "Cookies de publicidade",
          body: [
            "A hospedagem é paga com publicidade, e pretendemos usar o Google AdSense. Quando estiver funcionando, o Google pode definir cookies ou ler identificadores de dispositivo para entregar anúncios, limitar quantas vezes você vê o mesmo e medir cliques. Em algumas configurações, esses cookies são usados para personalizar anúncios com base na sua navegação em outros sites.",
            "Esses cookies são definidos pelo Google, não por nós, e o Google é o responsável pelos dados que eles carregam. O que eles conseguem ver é a página em que você está. O que não conseguem ver é qualquer coisa que você converta: isso nunca sai do seu navegador, então não há nada que um script de anúncio possa ler.",
          ],
        },
        {
          heading: "Consentimento, se você estiver na Europa",
          body: [
            "Se você estiver no Espaço Econômico Europeu, no Reino Unido ou na Suíça, cookies não essenciais só são usados depois que você concordar. Você será perguntado uma vez, por um diálogo de consentimento, e pode recusar e continuar usando todas as partes do site — nada aqui depende do consentimento.",
            "Você pode mudar sua resposta a qualquer momento pelo mesmo diálogo, acessível pelo rodapé quando a publicidade estiver ligada. Retirar o consentimento interrompe a definição de novos cookies não essenciais.",
          ],
        },
        {
          heading: "Controlar cookies por conta própria",
          body: [
            "Independentemente do que este site faça, seu navegador tem a palavra final:",
          ],
          items: [
            "Todos os navegadores principais conseguem bloquear cookies de terceiros diretamente nas configurações de privacidade.",
            "Você pode apagar cookies existentes de um site, ou de todos, a qualquer momento.",
            "Janelas privativas ou anônimas descartam os cookies quando você as fecha.",
            "As configurações de anúncios do próprio Google permitem desligar a publicidade personalizada nos sites que usam a rede dele.",
          ],
        },
        {
          heading: "Mudanças",
          body: [
            "Se este site começar a usar um cookie que hoje não usa, esta página será atualizada antes disso acontecer, e a data no topo muda. E se você quiser saber o que está definido agora em vez de acreditar na nossa palavra, as ferramentas de desenvolvedor do seu navegador mostram a lista completa em Aplicativo ou Armazenamento.",
          ],
        },
      ],
    },
  },
};

export default pt;
