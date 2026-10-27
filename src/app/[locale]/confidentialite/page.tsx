import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import fr from "@/content/fr";
import en from "@/content/en";
import { site } from "@/content/site";
import { cndp, legalCompany, legalHost, legalUpdated } from "@/content/legal";
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

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = locale === "fr" ? fr : en;
  const isFr = locale === "fr";

  const link = "text-ink underline decoration-line underline-offset-4 hover:decoration-ink";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: isFr ? "Accueil" : "Home", item: `${site.url}/${locale}` },
          { "@type": "ListItem", position: 2, name: dict.legal.privacyTitle, item: `${site.url}/${locale}/confidentialite` },
        ],
      },
      {
        "@type": "WebPage",
        name: dict.legal.privacyTitle,
        url: `${site.url}/${locale}/confidentialite`,
        inLanguage: locale,
        dateModified: "2026-10-27",
        isPartOf: { "@id": `${site.url}/#website` },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero kicker={isFr ? "Protection des données" : "Data protection"} title={dict.legal.privacyTitle} />
      <section className="pb-32">
        <Container className="max-w-[76ch] space-y-14 text-muted leading-relaxed">
          <p className="text-sm">
            {isFr ? "Dernière mise à jour : " : "Last updated: "}
            <span className="text-ink">{legalUpdated[locale]}</span>
          </p>

          <Section n="1" title={isFr ? "Responsable du traitement" : "Data controller"}>
            <p>
              {isFr ? (
                <>
                  Le responsable du traitement des données collectées sur ce site est{" "}
                  <strong className="text-ink">{legalCompany.name}</strong>, {legalCompany.address}. Contact dédié :{" "}
                  <a href={`mailto:${site.email}`} className={link}>
                    {site.email}
                  </a>
                  .
                </>
              ) : (
                <>
                  The controller of data collected on this site is <strong className="text-ink">{legalCompany.name}</strong>,{" "}
                  {legalCompany.address}. Dedicated contact:{" "}
                  <a href={`mailto:${site.email}`} className={link}>
                    {site.email}
                  </a>
                  .
                </>
              )}
            </p>
            <p>
              {isFr
                ? "Cette politique est établie conformément à la loi marocaine n° 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel, sous le contrôle de la CNDP."
                : "This policy is established in accordance with Moroccan Law No. 09-08 on the protection of individuals with regard to the processing of personal data, under the supervision of the CNDP."}
            </p>
            {legalCompany.cndpReceipt ? (
              <p>
                {isFr ? "Déclaration CNDP n° " : "CNDP declaration No. "}
                <strong className="text-ink">{legalCompany.cndpReceipt}</strong>.
              </p>
            ) : null}
          </Section>

          <Section n="2" title={isFr ? "Données collectées et finalités" : "Data collected and purposes"}>
            <p>
              {isFr
                ? "Nous ne collectons que les informations strictement nécessaires au traitement de votre demande :"
                : "We only collect the information strictly required to handle your request:"}
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong className="text-ink">{isFr ? "Identité et coordonnées :" : "Identity and contact details:"}</strong>{" "}
                {isFr
                  ? "nom, adresse e-mail, société (facultative), message que vous rédigez."
                  : "name, email address, company (optional), and the message you write."}
              </li>
              <li>
                <strong className="text-ink">{isFr ? "Contenu de la demande :" : "Request content:"}</strong>{" "}
                {isFr
                  ? "description de vos besoins techniques, informatiques ou de staffing."
                  : "description of your technical, IT or staffing requirements."}
              </li>
              <li>
                <strong className="text-ink">{isFr ? "Données techniques anti-spam :" : "Anti-spam technical data:"}</strong>{" "}
                {isFr
                  ? "adresse IP utilisée uniquement pour limiter les envois abusifs, conservée en mémoire pendant une heure maximum, jamais enregistrée en base."
                  : "IP address used solely to rate-limit abusive submissions, held in memory for one hour at most, never stored in a database."}
              </li>
            </ul>
            <p>
              {isFr
                ? "Finalités : répondre à votre demande, établir un devis ou une proposition, assurer le suivi de la relation commerciale et, le cas échéant, l'exécution d'un contrat. Aucune donnée n'est utilisée à des fins de prospection non sollicitée ni de profilage publicitaire."
                : "Purposes: reply to your enquiry, prepare a quote or proposal, manage the commercial relationship and, where applicable, perform a contract. No data is used for unsolicited marketing or advertising profiling."}
            </p>
          </Section>

          <Section n="3" title={isFr ? "Base légale" : "Legal basis"}>
            <p>
              {isFr
                ? "Le traitement repose sur votre consentement, exprimé par la case à cocher du formulaire de contact avant envoi, ainsi que sur l'intérêt légitime de TECHPAL à répondre aux sollicitations professionnelles qui lui sont adressées."
                : "Processing is based on your consent, given through the checkbox on the contact form before submission, and on TECHPAL's legitimate interest in responding to professional enquiries addressed to it."}
            </p>
          </Section>

          <Section n="4" title={isFr ? "Destinataires et sous-traitants" : "Recipients and processors"}>
            <p>
              {isFr
                ? "Les informations sont accessibles aux seuls membres de l'équipe TECHPAL concernés par votre demande. Elles ne sont ni vendues, ni louées, ni cédées à des tiers."
                : "Information is accessible only to TECHPAL team members involved in your request. It is never sold, rented or transferred to third parties."}
            </p>
            <p>
              {isFr ? (
                <>
                  Deux prestataires techniques interviennent strictement pour le compte de TECHPAL :{" "}
                  <strong className="text-ink">{legalHost.name}</strong> (hébergement du site) et notre prestataire
                  d&apos;envoi d&apos;e-mails sortants, utilisé uniquement pour acheminer les messages du formulaire vers
                  notre boîte de réception.
                </>
              ) : (
                <>
                  Two technical providers act strictly on TECHPAL&apos;s behalf:{" "}
                  <strong className="text-ink">{legalHost.name}</strong> (website hosting) and our outbound email
                  provider, used only to deliver form messages to our inbox.
                </>
              )}
            </p>
          </Section>

          <Section n="5" title={isFr ? "Transferts hors du Maroc" : "Transfers outside Morocco"}>
            <p>
              {isFr ? (
                <>
                  L&apos;hébergement est assuré dans l&apos;Union européenne ({legalHost.servers.fr}). Les messages du
                  formulaire transitent par des serveurs de messagerie susceptibles d&apos;être situés hors du Maroc. Ces
                  transferts sont limités aux seules données nécessaires au traitement de votre demande.
                </>
              ) : (
                <>
                  Hosting is provided within the European Union ({legalHost.servers.en}). Form messages pass through mail
                  servers that may be located outside Morocco. Such transfers are limited to the data required to handle
                  your request.
                </>
              )}
            </p>
          </Section>

          <Section n="6" title={isFr ? "Durée de conservation" : "Retention period"}>
            <p>
              {isFr
                ? "Les demandes de contact et de devis sont conservées trois ans à compter du dernier échange, puis supprimées. Les données liées à un contrat ou à une facturation sont conservées pendant la durée légale d'archivage comptable applicable au Maroc. L'adresse IP utilisée pour la limitation anti-spam n'est conservée qu'une heure en mémoire."
                : "Contact and quotation requests are kept for three years from the last exchange, then deleted. Data related to a contract or invoicing is kept for the statutory accounting retention period applicable in Morocco. The IP address used for anti-spam rate limiting is held in memory for one hour only."}
            </p>
          </Section>

          <Section n="7" title={isFr ? "Sécurité" : "Security"}>
            <p>
              {isFr
                ? "Le site est intégralement servi en HTTPS. L'accès aux boîtes de réception est protégé par authentification, le formulaire est limité en débit et filtré contre les envois automatisés. Les secrets d'infrastructure (clés, mots de passe) ne sont jamais exposés côté navigateur."
                : "The site is served entirely over HTTPS. Mailbox access is authenticated, the contact form is rate-limited and filtered against automated submissions. Infrastructure secrets (keys, passwords) are never exposed to the browser."}
            </p>
          </Section>

          <Section n="8" title={isFr ? "Vos droits" : "Your rights"}>
            <p>
              {isFr
                ? "Conformément à la loi n° 09-08, vous disposez d'un droit d'accès, de rectification, d'opposition et, lorsque la loi le permet, de suppression des données vous concernant. Ces droits s'exercent par e-mail à "
                : "Under Law No. 09-08, you have the right to access, rectify, object to and, where permitted by law, erase your personal data. These rights can be exercised by email at "}
              <a href={`mailto:${site.email}`} className={link}>
                {site.email}
              </a>
              {isFr
                ? ", en précisant l'objet de votre demande. Une réponse vous est apportée dans les meilleurs délais."
                : ", specifying the subject of your request. We reply as promptly as possible."}
            </p>
            <p>
              {isFr ? (
                <>
                  Si la réponse apportée ne vous satisfait pas, vous pouvez saisir la{" "}
                  <strong className="text-ink">{cndp.name}</strong> — {cndp.address} —{" "}
                  <a href={cndp.site} target="_blank" rel="noopener noreferrer" className={link}>
                    cndp.ma
                  </a>
                  .
                </>
              ) : (
                <>
                  If our response does not satisfy you, you may refer the matter to the{" "}
                  <strong className="text-ink">{cndp.name}</strong> — {cndp.address} —{" "}
                  <a href={cndp.site} target="_blank" rel="noopener noreferrer" className={link}>
                    cndp.ma
                  </a>
                  .
                </>
              )}
            </p>
          </Section>

          <Section n="9" title={isFr ? "Cookies" : "Cookies"}>
            <p>
              {isFr
                ? "Ce site ne dépose aucun cookie publicitaire, analytique ou de réseau social, et n'utilise aucun traceur tiers. Aucun bandeau de consentement n'est donc nécessaire. Les seules données techniques échangées le sont pour afficher les pages et sécuriser le formulaire."
                : "This site sets no advertising, analytics or social media cookies and uses no third-party trackers, which is why no consent banner is required. The only technical data exchanged is used to display pages and secure the form."}
            </p>
          </Section>

          <Section n="10" title={isFr ? "Modifications et contact" : "Changes and contact"}>
            <p>
              {isFr
                ? "Cette politique peut être mise à jour en cas d'évolution du site ou de la réglementation ; la date de révision figure en tête de page. Pour toute question, écrivez à "
                : "This policy may be updated as the site or applicable regulations evolve; the revision date appears at the top of the page. For any question, write to "}
              <a href={`mailto:${site.email}`} className={link}>
                {site.email}
              </a>
              {isFr ? " ou consultez nos " : " or see our "}
              <a href={`/${locale}/mentions-legales`} className={link}>
                {isFr ? "mentions légales" : "legal notice"}
              </a>
              .
            </p>
          </Section>
        </Container>
      </section>
    </>
  );
}
