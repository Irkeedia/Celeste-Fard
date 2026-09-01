/**
 * Generateur d'images Celeste via xAI (Grok Imagine).
 *
 * Pendant du script Gemini (`generate-images.mjs`), meme format de jobs, pour
 * les visuels que Gemini refuse. Deux differences a connaitre :
 *
 * - **5 references maximum** ici, contre 14 chez Gemini. La ressemblance du
 *   visage est donc structurellement moins fiable : reserver ce script aux
 *   plans ou le visage n'est pas le sujet principal, et garder Gemini pour
 *   les portraits.
 * - L'API repond une **URL temporaire**, pas du base64 : il faut telecharger
 *   l'image dans la foulee, le lien expire.
 *
 * Endpoint : POST https://api.x.ai/v1/images/edits
 *   { model, prompt, images: [{ url: "data:image/jpeg;base64,..." }] }
 * Sans reference, /v1/images/generations suffit (meme forme, sans `images`).
 *
 * Cout : ~0,20 $ par image en `grok-imagine-image`, ~0,40 a 0,60 $ en 2.0.
 * Le champ `usage.cost_in_usd_ticks` vaut le prix en milliardiemes de dollar.
 *
 * Usage :
 *   node --env-file=.env.local scripts/generate-images-xai.mjs <jobs.json> [concurrence]
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const KEY = process.env.XAI_API_KEY;
if (!KEY) throw new Error("XAI_API_KEY absente (attendue dans .env.local)");

const REF_DIR = join(dirname(fileURLToPath(import.meta.url)), "refs");
const MAX_REFS = 5;

function refUrl(name) {
  const b64 = readFileSync(`${REF_DIR}/${name}.jpg`).toString("base64");
  return { url: `data:image/jpeg;base64,${b64}` };
}

export async function generate({ prompt, refs = [], out, model = "grok-imagine-image" }) {
  // Au-dela de 5 references l'API rejette : on tronque en le signalant plutot
  // que d'echouer sur un job qui vient du format Gemini (jusqu'a 14 refs).
  const used = refs.slice(0, MAX_REFS);
  const ignored = refs.length - used.length;

  const endpoint = used.length
    ? "https://api.x.ai/v1/images/edits"
    : "https://api.x.ai/v1/images/generations";

  const body = { model, prompt };
  if (used.length) body.images = used.map(refUrl);

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  if (!res.ok) {
    // xAI FACTURE les generations rejetees par la moderation (~0,30 $ piece).
    // On remonte le cout dans l'erreur, sinon un lot entierement refuse
    // s'affiche a 0 $ alors qu'il a bien ete debite.
    let facture = 0;
    try {
      facture = (JSON.parse(text).usage?.cost_in_usd_ticks ?? 0) / 1e9;
    } catch {
      /* corps non JSON : on ne sait pas, on laisse a 0 */
    }
    const err = new Error(`HTTP ${res.status}: ${text.slice(0, 300)}`);
    err.usd = facture;
    throw err;
  }

  const json = JSON.parse(text);
  const url = json.data?.[0]?.url;
  if (!url) throw new Error(`Pas d'image dans la reponse: ${text.slice(0, 300)}`);

  // Le lien est temporaire, on rapatrie tout de suite.
  const img = await fetch(url);
  if (!img.ok) throw new Error(`Telechargement HTTP ${img.status}`);
  const buf = Buffer.from(await img.arrayBuffer());

  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, buf);

  return {
    out,
    bytes: buf.length,
    usd: (json.usage?.cost_in_usd_ticks ?? 0) / 1e9,
    ignored,
  };
}

if (process.argv[2]) {
  const jobs = JSON.parse(readFileSync(process.argv[2], "utf8"));
  const LIMIT = Number(process.argv[3] ?? 3);
  let cursor = 0;
  let failed = 0;
  let total = 0;

  const worker = async () => {
    while (cursor < jobs.length) {
      const job = jobs[cursor++];
      try {
        const r = await generate(job);
        total += r.usd;
        const note = r.ignored ? `  (${r.ignored} refs ignorees, max ${MAX_REFS})` : "";
        console.log(`OK   ${job.out}  ${(r.bytes / 1024).toFixed(0)}KB  $${r.usd.toFixed(2)}${note}`);
      } catch (e) {
        failed++;
        total += e.usd ?? 0;
        const cout = e.usd ? ` [facture $${e.usd.toFixed(2)}]` : "";
        console.log(`FAIL ${job.out}${cout}  ${e.message.slice(0, 200)}`);
      }
    }
  };

  await Promise.all(Array.from({ length: Math.min(LIMIT, jobs.length) }, worker));
  console.log(`\n=== ${jobs.length - failed}/${jobs.length} images generees — $${total.toFixed(2)} ===`);
}
