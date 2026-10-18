import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/", destination: "/fr", permanent: false },
      { source: "/expertise", destination: "/fr/expertise", permanent: false },
      { source: "/projets", destination: "/fr/projets", permanent: false },
      { source: "/a-propos", destination: "/fr/a-propos", permanent: false },
      { source: "/contact", destination: "/fr/contact", permanent: false },
    ];
  },
};

export default nextConfig;
