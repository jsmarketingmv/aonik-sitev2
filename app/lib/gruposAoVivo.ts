"use client";

// Overlay "ao vivo" do calendário de grupos: o catálogo estático GRUPOS
// (fotos, km, preços) continua sendo a vitrine, mas datas e status são
// substituídos pelos grupos geridos no SaaS quando o produto tem pelo
// menos um grupo com o slug configurado.
//
// Contrato: a PRESENÇA do slug no SaaS é o interruptor por produto.
//  - Nenhum grupo com o slug → datas estáticas (como hoje).
//  - Existem grupos → só as saídas visíveis (formando/confirmado/lotado)
//    aparecem; cancelar/concluir um grupo REMOVE a data do site.

import { useEffect, useState } from "react";
import { GRUPOS, type Grupo } from "./grupos";
import { buscarTodasSaidasSite, faixaDatas, parseDataISO, type SaidaSiteToda } from "./saidas";

const VISIVEIS = new Set(["formando", "confirmado", "lotado"]);

function slugDoGrupo(g: Grupo): string {
  return g.href.replace(/^\/destinos\//, "").replace(/\/+$/, "");
}

export function aplicarSaidasAoVivo(catalogo: Grupo[], saidas: SaidaSiteToda[]): Grupo[] {
  if (saidas.length === 0) return catalogo;
  const porSlug = new Map<string, SaidaSiteToda[]>();
  for (const s of saidas) {
    if (!s.slug) continue;
    const lista = porSlug.get(s.slug) || [];
    lista.push(s);
    porSlug.set(s.slug, lista);
  }
  return catalogo.map((g) => {
    const doProduto = porSlug.get(slugDoGrupo(g));
    if (!doProduto) return g; // sem grupos no SaaS → estático
    const visiveis = doProduto.filter((s) => VISIVEIS.has(s.status));
    const dates2026: string[] = [];
    const dates2027: string[] = [];
    for (const s of visiveis) {
      const ano = parseDataISO(s.data_inicio)?.ano;
      const faixa = faixaDatas(s.data_inicio, s.data_fim);
      if (!ano || !faixa) continue;
      if (ano === 2026) dates2026.push(faixa);
      else if (ano === 2027) dates2027.push(faixa);
    }
    const confirmada = visiveis.some((s) => s.selo !== "saida_a_confirmar");
    return {
      ...g,
      dates2026,
      dates2027,
      status: confirmada ? "confirmada" : "a-confirmar",
    };
  });
}

/** Catálogo de grupos com datas/status ao vivo (estático até a resposta chegar). */
export function useGruposAoVivo(): Grupo[] {
  const [grupos, setGrupos] = useState<Grupo[]>(GRUPOS);
  useEffect(() => {
    let ativo = true;
    buscarTodasSaidasSite().then((saidas) => {
      if (ativo && saidas.length > 0) setGrupos(aplicarSaidasAoVivo(GRUPOS, saidas));
    });
    return () => { ativo = false; };
  }, []);
  return grupos;
}
