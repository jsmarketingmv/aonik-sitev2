import { notFound } from "next/navigation"
import Link from "next/link"
import Nav from "../../components/Nav"
import Footer from "../../components/Footer"
import FloatingActions from "../../components/FloatingActions"
import { getEdicao, EDICOES } from "../../lib/news"
import NewsShareBar from "../../components/NewsShareBar"
import type {
  Bloco,
  BlocoTexto,
  BlocoDestaque,
  BlocoDica,
  BlocoPromo,
  BlocoFrase,
} from "../../lib/news"
import type { Metadata } from "next"

export async function generateStaticParams() {
  return EDICOES.map((ed) => ({ slug: ed.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const ed = getEdicao(slug)
  if (!ed) return {}
  return {
    title: `${ed.titulo} | AONIK News Ed. ${ed.numero}`,
    description: ed.subtitulo,
    openGraph: {
      images: ed.hero ? [{ url: ed.hero }] : [],
    },
  }
}

function formatarData(iso: string) {
  const d = new Date(iso + "T12:00:00")
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })
}

// ---- BLOCOS INFORMATIVOS ----

function BlocoTextoComp({ b }: { b: BlocoTexto }) {
  return (
    <div className="py-6 border-b border-[#efe7da]/10">
      {b.titulo && (
        <h2
          className="text-xl md:text-2xl mb-3 text-[#efe7da]"
          style={{ fontFamily: "var(--font-fraunces)" }}
        >
          {b.titulo}
        </h2>
      )}
      <p className="text-[#efe7da]/75 leading-relaxed text-sm md:text-base">{b.conteudo}</p>
    </div>
  )
}

function BlocoDestaqueComp({ b }: { b: BlocoDestaque }) {
  return (
    <div className="py-6 border-b border-[#efe7da]/10">
      <Link
        href={b.href}
        className="group block rounded-xl overflow-hidden border border-[#efe7da]/10 hover:border-[#95c623]/40 transition-colors"
      >
        <div className="relative h-44 overflow-hidden">
          <img
            src={b.img}
            alt={b.titulo}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#002626]/70 to-transparent" />
          {b.badge && (
            <span className="absolute top-3 left-3 text-[10px] font-bold tracking-widest uppercase bg-[#95c623] text-[#002626] px-2 py-1 rounded-full">
              {b.badge}
            </span>
          )}
        </div>
        <div className="p-4 bg-[#0e4749]/50">
          <h3
            className="text-base md:text-lg leading-snug mb-1 group-hover:text-[#95c623] transition-colors"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            {b.titulo}
          </h3>
          <p className="text-xs text-[#efe7da]/60 leading-relaxed mb-3">{b.descricao}</p>
          {b.preco && (
            <p className="text-sm font-semibold text-[#95c623]">{b.preco}</p>
          )}
          <span className="inline-block mt-2 text-xs text-[#efe7da]/50 group-hover:text-[#95c623] transition-colors">
            Saiba mais →
          </span>
        </div>
      </Link>
    </div>
  )
}

function BlocoDicaComp({ b }: { b: BlocoDica }) {
  return (
    <div className="py-6 border-b border-[#efe7da]/10">
      <div className="flex gap-3 items-start">
        <span className="text-2xl mt-0.5 shrink-0">{b.icone}</span>
        <div>
          <h3
            className="text-base font-semibold mb-1 text-[#efe7da]"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            {b.titulo}
          </h3>
          <p className="text-sm text-[#efe7da]/70 leading-relaxed">{b.texto}</p>
        </div>
      </div>
    </div>
  )
}

function BlocoFraseComp({ b }: { b: BlocoFrase }) {
  return (
    <div className="py-8 text-center">
      <blockquote
        className="text-xl md:text-2xl italic text-[#efe7da]/90 leading-snug mb-3"
        style={{ fontFamily: "var(--font-fraunces)" }}
      >
        &ldquo;{b.texto}&rdquo;
      </blockquote>
      {(b.autor || b.local) && (
        <p className="text-xs text-[#efe7da]/40 tracking-wide">
          {b.autor && <span>{b.autor}</span>}
          {b.autor && b.local && " · "}
          {b.local && <span>{b.local}</span>}
        </p>
      )}
    </div>
  )
}

// ---- BLOCO COMERCIAL (promo com escassez) ----

function BlocoPromoComp({ b }: { b: BlocoPromo }) {
  return (
    <div className="py-6 border-b border-[#efe7da]/10">
      <Link
        href={b.href}
        className="group block rounded-xl overflow-hidden border-2 border-[#e55812]/60 hover:border-[#e55812] transition-colors bg-[#e55812]/5"
      >
        {b.img && (
          <div className="relative h-44 overflow-hidden">
            <img
              src={b.img}
              alt={b.titulo}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#002626]/80 to-transparent" />
            {b.urgencia && (
              <span className="absolute top-3 left-3 text-[10px] font-black tracking-wider uppercase bg-[#e55812] text-white px-3 py-1 rounded-full animate-pulse">
                {b.urgencia}
              </span>
            )}
          </div>
        )}
        <div className="p-4">
          <h3
            className="text-lg leading-snug mb-1 text-[#efe7da]"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            {b.titulo}
          </h3>
          {b.subtitulo && (
            <p className="text-xs text-[#efe7da]/60 mb-3">{b.subtitulo}</p>
          )}
          <div className="flex items-baseline gap-3 mb-2">
            {b.precoAntes && (
              <span className="text-sm text-[#efe7da]/40 line-through">{b.precoAntes}</span>
            )}
            <span className="text-2xl font-bold text-[#e55812]">{b.preco}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-xs text-[#efe7da]/50">
              {b.vagas !== undefined && (
                <span className="font-semibold text-[#e55812]">
                  {b.vagas === 1 ? "1 vaga" : `${b.vagas} vagas`} restante{b.vagas !== 1 ? "s" : ""}
                </span>
              )}
              {b.vagas !== undefined && "  ·  "}
              Até {b.validade}
            </div>
            <span className="text-xs text-[#e55812] font-semibold group-hover:underline">
              Quero essa vaga →
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}

// ---- DISPATCHER ----

function RenderBloco({ bloco }: { bloco: Bloco }) {
  switch (bloco.tipo) {
    case "texto":
      return <BlocoTextoComp b={bloco} />
    case "destaque":
      return <BlocoDestaqueComp b={bloco} />
    case "dica":
      return <BlocoDicaComp b={bloco} />
    case "promo":
      return <BlocoPromoComp b={bloco} />
    case "frase":
      return <BlocoFraseComp b={bloco} />
    default:
      return null
  }
}

// ---- PAGE ----

export default async function EdicaoPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const edicao = getEdicao(slug)
  if (!edicao) notFound()

  const isComercial = edicao.tipo === "comercial"

  return (
    <div className="min-h-screen bg-[#002626] text-[#efe7da]">
      <Nav />

      {/* Hero */}
      {edicao.hero && (
        <div className="relative h-56 md:h-72 overflow-hidden">
          <img
            src={edicao.hero}
            alt={edicao.titulo}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#002626] via-[#002626]/50 to-transparent" />
        </div>
      )}

      {/* Header da edição */}
      <div className="max-w-2xl mx-auto px-5">
        <div className={`${edicao.hero ? "-mt-12 relative z-10" : "pt-28"} pb-8`}>
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span
              className={`text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded-full ${
                isComercial
                  ? "bg-[#e55812] text-white"
                  : "bg-[#95c623] text-[#002626]"
              }`}
            >
              {isComercial ? "Promoção" : "Novidades"}
            </span>
            <span className="text-xs text-[#efe7da]/40">
              Ed. {String(edicao.numero).padStart(2, "0")} · {formatarData(edicao.data)}
            </span>
          </div>

          <h1
            className="text-2xl md:text-4xl leading-snug mb-3"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            {edicao.titulo}
          </h1>
          <p className="text-[#efe7da]/60 text-sm md:text-base leading-relaxed">
            {edicao.subtitulo}
          </p>
        </div>

        {/* Linha divisória */}
        <div
          className={`h-px w-full mb-2 ${
            isComercial ? "bg-[#e55812]/30" : "bg-[#95c623]/30"
          }`}
        />

        {/* Blocos de conteúdo */}
        <div className="pb-6">
          {edicao.blocos.map((bloco, i) => (
            <RenderBloco key={i} bloco={bloco} />
          ))}
        </div>

        {/* CTA final */}
        {edicao.cta && (
          <div className="text-center pt-4 pb-2">
            <Link
              href={edicao.cta.href}
              className={`inline-block px-8 py-4 rounded-full font-semibold text-sm tracking-wide transition-all ${
                isComercial
                  ? "bg-[#e55812] text-white hover:bg-[#f08a4e]"
                  : "bg-[#95c623] text-[#002626] hover:bg-[#a8d82e]"
              }`}
            >
              {edicao.cta.texto}
            </Link>
          </div>
        )}

        {/* Compartilhamento */}
        <NewsShareBar
          titulo={edicao.titulo}
          subtitulo={edicao.subtitulo}
          isComercial={isComercial}
        />

        {/* Voltar ao hub */}
        <div className="pb-16 text-center">
          <Link
            href="/news"
            className="text-xs text-[#efe7da]/40 hover:text-[#efe7da]/70 transition-colors"
          >
            ← Todas as edições
          </Link>
        </div>
      </div>

      <Footer />
      <FloatingActions />
    </div>
  )
}
