import type { Metadata } from "next";
import { ProgramaPage, IMG, type Programa } from "../_shared";

export const metadata: Metadata = {
  title: "W+ Express Plus · 5D/4N com Hotel Las Torres | Torres del Paine | AONIK",
  description:
    "O circuito W completo, fechando com uma noite de conforto no Hotel Las Torres. 5 dias, 4 noites, autoguiado, na Patagônia Chilena. Logística cuidada pela AONIK.",
  openGraph: {
    title: "W+ Express Plus · conforto + hotel | Torres del Paine | AONIK",
    description: "O W completo, com um final à altura no Hotel Las Torres. 5 dias, 4 noites.",
  },
};

const GAL = [
  { src: IMG.hotel, cap: "Quarto Superior do Hotel Las Torres", tag: "Conforto" },
  { src: IMG.torres, cap: "Base Torres ao amanhecer", tag: "Dia 1" },
  { src: IMG.cuernos, cap: "Os Cuernos sobre o Lago Nordenskjöld", tag: "Cuernos" },
  { src: IMG.vale, cap: "O circo glacial do Vale do Francés", tag: "Francés" },
  { src: IMG.grey, cap: "Glaciar Grey e seus icebergs", tag: "Grey" },
  { src: IMG.lago, cap: "As águas turquesa do Pehoé", tag: "Pehoé" },
];

const DATA: Programa = {
  slug: "w-plus",
  accentKey: "plus",
  selo: "Conforto + hotel",
  kicker: "Autoguiado",
  nome: "W+ Express Plus",
  titulo: ["W+ Express", "Plus"],
  taglineLead: "O W completo, com um final à altura.",
  tagline: "O circuito mais confortável da Patagônia, fechando no Hotel Las Torres.",
  heroImg: IMG.hotel,
  resumoTitulo: "5 dias · 4 noites · com hotel",
  resumo:
    "Este programa completa o circuito W e adiciona uma quarta noite, ao final, no Hotel Las Torres. Toda a aventura do W, coroada pelo conforto e pelas comodidades de se hospedar no hotel.",
  stats: [
    { label: "Duração", value: "5d · 4n" },
    { label: "Noites", value: "3 + hotel" },
    { label: "Distância", value: "69,5 km" },
    { label: "Estilo", value: "Autoguiado" },
    { label: "Final", value: "Hotel Las Torres" },
  ],
  roteiroNote:
    "O mesmo W icônico, com um descanso merecido no fim: uma noite de hotel para celebrar a conquista antes de voltar para casa.",
  roteiro: [
    { dia: "Dia 1", titulo: "De Puerto Natales à Base Torres", desc: "Ônibus regular ao parque, vale do Ascencio até o Paso Los Vientos, floresta de lenga e o trecho final até o mirante das três torres e sua lagoa glacial.", km: "19,4 km", horas: "8 a 10h", desnivel: "+750 m", pernoite: "Setor Central" },
    { dia: "Dia 2", titulo: "Rumo ao Setor Francés", desc: "Orla do Lago Nordenskjöld aos pés do Almirante Nieto, rio Arriero e o mirante com vista do lago e do Glaciar Francés sobre o Cerro Paine Grande.", km: "13,5 km", horas: "4,5 a 6,5h", desnivel: "+80 m", pernoite: "Setor Francés" },
    { dia: "Dia 3", titulo: "O Vale do Francés", desc: "Subida ao Campamento Italiano e ao mirante do Vale do Francés, um dos panoramas mais impressionantes de todo o circuito.", km: "15 km", horas: "7 a 8h", desnivel: "+712 m", pernoite: "Setor Francés" },
    { dia: "Dia 4", titulo: "Mirante Grey, catamarã e hotel", desc: "Primeiro mirante do Lago Grey e seus icebergs, catamarã pelo Pehoé e traslado ao Hotel Las Torres para jantar e pernoite.", km: "15 km", horas: "7 a 8h", desnivel: "+280 m", pernoite: "Catamarã · Hotel Las Torres" },
    { dia: "Dia 5", titulo: "Hotel Las Torres a Puerto Natales", desc: "Café da manhã no hotel e traslado de van até o aeroporto ou o centro de Puerto Natales.", horas: "Traslado ~2h30", pernoite: "Fim da viagem" },
  ],
  inclui: [
    "Trekking autoguiado pelos marcos do circuito W",
    "3 noites em refúgio de montanha ou camping + 1 noite no Hotel Las Torres (Quarto Superior)",
    "Todas as refeições no trekking e meia pensão no hotel",
    "Ônibus regular na ida e van privativa no retorno",
    "Catamarã no Lago Pehoé",
    "Entrada do Parque Nacional e welcome kit",
    "Welcome drink em cada setor",
  ],
  naoInclui: [
    "Serviço de guia",
    "Voos nacionais e internacionais",
    "Seguro de viagem e assistência médica",
    "Equipamento não listado e gorjetas",
    "Jantares especiais de 24/12 e 31/12 (US$ 71 por pessoa)",
  ],
  hospedagens: [
    { nome: "Refúgios de montanha", tipo: "Mountain stays", desc: "Quarto compartilhado aconchegante, banho quente e cama de verdade nos primeiros dias.", img: IMG.refugio },
    { nome: "Camping full equipado", tipo: "Acampamento premium", desc: "Barraca em altura, colchão de alta densidade e saco de dormir.", img: IMG.camping },
    { nome: "Hotel Las Torres", tipo: "Quarto Superior", desc: "Conforto e vista para o maciço no Setor Central, na última noite da viagem.", img: IMG.hotel },
  ],
  tarifaPerfis: [
    { key: "camping", label: "Camping + Hotel", tarifa: 2126, base2pax: true, single: 1490, jantar: 71, nota: "Valores por pessoa, em ocupação dupla. A noite no hotel é em meia pensão. Para 1 Pax, aplica-se suplemento single." },
    { key: "refugio", label: "Refúgio + Hotel", tarifa: 2594, base2pax: true, single: 1800, jantar: 71, nota: "Valores por pessoa, em ocupação dupla. A noite no hotel é em meia pensão. Para 1 Pax, aplica-se suplemento single." },
  ],
  galeria: GAL,
};

export default function Page() {
  return <ProgramaPage data={DATA} />;
}
