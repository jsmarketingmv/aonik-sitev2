"use client";

import { motion } from "framer-motion";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Contato from "../components/Contato";
import FloatingActions from "../components/FloatingActions";
import { Reveal, Kicker, EASE } from "../components/ui";

const HERO_IMG =
  "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2400&auto=format&fit=crop";

const PILARES = [
  {
    titulo: "Peregrinação",
    desc: "Caminhos antigos como os de Santiago. O trajeto vira propósito e quem chega ao fim não é quem partiu.",
  },
  {
    titulo: "Caminhada de imersão",
    desc: "Longe do roteiro de massa. Você caminha dentro da cultura, da comida e da gente do lugar.",
  },
  {
    titulo: "Viagens em grupo",
    desc: "Saídas guiadas pelo mundo, com líder AONIK. A montanha aproxima quem a percorre junto.",
  },
  {
    titulo: "Autoguiado ou guiado",
    desc: "No seu ritmo, com tudo organizado ou acompanhado por um especialista do início ao fim.",
  },
];

const DESTINOS = [
  {
    nome: "Tour du Mont Blanc",
    local: "Alpes · França · Itália · Suíça",
    preco: "a partir de € 2.490",
    href: "/destinos/tour-du-mont-blanc",
    img: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=1600&auto=format&fit=crop",
  },
  {
    nome: "Torres del Paine",
    local: "Patagônia Chilena",
    preco: "a partir de R$ 9.900",
    href: "#contato",
    img: "https://images.unsplash.com/photo-1531794343237-93e7e6e25b3f?q=80&w=1600&auto=format&fit=crop",
  },
  {
    nome: "Dolomitas Alta Via",
    local: "Alpes Italianos",
    preco: "a partir de € 2.190",
    href: "#contato",
    img: "https://images.unsplash.com/photo-1609860039673-4f4b0c1e9b3a?q=80&w=1600&auto=format&fit=crop",
  },
  {
    nome: "Caminho de Santiago",
    local: "Portugal · Espanha",
    preco: "a partir de € 1.290",
    href: "#contato",
    img: "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?q=80&w=1600&auto=format&fit=crop",
  },
];

export default function CaminhadasPage() {
  return (
    <main className="relative bg-cream">
      <Nav />

      {/* HERO */}
      <section className="grain relative flex h-[80svh] min-h-[560px] w-full items-end overflow-hidden">
        <div
          className="absolute inset-0 scale-105 bg-cover bg-center"
          style={{ backgroundImage: `url('${HERO_IMG}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/40 to-forest/30" />
        <div className="relative z-10 mx-auto w-full max-w-[1180px] px-6 pb-16 md:px-10 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          >
            <Kicker color="text-gold-soft" line="bg-gold-soft/50">
              Segmento · A pé
            </Kicker>
            <h1 className="mt-3 font-display text-[clamp(3rem,12vw,9.5rem)] font-light uppercase leading-[0.85] tracking-[-0.02em] text-cream">
              Caminhadas
            </h1>
            <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-cream/75 md:text-lg">
              Peregrinações, travessias e imersões a pé pelo mundo. O ritmo lento
              que revela o que a pressa esconde.
            </p>
            <a
              href="#contato"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] text-ink transition-transform duration-300 hover:scale-[1.03]"
            >
              Falar com especialista
              <span>→</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="bg-cream px-6 py-24 text-ink md:px-10 md:py-32">
        <div className="mx-auto max-w-[820px] text-center">
          <Reveal>
            <Kicker>Por que caminhar com a AONIK</Kicker>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 font-display text-[clamp(1.5rem,3vw,2.4rem)] font-light leading-[1.25] tracking-[-0.01em] text-forest">
              Caminhar é a forma mais antiga e mais honesta de conhecer um
              lugar. A gente cuida de cada detalhe para que sobre a você apenas o
              essencial:{" "}
              <span className="italic text-gold">colocar um pé à frente do outro</span>.
            </p>
          </Reveal>
        </div>
      </section>

      {/* O QUE VOCÊ ENCONTRA */}
      <section className="bg-cream-deep px-6 py-24 text-ink md:px-10 md:py-28">
        <div className="mx-auto max-w-[1180px]">
          <Reveal>
            <Kicker>O que você encontra</Kicker>
          </Reveal>
          <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {PILARES.map((p, i) => (
              <Reveal key={p.titulo} delay={i * 0.06}>
                <div className="border-t border-forest/15 pt-6">
                  <span className="font-display text-sm text-gold">
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

      {/* DESTINOS DE CAMINHADA */}
      <section className="bg-cream px-6 py-24 text-ink md:px-10 md:py-32">
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1] tracking-[-0.01em] text-forest">
                Destinos de <span className="italic text-gold">caminhada</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-sm text-[14px] font-light leading-relaxed text-ink/55">
                Uma seleção curada. Cada destino tem sua própria página, com tudo
                o que importa para você decidir.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {DESTINOS.map((d, i) => (
              <Reveal key={d.nome} delay={i * 0.06}>
                <a
                  href={d.href}
                  className="group block overflow-hidden rounded-xl"
                >
                  <div className="relative h-64 overflow-hidden">
                    <div
                      className="absolute inset-0 scale-105 bg-cover bg-center transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100"
                      style={{ backgroundImage: `url('${d.img}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-gold-soft">
                        {d.local}
                      </p>
                      <h3 className="mt-1 font-display text-2xl font-light text-cream">
                        {d.nome}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-forest px-5 py-4">
                    <span className="text-[12px] font-light text-cream/70">
                      {d.preco}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold transition-transform duration-300 group-hover:translate-x-1">
                      Ver →
                    </span>
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
