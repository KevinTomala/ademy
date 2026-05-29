const ITEMS = [
  {
    badge: 'Facturación electrónica',
    title: 'Emisión al SRI',
    desc: 'Cada pago genera automáticamente la factura electrónica y la envía al SRI. Compatible con sistemas de facturación como Contifico, sin pasos manuales.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="9" y1="17" x2="13" y2="17" />
      </svg>
    ),
  },
  {
    badge: 'Notificaciones',
    title: 'Correo automático',
    desc: 'El estudiante recibe su comprobante de pago, confirmación de matrícula y recordatorios sin que la secretaria tenga que enviar nada.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    badge: 'Documentos',
    title: 'Nube segura',
    desc: 'Cédulas, contratos y diplomas guardados en la nube con acceso controlado por rol. Cada consulta queda registrada.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
        <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
      </svg>
    ),
  },
  {
    badge: 'Identidad digital',
    title: 'Validación con IA',
    desc: 'El sistema verifica cédulas y pasaportes en segundos. La secretaria recibe el resultado sin revisar el documento a mano.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="9" cy="10" r="2" />
        <path d="M15 8h2" />
        <path d="M15 12h2" />
        <path d="M7 16h10" />
      </svg>
    ),
  },
]

export default function Integraciones() {
  return (
    <section className="section" id="integraciones">
      <div className="section-header" data-reveal>
        <h2>Conectado con lo que necesitas</h2>
        <p>Ademy se integra con los servicios clave para que cada proceso fluya sin intervención manual.</p>
      </div>
      <div className="integraciones-grid">
        {ITEMS.map((item) => (
          <article key={item.title} className="integracion-card" data-reveal>
            <div className="integracion-card__header">
              <div className="integracion-card__icon">{item.icon}</div>
              <div>
                <span className="integracion-card__badge">{item.badge}</span>
                <h3 className="integracion-card__title">{item.title}</h3>
              </div>
            </div>
            <p className="integracion-card__desc">{item.desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
