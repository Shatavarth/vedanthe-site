function BottleMark({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 160"
      fill="none"
      role="presentation"
      aria-hidden="true"
    >
      <rect x="48" y="8" width="24" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M44 24h32l6 14v104a6 6 0 0 1-6 6H44a6 6 0 0 1-6-6V38z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect x="38" y="72" width="44" height="46" rx="1" stroke="currentColor" strokeWidth="1" opacity="0.7" />
      <line x1="44" y1="86" x2="76" y2="86" stroke="currentColor" strokeWidth="1" opacity="0.7" />
      <line x1="44" y1="94" x2="70" y2="94" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="60" y1="8" x2="60" y2="0" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export default BottleMark
