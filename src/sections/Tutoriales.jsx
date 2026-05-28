import { useState } from 'react'

const VIDEOS = [
  {
    id: 'AxjIpqDcZGc',
    href: 'https://www.youtube.com/watch?v=AxjIpqDcZGc',
    title: 'Demo Ademy',
    cardTitle: 'Demo publica en la landing',
    desc: 'Ideal para conversion: un video corto de 60-90s con beneficios clave. Hospedalo en YouTube (no listado) o Vimeo y embebe aqui.',
    tags: [],
  },
  {
    id: '-5YfRX9Qh5M',
    href: 'https://www.youtube.com/watch?v=-5YfRX9Qh5M',
    title: 'Onboarding por roles',
    cardTitle: 'Biblioteca dentro del sistema',
    desc: 'Micro-videos por rol con acceso desde Ademy. Reduce tickets y acelera la adopcion desde el primer dia.',
    tags: ['Administracion', 'Docentes', 'Coordinacion'],
  },
  {
    id: '-5YfRX9Qh5M',
    href: 'https://www.youtube.com/watch?v=-5YfRX9Qh5M',
    title: 'Curso en Moodle',
    cardTitle: 'Campus en Moodle',
    desc: 'Si necesitas seguimiento, evaluaciones o certificados, monta un curso en Moodle y enlazalo desde Ademy.',
    tags: ['Progreso', 'Evaluaciones', 'Certificados'],
  },
]

function VideoModal({ videoId, href, title, onClose }) {
  return (
    <div className="video-modal is-open" aria-hidden="false" role="dialog" aria-modal="true">
      <div className="video-modal__backdrop" onClick={onClose}></div>
      <div className="video-modal__content" role="document">
        <button className="video-modal__close" type="button" aria-label="Cerrar" onClick={onClose}>
          ✕
        </button>
        <div
          className="video-modal__preview"
          style={{ backgroundImage: `url('https://img.youtube.com/vi/${videoId}/hqdefault.jpg')` }}
          aria-label={title}
        ></div>
        <div className="video-modal__actions">
          <a className="btn btn-primary" href={href} target="_blank" rel="noreferrer">
            Ver en YouTube
          </a>
          <button className="btn btn-ghost" type="button" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Tutoriales() {
  const [modal, setModal] = useState(null)

  const openModal = (video, e) => {
    e.preventDefault()
    setModal(video)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setModal(null)
    document.body.style.overflow = ''
  }

  return (
    <>
      <section className="section highlight" id="tutoriales">
        <div className="section-header" data-reveal>
          <h2>Videos y capacitacion a tu medida</h2>
          <p>Tres formatos para marketing, onboarding y seguimiento interno.</p>
        </div>
        <div className="grid-3">
          {VIDEOS.map((v) => (
            <article key={v.title} className="card video-card" data-reveal>
              <div className="video-embed" aria-label={`Video ${v.cardTitle}`}>
                <a
                  className="video-thumb"
                  href={v.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{ backgroundImage: `url('https://img.youtube.com/vi/${v.id}/hqdefault.jpg')` }}
                  onClick={(e) => openModal(v, e)}
                >
                  <span className="play">Ver en YouTube</span>
                </a>
              </div>
              <h3>{v.cardTitle}</h3>
              <p>{v.desc}</p>
              {v.tags.length > 0 && (
                <div className="tag-row">
                  {v.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {modal && (
        <VideoModal videoId={modal.id} href={modal.href} title={modal.title} onClose={closeModal} />
      )}
    </>
  )
}
