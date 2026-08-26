"use client";

import Script from "next/script";

/**
 * Pixel do OpenAI Ads (anúncios dentro do ChatGPT).
 *
 * O snippet que a OpenAI entrega vem com `debug: true`, que despeja log no
 * console de todo visitante. Serve para conferir a instalação, não para
 * produção, então fica desligado aqui.
 */
export const OPENAI_PIXEL_ID = "23iMwxpR4wwiERy6wgUmDH";

declare global {
  interface Window {
    oaiq?: (...args: unknown[]) => void;
  }
}

export default function OpenAIPixel() {
  return (
    <Script
      id="openai-ads-pixel"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          !function(w,d,s,u){if(w.oaiq)return;var q=function(){q.q.push(arguments)};q.q=[];w.oaiq=q;var j=d.createElement(s);j.async=1;j.src=u;var f=d.getElementsByTagName(s)[0];f.parentNode.insertBefore(j,f)}(window,document,"script","https://bzrcdn.openai.com/sdk/oaiq.min.js");
          oaiq("init", { pixelId: "${OPENAI_PIXEL_ID}" });
        `,
      }}
    />
  );
}
