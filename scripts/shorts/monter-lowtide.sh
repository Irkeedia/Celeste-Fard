#!/usr/bin/env bash
#
# Short "LOW TIDE" — 28 s, 1080x1920.
#
# RECETTE VOLONTAIREMENT DIFFERENTE DE "HALO" :
# - coupes FRANCHES sur les temps forts, la ou Halo enchainait en fondus.
#   Le morceau est plus tendu, les fondus l'auraient ramolli ;
# - etalonnage bleu nuit avec le rouge en accent, la ou Halo etait
#   entierement crimson — deux shorts identiques se seraient annules ;
# - le texte ne s'affiche plus en bas en petite serif : les mots-cles
#   arrivent en TRES GRAND au centre, un a un, facon lyric video ;
# - un plan est passe en miroir vertical, echo de l'eau qui reflete ;
# - un plan est ralenti a 0,6x pour casser la regularite.
#
# Les coupes tombent sur les mots mesures par transcription :
#   0.04 "How"   4.04 "How far before"   9.25 "control"
#  14.04 "I don't need to know"   17.04 / 20.04 / 23.04 repetitions
set -euo pipefail
export LC_ALL=C
cd "$(dirname "$0")"

W=1080; H=1920; FPS=30
ANTON="/home/mathieu/Projets/celeste-fard/scripts/shorts/Anton.ttf"
[ -f "$ANTON" ] || ANTON=$(fc-match -f '%{file}' 'DejaVu Sans:bold')

# Bleu nuit profond, rouge garde en accent seulement.
GRADE="curves=r='0/0 0.4/0.34 1/0.96':g='0/0.01 0.5/0.44 1/0.90':b='0/0.06 0.5/0.58 1/1',\
eq=brightness=-0.07:contrast=1.24:saturation=0.82,\
colorbalance=rs=-0.06:bs=0.16:rm=-0.04:bm=0.12:rh=0.10:bh=0.06"

# --- Segments : duree calee sur les coupes musicales ---------------
# nom            debut_source  duree  effet
PLANS=(
  "lt-1-reflet    1.2  4.0  normal"
  "lt-2-marche    1.0  5.2  normal"
  "lt-3-visage    2.0  4.8  ralenti"
  "lt-6-plongee   1.5  3.5  miroir"
  "lt-5-dos       1.2  5.0  normal"
  "lt-4-main      1.5  5.5  normal"
)

i=0
for ligne in "${PLANS[@]}"; do
  set -- $ligne
  nom=$1; deb=$2; dur=$3; effet=$4
  [ -f "$nom.mp4" ] || { echo "manque $nom.mp4"; continue; }

  extra=""
  case "$effet" in
    ralenti) extra=",setpts=1.55*PTS" ; src_dur=$(echo "$dur/1.55" | bc -l) ;;
    miroir)  extra=",split[a][b];[b]hflip[c];[a][c]hstack=inputs=2,scale=${W}:${H}" ; src_dur=$dur ;;
    *)       src_dur=$dur ;;
  esac

  ffmpeg -nostdin -v error -y -ss "$deb" -t "$src_dur" -i "$nom.mp4" \
    -vf "scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},setsar=1,fps=${FPS},${GRADE}${extra}" \
    -an -c:v libx264 -crf 18 -preset medium "sg-$i.mp4"
  i=$((i+1))
done
echo "$i segments prepares"

# --- Assemblage par COUPES FRANCHES --------------------------------
: > liste.txt
for n in $(seq 0 $((i-1))); do echo "file 'sg-$n.mp4'" >> liste.txt; done
ffmpeg -nostdin -v error -y -f concat -safe 0 -i liste.txt -c copy brut.mp4

# --- Habillage -----------------------------------------------------
# Mot-cle centre, tres grand, qui grandit legerement pendant son passage.
mot() { # texte  debut  fin  taille
  local t="$1" a="$2" b="$3" s="$4"
  echo "drawtext=fontfile='${ANTON}':text='${t}':fontcolor=white@0.97:fontsize=${s}:x=(w-tw)/2:y=(h-th)/2:enable='between(t,${a},${b})':alpha='min((t-${a})/0.25\,1)*min((${b}-t)/0.3\,1)':shadowcolor=black@0.6:shadowx=0:shadowy=6,"
}
# Ligne secondaire, plus bas.
sous() {
  local t="$1" a="$2" b="$3"
  echo "drawtext=fontfile='${ANTON}':text='${t}':fontcolor=white@0.9:fontsize=64:x=(w-tw)/2:y=h*0.60:enable='between(t,${a},${b})':alpha='min((t-${a})/0.25\,1)*min((${b}-t)/0.3\,1)':shadowcolor=black@0.6:shadowx=0:shadowy=5,"
}

TXT=""
TXT="${TXT}$(mot 'HOW FAR' 0.3 3.9 190)"
TXT="${TXT}$(mot 'CAN WE GO' 4.2 7.6 150)"
TXT="${TXT}$(mot 'LOSE' 9.2 11.6 240)"
TXT="${TXT}$(mot 'CONTROL' 11.7 13.6 200)"
TXT="${TXT}$(mot 'I DON’T NEED' 14.0 16.2 130)"
TXT="${TXT}$(sous 'TO KNOW' 16.2 19.4)"
TXT="${TXT}$(mot 'LOW TIDE' 23.2 27.6 210)"
TXT="${TXT}$(sous 'CELESTE FARD' 24.2 27.6)"
TXT="${TXT%,}"

# Flashs blancs tres brefs sur les coupes (0.06 s), plus secs que les
# flashs rouges de Halo.
COUPES="between(t,4.0,4.06)+between(t,9.2,9.26)+between(t,14.0,14.06)+between(t,17.5,17.56)+between(t,22.5,22.56)"

ffmpeg -nostdin -v error -y -i brut.mp4 -i extrait.m4a \
  -filter_complex "[0:v]${TXT},\
drawbox=x=0:y=0:w=iw:h=ih:color=white@0.55:t=fill:enable='${COUPES}',\
noise=alls=6:allf=t+u,vignette=PI/4,format=yuv420p[v]" \
  -map "[v]" -map 1:a -shortest \
  -c:v libx264 -crf 20 -preset slow -pix_fmt yuv420p -movflags +faststart \
  -c:a aac -b:a 192k short-lowtide.mp4

ffprobe -v error -show_entries format=duration -show_entries stream=width,height \
  -of default=noprint_wrappers=1 short-lowtide.mp4 | head -4
echo "OK -> short-lowtide.mp4"
