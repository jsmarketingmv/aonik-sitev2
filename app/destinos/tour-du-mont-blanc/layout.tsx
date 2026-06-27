import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tour du Mont Blanc",
  description: "14 dias percorrendo os Alpes Franceses, Italianos e Suíços no circuito mais famoso do mundo. Grupos guiados com curadoria AONIK.",
  openGraph: {
    title: "Tour du Mont Blanc | AONIK",
    description: "14 dias percorrendo os Alpes Franceses, Italianos e Suíços no circuito mais famoso do mundo. Grupos guiados com curadoria AONIK.",
    url: "https://www.aonik.com.br/destinos/tour-du-mont-blanc",
    images: [{ url: "/images/tmb/hero.jpg", width: 1200, height: 630, alt: "Tour du Mont Blanc — AONIK" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  name: "Tour du Mont Blanc",
  description: "14 dias percorrendo os Alpes Franceses, Italianos e Suíços no circuito mais famoso do mundo.",
  url: "https://www.aonik.com.br/destinos/tour-du-mont-blanc",
  provider: {
    "@type": "TravelAgency",
    name: "AONIK",
    url: "https://www.aonik.com.br",
  },
  touristType: { "@type": "Audience", audienceType: "Aventureiros e amantes de trekking" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
