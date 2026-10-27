import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Accès au serveur de dev depuis le réseau local (téléphone, autre PC)
  allowedDevOrigins: ["192.168.100.5"],
  // Masque le badge Next.js en bas d'écran en mode dev
  devIndicators: false,
  async redirects() {
    return [
      { source: "/", destination: "/fr", permanent: true },
      { source: "/expertise", destination: "/fr/expertise", permanent: true },
      { source: "/ia", destination: "/fr/ia", permanent: true },
      { source: "/produits", destination: "/fr/produits", permanent: true },
      { source: "/staffing", destination: "/fr/staffing", permanent: true },
      { source: "/projets", destination: "/fr/projets", permanent: true },
      { source: "/a-propos", destination: "/fr/a-propos", permanent: true },
      { source: "/contact", destination: "/fr/contact", permanent: true },
      { source: "/mentions-legales", destination: "/fr/mentions-legales", permanent: true },
      { source: "/confidentialite", destination: "/fr/confidentialite", permanent: true },
    ];
  },
};

export default nextConfig;
