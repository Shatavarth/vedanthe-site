import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PromoStrip from '../components/PromoStrip'
import ShopFilters from '../components/ShopFilters'
import SortDropdown from '../components/SortDropdown'
import { PRODUCTS, sortProducts } from '../lib/products'

function Shop() {
  const [sortBy, setSortBy] = useState('featured')
  const products = useMemo(() => sortProducts(PRODUCTS, sortBy), [sortBy])

  return (
    <>
      <header className="page-header">
        <span className="eyebrow eyebrow--on-dark">The Villa Collection</span>
        <h1>Shop All</h1>
        <p className="page-header__body">
          Twenty-seven scents, one villa. Hand-poured perfume oils, alcohol-free and made to last.
        </p>
      </header>

      <PromoStrip />

      <section className="shop-page">
        <div className="shop-toolbar">
          <div className="shop-toolbar__filters">
            <span className="shop-toolbar__label">Filter</span>
            <ShopFilters />
          </div>
          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>

        <div className="shop-grid">
          {products.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="shop-card">
              <div className="shop-card__image">
                <img src={product.image} alt={product.name} className="shop-card__photo" />
              </div>
              <span className="shop-card__audience">{product.audience}</span>
              <h3>{product.name}</h3>
              <p className="shop-card__notes">{product.note}</p>
              <span className="shop-card__price">${product.price} CAD</span>
              <span className="shop-card__inspired">
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
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

export default Shop
