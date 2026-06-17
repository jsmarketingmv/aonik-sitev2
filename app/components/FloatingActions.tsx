"use client";

import { useState, useEffect, useRef } from "react";
import { AONIK } from "../lib/contato";

type Msg = { role: "user" | "assistant"; text: string; whatsapp?: string | null };

export default function FloatingActions() {
  const [iaOpen, setIaOpen] = useState(false);
  const [slug, setSlug] = useState<string | undefined>(undefined);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const open = (e: Event) => {
      const detail = (e as CustomEvent<{ slug?: string }>).detail;
      if (detail?.slug) setSlug(detail.slug);
      setIaOpen(true);
    };
    window.addEventListener("open-aonikia", open);
    return () => window.removeEventListener("open-aonikia", open);
  }, []);

  /* Mensagem de boas-vindas quando o painel abre pela primeira vez */
  useEffect(() => {
    if (iaOpen && messages.length === 0) {
      setMessages([{
        role: "assistant",
        text: "Olá! Sou a Aonik IA, especialista nesta página. Pergunte sobre roteiro, tarifas, dificuldade, o que levar ou a melhor época!",
      }]);
    }
  }, [iaOpen, messages.length]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text }]);
    setLoading(true);
    try {
      const res = await fetch("/api/aonikia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, slug }),
      });
      const data = await res.json() as { reply?: string; whatsapp?: string | null; error?: string };
      setMessages((m) => [
        ...m,
        { role: "assistant", text: data.reply ?? "Desculpe, ocorreu um erro. Tente novamente.", whatsapp: data.whatsapp },
      ]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", text: "Não consegui responder agora. Tente novamente." }]);
    } finally {
      setLoading(false);
    }
  }

  function close() {
    setIaOpen(false);
    setMessages([]);
    setInput("");
    setSlug(undefined);
  }

  return (
    <>
      {/* Aonik IA — canto inferior esquerdo */}
      <div className="fixed bottom-6 left-6 z-50">
        {iaOpen && (
          <div
            className="absolute bottom-16 left-0 flex flex-col rounded-2xl border border-white/10 bg-[#0c1219] shadow-2xl"
            style={{ width: 320, maxHeight: 480 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
              <p className="font-display text-base text-[#f1ece2]">
                Aonik <strong className="font-bold">IA</strong>
              </p>
              <button onClick={close} aria-label="Fechar" className="text-[#f1ece2]/40 hover:text-[#f1ece2] transition-colors text-lg leading-none">✕</button>
            </div>

            {/* Mensagens */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ minHeight: 200, maxHeight: 300 }}>
              {messages.map((m, i) => (
                <div key={i} className={`flex flex-col gap-1 ${m.role === "user" ? "items-end" : "items-start"}`}>
                  <div
                    className="rounded-xl px-3.5 py-2.5 text-[13px] font-light leading-relaxed"
                    style={{
                      maxWidth: "85%",
                      background: m.role === "user" ? "#bd5e2b" : "rgba(255,255,255,0.06)",
                      color: "#f1ece2",
                    }}
                  >
                    {m.text}
                  </div>
                  {m.whatsapp && (
                    <a
                      href={m.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-opacity hover:opacity-80"
                      style={{ background: "#25D366", color: "#fff" }}
                    >
                      Falar no WhatsApp →
                    </a>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex items-start">
                  <div className="rounded-xl px-3.5 py-2.5 text-[13px]" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(241,236,226,0.5)" }}>
                    digitando...
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="border-t border-white/10 px-4 py-3 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); void send(); } }}
                placeholder="Pergunte sobre este circuito..."
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-[13px] text-[#f1ece2] placeholder-[#f1ece2]/30 outline-none focus:border-[#bd5e2b]/60 transition-colors"
              />
              <button
                onClick={() => { void send(); }}
                disabled={!input.trim() || loading}
                aria-label="Enviar"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[#f1ece2] transition-all disabled:opacity-30"
                style={{ background: "#bd5e2b" }}
              >
                →
              </button>
            </div>

            {/* Fallback WhatsApp */}
            <div className="border-t border-white/10 px-5 py-2.5 flex justify-between items-center">
              <span className="text-[10px] text-[#f1ece2]/30">Fora do escopo?</span>
              <a
                href={`https://wa.me/${AONIK.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#25D366] hover:opacity-80 transition-opacity"
              >
                WhatsApp →
              </a>
            </div>
          </div>
        )}

        <button
          onClick={() => { if (iaOpen) close(); else setIaOpen(true); }}
          className="flex items-center gap-2 rounded-full border border-[#f1ece2]/15 bg-[#0c1219]/90 py-3 pl-3 pr-5 text-[#f1ece2] shadow-xl backdrop-blur transition-transform hover:scale-[1.03]"
          aria-label="Abrir Aonik IA"
        >
          <span className="text-[#bfe34a]">
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
