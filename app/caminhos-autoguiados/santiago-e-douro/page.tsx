"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "../../components/Nav";
import Breadcrumb from "../../components/Breadcrumb";
import Footer from "../../components/Footer";
import Contato from "../../components/Contato";
import FloatingActions from "../../components/FloatingActions";
import { Reveal, EASE } from "../../components/ui";

const S = {
  noite:    "#081231",   // azul-noite (base hero)
  midnight: "#00205B",   // Santiago midnight
  ocean:    "#003087",   // Santiago ocean
  vinho:    "#3f1521",   // Douro wine
  vinhoDeep:"#280c14",
  casca:    "#1e141a",
  ouro:     "#c4a56a",   // ponte dourada entre as duas jornadas
  ouroVivo: "#e3c98e",
  sun:      "#F2A900",   // sol de Santiago
  creme:    "#ede6dd",
  sage:     "#7a8f62",
  rio:      "#6d9290",
  textSoft: "rgba(237,230,221,0.62)",
};

// Douro images (formato img.jpg) e Santiago images (formato id no fim)
const wxD = (file: string, w: number, h: number) =>
  `https://static.wixstatic.com/media/${file}/v1/fill/w_${w},h_${h},al_c,q_82,enc_avif,quality_auto/img.jpg`;
const wxS = (id: string, w: number, h: number) =>
  `https://static.wixstatic.com/media/${id}/v1/fill/w_${w},h_${h},q_88,enc_avif,quality_auto/${id}`;

const IMG = {
  // Santiago
  valenca:  "2d4f5b_596f7144ab49417692221a0fa9dab404~mv2.jpg",
  catedral: "2d4f5b_80e678e6de65425f90c4b56c6f998776~mv2.jpg",
  galiza:   "2d4f5b_6fe79078b70b4c4398bd9e601646fcdd~mv2.jpeg",
  seta:     "2d4f5b_920e9f2265b149e69fcc012023b5026d~mv2.jpg",
  minho:    "2d4f5b_3405d40f96d84d289904dccd31fcba12~mv2.jpg",
  // Douro
  pano:     "2d4f5b_edfea84f57b54f589aff44727039c42e~mv2.jpg",
  rio:      "2d4f5b_7edb87bf58444c00a4e2f0882eaff778~mv2.jpg",
  rabelo:   "2d4f5b_53f3c344579445728e0ee4bb619d3afe~mv2.jpeg",
  socalcos: "2d4f5b_1a591d0a79f34de18c9f5340cb67f4d0~mv2.jpg",
  hiker:    "2d4f5b_01a03621c9fe4cd9812047b9543c423f~mv2.jpg",
};

// ============================================================
// SVG ASSINATURA: CaminhoEDouro — a concha de Santiago no alto,
// um caminho dourado descendo, e os socalcos do Douro embaixo.
// ============================================================
function CaminhoEDouro() {
  // concha (Santiago) — raios + arco
  const HX = 230, HY = 150;
  const TIPS: [number, number][] = [
    [150, 96], [168, 78], [190, 66], [212, 60], [230, 58],
    [248, 60], [270, 66], [292, 78], [310, 96],
  ];
  let ARC = `M ${TIPS[0][0]},${TIPS[0][1]}`;
  for (let i = 1; i < TIPS.length; i++) ARC += ` Q ${(TIPS[i-1][0]+TIPS[i][0])/2},${Math.min(TIPS[i-1][1],TIPS[i][1])-10} ${TIPS[i][0]},${TIPS[i][1]}`;

  // caminho dourado descendo da concha ao Douro
  const path = "M 230,150 C 250,210 200,250 220,310 C 236,360 196,392 214,452";

  // socalcos do Douro (embaixo)
  const terr = [
    "M 60,400 C 130,390 200,396 280,388 C 340,382 380,394 410,390",
    "M 50,430 C 124,420 204,426 286,418 C 346,412 386,424 416,420",
    "M 56,462 C 130,452 210,458 292,450 C 350,444 388,456 418,452",
  ];

  return (
    <svg viewBox="0 0 460 540" className="h-full w-full" style={{ overflow: "visible" }}>
      {/* sol de Santiago */}
      <motion.circle cx="230" cy="150" r="34" fill={S.sun} fillOpacity={0.1}
        initial={{ opacity: 0 }} animate={{ opacity: [0.06, 0.16, 0.06] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />

      {/* raios da concha */}
      {TIPS.map(([tx, ty], i) => (
        <motion.line key={i} x1={HX} y1={HY} x2={tx} y2={ty}
          stroke={S.ouroVivo} strokeWidth="0.9" strokeOpacity="0.5"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.5 + i * 0.06 }} />
      ))}
      <motion.path d={ARC} fill="none" stroke={S.sun} strokeWidth="1.6" strokeOpacity="0.9"
        initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: EASE, delay: 0.8 }} />
      <motion.circle cx={HX} cy={HY} r="3.5" fill={S.creme}
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.4, delay: 0.6 }} />

      {/* caminho dourado descendo */}
      <motion.path d={path} fill="none" stroke={S.ouro} strokeWidth="2.6" strokeLinecap="round"
        strokeOpacity="0.5"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 2.6, ease: EASE, delay: 1 }} />
      <motion.path d={path} fill="none" stroke={S.creme} strokeWidth="2.4" strokeLinecap="round"
        strokeDasharray="10 470"
        initial={{ strokeDashoffset: 480, opacity: 0 }}
        animate={{ strokeDashoffset: [480, 0], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2.6 }} />

      {/* socalcos do Douro */}
      {terr.map((d, i) => (
        <motion.path key={i} d={d} fill="none"
          stroke={i % 2 === 0 ? S.ouro : S.sage} strokeWidth={1.1 + i * 0.2}
          strokeLinecap="round" strokeOpacity={0.5 + i * 0.1}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1, x: [0, i % 2 === 0 ? 5 : -5, 0] }}
          transition={{
            pathLength: { duration: 1.6, ease: EASE, delay: 1.6 + i * 0.15 },
            opacity: { duration: 1, delay: 1.6 + i * 0.15 },
            x: { duration: 12 + i * 2, repeat: Infinity, ease: "easeInOut" },
          }} />
      ))}

      {/* waypoints */}
      {[
        { x: 230, y: 150, label: "Santiago",  sub: "a Catedral",       c: S.sun,   anchor: "middle" as const, dy: -46 },
        { x: 222, y: 310, label: "Pinhão",    sub: "o Douro",          c: S.ouro,  anchor: "start"  as const, dy: -12 },
        { x: 214, y: 452, label: "Porto",     sub: "chegada de trem",  c: S.creme, anchor: "middle" as const, dy: 30 },
      ].map((p, i) => (
        <motion.g key={p.label}
          initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE, delay: 1.6 + i * 0.4 }}>
          <motion.circle cx={p.x} cy={p.y} r="6" fill="none" stroke={p.c} strokeWidth="1.2"
            animate={{ r: [6, 15, 6], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut", delay: i * 0.5 }} />
          <circle cx={p.x} cy={p.y} r="5" fill={S.noite} stroke={p.c} strokeWidth="2" />
          <circle cx={p.x} cy={p.y} r="1.8" fill={p.c} />
          <text x={p.x + (p.anchor === "start" ? 14 : 0)} y={p.y + p.dy} fill={S.creme}
            fontSize="13" textAnchor={p.anchor} letterSpacing="0.5"
            style={{ fontFamily: "'Fraunces', Georgia, serif" }}>{p.label}</text>
          <text x={p.x + (p.anchor === "start" ? 14 : 0)} y={p.y + p.dy + 14} fill={p.c}
            fontSize="8.5" textAnchor={p.anchor} letterSpacing="1.4" opacity="0.9"
            style={{ fontFamily: "sans-serif", textTransform: "uppercase" }}>{p.sub}</text>
        </motion.g>
      ))}

      <motion.text x="118" y="360" fill={S.ouro} fontSize="11" letterSpacing="3"
        textAnchor="middle" opacity="0.42"
        initial={{ opacity: 0 }} animate={{ opacity: 0.42 }} transition={{ delay: 2.4, duration: 1 }}
        style={{ fontStyle: "italic" }}>133 km</motion.text>
    </svg>
  );
}

// ============================================================
// GaleriaInterativa
// ============================================================
const GALERIA = [
  { id: IMG.catedral, f: wxS, cap: "A Praça do Obradoiro e a Catedral de Santiago de Compostela", tag: "Santiago" },
  { id: IMG.valenca,  f: wxS, cap: "A cidadela abaluartada de Valença, início do Caminho", tag: "Valença" },
  { id: IMG.galiza,   f: wxS, cap: "Seis dias pela Galiza mais autêntica até Santiago", tag: "Galiza" },
  { id: IMG.seta,     f: wxS, cap: "A seta amarela aparece em cada encruzilhada, basta seguir", tag: "O Caminho" },
  { id: IMG.rio,      f: wxD, cap: "O Douro refletindo os socalcos de xisto", tag: "Douro" },
  { id: IMG.rabelo,   f: wxD, cap: "Barco rabelo no Cais do Pinhão", tag: "Pinhão" },
  { id: IMG.socalcos, f: wxD, cap: "Terraços de vinha esculpidos à mão ao longo de séculos", tag: "Socalcos" },
  { id: IMG.hiker,    f: wxD, cap: "O descanso nas vinhas, depois da peregrinação", tag: "Vinhas" },
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
          <img src={img.f(img.id, 1280, 800)} alt={img.cap} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${S.noite}cc 0%, transparent 55%)` }} />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em]" style={{ color: S.ouro }}>{img.tag}</span>
            <p className="mt-1 text-[14px] font-light" style={{ color: S.creme }}>{img.cap}</p>
          </div>
          <div className="absolute right-4 top-4">
            <span className="text-[11px] font-medium" style={{ color: "rgba(237,230,221,0.55)" }}>{idx + 1}/{GALERIA.length}</span>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
        {GALERIA.map((g, i) => (
          <button key={i} onClick={() => setIdx(i)}
            className="relative shrink-0 overflow-hidden rounded-xl transition-all duration-300"
            style={{ width: 210, height: 70, opacity: i === idx ? 1 : 0.42,
              outline: i === idx ? `2px solid ${S.ouro}` : "2px solid transparent", outlineOffset: 2 }}>
            <img src={g.f(g.id, 420, 140)} alt={g.tag}
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
  { v: "13",     u: "dias",        s: "12 noites" },
  { v: "133",    u: "quilômetros", s: "Santiago + Douro" },
  { v: "8",      u: "dias",        s: "de caminhada" },
  { v: "121",    u: "km",          s: "Caminho Português" },
  { v: "2",      u: "patrimônios", s: "UNESCO em uma jornada" },
  { v: "2",      u: "pessoas",     s: "saída mínima, no seu ritmo" },
];

const ETAPAS_SANTIAGO = [
  { d: "01", t: "Chegada a Valença",          km: "",      s: "Recepção, entrega da credencial do peregrino e briefing. Tempo livre na cidadela histórica." },
  { d: "02", t: "Valença a O Porriño",        km: "20 km", s: "Travessia do Rio Minho pela Ponte Internacional, a catedral de Tui e descida até O Porriño." },
  { d: "03", t: "O Porriño a Arcade",         km: "22 km", s: "Redondela e seus viadutos sobre a Ria de Vigo. Arcade, famosa pelas melhores ostras da Galiza." },
  { d: "04", t: "Arcade a Pontevedra",        km: "13 km", s: "Ponte medieval de Pontesampaio e o centro histórico de Pontevedra, cidade medieval sem carros." },
  { d: "05", t: "Pontevedra a Caldas de Reis", km: "22 km", s: "Vale do Rio Granda, cruzeiros de granito e a cidade termal de Caldas de Reis." },
  { d: "06", t: "Caldas de Reis a Padrón",    km: "19 km", s: "A lenda do Apóstolo e a barca de pedra. Padrón, onde o Caminho ganha profundidade espiritual." },
  { d: "07", t: "Padrón a Santiago",          km: "25 km", s: "A etapa final. A entrada pela cidade medieval e a chegada à Praça do Obradoiro. A Compostela nas mãos." },
  { d: "08", t: "Dia livre em Santiago",      km: "",      s: "Descanso e tempo para viver a cidade, a Catedral e o abraço ao Apóstolo." },
];

const ETAPAS_DOURO = [
  { d: "09", t: "Santiago ao Pinhão",          km: "",      s: "Transfer de Santiago a Porto e ao Pinhão, vila ribeirinha do Douro classificada pela UNESCO. Tarde livre." },
  { d: "10", t: "Casal de Loivos a Pinhão",    km: "5,4 km", s: "Descida pelos socalcos em terraços com prova de vinhos na Quinta do Bomfim e passeio de barco rabelo no Douro." },
  { d: "11", t: "Provesende a Pinhão",         km: "6,5 km", s: "O Miradouro de São Cristóvão, ligado ao escritor Miguel Torga, e o comboio histórico do Pinhão ao Porto." },
  { d: "12", t: "Dia livre no Porto",          km: "",      s: "Tempo para conhecer o Porto, Patrimônio UNESCO, suas caves de Vinho do Porto e o casario à beira-rio." },
  { d: "13", t: "Partida do Porto",            km: "",      s: "Café da manhã, últimas memórias e deslocamento ao aeroporto. Fim das operações." },
];

const INCLUSO = [
  "12 noites em hotéis e pousadas 3 estrelas com café da manhã",
  "Transporte de bagagem entre os alojamentos (1 mala por pessoa)",
  "Credencial do Peregrino e roadbook do Caminho Português",
  "Arquivos de preparação, mapas e suporte de emergência 24 horas",
  "Transfers terrestres conforme o itinerário",
  "Prova de vinhos na Quinta do Bomfim",
  "Passeio de barco rabelo no Douro",
  "Bilhete de comboio histórico Pinhão para o Porto",
  "Seguros de Acidentes Pessoais e Responsabilidade Civil",
  "Suporte AONIK antes, durante e após a viagem",
];

const NAO_INCLUSO = [
  "Passagens aéreas",
  "Transfers aeroportuários (exceto o comboio ao Porto)",
  "Seguro viagem",
  "Almoços e jantares",
  "Gorjetas, bebidas e despesas pessoais",
  "Serviços não indicados no programa",
];

function Icon({ name, size = 22, color = "currentColor" }: { name: string; size?: number; color?: string }) {
  const s = {
    width: size, height: size, stroke: color, fill: "none",
    strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
    display: "block", flexShrink: 0,
  };
  switch (name) {
    case "shell":
      return <svg viewBox="0 0 24 24" style={s}><path d="M12 21 C5 14 4 8 12 4 C20 8 19 14 12 21 Z" /><path d="M12 21 L12 5 M7 16 L12 5 M17 16 L12 5" strokeOpacity="0.6" /></svg>;
    case "wine":
      return <svg viewBox="0 0 24 24" style={s}><path d="M8 3h8l-1.5 7a4.5 4.5 0 0 1-5 0Z" /><line x1="12" y1="10" x2="12" y2="19" /><line x1="8.5" y1="19" x2="15.5" y2="19" /></svg>;
    case "boot":
      return <svg viewBox="0 0 24 24" style={s}><path d="M5 20 L5 7 C5 5.5 6 4 8 4 L8 12 C10 12 14 14 17 16 L19 20 Z" /><line x1="4" y1="20" x2="20" y2="20" /></svg>;
    case "pin":
      return <svg viewBox="0 0 24 24" style={s}><path d="M12 2 C8.5 2 5.5 5 5.5 9 C5.5 14.5 12 22 12 22 C12 22 18.5 14.5 18.5 9 C18.5 5 15.5 2 12 2 Z" /><circle cx="12" cy="9" r="3" /></svg>;
    case "boat":
      return <svg viewBox="0 0 24 24" style={s}><path d="M3 17 C7 13.5 10 13 12 13 C14 13 17 13.5 21 17" /><path d="M6.5 13 L8.5 6 L15.5 6 L17.5 13" /><line x1="12" y1="6" x2="12" y2="2" /><path d="M12 2 L16 5 L12 8" /></svg>;
    default:
      return null;
  }
}

// ============================================================
// PAGE
// ============================================================
export default function SantiagoEDouroPage() {
  return (
    <main className="relative" style={{ background: S.creme }}>
      <Nav />

      {/* ===== HERO ===== */}
      <section className="relative flex min-h-[100svh] w-full items-center overflow-hidden" style={{ background: S.noite }}>
        <motion.div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${wxS(IMG.catedral, 2200, 1400)}')` }}
          initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 14, ease: "easeOut" }} />
        <div className="absolute inset-0"
          style={{ background: `linear-gradient(to right, ${S.noite}f2 0%, ${S.noite}b0 52%, ${S.noite}70 100%)` }} />
        <motion.div className="absolute inset-0 z-[1]" style={{ background: S.noite, pointerEvents: "none" }}
          initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 0.9, delay: 0.4 }} />

        <div className="relative z-10 mx-auto grid w-full max-w-[1400px] items-center gap-10 px-6 py-28 md:grid-cols-2 md:gap-16 md:px-10">
          <div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 }} className="mb-4 flex items-center gap-3">
              <Icon name="pin" size={14} color={S.ouro} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.4em]" style={{ color: S.ouro }}>
                Caminhos de Portugal · Peregrinação + vinhas
              </span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
              className="font-display font-light uppercase leading-[0.86] tracking-[-0.02em]"
              style={{ fontSize: "clamp(3rem, 7.5vw, 7rem)", color: S.creme }}>
              Santiago
              <br />
              <span style={{ color: S.ouro }}>e Douro</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.48 }}
              className="mt-3 font-display font-light italic"
              style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)", color: S.creme, opacity: 0.62 }}>
              Da peregrinação à colheita. Treze dias, dois patrimônios.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.55 }}
              className="mt-6 max-w-md text-[15px] font-light leading-relaxed md:text-base"
              style={{ color: "rgba(237,230,221,0.74)" }}>
              Primeiro a emoção do Caminho Português até a Catedral de Santiago. Depois, o
              repouso entre as vinhas em socalcos do Vale do Douro.{" "}
              <span style={{ color: S.creme }}>Duas jornadas, um só caminho.</span>
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.7 }} className="mt-8 flex flex-wrap items-center gap-5">
              <a href="#reservar"
                className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]"
                style={{ background: S.ouro, color: S.noite }}>
                Quero esta jornada <span>&#8594;</span>
              </a>
              <span>
                <span className="text-[12px] uppercase tracking-[0.16em]" style={{ color: "rgba(237,230,221,0.5)" }}>a partir de</span>{" "}
                <span className="font-display text-2xl" style={{ color: S.creme }}>€ 2.200</span>
              </span>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.95 }}
              className="mt-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.16em]"
              style={{ borderColor: S.ouro, color: S.ouro }}>
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: S.ouro }} />
              Saídas de Março a Outubro · no seu ritmo
            </motion.div>
            <div className="mt-7">
              <Breadcrumb tone="dark" accent="#c4a56a" items={[
                { label: "Home", href: "/" },
                { label: "Caminhadas", href: "/caminhadas" },
                { label: "Caminhos de Portugal", href: "/caminhos-autoguiados" },
                { label: "Santiago e Douro" },
              ]} />
            </div>
          </div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.35 }}
            className="mx-auto hidden w-full max-w-[440px] md:block" style={{ height: 480 }}>
            <CaminhoEDouro />
          </motion.div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="grid grid-cols-2 gap-px md:grid-cols-3 lg:grid-cols-6"
        style={{ background: "rgba(196,165,106,0.18)", borderTop: `1px solid rgba(196,165,106,0.18)` }}>
        {STATS.map((s, i) => (
          <Reveal key={i} delay={i * 0.04}>
            <div className="flex flex-col px-6 py-8" style={{ background: S.midnight }}>
              <span className="font-display font-light leading-none" style={{ fontSize: "clamp(1.7rem,3vw,2.5rem)", color: S.creme }}>{s.v}</span>
              <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: S.ouro }}>{s.u}</span>
              <span className="mt-1 text-[12px] font-light" style={{ color: "rgba(237,230,221,0.55)" }}>{s.s}</span>
            </div>
          </Reveal>
        ))}
      </section>

      {/* ===== CENTERPIECE ===== */}
      <section className="relative w-full overflow-hidden" style={{ background: S.creme }}>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
          <span className="select-none font-display font-light uppercase"
            style={{ fontSize: "clamp(4rem,14vw,12rem)", color: "rgba(0,32,91,0.055)",
              letterSpacing: "-0.04em", lineHeight: 1, whiteSpace: "nowrap" }}>
            CAMINHO
          </span>
        </div>
        <div className="relative z-10 mx-auto max-w-[1000px] px-6 py-32 text-center md:py-44">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em]" style={{ color: S.ouro }}>
              Dois patrimônios, uma só viagem
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display font-light leading-[1.05]" style={{ fontSize: "clamp(2.2rem,5vw,4.2rem)", color: S.midnight }}>
              Da fé que move
              <br />
              <span className="italic" style={{ color: S.vinho }}>ao vinho que repousa</span>
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mx-auto mt-8 max-w-2xl text-[16px] font-light leading-relaxed" style={{ color: "rgba(8,18,49,0.62)" }}>
              Há quem caminhe para chegar e há quem caminhe para se encontrar. Esta jornada faz as
              duas coisas: a intensidade espiritual do Caminho Português até a Praça do Obradoiro e,
              depois, o silêncio dourado das vinhas do Douro.{" "}
              <span style={{ color: S.vinho, fontStyle: "italic" }}>O esforço e a recompensa, em treze dias.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== ATO I — O CAMINHO PORTUGUÊS ===== */}
      <section className="w-full" style={{ background: S.midnight }}>
        <div className="grid md:grid-cols-2">
          <div className="relative min-h-[420px] overflow-hidden md:min-h-[620px]">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-[1.03]"
              style={{ backgroundImage: `url('${wxS(IMG.galiza, 1200, 1100)}')` }} />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 30%, ${S.midnight}dd 100%)` }} />
            <div className="absolute bottom-4 left-5">
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: S.sun }}>Valença a Santiago · 121 km</span>
            </div>
          </div>
          <div className="flex flex-col justify-center px-8 py-16 md:px-14 md:py-20">
            <Reveal>
              <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: S.sun }}>
                <Icon name="shell" size={16} color={S.sun} />
                Ato I · Peregrinação
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-display font-light uppercase leading-[0.9]" style={{ fontSize: "clamp(2.2rem,4.2vw,3.6rem)", color: S.creme }}>
                O Caminho
                <br />
                <span style={{ color: S.sun }}>Português</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-6 max-w-md text-[15px] font-light leading-relaxed" style={{ color: "rgba(237,230,221,0.74)" }}>
                Seis dias de caminhada por entre vinhas, pontes medievais e aldeias galegas, seguindo
                a seta amarela que aparece em cada encruzilhada. A jornada culmina na chegada à Praça
                do Obradoiro, diante da Catedral de Santiago. A emoção que não tem palavras.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 space-y-3.5">
                {ETAPAS_SANTIAGO.map((e) => (
                  <div key={e.d} className="grid grid-cols-[auto_1fr] items-baseline gap-4 border-t pt-3.5" style={{ borderColor: "rgba(242,169,0,0.16)" }}>
                    <span className="font-display text-[12px]" style={{ color: "rgba(242,169,0,0.6)" }}>{e.d}</span>
                    <div>
                      <p className="text-[14px] font-medium" style={{ color: S.creme }}>
                        {e.t}{e.km && <span className="ml-2 text-[11px] font-normal" style={{ color: S.sun }}>{e.km}</span>}
                      </p>
                      <p className="mt-0.5 text-[12px] font-light leading-relaxed" style={{ color: "rgba(237,230,221,0.55)" }}>{e.s}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== DIVISOR — DE SANTIAGO AO DOURO ===== */}
      <section className="px-6 py-16 text-center md:py-20" style={{ background: S.ouro }}>
        <Reveal>
          <p className="font-display font-light italic" style={{ fontSize: "clamp(1.3rem,3vw,2.2rem)", color: S.vinhoDeep }}>
            Da Catedral de Santiago, o caminho desce ao Douro.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-3 max-w-md text-[13px] font-medium uppercase tracking-[0.22em]" style={{ color: "rgba(40,12,20,0.6)" }}>
            Transfer de Santiago ao Porto e ao Vale do Douro
          </p>
        </Reveal>
      </section>

      {/* ===== ATO II — O VALE DO DOURO ===== */}
      <section className="w-full" style={{ background: S.vinho }}>
        <div className="grid md:grid-cols-2 md:[direction:rtl]">
          <div className="relative min-h-[420px] overflow-hidden md:min-h-[620px]" style={{ direction: "ltr" }}>
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-[1.03]"
              style={{ backgroundImage: `url('${wxD(IMG.rabelo, 1200, 1100)}')` }} />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 30%, ${S.vinho}dd 100%)` }} />
            <div className="absolute bottom-4 left-5">
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: S.ouro }}>Pinhão · Douro · 12 km</span>
            </div>
          </div>
          <div className="flex flex-col justify-center px-8 py-16 md:px-14 md:py-20" style={{ direction: "ltr" }}>
            <Reveal>
              <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: S.ouro }}>
                <Icon name="wine" size={16} color={S.ouro} />
                Ato II · As vinhas
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-display font-light uppercase leading-[0.9]" style={{ fontSize: "clamp(2.2rem,4.2vw,3.6rem)", color: S.creme }}>
                O Vale
                <br />
                <span style={{ color: S.ouro }}>do Douro</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-6 max-w-md text-[15px] font-light leading-relaxed" style={{ color: "rgba(237,230,221,0.78)" }}>
                Depois da peregrinação, o Douro recebe você com calma. Dois trilhos pelas vinhas em
                socalcos, prova de Vinho do Porto Vintage na Quinta do Bomfim, um passeio de barco
                rabelo e o comboio histórico até o Porto. A recompensa em forma de paisagem.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 space-y-3.5">
                {ETAPAS_DOURO.map((e) => (
                  <div key={e.d} className="grid grid-cols-[auto_1fr] items-baseline gap-4 border-t pt-3.5" style={{ borderColor: "rgba(196,165,106,0.18)" }}>
                    <span className="font-display text-[12px]" style={{ color: "rgba(196,165,106,0.6)" }}>{e.d}</span>
                    <div>
                      <p className="text-[14px] font-medium" style={{ color: S.creme }}>
                        {e.t}{e.km && <span className="ml-2 text-[11px] font-normal" style={{ color: S.ouro }}>{e.km}</span>}
                      </p>
                      <p className="mt-0.5 text-[12px] font-light leading-relaxed" style={{ color: "rgba(237,230,221,0.6)" }}>{e.s}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== GALERIA ===== */}
      <section className="px-6 py-20 md:px-10 md:py-28" style={{ background: S.midnight }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: S.ouro }}>Galeria</p>
            <h2 className="mt-4 font-display font-light" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: S.creme }}>
              De Santiago ao Douro
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-8"><GaleriaInterativa /></Reveal>
        </div>
      </section>

      {/* ===== RESERVE + PREÇO ===== */}
      <section id="reservar" className="px-6 py-24 md:px-10 md:py-32" style={{ background: S.vinhoDeep }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: S.creme, opacity: 0.6 }}>Tarifas e datas</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-display font-light leading-[1.05]" style={{ fontSize: "clamp(2rem,4.5vw,3.6rem)", color: S.creme }}>
              Você escolhe
              <br />
              <span className="italic" style={{ color: S.ouro }}>quando partir</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-xl text-[15px] font-light leading-relaxed" style={{ color: S.textSoft }}>
              Disponível de 1 de Março a 31 de Outubro, com saída mínima de 2 pessoas. A tarifa
              varia conforme a temporada.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              <div className="rounded-2xl p-7" style={{ background: "rgba(0,32,91,0.3)", border: `1px solid rgba(0,48,135,0.5)` }}>
                <div className="flex items-center justify-between">
                  <span className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ border: `1px solid ${S.ocean}`, color: S.creme }}>Temporada Baixa</span>
                  <span className="text-[11px]" style={{ color: S.textSoft }}>Mar, Abr, Mai, Out</span>
                </div>
                <p className="mt-6 font-display font-light" style={{ fontSize: "clamp(2rem,3.5vw,2.8rem)", color: S.creme }}>€ 2.200</p>
                <p className="mt-1 text-[12px] font-light" style={{ color: S.textSoft }}>por pessoa · quarto duplo</p>
                <p className="mt-4 text-[12px] font-light" style={{ color: S.textSoft }}>Suplemento individual: + € 700</p>
              </div>

              <div className="rounded-2xl p-7" style={{ background: "rgba(196,165,106,0.12)", border: `1px solid rgba(196,165,106,0.45)` }}>
                <div className="flex items-center justify-between">
                  <span className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ background: S.ouro, color: S.noite }}>Temporada Alta</span>
                  <span className="text-[11px]" style={{ color: S.textSoft }}>Jun a Set</span>
                </div>
                <p className="mt-6 font-display font-light" style={{ fontSize: "clamp(2rem,3.5vw,2.8rem)", color: S.creme }}>€ 2.380</p>
                <p className="mt-1 text-[12px] font-light" style={{ color: S.textSoft }}>por pessoa · quarto duplo</p>
                <p className="mt-4 text-[12px] font-light" style={{ color: S.textSoft }}>Suplemento individual: + € 850</p>
              </div>

              <div className="rounded-2xl p-7" style={{ background: "rgba(196,165,106,0.08)", border: `1px solid rgba(196,165,106,0.2)` }}>
                <div className="flex items-center justify-between">
                  <span className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ border: `1px solid ${S.ouro}`, color: S.ouro }}>Reserva</span>
                  <span className="text-[11px]" style={{ color: S.textSoft }}>mín. 2 pessoas</span>
                </div>
                <p className="mt-6 font-display font-light" style={{ fontSize: "clamp(1.3rem,2.5vw,1.9rem)", color: S.creme }}>
                  No seu ritmo
                </p>
                <div className="mt-4 space-y-2 text-[12px] font-light" style={{ color: S.textSoft }}>
                  <p>30% de entrada via Pix ou transferência</p>
                  <p>+ 5x sem juros no cartão de crédito</p>
                  <p>Tarifa single sob consulta</p>
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
              <a href="#contato" className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]" style={{ background: S.ouro, color: S.noite }}>
                Falar com a equipe &#8594;
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== INCLUSO / NÃO INCLUSO ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: S.casca, color: S.creme }}>
        <div className="mx-auto grid max-w-[1280px] gap-12 md:grid-cols-2 md:gap-20">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: S.ouro }}>Está incluso</p>
            <ul className="mt-8 space-y-4">
              {INCLUSO.map((item) => (
                <li key={item} className="flex items-start gap-4 text-[14px] font-light leading-relaxed" style={{ color: S.creme }}>
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: S.ouro }} />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: "rgba(138,31,45,0.7)" }}>Não incluso</p>
            <ul className="mt-8 space-y-4">
              {NAO_INCLUSO.map((item) => (
                <li key={item} className="flex items-start gap-4 text-[14px] font-light leading-relaxed" style={{ color: S.textSoft }}>
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "rgba(138,31,45,0.4)" }} />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-10 rounded-2xl border p-5" style={{ borderColor: "rgba(196,165,106,0.18)" }}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: S.ouro }}>Cancelamento</p>
              <div className="mt-4 space-y-2 text-[13px] font-light" style={{ color: S.textSoft }}>
                <div className="flex justify-between"><span>31 dias ou mais</span><span style={{ color: S.creme }}>10%</span></div>
                <div className="flex justify-between"><span>30 a 21 dias</span><span style={{ color: S.creme }}>20%</span></div>
                <div className="flex justify-between"><span>20 a 8 dias</span><span style={{ color: S.creme }}>50%</span></div>
                <div className="flex justify-between"><span>7 dias ou menos</span><span style={{ color: S.creme }}>100%</span></div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== AONIKIA ===== */}
      <section className="px-6 py-20 md:px-10 md:py-24" style={{ background: S.midnight }}>
        <div className="mx-auto max-w-[860px] text-center">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: S.creme, opacity: 0.6 }}>
              AonikIA · especialista em Santiago e Douro
            </p>
            <h2 className="mt-5 font-display font-light leading-[1.15]" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: S.creme }}>
              Pergunte tudo sobre esta jornada
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] font-light leading-relaxed" style={{ color: "rgba(237,230,221,0.66)" }}>
              Como se preparar para o Caminho Português, como funciona a credencial do peregrino, o
              transfer ao Douro e as provas de vinho. A AonikIA conhece esta combinação de ponta a
              ponta.
            </p>
            <a href="#contato" className="mt-7 inline-flex items-center gap-3 rounded-full border px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 hover:opacity-80" style={{ borderColor: S.ouro, color: S.ouro }}>
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
