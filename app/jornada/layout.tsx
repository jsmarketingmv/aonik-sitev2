import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Caminho de Santiago",
  description: "Peregrinação a Santiago de Compostela. Todas as rotas, todos os perfis — da costa às montanhas.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
