import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Caminhos de Portugal",
  description:
    "Caminhadas autoguiadas pelo melhor de Portugal, das vinhas em socalcos do Vale do Douro à chegada na Catedral de Santiago. Roteiros no seu ritmo, com logística, hospedagens e provas de vinho resolvidos.",
  openGraph: {
    title: "Caminhos de Portugal Autoguiados | AONIK",
    description: "Caminhadas autoguiadas pelo melhor de Portugal, das vinhas do Douro à Catedral de Santiago. Logística, hospedagens e provas de vinho resolvidos.",
    url: "https://www.aonik.com.br/caminhos-autoguiados",
    images: [{ url: "/images/grupos/tmb-contemplacao.jpg", width: 1200, height: 630, alt: "Caminhos de Portugal — AONIK" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
