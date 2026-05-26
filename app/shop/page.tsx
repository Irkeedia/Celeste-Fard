import Image from "next/image";

const products = [
  {
    title: "CD Velours Brut",
    price: "17",
    badge: "Edition debut",
    image: "/image/shopcdok.png",
    note: "Album signe, pochette mate, le debut de l era.",
  },
  {
    title: "T shirt Celeste Club",
    price: "34",
    badge: "Unisex",
    image: "/image/shoptshirt.png",
    note: "Coupe confort, logo discret, pour les soirees studio.",
  },
  {
    title: "Mug roux naturel",
    price: "15",
    badge: "Cafe quantique",
    image: "/image/shopmug.png",
    note: "Pour le cafe du matin avant les cours de physique.",
  },
];

const packaging = [
  { label: "CD signe", detail: "Dedicaçe a la main" },
  { label: "Carte postale", detail: "Message sincere" },
  { label: "Emballage sobre", detail: "Recyclable, sans bling" },
  { label: "Sticker edition", detail: "A coller ou pas" },
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

      <section className="shop-grid">
        {products.map((product) => (
          <article key={product.title} className="shop-card">
            <div className="shop-card-media">
              <span className="shop-card-badge">{product.badge}</span>
              <div className="shop-card-stage">
                <div className="shop-card-frame">
                  <div className="shop-card-image">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      unoptimized
                      sizes="(max-width: 860px) 100vw, 320px"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="shop-card-body">
              <h3>{product.title}</h3>
              <p className="shop-card-note">{product.note}</p>
              <div className="shop-card-footer">
                <p className="shop-card-price">
                  <span className="shop-card-price-value">{product.price}</span>
                  <span className="shop-card-price-currency">EUR</span>
                </p>
                <button type="button" className="cta-primary shop-card-btn">
                  Acheter
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="section-block shop-packaging">
        <div className="section-heading">
          <p className="eyebrow">PACKAGING</p>
          <h2>Ce que tu recois, sans fioritures</h2>
        </div>
        <div className="shop-packaging-grid">
          {packaging.map((item) => (
            <article key={item.label} className="shop-packaging-card glass-panel">
              <span className="shop-packaging-dot" aria-hidden />
              <div>
                <strong>{item.label}</strong>
                <p className="muted">{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
