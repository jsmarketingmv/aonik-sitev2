import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Autoguiados",
  description:
    "Todas as viagens autoguiadas da AONIK: Caminho de Santiago, Torres del Paine, Caminhos de Portugal e cicloturismo. Você no ritmo, a gente na logística.",
  openGraph: {
    title: "Viagens Autoguiadas | AONIK",
    description: "Todas as viagens autoguiadas da AONIK: Caminho de Santiago, Torres del Paine, Caminhos de Portugal e cicloturismo. Você no ritmo, a gente na logística.",
    url: "https://www.aonik.com.br/autoguiados",
    images: [{ url: "/images/tmb/hero.jpg", width: 1200, height: 630, alt: "Viagens Autoguiadas — AONIK" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
