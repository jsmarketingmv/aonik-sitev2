import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sarria em 8 Etapas · Caminho de Santiago",
  description: "De Sarria a Santiago em 8 etapas — mais fôlego, mais paisagem, o mesmo destino.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
