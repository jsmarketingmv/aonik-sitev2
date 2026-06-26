"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ── Paleta Caminhos de Portugal — vinho do Porto + ouro do Douro ──
   diferencia do azul (Santiago) e do teal (Patagônia) ── */
const C = {
  porto:    "#220a11",   // vinho do Porto profundo (fundo)
  vinho:    "#3f1521",   // Vintage Wine
  ouro:     "#c4a56a",   // dourado do Douro (assinatura)
  ouroVivo: "#e3c98e",   // dourado claro
  creme:    "#ede6dd",   // Mother of Pearl
  sage:     "#7a8f62",   // verde das vinhas
  textSoft: "rgba(237,230,221,0.62)",
};

/* ── Socalcos do Douro — terraços que se desenham + rio + sol ───── */
function SocalcosDouro() {
  // contornos dos socalcos (terraços), de cima para baixo
  const terracos = [
    "M 12,96 C 60,86 110,92 156,84 C 200,77 226,90 232,86",
    "M 8,120 C 58,110 112,116 160,108 C 204,101 228,114 234,110",
    "M 6,146 C 56,136 114,142 164,134 C 208,127 230,140 236,136",
    "M 8,174 C 58,164 116,170 168,162 C 210,155 230,168 236,164",
    "M 12,204 C 62,194 118,200 170,192 C 212,185 230,198 234,194",
  ];
  // rio serpenteante descendo
  const rio = "M 150,60 C 168,96 132,120 146,150 C 158,178 128,196 140,224";

  return (
    <svg viewBox="0 0 240 240" className="h-full w-full" style={{ overflow: "visible" }}>
      {/* halo dourado */}
      <motion.circle cx="120" cy="120" r="92" fill={C.ouro} fillOpacity={0.06}
        initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }} transition={{ duration: 1.4, ease: EASE, delay: 0.2 }} />

      {/* sol do Douro */}
      <motion.circle cx="194" cy="66" r="20" fill={C.ouro} fillOpacity={0.14}
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.4 }} />
      <motion.circle cx="194" cy="66" r="20" fill="none" stroke={C.ouro} strokeWidth="1"
        initial={{ opacity: 0 }} whileInView={{ opacity: [0.4, 0, 0.4] }} viewport={{ once: true }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />

      {/* socalcos — traço que se desenha + leve drift */}
      {terracos.map((d, i) => (
        <motion.path key={i} d={d} fill="none"
          stroke={i % 2 === 0 ? C.ouro : C.sage}
          strokeWidth={1 + i * 0.18} strokeLinecap="round"
          strokeOpacity={0.5 + i * 0.08}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1, x: [0, i % 2 === 0 ? 5 : -5, 0] }}
          viewport={{ once: true }}
          transition={{
            pathLength: { duration: 1.6, ease: EASE, delay: 0.4 + i * 0.12 },
            opacity: { duration: 1.2, delay: 0.4 + i * 0.12 },
            x: { duration: 12 + i * 2, repeat: Infinity, ease: "easeInOut" },
          }} />
      ))}

      {/* rio do Douro */}
      <motion.path d={rio} fill="none" stroke={C.creme} strokeWidth="2.4" strokeLinecap="round"
        strokeOpacity="0.55"
        initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }} transition={{ duration: 2.2, ease: EASE, delay: 0.9 }} />
      <motion.path d={rio} fill="none" stroke={C.ouroVivo} strokeWidth="1" strokeLinecap="round"
        strokeDasharray="2 8"
        initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.8 }}
        viewport={{ once: true }} transition={{ duration: 2.6, ease: EASE, delay: 1.1 }} />

      <motion.line x1="10" y1="226" x2="230" y2="226"
        stroke={C.ouro} strokeWidth="1" strokeOpacity="0.35"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.4 }} />
      <motion.text x="120" y="238" textAnchor="middle"
        fill={C.ouro} fillOpacity="0.55" fontSize="7.5" letterSpacing="3.5"
        style={{ fontFamily: "sans-serif", fontWeight: 700 }}
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={{ duration: 1, ease: EASE, delay: 2.0 }}>
        DOURO · PORTUGAL
      </motion.text>
    </svg>
  );
}

const STATS: [string, string][] = [
  ["+3", "roteiros"],
  ["UNESCO", "patrimônio"],
  ["Ano todo", "no seu ritmo"],
];

export default function CaminhosPortugalPortal() {
  return (
    <section
      id="caminhos-de-portugal"
      className="relative overflow-hidden"
      style={{ backgroundColor: C.porto }}
    >
      {/* Foto de fundo — vinhas do Douro, sutil */}
      <div
        className="absolute inset-0 scale-105 bg-cover bg-center opacity-[0.14]"
        style={{
          backgroundImage: `url('https://static.wixstatic.com/media/2d4f5b_edfea84f57b54f589aff44727039c42e~mv2.jpg/v1/fill/w_2000,h_1200,al_c,q_85,enc_avif,quality_auto/img.jpg')`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, ${C.porto} 0%, transparent 50%, ${C.porto} 100%)`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1180px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1fr_320px]">

          {/* Texto ─────────────────────────────────────────── */}
          <div>
            <motion.p
              className="mb-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em]"
              style={{ color: C.ouro }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <span className="h-px w-8" style={{ backgroundColor: `${C.ouro}60` }} />
              Caminhos de Portugal · Autoguiado
            </motion.p>

            <motion.h2
              className="font-display font-light leading-[1.03] tracking-[-0.025em]"
              style={{ fontSize: "clamp(2.4rem, 5.2vw, 4.2rem)", color: C.creme }}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, ease: EASE, delay: 0.1 }}
            >
              Do Douro a Santiago,{" "}
              <span className="italic" style={{ color: C.ouro }}>
                a pé e sem pressa
              </span>
            </motion.h2>

            <motion.p
              className="mt-5 max-w-[470px] text-[14px] font-light leading-relaxed"
              style={{ color: C.textSoft }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
            >
              Caminhadas autoguiadas pelo melhor de Portugal, das vinhas em socalcos do
              Vale do Douro à chegada na Catedral de Santiago. Você caminha no seu ritmo,
              com hospedagens, mapas e provas de vinho já resolvidos.
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
                    style={{ color: C.creme }}
                  >
                    {n}
                  </div>
                  <div
                    className="mt-1 text-[9px] font-medium uppercase tracking-[0.22em]"
                    style={{ color: `${C.ouro}cc` }}
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
                href="/caminhos-autoguiados"
                className="group/btn inline-flex items-center gap-2 rounded-full px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] transition-opacity duration-300 hover:opacity-80"
                style={{ backgroundColor: C.ouro, color: C.porto }}
              >
                Ver os roteiros
                <span className="transition-transform duration-300 group-hover/btn:translate-x-0.5">
                  →
                </span>
              </a>
              <a
                href="#contato"
                className="rounded-full border px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors duration-300"
                style={{ borderColor: `${C.ouro}45`, color: C.creme }}
              >
                Falar com especialista
              </a>
            </motion.div>
          </div>

          {/* Socalcos SVG ───────────────────────────────────── */}
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
          >
            <div className="h-[300px] w-full">
              <SocalcosDouro />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
