#!/usr/bin/env bash
# Installe et lance ComfyUI sur un pod RunPod, avec Flux et les LoRA Celeste.
#
# Pourquoi on n'utilise pas l'image `runpod/comfyui` : elle demarre bien mais
# son entrypoint gere lui-meme le lancement, et le script d'amorçage passe
# avant sans que ses erreurs ne remontent — resultat, ComfyUI repondait a vide
# sans aucun modele (essai du 3 septembre). Ici on part d'une image PyTorch
# nue : c'est 5 minutes de plus au demarrage, mais chaque etape est visible et
# verifiable, comme pour l'entrainement.
set -uo pipefail
mkdir -p /workspace
exec > >(tee -a /workspace/comfy-boot.log) 2>&1
echo "=== DEBUT $(date -u) ==="
WS=/workspace
PY=$(command -v python3 || command -v python)

# Publie le log sur HF apres chaque etape : sans ca, un pod qui ne repond pas
# est totalement opaque (on ne peut pas lire les logs d'un pod via l'API).
push() {
  $PY - <<'PYL' 2>/dev/null || true
import os
from huggingface_hub import HfApi
api=HfApi(token=os.environ["HF_TOKEN"])
repo=os.environ["HF_USER"]+"/celeste-lora-v3"
api.create_repo(repo, private=True, exist_ok=True)
api.upload_file(path_or_fileobj="/workspace/comfy-boot.log",
                path_in_repo="comfy-boot.log", repo_id=repo)
PYL
}

# CHIEN DE GARDE AUTONOME. La nuit du 3 au 4 septembre, ce pod a tourne ~13 h
# pour rien (6,40 $) : je comptais sur le pod d'entrainement pour l'eteindre en
# terminant, et ce chainage a echoue sans que je puisse savoir pourquoi — mon
# push_log tournait AVANT les lignes d'extinction, donc elles n'apparaissaient
# jamais dans le log publie.
# La lecon : un pod qui coute de l'argent doit porter sa propre mort. Ne jamais
# dependre d'une autre machine pour s'eteindre.
WATCHDOG_H=${WATCHDOG_H:-4}
( sleep $((WATCHDOG_H * 3600))
  curl -s -X POST "https://api.runpod.io/graphql?api_key=${RUNPOD_API_KEY:-}" \
    -H "Content-Type: application/json" \
    -d "{\"query\":\"mutation { podTerminate(input:{podId:\\\"${RUNPOD_POD_ID:-}\\\"}) }\"}" ) &
echo "chien de garde arme : extinction dans ${WATCHDOG_H}h"

$PY -m pip install -q --no-cache-dir "huggingface_hub>=0.26" hf_transfer 2>&1 | tail -1
export HF_HUB_ENABLE_HF_TRANSFER=1

echo "--- 1/4 ComfyUI ---"
cd $WS
git clone -q --depth 1 https://github.com/comfyanonymous/ComfyUI.git
cd $WS/ComfyUI
$PY -m pip install -q --no-cache-dir -r requirements.txt 2>&1 | tail -2
echo "  ComfyUI installe"
push

echo "--- 2/4 modeles Flux (~34 Go) ---"
mkdir -p models/unet models/vae models/clip models/loras
$PY - <<'PYM'
import os
from huggingface_hub import hf_hub_download
t = os.environ["HF_TOKEN"]; M = "/workspace/ComfyUI/models"
for repo, fn, sub in [
    ("black-forest-labs/FLUX.1-dev", "flux1-dev.safetensors", "unet"),
    ("black-forest-labs/FLUX.1-dev", "ae.safetensors", "vae"),
    ("comfyanonymous/flux_text_encoders", "clip_l.safetensors", "clip"),
    ("comfyanonymous/flux_text_encoders", "t5xxl_fp16.safetensors", "clip"),
]:
    p = hf_hub_download(repo, fn, token=t, local_dir=f"{M}/{sub}")
    print("  ok", fn, round(os.path.getsize(p) / 1e9, 2), "Go")
PYM

push
echo "--- 3/4 LoRA Celeste ---"
$PY - <<'PYL'
import os
from huggingface_hub import HfApi, hf_hub_download
t = os.environ["HF_TOKEN"]; repo = os.environ["HF_USER"] + "/celeste-lora-v3"
d = "/workspace/ComfyUI/models/loras"
api = HfApi(token=t)
for f in api.list_repo_files(repo):
    if f.endswith(".safetensors"):
        hf_hub_download(repo, f, token=t, local_dir=d)
        print("  ok", f)
PYL
ls $WS/ComfyUI/models/loras/*.safetensors >/dev/null 2>&1 || { echo "ERREUR: aucun LoRA"; exit 1; }

# Les checkpoints continuent d'arriver si un entrainement tourne : on
# resynchronise en fond plutot que d'avoir a relancer le pod.
( while true; do
    sleep 300
    $PY - <<'PYS' 2>/dev/null
import os
from huggingface_hub import HfApi, hf_hub_download
t=os.environ["HF_TOKEN"]; repo=os.environ["HF_USER"]+"/celeste-lora-v3"
d="/workspace/ComfyUI/models/loras"; api=HfApi(token=t)
for f in api.list_repo_files(repo):
    if f.endswith(".safetensors") and not os.path.exists(os.path.join(d, f)):
        hf_hub_download(repo, f, token=t, local_dir=d); print("nouveau:", f)
PYS
  done ) &

push
echo "--- 4/4 lancement ---"
# --listen 0.0.0.0 : sans ca ComfyUI n'ecoute qu'en local et le proxy RunPod
# ne peut pas l'atteindre.
cd $WS/ComfyUI
# Surtout PAS `exec` : si main.py plante, le conteneur s'arrete, RunPod le
# relance, et le script repart du debut — boucle infinie ou l'erreur n'est
# jamais visible. On lance en arriere-plan, on laisse le temps a l'erreur de
# s'ecrire, on publie le log, puis on attend.
$PY main.py --listen 0.0.0.0 --port 8188 &
COMFY=$!
sleep 45
push
sleep 60
push
wait $COMFY
echo "=== main.py s'est arrete (code $?) ==="
push
# On evite la relance en boucle : si ComfyUI est mort, autant garder le pod
# vivant et inspectable plutot que de repartir de zero toutes les 6 minutes.
sleep 3600
