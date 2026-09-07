import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const MESSAGES = [
  { text: 'The Villa Collection' },
  { text: 'Free 5ml Rollon Gift With Every Order' },
  { text: 'Sign Up for 10% Off Your First Order', to: '/contact' },
  { text: 'Buy 3, Save 12% — Any 3 Scents for $129', to: '/shop' },
  { text: 'Give $10, Get $10 — Refer a Friend', to: '/contact' },
]

function AnnouncementBar() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % MESSAGES.length)
    }, 4500)
    return () => clearInterval(id)
  }, [])

  const current = MESSAGES[index]

  return (
    <div className="topbar__tagline" aria-live="polite">
      <span key={index} className="topbar__tagline-text">
        {current.to ? <Link to={current.to}>{current.text}</Link> : current.text}
      </span>
    </div>
  )
}

export default AnnouncementBar
