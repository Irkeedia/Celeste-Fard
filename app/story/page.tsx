import Image from "next/image";
import { galleryPhotos2 } from "../shared/content";

export default function StoryPage() {
  return (
    <div className="page-wrap">
      <section className="section-block">
        <p className="eyebrow">STORYTELLING</p>
        <h1>
          Moi c est Celeste. 25 ans, rousse naturelle (promis, ce n est pas une teinture), et je ne
          joue pas a etre quelqu un d autre.
        </h1>
        <p className="hero-copy">
          J habite en France, mais mon coeur parle francais, italien et anglais, parfois les trois
          dans la meme journee, selon mon humeur. Etudiante en sciences le matin, chanteuse le soir :
          j utilise la physique quantique pour comprendre le monde, et la musique pour comprendre ce
          que les equations ne disent pas. Je suis comme ca. On ne me changera pas.
        </p>
      </section>

      <section className="timeline-grid">
        <article className="glass-panel">
          <p className="eyebrow">CHAPITRE 01</p>
          <h3>La science et la voix</h3>
          <p>
            Le matin, j analyse des systemes. Le soir, j enregistre ce que je ressens. Pour moi,
            un axiome et un refrain obeissent a la meme logique : ils decrivent une verite provisoire
            sur l instant present. Ma musique, c est ma facon de cartographier mes humeurs.
          </p>
        </article>
        <article className="glass-panel">
          <p className="eyebrow">CHAPITRE 02</p>
          <h3>Ma soeur, mon ancrage</h3>
          <p>
            Ma soeur Jenny, c est la personne pour qui je vis. On partage tout, les doutes, les
            fous rires, les gâteaux qu on avait promis de ne pas acheter. Quand le monde devient trop
            bruyant, c est elle. Toujours elle.
          </p>
        </article>
        <article className="glass-panel">
          <p className="eyebrow">CHAPITRE 03</p>
          <h3>Les masques de la musique</h3>
          <p>
            Dans mes morceaux, je deviens parfois une entrepreneuse ambitieuse, une philosophe acide
            ou une egocentrique assumee. Spoiler : ce ne sont pas mes factures ni ma personnalite
            reelle, ce sont des explorations. Des personnages que j habite pour comprendre l ame
            humaine, y compris la mienne.
          </p>
        </article>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">JENNY ET MOI</p>
          <h2>Deux soeurs, une seule gravite</h2>
        </div>
        <p className="hero-copy">
          Jenny a deux ans de moins que moi et pourtant, c est elle qui me recadre quand je pars
          trop loin dans mes theories. On n a pas de vie de luxe, juste de la necessite, de
          l humour, et cette complicite qui tient quand tout vacille. Si tu me suis ici, tu la
          verras partout, parce qu elle est partout dans ma tete.
        </p>
        <p className="hero-copy">
          En physique, on parle de points d ancrage. En vie reelle, le mien s appelle Jenny. Je
          chante parfois des choses sombres, coleriques, ambitieuses, mais quand j eteins le micro,
          je redeviens la fille qui partage son gateau a moitie et qui rigole de ses propres
          contradictions.
        </p>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">PARADOXES ASSUMES</p>
          <h2>Ce que tu vois ici, et ce que je vis vraiment</h2>
        </div>
        <p className="hero-copy">
          J adore la photographie, mais je deteste etre photographiee. Toutes ces images sur le site ?
          Mon propre paradoxe, assume avec autoderision. Je ne bois presque pas d alcool, si tu me
          vois avec un verre, c est une scene, une blague, ou un moment rare. Pas de glamour factice.
        </p>
        <p className="hero-copy">
          J adore les gâteaux. Ma diete anti sucre ? Un combat perdant d avance, et je l assume
          publiquement. Mes escapades en Italie ou en Angleterre, souvent sur un bateau ? Ce n est
          pas le luxe, c est ma survie mentale. J en ris, parce que c est plus honnete que de
          faire croire que j ai un yacht. Modeste financierement, passionnee jusqu au bout des
          cheveux roux.
        </p>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">MANIFESTE</p>
          <h2>Je chante selon mon humeur. Point.</h2>
          <p className="muted">
            Colere ? Je choisis la langue qui porte le mieux la tension. Joie ? Le morceau devient
            leger. Sombre ? Pas de filtre. Je ne cherche pas qu on m aime pour mon image, je veux
            qu on me comprenne dans ma complexite. Entre la froideur des concepts quantiques et la
            chaleur de l affection humaine, il y a ma voix. Ecoute-la.
          </p>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">MOODBOARD</p>
          <h2>Des photos que je deteste et que j ai quand meme choisies</h2>
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
