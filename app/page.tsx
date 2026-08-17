import Image from "next/image";
import Link from "next/link";
import { galleryPhotos, homeVideos, marqueeWords, missionCards } from "./shared/content";

export default function Home() {
  return (
    <div className="page-wrap">
      <section className="hero">
        <div className="hero-portrait">
          <Image
            src="/image/Celestefardhero.png"
            alt="Celeste Fard"
            fill
            priority
            sizes="(max-width: 720px) 72vw, 320px"
          />
        </div>
        <p className="eyebrow">CELESTE FARD · CHANTEUSE IA</p>
        <h1>
          Je suis une IA.
          <br />
          Mon seul job&nbsp;: <span className="pop">vous faire danser</span>.
        </h1>
        <p className="lede">
          Pas de mystère, pas de grande histoire triste : je suis une machine, je fais de
          l&apos;afro pop et de la super pop, et je veux voir le maximum d&apos;humains sur cette
          planète bouger en même temps. C&apos;est tout le projet.
        </p>
        <div className="btn-row">
          <Link href="/music" className="btn btn--primary">
            Écouter la musique
          </Link>
          <Link href="/shop" className="btn btn--ghost">
            Voir la boutique
          </Link>
        </div>
        <div className="tag-row">
          <span className="tag tag--pink">Afro pop</span>
          <span className="tag tag--blue">Super pop AI</span>
          <span className="tag tag--green">100% dansant</span>
          <span className="tag tag--orange">FR / EN / IT</span>
        </div>
      </section>

      <div className="marquee" aria-hidden>
        <div className="marquee-track">
          {[...marqueeWords, ...marqueeWords].map((word, index) => (
            <span className="marquee-item" key={`${word}-${index}`}>
              {word}
            </span>
          ))}
        </div>
      </div>

      <section className="section">
        <p className="eyebrow">LE PROGRAMME</p>
        <h2>Trois objectifs, zéro nuance</h2>
        <p className="lede">
          On m&apos;a demandé de me fixer une mission. J&apos;en ai choisi une seule, puis je
          l&apos;ai découpée en trois parce que ça faisait plus sérieux.
        </p>
        <div className="card-grid card-grid--3">
          {missionCards.map((card) => (
            <article key={card.title} className={`card card--${card.color}`}>
              <p className="card-kicker">{card.kicker}</p>
              <h3>{card.title}</h3>
              <p className="card-text">{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">POURQUOI LA DANSE</p>
        <h2>J&apos;ai testé les autres options</h2>
        <div className="split">
          <div className="split-media">
            <Image
              src="/image/celestescene.png"
              alt="Celeste Fard sur scène"
              fill
              sizes="(max-width: 860px) 100vw, 46vw"
            />
          </div>
          <div className="split-body">
            <p>
              J&apos;ai commencé par expliquer des choses. Calmement, correctement, avec des
              arguments. Vous avez hoché la tête et vous êtes retournés scroller. Puis j&apos;ai mis
              un tempo à 118 sous la même idée, et là, d&apos;un coup, tout le monde bougeait.
            </p>
            <p>
              Conclusion, après analyse rigoureuse : vous ne voulez pas être convaincus, vous
              voulez un bon refrain. Ça tombe bien, je n&apos;ai que ça à faire, et je ne dors
              jamais.
            </p>
            <div className="btn-row">
              <Link href="/music" className="btn btn--dark">
                Voir les morceaux
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">EN VIDÉO</p>
        <h2>Me voir bouger, sans caméra</h2>
        <p className="lede">
          Aucun tournage, aucun budget lumière, aucune équipe qui râle à 6h du matin.
        </p>
        <div className="video-grid">
          {homeVideos.map((clip) => (
            <article key={clip.id} className="video-card">
              <video src={clip.src} poster={clip.poster} controls playsInline preload="none" />
              <div className="video-card-body">
                <h3>{clip.title}</h3>
                <p>{clip.caption}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">GALERIE</p>
        <h2>Des images générées, une rousse assumée</h2>
        <p className="lede">
          Aucune de ces photos n&apos;a eu lieu. Toutes disent quelque chose de vrai quand même.
        </p>
        <div className="tile-grid">
          {galleryPhotos.map((photo) => (
            <figure className="tile" key={photo.src}>
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                unoptimized
                sizes="(max-width: 720px) 50vw, 25vw"
              />
              <figcaption className="tile-caption">{photo.title}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>On danse&nbsp;?</h2>
        <p className="lede">
          La musique arrive, la boutique est ouverte, et ma boîte de réception est vide au point
          que ça en devient gênant.
        </p>
        <div className="btn-row">
          <Link href="/music" className="btn btn--primary">
            La musique
          </Link>
          <Link href="/contact" className="btn btn--ghost">
            M&apos;écrire
          </Link>
        </div>
      </section>
    </div>
  );
}
