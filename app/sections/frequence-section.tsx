"use client";

/**
 * SECTION "FREQUENCE" — affiche editoriale animee, dediee a un seul titre.
 *
 * Langage visuel repris d'une affiche fournie par le client : titre serif
 * tres fin et tres espace, citations flottantes dont un mot est souligne,
 * mots geants en filigrane derriere le sujet, cadre fin en retrait.
 * Ici le "sujet" n'est pas une statue mais la video cinematique de Celeste,
 * en boucle et muette : c'est le morceau qui porte le son.
 *
 * Fonctionnement :
 * - la video tourne en boucle, muette, en fond (donc autoplay autorise) ;
 * - le bouton lit le VRAI fichier /audio/nouvelle-generation/frequence.mp3 ;
 * - les phrases s'allument au fil de la lecture, via LYRICS[].at.
 *
 * Les timings de LYRICS sont MESURES : ils viennent d'une transcription
 * mot-a-mot de l'extrait (hyperframes transcribe), pas d'une estimation.
 * Ils restent regroupes en un seul endroit pour rester ajustables.
 */

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import styles from "./frequence-section.module.css";

const TRACK_SRC = "/audio/nouvelle-generation/frequence.mp3";
const TRACK_SECONDS = 174;

/* La section ne diffuse qu'un EXTRAIT : on entre dans le morceau une fois
   l'intro passee, et on s'arrete avant la fin. Le titre complet s'ecoute
   depuis le lecteur de la page ou la page Musique. */
const EXTRACT_START = 25;
const EXTRACT_END = 70;
/** Fondu de sortie, pour ne pas couper net sur la derniere seconde. */
const FADE_SECONDS = 2.5;

type Line = {
  /** Seconde a laquelle la phrase s'allume. */
  at: number;
  /** Debut de la phrase. */
  before: string;
  /** Mot mis en avant (souligne, comme sur l'affiche). */
  strong: string;
  /** Fin de la phrase. */
  after: string;
  /** Position dans le cadre, en pourcentage. */
  top: string;
  left?: string;
  right?: string;
  /** Alignement du bloc de texte. */
  align?: "left" | "right";
};

/**
 * Phrases tirees des paroles, placees comme les citations de l'affiche.
 *
 * Les `at` ne sont PAS estimes : ils viennent d'une transcription
 * mot-a-mot de l'extrait (hyperframes transcribe), donc chaque phrase
 * s'allume exactement quand elle est chantee. Valeurs en secondes
 * absolues dans le morceau, dans la fenetre [EXTRACT_START, EXTRACT_END].
 */
const LYRICS: readonly Line[] = [
  { at: 25.5, before: "« Pas de superflu, je reste dans ma ", strong: "lumière", after: " »", top: "10%", left: "6%" },
  { at: 27.1, before: "« Un battement lourd qui fait vibrer le ", strong: "sol", after: " »", top: "24%", right: "6%", align: "right" },
  { at: 29, before: "« Rien dans la tête, je prends mon ", strong: "envol", after: " »", top: "38%", left: "5%" },
  { at: 31.2, before: "« Le rythme est fluide, ça glisse sous mes ", strong: "pas", after: " »", top: "52%", right: "7%", align: "right" },
  { at: 33, before: "« Tout est plus simple quand la basse est ", strong: "là", after: " »", top: "66%", left: "6%" },
  { at: 35.2, before: "« Je veux juste la basse qui tourne en ", strong: "boucle", after: " »", top: "16%", left: "8%" },
  { at: 38.7, before: "« Le son qui tape et le cœur qui ", strong: "touche", after: " »", top: "44%", right: "6%", align: "right" },
  { at: 43, before: "« C’est ça le feeling, ", strong: "zéro détour", after: " »", top: "78%", left: "7%" },
];

function formatTime(s: number): string {
  if (!Number.isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

export function FrequenceSection() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  /** Vrai une fois l'extrait termine : declenche l'appel vers le titre complet. */
  const [ended, setEnded] = useState(false);
  const [time, setTime] = useState(0);

  const toggle = useCallback(async () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      // On (re)entre toujours dans l'extrait par son debut : relancer au
      // milieu apres une fin d'extrait n'aurait aucun sens.
      if (a.currentTime < EXTRACT_START || a.currentTime >= EXTRACT_END - 0.3) {
        a.currentTime = EXTRACT_START;
      }
      a.volume = 1;
      try {
        await a.play();
      } catch {
        // Lecture refusee par le navigateur : on reste simplement en pause.
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
        // Fin de l'extrait : on arrete et on propose le titre complet.
        a.pause();
        a.volume = 1;
        setEnded(true);
        return;
      }
      // Fondu de sortie : couper net sur une basse serait desagreable.
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
    <section className={styles.section} aria-labelledby="frequence-title">
      {/* --- Fond : video en boucle + voiles --- */}
      <div className={styles.bg} aria-hidden="true">
        <video
          className={styles.video}
          src="/video/celeste-cinematique.mp4"
          poster="/image/miniaturecinematique.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <span className={styles.veil} />
        <span className={styles.glowA} />
        <span className={styles.glowB} />
        <span className="u-noise-layer" />
      </div>

      {/* --- Mots geants en filigrane, comme sur l'affiche --- */}
      <div className={styles.ghosts} aria-hidden="true">
        <span className={styles.ghostA}>LA BASSE</span>
        <span className={styles.ghostB}>EN BOUCLE</span>
      </div>

      <div className={styles.frame} aria-hidden="true" />

      <div className={styles.inner}>
        <header className={styles.head}>
          <p className={`${styles.kicker} u-micro`}>Le titre · Nouvelle Génération</p>
          <h2 id="frequence-title" className={styles.title}>
            Fréquence
          </h2>
          <p className={styles.sub}>afrobeat · 808 · {formatTime(TRACK_SECONDS)}</p>
        </header>

        {/* --- Citations qui s'allument au fil du morceau --- */}
        <ul className={styles.lines}>
          {LYRICS.map((line) => {
            /* On se base sur le temps ecoule, pas sur `playing` : mettre en
               pause ferait autrement disparaitre d'un coup toutes les phrases
               deja passees. Elles restent donc affichees, et ne se remettent a
               zero qu'en fin de morceau (time repasse a 0). */
            const active = time > 0 && time >= line.at;
            return (
              <li
                key={line.at}
                className={`${styles.line} ${active ? styles.lineOn : ""} ${
                  line.align === "right" ? styles.lineRight : ""
                }`}
                style={{ top: line.top, left: line.left, right: line.right }}
              >
                <span className={styles.lineText}>
                  {line.before}
                  <strong className={styles.lineStrong}>{line.strong}</strong>
                  {line.after}
                </span>
              </li>
            );
          })}
        </ul>

        {/* --- Commande de lecture --- */}
        <div className={styles.player}>
          <button
            type="button"
            className={styles.play}
            onClick={toggle}
            aria-label={playing ? "Mettre Fréquence en pause" : "Écouter Fréquence"}
          >
            <span className={styles.playRing} aria-hidden="true" />
            <span className={styles.playIcon} aria-hidden="true">
              {playing ? (
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                  <path d="M8 5.5v13a1 1 0 0 0 1.54.84l10-6.5a1 1 0 0 0 0-1.68l-10-6.5A1 1 0 0 0 8 5.5Z" />
                </svg>
              )}
            </span>
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

        {/* Appel vers le titre complet — visible en permanence, mais mis en
            avant une fois l'extrait termine. */}
        <footer className={`${styles.foot} ${ended ? styles.footOn : ""}`}>
          <Link href="/#player" className={styles.cta}>
            Écouter le titre en entier
            <span aria-hidden="true">→</span>
          </Link>
          <Link href="/music" className={styles.badge}>
            <Image
              src="/logo_celeste.png"
              alt=""
              width={22}
              height={22}
              className={styles.badgeLogo}
            />
            <span>L’art de la fréquence</span>
          </Link>
        </footer>
      </div>

      <audio ref={audioRef} src={TRACK_SRC} preload="none" />
    </section>
  );
}
