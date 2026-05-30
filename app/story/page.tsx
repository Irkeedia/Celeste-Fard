import Image from "next/image";
import { galleryPhotos2 } from "../shared/content";

const storyImage = (file: string) => `/image/page story/${file}`;

const chapterOne = {
  index: "01",
  eyebrow: "Chapitre 01",
  title: "La science et la voix",
  body: "Le matin, j'analyse des systemes. Le soir, j'enregistre ce que je ressens. Pour moi, un axiome et un refrain obeissent a la meme logique : ils decrivent une verite provisoire sur l'instant present. Ma musique, c'est ma facon de cartographier mes humeurs.",
  image: "/image/celesteprofilvert.png",
  alt: "Celeste en mode etudiante",
  caption: "Sciences · voix · etudiante",
  tags: ["Sciences", "Musique", "Voix"],
} as const;

const chapters = [
  {
    id: "jenny",
    index: "02",
    eyebrow: "Chapitre 02",
    title: "Ma soeur, mon ancrage",
    body: "Ma soeur Jenny, c'est la personne pour qui je vis. On partage tout, les doutes, les fous rires, les gâteaux qu'on avait promis de ne pas acheter. Quand le monde devient trop bruyant, c'est elle. Toujours elle.",
    image: storyImage("celestechats.png"),
    alt: "Celeste a la maison, moment de douceur",
  },
  {
    id: "masques",
    index: "03",
    eyebrow: "Chapitre 03",
    title: "Les masques de la musique",
    body: "Dans mes morceaux, je deviens parfois une entrepreneuse ambitieuse, une philosophe acide ou une egocentrique assumee. Ce ne sont pas mes factures ni ma personnalite reelle : ce sont des explorations. Des personnages que j'habite pour comprendre l'ame humaine, y compris la mienne.",
    image: storyImage("celestecontratserieuse.png"),
    alt: "Celeste serieuse, le masque de l'ambitieuse",
  },
] as const;

const paradoxes = [
  {
    tag: "Photo",
    title: "J'adore shooter, je deteste etre shootee",
    body: "Toutes ces images sur le site ? Mon paradoxe prefere, assume avec autoderision.",
  },
  {
    tag: "Scene",
    title: "Le verre n'est presque jamais realite",
    body: "Je bois tres peu. Si tu me vois avec un verre, c'est une scene, une blague, ou un moment rare.",
  },
  {
    tag: "Gourmandise",
    title: "Diete anti sucre, combat perdant",
    body: "J'adore les gâteaux. Je l'assume publiquement, sans filtre Instagram.",
  },
  {
    tag: "Evasion",
    title: "Bateau = survie mentale, pas yacht",
    body: "Mes escapades en Italie ou en Angleterre, ce n'est pas le luxe. C'est respirer. J'en ris, c'est plus honnete.",
  },
] as const;

export default function StoryPage() {
  return (
    <div className="page-wrap story-page">
      <section className="story-hero" aria-label="Introduction story Celeste Fard">
        <div className="story-hero-visual">
          <Image
            src={storyImage("celestecheveuxcoiffure.png")}
            alt="Celeste Fard, portrait story"
            fill
            priority
            sizes="(max-width: 860px) 100vw, 1160px"
            className="story-hero-photo"
          />
          <div className="story-hero-scrim" aria-hidden="true" />
        </div>
        <div className="story-hero-content">
          <p className="eyebrow story-hero-eyebrow">Storytelling</p>
          <h1>
            Moi c&apos;est Celeste. 25 ans, rousse naturelle, et je ne joue pas a etre quelqu&apos;un
            d&apos;autre.
          </h1>
          <p className="story-hero-lead">
            J&apos;habite en France, mais mon coeur parle francais, italien et anglais, parfois les
            trois dans la meme journee. Etudiante en sciences le matin, chanteuse le soir : la
            physique quantique pour comprendre le monde, la musique pour ce que les equations ne
            disent pas.
          </p>
          <div className="story-hero-pills">
            <span className="hero-pill">Sciences</span>
            <span className="hero-pill">Musique</span>
            <span className="hero-pill">FR / IT / EN</span>
          </div>
        </div>
      </section>

      <section className="story-timeline" aria-label="Chapitres de mon histoire">
        <header className="story-section-intro">
          <p className="eyebrow">Mon fil rouge</p>
          <h2>Trois chapitres, une seule voix</h2>
          <p className="muted">
            Entre laboratoire, scene et vie reelle, voila comment je raconte qui je suis vraiment.
          </p>
        </header>

        <section className="story-feature-section" aria-label={chapterOne.title}>
          <div className="story-feature-section-inner">
            <div className="story-feature-copy">
              <p className="story-feature-number" aria-hidden="true">
                {chapterOne.index}
              </p>
              <p className="eyebrow">{chapterOne.eyebrow}</p>
              <h2>{chapterOne.title}</h2>
              <p className="story-feature-lead">{chapterOne.body}</p>
              <ul className="story-feature-list">
                {chapterOne.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>

            <figure className="story-feature-portrait">
              <div className="story-feature-frame">
                <Image
                  src={chapterOne.image}
                  alt={chapterOne.alt}
                  fill
                  sizes="(max-width: 860px) 72vw, 280px"
                />
              </div>
              <figcaption>{chapterOne.caption}</figcaption>
            </figure>
          </div>
        </section>

        {chapters.map((chapter, index) => (
          <article
            key={chapter.id}
            className={`story-chapter ${index % 2 === 1 ? "is-reverse" : ""}`}
          >
            <div className="story-chapter-visual">
              <span className="story-chapter-index" aria-hidden="true">
                {chapter.index}
              </span>
              <div className="story-chapter-image">
                <Image src={chapter.image} alt={chapter.alt} fill sizes="(max-width: 860px) 100vw, 50vw" />
              </div>
            </div>
            <div className="story-chapter-copy">
              <p className="eyebrow">{chapter.eyebrow}</p>
              <h3>{chapter.title}</h3>
              <p>{chapter.body}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="story-feature-section" aria-label="Sport avec Jenny">
        <div className="story-feature-section-inner">
          <div className="story-feature-copy">
            <p className="story-feature-number" aria-hidden="true">
              04
            </p>
            <p className="eyebrow">Jenny &amp; moi</p>
            <h2>Le sport, notre passion commune</h2>
            <p className="story-feature-lead">
              Ma soeur et moi, on ne partage pas que les gâteaux et les fous rires. On partage aussi
              le sport : courir, bouger, se challenger. C&apos;est notre rituel a deux, sans audience,
              sans filtre.
            </p>
            <p>
              Quand la tete tourne trop vite entre les cours, les morceaux et les paradoxes, on enfile
              nos baskets. La foret, le sentier, le souffle : c&apos;est la ou on se retrouve vraiment.
              Pas besoin de parler longtemps, le rythme suffit.
            </p>
            <ul className="story-feature-list">
              <li>Course &amp; cardio</li>
              <li>Defis a deux</li>
              <li>Deconnexion totale</li>
            </ul>
          </div>

          <figure className="story-feature-portrait">
            <div className="story-feature-frame">
              <Image
                src={storyImage("celestejogsforet.png")}
                alt="Celeste en course en foret"
                fill
                sizes="(max-width: 860px) 72vw, 280px"
              />
            </div>
            <figcaption>Sport · complicite · Jenny &amp; moi</figcaption>
          </figure>
        </div>
      </section>

      <section className="story-paradoxes" aria-label="Paradoxes assumes">
        <header className="story-section-intro">
          <p className="eyebrow">Paradoxes assumes</p>
          <h2>Ce que tu vois ici, et ce que je vis vraiment</h2>
          <p className="muted">Pas de glamour factice. Juste ma vraie complexite, sans filtre.</p>
        </header>
        <div className="story-paradox-grid">
          {paradoxes.map((item) => (
            <article key={item.tag} className="story-paradox-card">
              <span className="story-paradox-tag">{item.tag}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="story-manifesto" aria-label="Manifeste">
        <p className="story-manifesto-quote" aria-hidden="true">
          &ldquo;
        </p>
        <p className="eyebrow">Manifeste</p>
        <h2>Je chante selon mon humeur. Point.</h2>
        <p>
          Colere ? Je choisis la langue qui porte le mieux la tension. Joie ? Le morceau devient
          leger. Sombre ? Pas de filtre. Je ne cherche pas qu&apos;on m&apos;aime pour mon image, je
          veux qu&apos;on me comprenne dans ma complexite. Entre la froideur des concepts quantiques
          et la chaleur de l&apos;affection humaine, il y a ma voix.
        </p>
        <span className="story-manifesto-signature">Celeste Fard</span>
      </section>

      <section className="story-moodboard" aria-label="Moodboard photos">
        <header className="story-section-intro">
          <p className="eyebrow">Moodboard</p>
          <h2>Des photos que je deteste et que j&apos;ai quand meme choisies</h2>
        </header>
        <div className="story-moodboard-grid">
          {galleryPhotos2.slice(0, 4).map((photo, index) => (
            <article
              key={photo.src}
              className={`story-gallery-card story-gallery-card--${index + 1}`}
            >
              <Image src={photo.src} alt={photo.title} fill sizes="(max-width: 860px) 100vw, 30vw" />
              <span className="story-gallery-caption">{photo.title}</span>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
