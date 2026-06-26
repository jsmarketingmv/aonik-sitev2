import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Autoguiados",
  description:
    "Todas as viagens autoguiadas da AONIK: Caminho de Santiago, Torres del Paine, Caminhos de Portugal e cicloturismo. Você no ritmo, a gente na logística.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
