"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Contato from "../../components/Contato";
import FloatingActions from "../../components/FloatingActions";
import { Reveal, EASE } from "../../components/ui";

const F = {
  noite:    "#0d1730",   // azul-noite devocional (base)
  indigo:   "#15203f",
  azul:     "#2a3a66",   // azul mariano
  oceano:   "#2f5d6b",   // Atlântico de Nazaré
  candeia:  "#d8a24a",   // dourado de vela (assinatura)
  candVivo: "#f0c878",
  pedra:    "#c9bca0",   // pedra dos mosteiros
  marfim:   "#f1ead9",   // marfim
  sage:     "#7a8f72",
  textSoft: "rgba(241,234,217,0.62)",
};

/* Fotos reais da rota Nazaré a Fátima (acervos Caminhos de Portugal + Portugal A2Z). */
const P = "/images/caminhos-autoguiados/nazare-fatima";
const IMG = {
  hero:    `${P}/hero.jpg`,        // peregrinos na falésia de Nazaré, farol e Atlântico
  baia:    `${P}/baia.jpg`,        // baía e areal de Nazaré do alto
  batalha: `${P}/batalha.jpg`,     // caminhantes rumo ao Mosteiro da Batalha
  chegada: `${P}/porto-mos.jpg`,   // peregrinos no alto do castelo de Porto de Mós
};

// ============================================================
// SVG: OndaELuz — a onda de Nazaré embaixo, a luz de Fátima no
// alto, e o caminho de fé que liga o mar ao santuário.
// ============================================================
function OndaELuz() {
  const ondaFill = "M -20,468 C 80,438 140,452 210,470 C 270,486 340,470 480,460 L 480,540 L -20,540 Z";
  const ondaLinha = "M -20,468 C 80,438 140,452 210,470 C 270,486 340,470 480,460";
  const caminho = "M 150,440 C 205,402 244,360 250,318 C 256,278 188,250 200,208 C 210,172 236,150 230,122";
  const raios = Array.from({ length: 8 }, (_, i) => {
    const a = (Math.PI * 2 * i) / 8 - Math.PI / 2;
    return [230 + Math.cos(a) * 26, 96 + Math.sin(a) * 26, 230 + Math.cos(a) * 46, 96 + Math.sin(a) * 46];
  });
  const pts = [
    { x: 150, y: 440, label: "Nazaré",   sub: "as ondas gigantes", c: F.oceano,  anchor: "start"  as const },
    { x: 250, y: 318, label: "Alcobaça", sub: "o mosteiro",        c: F.pedra,   anchor: "start"  as const },
    { x: 200, y: 208, label: "Batalha",  sub: "joia do gótico",    c: F.pedra,   anchor: "end"    as const },
    { x: 230, y: 122, label: "Fátima",   sub: "o santuário",       c: F.candVivo,anchor: "middle" as const, dy: -16 },
  ];

  return (
    <svg viewBox="0 0 460 540" className="h-full w-full" style={{ overflow: "visible" }}>
      {/* luz de Fátima — halo + raios pulsantes */}
      <motion.circle cx="230" cy="96" r="40" fill={F.candeia} fillOpacity={0.12}
        initial={{ opacity: 0 }} animate={{ opacity: [0.08, 0.2, 0.08] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
      {raios.map(([x1, y1, x2, y2], i) => (
        <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={F.candVivo} strokeWidth="1.2"
          strokeLinecap="round"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: [0.3, 0.8, 0.3], pathLength: 1 }}
          transition={{ opacity: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 },
            pathLength: { duration: 1, delay: 0.6 + i * 0.08 } }} />
      ))}
      <motion.circle cx="230" cy="96" r="11" fill={F.candVivo} fillOpacity="0.9"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.6, delay: 0.4, ease: EASE }} />
      <motion.circle cx="230" cy="96" r="20" fill="none" stroke={F.candeia} strokeWidth="1"
        animate={{ r: [20, 34, 20], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />

      {/* caminho de fé */}
      <motion.path d={caminho} fill="none" stroke={F.candeia} strokeWidth="2.4" strokeLinecap="round"
        strokeOpacity="0.5"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 2.8, ease: EASE, delay: 0.8 }} />
      <motion.path d={caminho} fill="none" stroke={F.marfim} strokeWidth="2.2" strokeLinecap="round"
        strokeDasharray="9 480"
        initial={{ strokeDashoffset: 490, opacity: 0 }}
        animate={{ strokeDashoffset: [490, 0], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2.6 }} />

      {/* onda de Nazaré */}
      <motion.path d={ondaFill} fill={F.oceano} fillOpacity={0.18}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4, delay: 1 }} />
      <motion.path d={ondaLinha} fill="none" stroke={F.oceano} strokeWidth="2.4" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.4, ease: EASE, delay: 0.6 }} />
      {/* espuma */}
      {[[120, 462], [210, 470], [320, 466]].map(([x, y], i) => (
        <motion.circle key={i} cx={x} cy={y} r="2" fill={F.marfim}
          initial={{ opacity: 0 }} animate={{ opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }} />
      ))}

      {/* waypoints */}
      {pts.map((p, i) => (
        <motion.g key={p.label}
          initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE, delay: 1.4 + i * 0.35 }}>
          <motion.circle cx={p.x} cy={p.y} r="6" fill="none" stroke={p.c} strokeWidth="1.2"
            animate={{ r: [6, 14, 6], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut", delay: i * 0.5 }} />
          <circle cx={p.x} cy={p.y} r="5" fill={F.noite} stroke={p.c} strokeWidth="2" />
          <circle cx={p.x} cy={p.y} r="1.8" fill={p.c} />
          <text x={p.x + (p.anchor === "start" ? 12 : p.anchor === "end" ? -12 : 0)} y={p.y + (p.dy ?? 18)}
            fill={F.marfim} fontSize="12.5" textAnchor={p.anchor} letterSpacing="0.5"
            style={{ fontFamily: "'Fraunces', Georgia, serif" }}>{p.label}</text>
          <text x={p.x + (p.anchor === "start" ? 12 : p.anchor === "end" ? -12 : 0)} y={p.y + (p.dy ?? 18) + 13}
            fill={p.c} fontSize="8" textAnchor={p.anchor} letterSpacing="1.2" opacity="0.9"
            style={{ fontFamily: "sans-serif", textTransform: "uppercase" }}>{p.sub}</text>
        </motion.g>
      ))}

      <motion.text x="110" y="300" fill={F.candeia} fontSize="11" letterSpacing="3"
        textAnchor="middle" opacity="0.5"
        initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 2.4, duration: 1 }}
        style={{ fontStyle: "italic" }}>56 km</motion.text>
    </svg>
  );
}

// ============================================================
// ElevationProfile — do mar (Nazaré) ao planalto (Fátima)
// ============================================================
const HILL_PATH =
  "M 0,200 L 80,200 L 110,176 L 220,176 L 250,150 L 400,150 " +
  "L 430,128 L 560,128 L 590,112 L 720,112 L 750,92 L 960,92";
const HILL_FILL = HILL_PATH + " L 960,248 L 0,248 Z";

const PERFIL = [
  { x: 14,  y: 200, label: "Nazaré",      sub: "0 m · mar",   anchor: "start"  as const },
  { x: 250, y: 150, label: "Alcobaça",    sub: "16,2 km",     anchor: "middle" as const },
  { x: 430, y: 128, label: "Porto de Mós", sub: "19,5 km",    anchor: "middle" as const },
  { x: 590, y: 112, label: "Batalha",     sub: "10,2 km",     anchor: "middle" as const },
  { x: 946, y: 92,  label: "Fátima",      sub: "santuário",   anchor: "end"    as const },
];

function ElevationProfile() {
  return (
    <svg viewBox="0 0 960 260" className="w-full" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="nfFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={F.candeia}  stopOpacity="0.34" />
          <stop offset="55%" stopColor={F.azul} stopOpacity="0.26" />
          <stop offset="100%" stopColor={F.azul} stopOpacity="0.04" />
        </linearGradient>
      </defs>
      {[90, 130, 170, 210].map((y) => (
        <line key={y} x1={0} y1={y} x2={960} y2={y} stroke="rgba(216,162,74,0.14)" strokeWidth="0.5" />
      ))}
      <path d={HILL_FILL} fill="url(#nfFill)" />
      <motion.path d={HILL_PATH} fill="none" stroke={F.candeia} strokeWidth="2.2"
        strokeLinejoin="round" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true }}
        transition={{ duration: 4.2, ease: EASE, delay: 0.2 }} />
      {PERFIL.map((w) => (
        <g key={w.label}>
          <line x1={w.x} y1={w.y} x2={w.x} y2={228} stroke={F.candeia} strokeWidth="1"
            strokeDasharray="2 4" strokeOpacity="0.4" />
          <circle cx={w.x} cy={w.y} r="4.5" fill={F.indigo} stroke={F.candeia} strokeWidth="1.8" />
          <circle cx={w.x} cy={w.y} r="1.8" fill={F.candeia} />
          <text x={w.x} y={w.y - 10} fill={F.marfim} fontSize="10" textAnchor={w.anchor}
            letterSpacing="0.5" style={{ fontFamily: "sans-serif" }}>{w.label}</text>
          <text x={w.x} y={w.y - 22} fill={F.candeia} fontSize="8.5" textAnchor={w.anchor}
            letterSpacing="1.2" opacity="0.9"
            style={{ fontFamily: "sans-serif", textTransform: "uppercase" }}>{w.sub}</text>
        </g>
      ))}
    </svg>
  );
}

// ============================================================
// GaleriaInterativa
// ============================================================
const GALERIA = [
  { src: `${P}/baia.jpg`,        cap: "A baía e o areal de Nazaré vistos do alto da falésia", tag: "Nazaré" },
  { src: `${P}/santuario.jpg`,   cap: "O Santuário no Sítio da Nazaré, debruçado sobre o Atlântico", tag: "O Sítio" },
  { src: `${P}/vinhas.jpg`,      cap: "Peregrinos atravessam campos e vinhas rumo ao interior", tag: "O Caminho" },
  { src: `${P}/porto-mos.jpg`,   cap: "O castelo de Porto de Mós, a meio da peregrinação", tag: "Porto de Mós" },
  { src: `${P}/aldeia.jpg`,      cap: "Aldeias de pedra no coração de Portugal", tag: "Aldeias" },
  { src: `${P}/batalha.jpg`,     cap: "A chegada ao Mosteiro da Batalha, joia do gótico", tag: "Os Mosteiros" },
  { src: `${P}/serra.jpg`,       cap: "A serra verde entre Alcobaça e Fátima", tag: "Serra" },
  { src: `${P}/sinalizacao.jpg`, cap: "Os marcos do Caminho de Fátima guiam cada etapa", tag: "Sinalização" },
];

function GaleriaInterativa() {
  const [idx, setIdx] = useState(0);
  const img = GALERIA[idx];
  return (
    <div className="space-y-3">
      <AnimatePresence mode="wait">
        <motion.div key={idx} initial={{ opacity: 0.5, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }} transition={{ duration: 0.45, ease: EASE }}
          className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "16/9" }}>
          <img src={img.src} alt={img.cap} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${F.noite}cc 0%, transparent 55%)` }} />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em]" style={{ color: F.candeia }}>{img.tag}</span>
            <p className="mt-1 text-[14px] font-light" style={{ color: F.marfim }}>{img.cap}</p>
          </div>
          <div className="absolute right-4 top-4">
            <span className="text-[11px] font-medium" style={{ color: "rgba(241,234,217,0.55)" }}>{idx + 1}/{GALERIA.length}</span>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-4 lg:grid-cols-8">
        {GALERIA.map((g, i) => (
          <button key={i} onClick={() => setIdx(i)} aria-label={g.tag}
            className="relative aspect-[16/10] overflow-hidden rounded-lg transition-all duration-300"
            style={{ opacity: i === idx ? 1 : 0.5,
              outline: i === idx ? `2px solid ${F.candeia}` : "2px solid transparent", outlineOffset: 2 }}>
            <img src={g.src} alt={g.tag}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.06]" />
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
  { v: "6",         u: "dias",        s: "5 noites" },
  { v: "56",        u: "quilômetros", s: "4 etapas a pé" },
  { v: "2",         u: "mosteiros",   s: "Alcobaça e Batalha, UNESCO" },
  { v: "2",         u: "pessoas",     s: "saída mínima, no seu ritmo" },
  { v: "Santuário", u: "de Fátima",   s: "o destino da peregrinação" },
  { v: "Nazaré",    u: "as ondas gigantes", s: "início à beira-mar" },
];

const COMO_FUNCIONA = [
  { icon: "flag",    t: "Você escolhe a data",
    s: "Saídas o ano todo, exceto Agosto. Sem grupo fixo, você caminha no próprio ritmo, sozinho ou em dupla." },
  { icon: "pin",     t: "App com GPS e mapas",
    s: "Aplicativo com mapas de GPS e descrição de cada etapa, e a sinalização própria do Caminho de Fátima ao longo do trajeto." },
  { icon: "village", t: "Bagagem e hospedagem resolvidas",
    s: "Hotéis selecionados com café da manhã, bagagem transportada (1 mala até 15 kg) e linha de apoio 24 horas." },
  { icon: "candle",  t: "O peso só da fé",
    s: "Você caminha leve, com a mochila do dia, do mar de Nazaré até o Santuário de Fátima. O resto é só caminho." },
];

const MARCOS = [
  {
    id: "nf-nazare",
    kicker: "O ponto de partida",
    titulo: ["O Mar de", "Nazaré"],
    texto:
      "A peregrinação começa à beira do Atlântico, na vila de Nazaré, famosa pelas maiores ondas surfadas do mundo. Lá em cima, no Sítio, o santuário olha para o mar e para a falésia onde os surfistas desafiam montanhas de água. É daqui, do oceano, que o caminho parte rumo ao interior.",
    detalhe: "Sítio da Nazaré · ondas gigantes · Atlântico",
    img: IMG.baia,
    bg: F.indigo,
    imgDireita: true,
    colors: {
      kicker: F.oceano, title: F.marfim, titleAccent: F.candeia,
      body: "rgba(241,234,217,0.78)", detalhe: F.candeia, link: F.marfim,
    },
  },
  {
    id: "nf-mosteiros",
    kicker: "Pedra que virou oração",
    titulo: ["Os", "Mosteiros"],
    texto:
      "Entre Nazaré e Fátima, o caminho passa por dois dos mais belos monumentos de Portugal: o Mosteiro de Alcobaça, com a igreja gótica e a lenda de amor de Pedro e Inês, e o Mosteiro da Batalha, obra-prima do gótico manuelino. Dois Patrimônios da Humanidade, encontrados a pé.",
    detalhe: "Alcobaça · Batalha · Patrimônio UNESCO",
    img: IMG.batalha,
    bg: F.azul,
    imgDireita: false,
    colors: {
      kicker: F.pedra, title: F.marfim, titleAccent: F.pedra,
      body: "rgba(241,234,217,0.8)", detalhe: F.marfim, link: F.marfim,
    },
  },
  {
    id: "nf-fatima",
    kicker: "O destino",
    titulo: ["A Chegada a", "Fátima"],
    texto:
      "Depois de quatro dias caminhando, a entrada no Santuário de Fátima tem um peso diferente. A Capelinha das Aparições, a explanada imensa, o silêncio de quem chegou. Não importa a sua fé: chegar a pé a um lugar que move milhões de pessoas é uma experiência que fica.",
    detalhe: "A pé rumo ao Santuário de Fátima",
    img: IMG.chegada,
    bg: F.noite,
    imgDireita: true,
    colors: {
      kicker: F.candeia, title: F.marfim, titleAccent: F.candVivo,
      body: "rgba(241,234,217,0.82)", detalhe: F.candVivo, link: F.marfim,
    },
  },
];

const EXPERIENCIAS = [
  { icon: "wave",    t: "Sítio da Nazaré",       s: "O santuário sobre a falésia e as ondas gigantes lá embaixo, no início do caminho.", tag: "Dia 1" },
  { icon: "village", t: "Mosteiro de Alcobaça",  s: "A grande igreja gótica e a lenda de amor de Pedro e Inês de Castro.",               tag: "Dia 2" },
  { icon: "pin",     t: "Porto de Mós",          s: "O castelo e a vila a meio caminho, ponto de descanso da rota.",                     tag: "Dia 3" },
  { icon: "village", t: "Mosteiro da Batalha",   s: "Uma obra-prima do gótico manuelino, Patrimônio da Humanidade.",                     tag: "Dia 4" },
  { icon: "candle",  t: "Santuário de Fátima",   s: "A chegada, a Capelinha das Aparições e o silêncio do destino.",                     tag: "Dia 5" },
  { icon: "flag",    t: "Caminho de Fátima",     s: "A sinalização própria, com os marcos azuis que guiam o peregrino até o santuário.", tag: "A rota" },
];

const ROTEIRO = [
  { d: "01", icon: "plane",   t: "Chegada a Nazaré",
    s: "Transfer opcional de Lisboa ou Porto. Briefing com a equipe e hospedagem em Nazaré, à beira-mar. Tempo para conhecer o Sítio e a falésia das ondas gigantes." },
  { d: "02", icon: "boot",    t: "Nazaré a Alcobaça",
    s: "16,2 km · Primeira etapa, do mar ao interior, até a vila histórica do Mosteiro de Alcobaça, Patrimônio UNESCO." },
  { d: "03", icon: "boot",    t: "Alcobaça a Porto de Mós",
    s: "19,5 km · A etapa mais longa, por campos e aldeias, até o castelo de Porto de Mós." },
  { d: "04", icon: "boot",    t: "Porto de Mós a Batalha",
    s: "10,2 km · A etapa mais curta, aproximando-se do destino, até o imponente Mosteiro da Batalha." },
  { d: "05", icon: "candle",  t: "Batalha a Fátima",
    s: "19,0 km · A etapa final, a chegada ao Santuário de Fátima. O fim da peregrinação." },
  { d: "06", icon: "flag",    t: "Partida de Fátima",
    s: "Café da manhã e transfer opcional para Lisboa ou Porto. Fim das operações." },
];

const INCLUSO = [
  "5 noites com café da manhã em hotéis selecionados",
  "Transporte de bagagem (1 mala, até 15 kg)",
  "App com mapas de GPS e descrição de cada etapa",
  "Briefing com a equipe na chegada",
  "Seguro de Acidentes Pessoais",
  "Linha de apoio 24 horas",
];

const NAO_INCLUSO = [
  "Passagens aéreas",
  "Transfers de e para aeroportos (podem ser contratados à parte)",
  "Almoços e jantares",
  "Entradas em museus e monumentos",
  "Seguro viagem",
  "Equipamento e despesas pessoais",
];

function Icon({ name, size = 22, color = "currentColor" }: { name: string; size?: number; color?: string }) {
  const s = {
    width: size, height: size, stroke: color, fill: "none",
    strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
    display: "block", flexShrink: 0,
  };
  switch (name) {
    case "wave":
      return <svg viewBox="0 0 24 24" style={s}><path d="M2 9 C5 5.5 8 5.5 11 9 C14 12.5 17 12.5 20 9" /><path d="M2 15 C5 11.5 8 11.5 11 15 C14 18.5 17 18.5 20 15" strokeOpacity="0.6" /></svg>;
    case "candle":
      return <svg viewBox="0 0 24 24" style={s}><path d="M12 2 C13.5 4 13.5 6 12 7 C10.5 6 10.5 4 12 2 Z" /><rect x="9" y="9" width="6" height="12" rx="1" /><line x1="12" y1="7" x2="12" y2="9" /></svg>;
    case "boot":
      return <svg viewBox="0 0 24 24" style={s}><path d="M5 20 L5 7 C5 5.5 6 4 8 4 L8 12 C10 12 14 14 17 16 L19 20 Z" /><line x1="4" y1="20" x2="20" y2="20" /></svg>;
    case "village":
      return <svg viewBox="0 0 24 24" style={s}><path d="M3 20 V11 L9 5 L15 11 V20" /><path d="M15 14 L20 10 V20" /><line x1="3" y1="20" x2="21" y2="20" /><rect x="7" y="14.5" width="4" height="5.5" /></svg>;
    case "plane":
      return <svg viewBox="0 0 24 24" style={s}><path d="M22 16 L2 9 L5 8 L9 10 L14 3 L16 4 L13 11 L18 13 Z" /></svg>;
    case "flag":
      return <svg viewBox="0 0 24 24" style={s}><line x1="5" y1="3" x2="5" y2="21" /><path d="M5 3 L19 7 L5 12 Z" /></svg>;
    case "pin":
      return <svg viewBox="0 0 24 24" style={s}><path d="M12 2 C8.5 2 5.5 5 5.5 9 C5.5 14.5 12 22 12 22 C12 22 18.5 14.5 18.5 9 C18.5 5 15.5 2 12 2 Z" /><circle cx="12" cy="9" r="3" /></svg>;
    default:
      return null;
  }
}

// ============================================================
// PAGE
// ============================================================
export default function NazareAFatimaPage() {
  return (
    <main className="relative" style={{ background: F.marfim }}>
      <Nav />

      {/* ===== HERO ===== */}
      <section className="relative flex min-h-[100svh] w-full items-center overflow-hidden" style={{ background: F.noite }}>
        <motion.div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${IMG.hero}')`, backgroundPosition: "center 35%" }}
          initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 14, ease: "easeOut" }} />
        <div className="absolute inset-0"
          style={{ background: `linear-gradient(to right, ${F.noite}f2 0%, ${F.noite}b4 52%, ${F.noite}70 100%)` }} />
        <motion.div className="absolute inset-0 z-[1]" style={{ background: F.noite, pointerEvents: "none" }}
          initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 0.9, delay: 0.4 }} />

        <div className="relative z-10 mx-auto grid w-full max-w-[1400px] items-center gap-10 px-6 py-28 md:grid-cols-2 md:gap-16 md:px-10">
          <div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 }} className="mb-4 flex items-center gap-3">
              <Icon name="pin" size={14} color={F.candeia} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.4em]" style={{ color: F.candeia }}>
                Caminhos de Portugal · Peregrinação
              </span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
              className="font-display font-light uppercase leading-[0.86] tracking-[-0.02em]"
              style={{ fontSize: "clamp(2.8rem, 7.5vw, 7rem)", color: F.marfim }}>
              Nazaré
              <br />
              <span style={{ color: F.candeia }}>a Fátima</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.48 }}
              className="mt-3 font-display font-light italic"
              style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)", color: F.marfim, opacity: 0.64 }}>
              Do mar das ondas gigantes ao Santuário. Seis dias de fé a pé.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.55 }}
              className="mt-6 max-w-md text-[15px] font-light leading-relaxed md:text-base"
              style={{ color: "rgba(241,234,217,0.74)" }}>
              Uma peregrinação pelo coração de Portugal, do oceano de Nazaré aos mosteiros góticos de
              Alcobaça e Batalha, até a chegada ao Santuário de Fátima. Autoguiado, com bagagem e
              hospedagens{" "}
              <span style={{ color: F.marfim }}>resolvidas.</span>
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.7 }} className="mt-8 flex flex-wrap items-center gap-5">
              <a href="#reservar"
                className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]"
                style={{ background: F.candeia, color: F.noite }}>
                Quero fazer o caminho <span>&#8594;</span>
              </a>
              <span>
                <span className="text-[12px] uppercase tracking-[0.16em]" style={{ color: "rgba(241,234,217,0.5)" }}>a partir de</span>{" "}
                <span className="font-display text-2xl" style={{ color: F.marfim }}>€ 870</span>
              </span>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.95 }}
              className="mt-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.16em]"
              style={{ borderColor: F.candeia, color: F.candeia }}>
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: F.candeia }} />
              Saídas o ano todo, exceto Agosto · no seu ritmo
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.35 }}
            className="mx-auto hidden w-full max-w-[440px] md:block" style={{ height: 480 }}>
            <OndaELuz />
          </motion.div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="grid grid-cols-2 gap-px md:grid-cols-3 lg:grid-cols-6"
        style={{ background: "rgba(216,162,74,0.18)", borderTop: `1px solid rgba(216,162,74,0.18)` }}>
        {STATS.map((s, i) => (
          <Reveal key={i} delay={i * 0.04}>
            <div className="flex flex-col px-6 py-8" style={{ background: F.indigo }}>
              <span className="font-display font-light leading-none" style={{ fontSize: "clamp(1.5rem,3vw,2.3rem)", color: F.marfim }}>{s.v}</span>
              <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: F.candeia }}>{s.u}</span>
              <span className="mt-1 text-[12px] font-light" style={{ color: F.textSoft }}>{s.s}</span>
            </div>
          </Reveal>
        ))}
      </section>

      {/* ===== CENTERPIECE ===== */}
      <section className="relative w-full overflow-hidden" style={{ background: F.marfim }}>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
          <span className="select-none font-display font-light uppercase"
            style={{ fontSize: "clamp(4rem,15vw,13rem)", color: "rgba(42,58,102,0.06)",
              letterSpacing: "-0.04em", lineHeight: 1, whiteSpace: "nowrap" }}>
            FÁTIMA
          </span>
        </div>
        <div className="relative z-10 mx-auto max-w-[1000px] px-6 py-32 text-center md:py-44">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em]" style={{ color: F.candeia }}>
              Uma das grandes peregrinações do mundo
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display font-light leading-[1.05]" style={{ fontSize: "clamp(2.2rem,5vw,4.4rem)", color: F.azul }}>
              Do mar ao santuário,
              <br />
              <span className="italic" style={{ color: F.candeia }}>um caminho de fé</span>
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mx-auto mt-8 max-w-2xl text-[16px] font-light leading-relaxed" style={{ color: "rgba(13,23,48,0.6)" }}>
              Você não precisa ser religioso para sentir o que este caminho tem. Sair do oceano de
              Nazaré, atravessar mosteiros que são obras-primas do gótico e chegar a pé a Fátima é uma
              forma antiga e honesta de viajar.{" "}
              <span style={{ color: F.azul, fontStyle: "italic" }}>A fé é opcional, a emoção não.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== PERFIL DE ELEVAÇÃO ===== */}
      <section className="w-full overflow-hidden pb-0 pt-16" style={{ background: F.indigo }}>
        <div className="mx-auto px-4 md:px-8">
          <Reveal>
            <p className="mb-8 text-center text-[11px] font-semibold uppercase tracking-[0.4em]" style={{ color: F.candeia, opacity: 0.85 }}>
              Perfil da caminhada · 56 km · Nazaré a Fátima
            </p>
          </Reveal>
          <Reveal delay={0.05}><ElevationProfile /></Reveal>
        </div>
      </section>

      {/* ===== COMO FUNCIONA ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: F.indigo, color: F.marfim }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: F.candeia }}>
              <span className="h-px w-8" style={{ background: F.candeia }} />
              Como funciona o autoguiado
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 max-w-2xl font-display font-light leading-[1.05]" style={{ fontSize: "clamp(2rem,4vw,3.2rem)", color: F.marfim }}>
              A liberdade do seu tempo,
              <br />
              <span className="italic" style={{ color: F.candeia }}>a segurança da curadoria</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {COMO_FUNCIONA.map((c, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="h-full rounded-2xl p-7"
                  style={{ background: "rgba(216,162,74,0.07)", border: `1px solid rgba(216,162,74,0.2)` }}>
                  <Icon name={c.icon} size={24} color={F.candeia} />
                  <h3 className="mt-5 font-display font-light" style={{ fontSize: "1.2rem", color: F.marfim }}>{c.t}</h3>
                  <p className="mt-2 text-[13px] font-light leading-relaxed" style={{ color: F.textSoft }}>{c.s}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3 MARCOS ===== */}
      {MARCOS.map((m) => (
        <section key={m.id} className="w-full" style={{ background: m.bg }}>
          <div className={`grid md:grid-cols-2 ${m.imgDireita ? "" : "md:[direction:rtl]"}`}>
            <div className="relative min-h-[420px] overflow-hidden md:min-h-[560px]" style={{ direction: "ltr" }}>
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-[1.03]"
                style={{ backgroundImage: `url('${m.img}')` }} />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 35%, ${m.bg}cc 100%)` }} />
              <div className="absolute bottom-4 left-5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: m.colors.detalhe }}>{m.detalhe}</span>
              </div>
            </div>
            <div className="flex flex-col justify-center px-8 py-16 md:px-14 md:py-20" style={{ direction: "ltr" }}>
              <Reveal>
                <p className="text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: m.colors.kicker }}>{m.kicker}</p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-5 font-display font-light uppercase leading-[0.88]" style={{ fontSize: "clamp(2.2rem,4.2vw,3.7rem)", color: m.colors.title }}>
                  {m.titulo[0]}
                  <br />
                  <span style={{ color: m.colors.titleAccent }}>{m.titulo[1]}</span>
                </h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-6 max-w-sm text-[15px] font-light leading-relaxed" style={{ color: m.colors.body }}>{m.texto}</p>
              </Reveal>
              <Reveal delay={0.2}>
                <a href="#reservar" className="mt-8 inline-flex w-fit items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] transition-opacity hover:opacity-70" style={{ color: m.colors.link }}>
                  Quero vivenciar <span>&#8594;</span>
                </a>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      {/* ===== EXPERIÊNCIAS ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: F.azul }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: F.pedra }}>O que o caminho guarda</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 font-display font-light leading-[1.05]" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: F.marfim }}>
              Cada dia, um marco
              <br />
              <span className="italic" style={{ color: F.candVivo }}>de Portugal</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {EXPERIENCIAS.map((e, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="group relative rounded-2xl p-7 transition-all duration-300"
                  style={{ background: "rgba(216,162,74,0.08)", border: `1px solid rgba(216,162,74,0.2)` }}>
                  <div className="mb-4 flex items-center justify-between">
                    <Icon name={e.icon} size={22} color={F.candVivo} />
                    <span className="rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.2em]"
                      style={{ background: "rgba(13,23,48,0.5)", color: F.candVivo }}>{e.tag}</span>
                  </div>
                  <h3 className="font-display font-light" style={{ fontSize: "1.15rem", color: F.marfim }}>{e.t}</h3>
                  <p className="mt-2 text-[13px] font-light leading-relaxed" style={{ color: F.textSoft }}>{e.s}</p>
                  <div className="mt-4 h-px w-0 transition-all duration-500 group-hover:w-full" style={{ background: F.candeia }} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GALERIA ===== */}
      <section className="px-6 py-20 md:px-10 md:py-28" style={{ background: F.indigo }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: F.candeia }}>Galeria</p>
            <h2 className="mt-4 font-display font-light" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: F.marfim }}>
              O que você vai viver
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-8"><GaleriaInterativa /></Reveal>
        </div>
      </section>

      {/* ===== ROTEIRO ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: F.marfim }}>
        <div className="mx-auto max-w-[1100px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: F.candeia }}>Roteiro dia a dia</p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-3 max-w-lg text-[14px] font-light leading-relaxed" style={{ color: "rgba(13,23,48,0.55)" }}>
              Seis dias do mar ao santuário, com quatro etapas a pé, passando pelos mosteiros de
              Alcobaça e Batalha, de Nazaré até Fátima.
            </p>
          </Reveal>
          <div className="mt-12">
            {ROTEIRO.map((r, i) => (
              <Reveal key={r.d} delay={i * 0.04}>
                <div className="grid grid-cols-[auto_1fr] items-baseline gap-6 border-t py-7 md:gap-10"
                  style={{ borderColor: "rgba(42,58,102,0.18)" }}>
                  <div className="flex items-center gap-4">
                    <span className="font-display text-sm" style={{ color: "rgba(13,23,48,0.32)" }}>{r.d}</span>
                    <Icon name={r.icon} size={18} color={F.candeia} />
                  </div>
                  <div>
                    <h3 className="font-display font-light" style={{ fontSize: "clamp(1.1rem,2vw,1.5rem)", color: F.azul }}>{r.t}</h3>
                    <p className="mt-1.5 text-[14px] font-light leading-relaxed" style={{ color: "rgba(13,23,48,0.58)" }}>{r.s}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RESERVE + PREÇO ===== */}
      <section id="reservar" className="px-6 py-24 md:px-10 md:py-32" style={{ background: F.noite }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: F.marfim, opacity: 0.6 }}>Tarifas e datas</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-display font-light leading-[1.05]" style={{ fontSize: "clamp(2rem,4.5vw,3.6rem)", color: F.marfim }}>
              Você escolhe
              <br />
              <span className="italic" style={{ color: F.candeia }}>quando partir</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-xl text-[15px] font-light leading-relaxed" style={{ color: F.textSoft }}>
              Saídas o ano todo, exceto Agosto, com saída mínima de 2 pessoas. A tarifa varia conforme
              a temporada.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              <div className="rounded-2xl p-7" style={{ background: "rgba(42,58,102,0.35)", border: `1px solid rgba(42,58,102,0.6)` }}>
                <div className="flex items-center justify-between">
                  <span className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ border: `1px solid ${F.azul}`, color: F.marfim }}>Baixa e Média</span>
                  <span className="text-[11px]" style={{ color: F.textSoft }}>Jan a Mai · Out a Dez</span>
                </div>
                <p className="mt-6 font-display font-light" style={{ fontSize: "clamp(2rem,3.5vw,2.8rem)", color: F.marfim }}>€ 870</p>
                <p className="mt-1 text-[12px] font-light" style={{ color: F.textSoft }}>por pessoa · quarto duplo</p>
                <p className="mt-4 text-[12px] font-light" style={{ color: F.textSoft }}>Suplemento individual: + € 500</p>
              </div>

              <div className="rounded-2xl p-7" style={{ background: "rgba(216,162,74,0.12)", border: `1px solid rgba(216,162,74,0.45)` }}>
                <div className="flex items-center justify-between">
                  <span className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ background: F.candeia, color: F.noite }}>Temporada Alta</span>
                  <span className="text-[11px]" style={{ color: F.textSoft }}>Jun, Jul, Set</span>
                </div>
                <p className="mt-6 font-display font-light" style={{ fontSize: "clamp(2rem,3.5vw,2.8rem)", color: F.marfim }}>€ 950</p>
                <p className="mt-1 text-[12px] font-light" style={{ color: F.textSoft }}>por pessoa · quarto duplo</p>
                <p className="mt-4 text-[12px] font-light" style={{ color: F.textSoft }}>Suplemento individual: + € 500</p>
              </div>

              <div className="rounded-2xl p-7" style={{ background: "rgba(216,162,74,0.06)", border: `1px solid rgba(216,162,74,0.2)` }}>
                <div className="flex items-center justify-between">
                  <span className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ border: `1px solid ${F.candeia}`, color: F.candeia }}>Reserva</span>
                  <span className="text-[11px]" style={{ color: F.textSoft }}>mín. 2 pessoas</span>
                </div>
                <p className="mt-6 font-display font-light" style={{ fontSize: "clamp(1.3rem,2.5vw,1.9rem)", color: F.marfim }}>
                  No seu ritmo
                </p>
                <div className="mt-4 space-y-2 text-[12px] font-light" style={{ color: F.textSoft }}>
                  <p>30% de entrada via Pix ou transferência</p>
                  <p>+ 5x sem juros no cartão de crédito</p>
                  <p>Agosto não opera</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-col items-start justify-between gap-5 border-t pt-8 sm:flex-row sm:items-center" style={{ borderColor: "rgba(216,162,74,0.3)" }}>
              <p className="max-w-md text-[12px] font-light italic" style={{ color: "rgba(241,234,217,0.45)" }}>
                Valores em Euro, base câmbio na data do fechamento. Tarifas por pessoa em quarto
                duplo. Consulte disponibilidade para a data desejada.
              </p>
              <a href="#contato" className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]" style={{ background: F.candeia, color: F.noite }}>
                Falar com a equipe &#8594;
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== INCLUSO / NÃO INCLUSO ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: F.indigo, color: F.marfim }}>
        <div className="mx-auto grid max-w-[1280px] gap-12 md:grid-cols-2 md:gap-20">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: F.candeia }}>Está incluso</p>
            <ul className="mt-8 space-y-4">
              {INCLUSO.map((item) => (
                <li key={item} className="flex items-start gap-4 text-[14px] font-light leading-relaxed" style={{ color: F.marfim }}>
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: F.candeia }} />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: F.pedra }}>Não incluso</p>
            <ul className="mt-8 space-y-4">
              {NAO_INCLUSO.map((item) => (
                <li key={item} className="flex items-start gap-4 text-[14px] font-light leading-relaxed" style={{ color: F.textSoft }}>
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "rgba(201,188,160,0.5)" }} />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-10 rounded-2xl border p-5" style={{ borderColor: "rgba(216,162,74,0.2)" }}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: F.candeia }}>Cancelamento</p>
              <div className="mt-4 space-y-2 text-[13px] font-light" style={{ color: F.textSoft }}>
                <div className="flex justify-between"><span>31 dias ou mais</span><span style={{ color: F.marfim }}>10%</span></div>
                <div className="flex justify-between"><span>30 a 21 dias</span><span style={{ color: F.marfim }}>20%</span></div>
                <div className="flex justify-between"><span>20 a 8 dias</span><span style={{ color: F.marfim }}>50%</span></div>
                <div className="flex justify-between"><span>7 dias ou menos</span><span style={{ color: F.marfim }}>100%</span></div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== AONIKIA ===== */}
      <section className="px-6 py-20 md:px-10 md:py-24" style={{ background: F.noite }}>
        <div className="mx-auto max-w-[860px] text-center">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: F.marfim, opacity: 0.6 }}>
              AonikIA · especialista no Caminho de Fátima
            </p>
            <h2 className="mt-5 font-display font-light leading-[1.15]" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: F.marfim }}>
              Pergunte tudo sobre o caminho
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] font-light leading-relaxed" style={{ color: "rgba(241,234,217,0.66)" }}>
              Como funciona a peregrinação a pé, o que visitar em Nazaré, Alcobaça e Batalha, e o que
              esperar da chegada a Fátima. A AonikIA conhece este caminho de ponta a ponta.
            </p>
            <a href="#contato" className="mt-7 inline-flex items-center gap-3 rounded-full border px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 hover:opacity-80" style={{ borderColor: F.candeia, color: F.candeia }}>
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
