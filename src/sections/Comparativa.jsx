import { useState } from 'react'
import { FaUserGraduate, FaClipboardList, FaMoneyBillWave, FaFileAlt, FaHandshake, FaFileInvoiceDollar, FaChartBar, FaChevronUp, FaChevronDown, FaTimes, FaCheck } from 'react-icons/fa'

const ITEMS = [
  {
    proceso: 'Registro de estudiantes',
    icon: <FaUserGraduate />,
    antes: 'Datos duplicados en hojas y sistemas distintos',
    despues: 'Un solo registro por estudiante, sin repetir datos',
  },
  {
    proceso: 'Seguimiento de interesados',
    icon: <FaClipboardList />,
    antes: 'Seguimiento manual sin origen claro del contacto',
    despues: 'Bitácora centralizada con origen del contacto',
  },
  {
    proceso: 'Control de pagos',
    icon: <FaMoneyBillWave />,
    antes: 'Pagos sin conciliación rápida',
    despues: 'Pagos con estado, comprobante y factura automática',
  },
  {
    proceso: 'Diplomas y certificados',
    icon: <FaFileAlt />,
    antes: 'Impresos o enviados a mano uno por uno',
    despues: 'PDF generados con un clic, sin esfuerzo',
  },
  {
    proceso: 'Referidos y comisiones',
    icon: <FaHandshake />,
    antes: 'Sin saber quién refirió al estudiante',
    despues: 'Comisiones calculadas y trazadas automáticamente',
  },
  {
    proceso: 'Facturación electrónica',
    icon: <FaFileInvoiceDollar />,
    antes: 'Facturas al SRI enviadas por correo o manualmente',
    despues: 'Factura emitida al SRI al registrar el pago',
  },
  {
    proceso: 'Reportes y métricas',
    icon: <FaChartBar />,
    antes: 'Reportes tardíos y sin trazabilidad real',
    despues: 'Indicadores en tiempo real para decidir hoy',
  },
]

export default function Comparativa() {
  const [open, setOpen] = useState(0)

  return (
    <section className="section" id="comparativa">
      <div className="section-header" data-reveal>
        <h2>Antes vs. después</h2>
        <p>Descubre cómo Ademy transforma cada proceso de tu academia.</p>
      </div>
      <div className="cmp-accordion" data-reveal>
        {ITEMS.map(({ proceso, icon, antes, despues }, i) => {
          const isOpen = open === i
          return (
            <div
              key={proceso}
              className={`cmp-item${isOpen ? ' cmp-item--open' : ''}`}
            >
              <button
                className="cmp-trigger"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <span className="cmp-icon">{icon}</span>
                <span className="cmp-proceso">{proceso}</span>
                <span className="cmp-chevron">{isOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
              </button>
              {isOpen && (
                <div className="cmp-body">
                  <div className="cmp-col cmp-col--antes">
                    <span className="cmp-badge cmp-badge--red"><FaTimes style={{verticalAlign:'middle', marginRight:4}} />Antes</span>
                    <p>{antes}</p>
                  </div>
                  <div className="cmp-col cmp-col--despues">
                    <span className="cmp-badge cmp-badge--green"><FaCheck style={{verticalAlign:'middle', marginRight:4}} />Después</span>
                    <p>{despues}</p>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
