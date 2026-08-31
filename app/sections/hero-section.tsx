"use client";

/**
 * HERO — video plein ecran.
 *
 * Remplace le hero en deux colonnes (texte a gauche, portrait detoure a
 * droite). La video occupe tout le cadre et le texte vient par-dessus,
 * comme dans les sections "manifeste" et "titres" — c'est le langage qui
 * porte le mieux le site.
 *
 * Placement du texte :
 * - en mobile, le bloc est cale EN BAS : le visage de Celeste occupe le
 *   haut du cadre en 9:16, y poser du texte le recouvrirait ;
 * - a partir de 900px, il repasse a gauche en colonne, la video ayant
 *   alors de la place a droite pour respirer.
 *
 * La video est MUETTE et en boucle : c'est la seule condition pour que les
 * navigateurs autorisent la lecture automatique.
 */

import Link from "next/link";

import { useT } from "../shared/lang";
import { T } from "../shared/textes";
import styles from "./hero-section.module.css";

export function HeroSection() {
  const t = useT();

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.bg} aria-hidden="true">
        {/*
          Deux montages du meme plan plutot qu'un seul recadre :
          - en paysage, la version 16:9 evite de rogner 60% de la hauteur
            d'un 9:16 et d'agrandir l'image 2x, ce qui la rendait floue ;
          - en portrait, la version 9:16 remplit l'ecran sans rognage.
          Le navigateur retient la PREMIERE source dont le `media` accroche
          et ne telecharge que celle-la. Il ne re-evalue pas au
          redimensionnement : c'est sans consequence ici, personne ne passe
          d'un telephone a un ecran large en cours de visite.
        */}
        <video
          className={styles.video}
          poster="/image/miniaturehero.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/video/celeste-hero-pc.mp4" media="(min-width: 900px)" type="video/mp4" />
          <source src="/video/celeste-hero-mobile.mp4" type="video/mp4" />
        </video>
        <span className={styles.veil} />
        <span className={styles.haloTop} />
        <span className={styles.haloBottom} />
        <span className="u-noise-layer" />
      </div>

      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={`u-micro ${styles.kicker}`}>
            <span className={styles.kickerDot} aria-hidden="true" />
            {t(T.hero.kicker)}
          </p>

          <h1 id="hero-title" className={styles.title}>
            <span className={styles.titleLine}>{t(T.hero.l1)}</span>
            <span className={styles.titleLine}>{t(T.hero.l2)}</span>
            <span className={`${styles.titleLine} ${styles.titleAccent}`}>
              <span className="u-grad-text">{t(T.hero.l3)}</span>
            </span>
          </h1>

          <p className={styles.lede}>{t(T.hero.lede)}</p>

          <div className={styles.ctaRow}>
            <Link href="/music" className={`${styles.cta} ${styles.ctaPrimary}`}>
              {t(T.hero.ctaMusique)}
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/shop" className={`${styles.cta} ${styles.ctaGhost}`}>
              {t(T.hero.ctaShop)}
            </Link>
          </div>

          <ul className={styles.pills}>
            {T.hero.pills.map((pill) => (
              <li key={pill.fr} className={`u-glass u-micro ${styles.pill}`}>
                {t(pill)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <span className={styles.scrollHint} aria-hidden="true">
        <span className={styles.scrollLine} />
      </span>
    </section>
  );
}
