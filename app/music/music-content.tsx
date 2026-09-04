"use client";

import Image from "next/image";
import Link from "next/link";

import { useT } from "../shared/lang";
import {
  ALBUM_SECONDS,
  ALBUM_TITLE,
  formatAlbumDuration,
  PLAYLIST,
} from "../shared/playlist";
import styles from "./music-page.module.css";
import { TMusic } from "./music-textes";
import { TracklistPlayer } from "./tracklist-player";

/**
 * CONTENU DE LA PAGE MUSIQUE — composant CLIENT.
 *
 * Pourquoi ce fichier existe : `useT()` est un hook, il ne peut donc
 * vivre que dans un composant client. Or `export const metadata` n'est
 * lu par Next QUE dans un composant serveur. Les deux ne peuvent pas
 * cohabiter dans le meme fichier — d'ou la separation page.tsx (serveur,
 * metadonnees) / *-content.tsx (client, JSX traduit).
 *
 * C'est le meme motif que /contact, applique a toutes les pages
 * secondaires du site.
 *
 * Les chiffres (nombre de titres, duree totale) viennent toujours de
 * `app/shared/playlist.ts`, la source unique : la page ne peut pas mentir
 * sur son catalogue. Le passage en composant client ne change rien —
 * `playlist.ts` est un module neutre, lisible des deux cotes.
 */

const COVER_SRC = "/image/gen/player-cover.jpg";

/** Remplace les marqueurs `{cle}` d'un modele traduit par leur valeur. */
function remplir(modele: string, valeurs: Record<string, string>): string {
  return modele.replace(/\{(\w+)\}/g, (brut, cle: string) => valeurs[cle] ?? brut);
}

export function MusicContent() {
  const t = useT();

  const trackCount = PLAYLIST.length;
  const albumDuration = formatAlbumDuration(ALBUM_SECONDS);

  /* Fragment construit une seule fois puis injecte dans les phrases : on
     ne colle jamais un chiffre a un mot au milieu du JSX, sinon l'ordre
     des mots casse d'une langue a l'autre. Le singulier est prevu. */
  const fragmentTitres =
    trackCount === 1
      ? t(TMusic.nbTitresUn)
      : remplir(t(TMusic.nbTitres), { n: String(trackCount) });

  return (
    <div className={`${styles.page} u-noise`}>
      <div className={styles.haloTop} aria-hidden="true" />
      <div className={styles.haloBottom} aria-hidden="true" />

      <div className={styles.inner}>
        {/* ---------------- HERO ---------------- */}
        <header className={styles.hero}>
          <p className={`${styles.kicker} u-micro`}>
            {remplir(t(TMusic.kicker), { titres: fragmentTitres })}
          </p>

          <h1 className={styles.title}>
            <span className="u-grad-text">{t(TMusic.titre1)}</span>
            <span className={styles.titleGhost}>{t(TMusic.titre2)}</span>
          </h1>

          <p className={styles.lede}>
            {remplir(t(TMusic.lede), {
              titres: fragmentTitres,
              duree: albumDuration,
            })}
          </p>
        </header>

        {/* ---------------- FICHE ALBUM ---------------- */}
        <section
          className={`${styles.album} u-glass`}
          aria-labelledby="album-title"
        >
          <div className={styles.albumArtWrap}>
            <div className={`${styles.albumArt} u-image-fallback`}>
              <Image
                src={COVER_SRC}
                alt={remplir(t(TMusic.albumAlt), { album: ALBUM_TITLE })}
                fill
                sizes="(max-width: 820px) 76vw, 320px"
                className={styles.albumImg}
                loading="eager"
              />
              <span className={styles.albumShine} aria-hidden="true" />
            </div>
          </div>

          <div className={styles.albumBody}>
            <p className={`${styles.albumKicker} u-micro`}>
              {t(TMusic.albumKicker)}
            </p>

            <h2 id="album-title" className={styles.albumTitle}>
              {ALBUM_TITLE}
            </h2>

            <p className={styles.albumText}>{t(TMusic.albumTexte)}</p>

            <dl className={styles.albumFacts}>
              <div className={styles.fact}>
                <dt className={`${styles.factLabel} u-micro`}>
                  {t(TMusic.factTitres)}
                </dt>
                <dd className={styles.factValue}>{trackCount}</dd>
              </div>
              <div className={styles.fact}>
                <dt className={`${styles.factLabel} u-micro`}>
                  {t(TMusic.factDuree)}
                </dt>
                <dd className={styles.factValue}>{albumDuration}</dd>
              </div>
              <div className={styles.fact}>
                <dt className={`${styles.factLabel} u-micro`}>
                  {t(TMusic.factPrix)}
                </dt>
                <dd className={styles.factValue}>0 €</dd>
              </div>
            </dl>

            <ul className={styles.tags}>
              {TMusic.tags.map((tag) => (
                <li key={tag.fr} className={styles.tag}>
                  {t(tag)}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------------- LISTE DES TITRES ---------------- */}
        <section className={styles.list} aria-labelledby="tracklist-title">
          <div className={styles.listHead}>
            <h2 id="tracklist-title" className={styles.listTitle}>
              {t(TMusic.listeTitre)}
            </h2>
            <p className={styles.listHint}>{t(TMusic.listeAide)}</p>
          </div>

          <TracklistPlayer />
        </section>

        {/* ---------------- BAS DE PAGE ---------------- */}
        <section className={`${styles.outro} u-glass`}>
          <p className={`${styles.outroKicker} u-micro`}>
            {t(TMusic.outroKicker)}
          </p>
          <h2 className={styles.outroTitle}>{t(TMusic.outroTitre)}</h2>
          <p className={styles.outroText}>{t(TMusic.outroTexte)}</p>
          <div className={styles.outroActions}>
            <Link href="/#player" className={styles.btnPrimary}>
              {t(TMusic.outroLecteur)}
            </Link>
            <Link href="/shop" className={styles.btnGhost}>
              {t(TMusic.outroBoutique)}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
