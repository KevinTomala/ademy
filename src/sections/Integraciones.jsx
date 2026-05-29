import { FaFileInvoiceDollar, FaEnvelope, FaCloud, FaIdCard } from 'react-icons/fa'

const ITEMS = [
  {
    badge: 'Facturación electrónica',
    title: 'Emisión al SRI',
    desc: 'Cada pago genera automáticamente la factura electrónica y la envía al SRI. Compatible con sistemas de facturación como Contifico, sin pasos manuales.',
    icon: <FaFileInvoiceDollar />,
  },
  {
    badge: 'Notificaciones',
    title: 'Correo automático',
    desc: 'El estudiante recibe su comprobante de pago, confirmación de matrícula y recordatorios sin que la secretaria tenga que enviar nada.',
    icon: <FaEnvelope />,
  },
  {
    badge: 'Documentos',
    title: 'Nube segura',
    desc: 'Cédulas, contratos y diplomas guardados en la nube con acceso controlado por rol. Cada consulta queda registrada.',
    icon: <FaCloud />,
  },
  {
    badge: 'Identidad digital',
    title: 'Validación con IA',
    desc: 'El sistema verifica cédulas y pasaportes en segundos. La secretaria recibe el resultado sin revisar el documento a mano.',
    icon: <FaIdCard />,
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
