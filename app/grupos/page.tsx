"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Contato from "../components/Contato";
import FloatingActions from "../components/FloatingActions";
import { Reveal, Kicker, EASE } from "../components/ui";
import { GRUPOS, EM_BREVE, datasDoAno } from "../lib/grupos";
import { AONIK } from "../lib/contato";

// Personalidade do segmento: calor da coletividade (ember/âmbar)
const EMBER = "#d98c4a";

const HERO_IMG =
  "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2600&auto=format&fit=crop";

// Colagem editorial — placeholders verificados (Juliano troca pelas reais)
const U = "https://images.unsplash.com/photo-";
const GALERIA_GRUPOS = [
  { src: `${U}1551632811-561732d1e306?q=80&w=1400&auto=format&fit=crop`, cls: "col-span-12 sm:col-span-8 h-64 md:h-96" },
  { src: `${U}1454496522488-7a8e488e8606?q=80&w=900&auto=format&fit=crop`, cls: "col-span-12 sm:col-span-4 h-64 md:h-96" },
  { src: `${U}1500514966906-fe245eea9344?q=80&w=900&auto=format&fit=crop`, cls: "col-span-6 sm:col-span-4 h-44 md:h-64" },
  { src: `${U}1469474968028-56623f02e42e?q=80&w=900&auto=format&fit=crop`, cls: "col-span-6 sm:col-span-4 h-44 md:h-64" },
  { src: `${U}1518780664697-55e3ad937233?q=80&w=900&auto=format&fit=crop`, cls: "col-span-12 sm:col-span-4 h-44 md:h-64" },
  { src: `${U}1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop`, cls: "col-span-7 h-52 md:h-80" },
  { src: `${U}1517649763962-0c623066013b?q=80&w=900&auto=format&fit=crop`, cls: "col-span-5 h-52 md:h-80" },
];

const BENEFICIOS = [
  { t: "Grupos pequenos", d: "Saídas com poucas pessoas. Intimidade e ritmo de turma, nunca multidão." },
  { t: "Guia especialista", d: "Um líder AONIK que já caminhou cada trecho, do primeiro col ao último brinde." },
  { t: "Tudo resolvido", d: "Logística, hospedagem, transfers, bagagem, seguro. Você só precisa caminhar." },
  { t: "Amizades que ficam", d: "A montanha aproxima. Muita gente parte sozinha e volta com uma turma pra vida." },
  { t: "Segurança", d: "Rastreador satelital, seguro aventura e apoio em cada etapa do caminho." },
  { t: "Saídas confirmadas", d: "Datas garantidas no calendário. É só escolher a sua e reservar a vaga." },
];

// ---------- O GLOBO COM ROTAS (assinatura do segmento Grupos) ----------
const G_CX = 170,
  G_CY = 170,
  G_R = 140;
const DESTS = [
  { x: 100, y: 100, label: "Portugal" },
  { x: 188, y: 70, label: "Alpes" },
  { x: 262, y: 150, label: "Jordânia" },
  { x: 118, y: 232, label: "Brasil" },
  { x: 145, y: 288, label: "Patagônia" },
];
const ROUTE = [4, 3, 0, 1, 2]; // Patagônia → Brasil → Portugal → Alpes → Jordânia
function arcD(a: (typeof DESTS)[number], b: (typeof DESTS)[number]) {
  const mx = (a.x + b.x) / 2,
    my = (a.y + b.y) / 2;
  const ox = mx + (mx - G_CX) * 0.18,
    oy = my + (my - G_CY) * 0.18;
  return `M${a.x},${a.y} Q${ox.toFixed(1)},${oy.toFixed(1)} ${b.x},${b.y}`;
}

function GlobeRoutes() {
  return (
    <svg viewBox="-52 -30 444 430" className="h-full w-full">
      {/* graticule (curvas do globo) */}
      <circle cx={G_CX} cy={G_CY} r={G_R} fill="none" stroke="rgba(245,241,232,0.18)" strokeWidth="1" />
      <ellipse cx={G_CX} cy={G_CY} rx={G_R} ry="22" fill="none" stroke="rgba(245,241,232,0.13)" strokeWidth="1" />
      <ellipse cx={G_CX} cy="80" rx="107" ry="17" fill="none" stroke="rgba(245,241,232,0.1)" strokeWidth="1" />
      <ellipse cx={G_CX} cy="260" rx="107" ry="17" fill="none" stroke="rgba(245,241,232,0.1)" strokeWidth="1" />
      <ellipse cx={G_CX} cy={G_CY} rx="90" ry={G_R} fill="none" stroke="rgba(245,241,232,0.1)" strokeWidth="1" />
      <line x1={G_CX} y1={G_CY - G_R} x2={G_CX} y2={G_CY + G_R} stroke="rgba(245,241,232,0.1)" strokeWidth="1" />

      {/* rotas (percursos pelo mundo) */}
      {ROUTE.slice(0, -1).map((idx, i) => (
        <motion.path
          key={i}
          d={arcD(DESTS[idx], DESTS[ROUTE[i + 1]])}
          fill="none"
          stroke={EMBER}
          strokeWidth="2"
          strokeDasharray="2 6"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.5 + i * 0.3 }}
        />
      ))}

      {/* destinos */}
      {DESTS.map((d) => {
        const right = d.x > G_CX;
        return (
          <g key={d.label}>
            <circle cx={d.x} cy={d.y} r="5" fill={EMBER} />
            <circle cx={d.x} cy={d.y} r="10" fill="none" stroke={EMBER} strokeWidth="1" opacity="0.4" />
            <text
              x={right ? d.x + 16 : d.x - 16}
              y={d.y}
              fill="rgba(245,241,232,0.8)"
              fontSize="12.5"
              letterSpacing="1.5"
              textAnchor={right ? "start" : "end"}
              dominantBaseline="middle"
              style={{ textTransform: "uppercase" }}
            >
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function GruposPage() {
  return (
    <main className="relative bg-cream">
      <Nav />

      {/* HERO — o globo com rotas */}
      <section className="grain relative flex min-h-[100svh] w-full items-center overflow-hidden bg-forest">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url('${HERO_IMG}')` }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 32% 50%, transparent 28%, #0d2a1f 80%)" }}
        />

        <div className="relative z-10 mx-auto grid w-full max-w-[1400px] items-center gap-10 px-6 py-28 md:grid-cols-2 md:px-10">
          {/* Editorial */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.2 }}
              className="flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.32em]"
              style={{ color: EMBER }}
            >
              <span className="h-px w-8" style={{ background: EMBER }} />
              Segmento · Grupos pelo mundo
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
              className="mt-4 font-display text-[clamp(3rem,9vw,8rem)] font-light uppercase leading-[0.85] tracking-[-0.02em] text-cream"
            >
              Grupos
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.5 }}
              className="mt-6 max-w-md text-base font-light leading-relaxed text-cream/75 md:text-lg"
            >
              Saídas guiadas pelos cantos mais bonitos do planeta. Você parte
              sozinho e volta com uma{" "}
              <span className="text-cream">turma pra vida</span>.
            </motion.p>
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.65 }}
              href="#calendario"
              className="mt-8 inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] text-forest transition-transform duration-300 hover:scale-[1.03]"
              style={{ background: EMBER }}
            >
              Ver o calendário <span>→</span>
            </motion.a>
          </div>

          {/* O GLOBO */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
            className="mx-auto aspect-square w-full max-w-[440px]"
          >
            <GlobeRoutes />
          </motion.div>
        </div>

        {/* legenda */}
        <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[11px] uppercase tracking-[0.2em] text-cream/55">
          Alpes · Dolomitas · Patagônia · Jordânia · Portugal · Brasil
        </div>
      </section>

      {/* POR QUE EM GRUPO */}
      <section className="bg-cream px-6 py-24 text-ink md:px-10 md:py-32">
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-14 max-w-2xl">
            <Reveal>
              <Kicker color="text-[#d98c4a]" line="bg-[#d98c4a]/50">
                Por que em grupo
              </Kicker>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1] tracking-[-0.01em] text-forest">
                Ninguém esquece quem{" "}
                <span className="italic" style={{ color: EMBER }}>
                  caminhou junto
                </span>
              </h2>
            </Reveal>
          </div>
          <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFICIOS.map((b, i) => (
              <Reveal key={b.t} delay={i * 0.05}>
                <div className="border-t border-forest/15 pt-6">
                  <span className="font-display text-sm" style={{ color: EMBER }}>
                    0{i + 1}
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-light text-forest">
                    {b.t}
                  </h3>
                  <p className="mt-3 text-[15px] font-light leading-relaxed text-ink/60">
                    {b.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GALERIA — momentos de grupo */}
      <section className="bg-forest px-6 py-24 text-cream md:px-10 md:py-32">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-12 max-w-2xl">
            <Reveal>
              <Kicker color="text-[#d98c4a]" line="bg-[#d98c4a]/50">
                A turma · momentos de grupo
              </Kicker>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1] tracking-[-0.01em]">
                O que não cabe numa foto,{" "}
                <span className="italic" style={{ color: EMBER }}>
                  mas a gente tenta
                </span>
              </h2>
            </Reveal>
          </div>
          <div className="grid grid-cols-12 gap-3 md:gap-4">
            {GALERIA_GRUPOS.map((g, i) => (
              <Reveal key={i} delay={(i % 4) * 0.05} className={g.cls}>
                <div className="group relative h-full overflow-hidden rounded-xl">
                  <div
                    className="absolute inset-0 scale-105 bg-cover bg-center transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100"
                    style={{ backgroundImage: `url('${g.src}')` }}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CALENDÁRIO */}
      <Calendario />

      {/* EM BREVE */}
      <section className="bg-cream px-6 py-20 text-ink md:px-10 md:py-24">
        <div className="mx-auto max-w-[1180px]">
          <Reveal>
            <Kicker color="text-[#d98c4a]" line="bg-[#d98c4a]/50">
              Em estudo · próximas saídas
            </Kicker>
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-3">
            {EM_BREVE.map((e) => (
              <span
                key={e.title}
                className="inline-flex items-center gap-2 rounded-full border border-forest/15 px-4 py-2 text-[13px] font-light text-ink/70"
              >
                <span>{e.flag}</span> {e.title}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* MONTE SEU GRUPO */}
      <section className="bg-forest px-6 py-20 text-cream md:px-10 md:py-28">
        <div className="mx-auto max-w-[860px] text-center">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: EMBER }}>
              Sob medida
            </p>
            <h2 className="mt-5 font-display text-[clamp(1.8rem,3.6vw,2.8rem)] font-light leading-[1.15]">
              Tem uma turma e um sonho? Monte seu grupo
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] font-light leading-relaxed text-cream/65">
              Família, amigos, sua agência. A gente desenha uma saída exclusiva no
              destino que vocês quiserem, na data de vocês.
            </p>
            <a
              href={`https://wa.me/${AONIK.whatsapp}?text=${encodeURIComponent("Quero montar um GRUPO exclusivo. Destino de interesse: ")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] text-forest transition-transform duration-300 hover:scale-[1.03]"
              style={{ background: EMBER }}
            >
              Montar meu grupo <span>→</span>
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

function Calendario() {
  const [ano, setAno] = useState<2026 | 2027>(2026);
  const lista = GRUPOS.filter((g) => datasDoAno(g, ano).length > 0);

  return (
    <section id="calendario" className="scroll-mt-24 bg-cream-deep px-6 py-24 text-ink md:px-10 md:py-32">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <Kicker color="text-[#d98c4a]" line="bg-[#d98c4a]/50">
              Calendário de saídas
            </Kicker>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,4vw,3.2rem)] font-light leading-[1.05] tracking-[-0.01em] text-forest">
              Escolha sua data
            </h2>
          </Reveal>
          {/* Toggle de ano */}
          <Reveal delay={0.1}>
            <div className="inline-flex rounded-full border border-forest/15 bg-cream p-1">
              {([2026, 2027] as const).map((y) => (
                <button
                  key={y}
                  onClick={() => setAno(y)}
                  className={`rounded-full px-6 py-2.5 text-[14px] font-semibold tracking-[0.05em] transition-all ${
                    ano === y ? "text-forest" : "text-ink/45 hover:text-ink/70"
                  }`}
                  style={ano === y ? { background: EMBER } : undefined}
                >
                  {y}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Linhas */}
        <div className="border-t border-forest/15">
          {lista.map((g, i) => {
            const datas = datasDoAno(g, ano);
            return (
              <Reveal key={g.id} delay={i * 0.04}>
                <div className="grid grid-cols-1 items-center gap-5 border-b border-forest/15 py-7 md:grid-cols-[1.6fr_1.6fr_1fr_auto] md:gap-8">
                  {/* destino */}
                  <a href={g.href} className="group flex items-center gap-4">
                    <div
                      className="h-16 w-16 shrink-0 rounded-lg bg-cover bg-center"
                      style={{ backgroundImage: `url('${g.img}')` }}
                    />
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.14em] text-ink/45">
                        {g.flags} · {g.duration}
                      </p>
                      <h3 className="font-display text-2xl font-light text-forest transition-colors group-hover:text-[#d98c4a]">
                        {g.title}
                      </h3>
                      <p className="text-[12px] font-light text-ink/50">{g.local}</p>
                    </div>
                  </a>

                  {/* datas */}
                  <div className="flex flex-wrap gap-2">
                    {datas.map((d) => (
                      <span
                        key={d}
                        className="rounded-full border border-forest/20 bg-cream px-3 py-1.5 text-[13px] font-medium text-forest"
                      >
                        {d}
                      </span>
                    ))}
                  </div>

                  {/* preço + status */}
                  <div>
                    <p className="text-[14px] font-light text-ink/70">{g.priceFrom}</p>
                    <span
                      className={`mt-1 inline-block text-[11px] font-semibold uppercase tracking-[0.12em] ${
                        g.status === "confirmada" ? "text-forest" : "text-ink/40"
                      }`}
                    >
                      {g.status === "confirmada" ? "● Saída confirmada" : "○ A confirmar"}
                    </span>
                  </div>

                  {/* CTA */}
                  <a
                    href="#contato"
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-forest px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-cream transition-all duration-300 hover:bg-forest-soft"
                  >
                    Reservar vaga →
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
        <p className="mt-6 text-[13px] font-light text-ink/45">
          Clique no destino para conhecer a viagem · {lista.length} saídas em {ano}
        </p>
      </div>
    </section>
  );
}
