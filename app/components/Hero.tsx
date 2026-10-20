"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLang } from "./LanguageProvider";
import { HERO_PRODUTOS, HERO_LABELS, type HeroProduto } from "../lib/heroProdutos";
import { useGruposAoVivo } from "../lib/gruposAoVivo";
import type { Grupo } from "../lib/grupos";

const EASE = [0.16, 1, 0.3, 1] as const;
const DURACAO = 7000; // ms por produto

// Menu da base do hero (preservado da versão anterior); rótulos vêm do dicionário
const CAT_META = [
  { n: "01", href: "#caminhadas" },
  { n: "02", href: "#bike" },
  { n: "03", href: "/jornada" },
  { n: "04", href: "/caminhos-autoguiados" },
];

const MESES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

function listaMeses(datas: string[]): string {
  const meses = datas.map((d) => d.split("/").pop() ?? "").filter((m) => MESES.includes(m));
  if (meses.length <= 1) return meses.join("");
  return `${meses.slice(0, -1).join(", ")} e ${meses[meses.length - 1]}`;
}

function Foto({ p, eager }: { p: HeroProduto; eager: boolean }) {
  return (
    <Image
      src={p.img}
      alt=""
      fill
      sizes="100vw"
      preload={eager}
      unoptimized={p.remota}
      className="object-cover"
      style={{ objectPosition: p.foco ?? "50% 50%" }}
    />
  );
}

export default function Hero() {
  const { t, lang } = useLang();
  const L = HERO_LABELS[lang];
  const reduzir = useReducedMotion();
  const grupos = useGruposAoVivo();

  const [index, setIndex] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [pausadoTeclado, setPausadoTeclado] = useState(false);
  const decorrido = useRef(0);
  const barraCard = useRef<HTMLSpanElement | null>(null);
  const barraStory = useRef<HTMLSpanElement | null>(null);
  const total = HERO_PRODUTOS.length;
  const p = HERO_PRODUTOS[index];
  const proximo = HERO_PRODUTOS[(index + 1) % total];

  const ir = useCallback((i: number) => {
    decorrido.current = 0;
    setIndex(((i % total) + total) % total);
  }, [total]);

  // Autoplay com barra de progresso, sem re-render por quadro.
  useEffect(() => {
    const pinta = () => {
      const s = `scaleX(${Math.min(decorrido.current / DURACAO, 1)})`;
      if (barraCard.current) barraCard.current.style.transform = s;
      if (barraStory.current) barraStory.current.style.transform = s;
    };
    pinta();
    if (pausado || pausadoTeclado || reduzir) return;
    let raf = 0;
    let ultimo = performance.now();
    const passo = (agora: number) => {
      decorrido.current += agora - ultimo;
      ultimo = agora;
      pinta();
      if (decorrido.current >= DURACAO) ir(index + 1);
      else raf = requestAnimationFrame(passo);
    };
    raf = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(raf);
  }, [index, pausado, pausadoTeclado, reduzir, ir]);

  // Swipe no celular
  const toqueX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => { toqueX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (toqueX.current === null) return;
    const dx = e.changedTouches[0].clientX - toqueX.current;
    toqueX.current = null;
    if (Math.abs(dx) > 50) ir(index + (dx < 0 ? 1 : -1));
  };

  const grupo: Grupo | undefined = p.grupoId ? grupos.find((g) => g.id === p.grupoId) : undefined;
  const datas = grupo?.dates2027 ?? [];
  const saidaTexto = grupo
    ? datas.length > 1
      ? `${L.saidas(datas.length)}: ${listaMeses(datas)}`
      : datas.length === 1 ? `${L.saida}: ${datas[0]}` : L.aConfirmar
    : p.saida?.[lang] ?? "";
  const status = grupo
    ? grupo.status === "confirmada"
      ? { label: L.confirmada, cor: "var(--color-neon)" }
      : grupo.status === "em-formacao"
        ? { label: L.formacao, cor: "var(--color-gold-soft)" }
        : { label: L.aConfirmar, cor: "rgba(239,231,218,0.6)" }
    : null;
  const num = String(index + 1).padStart(2, "0");

  return (
    <section
      className="grain relative h-[100svh] min-h-[700px] w-full overflow-hidden bg-forest text-cream"
      aria-roledescription="carrossel"
      aria-label={L.destaque}
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocus={(e) => { if ((e.target as HTMLElement).matches(":focus-visible")) setPausadoTeclado(true); }}
      onBlur={() => setPausadoTeclado(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <h1 className="sr-only">AONIK · {t.hero.eyebrow}: caminhadas, peregrinações, bike e grupos guiados pelo mundo</h1>

      {/* ── Fundo: foto do produto (crossfade + zoom lento) ── */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={p.id}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: reduzir ? 1.04 : 1.12 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.4, ease: "easeInOut" },
              scale: { duration: DURACAO / 1000 + 2, ease: "linear" },
            }}
          >
            <Foto p={p} eager={index === 0} />
          </motion.div>
        </AnimatePresence>
        {/* próxima foto já carregando, invisível */}
        <div className="pointer-events-none absolute inset-0 opacity-0" aria-hidden>
          <Foto p={proximo} eager={false} />
        </div>
        {/* leitura: escurece à esquerda e na base, preserva a foto à direita */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,38,38,0.92)_0%,rgba(0,38,38,0.72)_38%,rgba(0,38,38,0.15)_72%,rgba(0,38,38,0.05)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/20 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-forest/70 to-transparent" />
        {/* celular: texto ocupa a largura toda, então reforça a metade de baixo */}
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-forest via-forest/75 to-transparent lg:hidden" />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col px-6 pt-24 md:px-10 md:pt-28">
        {/* Progresso estilo stories (celular e tablet) */}
        <div className="flex gap-1.5 lg:hidden" role="tablist" aria-label={L.destaque}>
          {HERO_PRODUTOS.map((x, i) => (
            <button
              key={x.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`${x.titulo} ${x.tituloEm}`}
              onClick={() => ir(i)}
              className="relative h-6 flex-1"
            >
              <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 overflow-hidden rounded-full bg-cream/20">
                {i === index ? (
                  <span key={`ativo-${index}`} ref={barraStory} className="block h-full origin-left bg-gold" style={{ transform: "scaleX(0)" }} />
                ) : (
                  <span className="block h-full origin-left bg-gold" style={{ transform: `scaleX(${i < index ? 1 : 0})` }} />
                )}
              </span>
            </button>
          ))}
        </div>

        {/* ── Conteúdo do produto ── */}
        <div className="flex flex-1 items-end pb-8 lg:items-center lg:pb-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={p.id}
              className="max-w-[720px]"
              initial="in"
              animate="show"
              exit="out"
              variants={{ in: {}, show: { transition: { staggerChildren: 0.07 } }, out: {} }}
            >
              <motion.div
                className="flex items-center gap-5"
                variants={{ in: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 }, out: { opacity: 0, y: -10 } }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <span
                  aria-hidden
                  className="font-display font-light leading-[0.8] text-transparent"
                  style={{ fontSize: "clamp(3.2rem, min(7vw, 11vh), 6.2rem)", WebkitTextStroke: "1px rgba(239,231,218,0.55)" }}
                >
                  {num}
                </span>
                <span className="flex flex-col gap-2">
                  <span className="w-fit rounded-full border border-gold-soft/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-soft">
                    {p.formato[lang]}
                  </span>
                  <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-cream/70">
                    {p.regiao[lang]}
                  </span>
                </span>
              </motion.div>

              <motion.h2
                className="mt-5 font-display font-light leading-[0.95] tracking-[-0.02em]"
                style={{ fontSize: "clamp(2.7rem, min(6.4vw, 10.5vh), 6rem)" }}
                variants={{ in: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 }, out: { opacity: 0, y: -12 } }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                {p.titulo}
                <br />
                <span className="italic text-gold">{p.tituloEm}</span>
              </motion.h2>

              <motion.p
                className="mt-5 max-w-[31rem] text-[15px] font-light leading-relaxed text-cream/80 md:text-[17px]"
                variants={{ in: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 }, out: { opacity: 0 } }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                {p.pitch[lang]}
              </motion.p>

              <motion.ul
                className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-cream/85"
                variants={{ in: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 }, out: { opacity: 0 } }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                {p.fatos.map((f) => (
                  <li key={f.pt} className="flex items-center gap-4">
                    {f[lang]}
                    <span aria-hidden className="h-3 w-px bg-cream/25" />
                  </li>
                ))}
                <li>{saidaTexto}</li>
                {status && (
                  <li className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: status.cor }}>
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: status.cor }} />
                    {status.label}
                  </li>
                )}
              </motion.ul>

              <motion.div
                className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7"
                variants={{ in: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 }, out: { opacity: 0 } }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <div className="shrink-0 leading-none">
                  <span className="block text-[10px] font-medium uppercase tracking-[0.22em] text-cream/60">{L.aPartirDe}</span>
                  <span className="mt-1.5 block whitespace-nowrap font-display text-[2.1rem] font-light">{p.preco}</span>
                  <span className="mt-1 block text-[11px] text-cream/55">{L.porPessoa}</span>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={p.href}
                    className="group inline-flex items-center gap-3 rounded-full bg-gold px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-ink transition-transform duration-300 hover:scale-[1.03]"
                  >
                    {L.verRoteiro}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                  <a
                    href="#contato"
                    className="inline-flex items-center rounded-full border border-cream/35 px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-cream transition-colors duration-300 hover:border-cream hover:bg-cream/10"
                  >
                    {L.especialista}
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Vitrine: 5 cards com miniatura (desktop) ── */}
        <div className="mb-6 hidden items-end gap-4 lg:flex">
          <div className="flex items-center gap-2 pb-3 pr-2">
            <button type="button" onClick={() => ir(index - 1)} aria-label={L.anterior}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 text-cream/80 transition-colors hover:border-cream hover:text-cream">
              ←
            </button>
            <button type="button" onClick={() => ir(index + 1)} aria-label={L.proxima}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 text-cream/80 transition-colors hover:border-cream hover:text-cream">
              →
            </button>
          </div>
          <div className="grid flex-1 grid-cols-5 gap-3" role="tablist" aria-label={L.destaque}>
            {HERO_PRODUTOS.map((x, i) => {
              const ativo = i === index;
              return (
                <button
                  key={x.id}
                  type="button"
                  role="tab"
                  aria-selected={ativo}
                  onClick={() => ir(i)}
                  className={`group relative flex items-center gap-3 overflow-hidden rounded-xl border p-2.5 text-left backdrop-blur-md transition-all duration-500 ${
                    ativo ? "border-cream/35 bg-cream/[0.14]" : "border-cream/10 bg-forest/30 hover:border-cream/25 hover:bg-cream/[0.07]"
                  }`}
                >
                  <span className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={x.thumb}
                      alt=""
                      fill
                      sizes="64px"
                      unoptimized={x.remota}
                      className={`object-cover transition-transform duration-700 ${ativo ? "scale-110" : "group-hover:scale-105"}`}
                    />
                  </span>
                  <span className="min-w-0">
                    <span className={`block text-[9px] font-semibold uppercase tracking-[0.2em] ${ativo ? "text-gold-soft" : "text-cream/50"}`}>
                      {x.formato[lang]}
                    </span>
                    <span className={`mt-0.5 line-clamp-2 font-display text-[15px] leading-[1.15] ${ativo ? "text-cream" : "text-cream/75"}`}>
                      {x.titulo} {x.tituloEm}
                    </span>
                  </span>
                  <span className="absolute inset-x-0 bottom-0 h-[2px] bg-cream/10">
                    {ativo && (
                      <span ref={barraCard} className="block h-full origin-left bg-gold" style={{ transform: "scaleX(0)" }} />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Menu de categorias da base (preservado) ── */}
        <nav className="-mx-6 md:-mx-10" aria-label="Categorias">
          <div className="rule mb-0" />
          <ul className="flex items-stretch divide-x divide-cream/10 overflow-x-auto">
            {CAT_META.map((c, i) => {
              const ativo = p.categoria === i;
              return (
                <li key={c.n} className="relative min-w-fit flex-1">
                  {ativo && (
                    <motion.div layoutId="hero-tab-bar" className="absolute left-0 right-0 top-0 h-[2px] bg-gold"
                      transition={{ duration: 0.5, ease: EASE }} />
                  )}
                  <a
                    href={c.href}
                    className={`group flex h-full items-center gap-3 px-5 py-5 transition-colors ${ativo ? "bg-cream/[0.05]" : "hover:bg-cream/[0.04]"}`}
                  >
                    <span className={`font-display text-[11px] transition-colors ${ativo ? "text-gold" : "text-gold/60"}`}>{c.n}</span>
                    <span className={`whitespace-nowrap text-[12px] font-medium uppercase tracking-[0.16em] transition-colors ${ativo ? "text-cream" : "text-cream/75 group-hover:text-gold"}`}>
                      {t.hero.categorias[i]}
                    </span>
                    <span className={`ml-auto hidden transition-all duration-300 group-hover:translate-x-1 md:inline ${ativo ? "text-gold" : "text-cream/30 group-hover:text-gold"}`}>↗</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </section>
  );
}
