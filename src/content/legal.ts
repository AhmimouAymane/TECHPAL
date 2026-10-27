/**
 * Données légales de l'éditeur et de l'hébergeur.
 *
 * Les champs vides ne sont pas affichés sur le site : ils attendent les
 * informations officielles. Ne jamais renseigner une valeur approximative ici.
 */
export const legalCompany = {
  /** Dénomination sociale exacte (telle qu'au RC). */
  name: "TECHPAL",
  /** Forme juridique. */
  legalForm: "Société à responsabilité limitée (SARL)",
  /** Capital social. */
  capital: "100 000 MAD",
  /** Registre de commerce. */
  rc: "556619 — Tribunal de commerce de Casablanca",
  /** Identifiant Commun de l'Entreprise (15 chiffres). */
  ice: "003131517000061",
  /** Identifiant fiscal. */
  if: "",
  /** Numéro de patente / taxe professionnelle. */
  patente: "",
  /** Objet social (activité déclarée au RC). */
  activity: {
    fr: "Services informatiques : conception et intégration de solutions IT, vente et installation de matériel informatique, développement et maintenance de systèmes d'information.",
    en: "IT services: design and integration of IT solutions, sale and installation of computer hardware, development and maintenance of information systems.",
  },
  /** Siège social enregistré au registre de commerce. */
  registeredAddress: "17, quartier Yakoub El Mansour, n° 238, 2e étage, Casablanca, Maroc",
  /** Adresse d'exploitation / bureau (si différente du siège). */
  officeAddress: "Bureau B3, Rue Ettah, Casablanca 20000, Maroc",
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
