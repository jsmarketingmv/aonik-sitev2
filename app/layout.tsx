import type { Metadata } from "next";
import { Fraunces, Inter, Caveat } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import { LanguageProvider } from "./components/LanguageProvider";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aonik.com.br"),
  title: {
    template: "%s | AONIK",
    default: "AONIK: Turismo de Natureza",
  },
  description:
    "Caminhadas, bike, cruzeiros e refúgios de natureza. Viagens que viram jornada. Descubra seu próximo destino com a AONIK.",
  openGraph: {
    title: "AONIK: Turismo de Natureza",
    description:
      "Viagens que viram jornada. Caminhadas, bike, cruzeiros e refúgios de natureza.",
    type: "website",
    locale: "pt_BR",
    siteName: "AONIK",
    url: "https://www.aonik.com.br",
    images: [
      {
        url: "/images/tmb/hero.jpg",
        width: 1200,
        height: 630,
        alt: "AONIK — Turismo de Natureza",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AONIK: Turismo de Natureza",
    description:
      "Viagens que viram jornada. Caminhadas, bike, cruzeiros e refúgios de natureza.",
    images: ["/images/tmb/hero.jpg"],
  },
  verification: {
    google: "L4RrmkObtGNjhnahE6koZCfkRhd_BPgKoV0VjTiF49k",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${inter.variable} ${caveat.variable}`}>
      <body>
        <LanguageProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
