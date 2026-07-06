// AONIK News, modelo de dados das edições quinzenais
// Fluxo: briefing → Claude gera blocos → Juliano aprova → push → no ar

export type TipoEdicao = "informativo" | "comercial"

// Bloco editorial
export type BlocoTexto = {
  tipo: "texto"
  titulo?: string
  conteudo: string
  icone?: string
  kicker?: string
}

// Card de destino com link para a página do produto
export type BlocoDestaque = {
  tipo: "destaque"
  titulo: string
  descricao: string
  href: string
  img: string
  badge?: string
  preco?: string
}

// Dica curta com ícone
export type BlocoDica = {
  tipo: "dica"
  icone: string
  titulo: string
  texto: string
}

// Bloco comercial: preço, escassez, urgência
export type BlocoPromo = {
  tipo: "promo"
  titulo: string
  subtitulo?: string
  preco: string
  precoAntes?: string
  validade: string
  vagas?: number
  href: string
  img?: string
  urgencia?: string
}

// Frase de impacto / inspiracional
export type BlocoFrase = {
  tipo: "frase"
  texto: string
  autor?: string
  local?: string
}

// Banner central, destaque especial em largura total
export type BlocoBanner = {
  tipo: "banner"
  titulo: string
  descricao: string
  href: string
  img?: string
  badge?: string
  cta?: string
}

export type Bloco = BlocoTexto | BlocoDestaque | BlocoDica | BlocoPromo | BlocoFrase | BlocoBanner

export type EdicaoNews = {
  slug: string
  numero: number
  titulo: string
  subtitulo: string
  data: string // "YYYY-MM-DD"
  tipo: TipoEdicao
  hero?: string
  blocos: Bloco[]
  cta?: {
    texto: string
    href: string
  }
}

export const EDICOES: EdicaoNews[] = [
  {
    slug: "edicao-01",
    numero: 1,
    titulo: "Site, Reservas Antecipadas, Temporada 2027 de Europa Disponível. News AONIK chegando!",
    subtitulo: "Novo site AONIK com IA no ar, TMB 2027 com condição especial de antecipação e a Patagônia Brasileira que poucos conhecem.",
    data: "2026-07-01",
    tipo: "informativo",
    hero: "/images/tmb/hero.jpg",
    blocos: [
      {
        tipo: "texto",
        titulo: "A News AONIK chegou",
        icone: "newspaper",
        conteudo:
          "Você faz parte de algo especial. A cada semana, traremos a você diversas novidades sobre Turismo de Natureza e as novidades AONIK: destinos abertos, dicas de temporada, características dos destinos, novas ideias de viagem de natureza e vida ao ar livre, promoções e condições especiais, vagas confirmadas e inspiração para a próxima aventura. Sem enrolação, sem filtro. Só o essencial para quem vive o turismo de natureza de verdade. Sejam todos bem-vindos e bem-vindas.",
      },
      {
        tipo: "destaque",
        titulo: "O novo site AONIK chegou com IA aplicada e personalidade própria",
        descricao:
          "Dinâmico, moderno e com inteligência artificial integrada. Cada página tem personalidade e conversa com você de verdade: entende o que você procura, sugere o destino certo e acompanha sua jornada do primeiro clique até a reserva. Um site que pensa junto com você. Explore e descubra o que foi feito para o seu perfil de viajante.",
        href: "https://www.aonik.com.br",
        img: "/images/grupos/dolomitas-cume.jpg",
        badge: "Novidade",
      },
      {
        tipo: "destaque",
        titulo: "Tour du Mont Blanc 2027: reserva antecipada com tarifa especial",
        descricao:
          "A temporada 2026 encerrou com grupo completo. Para 2027, as reservas já estão abertas com condições especiais de antecipação. São 170 km pelos Alpes Franceses, Italianos e Suíços, com guia especialista e tudo incluído. Quem reserva antes garante melhor tarifa e melhor escolha. A fila começa agora.",
        href: "/destinos/tour-du-mont-blanc",
        img: "/images/tmb/hero.jpg",
        badge: "Reserva Antecipada 2027",
        preco: "a partir de € 5.450",
      },
      {
        tipo: "dica",
        icone: "mountain",
        titulo: "Julho nos Alpes: o que muda quando a neve some",
        texto:
          "Julho abre a temporada nos Alpes. Trilhas liberadas, refúgios abastecidos e dias com até 16 horas de luz. É a janela ideal para o Tour du Mont Blanc e as Dolomitas. Setembro fica ainda mais silencioso, com menos gente nos caminhos e os mesmos cenários de tirar o fôlego. Qualquer que seja o mês, os Alpes entregam.",
      },
      {
        tipo: "destaque",
        titulo: "Existe um cantinho no Sul do Brasil, inspirado na essência da Patagônia",
        descricao:
          "Coxilha Rica são cinco dias atravessando os campos de altitude da Serra Catarinense, de fazenda em fazenda, pelo mesmo caminho que os tropeiros usaram por séculos. Paredes de pedra centenárias, culinária campeira de verdade, silêncio e horizonte que nunca é o mesmo duas vezes. Um Brasil que ainda existe. Vale a caminhada.",
        href: "/destinos/coxilha-rica",
        img: "/images/coxilha-rica/campo-trilha-grupo.jpg",
        badge: "Brasil Natural",
        preco: "a partir de R$ 5.800",
      },
      {
        tipo: "destaque",
        titulo: "Caminho de Santiago: onde cada passo tem sentido",
        descricao:
          "Além das rotas de Portugal, a AONIK opera as rotas espanholas. De Sarria, são 112 km a pé até a Catedral de Santiago. Do Cebreiro, 152 km começando no alto da montanha galega. Programa completo, no seu ritmo, com suporte de ponta a ponta. A rota europeia mais antiga ainda em uso, e a sua peregrinação te espera.",
        href: "/jornada",
        img: "https://static.wixstatic.com/media/2d4f5b_6fe79078b70b4c4398bd9e601646fcdd~mv2.jpeg/v1/fill/w_900,h_600,q_90,enc_avif,quality_auto/2d4f5b_6fe79078b70b4c4398bd9e601646fcdd~mv2.jpeg",
        badge: "Peregrinação",
        preco: "a partir de € 580",
      },
      {
        tipo: "banner",
        titulo: "Torres del Paine: Early Booking no ar para 2026",
        descricao:
          "São 4 circuitos W para escolher. Nas condições de reserva antecipada você garante 10% de desconto à vista, ou 5% no parcelado com entrada de 30% mais 7x, ou ainda 10x sem juros. A capacidade do Parque Nacional é limitada por temporada. Reserve antes que a janela feche.",
        href: "/destinos/torres-del-paine",
        img: "/lastorres/IMG_5036.jpeg",
        badge: "Early Booking",
        cta: "Garantir minha vaga",
      },
      {
        tipo: "texto",
        kicker: "Sobre a AONIK",
        titulo: "Quem vai caminhar com você",
        conteudo:
          "A AONIK não é uma agência comum. É uma marca que transforma caminhadas em jornadas de verdade. Nossos guias são apaixonados pela montanha, conhecem cada trilha e cuidam de cada detalhe para que você só se preocupe em viver o momento. Levamos pessoas a experiências que mudam perspectivas. Você não caminha sozinho. Caminha com quem conhece o caminho.",
      },
      {
        tipo: "destaque",
        titulo: "Entre para o Canal AONIK no WhatsApp",
        descricao:
          "Além da News quinzenal, temos um canal onde compartilhamos bastidores, dicas espontâneas e novidades em tempo real. É uma conversa leve entre quem ama o turismo de natureza, direta no seu WhatsApp. Toque, siga o canal e fique por dentro de tudo em primeira mão.",
        href: "https://whatsapp.com/channel/0029Vb8RCc37DAX4Q0AIVP3O",
        img: "/images/grupos/tmb-cume.jpg",
        badge: "Novo Canal",
      },
      {
        tipo: "frase",
        texto: "Caminhar é o remédio mais antigo que existe. Cura o corpo, acalma a mente e devolve a gente para a natureza.",
        local: "Em algum lugar da montanha",
      },
    ],
    cta: {
      texto: "Ver todos os destinos",
      href: "https://www.aonik.com.br",
    },
  },
]

export function getEdicao(slug: string): EdicaoNews | undefined {
  return EDICOES.find((e) => e.slug === slug)
}

export function getEdicoesOrdenadas(): EdicaoNews[] {
  return [...EDICOES].sort(
    (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
  )
}
