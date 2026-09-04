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
 * Les `at` de LYRICS proviennent d'une transcription mot-a-mot de
 * l'extrait (hyperframes transcribe) : ils sont mesures, pas estimes.
 * Pour les regenerer apres un changement de fenetre d'extrait, voir le
 * commentaire au-dessus de LYRICS.
 */

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { useT } from "../shared/lang";
import { T } from "../shared/textes";
import { TA11y } from "../shared/textes-a11y";
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

/**
 * Paroles du titre, calees sur une transcription mot-a-mot de l'extrait
 * (hyperframes transcribe) : chaque ligne s'allume exactement quand elle
 * est chantee. Valeurs en secondes absolues dans le morceau.
 *
 * A noter : la fenetre d'extrait tombe sur le HOOK, pas sur le couplet —
 * d'ou l'absence de "Shadows move across the wall", qui arrive plus tot
 * dans le morceau.
 */
const LYRICS: readonly Line[] = [
  { at: 30.3, text: "Slow burn, slow burn", hook: true },
  { at: 32.5, text: "Take your time, it’s your turn", hook: true },
  { at: 36, text: "Slow burn, slow burn", hook: true },
  { at: 39.6, text: "Watch the whole world turn", hook: true },
  { at: 44.8, text: "Ooh… mmm…" },
  { at: 49.4, text: "Ooh… yeah…" },
  { at: 57.1, text: "Slow burn… slow burn…", hook: true },
  { at: 59.2, text: "It’s your turn…" },
];

function formatTime(s: number): string {
  if (!Number.isFinite(s)) return "0:00";
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

export function SlowBurnSection() {
  const t = useT();
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
          <p className={`${styles.kicker} u-micro`}>{t(T.slowburn.kicker)}</p>
          <h2 id="slowburn-title" className={styles.title}>
            <span className={styles.titleWord}>Slow</span>
            <span className={`${styles.titleWord} ${styles.titleBurn}`}>Burn</span>
          </h2>
          <p className={styles.sub}>{t(T.slowburn.sub)}</p>
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
            aria-label={t(playing ? TA11y.slowburnPause : TA11y.slowburnEcouter)}
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
              {ended ? t(T.commun.finExtrait) : playing ? t(T.commun.enLecture) : t(T.commun.ecouterExtrait)}
            </span>
            <div className={styles.bar}>
              <span className={styles.barFill} style={{ width: `${progress}%` }} />
            </div>
            <span className={styles.metaTime}>
              {formatTime(elapsed)} / {formatTime(extractLength)} · {t(T.commun.extrait)}
            </span>
          </div>
        </div>

        <footer className={`${styles.foot} ${ended ? styles.footOn : ""}`}>
          <Link href="/#player" className={styles.cta}>
            {t(T.commun.titreEntier)}
            <span aria-hidden="true">→</span>
          </Link>
        </footer>
      </div>

      <audio ref={audioRef} src={TRACK_SRC} preload="none" />
    </section>
  );
}
