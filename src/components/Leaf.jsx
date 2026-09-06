function Leaf({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      role="presentation"
      aria-hidden="true"
    >
      <path
        d="M60 10c28 10 46 32 46 58 0 24-18 42-46 42S14 92 14 68c0-26 18-48 46-58z"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path d="M60 14v92" stroke="currentColor" strokeWidth="1" opacity="0.8" />
      <path d="M60 34c-10 6-18 14-22 24" stroke="currentColor" strokeWidth="0.75" opacity="0.6" />
      <path d="M60 34c10 6 18 14 22 24" stroke="currentColor" strokeWidth="0.75" opacity="0.6" />
      <path d="M60 58c-12 6-20 14-25 26" stroke="currentColor" strokeWidth="0.75" opacity="0.6" />
      <path d="M60 58c12 6 20 14 25 26" stroke="currentColor" strokeWidth="0.75" opacity="0.6" />
    </svg>
  )
}

export default Leaf
