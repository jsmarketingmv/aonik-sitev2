"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Contato from "../../components/Contato";
import FloatingActions from "../../components/FloatingActions";
import { Reveal, EASE } from "../../components/ui";

/* ============================================================
   ANTARCTICA21 — identidade compartilhada
   Air-Cruises + Sea Voyages saindo de Punta Arenas, Chile.
   Paleta "Antártida austera": gelo + azul-abismo + parka.
   Assinatura: a travessia aérea que salta a Passagem de Drake.
   ============================================================ */
export const A = {
  abismo:    "#07151f", // azul polar quase preto (heros)
  noite:     "#0c2230", // seção escura
  fundo:     "#0f2c3c", // seção escura alternativa
  glacial:   "#6fa8c9", // azul-geleira (assinatura fria)
  glacialDp: "#3f7ea3",
  parka:     "#e2622f", // laranja-coral (CTA / calor da cena)
  parkaSoft: "#ef8a5a",
  gelo:      "#eef4f6", // branco-gelo (fundos claros / texto claro)
  geloSoft:  "rgba(238,244,246,0.66)",
  geloFaint: "rgba(238,244,246,0.4)",
  line:      "rgba(111,168,201,0.18)",
};

const U = "https://images.unsplash.com/photo-";
const Q = "?q=80&w=1600&auto=format&fit=crop";
/* Pool de placeholders — só IDs Unsplash já validados no projeto.
   Trocar por fotos reais da Antarctica21 quando o cliente enviar. */
export const IMG = {
  picos:   `${U}1454496522488-7a8e488e8606${Q}`,
  fiorde:  `${U}1500514966906-fe245eea9344${Q}`,
  montanha:`${U}1469474968028-56623f02e42e${Q}`,
  água:    `${U}1464822759023-fed622ff2c3b${Q}`,
  costa:   `${U}1502082553048-f009c37129b9${Q}`,
  neve:    `${U}1531794343237-93e7e6e25b3f${Q}`,
  trilha:  `${U}1551632811-561732d1e306${Q}`,
  vale:    `${U}1601581875309-fafbf2d3ed3a${Q}`,
  cabana:  `${U}1518780664697-55e3ad937233${Q}`,
  estrada: `${U}1469854523086-cc02fe5d8800${Q}`,
};

/* ============================================================
   ASSINATURA 1 — A TRAVESSIA AÉREA (air-cruises)
   Punta Arenas → voo de 2h sobre a Drake → King George Island
   → Península Antártica. O arco é a história da marca.
   ============================================================ */
export function AirArc() {
  return (
    <svg viewBox="0 0 440 580" className="h-full w-full">
      {/* Continente sul-americano (canto superior) */}
      <path
        d="M300,20 L440,20 L440,150 Q380,150 350,120 Q320,95 300,20 Z"
        fill={A.noite}
      />
      {/* Passagem de Drake — faixa de ondas */}
      {[170, 200, 230, 260].map((y, i) => (
        <path
          key={y}
          d={`M40,${y} q30,-10 60,0 t60,0 t60,0 t60,0 t60,0`}
          fill="none"
          stroke={A.glacial}
          strokeWidth="1"
          opacity={0.16 - i * 0.015}
        />
      ))}
      <text
        x="48" y="150" fill={A.glacialDp} fontSize="11"
        letterSpacing="3" style={{ textTransform: "uppercase" }} opacity="0.6"
      >
        Passagem de Drake
      </text>

      {/* Península Antártica (massa de gelo inferior) */}
      <path
        d="M150,330 Q120,360 110,400 Q98,450 70,490 Q52,520 60,560 L120,560
           Q130,510 150,470 Q172,425 195,400 Q210,382 200,350 Q180,330 150,330 Z"
        fill={A.fundo}
        stroke={A.glacial}
        strokeWidth="1"
        opacity="0.9"
      />
      {/* fendas no gelo */}
      {[
        "M120,420 L150,430", "M100,470 L132,476", "M150,400 L176,392",
      ].map((d) => (
        <path key={d} d={d} stroke={A.glacial} strokeWidth="0.8" opacity="0.3" />
      ))}

      {/* Arco do voo */}
      <motion.path
        d="M318,78 Q150,150 152,320"
        fill="none"
        stroke={A.parka}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="2 8"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.6, ease: EASE, delay: 0.4 }}
      />
      {/* aviãozinho no meio do arco */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.6 }}
      >
        <path d="M205,150 l13,4 -4,5 -9,-3 z" fill={A.parkaSoft} />
      </motion.g>
      <text
        x="232" y="150" fill={A.parkaSoft} fontSize="11"
        letterSpacing="2" opacity="0.85"
      >
        voo · 2h
      </text>

      {/* Punta Arenas (origem) */}
      <g>
        <circle cx="318" cy="78" r="5.5" fill={A.parka} />
        <text x="306" y="62" fill={A.gelo} fontSize="12.5"
          letterSpacing="1.5" textAnchor="end" style={{ textTransform: "uppercase" }}>
          Punta Arenas
        </text>
      </g>
      {/* King George Island (chegada) */}
      <g>
        <circle cx="152" cy="320" r="5.5" fill={A.glacial} />
        <text x="166" y="318" fill={A.gelo} fontSize="12.5"
          letterSpacing="1.5" dominantBaseline="middle"
          style={{ textTransform: "uppercase" }}>
          King George Is.
        </text>
      </g>
      {/* Waypoints na península */}
      {[
        { x: 150, y: 430, l: "Gerlache" },
        { x: 110, y: 480, l: "Lemaire" },
      ].map((w) => (
        <g key={w.l}>
          <circle cx={w.x} cy={w.y} r="3.5" fill={A.glacialDp} />
          <text x={w.x + 12} y={w.y} fill={A.geloFaint} fontSize="10.5"
            letterSpacing="1.5" dominantBaseline="middle"
            style={{ textTransform: "uppercase" }}>
            {w.l}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ============================================================
   ASSINATURA 2 — A ROTA DOS FIORDES (sea voyages)
   Rota sinuosa entre canais e geleiras (Patagônia / Falklands).
   ============================================================ */
const FJORD_PATH =
  "M250,40 Q150,90 165,160 Q178,215 120,265 Q95,310 130,355 Q168,392 250,400 Q300,420 295,470 Q290,520 250,545";
const FJORD_ISLANDS = [
  { cx: 95, cy: 90, rx: 34, ry: 16 },
  { cx: 285, cy: 140, rx: 26, ry: 12 },
  { cx: 60, cy: 215, rx: 22, ry: 10 },
  { cx: 200, cy: 300, rx: 28, ry: 13 },
  { cx: 330, cy: 430, rx: 24, ry: 11 },
  { cx: 150, cy: 500, rx: 30, ry: 14 },
];
export function FjordRoute({
  stops,
}: {
  stops: { x: number; y: number; label: string; kind?: "ship" | "glacier" | "stop" }[];
}) {
  return (
    <svg viewBox="-110 10 600 570" className="h-full w-full">
      {FJORD_ISLANDS.map((is, i) => (
        <ellipse key={i} cx={is.cx} cy={is.cy} rx={is.rx} ry={is.ry}
          fill={A.fundo} opacity="0.75" />
      ))}
      <motion.path
        d={FJORD_PATH} fill="none" stroke={A.glacial}
        strokeWidth="2.4" strokeLinecap="round" strokeDasharray="1 7"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.6, ease: EASE, delay: 0.4 }}
      />
      {stops.map((s) => {
        const anchor = s.x > 180 ? "start" : "end";
        const lx = s.x > 180 ? s.x + 14 : s.x - 14;
        return (
          <g key={s.label}>
            {s.kind === "glacier" ? (
              <path d={`M${s.x - 6},${s.y + 5} L${s.x},${s.y - 6} L${s.x + 6},${s.y + 5} Z`}
                fill={A.gelo} />
            ) : (
              <circle cx={s.x} cy={s.y} r="5"
                fill={s.kind === "ship" ? A.parka : A.glacial} />
            )}
            <text x={lx} y={s.y} fill={A.geloSoft} fontSize="11.5"
              letterSpacing="1.2" textAnchor={anchor} dominantBaseline="middle"
              style={{ textTransform: "uppercase" }}>
              {s.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ============================================================
   GALERIA INTERATIVA (featured + miniaturas)
   ============================================================ */
export type GalImg = { src: string; cap: string; tag: string };
export function Galeria({ images }: { images: GalImg[] }) {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);
  const img = images[idx];
  return (
    <div className="flex flex-col gap-3">
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
          style={{ background: `linear-gradient(to top, ${A.abismo}cc 0%, transparent 55%)` }} />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className="text-[10px] font-semibold uppercase tracking-[0.32em]"
            style={{ color: A.glacial }}>{img.tag}</span>
          <p className="mt-1 text-[14px] font-light" style={{ color: A.gelo }}>{img.cap}</p>
        </div>
        <span className="absolute right-4 top-4 text-[11px] font-medium" style={{ color: A.geloFaint }}>
          {idx + 1} / {images.length}
        </span>
        <button onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full text-base font-light transition-all hover:opacity-100"
          style={{ background: "rgba(7,21,31,0.6)", color: A.glacial, opacity: 0.8 }}>
          ‹
        </button>
        <button onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full text-base font-light transition-all hover:opacity-100"
          style={{ background: "rgba(7,21,31,0.6)", color: A.glacial, opacity: 0.8 }}>
          ›
        </button>
      </div>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
        {images.map((g, i) => (
          <button key={i} onClick={() => setIdx(i)}
            className="relative overflow-hidden rounded-lg transition-all duration-300"
            style={{ aspectRatio: "16/10", outline: i === idx ? `2px solid ${A.glacial}` : "2px solid transparent", outlineOffset: 2 }}>
            <img src={g.src} alt={g.cap}
              className="h-full w-full object-cover transition-opacity duration-300"
              style={{ opacity: i === idx ? 1 : 0.42 }} />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   EXPEDITIONPAGE — página de produto data-driven
   ============================================================ */
export type Expedition = {
  slug: string;
  kicker: string;
  title: [string, string];
  subtitleLead: string;
  subtitle: string;
  price: string;
  priceNote: string;
  signature: "air" | "fjord";
  fjordStops?: { x: number; y: number; label: string; kind?: "ship" | "glacier" | "stop" }[];
  heroImg: string;
  stats: { label: string; value: string }[];
  destaquesTitle: string;
  destaques: { num: string; t: string; d: string }[];
  roteiroNote: string;
  roteiro: { d: string; t: string; s: string }[];
  incluso: string[];
  ship: { name: string; tag: string; desc: string[]; img: string };
  saidasNote: string;
  saidasSeason: string;
  galeria: GalImg[];
};

export function ExpeditionPage({ data }: { data: Expedition }) {
  const isAir = data.signature === "air";
  return (
    <main className="relative" style={{ background: A.gelo }}>
      <Nav />

      {/* ===== HERO ===== */}
      <section className="relative flex min-h-[100svh] w-full items-center overflow-hidden"
        style={{ background: A.abismo }}>
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${data.heroImg}')`, opacity: 0.32 }} />
        <div className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse at 32% 50%, transparent 22%, ${A.abismo} 76%)` }} />

        <div className="relative z-10 mx-auto grid w-full max-w-[1400px] items-center gap-10 px-6 py-28 md:grid-cols-[1.1fr_0.9fr] md:px-10">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.2 }}
              className="text-[12px] font-medium uppercase tracking-[0.4em]" style={{ color: A.glacial }}>
              {data.kicker}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
              className="mt-5 font-display text-[clamp(2.6rem,6.4vw,5.6rem)] font-light uppercase leading-[0.86] tracking-[-0.02em]"
              style={{ color: A.gelo }}>
              {data.title[0]}<br />{data.title[1]}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.5 }}
              className="mt-6 max-w-md text-[15px] font-light leading-relaxed md:text-base"
              style={{ color: A.geloSoft }}>
              {data.subtitleLead}{" "}
              <span style={{ color: A.gelo }}>{data.subtitle}</span>
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.65 }}
              className="mt-8 flex flex-wrap items-center gap-5">
              <a href="#contato"
                className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]"
                style={{ background: A.parka, color: A.gelo }}>
                Quero esta expedição <span>→</span>
              </a>
              <span className="text-[12px] uppercase tracking-[0.16em]" style={{ color: A.geloFaint }}>
                {data.price}
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.85 }}
              className="mt-6 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em]"
              style={{ color: A.geloFaint }}>
              <a href="/destinos/antarctica21" className="transition-colors hover:text-[#6fa8c9]">
                Antarctica21
              </a>
              <span>/</span>
              <span style={{ color: A.glacial }}>{data.title.join(" ")}</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
            className="mx-auto h-[480px] w-full max-w-[440px] md:h-[580px]">
            {isAir ? <AirArc /> : <FjordRoute stops={data.fjordStops ?? []} />}
          </motion.div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="px-6 py-14 md:px-10" style={{ background: A.noite }}>
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-6 md:grid-cols-4">
          {data.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className="border-l pl-4" style={{ borderColor: A.line }}>
                <p className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-light" style={{ color: A.gelo }}>
                  {s.value}
                </p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: A.glacial }}>
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== DESTAQUES ===== */}
      <section className="px-6 py-24 md:px-10 md:py-28" style={{ background: A.fundo, color: A.gelo }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: A.parkaSoft }}>
              Por que ir
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mb-12 max-w-2xl font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1]">
              {data.destaquesTitle}
            </h2>
          </Reveal>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {data.destaques.map((d, i) => (
              <Reveal key={d.num} delay={i * 0.06}>
                <div className="border-t pt-6" style={{ borderColor: A.line }}>
                  <span className="font-display text-sm" style={{ color: A.glacial }}>{d.num}</span>
                  <h3 className="mt-3 font-display text-xl font-light md:text-2xl">{d.t}</h3>
                  <p className="mt-3 text-[14px] font-light leading-relaxed" style={{ color: A.geloSoft }}>{d.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GALERIA ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: A.abismo }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: A.glacial }}>
              Galeria
            </p>
          </Reveal>
          <Reveal delay={0.08}><Galeria images={data.galeria} /></Reveal>
        </div>
      </section>

      {/* ===== ROTEIRO ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: A.noite, color: A.gelo }}>
        <div className="mx-auto max-w-[1100px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: A.parkaSoft }}>
              O roteiro em essência
            </p>
          </Reveal>
          <p className="mt-4 max-w-lg text-[14px] font-light leading-relaxed" style={{ color: A.geloSoft }}>
            {data.roteiroNote}
          </p>
          <div className="mt-12">
            {data.roteiro.map((r, i) => (
              <Reveal key={r.d} delay={i * 0.04}>
                <div className="flex items-baseline gap-6 border-t py-6 md:gap-10" style={{ borderColor: A.line }}>
                  <span className="font-display text-sm whitespace-nowrap" style={{ color: A.glacial }}>{r.d}</span>
                  <div>
                    <h3 className="font-display text-xl font-light md:text-2xl">{r.t}</h3>
                    <p className="mt-1 text-[14px] font-light" style={{ color: A.geloSoft }}>{r.s}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INCLUSO ===== */}
      <section className="px-6 py-24 md:px-10 md:py-28" style={{ background: A.fundo, color: A.gelo }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="mb-10 text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: A.glacial }}>
              O que está incluído
            </p>
          </Reveal>
          <div className="grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.incluso.map((item, i) => (
              <Reveal key={item} delay={i * 0.04}>
                <div className="flex items-start gap-3 border-t pt-4" style={{ borderColor: A.line }}>
                  <span className="mt-1 text-[13px]" style={{ color: A.parka }}>✦</span>
                  <p className="text-[14px] font-light leading-relaxed" style={{ color: A.geloSoft }}>{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== O NAVIO ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: A.gelo, color: A.abismo }}>
        <div className="mx-auto grid max-w-[1280px] items-center gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <div className="relative h-[360px] overflow-hidden rounded-xl md:h-[460px]">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${data.ship.img}')` }} />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: A.glacialDp }}>
                {data.ship.tag}
              </p>
              <h2 className="mt-5 font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1]">
                {data.ship.name}
              </h2>
              {data.ship.desc.map((p, i) => (
                <p key={i} className="mt-5 text-[15px] font-light leading-relaxed" style={{ color: "rgba(7,21,31,0.68)" }}>
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== SAÍDAS / PREÇO ===== */}
      <section className="px-6 py-24 md:px-10 md:py-28" style={{ background: A.noite, color: A.gelo }}>
        <div className="mx-auto max-w-[860px] text-center">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: A.glacial }}>
              Próximas saídas
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 font-display text-[clamp(1.8rem,3.6vw,2.8rem)] font-light leading-[1.15]">
              {data.saidasSeason}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-5 max-w-md text-[15px] font-light leading-relaxed" style={{ color: A.geloSoft }}>
              {data.saidasNote}
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a href="#contato"
                className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]"
                style={{ background: A.parka, color: A.gelo }}>
                Consultar disponibilidade <span>→</span>
              </a>
              <span className="text-[12px] font-light" style={{ color: A.geloFaint }}>{data.priceNote}</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== AONIKIA ===== */}
      <section className="px-6 py-20 md:px-10 md:py-24" style={{ background: A.fundo }}>
        <div className="mx-auto max-w-[860px] text-center">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: A.glacial }}>
              AonikIA · especialista nesta expedição
            </p>
            <h2 className="mt-5 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-light leading-[1.15]" style={{ color: A.gelo }}>
              Pergunte tudo sobre a Antártida
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] font-light leading-relaxed" style={{ color: A.geloSoft }}>
              Como funciona o voo sobre a Drake, o que levar na mala, melhor época,
              fauna que você vai ver. A AonikIA conhece esta rota e te conecta com um especialista.
            </p>
            <a href="#contato"
              className="mt-7 inline-flex items-center gap-3 rounded-full border px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition-all duration-300"
              style={{ borderColor: A.glacial, color: A.glacial }}>
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
