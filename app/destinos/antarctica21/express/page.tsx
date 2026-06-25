"use client";

import { ExpeditionPage, IMG, type Expedition } from "../_shared";

const data: Expedition = {
  slug: "express",
  kicker: "Antártida · Air-Cruise · saindo de Punta Arenas",
  title: ["Antarctica", "Express"],
  subtitleLead: "Seis dias para cruzar a Passagem de Drake, conhecer o Cabo Horn e desembarcar entre",
  subtitle: "icebergs e colônias de pinguins da Península Antártica.",
  price: "a partir de US$ 4.995",
  priceNote: "valores por pessoa em ocupação dupla · não inclui voos internacionais",
  signature: "air",
  heroImg: IMG.picos,
  stats: [
    { label: "Duração", value: "6d / 5n" },
    { label: "Hóspedes", value: "76 máx." },
    { label: "Saída", value: "Punta Arenas" },
    { label: "A partir de", value: "US$ 4.995" },
  ],
  destaquesTitle: "O caminho mais curto, e mais inteligente, até a Antártida",
  destaques: [
    { num: "01", t: "Voo + navegação", d: "Você voa um trecho sobre a Drake e navega o outro. O melhor dos dois mundos em menos dias." },
    { num: "02", t: "Cabo Horn", d: "O lendário fim do continente, visitado quando o tempo permite. Poucos chegam até aqui." },
    { num: "03", t: "Ilhas Shetland do Sul", d: "Primeiro contato com a Antártida: praias de pedra, focas e o cheiro do gelo." },
    { num: "04", t: "Desembarques em Zodiac", d: "Botes levam você a colônias de pinguins e baías cheias de icebergs azuis." },
    { num: "05", t: "Luz antártica", d: "Dias longuíssimos de verão polar: tempo de sobra para explorar até a noite." },
    { num: "06", t: "Navio boutique", d: "Máximo de 76 hóspedes. Guias especialistas, palestras a bordo e atenção pessoal." },
  ],
  roteiroNote: "Saídas em novembro e março. A ordem voo/navegação se inverte conforme a data; a essência é a mesma.",
  roteiro: [
    { d: "01", t: "Punta Arenas", s: "Chegada, briefing na Explorers House e jantar de boas-vindas." },
    { d: "02", t: "Rumo ao sul", s: "Voo para King George Island ou início da navegação cruzando a Drake." },
    { d: "03", t: "Cabo Horn", s: "O extremo do continente americano, conforme as condições do mar." },
    { d: "04", t: "Shetland do Sul", s: "Primeiros desembarques entre focas e pinguins-de-barbicha." },
    { d: "05", t: "Península Antártica", s: "Baías de gelo, icebergs e navegação entre as muralhas brancas." },
    { d: "06", t: "Retorno a Punta Arenas", s: "Voo de volta ao continente. O fim curto de uma grande história." },
  ],
  incluso: [
    "Cruzeiro de expedição em navio boutique (Explorer ou Discoverer)",
    "Trecho aéreo entre King George Island e Punta Arenas",
    "Uma noite de hotel em Punta Arenas com café da manhã",
    "Todas as refeições e bebidas a bordo (vinho, cerveja e não-alcoólicas)",
    "Todas as excursões guiadas em terra e saídas de Zodiac",
    "Palestras, entretenimento e equipe de expedição",
    "Empréstimo de botas impermeáveis para desembarques",
    "Taxa de passageiro IAATO e transfers em grupo",
  ],
  ship: {
    name: "Magellan Explorer",
    tag: "O navio da expedição",
    desc: [
      "Construído sob especificação polar para 76 hóspedes, o Magellan Explorer foi pensado para o air-cruise: estável, silencioso e íntimo o suficiente para chegar onde os grandes navios não vão.",
      "Lounge panorâmico, cabines com vista para o gelo e uma equipe de expedição que conhece cada baía da Península. Conforto de boutique no continente mais selvagem do planeta.",
    ],
    img: IMG.fiorde,
  },
  saidasSeason: "Temporada 2026 / 2027",
  saidasNote: "Saídas em novembro e março, no início e no fim da temporada antártica. Vagas limitadas a 76 hóspedes por partida.",
  galeria: [
    { src: IMG.picos, cap: "Muralhas de gelo da Península Antártica", tag: "Gelo" },
    { src: IMG.fiorde, cap: "Navegação entre icebergs azuis", tag: "Navegação" },
    { src: IMG.água, cap: "Baía silenciosa ao amanhecer polar", tag: "Baía" },
    { src: IMG.costa, cap: "Desembarque de Zodiac em terra antártica", tag: "Zodiac" },
    { src: IMG.neve, cap: "Campos de neve eterna das Shetland", tag: "Shetland" },
    { src: IMG.montanha, cap: "Picos nevados a pino sobre o canal", tag: "Montanha" },
    { src: IMG.trilha, cap: "Caminhada guiada sobre o gelo", tag: "Trekking" },
    { src: IMG.vale, cap: "O Magellan Explorer ancorado", tag: "Navio" },
  ],
};

export default function ExpressPage() {
  return <ExpeditionPage data={data} />;
}
