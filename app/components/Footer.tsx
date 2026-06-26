"use client";

import { AONIK } from "../lib/contato";
import { useLang } from "./LanguageProvider";

export default function Footer() {
  const { t } = useLang();
  const f = t.footer;

  const cols = [
    {
      titulo: f.colNav,
      links: f.colNavLinks,
      hrefs: ["/quem-somos", "/quem-somos", "/quem-somos", "/grupos"],
    },
    {
      titulo: f.colExp,
      links: f.colExpLinks,
      hrefs: ["/caminhadas", "/#bike", "/navegacao", "/hoteis"],
    },
  ];

  return (
    <footer className="relative bg-forest px-6 pb-10 pt-20 text-cream md:px-10">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Marca */}
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/aonik-logo-white.png"
              alt="AONIK"
              className="h-8 w-auto"
            />
            <p className="mt-5 max-w-xs text-[13px] font-light leading-relaxed text-cream/55">
              {f.descricao}
            </p>
          </div>

          {/* Colunas de navegação */}
          {cols.map((col) => (
            <div key={col.titulo}>
              <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                {col.titulo}
              </h3>
              <ul className="space-y-3">
                {col.links.map((l, i) => (
                  <li key={l}>
                    <a
                      href={col.hrefs[i] ?? "#"}
                      className="text-[14px] font-light text-cream/65 transition-colors hover:text-cream"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contato */}
          <div>
            <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
              {f.contato}
            </h3>
            <ul className="space-y-3 text-[14px] font-light text-cream/65">
              <li>
                <a
                  href={`mailto:${AONIK.email}`}
                  className="transition-colors hover:text-cream"
                >
                  {AONIK.email}
                </a>
              </li>
              <li>{AONIK.whatsappLabel}</li>
              <li>{AONIK.cidade}</li>
            </ul>

            <div className="mt-6">
              <div className="flex items-center gap-3">
                <a
                  href={AONIK.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram da AONIK"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-neon/40 text-neon transition-all hover:bg-neon hover:text-ink"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a
                  href={`https://wa.me/${AONIK.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp da AONIK"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#25D366]/50 text-[#25D366] transition-all hover:bg-[#25D366] hover:text-white"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.5A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.2-.7-2.7-1.1-4.4-3.8-4.5-4-.2-.2-1.1-1.4-1.1-2.7 0-1.3.7-1.9 1-2.2.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.5c-.2.2-.3.4-.1.7.7 1.2 1.5 1.7 2.6 2.2.2.1.4.1.5-.1l.6-.8c.2-.2.3-.2.6-.1l1.9.9c.3.1.4.2.5.3.1.2.1.7-.1 1.3Z" />
                  </svg>
                </a>
              </div>
              <a
                href={AONIK.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-[13px] font-light text-cream/60 transition-colors hover:text-neon"
              >
                @{AONIK.instagram}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-forest-line/60 pt-6 md:flex-row">
          <p className="text-[12px] text-cream/40">
            © {new Date().getFullYear()} AONIK · {f.copyright}
          </p>
          <p className="text-[11px] uppercase tracking-[0.2em] text-cream/30">
            {f.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
