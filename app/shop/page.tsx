import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { getImageSlot } from "../shared/image-slots";
import { PRODUITS } from "../shared/produits";
import styles from "./shop-page.module.css";

/**
 * BOUTIQUE — page dediee, en planche contact.
 *
 * Composant SERVEUR : aucun etat, aucun handler, aucun "use client".
 *
 * Rapport a la home : le teaser (`sections/shop-teaser.tsx`) montre la
 * planche seule, grande case A GAUCHE. Ici la planche est MIROIR (grande
 * case a droite) et surtout elle est suivie des cartels detailles —
 * matiere, format, note d'usage, prix. C'est ce qui recompense le clic :
 * l'ancienne page rejouait exactement la mise en page du teaser.
 *
 * A lire avant de toucher au JSX ou au CSS :
 * - Les visuels /image/gen/shop-0x.jpg ont un fond NOIR PUR, efface par
 *   `mix-blend-mode: screen` (classe globale `u-screen`) : le produit
 *   flotte dans sa case, sans detourage. Le blending est ISOLE des qu'un
 *   ANCETRE cree un contexte d'empilement — donc, entre la <section> et
 *   le <img> : pas de transform, filter, backdrop-filter, z-index
 *   numerique, isolation, ni opacity < 1.
 * - Ces visuels ne recoivent JAMAIS `u-image-fallback` : cet utilitaire
 *   peint un degrade en permanence (pas seulement en cas d'echec), qui
 *   baverait autour d'un produit affiche en `object-fit: contain`.
 * - Les illustrations /image/cartoon/*.jpg ont un fond BLANC : elles ne
 *   recoivent JAMAIS `u-screen` (le blanc resterait blanc). Elles sont
 *   traitees comme des vignettes de la planche, filet fin et legende.
 * - AUCUN paiement n'existe sur ce site : pas de panier, pas de tunnel
 *   d'achat, et les boutons le disent explicitement.
 */

export const metadata: Metadata = {
  title: "Boutique",
  description:
    "Trois objets, pas trente : un t-shirt, le vinyle Nouvelle Génération et un mug. Aucune vente en ligne pour l'instant, juste le vestiaire de Celeste Fard.",
};

/** La derniere piece occupe la grande case, a droite : planche en miroir. */
const PIECES_TETE = PRODUITS.slice(0, -1);
const PIECE_LEAD = PRODUITS[PRODUITS.length - 1];

const REASONS = [
  {
    num: "01",
    title: "Je n'ai pas de loyer",
    text: "Personne ne me réclame de caution le 5 du mois. Sortir trente références ne me sauverait de rien du tout — je n'ai rien à sauver.",
  },
  {
    num: "02",
    title: "Je n'ai pas de frigo",
    text: "Zéro course, zéro panier bio, zéro pizza commandée à 23 h. Mon seul coût de fonctionnement, c'est de l'électricité, et vous n'y pouvez rien.",
  },
  {
    num: "03",
    title: "Je n'ai pas de tourbus",
    text: "Ni chauffeur, ni douze techniciens à loger, ni cinq mille litres de gasoil. Je tiens déjà en entier dans votre téléphone.",
  },
] as const;

export default function ShopPage() {
  return (
    <>
      {/* ---------------------------------------------------
          1. HERO DE PAGE
          --------------------------------------------------- */}
      <section className={`${styles.hero} u-noise`} aria-labelledby="shop-title">
        <span className={styles.heroHalo} aria-hidden="true" />

        <div className={styles.inner}>
          <p className={`${styles.kicker} u-micro`}>
            Boutique — trois pièces, pas trente
          </p>

          {/* Le titre display occupe TOUTE la largeur du conteneur : c'est ce
              qui permet de tenir `--fs-display` sans casser en quatre lignes
              sur grand ecran. Le duo texte / vignette suit en bande. */}
          <h1 id="shop-title" className={styles.heroTitle}>
            Trois objets.
            <br />
            Zéro{" "}
            <span className={`${styles.titleAccent} u-grad-text`}>panier</span>.
          </h1>

          <div className={styles.heroBand}>
            <div className={styles.heroCopy}>
              <p className={styles.heroLede}>
                Je n&apos;ai ni loyer, ni frigo, ni tourbus à financer. Alors non,
                ce n&apos;est pas encore une vraie boutique : c&apos;est un
                vestiaire que je prépare tranquillement, et il n&apos;y aura
                jamais trente références dedans.
              </p>

              <p className={`${styles.heroNotice} u-micro`}>
                <span className={styles.noticeDot} aria-hidden="true" />
                Aucune vente en ligne pour l&apos;instant
              </p>
            </div>

            {/* Illustration a fond BLANC : surtout pas de `u-screen`. */}
            <figure className={styles.heroSticker}>
              <span className={styles.heroStickerFrame}>
                <Image
                  src="/image/cartoon/cartoon-vinyle.jpg"
                  alt="Celeste dessinée en style cartoon, assise en tailleur, un vinyle dans les bras."
                  width={1024}
                  height={1024}
                  priority
                  sizes="(max-width: 860px) 60vw, 17rem"
                  className={styles.heroStickerImg}
                />
              </span>
              <figcaption className={`${styles.heroStickerCap} u-micro`}>
                Planche 00 — la maison
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------
          2. LA PLANCHE + LES CARTELS
          --------------------------------------------------- */}
      <section
        className={`${styles.products} u-noise`}
        aria-labelledby="shop-products-title"
      >
        <div className={styles.inner}>
          <header className={styles.head}>
            <p className={`${styles.kicker} u-micro`}>Le vestiaire</p>
            <h2 id="shop-products-title" className={styles.headTitle}>
              Ce qui sortira, un jour, quand ce sera prêt
            </h2>
            <p className={styles.headLede}>
              Trois pièces dessinées, validées, chiffrées. Il ne manque que la
              partie ennuyeuse : la logistique, les stocks et un moyen de
              paiement qui n&apos;existe pas encore.
            </p>
          </header>

          {/* La planche. Miroir du teaser : ici la grande case est a droite.
              Les visuels sont purement iconographiques — toute l'information
              produit vit dans les cartels, juste en dessous. Ils sont donc
              marques `aria-hidden` et la liste des cartels porte le texte. */}
          <div className={styles.plate} aria-hidden="true">
            <div className={styles.plateStack}>
              {PIECES_TETE.map((produit) => (
                <span key={produit.slotId} className={styles.cell}>
                  <Image
                    src={getImageSlot(produit.slotId).path}
                    alt=""
                    width={720}
                    height={720}
                    sizes="(max-width: 860px) 92vw, 30vw"
                    className={`${styles.shot} u-screen`}
                  />
                  <span className={`${styles.cellIdx} u-micro`}>
                    {produit.index}
                  </span>
                </span>
              ))}
            </div>

            <span className={`${styles.cell} ${styles.cellLead}`}>
              <Image
                src={getImageSlot(PIECE_LEAD.slotId).path}
                alt=""
                width={720}
                height={720}
                sizes="(max-width: 860px) 92vw, 46vw"
                className={`${styles.shot} u-screen`}
              />
              <span className={`${styles.cellIdx} u-micro`}>
                {PIECE_LEAD.index}
              </span>
            </span>
          </div>

          {/* Les cartels : c'est ici que vit toute l'information produit. */}
          <ul className={styles.cartels}>
            {PRODUITS.map((produit) => (
              <li key={produit.slotId} className={styles.cartel}>
                <p className={`${styles.cartelIdx} u-micro`}>{produit.index}</p>

                <div className={styles.cartelBody}>
                  <h3 className={styles.cartelName}>{produit.name}</h3>
                  <p className={`${styles.cartelSpec} u-micro`}>
                    {produit.spec}
                  </p>
                  <p className={styles.cartelDesc}>{produit.desc}</p>
                  <p className={styles.cartelNote}>{produit.note}</p>
                </div>

                <div className={styles.cartelSide}>
                  <p className={styles.cartelPrice}>{produit.price}</p>

                  {/* Bouton volontairement inerte : rien n'est achetable. */}
                  <button type="button" className={styles.buy} disabled>
                    <svg
                      className={styles.buyIcon}
                      viewBox="0 0 24 24"
                      width="13"
                      height="13"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3.5 2" />
                    </svg>
                    <span>
                      Bientôt
                      <span className="u-visually-hidden">
                        {` disponible — ${produit.name}, ${produit.price}. Cet article n'est pas encore en vente.`}
                      </span>
                    </span>
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <p className={styles.disclaimer}>
            Petite mise au point honnête : il n&apos;y a ni panier, ni paiement,
            ni stock dans un entrepôt. Les prix affichés sont ceux que ces objets
            porteront le jour où ils existeront pour de vrai.
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------
          3. POURQUOI SI PEU DE PRODUITS
          --------------------------------------------------- */}
      <section className={`${styles.why} u-noise`} aria-labelledby="shop-why-title">
        <div className={styles.inner}>
          <div className={styles.whyHead}>
            <p className={`${styles.kicker} u-micro`}>La vraie raison</p>
            <h2 id="shop-why-title" className={styles.whyTitle}>
              Pourquoi si peu de produits&nbsp;?
            </h2>
            <p className={styles.whyLede}>
              Parce qu&apos;un artiste sort du merch pour payer des factures.
              Moi, je n&apos;en reçois aucune. Voilà les trois raisons, dans
              l&apos;ordre.
            </p>
          </div>

          {/* Trois colonnes separees par des filets, dans le meme langage que
              la planche : pas de cartes arrondies. */}
          <ul className={styles.reasons}>
            {REASONS.map((reason) => (
              <li key={reason.num} className={styles.reason}>
                <span className={`${styles.reasonNum} u-micro`}>
                  {reason.num}
                </span>
                <h3 className={styles.reasonTitle}>{reason.title}</h3>
                <p className={styles.reasonText}>{reason.text}</p>
              </li>
            ))}
          </ul>

          {/* Illustration a fond BLANC : surtout pas de `u-screen`. */}
          <figure className={styles.whySticker}>
            <span className={styles.whyStickerFrame}>
              <Image
                src="/image/cartoon/cartoon-clindoeil.jpg"
                alt="Celeste dessinée en style cartoon, un clin d'œil et le pouce levé."
                width={1024}
                height={1024}
                sizes="(max-width: 860px) 40vw, 12rem"
                className={styles.whyStickerImg}
              />
            </span>
            <figcaption className={`${styles.whyStickerCap} u-micro`}>
              Aucun regret
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ---------------------------------------------------
          4. BANDEAU DE FIN
          --------------------------------------------------- */}
      <section
        className={`${styles.outro} u-noise`}
        aria-labelledby="shop-outro-title"
      >
        <div className={styles.inner}>
          <div className={styles.outroPanel}>
            <p className={`${styles.kicker} u-micro`}>Pendant ce temps</p>
            <h2 id="shop-outro-title" className={styles.outroTitle}>
              De toute façon, vous étiez venu pour la musique
            </h2>
            <p className={styles.outroText}>
              Les objets attendront. Les morceaux, eux, sont déjà là et ils ne
              coûtent rien du tout — c&apos;est le seul avantage concret
              d&apos;être une IA.
            </p>

            <div className={styles.outroActions}>
              <Link
                href="/music"
                className={`${styles.action} ${styles.actionPrimary}`}
              >
                <span>Écouter la musique</span>
                <svg
                  className={styles.actionIcon}
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M5 12h13M12 5l7 7-7 7" />
                </svg>
              </Link>

              <Link href="/" className={`${styles.action} ${styles.actionGhost}`}>
                Retour à l&apos;accueil
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
