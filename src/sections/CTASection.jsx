export default function CTASection() {
  return (
    <div className="section section--impact" style={{paddingTop: 0, paddingBottom: 0}}>
      <section className="cta" id="agenda" data-reveal>
        <div>
          <h2>¿Tu academia podría funcionar así?</h2>
          <p>Agenda una demo gratuita y te mostramos cómo en 30 minutos.</p>
        </div>
        <div className="cta-actions">
          <a className="btn btn-primary" href="#contacto">
            Agendar demo gratis
          </a>
          <a className="btn btn-ghost" style={{color:'#f8fafc', borderColor:'rgba(248,250,252,0.35)'}} href="#contacto">
            Hablar con el equipo
          </a>
        </div>
      </section>
    </div>
  )
}
