import { Link, useParams } from 'react-router-dom'
import { getProduct } from '../lib/products'

function Product() {
  const { id } = useParams()
  const product = getProduct(id)

  if (!product) {
    return (
      <section className="product-detail product-detail--empty">
        <span className="eyebrow">Not Found</span>
        <h1>We couldn&rsquo;t find that bottle</h1>
        <p className="section-head__body">
          It may have sold out, or the link may be off. Explore the full collection instead.
        </p>
        <Link to="/shop" className="btn btn--primary">
          Back to Shop
        </Link>
      </section>
    )
  }

  return (
    <section className="product-detail">
      <div className="product-detail__frame">
        <img src={product.image} alt={product.name} className="product-detail__photo" />
      </div>

      <div className="product-detail__info">
        <span className="eyebrow">{product.audience} Collection</span>
        <h1>{product.name}</h1>
        <p className="product-detail__notes">{product.note}</p>

        <div className="product-detail__price">
          <span className="product-detail__price-real">${product.price} CAD</span>
        </div>

        <p className="product-detail__inspired">
          {product.collection ? (
            <>
              {product.collection.name} — {product.collection.tagline}
            </>
          ) : (
            <>
              Inspired by {product.inspiredBy}
              {product.inspiredByPrice ? ` · $${product.inspiredByPrice} CAD` : ''}
            </>
          )}
        </p>

        <div className="product-detail__offers">
          <p>
            <strong>Free 5ml rollon</strong> gift included with every order
          </p>
          <p>
            <strong>Buy 3, save 12%</strong> — mix any 3 scents for $129 in{' '}
            <Link to="/shop">the shop</Link>
          </p>
        </div>

        <button type="button" className="btn btn--primary">
          Add to Bag
        </button>

        <Link to="/shop" className="link link--on-ivory product-detail__back">
          ← Back to all scents
        </Link>
      </div>
    </section>
  )
}

export default Product
