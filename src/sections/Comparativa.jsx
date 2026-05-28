const ANTES = [
  'Datos duplicados en hojas y sistemas',
  'Seguimiento manual de interesados',
  'Pagos sin conciliacion rapida',
  'Reportes tardios y sin trazabilidad',
]

const DESPUES = [
  'Un solo registro por estudiante',
  'Bitacora y seguimiento centralizado',
  'Pagos con estado y comprobantes',
  'Indicadores listos para decisiones',
]

export default function Comparativa() {
  return (
    <section className="section" id="comparativa">
      <div className="section-header" data-reveal>
        <h2>Antes vs. despues</h2>
        <p>Una comparacion clara de procesos manuales frente a un flujo digital.</p>
      </div>
      <div className="compare-grid">
        <div className="compare-card" data-reveal="left">
          <span className="compare-label">Antes</span>
          <ul className="compare-list">
            {ANTES.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="compare-card is-accent" data-reveal="right">
          <span className="compare-label">Despues</span>
          <ul className="compare-list">
            {DESPUES.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
