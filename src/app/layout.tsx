/**
 * Racine : le <html>/<body> réel est rendu dans src/app/[locale]/layout.tsx
 * (permet de définir lang par locale).
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
