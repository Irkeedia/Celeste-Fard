/**
 * Generation video via Veo 3.1.
 *
 * Contrairement aux images, une video prend plusieurs MINUTES — au-dela de
 * toute limite de fonction serverless. L'API Google est donc asynchrone, et
 * cette route l'est aussi :
 *
 *   POST  -> lance le rendu, renvoie le nom de l'operation
 *   GET   -> interroge l'operation (?op=...), renvoie l'etat
 *
 * C'est le navigateur qui interroge en boucle : chaque appel dure une
 * fraction de seconde, aucun risque d'expiration.
 *
 * Le fichier final est servi par `video/file` : l'URI renvoyee par Google
 * exige la cle API, qui ne doit jamais atteindre le navigateur.
 */
import { cookies } from "next/headers";

import { COOKIE, jetonValide } from "../../../studio/auth";

export const maxDuration = 60;

const MODELE = "veo-3.1-fast-generate-preview";
const BASE = "https://generativelanguage.googleapis.com/v1beta";

/**
 * Veo ne recoit pas d'images de reference : l'identite doit etre decrite en
 * toutes lettres, sinon on obtient n'importe quelle rousse.
 *
 * L'ancrage contemporain repond au meme biais que cote image — « rousse
 * pale aux longs cheveux » derive spontanement vers le fantasy medieval.
 */
const IDENTITE =
  "A woman with long wavy vivid orange-red hair, very pale porcelain skin with a few faint freckles, " +
  "light blue-green eyes, natural beauty with no heavy makeup. " +
  "Present day, modern real world, contemporary clothing. " +
  "NO fantasy, NO medieval or historical setting, NO capes, cloaks, staffs or crowns. " +
  "Cinematic photorealistic footage, natural realistic colours, shallow depth of field. SCENE: ";

async function autorise() {
  const jar = await cookies();
  return jetonValide(jar.get(COOKIE)?.value);
}

export async function POST(request: Request) {
  if (!(await autorise())) return Response.json({ erreur: "Non authentifie" }, { status: 401 });

  const cle = process.env.GEMINI_API_KEY;
  if (!cle) return Response.json({ erreur: "GEMINI_API_KEY absente" }, { status: 500 });

  const { prompt, aspect = "9:16" } = await request.json();
  if (!prompt) return Response.json({ erreur: "Prompt manquant" }, { status: 400 });

  const res = await fetch(`${BASE}/models/${MODELE}:predictLongRunning`, {
    method: "POST",
    headers: { "x-goog-api-key": cle, "Content-Type": "application/json" },
    body: JSON.stringify({
      instances: [{ prompt: IDENTITE + prompt }],
      parameters: { aspectRatio: aspect, personGeneration: "allow_adult" },
    }),
  });

  const brut = await res.text();
  if (!res.ok) {
    return Response.json(
      { erreur: `Erreur Veo (${res.status})`, detail: brut.slice(0, 300) },
      { status: res.status },
    );
  }

  const { name } = JSON.parse(brut);
  if (!name) return Response.json({ erreur: "Pas d'operation renvoyee" }, { status: 502 });

  return Response.json({ operation: name });
}

export async function GET(request: Request) {
  if (!(await autorise())) return Response.json({ erreur: "Non authentifie" }, { status: 401 });

  const cle = process.env.GEMINI_API_KEY;
  const op = new URL(request.url).searchParams.get("op");
  if (!op) return Response.json({ erreur: "Parametre op manquant" }, { status: 400 });
  // L'operation est un chemin fourni par Google : on refuse tout ce qui
  // pourrait servir a viser une autre ressource.
  if (!/^models\/[\w.-]+\/operations\/[\w-]+$/.test(op)) {
    return Response.json({ erreur: "Operation invalide" }, { status: 400 });
  }

  const res = await fetch(`${BASE}/${op}`, { headers: { "x-goog-api-key": cle ?? "" } });
  if (!res.ok) {
    return Response.json({ erreur: `Erreur Veo (${res.status})` }, { status: res.status });
  }

  const json = await res.json();
  if (!json.done) return Response.json({ done: false });

  if (json.error) {
    return Response.json({ done: true, erreur: json.error.message ?? "Echec du rendu" });
  }

  const uri =
    json.response?.generateVideoResponse?.generatedSamples?.[0]?.video?.uri ??
    json.response?.generatedVideos?.[0]?.video?.uri;

  if (!uri) {
    return Response.json({ done: true, erreur: "Aucune video dans la reponse" });
  }

  return Response.json({
    done: true,
    videoUrl: `/api/studio/video/file?uri=${encodeURIComponent(uri)}`,
  });
}
