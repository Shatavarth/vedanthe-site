import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Leaf from '../components/Leaf'
import SakuraEditorialPoster from '../components/ui/sakura-editorial-poster'
import { Features } from '../components/ui/features-8'
import TestimonialMarquee from '../components/ui/marquee-01'
import ComparisonCTA from '../components/ui/8bit-cta1'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}

const MARQUEE_ITEMS = [
  'Timeless Elegance',
  'Signature Scent',
  'Aroma Inspired',
  'Hand Poured',
]

const COLLECTION = [
  {
    name: 'Sala da Pranzo',
    notes: 'The Dining Room Edit — wine, old leather',
    price: '$49',
    image: '/products/essentials-for-her.png',
  },
  {
    name: 'La Biblioteca',
    notes: 'The Library Edit — ink, smoke',
    price: '$49',
    image: '/products/essentials-for-him.png',
  },
  {
    name: 'La Serra',
    notes: 'The Conservatory Edit — linen, marble',
    price: '$49',
    image: '/products/essentials-for-all.png',
  },
]

const CATEGORIES = ['Fresh', 'Oriental', 'Earthy / Woody', 'Floral', 'Fruity / Citrus']

const CAROUSEL_SLIDES = [
  { src: '/products/bold-confession-bottle.jpg', alt: 'Vedanthè Vandelle bottle' },
  { src: '/products/essentials-for-her.png', alt: 'Vedanthè Essentials for Her packaging' },
  { src: '/products/essentials-for-him.png', alt: 'Vedanthè Essentials for Him packaging' },
  { src: '/products/essentials-for-all.png', alt: 'Vedanthè Essentials for All packaging' },
]

const COLLECTIONS_DATA = [
  {
    audience: 'Woman',
    name: 'Sala da Pranzo',
    description: 'An evening in the dining room — wine, old leather, and firelight.',
    image: '/products/essentials-for-her.png',
    theme: 'maroon',
  },
  {
    audience: 'Man',
    name: 'La Biblioteca',
    description: 'The library after midnight — ink, smoke, and quiet ambition.',
    image: '/products/essentials-for-him.png',
    theme: 'black',
  },
  {
    audience: 'Unisex',
    name: 'La Serra',
    description: 'The conservatory at dawn — linen, marble, and cool light.',
    image: '/products/essentials-for-all.png',
    theme: 'ivory',
  },
]

const GALLERY_IMAGES = [
  { src: '/gallery/gallery-1.png', alt: 'Villa Sull’Ombra editorial — red curtains and warm light' },
  { src: '/gallery/gallery-2.png', alt: 'Wine, candlelight, and a leather journal on a villa desk' },
  { src: '/gallery/gallery-3.png', alt: 'Peeled oranges in a marble bowl on sunlit linen' },
  { src: '/gallery/gallery-4.png', alt: 'The conservatory at dawn, watering the perfume oils' },
  { src: '/gallery/gallery-5.png', alt: 'A letter from the last heir, written by candlelight' },
  { src: '/gallery/gallery-6.png', alt: 'The library at midnight — gold rings and dark tailoring' },
]

function Stars() {
  return (
    <span className="stars" aria-label="5 out of 5 stars">
      {'★★★★★'}
    </span>
  )
}

function Home() {
  const [activeScent, setActiveScent] = useState(CATEGORIES[0])
  const [slide, setSlide] = useState(0)
  const swipeStartX = useRef(null)

  const goPrev = () => setSlide((s) => (s - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length)
  const goNext = () => setSlide((s) => (s + 1) % CAROUSEL_SLIDES.length)

  const handlePointerDown = (e) => {
    swipeStartX.current = e.clientX
  }

  const handlePointerUp = (e) => {
    if (swipeStartX.current === null) return
    const delta = e.clientX - swipeStartX.current
    if (delta > 40) goPrev()
    else if (delta < -40) goNext()
    swipeStartX.current = null
  }

  return (
    <>
      <div id="top">
        <SakuraEditorialPoster
          title="VEDANTHÈ"
          keywords={[
            { label: 'Hand-Poured' },
            { label: 'Tuscany' },
            { label: 'Timeless' },
          ]}
          headline="The Scent of Who You&rsquo;ve Become"
          body="The Vedanthè Vandelle bundle — 30ml perfume oil paired with a 5ml rollon for on-the-go wear, hand-blended and made to last close to the skin."
          subheadline="Worn close. Remembered longer."
          footerLeft="VEDANTHÈ"
          footerCenter="The Villa Collection"
          footerRight={String(new Date().getFullYear())}
          socialHandle="@vedanthe"
          sceneSrc="/hero/villa-facade-night.png"
          sceneAlt="The villa facade at night — maroon walls, gold-trimmed arched windows, and cypress trees"
        />

        <div className="marquee">
          <div className="marquee__track">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span className="marquee__item" key={`${item}-${i}`}>
                {item}
                <span className="marquee__dot" aria-hidden="true">
                  ✦
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <section id="collections" className="collections">
        <motion.div
          className="section-head"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={stagger}
        >
          <motion.h2 variants={fadeUp}>Our Collections</motion.h2>
          <motion.p className="section-head__body" variants={fadeUp}>
            Three rooms of the villa, each with its own hour and its own scent.
          </motion.p>
        </motion.div>

        <motion.div
          className="collections__grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          {COLLECTIONS_DATA.map((item, i) => (
            <motion.article
              key={item.name}
              className={`collection-card collection-card--${item.theme}`}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <span className="collection-card__num">{i + 1}</span>
              <div className="collection-card__image">
                <img src={item.image} alt={item.name} className="collection-card__photo" />
              </div>
              <span className="collection-card__audience">{item.audience}</span>
              <h3>{item.name}</h3>
              <p className="collection-card__desc">{item.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section id="collection" className="loved">
        <motion.div
          className="section-head"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={stagger}
        >
          <motion.h2 variants={fadeUp}>Most Loved Scents</motion.h2>
          <motion.p className="section-head__body" variants={fadeUp}>
            Three signature oils, each built around a single memory of the
            villa garden at dusk.
          </motion.p>
        </motion.div>

        <motion.div
          className="loved__grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          {COLLECTION.map((item, i) => (
            <motion.article
              key={item.name}
              className="loved-card"
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <span className="loved-card__num">{i + 1}</span>
              <div className="loved-card__image">
                <img src={item.image} alt={item.name} className="loved-card__photo" />
              </div>
              <h3>{item.name}</h3>
              <div className="loved-card__rating">
                <Stars />
              </div>
              <p className="loved-card__notes">{item.notes}</p>
            </motion.article>
          ))}
          <span className="loved__badge">4.9/5+</span>
        </motion.div>
      </section>

      <Features />

      <ComparisonCTA />

      <section className="explore">
        <motion.div
          className="explore__frame explore__frame--left"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <img src="/brand/vedanthe-icon.png" alt="VEDANTHÈ" className="explore__leaf" />
        </motion.div>

        <motion.div
          className="explore__center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={stagger}
        >
          <motion.span className="eyebrow eyebrow--on-dark" variants={fadeUp}>
            Explore Scents
          </motion.span>
          <div className="explore__pills" role="group" aria-label="Filter by scent family">
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat}
                type="button"
                variants={fadeUp}
                onClick={() => setActiveScent(cat)}
                aria-pressed={activeScent === cat}
                className={`pill${activeScent === cat ? ' pill--active' : ''}`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="explore__frame explore__frame--right explore__frame--photo"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <img
            src="/products/bold-confession-bottle.jpg"
            alt="Vedanthè perfume oil bottle"
            className="explore__photo"
          />
        </motion.div>
      </section>

      <section className="daily">
        <motion.div
          className="section-head"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={stagger}
        >
          <motion.h2 variants={fadeUp}>Scent for Daily Life</motion.h2>
          <motion.p className="section-head__body" variants={fadeUp}>
            Begin every morning with a ritual that lingers — worn light, worn
            often, worn well.
          </motion.p>
        </motion.div>

        <motion.div
          className="product-carousel"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="product-carousel__media">
            <button
              type="button"
              className="carousel-arrow carousel-arrow--prev"
              onClick={goPrev}
              aria-label="Previous image"
            >
              ‹
            </button>

            <div
              className="product-carousel__viewport"
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={slide}
                  src={CAROUSEL_SLIDES[slide].src}
                  alt={CAROUSEL_SLIDES[slide].alt}
                  className="product-carousel__image"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  draggable={false}
                />
              </AnimatePresence>
            </div>

            <button
              type="button"
              className="carousel-arrow carousel-arrow--next"
              onClick={goNext}
              aria-label="Next image"
            >
              ›
            </button>
          </div>

          <div className="product-carousel__dots">
            {CAROUSEL_SLIDES.map((item, i) => (
              <button
                key={item.src}
                type="button"
                className={`carousel-dot${i === slide ? ' carousel-dot--active' : ''}`}
                aria-label={`Show image ${i + 1}`}
                aria-current={i === slide}
                onClick={() => setSlide(i)}
              />
            ))}
          </div>

          <div className="product-carousel__info">
            <h3>Vedanthè Vandelle</h3>
            <p className="product-carousel__desc">30ml perfume oil + 5ml rollon bundle</p>
            <div className="product-carousel__rating">
              <Stars />
            </div>
            <div className="product-carousel__price">
              <span className="product-carousel__price-strike">$65 CAD</span>
              <span className="product-carousel__price-real">$49 CAD</span>
            </div>
            <p className="product-carousel__shipping">Free shipping over $79 CAD</p>
            <a href="#collections" className="btn btn--primary">
              Shop Now
            </a>
          </div>
        </motion.div>
      </section>

      <section className="promo">
        <Leaf className="promo__corner promo__corner--top" />
        <Leaf className="promo__corner promo__corner--bottom" />

        {[
          'promo__sparkle--tl',
          'promo__sparkle--tr',
          'promo__sparkle--bl',
          'promo__sparkle--br',
        ].map((cls, i) => (
          <motion.span
            key={cls}
            className={`promo__sparkle ${cls}`}
            aria-hidden="true"
            animate={{ opacity: [0.25, 1, 0.25], scale: [0.85, 1.15, 0.85] }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          >
            ✦
          </motion.span>
        ))}

        <motion.div
          className="promo__panel"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <div className="promo__content">
            <h2>Get 20% Off Your First Order</h2>
            <h3>Vedanthè Vandelle — The Villa Collection</h3>
            <p>
              A limited invitation into the villa — one bottle, one letter,
              one evening to decide who you become.
            </p>
            <a href="#collections" className="link link--on-maroon promo__link">
              Shop Now
            </a>
          </div>
        </motion.div>
      </section>

      <section className="gallery">
        <motion.div
          className="section-head"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={stagger}
        >
          <motion.h2 variants={fadeUp}>As Seen on @VEDANTHÈ</motion.h2>
        </motion.div>

        <motion.div
          className="gallery__grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
        >
          {GALLERY_IMAGES.map((item) => (
            <motion.div key={item.src} className="gallery__tile" variants={fadeUp}>
              <img src={item.src} alt={item.alt} className="gallery__photo" />
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="testimonials">
        <motion.div
          className="section-head"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={stagger}
        >
          <motion.h2 variants={fadeUp}>Words From the Villa</motion.h2>
          <motion.p className="section-head__body" variants={fadeUp}>
            Notes from the guests who&rsquo;ve made it part of their own ritual.
          </motion.p>
        </motion.div>

        <TestimonialMarquee />
      </section>
    </>
  )
}

export default Home
