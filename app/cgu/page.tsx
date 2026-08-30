import type { Metadata } from "next";
import Link from "next/link";
import { LEGAL } from "../shared/legal-info";

export const metadata: Metadata = {
  title: "CGU | Celeste Fard",
  description:
    "Conditions générales d'utilisation du site Celeste Fard, projet artistique assisté par intelligence artificielle.",
};

export default function CguPage() {
  return (
    <div className="page-wrap legal-page">
      <section className="section-block">
        <p className="eyebrow">RÈGLES DU CLUB (VERSION SINCÈRE)</p>
        <h1>Conditions générales d&apos;utilisation</h1>
        <p className="hero-copy">
          Bienvenue. Avant de scroller, écouter, ou t&apos;imaginer en VIP sur un yacht (spoiler :
          il n&apos;y en a pas), voici comment fonctionne ce site. En entrant, tu acceptes ces
          conditions. Si tu n&apos;es pas d&apos;accord, tu peux partir sans drama : je déteste les
          photos, pas les visiteurs polis.
        </p>
      </section>

      <section className="legal-stack">
        <article className="glass-panel legal-section">
          <p className="eyebrow">ARTICLE 1</p>
          <h2>Objet du site</h2>
          <p>
            Le site <strong>{LEGAL.siteName}</strong> ({LEGAL.siteUrl}) est un projet artistique et
            narratif publié par <strong>{LEGAL.editor}</strong>, créé par{" "}
            <strong>{LEGAL.creator}</strong>. Il présente l&apos;univers d&apos;une artiste
            fictive, sa musique, son storytelling, des visuels et, éventuellement, une boutique
            merchandising.
          </p>
          <p>
            Ce n&apos;est ni un journal d&apos;information, ni un conseil médical, ni un cours de
            physique quantique certifié. Si tu appliques mes paroles à un examen, c&apos;est à tes
            risques (et Jenny ne pourra pas te recadrer).
          </p>
        </article>

        <article className="glass-panel legal-section legal-section--highlight">
          <p className="eyebrow">ARTICLE 2</p>
          <h2>Celeste Fard = fiction + intelligence artificielle</h2>
          <p>
            Nouveau cadre légal oblige à être explicite, donc je le fais avec le sourire :
            <strong> Celeste Fard est une représentation artistique produite avec de l&apos;intelligence artificielle</strong>.
            Elle n&apos;existe pas dans le monde réel. Pas de date de naissance officielle à
            l&apos;état civil, pas de vrai yacht, pas de vraie sœur Jenny qui signe des
            autographes dans la rue (désolée pour la magie, merci pour l&apos;honnêteté).
          </p>
          <p>
            <strong>Intelligence artificielle</strong> : technologies informatiques capables de
            produire ou d&apos;aider à produire du texte, de l&apos;image, de l&apos;audio ou de
            la mise en page en s&apos;inspirant de modèles appris sur de grandes quantités de
            données. Traduction humaine : des algorithmes qui bossent vite ; un humain qui vérifie
            (ou pas) ce qu&apos;ils sortent.
          </p>
          <p className="muted">
            En utilisant ce site, tu reconnais que l&apos;expérience proposée mélange création
            humaine, direction artistique et contenus synthétiques. C&apos;est voulu. C&apos;est
            même le sujet.
          </p>
        </article>

        <article className="glass-panel legal-section">
          <p className="eyebrow">ARTICLE 3</p>
          <h2>Accès au site</h2>
          <p>
            Le site est accessible gratuitement, 24h/24 sauf maintenance, panne, ou crise
            existentielle du serveur. {LEGAL.creator} et {LEGAL.editor} peuvent suspendre,
            modifier ou retirer des contenus sans préavis, parce qu&apos;un projet artistique vit
            (et parfois mutile ses propres photos).
          </p>
        </article>

        <article className="glass-panel legal-section">
          <p className="eyebrow">ARTICLE 4</p>
          <h2>Propriété intellectuelle</h2>
          <p>
            Tous les éléments du site (textes, visuels, logo, structure, code, nom Celeste Fard,
            univers narratif) sont protégés. La propriété appartient à{" "}
            <strong>{LEGAL.editor}</strong>.
          </p>
          <p>
            Tu peux consulter, écouter, partager un lien vers le site. Tu ne peux pas copier
            l&apos;intégralité du projet pour le revendre, le faire passer pour le tien, ou
            entraîner un modèle dessus sans autorisation écrite. Même avec un bon filtre Instagram.
          </p>
        </article>

        <article className="glass-panel legal-section">
          <p className="eyebrow">ARTICLE 5</p>
          <h2>Comportement des utilisateurs</h2>
          <p>Tu t&apos;engages à ne pas :</p>
          <ul className="legal-list">
            <li>Publier via nos formulaires du contenu illégal, haineux ou diffamatoire ;</li>
            <li>Tenter de pirater, surcharger ou casser le site (on a déjà assez de paradoxes) ;</li>
            <li>Usurper l&apos;identité de Celeste, de Jenny, ou de {LEGAL.editor} ;</li>
            <li>Utiliser le site pour harceler qui que ce soit, réel ou fictif.</li>
          </ul>
        </article>

        <article className="glass-panel legal-section">
          <p className="eyebrow">ARTICLE 6</p>
          <h2>Boutique & commandes</h2>
          <p>
            Les produits présentés (CD, t shirt, mug...) peuvent être indicatifs ou en cours de
            déploiement. Les prix affichés, visuels et disponibilités peuvent évoluer. Une commande
            n&apos;est définitive que si un processus de paiement clairement indiqué le confirme.
            En cas de doute, écris à{" "}
            <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a> avant de vider ton compte en
            gâteaux (métaphoriquement).
          </p>
        </article>

        <article className="glass-panel legal-section">
          <p className="eyebrow">ARTICLE 7</p>
          <h2>Responsabilité</h2>
          <p>
            Le site est fourni &laquo;&nbsp;en l&apos;état&nbsp;&raquo;. On fait de notre mieux pour une
            expérience sincère et stable, mais on ne garantit pas l&apos;absence totale de bugs,
            de liens morts, ou de morceaux qui restent en boucle dans ta tête à 2h du matin.
          </p>
          <p>
            {LEGAL.editor} et {LEGAL.creator} ne sauraient être tenus responsables des dommages
            indirects liés à l&apos;utilisation du site, ni de l&apos;interprétation littérale de
            paroles de chansons écrites entre deux humeurs.
          </p>
        </article>

        <article className="glass-panel legal-section">
          <p className="eyebrow">ARTICLE 8</p>
          <h2>Liens externes</h2>
          <p>
            Le site peut contenir des liens vers des services tiers (réseaux sociaux, hébergeurs
            audio, etc.). On ne contrôle pas leurs contenus. Clique avec la même prudence que quand
            tu ouvres un DM suspect, mais avec plus de style.
          </p>
        </article>

        <article className="glass-panel legal-section">
          <p className="eyebrow">ARTICLE 9</p>
          <h2>Modification des CGU</h2>
          <p>
            Ces conditions peuvent être mises à jour pour suivre la loi, le projet, ou une nouvelle
            humeur du mardi. La version en vigueur est celle publiée sur cette page, avec sa date
            de révision ci-dessous.
          </p>
        </article>

        <article className="glass-panel legal-section">
          <p className="eyebrow">ARTICLE 10</p>
          <h2>Droit applicable & contact</h2>
          <p>
            Les présentes CGU sont soumises au droit français. En cas de litige, et après tentative
            de résolution amiable (toujours mieux qu&apos;un solo de colère), les tribunaux
            compétents seront ceux prévus par la loi.
          </p>
          <p>
            Questions légales, signalements ou messages sincères :{" "}
            <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>.
          </p>
          <p className="muted legal-revision">Dernière mise à jour : mai 2026.</p>
        </article>
      </section>

      <p className="legal-back muted">
        Pour l&apos;identité de l&apos;éditeur, l&apos;hébergement et le debrief intelligence
        artificielle, voir les{" "}
        <Link href="/mentions-legales">mentions légales</Link>.
      </p>
    </div>
  );
}
