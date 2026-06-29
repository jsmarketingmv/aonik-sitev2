import Link from "next/link"
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import FloatingActions from "../components/FloatingActions"
import { getEdicoesOrdenadas } from "../lib/news"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AONIK News — Novidades, Dicas e Promoções",
  description:
    "Destinos, dicas de temporada e condições especiais direto da AONIK. Receba a cada 15 dias no WhatsApp.",
}

const TIPO_LABEL: Record<string, string> = {
  informativo: "Novidades",
  comercial: "Promoção",
}

const TIPO_COLOR: Record<string, string> = {
  informativo: "bg-[#95c623] text-[#002626]",
  comercial: "bg-[#e55812] text-white",
}

function formatarData(iso: string) {
  const d = new Date(iso + "T12:00:00")
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })
}

export default function NewsHubPage() {
  const edicoes = getEdicoesOrdenadas()

  return (
    <div className="min-h-screen bg-[#002626] text-[#efe7da]">
      <Nav />

      {/* Header */}
      <section className="pt-28 pb-12 px-5 max-w-2xl mx-auto text-center">
        <span className="inline-block text-xs tracking-widest uppercase text-[#95c623] mb-4 font-medium">
          Quinzenal · Gratuito
        </span>
        <h1
          className="text-4xl md:text-5xl leading-tight mb-4"
          style={{ fontFamily: "var(--font-fraunces)" }}
        >
          AONIK News
        </h1>
        <p className="text-[#efe7da]/70 text-base md:text-lg leading-relaxed">
          Destinos, dicas de temporada e condições especiais. Enviamos a cada 15 dias
          pelo WhatsApp, sem enrolação.
        </p>
      </section>

      {/* Lista de edições */}
      <section className="px-5 pb-20 max-w-2xl mx-auto">
        {edicoes.length === 0 ? (
          <p className="text-center text-[#efe7da]/50 py-16">
            Nenhuma edição publicada ainda.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {edicoes.map((ed) => (
              <Link
                key={ed.slug}
                href={`/news/${ed.slug}`}
                className="group block rounded-2xl overflow-hidden border border-[#efe7da]/10 hover:border-[#efe7da]/30 transition-colors"
              >
                {ed.hero && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={ed.hero}
                      alt={ed.titulo}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#002626]/80 to-transparent" />
                    <span
                      className={`absolute top-3 left-3 text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded-full ${
                        TIPO_COLOR[ed.tipo]
                      }`}
                    >
                      {TIPO_LABEL[ed.tipo]}
                    </span>
                    <span className="absolute top-3 right-3 text-[10px] text-[#efe7da]/60 font-medium">
                      Ed. {String(ed.numero).padStart(2, "0")}
                    </span>
                  </div>
                )}
                <div className="p-5 bg-[#0e4749]/40">
                  <p className="text-xs text-[#efe7da]/50 mb-2">{formatarData(ed.data)}</p>
                  <h2
                    className="text-lg leading-snug mb-1 group-hover:text-[#95c623] transition-colors"
                    style={{ fontFamily: "var(--font-fraunces)" }}
                  >
                    {ed.titulo}
                  </h2>
                  <p className="text-sm text-[#efe7da]/60 leading-relaxed line-clamp-2">
                    {ed.subtitulo}
                  </p>
                  <span className="inline-block mt-3 text-xs text-[#95c623] font-medium">
                    Ler edição →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />
      <FloatingActions />
    </div>
  )
}
