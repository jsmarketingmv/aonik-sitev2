import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sarria em 7 Etapas · Caminho de Santiago",
  description: "O trecho mínimo para receber o Compostela. De Sarria a Santiago em 7 etapas com a AONIK.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
