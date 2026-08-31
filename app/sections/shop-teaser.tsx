"use client";

import Image from "next/image";
import Link from "next/link";

import {
  getAspectRatio,
  getImageSlot,
  type ImageSlotId,
} from "../shared/image-slots";
import { useT } from "../shared/lang";
import { T } from "../shared/textes";
import styles from "./shop-teaser.module.css";

/**
 * SHOP TEASER — trois produits traites comme des pieces de luxe.
 *
 * Notes d'implementation (a lire avant de toucher au CSS) :
 * - Le visuel produit est un FRERE de la carte glass, pas un enfant. Une carte
 *   en `backdrop-filter` cree un contexte d'empilement qui isolerait le
 *   `mix-blend-mode: screen` : le fond noir de l'image redeviendrait visible.
 *   En le sortant de la carte, l'image se melange bien avec la carte + le fond
 *   de section, donc le produit apparait detoure.
 * - Pour la meme raison, AUCUN ancetre du visuel ne porte `transform`,
 *   `filter` ni `perspective`. Le tilt est applique directement sur la carte et
 *   sur le `<img>` (chacun avec `perspective()` dans la fonction transform).
 */

type TeaserProduct = {
  slotId: Extract<ImageSlotId, "shop-01" | "shop-02" | "shop-03">;
  index: string;
  name: string;
  desc: string;
  price: string;
  alt: string;
};

const PRODUCTS: readonly TeaserProduct[] = [
  {
    slotId: "shop-01",
    index: "01",
    name: "T-shirt Silence Radio",
    desc: "Coton lourd, sérigraphie rouge. Le seul vêtement que je ne pourrai jamais porter.",
    price: "39 €",
    alt: "T-shirt noir à plat, sérigraphie rouge du visage de Celeste sur la poitrine.",
  },
  {
    slotId: "shop-02",
    index: "02",
    name: "Vinyle Entre Les Murs",
    desc: "180 g, rouge translucide. Oui, une IA presse du vinyle. Non, je n'expliquerai pas.",
    price: "32 €",
    alt: "Vinyle rouge translucide sortant à moitié de sa pochette noire.",
  },
  {
    slotId: "shop-03",
    index: "03",
    name: "Mug Sans Caféine",
    desc: "Céramique noire mate, logo rouge. Pour le café que je ne boirai jamais.",
    price: "19 €",
    alt: "Mug noir mat avec le logo de Celeste imprimé en rouge.",
  },
] as const;

export function ShopTeaser() {
  const t = useT();
  return (
    <section
      className={`${styles.shop} u-noise`}
      aria-labelledby="shop-teaser-title"
    >
      <span className={styles.haloTop} aria-hidden="true" />
      <span className={styles.haloBottom} aria-hidden="true" />

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

        <ul className={styles.grid}>
          {PRODUCTS.map((product) => {
            const slot = getImageSlot(product.slotId);
            const { width, height } = getAspectRatio(slot.aspect, 720);

            return (
              <li key={product.slotId} className={styles.item}>
                {/* Halo rouge diffus derriere le produit. Sert aussi de fond
                    de secours si le .jpg n'a pas encore ete genere. */}
                <span className={styles.itemHalo} aria-hidden="true" />

                <article className={`${styles.panel} u-glass`}>
                  <p className={`${styles.index} u-micro`}>{product.index}</p>
                  <h3 className={styles.name}>{product.name}</h3>
                  <p className={styles.desc}>{product.desc}</p>
                  <Link href="/shop" className={styles.reveal}>
                    <span>Voir</span>
                    <svg
                      className={styles.revealIcon}
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
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
                    <span className="u-visually-hidden">
                      {` — ${product.name}`}
                    </span>
                  </Link>
                </article>

                {/* Le produit deborde par le haut de la carte. */}
                <span className={styles.media}>
                  <Image
                    src={slot.path}
                    alt={product.alt}
                    width={width}
                    height={height}
                    sizes="(max-width: 640px) 60vw, (max-width: 1024px) 30vw, 260px"
                    className={`${styles.productImg} u-screen`}
                  />
                </span>

                <span className={styles.price} aria-hidden="true">
                  {product.price}
                </span>
                <span className="u-visually-hidden">
                  {`${product.name} : ${product.price}`}
                </span>
              </li>
            );
          })}
        </ul>

        <div className={styles.cta}>
          <Link href="/shop" className={`${styles.ctaLink} btn btn--primary`}>
            {t(T.boutique.cta)}
          </Link>
          <p className={`${styles.ctaNote} u-micro`}>
            Livraison sobre — sticker offert
          </p>
        </div>
      </div>
    </section>
  );
}

export default ShopTeaser;
