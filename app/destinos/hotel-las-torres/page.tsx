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
   HOTEL LAS TORRES — Estância Patagônica · Torres del Paine
   Personalidade: A ESTÂNCIA. Rancho familiar desde 1970, no
   início da trilha das Torres. Baqueanos, cavalos, herança.
   Paleta: ouro de estância + granito + campo dourado.
   ============================================================ */
const L = {
  night: "#14161a",
  stone: "#22252b",
  gold: "#cda45e",      // ouro da estância (marca Las Torres)
  goldSoft: "#ddb877",
  cream: "#f2ede3",
  cold: "#6b7884",      // granito frio
  coldBg: "#1b2026",
  line: "rgba(242,237,227,0.16)",
};

const HERO_IMG = "/lastorres/hero.jpg";

const STATS = [
  { v: "74", l: "quartos" },
  { v: "1970", l: "estância familiar" },
  { v: "W & O", l: "início dos circuitos" },
  { v: "100%", l: "dentro da reserva" },
];

/* ===== TIPOS DE QUARTO ===== */
const QUARTOS = [
  {
    nome: "Junior Suite Superior",
    capacidade: "Casal",
    desc: "Cama king-size e vista direta para o maciço Paine. O quarto mais espaçoso da estância, para quem quer acordar diante das torres de granito.",
    amenidades: ["King-size", "Vista Paine", "Mais amplo", "Calefação"],
    img: "/lastorres/hotel-verde.jpg",
  },
  {
    nome: "Superior Room",
    capacidade: "Até 4 hóspedes",
    desc: "Múltiplas configurações de cama, ideal para famílias e grupos. Vista para as montanhas ou para o jardim da estância.",
    amenidades: ["Até 4 pessoas", "Vista montanha", "Vista jardim", "Calefação"],
    img: "/lastorres/exterior.jpg",
  },
];

/* ===== ATIVIDADES (Day Tours + All Inclusive) ===== */
const ATIVIDADES = [
  {
    num: "01",
    t: "Trekking às Torres",
    d: "A trilha mais famosa da Patagônia começa na porta do hotel: Base Torres, Circuito W e o lendário Circuito O.",
    img: "/lastorres/torres.jpg",
  },
  {
    num: "02",
    t: "Cavalgadas patagônicas",
    d: "Monte com os baqueanos da estância e cruze a estepe no ritmo dos cavalos, como se faz aqui desde 1970.",
    img: "/lastorres/cavalgada-1.jpg",
  },
  {
    num: "03",
    t: "Vida de baqueano",
    d: "A lida com os cavalos, o laço, a boina e o fogón. A cultura viva da estância patagônica, de perto.",
    img: "/lastorres/estância-1.jpg",
  },
  {
    num: "04",
    t: "Fauna & paisagem",
    d: "Encontro com pumas, guanacos e condores. Multiaventura e navegação pelos lagos turquesa do parque.",
    img: "/lastorres/paisagem.jpg",
  },
];

/* ===== GALERIA ===== */
const GALERIA = [
  { src: "/lastorres/hero.jpg", cap: "A estância sob o maciço Paine", tag: "A Estância" },
  { src: "/lastorres/sunset.jpg", cap: "As torres de granito ao pôr do sol", tag: "Paisagem" },
  { src: "/lastorres/estância-1.jpg", cap: "O baqueano e a lida com os cavalos", tag: "Herança" },
  { src: "/lastorres/torres.jpg", cap: "A recompensa: a base das Torres", tag: "Trekking" },
  { src: "/lastorres/cavalgada-1.jpg", cap: "Cavalgada rumo ao maciço", tag: "Cavalgadas" },
  { src: "/lastorres/paisagem.jpg", cap: "O outono incendiando a estepe", tag: "Paisagem" },
  { src: "/lastorres/estância-2.jpg", cap: "A conexão ancestral com o cavalo", tag: "Herança" },
  { src: "/lastorres/hotel-verde.jpg", cap: "O hotel entre o bosque e a montanha", tag: "A Estância" },
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

export default function HotelLasTorresPage() {
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
              A estância familiar no início da trilha mais famosa da Patagônia. Cavalos, baqueanos e as torres de granito a um passo da porta.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <span style={{ color: "rgba(242,237,227,0.85)" }}>
                <span className="text-[12px] uppercase tracking-[0.16em]" style={{ color: "rgba(242,237,227,0.5)" }}>
                  desde
                </span>{" "}
                <span className="font-display text-2xl">1970</span>
              </span>
              <a
                href="#contato"
                className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]"
                style={{ background: L.gold, color: L.night }}
              >
                Quero me hospedar <span>→</span>
              </a>
            </div>
            <div className="mt-7">
              <Breadcrumb tone="dark" accent={L.gold} items={[
                { label: "Home", href: "/" },
                { label: "Hotéis", href: "/refugios" },
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

      {/* ===== A ESTÂNCIA (story + gaúcho) ===== */}
      <section className="grid md:grid-cols-2">
        <div className="relative min-h-[460px] overflow-hidden md:min-h-[680px]">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/lastorres/estância-1.jpg')" }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${L.night}aa, ${L.night}22 60%, ${L.night}44)` }} />
        </div>
        <div className="flex flex-col justify-center px-6 py-20 md:px-14 md:py-0" style={{ background: L.stone }}>
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: L.gold }}>
              Uma estância de verdade
            </p>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,3.5vw,3rem)] font-light leading-[1.12]" style={{ color: L.cream }}>
              Herança patagônica desde 1970
            </h2>
            <p className="mt-6 max-w-md text-[15px] font-light leading-relaxed" style={{ color: "rgba(242,237,227,0.72)" }}>
              O Hotel Las Torres nasceu de uma autêntica estância familiar, no centro de uma Reserva Ecológica privada. Aqui ainda há cavalos, baqueanos e o ritmo da lida do campo. A madeira do hotel conta a história de uma família que faz da Patagônia o seu lar há mais de 50 anos.
            </p>
            <p className="mt-4 max-w-md text-[15px] font-light leading-relaxed" style={{ color: "rgba(242,237,227,0.72)" }}>
              E na porta, o começo da trilha mais famosa do mundo: a subida à <span style={{ color: L.gold }}>Base das Torres</span>.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== QUARTOS ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: L.cream, color: L.stone }}>
        <div className="mx-auto max-w-[1100px]">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: L.gold }}>
              <span className="h-px w-8" style={{ background: L.gold }} />
              Habitações
            </p>
            <h2 className="mt-5 font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1]">
              74 quartos com a montanha na janela
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {QUARTOS.map((q, i) => (
              <Reveal key={q.nome} delay={i * 0.08}>
                <div className="group overflow-hidden rounded-2xl" style={{ background: "#fff", boxShadow: "0 1px 30px rgba(34,37,43,0.07)" }}>
                  <div className="relative h-[300px] overflow-hidden">
                    <img src={q.img} alt={q.nome} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${L.night}66, transparent 55%)` }} />
                  </div>
                  <div className="p-8">
                    <h3 className="font-display text-2xl font-light">{q.nome}</h3>
                    <p className="mt-1 text-[12px] uppercase tracking-[0.16em]" style={{ color: L.gold }}>{q.capacidade}</p>
                    <p className="mt-4 text-[15px] font-light leading-relaxed" style={{ color: "rgba(34,37,43,0.7)" }}>{q.desc}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {q.amenidades.map((a) => (
                        <span key={a} className="rounded-full px-3 py-1 text-[11px]" style={{ background: `${L.gold}22`, color: "#8a6a30" }}>
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

      {/* ===== ALL INCLUSIVE ===== */}
      <section className="grid md:grid-cols-2">
        <div className="relative min-h-[400px] overflow-hidden md:min-h-[600px]">
          <img src="/lastorres/sunset.jpg" alt="Torres ao pôr do sol" className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div className="flex flex-col justify-center px-6 py-20 md:px-14 md:py-0" style={{ background: L.night }}>
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: L.gold }}>
              Programa All Inclusive
            </p>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,3.5vw,3rem)] font-light leading-[1.12]" style={{ color: L.cream }}>
              Dias ativos, noites aconchegantes
            </h2>
            <p className="mt-6 max-w-md text-[15px] font-light leading-relaxed" style={{ color: "rgba(242,237,227,0.7)" }}>
              Caminhadas pelas montanhas, geleiras e lagos durante o dia; jantar e uma boa taça no calor do hotel à noite. Todas as excursões são guiadas e exclusivas para hóspedes da estância.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {["Trekking guiado", "Excursões exclusivas", "Refeições inclusas", "Transfers", "Puma & fauna"].map((x) => (
                <span key={x} className="rounded-full px-4 py-1.5 text-[12px]" style={{ background: `${L.gold}1f`, color: L.goldSoft }}>{x}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== ATIVIDADES ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: L.cream, color: L.stone }}>
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: L.gold }}>
              <span className="h-px w-8" style={{ background: L.gold }} />
              As experiências
            </p>
            <h2 className="mt-5 max-w-2xl font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1]">
              15 day tours saindo da própria estância
            </h2>
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

      {/* ===== LEISURE & SPA ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: L.stone, color: L.cream }}>
        <div className="mx-auto max-w-[1100px] text-center">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: L.gold }}>
              Descanso & lazer
            </p>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,3.5vw,3rem)] font-light leading-[1.15]">
              8 formas de deixar o corpo e a mente descansarem
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[15px] font-light leading-relaxed" style={{ color: "rgba(242,237,227,0.7)" }}>
              Parte da experiência é simplesmente estar aqui. Spa, jardim regenerativo, bar e restaurante: o conforto da estância depois de um dia inteiro na trilha.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "Spa", d: "Tratamentos e relaxamento depois da trilha." },
              { t: "Jardim regenerativo", d: "Hortas e natureza viva da estância." },
              { t: "Bar", d: "Drinks patagônicos ao calor da lareira." },
              { t: "Restaurante", d: "Cozinha regional com produtos locais." },
            ].map((x, i) => (
              <Reveal key={x.t} delay={i * 0.06}>
                <div className="rounded-xl p-7 text-left" style={{ background: `${L.gold}12`, borderTop: `3px solid ${L.gold}` }}>
                  <h3 className="font-display text-xl font-light">{x.t}</h3>
                  <p className="mt-3 text-[14px] font-light leading-relaxed" style={{ color: "rgba(242,237,227,0.65)" }}>{x.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
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

      {/* ===== TARIFAS (placeholder — aguardando PDF) ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: L.stone }}>
        <div className="mx-auto max-w-[860px] text-center">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: L.gold }}>
              Valores por quarto
            </p>
            <h2 className="mt-5 font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1]" style={{ color: L.cream }}>
              Tarifas 2026/2027
            </h2>
            <p className="mx-auto mt-5 max-w-md text-[15px] font-light leading-relaxed" style={{ color: "rgba(242,237,227,0.65)" }}>
              Programas All Inclusive, Full Board e Bed & Breakfast por temporada. Consulte os valores e a melhor data com um especialista AONIK.
            </p>
            <a
              href="#contato"
              className="mt-7 inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]"
              style={{ background: L.gold, color: L.night }}
            >
              Consultar tarifas <span>→</span>
            </a>
          </Reveal>
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
              Quantas noites, qual quarto, quais trilhas, melhor época. A AonikIA conhece a estância e te conecta com um especialista.
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
