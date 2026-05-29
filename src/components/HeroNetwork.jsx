import { useEffect, useRef } from 'react'

const CX = 310
const CY = 250

// Each planet on its own exclusive orbit ring — no shared rx/ry so paths never cross
const PLANETS = [
  { id: 'matricula', rx: 165, ry: 52,  dur: 8,  start: 0.00, r: 32, icon: '☑', label: 'Matrícula', fill: '#f0fdf4', stroke: '#22c55e', textColor: '#15803d' },
  { id: 'sri',       rx: 210, ry: 67,  dur: 11, start: 0.25, r: 30, icon: '⊞',  label: 'SRI',       fill: '#fdf4ff', stroke: '#a855f7', textColor: '#7e22ce' },
  { id: 'pago',      rx: 255, ry: 82,  dur: 14, start: 0.50, r: 31, icon: '$',  label: 'Pagos',     fill: '#eff6ff', stroke: '#3b82f6', textColor: '#1d4ed8' },
  { id: 'correo',    rx: 298, ry: 96,  dur: 17, start: 0.75, r: 27, icon: '✉',  label: 'Avisos',    fill: '#fdf2f8', stroke: '#ec4899', textColor: '#be185d' },
  { id: 'alumno',    rx: 338, ry: 108, dur: 20, start: 0.12, r: 28, icon: '◉',  label: 'Alumnos',   fill: '#fff7ed', stroke: '#f97316', textColor: '#c2410c' },
  { id: 'diploma',   rx: 375, ry: 120, dur: 24, start: 0.60, r: 30, icon: '★',  label: 'Diplomas',  fill: '#fefce8', stroke: '#eab308', textColor: '#854d0e' },
  { id: 'reporte',   rx: 410, ry: 130, dur: 28, start: 0.35, r: 26, icon: '▣',  label: 'Reportes',  fill: '#f0f9ff', stroke: '#0891b2', textColor: '#0e7490' },
]

// Build SVG ellipse path string centered at CX,CY with radii rx,ry
function ellipsePath(cx, cy, rx, ry) {
  return `M ${cx + rx} ${cy} A ${rx} ${ry} 0 1 1 ${cx - rx} ${cy} A ${rx} ${ry} 0 1 1 ${cx + rx} ${cy}`
}

export default function HeroNetwork() {
  const sceneRef = useRef(null)

  useEffect(() => {
    const el = sceneRef.current
    if (!el || !window.matchMedia('(hover: hover)').matches) return
    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const xP = ((e.clientX - rect.left) / rect.width  - 0.5) * 2
      const yP = ((e.clientY - rect.top)  / rect.height - 0.5) * 2
      el.style.transform = `perspective(1400px) rotateX(${8 + yP * -3}deg) rotateY(${-2 + xP * 3}deg)`
    }
    const onLeave = () => {
      el.style.transform = 'perspective(1400px) rotateX(8deg) rotateY(-2deg)'
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div className="hero-network" aria-hidden="true">
      <div className="hero-network__scene" ref={sceneRef}>
        <svg viewBox="-110 100 840 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero-network__svg">
          <defs>
            <radialGradient id="sun-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#5eead4" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#0891b2" stopOpacity="0"    />
            </radialGradient>
            <linearGradient id="sun-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#5eead4" />
              <stop offset="100%" stopColor="#2dd4bf" />
            </linearGradient>
            <radialGradient id="ground-g" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#64748b" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#64748b" stopOpacity="0"   />
            </radialGradient>

            {PLANETS.map(p => (
              <filter key={`gf-${p.id}`} id={`gf-${p.id}`}>
                <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor={p.stroke} floodOpacity="0.35" />
              </filter>
            ))}

            <filter id="blur-xl"><feGaussianBlur stdDeviation="24" /></filter>
            <filter id="blur-md"><feGaussianBlur stdDeviation="7"  /></filter>
            <filter id="sun-shadow">
              <feDropShadow dx="0" dy="10" stdDeviation="16" floodColor="#5eead4" floodOpacity="0.45" />
            </filter>

            {/* Orbit path defs — planets follow these exactly */}
            {PLANETS.map(p => (
              <path key={`op-${p.id}`} id={`op-${p.id}`} d={ellipsePath(CX, CY, p.rx, p.ry)} />
            ))}

            <clipPath id="sun-clip">
              <circle cx={CX} cy={CY} r="40" />
            </clipPath>
          </defs>

          {/* Ground ellipse */}
          <ellipse cx={CX} cy={474} rx="180" ry="16" fill="url(#ground-g)" filter="url(#blur-md)" />

          {/* Ambient glow */}
          <circle cx={CX} cy={CY} r="120" fill="url(#sun-glow)" filter="url(#blur-xl)" />

          {/* Orbit rings — same path as planet motion, now perfectly aligned */}
          {PLANETS.map(p => (
            <path
              key={`orbit-${p.id}`}
              d={ellipsePath(CX, CY, p.rx, p.ry)}
              stroke={p.stroke}
              strokeWidth="1.2"
              strokeOpacity="0.35"
              strokeDasharray="5 7"
            />
          ))}

          {/* Planets — animateMotion follows the exact same path */}
          {PLANETS.map(p => (
            <g key={p.id}>
              <animateMotion
                dur={`${p.dur}s`}
                repeatCount="indefinite"
                begin={`${-p.start * p.dur}s`}
                rotate="none"
              >
                <mpath href={`#op-${p.id}`} />
              </animateMotion>

              {/* Outer glow ring */}
              <circle r={p.r + 8} fill="none" stroke={p.stroke} strokeWidth="1" strokeOpacity="0.2" strokeDasharray="3 4" />
              {/* Body */}
              <circle r={p.r} fill={p.fill} stroke={p.stroke} strokeWidth="2" filter={`url(#gf-${p.id})`} />
              {/* Sphere highlight */}
              <circle cx={-p.r * 0.24} cy={-p.r * 0.3} r={p.r * 0.4} fill="rgba(255,255,255,0.35)" />
              {/* Icon */}
              <text
                textAnchor="middle" dominantBaseline="middle"
                fontSize={p.r < 23 ? 12 : 15}
                fontWeight="800"
                fill={p.textColor}
                fontFamily="Inter,sans-serif"
              >
                {p.icon}
              </text>
              {/* Label */}
              <text
                y={p.r + 13}
                textAnchor="middle"
                fontSize="8"
                fontWeight="700"
                fill="#475569"
                letterSpacing="0.04em"
                fontFamily="Inter,sans-serif"
              >
                {p.label}
              </text>
            </g>
          ))}

          {/* Sun pulse rings */}
          <circle cx={CX} cy={CY} r="60" fill="none" stroke="#5eead4" strokeWidth="2" strokeOpacity="0.12">
            <animate attributeName="r"              values="56;78;56"   dur="3.4s" repeatCount="indefinite" />
            <animate attributeName="stroke-opacity" values="0.2;0;0.2"  dur="3.4s" repeatCount="indefinite" />
          </circle>
          <circle cx={CX} cy={CY} r="52" fill="none" stroke="#2dd4bf" strokeWidth="1.5" strokeOpacity="0.08">
            <animate attributeName="r"              values="48;66;48"    dur="3.4s" begin="1s" repeatCount="indefinite" />
            <animate attributeName="stroke-opacity" values="0.15;0;0.15" dur="3.4s" begin="1s" repeatCount="indefinite" />
          </circle>

          {/* Sun body */}
          <circle cx={CX} cy={CY} r="50" fill="url(#sun-grad)" filter="url(#sun-shadow)" />
          <circle cx={CX - 12} cy={CY - 15} r="23" fill="rgba(255,255,255,0.18)" />

          {/* Logo */}
          <image
            href="/assets/ademy-logo.png"
            x={CX - 26} y={CY - 26}
            width="52" height="52"
            clipPath="url(#sun-clip)"
            preserveAspectRatio="xMidYMid meet"
          />
        </svg>
      </div>
    </div>
  )
}
