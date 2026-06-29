// AONIK News, modelo de dados das edições quinzenais
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
    titulo: "A temporada começou. E as vagas já estão no fim.",
    subtitulo: "Tour du Mont Blanc com as últimas vagas, Early Booking de Torres del Paine no ar e a Patagônia Brasileira que pouca gente conhece.",
    data: "2026-07-01",
    tipo: "informativo",
    hero: "/images/tmb/hero.jpg",
    blocos: [
      {
        tipo: "texto",
        titulo: "A News AONIK chegou",
        conteudo:
          "Você faz parte de algo especial. A cada 15 dias, direto no seu WhatsApp, você recebe o que importa: destinos abertos, dicas de temporada, vagas confirmadas e inspiração para a próxima aventura. Sem enrolação, sem filtro. Só o essencial para quem vive o turismo de natureza de verdade. Seja bem vindo.",
      },
      {
        tipo: "destaque",
        titulo: "Tour du Mont Blanc: restam apenas 2 vagas em 2026",
        descricao:
          "São 170 km pelos Alpes Franceses, Italianos e Suíços. O grupo de agosto está confirmado e sobraram só 2 lugares. Para 2027, a pré-reserva já está aberta com tarifa especial de quem garante cedo. Guia especialista, tudo incluído, uma experiência que transforma. Se você ainda está pensando, o momento é agora.",
        href: "/destinos/tour-du-mont-blanc",
        img: "/images/tmb/hero.jpg",
        badge: "Últimas 2 vagas",
        preco: "a partir de € 5.450",
      },
      {
        tipo: "dica",
        icone: "🏔️",
        titulo: "Julho nos Alpes: o que muda quando a neve some",
        texto:
          "Julho abre a temporada nos Alpes. Trilhas liberadas, refúgios abastecidos e dias com até 16 horas de luz. É a janela ideal para o Tour du Mont Blanc e as Dolomitas. Setembro fica ainda mais silencioso, com menos gente nos caminhos e os mesmos cenários de tirar o fôlego. Qualquer que seja o mês, os Alpes entregam.",
      },
      {
        tipo: "destaque",
        titulo: "A Patagônia Brasileira existe, e poucos conhecem",
        descricao:
          "Coxilha Rica são cinco dias atravessando os campos de altitude da Serra Catarinense, de fazenda em fazenda, pelo mesmo caminho que os tropeiros usaram por séculos. Paredes de pedra centenárias, culinária campeira de verdade, silêncio e horizonte que nunca é o mesmo duas vezes. Um Brasil que ainda existe. Vale a caminhada.",
        href: "/destinos/coxilha-rica",
        img: "https://images.unsplash.com/photo-1444044205806-38f3ed106c10?q=80&w=1400&auto=format&fit=crop",
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
