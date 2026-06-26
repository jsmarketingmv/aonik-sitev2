import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Bike Porto a Lisboa",
  description: "306 km pela costa atlântica portuguesa de bicicleta. De Porto até Óbidos, autoguiado, em 8 dias.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
