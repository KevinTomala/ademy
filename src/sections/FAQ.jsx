import { useState } from 'react'

const ITEMS = [
  {
    q: '¿Cuánto cuesta Ademy?',
    a: 'Tenemos tres planes mensuales: Esencial ($99/mes), Profesional ($199/mes) y Enterprise ($399/mes). Todos incluyen Campus Ademy para estudiantes. Si pagas anual te regalamos 2 meses. También ofrecemos instalación en tu propio servidor desde $6,000.',
  },
  {
    q: '¿Funciona con el SRI de Ecuador?',
    a: 'Sí. Ademy se integra con Contifico para emitir facturas electrónicas válidas ante el SRI automáticamente cuando se registra un pago.',
  },
  {
    q: '¿Cuánto tiempo toma implementar Ademy?',
    a: 'Entre 2 y 4 semanas según el número de sedes, volumen de datos y reglas de negocio. Acompañamos todo el proceso.',
  },
  {
    q: '¿Se puede migrar información histórica?',
    a: 'Sí. Importamos estudiantes, matrículas, pagos y catálogos con plantillas asistidas para que no pierdas nada.',
  },
  {
    q: '¿Incluye capacitación para mi equipo?',
    a: 'Incluimos sesiones por rol: secretaria, cajero, administrador. Más videos de referencia y soporte prioritario durante el arranque.',
  },
  {
    q: '¿Cómo se protege la información de mis estudiantes?',
    a: 'Cada usuario accede solo a lo que le corresponde según su rol. Los documentos se almacenan en la nube con acceso seguro, y cada cambio queda registrado con quién lo hizo y cuándo.',
  },
  {
    q: '¿Funciona con múltiples sedes?',
    a: 'Sí. Puedes gestionar todas tus sedes desde una sola plataforma, con reportes independientes por centro.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  const toggle = (idx) => setOpen((cur) => (cur === idx ? null : idx))

  return (
    <section className="section" id="faq">
      <div className="section-header" data-reveal>
        <h2>Preguntas frecuentes</h2>
        <p>Respuestas claras para avanzar rápido con tu equipo.</p>
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
