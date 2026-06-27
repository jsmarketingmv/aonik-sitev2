import type { Metadata } from "next";
import Capa from "./capa";

export const metadata: Metadata = {
  title: "Torres del Paine · Circuito W | AONIK",
  description:
    "Caminhe o lendário circuito W em Torres del Paine, na Patagônia Chilena. Quatro programas, guiado ou autoguiado, com refúgios, camping e o Hotel Las Torres. Logística cuidada pela AONIK.",
  openGraph: {
    title: "Torres del Paine · Circuito W | AONIK",
    description:
      "Quatro formas de percorrer a oitava maravilha do mundo. Comunidade, conforto e a logística toda cuidada pela AONIK.",
    url: "https://www.aonik.com.br/destinos/torres-del-paine",
    images: [{ url: "/torres-del-paine/hero.jpg", width: 1200, height: 630, alt: "Torres del Paine — Circuito W" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  name: "Torres del Paine · Circuito W",
  description:
    "Caminhe o lendário circuito W em Torres del Paine, na Patagônia Chilena. Quatro programas com refúgios, camping e o Hotel Las Torres.",
  url: "https://www.aonik.com.br/destinos/torres-del-paine",
  provider: {
    "@type": "TravelAgency",
    name: "AONIK",
    url: "https://www.aonik.com.br",
  },
  touristType: { "@type": "Audience", audienceType: "Trekkers e amantes da Patagônia" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Capa />
    </>
  );
}
