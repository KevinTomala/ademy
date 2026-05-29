import { FaUsers, FaBuilding, FaBook, FaUserGraduate, FaCalendarCheck, FaCreditCard, FaPercent, FaLock } from 'react-icons/fa'

const MODULOS = [
  {
    title: 'Interesados y bitácora',
    desc: 'Registra prospectos, seguimientos y actividad comercial en un solo lugar.',
    icon: <FaUsers />,
  },
  {
    title: 'Centros y empresas',
    desc: 'Gestiona múltiples sedes, alianzas corporativas y convenios institucionales.',
    icon: <FaBuilding />,
  },
  {
    title: 'Niveles y catálogos',
    desc: 'Define cursos, niveles, modalidades y precios con total flexibilidad.',
    icon: <FaBook />,
  },
  {
    title: 'Estudiantes y historial',
    desc: 'Expediente completo por alumno: datos, documentos, cursos y avances.',
    icon: <FaUserGraduate />,
  },
  {
    title: 'Matrículas y promociones',
    desc: 'Alta de alumnos, gestión de grupos y aplicación de descuentos automáticos.',
    icon: <FaCalendarCheck />,
  },
  {
    title: 'Pagos y comprobantes',
    desc: 'Registra cobros, genera recibos y lleva el estado de cuenta de cada alumno.',
    icon: <FaCreditCard />,
  },
  {
    title: 'Bonificaciones',
    desc: 'Configura becas, descuentos por volumen y convenios con reglas personalizadas.',
    icon: <FaPercent />,
  },
  {
    title: 'Usuarios y roles',
    desc: 'Controla accesos por perfil: admin, coordinador, docente o recepcionista.',
    icon: <FaLock />,
  },
]

export default function Modulos() {
  return (
    <section className="section" id="modulos">
      <div className="section-header" data-reveal>
        <h2>Módulos principales del sistema</h2>
        <p>Funcionalidades reales del producto en operación.</p>
      </div>
      <div className="modulos-grid">
        {MODULOS.map((mod) => (
          <div key={mod.title} className="modulo-card" data-reveal>
            <div className="modulo-card__header">
              <div className="modulo-card__icon">{mod.icon}</div>
              <h3 className="modulo-card__title">{mod.title}</h3>
            </div>
            <p className="modulo-card__desc">{mod.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
