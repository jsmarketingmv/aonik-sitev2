import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Rio Serrano · Patagônia",
  description: "Caminhada autoguiada pelo Rio Serrano, nos arredores do Parque Nacional Torres del Paine. Paisagens cruas da Patagônia Chilena.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
