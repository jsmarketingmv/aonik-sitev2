"use client";

import BikeA2ZPage, { type A2ZBikeData } from "../../components/BikeA2ZPage";

const DATA: A2ZBikeData = {
  nome: "Porto · Lisboa",
  subtitulo: "Tour de Bike · 306 km · Costa Atlantica",
  heroImg:
    "https://www.portugal-a2z.com/imagegen//client/files/0000000001/2685.jpg/1920x700/2/1920x700/",
  precoBase: "€ 1.207",
  quote:
    "A costa atlantica que os romanos atravessaram de barco, voce percorre de bike. Seis etapas entre dunas, lagoas e pinhais seculares ate Obidos.",
  descricao:
    "Pedal autoguiado de 306 km pela costa atlantica portuguesa. A rota conecta o Porto a Obidos atraves de paisagens que mudam a cada etapa: estuarios fluviais, lagunas da Ria de Aveiro, o Pinhal de Leiria plantado por D. Dinis no sec. XIV e as ondas de Nazare. Bagagem transferida a cada pousada, bicicleta hibrida e aplicativo GPS inclusos.",
  stats: [
    { valor: "8 dias", label: "duracao" },
    { valor: "306 km", label: "distancia" },
    { valor: "6 etapas", label: "pedais" },
    { valor: "7 cafes", label: "refeiçoes" },
  ],
  dias: [
    {
      dia: "DIA 0",
      titulo: "Chegada ao Porto",
      desc: "Chegada livre. Hotel proximo ao centro historico do Porto. Briefing e entrega dos equipamentos da bike.",
      hotel: "Hotel 3*/4* Porto",
    },
    {
      dia: "DIA 1",
      titulo: "Porto → Ovar",
      km: "51 km",
      desc: "Partida pelo Rio Douro. Costa de areia fina e vilas piscatorias do litoral norte portugues. Terreno plano e acessivel.",
      hotel: "Hotel Ovar",
    },
    {
      dia: "DIA 2",
      titulo: "Ovar → Regiao de Mira",
      km: "65 km",
      desc: "A Ria de Aveiro. Travessia de barco em Sao Jacinto, laguna de agua salobra, moliceiros coloridos e uma paisagem de outro mundo. Etapa longa com terreno plano.",
      hotel: "Hotel Mira",
    },
    {
      dia: "DIA 3",
      titulo: "Mira → Figueira da Foz",
      km: "55 km",
      desc: "Sistemas de dunas e pinheirais nativos. Miradouro da Vela com vista ao largo, Cabo Mondego e chegada a Figueira da Foz na foz do Rio Mondego.",
      hotel: "Hotel Figueira da Foz",
    },
    {
      dia: "DIA 4",
      titulo: "Figueira da Foz → Sao Pedro de Moel",
      km: "65 km",
      desc: "Etapa pelo coracao do Pinhal de Leiria, mata costeira mandada plantar por D. Dinis no sec. XIV. Alternancia de trilha na areia e asfalto costeiro.",
      hotel: "Hotel Sao Pedro de Moel",
    },
    {
      dia: "DIA 5",
      titulo: "Sao Pedro de Moel → Foz do Arelho",
      km: "55 km",
      desc: "Passagem por Nazare, famosa pelas maiores ondas surfadas do mundo. Chegada a Lagoa de Obidos, sistema lagunar com flamingos e aves migratorias.",
      hotel: "Hotel Foz do Arelho",
    },
    {
      dia: "DIA 6",
      titulo: "Foz do Arelho → Obidos",
      km: "15 km",
      desc: "Etapa curta e tranquila pelo bordo da lagoa. Chegada a Obidos, vila medieval inteiramente conservada com muralhas do sec. XII. Tarde livre para explorar.",
      hotel: "Hotel Obidos",
    },
    {
      dia: "DIA 7",
      titulo: "Partida de Obidos",
      desc: "Cafe da manha no hotel. Transfer incluido ate Lisboa (45 min) ou Porto conforme combinado. Fim do roteiro.",
    },
  ],
  galeria: [
    "https://www.portugal-a2z.com/imagegen//client/files/0000000001/2228.jpg/900x600/1/900x600/",
    "https://www.portugal-a2z.com/imagegen//client/files/0000000001/2229.jpg/900x600/1/900x600/",
    "https://www.portugal-a2z.com/imagegen//client/files/0000000001/2231.jpg/900x600/1/900x600/",
    "https://www.portugal-a2z.com/imagegen//client/files/0000000001/2232.jpg/900x600/1/900x600/",
  ],
  inclusos: [
    "7 noites em hoteis 3*/4* selecionados (quarto duplo)",
    "7 cafes da manha",
    "Bicicleta hibrida 21v de qualidade (tamanho customizavel)",
    "Transferencia de bagagem diaria entre hospedagens",
    "Aplicativo GPS com rota completa",
    "Seguro de assistencia em viagem",
    "Briefing inicial e mapa impresso",
    "Suporte AONIK por telefone durante todo o roteiro",
  ],
  naoInclusos: [
    "Voos internacionais",
    "Almoco e jantar",
    "Bebidas",
    "Seguro cancelamento (recomendado)",
    "Gorjetas",
  ],
  temporadas: {
    regular: {
      label: "Jan-Abr e 16 Out-30 Dez",
      preco: "€ 1.207",
      single: "€ 493",
    },
    alta: {
      label: "Mai-15 Out",
      preco: "€ 1.427",
      single: "€ 557",
    },
    partidas: "Sextas, Sabados, Domingos e Segundas",
    stopSales: "Agosto",
  },
  pal: {
    bg: "#060f1a",
    dark: "#091424",
    accent: "#2e78b8",
    granito: "#8aa8c4",
    creme: "#f2ede3",
    cremeDp: "#e8e0d0",
  },
};

export default function Page() {
  return <BikeA2ZPage d={DATA} />;
}
