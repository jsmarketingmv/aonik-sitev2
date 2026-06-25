"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export type Crumb = { label: string; href?: string };

/**
 * Submenu / breadcrumb editorial — mesmo padrão do Skorpios.
 * Mostra o caminho de navegação (segmento / página atual).
 *
 * `tone`: "dark" para heros escuros (texto claro), "light" para fundos claros.
 * `accent`/`muted`/`hover`: permitem casar com a paleta de cada página.
 */
export default function Breadcrumb({
  items,
  tone = "dark",
  accent,
  delay = 0.85,
}: {
  items: Crumb[];
  tone?: "dark" | "light";
  accent?: string;
  delay?: number;
}) {
  const mutedColor =
    tone === "dark" ? "rgba(239,231,218,0.45)" : "rgba(6,32,31,0.45)";
  const hoverClass =
    tone === "dark" ? "hover:text-cream" : "hover:text-forest";
  const accentColor = accent ?? "var(--color-gold)";

  return (
    <motion.nav
      aria-label="Breadcrumb"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      className="flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em]"
      style={{ color: mutedColor }}
    >
      {items.map((c, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={c.label} className="flex items-center gap-2">
            {c.href && !isLast ? (
              <a
                href={c.href}
                className={`transition-colors ${hoverClass}`}
              >
                {c.label}
              </a>
            ) : (
              <span style={isLast ? { color: accentColor } : undefined}>
                {c.label}
              </span>
            )}
            {!isLast && <span aria-hidden>/</span>}
          </span>
        );
      })}
    </motion.nav>
  );
}
