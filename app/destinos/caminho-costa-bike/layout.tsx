import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Caminho da Costa de Bike",
  description: "O Caminho Português da Costa de bicicleta — do Porto a Santiago de Compostela pela costa atlântica.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
