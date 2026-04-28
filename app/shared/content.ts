export type Track = {
  id: string;
  title: string;
  subtitle: string;
  cover: string;
  src: string;
  duration: string;
  language: "fr" | "it" | "en";
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

export const featuredTracks: Track[] = [
  {
    id: "01",
    title: "Lune Chromee",
    subtitle: "Single manifesto",
    cover:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    duration: "3:18",
    language: "fr",
  },
  {
    id: "02",
    title: "Veleno d'Amore",
    subtitle: "Ballade franco-italienne",
    cover:
      "https://images.unsplash.com/photo-1487180144351-b8472da7d491?auto=format&fit=crop&w=900&q=80",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    duration: "3:52",
    language: "it",
  },
  {
    id: "03",
    title: "Nuits de Satin",
    subtitle: "Version live studio",
    cover:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=80",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    duration: "4:03",
    language: "en",
  },
];

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

export const galleryPhotos: Photo[] = [
  {
    title: "Portrait couture rose",
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Studio neon",
    src: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Backstage elegance",
    src: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Live atmosphere",
    src: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Editorial Paris",
    src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1200&q=80",
  },
];

export const fanMoments: FanMoment[] = [
  {
    title: "Aftershow selfies",
    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80",
    stat: "3.2k partages",
  },
  {
    title: "Vinyl unboxing",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80",
    stat: "1.1k videos fans",
  },
  {
    title: "Studio night",
    image:
      "https://images.unsplash.com/photo-1516280030429-27679b3dc9cf?auto=format&fit=crop&w=1200&q=80",
    stat: "18h de live cumule",
  },
];
