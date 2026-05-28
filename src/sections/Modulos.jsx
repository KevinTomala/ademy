const MODULOS = [
  'Interesados y bitacora',
  'Centros y empresas',
  'Niveles y catalogos',
  'Estudiantes y historial',
  'Matriculas y promociones',
  'Pagos y comprobantes',
  'Bonificaciones',
  'Usuarios y roles',
]

export default function Modulos() {
  return (
    <section className="section" id="modulos">
      <div className="section-header" data-reveal>
        <h2>Modulos principales del sistema</h2>
        <p>Funcionalidades reales del producto en operacion.</p>
      </div>
      <div className="grid-4">
        {MODULOS.map((mod) => (
          <div key={mod} className="chip" data-reveal>
            {mod}
          </div>
        ))}
      </div>
    </section>
  )
}
