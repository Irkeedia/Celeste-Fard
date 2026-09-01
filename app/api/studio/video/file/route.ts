/**
 * Relais de telechargement de la video generee.
 *
 * L'URI renvoyee par Veo n'est accessible qu'avec la cle API. Plutot que
 * d'exposer la cle au navigateur, on rapatrie le fichier ici.
 *
 * ATTENTION : une route qui recupere une URL fournie par le client est un
 * proxy ouvert si on ne la contraint pas — n'importe qui pourrait s'en
 * servir pour atteindre des ressources internes (SSRF). D'ou la liste
 * blanche de domaines ci-dessous, en plus de l'authentification.
 */
import { cookies } from "next/headers";

import { COOKIE, jetonValide } from "../../../../studio/auth";

export const maxDuration = 300;

const HOTES_AUTORISES = new Set([
  "generativelanguage.googleapis.com",
  "storage.googleapis.com",
]);

export async function GET(request: Request) {
  const jar = await cookies();
  if (!jetonValide(jar.get(COOKIE)?.value)) {
    return new Response("Non authentifie", { status: 401 });
  }

  const brut = new URL(request.url).searchParams.get("uri");
  if (!brut) return new Response("Parametre uri manquant", { status: 400 });

  let cible: URL;
  try {
    cible = new URL(brut);
  } catch {
    return new Response("URI invalide", { status: 400 });
  }

  if (cible.protocol !== "https:" || !HOTES_AUTORISES.has(cible.hostname)) {
    return new Response("Domaine non autorise", { status: 403 });
  }

  const amont = await fetch(cible, {
    headers: { "x-goog-api-key": process.env.GEMINI_API_KEY ?? "" },
  });
  if (!amont.ok || !amont.body) {
    return new Response(`Telechargement impossible (${amont.status})`, { status: 502 });
  }

  return new Response(amont.body, {
    headers: {
      "Content-Type": amont.headers.get("content-type") ?? "video/mp4",
      "Content-Disposition": 'attachment; filename="celeste.mp4"',
      "Cache-Control": "no-store",
    },
  });
}
