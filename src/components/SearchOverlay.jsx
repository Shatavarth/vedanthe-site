import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { PRODUCTS } from '../lib/products'

function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) {
      setQuery('')
      // wait for the panel to mount before focusing
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []

    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.note.toLowerCase().includes(q) ||
        p.audience.toLowerCase().includes(q) ||
        p.inspiredBy?.toLowerCase().includes(q) ||
        p.collection?.name.toLowerCase().includes(q),
    ).slice(0, 8)
  }, [query])

  if (!open) return null

  return (
    <div className="search-overlay">
      <button
        type="button"
        className="search-overlay__backdrop"
        aria-label="Close search"
        onClick={onClose}
      />

      <div className="search-overlay__panel" role="dialog" aria-modal="true" aria-label="Search scents">
        <div className="search-overlay__field">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="search-overlay__icon">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
            <line x1="21" y1="21" x2="16.5" y2="16.5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search scents, notes, collections…"
            className="search-overlay__input"
            aria-label="Search"
          />
          <button type="button" className="search-overlay__close" onClick={onClose} aria-label="Close search">
            ✕
          </button>
        </div>

        {query.trim() && (
          <div className="search-overlay__results">
            {results.length > 0 ? (
              results.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="search-overlay__result"
                  onClick={onClose}
                >
                  <span className="search-overlay__result-main">
                    <span className="search-overlay__result-name">{product.name}</span>
                    <span className="search-overlay__result-meta">
                      {product.audience} · {product.note}
                    </span>
                  </span>
                  <span className="search-overlay__result-price">${product.price} CAD</span>
                </Link>
              ))
            ) : (
              <p className="search-overlay__empty">
                No scents match &ldquo;{query}&rdquo;. Try{' '}
                <Link to="/shop" onClick={onClose} className="link link--on-ivory">
                  browsing the full collection
                </Link>
                .
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchOverlay
