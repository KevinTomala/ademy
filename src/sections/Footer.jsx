const NAV_GROUPS = [
  {
    title: 'Producto',
    links: [
      ['#beneficios', 'Beneficios'],
      ['#modulos', 'Módulos'],
      ['#demo', 'Demo interactiva'],
      ['#capturas', 'Capturas'],
      ['#proceso', 'Implementación'],
    ],
  },
  {
    title: 'Recursos',
    links: [
      ['#tutoriales', 'Videos tutoriales'],
      ['#faq', 'Preguntas frecuentes'],
      ['#comparativa', 'Comparativa'],
      ['#seguridad', 'Seguridad'],
    ],
  },
  {
    title: 'Empresa',
    links: [
      ['#testimonios', 'Testimonios'],
      ['#contacto', 'Contacto'],
      ['#contacto', 'Solicitar demo'],
    ],
  },
]

import { FaInstagram, FaLinkedin, FaYoutube, FaEnvelope, FaPhone } from 'react-icons/fa'

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com',  icon: <FaInstagram size={18} /> },
  { label: 'LinkedIn',  href: 'https://linkedin.com',   icon: <FaLinkedin  size={18} /> },
  { label: 'YouTube',   href: 'https://youtube.com',    icon: <FaYoutube   size={18} /> },
]

function scrollTo(href) {
  const el = document.querySelector(href)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Footer() {
  const year = new Date().getFullYear()

  const handleLink = (e, href) => {
    if (!href.startsWith('#')) return
    e.preventDefault()
    scrollTo(href)
  }

  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* Brand column */}
        <div className="footer-brand">
          <div className="brand">
            <div className="brand-mark" aria-hidden="true">
              <img src="/assets/ademy-logo.png" alt="" />
            </div>
            <div className="brand-text">Ademy</div>
          </div>
          <p className="footer-tagline">
            Gestión académica moderna para instituciones que quieren crecer.
          </p>
          <div className="footer-contact">
            <a href="mailto:contacto@ademy.com" className="footer-contact-item">
              <FaEnvelope size={15} aria-hidden="true" />
              contacto@ademy.com
            </a>
            <span className="footer-contact-item">
              <FaPhone size={15} aria-hidden="true" />
              +54 11 0000-0000
            </span>
          </div>
          <div className="footer-socials">
            {SOCIALS.map(({ label, href, icon }) => (
              <a key={label} href={href} className="footer-social-btn" target="_blank" rel="noopener noreferrer" aria-label={label}>
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Nav columns */}
        {NAV_GROUPS.map(({ title, links }) => (
          <div key={title} className="footer-col">
            <h4 className="footer-col-title">{title}</h4>
            <ul className="footer-col-list">
              {links.map(([href, label]) => (
                <li key={label}>
                  <a href={href} onClick={(e) => handleLink(e, href)}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <span>© {year} Ademy. Todos los derechos reservados.</span>
        <div className="footer-legal">
          <a href="#">Política de privacidad</a>
          <a href="#">Términos de uso</a>
        </div>
      </div>
    </footer>
  )
}
