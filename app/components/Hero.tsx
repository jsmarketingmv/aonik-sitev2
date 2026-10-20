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
const EXPANSAO = 1.15; // s: card crescendo até virar o fundo
const TOTAL = HERO_PRODUTOS.length;

// Menu da base do hero (preservado); rótulos vêm do dicionário
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

/** Retângulo do card de origem, relativo à seção, para a expansão. */
type Origem = { t: number; l: number; w: number; h: number; W: number; H: number };

type Estado = { i: number; anterior: number | null; origem: Origem | null; n: number };

function Foto({ p, eager, sizes = "100vw" }: { p: HeroProduto; eager?: boolean; sizes?: string }) {
  return (
    <Image
      src={p.img}
      alt=""
      fill
      sizes={sizes}
      preload={eager}
      unoptimized={p.remota}
      className="object-cover"
      style={{ objectPosition: p.foco ?? "50% 50%" }}
    />
  );
}

/** Fundo do produto ativo. Com origem, nasce do card e cresce até cobrir a seção. */
function Fundo({ p, origem, eager, reduzir, onPronto }: {
  p: HeroProduto; origem: Origem | null; eager: boolean; reduzir: boolean | null; onPronto: () => void;
}) {
  let inicio: { clipPath: string; x: number; y: number; scale: number; opacity: number };
  if (origem && !reduzir) {
    const { t, l, w, h, W, H } = origem;
    const k = Math.max(w / W, h / H);
    inicio = {
      clipPath: `inset(${t}px ${W - l - w}px ${H - t - h}px ${l}px round 18px)`,
      x: l + w / 2 - (W * k) / 2,
      y: t + h / 2 - (H * k) / 2,
      scale: k,
      opacity: 1,
    };
  } else {
    inicio = { clipPath: "inset(0px 0px 0px 0px round 0px)", x: 0, y: 0, scale: 1, opacity: 0 };
  }
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ clipPath: inicio.clipPath, opacity: inicio.opacity }}
      animate={{ clipPath: "inset(0px 0px 0px 0px round 0px)", opacity: 1 }}
      transition={{ duration: origem ? EXPANSAO : 1.2, ease: origem ? EASE : "easeInOut" }}
      onAnimationComplete={onPronto}
    >
      <motion.div
        className="absolute inset-0"
        style={{ originX: 0, originY: 0 }}
        initial={{ x: inicio.x, y: inicio.y, scale: inicio.scale }}
        animate={{ x: 0, y: 0, scale: 1 }}
        transition={{ duration: origem ? EXPANSAO : 0, ease: EASE }}
      >
        {/* zoom lento contínuo enquanto o produto está em cartaz */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1 }}
          animate={{ scale: reduzir ? 1 : 1.07 }}
          transition={{ duration: DURACAO / 1000 + 2, ease: "linear" }}
        >
          <Foto p={p} eager={eager} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const { t, lang } = useLang();
  const L = HERO_LABELS[lang];
  const reduzir = useReducedMotion();
  const grupos = useGruposAoVivo();

  const [estado, setEstado] = useState<Estado>({ i: 0, anterior: null, origem: null, n: 0 });
  const [pausado, setPausado] = useState(false);
  const [pausadoTeclado, setPausadoTeclado] = useState(false);
  const decorrido = useRef(0);
  const secao = useRef<HTMLElement>(null);
  const cards = useRef<Record<string, HTMLButtonElement | null>>({});
  const barraDeck = useRef<HTMLSpanElement | null>(null);
  const barraStory = useRef<HTMLSpanElement | null>(null);

  const index = estado.i;
  const p = HERO_PRODUTOS[index];
  const fila = Array.from({ length: TOTAL - 1 }, (_, k) => HERO_PRODUTOS[(index + 1 + k) % TOTAL]);

  const ir = useCallback((alvo: number) => {
    const destino = ((alvo % TOTAL) + TOTAL) % TOTAL;
    let origem: Origem | null = null;
    const el = cards.current[HERO_PRODUTOS[destino].id];
    const sec = secao.current;
    if (el && sec) {
      const r = el.getBoundingClientRect();
      const S = sec.getBoundingClientRect();
      if (r.width > 0) origem = { t: r.top - S.top, l: r.left - S.left, w: r.width, h: r.height, W: S.width, H: S.height };
    }
    decorrido.current = 0;
    setEstado((s) => (destino === s.i ? s : { i: destino, anterior: s.i, origem, n: s.n + 1 }));
  }, []);

  // Autoplay com barra de progresso, sem re-render por quadro.
  useEffect(() => {
    const pinta = () => {
      const s = `scaleX(${Math.min(decorrido.current / DURACAO, 1)})`;
      if (barraDeck.current) barraDeck.current.style.transform = s;
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
  const anterior = estado.anterior !== null ? HERO_PRODUTOS[estado.anterior] : null;

  return (
    <section
      ref={secao}
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

      {/* ── Fundo: o produto anterior fica por baixo enquanto o novo cresce ── */}
      <div className="absolute inset-0 z-0">
        {anterior && (
          <div key={`base-${anterior.id}`} className="absolute inset-0" style={{ transform: reduzir ? undefined : "scale(1.07)", transformOrigin: "50% 50%" }}>
            <Foto p={anterior} />
          </div>
        )}
        <Fundo
          key={`fundo-${estado.n}`}
          p={p}
          origem={estado.origem}
          eager={estado.n === 0}
          reduzir={reduzir}
          onPronto={() => setEstado((s) => (s.anterior === null ? s : { ...s, anterior: null }))}
        />
        {/* próxima foto já carregando, invisível, para a expansão não piscar */}
        <div className="pointer-events-none absolute inset-0 opacity-0" aria-hidden>
          <Foto p={fila[0]} />
        </div>
        {/* leitura: escurece à esquerda e na base */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,38,38,0.92)_0%,rgba(0,38,38,0.7)_36%,rgba(0,38,38,0.18)_64%,rgba(0,38,38,0.08)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/15 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-forest/70 to-transparent" />
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
                  <span key={`ativo-${estado.n}`} ref={barraStory} className="block h-full origin-left bg-gold" style={{ transform: "scaleX(0)" }} />
                ) : (
                  <span className="block h-full origin-left bg-gold" style={{ transform: `scaleX(${i < index ? 1 : 0})` }} />
                )}
              </span>
            </button>
          ))}
        </div>

        <div className="flex flex-1 items-end pb-8 lg:items-center lg:gap-10 lg:pb-6">
          {/* ── Texto do produto ── */}
          <div className="w-full lg:w-[48%] lg:shrink-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={p.id}
                initial="in"
                animate="show"
                exit="out"
                variants={{ in: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } }, out: {} }}
              >
                <motion.div
                  className="flex flex-wrap items-center gap-x-4 gap-y-2"
                  variants={{ in: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 }, out: { opacity: 0, y: -10 } }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <span className="rounded-full border border-gold-soft/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-soft">
                    {p.formato[lang]}
                  </span>
                  <span className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.24em] text-cream/75">
                    <span aria-hidden className="h-px w-6 bg-cream/40" />
                    {p.regiao[lang]}
                  </span>
                </motion.div>

                <motion.h2
                  className="mt-6 font-display font-light leading-[0.95] tracking-[-0.02em]"
                  style={{ fontSize: "clamp(2.7rem, min(6vw, 10.5vh), 5.8rem)" }}
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

          {/* ── Fila de próximos produtos (desktop): o primeiro cresce e vira o fundo ── */}
          <div className="hidden min-w-0 flex-1 self-end pb-2 lg:block">
            <div className="flex gap-5" role="tablist" aria-label={L.destaque}>
              <AnimatePresence initial={false}>
                {fila.map((x, k) => (
                  <motion.button
                    key={x.id}
                    layout
                    ref={(el) => { cards.current[x.id] = el; }}
                    type="button"
                    role="tab"
                    aria-selected={false}
                    aria-label={`${x.titulo} ${x.tituloEm}`}
                    onClick={() => ir(HERO_PRODUTOS.indexOf(x))}
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0 } }}
                    transition={{ layout: { duration: 0.9, ease: EASE }, opacity: { duration: 0.6, delay: 0.3 }, x: { duration: 0.7, ease: EASE } }}
                    className="group relative h-[clamp(220px,34vh,310px)] w-[clamp(150px,14vw,210px)] shrink-0 overflow-hidden rounded-[18px] text-left shadow-[0_24px_50px_-20px_rgba(0,0,0,0.65)] ring-1 ring-cream/15"
                  >
                    <span className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                      <Image
                        src={x.thumb}
                        alt=""
                        fill
                        sizes="210px"
                        unoptimized={x.remota}
                        className="object-cover"
                        style={{ objectPosition: x.foco ?? "50% 50%" }}
                      />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                    <span className="absolute inset-x-0 bottom-0 p-4">
                      <span aria-hidden className="mb-2 block h-px w-5 bg-gold-soft" />
                      <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-cream/70">{x.regiao[lang].split(" · ")[0]}</span>
                      <span className="mt-1 block font-display text-[19px] leading-[1.1] text-cream">
                        {x.titulo} {x.tituloEm}
                      </span>
                      {k === 0 && (
                        <span className="mt-2 block text-[10px] uppercase tracking-[0.18em] text-gold-soft">{L.proxima}</span>
                      )}
                    </span>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>

            {/* controles: setas, linha de progresso e número */}
            <div className="mt-6 flex items-center gap-5 pr-2">
              <button type="button" onClick={() => ir(index - 1)} aria-label={L.anterior}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cream/30 text-cream/80 transition-colors hover:border-cream hover:text-cream">
                ←
              </button>
              <button type="button" onClick={() => ir(index + 1)} aria-label={L.proxima}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cream/30 text-cream/80 transition-colors hover:border-cream hover:text-cream">
                →
              </button>
              <span className="relative h-[2px] max-w-[340px] flex-1 overflow-hidden rounded-full bg-cream/15">
                <span key={`deck-${estado.n}`} ref={barraDeck} className="absolute inset-y-0 left-0 w-full origin-left bg-gold" style={{ transform: "scaleX(0)" }} />
              </span>
              <span className="flex items-baseline gap-1.5 font-display font-light leading-none">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={num}
                    className="text-[3.2rem] text-cream"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.45, ease: EASE }}
                  >
                    {num}
                  </motion.span>
                </AnimatePresence>
                <span className="text-[13px] text-cream/45">/ {String(TOTAL).padStart(2, "0")}</span>
              </span>
            </div>
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
