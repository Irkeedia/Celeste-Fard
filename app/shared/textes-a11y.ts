import type { Bi } from "./lang";

/**
 * LIBELLES D'ACCESSIBILITE — francais et anglais cote a cote.
 *
 * Depuis que le serveur rend l'ANGLAIS (voir `lang.tsx`), tout texte reste
 * en francais en dur s'affiche a un public anglophone. Le plus sournois :
 * les `aria-label`, jamais visibles a l'ecran, donc invisibles aussi a la
 * relecture — la page etait bilingue a l'oeil, pas a l'oreille.
 *
 * Ce fichier est volontairement SEPARE de `shared/textes.ts` : celui-ci
 * porte le contenu editorial (ce que Celeste raconte), celui-la porte la
 * plomberie d'interface (ce que le lecteur d'ecran annonce). Deux vies
 * differentes, deux fichiers.
 *
 * TON — les `aria-label` sont sobres et suivent le vocabulaire standard
 * ("Shuffle", "Previous track", "Back to home") : un lecteur d'ecran n'est
 * pas un endroit ou faire de l'humour. Les rares textes VISIBLES d'ici
 * gardent en revanche le ton du site.
 *
 * MARQUEURS — les libelles qui citent un morceau portent `{title}`,
 * `{duree}` ou `{position}`, remplaces par `remplir()`. On ne concatene
 * JAMAIS dans le JSX : l'ordre des mots change d'une langue a l'autre
 * ("Mettre X en pause" / "Pause X"), une concatenation ne peut donc pas
 * etre correcte dans les deux. Meme motif que `music/music-textes.ts`.
 */

/** Remplace les marqueurs `{cle}` d'un gabarit par leurs valeurs. */
export function remplir(gabarit: string, valeurs: Record<string, string>) {
  return Object.entries(valeurs).reduce(
    (texte, [cle, valeur]) => texte.replaceAll(`{${cle}}`, valeur),
    gabarit,
  );
}

export const TA11y = {
  /* ------------------------------------------ frequence-section
     Le bouton lit un extrait du titre "Fréquence". Le nom du morceau
     est un nom propre : il garde son accent dans les deux langues. */
  frequencePause: {
    fr: "Mettre Fréquence en pause",
    en: "Pause Fréquence",
  } satisfies Bi,
  frequenceEcouter: {
    fr: "Écouter Fréquence",
    en: "Play Fréquence",
  } satisfies Bi,

  /* --------------------------------------------- player-section
     Le gros lecteur du bas de page d'accueil. Tout est en `aria-label`
     sauf `lecteurEnPause`, qui s'affiche sous la pochette. */

  /** Etat affiche a l'ecran. Le pendant "en lecture" vit dans T.commun. */
  lecteurEnPause: { fr: "En pause", en: "Paused" } satisfies Bi,

  pochetteTitre: {
    fr: "Pochette du titre {title}",
    en: "Cover art for {title}",
  } satisfies Bi,
  positionTitre: {
    fr: "Position dans le titre {title}",
    en: "Position in {title}",
  } satisfies Bi,
  /** Lu a chaque deplacement du curseur : "1:12 sur 3:04". */
  positionValeur: {
    fr: "{position} sur {duree}",
    en: "{position} of {duree}",
  } satisfies Bi,

  lectureAleatoire: { fr: "Lecture aléatoire", en: "Shuffle" } satisfies Bi,
  titrePrecedent: { fr: "Titre précédent", en: "Previous track" } satisfies Bi,
  titreSuivant: { fr: "Titre suivant", en: "Next track" } satisfies Bi,

  repetitionOff: {
    fr: "Répétition désactivée",
    en: "Repeat off",
  } satisfies Bi,
  repetitionToutes: {
    fr: "Répéter la playlist",
    en: "Repeat playlist",
  } satisfies Bi,
  repetitionUne: {
    fr: "Répéter ce titre",
    en: "Repeat this track",
  } satisfies Bi,

  mettreEnPauseTitre: {
    fr: "Mettre en pause {title}",
    en: "Pause {title}",
  } satisfies Bi,
  lireTitre: { fr: "Lire {title}", en: "Play {title}" } satisfies Bi,
  /** Vignettes "Trending" : la duree est annoncee avec le titre. */
  lireTitreDuree: {
    fr: "Lire {title} — {duree}",
    en: "Play {title} — {duree}",
  } satisfies Bi,

  /* -------------------------------------------- slowburn-section */
  slowburnPause: {
    fr: "Mettre Slow Burn en pause",
    en: "Pause Slow Burn",
  } satisfies Bi,
  slowburnEcouter: {
    fr: "Écouter l’extrait de Slow Burn",
    en: "Play the Slow Burn excerpt",
  } satisfies Bi,

  /* -------------------------------------------- site-footer-nav
     Libelles de navigation du pied de page. Ils etaient ecrits en clair
     dans le composant : regroupes ici, ils cessent d'etre un angle mort
     a la relecture. Les entrees editoriales du menu principal restent,
     elles, dans `T.nav`. */
  piedDePageNav: {
    fr: "Navigation de pied de page",
    en: "Footer navigation",
  } satisfies Bi,
  mentionsLegales: {
    fr: "Mentions légales",
    en: "Legal notice",
  } satisfies Bi,
  cgu: { fr: "CGU", en: "Terms" } satisfies Bi,
} as const;
