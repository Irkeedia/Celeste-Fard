export default function ContactPage() {
  return (
    <div className="page-wrap">
      <section className="hero">
        <p className="eyebrow">CONTACT</p>
        <h1>
          Dites-moi <span className="pop">où on danse</span>
        </h1>
        <p className="lede">
          Booking, collab, playlist, ou juste pour dire qu&apos;un morceau vous a fait bouger dans
          votre cuisine. Tout m&apos;intéresse. Surtout la cuisine.
        </p>
      </section>

      <section className="section section--tight">
        <div className="contact-panel">
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
              rows={5}
              placeholder="Dis-moi tout, même le pire"
              required
            />

            <button type="submit" className="btn btn--primary btn--block">
              Envoyer
            </button>
          </form>
        </div>

        <div className="contact-links">
          <p>Management&nbsp;: management@celestefard.com</p>
          <p>Presse&nbsp;: press@celestefard.com</p>
          <p>Instagram&nbsp;: @celestefard</p>
        </div>
      </section>
    </div>
  );
}
