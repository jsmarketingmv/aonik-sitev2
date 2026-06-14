"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Contato from "../../components/Contato";
import FloatingActions from "../../components/FloatingActions";
import { Reveal, EASE } from "../../components/ui";

/* ============================================================
   RIO SERRANO — Hotel + Spa · Torres del Paine
   Lodge all-inclusive de luxo no coração do parque.
   Personalidade: o CONTRASTE (fim do mundo lá fora / aconchego
   aqui dentro) + força visual com fotos reais do hotel.
   Paleta: âmbar de lareira + granito patagônico.
   ============================================================ */
const R = {
  night: "#16130d",
  stone: "#241f17",
  amber: "#d99a52",
  champagne: "#cfa86a",
  cream: "#f3efe6",
  cold: "#5a6b73",
  coldBg: "#1a2329",
  line: "rgba(243,239,230,0.16)",
};

const HERO_IMG = "/rioserrano/hero-exterior.jpg";

const STATS = [
  { v: "108", l: "quartos" },
  { v: "100%", l: "dentro do parque" },
  { v: "2", l: "restaurantes" },
  { v: "270m²", l: "spa com vista" },
];

/* ===== TIPOS DE QUARTO ===== */
const QUARTOS = [
  {
    nome: "Superior",
    capacidade: "1-3 hóspedes",
    tamanho: "32 m²",
    desc: "King-size ou 3 singles. Banheira ou chuveiro, vista direta para o maciço Torres del Paine.",
    amenidades: ["Banheira", "Vista Torres", "Safe", "Hairdryer"],
    img: "/rioserrano/quarto-superior.jpg",
  },
  {
    nome: "Standard",
    capacidade: "1-2 hóspedes",
    tamanho: "24 m²",
    desc: "King-size ou 2 singles. Chuveiro, mini-bar e a serenidade da Villa Serrano pela janela.",
    amenidades: ["Mini-bar", "Vista Villa", "Phone", "Safe"],
    img: "/rioserrano/quarto-standard.jpg",
  },
  {
    nome: "Classic",
    capacidade: "1-2 hóspedes",
    tamanho: "28 m²",
    desc: "King-size ou 2 singles. TV satélite e janela Velux no teto para observar as estrelas patagônicas.",
    amenidades: ["Velux estrelas", "TV satélite", "Mini-bar", "Vista Torres"],
    img: "/rioserrano/quarto-classic.jpg",
  },
];

/* ===== 4 PROGRAMAS ===== */
const PROGRAMAS = [
  {
    titulo: "Tudo Incluído",
    destaque: "Experiência completa",
    desc: "Alojamento, todas as refeições no Qawasqar, open bar no De Agostini, entrada no parque, excursões guiadas bilíngues The Massif, spa e WiFi.",
  },
  {
    titulo: "Hospedagem Completa",
    destaque: "Flexibilidade total",
    desc: "Alojamento com café, almoço e jantar (bebidas e vinho de casa inclusos), spa, piscina aquecida e WiFi. Você explora o parque no seu ritmo.",
  },
  {
    titulo: "Café da Manhã",
    destaque: "Conforto descontraído",
    desc: "Alojamento com buffet farto e refinado no Qawasqar, café italiano, spa e WiFi. Liberdade total para montar seus dias.",
  },
  {
    titulo: "Final de Ano",
    destaque: "23 dez a 3 jan",
    desc: "Tradição do fogón com cordeiro no espeto, cueca regional, jazz e folclore ao vivo, degustações de vinho e ceia gourmet sob o maciço.",
  },
];

/* ===== ATIVIDADES THE MASSIF (com foto) ===== */
const ATIVIDADES = [
  {
    num: "01",
    t: "Trekking guiado",
    d: "Base Torres, Valle del Francés, Mirador Cuernos e Sendero Grey. Saídas diárias com guias experientes.",
    img: "/rioserrano/massif-trekking.webp",
  },
  {
    num: "02",
    t: "Navegação de geleira",
    d: "Até a face do Glaciar Grey, entre témpanos azuis flutuando nas águas do Campo de Gelo Sul.",
    img: "/rioserrano/massif-paisagem.webp",
  },
  {
    num: "03",
    t: "Cavalgadas",
    d: "Pela estepe patagônica, no ritmo dos baqueanos. A conexão ancestral entre o homem e a terra do fim do mundo.",
    img: "/rioserrano/massif-cavalgada.webp",
  },
  {
    num: "04",
    t: "Fauna selvagem",
    d: "Guanacos, condores e a chance de avistar o puma. A vida bruta da Patagônia em estado puro.",
    img: "/rioserrano/massif-fauna.webp",
  },
];

/* ===== GALERIA ===== */
const GALERIA = [
  { src: "/rioserrano/hero-exterior.jpg", cap: "O hotel sob o arco-íris da Patagônia", tag: "O Refúgio" },
  { src: "/rioserrano/paine-1.webp", cap: "Os cornos do maciço Paine ao amanhecer", tag: "Paisagem" },
  { src: "/rioserrano/quarto-superior.jpg", cap: "Quarto Superior com vista para as Torres", tag: "Habitação" },
  { src: "/rioserrano/spa-pool-1.webp", cap: "Piscina aquecida com vista para o maciço", tag: "Spa" },
  { src: "/rioserrano/gastro-1.webp", cap: "Alta gastronomia patagônica no Qawasqar", tag: "Gastronomia" },
  { src: "/rioserrano/massif-trekking.webp", cap: "Trekking até a Base das Torres", tag: "The Massif" },
  { src: "/rioserrano/hotel-noite.webp", cap: "O lodge iluminado sob o céu estrelado", tag: "O Refúgio" },
  { src: "/rioserrano/massif-cavalgada.webp", cap: "Cavalgadas pela estepe ao entardecer", tag: "The Massif" },
];

function GaleriaInterativa() {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + GALERIA.length) % GALERIA.length);
  const next = () => setIdx((i) => (i + 1) % GALERIA.length);
  const img = GALERIA[idx];
  return (
    <div className="flex flex-col gap-3">
      <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "16/10" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0.6, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="absolute inset-0"
          >
            <img src={img.src} alt={img.cap} className="h-full w-full object-cover" />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${R.night}cc 0%, transparent 55%)` }} />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className="text-[10px] font-semibold uppercase tracking-[0.32em]" style={{ color: R.amber }}>
            {img.tag}
          </span>
          <p className="mt-1 text-[14px] font-light" style={{ color: R.cream }}>{img.cap}</p>
        </div>
        <span className="absolute right-4 top-4 text-[11px] font-medium" style={{ color: "rgba(243,239,230,0.5)" }}>
          {idx + 1} / {GALERIA.length}
        </span>
        <button onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full text-base font-light transition-all hover:opacity-100"
          style={{ background: "rgba(22,19,13,0.6)", color: R.amber, opacity: 0.8 }}>
          ‹
        </button>
        <button onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full text-base font-light transition-all hover:opacity-100"
          style={{ background: "rgba(22,19,13,0.6)", color: R.amber, opacity: 0.8 }}>
          ›
        </button>
      </div>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
        {GALERIA.map((g, i) => (
          <button key={i} onClick={() => setIdx(i)}
            className="relative overflow-hidden rounded-lg transition-all duration-300"
            style={{ aspectRatio: "16/10", outline: i === idx ? `2px solid ${R.amber}` : "2px solid transparent", outlineOffset: 2 }}>
            <img src={g.src} alt={g.cap}
              className="h-full w-full object-cover transition-opacity duration-300"
              style={{ opacity: i === idx ? 1 : 0.42 }} />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ===== TARIFAS COM MARGEM APLICADA ===== */
/* Cálculo: (tarifa - 20%) / 0.70 */
const TARIFAS = {
  baixa: {
    periodo: "10 Set a 10 Out 2026 · 1 a 2 Mai 2027",
    superior: { single: 1069, doble: 1611 },
    standard: { single: 949, doble: 1463 },
    classic: { single: 891, doble: 1394 },
    adicional: 606,
    crianca: 389,
  },
  media: {
    periodo: "11 Out a 31 Out 2026 · 1 a 30 Abr 2027",
    superior: { single: 1389, doble: 2091 },
    standard: { single: 1240, doble: 1886 },
    classic: { single: 1171, doble: 1806 },
    adicional: 783,
    crianca: 537,
  },
  alta: {
    periodo: "1 Nov a 22 Dez 2026 · 7 Jan a 31 Mar 2027",
    superior: { single: 1783, doble: 2686 },
    standard: { single: 1583, doble: 2446 },
    classic: { single: 1491, doble: 2331 },
    adicional: 1006,
    crianca: 600,
  },
  finalAno: {
    periodo: "23 Dez 2026 a 6 Jan 2027 · mínimo 2 noites",
    superior: { single: 2411, doble: 3531 },
    standard: { single: 1994, doble: 3086 },
    classic: { single: 1879, doble: 2943 },
    adicional: 1269,
    crianca: 600,
  },
};

export default function RioSerranoPage() {
  const [selectedSeason, setSelectedSeason] = useState<"baixa" | "media" | "alta" | "finalAno">("baixa");
  const heroRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);

  return (
    <main className="relative" style={{ background: R.cream }}>
      <Nav />

      {/* ===== HERO cinematográfico ===== */}
      <section ref={heroRef} className="grain relative flex min-h-[100svh] w-full flex-col justify-end overflow-hidden">
        <motion.div
          style={{ y: heroY, scale: heroScale, backgroundImage: `url('${HERO_IMG}')` }}
          className="absolute inset-0 bg-cover bg-center"
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${R.night} 4%, ${R.night}cc 28%, ${R.night}22 58%, ${R.night}55 100%)` }} />
        {/* fade-in overlay que dissolve */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 2, ease: EASE }}
          className="absolute inset-0"
          style={{ background: R.night }}
        />
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-14 md:px-10 md:pb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.4 }}
            className="mb-4 text-[12px] font-medium uppercase tracking-[0.4em] md:mb-6"
            style={{ color: R.amber }}
          >
            Torres del Paine · Hotel + Spa All Inclusive
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.5 }}
            className="font-display font-light uppercase leading-[0.84] tracking-[-0.02em]"
            style={{ color: R.cream, fontSize: "clamp(3rem, 11vw, 11rem)" }}
          >
            Rio
            <br />
            Serrano
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.8 }}
            className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <p className="max-w-md text-[15px] font-light leading-relaxed md:text-base" style={{ color: "rgba(243,239,230,0.8)" }}>
              No coração do Parque Nacional Torres del Paine. Lá fora, o fim do mundo; aqui dentro, lareira, alta gastronomia e uma janela para o maciço.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <span style={{ color: "rgba(243,239,230,0.85)" }}>
                <span className="text-[12px] uppercase tracking-[0.16em]" style={{ color: "rgba(243,239,230,0.5)" }}>
                  a partir de
                </span>{" "}
                <span className="font-display text-2xl">US$ 891 / noite</span>
              </span>
              <a
                href="#contato"
                className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]"
                style={{ background: R.amber, color: R.night }}
              >
                Reservar agora <span>→</span>
              </a>
            </div>
          </motion.div>
        </div>
        {/* indicador de scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="text-[18px]"
            style={{ color: R.amber }}
          >
            ↓
          </motion.div>
        </motion.div>
      </section>

      {/* ===== STATS ===== */}
      <section className="px-6 py-12 md:px-10" style={{ background: R.night }}>
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-6 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.l} delay={i * 0.05}>
              <div className="border-t pt-4" style={{ borderColor: R.line }}>
                <p className="font-display text-4xl font-light md:text-5xl" style={{ color: R.amber }}>
                  {s.v}
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.18em]" style={{ color: "rgba(243,239,230,0.45)" }}>
                  {s.l}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== O CONTRASTE: lá fora / aqui dentro ===== */}
      <section className="grid md:grid-cols-2">
        <div className="relative min-h-[460px] overflow-hidden md:min-h-[680px]">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/rioserrano/paine-1.webp')" }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${R.coldBg}f2, ${R.coldBg}44 60%, ${R.coldBg}66)` }} />
          <div className="relative z-10 flex h-full flex-col justify-end p-8 md:p-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: "#9cc4dd" }}>
              Lá fora
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.08]" style={{ color: R.cream }}>
              O fim do mundo, sem filtro
            </h2>
            <p className="mt-4 max-w-sm text-[15px] font-light leading-relaxed" style={{ color: "rgba(243,239,230,0.78)" }}>
              Vento, granito, gelo e os cornos das Torres rasgando o céu. A Patagônia bruta começa na porta do hotel.
            </p>
          </div>
        </div>
        <div className="relative min-h-[460px] overflow-hidden md:min-h-[680px]">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/rioserrano/hotel-noite.webp')" }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${R.stone}f2, ${R.stone}44 60%, ${R.stone}66)` }} />
          <div className="relative z-10 flex h-full flex-col justify-end p-8 md:p-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: R.amber }}>
              Aqui dentro
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.08]" style={{ color: R.cream }}>
              O aconchego que você merece
            </h2>
            <p className="mt-4 max-w-sm text-[15px] font-light leading-relaxed" style={{ color: "rgba(243,239,230,0.78)" }}>
              Lareira acesa, vinho chileno, banheira com vista e a cama que abraça depois do trekking. O luxo de voltar.
            </p>
          </div>
        </div>
      </section>

      {/* ===== INTRO / APRESENTAÇÃO ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: R.cream, color: R.stone }}>
        <div className="mx-auto max-w-[900px] text-center">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: R.champagne }}>
              Desde 2002 no coração do parque
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-[clamp(1.9rem,4vw,3.2rem)] font-light leading-[1.18]">
              O único complexo turístico com a melhor infraestrutura{" "}
              <span className="italic" style={{ color: R.amber }}>dentro</span> de Torres del Paine.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-7 max-w-xl text-[15px] font-light leading-relaxed" style={{ color: "rgba(36,31,23,0.65)" }}>
              De um lodge de 20 quartos em 2002 a um refúgio contemporâneo de 108 habitações. Hotel regional, familiar, entre os 10% mais populares do mundo no TripAdvisor. Aqui a natureza extrema encontra o conforto de um abraço.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== QUARTOS (com foto) ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: R.night }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: R.amber }}>
              <span className="h-px w-8" style={{ background: R.amber }} />
              Habitações
            </p>
            <h2 className="mt-5 font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1]" style={{ color: R.cream }}>
              Três categorias, mesmo conforto
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {QUARTOS.map((q, i) => (
              <Reveal key={q.nome} delay={i * 0.08}>
                <div className="group overflow-hidden rounded-2xl" style={{ background: "rgba(243,239,230,0.04)" }}>
                  <div className="relative h-[260px] overflow-hidden">
                    <img src={q.img} alt={q.nome} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${R.night}aa, transparent 55%)` }} />
                  </div>
                  <div className="p-7">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-display text-2xl font-light" style={{ color: R.cream }}>{q.nome}</h3>
                      <span className="text-[12px]" style={{ color: R.amber }}>{q.tamanho}</span>
                    </div>
                    <p className="mt-1 text-[12px] uppercase tracking-[0.16em]" style={{ color: "rgba(243,239,230,0.4)" }}>{q.capacidade}</p>
                    <p className="mt-4 text-[14px] font-light leading-relaxed" style={{ color: "rgba(243,239,230,0.7)" }}>{q.desc}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {q.amenidades.map((a) => (
                        <span key={a} className="rounded-full px-3 py-1 text-[11px]" style={{ background: `${R.amber}1a`, color: R.amber }}>
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROGRAMAS ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: R.cream, color: R.stone }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: R.champagne }}>
              <span className="h-px w-8" style={{ background: R.champagne }} />
              Opções de hospedagem
            </p>
            <h2 className="mt-5 font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1]">
              Quatro formas de viver o Rio Serrano
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {PROGRAMAS.map((p, i) => (
              <Reveal key={p.titulo} delay={i * 0.08}>
                <div className="h-full rounded-xl p-8" style={{ background: "#fff", borderLeft: `4px solid ${R.amber}`, boxShadow: "0 1px 30px rgba(36,31,23,0.06)" }}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-display text-xl font-light">{p.titulo}</h3>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: R.amber }}>
                      {p.destaque}
                    </span>
                  </div>
                  <p className="mt-5 text-[15px] font-light leading-relaxed" style={{ color: "rgba(36,31,23,0.7)" }}>{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GASTRONOMIA (com foto) ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: R.stone, color: R.cream }}>
        <div className="mx-auto grid max-w-[1280px] items-center gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <div className="relative h-[360px] overflow-hidden rounded-2xl md:h-[520px]">
              <img src="/rioserrano/gastro-1.webp" alt="Gastronomia patagônica" className="h-full w-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: R.amber }}>
                <span className="h-px w-8" style={{ background: R.amber }} />
                Alta gastronomia
              </p>
              <h2 className="mt-5 font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1]">
                Duas cozinhas, uma paisagem
              </h2>
              <p className="mt-6 text-[15px] font-light leading-relaxed" style={{ color: "rgba(243,239,230,0.72)" }}>
                O restaurante <span className="italic">Qawasqar</span>, inspirado nas raízes patagônicas, com vista para o maciço e a melhor seleção de Carmenere chileno. O <span className="italic">De Agostini Restobar</span>, com craft cocktails de Calafate e Aji Verde para ver o pôr do sol. Sob o comando do chef <span style={{ color: R.amber }}>Valter Leal</span>, do cordeiro magalânico à centolla.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== SPA (com foto split) ===== */}
      <section className="grid md:grid-cols-2">
        <div className="relative min-h-[400px] overflow-hidden md:min-h-[600px] md:order-2">
          <img src="/rioserrano/spa-pool-1.webp" alt="Spa Jenák" className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div className="flex flex-col justify-center px-6 py-20 md:order-1 md:px-14 md:py-0" style={{ background: R.night }}>
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: R.amber }}>
              Spa Jenák · bem estar
            </p>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,3.5vw,3rem)] font-light leading-[1.12]" style={{ color: R.cream }}>
              Relaxar olhando o gelo
            </h2>
            <p className="mt-6 max-w-md text-[15px] font-light leading-relaxed" style={{ color: "rgba(243,239,230,0.7)" }}>
              Piscina aquecida de 270m² com água de origem glacial, hidromassagem e cascatas, sauna, academia equipada e massagens personalizadas com produtos cruelty-free. O maciço <span className="italic" style={{ color: R.amber }}>emoldurado na janela</span>.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {["Piscina 270m²", "Sauna", "Academia 35m²", "Massagens"].map((x) => (
                <span key={x} className="rounded-full px-4 py-1.5 text-[12px]" style={{ background: `${R.amber}1a`, color: R.amber }}>{x}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== ATIVIDADES (The Massif) com foto ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: R.cream, color: R.stone }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: R.champagne }}>
              <span className="h-px w-8" style={{ background: R.champagne }} />
              As experiências · The Massif
            </p>
            <h2 className="mt-5 max-w-2xl font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1]">
              O refúgio é a base. A natureza é o programa.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {ATIVIDADES.map((e, i) => (
              <Reveal key={e.t} delay={i * 0.06}>
                <div className="group relative h-[340px] overflow-hidden rounded-2xl md:h-[420px]">
                  <img src={e.img} alt={e.t} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${R.night}f0 5%, ${R.night}44 45%, transparent 70%)` }} />
                  <div className="absolute inset-0 flex flex-col justify-end p-7">
                    <span className="font-display text-sm" style={{ color: R.amber }}>{e.num}</span>
                    <h3 className="mt-2 font-display text-2xl font-light md:text-3xl" style={{ color: R.cream }}>{e.t}</h3>
                    <p className="mt-3 max-w-sm text-[14px] font-light leading-relaxed" style={{ color: "rgba(243,239,230,0.78)" }}>
                      {e.d}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GALERIA INTERATIVA ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: R.stone }}>
        <div className="mx-auto max-w-[1100px]">
          <Reveal>
            <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: R.amber }}>
              Galeria
            </p>
            <h2 className="mb-12 text-center font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-light leading-[1.15]" style={{ color: R.cream }}>
              O fim do mundo, em imagens
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <GaleriaInterativa />
          </Reveal>
        </div>
      </section>

      {/* ===== TARIFAS (tipo Skorpios) ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: R.night }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: R.amber }}>
              Valores por quarto
            </p>
            <h2 className="mt-5 font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1]" style={{ color: R.cream }}>
              Tarifas 2026/2027 · All Inclusive
            </h2>
            <p className="mt-4 max-w-lg text-[14px] font-light leading-relaxed" style={{ color: "rgba(243,239,230,0.55)" }}>
              Preços por pessoa em USD. Incluem todas as refeições a bordo, excursões guiadas e transfer aeroporto.
            </p>
          </Reveal>

          {/* Selector de temporada */}
          <div className="mt-10 flex flex-wrap gap-3">
            {(["baixa", "media", "alta", "finalAno"] as const).map((season) => (
              <button
                key={season}
                onClick={() => setSelectedSeason(season)}
                className="rounded-full px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition-all duration-300"
                style={{
                  background: selectedSeason === season ? R.amber : "transparent",
                  color: selectedSeason === season ? R.night : "rgba(243,239,230,0.7)",
                  border: `1px solid ${selectedSeason === season ? R.amber : "rgba(243,239,230,0.2)"}`,
                }}
              >
                {season === "baixa" && "Temporada Baixa"}
                {season === "media" && "Temporada Média"}
                {season === "alta" && "Temporada Alta"}
                {season === "finalAno" && "Final de Ano"}
              </button>
            ))}
          </div>

          {/* Tabela */}
          <div className="mt-10 overflow-hidden rounded-2xl" style={{ background: "rgba(243,239,230,0.03)", border: `1px solid ${R.line}` }}>
            <table className="w-full text-left text-[15px]" style={{ color: R.cream }}>
              <thead>
                <tr style={{ background: `${R.amber}12` }}>
                  <th className="px-6 py-5 text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: R.amber }}>
                    Tipo de Quarto
                  </th>
                  <th className="px-6 py-5 text-center text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: R.amber }}>
                    Single USD
                  </th>
                  <th className="px-6 py-5 text-center text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: R.amber }}>
                    Doble USD
                  </th>
                </tr>
              </thead>
              <tbody>
                {(["superior", "standard", "classic"] as const).map((tipo) => {
                  const values = TARIFAS[selectedSeason][tipo];
                  return (
                    <tr key={tipo} style={{ borderTop: `1px solid ${R.line}` }}>
                      <td className="px-6 py-5 font-display text-base capitalize">{tipo}</td>
                      <td className="px-6 py-5 text-center">US$ {values.single.toLocaleString("pt-BR")}</td>
                      <td className="px-6 py-5 text-center">US$ {values.doble.toLocaleString("pt-BR")}</td>
                    </tr>
                  );
                })}
                <tr style={{ borderTop: `1px solid ${R.line}` }}>
                  <td className="px-6 py-5 text-[14px]" style={{ color: "rgba(243,239,230,0.75)" }}>Acompanhante Adicional</td>
                  <td colSpan={2} className="px-6 py-5 text-center">US$ {TARIFAS[selectedSeason].adicional.toLocaleString("pt-BR")}</td>
                </tr>
                <tr style={{ borderTop: `1px solid ${R.line}` }}>
                  <td className="px-6 py-5 text-[14px]" style={{ color: "rgba(243,239,230,0.75)" }}>Criança</td>
                  <td colSpan={2} className="px-6 py-5 text-center">US$ {TARIFAS[selectedSeason].crianca.toLocaleString("pt-BR")}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-5 text-[12px]" style={{ color: "rgba(243,239,230,0.5)" }}>
            {TARIFAS[selectedSeason].periodo} · Valores por pessoa. Consulte disponibilidade e tarifas para cabine single.
          </p>
        </div>
      </section>

      {/* ===== AONIKIA ===== */}
      <section className="px-6 py-20 md:px-10 md:py-24" style={{ background: R.stone }}>
        <div className="mx-auto max-w-[860px] text-center">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: R.amber }}>
              AonikIA · especialista neste refúgio
            </p>
            <h2 className="mt-5 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-light leading-[1.15]" style={{ color: R.cream }}>
              Monte sua estadia perfeita
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] font-light leading-relaxed" style={{ color: "rgba(243,239,230,0.65)" }}>
              Quantas noites, qual quarto, quais experiências, melhor época. A AonikIA conhece o Rio Serrano e te conecta com um especialista.
            </p>
            <a
              href="#contato"
              className="mt-7 inline-flex items-center gap-3 rounded-full border px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition-all duration-300"
              style={{ borderColor: R.amber, color: R.amber }}
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
