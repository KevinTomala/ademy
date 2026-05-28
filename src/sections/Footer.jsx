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

const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
      </svg>
    ),
  },
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
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              contacto@ademy.com
            </a>
            <span className="footer-contact-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 5.37 5.37l.91-.91a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 21 15.73v1.19z" />
              </svg>
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
