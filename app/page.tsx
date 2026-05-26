import Link from "next/link";
import Image from "next/image";
import { AudioPlayer } from "./shared/audio-player";
import { PhotoCarousel2 } from "./shared/photo-carousel-2";
import { VideoSection } from "./shared/video-section";
import { albums, fanMoments, galleryPhotos2, homeVideos } from "./shared/content";

export default function Home() {
  return (
    <div className="page-wrap">
      <section className="intro-screen">
        <section className="hero-banner" aria-label="Celeste Fard">
          <div className="hero-banner-inner">
            <div className="hero-banner-glass">
              <p className="eyebrow hero-banner-eyebrow">SITE OFFICIEL CELESTE FARD</p>
              <h1>Rap, dark pop, rock, et tout ce que j ose essayer ensuite.</h1>
              <p className="hero-copy hero-banner-copy">
                Celeste Fard, 25 ans, rousse naturelle (oui oui, au naturel, je le jure), etudiante
                en sciences le jour, voix le soir. Mon socle : le rap, la dark pop et le rock. Mais
                j adore apprendre, fouiller de nouveaux styles, me tromper, recommencer. Un jour tu
                m entendras peut etre en mode diva... ou pas. (On verra.)
              </p>
              <div className="hero-actions">
                <Link href="/music" className="cta-primary">
                  Ecouter mes chansons
                </Link>
                <Link href="/story" className="cta-secondary">
                  Decouvrir mon histoire
                </Link>
              </div>
              <div className="hero-banner-pills">
                <span className="hero-pill">Rap</span>
                <span className="hero-pill">Dark pop</span>
                <span className="hero-pill">Rock</span>
                <span className="hero-pill">FR / IT / EN</span>
              </div>
            </div>
            <div className="hero-banner-visual">
              <Image
                src="/image/Celestefardhero.png"
                alt="Celeste Fard"
                fill
                priority
                sizes="(max-width: 860px) 100vw, 480px"
                className="hero-banner-photo"
              />
            </div>
          </div>
        </section>

        <section className="cards-grid intro-metrics">
          <article className="glass-panel release-card metric-card">
            <p className="metric-value">Mes styles</p>
            <p className="muted">Rap, dark pop, rock, et j adore explorer de nouveaux sons sans filet.</p>
          </article>
          <article className="glass-panel release-card metric-card">
            <p className="metric-value">Langues</p>
            <p className="muted">FR, IT ou EN, selon ce que je ressens, pas selon un plan marketing</p>
          </article>
          <article className="glass-panel release-card metric-card">
            <p className="metric-value">Prochaine era</p>
            <p className="muted">Diva un jour ? Peut etre. En attendant j apprends, j teste, je rigole.</p>
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
            Je m appelle Celeste, j ai 25 ans, des cheveux roux naturels, et j en rigole encore
            quand on me demande si c est ma vraie couleur. Le jour je theorise le monde ; le soir
            je le chante. Ma musique
            n est pas un produit : c est un miroir. Joyeuse, je fais du leger. En colere, je choisis
            la langue qui porte le mieux ma rage. Sombre, je ne filtre rien. C est ma transparence
            radicale, je suis comme ca, on ne me changera pas.
          </p>
          <p className="hero-copy">
            Je ne suis pas riche. Pas de yacht, pas de garde robe de star, juste de la necessite,
            de l humour, et une soeur nommee Jenny qui est mon point fixe dans l univers. Dans mes
            chansons, parfois je joue une ambitieuse ou une egocentrique : ce sont des masques
            d exploration, pas ma vie reelle. Ce site, c est l espace ou tu peux me suivre sans
            filtre, gâteaux, echecs de diete, photos que je deteste mais que je partage quand meme.
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
                Sur scene, je ne joue pas un personnage marketing. Je vis le morceau, colere,
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
              Clips et messages, sans filtre, comme promis.
            </p>
          </div>
          <VideoSection videos={homeVideos} />
        </section>

        <section className="section-block">
          <div className="section-heading">
            <p className="eyebrow">GALERIE</p>
            <h2>Des images que je deteste partager (mais que j assume)</h2>
            <p className="muted">
              J adore photographier. Etre photographiee, beaucoup moins. Pourtant tu les trouveras ici, c est mon paradoxe prefere.
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
            bateau qui sont ma survie mentale (pas un signe de richesse, j en ris a chaque fois).
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
              Choisis <strong>Album 1</strong> ou <strong>Singles</strong>, chaque morceau, c est
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

        <section className="section-block story-closing">
          <div className="section-heading">
            <p className="eyebrow">ET MAINTENANT</p>
            <h2>Tu connais deja une partie de moi</h2>
          </div>
          <p className="hero-copy story-closing-lead">
            Si tu es arrive jusqu ici, ce n est pas pour remplir un panier. C est pour comprendre
            qui chante, pourquoi, et avec quelle honnetete. Voila ou continuer l histoire.
          </p>
          <div className="story-closing-grid">
            <article className="glass-panel story-closing-card">
              <p className="eyebrow">MON ALBUM</p>
              <h3>Velours Brut, en cours d ecriture</h3>
              <p className="muted">
                Mes theories scientifiques et mes emotions se rencontrent sans filtre. Ce qui existe
                deja, tu peux l ecouter maintenant.
              </p>
              <Link href="/music" className="cta-primary">
                Ecouter mes morceaux
              </Link>
            </article>
            <article className="glass-panel story-closing-card">
              <p className="eyebrow">MON RECIT</p>
              <h3>Jenny, les paradoxes, les cheveux roux</h3>
              <p className="muted">
                L histoire complete : la science le matin, la voix le soir, et tout ce que je n
                mets pas dans une bio Instagram.
              </p>
              <Link href="/story" className="cta-secondary">
                Lire mon storytelling
              </Link>
            </article>
            <article className="glass-panel story-closing-card">
              <p className="eyebrow">TA VOIX</p>
              <h3>Un message suffit</h3>
              <p className="muted">
                Booking, collab, presse, ou juste me dire qu un morceau t a touche. Je lis ce qui
                est sincere.
              </p>
              <Link href="/contact" className="cta-secondary">
                Ecris moi
              </Link>
            </article>
          </div>
        </section>
      </section>
    </div>
  );
}
