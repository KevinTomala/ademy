const QUOTES = [
  {
    text: '"La matricula que tomaba horas hoy se cierra en minutos. Nuestro equipo respira."',
    author: 'Direccion academica',
  },
  {
    text: '"Por fin tenemos indicadores claros para cada sede y cada programa."',
    author: 'Coordinacion regional',
  },
]

export default function Testimonios() {
  return (
    <section className="section" id="testimonios">
      <div className="section-header" data-reveal>
        <h2>Equipos que ya trabajan con Ademy</h2>
        <p>Resultados reales en control academico y experiencia del estudiante.</p>
      </div>
      <div className="grid-2">
        {QUOTES.map((q) => (
          <blockquote key={q.author} className="quote" data-reveal>
            {q.text}
            <span>{q.author}</span>
          </blockquote>
        ))}
      </div>
    </section>
  )
}
