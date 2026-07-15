"use client";

import { useEffect, useState, type ReactNode } from "react";
import { buscarSaidasSite, faixaDatas, parseDataISO, type SaidaSite } from "../lib/saidas";

/*
  Saídas ao vivo, alimentadas pela gestão de Grupos do SaaS AONIK.
  Enquanto não há dados (ou se a consulta falhar), renderiza o
  `fallback` — o bloco estático que a página sempre teve. Cores vêm
  da paleta de cada destino para preservar a identidade da página.
*/

const SELO_LABEL: Record<SaidaSite["selo"], string> = {
  saida_confirmada: "Saída confirmada",
  saida_a_confirmar: "Saída a confirmar",
  ultimas_vagas: "Últimas vagas",
  vagas_encerradas: "Vagas encerradas",
};

export type SaidasGrupoCores = {
  /** Cor do ano (título do card). */
  ano: string;
  /** Cor do selo "confirmada" (verde da paleta do destino). */
  confirmada: string;
  /** Cor de alerta/escassez (laranja/terracota da paleta). */
  alerta: string;
  /** Cor do texto principal. */
  texto: string;
};

export default function SaidasGrupo({ slug, cores, fallback }: {
  slug: string;
  cores: SaidasGrupoCores;
  fallback: ReactNode;
}) {
  const [saidas, setSaidas] = useState<SaidaSite[] | null>(null);

  useEffect(() => {
    let ativo = true;
    buscarSaidasSite(slug).then((data) => { if (ativo) setSaidas(data); });
    return () => { ativo = false; };
  }, [slug]);

  if (!saidas || saidas.length === 0) return <>{fallback}</>;

  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2">
      {saidas.map((s, idx) => {
        const ano = parseDataISO(s.data_inicio)?.ano;
        const encerrada = s.selo === "vagas_encerradas";
        const ultimas = s.selo === "ultimas_vagas";
        const confirmada = s.selo === "saida_confirmada";
        const seloCor = encerrada
          ? "rgba(238,243,246,0.45)"
          : ultimas ? cores.alerta
          : confirmada ? cores.confirmada
          : "rgba(238,243,246,0.6)";
        const mostrarBarra = s.vagas_restantes !== null && !!s.vagas_max;
        const ocupadas = mostrarBarra ? Math.min(s.vagas_max!, s.vagas_max! - s.vagas_restantes!) : 0;
        const pctOcupada = mostrarBarra ? (ocupadas / s.vagas_max!) * 100 : 0;
        const barraCor = encerrada ? "rgba(238,243,246,0.35)" : pctOcupada >= 75 ? cores.alerta : cores.confirmada;

        return (
          <div key={idx} className="rounded-xl border border-white/10 bg-white/5 p-7" style={{ opacity: encerrada ? 0.75 : 1 }}>
            <p className="font-display text-3xl font-light" style={{ color: cores.ano }}>{ano ?? s.nome}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span
                className="rounded-full border border-white/15 px-4 py-1.5 text-[13px] font-medium"
                style={{ color: cores.texto, textDecoration: encerrada ? "line-through" : "none" }}
              >
                {faixaDatas(s.data_inicio, s.data_fim) || s.nome}
              </span>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <span
                className={`h-1.5 w-1.5 rounded-full ${encerrada ? "" : "animate-pulse"}`}
                style={{ background: seloCor }}
              />
              <p className="text-[12px] font-semibold uppercase tracking-[0.12em]" style={{ color: seloCor }}>
                {ultimas && s.vagas_restantes !== null
                  ? `Últimas ${s.vagas_restantes} vaga${s.vagas_restantes === 1 ? "" : "s"}`
                  : SELO_LABEL[s.selo]}
              </p>
            </div>

            {mostrarBarra && !encerrada && (
              <div className="mt-4">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${pctOcupada}%`, background: barraCor }}
                  />
                </div>
                <p className="mt-1.5 text-[11px] font-light" style={{ color: "rgba(238,243,246,0.55)" }}>
                  {s.vagas_restantes} de {s.vagas_max} vagas disponíveis
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
