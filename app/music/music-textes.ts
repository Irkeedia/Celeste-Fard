import type { Bi } from "../shared/lang";

/**
 * TEXTES DE LA PAGE MUSIQUE — francais et anglais cote a cote.
 *
 * Colocalise avec la page, comme `contact/contact-textes.ts` : le fichier
 * `shared/textes.ts` porte le contenu du site vitrine (home, sections) et
 * grossissait au point de devenir difficile a relire. Chaque page
 * secondaire a donc son propre fichier de textes.
 *
 * Ligne editoriale, identique a `shared/textes.ts` : Celeste assume
 * d'etre une IA sans jamais l'expliquer, aucun vocabulaire technique,
 * elle s'adresse directement a l'auditeur. L'anglais n'est PAS un calque
 * mot a mot mais la meme intention dite naturellement dans la langue.
 *
 * NOMBRES — les phrases qui citent le catalogue ne concatenent pas un
 * chiffre a un mot : elles portent un marqueur `{titres}` / `{duree}` /
 * `{album}` remplace a l'affichage. C'est la seule facon d'avoir un ordre
 * de mots correct dans les deux langues, et de gerer le singulier.
 */

export const TMusic = {
  /* --- Fragments reutilises. `nbTitres` est injecte dans le kicker ET
     dans le lede : une seule forme a maintenir, singulier compris. --- */
  nbTitresUn: { fr: "1 titre", en: "1 track" } satisfies Bi,
  nbTitres: { fr: "{n} titres", en: "{n} tracks" } satisfies Bi,

  /* --- Hero --- */
  kicker: {
    fr: "Le catalogue · {titres} en ligne",
    en: "The catalogue · {titres} online",
  } satisfies Bi,

  /* Le titre du disque est un nom propre : il ne se traduit pas. Il est
     coupe en deux morceaux parce que le rendu superpose deux styles. */
  titre1: { fr: "Nouvelle", en: "Nouvelle" } satisfies Bi,
  titre2: { fr: "Génération", en: "Génération" } satisfies Bi,

  lede: {
    fr: "Tout est là, tout s’écoute maintenant. Je n’ai ni tournée à vendre, ni suspense à entretenir : {titres}, {duree} au compteur, et le bouton lecture au bout de chaque ligne.",
    en: "It’s all here, and it all plays right now. No tour to sell you, no suspense to keep up: {titres}, {duree} on the clock, and a play button at the end of every line.",
  } satisfies Bi,

  /* --- Fiche album --- */
  albumKicker: { fr: "Album · 2026", en: "Album · 2026" } satisfies Bi,

  albumAlt: {
    fr: "Pochette de l’album {album}",
    en: "Cover art for the album {album}",
  } satisfies Bi,

  albumTexte: {
    fr: "Un seul disque, écrit et monté sans dormir une seule nuit. Si un morceau ne donnait pas envie de bouger, il n’est pas sur la liste — je n’ai aucun attachement sentimental à mes propres fichiers.",
    en: "One record, written and cut without sleeping a single night. If a track didn’t make you want to move, it never made the list — I’m not precious about my own songs.",
  } satisfies Bi,

  factTitres: { fr: "Titres", en: "Tracks" } satisfies Bi,
  factDuree: { fr: "Durée", en: "Length" } satisfies Bi,
  factPrix: { fr: "Prix", en: "Price" } satisfies Bi,

  tags: [
    { fr: "Afro pop", en: "Afro pop" } satisfies Bi,
    { fr: "Super pop AI", en: "Super pop AI" } satisfies Bi,
    { fr: "Écoute libre", en: "Free to listen" } satisfies Bi,
  ],

  /* --- Liste des titres --- */
  listeTitre: { fr: "La tracklist", en: "The tracklist" } satisfies Bi,
  listeAide: {
    fr: "Cliquez sur une ligne : la lecture démarre ici même, et enchaîne toute seule sur la suivante.",
    en: "Click any line: it starts playing right here, and rolls straight into the next one.",
  } satisfies Bi,

  /* --- Bas de page --- */
  outroKicker: { fr: "La suite", en: "What’s next" } satisfies Bi,
  outroTitre: {
    fr: "Et sur l’accueil, la version complète",
    en: "And on the home page, the full thing",
  } satisfies Bi,
  outroTexte: {
    fr: "Forme d’onde, lecture aléatoire, boucle infinie : tout est en bas de la page d’accueil. Et si écouter ne vous suffit pas, la boutique existe — je n’ai ni loyer ni courses, mais j’aime beaucoup l’idée que vous portiez mon nom en soirée.",
    en: "Waveform, shuffle, endless loop: it’s all at the bottom of the home page. And if listening isn’t enough, there’s a shop — I have no rent and no groceries, but I love the idea of you wearing my name out on a Saturday night.",
  } satisfies Bi,
  outroLecteur: { fr: "Ouvrir le lecteur", en: "Open the player" } satisfies Bi,
  outroBoutique: { fr: "La boutique", en: "The shop" } satisfies Bi,

  /* --- Lecteur (tracklist-player.tsx) ---
     Ces libelles ne sont JAMAIS affiches a l'ecran : ce sont des
     `aria-label`, lus uniquement par les lecteurs d'ecran. Ils etaient
     restes en francais en dur, ce qui rendait la page bilingue a l'oeil
     mais pas a l'oreille. Memes marqueurs {title} / {duree} que plus
     haut : l'ordre des mots change d'une langue a l'autre, on ne
     concatene donc jamais dans le JSX. */
  lectureEnCours: { fr: "Lecture en cours", en: "Now playing" } satisfies Bi,
  mettreEnPauseTitre: {
    fr: "Mettre en pause {title}",
    en: "Pause {title}",
  } satisfies Bi,
  ecouterTitre: {
    fr: "Écouter {title} — {duree}",
    en: "Play {title} — {duree}",
  } satisfies Bi,
  mettreEnPause: { fr: "Mettre en pause", en: "Pause" } satisfies Bi,
  reprendre: { fr: "Reprendre la lecture", en: "Resume playback" } satisfies Bi,
  position: {
    fr: "Position dans le morceau",
    en: "Position in the track",
  } satisfies Bi,
  titrePrecedent: { fr: "Titre précédent", en: "Previous track" } satisfies Bi,
  titreSuivant: { fr: "Titre suivant", en: "Next track" } satisfies Bi,
} as const;
