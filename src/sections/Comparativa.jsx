const ITEMS = [
  {
    proceso: 'Registro de estudiantes',
    antes: 'Datos duplicados en hojas y sistemas',
    despues: 'Un solo registro por estudiante, sin repetir datos',
  },
  {
    proceso: 'Seguimiento de interesados',
    antes: 'Seguimiento manual sin origen claro',
    despues: 'Bitácora centralizada con origen del contacto',
  },
  {
    proceso: 'Control de pagos',
    antes: 'Pagos sin conciliación rápida',
    despues: 'Pagos con estado, comprobante y factura automática',
  },
  {
    proceso: 'Diplomas y certificados',
    antes: 'Impresos o enviados a mano',
    despues: 'PDF generados con un clic',
  },
  {
    proceso: 'Referidos y comisiones',
    antes: 'Sin saber quién refirió al estudiante',
    despues: 'Comisiones calculadas y trazadas automáticamente',
  },
  {
    proceso: 'Facturación electrónica',
    antes: 'Facturas al SRI por correo o manualmente',
    despues: 'Factura emitida al SRI al registrar el pago',
  },
  {
    proceso: 'Reportes y métricas',
    antes: 'Reportes tardíos y sin trazabilidad',
    despues: 'Indicadores en tiempo real para decidir hoy',
  },
]

export default function Comparativa() {
  return (
    <section className="section" id="comparativa">
      <div className="section-header" data-reveal>
        <h2>Antes vs. después</h2>
        <p>Una comparación clara de procesos manuales frente a un flujo digital.</p>
      </div>
      <div className="compare-table-wrap" data-reveal>
        <table className="compare-table">
          <thead>
            <tr>
              <th className="compare-th compare-th--proceso">Proceso</th>
              <th className="compare-th compare-th--antes">
                <span className="compare-th-badge compare-th-badge--red">✕ Antes</span>
              </th>
              <th className="compare-th compare-th--despues">
                <span className="compare-th-badge compare-th-badge--green">✓ Después</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {ITEMS.map(({ proceso, antes, despues }, i) => (
              <tr key={proceso} className={i % 2 === 0 ? 'compare-tr compare-tr--even' : 'compare-tr'}>
                <td className="compare-td compare-td--proceso">{proceso}</td>
                <td className="compare-td compare-td--antes">{antes}</td>
                <td className="compare-td compare-td--despues">{despues}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
