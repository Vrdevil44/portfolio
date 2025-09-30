import { useEffect, useRef } from 'react'
import './ProgressBar.css'

const ProgressBar = () => {
  const barRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight)
      if (barRef.current) barRef.current.style.width = `${Math.max(0, Math.min(1, scrolled)) * 100}%`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="scroll-progress" aria-hidden>
      <div className="bar" ref={barRef} />
    </div>
  )
}

export default ProgressBar


