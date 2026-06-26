"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Contato from "../../components/Contato";
import FloatingActions from "../../components/FloatingActions";
import { Reveal, EASE } from "../../components/ui";

const D = {
  noite:     "#130c0e",
  casca:     "#1e141a",
  vinho:     "#3f1521",
  vinhoDeep: "#280c14",
  ouro:      "#c4a56a",
  ouroVivo:  "#e3c98e",
  verde:     "#2a3820",
  rio:       "#6d9290",
  creme:     "#ede6dd",
  sage:      "#7a8f62",
  terracota: "#be6549",
  pedra:     "#9e8e82",
  line:      "rgba(196,165,106,0.18)",
  textSoft:  "rgba(237,230,221,0.62)",
};

const wx = (file: string, w: number, h: number) =>
  `https://static.wixstatic.com/media/${file}/v1/fill/w_${w},h_${h},al_c,q_82,enc_avif,quality_auto/img.jpg`;

const IMG = {
  pano:    "2d4f5b_edfea84f57b54f589aff44727039c42e~mv2.jpg",
  rio:     "2d4f5b_7edb87bf58444c00a4e2f0882eaff778~mv2.jpg",
  hiker:   "2d4f5b_01a03621c9fe4cd9812047b9543c423f~mv2.jpg",
  caminhante: "2d4f5b_7c097261ec654f24aa4eb9b1d1ea026f~mv2.jpg",
  rabelo:  "2d4f5b_53f3c344579445728e0ee4bb619d3afe~mv2.jpeg",
  quarto:  "2d4f5b_5a366974e9d24c1ab879fcf6eccb3a0c~mv2.jpeg",
  socalcos:"2d4f5b_1a591d0a79f34de18c9f5340cb67f4d0~mv2.jpg",
  v1:      "2d4f5b_9105ce4c939c47649fa15ba1067bc5f8~mv2.jpeg",
  v2:      "2d4f5b_a061f8e60bac443f8f377482c18bfd8d~mv2.jpeg",
  v4:      "2d4f5b_9b69e44673094dcaa40961e4946dd3b0~mv2.jpeg",
};

// ============================================================
// COMPONENTE: RioSocalcos — assinatura do Douro
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
    { x: 225, y: 52,  label: "Alijó",          sub: "estadia",          anchor: "middle" as const, c: D.ouro  },
    { x: 212, y: 208, label: "Pinhão",         sub: "Quinta de La Rosa", anchor: "start"  as const, c: D.ouro  },
    { x: 248, y: 356, label: "Provesende",     sub: "aldeia vinhateira", anchor: "start"  as const, c: D.vinho },
    { x: 208, y: 484, label: "Porto",          sub: "chegada de trem",  anchor: "middle" as const, c: D.creme },
  ];

  return (
    <svg viewBox="0 0 460 540" className="h-full w-full" style={{ overflow: "visible" }}>
      <motion.circle cx="365" cy="78" r="30" fill={D.ouro}
        initial={{ opacity: 0 }} animate={{ opacity: [0.14, 0.30, 0.14] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />
      <motion.circle cx="365" cy="78" r="30" fill="none" stroke={D.ouro} strokeWidth="1.2"
        animate={{ r: [30, 46, 30], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />

      {[[52, 52], [105, 36], [420, 150], [78, 104], [390, 55], [24, 160]].map(([x, y], i) => (
        <motion.circle key={i} cx={x} cy={y} r="1.3" fill={D.ouroVivo}
          initial={{ opacity: 0 }} animate={{ opacity: [0.12, 0.6, 0.12] }}
          transition={{ duration: 3.2 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.35 }} />
      ))}

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

      <motion.path d={rioPath} fill="none" stroke={D.rio} strokeWidth="5"
        strokeOpacity="0.14" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 2.8, ease: EASE, delay: 0.4 }} />
      <motion.path d={rioPath} fill="none" stroke={D.rio} strokeWidth="2.2"
        strokeDasharray="2 7" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 3.2, ease: EASE, delay: 0.7 }} />
      <motion.path d={rioPath} fill="none" stroke={D.ouroVivo} strokeWidth="2.6"
        strokeLinecap="round" strokeDasharray="12 460"
        initial={{ strokeDashoffset: 472, opacity: 0 }}
        animate={{ strokeDashoffset: [472, 0], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 3.2 }} />

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
        style={{ fontStyle: "italic" }}>Luxury</motion.text>
    </svg>
  );
}

// ============================================================
// ElevationProfile — socalcos em degraus (caminhadas curtas)
// ============================================================
const HILL_PATH =
  "M 0,160 L 70,160 L 78,138 L 150,138 " +
  "L 158,116 L 230,116 L 238,96 L 300,96 " +
  "L 308,124 L 380,124 L 388,152 L 452,152 " +
  "L 460,184 L 520,184 L 528,160 L 600,160 " +
  "L 608,140 L 680,140 L 688,158 L 760,158 " +
  "L 768,150 L 866,150 L 872,146 L 960,146";

const HILL_FILL = HILL_PATH + " L 960,248 L 0,248 Z";

const PERFIL = [
  { x: 14,  y: 160, label: "Alijó",           sub: "base",        anchor: "start"  as const },
  { x: 300, y: 96,  label: "Castedo",         sub: "8,2 km",      anchor: "middle" as const },
  { x: 488, y: 184, label: "Casal de Loivos",  sub: "5,7 km · BBC", anchor: "middle" as const },
  { x: 680, y: 140, label: "Provesende",      sub: "7,2 km",      anchor: "middle" as const },
  { x: 946, y: 146, label: "Porto",           sub: "chegada",     anchor: "end"    as const },
];

function ElevationProfile() {
  return (
    <svg viewBox="0 0 960 260" className="w-full" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="dlFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={D.ouro}  stopOpacity="0.34" />
          <stop offset="48%" stopColor={D.vinho} stopOpacity="0.26" />
          <stop offset="100%" stopColor={D.vinho} stopOpacity="0.04" />
        </linearGradient>
      </defs>
      {[90, 130, 170, 210].map((y) => (
        <line key={y} x1={0} y1={y} x2={960} y2={y} stroke={D.line} strokeWidth="0.5" />
      ))}
      <path d={HILL_FILL} fill="url(#dlFill)" />
      <motion.path d={HILL_PATH} fill="none" stroke={D.ouro} strokeWidth="2.2"
        strokeLinejoin="round" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true }}
        transition={{ duration: 4.2, ease: EASE, delay: 0.2 }} />
      <motion.path d={HILL_PATH} fill="none" stroke={D.sage} strokeWidth="0.8"
        strokeLinejoin="round" strokeLinecap="round" strokeOpacity="0.4"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true }}
        transition={{ duration: 4.8, ease: EASE, delay: 0.5 }} />
      {PERFIL.map((w) => (
        <g key={w.label}>
          <line x1={w.x} y1={w.y} x2={w.x} y2={228} stroke={D.ouro} strokeWidth="1"
            strokeDasharray="2 4" strokeOpacity="0.4" />
          <circle cx={w.x} cy={w.y} r="4.5" fill={D.casca} stroke={D.ouro} strokeWidth="1.8" />
          <circle cx={w.x} cy={w.y} r="1.8" fill={D.ouro} />
          <text x={w.x} y={w.y - 10} fill={D.creme} fontSize="10" textAnchor={w.anchor}
            letterSpacing="0.5" style={{ fontFamily: "sans-serif" }}>{w.label}</text>
          <text x={w.x} y={w.y - 22} fill={D.ouro} fontSize="8.5" textAnchor={w.anchor}
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
  { id: IMG.pano,    cap: "O Vale do Douro, Patrimônio UNESCO da humanidade", tag: "Vale" },
  { id: IMG.quarto,  cap: "Estadia em quintas históricas com vista para o rio", tag: "Quinta" },
  { id: IMG.rio,     cap: "O Douro refletindo os socalcos de xisto", tag: "Rio" },
  { id: IMG.rabelo,  cap: "Barco rabelo no Cais do Pinhão", tag: "Pinhão" },
  { id: IMG.socalcos,cap: "Terraços esculpidos à mão ao longo de séculos", tag: "Socalcos" },
  { id: IMG.caminhante, cap: "Caminhadas curtas e refinadas, com mochila de ataque", tag: "Trilha" },
  { id: IMG.v1,      cap: "Quintas vinhateiras na encosta do vale", tag: "Quintas" },
  { id: IMG.v2,      cap: "O Douro ao amanhecer entre as vinhas", tag: "Amanhecer" },
  { id: IMG.v4,      cap: "Vinhas e socalcos, a paisagem que vira Vinho do Porto", tag: "Vinhas" },
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
              outline: i === idx ? `2px solid ${D.ouro}` : "2px solid transparent", outlineOffset: 2 }}>
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
  { v: "6",      u: "dias",        s: "5 noites" },
  { v: "27,2",   u: "quilômetros", s: "4 dias de caminhada leve" },
  { v: "5",      u: "quintas",     s: "provas exclusivas incluídas" },
  { v: "2",      u: "pessoas",     s: "saída mínima, exclusivo" },
  { v: "Vintage",u: "Port",        s: "três provas na Quinta do Bomfim" },
  { v: "UNESCO", u: "Patrimônio",  s: "Paisagem Cultural do Douro" },
];

const LUXO = [
  { icon: "village",  t: "Estadias em quintas históricas",
    s: "Você dorme dentro do Douro: o Forrester Essence em Alijó e a histórica Quinta de La Rosa, em Pinhão, com adegas próprias e vista para o vale." },
  { icon: "wine",     t: "Provas exclusivas",
    s: "Três Vinhos do Porto Vintage na Quinta do Bomfim e uma prova de quatro vinhos na La Rosa, com tour pelas caves de envelhecimento." },
  { icon: "boot",     t: "Caminhadas curtas e refinadas",
    s: "Etapas de 5,7 a 8,2 km, com mochila de ataque (carga leve) e lunch box. Caminha-se o melhor do vale, sem desgaste." },
  { icon: "grape",    t: "Imersão enogastronômica",
    s: "Da vindima na Quinta da Avessada ao pão quente de Favaios, cada dia guarda uma experiência sensorial incluída no programa." },
];

const MARCOS = [
  {
    id: "luxury-quintas",
    kicker: "O coração do luxo",
    titulo: ["As", "Quintas"],
    texto:
      "Aqui você não se hospeda em hotéis genéricos: dorme dentro das próprias quintas que fazem o Douro. O Forrester Essence em Alijó e a histórica Quinta de La Rosa, em Pinhão, com caves de envelhecimento, adegas e vinhas que descem até o rio. Acordar é abrir a janela para a paisagem que vira vinho.",
    detalhe: "Forrester Essence Douro · Quinta de La Rosa",
    img: IMG.quarto,
    bg: D.casca,
    imgDireita: true,
    colors: {
      kicker: D.ouro, title: D.creme, titleAccent: D.ouro,
      body: "rgba(243,236,224,0.78)", detalhe: D.ouro, link: D.creme,
    },
  },
  {
    id: "luxury-rio",
    kicker: "Dia 4 · O espelho das vinhas",
    titulo: ["O Rio", "Douro"],
    texto:
      "Na Quinta do Bomfim você prova três Vinhos do Porto Vintage com o Douro aos seus pés. Depois, embarca num barco rabelo, o mesmo que levava o vinho até o Porto, e desliza por entre os socalcos refletidos na água. É o Douro no seu momento mais íntimo e mais lendário.",
    detalhe: "Quinta do Bomfim · Barco Rabelo · Cais do Pinhão",
    img: IMG.rabelo,
    bg: D.verde,
    imgDireita: false,
    colors: {
      kicker: D.sage, title: D.creme, titleAccent: D.sage,
      body: "rgba(237,230,221,0.78)", detalhe: D.creme, link: D.creme,
    },
  },
  {
    id: "luxury-aldeias",
    kicker: "Dias 2 e 5 · Xisto, Moscatel e memória",
    titulo: ["As Aldeias", "Vinhateiras"],
    texto:
      "Favaios tem Moscatel e o pão que sai quente dos fornos artesanais. Provesende guarda o pelourinho e a fonte de granito de 1755. Casal de Loivos abre para um dos miradouros mais belos do mundo, eleito pela BBC. Você caminha curto, mas entra fundo em cada aldeia.",
    detalhe: "Favaios · Provesende · Casal de Loivos (BBC)",
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
  { icon: "wine",     t: "Quinta do Bomfim",   s: "Três provas exclusivas de Vinho do Porto Vintage, com vista para o Douro.",            tag: "Dia 4" },
  { icon: "wine",     t: "Quinta de La Rosa",  s: "Tour pelas caves de envelhecimento e prova de quatro vinhos (2 DOC Douro, 2 Porto).",   tag: "Dia 5" },
  { icon: "grape",    t: "Quinta da Avessada", s: "Enoteca de Moscatel e Vinho do Porto, com vindima autêntica e prova.",                 tag: "Dia 2" },
  { icon: "wine",     t: "Quinta da Pacheca",  s: "Prova de vinhos e produtos regionais numa das quintas mais emblemáticas do vale.",     tag: "Dia 3" },
  { icon: "boat",     t: "Barco Rabelo",       s: "Passeio tradicional pelo Douro, no Cais do Pinhão, entre socalcos em espelho.",         tag: "Dia 4" },
  { icon: "train",    t: "Comboio Histórico",  s: "Pinhão ao Porto pela estação dos 24 azulejos, a saga do Vinho do Porto.",               tag: "Dia 6" },
];

const ROTEIRO = [
  { d: "01", icon: "plane",    t: "Chegada e aclimatação em Alijó",
    s: "Recepção no Aeroporto do Porto e transfer privado a Alijó (1h30). Check-in no Forrester Essence Douro. Dia desenhado para descansar e entrar no ritmo da viagem." },
  { d: "02", icon: "grape",    t: "Favaios a Alijó",
    s: "6,1 km · +157m · Início na Enoteca da Quinta da Avessada, com prova. Visita a Favaios, Aldeia Vinhateira, e ao Núcleo Museológico, com os fornos de pão artesanal. Regresso a Alijó." },
  { d: "03", icon: "wine",     t: "Castedo a Alijó",
    s: "8,2 km · +219m · Percurso circular por Lamego e Samodães, com a Igreja de São Pedro. Prova na Quinta da Pacheca. Transfer pela estrada panorâmica N222 a Pinhão, vila ribeirinha classificada pela UNESCO." },
  { d: "04", icon: "boat",     t: "Casal de Loivos a Pinhão",
    s: "5,7 km · +108m · Igreja de São Bartolomeu (barroco-rococó) e o Miradouro de Casal de Loivos, eleito pela BBC. Descida pelas vinhas até a Quinta do Bomfim, com três provas de Vinho do Porto Vintage, e passeio de barco rabelo." },
  { d: "05", icon: "mountain", t: "Provesende a Foz do Rio Pinhão",
    s: "7,2 km · +131m · Provesende, Aldeia Vinhateira com fonte de granito de 1755. Miradouro Torguiano de São Cristóvão. Visita à Quinta de La Rosa: caves, adegas de envelhecimento e prova de quatro vinhos." },
  { d: "06", icon: "train",    t: "Partida de comboio para o Porto",
    s: "Transfer à Estação Ferroviária do Pinhão, com os 24 painéis de azulejos. Comboio histórico até o Porto, Patrimônio UNESCO. Fim das operações." },
];

const INCLUSO = [
  "Hospedagem no Forrester Essence Douro e na histórica Quinta de La Rosa",
  "Café da manhã diário",
  "Transfer privado do Aeroporto do Porto ao Douro",
  "Enoteca da Quinta da Avessada com prova",
  "Núcleo Museológico de Favaios com prova",
  "Quinta da Pacheca com prova de vinhos e produtos regionais",
  "Quinta do Bomfim com três provas de Vinho do Porto Vintage",
  "Quinta de La Rosa: tour pelas caves e prova de quatro vinhos",
  "Passeio de barco rabelo no Douro",
  "Lunch box nos dias de caminhada",
  "Mochila de ataque (carga leve), bagagem transferida pela equipe",
  "Roteiro detalhado, mapas e tracks de GPS",
  "Bilhete de comboio Pinhão para o Porto",
  "Seguros de Acidentes Pessoais e Responsabilidade Civil",
  "Suporte online (Customer Success)",
];

const NAO_INCLUSO = [
  "Passagens aéreas",
  "Transfer de regresso ao aeroporto do Porto",
  "Seguro viagem",
  "Gorjetas",
  "Bebidas alcoólicas fora das provas programadas",
  "Despesas pessoais",
];

// ============================================================
// ÍCONES
// ============================================================
function Icon({ name, size = 22, color = "currentColor" }: { name: string; size?: number; color?: string }) {
  const s = {
    width: size, height: size, stroke: color, fill: "none",
    strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
    display: "block", flexShrink: 0,
  };
  switch (name) {
    case "wine":
      return <svg viewBox="0 0 24 24" style={s}><path d="M8 3h8l-1.5 7a4.5 4.5 0 0 1-5 0Z" /><line x1="12" y1="10" x2="12" y2="19" /><line x1="8.5" y1="19" x2="15.5" y2="19" /></svg>;
    case "grape":
      return <svg viewBox="0 0 24 24" style={s}><circle cx="12" cy="6" r="2" /><circle cx="8.5" cy="10" r="2" /><circle cx="15.5" cy="10" r="2" /><circle cx="10" cy="14" r="2" /><circle cx="14" cy="14" r="2" /><circle cx="12" cy="18" r="2" /><path d="M12 4 C13.5 1.5 16.5 2 17.5 3.5" /></svg>;
    case "boat":
      return <svg viewBox="0 0 24 24" style={s}><path d="M3 17 C7 13.5 10 13 12 13 C14 13 17 13.5 21 17" /><path d="M6.5 13 L8.5 6 L15.5 6 L17.5 13" /><line x1="12" y1="6" x2="12" y2="2" /><path d="M12 2 L16 5 L12 8" /></svg>;
    case "train":
      return <svg viewBox="0 0 24 24" style={s}><rect x="5" y="3" width="14" height="13" rx="2" /><line x1="5" y1="10" x2="19" y2="10" /><circle cx="8.5" cy="14.5" r="1.5" /><circle cx="15.5" cy="14.5" r="1.5" /><path d="M7 21 L9 17" /><path d="M17 21 L15 17" /></svg>;
    case "mountain":
      return <svg viewBox="0 0 24 24" style={s}><path d="M3 20 L10 7 L14 14 L17 9 L21 20 Z" /><path d="M8.5 11.5 L12 10 L13 11.5" strokeOpacity="0.5" strokeWidth="1" /></svg>;
    case "village":
      return <svg viewBox="0 0 24 24" style={s}><path d="M3 20 V11 L9 5 L15 11 V20" /><path d="M15 14 L20 10 V20" /><line x1="3" y1="20" x2="21" y2="20" /><rect x="7" y="14.5" width="4" height="5.5" /></svg>;
    case "plane":
      return <svg viewBox="0 0 24 24" style={s}><path d="M22 16 L2 9 L5 8 L9 10 L14 3 L16 4 L13 11 L18 13 Z" /><line x1="5.5" y1="18" x2="10" y2="15.5" strokeOpacity="0.55" /></svg>;
    case "boot":
      return <svg viewBox="0 0 24 24" style={s}><path d="M5 20 L5 7 C5 5.5 6 4 8 4 L8 12 C10 12 14 14 17 16 L19 20 Z" /><line x1="4" y1="20" x2="20" y2="20" /></svg>;
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
export default function DouroLuxuryPage() {
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
                Caminhos de Portugal · Premium
              </span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
              className="font-display font-light uppercase leading-[0.86] tracking-[-0.02em]"
              style={{ fontSize: "clamp(3.2rem, 8vw, 7.5rem)", color: D.creme }}>
              Douro
              <br />
              <span style={{ color: D.ouro }}>Luxury</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.48 }}
              className="mt-3 font-display font-light italic"
              style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)", color: D.creme, opacity: 0.62 }}>
              Seis dias. O Douro inteiro, em estado de luxo.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.55 }}
              className="mt-6 max-w-md text-[15px] font-light leading-relaxed md:text-base"
              style={{ color: "rgba(243,236,224,0.74)" }}>
              O roteiro com o maior número de experiências exclusivas, com estadia em quintas
              históricas, provas de Vinho do Porto Vintage e caminhadas curtas e refinadas.{" "}
              <span style={{ color: D.creme }}>Premium e inesquecível.</span>
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.7 }} className="mt-8 flex flex-wrap items-center gap-5">
              <a href="#reservar"
                className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]"
                style={{ background: D.ouro, color: D.noite }}>
                Quero viver o Douro Luxury <span>&#8594;</span>
              </a>
              <span>
                <span className="text-[12px] uppercase tracking-[0.16em]" style={{ color: "rgba(243,236,224,0.5)" }}>a partir de</span>{" "}
                <span className="font-display text-2xl" style={{ color: D.creme }}>€ 2.130</span>
              </span>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.95 }}
              className="mt-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.16em]"
              style={{ borderColor: D.ouro, color: D.ouro }}>
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: D.ouro }} />
              Saídas o ano todo · estadias em quintas históricas
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
              <span className="font-display font-light leading-none" style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", color: D.creme }}>{s.v}</span>
              <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: D.ouro }}>{s.u}</span>
              <span className="mt-1 text-[12px] font-light" style={{ color: D.textSoft }}>{s.s}</span>
            </div>
          </Reveal>
        ))}
      </section>

      {/* ===== CENTERPIECE ===== */}
      <section className="relative w-full overflow-hidden" style={{ background: D.creme }}>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
          <span className="select-none font-display font-light uppercase"
            style={{ fontSize: "clamp(5rem,18vw,16rem)", color: "rgba(63,21,33,0.055)",
              letterSpacing: "-0.04em", lineHeight: 1, whiteSpace: "nowrap" }}>
            LUXURY
          </span>
        </div>
        <div className="relative z-10 mx-auto max-w-[1000px] px-6 py-32 text-center md:py-44">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em]" style={{ color: D.ouro }}>
              Luxo autêntico, não de vitrine
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display font-light leading-[1.05]" style={{ fontSize: "clamp(2.4rem,5.5vw,4.6rem)", color: D.vinho }}>
              O Douro vivido
              <br />
              <span className="italic" style={{ color: D.ouro }}>por inteiro</span>
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mx-auto mt-8 max-w-2xl text-[16px] font-light leading-relaxed" style={{ color: "rgba(40,12,20,0.65)" }}>
              Luxo aqui não é resort: é dormir dentro de uma quinta que produz vinho há séculos,
              provar um Vintage Port com o rio aos seus pés, caminhar o trecho mais bonito de cada
              dia e voltar para uma cama com vista para os socalcos.{" "}
              <span style={{ color: D.vinho, fontStyle: "italic" }}>Conexão, não amenidades.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== PERFIL DE ELEVAÇÃO ===== */}
      <section className="w-full overflow-hidden pb-0 pt-16" style={{ background: D.casca }}>
        <div className="mx-auto px-4 md:px-8">
          <Reveal>
            <p className="mb-8 text-center text-[11px] font-semibold uppercase tracking-[0.4em]" style={{ color: D.ouro, opacity: 0.8 }}>
              Perfil da caminhada · 27,2 km · 4 dias leves
            </p>
          </Reveal>
          <Reveal delay={0.05}><ElevationProfile /></Reveal>
        </div>
      </section>

      {/* ===== O QUE TORNA LUXO ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: D.casca, color: D.creme }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: D.ouro }}>
              <span className="h-px w-8" style={{ background: D.ouro }} />
              O que torna esta viagem luxo
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 max-w-2xl font-display font-light leading-[1.05]" style={{ fontSize: "clamp(2rem,4vw,3.2rem)", color: D.creme }}>
              Cada detalhe pensado para
              <br />
              <span className="italic" style={{ color: D.ouro }}>você só aproveitar</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {LUXO.map((c, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="h-full rounded-2xl p-7"
                  style={{ background: "rgba(196,165,106,0.06)", border: `1px solid ${D.line}` }}>
                  <Icon name={c.icon} size={24} color={D.ouro} />
                  <h3 className="mt-5 font-display font-light" style={{ fontSize: "1.2rem", color: D.creme }}>{c.t}</h3>
                  <p className="mt-2 text-[13px] font-light leading-relaxed" style={{ color: D.textSoft }}>{c.s}</p>
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
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: D.ouro }}>Experiências exclusivas incluídas</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 font-display font-light leading-[1.05]" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: D.creme }}>
              O melhor do Douro,
              <br />
              <span className="italic" style={{ color: D.ouroVivo }}>taça a taça</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-xl text-[15px] font-light leading-relaxed" style={{ color: D.textSoft }}>
              Cinco quintas, provas de Vinho do Porto Vintage, caves de envelhecimento e um passeio
              de barco rabelo. Tudo incluído, tudo marcado para você.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {EXPERIENCIAS.map((e, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="group relative rounded-2xl p-7 transition-all duration-300"
                  style={{ background: "rgba(196,165,106,0.07)", border: `1px solid rgba(196,165,106,0.2)` }}>
                  <div className="mb-4 flex items-center justify-between">
                    <Icon name={e.icon} size={22} color={D.ouro} />
                    <span className="rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.2em]"
                      style={{ background: "rgba(42,56,32,0.6)", color: D.ouroVivo }}>{e.tag}</span>
                  </div>
                  <h3 className="font-display font-light" style={{ fontSize: "1.15rem", color: D.creme }}>{e.t}</h3>
                  <p className="mt-2 text-[13px] font-light leading-relaxed" style={{ color: D.textSoft }}>{e.s}</p>
                  <div className="mt-4 h-px w-0 transition-all duration-500 group-hover:w-full" style={{ background: D.ouro }} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOSPEDAGENS ===== */}
      <section className="w-full" style={{ background: D.creme }}>
        <div className="grid md:grid-cols-2">
          <div className="relative min-h-[420px] overflow-hidden md:min-h-[560px]">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-[1.03]"
              style={{ backgroundImage: `url('${wx(IMG.quarto, 1400, 1000)}')` }} />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 40%, rgba(40,12,20,0.55) 100%)` }} />
            <div className="absolute bottom-4 left-5">
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: D.creme }}>
                Forrester Essence Douro · Quinta de La Rosa
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-center px-8 py-16 md:px-14 md:py-20">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: D.ouro }}>Hospedagens</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-display font-light uppercase leading-[0.88]" style={{ fontSize: "clamp(2.4rem,4.5vw,4rem)", color: D.vinho }}>
                Dormir dentro
                <br />
                <span style={{ color: D.ouro }}>do vinho</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-6 max-w-sm text-[15px] font-light leading-relaxed" style={{ color: "rgba(40,12,20,0.65)" }}>
                Três noites no Forrester Essence Douro, em Alijó, e duas na histórica Quinta de La
                Rosa, em Pinhão, com caves e adegas próprias. Conforto, gastronomia e vista para o
                vale do princípio ao fim.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 space-y-3">
                {[
                  "Forrester Essence Douro, em Alijó (noites 1 a 3)",
                  "Quinta de La Rosa, em Pinhão, com adegas próprias (noites 4 e 5)",
                  "Gastronomia regional de alto padrão",
                  "Bagagem transferida pela equipe entre as quintas",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-[13px] font-light" style={{ color: "rgba(40,12,20,0.62)" }}>
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: D.ouro }} />
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
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: D.creme }}>
        <div className="mx-auto max-w-[1100px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: D.ouro }}>Roteiro dia a dia</p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-3 max-w-lg text-[14px] font-light leading-relaxed" style={{ color: "rgba(40,12,20,0.55)" }}>
              Seis dias entre quintas históricas, com quatro dias de caminhada leve, chegada
              tranquila em Alijó e saída de comboio histórico do Pinhão ao Porto.
            </p>
          </Reveal>
          <div className="mt-12">
            {ROTEIRO.map((r, i) => (
              <Reveal key={r.d} delay={i * 0.04}>
                <div className="grid grid-cols-[auto_1fr] items-baseline gap-6 border-t py-7 md:gap-10"
                  style={{ borderColor: "rgba(196,165,106,0.22)" }}>
                  <div className="flex items-center gap-4">
                    <span className="font-display text-sm" style={{ color: "rgba(40,12,20,0.32)" }}>{r.d}</span>
                    <Icon name={r.icon} size={18} color={D.ouro} />
                  </div>
                  <div>
                    <h3 className="font-display font-light" style={{ fontSize: "clamp(1.1rem,2vw,1.5rem)", color: D.vinho }}>{r.t}</h3>
                    <p className="mt-1.5 text-[14px] font-light leading-relaxed" style={{ color: "rgba(40,12,20,0.58)" }}>{r.s}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RESERVE + PREÇO ===== */}
      <section id="reservar" className="px-6 py-24 md:px-10 md:py-32" style={{ background: D.vinhoDeep }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: D.creme, opacity: 0.6 }}>Tarifas e datas</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-display font-light leading-[1.05]" style={{ fontSize: "clamp(2rem,4.5vw,3.6rem)", color: D.creme }}>
              Você escolhe
              <br />
              <span className="italic" style={{ color: D.ouro }}>quando caminhar</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-xl text-[15px] font-light leading-relaxed" style={{ color: D.textSoft }}>
              Saídas o ano todo (exceto semanas de Páscoa e Natal), com saída mínima de 2 pessoas.
              A tarifa varia conforme a temporada.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              <div className="rounded-2xl p-7" style={{ background: "rgba(138,31,45,0.12)", border: `1px solid rgba(138,31,45,0.3)` }}>
                <div className="flex items-center justify-between">
                  <span className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ border: `1px solid ${D.vinho}`, color: D.creme }}>Temporada Baixa</span>
                  <span className="text-[11px]" style={{ color: D.textSoft }}>Nov a Abr</span>
                </div>
                <p className="mt-6 font-display font-light" style={{ fontSize: "clamp(2rem,3.5vw,2.8rem)", color: D.creme }}>€ 2.130</p>
                <p className="mt-1 text-[12px] font-light" style={{ color: D.textSoft }}>por pessoa · quarto duplo</p>
                <p className="mt-4 text-[12px] font-light" style={{ color: D.textSoft }}>Suplemento individual: + € 895</p>
              </div>

              <div className="rounded-2xl p-7" style={{ background: "rgba(196,165,106,0.12)", border: `1px solid rgba(196,165,106,0.45)` }}>
                <div className="flex items-center justify-between">
                  <span className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ background: D.ouro, color: D.noite }}>Temporada Alta</span>
                  <span className="text-[11px]" style={{ color: D.textSoft }}>Mai a Out</span>
                </div>
                <p className="mt-6 font-display font-light" style={{ fontSize: "clamp(2rem,3.5vw,2.8rem)", color: D.creme }}>€ 2.320</p>
                <p className="mt-1 text-[12px] font-light" style={{ color: D.textSoft }}>por pessoa · quarto duplo</p>
                <p className="mt-4 text-[12px] font-light" style={{ color: D.textSoft }}>Suplemento individual: + € 1.075</p>
              </div>

              <div className="rounded-2xl p-7" style={{ background: "rgba(196,165,106,0.08)", border: `1px solid rgba(196,165,106,0.2)` }}>
                <div className="flex items-center justify-between">
                  <span className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ border: `1px solid ${D.ouro}`, color: D.ouro }}>Reserva</span>
                  <span className="text-[11px]" style={{ color: D.textSoft }}>mín. 2 pessoas</span>
                </div>
                <p className="mt-6 font-display font-light" style={{ fontSize: "clamp(1.3rem,2.5vw,1.9rem)", color: D.creme }}>
                  Exclusivo
                </p>
                <div className="mt-4 space-y-2 text-[12px] font-light" style={{ color: D.textSoft }}>
                  <p>30% de entrada via Pix ou transferência</p>
                  <p>+ 5x sem juros no cartão de crédito</p>
                  <p>Saldo até 15 dias antes da partida</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-col items-start justify-between gap-5 border-t pt-8 sm:flex-row sm:items-center" style={{ borderColor: "rgba(196,165,106,0.3)" }}>
              <p className="max-w-md text-[12px] font-light italic" style={{ color: "rgba(237,230,221,0.45)" }}>
                Valores em Euro, base câmbio na data do fechamento. Tarifas por pessoa em quarto
                duplo. Consulte disponibilidade para a data desejada.
              </p>
              <a href="#contato" className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]" style={{ background: D.ouro, color: D.noite }}>
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
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: D.ouro }} />
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
              AonikIA · especialista no Douro Luxury
            </p>
            <h2 className="mt-5 font-display font-light leading-[1.15]" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: D.creme }}>
              Pergunte tudo sobre o Douro Luxury
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] font-light leading-relaxed" style={{ color: "rgba(243,236,224,0.66)" }}>
              Como são as quintas onde você se hospeda, quais vinhos vai provar, como funcionam as
              caminhadas leves e a melhor época para ir. A AonikIA conhece este programa de ponta
              a ponta.
            </p>
            <a href="#contato" className="mt-7 inline-flex items-center gap-3 rounded-full border px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 hover:opacity-80" style={{ borderColor: D.ouro, color: D.ouro }}>
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
