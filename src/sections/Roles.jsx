import { FaUsers, FaCreditCard, FaPhone, FaCog, FaChartBar } from 'react-icons/fa'

const ROLES = [
  {
    badge: 'Secretaría',
    title: 'Secretaria',
    desc: 'Registra estudiantes, genera contratos y sube documentos en minutos. Sin volver a escribir los mismos datos dos veces.',
    icon: <FaUsers />,
  },
  {
    badge: 'Caja',
    title: 'Cajero / Cajera',
    desc: 'Cobra, selecciona el método de pago, emite el comprobante y cierra caja con el reporte listo para imprimir.',
    icon: <FaCreditCard />,
  },
  {
    badge: 'Recepción',
    title: 'Recepcionista',
    desc: 'Registra interesados, anota el origen y agenda seguimientos. Sin ver datos financieros ni información sensible.',
    icon: <FaPhone />,
  },
  {
    badge: 'Administración',
    title: 'Administrador',
    desc: 'Configura roles, revisa el log de actividad y tiene visión completa del estado financiero y académico.',
    icon: <FaCog />,
  },
  {
    badge: 'Dirección',
    title: 'Director / Directora',
    desc: 'Ve matrículas, ingresos del día y rendimiento por sede en un solo panel. Sin pedir reportes a nadie.',
    icon: <FaChartBar />,
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
