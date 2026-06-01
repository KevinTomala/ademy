import { useState, useMemo } from 'react'
import { FaTimes, FaCheck, FaClock, FaMoneyBillWave, FaWallet, FaCheckCircle, FaCalendarAlt, FaChevronRight, FaCreditCard, FaInfoCircle } from 'react-icons/fa'

const COBROS = [
  { id: 1, matricula: '#2', estudiante: 'Ana Martínez',   total: 287.50, pagado: 80.00,  estado: 'parcial'   },
  { id: 2, matricula: '#1', estudiante: 'Mateo Suárez',   total: 287.50, pagado: 100.00, estado: 'parcial'   },
  { id: 3, matricula: '#6', estudiante: 'Daniela Rojas',  total: 230.00, pagado: 200.00, estado: 'parcial'   },
  { id: 4, matricula: '#4', estudiante: 'Camila Torres',  total: 287.50, pagado: 0,      estado: 'pendiente' },
  { id: 5, matricula: '#5', estudiante: 'Andrés Mejía',   total: 287.50, pagado: 0,      estado: 'pendiente' },
]

const HISTORIAL_INICIAL = [
  { id: 1, fecha: '20/1/2026, 16:17', matricula: '#3', estudiante: 'Esteban Navarro', monto: 287.50, metodo: 'Efectivo',     estado: 'pagado',  referencia: 'EFE-001' },
  { id: 2, fecha: '20/1/2026, 14:30', matricula: '#2', estudiante: 'Ana Martínez',    monto: 80.00,  metodo: 'Transferencia', estado: 'parcial', referencia: 'TRF-0041' },
  { id: 3, fecha: '19/1/2026, 10:05', matricula: '#1', estudiante: 'Mateo Suárez',    monto: 100.00, metodo: 'Efectivo',     estado: 'parcial', referencia: 'EFE-002' },
  { id: 4, fecha: '19/1/2026, 09:22', matricula: '#6', estudiante: 'Daniela Rojas',   monto: 200.00, metodo: 'Tarjeta',      estado: 'parcial', referencia: 'TAR-0012' },
]

const PAGO_BADGE = {
  pagado:   { label: 'Pagado',       cls: 'dp-badge-ok'      },
  parcial:  { label: 'Pago parcial', cls: 'dp-badge-parcial' },
  pendiente:{ label: 'Pendiente',    cls: 'dp-badge-pend'    },
  anulado:  { label: 'Anulado',      cls: 'dp-badge-anulado' },
}

const METODOS = ['Efectivo', 'Transferencia', 'Tarjeta', 'Depósito']

const fmt = (n) => `$${Number(n).toLocaleString('es-EC', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

function MetricaCard({ label, valor, color, activa, onClick, icon }) {
  return (
    <button className={`dp-met-card${activa ? ' is-active' : ''}`} onClick={onClick}>
      <div className={`dp-met-icon ${color}`}>{icon}</div>
      <div>
        <span className="dp-met-label">{label}</span>
        <span className="dp-met-val">{valor}</span>
      </div>
    </button>
  )
}

export default function DemoPagos() {
  const [tab, setTab] = useState('cobros')
  const [cobros, setCobros] = useState(COBROS)
  const [historial, setHistorial] = useState(HISTORIAL_INICIAL)
  const [seleccionado, setSeleccionado] = useState(null)
  const [filtroMetrica, setFiltroMetrica] = useState('total')
  const [busqueda, setBusqueda] = useState('')
  const [modal, setModal] = useState(false)
  const [cobroActivo, setCobroActivo] = useState(null)
  const [form, setForm] = useState({ monto: '', metodo: '', referencia: '' })
  const [guardando, setGuardando] = useState(false)
  const [exito, setExito] = useState(false)

  const cobradoMes = historial.filter(p => p.estado !== 'anulado').reduce((s, p) => s + p.monto, 0)
  const cobradoHoy = historial.filter(p => p.estado !== 'anulado' && p.fecha.startsWith('20/1/2026')).reduce((s, p) => s + p.monto, 0)

  const metricas = [
    { key: 'total',       label: 'Cobros pendientes', valor: cobros.filter(c => c.estado !== 'pagado').length,        color: 'dp-met-warn',    icon: <FaClock size={14} /> },
    { key: 'registrados', label: 'Pagos registrados', valor: historial.filter(h => h.estado !== 'anulado').length,   color: 'dp-met-primary', icon: <FaMoneyBillWave size={14} /> },
    { key: 'parcial',     label: 'Pago parcial',      valor: cobros.filter(c => c.estado === 'parcial').length,      color: 'dp-met-info',    icon: <FaWallet size={14} /> },
    { key: 'pagadas',     label: 'Pagadas',            valor: cobros.filter(c => c.estado === 'pagado').length,       color: 'dp-met-ok',      icon: <FaCheckCircle size={14} /> },
    { key: 'mes',         label: 'Cobrado este mes',  valor: fmt(cobradoMes),                                        color: 'dp-met-sec',     icon: <FaCalendarAlt size={14} /> },
    { key: 'hoy',         label: 'Cobrado hoy',       valor: fmt(cobradoHoy),                                        color: 'dp-met-sec',     icon: <FaCreditCard size={14} /> },
  ]

  const cobrosVisibles = useMemo(() => {
    let lista = cobros
    if (filtroMetrica === 'parcial')  lista = lista.filter(c => c.estado === 'parcial')
    if (filtroMetrica === 'pagadas')  lista = lista.filter(c => c.estado === 'pagado')
    if (busqueda.trim()) {
      const q = busqueda.toLowerCase()
      lista = lista.filter(c => c.estudiante.toLowerCase().includes(q) || c.matricula.includes(q))
    }
    return lista
  }, [cobros, filtroMetrica, busqueda])

  const abrirModal = (cobro) => {
    setCobroActivo(cobro)
    setForm({ monto: String((cobro.total - cobro.pagado).toFixed(2)), metodo: '', referencia: '' })
    setExito(false)
    setModal(true)
  }

  const registrarPago = () => {
    if (!form.monto || !form.metodo) return
    setGuardando(true)
    setTimeout(() => {
      const monto = parseFloat(form.monto)
      const saldoAntes = cobroActivo.total - cobroActivo.pagado
      const nuevoPagado = cobroActivo.pagado + monto
      const nuevoEstado = nuevoPagado >= cobroActivo.total ? 'pagado' : 'parcial'
      setCobros(prev => prev.map(c =>
        c.id === cobroActivo.id ? { ...c, pagado: nuevoPagado, estado: nuevoEstado } : c
      ))
      const fecha = new Date().toLocaleString('es-EC', { day:'2-digit', month:'numeric', year:'numeric', hour:'2-digit', minute:'2-digit' }).replace(',', ',')
      setHistorial(prev => [{
        id: prev.length + 1,
        fecha,
        matricula: cobroActivo.matricula,
        estudiante: cobroActivo.estudiante,
        monto,
        metodo: form.metodo,
        estado: nuevoEstado,
        referencia: form.referencia || `${form.metodo.slice(0,3).toUpperCase()}-${String(Date.now()).slice(-4)}`,
      }, ...prev])
      setGuardando(false)
      setExito(true)
    }, 700)
  }

  const detalleSeleccionado = seleccionado ? historial.find(h => h.id === seleccionado) : null

  return (
    <div className="dp-wrap">
      {/* Métricas */}
      <div className="dp-metricas">
        {metricas.map(({ key, ...m }) => (
          <MetricaCard key={key} {...m} activa={filtroMetrica === key}
            onClick={() => { setFiltroMetrica(key === filtroMetrica ? 'total' : key); setTab('cobros') }} />
        ))}
      </div>

      {/* Tabs */}
      <div className="dp-tabs">
        <button className={`dp-tab${tab === 'cobros' ? ' is-active' : ''}`} onClick={() => setTab('cobros')}>
          Cobros pendientes
        </button>
        <button className={`dp-tab${tab === 'historial' ? ' is-active' : ''}`} onClick={() => setTab('historial')}>
          Histórico de pagos
        </button>
      </div>

      {/* TAB COBROS */}
      {tab === 'cobros' && (
        <div className="dp-split">
          <div className="dp-card dp-cobros-wrap">
            <div className="dp-card-head">
              <div>
                <p className="dp-eyebrow">Cobranzas</p>
                <h5 className="dp-card-title">Matrículas con saldo pendiente</h5>
              </div>
            </div>
            <input
              className="dp-input dp-search"
              placeholder="Buscar por estudiante o matrícula"
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
            />
            <div className="dp-table-wrap">
              <table className="dp-table">
                <thead>
                  <tr>
                    <th>Matrícula</th>
                    <th>Estudiante</th>
                    <th>Total a pagar</th>
                    <th>Pagado</th>
                    <th>Saldo pendiente</th>
                    <th>Estado</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cobrosVisibles.length === 0 ? (
                    <tr><td colSpan="7" className="dp-empty">Sin cobros para el filtro aplicado</td></tr>
                  ) : cobrosVisibles.map(c => {
                    const b = PAGO_BADGE[c.estado]
                    return (
                      <tr key={c.id} className={cobroActivo?.id === c.id ? 'is-selected' : ''}>
                        <td className="dp-mat-code">{c.matricula}</td>
                        <td className="dp-nombre">{c.estudiante}</td>
                        <td>{fmt(c.total)}</td>
                        <td className="dp-pagado">{fmt(c.pagado)}</td>
                        <td className="dp-saldo">{fmt(c.total - c.pagado)}</td>
                        <td><span className={`dp-badge ${b.cls}`}>{b.label}</span></td>
                        <td>
                          <button className="dp-btn-arrow" onClick={() => abrirModal(c)} title="Registrar pago">
                            <FaChevronRight size={12} />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Panel detalle cobro */}
          <div className="dp-card dp-panel">
            {!cobroActivo ? (
              <div className="dp-panel-empty">
                <FaInfoCircle size={28} style={{opacity:.25, display:'block', margin:'0 auto 10px'}} />
                <p>Selecciona una matrícula para ver el detalle</p>
                <small>Usa la tabla de cobranzas para escoger.</small>
              </div>
            ) : (
              <div className="dp-panel-content">
                <p className="dp-eyebrow">Detalle de cobranza</p>
                <h6 className="dp-panel-nombre">{cobroActivo.estudiante}</h6>
                <small className="dp-panel-meta">Matrícula: {cobroActivo.matricula} &nbsp;·&nbsp; <span className={`dp-badge ${PAGO_BADGE[cobroActivo.estado].cls}`}>{PAGO_BADGE[cobroActivo.estado].label}</span></small>

                <div className="dp-panel-totales">
                  <div className="dp-panel-total-row">
                    <span>Total a pagar</span><span>{fmt(cobroActivo.total)}</span>
                  </div>
                  <div className="dp-panel-total-row">
                    <span>Pagado</span><span className="dp-pagado">{fmt(cobroActivo.pagado)}</span>
                  </div>
                </div>

                <p className="dp-eyebrow" style={{marginTop:16}}>Cobros pendientes</p>
                {cobroActivo.estado !== 'pagado' ? (
                  <div className="dp-panel-item dp-panel-item-blue">
                    <div>
                      <div style={{fontWeight:600, fontSize:'0.82rem'}}>Saldo de matrícula</div>
                      <div style={{fontSize:'0.8rem', color:'#4f46e5'}}>{fmt(cobroActivo.total - cobroActivo.pagado)}</div>
                    </div>
                    <button className="dp-cobrar-btn" onClick={() => abrirModal(cobroActivo)}>
                      Cobrar {fmt(cobroActivo.total - cobroActivo.pagado)}
                    </button>
                  </div>
                ) : (
                  <div className="dp-panel-item dp-panel-item-green">
                    <span style={{fontSize:'0.82rem', fontWeight:600, color:'#15803d'}}><FaCheck style={{verticalAlign:'middle', marginRight:4}} />Pagado completamente</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB HISTORIAL */}
      {tab === 'historial' && (
        <div className="dp-card">
          <div className="dp-card-head">
            <div>
              <p className="dp-eyebrow">Histórico</p>
              <h5 className="dp-card-title">Pagos registrados</h5>
            </div>
            <span className="dp-pill">{historial.length} registros</span>
          </div>
          <div className="dp-table-wrap">
            <table className="dp-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Fecha</th>
                  <th>Código</th>
                  <th>Concepto</th>
                  <th>Estudiante</th>
                  <th>Monto</th>
                  <th>Método</th>
                  <th>Estado</th>
                  <th>Referencia</th>
                </tr>
              </thead>
              <tbody>
                {historial.map((h, idx) => {
                  const b = PAGO_BADGE[h.estado] || PAGO_BADGE.pendiente
                  return (
                    <tr key={h.id} className={seleccionado === h.id ? 'is-selected' : ''} onClick={() => setSeleccionado(h.id === seleccionado ? null : h.id)} style={{cursor:'pointer'}}>
                      <td className="dp-idx">{historial.length - idx}</td>
                      <td style={{fontSize:'0.78rem', color:'#475569'}}>{h.fecha}</td>
                      <td className="dp-mat-code">{h.matricula}</td>
                      <td><span className="dp-badge dp-badge-concept">Matrícula</span></td>
                      <td className="dp-nombre">{h.estudiante}</td>
                      <td style={{fontWeight:700}}>{fmt(h.monto)}</td>
                      <td style={{fontSize:'0.82rem'}}>{h.metodo}</td>
                      <td><span className={`dp-badge ${b.cls}`}>{b.label}</span></td>
                      <td style={{fontSize:'0.75rem', color:'#94a3b8', maxWidth:110, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{h.referencia}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal registrar pago */}
      {modal && cobroActivo && (
        <div className="dp-overlay" onClick={() => { setModal(false); setExito(false) }}>
          <div className="dp-modal" onClick={e => e.stopPropagation()}>
            <div className="dp-modal-head">
              <div>
                <p className="dp-eyebrow">Financiero / Pagos</p>
                <h5 className="dp-modal-title">Registrar pago</h5>
              </div>
              <button className="dp-close" onClick={() => { setModal(false); setExito(false) }}><FaTimes /></button>
            </div>
            <div className="dp-modal-body">
              {exito ? (
                <div className="dp-exito">
                  <FaCheckCircle size={40} style={{color:'#16a34a'}} />
                  <h6>Pago registrado correctamente</h6>
                  <p className="dp-exito-sub">{cobroActivo.estudiante} · {fmt(parseFloat(form.monto))} · {form.metodo}</p>
                  <button className="dp-btn-primary" onClick={() => { setModal(false); setExito(false); setCobroActivo(null) }}>Listo</button>
                </div>
              ) : (
                <>
                  {/* Info matrícula */}
                  <div className="dp-modal-info">
                    <span className="dp-eyebrow">Estudiante</span>
                    <div className="dp-modal-estudiante">{cobroActivo.estudiante}</div>
                    <div style={{display:'flex', gap:12, marginTop:6, fontSize:'0.8rem', color:'#64748b'}}>
                      <span>Total: <strong>{fmt(cobroActivo.total)}</strong></span>
                      <span>Pagado: <strong className="dp-pagado">{fmt(cobroActivo.pagado)}</strong></span>
                      <span>Saldo: <strong style={{color:'#dc2626'}}>{fmt(cobroActivo.total - cobroActivo.pagado)}</strong></span>
                    </div>
                  </div>

                  <div className="dp-modal-fields">
                    <div className="dp-field">
                      <label className="dp-label">Monto recibido</label>
                      <div className="dp-input-prefix">
                        <span>$</span>
                        <input type="number" className="dp-input" step="0.01" min="0.01"
                          value={form.monto} onChange={e => setForm({...form, monto: e.target.value})} />
                      </div>
                    </div>
                    <div className="dp-field">
                      <label className="dp-label">Método de pago</label>
                      <select className="dp-select" value={form.metodo} onChange={e => setForm({...form, metodo: e.target.value})}>
                        <option value="">Seleccione...</option>
                        {METODOS.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>
                    <div className="dp-field">
                      <label className="dp-label">Referencia <span style={{fontWeight:400, color:'#94a3b8'}}>(opcional)</span></label>
                      <input className="dp-input" type="text" placeholder="Se genera automáticamente"
                        value={form.referencia} onChange={e => setForm({...form, referencia: e.target.value})} />
                    </div>
                  </div>

                  {/* Resumen */}
                  {form.monto && form.metodo && (
                    <div className="dp-resumen">
                      <p className="dp-eyebrow" style={{marginBottom:6}}>Resumen de cobro</p>
                      <div className="dp-resumen-row"><span>Saldo matrícula</span><span>{fmt(parseFloat(form.monto))}</span></div>
                      <hr style={{margin:'8px 0', borderColor:'#e2e8f0'}} />
                      <div className="dp-resumen-row total"><span>Total a recibir del cliente</span><span>{fmt(parseFloat(form.monto))}</span></div>
                    </div>
                  )}
                </>
              )}
            </div>
            {!exito && (
              <div className="dp-modal-foot">
                <button className="dp-btn-outline" onClick={() => setModal(false)}>Cancelar</button>
                <button className="dp-btn-primary" onClick={registrarPago} disabled={!form.monto || !form.metodo || guardando}>
                  {guardando ? 'Guardando...' : 'Registrar pago'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
