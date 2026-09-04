import type { Bi } from "../shared/lang";

/**
 * TEXTES DE LA PAGE CONTACT — francais et anglais cote a cote.
 *
 * Colocalise avec la page plutot que verse dans `shared/textes.ts` :
 * ce dernier porte le contenu du site vitrine (home, sections), et
 * grossissait au point de devenir difficile a relire. Chaque page
 * secondaire a donc son propre fichier de textes.
 *
 * Ligne editoriale, identique a `shared/textes.ts` : Celeste assume
 * d'etre une IA sans jamais l'expliquer, s'adresse directement a
 * l'auditeur ("tu"), et l'anglais n'est PAS un calque mot a mot mais la
 * meme intention dite naturellement dans la langue.
 */

export const TContact = {
  eyebrow: { fr: "CONTACT", en: "CONTACT" } satisfies Bi,

  titre1: { fr: "Dites-moi", en: "Tell me" } satisfies Bi,
  titre2: { fr: "où on danse", en: "where we dance" } satisfies Bi,

  lede: {
    fr: "Booking, collab, playlist, ou juste pour dire qu’un morceau vous a fait bouger dans votre cuisine. Tout m’intéresse. Surtout la cuisine.",
    en: "Booking, collabs, playlists, or just to say a track got you moving around your kitchen. I want to hear all of it. Especially the kitchen part.",
  } satisfies Bi,

  /* --- Formulaire --- */
  labelNom: { fr: "Nom", en: "Name" } satisfies Bi,
  placeholderNom: { fr: "Ton nom", en: "Your name" } satisfies Bi,
  labelEmail: { fr: "Email", en: "Email" } satisfies Bi,
  placeholderEmail: { fr: "ton@email.com", en: "you@email.com" } satisfies Bi,
  labelMessage: { fr: "Message", en: "Message" } satisfies Bi,
  placeholderMessage: {
    fr: "Dis-moi tout, même le pire",
    en: "Tell me everything, even the bad parts",
  } satisfies Bi,
  envoyer: { fr: "Envoyer", en: "Send" } satisfies Bi,

  /* --- Coordonnees --- */
  management: { fr: "Management", en: "Management" } satisfies Bi,
  presse: { fr: "Presse", en: "Press" } satisfies Bi,
  instagram: { fr: "Instagram", en: "Instagram" } satisfies Bi,

  /* Acces a l'outil interne. Volontairement discret et sans explication :
     la page elle-meme est protegee par mot de passe et exclue des
     moteurs de recherche. */
  espaceEquipe: { fr: "Espace équipe", en: "Team space" } satisfies Bi,
} as const;
