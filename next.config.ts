import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Accès au serveur de dev depuis le réseau local (téléphone, autre PC)
  allowedDevOrigins: ["192.168.100.5"],
  // Masque le badge Next.js en bas d'écran en mode dev
  devIndicators: false,
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
