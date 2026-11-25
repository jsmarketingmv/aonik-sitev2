"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion, AnimatePresence, useReducedMotion, useScroll, useTransform, useMotionValue, useSpring,
} from "framer-motion";
import { useLang } from "./LanguageProvider";
import { HERO_PRODUTOS, HERO_LABELS, type HeroProduto } from "../lib/heroProdutos";
import { useGruposAoVivo } from "../lib/gruposAoVivo";
import type { Grupo } from "../lib/grupos";

const EASE = [0.16, 1, 0.3, 1] as const;
const DURACAO = 7500; // ms por produto
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

/** As duas imagens do par usam exatamente o mesmo enquadramento, para casarem. */
function Camada({ src, prioridade, alt = "" }: { src: string; prioridade?: boolean; alt?: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="100vw"
      preload={prioridade}
      className="object-cover [object-position:var(--fm)] lg:[object-position:var(--fd)]"
    />
  );
}

/** Faixa livre para a palavra: entre o topo útil e o início do bloco de texto (px). */
type Faixa = { centro: number; altura: number };

/** Ajusta a palavra gigante à largura da tela e à altura da faixa livre. */
function usePalavraAjustada(palavra: string, faixa: Faixa | null) {
  const ref = useRef<HTMLSpanElement>(null);
  const [tam, setTam] = useState<number | null>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !faixa) return;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const medir = () => {
      if (!ctx) return;
      ctx.font = `100px ${getComputedStyle(el).fontFamily}`;
      // largura do texto a 100px, mais o espaçamento entre letras (0.01em)
      const largura = ctx.measureText(palavra).width + palavra.length * 1;
      const vw = window.innerWidth;
      const porLargura = (100 * vw * (vw < 1024 ? 0.92 : 0.9)) / largura;
      // maiúscula da Anton ~0.74em; com acento (Â) chega a ~0.92em
      const porAltura = (faixa.altura * 0.92) / 0.92;
      const teto = window.innerHeight * (vw < 1024 ? 0.22 : 0.28);
      setTam(Math.max(24, Math.min(porLargura, porAltura, teto)));
    };
    medir();
    document.fonts?.ready.then(medir);
  }, [palavra, faixa]);
  return { ref, tam };
}

function Palavra({ p, reduzir, offset, faixa }: {
  p: HeroProduto; reduzir: boolean | null; faixa: Faixa | null;
  offset: { x: ReturnType<typeof useSpring>; y: ReturnType<typeof useSpring> };
}) {
  const { ref, tam } = usePalavraAjustada(p.palavra, faixa);
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 flex justify-center"
      style={{ x: offset.x, y: offset.y, top: faixa?.centro ?? "30%", translateY: "-50%" }}
    >
      <span
        ref={ref}
        className="inline-flex select-none whitespace-nowrap font-impact uppercase leading-[0.86] text-cream"
        style={{ fontSize: tam ?? undefined, visibility: tam ? "visible" : "hidden", letterSpacing: "0.01em", textShadow: "0 2px 40px rgba(0,20,20,0.25)" }}
      >
        {[...p.palavra].map((ch, i) => (
          <span key={i} className="-mt-[0.2em] inline-block overflow-hidden pb-[0.04em] pt-[0.2em]">
            <motion.span
              className="inline-block"
              initial={reduzir ? { opacity: 0 } : { y: "105%" }}
              animate={reduzir ? { opacity: 1 } : { y: "0%" }}
              transition={{ duration: 1, ease: EASE, delay: 0.25 + i * 0.045 }}
            >
              {ch}
            </motion.span>
          </span>
        ))}
      </span>
    </motion.div>
  );
}

/** A rota em etapas: linha que se desenha, um ponto por etapa. */
function Rota({ p, label, etapasTxt }: { p: HeroProduto; label: string; etapasTxt: string }) {
  const n = p.rota.etapas;
  const W = 260, H = 64;
  const d = `M 8 ${H - 14} C ${W * 0.28} ${H - 58}, ${W * 0.42} ${H + 6}, ${W * 0.62} ${H - 34} S ${W - 30} ${8}, ${W - 8} ${14}`;
  const linha = useRef<SVGPathElement>(null);
  const [pontos, setPontos] = useState<{ x: number; y: number }[]>([]);
  useLayoutEffect(() => {
    const el = linha.current;
    if (!el) return;
    const total = el.getTotalLength();
    setPontos(Array.from({ length: n + 1 }, (_, i) => {
      const pt = el.getPointAtLength((i / n) * total);
      return { x: pt.x, y: pt.y };
    }));
  }, [d, n]);
  return (
    <div className="w-[300px] rounded-2xl border border-cream/15 bg-forest/35 p-5 backdrop-blur-md">
      <div className="flex items-baseline justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold-soft">{label}</span>
        <span className="text-[11px] text-cream/70">{p.rota.km} · {etapasTxt}</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 h-16 w-full overflow-visible">
        <path ref={linha} d={d} fill="none" stroke="rgba(239,231,218,0.18)" strokeWidth="1.5" strokeDasharray="3 4" />
        <motion.path
          key={p.id}
          d={d}
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, ease: EASE, delay: 0.5 }}
        />
        {pontos.map((pt, i) => {
          const ponta = i === 0 || i === n;
          return (
            <motion.g
              key={`${p.id}-${i}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 + (i / n) * 1.6 }}
            >
              <circle cx={pt.x} cy={pt.y} r={ponta ? 4 : 2.4} fill={ponta ? "var(--color-gold)" : "var(--color-cream)"} />
            </motion.g>
          );
        })}
      </svg>
      <div className="mt-2 flex justify-between gap-3 text-[11px] leading-tight text-cream/85">
        <span>{p.rota.de}</span>
        <span className="text-right">{p.rota.para}</span>
      </div>
    </div>
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
  const barras = useRef<(HTMLSpanElement | null)[]>([]);
  const secao = useRef<HTMLElement>(null);
  const bloco = useRef<HTMLDivElement>(null);
  const stories = useRef<HTMLDivElement>(null);
  const [faixa, setFaixa] = useState<Faixa | null>(null);
  const [todosPrecarregados, setTodosPrecarregados] = useState(false);
  useEffect(() => {
    if (window.innerWidth < 1024) return; // no celular, só o próximo: poupa dados
    const id = window.setTimeout(() => setTodosPrecarregados(true), 2500);
    return () => window.clearTimeout(id);
  }, []);

  // A palavra mora no espaço livre acima do texto: nunca encosta no título, em nenhuma tela.
  useLayoutEffect(() => {
    const b = bloco.current;
    if (!b) return;
    const medir = () => {
      const desktop = window.innerWidth >= 1024;
      const s = stories.current;
      const topo = desktop ? 112 : s ? s.offsetTop + s.offsetHeight + 12 : 120;
      const fundo = b.offsetTop - (desktop ? 22 : 16);
      const altura = Math.max(40, fundo - topo);
      setFaixa((f) => {
        const nova = { centro: Math.round(topo + altura / 2), altura: Math.round(altura) };
        return f && f.centro === nova.centro && f.altura === nova.altura ? f : nova;
      });
    };
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(b);
    window.addEventListener("resize", medir);
    return () => { ro.disconnect(); window.removeEventListener("resize", medir); };
  }, []);
  const p = HERO_PRODUTOS[index];
  const proximo = HERO_PRODUTOS[(index + 1) % TOTAL];

  const trocou = useRef(false); // depois da 1ª troca, o texto passa a animar a entrada
  const ir = useCallback((i: number) => {
    trocou.current = true;
    decorrido.current = 0;
    setIndex(((i % TOTAL) + TOTAL) % TOTAL);
  }, []);

  // Autoplay com barra de progresso, sem re-render por quadro.
  useEffect(() => {
    const pinta = () => {
      const s = `scaleX(${Math.min(decorrido.current / DURACAO, 1)})`;
      barras.current.forEach((b) => { if (b) b.style.transform = s; });
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

  // Profundidade ao rolar: a foto desce devagar, a palavra sobe e some, o texto sai antes.
  const { scrollYProgress } = useScroll({ target: secao, offset: ["start start", "end start"] });
  const fotoY = useTransform(scrollYProgress, [0, 1], ["0%", reduzir ? "0%" : "14%"]);
  const palavraScrollY = useTransform(scrollYProgress, [0, 1], ["0vh", reduzir ? "0vh" : "-22vh"]);
  const palavraOp = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const conteudoY = useTransform(scrollYProgress, [0, 1], ["0%", reduzir ? "0%" : "-30%"]);
  const conteudoOp = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  // Profundidade com o mouse (desktop): só a palavra se move, a foto fica presa ao recorte.
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const onMove = (e: React.MouseEvent) => {
    if (reduzir) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * -26);
    my.set(((e.clientY - r.top) / r.height - 0.5) * -14);
  };

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
  const saidaTexto = p.selo
    ? ""
    : grupo
      ? datas.length > 1
        ? `${L.saidas(datas.length)}: ${listaMeses(datas)}`
        : datas.length === 1 ? `${L.saida}: ${datas[0]}` : L.aConfirmar
      : p.saida?.[lang] ?? "";
  const status = grupo && !p.selo
    ? grupo.status === "confirmada"
      ? { label: L.confirmada, cor: "var(--color-neon)" }
      : grupo.status === "em-formacao"
        ? { label: L.formacao, cor: "var(--color-gold-soft)" }
        : { label: L.aConfirmar, cor: "rgba(239,231,218,0.6)" }
    : null;

  const vars = {
    "--fd": p.foco.d, "--fm": p.foco.m,
  } as React.CSSProperties;

  return (
    <section
      ref={secao}
      className="grain relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-forest text-cream"
      aria-roledescription="carrossel"
      aria-label={L.destaque}
      style={vars}
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => { setPausado(false); mx.set(0); my.set(0); }}
      onMouseMove={onMove}
      onFocus={(e) => { if ((e.target as HTMLElement).matches(":focus-visible")) setPausadoTeclado(true); }}
      onBlur={() => setPausadoTeclado(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <h1 className="sr-only">AONIK · {t.hero.eyebrow}: caminhadas, peregrinações, bike e grupos guiados pelo mundo</h1>

      {/* ── Palco: paisagem, palavra gigante, frente recortada ── */}
      <motion.div className="absolute inset-0" style={{ y: fotoY }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={p.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
          >
            {/* a foto e o recorte crescem juntos, presos um ao outro */}
            <motion.div
              className="absolute inset-0"
              initial={{ scale: reduzir ? 1.04 : 1.14 }}
              animate={{ scale: 1.04 }}
              transition={{ duration: 2.4, ease: EASE }}
            >
              <Camada src={`/images/hero/${p.id}.jpg`} prioridade={index === 0} />
              <motion.div className="absolute inset-0" style={{ y: palavraScrollY, opacity: palavraOp }}>
                <Palavra p={p} reduzir={reduzir} offset={{ x: sx, y: sy }} faixa={faixa} />
              </motion.div>
              <div className="absolute inset-0">
                <Camada src={`/images/hero/${p.id}-frente.webp`} prioridade={index === 0} />
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
        {/* pares já carregando, invisíveis: o próximo sempre; no desktop, todos depois do 1º */}
        <div className="pointer-events-none absolute inset-0 opacity-0" aria-hidden>
          {(todosPrecarregados ? HERO_PRODUTOS.filter((x) => x.id !== p.id) : [proximo]).map((x) => (
            <div key={x.id}>
              <Camada src={`/images/hero/${x.id}.jpg`} />
              <Camada src={`/images/hero/${x.id}-frente.webp`} />
            </div>
          ))}
        </div>
      </motion.div>

      {/* leitura: escurece a esquerda e a base, sem apagar a palavra */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,38,38,0.82)_0%,rgba(0,38,38,0.45)_34%,rgba(0,38,38,0)_62%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-forest via-forest/55 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-forest/75 to-transparent" />

      <motion.div
        className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col px-6 pt-24 md:px-10 md:pt-28"
        style={{ y: conteudoY, opacity: conteudoOp }}
      >
        {/* Progresso estilo stories (celular e tablet) */}
        <div ref={stories} className="flex gap-1.5 lg:hidden" role="tablist" aria-label={L.destaque}>
          {HERO_PRODUTOS.map((x, i) => (
            <button
              key={x.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={x.titulo}
              onClick={() => ir(i)}
              className="relative h-6 flex-1"
            >
              <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 overflow-hidden rounded-full bg-cream/25">
                {i === index ? (
                  <span key={`m-${index}`} ref={(el) => { barras.current[0] = el; }} className="block h-full origin-left bg-gold" style={{ transform: "scaleX(0)" }} />
                ) : (
                  <span className="block h-full origin-left bg-gold" style={{ transform: `scaleX(${i < index ? 1 : 0})` }} />
                )}
              </span>
            </button>
          ))}
        </div>

        <div className="flex flex-1 items-end gap-8 pb-7 lg:pb-9">
          {/* ── Texto do produto ── */}
          <div ref={bloco} className="w-full max-w-[600px]">
            {/* recriado a cada produto: só anima a entrada (sem esperar saída, nunca trava) */}
              <motion.div
                key={p.id}
                initial={trocou.current ? "in" : false}
                animate="show"
                variants={{ in: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } } }}
              >
                <motion.div
                  className="flex flex-wrap items-center gap-2.5"
                  variants={{ in: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  {p.selo && (
                    <span className="rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-ink">
                      {p.selo[lang]}
                    </span>
                  )}
                  <span className="rounded-full border border-cream/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cream">
                    {p.formato[lang]}
                  </span>
                  <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-cream/75">{p.regiao[lang]}</span>
                </motion.div>

                <motion.h2
                  className="mt-4 whitespace-nowrap font-sans font-extrabold leading-[0.95] tracking-[-0.035em]"
                  style={{ fontSize: "clamp(2rem, 4.6vw, 4.4rem)" }}
                  variants={{ in: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.7, ease: EASE }}
                >
                  {p.titulo}
                </motion.h2>

                <motion.p
                  className="mt-4 max-w-[33rem] text-[15px] font-light leading-relaxed text-cream/85 md:text-[16.5px]"
                  variants={{ in: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  {p.pitch[lang]}
                </motion.p>

                <motion.ul
                  className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] font-medium text-cream/90"
                  variants={{ in: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  {p.fatos.map((f, i) => (
                    <li key={f.pt} className="flex items-center gap-4">
                      {f[lang]}
                      {(i < p.fatos.length - 1 || saidaTexto) && <span aria-hidden className="h-3 w-px bg-cream/30" />}
                    </li>
                  ))}
                  {saidaTexto && <li>{saidaTexto}</li>}
                  {status && (
                    <li className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: status.cor }}>
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: status.cor }} />
                      {status.label}
                    </li>
                  )}
                </motion.ul>

                <motion.div
                  className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7"
                  variants={{ in: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <div className="shrink-0 leading-none">
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-cream/65">{L.aPartirDe}</span>
                    <span className="mt-1.5 block whitespace-nowrap font-sans text-[2.1rem] font-bold tracking-[-0.02em]">{p.preco}</span>
                    <span className="mt-1 block text-[11px] text-cream/60">{p.precoNota?.[lang] ?? L.porPessoa}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={p.href}
                      className="group inline-flex items-center gap-3 rounded-full bg-gold px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.16em] text-ink transition-transform duration-300 hover:scale-[1.03]"
                    >
                      {p.cta?.[lang] ?? L.verRoteiro}
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </a>
                    <a
                      href="#contato"
                      className="inline-flex items-center rounded-full border border-cream/40 px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.16em] text-cream transition-colors duration-300 hover:border-cream hover:bg-cream/10"
                    >
                      {L.especialista}
                    </a>
                  </div>
                </motion.div>
              </motion.div>
          </div>

          {/* ── A rota (desktop) ── */}
          <div className="ml-auto hidden shrink-0 xl:block">
            <motion.div
              key={p.id}
              initial={trocou.current ? { opacity: 0, y: 16 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
            >
              <Rota p={p} label={L.aRota} etapasTxt={L.etapas(p.rota.etapas)} />
            </motion.div>
          </div>
        </div>

        {/* ── Navegação entre produtos (desktop): 01 ──── 02 03 04 ── */}
        <div className="hidden items-center gap-6 pb-6 lg:flex" role="tablist" aria-label={L.destaque}>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => ir(index - 1)} aria-label={L.anterior}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/30 text-cream/85 transition-colors hover:border-cream hover:text-cream">←</button>
            <button type="button" onClick={() => ir(index + 1)} aria-label={L.proxima}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/30 text-cream/85 transition-colors hover:border-cream hover:text-cream">→</button>
          </div>
          <ol className="flex flex-1 items-center gap-6">
            {HERO_PRODUTOS.map((x, i) => {
              const ativo = i === index;
              return (
                <li key={x.id} className={ativo ? "flex-[2.2]" : "flex-1"} style={{ transition: "flex-grow 600ms cubic-bezier(0.16,1,0.3,1)" }}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={ativo}
                    onClick={() => ir(i)}
                    className="group flex w-full items-center gap-3 text-left"
                  >
                    <span className={`font-impact text-[22px] leading-none transition-colors ${ativo ? "text-cream" : "text-cream/45 group-hover:text-cream/80"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col gap-1.5">
                      <span className={`truncate text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors ${ativo ? "text-cream" : "text-cream/50 group-hover:text-cream/80"}`}>
                        {x.titulo}
                      </span>
                      <span className="relative h-[2px] w-full overflow-hidden rounded-full bg-cream/20">
                        {ativo && (
                          <span key={`d-${index}`} ref={(el) => { barras.current[1] = el; }} className="absolute inset-0 origin-left bg-gold" style={{ transform: "scaleX(0)" }} />
                        )}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
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
                    className={`group flex h-full items-center gap-3 px-5 py-4 transition-colors ${ativo ? "bg-cream/[0.05]" : "hover:bg-cream/[0.04]"}`}
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
      </motion.div>
    </section>
  );
}
