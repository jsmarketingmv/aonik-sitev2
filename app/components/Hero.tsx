"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useLang } from "./LanguageProvider";

// Imagens por palavra-chave (independentes de idioma) — mesma ordem do dicionário
const ROTATING_IMGS = [
  "/images/hero/IMG_3490.JPG", // caminhada
  "https://www.portugal-a2z.com/imagegen//client/files/0000000001/1848.jpg/1900x800/2/1900x800/", // pedalada
  "https://cdn.prod.website-files.com/66f12032b3f2015fa639ef3e/684c66f504adcb4c0296f6b9_Nicola%CC%81s%20Gildemeister%20-%20image%20(10).jpg", // navegação
  "https://lastorres.com/content/uploads/01-6.jpg", // luxo (Las Torres)
  "/images/hero/IMG_1704.JPG", // travessia
  "/images/hero/IMG_3775.JPG", // jornada
];

// Estrutura das categorias (href/soon); rótulos vêm do dicionário
const CAT_META = [
  { n: "01", href: "#caminhadas" },
  { n: "02", href: "#bike" },
  { n: "03", href: "#navegacao" },
  { n: "04", href: "#refugios" },
  { n: "05", href: "/grupos" },
  { n: "06", href: "#neve", soon: true },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % ROTATING_IMGS.length),
      4400
    );
    return () => clearInterval(id);
  }, []);

  const palavra = t.hero.rotating[index] ?? t.hero.rotating[0];

  return (
    <section
      ref={ref}
      className="grain relative flex h-[100svh] min-h-[680px] w-full items-center justify-center overflow-hidden pb-24"
    >
      {/* Fundo com parallax + crossfade conforme a palavra-chave */}
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0 z-0">
        <AnimatePresence>
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${ROTATING_IMGS[index]}')` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-forest/70 via-forest/40 to-forest" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-transparent to-transparent" />
        <div className="absolute inset-0 bg-forest/25" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(11,23,17,0.6)_100%)]" />
      </motion.div>

      {/* Conteúdo */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto max-w-[1100px] px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.5 }}
          className="mb-7 text-[12px] font-medium uppercase tracking-[0.45em] text-gold-soft"
        >
          {t.hero.eyebrow}
        </motion.p>

        <h1 className="font-display text-cream">
          <Line delay={0.65}>
            <span className="block text-[clamp(2.6rem,8.5vw,7.5rem)] font-light leading-[0.95] tracking-[-0.02em]">
              {t.hero.line1}
            </span>
          </Line>

          <Line delay={0.8}>
            <span className="mt-1 flex flex-wrap items-baseline justify-center gap-x-[0.35em] text-[clamp(2.6rem,8.5vw,7.5rem)] font-light leading-[0.95] tracking-[-0.02em]">
              <span className="text-cream/80">{t.hero.connector}</span>
              <span className="relative inline-block min-w-[4ch] text-left italic text-gold">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(10px)" }}
                    transition={{ duration: 0.55, ease: EASE }}
                    className="inline-block"
                  >
                    {palavra}
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>
          </Line>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 1 }}
          className="mx-auto mt-9 max-w-xl text-base font-light leading-relaxed text-cream/70 md:text-lg"
        >
          {t.hero.subhead}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 1.15 }}
          className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#universos"
            className="group inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] text-ink transition-transform duration-300 hover:scale-[1.03]"
          >
            {t.hero.ctaPrimary}
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </motion.div>
      </motion.div>

      {/* Navegação de categorias — minimalista, dentro do hero */}
      <motion.nav
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 1.4 }}
        className="absolute bottom-0 left-0 z-10 w-full"
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="rule mb-0" />
          <ul className="flex items-stretch divide-x divide-cream/10 overflow-x-auto">
            {CAT_META.map((c, i) => {
              const isActive = index === i;
              return (
                <li key={c.n} className="relative min-w-fit flex-1">
                  {isActive && (
                    <motion.div
                      layoutId="hero-tab-bar"
                      className="absolute top-0 left-0 right-0 h-[2px] bg-gold"
                      transition={{ duration: 0.5, ease: EASE }}
                    />
                  )}
                  <a
                    href={c.soon ? undefined : c.href}
                    aria-disabled={c.soon}
                    className={`group flex h-full items-center gap-3 px-5 py-5 transition-colors ${
                      c.soon
                        ? "cursor-default"
                        : isActive
                          ? "bg-cream/[0.05]"
                          : "hover:bg-cream/[0.04]"
                    }`}
                  >
                    <span
                      className={`font-display text-[11px] transition-colors ${
                        isActive ? "text-gold" : "text-gold/60"
                      }`}
                    >
                      {c.n}
                    </span>
                    <span
                      className={`whitespace-nowrap text-[12px] font-medium uppercase tracking-[0.16em] transition-colors ${
                        c.soon
                          ? "text-cream/35"
                          : isActive
                            ? "text-cream"
                            : "text-cream/75 group-hover:text-gold"
                      }`}
                    >
                      {t.hero.categorias[i]}
                    </span>
                    {c.soon ? (
                      <span className="ml-1 rounded-full border border-cream/15 px-2 py-0.5 text-[8px] uppercase tracking-[0.18em] text-cream/40">
                        {t.hero.soon}
                      </span>
                    ) : (
                      <span
                        className={`ml-auto hidden transition-all duration-300 group-hover:translate-x-1 md:inline ${
                          isActive ? "text-gold" : "text-cream/30 group-hover:text-gold"
                        }`}
                      >
                        ↗
                      </span>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </motion.nav>
    </section>
  );
}

function Line({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    // Padding generoso em todos os lados (com margem negativa p/ não afetar o
    // layout) dá folga para itálico, acentos (ã/ç) e descenders (g/j) — evita
    // o "cortezinho" das letras dentro da máscara de revelação.
    <span className="block overflow-hidden px-[0.12em] pt-[0.14em] pb-[0.34em] -mx-[0.12em] -mt-[0.14em] -mb-[0.34em]">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, ease: EASE, delay }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}
