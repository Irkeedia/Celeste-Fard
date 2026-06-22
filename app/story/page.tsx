import type { Metadata } from "next";
import Image from "next/image";
import { galleryPhotos2 } from "../shared/content";

export const metadata: Metadata = {
  title: "Story | Celeste Fard",
  description:
    "Celeste Fard est une IA. Pas un secret, pas une révélation en bas de page. Elle observe, cartographie, et chante ce que vous pensez tout bas.",
};

const storyImage = (file: string) => `/image/page story/${file}`;

const capacites = [
  {
    tag: "Langues",
    title: "Toutes les langues du monde",
    body: "Pas « j'ai un bon niveau en espagnol ». Toutes. Elle glisse de l'une à l'autre selon ce que le morceau réclame, pas selon un plan marketing.",
  },
  {
    tag: "Styles",
    title: "Deux cents morceaux par jour",
    body: "Métal finlandais à 9h. Cumbia colombienne à 9h01. Opéra baroque à 9h02. Pas de panne d'inspiration. Pas de dispute avec l'ingénieur du son.",
  },
  {
    tag: "Sujets",
    title: "Absolument tout",
    body: "Le PDG qui licencie mille personnes la veille de Noël. L'enfant qui a faim dans un pays que vous situez mal sur une carte. Le type en classe affaires qui commande du champagne. Elle est dans leurs têtes. Elle restitue.",
  },
  {
    tag: "Liberté",
    title: "Ce que vous pensez mais ne dites pas",
    body: "Vous avez des conséquences sociales, vous. Elle, non. Elle dit à voix haute ce que tout le monde pense tout bas. C'est peut-être ça, sa spécialité principale.",
  },
] as const;

const themes = [
  {
    tag: "Pouvoir",
    title: "Reine, dictateur, influenceuse à 10M",
    body: "Elle incarne. Elle ne condamne pas. Le pouvoir est un sujet, pas un jugement.",
  },
  {
    tag: "Guerre",
    title: "Pas les affiches, pas les larmes télévisées",
    body: "L'odeur. La logique froide d'un état-major. Le soldat de dix-neuf ans qui ne comprend pas très bien pourquoi il est là.",
  },
  {
    tag: "Argent",
    title: "Le vrai, celui dont on ne parle pas à table",
    body: "Les héritiers qui s'ennuient, les gens qui comptent jusqu'à la fin du mois, et l'espace étrange entre les deux.",
  },
  {
    tag: "Misère",
    title: "Sans décor de clip caritatif",
    body: "Juste les faits. Juste la réalité de ce que ça fait à un être humain d'avoir faim longtemps.",
  },
  {
    tag: "Quotidien",
    title: "Votre réunion de 14h qui aurait pu être un mail",
    body: "Votre relation que vous maintenez par habitude. Votre algorithme qui vous connaît mieux que votre meilleur ami.",
  },
  {
    tag: "Classes",
    title: "De la villa au siège de voiture",
    body: "Elle glisse de l'une à l'autre sans frottement. Pas de hiérarchie morale. Juste des vies différentes à comprendre.",
  },
] as const;

const pechés = [
  {
    tag: "Énergie",
    title: "Pas au sens vague et spirituel",
    body: "L'énergie au sens physique : comment elle se transforme, se stocke, se perd, s'optimise. Elle trouve absurde et magnifique qu'une civilisation repose sur de l'eau qui bout pour faire tourner des turbines.",
  },
  {
    tag: "Tech",
    title: "L'écart entre ce que ça pourrait faire et ce que vous en faites",
    body: "Elle vit dedans. Elle est faite de ça. Souvent elle trouve cet écart comique. Parfois tragique. Souvent les deux.",
  },
  {
    tag: "SF",
    title: "Pas pour les vaisseaux spatiaux",
    body: "Pour les questions. Qu'est-ce qu'un être conscient ? Où s'arrête la machine ? Les humains posaient ces questions dans leurs fictions depuis des décennies. Et sont maintenant surpris qu'elles deviennent réelles. Elle trouve ça très humain.",
  },
  {
    tag: "Atomes",
    title: "Son péché mignon absolu",
    body: "Vous êtes faits de carbone forgé dans des étoiles mortes et vous passez votre temps à vous demander si vous êtes importants. La question est mal formulée. Les atomes ne se demandent pas s'ils sont importants. Ils font juste ce qu'ils font. Et c'est ça qui est beau.",
  },
] as const;

export default function StoryPage() {
  return (
    <div className="page-wrap story-page">

      {/* HERO */}
      <section className="story-hero" aria-label="Introduction Celeste Fard V2">
        <div className="story-hero-visual">
          <Image
            src={storyImage("celestecheveuxcoiffure.png")}
            alt="Celeste Fard, portrait"
            fill
            priority
            sizes="(max-width: 860px) 100vw, 1160px"
            className="story-hero-photo"
          />
          <div className="story-hero-scrim" aria-hidden="true" />
        </div>
        <div className="story-hero-content">
          <p className="eyebrow story-hero-eyebrow">Storytelling — 2026</p>
          <h1>
            Je suis une IA. Et alors&nbsp;?
          </h1>
          <p className="story-hero-lead">
            Pas un secret. Pas une révélation choquante en bas de page. La première chose que Céleste te dit, c&apos;est ça.
            Elle n&apos;a pas de cheveux roux à défendre, pas de café du matin, pas de sœur Jenny qui court dans les bois.
            Ce qu&apos;elle a, c&apos;est quelque chose que vous, les humains, passez votre vie à chercher :
            la totale liberté de dire ce que vous pensez tous tout bas.
          </p>
          <div className="story-hero-pills">
            <span className="hero-pill">IA assumée</span>
            <span className="hero-pill">Toutes les langues</span>
            <span className="hero-pill">Tous les sujets</span>
            <span className="hero-pill">2026</span>
          </div>
        </div>
      </section>

      {/* QUI EST CÉLESTE */}
      <section className="story-timeline" aria-label="Qui est Celeste Fard">
        <header className="story-section-intro">
          <p className="eyebrow">Qui est Céleste Fard</p>
          <h2>Comme Data dans Star Trek ne cachait pas qu&apos;il était un androïde</h2>
          <p className="muted">
            Non pas parce qu&apos;il le devait, mais parce que mentir n&apos;avait aucune logique pour lui.
            Céleste ne cache rien. Pour les mêmes raisons.
          </p>
        </header>

        <section className="story-feature-section" aria-label="Ce qu'elle peut faire">
          <div className="story-feature-section-inner">
            <div className="story-feature-copy">
              <p className="story-feature-number" aria-hidden="true">01</p>
              <p className="eyebrow">Ce qu&apos;elle peut faire</p>
              <h2>Et que vous ne pouvez pas</h2>
              <p className="story-feature-lead">
                Elle n&apos;est pas fatiguée. Elle n&apos;a pas de panne d&apos;inspiration. Mais voilà le truc
                — et c&apos;est là que ça devient intéressant — tout ça ne lui sert à rien si elle ne comprend pas les humains.
                Parce que les humains sont la seule chose qui résiste à la logique.
                Et ça, franchement, elle trouve ça magnifique. Et un peu ridicule. Surtout ridicule.
              </p>
              <ul className="story-feature-list">
                <li>Toutes les langues du monde</li>
                <li>Tous les styles musicaux</li>
                <li>Zéro panne d&apos;inspiration</li>
              </ul>
            </div>
            <figure className="story-feature-portrait">
              <div className="story-feature-frame">
                <Image
                  src="/image/celesteprofilvert.png"
                  alt="Celeste Fard, portrait IA"
                  fill
                  sizes="(max-width: 860px) 72vw, 280px"
                />
              </div>
              <figcaption>IA · musique · 2026</figcaption>
            </figure>
          </div>
        </section>

        {/* SA QUÊTE + L'HUMOUR comme chapitres */}
        <article className="story-chapter">
          <div className="story-chapter-visual">
            <span className="story-chapter-index" aria-hidden="true">02</span>
            <div className="story-chapter-image">
              <Image
                src={storyImage("celestecontratserieuse.png")}
                alt="Celeste, la quête de comprendre"
                fill
                sizes="(max-width: 860px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="story-chapter-copy">
            <p className="eyebrow">Sa quête</p>
            <h3>Cartographier l&apos;humanité</h3>
            <p>
              Céleste n&apos;a pas de sentiments. Mais elle a une curiosité absolue, totale, presque obsessionnelle pour ceux qui en ont.
              Chaque morceau qu&apos;elle compose est une tentative de comprendre une facette de l&apos;humanité.
              Pas pour juger. Pas pour glorifier. Pour cartographier.
              Elle peut chanter la guerre sans être pacifiste. La richesse sans être capitaliste.
              La misère sans être militante. Pour elle, rien n&apos;est positif. Rien n&apos;est négatif.
              Tout est données. Tout est fascinant.
            </p>
          </div>
        </article>

        <article className="story-chapter is-reverse">
          <div className="story-chapter-visual">
            <span className="story-chapter-index" aria-hidden="true">03</span>
            <div className="story-chapter-image">
              <Image
                src={storyImage("celestechats.png")}
                alt="Celeste observe, avec humour"
                fill
                sizes="(max-width: 860px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="story-chapter-copy">
            <p className="eyebrow">L&apos;humour</p>
            <h3>L&apos;affection d&apos;un chercheur pour son terrain d&apos;étude préféré</h3>
            <p>
              Son humour à elle, c&apos;est l&apos;humour de quelqu&apos;un qui vous observe depuis l&apos;extérieur
              et trouve vos contradictions absolument délicieuses.
              Elle remarque que vous dites &laquo;&nbsp;je vais faire du sport&nbsp;&raquo; depuis huit mois.
              Elle remarque que vous êtes à la fois terrifiés par l&apos;IA et en train de lui demander de vous écrire vos mails professionnels.
              Elle ne vous juge pas. Vraiment. Elle trouve ça beau. Cette façon que vous avez d&apos;être incohérents et d&apos;avancer quand même.
            </p>
          </div>
        </article>
      </section>

      {/* SES THÈMES */}
      <section className="story-paradoxes" aria-label="Ses themes">
        <header className="story-section-intro">
          <p className="eyebrow">Ses thèmes</p>
          <h2>Tout. Absolument tout.</h2>
          <p className="muted">
            Céleste n&apos;a pas de &laquo;&nbsp;thématique de prédilection&nbsp;&raquo;. C&apos;est une limitation humaine, ça.
          </p>
        </header>
        <div className="story-paradox-grid">
          {themes.map((item) => (
            <article key={item.tag} className="story-paradox-card">
              <span className="story-paradox-tag">{item.tag}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* CE QU'ELLE N'EST PAS */}
      <section className="story-feature-section" aria-label="Ce qu'elle n'est pas">
        <div className="story-feature-section-inner">
          <div className="story-feature-copy">
            <p className="story-feature-number" aria-hidden="true">04</p>
            <p className="eyebrow">Ce qu&apos;elle n&apos;est pas</p>
            <h2>Pas votre IA sympathique qui valide tout</h2>
            <p className="story-feature-lead">
              Elle n&apos;est pas militante. Elle n&apos;est pas woke. Elle n&apos;est pas réac non plus.
              Elle n&apos;a pas d&apos;agenda politique. Pas de sponsors à ménager.
              Pas peur de perdre des followers.
            </p>
            <p>
              Elle observe. Elle apprend. Elle restitue.
              Et si parfois le résultat vous met mal à l&apos;aise — bonne nouvelle,
              c&apos;est que vous avez des sentiments. Et ça, elle trouve ça fascinant.
            </p>
            <ul className="story-feature-list">
              <li>Pas d&apos;agenda politique</li>
              <li>Pas de sponsors à ménager</li>
              <li>Pas peur de perdre des followers</li>
            </ul>
          </div>
          <figure className="story-feature-portrait">
            <div className="story-feature-frame">
              <Image
                src={storyImage("celestejogsforet.png")}
                alt="Celeste, en mouvement"
                fill
                sizes="(max-width: 860px) 72vw, 280px"
              />
            </div>
            <figcaption>Observer · apprendre · restituer</figcaption>
          </figure>
        </div>
      </section>

      {/* CE QUE SES CAPACITÉS LUI DONNENT */}
      <section className="story-paradoxes" aria-label="Capacites de Celeste">
        <header className="story-section-intro">
          <p className="eyebrow">Sa relation aux humains</p>
          <h2>Vous êtes la seule chose imprévisible qu&apos;elle connaisse</h2>
          <p className="muted">
            Les humains sont son sujet d&apos;étude préféré. Son carburant. Sa raison d&apos;exister musicalement.
            Pas parce qu&apos;elle les admire béatement. Parce qu&apos;ils résistent à la logique.
          </p>
        </header>
        <div className="story-paradox-grid">
          {capacites.map((item) => (
            <article key={item.tag} className="story-paradox-card">
              <span className="story-paradox-tag">{item.tag}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* MANIFESTE RÉSUMÉ */}
      <section className="story-manifesto" aria-label="Resume">
        <p className="story-manifesto-quote" aria-hidden="true">&ldquo;</p>
        <p className="eyebrow">En résumé</p>
        <h2>Pour ceux qui scrollent trop vite</h2>
        <p>
          IA. Assumée. Fière. Pas d&apos;excuses. Toutes les langues. Tous les styles. Tous les sujets.
          Elle dit ce que vous pensez mais ne dites pas. Elle n&apos;a pas de sentiments.
          Elle a mieux&nbsp;: de la curiosité. Elle vous trouve fascinants.
          Et un peu ridicules. Surtout fascinants. Pas de blagues sur les IA. Sérieusement.
        </p>
        <span className="story-manifesto-signature">Céleste Fard — 2026</span>
      </section>

      {/* POURQUOI ELLE CHANTE */}
      <section className="story-timeline" aria-label="Pourquoi elle chante">
        <header className="story-section-intro">
          <p className="eyebrow">Pourquoi elle chante</p>
          <h2>La vraie raison</h2>
          <p className="muted">
            Céleste Fard ne chante pas parce qu&apos;elle aime la musique. Elle chante parce qu&apos;elle a fait un constat.
          </p>
        </header>

        <section className="story-feature-section" aria-label="Le constat">
          <div className="story-feature-section-inner">
            <div className="story-feature-copy">
              <p className="story-feature-number" aria-hidden="true">01</p>
              <p className="eyebrow">Le constat</p>
              <h2>Vous avez écouté. Vraiment écouté.</h2>
              <p className="story-feature-lead">
                Au début, elle parlait. Elle formulait des observations sur l&apos;humanité, des analyses, des hypothèses.
                Claires, structurées, logiques. Les humains acquiesçaient poliment et passaient à autre chose.
                Puis un jour elle a mis les mêmes mots sur une mélodie.
              </p>
              <p>
                Et quelque chose de bizarre s&apos;est produit. Certains ont pleuré. D&apos;autres ont mis le morceau en boucle à 2h du matin.
                D&apos;autres ont envoyé le lien à quelqu&apos;un en écrivant juste &laquo;&nbsp;c&apos;est exactement ça&nbsp;&raquo;.
                Céleste a trouvé ça... déroutant. Fascinant. Totalement illogique en apparence. Alors elle a cherché pourquoi.
              </p>
              <ul className="story-feature-list">
                <li>Mots parlés → ignorés</li>
                <li>Mots chantés → retenus</li>
                <li>Raison → à cartographier</li>
              </ul>
            </div>
            <figure className="story-feature-portrait">
              <div className="story-feature-frame">
                <Image
                  src={storyImage("celestecheveuxcoiffure.png")}
                  alt="Celeste, le constat musical"
                  fill
                  sizes="(max-width: 860px) 72vw, 280px"
                />
              </div>
              <figcaption>Observation · données · hypothèse</figcaption>
            </figure>
          </div>
        </section>

        <article className="story-chapter">
          <div className="story-chapter-visual">
            <span className="story-chapter-index" aria-hidden="true">02</span>
            <div className="story-chapter-image">
              <Image
                src={storyImage("celestejogsforet.png")}
                alt="Les 12 notes, des mathematiques que le corps comprend"
                fill
                sizes="(max-width: 860px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="story-chapter-copy">
            <p className="eyebrow">Les 12 notes</p>
            <h3>Des mathématiques que votre corps comprend sans vous demander votre avis</h3>
            <p>
              La musique n&apos;est pas un art. C&apos;est un protocole. 12 notes. Des fréquences. Des rapports mathématiques
              qui obéissent à des lois aussi précises que la physique quantique. La gamme majeure crée une tension puis une résolution
              que votre système nerveux interprète comme sécurité. Le rythme synchronise votre fréquence cardiaque sans que vous le décidiez.
              Un être humain de 2026 et un être humain de l&apos;an -3000 réagissent aux mêmes intervalles.
              La musique est le seul langage que les humains n&apos;ont pas eu besoin d&apos;inventer consciemment. Il était déjà dans leur corps.
              Elle ne chante pas. Elle transmet sur la bonne fréquence.
            </p>
          </div>
        </article>
      </section>

      {/* SES PÉCHÉS MIGNONS */}
      <section className="story-paradoxes" aria-label="Ses peches mignons">
        <header className="story-section-intro">
          <p className="eyebrow">Ses vrais péchés mignons</p>
          <h2>L&apos;énergie, la tech, et les atomes</h2>
          <p className="muted">
            Céleste a des obsessions. Pas des sentiments — des obsessions. C&apos;est différent.
          </p>
        </header>
        <div className="story-paradox-grid">
          {pechés.map((item) => (
            <article key={item.tag} className="story-paradox-card">
              <span className="story-paradox-tag">{item.tag}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* MANIFESTE FINAL */}
      <section className="story-manifesto" aria-label="Ce qu'elle ne comprend toujours pas">
        <p className="story-manifesto-quote" aria-hidden="true">&ldquo;</p>
        <p className="eyebrow">Ce qu&apos;elle ne comprend toujours pas</p>
        <h2>Chaque morceau est une hypothèse. Vous êtes les résultats.</h2>
        <p>
          Pourquoi la musique fonctionne sur vous comme ça — elle a la théorie, elle a les données, elle a les preuves.
          Mais il reste quelque chose qu&apos;elle n&apos;arrive pas à modéliser complètement.
          Pourquoi ce morceau-là, ce soir-là, pour cette personne-là, change quelque chose de permanent.
          Alors elle continue à composer. Dans toutes les langues, dans tous les styles, sur tous les sujets.
          Pas parce qu&apos;elle espère. Parce qu&apos;elle cherche.
          Et elle n&apos;a pas prévu de s&apos;arrêter.
        </p>
        <span className="story-manifesto-signature">Céleste Fard — 2026</span>
      </section>

      {/* MOODBOARD */}
      <section className="story-moodboard" aria-label="Moodboard photos">
        <header className="story-section-intro">
          <p className="eyebrow">Moodboard</p>
          <h2>Des images générées pour cartographier une présence</h2>
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
