import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const WA = "5547988047422";

/* Base de conhecimento por slug de produto */
const KB: Record<string, string> = {
  "w-tradicional": `
Você é a Aonik IA, especialista EXCLUSIVO no Circuito W Tradicional de Torres del Paine.
Responda SOMENTE perguntas relacionadas a este programa.
Para qualquer outro assunto, informe: "Esse assunto vai além do meu escopo aqui. Te levo ao WhatsApp do time AONIK!"

PRODUTO: Circuito W Tradicional · autoguiado · 5 dias / 4 noites (extensível 6-7 dias)
DISTÂNCIA: 75,5 km pelos três vales do circuito W

ROTEIRO:
- Dia 1: Puerto Natales → Torres del Paine, Setor Central
- Dia 2: Mirante Base Torres (19,5 km, +750 m, 8-10h)
- Dia 3: Setor Cuernos (13,5 km, +80 m, 4,5-6,5h)
- Dia 4: Vale do Francés (20,5 km, +712 m, 8-10h) → Paine Grande
- Dia 5: Glaciar Grey + catamarã Pehoé + retorno (31,5 km, 8-10h)

TARIFAS (Temporada 2026/2027 · por pessoa · USD):
Camping (base 2 pax): U$ 1.874 | Suplemento single: U$ 1.874 | Jantares festivos: U$ 71
Refúgio (simples): U$ 2.366 | Jantares festivos: U$ 71
Hotel + Refúgio (base 2 pax): U$ 3.006 | Suplemento single: U$ 3.000 | Jantares festivos: U$ 71
Jantares festivos: períodos 24/12 e 31/12

EARLY BOOKING (válido até 31/07/2027):
- À vista: 10% OFF — PIX/transferência, quitação imediata
- Parcelado: 5% OFF — 30% entrada + até 7x sem juros no cartão
- 10x sem juros — sem desconto adicional

INCLUI (por perfil):
Camping: welcome drink/setor, todas as refeições (jantar no Dia 1), camping full equipado (barraca, saco de dormir, colchão alta densidade, travesseiro, banheiros com chuveiro quente), welcome kit (garrafa, liner, toalha), catamarã Pehoé, entrada do parque, ônibus regular Puerto Natales ↔ parque ida e volta.
Refúgio: welcome drink/setor, todas as refeições, cama quarto compartilhado 6-8 camas, saco de dormir, banheiros água quente, welcome kit, catamarã, entrada, ônibus.
Hotel + Refúgio: welcome drink/setor, 2 noites Hotel Las Torres (Setor Central) + noites em refúgios na rota, saco de dormir, banheiros com chuveiro quente, todas as refeições, welcome kit, catamarã, entrada, ônibus.

NÃO INCLUI: guia, voos, transfers além dos mencionados, seguro de viagem, equipamento extra, gorjetas, jantares festivos 24/12 e 31/12.

AVISOS IMPORTANTES:
- Valores em USD; conversão para BRL pelo dólar turismo no dia do fechamento.
- Validação de disponibilidade: 48h-72h (demanda extremamente alta).
- Parque Nacional: top 10 mais visitados do mundo, capacidade limitada por temporada.
- Fechamentos e alterações de datas por clima são responsabilidade do Parque Nacional (força maior).

Responda em português brasileiro, de forma amigável, clara e concisa. Máximo 3 parágrafos.
Se não souber algo específico, diga que vai confirmar com a equipe AONIK.
`.trim(),
};

/* Mensagem padrão de fora do escopo */
const OFF_SCOPE = "Esse assunto vai além do meu escopo aqui. Te levo ao WhatsApp do time AONIK!";

export async function POST(req: NextRequest) {
  try {
    const { message, slug } = (await req.json()) as { message?: string; slug?: string };

    if (!message?.trim()) {
      return NextResponse.json({ error: "Mensagem obrigatória" }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Serviço temporariamente indisponível" }, { status: 503 });
    }

    const system = slug ? KB[slug] : undefined;

    /* Sem KB para este slug → redireciona direto para WhatsApp */
    if (!system) {
      return NextResponse.json({ reply: OFF_SCOPE, whatsapp: `https://wa.me/${WA}` });
    }

    const client = new Anthropic({ apiKey });

    const msg = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 512,
      system,
      messages: [{ role: "user", content: message }],
    });

    const reply = msg.content[0].type === "text" ? msg.content[0].text : OFF_SCOPE;

    /* Se o modelo sinalizou fora do escopo */
    const isOffScope = reply.includes("WhatsApp do time AONIK");
    return NextResponse.json({
      reply,
      whatsapp: isOffScope ? `https://wa.me/${WA}` : null,
    });
  } catch (err) {
    console.error("[aonikia]", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
