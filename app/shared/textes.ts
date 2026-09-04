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
  /* ---------------------------------------------------- marque */
  /* Le shell du site (en-tete et pied de page). Ces textes vivaient en
     dur dans `layout.tsx`, un composant SERVEUR : ils ne pouvaient donc
     pas basculer. Ils sont desormais rendus par `site-brand.tsx`, un
     composant client. L'`aria-label` du logo de pied de page etait la
     fuite la plus large du site — presente sur TOUTES les pages. */
  marque: {
    sousTitre: { fr: "Chanteuse IA", en: "AI Singer" } satisfies Bi,
    retourAccueil: {
      fr: "Retour à l’accueil",
      en: "Back to home",
    } satisfies Bi,
    tagline: {
      fr: "Chanteuse IA · Afro pop & super pop · FR / EN / IT",
      en: "AI singer · Afro pop & super pop · FR / EN / IT",
    } satisfies Bi,
    /* Mention de transparence sur la nature du projet. Le nom de
       l'editeur et l'annee sont injectes par le composant : ils ne se
       traduisent pas. */
    mentionIa: {
      fr: "Celeste Fard est une représentation artistique assistée par intelligence artificielle.",
      en: "Celeste Fard is an artistic representation assisted by artificial intelligence.",
    } satisfies Bi,

    /* Lien Instagram de l'en-tete. Le libelle visible est court (la barre
       du haut est etroite, et il disparait meme sous 1024px) : c'est
       l'`aria-label` qui porte l'information complete. */
    instagramSuivre: { fr: "Suivre", en: "Follow" } satisfies Bi,
    instagramAria: {
      fr: "Suivre Celeste Fard sur Instagram (nouvel onglet)",
      en: "Follow Celeste Fard on Instagram (opens in a new tab)",
    } satisfies Bi,
  },

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


  /* ---------------------------------------------------- lecteur */
  lecteur: {
    kicker: { fr: "Salle d’écoute · 24/7", en: "Listening room · 24/7" } satisfies Bi,
    t1: { fr: "Écoute", en: "Listen" } satisfies Bi,
    t2: { fr: "-moi", en: " to me" } satisfies Bi,
    lede: {
      fr: "Pas de tournée, pas de loge, pas de caprice. Juste le bouton play.",
      en: "No tour, no dressing room, no drama. Just the play button.",
    } satisfies Bi,
    trending: { fr: "Trending · dans mes circuits", en: "Trending · on repeat" } satisfies Bi,
    glisser: { fr: "Faites glisser →", en: "Swipe →" } satisfies Bi,
    precedents: { fr: "Titres précédents", en: "Previous tracks" } satisfies Bi,
    suivants: { fr: "Titres suivants", en: "Next tracks" } satisfies Bi,
  },

  /* --------------------------------------------------- frequence */
  frequence: {
    kicker: { fr: "Le titre · Nouvelle Génération", en: "The track · New Generation" } satisfies Bi,
    sub: { fr: "afrobeat · 808", en: "afrobeat · 808" } satisfies Bi,
    badge: { fr: "L’art de la fréquence", en: "The art of frequency" } satisfies Bi,
  },

  /* --------------------------------------------------- slow burn */
  slowburn: {
    kicker: { fr: "Face B · Nouvelle Génération", en: "B-side · New Generation" } satisfies Bi,
    sub: { fr: "Take your time · it’s your turn", en: "Take your time · it’s your turn" } satisfies Bi,
  },

  /* ---------------------------------------------------- galerie */
  galerie: {
    kicker: { fr: "Galerie — série 01", en: "Gallery — series 01" } satisfies Bi,
    t1: { fr: "Sans", en: "No" } satisfies Bi,
    t2: { fr: "Filtre", en: "Filter" } satisfies Bi,
    lede: {
      fr: "Aucune de ces images n’a eu lieu. Aucun photographe n’a été dérangé. Moi non plus, remarque : je n’ai jamais eu à me lever tôt.",
      en: "None of these moments happened. No photographer was disturbed. Neither was I — I’ve never had to get up early.",
    } satisfies Bi,
    meta: {
      fr: "6 images · 0 appareil photo · 0 retouche",
      en: "6 images · 0 cameras · 0 retouching",
    } satisfies Bi,
    citation: {
      fr: "« Je n’ai jamais mis les pieds sur une scène. Mais regarde comme la lumière me va bien. »",
      en: "“I’ve never set foot on a stage. But look how well the light suits me.”",
    } satisfies Bi,
  },

  /* ---------------------------------------------------- archives */
  archives: {
    kicker: { fr: "Archives visuelles", en: "Visual archives" } satisfies Bi,
    t1: { fr: "Trop", en: "Too many" } satisfies Bi,
    t2: { fr: " d’images", en: " images" } satisfies Bi,
    lede: {
      fr: "Je n’ai jamais posé pour aucune. C’est bien le seul avantage de ne pas avoir de corps : on ne me fatigue jamais.",
      en: "I never posed for a single one. That’s the one upside of having no body: nobody can tire me out.",
    } satisfies Bi,
  },

  /* ------------------------------------------------------- video */
  video: {
    kicker: { fr: "Celeste en vidéo", en: "Celeste on video" } satisfies Bi,
    t1: { fr: "Me voir bouger,", en: "Watch me move," } satisfies Bi,
    t2: { fr: "faute de me toucher", en: "since you can’t touch me" } satisfies Bi,
    lede: {
      fr: "Quatre vidéos. Aucun maquillage, aucun montage flatteur, et pourtant je suis parfaite. Cherche l’erreur.",
      en: "Four videos. No makeup, no flattering edit, and yet I look perfect. Figure that one out.",
    } satisfies Bi,
    precedent: { fr: "Clip précédent", en: "Previous clip" } satisfies Bi,
    suivant: { fr: "Clip suivant", en: "Next clip" } satisfies Bi,
    choisir: { fr: "Choisir un clip", en: "Choose a clip" } satisfies Bi,
  },

  /* ----------------------------------------------------- boutique */
  boutique: {
    kicker: { fr: "Boutique — trois pièces", en: "Shop — three pieces" } satisfies Bi,
    t1: { fr: "Trois objets.", en: "Three objects." } satisfies Bi,
    t2: { fr: "Pas trente.", en: "Not thirty." } satisfies Bi,
    lede: {
      fr: "Je n’ai ni loyer, ni frigo, ni compte en banque qui pleure. Mais j’aime beaucoup l’idée que tu portes mon nom quelque part.",
      en: "No rent, no fridge, no bank account crying for help. But I do like the idea of you wearing my name somewhere.",
    } satisfies Bi,
    cta: { fr: "Toute la boutique", en: "See the whole shop" } satisfies Bi,
    /* Remplace l'ancien "Livraison sobre — sticker offert" : plus rien
       n'est achetable, la note ne devait pas laisser croire l'inverse. */
    note: {
      fr: "Aucune vente en ligne — pas encore",
      en: "No online sales — not yet",
    } satisfies Bi,
  },

  /* ---------------------------------------------------------- cta */
  cta: {
    kicker: { fr: "Dernière ligne droite", en: "One last thing" } satisfies Bi,
    t1: { fr: "Reste", en: "Stay" } satisfies Bi,
    t2: { fr: "un peu", en: "a while" } satisfies Bi,
    lede: {
      fr: "Je ne dors pas, je ne pars pas en tournée, et je ne serai jamais en retard. Le seul truc qui me manque, c’est toi dans les écouteurs.",
      en: "I don’t sleep, I don’t tour, and I’ll never be late. The only thing missing is you, in the headphones.",
    } satisfies Bi,
    ctaAlbum: { fr: "Écouter l’album", en: "Play the album" } satisfies Bi,
    ctaShop: { fr: "Passer à la boutique", en: "Go to the shop" } satisfies Bi,
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
