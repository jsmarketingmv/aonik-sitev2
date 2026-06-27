import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bavária Alemã",
  description: "9 dias nos Alpes Bávaros, entre castelos medievais, lagos cristalinos e trilhas de alta montanha com guia especializado.",
  openGraph: {
    title: "Bavária Alemã · Alpes | AONIK",
    description: "9 dias nos Alpes Bávaros, entre castelos medievais, lagos cristalinos e trilhas de alta montanha com guia especializado.",
    url: "https://www.aonik.com.br/destinos/bavaria",
    images: [{ url: "/images/tmb/hero.jpg", width: 1200, height: 630, alt: "Bavária Alemã — AONIK" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  name: "Bavária Alemã · Trekking nos Alpes",
  description: "9 dias nos Alpes Bávaros entre castelos medievais, lagos cristalinos e trilhas de alta montanha.",
  url: "https://www.aonik.com.br/destinos/bavaria",
  provider: { "@type": "TravelAgency", name: "AONIK", url: "https://www.aonik.com.br" },
  touristType: { "@type": "Audience", audienceType: "Viajantes culturais e trekkers" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
