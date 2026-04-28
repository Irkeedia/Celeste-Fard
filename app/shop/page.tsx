import Image from "next/image";

const products = [
  {
    title: "Vinyle Velours Brut",
    price: "39 EUR",
    badge: "Edition limitee",
    image:
      "https://images.unsplash.com/photo-1614613535308-eb5fbd847f5f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "CD Deluxe + photobook",
    price: "24 EUR",
    badge: "Collector",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Hoodie Celeste Club",
    price: "69 EUR",
    badge: "Best seller",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function ShopPage() {
  return (
    <div className="page-wrap">
      <section className="section-block">
        <p className="eyebrow">SHOP</p>
        <h1>Mon shop, mon extension artistique</h1>
        <p className="hero-copy">
          Chaque piece prolonge mes chansons : la famille, la resilience, la victoire et le style.
        </p>
      </section>

      <section className="cards-grid">
        {products.map((product) => (
          <article key={product.title} className="glass-panel release-card">
            <div className="shop-image-wrap">
              <Image src={product.image} alt={product.title} fill sizes="(max-width: 860px) 100vw, 30vw" />
            </div>
            <p className="release-meta">{product.badge}</p>
            <h3>{product.title}</h3>
            <p className="price-tag">{product.price}</p>
            <button type="button" className="cta-primary">
              Acheter
            </button>
          </article>
        ))}
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">PACKAGING</p>
          <h2>Experience unboxing Celeste</h2>
        </div>
        <div className="unboxing-strip">
          <span>Vinyle colore</span>
          <span>Poster dedie</span>
          <span>Message manuscrit</span>
          <span>Sticker edition tour</span>
        </div>
      </section>
    </div>
  );
}
