import { forwardRef } from 'react'

const ScrollProgress = forwardRef(function ScrollProgress(_, ref) {
  return (
    <div className="scroll-progress" aria-hidden="true">
      <span ref={ref} className="scroll-progress__bar"></span>
    </div>
  )
})

export default ScrollProgress
