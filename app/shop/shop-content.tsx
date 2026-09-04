"use client";

import Image from "next/image";
import Link from "next/link";

import { getImageSlot } from "../shared/image-slots";
import { useT } from "../shared/lang";
import { PRODUITS } from "../shared/produits";
import styles from "./shop-page.module.css";
import { TShop } from "./shop-textes";

/**
 * BOUTIQUE — contenu, en planche contact. Composant CLIENT.
 *
 * Pourquoi ce fichier est separe de `page.tsx` : `useT()` est un hook, il
 * ne peut vivre que dans un composant client ; or `export const metadata`
 * n'est lu par Next QUE dans un composant serveur. Les deux ne peuvent
 * pas cohabiter. Motif applique a toutes les pages secondaires du site.
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

/** La derniere piece occupe la grande case, a droite : planche en miroir. */
const PIECES_TETE = PRODUITS.slice(0, -1);
const PIECE_LEAD = PRODUITS[PRODUITS.length - 1];

export function ShopContent() {
  const t = useT();

  /* Les trois raisons sont ecrites a plat dans les textes plutot que dans
     un tableau : elles ne sont ni dynamiques ni reordonnables, et les
     garder nommees rend le fichier de traduction lisible. */
  const raisons = [
    { num: "01", titre: TShop.raison1Titre, texte: TShop.raison1Texte },
    { num: "02", titre: TShop.raison2Titre, texte: TShop.raison2Texte },
    { num: "03", titre: TShop.raison3Titre, texte: TShop.raison3Texte },
  ] as const;

  return (
    <>
      {/* ---------------------------------------------------
          1. HERO DE PAGE
          --------------------------------------------------- */}
      <section className={`${styles.hero} u-noise`} aria-labelledby="shop-title">
        <span className={styles.heroHalo} aria-hidden="true" />

        <div className={styles.inner}>
          <p className={`${styles.kicker} u-micro`}>{t(TShop.kicker)}</p>

          {/* Le titre display occupe TOUTE la largeur du conteneur : c'est ce
              qui permet de tenir `--fs-display` sans casser en quatre lignes
              sur grand ecran. Le duo texte / vignette suit en bande. */}
          <h1 id="shop-title" className={styles.heroTitle}>
            {t(TShop.titre1)}
            <br />
            {t(TShop.titre2)}{" "}
            <span className={`${styles.titleAccent} u-grad-text`}>
              {t(TShop.titreAccent)}
            </span>
            .
          </h1>

          <div className={styles.heroBand}>
            <div className={styles.heroCopy}>
              <p className={styles.heroLede}>{t(TShop.lede)}</p>

              <p className={`${styles.heroNotice} u-micro`}>
                <span className={styles.noticeDot} aria-hidden="true" />
                {t(TShop.notice)}
              </p>
            </div>

            {/* Illustration a fond BLANC : surtout pas de `u-screen`. */}
            <figure className={styles.heroSticker}>
              <span className={styles.heroStickerFrame}>
                <Image
                  src="/image/cartoon/cartoon-vinyle.jpg"
                  alt={t(TShop.altCartoonVinyle)}
                  width={1024}
                  height={1024}
                  priority
                  sizes="(max-width: 860px) 60vw, 17rem"
                  className={styles.heroStickerImg}
                />
              </span>
              <figcaption className={`${styles.heroStickerCap} u-micro`}>
                {t(TShop.stickerHero)}
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
            <p className={`${styles.kicker} u-micro`}>{t(TShop.vestiaire)}</p>
            <h2 id="shop-products-title" className={styles.headTitle}>
              {t(TShop.vestiaireTitre)}
            </h2>
            <p className={styles.headLede}>{t(TShop.vestiaireLede)}</p>
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
                  <h3 className={styles.cartelName}>{t(produit.name)}</h3>
                  <p className={`${styles.cartelSpec} u-micro`}>
                    {t(produit.spec)}
                  </p>
                  <p className={styles.cartelDesc}>{t(produit.desc)}</p>
                  <p className={styles.cartelNote}>{t(produit.note)}</p>
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
                      {t(TShop.bientot)}
                      <span className="u-visually-hidden">
                        {" "}
                        {t(TShop.bientotDetail)
                          .replace("{name}", t(produit.name))
                          .replace("{price}", produit.price)}
                      </span>
                    </span>
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <p className={styles.disclaimer}>{t(TShop.disclaimer)}</p>
        </div>
      </section>

      {/* ---------------------------------------------------
          3. POURQUOI SI PEU DE PRODUITS
          --------------------------------------------------- */}
      <section className={`${styles.why} u-noise`} aria-labelledby="shop-why-title">
        <div className={styles.inner}>
          <div className={styles.whyHead}>
            <p className={`${styles.kicker} u-micro`}>{t(TShop.raisonKicker)}</p>
            <h2 id="shop-why-title" className={styles.whyTitle}>
              {t(TShop.raisonTitre)}
            </h2>
            <p className={styles.whyLede}>{t(TShop.raisonLede)}</p>
          </div>

          {/* Trois colonnes separees par des filets, dans le meme langage que
              la planche : pas de cartes arrondies. */}
          <ul className={styles.reasons}>
            {raisons.map((raison) => (
              <li key={raison.num} className={styles.reason}>
                <span className={`${styles.reasonNum} u-micro`}>
                  {raison.num}
                </span>
                <h3 className={styles.reasonTitle}>{t(raison.titre)}</h3>
                <p className={styles.reasonText}>{t(raison.texte)}</p>
              </li>
            ))}
          </ul>

          {/* Illustration a fond BLANC : surtout pas de `u-screen`. */}
          <figure className={styles.whySticker}>
            <span className={styles.whyStickerFrame}>
              <Image
                src="/image/cartoon/cartoon-clindoeil.jpg"
                alt={t(TShop.altCartoonClinDoeil)}
                width={1024}
                height={1024}
                sizes="(max-width: 860px) 40vw, 12rem"
                className={styles.whyStickerImg}
              />
            </span>
            <figcaption className={`${styles.whyStickerCap} u-micro`}>
              {t(TShop.stickerWhy)}
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
            <p className={`${styles.kicker} u-micro`}>{t(TShop.outroKicker)}</p>
            <h2 id="shop-outro-title" className={styles.outroTitle}>
              {t(TShop.outroTitre)}
            </h2>
            <p className={styles.outroText}>{t(TShop.outroTexte)}</p>

            <div className={styles.outroActions}>
              <Link
                href="/music"
                className={`${styles.action} ${styles.actionPrimary}`}
              >
                <span>{t(TShop.outroEcouter)}</span>
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
                {t(TShop.outroRetour)}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
