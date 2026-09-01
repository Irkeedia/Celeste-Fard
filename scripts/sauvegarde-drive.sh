#!/usr/bin/env bash
#
# SAUVEGARDE DU PROJET VERS GOOGLE DRIVE
#
# Copie tous les medias du site vers "Celeste Fard/" sur le Drive.
# Concu pour tourner tous les jours sans surveillance.
#
#   ./scripts/sauvegarde-drive.sh            # sauvegarde reelle
#   ./scripts/sauvegarde-drive.sh --essai    # montre ce qui serait copie
#
# POINTS IMPORTANTS
# - `rclone copy` ne transfere QUE ce qui a change (comparaison taille +
#   date). Relancer le script dix fois d'affilee ne coute donc rien.
# - Aucune suppression, jamais : on n'utilise pas `sync`, qui effacerait
#   sur le Drive ce qui a disparu en local. Un fichier retire du projet
#   reste dans la sauvegarde. C'est voulu — le but est de ne rien perdre.
# - Le compte utilise est celui configure dans rclone (remote `gdrive`),
#   aujourd'hui toffolon.mathieu11@gmail.com.
#
set -uo pipefail
export LC_ALL=C

PROJET="/home/mathieu/Projets/celeste-fard"
REMOTE="gdrive:Celeste Fard"
TELECHARGEMENTS="/home/mathieu/Téléchargements"
JOURNAL="$PROJET/.sauvegarde-drive.log"

MODE=()
[ "${1:-}" = "--essai" ] && MODE=(--dry-run)

cd "$PROJET" || exit 1

log() { printf '%s  %s\n' "$(date '+%Y-%m-%d %H:%M')" "$1" | tee -a "$JOURNAL"; }

# rclone est-il joignable ? Un token expire est la panne la plus probable.
if ! rclone about gdrive: >/dev/null 2>&1; then
  log "ECHEC : le remote gdrive ne repond pas (token expire ? relancer 'rclone config reconnect gdrive:')"
  exit 1
fi

log "--- debut de la sauvegarde ${MODE[*]:-} ---"

# Chaque ligne : "source locale|destination sur le Drive"
COPIES=(
  "public/audio/nouvelle-generation|01 Musique/MP3 du site (21 titres)"
  "public/image/gen|02 Images/Portraits generes"
  "public/image/cartoon|02 Images/Illustrations cartoon"
  "public/video|03 Videos/Site"
  "scripts/refs|04 Production/References visage"
  "scripts/shorts|04 Production/Outils et polices"
  "instagram|06 Reseaux sociaux/Instagram"
)

ECHECS=0

# Copie un dossier et REGARDE si ca a marche.
#
# La version precedente pipait la sortie de rclone dans `grep -c` puis
# ajoutait `|| true`, ce qui detruisait le code de sortie : quoi qu'il
# arrive, le script loguait une reussite. Un `--print-stats` invalide
# (l'option n'existe pas dans rclone) faisait donc echouer CHAQUE copie
# de cette boucle en silence, pendant que le journal affichait des
# lignes rassurantes. Une sauvegarde qui ment est pire que pas de
# sauvegarde du tout : on cesse de verifier.
copier() {
  local src="$1" dst="$2" sortie
  if ! sortie=$(rclone copy "$src" "$REMOTE/$dst" "${MODE[@]}" \
       --transfers 4 --checkers 8 --retries 3 --stats 0 -v 2>&1); then
    log "  ECHEC : $src -> $dst"
    printf '%s\n' "$sortie" | tail -3 | sed 's/^/      /' | tee -a "$JOURNAL"
    ECHECS=$((ECHECS + 1))
    return 1
  fi
  local n
  n=$(printf '%s\n' "$sortie" | grep -c ": Copied" || true)
  log "  $src -> $dst  ($n fichier(s) transfere(s))"
}

for ligne in "${COPIES[@]}"; do
  src="${ligne%%|*}"
  dst="${ligne##*|}"
  [ -d "$src" ] || { log "  ignore (absent) : $src"; continue; }
  copier "$src" "$dst" || true
done

# Meme fonction que `copier`, mais avec des filtres rclone en plus.
copier_filtre() {
  local src="$1" dst="$2"; shift 2
  local sortie
  if ! sortie=$(rclone copy "$src" "$REMOTE/$dst" "${MODE[@]}" "$@" \
       --transfers 3 --retries 3 --stats 0 -v 2>&1); then
    log "  ECHEC : $src -> $dst"
    printf '%s\n' "$sortie" | tail -3 | sed 's/^/      /' | tee -a "$JOURNAL"
    ECHECS=$((ECHECS + 1))
    return 1
  fi
  local n
  n=$(printf '%s\n' "$sortie" | grep -c ": Copied" || true)
  log "  $dst  ($n fichier(s) transfere(s))"
}

# Les masters audio vivent dans Telechargements, hors du depot.
for dossier in "musique celeste fard nouvelle generation" \
               "sons suplementaire a ajouté dans le lecteur pas en premiere a mettre au hasard "; do
  [ -d "$TELECHARGEMENTS/$dossier" ] || continue
  copier_filtre "$TELECHARGEMENTS/$dossier" "01 Musique/Masters originaux" || true
done

# Les shorts montes, s'il y en a de nouveaux.
if compgen -G "$TELECHARGEMENTS/celeste-short*.mp4" >/dev/null; then
  copier_filtre "$TELECHARGEMENTS" "03 Videos/Shorts reseaux" \
    --include "celeste-short*.mp4" || true
fi

# Images a la racine de public/image (archives, boutique, miniatures).
copier_filtre "public/image" "02 Images/Archives premieres versions" \
  --max-depth 1 --include "*.jpg" --include "*.png" \
  --exclude "miniature*" --exclude "shop*" || true
copier_filtre "public/image" "02 Images/Miniatures video" \
  --max-depth 1 --include "miniature*" || true
copier_filtre "public/image" "02 Images/Boutique" \
  --max-depth 1 --include "shop*" || true

TOTAL=$(rclone size "$REMOTE" --json 2>/dev/null \
  | python3 -c "import json,sys;d=json.load(sys.stdin);print(f\"{d['count']} fichiers, {d['bytes']/1e9:.2f} Go\")" 2>/dev/null || echo "?")

if [ "$ECHECS" -gt 0 ]; then
  log "--- TERMINE AVEC $ECHECS ECHEC(S) · sauvegarde totale : $TOTAL ---"
  log "    Des medias ne sont PAS sauvegardes. Lire les lignes ECHEC ci-dessus."
  exit 1
fi
log "--- termine · sauvegarde totale : $TOTAL ---"
