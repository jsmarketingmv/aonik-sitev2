// Saídas ao vivo: consulta os grupos do SaaS AONIK Operadora pelo slug
// da página de destino, via RPC pública get_saidas_site (só expõe nome,
// datas, selo e vagas). Mesma conexão anônima usada em leads.ts.
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://hbiamcsblfoumrxwzryd.supabase.co";

const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhiaWFtY3NibGZvdW1yeHd6cnlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1NzQxODUsImV4cCI6MjA5MzE1MDE4NX0.VWLYoDqa7AjTB6HMtkJkKi1eMZsaUUZYOlxqso8Yyms";

export type SaidaSite = {
  nome: string;
  data_inicio: string | null;
  data_fim: string | null;
  selo: "saida_a_confirmar" | "saida_confirmada" | "ultimas_vagas" | "vagas_encerradas";
  vagas_max: number | null;
  vagas_restantes: number | null;
};

export type SaidaSiteToda = {
  slug: string;
  data_inicio: string | null;
  data_fim: string | null;
  status: "formando" | "confirmado" | "lotado" | "em_viagem" | "concluido" | "cancelado";
  selo: SaidaSite["selo"];
};

const MESES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

export function parseDataISO(d: string | null): { dia: number; mes: number; ano: number } | null {
  if (!d) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(d);
  if (!m) return null;
  return { ano: Number(m[1]), mes: Number(m[2]) - 1, dia: Number(m[3]) };
}

/** "18 a 31/Ago" (mesmo mês) ou "28/Ago a 04/Set" (meses diferentes). */
export function faixaDatas(inicio: string | null, fim: string | null): string {
  const i = parseDataISO(inicio);
  const f = parseDataISO(fim);
  if (!i) return "";
  const dd = (n: number) => String(n).padStart(2, "0");
  if (!f) return `${dd(i.dia)}/${MESES[i.mes]}`;
  if (i.mes === f.mes) return `${dd(i.dia)} a ${dd(f.dia)}/${MESES[i.mes]}`;
  return `${dd(i.dia)}/${MESES[i.mes]} a ${dd(f.dia)}/${MESES[f.mes]}`;
}

// Retorna [] em qualquer falha: o site cai no conteúdo estático.
export async function buscarTodasSaidasSite(): Promise<SaidaSiteToda[]> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_saidas_site_todas`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
      },
      body: "{}",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

// Retorna [] em qualquer falha: a página cai no fallback estático.
export async function buscarSaidasSite(slug: string): Promise<SaidaSite[]> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_saidas_site`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ p_slug: slug }),
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}
