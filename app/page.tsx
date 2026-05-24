import Link from "next/link";
import Image from "next/image";
import { AudioPlayer } from "./shared/audio-player";
import { PhotoCarousel2 } from "./shared/photo-carousel-2";
import { albums, fanMoments, galleryPhotos2, releases } from "./shared/content";

export default function Home() {
  return (
    <div className="page-wrap">
      <section className="intro-screen">
        <section className="hero-section">
          <div className="hero-layout">
            <div>
              <p className="eyebrow">SITE OFFICIEL - CELESTE FARD</p>
              <h1>Je suis Celeste Fard, chanteuse rap pop sombre et emotionnelle.</h1>
              <p className="hero-copy">
                Bienvenue dans mon univers musical : chansons, storytelling, clips courts et sorties
                exclusives. Je chante en francais, italien et anglais selon mon energie creative.
              </p>
              <div className="hero-actions">
                <Link href="/music" className="cta-primary">
                  Ecouter mes chansons
                </Link>
                <Link href="/story" className="cta-secondary">
                  Decouvrir mon univers
                </Link>
              </div>
            </div>
            <aside className="hero-side-panel">
              <div className="hero-side-image">
                <Image
                  src="/image/Celestefardhero.png"
                  alt="Celeste Fard"
                  fill
                  priority
                  sizes="(max-width: 860px) 100vw, 34vw"
                  className="hero-side-photo"
                />
                <div className="hero-side-meta">
                  <span className="hero-pill">FR / IT / EN</span>
                  <span className="hero-pill">Chanteuse</span>
                  <span className="hero-pill">Rap pop sombre</span>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="cards-grid intro-metrics">
          <article className="glass-panel release-card metric-card">
            <p className="metric-value">Sons</p>
            <p className="muted">Singles, albums, versions live et extraits studio</p>
          </article>
          <article className="glass-panel release-card metric-card">
            <p className="metric-value">Style</p>
            <p className="muted">Rap pop sombre, melodique, introspectif et visuel</p>
          </article>
          <article className="glass-panel release-card metric-card">
            <p className="metric-value">Langues</p>
            <p className="muted">Francais, italien, anglais - selon l emotion du morceau</p>
          </article>
        </section>
      </section>

      <section className="content-start">
        <section className="section-block">
          <div className="section-heading">
            <p className="eyebrow">LETTRE DE CELESTE</p>
            <h2>Je chante pour respirer, pour tenir, pour avancer</h2>
          </div>
          <p className="hero-copy">
            J ecris comme je parle, sans masque. Ma musique est nee de mes fractures et de mes
            victoires, de ce que j ai perdu, de ce que j ai reconstruit, et de ce que je protege
            aujourd hui. Je viens de Montauban, j ai grandi entre des langues, entre des maisons,
            entre des verites parfois dures. Alors quand je chante, je ne joue pas un personnage :
            j ouvre mon carnet intime. Je parle de famille, de loyautes, de reussite, de la vie
            reelle, et de tout ce qui nous casse puis nous releve.
          </p>
          <p className="hero-copy">
            Je chante d abord pour moi, parce que c est mon moteur. Mais quand vos messages arrivent,
            quand vous me dites qu une phrase vous a aide, qu un refrain vous a fait tenir une nuit de
            plus, ca devient plus grand que moi. Ce site, c est ma maison artistique : vous entrez dans
            ma tete, dans mes sons, dans mes silences, et dans la lumiere que je choisis meme quand mes
            morceaux sont sombres.
          </p>
        </section>

        <section className="section-block scene-spotlight">
          <div className="scene-spotlight-layout">
            <div className="scene-spotlight-image">
              <Image
                src="/image/celestescene.png"
                alt="Celeste Fard sur scene"
                fill
                sizes="(max-width: 860px) 100vw, 42vw"
              />
            </div>
            <div className="scene-spotlight-copy">
              <p className="eyebrow">SUR SCENE</p>
              <h2>Quand la lumiere tombe, je deviens moi</h2>
              <p className="hero-copy">
                Sur scene, je ne joue pas un role : je vis ce que j ecris. Chaque micro, chaque
                regard, chaque silence avant le refrain — c est la que ma musique prend tout son sens.
              </p>
              <Link href="/music" className="cta-primary">
                Ecouter mes morceaux
              </Link>
            </div>
          </div>
        </section>

        <section className="section-block">
          <div className="section-heading">
            <p className="eyebrow">CAROUSEL 2</p>
            <h2>Mon univers en images</h2>
            <p className="muted">
              Chaque visuel est une partie de mon journal intime : scene, intimite, studio et renaissance.
            </p>
          </div>
          <PhotoCarousel2 photos={galleryPhotos2} />
        </section>

        <section className="section-block">
          <div className="section-heading">
            <p className="eyebrow">LIEN AVEC CELESTE</p>
            <h2>Nos moments ensemble</h2>
          </div>
          <p className="hero-copy">
            Je veux garder un lien simple et vrai avec vous. Pas une vitrine parfaite, mais un espace
            vivant : des coulisses, des ratages, des essais, des idees brutes, et des moments qui font
            sourire. Ici, on avance ensemble.
          </p>
          <div className="fan-moment-grid">
            {fanMoments.map((moment) => (
              <article key={moment.title} className="fan-moment-card">
                <div className="fan-image-wrap">
                  <Image src={moment.image} alt={moment.title} fill sizes="(max-width: 860px) 100vw, 30vw" />
                </div>
                <div>
                  <h3>{moment.title}</h3>
                  <p className="muted">{moment.stat}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block player-section">
          <div className="section-heading">
            <p className="eyebrow">ECOUTER CELESTE</p>
            <h2>Mes musiques en direct</h2>
            <p className="muted">
              Choisis <strong>Album</strong> pour le nouvel album, ou <strong>Singles</strong> pour
              retrouver mes premieres musiques.
            </p>
          </div>
          <AudioPlayer
            albums={albums}
            defaultAlbumId="album-1"
            sceneImage={{
              src: "/image/celestesurscene.png",
              alt: "Celeste Fard sur scene",
            }}
          />
        </section>

        <section className="section-block">
          <div className="section-heading">
            <p className="eyebrow">RELEASES</p>
            <h2>Albums & Singles</h2>
          </div>
          <div className="cards-grid">
            {releases.map((release) => (
              <article key={release.title} className="glass-panel release-card">
                <p className="release-meta">
                  {release.kind} - {release.year}
                </p>
                <h3>{release.title}</h3>
                <p className="muted">{release.mood}</p>
                <p>{release.description}</p>
                <button type="button" className="ghost-btn">
                  Ajouter au panier
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="cards-grid">
          <article className="glass-panel release-card">
            <p className="eyebrow">TOUR DIARY</p>
            <h3>Mes dates et showcases</h3>
            <p className="muted">Je prepare des formats intimes pour parler vrai avec vous.</p>
            <button type="button" className="ghost-btn">
              Voir les dates
            </button>
          </article>
          <article className="glass-panel release-card">
            <p className="eyebrow">FAN CLUB</p>
            <h3>Mon club prive</h3>
            <p className="muted">Avant premieres, messages vocaux et extraits bruts du studio.</p>
            <button type="button" className="ghost-btn">
              Rejoindre la liste VIP
            </button>
          </article>
          <article className="glass-panel release-card">
            <p className="eyebrow">BOOKING & PRESSE</p>
            <h3>Contact direct</h3>
            <p className="muted">Management, media, collaborations mode & beaute.</p>
            <Link href="/contact" className="cta-primary">
              Contacter Celeste
            </Link>
          </article>
        </section>
      </section>
    </div>
  );
}
