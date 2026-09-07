function Contact() {
  return (
    <>
      <header className="page-header">
        <span className="eyebrow eyebrow--on-dark">Get in Touch</span>
        <h1>Contact</h1>
        <p className="page-header__body">
          Questions about an order, a scent, or the villa itself — we read every letter.
        </p>
      </header>

      <section className="contact-page">
        <div className="contact-page__details">
          <span className="eyebrow">Reach us directly</span>
          <a href="mailto:mary@vedanthe.com" className="contact-page__link">
            mary@vedanthe.com
          </a>
          <a href="tel:+1806771390" className="contact-page__link">
            +1 80 677 1390
          </a>
          <p className="contact-page__note">
            Letters answered within two villa days, usually sooner.
          </p>
        </div>

        <form className="contact-page__form" onSubmit={(e) => e.preventDefault()}>
          <label className="contact-page__field">
            <span>Name</span>
            <input type="text" required placeholder="Your name" />
          </label>
          <label className="contact-page__field">
            <span>Email</span>
            <input type="email" required placeholder="you@example.com" />
          </label>
          <label className="contact-page__field">
            <span>Message</span>
            <textarea required placeholder="Tell us what's on your mind" rows={5} />
          </label>
          <button type="submit" className="btn btn--primary">
            Send Message
          </button>
        </form>
      </section>
    </>
  )
}

export default Contact
