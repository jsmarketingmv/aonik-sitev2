import type { Metadata } from "next";
import Script from "next/script";
import { Fraunces, Inter, Caveat } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import { LanguageProvider } from "./components/LanguageProvider";
import MetaPixel from "./components/MetaPixel";
import GoogleAnalytics from "./components/GoogleAnalytics";
import ConversionTracking from "./components/ConversionTracking";
import OpenAIPixel from "./components/OpenAIPixel";

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
    // O primeiro código é antigo e não corresponde a nenhuma propriedade da
    // conta marketing@julianosantana.com.br, deve ser de outra conta. Fica
    // por precaução. O segundo é o do Search Console da AONIK.
    //
    // Precisou ser meta tag em vez de verificar pelo Google Analytics: o
    // next/script injeta o gtag só depois da hidratação e deixa apenas um
    // preload no <head>, e o Search Console exige o snippet no HTML servido.
    google: [
      "L4RrmkObtGNjhnahE6koZCfkRhd_BPgKoV0VjTiF49k",
      "UNbIPlOOCpuSiTyZseTYgCzTyNCQKIYuJ_vCg4bwH0Q",
    ],
    other: {
      // Verificação do domínio aonik.com.br no Meta Business Manager.
      // Sem ela não dá pra configurar a Agregação de Eventos, que é o que
      // permite otimizar campanha por conversão depois do iOS 14.5.
      "facebook-domain-verification": "kgjfjdxcpdzj1j7vk6vn3br7jbrrtt",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${inter.variable} ${caveat.variable}`}>
      <head>
        <Script id="clarity-script" strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: `
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "xhetcurr2g");
          `
        }} />
      </head>
      <body>
        <MetaPixel />
        <GoogleAnalytics />
        <OpenAIPixel />
        <ConversionTracking />
        <LanguageProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
