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
   Puerto Montt → Chiloé → Puerto Aguirre → Quitralco → San Rafael
   ============================================================ */
const C = {
  selva:    "#04180e",  // verde floresta profunda (bg hero/roteiro)
  bosco:    "#0c2c1a",  // bg principal
  canal:    "#10392A",  // bg seções secundárias
  esm:      "#3aab8a",  // esmeralda — COR-ASSINATURA
  esmDeep:  "#1a7a62",  // esmeralda escura
  areia:    "#c9a87a",  // areia dos arquipélagos (CTA quente)
  neblina:  "#d4e6e0",  // branco-esverdeado
  creme:    "#e8f0ec",
  line:     "rgba(58,171,138,0.2)",
};

// ---------- MAPA DOS ARQUIPÉLAGOS (rota norte-sul) ----------
const CHONOS_STOPS = [
  { x: 210, y: 48,  label: "Puerto Montt",              kind: "ship"    },
  { x: 130, y: 145, label: "Quemchi · Dalcahue",        kind: "vila"    },
  { x: 95,  y: 245, label: "Puerto Aguirre",             kind: "vila"    },
  { x: 65,  y: 335, label: "Islotes Conejos",            kind: "fauna"   },
  { x: 185, y: 415, label: "Fiordo Quitralco",           kind: "termas"  },
  { x: 260, y: 508, label: "Glaciar San Rafael",         kind: "glacier" },
];
const CHONOS_PATH =
  "M210,48 Q120,90 130,145 Q140,195 95,245 Q70,290 65,335 Q55,375 185,415 Q280,450 260,508";

// ilhas espalhadas (arquipélago de Chiloé)
const CHONOS_ISLANDS = [
  { cx: 290, cy: 80,  rx: 32, ry: 16 },
  { cx: 55,  cy: 140, rx: 24, ry: 12 },
  { cx: 290, cy: 210, rx: 28, ry: 13 },
  { cx: 155, cy: 290, rx: 20, ry: 10 },
  { cx: 290, cy: 340, rx: 22, ry: 11 },
  { cx: 50,  cy: 440, rx: 18, ry:  9 },
  { cx: 300, cy: 460, rx: 26, ry: 12 },
];

function ChonorMap() {
  return (
    <svg viewBox="-30 20 420 540" className="h-full w-full">
      {/* ilhas do arquipélago */}
      {CHONOS_ISLANDS.map((is, i) => (
        <ellipse key={i} cx={is.cx} cy={is.cy} rx={is.rx} ry={is.ry}
          fill={C.canal} opacity="0.65" />
      ))}
      {/* geleira no final */}
      <path
        d="M235,488 L260,462 L285,488 L278,508 L242,508 Z"
        fill={C.esm} opacity="0.7"
      />
      {/* rota */}
      <motion.path
        d={CHONOS_PATH} fill="none" stroke={C.esm}
        strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1 7"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.6, ease: EASE, delay: 0.4 }}
      />
      {/* paradas */}
      {CHONOS_STOPS.map((s) => {
        const anchor = s.x > 170 ? "start" : "end";
        const lx = s.x > 170 ? s.x + 14 : s.x - 14;
        return (
          <g key={s.label}>
            {s.kind === "glacier" && (
              <path
                d={`M${s.x - 7},${s.y + 5} L${s.x},${s.y - 8} L${s.x + 7},${s.y + 5} Z`}
                fill={C.neblina}
              />
            )}
            {s.kind === "ship" && (
              <circle cx={s.x} cy={s.y} r="5.5" fill={C.areia} />
            )}
            {s.kind === "fauna" && (
              <circle cx={s.x} cy={s.y} r="4" fill={C.esm} />
            )}
            {s.kind === "vila" && (
              <rect x={s.x - 4} y={s.y - 4} width="8" height="8"
                fill={C.esm} opacity="0.85" />
            )}
            {s.kind === "termas" && (
              <circle cx={s.x} cy={s.y} r="4.5"
                fill="none" stroke={C.esm} strokeWidth="1.8" />
            )}
            <text x={lx} y={s.y} fill="rgba(212,230,224,0.75)"
              fontSize="11.5" letterSpacing="1.2" textAnchor={anchor}
              dominantBaseline="middle"
              style={{ textTransform: "uppercase" }}>
              {s.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

const DESTINOS = [
  {
    titulo: "Arquipélago de Chiloé",
    sub:    "Quemchi · Dalcahue",
    cor:    "#4ab896",
    info:   "Palafitas, igrejas de madeira e a mitologia chilota. O ponto de partida para os canais do sul.",
  },
  {
    titulo: "Puerto Aguirre",
    sub:    "Vila de pescadores",
    cor:    "#3aab8a",
    info:   "Uma das comunidades mais isoladas do planeta. A vida real dos canais patagônicos.",
  },
  {
    titulo: "Islotes Conejos",
    sub:    "Fauna selvagem",
    cor:    "#2a9070",
    info:   "Leões-marinhos, golfinhos e aves marinhas em ilhotas intocadas. O zodiac leva você até perto.",
  },
  {
    titulo: "Fiordo Quitralco",
    sub:    "Termas naturais",
    cor:    "#1a7a62",
    info:   "Piscinas termais de origem vulcânica em plena floresta valdiviana. A natureza aquecida por baixo.",
  },
];

const ROTEIRO = [
  { d: "01", t: "Puerto Montt: embarque",          s: "Zarpamos rumo aos arquipélagos de Chiloé." },
  { d: "02", t: "Quemchi & Dalcahue",              s: "Palafitas, igrejas UNESCO e o charme da ilha." },
  { d: "03", t: "Puerto Aguirre",                  s: "Vila de pescadores e a vida isolada dos canais." },
  { d: "04", t: "Islotes Conejos & Barrientos",    s: "Fauna marinha em ilhotas selvagens. Zodiac." },
  { d: "05", t: "Fiordo Quitralco",                s: "Termas naturais em plena floresta valdiviana." },
  { d: "06", t: "Glaciar San Rafael & retorno",    s: "A fronteira do gelo. Regresso a Puerto Montt." },
];

// Temporada 2026-2027 — confirmar datas com PDF da operadora
const SAIDAS_2026 = [
  { data: "Out 2026",  status: "confirmar" },
  { data: "Nov 2026",  status: "confirmar" },
  { data: "Dez 2026",  status: "confirmar" },
  { data: "Jan 2027",  status: "confirmar" },
  { data: "Fev 2027",  status: "confirmar" },
  { data: "Mar 2027",  status: "confirmar" },
];

const GALERIA_CHONOS = [
  { src: "/skorpios/DSC_0020.JPG",      cap: "O MN Skorpios entre os témpanos",      tag: "Navio"       },
  { src: "/skorpios/DSC_3352.JPG",      cap: "Desembarque na frente da geleira",      tag: "Desembarque" },
  { src: "/skorpios/DSC_2946.JPG",      cap: "A expedição às margens do gelo",        tag: "Expedição"   },
  { src: "/skorpios/DSC_1673.JPG",      cap: "Trekking rumo ao Glaciar San Rafael",   tag: "Trekking"    },
  { src: "/skorpios/DSC_pequenez.jpg",  cap: "Nossa pequenez diante da natureza",     tag: "Perspectiva" },
  { src: "/skorpios/DSC_6380.JPG",      cap: "Entre blocos de gelo milenários",       tag: "Gelo"        },
  { src: "/skorpios/DSC_4751.JPG",      cap: "A Patagônia ao redor de cada gole",     tag: "Experiência" },
  { src: "/skorpios/DSC_6897.JPG",      cap: "Observando os canais ao amanhecer",     tag: "Navegação"   },
];

function GaleriaInterativa() {
  const [idx, setIdx] = useState(0);
  const img = GALERIA_CHONOS[idx];
  return (
    <div className="grid gap-3 md:grid-cols-[1fr_190px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0.5, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="relative overflow-hidden rounded-2xl"
          style={{ aspectRatio: "16/10" }}
        >
          <img src={img.src} alt={img.cap}
            className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0"
            style={{ background: `linear-gradient(to top, ${C.selva}cc 0%, transparent 55%)` }} />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em]"
              style={{ color: C.esm }}>
              {img.tag}
            </span>
            <p className="mt-1 text-[14px] font-light" style={{ color: C.creme }}>
              {img.cap}
            </p>
          </div>
          <div className="absolute right-4 top-4">
            <span className="text-[11px] font-medium"
              style={{ color: "rgba(212,230,224,0.5)" }}>
              {idx + 1}/{GALERIA_CHONOS.length}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
        {GALERIA_CHONOS.map((g, i) => (
          <button key={i} onClick={() => setIdx(i)}
            className="relative shrink-0 overflow-hidden rounded-xl transition-all duration-300"
            style={{
              width: 190, height: 108,
              opacity: i === idx ? 1 : 0.42,
              outline: i === idx ? `2px solid ${C.esm}` : "2px solid transparent",
              outlineOffset: 2,
            }}>
            <img src={g.src} alt={g.cap} className="h-full w-full object-cover" />
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

      {/* BREADCRUMB */}
      <div
        className="relative z-20 flex items-center gap-2 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.18em] md:px-10"
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
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/skorpios/DSC_4317.JPG')",
            opacity: 0.35,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 35% 50%, transparent 25%, ${C.selva} 78%)`,
          }}
        />

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
              style={{ color: C.neblina }}
            >
              Ruta
              <br />
              Chonos
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.5 }}
              className="mt-6 max-w-md text-[15px] font-light leading-relaxed md:text-base"
              style={{ color: "rgba(212,230,224,0.7)" }}
            >
              Cinco noites pelos arquipélagos que os{" "}
              <span style={{ color: C.neblina }}>Chonos</span> percorreram em
              canoas. Da Ilha de Chiloé ao Glaciar San Rafael, 800 milhas de
              canais, florestas e silêncio patagônico, a bordo do MN Skorpios II.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.65 }}
              className="mt-8 flex flex-wrap items-center gap-5"
            >
              <a
                href="#contato"
                className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]"
                style={{ background: C.areia, color: C.selva }}
              >
                Quero esta viagem <span>→</span>
              </a>
              <span style={{ color: "rgba(212,230,224,0.75)" }}>
                <span className="text-[12px] uppercase tracking-[0.16em]"
                  style={{ color: "rgba(212,230,224,0.45)" }}>
                  preço
                </span>{" "}
                <span className="font-display text-xl">sob consulta</span>
              </span>
            </motion.div>
          </div>

          {/* MAPA DOS ARQUIPÉLAGOS */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
            className="mx-auto h-[460px] w-full max-w-[420px] md:h-[540px]"
          >
            <ChonorMap />
          </motion.div>
        </div>
      </section>

      {/* ===== OS DESTINOS ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32"
        style={{ background: C.bosco, color: C.neblina }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <h2 className="max-w-2xl font-display text-[clamp(1.9rem,4vw,3.2rem)] font-light leading-[1.08]">
              Os destinos têm{" "}
              <span className="italic" style={{ color: C.esm }}>
                personalidade própria
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-lg text-[15px] font-light leading-relaxed"
              style={{ color: "rgba(212,230,224,0.55)" }}>
              Da vivacidade das vilas de Chiloé ao silêncio absoluto do San
              Rafael. Cada parada é um mundo diferente.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-xl"
            style={{ background: C.line }}>
            {DESTINOS.map((d, i) => (
              <Reveal key={d.titulo} delay={i * 0.05}>
                <div className="flex items-center gap-6 px-6 py-7 md:px-8"
                  style={{ background: C.bosco }}>
                  <span className="h-12 w-12 shrink-0 rounded-full"
                    style={{ background: d.cor }} />
                  <div style={{ minWidth: 200 }}>
                    <h3 className="font-display text-xl font-light md:text-2xl">
                      {d.titulo}
                    </h3>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] mt-0.5"
                      style={{ color: C.esm }}>
                      {d.sub}
                    </p>
                  </div>
                  <p className="text-[14px] font-light"
                    style={{ color: "rgba(212,230,224,0.6)" }}>
                    {d.info}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== OS CHONOS (cultura) ===== */}
      <section className="relative w-full overflow-hidden" style={{ background: C.selva }}>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-22"
          style={{ backgroundImage: "url('/skorpios/DSC_3352.JPG')" }}
        />
        <div className="absolute inset-0" style={{ background: `${C.selva}d0` }} />
        <div className="relative z-10 mx-auto max-w-[900px] px-6 py-28 text-center md:py-40">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em]"
              style={{ color: C.areia }}>
              O povo dos arquipélagos
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p
              className="mt-7 font-display text-[clamp(1.8rem,4vw,3.3rem)] font-light leading-[1.2]"
              style={{ color: C.neblina }}
            >
              Os{" "}
              <span className="italic" style={{ color: C.esm }}>
                Chonos
              </span>{" "}
              habitaram esses arquipélagos por milhares de anos, navegando em
              dalcas entre as ilhas. Você percorre os mesmos canais entre
              florestas temperadas, aves raras e o silêncio que só a Patagônia
              Norte conhece.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== GALERIA ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32"
        style={{ background: C.canal }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.32em]"
              style={{ color: C.esm }}>
              Galeria
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <GaleriaInterativa />
          </Reveal>
        </div>
      </section>

      {/* ===== O NAVIO ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32"
        style={{ background: C.creme, color: C.selva }}>
        <div className="mx-auto grid max-w-[1280px] items-center gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <div className="relative h-[360px] overflow-hidden rounded-xl md:h-[460px]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/skorpios/DSC_0020.JPG')" }}
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em]"
                style={{ color: C.esmDeep }}>
                O navio da rota Chonos
              </p>
              <h2 className="mt-5 font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1]">
                MN Skorpios II
              </h2>
              <p className="mt-6 text-[15px] font-light leading-relaxed"
                style={{ color: "rgba(4,24,14,0.7)" }}>
                O navio histórico da operadora, companheiro fiel dos canais
                patagônicos desde os anos 1980. Menor e mais íntimo que o
                Skorpios III, com capacidade para grupos reduzidos e acesso
                privilegiado às enseadas rasas do arquipélago.
              </p>
              <p className="mt-4 text-[15px] font-light leading-relaxed"
                style={{ color: "rgba(4,24,14,0.7)" }}>
                A bordo: cabines com janelas panorâmicas, salão-bar com vista
                para os canais e refeições com produtos frescos da região.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== ROTEIRO ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32"
        style={{ background: C.bosco, color: C.neblina }}>
        <div className="mx-auto max-w-[1100px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]"
              style={{ color: C.areia }}>
              O roteiro em essência
            </p>
          </Reveal>
          <p className="mt-4 max-w-lg text-[14px] font-light leading-relaxed"
            style={{ color: "rgba(212,230,224,0.55)" }}>
            Ida e volta a Puerto Montt em 6 dias. O roteiro detalhado
            a gente fecha com você.
          </p>
          <div className="mt-12">
            {ROTEIRO.map((r, i) => (
              <Reveal key={r.d} delay={i * 0.05}>
                <div className="flex items-baseline gap-6 border-t py-6 md:gap-10"
                  style={{ borderColor: C.line }}>
                  <span className="font-display text-sm" style={{ color: C.esm }}>
                    {r.d}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-light md:text-2xl">
                      {r.t}
                    </h3>
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
        style={{ background: C.selva, color: C.neblina }}>
        <div className="mx-auto max-w-[1100px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]"
              style={{ color: C.esm }}>
              Próximas saídas
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,3vw,2.4rem)] font-light">
              Temporada 2026 / 2027
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-3 max-w-sm text-[14px] font-light leading-relaxed"
              style={{ color: "rgba(212,230,224,0.5)" }}>
              Datas confirmadas com a operadora. Consulte disponibilidade
              e valores por cabine.
            </p>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
            {SAIDAS_2026.map((s, i) => (
              <Reveal key={s.data} delay={i * 0.04}>
                <div
                  className="rounded-xl px-4 py-5 text-center"
                  style={{ background: C.canal, border: `1px solid ${C.line}` }}
                >
                  <p className="font-display text-lg font-light" style={{ color: C.neblina }}>
                    {s.data}
                  </p>
                  <a
                    href="#contato"
                    className="mt-2 block text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors"
                    style={{ color: C.esm }}
                  >
                    Consultar →
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="mt-5 text-[12px] font-light"
              style={{ color: "rgba(212,230,224,0.35)" }}>
              * Datas indicativas. Confirme disponibilidade com nosso especialista.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== AONIKIA ===== */}
      <section className="px-6 py-20 md:px-10 md:py-24"
        style={{ background: C.bosco }}>
        <div className="mx-auto max-w-[860px] text-center">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em]"
              style={{ color: C.esm }}>
              AonikIA · especialista neste cruzeiro
            </p>
            <h2
              className="mt-5 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-light leading-[1.15]"
              style={{ color: C.neblina }}
            >
              Pergunte tudo sobre a Ruta Chonos
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] font-light leading-relaxed"
              style={{ color: "rgba(212,230,224,0.62)" }}>
              Cabines, melhor época, como chegar a Puerto Montt, o que está
              incluído. A AonikIA conhece este cruzeiro e te conecta com um
              especialista.
            </p>
            <a
              href="#contato"
              className="mt-7 inline-flex items-center gap-3 rounded-full border px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition-all duration-300"
              style={{ borderColor: C.esm, color: C.esm }}
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
