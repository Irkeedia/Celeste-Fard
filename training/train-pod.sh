#!/usr/bin/env bash
# Entrainement du LoRA celeste_char v3 sur un pod RunPod, de bout en bout.
#
# Le pod execute ce script au demarrage : modeles + dataset, entrainement,
# envoi du LoRA sur HuggingFace, puis AUTO-DESTRUCTION. C est l auto-destruction
# qui permet d eteindre le PC : sans elle le pod facturerait apres la fin.
#
# Variables injectees a la creation du pod :
#   HF_TOKEN, RUNPOD_API_KEY, HF_USER   (RUNPOD_POD_ID vient de RunPod)

set -uo pipefail
mkdir -p /workspace
exec > >(tee -a /workspace/train.log) 2>&1
echo "=== DEBUT $(date -u) ==="

WS=/workspace
DATASET_REPO="$HF_USER/celeste-dataset-v3"
OUT_REPO="$HF_USER/celeste-lora-v3"

# python/pip fiables : les images RunPod exposent parfois python3 seulement.
PY=$(command -v python3 || command -v python)
PIP="$PY -m pip"
echo "python : $PY ($($PY --version 2>&1))"
echo "pip    : $($PIP --version 2>&1 | head -1)"
echo "nvidia : $(nvidia-smi --query-gpu=name,memory.total --format=csv,noheader 2>&1 | head -1)"

# Envoi du log sur HF. Appele apres chaque etape : si le pod meurt, on sait ou.
push_log() {
  $PY - <<'PYLOG' 2>/dev/null || echo "(log non envoye)"
import os
from huggingface_hub import HfApi
api = HfApi(token=os.environ["HF_TOKEN"])
repo = os.environ["HF_USER"] + "/celeste-lora-v3"
api.create_repo(repo, private=True, exist_ok=True)
api.upload_file(path_or_fileobj="/workspace/train.log",
                path_in_repo="train.log", repo_id=repo)
PYLOG
}

autodestruct() {
  code=$?
  echo "=== FIN (code $code) $(date -u) ==="
  push_log
  if [ -n "${RUNPOD_API_KEY:-}" ] && [ -n "${RUNPOD_POD_ID:-}" ]; then
    echo "auto-destruction du pod $RUNPOD_POD_ID"
    curl -s -X POST "https://api.runpod.io/graphql?api_key=$RUNPOD_API_KEY" \
      -H "Content-Type: application/json" \
      -d "{\"query\":\"mutation { podTerminate(input:{podId:\\\"$RUNPOD_POD_ID\\\"}) }\"}"
  fi
}
trap autodestruct EXIT

# Chien de garde : tue le pod au bout de 5h si le script se fige.
( sleep 18000
  curl -s -X POST "https://api.runpod.io/graphql?api_key=${RUNPOD_API_KEY:-}" \
    -H "Content-Type: application/json" \
    -d "{\"query\":\"mutation { podTerminate(input:{podId:\\\"${RUNPOD_POD_ID:-}\\\"}) }\"}" ) &

echo "--- 1/6 dependances ---"
$PIP install -q --no-cache-dir "huggingface_hub>=0.26" hf_transfer 2>&1 | tail -2
export HF_HUB_ENABLE_HF_TRANSFER=1
$PY -c "import huggingface_hub; print('  hub', huggingface_hub.__version__)"
push_log

echo "--- 2/6 sd-scripts ---"
cd $WS
git clone -q --branch sd3 --single-branch https://github.com/kohya-ss/sd-scripts.git 2>&1 | tail -2
if [ ! -f "$WS/sd-scripts/flux_train_network.py" ]; then
  echo "ERREUR: flux_train_network.py absent apres le clone"; ls $WS/sd-scripts | head -20; exit 1
fi
# requirements.txt se termine par une ligne "." (le paquet local). Elle se
# resout par rapport au repertoire courant : lancee depuis /workspace, pip ne
# trouve pas de setup.py et ABANDONNE TOUT LE FICHIER — aucune dependance
# installee, et l entrainement plante 30 Go plus loin. Donc : cd d abord.
cd $WS/sd-scripts
$PIP install -q --no-cache-dir -r requirements.txt 2>&1 | tail -3
$PIP install -q --no-cache-dir bitsandbytes accelerate safetensors sentencepiece protobuf 2>&1 | tail -2
cd $WS
# Verification stricte : si un seul import manque, autant le savoir tout de
# suite plutot qu apres le telechargement des modeles.
$PY - <<'PYCHK' || { echo "ERREUR: dependances incompletes"; exit 1; }
import importlib, sys
missing = []
for m in ["torch","accelerate","transformers","diffusers","safetensors",
          "bitsandbytes","sentencepiece","einops","library"]:
    try: importlib.import_module(m)
    except Exception as e: missing.append(f"{m} ({type(e).__name__})")
import torch
print("  torch", torch.__version__, "cuda", torch.cuda.is_available())
if missing:
    print("  MANQUANT:", ", ".join(missing)); sys.exit(1)
print("  toutes les dependances sont la")
PYCHK
push_log

echo "--- 3/6 modeles de base (~30 Go) ---"
mkdir -p $WS/models
$PY - <<'PYM'
import os
from huggingface_hub import hf_hub_download
tok = os.environ["HF_TOKEN"]; dst = "/workspace/models"
for repo, fn in [
    ("black-forest-labs/FLUX.1-dev", "flux1-dev.safetensors"),
    ("black-forest-labs/FLUX.1-dev", "ae.safetensors"),
    ("comfyanonymous/flux_text_encoders", "clip_l.safetensors"),
    ("comfyanonymous/flux_text_encoders", "t5xxl_fp16.safetensors"),
]:
    p = hf_hub_download(repo, fn, token=tok, local_dir=dst)
    print("  ok", fn, round(os.path.getsize(p)/1e9, 2), "Go")
PYM
ls -la $WS/models/*.safetensors 2>/dev/null || { echo "ERREUR: modeles absents"; exit 1; }
push_log

echo "--- 4/6 dataset ---"
# kohya lit les repetitions dans le nom du dossier : 10_celeste_char
mkdir -p $WS/dataset/10_celeste_char
$PY - <<PYD
import os
from huggingface_hub import snapshot_download
snapshot_download("$DATASET_REPO", repo_type="dataset", token=os.environ["HF_TOKEN"],
                  local_dir="/workspace/dataset/10_celeste_char")
PYD
rm -rf $WS/dataset/10_celeste_char/.cache
rm -f  $WS/dataset/10_celeste_char/*.toml $WS/dataset/10_celeste_char/*.sh
NIMG=$(ls $WS/dataset/10_celeste_char/*.jpg 2>/dev/null | wc -l)
echo "  $NIMG images / $(ls $WS/dataset/10_celeste_char/*.txt 2>/dev/null | wc -l) captions"
[ "$NIMG" -ge 50 ] || { echo "ERREUR: dataset incomplet ($NIMG images)"; exit 1; }
push_log

echo "--- 5/6 config + entrainement ---"
mkdir -p $WS/output $WS/logs
curl -sL -H "Authorization: Bearer $HF_TOKEN" \
  "https://huggingface.co/datasets/$DATASET_REPO/resolve/main/celeste-v3-runpod.toml" -o $WS/config.toml
grep -q "network_module" $WS/config.toml || { echo "ERREUR: config.toml illisible"; head -5 $WS/config.toml; exit 1; }
sed -i "s#^train_data_dir.*#train_data_dir = \"$WS/dataset\"#" $WS/config.toml
echo "  config recuperee"
cd $WS/sd-scripts
accelerate launch --mixed_precision bf16 --num_cpu_threads_per_process 2 \
  flux_train_network.py --config_file $WS/config.toml
echo "  entrainement sorti avec le code $?"
ls -la $WS/output/
push_log

echo "--- 6/6 envoi du LoRA ---"
$PY - <<PYU
import os, glob
from huggingface_hub import HfApi
api = HfApi(token=os.environ["HF_TOKEN"])
files = sorted(glob.glob("/workspace/output/*.safetensors"))
if not files:
    print("  AUCUN LoRA produit"); raise SystemExit(0)
api.create_repo("$OUT_REPO", private=True, exist_ok=True)
for f in files:
    api.upload_file(path_or_fileobj=f, path_in_repo=os.path.basename(f), repo_id="$OUT_REPO")
    print("  envoye", os.path.basename(f), round(os.path.getsize(f)/1e6), "Mo")
PYU

echo "=== TERMINE ==="
