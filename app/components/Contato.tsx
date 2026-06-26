"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AONIK, DESTINOS_CURADOS } from "../lib/contato";
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
            <p className="mx-auto mt-6 max-w-md text-[14px] font-light leading-relaxed text-ink/50">
              {c.okWaCta}
            </p>
            <a
              href={`https://wa.me/${AONIK.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-white transition-opacity hover:opacity-90"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.555 4.121 1.526 5.853L.057 23.571a.75.75 0 0 0 .921.916l5.857-1.533A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.733 9.733 0 0 1-4.964-1.36l-.355-.212-3.68.964.981-3.585-.232-.368A9.72 9.72 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
              </svg>
              WhatsApp
            </a>
            <p className="mt-6 text-[13px] font-medium text-ink/40 uppercase tracking-[0.15em]">
              {c.okAte}
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
