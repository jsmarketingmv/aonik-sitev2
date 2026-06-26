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

      {/* ── AUTOGUIADOS — link para /autoguiados ─────────── */}
      <section className="bg-[#2A6F2B] px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1180px]">
          <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <Reveal>
                <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#C8F169]/70">
                  Formato · Self-guided
                </p>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="mt-3 font-display text-[clamp(2rem,5vw,3.8rem)] font-light uppercase leading-[0.9] tracking-[-0.02em] text-cream">
                  Viaje no seu<br />
                  <span className="italic normal-case text-[#C8F169]">próprio ritmo</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-sm text-[14px] font-light leading-relaxed text-cream/65">
                  Santiago de Compostela, Torres del Paine, Caminhos de Portugal e
                  cicloturismo. Todos os roteiros sem guia fixo reunidos em um só lugar.
                </p>
              </Reveal>
              <Reveal delay={0.14}>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="/autoguiados"
                    className="inline-flex items-center gap-3 rounded-full bg-[#C8F169] px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#1a3a1b] transition-all duration-300 hover:scale-[1.03]"
                  >
                    Ver todos os autoguiados
                    <span>→</span>
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Cards rápidos */}
            <Reveal delay={0.12}>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:min-w-[420px]">
                {[
                  { nome: "Caminho de Santiago", n: "10+", u: "roteiros", href: "/jornada" },
                  { nome: "Torres del Paine", n: "4", u: "circuitos W", href: "/destinos/torres-del-paine" },
                  { nome: "Caminhos de Portugal", n: "5", u: "roteiros", href: "/caminhos-autoguiados" },
                ].map((c) => (
                  <a
                    key={c.nome}
                    href={c.href}
                    className="group flex flex-col gap-2 rounded-xl p-5 transition-all duration-300 hover:-translate-y-[2px]"
                    style={{ background: "rgba(200,241,105,0.08)", border: "1px solid rgba(200,241,105,0.2)" }}
                  >
                    <span className="font-display text-[2rem] font-light leading-none text-[#C8F169]">{c.n}</span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#C8F169]/60">{c.u}</span>
                    <span className="mt-1 text-[12px] font-light text-cream/70">{c.nome}</span>
                    <span className="mt-auto text-[10px] font-semibold uppercase tracking-[0.12em] text-cream/40 transition-transform duration-300 group-hover:translate-x-1">
                      Ver →
                    </span>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Contato />
      <Footer />
      <FloatingActions />
    </main>
  );
}
