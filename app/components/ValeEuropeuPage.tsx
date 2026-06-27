"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "./Nav";
import Breadcrumb from "./Breadcrumb";
import Footer from "./Footer";
import Contato from "./Contato";
import FloatingActions from "./FloatingActions";
import { Reveal, EASE } from "./ui";

/* ============================================================
   VALE EUROPEU CATARINENSE — Cicloturismo autoguiado
   Personalidade: o Brasil colonial alemao e italiano,
   pontes cobertas, casas enxaimel, rios de mata atlantica
   e os campos altos do planalto.
   Paleta (print 3): Racing Green, Firecracker, Ash Gray,
   Army Green, Cream.
   ============================================================ */

export const VALE_C = {
  green:     "#293A39", // Racing Green - fundo escuro
  greenDeep: "#1c2b2a", // variacao mais profunda
  greenSoft: "#344746",
  fire:      "#FC6E4C", // Firecracker - acento / CTA
  ash:       "#BDCDAD", // Ash Gray - verde claro
  army:      "#4F4817", // Army Green - oliva
  cream:     "#FFF2D9", // Cream - fundo claro
  line:      "rgba(189,205,173,0.20)",
  textSoft:  "rgba(255,242,217,0.64)",
  textAsh:   "rgba(189,205,173,0.85)",
};

const C = VALE_C;

/* ============================================================
   TIPOS
   ============================================================ */
export type ValeOpcional = {
  nome: string;
  preco: string;          // ex "R$ 1.290"
  unidade: "pessoa" | "total";
  destaque?: boolean;     // card em destaque (ex carro de apoio)
  nota?: string;          // observacao especial
};

export type ValeDia = {
  d: string;              // "02"
  tag: string;            // "1o Dia de Pedal"
  titulo: string;         // "48 km · +560 m · Timbo > Rio dos Cedros > Pomerode"
  texto: string;          // descricao verbatim
};

export type ValeGaleria = { src: string; cap: string; tag: string };

export type ValeData = {
  slug: string;
  dias: string;           // "3 dias" / "7 dias"
  titulo: string;         // "Parte Baixa" / "Circuito Completo"
  subtitulo: string;
  intro: string;
  heroImg: string;
  precoBase: string;      // "R$ 2.100"
  baseInclui: string[];
  cidades: string[];      // pins do mapa
  stats: { v: string; u: string; s: string }[];
  blocoCultura: { titulo: string; texto: string; img: string };
  blocoNatureza: { titulo: string; texto: string; img: string };
  feature: { kicker: string; titulo: string; texto: string; img: string };
  galeria: ValeGaleria[];
  roteiro: ValeDia[];
  opcionais: ValeOpcional[];
  naoIncluso: string[];
  iaTitulo: string;
  iaTexto: string;
};

/* ============================================================
   SVG: Rota do Vale (pins de cidades + traçado animado)
   ============================================================ */
function RotaVale({ cidades }: { cidades: string[] }) {
  const n = cidades.length;
  // distribui os pins numa curva suave subindo da esquerda para a direita
  const pts = cidades.map((c, i) => {
    const x = 30 + (i * (380 / Math.max(1, n - 1)));
    const base = 230 - (i * (150 / Math.max(1, n - 1)));
    const wob = i % 2 === 0 ? 0 : -16;
    return { x, y: base + wob, label: c };
  });
  const d = pts
    .map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`))
    .join(" ");

  return (
    <svg viewBox="0 0 440 280" className="h-full w-full" style={{ overflow: "visible" }}>
      {/* relevo de fundo */}
      {[0.06, 0.1, 0.16, 0.24].map((o, i) => (
        <path
          key={i}
          d={`M0,${150 + i * 22} C100,${130 + i * 22} 220,${168 + i * 22} 440,${135 + i * 22} L440,280 L0,280 Z`}
          fill={C.ash}
          opacity={o}
        />
      ))}
      {/* traçado da rota */}
      <motion.path
        d={d}
        fill="none"
        stroke={C.fire}
        strokeWidth="1.8"
        strokeDasharray="5 6"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 3, ease: EASE, delay: 0.8 }}
      />
      {/* pins */}
      {pts.map((p, i) => (
        <motion.g
          key={p.label + i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: EASE, delay: 1.1 + i * 0.16 }}
        >
          <circle cx={p.x} cy={p.y} r="4.2" fill={C.green} stroke={C.fire} strokeWidth="1.8" />
          <text
            x={p.x}
            y={p.y - 11}
            fill={C.cream}
            fontSize="8.5"
            textAnchor={i === 0 ? "start" : i === n - 1 ? "end" : "middle"}
            letterSpacing="0.4"
            style={{ fontFamily: "sans-serif" }}
          >
            {p.label}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}

/* ============================================================
   Galeria interativa (fotos reais)
   ============================================================ */
function GaleriaVale({ fotos }: { fotos: ValeGaleria[] }) {
  const [idx, setIdx] = useState(0);
  const img = fotos[idx];

  return (
    <div className="grid gap-3 md:grid-cols-[1fr_200px]">
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
          <img src={img.src} alt={img.cap} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${C.greenDeep}dd 0%, transparent 55%)` }} />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em]" style={{ color: C.fire }}>
              {img.tag}
            </span>
            <p className="mt-1 text-[14px] font-light" style={{ color: C.cream }}>{img.cap}</p>
          </div>
          <div className="absolute right-4 top-4">
            <span className="text-[11px] font-medium" style={{ color: C.textSoft }}>{idx + 1}/{fotos.length}</span>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
        {fotos.map((g, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className="relative shrink-0 overflow-hidden rounded-xl transition-all duration-300"
            style={{
              width: 200,
              height: 115,
              opacity: i === idx ? 1 : 0.45,
              outline: i === idx ? `2px solid ${C.fire}` : "2px solid transparent",
              outlineOffset: 2,
            }}
          >
            <img src={g.src} alt={g.tag} className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.05]" />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   PAGE
   ============================================================ */
export default function ValeEuropeuPage({ data }: { data: ValeData }) {
  return (
    <main className="relative" style={{ background: C.cream }}>
      <Nav />

      {/* ===== HERO ===== */}
      <section className="relative flex min-h-[100svh] w-full items-center overflow-hidden" style={{ background: C.green }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${data.heroImg}')`, backgroundPosition: "center 40%" }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${C.green}f2 0%, ${C.green}cc 48%, ${C.green}66 100%)` }} />
        <div className="absolute inset-x-0 bottom-0 h-40" style={{ background: `linear-gradient(to top, ${C.green}, transparent)` }} />

        <div className="relative z-10 mx-auto grid w-full max-w-[1400px] items-center gap-10 px-6 py-28 md:grid-cols-2 md:gap-16 md:px-10">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.2 }}
              className="text-[11px] font-semibold uppercase tracking-[0.4em]"
              style={{ color: C.fire }}
            >
              🇧🇷 Vale Europeu Catarinense · Cicloturismo Autoguiado
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
              className="mt-4 font-display font-light uppercase leading-[0.86] tracking-[-0.02em]"
              style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)", color: C.cream }}
            >
              Circuito Vale
              <br />
              <span style={{ color: C.fire }}>Europeu</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.45 }}
              className="mt-3 text-[13px] font-semibold uppercase tracking-[0.3em]"
              style={{ color: C.ash }}
            >
              {data.dias} · {data.titulo}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.55 }}
              className="mt-6 max-w-md text-[15px] font-light leading-relaxed md:text-base"
              style={{ color: C.textSoft }}
            >
              {data.subtitulo}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.65 }}
              className="mt-8 flex flex-wrap items-center gap-5"
            >
              <a
                href="#reservar"
                className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]"
                style={{ background: C.fire, color: C.cream }}
              >
                Quero pedalar <span>→</span>
              </a>
              <span>
                <span className="text-[12px] uppercase tracking-[0.16em]" style={{ color: C.textSoft }}>a partir de</span>{" "}
                <span className="font-display text-2xl" style={{ color: C.cream }}>{data.precoBase}</span>
              </span>
            </motion.div>
            <div className="mt-7">
              <Breadcrumb tone="dark" accent={C.fire} items={[
                { label: "Home", href: "/" },
                { label: "Bike", href: "/bike" },
                { label: `Vale Europeu · ${data.dias}` },
              ]} />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, ease: EASE, delay: 0.4 }}
            className="mx-auto hidden w-full max-w-[480px] md:block"
            style={{ height: 300 }}
          >
            <RotaVale cidades={data.cidades} />
          </motion.div>
        </div>
      </section>

      {/* ===== MANIFESTO ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: C.cream, color: C.green }}>
        <div className="mx-auto max-w-[860px] text-center">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: C.fire }}>
              A pedalada que vira viagem
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 font-display font-light leading-[1.25] tracking-[-0.01em]" style={{ fontSize: "clamp(1.5rem,3vw,2.4rem)", color: C.green }}>
              {data.intro}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="w-full" style={{ background: C.greenDeep }}>
        <div className="grid grid-cols-2 gap-px md:grid-cols-3 lg:grid-cols-6" style={{ background: C.line }}>
          {data.stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <div className="flex flex-col px-6 py-10" style={{ background: C.greenDeep }}>
                <span className="font-display font-light leading-none" style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)", color: C.cream }}>{s.v}</span>
                <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: C.fire }}>{s.u}</span>
                <span className="mt-1 text-[12px] font-light" style={{ color: C.textSoft }}>{s.s}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== CULTURA · NATUREZA ===== */}
      <section className="w-full" style={{ background: C.green }}>
        <div className="grid md:grid-cols-2">
          {[data.blocoCultura, data.blocoNatureza].map((b, i) => (
            <div key={i} className="relative min-h-[420px] overflow-hidden md:min-h-[560px]">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${b.img}')` }} />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 25%, ${i === 0 ? C.green : C.army}f0 100%)` }} />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <Reveal>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: i === 0 ? C.fire : C.ash }}>
                    {i === 0 ? "A herança" : "A paisagem"}
                  </p>
                  <h3 className="mt-3 font-display font-light uppercase leading-[0.9]" style={{ fontSize: "clamp(2rem,4vw,3.4rem)", color: C.cream }}>
                    {b.titulo}
                  </h3>
                  <p className="mt-4 max-w-sm text-[14px] font-light leading-relaxed" style={{ color: "rgba(255,242,217,0.78)" }}>
                    {b.texto}
                  </p>
                </Reveal>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FEATURE QUOTE ===== */}
      <section className="relative w-full overflow-hidden" style={{ background: C.greenDeep }}>
        <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: `url('${data.feature.img}')` }} />
        <div className="absolute inset-0" style={{ background: `${C.greenDeep}c4` }} />
        <div className="relative z-10 mx-auto max-w-[1000px] px-6 py-28 text-center md:py-44">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: C.fire }}>{data.feature.kicker}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display font-light leading-[1.1]" style={{ fontSize: "clamp(1.9rem,4.5vw,3.6rem)", color: C.cream }}>
              {data.feature.titulo}
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mx-auto mt-7 max-w-xl text-[15px] font-light leading-relaxed" style={{ color: C.textSoft }}>
              {data.feature.texto}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== GALERIA ===== */}
      <section className="px-6 py-20 md:px-10 md:py-28" style={{ background: C.green }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: C.fire }}>Galeria · fotos reais do circuito</p>
            <h2 className="mt-4 font-display font-light" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: C.cream }}>O que você vai viver</h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-8">
            <GaleriaVale fotos={data.galeria} />
          </Reveal>
        </div>
      </section>

      {/* ===== ROTEIRO DIA A DIA ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: C.cream, color: C.green }}>
        <div className="mx-auto max-w-[1100px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: C.fire }}>O roteiro dia a dia</p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-3 max-w-lg text-[14px] font-light leading-relaxed" style={{ color: "rgba(41,58,57,0.7)" }}>
              Pedal autoguiado, no seu ritmo. Você recebe o trajeto no GPS, a caderneta de rota e o suporte AONIK. É só pedalar.
            </p>
          </Reveal>
          <div className="mt-12">
            {data.roteiro.map((r, i) => (
              <Reveal key={r.d} delay={i * 0.04}>
                <div className="grid grid-cols-[auto_1fr] items-baseline gap-5 border-t py-7 md:gap-10" style={{ borderColor: "rgba(41,58,57,0.14)" }}>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full px-3 py-1 font-display text-sm" style={{ background: C.fire, color: C.cream }}>{r.d}</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em]" style={{ color: C.army }}>{r.tag}</p>
                    <h3 className="mt-1 font-display font-light" style={{ fontSize: "clamp(1.05rem,2vw,1.45rem)", color: C.green }}>{r.titulo}</h3>
                    <p className="mt-2 text-[14px] font-light leading-relaxed" style={{ color: "rgba(41,58,57,0.72)" }}>{r.texto}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PREÇO: BASE + OPCIONAIS ===== */}
      <section id="reservar" className="px-6 py-24 md:px-10 md:py-32" style={{ background: C.green }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ color: C.fire }}>Investimento</p>
            <h2 className="mt-5 font-display font-light leading-[1.05]" style={{ fontSize: "clamp(2rem,4.5vw,3.4rem)", color: C.cream }}>
              Monte a sua viagem
            </h2>
          </Reveal>

          {/* Card base */}
          <Reveal delay={0.1}>
            <div className="mt-10 grid gap-8 rounded-3xl p-8 md:grid-cols-[1fr_1.1fr] md:p-12" style={{ background: C.greenDeep, border: `1px solid ${C.line}` }}>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: C.ash }}>O ponto de partida</p>
                <p className="mt-4 font-display font-light leading-none" style={{ fontSize: "clamp(2.6rem,6vw,4.2rem)", color: C.cream }}>
                  {data.precoBase}
                </p>
                <p className="mt-2 text-[14px] font-light" style={{ color: C.textSoft }}>por pessoa · em ocupação dupla</p>
                <a
                  href="#contato"
                  className="mt-7 inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]"
                  style={{ background: C.fire, color: C.cream }}
                >
                  Garantir minha vaga <span>→</span>
                </a>
              </div>
              <div className="md:border-l md:pl-10" style={{ borderColor: C.line }}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: C.fire }}>Sua base já inclui</p>
                <ul className="mt-6 space-y-4">
                  {data.baseInclui.map((item) => (
                    <li key={item} className="flex items-start gap-4 text-[14px] font-light leading-relaxed" style={{ color: "rgba(255,242,217,0.9)" }}>
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: C.fire }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-[12px] font-light leading-relaxed" style={{ color: C.textSoft }}>
                  A bicicleta não está inclusa: traga a sua ou alugue uma E-Bike ou MTB nos opcionais abaixo.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Opcionais */}
          <Reveal delay={0.1}>
            <p className="mt-16 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: C.ash }}>
              Personalize · adicionais opcionais
            </p>
            <p className="mt-3 max-w-xl text-[14px] font-light leading-relaxed" style={{ color: C.textSoft }}>
              Você escolhe o que quer somar à base. Valores finais já calculados, prontos para você decidir.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.opcionais.map((o, i) => (
              <Reveal key={o.nome} delay={i * 0.03}>
                <div
                  className="flex h-full flex-col rounded-2xl p-6"
                  style={{
                    background: o.destaque ? "rgba(252,110,76,0.1)" : "rgba(189,205,173,0.06)",
                    border: `1px solid ${o.destaque ? "rgba(252,110,76,0.35)" : C.line}`,
                  }}
                >
                  <h4 className="font-display text-[1.05rem] font-light leading-tight" style={{ color: C.cream }}>{o.nome}</h4>
                  {o.nota && (
                    <p className="mt-2 text-[12px] font-light leading-relaxed" style={{ color: C.textAsh }}>{o.nota}</p>
                  )}
                  <div className="mt-auto flex items-end justify-between pt-5">
                    <span className="font-display text-[1.4rem] font-light" style={{ color: o.destaque ? C.fire : C.cream }}>{o.preco}</span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: C.ash }}>
                      {o.unidade === "pessoa" ? "por pessoa" : "valor total"}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.12}>
            <div className="mt-12 flex flex-col gap-4 border-t pt-8 md:flex-row md:items-center md:justify-between" style={{ borderColor: C.line }}>
              <p className="max-w-xl text-[13px] font-light leading-relaxed" style={{ color: C.textSoft }}>
                Taxa de reserva de 40% para garantir sua data. Disponível o ano todo, com partidas flexíveis. A equipe AONIK fecha tudo com você.
              </p>
              <a
                href="#contato"
                className="inline-flex shrink-0 items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]"
                style={{ background: C.fire, color: C.cream }}
              >
                Falar com a equipe →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== INCLUSO / NAO INCLUSO ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: C.cream, color: C.green }}>
        <div className="mx-auto grid max-w-[1280px] gap-12 md:grid-cols-2 md:gap-20">
          <div>
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: C.fire }}>O que a AONIK organiza</p>
              <ul className="mt-8 space-y-4">
                {[
                  "Roteiro autoguiado completo com trajeto no GPS",
                  "Caderneta de rota e mapas digitais",
                  "Hospedagem com café da manhã (conforme base)",
                  "Suporte e monitoramento via satélite",
                  "Suporte AONIK no WhatsApp durante toda a viagem",
                  "Briefing de roteiro no primeiro dia",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-4 text-[14px] font-light leading-relaxed">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: C.fire }} />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div>
            <Reveal delay={0.1}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: C.army }}>Não incluso (opcionais à parte)</p>
              <ul className="mt-8 space-y-4">
                {data.naoIncluso.map((item) => (
                  <li key={item} className="flex items-start gap-4 text-[14px] font-light leading-relaxed" style={{ color: "rgba(41,58,57,0.7)" }}>
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "rgba(79,72,23,0.5)" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== AONIKIA ===== */}
      <section className="px-6 py-20 md:px-10 md:py-24" style={{ background: C.army }}>
        <div className="mx-auto max-w-[860px] text-center">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: C.ash }}>
              AonikIA · especialista neste circuito
            </p>
            <h2 className="mt-5 font-display font-light leading-[1.15]" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: C.cream }}>
              {data.iaTitulo}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] font-light leading-relaxed" style={{ color: "rgba(255,242,217,0.72)" }}>
              {data.iaTexto}
            </p>
            <a
              href="#contato"
              className="mt-7 inline-flex items-center gap-3 rounded-full border px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 hover:opacity-80"
              style={{ borderColor: C.fire, color: C.fire }}
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
