import { useState, useEffect } from 'react'
import Counter from '../components/Counter'

const STEPS = [
  {
    id: 'admisiones',
    label: 'Admisiones',
    title: 'Interesados y bitacora unificados',
    desc: 'Registra visitas, origenes y seguimiento para convertir interesados en estudiantes.',
    metrics: [
      { count: 1, suffix: ' bitacora', label: 'seguimiento diario' },
      { count: 1, suffix: ' registro', label: 'por contacto' },
    ],
  },
  {
    id: 'matriculas',
    label: 'Matriculas',
    title: 'Matriculas con reglas claras',
    desc: 'Cupos, promociones y estado academico siempre actualizados.',
    metrics: [
      { count: 6, suffix: ' estados', label: 'seguimiento de matricula' },
      { count: 0, suffix: '', label: 'datos duplicados' },
    ],
  },
  {
    id: 'pagos',
    label: 'Pagos',
    title: 'Pagos y comprobantes listos',
    desc: 'Registra pagos, valida saldos y genera comprobantes al instante.',
    metrics: [
      { count: 2, suffix: ' vistas', label: 'cobros pendientes e historico' },
      { count: 1, suffix: ' comprobante', label: 'por cada pago' },
    ],
  },
  {
    id: 'reportes',
    label: 'Reportes',
    title: 'Reportes que accionan decisiones',
    desc: 'Indicadores de seguridad, sesiones y permisos para auditoria interna.',
    metrics: [
      { count: 5, suffix: ' paneles', label: 'indicadores clave' },
      { count: 100, suffix: '%', label: 'trazabilidad academica' },
    ],
  },
]

export default function Demo() {
  const [active, setActive] = useState('admisiones')
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const order = STEPS.map((s) => s.id)
    const timer = setInterval(() => {
      setActive((cur) => {
        const idx = order.indexOf(cur)
        return order[(idx + 1) % order.length]
      })
    }, 5000)
    return () => clearInterval(timer)
  }, [paused])

  const current = STEPS.find((s) => s.id === active)

  return (
    <section className="section demo" id="demo" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="section-header" data-reveal>
        <h2>Demo interactivo del flujo academico</h2>
        <p>Explora como se conectan los pasos clave de Ademy en una operacion real.</p>
      </div>
      <div className="demo-grid">
        <div className="demo-steps" data-reveal>
          {STEPS.map((s) => (
            <button
              key={s.id}
              className={`demo-step${active === s.id ? ' is-active' : ''}`}
              type="button"
              onClick={() => setActive(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="demo-panel" data-reveal>
          {current && (
            <div className="demo-content is-active" key={current.id}>
              <h3>{current.title}</h3>
              <p>{current.desc}</p>
              <div className="demo-metrics">
                {current.metrics.map((m, i) => (
                  <div key={i}>
                    <Counter count={m.count} suffix={m.suffix} />
                    <span className="metric-label">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="demo-preview" aria-hidden="true">
            <div className="demo-preview__panel"></div>
            <div className="demo-preview__panel"></div>
            <div className="demo-preview__panel wide"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
