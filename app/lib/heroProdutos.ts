// Vitrine do hero da home: 4 produtos em destaque, na ordem do carrossel.
// Cada um tem um par de imagens alinhadas pixel a pixel (public/images/hero):
//   <id>.jpg          paisagem inteira
//   <id>-frente.webp  só o que fica NA FRENTE da palavra gigante (pessoa, placa, montanha)
// Preços, distâncias e durações espelham as páginas de cada produto.
// Para os grupos (grupoId), datas e status vêm ao vivo de useGruposAoVivo.

import type { Lang } from "./i18n";

type T3 = Record<Lang, string>;

export type HeroProduto = {
  id: string;
  href: string;
  /** palavra gigante, em caixa alta, que fica entre a paisagem e a frente */
  palavra: string;
  /** foco da foto (object-position) no desktop e no celular */
  foco: { d: string; m: string };
  formato: T3;
  regiao: T3;
  titulo: string;
  pitch: T3;
  fatos: T3[];
  /** "a partir de" + valor; em produto "em breve" vira a linha de apoio */
  preco: string;
  precoNota?: T3;
  /** selo de destaque (ex.: Em breve) */
  selo?: T3;
  /** produto de grupo: datas e status vêm do catálogo/SaaS */
  grupoId?: string;
  /** texto fixo de saída para produtos que não são grupo */
  saida?: T3;
  /** a rota em etapas, desenhada no card do canto */
  rota: { de: string; para: string; km: string; etapas: number };
  /** índice da categoria do menu da base que acende junto */
  categoria: number;
  cta?: T3;
};

export const HERO_LABELS: Record<Lang, {
  aPartirDe: string; porPessoa: string; verRoteiro: string; especialista: string;
  confirmada: string; formacao: string; aConfirmar: string;
  saida: string; saidas: (n: number) => string; anterior: string; proxima: string; destaque: string;
  aRota: string; etapas: (n: number) => string;
}> = {
  pt: {
    aPartirDe: "a partir de", porPessoa: "por pessoa", verRoteiro: "Ver o roteiro", especialista: "Falar com especialista",
    confirmada: "Saída confirmada", formacao: "Grupo em formação", aConfirmar: "Data a confirmar",
    saida: "Saída 2027", saidas: (n) => `${n} saídas em 2027`, anterior: "Viagem anterior", proxima: "Próxima viagem", destaque: "Viagens em destaque",
    aRota: "A rota", etapas: (n) => `${n} etapas`,
  },
  es: {
    aPartirDe: "desde", porPessoa: "por persona", verRoteiro: "Ver el itinerario", especialista: "Hablar con un experto",
    confirmada: "Salida confirmada", formacao: "Grupo en formación", aConfirmar: "Fecha a confirmar",
    saida: "Salida 2027", saidas: (n) => `${n} salidas en 2027`, anterior: "Viaje anterior", proxima: "Próximo viaje", destaque: "Viajes destacados",
    aRota: "La ruta", etapas: (n) => `${n} etapas`,
  },
  en: {
    aPartirDe: "from", porPessoa: "per person", verRoteiro: "See the itinerary", especialista: "Talk to a specialist",
    confirmada: "Confirmed departure", formacao: "Group forming", aConfirmar: "Date to be confirmed",
    saida: "2027 departure", saidas: (n) => `${n} departures in 2027`, anterior: "Previous trip", proxima: "Next trip", destaque: "Featured trips",
    aRota: "The route", etapas: (n) => `${n} stages`,
  },
};

export const HERO_PRODUTOS: HeroProduto[] = [
  {
    id: "bike",
    href: "/destinos/pedal-porto-lisboa",
    palavra: "ATLÂNTICO",
    foco: { d: "100% 60%", m: "86% 60%" },
    formato: { pt: "Bike autoguiado", es: "Bici autoguiada", en: "Self-guided bike" },
    regiao: { pt: "Costa atlântica de Portugal", es: "Costa atlántica de Portugal", en: "Portugal's Atlantic coast" },
    titulo: "Porto a Lisboa",
    pitch: {
      pt: "Seis etapas de bike entre dunas, lagoas e pinhais, com a bagagem seguindo de pousada em pousada.",
      es: "Seis etapas en bici entre dunas, lagunas y pinares, con el equipaje de posada en posada.",
      en: "Six bike stages through dunes, lagoons and pine forests, with luggage moved inn to inn.",
    },
    fatos: [
      { pt: "8 dias", es: "8 días", en: "8 days" },
      { pt: "306 km", es: "306 km", en: "306 km" },
    ],
    preco: "€ 1.207",
    saida: { pt: "Saídas de sexta a segunda", es: "Salidas de viernes a lunes", en: "Departures Friday to Monday" },
    rota: { de: "Porto", para: "Óbidos", km: "306 km", etapas: 6 },
    categoria: 1,
  },
  {
    id: "douro",
    href: "/caminhos-autoguiados/douro",
    palavra: "DOURO",
    foco: { d: "50% 55%", m: "70% 55%" },
    formato: { pt: "Autoguiado", es: "Autoguiado", en: "Self-guided" },
    regiao: { pt: "Caminhos de Portugal · Vale do Douro", es: "Caminos de Portugal · Valle del Duero", en: "Paths of Portugal · Douro Valley" },
    titulo: "Douro Experience",
    pitch: {
      pt: "Seis dias entre vinhas em socalcos Patrimônio UNESCO, com provas de vinho em três quintas do caminho.",
      es: "Seis días entre viñedos en terrazas Patrimonio UNESCO, con catas en tres quintas del camino.",
      en: "Six days among UNESCO-listed terraced vineyards, with tastings at three quintas along the way.",
    },
    fatos: [
      { pt: "6 dias", es: "6 días", en: "6 days" },
      { pt: "58,7 km", es: "58,7 km", en: "58.7 km" },
    ],
    preco: "€ 1.557",
    saida: { pt: "Ano todo, a partir de 2 pessoas", es: "Todo el año, desde 2 personas", en: "Year-round, from 2 people" },
    rota: { de: "Peso da Régua", para: "Favaios", km: "58,7 km", etapas: 4 },
    categoria: 3,
  },
  {
    id: "dolomitas",
    href: "/destinos/dolomitas-alta-via",
    palavra: "DOLOMITAS",
    foco: { d: "50% 62%", m: "46% 60%" },
    formato: { pt: "Grupo guiado", es: "Grupo guiado", en: "Guided group" },
    regiao: { pt: "Alpes Italianos · Patrimônio UNESCO", es: "Alpes Italianos · Patrimonio UNESCO", en: "Italian Alps · UNESCO site" },
    titulo: "Alta Via 1",
    pitch: {
      pt: "De refúgio em refúgio pelas torres de calcário dos Alpes, com guia brasileiro do início ao fim.",
      es: "De refugio en refugio por las torres de caliza de los Alpes, con guía brasileño de principio a fin.",
      en: "Hut to hut across the limestone towers of the Alps, with a Brazilian guide start to finish.",
    },
    fatos: [
      { pt: "10 dias", es: "10 días", en: "10 days" },
      { pt: "100 km", es: "100 km", en: "100 km" },
    ],
    preco: "€ 5.700",
    grupoId: "dolomitas-alta-via",
    rota: { de: "Lago di Braies", para: "Cortina", km: "100 km", etapas: 8 },
    categoria: 0,
  },
  {
    id: "interior",
    href: "/destinos/caminho-interior-vila-pouca",
    palavra: "SANTIAGO",
    foco: { d: "50% 60%", m: "42% 60%" },
    formato: { pt: "Grupo guiado", es: "Grupo guiado", en: "Guided group" },
    regiao: { pt: "Caminho Português Interior · desde Vila Pouca de Aguiar", es: "Camino Portugués Interior · desde Vila Pouca de Aguiar", en: "Portuguese Interior Way · from Vila Pouca de Aguiar" },
    titulo: "Caminho Interior",
    selo: { pt: "Em breve · Outubro 2027", es: "Próximamente · Octubre 2027", en: "Coming soon · October 2027" },
    pitch: {
      pt: "Doze etapas pelo interior de Portugal e da Galiza até a Catedral de Santiago, longe das multidões.",
      es: "Doce etapas por el interior de Portugal y Galicia hasta la Catedral de Santiago, lejos de las multitudes.",
      en: "Twelve stages through inland Portugal and Galicia to Santiago Cathedral, far from the crowds.",
    },
    fatos: [
      { pt: "13 dias", es: "13 días", en: "13 days" },
      { pt: "252 km", es: "252 km", en: "252 km" },
    ],
    preco: "€ 1.550",
    precoNota: { pt: "autoguiado, o ano todo", es: "autoguiado, todo el año", en: "self-guided, year-round" },
    grupoId: "caminho-interior-vila-pouca",
    rota: { de: "Vila Pouca de Aguiar", para: "Santiago", km: "252 km", etapas: 12 },
    categoria: 2,
    cta: { pt: "Entrar na pré-lista", es: "Entrar en la prelista", en: "Join the waitlist" },
  },
];
