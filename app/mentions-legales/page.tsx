import type { Metadata } from "next";
import Link from "next/link";
import { LEGAL } from "../shared/legal-info";

export const metadata: Metadata = {
  title: "Mentions légales | Celeste Fard",
  description:
    "Éditeur, propriété intellectuelle, intelligence artificielle et transparence du site Celeste Fard.",
};

export default function MentionsLegalesPage() {
  return (
    <div className="page-wrap legal-page">
      <section className="section-block">
        <p className="eyebrow">TRANSPARENCE RADICALE (MÊME ICI)</p>
        <h1>Mentions légales</h1>
        <p className="hero-copy">
          Oui, même un site pop couture avec des gâteaux et de la physique quantique doit avoir sa
          page légale. Promis : on reste clairs, sans jargon de cabinet, et avec un minimum
          d&apos;autodérision. Parce que la loi, ça compte. Comme Jenny qui me recadre quand je
          pars trop loin.
        </p>
      </section>

      <section className="legal-stack">
        <article className="glass-panel legal-section">
          <p className="eyebrow">ÉDITEUR</p>
          <h2>Qui tient la plume (et le code)</h2>
          <ul className="legal-list">
            <li>
              <strong>Site :</strong> {LEGAL.siteName}
            </li>
            <li>
              <strong>URL :</strong>{" "}
              <a href={LEGAL.siteUrl} target="_blank" rel="noopener noreferrer">
                {LEGAL.siteUrl}
              </a>
            </li>
            <li>
              <strong>Créé par :</strong> {LEGAL.creator}
            </li>
            <li>
              <strong>Éditeur du site :</strong> {LEGAL.editor}
            </li>
            <li>
              <strong>Directeur de la publication :</strong> {LEGAL.editor}
            </li>
            <li>
              <strong>Propriété du projet :</strong> {LEGAL.editor} (oui, c&apos;est bien la mienne)
            </li>
            <li>
              <strong>Contact légal :</strong>{" "}
              <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>
            </li>
          </ul>
        </article>

        <article className="glass-panel legal-section legal-section--highlight">
          <p className="eyebrow">REPRÉSENTATION ARTISTIQUE</p>
          <h2>Celeste Fard n&apos;est pas une humaine qui oublie ses mails</h2>
          <p>
            À cause du nouveau cadre légal sur les contenus synthétiques, on le dit clairement :
            <strong> Celeste Fard est une représentation artistique générée avec de l&apos;intelligence artificielle</strong>.
            Pas une vraie personne, pas une fausse arnaque non plus : un personnage de fiction
            assumé, avec une voix, une esthétique et une histoire écrites pour l&apos;art et
            l&apos;expérimentation.
          </p>
          <p>
            <strong>Intelligence artificielle</strong>, ça veut dire quoi ici ? C&apos;est un
            ensemble de programmes informatiques capables d&apos;imiter certaines tâches humaines
            (écrire, composer, générer des images, structurer un récit...) sans avoir besoin de
            dormir, de café, ou de se demander si ses cheveux roux sont naturels. En bref :
            l&apos;ordinateur improvise, l&apos;humain ({LEGAL.editor}, via {LEGAL.creator}) cadre,
            relit, et assume le résultat.
          </p>
          <p className="muted">
            Les textes, visuels, vidéos ou morceaux présentés dans l&apos;univers Celeste Fard
            peuvent donc être créés ou assistés par intelligence artificielle. Si tu cherches une
            biographie Wikipedia vérifiable, tu es au mauvais endroit. Si tu cherches une
            expérience artistique honnête sur ce que l&apos;intelligence artificielle peut raconter,
            bienvenue.
          </p>
        </article>

        <article className="glass-panel legal-section">
          <p className="eyebrow">PROPRIÉTÉ INTELLECTUELLE</p>
          <h2>Ce site m&apos;appartient (enfin, à Mathieu)</h2>
          <p>
            L&apos;ensemble du site {LEGAL.siteName} (structure, textes originaux, direction
            artistique, code, charte visuelle, univers narratif) est la propriété de{" "}
            <strong>{LEGAL.editor}</strong>, sauf mention contraire pour des contenus tiers.
          </p>
          <p>
            Toute reproduction, représentation, modification ou exploitation non autorisée peut
            constituer une contrefaçon. En langage clair : ne republie pas le site en entier en
            prétendant l&apos;avoir inventé un dimanche pluvieux.
          </p>
        </article>

        <article className="glass-panel legal-section">
          <p className="eyebrow">HÉBERGEMENT</p>
          <h2>Où vit le site quand il n&apos;est pas en scène</h2>
          <ul className="legal-list">
            <li>
              <strong>Hébergeur :</strong> {LEGAL.host.name}
            </li>
            <li>
              <strong>Adresse :</strong> {LEGAL.host.address}
            </li>
            <li>
              <strong>Site :</strong>{" "}
              <a href={LEGAL.host.website} target="_blank" rel="noopener noreferrer">
                {LEGAL.host.website}
              </a>
            </li>
          </ul>
        </article>

        <article className="glass-panel legal-section">
          <p className="eyebrow">DONNÉES & COOKIES</p>
          <h2>Ce qu&apos;on collecte (spoiler : pas grand-chose de glamour)</h2>
          <p>
            Si tu utilises le formulaire de contact ou nous écris par mail, on traite les données
            nécessaires pour te répondre (nom, email, message). Pas de revente à des annonceurs,
            pas de profilage mystérieux : on n&apos;est pas une plateforme de pub, on est un projet
            artistique avec une boîte mail.
          </p>
          <p>
            Le site peut utiliser des cookies techniques ou de mesure d&apos;audience selon la
            configuration de l&apos;hébergeur. Rien d&apos;obligatoire pour admirer Celeste en
            roux naturel (fictif).
          </p>
        </article>

        <article className="glass-panel legal-section">
          <p className="eyebrow">CRÉDITS</p>
          <h2>Remerciements sans filtre</h2>
          <p>
            Conception, direction artistique et développement : <strong>{LEGAL.creator}</strong>,
            sous la direction éditoriale de <strong>{LEGAL.editor}</strong>. Univers narratif et
            personnage Celeste Fard : œuvre de fiction assistée par intelligence artificielle,
            assumée comme telle.
          </p>
        </article>
      </section>

      <p className="legal-back muted">
        Tu veux aussi les règles du jeu ? Lis les{" "}
        <Link href="/cgu">conditions générales d&apos;utilisation</Link>.
      </p>
    </div>
  );
}
