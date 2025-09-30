import React from 'react'

const LogosMarquee = ({ items = [] }) => {
  return (
    <div style={{
      overflow: 'hidden',
      maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)'
    }}>
      <div style={{
        display: 'flex', gap: 32, alignItems: 'center',
        animation: 'marquee 20s linear infinite'
      }}>
        {[...items, ...items].map((src, i) => (
          <img key={i} src={src} alt="logo" style={{ height: 28, opacity: 0.8, filter: 'grayscale(1) brightness(1.2)' }} />
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  )
}

export default LogosMarquee


