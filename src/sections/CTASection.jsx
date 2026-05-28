export default function CTASection() {
  return (
    <section className="cta" id="agenda" data-reveal>
      <div>
        <h2>Listo para ver Ademy en accion?</h2>
        <p>Agenda una demo personalizada y conoce como optimizar tu operacion academica.</p>
      </div>
      <div className="cta-actions">
        <a className="btn btn-primary" href="mailto:ventas@ademy.com">
          Agendar demo
        </a>
        <a className="btn btn-ghost" href="mailto:contacto@ademy.com">
          Hablar con el equipo
        </a>
      </div>
      <small className="cta-note">Actualiza estos correos con tus datos reales.</small>
    </section>
  )
}
