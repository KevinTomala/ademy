import { useState, useRef, useEffect } from 'react'
import { FaTimes, FaPlusCircle, FaUsers, FaSyncAlt, FaInbox, FaPencilAlt, FaSignOutAlt, FaInfoCircle, FaSearch, FaCheckCircle } from 'react-icons/fa'

const HOY = new Date().toISOString().split('T')[0]

const FUENTES = ['Redes sociales', 'Referido', 'Página web', 'Visita directa', 'Volante']

const CATEGORIAS = {
  Académico: {
    Formaciones: ['Información', 'Inscripción', 'Pre-matrícula'],
    Matrículas: ['Información', 'Actualización'],
  },
  Financiero: {
    Pagos: ['Abono', 'Cancelación total'],
    Certificados: ['Certificado', 'Constancia'],
  },
  Administrativo: {
    Credenciales: ['Credencial', 'Carnet'],
    General: ['Información', 'Reclamo'],
  },
}

const getBadgeClass = (novedad) => {
  const n = (novedad || '').toLowerCase()
  if (n === 'certificado') return 'bg-success text-white'
  if (n === 'credencial') return 'bg-info text-dark'
  if (n === 'abono') return 'bg-warning text-dark'
  if (n === 'inscripción' || n === 'inscripcion') return 'bg-primary text-white'
  return 'bg-secondary text-white'
}

const getEstadoBadge = (estado) => {
  if (estado === 'interesado') return { cls: 'demo-badge-blue', label: 'Interesado' }
  if (estado === 'pre-matriculado') return { cls: 'demo-badge-yellow', label: 'Pre-matriculado' }
  if (estado === 'matriculado') return { cls: 'demo-badge-green', label: 'Matriculado' }
  if (estado === 'descartado') return { cls: 'demo-badge-red', label: 'Descartado' }
  return { cls: 'demo-badge-teal', label: 'Nuevo' }
}

const REGISTROS_INICIALES = [
  {
    id: 1,
    nombre: 'DANIELA ROJAS',
    email: 'daniela.r@email.com',
    documento: '1724536891',
    telefono: '0987654321',
    entrada: '08:15',
    salida: '08:42',
    observacion: 'Consultó sobre el curso de supervisión.',
    novedad: 'Información',
    estado: 'interesado',
  },
  {
    id: 2,
    nombre: 'MATEO SUÁREZ',
    email: 'mateo.s@email.com',
    documento: '1756234109',
    telefono: '0991234567',
    entrada: '09:30',
    salida: '',
    observacion: 'Trajo documentos para inscripción.',
    novedad: 'Inscripción',
    estado: 'pre-matriculado',
  },
  {
    id: 3,
    nombre: 'ANA MARTÍNEZ',
    email: 'ana.m@email.com',
    documento: '1312456780',
    telefono: '0976543210',
    entrada: '10:05',
    salida: '10:28',
    observacion: 'Realizó abono de $80.',
    novedad: 'Abono',
    estado: 'matriculado',
  },
]

const FORM_VACIO = {
  documento: '',
  nombre: '',
  apellidos: '',
  telefono: '',
  email: '',
  fuente: '',
  categoria: '',
  subcategoria: '',
  accion: '',
  observacion: '',
  preinscribir: false,
  transferir: false,
}

export default function DemoBitacora() {
  const [registros, setRegistros] = useState(REGISTROS_INICIALES)
  const [fecha, setFecha] = useState(HOY)
  const [modalAbierto, setModalAbierto] = useState(false)
  const [editandoId, setEditandoId] = useState(null)
  const [tab, setTab] = useState('interesado')
  const [form, setForm] = useState(FORM_VACIO)
  const [guardando, setGuardando] = useState(false)
  const [recargando, setRecargando] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  const nextId = useRef(REGISTROS_INICIALES.length + 1)

  const subcategorias = form.categoria ? Object.keys(CATEGORIAS[form.categoria] || {}) : []
  const acciones =
    form.categoria && form.subcategoria ? CATEGORIAS[form.categoria]?.[form.subcategoria] || [] : []

  const mostrarToast = (msg) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(''), 2800)
  }

  const abrirNuevo = () => {
    setForm(FORM_VACIO)
    setEditandoId(null)
    setTab('interesado')
    setModalAbierto(true)
  }

  const abrirEditar = (reg) => {
    const [cat, sub, acc] = resolverCatSubAcc(reg.novedad)
    setForm({
      documento: reg.documento,
      nombre: reg.nombre.split(' ')[0] || reg.nombre,
      apellidos: reg.nombre.split(' ').slice(1).join(' ') || '',
      telefono: reg.telefono,
      email: reg.email,
      fuente: '',
      categoria: cat,
      subcategoria: sub,
      accion: acc,
      observacion: reg.observacion,
      preinscribir: false,
      transferir: false,
    })
    setEditandoId(reg.id)
    setTab('bitacora')
    setModalAbierto(true)
  }

  const resolverCatSubAcc = (novedad) => {
    const n = (novedad || '').toLowerCase()
    if (n === 'inscripción' || n === 'inscripcion') return ['Académico', 'Formaciones', 'Inscripción']
    if (n === 'abono') return ['Financiero', 'Pagos', 'Abono']
    if (n === 'certificado') return ['Financiero', 'Certificados', 'Certificado']
    if (n === 'credencial') return ['Administrativo', 'Credenciales', 'Credencial']
    return ['Académico', 'Formaciones', 'Información']
  }

  const registrarSalida = (id) => {
    const hora = new Date().toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' })
    setRegistros((prev) => prev.map((r) => (r.id === id ? { ...r, salida: hora } : r)))
    mostrarToast('Salida registrada')
  }

  const simularRecarga = () => {
    setRecargando(true)
    setTimeout(() => setRecargando(false), 900)
  }

  const guardar = () => {
    if (!form.nombre.trim() || !form.accion) {
      setTab(!form.nombre.trim() ? 'interesado' : 'bitacora')
      return
    }
    setGuardando(true)
    setTimeout(() => {
      const hora = new Date().toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' })
      const nombreCompleto = `${form.nombre} ${form.apellidos}`.trim().toUpperCase()
      if (editandoId) {
        setRegistros((prev) =>
          prev.map((r) =>
            r.id === editandoId
              ? { ...r, nombre: nombreCompleto, observacion: form.observacion, novedad: form.accion }
              : r
          )
        )
        mostrarToast('Registro actualizado')
      } else {
        const nuevo = {
          id: nextId.current++,
          nombre: nombreCompleto,
          email: form.email,
          documento: form.documento,
          telefono: form.telefono,
          entrada: hora,
          salida: '',
          observacion: form.observacion,
          novedad: form.accion,
          estado: form.preinscribir ? 'pre-matriculado' : 'interesado',
        }
        setRegistros((prev) => [nuevo, ...prev])
        mostrarToast('Registro guardado')
      }
      setGuardando(false)
      setModalAbierto(false)
    }, 700)
  }

  const cerrarModal = () => {
    setModalAbierto(false)
  }

  useEffect(() => {
    if (modalAbierto) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [modalAbierto])

  return (
    <div className="demo-bitacora">
      {/* Header */}
      <div className="demo-bit-card demo-bit-header">
        <div>
          <p className="demo-bit-eyebrow">Recepcionista</p>
          <h4 className="demo-bit-title">Bitácora operativa</h4>
          <small className="demo-bit-subtitle">Control diario de visitas y novedades</small>
        </div>
        <div className="demo-bit-header-actions">
          <div className="demo-bit-filter">
            <label className="demo-bit-label">Filtrar por fecha</label>
            <input
              type="date"
              className="demo-bit-input"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>
          <button className="demo-bit-btn-primary" onClick={abrirNuevo}>
            <FaPlusCircle size={15} style={{marginRight:6}} />
            Nuevo registro
          </button>
        </div>
      </div>

      {/* Tabla */}
      <div className="demo-bit-card">
        <div className="demo-bit-table-header">
          <div>
            <p className="demo-bit-label">Registro de entradas y salidas</p>
            <h5 className="demo-bit-table-title">Actualizado en tiempo real</h5>
          </div>
          <div className="demo-bit-table-actions">
            <span className="demo-bit-pill">
              <FaUsers size={13} style={{marginRight:4}} />
              {registros.length} registros
            </span>
            <button className="demo-bit-btn-outline" onClick={simularRecarga} disabled={recargando}>
              {recargando ? (
                <><span className="demo-spinner" /> Actualizando</>
              ) : (
                <><FaSyncAlt size={13} style={{marginRight:4}} />Actualizar</>
              )}
            </button>
          </div>
        </div>

        <div className="demo-bit-table-wrapper">
          <table className="demo-bit-table">
            <thead>
              <tr>
                <th className="text-center">#</th>
                <th>Nombre</th>
                <th>Cédula</th>
                <th>Teléfono</th>
                <th>Entrada</th>
                <th>Salida</th>
                <th>Observación</th>
                <th>Novedad</th>
                <th>Estado</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {registros.length === 0 ? (
                <tr>
                  <td colSpan="10" className="demo-bit-empty">
                    <FaInbox size={32} className="demo-bit-empty-icon" />
                    <p>No hay registros para la fecha seleccionada</p>
                    <small>Crea un nuevo registro o ajusta el filtro</small>
                  </td>
                </tr>
              ) : (
                registros.map((row, idx) => {
                  const estadoBadge = getEstadoBadge(row.estado)
                  return (
                    <tr key={row.id}>
                      <td className="text-center demo-bit-idx">{registros.length - idx}</td>
                      <td>
                        <div className="demo-bit-nombre">{row.nombre}</div>
                        <small className="demo-bit-email">{row.email}</small>
                      </td>
                      <td>{row.documento || '-'}</td>
                      <td>{row.telefono || '-'}</td>
                      <td>{row.entrada || '-'}</td>
                      <td>{row.salida || '-'}</td>
                      <td className="demo-bit-obs">{row.observacion || '-'}</td>
                      <td>
                        <span className={`demo-bit-badge ${getBadgeClass(row.novedad)}`}>
                          {row.novedad || 'N/A'}
                        </span>
                      </td>
                      <td>
                        <span className={`demo-bit-estado ${estadoBadge.cls}`}>
                          {estadoBadge.label}
                        </span>
                      </td>
                      <td className="text-center demo-bit-acciones">
                        <button
                          className="demo-bit-icon-btn"
                          title="Editar"
                          onClick={() => abrirEditar(row)}
                        >
                          <FaPencilAlt size={13} />
                        </button>
                        {!row.salida && (
                          <button
                            className="demo-bit-icon-btn warning"
                            title="Registrar salida"
                            onClick={() => registrarSalida(row.id)}
                          >
                            <FaSignOutAlt size={13} />
                          </button>
                        )}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Nota demo */}
      <p className="demo-bit-note">
        <FaInfoCircle size={13} style={{marginRight:5, opacity:0.6, verticalAlign:'middle'}} />
        Demo interactivo — los datos se reinician al recargar la página
      </p>

      {/* Modal */}
      {modalAbierto && (
        <div className="demo-bit-overlay" onClick={cerrarModal}>
          <div className="demo-bit-modal" onClick={(e) => e.stopPropagation()}>
            {/* Modal header */}
            <div className="demo-bit-modal-header">
              <div>
                <p className="demo-bit-eyebrow">{editandoId ? 'Edición' : 'Nuevo ingreso'}</p>
                <h5 className="demo-bit-modal-title">{editandoId ? 'Editar registro' : 'Registrar visita'}</h5>
              </div>
              <button className="demo-bit-close" onClick={cerrarModal}><FaTimes /></button>
            </div>

            {/* Tabs */}
            <div className="demo-bit-tabs">
              <button
                className={`demo-bit-tab${tab === 'interesado' ? ' active' : ''}`}
                onClick={() => setTab('interesado')}
              >
                Interesado
              </button>
              <button
                className={`demo-bit-tab${tab === 'bitacora' ? ' active' : ''}`}
                onClick={() => setTab('bitacora')}
              >
                Bitácora
              </button>
            </div>

            {/* Modal body */}
            <div className="demo-bit-modal-body">
              {tab === 'interesado' && (
                <div className="demo-bit-form-section">
                  <div className="demo-bit-row">
                    <div className="demo-bit-col">
                      <label className="demo-bit-label">Cédula</label>
                      <div className="demo-bit-input-group">
                        <input
                          type="text"
                          className="demo-bit-input"
                          placeholder="Buscar por cédula"
                          value={form.documento}
                          disabled={!!editandoId}
                          onChange={(e) => setForm({ ...form, documento: e.target.value })}
                        />
                        <button className="demo-bit-input-btn" disabled={!!editandoId}>
                          <FaSearch size={13} />
                        </button>
                      </div>
                    </div>
                    <div className="demo-bit-col">
                      <label className="demo-bit-label">Nombres</label>
                      <input
                        type="text"
                        className="demo-bit-input"
                        value={form.nombre}
                        disabled={!!editandoId}
                        onChange={(e) => setForm({ ...form, nombre: e.target.value.toUpperCase() })}
                      />
                    </div>
                    <div className="demo-bit-col">
                      <label className="demo-bit-label">Apellidos</label>
                      <input
                        type="text"
                        className="demo-bit-input"
                        value={form.apellidos}
                        disabled={!!editandoId}
                        onChange={(e) => setForm({ ...form, apellidos: e.target.value.toUpperCase() })}
                      />
                    </div>
                  </div>
                  <div className="demo-bit-row">
                    <div className="demo-bit-col">
                      <label className="demo-bit-label">Teléfono</label>
                      <input
                        type="text"
                        className="demo-bit-input"
                        value={form.telefono}
                        disabled={!!editandoId}
                        onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                      />
                    </div>
                    <div className="demo-bit-col">
                      <label className="demo-bit-label">Email</label>
                      <input
                        type="email"
                        className="demo-bit-input"
                        value={form.email}
                        disabled={!!editandoId}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                    <div className="demo-bit-col">
                      <label className="demo-bit-label">Fuente de origen</label>
                      <select
                        className="demo-bit-select"
                        value={form.fuente}
                        disabled={!!editandoId}
                        onChange={(e) => setForm({ ...form, fuente: e.target.value })}
                      >
                        <option value="">Seleccione...</option>
                        {FUENTES.map((f) => <option key={f} value={f}>{f}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {tab === 'bitacora' && (
                <div className="demo-bit-form-section">
                  <div className="demo-bit-row">
                    <div className="demo-bit-col">
                      <label className="demo-bit-label">Categoría</label>
                      <select
                        className="demo-bit-select"
                        value={form.categoria}
                        onChange={(e) => setForm({ ...form, categoria: e.target.value, subcategoria: '', accion: '' })}
                      >
                        <option value="">Seleccione...</option>
                        {Object.keys(CATEGORIAS).map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="demo-bit-col">
                      <label className="demo-bit-label">Subcategoría</label>
                      <select
                        className="demo-bit-select"
                        value={form.subcategoria}
                        disabled={!form.categoria}
                        onChange={(e) => setForm({ ...form, subcategoria: e.target.value, accion: '' })}
                      >
                        <option value="">Seleccione...</option>
                        {subcategorias.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="demo-bit-col">
                      <label className="demo-bit-label">Acción</label>
                      <select
                        className="demo-bit-select"
                        value={form.accion}
                        disabled={!form.subcategoria}
                        onChange={(e) => setForm({ ...form, accion: e.target.value })}
                      >
                        <option value="">Seleccione...</option>
                        {acciones.map((a) => <option key={a} value={a}>{a}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="demo-bit-divider" />

                  <div className="demo-bit-checks">
                    <label className="demo-bit-check-label">
                      <input
                        type="checkbox"
                        checked={form.preinscribir}
                        onChange={(e) => setForm({ ...form, preinscribir: e.target.checked })}
                      />
                      Pre-inscribir
                    </label>
                    <label className="demo-bit-check-label">
                      <input
                        type="checkbox"
                        checked={form.transferir}
                        onChange={(e) => setForm({ ...form, transferir: e.target.checked })}
                      />
                      Transferir a secretaría
                    </label>
                  </div>

                  <div>
                    <label className="demo-bit-label">Observación</label>
                    <textarea
                      className="demo-bit-textarea"
                      rows="4"
                      value={form.observacion}
                      onChange={(e) => setForm({ ...form, observacion: e.target.value })}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Modal footer */}
            <div className="demo-bit-modal-footer">
              <button className="demo-bit-btn-outline" onClick={cerrarModal}>Cancelar</button>
              <button className="demo-bit-btn-primary" onClick={guardar} disabled={guardando}>
                {guardando
                  ? (editandoId ? 'Actualizando...' : 'Guardando...')
                  : (editandoId ? 'Actualizar' : 'Guardar')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toastMsg && (
        <div className="demo-bit-toast">
          <FaCheckCircle size={14} style={{marginRight:6}} />
          {toastMsg}
        </div>
      )}
    </div>
  )
}
