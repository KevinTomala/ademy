import { useState, useMemo } from 'react'
import { FaCheck, FaTimes, FaIdCard, FaEnvelope, FaPhone, FaEraser, FaInfoCircle } from 'react-icons/fa'

const ESTUDIANTES = [
  {
    id: 1, nombres: 'DANIELA', apellidos: 'ROJAS', documento: '1724536891',
    telefono: '0987654321', email: 'daniela.r@email.com',
    estado: 'matriculado', activo: true,
    perfil: { nacimiento: '15/03/1998', nacionalidad: 'Ecuatoriana', estadoCivil: 'Soltera', contactoEmergencia: 'María Rojas — 0991234000' },
    movilidad: { vehiculo: 'Automóvil', licencia: 'B', viajar: true, turnos: true, fines: false },
    salud: { sexo: 'Femenino', sangre: 'O+', estatura: '1.65', peso: '58', tatuaje: 'No' },
    formacion: { nivel: 'Tercer nivel', institucion: 'PUCE', titulo: 'Administración de Empresas' },
  },
  {
    id: 2, nombres: 'MATEO', apellidos: 'SUÁREZ', documento: '1756234109',
    telefono: '0991234567', email: 'mateo.s@email.com',
    estado: 'matriculado', activo: true,
    perfil: { nacimiento: '22/07/1995', nacionalidad: 'Ecuatoriana', estadoCivil: 'Soltero', contactoEmergencia: 'Carlos Suárez — 0987650011' },
    movilidad: { vehiculo: 'Motocicleta', licencia: 'A', viajar: true, turnos: false, fines: true },
    salud: { sexo: 'Masculino', sangre: 'A+', estatura: '1.75', peso: '72', tatuaje: 'Sí, no visible' },
    formacion: { nivel: 'Bachillerato', institucion: 'Colegio Nacional', titulo: 'Bachiller en Ciencias' },
  },
  {
    id: 3, nombres: 'ANA', apellidos: 'MARTÍNEZ', documento: '1312456780',
    telefono: '0976543210', email: 'ana.m@email.com',
    estado: 'matriculado', activo: true,
    perfil: { nacimiento: '08/11/2000', nacionalidad: 'Ecuatoriana', estadoCivil: 'Soltera', contactoEmergencia: 'Pedro Martínez — 0999876543' },
    movilidad: { vehiculo: '—', licencia: '—', viajar: false, turnos: true, fines: true },
    salud: { sexo: 'Femenino', sangre: 'B+', estatura: '1.60', peso: '52', tatuaje: 'No' },
    formacion: { nivel: 'Tercer nivel', institucion: 'UCE', titulo: 'Derecho' },
  },
  {
    id: 4, nombres: 'ESTEBAN', apellidos: 'NAVARRO', documento: '1745678901',
    telefono: '0965432109', email: 'esteban.n@email.com',
    estado: 'egresado', activo: true,
    perfil: { nacimiento: '30/06/1993', nacionalidad: 'Ecuatoriana', estadoCivil: 'Casado', contactoEmergencia: 'Laura Navarro — 0987001122' },
    movilidad: { vehiculo: 'Camioneta', licencia: 'C', viajar: true, turnos: true, fines: true },
    salud: { sexo: 'Masculino', sangre: 'AB-', estatura: '1.80', peso: '85', tatuaje: 'Sí, visible' },
    formacion: { nivel: 'Cuarto nivel', institucion: 'FLACSO', titulo: 'Maestría en Seguridad' },
  },
  {
    id: 5, nombres: 'CAMILA', apellidos: 'TORRES', documento: '1798765432',
    telefono: '0954321098', email: 'camila.t@email.com',
    estado: 'inscrito', activo: true,
    perfil: { nacimiento: '14/02/2001', nacionalidad: 'Ecuatoriana', estadoCivil: 'Soltera', contactoEmergencia: 'Rosa Torres — 0991230099' },
    movilidad: { vehiculo: '—', licencia: '—', viajar: false, turnos: false, fines: false },
    salud: { sexo: 'Femenino', sangre: 'O-', estatura: '1.62', peso: '55', tatuaje: 'No' },
    formacion: { nivel: 'Bachillerato', institucion: 'Colegio Benalcázar', titulo: 'Bachiller General' },
  },
  {
    id: 6, nombres: 'ANDRÉS', apellidos: 'MEJÍA', documento: '1723456789',
    telefono: '0943210987', email: 'andres.m@email.com',
    estado: 'preinscrito', activo: false,
    perfil: { nacimiento: '05/09/1997', nacionalidad: 'Ecuatoriana', estadoCivil: 'Soltero', contactoEmergencia: 'Jorge Mejía — 0976540022' },
    movilidad: { vehiculo: 'Bus', licencia: 'D', viajar: true, turnos: true, fines: false },
    salud: { sexo: 'Masculino', sangre: 'A-', estatura: '1.72', peso: '68', tatuaje: 'No' },
    formacion: { nivel: 'Tercer nivel', institucion: 'ESPE', titulo: 'Ing. en Sistemas' },
  },
]

const ESTADO_CFG = {
  matriculado: { label: 'Matriculado', cls: 'de-badge-mat'  },
  egresado:    { label: 'Egresado',    cls: 'de-badge-egr'  },
  inscrito:    { label: 'Inscrito',    cls: 'de-badge-ins'  },
  preinscrito: { label: 'Preinscrito', cls: 'de-badge-pre'  },
  rechazado:   { label: 'Rechazado',   cls: 'de-badge-rech' },
}

const RESUMEN_KEYS = [
  { key: 'total',        label: 'Total',        color: 'de-res-neutral', fn: l => l.length },
  { key: 'activos',      label: 'Activos',      color: 'de-res-green',   fn: l => l.filter(e => e.activo).length },
  { key: 'inscritos',    label: 'Inscritos',    color: 'de-res-blue',    fn: l => l.filter(e => e.estado === 'inscrito').length },
  { key: 'matriculados', label: 'Matriculados', color: 'de-res-amber',   fn: l => l.filter(e => e.estado === 'matriculado').length },
  { key: 'egresados',    label: 'Egresados',    color: 'de-res-violet',  fn: l => l.filter(e => e.estado === 'egresado').length },
]

const DETAIL_TABS = ['Perfil', 'Movilidad', 'Salud', 'Formación']

export default function DemoEstudiantes() {
  const [filtroKey, setFiltroKey]     = useState('total')
  const [busqueda, setBusqueda]       = useState('')
  const [filtroEstado, setFiltroEstado] = useState('all')
  const [seleccionado, setSeleccionado] = useState(null)
  const [detailTab, setDetailTab]     = useState('Perfil')

  const filas = useMemo(() => {
    let lista = ESTUDIANTES
    if (filtroKey === 'activos')      lista = lista.filter(e => e.activo)
    if (filtroKey === 'inscritos')    lista = lista.filter(e => e.estado === 'inscrito')
    if (filtroKey === 'matriculados') lista = lista.filter(e => e.estado === 'matriculado')
    if (filtroKey === 'egresados')    lista = lista.filter(e => e.estado === 'egresado')
    if (busqueda.trim()) {
      const q = busqueda.toLowerCase()
      lista = lista.filter(e =>
        `${e.nombres} ${e.apellidos}`.toLowerCase().includes(q) ||
        e.documento.includes(q) || e.email.toLowerCase().includes(q)
      )
    }
    if (filtroEstado !== 'all') lista = lista.filter(e => e.estado === filtroEstado)
    return lista
  }, [filtroKey, busqueda, filtroEstado])

  const est = seleccionado ? ESTUDIANTES.find(e => e.id === seleccionado) : null

  return (
    <div className="de-wrap">
      {/* Cards resumen */}
      <div className="de-resumen">
        {RESUMEN_KEYS.map(r => (
          <button
            key={r.key}
            className={`de-res-card ${r.color}${filtroKey === r.key ? ' is-active' : ''}`}
            onClick={() => { setFiltroKey(r.key); setFiltroEstado('all') }}
          >
            <span className="de-res-val">{r.fn(ESTUDIANTES)}</span>
            <span className="de-res-label">{r.label}</span>
          </button>
        ))}
      </div>

      {/* Filtros */}
      <div className="de-filters">
        <input
          className="de-input de-search"
          placeholder="Nombre, documento o email"
          value={busqueda}
          onChange={e => { setBusqueda(e.target.value); setFiltroKey('total') }}
        />
        <select className="de-select" value={filtroEstado} onChange={e => { setFiltroEstado(e.target.value); setFiltroKey('total') }}>
          <option value="all">Estado — Todos</option>
          <option value="preinscrito">Preinscrito</option>
          <option value="inscrito">Inscrito</option>
          <option value="matriculado">Matriculado</option>
          <option value="egresado">Egresado</option>
          <option value="rechazado">Rechazado</option>
        </select>
        <select className="de-select" onChange={e => { if (e.target.value === 'activos') setFiltroKey('activos'); else setFiltroKey('total') }}>
          <option value="all">Activo — Todos</option>
          <option value="activos">Activos</option>
        </select>
        <button className="de-btn-outline" onClick={() => { setBusqueda(''); setFiltroEstado('all'); setFiltroKey('total') }}>
          <FaEraser size={12} style={{marginRight:4}} />
          Limpiar
        </button>
      </div>

      {/* Split tabla + detalle */}
      <div className={`de-split${est ? ' has-detail' : ''}`}>
        {/* Tabla */}
        <div className="de-card">
          <div className="de-card-head">
            <div>
              <p className="de-eyebrow">Formación académica</p>
              <h5 className="de-card-title">Gestión de estudiantes</h5>
            </div>
            <span className="de-pill">{filas.length} registros</span>
          </div>
          <div className="de-table-wrap">
            <table className="de-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Estudiante</th>
                  <th>Documento</th>
                  <th>Contacto</th>
                  <th>Estado</th>
                  <th className="text-center">Detalle</th>
                </tr>
              </thead>
              <tbody>
                {filas.length === 0 ? (
                  <tr><td colSpan="6" className="de-empty">Sin estudiantes para los filtros aplicados</td></tr>
                ) : filas.map((e, idx) => {
                  const ecfg = ESTADO_CFG[e.estado] || { label: e.estado, cls: '' }
                  return (
                    <tr key={e.id} className={seleccionado === e.id ? 'is-selected' : ''}>
                      <td className="de-idx">{idx + 1}</td>
                      <td>
                        <div className="de-nombre">{e.nombres} {e.apellidos}</div>
                        <small className="de-email">{e.email}</small>
                      </td>
                      <td>{e.documento}</td>
                      <td>{e.telefono}</td>
                      <td>
                        <div style={{display:'flex', flexDirection:'column', gap:3}}>
                          <span className={`de-badge ${ecfg.cls}`}>{ecfg.label}</span>
                          <span className={`de-badge ${e.activo ? 'de-badge-activo' : 'de-badge-inactivo'}`}>
                            {e.activo ? 'Activo' : 'Inactivo'}
                          </span>
                        </div>
                      </td>
                      <td className="text-center">
                        <button
                          className="de-icon-btn"
                          title="Ver detalle"
                          onClick={() => { setSeleccionado(e.id === seleccionado ? null : e.id); setDetailTab('Perfil') }}
                        >
                          <FaInfoCircle size={13} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Panel detalle */}
        {est && (
          <div className="de-card de-detail">
            {/* Header */}
            <div className="de-detail-head">
              <div>
                <p className="de-eyebrow">Estudiantes / Detalle</p>
                <h6 className="de-detail-nombre">{est.nombres} {est.apellidos}</h6>
                <div className="de-detail-badges">
                  <span className={`de-badge ${est.activo ? 'de-badge-activo' : 'de-badge-inactivo'}`}>{est.activo ? 'Activo' : 'Inactivo'}</span>
                  <span className={`de-badge ${ESTADO_CFG[est.estado]?.cls}`}>{ESTADO_CFG[est.estado]?.label}</span>
                </div>
                <div className="de-detail-info">
                  <span><FaIdCard style={{verticalAlign:'middle', marginRight:4}} />{est.documento}</span>
                  <span><FaEnvelope style={{verticalAlign:'middle', marginRight:4}} />{est.email}</span>
                  <span><FaPhone style={{verticalAlign:'middle', marginRight:4}} />{est.telefono}</span>
                </div>
              </div>
              <button className="de-close" onClick={() => setSeleccionado(null)}><FaTimes /></button>
            </div>

            {/* Tabs */}
            <div className="de-detail-tabs">
              {DETAIL_TABS.map(t => (
                <button key={t} className={`de-detail-tab${detailTab === t ? ' is-active' : ''}`} onClick={() => setDetailTab(t)}>
                  {t}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="de-detail-body">
              {detailTab === 'Perfil' && (
                <div className="de-fields">
                  <div className="de-field"><span className="de-field-label">Fecha de nacimiento</span><span>{est.perfil.nacimiento}</span></div>
                  <div className="de-field"><span className="de-field-label">Nacionalidad</span><span>{est.perfil.nacionalidad}</span></div>
                  <div className="de-field"><span className="de-field-label">Estado civil</span><span>{est.perfil.estadoCivil}</span></div>
                  <div className="de-field de-field-full"><span className="de-field-label">Contacto emergencia</span><span>{est.perfil.contactoEmergencia}</span></div>
                </div>
              )}
              {detailTab === 'Movilidad' && (
                <div className="de-fields">
                  <div className="de-field"><span className="de-field-label">Vehículo</span><span>{est.movilidad.vehiculo}</span></div>
                  <div className="de-field"><span className="de-field-label">Licencia</span><span>{est.movilidad.licencia}</span></div>
                  <div className="de-field"><span className="de-field-label">Disponibilidad viajar</span><span>{est.movilidad.viajar ? <><FaCheck style={{color:'#16a34a', verticalAlign:'middle', marginRight:4}} />Sí</> : <><FaTimes style={{color:'#dc2626', verticalAlign:'middle', marginRight:4}} />No</>}</span></div>
                  <div className="de-field"><span className="de-field-label">Turnos</span><span>{est.movilidad.turnos ? <><FaCheck style={{color:'#16a34a', verticalAlign:'middle', marginRight:4}} />Sí</> : <><FaTimes style={{color:'#dc2626', verticalAlign:'middle', marginRight:4}} />No</>}</span></div>
                  <div className="de-field"><span className="de-field-label">Fines de semana</span><span>{est.movilidad.fines ? <><FaCheck style={{color:'#16a34a', verticalAlign:'middle', marginRight:4}} />Sí</> : <><FaTimes style={{color:'#dc2626', verticalAlign:'middle', marginRight:4}} />No</>}</span></div>
                </div>
              )}
              {detailTab === 'Salud' && (
                <div className="de-fields">
                  <div className="de-field"><span className="de-field-label">Sexo</span><span>{est.salud.sexo}</span></div>
                  <div className="de-field"><span className="de-field-label">Tipo de sangre</span><span>{est.salud.sangre}</span></div>
                  <div className="de-field"><span className="de-field-label">Estatura</span><span>{est.salud.estatura} m</span></div>
                  <div className="de-field"><span className="de-field-label">Peso</span><span>{est.salud.peso} kg</span></div>
                  <div className="de-field"><span className="de-field-label">Tatuaje</span><span>{est.salud.tatuaje}</span></div>
                </div>
              )}
              {detailTab === 'Formación' && (
                <div className="de-fields">
                  <div className="de-field"><span className="de-field-label">Nivel de estudio</span><span>{est.formacion.nivel}</span></div>
                  <div className="de-field de-field-full"><span className="de-field-label">Institución</span><span>{est.formacion.institucion}</span></div>
                  <div className="de-field de-field-full"><span className="de-field-label">Título obtenido</span><span>{est.formacion.titulo}</span></div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
