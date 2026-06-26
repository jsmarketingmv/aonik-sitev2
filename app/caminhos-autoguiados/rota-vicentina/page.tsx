"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Contato from "../../components/Contato";
import FloatingActions from "../../components/FloatingActions";
import { Reveal, EASE } from "../../components/ui";

const V = {
  noite:    "#06202c",   // Atlântico noturno (base hero)
  oceano:   "#0a2a3a",   // azul profundo
  mar:      "#13455a",   // azul médio
  agua:     "#5fa8b8",   // turquesa (assinatura)
  aguaVivo: "#a9dce4",
  areia:    "#e8d9b8",   // areia das dunas
  ocre:     "#c98a4e",   // ocre das falésias
  branco:   "#f4efe4",   // espuma / creme
  sage:     "#8a9a6e",   // mato costeiro
  textSoft: "rgba(244,239,228,0.62)",
};

/* Fotos reais da Rota Vicentina (acervo AONIK · SSD). */
const P = "/images/caminhos-autoguiados/vicentina";
const IMG = {
  hero:   `${P}/IMG_8891.jpg`,  // figura na falésia diante do Atlântico
  onda:   `${P}/IMG_8987.jpg`,  // falésias ocre sobre o mar
  coast:  `${P}/IMG_9189.jpg`,  // areal imenso e deserto
  praia:  `${P}/IMG_8763.jpg`,  // enseada de água turquesa
  oceano: `${P}/IMG_9705.jpg`,  // cala turquesa ao pé da falésia
  pausa:  `${P}/IMG_9408.jpg`,  // fim de tarde dourado
};

// ============================================================
// SVG: FalésiaVicentina — mar com ondas, costa, sol e gaivota
// ============================================================
function FalesiaVicentina() {
  const ondas = [
    { d: "M -20,150 C 70,140 150,158 240,148 C 320,139 400,156 480,150", o: 0.5,  w: 1.4 },
    { d: "M -20,184 C 70,174 150,192 240,182 C 320,173 400,190 480,184", o: 0.42, w: 1.3 },
    { d: "M -20,218 C 70,208 150,226 240,216 C 320,207 400,224 480,218", o: 0.34, w: 1.2 },
    { d: "M -20,252 C 70,242 150,260 240,250 C 320,241 400,258 480,252", o: 0.26, w: 1.1 },
  ];
  // costa (falésia) — fronteira mar/terra
  const costa = "M -20,300 C 80,288 150,312 250,300 C 340,289 410,310 480,300";
  const costaFill = costa + " L 480,540 L -20,540 Z";
  // trilho na falésia
  const trilho = "M 60,330 C 140,322 180,360 250,352 C 320,344 360,392 430,384";
  const pts = [
    { x: 60,  y: 330, label: "Porto Covo",  c: V.aguaVivo, anchor: "start"  as const },
    { x: 250, y: 352, label: "Milfontes",   c: V.areia,    anchor: "middle" as const },
    { x: 430, y: 384, label: "Odeceixe",    c: V.ocre,     anchor: "end"    as const },
  ];

  return (
    <svg viewBox="0 0 460 540" className="h-full w-full" style={{ overflow: "visible" }}>
      {/* sol sobre o Atlântico */}
      <motion.circle cx="350" cy="86" r="32" fill={V.areia} fillOpacity={0.16}
        initial={{ opacity: 0 }} animate={{ opacity: [0.1, 0.22, 0.1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />
      <motion.circle cx="350" cy="86" r="32" fill="none" stroke={V.areia} strokeWidth="1"
        animate={{ r: [32, 48, 32], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />

      {/* reflexos */}
      {[[80, 120], [160, 96], [40, 200], [300, 230], [120, 250]].map(([x, y], i) => (
        <motion.circle key={i} cx={x} cy={y} r="1.3" fill={V.branco}
          initial={{ opacity: 0 }} animate={{ opacity: [0.1, 0.55, 0.1] }}
          transition={{ duration: 3.2 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }} />
      ))}

      {/* ondas do mar */}
      {ondas.map((l, i) => (
        <motion.path key={i} d={l.d} fill="none" stroke={V.agua} strokeWidth={l.w}
          strokeLinecap="round" strokeOpacity={l.o}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1, x: [0, i % 2 === 0 ? 12 : -12, 0] }}
          transition={{
            pathLength: { duration: 1.8, ease: EASE, delay: 0.2 + i * 0.1 },
            x: { duration: 9 + i * 2, repeat: Infinity, ease: "easeInOut" },
          }} />
      ))}

      {/* costa / falésia */}
      <motion.path d={costaFill} fill={V.ocre} fillOpacity={0.12}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4, delay: 0.8 }} />
      <motion.path d={costa} fill="none" stroke={V.ocre} strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.4, ease: EASE, delay: 0.6 }} />

      {/* trilho dos pescadores */}
      <motion.path d={trilho} fill="none" stroke={V.branco} strokeWidth="2" strokeLinecap="round"
        strokeDasharray="2 8"
        initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.85 }}
        transition={{ duration: 2.6, ease: EASE, delay: 1 }} />

      {/* gaivota / cegonha planando */}
      <motion.g animate={{ x: [0, 30, 0], y: [0, -10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}>
        <path d="M 150,120 C 162,110 170,110 178,120 C 186,110 194,110 206,120"
          fill="none" stroke={V.branco} strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.8" />
      </motion.g>

      {/* waypoints */}
      {pts.map((p, i) => (
        <motion.g key={p.label}
          initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE, delay: 1.4 + i * 0.4 }}>
          <motion.circle cx={p.x} cy={p.y} r="6" fill="none" stroke={p.c} strokeWidth="1.2"
            animate={{ r: [6, 15, 6], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut", delay: i * 0.5 }} />
          <circle cx={p.x} cy={p.y} r="5" fill={V.noite} stroke={p.c} strokeWidth="2" />
          <circle cx={p.x} cy={p.y} r="1.8" fill={p.c} />
          <text x={p.x} y={p.y + 24} fill={V.branco} fontSize="12" textAnchor={p.anchor}
            letterSpacing="0.5" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>{p.label}</text>
        </motion.g>
      ))}

      <motion.text x="120" y="470" fill={V.agua} fontSize="11" letterSpacing="3"
        textAnchor="middle" opacity="0.5"
        initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 2.4, duration: 1 }}
        style={{ fontStyle: "italic" }}>91,1 km</motion.text>
    </svg>
  );
}

// ============================================================
// ElevationProfile — costa recortada (falésias e enseadas)
// ============================================================
const HILL_PATH =
  "M 0,150 L 60,150 L 90,120 L 150,135 L 200,108 L 260,130 " +
  "L 320,100 L 380,128 L 440,112 L 520,140 L 580,118 " +
  "L 650,146 L 720,120 L 800,150 L 870,128 L 960,150";
const HILL_FILL = HILL_PATH + " L 960,248 L 0,248 Z";

const PERFIL = [
  { x: 14,  y: 150, label: "Cercal",     sub: "partida", anchor: "start"  as const },
  { x: 200, y: 108, label: "Porto Covo",  sub: "17 km",   anchor: "middle" as const },
  { x: 440, y: 112, label: "Milfontes",   sub: "dia livre", anchor: "middle" as const },
  { x: 720, y: 120, label: "Zambujeira",  sub: "20,4 km", anchor: "middle" as const },
  { x: 946, y: 150, label: "Odeceixe",    sub: "chegada", anchor: "end"    as const },
];

function ElevationProfile() {
  return (
    <svg viewBox="0 0 960 260" className="w-full" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="rvFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={V.agua}  stopOpacity="0.4" />
          <stop offset="55%" stopColor={V.mar} stopOpacity="0.28" />
          <stop offset="100%" stopColor={V.mar} stopOpacity="0.04" />
        </linearGradient>
      </defs>
      {[90, 130, 170, 210].map((y) => (
        <line key={y} x1={0} y1={y} x2={960} y2={y} stroke="rgba(95,168,184,0.15)" strokeWidth="0.5" />
      ))}
      <path d={HILL_FILL} fill="url(#rvFill)" />
      <motion.path d={HILL_PATH} fill="none" stroke={V.agua} strokeWidth="2.2"
        strokeLinejoin="round" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true }}
        transition={{ duration: 4.2, ease: EASE, delay: 0.2 }} />
      {PERFIL.map((w) => (
        <g key={w.label}>
          <line x1={w.x} y1={w.y} x2={w.x} y2={228} stroke={V.agua} strokeWidth="1"
            strokeDasharray="2 4" strokeOpacity="0.4" />
          <circle cx={w.x} cy={w.y} r="4.5" fill={V.oceano} stroke={V.agua} strokeWidth="1.8" />
          <circle cx={w.x} cy={w.y} r="1.8" fill={V.agua} />
          <text x={w.x} y={w.y - 10} fill={V.branco} fontSize="10" textAnchor={w.anchor}
            letterSpacing="0.5" style={{ fontFamily: "sans-serif" }}>{w.label}</text>
          <text x={w.x} y={w.y - 22} fill={V.agua} fontSize="8.5" textAnchor={w.anchor}
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
  { src: `${P}/IMG_8891.jpg`, cap: "Onde a terra se debruça sobre o Atlântico", tag: "Falésias" },
  { src: `${P}/IMG_8763.jpg`, cap: "Enseadas de água turquesa escondidas entre as falésias", tag: "Praias" },
  { src: `${P}/IMG_9125.jpg`, cap: "A costa recortada do sudoeste alentejano", tag: "Enseadas" },
  { src: `${P}/IMG_9189.jpg`, cap: "Areais imensos onde, muitas vezes, você é a única pessoa", tag: "Dunas" },
  { src: `${P}/IMG_9176.jpg`, cap: "A costa rochosa coberta de mato selvagem", tag: "Costa" },
  { src: `${P}/IMG_9705.jpg`, cap: "Águas turquesa ao pé do Trilho dos Pescadores", tag: "Oceano" },
  { src: `${P}/IMG_9408.jpg`, cap: "O fim de tarde dourado sobre o litoral do Alentejo", tag: "Pôr do sol" },
  { src: `${P}/IMG_9432.jpg`, cap: "Fortalezas e história à beira do oceano", tag: "História" },
];

function GaleriaInterativa() {
  const [idx, setIdx] = useState(0);
  const img = GALERIA[idx];
  return (
    <div className="grid gap-3 md:grid-cols-[1fr_210px]">
      <AnimatePresence mode="wait">
        <motion.div key={idx} initial={{ opacity: 0.5, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }} transition={{ duration: 0.45, ease: EASE }}
          className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "16/10" }}>
          <img src={img.src} alt={img.cap} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${V.noite}cc 0%, transparent 55%)` }} />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em]" style={{ color: V.agua }}>{img.tag}</span>
            <p className="mt-1 text-[14px] font-light" style={{ color: V.branco }}>{img.cap}</p>
          </div>
          <div className="absolute right-4 top-4">
            <span className="text-[11px] font-medium" style={{ color: "rgba(244,239,228,0.55)" }}>{idx + 1}/{GALERIA.length}</span>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="flex gap-2 overflow-x-auto md:max-h-[470px] md:flex-col md:overflow-y-auto md:overflow-x-visible">
        {GALERIA.map((g, i) => (
          <button key={i} onClick={() => setIdx(i)}
            className="relative shrink-0 overflow-hidden rounded-xl transition-all duration-300"
            style={{ width: 210, height: 70, opacity: i === idx ? 1 : 0.42,
              outline: i === idx ? `2px solid ${V.agua}` : "2px solid transparent", outlineOffset: 2 }}>
            <img src={g.src} alt={g.tag}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.05]" />
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
  { v: "8",        u: "dias",        s: "7 noites" },
  { v: "91,1",     u: "quilômetros", s: "5 etapas a pé" },
  { v: "1",        u: "dia livre",   s: "em Vila Nova de Milfontes" },
  { v: "2",        u: "pessoas",     s: "saída mínima, no seu ritmo" },
  { v: "Trilho",   u: "dos Pescadores", s: "à beira da falésia" },
  { v: "Costa",    u: "Vicentina",   s: "parque natural protegido" },
];

const COMO_FUNCIONA = [
  { icon: "flag",    t: "Você escolhe a data",
    s: "Saídas o ano todo, exceto Agosto (calor). Sem grupo fixo, você caminha no próprio ritmo, sozinho ou em dupla." },
  { icon: "pin",     t: "App, mapas e guia de campo",
    s: "Guia de campo, mapa da Rota Vicentina e app com tracks de GPS e descrição de cada etapa. Você nunca se perde." },
  { icon: "village", t: "Logística resolvida",
    s: "Hospedagens 3 estrelas reservadas, bagagem transportada (1 mala até 15 kg) e linha de apoio 24 horas." },
  { icon: "wave",    t: "Só o vento e o horizonte",
    s: "Você caminha leve, com a mochila do dia, pela costa mais autêntica da Europa. Simplicidade, silêncio e mar." },
];

const MARCOS = [
  {
    id: "rv-atlantico",
    kicker: "Onde a terra acaba",
    titulo: ["O", "Atlântico"],
    texto:
      "Durante oito dias, o oceano caminha ao seu lado. O Trilho dos Pescadores segue colado à falésia, ali onde os homens do mar descem para pescar entre as rochas. O vento, o sal e o barulho das ondas são a trilha sonora de cada passo. Poucos lugares na Europa são tão crus e tão bonitos.",
    detalhe: "Trilho dos Pescadores · Costa Vicentina",
    img: IMG.onda,
    bg: V.oceano,
    imgDireita: true,
    colors: {
      kicker: V.agua, title: V.branco, titleAccent: V.agua,
      body: "rgba(244,239,228,0.78)", detalhe: V.agua, link: V.branco,
    },
  },
  {
    id: "rv-praias",
    kicker: "Areais sem ninguém",
    titulo: ["As Praias", "Selvagens"],
    texto:
      "Porto Covo e as suas casas brancas e azuis. A foz do Rio Mira em Vila Nova de Milfontes. As praias de Alteirinhos, Carvalhal, Machados e da Amália, perto de Odeceixe. Entre uma vila e outra, areais imensos onde, muitas vezes, você é a única pessoa. O luxo aqui é o espaço.",
    detalhe: "Porto Covo · Milfontes · Odeceixe",
    img: IMG.coast,
    bg: V.mar,
    imgDireita: false,
    colors: {
      kicker: V.areia, title: V.branco, titleAccent: V.areia,
      body: "rgba(244,239,228,0.8)", detalhe: V.branco, link: V.branco,
    },
  },
  {
    id: "rv-pausa",
    kicker: "Voltar a si",
    titulo: ["O", "Silêncio"],
    texto:
      "Há um dia inteiro livre em Milfontes, sem caminhar, só para parar. E há cegonhas que nidificam nas falésias à beira-mar, o único lugar do mundo onde fazem isso. A Rota Vicentina não é sobre quilômetros, é sobre o que acontece quando você desacelera. Uma pausa guiada pelo vento.",
    detalhe: "Sobreirais · Rio Mira · cegonhas na falésia",
    img: IMG.pausa,
    bg: V.noite,
    imgDireita: true,
    colors: {
      kicker: V.sage, title: V.branco, titleAccent: V.sage,
      body: "rgba(244,239,228,0.82)", detalhe: V.branco, link: V.branco,
    },
  },
];

const EXPERIENCIAS = [
  { icon: "wave",    t: "Trilho dos Pescadores", s: "Caminhar à beira da falésia, no caminho que os pescadores abriram para o mar.", tag: "A trilha" },
  { icon: "village", t: "Porto Covo",            s: "Vila piscatória de casas brancas e azuis, debruçada sobre o Atlântico.",          tag: "Vila" },
  { icon: "sun",     t: "Vila Nova de Milfontes", s: "O estuário do Rio Mira e um dia livre para descansar à beira da água.",         tag: "Dia livre" },
  { icon: "pin",     t: "Ilha do Pessegueiro",   s: "O forte e a ilha ao largo de Porto Covo, história em meio ao oceano.",           tag: "História" },
  { icon: "wave",    t: "Praias selvagens",      s: "Alteirinhos, Carvalhal, Machados e a praia da Amália, areais quase desertos.",   tag: "Praias" },
  { icon: "flag",    t: "Cegonhas na falésia",   s: "O único lugar do mundo onde as cegonhas brancas nidificam à beira-mar.",         tag: "Natureza" },
];

const ROTEIRO = [
  { d: "01", icon: "plane",   t: "Chegada a Cercal do Alentejo",
    s: "Transfer de Lisboa a Cercal do Alentejo. Briefing com a equipe, entrega do guia de campo e do mapa. Tempo livre para entrar no ritmo da costa." },
  { d: "02", icon: "boot",    t: "Cercal a Porto Covo",
    s: "17 km · Do sobreiral aromático até a vila piscatória de Porto Covo, de casas brancas e azuis debruçadas sobre o mar." },
  { d: "03", icon: "wave",    t: "Porto Covo a Vila Nova de Milfontes",
    s: "19,5 km · Praias, dunas e a Ilha do Pessegueiro ao largo. Chegada à foz do Rio Mira, em Milfontes." },
  { d: "04", icon: "sun",     t: "Dia livre em Vila Nova de Milfontes",
    s: "Sem caminhada. Dia para descansar, conhecer a vila e o estuário, ou simplesmente parar diante do mar." },
  { d: "05", icon: "boot",    t: "Vila Nova a Almograve",
    s: "16,6 km · Travessia do Rio Mira e a costa que se abre em falésias e areais. Etapa curta e acessível." },
  { d: "06", icon: "wave",    t: "Almograve a Zambujeira do Mar",
    s: "20,4 km · A etapa mais longa, por costa rochosa, enseadas e o porto piscatório da Azenha do Mar." },
  { d: "07", icon: "boot",    t: "Zambujeira a Odeceixe",
    s: "18 km · As praias de Alteirinhos, Carvalhal, Machados e da Amália. Chegada a Odeceixe, onde o rio encontra o mar." },
  { d: "08", icon: "flag",    t: "Partida de Odeceixe",
    s: "Café da manhã e transfer opcional para estações ou aeroportos. Fim das operações." },
];

const INCLUSO = [
  "7 noites em pousadas e hotéis 3 estrelas com café da manhã",
  "Transporte de bagagem (1 mala, até 15 kg)",
  "Guia de campo e mapa da Rota Vicentina",
  "App com tracks de GPS, mapas e descrição de cada etapa",
  "Briefing com a equipe na chegada",
  "Seguro de Acidentes Pessoais",
  "Linha de apoio 24 horas",
];

const NAO_INCLUSO = [
  "Passagens aéreas",
  "Transfers de e para aeroportos e estações (podem ser contratados à parte)",
  "Almoços e jantares",
  "Entradas em museus e monumentos",
  "Taxas turísticas",
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
    case "sun":
      return <svg viewBox="0 0 24 24" style={s}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19" /></svg>;
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
export default function RotaVicentinaPage() {
  return (
    <main className="relative" style={{ background: V.branco }}>
      <Nav />

      {/* ===== HERO ===== */}
      <section className="relative flex min-h-[100svh] w-full items-center overflow-hidden" style={{ background: V.noite }}>
        <motion.div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${IMG.hero}')` }}
          initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 14, ease: "easeOut" }} />
        <div className="absolute inset-0"
          style={{ background: `linear-gradient(to right, ${V.noite}f2 0%, ${V.noite}b0 52%, ${V.noite}66 100%)` }} />
        <motion.div className="absolute inset-0 z-[1]" style={{ background: V.noite, pointerEvents: "none" }}
          initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 0.9, delay: 0.4 }} />

        <div className="relative z-10 mx-auto grid w-full max-w-[1400px] items-center gap-10 px-6 py-28 md:grid-cols-2 md:gap-16 md:px-10">
          <div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 }} className="mb-4 flex items-center gap-3">
              <Icon name="pin" size={14} color={V.agua} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.4em]" style={{ color: V.agua }}>
                Caminhos de Portugal · Costa Atlântica
              </span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
              className="font-display font-light uppercase leading-[0.86] tracking-[-0.02em]"
              style={{ fontSize: "clamp(3rem, 8vw, 7.5rem)", color: V.branco }}>
              Rota
              <br />
              <span style={{ color: V.agua }}>Vicentina</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.48 }}
              className="mt-3 font-display font-light italic"
              style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)", color: V.branco, opacity: 0.64 }}>
              Oito dias à beira do Atlântico. Só o vento e o horizonte.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.55 }}
              className="mt-6 max-w-md text-[15px] font-light leading-relaxed md:text-base"
              style={{ color: "rgba(244,239,228,0.74)" }}>
              Uma das rotas mais autênticas da Europa, pela costa selvagem do sudoeste de Portugal.
              Falésias, praias desertas e o silêncio do Atlântico, com logística, hospedagens e
              mapas{" "}
              <span style={{ color: V.branco }}>já resolvidos.</span>
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.7 }} className="mt-8 flex flex-wrap items-center gap-5">
              <a href="#reservar"
                className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]"
                style={{ background: V.agua, color: V.noite }}>
                Quero caminhar a costa <span>&#8594;</span>
              </a>
              <span>
                <span className="text-[12px] uppercase tracking-[0.16em]" style={{ color: "rgba(244,239,228,0.5)" }}>a partir de</span>{" "}
                <span className="font-display text-2xl" style={{ color: V.branco }}>€ 856</span>
              </span>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.95 }}
              className="mt-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.16em]"
              style={{ borderColor: V.agua, color: V.agua }}>
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: V.agua }} />
              Saídas o ano todo, exceto Agosto · no seu ritmo
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.35 }}
            className="mx-auto hidden w-full max-w-[440px] md:block" style={{ height: 480 }}>
            <FalesiaVicentina />
          </motion.div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="grid grid-cols-2 gap-px md:grid-cols-3 lg:grid-cols-6"
        style={{ background: "rgba(95,168,184,0.18)", borderTop: `1px solid rgba(95,168,184,0.18)` }}>
        {STATS.map((s, i) => (
          <Reveal key={i} delay={i * 0.04}>
            <div className="flex flex-col px-6 py-8" style={{ background: V.oceano }}>
              <span className="font-display font-light leading-none" style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", color: V.branco }}>{s.v}</span>
              <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: V.agua }}>{s.u}</span>
              <span className="mt-1 text-[12px] font-light" style={{ color: V.textSoft }}>{s.s}</span>
            </div>
          </Reveal>
        ))}
      </section>

      {/* ===== CENTERPIECE ===== */}
      <section className="relative w-full overflow-hidden" style={{ background: V.branco }}>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
          <span className="select-none font-display font-light uppercase"
            style={{ fontSize: "clamp(4rem,15vw,14rem)", color: "rgba(19,69,90,0.06)",
              letterSpacing: "-0.04em", lineHeight: 1, whiteSpace: "nowrap" }}>
            ATLÂNTICO
          </span>
        </div>
        <div className="relative z-10 mx-auto max-w-[1000px] px-6 py-32 text-center md:py-44">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em]" style={{ color: V.agua }}>
              A costa mais selvagem da Europa
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display font-light leading-[1.05]" style={{ fontSize: "clamp(2.2rem,5vw,4.4rem)", color: V.mar }}>
              Onde a terra acaba
              <br />
              <span className="italic" style={{ color: V.ocre }}>e o mar começa</span>
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mx-auto mt-8 max-w-2xl text-[16px] font-light leading-relaxed" style={{ color: "rgba(10,42,58,0.62)" }}>
              No sudoeste de Portugal, a costa resistiu ao turismo de massa. Aqui não há arranha-céus
              nem multidões: há falésias batidas pelo vento, praias onde você caminha sozinho e vilas
              de pescadores que continuam pescando.{" "}
              <span style={{ color: V.mar, fontStyle: "italic" }}>Simplicidade, silêncio e Atlântico.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== PERFIL DE ELEVAÇÃO ===== */}
      <section className="w-full overflow-hidden pb-0 pt-16" style={{ background: V.oceano }}>
        <div className="mx-auto px-4 md:px-8">
          <Reveal>
            <p className="mb-8 text-center text-[11px] font-semibold uppercase tracking-[0.4em]" style={{ color: V.agua, opacity: 0.85 }}>
              Perfil da caminhada · 91,1 km · Cercal a Odeceixe
            </p>
          </Reveal>
          <Reveal delay={0.05}><ElevationProfile /></Reveal>
        </div>
      </section>

      {/* ===== COMO FUNCIONA ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: V.oceano, color: V.branco }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: V.agua }}>
              <span className="h-px w-8" style={{ background: V.agua }} />
              Como funciona o autoguiado
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 max-w-2xl font-display font-light leading-[1.05]" style={{ fontSize: "clamp(2rem,4vw,3.2rem)", color: V.branco }}>
              A liberdade do seu tempo,
              <br />
              <span className="italic" style={{ color: V.agua }}>a segurança da curadoria</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {COMO_FUNCIONA.map((c, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="h-full rounded-2xl p-7"
                  style={{ background: "rgba(95,168,184,0.08)", border: `1px solid rgba(95,168,184,0.2)` }}>
                  <Icon name={c.icon} size={24} color={V.agua} />
                  <h3 className="mt-5 font-display font-light" style={{ fontSize: "1.2rem", color: V.branco }}>{c.t}</h3>
                  <p className="mt-2 text-[13px] font-light leading-relaxed" style={{ color: V.textSoft }}>{c.s}</p>
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
                <h2 className="mt-5 font-display font-light uppercase leading-[0.88]" style={{ fontSize: "clamp(2.4rem,4.5vw,4rem)", color: m.colors.title }}>
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
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: V.mar }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: V.aguaVivo }}>O que a costa guarda</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 font-display font-light leading-[1.05]" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: V.branco }}>
              Cada etapa tem
              <br />
              <span className="italic" style={{ color: V.areia }}>o seu encontro</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {EXPERIENCIAS.map((e, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="group relative rounded-2xl p-7 transition-all duration-300"
                  style={{ background: "rgba(95,168,184,0.10)", border: `1px solid rgba(95,168,184,0.22)` }}>
                  <div className="mb-4 flex items-center justify-between">
                    <Icon name={e.icon} size={22} color={V.aguaVivo} />
                    <span className="rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.2em]"
                      style={{ background: "rgba(6,32,44,0.5)", color: V.aguaVivo }}>{e.tag}</span>
                  </div>
                  <h3 className="font-display font-light" style={{ fontSize: "1.15rem", color: V.branco }}>{e.t}</h3>
                  <p className="mt-2 text-[13px] font-light leading-relaxed" style={{ color: V.textSoft }}>{e.s}</p>
                  <div className="mt-4 h-px w-0 transition-all duration-500 group-hover:w-full" style={{ background: V.areia }} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GALERIA ===== */}
      <section className="px-6 py-20 md:px-10 md:py-28" style={{ background: V.oceano }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: V.agua }}>Galeria</p>
            <h2 className="mt-4 font-display font-light" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: V.branco }}>
              O que você vai viver
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-8"><GaleriaInterativa /></Reveal>
        </div>
      </section>

      {/* ===== ROTEIRO ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: V.branco }}>
        <div className="mx-auto max-w-[1100px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: V.agua }}>Roteiro dia a dia</p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-3 max-w-lg text-[14px] font-light leading-relaxed" style={{ color: "rgba(10,42,58,0.55)" }}>
              Oito dias pela costa, com cinco etapas a pé, um dia livre em Milfontes e o Atlântico
              sempre ao seu lado, de Cercal do Alentejo a Odeceixe.
            </p>
          </Reveal>
          <div className="mt-12">
            {ROTEIRO.map((r, i) => (
              <Reveal key={r.d} delay={i * 0.04}>
                <div className="grid grid-cols-[auto_1fr] items-baseline gap-6 border-t py-7 md:gap-10"
                  style={{ borderColor: "rgba(19,69,90,0.18)" }}>
                  <div className="flex items-center gap-4">
                    <span className="font-display text-sm" style={{ color: "rgba(10,42,58,0.32)" }}>{r.d}</span>
                    <Icon name={r.icon} size={18} color={V.agua} />
                  </div>
                  <div>
                    <h3 className="font-display font-light" style={{ fontSize: "clamp(1.1rem,2vw,1.5rem)", color: V.mar }}>{r.t}</h3>
                    <p className="mt-1.5 text-[14px] font-light leading-relaxed" style={{ color: "rgba(10,42,58,0.58)" }}>{r.s}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RESERVE + PREÇO ===== */}
      <section id="reservar" className="px-6 py-24 md:px-10 md:py-32" style={{ background: V.noite }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: V.branco, opacity: 0.6 }}>Tarifas e datas</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-display font-light leading-[1.05]" style={{ fontSize: "clamp(2rem,4.5vw,3.6rem)", color: V.branco }}>
              Você escolhe
              <br />
              <span className="italic" style={{ color: V.agua }}>quando partir</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-xl text-[15px] font-light leading-relaxed" style={{ color: V.textSoft }}>
              Saídas o ano todo, exceto Agosto (calor), com saída mínima de 2 pessoas. A tarifa varia
              conforme a temporada.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              <div className="rounded-2xl p-7" style={{ background: "rgba(19,69,90,0.4)", border: `1px solid rgba(95,168,184,0.3)` }}>
                <div className="flex items-center justify-between">
                  <span className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ border: `1px solid ${V.agua}`, color: V.branco }}>Temporada Baixa</span>
                  <span className="text-[11px]" style={{ color: V.textSoft }}>Jan a Abr · Nov a Dez</span>
                </div>
                <p className="mt-6 font-display font-light" style={{ fontSize: "clamp(2rem,3.5vw,2.8rem)", color: V.branco }}>€ 856</p>
                <p className="mt-1 text-[12px] font-light" style={{ color: V.textSoft }}>por pessoa · quarto duplo</p>
                <p className="mt-4 text-[12px] font-light" style={{ color: V.textSoft }}>Suplemento individual: + € 652</p>
              </div>

              <div className="rounded-2xl p-7" style={{ background: "rgba(95,168,184,0.14)", border: `1px solid rgba(95,168,184,0.45)` }}>
                <div className="flex items-center justify-between">
                  <span className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ background: V.agua, color: V.noite }}>Temporada Média</span>
                  <span className="text-[11px]" style={{ color: V.textSoft }}>Maio · Outubro</span>
                </div>
                <p className="mt-6 font-display font-light" style={{ fontSize: "clamp(2rem,3.5vw,2.8rem)", color: V.branco }}>€ 1.185</p>
                <p className="mt-1 text-[12px] font-light" style={{ color: V.textSoft }}>por pessoa · quarto duplo</p>
                <p className="mt-4 text-[12px] font-light" style={{ color: V.textSoft }}>Suplemento individual: + € 867</p>
              </div>

              <div className="rounded-2xl p-7" style={{ background: "rgba(201,138,78,0.1)", border: `1px solid rgba(201,138,78,0.28)` }}>
                <div className="flex items-center justify-between">
                  <span className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ border: `1px solid ${V.ocre}`, color: V.ocre }}>Temporada Alta</span>
                  <span className="text-[11px]" style={{ color: V.textSoft }}>Jun, Jul, Set</span>
                </div>
                <p className="mt-6 font-display font-light" style={{ fontSize: "clamp(1.5rem,2.8vw,2rem)", color: V.branco }}>Sob consulta</p>
                <div className="mt-4 space-y-2 text-[12px] font-light" style={{ color: V.textSoft }}>
                  <p>Melhor época para a costa</p>
                  <p>Agosto não opera (calor)</p>
                  <p>30% de entrada + 5x sem juros</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-col items-start justify-between gap-5 border-t pt-8 sm:flex-row sm:items-center" style={{ borderColor: "rgba(95,168,184,0.3)" }}>
              <p className="max-w-md text-[12px] font-light italic" style={{ color: "rgba(244,239,228,0.45)" }}>
                Valores em Euro, base câmbio na data do fechamento. Tarifas por pessoa em quarto
                duplo. Pagamento: 30% de entrada via Pix ou transferência, mais 5x sem juros no cartão.
              </p>
              <a href="#contato" className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]" style={{ background: V.agua, color: V.noite }}>
                Falar com a equipe &#8594;
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== INCLUSO / NÃO INCLUSO ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: V.oceano, color: V.branco }}>
        <div className="mx-auto grid max-w-[1280px] gap-12 md:grid-cols-2 md:gap-20">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: V.agua }}>Está incluso</p>
            <ul className="mt-8 space-y-4">
              {INCLUSO.map((item) => (
                <li key={item} className="flex items-start gap-4 text-[14px] font-light leading-relaxed" style={{ color: V.branco }}>
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: V.agua }} />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: V.ocre }}>Não incluso</p>
            <ul className="mt-8 space-y-4">
              {NAO_INCLUSO.map((item) => (
                <li key={item} className="flex items-start gap-4 text-[14px] font-light leading-relaxed" style={{ color: V.textSoft }}>
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "rgba(201,138,78,0.5)" }} />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-10 rounded-2xl border p-5" style={{ borderColor: "rgba(95,168,184,0.2)" }}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: V.agua }}>Cancelamento</p>
              <div className="mt-4 space-y-2 text-[13px] font-light" style={{ color: V.textSoft }}>
                <div className="flex justify-between"><span>31 dias ou mais</span><span style={{ color: V.branco }}>10%</span></div>
                <div className="flex justify-between"><span>30 a 21 dias</span><span style={{ color: V.branco }}>20%</span></div>
                <div className="flex justify-between"><span>20 a 8 dias</span><span style={{ color: V.branco }}>50%</span></div>
                <div className="flex justify-between"><span>7 dias ou menos</span><span style={{ color: V.branco }}>100%</span></div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== AONIKIA ===== */}
      <section className="px-6 py-20 md:px-10 md:py-24" style={{ background: V.noite }}>
        <div className="mx-auto max-w-[860px] text-center">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: V.branco, opacity: 0.6 }}>
              AonikIA · especialista na Rota Vicentina
            </p>
            <h2 className="mt-5 font-display font-light leading-[1.15]" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: V.branco }}>
              Pergunte tudo sobre a costa
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] font-light leading-relaxed" style={{ color: "rgba(244,239,228,0.66)" }}>
              Qual a melhor época, como funciona o app de GPS, o que levar na mochila do dia e como
              são as etapas pela falésia. A AonikIA conhece a Rota Vicentina de ponta a ponta.
            </p>
            <a href="#contato" className="mt-7 inline-flex items-center gap-3 rounded-full border px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 hover:opacity-80" style={{ borderColor: V.agua, color: V.agua }}>
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
