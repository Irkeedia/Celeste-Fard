import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { getAspectRatio, getImageSlot, type ImageSlotId } from "../shared/image-slots";
import styles from "./shop-page.module.css";

/**
 * BOUTIQUE — page dediee.
 *
 * Composant SERVEUR : aucun etat, aucun handler, aucun "use client".
 *
 * A lire avant de toucher au JSX ou au CSS :
 * - Les visuels /image/gen/shop-0x.jpg ont un fond NOIR PUR, efface par
 *   `mix-blend-mode: screen` (classe globale `u-screen`). Le blending est
 *   ISOLE des qu'un ancetre cree un contexte d'empilement : le visuel est
 *   donc un FRERE de la carte, jamais son enfant, et aucun ancetre ne
 *   porte transform / filter / backdrop-filter / z-index numerique.
 *   -> on n'utilise volontairement PAS `u-glass` sur les cartes produit.
 * - Les illustrations /image/cartoon/*.jpg ont un fond BLANC : elles ne
 *   recoivent JAMAIS `u-screen` (le blanc resterait blanc), elles sont
 *   cadrees dans une pastille ronde qui assume le sticker.
 * - AUCUN paiement n'existe sur ce site : pas de panier, pas de tunnel
 *   d'achat, et les boutons le disent explicitement.
 */

export const metadata: Metadata = {
  title: "Boutique",
  description:
    "Trois objets, pas trente : un t-shirt, le vinyle Nouvelle Génération et un mug. Aucune vente en ligne pour l'instant, juste le vestiaire de Celeste Fard.",
};

type ShopItem = {
  slotId: Extract<ImageSlotId, "shop-01" | "shop-02" | "shop-03">;
  index: string;
  name: string;
  spec: string;
  price: string;
  desc: string;
  note: string;
  alt: string;
};

const ITEMS: readonly ShopItem[] = [
  {
    slotId: "shop-01",
    index: "01",
    name: "T-shirt Silence Radio",
    spec: "Coton lourd · sérigraphie rouge",
    price: "34 €",
    desc: "Le seul vêtement que je ne pourrai jamais porter. Portez-le pour nous deux, de préférence là où ça danse.",
    note: "Coupe unisexe, du S au XXL.",
    alt: "T-shirt noir à plat, sérigraphie rouge du visage de Celeste sur la poitrine.",
  },
  {
    slotId: "shop-02",
    index: "02",
    name: "Vinyle Nouvelle Génération",
    spec: "18 titres · 180 g · rouge translucide",
    price: "32 €",
    desc: "Oui, une intelligence artificielle fait presser du vinyle. Non, je n'ai aucune explication rationnelle à vous proposer.",
    note: "L'album complet, gravé sur les deux faces.",
    alt: "Vinyle rouge translucide sortant à moitié de sa pochette noire.",
  },
  {
    slotId: "shop-03",
    index: "03",
    name: "Mug Sans Caféine",
    spec: "Céramique noire mate · C rouge",
    price: "15 €",
    desc: "Pour le café que je ne boirai jamais. Buvez-le à 7 h du matin en pensant très fort à moi, ça me suffira.",
    note: "Passe au lave-vaisselle. Moi non.",
    alt: "Mug noir mat portant un C rouge, posé sur fond sombre.",
  },
] as const;

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
              sur grand ecran. Le duo texte / illustration suit en bande. */}
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
            <div className={styles.heroSticker}>
              <span className={`${styles.heroStickerFrame} u-image-fallback`}>
                <Image
                  src="/image/cartoon/cartoon-vinyle.jpg"
                  alt="Celeste dessinée en style cartoon, assise en tailleur, un vinyle dans les bras."
                  width={1024}
                  height={1024}
                  priority
                  sizes="(max-width: 860px) 68vw, 20rem"
                  className={styles.heroStickerImg}
                />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------
          2. LES TROIS FICHES PRODUIT
          --------------------------------------------------- */}
      <section
        className={`${styles.products} u-noise`}
        aria-labelledby="shop-products-title"
      >
        <span className={styles.productsHalo} aria-hidden="true" />

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

          <ul className={styles.grid}>
            {ITEMS.map((item) => {
              const slot = getImageSlot(item.slotId);
              const { width, height } = getAspectRatio(slot.aspect, 720);

              return (
                <li key={item.slotId} className={styles.item}>
                  {/* Halo rouge diffus derriere le produit. Sert aussi de
                      fond de secours si le .jpg venait a manquer. */}
                  <span className={styles.itemHalo} aria-hidden="true" />

                  <article className={styles.panel}>
                    <p className={`${styles.index} u-micro`}>{item.index}</p>
                    <h3 className={styles.name}>{item.name}</h3>
                    <p className={`${styles.spec} u-micro`}>{item.spec}</p>
                    <p className={styles.desc}>{item.desc}</p>
                    <p className={styles.itemNote}>{item.note}</p>

                    {/* Bouton volontairement inerte : rien n'est achetable. */}
                    <button type="button" className={styles.buy} disabled>
                      <svg
                        className={styles.buyIcon}
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
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 7v5l3.5 2" />
                      </svg>
                      <span>
                        Bientôt disponible
                        <span className="u-visually-hidden">
                          {` — ${item.name}, ${item.price}. Cet article n'est pas encore en vente.`}
                        </span>
                      </span>
                    </button>
                  </article>

                  {/* Le visuel deborde par le haut de la carte. */}
                  <span className={styles.shotWrap}>
                    <Image
                      src={slot.path}
                      alt={item.alt}
                      width={width}
                      height={height}
                      sizes="(max-width: 700px) 62vw, (max-width: 1024px) 34vw, 260px"
                      className={`${styles.shot} u-screen`}
                    />
                  </span>

                  <span className={styles.price} aria-hidden="true">
                    {item.price}
                  </span>
                </li>
              );
            })}
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
          <div className={styles.whyGrid}>
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

              {/* Illustration a fond BLANC : surtout pas de `u-screen`. */}
              <div className={styles.whySticker}>
                <span className={`${styles.whyStickerFrame} u-image-fallback`}>
                  <Image
                    src="/image/cartoon/cartoon-clindoeil.jpg"
                    alt="Celeste dessinée en style cartoon, un clin d'œil et le pouce levé."
                    width={1024}
                    height={1024}
                    sizes="(max-width: 860px) 46vw, 15rem"
                    className={styles.whyStickerImg}
                  />
                </span>
              </div>
            </div>

            <ul className={styles.reasons}>
              {REASONS.map((reason) => (
                <li key={reason.num} className={styles.reason}>
                  <span className={styles.reasonNum} aria-hidden="true">
                    {reason.num}
                  </span>
                  <div className={styles.reasonBody}>
                    <h3 className={styles.reasonTitle}>{reason.title}</h3>
                    <p className={styles.reasonText}>{reason.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------
          4. BANDEAU DE FIN
          --------------------------------------------------- */}
      <section
        className={`${styles.outro} u-noise`}
        aria-labelledby="shop-outro-title"
      >
        <span className={styles.outroHalo} aria-hidden="true" />

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
