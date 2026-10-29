/**
 * Données légales de l'éditeur et de l'hébergeur.
 *
 * Consigne de la direction (oct. 2026) : ne pas publier les identifiants
 * administratifs et financiers de l'entreprise (forme juridique, capital,
 * RC, ICE, IF, patente). Seuls le nom, l'adresse, le domaine d'activité et
 * les contacts sont affichés. Ne pas réintroduire ces champs sans accord.
 *
 * Les champs vides ne sont pas affichés sur le site.
 */
export const legalCompany = {
  /** Dénomination sociale. */
  name: "TECHPAL",
  /** Domaine d'activité (objet social, sans les identifiants du RC). */
  activity: {
    fr: "Services informatiques : conception et intégration de solutions IT, vente et installation de matériel informatique, développement et maintenance de systèmes d'information.",
    en: "IT services: design and integration of IT solutions, sale and installation of computer hardware, development and maintenance of information systems.",
  },
  /** Adresse affichée sur le site (footer, contact, mentions légales). */
  address: "Bureau B3, Rue Ettah, Casablanca 20000, Maroc",
  /** Directeur de la publication (personne physique nommée). */
  publicationDirector: "",
  publicationDirectorRole: {
    fr: "Direction générale",
    en: "Executive management",
  },
  /** Numéro de récépissé / autorisation CNDP (loi 09-08), si déclaration effectuée. */
  cndpReceipt: "",
} as const;

export const legalHost = {
  name: "OVHcloud (OVH SAS)",
  address: "2 rue Kellermann, 59100 Roubaix, France",
  site: "https://www.ovhcloud.com",
  /** Localisation des serveurs qui hébergent le site. */
  servers: {
    fr: "Gravelines, France (Union européenne)",
    en: "Gravelines, France (European Union)",
  },
} as const;

/** Autorité de contrôle des données personnelles au Maroc. */
export const cndp = {
  name: "CNDP — Commission Nationale de contrôle de la protection des Données à caractère Personnel",
  address: "Angle avenue Annakhil et rue Al-Araar, Espace Les Patios, 2e étage, Hay Riad, Rabat, Maroc",
  site: "https://www.cndp.ma",
} as const;

/** Date de dernière révision des pages légales. */
export const legalUpdated = {
  fr: "29 octobre 2026",
  en: "29 October 2026",
} as const;
