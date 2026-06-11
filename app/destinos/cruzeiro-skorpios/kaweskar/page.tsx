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
const STOPS = [
  { x: 215, y: 55,  label: "Puerto Natales",       kind: "ship"    },
  { x: 110, y: 175, label: "Fiordo Calvo · El Brujo", kind: "glacier" },
  { x: 255, y: 285, label: "Glaciar Amalia",        kind: "glacier" },
  { x: 120, y: 390, label: "Glaciar Bernal",        kind: "glacier" },
  { x: 230, y: 495, label: "Guardramiro",           kind: "fauna"   },
];
const CHANNEL =
  "M215,55 Q70,120 110,175 Q150,235 255,285 Q335,335 120,390 Q-10,450 230,495";
const ISLANDS = [
  { cx: 70,  cy: 90,  rx: 26, ry: 14 },
  { cx: 300, cy: 200, rx: 30, ry: 16 },
  { cx: 60,  cy: 300, rx: 22, ry: 12 },
  { cx: 300, cy: 430, rx: 28, ry: 15 },
];

function ChannelMap() {
  return (
    <svg viewBox="-30 20 420 520" className="h-full w-full">
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
              <path
                d={`M${s.x - 6},${s.y + 5} L${s.x},${s.y - 6} L${s.x + 6},${s.y + 5} Z`}
                fill={P.white}
              />
            )}
            {s.kind !== "glacier" && (
              <circle cx={s.x} cy={s.y} r="5"
                fill={s.kind === "ship" ? P.steppe : P.ice} />
            )}
            <text x={lx} y={s.y} fill="rgba(233,245,248,0.75)"
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

// ---------- ESCALA DO GELO ----------
function IceScale() {
  const ticks = [
    { y: 24,  t: "60 m" },
    { y: 90,  t: "40 m" },
    { y: 156, t: "20 m" },
    { y: 222, t: "0"    },
  ];
  return (
    <svg viewBox="0 0 130 250" className="w-full" style={{ maxWidth: 130 }}>
      <line x1="40" y1="24" x2="40" y2="222" stroke={P.ice} strokeWidth="1.5" />
      {ticks.map((tk) => (
        <g key={tk.t}>
          <line x1="34" y1={tk.y} x2="46" y2={tk.y} stroke={P.ice} strokeWidth="1.5" />
          <text x="54" y={tk.y + 4} fill={P.white} fontSize="12" letterSpacing="1">
            {tk.t}
          </text>
        </g>
      ))}
      <path d="M28,228 L52,228 L48,236 L32,236 Z" fill={P.steppe} />
      <line x1="40" y1="220" x2="40" y2="228" stroke={P.steppe} strokeWidth="1" />
    </svg>
  );
}

const GELEIRAS = [
  { nome: "Amalia",  cor: "#9ee3ec", info: "Desce do Campo de Gelo Sul direto ao mar." },
  { nome: "El Brujo",cor: "#6fc7d8", info: "No Fiordo Calvo, entre témpanos azuis." },
  { nome: "Bernal",  cor: "#4ba6c2", info: "Caminhada até a frente da geleira e suas morenas." },
  { nome: "Guillard",cor: "#3f93b2", info: "Paredes de gelo na entrada dos canais." },
];

const ROTEIRO = [
  { d: "01", t: "Puerto Natales: embarque",  s: "Zarpamos rumo aos canais dos Kawésqar." },
  { d: "02", t: "Fiordo Calvo & El Brujo",   s: "Navegação entre témpanos em botes de expedição." },
  { d: "03", t: "Glaciar Amalia",            s: "Frente a frente com o Campo de Gelo Sul." },
  { d: "04", t: "Bernal & Guardramiro",      s: "Caminhada na geleira e elefantes-marinhos." },
  { d: "05", t: "Retorno a Puerto Natales",  s: "O fim da rota e o começo das histórias." },
];

const GALERIA = [
  { src: "/skorpios/DSC_3290.JPG", cap: "Botes de expedição entre os témpanos",      tag: "Expedição"   },
  { src: "/skorpios/DSC_1727.JPG", cap: "Desembarque na frente do glaciar Bernal",   tag: "Desembarque" },
  { src: "/skorpios/DSC_1970.JPG", cap: "A parede de gelo vista do nível do mar",    tag: "Gelo"        },
  { src: "/skorpios/DSC_4495.JPG", cap: "Golfinhos acompanham o MN Skorpios III",   tag: "Fauna"       },
  { src: "/skorpios/DSC_6380.JPG", cap: "Sobre o gelo milenário",                   tag: "Gelo"        },
  { src: "/skorpios/DSC_1808.JPG", cap: "Trekking rumo ao Glaciar Bernal",           tag: "Trekking"    },
  { src: "/skorpios/DSC_2146.JPG", cap: "Whisky on the rocks com gelo do glaciar",  tag: "Experiência" },
  { src: "/skorpios/DSC_4751.JPG", cap: "A Patagônia ao redor de cada gole",        tag: "Experiência" },
];

function GaleriaInterativa() {
  const [idx, setIdx] = useState(0);
  const img = GALERIA[idx];
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
            style={{ background: `linear-gradient(to top, ${P.abyss}cc 0%, transparent 55%)` }} />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em]"
              style={{ color: P.ice }}>
              {img.tag}
            </span>
            <p className="mt-1 text-[14px] font-light" style={{ color: P.white }}>
              {img.cap}
            </p>
          </div>
          <div className="absolute right-4 top-4">
            <span className="text-[11px] font-medium"
              style={{ color: "rgba(233,245,248,0.5)" }}>
              {idx + 1}/{GALERIA.length}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
        {GALERIA.map((g, i) => (
          <button key={i} onClick={() => setIdx(i)}
            className="relative shrink-0 overflow-hidden rounded-xl transition-all duration-300"
            style={{
              width: 190, height: 108,
              opacity: i === idx ? 1 : 0.42,
              outline: i === idx ? `2px solid ${P.ice}` : "2px solid transparent",
              outlineOffset: 2,
            }}>
            <img src={g.src} alt={g.cap}
              className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function KaweskarPage() {
  return (
    <main className="relative" style={{ background: P.paper }}>
      <Nav />

      {/* BREADCRUMB */}
      <div
        className="relative z-20 flex items-center gap-2 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.18em] md:px-10"
        style={{ background: P.abyss, color: "rgba(233,245,248,0.45)" }}
      >
        <a href="/destinos/cruzeiro-skorpios"
          className="transition-colors hover:text-[#7fd4e0]">
          Cruzeiros Skorpios
        </a>
        <span>/</span>
        <span style={{ color: P.ice }}>Ruta Kawéskar</span>
      </div>

      {/* ===== HERO ===== */}
      <section
        className="relative flex min-h-[100svh] w-full items-center overflow-hidden"
        style={{ background: P.abyss }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/skorpios/DSC_3890.JPG')",
            opacity: 0.38,
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse at 35% 50%, transparent 28%, ${P.abyss} 80%)` }}
        />

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
              Quatro noites por um labirinto de fiordes onde a estrada acaba e
              o gelo começa. Os mesmos canais que os{" "}
              <span style={{ color: P.white }}>Kawésqar</span> navegaram por
              milênios. Agora a bordo do MN Skorpios III.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.65 }}
              className="mt-8 flex flex-wrap items-center gap-5"
            >
              <a
                href="#contato"
                className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]"
                style={{ background: P.steppe, color: P.abyss }}
              >
                Quero esta viagem <span>→</span>
              </a>
              <span style={{ color: "rgba(233,245,248,0.85)" }}>
                <span className="text-[12px] uppercase tracking-[0.16em]"
                  style={{ color: "rgba(233,245,248,0.5)" }}>
                  a partir de
                </span>{" "}
                <span className="font-display text-2xl">US$ 1.890</span>
              </span>
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

      {/* ===== A ESCALA DO GELO ===== */}
      <section className="relative w-full overflow-hidden" style={{ background: P.fjord }}>
        <div className="grid md:grid-cols-2">
          <div className="relative h-[340px] md:h-[600px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/skorpios/DSC_1970.JPG')" }}
            />
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(to right, transparent, ${P.fjord})` }}
            />
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
                  <h2
                    className="mt-5 font-display text-[clamp(2rem,4.5vw,3.6rem)] font-light leading-[1.05]"
                    style={{ color: P.white }}
                  >
                    Até 60 metros
                    <br />de parede viva
                  </h2>
                  <p className="mt-5 max-w-sm text-[15px] font-light leading-relaxed"
                    style={{ color: "rgba(233,245,248,0.7)" }}>
                    Você, num bote de expedição, minúsculo diante de uma muralha
                    de gelo que rangeu por séculos. É aqui que a Patagônia te
                    lembra do seu tamanho.
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
              Quanto mais antigo e comprimido, mais azul. Cada geleira da rota
              tem o seu tom, do turquesa leitoso ao azul profundo.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-xl"
            style={{ background: P.line }}>
            {GELEIRAS.map((g, i) => (
              <Reveal key={g.nome} delay={i * 0.05}>
                <div className="flex items-center gap-6 px-6 py-7 md:px-8"
                  style={{ background: P.abyss }}>
                  <span className="h-12 w-12 shrink-0 rounded-full"
                    style={{ background: g.cor }} />
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
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url('/skorpios/DSC_6897.JPG')" }}
        />
        <div className="absolute inset-0" style={{ background: `${P.abyss}cc` }} />
        <div className="relative z-10 mx-auto max-w-[900px] px-6 py-28 text-center md:py-40">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em]"
              style={{ color: P.steppe }}>
              O povo dos canais
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p
              className="mt-7 font-display text-[clamp(1.8rem,4vw,3.3rem)] font-light leading-[1.2]"
              style={{ color: P.white }}
            >
              Por milênios, os{" "}
              <span className="italic" style={{ color: P.ice }}>Kawésqar</span>{" "}
              percorreram esses canais em canoas, com uma fogueira acesa no meio
              do barco, entre Puerto Edén e Puerto Natales. Você refaz essa
              rota com o conforto de hoje e o mesmo silêncio de sempre.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== GALERIA ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32"
        style={{ background: P.fjord }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.32em]"
              style={{ color: P.ice }}>
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
        style={{ background: P.paper, color: P.abyss }}>
        <div className="mx-auto grid max-w-[1280px] items-center gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <div className="relative h-[360px] overflow-hidden rounded-xl md:h-[460px]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/skorpios/DSC_4317.JPG')" }}
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em]"
                style={{ color: P.iceDeep }}>
                Refúgio flutuante
              </p>
              <h2 className="mt-5 font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1]">
                MN Skorpios III
              </h2>
              <p className="mt-6 text-[15px] font-light leading-relaxed"
                style={{ color: "rgba(7,35,48,0.7)" }}>
                70 metros, 5 decks, até 92 hóspedes em 46 cabines. Todas com
                banho privado, Smart TV e janelas abertas para o gelo. Comedor
                panorâmico, dois salões-bar e a Patagônia passando lá fora.
              </p>
              <p className="mt-4 text-[15px] font-light leading-relaxed"
                style={{ color: "rgba(7,35,48,0.7)" }}>
                Remodelado em 2025: a alma de um navio de expedição com o
                conforto de um refúgio.
              </p>
            </div>
          </Reveal>
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
            O arco da expedição: ida e volta a Puerto Natales. O itinerário
            detalhado a gente fecha com você.
          </p>
          <div className="mt-12">
            {ROTEIRO.map((r, i) => (
              <Reveal key={r.d} delay={i * 0.05}>
                <div className="flex items-baseline gap-6 border-t py-6 md:gap-10"
                  style={{ borderColor: P.line }}>
                  <span className="font-display text-sm" style={{ color: P.ice }}>
                    {r.d}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-light md:text-2xl">
                      {r.t}
                    </h3>
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

      {/* ===== AONIKIA ===== */}
      <section className="px-6 py-20 md:px-10 md:py-24"
        style={{ background: P.abyss }}>
        <div className="mx-auto max-w-[860px] text-center">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em]"
              style={{ color: P.ice }}>
              AonikIA · especialista neste cruzeiro
            </p>
            <h2
              className="mt-5 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-light leading-[1.15]"
              style={{ color: P.white }}
            >
              Pergunte tudo sobre a Ruta Kawéskar
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] font-light leading-relaxed"
              style={{ color: "rgba(233,245,248,0.65)" }}>
              Cabines, melhor época, como chegar a Puerto Natales, o que está
              incluído. A AonikIA conhece este cruzeiro e te conecta com um
              especialista.
            </p>
            <a
              href="#contato"
              className="mt-7 inline-flex items-center gap-3 rounded-full border px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition-all duration-300"
              style={{ borderColor: P.ice, color: P.ice }}
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
