import { NextRequest, NextResponse } from "next/server";

/*
  Segundo caminho de entrega dos leads do site para o CRM do Steps.

  O formulário grava direto no Supabase a partir do navegador (app/lib/leads.ts).
  Se a rede ou um bloqueador de terceiros derrubar essa chamada, o formulário cai
  aqui e o servidor do site grava na MESMA tabela `leads`, com a mesma chave pública
  e as mesmas regras de RLS. Nada de chave nova, nada de acesso a mais.

  O corpo vem do navegador, então é tratado como não confiável: só campos conhecidos
  passam, com os mesmos limites do banco, e o lead SEMPRE nasce em "novo".
*/

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://hbiamcsblfoumrxwzryd.supabase.co";

const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhiaWFtY3NibGZvdW1yeHd6cnlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1NzQxODUsImV4cCI6MjA5MzE1MDE4NX0.VWLYoDqa7AjTB6HMtkJkKi1eMZsaUUZYOlxqso8Yyms";

const EMAIL = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const ORIGENS = new Set(["site-b2c", "site-b2b"]);

function texto(v: unknown, max: number): string | null {
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t ? t.slice(0, max) : null;
}

export async function POST(req: NextRequest) {
  let corpo: Record<string, unknown>;
  try {
    corpo = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }
  if (!corpo || typeof corpo !== "object") {
    return NextResponse.json({ error: "Corpo inválido" }, { status: 400 });
  }

  const nome = texto(corpo.full_name, 120);
  const email = texto(corpo.email, 200);
  const origin = typeof corpo.origin === "string" && ORIGENS.has(corpo.origin) ? corpo.origin : "site-b2c";

  if (!nome || nome.length < 2) {
    return NextResponse.json({ error: "Nome inválido" }, { status: 400 });
  }
  if (email && !EMAIL.test(email)) {
    return NextResponse.json({ error: "E-mail inválido" }, { status: 400 });
  }

  const tags = Array.isArray(corpo.tags)
    ? corpo.tags.filter((t): t is string => typeof t === "string").slice(0, 20).map((t) => t.slice(0, 160))
    : [];

  const lead = {
    full_name: nome,
    email,
    phone: texto(corpo.phone, 40),
    travel_intent: texto(corpo.travel_intent, 300),
    message: texto(corpo.message, 2000),
    source: origin === "site-b2b" ? "site-b2b-parceiros" : "site-b2c-form",
    origin,
    is_b2b: origin === "site-b2b",
    kanban_status: "novo",
    tags,
    program_slug: texto(corpo.program_slug, 200),
  };

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(lead),
    });
    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      console.error("Lead recusado pelo Supabase", res.status, txt);
      return NextResponse.json({ error: "Não foi possível registrar" }, { status: res.status >= 500 ? 502 : 400 });
    }
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("Falha ao gravar lead pelo servidor", err);
    return NextResponse.json({ error: "Serviço indisponível" }, { status: 502 });
  }
}
