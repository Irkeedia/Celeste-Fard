"use client";

/**
 * SECTION "SHORT" — le clip vertical, presente comme un post de reseau.
 *
 * Place tot dans la page : c'est la piece la plus immediate du site, elle
 * doit tomber avant les sections de texte.
 *
 * Deux contraintes commandent tout le composant :
 * 1. Un navigateur n'autorise la lecture automatique QUE si la video est
 *    muette. Elle demarre donc sans son, et un bouton dedié le retablit —
 *    le geste de l'utilisateur leve la restriction.
 * 2. Une video de 3,3 Mo ne doit pas se charger tant qu'elle est hors
 *    ecran : un IntersectionObserver ne lance la lecture qu'a l'entree
 *    dans le champ, et la met en pause a la sortie.
 */

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { useT } from "../shared/lang";
import { T } from "../shared/textes";
import styles from "./short-section.module.css";

export function ShortSection() {
  const t = useT();
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  // Lecture liee a la visibilite : rien ne tourne hors ecran.
  useEffect(() => {
    const node = sectionRef.current;
    const video = videoRef.current;
    if (!node || !video) return;

    if (typeof IntersectionObserver === "undefined") {
      video.play().catch(() => undefined);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => undefined);
        } else {
          video.pause();
          // Sortie de champ : on rend le silence, sinon le son
          // repartirait tout seul au prochain passage.
          video.muted = true;
          setMuted(true);
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, []);

  const toggleSound = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    // Activer le son est un geste utilisateur : c'est le moment ou
    // jamais de relancer si le navigateur avait refuse la lecture.
    if (!v.muted) v.play().catch(() => undefined);
  }, []);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => undefined);
    else v.pause();
  }, []);

  return (
    <section
      className={styles.section}
      ref={sectionRef}
      aria-labelledby="short-title"
    >
      <span className={styles.haloA} aria-hidden="true" />
      <span className={styles.haloB} aria-hidden="true" />

      <div className={styles.inner}>
        <header className={styles.head}>
          <p className={`${styles.kicker} u-micro`}>
            <span className={styles.dot} aria-hidden="true" />
            {t(T.short.kicker)}
          </p>
          <h2 id="short-title" className={styles.title}>
            <span className={styles.titleLine}>{t(T.short.t1)}</span>
            <span className={`${styles.titleLine} ${styles.titleAccent}`}>
              {t(T.short.t2)}
            </span>
          </h2>
          <p className={styles.lede}>{t(T.short.lede)}</p>

          <ul className={styles.specs}>
            <li>
              <span className={styles.specValue}>0:25</span>
              <span className="u-micro">{t(T.short.duree)}</span>
            </li>
            <li>
              <span className={styles.specValue}>9:16</span>
              <span className="u-micro">{t(T.short.vertical)}</span>
            </li>
            <li>
              <span className={styles.specValue}>74</span>
              <span className="u-micro">BPM</span>
            </li>
          </ul>

          <div className={styles.ctaRow}>
            <Link href="/#player" className={styles.cta}>
              {t(T.short.cta)}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </header>

        {/* --- Le clip, dans un cadre de telephone --- */}
        <div className={styles.phone}>
          <span className={styles.phoneGlow} aria-hidden="true" />
          <div className={styles.screen}>
            <video
              ref={videoRef}
              className={styles.video}
              src="/video/short-halo.mp4"
              poster="/image/miniatureshort.jpg"
              muted
              loop
              playsInline
              preload="none"
              controlsList="nodownload"
              onContextMenu={(e) => e.preventDefault()}
              onClick={togglePlay}
            />

            {/* Voile visible seulement en pause : la vignette seule ne
                disait pas que la video etait arretee. */}
            {!playing ? (
              <button
                type="button"
                className={styles.playOverlay}
                onClick={togglePlay}
                aria-label="Lire le clip"
              >
                <span className={styles.playRing} aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                    <path d="M8 5.5v13a1 1 0 0 0 1.54.84l10-6.5a1 1 0 0 0 0-1.68l-10-6.5A1 1 0 0 0 8 5.5Z" />
                  </svg>
                </span>
              </button>
            ) : null}

            <button
              type="button"
              className={styles.sound}
              onClick={toggleSound}
              aria-label={muted ? "Activer le son" : "Couper le son"}
            >
              {muted ? (
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path
                    d="M4 9v6h4l5 4V5L8 9H4Zm12 0 4 6m0-6-4 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path
                    d="M4 9v6h4l5 4V5L8 9H4Zm12.5 1.5a3.5 3.5 0 0 1 0 3m2.5-5.5a7 7 0 0 1 0 8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
