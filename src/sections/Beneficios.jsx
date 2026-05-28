export default function Beneficios() {
  return (
    <section className="section" id="beneficios">
      <div className="section-header" data-reveal>
        <h2>Beneficios que se sienten desde el primer dia</h2>
        <p>Reduce tareas manuales y gana trazabilidad en cada flujo academico.</p>
      </div>
      <div className="grid-3">
        <article className="card" data-reveal>
          <h3>Operacion centralizada</h3>
          <p>Interesados, centros, niveles, matriculas y pagos en un solo entorno.</p>
        </article>
        <article className="card" data-reveal>
          <h3>Pagos con control total</h3>
          <p>Estados de pago, saldos pendientes y comprobantes listos para el estudiante.</p>
        </article>
        <article className="card" data-reveal>
          <h3>Seguridad por roles</h3>
          <p>Usuarios, permisos y monitoreo para asegurar acceso solo a lo necesario.</p>
        </article>
      </div>
    </section>
  )
}
