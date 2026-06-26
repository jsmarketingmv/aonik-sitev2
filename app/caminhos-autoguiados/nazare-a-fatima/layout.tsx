import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Nazaré a Fátima",
  description:
    "Uma peregrinação a pé pelo coração de Portugal, do oceano das ondas gigantes de Nazaré aos mosteiros de Alcobaça e Batalha, até o Santuário de Fátima. 56 km em 4 etapas. A partir de € 870.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
