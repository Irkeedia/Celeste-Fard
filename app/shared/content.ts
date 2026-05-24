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

/** Fichiers dans `public/audio` — encodage URL pour espaces, apostrophes, accents. */
function audioFromPublic(relativePath: string): string {
  return `/audio/${relativePath.split("/").map((segment) => encodeURIComponent(segment)).join("/")}`;
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
 * Durées indicatives (approx. taille fichier) — le navigateur affiche la durée réelle à la lecture.
 */
const TRACKS_RAW: TrackRow[] = [
  {
    id: "01",
    file: "Venezia Dark(1).mp3",
    title: "Venezia Dark — canal cramoisi",
    subtitle: "Version A · Italie nocturne",
    duration: "3:58",
    language: "it",
  },
  {
    id: "02",
    file: "Venezia Dark(2).mp3",
    title: "Venezia Dark — lagune close",
    subtitle: "Version B · même titre, autre prise",
    duration: "3:31",
    language: "it",
  },
  {
    id: "03",
    file: "L'Angle Mort.mp3",
    title: "L'Angle Mort — vision directe",
    subtitle: "Take principale",
    duration: "3:41",
    language: "fr",
  },
  {
    id: "04",
    file: "L'Angle Mort(1).mp3",
    title: "L'Angle Mort — contre-plongée",
    subtitle: "Deuxième enregistrement du même titre",
    duration: "3:04",
    language: "fr",
  },
  {
    id: "05",
    file: "L'excellence est un choix.mp3",
    title: "L'excellence est un choix — manifeste",
    subtitle: "Version longue",
    duration: "4:12",
    language: "fr",
  },
  {
    id: "06",
    file: "L'excellence est un choix(1).mp3",
    title: "L'excellence est un choix — contre-manifeste",
    subtitle: "Variante du même titre",
    duration: "3:54",
    language: "fr",
  },
  {
    id: "07",
    file: "Une assurance-vie.mp3",
    title: "Une assurance-vie",
    subtitle: "Morceau seul dans le dossier",
    duration: "4:35",
    language: "fr",
  },
  {
    id: "08",
    file: "Une dignité de plomb(1).mp3",
    title: "Une dignité de plomb — lettre ouverte",
    subtitle: "Version 1",
    duration: "4:34",
    language: "fr",
  },
  {
    id: "09",
    file: "Une dignité de plomb(2).mp3",
    title: "Une dignité de plomb — dernière couche",
    subtitle: "Version 2 · même titre",
    duration: "4:43",
    language: "fr",
  },
  {
    id: "10",
    file: "Une valise en carton(1).mp3",
    title: "Une valise en carton — départ",
    subtitle: "Version A",
    duration: "6:14",
    language: "fr",
  },
  {
    id: "11",
    file: "Une valise en carton(2).mp3",
    title: "Une valise en carton — arrivée",
    subtitle: "Version B · même titre",
    duration: "6:40",
    language: "fr",
  },
  {
    id: "12",
    file: "Plus d'erreurs de calcul,(1).mp3",
    title: "Plus d'erreurs de calcul — variante A",
    subtitle: "Premier fichier du duo",
    duration: "5:02",
    language: "fr",
  },
  {
    id: "13",
    file: "Plus d'erreurs de calcul,(2).mp3",
    title: "Plus d'erreurs de calcul — variante B",
    subtitle: "Deuxième fichier du duo",
    duration: "4:44",
    language: "fr",
  },
  {
    id: "14",
    file: "J'ai mal aux souvenirs(1).mp3",
    title: "J'ai mal aux souvenirs — prise unique",
    subtitle: "Seule version dans la bibliothèque",
    duration: "4:52",
    language: "fr",
  },
  {
    id: "15",
    file: "Default State.mp3",
    title: "Default State — édition studio",
    subtitle: "Take principale",
    duration: "5:10",
    language: "en",
  },
  {
    id: "16",
    file: "Default State(1).mp3",
    title: "Default State — version nocturne",
    subtitle: "Même titre, autre fichier",
    duration: "5:14",
    language: "en",
  },
  {
    id: "17",
    file: "Don't waste it.mp3",
    title: "Don't Waste It — cut original",
    subtitle: "Take 1",
    duration: "4:28",
    language: "en",
  },
  {
    id: "18",
    file: "Don't waste it(1).mp3",
    title: "Don't Waste It — rework électrique",
    subtitle: "Take 2 · même titre",
    duration: "4:40",
    language: "en",
  },
  {
    id: "19",
    file: "Ego Patrimonial(1).mp3",
    title: "Ego Patrimonial — ouverture",
    subtitle: "Version 1",
    duration: "4:40",
    language: "fr",
  },
  {
    id: "20",
    file: "Ego Patrimonial(2).mp3",
    title: "Ego Patrimonial — coda intègre",
    subtitle: "Version 2 · même titre",
    duration: "5:06",
    language: "fr",
  },
  {
    id: "21",
    file: "I\u2019m still here(1).mp3",
    title: "I'm Still Here — session prophète",
    subtitle: "Version A · pop nocturne",
    duration: "5:36",
    language: "en",
  },
  {
    id: "22",
    file: "I\u2019m still here(2).mp3",
    title: "I'm Still Here — miroir froid",
    subtitle: "Version B · même titre",
    duration: "5:20",
    language: "en",
  },
];

const ALBUM_1_RAW: TrackRow[] = [
  { id: "01", file: "Axiome 0.mp3", title: "Axiome 0", subtitle: "Ouverture · version principale", duration: "4:50", language: "fr" },
  { id: "02", file: "Axiome 0-2.mp3", title: "Axiome 0", subtitle: "Version B", duration: "4:45", language: "fr" },
  { id: "03", file: "L'Axiome de ma Vie.mp3", title: "L'Axiome de ma Vie", subtitle: "Manifeste intime", duration: "6:00", language: "fr" },
  { id: "04", file: "LA CHAIR ET L'E\u0301CHELLE.mp3", title: "LA CHAIR ET L'\u00c9CHELLE", subtitle: "Corps et ascension", duration: "5:29", language: "fr" },
  { id: "05", file: "LES LARMES DU CHAOS-2.mp3", title: "LES LARMES DU CHAOS", subtitle: "Version B", duration: "6:13", language: "fr" },
  { id: "06", file: "L'Angle Mort-2.mp3", title: "L'Angle Mort", subtitle: "Version album", duration: "3:41", language: "fr" },
  { id: "07", file: "L'Apex de Silicium.mp3", title: "L'Apex de Silicium", subtitle: "Version principale", duration: "4:57", language: "fr" },
  { id: "08", file: "L'Apex de Silicium-2.mp3", title: "L'Apex de Silicium", subtitle: "Version B", duration: "5:19", language: "fr" },
  { id: "09", file: "SYNAPSE & SOUVERAINETE\u0301.mp3", title: "SYNAPSE & SOUVERAINET\u00c9", subtitle: "Transmission nerveuse", duration: "5:21", language: "fr" },
  { id: "10", file: "SOUVERAINE ALIENATION.mp3", title: "SOUVERAINE ALIENATION", subtitle: "Distance choisie", duration: "4:43", language: "fr" },
  { id: "11", file: "trinite\u0301 pure.mp3", title: "trinit\u00e9 pure", subtitle: "Version principale", duration: "4:31", language: "fr" },
  { id: "12", file: "trinite\u0301 pure-2.mp3", title: "trinit\u00e9 pure", subtitle: "Version B", duration: "4:28", language: "fr" },
  { id: "13", file: "Vautour de Soie.mp3", title: "Vautour de Soie", subtitle: "Version principale", duration: "5:04", language: "fr" },
  { id: "14", file: "Vautour de Soie-2.mp3", title: "Vautour de Soie", subtitle: "Version B", duration: "5:20", language: "fr" },
  { id: "15", file: "Vigogne & Me\u0301pris.mp3", title: "Vigogne & M\u00e9pris", subtitle: "Version principale", duration: "5:09", language: "fr" },
  { id: "16", file: "Vigogne & Me\u0301pris-2.mp3", title: "Vigogne & M\u00e9pris", subtitle: "Version B", duration: "5:13", language: "fr" },
  { id: "17", file: "Selezione d'E\u0301lite.mp3", title: "Selezione d'\u00c9lite", subtitle: "Version principale", duration: "5:01", language: "it" },
  { id: "18", file: "Selezione d'E\u0301lite-2.mp3", title: "Selezione d'\u00c9lite", subtitle: "Version B", duration: "4:45", language: "it" },
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
    subtitle: "Velours Brut · nouvel album",
    year: "2026",
    mood: "Rap pop sombre · cinematique",
    description:
      "Mon premier album assemble : axiomes, silicium, soie et chaos. FR, IT et EN dans le meme flux emotionnel.",
    cover: "/image/celestetravail.png",
    tracks: buildAlbumTracks("album-1", ALBUM_1_RAW, { folder: "album 1" }),
  },
  {
    id: "singles",
    kind: "singles",
    title: "Singles",
    subtitle: "Premieres musiques · demos & versions",
    year: "2024-2026",
    mood: "Singles · doubles prises",
    description:
      "Mes tout premiers morceaux : Venezia Dark, L'Angle Mort, Default State et les versions alternatives.",
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
      "Le premier album-concept de Celeste, entre confidences de loge et refrains qui restent en tete.",
  },
  {
    title: "Rouge Minuit",
    kind: "Single",
    year: "2026",
    mood: "Pop nocturne",
    description: "Un titre puissant sur l'audace feminine, pense pour la scene et les playlists.",
  },
  {
    title: "Prima Donna",
    kind: "Single",
    year: "2025",
    mood: "Italo disco moderne",
    description: "Un clin d'oeil italien ultra moderne, a la fois elegant et addictif.",
  },
];

export const shortVideos = [
  {
    title: "Backstage Milano",
    caption: "Essayage couture + teaser refrain.",
    src: "https://assets.mixkit.co/videos/preview/mixkit-woman-singing-in-a-recording-studio-51991-large.mp4",
  },
  {
    title: "Studio confession",
    caption: "Comment une phrase devient un hook.",
    src: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-singing-and-recording-in-studio-39824-large.mp4",
  },
  {
    title: "Mini live Paris",
    caption: "Extrait acoustique du prochain single.",
    src: "https://assets.mixkit.co/videos/preview/mixkit-girl-singing-on-a-stage-with-smoke-39185-large.mp4",
  },
];

export const galleryPhotos2: Photo[] = [
  {
    title: "Sur scene",
    src: "/image/celestescene.png",
  },
  {
    title: "Moment intime",
    src: "/image/celestecanapé.png",
  },
  {
    title: "Avec mon chien",
    src: "/image/celestechien.png",
  },
  {
    title: "Au studio",
    src: "/image/celestetravail.png",
  },
  {
    title: "Aigrie le matin — ne pas deranger",
    src: "/image/celestelematin.png",
  },
  {
    title: "Seance autographes",
    src: "/image/celesteautographe.png",
  },
  {
    title: "Encore un portrait (oui, encore)",
    src: "/image/celesteencoreunportrait.png",
  },
];

export const fanMoments: FanMoment[] = [
  {
    title: "Fete dans la foret",
    image: "/image/celestefeteforet.png",
    stat: "Concert intimiste sous les guirlandes",
  },
  {
    title: "Soiree au bar",
    image: "/image/celestealcool.png",
    stat: "Je fais la diete... mais pas tous les jours",
  },
  {
    title: "Evenement sportif",
    image: "/image/celestesportif.png",
    stat: "Entre deux morceaux, je cours aussi",
  },
];
