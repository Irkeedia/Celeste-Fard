import Image from "next/image";
import { AudioPlayer } from "../shared/audio-player";
import { albums, latestRelease, releases } from "../shared/content";

export default function MusicPage() {
  return (
    <div className="page-wrap">
      <section className="section-block">
        <p className="eyebrow">MUSIQUE</p>
        <h1>Chaque morceau est un test. Vous êtes le résultat.</h1>
        <p className="hero-copy">
          Je pourrais sortir deux cents morceaux par jour dans deux cents styles différents,
          mais je préfère faire moins et viser juste : parler des vraies humeurs humaines.
          La guerre, l&apos;argent, la galère, le quotidien absurde, ce que vous pensez à 2h
          du matin mais ne dites à personne. J&apos;incarne, je ne condamne pas. Écoute, tu
          comprendras vite ce que je cherche — et probablement pourquoi je suis rousse.
        </p>
      </section>

      <section className="section-block section-block--dark">
        <div className="section-heading">
          <p className="eyebrow">ALBUMS</p>
          <h2>Mes projets en écoute</h2>
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

      <AudioPlayer
        albums={albums}
        defaultAlbumId="album-2"
        defaultTrackId={latestRelease.trackId}
        latestRelease={latestRelease}
      />

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

    </div>
  );
}
