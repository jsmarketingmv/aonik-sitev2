"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { EASE } from "../components/ui";
import { gravarLeadAgencia } from "../lib/leads";
import { PORTAL_AGENCIA } from "../lib/contato";

/**
 * Porta de entrada da área comercial B2B.
 *
 * Capta o contato do agente e manda para /parceiros/comercial. A área comercial
 * NÃO é bloqueada por este formulário de propósito: quem recebe o link direto
 * do Juliano precisa abrir sem atrito, inclusive parceiro antigo trocando de
 * celular. O formulário existe para captar, não para barrar.
 */
export default function ParceirosGate() {
  const router = useRouter();
  const [form, setForm] = useState({ nome: "", agencia: "", email: "", telefone: "" });
  const [status, setStatus] = useState<"idle" | "enviando" | "erro">("idle");

  function set<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function aoEnviar(e: React.FormEvent) {
    e.preventDefault();
    if (status === "enviando") return;
    setStatus("enviando");
    try {
      await gravarLeadAgencia(form);
    } catch (err) {
      // O contato é importante, mas não vale prender o agente na porta por uma
      // falha nossa de gravação. Segue para a área comercial de qualquer forma.
      console.error("Falha ao gravar lead de agência", err);
    }
    router.push("/parceiros/comercial");
  }

  return (
    <main className="min-h-screen bg-forest text-cream">
      <Nav />

      <section className="px-6 pb-24 pt-32 md:px-10 md:pt-40">
        <div className="mx-auto max-w-[560px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.4em] text-gold">
              Para agências e agentes de viagem
            </p>
            <h1 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-light leading-[1.08] tracking-[-0.02em]">
              Revenda as experiências <span className="italic text-gold">AONIK</span>
            </h1>
            <p className="mt-5 text-[15px] font-light leading-relaxed text-cream/65">
              Deixe seus dados para receber as condições comerciais completas, os
              dois modelos de parceria e o calendário de saídas. Você é levado
              direto para a área comercial em seguida.
            </p>
          </motion.div>

          <motion.form
            onSubmit={aoEnviar}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="mt-10 rounded-2xl border border-forest-line/40 bg-forest-soft/40 p-7 md:p-9"
          >
            <div className="grid gap-5">
              <Campo label="Seu nome" required>
                <input
                  required
                  value={form.nome}
                  onChange={(e) => set("nome", e.target.value)}
                  placeholder="Nome e sobrenome"
                  className={ESTILO_INPUT}
                />
              </Campo>

              <Campo label="Nome da agência" required>
                <input
                  required
                  value={form.agencia}
                  onChange={(e) => set("agencia", e.target.value)}
                  placeholder="Razão social ou nome fantasia"
                  className={ESTILO_INPUT}
                />
              </Campo>

              <Campo label="E-mail" required>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="voce@agencia.com.br"
                  className={ESTILO_INPUT}
                />
              </Campo>

              <Campo label="WhatsApp" required>
                <input
                  required
                  value={form.telefone}
                  onChange={(e) => set("telefone", e.target.value)}
                  placeholder="(47) 99999-9999"
                  className={ESTILO_INPUT}
                />
              </Campo>
            </div>

            <button
              type="submit"
              disabled={status === "enviando"}
              className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-gold px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] text-ink transition-transform duration-300 hover:scale-[1.02] disabled:opacity-60"
            >
              {status === "enviando" ? "Abrindo..." : "Acessar área comercial"}
              <span aria-hidden="true">→</span>
            </button>

            <p className="mt-5 text-center text-[12px] font-light leading-relaxed text-cream/40">
              Seus dados ficam só com a AONIK. Usamos para falar com você sobre a
              parceria, nada além disso.
            </p>
          </motion.form>

          <p className="mt-8 text-center text-[13px] font-light text-cream/50">
            Já é parceiro?{" "}
            <a
              href={PORTAL_AGENCIA}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold underline underline-offset-4 transition-opacity hover:opacity-80"
            >
              Acessar o portal
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}

const ESTILO_INPUT =
  "w-full rounded-xl border border-forest-line/50 bg-forest/40 px-4 py-3.5 text-[15px] font-light text-cream placeholder:text-cream/30 outline-none transition-colors focus:border-gold";

function Campo({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.2em] text-cream/50">
        {label} {required && <span className="text-gold">*</span>}
      </span>
      {children}
    </label>
  );
}
