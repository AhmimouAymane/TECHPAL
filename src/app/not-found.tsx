import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="fr">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#f4f4fb",
          color: "#0a0a14",
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
        }}
      >
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <p style={{ letterSpacing: "0.22em", textTransform: "uppercase", fontSize: 12, color: "#6b6b80" }}>404</p>
          <h1 style={{ fontSize: "clamp(2rem,6vw,3.5rem)", margin: "1rem 0", fontWeight: 400 }}>Page not found</h1>
          <Link href="/fr" style={{ color: "#03118a", textDecoration: "none" }}>
            Retour à l&apos;accueil →
          </Link>
        </div>
      </body>
    </html>
  );
}
