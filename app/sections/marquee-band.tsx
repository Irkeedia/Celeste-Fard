"use client";

import { Fragment, type CSSProperties } from "react";

import { useT } from "../shared/lang";
import { T } from "../shared/textes";
import styles from "./marquee-band.module.css";

/**
 * MARQUEE BAND — ruban defilant infini.
 * Separateur entre le hero et la suite de la page.
 *
 * Composant SERVEUR : aucune interaction, aucun hook.
 * L'animation est 100% CSS (translateX sur un rail duplique), donc
 * elle tourne meme sans JavaScript et se met en pause avec
 * prefers-reduced-motion.
 *
 * Reglage possible depuis la page (aucune prop obligatoire) :
 *   <MarqueeBand />                       // valeurs par defaut
 *   <MarqueeBand speed={60} />            // ruban plus lent
 *   <MarqueeBand words={["...", "..."]} /> // autres slogans
 *
 * Si le bandeau est place dans un conteneur a gouttiere (.page-wrap),
 * on peut lui faire manger la gouttiere pour un rendu bord a bord :
 *   <MarqueeBand style={{ "--band-bleed-x": "var(--gutter)" }} />
 * (le masque de bord rend la coupure invisible dans les deux cas)
 */

/* Les mots viennent du dictionnaire bilingue : le bandeau bascule avec
   le reste du site. */

/** React.CSSProperties n'accepte pas les variables CSS : on l'etend. */
type MarqueeStyle = CSSProperties & {
  "--marquee-duration"?: string;
  "--band-bleed-x"?: string;
};

type MarqueeBandProps = {
  /** Slogans affiches. Un nombre PAIR garde l'alternance plein/outline. */
  words?: readonly string[];
  /** Duree d'un cycle complet du ruban principal, en secondes. */
  speed?: number;
  /** Classes additionnelles posees sur la section. */
  className?: string;
  /** Surcharges de variables CSS (--band-bleed-x notamment). */
  style?: MarqueeStyle;
};

type LaneKind = "main" | "micro";

/**
 * Un groupe de mots. Il est rendu DEUX fois dans le rail : la piste
 * fait donc 200% de large et l'animation la translate de -50%, ce qui
 * remet le second groupe exactement a la place du premier => boucle
 * sans raccord visible.
 */
function Lane({ words, kind }: { words: readonly string[]; kind: LaneKind }) {
  return (
    <div className={styles.group}>
      {words.map((word, index) => (
        <Fragment key={`${kind}-${index}-${word}`}>
          <span
            className={
              kind === "micro"
                ? styles.wordMicro
                : index % 2 === 0
                  ? styles.wordSolid
                  : styles.wordOutline
            }
          >
            {word}
          </span>
          <span
            className={
              kind === "micro" ? `${styles.sep} ${styles.sepMicro}` : styles.sep
            }
            aria-hidden="true"
          />
        </Fragment>
      ))}
    </div>
  );
}

export function MarqueeBand({
  words,
  speed = 44,
  className,
  style,
}: MarqueeBandProps = {}) {
  const t = useT();
  const items = words && words.length > 0 ? words : T.marquee.map(t);

  const bandStyle: MarqueeStyle = {
    "--marquee-duration": `${speed}s`,
    ...style,
  };

  const bandClass = ["u-noise", styles.band, className]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={bandClass} style={bandStyle}>
      {/* Halo rouge diffus derriere le ruban */}
      <span className={styles.halo} aria-hidden="true" />

      {/* Le defilement est purement decoratif : on donne aux lecteurs
          d'ecran une version statique et lisible, une seule fois. */}
      <p className="u-visually-hidden">{items.join(" · ")}</p>

      <div className={styles.rail} aria-hidden="true">
        <div className={`${styles.track} ${styles.trackMain}`}>
          <Lane words={items} kind="main" />
          <Lane words={items} kind="main" />
        </div>

        <div className={`${styles.track} ${styles.trackMicro}`}>
          <Lane words={items} kind="micro" />
          <Lane words={items} kind="micro" />
        </div>
      </div>

      {/* Grain cinema pose PAR-DESSUS le ruban */}
      <span className={`u-noise-layer ${styles.grain}`} aria-hidden="true" />
    </section>
  );
}
