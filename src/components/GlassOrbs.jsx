import React, { useEffect, useRef } from 'react'
import { useTheme } from './SettingsPanel/ThemeSettings/ThemeContext'
import './GlassOrbs.css'

// Simple interactive foreground of glassy orbs that react to mouse
const NUM_ORBS = 8

const GlassOrbs = () => {
  const containerRef = useRef(null)
  const { glass, glow } = useTheme()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMove = (e) => {
      const { clientX: x, clientY: y } = e
      const rect = container.getBoundingClientRect()
      const cx = x - rect.left
      const cy = y - rect.top
      const orbs = container.querySelectorAll('.glass-orb')
      orbs.forEach((orb, i) => {
        const ox = (i / orbs.length) * rect.width
        const oy = ((i % 3) / 3) * rect.height
        const dx = (cx - ox) / rect.width
        const dy = (cy - oy) / rect.height
        const translateX = dx * 20
        const translateY = dy * 20
        const rotate = dx * 10
        orb.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)`
      })
    }

    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  const orbStyle = {
    background: glass.background,
    border: glass.border,
    backdropFilter: `blur(${glass.blur}px)`,
    WebkitBackdropFilter: `blur(${glass.blur}px)`,
    borderRadius: `${glass.radius}px`,
    boxShadow: glow.enabled ? `0 0 ${glow.intensity}px ${Math.max(2, glow.intensity/6)}px ${glow.color}` : 'none',
  }

  return (
    <div className="glass-orbs" ref={containerRef} aria-hidden>
      {Array.from({ length: NUM_ORBS }).map((_, i) => (
        <div key={i} className="glass-orb" style={orbStyle} />
      ))}
    </div>
  )
}

export default GlassOrbs


