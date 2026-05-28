import Counter from './Counter'

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-text" data-reveal="left">
        <div className="eyebrow">Plataforma academica todo en uno</div>
        <h1>
          Gestiona admisiones, matriculas y pagos con{' '}
          <span className="accent">claridad, control y evidencia</span>.
        </h1>
        <p>
          Ademy integra Operativo, Academico, Financiero y Seguridad para que cada equipo opere con
          datos consistentes y procesos auditables.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#contacto">
            Agenda demo de 15 min
          </a>
          <a className="btn btn-ghost" href="#tutoriales">
            Ver recorrido de 2 min
          </a>
        </div>
        <div className="hero-metrics">
          <div>
            <Counter count={4} suffix=" mod" />
            <span className="metric-label">Operativo, Academico, Financiero, Seguridad</span>
          </div>
          <div>
            <Counter count={6} suffix=" procesos" />
            <span className="metric-label">Procesos clave integrados</span>
          </div>
          <div>
            <Counter count={0} />
            <span className="metric-label">Duplicidad por validaciones</span>
          </div>
        </div>
      </div>

      <div className="hero-visual" data-reveal="right">
        <div className="screen">
          <div className="screen-header">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
          <div className="screen-body">
            <img
              className="screen-shot"
              src="/assets/screens/seguridad_dashboard.png"
              alt="Dashboard de seguridad en Ademy"
              loading="lazy"
            />
          </div>
        </div>
        <div className="floating-card">
          <span className="pill">Alertas en tiempo real</span>
          <p>Sesiones activas, usuarios bloqueados y reseteos pendientes.</p>
        </div>
      </div>
    </section>
  )
}
