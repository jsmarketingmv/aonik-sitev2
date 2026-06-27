// Captura de lead do site B2C → tabela `leads` do Supabase do SaaS AONIK Operadora.
// A anon key é pública (a mesma que o bundle do SaaS já expõe) e o RLS da tabela
// `leads` permite INSERT anônimo, pois o próprio site do SaaS grava leads assim.
// Fallback embutido para funcionar mesmo sem env vars configuradas no Vercel.
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://hbiamcsblfoumrxwzryd.supabase.co";

const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhiaWFtY3NibGZvdW1yeHd6cnlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1NzQxODUsImV4cCI6MjA5MzE1MDE4NX0.VWLYoDqa7AjTB6HMtkJkKi1eMZsaUUZYOlxqso8Yyms";

export type LeadInput = {
  nome: string;
  email: string;
  telefone?: string;
  destino?: string;
  mensagem?: string;
};

// Insere o lead no CRM (kanban) do SaaS. Lança erro se a API recusar,
// para o formulário decidir o que mostrar ao usuário.
export async function gravarLead(lead: LeadInput): Promise<void> {
  const message = lead.mensagem?.trim() || null;

  const res = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      full_name: lead.nome.trim(),
      email: lead.email.trim() || null,
      phone: lead.telefone?.trim() || null,
      travel_intent: lead.destino?.trim() || null,
      message,
      source: "site-b2c-form",
      origin: "site-b2c",
      kanban_status: "novo",
    }),
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`Supabase leads insert falhou: ${res.status} ${txt}`);
  }
}
