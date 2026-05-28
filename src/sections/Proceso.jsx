const STEPS = [
  {
    num: '1',
    title: 'El interesado llega',
    desc: 'Se registra con su fuente de origen — redes, referido o web. Queda en seguimiento sin perder el contacto.',
  },
  {
    num: '2',
    title: 'Se matricula',
    desc: 'La secretaria selecciona el curso y la promoción. El contrato de inscripción se genera automáticamente.',
  },
  {
    num: '3',
    title: 'El cajero registra el pago',
    desc: 'Se emite el comprobante al estudiante por correo. Si hay facturación, va al SRI sin pasos extra.',
  },
  {
    num: '4',
    title: 'Documentos validados',
    desc: 'La secretaria sube la cédula. El sistema la verifica y notifica el resultado sin revisión manual.',
  },
  {
    num: '5',
    title: 'Diploma generado',
    desc: 'Al completar el curso, el diploma en PDF sale con logo, firma y datos del estudiante listo para entregar.',
  },
]

export default function Proceso() {
  return (
    <section className="section" id="proceso">
      <div className="section-header" data-reveal>
        <h2>Así trabaja tu academia con Ademy</h2>
        <p>Desde que llega el interesado hasta que recibe su diploma — todo en un solo sistema.</p>
      </div>
      <div className="steps">
        {STEPS.map((s) => (
          <div key={s.num} className="step" data-reveal>
            <span className="step-number">{s.num}</span>
            <div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
