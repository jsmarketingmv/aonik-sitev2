import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Navegação · Cruzeiros na Patagônia",
  description: "Cruzeiros na Patagônia Chilena e Antártica. Experiências de navegação em territórios selvagens e geleiras.",
  openGraph: {
    title: "Cruzeiros na Patagônia | AONIK",
    description: "Cruzeiros na Patagônia Chilena e Antártica. Experiências de navegação em territórios selvagens e geleiras.",
    url: "https://www.aonik.com.br/navegacao",
    images: [{ url: "/skorpios/DSC_0020.JPG", width: 1200, height: 630, alt: "Cruzeiros na Patagônia — AONIK" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
