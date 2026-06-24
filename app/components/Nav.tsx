"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "./LanguageProvider";
import { LANGS } from "../lib/i18n";

// Peregrinação → /jornada; Hotéis → /refugios (rotas existentes, só renomeadas no nav)
const HREFS = ["/caminhadas", "/jornada", "/grupos", "/bike", "/navegacao", "/refugios"];

// Login do SaaS Operadora (mesmo destino para agente/operador e equipe AONIK).
// Ativa quando o domínio aonik.com.br for conectado (path /reservas → SaaS).
const SAAS_LOGIN = "https://reservas.aonik.com.br/reservas/login";

export default function Nav() {
  const { lang, setLang, t } = useLang();
  const [loginOpen, setLoginOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fechar menu ao mudar de rota / resize
  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
          scrolled || menuOpen
            ? "bg-forest/90 shadow-[0_8px_30px_-12px_rgba(11,23,17,0.5)] backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <nav
          className={`relative mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 transition-all duration-500 md:px-10 ${
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

          {/* Links de categoria — centralizados no espaço entre marca e ações */}
          <ul className="hidden flex-1 items-center justify-center gap-7 lg:flex xl:gap-9">
            {t.nav.links.map((label, i) => (
              <li key={label}>
                <a
                  href={HREFS[i]}
                  className="group relative text-[11px] font-medium uppercase tracking-[0.18em] text-cream/70 transition-colors hover:text-cream"
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

            {/* Login com ramificação (só desktop lg+) */}
            <div className="relative hidden lg:block">
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
                    href={SAAS_LOGIN}
                    className="block px-4 py-3 text-[13px] text-cream/80 transition-colors hover:bg-cream/[0.05] hover:text-cream"
                  >
                    {t.nav.loginAgente}
                  </a>
                  <a
                    href={SAAS_LOGIN}
                    className="block px-4 py-3 text-[13px] text-cream/80 transition-colors hover:bg-cream/[0.05] hover:text-cream"
                  >
                    {t.nav.loginEquipe}
                  </a>
                </div>
              )}
            </div>

            {/* CTA → formulário (oculto em mobile pequeno para dar espaço ao hambúrguer) */}
            <a
              href="#contato"
              className="hidden whitespace-nowrap rounded-full border border-cream/25 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-cream transition-all duration-300 hover:border-gold hover:bg-gold hover:text-ink sm:inline-block md:text-[12px]"
            >
              {t.nav.cta}
            </a>

            {/* Hambúrguer (telas < lg) */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            >
              <span
                className={`block h-px w-6 bg-cream transition-all duration-300 ${
                  menuOpen ? "translate-y-[5px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-6 bg-cream transition-all duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-px w-6 bg-cream transition-all duration-300 ${
                  menuOpen ? "-translate-y-[9px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Menu mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-0 z-40 bg-forest/95 pt-20 backdrop-blur-md lg:hidden"
          >
            <div className="mx-auto max-w-[1400px] px-6 pb-8 md:px-10">
              <ul className="flex flex-col gap-1 border-b border-cream/10 pb-6">
                {t.nav.links.map((label, i) => (
                  <li key={label}>
                    <a
                      href={HREFS[i]}
                      onClick={() => setMenuOpen(false)}
                      className="block py-3 text-[14px] font-medium uppercase tracking-[0.18em] text-cream/70 transition-colors hover:text-cream"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col gap-4">
                {/* Idioma */}
                <div className="flex items-center gap-2">
                  {LANGS.map((id) => (
                    <button
                      key={id}
                      onClick={() => setLang(id)}
                      className={`px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] transition-colors ${
                        lang === id ? "text-gold" : "text-cream/45 hover:text-cream/80"
                      }`}
                    >
                      {id}
                    </button>
                  ))}
                </div>

                {/* Login mobile */}
                <div className="flex flex-col gap-2">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-cream/40">
                    {t.nav.loginTitle}
                  </p>
                  <a href={SAAS_LOGIN} className="text-[13px] text-cream/70 hover:text-cream">
                    {t.nav.loginAgente}
                  </a>
                  <a href={SAAS_LOGIN} className="text-[13px] text-cream/70 hover:text-cream">
                    {t.nav.loginEquipe}
                  </a>
                </div>

                {/* CTA mobile */}
                <a
                  href="#contato"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 inline-block w-full rounded-full border border-cream/25 px-5 py-3 text-center text-[12px] font-semibold uppercase tracking-[0.14em] text-cream transition-all duration-300 hover:border-gold hover:bg-gold hover:text-ink"
                >
                  {t.nav.cta}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
