export default function Beneficios() {
  return (
    <section className="section section--alt" id="beneficios">
      <div className="section-header" data-reveal>
        <h2>Beneficios que se sienten desde el primer día</h2>
        <p>Menos tiempo en tareas administrativas, más claridad para tomar decisiones.</p>
      </div>
      <div className="grid-3">
        <article className="card" data-reveal>
          <h3>Todo en un solo lugar</h3>
          <p>Ya no busques en tres sistemas distintos para saber si un estudiante pagó, qué curso tiene o si sus documentos están completos.</p>
        </article>
        <article className="card" data-reveal>
          <h3>Cobros organizados, sin esfuerzo</h3>
          <p>El cajero registra el pago, el comprobante sale solo y la factura al SRI se emite automáticamente. Sin pasos manuales.</p>
        </article>
        <article className="card" data-reveal>
          <h3>Permisos claros para cada miembro</h3>
          <p>La secretaria no ve datos financieros. El recepcionista no toca configuraciones. Cada rol accede solo a lo que necesita para trabajar.</p>
        </article>
      </div>
    </section>
  )
}
