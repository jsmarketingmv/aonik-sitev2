import type { Metadata } from "next";

/**
 * Área comercial B2B: fora do Google e fora do sitemap.
 *
 * Usa noindex em vez de bloquear no robots.txt de propósito. Disallow no
 * robots exporia o caminho /parceiros num arquivo público, e ainda impediria
 * o bot de ler o próprio noindex. Com noindex a página some do índice sem
 * anunciar que existe.
 */
export const metadata: Metadata = {
  // O layout raiz ja aplica o template "%s | AONIK".
  title: "Para agências",
  description: "Área comercial para agências e agentes de viagem.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function ParceirosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
