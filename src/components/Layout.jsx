import { Link, Outlet } from 'react-router-dom'
import SiteNavigation from './site-navigation'
import { CinematicFooter } from './ui/motion-footer'

function Layout() {
  return (
    <>
      <div className="topbar">
        <div className="topbar__row">
          <Link className="topbar__logo" to="/">
            <img src="/brand/vedanthe-icon.png" alt="" aria-hidden="true" className="topbar__logo-icon" />
            <img src="/brand/vedanthe-wordmark.png" alt="VEDANTHÈ" className="topbar__logo-img" />
          </Link>
          <div className="topbar__nav">
            <SiteNavigation />
          </div>
          <div className="topbar__icons">
            <button type="button" aria-label="Search" className="topbar__icon-btn">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
                <line x1="21" y1="21" x2="16.5" y2="16.5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            <button type="button" aria-label="Cart" className="topbar__icon-btn">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M4 6h2l1.5 11h11L20 8H7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <circle cx="10" cy="20" r="1.3" fill="currentColor" />
                <circle cx="17" cy="20" r="1.3" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>
        <div className="topbar__tagline">The Villa Collection</div>
      </div>

      <Outlet />

      <CinematicFooter />
    </>
  )
}

export default Layout
