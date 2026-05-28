import Counter from '../components/Counter'

export default function Caso() {
  return (
    <section className="section" id="caso">
      <div className="section-header" data-reveal>
        <h2>Caso rapido (ejemplo)</h2>
        <p>Un resumen corto para mostrar impacto real en una institucion.</p>
      </div>
      <article className="case-card" data-reveal>
        <div>
          <h3>Instituto demo</h3>
          <p>Antes: matriculas dispersas y pagos sin seguimiento.</p>
          <p>Despues: matriculas centralizadas y reportes diarios.</p>
        </div>
        <div className="case-metrics">
          <div>
            <Counter count={35} prefix="-" suffix="%" />
            <span className="metric-label">tiempo de matricula</span>
          </div>
          <div>
            <Counter count={28} prefix="+" suffix="%" />
            <span className="metric-label">cobranza en el mes</span>
          </div>
        </div>
      </article>
    </section>
  )
}
