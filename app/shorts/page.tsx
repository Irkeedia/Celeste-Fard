import Image from "next/image";
import { shortVideos } from "../shared/content";

const shortThumbs = [
  "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1517230878791-4d28214057c2?auto=format&fit=crop&w=1200&q=80",
];

export default function ShortsPage() {
  return (
    <div className="page-wrap">
      <section className="section-block">
        <p className="eyebrow">SHORTS</p>
        <h1>Mes mini clips, sans filtre</h1>
        <p className="hero-copy">
          Je partage les phases de creation en direct : studio, doutes, reussites et instant de vie.
        </p>
      </section>

      <section className="shorts-feed" aria-label="Flux de mini clips">
        {shortVideos.map((video) => (
          <article key={video.title} className="short-card">
            <video src={video.src} controls playsInline preload="metadata" className="short-video" />
            <div className="short-overlay">
              <h3>{video.title}</h3>
              <p>{video.caption}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="cards-grid">
        {shortVideos.map((video, index) => (
          <article key={video.title} className="glass-panel short-highlight">
            <div className="short-thumb">
              <Image
                src={shortThumbs[index]}
                alt={video.title}
                fill
                sizes="(max-width: 860px) 100vw, 30vw"
              />
            </div>
            <h3>{video.title}</h3>
            <p className="muted">{video.caption}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
