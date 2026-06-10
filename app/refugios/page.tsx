"use client";

import { motion } from "framer-motion";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Contato from "../components/Contato";
import FloatingActions from "../components/FloatingActions";
import WorldMap, { MapPin } from "../components/WorldMap";
import { Reveal, Kicker, EASE } from "../components/ui";

const L = {
  charcoal: "#17150f",
  stone: "#26221b",
  champagne: "#c9a86a",
  cream: "#f5f1e8",
  ink: "#0b0a07",
};

// Pins do mapa — apenas as hospedagens de refúgio (sem expedições como TMB)
const MAP_PINS: MapPin[] = [
  {
    label: "Rio Serrano",
    sub: "Torres del Paine · Patagônia",
    lng: -74,
    lat: -52,
    anchor: "start",
  },
  {
    label: "Las Torres",
    sub: "Torres del Paine · Patagônia",
    lng: -70,
    lat: -49.5,
    anchor: "start",
  },
  {
    label: "Jaci's Lodges",
    sub: "Madikwe · África do Sul",
    lng: 26.3,
    lat: -24.8,
    anchor: "start",
  },
];

// Hero: quarto Superior do Rio Serrano com vista para as Torres
const HERO_IMG =
  "https://rioserrano.com/wp-content/uploads/2023/10/Superio-1-1-1024x684.jpg";

const CONCEITO = [
  { t: "Só na natureza", d: "Nada de cidade. Cada refúgio existe dentro da paisagem: floresta, montanha, deserto, fiorde." },
  { t: "Máximo conforto", d: "O selvagem lá fora, o aconchego aqui dentro. Lareira, cama impecável, banho quente com vista." },
  { t: "Alta gastronomia", d: "Cozinha de origem, ingredientes locais, chefs autorais. Comer vira parte da paisagem." },
  { t: "Serviços VIP", d: "Transfers privados, concierge, guias particulares. Você só se entrega à experiência." },
  { t: "Exclusividade", d: "Poucas suítes, muito espaço. Privacidade e silêncio como o maior dos luxos." },
  { t: "Experiências", d: "Trilhas, navegações, safáris, spa. O refúgio é a base e a natureza é o programa." },
];

// O que você vive num refúgio — cards cinematográficos com foto real
const EXPERIENCIAS_TIPOS = [
  {
    n: "01",
    cat: "Na natureza",
    titulo: "Expedições do lugar",
    desc: "Trekking nas Torres, safári com os Big Five, navegação em geleiras. O refúgio é a sua base.",
    // Landscape/montage Rio Serrano + Torres del Paine
    img: "https://rioserrano.com/wp-content/uploads/2025/05/230629_Montaje-Estanques-Serrano-1-1024x461-1.jpg",
  },
  {
    n: "02",
    cat: "À mesa",
    titulo: "Alta gastronomia",
    desc: "Chefs autorais, ingredientes da região. Cada prato é uma leitura do território.",
    // Gastronomy photo Rio Serrano
    img: "https://rioserrano.com/wp-content/uploads/2023/12/F7S02517.png",
  },
  {
    n: "03",
    cat: "Para o corpo",
    titulo: "Spa & bem-estar",
    desc: "Tratamentos com vista para a montanha. A recuperação do corpo é parte do roteiro.",
    // Interior/spa Rio Serrano
    img: "https://rioserrano.com/wp-content/uploads/2023/12/1P0A4105.png",
  },
  {
    n: "04",
    cat: "Sem esforço",
    titulo: "Logística VIP",
    desc: "Transfers privados, concierge, guias exclusivos. Você só decide de que forma viver.",
    // Luxury safari — Jaci's atmosphere
    img: "https://www.jacis.co.za/images/home-hero.jpg",
  },
];

const LODGES = [
  {
    nome: "Rio Serrano",
    local: "Patagônia Chilena · Torres del Paine",
    desc: "O lodge moderno dentro do parque. 108 quartos com vista para o maciço, dois restaurantes autorais, spa e as experiências The Massif logo na porta.",
    tag: "Lodge",
    href: "/destinos/rio-serrano",
    img: "https://rioserrano.com/wp-content/uploads/2026/03/Arcoiris-en-Hotel-Rio-Serrano-3-de-1-scaled.jpg",
  },
  {
    nome: "Las Torres",
    local: "Patagônia Chilena · base das Torres",
    desc: "Uma estância patagônica autêntica virada all-inclusive: cordeiro assado, pisco sour, tosquia de ovelhas e mais de 20 excursões guiadas no parque.",
    tag: "Estância",
    href: "#contato",
    img: "https://lastorres.com/content/uploads/01-7.jpg",
  },
  {
    nome: "Jaci's Lodges",
    local: "Madikwe · África do Sul",
    desc: "Safári de luxo livre de malária: os Big Five, suítes de vidro abertas para o bush, jantares à fogueira e o Finfoot Spa. Outra natureza, o mesmo requinte.",
    tag: "Safári",
    href: "#contato",
    img: "https://www.jacis.co.za/images/home-hero.jpg",
  },
];

export default function RefugiosPage() {
  return (
    <main className="relative" style={{ background: L.cream }}>
      <Nav />

      {/* HERO — quarto Superior Rio Serrano + Torres na janela */}
      <section className="grain relative flex h-[92svh] min-h-[600px] w-full items-end overflow-hidden">
        <div
          className="absolute inset-0 scale-105 bg-cover bg-center"
          style={{ backgroundImage: `url('${HERO_IMG}')` }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${L.charcoal} 5%, ${L.charcoal}bb 35%, ${L.charcoal}33 75%, transparent 100%)`,
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-16 md:px-10 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
          >
            <p className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.34em]" style={{ color: L.champagne }}>
              <span className="h-px w-8" style={{ background: L.champagne }} />
              Segmento · Luxo na natureza
            </p>
            <h1 className="mt-4 font-display text-[clamp(3rem,12vw,9.5rem)] font-light uppercase leading-[0.85] tracking-[-0.02em]" style={{ color: L.cream }}>
              Refúgios
            </h1>
            <p className="mt-6 max-w-xl text-base font-light leading-relaxed md:text-lg" style={{ color: "rgba(245,241,232,0.75)" }}>
              Hospedagens de luxo onde só existe natureza. Conforto máximo, alta
              gastronomia e experiências exclusivas, da Patagônia ao bush africano.
            </p>
            <a
              href="#lodges"
              className="mt-8 inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 hover:scale-[1.03]"
              style={{ background: L.champagne, color: L.charcoal }}
            >
              Conhecer os refúgios <span>→</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* O CONCEITO */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: L.cream, color: L.ink }}>
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-14 max-w-2xl">
            <Reveal>
              <Kicker color="text-[#c9a86a]" line="bg-[#c9a86a]/50">O conceito</Kicker>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1] tracking-[-0.01em]" style={{ color: "#26221b" }}>
                O selvagem lá fora,{" "}
                <span className="italic" style={{ color: L.champagne }}>o requinte aqui dentro</span>
              </h2>
            </Reveal>
          </div>
          <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {CONCEITO.map((c, i) => (
              <Reveal key={c.t} delay={i * 0.05}>
                <div className="border-t pt-6" style={{ borderColor: "rgba(23,21,15,0.15)" }}>
                  <span className="font-display text-sm" style={{ color: L.champagne }}>0{i + 1}</span>
                  <h3 className="mt-2 font-display text-2xl font-light" style={{ color: "#26221b" }}>{c.t}</h3>
                  <p className="mt-3 text-[15px] font-light leading-relaxed" style={{ color: "rgba(23,21,15,0.6)" }}>{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BLOCO EXPERIÊNCIAS — 4 cards cinematográficos com foto */}
      <section style={{ background: L.charcoal }}>
        {/* Header da seção */}
        <div className="mx-auto max-w-[1280px] px-6 pb-12 pt-24 md:px-10 md:pt-32">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <Kicker color="text-[#c9a86a]" line="bg-[#c9a86a]/40">Experiências inclusas</Kicker>
              <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.6rem)] font-light leading-[1.02] tracking-[-0.015em]" style={{ color: L.cream }}>
                O que você vive{" "}
                <span className="italic" style={{ color: L.champagne }}>num refúgio</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-xs text-[14px] font-light leading-relaxed" style={{ color: "rgba(245,241,232,0.45)" }}>
                Cada refúgio AONIK combina acomodação de luxo com expedições exclusivas na natureza selvagem.
              </p>
            </Reveal>
          </div>
        </div>

        {/* 4 cards de imagem — full bleed, sem padding lateral */}
        <div className="grid grid-cols-2 md:grid-cols-4">
          {EXPERIENCIAS_TIPOS.map((e, i) => (
            <motion.div
              key={e.n}
              className="group relative overflow-hidden"
              style={{ height: "clamp(280px, 40vw, 540px)" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
            >
              {/* Imagem de fundo */}
              <div
                className="absolute inset-0 scale-[1.06] bg-cover bg-center transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100"
                style={{ backgroundImage: `url('${e.img}')` }}
              />

              {/* Overlay — escurece base p/ legibilidade do texto */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(
                    to top,
                    ${L.charcoal} 0%,
                    rgba(23,21,15,0.7) 40%,
                    rgba(23,21,15,0.2) 70%,
                    transparent 100%
                  )`,
                }}
              />

              {/* Número — topo esquerdo, fantasma */}
              <span
                className="absolute left-5 top-5 font-display text-[2.2rem] font-light leading-none tracking-[-0.04em] md:text-[2.8rem]"
                style={{ color: "rgba(201,168,106,0.35)" }}
              >
                {e.n}
              </span>

              {/* Conteúdo — base do card */}
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                <span
                  className="text-[9px] font-semibold uppercase tracking-[0.22em]"
                  style={{ color: L.champagne }}
                >
                  {e.cat}
                </span>
                <h3
                  className="mt-2 font-display text-[clamp(1.2rem,2vw,1.7rem)] font-light leading-[1.1]"
                  style={{ color: L.cream }}
                >
                  {e.titulo}
                </h3>
                <p
                  className="mt-2 text-[12px] font-light leading-relaxed opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:mt-3"
                  style={{ color: "rgba(245,241,232,0.7)" }}
                >
                  {e.desc}
                </p>
              </div>

              {/* Divisor vertical entre cards */}
              <div
                className="pointer-events-none absolute inset-y-0 right-0 w-px"
                style={{ background: "rgba(201,168,106,0.1)" }}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* OS LODGES */}
      <section
        id="lodges"
        className="scroll-mt-24 px-6 py-24 md:px-10 md:py-32"
        style={{ background: L.stone, color: L.cream }}
      >
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <Kicker color="text-[#c9a86a]" line="bg-[#c9a86a]/40">Onde ficamos</Kicker>
              <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,3.2rem)] font-light leading-[1.05] tracking-[-0.01em]">
                Três mundos,{" "}
                <span className="italic" style={{ color: L.champagne }}>o mesmo luxo</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-sm text-[14px] font-light leading-relaxed" style={{ color: "rgba(245,241,232,0.5)" }}>
                Do lodge de design ao acampamento de safári. Naturezas opostas, a mesma busca por conforto e beleza.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            {LODGES.map((e, i) => (
              <Reveal key={e.nome} delay={i * 0.08}>
                <a href={e.href} className="group block overflow-hidden rounded-xl" style={{ background: L.charcoal }}>
                  <div className="relative h-72 overflow-hidden">
                    <div
                      className="absolute inset-0 scale-105 bg-cover bg-center transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100"
                      style={{ backgroundImage: `url('${e.img}')` }}
                    />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${L.charcoal}, transparent 60%)` }} />
                    <span
                      className="absolute left-5 top-5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]"
                      style={{ background: L.champagne, color: L.charcoal }}
                    >
                      {e.tag}
                    </span>
                  </div>
                  <div className="p-7">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: L.champagne }}>{e.local}</p>
                    <h3 className="mt-2 font-display text-3xl font-light">{e.nome}</h3>
                    <p className="mt-3 text-[14px] font-light leading-relaxed" style={{ color: "rgba(245,241,232,0.65)" }}>{e.desc}</p>
                    <span
                      className="mt-5 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] transition-transform duration-300 group-hover:translate-x-1"
                      style={{ color: L.champagne }}
                    >
                      {e.href.startsWith("/") ? "Ver experiência" : "Saber mais"} →
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MAPA MUNDI — onde estão os refúgios */}
      <section className="relative overflow-hidden px-6 py-24 md:px-10 md:py-32" style={{ background: L.charcoal }}>
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40"
          style={{ background: `linear-gradient(to right, ${L.charcoal}, transparent)` }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40"
          style={{ background: `linear-gradient(to left, ${L.charcoal}, transparent)` }}
        />

        <div className="relative z-10 mx-auto max-w-[1400px]">
          <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <Kicker color="text-[#c9a86a]" line="bg-[#c9a86a]/40">Presença global</Kicker>
              <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,3.2rem)] font-light leading-[1.05] tracking-[-0.01em]" style={{ color: L.cream }}>
                Onde vivemos{" "}
                <span className="italic" style={{ color: L.champagne }}>a natureza</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="max-w-xs text-[13px] font-light leading-relaxed" style={{ color: "rgba(245,241,232,0.45)" }}>
                Da Patagônia Chilena ao bush africano, dois destinos com a mesma filosofia de luxo imerso na natureza selvagem.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.18}>
            <WorldMap pins={MAP_PINS} />
          </Reveal>

          {/* Legenda */}
          <Reveal delay={0.28}>
            <div className="mt-8 flex flex-wrap gap-8 border-t pt-8" style={{ borderColor: "rgba(201,168,106,0.15)" }}>
              {[
                { label: "Rio Serrano", sub: "Lodge · Torres del Paine", href: "/destinos/rio-serrano" },
                { label: "Las Torres", sub: "Estância · Torres del Paine", href: "#contato" },
                { label: "Jaci's Lodges", sub: "Safári · Madikwe · África do Sul", href: "#contato" },
              ].map((item) => (
                <a key={item.label} href={item.href} className="group flex items-start gap-3 transition-opacity duration-300 hover:opacity-80">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full" style={{ background: L.champagne }} />
                  <div>
                    <p className="text-[13px] font-medium" style={{ color: L.champagne }}>{item.label}</p>
                    <p className="text-[11px] font-light uppercase tracking-[0.1em]" style={{ color: "rgba(245,241,232,0.4)" }}>{item.sub}</p>
                  </div>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Contato />
      <Footer />
      <FloatingActions />
    </main>
  );
}
