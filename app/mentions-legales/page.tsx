import type { Metadata } from "next";

import { MentionsContent } from "./mentions-content";

/**
 * MENTIONS LEGALES — coquille SERVEUR.
 *
 * Ne porte que les metadonnees : tout le JSX vit dans
 * `mentions-content.tsx`, un composant client, parce que la traduction
 * passe par le hook `useT()` — et qu'un hook impose le client, alors que
 * `export const metadata` n'est lu par Next que dans un composant
 * serveur. Voir l'en-tete de `mentions-content.tsx` pour le detail.
 *
 * Les metadonnees sont en ANGLAIS : elles sont statiques et rendues par
 * le serveur, qui sert desormais l'anglais (cf. shared/lang.tsx).
 */

export const metadata: Metadata = {
  /* Pas de " | Celeste Fard" ici : le layout racine applique deja le
     gabarit `%s · Celeste Fard`, le nom sortirait donc deux fois. */
  title: "Legal notice",
  description:
    "Publisher, intellectual property, artificial intelligence and transparency for the Celeste Fard website. Only the French version is legally binding.",
};

export default function MentionsLegalesPage() {
  return <MentionsContent />;
}
