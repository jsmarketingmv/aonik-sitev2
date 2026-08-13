"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Pixel da Meta (TARGET AVENTURA Pixel).
 * É o pixel com histórico da conta, o mesmo por trás dos R$ 104 mil já
 * investidos, com API de Conversões ligada. Reaproveitar ele preserva os
 * públicos personalizados e o aprendizado das campanhas.
 */
export const META_PIXEL_ID = "2397734060442626";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

export default function MetaPixel() {
  const pathname = usePathname();
  const jaContouPrimeiraView = useRef(false);

  // O script base já dispara o PageView do primeiro carregamento. Como o
  // App Router navega no cliente, as trocas de rota seguintes não disparam
  // nada sozinhas e precisam ser avisadas na mão.
  useEffect(() => {
    if (!jaContouPrimeiraView.current) {
      jaContouPrimeiraView.current = true;
      return;
    }
    window.fbq?.("track", "PageView");
  }, [pathname]);

  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
