"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";
import Contato from "../../../components/Contato";
import FloatingActions from "../../../components/FloatingActions";
import { Reveal, EASE } from "../../../components/ui";

/* ============================================================
   RUTA CHONOS — MN Skorpios II
   Patagônia Norte · Puerto Montt · 6 dias / 5 noites · 800mn
   ============================================================ */
const C = {
  selva:    "#04180e",
  bosco:    "#0c2c1a",
  canal:    "#10392A",
  esm:      "#3aab8a",
  esmDeep:  "#1a7a62",
  areia:    "#c9a87a",
  neblina:  "#d4e6e0",
  creme:    "#e8f0ec",
  line:     "rgba(58,171,138,0.2)",
};

// ---------- MAPA DOS ARQUIPÉLAGOS ----------
const CHONOS_PATH =
  "M210,48 Q120,90 130,145 Q140,195 95,245 Q70,290 65,335 Q55,375 185,415 Q280,450 260,508";
const CHONOS_STOPS = [
  { x: 210, y: 48,  label: "Puerto Montt",       kind: "ship"    },
  { x: 130, y: 145, label: "Quemchi / Dalcahue", kind: "island"  },
  { x: 95,  y: 245, label: "Puerto Aguirre",     kind: "village" },
  { x: 65,  y: 335, label: "Islotes Conejos",    kind: "fauna"   },
  { x: 185, y: 415, label: "Fiordo Quitralco",   kind: "glacier" },
  { x: 260, y: 508, label: "Glaciar San Rafael", kind: "glacier" },
];
const CHONOS_ISLANDS = [
  { cx: 80,  cy: 80,  rx: 30, ry: 14 },
  { cx: 240, cy: 130, rx: 26, ry: 12 },
  { cx: 155, cy: 200, rx: 22, ry: 10 },
  { cx: 55,  cy: 290, rx: 18, ry: 9  },
  { cx: 290, cy: 350, rx: 24, ry: 11 },
  { cx: 130, cy: 460, rx: 28, ry: 13 },
];

function ChonorMap() {
  return (
    <svg viewBox="-30 20 420 540" className="h-full w-full">
      {CHONOS_ISLANDS.map((is, i) => (
        <ellipse key={i} cx={is.cx} cy={is.cy} rx={is.rx} ry={is.ry}
          fill={C.bosco} opacity="0.7" />
      ))}
      <motion.path
        d={CHONOS_PATH} fill="none" stroke={C.esm}
        strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1 7"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.6, ease: EASE, delay: 0.4 }}
      />
      {CHONOS_STOPS.map((s) => {
        const anchor = s.x > 180 ? "start" : "end";
        const lx = s.x > 180 ? s.x + 14 : s.x - 14;
        return (
          <g key={s.label}>
            {s.kind === "glacier" && (
              <path d={`M${s.x - 6},${s.y + 5} L${s.x},${s.y - 6} L${s.x + 6},${s.y + 5} Z`}
                fill={C.neblina} />
            )}
            {s.kind !== "glacier" && (
              <circle cx={s.x} cy={s.y} r="5"
                fill={s.kind === "ship" ? C.areia : C.esm} />
            )}
            <text x={lx} y={s.y} fill="rgba(212,230,224,0.75)"
              fontSize="11.5" letterSpacing="1.2" textAnchor={anchor}
              dominantBaseline="middle" style={{ textTransform: "uppercase" }}>
              {s.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

const DESTAQUES = [
  { num: "01", t: "Glaciar San Rafael",     d: "Uma das geleiras mais acessíveis do Campo de Gelo Norte. De bote, a poucos metros do gelo." },
  { num: "02", t: "800 milhas náuticas",    d: "A maior rota da Skorpios: 6 dias por canais, arquipélagos e fiordos do sul do Chile." },
  { num: "03", t: "Arquipélago de Chiloé",  d: "Palafitas, igrejas de madeira e o folclore do povo chilote no começo da jornada." },
  { num: "04", t: "Puerto Aguirre",         d: "Vila de pescadores sem estrada. O Skorpios II é a ligação com o mundo." },
  { num: "05", t: "Islotes Conejos",        d: "Colônia de lobos-marinhos e pinguins de Magalhães em estado selvagem." },
  { num: "06", t: "Skorpios II",            d: "60 hóspedes em cabines com janelas abertas para os canais. Pequeno o suficiente para ir longe." },
];

const DESTINOS = [
  { nome: "Arquipélago de Chiloé",
    desc: "Igrejas de madeira, palafitas e a mitologia chilota que moldou o sul do Chile.",
    img: "/skorpios/DSC_4317.JPG" },
  { nome: "Puerto Aguirre",
    desc: "Vila sem estrada, sem aeroporto. O Skorpios II é o único transporte regular.",
    img: "/skorpios/DSC_6897.JPG" },
  { nome: "Islotes Conejos",
    desc: "Lobos-marinhos e pinguins nas ilhotas. Desembarque silencioso de bote.",
    img: "/skorpios/DSC_4495.JPG" },
  { nome: "Fiordo Quitralco",
    desc: "Termas naturais cercadas de selva valdiviana no coração dos canais.",
    img: "/skorpios/DSC_6380.JPG" },
];

const ROTEIRO = [
  { d: "01", t: "Puerto Montt: embarque",               s: "Zarpamos rumo ao sul pelos canais de Chiloé." },
  { d: "02", t: "Chiloé: Quemchi e Dalcahue",           s: "Vilas de madeira, igrejas e o mundo chilote." },
  { d: "03", t: "Puerto Aguirre",                       s: "A vila que o Skorpios mantém viva." },
  { d: "04", t: "Islotes Conejos",                      s: "Fauna selvagem e o silêncio dos canais." },
  { d: "05", t: "Fiordo Quitralco e Glaciar S. Rafael", s: "Gelo do Campo de Gelo Norte a poucos metros." },
  { d: "06", t: "Retorno a Puerto Montt",               s: "O fim da rota, o começo das histórias." },
];

// Temporada Set 2026 – Abr 2027 · zarpes aos sábados
const SAIDAS = {
  baja: [
    { mes: "Set 2026", dias: [15] },
    { mes: "Out 2026", dias: [10, 17, 24, 31] },
    { mes: "Nov 2026", dias: [7, 14, 21, 28] },
    { mes: "Dez 2026", dias: [5, 12] },
    { mes: "Fev 2027", dias: [27] },
    { mes: "Mar 2027", dias: [6, 13, 20, 27] },
    { mes: "Abr 2027", dias: [3, 10, 17, 24] },
  ],
  alta: [
    { mes: "Dez 2026", dias: [21, 28] },
    { mes: "Jan 2027", dias: [3, 9, 16, 23, 30] },
    { mes: "Fev 2027", dias: [6, 13, 20] },
  ],
};

const GALERIA_CHONOS = [
  { src: "/skorpios/DSC_0020.JPG",     cap: "MN Skorpios II navegando pelos canais",   tag: "Navegação"   },
  { src: "/skorpios/DSC_4317.JPG",     cap: "O navio entre as ilhas do arquipélago",   tag: "Arquipélago" },
  { src: "/skorpios/DSC_6897.JPG",     cap: "Selva valdiviana descendo até o mar",     tag: "Natureza"    },
  { src: "/skorpios/DSC_4495.JPG",     cap: "Lobos-marinhos nos islotes",              tag: "Fauna"       },
  { src: "/skorpios/DSC_6380.JPG",     cap: "Fiordo Quitralco ao entardecer",          tag: "Fiordo"      },
  { src: "/skorpios/DSC_pequenez.jpg", cap: "A nossa pequenez diante desta natureza",  tag: "Glaciar"     },
  { src: "/skorpios/DSC_3290.JPG",     cap: "Botes de expedição rumo ao San Rafael",   tag: "Expedição"   },
  { src: "/skorpios/DSC_1808.JPG",     cap: "Caminhada nas margens do canal",          tag: "Trekking"    },
];

function GaleriaInterativa() {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + GALERIA_CHONOS.length) % GALERIA_CHONOS.length);
  const next = () => setIdx((i) => (i + 1) % GALERIA_CHONOS.length);
  const img = GALERIA_CHONOS[idx];
  return (
    <div className="flex flex-col gap-3">
      {/* Imagem principal com navegação por setas */}
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
        <div className="absolute inset-0"
          style={{ background: `linear-gradient(to top, ${C.selva}cc 0%, transparent 55%)` }} />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className="text-[10px] font-semibold uppercase tracking-[0.32em]"
            style={{ color: C.esm }}>{img.tag}</span>
          <p className="mt-1 text-[14px] font-light" style={{ color: C.creme }}>{img.cap}</p>
        </div>
        <span className="absolute right-4 top-4 text-[11px] font-medium"
          style={{ color: "rgba(212,230,224,0.45)" }}>
          {idx + 1} / {GALERIA_CHONOS.length}
        </span>
        <button onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full text-base font-light transition-all hover:opacity-100"
          style={{ background: "rgba(4,24,14,0.6)", color: C.esm, opacity: 0.8 }}>
          ‹
        </button>
        <button onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full text-base font-light transition-all hover:opacity-100"
          style={{ background: "rgba(4,24,14,0.6)", color: C.esm, opacity: 0.8 }}>
          ›
        </button>
      </div>
      {/* Miniaturas — grid limpo, sem scrollbar */}
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
        {GALERIA_CHONOS.map((g, i) => (
          <button key={i} onClick={() => setIdx(i)}
            className="relative overflow-hidden rounded-lg transition-all duration-300"
            style={{
              aspectRatio: "16/10",
              outline: i === idx ? `2px solid ${C.esm}` : "2px solid transparent",
              outlineOffset: 2,
            }}>
            <img src={g.src} alt={g.cap}
              className="h-full w-full object-cover transition-opacity duration-300"
              style={{ opacity: i === idx ? 1 : 0.42 }} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ChonosPage() {
  return (
    <main className="relative" style={{ background: C.creme }}>
      <Nav />

      {/* BREADCRUMB — pt-20 para não sobrepor Nav fixo */}
      <div
        className="relative z-20 flex items-center gap-2 px-6 pt-20 pb-3 text-[11px] font-medium uppercase tracking-[0.18em] md:px-10"
        style={{ background: C.selva, color: "rgba(212,230,224,0.45)" }}
      >
        <a href="/destinos/cruzeiro-skorpios"
          className="transition-colors hover:text-[#3aab8a]">
          Cruzeiros Skorpios
        </a>
        <span>/</span>
        <span style={{ color: C.esm }}>Ruta Chonos</span>
      </div>

      {/* ===== HERO ===== */}
      <section
        className="relative flex min-h-[100svh] w-full items-center overflow-hidden"
        style={{ background: C.selva }}
      >
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/skorpios/DSC_4317.JPG')", opacity: 0.35 }} />
        <div className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse at 35% 50%, transparent 25%, ${C.selva} 78%)` }} />

        <div className="relative z-10 mx-auto grid w-full max-w-[1400px] items-center gap-10 px-6 py-28 md:grid-cols-[1.1fr_0.9fr] md:px-10">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.2 }}
              className="text-[12px] font-medium uppercase tracking-[0.4em]"
              style={{ color: C.esm }}
            >
              Patagônia Norte · Cruzeiro de Expedição Skorpios
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
              className="mt-5 font-display text-[clamp(2.8rem,7vw,6rem)] font-light uppercase leading-[0.86] tracking-[-0.02em]"
              style={{ color: C.creme }}
            >
              Ruta
              <br />
              Chonos
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.5 }}
              className="mt-6 max-w-md text-[15px] font-light leading-relaxed md:text-base"
              style={{ color: "rgba(212,230,224,0.72)" }}
            >
              Cinco noites pelos arquipélagos que formam o{" "}
              <span style={{ color: C.creme }}>labirinto verde</span> da Patagônia
              Norte. Do folclore de Chiloé ao Glaciar San Rafael, passando por
              vilas que o mapa quase esqueceu.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.65 }}
              className="mt-8 flex flex-wrap items-center gap-5"
            >
              <a href="#contato"
                className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]"
                style={{ background: C.areia, color: C.selva }}>
                Quero esta viagem <span>→</span>
              </a>
              <span className="text-[12px] uppercase tracking-[0.16em]"
                style={{ color: "rgba(212,230,224,0.5)" }}>
                sob consulta
              </span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
            className="mx-auto h-[480px] w-full max-w-[420px] md:h-[560px]"
          >
            <ChonorMap />
          </motion.div>
        </div>
      </section>

      {/* ===== DESTAQUES DA ROTA ===== */}
      <section className="px-6 py-24 md:px-10 md:py-28"
        style={{ background: C.bosco, color: C.creme }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="mb-10 text-[11px] font-semibold uppercase tracking-[0.34em]"
              style={{ color: C.areia }}>
              Por que ir
            </p>
          </Reveal>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {DESTAQUES.map((d, i) => (
              <Reveal key={d.num} delay={i * 0.06}>
                <div className="border-t pt-6" style={{ borderColor: C.line }}>
                  <span className="font-display text-sm" style={{ color: C.esm }}>
                    {d.num}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-light md:text-2xl">
                    {d.t}
                  </h3>
                  <p className="mt-3 text-[14px] font-light leading-relaxed"
                    style={{ color: "rgba(212,230,224,0.6)" }}>
                    {d.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VÍDEO ===== */}
      <section className="px-6 py-16 md:px-10 md:py-20" style={{ background: C.selva }}>
        <div className="mx-auto max-w-[900px]">
          <Reveal>
            <p className="mb-5 text-center text-[11px] font-semibold uppercase tracking-[0.32em]"
              style={{ color: C.esm }}>
              Conheça a rota
            </p>
            <div className="overflow-hidden rounded-2xl"
              style={{ aspectRatio: "16/9", boxShadow: "0 0 60px rgba(58,171,138,0.1)" }}>
              <iframe
                src="https://www.youtube.com/embed/xG3JjYxb_1Q?rel=0&modestbranding=1&color=white"
                title="Ruta Chonos — Cruzeiro Skorpios"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== DESTINOS ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32"
        style={{ background: C.selva, color: C.creme }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.34em]"
              style={{ color: C.esm }}>
              Escalas da rota
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mb-12 max-w-xl font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1]">
              Onde o{" "}
              <span className="italic" style={{ color: C.esm }}>Skorpios II</span>{" "}
              ancora
            </h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {DESTINOS.map((dest, i) => (
              <Reveal key={dest.nome} delay={i * 0.07}>
                <div className="overflow-hidden rounded-xl" style={{ background: C.bosco }}>
                  <div className="relative h-40 overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                      style={{ backgroundImage: `url('${dest.img}')` }} />
                    <div className="absolute inset-0"
                      style={{ background: `linear-gradient(to top, ${C.bosco} 0%, transparent 60%)` }} />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-light">{dest.nome}</h3>
                    <p className="mt-2 text-[13px] font-light leading-relaxed"
                      style={{ color: "rgba(212,230,224,0.58)" }}>
                      {dest.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GALERIA ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: C.bosco }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.32em]"
              style={{ color: C.esm }}>
              Galeria
            </p>
          </Reveal>
          <Reveal delay={0.08}><GaleriaInterativa /></Reveal>
        </div>
      </section>

      {/* ===== ROTEIRO ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32"
        style={{ background: C.canal, color: C.creme }}>
        <div className="mx-auto max-w-[1100px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]"
              style={{ color: C.areia }}>
              O roteiro em essência
            </p>
          </Reveal>
          <p className="mt-4 max-w-lg text-[14px] font-light leading-relaxed"
            style={{ color: "rgba(212,230,224,0.55)" }}>
            Zarpe toda semana aos sábados a partir de Puerto Montt. 6 dias, retorno no próximo sábado.
          </p>
          <div className="mt-12">
            {ROTEIRO.map((r, i) => (
              <Reveal key={r.d} delay={i * 0.05}>
                <div className="flex items-baseline gap-6 border-t py-6 md:gap-10"
                  style={{ borderColor: C.line }}>
                  <span className="font-display text-sm" style={{ color: C.esm }}>{r.d}</span>
                  <div>
                    <h3 className="font-display text-xl font-light md:text-2xl">{r.t}</h3>
                    <p className="mt-1 text-[14px] font-light"
                      style={{ color: "rgba(212,230,224,0.55)" }}>
                      {r.s}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRÓXIMAS SAÍDAS ===== */}
      <section className="px-6 py-24 md:px-10 md:py-28"
        style={{ background: C.selva, color: C.creme }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]"
              style={{ color: C.esm }}>
              Próximas saídas
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,3vw,2.4rem)] font-light">
              Temporada 2026 / 2027
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <Reveal delay={0.08}>
              <div>
                <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em]"
                  style={{ color: C.areia }}>
                  Temporada Baja
                </p>
                <div className="space-y-3">
                  {SAIDAS.baja.map((m) => (
                    <div key={m.mes} className="flex items-center gap-4">
                      <span className="w-24 shrink-0 text-[12px] font-medium"
                        style={{ color: "rgba(212,230,224,0.5)" }}>
                        {m.mes}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {m.dias.map((d) => (
                          <span key={d}
                            className="rounded-lg px-3 py-1 text-[12px] font-medium"
                            style={{ background: C.bosco, color: C.esm }}>
                            {String(d).padStart(2, "0")}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div>
                <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em]"
                  style={{ color: C.areia }}>
                  Temporada Alta
                </p>
                <div className="space-y-3">
                  {SAIDAS.alta.map((m) => (
                    <div key={m.mes} className="flex items-center gap-4">
                      <span className="w-24 shrink-0 text-[12px] font-medium"
                        style={{ color: "rgba(212,230,224,0.5)" }}>
                        {m.mes}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {m.dias.map((d) => (
                          <span key={d}
                            className="rounded-lg px-3 py-1 text-[12px] font-medium"
                            style={{ background: "#1a4a34", color: C.creme }}>
                            {String(d).padStart(2, "0")}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.18}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#contato"
                className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]"
                style={{ background: C.areia, color: C.selva }}>
                Consultar disponibilidade <span>→</span>
              </a>
              <p className="text-[12px] font-light"
                style={{ color: "rgba(212,230,224,0.38)" }}>
                Valores sob consulta · tarifa varia por tipo de cabine
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== O NAVIO ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32"
        style={{ background: C.creme, color: C.selva }}>
        <div className="mx-auto grid max-w-[1280px] items-center gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <div className="relative h-[360px] overflow-hidden rounded-xl md:h-[460px]">
              <div className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/skorpios/DSC_0020.JPG')" }} />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em]"
                style={{ color: C.esmDeep }}>
                Refúgio flutuante
              </p>
              <h2 className="mt-5 font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1]">
                MN Skorpios II
              </h2>
              <p className="mt-6 text-[15px] font-light leading-relaxed"
                style={{ color: "rgba(4,24,14,0.7)" }}>
                Menor e mais ágil que o Skorpios III: 60 hóspedes em cabines
                com janelas panorâmicas. Comprimento de 64 metros e calado
                que permite entrar nos canais mais estreitos do arquipélago.
              </p>
              <p className="mt-4 text-[15px] font-light leading-relaxed"
                style={{ color: "rgba(4,24,14,0.7)" }}>
                Salão-bar, comedor panorâmico e deck exterior. A amplitude não
                está no tamanho do navio, está na imensidão dos canais ao redor.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== TARIFAS ===== */}
      <section className="px-6 py-24 md:px-10 md:py-28"
        style={{ background: C.canal, color: C.creme }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]"
              style={{ color: C.areia }}>
              Tarifas
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,3vw,2.4rem)] font-light">
              Valores por cabine · temporada 2026/2027
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-3 max-w-lg text-[13px] font-light leading-relaxed"
              style={{ color: "rgba(212,230,224,0.5)" }}>
              Preços por pessoa em ocupação dupla. Incluem todas as refeições a bordo, excursões e transfer aeroporto-navio.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 overflow-hidden rounded-xl" style={{ border: `1px solid ${C.line}` }}>
              <div className="grid grid-cols-3 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em]"
                style={{ background: C.selva, color: "rgba(212,230,224,0.45)" }}>
                <span>Tipo de cabine</span>
                <span className="text-center" style={{ color: C.esm }}>Temporada Baja</span>
                <span className="text-center" style={{ color: C.areia }}>Temporada Alta</span>
              </div>
              {[
                { tipo: "Doble Interior", baja: "sob consulta", alta: "sob consulta" },
                { tipo: "Doble Exterior", baja: "sob consulta", alta: "sob consulta" },
                { tipo: "Doble Deluxe",   baja: "sob consulta", alta: "sob consulta" },
                { tipo: "Suite",          baja: "sob consulta", alta: "sob consulta" },
              ].map((row, i) => (
                <div key={row.tipo}
                  className="grid grid-cols-3 items-center border-t px-6 py-5"
                  style={{ borderColor: C.line, background: i % 2 === 0 ? C.canal : C.selva }}>
                  <span className="text-[14px] font-light">{row.tipo}</span>
                  <span className="text-center text-[13px] font-light"
                    style={{ color: C.esm }}>{row.baja}</span>
                  <span className="text-center text-[13px] font-light"
                    style={{ color: C.areia }}>{row.alta}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-7 flex flex-wrap gap-4">
              <a href="#contato"
                className="inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition-transform hover:scale-[1.03]"
                style={{ background: C.areia, color: C.selva }}>
                Solicitar tarifário completo <span>→</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== AONIKIA ===== */}
      <section className="px-6 py-20 md:px-10 md:py-24" style={{ background: C.canal }}>
        <div className="mx-auto max-w-[860px] text-center">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em]"
              style={{ color: C.esm }}>
              AonikIA · especialista neste cruzeiro
            </p>
            <h2 className="mt-5 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-light leading-[1.15]"
              style={{ color: C.creme }}>
              Pergunte tudo sobre a Ruta Chonos
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] font-light leading-relaxed"
              style={{ color: "rgba(212,230,224,0.65)" }}>
              Cabines, como chegar a Puerto Montt, o que incluir na mochila, melhor
              época. A AonikIA conhece esta rota e te conecta com um especialista.
            </p>
            <a href="#contato"
              className="mt-7 inline-flex items-center gap-3 rounded-full border px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition-all duration-300"
              style={{ borderColor: C.esm, color: C.esm }}>
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
