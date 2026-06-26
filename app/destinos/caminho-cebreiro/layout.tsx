import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Caminho Francês pelo Cebreiro",
  description: "O Caminho Francês a partir do Cebreiro, os últimos 170 km até Santiago de Compostela pelas montanhas da Galícia.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
