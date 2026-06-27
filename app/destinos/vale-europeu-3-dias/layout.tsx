import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Circuito Vale Europeu · 3 dias (Parte Baixa) · Cicloturismo",
  description:
    "Pedal autoguiado de 3 dias pelo Vale Europeu Catarinense. Pomerode, pontes cobertas, rios da Mata Atlântica e cultura alemã e italiana. A partir de R$ 2.100.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
