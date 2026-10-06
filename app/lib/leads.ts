// Captura de lead do site B2C → tabela `leads` do Supabase do SaaS AONIK Operadora.
// A anon key é pública (a mesma que o bundle do SaaS já expõe) e o RLS da tabela
// `leads` permite INSERT anônimo, pois o próprio site do SaaS grava leads assim.
// Fallback embutido para funcionar mesmo sem env vars configuradas no Vercel.
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://hbiamcsblfoumrxwzryd.supabase.co";

const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhiaWFtY3NibGZvdW1yeHd6cnlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1NzQxODUsImV4cCI6MjA5MzE1MDE4NX0.VWLYoDqa7AjTB6HMtkJkKi1eMZsaUUZYOlxqso8Yyms";

import { origemComoTags } from "./utm";

export type LeadInput = {
  nome: string;
  email: string;
  telefone?: string;
  destino?: string;
  mensagem?: string;
};

/** O banco recusou os dados (validação). Reenviar não adianta. */
class LeadRecusado extends Error {}

/**
 * Entrega o lead ao CRM do Steps, em dois caminhos, para nenhum contato se perder:
 *  1. direto do navegador para o Supabase (caminho de sempre);
 *  2. se a rede ou um bloqueador de terceiros derrubar o 1, pela rota /api/lead
 *     do próprio site, que grava do servidor na mesma tabela.
 * Em ambos o lead nasce com kanban_status "novo", a primeira coluna do CRM.
 */
async function enviarLead(corpo: Record<string, unknown>): Promise<void> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(corpo),
    });
    if (res.ok) return;
    if (res.status >= 400 && res.status < 500) {
      throw new LeadRecusado(`Supabase leads insert recusado: ${res.status} ${await res.text().catch(() => "")}`);
    }
    // 5xx: o banco falhou, vale tentar pelo servidor do site
  } catch (e) {
    if (e instanceof LeadRecusado) throw e;
    // falha de rede ou bloqueio do navegador: tenta pelo servidor do site
  }

  const res = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(corpo),
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`Lead não entregue (direto e /api/lead falharam): ${res.status} ${txt}`);
  }
}

/** Página onde o lead foi preenchido, ex.: "destinos/torres-del-paine-o-circuit". */
function paginaDeOrigem(): string | null {
  if (typeof window === "undefined") return null;
  const p = window.location.pathname.replace(/^\/+|\/+$/g, "");
  return p || "home";
}

// Insere o lead no CRM (kanban) do SaaS. Lança erro se a API recusar,
// para o formulário decidir o que mostrar ao usuário.
export async function gravarLead(lead: LeadInput): Promise<void> {
  const message = lead.mensagem?.trim() || null;

  await enviarLead({
    full_name: lead.nome.trim(),
    email: lead.email.trim() || null,
    phone: lead.telefone?.trim() || null,
    travel_intent: lead.destino?.trim() || null,
    message,
    source: "site-b2c-form",
    origin: "site-b2c",
    kanban_status: "novo",
    // Campanha de origem e página onde converteu. Sem isso não dá pra saber
    // qual anúncio trouxe o lead, só que ele veio do site.
    // `origin` é enum validado por trigger no banco, então não serve pra isso;
    // `tags` é livre e o kanban já mostra no card.
    tags: origemComoTags(),
    program_slug: paginaDeOrigem(),
  });
}

export type LeadAgenciaInput = {
  nome: string;
  agencia: string;
  email: string;
  telefone: string;
};

/**
 * Lead de agência parceira, vindo da porta B2B do site (/parceiros).
 *
 * Cai na MESMA tabela e no mesmo kanban dos leads de viajante, mas marcado
 * com `is_b2b: true` e `origin: "site-b2b"`, que já existiam no banco do SaaS
 * e são valores aceitos pelo trigger `validate_lead_enums`.
 *
 * A tabela não tem coluna para nome da agência, então ele vai em dois lugares
 * de propósito: em `message`, para o vendedor ler no card sem abrir nada, e em
 * `tags`, para dar pra filtrar e agrupar depois.
 */
export async function gravarLeadAgencia(lead: LeadAgenciaInput): Promise<void> {
  const agencia = lead.agencia.trim();

  await enviarLead({
    full_name: lead.nome.trim(),
    email: lead.email.trim(),
    phone: lead.telefone.trim(),
    message: `Agência: ${agencia}`,
    travel_intent: "PARCERIA B2B · quer revender produtos AONIK",
    is_b2b: true,
    source: "site-b2b-parceiros",
    origin: "site-b2b",
    kanban_status: "novo",
    tags: [`agencia:${agencia}`, ...origemComoTags()],
    program_slug: paginaDeOrigem(),
  });
}
