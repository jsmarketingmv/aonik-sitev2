"use client";

import { ExpeditionPage, IMG, type Expedition } from "../_shared";

const data: Expedition = {
  slug: "inaugural",
  kicker: "Antártida · Viagem inaugural · dezembro de 2026",
  title: ["Magellan", "Discoverer"],
  subtitleLead: "Dez dias na viagem inaugural do novo navio híbrido da Antarctica21: do Estreito de Magalhães ao",
  subtitle: "coração da Península Antártica. Você entra para a história.",
  price: "a partir de US$ 11.495",
  priceNote: "valores por pessoa em ocupação dupla · viagem inaugural, vagas muito limitadas",
  signature: "air",
  heroImg: IMG.neve,
  stats: [
    { label: "Duração", value: "10d / 9n" },
    { label: "Navio", value: "Discoverer" },
    { label: "Partida", value: "Dez 2026" },
    { label: "A partir de", value: "US$ 11.495" },
  ],
  destaquesTitle: "A maiden voyage de um navio polar híbrido",
  destaques: [
    { num: "01", t: "Viagem inaugural", d: "A primeira jornada antártica do Magellan Discoverer. Estar a bordo é fazer parte da história da navegação polar." },
    { num: "02", t: "Estreito de Magalhães", d: "A rota começa pelas águas históricas de Magalhães e pelo Cabo Froward, o ponto mais ao sul do continente." },
    { num: "03", t: "Glacier Alley", d: "O corredor de geleiras do Canal Beagle, com golfinhos-de-peale brincando na proa." },
    { num: "04", t: "Travessia da Drake", d: "A clássica travessia marítima da Passagem de Drake, a caminho das Shetland do Sul." },
    { num: "05", t: "Península Antártica", d: "Desembarques entre icebergs, colônias de pinguins e baías de gelo intocadas." },
    { num: "06", t: "Tecnologia híbrida", d: "Propulsão diesel-elétrica, varandas privativas e lounge panorâmico. O futuro da expedição polar." },
  ],
  roteiroNote: "Partida única em dezembro de 2026. Navegação de ida pelo sul do Chile e Drake; retorno por voo desde King George Island.",
  roteiro: [
    { d: "01", t: "Punta Arenas", s: "Embarque no Magellan Discoverer. Início da viagem inaugural." },
    { d: "02", t: "Estreito de Magalhães", s: "Cabo Froward e as águas históricas rumo ao Pacífico sul." },
    { d: "03", t: "Glacier Alley · Beagle", s: "Geleiras do Canal Beagle e golfinhos-de-peale." },
    { d: "04", t: "Passagem de Drake", s: "Travessia marítima rumo à Antártida." },
    { d: "05-08", t: "Península Antártica", s: "Quatro dias entre Shetland do Sul, fiordes de gelo e fauna polar." },
    { d: "09", t: "Voo de retorno", s: "Voo de King George Island a Punta Arenas. Noite de hotel." },
    { d: "10", t: "Despedida", s: "Café da manhã e transfer ao aeroporto." },
  ],
  incluso: [
    "Cruzeiro de expedição no novo Magellan Discoverer",
    "Voo de retorno da Antártida ao Chile",
    "Noite de hotel em Punta Arenas (dia 9)",
    "Todas as refeições e bebidas a bordo",
    "Desembarques guiados e excursões de Zodiac",
    "Palestras de especialistas e entretenimento",
    "Empréstimo de botas impermeáveis e taxa IAATO",
    "Transfers de aeroporto",
  ],
  ship: {
    name: "Magellan Discoverer",
    tag: "O novo navio híbrido",
    desc: [
      "Construído sob medida para os air-cruises antárticos, o Magellan Discoverer acomoda 76 hóspedes com propulsão híbrida diesel-elétrica, mais silenciosa e mais limpa para o ambiente polar.",
      "Varandas privativas, lounge panorâmico, sauna, academia e clínica médica a bordo. A engenharia mais avançada da Antarctica21 estreia nesta viagem inaugural.",
    ],
    img: IMG.fiorde,
  },
  saidasSeason: "Partida inaugural · Dezembro de 2026",
  saidasNote: "Uma única partida histórica em dezembro de 2026. As vagas da viagem inaugural são extremamente limitadas.",
  galeria: [
    { src: IMG.neve, cap: "O Magellan Discoverer rumo ao sul", tag: "Inaugural" },
    { src: IMG.fiorde, cap: "Glacier Alley no Canal Beagle", tag: "Beagle" },
    { src: IMG.picos, cap: "Icebergs da Península Antártica", tag: "Gelo" },
    { src: IMG.água, cap: "Golfinhos-de-peale na proa", tag: "Fauna" },
    { src: IMG.montanha, cap: "Cabo Froward no Estreito de Magalhães", tag: "Magalhães" },
    { src: IMG.costa, cap: "Desembarque entre pinguins", tag: "Pinguins" },
    { src: IMG.vale, cap: "Varandas com vista para o gelo", tag: "Navio" },
    { src: IMG.trilha, cap: "Caminhada inaugural sobre a neve", tag: "Trekking" },
  ],
};

export default function InauguralPage() {
  return <ExpeditionPage data={data} />;
}
