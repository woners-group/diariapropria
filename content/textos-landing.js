/* =========================================================
   TEXTOS DA LANDING — EDITE O SITE POR AQUI
   ---------------------------------------------------------
   • Mude só o que está entre aspas "..." (ou números).
   • Não apague vírgulas, chaves { } nem colchetes [ ].
   • Pode usar <strong>negrito</strong> dentro dos textos.
   • Para adicionar um item numa lista (módulo, card,
     depoimento, pergunta...), copie um bloco { ... },
     cole logo abaixo e separe com vírgula.
   • Nos planos, comece o item com "✕ " para mostrar
     algo que NÃO está incluso (aparece riscado).
   • Salve o arquivo e atualize a página (F5).
   ========================================================= */

window.SITE_DATA = {

  /* ---------- SEO / aba do navegador ---------- */
  meta: {
    title: "Diária Própria — Pare de pagar a diária. Comece a cobrar a sua.",
    description: "Na crise, cada diária de pedreiro pesa no bolso. Aprenda a obra do alicerce ao reboco, faça o serviço da sua casa e ganhe uma renda extra com bicos. A partir de R$10.",
  },

  /* ---------- LINKS DE PAGAMENTO (usados nos planos) ---------- */
  links: {
    basico: "https://pay.cakto.com.br/oa8q4hp_1301107",   // Essencial (R$10)
    premium: "https://pay.cakto.com.br/xibr88f_1301113",  // Completo (R$19)
  },

  /* ---------- BARRA DO TOPO (contagem regressiva) ---------- */
  topbar: {
    ativo: true,                       // false = esconde a barra
    texto: "Preço de lançamento termina em",
    minutos: 10,                       // duração do cronômetro
  },

  /* ---------- TOPO DA PÁGINA (HERO) ---------- */
  hero: {
    selo: "★ Na crise, quem sabe fazer não fica parado ★",
    titulo: "Pare de pagar a diária.<span>Comece a cobrar a sua.</span>",
    texto: "Com tudo caro, pagar pedreiro pesa no bolso. Aprenda a obra <strong>do alicerce ao reboco</strong>, faça o serviço da sua casa e use o que aprendeu pra pegar bicos e ganhar uma <strong>renda extra</strong>.",
    mockup: {
      linha1: "Curso",
      linha2: "Diária Própria",
      linha3: "Do alicerce ao reboco",
    },
    botao: "Quero minha Diária Própria",
    rodapeBotao: "Acesso imediato · Garantia de 7 dias · A partir de R$10",
    // etiquetas que flutuam em volta da ilustração do topo
    etiquetas: [
      { icone: "wallet", texto: "A partir de R$10" },
      { icone: "award", texto: "Certificado" },
      { icone: "video", texto: "Videoaulas" },
    ],
    numeros: [
      // "contar": número para animar (opcional). "sufixo": vai depois do número.
      { valor: "10", legenda: "módulos", contar: 10 },
      { valor: "89", legenda: "páginas de apostila", contar: 89 },
      { valor: "7 dias", legenda: "garantia" },
    ],
  },

  /* ---------- DOR (Sem o curso x Com o curso) ---------- */
  dor: {
    chamada: "★ A conta não fecha",
    titulo: "Na crise, cada diária pesa no bolso",
    subtitulo: "Material subindo, salário parado e pedreiro cobrando caro — quando aparece. Enquanto isso, a obra fica pela metade e o dinheiro some.",
    sem: {
      titulo: "Pagando a diária",
      itens: [
        "Pagar pedreiro até pra servicinho simples",
        "Esperar semanas até alguém poder vir",
        "Aceitar orçamento sem saber se o serviço tá certo",
        "Comprar material a olho e jogar dinheiro fora",
        "Ficar sem renda quando o dinheiro aperta",
      ],
    },
    com: {
      titulo: "Com a sua Diária Própria",
      itens: [
        "Fazer o serviço da sua casa sem pagar mão de obra",
        "Calcular o material certo antes de comprar",
        "Usar o traço certo de massa e concreto",
        "Conferir prumo, nível e esquadro como profissional",
        "Pegar bicos na vizinhança e cobrar a sua diária",
      ],
    },
  },

  /* ---------- SIMULADOR (economia + renda extra) ----------
     Os valores iniciais são só ponto de partida: o visitante ajusta
     para a realidade da região dele. */
  simulador: {
    chamada: "★ Faça as contas",
    titulo: "Quanto a diária tá te custando?",
    subtitulo: "Coloque o valor da diária de pedreiro na sua região e veja quanto fica na sua obra — e quanto dá pra ganhar fazendo bico.",
    diaria: { rotulo: "Diária de pedreiro na sua região", inicial: 180, minimo: 80, maximo: 500, passo: 10 },
    dias: { rotulo: "Dias de serviço na sua obra", inicial: 10, minimo: 1, maximo: 60, passo: 1 },
    bicos: { rotulo: "Dias de bico por mês (renda extra)", inicial: 4, minimo: 0, maximo: 22, passo: 1 },
    precoCurso: 19,
    aviso: "Simulação feita com os valores que você informou. Não é promessa de ganho: o resultado depende da sua prática e da sua região.",
    botao: "Quero parar de pagar a diária",
  },

  /* ---------- MÓDULOS ---------- */
  modulos: {
    chamada: "★ O que você vai aprender",
    titulo: "10 módulos pra virar sua própria mão de obra",
    itens: [
      { titulo: "A profissão", texto: "O que faz um pedreiro e onde dá pra trabalhar e ganhar com isso." },
      { titulo: "Ferramentas", texto: "Prumo, nível, esquadro, desempenadeira: o que comprar primeiro e pra que serve." },
      { titulo: "Materiais", texto: "Cimento certo pra cada uso, areia, brita e aditivos. Compre certo e não desperdice." },
      { titulo: "Leitura de planta", texto: "Planta baixa, cortes e símbolos. Entenda o projeto antes de gastar um real." },
      { titulo: "Canteiro de obra", texto: "Limpeza do terreno, ligações, tapume com cálculo de material e organização." },
      { titulo: "Depósito de obra", texto: "Barracão de madeirite pra proteger ferramenta e material de chuva e furto." },
      { titulo: "Segurança", texto: "EPIs obrigatórios, NR-18 e como trabalhar sem se machucar (nem perder dias)." },
      { titulo: "Fundações", texto: "Marcação da obra, estaca broca, sapata, radier, baldrame e impermeabilização." },
      { titulo: "Alvenaria", texto: "Esquadro 3-4-5, consumo por m², traço da massa, fiadas, vergas, pilares e laje." },
      { titulo: "Reboco e contrapiso", texto: "Chapisco, emboço e reboco passo a passo. Contrapiso no nível certo." },
    ],
    // etapas da casa que vai sendo construída ao rolar (índice do módulo em que cada uma começa)
    etapas: [
      { aPartirDo: 1, nome: "Planejamento" },
      { aPartirDo: 5, nome: "Canteiro" },
      { aPartirDo: 8, nome: "Fundação" },
      { aPartirDo: 9, nome: "Paredes e laje" },
      { aPartirDo: 10, nome: "Reboco" },
    ],
    dica: "Traços e cálculos de material prontos pra economizar desde a primeira compra",
  },

  /* ---------- SÓ NO COMPLETO (carrossel) ---------- */
  bonus: {
    chamada: "★ Só no plano Completo",
    titulo: "Quer cobrar? Mostre que sabe.",
    subtitulo: "Pra transformar o curso em renda extra, você precisa fazer bem feito e passar confiança. Por só R$9 a mais, você aprende vendo, testa o que sabe e leva um certificado pra mostrar ao cliente.",
    itens: [
      // "rotulo": texto pequeno no topo do card · "icone": video, book, clipboard, award, hardhat, wallet, trend, level, hammer
      { rotulo: "Vídeo", icone: "video", titulo: "Videoaulas", texto: "Veja a técnica sendo feita. Aprende mais rápido e erra menos no primeiro serviço." },
      { rotulo: "PDF", icone: "book", titulo: "Apostila completa", texto: "Os 10 módulos em PDF pra consultar no celular ou levar impresso pra obra." },
      { rotulo: "Prova", icone: "clipboard", titulo: "Prova final", texto: "Teste o que aprendeu antes de pegar o primeiro bico. Pode refazer quantas vezes quiser." },
      { rotulo: "Certificado", icone: "award", titulo: "Certificado digital", texto: "Mostre ao cliente que você estudou. Ajuda a fechar serviço e cobrar com confiança." },
    ],
    botao: "Comparar os planos",
  },

  /* ---------- DEPOIMENTOS ----------
     Desativado: ative (true) quando tiver depoimentos REAIS de alunos
     do curso e troque os exemplos abaixo pelos textos deles. */
  depoimentos: {
    ativo: false,
    chamada: "★ Prova real",
    titulo: "Quem já fez, economizou",
    itens: [
      { estrelas: 5, texto: "Texto do depoimento do aluno.", nome: "Nome S.", cidade: "Cidade, UF", verificado: false },
    ],
  },

  /* ---------- OFERTA / PLANOS ---------- */
  oferta: {
    chamada: "★ O curso se paga no primeiro serviço",
    titulo: "Escolha sua Diária Própria",
    subtitulo: "Quer só economizar na sua obra? Comece pela apostila por R$10. Quer também ganhar com isso? Leve o Completo — videoaulas, apostila, prova e certificado — por R$19.",
    planos: [
      {
        destaque: false,                         // true = card escuro em destaque
        faixa: "",                               // texto da fita (só aparece se preenchido)
        etiqueta: "Diária Própria · Apostila PDF",
        nome: "Essencial",
        descricao: "Pra quem quer economizar na própria obra estudando no seu ritmo, no celular ou impresso.",
        itens: [
          "Apostila completa em PDF (89 páginas)",
          "10 módulos: do canteiro ao reboco",
          "Traços e cálculos de material",
          "Acesso imediato",
          "Garantia de 7 dias",
          "✕ Videoaulas",
          "✕ Prova final",
          "✕ Certificado digital",
        ],
        precoDe: "De R$ 97,00",
        precoChamada: "por apenas",
        preco: "10",                             // só o número (ex.: "10" ou "19,90")
        valor: 10,                               // valor enviado ao pixel da Meta (InitiateCheckout)
        precoNota: "Pagamento único · acesso imediato",
        botao: "Quero economizar por R$10",
        link: "basico",                          // nome do link em "links" lá em cima, ou URL completa
      },
      {
        destaque: true,
        faixa: "Pra quem quer renda extra",
        etiqueta: "Diária Própria · Completo",
        nome: "Completo",
        descricao: "Pra quem quer aprender vendo, testar o conhecimento e ter certificado pra mostrar ao cliente na hora de cobrar.",
        itens: [
          "<strong>Tudo do Essencial</strong>",
          "Videoaulas mostrando a técnica na prática",
          "Apostila completa em PDF (89 páginas)",
          "Prova final pra testar seu conhecimento",
          "Certificado digital pra mostrar aos clientes",
          "Acesso imediato",
          "Garantia de 7 dias",
        ],
        precoDe: "De R$ 197,00",
        precoChamada: "por apenas",
        preco: "19",
        valor: 19,
        precoNota: "Só R$9 a mais — se paga no primeiro bico",
        botao: "Quero o Completo por R$19",
        link: "premium",
      },
    ],
    nota: "<strong>Essencial:</strong> apostila em PDF pra economizar na sua obra. <strong>Completo:</strong> apostila + videoaulas + prova + certificado pra também ganhar dinheiro com isso.",
    selos: [
      { icone: "lock", texto: "Pagamento seguro" },
      { icone: "zap", texto: "Acesso imediato" },
      { icone: "shield", texto: "Garantia de 7 dias" },
    ],
    pessoasVendo: {
      ativo: true,                     // false = esconde o aviso
      inicial: 47, minimo: 31, maximo: 68,
      texto: "pessoas vendo essa página agora",
    },
  },

  /* ---------- GARANTIA ---------- */
  garantia: {
    dias: 7,
    chamada: "★ Risco zero pro seu bolso",
    titulo: "Garantia incondicional de 7 dias",
    texto: "Na crise ninguém pode jogar dinheiro fora — nem R$10. Abra a apostila, assista às aulas e, se em 7 dias achar que não valeu, devolvemos 100% do valor. Sem perguntas.",
    botao: "Quero testar sem risco",
  },

  /* ---------- PERGUNTAS FREQUENTES ---------- */
  faq: {
    chamada: "★ Tire sua dúvida",
    titulo: "Perguntas frequentes",
    itens: [
      { pergunta: "Qual a diferença entre o Essencial e o Completo?", resposta: "O Essencial (R$10) é a apostila completa em PDF, sem videoaulas, prova ou certificado. O Completo (R$19) traz a mesma apostila + videoaulas + prova final + certificado digital." },
      { pergunta: "Nunca mexi com obra. Consigo aprender?", resposta: "Sim. O curso começa do zero: o que faz um pedreiro, quais ferramentas comprar e quais materiais usar, antes de entrar em fundação, parede e reboco." },
      { pergunta: "Vou conseguir fazer tudo sozinho?", resposta: "Serviços como levantar parede, rebocar e fazer contrapiso, sim, com prática. Fundação e laje dependem de projeto de engenheiro — o curso ensina a executar e entender o projeto, não a calcular a estrutura." },
      { pergunta: "Dá mesmo pra ganhar dinheiro com isso?", resposta: "O curso te dá a base técnica pra fazer serviços de pedreiro. Quanto você vai ganhar depende da prática, da sua região e de quantos serviços pegar. O caminho mais comum: comece pela sua casa e depois ofereça pequenos serviços a vizinhos e conhecidos." },
      { pergunta: "Ensina a assentar piso e azulejo?", resposta: "Não é o foco. O curso vai até o contrapiso pronto, a base que recebe o piso. Assentamento de cerâmica é tratado como etapa de acabamento." },
      { pergunta: "Funciona no celular?", resposta: "Sim. A apostila em PDF abre em qualquer celular e pode ser impressa. As videoaulas do Completo funcionam no celular, computador ou TV." },
      { pergunta: "O certificado vale para quê?", resposta: "É um certificado de curso livre, só no plano Completo. Serve para comprovar sua capacitação no currículo e passar confiança aos clientes. Cursos livres não são regulamentados pelo MEC." },
      { pergunta: "Quanto tempo tenho de acesso?", resposta: "Acesso vitalício. Pagou uma vez, é seu. Sem mensalidade." },
      { pergunta: "E se eu não gostar?", resposta: "Você tem 7 dias de garantia incondicional. Peça o reembolso e devolvemos 100% do valor, sem perguntas." },
    ],
  },

  /* ---------- CHAMADA FINAL ---------- */
  final: {
    chamada: "A crise não espera",
    titulo: "Pare de pagar a diária. Comece a cobrar a sua.",
    subtitulo: "R$10 pra economizar na sua obra. R$19 pra economizar e ainda ganhar uma renda extra.",
    botao: "Quero minha Diária Própria",
    rodapeBotao: "Pagamento seguro · Acesso imediato · Garantia de 7 dias",
  },

  /* ---------- RODAPÉ E BOTÃO FIXO (celular) ---------- */
  rodape: {
    marca: "Diária Própria",
    texto: "Todos os direitos reservados",
  },
  botaoFixo: "Diária Própria · a partir de R$10",
};
