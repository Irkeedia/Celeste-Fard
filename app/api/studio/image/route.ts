/**
 * Generation d'image via Gemini, depuis le navigateur.
 *
 * Reprend exactement la logique de `scripts/generate-images.mjs` — meme
 * endpoint `interactions`, memes references — a une difference pres : les
 * images de reference ne sont pas lues sur le disque mais **rechargees
 * depuis le site lui-meme**. Sur Vercel, `public/` est servi par le CDN et
 * n'est pas embarque dans le bundle de la fonction : `readFileSync` y
 * echouerait en production alors qu'il marche en local.
 *
 * `maxDuration = 300` : une generation prend 30 a 60 s, tres au-dela des
 * 10 s par defaut. Necessite Fluid Compute (actif par defaut sur Vercel).
 */
import { cookies } from "next/headers";

import { COOKIE, jetonValide } from "../../../studio/auth";

export const maxDuration = 300;

/** Portraits qui tiennent le mieux le visage — voir la memoire du pipeline. */
const REFS = [
  "/image/Celestefardhero.jpg",
  "/image/celesteencoreunportrait.jpg",
  "/image/celesteprofilblanc.jpg",
  "/image/celestelematin.jpg",
  "/image/celesteroses.jpg",
  "/image/celestebateauok.jpg",
  "/image/gen/irl-03.jpg",
  "/image/gen/irl-04.jpg",
  "/image/gen/irl-06.jpg",
  "/image/gen/portrait-alt.jpg",
  "/image/gen/hero-portrait.jpg",
];

/**
 * Prefixe ajoute a chaque prompt : l'identite du personnage et sa carnation,
 * qui doivent rester constantes d'une image a l'autre.
 *
 * L'ANCRAGE CONTEMPORAIN N'EST PAS DECORATIF. « Femme rousse, peau tres
 * pale, longs cheveux ondulues » est un archetype massivement associe, dans
 * les donnees d'entrainement, a l'imagerie prerapha elite et fantasy. Sans
 * decor explicitement moderne, le modele y retombe seul : les premiers
 * essais du studio ont produit des sorcieres medievales en cape de velours,
 * a partir de prompts pourtant neutres. Les prompts ecrits a la main ne
 * tombaient pas dans le piege parce qu'ils nommaient toujours un lieu
 * contemporain (rooftop, voiture, cafe) — ce qu'un prompt court ne fait pas.
 */
const IDENTITE =
  "Contemporary editorial photograph of THIS EXACT WOMAN — she must be instantly recognisable as the woman in the reference images. " +
  "Preserve her identity with absolute precision: her exact facial bone structure, her long wavy vivid orange-red hair, " +
  "her light blue-green eyes, her narrow straight nose, her exact mouth shape. " +
  "Her skin is VERY PALE PORCELAIN with only a FEW faint freckles across the bridge of the nose — she is NOT heavily freckled. " +
  "ZERO superficiality, no heavy makeup. Realistic skin texture with subtle imperfections. " +
  "SETTING: present day, modern real world, contemporary clothing. " +
  "STRICTLY FORBIDDEN unless the scene explicitly asks for it: fantasy, medieval, historical or period settings, " +
  "witches, elves, castles, ruins, capes, cloaks, velvet gowns, staffs, swords, crowns, magic, painterly or pre-Raphaelite style. " +
  "SCENE: ";

/**
 * Suffixe technique. Place APRES la scene decrite par l'utilisateur : les
 * dernieres instructions pesent autant que les premieres, et c'est ce qui
 * verrouille le rendu photographique une fois la scene posee.
 */
const RENDU =
  " Shot on a full-frame camera, editorial magazine quality, natural realistic colours, " +
  "shallow depth of field, fine film grain. Photorealistic — not an illustration, not a painting, not a render. " +
  // Rappel final de l'identite : sur un prompt long, la consigne d'ouverture
  // se dilue et le modele rend « une rousse » au lieu de CETTE femme. La
  // repeter en cloture est ce qui reduit le plus les hors-sujet.
  "MOST IMPORTANT REQUIREMENT: the woman must be the EXACT SAME PERSON as in the reference images — " +
  "identical face, identical bone structure, identical eyes, identical hair colour. " +
  "If anything conflicts with her likeness, keep her likeness.";

export async function POST(request: Request) {
  const jar = await cookies();
  if (!jetonValide(jar.get(COOKIE)?.value)) {
    return Response.json({ erreur: "Non authentifie" }, { status: 401 });
  }

  const cle = process.env.GEMINI_API_KEY;
  if (!cle) return Response.json({ erreur: "GEMINI_API_KEY absente" }, { status: 500 });

  const { prompt, aspect = "4:5", refs = true } = await request.json();
  if (!prompt || typeof prompt !== "string") {
    return Response.json({ erreur: "Prompt manquant" }, { status: 400 });
  }

  // Les references sont sur le meme deploiement : on repart de l'origine de
  // la requete, ce qui marche aussi bien en local qu'en production.
  const origine = new URL(request.url).origin;
  const images = refs
    ? await Promise.all(
        REFS.map(async (chemin) => {
          const r = await fetch(`${origine}${chemin}`);
          if (!r.ok) throw new Error(`Reference introuvable: ${chemin}`);
          const b64 = Buffer.from(await r.arrayBuffer()).toString("base64");
          return { type: "image", mime_type: "image/jpeg", data: b64 };
        }),
      )
    : [];

  const res = await fetch("https://generativelanguage.googleapis.com/v1beta/interactions", {
    method: "POST",
    headers: { "x-goog-api-key": cle, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gemini-3-pro-image",
      input: [{ type: "text", text: IDENTITE + prompt + RENDU }, ...images],
      response_format: {
        type: "image",
        mime_type: "image/jpeg",
        aspect_ratio: aspect,
        image_size: "2K",
      },
    }),
  });

  if (!res.ok) {
    const brut = await res.text();
    // Les refus de moderation arrivent en 400 : on les nomme, sinon
    // l'utilisateur croit a une panne.
    const modere = /safety|blocked|moderation/i.test(brut);
    return Response.json(
      {
        erreur: modere
          ? "Image refusee par la moderation de Gemini. Reformule la scene ou resserre le cadrage."
          : `Erreur Gemini (${res.status})`,
        detail: brut.slice(0, 300),
      },
      { status: res.status },
    );
  }

  const json = await res.json();
  // L'image vit dans le step `model_output`, pas a un index fixe.
  const img = json.steps
    ?.flatMap((s: { content?: unknown[] }) => s.content ?? [])
    .find((c: { type?: string; data?: string }) => c.type === "image" && c.data) as
    | { data: string }
    | undefined;

  if (!img) return Response.json({ erreur: "Aucune image dans la reponse" }, { status: 502 });

  return Response.json({ image: `data:image/jpeg;base64,${img.data}` });
}
