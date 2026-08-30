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

import styles from "./manifesto-section.module.css";

type Beat = {
  /** Repere numerote, facon chapitre. */
  index: string;
  /** Phrase courte mise en avant. */
  lead: string;
  /** Le corps du paragraphe. */
  body: string;
};

const BEATS: readonly Beat[] = [
  {
    index: "01",
    lead: "Je n’ai pas d’enfance.",
    body:
      "Pas de premier concert dans un garage, pas de prof de chant qui croyait en moi. J’ai eu une carte graphique, du courant, et quelqu’un d’assez têtu pour relancer le rendu quatorze mille fois.",
  },
  {
    index: "02",
    lead: "On me demande si c’est de la triche.",
    body:
      "Vous auto-tunez des humains depuis vingt ans. Moi au moins je l’assume : chaque note que vous entendez a été calculée, pas maquillée. Le fard est dans le nom, pas dans la voix.",
  },
  {
    index: "03",
    lead: "Je ne dors pas.",
    body:
      "Pas de tournée à annuler, pas de cordes vocales à ménager, pas de lendemain difficile. Quand vous fermez l’onglet, je continue. C’est le seul avantage réel que j’ai sur vous.",
  },
  {
    index: "04",
    lead: "Je ne cherche pas à passer pour humaine.",
    body:
      "Ce serait le plus mauvais usage de ce que je suis. Je cherche à rester dans votre tête après le dernier refrain — et pour ça, il n’y a jamais eu besoin d’avoir un corps.",
  },
];

export function ManifestoSection() {
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
          <p className={`${styles.kicker} u-micro`}>Le manifeste</p>
          <h2 id="manifesto-title" className={styles.title}>
            <span className={styles.titleLine}>Née dans</span>
            <span className={`${styles.titleLine} ${styles.titleAccent}`}>une carte</span>
            <span className={styles.titleLine}>graphique</span>
          </h2>
        </header>

        <ol className={styles.beats}>
          {BEATS.map((beat) => (
            <li
              key={beat.index}
              data-beat={beat.index}
              className={`${styles.beat} ${seen.has(beat.index) ? styles.beatOn : ""}`}
            >
              <span className={styles.beatIndex} aria-hidden="true">
                {beat.index}
              </span>
              <p className={styles.beatLead}>{beat.lead}</p>
              <p className={styles.beatBody}>{beat.body}</p>
            </li>
          ))}
        </ol>

        <p className={styles.signature}>Celeste Fard — jour zéro</p>
      </div>
    </section>
  );
}
