"use client";

import BikeA2ZPage, { type A2ZBikeData } from "../../components/BikeA2ZPage";

const DATA: A2ZBikeData = {
  nome: "Douro e Aldeias",
  subtitulo: "Tour de Bike · 232 km · Vale do Douro",
  heroImg:
    "https://www.portugal-a2z.com/imagegen//client/files/0000000001/2648.jpg/1920x700/2/1920x700/",
  precoBase: "€ 1.736",
  quote:
    "Vinhedos em terracos sobre o Rio Douro, aldeias medievais no planalto e uma prova de vinho do Porto a cada parada.",
  descricao:
    "Pedal autoguiado de 232 km que une dois mundos: as aldeias medievais de granito no planalto da Beira Alta e o Vale do Douro, Patrimonio Mundial da UNESCO. A rota passa por Castelo Rodrigo, Almeida e Penedono antes de descer ao vale do vinho. Inclui prova de vinho em quinta do Douro e passeio de barco Rabelo.",
  stats: [
    { valor: "8 dias", label: "duracao" },
    { valor: "232 km", label: "distancia" },
    { valor: "6 etapas", label: "pedais" },
    { valor: "7 cafes", label: "refeiçoes" },
  ],
  dias: [
    {
      dia: "DIA 0",
      titulo: "Chegada ao Porto",
      desc: "Chegada livre ao Porto. Noite em hotel 3*/4* no Ribeira. Briefing e entrega dos equipamentos.",
      hotel: "Hotel Porto",
    },
    {
      dia: "DIA 1",
      titulo: "Transfer + Aquecimento em Castelo Rodrigo",
      km: "27 km",
      desc: "Transfer incluido ao planalto (3h). Chegada a Castelo Rodrigo e volta de aquecimento pelos arredores da aldeia medieval com vista para a Serra da Estrela.",
      hotel: "Hotel Castelo Rodrigo",
    },
    {
      dia: "DIA 2",
      titulo: "Loop Castelo Rodrigo e Almeida",
      km: "53 km",
      desc: "Pedalada circular passando pela fortaleza hexagonal de Almeida (sec. XVII), uma das obras militares mais impressionantes da Peninsula Iberica.",
      hotel: "Hotel Castelo Rodrigo",
    },
    {
      dia: "DIA 3",
      titulo: "Castelo Rodrigo → Juizo",
      km: "30 km",
      desc: "Descida gradual do planalto em direcao ao sul. Paisagem de amendoeiras, oliveiras e campos abertos de centeio. Etapa curta com subidas tecnicas.",
      hotel: "Hotel Juizo",
    },
    {
      dia: "DIA 4",
      titulo: "Juizo → Penedono",
      km: "39 km",
      desc: "Penedono, aldeia com castelo medieval sobre afloramento de granito, um dos mais pitoirescos do centro de Portugal. Almoco tipico incluso.",
      hotel: "Hotel Penedono",
    },
    {
      dia: "DIA 5",
      titulo: "Penedono → Peso da Regua",
      km: "57 km",
      desc: "A descida epica ate o Vale do Douro. A vista dos vinhedos em terracos sobre o rio e uma das mais marcantes da Europa. Chegada ao coracao viticultor do Douro.",
      hotel: "Hotel Peso da Regua",
    },
    {
      dia: "DIA 6",
      titulo: "Loop Peso da Regua e Quintas do Douro",
      km: "37 km",
      desc: "Dia entre quintas e vinhedos. Visita a quinta do Douro com prova de vinho. Passeio de barco Rabelo no rio ao fim da tarde.",
      hotel: "Hotel Peso da Regua",
    },
    {
      dia: "DIA 7",
      titulo: "Partida",
      desc: "Cafe da manha. Transfer incluido de volta ao Porto (2h30). Fim do roteiro.",
    },
  ],
  galeria: [
    "https://www.portugal-a2z.com/imagegen//client/files/0000000001/2635.jpg/900x600/1/900x600/",
    "https://www.portugal-a2z.com/imagegen//client/files/0000000001/2637.jpg/900x600/1/900x600/",
    "https://www.portugal-a2z.com/imagegen//client/files/0000000001/2653.jpg/900x600/1/900x600/",
    "https://www.portugal-a2z.com/imagegen//client/files/0000000001/2642.jpg/900x600/1/900x600/",
  ],
  inclusos: [
    "7 noites em hoteis e pousadas 3*/4* selecionados",
    "7 cafes da manha",
    "Transfers Porto → Castelo Rodrigo e Peso da Regua → Porto",
    "Prova de vinho em quinta do Douro",
    "Bicicleta hibrida 21v (tamanho customizavel)",
    "Transferencia de bagagem diaria entre hospedagens",
    "Aplicativo GPS com rota completa",
    "Suporte AONIK por telefone durante todo o roteiro",
  ],
  naoInclusos: [
    "Voos internacionais",
    "Almoco e jantar (exceto almoco tipico no Dia 4)",
    "Bebidas",
    "Seguro cancelamento (recomendado)",
    "Gorjetas",
  ],
  temporadas: {
    regular: {
      label: "Jan-Mai e 16 Out-30 Dez",
      preco: "€ 1.736",
      single: "€ 557",
    },
    alta: {
      label: "Jun-15 Out",
      preco: "€ 1.964",
      single: "€ 636",
    },
    partidas: "Sabados",
    stopSales: "Agosto",
  },
  pal: {
    bg: "#08050f",
    dark: "#0f0c1c",
    accent: "#9a4a28",
    granito: "#9a8090",
    creme: "#f2ede3",
    cremeDp: "#e8e0d0",
  },
};

export default function Page() {
  return <BikeA2ZPage d={DATA} />;
}
