"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DESTINOS_CURADOS } from "../lib/contato";
import { gravarLead } from "../lib/leads";
import { useLang } from "./LanguageProvider";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Contato({ destino = "" }: { destino?: string }) {
  const { t } = useLang();
  const c = t.contato;

  const [form, setForm] = useState({
    nome: "",
    destino,
    email: "",
    telefone: "",
    cidade: "",
    estado: "",
    mensagem: "",
  });

  // idle → sending → done | error
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  );

  function set<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  // O envio grava o lead na tabela `leads` do Supabase do SaaS (CRM/kanban).
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      await gravarLead(form);
      setStatus("done");
    } catch (err) {
      console.error("Falha ao gravar lead", err);
      setStatus("error");
    }
  }

  return (
    <section
      id="contato"
      className="relative scroll-mt-24 bg-cream-deep px-6 py-24 text-ink md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[920px]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mb-12 text-center"
        >
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.4em] text-gold">
            {c.eyebrow}
          </p>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-light leading-[1.05] tracking-[-0.02em] text-forest">
            {c.headPre} <span className="italic text-gold">{c.headWord}</span>
            {c.headPost}
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-[15px] font-light leading-relaxed text-ink/55">
            {c.intro}
          </p>
        </motion.div>

        {status === "done" ? (
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="rounded-2xl border border-ink/10 bg-cream p-10 text-center shadow-[0_30px_80px_-50px_rgba(11,23,17,0.4)] md:p-16"
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-forest text-cream">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-7 w-7"
                aria-hidden="true"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h3 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-light leading-tight text-forest">
              {c.okTitle}
            </h3>
            <p className="mx-auto mt-4 max-w-md text-[15px] font-light leading-relaxed text-ink/60">
              {c.okMsg}
            </p>
          </motion.div>
        ) : (
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          className="rounded-2xl border border-ink/10 bg-cream p-7 shadow-[0_30px_80px_-50px_rgba(11,23,17,0.4)] md:p-10"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <Field label={c.f.nome} required>
              <input
                required
                value={form.nome}
                onChange={(e) => set("nome", e.target.value)}
                placeholder={c.ph.nome}
                className={inputCls}
              />
            </Field>

            <Field label={c.f.interesse} required>
              <select
                required
                value={form.destino}
                onChange={(e) => set("destino", e.target.value)}
                className={`${inputCls} appearance-none`}
              >
                <option value="" disabled>
                  {c.selecione}
                </option>
                {DESTINOS_CURADOS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </Field>

            <Field label={c.f.email} required>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder={c.ph.email}
                className={inputCls}
              />
            </Field>

            <Field label={c.f.telefone} required>
              <input
                required
                value={form.telefone}
                onChange={(e) => set("telefone", e.target.value)}
                placeholder={c.ph.telefone}
                className={inputCls}
              />
            </Field>

            <Field label={c.f.cidade}>
              <input
                value={form.cidade}
                onChange={(e) => set("cidade", e.target.value)}
                placeholder={c.ph.cidade}
                className={inputCls}
              />
            </Field>

            <Field label={c.f.estado}>
              <input
                value={form.estado}
                onChange={(e) => set("estado", e.target.value)}
                placeholder={c.ph.estado}
                className={inputCls}
              />
            </Field>
          </div>

          <div className="mt-6">
            <Field label={c.f.mensagem}>
              <textarea
                value={form.mensagem}
                onChange={(e) => set("mensagem", e.target.value)}
                rows={4}
                placeholder={c.ph.mensagem}
                className={`${inputCls} resize-none`}
              />
            </Field>
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="group mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-forest py-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-cream transition-all duration-300 hover:bg-forest-soft disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "sending" ? c.enviando : c.enviar}
            {status !== "sending" && (
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            )}
          </button>
          {status === "error" && (
            <p className="mt-4 text-center text-[12px] font-medium text-red-600">
              {c.erro}
            </p>
          )}
          <p className="mt-4 text-center text-[12px] text-ink/40">
            {c.disclaimer}
          </p>
        </motion.form>
        )}
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-lg border border-ink/15 bg-cream-deep/40 px-4 py-3 text-[14px] text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-gold focus:bg-cream";

function Field({
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
      <span className="mb-2 block text-[12px] font-medium uppercase tracking-[0.12em] text-ink/55">
        {label}
        {required && <span className="text-gold"> *</span>}
      </span>
      {children}
    </label>
  );
}
