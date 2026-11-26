import { whatsapp } from "@/components/contato";

const pt = {
  htmlLang: "pt-BR",
  locale: "pt-BR",
  whatsapp: whatsapp("Olá! Vim pelo site da Clov e gostaria de conversar sobre um projeto."),

  meta: {
    title: "Clov | Site, sistema próprio e IA para o seu negócio",
    description:
      "A Clov cria o site, o sistema próprio e a automação com IA do seu negócio. Time pequeno, preço fechado, acompanhamento de perto.",
  },

  header: {
    links: [
      { label: "Início", href: "#" },
      { label: "Quem somos", href: "#quem-somos" },
      { label: "Como funciona", href: "#metodologia" },
      { label: "Soluções", href: "#solucoes" },
      { label: "Projetos", href: "/projetos" },
      { label: "FAQ", href: "#faq" },
    ],
    cta: "Fale conosco",
    abrirMenu: "Abrir menu",
    fecharMenu: "Fechar menu",
    menu: "Menu",
    // Na língua de destino: é o que a pessoa que precisa trocar consegue ler.
    trocarIdioma: "Switch to English",
  },

  hero: {
    etiqueta: "Estúdio de sistemas digitais",
    titulo: "Pare de ser a ponte entre dois sistemas",
    texto: "A gente conecta o que sua empresa já usa e automatiza o trabalho que hoje passa pela mão de alguém.",
    promessas: ["Diagnóstico sem custo", "Escopo fechado", "Acompanhamento de perto", "30 dias de suporte"],
    cta: "Quero iniciar um projeto",
    siga: "Siga",
    role: "Role para explorar",
  },

  numeros: {
    titulo: ["A Clov é nova", "A experiência por trás não"],
    texto:
      "Os números abaixo são do fundador e vêm de antes da empresa existir. A Clov é o formato novo de um trabalho que já vinha sendo feito.",
    legendas: [
      "anos construindo sites, sistemas e automações",
      "projetos desenvolvidos, no Brasil e fora dele",
      "linhas de código escritas, e contando enquanto você lê isto",
    ],
  },

  letreiro: ["Sites", "Integrações", "Inteligência Artificial"],

  quemSomos: {
    fundo: "Fundador",
    etiqueta: "Quem somos?",
    titulo: ["Quem está por trás da", "Clov?"],
    paragrafos: [
      "Sou Pedro, desenvolvedor e fundador da Clov.",
      "Há mais de 5 anos construo sites, sistemas e automações para empresas no Brasil e no exterior. Passei por agência, liderei equipe e vi de perto como um projeto se perde quando passa por muitas mãos.",
      "Criei a Clov para ser o contrário: tecnologia sem distância nem complicação.",
    ],
    alt: "Fundador da Clov",
  },

  diagnostico: {
    titulo: "Antes de qualquer proposta, um diagnóstico",
    texto:
      "A primeira conversa é um diagnóstico de 30 minutos em média, sem custo. Analisamos o seu cenário e, junto com você, encontramos o melhor caminho para resolver o problema.",
    cta: "Agendar diagnóstico",
    palavras: ["Análise", "Desenvolvimento", "Deploy"],
  },

  comoFunciona: {
    titulo: "Como funciona?",
    subtitulo: "As mesmas quatro etapas em todo projeto.",
    etapa: "Etapa",
    etapas: [
      { titulo: "Diagnóstico primeiro", texto: "A gente acha o que trava o negócio antes de propor qualquer coisa." },
      { titulo: "Escopo fechado", texto: "Prazo, preço e entregas na mesa antes da primeira linha de código." },
      { titulo: "Você acompanha de perto", texto: "Veja o projeto ganhar forma e participe das decisões a cada etapa." },
      { titulo: "Você sai com tudo", texto: "Documentação, acessos e 30 dias de suporte depois da entrega." },
    ],
    cartoes: {
      leitura: "Leitura do cenário · exemplo",
      cenario: [
        ["CRM e financeiro", "sem integração"],
        ["Pedidos", "copiados à mão"],
        ["Site", "lento no celular"],
      ],
      proposta: "Proposta",
      itensProposta: ["Prazo", "Preço", "Entregas"],
      definido: "definido",
      acompanhamento: "Acompanhamento",
      versao: "Versão navegável no ar",
      participa: "Você participa das decisões a cada etapa",
      encerramento: "Encerramento",
      itensEncerramento: ["Documentação", "Acessos no seu nome", "30 dias de suporte"],
    },
  },

  solucoes: {
    titulo: "Três camadas do mesmo sistema",
    texto: "Quase sempre o trabalho começa em uma camada e o problema estava na de baixo.",
    // {x} vira o nome da camada.
    mensagem: "Olá! Vim pelo site da Clov e quero conversar sobre {x}.",
    rotulo: "Conversar sobre {x} no WhatsApp",
    camadas: [
      {
        titulo: "Digital",
        categoria: "o que o cliente vê",
        texto:
          "A camada visível: site, loja, as telas por onde o seu cliente passa. Rápidas, responsivas, com uma estrutura que leva o visitante até a ação.",
        itens: ["Design UI/UX", "Landing Pages", "E-commerce", "Sites institucionais", "Performance & SEO"],
      },
      {
        titulo: "Systems",
        categoria: "o que faz a operação rodar",
        texto:
          "Conectamos o que você já usa, construímos as ferramentas internas que faltam e tiramos as pessoas do meio do caminho entre dois sistemas.",
        itens: ["Integrações & APIs", "Ferramentas internas", "Migração de dados", "Painéis internos"],
      },
      {
        titulo: "Intelligence",
        categoria: "o que automatiza e decide",
        texto:
          "Agentes e fluxos que conversam com as ferramentas que você já tem, cortam retrabalho e encurtam o tempo entre a informação chegar e a decisão sair.",
        itens: ["Automações", "Agentes & chatbots", "Fluxos com IA", "Relatórios automáticos"],
      },
    ],
  },

  projetos: {
    titulo: "Projetos",
    subtitulo: "e parcerias",
    arraste: "Arraste",
    emDesenvolvimento: "Em desenvolvimento",
    projeto: "Projeto",
    sobre: "Sobre",
    site: "Site",
    // {x} vira o nome do projeto.
    alt: "Site da {x}",
    ver: "Ver {x}",
    verTodos: "Ver todos os projetos",
    descricoes: {
      FinalForms: "Plataforma para escolas",
      "IH Roma": "Escola de idiomas",
      "Dazze Móveis": "E-commerce de móveis",
      "Borba Services": "Telhados, calhas e pisos",
      MedTracker: "App de lembretes de remédios",
      "Marina Alves": "Estúdio de yoga e pilates",
      "Rafael Andrade": "Escritório de advocacia",
    } as Record<string, string>,
  },

  paginaProjetos: {
    meta: {
      title: "Projetos | Clov",
      description:
        "Sites e sistemas construídos pela Clov. Explore os projetos e peça um orçamento de um site no mesmo estilo ou com um estilo novo.",
    },
    titulo: "Projetos",
    arraste: "Arraste para explorar",
    deslize: "Deslize para navegar",
    noAr: "No ar",
    // {n} vira o total e {m} os que estão no ar.
    contagem: "{n} projetos · {m} no ar",
    abrir: "Abrir",
    abrirX: "Abrir {x}",
    mapa: "Mapa da parede",
    irPara: "Ir para {x}",
    orcamento: "Pedir orçamento",
    vaga: { legenda: "Seu site", status: "Estilo novo", titulo: "O próximo pode ser o seu", texto: "Comece um estilo do zero", dominio: "suaempresa.com.br" },
    caso: {
      fechar: "Fechar",
      anterior: "Projeto anterior",
      proximo: "Próximo projeto",
      visitar: "Visitar o site",
      novoTitulo: "Um estilo novo",
      novoTexto:
        "Do zero, com a cara da sua empresa. Depois da primeira conversa, a gente volta com uma leitura do cenário e uma proposta de escopo fechado.",
      neste: "Neste estilo",
      novo: "Estilo novo",
      estilo: "Estilo",
      tipo: "Que tipo de site?",
      tipos: [
        { rotulo: "Institucional", frase: "um site institucional" },
        { rotulo: "Loja virtual", frase: "uma loja virtual" },
        { rotulo: "Landing page", frase: "uma landing page" },
        { rotulo: "Sistema ou app", frase: "um sistema ou app" },
      ],
      tipoPadrao: "um site",
      // {tipo} vira a frase do tipo escolhido e {x} o nome do projeto.
      mensagemEstilo: "Olá! Vim pela página de projetos da Clov e quero um orçamento de {tipo} no estilo do projeto {x}.",
      mensagemNovo: "Olá! Vim pela página de projetos da Clov e quero um orçamento de {tipo} com um estilo novo.",
      previa: "A mensagem que vai para o WhatsApp",
      cta: "Pedir orçamento no WhatsApp",
      nota: "Resposta em até 24h. A primeira conversa não custa nada.",
    },
  },

  contato: {
    titulo: ["Conte o que precisa", "A gente responde em até 24h"],
    texto:
      "A primeira conversa dura em média 30 minutos e não custa nada. Depois dela, a gente volta com uma leitura do que está travando e do que construiria primeiro. Proposta só quando o objetivo estiver claro.",
    cta: "Agendar diagnóstico",
  },

  faq: {
    titulo: "Respostas para as perguntas mais frequentes",
    perguntas: [
      {
        q: "Precisamos contratar tudo de uma vez?",
        a: "Não. Dá para começar pela camada que está doendo agora, seja o site, uma integração ou uma automação. A arquitetura já é montada para o resto entrar depois, quando você quiser.",
      },
      {
        q: "Por que não contratar uma agência e um dev separados?",
        a: "Porque aí você vira o gerente de projeto dos dois. Aqui quem desenha é quem constrói, então não existe a conversa em que um lado explica por que a culpa é do outro.",
      },
      {
        q: "Vocês vão entender o nosso negócio?",
        a: "É a primeira etapa, antes de qualquer proposta. E é o que os clientes mais comentam: você explica uma vez e não precisa repetir.",
      },
      {
        q: "E os sistemas que a gente já usa?",
        a: "Continuam. Quase nunca chegamos numa folha em branco, e o trabalho costuma ser integrar ou substituir alguma coisa que está rodando e não pode parar.",
      },
      {
        q: "Como é o primeiro passo, na prática?",
        a: "Uma conversa de 30 minutos em média, sem custo. Depois dela a gente volta com uma leitura do que está travando e do que construiria primeiro. Proposta só quando o objetivo estiver claro.",
      },
      {
        q: "O que acontece depois que vocês entregam?",
        a: "Você fica com a documentação, os acessos no seu nome e 30 dias de suporte. Depois disso dá para seguir com acompanhamento mensal, se fizer sentido para os dois lados.",
      },
    ],
  },

  rodape: {
    // No celular a frase quebra em duas linhas, uma palavra em cada.
    letreiro: ["Vamos", "conversar"],
    frase: "Os sistemas digitais por trás de empresas que estão crescendo.",
    contato: "Entre em contato",
    navegacao: "Navegação",
    tituloContato: "Contato",
    local: "São Paulo, Brasil",
    siga: "Siga",
  },

  naoEncontrada: {
    texto: "Não encontramos a página que você estava procurando.",
    voltar: "Voltar para o início",
  },
};

export default pt;
export type Dicionario = typeof pt;
