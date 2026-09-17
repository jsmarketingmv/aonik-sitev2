// Conteúdo comercial da área B2B (/parceiros). Separado da página de propósito:
// texto de venda muda com frequência e não deveria exigir mexer em layout.

export type PlanoParceria = {
  id: string;
  nome: string;
  destaque: string;
  resumo: string;
  itens: string[];
  /** Quem cuida do dinheiro. É a diferença real entre os dois modelos. */
  financeiro: string;
};

export const PLANOS: PlanoParceria[] = [
  {
    id: "comissionada",
    nome: "Tarifas comissionadas",
    destaque: "10% de comissão",
    resumo:
      "A AONIK cuida do financeiro de ponta a ponta. Você indica, acompanha e recebe.",
    financeiro: "AONIK é responsável pelo financeiro",
    itens: [
      "Recebemos do cliente e repassamos sua comissão já no pagamento da entrada",
      "Concierge para o cliente: gestão da reserva, da viagem e da operação",
      "Participamos das reuniões de briefing pré-viagem junto com o cliente",
      "Kits exclusivos entregues ao cliente, no caso de grupos",
      "Atendimento de suporte disponível",
    ],
  },
  {
    id: "net",
    nome: "Tarifas net",
    destaque: "Tarifa especial",
    resumo:
      "Você recebe a tarifa net, aplica sua própria margem e mantém o cliente na sua casa.",
    financeiro: "Agência é responsável pelo financeiro",
    itens: [
      "Você aplica sua margem e faz a cobrança direta ao cliente",
      "A agência é responsável pelo pagamento à AONIK, como operadora",
      "Prazos variam por produto: 31, 45 ou 65 dias antes da viagem, sempre quitado antes da saída",
      "Concierge para o cliente: gestão da viagem e da operação",
      "Treinamos a sua equipe em cada um dos nossos produtos",
      "Kits exclusivos com autorização da agência, no caso de grupos",
      "Atendimento de suporte disponível",
    ],
  },
];

export type BlocoProduto = {
  id: string;
  eyebrow: string;
  titulo: string;
  texto: string;
  href: string;
  /** Slugs de /destinos que compõem a vitrine do bloco. */
  destinos: { nome: string; href: string; nota: string }[];
};

export const BLOCOS: BlocoProduto[] = [
  {
    id: "grupos",
    eyebrow: "O carro-chefe",
    titulo: "Viagens em grupo",
    texto:
      "Saídas com data marcada, guia AONIK e grupo pequeno. É o produto mais fácil de vender, porque o cliente escolhe uma data e o resto já está resolvido.",
    href: "/grupos",
    destinos: [],
  },
  {
    id: "santiago",
    eyebrow: "Peregrinação",
    titulo: "Caminho de Santiago",
    texto:
      "Todos os caminhos clássicos, autoguiados, com bagagem transportada e hospedagem selecionada. Sai o ano inteiro e atende desde quem quer 7 dias até quem vai até Finisterre.",
    href: "/jornada",
    destinos: [
      { nome: "Sarria · 7 etapas", href: "/destinos/sarria-7-etapas", nota: "o mais procurado" },
      { nome: "Sarria · 8 etapas", href: "/destinos/sarria-8-etapas", nota: "com folga no roteiro" },
      { nome: "Santiago a Finisterre", href: "/destinos/santiago-finisterre", nota: "o fim do mundo" },
      { nome: "Caminho Primitivo", href: "/destinos/caminho-primitivo", nota: "o mais antigo" },
      { nome: "Caminho de O Cebreiro", href: "/destinos/caminho-cebreiro", nota: "a entrada na Galícia" },
    ],
  },
  {
    id: "portugal",
    eyebrow: "Portugal",
    titulo: "Caminhos Portugueses",
    texto:
      "A rota portuguesa em todas as suas variações, a pé ou de bike. Menos massificada que o Francês e muito procurada por quem já fez Santiago uma vez.",
    href: "/caminhos-autoguiados",
    destinos: [
      { nome: "Caminho Central a pé", href: "/destinos/caminho-central-ape", nota: "o clássico português" },
      { nome: "Caminho da Costa a pé", href: "/destinos/caminho-costa-ape", nota: "beira-mar" },
      { nome: "Caminho Easy", href: "/destinos/caminho-easy-ape", nota: "etapas mais curtas" },
      { nome: "De Valença", href: "/destinos/caminho-valenca-ape", nota: "partida na fronteira" },
      { nome: "De Baiona", href: "/destinos/caminho-baiona-ape", nota: "variante litoral" },
      { nome: "Porto a Lisboa de bike", href: "/destinos/pedal-porto-lisboa", nota: "cicloturismo" },
    ],
  },
  {
    id: "patagonia",
    eyebrow: "Patagônia",
    titulo: "Torres del Paine",
    texto:
      "Nossa especialidade mais antiga. Circuito W em quatro formatos, do camping ao refúgio com conforto, mais o Circuito O completo em grupo guiado.",
    href: "/destinos/torres-del-paine",
    destinos: [
      { nome: "Circuito W · Tradicional", href: "/destinos/torres-del-paine", nota: "refúgios" },
      { nome: "Circuito W · Express", href: "/destinos/torres-del-paine", nota: "roteiro enxuto" },
      { nome: "Circuito W · Plus", href: "/destinos/torres-del-paine", nota: "mais conforto" },
      { nome: "Circuito W · Journey", href: "/destinos/torres-del-paine", nota: "a versão completa" },
      { nome: "Circuito O", href: "/destinos/torres-del-paine-o-circuit", nota: "grupo guiado, 8 dias" },
      { nome: "Hotel Las Torres", href: "/destinos/hotel-las-torres", nota: "hotelaria no parque" },
    ],
  },
];
