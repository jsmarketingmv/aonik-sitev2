import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Caminho Português Interior desde Vila Pouca de Aguiar",
  description: "12 etapas a pé e 252 km de Vila Pouca de Aguiar a Santiago de Compostela, pelo interior de Portugal e da Galiza. Autoguiado o ano todo e grupo guiado AONIK em outubro de 2027.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
