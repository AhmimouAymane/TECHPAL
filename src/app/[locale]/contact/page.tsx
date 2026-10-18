import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import fr from "@/content/fr";
import en from "@/content/en";
import { site } from "@/content/site";
import { isLocale, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = locale === "fr" ? fr : en;
  return { title: dict.meta.contact.title, description: dict.meta.contact.description };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = locale === "fr" ? fr : en;
  const c = dict.contactPage;

  const rows = [
    { k: locale === "fr" ? "E-mail" : "Email", v: site.email, href: `mailto:${site.email}` },
    { k: locale === "fr" ? "Téléphone" : "Phone", v: site.phone, href: site.phoneHref },
    { k: locale === "fr" ? "Adresse" : "Address", v: site.address, href: site.mapsUrl },
  ];

  return (
    <>
      <PageHero kicker={c.kicker} title={c.title} intro={c.intro} />
      <section className="pb-24 md:pb-36">
        <Container className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
          <div>
            <h2 className="label text-muted">{c.infoTitle}</h2>
            <dl className="mt-8 space-y-6">
              {rows.map((r) => (
                <div key={r.k}>
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">{r.k}</dt>
                  <dd className="mt-2">
                    <a href={r.href} className="link-line text-lg" target={r.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                      {r.v}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <ContactForm dict={dict} />
        </Container>
      </section>
    </>
  );
}
