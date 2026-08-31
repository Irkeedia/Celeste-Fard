"use client";

/**
 * TRACKLIST JOUABLE — page Musique.
 *
 * Remplace la liste de liens `<a href="...mp3">` : chaque ligne ouvrait le
 * fichier, ce qui revenait a le proposer au telechargement et n'offrait
 * aucune lecture dans la page.
 *
 * PROTECTION DES FICHIERS — ce qui est fait, et ce qui ne peut pas l'etre :
 * - aucun lien direct vers le .mp3 dans le HTML ;
 * - `controlsList="nodownload"` retire le bouton de telechargement du
 *   lecteur natif, `disableRemotePlayback` coupe la diffusion externe ;
 * - le menu contextuel est neutralise sur l'element audio.
 * Cela couvre le visiteur ordinaire. Cela n'empeche PAS quelqu'un qui
 * ouvre l'onglet reseau du navigateur de recuperer le fichier : tout media
 * lisible dans un navigateur est, par construction, telechargeable. Une
 * vraie protection demanderait du streaming segmente avec jetons signes
 * (HLS + DRM), ce qui est hors de proportion pour un site vitrine.
 */

import { useCallback, useEffect, useRef, useState } from "react";

import { PLAYLIST, audioSrc, formatTime, type Track } from "../shared/playlist";
import styles from "./music-page.module.css";

function IconPlay() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M8 5.5v13a1 1 0 0 0 1.54.84l10-6.5a1 1 0 0 0 0-1.68l-10-6.5A1 1 0 0 0 8 5.5Z" />
    </svg>
  );
}

function IconPause() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <rect x="6" y="4" width="4" height="16" rx="1" />
      <rect x="14" y="4" width="4" height="16" rx="1" />
    </svg>
  );
}

/** Barres d'egaliseur affichees sur la ligne en cours de lecture. */
function Equalizer() {
  return (
    <span className={styles.eq} aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}

export function TracklistPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [current, setCurrent] = useState<number | null>(null);
  /**
   * Demande de lecture en attente de la nouvelle source. On ne peut pas
   * appeler play() dans le gestionnaire de clic : la src n'est posee qu'au
   * rendu suivant, et on relancerait la piste precedente. Un drapeau + un
   * effet est plus sur qu'un requestAnimationFrame, qui ne se declenche pas
   * si l'onglet passe en arriere-plan entre le clic et le rendu.
   */
  const [pendingPlay, setPendingPlay] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const track: Track | null = current == null ? null : PLAYLIST[current];

  const play = useCallback(
    async (i: number) => {
      const a = audioRef.current;
      if (!a) return;

      // Meme ligne : on bascule lecture / pause.
      if (i === current) {
        if (a.paused) {
          await a.play().catch(() => setPlaying(false));
        } else {
          a.pause();
        }
        return;
      }

      setCurrent(i);
      setTime(0);
      setPendingPlay(true);
    },
    [current],
  );

  const next = useCallback(
    (direction: 1 | -1) => {
      if (current == null) return;
      const i = (current + direction + PLAYLIST.length) % PLAYLIST.length;
      void play(i);
    },
    [current, play],
  );

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    // Coupe la diffusion vers un appareil externe (AirPlay / Cast).
    // L'attribut n'existe pas dans les types React, on le pose ici.
    (a as HTMLAudioElement & { disableRemotePlayback?: boolean })
      .disableRemotePlayback = true;

    const onTime = () => setTime(a.currentTime);
    const onMeta = () => setDuration(a.duration || 0);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnd = () => next(1);

    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("ended", onEnd);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("ended", onEnd);
    };
  }, [next]);

  // La source vient d'etre posee par le rendu : on lance la lecture.
  useEffect(() => {
    if (!pendingPlay) return;
    const a = audioRef.current;
    if (!a) return;
    setPendingPlay(false);
    a.play().catch(() => setPlaying(false));
  }, [pendingPlay, current]);

  const seek = useCallback((value: number) => {
    const a = audioRef.current;
    if (!a || !Number.isFinite(a.duration)) return;
    a.currentTime = (value / 100) * a.duration;
  }, []);

  const progress = duration ? (time / duration) * 100 : 0;

  return (
    <>
      <ol className={styles.tracks}>
        {PLAYLIST.map((item, i) => {
          const isCurrent = i === current;
          const isPlaying = isCurrent && playing;
          return (
            <li key={item.id} className={styles.trackItem}>
              <button
                type="button"
                className={`${styles.track} ${isCurrent ? styles.trackCurrent : ""}`}
                onClick={() => void play(i)}
                aria-current={isCurrent ? "true" : undefined}
                aria-label={
                  isPlaying
                    ? `Mettre en pause ${item.title}`
                    : `Écouter ${item.title} — ${formatTime(item.seconds)}`
                }
              >
                <span className={styles.trackNum} aria-hidden="true">
                  {isPlaying ? <Equalizer /> : String(i + 1).padStart(2, "0")}
                </span>

                <span className={styles.trackTitle}>{item.title}</span>
                <span className={styles.trackMood}>{item.mood}</span>
                <span className={styles.trackTime}>{formatTime(item.seconds)}</span>

                <span className={styles.trackIcon} aria-hidden="true">
                  {isPlaying ? <IconPause /> : <IconPlay />}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {/* Barre de lecture : n'apparait qu'une fois un titre lance. */}
      {track ? (
        <div className={styles.bar} role="region" aria-label="Lecture en cours">
          <div className={styles.barInner}>
            <button
              type="button"
              className={styles.barPlay}
              onClick={() => void play(current!)}
              aria-label={playing ? "Mettre en pause" : "Reprendre la lecture"}
            >
              {playing ? <IconPause /> : <IconPlay />}
            </button>

            <div className={styles.barMeta}>
              <span className={styles.barTitle}>{track.title}</span>
              <span className={styles.barAlbum}>{track.album}</span>
            </div>

            <span className={styles.barTime}>{formatTime(time)}</span>

            <input
              className={styles.barSeek}
              type="range"
              min={0}
              max={100}
              step={0.1}
              value={progress}
              onChange={(e) => seek(Number(e.target.value))}
              aria-label="Position dans le morceau"
            />

            <span className={styles.barTime}>
              {formatTime(duration || track.seconds)}
            </span>

            <div className={styles.barNav}>
              <button
                type="button"
                className={styles.barSkip}
                onClick={() => next(-1)}
                aria-label="Titre précédent"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                  <path d="M7 5h2v14H7zM19 5.5v13a1 1 0 0 1-1.54.84l-10-6.5a1 1 0 0 1 0-1.68l10-6.5A1 1 0 0 1 19 5.5Z" />
                </svg>
              </button>
              <button
                type="button"
                className={styles.barSkip}
                onClick={() => next(1)}
                aria-label="Titre suivant"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                  <path d="M15 5h2v14h-2zM5 5.5v13a1 1 0 0 0 1.54.84l10-6.5a1 1 0 0 0 0-1.68l-10-6.5A1 1 0 0 0 5 5.5Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <audio
        ref={audioRef}
        src={track ? audioSrc(track) : undefined}
        preload="none"
        controlsList="nodownload noplaybackrate"
        onContextMenu={(e) => e.preventDefault()}
      />
    </>
  );
}
