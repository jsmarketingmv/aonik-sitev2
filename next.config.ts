import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Fotos de fundo vivem sob overlay escuro: 2048px basta e evita gerar 2560/3840.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  },
  async redirects() {
    // Hotéis e Navegação saíram do ar: links antigos voltam para a home em vez de 404.
    return [
      { source: "/refugios", destination: "/", permanent: true },
      { source: "/hoteis", destination: "/", permanent: true },
      { source: "/navegacao", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
