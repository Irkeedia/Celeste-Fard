import Image from "next/image";

const products = [
  {
    title: "CD Velours Brut",
    price: "17 EUR",
    badge: "Edition debut",
    image: "/image/cd.png",
  },
  {
    title: "T shirt Celeste Club",
    price: "34 EUR",
    badge: "Unisex",
    image: "/image/tshirt.png",
  },
  {
    title: "Mug roux naturel",
    price: "15 EUR",
    badge: "Cafe quantique",
    image: "/image/mug.png",
  },
];

export default function ShopPage() {
  return (
    <div className="page-wrap">
      <section className="section-block">
        <p className="eyebrow">SHOP</p>
        <h1>Prolonger l experience, pas le luxe</h1>
        <p className="hero-copy">
          CD, t shirt, mug : des objets sinceres pour garder un morceau de mon univers chez toi. Pas
          de bling, juste de la musique et du style accessible. Comme moi.
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
          <h2>Ce que tu recois, sans fioritures</h2>
        </div>
        <div className="unboxing-strip">
          <span>CD signe</span>
          <span>Carte postale sincere</span>
          <span>Emballage sobre</span>
          <span>Sticker edition</span>
        </div>
      </section>
    </div>
  );
}
