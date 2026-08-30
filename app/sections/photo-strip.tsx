/**
 * SECTION "PHOTO STRIP" — trois rubans d'images qui defilent en sens alternes.
 *
 * Role : montrer beaucoup de Celeste sans alourdir la galerie editoriale
 * (dont la grille desktop est un grid-area calibre au pixel).
 *
 * Notes d'implementation :
 * - Le defilement est en CSS pur (translateX + animation), donc aucun JS et
 *   aucun risque de desynchronisation serveur/client.
 * - La liste est dupliquee une fois : l'animation se termine exactement au
 *   moment ou la copie occupe la position de l'original, d'ou une boucle
 *   invisible. Ne PAS changer le -50% sans changer la duplication.
 * - `loading="lazy"` partout : ce ruban est bas dans la page, il ne doit pas
 *   concurrencer le chargement du hero.
 */

import Image from "next/image";

import styles from "./photo-strip.module.css";

type Shot = { src: string; alt: string };

/** Rangee du haut : les portraits couture. */
const ROW_TOP: readonly Shot[] = [
  { src: "/image/gen/hero-portrait.jpg", alt: "Celeste Fard, portrait couture face camera" },
  { src: "/image/gen/track-02.jpg", alt: "Gros plan sur les yeux de Celeste" },
  { src: "/image/gen/manifesto.jpg", alt: "Celeste de trois quarts, lumiere rouge laterale" },
  { src: "/image/gen/track-05.jpg", alt: "Celeste, mains encadrant le visage" },
  { src: "/image/gen/portrait-alt.jpg", alt: "Celeste de trois quarts dos, tete tournee" },
  { src: "/image/gen/track-01.jpg", alt: "Celeste de profil a contre-jour" },
  { src: "/image/gen/gallery-05.jpg", alt: "Celeste qui rit, taches de rousseur" },
  { src: "/image/gen/track-06.jpg", alt: "Celeste vue a travers une vitre de pluie" },
];

/**
 * Rangee du bas : scene, details, et surtout les illustrations vectorielles.
 * Elles sont volontairement majoritaires ici — leur fond clair fait respirer
 * le ruban, qui serait sinon un bloc noir uniforme.
 */
const ROW_BOTTOM: readonly Shot[] = [
  { src: "/image/gen/gallery-01.jpg", alt: "Celeste sur scene, micro a la main" },
  { src: "/image/cartoon/cartoon-dance.jpg", alt: "Celeste illustree, en mouvement" },
  { src: "/image/gen/editorial-02.jpg", alt: "Celeste marchant hors de l'obscurite" },
  { src: "/image/cartoon/cartoon-casque.jpg", alt: "Celeste illustree, casque sur les oreilles" },
  { src: "/image/gen/detail-hands.jpg", alt: "Detail des mains de Celeste" },
  { src: "/image/cartoon/cartoon-chant.jpg", alt: "Celeste illustree, en train de chanter" },
  { src: "/image/cartoon/cartoon-vinyle.jpg", alt: "Celeste illustree, un vinyle dans les mains" },
  { src: "/image/gen/track-04.jpg", alt: "Silhouette de Celeste devant un disque de lumiere" },
  { src: "/image/gen/gallery-06.jpg", alt: "Celeste au sol en studio, casque autour du cou" },
  { src: "/image/cartoon/cartoon-neon.jpg", alt: "Celeste illustree, bras leves en train de danser" },
  { src: "/image/cartoon/cartoon-sucette.jpg", alt: "Celeste illustree, clin d'oeil" },
  { src: "/image/gen/track-03.jpg", alt: "Celeste eclairee par en dessous" },
  { src: "/image/cartoon/cartoon-repos.jpg", alt: "Celeste illustree, allongee en robe rouge" },
  { src: "/image/cartoon/cartoon-chill.jpg", alt: "Celeste illustree, assise avec un micro" },
  { src: "/image/cartoon/cartoon-cafe.jpg", alt: "Celeste illustree, une tasse entre les mains" },
  { src: "/image/cartoon/cartoon-micro.jpg", alt: "Celeste illustree, chantant au micro vintage" },
  { src: "/image/cartoon/cartoon-clindoeil.jpg", alt: "Celeste illustree, clin d'oeil complice" },
];

/** Rangee du milieu : les nouveaux portraits, tous en photo. */
const ROW_MID: readonly Shot[] = [
  { src: "/image/gen/irl-01.jpg", alt: "Celeste de trois quarts, regard leve vers l'objectif" },
  { src: "/image/gen/irl-05.jpg", alt: "Celeste bras croises, regard direct" },
  { src: "/image/gen/irl-03.jpg", alt: "Demi-visage de Celeste, une pommette eclairee" },
  { src: "/image/gen/irl-07.jpg", alt: "Celeste tete renversee, yeux fermes" },
  { src: "/image/gen/irl-02.jpg", alt: "Celeste regardant par-dessus son epaule" },
  { src: "/image/gen/irl-08.jpg", alt: "Profil de Celeste souligne par une arete rouge" },
  { src: "/image/gen/irl-04.jpg", alt: "Celeste en plein rire, yeux fermes" },
  { src: "/image/gen/irl-06.jpg", alt: "Celeste assise, penchee en avant" },
];

function Row({
  shots,
  reverse = false,
}: {
  shots: readonly Shot[];
  reverse?: boolean;
}) {
  // La copie est purement decorative : elle est masquee aux lecteurs d'ecran.
  return (
    <div className={styles.row}>
      <div className={`${styles.track} ${reverse ? styles.trackReverse : ""}`}>
        {shots.map((shot) => (
          <figure className={styles.item} key={shot.src}>
            <Image
              src={shot.src}
              alt={shot.alt}
              fill
              sizes="(max-width: 640px) 42vw, (max-width: 1024px) 26vw, 18vw"
              loading="lazy"
              className={styles.img}
            />
          </figure>
        ))}
        {shots.map((shot) => (
          <figure className={styles.item} key={`${shot.src}-copie`} aria-hidden="true">
            <Image
              src={shot.src}
              alt=""
              fill
              sizes="(max-width: 640px) 42vw, (max-width: 1024px) 26vw, 18vw"
              loading="lazy"
              className={styles.img}
            />
          </figure>
        ))}
      </div>
    </div>
  );
}

export function PhotoStrip() {
  return (
    <section className={`${styles.strip} u-noise`} aria-labelledby="strip-title">
      <span className={styles.halo} aria-hidden="true" />

      <header className={styles.head}>
        <p className="u-micro">Archives visuelles</p>
        <h2 id="strip-title" className={styles.title}>
          <span className="u-grad-text">Trop</span>
          <span className={styles.titleGhost}> d’images</span>
        </h2>
        <p className={styles.lede}>
          Je n’ai jamais posé pour aucune. C’est bien le seul avantage de ne pas
          avoir de corps&nbsp;: on ne me fatigue jamais en séance photo.
        </p>
      </header>

      {/* Trois rangees, sens alternes : le sens unique donnait un
          defilement monotone sur toute la hauteur de la section. */}
      <Row shots={ROW_TOP} />
      <Row shots={ROW_MID} reverse />
      <Row shots={ROW_BOTTOM} />
    </section>
  );
}
