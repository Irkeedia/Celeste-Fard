#!/usr/bin/env python3
"""
Fabrique les elements graphiques du short (PNG a fond transparent).

Ils sont ensuite animes par ffmpeg (opacite, echelle, position). Les
generer ici plutot que de tout faire en `drawtext` permet d'avoir la vraie
police Anton, des lettres espacees, un degrade dans le titre et un cadre
fin — impossible ou tres penible en filtre ffmpeg.
"""
from PIL import Image, ImageDraw, ImageFont

W, H = 1080, 1920
ROUGE = (255, 30, 60)
MAGENTA = (217, 0, 122)
PAPIER = (255, 245, 246)

ANTON = "Anton.ttf"
NOTO = "/usr/share/fonts/truetype/noto/NotoSans-Regular.ttf"


def police(path, taille):
    return ImageFont.truetype(path, taille)


def espace(draw, xy, texte, font, fill, tracking=0, ancre_centre=True):
    """Dessine du texte avec un espacement entre lettres (absent de PIL)."""
    largeur = sum(draw.textlength(c, font=font) + tracking for c in texte) - tracking
    x, y = xy
    if ancre_centre:
        x -= largeur / 2
    for c in texte:
        draw.text((x, y), c, font=font, fill=fill)
        x += draw.textlength(c, font=font) + tracking
    return largeur


# ---------------------------------------------------------------- titre
# Rempli d'un degrade rouge -> magenta, comme les titres du site.
titre = Image.new("RGBA", (W, 520), (0, 0, 0, 0))
d = ImageDraw.Draw(titre)
f = police(ANTON, 330)
masque = Image.new("L", (W, 520), 0)
dm = ImageDraw.Draw(masque)
espace(dm, (W / 2, 40), "HALO", f, 255, tracking=6)

degrade = Image.new("RGBA", (W, 520))
dg = ImageDraw.Draw(degrade)
for x in range(W):
    t = x / W
    dg.line(
        [(x, 0), (x, 520)],
        fill=(
            int(PAPIER[0] * (1 - t) + ROUGE[0] * t),
            int(PAPIER[1] * (1 - t) + ROUGE[1] * t * 0.6),
            int(PAPIER[2] * (1 - t) + MAGENTA[2] * t * 0.5),
            255,
        ),
    )
titre = Image.composite(degrade, Image.new("RGBA", (W, 520), (0, 0, 0, 0)), masque)
titre.save("el-titre.png")

# --------------------------------------------------------- sous-titre
sub = Image.new("RGBA", (W, 90), (0, 0, 0, 0))
d = ImageDraw.Draw(sub)
espace(d, (W / 2, 24), "CELESTE FARD", police(NOTO, 34), PAPIER + (235,), tracking=14)
sub.save("el-sub.png")

# -------------------------------------------------------------- cadre
# Filet fin en retrait, repris de l'affiche de reference.
cadre = Image.new("RGBA", (W, H), (0, 0, 0, 0))
d = ImageDraw.Draw(cadre)
m = 46
d.rectangle([m, m, W - m, H - m], outline=PAPIER + (110,), width=2)
# Coins accentues en rouge
L = 90
for (x0, y0, x1, y1) in [
    (m, m, m + L, m), (m, m, m, m + L),
    (W - m - L, m, W - m, m), (W - m, m, W - m, m + L),
    (m, H - m - L, m, H - m), (m, H - m, m + L, H - m),
    (W - m, H - m - L, W - m, H - m), (W - m - L, H - m, W - m, H - m),
]:
    d.line([x0, y0, x1, y1], fill=ROUGE + (255,), width=6)
cadre.save("el-cadre.png")

# ------------------------------------------------------- barre laterale
# Marqueur vertical facon repere de montage, cote gauche.
barre = Image.new("RGBA", (W, H), (0, 0, 0, 0))
d = ImageDraw.Draw(barre)
x = 74
d.line([x, H * 0.30, x, H * 0.70], fill=PAPIER + (40,), width=2)
d.line([x, H * 0.30, x, H * 0.44], fill=ROUGE + (230,), width=4)
f2 = police(NOTO, 22)
d.text((x + 18, H * 0.30 - 6), "01 / 04", font=f2, fill=ROUGE + (220,))
barre.save("el-barre.png")

# ------------------------------------------------------------- flash
# Voile rouge plein cadre, pose une poignee d'images sur les coupes.
flash = Image.new("RGBA", (W, H), ROUGE + (255,))
flash.save("el-flash.png")

# ------------------------------------------------------------ scanline
# Trame horizontale tres discrete : donne une matiere d'ecran.
scan = Image.new("RGBA", (W, H), (0, 0, 0, 0))
d = ImageDraw.Draw(scan)
for y in range(0, H, 4):
    d.line([0, y, W, y], fill=(0, 0, 0, 26), width=1)
scan.save("el-scan.png")

print("elements generes : titre, sub, cadre, barre, flash, scan")
