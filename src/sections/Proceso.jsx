const STEPS = [
  {
    num: '1',
    title: 'Levantamiento y roles',
    desc: 'Mapeamos procesos, roles y permisos que usara cada area.',
  },
  {
    num: '2',
    title: 'Configuracion y catalogos',
    desc: 'Parametrizamos centros, niveles, promociones y reglas de negocio.',
  },
  {
    num: '3',
    title: 'Capacitacion y puesta en marcha',
    desc: 'Capacitacion por rol, piloto y acompanamiento del primer ciclo.',
  },
]

export default function Proceso() {
  return (
    <section className="section" id="proceso">
      <div className="section-header" data-reveal>
        <h2>Implementacion clara y acompanamiento real</h2>
        <p>Te guiamos desde el primer dia para que el equipo adopte el sistema sin friccion.</p>
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
