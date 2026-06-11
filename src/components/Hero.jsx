import { FaArrowRight, FaPlay } from 'react-icons/fa'
import Counter from './Counter'
import HeroEcosystem from './HeroEcosystem'

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-text" data-reveal="left">
        <div className="hero-badge">
          <span className="hero-badge-dot"></span>
          Ecosistema para centros de capacitación
        </div>
        <h1>
          <span className="accent">De la matrícula al empleo,</span>{' '}un flujo completo
        </h1>
        <p>
          Ademy gestiona tu campus, Docco verifica documentos con IA y EmpleoFácil conecta a tus egresados con empleadores. Un ecosistema real, en producción, adaptable a los requerimientos de tu institución.
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
            <Counter count={3} suffix=" plataformas" />
            <span className="metric-label">integradas en un flujo</span>
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
        <HeroEcosystem />
      </div>
    </section>
  )
}
