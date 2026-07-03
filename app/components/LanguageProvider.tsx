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
  // Site publicado só em PT por ora. O switcher foi removido do Nav; a infra
  // de i18n fica intacta p/ a tradução futura dentro do site. Enquanto isso,
  // travamos em 'pt' e limpamos qualquer preferência ES/EN antiga do
  // localStorage (senão visitante que clicou ES fica preso no conteúdo em PT).
  const [lang, setLangState] = useState<Lang>("pt");

  useEffect(() => {
    localStorage.removeItem("aonik-lang");
    document.documentElement.lang = "pt-BR";
  }, []);

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
