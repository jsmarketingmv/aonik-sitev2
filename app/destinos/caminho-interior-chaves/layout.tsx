import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Caminho Português Interior desde Chaves",
  description: "10 etapas a pé e 213 km de Chaves a Santiago de Compostela, pelo interior da Galiza. Caminho de Santiago autoguiado, no seu ritmo, com bagagem transportada.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
