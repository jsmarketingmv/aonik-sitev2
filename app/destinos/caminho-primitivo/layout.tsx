import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Caminho Primitivo · O mais antigo",
  description: "O mais antigo de todos os Caminhos — o Primitivo, de Oviedo a Santiago de Compostela pelas montanhas das Astúrias.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
