/**
 * Generateur d'images Celeste via ComfyUI + Flux.1-dev + LoRA local.
 *
 * Troisieme pendant des scripts Gemini et xAI, meme format de jobs — mais
 * c'est celui-ci qui devrait etre le defaut :
 *
 * - **Le LoRA `celeste_char` a APPRIS le visage**, la ou Gemini et xAI
 *   l'approximent a partir d'images de reference a chaque appel. La
 *   ressemblance est donc bien plus stable.
 * - Tourne en local : aucun cout par image, aucune moderation distante.
 * - Le mot declencheur du LoRA est `celeste_char` — le prompt DOIT commencer
 *   par lui, c'est le token appris a l'entrainement (voir les captions du
 *   dataset dans ~/Flux/mes-personnages/Celeste/20_celeste_char/*.txt).
 *
 * Prerequis : ComfyUI lance sur le port 8188.
 *   cd ~/Flux/ComfyUI && ~/Flux/miniconda3/envs/flux/bin/python main.py --port 8188
 *
 * Le graphe reprend le workflow deja valide (~/Flux/workflows/flux-dev-q8-gguf.json) :
 * modele GGUF Q8 (plus leger que le fp8 de 17 Go), DualCLIPLoader t5xxl+clip_l,
 * KSampler euler/simple a cfg 1 — Flux n'utilise pas le CFG classique, le
 * guidage passe par le noeud FluxGuidance.
 *
 * Usage :
 *   node scripts/generate-images-comfy.mjs <jobs.json>
 *
 * Format d'un job :
 *   { prompt, out, width?, height?, steps?, seed?, lora_strength?, guidance? }
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const HOST = process.env.COMFY_HOST ?? "http://127.0.0.1:8188";

function graphe({ prompt, width, height, steps, seed, lora_strength, guidance, lora }) {
  return {
    1: { class_type: "UnetLoaderGGUF", inputs: { unet_name: "flux1-dev-Q8_0.gguf" } },
    10: {
      class_type: "LoraLoaderModelOnly",
      inputs: { model: ["1", 0], lora_name: lora, strength_model: lora_strength },
    },
    2: {
      class_type: "DualCLIPLoader",
      inputs: {
        clip_name1: "t5xxl_fp16.safetensors",
        clip_name2: "clip_l.safetensors",
        type: "flux",
      },
    },
    3: { class_type: "VAELoader", inputs: { vae_name: "ae.safetensors" } },
    4: { class_type: "CLIPTextEncode", inputs: { clip: ["2", 0], text: prompt } },
    11: { class_type: "FluxGuidance", inputs: { conditioning: ["4", 0], guidance } },
    // Flux dev n'a pas de vrai negatif : on neutralise le conditionnement.
    5: { class_type: "ConditioningZeroOut", inputs: { conditioning: ["4", 0] } },
    6: { class_type: "EmptySD3LatentImage", inputs: { width, height, batch_size: 1 } },
    7: {
      class_type: "KSampler",
      inputs: {
        model: ["10", 0],
        positive: ["11", 0],
        negative: ["5", 0],
        latent_image: ["6", 0],
        seed,
        steps,
        cfg: 1,
        sampler_name: "euler",
        scheduler: "simple",
        denoise: 1,
      },
    },
    8: { class_type: "VAEDecode", inputs: { samples: ["7", 0], vae: ["3", 0] } },
    9: { class_type: "SaveImage", inputs: { images: ["8", 0], filename_prefix: "celeste" } },
  };
}

export async function generate(job) {
  const p = {
    width: 896,
    height: 1120, // 4:5, multiples de 16
    steps: 25,
    seed: Math.floor(Math.random() * 1e15),
    lora_strength: 0.9,
    guidance: 3.5,
    lora: "celeste_char.safetensors",
    ...job,
  };

  const res = await fetch(`${HOST}/prompt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: graphe(p) }),
  });
  if (!res.ok) throw new Error(`POST /prompt ${res.status}: ${(await res.text()).slice(0, 400)}`);
  const { prompt_id } = await res.json();

  // Le rendu est asynchrone : on interroge l'historique jusqu'a ce que le
  // job y apparaisse avec ses sorties.
  for (let i = 0; i < 600; i++) {
    await new Promise((r) => setTimeout(r, 1000));
    const h = await (await fetch(`${HOST}/history/${prompt_id}`)).json();
    const entry = h[prompt_id];
    if (!entry) continue;

    const statut = entry.status?.status_str;
    if (statut === "error") {
      const msg = entry.status?.messages?.find((m) => m[0] === "execution_error");
      throw new Error(`ComfyUI: ${JSON.stringify(msg?.[1] ?? entry.status).slice(0, 400)}`);
    }

    const img = Object.values(entry.outputs ?? {}).flatMap((o) => o.images ?? [])[0];
    if (!img) continue;

    const q = new URLSearchParams({
      filename: img.filename,
      subfolder: img.subfolder ?? "",
      type: img.type ?? "output",
    });
    const bin = await fetch(`${HOST}/view?${q}`);
    const buf = Buffer.from(await bin.arrayBuffer());
    mkdirSync(dirname(p.out), { recursive: true });
    writeFileSync(p.out, buf);
    return { out: p.out, bytes: buf.length, seed: p.seed, secondes: i + 1 };
  }
  throw new Error("Delai depasse (10 min)");
}

if (process.argv[2]) {
  const jobs = JSON.parse(readFileSync(process.argv[2], "utf8"));
  let failed = 0;
  // Sequentiel volontairement : une seule carte, paralleliser ne ferait que
  // provoquer des rechargements de modele entre les jobs.
  for (const job of jobs) {
    try {
      const r = await generate(job);
      console.log(`OK   ${r.out}  ${(r.bytes / 1024).toFixed(0)}KB  seed=${r.seed}  ${r.secondes}s`);
    } catch (e) {
      failed++;
      console.log(`FAIL ${job.out}  ${e.message.slice(0, 300)}`);
    }
  }
  console.log(`\n=== ${jobs.length - failed}/${jobs.length} images generees ===`);
}
