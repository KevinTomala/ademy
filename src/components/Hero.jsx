import { FaArrowRight, FaPlay } from 'react-icons/fa'
import Counter from './Counter'
import HeroNetwork from './HeroNetwork'

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-text" data-reveal="left">
        <div className="hero-badge">
          <span className="hero-badge-dot"></span>
          Hecho para centros de capacitación en Ecuador
        </div>
        <h1>
          <span className="accent">Gestión de tu centro,</span>{' '}en un solo lugar
        </h1>
        <p>
          Matrículas, cobros, diplomas y facturación electrónica al SRI. Todo conectado, todo trazable desde el primer contacto hasta el certificado final.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#contacto">
            Quiero una demo gratis <FaArrowRight style={{display:'inline', verticalAlign:'middle', marginLeft:6}} />
          </a>
          <a className="btn btn-ghost hero-cta-secondary" href="#tutoriales">
            <FaPlay style={{display:'inline', verticalAlign:'middle', marginRight:6}} /> Ver cómo funciona (2 min)
          </a>
        </div>
        <div className="hero-trust">
          <div className="hero-trust-item">
            <Counter count={60} prefix="-" suffix="%" />
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
        <HeroNetwork />
      </div>
    </section>
  )
}
