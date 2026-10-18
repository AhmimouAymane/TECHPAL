import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function LocaleNotFound() {
  return (
    <section className="flex min-h-svh flex-col justify-center py-32">
      <Container>
        <span className="label text-accent">404</span>
        <h1 className="display display-xl mt-6">Page introuvable / Page not found</h1>
        <p className="mt-6 max-w-[46ch] text-muted">
          La page demandée n&apos;existe pas ou a été déplacée. / The requested page does not exist or has moved.
        </p>
        <div className="mt-10 flex gap-4">
          <Link href="/fr" className="stroke-btn rounded-[var(--radius-pill)] bg-ink px-6 py-3 text-sm text-paper">
            Accueil
          </Link>
          <Link href="/en" className="link-line self-center text-sm text-muted">
            Home
          </Link>
        </div>
      </Container>
    </section>
  );
}
