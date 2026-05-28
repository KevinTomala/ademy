const IMAGES = [
  { src: '/assets/screens/login.png', alt: 'Pantalla de inicio de sesion', caption: 'Ingreso al sistema' },
  { src: '/assets/screens/seguridad_dashboard.png', alt: 'Dashboard de seguridad', caption: 'Dashboard de seguridad' },
  { src: '/assets/screens/matriculas_listado.png', alt: 'Listado de matriculas', caption: 'Listado de matriculas' },
  { src: '/assets/screens/pagos_listado.png', alt: 'Listado de pagos', caption: 'Control de pagos' },
  { src: '/assets/screens/pagos_modal_registrar.png', alt: 'Registro de pagos', caption: 'Registro de pago' },
  { src: '/assets/screens/ticket_pago.png', alt: 'Ticket de pago', caption: 'Ticket de pago' },
  { src: '/assets/screens/niveles.png', alt: 'Niveles academicos', caption: 'Niveles academicos' },
]

export default function Gallery() {
  const items = [...IMAGES, ...IMAGES]

  return (
    <section className="section" id="capturas">
      <div className="section-header" data-reveal>
        <h2>Capturas reales del sistema</h2>
        <p>Vistas reales de Ademy en operacion diaria.</p>
      </div>
      <div className="gallery" data-reveal>
        <div className="gallery-track">
          {items.map((img, i) => (
            <article key={i} className="gallery-card">
              <img src={img.src} alt={img.alt} loading="lazy" />
              <div className="gallery-caption">{img.caption}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
