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
    img: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=1200&auto=format&fit=crop",
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
    img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop",
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
    priceFrom: "a partir de € 5.100",
    status: "confirmada",
    href: "#contato",
    img: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1200&auto=format&fit=crop",
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
    img: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "dolomitas-experience",
    title: "Dolomitas Experience",
    flags: "🇮🇹",
    local: "Cortina d'Ampezzo · Itália",
    dates2026: ["25 a 30/Set"],
    distance: "40 km",
    altitude: "1.400 m+",
    duration: "6 dias",
    priceFrom: "a partir de € 4.930",
    status: "a-confirmar",
    href: "#contato",
    img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop",
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
    priceFrom: "a partir de € 4.950",
    status: "confirmada",
    href: "#contato",
    img: "https://images.unsplash.com/photo-1500514966906-fe245eea9344?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "dana-petra",
    title: "Dana até Petra",
    flags: "🇯🇴",
    local: "Deserto da Jordânia",
    dates2027: ["14 a 23/Nov"],
    distance: "77 km",
    altitude: "2.679 m+",
    duration: "10 dias",
    priceFrom: "a partir de US$ 5.250",
    status: "a-confirmar",
    href: "#contato",
    img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop",
  },
];

// Próximas saídas em estudo (spoilers do site)
export const EM_BREVE = [
  { title: "Coxilha Rica de Bike", flag: "🇧🇷" },
  { title: "Yosemite · São Francisco", flag: "🇺🇸" },
  { title: "Hiking Tour Liechtenstein", flag: "🇱🇮" },
  { title: "Áustria: Raquetes na Neve", flag: "🇦🇹" },
  { title: "Circuito W, Torres del Paine", flag: "🇨🇱" },
  { title: "Bike Portugal: Porto a Lisboa", flag: "🇵🇹" },
  { title: "Bike Portugal: Aldeias Históricas", flag: "🇵🇹" },
];

// Helper: datas de um grupo por ano
export function datasDoAno(g: Grupo, ano: 2026 | 2027): string[] {
  return (ano === 2026 ? g.dates2026 : g.dates2027) ?? [];
}
