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
    path: "/confidentialite",
    title: dict.meta.confidentialite.title,
    description: dict.meta.confidentialite.description,
  });
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = locale === "fr" ? fr : en;

  return (
    <>
      <PageHero kicker={locale === "fr" ? "Protection des données" : "Data protection"} title={dict.legal.privacyTitle} />
      <section className="pb-32">
        <Container className="max-w-[76ch] space-y-10 text-muted leading-relaxed">
          {locale === "fr" ? (
            <>
              <div className="space-y-3">
                <h2 className="text-xl font-medium text-ink">1. Engagement de confidentialité</h2>
                <p>
                  Chez <strong className="text-ink">TECHPAL</strong>, la confidentialité et la sécurité de vos informations personnelles et projets technologiques constituent un engagement fondamental. Cette politique détaille les principes régissant la collecte, le traitement et la conservation de vos données, conformément à la <strong>loi marocaine n° 09-08</strong> relative à la protection des personnes physiques à l&apos;égard du traitement des données à caractère personnel (CNDP).
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-medium text-ink">2. Données collectées et finalités</h2>
                <p>
                  Nous ne collectons que les informations strictement nécessaires à nos relations professionnelles via nos formulaires de contact ou échanges directs :
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Identité et coordonnées :</strong> nom complet, adresse e-mail professionnelle, numéro de téléphone, société.</li>
                  <li><strong>Informations sur votre projet :</strong> descriptif des besoins techniques, infrastructure ou staffing.</li>
                </ul>
                <p>
                  Ces informations sont utilisées uniquement pour instruire votre demande, établir des propositions techniques et commerciales, ou assurer le suivi contractuel de nos prestations.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-medium text-ink">3. Non-divulgation et secret professionnel (NDA)</h2>
                <p>
                  TECHPAL applique une politique stricte de non-divulgation. Aucune donnée n&apos;est vendue, louée ou cédée à des tiers. Les missions de nos clients régies par des accords de confidentialité (NDA) font l&apos;objet de cloisonnements techniques stricts au sein de nos équipes.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-medium text-ink">4. Durée de conservation</h2>
                <p>
                  Les données de prospection et demandes de devis sont conservées pendant une durée maximale de 3 ans à compter du dernier contact émanant de votre part, sauf relation contractuelle active justifiant un archivage légal.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-medium text-ink">5. Vos droits (Accès, Rectification, Suppression)</h2>
                <p>
                  Conformément à la loi 09-08, vous disposez d&apos;un droit d&apos;accès, de rectification et d&apos;opposition au traitement de vos données personnelles. Vous pouvez faire valoir ces droits à tout moment par simple e-mail adressé à :{" "}
                  <a href={`mailto:${site.email}`} className="text-ink hover:underline">{site.email}</a>.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-3">
                <h2 className="text-xl font-medium text-ink">1. Commitment to Privacy</h2>
                <p>
                  At <strong className="text-ink">TECHPAL</strong>, confidentiality and the security of your business and personal information are fundamental values. This policy explains how we collect, process, and safeguard your data in compliance with <strong>Moroccan Law No. 09-08</strong> (CNDP) and international data protection standards.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-medium text-ink">2. Collected Data & Purposes</h2>
                <p>
                  We collect strictly necessary contact details submitted via our quote and contact forms:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Identity & contact details:</strong> full name, business email, telephone, company name.</li>
                  <li><strong>Project requirements:</strong> technical briefs, infrastructure specifications, or staffing needs.</li>
                </ul>
                <p>
                  This data is solely used to evaluate your requirements, deliver tailored quotes, and manage ongoing business engagements.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-medium text-ink">3. Confidentiality & Non-Disclosure</h2>
                <p>
                  We never sell, lease, or share client data with third parties. Client projects governed by Non-Disclosure Agreements (NDAs) are subject to strict technical isolation within our teams.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-medium text-ink">4. Retention & Security</h2>
                <p>
                  Inquiry data is retained for up to 3 years from the date of last contact, unless active contractual engagements require statutory accounting archives.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-medium text-ink">5. Your Rights</h2>
                <p>
                  Under Law 09-08, you have the right to access, rectify, or request deletion of your personal data at any time by contacting:{" "}
                  <a href={`mailto:${site.email}`} className="text-ink hover:underline">{site.email}</a>.
                </p>
              </div>
            </>
          )}
        </Container>
      </section>
    </>
  );
}
