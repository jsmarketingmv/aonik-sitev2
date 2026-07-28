import type { Metadata } from "next";

const DESC =
  "A volta completa ao maciço Paine em grupo guiado: 8 dias pela face oculta de Torres del Paine, de Serón e Dickson a Los Perros, o Passo John Garner e o Glaciar Grey. Saída 2027 com o guia Ivo Léo, datas em breve.";

export const metadata: Metadata = {
  title: "Circuito O · grupo guiado 8D/7N | Torres del Paine | AONIK",
  description: DESC,
  openGraph: {
    title: "Circuito O · grupo guiado | Torres del Paine | AONIK",
    description: DESC,
    url: "https://www.aonik.com.br/destinos/torres-del-paine-o-circuit",
    images: [{ url: "/torres-del-paine/dsc08327.jpg", width: 1200, height: 630, alt: "Circuito O · Torres del Paine — AONIK" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  name: "Circuito O · Torres del Paine",
  description: DESC,
  url: "https://www.aonik.com.br/destinos/torres-del-paine-o-circuit",
  provider: { "@type": "TravelAgency", name: "AONIK", url: "https://www.aonik.com.br" },
  touristType: { "@type": "Audience", audienceType: "Trekkers em grupo guiado" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
