import Counter from '../components/Counter'

export default function Caso() {
  return (
    <section className="section" id="caso">
      <div className="section-header" data-reveal>
        <h2>Resultado en una institución real</h2>
      </div>
      <article className="case-card" data-reveal>
        <div className="case-card__body">
          <div className="case-card__client">
            <img src="/assets/logo_cendcap.png" alt="Logo CENDCAP" className="case-card__logo" />
            <div>
              <div className="case-card__badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                CENDCAP · Ecuador
              </div>
              <h3>Centro de Capacitación de Agente de Seguridad</h3>
            </div>
          </div>
          <div className="case-card__steps">
            <div className="case-step">
              <span className="case-step__dot case-step__dot--before" />
              <p><strong>Antes:</strong> datos en archivos separados, contratos a mano, pagos sin seguimiento.</p>
            </div>
            <div className="case-step">
              <span className="case-step__dot case-step__dot--after" />
              <p><strong>Después:</strong> matrícula, contrato, cobro y comprobante en un solo flujo automatizado.</p>
            </div>
          </div>
        </div>
        <div className="case-metrics">
          <div className="case-metric">
            <div className="case-metric__icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <Counter count={60} suffix="% menos" />
            <span className="metric-label">tiempo por matrícula</span>
          </div>
          <div className="case-metric">
            <div className="case-metric__icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
              </svg>
            </div>
            <Counter count={100} suffix="%" />
            <span className="metric-label">datos centralizados</span>
          </div>
          <div className="case-metric">
            <div className="case-metric__icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
              </svg>
            </div>
            <span className="case-metric__tag">Procesos</span>
            <span className="metric-label">optimizados en CENDCAP</span>
          </div>
        </div>
      </article>
    </section>
  )
}
