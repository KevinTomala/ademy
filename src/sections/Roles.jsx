const ROLES = [
  {
    icon: '📋',
    role: 'Secretaria',
    gain: 'Registra estudiantes, genera contratos y sube documentos en minutos — sin volver a escribir los mismos datos dos veces.',
  },
  {
    icon: '💳',
    role: 'Cajero / Cajera',
    gain: 'Cobra, selecciona el método de pago, emite el comprobante y cierra caja con el reporte listo para imprimir.',
  },
  {
    icon: '👋',
    role: 'Recepcionista',
    gain: 'Registra interesados, anota el origen y agenda seguimientos — sin ver datos financieros ni información sensible.',
  },
  {
    icon: '⚙️',
    role: 'Administrador',
    gain: 'Configura roles, revisa el log de actividad y tiene visión completa del estado financiero y académico.',
  },
  {
    icon: '📊',
    role: 'Director / Directora',
    gain: 'Ve matrículas, ingresos del día y rendimiento por sede en un solo panel — sin pedir reportes a nadie.',
  },
]

export default function Roles() {
  return (
    <section className="section" id="roles">
      <div className="section-header" data-reveal>
        <h2>Diseñado para cada área de tu institución</h2>
        <p>Cada persona del equipo entra, ve lo que necesita y hace su trabajo sin fricción.</p>
      </div>
      <div className="grid-3">
        {ROLES.map((r) => (
          <article key={r.role} className="card" data-reveal>
            <div className="card-icon" aria-hidden="true">{r.icon}</div>
            <h3>{r.role}</h3>
            <p>{r.gain}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
