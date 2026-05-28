import { useState } from 'react'

const NAV_LINKS = [
  ['#beneficios', 'Beneficios'],
  ['#modulos', 'Modulos'],
  ['#demo', 'Demo'],
  ['#capturas', 'Capturas'],
  ['#proceso', 'Proceso'],
  ['#tutoriales', 'Videos'],
  ['#faq', 'FAQ'],
  ['#contacto', 'Contacto'],
]

function scrollTo(href) {
  const el = document.querySelector(href)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Nav({ isSticky }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleLink = (e, href) => {
    e.preventDefault()
    setIsOpen(false)
    scrollTo(href)
  }

  return (
    <header className={`nav${isSticky ? ' is-sticky' : ''}${isOpen ? ' is-open' : ''}`}>
      <div className="brand">
        <div className="brand-mark" aria-hidden="true">
          <img src="/assets/ademy-logo.png" alt="" />
        </div>
        <div className="brand-text">Ademy</div>
      </div>

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
