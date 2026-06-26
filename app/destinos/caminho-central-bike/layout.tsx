import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Caminho Central de Bike · Santiago",
  description: "O Caminho Português Central de bicicleta, autoguiado, de Coimbra a Santiago de Compostela.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
