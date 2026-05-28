import { useEffect, useRef } from 'react'
import ScrollProgress from './components/ScrollProgress'
import ScrollToTop from './components/ScrollToTop'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Impacto from './sections/Impacto'
import Beneficios from './sections/Beneficios'
import Modulos from './sections/Modulos'
import Integraciones from './sections/Integraciones'
import Comparativa from './sections/Comparativa'
import Caso from './sections/Caso'
import Seguridad from './sections/Seguridad'
import Roles from './sections/Roles'
import Demo from './sections/Demo'
import Gallery from './sections/Gallery'
import Proceso from './sections/Proceso'
import Tutoriales from './sections/Tutoriales'
import FAQ from './sections/FAQ'
import Contacto from './sections/Contacto'
import Footer from './sections/Footer'

export default function App() {
  const progressBarRef = useRef(null)

  useEffect(() => {
    const bar = progressBarRef.current
    const update = () => {
      const y = window.scrollY
      const docH = document.documentElement.scrollHeight - document.documentElement.clientHeight
      if (bar) bar.style.width = (docH ? Math.min((y / docH) * 100, 100) : 0) + '%'
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])


  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal], [data-reveal="left"], [data-reveal="right"]')
    if (!els.length) return
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); observer.unobserve(e.target) } }),
      { threshold: 0.12 }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return
    const targets = document.querySelectorAll('.card, .chip, .step, .quote, .demo-panel, .screen')
    const maxTilt = 6
    const cleanup = []

    targets.forEach((target) => {
      let rect = null
      const onMove = (e) => {
        if (!rect) rect = target.getBoundingClientRect()
        const xP = ((e.clientX - rect.left) / rect.width - 0.5) * 2
        const yP = ((e.clientY - rect.top) / rect.height - 0.5) * 2
        target.style.transform = `translateY(-4px) rotateX(${(yP * maxTilt * -1).toFixed(2)}deg) rotateY(${(xP * maxTilt).toFixed(2)}deg)`
      }
      const onLeave = () => {
        rect = null
        target.style.transform = ''
      }
      target.addEventListener('mousemove', onMove)
      target.addEventListener('mouseleave', onLeave)
      cleanup.push(() => {
        target.removeEventListener('mousemove', onMove)
        target.removeEventListener('mouseleave', onLeave)
      })
    })

    return () => cleanup.forEach((fn) => fn())
  }, [])

  return (
    <>
      <div className="wave-bg" aria-hidden="true">
        <span className="wave-layer wave-layer--single"></span>
      </div>
      <ScrollProgress ref={progressBarRef} />
      <Nav />
      <main className="page">
        <Hero />
        <Beneficios />
        <Modulos />
        <Integraciones />
        <Comparativa />
        <Caso />
        <Seguridad />
        <Roles />
        <Demo />
        <Gallery />
        <Proceso />
        <Tutoriales />
        <Impacto />
        <FAQ />
        <Contacto />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
