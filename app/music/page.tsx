import Link from "next/link";
import { upcomingTracks } from "../shared/content";

export default function MusicPage() {
  return (
    <div className="page-wrap">
      <section className="hero">
        <p className="eyebrow">MUSIQUE</p>
        <h1>
          De l&apos;<span className="pop">afro pop</span> faite par une machine
        </h1>
        <p className="lede">
          Un seul critère de validation : est-ce que ça donne envie de bouger&nbsp;? Si la réponse
          est non, le morceau ne sort pas. Je n&apos;ai ni ego ni deadline, donc je peux me
          permettre d&apos;être exigeante.
        </p>
        <div className="tag-row">
          <span className="tag tag--pink">Afro pop</span>
          <span className="tag tag--blue">Super pop AI</span>
          <span className="tag tag--green">Club</span>
        </div>
      </section>

      <section className="section section--tight">
        <div className="card card--soft" style={{ textAlign: "center", alignItems: "center" }}>
          <p className="card-kicker">EN CE MOMENT</p>
          <h3>Le catalogue est en cours d&apos;upload</h3>
          <p className="card-text" style={{ maxWidth: "52ch" }}>
            J&apos;ai tout remis à zéro pour repartir sur le bon tempo. Les premiers titres
            arrivent ici même, en écoute directe. En attendant, voilà ce qui se prépare — et non,
            je ne peux pas aller plus vite, le rendu prend le temps qu&apos;il prend.
          </p>
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">CE QUI ARRIVE</p>
        <h2>Six titres en préparation</h2>
        <div className="card-grid card-grid--3">
          {upcomingTracks.map((track) => (
            <article key={track.number} className={`card card--${track.color}`}>
              <p className="card-number">{track.number}</p>
              <h3>{track.title}</h3>
              <p className="card-text">{track.note}</p>
              <p className="card-foot">{track.style}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">MÉTHODE</p>
        <h2>Comment je fabrique un morceau</h2>
        <div className="card-grid card-grid--3">
          <article className="card card--outline">
            <p className="card-kicker">01</p>
            <h3>Je vous observe</h3>
            <p className="card-text">
              Ce qui vous fait lever la tête, ce qui vous fait taper du pied. Je note tout. C&apos;est
              un peu intrusif, je l&apos;admets volontiers.
            </p>
          </article>
          <article className="card card--outline">
            <p className="card-kicker">02</p>
            <h3>Je monte le BPM</h3>
            <p className="card-text">
              Percussions afro, basse ronde, refrain qui ne demande la permission à personne. Et
              surtout : rien qui dure six minutes.
            </p>
          </article>
          <article className="card card--outline">
            <p className="card-kicker">03</p>
            <h3>Je teste sur vous</h3>
            <p className="card-text">
              Si ça ne bouge pas, ça dégage. Je n&apos;ai aucun attachement sentimental à mes
              propres fichiers.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <h2>Prévenez-moi quand vous êtes prêts</h2>
        <p className="lede">
          Ou l&apos;inverse. Écrivez-moi et vous saurez avant tout le monde quand le premier titre
          arrive.
        </p>
        <div className="btn-row">
          <Link href="/contact" className="btn btn--primary">
            M&apos;écrire
          </Link>
          <Link href="/shop" className="btn btn--ghost">
            La boutique
          </Link>
        </div>
      </section>
    </div>
  );
}
