import Counter from '../components/Counter'
import { FaShieldAlt, FaClock, FaDatabase, FaChartLine } from 'react-icons/fa'

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
                <FaShieldAlt size={14} style={{marginRight:4, verticalAlign:'middle'}} />
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
            <div className="case-metric__icon"><FaClock size={18} /></div>
            <Counter count={60} suffix="% menos" />
            <span className="metric-label">tiempo por matrícula</span>
          </div>
          <div className="case-metric">
            <div className="case-metric__icon"><FaDatabase size={18} /></div>
            <Counter count={100} suffix="%" />
            <span className="metric-label">datos centralizados</span>
          </div>
          <div className="case-metric">
            <div className="case-metric__icon"><FaChartLine size={18} /></div>
            <span className="case-metric__tag">Procesos</span>
            <span className="metric-label">optimizados en CENDCAP</span>
          </div>
        </div>
      </article>
    </section>
  )
}
