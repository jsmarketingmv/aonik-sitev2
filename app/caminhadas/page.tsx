"use client";

import { motion } from "framer-motion";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Contato from "../components/Contato";
import FloatingActions from "../components/FloatingActions";
import JornadaPortal from "../components/JornadaPortal";
import PatagoniaPortal from "../components/PatagoniaPortal";
import CaminhosPortugalPortal from "../components/CaminhosPortugalPortal";
import GruposHome from "../components/GruposHome";
import Breadcrumb from "../components/Breadcrumb";
import { Reveal, Kicker, EASE } from "../components/ui";

const HERO_IMG =
  "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2400&auto=format&fit=crop";

/* Benefícios da caminhada como atividade — conecta com o manifesto acima */
const BENEFICIOS = [
  {
    titulo: "Natureza no corpo",
    desc: "Ar livre, ritmo do próprio passo e o corpo que reaprende a respirar longe da pressa.",
  },
  {
    titulo: "Imersão na cultura",
    desc: "Você caminha dentro da comida, da gente e dos costumes do lugar, não passa por fora.",
  },
  {
    titulo: "O mundo mais leve",
    desc: "Sem bagagem demais, sem agenda apertada. Só o caminho, a paisagem e o essencial.",
  },
  {
    titulo: "A verdade do destino",
    desc: "A pé, os lugares se mostram como são. A conexão é real porque o tempo é outro.",
  },
];

export default function CaminhadasPage() {
  return (
    <main className="relative bg-cream">
      <Nav />

      {/* ── HERO ─────────────────────────────────────────── */}
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
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] text-cream transition-transform duration-300 hover:scale-[1.03]"
            >
              Falar com especialista
              <span>→</span>
            </a>
            <div className="mt-7">
              <Breadcrumb
                tone="dark"
                accent="var(--color-gold-soft)"
                items={[
                  { label: "Home", href: "/" },
                  { label: "Caminhadas" },
                ]}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MANIFESTO (Por que caminhar) — fundo Honeydew ── */}
      <section className="bg-honeydew px-6 pt-24 pb-16 text-ink md:px-10 md:pt-32 md:pb-20">
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

      {/* ── BENEFÍCIOS DA CAMINHADA — segue o Honeydew ───── */}
      <section className="bg-honeydew px-6 pb-24 text-ink md:px-10 md:pb-32">
        <div className="mx-auto max-w-[1180px]">
          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFICIOS.map((b, i) => (
              <Reveal key={b.titulo} delay={i * 0.06}>
                <div className="border-t border-forest/15 pt-6">
                  <span className="font-display text-sm text-gold">
                    0{i + 1}
                  </span>
                  <h3 className="mt-2 font-display text-xl font-light text-forest md:text-2xl">
                    {b.titulo}
                  </h3>
                  <p className="mt-3 text-[14px] font-light leading-relaxed text-ink/60">
                    {b.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIAGENS EM GRUPO (logo após "Por que caminhar") ── */}
      <GruposHome variant="green" />

      {/* ── CAMINHO DE SANTIAGO (Peregrinação) ───────────── */}
      <JornadaPortal />

      {/* ── TORRES DEL PAINE (Patagônia) ─────────────────── */}
      <PatagoniaPortal />

      {/* ── CAMINHOS DE PORTUGAL (Douro · Santiago e Douro) ── */}
      <CaminhosPortugalPortal />

      <Contato />
      <Footer />
      <FloatingActions />
    </main>
  );
}
