import { useState, useEffect, useRef } from 'react'

export default function Counter({ count, prefix = '', suffix = '' }) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        obs.unobserve(el)
        const duration = 1200
        const start = performance.now()
        const step = (now) => {
          const p = Math.min((now - start) / duration, 1)
          setValue(Math.round(count * p))
          if (p < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      },
      { threshold: 0.6 }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [count])

  return (
    <span ref={ref} className="metric">
      {prefix}{value}{suffix}
    </span>
  )
}
