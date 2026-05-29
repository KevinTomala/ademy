const ROLES = [
  {
    badge: 'Secretaría',
    title: 'Secretaria',
    desc: 'Registra estudiantes, genera contratos y sube documentos en minutos. Sin volver a escribir los mismos datos dos veces.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    badge: 'Caja',
    title: 'Cajero / Cajera',
    desc: 'Cobra, selecciona el método de pago, emite el comprobante y cierra caja con el reporte listo para imprimir.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
  },
  {
    badge: 'Recepción',
    title: 'Recepcionista',
    desc: 'Registra interesados, anota el origen y agenda seguimientos. Sin ver datos financieros ni información sensible.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.08 4.18 2 2 0 0 1 5.09 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L9.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    badge: 'Administración',
    title: 'Administrador',
    desc: 'Configura roles, revisa el log de actividad y tiene visión completa del estado financiero y académico.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
      </svg>
    ),
  },
  {
    badge: 'Dirección',
    title: 'Director / Directora',
    desc: 'Ve matrículas, ingresos del día y rendimiento por sede en un solo panel. Sin pedir reportes a nadie.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
]

export default function Roles() {
  return (
    <section className="section" id="roles">
      <div className="section-header" data-reveal>
        <h2>Diseñado para cada área de tu institución</h2>
        <p>Cada persona del equipo entra, ve lo que necesita y hace su trabajo sin fricción.</p>
      </div>
      <div className="roles-grid">
        {ROLES.map((r) => (
          <article key={r.title} className="rol-card" data-reveal>
            <div className="rol-card__header">
              <div className="rol-card__icon">{r.icon}</div>
              <div>
                <span className="rol-card__badge">{r.badge}</span>
                <h3 className="rol-card__title">{r.title}</h3>
              </div>
            </div>
            <p className="rol-card__desc">{r.desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
