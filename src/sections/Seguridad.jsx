const ITEMS = [
  {
    title: 'Cada persona ve solo lo que le toca',
    desc: 'Configuras los permisos por rol y nadie accede a información fuera de su área — sin depender de la confianza ni del olvido.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Registro exacto de cada acción',
    desc: 'Cada pago, cambio o modificación queda guardado con nombre, fecha y dato anterior. Si alguien pregunta, la respuesta ya está ahí.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    title: 'Historial sin buscar en correos',
    desc: 'Todo el historial de operaciones vive en el sistema, filtrable por usuario, fecha o tipo de acción. Nada en hojas de cálculo ni chats.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
  },
]

export default function Seguridad() {
  return (
    <section className="section" id="seguridad">
      <div className="section-header" data-reveal>
        <p className="eyebrow">Seguridad y trazabilidad</p>
        <h2>Tu información, bajo control total</h2>
        <p>Sabes quién hizo qué, cuándo y en qué registro — sin tener que preguntar ni confiar a ciegas.</p>
      </div>
      <div className="grid-3 security-grid">
        {ITEMS.map((item) => (
          <div key={item.title} className="modulo-card" data-reveal>
            <div className="modulo-card__header">
              <div className="modulo-card__icon">{item.icon}</div>
              <h3 className="modulo-card__title">{item.title}</h3>
            </div>
            <p className="modulo-card__desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
