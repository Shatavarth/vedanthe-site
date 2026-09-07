import { NavLink } from 'react-router-dom'

const FILTERS = [
  { to: '/shop', label: 'Shop All' },
  { to: '/collections/woman', label: 'Woman' },
  { to: '/collections/man', label: 'Man' },
  { to: '/collections/unisex', label: 'Unisex' },
]

function ShopFilters() {
  return (
    <div className="explore__pills shop-page__filters" role="group" aria-label="Shop by collection">
      {FILTERS.map((filter) => (
        <NavLink
          key={filter.to}
          to={filter.to}
          end
          className={({ isActive }) => `pill${isActive ? ' pill--active' : ''}`}
        >
          {filter.label}
        </NavLink>
      ))}
    </div>
  )
}

export default ShopFilters
