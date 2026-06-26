import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Caminho Easy · Santiago em 5 dias",
  description: "Os últimos 100 km do Caminho Português — a forma mais acessível de chegar a Santiago e receber o Compostela.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
