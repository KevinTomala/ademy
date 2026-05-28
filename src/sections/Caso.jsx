import Counter from '../components/Counter'

export default function Caso() {
  return (
    <section className="section" id="caso">
      <div className="section-header" data-reveal>
        <h2>Resultado en una institución real</h2>
        <p>Números de una academia de capacitación técnica que migró desde hojas de cálculo.</p>
      </div>
      <article className="case-card" data-reveal>
        <div>
          <h3>Centro de Capacitación Técnica</h3>
          <p>Antes: cada matrícula tomaba entre 20 y 30 minutos entre buscar datos, registrar pagos y generar el contrato a mano.</p>
          <p>Después: el proceso completo baja a menos de 5 minutos con contrato generado y comprobante enviado automáticamente.</p>
        </div>
        <div className="case-metrics">
          <div>
            <Counter count={35} prefix="-" suffix="%" />
            <span className="metric-label">tiempo por matrícula</span>
          </div>
          <div>
            <Counter count={28} prefix="+" suffix="%" />
            <span className="metric-label">cobranza recuperada en el primer mes</span>
          </div>
        </div>
      </article>
    </section>
  )
}
