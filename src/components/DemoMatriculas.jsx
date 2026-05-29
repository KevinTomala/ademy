import { useState, useMemo } from 'react'
import { FaList, FaCheckCircle, FaClock, FaWallet, FaCheck, FaFlag, FaEraser, FaPencilAlt, FaTrash, FaInfoCircle } from 'react-icons/fa'

const MATRICULAS = [
  { id: 1, codigo: 'ESV-00001', estudiante: 'Daniela Rojas',    promocion: 'Escolta y Seguridad VIP',      curso: '0001', fecha: '19/1/2026', estado: 'activa',     pago: 'parcial'   },
  { id: 2, codigo: 'ES-00001',  estudiante: 'Sofía Ramírez',    promocion: 'Supervisor de Operaciones',    curso: '0001', fecha: '19/1/2026', estado: 'activa',     pago: 'pagado'    },
  { id: 3, codigo: 'EMC-00001', estudiante: 'Esteban Navarro',  promocion: 'Manejo de Consolas',           curso: '0001', fecha: '19/1/2026', estado: 'activa',     pago: 'pagado'    },
  { id: 4, codigo: 'ESV-00002', estudiante: 'Camila Torres',    promocion: 'Escolta y Seguridad VIP',      curso: '0001', fecha: '20/1/2026', estado: 'reservada',  pago: 'pendiente' },
  { id: 5, codigo: 'ES-00002',  estudiante: 'Andrés Mejía',     promocion: 'Supervisor de Operaciones',    curso: '0001', fecha: '20/1/2026', estado: 'activa',     pago: 'parcial'   },
  { id: 6, codigo: 'MC-00001',  estudiante: 'Valeria Salcedo',  promocion: 'Manejo de Crisis',             curso: '0001', fecha: '21/1/2026', estado: 'finalizada', pago: 'pagado'    },
]

const ESTADO_PAGO_CFG = {
  pagado:   { label: 'Pagado',       cls: 'dm-badge-pago-ok'      },
  parcial:  { label: 'Pago parcial', cls: 'dm-badge-pago-parcial' },
  pendiente:{ label: 'Pendiente',    cls: 'dm-badge-pago-pend'    },
}

const ESTADO_MAT_CFG = {
  activa:     { label: 'Activa',     cls: 'dm-badge-mat-activa'     },
  reservada:  { label: 'Reservada',  cls: 'dm-badge-mat-reservada'  },
  suspendida: { label: 'Suspendida', cls: 'dm-badge-mat-suspendida' },
  finalizada: { label: 'Finalizada', cls: 'dm-badge-mat-finalizada' },
  anulada:    { label: 'Anulada',    cls: 'dm-badge-mat-anulada'    },
}

const METRICAS = [
  { key: 'total',       label: 'Total',            icon: <FaList />,        color: 'dm-met-primary'   },
  { key: 'activas',     label: 'Activas',           icon: <FaCheckCircle />, color: 'dm-met-success'   },
  { key: 'pendiente',   label: 'Pendiente de pago', icon: <FaClock />,       color: 'dm-met-warning'   },
  { key: 'parcial',     label: 'Pago parcial',      icon: <FaWallet />,      color: 'dm-met-info'      },
  { key: 'pagadas',     label: 'Pagadas',            icon: <FaCheck />,       color: 'dm-met-secondary' },
  { key: 'finalizadas', label: 'Finalizadas',        icon: <FaFlag />,        color: 'dm-met-dark'      },
]

function contarMetrica(key, lista) {
  if (key === 'total')      return lista.length
  if (key === 'activas')    return lista.filter(m => m.estado === 'activa').length
  if (key === 'pendiente')  return lista.filter(m => m.pago === 'pendiente').length
  if (key === 'parcial')    return lista.filter(m => m.pago === 'parcial').length
  if (key === 'pagadas')    return lista.filter(m => m.pago === 'pagado').length
  if (key === 'finalizadas')return lista.filter(m => m.estado === 'finalizada').length
  return 0
}

function filtrarPorMetrica(key, lista) {
  if (key === 'total')       return lista
  if (key === 'activas')     return lista.filter(m => m.estado === 'activa')
  if (key === 'pendiente')   return lista.filter(m => m.pago === 'pendiente')
  if (key === 'parcial')     return lista.filter(m => m.pago === 'parcial')
  if (key === 'pagadas')     return lista.filter(m => m.pago === 'pagado')
  if (key === 'finalizadas') return lista.filter(m => m.estado === 'finalizada')
  return lista
}

export default function DemoMatriculas() {
  const [matriculas, setMatriculas] = useState(MATRICULAS)
  const [filtroMetrica, setFiltroMetrica] = useState('total')
  const [busqueda, setBusqueda] = useState('')
  const [filtroEstado, setFiltroEstado] = useState('all')
  const [filtroPago, setFiltroPago] = useState('all')

  const limpiarFiltros = () => {
    setBusqueda('')
    setFiltroEstado('all')
    setFiltroPago('all')
    setFiltroMetrica('total')
  }

  const filas = useMemo(() => {
    let lista = filtrarPorMetrica(filtroMetrica, matriculas)
    if (busqueda.trim()) {
      const q = busqueda.toLowerCase()
      lista = lista.filter(m =>
        m.estudiante.toLowerCase().includes(q) ||
        m.codigo.toLowerCase().includes(q) ||
        m.promocion.toLowerCase().includes(q)
      )
    }
    if (filtroEstado !== 'all') lista = lista.filter(m => m.estado === filtroEstado)
    if (filtroPago   !== 'all') lista = lista.filter(m => m.pago   === filtroPago)
    return lista
  }, [matriculas, filtroMetrica, busqueda, filtroEstado, filtroPago])

  const ciclarPago = (id) => {
    const ciclo = { pendiente: 'parcial', parcial: 'pagado', pagado: 'pendiente' }
    setMatriculas(prev => prev.map(m => m.id === id ? { ...m, pago: ciclo[m.pago] } : m))
  }

  return (
    <div className="dm-wrap">
      {/* Métricas */}
      <div className="dm-metricas">
        {METRICAS.map(met => (
          <button
            key={met.key}
            className={`dm-met-card${filtroMetrica === met.key ? ' is-active' : ''}`}
            onClick={() => setFiltroMetrica(met.key)}
          >
            <div className={`dm-met-icon ${met.color}`}>{met.icon}</div>
            <div className="dm-met-info">
              <span className="dm-met-label">{met.label}</span>
              <span className="dm-met-count">{contarMetrica(met.key, matriculas)}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Filtros */}
      <div className="dm-filters">
        <input
          type="text"
          className="dm-input dm-input-search"
          placeholder="Estudiante, promoción, curso o código"
          value={busqueda}
          onChange={e => { setBusqueda(e.target.value); setFiltroMetrica('total') }}
        />
        <select className="dm-select" value={filtroEstado} onChange={e => { setFiltroEstado(e.target.value); setFiltroMetrica('total') }}>
          <option value="all">Estado matrícula — Todos</option>
          <option value="activa">Activa</option>
          <option value="reservada">Reservada</option>
          <option value="suspendida">Suspendida</option>
          <option value="finalizada">Finalizada</option>
          <option value="anulada">Anulada</option>
        </select>
        <select className="dm-select" value={filtroPago} onChange={e => { setFiltroPago(e.target.value); setFiltroMetrica('total') }}>
          <option value="all">Estado pago — Todos</option>
          <option value="pendiente">Pendiente</option>
          <option value="parcial">Pago parcial</option>
          <option value="pagado">Pagado</option>
        </select>
        <button className="dm-btn-outline dm-btn-clear" onClick={limpiarFiltros} title="Limpiar filtros">
          <FaEraser size={13} style={{marginRight:4}} />
          Limpiar
        </button>
      </div>

      {/* Tabla */}
      <div className="dm-table-card">
        <div className="dm-table-header">
          <div>
            <p className="dm-label">Matrículas registradas</p>
            <h5 className="dm-table-title">Listado de matrículas</h5>
          </div>
          <span className="dm-pill">{filas.length} registros</span>
        </div>
        <div className="dm-table-wrapper">
          <table className="dm-table">
            <thead>
              <tr>
                <th className="text-center">#</th>
                <th>Código</th>
                <th>Estudiante</th>
                <th>Promoción / Cursos</th>
                <th>Fecha matrícula</th>
                <th>Estado</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filas.length === 0 ? (
                <tr>
                  <td colSpan="7" className="dm-empty">
                    <FaList size={28} style={{display:'block',margin:'0 auto 8px',opacity:0.3}} />
                    Sin resultados para los filtros aplicados
                  </td>
                </tr>
              ) : (
                filas.map((m, idx) => {
                  const estadoCfg = ESTADO_MAT_CFG[m.estado] || { label: m.estado, cls: '' }
                  const pagoCfg   = ESTADO_PAGO_CFG[m.pago]   || { label: m.pago,   cls: '' }
                  return (
                    <tr key={m.id}>
                      <td className="text-center dm-idx">{idx + 1}</td>
                      <td className="dm-codigo">{m.codigo}</td>
                      <td className="dm-nombre">{m.estudiante}</td>
                      <td>
                        <div className="dm-promo">{m.promocion}</div>
                        <small className="dm-curso">{m.curso}</small>
                      </td>
                      <td>{m.fecha}</td>
                      <td>
                        <div style={{display:'flex', flexDirection:'column', gap:4}}>
                          <span className={`dm-badge ${estadoCfg.cls}`}>{estadoCfg.label}</span>
                          <span
                            className={`dm-badge ${pagoCfg.cls}`}
                            style={m.pago !== 'pagado' ? {cursor:'pointer'} : {}}
                            title={m.pago !== 'pagado' ? 'Clic para avanzar estado de pago' : ''}
                            onClick={() => m.pago !== 'pagado' && ciclarPago(m.id)}
                          >
                            {pagoCfg.label}
                          </span>
                        </div>
                      </td>
                      <td className="text-center">
                        <button className="dm-icon-btn" title="Editar" disabled>
                          <FaPencilAlt size={13} />
                        </button>
                        <button className="dm-icon-btn danger" title="Eliminar" disabled>
                          <FaTrash size={13} />
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
        <p className="dm-tip">
          <FaInfoCircle size={12} style={{marginRight:4, opacity:.5, verticalAlign:'middle'}} />
          Haz clic en los badges de pago pendiente o parcial para avanzar el estado
        </p>
      </div>
    </div>
  )
}
