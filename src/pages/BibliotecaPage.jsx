import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'

const MODULOS = ['Todos', 'Matrículas', 'Calificaciones', 'Comunicados', 'Horarios', 'Pagos', 'Reportes']

const VIDEOS = [
  {
    id: 'AxjIpqDcZGc',
    title: 'Demo general de Ademy',
    desc: 'Recorrido completo del sistema en menos de 2 minutos.',
    modulo: 'Todos',
    tags: ['Demo', 'Visión general'],
  },
  // Agrega más videos aquí con su módulo correspondiente
  // { id: 'TU_VIDEO_ID', title: '...', desc: '...', modulo: 'Matrículas', tags: ['...'] },
]

export default function BibliotecaPage() {
  const [filtro, setFiltro] = useState('Todos')

  const videosFiltrados = filtro === 'Todos'
    ? VIDEOS
    : VIDEOS.filter((v) => v.modulo === filtro)

  return (
    <main className="biblioteca-page">
      <div className="biblioteca-header">
        <Link to="/" className="biblioteca-back">
          <FaArrowLeft style={{verticalAlign:'middle', marginRight:6}} />Volver al inicio
        </Link>
        <h1>Tutoriales y capacitación</h1>
        <p>Videos cortos organizados por módulo para que tú y tu equipo dominen Ademy.</p>
      </div>

      <div className="biblioteca-filtros">
        {MODULOS.map((m) => (
          <button
            key={m}
            type="button"
            className={`filtro-btn${filtro === m ? ' filtro-btn--active' : ''}`}
            onClick={() => setFiltro(m)}
          >
            {m}
          </button>
        ))}
      </div>

      {videosFiltrados.length === 0 ? (
        <div className="biblioteca-empty">
          <p>Próximamente videos de <strong>{filtro}</strong>.</p>
        </div>
      ) : (
        <div className="grid-3 biblioteca-grid">
          {videosFiltrados.map((v) => (
            <article key={v.id + v.title} className="card video-card">
              <a
                className="video-thumb"
                href={`https://www.youtube.com/watch?v=${v.id}`}
                target="_blank"
                rel="noreferrer"
                style={{ backgroundImage: `url('https://img.youtube.com/vi/${v.id}/hqdefault.jpg')` }}
                aria-label={`Ver ${v.title} en YouTube`}
              >
                <span className="play">Ver en YouTube</span>
              </a>
              <div className="video-card__body">
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
                {v.tags.length > 0 && (
                  <div className="tag-row">
                    {v.tags.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      <div className="biblioteca-footer-cta">
        <p>¿Necesitas capacitación personalizada para tu institución?</p>
        <Link to="/#contacto" className="btn btn-primary">Contáctanos</Link>
      </div>
    </main>
  )
}
