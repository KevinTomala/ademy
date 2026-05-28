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

export default function Nav({ isSticky }) {
  const [isOpen, setIsOpen] = useState(false)

  const close = () => setIsOpen(false)

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
          <a key={href} href={href} onClick={close}>
            {label}
          </a>
        ))}
        <a className="nav-cta-link" href="#contacto" onClick={close}>
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

      <a className="btn btn-primary nav-cta" href="#contacto">
        Solicitar demo
      </a>
    </header>
  )
}
