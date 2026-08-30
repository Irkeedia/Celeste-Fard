"use client";

/**
 * SECTION "SLOW BURN" — pendant nocturne de la section Frequence.
 *
 * Meme principe (video muette en fond + extrait audio + paroles), mais
 * traite a l'oppose : la ou "Frequence" est frontale et rouge vif, celle-ci
 * est lente et braisee. Les mots ne surgissent pas, ils s'allument comme
 * une combustion — d'ou le degrade anime sur le texte plutot qu'une simple
 * apparition en opacite.
 *
 * ATTENTION — comme pour "Frequence", les `at` de LYRICS sont ESTIMES a
 * partir de la structure du morceau, pas mesures sur la forme d'onde.
 * Ils sont regroupes ici pour etre ajustes a l'oreille.
 */

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import styles from "./slowburn-section.module.css";

const TRACK_SRC = "/audio/nouvelle-generation/slow-burn.mp3";

/* Extrait : on entre a 30 s, une fois le hook chuchote installe. */
const EXTRACT_START = 30;
const EXTRACT_END = 72;
const FADE_SECONDS = 3;

type Line = {
  at: number;
  text: string;
  /** Une ligne "hook" est plus grande et centree : c'est le refrain. */
  hook?: boolean;
};

/** Paroles anglaises du titre, dans l'ordre. */
const LYRICS: readonly Line[] = [
  { at: 31, text: "Shadows move across the wall" },
  { at: 36, text: "Nothing here, nothing at all" },
  { at: 41, text: "Just this feeling, just this sound" },
  { at: 46, text: "Pulling me, pulling me down" },
  { at: 52, text: "Slow burn, slow burn", hook: true },
  { at: 57, text: "Take your time, it’s your turn", hook: true },
  { at: 63, text: "Watch the whole world turn", hook: true },
  { at: 69, text: "Ooh… mmm…" },
];

function formatTime(s: number): string {
  if (!Number.isFinite(s)) return "0:00";
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

export function SlowBurnSection() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [time, setTime] = useState(0);

  const toggle = useCallback(async () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      if (a.currentTime < EXTRACT_START || a.currentTime >= EXTRACT_END - 0.3) {
        a.currentTime = EXTRACT_START;
      }
      a.volume = 1;
      try {
        await a.play();
      } catch {
        setPlaying(false);
      }
    } else {
      a.pause();
    }
  }, []);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => {
      setTime(a.currentTime);
      const restant = EXTRACT_END - a.currentTime;
      if (restant <= 0) {
        a.pause();
        a.volume = 1;
        setEnded(true);
        return;
      }
      a.volume = restant < FADE_SECONDS ? Math.max(0, restant / FADE_SECONDS) : 1;
    };
    const onPlay = () => {
      setPlaying(true);
      setEnded(false);
    };
    const onPause = () => setPlaying(false);
    const onEnd = () => {
      setPlaying(false);
      setEnded(true);
    };
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("ended", onEnd);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("ended", onEnd);
    };
  }, []);

  const extractLength = EXTRACT_END - EXTRACT_START;
  const elapsed = Math.min(Math.max(time - EXTRACT_START, 0), extractLength);
  const progress = (elapsed / extractLength) * 100;

  return (
    <section className={styles.section} aria-labelledby="slowburn-title">
      <div className={styles.bg} aria-hidden="true">
        <video
          className={styles.video}
          src="/video/celeste-slowburn.mp4"
          poster="/image/miniatureslowburn.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <span className={styles.veil} />
        <span className={styles.ember} />
        <span className="u-noise-layer" />
      </div>

      <div className={styles.inner}>
        <header className={styles.head}>
          <p className={`${styles.kicker} u-micro`}>Face B · Nouvelle Génération</p>
          <h2 id="slowburn-title" className={styles.title}>
            <span className={styles.titleWord}>Slow</span>
            <span className={`${styles.titleWord} ${styles.titleBurn}`}>Burn</span>
          </h2>
          <p className={styles.sub}>Take your time · it’s your turn</p>
        </header>

        {/* Les paroles s'allument une a une, comme une braise qui prend. */}
        <ol className={styles.lyrics}>
          {LYRICS.map((line) => {
            const active = time > 0 && time >= line.at;
            return (
              <li
                key={line.at}
                className={`${styles.lyric} ${line.hook ? styles.lyricHook : ""} ${
                  active ? styles.lyricOn : ""
                }`}
              >
                {line.text}
              </li>
            );
          })}
        </ol>

        <div className={styles.player}>
          <button
            type="button"
            className={styles.play}
            onClick={toggle}
            aria-label={playing ? "Mettre Slow Burn en pause" : "Écouter l’extrait de Slow Burn"}
          >
            {playing ? (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                <path d="M8 5.5v13a1 1 0 0 0 1.54.84l10-6.5a1 1 0 0 0 0-1.68l-10-6.5A1 1 0 0 0 8 5.5Z" />
              </svg>
            )}
          </button>

          <div className={styles.meta}>
            <span className={`${styles.metaTop} u-micro`}>
              {ended ? "Fin de l’extrait" : playing ? "En lecture" : "Écouter l’extrait"}
            </span>
            <div className={styles.bar}>
              <span className={styles.barFill} style={{ width: `${progress}%` }} />
            </div>
            <span className={styles.metaTime}>
              {formatTime(elapsed)} / {formatTime(extractLength)} · extrait
            </span>
          </div>
        </div>

        <footer className={`${styles.foot} ${ended ? styles.footOn : ""}`}>
          <Link href="/#player" className={styles.cta}>
            Écouter le titre en entier
            <span aria-hidden="true">→</span>
          </Link>
        </footer>
      </div>

      <audio ref={audioRef} src={TRACK_SRC} preload="none" />
    </section>
  );
}
