import type { Metadata } from "next";
import { ProgramaPage, type Programa, type WPin } from "../_shared";

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
  { src: "/lastorres/IMG_5590.jpeg",  cap: "Base Torres ao amanhecer, o primeiro grande marco", tag: "Dia 2" },
  { src: "/lastorres/IMG_6534.jpeg",  cap: "A orla do Lago Nordenskjöld aos pés dos Cuernos", tag: "Cuernos" },
  { src: "/lastorres/IMG_5715.jpeg",  cap: "O circo glacial do Vale do Francés", tag: "Francés" },
  { src: "/lastorres/IMG_5957.jpeg",  cap: "Glaciar Grey e os icebergs à deriva no lago", tag: "Grey" },
  { src: "/lastorres/sunset.jpg",     cap: "O pôr do sol da Patagônia, a celebração de cada dia", tag: "Celebração" },
  { src: "/lastorres/IMG_6369.JPG",   cap: "Catamarã cruzando o Lago Pehoé no último dia", tag: "Pehoé" },
];

/* Pins do mapa específicos para o W Journey: 2 noites no Setor Central + 2 noites no Setor Francés */
const WMAP_JOURNEY: WPin[] = [
  { mx: 0.710, my: 0.282, nome: "Mirador Base Torres · 2 noites", dia: "Dias 1 e 2", desc: "A abertura da jornada guiada: Rito do Explorador, after trek e as três torres ao amanhecer.", img: "/lastorres/torres.jpg" },
  { mx: 0.545, my: 0.585, nome: "Setor Cuernos", dia: "Lago Nordenskjöld", desc: "A trilha beira o lago turquesa aos pés dos Cuernos del Paine.", img: "/torres-del-paine/prod-w-tradicional.jpg" },
  { mx: 0.480, my: 0.470, nome: "Setor Francés · 2 noites", dia: "Dias 3 e 4", desc: "Duas noites no coração do circuito: Vale do Francés e Mirador Británico.", img: "/lastorres/paisagem.jpg" },
  { mx: 0.108, my: 0.535, nome: "Glaciar Grey · Celebração final", dia: "Dia 5", desc: "Icebergs, catamarã no Pehoé e o jantar de despedida antes do retorno privativo.", img: "/torres-del-paine/setor-grey.jpg" },
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
  heroImg: "/lastorres/IMG_5590.jpeg",
  resumoTitulo: "5 dias · 4 noites · guiado",
  resumo:
    "O circuito mais cativante da Patagônia, desenhado para você aproveitar, conectar e crescer no caminho. Mais do que caminhar o W, uma experiência que deixa marca a cada passo.",
  stats: [
    { label: "Duração", value: "5d · 4n" },
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
    "Caminhada guiada com host bilíngue: Base Torres, Cuernos, Vale do Francés e Glaciar Grey",
    "Traslado privativo de Puerto Natales ao parque, ida e volta",
    "4 noites em refúgio de montanha ou camping full equipado",
    "Todas as refeições: café da manhã, box lunch e jantar",
    "Catamarã no Lago Pehoé e entrada do Parque Nacional",
    "Welcome kit, bastões e crampons quando o clima exigir",
    "Rito do Explorador, after trek em cada marco e jantar de despedida",
    "Certificado de conclusão do W Journey",
  ],
  naoInclui: [
    "Voos nacionais e internacionais",
    "Seguro de viagem e assistência médica",
    "Bebidas não mencionadas e gorjetas",
    "Aluguel de equipamento extra",
    "Jantares especiais de 24/12 e 31/12",
  ],
  hospedagens: [
    {
      nome: "Refúgio Central", tipo: "Mountain stay",
      desc: "Base do parque, perto do Welcome Center, com banho quente e cama de verdade. O lar do grupo nas noites 1 e 2.",
      img: "/lastorres/Vertice_Refugio_PG-4.jpg",
      imgs: [
        "/lastorres/Vertice_Refugio_PG-4.jpg",
        "/lastorres/Vertice_Refugio_Camping_Paine_Grande_-1.jpg",
        "https://lastorres.com/content/uploads/1200-x-500-1-1.jpg",
        "https://lastorres.com/content/uploads/1200x1000-1.jpg",
      ],
    },
    {
      nome: "Refúgio Francés", tipo: "Mountain stay",
      desc: "Aos pés do circo glacial, no coração selvagem do circuito. Duas noites no silêncio do vale.",
      img: "/lastorres/Vertice_Refugio_Camping_Paine_Grande_-3.jpg",
      imgs: [
        "/lastorres/Vertice_Refugio_Camping_Paine_Grande_-3.jpg",
        "https://www.vertice.travel/wp-content/uploads/2026/04/Vertice_Refugio_Camping_Paine_Grande_-5.jpg",
        "https://www.vertice.travel/wp-content/uploads/2026/04/Vertice_Refugio_Camping_Paine_Grande_-7.jpg",
      ],
    },
    {
      nome: "Camping full equipado", tipo: "Acampamento premium",
      desc: "Barraca em plataforma, colchão de alta densidade e saco de dormir. Acampar com conforto, acordar com a Patagônia.",
      img: "/lastorres/IMG_5860.JPG",
      imgs: [
        "/lastorres/IMG_5860.JPG",
        "/lastorres/Vertice_Refugio_Camping_PG.jpg",
        "https://www.vertice.travel/wp-content/uploads/2026/04/Vertice_Refugio_Camping_Paine_Grande_-20.jpg",
      ],
    },
  ],
  tarifaPerfis: [
    {
      key: "camping", label: "Camping", tarifa: 3200, base2pax: true, single: 2560, jantar: 71,
      nota: "Valores por pessoa, em ocupação dupla. Para 1 Pax, aplica-se suplemento single. Grupos de 2 a 12 pessoas.",
      inclui: [
        "Host bilíngue durante os 5 dias, do traslado de chegada ao de retorno",
        "Traslados privativos Puerto Natales, ida e volta",
        "Camping full equipado por 4 noites: barraca em plataforma, saco de dormir, colchão de alta densidade, travesseiro e banheiros com chuveiro quente",
        "Todas as refeições: café da manhã, box lunch e jantar em todos os setores",
        "Catamarã no Lago Pehoé e taxa de entrada do Parque Nacional",
        "Welcome kit: garrafa d'água e toalha. Bastões e crampons quando o clima exigir",
        "Rito do Explorador, after trek em cada marco, jantar de despedida e certificado",
      ],
    },
    {
      key: "refugio", label: "Refúgio", tarifa: 3315, base2pax: false, single: null, jantar: 71,
      nota: "Valores por pessoa, em ocupação simples. Grupos de 2 a 12 pessoas.",
      inclui: [
        "Host bilíngue durante os 5 dias, do traslado de chegada ao de retorno",
        "Traslados privativos Puerto Natales, ida e volta",
        "4 noites em refúgio de montanha: cama em quarto compartilhado (6 a 8 camas), saco de dormir e banheiros com água quente",
        "Todas as refeições: café da manhã, box lunch e jantar em todos os setores",
        "Catamarã no Lago Pehoé e taxa de entrada do Parque Nacional",
        "Welcome kit: garrafa d'água e toalha. Bastões e crampons quando o clima exigir",
        "Rito do Explorador, after trek em cada marco, jantar de despedida e certificado",
      ],
    },
  ],
  galeria: GAL,
  wmapPins: WMAP_JOURNEY,
};

export default function Page() {
  return <ProgramaPage data={DATA} />;
}
