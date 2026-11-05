import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Accès au serveur de dev depuis le réseau local (téléphone, autre PC)
  allowedDevOrigins: ["192.168.100.5"],
  // Masque le badge Next.js en bas d'écran en mode dev
  devIndicators: false,
  // En-têtes de sécurité conservateurs (aucune fonction de l'app cassée).
  // CSP strict volontairement absent tant qu'il n'a pas été testé en préprod.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=15552000",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
          },
          { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        ],
      },
    ];
  },
  async redirects() {
    // Temporaire (direction, oct. 2026) : version française en révision,
    // tout /fr renvoie vers son équivalent /en. Pour réactiver le FR :
    // remettre /fr ici et hideFr = false dans src/lib/i18n.ts.
    return [
      { source: "/", destination: "/en", permanent: true },
      { source: "/fr", destination: "/en", permanent: true },
      { source: "/fr/:path*", destination: "/en/:path*", permanent: true },
      { source: "/expertise", destination: "/en/expertise", permanent: true },
      { source: "/ia", destination: "/en/ia", permanent: true },
      { source: "/produits", destination: "/en/produits", permanent: true },
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
