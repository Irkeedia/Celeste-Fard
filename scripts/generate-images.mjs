/**
 * Generateur d'images Celeste via Gemini (API "interactions").
 *
 * Pourquoi ce script : tous les visuels du site doivent montrer LA MEME
 * personne. On passe donc des images de reference (scripts/refs/) a chaque
 * appel — gemini-3-pro-image accepte jusqu'a 14 references et conserve
 * le visage d'un rendu a l'autre.
 *
 * Usage :
 *   node --env-file=.env.local scripts/generate-images.mjs <jobs.json> [concurrence]
 *
 * Format d'un job :
 *   { prompt, refs: ["Celestefardhero", ...], aspect: "4:5",
 *     size: "1K" | "2K" | "4K", model?, out: "public/image/gen/xxx.jpg" }
 *
 * Conventions du projet :
 * - TOUJOURS demander un "PURE SOLID BLACK background" dans le prompt : le
 *   CSS s'appuie dessus (mix-blend-mode: screen) pour detourer le sujet
 *   sans passer par un PNG a fond transparent.
 * - Pour un visuel SANS personnage (produit), laisser `refs` vide ET ecrire
 *   "NO PERSON, NO HUMAN" dans le prompt : sinon le modele invente
 *   quelqu'un pour remplir le cadre.
 * - Recompresser apres coup : les sorties brutes font 2 a 3 Mo piece.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const KEY = process.env.GEMINI_API_KEY;
if (!KEY) throw new Error("GEMINI_API_KEY absente (attendue dans .env.local)");

const REF_DIR = join(dirname(fileURLToPath(import.meta.url)), "refs");

function refPart(name) {
  return {
    type: "image",
    mime_type: "image/jpeg",
    data: readFileSync(`${REF_DIR}/${name}.jpg`).toString("base64"),
  };
}

export async function generate({ prompt, refs = [], aspect = "1:1", size = "2K", out, model = "gemini-3-pro-image" }) {
  const body = {
    model,
    input: [{ type: "text", text: prompt }, ...refs.map(refPart)],
    response_format: { type: "image", mime_type: "image/jpeg", aspect_ratio: aspect, image_size: size },
  };

  const res = await fetch("https://generativelanguage.googleapis.com/v1beta/interactions", {
    method: "POST",
    headers: { "x-goog-api-key": KEY, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 400)}`);
  const json = await res.json();

  // L'image vit dans le step model_output, pas a un index fixe (steps[0] est un "thought").
  const img = json.steps
    ?.flatMap((s) => s.content ?? [])
    .find((c) => c.type === "image" && c.data);
  if (!img) throw new Error(`Pas d'image. status=${json.status} steps=${json.steps?.map((s) => s.type)}`);

  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, Buffer.from(img.data, "base64"));
  return { out, bytes: Buffer.from(img.data, "base64").length, tokens: json.usage?.total_tokens };
}

// Execution directe avec un fichier de jobs, concurrence limitee pour eviter le rate-limit.
if (process.argv[2]) {
  const jobs = JSON.parse(readFileSync(process.argv[2], "utf8"));
  const LIMIT = Number(process.argv[3] ?? 4);
  let cursor = 0;
  let failed = 0;

  const worker = async () => {
    while (cursor < jobs.length) {
      const job = jobs[cursor++];
      try {
        const r = await generate(job);
        console.log(`OK   ${job.out}  ${(r.bytes / 1024).toFixed(0)}KB  ${r.tokens}tok`);
      } catch (e) {
        failed++;
        console.log(`FAIL ${job.out}  ${e.message.slice(0, 160)}`);
      }
    }
  };

  await Promise.all(Array.from({ length: Math.min(LIMIT, jobs.length) }, worker));
  console.log(`\n=== ${jobs.length - failed}/${jobs.length} images generees ===`);
}
