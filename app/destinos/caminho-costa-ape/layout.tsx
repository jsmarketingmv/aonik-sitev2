import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Caminho da Costa Portuguesa",
  description: "O Caminho Português da Costa, de Porto a Santiago de Compostela pela beira-mar, 280 km autoguiados.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
