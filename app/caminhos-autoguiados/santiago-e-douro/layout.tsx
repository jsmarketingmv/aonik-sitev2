import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Santiago e Douro",
  description:
    "Treze dias unindo o Caminho Português a Santiago de Compostela (121 km) e o Vale do Douro. Da emoção da chegada à Catedral ao silêncio das vinhas, dois patrimônios UNESCO em uma jornada autoguiada. A partir de € 2.200.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
