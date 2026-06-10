"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { translations, type Dict, type Lang } from "../lib/i18n";

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
}

const Ctx = createContext<LangCtx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Sempre 'pt' no primeiro render (servidor e cliente) p/ evitar mismatch.
  const [lang, setLangState] = useState<Lang>("pt");

  // Recupera a preferência salva após montar.
  useEffect(() => {
    const saved = localStorage.getItem("aonik-lang") as Lang | null;
    if (saved && saved !== lang) setLangState(saved);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.documentElement.lang =
      lang === "pt" ? "pt-BR" : lang === "es" ? "es" : "en";
  }, [lang]);

  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem("aonik-lang", l);
  }

  return (
    <Ctx.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </Ctx.Provider>
  );
}

export function useLang() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLang precisa estar dentro de LanguageProvider");
  return ctx;
}
