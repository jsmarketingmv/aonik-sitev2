"use client";

import { ExpeditionPage, IMG, type Expedition } from "../_shared";

const data: Expedition = {
  slug: "falkland-islands",
  kicker: "Ilhas Malvinas · Sea Voyage · sem voo",
  title: ["Falkland", "Islands"],
  subtitleLead: "Dez dias entre as ilhas mais selvagens do Atlântico Sul, com a maior colônia de albatrozes do",
  subtitle: "mundo, praias de pinguins-rei e vilarejos onde o tempo parou.",
  price: "a partir de US$ 6.795",
  priceNote: "valores por pessoa em ocupação dupla · partida em abril de 2028",
  signature: "fjord",
  fjordStops: [
    { x: 250, y: 40, label: "Ushuaia", kind: "ship" },
    { x: 165, y: 160, label: "West Point" },
    { x: 120, y: 265, label: "Steeple Jason" },
    { x: 250, y: 400, label: "Volunteer Pt." },
    { x: 295, y: 470, label: "Port Stanley" },
    { x: 250, y: 545, label: "Bleaker Is." },
  ],
  heroImg: IMG.costa,
  stats: [
    { label: "Duração", value: "10d / 9n" },
    { label: "Hóspedes", value: "76 máx." },
    { label: "Saída", value: "Ushuaia" },
    { label: "A partir de", value: "US$ 6.795" },
  ],
  destaquesTitle: "O arquipélago da fauna sem fim",
  destaques: [
    { num: "01", t: "Steeple Jason", d: "A maior colônia de albatrozes-de-sobrancelha do mundo. Um espetáculo de asas que cobre o horizonte." },
    { num: "02", t: "Volunteer Point", d: "A maior colônia de pinguins-rei das Malvinas, na praia. Encontro de perto, em silêncio." },
    { num: "03", t: "West & Carcass Island", d: "Ilhas sem predadores onde a fauna não teme o homem. Pinguins-gentoo e magalhânicos por toda parte." },
    { num: "04", t: "Port Stanley", d: "A capital do arquipélago: casas coloridas, pubs e a história das ilhas em cada esquina." },
    { num: "05", t: "Fauna em abundância", d: "Pinguins-rockhopper, albatrozes, corvos-marinhos, elefantes-marinhos e leões-marinhos." },
    { num: "06", t: "Roteiro adaptativo", d: "A equipe ajusta a rota conforme o tempo e a vida selvagem, otimizando cada desembarque." },
  ],
  roteiroNote: "Partida em abril de 2028, com saída e retorno em Ushuaia. Itinerário adaptado às condições de tempo e fauna.",
  roteiro: [
    { d: "01", t: "Ushuaia", s: "Embarque no Magellan Explorer rumo ao Atlântico Sul." },
    { d: "02", t: "Navegação", s: "Travessia até o arquipélago das Malvinas." },
    { d: "03", t: "New & Carcass Island", s: "Primeiros desembarques entre pinguins e aves marinhas." },
    { d: "04", t: "Steeple Jason", s: "A maior colônia de albatrozes do planeta." },
    { d: "05", t: "Saunders Island", s: "Praias com quatro espécies de pinguins ao mesmo tempo." },
    { d: "06", t: "Volunteer Point", s: "A grande colônia de pinguins-rei na areia." },
    { d: "07", t: "Port Stanley", s: "A capital colorida e a cultura das ilhas." },
    { d: "08", t: "Bleaker & Pebble Island", s: "Mais fauna e paisagens costeiras dramáticas." },
    { d: "09", t: "West Point Island", s: "Último grande desembarque entre rockhoppers e albatrozes." },
    { d: "10", t: "Ushuaia", s: "Retorno à cidade mais austral do mundo." },
  ],
  incluso: [
    "Cruzeiro de expedição no Magellan Explorer (76 hóspedes)",
    "Informações de pré e pós-viagem",
    "Todas as excursões guiadas em terra e palestras a bordo",
    "Refeições diárias (café e almoço buffet, jantar à la carte)",
    "Bebidas a bordo durante a viagem",
    "Empréstimo de botas impermeáveis para desembarques",
    "Equipe de expedição especializada em fauna",
    "Taxa de passageiro e transfers em grupo",
  ],
  ship: {
    name: "Magellan Explorer",
    tag: "O navio da expedição",
    desc: [
      "Para 76 hóspedes e 60 tripulantes, o Magellan Explorer foi construído sob especificação polar: estável no Atlântico Sul e ágil o suficiente para alcançar as ilhotas mais remotas do arquipélago.",
      "Lounge panorâmico, cabines com vista para o mar e uma equipe que conhece cada colônia de fauna das Malvinas. Conforto de boutique no Atlântico mais selvagem.",
    ],
    img: IMG.fiorde,
  },
  saidasSeason: "Partida em abril de 2028",
  saidasNote: "Partida única em abril de 2028. Vagas limitadas a 76 hóspedes. Combinações com South Georgia e Antártida sob consulta.",
  galeria: [
    { src: IMG.costa, cap: "Colônia de pinguins-rei em Volunteer Point", tag: "Pinguins" },
    { src: IMG.agua, cap: "Albatrozes sobre Steeple Jason", tag: "Albatroz" },
    { src: IMG.picos, cap: "Costa dramática das Malvinas", tag: "Costa" },
    { src: IMG.cabana, cap: "Casas coloridas de Port Stanley", tag: "Stanley" },
    { src: IMG.estrada, cap: "Pradarias varridas pelo vento", tag: "Paisagem" },
    { src: IMG.fiorde, cap: "Desembarque de Zodiac nas ilhotas", tag: "Zodiac" },
    { src: IMG.montanha, cap: "Rockhoppers nas falésias", tag: "Fauna" },
    { src: IMG.vale, cap: "O Magellan Explorer fundeado", tag: "Navio" },
  ],
};

export default function FalklandIslandsPage() {
  return <ExpeditionPage data={data} />;
}
