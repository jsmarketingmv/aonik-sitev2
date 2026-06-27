import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dana até Petra · Jordânia",
  description: "10 dias de travessia a pé pelo deserto da Jordânia, da Reserva de Dana até a cidade rosa de Petra.",
  openGraph: {
    title: "Dana até Petra · Jordânia | AONIK",
    description: "10 dias de travessia a pé pelo deserto da Jordânia, da Reserva de Dana até a cidade rosa de Petra.",
    url: "https://www.aonik.com.br/destinos/dana-ate-petra",
    images: [{ url: "/images/tmb/hero.jpg", width: 1200, height: 630, alt: "Dana até Petra — AONIK" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  name: "Dana até Petra · Travessia pela Jordânia",
  description: "10 dias de travessia a pé pelo deserto da Jordânia, da Reserva de Dana até a cidade rosa de Petra.",
  url: "https://www.aonik.com.br/destinos/dana-ate-petra",
  provider: { "@type": "TravelAgency", name: "AONIK", url: "https://www.aonik.com.br" },
  touristType: { "@type": "Audience", audienceType: "Viajantes de aventura e travessia" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
