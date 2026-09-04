import type { Bi } from "../shared/lang";

/**
 * TEXTES DES MENTIONS LEGALES — francais et anglais cote a cote.
 *
 * Colocalise avec la page, comme `contact/contact-textes.ts` : chaque
 * page secondaire porte ses propres textes plutot que de gonfler
 * `shared/textes.ts`, reserve au site vitrine.
 *
 * EXCEPTION EDITORIALE — c'est le seul endroit du site ou la voix de
 * Celeste ne s'applique pas cote anglais. Le francais reste tel qu'il a
 * ete ecrit (c'est la version qui fait foi, on n'y touche pas), mais la
 * traduction est volontairement en registre juridique neutre : les
 * ornements comiques n'ont aucune portee legale et brouilleraient un
 * texte obligatoire.
 *
 * VALEUR JURIDIQUE — ces mentions relevent du droit francais (LCEN).
 * Une traduction n'a aucune valeur juridique : seule la version
 * francaise fait foi. D'ou `avertissementTraduction`, affiche en tete de
 * page uniquement en anglais (cf. `mentions-content.tsx`).
 *
 * TERMES INTRADUISIBLES — « directeur de la publication » et
 * « contrefacon » n'ont pas d'equivalent exact en droit anglo-saxon. On
 * donne la traduction approchante suivie du terme francais entre
 * parentheses, plutot que d'inventer un faux equivalent qui donnerait
 * une fausse impression de precision.
 *
 * PONCTUATION — la ponctuation double est incluse dans les chaines (et
 * non ajoutee en JSX comme sur la page contact) : le francais demande
 * une espace avant « : », l'anglais non. Un seul gabarit JSX ne peut
 * pas servir les deux, c'est donc la traduction qui porte le signe.
 */

export const TMentions = {
  /* ---------------------------------------------------------------
     Avertissement de traduction — affiche UNIQUEMENT en anglais.
     La version francaise existe pour satisfaire le type `Bi` et
     documenter l'intention ; elle n'est jamais rendue.
     --------------------------------------------------------------- */
  avertissementTraduction: {
    fr: "Cette version anglaise est fournie à titre indicatif. Seule la version française fait foi.",
    en: "This English version is provided for convenience only. Only the French version is legally binding.",
  } satisfies Bi,

  /* --- En-tete --- */
  eyebrow: {
    fr: "TRANSPARENCE RADICALE (MÊME ICI)",
    en: "RADICAL TRANSPARENCY (EVEN HERE)",
  } satisfies Bi,

  titre: { fr: "Mentions légales", en: "Legal notice" } satisfies Bi,

  lede: {
    fr: "Oui, même un site pop couture avec des gâteaux et de la physique quantique doit avoir sa page légale. Promis : on reste clairs, sans jargon de cabinet, et avec un minimum d’autodérision. Parce que la loi, ça compte. Comme Jenny qui me recadre quand je pars trop loin.",
    en: "Even a pop-couture website with cakes and quantum physics needs a legal page. This one is written to stay clear and free of legal jargon, because the law matters.",
  } satisfies Bi,

  /* --- Editeur --- */
  editeurEyebrow: { fr: "ÉDITEUR", en: "PUBLISHER" } satisfies Bi,
  editeurTitre: {
    fr: "Qui tient la plume (et le code)",
    en: "Who runs the site (and the code)",
  } satisfies Bi,

  labelSite: { fr: "Site :", en: "Website:" } satisfies Bi,
  labelUrl: { fr: "URL :", en: "URL:" } satisfies Bi,
  labelCreePar: { fr: "Créé par :", en: "Created by:" } satisfies Bi,
  labelEditeurDuSite: {
    fr: "Éditeur du site :",
    en: "Site publisher (éditeur du site):",
  } satisfies Bi,
  labelDirecteurPublication: {
    fr: "Directeur de la publication :",
    en: "Publication director (directeur de la publication):",
  } satisfies Bi,
  labelProprieteProjet: {
    fr: "Propriété du projet :",
    en: "Project ownership:",
  } satisfies Bi,
  /* Aparte comique du francais, sans portee juridique : vide en anglais.
     L'espace initiale est dans la chaine pour ne pas laisser d'espace
     orpheline apres le nom quand la valeur anglaise est vide. */
  proprieteNote: { fr: " (oui, c’est bien la mienne)", en: "" } satisfies Bi,
  labelContactLegal: { fr: "Contact légal :", en: "Legal contact:" } satisfies Bi,

  /* --- Representation artistique / IA --- */
  iaEyebrow: {
    fr: "REPRÉSENTATION ARTISTIQUE",
    en: "ARTISTIC REPRESENTATION",
  } satisfies Bi,
  iaTitre: {
    fr: "Celeste Fard n’est pas une humaine qui oublie ses mails",
    en: "Celeste Fard is not a real person",
  } satisfies Bi,

  iaDeclarationDebut: {
    fr: "À cause du nouveau cadre légal sur les contenus synthétiques, on le dit clairement :",
    en: "Under the legal framework applicable to synthetic content, we state it plainly:",
  } satisfies Bi,
  iaDeclarationFort: {
    fr: "Celeste Fard est une représentation artistique générée avec de l’intelligence artificielle",
    en: "Celeste Fard is an artistic representation generated with artificial intelligence",
  } satisfies Bi,
  iaDeclarationFin: {
    fr: ". Pas une vraie personne, pas une fausse arnaque non plus : un personnage de fiction assumé, avec une voix, une esthétique et une histoire écrites pour l’art et l’expérimentation.",
    en: ". Not a real person, and not an attempt to deceive anyone either: an openly fictional character, with a voice, an aesthetic and a story written for art and experimentation.",
  } satisfies Bi,

  iaDefinitionFort: {
    fr: "Intelligence artificielle",
    en: "Artificial intelligence",
  } satisfies Bi,
  iaDefinitionMilieu: {
    fr: ", ça veut dire quoi ici ? C’est un ensemble de programmes informatiques capables d’imiter certaines tâches humaines (écrire, composer, générer des images, structurer un récit...) sans avoir besoin de dormir, de café, ou de se demander si ses cheveux roux sont naturels. En bref : l’ordinateur improvise, l’humain (",
    en: ", in this context, means a set of computer programs able to imitate certain human tasks: writing, composing, generating images, structuring a narrative, and so on. In short: the computer produces, and the human (",
  } satisfies Bi,
  iaDefinitionFin: {
    fr: ") cadre, relit, et assume le résultat.",
    en: ") frames the work, reviews it, and takes responsibility for the result.",
  } satisfies Bi,

  iaPortee: {
    fr: "Les textes, visuels, vidéos ou morceaux présentés dans l’univers Celeste Fard peuvent donc être créés ou assistés par intelligence artificielle. Si tu cherches une biographie Wikipedia vérifiable, tu es au mauvais endroit. Si tu cherches une expérience artistique honnête sur ce que l’intelligence artificielle peut raconter, bienvenue.",
    en: "The texts, images, videos and tracks presented within the Celeste Fard universe may therefore be created with, or assisted by, artificial intelligence. This site is not a verifiable biography of a real person: it is an artistic work about what artificial intelligence can tell.",
  } satisfies Bi,

  /* --- Propriete intellectuelle --- */
  piEyebrow: {
    fr: "PROPRIÉTÉ INTELLECTUELLE",
    en: "INTELLECTUAL PROPERTY",
  } satisfies Bi,
  piTitre: {
    fr: "Ce site m’appartient (enfin, à Mathieu)",
    en: "Ownership of the site",
  } satisfies Bi,

  piDebut: { fr: "L’ensemble du site", en: "The whole of the" } satisfies Bi,
  piMilieu: {
    fr: "(structure, textes originaux, direction artistique, code, charte visuelle, univers narratif) est la propriété de",
    en: "website (structure, original texts, art direction, code, visual identity, narrative universe) is the property of",
  } satisfies Bi,
  piFin: {
    fr: ", sauf mention contraire pour des contenus tiers.",
    en: ", except where otherwise indicated for third-party content.",
  } satisfies Bi,

  piContrefacon: {
    fr: "Toute reproduction, représentation, modification ou exploitation non autorisée peut constituer une contrefaçon. En langage clair : ne republie pas le site en entier en prétendant l’avoir inventé un dimanche pluvieux.",
    en: "Any unauthorised reproduction, representation, modification or exploitation may constitute infringement (contrefaçon) under French law. In plain terms: do not republish the site and present it as your own creation.",
  } satisfies Bi,

  /* --- Hebergement --- */
  hebergementEyebrow: { fr: "HÉBERGEMENT", en: "HOSTING" } satisfies Bi,
  hebergementTitre: {
    fr: "Où vit le site quand il n’est pas en scène",
    en: "Where the site is hosted",
  } satisfies Bi,
  labelHebergeur: { fr: "Hébergeur :", en: "Host:" } satisfies Bi,
  labelAdresse: { fr: "Adresse :", en: "Address:" } satisfies Bi,

  /* --- Donnees et cookies --- */
  donneesEyebrow: { fr: "DONNÉES & COOKIES", en: "DATA & COOKIES" } satisfies Bi,
  donneesTitre: {
    fr: "Ce qu’on collecte (spoiler : pas grand-chose de glamour)",
    en: "What we collect",
  } satisfies Bi,
  donneesCollecte: {
    fr: "Si tu utilises le formulaire de contact ou nous écris par mail, on traite les données nécessaires pour te répondre (nom, email, message). Pas de revente à des annonceurs, pas de profilage mystérieux : on n’est pas une plateforme de pub, on est un projet artistique avec une boîte mail.",
    en: "If you use the contact form or write to us by email, we process the data needed to reply to you (name, email address, message). That data is not sold to advertisers and is not used for profiling: this is an artistic project with a mailbox, not an advertising platform.",
  } satisfies Bi,
  donneesCookies: {
    fr: "Le site peut utiliser des cookies techniques ou de mesure d’audience selon la configuration de l’hébergeur. Rien d’obligatoire pour admirer Celeste en roux naturel (fictif).",
    en: "The site may use technical or audience-measurement cookies depending on the host’s configuration. None of them are required in order to browse the site.",
  } satisfies Bi,

  /* --- Credits --- */
  creditsEyebrow: { fr: "CRÉDITS", en: "CREDITS" } satisfies Bi,
  creditsTitre: {
    fr: "Remerciements sans filtre",
    en: "Credits",
  } satisfies Bi,
  creditsDebut: {
    fr: "Conception, direction artistique et développement :",
    en: "Design, art direction and development:",
  } satisfies Bi,
  creditsMilieu: {
    fr: ", sous la direction éditoriale de",
    en: ", under the editorial direction of",
  } satisfies Bi,
  creditsFin: {
    fr: ". Univers narratif et personnage Celeste Fard : œuvre de fiction assistée par intelligence artificielle, assumée comme telle.",
    en: ". Narrative universe and the Celeste Fard character: a work of fiction assisted by artificial intelligence, presented openly as such.",
  } satisfies Bi,

  /* --- Renvoi vers les CGU --- */
  retourTexte: {
    fr: "Tu veux aussi les règles du jeu ? Lis les",
    en: "Looking for the rules of the game? Read the",
  } satisfies Bi,
  retourLien: {
    fr: "conditions générales d’utilisation",
    en: "terms of use",
  } satisfies Bi,
} as const;
