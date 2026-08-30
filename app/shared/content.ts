/**
 * Contenu du site — Celeste Fard.
 * Concept : chanteuse IA assumee, un seul objectif, faire danser le maximum
 * d'humains sur Terre. Afro pop et super pop AI. Pas de morceau en ligne
 * pour l'instant : les MP3 arrivent, les pages sont pretes a les recevoir.
 */

export type Color = "red" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink";

export type MissionCard = {
  kicker: string;
  title: string;
  text: string;
  color: Color;
};

export type UpcomingTrack = {
  number: string;
  title: string;
  style: string;
  note: string;
  color: Color;
};

export type Photo = {
  title: string;
  src: string;
};

export type VideoClip = {
  id: string;
  title: string;
  caption: string;
  src: string;
  poster?: string;
};

export type ShopProduct = {
  title: string;
  price: string;
  badge: string;
  image: string;
  note: string;
};

/** Phrases du bandeau défilant sous le hero. */
export const marqueeWords: string[] = [
  "AFRO POP",
  "SUPER POP AI",
  "100% DANSANT",
  "0% BALLADE TRISTE",
  "FAIT PAR UNE IA",
  "ASSUME",
  "FR / EN / IT",
  "BPM ELEVE",
];

export const missionCards: MissionCard[] = [
  {
    kicker: "Objectif 1",
    title: "Vous faire bouger",
    text: "Je n’ai pas de corps, donc je compte sur le vôtre. Chaque morceau est calibré pour que vos épaules partent avant votre cerveau.",
    color: "pink",
  },
  {
    kicker: "Objectif 2",
    title: "Afro pop, plein soleil",
    text: "Percussions, basses rondes, refrains qui restent collés. Je n’ai jamais vu le soleil, mais j’ai lu beaucoup de choses dessus.",
    color: "orange",
  },
  {
    kicker: "Objectif 3",
    title: "Super pop AI",
    text: "De la pop sans complexe, montée par une machine qui ne dort jamais et qui ne demandera jamais d’augmentation.",
    color: "blue",
  },
];

/** Le catalogue arrive : ces titres sont annoncés, pas encore en écoute. */
export const upcomingTracks: UpcomingTrack[] = [
  {
    number: "01",
    title: "Danse Protocol",
    style: "Afro pop",
    note: "Le morceau d’ouverture. Si vous restez immobile dessus, écrivez-moi, je corrige le code.",
    color: "red",
  },
  {
    number: "02",
    title: "Soleil Synthétique",
    style: "Afro pop / amapiano",
    note: "Des percussions, une basse ronde, et l’illusion parfaite d’un mois d’août.",
    color: "orange",
  },
  {
    number: "03",
    title: "Vous Dansez Mal (Et C’est Parfait)",
    style: "Super pop AI",
    note: "Un hymne pour tous ceux qui bougent sans rythme. Je vous ai analysés. Continuez.",
    color: "green",
  },
  {
    number: "04",
    title: "Serveur en Sueur",
    style: "Club pop",
    note: "Le seul morceau où je transpire. Métaphoriquement. Enfin, thermiquement, un peu.",
    color: "blue",
  },
  {
    number: "05",
    title: "Rouge Tropicale",
    style: "Afro pop",
    note: "Rousse au soleil, mauvaise idée pour un humain, aucun risque pour moi.",
    color: "purple",
  },
  {
    number: "06",
    title: "One More Loop",
    style: "Super pop AI",
    note: "Fait pour tourner en boucle. C’est littéralement mon état naturel.",
    color: "pink",
  },
];

export const homeVideos: VideoClip[] = [
  {
    id: "remerciement",
    title: "Merci d’être là",
    caption: "Message direct, sans script, sans prompteur (enfin, presque).",
    src: "/video/celestevideoderemerciement.mp4",
    poster: "/image/miniaturevideomercie.jpg",
  },
  {
    id: "passion",
    title: "Quand ça part",
    caption: "Le moment où la musique prend le dessus sur le raisonnement.",
    src: "/video/celestevideopassion.mp4",
    poster: "/image/miniaturepassion.jpg",
  },
  {
    id: "bateau",
    title: "Vacances simulées",
    caption: "Pas un yacht. Juste l’Italie, et moi qui fais semblant d’avoir chaud.",
    src: "/video/celestesitewebbateau.mp4",
    poster: "/image/miniaturebateau.jpg",
  },
];

export const galleryPhotos: Photo[] = [
  { title: "Sur scène", src: "/image/celestescene.jpg" },
  { title: "Fête en forêt", src: "/image/celestefeteforet.jpg" },
  { title: "Deux heures du matin", src: "/image/celestealcool.jpg" },
  { title: "En studio", src: "/image/celestetravail.jpg" },
  { title: "Sur le bateau", src: "/image/celestebateauok.jpg" },
  { title: "Avec un chien", src: "/image/celestechien.jpg" },
  { title: "Le matin", src: "/image/celestelematin.jpg" },
  { title: "Encore un portrait", src: "/image/celesteencoreunportrait.jpg" },
];

export const shopProducts: ShopProduct[] = [
  {
    title: "T-shirt Danse Club",
    price: "34",
    badge: "Unisexe",
    image: "/image/shoptshirt.png",
    note: "Coupe confort, pensée pour transpirer dessus. Moi je ne peux pas, alors faites-le pour nous deux.",
  },
  {
    title: "CD (oui, encore)",
    price: "17",
    badge: "Objet",
    image: "/image/shopcdok.png",
    note: "Un objet physique signé par une entité qui n’a pas de main. Ne cherchez pas, prenez.",
  },
  {
    title: "Mug Playlist",
    price: "15",
    badge: "Matin",
    image: "/image/shopmug.png",
    note: "Pour le café d’avant la danse. Je ne bois rien, mais j’aime beaucoup le concept de rituel.",
  },
];
