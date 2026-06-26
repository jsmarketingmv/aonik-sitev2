import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/refugios", destination: "/hoteis", permanent: true },
    ];
  },
};

export default nextConfig;
