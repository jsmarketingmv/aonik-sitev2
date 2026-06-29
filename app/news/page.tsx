"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import FloatingActions from "../components/FloatingActions";
import { getEdicoesOrdenadas } from "../lib/news";

const EASE = [0.16, 1, 0.3, 1] as const;

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function formatarData(iso: string) {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

const TIPO_KICKER: Record<string, string> = {
  informativo: "Novidades & Destinos",
  comercial: "Condição Especial",
};

export default function NewsHubPage() {
  const edicoes = getEdicoesOrdenadas();

  return (
    <div className="min-h-screen bg-forest text-cream">
      <Nav />

      {/* ── HERO ── */}
      <section className="grain relative flex min-h-[56vh] items-end justify-start overflow-hidden pb-20 pt-36 md:pb-28">
        {/* Fundo */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/tmb/hero.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest/60 via-forest/30 to-forest" />
          <div className="absolute inset-0 bg-forest/20" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
          className="relative z-10 mx-auto w-full max-w-[1180px] px-6 md:px-10"
        >
          <p className="mb-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
            <span className="h-px w-8 bg-gold/50" />
            Quinzenal · Gratuito
          </p>
          <h1
            className="font-display text-[clamp(2.8rem,7vw,6rem)] font-light leading-[0.95] tracking-[-0.02em] text-cream"
          >
            AONIK
            <span className="block italic text-gold">News</span>
          </h1>
          <p className="mt-6 max-w-md text-[15px] font-light leading-relaxed text-cream/65">
            Destinos, dicas de temporada e condições especiais.
            Direto ao ponto, a cada 15 dias.
          </p>
        </motion.div>
      </section>

      {/* ── LISTA DE EDIÇÕES (cream) ── */}
      <section className="bg-cream px-6 py-24 text-ink md:px-10 md:py-32">
        <div className="mx-auto max-w-[1180px]">

          {/* Header da seção */}
          <Reveal className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="font-display text-[clamp(1.5rem,2.8vw,2.25rem)] font-light leading-[1.1] tracking-[-0.01em] text-forest">
              Edições{" "}
              <span className="italic text-gold">publicadas</span>
            </h2>
            <p className="max-w-xs text-[13px] font-light leading-relaxed text-ink/50">
              Cada link foi pensado para abrir direto do WhatsApp no celular.
              Compartilhe com quem vai adorar.
            </p>
          </Reveal>

          {/* Edições */}
          {edicoes.length === 0 ? (
            <p className="py-16 text-center text-ink/40">
              Nenhuma edição publicada ainda.
            </p>
          ) : (
            <div className="flex flex-col gap-16 md:gap-28">
              {edicoes.map((ed, i) => {
                const reverse = i % 2 === 1;
                return (
                  <Reveal key={ed.slug} delay={i * 0.05}>
                    <Link
                      href={`/news/${ed.slug}`}
                      className="group grid items-center gap-8 md:grid-cols-2 md:gap-14"
                    >
                      {/* Imagem */}
                      {ed.hero && (
                        <div
                          className={`relative h-[260px] overflow-hidden rounded-xl md:h-[400px] ${
                            reverse ? "md:order-2" : ""
                          }`}
                        >
                          <div
                            className="absolute inset-0 scale-105 bg-cover bg-center transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100"
                            style={{ backgroundImage: `url('${ed.hero}')` }}
                          />
                          {/* Número editorial */}
                          <span className="absolute left-5 top-4 font-display text-sm text-cream/90 mix-blend-difference">
                            {String(ed.numero).padStart(2, "0")}
                          </span>
                          {/* Tipo badge */}
                          <span
                            className={`absolute right-4 top-4 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${
                              ed.tipo === "comercial"
                                ? "bg-gold text-ink"
                                : "bg-neon text-ink"
                            }`}
                          >
                            {TIPO_KICKER[ed.tipo]}
                          </span>
                        </div>
                      )}

                      {/* Texto */}
                      <div className={reverse ? "md:order-1" : ""}>
                        <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
                          <span className="h-px w-8 bg-gold/50" />
                          {formatarData(ed.data)}
                        </p>
                        <h3 className="font-display text-[clamp(1.6rem,3vw,2.6rem)] font-light leading-[1.06] tracking-[-0.02em] text-forest transition-colors duration-300 group-hover:text-gold">
                          {ed.titulo}
                        </h3>
                        <p className="mt-4 max-w-sm text-[14px] font-light leading-relaxed text-ink/55">
                          {ed.subtitulo}
                        </p>
                        <span className="mt-7 inline-flex items-center gap-3 rounded-full border border-forest/25 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-forest transition-all duration-300 group-hover:border-forest group-hover:bg-forest group-hover:text-cream">
                          Ler edição
                          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </div>
  );
}
