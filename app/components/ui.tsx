"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export const EASE = [0.16, 1, 0.3, 1] as const;

/** Revela o conteúdo ao entrar na viewport. */
export function Reveal({
  children,
  delay = 0,
  y = 36,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Kicker editorial: linha + rótulo em caixa-alta. */
export function Kicker({
  children,
  color = "text-gold",
  line = "bg-gold/50",
}: {
  children: ReactNode;
  color?: string;
  line?: string;
}) {
  return (
    <p
      className={`flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] ${color}`}
    >
      <span className={`h-px w-8 ${line}`} />
      {children}
    </p>
  );
}
