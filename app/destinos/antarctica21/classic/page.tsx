"use client";

import { ExpeditionPage, IMG, type Expedition } from "../_shared";

const data: Expedition = {
  slug: "classic",
  kicker: "Antártida · Air-Cruise · saindo de Punta Arenas",
  title: ["Classic", "Antarctica"],
  subtitleLead: "Oito dias na Península Antártica, com o voo que pula a Drake e cinco noites de navegação por",
  subtitle: "fiordes de gelo, geleiras e a fauna mais espetacular do planeta.",
  price: "a partir de US$ 13.795",
  priceNote: "valores por pessoa em ocupação dupla · tarifa varia por tipo de cabine e navio",
  signature: "air",
  heroImg: IMG.montanha,
  stats: [
    { label: "Duração", value: "8d / 7n" },
    { label: "No gelo", value: "5 noites" },
    { label: "Saída", value: "Punta Arenas" },
    { label: "A partir de", value: "US$ 13.795" },
  ],
  destaquesTitle: "A expedição mais procurada da Antarctica21",
  destaques: [
    { num: "01", t: "Voo de 2h sobre a Drake", d: "Um voo fretado leva você direto a King George Island. Sem dois dias de mar agitado: mais tempo na Antártida." },
    { num: "02", t: "Cinco noites no gelo", d: "A maior imersão entre as Shetland do Sul e a costa oeste da Península Antártica." },
    { num: "03", t: "Antarctic Sound", d: "Os icebergs tabulares gigantes que se desprendem da plataforma de gelo do Mar de Weddell." },
    { num: "04", t: "Estreito de Gerlache", d: "Águas espelhadas entre montanhas, baleias jubarte e o silêncio absoluto da natureza." },
    { num: "05", t: "Canal Lemaire", d: "O corredor mais fotografado da Antártida: paredes de granito e gelo a poucos metros do casco." },
    { num: "06", t: "Roteiro flexível", d: "A equipe de expedição decide a cada dia a melhor rota conforme o gelo, o vento e a fauna." },
  ],
  roteiroNote: "Saídas de fim de novembro ao início de março. Voo de ida e volta entre Punta Arenas e King George Island.",
  roteiro: [
    { d: "01", t: "Punta Arenas", s: "Chegada, check-in e briefing obrigatório na Explorers House. Jantar de boas-vindas." },
    { d: "02", t: "Voo para a Antártida", s: "Voo fretado de 2h a King George Island. Embarque no navio por Zodiac." },
    { d: "03-06", t: "Península Antártica", s: "Quatro dias de desembarques, Zodiacs e navegação por Gerlache, Lemaire e Antarctic Sound." },
    { d: "07", t: "Voo de retorno", s: "Voo de King George Island a Punta Arenas. Noite de hotel no continente." },
    { d: "08", t: "Despedida", s: "Café da manhã e transfer ao aeroporto para as conexões." },
  ],
  incluso: [
    "Voo de ida e volta entre Punta Arenas e a Antártida",
    "7 noites de hospedagem (2 em hotel + 5 a bordo)",
    "Todas as refeições e bebidas a bordo (vinho, cerveja e não-alcoólicas)",
    "Todas as excursões guiadas e atividades de Zodiac",
    "Palestras educativas e equipe de expedição completa",
    "Empréstimo de botas impermeáveis",
    "Taxa de passageiro IAATO e acesso à Explorers House",
    "Opcionais: caiaque, hiking e raquetes de neve (sob reserva)",
  ],
  ship: {
    name: "Magellan Explorer & Discoverer",
    tag: "Dois navios boutique",
    desc: [
      "A Classic opera com o Magellan Explorer ou o novo Magellan Discoverer, ambos para 76 hóspedes e construídos sob especificação polar. O Discoverer estreia na temporada 2026-27 com propulsão híbrida diesel-elétrica.",
      "Cabines com vista para o gelo, lounge panorâmico, sauna, academia e clínica médica a bordo. Tecnologia de ponta a serviço de uma experiência íntima no fim do mundo.",
    ],
    img: IMG.água,
  },
  saidasSeason: "Temporada 2026 / 2027",
  saidasNote: "Saídas regulares de fim de novembro ao início de março. Tarifa a partir de US$ 13.795 no Explorer; mais alta no Magellan Discoverer.",
  galeria: [
    { src: IMG.montanha, cap: "Picos antárticos sobre o Canal Lemaire", tag: "Lemaire" },
    { src: IMG.picos, cap: "Icebergs tabulares do Antarctic Sound", tag: "Gelo" },
    { src: IMG.fiorde, cap: "Estreito de Gerlache em águas espelhadas", tag: "Gerlache" },
    { src: IMG.água, cap: "Baleias jubarte ao lado do navio", tag: "Fauna" },
    { src: IMG.costa, cap: "Colônia de pinguins nas Shetland", tag: "Pinguins" },
    { src: IMG.neve, cap: "Campos de gelo até o horizonte", tag: "Neve" },
    { src: IMG.trilha, cap: "Caminhada guiada com raquetes", tag: "Trekking" },
    { src: IMG.vale, cap: "O navio fundeado em baía de gelo", tag: "Navio" },
  ],
};

export default function ClassicPage() {
  return <ExpeditionPage data={data} />;
}
