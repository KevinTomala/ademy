import { useState } from 'react'

const ITEMS = [
  {
    q: 'Cuanto tiempo toma implementar Ademy?',
    a: 'Entre 2 y 4 semanas, segun sedes, volumen de datos y reglas de negocio.',
  },
  {
    q: 'Se puede migrar informacion historica?',
    a: 'Si. Importamos estudiantes, matriculas, pagos y catalogos con plantillas asistidas.',
  },
  {
    q: 'Incluye soporte y capacitacion?',
    a: 'Incluimos sesiones por rol, videos on demand y soporte prioritario en el arranque.',
  },
  {
    q: 'Puedo personalizar reportes y procesos?',
    a: 'Claro. Ajustamos flujos, etiquetas y permisos segun tus indicadores clave.',
  },
  {
    q: 'Que opciones de hosting existen?',
    a: 'Se puede instalar en tu servidor o en una nube gestionada segun requerimientos.',
  },
  {
    q: 'Como se protege la informacion?',
    a: 'Control por roles, monitoreo y respaldo planificado para datos sensibles.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  const toggle = (idx) => setOpen((cur) => (cur === idx ? null : idx))

  return (
    <section className="section" id="faq">
      <div className="section-header" data-reveal>
        <h2>Preguntas frecuentes</h2>
        <p>Respuestas claras para avanzar rapido con tu equipo.</p>
      </div>
      <div className="faq">
        {ITEMS.map((item, idx) => (
          <div key={idx} data-reveal>
            <div className={`faq-item${open === idx ? ' is-open' : ''}`}>
              <button
                className="faq-question"
                type="button"
                aria-expanded={open === idx}
                onClick={() => toggle(idx)}
              >
                <span>{item.q}</span>
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-answer">
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
