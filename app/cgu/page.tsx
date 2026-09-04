import type { Metadata } from "next";

import { CguContent } from "./cgu-content";

/**
 * CGU — coquille SERVEUR.
 *
 * Ne porte que les metadonnees : tout le JSX vit dans `cgu-content.tsx`,
 * un composant client, parce que la traduction passe par le hook `useT()`
 * — et un hook impose un composant client, alors que `export const
 * metadata` n'est lu par Next que dans un composant serveur. Les deux ne
 * peuvent donc pas cohabiter dans le meme fichier.
 *
 * Les metadonnees sont en ANGLAIS : elles sont statiques et rendues par
 * le serveur, qui sert desormais l'anglais (cf. shared/lang.tsx).
 */

export const metadata: Metadata = {
  /* Pas de " | Celeste Fard" ici : le layout racine applique deja le
     gabarit `%s · Celeste Fard`, le nom sortirait donc deux fois. */
  title: "Terms of use",
  description:
    "Terms of use of the Celeste Fard website, an artistic project assisted by artificial intelligence. Only the French version is legally binding.",
};

export default function CguPage() {
  return <CguContent />;
}
