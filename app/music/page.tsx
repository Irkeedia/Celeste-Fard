import type { Metadata } from "next";

import {
  ALBUM_SECONDS,
  ALBUM_TITLE,
  formatAlbumDuration,
  PLAYLIST,
} from "../shared/playlist";
import { MusicContent } from "./music-content";

/**
 * MUSIQUE — coquille SERVEUR.
 *
 * Ne porte que les metadonnees : tout le JSX vit dans `music-content.tsx`,
 * un composant client, parce que la traduction passe par le hook `useT()`.
 * Un hook impose le client ; `export const metadata` n'est lu que sur le
 * serveur. Les deux ne peuvent donc pas cohabiter dans un meme fichier.
 *
 * Les metadonnees sont en ANGLAIS : elles sont statiques et rendues par le
 * serveur, qui sert desormais l'anglais (cf. shared/lang.tsx).
 *
 * Les chiffres viennent de `app/shared/playlist.ts`, source unique : la
 * description ne peut pas mentir sur le nombre de titres ni sur la duree.
 */

export const metadata: Metadata = {
  title: "Music",
  description: `${ALBUM_TITLE} — ${PLAYLIST.length} tracks, free to listen, ${formatAlbumDuration(
    ALBUM_SECONDS,
  )} of music from an AI that never sleeps.`,
};

export default function MusicPage() {
  return <MusicContent />;
}
