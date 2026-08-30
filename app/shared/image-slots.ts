/**
 * CELESTE FARD — CATALOGUE DES SLOTS D'IMAGES
 *
 * Le design est code AVANT que les images n'existent. Ce fichier est le
 * contrat entre les agents "design" et l'agent "generation d'images".
 *
 * Convention : toutes les images vivent dans `public/image/gen/<id>.jpg`
 * et sont donc servies sur `/image/gen/<id>.jpg`.
 *
 * IMPORTANT :
 * - Les images generees ont un FOND NOIR PUR. Sur fond sombre, applique
 *   `mix-blend-mode: screen` (classe globale `u-screen`) pour faire
 *   disparaitre le fond et obtenir un sujet detoure sans halo.
 * - Une image peut manquer au build : le conteneur doit toujours porter un
 *   fond de secours (classe globale `u-image-fallback`).
 * - `aspect` est ce que le DESIGN exige, pas ce que le fichier contient :
 *   c'est le ratio du cadre. Utilise `getAspectRatio()` pour obtenir des
 *   nombres exploitables par `next/image` (width / height).
 */

/** Roles semantiques — determinent le traitement visuel du cadre. */
export type ImageRole =
  | "hero" //     grand sujet d'ouverture, deborde de sa section
  | "portrait" // sujet cadre serre, souvent detoure
  | "cover" //    pochette / vignette carree
  | "gallery" //  mosaique editoriale
  | "product" //  visuel boutique sur fond neutre
  | "banner" //   bandeau large de fin de page
  | "track"; //   pochette carree d'un titre du lecteur

/** Ratio du CADRE, au format "largeur:hauteur". */
export type ImageAspect =
  | "1:1"
  | "2:3"
  | "3:2"
  | "3:4"
  | "4:5"
  | "16:9"
  | "21:9";

export type ImageSlotId =
  | "hero-portrait"
  | "hero-full"
  | "manifesto"
  | "player-cover"
  | "gallery-01"
  | "gallery-02"
  | "gallery-03"
  | "gallery-04"
  | "gallery-05"
  | "gallery-06"
  | "shop-01"
  | "shop-02"
  | "shop-03"
  | "cta-wide"
  | "track-01"
  | "track-02"
  | "track-03"
  | "track-04"
  | "track-05"
  | "track-06"
  | "editorial-01"
  | "editorial-02"
  | "portrait-alt"
  | "detail-hands";

export interface ImageSlot {
  /** Identifiant stable = nom du fichier sans extension. */
  id: ImageSlotId;
  /** Chemin public, prêt pour `<Image src=... />`. */
  path: `/image/gen/${ImageSlotId}.jpg`;
  /** Ratio impose par le design. */
  aspect: ImageAspect;
  /** Role semantique dans la page. */
  role: ImageRole;
  /** Brief FR pour le generateur d'images. Fond noir pur obligatoire. */
  promptFr: string;
}

export const IMAGE_SLOTS = [
  {
    id: "hero-portrait",
    path: "/image/gen/hero-portrait.jpg",
    aspect: "4:5",
    role: "hero",
    promptFr:
      "Celeste, chanteuse rousse, buste et regard face camera, cheveux roux incandescents effleures par une lumiere rouge rasante, fond noir pur, contours nets, aucune ombre portee sur le fond.",
  },
  {
    id: "hero-full",
    path: "/image/gen/hero-full.jpg",
    aspect: "2:3",
    role: "hero",
    promptFr:
      "Celeste en pied, silhouette elancee, posture assuree, veste sombre, halo rouge diffus derriere elle, fond noir pur, cadrage vertical laissant de l'air au-dessus de la tete.",
  },
  {
    id: "manifesto",
    path: "/image/gen/manifesto.jpg",
    aspect: "3:4",
    role: "portrait",
    promptFr:
      "Celeste de trois quarts, yeux baisses, profil eclaire par une seule source rouge laterale, expression calme et un peu narquoise, fond noir pur.",
  },
  {
    id: "player-cover",
    path: "/image/gen/player-cover.jpg",
    aspect: "1:1",
    role: "cover",
    promptFr:
      "Pochette d'album carree : visage de Celeste en tres gros plan, coupe par le cadre, degrade crimson vers magenta puis violet sombre, grain photo, fond noir pur.",
  },
  {
    id: "gallery-01",
    path: "/image/gen/gallery-01.jpg",
    aspect: "4:5",
    role: "gallery",
    promptFr:
      "Celeste sur scene, micro a la main, contre-jour rouge et fumee, mouvement leger dans les cheveux, fond noir pur.",
  },
  {
    id: "gallery-02",
    path: "/image/gen/gallery-02.jpg",
    aspect: "1:1",
    role: "gallery",
    promptFr:
      "Detail macro : main de Celeste bagues argentees sur un micro vintage, reflet rouge sur le metal, fond noir pur.",
  },
  {
    id: "gallery-03",
    path: "/image/gen/gallery-03.jpg",
    aspect: "3:4",
    role: "gallery",
    promptFr:
      "Celeste de dos, tete tournee vers l'objectif, epaules nues, lumiere magenta sur la nuque, fond noir pur.",
  },
  {
    id: "gallery-04",
    path: "/image/gen/gallery-04.jpg",
    aspect: "16:9",
    role: "gallery",
    promptFr:
      "Plan large de scene vide vue depuis les coulisses, projecteurs rouges balayant la fumee, silhouette minuscule de Celeste au centre, fond noir pur.",
  },
  {
    id: "gallery-05",
    path: "/image/gen/gallery-05.jpg",
    aspect: "1:1",
    role: "gallery",
    promptFr:
      "Portrait rapproche de Celeste qui rit franchement, taches de rousseur visibles, lumiere rouge chaude, fond noir pur.",
  },
  {
    id: "gallery-06",
    path: "/image/gen/gallery-06.jpg",
    aspect: "4:5",
    role: "gallery",
    promptFr:
      "Celeste assise au sol en studio, casque autour du cou, cables et pedales autour d'elle, eclairage violet et rouge, fond noir pur.",
  },
  {
    id: "shop-01",
    path: "/image/gen/shop-01.jpg",
    aspect: "1:1",
    role: "product",
    promptFr:
      "T-shirt noir a plat, serigraphie rouge du visage de Celeste sur la poitrine, eclairage studio doux, fond noir pur.",
  },
  {
    id: "shop-02",
    path: "/image/gen/shop-02.jpg",
    aspect: "1:1",
    role: "product",
    promptFr:
      "Vinyle rouge translucide sortant a moitie de sa pochette noire, reflets incandescents sur le sillon, fond noir pur.",
  },
  {
    id: "shop-03",
    path: "/image/gen/shop-03.jpg",
    aspect: "1:1",
    role: "product",
    promptFr:
      "Mug noir mat avec le logo de Celeste en rouge, vapeur legere, lumiere rasante magenta, fond noir pur.",
  },
  {
    id: "cta-wide",
    path: "/image/gen/cta-wide.jpg",
    aspect: "21:9",
    role: "banner",
    promptFr:
      "Bandeau cinematographique tres large : Celeste minuscule et centree, bras leves, immense halo rouge et violet derriere elle, beaucoup de vide noir de chaque cote, fond noir pur.",
  },
  {
    id: "track-01",
    path: "/image/gen/track-01.jpg",
    aspect: "1:1",
    role: "track",
    promptFr:
      "Visage de Celeste de profil a contre-jour, seul le contour est allume par une arete rouge, le reste dans l'ombre, fond noir pur.",
  },
  {
    id: "track-02",
    path: "/image/gen/track-02.jpg",
    aspect: "1:1",
    role: "track",
    promptFr:
      "Tres gros plan sur les yeux de Celeste seuls, coupes par le cadre, lumiere rouge sur les iris, fond noir pur.",
  },
  {
    id: "track-03",
    path: "/image/gen/track-03.jpg",
    aspect: "1:1",
    role: "track",
    promptFr:
      "Celeste eclairee par en dessous par une source magenta froide, tete legerement renversee, theatral, fond noir pur.",
  },
  {
    id: "track-04",
    path: "/image/gen/track-04.jpg",
    aspect: "1:1",
    role: "track",
    promptFr:
      "Silhouette de Celeste a contre-jour devant un disque de lumiere rouge aveuglant, contour et cheveux en ombre pure, fond noir pur.",
  },
  {
    id: "track-05",
    path: "/image/gen/track-05.jpg",
    aspect: "1:1",
    role: "track",
    promptFr:
      "Les mains de Celeste encadrent son visage, yeux fermes, lumiere rouge douce, col haut, intime et retenu, fond noir pur.",
  },
  {
    id: "track-06",
    path: "/image/gen/track-06.jpg",
    aspect: "1:1",
    role: "track",
    promptFr:
      "Celeste vue a travers une vitre couverte de pluie, visage adouci et fragmente, bokeh rouge derriere, fond noir pur.",
  },
  {
    id: "editorial-01",
    path: "/image/gen/editorial-01.jpg",
    aspect: "3:2",
    role: "gallery",
    promptFr:
      "Plan large : Celeste tout a gauche du cadre en long manteau couture noir, le reste du cadre vide en degrade rouge sombre, fond noir pur.",
  },
  {
    id: "editorial-02",
    path: "/image/gen/editorial-02.jpg",
    aspect: "16:9",
    role: "gallery",
    promptFr:
      "Plan cinematographique : Celeste marche vers l'objectif en sortant de l'obscurite, flou de mouvement, brume rouge, fond noir pur.",
  },
  {
    id: "portrait-alt",
    path: "/image/gen/portrait-alt.jpg",
    aspect: "4:5",
    role: "portrait",
    promptFr:
      "Celeste de trois quarts dos, tete tournee vivement vers l'objectif, cheveux en mouvement, arete rouge sur la machoire, fond noir pur.",
  },
  {
    id: "detail-hands",
    path: "/image/gen/detail-hands.jpg",
    aspect: "1:1",
    role: "gallery",
    promptFr:
      "Macro : les mains de Celeste posees l'une sur l'autre, bague argentee simple, lumiere rouge rasante, aucun visage, fond noir pur.",
  },
] as const satisfies readonly ImageSlot[];

/** Index par id, pour un acces direct : `IMAGE_SLOT_BY_ID["hero-full"]`. */
export const IMAGE_SLOT_BY_ID = Object.fromEntries(
  IMAGE_SLOTS.map((slot) => [slot.id, slot]),
) as Record<ImageSlotId, ImageSlot>;

/** Recupere un slot par son id (typage strict : un id inconnu ne compile pas). */
export function getImageSlot(id: ImageSlotId): ImageSlot {
  return IMAGE_SLOT_BY_ID[id];
}

/** Tous les slots d'un role donne, dans l'ordre de declaration. */
export function getImageSlotsByRole(role: ImageRole): ImageSlot[] {
  return IMAGE_SLOTS.filter((slot) => slot.role === role);
}

/**
 * Convertit un ratio "4:5" en dimensions exploitables par `next/image`
 * (width / height sont obligatoires quand on n'importe pas l'image
 * statiquement). La base 1200px donne des valeurs assez grandes pour
 * que Next genere des srcset utiles.
 */
export function getAspectRatio(
  aspect: ImageAspect,
  base = 1200,
): { width: number; height: number } {
  const [w, h] = aspect.split(":").map(Number);
  return { width: base, height: Math.round((base * h) / w) };
}

/** Valeur prête pour la propriete CSS `aspect-ratio` : "4 / 5". */
export function toCssAspectRatio(aspect: ImageAspect): string {
  return aspect.replace(":", " / ");
}
