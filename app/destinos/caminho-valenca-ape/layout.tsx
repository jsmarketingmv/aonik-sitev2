import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Caminho de Valença · Santiago",
  description: "De Valença a Santiago de Compostela pelo Caminho Português — a travessia clássica de Portugal à Galícia.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
