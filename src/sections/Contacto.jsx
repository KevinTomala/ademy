import { useState, useRef, useEffect } from 'react'

const ENDPOINT = '/api/demo'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const RECAPTCHA_SITE_KEY = String(import.meta.env.VITE_RECAPTCHA_SITE_KEY || '').trim()
const RECAPTCHA_SCRIPT_ID = 'google-recaptcha-script'
const RECAPTCHA_SCRIPT_URL = 'https://www.google.com/recaptcha/api.js?render=explicit'

function getRecaptchaApi() {
  if (typeof window === 'undefined') return null
  if (typeof window.grecaptcha?.render === 'function') return window.grecaptcha
  if (typeof window.grecaptcha?.enterprise?.render === 'function') return window.grecaptcha.enterprise
  return null
}

function waitForRecaptchaApi(timeoutMs = 12000) {
  if (getRecaptchaApi()) return Promise.resolve()
  return new Promise((resolve, reject) => {
    const start = Date.now()
    const tick = () => {
      if (getRecaptchaApi()) return resolve()
      if (Date.now() - start >= timeoutMs) return reject(new Error('RECAPTCHA_TIMEOUT'))
      window.setTimeout(tick, 120)
    }
    tick()
  })
}

function loadRecaptchaScript() {
  if (getRecaptchaApi()) return Promise.resolve()
  const existing = document.getElementById(RECAPTCHA_SCRIPT_ID)
  if (existing) return waitForRecaptchaApi()
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.id = RECAPTCHA_SCRIPT_ID
    script.src = RECAPTCHA_SCRIPT_URL
    script.async = true
    script.defer = true
    script.onload = () => waitForRecaptchaApi().then(resolve).catch(reject)
    script.onerror = () => reject(new Error('RECAPTCHA_SCRIPT_FAILED'))
    document.head.appendChild(script)
  })
}

const CONTACT_ITEMS = [
  {
    label: 'Email',
    value: 'kevintomala.27@gmail.com',
    href: 'mailto:kevintomala.27@gmail.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    value: '+593 996659937',
    href: 'https://wa.me/593996659937',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    label: 'Ubicacion',
    value: 'Piedrahita 824 entre Av. Quito y Av. Machala, Guayaquil, Ecuador',
    sub: 'Lunes a Viernes: 08:00 - 16:00',
    href: null,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
]

const ROL_OPTIONS = [
  'Director / Rector',
  'Coordinador académico',
  'Docente',
  'Administrativo',
  'Otro',
]

const MODES = [
  { id: 'demo', label: 'Agendar demo' },
  { id: 'contacto', label: 'Enviar mensaje' },
]

const EMPTY_FIELDS = { nombre: '', email: '', rol: '', institucion: '', fecha: '', mensaje: '' }
const EMPTY_ERRORS = { nombre: '', email: '', rol: '', institucion: '' }

function validateFields(fields, isDemo) {
  const errors = { ...EMPTY_ERRORS }
  if (!fields.nombre.trim()) errors.nombre = 'El nombre es requerido.'
  else if (fields.nombre.trim().length < 2) errors.nombre = 'Ingresa al menos 2 caracteres.'

  if (!fields.email.trim()) errors.email = 'El correo es requerido.'
  else if (!EMAIL_RE.test(fields.email.trim())) errors.email = 'Ingresa un correo válido.'

  if (!fields.rol) errors.rol = 'Selecciona una opción.'

  if (isDemo && !fields.institucion.trim()) errors.institucion = 'El nombre de la institución es requerido.'

  return errors
}

function hasErrors(errors) {
  return Object.values(errors).some(Boolean)
}

export default function Contacto() {
  const [mode, setMode] = useState('demo')
  const [fields, setFields] = useState(EMPTY_FIELDS)
  const [errors, setErrors] = useState(EMPTY_ERRORS)
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState({ msg: '', type: '' })
  const [recaptchaReady, setRecaptchaReady] = useState(false)
  const [recaptchaToken, setRecaptchaToken] = useState('')
  const [recaptchaError, setRecaptchaError] = useState('')
  const captchaContainerRef = useRef(null)
  const captchaWidgetIdRef = useRef(null)

  const isDemo = mode === 'demo'
  const captchaEnabled = Boolean(RECAPTCHA_SITE_KEY)

  useEffect(() => {
    if (!captchaEnabled) return
    let active = true
    loadRecaptchaScript()
      .then(() => { if (active) setRecaptchaReady(true) })
      .catch(() => { if (active) setRecaptchaError('No se pudo cargar reCAPTCHA. Verifica tu conexión.') })
    return () => { active = false }
  }, [captchaEnabled])

  useEffect(() => {
    if (!captchaEnabled || !recaptchaReady || !captchaContainerRef.current) return
    if (captchaWidgetIdRef.current !== null) return
    const api = getRecaptchaApi()
    if (!api?.render) return
    try {
      captchaWidgetIdRef.current = api.render(captchaContainerRef.current, {
        sitekey: RECAPTCHA_SITE_KEY,
        callback: (token) => setRecaptchaToken(String(token || '')),
        'expired-callback': () => setRecaptchaToken(''),
        'error-callback': () => setRecaptchaToken(''),
      })
    } catch {
      setRecaptchaError('Error al inicializar reCAPTCHA. Verifica la clave configurada.')
    }
  }, [captchaEnabled, recaptchaReady])

  const resetCaptcha = () => {
    const api = getRecaptchaApi()
    if (api?.reset && captchaWidgetIdRef.current !== null) {
      api.reset(captchaWidgetIdRef.current)
    }
    setRecaptchaToken('')
  }

  const handleModeChange = (newMode) => {
    setMode(newMode)
    setFields(EMPTY_FIELDS)
    setErrors(EMPTY_ERRORS)
    setTouched({})
    setStatus({ msg: '', type: '' })
    resetCaptcha()
  }

  const setField = (name, value) => {
    const next = { ...fields, [name]: value }
    setFields(next)
    if (touched[name]) {
      const nextErrors = validateFields(next, isDemo)
      setErrors((prev) => ({ ...prev, [name]: nextErrors[name] }))
    }
  }

  const handleBlur = (name) => {
    setTouched((prev) => ({ ...prev, [name]: true }))
    const nextErrors = validateFields(fields, isDemo)
    setErrors((prev) => ({ ...prev, [name]: nextErrors[name] }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const allTouched = Object.fromEntries(Object.keys(EMPTY_ERRORS).map((k) => [k, true]))
    setTouched(allTouched)
    const nextErrors = validateFields(fields, isDemo)
    setErrors(nextErrors)

    if (hasErrors(nextErrors)) {
      setStatus({ msg: 'Revisa los campos marcados e intenta de nuevo.', type: 'is-error' })
      return
    }

    if (captchaEnabled && !recaptchaToken) {
      setStatus({ msg: 'Por favor completa la verificación de seguridad.', type: 'is-error' })
      return
    }

    setStatus({ msg: 'Enviando...', type: '' })

    const data = {
      intent: mode,
      captchaToken: captchaEnabled ? recaptchaToken : 'disabled',
      nombre: fields.nombre.trim(),
      email: fields.email.trim(),
      rol: fields.rol,
      ...(isDemo && {
        institucion: fields.institucion.trim(),
        fecha: fields.fecha,
      }),
      mensaje: fields.mensaje.trim(),
    }

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      })
      if (res.ok) {
        setFields(EMPTY_FIELDS)
        setErrors(EMPTY_ERRORS)
        setTouched({})
        resetCaptcha()
        setStatus({
          msg: isDemo
            ? '¡Listo! Nos pondremos en contacto para confirmar tu demo.'
            : '¡Listo! Te contactaremos muy pronto.',
          type: 'is-success',
        })
      } else {
        setStatus({ msg: 'No pudimos enviar la solicitud. Intenta nuevamente.', type: 'is-error' })
      }
    } catch {
      setStatus({ msg: 'Hubo un error al enviar. Intenta nuevamente.', type: 'is-error' })
    }
  }

  const submitDisabled = captchaEnabled && (!recaptchaReady || !recaptchaToken)

  return (
    <section className="section contact" id="contacto">
      <div className="contact-layout">
        <div className="contact-info" data-reveal>
          <span className="chip">Contacto</span>
          <h2 className="contact-info__heading">
            Tienes preguntas?<br />Estamos para ayudarte
          </h2>
          <p className="contact-info__body">
            Ya sea que tengas dudas sobre la plataforma, necesites soporte o quieras conocer más sobre nuestros servicios, no dudes en contactarnos.
          </p>
          <ul className="contact-items">
            {CONTACT_ITEMS.map(({ label, value, sub, href, icon }) => (
              <li key={label} className="contact-item">
                <span className="contact-item__icon">{icon}</span>
                <div>
                  <p className="contact-item__label">{label}</p>
                  {href
                    ? <a href={href} className="contact-item__value">{value}</a>
                    : <span className="contact-item__value">{value}</span>
                  }
                  {sub && <span className="contact-item__sub">{sub}</span>}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="contact-card" data-reveal>
          <div className="contact-tabs" role="tablist">
            {MODES.map(({ id, label }) => (
              <button
                key={id}
                role="tab"
                aria-selected={mode === id}
                className={`contact-tab${mode === id ? ' is-active' : ''}`}
                onClick={() => handleModeChange(id)}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-grid">
              <label className="form-field">
                Nombre
                <input
                  type="text"
                  name="nombre"
                  placeholder="Tu nombre"
                  value={fields.nombre}
                  onChange={(e) => setField('nombre', e.target.value)}
                  onBlur={() => handleBlur('nombre')}
                  className={errors.nombre && touched.nombre ? 'is-invalid' : ''}
                />
                {errors.nombre && touched.nombre && <span className="field-error">{errors.nombre}</span>}
              </label>
              <label className="form-field">
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="tu@email.com"
                  value={fields.email}
                  onChange={(e) => setField('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  className={errors.email && touched.email ? 'is-invalid' : ''}
                />
                {errors.email && touched.email && <span className="field-error">{errors.email}</span>}
              </label>
            </div>

            <label className="form-field">
              Soy
              <select
                name="rol"
                value={fields.rol}
                onChange={(e) => setField('rol', e.target.value)}
                onBlur={() => handleBlur('rol')}
                className={errors.rol && touched.rol ? 'is-invalid' : ''}
              >
                <option value="">Selecciona una opcion</option>
                {ROL_OPTIONS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
              {errors.rol && touched.rol && <span className="field-error">{errors.rol}</span>}
            </label>

            {isDemo && (
              <>
                <label className="form-field">
                  Institucion
                  <input
                    type="text"
                    name="institucion"
                    placeholder="Nombre de tu centro educativo"
                    value={fields.institucion}
                    onChange={(e) => setField('institucion', e.target.value)}
                    onBlur={() => handleBlur('institucion')}
                    className={errors.institucion && touched.institucion ? 'is-invalid' : ''}
                  />
                  {errors.institucion && touched.institucion && <span className="field-error">{errors.institucion}</span>}
                </label>
                <label className="form-field">
                  Fecha preferida
                  <input
                    type="date"
                    name="fecha"
                    value={fields.fecha}
                    onChange={(e) => setField('fecha', e.target.value)}
                  />
                </label>
              </>
            )}

            <label className="form-field">
              {isDemo ? 'Que te gustaria resolver con Ademy?' : 'Mensaje'}
              <textarea
                name="mensaje"
                rows="3"
                placeholder={isDemo ? 'Cuentanos tu contexto...' : 'En que podemos ayudarte?'}
                value={fields.mensaje}
                onChange={(e) => setField('mensaje', e.target.value)}
              />
            </label>

            {captchaEnabled && (
              <div className="captcha-wrap">
                <p className="captcha-label">Verificacion de seguridad</p>
                <div ref={captchaContainerRef} className="captcha-widget" />
                {!recaptchaReady && !recaptchaError && (
                  <p className="captcha-hint">Cargando reCAPTCHA...</p>
                )}
                {recaptchaError && (
                  <p className="captcha-hint is-error">{recaptchaError}</p>
                )}
              </div>
            )}

            {status.msg && (
              <p className={`form-status ${status.type}`} role="status" aria-live="polite">
                {status.msg}
              </p>
            )}

            <button
              className="btn btn-primary contact-submit"
              type="submit"
              disabled={submitDisabled}
            >
              {isDemo ? 'Solicitar demo' : 'Enviar mensaje'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 2 11 13" /><path d="M22 2 15 22 11 13 2 9l20-7z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
