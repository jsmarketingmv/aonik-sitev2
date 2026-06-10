"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Contato from "../../components/Contato";
import FloatingActions from "../../components/FloatingActions";
import { Reveal, EASE } from "../../components/ui";
import { GRUPOS, datasDoAno } from "../../lib/grupos";

const GRUPO = GRUPOS.find((g) => g.id === "dolomitas-alta-via")!;

/* ============================================================
   DOLOMITAS ALTA VIA 1 — Alpes Italianos · Cortina d'Ampezzo
   Personalidade: IDENTIDADE ITALIANA (verde/branco/vermelho),
   DolomiteSkyline SVG, O Enrosadüra, Tre Cime · Braies · Civetta.
   Paleta: notte (verde-noite) · rosso (carmesim italiano) · calcare.
   ============================================================ */

const D = {
  notte:     "#06100a",
  bosco:     "#0d1e12",
  rosso:     "#ae1c2c",
  rossoDeep: "#720d18",
  calcare:   "#e8ddd0",
  verde:     "#2a6b38",
  creme:     "#f3ede4",
  line:      "rgba(174,28,44,0.2)",
  textSoft:  "rgba(232,221,208,0.62)",
};

// ============================================================
// COMPONENTE: DolomiteSkyline
// Panorama das torres — Braies→Lagazuoi→Civetta→Belluno.
// ============================================================
function DolomiteSkyline() {
  const towers = [
    "M 10,195 L 18,162 L 28,138 L 38,110 L 46,122 L 55,92 L 64,106 L 74,130 L 86,160 L 92,195 Z",
    "M 108,195 L 114,155 L 120,125 L 126,95 L 132,70 L 138,50 L 144,34 L 152,22 L 160,34 L 167,52 L 174,72 L 182,95 L 192,118 L 205,142 L 216,168 L 222,195 Z",
    "M 236,195 L 240,172 L 246,152 L 253,136 L 260,122 L 268,132 L 276,118 L 283,130 L 290,148 L 297,165 L 304,195 Z",
    "M 318,195 L 318,148 L 320,115 L 323,82 L 328,58 L 334,42 L 342,26 L 350,18 L 358,28 L 366,44 L 374,60 L 382,78 L 392,98 L 405,122 L 416,148 L 424,172 L 430,195 Z",
    "M 446,195 L 451,172 L 456,156 L 464,138 L 474,148 L 480,130 L 488,144 L 495,162 L 500,195 Z",
  ];

  const route =
    "M 0,188 C 22,186 38,182 55,178 " +
    "C 72,174 88,168 108,165 " +
    "C 120,162 128,138 142,108 " +
    "C 150,88 152,48 155,30 " +
    "C 158,18 162,30 168,52 " +
    "C 176,78 188,112 210,128 " +
    "C 224,136 234,155 248,162 " +
    "C 262,169 278,162 292,160 " +
    "C 308,157 316,148 328,135 " +
    "C 336,125 342,72 350,42 " +
    "C 356,24 362,34 370,55 " +
    "C 380,78 393,105 408,122 " +
    "C 420,136 432,162 446,170 " +
    "C 462,178 476,182 500,185";

  const waypoints = [
    { x: 0,   y: 188, label: "Lago di Braies", sub: "partida",  anchor: "start" as const },
    { x: 152, y: 22,  label: "Lagazuoi",       sub: "2.752 m",  anchor: "middle" as const },
    { x: 350, y: 18,  label: "Tre Cime",        sub: "3.003 m",  anchor: "middle" as const },
    { x: 498, y: 185, label: "Belluno",         sub: "chegada",  anchor: "end" as const },
  ];

  return (
    <svg viewBox="0 0 500 215" className="h-full w-full" style={{ overflow: "visible" }}>
      {towers.map((d, i) => (
        <motion.path key={`t${i}`} d={d} fill={D.calcare}
          initial={{ opacity: 0 }} animate={{ opacity: 0.06 + i * 0.015 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.15 + i * 0.12 }} />
      ))}
      {towers.map((d, i) => (
        <motion.path key={`o${i}`} d={d} fill="none" stroke={D.calcare} strokeWidth="0.7"
          initial={{ opacity: 0 }} animate={{ opacity: 0.22 }}
          transition={{ duration: 1.6, ease: EASE, delay: 0.25 + i * 0.12 }} />
      ))}
      {[towers[1], towers[3]].map((d, i) => (
        <motion.path key={`g${i}`} d={d} fill={D.rosso}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.1, 0.04] }}
          transition={{ duration: 3.5, ease: "easeOut", delay: 1.8 + i * 0.6,
            repeat: Infinity, repeatType: "mirror", repeatDelay: 5 }} />
      ))}
      <motion.path d={route} fill="none" stroke={D.rosso} strokeWidth="1.8"
        strokeDasharray="5 5" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 3.8, ease: EASE, delay: 0.9 }} />
      {waypoints.map((w, i) => (
        <motion.g key={w.label}
          initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: EASE, delay: 1.5 + i * 0.2 }}>
          <circle cx={w.x} cy={w.y} r="4.5" fill={D.notte} stroke={D.rosso} strokeWidth="1.8" />
          <text x={w.x} y={w.y - 12} fill={D.calcare} fontSize="9" textAnchor={w.anchor}
            letterSpacing="0.6" style={{ fontFamily: "sans-serif" }}>{w.label}</text>
          <text x={w.x} y={w.y - 24} fill={D.rosso} fontSize="8" textAnchor={w.anchor}
            letterSpacing="0.9" opacity="0.9"
            style={{ fontFamily: "sans-serif", textTransform: "uppercase" }}>{w.sub}</text>
        </motion.g>
      ))}
    </svg>
  );
}

// ============================================================
// COMPONENTE: ElevationProfile
// ============================================================
const HILL_PATH =
  "M 0,126 C 40,110 60,82 96,74 C 132,66 152,32 192,20 C 232,8 252,68 288,80 " +
  "C 324,92 360,74 384,78 C 408,82 444,70 480,65 C 516,60 546,100 576,122 " +
  "C 604,144 638,116 672,106 C 706,96 734,66 768,62 C 800,58 830,72 864,82 " +
  "C 896,92 928,152 960,220";

const HILL_FILL = HILL_PATH + " L 960,240 L 0,240 Z";

const PERFIL_WAYPOINTS = [
  { x: 15,  y: 126, label: "Lago di Braies", sub: "partida",  anchor: "start" as const },
  { x: 192, y: 20,  label: "Lagazuoi",       sub: "2.752 m",  anchor: "middle" as const },
  { x: 480, y: 65,  label: "Coldai",         sub: "2.191 m",  anchor: "middle" as const },
  { x: 768, y: 62,  label: "Civetta base",   sub: "dia 8",    anchor: "middle" as const },
  { x: 945, y: 220, label: "Belluno",        sub: "chegada",  anchor: "end" as const },
];

const LEGS = [
  { x1: 0,   x2: 192, label: "Dias 3-4 · subida ao Lagazuoi" },
  { x1: 192, x2: 480, label: "Dias 5-6 · travessia alta" },
  { x1: 480, x2: 768, label: "Dias 7-8 · Pelmo e Civetta" },
  { x1: 768, x2: 960, label: "Dias 9-10 · retorno" },
];

function ElevationProfile({ labelColor = D.calcare, gridColor = D.line }: { labelColor?: string; gridColor?: string }) {
  return (
    <svg viewBox="0 0 960 260" className="w-full" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="dolFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={D.rosso} stopOpacity="0.3" />
          <stop offset="100%" stopColor={D.rosso} stopOpacity="0.03" />
        </linearGradient>
      </defs>
      {[60, 100, 140, 180].map((y) => (
        <line key={y} x1={0} y1={y} x2={960} y2={y} stroke={gridColor} strokeWidth="0.6" />
      ))}
      <path d={HILL_FILL} fill="url(#dolFill)" />
      <motion.path d={HILL_PATH} fill="none" stroke={D.rosso} strokeWidth="2.2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true }}
        transition={{ duration: 4, ease: EASE, delay: 0.2 }} />
      {LEGS.map((l) => (
        <text key={l.x1} x={(l.x1 + l.x2) / 2} y={245} fill={D.rosso} fontSize="9"
          textAnchor="middle" letterSpacing="0.8" opacity="0.7"
          style={{ fontFamily: "sans-serif", textTransform: "uppercase" }}>{l.label}</text>
      ))}
      {PERFIL_WAYPOINTS.map((w) => (
        <g key={w.label + w.x}>
          <line x1={w.x} y1={w.y} x2={w.x} y2={218} stroke={D.rosso} strokeWidth="1"
            strokeDasharray="2 3" strokeOpacity="0.5" />
          <circle cx={w.x} cy={w.y} r="4.5" fill={labelColor === D.calcare ? D.notte : "#ffffff"} stroke={D.rosso} strokeWidth="1.8" />
          <text x={w.x} y={w.y - 10} fill={labelColor} fontSize="10" textAnchor={w.anchor}
            letterSpacing="0.5" style={{ fontFamily: "sans-serif" }}>{w.label}</text>
          <text x={w.x} y={w.y - 22} fill={D.rosso} fontSize="8.5" textAnchor={w.anchor}
            letterSpacing="1.2" opacity="0.85"
            style={{ fontFamily: "sans-serif", textTransform: "uppercase" }}>{w.sub}</text>
        </g>
      ))}
    </svg>
  );
}

// ============================================================
// COMPONENTE: GaleriaInterativa
// ============================================================
const GALERIA = [
  {
    src: "https://static.wixstatic.com/media/2d4f5b_b3679b85ae3049609cb6df62340cf2f5~mv2.jpg",
    cap: "Dolomitas — paisagem da travessia",
    tag: "Paisagem",
  },
  {
    src: "https://static.wixstatic.com/media/2d4f5b_91e8c6992b55485b8b74754b98f1b67f~mv2.jpg",
    cap: "Alta Via 1 — os caminhos entre as torres",
    tag: "Rota",
  },
  {
    src: "https://static.wixstatic.com/media/2d4f5b_b5691cbefb4e4071afddcb67131f3af5~mv2.jpeg",
    cap: "Alta Via 1 — o percurso pelos Alpes Italianos",
    tag: "Alta Via",
  },
  {
    src: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1400&auto=format&fit=crop",
    cap: "Rifugio historico — hospedagem de altitude",
    tag: "Rifugio",
  },
  {
    src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1400&auto=format&fit=crop",
    cap: "Cortina d'Ampezzo e os picos ao redor",
    tag: "Cortina",
  },
];

function GaleriaInterativa() {
  const [idx, setIdx] = useState(0);
  const img = GALERIA[idx];

  return (
    <div className="grid gap-3 md:grid-cols-[1fr_200px]">
      <AnimatePresence mode="wait">
        <motion.div key={idx}
          initial={{ opacity: 0.5, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }} transition={{ duration: 0.45, ease: EASE }}
          className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "16/10" }}>
          <img src={img.src} alt={img.cap} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0"
            style={{ background: `linear-gradient(to top, ${D.notte}bb 0%, transparent 55%)` }} />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em]" style={{ color: D.rosso }}>{img.tag}</span>
            <p className="mt-1 text-[14px] font-light" style={{ color: D.creme }}>{img.cap}</p>
          </div>
          <div className="absolute right-4 top-4">
            <span className="text-[11px] font-medium" style={{ color: "rgba(232,221,208,0.5)" }}>
              {idx + 1}/{GALERIA.length}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
        {GALERIA.map((g, i) => (
          <button key={i} onClick={() => setIdx(i)}
            className="relative shrink-0 overflow-hidden rounded-xl transition-all duration-300"
            style={{ width: 200, height: 115, opacity: i === idx ? 1 : 0.45,
              outline: i === idx ? `2px solid ${D.rosso}` : "2px solid transparent", outlineOffset: 2 }}>
            <img src={g.src} alt={g.tag} className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.05]" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// DADOS
// ============================================================
const STATS = [
  { v: "10",      u: "dias",           s: "9 noites" },
  { v: "100",     u: "quilômetros",    s: "8 dias de caminhada" },
  { v: "+5.116",  u: "metros",         s: "positivo acumulado" },
  { v: "3.003",   u: "metros",         s: "Tre Cime di Lavaredo" },
  { v: "3",       u: "noites",         s: "hotel em Cortina d'Ampezzo" },
  { v: "6",       u: "noites",         s: "em rifugi de altitude" },
];

// 3 marcos da travessia (alternando esq/dir como TMB 3 culturas)
const MARCOS = [
  {
    id: "tre-cime",
    kicker: "Dia 2 · Marco das Dolomitas",
    titulo: ["Tre Cime", "di Lavaredo"],
    texto:
      "As tres torres de calcario mais fotografadas do mundo. O circuito completo revela a formacao rochosa por todos os angulos, com parada no Rifugio Locatelli. 15,43 km percorridos num dia que nenhum participante esquece.",
    detalhe: "3.003 m · Circuito 15 km · Dia 2",
    img: "https://static.wixstatic.com/media/2d4f5b_b3679b85ae3049609cb6df62340cf2f5~mv2.jpg",
    bg: D.verde,
    imgDireita: true,
    colors: {
      kicker: D.rosso,
      title: D.calcare,
      titleAccent: D.creme,
      body: "rgba(232,221,208,0.8)",
      detalhe: D.creme,
      link: D.calcare,
    },
  },
  {
    id: "braies",
    kicker: "Dia 3 · Inicio da travessia real",
    titulo: ["Lago", "di Braies"],
    texto:
      "Um dos lagos alpinos mais bonitos do mundo. Aguas turquesas cercadas de picos rochosos. Daqui a Alta Via comeca de verdade: 12,60 km e +1.037 m de subida ate o Rifugio Sennes, onde tudo muda de escala.",
    detalhe: "1.496 m · 12,60 km · +1.037 m",
    img: "https://static.wixstatic.com/media/2d4f5b_91e8c6992b55485b8b74754b98f1b67f~mv2.jpg",
    bg: "#ffffff",
    imgDireita: false,
    colors: {
      kicker: D.rosso,
      title: D.notte,
      titleAccent: D.rosso,
      body: "rgba(6,16,10,0.62)",
      detalhe: D.rosso,
      link: D.notte,
    },
  },
  {
    id: "civetta",
    kicker: "Dias 8-9 · A grande parede",
    titulo: ["Monte", "Civetta"],
    texto:
      "3.220 metros de altura, com uma das faces verticais mais longas dos Alpes Italianos. A Alta Via atravessa sua base por dois dias inteiros. Chegar ao Lago di Coldai e erguer os olhos para essa parede: nao tem descricao.",
    detalhe: "3.220 m · Parede NE com 1.000 m · Dias 8-9",
    img: "https://static.wixstatic.com/media/2d4f5b_b5691cbefb4e4071afddcb67131f3af5~mv2.jpeg",
    bg: D.rosso,
    imgDireita: true,
    colors: {
      kicker: "rgba(232,221,208,0.65)",
      title: D.creme,
      titleAccent: D.calcare,
      body: "rgba(240,235,224,0.75)",
      detalhe: D.calcare,
      link: D.creme,
    },
  },
];

const ROTEIRO = [
  {
    d: "01", icon: "✈",
    t: "Transfer Veneza · Cortina d'Ampezzo",
    s: "Chegada ao Aeroporto Marco Polo e transfer privado ate Cortina d'Ampezzo. Check-in em hotel no centro. Briefing da viagem as 19h. Cafe da manha e jantar livre.",
  },
  {
    d: "02", icon: "🗻",
    t: "Circuito Tre Cime di Lavaredo e Cadini di Misurina",
    s: "15,43 km · +695 m. Transfer ate o Rifugio Auronzo. Circuito completo dos Tre Cime — as tres torres mais icônicas dos Alpes — com parada no Rifugio Locatelli. Retorno por Lago di Misurina. Hotel em Cortina.",
  },
  {
    d: "03", icon: "💧",
    t: "Lago di Braies ate Rifugio Sennes",
    s: "12,60 km · +1.037 m. Transfer ate o Lago di Braies — o cartao postal das Dolomitas. Subida exigente ate 2.369 m. Inicio da travessia de verdade, de refugio em refugio.",
  },
  {
    d: "04", icon: "⛰",
    t: "Sennes ate Fanes",
    s: "12,90 km · +617 m. Descidas iniciais ate o Rifugio Pederu, subida ate o vale de Fanes. O grande platô de Fanes e um dos cenarios mais surreais de toda a rota.",
  },
  {
    d: "05", icon: "🏔",
    t: "Fanes ate Passo Falzarego",
    s: "18,98 km · +1.052 m. O dia mais longo e mais tecnicamente desafiador. Travessia pelo Lago de Lagazuoi e subida ate o Rifugio Lagazuoi (2.752 m). Descida ate o Passo Falzarego. Troca de bagagem no rifugio.",
  },
  {
    d: "06", icon: "🪨",
    t: "Passo Falzarego ate Lago Federa · Cinque Torri",
    s: "12,23 km · +788 m. Passagem pelos Cinque Torri — palco de batalhas da Primeira Guerra Mundial. Opção de bondinho. Chegada ao Lago Federa com rifugio de frente para a agua.",
  },
  {
    d: "07", icon: "🌿",
    t: "Lago Federa ate Monte Pelmo",
    s: "11,34 km · +386 m. O dia mais leve da travessia. Caminhada pela base do Monte Pelmo, montanha tradicional e icônica. Visuals impresionantes de campos de batalha da WWI.",
  },
  {
    d: "08", icon: "🧗",
    t: "Monte Pelmo ate Monte Civetta",
    s: "9,58 km · +733 m. Dia curto mas com substancial ganho altimétrico. Chegada antecipada ao rifugio com vista direta do Civetta. Caminhada opcional ao Lago di Coldai no final da tarde.",
  },
  {
    d: "09", icon: "🌄",
    t: "Civetta ate Capanna Alpina · Transfer para Cortina",
    s: "14,39 km · +369 m. Penultimo dia ao lado do Monte Civetta. Descida ingreme ate a Capanna Alpina. Transfer de retorno a Cortina d'Ampezzo passando pelo Passo Giau.",
  },
  {
    d: "10", icon: "🏁",
    t: "Transfer Cortina · Aeroporto Marco Polo",
    s: "Cafe da manha no hotel. Organizacao de bagagens. Transfer privado para o Aeroporto Marco Polo (Veneza) com chegada prevista as 14h. Fim dos servicos.",
  },
];

const INCLUSO = [
  "Transfer privado VAN Aeroporto Marco Polo → Cortina (ida e volta)",
  "3 noites em hotel duplo/triplo com cafe da manha em Cortina",
  "6 noites em rifugi (jantar + cafe da manha + banho)",
  "1 condutor brasileiro com certificacao internacional (primeiros socorros)",
  "Transfer privado Cortina ↔ Rifugio Auronzo (Tre Cime)",
  "Transfer privado Cortina → Lago di Braies (inicio da travessia)",
  "2 transfers de bagagem para troca de roupas nos rifugi (Dias 5 e 7)",
  "Rastreador satelital SPOT com acompanhamento remoto",
  "Apoio pre-viagem: orientacoes de equipamentos e mochila",
];

const NAO_INCLUSO = [
  "Passagem aerea internacional",
  "Seguro viagem para esportes de aventura (obrigatorio)",
  "Jantares nos dias 1, 2, 9 e 10",
  "Almoco em todos os dias",
  "Bebidas durante toda a viagem",
  "Atividades opcionais (bondinhos, via ferrata)",
  "Despesas pessoais",
];

// ============================================================
// PAGE
// ============================================================
export default function DolomitasAltaViaPage() {
  const datas2026 = datasDoAno(GRUPO, 2026);
  const datas2027 = datasDoAno(GRUPO, 2027);

  return (
    <main className="relative" style={{ background: D.creme }}>
      <Nav />

      {/* ===== HERO — AS TORRES ===== */}
      <section
        className="relative flex min-h-[100svh] w-full items-center overflow-hidden"
        style={{ background: D.notte }}
      >
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://static.wixstatic.com/media/2d4f5b_b3679b85ae3049609cb6df62340cf2f5~mv2.jpg')" }} />
        <div className="absolute inset-0"
          style={{ background: `linear-gradient(to right, ${D.notte}f2 0%, ${D.notte}b5 55%, ${D.notte}70 100%)` }} />
        <motion.div className="absolute inset-0 z-[1]" style={{ background: D.notte, pointerEvents: "none" }}
          initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 0.9, delay: 0.4 }} />

        <div className="relative z-10 mx-auto grid w-full max-w-[1400px] items-center gap-10 px-6 py-28 md:grid-cols-2 md:gap-16 md:px-10">
          <div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
              className="mb-4 flex items-center gap-3">
              <span className="text-2xl">🇮🇹</span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.4em]" style={{ color: D.rosso }}>
                Alpes Italianos · Dolomiti
              </span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
              className="font-display font-light uppercase leading-[0.86] tracking-[-0.02em]"
              style={{ fontSize: "clamp(3.2rem, 8vw, 7.5rem)", color: D.calcare }}>
              Dolomitas
              <br />
              <span style={{ color: D.rosso }}>Alta Via 1</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.48 }}
              className="mt-3 font-display font-light italic"
              style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)", color: D.calcare, opacity: 0.6 }}>
              Dez dias. Cem quilometros. Uma travessia.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.55 }}
              className="mt-6 max-w-md text-[15px] font-light leading-relaxed md:text-base"
              style={{ color: "rgba(232,221,208,0.72)" }}>
              A rota de trekking mais iconica dos Alpes Italianos conecta Veneza ao
              coracao das Dolomitas, de rifugio em rifugio, passando por Tre Cime,
              Lago di Braies e Monte Civetta.{" "}
              <span style={{ color: D.calcare }}>Italia vista de dentro.</span>
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.7 }}
              className="mt-8 flex flex-wrap items-center gap-5">
              <a href="#reservar"
                className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]"
                style={{ background: D.rosso, color: D.creme }}>
                Reserve sua vaga <span>&#8594;</span>
              </a>
              <span>
                <span className="text-[12px] uppercase tracking-[0.16em]" style={{ color: "rgba(232,221,208,0.5)" }}>
                  a partir de
                </span>{" "}
                <span className="font-display text-2xl" style={{ color: D.calcare }}>&euro; 5.450</span>
              </span>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.35 }}
            className="mx-auto hidden w-full max-w-[500px] md:block" style={{ height: 300 }}>
            <DolomiteSkyline />
          </motion.div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="grid grid-cols-2 gap-px md:grid-cols-3 lg:grid-cols-6"
        style={{ background: D.line, borderTop: `1px solid ${D.line}` }}>
        {STATS.map((s, i) => (
          <Reveal key={i} delay={i * 0.04}>
            <div className="flex flex-col px-6 py-8" style={{ background: D.bosco }}>
              <span className="font-display font-light leading-none"
                style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)", color: D.calcare }}>{s.v}</span>
              <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: D.rosso }}>{s.u}</span>
              <span className="mt-1 text-[12px] font-light" style={{ color: D.textSoft }}>{s.s}</span>
            </div>
          </Reveal>
        ))}
      </section>

      {/* ===== O ENROSADÜRA ===== */}
      <section className="relative w-full overflow-hidden" style={{ background: D.rossoDeep }}>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
          <span className="select-none font-display font-light uppercase"
            style={{ fontSize: "clamp(5rem,18vw,16rem)", color: "rgba(255,255,255,0.04)",
              letterSpacing: "-0.04em", lineHeight: 1, whiteSpace: "nowrap" }}>
            ENROSADÜRA
          </span>
        </div>
        <div className="relative z-10 mx-auto max-w-[1000px] px-6 py-32 text-center md:py-44">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em]"
              style={{ color: D.calcare, opacity: 0.55 }}>Fenomeno das Dolomitas</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display font-light leading-[1.05]"
              style={{ fontSize: "clamp(2.4rem,5.5vw,4.6rem)", color: D.creme }}>
              A montanha
              <br />
              que <span className="italic" style={{ color: D.calcare }}>pega fogo</span>
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mx-auto mt-8 max-w-2xl text-[16px] font-light leading-relaxed"
              style={{ color: "rgba(240,235,224,0.72)" }}>
              Em ladino antigo, &ldquo;enrosadüra&rdquo; descreve o instante em que
              as paredes de calcario das Dolomitas ficam rosadas. A rocha branca
              reflete a luz do por do sol e, por alguns minutos, as montanhas inteiras
              parecem em chamas.{" "}
              <span style={{ color: D.creme, fontStyle: "italic" }}>Voce tem que estar la.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== PERFIL DE ELEVAÇÃO ===== */}
      <section className="w-full overflow-hidden pb-0 pt-16" style={{ background: "#ffffff" }}>
        <div className="mx-auto px-4 md:px-8">
          <Reveal>
            <p className="mb-8 text-center text-[11px] font-semibold uppercase tracking-[0.4em]"
              style={{ color: D.rosso }}>
              Perfil da travessia · 10 dias · +5.116 m
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <ElevationProfile labelColor={D.notte} gridColor="rgba(0,0,0,0.1)" />
          </Reveal>
        </div>
      </section>

      {/* ===== 3 MARCOS: TRE CIME · BRAIES · CIVETTA ===== */}
      {MARCOS.map((m) => (
        <section key={m.id} className="w-full" style={{ background: m.bg }}>
          <div className={`grid md:grid-cols-2 ${m.imgDireita ? "" : "md:[direction:rtl]"}`}>
            {/* Imagem */}
            <div className="relative min-h-[420px] overflow-hidden md:min-h-[540px]"
              style={{ direction: "ltr" }}>
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-[1.03]"
                style={{ backgroundImage: `url('${m.img}')` }} />
              <div className="absolute inset-0"
                style={{ background: `linear-gradient(to bottom, transparent 35%, ${m.bg}cc 100%)` }} />
              <div className="absolute bottom-4 left-5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.3em]"
                  style={{ color: m.colors.detalhe }}>
                  {m.detalhe}
                </span>
              </div>
            </div>

            {/* Texto */}
            <div className="flex flex-col justify-center px-8 py-16 md:px-14 md:py-20"
              style={{ direction: "ltr" }}>
              <Reveal>
                <p className="text-[11px] font-semibold uppercase tracking-[0.35em]"
                  style={{ color: m.colors.kicker }}>
                  {m.kicker}
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-5 font-display font-light uppercase leading-[0.88]"
                  style={{ fontSize: "clamp(2.4rem,4.5vw,4rem)", color: m.colors.title }}>
                  {m.titulo[0]}
                  <br />
                  <span style={{ color: m.colors.titleAccent }}>{m.titulo[1]}</span>
                </h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-6 max-w-sm text-[15px] font-light leading-relaxed"
                  style={{ color: m.colors.body }}>
                  {m.texto}
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <a href="#contato"
                  className="mt-8 inline-flex w-fit items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] transition-opacity hover:opacity-70"
                  style={{ color: m.colors.link }}>
                  Quero vivenciar <span>&#8594;</span>
                </a>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      {/* ===== GALERIA ===== */}
      <section className="px-6 py-20 md:px-10 md:py-28" style={{ background: "#ffffff" }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: D.rosso }}>Galeria</p>
            <h2 className="mt-4 font-display font-light"
              style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: D.notte }}>
              O que voce vai viver
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-8"><GaleriaInterativa /></Reveal>
        </div>
      </section>

      {/* ===== ROTEIRO ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: D.bosco }}>
        <div className="mx-auto max-w-[1100px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: D.rosso }}>
              Roteiro dia a dia
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-3 max-w-lg text-[14px] font-light leading-relaxed" style={{ color: D.textSoft }}>
              Cortina d'Ampezzo como base — 2 noites de hotel antes e 1 depois da travessia.
              Oito dias de caminhada real entre rifugi historicos.
            </p>
          </Reveal>
          <div className="mt-12">
            {ROTEIRO.map((r, i) => (
              <Reveal key={r.d} delay={i * 0.04}>
                <div className="grid grid-cols-[auto_1fr] items-baseline gap-6 border-t py-7 md:gap-10"
                  style={{ borderColor: D.line }}>
                  <div className="flex items-center gap-4">
                    <span className="font-display text-sm" style={{ color: D.rosso }}>{r.d}</span>
                    <span className="text-lg">{r.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-display font-light"
                      style={{ fontSize: "clamp(1.1rem,2vw,1.5rem)", color: D.calcare }}>
                      {r.t}
                    </h3>
                    <p className="mt-1.5 text-[14px] font-light leading-relaxed" style={{ color: D.textSoft }}>{r.s}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RESERVE SUA VAGA ===== */}
      <section id="reservar" className="px-6 py-24 md:px-10 md:py-32" style={{ background: D.rossoDeep }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em]"
              style={{ color: D.calcare, opacity: 0.55 }}>Saidas confirmadas</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-display font-light leading-[1.05]"
              style={{ fontSize: "clamp(2rem,4.5vw,3.6rem)", color: D.creme }}>
              Quando voce quer
              <br />
              <span className="italic">cruzar as Dolomitas?</span>
            </h2>
          </Reveal>

          {/* Cards 2026 e 2027 lado a lado */}
          <Reveal delay={0.1}>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {/* 2026 */}
              {datas2026.map((d) => (
                <div key={d} className="rounded-2xl p-7"
                  style={{ background: "rgba(174,28,44,0.22)", border: `1px solid rgba(174,28,44,0.35)` }}>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]"
                      style={{ background: D.rosso, color: D.creme }}>confirmada</span>
                    <span className="text-[11px]" style={{ color: D.textSoft }}>10 dias</span>
                  </div>
                  <p className="mt-6 font-display font-light"
                    style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", color: D.creme }}>{d}</p>
                  <p className="mt-1 text-[12px] font-light" style={{ color: D.textSoft }}>
                    Alpes Italianos · Setembro 2026
                  </p>
                  <a href="#contato"
                    className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] transition-opacity hover:opacity-75"
                    style={{ color: D.calcare }}>
                    Reservar vaga &#8594;
                  </a>
                </div>
              ))}

              {/* 2027 */}
              {datas2027.map((d) => (
                <div key={d} className="rounded-2xl p-7"
                  style={{ background: "rgba(174,28,44,0.08)", border: `1px solid rgba(174,28,44,0.2)` }}>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]"
                      style={{ border: `1px solid ${D.rosso}`, color: D.rosso }}>2027</span>
                    <span className="text-[11px]" style={{ color: D.textSoft }}>10 dias</span>
                  </div>
                  <p className="mt-6 font-display font-light"
                    style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", color: D.creme }}>{d}</p>
                  <p className="mt-1 text-[12px] font-light" style={{ color: D.textSoft }}>
                    Alpes Italianos · Setembro 2027
                  </p>
                  <a href="#contato"
                    className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] transition-opacity hover:opacity-75"
                    style={{ color: D.calcare }}>
                    Reservar vaga &#8594;
                  </a>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-14 flex flex-col gap-4 border-t pt-10 md:flex-row md:items-center md:justify-between"
              style={{ borderColor: "rgba(174,28,44,0.3)" }}>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: D.textSoft }}>Investimento</p>
                <p className="mt-2 font-display font-light"
                  style={{ fontSize: "clamp(2rem,3.5vw,2.8rem)", color: D.creme }}>
                  &euro; 5.450
                  <span className="ml-3 text-[14px]" style={{ color: D.textSoft }}>
                    por pessoa · habitacao dupla
                  </span>
                </p>
                <p className="mt-1 text-[13px] font-light" style={{ color: D.textSoft }}>
                  30% de entrada + ate 5x sem juros no cartao. Vagas limitadas.
                </p>
              </div>
              <a href="#contato"
                className="inline-flex shrink-0 items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]"
                style={{ background: D.rosso, color: D.creme }}>
                Falar com a equipe &#8594;
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== INCLUSO / NÃO INCLUSO ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: D.bosco }}>
        <div className="mx-auto grid max-w-[1280px] gap-12 md:grid-cols-2 md:gap-20">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: D.rosso }}>Esta incluso</p>
            <ul className="mt-8 space-y-4">
              {INCLUSO.map((item) => (
                <li key={item} className="flex items-start gap-4 text-[14px] font-light leading-relaxed"
                  style={{ color: D.calcare }}>
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: D.rosso }} />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]"
              style={{ color: "rgba(174,28,44,0.55)" }}>Nao incluso</p>
            <ul className="mt-8 space-y-4">
              {NAO_INCLUSO.map((item) => (
                <li key={item} className="flex items-start gap-4 text-[14px] font-light leading-relaxed"
                  style={{ color: D.textSoft }}>
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: "rgba(174,28,44,0.35)" }} />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ===== AONIKIA ===== */}
      <section className="px-6 py-20 md:px-10 md:py-24" style={{ background: D.rossoDeep }}>
        <div className="mx-auto max-w-[860px] text-center">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em]"
              style={{ color: D.calcare, opacity: 0.55 }}>AonikIA · especialista nesta travessia</p>
            <h2 className="mt-5 font-display font-light leading-[1.15]"
              style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: D.creme }}>
              Pergunte tudo sobre as Dolomitas
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] font-light leading-relaxed"
              style={{ color: "rgba(240,235,224,0.65)" }}>
              O que levar, condicao fisica necessaria, como chegar a Veneza, melhor
              equipamento para os rifugi. A AonikIA conhece esta travessia de ponta
              a ponta.
            </p>
            <a href="#contato"
              className="mt-7 inline-flex items-center gap-3 rounded-full border px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 hover:opacity-80"
              style={{ borderColor: D.calcare, color: D.calcare }}>
              Conversar com a AonikIA <span>&#8594;</span>
            </a>
          </Reveal>
        </div>
      </section>

      <Contato />
      <Footer />
      <FloatingActions />
    </main>
  );
}
