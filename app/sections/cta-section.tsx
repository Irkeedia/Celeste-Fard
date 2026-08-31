"use client";

import Image from "next/image";
import Link from "next/link";

import { getImageSlot } from "../shared/image-slots";
import { useT } from "../shared/lang";
import { T } from "../shared/textes";
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
  const t = useT();
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
        {t({ fr: "Fin de transmission", en: "End of transmission" })}
      </span>

      {/* ---------- Contenu ---------- */}
      <div className={styles.inner}>
        <p className={`${styles.kicker} u-micro`}>
          <span className={styles.kickerDot} aria-hidden="true" />
          {t(T.cta.kicker)}
        </p>

        <h2 className={styles.title} id="cta-title">
          <span className={`${styles.line} u-glow-text u-glow-text--lg`}>{t(T.cta.t1)}</span>
          <span className={`${styles.line} ${styles.lineAccent}`}>{t(T.cta.t2)}</span>
        </h2>

        <p className={styles.lede}>
          {t(T.cta.lede)}
        </p>

        <div className={styles.actions}>
          <Link className={`btn btn--primary ${styles.action}`} href="/music">{t(T.cta.ctaAlbum)}</Link>
          <Link className={`btn btn--ghost ${styles.action}`} href="/shop">{t(T.cta.ctaShop)}</Link>
        </div>

        <p className={`${styles.footnote} u-micro`}>
          100 % générée · 0 % désolée
        </p>
      </div>
    </section>
  );
}

export default CtaSection;
