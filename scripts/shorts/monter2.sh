#!/usr/bin/env bash
# Short "HALO" — version motion design.
#
# Par rapport a la premiere passe :
# - etalonnage sombre a dominante crimson, cale sur la charte du site
#   (l'image d'origine, doree et lumineuse, jurait avec le reste) ;
# - un leger zoom avant sur chaque plan, pour que rien ne soit jamais fige ;
# - elements graphiques en PNG (titre en degrade, cadre a coins rouges,
#   repere lateral, trame d'ecran) animes en opacite et en echelle ;
# - flashs rouges tres brefs sur les coupes ;
# - paroles qui montent en fondu, calees sur la transcription mot-a-mot.
set -euo pipefail
export LC_ALL=C
cd "$(dirname "$0")"

W=1080; H=1920; FPS=30
SEG=7.0        # duree gardee par plan
FONDU=0.8      # duree du fondu enchaine
PAS=$(echo "$SEG - $FONDU" | bc)
FONT_TXT=$(fc-match -f '%{file}' 'Noto Sans')

# --- 1. Segments : etalonnage + zoom lent ---------------------------
# `zoompan` travaille image par image : d=SEG*FPS donne la duree, et le
# zoom passe de 1.00 a 1.06 sur toute la longueur du plan.
GRADE="curves=r='0/0.02 0.3/0.28 0.75/0.80 1/1':g='0/0 0.5/0.36 1/0.80':b='0/0.03 0.5/0.34 1/0.78',\
eq=brightness=-0.16:contrast=1.30:saturation=0.76,\
colorbalance=rs=0.18:bs=-0.10:rm=0.14:gm=-0.06:bm=-0.08:rh=0.12:bh=0.08"

i=0
for f in halo-1-aerien halo-2-tete halo-4-tour halo-5-horizon; do
  [ -f "$f.mp4" ] || { echo "manque $f.mp4"; continue; }
  # Sens du zoom alterne : avant, arriere, avant... pour ne pas donner
  # l'impression d'un seul long mouvement continu.
  if [ $((i % 2)) -eq 0 ]; then Z="1+0.06*on/(${SEG}*${FPS})"; else Z="1.06-0.06*on/(${SEG}*${FPS})"; fi
  ffmpeg -nostdin -v error -y -ss 1.6 -t $SEG -i "$f.mp4" \
    -vf "scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},setsar=1,fps=${FPS},\
${GRADE},\
zoompan=z='${Z}':d=1:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=${W}x${H}:fps=${FPS}" \
    -an -c:v libx264 -crf 18 -preset medium "sg-$i.mp4"
  i=$((i+1))
done
echo "$i segments etalonnes"

# --- 2. Enchainement -------------------------------------------------
INPUTS=""; for n in $(seq 0 $((i-1))); do INPUTS="$INPUTS -i sg-$n.mp4"; done
FILTER=""; PREV="[0:v]"; OFF=$PAS
for n in $(seq 1 $((i-1))); do
  FILTER="${FILTER}${PREV}[$n:v]xfade=transition=fade:duration=${FONDU}:offset=${OFF}[x$n];"
  PREV="[x$n]"; OFF=$(echo "$OFF + $PAS" | bc)
done

# --- 3. Habillage ----------------------------------------------------
# Entrees supplementaires : elements PNG puis audio.
IDX=$i
OV="-i el-titre.png -i el-sub.png -i el-cadre.png -i el-barre.png -i el-flash.png -i el-scan.png"
T=$IDX; S=$((IDX+1)); C=$((IDX+2)); B=$((IDX+3)); FL=$((IDX+4)); SC=$((IDX+5)); A=$((IDX+6))

# Moments des coupes, pour y poser les flashs.
C1=$PAS; C2=$(echo "$PAS*2" | bc); C3=$(echo "$PAS*3" | bc)

CHAIN="${PREV}format=yuva420p[base];"

# Trame d'ecran, constante et tres discrete
CHAIN="${CHAIN}[${SC}:v]format=rgba,colorchannelmixer=aa=0.5[scan];"
CHAIN="${CHAIN}[base][scan]overlay=0:0[b1];"

# Flashs rouges de 3 images sur chaque coupe
CHAIN="${CHAIN}[${FL}:v]format=rgba,colorchannelmixer=aa=0.30[fl];"
CHAIN="${CHAIN}[b1][fl]overlay=0:0:enable='between(t,${C1},${C1}+0.10)+between(t,${C2},${C2}+0.10)+between(t,${C3},${C3}+0.10)'[b2];"

# Titre : grossit legerement et s'efface
CHAIN="${CHAIN}[${T}:v]format=rgba,scale=w='iw*(1.06-0.06*min(t,7)/7)':h=-1:eval=frame,"
CHAIN="${CHAIN}colorchannelmixer=aa=1[ti];"
CHAIN="${CHAIN}[b2][ti]overlay=x='(W-w)/2':y='H*0.34':enable='between(t,0.5,7.6)':alpha=1[b3];"

# Sous-titre, un temps apres le titre
CHAIN="${CHAIN}[b3][${S}:v]overlay=x='(W-w)/2':y='H*0.34+455':enable='between(t,1.5,7.6)'[b4];"

# Cadre : present tout du long
CHAIN="${CHAIN}[${C}:v]format=rgba,colorchannelmixer=aa=0.9[cd];"
CHAIN="${CHAIN}[b4][cd]overlay=0:0[b5];"

# Repere lateral, apres le titre
CHAIN="${CHAIN}[b5][${B}:v]overlay=0:0:enable='gte(t,8.2)'[b6];"

# Paroles — timings issus de la transcription
LY="drawtext=fontfile='${FONT_TXT}':fontcolor=white@0.97:fontsize=58:x=(w-tw)/2:shadowcolor=black@0.7:shadowx=0:shadowy=5"
CHAIN="${CHAIN}[b6]${LY}:text='wrapped around':y='h*0.76+20*(1-min((t-8.6)/0.5\,1))':enable='between(t,8.6,12.2)',"
CHAIN="${CHAIN}${LY}:text='this afterglow':y='h*0.76+78+20*(1-min((t-8.6)/0.5\,1))':enable='between(t,8.6,12.2)',"
CHAIN="${CHAIN}${LY}:text='melting into':y='h*0.76+20*(1-min((t-12.3)/0.5\,1))':enable='between(t,12.3,16.6)',"
CHAIN="${CHAIN}${LY}:text='silver and gold':y='h*0.76+78+20*(1-min((t-12.3)/0.5\,1))':enable='between(t,12.3,16.6)',"
CHAIN="${CHAIN}${LY}:fontsize=70:text='drifting slow':y='h*0.76+20*(1-min((t-22.2)/0.5\,1))':enable='between(t,22.2,24.9)',"

# Grain et vignettage en dernier, sur l'image complete
CHAIN="${CHAIN}noise=alls=7:allf=t+u,vignette=PI/3.4,format=yuv420p[v]"

ffmpeg -nostdin -v error -y $INPUTS $OV -i extrait.m4a \
  -filter_complex "${FILTER}${CHAIN}" \
  -map "[v]" -map "${A}:a" -shortest \
  -c:v libx264 -crf 20 -preset slow -pix_fmt yuv420p -movflags +faststart \
  -c:a aac -b:a 192k \
  short-halo-v2.mp4

ffprobe -v error -show_entries format=duration -show_entries stream=width,height \
  -of default=noprint_wrappers=1 short-halo-v2.mp4 | head -4
echo "OK -> short-halo-v2.mp4"
