"use client";

import { motion } from "framer-motion";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { EASE } from "../../components/ui";
import { PLANOS, BLOCOS } from "../../lib/parceiros";
import { GRUPOS, type Grupo } from "../../lib/grupos";
import { AONIK, PORTAL_AGENCIA } from "../../lib/contato";

const WA_PARCERIA = `https://wa.me/${AONIK.whatsapp}?text=${encodeURIComponent(
  "Olá! Sou agente de viagens e quero falar sobre a parceria comercial com a AONIK."
)}`;

export default function ParceirosComercial() {
  return (
    <main className="min-h-screen bg-forest text-cream">
      <Nav />

      {/* ===== ABERTURA ===== */}
      <section className="px-6 pb-16 pt-32 md:px-10 md:pt-40">
        <div className="mx-auto max-w-[900px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.4em] text-gold">
              Área comercial · B2B
            </p>
            <h1 className="font-display text-[clamp(2.25rem,5vw,3.75rem)] font-light leading-[1.05] tracking-[-0.02em]">
              Venda natureza de verdade,{" "}
              <span className="italic text-gold">sem operar nada</span>
            </h1>
            <p className="mt-6 max-w-[640px] text-[16px] font-light leading-relaxed text-cream/65">
              A AONIK é operadora de turismo de natureza. Cuidamos do roteiro, da
              hospedagem, dos guias e da operação em campo. Você vende, acompanha
              o cliente e mantém o relacionamento.
            </p>
          </motion.div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#planos" className="inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] text-ink transition-transform duration-300 hover:scale-[1.03]">
              Ver modelos de parceria <span aria-hidden="true">→</span>
            </a>
            <a href="#produtos" className="inline-flex items-center gap-3 rounded-full border border-cream/20 px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:border-gold hover:text-gold">
              Ver o portfólio
            </a>
          </div>
        </div>
      </section>

      {/* ===== MODELOS DE PARCERIA ===== */}
      <section id="planos" className="scroll-mt-24 border-t border-forest-line/30 px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1080px]">
          <Titulo eyebrow="Como trabalhamos juntos" titulo="Dois modelos de parceria" />
          <p className="mx-auto mt-4 max-w-[620px] text-center text-[15px] font-light leading-relaxed text-cream/60">
            A diferença entre eles é quem cuida do dinheiro. O resto da operação
            é nosso nos dois casos.
          </p>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {PLANOS.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
                className="flex flex-col rounded-2xl border border-forest-line/40 bg-forest-soft/30 p-8 md:p-10"
              >
                <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-cream/45">
                  {p.nome}
                </p>
                <p className="mt-3 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-light leading-none text-gold">
                  {p.destaque}
                </p>
                <p className="mt-5 text-[15px] font-light leading-relaxed text-cream/70">
                  {p.resumo}
                </p>

                <p className="mt-6 inline-flex w-fit rounded-full border border-gold/30 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-gold">
                  {p.financeiro}
                </p>

                <ul className="mt-7 space-y-3.5 border-t border-forest-line/30 pt-7">
                  {p.itens.map((item) => (
                    <li key={item} className="flex gap-3 text-[14px] font-light leading-relaxed text-cream/70">
                      <span aria-hidden="true" className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CALENDÁRIO DE GRUPOS ===== */}
      <section id="produtos" className="scroll-mt-24 border-t border-forest-line/30 px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1080px]">
          <Titulo eyebrow="O carro-chefe" titulo="Calendário de grupos" />
          <p className="mx-auto mt-4 max-w-[620px] text-center text-[15px] font-light leading-relaxed text-cream/60">
            Saídas com data marcada e guia AONIK. É o produto mais simples de
            vender: o cliente escolhe a data e o resto já está resolvido.
          </p>

          <div className="mt-14 overflow-hidden rounded-2xl border border-forest-line/40">
            {GRUPOS.map((g, i) => (
              <a
                key={g.id}
                href={g.href}
                className={`flex flex-col gap-3 px-6 py-6 transition-colors hover:bg-forest-soft/40 md:flex-row md:items-center md:justify-between md:px-8 ${
                  i > 0 ? "border-t border-forest-line/30" : ""
                }`}
              >
                <div className="md:max-w-[46%]">
                  <p className="font-display text-[19px] font-light leading-snug">
                    {g.flags} {g.title}
                  </p>
                  <p className="mt-1 text-[13px] font-light text-cream/50">{g.local}</p>
                </div>

                {/* Grid com colunas fixas, não flex-wrap: produtos com muitas
                    datas (Coxilha Rica tem 6) empurravam o selo de status para
                    outra linha e desalinhavam a tabela inteira. */}
                <div className="grid items-start gap-x-6 gap-y-3 md:grid-cols-[minmax(0,1fr)_auto_auto_auto] md:gap-x-8">
                  <Datas g={g} />
                  <Dado rotulo="Duração" valor={g.duration} />
                  <Dado rotulo="Tarifa" valor={g.priceFrom.replace("a partir de ", "")} />
                  <Status status={g.status} />
                </div>
              </a>
            ))}
          </div>

          <p className="mt-5 text-center text-[13px] font-light text-cream/45">
            Tarifas de balcão, por pessoa. A tarifa net ou a comissão é aplicada
            sobre elas, conforme o modelo de parceria.
          </p>
        </div>
      </section>

      {/* ===== BLOCOS DE PORTFÓLIO ===== */}
      {BLOCOS.filter((b) => b.destinos.length > 0).map((bloco) => (
        <section key={bloco.id} className="border-t border-forest-line/30 px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-[1080px]">
            <div className="md:flex md:items-start md:justify-between md:gap-16">
              <div className="md:max-w-[38%]">
                <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
                  {bloco.eyebrow}
                </p>
                <h2 className="mt-3 font-display text-[clamp(1.75rem,3.4vw,2.5rem)] font-light leading-tight">
                  {bloco.titulo}
                </h2>
                <p className="mt-5 text-[15px] font-light leading-relaxed text-cream/65">
                  {bloco.texto}
                </p>
                <a
                  href={bloco.href}
                  className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-gold transition-opacity hover:opacity-80"
                >
                  Ver a seção completa <span aria-hidden="true">→</span>
                </a>
              </div>

              <div className="mt-10 grid flex-1 gap-3 md:mt-0 md:grid-cols-2">
                {bloco.destinos.map((d) => (
                  <a
                    key={d.nome + d.href}
                    href={d.href}
                    className="rounded-xl border border-forest-line/40 px-5 py-4 transition-colors hover:border-gold/50 hover:bg-forest-soft/30"
                  >
                    <p className="text-[15px] font-light">{d.nome}</p>
                    <p className="mt-1 text-[12px] font-light uppercase tracking-[0.12em] text-cream/40">
                      {d.nota}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ===== FECHAMENTO ===== */}
      <section className="border-t border-forest-line/30 px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="font-display text-[clamp(1.75rem,3.6vw,2.75rem)] font-light leading-tight">
            Quer começar a vender?
          </h2>
          <p className="mx-auto mt-5 max-w-[520px] text-[15px] font-light leading-relaxed text-cream/65">
            Fale com a gente para escolher o modelo de parceria, receber as
            tarifas net e agendar o treinamento dos produtos.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <a
              href={WA_PARCERIA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] text-ink transition-transform duration-300 hover:scale-[1.03]"
            >
              Falar no WhatsApp <span aria-hidden="true">→</span>
            </a>
            <a
              href={PORTAL_AGENCIA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-cream/20 px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:border-gold hover:text-gold"
            >
              Já sou parceiro
            </a>
          </div>

          <p className="mt-8 text-[13px] font-light text-cream/45">
            {AONIK.email} · {AONIK.whatsappLabel}
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Titulo({ eyebrow, titulo }: { eyebrow: string; titulo: string }) {
  return (
    <div className="text-center">
      <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">{eyebrow}</p>
      <h2 className="mt-3 font-display text-[clamp(1.85rem,3.6vw,2.75rem)] font-light leading-tight">
        {titulo}
      </h2>
    </div>
  );
}

/** Datas separadas por ano. Sem o ano, "13 a 17/Set" ao lado de "11 a 15/Abr"
 *  não diz se é a temporada que vem ou a seguinte, e o agente precisa disso
 *  para vender. */
function Datas({ g }: { g: Grupo }) {
  const linhas: string[] = [];
  if (g.dates2026?.length) linhas.push(`2026 · ${g.dates2026.join(" · ")}`);
  if (g.dates2027?.length) linhas.push(`2027 · ${g.dates2027.join(" · ")}`);

  return (
    <div className="md:min-w-[210px]">
      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cream/35">Datas</p>
      {linhas.length === 0 ? (
        <p className="mt-0.5 text-[14px] font-light text-cream/50">a definir</p>
      ) : (
        linhas.map((l) => (
          <p key={l} className="mt-0.5 text-[14px] font-light leading-snug">
            {l}
          </p>
        ))
      )}
    </div>
  );
}

function Dado({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div>
      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cream/35">{rotulo}</p>
      <p className="mt-0.5 text-[14px] font-light">{valor}</p>
    </div>
  );
}

const ROTULO_STATUS = {
  confirmada: { texto: "Saída confirmada", cor: "text-gold border-gold/40" },
  "em-formacao": { texto: "Em formação", cor: "text-cream/70 border-cream/25" },
  "a-confirmar": { texto: "A confirmar", cor: "text-cream/45 border-cream/15" },
} as const;

function Status({ status }: { status: keyof typeof ROTULO_STATUS }) {
  const s = ROTULO_STATUS[status];
  return (
    <span className={`rounded-full border px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] ${s.cor}`}>
      {s.texto}
    </span>
  );
}
