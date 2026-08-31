#!/usr/bin/env bash
# Montage du short "HALO" — 25 s, 1080x1920.
#
# Principe : cinq plans generes de 10 s chacun, dont on ne garde que le
# meilleur segment, enchaines en fondus, sur l'extrait audio 45 s -> 1:10.
# Le texte est incruste par ffmpeg (drawtext) plutot que par une couche
# HTML : une seule passe, pas de dependance au rendu d'un navigateur.
#
# Les timings du texte viennent de la transcription mot-a-mot de l'extrait
# (hyperframes transcribe), donc ils tombent exactement sur le chant :
#   1.0s  "Halo"            8.4s  "Halo, halo"
#  12.2s  "silver and gold" 22.2s "drifting slow"
set -euo pipefail
export LC_ALL=C
cd "$(dirname "$0")"

W=1080; H=1920
# Anton, la police display du site, telechargee a cote du script :
# fc-match ne la trouve pas, elle n'est installee que cote navigateur.
FONT="$PWD/Anton.ttf"
[ -f "$FONT" ] || FONT=$(fc-match -f '%{file}' 'DejaVu Sans:bold')
# Police de texte courant pour les paroles, plus lisible en petit.
FONT_TXT=$(fc-match -f '%{file}' 'Noto Sans')
echo "titre : $FONT"
echo "texte : $FONT_TXT"

# --- 1. Decoupe : on prend 5 s au coeur de chaque plan ---
# Les modeles mettent ~1 s a se stabiliser et finissent souvent en derive :
# on evite le premier et le dernier tiers.
i=0
for f in halo-1-aerien halo-2-tete halo-4-tour halo-5-horizon; do
  [ -f "$f.mp4" ] || { echo "manque $f.mp4"; continue; }
  ffmpeg -nostdin -v error -y -ss 1.6 -t 7.0 -i "$f.mp4" \
    -vf "scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},setsar=1,fps=30" \
    -an -c:v libx264 -crf 20 -preset medium "seg-$i.mp4"
  i=$((i+1))
done
echo "$i segments prepares"

# --- 2. Enchainement en fondus ---
# xfade demande un offset ABSOLU sur le flux deja concatene : chaque
# segment dure 7 s et le fondu mord 0.8 s, d'ou le pas de 6.2 s.
# Quatre segments donnent 7 + 3 x 6.2 = 25.6 s, l'audio (25 s) coupe le reste.
FILTER=""
INPUTS=""
for n in $(seq 0 $((i-1))); do INPUTS="$INPUTS -i seg-$n.mp4"; done

if [ "$i" -ge 2 ]; then
  PREV="[0:v]"
  OFF=6.2
  for n in $(seq 1 $((i-1))); do
    OUT="[x$n]"
    FILTER="${FILTER}${PREV}[$n:v]xfade=transition=fade:duration=0.8:offset=${OFF}${OUT};"
    PREV="$OUT"
    OFF=$(echo "$OFF + 6.2" | bc)
  done
  LAST="$PREV"
else
  FILTER=""
  LAST="[0:v]"
fi

# --- 3. Texte : le titre puis les paroles, cales sur la transcription ---
# $6 : "titre" pour Anton, sinon la police de texte courant.
draw() { # texte  debut  fin  taille  y  [role]
  local t="$1" a="$2" b="$3" s="$4" y="$5" role="${6:-texte}"
  local f="$FONT_TXT"
  [ "$role" = "titre" ] && f="$FONT"
  echo "drawtext=fontfile='${f}':text='${t}':fontcolor=white@0.97:fontsize=${s}:x=(w-tw)/2:y=${y}:enable='between(t,${a},${b})':shadowcolor=black@0.6:shadowx=0:shadowy=5,"
}

TXT=""
# Titre en tres gros, present sur toute la premiere phrase musicale
TXT="${TXT}$(draw 'HALO' 0.6 8.0 330 'h*0.38' titre)"
TXT="${TXT}$(draw 'CELESTE FARD' 1.7 8.0 40 'h*0.38+360')"
# Paroles, sur les temps mesures
TXT="${TXT}$(draw 'wrapped around' 8.6 12.0 62 'h*0.78')"
TXT="${TXT}$(draw 'this afterglow' 8.6 12.0 62 'h*0.78+80')"
TXT="${TXT}$(draw 'melting into' 12.3 16.4 62 'h*0.78')"
TXT="${TXT}$(draw 'silver and gold' 12.3 16.4 62 'h*0.78+80')"
TXT="${TXT}$(draw 'drifting slow' 22.2 24.8 72 'h*0.78')"
TXT="${TXT%,}"

# --- 4. Rendu final : etalonnage chaud + grain + vignettage ---
ffmpeg -nostdin -v error -y $INPUTS -i extrait.m4a \
  -filter_complex "${FILTER}${LAST}eq=saturation=0.92:contrast=1.06:brightness=0.01,vignette=PI/5,noise=alls=6:allf=t+u,${TXT}[v]" \
  -map "[v]" -map "${i}:a" -shortest \
  -c:v libx264 -crf 21 -preset slow -pix_fmt yuv420p -movflags +faststart \
  -c:a aac -b:a 192k \
  short-halo.mp4

ffprobe -v error -show_entries format=duration,size -show_entries stream=width,height \
  -of default=noprint_wrappers=1 short-halo.mp4 | head -6
echo "OK -> short-halo.mp4"
