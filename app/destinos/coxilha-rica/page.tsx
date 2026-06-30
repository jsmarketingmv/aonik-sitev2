"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "../../components/Nav";
import Breadcrumb from "../../components/Breadcrumb";
import Footer from "../../components/Footer";
import Contato from "../../components/Contato";
import FloatingActions from "../../components/FloatingActions";
import { Reveal, EASE } from "../../components/ui";
import { GRUPOS, datasDoAno } from "../../lib/grupos";

const GRUPO = GRUPOS.find((g) => g.id === "coxilha-rica")!;

/* ============================================================
   COXILHA RICA — Serra Catarinense · Sul do Brasil
   Personalidade: O ONDULAR (perfil animado das coxilhas),
   O CAMPO vs A FAZENDA, corredor dos tropeiros.
   Paleta: argila vermelha · feno dourado · céu do planalto.
   ============================================================ */

const C = {
  terra:    "#0e0906",
  argila:   "#7a3420",
  campo:    "#c4904a",
  céu:      "#7bafce",
  verde:    "#2e4c1a",
  creme:    "#f1e8d8",
  stone:    "#1c1208",
  line:     "rgba(196,144,74,0.2)",
  textSoft: "rgba(241,232,216,0.62)",
};

// ============================================================
// COMPONENTE: VideoThumbnail
// Exibe thumb do YT, abre iframe inline ao clicar.
// ============================================================
function VideoThumbnail({ videoId, start = 0, end }: { videoId: string; start?: number; end?: number }) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const src =
    `https://www.youtube.com/embed/${videoId}` +
    `?autoplay=1&rel=0&modestbranding=1&controls=1&playsinline=1` +
    `&start=${start}${end ? `&end=${end}` : ""}`;

  return (
    <div
      className="relative w-full cursor-pointer overflow-hidden rounded-2xl"
      style={{ aspectRatio: "16/9" }}
      onClick={() => setPlaying(true)}
    >
      <AnimatePresence mode="wait">
        {!playing ? (
          <motion.div
            key="thumb"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="group h-full w-full"
          >
            {/* Thumbnail */}
            <img
              src={thumb}
              alt="Coxilha Rica em vídeo"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
            {/* Overlay */}
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(to bottom, transparent 40%, ${C.terra}99)` }}
            />
            {/* Borda dourada sutil */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{ boxShadow: `inset 0 0 0 1px ${C.line}` }}
            />
            {/* Botão play */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex h-16 w-16 items-center justify-center rounded-full"
                style={{ background: "rgba(196,144,74,0.9)", backdropFilter: "blur(8px)" }}
              >
                <svg className="ml-1 h-6 w-6" viewBox="0 0 24 24" fill={C.terra}>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.div>
            </div>
            {/* Labels */}
            <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.22em]"
                style={{ color: C.campo }}
              >
                Assistir ao filme
              </span>
              <span className="text-[11px]" style={{ color: "rgba(241,232,216,0.6)" }}>
                1:37
              </span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="iframe"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <iframe
              src={src}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="h-full w-full border-0"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================
// COMPONENTE: CampoHorizon (hero visual — silhuetas do campo)
// Múltiplas camadas de coxilhas + rota animada.
// ============================================================
function CampoHorizon() {
  const layers = [
    { d: "M0,90 C80,55 160,75 240,65 C300,58 370,80 440,68 L440,300 L0,300 Z",   o: 0.08 },
    { d: "M0,130 C70,100 150,88 220,98 C290,108 370,120 440,105 L440,300 L0,300 Z", o: 0.14 },
    { d: "M0,165 C60,145 130,128 200,138 C270,148 360,155 440,140 L440,300 L0,300 Z", o: 0.22 },
    { d: "M0,200 C50,180 115,162 185,172 C255,182 340,190 440,175 L440,300 L0,300 Z", o: 0.34 },
    { d: "M0,230 C40,218 95,205 165,214 C235,223 315,228 440,215 L440,300 L0,300 Z", o: 0.5 },
  ];

  // Rota pontilhada animada sobre o campo
  const rota = "M52,242 C120,228 185,236 230,222 C278,207 348,220 405,212";

  const fazendas = [
    { x: 52,  y: 242, label: "Lua Cheia"     },
    { x: 185, y: 234, label: "Rodeio Bonito" },
    { x: 302, y: 218, label: "São João"      },
    { x: 405, y: 212, label: "Tijolinho"     },
  ];

  return (
    <svg viewBox="0 0 440 300" className="h-full w-full" style={{ overflow: "visible" }}>
      {/* Camadas de campos (profundidade) */}
      {layers.map((l, i) => (
        <path key={i} d={l.d} fill={C.argila} opacity={l.o} />
      ))}
      {/* Linha da rota animada */}
      <motion.path
        d={rota}
        fill="none"
        stroke={C.campo}
        strokeWidth="1.6"
        strokeDasharray="5 6"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.8, ease: EASE, delay: 0.8 }}
      />
      {/* Fazendas como pins */}
      {fazendas.map((f, i) => (
        <motion.g
          key={f.label}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: EASE, delay: 1.2 + i * 0.18 }}
        >
          <circle cx={f.x} cy={f.y} r="4.5" fill={C.terra} stroke={C.campo} strokeWidth="1.8" />
          <text
            x={f.x}
            y={f.y - 10}
            fill="rgba(241,232,216,0.85)"
            fontSize="9"
            textAnchor="middle"
            letterSpacing="0.6"
            style={{ fontFamily: "sans-serif" }}
          >
            {f.label}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}

// ============================================================
// COMPONENTE: ElevationProfile (seção "Sobe. Desce. Repete.")
// ============================================================
const HILL_PATH =
  "M 0,210 " +
  "C 35,210 62,75 98,70 " +
  "C 134,65 162,185 198,180 " +
  "C 234,175 260,68 298,63 " +
  "C 336,58 352,208 360,205 " +
  "C 375,202 408,62 448,57 " +
  "C 488,52 518,182 548,178 " +
  "C 578,174 614,60 648,55 " +
  "C 660,53 662,205 662,202 " +
  "C 672,199 698,125 726,120 " +
  "C 754,115 778,158 830,154 " +
  "C 862,151 898,90 932,85 " +
  "C 950,82 960,205 960,205";

const HILL_FILL = HILL_PATH + " L 960,240 L 0,240 Z";

const FAZENDAS_PERFIL = [
  { x: 15,  label: "Lua Cheia",     sub: "partida",  y: 210 },
  { x: 350, label: "Rodeio Bonito", sub: "dia 2",    y: 178 },
  { x: 648, label: "São João",      sub: "dia 3",    y: 55  },
  { x: 830, label: "Tijolinho",     sub: "dia 4",    y: 154 },
  { x: 945, label: "Lua Cheia",     sub: "retorno",  y: 205 },
];

const LEGS = [
  { x1: 0,   x2: 360, label: "20,76 km · +447 m" },
  { x1: 360, x2: 662, label: "17,45 km · +496 m"  },
  { x1: 662, x2: 830, label: "7,56 km · +153 m"   },
  { x1: 830, x2: 960, label: "9,64 km · +271 m"   },
];

function ElevationProfile() {
  return (
    <svg viewBox="0 0 960 260" className="w-full" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="crFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.argila} stopOpacity="0.45" />
          <stop offset="100%" stopColor={C.argila} stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {[80, 120, 160, 200].map((y) => (
        <line key={y} x1={0} y1={y} x2={960} y2={y} stroke={C.line} strokeWidth="0.6" />
      ))}

      <path d={HILL_FILL} fill="url(#crFill)" />

      <motion.path
        d={HILL_PATH}
        fill="none"
        stroke={C.campo}
        strokeWidth="2.2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 3.5, ease: EASE, delay: 0.2 }}
      />

      {LEGS.map((l) => (
        <text
          key={l.x1}
          x={(l.x1 + l.x2) / 2}
          y={245}
          fill={C.campo}
          fontSize="9"
          textAnchor="middle"
          letterSpacing="0.8"
          opacity="0.7"
          style={{ fontFamily: "sans-serif", textTransform: "uppercase" }}
        >
          {l.label}
        </text>
      ))}

      {FAZENDAS_PERFIL.map((f, fi) => {
        const anchor = fi === 0 ? "start" : fi === FAZENDAS_PERFIL.length - 1 ? "end" : "middle";
        return (
          <g key={f.label + f.x}>
            <line x1={f.x} y1={f.y} x2={f.x} y2={218} stroke={C.campo} strokeWidth="1" strokeDasharray="2 3" strokeOpacity="0.5" />
            <circle cx={f.x} cy={f.y} r="4.5" fill={C.terra} stroke={C.campo} strokeWidth="1.8" />
            <text x={f.x} y={f.y - 10} fill={C.creme} fontSize="10" textAnchor={anchor}
              letterSpacing="0.5" style={{ fontFamily: "sans-serif" }}>{f.label}</text>
            <text x={f.x} y={f.y - 22} fill={C.campo} fontSize="8.5" textAnchor={anchor}
              letterSpacing="1.2" opacity="0.75"
              style={{ fontFamily: "sans-serif", textTransform: "uppercase" }}>{f.sub}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ============================================================
// COMPONENTE: GaleriaInterativa — selector compacto
// ============================================================
const GALERIA = [
  {
    src: "/images/coxilha-rica/campo-grupo-araucaria.jpg",
    cap: "Os campos de altitude entre as araucárias",
    tag: "Paisagem",
  },
  {
    src: "/images/coxilha-rica/piquenique-chimarrao.jpg",
    cap: "Chimarrão e pausa no meio do campo",
    tag: "Convívio",
  },
  {
    src: "/images/coxilha-rica/campo-estrada-pinheiros.jpg",
    cap: "A estrada das fazendas entre os pinheiros",
    tag: "Rota",
  },
  {
    src: "/images/coxilha-rica/fazenda-casa.jpg",
    cap: "Chegada à fazenda histórica da serra",
    tag: "Fazenda",
  },
  {
    src: "/images/coxilha-rica/cachoeira.jpg",
    cap: "A cachoeira no coração da travessia",
    tag: "Natureza",
  },
  {
    src: "/images/coxilha-rica/gastronomia.jpg",
    cap: "A mesa farta da Serra Catarinense",
    tag: "Gastronomia",
  },
];

function GaleriaInterativa() {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + GALERIA.length) % GALERIA.length);
  const next = () => setIdx((i) => (i + 1) % GALERIA.length);
  const img = GALERIA[idx];

  return (
    <div className="flex flex-col gap-3">
      {/* Imagem destacada */}
      <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "16/10" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0.6, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="absolute inset-0"
          >
            <img src={img.src} alt={img.cap} className="h-full w-full object-cover" />
          </motion.div>
        </AnimatePresence>
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to top, ${C.terra}cc 0%, transparent 55%)` }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className="text-[10px] font-semibold uppercase tracking-[0.32em]" style={{ color: C.campo }}>
            {img.tag}
          </span>
          <p className="mt-1 text-[14px] font-light" style={{ color: C.creme }}>{img.cap}</p>
        </div>
        <span className="absolute right-4 top-4 text-[11px] font-medium" style={{ color: "rgba(241,232,216,0.55)" }}>
          {idx + 1} / {GALERIA.length}
        </span>
        <button
          onClick={prev}
          aria-label="Anterior"
          className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full text-base transition-all hover:scale-110"
          style={{ background: `${C.terra}99`, color: C.campo }}
        >
          ‹
        </button>
        <button
          onClick={next}
          aria-label="Próxima"
          className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full text-base transition-all hover:scale-110"
          style={{ background: `${C.terra}99`, color: C.campo }}
        >
          ›
        </button>
      </div>

      {/* Miniaturas — faixa horizontal abaixo */}
      <div className="grid auto-cols-fr grid-flow-col gap-2">
        {GALERIA.map((g, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={g.cap}
            className="relative overflow-hidden rounded-lg transition-all duration-300"
            style={{
              aspectRatio: "16/10",
              outline: i === idx ? `2px solid ${C.campo}` : "2px solid transparent",
              outlineOffset: 2,
            }}
          >
            <img
              src={g.src}
              alt={g.cap}
              className="h-full w-full object-cover transition-opacity duration-300"
              style={{ opacity: i === idx ? 1 : 0.42 }}
            />
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
  { v: "5",       u: "dias",         s: "4 noites" },
  { v: "55,4",    u: "quilômetros",  s: "terreno variado" },
  { v: "+1.367",  u: "metros",       s: "positivo acumulado" },
  { v: "3",       u: "dias",         s: "de caminhada real" },
  { v: "~1.200",  u: "metros",       s: "altitude máxima" },
  { v: "95%",     u: "a céu aberto", s: "sol e vento dos campos" },
];

const ROTEIRO = [
  {
    d: "01",
    t: "Chegada à Fazenda Lua Cheia",
    s: "Chá da tarde, jantar e o cheiro de campo que não sai da memória. Kit AONIK na chegada.",
    icon: "🏡",
  },
  {
    d: "02",
    t: "Lua Cheia para Rodeio Bonito",
    s: "20,76 km · +447 m. Primeiros 8 km no estradão de fazenda. Depois campo aberto, vento e as primeiras coxilhas.",
    icon: "⛰",
  },
  {
    d: "03",
    t: "Rodeio Bonito para São João",
    s: "17,45 km · +496 m. O coração da rota: coxilhas que sobem e descem sem parar. Parada em cachoeira.",
    icon: "💧",
  },
  {
    d: "04",
    t: "São João e o Corredor dos Tropeiros",
    s: "Manhã: 7,56 km (+153 m) até a Fazenda Tijolinho. Tarde: 9,64 km (+271 m) pelo corredor histórico com paredes de pedra. Jantar de celebração.",
    icon: "🪨",
  },
  {
    d: "05",
    t: "Café e despedida",
    s: "Café incluído. Cavalgada opcional (1 h, valor à parte). Saída entre 9 e 10 h.",
    icon: "🐎",
  },
];

const INCLUSO = [
  "4 noites nas fazendas do percurso",
  "Todas as refeições (jantar dia 1 até café dia 5)",
  "Taxas de ingresso nas propriedades",
  "Lancheiras e suporte em campo",
  "Carro suporte com transporte de bagagem",
  "Guias especializados (1 para cada 3 clientes)",
  "Equipamento GPS e rastreamento SPOT",
  "Seguro aventura (cobertura trekking)",
  "Kit boas-vindas com camisa exclusiva AONIK",
];

const NAO_INCLUSO = [
  "Transporte até a Fazenda Lua Cheia",
  "Equipamentos pessoais de trekking",
  "Almoço no dia 5",
  "Atividades fora do itinerário",
  "Cavalgada (opcional, contratada à parte)",
  "Transfer aeroporto (Florianópolis/Navegantes): R$ 400 p.p.",
  "Day-use almoço dia 1: R$ 120 p.p.",
];

// ============================================================
// PAGE
// ============================================================
export default function CoxilhaRicaPage() {
  const datas2026 = datasDoAno(GRUPO, 2026);
  const datas2027 = datasDoAno(GRUPO, 2027);

  return (
    <main className="relative" style={{ background: C.creme }}>
      <Nav />

      {/* ===== HERO — CAMPO ABERTO ===== */}
      <section
        className="relative flex min-h-[100svh] w-full items-center overflow-hidden"
        style={{ background: C.terra }}
      >
        {/* BG: vídeo ambiente do campo (start=3, end=100 corta bordas e cards) */}
        <div className="absolute inset-0 overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/MnKxV7UHzk8?autoplay=1&mute=1&loop=1&playlist=MnKxV7UHzk8&controls=0&rel=0&showinfo=0&modestbranding=1&iv_load_policy=3&disablekb=1&playsinline=1&start=3&end=100"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen={false}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%) scale(1.22)",
              width: "calc(100vh * 1.7778)",
              minWidth: "100%",
              height: "calc(100vw * 0.5625)",
              minHeight: "100%",
              border: "none",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Overlay escuro */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, ${C.terra}e0 0%, ${C.terra}99 50%, ${C.terra}55 100%)`,
          }}
        />

        {/* Cobre os controles do YT durante o carregamento inicial */}
        <motion.div
          className="absolute inset-0 z-[1]"
          style={{ background: C.terra, pointerEvents: "none" }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.6, delay: 2.0 }}
        />

        {/* Grid: editorial esquerda + paisagem direita */}
        <div className="relative z-10 mx-auto grid w-full max-w-[1400px] items-center gap-10 px-6 py-28 md:grid-cols-2 md:gap-16 md:px-10">
          {/* Esquerda — texto */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.2 }}
              className="text-[11px] font-semibold uppercase tracking-[0.4em]"
              style={{ color: C.campo }}
            >
              Serra Catarinense · Sul do Brasil
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
              className="mt-4 font-display font-light uppercase leading-[0.86] tracking-[-0.02em]"
              style={{ fontSize: "clamp(3.2rem, 8vw, 7.5rem)", color: C.creme }}
            >
              Coxilha
              <br />
              <span style={{ color: C.campo }}>Rica</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.5 }}
              className="mt-6 max-w-md text-[15px] font-light leading-relaxed md:text-base"
              style={{ color: "rgba(241,232,216,0.72)" }}
            >
              Cinco dias atravessando os campos de altitude da Serra Catarinense,
              de fazenda em fazenda, pelo mesmo caminho que os{" "}
              <span style={{ color: C.creme }}>tropeiros</span> usaram por séculos.
              Um Brasil que ainda existe. Vale a caminhada.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.65 }}
              className="mt-8 flex flex-wrap items-center gap-5"
            >
              <a
                href="#reservar"
                className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]"
                style={{ background: C.campo, color: C.terra }}
              >
                Reserve sua vaga <span>→</span>
              </a>
              <span>
                <span className="text-[12px] uppercase tracking-[0.16em]" style={{ color: "rgba(241,232,216,0.5)" }}>
                  a partir de
                </span>{" "}
                <span className="font-display text-2xl" style={{ color: C.creme }}>
                  R$ 5.800
                </span>
              </span>
            </motion.div>
            <div className="mt-7">
              <Breadcrumb tone="dark" accent={C.campo} items={[
                { label: "Home", href: "/" },
                { label: "Grupos", href: "/grupos" },
                { label: "Coxilha Rica" },
              ]} />
            </div>
          </div>

          {/* Direita — campo horizon SVG */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.35 }}
            className="mx-auto hidden w-full max-w-[480px] md:block"
            style={{ height: 320 }}
          >
            <CampoHorizon />
          </motion.div>
        </div>
      </section>

      {/* ===== SOBE. DESCE. REPETE. — texto + video thumbnail ===== */}
      <section
        className="px-6 py-24 md:px-10 md:py-32"
        style={{ background: C.stone }}
      >
        <div className="mx-auto grid max-w-[1280px] items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Esquerda — texto */}
          <div>
            <Reveal>
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.35em]"
                style={{ color: C.campo }}
              >
                O perfil da rota
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                className="mt-5 font-display font-light leading-[1.0]"
                style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)", color: C.creme }}
              >
                Sobe.
                <br />
                Desce.
                <br />
                <span className="italic" style={{ color: C.campo }}>
                  Repete.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p
                className="mt-5 max-w-sm text-[15px] font-light leading-relaxed"
                style={{ color: C.textSoft }}
              >
                &ldquo;Coxilha&rdquo; é a palavra gaúcha para a colina que sobe
                suave e desce do outro lado sem avisar. Três dias de caminhada em
                que o horizonte nunca é o mesmo duas vezes.
              </p>
            </Reveal>
          </div>

          {/* Direita — video thumbnail (filme do produto) */}
          <Reveal delay={0.1}>
            <VideoThumbnail videoId="mpJZGjJD9sA" start={3} end={100} />
          </Reveal>
        </div>
      </section>

      {/* ===== PERFIL DE ELEVAÇÃO FULL WIDTH ===== */}
      <section className="w-full overflow-hidden pb-0 pt-16" style={{ background: C.stone }}>
        <div className="w-full px-4 md:px-8">
          <Reveal delay={0.05}>
            <ElevationProfile />
          </Reveal>
        </div>

        {/* Stats bar */}
        <div
          className="mt-12 grid grid-cols-2 gap-px md:grid-cols-3 lg:grid-cols-6"
          style={{ background: C.line, borderTop: `1px solid ${C.line}` }}
        >
          {STATS.map((s, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <div className="flex flex-col px-6 py-8" style={{ background: C.stone }}>
                <span
                  className="font-display font-light leading-none"
                  style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)", color: C.creme }}
                >
                  {s.v}
                </span>
                <span
                  className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: C.campo }}
                >
                  {s.u}
                </span>
                <span className="mt-1 text-[12px] font-light" style={{ color: C.textSoft }}>
                  {s.s}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== O CAMPO · A FAZENDA ===== */}
      <section className="w-full" style={{ background: C.terra }}>
        <div className="grid md:grid-cols-2">
          <div className="relative min-h-[420px] overflow-hidden md:min-h-[580px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('/images/coxilha-rica/campo-trilha-grupo.jpg')",
              }}
            />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 30%, ${C.terra}dd 100%)` }} />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <Reveal>
                <p className="text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: C.céu }}>
                  Lá fora
                </p>
                <h3
                  className="mt-3 font-display font-light uppercase leading-[0.9]"
                  style={{ fontSize: "clamp(2rem,4vw,3.5rem)", color: C.creme }}
                >
                  O Campo
                </h3>
                <p className="mt-4 max-w-sm text-[14px] font-light leading-relaxed" style={{ color: "rgba(241,232,216,0.72)" }}>
                  95% do percurso a céu aberto. Vento constante, sol que não
                  perdoa e um horizonte que se dobra sobre si mesmo. Os campos
                  de altitude da Serra Catarinense não têm filtro.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="relative min-h-[420px] overflow-hidden md:min-h-[580px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('/images/coxilha-rica/fazenda-lareira.jpg')",
              }}
            />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 30%, ${C.argila}ee 100%)` }} />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <Reveal>
                <p className="text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: C.campo }}>
                  À noite
                </p>
                <h3
                  className="mt-3 font-display font-light uppercase leading-[0.9]"
                  style={{ fontSize: "clamp(2rem,4vw,3.5rem)", color: C.creme }}
                >
                  A Fazenda
                </h3>
                <p className="mt-4 max-w-sm text-[14px] font-light leading-relaxed" style={{ color: "rgba(241,232,216,0.72)" }}>
                  Lareira acesa, chimarrão passado de mão em mão e churrasco
                  que começa quando o sol some. A hospitalidade gaúcha é o
                  projeto da noite.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== O CORREDOR DOS TROPEIROS ===== */}
      <section className="relative w-full overflow-hidden" style={{ background: C.stone }}>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('/images/coxilha-rica/campo-muro-pedra.jpg')",
          }}
        />
        <div className="absolute inset-0" style={{ background: `${C.stone}bb` }} />
        <div className="relative z-10 mx-auto max-w-[1000px] px-6 py-28 text-center md:py-44">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: C.campo }}>
              Dia 4 · patrimônio histórico
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              className="mt-6 font-display font-light leading-[1.1]"
              style={{ fontSize: "clamp(1.9rem,4.5vw,3.8rem)", color: C.creme }}
            >
              O caminho que os{" "}
              <span className="italic" style={{ color: C.campo }}>tropeiros</span>{" "}
              <br className="hidden md:block" />
              percorreram por duzentos anos
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p
              className="mx-auto mt-7 max-w-xl text-[15px] font-light leading-relaxed"
              style={{ color: C.textSoft }}
            >
              No quarto dia, a rota atravessa o{" "}
              <span style={{ color: C.creme }}>Corredor dos Tropeiros</span>: um
              trecho histórico ladeado por paredes de pedra que marcavam a passagem
              das tropas de muares e gado entre Rio Grande do Sul e São Paulo.
              As mesmas pedras, o mesmo chão. Só os pés mudaram.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== GALERIA INTERATIVA ===== */}
      <section className="px-6 py-20 md:px-10 md:py-28" style={{ background: C.terra }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: C.campo }}>
              Galeria
            </p>
            <h2
              className="mt-4 font-display font-light"
              style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: C.creme }}
            >
              O que você vai viver
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-8">
            <GaleriaInterativa />
          </Reveal>
        </div>
      </section>

      {/* ===== ROTEIRO DIA A DIA ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: C.stone, color: C.creme }}>
        <div className="mx-auto max-w-[1100px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: C.campo }}>
              O roteiro em essência
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-3 max-w-lg text-[14px] font-light leading-relaxed" style={{ color: C.textSoft }}>
              Cinco dias de imersão nos campos de altitude. O detalhe completo
              a gente fecha com você.
            </p>
          </Reveal>
          <div className="mt-12">
            {ROTEIRO.map((r, i) => (
              <Reveal key={r.d} delay={i * 0.05}>
                <div
                  className="grid grid-cols-[auto_1fr] items-baseline gap-6 border-t py-7 md:gap-10"
                  style={{ borderColor: C.line }}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-display text-sm" style={{ color: C.campo }}>{r.d}</span>
                    <span className="text-lg">{r.icon}</span>
                  </div>
                  <div>
                    <h3
                      className="font-display font-light"
                      style={{ fontSize: "clamp(1.1rem,2vw,1.5rem)" }}
                    >
                      {r.t}
                    </h3>
                    <p className="mt-1.5 text-[14px] font-light leading-relaxed" style={{ color: C.textSoft }}>
                      {r.s}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RESERVE SUA VAGA ===== */}
      <section id="reservar" className="px-6 py-24 md:px-10 md:py-32" style={{ background: C.argila }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: C.campo }}>
              Calendário de saídas confirmadas
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              className="mt-5 font-display font-light leading-[1.05]"
              style={{ fontSize: "clamp(2rem,4.5vw,3.6rem)", color: C.creme }}
            >
              Quando você quer viver
              <br />
              <span className="italic">a Coxilha Rica?</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-10 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: "rgba(241,232,216,0.5)" }}>
              Saídas 2026
            </p>
          </Reveal>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {datas2026.map((d, i) => (
              <Reveal key={d} delay={i * 0.06}>
                <div className="rounded-xl p-6" style={{ background: "rgba(196,144,74,0.12)", border: `1px solid ${C.line}` }}>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ background: C.campo, color: C.terra }}>
                      confirmada
                    </span>
                    <span className="text-[11px]" style={{ color: C.textSoft }}>5 dias</span>
                  </div>
                  <p className="mt-5 font-display font-light" style={{ fontSize: "clamp(1.3rem,2.5vw,1.9rem)", color: C.creme }}>{d}</p>
                  <p className="mt-1 text-[12px] font-light" style={{ color: C.textSoft }}>Serra Catarinense · 2026</p>
                  <a href="#contato" className="mt-5 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] transition-opacity hover:opacity-75" style={{ color: C.campo }}>
                    Reservar vaga <span>→</span>
                  </a>
                </div>
              </Reveal>
            ))}
          </div>

          {datas2027.length > 0 && (
            <>
              <Reveal delay={0.1}>
                <p className="mt-12 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: "rgba(241,232,216,0.5)" }}>
                  Saídas 2027
                </p>
              </Reveal>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {datas2027.map((d, i) => (
                  <Reveal key={d} delay={i * 0.06}>
                    <div className="rounded-xl p-6" style={{ background: "rgba(196,144,74,0.07)", border: `1px solid rgba(196,144,74,0.12)` }}>
                      <div className="flex items-center justify-between">
                        <span className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ border: `1px solid ${C.campo}`, color: C.campo }}>
                          2027
                        </span>
                        <span className="text-[11px]" style={{ color: C.textSoft }}>5 dias</span>
                      </div>
                      <p className="mt-5 font-display font-light" style={{ fontSize: "clamp(1.3rem,2.5vw,1.9rem)", color: C.creme }}>{d}</p>
                      <p className="mt-1 text-[12px] font-light" style={{ color: C.textSoft }}>Serra Catarinense · 2027</p>
                      <a href="#contato" className="mt-5 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] transition-opacity hover:opacity-75" style={{ color: C.campo }}>
                        Reservar vaga <span>→</span>
                      </a>
                    </div>
                  </Reveal>
                ))}
              </div>
            </>
          )}

          <Reveal delay={0.15}>
            <div className="mt-14 flex flex-col gap-4 border-t pt-10 md:flex-row md:items-center md:justify-between" style={{ borderColor: C.line }}>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: C.textSoft }}>Investimento</p>
                <p className="mt-2 font-display font-light" style={{ fontSize: "clamp(2rem,3.5vw,2.8rem)", color: C.creme }}>
                  R$ 5.800
                  <span className="ml-3 text-[14px]" style={{ color: C.textSoft }}>por pessoa · duplo compartilhado</span>
                </p>
                <p className="mt-1 text-[13px] font-light" style={{ color: C.textSoft }}>
                  Quarto individual: + R$ 300. Vagas extremamente limitadas.
                  Transfer Florianópolis/Navegantes: R$ 400 p.p.
                </p>
              </div>
              <a href="#contato" className="inline-flex shrink-0 items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]" style={{ background: C.campo, color: C.terra }}>
                Falar com a equipe →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== INCLUSO / NÃO INCLUSO ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: C.stone, color: C.creme }}>
        <div className="mx-auto grid max-w-[1280px] gap-12 md:grid-cols-2 md:gap-20">
          <div>
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: C.campo }}>Está incluso</p>
              <ul className="mt-8 space-y-4">
                {INCLUSO.map((item) => (
                  <li key={item} className="flex items-start gap-4 text-[14px] font-light leading-relaxed">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: C.campo }} />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div>
            <Reveal delay={0.1}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: "rgba(196,144,74,0.5)" }}>Não incluso</p>
              <ul className="mt-8 space-y-4">
                {NAO_INCLUSO.map((item) => (
                  <li key={item} className="flex items-start gap-4 text-[14px] font-light leading-relaxed" style={{ color: C.textSoft }}>
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "rgba(196,144,74,0.35)" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== AONIKIA ===== */}
      <section className="px-6 py-20 md:px-10 md:py-24" style={{ background: C.argila }}>
        <div className="mx-auto max-w-[860px] text-center">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: C.campo }}>
              AonikIA · especialista nesta caminhada
            </p>
            <h2
              className="mt-5 font-display font-light leading-[1.15]"
              style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: C.creme }}
            >
              Pergunte tudo sobre a Coxilha Rica
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] font-light leading-relaxed" style={{ color: "rgba(241,232,216,0.65)" }}>
              O que levar, nível de condicionamento necessário, como chegar
              à Fazenda Lua Cheia, clima em cada mês. A AonikIA conhece este
              trekking de ponta a ponta.
            </p>
            <a
              href="#contato"
              className="mt-7 inline-flex items-center gap-3 rounded-full border px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 hover:opacity-80"
              style={{ borderColor: C.campo, color: C.campo }}
            >
              Conversar com a AonikIA <span>→</span>
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
