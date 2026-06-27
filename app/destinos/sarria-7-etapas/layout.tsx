import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sarria em 7 Etapas · Caminho de Santiago",
  description: "O trecho mínimo para receber o Compostela. De Sarria a Santiago em 7 etapas com a AONIK.",
  openGraph: {
    title: "Caminho de Santiago de Sarria — 7 Etapas | AONIK",
    description: "O trecho mínimo para receber o Compostela. De Sarria a Santiago em 7 etapas com a AONIK.",
    url: "https://www.aonik.com.br/destinos/sarria-7-etapas",
    images: [{ url: "/images/grupos/tmb-contemplacao.jpg", width: 1200, height: 630, alt: "Caminho de Santiago — AONIK" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  name: "Caminho de Santiago de Sarria — 7 Etapas",
  description: "O trecho mínimo para receber o Compostela. De Sarria a Santiago em 7 etapas.",
  url: "https://www.aonik.com.br/destinos/sarria-7-etapas",
  provider: { "@type": "TravelAgency", name: "AONIK", url: "https://www.aonik.com.br" },
  touristType: { "@type": "Audience", audienceType: "Peregrinos do Caminho de Santiago" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
