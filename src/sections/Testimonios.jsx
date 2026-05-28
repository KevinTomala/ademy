const QUOTES = [
  {
    text: '"La matrícula que nos tomaba 25 minutos hoy se cierra en menos de 5. El contrato sale solo y el estudiante recibe todo por correo."',
    author: 'Coordinadora académica · Centro de formación continua, Quito',
  },
  {
    text: '"Por fin tenemos indicadores claros para cada sede. Antes teníamos que esperar a que alguien armara el reporte en Excel."',
    author: 'Director administrativo · Instituto técnico, Guayaquil',
  },
  {
    text: '"La facturación al SRI ya no es un dolor de cabeza. El cajero registra el pago y la factura sale sola — cero errores manuales."',
    author: 'Administradora financiera · Academia de capacitación, Cuenca',
  },
]

export default function Testimonios() {
  return (
    <section className="section" id="testimonios">
      <div className="section-header" data-reveal>
        <h2>Equipos que ya trabajan con Ademy</h2>
        <p>Resultados reales en control académico, cobros y experiencia del estudiante.</p>
      </div>
      <div className="grid-3">
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
