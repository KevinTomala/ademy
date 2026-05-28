const MODULOS = [
  'Interesados y bitácora',
  'Centros y empresas',
  'Niveles y catálogos',
  'Estudiantes y historial',
  'Matrículas y promociones',
  'Pagos y comprobantes',
  'Bonificaciones',
  'Usuarios y roles',
]

export default function Modulos() {
  return (
    <section className="section" id="modulos">
      <div className="section-header" data-reveal>
        <h2>Módulos principales del sistema</h2>
        <p>Funcionalidades reales del producto en operación.</p>
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
