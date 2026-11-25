"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "./Nav";
import Breadcrumb from "./Breadcrumb";
import Footer from "./Footer";
import Contato from "./Contato";
import FloatingActions from "./FloatingActions";
import { Reveal, EASE } from "./ui";
import { DISPONIBILIDADE, type ProgramaInterior } from "../lib/caminhoInterior";

/* Paleta do Caminho Interior: o azul e o amarelo das placas da rota, sobre o verde da marca */
const C = {
  azul: "#163a7a",
  azulSoft: "#2a56a6",
  seta: "#f4c21b",
  noite: "#04201f",
  granito: "#0b2b2a",
  creme: "#efe7da",
  claro: "#f6f2ea",
  textSoft: "rgba(239,231,218,0.72)",
  textFaint: "rgba(239,231,218,0.5)",
  linha: "rgba(239,231,218,0.14)",
  tinta: "#0d1d1c",
};

function Seta({ cor = C.seta, tam = 14 }: { cor?: string; tam?: number }) {
  return (
    <svg width={tam} height={tam} viewBox="0 0 24 24" aria-hidden fill={cor}>
      <path d="M2 12 L12 4 L12 9 L22 9 L22 15 L12 15 L12 20 Z" />
    </svg>
  );
}

function Vieira({ cor = C.seta, tam = 22 }: { cor?: string; tam?: number }) {
  return (
    <svg width={tam} height={tam} viewBox="0 0 32 32" aria-hidden fill="none" stroke={cor} strokeWidth="1.6" strokeLinecap="round">
      <path d="M16 28 C 8 22, 4 16, 6 8 C 10 4, 22 4, 26 8 C 28 16, 24 22, 16 28 Z" />
      <path d="M16 28 L 9 8 M16 28 L 13 6 M16 28 L 16 5 M16 28 L 19 6 M16 28 L 23 8" />
    </svg>
  );
}

export default function CaminhoInteriorPage({ prog }: { prog: ProgramaInterior }) {
  const [modo, setModo] = useState<"resumido" | "completo">("resumido");
  const [interesse, setInteresse] = useState(prog.interesse);
  const totalSobe = prog.etapas.reduce((s, e) => s + e.sobe, 0);
  const maxKm = Math.max(...prog.etapas.map((e) => parseFloat(e.km.replace(",", "."))));

  const escolher = (i: string) => {
    setInteresse(i);
    document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
  };

  const stats = [
    { v: `${prog.dias} dias`, l: `${prog.noites} noites` },
    { v: prog.km, l: "do início a Santiago" },
    { v: `${prog.etapas.length} etapas`, l: "a pé" },
    { v: `+${totalSobe.toLocaleString("pt-BR")} m`, l: "de subida acumulada" },
    { v: "Moderada", l: "a exigente" },
  ];

  return (
    <main className="relative" style={{ background: C.noite, color: C.creme }}>
      <Nav />

      {/* ===== HERO ===== */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden">
        <motion.div className="absolute inset-0" initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 2.4, ease: EASE }}>
          <Image src={prog.capa} alt={`${prog.nome} ${prog.desde}`} fill preload sizes="100vw" className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,32,31,0.9)_0%,rgba(4,32,31,0.55)_45%,rgba(4,32,31,0.1)_80%)]" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#04201f] to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 pb-14 pt-32 md:px-10 md:pb-20">
          <Breadcrumb tone="dark" accent={C.seta} items={[
            { label: "Home", href: "/" },
            { label: "Peregrinação", href: "/jornada" },
            { label: `${prog.nome} ${prog.desde}` },
          ]} />
          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            className="mt-8 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: C.seta }}
          >
            <Vieira tam={18} /> Caminho de Santiago · Caminho Português
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.4 }}
            className="mt-4 font-sans font-extrabold leading-[0.92] tracking-[-0.035em]"
            style={{ fontSize: "clamp(2.6rem, 6.4vw, 6rem)" }}
          >
            Caminho
            <br />
            Português Interior
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
            className="mt-3 font-display text-[clamp(1.3rem,2.4vw,2rem)] italic" style={{ color: C.seta }}
          >
            {prog.desde}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.65 }}
            className="mt-5 max-w-2xl text-[15px] font-light leading-relaxed md:text-[17px]" style={{ color: C.textSoft }}
          >
            {prog.subtitulo}
          </motion.p>

          <motion.dl
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.75 }}
            className="mt-8 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-5 border-t pt-6 sm:grid-cols-5" style={{ borderColor: C.linha }}
          >
            {stats.map((s) => (
              <div key={s.l}>
                <dt className="font-sans text-[1.35rem] font-bold tracking-[-0.02em] text-cream">{s.v}</dt>
                <dd className="mt-0.5 text-[11px] uppercase tracking-[0.14em]" style={{ color: C.textFaint }}>{s.l}</dd>
              </div>
            ))}
          </motion.dl>

          {/* Escolha do formato */}
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.85 }}
            className={`mt-9 grid max-w-3xl gap-3 ${prog.grupo ? "sm:grid-cols-2" : ""}`}
          >
            {prog.grupo && prog.interesseGrupo && (
              <button
                type="button"
                onClick={() => escolher(prog.interesseGrupo!)}
                className="group rounded-2xl border p-5 text-left transition-colors hover:bg-white/[0.06]"
                style={{ borderColor: C.seta, background: "rgba(244,194,27,0.08)" }}
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: C.seta }}>Grupo guiado AONIK</span>
                  <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em]" style={{ background: C.seta, color: C.tinta }}>Em breve</span>
                </span>
                <span className="mt-2 block font-sans text-[1.35rem] font-bold">{prog.grupo.periodo}</span>
                <span className="mt-1 block text-[13px]" style={{ color: C.textSoft }}>Datas e tarifa em breve. Pré-lista aberta.</span>
                <span className="mt-4 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: C.seta }}>
                  Entrar na pré-lista <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </button>
            )}
            <button
              type="button"
              onClick={() => escolher(prog.interesse)}
              className="group rounded-2xl border p-5 text-left transition-colors hover:bg-white/[0.06]"
              style={{ borderColor: C.linha, background: "rgba(255,255,255,0.03)" }}
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: C.textFaint }}>Autoguiado · no seu ritmo</span>
              <span className="mt-2 flex items-baseline gap-2">
                <span className="text-[11px] uppercase tracking-[0.16em]" style={{ color: C.textFaint }}>a partir de</span>
                <span className="font-sans text-[1.35rem] font-bold">{prog.preco}</span>
              </span>
              <span className="mt-1 block text-[13px]" style={{ color: C.textSoft }}>Saídas o ano todo, a partir de 2 pessoas.</span>
              <span className="mt-4 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em] text-cream">
                Pedir proposta <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* ===== SOBRE + DESTAQUES ===== */}
      <section className="px-6 py-20 md:px-10 md:py-28" style={{ background: C.claro, color: C.tinta }}>
        <div className="mx-auto grid max-w-[1280px] gap-12 md:grid-cols-[1.15fr_1fr] md:gap-20">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: C.azul }}>
              <Seta cor={C.seta} /> Sobre o programa
            </p>
            <h2 className="mt-4 font-sans text-[clamp(1.8rem,3.4vw,2.8rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
              O Caminho de Santiago
              <br />
              <span style={{ color: C.azul }}>longe das multidões</span>
            </h2>
            {prog.sobre.map((t) => (
              <p key={t.slice(0, 20)} className="mt-5 text-[15.5px] font-light leading-relaxed" style={{ color: "rgba(13,29,28,0.75)" }}>{t}</p>
            ))}
            <p className="mt-5 text-[15.5px] font-light leading-relaxed" style={{ color: "rgba(13,29,28,0.75)" }}>
              No formato autoguiado, você caminha no seu ritmo, com a bagagem seguindo de hospedagem em hospedagem, o kit do peregrino, suporte 24 horas e um caminho bem sinalizado, que a nossa equipe conhece passo a passo.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ol className="divide-y rounded-2xl border bg-white/70" style={{ borderColor: "rgba(13,29,28,0.1)" }}>
              {prog.destaques.map((d, i) => (
                <li key={d} className="flex items-start gap-4 px-5 py-4" style={{ borderColor: "rgba(13,29,28,0.08)" }}>
                  <span className="font-impact text-[20px] leading-none" style={{ color: C.azul }}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[14.5px] leading-snug">{d}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ===== ROTEIRO: RESUMIDO OU COMPLETO ===== */}
      <section id="roteiro" className="scroll-mt-20 px-6 py-20 md:px-10 md:py-28" style={{ background: C.noite }}>
        <div className="mx-auto max-w-[1100px]">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: C.seta }}>
                <Seta /> O roteiro, dia a dia
              </p>
              <h2 className="mt-4 font-sans text-[clamp(1.8rem,3.4vw,2.8rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
                {prog.etapas.length} etapas até a Praza do Obradoiro
              </h2>
            </Reveal>
            <div role="tablist" aria-label="Formato do roteiro" className="inline-flex shrink-0 rounded-full border p-1" style={{ borderColor: C.linha }}>
              {(["resumido", "completo"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  role="tab"
                  aria-selected={modo === m}
                  onClick={() => setModo(m)}
                  className="relative rounded-full px-5 py-2 text-[12px] font-bold uppercase tracking-[0.16em] transition-colors"
                  style={{ color: modo === m ? C.tinta : C.textSoft }}
                >
                  {modo === m && (
                    <motion.span layoutId="modo-roteiro" className="absolute inset-0 rounded-full" style={{ background: C.seta }} transition={{ duration: 0.4, ease: EASE }} />
                  )}
                  <span className="relative">{m === "resumido" ? "Resumido" : "Completo"}</span>
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {modo === "resumido" ? (
              <motion.div key="resumido" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}
                className="mt-10 overflow-hidden rounded-2xl border" style={{ borderColor: C.linha }}>
                <ol className="divide-y" style={{ borderColor: C.linha }}>
                  {prog.etapas.map((e, i) => {
                    const km = parseFloat(e.km.replace(",", "."));
                    return (
                      <li key={e.de} className="grid grid-cols-[52px_1fr] items-center gap-x-4 gap-y-2 px-4 py-3.5 sm:grid-cols-[64px_1fr_160px_120px] sm:px-6" style={{ borderColor: C.linha }}>
                        <span className="font-impact text-[22px] leading-none" style={{ color: C.seta }}>{String(i + 1).padStart(2, "0")}</span>
                        <span className="text-[15px] font-semibold leading-snug">
                          {e.de} <span style={{ color: C.textFaint }}>→</span> {e.para}
                        </span>
                        <span className="col-start-2 flex items-center gap-3 sm:col-start-auto">
                          <span className="h-1.5 flex-1 overflow-hidden rounded-full" style={{ background: C.linha }}>
                            <span className="block h-full rounded-full" style={{ width: `${(km / maxKm) * 100}%`, background: C.azulSoft }} />
                          </span>
                          <span className="w-14 text-right text-[13px] font-semibold">{e.km} km</span>
                        </span>
                        <span className="col-start-2 text-[12px] sm:col-start-auto sm:text-right" style={{ color: C.textFaint }}>
                          ↑{e.sobe} ↓{e.desce} m · {e.horas}
                        </span>
                      </li>
                    );
                  })}
                  <li className="grid grid-cols-[52px_1fr] items-center gap-x-4 px-4 py-3.5 sm:grid-cols-[64px_1fr] sm:px-6">
                    <span className="font-impact text-[22px] leading-none" style={{ color: C.seta }}>{String(prog.etapas.length + 1).padStart(2, "0")}</span>
                    <span className="text-[15px] font-semibold">{prog.diaFinal.titulo} <span className="font-normal" style={{ color: C.textFaint }}>· fim do programa</span></span>
                  </li>
                </ol>
              </motion.div>
            ) : (
              <motion.ol key="completo" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}
                className="mt-10 space-y-5">
                {prog.etapas.map((e, i) => (
                  <li key={e.de} className="grid overflow-hidden rounded-2xl border md:grid-cols-[300px_1fr]" style={{ borderColor: C.linha, background: "rgba(255,255,255,0.025)" }}>
                    <div className="relative h-52 md:h-full">
                      <Image src={e.foto} alt={`${e.de} a ${e.para}`} fill sizes="(min-width: 768px) 300px, 100vw" className="object-cover" />
                      <span className="absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em]" style={{ background: "rgba(4,32,31,0.8)", color: C.creme }}>
                        Dia {i + 1} · etapa {i + 1} de {prog.etapas.length}
                      </span>
                    </div>
                    <div className="p-6 md:p-7">
                      <h3 className="font-sans text-[1.3rem] font-bold leading-tight tracking-[-0.01em]">{e.de} <span style={{ color: C.seta }}>→</span> {e.para}</h3>
                      <p className="mt-3 text-[14.5px] font-light leading-relaxed" style={{ color: C.textSoft }}>{e.texto}</p>
                      <div className="mt-4 flex flex-wrap gap-2 text-[12px] font-medium">
                        {[`${e.km} km`, `↑ ${e.sobe} m`, `↓ ${e.desce} m`, e.horas].map((x) => (
                          <span key={x} className="rounded-full border px-3 py-1" style={{ borderColor: C.linha }}>{x}</span>
                        ))}
                        {i > 0 && <span className="rounded-full px-3 py-1" style={{ background: "rgba(244,194,27,0.12)", color: C.seta }}>Café da manhã</span>}
                      </div>
                      <p className="mt-4 text-[13px]" style={{ color: C.textFaint }}>Pernoite em {e.para}</p>
                      {e.transfer && <p className="mt-1 text-[13px]" style={{ color: C.seta }}>{e.transfer}</p>}
                    </div>
                  </li>
                ))}
                <li className="grid overflow-hidden rounded-2xl border md:grid-cols-[300px_1fr]" style={{ borderColor: C.linha, background: "rgba(255,255,255,0.025)" }}>
                  <div className="relative h-52 md:h-full">
                    <Image src={prog.diaFinal.foto} alt="Praza do Obradoiro, Santiago de Compostela" fill sizes="(min-width: 768px) 300px, 100vw" className="object-cover" />
                    <span className="absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em]" style={{ background: "rgba(4,32,31,0.8)", color: C.creme }}>
                      Dia {prog.etapas.length + 1}
                    </span>
                  </div>
                  <div className="p-6 md:p-7">
                    <h3 className="font-sans text-[1.3rem] font-bold">{prog.diaFinal.titulo}</h3>
                    <p className="mt-3 text-[14.5px] font-light leading-relaxed" style={{ color: C.textSoft }}>{prog.diaFinal.texto}</p>
                  </div>
                </li>
              </motion.ol>
            )}
          </AnimatePresence>

          <Reveal>
            <div className="mt-10 rounded-2xl border p-6 md:p-7" style={{ borderColor: C.linha }}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: C.seta }}>Nível do caminho · moderado a exigente</p>
              <p className="mt-3 text-[14.5px] font-light leading-relaxed" style={{ color: C.textSoft }}>{prog.nivel}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== INCLUÍDO / NÃO INCLUÍDO ===== */}
      <section className="px-6 py-20 md:px-10 md:py-24" style={{ background: C.claro, color: C.tinta }}>
        <div className="mx-auto grid max-w-[1280px] gap-10 md:grid-cols-3">
          {[
            { t: "Incluído", itens: prog.inclui, cor: C.azul, marca: "✓" },
            { t: "Não incluído", itens: prog.naoInclui, cor: "rgba(13,29,28,0.45)", marca: "×" },
            { t: "Serviços extras, sob consulta", itens: [...prog.extras, "Versão guiada privativa, sob consulta"], cor: C.azul, marca: "+" },
          ].map((col, k) => (
            <Reveal key={col.t} delay={k * 0.06}>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.24em]" style={{ color: col.cor }}>{col.t}</h3>
              <ul className="mt-5 space-y-3.5">
                {col.itens.map((it) => (
                  <li key={it} className="flex gap-3 text-[14.5px] leading-snug">
                    <span className="mt-0.5 shrink-0 font-bold" style={{ color: col.cor }}>{col.marca}</span>
                    <span style={{ color: "rgba(13,29,28,0.8)" }}>{it}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== TARIFAS ===== */}
      <section id="tarifas" className="px-6 py-20 md:px-10 md:py-28" style={{ background: C.azul }}>
        <div className="mx-auto max-w-[1100px]">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: C.seta }}>
              <Vieira tam={18} /> Tarifas · temporada 2027
            </p>
            <h2 className="mt-4 font-sans text-[clamp(1.8rem,3.4vw,2.8rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">Escolha como caminhar</h2>
          </Reveal>
          <div className={`mt-10 grid items-stretch gap-5 ${prog.grupo ? "md:grid-cols-2" : ""}`}>
            <Reveal>
              <div className="flex h-full flex-col rounded-2xl p-7" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)" }}>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: C.seta }}>Autoguiado · no seu ritmo</p>
                <p className="mt-4 flex items-baseline gap-2">
                  <span className="text-[12px] uppercase tracking-[0.16em]" style={{ color: C.textFaint }}>a partir de</span>
                  <span className="font-sans text-[2.6rem] font-extrabold tracking-[-0.03em]">{prog.preco}</span>
                </p>
                <p className="text-[13px]" style={{ color: C.textSoft }}>por pessoa, em quarto duplo · suplemento de quarto individual {prog.single}</p>
                <p className="mt-4 text-[13px] leading-relaxed" style={{ color: C.textSoft }}>
                  A partir de 2 pessoas (máximo 6). Em grupos ímpares, uma pessoa fica em quarto individual, com suplemento. {DISPONIBILIDADE}
                </p>
                <button type="button" onClick={() => escolher(prog.interesse)}
                  className="mt-auto inline-flex w-fit items-center gap-3 rounded-full px-7 py-3.5 pt-3.5 text-[12px] font-bold uppercase tracking-[0.16em] transition-transform hover:scale-[1.03]"
                  style={{ background: C.seta, color: C.tinta, marginTop: 28 }}>
                  Pedir proposta <span>→</span>
                </button>
              </div>
            </Reveal>
            {prog.grupo && prog.interesseGrupo && (
              <Reveal delay={0.08}>
                <div className="flex h-full flex-col rounded-2xl p-7" style={{ background: C.noite, border: `1px solid ${C.seta}` }}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: C.seta }}>Grupo guiado AONIK</p>
                    <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em]" style={{ background: C.seta, color: C.tinta }}>Em breve</span>
                  </div>
                  <p className="mt-4 font-sans text-[2.6rem] font-extrabold leading-none tracking-[-0.03em]">{prog.grupo.periodo}</p>
                  <p className="mt-4 text-[14px] leading-relaxed" style={{ color: C.textSoft }}>{prog.grupo.texto}</p>
                  <button type="button" onClick={() => escolher(prog.interesseGrupo!)}
                    className="inline-flex w-fit items-center gap-3 rounded-full border px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.16em] transition-colors hover:bg-white/10"
                    style={{ borderColor: C.seta, color: C.seta, marginTop: "auto" }}>
                    Entrar na pré-lista <span>→</span>
                  </button>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* ===== GALERIA ===== */}
      <section className="px-6 py-20 md:px-10 md:py-24" style={{ background: C.noite }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: C.seta }}>
              <Seta /> Galeria
            </p>
            <h2 className="mt-4 font-sans text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold tracking-[-0.03em]">O que você vai encontrar no caminho</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-2 md:grid-cols-4">
            {prog.galeria.map((src, i) => (
              <div key={src} className={`group relative overflow-hidden rounded-xl ${i === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-auto" : "aspect-[4/3]"}`}>
                <Image src={src} alt="" fill sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"} className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Contato key={interesse} destino={interesse} />
      <Footer />
      <FloatingActions />
    </main>
  );
}
