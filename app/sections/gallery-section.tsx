"use client";

import Image from "next/image";

import { getImageSlot, type ImageSlotId } from "@/app/shared/image-slots";

import { useT, type Bi } from "../shared/lang";
import { T } from "../shared/textes";
import styles from "./gallery-section.module.css";
import { TMedias } from "./medias-textes";

/**
 * GALERIE IMMERSIVE — masonry editorial.
 *
 * Composant SERVEUR : aucune interaction JS, tout est en CSS pur
 * (survol, montee de legende, zoom). Le respect de prefers-reduced-motion
 * est gere dans le module CSS.
 *
 * Le cadre est code AVANT les images : chaque tuile porte `u-image-fallback`
 * pour afficher le degrade de secours si `/image/gen/<slot>.jpg` manque au
 * build. Le site ne casse jamais.
 *
 * La grille desktop est une partition exacte de 8 colonnes x 14 rangees :
 *   A  cols 1-4  rangees 1-8    grande verticale dominante
 *   B  cols 5-8  rangees 1-5    moyenne panoramique
 *   D  cols 5-6  rangees 6-8    petite carree
 *   E  cols 7-8  rangees 6-8    petite carree  <- DEBORDE (translate negatif)
 *   C  cols 1-3  rangees 9-14   moyenne verticale
 *   F  cols 4-6  rangees 9-14   petite verticale
 *   Q  cols 7-8  rangees 9-14   carte glass (respiration editoriale)
 */

interface Tile {
  slot: ImageSlotId;
  /** Classe de placement dans la grille (aire + ratio mobile). */
  className: string;
  /** Numero d'archive affiche dans la legende. Un chiffre : pas de langue. */
  index: string;
  /** Legende en micro-texte, ton Celeste. Bilingue. */
  caption: Bi;
  /** Texte alternatif accessible. Bilingue : les lecteurs d'ecran le lisent. */
  alt: Bi;
  /** Largeur rendue, par palier, pour le srcset de next/image. */
  sizes: string;
}

const TILES: readonly Tile[] = [
  {
    slot: "gallery-01",
    className: styles.tileA,
    index: "01",
    caption: TMedias.g1Caption,
    alt: TMedias.g1Alt,
    sizes: "(min-width: 1024px) 42vw, 100vw",
  },
  {
    slot: "gallery-04",
    className: styles.tileB,
    index: "02",
    caption: TMedias.g2Caption,
    alt: TMedias.g2Alt,
    sizes: "(min-width: 1024px) 42vw, 100vw",
  },
  {
    slot: "gallery-02",
    className: styles.tileD,
    index: "03",
    caption: TMedias.g3Caption,
    alt: TMedias.g3Alt,
    sizes: "(min-width: 1024px) 22vw, (min-width: 480px) 50vw, 100vw",
  },
  {
    slot: "gallery-05",
    className: styles.tileE,
    index: "04",
    caption: TMedias.g4Caption,
    alt: TMedias.g4Alt,
    sizes: "(min-width: 1024px) 22vw, (min-width: 480px) 50vw, 100vw",
  },
  {
    slot: "gallery-03",
    className: styles.tileC,
    index: "05",
    caption: TMedias.g5Caption,
    alt: TMedias.g5Alt,
    sizes: "(min-width: 1024px) 32vw, (min-width: 480px) 50vw, 100vw",
  },
  {
    slot: "gallery-06",
    className: styles.tileF,
    index: "06",
    caption: TMedias.g6Caption,
    alt: TMedias.g6Alt,
    sizes: "(min-width: 1024px) 32vw, (min-width: 480px) 50vw, 100vw",
  },
];

export function GallerySection() {
  const t = useT();
  return (
    <section
      id="galerie"
      aria-labelledby="galerie-titre"
      className={`${styles.section} u-noise`}
    >
      {/* Halos rouges diffus — purement decoratifs, sous le contenu. */}
      <div aria-hidden className={`${styles.halo} ${styles.haloTop}`} />
      <div aria-hidden className={`${styles.halo} ${styles.haloBottom}`} />

      <div className={styles.inner}>
        <header className={styles.head}>
          <div className={styles.headLeft}>
            <p className={styles.kicker}>
              <span aria-hidden className={styles.kickerRule} />
              {t(T.galerie.kicker)}
            </p>
            <h2 id="galerie-titre" className={styles.title}>
              <span className={styles.titleSolid}>{t(T.galerie.t1)}</span>
              <span className={styles.titleOutline}>{t(T.galerie.t2)}</span>
            </h2>
          </div>

          <div className={styles.headRight}>
            <p className={styles.lede}>
              {t(T.galerie.lede)}
            </p>
          </div>
        </header>

        <div className={styles.grid}>
          {TILES.map((tile) => {
            const slot = getImageSlot(tile.slot);

            return (
              <figure
                key={tile.slot}
                className={`${styles.tile} ${tile.className} u-image-fallback`}
              >
                <Image
                  src={slot.path}
                  alt={t(tile.alt)}
                  fill
                  sizes={tile.sizes}
                  className={styles.image}
                />
                <span aria-hidden className={styles.veil} />
                <figcaption className={styles.caption}>
                  <span className={styles.captionIndex}>{tile.index}</span>
                  <span className={styles.captionText}>{t(tile.caption)}</span>
                </figcaption>
              </figure>
            );
          })}

          {/* Respiration editoriale : une carte de texte occupe une case de la
              grille, comme dans une double page de magazine.
              La citation vient de `shared/textes.ts`, ou elle etait deja
              traduite : la dupliquer ici les aurait laissees diverger. */}
          <aside className={`${styles.note} ${styles.tileQ} u-glass`}>
            <p className={styles.noteLabel}>{t(TMedias.gNoteLabel)}</p>
            <p className={styles.noteQuote}>{t(T.galerie.citation)}</p>
            <p className={styles.noteSign}>Celeste Fard</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
