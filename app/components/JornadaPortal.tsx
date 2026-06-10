"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ── Paleta Jornada (compartilhada com /jornada page) ─────── */
const J = {
  pedra:    "#0e0a05",
  ambar:    "#c07a2e",
  ocre:     "#d4954a",
  concha:   "#f0e6cc",
  textSoft: "rgba(240,230,204,0.60)",
  line:     "rgba(192,122,46,0.18)",
};

/* ── Concha da Vieira — versao decorativa (menor) ─────────── */
const HX = 130, HY = 200;
const TIPS: [number, number][] = [
  [15, 104], [39, 81], [67, 64], [98, 54], [130, 50],
  [163, 54], [193, 64], [221, 81], [245, 104],
];
const CPS: [number, number][] = [
  [10, 75], [40, 51], [75, 35], [111, 27],
  [149, 27], [186, 35], [220, 51], [250, 75],
];

let SHELL_PATH = `M ${HX},${HY} L ${TIPS[0][0]},${TIPS[0][1]}`;
for (let i = 0; i < CPS.length; i++) {
  SHELL_PATH += ` Q ${CPS[i][0]},${CPS[i][1]} ${TIPS[i + 1][0]},${TIPS[i + 1][1]}`;
}
SHELL_PATH += ` L ${HX},${HY} Z`;

let ARC_PATH = `M ${TIPS[0][0]},${TIPS[0][1]}`;
for (let i = 0; i < CPS.length; i++) {
  ARC_PATH += ` Q ${CPS[i][0]},${CPS[i][1]} ${TIPS[i + 1][0]},${TIPS[i + 1][1]}`;
}

function ConchaSmall() {
  return (
    <svg viewBox="0 20 260 190" className="h-full w-full" style={{ overflow: "visible" }}>
      <motion.path d={SHELL_PATH} fill={J.ambar} fillOpacity={0.07}
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: EASE, delay: 0.4 }} />
      {TIPS.map(([tx, ty], i) => (
        <motion.line key={i}
          x1={HX} y1={HY} x2={tx} y2={ty}
          stroke={J.ambar} strokeWidth="0.8" strokeOpacity="0.28"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.6 + i * 0.06 }} />
      ))}
      <motion.path d={ARC_PATH} fill="none" stroke={J.ocre} strokeWidth="1.5" strokeOpacity="0.75"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.0, ease: EASE, delay: 0.8 }} />
      <motion.circle cx={HX} cy={HY} r="4" fill={J.ambar} fillOpacity="0.5"
        initial={{ scale: 0 }} whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: EASE, delay: 0.5 }} />
    </svg>
  );
}

const STATS: [string, string][] = [
  ["2022", "no caminho"],
  ["+12", "rotas"],
  ["+200", "peregrinos"],
];

export default function JornadaPortal() {
  return (
    <section
      id="jornada"
      className="relative overflow-hidden"
      style={{ backgroundColor: J.pedra }}
    >
      {/* Foto de fundo — muito sutil, apenas textura */}
      <div
        className="absolute inset-0 scale-105 bg-cover bg-center opacity-[0.12]"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?q=80&w=2400&auto=format&fit=crop')`,
        }}
      />
      {/* Vinheta lateral */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, ${J.pedra} 0%, transparent 50%, ${J.pedra} 100%)`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1180px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1fr_320px]">

          {/* Texto ─────────────────────────────────────────── */}
          <div>
            <motion.p
              className="mb-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em]"
              style={{ color: J.ocre }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <span className="h-px w-8" style={{ backgroundColor: `${J.ocre}60` }} />
              Peregrinacao · Autoconhecimento
            </motion.p>

            <motion.h2
              className="font-display font-light leading-[1.03] tracking-[-0.025em]"
              style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.4rem)", color: J.concha }}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, ease: EASE, delay: 0.1 }}
            >
              Caminhos de{" "}
              <span className="italic" style={{ color: J.ocre }}>
                Santiago
              </span>
              <br />
              <span
                className="text-[0.6em] font-light not-italic"
                style={{ color: J.textSoft }}
              >
                e jornadas que te transformam
              </span>
            </motion.h2>

            <motion.p
              className="mt-5 max-w-[440px] text-[14px] font-light leading-relaxed"
              style={{ color: J.textSoft }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
            >
              A AONIK opera Compostela desde 2022 com mais rotas que qualquer operadora
              brasileira. Caminhos Portugues, Frances e muito mais.
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
                    style={{ color: J.concha }}
                  >
                    {n}
                  </div>
                  <div
                    className="mt-1 text-[9px] font-medium uppercase tracking-[0.22em]"
                    style={{ color: `${J.ocre}90` }}
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
                href="/jornada"
                className="group/btn inline-flex items-center gap-2 rounded-full px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] transition-opacity duration-300 hover:opacity-80"
                style={{ backgroundColor: J.ambar, color: J.pedra }}
              >
                Ver Roteiros
                <span className="transition-transform duration-300 group-hover/btn:translate-x-0.5">
                  →
                </span>
              </a>
              <a
                href="#contato"
                className="rounded-full border px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors duration-300"
                style={{ borderColor: `${J.ambar}45`, color: J.concha }}
              >
                Falar com especialista
              </a>
            </motion.div>
          </div>

          {/* Concha SVG ─────────────────────────────────────── */}
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
          >
            <div className="h-[300px] w-full">
              <ConchaSmall />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
