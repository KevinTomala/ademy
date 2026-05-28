const ITEMS = [
  {
    icon: '🧾',
    name: 'Contifico',
    badge: 'Facturación SRI',
    desc: 'Cuando el cajero registra un pago, la factura electrónica se emite sola al SRI. Sin pasos extra, sin errores manuales.',
  },
  {
    icon: '📧',
    name: 'Correo electrónico',
    badge: 'Notificaciones',
    desc: 'El estudiante recibe su comprobante de pago, confirmación de matrícula y recordatorios automáticamente.',
  },
  {
    icon: '☁️',
    name: 'Nube segura',
    badge: 'Documentos',
    desc: 'Cédulas, contratos y diplomas quedan guardados en la nube con acceso seguro y trazable por rol.',
  },
  {
    icon: '🤖',
    name: 'Validación con IA',
    badge: 'Documentos de identidad',
    desc: 'El sistema verifica cédulas y pasaportes automáticamente. La secretaria recibe el resultado sin hacer la revisión a mano.',
  },
]

export default function Integraciones() {
  return (
    <section className="section" id="integraciones">
      <div className="section-header" data-reveal>
        <h2>Conectado con lo que ya usas</h2>
        <p>Ademy se integra con los servicios clave para que cada proceso fluya sin intervención manual.</p>
      </div>
      <div className="grid-4">
        {ITEMS.map((item) => (
          <article key={item.name} className="card" data-reveal>
            <div className="card-icon" aria-hidden="true">{item.icon}</div>
            <div className="card-badge">{item.badge}</div>
            <h3>{item.name}</h3>
            <p>{item.desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
