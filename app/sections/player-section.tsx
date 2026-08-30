"use client";

/**
 * SECTION "PLAYER" — la salle d'ecoute de Celeste.
 *
 * Lecteur audio reel (element <audio> natif) inspire de la ref SonicWave :
 * carte glass large, pochette a gauche, forme d'onde + controles a droite,
 * puis une rangee horizontale de cartes "Trending".
 *
 * Contraintes respectees :
 * - 'use client' (hooks + interaction audio).
 * - Zero Math.random au rendu : les hauteurs de la forme d'onde viennent
 *   d'une formule sinusoidale sur l'index, calculee une seule fois au
 *   niveau module => serveur et client produisent le meme HTML.
 * - Les sources audio sont encodees segment par segment (espaces,
 *   apostrophes, accents, esperluettes dans les noms de fichiers).
 * - Si /image/gen/*.jpg n'existe pas encore, on masque l'<img> cassee et
 *   le degrade de secours (u-image-fallback) prend le relais.
 */

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  audioSrc,
  coverSrc,
  formatTime,
  PLAYLIST,
} from "../shared/playlist";
import styles from "./player-section.module.css";

/* =========================================================
   1. FORME D'ONDE — hauteurs deterministes (aucun Math.random)
   ========================================================= */

const BAR_COUNT = 64;

/**
 * Somme de trois sinusoides dephasees : irregulier a l'oeil, mais
 * strictement identique au rendu serveur et au rendu client.
 * Valeurs en pourcentage entier (2 -> pas de flottant a serialiser).
 */
const BAR_HEIGHTS: readonly number[] = Array.from(
  { length: BAR_COUNT },
  (_, i) => {
    const a = Math.abs(Math.sin(i * 0.45));
    const b = Math.abs(Math.sin(i * 0.13 + 0.9));
    const c = Math.abs(Math.sin(i * 1.27 + 2.1));
    const h = 0.2 + 0.44 * a + 0.24 * b + 0.16 * c;
    return Math.round(Math.min(1, h) * 100);
  },
);

/* =========================================================
   2. UTILITAIRES
   ========================================================= */

type RepeatMode = "off" | "all" | "one";

const REPEAT_LABEL: Record<RepeatMode, string> = {
  off: "Répétition désactivée",
  all: "Répéter la playlist",
  one: "Répéter ce titre",
};

/** Style avec variables CSS custom (TS n'accepte pas `--x` nativement). */
type CssVars = React.CSSProperties & Record<string, string | number>;

/* =========================================================
   3. IMAGE BUILD-SAFE
   ========================================================= */

function SlotImage({
  src,
  alt,
  sizes,
  className,
}: {
  /** Chemin public deja resolu (voir coverSrc). */
  src: string;
  alt: string;
  sizes: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}

/* =========================================================
   4. SECTION
   ========================================================= */

export function PlayerSection() {
  const audioRef = useRef<HTMLAudioElement>(null);
  /** Rangee de titres : pilotee par les fleches sur grand ecran. */
  const trendRowRef = useRef<HTMLUListElement>(null);
  /** Passe a true quand un changement de piste doit enchainer la lecture. */
  const autoPlayNext = useRef(false);

  /* Le lecteur s'ouvre sur "Frequence" plutot que sur le premier titre :
     c'est le morceau mis en avant sur la page. On le retrouve par son id
     pour que l'ordre de la playlist reste libre de changer. */
  const [index, setIndex] = useState(() => {
    const i = PLAYLIST.findIndex((t) => t.id === "frequence");
    return i === -1 ? 0 : i;
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [scrubbing, setScrubbing] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState<RepeatMode>("all");

  /**
   * Defile la rangee d'une "page" quasi complete. On mesure la largeur
   * visible plutot que de coder un nombre de cartes en dur : la taille des
   * vignettes est fluide (clamp), un pas fixe deraperait selon l'ecran.
   */
  const scrollTrend = useCallback((direction: 1 | -1) => {
    const row = trendRowRef.current;
    if (!row) return;
    row.scrollBy({ left: direction * row.clientWidth * 0.8, behavior: "smooth" });
  }, []);

  const track = PLAYLIST[index];
  const src = useMemo(() => audioSrc(track), [track]);

  const progress = duration > 0 ? Math.min(1, currentTime / duration) : 0;
  const progressPct = `${(progress * 100).toFixed(3)}%`;

  /* ---- Navigation ---------------------------------------- */

  const pickNext = useCallback(
    (from: number, direction: 1 | -1, auto: boolean): number | null => {
      const len = PLAYLIST.length;
      if (shuffle && len > 1) {
        // Math.random dans un handler, jamais pendant le rendu : pas
        // d'ecart d'hydratation.
        let next = from;
        while (next === from) next = Math.floor(Math.random() * len);
        return next;
      }
      const raw = from + direction;
      if (raw >= len) return repeat === "all" || !auto ? 0 : null;
      if (raw < 0) return len - 1;
      return raw;
    },
    [shuffle, repeat],
  );

  const goTo = useCallback((next: number, play: boolean) => {
    autoPlayNext.current = play;
    setCurrentTime(0);
    setDuration(0);
    setIndex(next);
  }, []);

  const goNext = useCallback(
    (auto: boolean) => {
      const next = pickNext(index, 1, auto);
      if (next === null) {
        audioRef.current?.pause();
        setIsPlaying(false);
        return;
      }
      goTo(next, true);
    },
    [index, pickNext, goTo],
  );

  const goPrev = useCallback(() => {
    const el = audioRef.current;
    // Convention lecteur : au-dela de 3s, "precedent" rembobine.
    if (el && el.currentTime > 3) {
      el.currentTime = 0;
      setCurrentTime(0);
      return;
    }
    const next = pickNext(index, -1, false);
    goTo(next ?? 0, isPlaying);
  }, [index, pickNext, goTo, isPlaying]);

  const togglePlay = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      void el.play().catch(() => setIsPlaying(false));
    } else {
      el.pause();
    }
  }, []);

  const selectTrack = useCallback(
    (next: number) => {
      if (next === index) {
        togglePlay();
        return;
      }
      goTo(next, true);
    },
    [index, togglePlay, goTo],
  );

  /* ---- Enchainement apres changement de piste -------------- */

  useEffect(() => {
    const el = audioRef.current;
    if (!el || !autoPlayNext.current) return;
    autoPlayNext.current = false;
    void el.play().catch(() => setIsPlaying(false));
  }, [index]);

  /* ---- Seek ------------------------------------------------ */

  const onSeek = useCallback(
    (value: number) => {
      const el = audioRef.current;
      const next = duration > 0 ? (value / 1000) * duration : 0;
      setCurrentTime(next);
      if (el && Number.isFinite(el.duration)) el.currentTime = next;
    },
    [duration],
  );

  /* ---- Rendu ----------------------------------------------- */

  const bars = (active: boolean) => (
    <div
      className={`${styles.waveLayer} ${active ? styles.waveLayerActive : ""}`}
      aria-hidden="true"
    >
      {BAR_HEIGHTS.map((h, i) => (
        <span
          key={i}
          className={styles.bar}
          style={{ "--h": `${h}%`, "--d": `${i * 26}ms` } as CssVars}
        />
      ))}
    </div>
  );

  return (
    <section
      id="player"
      className={`${styles.section} u-noise`}
      aria-labelledby="player-title"
    >
      <div className={styles.haloTop} aria-hidden="true" />
      <div className={styles.haloBottom} aria-hidden="true" />

      <div className={styles.inner}>
        <header className={styles.head}>
          <p className="u-micro">Salle d&apos;écoute · 24/7</p>
          <h2 id="player-title" className={styles.title}>
            <span className="u-grad-text">Écoute</span>
            <span className={styles.titleGhost}>-moi</span>
          </h2>
          <p className={styles.lede}>
            Pas de tournée, pas de loge, pas de caprice. Juste le bouton play.
          </p>
        </header>

        {/* ---------- LE LECTEUR ---------- */}
        <div className={`${styles.player} u-glass`}>
          {/* Pochette */}
          <div className={styles.coverWrap}>
            <div
              className={`${styles.cover} u-image-fallback ${
                isPlaying ? styles.coverPlaying : ""
              }`}
            >
              <SlotImage
                src={coverSrc(track)}
                alt={`Pochette du titre ${track.title}`}
                sizes="(max-width: 860px) 60vw, 320px"
                className={styles.coverImg}
              />
              <span className={styles.coverShine} aria-hidden="true" />
            </div>
            <div className={styles.coverReflect} aria-hidden="true">
              <div className="u-image-fallback" />
            </div>
          </div>

          {/* Details + controles */}
          <div className={styles.deck}>
            <p className={`${styles.nowPlaying} u-micro`}>
              <span
                className={`${styles.pulse} ${isPlaying ? styles.pulseOn : ""}`}
                aria-hidden="true"
              />
              {isPlaying ? "Now playing" : "En pause"}
            </p>

            <h3 className={styles.trackTitle}>{track.title}</h3>
            <p className={styles.trackMeta}>
              Celeste Fard <span aria-hidden="true">·</span> {track.album}
            </p>
            <p className={styles.trackMood}>{track.mood}</p>

            {/* Forme d'onde : couche sombre + couche coloree clippee */}
            <div
              className={styles.wave}
              style={
                {
                  "--p": progressPct,
                  "--play-state": isPlaying ? "running" : "paused",
                } as CssVars
              }
            >
              {bars(false)}
              {bars(true)}
            </div>

            {/* Barre de progression cliquable */}
            <div className={styles.seekRow}>
              <span className={styles.time}>{formatTime(currentTime)}</span>
              <input
                className={styles.seek}
                type="range"
                min={0}
                max={1000}
                step={1}
                value={duration > 0 ? Math.round(progress * 1000) : 0}
                style={{ "--p": progressPct } as CssVars}
                aria-label={`Position dans le titre ${track.title}`}
                aria-valuetext={`${formatTime(currentTime)} sur ${formatTime(duration)}`}
                onChange={(e) => onSeek(Number(e.target.value))}
                onPointerDown={() => setScrubbing(true)}
                onPointerUp={() => setScrubbing(false)}
                onKeyDown={() => setScrubbing(true)}
                onKeyUp={() => setScrubbing(false)}
                disabled={duration <= 0}
              />
              <span className={styles.time}>{formatTime(duration)}</span>
            </div>

            {/* Controles */}
            <div className={styles.controls}>
              <button
                type="button"
                className={`${styles.ctrl} ${shuffle ? styles.ctrlOn : ""}`}
                aria-label="Lecture aléatoire"
                aria-pressed={shuffle}
                onClick={() => setShuffle((s) => !s)}
              >
                <IconShuffle />
              </button>

              <button
                type="button"
                className={styles.ctrl}
                aria-label="Titre précédent"
                onClick={goPrev}
              >
                <IconPrev />
              </button>

              <button
                type="button"
                className={styles.play}
                aria-label={
                  isPlaying
                    ? `Mettre en pause ${track.title}`
                    : `Lire ${track.title}`
                }
                onClick={togglePlay}
              >
                {isPlaying ? <IconPause /> : <IconPlay />}
              </button>

              <button
                type="button"
                className={styles.ctrl}
                aria-label="Titre suivant"
                onClick={() => goNext(false)}
              >
                <IconNext />
              </button>

              <button
                type="button"
                className={`${styles.ctrl} ${
                  repeat !== "off" ? styles.ctrlOn : ""
                }`}
                aria-label={REPEAT_LABEL[repeat]}
                onClick={() =>
                  setRepeat((r) =>
                    r === "off" ? "all" : r === "all" ? "one" : "off",
                  )
                }
              >
                <IconRepeat one={repeat === "one"} />
              </button>
            </div>
          </div>
        </div>

        {/* ---------- TRENDING ---------- */}
        <div className={styles.trending}>
          <div className={styles.trendingHead}>
            <p className="u-micro">Trending · dans mes circuits</p>

            {/* Fleches reservees aux ecrans larges : au doigt, le defilement
                direct est plus rapide qu'un bouton. */}
            <div className={styles.trendNav}>
              <button
                type="button"
                className={styles.trendArrow}
                onClick={() => scrollTrend(-1)}
                aria-label="Titres précédents"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path
                    d="M15 5l-7 7 7 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                className={styles.trendArrow}
                onClick={() => scrollTrend(1)}
                aria-label="Titres suivants"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path
                    d="M9 5l7 7-7 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <p className={styles.trendingHint} aria-hidden="true">
              Faites glisser →
            </p>
          </div>

          <ul className={styles.trendRow} ref={trendRowRef}>
            {PLAYLIST.map((item, i) => {
              const active = i === index;
              return (
                <li key={item.id} className={styles.trendItem}>
                  <button
                    type="button"
                    className={`${styles.trendCard} ${
                      active ? styles.trendCardActive : ""
                    }`}
                    aria-label={
                      active && isPlaying
                        ? `Mettre en pause ${item.title}`
                        : `Lire ${item.title} — ${formatTime(item.seconds)}`
                    }
                    aria-current={active ? "true" : undefined}
                    onClick={() => selectTrack(i)}
                  >
                    <span className={`${styles.thumb} u-image-fallback`}>
                      <SlotImage
                        src={coverSrc(item)}
                        alt=""
                        sizes="(max-width: 640px) 45vw, 200px"
                        className={styles.thumbImg}
                      />
                      <span className={styles.thumbBadge} aria-hidden="true">
                        {active && isPlaying ? <IconEq /> : <IconPlay />}
                      </span>
                    </span>
                    <span className={styles.trendTitle}>{item.title}</span>
                    <span className={styles.trendSub}>
                      {formatTime(item.seconds)}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Element audio reel — pilote toute la section. */}
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onLoadedMetadata={(e) => {
          const d = e.currentTarget.duration;
          setDuration(Number.isFinite(d) ? d : 0);
        }}
        onTimeUpdate={(e) => {
          if (scrubbing) return;
          setCurrentTime(e.currentTarget.currentTime);
        }}
        onEnded={() => {
          const el = audioRef.current;
          if (repeat === "one" && el) {
            el.currentTime = 0;
            void el.play().catch(() => setIsPlaying(false));
            return;
          }
          goNext(true);
        }}
        onError={() => setIsPlaying(false)}
      >
        <track kind="captions" />
      </audio>
    </section>
  );
}

/* =========================================================
   5. ICONES (inline, aucune dependance)
   ========================================================= */

const ICON_PROPS = {
  viewBox: "0 0 24 24",
  width: 22,
  height: 22,
  "aria-hidden": true,
  focusable: false,
} as const;

function IconPlay() {
  return (
    <svg {...ICON_PROPS} fill="currentColor">
      <path d="M8 5.6c0-.9 1-1.5 1.8-1L19 11.1c.7.4.7 1.4 0 1.8L9.8 19.4c-.8.5-1.8-.1-1.8-1V5.6Z" />
    </svg>
  );
}

function IconPause() {
  return (
    <svg {...ICON_PROPS} fill="currentColor">
      <rect x="6.5" y="5" width="4" height="14" rx="1.4" />
      <rect x="13.5" y="5" width="4" height="14" rx="1.4" />
    </svg>
  );
}

function IconPrev() {
  return (
    <svg {...ICON_PROPS} fill="currentColor">
      <rect x="5" y="6" width="2.4" height="12" rx="1.2" />
      <path d="M19 7.3v9.4c0 .9-1 1.5-1.8 1l-7.5-4.7a1.2 1.2 0 0 1 0-2l7.5-4.7c.8-.5 1.8.1 1.8 1Z" />
    </svg>
  );
}

function IconNext() {
  return (
    <svg {...ICON_PROPS} fill="currentColor">
      <rect x="16.6" y="6" width="2.4" height="12" rx="1.2" />
      <path d="M5 7.3v9.4c0 .9 1 1.5 1.8 1l7.5-4.7a1.2 1.2 0 0 0 0-2L6.8 6.3C6 5.8 5 6.4 5 7.3Z" />
    </svg>
  );
}

function IconShuffle() {
  return (
    <svg
      {...ICON_PROPS}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 7h3.2c1.2 0 2.3.6 3 1.6l4.6 6.8c.7 1 1.8 1.6 3 1.6H21" />
      <path d="M3 17h3.2c1.2 0 2.3-.6 3-1.6l.9-1.3" />
      <path d="M14.2 8.9l.6-.9c.7-1 1.8-1.6 3-1.6H21" />
      <path d="m18.4 3.6 2.6 2.8-2.6 2.8" />
      <path d="m18.4 14.4 2.6 2.6-2.6 2.8" />
    </svg>
  );
}

function IconRepeat({ one }: { one: boolean }) {
  return (
    <svg
      {...ICON_PROPS}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 11V9.5A3.5 3.5 0 0 1 7.5 6H19" />
      <path d="m16.2 3.2 3 2.8-3 2.8" />
      <path d="M20 13v1.5a3.5 3.5 0 0 1-3.5 3.5H5" />
      <path d="m7.8 20.8-3-2.8 3-2.8" />
      {one ? <path d="M12 10.6v3.4M12 10.6l-1 .7" /> : null}
    </svg>
  );
}

function IconEq() {
  return (
    <svg {...ICON_PROPS} width={16} height={16} fill="currentColor">
      <rect x="4" y="9" width="3" height="10" rx="1.5" />
      <rect x="10.5" y="5" width="3" height="14" rx="1.5" />
      <rect x="17" y="11" width="3" height="8" rx="1.5" />
    </svg>
  );
}
