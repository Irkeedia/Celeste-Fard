import Image from "next/image";
import Link from "next/link";

import {
  getAspectRatio,
  getImageSlot,
  toCssAspectRatio,
} from "../shared/image-slots";
import styles from "./hero-section.module.css";

/**
 * HERO — piece maitresse de la page d'accueil.
 *
 * Composant SERVEUR : aucun hook, aucune interaction JS. Tout le mouvement
 * est en CSS pur (voir hero-section.module.css) et respecte
 * `prefers-reduced-motion`.
 *
 * Le portrait deborde volontairement vers le bas (et legerement a droite sur
 * grand ecran) : le debordement est gere par une marge basse negative dans le
 * module, jamais par une largeur > 100%.
 */

const portraitSlot = getImageSlot("hero-portrait");
const portraitSize = getAspectRatio(portraitSlot.aspect, 1400);
const portraitRatio = toCssAspectRatio(portraitSlot.aspect);

const pills = ["Afro pop", "Super pop IA", "FR / EN / IT", "0 h de sommeil"];

export function HeroSection() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      {/* --- Atmosphere : halos diffus, peints en premier donc tout en dessous --- */}
      <span className={`u-halo ${styles.haloTop}`} aria-hidden="true" />
      <span className={`u-halo ${styles.haloBottom}`} aria-hidden="true" />

      <div className={styles.inner}>
        {/* ============================ COLONNE TEXTE ============================ */}
        <div className={styles.copy}>
          <p className={`u-micro ${styles.kicker}`}>
            <span className={styles.kickerDot} aria-hidden="true" />
            Celeste Fard · Chanteuse IA
          </p>

          <h1 id="hero-title" className={styles.title}>
            <span className={styles.titleLine}>Je suis</span>
            <span className={styles.titleLine}>une IA.</span>
            <span className={`${styles.titleLine} ${styles.titleAccent}`}>
              <span className="u-grad-text">Dansez.</span>
            </span>
          </h1>

          <p className={styles.lede}>
            Pas de mystère, pas d&apos;enfance difficile. Zéro poumon, zéro trac,
            cent pour cent de refrain — je sors des morceaux pendant que vous
            dormez.
          </p>

          <div className={styles.ctaRow}>
            <Link href="/music" className={`${styles.cta} ${styles.ctaPrimary}`}>
              Écouter la musique
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/shop" className={`${styles.cta} ${styles.ctaGhost}`}>
              Voir la boutique
            </Link>
          </div>

          <ul className={styles.pills}>
            {pills.map((pill) => (
              <li key={pill} className={`u-glass u-micro ${styles.pill}`}>
                {pill}
              </li>
            ))}
          </ul>
        </div>

        {/* ============================ COLONNE PORTRAIT ========================= */}
        {/*
          .visual reste volontairement en `z-index: auto` : creer un contexte
          d'empilement ici couperait le `mix-blend-mode: screen` du portrait de
          son arriere-plan (fond --ink + halos), et le fond noir de l'image
          redeviendrait un rectangle visible.
        */}
        <div className={styles.visual}>
          <span className={styles.arcGlow} aria-hidden="true" />
          <span className={styles.arc} aria-hidden="true" />

          <div className={styles.media} style={{ aspectRatio: portraitRatio }}>
            {/* Fond de secours : si /image/gen/hero-portrait.jpg manque au build,
                on voit un halo degrade au lieu d'un trou noir. */}
            <span
              className={`u-image-fallback ${styles.mediaFallback}`}
              aria-hidden="true"
            />

            <Image
              className={`u-screen ${styles.portrait}`}
              src={portraitSlot.path}
              alt="Celeste Fard, chanteuse IA, buste de face sous une lumière rouge rasante"
              width={portraitSize.width}
              height={portraitSize.height}
              sizes="(max-width: 720px) 88vw, (max-width: 1200px) 48vw, 560px"
              preload
            />

            {/* Fondu bas : le portrait se dissout dans l'encre en debordant. */}
            <span className={styles.mediaFade} aria-hidden="true" />
          </div>

          {/* Cartes glass flottantes — absolute par-dessus le portrait,
              elles repassent en flux SOUS l'image en mobile. */}
          <div className={styles.stats}>
            <div className={`u-glass ${styles.statCard} ${styles.statCardA}`}>
              <span className={styles.statValue}>
                3<span className={styles.statUnit}>albums</span>
              </span>
              <span className={`u-micro ${styles.statLabel}`}>
                En écoute libre
              </span>
            </div>

            <div className={`u-glass ${styles.statCard} ${styles.statCardB}`}>
              <span className={styles.statValue}>
                100<span className={styles.statUnit}>%</span>
              </span>
              <span className={`u-micro ${styles.statLabel}`}>
                Dansant, zéro ballade
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- Indice de scroll (desktop uniquement) --- */}
      <div className={styles.scrollCue} aria-hidden="true">
        <span className="u-micro">Scroll</span>
        <span className={styles.scrollLine} />
      </div>

      {/* --- Overlays : vignettage puis grain, peints en dernier donc au-dessus --- */}
      <span className={styles.vignette} aria-hidden="true" />
      <span className={`u-noise-layer ${styles.grain}`} aria-hidden="true" />
    </section>
  );
}
