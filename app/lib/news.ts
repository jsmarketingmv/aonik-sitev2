// AONIK News — modelo de dados das edições quinzenais
// Fluxo: briefing → Claude gera blocos → Juliano aprova → push → no ar

export type TipoEdicao = "informativo" | "comercial"

// Bloco editorial
export type BlocoTexto = {
  tipo: "texto"
  titulo?: string
  conteudo: string
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

// Banner central — destaque especial em largura total
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
    titulo: "A temporada começa. E as vagas, também.",
    subtitulo: "TMB com últimas 2 vagas em 2026, Early Booking para 2027, Cochilha Rica e Torres del Paine com condições especiais.",
    data: "2026-07-01",
    tipo: "informativo",
    hero: "/images/tmb/hero.jpg",
    blocos: [
      {
        tipo: "texto",
        titulo: "A News AONIK chegou",
        conteudo:
          "Você faz parte de algo especial. A cada 15 dias, direto no seu WhatsApp: destinos abertos, dicas de temporada, vagas confirmadas e inspiração para a próxima aventura. Sem enrolação, sem filtro. Só o essencial para quem vive o turismo de natureza de verdade. Bem-vindo.",
      },
      {
        tipo: "destaque",
        titulo: "Tour du Mont Blanc 2026 — restam 2 vagas",
        descricao:
          "170 km pelos Alpes Franceses, Italianos e Suíços. O grupo de agosto está confirmado e restam apenas 2 lugares. Guia especialista, tudo incluído, experiência que transforma. Se você ainda está pensando, o momento é esse.",
        href: "/destinos/tour-du-mont-blanc",
        img: "/images/tmb/hero.jpg",
        badge: "ÚLTIMAS 2 VAGAS",
        preco: "a partir de € 5.450",
      },
      {
        tipo: "destaque",
        titulo: "TMB 2027 — pré-reserva aberta com tarifa especial",
        descricao:
          "A janela de reserva antecipada para 2027 está aberta. Garanta seu lugar com as melhores condições do ano antes que o grupo feche. Quem reserva cedo, caminha tranquilo.",
        href: "/destinos/tour-du-mont-blanc",
        img: "/images/grupos/tmb-contemplacao.jpg",
        badge: "PRÉ-RESERVA ABERTA",
        preco: "tarifa especial 2027",
      },
      {
        tipo: "dica",
        icone: "🏔️",
        titulo: "Julho nos Alpes: o que muda quando a neve some",
        texto:
          "Julho abre a temporada nos Alpes. Trilhas liberadas, refúgios abastecidos e dias com até 16 horas de luz. É a janela ideal para o TMB e as Dolomitas. Setembro fica ainda mais silencioso, com menos turistas e os mesmos cenários de outro mundo. Qualquer que seja o mês, os Alpes entregam.",
      },
      {
        tipo: "destaque",
        titulo: "A Patagônia Brasileira existe. Está a 2h de Porto Alegre.",
        descricao:
          "Cochilha Rica é um Brasil que poucas pessoas conhecem. Campos nativos, culinária gaúcha de verdade, silêncio absoluto e natureza que surpreende. Uma caminhada que mistura cultura, paisagem e autoconhecimento. Diferente de tudo que você já fez.",
        href: "/destinos/coxilha-rica",
        img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1400&auto=format&fit=crop",
        badge: "BRASIL NATURAL",
      },
      {
        tipo: "destaque",
        titulo: "Caminho de Santiago — onde cada passo tem sentido",
        descricao:
          "Além das rotas de Portugal, a AONIK opera as rotas espanholas. De Sarria ou de Cebreiro, são cerca de 100 km a pé até Santiago de Compostela. Programa completo, no seu ritmo, com suporte de ponta a ponta. Peregrinação real, sem abrir mão do conforto.",
        href: "/caminhos-autoguiados",
        img: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1200&auto=format&fit=crop",
        badge: "PEREGRINAÇÃO",
        preco: "a partir de € 890",
      },
      {
        tipo: "banner",
        titulo: "Torres del Paine — Early Booking ativo para 2026",
        descricao:
          "4 circuitos W disponíveis. Condições antecipadas: 10% de desconto à vista, 5% OFF parcelado com entrada de 30% + 7x, ou 10x sem juros. Capacidade limitada pelo Parque Nacional. Reserve antes que a janela feche.",
        href: "/destinos/torres-del-paine",
        img: "/images/tmb/hero.jpg",
        badge: "EARLY BOOKING",
        cta: "Garantir minha vaga",
      },
      {
        tipo: "texto",
        titulo: "Quem vai caminhar com você",
        conteudo:
          "A AONIK não é uma agência. É uma ONG que transforma caminhadas em jornadas reais. Nossos guias são apaixonados pela montanha, conhecem cada trilha e cuidam de cada detalhe. Desde 2011, levamos pessoas a experiências que mudam perspectivas. Você não vai sozinho. Vai com quem sabe o caminho.",
      },
      {
        tipo: "destaque",
        titulo: "Canal AONIK no WhatsApp — entre para a conversa",
        descricao:
          "Além da News quinzenal, temos um canal onde compartilhamos bastidores, dicas espontâneas e novidades em tempo real. Uma conversa entre quem ama o turismo de natureza, direta no seu WhatsApp. Toque e siga o canal.",
        href: "https://whatsapp.com/channel/0029Vb8RCc37DAX4Q0AIVP3O",
        img: "/images/grupos/tmb-cume.jpg",
        badge: "NOVO CANAL",
      },
      {
        tipo: "frase",
        texto: "Silêncio, movimento, presença. É isso que a natureza ensina a quem para de correr.",
        local: "Alpes Suíços",
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
