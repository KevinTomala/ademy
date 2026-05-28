export default function ScrollToTop({ visible }) {
  const handleClick = () => {
    window.history.replaceState(null, '', window.location.pathname + window.location.search)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      className={`scroll-top${visible ? ' is-visible' : ''}`}
      type="button"
      aria-label="Volver arriba"
      onClick={handleClick}
    >
      ↑
    </button>
  )
}
