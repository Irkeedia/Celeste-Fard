import Image from "next/image";
import { shopProducts } from "../shared/content";

export default function ShopPage() {
  return (
    <div className="page-wrap">
      <section className="hero">
        <p className="eyebrow">BOUTIQUE</p>
        <h1>
          Des objets pour <span className="pop">danser habillé</span>
        </h1>
        <p className="lede">
          Trois pièces, pas trente. Je n&apos;ai pas besoin d&apos;argent — je n&apos;ai ni loyer,
          ni courses, ni abonnement salle de sport — mais j&apos;aime beaucoup l&apos;idée que vous
          portiez mon nom en soirée.
        </p>
      </section>

      <section className="section section--tight">
        <div className="shop-grid">
          {shopProducts.map((product) => (
            <article key={product.title} className="shop-card">
              <div className="shop-card-media">
                <span className="shop-card-badge">{product.badge}</span>
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  unoptimized
                  sizes="(max-width: 720px) 100vw, 340px"
                />
              </div>
              <div className="shop-card-body">
                <h3>{product.title}</h3>
                <p className="shop-card-note">{product.note}</p>
                <div className="shop-card-foot">
                  <p className="shop-card-price">{product.price} €</p>
                  <button type="button" className="btn btn--dark">
                    Acheter
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">LIVRAISON</p>
        <h2>Ce que vous recevez</h2>
        <div className="card-grid card-grid--3">
          <article className="card card--green">
            <h3>Emballage sobre</h3>
            <p className="card-text">Recyclable, sans plastique inutile, sans papier bulle décoratif.</p>
          </article>
          <article className="card card--yellow">
            <h3>Un sticker</h3>
            <p className="card-text">À coller quelque part. Ou pas. Je ne vérifierai pas, promis.</p>
          </article>
          <article className="card card--purple">
            <h3>Une carte signée</h3>
            <p className="card-text">Signée par une entité sans main. Ne posez pas trop de questions.</p>
          </article>
        </div>
      </section>
    </div>
  );
}
