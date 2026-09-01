"use client";

import Image from "next/image";
import Link from "next/link";

import { getImageSlot } from "../shared/image-slots";
import { useT } from "../shared/lang";
import { PRODUITS } from "../shared/produits";
import { T } from "../shared/textes";
import styles from "./shop-teaser.module.css";

/**
 * SHOP TEASER — planche contact.
 *
 * Ancienne version : trois cartes glass identiques, centrees, avec le
 * visuel qui debordait par le haut et une pastille de prix rouge. C'etait
 * exactement la mise en page de la page /shop : cliquer "Toute la
 * boutique" ne recompensait rien, on avait l'impression de ne pas avoir
 * bouge. Et trois cartes symetriques, c'est un gabarit e-commerce.
 *
 * Nouvelle version : une planche de contact. Une grille asymetrique de
 * cases separees par des filets de 1px, beaucoup de noir, des legendes
 * minuscules en bas de case, et le rouge reserve au numero de planche et
 * au trait qui s'allume au survol. La home montre la serie ; la page
 * /shop montre la serie PLUS les cartels detailles.
 *
 * Notes d'implementation (a lire avant de toucher au CSS) :
 * - Les visuels /image/gen/shop-0x.jpg ont un fond NOIR PUR, efface par
 *   `mix-blend-mode: screen` (classe globale `u-screen`) : le produit
 *   flotte donc dans la case, sans decoupe ni detourage manuel.
 *   Le blending est ISOLE des qu'un ANCETRE du <img> cree un contexte
 *   d'empilement. Entre la <section> et le <img> : PAS de `transform`,
 *   PAS de `filter`, PAS de `backdrop-filter`, PAS de `z-index`
 *   numerique, PAS d'`isolation`, PAS d'`opacity` < 1.
 *   -> le lien de case reste en `z-index: auto`, et l'animation de survol
 *      est posee sur le <img> lui-meme (un element en `mix-blend-mode`
 *      cree deja son propre contexte : un `transform` dessus est sans
 *      consequence) et sur des FRERES de l'image.
 * - `object-fit: contain` et non `cover` : les visuels sont carres, les
 *   cases ne le sont pas. `cover` rognerait le produit ; `contain` laisse
 *   respirer le noir, qui disparait de toute facon avec le `screen`.
 */

/** La premiere piece occupe la grande case de gauche, sur deux rangees. */
const [PIECE_UNE, ...PIECES_SUITE] = PRODUITS;

export function ShopTeaser() {
  const t = useT();

  return (
    <section
      className={`${styles.shop} u-noise`}
      aria-labelledby="shop-teaser-title"
    >
      <span className={styles.halo} aria-hidden="true" />

      <div className={styles.inner}>
        <header className={styles.head}>
          <p className={`${styles.kicker} u-micro`}>{t(T.boutique.kicker)}</p>
          <h2 id="shop-teaser-title" className={styles.title}>
            {t(T.boutique.t1)}{" "}
            <span className={`${styles.titleAccent} u-grad-text`}>
              {t(T.boutique.t2)}
            </span>
          </h2>
          <p className={styles.lede}>{t(T.boutique.lede)}</p>
        </header>

        {/* La planche : filets de 1px obtenus par `gap` sur un fond clair,
            chaque case repeignant un fond opaque par-dessus. */}
        <ul className={styles.plate}>
          <ShopCell produit={PIECE_UNE} lead />
          {PIECES_SUITE.map((produit) => (
            <ShopCell key={produit.slotId} produit={produit} />
          ))}
        </ul>

        <div className={styles.cta}>
          <Link href="/shop" className={styles.ctaLink}>
            <span>{t(T.boutique.cta)}</span>
            <svg
              className={styles.ctaIcon}
              viewBox="0 0 24 24"
              width="15"
              height="15"
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
          <p className={`${styles.ctaNote} u-micro`}>
            Aucune vente en ligne — pas encore
          </p>
        </div>
      </div>
    </section>
  );
}

/** Une case de la planche. `lead` = la grande case, seule a porter le pitch. */
function ShopCell({
  produit,
  lead = false,
}: {
  produit: (typeof PRODUITS)[number];
  lead?: boolean;
}) {
  const slot = getImageSlot(produit.slotId);

  return (
    <li className={`${styles.cell} ${lead ? styles.cellLead : ""}`}>
      {/* Toute la case est cliquable : la cible tactile fait la case
          entiere, il n'y a donc pas de petit bouton "Voir" a viser. */}
      <Link href="/shop" className={styles.cellLink}>
        {/* Surtout PAS `u-image-fallback` ici : cet utilitaire peint un
            degrade en permanence, pas seulement quand l'image manque. Sous
            un visuel en `contain` il baverait tout autour du produit. Si le
            .jpg venait a manquer, `img[data-img-failed]` (globals.css) rend
            l'image transparente et la case reste noire — ce qui, dans une
            planche contact, se lit comme une case vide et non comme un bug. */}
        <span className={styles.frame}>
          <Image
            src={slot.path}
            alt={produit.alt}
            width={720}
            height={720}
            sizes="(max-width: 860px) 92vw, (max-width: 1180px) 44vw, 520px"
            className={`${styles.shot} u-screen`}
          />
        </span>

        <span className={styles.caption}>
          <span className={styles.captionLine}>
            <span className={`${styles.idx} u-micro`}>{produit.index}</span>
            <span className={styles.name}>{produit.name}</span>
            <span className={styles.price}>{produit.price}</span>
          </span>
          {lead ? <span className={styles.pitch}>{produit.pitch}</span> : null}
        </span>

        {/* Le seul rouge de la case, et seulement au survol. */}
        <span className={styles.rule} aria-hidden="true" />
      </Link>
    </li>
  );
}

export default ShopTeaser;
