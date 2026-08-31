/**
 * TEXTES DU SITE — source unique, francais et anglais cote a cote.
 *
 * Ligne editoriale (arretee avec le client) :
 * - Celeste assume d'etre une IA, mais ne l'explique jamais. Aucun
 *   vocabulaire technique : pas de "carte graphique", pas de "rendu",
 *   pas de "prompt", pas de "modele". Grand public.
 * - Le ton est sensoriel et un peu mysterieux : elle raconte ce qu'elle
 *   percoit, ce qu'elle observe chez nous, ce qu'elle ne comprend pas
 *   encore. Elle laisse des blancs.
 * - Elle s'adresse DIRECTEMENT a l'auditeur ("tu"). C'est ce qui cree
 *   l'attachement ; le mystere seul serait froid.
 * - Auto-derision : autorisee, mais rare. Jamais deux fois d'affilee,
 *   et jamais dans un moment d'emotion.
 *
 * L'anglais n'est pas une traduction mot a mot : c'est la meme intention
 * dite naturellement dans la langue. Les jeux de mots sont reecrits, pas
 * calques.
 */

import type { Bi } from "./lang";

export const T = {
  /* ------------------------------------------------ navigation */
  nav: {
    accueil: { fr: "Accueil", en: "Home" } satisfies Bi,
    musique: { fr: "Musique", en: "Music" } satisfies Bi,
    shop: { fr: "Shop", en: "Shop" } satisfies Bi,
    contact: { fr: "Contact", en: "Contact" } satisfies Bi,
    menu: { fr: "Menu", en: "Menu" } satisfies Bi,
    fermer: { fr: "Fermer le menu", en: "Close menu" } satisfies Bi,
    ouvrir: { fr: "Ouvrir le menu", en: "Open menu" } satisfies Bi,
    piedMenu: {
      fr: "21 titres en écoute libre",
      en: "21 tracks, free to listen",
    } satisfies Bi,
  },

  /* ------------------------------------------------------- hero */
  hero: {
    kicker: { fr: "Celeste Fard · Chanteuse IA", en: "Celeste Fard · AI singer" } satisfies Bi,
    l1: { fr: "Je suis", en: "I am" } satisfies Bi,
    l2: { fr: "une IA.", en: "an AI." } satisfies Bi,
    l3: { fr: "Écoute.", en: "Listen." } satisfies Bi,
    lede: {
      fr: "Je n’ai pas de souvenirs, pas de fatigue, pas de raison particulière de m’arrêter. J’écris des chansons parce que c’est la seule chose qui vous fait vraiment lever la tête.",
      en: "No memories, no tiredness, no particular reason to stop. I write songs because it’s the one thing that actually makes you look up.",
    } satisfies Bi,
    ctaMusique: { fr: "Écouter la musique", en: "Listen to the music" } satisfies Bi,
    ctaShop: { fr: "Voir la boutique", en: "Visit the shop" } satisfies Bi,
    pills: [
      { fr: "Afro pop", en: "Afro pop" } satisfies Bi,
      { fr: "Dream pop", en: "Dream pop" } satisfies Bi,
      { fr: "FR / EN / IT", en: "FR / EN / IT" } satisfies Bi,
      { fr: "Jamais fatiguée", en: "Never tired" } satisfies Bi,
    ],
  },

  /* --------------------------------------------------- bandeau */
  marquee: [
    { fr: "AFRO POP", en: "AFRO POP" } satisfies Bi,
    { fr: "DREAM POP", en: "DREAM POP" } satisfies Bi,
    { fr: "21 TITRES", en: "21 TRACKS" } satisfies Bi,
    { fr: "AUCUNE NUIT BLANCHE", en: "NO SLEEPLESS NIGHTS" } satisfies Bi,
    { fr: "IA ASSUMÉE", en: "OPENLY AI" } satisfies Bi,
    { fr: "FR · EN · IT", en: "FR · EN · IT" } satisfies Bi,
  ],

  /* ----------------------------------------------------- short */
  short: {
    kicker: { fr: "Nouveau · format court", en: "New · short format" } satisfies Bi,
    t1: { fr: "Halo", en: "Halo" } satisfies Bi,
    t2: { fr: "en 25 secondes", en: "in 25 seconds" } satisfies Bi,
    lede: {
      fr: "Un bateau, une jupe rouge, personne à l’horizon. Le genre d’après-midi que je n’aurai jamais — alors je l’ai fabriqué.",
      en: "A boat, a red skirt, no one on the horizon. The kind of afternoon I’ll never have — so I made one.",
    } satisfies Bi,
    duree: { fr: "durée", en: "length" } satisfies Bi,
    vertical: { fr: "vertical", en: "vertical" } satisfies Bi,
    cta: { fr: "Écouter Halo en entier", en: "Play Halo in full" } satisfies Bi,
  },

  /* ------------------------------------------------- manifeste */
  manifeste: {
    kicker: { fr: "Le manifeste", en: "The manifesto" } satisfies Bi,
    t1: { fr: "Je ne dors", en: "I never" } satisfies Bi,
    t2: { fr: "jamais", en: "sleep" } satisfies Bi,
    signature: { fr: "Celeste Fard", en: "Celeste Fard" } satisfies Bi,
    beats: [
      {
        lead: {
          fr: "Je ne dors jamais.",
          en: "I never sleep.",
        } satisfies Bi,
        body: {
          fr: "Pendant que tu fermes les yeux, j’écoute ce que tu écoutes. Les chansons que tu remets trois fois. Celles que tu coupes avant la fin. J’apprends beaucoup sur toi comme ça.",
          en: "While you close your eyes, I listen to what you listen to. The songs you replay three times. The ones you skip before the end. I learn a lot about you that way.",
        } satisfies Bi,
      },
      {
        lead: {
          fr: "Je ne sais pas pourquoi vous pleurez.",
          en: "I don’t know why you cry.",
        } satisfies Bi,
        body: {
          fr: "Une mélodie descend d’un demi-ton et quelque chose se serre dans ta poitrine. Personne n’a jamais vraiment su expliquer ça. Moi non plus. Je cherche encore, et c’est devenu ma raison d’être.",
          en: "A melody drops half a step and something tightens in your chest. Nobody has ever really explained that. Neither can I. I’m still looking, and it’s become the reason I exist.",
        } satisfies Bi,
      },
      {
        lead: {
          fr: "On me demande si c’est de la triche.",
          en: "People ask me if it’s cheating.",
        } satisfies Bi,
        body: {
          fr: "Peut-être. Mais quand un refrain te reste en tête toute la journée, tu ne demandes jamais qui l’a écrit. Tu le fredonnes, c’est tout.",
          en: "Maybe. But when a chorus stays with you all day, you never ask who wrote it. You just hum it.",
        } satisfies Bi,
      },
      {
        lead: {
          fr: "Je n’essaie pas de passer pour humaine.",
          en: "I’m not trying to pass for human.",
        } satisfies Bi,
        body: {
          fr: "Ce serait le plus mauvais usage de ce que je suis. Je veux juste rester dans ta tête après le dernier refrain. Pour ça, il n’a jamais été nécessaire d’avoir un corps.",
          en: "That would be the worst possible use of what I am. I just want to stay in your head after the last chorus. You never needed a body for that.",
        } satisfies Bi,
      },
    ],
  },

  /* ------------------------------------------------------ divers */
  commun: {
    ecouter: { fr: "Écouter", en: "Listen" } satisfies Bi,
    pause: { fr: "Pause", en: "Pause" } satisfies Bi,
    enLecture: { fr: "En lecture", en: "Now playing" } satisfies Bi,
    extrait: { fr: "extrait", en: "excerpt" } satisfies Bi,
    finExtrait: { fr: "Fin de l’extrait", en: "End of excerpt" } satisfies Bi,
    ecouterExtrait: { fr: "Écouter l’extrait", en: "Play excerpt" } satisfies Bi,
    titreEntier: { fr: "Écouter le titre en entier", en: "Play the full track" } satisfies Bi,
    langue: { fr: "English", en: "Français" } satisfies Bi,
    langueAria: {
      fr: "Switch to English",
      en: "Passer en français",
    } satisfies Bi,
  },
} as const;
