import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rota Vicentina",
  description:
    "Oito dias à beira do Atlântico pela costa mais selvagem do sudoeste de Portugal. 91,1 km pelo Trilho dos Pescadores, entre falésias, praias desertas e vilas piscatórias. Autoguiado, a partir de € 856.",
  openGraph: {
    title: "Rota Vicentina · Portugal | AONIK",
    description: "Oito dias à beira do Atlântico pela costa mais selvagem de Portugal. 91,1 km pelo Trilho dos Pescadores, entre falésias, praias desertas e vilas piscatórias.",
    url: "https://www.aonik.com.br/caminhos-autoguiados/rota-vicentina",
    images: [{ url: "/images/grupos/tmb-contemplacao.jpg", width: 1200, height: 630, alt: "Rota Vicentina — AONIK" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  name: "Rota Vicentina · Trilho dos Pescadores",
  description: "Oito dias à beira do Atlântico pela costa mais selvagem do sudoeste de Portugal. 91,1 km pelo Trilho dos Pescadores.",
  url: "https://www.aonik.com.br/caminhos-autoguiados/rota-vicentina",
  provider: { "@type": "TravelAgency", name: "AONIK", url: "https://www.aonik.com.br" },
  touristType: { "@type": "Audience", audienceType: "Caminhantes e amantes da natureza costeira" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
