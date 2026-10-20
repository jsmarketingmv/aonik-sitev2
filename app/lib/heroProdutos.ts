// Vitrine do hero da home: 5 produtos em destaque, na ordem do carrossel.
// Preços, distâncias e durações espelham as páginas de cada produto.
// Para os grupos (grupoId), datas e status vêm ao vivo de useGruposAoVivo.

import type { Lang } from "./i18n";

type T3 = Record<Lang, string>;

export type HeroProduto = {
  id: string;
  href: string;
  img: string;
  /** imagens externas (Wix) já chegam redimensionadas pelo CDN de origem */
  remota?: boolean;
  thumb: string;
  /** posição do foco da foto (object-position) */
  foco?: string;
  /** espelha a foto no fundo, para tirar o assunto de baixo do título */
  espelhar?: boolean;
  formato: T3;
  regiao: T3;
  /** Título em 2 linhas: a de baixo (tituloEm, itálico) precisa ser mais larga que a de cima.
   *  Quando o nome não permite, usar umaLinha. */
  titulo: string;
  tituloEm: string;
  umaLinha?: boolean;
  pitch: T3;
  fatos: T3[];
  preco: string;
  /** produto de grupo: datas e status vêm do catálogo/SaaS */
  grupoId?: string;
  /** texto fixo de saída para produtos que não são grupo */
  saida?: T3;
  /** índice da categoria do menu da base do hero que acende junto */
  categoria: number;
};

export const HERO_LABELS: Record<Lang, {
  aPartirDe: string; porPessoa: string; verRoteiro: string; especialista: string;
  confirmada: string; formacao: string; aConfirmar: string;
  saida: string; saidas: (n: number) => string; anterior: string; proxima: string; destaque: string;
}> = {
  pt: {
    aPartirDe: "a partir de", porPessoa: "por pessoa", verRoteiro: "Ver o roteiro", especialista: "Falar com especialista",
    confirmada: "Saída confirmada", formacao: "Grupo em formação", aConfirmar: "Data a confirmar",
    saida: "Saída 2027", saidas: (n) => `${n} saídas em 2027`, anterior: "Viagem anterior", proxima: "Próxima viagem", destaque: "Viagens em destaque",
  },
  es: {
    aPartirDe: "desde", porPessoa: "por persona", verRoteiro: "Ver el itinerario", especialista: "Hablar con un experto",
    confirmada: "Salida confirmada", formacao: "Grupo en formación", aConfirmar: "Fecha a confirmar",
    saida: "Salida 2027", saidas: (n) => `${n} salidas en 2027`, anterior: "Viaje anterior", proxima: "Próximo viaje", destaque: "Viajes destacados",
  },
  en: {
    aPartirDe: "from", porPessoa: "per person", verRoteiro: "See the itinerary", especialista: "Talk to a specialist",
    confirmada: "Confirmed departure", formacao: "Group forming", aConfirmar: "Date to be confirmed",
    saida: "2027 departure", saidas: (n) => `${n} departures in 2027`, anterior: "Previous trip", proxima: "Next trip", destaque: "Featured trips",
  },
};

const WIX = (id: string, w: number, h: number) =>
  `https://static.wixstatic.com/media/${id}/v1/fill/w_${w},h_${h},al_c,q_80,enc_avif,quality_auto/img.jpg`;

const CATEDRAL = "2d4f5b_6c3f9650f7aa4b80a57246f7ebaf37f2~mv2.jpg"; // Catedral de Santiago (6000px)
const DOURO = "2d4f5b_edfea84f57b54f589aff44727039c42e~mv2.jpg";

export const HERO_PRODUTOS: HeroProduto[] = [
  {
    id: "tmb",
    href: "/destinos/tour-du-mont-blanc",
    img: "/images/tmb/hero.jpg",
    thumb: "/images/tmb/hero.jpg",
    foco: "50% 40%",
    formato: { pt: "Grupo guiado", es: "Grupo guiado", en: "Guided group" },
    regiao: { pt: "Alpes · França, Itália e Suíça", es: "Alpes · Francia, Italia y Suiza", en: "Alps · France, Italy & Switzerland" },
    titulo: "Tour du",
    tituloEm: "Mont Blanc",
    pitch: {
      pt: "A volta completa ao Mont Blanc a pé, cruzando três países em grupo pequeno, com guia brasileiro do início ao fim.",
      es: "La vuelta completa al Mont Blanc a pie, cruzando tres países en grupo pequeño, con guía brasileño de principio a fin.",
      en: "The full loop around Mont Blanc on foot, across three countries in a small group, with a Brazilian guide start to finish.",
    },
    fatos: [
      { pt: "14 dias", es: "14 días", en: "14 days" },
      { pt: "170 km", es: "170 km", en: "170 km" },
    ],
    preco: "€ 5.900",
    grupoId: "tour-du-mont-blanc",
    categoria: 0,
  },
  {
    id: "compostela",
    href: "/destinos/sarria-7-etapas",
    img: WIX(CATEDRAL, 1920, 1080),
    thumb: WIX(CATEDRAL, 420, 560),
    remota: true,
    foco: "50% 35%",
    formato: { pt: "Autoguiado", es: "Autoguiado", en: "Self-guided" },
    regiao: { pt: "Caminho Francês · Sarria a Santiago", es: "Camino Francés · Sarria a Santiago", en: "French Way · Sarria to Santiago" },
    titulo: "Caminho",
    tituloEm: "de Santiago",
    pitch: {
      pt: "Os últimos 112 km do Caminho Francês até a Catedral de Santiago. Hospedagem, bagagem e credencial resolvidas, você só caminha.",
      es: "Los últimos 112 km del Camino Francés hasta la Catedral de Santiago. Alojamiento, equipaje y credencial resueltos, solo caminas.",
      en: "The final 112 km of the French Way to Santiago Cathedral. Lodging, luggage and pilgrim passport sorted, you just walk.",
    },
    fatos: [
      { pt: "7 dias", es: "7 días", en: "7 days" },
      { pt: "112 km", es: "112 km", en: "112 km" },
    ],
    preco: "€ 696",
    saida: { pt: "Saídas o ano todo", es: "Salidas todo el año", en: "Year-round departures" },
    categoria: 2,
  },
  {
    id: "douro",
    href: "/caminhos-autoguiados/douro",
    img: WIX(DOURO, 1920, 1080),
    thumb: WIX(DOURO, 360, 240),
    remota: true,
    foco: "50% 50%",
    formato: { pt: "Autoguiado", es: "Autoguiado", en: "Self-guided" },
    regiao: { pt: "Caminhos de Portugal · Vale do Douro", es: "Caminos de Portugal · Valle del Duero", en: "Paths of Portugal · Douro Valley" },
    titulo: "Douro",
    tituloEm: "Experience",
    pitch: {
      pt: "Seis dias caminhando entre vinhas em socalcos Patrimônio UNESCO, com provas de vinho em três quintas do caminho.",
      es: "Seis días caminando entre viñedos en terrazas Patrimonio UNESCO, con catas de vino en tres quintas del camino.",
      en: "Six days walking UNESCO-listed terraced vineyards, with wine tastings at three quintas along the way.",
    },
    fatos: [
      { pt: "6 dias", es: "6 días", en: "6 days" },
      { pt: "58,7 km", es: "58,7 km", en: "58.7 km" },
    ],
    preco: "€ 1.557",
    saida: { pt: "Ano todo, a partir de 2 pessoas", es: "Todo el año, desde 2 personas", en: "Year-round, from 2 people" },
    categoria: 3,
  },
  {
    id: "torres",
    href: "/destinos/torres-del-paine",
    img: "/torres-del-paine/hero.jpg",
    thumb: "/torres-del-paine/hero.jpg",
    foco: "50% 35%",
    formato: { pt: "4 formatos", es: "4 formatos", en: "4 formats" },
    regiao: { pt: "Patagônia Chilena · Circuito W", es: "Patagonia Chilena · Circuito W", en: "Chilean Patagonia · W Trek" },
    titulo: "Torres",
    tituloEm: "del Paine",
    pitch: {
      pt: "O Circuito W, o trekking mais icônico da Patagônia, do refúgio de montanha ao conforto do Hotel Las Torres.",
      es: "El Circuito W, el trekking más icónico de la Patagonia, del refugio de montaña al confort del Hotel Las Torres.",
      en: "The W Trek, Patagonia's most iconic hike, from mountain refuges to the comfort of Hotel Las Torres.",
    },
    fatos: [
      { pt: "4 a 5 dias", es: "4 a 5 días", en: "4 to 5 days" },
      { pt: "69,5 km", es: "69,5 km", en: "69.5 km" },
    ],
    preco: "US$ 1.657",
    saida: { pt: "Temporada de outubro a abril", es: "Temporada de octubre a abril", en: "Season from October to April" },
    categoria: 0,
  },
  {
    id: "coxilha",
    href: "/destinos/coxilha-rica",
    img: "/images/coxilha-rica/campo-trilha-grupo.jpg",
    thumb: "/images/coxilha-rica/campo-trilha-grupo.jpg",
    foco: "50% 45%",
    espelhar: true,
    formato: { pt: "Grupo guiado", es: "Grupo guiado", en: "Guided group" },
    regiao: { pt: "Serra Catarinense · Brasil", es: "Sierra Catarinense · Brasil", en: "Santa Catarina Highlands · Brazil" },
    titulo: "Coxilha",
    tituloEm: "Rica",
    umaLinha: true,
    pitch: {
      pt: "Cinco dias pelos campos de altitude, de fazenda em fazenda, no caminho dos antigos tropeiros. Aqui no Brasil.",
      es: "Cinco días por los campos de altura, de hacienda en hacienda, por el camino de los antiguos troperos. En Brasil.",
      en: "Five days across highland grasslands, farm to farm, along the old drovers' trail. Right here in Brazil.",
    },
    fatos: [
      { pt: "5 dias", es: "5 días", en: "5 days" },
      { pt: "55,4 km", es: "55,4 km", en: "55.4 km" },
    ],
    preco: "R$ 5.800",
    grupoId: "coxilha-rica",
    categoria: 0,
  },
];
