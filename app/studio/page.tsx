/**
 * STUDIO — interface de generation, reservee.
 *
 * Composant serveur : il lit le cookie et decide quoi afficher. Le mot de
 * passe et la cle Gemini ne quittent jamais le serveur.
 *
 * `noindex` : cette page n'a rien a faire dans les moteurs de recherche.
 */
import type { Metadata } from "next";
import { cookies } from "next/headers";

import { COOKIE, jetonValide } from "./auth";
import { StudioClient } from "./studio-client";

export const metadata: Metadata = {
  title: "Studio",
  robots: { index: false, follow: false },
};

export default async function StudioPage() {
  const jar = await cookies();
  const connecte = jetonValide(jar.get(COOKIE)?.value);
  return <StudioClient connecteInitial={connecte} />;
}
