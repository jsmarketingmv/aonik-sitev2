import type { Metadata } from "next"
import { getEdicao } from "../../lib/news"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const edicao = getEdicao(slug)
  if (!edicao) return {}

  return {
    title: `${edicao.titulo} — News AONIK`,
    description: edicao.subtitulo,
    openGraph: {
      title: edicao.titulo,
      description: edicao.subtitulo,
      images: edicao.hero ? [{ url: edicao.hero, width: 1200, height: 630 }] : [],
      type: "article",
    },
  }
}

export default function EdicaoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
