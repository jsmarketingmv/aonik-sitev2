"use client";

import { useState, useEffect } from "react";
import { AONIK } from "../lib/contato";
import { useLang } from "./LanguageProvider";

export default function FloatingActions() {
  const { t } = useLang();
  const [iaOpen, setIaOpen] = useState(false);

  // Permite que CTAs da página (ex.: "Conversar com a Aonik IA") abram o painel.
  useEffect(() => {
    const open = () => setIaOpen(true);
    window.addEventListener("open-aonikia", open);
    return () => window.removeEventListener("open-aonikia", open);
  }, []);

  return (
    <>
      {/* Aonik IA — canto inferior esquerdo */}
      <div className="fixed bottom-6 left-6 z-50">
        {iaOpen && (
          <div className="absolute bottom-16 left-0 w-72 rounded-2xl border border-forest-line/40 bg-forest p-5 shadow-2xl">
            <p className="font-display text-lg text-cream">Aonik <strong className="font-bold">IA</strong></p>
            <p className="mt-2 text-[13px] font-light leading-relaxed text-cream/65">
              {t.floating.balloon}
            </p>
            <a
              href={`https://wa.me/${AONIK.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIaOpen(false)}
              className="mt-4 inline-flex text-[12px] font-semibold uppercase tracking-[0.14em] text-gold"
            >
              {t.floating.falarAgora} →
            </a>
          </div>
        )}
        <button
          onClick={() => setIaOpen((v) => !v)}
          className="flex items-center gap-2 rounded-full border border-cream/15 bg-ink/90 py-3 pl-3 pr-5 text-cream shadow-xl backdrop-blur transition-transform hover:scale-[1.03]"
          aria-label="Abrir Aonik IA"
        >
          <span className="text-neon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l1.9 5.1L19 9l-5.1 1.9L12 16l-1.9-5.1L5 9l5.1-1.9L12 2Zm6 11l.9 2.4L21 16l-2.1.6L18 19l-.9-2.4L15 16l2.1-.6L18 13ZM6 14l.7 1.8L9 16.5l-2.3.7L6 19l-.7-1.8L3 16.5l2.3-.7L6 14Z" />
            </svg>
          </span>
          <span className="text-[13px] font-semibold tracking-[0.04em]">
            Aonik <strong className="font-bold">IA</strong>
          </span>
        </button>
      </div>

      {/* WhatsApp — canto inferior direito */}
      <a
        href={`https://wa.me/${AONIK.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform hover:scale-[1.06]"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.5A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.2-.7-2.7-1.1-4.4-3.8-4.5-4-.2-.2-1.1-1.4-1.1-2.7 0-1.3.7-1.9 1-2.2.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.5c-.2.2-.3.4-.1.7.7 1.2 1.5 1.7 2.6 2.2.2.1.4.1.5-.1l.6-.8c.2-.2.3-.2.6-.1l1.9.9c.3.1.4.2.5.3.1.2.1.7-.1 1.3Z" />
        </svg>
      </a>
    </>
  );
}
