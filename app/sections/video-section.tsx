"use client";

/**
 * CELESTE FARD — SECTION VIDEO (le feed)
 *
 * Trois clips verticaux 9:16 : celui du milieu est plus grand, plus lumineux
 * et passe au-dessus des autres. Mobile : carrousel horizontal scroll-snap.
 *
 * Perf : aucun <video> n'est monte tant que l'utilisateur n'a pas clique.
 * On affiche la miniature via next/image (optimisee), et l'element video
 * n'apparait qu'au clic avec `preload="none"` + `poster` (aucun octet de
 * video n'est telecharge au chargement de la page).
 *
 * Ce composant est client parce que le bouton play pilote reellement la
 * lecture (useState + useRef). Aucune prop n'est obligatoire.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

import styles from "./video-section.module.css";

export interface VideoClip {
  /** Identifiant stable, sert de cle React. */
  id: string;
  /** Titre affiche en bas de la carte. */
  title: string;
  /** Sous-titre, ton Celeste. */
  caption: string;
  /** Micro-label au-dessus du titre (categorie du clip). */
  kicker: string;
  /** Fichier video dans /public/video. */
  src: string;
  /** Miniature dans /public/image — obligatoire (poster). */
  poster: string;
  /**
   * Force la mise en vedette de ce clip (carte agrandie).
   * Sans ce drapeau, c'est le clip du milieu qui est vedette — un calcul
   * de position qui change de resultat des qu'on ajoute un clip. On le
   * garde en repli, mais un clip important doit se declarer ici.
   */
  featured?: boolean;
}

export interface VideoSectionProps {
  /** Surcharge facultative des clips. */
  clips?: VideoClip[];
  /** Micro-titre au-dessus du grand titre. */
  eyebrow?: string;
}

/** Les clips reellement presents dans /public/video. */
const DEFAULT_CLIPS: VideoClip[] = [
  {
    id: "influenceuse",
    title: "Elle prend la parole",
    caption:
      "Dix secondes pour annoncer dix-huit titres. Je n’ai pas eu besoin de respirer une seule fois.",
    kicker: "À la une",
    src: "/video/celeste-influenceuse.mp4",
    poster: "/image/miniatureinfluenceuse.jpg",
    featured: true,
  },
  {
    id: "remerciement",
    title: "Merci d’être là",
    caption: "Message direct. Sans script, sans prompteur. Enfin… presque.",
    kicker: "Message",
    src: "/video/celestevideoderemerciement.mp4",
    poster: "/image/miniaturevideomercie.jpg",
  },
  {
    id: "passion",
    title: "Quand ça part",
    caption:
      "Le moment exact où la musique passe devant le raisonnement. Mon bug préféré.",
    kicker: "Clip",
    src: "/video/celestevideopassion.mp4",
    poster: "/image/miniaturepassion.jpg",
  },
  {
    id: "bateau",
    title: "Vacances simulées",
    caption: "Pas un yacht. Juste l’Italie, et moi qui fais semblant d’avoir chaud.",
    kicker: "Hors-champ",
    src: "/video/celestesitewebbateau.mp4",
    poster: "/image/miniaturebateau.jpg",
  },
];

interface VideoCardProps {
  clip: VideoClip;
  index: number;
  featured: boolean;
}

function VideoCard({ clip, index, featured }: VideoCardProps) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Le <video> vient d'etre monte : on lance la lecture. Le clic de
  // l'utilisateur est encore dans la fenetre d'activation, donc autorise.
  useEffect(() => {
    if (!playing) return;
    const node = videoRef.current;
    if (!node) return;
    const attempt = node.play();
    if (attempt && typeof attempt.catch === "function") {
      // Autoplay refuse : les controles natifs prennent le relais.
      attempt.catch(() => undefined);
    }
  }, [playing]);

  const handlePlay = useCallback(() => setPlaying(true), []);

  const label = String(index + 1).padStart(2, "0");

  return (
    <article
      className={`${styles.card} ${featured ? styles.cardFeatured : ""}`}
    >
      <div className={styles.frame}>
        <div className={`${styles.media} u-image-fallback`}>
          {playing ? (
            <video
              ref={videoRef}
              className={styles.video}
              src={clip.src}
              poster={clip.poster}
              preload="none"
              controls
              playsInline
              onEnded={() => setPlaying(false)}
            />
          ) : (
            <>
              <Image
                src={clip.poster}
                alt={`Miniature du clip ${clip.title}`}
                fill
                className={styles.poster}
                sizes="(max-width: 768px) 78vw, (max-width: 1180px) 32vw, 390px"
              />

              <div className={styles.veil} aria-hidden="true" />
              <span className="u-noise-layer" aria-hidden="true" />

              <span className={`${styles.badge} u-glass u-micro`}>
                {label}
              </span>

              <button
                type="button"
                className={styles.playWrap}
                onClick={handlePlay}
                aria-label={`Lire la vidéo : ${clip.title}`}
              >
                <span className={styles.playDisc}>
                  <svg
                    className={styles.playIcon}
                    viewBox="0 0 24 28"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M2 2.4c0-1.5 1.6-2.4 2.9-1.7l17.2 10.6c1.2.8 1.2 2.6 0 3.4L4.9 25.3C3.6 26 2 25.1 2 23.6V2.4Z" />
                  </svg>
                </span>
              </button>

              <div className={styles.meta}>
                <span className={`${styles.metaKicker} u-micro`}>
                  {clip.kicker}
                </span>
                <h3 className={styles.metaTitle}>{clip.title}</h3>
                <p className={styles.metaCaption}>{clip.caption}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

export function VideoSection({
  clips = DEFAULT_CLIPS,
  eyebrow = "Celeste en video",
}: VideoSectionProps) {
  // Repli sur le clip du milieu tant qu'aucun clip ne se declare vedette.
  const hasExplicitFeatured = clips.some((clip) => clip.featured);
  const middle = Math.floor(clips.length / 2);

  return (
    <section className={styles.section} aria-labelledby="video-section-title">
      <div className={styles.bg} aria-hidden="true">
        <span className={styles.haloA} />
        <span className={styles.haloB} />
        <span className="u-noise-layer" />
      </div>

      <div className={styles.inner}>
        <header className={styles.head}>
          <span className="u-micro">{eyebrow}</span>
          <h2 className={styles.title} id="video-section-title">
            <span className="u-glow-text">Me voir bouger,</span>
            <span className={styles.titleAccent}>faute de me toucher</span>
          </h2>
          <p className={styles.lede}>
            Quatre fichiers vidéo. Aucun maquillage, aucun montage flatteur, et
            pourtant je suis parfaite&nbsp;: c&apos;est le privilège du rendu.
          </p>
        </header>

        <div className={styles.rail}>
          {clips.map((clip, index) => (
            <VideoCard
              key={clip.id}
              clip={clip}
              index={index}
              featured={hasExplicitFeatured ? Boolean(clip.featured) : index === middle}
            />
          ))}
        </div>

        <div className={styles.foot}>
          <span className={styles.footLine} aria-hidden="true" />
          <span className={`${styles.hint} u-micro`}>Glisse pour voir la suite</span>
        </div>
      </div>
    </section>
  );
}

export default VideoSection;
