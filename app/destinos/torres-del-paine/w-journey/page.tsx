import type { Metadata } from "next";
import { ProgramaPage, IMG, type Programa } from "../_shared";

export const metadata: Metadata = {
  title: "W Journey Circuit · guiado 5D/4N | Torres del Paine | AONIK",
  description:
    "O circuito W guiado em Torres del Paine, com host bilíngue, traslado privativo e confirmação imediata. 5 dias, 4 noites, comunidade e conforto na Patagônia Chilena.",
  openGraph: {
    title: "W Journey Circuit · guiado | Torres del Paine | AONIK",
    description: "Caminhe o W na companhia de um host, do início ao fim. 5 dias, 4 noites.",
  },
};

const GAL = [
  { src: IMG.torres, cap: "Base Torres ao amanhecer", tag: "Dia 2" },
  { src: IMG.cuernos, cap: "Os Cuernos sobre o Lago Nordenskjöld", tag: "Cuernos" },
  { src: IMG.vale, cap: "O circo glacial do Vale do Francés", tag: "Francés" },
  { src: IMG.grey, cap: "Glaciar Grey e seus icebergs", tag: "Grey" },
  { src: IMG.trilha, cap: "A trilha pela floresta de lenga", tag: "Chileno" },
  { src: IMG.lago, cap: "As águas turquesa do Pehoé", tag: "Pehoé" },
];

const DATA: Programa = {
  slug: "w-journey",
  accentKey: "journey",
  selo: "Novo · Guiado",
  kicker: "Programa exclusivo",
  nome: "W Journey Circuit",
  titulo: ["W Journey", "Circuit"],
  taglineLead: "O destino importa, mas a boa companhia faz toda a diferença.",
  tagline: "Um programa guiado, do início ao fim, na mão de um host.",
  heroImg: IMG.amanhecer,
  resumoTitulo: "5 dias · 4 noites · guiado",
  resumo:
    "O circuito mais cativante da Patagônia, desenhado para você aproveitar, conectar e crescer no caminho. Mais do que caminhar o W, uma experiência que deixa marca a cada passo.",
  stats: [
    { label: "Duração", value: "5d · 4n" },
    { label: "Noites", value: "4" },
    { label: "Distância", value: "69,5 km" },
    { label: "Estilo", value: "Guiado" },
    { label: "Grupo", value: "2 a 12" },
  ],
  roteiroNote:
    "Cinco dias guiados por um host que conhece cada pedra do caminho. Você caminha leve, com a logística, as refeições e os rituais de celebração todos cuidados.",
  roteiro: [
    { dia: "Dia 1", titulo: "Preparações e chegada", desc: "Traslado privativo de Puerto Natales, entrega do welcome kit, welcome drink e o Rito do Explorador, uma cerimônia para abrir a jornada. Jantar e descanso no Setor Central.", horas: "Traslado ~2h", pernoite: "Setor Central" },
    { dia: "Dia 2", titulo: "O primeiro pico, Base Torres", desc: "Vale do Ascencio até o Paso Los Vientos, floresta de lenga e o trecho rochoso final até o mirante das três torres e sua lagoa glacial. After trek de celebração no Central.", km: "19,4 km", horas: "8 a 10h", desnivel: "+750 m", pernoite: "Setor Central" },
    { dia: "Dia 3", titulo: "No coração do maciço", desc: "Margens do Lago Nordenskjöld aos pés do Almirante Nieto, travessia do rio Arriero e o mirante mais alto, com vista do lago, do Glaciar Francés e do Cerro Paine.", km: "13,5 km", horas: "4,5 a 6,5h", desnivel: "+80 m", pernoite: "Setor Francés" },
    { dia: "Dia 4", titulo: "Imersão total e conexão", desc: "Cachoeira a caminho do Vale do Francés, o mirante Francés e, no ponto alto, o mirante Británico, anfiteatro de granito e gelo cercado pelo maciço.", km: "15 km", horas: "8 a 12h", desnivel: "+712 m", pernoite: "Setor Francés" },
    { dia: "Dia 5", titulo: "Último empurrão e celebração", desc: "Mirante do Glaciar Grey, o Campo de Hielo Sul e os icebergs no lago. Catamarã pelo Pehoé e jantar de despedida antes do retorno privativo a Puerto Natales.", km: "13,5 km", horas: "4,5 a 6,5h", desnivel: "+80 m", pernoite: "Catamarã + traslado privativo" },
  ],
  inclui: [
    "Caminhada guiada com host bilíngue: Base Torres, Los Cuernos, Vale do Francés e primeiro mirante do Grey",
    "Traslado privativo de Puerto Natales ao parque, ida e volta",
    "4 noites em refúgio de montanha ou camping full equipado",
    "Todas as refeições: café da manhã, box lunch e jantar",
    "Catamarã no Lago Pehoé",
    "Entrada do Parque Nacional e welcome kit",
    "Bastões e crampons quando o clima exigir",
    "Bebidas quentes ilimitadas e wifi nos 5 setores",
    "Rito do Explorador, after trek e jantar de despedida",
    "Guarda-volumes em Paine Grande e confirmação imediata de vagas",
  ],
  naoInclui: [
    "Voos nacionais e internacionais",
    "Seguro de viagem e assistência médica",
    "Bebidas não mencionadas e gorjetas",
    "Aluguel de equipamento extra",
    "Jantares especiais de 24/12 e 31/12 (US$ 50 por pessoa)",
  ],
  hospedagens: [
    { nome: "Refúgio Central", tipo: "Mountain stay", desc: "Base do parque, perto do Welcome Center, com banho quente e cama de verdade.", img: IMG.refugio },
    { nome: "Refúgio Francés", tipo: "Mountain stay", desc: "Aos pés do circo glacial, no coração selvagem do circuito.", img: IMG.trilha },
    { nome: "Camping full equipado", tipo: "Acampamento premium", desc: "Barraca em altura, colchão de alta densidade e saco de dormir. Acampar com conforto.", img: IMG.camping },
  ],
  tarifaPerfis: [
    { key: "camping", label: "Camping", tarifa: 2800, base2pax: true, single: 2240, jantar: 50, nota: "Valores por pessoa, em ocupação dupla. Para 1 Pax, aplica-se suplemento single. Grupos de 2 a 12 pessoas. Condições sob confirmação para o programa guiado." },
    { key: "refugio", label: "Refúgio", tarifa: 2990, base2pax: false, single: null, jantar: 50, nota: "Valores por pessoa, em ocupação simples. Grupos de 2 a 12 pessoas. Condições sob confirmação para o programa guiado." },
  ],
  galeria: GAL,
};

export default function Page() {
  return <ProgramaPage data={DATA} />;
}
