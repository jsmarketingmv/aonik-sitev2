import type { Metadata } from "next";
import { ProgramaPage, type Programa } from "../_shared";

export const metadata: Metadata = {
  title: "W Express · autoguiado 4D/3N | Torres del Paine | AONIK",
  description:
    "A versão compacta do circuito W em Torres del Paine: Base Torres, Cuernos, Vale do Francés e Glaciar Grey em 4 dias. Autoguiado, com refúgios ou camping. Patagônia Chilena.",
  openGraph: {
    title: "W Express · 4D/3N | Torres del Paine | AONIK",
    description: "O W essencial, em ritmo compacto. 4 dias, 3 noites, autoguiado.",
  },
};

const GAL = [
  { src: "/lastorres/IMG_5668.jpeg", cap: "Os Cuernos sobre o Lago Nordenskjöld", tag: "Cuernos" },
  { src: "/lastorres/paisagem.jpg",  cap: "A paisagem inconfundível da Patagônia", tag: "Patagônia" },
  { src: "/lastorres/IMG_6333.jpeg", cap: "O circo glacial do Vale do Francés", tag: "Francés" },
  { src: "/lastorres/IMG_6691.jpeg", cap: "Torres del Paine ao amanhecer", tag: "Torres" },
  { src: "/lastorres/IMG_5610.jpeg", cap: "As águas turquesa do Pehoé", tag: "Pehoé" },
  { src: "/lastorres/IMG_5816.jpeg", cap: "A trilha pela floresta de lenga", tag: "Chileno" },
  { src: "/lastorres/IMG_6063.jpeg", cap: "Natureza bruta da Patagônia Chilena", tag: "Paine" },
];

const DATA: Programa = {
  slug: "w-express",
  accentKey: "express",
  selo: "Menos dias",
  kicker: "Autoguiado",
  nome: "W Express",
  titulo: ["W Express", "4D · 3N"],
  taglineLead: "O W essencial, sem perder nenhum ícone.",
  tagline: "A versão mais compacta do circuito mais popular da Patagônia.",
  heroImg: "/lastorres/IMG_5800.jpeg",
  resumoTitulo: "4 dias · 3 noites · autoguiado",
  resumo:
    "Venha viver a versão mais curta do circuito de trekking mais famoso de Torres del Paine, sem abrir mão dos grandes ícones: Base Torres, Cuernos, Vale do Francés, o maciço Paine e o imponente Glaciar Grey.",
  stats: [
    { label: "Duração", value: "4d · 3n" },
    { label: "Noites", value: "3" },
    { label: "Distância", value: "69,5 km" },
    { label: "Estilo", value: "Autoguiado" },
    { label: "Temporada", value: "Out → Abr" },
  ],
  roteiroNote:
    "No seu ritmo, com tudo organizado pela AONIK: transporte, hospedagem, refeições e os ingressos. Você só precisa caminhar e se encantar.",
  roteiro: [
    { dia: "Dia 1", titulo: "De Puerto Natales à Base Torres", desc: "Ônibus regular ao parque, vale do Ascencio até o Paso Los Vientos, floresta de lenga e o trecho final rochoso até o mirante das três torres e sua lagoa glacial.", km: "19,4 km", horas: "8 a 10h", desnivel: "+750 m", pernoite: "Setor Central" },
    { dia: "Dia 2", titulo: "Rumo ao Setor Francés", desc: "Caminhada serena pela orla do Lago Nordenskjöld, aos pés do Almirante Nieto. Rio Arriero, condores no céu e o mirante com vista do lago e do Glaciar Francés.", km: "13,5 km", horas: "4,5 a 6,5h", desnivel: "+80 m", pernoite: "Setor Francés" },
    { dia: "Dia 3", titulo: "O Vale do Francés", desc: "Subida leve ao Campamento Italiano e ao mirante do Vale do Francés, uma das vistas mais impressionantes de todo o circuito.", km: "15 km", horas: "7 a 8h", desnivel: "+712 m", pernoite: "Setor Francés" },
    { dia: "Dia 4", titulo: "Mirante Grey e retorno", desc: "Travessia por florestas e lagos até o primeiro mirante do Lago Grey e seus icebergs. Catamarã pelo Pehoé e retorno a Puerto Natales.", km: "15 km", horas: "7 a 8h", desnivel: "+280 m", pernoite: "Catamarã + ônibus" },
  ],
  inclui: [
    "Trekking autoguiado pelos marcos do circuito W",
    "3 noites em refúgio de montanha ou camping full equipado",
    "Todas as refeições: café da manhã, box lunch e jantar",
    "Ônibus regular de Puerto Natales ao parque, ida e volta",
    "Catamarã no Lago Pehoé",
    "Entrada do Parque Nacional e welcome kit",
    "Welcome drink em cada setor",
    "Possibilidade de upgrade para cabana ou hotel",
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
      nome: "Upgrade cabana ou hotel", tipo: "Opcional",
      desc: "Cabanas no Setor Cuernos ou noite no Hotel Las Torres, sob consulta. Eleve a experiência sem mudar o roteiro.",
      img: "/lastorres/IMG_5820.jpeg",
      imgs: ["/lastorres/IMG_5820.jpeg", "/lastorres/700-x-580-6.jpg", "/lastorres/1200-x-500-5%20(1).jpg"],
    },
  ],
  tarifaPerfis: [
    {
      key: "camping", label: "Camping", tarifa: 1657, base2pax: true, single: 1160, jantar: 71,
      nota: "Valores por pessoa, em ocupação dupla. Para 1 Pax, aplica-se suplemento single.",
      inclui: [
        "Welcome drink em cada setor e todas as refeições (jantar incluído no Dia 1)",
        "Camping full equipado: barraca em plataforma, saco de dormir, colchão de alta densidade, travesseiro e banheiros com chuveiro quente",
        "Welcome kit: garrafa d'água, liner* e toalha",
        "Catamarã no Lago Pehoé*",
        "Taxa de entrada do Parque Nacional e ônibus regular Puerto Natales ↔ Torres del Paine (ida e volta)",
      ],
    },
    {
      key: "refugio", label: "Refúgio", tarifa: 2000, base2pax: false, single: null, jantar: 71,
      nota: "Valores por pessoa, em ocupação simples.",
      inclui: [
        "Welcome drink em cada setor e todas as refeições",
        "Cama em quarto compartilhado de 6 a 8 camas, saco de dormir e banheiros com água quente",
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
