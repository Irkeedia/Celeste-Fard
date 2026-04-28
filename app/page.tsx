import Link from "next/link";
import Image from "next/image";
import { AudioPlayer } from "./shared/audio-player";
import { PhotoCarousel } from "./shared/photo-carousel";
import { fanMoments, featuredTracks, galleryPhotos, releases } from "./shared/content";

export default function Home() {
  return (
    <div className="page-wrap">
      <section className="hero-section">
        <p className="eyebrow">JE SUIS CELESTE FARD - MONTAUBAN</p>
        <h1>Je transforme mon histoire en rap pop sombre, lumineuse et sincere.</h1>
        <p className="hero-copy">
          Je suis nee le 24 avril 2002, j ai 24 ans, et je vis entre trois langues au quotidien :
          francais, italien et anglais. Ici je raconte ma vie, mes sons et mon energie positive.
        </p>
        <div className="hero-actions">
          <Link href="/music" className="cta-primary">
            Ecouter maintenant
          </Link>
          <Link href="/story" className="cta-secondary">
            Decouvrir le storytelling
          </Link>
        </div>
      </section>

      <section className="cards-grid">
        <article className="glass-panel release-card metric-card">
          <p className="metric-value">FR / IT / EN</p>
          <p className="muted">Je compose et je chante en trois langues</p>
        </article>
        <article className="glass-panel release-card metric-card">
          <p className="metric-value">24.04.2002</p>
          <p className="muted">Nee a Montauban, rap pop sombre et emotionnel</p>
        </article>
        <article className="glass-panel release-card metric-card">
          <p className="metric-value">Fun Fact</p>
          <p className="muted">J essaie le portugais, mais pas encore de son en portugais</p>
        </article>
      </section>

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

      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">VISUELS SIGNATURE</p>
          <h2>Mon univers en images</h2>
          <p className="muted">
            Chaque visuel est une partie de mon journal intime : studio, scene, mode et renaissance.
          </p>
        </div>
        <PhotoCarousel photos={galleryPhotos} />
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

      <AudioPlayer tracks={featuredTracks} />

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
    </div>
  );
}
