import type { Metadata } from "next";

import { ContactContent } from "./contact-content";

/**
 * CONTACT — coquille SERVEUR.
 *
 * Ne porte que les metadonnees : tout le JSX vit dans `contact-content.tsx`,
 * un composant client, parce que la traduction passe par le hook `useT()`.
 * Voir l'en-tete de ce fichier pour le detail du motif.
 *
 * Les metadonnees sont en ANGLAIS : elles sont statiques et rendues par le
 * serveur, qui sert desormais l'anglais (cf. shared/lang.tsx).
 */

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Booking, collabs, playlists, or just to say a track got you moving. Reach Celeste Fard's management and press here.",
};

export default function ContactPage() {
  return <ContactContent />;
}
