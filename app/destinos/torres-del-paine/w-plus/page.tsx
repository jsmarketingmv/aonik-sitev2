import type { Metadata } from "next";
import { ProgramaPage, type Programa, type WPin } from "../_shared";

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
  { src: "/lastorres/IMG_5698.jpeg",  cap: "Quarto Superior do Hotel Las Torres", tag: "Hotel" },
  { src: "/lastorres/IMG_5591.jpeg",  cap: "Base Torres ao amanhecer", tag: "Dia 1" },
  { src: "/lastorres/IMG_6104.jpeg",  cap: "Os Cuernos sobre o Lago Nordenskjöld", tag: "Cuernos" },
  { src: "/lastorres/IMG_5860.JPG",   cap: "Camping full equipado no parque", tag: "Camping" },
  { src: "/lastorres/IMG_5700.jpeg",  cap: "Hotel Las Torres, a última noite da viagem", tag: "Hotel" },
  { src: "/lastorres/hotel-verde.jpg", cap: "Refúgio de montanha entre as lengas patagônicas", tag: "Refúgio" },
  { src: "/lastorres/IMG_5695.jpeg",  cap: "As águas turquesa do Pehoé ao entardecer", tag: "Pehoé" },
];

/* Pins do mapa específicos para o W Plus: pin 2 no Setor Francés (2 noites) */
const WMAP_PLUS: WPin[] = [
  { mx: 0.710, my: 0.282, nome: "Mirador Base Torres", dia: "O coração do parque", desc: "As três torres de granito e a lagoa glacial ao amanhecer.", img: "/lastorres/torres.jpg" },
  { mx: 0.480, my: 0.470, nome: "Setor Francés · 2 noites", dia: "Lago Nordenskjöld", desc: "2 noites em Camping ou Domos Francês, à beira do lago turquesa.", img: "/torres-del-paine/prod-w-tradicional.jpg" },
  { mx: 0.415, my: 0.375, nome: "Vale do Francés · Británico", dia: "O circo glacial", desc: "Anfiteatro de gelo cercado por Paine Grande e os Cuernos.", img: "/lastorres/paisagem.jpg" },
  { mx: 0.108, my: 0.535, nome: "Glaciar Grey", dia: "Campo de Hielo Sul", desc: "Icebergs à deriva no lago e o catamarã sobre o Pehoé.", img: "/torres-del-paine/setor-grey.jpg" },
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
  heroImg: "/lastorres/IMG_5710.jpeg",
  resumoTitulo: "5 dias · 4 noites · com hotel",
  resumo:
    "Este programa completa o circuito W e adiciona uma quarta noite, ao final, no Hotel Las Torres. Toda a aventura do W, coroada pelo conforto e pelas comodidades de se hospedar no hotel.",
  stats: [
    { label: "Duração", value: "5d · 4n" },
    { label: "Distância", value: "69,5 km" },
    { label: "Estilo", value: "Autoguiado" },
    { label: "Hospedagem", value: "Refúgio ou Camping + Hotel Las Torres" },
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
    "3 noites em refúgio de montanha ou camping full equipado + 1 noite no Hotel Las Torres (Quarto Superior)",
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
    {
      nome: "Refúgios de montanha", tipo: "Mountain stays",
      desc: "Quarto compartilhado aconchegante, banho quente e cama de verdade nos primeiros dias.",
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
      nome: "Hotel Las Torres", tipo: "Quarto Superior",
      desc: "Conforto e vista para o maciço no Setor Central, na última noite da viagem.",
      img: "/lastorres/IMG_5703.JPG",
      imgs: ["/lastorres/IMG_5703.JPG", "/lastorres/IMG_5700.jpeg", "/lastorres/IMG_5704.JPG", "/lastorres/IMG_5710.jpeg"],
    },
  ],
  tarifaPerfis: [
    {
      key: "camping", label: "Camping + Hotel", tarifa: 2126, base2pax: true, single: 2126, jantar: 71,
      nota: "Valores por pessoa, em ocupação dupla. A noite no hotel é em meia pensão. Para 1 Pax, aplica-se suplemento single.",
      inclui: [
        "Welcome drink em cada setor e todas as refeições (jantar incluído no Dia 1 e meia pensão no hotel)",
        "Camping full equipado por 3 noites: barraca em plataforma, saco de dormir, colchão de alta densidade, travesseiro e banheiros com chuveiro quente",
        "1 noite em Quarto Superior do Hotel Las Torres (meia pensão incluída)",
        "Welcome kit: garrafa d'água, liner* e toalha",
        "Catamarã no Lago Pehoé*",
        "Taxa de entrada do Parque Nacional, ônibus regular Puerto Natales → parque e van privativa de retorno",
      ],
    },
    {
      key: "refugio", label: "Refúgio + Hotel", tarifa: 2594, base2pax: true, single: 2594, jantar: 71,
      nota: "Valores por pessoa, em ocupação dupla. A noite no hotel é em meia pensão. Para 1 Pax, aplica-se suplemento single.",
      inclui: [
        "Welcome drink em cada setor e todas as refeições (meia pensão no hotel)",
        "Cama em quarto compartilhado de 6 a 8 camas, saco de dormir e banheiros com água quente por 3 noites",
        "1 noite em Quarto Superior do Hotel Las Torres (meia pensão incluída)",
        "Welcome kit: garrafa d'água, liner* e toalha",
        "Catamarã no Lago Pehoé*",
        "Taxa de entrada do Parque Nacional, ônibus regular Puerto Natales → parque e van privativa de retorno",
      ],
    },
  ],
  galeria: GAL,
  wmapPins: WMAP_PLUS,
};

export default function Page() {
  return <ProgramaPage data={DATA} />;
}
