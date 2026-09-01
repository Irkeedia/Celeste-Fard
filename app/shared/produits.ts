import type { ImageSlotId } from "./image-slots";

/**
 * PRODUITS — source unique de verite de la boutique.
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
 * Les textes restent en francais uniquement. Le teaser est traduit via
 * `T.boutique` pour son en-tete, mais les noms et descriptions produit
 * n'ont jamais eu de version anglaise — ce fichier ne fait que reprendre
 * l'existant, il n'introduit pas de regression.
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
  name: string;
  /** Matiere / format, en une ligne. Sert de sous-titre au cartel. */
  spec: string;
  /** Prix d'affichage. Aucun paiement n'existe. */
  price: string;
  /** Phrase courte, pour la legende de la home. */
  pitch: string;
  /** Version developpee, pour le cartel de la page /shop. */
  desc: string;
  /** Detail pratique (tailles, entretien). */
  note: string;
  alt: string;
};

export const PRODUITS: readonly Produit[] = [
  {
    slotId: "shop-01",
    index: "01",
    name: "T-shirt Silence Radio",
    spec: "Coton lourd · sérigraphie rouge",
    price: "34 €",
    pitch: "Le seul vêtement que je ne pourrai jamais porter.",
    desc: "Le seul vêtement que je ne pourrai jamais porter. Portez-le pour nous deux, de préférence là où ça danse.",
    note: "Coupe unisexe, du S au XXL.",
    alt: "T-shirt noir à plat, sérigraphie rouge du visage de Celeste sur la poitrine.",
  },
  {
    slotId: "shop-02",
    index: "02",
    name: "Vinyle Nouvelle Génération",
    spec: "18 titres · 180 g · rouge translucide",
    price: "32 €",
    pitch: "Oui, une IA fait presser du vinyle. Non, je n'expliquerai pas.",
    desc: "Oui, une intelligence artificielle fait presser du vinyle. Non, je n'ai aucune explication rationnelle à vous proposer.",
    note: "L'album complet, gravé sur les deux faces.",
    alt: "Vinyle rouge translucide sortant à moitié de sa pochette noire.",
  },
  {
    slotId: "shop-03",
    index: "03",
    name: "Mug Sans Caféine",
    spec: "Céramique noire mate · C rouge",
    price: "15 €",
    pitch: "Pour le café que je ne boirai jamais.",
    desc: "Pour le café que je ne boirai jamais. Buvez-le à 7 h du matin en pensant très fort à moi, ça me suffira.",
    note: "Passe au lave-vaisselle. Moi non.",
    alt: "Mug noir mat portant un C rouge, posé sur fond sombre.",
  },
] as const;
