"use client";

import { motion } from "framer-motion";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Contato from "../../components/Contato";
import FloatingActions from "../../components/FloatingActions";
import { Reveal, EASE } from "../../components/ui";

const P = {
  abyss:  "#072330",
  fjord:  "#0e3a49",
  ice:    "#7fd4e0",
  steppe: "#cda878",
  paper:  "#e4edef",
  white:  "#e9f5f8",
  line:   "rgba(127,212,224,0.18)",
};

const ROTAS = [
  {
    nome:  "Ruta Kawéskar",
    sub:   "MN Skorpios III · Puerto Natales",
    desc:  "Quatro noites pelos fiordes onde os Kawésqar navegaram por milênios. Geleiras Amalia, El Brujo e Bernal, acessadas de botes de expedição.",
    stats: [
      { label: "Duração",  value: "5 dias / 4 noites" },
      { label: "Milhas",   value: "505 náuticas" },
      { label: "Saída",    value: "Puerto Natales" },
    ],
    preco: "a partir de US$ 1.890",
    href:  "/destinos/cruzeiro-skorpios/kaweskar",
    img:   "/skorpios/DSC_3890.JPG",
    tag:   "Patagônia Sul",
    accent:"#7fd4e0",
  },
  {
    nome:  "Ruta Chonos",
    sub:   "MN Skorpios II · Puerto Montt",
    desc:  "Cinco noites pelos arquipélagos patagônicos, da Ilha de Chiloé ao Glaciar San Rafael. 800 milhas de canais, fauna e natureza intocada.",
    stats: [
      { label: "Duração",  value: "6 dias / 5 noites" },
      { label: "Milhas",   value: "800 náuticas" },
      { label: "Saída",    value: "Puerto Montt" },
    ],
    preco: "sob consulta",
    href:  "/destinos/cruzeiro-skorpios/chonos",
    img:   "/skorpios/DSC_4317.JPG",
    tag:   "Patagônia Norte",
    accent:"#3aab8a",
  },
];

export default function CruzeiroSkorpiosHubPage() {
  return (
    <main className="relative" style={{ background: P.paper }}>
      <Nav />

      {/* ===== HERO ===== */}
      <section
        className="relative flex min-h-[78svh] w-full items-end overflow-hidden"
        style={{ background: P.abyss }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/skorpios/DSC_0020.JPG')",
            opacity: 0.5,
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to top, ${P.abyss} 10%, transparent 65%)` }}
        />
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-16 md:px-10 md:pb-22">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          >
            <p
              className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.4em]"
              style={{ color: P.ice }}
            >
              <span className="h-px w-8" style={{ background: P.ice }} />
              Navegação · Expedição Patagônica
            </p>
            <h1
              className="mt-4 font-display text-[clamp(3rem,9vw,7.5rem)] font-light uppercase leading-[0.86] tracking-[-0.02em]"
              style={{ color: P.white }}
            >
              Cruzeiros
              <br />
              Skorpios
            </h1>
            <p
              className="mt-6 max-w-lg text-[16px] font-light leading-relaxed"
              style={{ color: "rgba(233,245,248,0.68)" }}
            >
              Dois navios. Dois mundos de gelo. Da Patagônia Norte ao extremo
              sul dos fiordes — escolha a sua rota.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== SELETOR DE ROTAS ===== */}
      <section
        className="px-6 py-20 md:px-10 md:py-28"
        style={{ background: P.fjord }}
      >
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p
              className="mb-10 text-center text-[11px] font-semibold uppercase tracking-[0.34em]"
              style={{ color: P.ice }}
            >
              Escolha a sua rota
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {ROTAS.map((r, i) => (
              <Reveal key={r.nome} delay={i * 0.1}>
                <a
                  href={r.href}
                  className="group block overflow-hidden rounded-2xl transition-transform duration-300 hover:-translate-y-1"
                  style={{ background: P.abyss }}
                >
                  {/* Imagem */}
                  <div className="relative h-64 overflow-hidden md:h-[300px]">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                      style={{ backgroundImage: `url('${r.img}')` }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: `linear-gradient(to top, ${P.abyss} 0%, transparent 60%)` }}
                    />
                    <span
                      className="absolute left-5 top-5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]"
                      style={{ background: r.accent, color: P.abyss }}
                    >
                      {r.tag}
                    </span>
                  </div>

                  {/* Conteúdo */}
                  <div className="p-7 md:p-8">
                    <p
                      className="text-[11px] font-semibold uppercase tracking-[0.2em]"
                      style={{ color: r.accent }}
                    >
                      {r.sub}
                    </p>
                    <h2
                      className="mt-2 font-display text-[clamp(1.7rem,2.6vw,2.4rem)] font-light"
                      style={{ color: P.white }}
                    >
                      {r.nome}
                    </h2>
                    <p
                      className="mt-3 text-[14px] font-light leading-relaxed"
                      style={{ color: "rgba(233,245,248,0.58)" }}
                    >
                      {r.desc}
                    </p>

                    {/* Stats */}
                    <div
                      className="mt-6 grid grid-cols-3 gap-3 border-t pt-5"
                      style={{ borderColor: P.line }}
                    >
                      {r.stats.map((s) => (
                        <div key={s.label}>
                          <p
                            className="text-[10px] font-semibold uppercase tracking-[0.16em]"
                            style={{ color: "rgba(233,245,248,0.38)" }}
                          >
                            {s.label}
                          </p>
                          <p
                            className="mt-1 text-[13px] font-light"
                            style={{ color: P.white }}
                          >
                            {s.value}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Rodapé do card */}
                    <div className="mt-5 flex items-center justify-between">
                      <span
                        className="font-display text-xl font-light"
                        style={{ color: "rgba(233,245,248,0.8)" }}
                      >
                        {r.preco}
                      </span>
                      <span
                        className="text-[12px] font-semibold uppercase tracking-[0.14em] transition-transform duration-300 group-hover:translate-x-1"
                        style={{ color: r.accent }}
                      >
                        Ver rota →
                      </span>
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SOBRE A OPERADORA ===== */}
      <section
        className="px-6 py-24 md:px-10 md:py-32"
        style={{ background: P.abyss, color: P.white }}
      >
        <div className="mx-auto max-w-[860px] text-center">
          <Reveal>
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.34em]"
              style={{ color: P.steppe }}
            >
              Sobre a operadora
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              className="mt-6 font-display text-[clamp(1.8rem,3.8vw,3rem)] font-light leading-[1.15]"
              style={{ color: P.white }}
            >
              Há mais de 50 anos navegando
              <br />a{" "}
              <span className="italic" style={{ color: P.ice }}>
                Patagônia que poucos veem
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p
              className="mx-auto mt-6 max-w-xl text-[15px] font-light leading-relaxed"
              style={{ color: "rgba(233,245,248,0.62)" }}
            >
              A Skorpios opera desde 1975 nos canais patagônicos. Navios
              boutique com menos de 100 hóspedes, tripulação local e
              expedições às geleiras, fauna e vilas de pescadores que o turismo
              de massa jamais alcança.
            </p>
          </Reveal>
        </div>
      </section>

      <Contato />
      <Footer />
      <FloatingActions />
    </main>
  );
}
