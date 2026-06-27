import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Caminho de Santiago",
  description: "Peregrinação a Santiago de Compostela. Todas as rotas, todos os perfis — da costa às montanhas.",
  openGraph: {
    title: "Caminho de Santiago | AONIK",
    description: "Peregrinação a Santiago de Compostela. Todas as rotas, todos os perfis, da costa às montanhas.",
    url: "https://www.aonik.com.br/jornada",
    images: [{ url: "/images/grupos/tmb-contemplacao.jpg", width: 1200, height: 630, alt: "Caminho de Santiago — AONIK" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
