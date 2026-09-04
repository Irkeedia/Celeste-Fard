import type { Bi } from "../shared/lang";

/**
 * TEXTES DES CGU — francais et anglais cote a cote.
 *
 * Colocalise avec la page, comme `contact-textes.ts` : chaque page
 * secondaire porte ses propres textes plutot que de gonfler
 * `shared/textes.ts`, reserve au contenu du site vitrine.
 *
 * EXCEPTION EDITORIALE — c'est le seul endroit du site ou la ligne
 * editoriale ne s'applique pas cote anglais. Le francais garde le ton du
 * projet (c'est la version d'origine, on n'y touche pas) ; l'anglais est
 * une traduction de commodite, en registre juridique neutre : pas
 * d'humour, pas de voix de Celeste, aucune clause ajoutee ni retiree.
 *
 * Les faits (noms, adresses, e-mails, dates, juridiction) sont
 * strictement identiques dans les deux langues, et viennent de
 * `shared/legal-info.ts` quand ils y figurent.
 */

export const TCgu = {
  /* ---------------------------------------------------------------
     Avertissement de traduction — affiche UNIQUEMENT en anglais.
     Ce sont des CGU de droit francais : la traduction n'a aucune valeur
     juridique. Meme formulation et meme placement que dans
     `mentions-legales/mentions-textes.ts`, pour que les deux pages
     legales portent exactement le meme avertissement.
     La version francaise existe pour satisfaire le type `Bi` et
     documenter l'intention ; elle n'est jamais rendue.
     --------------------------------------------------------------- */
  avertissementTraduction: {
    fr: "Cette version anglaise est fournie à titre indicatif. Seule la version française fait foi.",
    en: "This English version is provided for convenience only. Only the French version is legally binding.",
  } satisfies Bi,

  /* --- Ponctuation dependante de la langue ---
     Le francais met une espace insecable avant « : » et « ; », pas
     l'anglais. Ces deux cles evitent de dupliquer la regle partout. */
  deuxPoints: { fr: " :", en: ":" } satisfies Bi,
  pointVirgule: { fr: " ;", en: ";" } satisfies Bi,
  et: { fr: "et", en: "and" } satisfies Bi,

  /* --- En-tete --- */
  eyebrow: {
    fr: "RÈGLES DU CLUB (VERSION SINCÈRE)",
    en: "TERMS OF USE",
  } satisfies Bi,
  titre: {
    fr: "Conditions générales d’utilisation",
    en: "Terms of use",
  } satisfies Bi,
  lede: {
    fr: "Bienvenue. Avant de scroller, écouter, ou t’imaginer en VIP sur un yacht (spoiler : il n’y en a pas), voici comment fonctionne ce site. En entrant, tu acceptes ces conditions. Si tu n’es pas d’accord, tu peux partir sans drama : je déteste les photos, pas les visiteurs polis.",
    en: "Welcome. Before you browse or listen, here is how this website works. By accessing it, you accept these terms. If you do not agree with them, you are free to leave.",
  } satisfies Bi,

  /* --- Article 1 — Objet du site --- */
  a1titre: { fr: "Objet du site", en: "Purpose of the website" } satisfies Bi,
  a1p1a: { fr: "Le site", en: "The website" } satisfies Bi,
  a1p1b: {
    fr: "est un projet artistique et narratif publié par",
    en: "is an artistic and narrative project published by",
  } satisfies Bi,
  a1p1c: { fr: "créé par", en: "created by" } satisfies Bi,
  a1p1d: {
    fr: "Il présente l’univers d’une artiste fictive, sa musique, son storytelling, des visuels et, éventuellement, une boutique merchandising.",
    en: "It presents the world of a fictional artist, her music, her storytelling, visual content and, where applicable, a merchandising shop.",
  } satisfies Bi,
  a1p2: {
    fr: "Ce n’est ni un journal d’information, ni un conseil médical, ni un cours de physique quantique certifié. Si tu appliques mes paroles à un examen, c’est à tes risques (et Jenny ne pourra pas te recadrer).",
    en: "It is neither a news publication, nor medical advice, nor a certified course in quantum physics. Any use of the lyrics published here, for instance in an academic context, is at your own risk.",
  } satisfies Bi,

  /* --- Article 2 — Fiction et intelligence artificielle --- */
  a2titre: {
    fr: "Celeste Fard = fiction + intelligence artificielle",
    en: "Celeste Fard = fiction + artificial intelligence",
  } satisfies Bi,
  a2p1a: {
    fr: "Nouveau cadre légal oblige à être explicite, donc je le fais avec le sourire :",
    en: "New legal requirements call for an explicit statement, so here it is:",
  } satisfies Bi,
  a2p1fort: {
    fr: "Celeste Fard est une représentation artistique produite avec de l’intelligence artificielle",
    en: "Celeste Fard is an artistic representation produced with artificial intelligence",
  } satisfies Bi,
  a2p1b: {
    fr: "Elle n’existe pas dans le monde réel. Pas de date de naissance officielle à l’état civil, pas de vrai yacht, pas de vraie sœur Jenny qui signe des autographes dans la rue (désolée pour la magie, merci pour l’honnêteté).",
    en: "She does not exist in the real world. There is no official birth record, no actual yacht, and no real sister named Jenny signing autographs in the street.",
  } satisfies Bi,
  a2p2terme: {
    fr: "Intelligence artificielle",
    en: "Artificial intelligence",
  } satisfies Bi,
  a2p2: {
    fr: "technologies informatiques capables de produire ou d’aider à produire du texte, de l’image, de l’audio ou de la mise en page en s’inspirant de modèles appris sur de grandes quantités de données. Traduction humaine : des algorithmes qui bossent vite ; un humain qui vérifie (ou pas) ce qu’ils sortent.",
    en: "computer technologies capable of producing, or helping to produce, text, images, audio or page layouts on the basis of models trained on large volumes of data. In plain terms: algorithms that work fast, and a human who may or may not check what they produce.",
  } satisfies Bi,
  a2p3: {
    fr: "En utilisant ce site, tu reconnais que l’expérience proposée mélange création humaine, direction artistique et contenus synthétiques. C’est voulu. C’est même le sujet.",
    en: "By using this website, you acknowledge that the experience offered combines human creation, artistic direction and synthetic content. This is intentional, and it is the very subject of the project.",
  } satisfies Bi,

  /* --- Article 3 — Acces au site --- */
  a3titre: { fr: "Accès au site", en: "Access to the website" } satisfies Bi,
  a3p1a: {
    fr: "Le site est accessible gratuitement, 24h/24 sauf maintenance, panne, ou crise existentielle du serveur.",
    en: "The website is freely accessible, 24 hours a day, except in the event of maintenance, failure or server downtime.",
  } satisfies Bi,
  a3p1b: {
    fr: "peuvent suspendre, modifier ou retirer des contenus sans préavis, parce qu’un projet artistique vit (et parfois mutile ses propres photos).",
    en: "may suspend, modify or withdraw content without notice, as an artistic project evolves over time.",
  } satisfies Bi,

  /* --- Article 4 — Propriete intellectuelle --- */
  a4titre: {
    fr: "Propriété intellectuelle",
    en: "Intellectual property",
  } satisfies Bi,
  a4p1: {
    fr: "Tous les éléments du site (textes, visuels, logo, structure, code, nom Celeste Fard, univers narratif) sont protégés. La propriété appartient à",
    en: "All elements of the website (texts, visuals, logo, structure, code, the name Celeste Fard and the narrative universe) are protected. Ownership belongs to",
  } satisfies Bi,
  a4p2: {
    fr: "Tu peux consulter, écouter, partager un lien vers le site. Tu ne peux pas copier l’intégralité du projet pour le revendre, le faire passer pour le tien, ou entraîner un modèle dessus sans autorisation écrite. Même avec un bon filtre Instagram.",
    en: "You may view the website, listen to its content and share a link to it. You may not copy the project as a whole in order to resell it, present it as your own, or train a model on it without prior written authorisation.",
  } satisfies Bi,

  /* --- Article 5 — Comportement des utilisateurs --- */
  a5titre: {
    fr: "Comportement des utilisateurs",
    en: "User conduct",
  } satisfies Bi,
  a5intro: { fr: "Tu t’engages à ne pas", en: "You agree not to" } satisfies Bi,
  a5li1: {
    fr: "Publier via nos formulaires du contenu illégal, haineux ou diffamatoire",
    en: "Publish illegal, hateful or defamatory content through our forms",
  } satisfies Bi,
  a5li2: {
    fr: "Tenter de pirater, surcharger ou casser le site (on a déjà assez de paradoxes)",
    en: "Attempt to hack, overload or break the website",
  } satisfies Bi,
  a5li3: {
    fr: "Usurper l’identité de Celeste, de Jenny, ou de",
    en: "Impersonate Celeste, Jenny, or",
  } satisfies Bi,
  a5li4: {
    fr: "Utiliser le site pour harceler qui que ce soit, réel ou fictif.",
    en: "Use the website to harass anyone, whether real or fictional.",
  } satisfies Bi,

  /* --- Article 6 — Boutique et commandes --- */
  a6titre: { fr: "Boutique & commandes", en: "Shop & orders" } satisfies Bi,
  a6p1a: {
    fr: "Les produits présentés (CD, t shirt, mug...) peuvent être indicatifs ou en cours de déploiement. Les prix affichés, visuels et disponibilités peuvent évoluer. Une commande n’est définitive que si un processus de paiement clairement indiqué le confirme. En cas de doute, écris à",
    en: "The products shown (CD, t shirt, mug...) may be indicative or still being rolled out. Displayed prices, visuals and availability are subject to change. An order is final only where a clearly indicated payment process confirms it. If in doubt, write to",
  } satisfies Bi,
  a6p1b: {
    fr: "avant de vider ton compte en gâteaux (métaphoriquement).",
    en: "before proceeding with a purchase.",
  } satisfies Bi,

  /* --- Article 7 — Responsabilite --- */
  a7titre: { fr: "Responsabilité", en: "Liability" } satisfies Bi,
  a7p1: {
    fr: "Le site est fourni « en l’état ». On fait de notre mieux pour une expérience sincère et stable, mais on ne garantit pas l’absence totale de bugs, de liens morts, ou de morceaux qui restent en boucle dans ta tête à 2h du matin.",
    en: "The website is provided “as is”. We do our best to offer a sincere and stable experience, but we do not guarantee the complete absence of bugs or broken links.",
  } satisfies Bi,
  a7p2: {
    fr: "ne sauraient être tenus responsables des dommages indirects liés à l’utilisation du site, ni de l’interprétation littérale de paroles de chansons écrites entre deux humeurs.",
    en: "shall not be held liable for indirect damages arising from use of the website, nor for any literal interpretation of song lyrics.",
  } satisfies Bi,

  /* --- Article 8 — Liens externes --- */
  a8titre: { fr: "Liens externes", en: "External links" } satisfies Bi,
  a8p1: {
    fr: "Le site peut contenir des liens vers des services tiers (réseaux sociaux, hébergeurs audio, etc.). On ne contrôle pas leurs contenus. Clique avec la même prudence que quand tu ouvres un DM suspect, mais avec plus de style.",
    en: "The website may contain links to third-party services (social networks, audio hosting platforms, etc.). We do not control their content. Please follow such links with the usual caution.",
  } satisfies Bi,

  /* --- Article 9 — Modification des CGU --- */
  a9titre: {
    fr: "Modification des CGU",
    en: "Changes to these terms",
  } satisfies Bi,
  a9p1: {
    fr: "Ces conditions peuvent être mises à jour pour suivre la loi, le projet, ou une nouvelle humeur du mardi. La version en vigueur est celle publiée sur cette page, avec sa date de révision ci-dessous.",
    en: "These terms may be updated to reflect changes in the law or in the project. The version in force is the one published on this page, together with the revision date shown below.",
  } satisfies Bi,

  /* --- Article 10 — Droit applicable et contact --- */
  a10titre: {
    fr: "Droit applicable & contact",
    en: "Governing law & contact",
  } satisfies Bi,
  a10p1: {
    fr: "Les présentes CGU sont soumises au droit français. En cas de litige, et après tentative de résolution amiable (toujours mieux qu’un solo de colère), les tribunaux compétents seront ceux prévus par la loi.",
    en: "These terms of use are governed by French law. In the event of a dispute, and after an attempt at amicable resolution, the competent courts shall be those designated by law.",
  } satisfies Bi,
  a10p2: {
    fr: "Questions légales, signalements ou messages sincères",
    en: "Legal questions, reports or genuine messages",
  } satisfies Bi,
  a10revision: {
    fr: "Dernière mise à jour : mai 2026.",
    en: "Last updated: May 2026.",
  } satisfies Bi,

  /* --- Renvoi vers les mentions legales --- */
  retourA: {
    fr: "Pour l’identité de l’éditeur, l’hébergement et le debrief intelligence artificielle, voir les",
    en: "For the publisher’s identity, hosting details and the artificial intelligence disclosure, see the",
  } satisfies Bi,
  retourLien: { fr: "mentions légales", en: "legal notice" } satisfies Bi,
} as const;
