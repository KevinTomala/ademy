import { useState } from 'react'
import { FaCheck, FaMinus } from 'react-icons/fa'

const PLANES = [
  {
    id: 'esencial',
    nombre: 'Esencial',
    desc: 'Para centros que quieren digitalizarse desde el primer día.',
    mensual: 99,
    anual: 990,
    popular: false,
    cta: 'Comenzar',
    features: [
      { label: 'Gestión académica completa', included: true },
      { label: 'Módulo operativo e interesados', included: true },
      { label: 'Roles, permisos y auditoría', included: true },
      { label: 'Campus Ademy (portal estudiante)', included: true },
      { label: 'Módulo financiero y pagos', included: false },
      { label: 'Docco OCR – validación de documentos', included: false },
      { label: 'Integración Contífico / SRI', included: false },
      { label: 'Módulo RRHH y nómina docente', included: false },
    ],
  },
  {
    id: 'profesional',
    nombre: 'Profesional',
    desc: 'Para instituciones con cobros activos que necesitan control financiero total.',
    mensual: 199,
    anual: 1990,
    popular: true,
    cta: 'Comenzar',
    features: [
      { label: 'Gestión académica completa', included: true },
      { label: 'Módulo operativo e interesados', included: true },
      { label: 'Roles, permisos y auditoría', included: true },
      { label: 'Campus Ademy (portal estudiante)', included: true },
      { label: 'Módulo financiero y pagos', included: true },
      { label: 'Docco OCR – validación de documentos', included: true },
      { label: 'Integración Contífico / SRI', included: true },
      { label: 'Módulo RRHH y nómina docente', included: false },
    ],
  },
  {
    id: 'enterprise',
    nombre: 'Enterprise',
    desc: 'Para institutos con planta docente propia y administración robusta.',
    mensual: 399,
    anual: 3990,
    popular: false,
    cta: 'Hablar con ventas',
    features: [
      { label: 'Gestión académica completa', included: true },
      { label: 'Módulo operativo e interesados', included: true },
      { label: 'Roles, permisos y auditoría', included: true },
      { label: 'Campus Ademy (portal estudiante)', included: true },
      { label: 'Módulo financiero y pagos', included: true },
      { label: 'Docco OCR – validación de documentos', included: true },
      { label: 'Integración Contífico / SRI', included: true },
      { label: 'Módulo RRHH y nómina docente', included: true },
    ],
  },
]

export default function Precios() {
  const [anual, setAnual] = useState(false)

  return (
    <section className="section" id="precios">
      <div className="section-header" data-reveal>
        <h2>Precios claros, sin sorpresas</h2>
        <p>Elige el plan que se ajusta al tamaño y necesidades de tu institución.</p>
      </div>

      <div className="price-toggle" data-reveal>
        <span className={!anual ? 'price-toggle__label--active' : 'price-toggle__label'}>Mensual</span>
        <button
          className={`price-toggle__btn${anual ? ' is-active' : ''}`}
          onClick={() => setAnual((v) => !v)}
          aria-pressed={anual}
          type="button"
          aria-label="Cambiar a facturación anual"
        />
        <span className={anual ? 'price-toggle__label--active' : 'price-toggle__label'}>
          Anual <span className="price-badge">2 meses gratis</span>
        </span>
      </div>

      <div className="price-grid" data-reveal>
        {PLANES.map((plan) => (
          <div key={plan.id} className={`price-card${plan.popular ? ' price-card--popular' : ''}`}>
            {plan.popular && (
              <span className="price-popular-badge">Más popular</span>
            )}
            <div className="price-card__head">
              <h3 className="price-card__name">{plan.nombre}</h3>
              <p className="price-card__desc">{plan.desc}</p>
            </div>

            <div className="price-card__amount">
              <span className="price-card__currency">$</span>
              <span className="price-card__value">
                {anual ? Math.round(plan.anual / 12) : plan.mensual}
              </span>
              <span className="price-card__period">/mes</span>
            </div>
            {anual && (
              <p className="price-card__billed">Facturado anualmente · ${plan.anual}/año</p>
            )}

            <a
              href="#contacto"
              className={`btn ${plan.popular ? 'btn-primary' : 'btn-ghost'} price-card__cta`}
            >
              {plan.cta}
            </a>

            <ul className="price-features">
              {plan.features.map(({ label, included }) => (
                <li key={label} className={`price-feature${included ? '' : ' price-feature--off'}`}>
                  <span className="price-feature__icon">
                    {included ? <FaCheck /> : <FaMinus />}
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="price-enterprise" data-reveal>
        <div className="price-enterprise__text">
          <strong>¿Necesitas instalación en tu propio servidor?</strong>
          <p>
            Implementamos Ademy directamente en tu infraestructura, sin depender de la nube.
            Cuéntanos el tamaño de tu institución y te preparamos una propuesta a medida.
          </p>
        </div>
        <a href="#contacto" className="btn btn-ghost price-enterprise__cta">
          Hablar con nosotros
        </a>
      </div>

    </section>
  )
}
