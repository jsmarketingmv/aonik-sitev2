"use client";

import BikeA2ZPage, { type A2ZBikeData } from "../../components/BikeA2ZPage";

const DATA: A2ZBikeData = {
  nome: "Aldeias Historicas",
  subtitulo: "Tour de Bike · 227 km · Interior de Portugal",
  heroImg:
    "https://www.portugal-a2z.com/imagegen//client/files/0000000001/1847.jpg/1920x700/2/1920x700/",
  precoBase: "€ 1.557",
  quote:
    "Seis aldeias medievais, granito secular e ares da Serra da Estrela. A rota que preserva o Portugal que a modernidade esqueceu.",
  descricao:
    "Pedal autoguiado de 227 km pelo interior montanhoso de Portugal. A rota conecta aldeias classificadas pela Fundacao Aldeias Historicas: Guarda, Belmonte (berco de Pedro Alvares Cabral), Sabugal, Almeida (fortaleza hexagonal do sec. XVII) e Foz Coa (gravuras pre-historicas UNESCO). Terreno variado com subidas na Serra da Estrela.",
  stats: [
    { valor: "7 dias", label: "duracao" },
    { valor: "227 km", label: "distancia" },
    { valor: "5 etapas", label: "pedais" },
    { valor: "6 cafes", label: "refeiçoes" },
  ],
  dias: [
    {
      dia: "DIA 0",
      titulo: "Porto → Guarda",
      desc: "Chegada ao Porto e transfer incluido ate Guarda (2h30). Noite em Guarda, a cidade mais alta de Portugal, a 1.000 m de altitude.",
      hotel: "Hotel Guarda",
    },
    {
      dia: "DIA 1",
      titulo: "Guarda → Belmonte",
      km: "35 km",
      desc: "Descida tecnica pela Serra da Estrela com vistas deslumbrantes. Chegada a Belmonte, berco de Pedro Alvares Cabral, com castelo medieval e judaria historica.",
      hotel: "Hotel Belmonte",
    },
    {
      dia: "DIA 2",
      titulo: "Belmonte → Termas do Cro",
      km: "45 km",
      desc: "Pedalada pelo vale do Rio Coa. Passagem pelo Castelo de Sabugal, conhecido pela Torre das Cinco Quinas. Chegada as termas num vale protegido e tranquilo.",
      hotel: "Hotel Termas do Cro",
    },
    {
      dia: "DIA 3",
      titulo: "Termas do Cro → Almeida",
      km: "51 km",
      desc: "Subida progressiva ate a aldeia-fortaleza de Almeida, com muralha hexagonal estrelar do sec. XVII. Uma das fortalezas militares melhor conservadas da Europa.",
      hotel: "Pousada Almeida",
    },
    {
      dia: "DIA 4",
      titulo: "Almeida → Cidadelhe",
      km: "41 km",
      desc: "Travessia por paisagens de planalto com horizontes abertos. Chegada a Cidadelhe, proximo do Vale do Coa com gravuras pre-historicas do Paleolitico, Patrimonio UNESCO.",
      hotel: "Hotel Cidadelhe",
    },
    {
      dia: "DIA 5",
      titulo: "Cidadelhe → Guarda",
      km: "55 km",
      desc: "Etapa final em subida gradual. A rota retorna a Guarda pelo flanco norte da Serra da Estrela. Vista panoramica da cidade mais alta de Portugal ao chegar.",
      hotel: "Hotel Guarda",
    },
    {
      dia: "DIA 6",
      titulo: "Partida de Guarda",
      desc: "Cafe da manha. Transfer de volta ao Porto incluido (2h30). Fim do roteiro.",
    },
  ],
  galeria: [
    "https://www.portugal-a2z.com/imagegen//client/files/0000000001/2579.jpg/900x600/1/900x600/",
    "https://www.portugal-a2z.com/imagegen//client/files/0000000001/1857.jpg/900x600/1/900x600/",
    "https://www.portugal-a2z.com/imagegen//client/files/0000000001/2577.jpg/900x600/1/900x600/",
    "https://www.portugal-a2z.com/imagegen//client/files/0000000001/2580.jpg/900x600/1/900x600/",
  ],
  inclusos: [
    "6 noites em hoteis e pousadas 3*/4* selecionados",
    "6 cafes da manha",
    "Transfer Porto → Guarda (chegada) e Guarda → Porto (partida)",
    "Bicicleta hibrida 21v (tamanho customizavel)",
    "Transferencia de bagagem diaria entre hospedagens",
    "Aplicativo GPS com rota completa",
    "Seguro de assistencia em viagem",
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
      label: "Jan-Mai e Out-Dez",
      preco: "€ 1.557",
      single: "€ 464",
    },
    alta: {
      label: "Jun-Set",
      preco: "€ 1.707",
      single: "€ 557",
    },
    partidas: "Sabados e Segundas",
  },
  pal: {
    bg: "#0c1e1c",    // Everglade dark
    dark: "#142a24",
    accent: "#3da09a",  // Aqua Cove (contraste vibrante no verde-escuro)
    granito: "#7aa898",
    creme: "#f0ece4",   // Beachwood
    cremeDp: "#e6e2d8",
  },
};

export default function Page() {
  return <BikeA2ZPage d={DATA} />;
}
