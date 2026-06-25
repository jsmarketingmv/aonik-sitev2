"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ── Paleta Patagônia glacial — diferencia do azul/dourado de Santiago ── */
const P = {
  abismo:   "#0a2027",   // teal profundo (fundo)
  fiorde:   "#0f3540",   // teal médio
  gelo:     "#8fd4dd",   // turquesa-gelo (assinatura)
  geloVivo: "#cfeef2",   // gelo claro
  branco:   "#FFFFFF",
  ocre:     "#e0935a",   // laranja-expedição (CTA quente)
  textSoft: "rgba(255,255,255,0.62)",
};

/* ── As Três Torres — silhueta de picos (motivo do lugar) ─────────── */
function TresTorres() {
  // três picos irregulares de granito
  const torres = [
    "M 30,210 L 52,70 L 60,96 L 70,40 L 84,210 Z",
    "M 80,210 L 104,30 L 116,72 L 128,18 L 150,210 Z",
    "M 146,210 L 168,84 L 180,52 L 192,96 L 212,210 Z",
  ];
  return (
    <svg viewBox="0 0 240 240" className="h-full w-full" style={{ overflow: "visible" }}>
      {/* halo de gelo atrás */}
      <motion.circle
        cx="120" cy="120" r="92"
        fill={P.gelo} fillOpacity={0.06}
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
      />
      {/* picos preenchidos */}
      {torres.map((d, i) => (
        <motion.path
          key={`fill-${i}`}
          d={d}
          fill={P.gelo}
          fillOpacity={0.1}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE, delay: 0.3 + i * 0.12 }}
        />
      ))}
      {/* contorno dos picos — traço que se desenha */}
      {torres.map((d, i) => (
        <motion.path
          key={`stroke-${i}`}
          d={d}
          fill="none"
          stroke={P.geloVivo}
          strokeWidth="1.4"
          strokeOpacity="0.9"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: EASE, delay: 0.5 + i * 0.18 }}
        />
      ))}
      {/* linha-d'água base */}
      <motion.line
        x1="10" y1="210" x2="230" y2="210"
        stroke={P.gelo} strokeWidth="1" strokeOpacity="0.4"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.4 }}
      />
      <motion.text
        x="120" y="232" textAnchor="middle"
        fill={P.gelo} fillOpacity="0.55" fontSize="7.5" letterSpacing="3.5"
        style={{ fontFamily: "sans-serif", fontWeight: 700 }}
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: EASE, delay: 2.0 }}
      >
        LAS TORRES
      </motion.text>
    </svg>
  );
}

const STATS: [string, string][] = [
  ["Top 10", "mais visitados"],
  ["181 mil", "hectares"],
  ["4", "circuitos W"],
];

export default function PatagoniaPortal() {
  return (
    <section
      id="patagonia"
      className="relative overflow-hidden"
      style={{ backgroundColor: P.abismo }}
    >
      {/* Foto de fundo — sutil, textura de gelo */}
      <div
        className="absolute inset-0 scale-105 bg-cover bg-center opacity-[0.16]"
        style={{ backgroundImage: `url('/torres-del-paine/patagonia.jpg')` }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, ${P.abismo} 0%, transparent 50%, ${P.abismo} 100%)`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1180px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1fr_320px]">

          {/* Texto ─────────────────────────────────────────── */}
          <div>
            <motion.p
              className="mb-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em]"
              style={{ color: P.gelo }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <span className="h-px w-8" style={{ backgroundColor: `${P.gelo}60` }} />
              Patagônia Chilena · Torres del Paine
            </motion.p>

            <motion.h2
              className="font-display font-light leading-[1.03] tracking-[-0.025em]"
              style={{ fontSize: "clamp(2.4rem, 5.2vw, 4.2rem)", color: P.branco }}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, ease: EASE, delay: 0.1 }}
            >
              Um dos{" "}
              <span className="italic" style={{ color: P.gelo }}>
                10 parques
              </span>
              <br />
              mais visitados do mundo
            </motion.h2>

            <motion.p
              className="mt-5 max-w-[460px] text-[14px] font-light leading-relaxed"
              style={{ color: P.textSoft }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
            >
              Granito, gelo e vento no fim do mundo. O Circuito W é a travessia mais
              icônica da Patagônia, e a AONIK leva você até a base das Torres com
              quatro formatos, do camping ao refúgio com conforto.
            </motion.p>

            {/* Stats */}
            <motion.div
              className="mt-8 flex flex-wrap gap-8"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
            >
              {STATS.map(([n, l]) => (
                <div key={l}>
                  <div
                    className="font-display text-[1.9rem] font-light leading-none"
                    style={{ color: P.branco }}
                  >
                    {n}
                  </div>
                  <div
                    className="mt-1 text-[9px] font-medium uppercase tracking-[0.22em]"
                    style={{ color: `${P.gelo}cc` }}
                  >
                    {l}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="mt-9 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
            >
              <a
                href="/destinos/torres-del-paine"
                className="group/btn inline-flex items-center gap-2 rounded-full px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] transition-opacity duration-300 hover:opacity-80"
                style={{ backgroundColor: P.ocre, color: P.abismo }}
              >
                Conhecer Torres del Paine
                <span className="transition-transform duration-300 group-hover/btn:translate-x-0.5">
                  →
                </span>
              </a>
              <a
                href="#contato"
                className="rounded-full border px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors duration-300"
                style={{ borderColor: `${P.gelo}45`, color: P.branco }}
              >
                Falar com especialista
              </a>
            </motion.div>
          </div>

          {/* Torres SVG ─────────────────────────────────────── */}
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
          >
            <div className="h-[300px] w-full">
              <TresTorres />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
