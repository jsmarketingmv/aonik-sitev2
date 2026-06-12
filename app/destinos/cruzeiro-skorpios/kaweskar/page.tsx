"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";
import Contato from "../../../components/Contato";
import FloatingActions from "../../../components/FloatingActions";
import { Reveal, EASE } from "../../../components/ui";

/* ============================================================
   RUTA KAWÉSKAR — MN Skorpios III
   Patagônia Sul · Puerto Natales · 5 dias / 4 noites · 505mn
   ============================================================ */
const P = {
  abyss:   "#072330",
  fjord:   "#0e3a49",
  ice:     "#7fd4e0",
  iceDeep: "#3f93b2",
  white:   "#e9f5f8",
  steppe:  "#cda878",
  paper:   "#e4edef",
  line:    "rgba(127,212,224,0.22)",
};

// ---------- MAPA DOS CANAIS ----------
// Rota sul → norte: Puerto Natales (embaixo) até Fiordo Guillard (topo)
// Animação desenhada de baixo para cima
const STOPS = [
  { x: 238, y: 510, label: "Puerto Natales",            kind: "ship"    },
  { x: 128, y: 420, label: "Fiordo Guardramiro",        kind: "glacier" },
  { x: 142, y: 330, label: "Glaciar Bernal",            kind: "glacier" },
  { x: 258, y: 240, label: "Glaciar Amalia",            kind: "glacier" },
  { x: 118, y: 150, label: "Fiordo Calvo · El Brujo",   kind: "glacier" },
  { x: 152, y: 52,  label: "Fiordo y Glaciar Guillard", kind: "glacier" },
];
const CHANNEL =
  "M238,510 Q155,472 128,420 Q112,378 142,330 Q168,276 258,240 Q312,194 118,150 Q56,98 152,52";
const ISLANDS = [
  { cx: 78,  cy: 80,  rx: 28, ry: 14 },
  { cx: 295, cy: 192, rx: 30, ry: 15 },
  { cx: 72,  cy: 298, rx: 24, ry: 12 },
  { cx: 288, cy: 402, rx: 26, ry: 13 },
];

function ChannelMap() {
  return (
    <svg viewBox="-130 10 580 560" className="h-full w-full">
      {ISLANDS.map((is, i) => (
        <ellipse key={i} cx={is.cx} cy={is.cy} rx={is.rx} ry={is.ry}
          fill={P.fjord} opacity="0.6" />
      ))}
      <motion.path
        d={CHANNEL} fill="none" stroke={P.ice}
        strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1 7"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.4, ease: EASE, delay: 0.4 }}
      />
      {STOPS.map((s) => {
        const anchor = s.x > 200 ? "start" : "end";
        const lx = s.x > 200 ? s.x + 14 : s.x - 14;
        return (
          <g key={s.label}>
            {s.kind === "glacier" && (
              <path d={`M${s.x-6},${s.y+5} L${s.x},${s.y-6} L${s.x+6},${s.y+5} Z`} fill={P.white} />
            )}
            {s.kind !== "glacier" && (
              <circle cx={s.x} cy={s.y} r="5" fill={s.kind === "ship" ? P.steppe : P.ice} />
            )}
            <text x={lx} y={s.y} fill="rgba(233,245,248,0.75)"
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

// ---------- ESCALA DO GELO ----------
function IceScale() {
  const ticks = [
    { y: 24,  t: "100 m" },
    { y: 74,  t: "75 m"  },
    { y: 123, t: "50 m"  },
    { y: 173, t: "25 m"  },
    { y: 222, t: "0"     },
  ];
  return (
    <svg viewBox="0 0 130 250" className="w-full" style={{ maxWidth: 130 }}>
      <line x1="40" y1="24" x2="40" y2="222" stroke={P.ice} strokeWidth="1.5" />
      {ticks.map((tk) => (
        <g key={tk.t}>
          <line x1="34" y1={tk.y} x2="46" y2={tk.y} stroke={P.ice} strokeWidth="1.5" />
          <text x="54" y={tk.y+4} fill={P.white} fontSize="12" letterSpacing="1">{tk.t}</text>
        </g>
      ))}
      <path d="M28,228 L52,228 L48,236 L32,236 Z" fill={P.steppe} />
      <line x1="40" y1="220" x2="40" y2="228" stroke={P.steppe} strokeWidth="1" />
    </svg>
  );
}

const DESTAQUES = [
  { num: "01", t: "Geleiras vivas",        d: "3 frentes de gelo acessadas de bote de expedição a poucos metros de distância." },
  { num: "02", t: "Campo de Gelo Sul",     d: "O maior campo de gelo fora das regiões polares, visível do nível do mar." },
  { num: "03", t: "Skorpios III",          d: "92 hóspedes apenas. Onde navios grandes não entram, a expedição começa." },
  { num: "04", t: "505 milhas náuticas",   d: "5 dias de imersão total. Ida e volta a Puerto Natales pelos canais dos Kawésqar." },
  { num: "05", t: "Botes de expedição",    d: "Desembarques nas frentes das geleiras, onde o navio não pode chegar." },
  { num: "06", t: "Fauna patagônica",      d: "Elefantes-marinhos, golfinhos e aves em estado selvagem nos canais." },
];

const GELEIRAS = [
  { nome: "Amalia",  cor: "#9ee3ec", info: "Desce do Campo de Gelo Sul direto ao mar." },
  { nome: "El Brujo",cor: "#6fc7d8", info: "No Fiordo Calvo, entre témpanos azuis." },
  { nome: "Bernal",  cor: "#4ba6c2", info: "Caminhada até a frente da geleira e suas morenas." },
  { nome: "Guillard",cor: "#3f93b2", info: "Paredes de gelo na entrada dos canais." },
];

const ROTEIRO = [
  { d: "01", t: "Puerto Natales: embarque",   s: "Zarpamos rumo aos canais dos Kawésqar." },
  { d: "02", t: "Fiordo Calvo & El Brujo",    s: "Navegação entre témpanos em botes de expedição." },
  { d: "03", t: "Glaciar Amalia",             s: "Frente a frente com o Campo de Gelo Sul." },
  { d: "04", t: "Bernal & Guardramiro",       s: "Caminhada na geleira e elefantes-marinhos." },
  { d: "05", t: "Retorno a Puerto Natales",   s: "O fim da rota e o começo das histórias." },
];

// Temporada Out 2026 – Abr 2027 · zarpes às sextas/sábados
const SAIDAS = {
  baja: [
    { mes: "Out 2026",  dias: [12, 17, 23, 28] },
    { mes: "Nov 2026",  dias: [3, 8, 14, 19, 25] },
    { mes: "Dez 2026",  dias: [1, 7, 12, 19] },
    { mes: "Fev 2027",  dias: [28] },
    { mes: "Mar 2027",  dias: [5, 10, 15, 20, 25, 31] },
    { mes: "Abr 2027",  dias: [5, 11, 16, 22, 27] },
  ],
  alta: [
    { mes: "Dez 2026",  dias: [24, 30] },
    { mes: "Jan 2027",  dias: [4, 10, 15, 21, 26] },
    { mes: "Fev 2027",  dias: [1, 6, 12, 17, 23] },
  ],
};

const GALERIA = [
  { src: "/skorpios/DSC_3290.JPG", cap: "Botes de expedição entre os témpanos",     tag: "Expedição"   },
  { src: "/skorpios/DSC_1727.JPG", cap: "Desembarque na frente do Glaciar Bernal",  tag: "Desembarque" },
  { src: "/skorpios/DSC_1970.JPG", cap: "A parede de gelo vista do nível do mar",   tag: "Gelo"        },
  { src: "/skorpios/DSC_4495.JPG", cap: "Golfinhos acompanham o MN Skorpios III",   tag: "Fauna"       },
  { src: "/skorpios/DSC_6380.JPG", cap: "Sobre o gelo milenário",                   tag: "Gelo"        },
  { src: "/skorpios/DSC_1808.JPG", cap: "Trekking rumo ao Glaciar Bernal",          tag: "Trekking"    },
  { src: "/skorpios/DSC_2146.JPG", cap: "Whisky on the rocks com gelo do glaciar",  tag: "Experiência" },
  { src: "/skorpios/DSC_4751.JPG", cap: "A Patagônia ao redor de cada gole",        tag: "Experiência" },
];

function GaleriaInterativa() {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + GALERIA.length) % GALERIA.length);
  const next = () => setIdx((i) => (i + 1) % GALERIA.length);
  const img = GALERIA[idx];
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
          style={{ background: `linear-gradient(to top, ${P.abyss}cc 0%, transparent 55%)` }} />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className="text-[10px] font-semibold uppercase tracking-[0.32em]"
            style={{ color: P.ice }}>{img.tag}</span>
          <p className="mt-1 text-[14px] font-light" style={{ color: P.white }}>{img.cap}</p>
        </div>
        <span className="absolute right-4 top-4 text-[11px] font-medium"
          style={{ color: "rgba(233,245,248,0.45)" }}>
          {idx + 1} / {GALERIA.length}
        </span>
        <button onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full text-base font-light transition-all hover:opacity-100"
          style={{ background: "rgba(7,35,48,0.6)", color: P.ice, opacity: 0.8 }}>
          ‹
        </button>
        <button onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full text-base font-light transition-all hover:opacity-100"
          style={{ background: "rgba(7,35,48,0.6)", color: P.ice, opacity: 0.8 }}>
          ›
        </button>
      </div>
      {/* Miniaturas — grid limpo, sem scrollbar */}
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
        {GALERIA.map((g, i) => (
          <button key={i} onClick={() => setIdx(i)}
            className="relative overflow-hidden rounded-lg transition-all duration-300"
            style={{
              aspectRatio: "16/10",
              outline: i === idx ? `2px solid ${P.ice}` : "2px solid transparent",
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

// ---------- DECKS DO NAVIO ----------
const DECKS = [
  { name: "Deck Athos",     sub: "Suítes",                       n: 4,  cor: "#4a9e72", corDim: "rgba(74,158,114,0.16)"  },
  { name: "Deck Olympo",    sub: "Doble Deluxe",                 n: 12, cor: "#c8952d", corDim: "rgba(200,149,45,0.16)"  },
  { name: "Deck Pártenon",  sub: "Doble Exterior",               n: 12, cor: "#c07060", corDim: "rgba(192,112,96,0.16)"  },
  { name: "Deck Acrópolis", sub: "Doble Interior · Restaurante", n: 12, cor: "#3f93b2", corDim: "rgba(63,147,178,0.16)"  },
  { name: "Deck Atenas",    sub: "Doble Interior",               n: 10, cor: "#2a7494", corDim: "rgba(42,116,148,0.16)"  },
];

function ShipProfile({ active }: { active: number | null }) {
  const bands = [
    { x: 230, w: 240, y: 10,  h: 42 },
    { x: 120, w: 460, y: 54,  h: 44 },
    { x: 40,  w: 620, y: 100, h: 44 },
    { x: 18,  w: 664, y: 146, h: 44 },
    { x: 18,  w: 640, y: 192, h: 40 },
  ];
  return (
    <svg viewBox="0 0 700 248" className="w-full" style={{ maxHeight: 180 }}>
      <line x1="0" y1="244" x2="700" y2="244"
        stroke={P.iceDeep} strokeWidth="0.8" strokeDasharray="10 14" opacity="0.25" />
      {bands.map((b, i) => (
        <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} rx="2"
          fill={DECKS[i].cor}
          style={{ opacity: active === null ? 0.28 : active === i ? 0.75 : 0.07, transition: "opacity 0.2s ease" }}
        />
      ))}
      <polyline
        points="230,10 230,54 120,54 120,100 40,100 40,146 18,146 18,232 658,232 658,192 680,192 680,146 682,146 682,100 660,100 660,54 480,54 480,10 230,10"
        fill="none" stroke={P.ice} strokeWidth="1.2" opacity="0.3"
      />
      <path d="M658,232 Q690,232 700,210 L700,180 Q698,146 682,146"
        fill="none" stroke={P.ice} strokeWidth="1.2" opacity="0.3" />
      <path d="M18,232 Q8,232 4,218 L4,200 Q6,192 18,192"
        fill="none" stroke={P.ice} strokeWidth="1.2" opacity="0.3" />
      <rect x="148" y="18" width="22" height="36" rx="3" fill={P.steppe} opacity="0.5" />
      <rect x="150" y="10" width="18" height="10" rx="2" fill={P.steppe} opacity="0.75" />
    </svg>
  );
}

function ShipDecks() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div>
      <div className="mb-8">
        <ShipProfile active={active} />
      </div>
      {DECKS.map((d, i) => (
        <motion.div key={d.name}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: i * 0.07, ease: EASE }}
          onMouseEnter={() => setActive(i)}
          onMouseLeave={() => setActive(null)}
          className="flex cursor-default items-center gap-5 border-b py-5"
          style={{
            borderColor: "rgba(127,212,224,0.1)",
            background: active === i ? d.corDim : "transparent",
            paddingLeft: "0.5rem",
            paddingRight: "0.5rem",
            transition: "background 0.2s ease",
          }}
        >
          <div className="h-9 w-1.5 shrink-0 rounded-full" style={{ background: d.cor }} />
          <div className="min-w-[150px] md:min-w-[190px]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em]"
              style={{ color: active === i ? d.cor : "rgba(233,245,248,0.35)", transition: "color 0.2s" }}>
              {d.name}
            </p>
            <p className="mt-0.5 text-[14px] font-light" style={{ color: P.white }}>{d.sub}</p>
          </div>
          <div className="hidden flex-1 md:flex flex-wrap gap-1.5">
            {Array.from({ length: d.n }).map((_, j) => (
              <div key={j} className="rounded-sm"
                style={{ width: 10, height: 14, background: d.cor, opacity: active === i ? 0.85 : 0.18, transition: "opacity 0.2s" }} />
            ))}
          </div>
          <div className="ml-auto shrink-0 text-right">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: "rgba(233,245,248,0.28)" }}>cabines</p>
            <p className="font-display text-2xl font-light" style={{ color: d.cor }}>{d.n}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function KaweskarPage() {
  return (
    <main className="relative" style={{ background: P.paper }}>
      <Nav />

      {/* ===== HERO ===== */}
      <section
        className="relative flex min-h-[100svh] w-full items-center overflow-hidden"
        style={{ background: P.abyss }}
      >
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/skorpios/DSC_3890.JPG')", opacity: 0.38 }} />
        <div className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse at 35% 50%, transparent 28%, ${P.abyss} 80%)` }} />

        <div className="relative z-10 mx-auto grid w-full max-w-[1400px] items-center gap-10 px-6 py-28 md:grid-cols-[1.1fr_0.9fr] md:px-10">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.2 }}
              className="text-[12px] font-medium uppercase tracking-[0.4em]"
              style={{ color: P.ice }}
            >
              Patagônia · Cruzeiro de Expedição Skorpios
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
              className="mt-5 font-display text-[clamp(2.8rem,7vw,6rem)] font-light uppercase leading-[0.86] tracking-[-0.02em]"
              style={{ color: P.white }}
            >
              Ruta
              <br />
              Kawéskar
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.5 }}
              className="mt-6 max-w-md text-[15px] font-light leading-relaxed md:text-base"
              style={{ color: "rgba(233,245,248,0.72)" }}
            >
              Quatro noites por um labirinto de fiordes onde a estrada acaba e o
              gelo começa. Os mesmos canais que os{" "}
              <span style={{ color: P.white }}>Kawésqar</span> navegaram por
              milênios. Agora a bordo do MN Skorpios III.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.65 }}
              className="mt-8 flex flex-wrap items-center gap-5"
            >
              <a href="#contato"
                className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]"
                style={{ background: P.steppe, color: P.abyss }}>
                Quero esta viagem <span>→</span>
              </a>
              <span>
                <span className="text-[12px] uppercase tracking-[0.16em]"
                  style={{ color: "rgba(233,245,248,0.5)" }}>
                  a partir de
                </span>{" "}
                <span className="font-display text-2xl" style={{ color: "rgba(233,245,248,0.85)" }}>
                  US$ 2.720
                </span>
              </span>
            </motion.div>
            {/* Breadcrumb abaixo do CTA */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.85 }}
              className="mt-6 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em]"
              style={{ color: "rgba(233,245,248,0.32)" }}
            >
              <a href="/destinos/cruzeiro-skorpios"
                className="transition-colors hover:text-[#7fd4e0]">
                Cruzeiros Skorpios
              </a>
              <span>/</span>
              <span style={{ color: P.ice }}>Ruta Kawéskar</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
            className="mx-auto h-[440px] w-full max-w-[420px] md:h-[520px]"
          >
            <ChannelMap />
          </motion.div>
        </div>
      </section>

      {/* ===== DESTAQUES DA ROTA ===== */}
      <section className="px-6 py-24 md:px-10 md:py-28"
        style={{ background: P.fjord, color: P.white }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="mb-10 text-[11px] font-semibold uppercase tracking-[0.34em]"
              style={{ color: P.steppe }}>
              Por que ir
            </p>
          </Reveal>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {DESTAQUES.map((d, i) => (
              <Reveal key={d.num} delay={i * 0.06}>
                <div className="border-t pt-6" style={{ borderColor: P.line }}>
                  <span className="font-display text-sm" style={{ color: P.ice }}>
                    {d.num}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-light md:text-2xl">
                    {d.t}
                  </h3>
                  <p className="mt-3 text-[14px] font-light leading-relaxed"
                    style={{ color: "rgba(233,245,248,0.6)" }}>
                    {d.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VÍDEO + TOUR VIRTUAL ===== */}
      <section className="px-6 py-16 md:px-10 md:py-20" style={{ background: P.abyss }}>
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="grid gap-5 md:grid-cols-2">
              {/* Vídeo */}
              <div>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em]"
                  style={{ color: P.ice }}>
                  Conheça a rota
                </p>
                <div className="overflow-hidden rounded-2xl"
                  style={{ aspectRatio: "16/9", boxShadow: "0 0 40px rgba(127,212,224,0.08)" }}>
                  <iframe
                    src="https://www.youtube.com/embed/8G1BW_0jgaM?rel=0&modestbranding=1&color=white"
                    title="Ruta Kawéskar — Cruzeiro Skorpios"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>
              </div>
              {/* Tour Virtual 360° */}
              <div>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em]"
                  style={{ color: P.ice }}>
                  Tour Virtual 360° · MN Skorpios III
                </p>
                <div className="overflow-hidden rounded-2xl"
                  style={{ aspectRatio: "16/9", boxShadow: "0 0 40px rgba(127,212,224,0.08)" }}>
                  <iframe
                    src="https://my.matterport.com/show/?m=ByrCD3dejGV"
                    title="Tour Virtual MN Skorpios III"
                    allow="xr-spatial-tracking; fullscreen"
                    allowFullScreen
                    className="h-full w-full border-0"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== A ESCALA DO GELO ===== */}
      <section className="relative w-full overflow-hidden" style={{ background: P.fjord }}>
        <div className="grid md:grid-cols-2">
          <div className="relative h-[340px] md:h-[600px]">
            <div className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/skorpios/DSC_1970.JPG')" }} />
            <div className="absolute inset-0"
              style={{ background: `linear-gradient(to right, transparent, ${P.fjord})` }} />
          </div>
          <div className="flex items-center px-6 py-20 md:px-14">
            <div className="flex items-center gap-10">
              <Reveal><IceScale /></Reveal>
              <Reveal delay={0.1}>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.32em]"
                    style={{ color: P.ice }}>
                    A escala do gelo
                  </p>
                  <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.6rem)] font-light leading-[1.05]"
                    style={{ color: P.white }}>
                    Até 100 metros
                    <br />de parede viva
                  </h2>
                  <p className="mt-5 max-w-sm text-[15px] font-light leading-relaxed"
                    style={{ color: "rgba(233,245,248,0.7)" }}>
                    Você, num bote de expedição, minúsculo diante de uma muralha de
                    gelo que rangeu por séculos. É aqui que a Patagônia te lembra
                    do seu tamanho.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== AS GELEIRAS ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32"
        style={{ background: P.abyss, color: P.white }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <h2 className="max-w-2xl font-display text-[clamp(1.9rem,4vw,3.2rem)] font-light leading-[1.08]">
              As geleiras têm{" "}
              <span className="italic" style={{ color: P.ice }}>cor</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-lg text-[15px] font-light leading-relaxed"
              style={{ color: "rgba(233,245,248,0.6)" }}>
              Quanto mais antigo e comprimido, mais azul. Cada geleira da rota tem
              o seu tom, do turquesa leitoso ao azul profundo.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-xl"
            style={{ background: P.line }}>
            {GELEIRAS.map((g, i) => (
              <Reveal key={g.nome} delay={i * 0.05}>
                <div className="flex items-center gap-6 px-6 py-7 md:px-8"
                  style={{ background: P.abyss }}>
                  <span className="h-12 w-12 shrink-0 rounded-full" style={{ background: g.cor }} />
                  <h3 className="font-display text-2xl font-light md:text-3xl"
                    style={{ minWidth: 160 }}>
                    Glaciar {g.nome}
                  </h3>
                  <p className="text-[14px] font-light"
                    style={{ color: "rgba(233,245,248,0.6)" }}>
                    {g.info}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== OS KAWÉSQAR ===== */}
      <section className="relative w-full overflow-hidden" style={{ background: P.abyss }}>
        <div className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url('/skorpios/DSC_6897.JPG')" }} />
        <div className="absolute inset-0" style={{ background: `${P.abyss}cc` }} />
        <div className="relative z-10 mx-auto max-w-[900px] px-6 py-28 text-center md:py-40">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em]"
              style={{ color: P.steppe }}>
              O povo dos canais
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 font-display text-[clamp(1.8rem,4vw,3.3rem)] font-light leading-[1.2]"
              style={{ color: P.white }}>
              Por milênios, os{" "}
              <span className="italic" style={{ color: P.ice }}>Kawésqar</span>{" "}
              percorreram esses canais em canoas, com uma fogueira acesa no meio do
              barco, entre Puerto Edén e Puerto Natales. Você refaz essa rota com
              o conforto de hoje e o mesmo silêncio de sempre.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== GALERIA ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: P.fjord }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.32em]"
              style={{ color: P.ice }}>
              Galeria
            </p>
          </Reveal>
          <Reveal delay={0.08}><GaleriaInterativa /></Reveal>
        </div>
      </section>

      {/* ===== O NAVIO ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32"
        style={{ background: P.paper, color: P.abyss }}>
        <div className="mx-auto max-w-[1280px]">

          {/* Grid de fotos: navio grande + 2 cabines */}
          <Reveal>
            <div className="grid grid-cols-3 gap-3 md:gap-4"
              style={{ height: "clamp(260px, 36vw, 500px)" }}>
              {/* Exterior do navio — 2 colunas */}
              <div className="col-span-2 relative overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('/skorpios/DSC_4317.JPG')" }} />
                <div className="absolute bottom-0 left-0 right-0 h-20"
                  style={{ background: `linear-gradient(to top, ${P.abyss}88, transparent)` }} />
                <span className="absolute bottom-4 left-5 text-[10px] font-semibold uppercase tracking-[0.24em]"
                  style={{ color: "rgba(233,245,248,0.6)" }}>MN Skorpios III</span>
              </div>
              {/* Coluna direita: 2 cabines */}
              <div className="flex flex-col gap-3 md:gap-4">
                <div className="flex-1 relative overflow-hidden rounded-2xl"
                  style={{ background: P.fjord }}>
                  <div className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/skorpios/cabin-twin.jpg')" }} />
                  <div className="absolute inset-0 flex items-end p-3"
                    style={{ background: "rgba(7,35,48,0.5)" }}>
                    <span className="text-[9px] font-semibold uppercase tracking-[0.2em]"
                      style={{ color: P.ice }}>Doble Exterior</span>
                  </div>
                </div>
                <div className="flex-1 relative overflow-hidden rounded-2xl"
                  style={{ background: P.fjord }}>
                  <div className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/skorpios/cabin-deluxe.jpg')" }} />
                  <div className="absolute inset-0 flex items-end p-3"
                    style={{ background: "rgba(7,35,48,0.5)" }}>
                    <span className="text-[9px] font-semibold uppercase tracking-[0.2em]"
                      style={{ color: P.steppe }}>Doble Deluxe</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Texto */}
          <div className="mt-14 grid gap-8 md:grid-cols-2 md:gap-16">
            <Reveal>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.32em]"
                  style={{ color: P.iceDeep }}>Refúgio flutuante</p>
                <h2 className="mt-5 font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1]">
                  MN Skorpios III
                </h2>
                <p className="mt-6 text-[15px] font-light leading-relaxed"
                  style={{ color: "rgba(7,35,48,0.7)" }}>
                  70 metros, 5 decks, até 92 hóspedes em 46 cabines. Remodelado em
                  2025 com a alma de uma expedição e o conforto de um refúgio boutique.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <p className="text-[15px] font-light leading-relaxed"
                  style={{ color: "rgba(7,35,48,0.7)" }}>
                  Cada cabine tem banho privativo, Smart TV, música ambiente e janelas
                  abertas para os canais patagônicos. As categorias vão do Doble
                  Interior, íntimo e aconchegante no Deck Atenas, até as Suítes do
                  Deck Athos com área de estar e vistas panorâmicas para o gelo.
                </p>
                <p className="mt-4 text-[15px] font-light leading-relaxed"
                  style={{ color: "rgba(7,35,48,0.7)" }}>
                  A bordo: comedor panorâmico no Deck Acrópolis, dois lounges-bar e
                  passagem livre entre os cinco decks para contemplar a Patagônia
                  sem intermediários.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== ANATOMIA DO NAVIO ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32"
        style={{ background: P.abyss, color: P.white }}>
        <div className="mx-auto max-w-[1100px]">
          <div className="grid items-start gap-12 md:grid-cols-[1fr_1.5fr] md:gap-20">
            <Reveal>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.32em]"
                  style={{ color: P.steppe }}>Motonave Skorpios III</p>
                <h2 className="mt-5 font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1]">
                  Cinco decks.<br />46 cabines.
                </h2>
                <p className="mt-6 text-[15px] font-light leading-relaxed"
                  style={{ color: "rgba(233,245,248,0.62)" }}>
                  Construída no Chile com certificação IMO 9143908. Cada deck tem
                  uma identidade: das Suítes panorâmicas do Athos aos Dobres
                  Interiores do Atenas, tudo pensado para dormir com a Patagônia
                  passando pela janela.
                </p>
                <p className="mt-5 text-[12px] italic"
                  style={{ color: "rgba(233,245,248,0.3)" }}>
                  Passe o cursor sobre cada deck para explorar.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <ShipDecks />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== ROTEIRO ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32"
        style={{ background: P.fjord, color: P.white }}>
        <div className="mx-auto max-w-[1100px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]"
              style={{ color: P.steppe }}>
              O roteiro em essência
            </p>
          </Reveal>
          <p className="mt-4 max-w-lg text-[14px] font-light leading-relaxed"
            style={{ color: "rgba(233,245,248,0.55)" }}>
            Ida e volta a Puerto Natales em 5 dias. Zarpe às sextas ou sábados conforme o calendário.
          </p>
          <div className="mt-12">
            {ROTEIRO.map((r, i) => (
              <Reveal key={r.d} delay={i * 0.05}>
                <div className="flex items-baseline gap-6 border-t py-6 md:gap-10"
                  style={{ borderColor: P.line }}>
                  <span className="font-display text-sm" style={{ color: P.ice }}>{r.d}</span>
                  <div>
                    <h3 className="font-display text-xl font-light md:text-2xl">{r.t}</h3>
                    <p className="mt-1 text-[14px] font-light"
                      style={{ color: "rgba(233,245,248,0.55)" }}>
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
        style={{ background: P.abyss, color: P.white }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]"
              style={{ color: P.ice }}>
              Próximas saídas
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,3vw,2.4rem)] font-light">
              Temporada 2026 / 2027
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            {/* Temporada Baja */}
            <Reveal delay={0.08}>
              <div>
                <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em]"
                  style={{ color: P.steppe }}>
                  Temporada Baja
                </p>
                <div className="space-y-3">
                  {SAIDAS.baja.map((m) => (
                    <div key={m.mes} className="flex items-center gap-4">
                      <span className="w-24 shrink-0 text-[12px] font-medium"
                        style={{ color: "rgba(233,245,248,0.5)" }}>
                        {m.mes}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {m.dias.map((d) => (
                          <span key={d}
                            className="rounded-lg px-3 py-1 text-[12px] font-medium"
                            style={{ background: P.fjord, color: P.ice }}>
                            {String(d).padStart(2, "0")}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            {/* Temporada Alta */}
            <Reveal delay={0.12}>
              <div>
                <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em]"
                  style={{ color: P.steppe }}>
                  Temporada Alta
                </p>
                <div className="space-y-3">
                  {SAIDAS.alta.map((m) => (
                    <div key={m.mes} className="flex items-center gap-4">
                      <span className="w-24 shrink-0 text-[12px] font-medium"
                        style={{ color: "rgba(233,245,248,0.5)" }}>
                        {m.mes}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {m.dias.map((d) => (
                          <span key={d}
                            className="rounded-lg px-3 py-1 text-[12px] font-medium"
                            style={{ background: "#1a4a5e", color: P.white }}>
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
                style={{ background: P.steppe, color: P.abyss }}>
                Consultar disponibilidade <span>→</span>
              </a>
              <p className="text-[12px] font-light"
                style={{ color: "rgba(233,245,248,0.38)" }}>
                Valores variam por tipo de cabine · a partir de US$ 2.720 p.p.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== TARIFAS ===== */}
      <section className="px-6 py-24 md:px-10 md:py-28"
        style={{ background: P.fjord, color: P.white }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]"
              style={{ color: P.steppe }}>
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
              style={{ color: "rgba(233,245,248,0.5)" }}>
              Preços por pessoa em ocupação dupla. Incluem todas as refeições a bordo, excursões e transfer aeroporto-navio.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 overflow-hidden rounded-xl" style={{ border: `1px solid ${P.line}` }}>
              {/* Cabeçalho */}
              <div className="grid grid-cols-3 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em]"
                style={{ background: P.abyss, color: "rgba(233,245,248,0.45)" }}>
                <span>Tipo de cabine</span>
                <span className="text-center" style={{ color: P.ice }}>Temporada Baja</span>
                <span className="text-center" style={{ color: "#c4a87a" }}>Temporada Alta</span>
              </div>
              {[
                { tipo: "Doble Interior",  baja: "US$ 2.720",  alta: "US$ 3.360" },
                { tipo: "Doble Exterior",  baja: "US$ 3.360",  alta: "US$ 4.160" },
                { tipo: "Doble Deluxe",    baja: "US$ 4.160",  alta: "US$ 5.040" },
                { tipo: "Suite",           baja: "US$ 5.520",  alta: "US$ 6.720" },
              ].map((row, i) => (
                <div key={row.tipo}
                  className="grid grid-cols-3 items-center border-t px-6 py-5"
                  style={{ borderColor: P.line, background: i % 2 === 0 ? P.fjord : P.abyss }}>
                  <span className="text-[14px] font-light">{row.tipo}</span>
                  <span className="text-center font-display text-lg font-light"
                    style={{ color: P.ice }}>{row.baja}</span>
                  <span className="text-center font-display text-lg font-light"
                    style={{ color: P.steppe }}>{row.alta}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-5 text-[12px] font-light"
              style={{ color: "rgba(233,245,248,0.35)" }}>
              Valores em USD por pessoa. Consulte disponibilidade e tarifas para cabine single.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== AONIKIA ===== */}
      <section className="px-6 py-20 md:px-10 md:py-24" style={{ background: P.fjord }}>
        <div className="mx-auto max-w-[860px] text-center">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em]"
              style={{ color: P.ice }}>
              AonikIA · especialista neste cruzeiro
            </p>
            <h2 className="mt-5 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-light leading-[1.15]"
              style={{ color: P.white }}>
              Pergunte tudo sobre a Ruta Kawéskar
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] font-light leading-relaxed"
              style={{ color: "rgba(233,245,248,0.65)" }}>
              Cabines, melhor época, como chegar a Puerto Natales, o que está
              incluído. A AonikIA conhece este cruzeiro e te conecta com um
              especialista.
            </p>
            <a href="#contato"
              className="mt-7 inline-flex items-center gap-3 rounded-full border px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition-all duration-300"
              style={{ borderColor: P.ice, color: P.ice }}>
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
