#!/usr/bin/env bash
# Allume / eteint un ComfyUI sur RunPod, et branche le studio dessus.
#
# Pourquoi ce script : le studio deploye sur Vercel ne peut pas joindre le
# ComfyUI du PC (127.0.0.1). Plutot que d'ouvrir un tunnel vers la machine —
# qui suppose le PC allume et expose ComfyUI a l'exterieur — on met ComfyUI
# sur un pod, joignable en HTTPS par le proxy RunPod.
#
# Le pod facture TANT QU'IL VIT (~0,70 $/h). Il n'est donc pas fait pour
# rester allume : on l'allume pour une session de generation, on l'eteint
# apres. D'ou ce script plutot qu'un pod permanent.
#
#   ./training/comfy-pod.sh start    lance le pod, attend, configure Vercel
#   ./training/comfy-pod.sh stop     detruit le pod, remet le studio en local
#   ./training/comfy-pod.sh status   etat du pod et credit restant
#
set -uo pipefail
cd "$(dirname "$0")/.."

RP=$(grep "^RUNPOD_API_KEY=" .env.local | cut -d= -f2-)
TOK=$(grep "^HF_TOKEN=" .env.local | cut -d= -f2-)
ETAT=training/.comfy-pod-id
GPUS=("NVIDIA L40" "NVIDIA RTX A6000" "NVIDIA A40" "NVIDIA L40S")

credit() {
  curl -s -m 20 -X POST "https://api.runpod.io/graphql?api_key=$RP" \
    -H "Content-Type: application/json" \
    -d '{"query":"query { myself { clientBalance } }"}' \
    | python3 -c "import sys,json;print(round(json.load(sys.stdin)['data']['myself']['clientBalance'],3),'USD')"
}

# Telecharge les modeles Flux et le LoRA entraine, puis lance ComfyUI.
# Le LoRA vient du depot prive HF ou l'entrainement l'a pousse.
bootstrap() {
  cat <<'EOS'
set -e
cd /workspace
pip install -q huggingface_hub hf_transfer 2>&1 | tail -1
export HF_HUB_ENABLE_HF_TRANSFER=1
M=/comfyui/models
mkdir -p $M/unet $M/vae $M/clip $M/loras
python3 - <<'PYX'
import os
from huggingface_hub import hf_hub_download
t=os.environ["HF_TOKEN"]; M="/comfyui/models"
for repo, fn, sub in [
  ("black-forest-labs/FLUX.1-dev","flux1-dev.safetensors","unet"),
  ("black-forest-labs/FLUX.1-dev","ae.safetensors","vae"),
  ("comfyanonymous/flux_text_encoders","clip_l.safetensors","clip"),
  ("comfyanonymous/flux_text_encoders","t5xxl_fp16.safetensors","clip"),
]:
    hf_hub_download(repo, fn, token=t, local_dir=f"{M}/{sub}")
    print("ok", fn)
# LoRA entraines : on prend tout ce que le depot contient
from huggingface_hub import HfApi
api=HfApi(token=t)
try:
    for f in api.list_repo_files(os.environ["HF_USER"]+"/celeste-lora-v3"):
        if f.endswith(".safetensors"):
            hf_hub_download(os.environ["HF_USER"]+"/celeste-lora-v3", f, token=t,
                            local_dir=f"{M}/loras")
            print("lora", f)
except Exception as e:
    print("pas de LoRA v3 :", e)
PYX
EOS
}

case "${1:-status}" in
start)
  if [ -f "$ETAT" ] && [ -s "$ETAT" ]; then
    echo "Un pod est deja note ($(cat $ETAT)). Fais 'stop' d'abord."; exit 1
  fi
  echo "credit avant : $(credit)"
  BOOT=$(bootstrap | python3 -c "import sys,json;print(json.dumps(sys.stdin.read()))")
  for gpu in "${GPUS[@]}"; do
    REQ=$(python3 -c "
import json,sys
print(json.dumps({
 'name':'celeste-comfy','imageName':'runpod/comfyui:cuda12.8',
 'gpuTypeIds':['$gpu'],'gpuCount':1,'cloudType':'COMMUNITY',
 'containerDiskInGb':120,'volumeInGb':0,
 'ports':['8188/http'],
 'env':{'HF_TOKEN':'$TOK','HF_USER':'toffolon'},
 'dockerStartCmd':['bash','-c', $BOOT + '; /start.sh']
}))")
    R=$(curl -s -m 60 -X POST "https://rest.runpod.io/v1/pods" \
        -H "Authorization: Bearer $RP" -H "Content-Type: application/json" -d "$REQ")
    if echo "$R" | grep -q '"id"'; then
      POD=$(echo "$R" | python3 -c "import sys,json;print(json.load(sys.stdin)['id'])")
      echo "$POD" > "$ETAT"
      URL="https://${POD}-8188.proxy.runpod.net"
      echo "pod $POD lance sur $gpu"
      echo "url  $URL"
      echo "Telechargement des modeles en cours (~5 min)…"
      for i in $(seq 1 60); do
        sleep 15
        if curl -s -m 10 "$URL/system_stats" >/dev/null 2>&1; then
          echo "ComfyUI repond apres ~$((i*15))s"
          # Le studio deploye pointe desormais sur le pod.
          printf '%s' "$URL" | vercel env add COMFY_HOST production --force >/dev/null 2>&1
          printf '%s' "flux1-dev.safetensors" | vercel env add COMFY_UNET production --force >/dev/null 2>&1
          echo "COMFY_HOST configure sur Vercel — redeploie pour l'appliquer :"
          echo "  vercel --prod"
          exit 0
        fi
      done
      echo "ComfyUI n'a pas repondu en 15 min — verifie le pod sur runpod.io"
      exit 1
    fi
    echo "  indispo : $gpu"
  done
  echo "Aucun GPU disponible."; exit 1
  ;;

stop)
  [ -f "$ETAT" ] || { echo "Aucun pod note."; exit 0; }
  POD=$(cat "$ETAT")
  curl -s -X POST "https://api.runpod.io/graphql?api_key=$RP" -H "Content-Type: application/json" \
    -d "{\"query\":\"mutation { podTerminate(input:{podId:\\\"$POD\\\"}) }\"}" >/dev/null
  rm -f "$ETAT"
  vercel env rm COMFY_HOST production --yes >/dev/null 2>&1
  vercel env rm COMFY_UNET production --yes >/dev/null 2>&1
  echo "pod $POD detruit, COMFY_HOST retire"
  echo "credit restant : $(credit)"
  ;;

status)
  echo "credit : $(credit)"
  curl -s -m 20 -H "Authorization: Bearer $RP" "https://rest.runpod.io/v1/pods" \
    | python3 -c "
import sys,json
d=json.load(sys.stdin)
print('pods actifs :', [(p['id'], p.get('name'), str(p.get('costPerHr'))+' USD/h') for p in d] or 'aucun')"
  [ -f "$ETAT" ] && echo "pod ComfyUI note : $(cat $ETAT)"
  ;;

*) echo "usage: $0 {start|stop|status}"; exit 1 ;;
esac
