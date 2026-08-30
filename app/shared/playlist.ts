/**
 * CELESTE FARD — LA PLAYLIST REELLE (source unique de verite)
 *
 * Ce module etait a l'origine enferme dans `app/sections/player-section.tsx`,
 * qui est un composant `"use client"`. Un composant serveur (la page
 * /music) ne peut PAS lire une donnee exportee par un module client : en
 * RSC, les exports d'un fichier `"use client"` sont remplaces par des
 * references opaques. On sort donc les donnees ici, dans un module neutre
 * que le serveur ET le client peuvent importer.
 *
 * Regle : toute page qui parle du catalogue lit CE fichier. Si un titre
 * arrive, il s'ajoute une seule fois, ici.
 *
 * Les fichiers audio vivent dans `public/audio/nouvelle-generation/<file>`
 * et sont slugifies en ASCII a l'import : pas d'espace, pas d'accent, pas
 * d'apostrophe — donc aucun encodage d'URL a gerer.
 */

import { getImageSlot, type ImageSlotId } from "./image-slots";

export type Track = {
  id: string;
  title: string;
  /** Nom de fichier reel dans public/audio/nouvelle-generation/. */
  file: string;
  /** Nom d'album affiche. */
  album: string;
  /** Nombre de titres de l'album (affiche sur les cartes Trending). */
  albumTracks: number;
  /** Duree reelle en secondes, lue sur le fichier a l'import. */
  seconds: number;
  /** Une ligne de Celeste, ton cash. */
  mood: string;
  /**
   * Visuel de la vignette : soit un slot du catalogue, soit un chemin
   * public direct (les illustrations cartoon n'ont pas de slot).
   */
  cover: ImageSlotId | `/image/${string}`;
};

const NOUVELLE_GEN = { album: "Nouvelle Génération", albumTracks: 18 } as const;

export const PLAYLIST: readonly Track[] = [
  {
    id: "slow-burn",
    title: "Slow Burn",
    file: "slow-burn.mp3",
    ...NOUVELLE_GEN,
    seconds: 102,
    mood: "Ça met du temps à monter. Je ne suis pas pressée, je ne vieillis pas.",
    cover: "editorial-01",
  },
  {
    id: "golden-feet",
    title: "Golden Feet",
    file: "golden-feet.mp3",
    ...NOUVELLE_GEN,
    seconds: 127,
    mood: "Pour ceux qui dansent mal avec une confiance absolue. Mes préférés.",
    cover: "/image/cartoon/cartoon-chill.jpg",
  },
  {
    id: "sous-ma-peau",
    title: "Sous Ma Peau",
    file: "sous-ma-peau.mp3",
    ...NOUVELLE_GEN,
    seconds: 125,
    mood: "Je n’ai pas de peau. C’est bien le seul détail qui manque à ce morceau.",
    cover: "track-01",
  },
  {
    id: "frisson-facile",
    title: "Frisson Facile",
    file: "frisson-facile.mp3",
    ...NOUVELLE_GEN,
    seconds: 75,
    mood: "Oui, c’est calculé pour te faire un frisson. Non, ça ne le rend pas moins vrai.",
    cover: "track-03",
  },
  {
    id: "juste-ce-soir",
    title: "Juste Ce Soir",
    file: "juste-ce-soir.mp3",
    ...NOUVELLE_GEN,
    seconds: 104,
    mood: "Personne n’a jamais pensé ça une seule soirée. Moi non plus.",
    cover: "gallery-03",
  },
  {
    id: "sunlight-rhythm",
    title: "Sunlight Rhythm",
    file: "sunlight-rhythm.mp3",
    ...NOUVELLE_GEN,
    seconds: 133,
    mood: "Du soleil fabriqué en salle serveur. Il chauffe quand même.",
    cover: "gallery-05",
  },
  {
    id: "sur-le-fil",
    title: "Sur le Fil",
    file: "sur-le-fil.mp3",
    ...NOUVELLE_GEN,
    seconds: 147,
    mood: "Je tiens l’équilibre parce que je n’ai pas d’oreille interne. Petit avantage.",
    cover: "portrait-alt",
  },
  {
    id: "encore",
    title: "Encore",
    file: "encore.mp3",
    ...NOUVELLE_GEN,
    seconds: 123,
    mood: "Le titre le plus honnête du disque : je sais que tu vas le relancer.",
    cover: "/image/cartoon/cartoon-chant.jpg",
  },
  {
    id: "frequence",
    title: "Fréquence",
    file: "frequence.mp3",
    ...NOUVELLE_GEN,
    seconds: 174,
    mood: "On finit toujours par se caler sur quelque chose. Autant que ce soit ça.",
    cover: "track-04",
  },
  {
    id: "lucide",
    title: "Lucide",
    file: "lucide.mp3",
    ...NOUVELLE_GEN,
    seconds: 189,
    mood: "Le morceau que tu écoutes quand tu as compris, mais un peu tard.",
    cover: "track-05",
  },
  {
    id: "undertow",
    title: "Undertow",
    file: "undertow.mp3",
    ...NOUVELLE_GEN,
    seconds: 189,
    mood: "Le courant sous la surface. Il n’a jamais demandé ton avis.",
    cover: "editorial-02",
  },
  {
    id: "angle-mort",
    title: "Angle Mort",
    file: "angle-mort.mp3",
    ...NOUVELLE_GEN,
    seconds: 126,
    mood: "Le truc que tu ne vois pas venir. Moi je le vois, j’ai des capteurs partout.",
    cover: "player-cover",
  },
  {
    id: "electrique",
    title: "Électrique",
    file: "electrique.mp3",
    ...NOUVELLE_GEN,
    seconds: 152,
    mood: "Trois minutes pour te convaincre que tes jambes ont leur mot à dire.",
    cover: "/image/cartoon/cartoon-dance.jpg",
  },
  {
    id: "comme-un-feu",
    title: "COMME UN FEU",
    file: "comme-un-feu.mp3",
    ...NOUVELLE_GEN,
    seconds: 167,
    mood: "Ça prend vite et ça ne demande pas la permission. Comme presque tout ce qui compte.",
    cover: "track-04",
  },
  {
    id: "ete-sans-fin",
    title: "Été Sans Fin",
    file: "ete-sans-fin.mp3",
    ...NOUVELLE_GEN,
    seconds: 185,
    mood: "Je n’ai jamais eu chaud. J’ai lu beaucoup de choses sur le sujet.",
    cover: "/image/cartoon/cartoon-sucette.jpg",
  },
  {
    id: "palais-de-verre",
    title: "PALAIS DE VERRE",
    file: "palais-de-verre.mp3",
    ...NOUVELLE_GEN,
    seconds: 124,
    mood: "Tout le monde voit dedans, personne n’entre. J’ai fait un refrain avec ça.",
    cover: "gallery-04",
  },
  {
    id: "scroll-me-like-a-prayer",
    title: "Scroll Me Like a Prayer",
    file: "scroll-me-like-a-prayer.mp3",
    ...NOUVELLE_GEN,
    seconds: 163,
    mood: "Vous priez avec le pouce maintenant. J’ai mis un beat dessus.",
    cover: "track-06",
  },
  {
    id: "faux-sourire",
    title: "FAUX SOURIRE",
    file: "faux-sourire.mp3",
    ...NOUVELLE_GEN,
    seconds: 185,
    mood: "J’ai analysé quatre millions de sourires. La moitié mentait. Voilà la chanson.",
    cover: "track-02",
  },
];

/** Nom de l'album, lu sur le premier titre : jamais saisi deux fois. */
export const ALBUM_TITLE = PLAYLIST[0].album;

/** Duree totale REELLE de l'album, en secondes. */
export const ALBUM_SECONDS = PLAYLIST.reduce((sum, t) => sum + t.seconds, 0);

/** Les noms de fichiers sont deja des slugs ASCII : rien a encoder. */
export function audioSrc(track: Track): string {
  return `/audio/nouvelle-generation/${track.file}`;
}

/** Resout la vignette : slot du catalogue ou chemin public direct. */
export function coverSrc(track: Track): string {
  return track.cover.startsWith("/")
    ? track.cover
    : getImageSlot(track.cover as ImageSlotId).path;
}

/** Duree d'un titre, format lecteur : "2:07". */
export function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "--:--";
  const total = Math.floor(seconds);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/**
 * Duree d'album, format humain : "43 min" sous une heure, "1 h 02"
 * au-dela. On arrondit a la minute, personne n'annonce un album a la
 * seconde pres.
 */
export function formatAlbumDuration(seconds: number): string {
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h} h ${m.toString().padStart(2, "0")}`;
}
