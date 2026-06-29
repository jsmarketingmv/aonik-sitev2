import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "News AONIK — Novidades quinzenais",
  description:
    "Destinos, dicas de temporada e condições especiais. Direto ao ponto, a cada 15 dias.",
  openGraph: {
    title: "News AONIK",
    description:
      "Destinos, dicas de temporada e condições especiais. Direto ao ponto, a cada 15 dias.",
    images: [{ url: "/images/tmb/hero.jpg", width: 1200, height: 630 }],
    type: "website",
  },
}

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
