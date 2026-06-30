// Calendário de Grupos de Trekking — datas REAIS publicadas (espelha o SaaS).
// Reusado pela página /grupos e pela seção de datas das páginas de produto.

export type Grupo = {
  id: string;
  title: string;
  flags: string;
  local: string;
  dates2026?: string[];
  dates2027?: string[];
  distance: string;
  altitude: string;
  duration: string;
  priceFrom: string;
  status: "confirmada" | "a-confirmar";
  href: string; // página individual (ou #contato enquanto não existir)
  img: string;
};

export const GRUPOS: Grupo[] = [
  {
    id: "tour-du-mont-blanc",
    title: "Tour du Mont Blanc",
    flags: "🇫🇷 🇮🇹 🇨🇭",
    local: "Alpes · França · Itália · Suíça",
    dates2026: ["18 a 31/Ago"],
    dates2027: ["17 a 30/Ago"],
    distance: "170 km",
    altitude: "8.823 m+",
    duration: "14 dias",
    priceFrom: "a partir de € 5.450",
    status: "confirmada",
    href: "/destinos/tour-du-mont-blanc",
    img: "/images/tmb/hero.jpg",
  },
  {
    id: "dolomitas-alta-via",
    title: "Dolomitas Alta Via 1",
    flags: "🇮🇹",
    local: "Alpes Italianos",
    dates2026: ["03 a 12/Set"],
    dates2027: ["02 a 11/Set"],
    distance: "100 km",
    altitude: "5.116 m+",
    duration: "10 dias",
    priceFrom: "a partir de € 5.450",
    status: "confirmada",
    href: "/destinos/dolomitas-alta-via",
    img: "https://static.wixstatic.com/media/2d4f5b_b3679b85ae3049609cb6df62340cf2f5~mv2.jpg/v1/fill/w_600,h_400,al_c,q_82,enc_avif,quality_auto/img.jpg",
  },
  {
    id: "douro",
    title: "Douro Experience",
    flags: "🇵🇹",
    local: "Vale do Douro · Portugal",
    dates2026: ["14 a 21/Set"],
    dates2027: ["20 a 28/Set"],
    distance: "58,7 km",
    altitude: "2.051 m+",
    duration: "8 dias",
    priceFrom: "a partir de € 4.300",
    status: "confirmada",
    href: "/destinos/douro",
    img: "https://static.wixstatic.com/media/2d4f5b_edfea84f57b54f589aff44727039c42e~mv2.jpg/v1/fill/w_600,h_400,al_c,q_82,enc_avif,quality_auto/img.jpg",
  },
  {
    id: "coxilha-rica",
    title: "Coxilha Rica",
    flags: "🇧🇷",
    local: "Serra Catarinense · Brasil",
    dates2026: ["12 a 16/Abr", "14 a 18/Jun", "13 a 17/Set"],
    dates2027: ["11 a 15/Abr", "13 a 17/Jun", "01 a 05/Ago"],
    distance: "55,4 km",
    altitude: "1.367 m+",
    duration: "5 dias",
    priceFrom: "a partir de R$ 5.800",
    status: "confirmada",
    href: "/destinos/coxilha-rica",
    img: "/images/coxilha-rica/campo-grupo-araucaria.jpg",
  },
  {
    id: "bavaria",
    title: "Bavária Alemã",
    flags: "🇦🇹 🇩🇪",
    local: "Alpes Bávaros",
    dates2027: ["14 a 24/Set"],
    distance: "65,4 km",
    altitude: "3.446 m+",
    duration: "9 dias",
    priceFrom: "a partir de € 4.550",
    status: "confirmada",
    href: "/destinos/bavaria",
    img: "https://static.wixstatic.com/media/fe55bd_f554b84e76a94f349bce45b1cdb90916~mv2.jpg/v1/fill/w_600,h_400,al_c,q_82,enc_avif,quality_auto/img.jpg",
  },
  {
    id: "tirol",
    title: "Tirol Austríaco",
    flags: "🇩🇪 🇦🇹",
    local: "Alpes de Stubai · Áustria",
    dates2027: ["03 a 12/Set"],
    distance: "90 km",
    altitude: "5.930 m+",
    duration: "10 dias",
    priceFrom: "a partir de € 4.200",
    status: "a-confirmar",
    href: "/destinos/tirol",
    img: "https://static.wixstatic.com/media/fe55bd_e6bf1523cb2f48d0b2afe545fe1c5a89~mv2.jpeg/v1/fill/w_600,h_400,al_c,q_82,enc_avif,quality_auto/img.jpg",
  },
  {
    id: "dana-petra",
    title: "Dana até Petra",
    flags: "🇯🇴",
    local: "Deserto da Jordânia",
    dates2027: ["18 a 27/Out"],
    distance: "77 km",
    altitude: "2.679 m+",
    duration: "10 dias",
    priceFrom: "a partir de US$ 5.200",
    status: "confirmada",
    href: "/destinos/dana-ate-petra",
    img: "https://static.wixstatic.com/media/fe55bd_0280e88d2a6b41be8562852f23bb4ecb~mv2.jpg/v1/fill/w_600,h_400,al_c,q_82,enc_avif,quality_auto/img.jpg",
  },
];

// Próximas saídas em estudo (spoilers do site)
export const EM_BREVE = [
  { title: "Coxilha Rica de Bike", flag: "🇧🇷" },
  { title: "Yosemite · São Francisco", flag: "🇺🇸" },
  { title: "Hiking Tour Liechtenstein", flag: "🇱🇮" },
  { title: "Rocky Mountains", flag: "🇨🇦" },
  { title: "Islândia", flag: "🇮🇸" },
  { title: "Eslovênia · Alps Juliano", flag: "🇸🇮" },
  { title: "Pireneus", flag: "🇪🇸" },
];

// Helper: datas de um grupo por ano
export function datasDoAno(g: Grupo, ano: 2026 | 2027): string[] {
  return (ano === 2026 ? g.dates2026 : g.dates2027) ?? [];
}
