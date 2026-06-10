"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AONIK, DESTINOS_CURADOS } from "../lib/contato";
import { useLang } from "./LanguageProvider";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Contato() {
  const { t } = useLang();
  const c = t.contato;

  const [form, setForm] = useState({
    nome: "",
    destino: "",
    email: "",
    telefone: "",
    cidade: "",
    estado: "",
    mensagem: "",
  });

  function set<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  // Por ora, o envio monta uma mensagem e abre o WhatsApp da AONIK.
  // (Próxima etapa: gravar lead na tabela `leads` do Supabase do SaaS.)
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const texto = [
      c.waIntro,
      `• ${c.f.nome}: ${form.nome}`,
      form.destino ? `• ${c.f.interesse}: ${form.destino}` : "",
      form.cidade || form.estado
        ? `• ${[form.cidade, form.estado].filter(Boolean).join(" / ")}`
        : "",
      form.email ? `• ${c.f.email}: ${form.email}` : "",
      form.mensagem ? `\n${form.mensagem}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    window.open(
      `https://wa.me/${AONIK.whatsapp}?text=${encodeURIComponent(texto)}`,
      "_blank"
    );
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
            className="group mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-forest py-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-cream transition-all duration-300 hover:bg-forest-soft"
          >
            {c.enviar}
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
          <p className="mt-4 text-center text-[12px] text-ink/40">
            {c.disclaimer}
          </p>
        </motion.form>
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
