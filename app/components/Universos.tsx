"use client";

import { motion } from "framer-motion";
import { useLang } from "./LanguageProvider";

const EASE = [0.16, 1, 0.3, 1] as const;

const SEG_META = [
  {
    id: "caminhadas",
    n: "01",
    img: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "bike",
    n: "02",
    img: "https://www.portugal-a2z.com/imagegen//client/files/0000000001/1848.jpg/1900x800/2/1900x800/",
  },
  {
    id: "navegacao",
    n: "03",
    img: "/skorpios/DSC_0020.JPG",
  },
  {
    id: "refugios",
    n: "04",
    img: "https://lastorres.com/content/uploads/01-6.jpg",
  },
];

export default function Universos() {
  const { t } = useLang();

  return (
    <section
      id="universos"
      className="relative bg-cream px-6 py-24 text-ink md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-16 flex flex-col gap-5 md:mb-24 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <h2 className="font-display text-[clamp(1.7rem,3.4vw,2.75rem)] font-light leading-[1.1] tracking-[-0.01em] text-forest">
              {t.universos.headingPre}{" "}
              <span className="italic text-gold">{t.universos.headingEm}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-[14px] font-light leading-relaxed text-ink/55">
              {t.universos.intro}
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col gap-16 md:gap-28">
          {SEG_META.map((s, i) => (
            <SegmentRow
              key={s.id}
              meta={s}
              texto={t.universos.segmentos[i]}
              explorar={t.universos.explorar}
              reverse={i % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function SegmentRow({
  meta,
  texto,
  explorar,
  reverse,
}: {
  meta: (typeof SEG_META)[number];
  texto: { kicker: string; nome: string; desc: string };
  explorar: string;
  reverse: boolean;
}) {
  const href = `/${meta.id}`;

  return (
    <Reveal>
      <div
        id={meta.id}
        className="grid scroll-mt-28 items-center gap-8 md:grid-cols-2 md:gap-14"
      >
        <div
          className={`group relative h-[280px] overflow-hidden rounded-xl md:h-[440px] ${
            reverse ? "md:order-2" : ""
          }`}
        >
          <div
            className="absolute inset-0 scale-105 bg-cover bg-center transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100"
            style={{ backgroundImage: `url('${meta.img}')` }}
          />
          <span className="absolute left-5 top-4 font-display text-sm text-cream/90 mix-blend-difference">
            {meta.n}
          </span>
        </div>

        <div className={reverse ? "md:order-1" : ""}>
          <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
            <span className="h-px w-8 bg-gold/50" />
            {texto.kicker}
          </p>
          <h3 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-light leading-[1.02] tracking-[-0.02em] text-forest">
            {texto.nome}
          </h3>
          <p className="mt-5 max-w-md text-[15px] font-light leading-relaxed text-ink/60">
            {texto.desc}
          </p>
          <a
            href={href}
            className="group mt-7 inline-flex items-center gap-3 rounded-full border border-forest/25 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-forest transition-all duration-300 hover:border-forest hover:bg-forest hover:text-cream"
          >
            {explorar}
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </Reveal>
  );
}

function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
