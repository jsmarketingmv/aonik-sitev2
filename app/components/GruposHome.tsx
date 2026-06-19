"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import WorldMapAONIK from "./WorldMapAONIK";
import CalendarWidget from "./CalendarWidget";
import { GRUPOS, datasDoAno } from "../lib/grupos";

const EASE = [0.16, 1, 0.3, 1] as const;

function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function GruposHome() {
  const [yearFilter, setYearFilter] = useState<2026 | 2027>(2026);

  const proximas = GRUPOS.filter(
    (g) => (datasDoAno(g, yearFilter).length) > 0,
  );

  const total2027 = GRUPOS.filter((g) => (g.dates2027?.length ?? 0) > 0).length;

  return (
    <section
      id="grupos-home"
      className="relative overflow-hidden bg-cream py-24 md:py-36"
    >
      {/* ── Cabeçalho ───────────────────────────────────── */}
      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <Reveal>
          <p className="mb-6 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em] text-gold">
            <span className="h-px w-8 bg-gold/50" />
            Grupos de Trekking pelo Mundo
          </p>
        </Reveal>

        <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <h2 className="max-w-2xl font-display text-[clamp(2.2rem,4.8vw,4rem)] font-light leading-[1.04] tracking-[-0.02em] text-forest">
              Caminhamos juntos
              <br />
              pelos{" "}
              <span className="italic text-gold">
                lugares mais
                <br />
                extraordinários
              </span>{" "}
              do planeta
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-col gap-3 md:items-end md:text-right">
              <p className="max-w-[280px] text-[13px] font-light leading-relaxed text-ink/55">
                Grupos pequenos, guia especializado, curadoria completa, do
                voo ao último dia de trilha.
              </p>
              <div className="mt-2 flex gap-8 md:justify-end">
                {(
                  [
                    ["7+", "destinos"],
                    ["12", "saídas/ano"],
                    ["≤12", "por grupo"],
                  ] as [string, string][]
                ).map(([n, l]) => (
                  <div key={l} className="text-center">
                    <div className="font-display text-[1.75rem] font-light leading-none text-forest">
                      {n}
                    </div>
                    <div className="mt-1 text-[9px] font-medium uppercase tracking-[0.22em] text-ink/40">
                      {l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── Mapa mundial interativo — ano controlado aqui ── */}
      <div className="w-full px-4 md:px-8">
        <WorldMapAONIK
          yearFilter={yearFilter}
          onYearChange={setYearFilter}
        />
      </div>

      {/* ── Calendário + lista ─────────────────────────────── */}
      <div className="mx-auto mt-12 max-w-[1180px] px-6 md:px-10">
        {/* Grid: calendário à esquerda, lista à direita em desktop */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
          {/* ── Calendário mini ─── */}
          <Reveal delay={0.05}>
            <CalendarWidget yearFilter={yearFilter} />
          </Reveal>

          {/* ── Lista de saídas ─── */}
          <div>
            <Reveal delay={0.08}>
              <div className="mb-8 flex items-end justify-between gap-4 border-b border-forest/[8%] pb-6">
                <div>
                  <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.32em] text-gold/70">
                    saídas confirmadas
                  </p>
                  <h3 className="font-display text-[clamp(1.7rem,3.2vw,2.8rem)] font-light leading-none tracking-[-0.02em] text-forest">
                    Próximas Saídas{" "}
                    <span className="text-gold">{yearFilter}</span>
                  </h3>
                </div>

                <div className="flex shrink-0 rounded-full border border-forest/15 bg-cream p-1">
                  {([2026, 2027] as const).map((y) => (
                    <button
                      key={y}
                      onClick={() => setYearFilter(y)}
                      className={`rounded-full px-5 py-2 text-[13px] font-semibold tracking-[0.04em] transition-all duration-200 ${
                        y === yearFilter
                          ? "bg-gold text-[#17150f]"
                          : "text-ink/35 hover:text-ink/60"
                      }`}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>

            <div className="divide-y divide-forest/[8%]">
              {proximas.map((g, i) => {
                const datas = datasDoAno(g, yearFilter);
                return (
                  <Reveal key={g.id} delay={0.12 + i * 0.07}>
                    <a
                      href={g.href}
                      className="group flex flex-col gap-3 py-5 transition-colors duration-300 hover:bg-forest/[3%] sm:flex-row sm:items-center"
                    >
                      {/* Miniatura */}
                      <div className="mr-4 hidden h-11 w-14 shrink-0 overflow-hidden rounded-md sm:block">
                        <div
                          className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                          style={{ backgroundImage: `url('${g.img}')` }}
                        />
                      </div>

                      {/* Bandeira + nome + local */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-base leading-none">
                            {g.flags.split(" ")[0]}
                          </span>
                          <span className="font-display text-[1.05rem] font-light leading-tight text-forest">
                            {g.title}
                          </span>
                          {g.status === "confirmada" && (
                            <span className="hidden rounded-full bg-forest/[8%] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-forest/60 sm:inline-block">
                              Confirmada
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 text-[11px] font-light text-ink/40">
                          {g.local}
                        </p>
                      </div>

                      {/* Pílulas de datas */}
                      <div className="flex flex-wrap gap-1.5 sm:mr-6">
                        {datas.map((d) => (
                          <span
                            key={d}
                            className={`rounded-full px-3 py-1 text-[11px] font-medium ${
                              g.status === "confirmada"
                                ? "bg-gold/[12%] text-gold"
                                : "border border-ink/[12%] text-ink/40"
                            }`}
                          >
                            {d}
                          </span>
                        ))}
                      </div>

                      {/* Preço */}
                      <span className="shrink-0 text-[12px] font-light text-ink/55 sm:mr-4">
                        {g.priceFrom.replace("a partir de ", "")}
                      </span>

                      {/* Seta */}
                      <span className="shrink-0 text-[14px] text-gold opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                        →
                      </span>
                    </a>
                  </Reveal>
                );
              })}
            </div>

            {/* ── CTA ─────────────────────────── */}
            <Reveal delay={0.5}>
              <div className="mt-10 flex flex-col items-start gap-5 border-t border-forest/[8%] pt-8 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[13px] font-light text-ink/45">
                  + {total2027} destinos confirmados para 2027
                </p>
                <a
                  href="/grupos"
                  className="group inline-flex items-center gap-3 rounded-full bg-forest px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-cream transition-colors duration-300 hover:bg-forest/85"
                >
                  Ver calendário completo
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
