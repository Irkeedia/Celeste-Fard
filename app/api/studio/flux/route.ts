/**
 * Generation d'image via Flux.1-dev + LoRA local, depuis le navigateur.
 *
 * Pendant de `/api/studio/image` (Gemini), avec une difference de nature :
 * ici le visage n'est pas approxime a partir d'images de reference, il a ete
 * APPRIS par le LoRA `celeste_char`. Et surtout — c'est la raison d'etre de
 * cette route — **aucune moderation** : Gemini refuse tenues de plage et
 * cadrages qu'il juge suggestifs, Flux tourne sur notre propre machine.
 *
 * Le rendu se fait sur ComfyUI, qui n'est PAS sur Vercel. `COMFY_HOST` doit
 * pointer vers une instance joignable depuis la fonction :
 *   - en dev sur le PC : http://127.0.0.1:8188 (defaut)
 *   - depuis le site deploye : un pod ComfyUI RunPod, joignable en HTTPS par
 *     le proxy `https://{podId}-8188.proxy.runpod.net`. Le pod s'allume et
 *     s'eteint avec `training/comfy-pod.sh` — il facture tant qu'il vit, il
 *     n'est donc pas fait pour rester en place.
 * ComfyUI injoignable -> 503 explicite. C'est une limite d'architecture
 * connue, pas une panne.
 *
 * Graphe repris de `scripts/generate-images-comfy.mjs` : DualCLIP
 * t5xxl+clip_l, KSampler euler/simple a cfg 1 (Flux guide par FluxGuidance,
 * pas par le CFG classique). Le modele de base s'adapte a la machine.
 */
import { cookies } from "next/headers";

import { COOKIE, jetonValide } from "../../../studio/auth";

export const maxDuration = 300;

const HOST = process.env.COMFY_HOST ?? "http://127.0.0.1:8188";

/** GGUF compresse en local (16 Go), safetensors plein sur un pod (48 Go). */
const UNET = process.env.COMFY_UNET ?? "flux1-dev-Q8_0.gguf";

/**
 * Le LoRA n'est pas code en dur : on demande a ComfyUI ce dont il dispose et
 * on prend la version la plus recente. Sans ca, pointer vers un `_v3` pas
 * encore installe renvoie un 502 incomprehensible, et il faudrait rebasculer
 * le code a la main a chaque reentrainement. `COMFY_LORA` reste prioritaire
 * pour forcer une version precise.
 */
async function choisirLora(): Promise<string> {
  if (process.env.COMFY_LORA) return process.env.COMFY_LORA;
  try {
    const r = await fetch(`${HOST}/object_info/LoraLoaderModelOnly`, {
      signal: AbortSignal.timeout(10_000),
    });
    const dispo: string[] = (await r.json())?.LoraLoaderModelOnly?.input?.required?.lora_name?.[0] ?? [];
    const celeste = dispo.filter((n) => n.startsWith("celeste_char"));
    if (!celeste.length) return "celeste_char.safetensors";
    // On extrait les numeros plutot que de comparer les chaines : localeCompare
    // ignore la ponctuation et classait `celeste_char.safetensors` APRES
    // `celeste_char_v2.safetensors` (il comparait "...charsafetensors" a
    // "...charv2safetensors", donc s < v).
    //
    // Deux nomenclatures cohabitent :
    //   celeste_char_v3.safetensors              -> LoRA final
    //   celeste_char_v3-step00000400.safetensors -> checkpoint intermediaire
    // A version egale, le final l'emporte sur les checkpoints, et entre
    // checkpoints c'est le step le plus avance qui gagne.
    const rang = (n: string): [number, number] => [
      Number(/_v(\d+)/.exec(n)?.[1] ?? 1),
      /-step(\d+)/.test(n) ? Number(/-step(\d+)/.exec(n)![1]) : Number.MAX_SAFE_INTEGER,
    ];
    return celeste.reduce((a, b) => {
      const [va, sa] = rang(a);
      const [vb, sb] = rang(b);
      return vb > va || (vb === va && sb > sa) ? b : a;
    });
  } catch {
    return "celeste_char.safetensors";
  }
}

/** Formats du studio -> dimensions multiples de 16 exigees par Flux. */
const TAILLES: Record<string, { width: number; height: number }> = {
  "4:5": { width: 1024, height: 1280 },
  "9:16": { width: 896, height: 1584 },
  "1:1": { width: 1024, height: 1024 },
  "16:9": { width: 1584, height: 896 },
};

/**
 * Le mot declencheur du LoRA doit ouvrir le prompt : c'est le token appris a
 * l'entrainement. Les traits physiques sont rappeles derriere parce que le
 * LoRA porte le visage mais pas la colorimetrie du decor.
 */
const IDENTITE =
  "celeste_char, a woman with long wavy vivid orange-red hair and very pale porcelain skin " +
  "with a few light freckles, ";

/** Suffixe technique : verrouille le rendu photographique apres la scene. */
const RENDU =
  ", editorial photography, realistic skin texture, natural colours, " +
  "shallow depth of field, fine film grain, photographic, not illustrated";

function graphe(p: {
  prompt: string;
  width: number;
  height: number;
  steps: number;
  seed: number;
  force: number;
  guidance: number;
  lora: string;
  unet: string;
}) {
  return {
    // Le modele de base depend de la machine : en local c'est un GGUF Q8,
    // compresse pour tenir dans les 16 Go de la carte, et qui exige le custom
    // node ComfyUI-GGUF. Sur un pod 48 Go on charge le safetensors standard,
    // sans custom node a installer. On choisit le loader d'apres l'extension.
    1: p.unet.endsWith(".gguf")
      ? { class_type: "UnetLoaderGGUF", inputs: { unet_name: p.unet } }
      : { class_type: "UNETLoader", inputs: { unet_name: p.unet, weight_dtype: "default" } },
    10: {
      class_type: "LoraLoaderModelOnly",
      inputs: { model: ["1", 0], lora_name: p.lora, strength_model: p.force },
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
    4: { class_type: "CLIPTextEncode", inputs: { clip: ["2", 0], text: p.prompt } },
    11: { class_type: "FluxGuidance", inputs: { conditioning: ["4", 0], guidance: p.guidance } },
    // Flux dev n'a pas de vrai negatif : on neutralise le conditionnement.
    5: { class_type: "ConditioningZeroOut", inputs: { conditioning: ["4", 0] } },
    6: {
      class_type: "EmptySD3LatentImage",
      inputs: { width: p.width, height: p.height, batch_size: 1 },
    },
    7: {
      class_type: "KSampler",
      inputs: {
        model: ["10", 0],
        positive: ["11", 0],
        negative: ["5", 0],
        latent_image: ["6", 0],
        seed: p.seed,
        steps: p.steps,
        cfg: 1,
        sampler_name: "euler",
        scheduler: "simple",
        denoise: 1,
      },
    },
    8: { class_type: "VAEDecode", inputs: { samples: ["7", 0], vae: ["3", 0] } },
    9: { class_type: "SaveImage", inputs: { images: ["8", 0], filename_prefix: "studio" } },
  };
}

export async function POST(request: Request) {
  const jar = await cookies();
  if (!jetonValide(jar.get(COOKIE)?.value)) {
    return Response.json({ erreur: "Non authentifie" }, { status: 401 });
  }

  const { prompt, aspect = "4:5", force = 0.9, steps = 28 } = await request.json();
  if (!prompt || typeof prompt !== "string") {
    return Response.json({ erreur: "Prompt manquant" }, { status: 400 });
  }

  const taille = TAILLES[aspect] ?? TAILLES["4:5"];
  const lora = await choisirLora();
  const corps = {
    lora,
    unet: UNET,
    prompt: IDENTITE + prompt + RENDU,
    ...taille,
    steps: Math.min(Math.max(Number(steps) || 28, 10), 40),
    seed: Math.floor(Math.random() * 1e15),
    force: Math.min(Math.max(Number(force) || 0.9, 0.1), 1.5),
    guidance: 3.5,
  };

  let promptId: string;
  try {
    const res = await fetch(`${HOST}/prompt`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: graphe(corps) }),
      signal: AbortSignal.timeout(20_000),
    });
    if (!res.ok) {
      return Response.json(
        { erreur: `ComfyUI a refuse le job (${res.status})`, detail: (await res.text()).slice(0, 300) },
        { status: 502 },
      );
    }
    promptId = (await res.json()).prompt_id;
  } catch {
    // Cas de loin le plus frequent : ComfyUI eteint, ou tunnel tombe.
    return Response.json(
      {
        erreur:
          "ComfyUI injoignable. Lance-le sur le PC (port 8188) et verifie que COMFY_HOST pointe dessus.",
      },
      { status: 503 },
    );
  }

  // Rendu asynchrone : on interroge l'historique jusqu'a la sortie.
  // ~60 a 90 s par image, on plafonne sous les 300 s de la fonction.
  for (let i = 0; i < 270; i++) {
    await new Promise((r) => setTimeout(r, 1000));
    let entry;
    try {
      const h = await (await fetch(`${HOST}/history/${promptId}`)).json();
      entry = h[promptId];
    } catch {
      continue; // coupure passagere du tunnel : on retente
    }
    if (!entry) continue;

    if (entry.status?.status_str === "error") {
      const msg = entry.status?.messages?.find((m: unknown[]) => m[0] === "execution_error");
      return Response.json(
        { erreur: "Erreur ComfyUI", detail: JSON.stringify(msg?.[1] ?? entry.status).slice(0, 300) },
        { status: 502 },
      );
    }

    const img = (
      Object.values(entry.outputs ?? {}) as { images?: { filename: string; subfolder?: string; type?: string }[] }[]
    ).flatMap((o) => o.images ?? [])[0];
    if (!img) continue;

    const q = new URLSearchParams({
      filename: img.filename,
      subfolder: img.subfolder ?? "",
      type: img.type ?? "output",
    });
    const bin = await fetch(`${HOST}/view?${q}`);
    const b64 = Buffer.from(await bin.arrayBuffer()).toString("base64");
    return Response.json({ image: `data:image/png;base64,${b64}` });
  }

  return Response.json({ erreur: "Delai depasse (270 s)" }, { status: 504 });
}
