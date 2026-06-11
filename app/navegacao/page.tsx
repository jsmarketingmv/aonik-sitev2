"use client";

import { motion } from "framer-motion";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Contato from "../components/Contato";
import FloatingActions from "../components/FloatingActions";
import { Reveal, Kicker, EASE } from "../components/ui";

// Personalidade do segmento: oceano/fiorde — azul-petróleo
const SEA = "#2e8aa0";

const HERO_IMG =
  "https://images.unsplash.com/photo-1500514966906-fe245eea9344?q=80&w=2600&auto=format&fit=crop";

const PILARES = [
  {
    titulo: "Navios pequenos",
    desc: "Menos de 100 hóspedes. Onde os grandes transatlânticos não chegam, a expedição começa.",
  },
  {
    titulo: "Geleiras e fiordes de perto",
    desc: "Canais, témpanos e paredes de gelo a poucos metros. A natureza vista da linha-d'água.",
  },
  {
    titulo: "Embarcações de expedição",
    desc: "Zodiacs e botes que desembarcam onde o navio não vai: frente de geleira, praias, morenas.",
  },
  {
    titulo: "Fauna e natureza bruta",
    desc: "Elefantes-marinhos, pinguins, baleias e o silêncio dos canais. Patagônia e Antártica reais.",
  },
];

const PRODUTOS = [
  {
    nome: "Cruzeiros Skorpios",
    rota: "Kawéskar · Chonos · Patagônia Chilena",
    desc: "Dois navios, duas rotas. Ruta Kawéskar (5 dias, Puerto Natales, fiordes do sul) e Ruta Chonos (6 dias, Puerto Montt, arquipélagos e Glaciar San Rafael).",
    preco: "a partir de US$ 1.890",
    href: "/destinos/cruzeiro-skorpios",
    tag: "Patagônia",
    img: "/skorpios/DSC_0020.JPG",
  },
  {
    nome: "Antarctica21",
    rota: "Air-Cruise · Antártica",
    desc: "Voe sobre o Drake e navegue a Antártica em navios boutique. Círculo Polar, fauna polar e expedições íntimas saindo de Punta Arenas.",
    preco: "sob consulta",
    href: "#contato",
    tag: "Antártica",
    img: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=1600&auto=format&fit=crop",
  },
];

export default function NavegacaoPage() {
  return (
    <main className="relative bg-cream">
      <Nav />

      {/* HERO */}
      <section className="grain relative flex h-[86svh] min-h-[580px] w-full items-end overflow-hidden">
        <div
          className="absolute inset-0 scale-105 bg-cover bg-center"
          style={{ backgroundImage: `url('${HERO_IMG}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08222b] via-[#08222b]/55 to-[#08222b]/25" />
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-14 md:px-10 md:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          >
            <p
              className="flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.32em]"
              style={{ color: SEA }}
            >
              <span className="h-px w-8" style={{ background: SEA }} />
              Segmento · Cruzeiros de Expedição
            </p>
            <h1 className="mt-4 font-display text-[clamp(3rem,12vw,9.5rem)] font-light uppercase leading-[0.85] tracking-[-0.02em] text-cream">
              Navegação
            </h1>
            <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-cream/75 md:text-lg">
              Expedições por fiordes, geleiras e canais, da Patagônia à
              Antártica. A natureza vista de onde só o mar leva.
            </p>
            <a
              href="#contato"
              className="mt-8 inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] text-[#08222b] transition-transform duration-300 hover:scale-[1.03]"
              style={{ background: SEA }}
            >
              Falar com especialista <span>→</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="bg-cream px-6 py-24 text-ink md:px-10 md:py-32">
        <div className="mx-auto max-w-[840px] text-center">
          <Reveal>
            <Kicker color="text-[#2e8aa0]" line="bg-[#2e8aa0]/50">
              Por que navegar com a AONIK
            </Kicker>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 font-display text-[clamp(1.5rem,3vw,2.4rem)] font-light leading-[1.25] tracking-[-0.01em] text-forest">
              Cruzeiro de expedição não é um hotel flutuante. É chegar onde
              estrada nenhuma alcança:{" "}
              <span className="italic" style={{ color: SEA }}>
                a frente de uma geleira, ao amanhecer
              </span>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* O QUE TORNA EXPEDIÇÃO */}
      <section className="bg-cream-deep px-6 py-24 text-ink md:px-10 md:py-28">
        <div className="mx-auto max-w-[1180px]">
          <Reveal>
            <Kicker color="text-[#2e8aa0]" line="bg-[#2e8aa0]/50">
              O que torna expedição
            </Kicker>
          </Reveal>
          <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {PILARES.map((p, i) => (
              <Reveal key={p.titulo} delay={i * 0.06}>
                <div className="border-t border-forest/15 pt-6">
                  <span className="font-display text-sm" style={{ color: SEA }}>
                    0{i + 1}
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-light text-forest md:text-3xl">
                    {p.titulo}
                  </h3>
                  <p className="mt-3 max-w-sm text-[15px] font-light leading-relaxed text-ink/60">
                    {p.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* NOSSOS CRUZEIROS — 2 produtos */}
      <section className="bg-cream px-6 py-24 text-ink md:px-10 md:py-32">
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1] tracking-[-0.01em] text-forest">
                Nossos <span className="italic" style={{ color: SEA }}>cruzeiros</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-sm text-[14px] font-light leading-relaxed text-ink/55">
                Skorpios e Antarctica21: cada operadora com sua própria
                página, identidade e rota.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {PRODUTOS.map((p, i) => (
              <Reveal key={p.nome} delay={i * 0.08}>
                <a
                  href={p.href}
                  className="group block overflow-hidden rounded-xl bg-forest"
                >
                  <div className="relative h-72 overflow-hidden md:h-80">
                    <div
                      className="absolute inset-0 scale-105 bg-cover bg-center transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100"
                      style={{ backgroundImage: `url('${p.img}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08222b]/80 to-transparent" />
                    <span
                      className="absolute left-5 top-5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#08222b]"
                      style={{ background: SEA }}
                    >
                      {p.tag}
                    </span>
                  </div>
                  <div className="p-7 md:p-8">
                    <p
                      className="text-[11px] font-semibold uppercase tracking-[0.2em]"
                      style={{ color: SEA }}
                    >
                      {p.rota}
                    </p>
                    <h3 className="mt-2 font-display text-3xl font-light text-cream">
                      {p.nome}
                    </h3>
                    <p className="mt-3 text-[14px] font-light leading-relaxed text-cream/65">
                      {p.desc}
                    </p>
                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-[13px] font-light text-cream/80">
                        {p.preco}
                      </span>
                      <span
                        className="text-[12px] font-semibold uppercase tracking-[0.14em] transition-transform duration-300 group-hover:translate-x-1"
                        style={{ color: SEA }}
                      >
                        Explorar →
                      </span>
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Contato />
      <Footer />
      <FloatingActions />
    </main>
  );
}
