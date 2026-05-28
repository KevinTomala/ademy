export default function Seguridad() {
  return (
    <section className="section" id="seguridad">
      <div className="section-header" data-reveal>
        <h2>Tu información, bajo control</h2>
        <p>Sabes quién hizo qué, cuándo y en qué registro — sin tener que preguntar.</p>
      </div>
      <div className="grid-3 security-grid">
        <article className="card" data-reveal>
          <h3>Cada persona ve solo lo que le toca</h3>
          <p>Configuras los permisos por rol y nadie accede a información fuera de su área — sin depender de la confianza.</p>
        </article>
        <article className="card" data-reveal>
          <h3>Sabes exactamente quién hizo qué</h3>
          <p>Cada cambio, pago o modificación queda registrado con el usuario, la fecha y el dato anterior. Ideal para responder cualquier reclamo.</p>
        </article>
        <article className="card" data-reveal>
          <h3>Historial completo sin buscar en correos</h3>
          <p>Todo el historial de operaciones está en el sistema, filtrable por usuario, fecha o tipo de acción.</p>
        </article>
      </div>
    </section>
  )
}
