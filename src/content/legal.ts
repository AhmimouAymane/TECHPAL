/**
 * Données légales de l'éditeur et de l'hébergeur.
 *
 * Les champs vides ne sont pas affichés sur le site : ils attendent les
 * informations officielles (extrait du Registre de commerce / attestation ICE).
 * Ne jamais renseigner une valeur approximative ici.
 */
export const legalCompany = {
  /** Dénomination sociale exacte (telle qu'au RC). */
  name: "TECHPAL",
  /** Forme juridique : SARL, SARL AU, SA... */
  legalForm: "",
  /** Capital social en dirhams, ex. "100 000 MAD". */
  capital: "",
  /** Registre de commerce, ex. "RC Casablanca 123456". */
  rc: "",
  /** Identifiant Commun de l'Entreprise (15 chiffres). */
  ice: "",
  /** Identifiant fiscal. */
  if: "",
  /** Numéro de patente / taxe professionnelle. */
  patente: "",
  /** Adresse du siège social. */
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
  fr: "27 octobre 2026",
  en: "27 October 2026",
} as const;
