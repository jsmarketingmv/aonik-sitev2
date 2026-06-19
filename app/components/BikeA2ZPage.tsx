"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Nav from "./Nav";
import Footer from "./Footer";
import Contato from "./Contato";
import FloatingActions from "./FloatingActions";
import { Reveal, Kicker, EASE } from "./ui";

export type DiaBike = {
  dia: string;
  titulo: string;
  km?: string;
  desc: string;
  hotel?: string;
};

export type A2ZBikeData = {
  nome: string;
  subtitulo: string;
  heroImg: string;
  precoBase: string;
  quote: string;
  descricao: string;
  stats: { valor: string; label: string }[];
  dias: DiaBike[];
  galeria: string[];
  inclusos: string[];
  naoInclusos: string[];
  temporadas: {
    regular: { label: string; preco: string; single: string };
    alta: { label: string; preco: string; single: string };
    partidas: string;
    stopSales?: string;
  };
  pal: {
    bg: string;
    dark: string;
    accent: string;
    granito: string;
    creme: string;
    cremeDp: string;
  };
};

export default function BikeA2ZPage({ d }: { d: A2ZBikeData }) {
  const [season, setSeason] = useState<"r" | "a">("r");
  const tem = season === "r" ? d.temporadas.regular : d.temporadas.alta;

  return (
    <main style={{ backgroundColor: d.pal.creme }}>
      <Nav />

      {/* HERO */}
      <section
        className="grain relative flex min-h-[100svh] w-full items-end overflow-hidden"
        style={{ backgroundColor: d.pal.bg }}
      >
        <div
          className="absolute inset-0 scale-105 bg-cover bg-center"
          style={{ backgroundImage: `url('${d.heroImg}')` }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${d.pal.bg} 0%, ${d.pal.bg}99 28%, ${d.pal.bg}44 55%, transparent 80%)`,
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-[1180px] px-6 pb-20 md:px-10 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          >
            <Kicker color="" line="">
              <span style={{ color: d.pal.accent }}>—</span>
              <span style={{ color: `${d.pal.creme}99` }}>{d.subtitulo}</span>
            </Kicker>
            <h1
              className="mt-3 font-display font-light uppercase leading-[0.85] tracking-[-0.02em]"
              style={{ fontSize: "clamp(3rem,10vw,8rem)", color: d.pal.creme }}
            >
              {d.nome}
            </h1>

            <div className="mt-5 flex flex-wrap gap-7">
              {d.stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-xl font-light" style={{ color: d.pal.creme }}>
                    {s.valor}
                  </p>
                  <p
                    className="text-[10px] uppercase tracking-[0.14em]"
                    style={{ color: d.pal.granito }}
                  >
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <div>
                <span className="mr-1 text-sm" style={{ color: d.pal.granito }}>
                  a partir de
                </span>
                <span className="font-display text-2xl font-light" style={{ color: d.pal.creme }}>
                  {d.precoBase}
                </span>
              </div>
              <a
                href="#tarifas"
                className="rounded-full px-7 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] transition-transform hover:scale-[1.03]"
                style={{ backgroundColor: d.pal.accent, color: "#fff" }}
              >
                Ver tarifas →
              </a>
              <a
                href="#contato"
                className="rounded-full border px-7 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] transition-opacity hover:opacity-80"
                style={{ borderColor: `${d.pal.creme}30`, color: d.pal.creme }}
              >
                Solicitar proposta
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DESCRICAO */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ backgroundColor: d.pal.creme }}>
        <div className="mx-auto max-w-[860px]">
          <Reveal>
            <Kicker>Portugal · Autoguiado · Bike</Kicker>
          </Reveal>
          <Reveal delay={0.08}>
            <p
              className="mt-6 font-display font-light leading-[1.3] tracking-[-0.01em]"
              style={{ fontSize: "clamp(1.4rem,2.8vw,2.1rem)", color: "#1a1714" }}
            >
              {d.quote}
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <p
              className="mt-5 max-w-2xl text-[15px] font-light leading-relaxed"
              style={{ color: "rgba(26,23,20,0.58)" }}
            >
              {d.descricao}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ITINERARIO */}
      <section className="px-6 py-24 md:px-10 md:py-28" style={{ backgroundColor: d.pal.dark }}>
        <div className="mx-auto max-w-[1180px]">
          <Reveal>
            <Kicker color="" line="">
              <span style={{ color: d.pal.accent }}>—</span>
              <span style={{ color: d.pal.granito }}>Dia a dia</span>
            </Kicker>
          </Reveal>
          <Reveal delay={0.06}>
            <h2
              className="mt-3 font-display font-light"
              style={{ fontSize: "clamp(1.8rem,4vw,3rem)", color: d.pal.creme }}
            >
              Itinerario
            </h2>
          </Reveal>

          <div
            className="mt-10 divide-y"
            style={{ borderColor: `${d.pal.accent}20` }}
          >
            {d.dias.map((dia, i) => (
              <Reveal key={dia.dia} delay={Math.min(i * 0.035, 0.25)}>
                <div className="grid grid-cols-[90px_1fr] gap-5 py-5 md:grid-cols-[130px_1fr]">
                  <div>
                    <p
                      className="text-[10px] font-bold uppercase tracking-[0.15em]"
                      style={{ color: d.pal.accent }}
                    >
                      {dia.dia}
                    </p>
                    {dia.km && (
                      <p className="mt-0.5 text-[11px]" style={{ color: d.pal.granito }}>
                        {dia.km}
                      </p>
                    )}
                  </div>
                  <div>
                    <h3
                      className="font-display text-[1.05rem] font-light leading-tight"
                      style={{ color: d.pal.creme }}
                    >
                      {dia.titulo}
                    </h3>
                    <p
                      className="mt-1.5 text-[13px] font-light leading-relaxed"
                      style={{ color: d.pal.granito }}
                    >
                      {dia.desc}
                    </p>
                    {dia.hotel && (
                      <p
                        className="mt-1.5 text-[11px]"
                        style={{ color: `${d.pal.granito}70` }}
                      >
                        Hospedagem: {dia.hotel}
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GALERIA */}
      {d.galeria.length > 0 && (
        <section className="px-6 pb-20 md:px-10" style={{ backgroundColor: d.pal.dark }}>
          <div className="mx-auto max-w-[1180px]">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {d.galeria.slice(0, 4).map((img, i) => (
                <Reveal key={img} delay={i * 0.06}>
                  <div
                    className="aspect-[3/2] overflow-hidden rounded-xl bg-cover bg-center"
                    style={{ backgroundImage: `url('${img}')` }}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* INCLUSO / NAO INCLUSO */}
      <section className="px-6 py-24 md:px-10 md:py-28" style={{ backgroundColor: d.pal.cremeDp }}>
        <div className="mx-auto max-w-[1180px]">
          <Reveal>
            <Kicker>O que esta incluido</Kicker>
          </Reveal>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <Reveal delay={0.06}>
              <div>
                <h3 className="font-display text-xl font-light" style={{ color: "#1a1714" }}>
                  Incluso
                </h3>
                <ul className="mt-5 space-y-2.5">
                  {d.inclusos.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[14px] font-light"
                      style={{ color: "rgba(26,23,20,0.65)" }}
                    >
                      <span
                        className="mt-0.5 shrink-0 font-bold"
                        style={{ color: d.pal.accent }}
                      >
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <h3 className="font-display text-xl font-light" style={{ color: "#1a1714" }}>
                  Nao incluso
                </h3>
                <ul className="mt-5 space-y-2.5">
                  {d.naoInclusos.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[14px] font-light"
                      style={{ color: "rgba(26,23,20,0.65)" }}
                    >
                      <span className="mt-0.5 shrink-0 opacity-40">✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TARIFAS */}
      <section id="tarifas" className="px-6 py-24 md:px-10 md:py-28" style={{ backgroundColor: d.pal.dark }}>
        <div className="mx-auto max-w-[900px]">
          <Reveal>
            <Kicker color="" line="">
              <span style={{ color: d.pal.accent }}>—</span>
              <span style={{ color: d.pal.granito }}>Valores 2026</span>
            </Kicker>
          </Reveal>
          <Reveal delay={0.06}>
            <h2
              className="mt-3 font-display font-light"
              style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: d.pal.creme }}
            >
              Tarifas
            </h2>
          </Reveal>

          {/* Toggle temporada */}
          <Reveal delay={0.1}>
            <div
              className="mt-8 inline-flex rounded-full border p-1"
              style={{ borderColor: `${d.pal.accent}35` }}
            >
              {(
                [
                  ["r", "Temporada Regular"],
                  ["a", "Alta Temporada"],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setSeason(key)}
                  className="rounded-full px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition-all duration-300"
                  style={
                    season === key
                      ? { backgroundColor: d.pal.accent, color: "#fff" }
                      : { color: d.pal.granito }
                  }
                >
                  {label}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <div
              className="mt-6 rounded-xl border p-7 md:p-9"
              style={{
                borderColor: `${d.pal.accent}22`,
                backgroundColor: `${d.pal.accent}09`,
              }}
            >
              <p
                className="text-[10px] uppercase tracking-[0.16em]"
                style={{ color: d.pal.granito }}
              >
                {tem.label}
              </p>
              <div className="mt-5 flex flex-wrap items-end gap-10">
                <div>
                  <p className="mb-1 text-sm" style={{ color: d.pal.granito }}>
                    Por pessoa (quarto duplo)
                  </p>
                  <p
                    className="font-display font-light"
                    style={{ fontSize: "clamp(2.2rem,5vw,3.5rem)", color: d.pal.creme }}
                  >
                    {tem.preco}
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-sm" style={{ color: d.pal.granito }}>
                    Supl. quarto individual
                  </p>
                  <p className="font-display text-2xl font-light" style={{ color: d.pal.creme }}>
                    + {tem.single}
                  </p>
                </div>
              </div>
              <div
                className="mt-6 flex flex-wrap gap-8 border-t pt-6"
                style={{ borderColor: `${d.pal.accent}18` }}
              >
                <div>
                  <p
                    className="text-[10px] uppercase tracking-[0.14em]"
                    style={{ color: d.pal.granito }}
                  >
                    Partidas
                  </p>
                  <p
                    className="mt-1 text-sm font-light"
                    style={{ color: `${d.pal.creme}cc` }}
                  >
                    {d.temporadas.partidas}
                  </p>
                </div>
                {d.temporadas.stopSales && (
                  <div>
                    <p
                      className="text-[10px] uppercase tracking-[0.14em]"
                      style={{ color: d.pal.granito }}
                    >
                      Stop Sales
                    </p>
                    <p
                      className="mt-1 text-sm font-light"
                      style={{ color: `${d.pal.creme}cc` }}
                    >
                      {d.temporadas.stopSales}
                    </p>
                  </div>
                )}
                <div>
                  <p
                    className="text-[10px] uppercase tracking-[0.14em]"
                    style={{ color: d.pal.granito }}
                  >
                    Minimo
                  </p>
                  <p
                    className="mt-1 text-sm font-light"
                    style={{ color: `${d.pal.creme}cc` }}
                  >
                    2 participantes
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <p
              className="mt-4 text-xs font-light"
              style={{ color: `${d.pal.granito}77` }}
            >
              Precos por pessoa em quarto duplo. Bicicleta hibrida, transferencia de bagagem e app GPS inclusos.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <a
              href="#contato"
              className="mt-8 inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition-all hover:scale-[1.03]"
              style={{ backgroundColor: d.pal.accent, color: "#fff" }}
            >
              Solicitar proposta →
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
