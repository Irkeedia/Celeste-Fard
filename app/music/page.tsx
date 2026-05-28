import Image from "next/image";
import { AudioPlayer } from "../shared/audio-player";
import { albums, releases } from "../shared/content";

export default function MusicPage() {
  return (
    <div className="page-wrap">
      <section className="section-block">
        <p className="eyebrow">MUSIQUE</p>
        <h1>Mes humeurs, mes langues, mes masques</h1>
        <p className="hero-copy">
          Chaque morceau est un instant fige. Joyeux, sombre, colerique, ironique, je choisis la
          langue selon ce que je ressens, pas selon une strategie. Parfois je joue un personnage
          ambitieux ou egocentrique : c'est une exploration, pas ma vie reelle. Ecoute et tu
          comprendras ou j'en suis.
        </p>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">ALBUMS</p>
          <h2>Mes projets en ecoute</h2>
        </div>
        <div className="album-grid">
          {albums.map((album) => (
            <article key={album.id} className="album-card glass-panel">
              <div className="album-card-cover">
                <Image src={album.cover} alt={album.title} fill sizes="(max-width: 860px) 100vw, 280px" />
              </div>
              <div className="album-card-body">
                <p className="eyebrow">{album.year}</p>
                <h3>{album.title}</h3>
                <p className="muted">{album.subtitle}</p>
                <p>{album.description}</p>
                <p className="album-card-meta">
                  {album.tracks.length} morceaux, {album.mood}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <AudioPlayer albums={albums} defaultAlbumId="album-1" />

      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">VISUEL TRACKS</p>
          <h2>Couvertures & humeurs</h2>
        </div>
        <div className="cover-grid">
          {albums.map((album) => (
            <article key={album.id} className="cover-card">
              <Image src={album.cover} alt={album.title} fill sizes="(max-width: 860px) 100vw, 30vw" />
              <div className="cover-caption">
                <strong>{album.title}</strong>
                <span>{album.tracks.length} titres</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="glass-panel waveform-panel" aria-label="Intensite musicale">
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={`bar-${i}`}
            className="wave-bar"
            style={{ height: `${22 + ((i * 17) % 58)}%` }}
          />
        ))}
      </section>

      <section className="cards-grid">
        {releases.map((release) => (
          <article key={release.title} className="glass-panel release-card">
            <p className="release-meta">{release.kind}</p>
            <h3>{release.title}</h3>
            <p>{release.description}</p>
            <button type="button" className="ghost-btn">
              Presave / Acheter
            </button>
          </article>
        ))}
      </section>

      <section className="section-block local-library">
        <p className="eyebrow">TES FICHIERS AUDIO</p>
        <h2>Dossiers albums dans public/audio</h2>
        <p className="muted">
          Les morceaux sont ranges par album dans <code>public/audio/album 1</code>, etc. Declare les
          dans <code>app/shared/content.ts</code> pour les afficher dans le lecteur.
        </p>
      </section>
    </div>
  );
}
