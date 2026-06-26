"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Contato from "../../components/Contato";
import FloatingActions from "../../components/FloatingActions";
import { Reveal, EASE } from "../../components/ui";

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
  caminhante: "2d4f5b_7c097261ec654f24aa4eb9b1d1ea026f~mv2.jpg",
  rabelo:  "2d4f5b_53f3c344579445728e0ee4bb619d3afe~mv2.jpeg",
  quarto:  "2d4f5b_5a366974e9d24c1ab879fcf6eccb3a0c~mv2.jpeg",
  socalcos:"2d4f5b_1a591d0a79f34de18c9f5340cb67f4d0~mv2.jpg",
  v1:      "2d4f5b_9105ce4c939c47649fa15ba1067bc5f8~mv2.jpeg",
  v2:      "2d4f5b_a061f8e60bac443f8f377482c18bfd8d~mv2.jpeg",
  v4:      "2d4f5b_9b69e44673094dcaa40961e4946dd3b0~mv2.jpeg",
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
    { x: 225, y: 52,  label: "Régua",   sub: "partida",           anchor: "middle" as const, c: D.ouro  },
    { x: 212, y: 208, label: "Alijó",   sub: "planalto",          anchor: "start"  as const, c: D.ouro  },
    { x: 248, y: 356, label: "Favaios", sub: "terra do Moscatel", anchor: "start"  as const, c: D.vinho },
    { x: 208, y: 484, label: "Porto",   sub: "chegada de trem",   anchor: "middle" as const, c: D.creme },
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
// ============================================================
const HILL_PATH =
  "M 0,165 L 65,165 L 72,140 L 135,140 " +
  "L 141,115 L 203,115 L 209,90 L 252,90 " +
  "L 258,118 L 324,118 L 330,150 L 392,150 " +
  "L 398,182 L 462,182 L 468,212 L 508,212 " +
  "L 514,192 L 556,192 L 562,165 L 594,165 " +
  "L 600,178 L 672,178 L 678,165 L 754,165 " +
  "L 760,152 L 866,152 L 872,148 L 960,148";

const HILL_FILL = HILL_PATH + " L 960,248 L 0,248 Z";

const PERFIL = [
  { x: 14,  y: 165, label: "Régua",    sub: "partida",         anchor: "start"  as const },
  { x: 252, y: 90,  label: "Samodães",  sub: "9,4 km",          anchor: "middle" as const },
  { x: 468, y: 212, label: "Castedo",   sub: "19,6 km",         anchor: "middle" as const },
  { x: 562, y: 165, label: "Favaios",   sub: "13 km · Moscatel", anchor: "middle" as const },
  { x: 946, y: 148, label: "Porto",     sub: "chegada",         anchor: "end"    as const },
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
      {[90, 130, 170, 210].map((y) => (
        <line key={y} x1={0} y1={y} x2={960} y2={y} stroke={D.line} strokeWidth="0.5" />
      ))}
      <path d={HILL_FILL} fill="url(#drFill)" />
      <motion.path d={HILL_PATH} fill="none" stroke={D.sage} strokeWidth="2.2"
        strokeLinejoin="round" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true }}
        transition={{ duration: 4.2, ease: EASE, delay: 0.2 }} />
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
  { id: IMG.caminhante, cap: "No seu ritmo, sozinho ou em dupla, pelas vinhas", tag: "Autoguiado" },
  { id: IMG.v1,      cap: "Quintas históricas na encosta do vale", tag: "Quintas" },
  { id: IMG.v2,      cap: "O Douro ao amanhecer entre as vinhas", tag: "Amanhecer" },
  { id: IMG.v4,      cap: "Socalcos e vinhas, a paisagem que vira vinho", tag: "Vinhas" },
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
  { v: "6",      u: "dias",        s: "5 noites" },
  { v: "58,7",   u: "quilômetros", s: "4 dias de caminhada" },
  { v: "2",      u: "pessoas",     s: "saída mínima, no seu ritmo" },
  { v: "3",      u: "quintas",     s: "provas de vinho incluídas" },
  { v: "Ano",    u: "todo",        s: "exceto Páscoa e Natal" },
  { v: "UNESCO", u: "Patrimônio",  s: "Paisagem Cultural do Douro" },
];

const COMO_FUNCIONA = [
  { icon: "flag",     t: "Você escolhe a data",
    s: "Sem grupo, sem calendário fixo. Saídas o ano todo, você define quando quer caminhar (exceto semanas de Páscoa e Natal)." },
  { icon: "pin",      t: "Mapas e tracks de GPS",
    s: "Roteiro detalhado de cada etapa, com mapas e trilhos de GPS. Você caminha tranquilo, sempre sabendo o caminho." },
  { icon: "village",  t: "Logística resolvida",
    s: "Hospedagens 4 estrelas reservadas, transfers conforme o programa e as provas de vinho já agendadas. É só caminhar." },
  { icon: "wine",     t: "Suporte sempre por perto",
    s: "Customer Success online durante toda a viagem. A liberdade do seu tempo, com a segurança da nossa curadoria." },
];

const MARCOS = [
  {
    id: "douro-rio",
    kicker: "O espelho das vinhas",
    titulo: ["O Rio", "Douro"],
    texto:
      "O Douro não é um cenário. É um personagem. Quilômetros de socalcos refletem nas águas calmas do rio, e o barco rabelo navega exatamente como navegava quando levava o vinho até o Porto. No seu ritmo, você atravessa essa paisagem como ela merece ser atravessada, devagar.",
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
    kicker: "O trabalho de séculos",
    titulo: ["Os", "Socalcos"],
    texto:
      "Cada terraço foi construído à mão, pedra a pedra, ao longo de dois mil anos. O xisto cinza retém o calor do dia e devolve à noite para as raízes das videiras. De Régua a Favaios, de Samodães a Castedo, você caminha no topo de uma das paisagens vitícolas mais dramáticas do mundo.",
    detalhe: "Castedo · capela rococó · vistas sobre o Douro",
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
    kicker: "Xisto, Moscatel e memória",
    titulo: ["As Aldeias", "Vinhateiras"],
    texto:
      "Favaios tem Moscatel e pão que a aldeia produz desde os romanos. Samodães e Valdigem guardam quintas históricas e capelas escondidas entre as vinhas. As aldeias vinhateiras do Douro não são museus, são comunidades vivas. Você entra a pé, do jeito que sempre foi feito.",
    detalhe: "Favaios · Samodães · Aldeias Vinhateiras do Douro",
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
  { icon: "wine",     t: "Quinta do Valdalágea", s: "Prova de vinhos do Douro entre vinhas, no circuito do Caminho dos Monges.",          tag: "Dia 2" },
  { icon: "wine",     t: "Quinta da Pacheca",    s: "Experiência de vinhos numa das quintas mais emblemáticas do vale, perto de Lamego.", tag: "Dia 3" },
  { icon: "grape",    t: "Quinta da Avessada",   s: "Vindima com enólogo, prova de licorosos e a tradição viva do Douro.",               tag: "Dia 5" },
  { icon: "village",  t: "Museu do Douro",       s: "Prova de Vinho do Porto com frutos secos locais logo na chegada a Peso da Régua.",  tag: "Dia 1" },
  { icon: "village",  t: "Núcleo de Favaios",    s: "Moscatel do século XVIII, pão de Favaios e a história da aldeia vinhateira.",        tag: "Dia 5" },
  { icon: "train",    t: "Comboio Histórico",    s: "Pinhão ao Porto pela estação dos azulejos, a saga do Vinho do Porto sobre trilhos.", tag: "Dia 6" },
];

const ROTEIRO = [
  { d: "01", icon: "plane", t: "Chegada a Peso da Régua",
    s: "Recepção no Aeroporto do Porto e transfer privado a Peso da Régua. Check-in no hotel. Visita ao Museu do Douro com prova de Vinho do Porto e frutos secos locais. Tarde livre para entrar no ritmo do vale." },
  { d: "02", icon: "boot", t: "Caminho dos Monges e Trilho de Santiago",
    s: "16,7 km · Percurso circular a partir da Régua, por entre vinhedos, com passagem por ponte romana e pela aldeia de Valdigem. Prova de vinhos na Quinta do Valdalágea. O rio já mostra os socalcos que vão guiar a semana." },
  { d: "03", icon: "wine", t: "Caminhada por Samodães",
    s: "9,4 km · Caminhada perto de Lamego, entre quintas e a aldeia de Samodães, com experiência de vinhos na Quinta da Pacheca. Ao fim do dia, transfer para Alijó." },
  { d: "04", icon: "mountain", t: "Trilha de Alijó a Castedo",
    s: "19,6 km · Percurso circular com igreja do século XVIII e capela rococó, e vistas amplas sobre o Rio Douro e os socalcos. O dia mais longo e mais panorâmico da travessia." },
  { d: "05", icon: "grape", t: "Alijó a Favaios",
    s: "13 km · Caminhada até Favaios com prova na Enoteca da Quinta da Avessada (vindima e enólogo) e visita ao Núcleo Museológico de Favaios, terra do Moscatel e do pão." },
  { d: "06", icon: "train", t: "Partida de comboio para o Porto",
    s: "Comboio histórico do Pinhão ao Porto, com tempo para explorar a cidade Patrimônio UNESCO antes da partida. Fim das operações." },
];

const INCLUSO = [
  "Hospedagens 4 estrelas (hotéis e pousadas com vista para o vale)",
  "Café da manhã diário",
  "Transfers conforme itinerário",
  "Roteiro detalhado, mapas e tracks de GPS de cada etapa",
  "Visita ao Museu do Douro com prova de Vinho do Porto",
  "Quinta do Valdalágea com prova de vinhos",
  "Quinta da Pacheca com experiência de vinhos",
  "Enoteca da Quinta da Avessada (vindima e prova com enólogo)",
  "Núcleo Museológico de Favaios",
  "Bilhete de comboio histórico Pinhão para o Porto",
  "Seguros de Acidentes Pessoais e Responsabilidade Civil",
  "Suporte online (Customer Success) durante toda a viagem",
];

const NAO_INCLUSO = [
  "Passagens aéreas",
  "Transfer de saída do Porto para o aeroporto",
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
export default function DouroAutoguiadoPage() {
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
                Caminhos de Portugal · Autoguiado
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
              No seu ritmo. Seis dias entre vinhas. Um rio que virou vinho.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.55 }}
              className="mt-6 max-w-md text-[15px] font-light leading-relaxed md:text-base"
              style={{ color: "rgba(243,236,224,0.74)" }}>
              Caminhada autoguiada entre as vinhas, quintas e aldeias vinhateiras do Vale do Douro,
              Patrimônio UNESCO. Você caminha no seu tempo, com logística, hospedagens, mapas e
              provas de vinho{" "}
              <span style={{ color: D.creme }}>já resolvidos.</span>
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.7 }} className="mt-8 flex flex-wrap items-center gap-5">
              <a href="#reservar"
                className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]"
                style={{ background: D.terracota, color: D.creme }}>
                Quero caminhar o Douro <span>&#8594;</span>
              </a>
              <span>
                <span className="text-[12px] uppercase tracking-[0.16em]" style={{ color: "rgba(243,236,224,0.5)" }}>a partir de</span>{" "}
                <span className="font-display text-2xl" style={{ color: D.creme }}>€ 1.557</span>
              </span>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.95 }}
              className="mt-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.16em]"
              style={{ borderColor: D.sage, color: D.sage }}>
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: D.sage }} />
              Saídas o ano todo · você escolhe a data
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

      {/* ===== CENTERPIECE — OS SOCALCOS (fundo claro) ===== */}
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
              Perfil da caminhada · 58,7 km · 4 dias a pé
            </p>
          </Reveal>
          <Reveal delay={0.05}><ElevationProfile /></Reveal>
        </div>
      </section>

      {/* ===== COMO FUNCIONA O AUTOGUIADO ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: D.casca, color: D.creme }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: D.ouro }}>
              <span className="h-px w-8" style={{ background: D.ouro }} />
              Como funciona o autoguiado
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 max-w-2xl font-display font-light leading-[1.05]" style={{ fontSize: "clamp(2rem,4vw,3.2rem)", color: D.creme }}>
              A liberdade do seu tempo,
              <br />
              <span className="italic" style={{ color: D.sage }}>a segurança da curadoria</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-xl text-[15px] font-light leading-relaxed" style={{ color: D.textSoft }}>
              Autoguiado não é sozinho. É você (ou você e mais alguém) caminhando no próprio ritmo,
              com tudo o que importa já organizado pela AONIK. Você só precisa colocar um pé à frente
              do outro.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {COMO_FUNCIONA.map((c, i) => (
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
              Não é só caminhada. São provas de vinho, museus e a tradição viva do Douro, tudo
              incluído no programa e marcado para você. Cada dia tem o seu momento.
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

      {/* ===== HOSPEDAGENS — fundo creme ===== */}
      <section className="w-full" style={{ background: D.creme }}>
        <div className="grid md:grid-cols-2">
          <div className="relative min-h-[420px] overflow-hidden md:min-h-[560px]">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-[1.03]"
              style={{ backgroundImage: `url('${wx(IMG.quarto, 1400, 1000)}')` }} />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 40%, rgba(40,12,20,0.55) 100%)` }} />
            <div className="absolute bottom-4 left-5">
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: D.creme }}>
                Hotéis e Pousadas 4 estrelas · Vista para o vale
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
                Hotéis e pousadas 4 estrelas escolhidos pela posição no vale e pela vista
                privilegiada para o rio e os socalcos. Tudo reservado com antecedência, para você
                chegar e só descansar.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 space-y-3">
                {[
                  "Quartos duplos com vista para o vale do Douro",
                  "Hospedagens reservadas em todas as etapas",
                  "Café da manhã incluso todos os dias",
                  "Estrutura 4 estrelas antes e depois de cada caminhada",
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

      {/* ===== ROTEIRO — fundo creme ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: D.creme }}>
        <div className="mx-auto max-w-[1100px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: D.sage }}>Roteiro dia a dia</p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-3 max-w-lg text-[14px] font-light leading-relaxed" style={{ color: "rgba(40,12,20,0.55)" }}>
              Seis dias entre vinhas, quintas e aldeias vinhateiras, com quatro dias de caminhada
              real, chegada tranquila em Régua e saída de comboio histórico do Pinhão ao Porto.
            </p>
          </Reveal>
          <div className="mt-12">
            {ROTEIRO.map((r, i) => (
              <Reveal key={r.d} delay={i * 0.04}>
                <div className="grid grid-cols-[auto_1fr] items-baseline gap-6 border-t py-7 md:gap-10"
                  style={{ borderColor: "rgba(122,143,98,0.22)" }}>
                  <div className="flex items-center gap-4">
                    <span className="font-display text-sm" style={{ color: "rgba(40,12,20,0.32)" }}>{r.d}</span>
                    <Icon name={r.icon} size={18} color={D.sage} />
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
              Saídas o ano todo, de Janeiro a Junho e de Setembro a Dezembro (exceto semanas de
              Páscoa e Natal). Saída mínima de 2 pessoas. A tarifa varia conforme a temporada.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {/* Temporada Baixa */}
              <div className="rounded-2xl p-7" style={{ background: "rgba(138,31,45,0.12)", border: `1px solid rgba(138,31,45,0.3)` }}>
                <div className="flex items-center justify-between">
                  <span className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ border: `1px solid ${D.vinho}`, color: D.creme }}>Temporada Baixa</span>
                  <span className="text-[11px]" style={{ color: D.textSoft }}>Nov a Abr</span>
                </div>
                <p className="mt-6 font-display font-light" style={{ fontSize: "clamp(2rem,3.5vw,2.8rem)", color: D.creme }}>€ 1.557</p>
                <p className="mt-1 text-[12px] font-light" style={{ color: D.textSoft }}>por pessoa · quarto duplo</p>
                <p className="mt-4 text-[12px] font-light" style={{ color: D.textSoft }}>Suplemento individual: € 406,15</p>
              </div>

              {/* Temporada Alta */}
              <div className="rounded-2xl p-7" style={{ background: "rgba(138,31,45,0.22)", border: `1px solid rgba(138,31,45,0.5)` }}>
                <div className="flex items-center justify-between">
                  <span className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ background: D.vinho, color: D.creme }}>Temporada Alta</span>
                  <span className="text-[11px]" style={{ color: D.textSoft }}>Mai a Out</span>
                </div>
                <p className="mt-6 font-display font-light" style={{ fontSize: "clamp(2rem,3.5vw,2.8rem)", color: D.creme }}>€ 1.794</p>
                <p className="mt-1 text-[12px] font-light" style={{ color: D.textSoft }}>por pessoa · quarto duplo</p>
                <p className="mt-4 text-[12px] font-light" style={{ color: D.textSoft }}>Suplemento individual: € 618,50</p>
              </div>

              {/* Como funciona a reserva */}
              <div className="rounded-2xl p-7" style={{ background: "rgba(200,154,78,0.08)", border: `1px solid rgba(200,154,78,0.2)` }}>
                <div className="flex items-center justify-between">
                  <span className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ border: `1px solid ${D.ouro}`, color: D.ouro }}>Reserva</span>
                  <span className="text-[11px]" style={{ color: D.textSoft }}>mín. 2 pessoas</span>
                </div>
                <p className="mt-6 font-display font-light" style={{ fontSize: "clamp(1.3rem,2.5vw,1.9rem)", color: D.creme }}>
                  No seu ritmo
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
            <div className="mt-8 flex flex-col items-start justify-between gap-5 border-t pt-8 sm:flex-row sm:items-center" style={{ borderColor: "rgba(138,31,45,0.35)" }}>
              <p className="max-w-md text-[12px] font-light italic" style={{ color: "rgba(237,230,221,0.45)" }}>
                Valores em Euro, base câmbio na data do fechamento. Tarifas por pessoa em quarto
                duplo. Consulte disponibilidade para a data desejada.
              </p>
              <a href="#contato" className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]" style={{ background: D.terracota, color: D.creme }}>
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
              AonikIA · especialista no Douro autoguiado
            </p>
            <h2 className="mt-5 font-display font-light leading-[1.15]" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: D.creme }}>
              Pergunte tudo sobre o Douro
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] font-light leading-relaxed" style={{ color: "rgba(243,236,224,0.66)" }}>
              Como funciona o autoguiado, qual a melhor época para ir, como são os tracks de GPS,
              o que levar na mochila e como chegar a cada hospedagem. A AonikIA conhece este
              programa de ponta a ponta.
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
