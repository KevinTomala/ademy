import { useEffect, useRef } from 'react'

export default function ScrollToTop() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    const onScroll = () => {
      el.classList.toggle('is-visible', window.scrollY > 500)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = () => {
    window.history.replaceState(null, '', window.location.pathname + window.location.search)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      ref={ref}
      className="scroll-top"
      type="button"
      aria-label="Volver arriba"
      onClick={handleClick}
    />
  )
}
