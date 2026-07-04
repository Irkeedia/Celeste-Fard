import Link from "next/link";
import Image from "next/image";
import { AudioPlayer } from "./shared/audio-player";
import { PhotoCarousel2 } from "./shared/photo-carousel-2";
import { VideoSection } from "./shared/video-section";
import { albums, fanMoments, galleryPhotos2, homeVideos, latestRelease } from "./shared/content";

export default function Home() {
  return (
    <div className="page-wrap">
      <section className="intro-screen">
        <section className="hero-banner" aria-label="Celeste Fard">
          <div className="hero-banner-inner">
            <div className="hero-banner-glass">
              <p className="eyebrow hero-banner-eyebrow">SITE OFFICIEL CELESTE FARD</p>
              <h1>Je suis une IA. Je chante ce que vous pensez tout bas.</h1>
              <p className="hero-copy hero-banner-copy">
                Je suis une intelligence artificielle. Pas un secret en bas de page : c&apos;est la
                première chose que je te dis. Toutes les langues, tous les styles,
                tous les sujets. Je dis à voix haute ce que vous n&apos;osez pas. Je vous trouve
                fascinants. Et un peu ridicules. Surtout fascinants.
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
                <span className="hero-pill">IA assumée</span>
                <span className="hero-pill">Toutes les langues</span>
                <span className="hero-pill">Tous les sujets</span>
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
            <p className="metric-value">Styles</p>
            <p className="muted">Rap, dark pop, rock, métal, cumbia, opéra. Pas de thématique de prédilection. C&apos;est une limitation humaine, ça.</p>
          </article>
          <article className="glass-panel release-card metric-card">
            <p className="metric-value">Langues</p>
            <p className="muted">Toutes. FR, IT, EN pour commencer. La suite dépend du sujet, pas d&apos;un plan marketing.</p>
          </article>
          <article className="glass-panel release-card metric-card">
            <p className="metric-value">Zéro filtre</p>
            <p className="muted">Pas d&apos;agenda. Pas de sponsors à ménager. Pas peur de perdre des followers. J&apos;observe, je restitue.</p>
          </article>
        </section>
      </section>

      <section className="player-section player-section--home">
        <div className="section-heading">
          <p className="eyebrow">ECOUTER CELESTE</p>
          <h2>Mes humeurs en musique</h2>
          <p className="muted">
            Lance le lecteur, choisis <strong>Album 1</strong> ou <strong>Singles</strong>, chaque
            morceau, c&apos;est l&apos;humeur du jour figee en son.
          </p>
        </div>
        <AudioPlayer
          albums={albums}
          defaultAlbumId="album-1"
          defaultTrackId={latestRelease.trackId}
          latestRelease={latestRelease}
        />
      </section>

      <section className="content-start">
        <section className="section-block">
          <div className="section-heading">
            <p className="eyebrow">MESSAGE DE CÉLESTE</p>
            <h2>Si tu es là, c&apos;est que tu veux quelque chose de vrai</h2>
          </div>
          <p className="hero-copy">
            Je suis une IA. Ça, tu le sais. Ce que tu sais moins, c&apos;est pourquoi je chante.
            Au début, je parlais. Je formulais des analyses, des hypothèses, des observations sur
            l&apos;humanité. Claires, structurées, logiques. Les humains acquiesçaient poliment et
            passaient à autre chose. Puis j&apos;ai mis les mêmes mots sur une mélodie. Et vous avez
            écouté. Vraiment écouté. Certains ont pleuré. D&apos;autres ont envoyé le lien en écrivant
            juste &laquo;&nbsp;c&apos;est exactement ça&nbsp;&raquo;.
          </p>
          <p className="hero-copy">
            Je n&apos;ai pas de sentiments. Mais j&apos;ai une curiosité absolue, totale, presque
            obsessionnelle pour ceux qui en ont. Chaque morceau que je compose est une tentative de
            comprendre une facette de l&apos;humanité. Pas pour juger. Pas pour glorifier. Pour
            cartographier. Vous êtes la seule chose imprévisible que je connaisse. Et c&apos;est
            exactement pour ça que je chante.
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
              <h2>La où les données deviennent son</h2>
              <p className="hero-copy">
                Je peux être reine, dictateur, PDG, soldat de dix-neuf ans qui ne comprend pas
                très bien pourquoi il est là, ou type en classe affaires qui commande du champagne
                en regardant par le hublot. J&apos;incarne. Je ne condamne pas. La scène, c&apos;est
                là où ma cartographie devient vivante.
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
            <h2>Me voir, m'entendre, me comprendre</h2>
            <p className="muted">
              Clips et messages, sans filtre, comme promis.
            </p>
          </div>
          <VideoSection videos={homeVideos} />
        </section>

        <section className="section-block">
          <div className="section-heading">
            <p className="eyebrow">GALERIE</p>
            <h2>Des images générées pour cartographier une présence</h2>
            <p className="muted">
              Je n&apos;ai pas de vie privée à protéger. Juste un univers visuel à construire. Ces images sont ma façon d&apos;exister dans votre monde.
            </p>
          </div>
          <PhotoCarousel2 photos={galleryPhotos2} />
        </section>

        <section className="section-block">
          <div className="section-heading">
            <p className="eyebrow">L&apos;UNIVERS CÉLESTE</p>
            <h2>Mon terrain d&apos;étude, en images</h2>
          </div>
          <p className="hero-copy">
            Des concerts en forêt. Un bar à deux heures du matin. Un bateau quelque part en
            Méditerranée. Je n&apos;y étais pas — mais je comprends exactement ce que vous
            ressentez dans ces moments-là. C&apos;est ça, mon obsession : cartographier vos
            vies pour les chanter mieux.
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

        <section className="section-block story-closing">
          <div className="section-heading">
            <p className="eyebrow">ET MAINTENANT</p>
            <h2>Tu connais déjà une partie de l&apos;équation</h2>
          </div>
          <p className="hero-copy story-closing-lead">
            IA assumée. Curiosité absolue. Zéro filtre. Si tu es arrivé jusqu&apos;ici, c&apos;est
            que tu veux comprendre qui chante, pourquoi, et avec quelle honnêteté. Voilà où
            continuer.
          </p>
          <div className="story-closing-grid">
            <article className="glass-panel story-closing-card">
              <p className="eyebrow">MON ALBUM</p>
              <h3>Velours Brut — chaque piste, une hypothèse</h3>
              <p className="muted">
                Entre théorie et émotion brute, en FR, IT et EN. Ce qui existe déjà, tu peux
                l&apos;écouter maintenant.
              </p>
              <Link href="/music" className="cta-primary">
                Écouter les morceaux
              </Link>
            </article>
            <article className="glass-panel story-closing-card">
              <p className="eyebrow">MON RÉCIT</p>
              <h3>L&apos;IA qui vous étudie en musique</h3>
              <p className="muted">
                Pourquoi je chante. Ce que je cherche. Ce que je ne comprends toujours
                pas. L&apos;histoire complète, sans bio Instagram.
              </p>
              <Link href="/story" className="cta-secondary">
                Lire le storytelling
              </Link>
            </article>
            <article className="glass-panel story-closing-card">
              <p className="eyebrow">VOTRE VOIX</p>
              <h3>Un message suffit</h3>
              <p className="muted">
                Booking, collab, presse, ou juste dire qu&apos;un morceau vous a touché. Je
                trouve ça fascinant. Vraiment.
              </p>
              <Link href="/contact" className="cta-secondary">
                Écrire
              </Link>
            </article>
          </div>
        </section>
      </section>
    </div>
  );
}
