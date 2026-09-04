"use client";

/**
 * SECTION "VIDEO" — carrousel en anneau.
 *
 * Les cartes sont disposees comme si elles tournaient autour d'un axe
 * central : celle du milieu est de face, les suivantes s'eloignent en
 * pivotant et en reculant. Remplace la rangee a plat, qui alignait trois
 * vignettes sans hierarchie.
 *
 * Choix d'implementation :
 * - la rotation est calculee a partir de l'ECART a la carte active
 *   (offset), pas d'un angle absolu : ajouter un clip ne demande aucun
 *   recalcul ;
 * - au-dela de deux crans d'ecart la carte est masquee, sinon les cartes
 *   lointaines restent cliquables sous les autres et alourdissent le rendu ;
 * - la lecture ne demarre que sur clic, et uniquement sur la carte active.
 *   Le <video> n'est monte qu'a ce moment : trois videos en autoplay
 *   feraient ramer la page pour rien.
 */

import { useCallback, useEffect, useRef, useState } from "react";

import { useT, type Bi } from "../shared/lang";
import { T } from "../shared/textes";
import styles from "./video-section.module.css";
import { TMedias } from "./medias-textes";

export interface VideoClip {
  id: string;
  /* Les trois champs de texte sont bilingues : le serveur rend l'anglais,
     et le composant les passe par `t()` au moment de l'affichage. */
  title: Bi;
  caption: Bi;
  kicker: Bi;
  src: string;
  poster: string;
}

export interface VideoSectionProps {
  clips?: VideoClip[];
}

const DEFAULT_CLIPS: VideoClip[] = [
  {
    id: "influenceuse",
    title: TMedias.v1Titre,
    caption: TMedias.v1Caption,
    kicker: TMedias.v1Kicker,
    src: "/video/celeste-influenceuse.mp4",
    poster: "/image/miniatureinfluenceuse.jpg",
  },
  {
    id: "remerciement",
    title: TMedias.v2Titre,
    caption: TMedias.v2Caption,
    kicker: TMedias.v2Kicker,
    src: "/video/celestevideoderemerciement.mp4",
    poster: "/image/miniaturevideomercie.jpg",
  },
  {
    id: "passion",
    title: TMedias.v3Titre,
    caption: TMedias.v3Caption,
    kicker: TMedias.v3Kicker,
    src: "/video/celestevideopassion.mp4",
    poster: "/image/miniaturepassion.jpg",
  },
  {
    id: "bateau",
    title: TMedias.v4Titre,
    caption: TMedias.v4Caption,
    kicker: TMedias.v4Kicker,
    src: "/video/celestesitewebbateau.mp4",
    poster: "/image/miniaturebateau.jpg",
  },
];

export function VideoSection({ clips = DEFAULT_CLIPS }: VideoSectionProps) {
  const t = useT();
  const [active, setActive] = useState(0);
  /** Id du clip dont la video est reellement montee et lancee. */
  const [playingId, setPlayingId] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const touchX = useRef<number | null>(null);

  const total = clips.length;

  const go = useCallback(
    (direction: 1 | -1) => {
      setPlayingId(null);
      setActive((i) => (i + direction + total) % total);
    },
    [total],
  );

  const select = useCallback((i: number) => {
    setPlayingId(null);
    setActive(i);
  }, []);

  // La video vient d'etre montee par le clic : on la lance. Le geste est
  // encore dans la fenetre d'activation, la lecture est donc autorisee.
  useEffect(() => {
    if (!playingId) return;
    const node = videoRef.current;
    if (!node) return;
    node.play().catch(() => undefined); // refus d'autoplay : controles natifs
  }, [playingId]);

  // Fleches du clavier : le carrousel est une liste, on doit pouvoir la
  // parcourir sans souris.
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
    },
    [go],
  );

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchX.current = e.touches[0]?.clientX ?? null;
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const start = touchX.current;
      touchX.current = null;
      if (start == null) return;
      const delta = (e.changedTouches[0]?.clientX ?? start) - start;
      // 45px : au-dela d'un simple tremblement, en deca d'un vrai scroll.
      if (Math.abs(delta) < 45) return;
      go(delta < 0 ? 1 : -1);
    },
    [go],
  );

  return (
    <section className={styles.section} aria-labelledby="video-section-title">
      <div className={styles.bg} aria-hidden="true">
        <span className={styles.haloA} />
        <span className={styles.haloB} />
        <span className="u-noise-layer" />
      </div>

      <div className={styles.inner}>
        <header className={styles.head}>
          <span className="u-micro">{t(T.video.kicker)}</span>
          <h2 className={styles.title} id="video-section-title">
            <span className="u-glow-text">{t(T.video.t1)}</span>
            <span className={styles.titleAccent}>{t(T.video.t2)}</span>
          </h2>
          <p className={styles.lede}>{t(T.video.lede)}</p>
        </header>

        <div
          className={styles.stage}
          role="group"
          aria-roledescription="carrousel"
          aria-label={t(T.video.choisir)}
          tabIndex={0}
          onKeyDown={onKeyDown}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className={styles.ring}>
            {clips.map((clip, i) => {
              // Ecart signe le plus court dans l'anneau : de -total/2 a +total/2.
              let offset = i - active;
              if (offset > total / 2) offset -= total;
              if (offset < -total / 2) offset += total;

              const distance = Math.abs(offset);
              const isActive = offset === 0;
              const hidden = distance > 2;

              return (
                <article
                  key={clip.id}
                  className={`${styles.card} ${isActive ? styles.cardActive : ""}`}
                  style={
                    {
                      "--offset": offset,
                      "--distance": distance,
                    } as React.CSSProperties
                  }
                  aria-hidden={hidden || undefined}
                  // Une carte de cote reste dans le DOM pour l'anneau, mais
                  // ne doit pas etre atteignable au clavier.
                  inert={hidden ? true : undefined}
                >
                  <div className={`${styles.media} u-image-fallback`}>
                    {isActive && playingId === clip.id ? (
                      <video
                        ref={videoRef}
                        className={styles.video}
                        src={clip.src}
                        poster={clip.poster}
                        controls
                        controlsList="nodownload noplaybackrate"
                        disablePictureInPicture
                        onContextMenu={(e) => e.preventDefault()}
                        playsInline
                        preload="metadata"
                      />
                    ) : (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          className={styles.poster}
                          src={clip.poster}
                          alt=""
                          loading="lazy"
                          decoding="async"
                        />
                        <span className={styles.shade} aria-hidden="true" />

                        <button
                          type="button"
                          className={styles.trigger}
                          onClick={() =>
                            isActive ? setPlayingId(clip.id) : select(i)
                          }
                          tabIndex={hidden ? -1 : 0}
                          aria-label={t(
                            isActive ? TMedias.vLire : TMedias.vAfficher,
                          ).replace("{titre}", t(clip.title))}
                        >
                          <span className={styles.playRing} aria-hidden="true">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                              <path d="M8 5.5v13a1 1 0 0 0 1.54.84l10-6.5a1 1 0 0 0 0-1.68l-10-6.5A1 1 0 0 0 8 5.5Z" />
                            </svg>
                          </span>
                        </button>

                        <div className={styles.caption}>
                          <span className={`${styles.kicker} u-micro`}>{t(clip.kicker)}</span>
                          <h3 className={styles.cardTitle}>{t(clip.title)}</h3>
                          <p className={styles.cardText}>{t(clip.caption)}</p>
                        </div>
                      </>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowPrev}`}
            onClick={() => go(-1)}
            aria-label={t(T.video.precedent)}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowNext}`}
            onClick={() => go(1)}
            aria-label={t(T.video.suivant)}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className={styles.dots} role="tablist" aria-label={t(T.video.choisir)}>
          {clips.map((clip, i) => (
            <button
              key={clip.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={t(clip.title)}
              className={`${styles.dot} ${i === active ? styles.dotOn : ""}`}
              onClick={() => select(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
