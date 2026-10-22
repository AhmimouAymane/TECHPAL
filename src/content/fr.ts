/**
 * Contenu français — source de vérité du type `Dict`.
 * Textes de structure (placeholders) : à remplacer par la copie définitive.
 */
const fr = {
  nav: {
    expertise: "Expertise",
    staffing: "Staffing",
    projets: "Projets",
    apropos: "À propos",
    contact: "Contact",
    cta: "Démarrer un projet",
    menu: "Menu",
    close: "Fermer",
    language: "Langue",
  },
  hero: {
    hint: "Défilez pour explorer",
    cta1: "Démarrer un projet",
    cta2: "Découvrir l'expertise",
    scenes: [
      {
        label: "Ingénierie digitale · Casablanca",
        title: "Votre partenaire IT de confiance.",
        text: "Du support informatique à l'ingénierie logicielle, nous couvrons l'ensemble de vos besoins technologiques.",
      },
      {
        label: "Approche",
        title: "Nous concevons des systèmes qui tiennent en production.",
        text: "Quatre domaines, une seule exigence : du concret, pas des démonstrations.",
      },
      {
        label: "Logiciel",
        title: "Applications web & mobiles sur mesure.",
        text: "Plateformes métier, APIs et intégrations avec vos systèmes existants.",
      },
      {
        label: "Intelligence artificielle",
        title: "L'IA en production, pas en vitrine.",
        text: "Automatisation, assistants sur vos données, aide à la décision.",
      },
      {
        label: "Cloud & infrastructure",
        title: "Cloud, réseau et matériel, de bout en bout.",
        text: "Hébergement, réseaux d'entreprise, déploiement, supervision et support.",
      },
    ],
  },
  marquee: { label: "Technologies & partenaires" },
  reel: {
    kicker: "Showreel",
    title: "La signature TECHPAL, image par image.",
    note: "Séquence pilotée par votre défilement",
    labels: ["Intro", "Réseau", "Logiciel", "Production", "Cloud", "Marque"],
  },
  services: {
    kicker: "Ce que nous faisons",
    title: "Nous concevons et exploitons des produits digitaux pour des entreprises ambitieuses.",
    intro:
      "Du site de lancement à la plateforme métier complète. On commence par le pourquoi, puis on conçoit et on construit le reste.",
    link: "En savoir plus sur nous",
    items: [
      {
        n: "001",
        title: "Ingénierie logicielle",
        desc: "Applications web & mobiles, plateformes métier, APIs.",
        points: ["Applications web & mobiles", "Plateformes métier", "APIs & intégrations"],
      },
      {
        n: "002",
        title: "Intelligence artificielle",
        desc: "Intégration d'IA et automatisation au service de cas d'usage concrets.",
        points: ["Intégration d'IA", "Automatisation", "Applications intelligentes"],
      },
      {
        n: "003",
        title: "Cloud & infrastructure",
        desc: "Cloud, réseaux, déploiement et supervision.",
        points: ["Cloud & hébergement", "Réseaux LAN/WAN & Wi-Fi", "Déploiement & supervision"],
      },
      {
        n: "004",
        title: "Réseaux & matériel",
        desc: "Fourniture, installation et maintenance de votre matériel et réseau.",
        points: ["Fourniture de matériel", "Câblage & réseau", "Maintenance"],
      },
      {
        n: "005",
        title: "Support & infogérance",
        desc: "Un interlocuteur unique pour tout votre IT au quotidien.",
        points: ["Support réactif", "Infogérance complète", "Supervision proactive"],
      },
      {
        n: "006",
        title: "Transformation digitale",
        desc: "Du processus métier au produit en production.",
        points: ["Audit & cadrage", "Feuille de route", "Mise en production"],
      },
    ],
  },
  work: {
    kicker: "Projets sélectionnés",
    title: "Une sélection de projets où le design et la technique se rejoignent.",
    intro: "Plusieurs missions sont couvertes par des accords de confidentialité.",
    viewAll: "Voir tous les projets",
    confidential: "Réalisation confidentielle",
    labels: { createdAt: "Réalisé le", name: "Nom", type: "Type", scope: "Périmètre", stack: "Stack", story: "Le projet", points: "Points clés" },
  },
  stats: {
    kicker: "En chiffres",
    items: [
      { value: "2022", label: "Fondée à Casablanca" },
      { value: "< 24 h", label: "Réponse sous 24 h ouvrées" },
      { value: "24/7", label: "Supervision & support" },
      { value: "FR·EN·AR", label: "Équipe trilingue" },
    ],
  },
  narrative: {
    blocks: [
      {
        kicker: "Méthode",
        title: "Cinq étapes, les mêmes pour chaque mission.",
        text: "Découvrir, concevoir, développer, intégrer, faire évoluer. Vous validez chaque étape avant la suivante.",
      },
      {
        kicker: "Engagements",
        title: "Des délais tenus et une facturation transparente.",
        text: "Périmètres écrits, devis fermes, pas de frais cachés. La confiance se construit sur la clarté.",
      },
    ],
  },
  cta: {
    kicker: "Restons en contact",
    title: "Construisons quelque chose de mémorable.",
    text: "Une idée, un produit, une vision ? Parlons-en : réponse sous 24 h ouvrées.",
    button: "Démarrer un projet",
  },
  staffing: {
    kicker: "Staffing IT",
    title: "Les bons profils, au bon moment.",
    intro:
      "TECHPAL Staffing place des talents IT pré-qualifiés dans vos équipes : développeurs, data, cloud et support. Intégration rapide, remplacement garanti, zéro paperasse.",
    unitsKicker: "Qui pouvez-vous renforcer",
    unitsTitle: "Des profils qui rejoignent vos équipes, pas votre paperasse.",
    units: [
      {
        title: "Ingénieurs logiciels",
        text: "Backend, frontend, full-stack et mobile. Des développeurs opérationnels dès la première semaine, sans cycle de recrutement interminable.",
      },
      {
        title: "Data & IA",
        text: "Data engineers, data analysts et développeurs IA pour transformer vos données en avantage concret.",
      },
      {
        title: "Cloud, support & infrastructure",
        text: "Administrateurs cloud, DevOps, techniciens support et réseau, prêts à opérer vos environnements au quotidien.",
      },
    ],
    processKicker: "Comment ça marche",
    processTitle: "Quatre étapes, un profil en poste.",
    process: [
      { title: "Exprimez le besoin", text: "Stack, niveau d'expérience, durée : un brief de 30 minutes suffit." },
      { title: "Recevez les profils", text: "2 à 3 profils pré-qualifiés sous 48 h ouvrées, CV et résultats de tests à l'appui." },
      { title: "Validez & intégrez", text: "Vous choisissez, nous gérons contrat, matériel et onboarding." },
      { title: "Suivez sereinement", text: "Point de qualité mensuel et remplacement garanti pendant 90 jours." },
    ],
    vettingKicker: "Sélection",
    vettingTitle: "Moins de 5% des candidats rejoignent le réseau.",
    vettingText: "Chaque candidat passe quatre filtres avant d'arriver chez vous. La barre monte, la qualité reste.",
    vetting: [
      { title: "Présélection", text: "CV, parcours et vérification des références." },
      { title: "Entretien technique", text: "Conduit par nos ingénieurs seniors, pas par des RH." },
      { title: "Test pratique", text: "Exercice réel sur la stack de la mission." },
      { title: "Soft skills", text: "Communication, autonomie, français, anglais et arabe." },
    ],
    stats: [
      { value: "48 h", label: "Premiers profils reçus" },
      { value: "< 7 j", label: "Intégration moyenne" },
      { value: "95%", label: "Taux de rétention" },
      { value: "90 j", label: "Garantie de remplacement" },
    ],
    partnerKicker: "Partenariats",
    partnerTitle: "Des équipes qui grandissent avec nous.",
    partnerText:
      "Notre staffing alimente en continu les équipes de partenaires comme Klaim, la fintech santé basée à Dubaï : profils pré-qualifiés, suivi de qualité et engagement de résultat.",
    faqKicker: "FAQ",
    faqTitle: "Questions fréquentes.",
    faq: [
      {
        q: "Sous quel modèle placez-vous les profils ?",
        a: "Régie ou forfait, via un contrat de prestation clair. Les profils restent salariés TECHPAL : aucune charge, aucune paperasse pour vous.",
      },
      {
        q: "Que se passe-t-il si le profil ne convient pas ?",
        a: "Remplacement garanti pendant 90 jours, sans frais supplémentaires. Notre taux de rétention de 95% montre que c'est rarement nécessaire.",
      },
      {
        q: "Travaillez-vous à distance ou sur site ?",
        a: "Les deux : présentiel à Casablanca, hybride ou full remote selon votre organisation.",
      },
      {
        q: "Placez-vous des profils hors IT ?",
        a: "Notre cœur de métier reste l'IT. Chaque demande hors périmètre est étudiée au cas par cas.",
      },
    ],
    cta: {
      kicker: "Staffing",
      title: "Un besoin urgent ?",
      text: "Décrivez le profil recherché : premiers CV sous 48 h ouvrées.",
      button: "Demander des profils",
    },
  },
  about: {
    kicker: "À propos",
    title: "Un partenaire IT qui pense produit.",
    intro:
      "TECHPAL réunit l'ingénierie logicielle et les métiers historiques de l'IT pour offrir aux entreprises un partenaire unique, du poste de travail au produit digital.",
    values: [
      { title: "Rigueur", text: "Devis tenus, délais respectés, travail documenté." },
      { title: "Proximité", text: "Basés à Casablanca, joignables et présents sur site." },
      { title: "Transparence", text: "Périmètres écrits, factures détaillées, pas de frais cachés." },
      { title: "Fiabilité", text: "Des systèmes qui fonctionnent en production, supervisés dans la durée." },
    ],
    teamTitle: "L'équipe",
    teamText: "Une équipe pluridisciplinaire basée à Casablanca, alliant expertise terrain et ingénierie logicielle.",
    members: [
      { name: "Basma Bennasser", role: "Directrice générale", photo: "/team/basma-bennasser.png", tags: ["Stratégie", "Management", "Partenariats"] },
      { name: "Abdelhadi Laasi", role: "Développeur web & Odoo", photo: "/team/abdelhadi-laasi.png", tags: ["Web", "Odoo", "ERP"] },
      { name: "Aymane Ahmimou", role: "Ingénieur R&D — mobile & IA", photo: "/team/aymane-ahmimou.jpeg", tags: ["Mobile", "IA", "R&D"] },
      { name: "Youssef Maimouni", role: "Ingénieur data science & AI", photo: "/team/youssef-maimouni.jpg", tags: ["NLP", "Data science", "Agent AI"] },
      { name: "Abderrahman Barni", role: "Technicien support IT", photo: "/team/abderrahman-barni.png", tags: ["Support", "Matériel", "Helpdesk"] },
      { name: "Oumama Agdour", role: "Consultante data & IA — web & Odoo", photo: "/team/oumama-agdour.png", tags: ["Data", "IA", "Odoo", "Web"] },
      { name: "Abdelmouiz Kadouaoui", role: "Ingénieur AI & Data", photo: "/team/abdelmouiz-kadouaoui.jpg", tags: ["Machine learning", "Data engineering", "Python"] },
    ],
    teamNote: "Une équipe trilingue : français, anglais, arabe.",
  },
  contactPage: {
    kicker: "Contact",
    title: "Parlons de votre projet.",
    intro: "Décrivez votre besoin : nous revenons vers vous sous 24 h ouvrées.",
    infoTitle: "Coordonnées",
    form: {
      name: "Nom complet",
      email: "E-mail professionnel",
      company: "Société",
      message: "Votre message",
      messagePh: "Décrivez votre besoin en quelques lignes…",
      send: "Envoyer la demande",
      note: "Formulaire de démonstration — non connecté pour le moment.",
    },
  },
  legal: {
    mentionsTitle: "Mentions légales",
    privacyTitle: "Politique de confidentialité",
    draft: "Page en cours de rédaction. Contenu définitif à venir.",
    editor: "Éditeur du site",
  },
  footer: {
    tagline: "Partenaire d'ingénierie digitale de bout en bout, basé à Casablanca.",
    socialTitle: "Réseaux",
    pagesTitle: "Pages",
    contactTitle: "Contact",
    locationTitle: "Localisation",
    keepScrolling: "Continuer à défiler",
    rights: "Tous droits réservés.",
    legal: "Mentions légales",
    privacy: "Confidentialité",
    next: "page suivante",
  },
  meta: {
    home: {
      title: "TECHPAL | Ingénierie digitale de bout en bout à Casablanca",
      description:
        "TECHPAL conçoit logiciels, IA, cloud et infrastructures IT pour les entreprises ambitieuses. Matériel, réseau, support et infogérance inclus.",
    },
    expertise: { title: "Expertise | TECHPAL", description: "Ingénierie logicielle, IA, cloud, réseaux, support et infogérance." },
    staffing: { title: "Staffing IT | TECHPAL", description: "Talents IT pré-qualifiés intégrés à vos équipes : dev, data, cloud et support. Profils sous 48 h ouvrées." },
    projets: { title: "Projets | TECHPAL", description: "Réalisations TECHPAL : plateformes métier, applications, infrastructures." },
    apropos: { title: "À propos | TECHPAL", description: "TECHPAL, partenaire d'ingénierie digitale basé à Casablanca." },
    contact: { title: "Contact | TECHPAL", description: "Démarrez votre projet avec TECHPAL à Casablanca. Réponse sous 24 h ouvrées." },
  },
};

export type Dict = typeof fr;
export default fr;
