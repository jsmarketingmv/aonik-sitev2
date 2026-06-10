"use client";

import { motion } from "framer-motion";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Contato from "../components/Contato";
import FloatingActions from "../components/FloatingActions";
import { Reveal, Kicker, EASE } from "../components/ui";

const HERO_IMG =
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2400&auto=format&fit=crop";

const PAIXAO = [
  {
    titulo: "Jornadas de superação",
    desc: "Viagens que pedem um pouco mais de você e devolvem muito mais.",
  },
  {
    titulo: "Peregrinações",
    desc: "Caminhos antigos, propósito renovado. O trajeto como transformação.",
  },
  {
    titulo: "Imersões genuínas",
    desc: "Longe do turismo de massa. Perto das pessoas, da cultura e da natureza real.",
  },
  {
    titulo: "Coletividade",
    desc: "Grupos que viram amigos. A montanha aproxima quem a percorre junto.",
  },
];

const FAZEMOS = [
  "Roteiros autoguiados e guiados",
  "Grupos de trekking pelo mundo",
  "Cicloturismo e navegação",
  "Hotéis e refúgios de natureza",
  "Curadoria e suporte ponta a ponta",
  "Atendimento humano, de verdade",
];

export default function QuemSomosPage() {
  return (
    <main className="relative bg-cream">
      <Nav />

      {/* HERO */}
      <section className="grain relative flex h-[72svh] min-h-[480px] w-full items-end overflow-hidden">
        <div
          className="absolute inset-0 scale-105 bg-cover bg-center"
          style={{ backgroundImage: `url('${HERO_IMG}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/40 to-forest/20" />
        <div className="relative z-10 mx-auto w-full max-w-[1180px] px-6 pb-16 md:px-10 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          >
            <Kicker color="text-gold-soft" line="bg-gold-soft/50">
              Quem Somos
            </Kicker>
            <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.4rem,6vw,5rem)] font-light leading-[1] tracking-[-0.02em] text-cream">
              Gente que vive a natureza{" "}
              <span className="italic text-gold">antes de vendê-la</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* NOSSA HISTÓRIA */}
      <section className="bg-cream px-6 py-24 text-ink md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1180px] items-center gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <div className="relative h-[420px] overflow-hidden rounded-xl md:h-[520px]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1600&auto=format&fit=crop')",
                }}
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <Kicker>Nossa história</Kicker>
              <h2 className="mt-5 font-display text-[clamp(1.8rem,3.5vw,3rem)] font-light leading-[1.1] tracking-[-0.01em] text-forest">
                Nasceu de uma trilha, não de uma planilha
              </h2>
              <p className="mt-6 text-[15px] font-light leading-relaxed text-ink/65">
                A AONIK começou onde toda boa viagem começa: no pé da montanha,
                com vontade de ir além. De caminhantes apaixonados a operadora de
                turismo de natureza, mantivemos a mesma bússola: viajar com
                propósito, profundidade e respeito pelos lugares e por quem vai.
              </p>
              <p className="mt-4 text-[15px] font-light leading-relaxed text-ink/65">
                Hoje levamos pessoas a caminhar, pedalar, navegar e se refugiar
                nos cantos mais bonitos do mundo, sempre com a mão da gente por
                perto.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* NOSSA PAIXÃO */}
      <section className="bg-forest px-6 py-24 text-cream md:px-10 md:py-32">
        <div className="mx-auto max-w-[1180px]">
          <Reveal>
            <Kicker color="text-gold" line="bg-gold/50">
              Nossa paixão
            </Kicker>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 max-w-2xl font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1] tracking-[-0.01em]">
              O que nos move
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {PAIXAO.map((p, i) => (
              <Reveal key={p.titulo} delay={i * 0.06}>
                <div className="border-t border-forest-line/60 pt-6">
                  <span className="font-display text-sm text-gold">
                    0{i + 1}
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-light md:text-3xl">
                    {p.titulo}
                  </h3>
                  <p className="mt-3 max-w-sm text-[15px] font-light leading-relaxed text-cream/60">
                    {p.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* O QUE FAZEMOS */}
      <section className="bg-cream-deep px-6 py-24 text-ink md:px-10 md:py-28">
        <div className="mx-auto max-w-[1180px]">
          <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
            <Reveal>
              <div>
                <Kicker>O que fazemos</Kicker>
                <h2 className="mt-5 font-display text-[clamp(1.8rem,3.4vw,2.8rem)] font-light leading-[1.1] tracking-[-0.01em] text-forest">
                  Turismo de natureza, do começo ao fim
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {FAZEMOS.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 border-b border-forest/10 pb-4 text-[15px] font-light text-ink/70"
                  >
                    <span className="mt-1 text-gold">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ESPECIALISTAS */}
      <section className="bg-cream px-6 py-24 text-ink md:px-10 md:py-28">
        <div className="mx-auto max-w-[820px] text-center">
          <Reveal>
            <Kicker>Especialistas</Kicker>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 font-display text-[clamp(1.5rem,3vw,2.4rem)] font-light leading-[1.25] tracking-[-0.01em] text-forest">
              Quem planeja a sua viagem{" "}
              <span className="italic text-gold">já caminhou por ela</span>. Nossa
              equipe conhece os roteiros na pele. É assim que a gente atende.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <a
              href="#contato"
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-forest px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] text-cream transition-all duration-300 hover:bg-forest-soft"
            >
              Falar com um especialista <span>→</span>
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
