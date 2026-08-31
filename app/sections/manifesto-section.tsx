"use client";

/**
 * SECTION "MANIFESTE" — le recit, sans une seule mention de catalogue.
 *
 * Ancienne version : un split texte/image statique, qui cassait le rythme
 * entre le hero et le lecteur. Elle est remplacee par le meme langage que
 * les sections de titres — video plein cadre en fond, texte par-dessus —
 * mais sans audio ni appel a l'ecoute : ici on raconte, on ne vend rien.
 *
 * Les paragraphes se revelent au scroll via IntersectionObserver plutot
 * qu'a l'arrivee sur la page : le texte se decouvre au rythme de la
 * lecture, et rien ne bouge pour qui a demande moins d'animations.
 */

import { useEffect, useRef, useState } from "react";

import { useT } from "../shared/lang";
import { T } from "../shared/textes";
import styles from "./manifesto-section.module.css";

export function ManifestoSection() {
  const t = useT();
  const rootRef = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState<Set<string>>(new Set());

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-beat]"));
    const tousLesIds = items.map((el) => el.dataset.beat ?? "");

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      typeof IntersectionObserver === "undefined"
    ) {
      return; // on laisse le texte affiche tel quel
    }

    /* On arme l'apparition en posant la classe directement sur la liste,
       plutot qu'en passant par un etat React : le rendu de depart reste
       celui du serveur (texte visible), et l'etat masque n'apparait qu'une
       fois l'observateur reellement en place. Sans JS, avec un observateur
       suspendu ou en cas d'erreur, le manifeste reste donc lisible — c'est
       le contenu principal de la section. */
    const liste = root.querySelector("ol");
    liste?.classList.add(styles.beatsAnim);

    const observer = new IntersectionObserver(
      (entries) => {
        const nouveaux = entries
          .filter((e) => e.isIntersecting)
          .map((e) => (e.target as HTMLElement).dataset.beat ?? "");
        if (nouveaux.length === 0) return;
        // Une fois revele, un paragraphe le reste : re-cacher au scroll
        // arriere donnerait un clignotement desagreable.
        setSeen((prev) => new Set([...prev, ...nouveaux]));
      },
      { rootMargin: "0px 0px -18% 0px", threshold: 0.25 },
    );

    items.forEach((el) => observer.observe(el));

    // Filet de securite : si rien n'a ete revele au bout de quelques
    // secondes (observateur suspendu, cas limite), on affiche tout.
    const filet = window.setTimeout(() => {
      setSeen((prev) => (prev.size === 0 ? new Set(tousLesIds) : prev));
    }, 4000);

    return () => {
      observer.disconnect();
      window.clearTimeout(filet);
      liste?.classList.remove(styles.beatsAnim);
    };
  }, []);

  return (
    <section className={styles.section} aria-labelledby="manifesto-title">
      <div className={styles.bg} aria-hidden="true">
        <video
          className={styles.video}
          src="/video/celeste-story.mp4"
          poster="/image/miniaturestory.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <span className={styles.veil} />
        <span className={styles.glow} />
        <span className="u-noise-layer" />
      </div>

      <div className={styles.inner} ref={rootRef}>
        <header className={styles.head}>
          <p className={`${styles.kicker} u-micro`}>{t(T.manifeste.kicker)}</p>
          <h2 id="manifesto-title" className={styles.title}>
            <span className={styles.titleLine}>{t(T.manifeste.t1)}</span>
            <span className={`${styles.titleLine} ${styles.titleAccent}`}>
              {t(T.manifeste.t2)}
            </span>
          </h2>
        </header>

        <ol className={styles.beats}>
          {T.manifeste.beats.map((beat, i) => {
            const index = String(i + 1).padStart(2, "0");
            return (
              <li
                key={index}
                data-beat={index}
                className={`${styles.beat} ${seen.has(index) ? styles.beatOn : ""}`}
              >
                <span className={styles.beatIndex} aria-hidden="true">
                  {index}
                </span>
                <p className={styles.beatLead}>{t(beat.lead)}</p>
                <p className={styles.beatBody}>{t(beat.body)}</p>
              </li>
            );
          })}
        </ol>

        <p className={styles.signature}>{t(T.manifeste.signature)}</p>
      </div>
    </section>
  );
}
