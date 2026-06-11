import { useEffect, useRef } from 'react'
import { FaGraduationCap, FaCreditCard, FaFileAlt } from 'react-icons/fa'

// SVG coordinate space: 500 × 330
// Ademy card: left=68  top=64  w=192 h=160  → right-center (260, 144)
// Docco card: left=306 top=8   w=186 h=108  → left-center  (306,  62)
// Empleo card:left=306 top=214 w=186 h=108  → left-center  (306, 268)
const PATH_DOCCO     = 'M 260,148 C 292,148 286,66  306,66'   // Ademy → Docco
const PATH_DOCCO_RET = 'M 306,56  C 286,56  292,136 260,136'  // Docco → Ademy (resultado)
const PATH_EMPLEO    = 'M 260,144 C 292,144 286,268 306,268'  // Ademy → EmpleoFácil

export default function HeroEcosystem() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !window.matchMedia('(hover: hover)').matches) return
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const xP = ((e.clientX - r.left) / r.width  - 0.5) * 2
      const yP = ((e.clientY - r.top)  / r.height - 0.5) * 2
      el.style.transform = `perspective(1200px) rotateX(${4 + yP * -3}deg) rotateY(${-1 + xP * 3}deg)`
    }
    const onLeave = () => { el.style.transform = 'perspective(1200px) rotateX(4deg) rotateY(-1deg)' }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave) }
  }, [])

  return (
    <div className="hero-ecosystem" aria-hidden="true" ref={ref}>
      <div className="he-stage">

        <svg className="he-svg" viewBox="0 0 500 330" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker id="he-arr-docco"  markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto" markerUnits="userSpaceOnUse">
              <path d="M 0,0.5 L 6,3.5 L 0,6.5 Z" fill="#7c3aed" />
            </marker>
            <marker id="he-arr-empleo" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto" markerUnits="userSpaceOnUse">
              <path d="M 0,0.5 L 6,3.5 L 0,6.5 Z" fill="#1d4ed8" />
            </marker>
            <marker id="he-arr-entry"  markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto" markerUnits="userSpaceOnUse">
              <path d="M 0,0.5 L 6,3.5 L 0,6.5 Z" fill="#94a3b8" />
            </marker>
            <marker id="he-arr-ret" markerWidth="7" markerHeight="7" refX="1" refY="3.5" orient="auto" markerUnits="userSpaceOnUse">
              <path d="M 6,0.5 L 0,3.5 L 6,6.5 Z" fill="#16a34a" />
            </marker>
            <path id="he-p-docco"     d={PATH_DOCCO}     />
            <path id="he-p-docco-ret" d={PATH_DOCCO_RET} />
            <path id="he-p-empleo"    d={PATH_EMPLEO}    />
          </defs>

          {/* Ambient glow behind Ademy */}
          <ellipse cx="164" cy="144" rx="88" ry="72" fill="rgba(12,134,121,0.07)" />

          {/* ── Paths ── */}
          <path d={PATH_DOCCO}     stroke="#7c3aed" strokeWidth="1.6" strokeDasharray="5 4" strokeOpacity="0.5"  markerEnd="url(#he-arr-docco)"  />
          <path d={PATH_DOCCO_RET} stroke="#16a34a" strokeWidth="1.3" strokeDasharray="3 5" strokeOpacity="0.4"  markerEnd="url(#he-arr-ret)"    />
          <path d={PATH_EMPLEO}    stroke="#1d4ed8" strokeWidth="1.6" strokeDasharray="5 4" strokeOpacity="0.5"  markerEnd="url(#he-arr-empleo)" />

          {/* ── Outgoing dots ── */}
          <circle r="5" fill="#7c3aed" fillOpacity="0.9">
            <animateMotion dur="2.4s" repeatCount="indefinite" begin="0s">
              <mpath href="#he-p-docco" />
            </animateMotion>
          </circle>
          <circle r="5" fill="#1d4ed8" fillOpacity="0.9">
            <animateMotion dur="2.8s" repeatCount="indefinite" begin="0.6s">
              <mpath href="#he-p-empleo" />
            </animateMotion>
          </circle>

          {/* ── Resultado ✓ OK: viaja 2.4s, pausa 2.4s, período total 4.8s ── */}
          <g opacity="0">
            <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.04;0.48;0.52;1" dur="4.8s" repeatCount="indefinite" begin="1.4s" calcMode="linear" />
            <animateMotion dur="4.8s" repeatCount="indefinite" begin="1.4s" keyTimes="0;0.5;1" keyPoints="0;1;1" calcMode="linear">
              <mpath href="#he-p-docco-ret" />
            </animateMotion>
            <circle r="5" fill="#16a34a" />
            <rect x="-14" y="-20" width="28" height="13" rx="3" fill="rgba(220,252,231,0.95)" />
            <text y="-10" textAnchor="middle" fontSize="7.5" fill="#15803d" fontFamily="Inter,sans-serif" fontWeight="700">✓ OK</text>
          </g>

          {/* ── Resultado ✗ No: empieza 2.4s después del OK, mismo período 4.8s ── */}
          <g opacity="0">
            <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.04;0.48;0.52;1" dur="4.8s" repeatCount="indefinite" begin="3.8s" calcMode="linear" />
            <animateMotion dur="4.8s" repeatCount="indefinite" begin="3.8s" keyTimes="0;0.5;1" keyPoints="0;1;1" calcMode="linear">
              <mpath href="#he-p-docco-ret" />
            </animateMotion>
            <circle r="5" fill="#dc2626" />
            <rect x="-18" y="-20" width="36" height="13" rx="3" fill="rgba(254,226,226,0.95)" />
            <text y="-10" textAnchor="middle" fontSize="7.5" fill="#dc2626" fontFamily="Inter,sans-serif" fontWeight="700">✗ No</text>
          </g>

          {/* ── Label: envío a Docco ── */}
          <rect x="262" y="73" width="42" height="15" rx="4" fill="white" fillOpacity="0.92" />
          <text x="283" y="84" textAnchor="middle" fontSize="8" fill="#7c3aed" fontFamily="Inter,sans-serif" fontWeight="700">Envía docs</text>

          {/* ── Label: egresados ── */}
          <rect x="258" y="194" width="56" height="16" rx="4" fill="white" fillOpacity="0.92" />
          <text x="286" y="205" textAnchor="middle" fontSize="8.5" fill="#1d4ed8" fontFamily="Inter,sans-serif" fontWeight="700">Egresados</text>

          {/* ── Student badge ── */}
          <rect x="1" y="130" width="54" height="28" rx="9" fill="#f1f5f9" stroke="rgba(100,116,139,0.3)" strokeWidth="1" />
          <text x="28" y="144" textAnchor="middle" dominantBaseline="central" fontSize="9.5" fill="#475569" fontFamily="Inter,sans-serif" fontWeight="700">Agente</text>
          <line x1="56" y1="144" x2="66" y2="144" stroke="#94a3b8" strokeWidth="1.4" markerEnd="url(#he-arr-entry)" />
        </svg>

        {/* ── Ademy card — principal ── */}
        <div className="he-card he-card--ademy">
          <div className="he-card-top">
            <img src="/assets/ademy-logo.png" alt="Ademy" className="he-icon" />
            <span className="he-name he-name--ademy">Ademy</span>
          </div>
          <ul className="he-features">
            <li><FaGraduationCap className="he-fi" style={{ color: '#0c8679' }} />Campus virtual</li>
            <li><FaCreditCard    className="he-fi" style={{ color: '#0c8679' }} />Pagos y matrículas</li>
            <li><FaFileAlt      className="he-fi" style={{ color: '#0c8679' }} />Diplomas · SRI</li>
          </ul>
        </div>

        {/* ── Docco card ── */}
        <div className="he-card he-card--docco">
          <div className="he-card-top">
            <img src="/assets/docco-icon.png" alt="Docco" className="he-icon he-icon--blend" />
            <span className="he-name he-name--docco">Docco</span>
          </div>
          <p className="he-desc">OCR + IA · Analiza documentos y devuelve resultado</p>
        </div>

        {/* ── EmpleoFácil card ── */}
        <div className="he-card he-card--empleo">
          <div className="he-card-top">
            <img src="/assets/empleo-icon.png" alt="EmpleoFácil" className="he-icon he-icon--blend" />
            <span className="he-name he-name--empleo">EmpleoFácil</span>
          </div>
          <p className="he-desc">Bolsa de empleo para egresados</p>
        </div>

      </div>

      <div className="he-adapt">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="3" /><path d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
        </svg>
        Este flujo se configura según tus requerimientos
      </div>
    </div>
  )
}
