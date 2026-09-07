import { SORT_OPTIONS } from '../lib/products'

function SortDropdown({ value, onChange }) {
  return (
    <label className="sort-dropdown">
      <span className="sort-dropdown__label">Sort by</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="sort-dropdown__select"
        aria-label="Sort scents"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}

export default SortDropdown
