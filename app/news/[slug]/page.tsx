"use client";

import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import FloatingActions from "../../components/FloatingActions";
import NewsShareBar from "../../components/NewsShareBar";
import { getEdicao } from "../../lib/news";
import type {
  Bloco,
  BlocoTexto,
  BlocoDestaque,
  BlocoDica,
  BlocoPromo,
  BlocoFrase,
  BlocoBanner,
} from "../../lib/news";

const EASE = [0.16, 1, 0.3, 1] as const;

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function formatEdition(numero: number, iso: string) {
  const d = new Date(iso + "T12:00:00");
  const mes = d.toLocaleDateString("pt-BR", { month: "long" });
  const ano = d.getFullYear();
  return `Ed. ${String(numero).padStart(2, "0")} / ${mes.charAt(0).toUpperCase() + mes.slice(1)} ${ano}`;
}

// ── BLOCOS ──────────────────────────────────────────────────

function BlocoTextoComp({ b }: { b: BlocoTexto }) {
  return (
    <Reveal className="border-b border-ink/10 py-12">
      {b.titulo && (
        <h2 className="font-display mb-5 text-[clamp(1.4rem,2.6vw,2rem)] font-light leading-[1.1] tracking-[-0.01em] text-forest">
          {b.titulo}
        </h2>
      )}
      <p className="max-w-2xl text-[15px] font-light leading-relaxed text-ink/65">
        {b.conteudo}
      </p>
    </Reveal>
  );
}

function BlocoDestaqueComp({
  b,
  reverse,
}: {
  b: BlocoDestaque;
  reverse: boolean;
}) {
  return (
    <Reveal className="border-b border-ink/10 py-12">
      <Link
        href={b.href}
        className="group grid items-center gap-8 md:grid-cols-2 md:gap-12"
      >
        {/* Imagem */}
        <div
          className={`relative h-[220px] overflow-hidden rounded-xl md:h-[320px] ${
            reverse ? "md:order-2" : ""
          }`}
        >
          <div
            className="absolute inset-0 scale-105 bg-cover bg-center transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100"
            style={{ backgroundImage: `url('${b.img}')` }}
          />
          {b.badge && (
            <span className="absolute left-4 top-4 rounded-full bg-neon px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink">
              {b.badge}
            </span>
          )}
        </div>

        {/* Texto */}
        <div className={reverse ? "md:order-1" : ""}>
          {b.badge && (
            <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
              <span className="h-px w-8 bg-gold/50" />
              {b.badge}
            </p>
          )}
          <h3 className="font-display text-[clamp(1.3rem,2.2vw,1.75rem)] font-light leading-[1.06] tracking-[-0.01em] text-forest transition-colors duration-300 group-hover:text-gold">
            {b.titulo}
          </h3>
          <p className="mt-3 text-[14px] font-light leading-relaxed text-ink/60">
            {b.descricao}
          </p>
          {b.preco && (
            <p className="mt-4 text-[13px] font-semibold text-gold">
              {b.preco}
            </p>
          )}
          <span className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-forest/50 transition-colors duration-300 group-hover:text-gold">
            Saiba mais
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

function BlocoDicaComp({ b }: { b: BlocoDica }) {
  return (
    <Reveal className="border-b border-ink/10 py-10">
      <div className="flex gap-6">
        <span className="mt-1 shrink-0 text-2xl">{b.icone}</span>
        <div>
          <p className="mb-2 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
            <span className="h-px w-6 bg-gold/50" />
            Dica
          </p>
          <h3 className="font-display mb-2 text-[1.1rem] font-light leading-snug tracking-[-0.01em] text-forest">
            {b.titulo}
          </h3>
          <p className="text-[14px] font-light leading-relaxed text-ink/60">
            {b.texto}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

function BlocoFraseComp({ b }: { b: BlocoFrase }) {
  return (
    <Reveal className="py-14 text-center">
      <blockquote className="font-display mx-auto max-w-2xl text-[clamp(1.4rem,2.8vw,2.2rem)] font-light italic leading-[1.2] tracking-[-0.01em] text-forest">
        &ldquo;{b.texto}&rdquo;
      </blockquote>
      {(b.autor || b.local) && (
        <p className="mt-5 text-[12px] font-medium uppercase tracking-[0.22em] text-ink/35">
          {b.autor && <span>{b.autor}</span>}
          {b.autor && b.local && " · "}
          {b.local && <span>{b.local}</span>}
        </p>
      )}
    </Reveal>
  );
}

// Bloco comercial — permanece no dark (forest)
function BlocoPromoComp({ b }: { b: BlocoPromo }) {
  return (
    <div className="border-b border-cream/10 py-10">
      <Link href={b.href} className="group block">
        {b.img && (
          <div className="relative mb-6 h-[200px] overflow-hidden rounded-xl md:h-[280px]">
            <div
              className="absolute inset-0 scale-105 bg-cover bg-center transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100"
              style={{ backgroundImage: `url('${b.img}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/80 to-transparent" />
            {b.urgencia && (
              <span className="absolute left-4 top-4 rounded-full bg-gold px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-ink">
                {b.urgencia}
              </span>
            )}
          </div>
        )}

        <p className="mb-3 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
          <span className="h-px w-8 bg-gold/50" />
          Condição especial
        </p>
        <h3 className="font-display text-[clamp(1.4rem,2.8vw,2.2rem)] font-light leading-[1.05] tracking-[-0.01em] text-cream transition-colors duration-300 group-hover:text-gold">
          {b.titulo}
        </h3>
        {b.subtitulo && (
          <p className="mt-2 text-[14px] font-light text-cream/55">{b.subtitulo}</p>
        )}

        <div className="mt-5 flex items-baseline gap-4">
          {b.precoAntes && (
            <span className="text-[15px] font-light text-cream/35 line-through">
              {b.precoAntes}
            </span>
          )}
          <span className="font-display text-[2rem] font-light tracking-[-0.02em] text-gold">
            {b.preco}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-[12px] font-light text-cream/45">
          {b.vagas !== undefined && (
            <span className="font-semibold text-gold">
              {b.vagas === 1 ? "1 vaga" : `${b.vagas} vagas`} restante{b.vagas !== 1 ? "s" : ""}
            </span>
          )}
          <span>Até {b.validade}</span>
        </div>

        <span className="mt-7 inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] text-ink transition-transform duration-300 group-hover:scale-[1.03]">
          Quero essa vaga
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </Link>
    </div>
  );
}

// Banner — ruptura visual na linha de leitura
// Sai da coluna de conteúdo (negative margins), altura de impacto, display Fraunces
function BlocoBannerComp({ b }: { b: BlocoBanner }) {
  return (
    <Reveal className="-mx-6 md:-mx-10 my-4 border-y border-ink/10">
      <Link href={b.href} className="group block overflow-hidden">
        <div className="relative min-h-[360px] overflow-hidden md:min-h-[460px]">

          {/* Imagem de fundo */}
          {b.img && (
            <div
              className="absolute inset-0 scale-105 bg-cover bg-center transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100"
              style={{ backgroundImage: `url('${b.img}')` }}
            />
          )}

          {/* Gradiente — forte embaixo para texto, suave em cima */}
          <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/55 to-forest/10" />
          {/* Véu lateral para unir com paleta */}
          <div className="absolute inset-0 bg-forest/15" />

          {/* Conteúdo — ancorado no rodapé da imagem */}
          <div className="relative z-10 flex h-full min-h-[360px] flex-col justify-end px-8 pb-10 md:min-h-[460px] md:px-14 md:pb-14">
            {b.badge && (
              <p className="mb-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
                <span className="h-px w-8 bg-gold/50" />
                {b.badge}
              </p>
            )}

            <h3 className="font-display text-balance max-w-2xl text-[clamp(2rem,5vw,3.8rem)] font-light leading-[0.97] tracking-[-0.02em] text-cream transition-colors duration-500 group-hover:text-gold">
              {b.titulo}
            </h3>

            {b.descricao && (
              <p className="mt-4 max-w-lg text-[14px] font-light leading-relaxed text-cream/60">
                {b.descricao}
              </p>
            )}

            <span className="mt-8 inline-flex w-fit items-center gap-3 rounded-full border border-cream/30 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-cream transition-all duration-300 group-hover:border-gold group-hover:text-gold">
              {b.cta ?? "Saiba mais"}
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  )
}

// ── DISPATCHER ──────────────────────────────────────────────

function RenderBloco({
  bloco,
  index,
  isComercial,
}: {
  bloco: Bloco;
  index: number;
  isComercial: boolean;
}) {
  switch (bloco.tipo) {
    case "texto":
      return <BlocoTextoComp b={bloco} />;
    case "destaque":
      return <BlocoDestaqueComp b={bloco} reverse={index % 2 === 1} />;
    case "dica":
      return <BlocoDicaComp b={bloco} />;
    case "promo":
      return <BlocoPromoComp b={bloco} />;
    case "frase":
      return <BlocoFraseComp b={bloco} />;
    case "banner":
      return <BlocoBannerComp b={bloco} />;
    default:
      return null;
  }
}

// ── PAGE ────────────────────────────────────────────────────

export default function EdicaoPage() {
  const params = useParams<{ slug: string }>();
  const edicao = getEdicao(params.slug);
  if (!edicao) return notFound();

  const isComercial = edicao.tipo === "comercial";

  // Separa blocos promo (ficam no dark) dos demais (cream)
  const temPromo = edicao.blocos.some((b) => b.tipo === "promo");

  return (
    <div className="min-h-screen bg-forest text-cream">
      <Nav />

      {/* ── HERO ── */}
      <section className="grain relative min-h-[55vh] overflow-hidden">
        {/* Imagem de fundo */}
        {edicao.hero && (
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${edicao.hero}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-forest/50 via-forest/30 to-forest" />
            <div className="absolute inset-0 bg-forest/15" />
          </div>
        )}

        <div className="relative z-10 mx-auto flex min-h-[55vh] max-w-[1180px] flex-col justify-end px-6 pb-16 pt-36 md:px-10 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
          >
            <p className="mb-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
              <span className="h-px w-8 bg-gold/50" />
              {formatEdition(edicao.numero, edicao.data)} ·{" "}
              {isComercial ? "Condição especial" : "Novidades & Destinos"}
            </p>
            <h1 className="font-display max-w-3xl text-[clamp(2.2rem,5.5vw,4.5rem)] font-light leading-[0.97] tracking-[-0.02em] text-cream">
              {edicao.titulo}
            </h1>
            <p className="mt-6 max-w-xl text-[15px] font-light leading-relaxed text-cream/60">
              {edicao.subtitulo}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CONTEÚDO ── */}
      {isComercial ? (
        // TEMPLATE COMERCIAL — mantém dark forest
        <section className="mx-auto max-w-[780px] px-6 pb-16 md:px-10">
          {edicao.blocos.map((bloco, i) => (
            <RenderBloco key={i} bloco={bloco} index={i} isComercial={true} />
          ))}
        </section>
      ) : (
        // TEMPLATE INFORMATIVO — troca para cream (como o site)
        <section className="bg-cream text-ink">
          <div className="mx-auto max-w-[780px] px-6 pb-6 md:px-10">
            {edicao.blocos.map((bloco, i) => (
              <RenderBloco key={i} bloco={bloco} index={i} isComercial={false} />
            ))}
          </div>

          {/* CTA + voltar — dentro da seção clara */}
          <div className="border-t border-ink/10 px-6 py-16 text-center md:px-10">
            {edicao.cta && (
              <>
                <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.28em] text-ink/40">
                  Pronto para viver isso?
                </p>
                <h2 className="font-display mb-8 text-[clamp(1.4rem,2.6vw,2rem)] font-light text-forest">
                  Explore todos os{" "}
                  <span className="italic text-gold">destinos AONIK</span>
                </h2>
                <Link
                  href={edicao.cta.href}
                  className="group inline-flex items-center gap-3 rounded-full bg-forest px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] text-cream transition-transform duration-300 hover:scale-[1.03]"
                >
                  {edicao.cta.texto}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </>
            )}
            <div className="mt-12">
              <Link
                href="/news"
                className="text-[12px] font-medium uppercase tracking-[0.2em] text-ink/35 transition-colors duration-300 hover:text-ink/70"
              >
                ← Todas as edições
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA comercial */}
      {isComercial && (
        <div className="border-t border-cream/10 px-6 py-16 text-center md:px-10">
          {edicao.cta && (
            <Link
              href={edicao.cta.href}
              className="group inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] text-ink transition-transform duration-300 hover:scale-[1.03]"
            >
              {edicao.cta.texto}
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          )}
          <div className="mt-12">
            <Link
              href="/news"
              className="text-[12px] font-medium uppercase tracking-[0.2em] text-cream/35 transition-colors duration-300 hover:text-cream/70"
            >
              ← Todas as edições
            </Link>
          </div>
        </div>
      )}

      {/* ── COMPARTILHAR ── */}
      <NewsShareBar
        titulo={edicao.titulo}
        subtitulo={edicao.subtitulo}
        isComercial={isComercial}
      />

      <Footer />
      <FloatingActions />
    </div>
  );
}
