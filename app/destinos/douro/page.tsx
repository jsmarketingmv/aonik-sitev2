"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Contato from "../../components/Contato";
import FloatingActions from "../../components/FloatingActions";
import { Reveal, EASE } from "../../components/ui";
import { GRUPOS, datasDoAno } from "../../lib/grupos";

const GRUPO = GRUPOS.find((g) => g.id === "douro")!;

const D = {
  noite:     "#130c0e",   // escuro quente
  casca:     "#1e141a",   // casca de barril
  vinho:     "#3f1521",   // Vintage Wine (Pantone 75C) — profundo
  vinhoDeep: "#280c14",   // tanino profundo
  ouro:      "#c4a56a",   // dourado envelhecido
  verde:     "#2a3820",   // verde escuro das vinhas — fundos
  rio:       "#6d9290",   // azul-verde do Douro
  creme:     "#ede6dd",   // Mother of Pearl — creme sofisticado
  sage:      "#7a8f62",   // Herbal Garden — verde das vinhas (acento)
  terracota: "#be6549",   // Terracotta — acento quente
  pedra:     "#9e8e82",   // xisto / pedra do muro
  line:      "rgba(196,165,106,0.18)",
  textSoft:  "rgba(237,230,221,0.62)",
};

const wx = (file: string, w: number, h: number) =>
  `https://static.wixstatic.com/media/${file}/v1/fill/w_${w},h_${h},al_c,q_82,enc_avif,quality_auto/img.jpg`;

const IMG = {
  pano:    "2d4f5b_edfea84f57b54f589aff44727039c42e~mv2.jpg",
  rio:     "2d4f5b_7edb87bf58444c00a4e2f0882eaff778~mv2.jpg",
  hiker:   "2d4f5b_01a03621c9fe4cd9812047b9543c423f~mv2.jpg",
  juliano: "2d4f5b_7c097261ec654f24aa4eb9b1d1ea026f~mv2.jpg",
  rabelo:  "2d4f5b_53f3c344579445728e0ee4bb619d3afe~mv2.jpeg",
  quarto:  "2d4f5b_5a366974e9d24c1ab879fcf6eccb3a0c~mv2.jpeg",
  socalcos:"2d4f5b_1a591d0a79f34de18c9f5340cb67f4d0~mv2.jpg",
  retrato: "2d4f5b_b6d986205fad4580a62df6207a5134c9~mv2.jpg",
  v1:      "2d4f5b_9105ce4c939c47649fa15ba1067bc5f8~mv2.jpeg",
  v2:      "2d4f5b_a061f8e60bac443f8f377482c18bfd8d~mv2.jpeg",
  v3:      "2d4f5b_6e887cf99db14224812c9b2d41b92dfb~mv2.jpeg",
  v4:      "2d4f5b_9b69e44673094dcaa40961e4946dd3b0~mv2.jpeg",
  v5:      "2d4f5b_aeead286fcb34a0fa7dd0a46eb92ea4c~mv2.jpeg",
  v6:      "2d4f5b_f643b870f9b94dbd95434d780785dfef~mv2.jpeg",
  v7:      "2d4f5b_fe01633c44f2489b8d36a31b5c3d99c0~mv2.jpeg",
};

// ============================================================
// COMPONENTE: RioSocalcos — rio serpenteante + socalcos em layers
// + barco rabelo + sol dourado. SEM retângulo de fundo.
// ============================================================
function RioSocalcos() {
  const socalcos = [
    { d: "M -30,128 C 60,118 140,124 230,116 C 320,108 400,122 490,115", c: D.ouro,     o: 0.25, w: 1.0 },
    { d: "M -30,178 C 65,168 145,174 235,166 C 325,158 405,172 490,165", c: D.ouro,     o: 0.35, w: 1.2 },
    { d: "M -30,228 C 70,218 150,224 240,216 C 330,208 410,222 490,215", c: D.verde,    o: 0.40, w: 1.3 },
    { d: "M -30,278 C 75,268 155,274 245,266 C 335,258 415,272 490,265", c: D.verde,    o: 0.50, w: 1.5 },
    { d: "M -30,330 C 80,320 160,326 250,318 C 340,310 420,326 490,317", c: D.vinho,    o: 0.52, w: 1.6 },
    { d: "M -30,382 C 85,372 165,378 255,370 C 345,362 425,378 490,369", c: D.vinhoDeep,o: 0.60, w: 1.8 },
  ];

  const rioPath =
    "M 225,52 C 268,100 195,148 212,208 C 228,268 262,298 248,356 " +
    "C 234,414 196,428 208,484";

  const pontos = [
    { x: 225, y: 52,  label: "Régua",      sub: "partida",           anchor: "middle" as const, c: D.ouro  },
    { x: 212, y: 208, label: "Pinhão",     sub: "cais do Douro",     anchor: "start"  as const, c: D.ouro  },
    { x: 248, y: 356, label: "Provesende", sub: "aldeia vinhateira",  anchor: "start"  as const, c: D.vinho },
    { x: 208, y: 484, label: "Porto",      sub: "chegada de trem",   anchor: "middle" as const, c: D.creme },
  ];

  return (
    <svg viewBox="0 0 460 540" className="h-full w-full" style={{ overflow: "visible" }}>
      {/* Sol dourado — pulsa devagar */}
      <motion.circle cx="365" cy="78" r="30" fill={D.ouro}
        initial={{ opacity: 0 }} animate={{ opacity: [0.14, 0.28, 0.14] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />
      <motion.circle cx="365" cy="78" r="30" fill="none" stroke={D.ouro} strokeWidth="1.2"
        animate={{ r: [30, 46, 30], opacity: [0.38, 0, 0.38] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />

      {/* Reflexos de luz */}
      {[[52, 52], [105, 36], [420, 150], [78, 104], [390, 55], [24, 160]].map(([x, y], i) => (
        <motion.circle key={i} cx={x} cy={y} r="1.3" fill={D.creme}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.12, 0.6, 0.12] }}
          transition={{ duration: 3.2 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.35 }} />
      ))}

      {/* Socalcos em camadas — desenham e fazem leve drift */}
      {socalcos.map((l, i) => (
        <motion.path key={i} d={l.d} fill="none" stroke={l.c} strokeWidth={l.w}
          strokeLinecap="round" strokeOpacity={l.o}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1, x: [0, i % 2 === 0 ? 10 : -10, 0] }}
          transition={{
            pathLength: { duration: 1.8, ease: EASE, delay: 0.2 + i * 0.1 },
            x: { duration: 14 + i * 2.5, repeat: Infinity, ease: "easeInOut" },
          }} />
      ))}

      {/* Rio serpenteante — fio azul-verde do Douro */}
      <motion.path d={rioPath} fill="none" stroke={D.rio} strokeWidth="5"
        strokeOpacity="0.14" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 2.8, ease: EASE, delay: 0.4 }} />
      <motion.path d={rioPath} fill="none" stroke={D.rio} strokeWidth="2.2"
        strokeDasharray="2 7" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 3.2, ease: EASE, delay: 0.7 }} />
      <motion.path d={rioPath} fill="none" stroke={D.creme} strokeWidth="2.6"
        strokeLinecap="round" strokeDasharray="12 460"
        initial={{ strokeDashoffset: 472, opacity: 0 }}
        animate={{ strokeDashoffset: [472, 0], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 3.2 }} />

      {/* Barco Rabelo — boia suavemente */}
      <motion.g animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}>
        <g transform="translate(216, 400)">
          <path d="M -18,0 C -12,8 12,8 18,0 L 16,-3 L -16,-3 Z"
            fill="none" stroke={D.ouro} strokeWidth="1.4" strokeLinecap="round" />
          <line x1="0" y1="-3" x2="0" y2="-22" stroke={D.ouro} strokeWidth="1.1" />
          <path d="M 0,-22 L 13,-14 L 0,-6 Z"
            fill={D.vinho} fillOpacity="0.5" stroke={D.ouro} strokeWidth="0.8" />
          <line x1="16" y1="-1" x2="21" y2="7" stroke={D.ouro} strokeWidth="0.9" strokeOpacity="0.7" />
        </g>
      </motion.g>

      {/* Cacho de uvas estilizado */}
      <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 3.2 }}>
        <g transform="translate(342, 380)" stroke={D.vinho} strokeWidth="1.3" fill="none">
          <path d="M 14,0 C 32,8 34,28 20,40 C 8,28 -4,8 14,0 Z" />
          <line x1="14" y1="4" x2="16" y2="36" strokeOpacity="0.6" />
          {[[14,50],[8,60],[20,60],[4,70],[14,70],[24,70],[8,80],[20,80]].map(([cx,cy],i)=>(
            <circle key={i} cx={cx} cy={cy} r="5"
              fill={D.vinho} fillOpacity={0.14 + i * 0.01}
              strokeOpacity={0.75 - i * 0.04} />
          ))}
          <line x1="14" y1="44" x2="14" y2="52" />
        </g>
      </motion.g>

      {/* Pontos da travessia — pino + pulso */}
      {pontos.map((p, i) => (
        <motion.g key={p.label}
          initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE, delay: 1.4 + i * 0.4 }}>
          <motion.circle cx={p.x} cy={p.y} r="6" fill="none" stroke={p.c} strokeWidth="1.2"
            animate={{ r: [6, 15, 6], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut", delay: i * 0.5 }} />
          <circle cx={p.x} cy={p.y} r="5" fill={D.noite} stroke={p.c} strokeWidth="2" />
          <circle cx={p.x} cy={p.y} r="1.8" fill={p.c} />
          <text x={p.x + (p.anchor === "start" ? 14 : 0)} y={p.y - 12} fill={D.creme}
            fontSize="13" textAnchor={p.anchor} letterSpacing="0.5"
            style={{ fontFamily: "'Fraunces', Georgia, serif" }}>{p.label}</text>
          <text x={p.x + (p.anchor === "start" ? 14 : 0)} y={p.y + (p.anchor === "start" ? 4 : 22)}
            fill={p.c} fontSize="8.5" textAnchor={p.anchor} letterSpacing="1.4" opacity="0.9"
            style={{ fontFamily: "sans-serif", textTransform: "uppercase" }}>{p.sub}</text>
        </motion.g>
      ))}

      <motion.text x="118" y="306" fill={D.ouro} fontSize="11" letterSpacing="3"
        textAnchor="middle" opacity="0.42"
        initial={{ opacity: 0 }} animate={{ opacity: 0.42 }} transition={{ delay: 2.4, duration: 1 }}
        style={{ fontStyle: "italic" }}>58,7 km</motion.text>
    </svg>
  );
}

// ============================================================
// COMPONENTE: ElevationProfile — SOCALCOS (degraus/plataformas)
// Evoca os terraços de xisto do Douro: plataformas horizontais
// conectadas por paredes inclinadas — não ondas suaves.
// ============================================================

// Degraus em camadas: plataforma (L horizontal) → parede (L diagonal)
const HILL_PATH =
  "M 0,165 L 65,165 L 72,140 L 135,140 " +        // Régua sobe
  "L 141,115 L 203,115 L 209,90 L 252,90 " +       // Favaios (topo)
  "L 258,118 L 324,118 L 330,150 L 392,150 " +     // descida escalonada
  "L 398,182 L 462,182 L 468,212 L 508,212 " +     // Pinhão (vale)
  "L 514,192 L 556,192 L 562,165 L 594,165 " +     // Casal de Loivos
  "L 600,178 L 672,178 L 678,165 L 754,165 " +     // Provesende
  "L 760,152 L 866,152 L 872,148 L 960,148";       // Porto

const HILL_FILL = HILL_PATH + " L 960,248 L 0,248 Z";

const PERFIL = [
  { x: 14,  y: 165, label: "Régua",          sub: "partida",        anchor: "start"  as const },
  { x: 252, y: 90,  label: "Favaios",         sub: "ponto mais alto", anchor: "middle" as const },
  { x: 468, y: 212, label: "Pinhão",          sub: "cais do rio",   anchor: "middle" as const },
  { x: 562, y: 165, label: "Casal de Loivos", sub: "BBC",           anchor: "middle" as const },
  { x: 946, y: 148, label: "Porto",           sub: "chegada",       anchor: "end"    as const },
];

function ElevationProfile() {
  return (
    <svg viewBox="0 0 960 260" className="w-full" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="drFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={D.sage}  stopOpacity="0.38" />
          <stop offset="48%" stopColor={D.vinho} stopOpacity="0.28" />
          <stop offset="100%" stopColor={D.vinho} stopOpacity="0.04" />
        </linearGradient>
      </defs>
      {/* linhas de grade horizontais suaves */}
      {[90, 130, 170, 210].map((y) => (
        <line key={y} x1={0} y1={y} x2={960} y2={y} stroke={D.line} strokeWidth="0.5" />
      ))}
      {/* área preenchida com gradiente vinhas→xisto */}
      <path d={HILL_FILL} fill="url(#drFill)" />
      {/* traço animado dos socalcos */}
      <motion.path d={HILL_PATH} fill="none" stroke={D.sage} strokeWidth="2.2"
        strokeLinejoin="round" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true }}
        transition={{ duration: 4.2, ease: EASE, delay: 0.2 }} />
      {/* traço dourado tênue por baixo — xisto */}
      <motion.path d={HILL_PATH} fill="none" stroke={D.ouro} strokeWidth="0.8"
        strokeLinejoin="round" strokeLinecap="round" strokeOpacity="0.35"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true }}
        transition={{ duration: 4.8, ease: EASE, delay: 0.5 }} />
      {PERFIL.map((w) => (
        <g key={w.label}>
          <line x1={w.x} y1={w.y} x2={w.x} y2={228} stroke={D.sage} strokeWidth="1"
            strokeDasharray="2 4" strokeOpacity="0.4" />
          <circle cx={w.x} cy={w.y} r="4.5" fill={D.casca} stroke={D.sage} strokeWidth="1.8" />
          <circle cx={w.x} cy={w.y} r="1.8" fill={D.sage} />
          <text x={w.x} y={w.y - 10} fill={D.creme} fontSize="10" textAnchor={w.anchor}
            letterSpacing="0.5" style={{ fontFamily: "sans-serif" }}>{w.label}</text>
          <text x={w.x} y={w.y - 22} fill={D.sage} fontSize="8.5" textAnchor={w.anchor}
            letterSpacing="1.2" opacity="0.9"
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
  { id: IMG.pano,    cap: "O Vale do Douro, Patrimônio UNESCO da humanidade", tag: "Vale" },
  { id: IMG.rio,     cap: "O Douro refletindo os socalcos de xisto", tag: "Rio" },
  { id: IMG.socalcos,cap: "Terraços esculpidos à mão ao longo de séculos", tag: "Socalcos" },
  { id: IMG.rabelo,  cap: "Barco rabelo no Cais do Pinhão", tag: "Pinhão" },
  { id: IMG.hiker,   cap: "Caminhante entre as vinhas ao pôr do sol", tag: "Trilha" },
  { id: IMG.juliano, cap: "Juliano P. Sant'ana nas vinhas do Douro", tag: "Guia" },
  { id: IMG.v1,      cap: "Quintas históricas na encosta do vale", tag: "Quintas" },
  { id: IMG.v2,      cap: "O Douro ao amanhecer nas vindimas de setembro", tag: "Vindima" },
  { id: IMG.v4,      cap: "Socalcos e vinhas em setembro, época ideal", tag: "Setembro" },
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
          <img src={wx(img.id, 1280, 800)} alt={img.cap} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${D.noite}cc 0%, transparent 55%)` }} />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em]" style={{ color: D.ouro }}>{img.tag}</span>
            <p className="mt-1 text-[14px] font-light" style={{ color: D.creme }}>{img.cap}</p>
          </div>
          <div className="absolute right-4 top-4">
            <span className="text-[11px] font-medium" style={{ color: "rgba(243,236,224,0.55)" }}>{idx + 1}/{GALERIA.length}</span>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
        {GALERIA.map((g, i) => (
          <button key={i} onClick={() => setIdx(i)}
            className="relative shrink-0 overflow-hidden rounded-xl transition-all duration-300"
            style={{ width: 210, height: 70, opacity: i === idx ? 1 : 0.42,
              outline: i === idx ? `2px solid ${D.terracota}` : "2px solid transparent", outlineOffset: 2 }}>
            <img src={wx(g.id, 420, 140)} alt={g.tag}
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
  { v: "8",      u: "dias",       s: "7 noites" },
  { v: "58,7",   u: "quilômetros",s: "6 dias de caminhada" },
  { v: "+2.051", u: "metros",     s: "positivo acumulado" },
  { v: "5",      u: "quintas",    s: "provas de Vinho do Porto" },
  { v: "2.000",  u: "anos",       s: "de vinicultura no vale" },
  { v: "UNESCO", u: "Patrimônio", s: "Paisagem Cultural do Douro" },
];

const MARCOS = [
  {
    id: "douro-rio",
    kicker: "Dia 5 · O espelho das vinhas",
    titulo: ["O Rio", "Douro"],
    texto:
      "O Douro não é um cenário. É um personagem. Quilômetros de socalcos refletem nas águas calmas do rio, e o barco rabelo navega exatamente como navegava quando levava o vinho até o Porto. Setembro é o mês da vindima, e o vale inteiro cheira a uva madura. Você estará lá no momento certo.",
    detalhe: "Cais do Pinhão · Barco Rabelo · Patrimônio UNESCO",
    img: IMG.rabelo,
    bg: D.casca,
    imgDireita: true,
    colors: {
      kicker: D.ouro, title: D.creme, titleAccent: D.ouro,
      body: "rgba(243,236,224,0.78)", detalhe: D.ouro, link: D.creme,
    },
  },
  {
    id: "douro-socalcos",
    kicker: "Dias 4 e 5 · O trabalho de séculos",
    titulo: ["Os", "Socalcos"],
    texto:
      "Cada terraço foi construído à mão, pedra a pedra, ao longo de dois mil anos. O xisto cinza retém o calor do dia e devolve à noite para as raízes das videiras. De Alijó a Favaios, de Pinhão a Casal de Loivos, você caminha no topo de uma das paisagens vitícolas mais dramáticas do mundo. A BBC elegeu o miradouro um dos mais belos que existem.",
    detalhe: "Miradouro Casal de Loivos · eleito BBC · UNESCO",
    img: IMG.socalcos,
    bg: D.verde,
    imgDireita: false,
    colors: {
      kicker: D.sage, title: D.creme, titleAccent: D.sage,
      body: "rgba(237,230,221,0.78)", detalhe: D.creme, link: D.creme,
    },
  },
  {
    id: "douro-aldeias",
    kicker: "Dia 6 · Xisto, Moscatel e memória",
    titulo: ["As Aldeias", "Vinhateiras"],
    texto:
      "Provesende tem pelourinho do século XVIII e fonte de granito com brasões. Favaios tem Moscatel e pão que a aldeia produz desde os romanos. As aldeias vinhateiras do Douro não são museus, são comunidades vivas, com igrejas maneiristas e o ruído das lagaradas de setembro. Você entra a pé, do jeito que sempre foi feito.",
    detalhe: "Provesende · Favaios · Aldeias Vinhateiras do Douro",
    img: IMG.hiker,
    bg: D.vinho,
    imgDireita: true,
    colors: {
      kicker: "rgba(237,230,221,0.7)", title: D.creme, titleAccent: D.terracota,
      body: "rgba(237,230,221,0.82)", detalhe: D.creme, link: D.creme,
    },
  },
];

const EXPERIENCIAS = [
  { icon: "wine",     t: "Quinta do Bomfim",   s: "Prova de 3 Vinhos do Porto Vintage com vista para o Douro.",                  tag: "Vinho do Porto" },
  { icon: "grape",    t: "Quinta da Avessada", s: "Vindima com enólogo, prova de licorosos e almoço regional harmonizado.",      tag: "Vindima" },
  { icon: "boat",     t: "Barco Rabelo",       s: "Passeio pelo Cais do Pinhão, com socalcos em espelho no Douro.",              tag: "Rio" },
  { icon: "train",    t: "Comboio Histórico",  s: "Pinhão ao Porto na estação dos 24 azulejos, saga do Vinho do Porto.",         tag: "Patrimônio" },
  { icon: "mountain", t: "Casal de Loivos",    s: "Um dos miradouros mais belos do mundo, eleito pela BBC, em setembro.",        tag: "Panorama" },
  { icon: "village",  t: "Núcleo de Favaios",  s: "Moscatel do século XVIII, pão de Favaios e a história da aldeia vinhateira.", tag: "Aldeia" },
];

const ROTEIRO = [
  { d: "01", icon: "plane",    t: "Chegada a Peso da Régua",
    s: "Recepção no Aeroporto do Porto e transfer privado a Peso da Régua. Check-in no hotel. Visita ao Museu do Douro com prova de Vinho do Porto e frutos secos. Dia de relaxar e entrar no ritmo do vale." },
  { d: "02", icon: "wine",     t: "Caminho dos Monges e Santiago",
    s: "Percurso circular a partir do centro da Régua. Passagem pela Estação da Régua, Ponte Metálica Pedonal e primeiras vistas do Vale do Douro. O rio já apresenta os socalcos que vão guiar toda a semana." },
  { d: "03", icon: "boot",     t: "Caminhada por Samodães",
    s: "Manhã com pick-up da bagagem pelo guia. Caminhada guiada por entre vinhas nas encostas sobre o Douro. Paisagem que abre o apetite para os dias seguintes." },
  { d: "04", icon: "grape",    t: "Trilha de Alijó a Favaios",
    s: "Socalcos de vinhas e olivais (UNESCO). Enoteca da Quinta da Avessada: jardins, vindima autêntica, prova com enólogo incluindo licorosos e almoço regional harmonizado. Chegada a Favaios, Aldeia Vinhateira do século XVIII, pão e Moscatel." },
  { d: "05", icon: "boat",     t: "Pinhão a Casal de Loivos",
    s: "Transfer ao Pinhão. Descida pelas vinhas e quintas históricas com prova de 3 Vinhos do Porto Vintage na Quinta do Bomfim. Barco rabelo no Cais do Pinhão. Subida ao Miradouro de Casal de Loivos, eleito pela BBC um dos mais belos do mundo." },
  { d: "06", icon: "village",  t: "Vinhateiro de Provesende",
    s: "Transfer ao pelourinho de Provesende. Fonte Velha de 1755 em granito com brasões. Igreja Matriz maneirista do século XVIII. Miradouro de São Cristóvão, ligado a Miguel Torga, com vista da confluência dos rios Pinhão e Douro." },
  { d: "07", icon: "train",    t: "Viagem ao Porto, partida de trem",
    s: "Traslado à Estação Ferroviária do Pinhão, uma das mais belas de Portugal, com 24 painéis de azulejos narrando a saga do Vinho do Porto do século XIX. Comboio histórico até o Porto." },
  { d: "08", icon: "flag",     t: "Último dia, check-out",
    s: "Café da manhã incluso, tempo livre no Porto e partida para o aeroporto. Fim das operações." },
];

const INCLUSO = [
  "Hospedagens 4 estrelas (hotéis e quintas com vista para o vale)",
  "Café da manhã diário",
  "Transfers conforme itinerário (pick-up de bagagem incluso)",
  "Visita ao Museu do Douro com prova",
  "Quinta do Valdalágea com provas",
  "Quinta da Pacheca com provas e merenda",
  "Enoteca Quinta da Avessada (vindimas, prova com enólogo e almoço)",
  "Núcleo Museológico de Favaios com prova de Moscatel",
  "Quinta do Bomfim com provas de Vinho do Porto Vintage",
  "Passeio em Barco Rabelo",
  "Quinta de La Rosa com provas e almoço",
  "Bilhete de comboio Pinhão para o Porto",
  "Seguros de Acidentes Pessoais e Responsabilidade Civil",
  "Suporte Online (Customer Success)",
  "Guia privativo / AONIK",
];

const NAO_INCLUSO = [
  "Passagens aéreas",
  "Transfer de saída para o aeroporto (inclui trem Pinhão para o Porto)",
  "Seguro viagem",
  "Gorjetas",
  "Bebidas fora do cronograma",
  "Despesas pessoais",
  "Outros serviços não indicados no programa",
];

// ============================================================
// ÍCONES SVG MONOCROMÁTICOS — stroke fino, sem emoji
// ============================================================
function Icon({ name, size = 22, color = "currentColor" }: { name: string; size?: number; color?: string }) {
  const s = {
    width: size, height: size,
    stroke: color, fill: "none",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    display: "block", flexShrink: 0,
  };
  switch (name) {
    case "wine":
      return <svg viewBox="0 0 24 24" style={s}>
        <path d="M8 3h8l-1.5 7a4.5 4.5 0 0 1-5 0Z" />
        <line x1="12" y1="10" x2="12" y2="19" />
        <line x1="8.5" y1="19" x2="15.5" y2="19" />
      </svg>;
    case "grape":
      return <svg viewBox="0 0 24 24" style={s}>
        <circle cx="12" cy="6" r="2" />
        <circle cx="8.5" cy="10" r="2" />
        <circle cx="15.5" cy="10" r="2" />
        <circle cx="10" cy="14" r="2" />
        <circle cx="14" cy="14" r="2" />
        <circle cx="12" cy="18" r="2" />
        <path d="M12 4 C13.5 1.5 16.5 2 17.5 3.5" />
      </svg>;
    case "boat":
      return <svg viewBox="0 0 24 24" style={s}>
        <path d="M3 17 C7 13.5 10 13 12 13 C14 13 17 13.5 21 17" />
        <path d="M6.5 13 L8.5 6 L15.5 6 L17.5 13" />
        <line x1="12" y1="6" x2="12" y2="2" />
        <path d="M12 2 L16 5 L12 8" />
      </svg>;
    case "train":
      return <svg viewBox="0 0 24 24" style={s}>
        <rect x="5" y="3" width="14" height="13" rx="2" />
        <line x1="5" y1="10" x2="19" y2="10" />
        <circle cx="8.5" cy="14.5" r="1.5" />
        <circle cx="15.5" cy="14.5" r="1.5" />
        <path d="M7 21 L9 17" />
        <path d="M17 21 L15 17" />
      </svg>;
    case "mountain":
      return <svg viewBox="0 0 24 24" style={s}>
        <path d="M3 20 L10 7 L14 14 L17 9 L21 20 Z" />
        <path d="M8.5 11.5 L12 10 L13 11.5" strokeOpacity="0.5" strokeWidth="1" />
      </svg>;
    case "village":
      return <svg viewBox="0 0 24 24" style={s}>
        <path d="M3 20 V11 L9 5 L15 11 V20" />
        <path d="M15 14 L20 10 V20" />
        <line x1="3" y1="20" x2="21" y2="20" />
        <rect x="7" y="14.5" width="4" height="5.5" />
      </svg>;
    case "plane":
      return <svg viewBox="0 0 24 24" style={s}>
        <path d="M22 16 L2 9 L5 8 L9 10 L14 3 L16 4 L13 11 L18 13 Z" />
        <line x1="5.5" y1="18" x2="10" y2="15.5" strokeOpacity="0.55" />
      </svg>;
    case "boot":
      return <svg viewBox="0 0 24 24" style={s}>
        <path d="M5 20 L5 7 C5 5.5 6 4 8 4 L8 12 C10 12 14 14 17 16 L19 20 Z" />
        <line x1="4" y1="20" x2="20" y2="20" />
      </svg>;
    case "flag":
      return <svg viewBox="0 0 24 24" style={s}>
        <line x1="5" y1="3" x2="5" y2="21" />
        <path d="M5 3 L19 7 L5 12 Z" />
      </svg>;
    case "pin":
      return <svg viewBox="0 0 24 24" style={s}>
        <path d="M12 2 C8.5 2 5.5 5 5.5 9 C5.5 14.5 12 22 12 22 C12 22 18.5 14.5 18.5 9 C18.5 5 15.5 2 12 2 Z" />
        <circle cx="12" cy="9" r="3" />
      </svg>;
    default:
      return null;
  }
}

// ============================================================
// PAGE
// ============================================================
export default function DouroPage() {
  const datas2026 = datasDoAno(GRUPO, 2026);
  const datas2027 = datasDoAno(GRUPO, 2027);

  return (
    <main className="relative" style={{ background: D.creme }}>
      <Nav />

      {/* ===== HERO ===== */}
      <section className="relative flex min-h-[100svh] w-full items-center overflow-hidden" style={{ background: D.noite }}>
        <motion.div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${wx(IMG.pano, 2400, 1500)}')` }}
          initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 14, ease: "easeOut" }} />
        <div className="absolute inset-0"
          style={{ background: `linear-gradient(to right, ${D.noite}f2 0%, ${D.noite}b0 52%, ${D.noite}66 100%)` }} />
        <motion.div className="absolute inset-0 z-[1]" style={{ background: D.noite, pointerEvents: "none" }}
          initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 0.9, delay: 0.4 }} />

        <div className="relative z-10 mx-auto grid w-full max-w-[1400px] items-center gap-10 px-6 py-28 md:grid-cols-2 md:gap-16 md:px-10">
          <div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 }} className="mb-4 flex items-center gap-3">
              <Icon name="pin" size={14} color={D.ouro} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.4em]" style={{ color: D.ouro }}>
                Portugal · Vale do Douro
              </span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
              className="font-display font-light uppercase leading-[0.86] tracking-[-0.02em]"
              style={{ fontSize: "clamp(3.2rem, 8vw, 7.5rem)", color: D.creme }}>
              Douro
              <br />
              <span style={{ color: D.vinho }}>Experience</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.48 }}
              className="mt-3 font-display font-light italic"
              style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)", color: D.creme, opacity: 0.62 }}>
              Oito dias. Cinquenta e oito quilômetros. Um rio que virou vinho.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.55 }}
              className="mt-6 max-w-md text-[15px] font-light leading-relaxed md:text-base"
              style={{ color: "rgba(243,236,224,0.74)" }}>
              Caminhada guiada entre as vinhas, quintas e aldeias vinhateiras do Vale do Douro,
              Patrimônio UNESCO. Setembro é o mês da vindima, e você estará{" "}
              <span style={{ color: D.creme }}>lá no momento certo.</span>
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.7 }} className="mt-8 flex flex-wrap items-center gap-5">
              <a href="#reservar"
                className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]"
                style={{ background: D.terracota, color: D.creme }}>
                Reserve sua vaga <span>&#8594;</span>
              </a>
              <span>
                <span className="text-[12px] uppercase tracking-[0.16em]" style={{ color: "rgba(243,236,224,0.5)" }}>a partir de</span>{" "}
                <span className="font-display text-2xl" style={{ color: D.creme }}>€ 5.100</span>
              </span>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.95 }}
              className="mt-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.16em]"
              style={{ borderColor: D.sage, color: D.sage }}>
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: D.sage }} />
              Próxima saída · 14 a 21 Set 2026
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.35 }}
            className="mx-auto hidden w-full max-w-[440px] md:block" style={{ height: 460 }}>
            <RioSocalcos />
          </motion.div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="grid grid-cols-2 gap-px md:grid-cols-3 lg:grid-cols-6"
        style={{ background: D.line, borderTop: `1px solid ${D.line}` }}>
        {STATS.map((s, i) => (
          <Reveal key={i} delay={i * 0.04}>
            <div className="flex flex-col px-6 py-8" style={{ background: D.casca }}>
              <span className="font-display font-light leading-none" style={{ fontSize: "clamp(1.7rem,3vw,2.5rem)", color: D.creme }}>{s.v}</span>
              <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: D.sage }}>{s.u}</span>
              <span className="mt-1 text-[12px] font-light" style={{ color: D.textSoft }}>{s.s}</span>
            </div>
          </Reveal>
        ))}
      </section>

      {/* ===== CENTERPIECE — OS SOCALCOS (fundo claro — Mother of Pearl) ===== */}
      <section className="relative w-full overflow-hidden" style={{ background: D.creme }}>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
          <span className="select-none font-display font-light uppercase"
            style={{ fontSize: "clamp(5rem,18vw,16rem)", color: "rgba(63,21,33,0.055)",
              letterSpacing: "-0.04em", lineHeight: 1, whiteSpace: "nowrap" }}>
            DOURO
          </span>
        </div>
        <div className="relative z-10 mx-auto max-w-[1000px] px-6 py-32 text-center md:py-44">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em]" style={{ color: D.sage }}>
              A escultura que virou Patrimônio
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display font-light leading-[1.05]" style={{ fontSize: "clamp(2.4rem,5.5vw,4.6rem)", color: D.vinho }}>
              Os socalcos
              <br />
              <span className="italic" style={{ color: D.sage }}>esculpidos à mão</span>
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mx-auto mt-8 max-w-2xl text-[16px] font-light leading-relaxed" style={{ color: "rgba(40,12,20,0.65)" }}>
              Por dois mil anos, gerações de agricultores ergueram terraços de xisto nas encostas
              do Douro para plantar videiras onde não havia chão plano. O resultado é uma das
              paisagens mais impressionantes do mundo, reconhecida pela UNESCO como Patrimônio
              da Humanidade.{" "}
              <span style={{ color: D.vinho, fontStyle: "italic" }}>Você caminha dentro dessa obra de arte.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== PERFIL DE ELEVAÇÃO ===== */}
      <section className="w-full overflow-hidden pb-0 pt-16" style={{ background: D.casca }}>
        <div className="mx-auto px-4 md:px-8">
          <Reveal>
            <p className="mb-8 text-center text-[11px] font-semibold uppercase tracking-[0.4em]" style={{ color: D.ouro, opacity: 0.8 }}>
              Perfil da caminhada · 58,7 km · Régua ao Porto
            </p>
          </Reveal>
          <Reveal delay={0.05}><ElevationProfile /></Reveal>
        </div>
      </section>

      {/* ===== 3 MARCOS ===== */}
      {MARCOS.map((m) => (
        <section key={m.id} className="w-full" style={{ background: m.bg }}>
          <div className={`grid md:grid-cols-2 ${m.imgDireita ? "" : "md:[direction:rtl]"}`}>
            <div className="relative min-h-[420px] overflow-hidden md:min-h-[560px]" style={{ direction: "ltr" }}>
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-[1.03]"
                style={{ backgroundImage: `url('${wx(m.img, 1400, 1000)}')` }} />
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
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: D.verde }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: D.sage }}>Experiências incluídas</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 font-display font-light leading-[1.05]" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: D.creme }}>
              Cada gole tem
              <br />
              <span className="italic" style={{ color: D.terracota }}>uma história atrás</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-xl text-[15px] font-light leading-relaxed" style={{ color: D.textSoft }}>
              Não é só caminhada. São seis experiências enogastronômicas únicas no coração do
              Vale do Douro, incluídas no programa e guiadas por quem entende da terra.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {EXPERIENCIAS.map((e, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="group relative rounded-2xl p-7 transition-all duration-300"
                  style={{ background: "rgba(122,143,98,0.10)", border: `1px solid rgba(122,143,98,0.22)` }}>
                  <div className="mb-4 flex items-center justify-between">
                    <Icon name={e.icon} size={22} color={D.sage} />
                    <span className="rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.2em]"
                      style={{ background: "rgba(42,56,32,0.6)", color: D.sage }}>{e.tag}</span>
                  </div>
                  <h3 className="font-display font-light" style={{ fontSize: "1.15rem", color: D.creme }}>{e.t}</h3>
                  <p className="mt-2 text-[13px] font-light leading-relaxed" style={{ color: D.textSoft }}>{e.s}</p>
                  <div className="mt-4 h-px w-0 transition-all duration-500 group-hover:w-full" style={{ background: D.terracota }} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOSPEDAGENS — fundo creme (segundo bloco editorial claro) ===== */}
      <section className="w-full" style={{ background: D.creme }}>
        <div className="grid md:grid-cols-2">
          <div className="relative min-h-[420px] overflow-hidden md:min-h-[560px]">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-[1.03]"
              style={{ backgroundImage: `url('${wx(IMG.quarto, 1400, 1000)}')` }} />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 40%, rgba(40,12,20,0.55) 100%)` }} />
            <div className="absolute bottom-4 left-5">
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: D.creme }}>
                Hotéis e Quintas 4 estrelas · Vista para o vale
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-center px-8 py-16 md:px-14 md:py-20">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: D.sage }}>Hospedagens</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-display font-light uppercase leading-[0.88]" style={{ fontSize: "clamp(2.4rem,4.5vw,4rem)", color: D.vinho }}>
                Acordar com
                <br />
                <span style={{ color: D.sage }}>o Douro</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-6 max-w-sm text-[15px] font-light leading-relaxed" style={{ color: "rgba(40,12,20,0.65)" }}>
                Hotéis e quintas 4 estrelas escolhidos pela posição no vale e pela vista
                privilegiada para o rio e os socalcos. Você caminha leve porque a bagagem vai à
                frente no pick-up matinal do guia.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 space-y-3">
                {[
                  "Quartos duplos com vista para o vale do Douro",
                  "Bagagem transferida entre hospedagens pelo guia",
                  "Café da manhã incluso todos os dias",
                  "Estrutura 4 estrelas antes e depois de cada etapa",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-[13px] font-light" style={{ color: "rgba(40,12,20,0.62)" }}>
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: D.sage }} />
                    {item}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== GALERIA ===== */}
      <section className="px-6 py-20 md:px-10 md:py-28" style={{ background: D.casca }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: D.ouro }}>Galeria</p>
            <h2 className="mt-4 font-display font-light" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: D.creme }}>
              O que você vai viver
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-8"><GaleriaInterativa /></Reveal>
        </div>
      </section>

      {/* ===== ROTEIRO ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: D.noite }}>
        <div className="mx-auto max-w-[1100px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: D.ouro }}>Roteiro dia a dia</p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-3 max-w-lg text-[14px] font-light leading-relaxed" style={{ color: D.textSoft }}>
              Seis dias de caminhada real entre vinhas, quintas e aldeias vinhateiras,
              com chegada tranquila em Régua e saída de comboio histórico do Pinhão ao Porto.
            </p>
          </Reveal>
          <div className="mt-12">
            {ROTEIRO.map((r, i) => (
              <Reveal key={r.d} delay={i * 0.04}>
                <div className="grid grid-cols-[auto_1fr] items-baseline gap-6 border-t py-7 md:gap-10" style={{ borderColor: D.line }}>
                  <div className="flex items-center gap-4">
                    <span className="font-display text-sm" style={{ color: D.vinho }}>{r.d}</span>
                    <Icon name={r.icon} size={18} color={D.sage} />
                  </div>
                  <div>
                    <h3 className="font-display font-light" style={{ fontSize: "clamp(1.1rem,2vw,1.5rem)", color: D.creme }}>{r.t}</h3>
                    <p className="mt-1.5 text-[14px] font-light leading-relaxed" style={{ color: D.textSoft }}>{r.s}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== O LÍDER DA JORNADA · JULIANO ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: D.casca, color: D.creme }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: D.ouro }}>
              <span className="h-px w-8" style={{ background: D.ouro }} />
              O líder da jornada
            </p>
          </Reveal>

          <div className="mt-10 grid items-start gap-10 md:grid-cols-[420px_1fr] md:gap-16">
            <Reveal>
              <div className="relative overflow-hidden rounded-2xl" style={{ height: 540 }}>
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${wx(IMG.retrato, 900, 1200)}')` }} />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${D.casca}ee 0%, transparent 55%)` }} />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="font-display text-[1.6rem] font-light leading-tight" style={{ color: D.creme }}>Juliano P. Sant'ana</p>
                  <p className="mt-1 text-[12px] uppercase tracking-[0.18em]" style={{ color: D.ouro }}>Blumenau · Santa Catarina</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div>
                <h2 className="font-display font-light leading-[1.05] tracking-[-0.01em]" style={{ fontSize: "clamp(2rem,3.8vw,3rem)", color: D.creme }}>
                  Juliano P. Sant'ana
                </h2>
                <p className="mt-2 text-[12px] uppercase tracking-[0.2em]" style={{ color: D.ouro }}>Sócio-fundador da TARGET Trekking</p>
                <p className="mt-6 max-w-xl text-[15px] font-light leading-relaxed" style={{ color: "rgba(243,236,224,0.74)" }}>
                  Apaixonado pelos esportes de natureza, do salto de paraquedas ao mergulho.
                  Montanhista por paixão, peregrino e amante de trilhas e viagens de caminhada
                  que promovam transformação e encontros humanos. Especialista em gestão e
                  marketing, tem como missão de vida conectar pessoas à natureza e a si mesmas
                  através das caminhadas.
                </p>

                <div className="mt-8">
                  <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: "rgba(243,236,224,0.4)" }}>
                    Expedições de referência
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Salkantay a Machu Picchu · 4.600 m",
                      "Aconcágua · 6.962 m",
                      "Kilimanjaro · 5.895 m",
                      "Huayna Potosí · 6.088 m",
                      "Monte Roraima · 3 anos",
                      "Tour du Mont Blanc",
                      "Alta Via 1 · Dolomitas",
                      "Caminho de Santiago · 515 km",
                    ].map((p) => (
                      <span key={p} className="flex items-center gap-2 rounded-full border px-4 py-1.5 text-[12px] font-light"
                        style={{ borderColor: "rgba(200,154,78,0.3)", color: "rgba(243,236,224,0.7)" }}>
                        <Icon name="mountain" size={12} color="rgba(200,154,78,0.55)" />
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 rounded-2xl border px-5 py-4 text-[13px] font-light leading-relaxed"
                  style={{ borderColor: D.line, color: "rgba(243,236,224,0.66)" }}>
                  Em campo, o programa conta com guias locais especializados no Douro e suporte
                  completo de logística entre as hospedagens, com{" "}
                  <span style={{ color: D.ouro }}>bagagem transferida entre cada etapa.</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== RESERVE SUA VAGA + PREÇO ===== */}
      <section id="reservar" className="px-6 py-24 md:px-10 md:py-32" style={{ background: D.vinhoDeep }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: D.creme, opacity: 0.6 }}>Saídas disponíveis</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-display font-light leading-[1.05]" style={{ fontSize: "clamp(2rem,4.5vw,3.6rem)", color: D.creme }}>
              Quando você quer
              <br />
              <span className="italic" style={{ color: D.ouro }}>caminhar pelo Douro?</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {datas2026.map((d) => (
                <div key={d} className="rounded-2xl p-7" style={{ background: "rgba(138,31,45,0.22)", border: `1px solid rgba(138,31,45,0.5)` }}>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ background: D.vinho, color: D.creme }}>2026</span>
                    <span className="text-[11px]" style={{ color: D.textSoft }}>8 dias</span>
                  </div>
                  <p className="mt-6 font-display font-light" style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", color: D.creme }}>{d}</p>
                  <p className="mt-1 text-[12px] font-light" style={{ color: D.textSoft }}>Vale do Douro · Portugal · Setembro 2026</p>
                  <a href="#contato" className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] transition-opacity hover:opacity-75" style={{ color: D.ouro }}>
                    Reservar vaga &#8594;
                  </a>
                </div>
              ))}
              {datas2027.map((d) => (
                <div key={d} className="rounded-2xl p-7" style={{ background: "rgba(138,31,45,0.12)", border: `1px solid rgba(138,31,45,0.3)` }}>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ border: `1px solid ${D.vinho}`, color: D.vinho }}>2027</span>
                    <span className="text-[11px]" style={{ color: D.textSoft }}>8 dias</span>
                  </div>
                  <p className="mt-6 font-display font-light" style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", color: D.creme }}>{d}</p>
                  <p className="mt-1 text-[12px] font-light" style={{ color: D.textSoft }}>Vale do Douro · Portugal · Setembro 2027</p>
                  <a href="#contato" className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] transition-opacity hover:opacity-75" style={{ color: D.ouro }}>
                    Reservar vaga &#8594;
                  </a>
                </div>
              ))}
              <div className="rounded-2xl p-7" style={{ background: "rgba(200,154,78,0.08)", border: `1px solid rgba(200,154,78,0.2)` }}>
                <div className="flex items-center justify-between">
                  <span className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ border: `1px solid ${D.ouro}`, color: D.ouro }}>grupo pequeno</span>
                  <span className="text-[11px]" style={{ color: D.textSoft }}>mín. 5 pessoas</span>
                </div>
                <p className="mt-6 font-display font-light" style={{ fontSize: "clamp(1.3rem,2.5vw,1.9rem)", color: D.creme }}>
                  Liderança brasileira
                </p>
                <p className="mt-1 text-[12px] font-light" style={{ color: D.textSoft }}>
                  Juliano (TARGET) + guias especializados no Douro
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-14 flex flex-col gap-4 border-t pt-10 md:flex-row md:items-center md:justify-between" style={{ borderColor: "rgba(138,31,45,0.35)" }}>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: D.textSoft }}>Investimento</p>
                <p className="mt-2 font-display font-light" style={{ fontSize: "clamp(2rem,3.5vw,2.8rem)", color: D.creme }}>
                  € 5.100
                  <span className="ml-3 text-[14px]" style={{ color: D.textSoft }}>por pessoa · quarto duplo</span>
                </p>
                <p className="mt-1 text-[13px] font-light" style={{ color: D.textSoft }}>
                  30% de entrada via Pix ou transferência + 5x sem juros no cartão. Vagas limitadas.
                </p>
                <p className="mt-1 text-[11px] font-light" style={{ color: "rgba(243,236,224,0.4)" }}>
                  Valor em Euro, base câmbio na data do fechamento.
                </p>
              </div>
              <a href="#contato" className="inline-flex shrink-0 items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]" style={{ background: D.terracota, color: D.creme }}>
                Falar com a equipe &#8594;
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== INCLUSO / NÃO INCLUSO ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: D.casca, color: D.creme }}>
        <div className="mx-auto grid max-w-[1280px] gap-12 md:grid-cols-2 md:gap-20">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: D.ouro }}>Está incluso</p>
            <ul className="mt-8 space-y-4">
              {INCLUSO.map((item) => (
                <li key={item} className="flex items-start gap-4 text-[14px] font-light leading-relaxed" style={{ color: D.creme }}>
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: D.vinho }} />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: "rgba(138,31,45,0.7)" }}>Não incluso</p>
            <ul className="mt-8 space-y-4">
              {NAO_INCLUSO.map((item) => (
                <li key={item} className="flex items-start gap-4 text-[14px] font-light leading-relaxed" style={{ color: D.textSoft }}>
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "rgba(138,31,45,0.4)" }} />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-10 rounded-2xl border p-5" style={{ borderColor: D.line }}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: D.ouro }}>Cancelamento</p>
              <div className="mt-4 space-y-2 text-[13px] font-light" style={{ color: D.textSoft }}>
                <div className="flex justify-between"><span>31 dias ou mais</span><span style={{ color: D.creme }}>10%</span></div>
                <div className="flex justify-between"><span>30 a 21 dias</span><span style={{ color: D.creme }}>20%</span></div>
                <div className="flex justify-between"><span>20 a 8 dias</span><span style={{ color: D.creme }}>50%</span></div>
                <div className="flex justify-between"><span>7 dias ou menos</span><span style={{ color: D.creme }}>100%</span></div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== AONIKIA ===== */}
      <section className="px-6 py-20 md:px-10 md:py-24" style={{ background: D.vinhoDeep }}>
        <div className="mx-auto max-w-[860px] text-center">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: D.creme, opacity: 0.6 }}>
              AonikIA · especialista no Douro Experience
            </p>
            <h2 className="mt-5 font-display font-light leading-[1.15]" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: D.creme }}>
              Pergunte tudo sobre o Douro
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] font-light leading-relaxed" style={{ color: "rgba(243,236,224,0.66)" }}>
              Como se preparar para a caminhada nas vinhas, o que acontece em setembro na
              vindima, o que levar na mochila, como funciona o comboio histórico. A AonikIA
              conhece este programa de ponta a ponta.
            </p>
            <a href="#contato" className="mt-7 inline-flex items-center gap-3 rounded-full border px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 hover:opacity-80" style={{ borderColor: D.sage, color: D.sage }}>
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
