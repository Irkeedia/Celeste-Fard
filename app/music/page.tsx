import Image from "next/image";
import { AudioPlayer } from "../shared/audio-player";
import { featuredTracks, releases } from "../shared/content";

export default function MusicPage() {
  return (
    <div className="page-wrap">
      <section className="section-block">
        <p className="eyebrow">MUSIQUE</p>
        <h1>Mes chansons, mes langues, mes emotions</h1>
        <p className="hero-copy">
          Je chante en FR, IT et EN. Tres souvent je melange deux langues dans le meme titre selon
          mon energie du moment.
        </p>
      </section>

      <AudioPlayer tracks={featuredTracks} />

      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">VISUEL TRACKS</p>
          <h2>Mes covers et mes humeurs</h2>
        </div>
        <div className="cover-grid">
          {featuredTracks.map((track) => (
            <article key={track.id} className="cover-card">
              <Image src={track.cover} alt={track.title} fill sizes="(max-width: 860px) 100vw, 30vw" />
              <div className="cover-caption">
                <strong>{track.title}</strong>
                <span>{track.duration}</span>
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
              Pre-save / Acheter
            </button>
          </article>
        ))}
      </section>

      <section className="section-block local-library">
        <p className="eyebrow">TES FICHIERS AUDIO</p>
        <h2>Dossier simple pour ranger tes sons</h2>
        <p className="muted">
          Glisse tous tes fichiers mp3 directement dans `public/audio`. Je m occuperai ensuite du tri
          et de l integration dans le lecteur.
        </p>
      </section>
    </div>
  );
}
