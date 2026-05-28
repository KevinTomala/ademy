export default function Seguridad() {
  return (
    <section className="section" id="seguridad">
      <div className="section-header" data-reveal>
        <h2>Seguridad y control</h2>
        <p>Roles, permisos y auditoria para operaciones sensibles.</p>
      </div>
      <div className="grid-3 security-grid">
        <article className="card" data-reveal>
          <h3>Roles y permisos</h3>
          <p>Acceso por perfil para limitar acciones criticas.</p>
        </article>
        <article className="card" data-reveal>
          <h3>Monitoreo de sesiones</h3>
          <p>Actividad y sesiones activas visibles en el dashboard.</p>
        </article>
        <article className="card" data-reveal>
          <h3>Auditoria interna</h3>
          <p>Seguimiento de cambios y operaciones sensibles.</p>
        </article>
      </div>
    </section>
  )
}
