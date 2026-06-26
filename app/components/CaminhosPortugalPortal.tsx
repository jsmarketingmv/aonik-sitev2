"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ── Paleta Caminhos de Portugal — terra, ouro e Atlântico ──
   diferencia do azul (Santiago) e do teal (Patagônia) ── */
const C = {
  porto:    "#1b0c12",   // fundo escuro quente (terra portuguesa)
  vinho:    "#3f1521",   // Vintage Wine
  ouro:     "#c4a56a",   // dourado (assinatura)
  ouroVivo: "#e3c98e",
  atlant:   "#5fa8b8",   // azul-Atlântico (contraste litoral)
  creme:    "#ede6dd",
  sage:     "#7a8f62",   // verde das vinhas e do interior
  textSoft: "rgba(237,230,221,0.62)",
};

/* ── Mapa de Portugal — o país inteiro, com seus contrastes ─────
   silhueta + Atlântico + pontos das experiências (norte ao sul) ── */
function MapaPortugal() {
  // silhueta estilizada de Portugal continental (norte em cima, Atlântico à esquerda)
  const PT =
    "M 100,44 C 122,40 144,42 160,48 C 156,64 168,70 162,86 " +
    "C 172,102 156,116 168,132 C 158,150 170,164 160,182 " +
    "C 168,196 162,208 166,216 C 150,224 128,226 110,222 " +
    "C 112,206 100,196 106,178 C 96,160 110,146 100,128 " +
    "C 110,110 96,96 106,78 C 98,66 96,56 100,44 Z";

  // ondas do Atlântico (à esquerda)
  const ondas = [
    "M 30,96 C 46,90 58,102 74,96",
    "M 26,140 C 42,134 54,146 70,140",
    "M 30,184 C 46,178 58,190 74,184",
  ];

  // pontos das experiências, do norte ao sul
  const pts = [
    { x: 150, y: 30,  label: "Santiago",  c: C.ouroVivo, star: true },
    { x: 138, y: 74,  label: "Douro",     c: C.ouro },
    { x: 112, y: 138, label: "Fátima",    c: C.creme },
    { x: 120, y: 198, label: "Vicentina", c: C.atlant },
  ];

  return (
    <svg viewBox="0 0 240 270" className="h-full w-full" style={{ overflow: "visible" }}>
      {/* halo */}
      <motion.circle cx="130" cy="135" r="108" fill={C.ouro} fillOpacity={0.05}
        initial={{ scale: 0.85, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }} transition={{ duration: 1.4, ease: EASE, delay: 0.2 }} />

      {/* Atlântico */}
      {ondas.map((d, i) => (
        <motion.path key={i} d={d} fill="none" stroke={C.atlant} strokeWidth="1.4"
          strokeLinecap="round" strokeOpacity="0.55"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1, x: [0, -6, 0] }}
          viewport={{ once: true }}
          transition={{
            pathLength: { duration: 1.4, ease: EASE, delay: 0.5 + i * 0.15 },
            opacity: { duration: 1, delay: 0.5 + i * 0.15 },
            x: { duration: 9 + i * 2, repeat: Infinity, ease: "easeInOut" },
          }} />
      ))}

      {/* preenchimento sutil do país */}
      <motion.path d={PT} fill={C.ouro} fillOpacity={0.06}
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.7 }} />
      {/* contorno de Portugal — traço que se desenha */}
      <motion.path d={PT} fill="none" stroke={C.ouro} strokeWidth="1.8" strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }} transition={{ duration: 3, ease: EASE, delay: 0.6 }} />

      {/* pontos das experiências */}
      {pts.map((p, i) => (
        <motion.g key={p.label}
          initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE, delay: 1.6 + i * 0.25 }}>
          <motion.circle cx={p.x} cy={p.y} r="5" fill="none" stroke={p.c} strokeWidth="1"
            animate={{ r: [5, 13, 5], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut", delay: i * 0.5 }} />
          <circle cx={p.x} cy={p.y} r={p.star ? 3.4 : 3} fill={p.c} />
          <text x={p.x + 10} y={p.y + 3.5} fill={C.creme} fontSize="9.5" letterSpacing="0.4"
            style={{ fontFamily: "'Fraunces', Georgia, serif" }}>{p.label}</text>
        </motion.g>
      ))}

      <motion.text x="130" y="262" textAnchor="middle"
        fill={C.ouro} fillOpacity="0.6" fontSize="8" letterSpacing="4.5"
        style={{ fontFamily: "sans-serif", fontWeight: 700 }}
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={{ duration: 1, ease: EASE, delay: 2.4 }}>
        PORTUGAL
      </motion.text>
    </svg>
  );
}

const STATS: [string, string][] = [
  ["+5", "roteiros"],
  ["Norte ao sul", "do país"],
  ["Ano todo", "no seu ritmo"],
];

export default function CaminhosPortugalPortal() {
  return (
    <section
      id="caminhos-de-portugal"
      className="relative overflow-hidden"
      style={{ backgroundColor: C.porto }}
    >
      {/* Foto de fundo — paisagem portuguesa, sutil */}
      <div
        className="absolute inset-0 scale-105 bg-cover bg-center opacity-[0.13]"
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
              Um país inteiro para{" "}
              <span className="italic" style={{ color: C.ouro }}>
                atravessar devagar
              </span>
            </motion.h2>

            <motion.p
              className="mt-5 max-w-[480px] text-[14px] font-light leading-relaxed"
              style={{ color: C.textSoft }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
            >
              Das falésias selvagens do Atlântico às vinhas em socalcos do Douro, dos caminhos de
              fé às aldeias de pedra. Portugal é um país de contrastes, e a melhor forma de senti-lo
              é a pé, no seu ritmo, com tudo já resolvido.
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
                Conhecer Portugal a pé
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

          {/* Mapa SVG ───────────────────────────────────────── */}
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
          >
            <div className="h-[320px] w-full">
              <MapaPortugal />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
