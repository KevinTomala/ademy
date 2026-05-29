import { FaShieldAlt, FaClock, FaFileAlt } from 'react-icons/fa'

const ITEMS = [
  {
    title: 'Cada persona ve solo lo que le toca',
    desc: 'Configuras los permisos por rol y nadie accede a información fuera de su área — sin depender de la confianza ni del olvido.',
    icon: <FaShieldAlt />,
  },
  {
    title: 'Registro exacto de cada acción',
    desc: 'Cada pago, cambio o modificación queda guardado con nombre, fecha y dato anterior. Si alguien pregunta, la respuesta ya está ahí.',
    icon: <FaClock />,
  },
  {
    title: 'Historial sin buscar en correos',
    desc: 'Todo el historial de operaciones vive en el sistema, filtrable por usuario, fecha o tipo de acción. Nada en hojas de cálculo ni chats.',
    icon: <FaFileAlt />,
  },
]

export default function Seguridad() {
  return (
    <section className="section" id="seguridad">
      <div className="section-header" data-reveal>
        <p className="eyebrow">Seguridad y trazabilidad</p>
        <h2>Tu información, bajo control total</h2>
        <p>Sabes quién hizo qué, cuándo y en qué registro — sin tener que preguntar ni confiar a ciegas.</p>
      </div>
      <div className="grid-3 security-grid">
        {ITEMS.map((item) => (
          <div key={item.title} className="modulo-card" data-reveal>
            <div className="modulo-card__header">
              <div className="modulo-card__icon">{item.icon}</div>
              <h3 className="modulo-card__title">{item.title}</h3>
            </div>
            <p className="modulo-card__desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
