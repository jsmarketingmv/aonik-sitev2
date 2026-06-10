"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

// Peregrino chegando à Catedral de Santiago de Compostela — ID verificado via Unsplash
const IMG =
  "https://images.unsplash.com/photo-1642336232469-3a5051970fa3?q=80&w=1600&auto=format&fit=crop";

export default function JornadaPortal() {
  return (
    <section id="jornada" className="bg-cream px-6 pb-28 md:px-10 md:pb-36">
      <div className="mx-auto max-w-[1180px]">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div className="relative overflow-visible">
            {/* Imagem */}
            <div className="group relative h-[380px] overflow-hidden rounded-xl md:h-[480px]">
              <div
                className="absolute inset-0 scale-105 bg-cover bg-center transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100"
                style={{ backgroundImage: `url('${IMG}')` }}
              />
              <div className="absolute inset-0 bg-ink/15" />
            </div>

            {/* Caixa de texto — creme, sobreposta à direita */}
            <div className="relative z-10 -mt-20 w-full rounded-xl bg-cream p-7 shadow-[0_24px_60px_-30px_rgba(11,23,17,0.45)] md:absolute md:bottom-10 md:right-10 md:mt-0 md:max-w-[420px] md:p-9">
              <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.24em] text-gold">
                Peregrinação & Autoconhecimento
              </p>
              <h3 className="font-display text-[2.6rem] font-light leading-[1.02] tracking-[-0.02em] text-forest md:text-5xl">
                Jornada
              </h3>
              <p className="mt-3 text-[14px] font-light leading-relaxed text-ink/60">
                Os Caminhos de Santiago e outras travessias que são tanto sobre
                o trajeto quanto sobre quem volta delas.
              </p>
              <a
                href="#contato"
                className="group/cta mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-forest"
              >
                Explorar Destinos
                <span className="text-gold transition-transform duration-300 group-hover/cta:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
