import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import fr from "@/content/fr";
import en from "@/content/en";
import { site } from "@/content/site";
import { isLocale, locales } from "@/lib/i18n";
import { constructMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = locale === "fr" ? fr : en;
  return constructMetadata({
    locale,
    path: "/mentions-legales",
    title: dict.meta.mentions.title,
    description: dict.meta.mentions.description,
  });
}

export default async function LegalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = locale === "fr" ? fr : en;

  return (
    <>
      <PageHero kicker={locale === "fr" ? "Cadre légal" : "Legal notice"} title={dict.legal.mentionsTitle} />
      <section className="pb-32">
        <Container className="max-w-[76ch] space-y-10 text-muted leading-relaxed">
          {locale === "fr" ? (
            <>
              <div className="space-y-3">
                <h2 className="text-xl font-medium text-ink">1. Éditeur de la plateforme</h2>
                <p>
                  Le site web <strong className="text-ink">{site.url}</strong> est édité par la société{" "}
                  <strong className="text-ink">{site.fullName}</strong>, société de services numériques et d&apos;ingénierie informatique de droit marocain.
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Siège social :</strong> {site.address}</li>
                  <li><strong>Téléphone :</strong> <a href={site.phoneHref} className="text-ink hover:underline">{site.phone}</a></li>
                  <li><strong>E-mail :</strong> <a href={`mailto:${site.email}`} className="text-ink hover:underline">{site.email}</a></li>
                  <li><strong>Fondation :</strong> Casablanca, Maroc (2022)</li>
                  <li><strong>Direction de la publication :</strong> Direction Générale TECHPAL</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-medium text-ink">2. Hébergement</h2>
                <p>
                  Le site est hébergé sur des infrastructures cloud de classe internationale (Vercel Inc. et Amazon Web Services), assurant une haute disponibilité, une redondance géographique et un chiffrement des flux de bout en bout via protocole TLS/SSL (HTTPS).
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-medium text-ink">3. Propriété intellectuelle</h2>
                <p>
                  L&apos;ensemble des contenus présents sur ce site (textes, graphismes, logos, éléments visuels, architectures de solutions et animations) constitue une œuvre de l&apos;esprit protégée par la législation marocaine et internationale sur les droits d&apos;auteur et la propriété intellectuelle.
                </p>
                <p>
                  Les marques de partenaires et technologies (Dell, HP, Cisco, Fortinet, Microsoft, AWS, etc.) demeurent la propriété exclusive de leurs détenteurs respectifs.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-medium text-ink">4. Données personnelles (Loi marocaine n° 09-08)</h2>
                <p>
                  Conformément à la <strong>loi n° 09-08</strong> promulguée par le Dahir 1-09-15 du 22 safar 1430 relative à la protection des personnes physiques à l&apos;égard du traitement des données à caractère personnel :
                </p>
                <p>
                  Les données transmises via le formulaire de contact ou par e-mail sont exclusivement destinées aux équipes de TECHPAL pour le traitement des demandes de devis et d&apos;échanges précontractuels. Aucune donnée personnelle n&apos;est transmise, cédée ou commercialisée à des tiers.
                </p>
                <p>
                  Vous bénéficiez d&apos;un droit d&apos;accès, de rectification et d&apos;opposition pour des motifs légitimes sur les données vous concernant, que vous pouvez exercer en nous contactant à : <a href={`mailto:${site.email}`} className="text-ink hover:underline">{site.email}</a>.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-3">
                <h2 className="text-xl font-medium text-ink">1. Platform Publisher</h2>
                <p>
                  The website <strong className="text-ink">{site.url}</strong> is published by{" "}
                  <strong className="text-ink">{site.fullName}</strong>, a digital engineering and IT managed services company incorporated under Moroccan law.
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Headquarters:</strong> {site.address}</li>
                  <li><strong>Phone:</strong> <a href={site.phoneHref} className="text-ink hover:underline">{site.phone}</a></li>
                  <li><strong>Email:</strong> <a href={`mailto:${site.email}`} className="text-ink hover:underline">{site.email}</a></li>
                  <li><strong>Founded:</strong> Casablanca, Morocco (2022)</li>
                  <li><strong>Publication Director:</strong> TECHPAL Executive Management</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-medium text-ink">2. Hosting Infrastructure</h2>
                <p>
                  This site is hosted on enterprise cloud infrastructure (Vercel Inc. and Amazon Web Services), ensuring global high availability, edge caching, and end-to-end encrypted transport via TLS/SSL (HTTPS).
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-medium text-ink">3. Intellectual Property</h2>
                <p>
                  All content on this site (including text, graphics, logos, illustrations, design systems, and animations) is protected by intellectual property laws. Any reproduction without express prior written consent is strictly prohibited.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-medium text-ink">4. Personal Data Protection (Moroccan Law 09-08)</h2>
                <p>
                  In accordance with <strong>Law No. 09-08</strong> on the protection of individuals with regard to the processing of personal data, information collected via contact forms is strictly used for handling business inquiries and quote requests.
                </p>
                <p>
                  To exercise your rights to access, rectify, or oppose the processing of your personal data, contact us at: <a href={`mailto:${site.email}`} className="text-ink hover:underline">{site.email}</a>.
                </p>
              </div>
            </>
          )}
        </Container>
      </section>
    </>
  );
}
