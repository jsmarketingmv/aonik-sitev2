"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Nav from "../../components/Nav";
import Breadcrumb from "../../components/Breadcrumb";
import Footer from "../../components/Footer";
import Contato from "../../components/Contato";
import FloatingActions from "../../components/FloatingActions";
import { Reveal, EASE } from "../../components/ui";

/* ============================================================
   HOTEL LAS TORRES · Estância Patagônica · Torres del Paine
   Personalidade: A ESTÂNCIA. Empresa familiar chilena com mais
   de 30 anos, no coração do Parque Nacional Torres del Paine,
   na base dos circuitos W e O. Conceito "Patagônia Contemporânea".
   Conteúdo: Brochure oficial Temporada 2026/2027 (USD).
   Paleta: ouro de estância + granito + campo dourado.
   ============================================================ */
const L = {
  night: "#14161a",
  stone: "#22252b",
  gold: "#cda45e",
  goldSoft: "#ddb877",
  cream: "#f2ede3",
  cold: "#6b7884",
  coldBg: "#1b2026",
  line: "rgba(242,237,227,0.16)",
};

const HERO_IMG = "/lastorres/hero.jpg";

const STATS = [
  { v: "74", l: "habitações remodeladas" },
  { v: "+30", l: "anos de história familiar" },
  { v: "W & O", l: "na base dos circuitos" },
  { v: "100%", l: "dentro do parque" },
];

/* ===== TIPOS DE QUARTO ===== */
const QUARTOS = [
  {
    nome: "Habitação Superior",
    capacidade: "Incluída em todos os programas",
    desc: "A habitação que acompanha cada programa Las Torres. Cama king ou twin, vista para a montanha ou para o jardim da estância, conforto contemporâneo e o aconchego da madeira nativa depois de um dia inteiro na trilha.",
    amenidades: ["King ou twin", "Vista montanha", "Calefação", "Wi-Fi"],
    img: "/lastorres/quarto-superior.jpg",
  },
  {
    nome: "Junior Suite Superior",
    capacidade: "Upgrade · US$ 371 por pessoa/noite",
    desc: "A habitação mais espaçosa da estância. Cama king e vista direta para o maciço Paine, para quem quer acordar diante das torres de granito. Upgrade disponível sobre qualquer programa.",
    amenidades: ["King-size", "Vista Paine", "Mais ampla", "Calefação"],
    img: "/lastorres/quarto-suite.jpg",
  },
];

/* ===== EXPERIÊNCIAS / EXCURSÕES ===== */
const ATIVIDADES = [
  {
    num: "01",
    t: "Trekking às Torres",
    d: "A trilha mais famosa da Patagônia começa na porta do hotel: Base Torres, o Circuito W e o lendário Circuito O, com guias bilíngues altamente qualificados.",
    img: "/lastorres/trekking-torres.jpg",
  },
  {
    num: "02",
    t: "Navegação no Lago Grey",
    d: "Até a face do Glaciar Grey, entre témpanos azuis do Campo de Gelo Sul. Cupos limitados, reserve com antecedência (inclusa na modalidade 100% Privada).",
    img: "/lastorres/navegacao.jpg",
  },
  {
    num: "03",
    t: "Cavalgadas patagônicas",
    d: "Monte com os baqueanos da estância e cruze a estepe no ritmo dos cavalos, como se faz aqui há mais de 50 anos. Há uma autêntica pesebrera no hotel.",
    img: "/lastorres/cavalgada-1.jpg",
  },
  {
    num: "04",
    t: "Fauna & paisagem",
    d: "Encontro com pumas, guanacos e condores no santuário de vida selvagem mais rico da Patagônia, entre geleiras, lagos turquesa e bosques nativos.",
    img: "/lastorres/fauna-guanaco.jpg",
  },
];

/* ===== O QUE O PROGRAMA TODO INCLUÍDO INCLUI / NÃO INCLUI ===== */
const INCLUI = [
  "Todas as refeições",
  "Bar aberto",
  "Wi-Fi",
  "Hospedagem em Habitação Superior",
  "Traslados regulares (Punta Arenas, Puerto Natales e El Calafate)",
  "Guias bilíngues espanhol / inglês",
  "Entradas ao Parque Nacional Torres del Paine",
  "Todas as excursões do catálogo",
  "Sala de massagens (20% de desconto nos tratamentos)",
];
const NAO_INCLUI = [
  "Vinhos, bebidas e cervejas premium",
  "Traslados fora de horário",
  "Gorjetas",
  "Serviço de lavanderia",
  "Navegações",
  "Seguro de viagem",
  "Guia nos transfers in / out",
  "Serviços não mencionados",
];

/* ===== GALERIA DE GASTRONOMIA (bloco gastronomia) ===== */
const GASTRO_GALERIA = [
  { src: "/lastorres/hotel-br.jpg", cap: "A estância ao entardecer" },
  { src: "/lastorres/cocina.jpg", cap: "Jantar patagônico à mesa" },
  { src: "/lastorres/bar-hotel.jpg", cap: "Um brinde no bar aberto" },
  { src: "/lastorres/img05.jpg", cap: "Alta gastronomia regional" },
];

/* ===== GALERIA PRINCIPAL ===== */
const GALERIA = [
  { src: "/lastorres/hotel-br.jpg", cap: "A estância ao entardecer", tag: "A Estância" },
  { src: "/lastorres/quarto-suite.jpg", cap: "Junior Suite com vista para o maciço", tag: "Habitação" },
  { src: "/lastorres/lounge.jpg", cap: "Lounge com lareira e janelas para a montanha", tag: "Interiores" },
  { src: "/lastorres/vista-0144.jpg", cap: "Mirante sobre os lagos do parque", tag: "Paisagem" },
  { src: "/lastorres/cuernos.jpg", cap: "Os Cuernos del Paine sobre o lago", tag: "Paisagem" },
  { src: "/lastorres/cocteleria.jpg", cap: "Coquetelaria de autor no bar", tag: "Bar" },
  { src: "/lastorres/wine.jpg", cap: "Wine experience patagônica", tag: "Gastronomia" },
  { src: "/lastorres/fogon.jpg", cap: "O fogón, coração da cultura de estância", tag: "Herança" },
  { src: "/lastorres/img033.jpg", cap: "Salão social com vista panorâmica", tag: "Interiores" },
  { src: "/lastorres/img04.jpg", cap: "O bar do hotel", tag: "Bar" },
  { src: "/lastorres/spa.jpg", cap: "Sala de massagens e bem-estar", tag: "Bem-estar" },
  { src: "/lastorres/pano-1200x500.jpg", cap: "Habitação contemporânea", tag: "Habitação" },
  { src: "/lastorres/pano-1200x1000.jpg", cap: "Quarto com vista para o jardim", tag: "Habitação" },
  { src: "/lastorres/allinc.jpg", cap: "Lounge e lareira da estância", tag: "Interiores" },
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
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${L.night}cc 0%, transparent 55%)` }} />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className="text-[10px] font-semibold uppercase tracking-[0.32em]" style={{ color: L.gold }}>
            {img.tag}
          </span>
          <p className="mt-1 text-[14px] font-light" style={{ color: L.cream }}>{img.cap}</p>
        </div>
        <span className="absolute right-4 top-4 text-[11px] font-medium" style={{ color: "rgba(242,237,227,0.5)" }}>
          {idx + 1} / {GALERIA.length}
        </span>
        <button onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full text-base font-light transition-all hover:opacity-100"
          style={{ background: "rgba(20,22,26,0.6)", color: L.gold, opacity: 0.8 }}>
          ‹
        </button>
        <button onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full text-base font-light transition-all hover:opacity-100"
          style={{ background: "rgba(20,22,26,0.6)", color: L.gold, opacity: 0.8 }}>
          ›
        </button>
      </div>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
        {GALERIA.map((g, i) => (
          <button key={i} onClick={() => setIdx(i)}
            className="relative overflow-hidden rounded-lg transition-all duration-300"
            style={{ aspectRatio: "16/10", outline: i === idx ? `2px solid ${L.gold}` : "2px solid transparent", outlineOffset: 2 }}>
            <img src={g.src} alt={g.cap}
              className="h-full w-full object-cover transition-opacity duration-300"
              style={{ opacity: i === idx ? 1 : 0.42 }} />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   TARIFAS COM MARGEM APLICADA
   Fonte: Brochure Hotel Las Torres TTOO USD 2026/2027.
   Regra do hotel: programa All Inclusive = comissão 20%.
   Precificação AONIK: tarifa_final = (tarifa_sugerida x 0,80) / 0,70.
   Valores POR PESSOA em USD, já com a margem aplicada e
   arredondados ao dólar. Niños a partir de 5 anos.
   ============================================================ */
type Linha = { noites: string; doble: number; single: number; ninos?: number };

const TEMPORADAS = {
  baja: "1 a 31 Out 2026 · 1 a 27 Abr 2027",
  alta: "1 Nov a 21 Dez 2026 · 4 Jan a 31 Mar 2027",
  especial: "22 Dez 2026 a 3 Jan 2027",
};

const PROGRAMAS_TARIFA = {
  classico: {
    label: "Todo Incluído Clássico",
    desc: "Traslados regulares, hospedagem em Habitação Superior, gastronomia e bebidas ilimitadas (exceto cervejas e bebidas premium) e todas as excursões do catálogo, em um itinerário montado ao seu gosto.",
    temporadas: {
      baja: [
        { noites: "2 noites", doble: 2960, single: 4046, ninos: 1486 },
        { noites: "3 noites", doble: 4000, single: 5509, ninos: 2023 },
        { noites: "4 noites", doble: 5006, single: 6400, ninos: 2457 },
        { noites: "5 noites", doble: 5897, single: 8011, ninos: 2857 },
      ] as Linha[],
      alta: [
        { noites: "2 noites", doble: 3189, single: 4377, ninos: 1634 },
        { noites: "3 noites", doble: 4514, single: 6023, ninos: 2251 },
        { noites: "4 noites", doble: 5600, single: 7463, ninos: 2743 },
        { noites: "5 noites", doble: 6560, single: 8743, ninos: 3177 },
      ] as Linha[],
      especial: [
        { noites: "2 noites", doble: 3526, single: 4811, ninos: 1783 },
        { noites: "3 noites", doble: 4949, single: 6606, ninos: 2469 },
        { noites: "4 noites", doble: 6171, single: 8297, ninos: 3017 },
        { noites: "5 noites", doble: 7200, single: 9589, ninos: 3486 },
      ] as Linha[],
    } as Record<string, Linha[]>,
  },
  privada: {
    label: "Todo Incluído 100% Privada",
    desc: "Traslados privados, excursões privadas com guia exclusivo, navegação no Lago Grey inclusa e hospedagem em Habitação Superior. Cada programa é desenhado sob medida, em um itinerário completamente personalizado.",
    temporadas: {
      baja: [
        { noites: "3 noites", doble: 5600, single: 9017 },
        { noites: "4 noites", doble: 7029, single: 10743 },
      ] as Linha[],
      alta: [
        { noites: "3 noites", doble: 6171, single: 9543 },
        { noites: "4 noites", doble: 7600, single: 11760 },
      ] as Linha[],
      especial: [
        { noites: "3 noites", doble: 6571, single: 10114 },
        { noites: "4 noites", doble: 8229, single: 12594 },
      ] as Linha[],
    } as Record<string, Linha[]>,
  },
};

type ProgramaKey = keyof typeof PROGRAMAS_TARIFA;
type SeasonKey = keyof typeof TEMPORADAS;

export default function HotelLasTorresPage() {
  const [programa, setPrograma] = useState<ProgramaKey>("classico");
  const [temporada, setTemporada] = useState<SeasonKey>("baja");
  const linhas = PROGRAMAS_TARIFA[programa].temporadas[temporada];
  const mostraNinos = programa === "classico";

  const heroRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);

  return (
    <main className="relative" style={{ background: L.cream }}>
      <Nav />

      {/* ===== HERO ===== */}
      <section ref={heroRef} className="grain relative flex min-h-[100svh] w-full flex-col justify-end overflow-hidden">
        <motion.div
          style={{ y: heroY, scale: heroScale, backgroundImage: `url('${HERO_IMG}')` }}
          className="absolute inset-0 bg-cover bg-center"
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${L.night} 4%, ${L.night}cc 28%, ${L.night}22 58%, ${L.night}55 100%)` }} />
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 2, ease: EASE }}
          className="absolute inset-0"
          style={{ background: L.night }}
        />
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-14 md:px-10 md:pb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.4 }}
            className="mb-4 text-[12px] font-medium uppercase tracking-[0.4em] md:mb-6"
            style={{ color: L.gold }}
          >
            Torres del Paine · Estância Patagônica
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.5 }}
            className="font-display font-light uppercase leading-[0.84] tracking-[-0.02em]"
            style={{ color: L.cream, fontSize: "clamp(2.6rem, 9vw, 9.5rem)" }}
          >
            Hotel
            <br />
            Las Torres
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.8 }}
            className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <p className="max-w-md text-[15px] font-light leading-relaxed md:text-base" style={{ color: "rgba(242,237,227,0.8)" }}>
              A estância familiar no coração do Parque Nacional Torres del Paine. Cavalos, baqueanos e as torres de granito a um passo da porta, com a melhor localização para viver a Oitava Maravilha do Mundo.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <span style={{ color: "rgba(242,237,227,0.85)" }}>
                <span className="text-[12px] uppercase tracking-[0.16em]" style={{ color: "rgba(242,237,227,0.5)" }}>
                  a partir de
                </span>{" "}
                <span className="font-display text-2xl">US$ 1.480 / noite</span>
              </span>
              <a
                href="#tarifas"
                className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]"
                style={{ background: L.gold, color: L.night }}
              >
                Ver programas e tarifas <span>→</span>
              </a>
            </div>
            <div className="mt-7">
              <Breadcrumb tone="dark" accent={L.gold} items={[
                { label: "Home", href: "/" },
                { label: "Hotéis", href: "/hoteis" },
                { label: "Hotel Las Torres" },
              ]} />
            </div>
          </motion.div>
        </div>
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
            style={{ color: L.gold }}
          >
            ↓
          </motion.div>
        </motion.div>
      </section>

      {/* ===== STATS ===== */}
      <section className="px-6 py-12 md:px-10" style={{ background: L.night }}>
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-6 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.l} delay={i * 0.05}>
              <div className="border-t pt-4" style={{ borderColor: L.line }}>
                <p className="font-display text-4xl font-light md:text-5xl" style={{ color: L.gold }}>
                  {s.v}
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.18em]" style={{ color: "rgba(242,237,227,0.45)" }}>
                  {s.l}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== A ESTÂNCIA (story) ===== */}
      <section className="grid md:grid-cols-2">
        <div className="relative min-h-[460px] overflow-hidden md:min-h-[680px]">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/lastorres/estancia-1.jpg')" }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${L.night}aa, ${L.night}22 60%, ${L.night}44)` }} />
        </div>
        <div className="flex flex-col justify-center px-6 py-20 md:px-14 md:py-0" style={{ background: L.stone }}>
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: L.gold }}>
              Somos Las Torres Patagonia
            </p>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,3.5vw,3rem)] font-light leading-[1.12]" style={{ color: L.cream }}>
              Uma estância familiar no coração do parque
            </h2>
            <p className="mt-6 max-w-md text-[15px] font-light leading-relaxed" style={{ color: "rgba(242,237,227,0.72)" }}>
              Uma reserva natural e cultural, e uma empresa familiar chilena com mais de 30 anos de experiência em turismo. Nosso tradicional Hotel Estância oferece a melhor localização do Parque Nacional Torres del Paine, unindo uma estadia premium à essência da cultura patagônica.
            </p>
            <p className="mt-4 max-w-md text-[15px] font-light leading-relaxed" style={{ color: "rgba(242,237,227,0.72)" }}>
              Sob o conceito de <span style={{ color: L.gold }}>Patagônia Contemporânea</span>, o design interior funde tradição e modernidade, enquanto a histórica fachada de madeira nativa preserva o caráter genuíno do lugar. E na porta, o começo da trilha mais famosa do mundo: a subida à Base das Torres.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== VÍDEO ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: L.night }}>
        <div className="mx-auto max-w-[1100px]">
          <Reveal>
            <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: L.gold }}>
              O filme da estância
            </p>
            <h2 className="mb-12 text-center font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-light leading-[1.15]" style={{ color: L.cream }}>
              Torres del Paine como poucos veem
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "16/9", border: `1px solid ${L.line}`, boxShadow: "0 30px 80px rgba(0,0,0,0.5)" }}>
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube-nocookie.com/embed/QcytVbo0-3Y?rel=0&modestbranding=1"
                title="Hotel Las Torres Patagonia"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== CONSERVAÇÃO & RECONHECIMENTO ===== */}
      <section className="px-6 py-20 md:px-10 md:py-28" style={{ background: L.cream, color: L.stone }}>
        <div className="mx-auto max-w-[1100px]">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: L.gold }}>
              <span className="h-px w-8" style={{ background: L.gold }} />
              Conservação & reconhecimento
            </p>
            <h2 className="mt-5 max-w-2xl font-display text-[clamp(1.7rem,3.4vw,2.7rem)] font-light leading-[1.14]">
              Um projeto de turismo sustentável premiado no mundo todo
            </h2>
            <p className="mt-6 max-w-2xl text-[15px] font-light leading-relaxed" style={{ color: "rgba(34,37,43,0.7)" }}>
              Em 2004 criamos a ONG ambiental Las Torres Patagonia Conservancy (ex AMA Torres del Paine) para impulsionar a conservação, a pesquisa e a educação ambiental. Em 2013, decidimos retirar o gado da reserva para preservar o solo. Também cultivamos uma horta biointensiva, uma das mais austrais do Chile.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { v: "2004", l: "ONG Conservancy criada" },
              { v: "2013", l: "gado retirado da reserva" },
              { v: "Top 500", l: "melhores hotéis do mundo · Travel+Leisure" },
              { v: "WTA", l: "Hotel Ecológico Líder da América do Sul" },
            ].map((x, i) => (
              <Reveal key={x.l} delay={i * 0.06}>
                <div className="h-full rounded-xl p-6" style={{ background: "#fff", borderTop: `3px solid ${L.gold}`, boxShadow: "0 1px 24px rgba(34,37,43,0.06)" }}>
                  <p className="font-display text-2xl font-light" style={{ color: "#8a6a30" }}>{x.v}</p>
                  <p className="mt-2 text-[13px] font-light leading-relaxed" style={{ color: "rgba(34,37,43,0.62)" }}>{x.l}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== QUARTOS ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: L.night }}>
        <div className="mx-auto max-w-[1100px]">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: L.gold }}>
              <span className="h-px w-8" style={{ background: L.gold }} />
              Habitações
            </p>
            <h2 className="mt-5 font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1]" style={{ color: L.cream }}>
              74 quartos com a montanha na janela
            </h2>
            <p className="mt-5 max-w-xl text-[15px] font-light leading-relaxed" style={{ color: "rgba(242,237,227,0.65)" }}>
              Recentemente remodeladas sob o conceito de Patagônia Contemporânea: móveis elegantes, cores sóbrias e a madeira nativa que conta a história da estância.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {QUARTOS.map((q, i) => (
              <Reveal key={q.nome} delay={i * 0.08}>
                <div className="group overflow-hidden rounded-2xl" style={{ background: "rgba(242,237,227,0.04)" }}>
                  <div className="relative h-[300px] overflow-hidden">
                    <img src={q.img} alt={q.nome} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${L.night}88, transparent 55%)` }} />
                  </div>
                  <div className="p-8">
                    <h3 className="font-display text-2xl font-light" style={{ color: L.cream }}>{q.nome}</h3>
                    <p className="mt-1 text-[12px] uppercase tracking-[0.16em]" style={{ color: L.gold }}>{q.capacidade}</p>
                    <p className="mt-4 text-[15px] font-light leading-relaxed" style={{ color: "rgba(242,237,227,0.7)" }}>{q.desc}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {q.amenidades.map((a) => (
                        <span key={a} className="rounded-full px-3 py-1 text-[11px]" style={{ background: `${L.gold}1f`, color: L.goldSoft }}>
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

      {/* ===== EXPERIÊNCIA TODO INCLUÍDO (inclui / não inclui) ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: L.cream, color: L.stone }}>
        <div className="mx-auto max-w-[1100px]">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: L.gold }}>
              <span className="h-px w-8" style={{ background: L.gold }} />
              Experiência Todo Incluído
            </p>
            <h2 className="mt-5 max-w-2xl font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1]">
              Tudo pensado para você só se preocupar com a paisagem
            </h2>
            <p className="mt-6 max-w-2xl text-[15px] font-light leading-relaxed" style={{ color: "rgba(34,37,43,0.7)" }}>
              Com o programa All Inclusive, basta chegar a um destino próximo (Puerto Natales, Punta Arenas ou El Calafate) e a partir dali a experiência com a Las Torres Patagonia começa. Todo o roteiro é montado ao seu gosto.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl p-8" style={{ background: "#fff", boxShadow: "0 1px 30px rgba(34,37,43,0.07)" }}>
                <h3 className="font-display text-xl font-light" style={{ color: "#8a6a30" }}>O programa inclui</h3>
                <ul className="mt-5 space-y-3">
                  {INCLUI.map((x) => (
                    <li key={x} className="flex gap-3 text-[14px] font-light leading-relaxed" style={{ color: "rgba(34,37,43,0.78)" }}>
                      <span style={{ color: L.gold }}>✓</span>
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="h-full rounded-2xl p-8" style={{ background: L.stone, color: L.cream }}>
                <h3 className="font-display text-xl font-light" style={{ color: L.goldSoft }}>O programa não inclui</h3>
                <ul className="mt-5 space-y-3">
                  {NAO_INCLUI.map((x) => (
                    <li key={x} className="flex gap-3 text-[14px] font-light leading-relaxed" style={{ color: "rgba(242,237,227,0.72)" }}>
                      <span style={{ color: L.cold }}>·</span>
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-[12px] font-light leading-relaxed" style={{ color: "rgba(242,237,227,0.5)" }}>
                  A gorjeta no Chile é regulada por lei e, mesmo não sendo obrigatória, é sugerida em ao menos 10% do consumo.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== GASTRONOMIA ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: L.stone, color: L.cream }}>
        <div className="mx-auto grid max-w-[1280px] items-center gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <div className="grid grid-cols-2 gap-3">
              {GASTRO_GALERIA.map((g) => (
                <div key={g.src} className="group relative overflow-hidden rounded-xl" style={{ aspectRatio: "4/3" }}>
                  <img src={g.src} alt={g.cap} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: `linear-gradient(to top, ${L.night}dd, transparent 60%)` }} />
                  <p className="absolute bottom-3 left-3 right-3 text-[12px] font-light opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ color: L.cream }}>
                    {g.cap}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: L.gold }}>
                <span className="h-px w-8" style={{ background: L.gold }} />
                Gastronomia & lareira
              </p>
              <h2 className="mt-5 font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1]">
                A mesa farta da estância
              </h2>
              <p className="mt-6 text-[15px] font-light leading-relaxed" style={{ color: "rgba(242,237,227,0.72)" }}>
                Dias ativos pelas montanhas, geleiras e lagos; à noite, o jantar e uma boa taça no calor do hotel. Uma cozinha regional com produtos locais e bebidas ilimitadas no bar aberto (exceto cervejas e bebidas premium), ao redor da lareira e do fogón, onde vive a cultura patagônica.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {["Restaurante regional", "Bar aberto", "Lounge com lareira", "Fogón patagônico"].map((x) => (
                  <span key={x} className="rounded-full px-4 py-1.5 text-[12px]" style={{ background: `${L.gold}1f`, color: L.goldSoft }}>{x}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== EXCURSÕES / ATIVIDADES ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: L.cream, color: L.stone }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: L.gold }}>
              <span className="h-px w-8" style={{ background: L.gold }} />
              As experiências
            </p>
            <h2 className="mt-5 max-w-2xl font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1]">
              Excursões de dia inteiro e meio dia, saindo da própria estância
            </h2>
            <p className="mt-6 max-w-2xl text-[15px] font-light leading-relaxed" style={{ color: "rgba(34,37,43,0.7)" }}>
              Uma variedade de excursões para conhecer cada segredo deste grande parque: caminhadas, trekking, passeios a cavalo e tours, com guias altamente qualificados. Todos os detalhes podem ser confirmados diretamente no hotel.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {ATIVIDADES.map((e, i) => (
              <Reveal key={e.t} delay={i * 0.06}>
                <div className="group relative h-[340px] overflow-hidden rounded-2xl md:h-[420px]">
                  <img src={e.img} alt={e.t} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${L.night}f0 5%, ${L.night}44 45%, transparent 70%)` }} />
                  <div className="absolute inset-0 flex flex-col justify-end p-7">
                    <span className="font-display text-sm" style={{ color: L.gold }}>{e.num}</span>
                    <h3 className="mt-2 font-display text-2xl font-light md:text-3xl" style={{ color: L.cream }}>{e.t}</h3>
                    <p className="mt-3 max-w-sm text-[14px] font-light leading-relaxed" style={{ color: "rgba(242,237,227,0.78)" }}>
                      {e.d}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LOUNGE & BEM-ESTAR ===== */}
      <section className="grid md:grid-cols-2">
        <div className="relative min-h-[400px] overflow-hidden md:min-h-[600px] md:order-2">
          <img src="/lastorres/lounge.jpg" alt="Lounge com lareira" className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div className="flex flex-col justify-center px-6 py-20 md:order-1 md:px-14 md:py-0" style={{ background: L.night }}>
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: L.gold }}>
              Descanso & bem-estar
            </p>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,3.5vw,3rem)] font-light leading-[1.12]" style={{ color: L.cream }}>
              O conforto de voltar para a estância
            </h2>
            <p className="mt-6 max-w-md text-[15px] font-light leading-relaxed" style={{ color: "rgba(242,237,227,0.7)" }}>
              Parte da experiência é simplesmente estar aqui. Lounge com lareira e janelas para a montanha, sala de massagens com 20% de desconto nos tratamentos para hóspedes, e o silêncio da Patagônia depois de um dia inteiro na trilha.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {["Sala de massagens", "Lounge & lareira", "Wi-Fi", "Horta biointensiva"].map((x) => (
                <span key={x} className="rounded-full px-4 py-1.5 text-[12px]" style={{ background: `${L.gold}1f`, color: L.goldSoft }}>{x}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== GALERIA ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: L.night }}>
        <div className="mx-auto max-w-[1100px]">
          <Reveal>
            <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: L.gold }}>
              Galeria
            </p>
            <h2 className="mb-12 text-center font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-light leading-[1.15]" style={{ color: L.cream }}>
              A estância e as torres, em imagens
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <GaleriaInterativa />
          </Reveal>
        </div>
      </section>

      {/* ===== TARIFAS ===== */}
      <section id="tarifas" className="px-6 py-24 md:px-10 md:py-32" style={{ background: L.stone }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: L.gold }}>
              Programas & tarifas 2026 / 2027
            </p>
            <h2 className="mt-5 font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1]" style={{ color: L.cream }}>
              Escolha o programa e a temporada
            </h2>
            <p className="mt-4 max-w-lg text-[14px] font-light leading-relaxed" style={{ color: "rgba(242,237,227,0.55)" }}>
              Valores por pessoa, em dólares, conforme o número de noites. Crianças a partir de 5 anos.
            </p>
          </Reveal>

          {/* Seletor de PROGRAMA */}
          <div className="mt-9">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em]" style={{ color: "rgba(242,237,227,0.4)" }}>
              Programa
            </p>
            <div className="inline-flex flex-wrap gap-1.5 rounded-full p-1.5" style={{ background: "rgba(242,237,227,0.05)", border: `1px solid ${L.line}` }}>
              {(Object.keys(PROGRAMAS_TARIFA) as ProgramaKey[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPrograma(p)}
                  className="rounded-full px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] transition-all duration-300"
                  style={{
                    background: programa === p ? L.gold : "transparent",
                    color: programa === p ? L.night : "rgba(242,237,227,0.7)",
                  }}
                >
                  {PROGRAMAS_TARIFA[p].label}
                </button>
              ))}
            </div>
            <p className="mt-3 max-w-2xl text-[13px] font-light leading-relaxed" style={{ color: "rgba(242,237,227,0.55)" }}>
              {PROGRAMAS_TARIFA[programa].desc}
            </p>
          </div>

          {/* Seletor de TEMPORADA */}
          <div className="mt-7">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em]" style={{ color: "rgba(242,237,227,0.4)" }}>
              Temporada
            </p>
            <div className="flex flex-wrap gap-3">
              {(Object.keys(TEMPORADAS) as SeasonKey[]).map((s) => {
                const ativo = temporada === s;
                return (
                  <button
                    key={s}
                    onClick={() => setTemporada(s)}
                    className="rounded-full px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition-all duration-300"
                    style={{
                      background: ativo ? L.gold : "transparent",
                      color: ativo ? L.night : "rgba(242,237,227,0.7)",
                      border: `1px solid ${ativo ? L.gold : "rgba(242,237,227,0.2)"}`,
                    }}
                  >
                    {s === "baja" && "Temporada Baixa"}
                    {s === "alta" && "Temporada Alta"}
                    {s === "especial" && "Temporada Especial"}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tabela */}
          <div className="mt-10 overflow-x-auto rounded-2xl" style={{ background: "rgba(242,237,227,0.03)", border: `1px solid ${L.line}` }}>
            <table className="w-full text-left text-[15px]" style={{ color: L.cream }}>
              <thead>
                <tr style={{ background: `${L.gold}12` }}>
                  <th className="px-6 py-5 text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: L.gold }}>
                    Estadia
                  </th>
                  <th className="px-6 py-5 text-center text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: L.gold }}>
                    Duplo USD
                  </th>
                  <th className="px-6 py-5 text-center text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: L.gold }}>
                    Single USD
                  </th>
                  {mostraNinos && (
                    <th className="px-6 py-5 text-center text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: L.gold }}>
                      Crianças USD
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {linhas.map((r) => (
                  <tr key={r.noites} style={{ borderTop: `1px solid ${L.line}` }}>
                    <td className="px-6 py-5 font-display text-base">{r.noites}</td>
                    <td className="px-6 py-5 text-center">US$ {r.doble.toLocaleString("pt-BR")}</td>
                    <td className="px-6 py-5 text-center">US$ {r.single.toLocaleString("pt-BR")}</td>
                    {mostraNinos && (
                      <td className="px-6 py-5 text-center">US$ {(r.ninos ?? 0).toLocaleString("pt-BR")}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-5 text-[12px]" style={{ color: "rgba(242,237,227,0.5)" }}>
            {TEMPORADAS[temporada]} · valores por pessoa.
          </p>

          {/* Extras + notas */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl p-7" style={{ background: "rgba(242,237,227,0.04)", border: `1px solid ${L.line}` }}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: L.gold }}>Adicionais</p>
              <ul className="mt-4 space-y-3 text-[14px] font-light" style={{ color: "rgba(242,237,227,0.75)" }}>
                <li className="flex items-baseline justify-between gap-4 border-b pb-3" style={{ borderColor: L.line }}>
                  <span>Upgrade para Junior Suite</span>
                  <span className="whitespace-nowrap font-display" style={{ color: L.cream }}>US$ 371 / noite</span>
                </li>
                <li className="flex items-baseline justify-between gap-4">
                  <span>Cama adicional (por pessoa)</span>
                  <span className="whitespace-nowrap font-display" style={{ color: L.cream }}>US$ 869 / noite</span>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl p-7" style={{ background: "rgba(242,237,227,0.04)", border: `1px solid ${L.line}` }}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: L.gold }}>Bom saber</p>
              <ul className="mt-4 space-y-2.5 text-[13px] font-light leading-relaxed" style={{ color: "rgba(242,237,227,0.65)" }}>
                <li>Tarifas em dólar válidas para estrangeiros, mediante passaporte e cartão migratório (PDI) no check-in. Sem o documento, incide IVA adicional de 19%.</li>
                <li>Crianças pagam a partir dos 5 anos.</li>
                <li>Na modalidade 100% Privada, a navegação no Lago Grey já está inclusa.</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 text-center">
            <a
              href="#contato"
              className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]"
              style={{ background: L.gold, color: L.night }}
            >
              Reservar com um especialista AONIK <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ===== AONIKIA ===== */}
      <section className="px-6 py-20 md:px-10 md:py-24" style={{ background: L.night }}>
        <div className="mx-auto max-w-[860px] text-center">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: L.gold }}>
              AonikIA · especialista nesta estância
            </p>
            <h2 className="mt-5 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-light leading-[1.15]" style={{ color: L.cream }}>
              Monte sua estadia no Las Torres
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] font-light leading-relaxed" style={{ color: "rgba(242,237,227,0.65)" }}>
              Quantas noites, qual programa, quais trilhas, melhor época. A AonikIA conhece a estância e te conecta com um especialista.
            </p>
            <a
              href="#contato"
              className="mt-7 inline-flex items-center gap-3 rounded-full border px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition-all duration-300"
              style={{ borderColor: L.gold, color: L.gold }}
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
