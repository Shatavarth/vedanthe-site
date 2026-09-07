import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AUDIENCES, PRODUCTS } from '../lib/products'

const FILTERS = ['All', ...AUDIENCES]

function Shop() {
  const [activeFilter, setActiveFilter] = useState('All')

  const products = useMemo(
    () =>
      activeFilter === 'All'
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.audience === activeFilter),
    [activeFilter],
  )

  return (
    <>
      <header className="page-header">
        <span className="eyebrow eyebrow--on-dark">The Villa Collection</span>
        <h1>Shop All</h1>
        <p className="page-header__body">
          Twenty-six scents, one villa. Hand-poured perfume oils, alcohol-free and made to last.
        </p>

        <div className="explore__pills shop-page__filters" role="group" aria-label="Filter by collection">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
              className={`pill${activeFilter === filter ? ' pill--active' : ''}`}
            >
              {filter}
            </button>
          ))}
        </div>
      </header>

      <section className="shop-page">
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
                Inspired by {product.inspiredBy}
                {product.inspiredByPrice ? ` · $${product.inspiredByPrice} CAD` : ''}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

export default Shop
