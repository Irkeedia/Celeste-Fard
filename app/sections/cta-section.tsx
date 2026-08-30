import Image from "next/image";
import Link from "next/link";

import { getImageSlot } from "../shared/image-slots";
import styles from "./cta-section.module.css";

/**
 * CTA FINAL — la derniere impression avant le footer.
 *
 * Composition (du fond vers l'avant) :
 *   1. bandeau `cta-wide` (21:9) en `mix-blend-mode: screen` sur fond --ink,
 *      pose sur un degrade de secours pour ne jamais afficher un trou noir ;
 *   2. voile sombre + teinte du degrade signature ;
 *   3. halo rouge central, cercles concentriques, ligne d'horizon lumineuse ;
 *   4. grain cinema ;
 *   5. fondu vers --ink en bas pour se fondre dans le footer.
 *
 * Composant serveur : aucune interaction, tout est en CSS pur.
 */

const CTA_IMAGE = getImageSlot("cta-wide");

export function CtaSection() {
  return (
    <section className={styles.cta} aria-labelledby="cta-title">
      {/* ---------- Decor : purement visuel, invisible pour l'AT ---------- */}
      <div className={styles.backdrop} aria-hidden="true">
        <div className={`${styles.fallback} u-image-fallback`} />

        <Image
          className={`${styles.image} u-screen`}
          src={CTA_IMAGE.path}
          alt=""
          fill
          sizes="100vw"
          loading="lazy"
        />

        <div className={styles.scrim} />
        <div className={styles.tint} />
        <div className={styles.glow} />

        <div className={styles.rings}>
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className={styles.horizon} />
        <span className="u-noise-layer" />
        <div className={styles.fade} />
      </div>

      {/* ---------- Reperes decoratifs de coin (desktop) ---------- */}
      <span
        className={`${styles.corner} ${styles.cornerStart} u-micro`}
        aria-hidden="true"
      >
        Céleste Fard
      </span>
      <span
        className={`${styles.corner} ${styles.cornerEnd} u-micro`}
        aria-hidden="true"
      >
        Fin de transmission
      </span>

      {/* ---------- Contenu ---------- */}
      <div className={styles.inner}>
        <p className={`${styles.kicker} u-micro`}>
          <span className={styles.kickerDot} aria-hidden="true" />
          Dernière ligne droite
        </p>

        <h2 className={styles.title} id="cta-title">
          <span className={`${styles.line} u-glow-text u-glow-text--lg`}>
            Reste
          </span>
          <span className={`${styles.line} ${styles.lineAccent}`}>un peu</span>
        </h2>

        <p className={styles.lede}>
          Je ne dors pas, je n’ai pas de tour bus et je ne serai jamais en
          retard sur scène. Le seul truc qui me manque, c’est toi dans les
          écouteurs.
        </p>

        <div className={styles.actions}>
          <Link className={`btn btn--primary ${styles.action}`} href="/music">
            Écouter l’album
          </Link>
          <Link className={`btn btn--ghost ${styles.action}`} href="/shop">
            Passer à la boutique
          </Link>
        </div>

        <p className={`${styles.footnote} u-micro`}>
          100 % générée · 0 % désolée
        </p>
      </div>
    </section>
  );
}

export default CtaSection;
