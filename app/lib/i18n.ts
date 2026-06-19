// Internacionalização da AONIK V2 — PT (principal), ES, EN.
// Dados estruturais (id, img, href) ficam nos componentes; aqui só TEXTO.

export type Lang = "pt" | "es" | "en";
export const LANGS: Lang[] = ["pt", "es", "en"];

export interface Dict {
  nav: {
    links: string[]; // Caminhadas, Peregrinação, Grupos, Navegação, Hotéis
    login: string;
    loginTitle: string;
    loginAgente: string;
    loginEquipe: string;
    cta: string;
  };
  hero: {
    eyebrow: string;
    line1: string;
    connector: string;
    rotating: string[]; // 6 palavras
    subhead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    categorias: string[]; // 5 (Caminhadas, Tours de Bike, Navegação, Refúgios, Neve)
    soon: string;
  };
  universos: {
    headingPre: string;
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
      cidade: string;
      estado: string;
      mensagem: string;
    };
    ph: {
      nome: string;
      email: string;
      telefone: string;
      cidade: string;
      estado: string;
      mensagem: string;
    };
    selecione: string;
    destinos: string[];
    enviar: string;
    disclaimer: string;
    waIntro: string;
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
      links: ["Caminhadas", "Peregrinação", "Grupos", "Bike", "Navegação", "Hotéis"],
      login: "Login",
      loginTitle: "Acessar o sistema AONIK",
      loginAgente: "Sou agente / operador",
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
        "navegação",
        "refúgio",
        "travessia",
        "jornada",
      ],
      subhead:
        "Caminhadas, bike, navegação e refúgios selecionados para quem viaja atrás de algo que não cabe num roteiro comum.",
      ctaPrimary: "Descubra sua experiência",
      ctaSecondary: "Ver experiências",
      categorias: [
        "Caminhadas",
        "Tours de Bike",
        "Navegação",
        "Refúgios",
        "Grupos",
        "Neve",
      ],
      soon: "Em breve",
    },
    universos: {
      headingPre: "Escolha por onde",
      headingEm: "viver a natureza",
      intro:
        "Não somos só de caminhadas. Somos de turismo de natureza: a pé, de bike, sobre a água ou em um refúgio. Comece por um universo.",
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
        {
          kicker: "Sobre a água",
          nome: "Navegação",
          desc: "Expedições por fiordes, geleiras e canais. A natureza vista da linha-d'água, onde o próprio barco vira refúgio.",
        },
        {
          kicker: "Para ficar",
          nome: "Hotéis",
          desc: "Hotéis e lodges de natureza onde ficar já é o destino. Conforto imerso no silêncio das paisagens mais bonitas do mundo.",
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
        cidade: "Cidade",
        estado: "Estado / País",
        mensagem: "Mensagem",
      },
      ph: {
        nome: "Seu nome",
        email: "seu@email.com",
        telefone: "(11) 99999-9999",
        cidade: "Sua cidade",
        estado: "Ex: SP, Brasil",
        mensagem:
          "Conte sobre o tipo de viagem, datas, número de pessoas…",
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
      disclaimer:
        "Ao enviar, você abre uma conversa direta no WhatsApp com a AONIK.",
      waIntro: "Olá, equipe AONIK! Vim pelo site:",
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
      colExpLinks: ["Caminhadas", "Peregrinação", "Bike", "Navegação", "Hotéis"],
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
      links: ["Caminatas", "Peregrinación", "Grupos", "Bike", "Navegación", "Hoteles"],
      login: "Acceso",
      loginTitle: "Acceder al sistema AONIK",
      loginAgente: "Soy agente / operador",
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
        "navegación",
        "refugio",
        "travesía",
        "jornada",
      ],
      subhead:
        "Caminatas, bici, navegación y refugios seleccionados para quien viaja en busca de algo que no cabe en un itinerario común.",
      ctaPrimary: "Descubre tu experiencia",
      ctaSecondary: "Ver experiencias",
      categorias: [
        "Caminatas",
        "Tours en Bici",
        "Navegación",
        "Refugios",
        "Grupos",
        "Nieve",
      ],
      soon: "Próximamente",
    },
    universos: {
      headingPre: "Elige por dónde",
      headingEm: "vivir la naturaleza",
      intro:
        "No somos solo de caminatas. Somos de turismo de naturaleza: a pie, en bici, sobre el agua o en un refugio. Empieza por un universo.",
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
        {
          kicker: "Sobre el agua",
          nome: "Navegación",
          desc: "Expediciones por fiordos, glaciares y canales. La naturaleza vista desde el agua, donde el propio barco es refugio.",
        },
        {
          kicker: "Para quedarse",
          nome: "Hoteles",
          desc: "Hoteles y lodges de naturaleza donde quedarse ya es el destino. Confort inmerso en el silencio de los paisajes más bellos.",
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
        cidade: "Ciudad",
        estado: "Provincia / País",
        mensagem: "Mensaje",
      },
      ph: {
        nome: "Tu nombre",
        email: "tu@correo.com",
        telefone: "+54 9 11 9999-9999",
        cidade: "Tu ciudad",
        estado: "Ej: Buenos Aires, Argentina",
        mensagem: "Cuéntanos el tipo de viaje, fechas, número de personas…",
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
      disclaimer:
        "Al enviar, abres una conversación directa por WhatsApp con AONIK.",
      waIntro: "¡Hola, equipo AONIK! Vengo desde el sitio:",
    },
    footer: {
      descricao:
        "Experiencias de turismo de naturaleza que transforman la forma de viajar. Trekking, peregrinación e inmersiones genuinas por el mundo.",
      colNav: "Navegación",
      colNavLinks: [
        "Quiénes Somos",
        "Nuestra Historia",
        "Nuestra Pasión",
        "Nuestros Grupos",
      ],
      colExp: "Experiencias",
      colExpLinks: ["Caminatas", "Peregrinación", "Bike", "Navegación", "Hoteles"],
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
      links: ["Hiking", "Pilgrimage", "Groups", "Bike", "Sailing", "Hotels"],
      login: "Login",
      loginTitle: "Access the AONIK system",
      loginAgente: "I'm an agent / operator",
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
        "sailing",
        "a refuge",
        "a crossing",
        "a journey",
      ],
      subhead:
        "Hiking, biking, sailing and nature lodges, curated for travelers chasing something that doesn't fit an ordinary itinerary.",
      ctaPrimary: "Discover Your Experience",
      ctaSecondary: "See experiences",
      categorias: [
        "Hiking",
        "Bike Tours",
        "Sailing",
        "Lodges",
        "Groups",
        "Snow",
      ],
      soon: "Coming soon",
    },
    universos: {
      headingPre: "Choose where to",
      headingEm: "live nature",
      intro:
        "We're not only about hiking. We're about nature travel: on foot, by bike, on the water or in a refuge. Start with one world.",
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
        {
          kicker: "On the water",
          nome: "Sailing",
          desc: "Expeditions through fjords, glaciers and channels. Nature seen from the waterline, where the boat itself becomes a refuge.",
        },
        {
          kicker: "To stay",
          nome: "Hotels",
          desc: "Nature hotels and lodges where staying is already the destination. Comfort immersed in the silence of the world's finest landscapes.",
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
        cidade: "City",
        estado: "State / Country",
        mensagem: "Message",
      },
      ph: {
        nome: "Your name",
        email: "you@email.com",
        telefone: "+1 555 999 9999",
        cidade: "Your city",
        estado: "Ex: CA, USA",
        mensagem: "Tell us the kind of trip, dates, number of people…",
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
      disclaimer:
        "On submit, you open a direct WhatsApp conversation with AONIK.",
      waIntro: "Hello, AONIK team! I came from the website:",
    },
    footer: {
      descricao:
        "Nature travel experiences that transform the way you travel. Trekking, pilgrimage and genuine immersions around the world.",
      colNav: "Navigation",
      colNavLinks: ["About Us", "Our Story", "Our Passion", "Our Groups"],
      colExp: "Experiences",
      colExpLinks: ["Hiking", "Pilgrimage", "Bike", "Sailing", "Hotels"],
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
