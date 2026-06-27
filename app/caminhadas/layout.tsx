import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Caminhadas",
  description: "Peregrinações, travessias e imersões a pé pelo mundo. Trilhas guiadas e autoguiadas nos Alpes, Patagônia, Caminho de Santiago e muito mais.",
  openGraph: {
    title: "Caminhadas | AONIK",
    description: "Peregrinações, travessias e imersões a pé pelo mundo. Trilhas guiadas e autoguiadas nos Alpes, Patagônia, Caminho de Santiago e muito mais.",
    url: "https://www.aonik.com.br/caminhadas",
    images: [{ url: "/images/grupos/tmb-cume.jpg", width: 1200, height: 630, alt: "Caminhadas AONIK" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
