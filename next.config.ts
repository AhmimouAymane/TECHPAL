import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Accès au serveur de dev depuis le réseau local (téléphone, autre PC)
  allowedDevOrigins: ["192.168.100.5"],
  // Masque le badge Next.js en bas d'écran en mode dev
  devIndicators: false,
  async redirects() {
    // Temporaire (direction, oct. 2026) : version française en révision,
    // tout /fr renvoie vers son équivalent /en. Pour réactiver le FR :
    // remettre /fr ici et hideFr = false dans src/lib/i18n.ts.
    return [
      { source: "/", destination: "/en", permanent: true },
      { source: "/fr", destination: "/en", permanent: true },
      // Renommage de la page catalogue : /produits devient /solutions (301).
      { source: "/fr/produits", destination: "/en/solutions", permanent: true },
      { source: "/en/produits", destination: "/en/solutions", permanent: true },
      { source: "/fr/:path*", destination: "/en/:path*", permanent: true },
      { source: "/expertise", destination: "/en/expertise", permanent: true },
      { source: "/ia", destination: "/en/ia", permanent: true },
      { source: "/produits", destination: "/en/solutions", permanent: true },
      { source: "/solutions", destination: "/en/solutions", permanent: true },
      { source: "/staffing", destination: "/en/staffing", permanent: true },
      { source: "/projets", destination: "/en/projets", permanent: true },
      { source: "/a-propos", destination: "/en/a-propos", permanent: true },
      { source: "/contact", destination: "/en/contact", permanent: true },
      { source: "/mentions-legales", destination: "/en/mentions-legales", permanent: true },
      { source: "/confidentialite", destination: "/en/confidentialite", permanent: true },
    ];
  },
};

export default nextConfig;
