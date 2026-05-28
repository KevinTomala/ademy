import { useState } from 'react'

const ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'

export default function Contacto() {
  const [status, setStatus] = useState({ msg: '', type: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target

    const requiredFields = Array.from(form.querySelectorAll('input[required]'))
    let hasError = false
    requiredFields.forEach((f) => {
      const valid = f.value.trim().length > 0
      f.classList.toggle('is-invalid', !valid)
      if (!valid) hasError = true
    })

    const emailField = form.querySelector('input[type="email"]')
    if (emailField) {
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value.trim())
      emailField.classList.toggle('is-invalid', !emailValid)
      if (!emailValid) hasError = true
    }

    if (hasError) {
      setStatus({ msg: 'Revisa los campos marcados e intenta de nuevo.', type: 'is-error' })
      return
    }

    if (ENDPOINT.includes('YOUR_FORM_ID')) {
      setStatus({ msg: 'Configura el endpoint del formulario para enviar la solicitud.', type: 'is-error' })
      return
    }

    setStatus({ msg: 'Enviando solicitud...', type: '' })

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        form.reset()
        setStatus({ msg: 'Listo! Te contactaremos muy pronto.', type: 'is-success' })
      } else {
        setStatus({ msg: 'No pudimos enviar la solicitud. Intenta nuevamente.', type: 'is-error' })
      }
    } catch {
      setStatus({ msg: 'Hubo un error al enviar. Intenta nuevamente.', type: 'is-error' })
    }
  }

  return (
    <section className="section contact" id="contacto">
      <div className="section-header" data-reveal>
        <h2>Agenda una demo personalizada</h2>
        <p>Cuanto mas contexto nos des, mas rapido mostramos valor en tu operacion.</p>
      </div>
      <form className="contact-form" onSubmit={handleSubmit} data-reveal>
        <div className="form-grid">
          <label className="form-field">
            Nombre y apellido
            <input type="text" name="nombre" placeholder="Tu nombre" required />
          </label>
          <label className="form-field">
            Correo corporativo
            <input type="email" name="email" placeholder="correo@institucion.edu" required />
          </label>
          <label className="form-field">
            Institucion
            <input type="text" name="institucion" placeholder="Nombre de tu centro" required />
          </label>
          <label className="form-field">
            Numero de sedes
            <input type="number" name="sedes" placeholder="Ej. 3" min="1" />
          </label>
        </div>
        <label className="form-field">
          Que te gustaria resolver con Ademy?
          <textarea name="mensaje" rows="4" placeholder="Cuentanos tu contexto"></textarea>
        </label>
        <div className="form-actions">
          <button className="btn btn-primary" type="submit">
            Enviar solicitud
          </button>
          <button className="btn btn-ghost" type="reset">
            Limpiar
          </button>
        </div>
        {status.msg && (
          <p className={`form-status ${status.type}`} role="status" aria-live="polite">
            {status.msg}
          </p>
        )}
      </form>
    </section>
  )
}
