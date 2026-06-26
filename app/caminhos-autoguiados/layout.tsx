import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Caminhos de Portugal",
  description:
    "Caminhadas autoguiadas pelo melhor de Portugal, das vinhas em socalcos do Vale do Douro à chegada na Catedral de Santiago. Roteiros no seu ritmo, com logística, hospedagens e provas de vinho resolvidos.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
