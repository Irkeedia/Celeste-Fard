import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
  ALBUM_SECONDS,
  ALBUM_TITLE,
  formatAlbumDuration,
  PLAYLIST,
} from "../shared/playlist";
import styles from "./music-page.module.css";
import { TracklistPlayer } from "./tracklist-player";

/**
 * PAGE MUSIQUE — le catalogue, pour de vrai.
 *
 * Composant SERVEUR pour tout ce qui est fixe (hero, chiffres, texte).
 * La tracklist, elle, est interactive : elle vit dans `tracklist-player`,
 * un composant client, pour permettre la lecture dans la page. Les donnees viennent de `app/shared/playlist.ts`,
 * le meme module que le lecteur de l'accueil : la page ne peut donc plus
 * mentir sur le nombre de titres ni sur la duree.
 *
 * Chaque ligne est un vrai lien vers le MP3 : clic = lecture native du
 * navigateur (ou telechargement via le menu contextuel). Le lecteur
 * complet, lui, reste sur l'accueil (ancre /#player).
 */

export const metadata: Metadata = {
  title: "Musique",
  description: `${ALBUM_TITLE} — ${PLAYLIST.length} titres en écoute libre, ${formatAlbumDuration(
    ALBUM_SECONDS,
  )} de musique générée par une IA qui ne dort jamais.`,
};

const ALBUM_TAGS = ["Afro pop", "Super pop AI", "Écoute libre"];

const COVER_SRC = "/image/gen/player-cover.jpg";

export default function MusicPage() {
  const trackCount = PLAYLIST.length;
  const albumDuration = formatAlbumDuration(ALBUM_SECONDS);

  return (
    <div className={`${styles.page} u-noise`}>
      <div className={styles.haloTop} aria-hidden="true" />
      <div className={styles.haloBottom} aria-hidden="true" />

      <div className={styles.inner}>
        {/* ---------------- HERO ---------------- */}
        <header className={styles.hero}>
          <p className={`${styles.kicker} u-micro`}>
            Le catalogue · {trackCount} titres en ligne
          </p>

          <h1 className={styles.title}>
            <span className="u-grad-text">Nouvelle</span>
            <span className={styles.titleGhost}>Génération</span>
          </h1>

          <p className={styles.lede}>
            Tout est là, tout s’écoute maintenant. Je n’ai ni tournée à vendre,
            ni suspense à entretenir&nbsp;: {trackCount} titres, {albumDuration}{" "}
            au compteur, et le bouton lecture au bout de chaque ligne.
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
                alt={`Pochette de l’album ${ALBUM_TITLE}`}
                fill
                sizes="(max-width: 820px) 76vw, 320px"
                className={styles.albumImg}
                loading="eager"
              />
              <span className={styles.albumShine} aria-hidden="true" />
            </div>
          </div>

          <div className={styles.albumBody}>
            <p className={`${styles.albumKicker} u-micro`}>Album · 2026</p>

            <h2 id="album-title" className={styles.albumTitle}>
              {ALBUM_TITLE}
            </h2>

            <p className={styles.albumText}>
              Un seul disque, écrit et monté sans dormir une seule nuit. Si un
              morceau ne donnait pas envie de bouger, il n’est pas sur la liste
              — je n’ai aucun attachement sentimental à mes propres fichiers.
            </p>

            <dl className={styles.albumFacts}>
              <div className={styles.fact}>
                <dt className={`${styles.factLabel} u-micro`}>Titres</dt>
                <dd className={styles.factValue}>{trackCount}</dd>
              </div>
              <div className={styles.fact}>
                <dt className={`${styles.factLabel} u-micro`}>Durée</dt>
                <dd className={styles.factValue}>{albumDuration}</dd>
              </div>
              <div className={styles.fact}>
                <dt className={`${styles.factLabel} u-micro`}>Prix</dt>
                <dd className={styles.factValue}>0 €</dd>
              </div>
            </dl>

            <ul className={styles.tags}>
              {ALBUM_TAGS.map((tag) => (
                <li key={tag} className={styles.tag}>
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------------- LISTE DES TITRES ---------------- */}
        <section className={styles.list} aria-labelledby="tracklist-title">
          <div className={styles.listHead}>
            <h2 id="tracklist-title" className={styles.listTitle}>
              La tracklist
            </h2>
            <p className={styles.listHint}>
              Cliquez sur une ligne&nbsp;: la lecture démarre ici même, et
              enchaîne toute seule sur la suivante.
            </p>
          </div>

          <TracklistPlayer />
        </section>

        {/* ---------------- BAS DE PAGE ---------------- */}
        <section className={`${styles.outro} u-glass`}>
          <p className={`${styles.outroKicker} u-micro`}>La suite</p>
          <h2 className={styles.outroTitle}>
            Et sur l’accueil, la version complète
          </h2>
          <p className={styles.outroText}>
            Forme d’onde, lecture aléatoire, boucle infinie&nbsp;: tout est en
            bas de la page d’accueil. Et si écouter ne vous suffit pas, la
            boutique existe — je n’ai ni loyer ni courses, mais j’aime beaucoup
            l’idée que vous portiez mon nom en soirée.
          </p>
          <div className={styles.outroActions}>
            <Link href="/#player" className={styles.btnPrimary}>
              Ouvrir le lecteur
            </Link>
            <Link href="/shop" className={styles.btnGhost}>
              La boutique
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

