import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skorpios · Cruzeiro Patagônia",
  description: "Cruzeiros pela Patagônia Chilena a bordo dos navios Skorpios — canais, fiordes e glaciares entre Puerto Montt e Laguna San Rafael.",
  openGraph: {
    title: "Cruzeiro Skorpios · Patagônia | AONIK",
    description: "Cruzeiros pela Patagônia Chilena a bordo dos navios Skorpios — canais, fiordes e glaciares entre Puerto Montt e Laguna San Rafael.",
    url: "https://www.aonik.com.br/destinos/cruzeiro-skorpios",
    images: [{ url: "/skorpios/DSC_0020.JPG", width: 1200, height: 630, alt: "Cruzeiro Skorpios na Patagônia — AONIK" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  name: "Cruzeiro Skorpios · Patagônia Chilena",
  description: "Cruzeiros pelos fiordes e glaciares da Patagônia Chilena a bordo dos navios Skorpios.",
  url: "https://www.aonik.com.br/destinos/cruzeiro-skorpios",
  provider: {
    "@type": "TravelAgency",
    name: "AONIK",
    url: "https://www.aonik.com.br",
  },
  touristType: { "@type": "Audience", audienceType: "Viajantes de natureza e aventura" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
