"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "./LanguageProvider";
import { LANGS } from "../lib/i18n";

// Caminhadas já tem página; os demais ainda são âncoras na home (/#...).
const HREFS = ["/caminhadas", "/#bike", "/navegacao", "/refugios", "/grupos"];

export default function Nav() {
  const { lang, setLang, t } = useLang();
  const [loginOpen, setLoginOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Tarja transitória: ao rolar, surge um degradê verde para a navbar
  // permanecer legível sobre as seções claras (creme).
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-forest/90 shadow-[0_8px_30px_-12px_rgba(11,23,17,0.5)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 transition-all duration-500 md:px-10 ${
          scrolled ? "py-4" : "py-6"
        }`}
      >
        {/* Logo */}
        <a href="/" aria-label="AONIK" className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/aonik-logo-white.png"
            alt="AONIK"
            className="h-6 w-auto md:h-7"
          />
        </a>

        {/* Links de categoria (telas largas) */}
        <ul className="hidden items-center gap-7 xl:flex">
          {t.nav.links.map((label, i) => (
            <li key={label}>
              <a
                href={HREFS[i]}
                className="group relative text-[12px] font-medium uppercase tracking-[0.16em] text-cream/70 transition-colors hover:text-cream"
              >
                {label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* Ações à direita */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Seletor de idioma */}
          <div className="hidden items-center gap-1 sm:flex">
            {LANGS.map((id) => (
              <button
                key={id}
                onClick={() => setLang(id)}
                className={`px-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] transition-colors ${
                  lang === id ? "text-gold" : "text-cream/45 hover:text-cream/80"
                }`}
              >
                {id}
              </button>
            ))}
          </div>

          {/* Login com ramificação */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setLoginOpen((v) => !v)}
              className="text-[12px] font-medium uppercase tracking-[0.14em] text-cream/70 transition-colors hover:text-cream"
            >
              {t.nav.login}
            </button>
            {loginOpen && (
              <div className="absolute right-0 top-9 w-60 overflow-hidden rounded-xl border border-forest-line/40 bg-forest shadow-2xl">
                <p className="border-b border-forest-line/40 px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-cream/40">
                  {t.nav.loginTitle}
                </p>
                <a
                  href="#"
                  className="block px-4 py-3 text-[13px] text-cream/80 transition-colors hover:bg-cream/[0.05] hover:text-cream"
                >
                  {t.nav.loginAgente}
                </a>
                <a
                  href="#"
                  className="block px-4 py-3 text-[13px] text-cream/80 transition-colors hover:bg-cream/[0.05] hover:text-cream"
                >
                  {t.nav.loginEquipe}
                </a>
              </div>
            )}
          </div>

          {/* CTA → formulário */}
          <a
            href="#contato"
            className="whitespace-nowrap rounded-full border border-cream/25 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-cream transition-all duration-300 hover:border-gold hover:bg-gold hover:text-ink md:text-[12px]"
          >
            {t.nav.cta}
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
