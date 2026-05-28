import { Link } from 'react-router-dom'

const FEATURED = {
  id: 'AxjIpqDcZGc',
  title: 'Demo Ademy',
  desc: 'Conoce el sistema en menos de 2 minutos: matrícula, calificaciones, comunicados y más.',
  tags: ['Demo', 'Visión general'],
}

export default function Tutoriales() {
  return (
    <section className="section highlight" id="tutoriales">
      <div className="section-header" data-reveal>
        <h2>Ve Ademy en acción</h2>
        <p>Videos cortos por módulo para que tú y tu equipo dominen el sistema desde el primer día.</p>
      </div>

      <div className="tutoriales-featured" data-reveal>
        <article className="card video-card video-card--featured">
          <div
            className="video-thumb video-thumb--static"
            style={{ backgroundImage: `url('https://img.youtube.com/vi/${FEATURED.id}/hqdefault.jpg')` }}
            aria-label={FEATURED.title}
          >
            <span className="video-badge">Video destacado</span>
          </div>
          <div className="video-card__body">
            <h3>{FEATURED.title}</h3>
            <p>{FEATURED.desc}</p>
            <div className="tag-row">
              {FEATURED.tags.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>
        </article>

        <div className="tutoriales-cta" data-reveal>
          <p className="tutoriales-cta__text">
            Tenemos videos para cada rol: administradores, docentes y coordinadores,<br />
            organizados por módulo del sistema.
          </p>
          <Link to="/tutoriales" className="btn btn-primary">
            Ver todos los tutoriales
          </Link>
        </div>
      </div>
    </section>
  )
}
