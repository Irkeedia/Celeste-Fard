import Link from "next/link";
import Image from "next/image";
import { AudioPlayer } from "./shared/audio-player";
import { PhotoCarousel2 } from "./shared/photo-carousel-2";
import { VideoSection } from "./shared/video-section";
import { albums, fanMoments, galleryPhotos2, homeVideos, releases } from "./shared/content";

export default function Home() {
  return (
    <div className="page-wrap">
      <section className="intro-screen">
        <section className="hero-section">
          <div className="hero-layout">
            <div>
              <p className="eyebrow">SITE OFFICIEL - CELESTE FARD</p>
              <h1>Celeste Fard — 25 ans, rousse, etudiante en sciences, chanteuse le soir.</h1>
              <p className="hero-copy">
                Bienvenue dans mon univers. Ici tu trouves mes morceaux, mes humeurs en trois langues,
                mes paradoxes assumes et zero filtre. Je suis franco-italo-anglaise dans l ame — et
                entierement moi dans chaque note.
              </p>
              <div className="hero-actions">
                <Link href="/music" className="cta-primary">
                  Ecouter mes chansons
                </Link>
                <Link href="/story" className="cta-secondary">
                  Decouvrir mon histoire
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
                  <span className="hero-pill">Sciences & voix</span>
                  <span className="hero-pill">Rap pop sombre</span>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="cards-grid intro-metrics">
          <article className="glass-panel release-card metric-card">
            <p className="metric-value">Humeurs</p>
            <p className="muted">Chaque morceau = l instant exact ou je l ai ecrit</p>
          </article>
          <article className="glass-panel release-card metric-card">
            <p className="metric-value">Langues</p>
            <p className="muted">FR, IT ou EN — selon ce que je ressens, pas selon un plan marketing</p>
          </article>
          <article className="glass-panel release-card metric-card">
            <p className="metric-value">Vrai moi</p>
            <p className="muted">Pas de luxe, des gâteaux, de la science, ma soeur, et de l autoderision</p>
          </article>
        </section>
      </section>

      <section className="content-start">
        <section className="section-block">
          <div className="section-heading">
            <p className="eyebrow">LETTRE DE CELESTE</p>
            <h2>Si tu es la, c est que tu veux le vrai moi</h2>
          </div>
          <p className="hero-copy">
            Je m appelle Celeste, j ai 25 ans, des cheveux roux naturels et une tete pleine de
            formules quantiques. Le jour je theorise le monde ; le soir je le chante. Ma musique
            n est pas un produit : c est un miroir. Joyeuse, je fais du leger. En colere, je choisis
            la langue qui porte le mieux ma rage. Sombre, je ne filtre rien. C est ma transparence
            radicale — je suis comme ca, on ne me changera pas.
          </p>
          <p className="hero-copy">
            Je ne suis pas riche. Pas de yacht, pas de garde-robe de star — juste de la necessite,
            de l humour, et une soeur nommee Jenny qui est mon point fixe dans l univers. Dans mes
            chansons, parfois je joue une ambitieuse ou une egocentrique : ce sont des masques
            d exploration, pas ma vie reelle. Ce site, c est l espace ou tu peux me suivre sans
            filtre — gâteaux, echecs de diete, photos que je deteste mais que je partage quand meme.
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
              <h2>La ou mes humeurs deviennent son</h2>
              <p className="hero-copy">
                Sur scene, je ne joue pas un personnage marketing. Je vis le morceau — colere,
                tendresse, ironie, tout ce que j ai ressenti en l ecrivant. C est le seul endroit
                ou ma lucidite de scientifique et mon innocence apparente se rencontrent sans
                contradiction.
              </p>
              <Link href="/music" className="cta-primary">
                Ecouter mes morceaux
              </Link>
            </div>
          </div>
        </section>

        <section className="section-block video-section">
          <div className="section-heading">
            <p className="eyebrow">CELESTE EN VIDEO</p>
            <h2>Me voir, m entendre, me comprendre</h2>
            <p className="muted">
              Clips et messages — sans filtre, comme promis.
            </p>
          </div>
          <VideoSection videos={homeVideos} />
        </section>

        <section className="section-block">
          <div className="section-heading">
            <p className="eyebrow">GALERIE</p>
            <h2>Des images que je deteste partager (mais que j assume)</h2>
            <p className="muted">
              J adore photographier. Etre photographiee, beaucoup moins. Pourtant tu les trouveras ici — c est mon paradoxe prefere.
            </p>
          </div>
          <PhotoCarousel2 photos={galleryPhotos2} />
        </section>

        <section className="section-block">
          <div className="section-heading">
            <p className="eyebrow">LIEN AVEC CELESTE</p>
            <h2>Ma vie, sans filtre</h2>
          </div>
          <p className="hero-copy">
            Pas de vitrine parfaite : des concerts en foret, des blagues au bar, des escapades en
            bateau qui sont ma survie mentale (pas un signe de richesse — j en ris a chaque fois).
            Tu es invite dans mon quotidien reel, celui avec Jenny, les gâteaux, et les theories
            quantiques a minuit.
          </p>
          <div className="fan-moment-grid">
            {fanMoments.map((moment) => (
              <article key={moment.title} className="fan-moment-card">
                <div className="fan-image-wrap">
                  <Image
                    src={moment.image}
                    alt={moment.title}
                    fill
                    unoptimized
                    sizes="(max-width: 860px) 100vw, 30vw"
                  />
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
            <h2>Mes humeurs en musique</h2>
            <p className="muted">
              Choisis <strong>Album 1</strong> ou <strong>Singles</strong> — chaque morceau, c est
              l humeur du jour figee en son.
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
            <h3>Mes dates</h3>
            <p className="muted">Showcases intimes — la ou tu peux vraiment me rencontrer, pas une version edulcoree.</p>
            <button type="button" className="ghost-btn">
              Voir les dates
            </button>
          </article>
          <article className="glass-panel release-card">
            <p className="eyebrow">FAN CLUB</p>
            <h3>Mon cercle proche</h3>
            <p className="muted">Demos brutes, voix notes sinceres, et les morceaux avant tout le monde.</p>
            <button type="button" className="ghost-btn">
              Rejoindre la liste VIP
            </button>
          </article>
          <article className="glass-panel release-card">
            <p className="eyebrow">BOOKING & PRESSE</p>
            <h3>Contact direct</h3>
            <p className="muted">Booking, presse, collabs — ecris-moi, je lis ce qui me parle vraiment.</p>
            <Link href="/contact" className="cta-primary">
              Me contacter
            </Link>
          </article>
        </section>
      </section>
    </div>
  );
}
