import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dolomitas Alta Via 1",
  description: "10 dias na Alta Via 1, o percurso mais clássico dos Alpes Italianos, entre picos de calcário e refúgios históricos.",
  openGraph: {
    title: "Dolomitas Alta Via 1 | AONIK",
    description: "10 dias na Alta Via 1, o percurso mais clássico dos Alpes Italianos, entre picos de calcário e refúgios históricos.",
    url: "https://www.aonik.com.br/destinos/dolomitas-alta-via",
    images: [{ url: "/images/grupos/dolomitas-cume.jpg", width: 1200, height: 630, alt: "Dolomitas Alta Via — AONIK" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  name: "Dolomitas Alta Via 1",
  description: "10 dias na Alta Via 1, o percurso mais clássico dos Alpes Italianos, entre picos de calcário e refúgios históricos.",
  url: "https://www.aonik.com.br/destinos/dolomitas-alta-via",
  provider: { "@type": "TravelAgency", name: "AONIK", url: "https://www.aonik.com.br" },
  touristType: { "@type": "Audience", audienceType: "Trekkers alpinistas" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
