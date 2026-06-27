import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quem Somos",
  description: "A AONIK é uma operadora de turismo de natureza e aventura. Viagens que viram jornada — caminhadas, bike, cruzeiros e refúgios.",
  openGraph: {
    title: "Quem Somos | AONIK",
    description: "A AONIK é uma operadora de turismo de natureza e aventura. Viagens que viram jornada — caminhadas, bike, cruzeiros e refúgios.",
    url: "https://www.aonik.com.br/quem-somos",
    images: [{ url: "/images/tmb/hero.jpg", width: 1200, height: 630, alt: "AONIK — Turismo de Natureza" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
