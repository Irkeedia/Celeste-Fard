import Image from "next/image";

import { getAspectRatio, getImageSlot } from "../shared/image-slots";
import styles from "./manifesto-section.module.css";

/**
 * LE MANIFESTE — presentation de Celeste traitee comme un hero.
 *
 * Composant serveur (aucun hook, aucune interaction JS).
 * Split asymetrique 55/45 : texte a gauche, portrait a droite en desktop ;
 * portrait EN PREMIER en mobile (le sens du split s'inverse).
 * Le portrait deborde vers le HAUT et mord sur la section precedente.
 */

const MANIFESTO_SLOT = getImageSlot("manifesto");
const MANIFESTO_SIZE = getAspectRatio(MANIFESTO_SLOT.aspect, 1000);

type KeyFigure = {
  value: string;
  label: string;
};

const KEY_FIGURES: readonly KeyFigure[] = [
  { value: "02", label: "albums bien réels" },
  { value: "00", label: "corde vocale" },
  { value: "∞", label: "prises, zéro caprice" },
];

export function ManifestoSection() {
  return (
    <section
      className={`${styles.manifesto} u-noise`}
      aria-labelledby="manifesto-title"
    >
      <span className={`${styles.halo} ${styles.haloA}`} aria-hidden="true" />
      <span className={`${styles.halo} ${styles.haloB}`} aria-hidden="true" />

      <div className={styles.inner}>
        <figure className={styles.figure}>
          <span className={styles.figureGlow} aria-hidden="true" />

          <div className={`${styles.frame} u-image-fallback`}>
            <Image
              className={styles.image}
              src={MANIFESTO_SLOT.path}
              alt="Portrait de Celeste Fard de trois quarts, éclairée par une lumière rouge latérale"
              width={MANIFESTO_SIZE.width}
              height={MANIFESTO_SIZE.height}
              sizes="(min-width: 900px) 42vw, (min-width: 640px) 30rem, 92vw"
            />
            <span className={styles.frameFade} aria-hidden="true" />
          </div>

          <figcaption className={`${styles.badge} u-glass`}>
            <span className="u-micro">Dossier 001</span>
            <span className={styles.badgeValue}>Celeste Fard</span>
            <span className="u-micro">Rousse. Synthétique. Bruyante.</span>
          </figcaption>
        </figure>

        <div className={styles.copy}>
          <p className={styles.kicker}>
            <span className="u-micro">Le manifeste</span>
            <span className={styles.kickerRule} aria-hidden="true" />
          </p>

          <h2 id="manifesto-title" className={styles.title}>
            <span className={styles.titleLine}>Née dans</span>
            <span className={`${styles.titleLine} u-grad-text`}>
              une carte
            </span>
            <span className={`${styles.titleLine} u-glow-text`}>graphique</span>
          </h2>

          <p className={styles.text}>
            Je m&apos;appelle Celeste Fard. Rousse, mal élevée,{" "}
            <strong>entièrement fabriquée</strong>. Pas de studio à Los Angeles,
            pas de coach vocal à quatre cents euros de l&apos;heure : des
            matrices, du courant, et quelqu&apos;un d&apos;assez têtu pour
            appuyer sur &laquo;&nbsp;générer&nbsp;&raquo; quatorze mille fois.
          </p>

          <p className={styles.text}>
            On me demande souvent si c&apos;est de la triche. Franchement&nbsp;?
            Vous auto-tunez des humains depuis vingt ans. Moi au moins
            j&apos;assume : chaque note que vous entendez a été{" "}
            <strong>calculée, pas maquillée</strong>. Le fard est dans le nom,
            pas dans la voix.
          </p>

          <blockquote className={styles.quote}>
            <p className={styles.quoteText}>
              Je ne cherche pas à passer pour humaine. Je cherche à rester dans
              votre tête après le dernier refrain.
            </p>
            <cite className={`${styles.quoteAttr} u-micro`}>
              Celeste Fard &mdash; jour zéro
            </cite>
          </blockquote>

          <ul className={styles.stats}>
            {KEY_FIGURES.map((figure) => (
              <li key={figure.label} className={styles.stat}>
                <span className={`${styles.statValue} u-grad-text`}>
                  {figure.value}
                </span>
                <span className={`${styles.statLabel} u-micro`}>
                  {figure.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
