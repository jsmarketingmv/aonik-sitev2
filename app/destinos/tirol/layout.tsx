import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tirol Austríaco",
  description: "10 dias no Stubaier Höhenweg, um dos mais belos percursos alpinos da Áustria com glaciares e vistas únicas.",
  openGraph: {
    title: "Tirol Austríaco · Stubaier Höhenweg | AONIK",
    description: "10 dias no Stubaier Höhenweg, um dos mais belos percursos alpinos da Áustria com glaciares e vistas únicas.",
    url: "https://www.aonik.com.br/destinos/tirol",
    images: [{ url: "/images/tmb/hero.jpg", width: 1200, height: 630, alt: "Tirol Austríaco — AONIK" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  name: "Tirol Austríaco · Stubaier Höhenweg",
  description: "10 dias no Stubaier Höhenweg, um dos mais belos percursos alpinos da Áustria com glaciares e vistas únicas.",
  url: "https://www.aonik.com.br/destinos/tirol",
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
