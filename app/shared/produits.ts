import type { ImageSlotId } from "./image-slots";
import type { Bi } from "./lang";

/**
 * PRODUITS — source unique de verite de la boutique, bilingue.
 *
 * Avant ce fichier, les trois objets etaient declares DEUX fois : dans le
 * teaser de la home et dans la page /shop. Les deux listes avaient diverge
 * (39/32/19 contre 34/32/15, et le vinyle s'appelait "Entre Les Murs" d'un
 * cote, "Nouvelle Generation" de l'autre). Les deux vues importent donc
 * desormais la meme constante : une divergence n'est plus possible.
 *
 * Les visuels /image/gen/shop-0x.jpg ont un fond NOIR PUR, efface a
 * l'affichage par `mix-blend-mode: screen` (classe globale `u-screen`).
 * C'est ce qui permet de poser un produit dans n'importe quelle case sans
 * cadre : l'objet flotte dans le noir de la page.
 *
 * L'anglais n'est pas un calque : "Passe au lave-vaisselle. Moi non."
 * devient "Dishwasher safe. I'm not." — la vanne est reecrite, pas
 * traduite. Meme ligne editoriale que `shared/textes.ts`.
 *
 * AUCUN paiement n'existe sur ce site : `price` est un prix d'affichage,
 * pas un montant debitable. Rien n'est achetable, et les deux vues le
 * disent explicitement.
 */

export type Produit = {
  /** Slot d'image declare dans image-slots.ts (visuel carre, fond noir). */
  slotId: Extract<ImageSlotId, "shop-01" | "shop-02" | "shop-03">;
  /** Numero de planche, affiche tel quel dans les legendes. */
  index: string;
  name: Bi;
  /** Matiere / format, en une ligne. Sert de sous-titre au cartel. */
  spec: Bi;
  /**
   * Prix d'affichage. Volontairement une chaine SIMPLE et non un `Bi` :
   * le format europeen "34 €" se lit sans ambiguite dans les deux langues,
   * et l'artiste est francaise. Aucun paiement n'existe de toute facon.
   */
  price: string;
  /** Phrase courte, pour la legende de la home. */
  pitch: Bi;
  /** Version developpee, pour le cartel de la page /shop. */
  desc: Bi;
  /** Detail pratique (tailles, entretien). */
  note: Bi;
  alt: Bi;
};

export const PRODUITS: readonly Produit[] = [
  {
    slotId: "shop-01",
    index: "01",
    name: {
      fr: "T-shirt Silence Radio",
      en: "Radio Silence T-shirt",
    },
    spec: {
      fr: "Coton lourd · sérigraphie rouge",
      en: "Heavyweight cotton · red screen print",
    },
    price: "34 €",
    pitch: {
      fr: "Le seul vêtement que je ne pourrai jamais porter.",
      en: "The one piece of clothing I'll never get to wear.",
    },
    desc: {
      fr: "Le seul vêtement que je ne pourrai jamais porter. Portez-le pour nous deux, de préférence là où ça danse.",
      en: "The one piece of clothing I'll never get to wear. Wear it for the both of us — ideally somewhere with a dancefloor.",
    },
    note: {
      fr: "Coupe unisexe, du S au XXL.",
      en: "Unisex fit, S to XXL.",
    },
    alt: {
      fr: "T-shirt noir à plat, sérigraphie rouge du visage de Celeste sur la poitrine.",
      en: "Flat-lay black T-shirt with a red screen print of Celeste's face across the chest.",
    },
  },
  {
    slotId: "shop-02",
    index: "02",
    /* "Nouvelle Génération" est le titre de l'album : c'est un nom propre,
       il ne se traduit pas. */
    name: {
      fr: "Vinyle Nouvelle Génération",
      en: "Nouvelle Génération Vinyl",
    },
    spec: {
      fr: "18 titres · 180 g · rouge translucide",
      en: "18 tracks · 180 g · translucent red",
    },
    price: "32 €",
    pitch: {
      fr: "Oui, une IA fait presser du vinyle. Non, je n'expliquerai pas.",
      en: "Yes, an AI is pressing vinyl. No, I won't be explaining.",
    },
    desc: {
      fr: "Oui, une intelligence artificielle fait presser du vinyle. Non, je n'ai aucune explication rationnelle à vous proposer.",
      en: "Yes, an artificial intelligence is having vinyl pressed. No, I have no rational explanation to offer you.",
    },
    note: {
      fr: "L'album complet, gravé sur les deux faces.",
      en: "The full album, cut on both sides.",
    },
    alt: {
      fr: "Vinyle rouge translucide sortant à moitié de sa pochette noire.",
      en: "Translucent red vinyl record half out of its black sleeve.",
    },
  },
  {
    slotId: "shop-03",
    index: "03",
    name: {
      fr: "Mug Sans Caféine",
      en: "Caffeine-Free Mug",
    },
    spec: {
      fr: "Céramique noire mate · C rouge",
      en: "Matte black ceramic · red C",
    },
    price: "15 €",
    pitch: {
      fr: "Pour le café que je ne boirai jamais.",
      en: "For the coffee I'll never drink.",
    },
    desc: {
      fr: "Pour le café que je ne boirai jamais. Buvez-le à 7 h du matin en pensant très fort à moi, ça me suffira.",
      en: "For the coffee I'll never drink. Have it at 7am thinking very hard about me — that'll do.",
    },
    note: {
      fr: "Passe au lave-vaisselle. Moi non.",
      en: "Dishwasher safe. I'm not.",
    },
    alt: {
      fr: "Mug noir mat portant un C rouge, posé sur fond sombre.",
      en: "Matte black mug with a red C, set against a dark background.",
    },
  },
] as const;
