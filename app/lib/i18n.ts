// Internacionalização da AONIK V2 — PT (principal), ES, EN.
// Dados estruturais (id, img, href) ficam nos componentes; aqui só TEXTO.

export type Lang = "pt" | "es" | "en";
export const LANGS: Lang[] = ["pt", "es", "en"];

export interface Dict {
  nav: {
    links: string[]; // Caminhadas, Peregrinação, Grupos, Bike
    login: string;
    loginTitle: string;
    loginAgente: string;
    paraAgencias: string;
    loginEquipe: string;
    cta: string;
  };
  hero: {
    eyebrow: string;
    line1: string;
    connector: string;
    rotating: string[]; // 3 palavras (caminhada, pedalada, peregrinação)
    portugal: { line1: string; em: string }; // 4º slide, headline própria
    subhead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    categorias: string[]; // 4 (Caminhadas, Tours de Bike, Peregrinação, Portugal)
    soon: string;
  };
  universos: {
    headingPre: string; // 1ª linha
    headingPost: string; // 2ª linha, antes do trecho em destaque
    headingEm: string;
    intro: string;
    segmentos: { kicker: string; nome: string; desc: string }[];
    explorar: string;
    portaisLabel: string;
    portais: { chamada: string; titulo: string; desc: string }[];
    explorarDestinos: string;
  };
  contato: {
    eyebrow: string;
    headPre: string;
    headWord: string;
    headPost: string;
    intro: string;
    f: {
      nome: string;
      interesse: string;
      email: string;
      telefone: string;
      mensagem: string;
    };
    ph: {
      nome: string;
      email: string;
      telefone: string;
      mensagem: string;
    };
    selecione: string;
    destinos: string[];
    enviar: string;
    enviando: string;
    disclaimer: string;
    waIntro: string;
    okTitle: string;
    okMsg: string;
    okWaCta: string;
    okAte: string;
    erro: string;
  };
  footer: {
    descricao: string;
    colNav: string;
    colNavLinks: string[];
    colExp: string;
    colExpLinks: string[];
    contato: string;
    copyright: string;
    tagline: string;
  };
  floating: { balloon: string; falarAgora: string };
}

export const translations: Record<Lang, Dict> = {
  pt: {
    nav: {
      links: ["Caminhadas", "Peregrinação", "Grupos", "Bike"],
      login: "Login",
      loginTitle: "Acessar o sistema AONIK",
      loginAgente: "Sou agente / operador",
      paraAgencias: "Para agências",
      loginEquipe: "Sou equipe AONIK",
      cta: "Falar com especialista",
    },
    hero: {
      eyebrow: "Turismo de Natureza",
      line1: "Viva a natureza",
      connector: "em forma de",
      rotating: [
        "caminhada",
        "pedalada",
        "peregrinação",
      ],
      portugal: { line1: "Descubra os", em: "Caminhos de Portugal" },
      subhead:
        "Caminhadas, bike e peregrinações selecionadas para quem viaja atrás de algo que não cabe num roteiro comum.",
      ctaPrimary: "Descubra sua experiência",
      ctaSecondary: "Ver experiências",
      categorias: [
        "Caminhadas",
        "Tours de Bike",
        "Peregrinação",
        "Portugal",
      ],
      soon: "Em breve",
    },
    universos: {
      headingPre: "Escolha por qual caminho",
      headingPost: "quer",
      headingEm: "descobrir o mundo",
      intro:
        "Nossa essência é caminhar: na montanha, na trilha, na peregrinação. E muitos dos caminhos que percorremos a pé também se fazem sobre duas rodas, no seu ritmo, com a mesma paisagem passando devagar.",
      segmentos: [
        {
          kicker: "A pé",
          nome: "Caminhadas",
          desc: "Travessias, trekkings e peregrinações a pé. O ritmo lento que revela o que a pressa esconde, das Dolomitas aos Andes.",
        },
        {
          kicker: "Sobre duas rodas",
          nome: "Tours de Bike",
          desc: "Cicloturismo por estradas e trilhas que ligam vilarejos, vinhas e paisagens vivas, no seu tempo, no seu ritmo.",
        },
      ],
      explorar: "Explorar",
      portaisLabel: "Portais especiais",
      portais: [
        {
          chamada: "Saídas guiadas pelo mundo",
          titulo: "Grupos",
          desc: "Dolomitas, Tour du Mont Blanc, Torres del Paine e mais. Em grupo, com a curadoria e a liderança AONIK do início ao fim.",
        },
        {
          chamada: "Peregrinação & autoconhecimento",
          titulo: "Jornada",
          desc: "Os Caminhos de Santiago e outras travessias que são tanto sobre o trajeto quanto sobre quem volta delas.",
        },
      ],
      explorarDestinos: "Explorar destinos",
    },
    contato: {
      eyebrow: "Fale com um especialista",
      headPre: "Quer viver uma",
      headWord: "aventura",
      headPost: "?",
      intro:
        "Conte pra gente o que você procura. Nossa equipe responde pessoalmente para desenhar a viagem do seu jeito.",
      f: {
        nome: "Nome completo",
        interesse: "Interesse",
        email: "E-mail",
        telefone: "Telefone / WhatsApp",
        mensagem: "Mensagem",
      },
      ph: {
        nome: "Seu nome",
        email: "seu@email.com",
        telefone: "(11) 99999-9999",
        mensagem:
          "Deixe aqui sua dúvida, solicitação ou deixe algumas informações sobre o período desejado, número de pessoas ou o comentário desejado.",
      },
      selecione: "Selecione…",
      destinos: [
        "Caminhadas",
        "Tours de Bike",
        "Navegação",
        "Refúgios",
        "Grupos (Dolomitas, Tour du Mont Blanc, Torres del Paine…)",
        "Jornada (Caminhos de Santiago)",
        "Ainda não sei, me ajudem a escolher",
      ],
      enviar: "Quero viajar",
      enviando: "Enviando…",
      disclaimer:
        "Seus dados ficam só com a AONIK. Retornamos em até um dia útil.",
      waIntro: "Olá, equipe AONIK! Vim pelo site:",
      okTitle: "Recebemos o seu contato!",
      okMsg:
        "Sua solicitação já está com a nossa equipe. Em breve um especialista AONIK fará contato com você para sanar suas dúvidas e desenhar uma experiência exclusiva.",
      okWaCta: "Quer antecipar alguma informação ou dúvida? Chame nosso time pelo WhatsApp:",
      okAte: "Até breve!",
      erro: "Algo não saiu como esperado. Tente de novo em instantes.",
    },
    footer: {
      descricao:
        "Experiências de turismo de natureza que transformam a forma de viajar. Trekking, peregrinação e imersões genuínas pelo mundo.",
      colNav: "Navegação",
      colNavLinks: [
        "Quem Somos",
        "Nossa História",
        "Nossa Paixão",
        "Nossos Grupos",
      ],
      colExp: "Experiências",
      colExpLinks: ["Caminhadas", "Peregrinação", "Bike"],
      contato: "Contato",
      copyright: "Turismo de Natureza. Todos os direitos reservados.",
      tagline: "Feito para quem busca o mundo natural",
    },
    floating: {
      balloon:
        "Em breve eu respondo aqui sobre cada destino, datas e valores. Já te conecto com um especialista. 🌿",
      falarAgora: "Falar agora",
    },
  },

  es: {
    nav: {
      links: ["Caminatas", "Peregrinación", "Grupos", "Bike"],
      login: "Acceso",
      loginTitle: "Acceder al sistema AONIK",
      loginAgente: "Soy agente / operador",
      paraAgencias: "Para agencias",
      loginEquipe: "Soy equipo AONIK",
      cta: "Hablar con un experto",
    },
    hero: {
      eyebrow: "Turismo de Naturaleza",
      line1: "Vive la naturaleza",
      connector: "en forma de",
      rotating: [
        "caminata",
        "pedaleo",
        "peregrinación",
      ],
      portugal: { line1: "Descubre los", em: "Caminos de Portugal" },
      subhead:
        "Caminatas, bici y peregrinaciones seleccionadas para quien viaja en busca de algo que no cabe en un itinerario común.",
      ctaPrimary: "Descubre tu experiência",
      ctaSecondary: "Ver experiências",
      categorias: [
        "Caminatas",
        "Tours en Bici",
        "Peregrinación",
        "Portugal",
      ],
      soon: "Próximamente",
    },
    universos: {
      headingPre: "Elige por qué camino",
      headingPost: "quieres",
      headingEm: "descubrir el mundo",
      intro:
        "Nuestra esencia es caminar: en la montaña, en el sendero, en la peregrinación. Y muchos de los caminos que recorremos a pie también se hacen sobre dos ruedas, a tu ritmo, con el mismo paisaje pasando despacio.",
      segmentos: [
        {
          kicker: "A pie",
          nome: "Caminatas",
          desc: "Travesías, trekkings y peregrinaciones a pie. El ritmo lento que revela lo que la prisa esconde, de los Dolomitas a los Andes.",
        },
        {
          kicker: "Sobre dos ruedas",
          nome: "Tours en Bici",
          desc: "Cicloturismo por rutas y senderos que unen pueblos, viñedos y paisajes vivos, a tu tiempo, a tu ritmo.",
        },
      ],
      explorar: "Explorar",
      portaisLabel: "Portales especiales",
      portais: [
        {
          chamada: "Salidas guiadas por el mundo",
          titulo: "Grupos",
          desc: "Dolomitas, Tour du Mont Blanc, Torres del Paine y más. En grupo, con la curaduría y el liderazgo AONIK de principio a fin.",
        },
        {
          chamada: "Peregrinación y autoconocimiento",
          titulo: "Jornada",
          desc: "Los Caminos de Santiago y otras travesías que son tanto sobre el trayecto como sobre quien vuelve de ellas.",
        },
      ],
      explorarDestinos: "Explorar destinos",
    },
    contato: {
      eyebrow: "Habla con un experto",
      headPre: "¿Quieres vivir una",
      headWord: "aventura",
      headPost: "?",
      intro:
        "Cuéntanos qué buscas. Nuestro equipo responde personalmente para diseñar el viaje a tu medida.",
      f: {
        nome: "Nombre completo",
        interesse: "Interés",
        email: "Correo",
        telefone: "Teléfono / WhatsApp",
        mensagem: "Mensaje",
      },
      ph: {
        nome: "Tu nombre",
        email: "tu@correo.com",
        telefone: "+54 9 11 9999-9999",
        mensagem: "Deja aquí tu duda, solicitud o información sobre el período deseado, número de personas o el comentario que desees.",
      },
      selecione: "Selecciona…",
      destinos: [
        "Caminatas",
        "Tours en Bici",
        "Navegación",
        "Refugios",
        "Grupos (Dolomitas, Tour du Mont Blanc, Torres del Paine…)",
        "Jornada (Caminos de Santiago)",
        "Aún no lo sé, ayúdenme a elegir",
      ],
      enviar: "Quiero viajar",
      enviando: "Enviando…",
      disclaimer:
        "Tus datos quedan solo con AONIK. Respondemos en un día hábil.",
      waIntro: "¡Hola, equipo AONIK! Vengo desde el sitio:",
      okTitle: "¡Recibimos tu contacto!",
      okMsg:
        "Tu solicitud ya está con nuestro equipo. Pronto un especialista AONIK se pondrá en contacto contigo para responder tus dudas y diseñar una experiencia exclusiva.",
      okWaCta: "¿Quieres adelantar alguna información o duda? Habla con nuestro equipo por WhatsApp:",
      okAte: "¡Hasta pronto!",
      erro: "Algo no salió como esperábamos. Inténtalo de nuevo en un momento.",
    },
    footer: {
      descricao:
        "Experiências de turismo de naturaleza que transforman la forma de viajar. Trekking, peregrinación e inmersiones genuinas por el mundo.",
      colNav: "Navegación",
      colNavLinks: [
        "Quiénes Somos",
        "Nuestra Historia",
        "Nuestra Pasión",
        "Nuestros Grupos",
      ],
      colExp: "Experiências",
      colExpLinks: ["Caminatas", "Peregrinación", "Bike"],
      contato: "Contacto",
      copyright: "Turismo de Naturaleza. Todos los derechos reservados.",
      tagline: "Hecho para quien busca el mundo natural",
    },
    floating: {
      balloon:
        "Pronto responderé aquí sobre cada destino, fechas y precios. Ya te conecto con un experto. 🌿",
      falarAgora: "Hablar ahora",
    },
  },

  en: {
    nav: {
      links: ["Hiking", "Pilgrimage", "Groups", "Bike"],
      login: "Login",
      loginTitle: "Access the AONIK system",
      loginAgente: "I'm an agent / operator",
      paraAgencias: "For agencies",
      loginEquipe: "I'm AONIK team",
      cta: "Talk to a specialist",
    },
    hero: {
      eyebrow: "Nature Travel",
      line1: "Live nature",
      connector: "in the form of",
      rotating: [
        "a hike",
        "a ride",
        "a pilgrimage",
      ],
      portugal: { line1: "Discover the", em: "Paths of Portugal" },
      subhead:
        "Hiking, biking and pilgrimages, curated for travelers chasing something that doesn't fit an ordinary itinerary.",
      ctaPrimary: "Discover Your Experience",
      ctaSecondary: "See experiences",
      categorias: [
        "Hiking",
        "Bike Tours",
        "Pilgrimage",
        "Portugal",
      ],
      soon: "Coming soon",
    },
    universos: {
      headingPre: "Choose the path",
      headingPost: "to",
      headingEm: "discover the world",
      intro:
        "Walking is our essence: on the mountain, on the trail, on pilgrimage. And many of the paths we walk can also be ridden on two wheels, at your own pace, with the same landscape drifting slowly by.",
      segmentos: [
        {
          kicker: "On foot",
          nome: "Hiking",
          desc: "Treks, thru-hikes and pilgrimages on foot. The slow pace that reveals what haste hides, from the Dolomites to the Andes.",
        },
        {
          kicker: "On two wheels",
          nome: "Bike Tours",
          desc: "Cycle touring along roads and trails linking villages, vineyards and living landscapes, at your own pace.",
        },
      ],
      explorar: "Explore",
      portaisLabel: "Special gateways",
      portais: [
        {
          chamada: "Guided departures worldwide",
          titulo: "Groups",
          desc: "Dolomites, Tour du Mont Blanc, Torres del Paine and more. In a group, with AONIK's curation and leadership from start to finish.",
        },
        {
          chamada: "Pilgrimage & self-discovery",
          titulo: "Journey",
          desc: "The Caminos de Santiago and other crossings that are as much about the path as about who returns from them.",
        },
      ],
      explorarDestinos: "Explore destinations",
    },
    contato: {
      eyebrow: "Talk to a specialist",
      headPre: "Want to live an",
      headWord: "adventure",
      headPost: "?",
      intro:
        "Tell us what you're looking for. Our team replies personally to design the trip your way.",
      f: {
        nome: "Full name",
        interesse: "Interest",
        email: "Email",
        telefone: "Phone / WhatsApp",
        mensagem: "Message",
      },
      ph: {
        nome: "Your name",
        email: "you@email.com",
        telefone: "+1 555 999 9999",
        mensagem: "Leave your question, request, or some details about your desired travel period, number of people, or any other comment.",
      },
      selecione: "Select…",
      destinos: [
        "Hiking",
        "Bike Tours",
        "Sailing",
        "Lodges",
        "Groups (Dolomites, Tour du Mont Blanc, Torres del Paine…)",
        "Journey (Caminos de Santiago)",
        "Not sure yet, help me choose",
      ],
      enviar: "I want to travel",
      enviando: "Sending…",
      disclaimer:
        "Your details stay with AONIK only. We reply within one business day.",
      waIntro: "Hello, AONIK team! I came from the website:",
      okTitle: "We got your message!",
      okMsg:
        "Your request is already with our team. An AONIK specialist will reach out soon to answer your questions and craft an exclusive experience for you.",
      okWaCta: "Want to share something in advance? Reach our team on WhatsApp:",
      okAte: "See you soon!",
      erro: "Something went wrong. Please try again in a moment.",
    },
    footer: {
      descricao:
        "Nature travel experiences that transform the way you travel. Trekking, pilgrimage and genuine immersions around the world.",
      colNav: "Navigation",
      colNavLinks: ["About Us", "Our Story", "Our Passion", "Our Groups"],
      colExp: "Experiences",
      colExpLinks: ["Hiking", "Pilgrimage", "Bike"],
      contato: "Contact",
      copyright: "Nature Travel. All rights reserved.",
      tagline: "Made for those who seek the natural world",
    },
    floating: {
      balloon:
        "Soon I'll answer here about every destination, dates and prices. I'll connect you with a specialist. 🌿",
      falarAgora: "Talk now",
    },
  },
};
