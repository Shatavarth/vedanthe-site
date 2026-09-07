import { Link } from 'react-router-dom'
import { getProductsByAudience } from '../lib/products'

const COPY = {
  Woman: {
    title: 'For Her',
    body: 'An evening in the dining room — wine, old leather, and firelight.',
  },
  Man: {
    title: 'For Him',
    body: 'The library after midnight — ink, smoke, and quiet ambition.',
  },
  Unisex: {
    title: 'For Everyone',
    body: 'The conservatory at dawn — linen, marble, and cool light.',
  },
}

function CollectionPage({ audience }) {
  const products = getProductsByAudience(audience)
  const copy = COPY[audience]

  return (
    <>
      <header className="page-header">
        <span className="eyebrow eyebrow--on-dark">The Villa Collection</span>
        <h1>{copy.title}</h1>
        <p className="page-header__body">{copy.body}</p>
      </header>

      <section className="shop-page">
        {products.length > 0 ? (
          <div className="shop-grid">
            {products.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className="shop-card">
                <div className="shop-card__image">
                  <img src={product.image} alt={product.name} className="shop-card__photo" />
                </div>
                <span className="shop-card__audience">{product.audience}</span>
                <h3>{product.name}</h3>
                <p className="shop-card__notes">{product.notes}</p>
                <span className="shop-card__price">${product.price}</span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="section-head__body shop-page__empty">
            Nothing here yet — <Link to="/shop" className="link link--on-ivory">see the full collection</Link>.
          </p>
        )}
      </section>
    </>
  )
}

export default CollectionPage
