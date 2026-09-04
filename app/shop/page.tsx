import type { Metadata } from "next";

import { ShopContent } from "./shop-content";

/**
 * BOUTIQUE — coquille SERVEUR.
 *
 * Ne porte que les metadonnees : tout le JSX vit dans `shop-content.tsx`,
 * un composant client, parce que la traduction passe par le hook `useT()`.
 * Voir l'en-tete de ce fichier pour le detail de la mise en page.
 *
 * Les metadonnees sont en ANGLAIS : elles sont statiques et rendues par le
 * serveur, qui sert desormais l'anglais (cf. shared/lang.tsx).
 */

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Three objects, not thirty: a T-shirt, the Nouvelle Génération vinyl and a mug. No online sales for now — just Celeste Fard's wardrobe.",
};

export default function ShopPage() {
  return <ShopContent />;
}
