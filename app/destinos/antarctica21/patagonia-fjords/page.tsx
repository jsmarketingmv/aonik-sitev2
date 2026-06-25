"use client";

import { ExpeditionPage, IMG, type Expedition } from "../_shared";

const data: Expedition = {
  slug: "patagonia-fjords",
  kicker: "Patagônia Chilena · Sea Voyage · sem voo",
  title: ["Patagônia &", "Chilean Fjords"],
  subtitleLead: "Nove dias de navegação pura entre Puerto Montt e Ushuaia, deslizando por geleiras azuis e os",
  subtitle: "picos afiados dos Andes patagônicos no fim do mundo.",
  price: "a partir de US$ 5.995",
  priceNote: "valores por pessoa em ocupação dupla · 9d/8n (11d/10n na temporada 2027-28)",
  signature: "fjord",
  fjordStops: [
    { x: 250, y: 40, label: "Puerto Montt", kind: "ship" },
    { x: 165, y: 160, label: "Golfo Corcovado" },
    { x: 120, y: 265, label: "San Rafael", kind: "glacier" },
    { x: 250, y: 400, label: "Caleta Tortel" },
    { x: 295, y: 470, label: "Glaciar Pío XI", kind: "glacier" },
    { x: 250, y: 545, label: "Ushuaia" },
  ],
  heroImg: IMG.fiorde,
  stats: [
    { label: "Duração", value: "9d / 8n" },
    { label: "Hóspedes", value: "76 máx." },
    { label: "Rota", value: "Montt ↔ Ushuaia" },
    { label: "A partir de", value: "US$ 5.995" },
  ],
  destaquesTitle: "Os fiordes que só o mar revela",
  destaques: [
    { num: "01", t: "Glaciar San Rafael", d: "Uma das geleiras mais espetaculares do Campo de Gelo Norte, alcançada de Zodiac entre blocos de gelo." },
    { num: "02", t: "Glaciar Pío XI", d: "A maior geleira do hemisfério sul fora da Antártida. Uma muralha viva de gelo que avança sobre o mar." },
    { num: "03", t: "Caleta Tortel", d: "Vila de palafitas e passarelas de cipreste, sem ruas, encravada entre dois campos de gelo." },
    { num: "04", t: "Canais e fiordes", d: "Puyuhuapi, Moraleda e o Estreito de Magalhães: um labirinto de água doce e salgada entre os Andes." },
    { num: "05", t: "Fauna patagônica", d: "Pinguins, leões-marinhos, golfinhos e condores sobre as montanhas." },
    { num: "06", t: "Navio de expedição", d: "76 hóspedes, equipe especialista e Zodiacs prontos para cada baía escondida." },
  ],
  roteiroNote: "Saídas em setembro e abril, no início e no fim da temporada. Sentido pode ser sul-norte ou norte-sul.",
  roteiro: [
    { d: "01", t: "Puerto Montt", s: "Embarque e início da navegação rumo ao sul pelos canais." },
    { d: "02", t: "Golfo de Corcovado", s: "Águas largas, fauna e o começo do labirinto de fiordes." },
    { d: "03", t: "Canal Puyuhuapi", s: "Selva valdiviana descendo até a água nos canais mais estreitos." },
    { d: "04", t: "Glaciar San Rafael", s: "Zodiac a poucos metros do gelo do Campo de Gelo Norte." },
    { d: "05", t: "Caleta Tortel", s: "A vila de passarelas de cipreste entre os dois campos de gelo." },
    { d: "06", t: "Glaciar Pío XI", s: "A muralha de gelo mais larga do hemisfério sul." },
    { d: "07", t: "Estreito de Magalhães", s: "As águas históricas rumo à Terra do Fogo." },
    { d: "08", t: "Canal Beagle · Glacier Alley", s: "O corredor de geleiras antes da chegada." },
    { d: "09", t: "Ushuaia", s: "Desembarque na cidade mais austral do mundo." },
  ],
  incluso: [
    "Cruzeiro de expedição em navio boutique (Explorer ou Discoverer)",
    "Refeições diárias (café e almoço buffet, jantar à la carte)",
    "Bebidas a bordo: vinho, cerveja, refrigerantes, café e chá",
    "Todas as excursões guiadas em terra e palestras",
    "Empréstimo de botas impermeáveis",
    "Acesso ao app de viagem da Antarctica21",
    "Taxa de passageiro IAATO",
    "Equipe de expedição especializada",
  ],
  ship: {
    name: "Magellan Explorer & Discoverer",
    tag: "Navio de expedição",
    desc: [
      "A travessia dos fiordes opera com o Magellan Explorer ou o novo Magellan Discoverer, ambos para 76 hóspedes e construídos sob especificação polar, com calado que permite entrar nos canais mais estreitos.",
      "Lounge panorâmico, cabines com vista e Zodiacs prontos para cada desembarque. A amplitude não está no tamanho do navio, está na imensidão dos fiordes ao redor.",
    ],
    img: IMG.água,
  },
  saidasSeason: "Temporadas de setembro e abril",
  saidasNote: "Saídas em setembro e abril. A versão 2027-28 estende a viagem para 11 dias e 10 noites com mais escalas.",
  galeria: [
    { src: IMG.fiorde, cap: "Geleira azul descendo até o canal", tag: "Geleira" },
    { src: IMG.montanha, cap: "Picos afiados dos Andes patagônicos", tag: "Andes" },
    { src: IMG.água, cap: "Navegação entre os fiordes", tag: "Fiordes" },
    { src: IMG.cabana, cap: "Caleta Tortel e suas palafitas", tag: "Vila" },
    { src: IMG.picos, cap: "Campo de Gelo Sul ao entardecer", tag: "Gelo" },
    { src: IMG.costa, cap: "Leões-marinhos nas ilhotas", tag: "Fauna" },
    { src: IMG.estrada, cap: "Selva valdiviana à beira d'água", tag: "Natureza" },
    { src: IMG.vale, cap: "Glacier Alley no Canal Beagle", tag: "Beagle" },
  ],
};

export default function PatagoniaFjordsPage() {
  return <ExpeditionPage data={data} />;
}
