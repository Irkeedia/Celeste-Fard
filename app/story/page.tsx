import Image from "next/image";
import { galleryPhotos2 } from "../shared/content";

export default function StoryPage() {
  return (
    <div className="page-wrap">
      <section className="section-block">
        <p className="eyebrow">STORYTELLING</p>
        <h1>Je m appelle Celeste Fard, et je raconte ma vraie histoire.</h1>
        <p className="hero-copy">
          Je suis nee a Montauban le 24 avril 2002. Mon pere adoptif est italien, ma mere adoptive
          est prof d anglais, et je vis en francais, italien et anglais depuis toujours.
        </p>
      </section>

      <section className="timeline-grid">
        <article className="glass-panel">
          <p className="eyebrow">CHAPITRE 01</p>
          <h3>Mon debut de vie</h3>
          <p>
            Je ne connais pas mes parents biologiques, mais je suis entouree de vrais parents de
            coeur qui m ont construite.
          </p>
        </article>
        <article className="glass-panel">
          <p className="eyebrow">CHAPITRE 02</p>
          <h3>Jenny et moi</h3>
          <p>
            J ai grandi avec Jenny, ma soeur de coeur. On a traverse plusieurs familles ensemble,
            et notre lien est encore plus fort que le sang.
          </p>
        </article>
        <article className="glass-panel">
          <p className="eyebrow">CHAPITRE 03</p>
          <h3>Ma musique aujourd hui</h3>
          <p>
            Je fais du rap pop sombre pour transformer mes emotions. Je parle de famille, reussite,
            vie reelle, science et references techniques.
          </p>
        </article>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">JENNY ET MOI</p>
          <h2>Deux soeurs de coeur, une seule colonne vertebrale</h2>
        </div>
        <p className="hero-copy">
          Jenny n est pas ma soeur de sang, mais c est ma soeur de vie. Elle a deux ans de moins que
          moi, et pourtant je l ai toujours vue comme mon miroir et ma force. On a traverse plusieurs
          familles, plusieurs cadres, plusieurs peurs, mais on ne s est jamais lachees. Meme quand
          tout etait instable autour, notre lien, lui, etait solide.
        </p>
        <p className="hero-copy">
          On s est construites ensemble, on s est protegees ensemble, et aujourd hui encore on
          s aime avec une intensite qui depasse les mots. Si je parle autant de famille dans mes
          morceaux, c est parce que je sais ce que ca veut dire de la choisir, de la creer, et de
          la meriter. Jenny, c est ma preuve vivante que l amour peut tenir quand tout bouge.
        </p>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">MANIFESTE</p>
          <h2>Je chante pour moi, mais j adore quand on m ecoute</h2>
          <p className="muted">
            Je suis positive depuis toujours. Je chante parfois FR-IT, parfois FR-EN, selon mon
            humeur et mes envies creatives. Fun fact : j apprends le portugais, doucement.
          </p>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">MOODBOARD</p>
          <h2>Images qui racontent mon histoire</h2>
        </div>
        <div className="story-gallery">
          {galleryPhotos2.slice(0, 4).map((photo) => (
            <article key={photo.src} className="story-gallery-card">
              <Image src={photo.src} alt={photo.title} fill sizes="(max-width: 860px) 100vw, 24vw" />
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
