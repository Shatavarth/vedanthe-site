import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)

    // CinematicFooter lives in Layout and never unmounts between routes, so
    // its ScrollTrigger keeps whatever start/end pixel values it measured
    // on first mount. Route changes can swap in pages of very different
    // heights (Home's parallax hero vs. a short page like Contact), which
    // leaves those cached positions stale and the footer's reveal stuck at
    // its pre-scroll state. Refresh after the new page's DOM has settled.
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(raf)
  }, [pathname])

  return null
}

export default ScrollToTop
