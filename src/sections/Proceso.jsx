import { FaUsers, FaFileAlt, FaCreditCard, FaCheckCircle, FaAward } from 'react-icons/fa'

const STEPS = [
  {
    num: '1',
    title: 'El interesado llega',
    desc: 'Se registra con su fuente de origen: redes, referido o web. Queda en seguimiento sin perder el contacto.',
    icon: <FaUsers size={22} />,
  },
  {
    num: '2',
    title: 'Se matricula',
    desc: 'La secretaria selecciona el curso y la promoción. El contrato de inscripción se genera automáticamente.',
    icon: <FaFileAlt size={22} />,
  },
  {
    num: '3',
    title: 'El cajero registra el pago',
    desc: 'Se emite el comprobante al estudiante por correo. Si hay facturación, va al SRI sin pasos extra.',
    icon: <FaCreditCard size={22} />,
  },
  {
    num: '4',
    title: 'Documentos validados',
    desc: 'La secretaria sube la cédula. El sistema la verifica y notifica el resultado sin revisión manual.',
    icon: <FaCheckCircle size={22} />,
  },
  {
    num: '5',
    title: 'Diploma generado',
    desc: 'Al completar el curso, el diploma en PDF sale con logo, firma y datos del estudiante listo para entregar.',
    icon: <FaAward size={22} />,
  },
]

export default function Proceso() {
  return (
    <section className="section" id="proceso">
      <div className="section-header" data-reveal>
        <h2>Así trabaja tu academia con Ademy</h2>
        <p>Desde que llega el interesado hasta que recibe su diploma. Todo en un solo sistema.</p>
      </div>
      <div className="proceso-flow">
        {STEPS.map((s, i) => (
          <div key={s.num} className="proceso-step" data-reveal>
            <div className="proceso-icon-wrap">
              <div className="proceso-icon">{s.icon}</div>
              {i < STEPS.length - 1 && <div className="proceso-connector" aria-hidden="true" />}
            </div>
            <div className="proceso-badge">{s.num}</div>
            <h3 className="proceso-title">{s.title}</h3>
            <p className="proceso-desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
