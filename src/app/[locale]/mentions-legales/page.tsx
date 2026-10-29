import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import fr from "@/content/fr";
import en from "@/content/en";
import { site } from "@/content/site";
import {
  cndp,
  legalCompany,
  legalUpdated,
} from "@/content/legal";
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

function Row({ label, children }: { label: string; children: ReactNode }) {
  if (children === undefined || children === null || children === "") return null;
  return (
    <div className="grid gap-1 border-b border-line py-3 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] sm:gap-6">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="text-ink">{children}</dd>
    </div>
  );
}

function Section({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <section id={`s${n}`} className="scroll-mt-28 space-y-4">
      <div className="flex items-baseline gap-3">
        <span aria-hidden className="label text-accent">
          {n.padStart(2, "0")}
        </span>
        <h2 className="text-xl font-medium text-ink">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default async function LegalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = locale === "fr" ? fr : en;
  const isFr = locale === "fr";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: isFr ? "Accueil" : "Home", item: `${site.url}/${locale}` },
          { "@type": "ListItem", position: 2, name: dict.legal.mentionsTitle, item: `${site.url}/${locale}/mentions-legales` },
        ],
      },
      {
        "@type": "WebPage",
        name: dict.legal.mentionsTitle,
        url: `${site.url}/${locale}/mentions-legales`,
        inLanguage: locale,
        dateModified: "2026-10-27",
        isPartOf: { "@id": `${site.url}/#website` },
      },
    ],
  };

  const director = legalCompany.publicationDirector
    ? `${legalCompany.publicationDirector} (${legalCompany.publicationDirectorRole[locale]})`
    : legalCompany.publicationDirectorRole[locale];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero kicker={isFr ? "Cadre légal" : "Legal notice"} title={dict.legal.mentionsTitle} />
      <section className="pb-32">
        <Container className="max-w-[76ch] space-y-14 text-muted leading-relaxed">
          <p className="text-sm">
            {isFr ? "Dernière mise à jour : " : "Last updated: "}
            <span className="text-ink">{legalUpdated[locale]}</span>
          </p>

          <Section n="1" title={isFr ? "Éditeur du site" : "Site publisher"}>
            <p>
              {isFr ? (
                <>
                  Le site <strong className="text-ink">{site.url}</strong> est édité par{" "}
                  <strong className="text-ink">{legalCompany.name}</strong>, société de services informatiques de droit
                  marocain.
                </>
              ) : (
                <>
                  The website <strong className="text-ink">{site.url}</strong> is published by{" "}
                  <strong className="text-ink">{legalCompany.name}</strong>, an IT services company incorporated under
                  Moroccan law.
                </>
              )}
            </p>
            <dl className="mt-4">
              <Row label={isFr ? "Dénomination" : "Name"}>{legalCompany.name}</Row>
              <Row label={isFr ? "Domaine d'activité" : "Business area"}>{legalCompany.activity[locale]}</Row>
              <Row label={isFr ? "Adresse" : "Address"}>{legalCompany.address}</Row>
              <Row label={isFr ? "Téléphone" : "Phone"}>
                <a href={site.phoneHref} className="text-ink hover:underline">
                  {site.phone}
                </a>
              </Row>
              <Row label="E-mail">
                <a href={`mailto:${site.email}`} className="text-ink hover:underline">
                  {site.email}
                </a>
              </Row>
              <Row label={isFr ? "Directeur de la publication" : "Publication director"}>{director}</Row>
            </dl>
          </Section>

          <Section n="2" title={isFr ? "Propriété intellectuelle" : "Intellectual property"}>
            <p>
              {isFr
                ? "L'ensemble des contenus présents sur ce site (textes, graphismes, logos, éléments visuels, architectures de solutions et animations) constitue une œuvre de l'esprit protégée par la législation marocaine et internationale sur le droit d'auteur et la propriété intellectuelle. Toute reproduction, représentation ou adaptation, totale ou partielle, sans autorisation écrite préalable est interdite."
                : "All content on this site (text, graphics, logos, visual elements, solution architectures and animations) is protected by Moroccan and international copyright and intellectual property law. Any reproduction, representation or adaptation, in whole or in part, without prior written authorisation is prohibited."}
            </p>
            <p>
              {isFr
                ? "Les marques et technologies citées (Dell, HP, Cisco, Fortinet, Microsoft, AWS, Azure, Odoo, etc.) demeurent la propriété exclusive de leurs détenteurs respectifs et sont mentionnées à titre informatif."
                : "The brands and technologies mentioned (Dell, HP, Cisco, Fortinet, Microsoft, AWS, Azure, Odoo, etc.) remain the exclusive property of their respective owners and are referenced for information purposes only."}
            </p>
          </Section>

          <Section n="3" title={isFr ? "Liens et responsabilité" : "Links and liability"}>
            <p>
              {isFr
                ? "Ce site peut contenir des liens vers des sites tiers. TECHPAL n'exerce aucun contrôle sur leur contenu et décline toute responsabilité quant à leurs informations, produits ou services. Les informations publiées sur ce site sont fournies à titre indicatif et peuvent évoluer sans préavis ; elles ne constituent pas un engagement contractuel."
                : "This site may contain links to third-party websites. TECHPAL has no control over their content and accepts no liability for their information, products or services. Information published here is indicative and may change without notice; it does not constitute a contractual commitment."}
            </p>
          </Section>

          <Section n="4" title={isFr ? "Données personnelles et cookies" : "Personal data and cookies"}>
            <p>
              {isFr ? (
                <>
                  Le traitement des données transmises via le formulaire de contact est décrit dans notre{" "}
                  <a href={`/${locale}/confidentialite`} className="text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
                    politique de confidentialité
                  </a>
                  , conformément à la loi n° 09-08 relative à la protection des personnes physiques à l&apos;égard du
                  traitement des données à caractère personnel.
                </>
              ) : (
                <>
                  How data submitted through the contact form is processed is described in our{" "}
                  <a href={`/${locale}/confidentialite`} className="text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
                    privacy policy
                  </a>
                  , in accordance with Moroccan Law No. 09-08 on the protection of individuals with regard to the
                  processing of personal data.
                </>
              )}
            </p>
            <p>
              {isFr
                ? "Ce site n'utilise aucun cookie publicitaire, aucun traceur analytique tiers et aucun profilage. Seuls des mécanismes techniques strictement nécessaires au fonctionnement et à la sécurité du site sont mis en œuvre."
                : "This site uses no advertising cookies, no third-party analytics trackers and no profiling. Only technical mechanisms strictly required for the site to operate securely are used."}
            </p>
            <p>
              {isFr ? (
                <>
                  Pour toute question ou réclamation relative à vos données, vous pouvez également saisir la{" "}
                  <strong className="text-ink">{cndp.name}</strong>, {cndp.address} (
                  <a href={cndp.site} target="_blank" rel="noopener noreferrer" className="text-ink hover:underline">
                    cndp.ma
                  </a>
                  ).
                </>
              ) : (
                <>
                  For any question or complaint regarding your data, you may also contact the{" "}
                  <strong className="text-ink">{cndp.name}</strong>, {cndp.address} (
                  <a href={cndp.site} target="_blank" rel="noopener noreferrer" className="text-ink hover:underline">
                    cndp.ma
                  </a>
                  ).
                </>
              )}
            </p>
          </Section>

          <Section n="5" title={isFr ? "Droit applicable et juridiction" : "Governing law and jurisdiction"}>
            <p>
              {isFr
                ? "Les présentes mentions légales sont soumises au droit marocain. Tout litige relatif à l'utilisation de ce site relève de la compétence des tribunaux de Casablanca, sous réserve des règles impératives applicables aux consommateurs."
                : "These legal notices are governed by Moroccan law. Any dispute relating to the use of this site falls under the jurisdiction of the courts of Casablanca, subject to mandatory consumer protection rules."}
            </p>
          </Section>

          <Section n="6" title="Contact">
            <p>
              {isFr ? "Pour toute question relative au site ou à ces mentions : " : "For any question about this site or these notices: "}
              <a href={`mailto:${site.email}`} className="text-ink hover:underline">
                {site.email}
              </a>{" "}
              {isFr ? "ou au " : "or at "}
              <a href={site.phoneHref} className="text-ink hover:underline">
                {site.phone}
              </a>
              .
            </p>
          </Section>
        </Container>
      </section>
    </>
  );
}
