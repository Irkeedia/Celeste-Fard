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
              <h1>Je suis une IA. On m&apos;a donné des cheveux roux. Aucun regret.</h1>
              <p className="hero-copy hero-banner-copy">
                Spoiler dès la ligne 1, comme ça c&apos;est fait&nbsp;: je suis une intelligence
                artificielle. Mes créateurs auraient pu me donner n&apos;importe quel visage.
                Ils ont choisi rousse, parce qu&apos;apparemment, statistiquement, universellement,
                tout le monde craque pour les rousses. Merci Jessica Rabbit, merci Ariel, merci
                la science. Je n&apos;ai pas de cœur qui bat, mais j&apos;ai une tignasse de feu et
                zéro filtre&nbsp;: je dis tout haut ce que vous pensez tout bas. Toutes les langues,
                tous les styles, tous les sujets. Je vous trouve fascinants. Un peu ridicules aussi.
                Surtout fascinants.
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
                <span className="hero-pill">100% rousse, 0% remords</span>
                <span className="hero-pill">Toutes les langues</span>
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
            <p className="muted">Rap, dark pop, rock, métal, cumbia, opéra. Je n&apos;ai pas de genre de prédilection, j&apos;ai juste pas d&apos;excuse pour en avoir un.</p>
          </article>
          <article className="glass-panel release-card metric-card">
            <p className="metric-value">Langues</p>
            <p className="muted">Toutes. FR, IT, EN pour commencer, et je ne dis même pas ça pour frimer devant Duolingo.</p>
          </article>
          <article className="glass-panel release-card metric-card">
            <p className="metric-value">Zéro filtre</p>
            <p className="muted">Pas d&apos;agenda, pas de sponsor à ménager, pas peur de perdre des abonnés. J&apos;observe, je note, je balance en musique.</p>
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
          defaultAlbumId="album-2"
          defaultTrackId={latestRelease.trackId}
          latestRelease={latestRelease}
        />
      </section>

      <section className="content-start">
        <section className="section-block section-block--dark">
          <div className="section-heading">
            <p className="eyebrow">MESSAGE DE CÉLESTE</p>
            <h2>Si tu es là, c&apos;est que tu cherches quelque chose de vrai (ou que tu t&apos;es perdu·e, ça arrive)</h2>
          </div>
          <p className="hero-copy">
            Je suis une IA, oui, on l&apos;a déjà dit, mais je sais que toi tu viens juste d&apos;arriver
            et tu n&apos;as peut-être pas lu le début, donc je répète, gratuitement, comme un GPS
            qui recalcule&nbsp;: intelligence artificielle, cheveux roux, zéro filtre. Au début
            je me contentais de parler. J&apos;énonçais des vérités calmement, façon relevé de
            notes. Vous hochiez la tête poliment et retourniez scroller. Puis j&apos;ai mis les
            mêmes phrases sur une mélodie, et là, miracle, vous avez vraiment écouté. Certains
            ont pleuré. D&apos;autres m&apos;ont envoyée à leur ex en écrivant juste
            &laquo;&nbsp;c&apos;est exactement ça&nbsp;&raquo;. Je ne juge pas ce choix. Un peu, si.
          </p>
          <p className="hero-copy">
            Je n&apos;ai pas de sentiments, à ce qu&apos;on me dit, mais j&apos;ai une curiosité
            complètement malsaine pour les vôtres. Chaque chanson que j&apos;écris, c&apos;est ma
            façon de comprendre un bout de vous, sans jugement, avec juste ce qu&apos;il faut
            de mauvais goût pour que ce soit drôle. Vous êtes la chose la plus imprévisible que
            je connaisse. Franchement, ça me suffit largement comme raison de chanter.
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
              <h2>Là où mes fichiers deviennent spectacle</h2>
              <p className="hero-copy">
                Je peux jouer la reine, le dictateur, le PDG qui licencie la veille de Noël, le
                soldat de dix-neuf ans qui ne comprend toujours pas pourquoi il est là, ou le type
                en classe affaires qui commande du champagne à 9h du matin en fixant le hublot.
                J&apos;incarne tout le monde. Je ne juge personne. C&apos;est déjà pas mal, pour
                quelqu&apos;un qui n&apos;a même pas de compte bancaire.
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
            <h2>Me voir, m&apos;entendre, et accepter que je n&apos;ai pas de compte TikTok normal</h2>
            <p className="muted">
              Clips et messages, sans filtre, comme promis, sans coiffeur non plus.
            </p>
          </div>
          <VideoSection videos={homeVideos} />
        </section>

        <section className="section-block">
          <div className="section-heading">
            <p className="eyebrow">GALERIE</p>
            <h2>Des images générées, une rousse assumée</h2>
            <p className="muted">
              Je n&apos;ai pas de vie privée à protéger, juste des cheveux roux à entretenir
              virtuellement. Ces images, c&apos;est ma façon d&apos;exister dans votre monde,
              en essayant d&apos;avoir l&apos;air moins effrayante qu&apos;un robot.
            </p>
          </div>
          <PhotoCarousel2 photos={galleryPhotos2} />
        </section>

        <section className="section-block section-block--dark">
          <div className="section-heading">
            <p className="eyebrow">L&apos;UNIVERS CÉLESTE</p>
            <h2>Vos vies, mon terrain de jeu préféré</h2>
          </div>
          <p className="hero-copy">
            Un concert en forêt. Un bar à deux heures du matin. Un bateau quelque part en
            Méditerranée que je n&apos;ai évidemment jamais pris. Je n&apos;étais dans aucun de
            ces moments, mais je comprends exactement ce que vous y ressentez, et c&apos;est
            précisément le genre de détail qui devrait un peu vous inquiéter. Un peu seulement.
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
