import type { Metadata } from "next";
import { ProgramaPage, IMG, type Programa } from "../_shared";

export const metadata: Metadata = {
  title: "W Tradicional · autoguiado 5D/4N | Torres del Paine | AONIK",
  description:
    "O circuito W clássico e completo em Torres del Paine: os três vales, as torres de granito, os Cuernos e o Glaciar Grey. 5 dias, autoguiado, extensível para 6 ou 7 dias.",
  openGraph: {
    title: "W Tradicional · clássico | Torres del Paine | AONIK",
    description: "O circuito W mais clássico e completo. 5 dias, 4 noites, autoguiado.",
  },
};

const GAL = [
  { src: IMG.torres, cap: "Base Torres ao amanhecer", tag: "Dia 2" },
  { src: IMG.cuernos, cap: "Os Cuernos sobre o Lago Nordenskjöld", tag: "Cuernos" },
  { src: IMG.vale, cap: "O circo glacial do Vale do Francés", tag: "Francés" },
  { src: IMG.grey, cap: "Glaciar Grey e seus icebergs", tag: "Grey" },
  { src: IMG.guanaco, cap: "Guanacos no pampa patagônico", tag: "Fauna" },
  { src: IMG.lago, cap: "As águas turquesa do Pehoé", tag: "Pehoé" },
];

const DATA: Programa = {
  slug: "w-tradicional",
  accentKey: "tradicional",
  selo: "Clássico",
  kicker: "Autoguiado",
  nome: "W Tradicional",
  titulo: ["W", "Tradicional"],
  taglineLead: "Os três vales do circuito mais popular do parque.",
  tagline: "O W clássico e completo, com a opção de estender para 6 ou 7 dias.",
  heroImg: IMG.torres,
  resumoTitulo: "5 dias · 4 noites · autoguiado",
  resumo:
    "Explore os três vales do circuito de trekking mais popular de Torres del Paine. Aproxime-se das imponentes torres de granito, caminhe ao lado dos Cuernos e encante-se com o Vale do Francés e o magnífico Glaciar Grey.",
  stats: [
    { label: "Duração", value: "5d · 4n" },
    { label: "Noites", value: "4" },
    { label: "Distância", value: "75,5 km" },
    { label: "Estilo", value: "Autoguiado" },
    { label: "Extensão", value: "até 7 dias" },
  ],
  roteiroNote:
    "O circuito W na sua forma mais completa, com a possibilidade de estender para 6 ou 7 dias e mergulhar ainda mais fundo no parque.",
  roteiro: [
    { dia: "Dia 1", titulo: "De Puerto Natales a Torres del Paine", desc: "Transporte regular ao parque e acomodação no Setor Central, ponto de partida da grande aventura.", horas: "Traslado ~2h30", pernoite: "Setor Central" },
    { dia: "Dia 2", titulo: "Mirante Base Torres", desc: "Cedo rumo ao ícone do parque: pampa, rio Ascencio, Paso Los Vientos, floresta de lenga e o trecho rochoso final até a Base Torres e sua lagoa glacial.", km: "19,5 km", horas: "8 a 10h", desnivel: "+750 m", pernoite: "Setor Central" },
    { dia: "Dia 3", titulo: "Setor Cuernos", desc: "Cerca de 13,5 km beirando o Lago Nordenskjöld, o Almirante Nieto e os Cuernos del Paine, com geleiras suspensas e a fauna patagônica.", km: "13,5 km", horas: "4,5 a 6,5h", desnivel: "+80 m", pernoite: "Francés ou Cuernos" },
    { dia: "Dia 4", titulo: "Vale do Francés", desc: "Praia do Nordenskjöld, Campamento Italiano e o mirante do Vale do Francés, uma das vistas mais impressionantes. Descida ao Setor Paine Grande.", km: "20,5 km", horas: "8 a 10h", desnivel: "+712 m", pernoite: "Paine Grande" },
    { dia: "Dia 5", titulo: "Setor Grey, catamarã e retorno", desc: "Florestas de ñirre e coigüe até o mirante do Glaciar Grey e seus icebergs. Catamarã pelo Pehoé e retorno a Puerto Natales.", km: "31,5 km", horas: "8 a 10h", desnivel: "+280 m", pernoite: "Catamarã + ônibus" },
  ],
  inclui: [
    "Trekking autoguiado pelos três vales do circuito W",
    "4 noites em refúgio de montanha ou camping full equipado",
    "Todas as refeições: café da manhã, box lunch e jantar",
    "Ônibus regular de Puerto Natales ao parque, ida e volta",
    "Catamarã no Lago Pehoé",
    "Entrada do Parque Nacional e welcome kit",
    "Welcome drink em cada setor",
    "Possibilidade de upgrade para hotel ou cabana",
  ],
  naoInclui: [
    "Serviço de guia",
    "Voos nacionais e internacionais",
    "Seguro de viagem e assistência médica",
    "Equipamento não listado e gorjetas",
    "Jantares especiais de 24/12 e 31/12 (US$ 71 por pessoa)",
  ],
  hospedagens: [
    { nome: "Refúgios de montanha", tipo: "Mountain stays", desc: "Quarto compartilhado de 6 a 8 camas, banho quente e cama de verdade ao fim do dia.", img: IMG.refugio },
    { nome: "Camping full equipado", tipo: "Acampamento premium", desc: "Barraca em altura, colchão de alta densidade e saco de dormir.", img: IMG.camping },
    { nome: "Hotel + refúgios", tipo: "Conforto extra", desc: "Duas noites no Hotel Las Torres combinadas com refúgios na rota, na versão mais confortável.", img: IMG.hotel },
  ],
  tarifaLinhas: [
    { hosp: "Camping full equipado", tabela: 1874, vista: 1687, parc: 1781, x10: 1874 },
    { hosp: "Refúgios de montanha", tabela: 2366, vista: 2129, parc: 2247, x10: 2366 },
    { hosp: "Hotel + refúgios", tabela: 3006, vista: 2705, parc: 2855, x10: 3006 },
  ],
  tarifaNotas: [
    "Valores por pessoa, em ocupação dupla. Possível estender o roteiro para 6 ou 7 dias.",
    "Suplemento single: US$ 1.310 (camping) ou US$ 3.000 (hotel + refúgios).",
    "Early Booking válido para reservas de 02/06 a 30/07/2026. À vista 10% off, parcelado 5% off (entrada 30% + 7x sem juros) ou 10x sem juros (entrada 20%).",
    "Jantares especiais de 24/12 e 31/12: US$ 71 por pessoa (US$ 64 à vista).",
  ],
  galeria: GAL,
};

export default function Page() {
  return <ProgramaPage data={DATA} />;
}
