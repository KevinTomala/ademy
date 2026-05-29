import { useState, useEffect } from 'react'
import { FaClipboardList, FaUsers, FaCalendarCheck, FaCreditCard } from 'react-icons/fa'
import DemoBitacora from '../components/DemoBitacora'
import DemoMatriculas from '../components/DemoMatriculas'
import DemoPagos from '../components/DemoPagos'
import DemoEstudiantes from '../components/DemoEstudiantes'

const TABS = [
  { id: 'admisiones',  label: 'Admisiones',  icon: <FaClipboardList /> },
  { id: 'estudiantes', label: 'Estudiantes', icon: <FaUsers /> },
  { id: 'matriculas',  label: 'Matrículas',  icon: <FaCalendarCheck /> },
  { id: 'pagos',       label: 'Pagos',       icon: <FaCreditCard /> },
]

export default function Demo() {
  const [active, setActive] = useState('admisiones')
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const ids = TABS.map((t) => t.id)
    const timer = setInterval(() => {
      setActive((cur) => {
        const idx = ids.indexOf(cur)
        return ids[(idx + 1) % ids.length]
      })
    }, 6000)
    return () => clearInterval(timer)
  }, [paused])

  return (
    <section
      className="section demo"
      id="demo"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="section-header" data-reveal>
        <h2>Pruébalo tú mismo</h2>
        <p>Explora los módulos clave de Ademy con datos de ejemplo — sin registro, sin contraseña.</p>
      </div>

      <div className="demo-shell" data-reveal>
        <aside className="demo-shell-sidebar">
          <div className="demo-shell-sidebar-brand">
            <img src="/assets/ademy-logo.png" alt="Ademy" className="demo-shell-logo" />
          </div>
          <nav className="demo-shell-nav">
            {TABS.map((t) => (
              <button
                key={t.id}
                className={`demo-shell-nav-item${active === t.id ? ' is-active' : ''}`}
                onClick={() => setActive(t.id)}
              >
                <span className="demo-shell-nav-icon">{t.icon}</span>
                {t.label}
              </button>
            ))}
          </nav>
        </aside>

        <div className="demo-shell-body">
          {active === 'admisiones' && <DemoBitacora />}
          {active === 'matriculas' && <DemoMatriculas />}
          {active === 'pagos' && <DemoPagos />}
          {active === 'estudiantes' && <DemoEstudiantes />}
        </div>
      </div>
    </section>
  )
}
