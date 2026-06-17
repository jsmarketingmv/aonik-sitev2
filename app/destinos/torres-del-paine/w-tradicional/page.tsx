import type { Metadata } from "next";
import { ProgramaPage, type Programa } from "../_shared";

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
  { src: "/lastorres/IMG_5521.JPG", cap: "Trilha pelo circuito W", tag: "Patagônia" },
  { src: "/lastorres/IMG_5834.jpeg", cap: "Paisagens de Torres del Paine", tag: "Paine" },
  { src: "/lastorres/IMG_6279.jpeg", cap: "Vales e geleiras do parque", tag: "Circuito W" },
  { src: "/lastorres/IMG_5939.jpeg", cap: "A força da Patagônia Chilena", tag: "Patagônia" },
  { src: "/lastorres/IMG_5802.jpeg", cap: "Natureza intocada da Patagônia", tag: "Patagônia" },
  { src: "/lastorres/IMG_5700.jpeg", cap: "Conforto ao fim de cada dia", tag: "Refúgio" },
];

const DATA: Programa = {
  slug: "w-tradicional",
  accentKey: "tradicional",
  selo: "Clássico",
  kicker: "Autoguiado",
  nome: "W Tradicional",
  titulo: ["Circuito W", "Tradicional"],
  taglineLead: "Os três vales do circuito mais popular do parque.",
  tagline: "O W clássico e completo, com a opção de estender para 6 ou 7 dias.",
  heroImg: "/lastorres/IMG_5036.jpeg",
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
    {
      nome: "Refúgios de montanha", tipo: "Mountain stays",
      desc: "Quarto compartilhado de 6 a 8 camas, banho quente e cama de verdade ao fim do dia.",
      img: "/lastorres/Vertice_Refugio_PG-4.jpg",
      imgs: ["/lastorres/Vertice_Refugio_PG-4.jpg", "https://lastorres.com/content/uploads/1200-x-500-1-1.jpg", "https://lastorres.com/content/uploads/1200x1000-1.jpg"],
    },
    {
      nome: "Camping full equipado", tipo: "Acampamento premium",
      desc: "Barraca em altura, colchão de alta densidade e saco de dormir, já montados quando você chega.",
      img: "/lastorres/IMG_5860.JPG",
      imgs: ["/lastorres/IMG_5860.JPG", "/lastorres/Vertice_Refugio_Camping_PG.jpg", "https://lastorres.com/content/uploads/700-x-580-2-17.jpg"],
    },
    {
      nome: "Hotel + refúgios", tipo: "Conforto extra",
      desc: "Noites no Hotel Las Torres combinadas com refúgios na rota, na versão mais confortável do circuito.",
      img: "/lastorres/IMG_5694.jpeg",
      imgs: ["/lastorres/IMG_5694.jpeg", "/lastorres/IMG_5703.JPG", "/lastorres/IMG_6534.jpeg", "/lastorres/Vertice_Refugio_Camping_Paine_Grande_-12.jpg"],
    },
  ],
  tarifaPerfis: [
    {
      key: "camping", label: "Camping", tarifa: 1874, base2pax: true, single: 1874, jantar: 71,
      nota: "Valores por pessoa, em ocupação dupla. Possível estender o roteiro para 6 ou 7 dias. Para 1 Pax, aplica-se suplemento single.",
      inclui: [
        "Welcome drink em cada setor e todas as refeições (jantar incluído no Dia 1)",
        "Camping full equipado: barraca em plataforma, saco de dormir, colchão de alta densidade, travesseiro e banheiros com chuveiro quente",
        "Welcome kit: garrafa d'água, liner* e toalha",
        "Catamarã no Lago Pehoé*",
        "Taxa de entrada do Parque Nacional e ônibus regular Puerto Natales ↔ Torres del Paine (ida e volta)",
      ],
    },
    {
      key: "refugio", label: "Refúgio", tarifa: 2366, base2pax: false, single: null, jantar: 71,
      nota: "Valores por pessoa, em ocupação simples. Possível estender o roteiro para 6 ou 7 dias.",
      inclui: [
        "Welcome drink em cada setor e todas as refeições (jantar incluído a partir do Dia 1)",
        "Cama em quarto compartilhado de 6 a 8 camas, saco de dormir e banheiros com água quente",
        "Welcome kit: garrafa d'água, liner* e toalha",
        "Catamarã no Lago Pehoé*",
        "Taxa de entrada do Parque Nacional e ônibus regular Puerto Natales ↔ Torres del Paine (ida e volta)",
      ],
    },
    {
      key: "hotel", label: "Hotel + Refúgio", tarifa: 3006, base2pax: true, single: 3000, jantar: 71,
      nota: "Valores por pessoa, em ocupação dupla. Possível estender o roteiro para 6 ou 7 dias. Para 1 Pax, aplica-se suplemento single.",
      inclui: [
        "Welcome drink em cada setor; acomodação para 2 hóspedes: 2 noites em quarto Superior no Hotel Las Torres + noites em quarto compartilhado (6 a 8 camas) nos refúgios da rota",
        "Saco de dormir, banheiros com chuveiro quente e todas as refeições",
        "Welcome kit: garrafa d'água, liner* e toalha",
        "Catamarã no Lago Pehoé*",
        "Taxa de entrada do Parque Nacional e ônibus regular Puerto Natales ↔ Torres del Paine (ida e volta)",
      ],
    },
  ],
  galeria: GAL,
};

export default function Page() {
  return <ProgramaPage data={DATA} />;
}
