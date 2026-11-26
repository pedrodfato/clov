import { whatsapp } from "@/components/contato";
import type { Dicionario } from "./pt";

const en: Dicionario = {
  htmlLang: "en",
  locale: "en-US",
  whatsapp: whatsapp("Hi! I found Clov's website and I'd like to talk about a project."),

  meta: {
    title: "Clov | Websites, custom software and AI for your business",
    description:
      "Clov builds the website, custom software and AI automation your business runs on. A small team, a fixed price, and you see the work as it happens.",
  },

  header: {
    links: [
      { label: "Home", href: "#" },
      { label: "About", href: "#quem-somos" },
      { label: "How it works", href: "#metodologia" },
      { label: "Services", href: "#solucoes" },
      { label: "Projects", href: "/en/projects" },
      { label: "FAQ", href: "#faq" },
    ],
    cta: "Talk to us",
    abrirMenu: "Open menu",
    fecharMenu: "Close menu",
    menu: "Menu",
    trocarIdioma: "Mudar para português",
  },

  hero: {
    etiqueta: "Digital systems studio",
    titulo: "Stop being the bridge between two systems",
    texto: "We connect the tools your company already uses and automate the work that still goes through someone's hands.",
    promessas: ["Free assessment", "Fixed scope", "You follow every step", "30 days of support"],
    cta: "Start a project",
    siga: "Follow",
    role: "Scroll to explore",
  },

  numeros: {
    titulo: ["Clov is new", "The experience behind it isn't"],
    texto:
      "The numbers below belong to the founder and come from before the company existed. Clov is a new home for work he was already doing.",
    legendas: [
      "years building websites, systems and automations",
      "projects built, in Brazil and abroad",
      "lines of code written, and still counting while you read this",
    ],
  },

  letreiro: ["Websites", "Integrations", "Artificial Intelligence"],

  quemSomos: {
    fundo: "Founder",
    etiqueta: "Who we are",
    titulo: ["Who's behind", "Clov?"],
    paragrafos: [
      "I'm Pedro, a developer and the founder of Clov.",
      "For more than 5 years I've built websites, systems and automations for companies in Brazil and abroad. I've worked at an agency and led a team, and I saw up close how a project gets lost when it passes through too many hands.",
      "I started Clov to do the opposite, with technology that stays simple and close to the people who use it.",
    ],
    alt: "Clov's founder",
  },

  diagnostico: {
    titulo: "Before any proposal, an assessment",
    texto:
      "The first conversation is a free assessment that usually takes about 30 minutes. We look at where you are today and work out with you the best way to solve the problem.",
    cta: "Book an assessment",
    palavras: ["Analysis", "Development", "Deploy"],
  },

  comoFunciona: {
    titulo: "How it works",
    subtitulo: "The same four steps on every project.",
    etapa: "Step",
    etapas: [
      { titulo: "Assessment first", texto: "We find what's holding the business back before we propose anything." },
      { titulo: "Fixed scope", texto: "Timeline, price and deliverables are agreed before the first line of code." },
      { titulo: "You follow it closely", texto: "Watch the project take shape and have a say in the decisions at every step." },
      { titulo: "You leave with everything", texto: "Documentation, logins and 30 days of support after delivery." },
    ],
    cartoes: {
      leitura: "Where things stand · example",
      cenario: [
        ["CRM and finance", "not connected"],
        ["Orders", "copied by hand"],
        ["Website", "slow on mobile"],
      ],
      proposta: "Proposal",
      itensProposta: ["Timeline", "Price", "Deliverables"],
      definido: "agreed",
      acompanhamento: "Progress",
      versao: "Clickable version live",
      participa: "You have a say at every step",
      encerramento: "Handover",
      itensEncerramento: ["Documentation", "Logins in your name", "30 days of support"],
    },
  },

  solucoes: {
    titulo: "Three layers of the same system",
    texto: "The work usually starts in one layer, and the problem often turns out to be in the one below it.",
    mensagem: "Hi! I found Clov's website and I'd like to talk about {x}.",
    rotulo: "Talk about {x} on WhatsApp",
    camadas: [
      {
        titulo: "Digital",
        categoria: "what your customer sees",
        texto:
          "The visible layer: your website, your store, the screens your customers click through. Fast, responsive, and laid out to move visitors toward taking action.",
        itens: ["UI/UX design", "Landing pages", "E-commerce", "Company websites", "Performance & SEO"],
      },
      {
        titulo: "Systems",
        categoria: "what keeps operations running",
        texto:
          "We connect the tools you already use, build the internal tools you're missing, and stop people from having to carry data between two systems by hand.",
        itens: ["Integrations & APIs", "Internal tools", "Data migration", "Internal dashboards"],
      },
      {
        titulo: "Intelligence",
        categoria: "what automates and decides",
        texto:
          "Agents and workflows that talk to the tools you already have. They cut rework and shorten the time between information coming in and a decision going out.",
        itens: ["Automations", "Agents & chatbots", "AI workflows", "Automated reports"],
      },
    ],
  },

  projetos: {
    titulo: "Projects",
    subtitulo: "and partnerships",
    arraste: "Drag",
    emDesenvolvimento: "In development",
    projeto: "Project",
    sobre: "About",
    site: "Website",
    alt: "{x} website",
    ver: "View {x}",
    verTodos: "See all projects",
    descricoes: {
      FinalForms: "Platform for schools",
      "IH Roma": "Language school",
      "Dazze Móveis": "Furniture e-commerce",
      "Borba Services": "Roofing, gutters and flooring",
      MedTracker: "Medication reminder app",
      "Marina Alves": "Yoga and pilates studio",
      "Rafael Andrade": "Law firm",
    },
  },

  paginaProjetos: {
    meta: {
      title: "Projects | Clov",
      description:
        "Websites and systems built by Clov. Explore the projects and ask for a quote on a site in the same style or in a brand-new one.",
    },
    titulo: "Projects",
    arraste: "Drag to explore",
    deslize: "Swipe to browse",
    noAr: "Live",
    contagem: "{n} projects · {m} live",
    abrir: "Open",
    abrirX: "Open {x}",
    mapa: "Wall map",
    irPara: "Go to {x}",
    orcamento: "Get a quote",
    vaga: { legenda: "Your site", status: "New style", titulo: "The next one could be yours", texto: "Start a style from scratch", dominio: "yourcompany.com" },
    caso: {
      fechar: "Close",
      anterior: "Previous project",
      proximo: "Next project",
      visitar: "Visit the site",
      novoTitulo: "A new style",
      novoTexto:
        "From scratch, shaped around your company. After the first call we come back with a read on where you stand and a fixed-scope proposal.",
      neste: "This style",
      novo: "New style",
      estilo: "Style",
      tipo: "What kind of site?",
      tipos: [
        { rotulo: "Business website", frase: "a business website" },
        { rotulo: "Online store", frase: "an online store" },
        { rotulo: "Landing page", frase: "a landing page" },
        { rotulo: "System or app", frase: "a system or app" },
      ],
      tipoPadrao: "a website",
      mensagemEstilo: "Hi! I found Clov's projects page and I'd like a quote for {tipo} in the style of the {x} project.",
      mensagemNovo: "Hi! I found Clov's projects page and I'd like a quote for {tipo} with a new style.",
      previa: "The message that goes to WhatsApp",
      cta: "Get a quote on WhatsApp",
      nota: "We reply within 24 hours. The first call is free.",
    },
  },

  contato: {
    titulo: ["Tell us what you need", "We reply within 24 hours"],
    texto:
      "The first conversation usually takes about 30 minutes and costs nothing. Afterwards we come back with our read on what's holding you up and what we would build first. You get a proposal once the goal is clear.",
    cta: "Book an assessment",
  },

  faq: {
    titulo: "Answers to the questions we hear most",
    perguntas: [
      {
        q: "Do we have to hire you for everything at once?",
        a: "No. You can start with whichever layer hurts right now, whether that's the website, an integration or an automation. The architecture is set up so the rest can come in later, when you want it.",
      },
      {
        q: "Why not hire an agency and a developer separately?",
        a: "Because then you end up managing both of them. Here the person who designs it is the person who builds it, so you never sit through a call where each side explains why it's the other one's fault.",
      },
      {
        q: "Will you understand our business?",
        a: "That's the first step, before any proposal. It's also what clients mention most: you explain things once and don't have to repeat yourself.",
      },
      {
        q: "What about the systems we already use?",
        a: "They stay. We almost never start from a blank page. The work is usually connecting or replacing something that's already running and can't stop.",
      },
      {
        q: "What does the first step look like in practice?",
        a: "A free conversation that usually takes about 30 minutes. Afterwards we come back with our read on what's holding you up and what we would build first. You get a proposal once the goal is clear.",
      },
      {
        q: "What happens after you deliver?",
        a: "You keep the documentation, the logins in your name and 30 days of support. After that you can carry on with monthly support if it makes sense for both of us.",
      },
    ],
  },

  rodape: {
    letreiro: ["Let's", "talk"],
    frase: "The digital systems behind growing companies.",
    contato: "Get in touch",
    navegacao: "Navigation",
    tituloContato: "Contact",
    local: "São Paulo, Brazil",
    siga: "Follow",
  },

  naoEncontrada: {
    texto: "We couldn't find the page you were looking for.",
    voltar: "Back to home",
  },
};

export default en;
