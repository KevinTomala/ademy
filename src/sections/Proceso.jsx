const STEPS = [
  {
    num: '1',
    title: 'El interesado llega',
    desc: 'Se registra con su fuente de origen: redes, referido o web. Queda en seguimiento sin perder el contacto.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    num: '2',
    title: 'Se matricula',
    desc: 'La secretaria selecciona el curso y la promoción. El contrato de inscripción se genera automáticamente.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
  },
  {
    num: '3',
    title: 'El cajero registra el pago',
    desc: 'Se emite el comprobante al estudiante por correo. Si hay facturación, va al SRI sin pasos extra.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
        <line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
    ),
  },
  {
    num: '4',
    title: 'Documentos validados',
    desc: 'La secretaria sube la cédula. El sistema la verifica y notifica el resultado sin revisión manual.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
  {
    num: '5',
    title: 'Diploma generado',
    desc: 'Al completar el curso, el diploma en PDF sale con logo, firma y datos del estudiante listo para entregar.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
  },
]

export default function Proceso() {
  return (
    <section className="section" id="proceso">
      <div className="section-header" data-reveal>
        <h2>Así trabaja tu academia con Ademy</h2>
        <p>Desde que llega el interesado hasta que recibe su diploma. Todo en un solo sistema.</p>
      </div>
      <div className="proceso-flow">
        {STEPS.map((s, i) => (
          <div key={s.num} className="proceso-step" data-reveal>
            <div className="proceso-icon-wrap">
              <div className="proceso-icon">{s.icon}</div>
              {i < STEPS.length - 1 && <div className="proceso-connector" aria-hidden="true" />}
            </div>
            <div className="proceso-badge">{s.num}</div>
            <h3 className="proceso-title">{s.title}</h3>
            <p className="proceso-desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
