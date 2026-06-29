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
    titulo: "Julho começa com vagas nos Alpes",
    subtitulo: "TMB com grupo confirmado, dica de temporada e o que está em aberto para 2027.",
    data: "2026-07-01",
    tipo: "informativo",
    hero: "/images/tmb/hero.jpg",
    blocos: [
      {
        tipo: "texto",
        titulo: "Estreia da AONIK News",
        conteudo:
          "A cada 15 dias você recebe os destaques dos nossos destinos: novidades, dicas de temporada e vagas disponíveis. Direto ao ponto, sem enrolação.",
      },
      {
        tipo: "destaque",
        titulo: "Tour du Mont Blanc — vagas abertas",
        descricao:
          "170 km pelos Alpes Franceses, Italianos e Suíços. Grupo de agosto/2026 com vagas limitadas, guia especialista e tudo incluído.",
        href: "/destinos/tour-du-mont-blanc",
        img: "/images/tmb/hero.jpg",
        badge: "GRUPO CONFIRMADO",
        preco: "a partir de € 5.450",
      },
      {
        tipo: "dica",
        icone: "🌤️",
        titulo: "Melhor época para os Alpes",
        texto:
          "Julho e agosto têm neve derretida e trilhas abertas. Setembro fica mais tranquilo e os refúgios têm menos lotação, ótimo para quem quer mais silêncio na montanha.",
      },
      {
        tipo: "destaque",
        titulo: "Caminhos de Santiago — saídas o ano todo",
        descricao:
          "Português, Francês, Costa, Primitivo... cada caminho tem uma personalidade diferente. Autoguiado, no seu ritmo.",
        href: "/caminhos-autoguiados",
        img: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1200&auto=format&fit=crop",
        badge: "AUTOGUIADO",
        preco: "a partir de € 890",
      },
      {
        tipo: "frase",
        texto: "A montanha não tem pressa. Mas a vaga sim.",
        local: "Chamonix, França",
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
