import Script from "next/script";

/**
 * GA4, propriedade AONIK (conta JS Marketing Estratégico).
 * Criada em 13/08/2026 com fuso São Paulo e moeda em real, para os
 * relatórios baterem com o Google Ads.
 *
 * Não precisa disparar page_view na troca de rota: a Métrica Otimizada
 * (Enhanced Measurement) já escuta os eventos de histórico do navegador e
 * cobre a navegação client-side. Disparar na mão aqui geraria page_view
 * duplicado, ao contrário do Pixel da Meta, que precisa do empurrão.
 */
export const GA4_MEASUREMENT_ID = "G-MX71PJ86TB";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export default function GoogleAnalytics() {
  return (
    <>
      <Script
        id="ga4-lib"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
      />
      <Script
        id="ga4-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA4_MEASUREMENT_ID}');
          `,
        }}
      />
    </>
  );
}
