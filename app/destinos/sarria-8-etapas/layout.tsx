import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sarria em 8 Etapas · Caminho de Santiago",
  description: "De Sarria a Santiago em 8 etapas — mais fôlego, mais paisagem, o mesmo destino.",
  openGraph: {
    title: "Caminho de Santiago de Sarria — 8 Etapas | AONIK",
    description: "De Sarria a Santiago em 8 etapas — mais fôlego, mais paisagem, o mesmo destino.",
    url: "https://www.aonik.com.br/destinos/sarria-8-etapas",
    images: [{ url: "/images/grupos/tmb-contemplacao.jpg", width: 1200, height: 630, alt: "Caminho de Santiago — AONIK" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  name: "Caminho de Santiago de Sarria — 8 Etapas",
  description: "De Sarria a Santiago em 8 etapas — mais fôlego, mais paisagem, o mesmo destino.",
  url: "https://www.aonik.com.br/destinos/sarria-8-etapas",
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
