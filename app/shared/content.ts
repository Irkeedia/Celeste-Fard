export type Track = {
  id: string;
  albumId: string;
  title: string;
  subtitle: string;
  cover: string;
  src: string;
  duration: string;
  language: "fr" | "it" | "en";
};

export type Album = {
  id: string;
  kind: "album" | "singles";
  title: string;
  subtitle: string;
  year: string;
  mood: string;
  description: string;
  cover: string;
  tracks: Track[];
};

export type Release = {
  title: string;
  kind: "Album" | "Single";
  year: string;
  mood: string;
  description: string;
};

export type Photo = {
  title: string;
  src: string;
};

export type FanMoment = {
  title: string;
  image: string;
  stat: string;
};

export type VideoClip = {
  id: string;
  title: string;
  caption: string;
  /** Fichier dans `public/video/` ou URL externe temporaire. */
  src: string;
  /** Miniature statique dans `public/image/`, sinon extraite de la vidéo. */
  poster?: string;
};

/** Fichiers dans `public/audio`, encodage URL pour espaces, apostrophes, accents. */
function audioFromPublic(relativePath: string): string {
  const normalized = relativePath.normalize("NFC");
  return `/audio/${normalized.split("/").map((segment) => encodeURIComponent(segment)).join("/")}`;
}

type TrackRow = Omit<Track, "cover" | "src" | "albumId"> & { file: string };

function buildAlbumTracks(
  albumId: string,
  rows: TrackRow[],
  options: { folder?: string; coverOffset?: number; cover?: string } = {},
): Track[] {
  const { folder = "", coverOffset = 0, cover } = options;

  return rows.map((row, index) => {
    const { file, ...rest } = row;
    const path = folder ? `${folder}/${file}` : file;

    return {
      ...rest,
      id: `${albumId}-${rest.id}`,
      albumId,
      cover: cover ?? coverForIndex(coverOffset + index),
      src: audioFromPublic(path),
    };
  });
}

const TRACK_COVERS = [
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1487180144351-b8472da7d491?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1508700119012-35966822bbf1?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=900&q=80",
] as const;

function coverForIndex(index: number): string {
  return TRACK_COVERS[index % TRACK_COVERS.length];
}

/**
 * Pistes locales : noms de fichiers tels que dans `public/audio/`.
 * Titres d’affichage **distincts** pour chaque fichier (même morceau en plusieurs versions).
 * Durées indicatives (approx. taille fichier), le navigateur affiche la durée réelle à la lecture.
 */
const TRACKS_RAW: TrackRow[] = [
  {
    id: "01",
    file: "Venezia Dark(1).mp3",
    title: "Venezia Dark, canal cramoisi",
    subtitle: "Version A, Italie nocturne",
    duration: "3:58",
    language: "it",
  },
  {
    id: "02",
    file: "Venezia Dark(2).mp3",
    title: "Venezia Dark, lagune close",
    subtitle: "Version B, même titre, autre prise",
    duration: "3:31",
    language: "it",
  },
  {
    id: "03",
    file: "L'Angle Mort.mp3",
    title: "L'Angle Mort, vision directe",
    subtitle: "Take principale",
    duration: "3:41",
    language: "fr",
  },
  {
    id: "04",
    file: "L'Angle Mort(1).mp3",
    title: "L'Angle Mort, contre plongée",
    subtitle: "Deuxième enregistrement du même titre",
    duration: "3:04",
    language: "fr",
  },
  {
    id: "05",
    file: "L'excellence est un choix.mp3",
    title: "L'excellence est un choix, manifeste",
    subtitle: "Version longue",
    duration: "4:12",
    language: "fr",
  },
  {
    id: "06",
    file: "L'excellence est un choix(1).mp3",
    title: "L'excellence est un choix, contre manifeste",
    subtitle: "Variante du même titre",
    duration: "3:54",
    language: "fr",
  },
  {
    id: "07",
    file: "Une assurance-vie.mp3",
    title: "Une assurance vie",
    subtitle: "Morceau seul dans le dossier",
    duration: "4:35",
    language: "fr",
  },
  {
    id: "08",
    file: "Une dignité de plomb(1).mp3",
    title: "Une dignité de plomb, lettre ouverte",
    subtitle: "Version 1",
    duration: "4:34",
    language: "fr",
  },
  {
    id: "09",
    file: "Une dignité de plomb(2).mp3",
    title: "Une dignité de plomb, dernière couche",
    subtitle: "Version 2, même titre",
    duration: "4:43",
    language: "fr",
  },
  {
    id: "10",
    file: "Une valise en carton(1).mp3",
    title: "Une valise en carton, départ",
    subtitle: "Version A",
    duration: "6:14",
    language: "fr",
  },
  {
    id: "11",
    file: "Une valise en carton(2).mp3",
    title: "Une valise en carton, arrivée",
    subtitle: "Version B, même titre",
    duration: "6:40",
    language: "fr",
  },
  {
    id: "12",
    file: "Plus d'erreurs de calcul,(1).mp3",
    title: "Plus d'erreurs de calcul, variante A",
    subtitle: "Premier fichier du duo",
    duration: "5:02",
    language: "fr",
  },
  {
    id: "13",
    file: "Plus d'erreurs de calcul,(2).mp3",
    title: "Plus d'erreurs de calcul, variante B",
    subtitle: "Deuxième fichier du duo",
    duration: "4:44",
    language: "fr",
  },
  {
    id: "14",
    file: "J'ai mal aux souvenirs(1).mp3",
    title: "J'ai mal aux souvenirs, prise unique",
    subtitle: "Seule version dans la bibliothèque",
    duration: "4:52",
    language: "fr",
  },
  {
    id: "15",
    file: "Default State.mp3",
    title: "Default State, édition studio",
    subtitle: "Take principale",
    duration: "5:10",
    language: "en",
  },
  {
    id: "16",
    file: "Default State(1).mp3",
    title: "Default State, version nocturne",
    subtitle: "Même titre, autre fichier",
    duration: "5:14",
    language: "en",
  },
  {
    id: "17",
    file: "Don't waste it.mp3",
    title: "Don't Waste It, cut original",
    subtitle: "Take 1",
    duration: "4:28",
    language: "en",
  },
  {
    id: "18",
    file: "Don't waste it(1).mp3",
    title: "Don't Waste It, rework électrique",
    subtitle: "Take 2, même titre",
    duration: "4:40",
    language: "en",
  },
  {
    id: "19",
    file: "Ego Patrimonial(1).mp3",
    title: "Ego Patrimonial, ouverture",
    subtitle: "Version 1",
    duration: "4:40",
    language: "fr",
  },
  {
    id: "20",
    file: "Ego Patrimonial(2).mp3",
    title: "Ego Patrimonial, coda intègre",
    subtitle: "Version 2, même titre",
    duration: "5:06",
    language: "fr",
  },
  {
    id: "21",
    file: "I\u2019m still here(1).mp3",
    title: "I'm Still Here, session prophète",
    subtitle: "Version A, pop nocturne",
    duration: "5:36",
    language: "en",
  },
  {
    id: "22",
    file: "I\u2019m still here(2).mp3",
    title: "I'm Still Here, miroir froid",
    subtitle: "Version B, même titre",
    duration: "5:20",
    language: "en",
  },
];

const ALBUM_1_RAW: TrackRow[] = [
  { id: "01", file: "Axiome 0.mp3", title: "Axiome 0", subtitle: "Ouverture, version principale", duration: "4:50", language: "fr" },
  { id: "02", file: "Axiome 0-2.mp3", title: "Axiome 0", subtitle: "Version B", duration: "4:45", language: "fr" },
  { id: "03", file: "L'Axiome de ma Vie.mp3", title: "L'Axiome de ma Vie", subtitle: "Manifeste intime", duration: "6:00", language: "fr" },
  { id: "04", file: "LA CHAIR ET L'ÉCHELLE.mp3", title: "LA CHAIR ET L'ÉCHELLE", subtitle: "Corps et ascension", duration: "5:29", language: "fr" },
  { id: "05", file: "LES LARMES DU CHAOS-2.mp3", title: "LES LARMES DU CHAOS", subtitle: "Version B", duration: "6:13", language: "fr" },
  { id: "06", file: "L'Angle Mort-2.mp3", title: "L'Angle Mort", subtitle: "Version album", duration: "3:41", language: "fr" },
  { id: "07", file: "L'Apex de Silicium.mp3", title: "L'Apex de Silicium", subtitle: "Version principale", duration: "4:57", language: "fr" },
  { id: "08", file: "L'Apex de Silicium-2.mp3", title: "L'Apex de Silicium", subtitle: "Version B", duration: "5:19", language: "fr" },
  { id: "09", file: "SYNAPSE & SOUVERAINETÉ.mp3", title: "SYNAPSE & SOUVERAINETÉ", subtitle: "Transmission nerveuse", duration: "5:21", language: "fr" },
  { id: "10", file: "SOUVERAINE ALIENATION.mp3", title: "SOUVERAINE ALIENATION", subtitle: "Distance choisie", duration: "4:43", language: "fr" },
  { id: "11", file: "trinité pure.mp3", title: "trinité pure", subtitle: "Version principale", duration: "4:31", language: "fr" },
  { id: "12", file: "trinité pure-2.mp3", title: "trinité pure", subtitle: "Version B", duration: "4:28", language: "fr" },
  { id: "13", file: "Vautour de Soie.mp3", title: "Vautour de Soie", subtitle: "Version principale", duration: "5:04", language: "fr" },
  { id: "14", file: "Vautour de Soie-2.mp3", title: "Vautour de Soie", subtitle: "Version B", duration: "5:20", language: "fr" },
  { id: "15", file: "Vigogne & Mépris.mp3", title: "Vigogne & Mépris", subtitle: "Version principale", duration: "5:09", language: "fr" },
  { id: "16", file: "Vigogne & Mépris-2.mp3", title: "Vigogne & Mépris", subtitle: "Version B", duration: "5:13", language: "fr" },
  { id: "17", file: "Selezione d'Élite.mp3", title: "Selezione d'Élite", subtitle: "Version principale", duration: "5:01", language: "it" },
  { id: "18", file: "Selezione d'Élite-2.mp3", title: "Selezione d'Élite", subtitle: "Version B", duration: "4:45", language: "it" },
  { id: "19", file: "Piombo e Seta.mp3", title: "Piombo e Seta", subtitle: "Version principale", duration: "4:51", language: "it" },
  { id: "20", file: "Piombo e Seta-2.mp3", title: "Piombo e Seta", subtitle: "Version B", duration: "4:58", language: "it" },
  { id: "21", file: "The Apex Market.mp3", title: "The Apex Market", subtitle: "Version principale", duration: "4:57", language: "en" },
  { id: "22", file: "The Apex Market-2.mp3", title: "The Apex Market", subtitle: "Version B", duration: "4:50", language: "en" },
];

const ARCHIVES_RAW: TrackRow[] = TRACKS_RAW;

export const albums: Album[] = [
  {
    id: "album-1",
    kind: "album",
    title: "Album 1",
    subtitle: "Velours Brut, nouvel album",
    year: "2026",
    mood: "Rap pop sombre, cinematique",
    description:
      "Mon album : chaque piste cartographie une humeur. Axiomes, silicium, chaos, entre theorie scientifique et emotion brute, en FR, IT et EN.",
    cover: "/image/celestetravail.png",
    tracks: buildAlbumTracks("album-1", ALBUM_1_RAW, { folder: "album 1" }),
  },
  {
    id: "singles",
    kind: "singles",
    title: "Singles",
    subtitle: "Premieres musiques, demos & versions",
    year: "2024 et 2026",
    mood: "Singles, doubles prises",
    description:
      "Mes premieres musiques, demos, doubles prises, humeurs d avant que je sache expliquer ce que je faisais.",
    cover: "/image/celestesurscene.png",
    tracks: buildAlbumTracks("singles", ARCHIVES_RAW, { coverOffset: 3 }),
  },
];

export const featuredTracks: Track[] = albums.flatMap((album) => album.tracks);

export const releases: Release[] = [
  {
    title: "Velours Brut",
    kind: "Album",
    year: "2026",
    mood: "Cinematique / Electro pop",
    description:
      "Mon premier album concept : la ou mes theories scientifiques et mes emotions se rencontrent sans filtre.",
  },
  {
    title: "Rouge Minuit",
    kind: "Single",
    year: "2026",
    mood: "Pop nocturne",
    description: "Colere nocturne en francais, le morceau que j ai ecrit un soir ou rien ne passait.",
  },
  {
    title: "Prima Donna",
    kind: "Single",
    year: "2025",
    mood: "Italo disco moderne",
    description: "Humeur italienne, egocentrique assumee, spoiler : c est un masque d exploration, pas ma facture EDF.",
  },
];

/**
 * Clips video de la home.
 * Remplace `src` par `/video/ton-fichier.mp4` une fois le MP4 depose dans `public/video/`.
 */
export const homeVideos: VideoClip[] = [
  {
    id: "remerciement",
    title: "Remerciement",
    caption: "Merci d etre la, message direct, sans script.",
    src: "/video/celestevideoderemerciement.mp4",
    poster: "/image/miniaturevideomercie.png",
  },
  {
    id: "passion",
    title: "Passion",
    caption: "Quand la musique prend le dessus, pur feu, humeur du moment.",
    src: "/video/celestevideopassion.mp4",
    poster: "/image/miniaturepassion.png",
  },
  {
    id: "bateau",
    title: "Sur le bateau",
    caption: "Pas un yacht, juste l Italie quand j en ai besoin pour respirer.",
    src: "/video/celestesitewebbateau.mp4",
    poster: "/image/miniaturebateau.png",
  },
];

export const galleryPhotos2: Photo[] = [
  {
    title: "Sur scene, la ou je ne triche pas",
    src: "/image/celestescene.png",
  },
  {
    title: "Canape, pas VIP, juste fatiguee",
    src: "/image/celestecanapé.png",
  },
  {
    title: "Mon chien, plus stable que mes equations",
    src: "/image/celestechien.png",
  },
  {
    title: "Studio, la ou les humeurs deviennent des fichiers",
    src: "/image/celestetravail.png",
  },
  {
    title: "Matin, ne pas me parler avant le cafe",
    src: "/image/celestelematin.png",
  },
  {
    title: "Autographes, j adore ca, je deteste les photos",
    src: "/image/celesteautographe.png",
  },
  {
    title: "Portrait #47, oui, j en ai trop (paradoxe assume)",
    src: "/image/celesteencoreunportrait.png",
  },
];

export const fanMoments: FanMoment[] = [
  {
    title: "Concert en foret",
    image: "/image/celestefeteforet.png",
    stat: "Magie d ete, Jenny etait dans le public",
  },
  {
    title: "Au bar (je ne bois presque pas)",
    image: "/image/celestealcool.png",
    stat: "Une biere pour la photo. C est tout. Promis.",
  },
  {
    title: "Sur le bateau, survie mentale",
    image: "/image/celestebateauok.png",
    stat: "Pas un yacht. Juste l Italie quand j en ai besoin pour respirer.",
  },
  {
    title: "Evenement sportif",
    image: "/image/celestesportif.png",
    stat: "Entre deux cours de physique et un morceau a finir",
  },
];
