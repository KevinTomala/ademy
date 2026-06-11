import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'

const NAV_LINKS = [
  ['#beneficios', 'Beneficios'],
  ['#proceso', 'Proceso'],
  ['#modulos', 'Módulos'],
  ['#demo', 'Demo'],
  ['#tutoriales', 'Videos'],
  ['#contacto', 'Contacto'],
]

export default function Nav() {
  const ref = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isLanding = location.pathname === '/'

  useEffect(() => {
    const el = ref.current
    const onScroll = () => el.classList.toggle('is-sticky', window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLink = (e, hash) => {
    e.preventDefault()
    setIsOpen(false)
    if (isLanding) {
      const el = document.querySelector(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      navigate('/' + hash)
    }
  }

  const handleBrand = (e) => {
    e.preventDefault()
    setIsOpen(false)
    if (isLanding) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate('/')
    }
  }

  return (
    <header ref={ref} className={`nav${isOpen ? ' is-open' : ''}`}>
      <Link to="/" className="brand" style={{ textDecoration: 'none' }} onClick={handleBrand}>
        <div className="brand-mark" aria-hidden="true">
          <img src="/assets/ademy-logo.png" alt="" />
        </div>
        <div className="brand-text">Ademy</div>
      </Link>

      <nav className="nav-links" id="nav-menu">
        {NAV_LINKS.map(([href, label]) => (
          <a key={href} href={href} onClick={(e) => handleLink(e, href)}>
            {label}
          </a>
        ))}
        <a className="nav-cta-link" href="#contacto" onClick={(e) => handleLink(e, '#contacto')}>
          Solicitar demo
        </a>
      </nav>

      <button
        className="nav-toggle"
        type="button"
        aria-expanded={isOpen}
        aria-controls="nav-menu"
        onClick={() => setIsOpen((o) => !o)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <a className="btn btn-primary nav-cta" href="#contacto" onClick={(e) => handleLink(e, '#contacto')}>
        Solicitar demo
      </a>
    </header>
  )
}
