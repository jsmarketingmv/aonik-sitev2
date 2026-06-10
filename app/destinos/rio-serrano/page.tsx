"use client";

import { motion } from "framer-motion";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Contato from "../../components/Contato";
import FloatingActions from "../../components/FloatingActions";
import { Reveal, EASE } from "../../components/ui";

/* ============================================================
   RIO SERRANO — Refúgio de Natureza (Torres del Paine)
   Personalidade: o CONTRASTE. Lá fora o fim do mundo, aqui dentro
   o aconchego. Âmbar de lareira + granito frio da Patagônia.
   ============================================================ */
const R = {
  night: "#16130d", // noite quente de lareira
  stone: "#241f17",
  amber: "#d99a52", // fogo / calor — accent
  champagne: "#cfa86a",
  cream: "#f3efe6",
  cold: "#5a6b73", // granito frio da Patagônia (o "lá fora")
  coldBg: "#1a2329",
  line: "rgba(243,239,230,0.16)",
};

const HERO_IMG =
  "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=2600&auto=format&fit=crop";

const STATS = [
  { v: "108", l: "quartos" },
  { v: "100%", l: "dentro do parque" },
  { v: "2", l: "restaurantes" },
  { v: "1", l: "spa com vista" },
];

const EXPERIENCIAS = [
  { t: "Trekking guiado", d: "Base Torres, Mirador, Grey: saídas diárias com guias The Massif." },
  { t: "Navegação de geleira", d: "Até a face do Glaciar Grey, entre témpanos azuis." },
  { t: "Cavalgadas", d: "Pela estepe patagônica, no ritmo dos baqueanos." },
  { t: "Transfers privados", d: "Aeroporto, trilhas e mirantes. Logística resolvida." },
];

export default function RioSerranoPage() {
  return (
    <main className="relative" style={{ background: R.cream }}>
      <Nav />

      {/* ===== HERO ===== */}
      <section className="grain relative flex min-h-[100svh] w-full flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 scale-105 bg-cover bg-center" style={{ backgroundImage: `url('${HERO_IMG}')` }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${R.night} 5%, ${R.night}cc 30%, ${R.night}33 60%, ${R.night}55 100%)` }} />
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-14 md:px-10 md:pb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.3 }}
            className="mb-4 text-[12px] font-medium uppercase tracking-[0.4em] md:mb-6"
            style={{ color: R.amber }}
          >
            Torres del Paine · Refúgio de Natureza
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.4 }}
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
            transition={{ duration: 1, ease: EASE, delay: 0.7 }}
            className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <p className="max-w-md text-[15px] font-light leading-relaxed md:text-base" style={{ color: "rgba(243,239,230,0.75)" }}>
              O lodge dentro do Parque Torres del Paine. Lá fora, o fim do mundo;
              aqui dentro, lareira, alta cozinha e uma janela para o maciço.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <span style={{ color: "rgba(243,239,230,0.85)" }}>
                <span className="text-[12px] uppercase tracking-[0.16em]" style={{ color: "rgba(243,239,230,0.5)" }}>
                  a partir de
                </span>{" "}
                <span className="font-display text-2xl">US$ 390 / noite</span>
              </span>
              <a
                href="#contato"
                className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]"
                style={{ background: R.amber, color: R.night }}
              >
                Reservar minha estadia <span>→</span>
              </a>
            </div>
          </motion.div>
        </div>
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
        {/* LÁ FORA — frio, selvagem */}
        <div className="relative min-h-[460px] overflow-hidden md:min-h-[640px]" style={{ background: R.coldBg }}>
          <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500514966906-fe245eea9344?q=80&w=1600&auto=format&fit=crop')" }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${R.coldBg}, ${R.coldBg}66)` }} />
          <div className="relative z-10 flex h-full flex-col justify-end p-8 md:p-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: R.cold }}>
              Lá fora
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.08]" style={{ color: R.cream }}>
              O fim do mundo, sem filtro
            </h2>
            <p className="mt-4 max-w-sm text-[15px] font-light leading-relaxed" style={{ color: "rgba(243,239,230,0.7)" }}>
              Vento, granito, gelo e os cornos das Torres rasgando o céu. A
              Patagônia bruta começa na porta do hotel.
            </p>
          </div>
        </div>
        {/* AQUI DENTRO — quente, aconchego */}
        <div className="relative min-h-[460px] overflow-hidden md:min-h-[640px]" style={{ background: R.stone }}>
          <div className="absolute inset-0 bg-cover bg-center opacity-45" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1600&auto=format&fit=crop')" }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${R.stone}, ${R.stone}55)` }} />
          <div className="relative z-10 flex h-full flex-col justify-end p-8 md:p-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: R.amber }}>
              Aqui dentro
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.08]" style={{ color: R.cream }}>
              O aconchego que você merece
            </h2>
            <p className="mt-4 max-w-sm text-[15px] font-light leading-relaxed" style={{ color: "rgba(243,239,230,0.7)" }}>
              Lareira acesa, vinho chileno, banheira com vista e uma cama que
              abraça depois do trekking. O luxo de voltar.
            </p>
          </div>
        </div>
      </section>

      {/* ===== GASTRONOMIA ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: R.cream, color: "#241f17" }}>
        <div className="mx-auto grid max-w-[1280px] items-center gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <div className="relative h-[360px] overflow-hidden rounded-xl md:h-[480px]">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1400&auto=format&fit=crop')" }} />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: R.champagne }}>
                <span className="h-px w-8" style={{ background: R.champagne }} />
                Alta gastronomia
              </p>
              <h2 className="mt-5 font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1]">
                Duas cozinhas, uma só paisagem
              </h2>
              <p className="mt-6 text-[15px] font-light leading-relaxed" style={{ color: "rgba(36,31,23,0.7)" }}>
                O restaurante <span className="italic">Qawasqar</span> e o{" "}
                <span className="italic">Restobar De Agostini</span> traduzem a
                Patagônia no prato. Sob o comando do chef Valter Leal,
                ingredientes locais viram uma experiência de origem, do cordeiro
                magalânico ao centolla.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== SPA ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: R.night, color: R.cream }}>
        <div className="mx-auto max-w-[900px] text-center">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: R.amber }}>
              Spa com vista
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 font-display text-[clamp(1.8rem,4vw,3.2rem)] font-light leading-[1.18]">
              Relaxar olhando o gelo. Águas quentes, sauna e massagens com o
              maciço{" "}
              <span className="italic" style={{ color: R.amber }}>
                emoldurado na janela
              </span>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== EXPERIÊNCIAS (The Massif) ===== */}
      <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: R.cream, color: "#241f17" }}>
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
          <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {EXPERIENCIAS.map((e, i) => (
              <Reveal key={e.t} delay={i * 0.05}>
                <div className="flex items-baseline gap-5 border-t pt-6" style={{ borderColor: "rgba(36,31,23,0.15)" }}>
                  <span className="font-display text-sm" style={{ color: R.champagne }}>
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-light md:text-3xl">{e.t}</h3>
                    <p className="mt-2 max-w-sm text-[15px] font-light leading-relaxed" style={{ color: "rgba(36,31,23,0.6)" }}>
                      {e.d}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
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
              Monte sua estadia no Rio Serrano
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] font-light leading-relaxed" style={{ color: "rgba(243,239,230,0.65)" }}>
              Quantas noites, qual quarto, quais experiências, melhor época:
              a AonikIA conhece o Rio Serrano e já te conecta com um especialista.
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
