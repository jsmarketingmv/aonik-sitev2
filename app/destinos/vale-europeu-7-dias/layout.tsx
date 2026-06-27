import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Circuito Vale Europeu · 7 dias (Completo) · Cicloturismo",
  description:
    "Pedal autoguiado de 7 dias pelo Circuito Vale Europeu Catarinense completo. 319 km da colônia alemã e italiana aos campos altos do planalto. A partir de R$ 4.560.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
