"use client";

import Image from "next/image";

import { getImageSlot, type ImageSlotId } from "@/app/shared/image-slots";

import { useT } from "../shared/lang";
import { T } from "../shared/textes";
import styles from "./gallery-section.module.css";

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
  /** Numéro d'archive affiché dans la légende. */
  index: string;
  /** Légende en micro-texte, ton Celeste. */
  caption: string;
  /** Texte alternatif accessible. */
  alt: string;
  /** Largeur rendue, par palier, pour le srcset de next/image. */
  sizes: string;
}

const TILES: readonly Tile[] = [
  {
    slot: "gallery-01",
    className: styles.tileA,
    index: "01",
    caption: "Scène — premier rappel",
    alt: "Celeste sur scène, micro à la main, dans un contre-jour rouge chargé de fumée.",
    sizes: "(min-width: 1024px) 42vw, 100vw",
  },
  {
    slot: "gallery-04",
    className: styles.tileB,
    index: "02",
    caption: "Salle vide — 3h du matin",
    alt: "Scène vue depuis les coulisses, projecteurs rouges balayant la fumée, silhouette de Celeste au centre.",
    sizes: "(min-width: 1024px) 42vw, 100vw",
  },
  {
    slot: "gallery-02",
    className: styles.tileD,
    index: "03",
    caption: "Ce micro a plus d'ancienneté que moi",
    alt: "Gros plan sur la main baguée de Celeste posée sur un micro vintage.",
    sizes: "(min-width: 1024px) 22vw, (min-width: 480px) 50vw, 100vw",
  },
  {
    slot: "gallery-05",
    className: styles.tileE,
    index: "04",
    caption: "Rire non calibré",
    alt: "Portrait rapproché de Celeste qui rit, taches de rousseur visibles sous une lumière rouge chaude.",
    sizes: "(min-width: 1024px) 22vw, (min-width: 480px) 50vw, 100vw",
  },
  {
    slot: "gallery-03",
    className: styles.tileC,
    index: "05",
    caption: "Dos tourné, volontairement",
    alt: "Celeste de dos, tête tournée vers l'objectif, lumière magenta sur la nuque.",
    sizes: "(min-width: 1024px) 32vw, (min-width: 480px) 50vw, 100vw",
  },
  {
    slot: "gallery-06",
    className: styles.tileF,
    index: "06",
    caption: "Studio — jour 04, câbles partout",
    alt: "Celeste assise au sol en studio, casque autour du cou, entourée de câbles et de pédales.",
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
                  alt={tile.alt}
                  fill
                  sizes={tile.sizes}
                  className={styles.image}
                />
                <span aria-hidden className={styles.veil} />
                <figcaption className={styles.caption}>
                  <span className={styles.captionIndex}>{tile.index}</span>
                  <span className={styles.captionText}>{tile.caption}</span>
                </figcaption>
              </figure>
            );
          })}

          {/* Respiration éditoriale : une carte de texte occupe une case de la
              grille, comme dans une double page de magazine. */}
          <aside className={`${styles.note} ${styles.tileQ} u-glass`}>
            <p className={styles.noteLabel}>Note de production</p>
            <p className={styles.noteQuote}>
              &laquo;&nbsp;Je n&apos;ai jamais mis les pieds sur une scène. Mais
              regardez comme la lumière me va bien.&nbsp;&raquo;
            </p>
            <p className={styles.noteSign}>Celeste Fard</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
