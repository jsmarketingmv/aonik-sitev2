import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hotéis de Natureza",
  description: "Hospedagens únicas em meio à natureza na Patagônia, Alpes e além. Experiências de imersão fora dos roteiros convencionais.",
  openGraph: {
    title: "Hotéis de Natureza | AONIK",
    description: "Hospedagens únicas em meio à natureza na Patagônia, Alpes e além. Experiências de imersão fora dos roteiros convencionais.",
    url: "https://www.aonik.com.br/hoteis",
    images: [{ url: "/images/segmentos/hero-exterior.jpg", width: 1200, height: 630, alt: "Hotéis de Natureza — AONIK" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
