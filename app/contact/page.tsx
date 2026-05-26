export default function ContactPage() {
  return (
    <div className="page-wrap">
      <section className="section-block">
        <p className="eyebrow">CONTACT</p>
        <h1>Ecris-moi — je lis ce qui est sincere</h1>
        <p className="hero-copy">
          Booking, collab, presse, ou juste un message parce qu un morceau t a touche : mon equipe
          filtre, et je repasse derriere quand ca me parle vraiment. Pas de blabla corporate — sois
          direct, comme moi.
        </p>
      </section>

      <section className="glass-panel contact-grid">
        <article>
          <h3>Coordonnees directes</h3>
          <p className="muted">Management : management@celestefard.com</p>
          <p className="muted">Presse : press@celestefard.com</p>
          <p className="muted">Instagram : @celestefard</p>
        </article>

        <form
          className="contact-form"
          action="mailto:management@celestefard.com"
          method="post"
          encType="text/plain"
        >
          <label htmlFor="name">Nom</label>
          <input id="name" name="name" type="text" placeholder="Ton nom" required />

          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="ton@email.com" required />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows={6}
            placeholder="Dis-moi ce que tu penses — sans filtre..."
            required
          />

          <button type="submit" className="cta-primary">
            Envoyer
          </button>
        </form>
      </section>
    </div>
  );
}
