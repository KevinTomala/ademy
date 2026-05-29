import Counter from './Counter'

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-text" data-reveal="left">
        <div className="hero-badge">
          <span className="hero-badge-dot"></span>
          Hecho para academias en Ecuador
        </div>
        <h1>
          Ademy,{' '}
          <span className="accent">Todo lo de tu academia, en un solo lugar</span>
        </h1>
        <p>
          Matrículas, cobros, diplomas y facturación electrónica al SRI. Todo en un solo sistema.
          Sin hojas de cálculo. Sin datos duplicados. Sin correos perdidos.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#contacto">
            Quiero una demo gratis →
          </a>
          <a className="btn btn-ghost" href="#tutoriales">
            ▶ Ver cómo funciona (2 min)
          </a>
        </div>
        <div className="hero-trust">
          <div className="hero-trust-item">
            <Counter count={70} prefix="-" suffix="%" />
            <span className="metric-label">menos tiempo por matrícula</span>
          </div>
          <div className="hero-trust-divider"></div>
          <div className="hero-trust-item">
            <Counter count={1} suffix=" sistema" />
            <span className="metric-label">para todo tu flujo</span>
          </div>
          <div className="hero-trust-divider"></div>
          <div className="hero-trust-item">
            <Counter count={100} suffix="%" />
            <span className="metric-label">trazabilidad por alumno</span>
          </div>
        </div>
      </div>

      <div className="hero-visual" data-reveal="right">
        <div className="hero-glow"></div>
        <div className="screen">
          <div className="screen-header">
            <div className="dot dot-red"></div>
            <div className="dot dot-yellow"></div>
            <div className="dot dot-green"></div>
            <span className="screen-title">Matrículas · Ademy</span>
          </div>
          <div className="screen-body">
            <img
              className="screen-shot"
              src="/assets/screens/matriculas_listado.png"
              alt="Listado de matrículas en Ademy"
              loading="eager"
            />
          </div>
        </div>
        <div className="floating-card floating-card--top">
          <div className="floating-icon">✓</div>
          <div>
            <strong>Matrícula registrada</strong>
            <span>hace 2 minutos · Pago confirmado</span>
          </div>
        </div>
        <div className="floating-card floating-card--bottom">
          <div className="floating-icon floating-icon--blue">⚡</div>
          <div>
            <strong>Factura SRI generada</strong>
            <span>automáticamente</span>
          </div>
        </div>
      </div>
    </section>
  )
}
