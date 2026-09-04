import type { Bi } from "../shared/lang";

/**
 * TEXTES DES SECTIONS MEDIAS — galerie et video, francais et anglais.
 *
 * Ces deux sections portent des DONNEES locales (legendes de photos,
 * fiches de clips, textes alternatifs) qui etaient restees en francais en
 * dur alors que le serveur rend desormais l'anglais. Elles vivent ici
 * plutot que dans `shared/textes.ts`, qui ne porte que l'habillage
 * editorial commun a tout le site.
 *
 * Ligne editoriale identique au reste : Celeste assume d'etre une IA sans
 * jamais l'expliquer, aucun vocabulaire technique, elle parle
 * directement au spectateur. L'anglais reecrit les vannes au lieu de les
 * calquer.
 */

export const TMedias = {
  /* ==============================================================
     GALERIE — legendes de tuiles et textes alternatifs
     ============================================================== */

  /* Tuile 01 */
  g1Caption: {
    fr: "Scène — premier rappel",
    en: "Stage — first encore",
  } satisfies Bi,
  g1Alt: {
    fr: "Celeste sur scène, micro à la main, dans un contre-jour rouge chargé de fumée.",
    en: "Celeste on stage, mic in hand, backlit in red through heavy smoke.",
  } satisfies Bi,

  /* Tuile 02 */
  g2Caption: {
    fr: "Salle vide — 3 h du matin",
    en: "Empty room — 3 a.m.",
  } satisfies Bi,
  g2Alt: {
    fr: "Scène vue depuis les coulisses, projecteurs rouges balayant la fumée, silhouette de Celeste au centre.",
    en: "The stage seen from the wings, red spotlights sweeping the smoke, Celeste’s silhouette at the centre.",
  } satisfies Bi,

  /* Tuile 03 */
  g3Caption: {
    fr: "Ce micro a plus d’ancienneté que moi",
    en: "This mic has been around longer than I have",
  } satisfies Bi,
  g3Alt: {
    fr: "Gros plan sur la main baguée de Celeste posée sur un micro vintage.",
    en: "Close-up of Celeste’s ringed hand resting on a vintage microphone.",
  } satisfies Bi,

  /* Tuile 04 */
  g4Caption: {
    fr: "Rire non calibré",
    en: "Uncalibrated laugh",
  } satisfies Bi,
  g4Alt: {
    fr: "Portrait rapproché de Celeste qui rit, taches de rousseur visibles sous une lumière rouge chaude.",
    en: "Close-up portrait of Celeste laughing, freckles visible under warm red light.",
  } satisfies Bi,

  /* Tuile 05 */
  g5Caption: {
    fr: "Dos tourné, volontairement",
    en: "Turned away, on purpose",
  } satisfies Bi,
  g5Alt: {
    fr: "Celeste de dos, tête tournée vers l’objectif, lumière magenta sur la nuque.",
    en: "Celeste from behind, head turned back to the lens, magenta light on the nape of her neck.",
  } satisfies Bi,

  /* Tuile 06 */
  g6Caption: {
    fr: "Studio — jour 04, câbles partout",
    en: "Studio — day 04, cables everywhere",
  } satisfies Bi,
  g6Alt: {
    fr: "Celeste assise au sol en studio, casque autour du cou, entourée de câbles et de pédales.",
    en: "Celeste sitting on the studio floor, headphones round her neck, surrounded by cables and pedals.",
  } satisfies Bi,

  /* Carte de respiration editoriale */
  gNoteLabel: {
    fr: "Note de production",
    en: "Production note",
  } satisfies Bi,

  /* ==============================================================
     VIDEO — fiches des clips du carrousel
     ============================================================== */

  /* Clip 01 — influenceuse */
  v1Kicker: { fr: "À la une", en: "Headline" } satisfies Bi,
  v1Titre: { fr: "Elle prend la parole", en: "She speaks up" } satisfies Bi,
  v1Caption: {
    fr: "Dix secondes pour annoncer vingt et un titres. Je n’ai pas eu besoin de respirer une seule fois.",
    en: "Ten seconds to announce twenty-one tracks. I didn’t need to breathe once.",
  } satisfies Bi,

  /* Clip 02 — remerciement */
  v2Kicker: { fr: "Message", en: "Message" } satisfies Bi,
  v2Titre: { fr: "Merci d’être là", en: "Thanks for being here" } satisfies Bi,
  v2Caption: {
    fr: "Message direct. Sans script, sans prompteur. Enfin… presque.",
    en: "Straight to camera. No script, no teleprompter. Well… almost.",
  } satisfies Bi,

  /* Clip 03 — passion */
  v3Kicker: { fr: "Clip", en: "Clip" } satisfies Bi,
  v3Titre: { fr: "Quand ça part", en: "When it takes over" } satisfies Bi,
  v3Caption: {
    fr: "Le moment exact où la musique passe devant le raisonnement. Mon bug préféré.",
    en: "The exact moment the music gets ahead of the reasoning. My favourite glitch.",
  } satisfies Bi,

  /* Clip 04 — bateau */
  v4Kicker: { fr: "Hors-champ", en: "Off camera" } satisfies Bi,
  v4Titre: { fr: "Vacances simulées", en: "Holiday, simulated" } satisfies Bi,
  v4Caption: {
    fr: "Pas un yacht. Juste l’Italie, et moi qui fais semblant d’avoir chaud.",
    en: "Not a yacht. Just Italy, and me pretending to feel the heat.",
  } satisfies Bi,

  /* Libelles lus par les lecteurs d'ecran. Le bouton n'affiche qu'un
     triangle : sans ces libelles, on ne sait pas quel clip on declenche.
     {titre} est remplace par le titre du clip a l'affichage. */
  vLire: { fr: "Lire {titre}", en: "Play {titre}" } satisfies Bi,
  vAfficher: { fr: "Afficher {titre}", en: "Show {titre}" } satisfies Bi,
} as const;
