import React from 'react'

const Footer = () => {
  return (
    <footer style={{
      marginTop: 'var(--space-6)',
      padding: '24px var(--container-pad)',
      borderTop: '1px solid rgba(255,255,255,0.12)',
      background: 'rgba(255,255,255,0.03)'
    }}>
      <div style={{
        display: 'flex',
        gap: 12,
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '1200px',
        margin: '0 auto',
        color: 'var(--color-text-muted)'
      }}>
        <div>© {new Date().getFullYear()} Your Name</div>
        <div style={{ display: 'flex', gap: 10 }}>
          <a href="#" style={{ color: 'var(--color-text-muted)' }}>Twitter</a>
          <a href="#" style={{ color: 'var(--color-text-muted)' }}>GitHub</a>
          <a href="#" style={{ color: 'var(--color-text-muted)' }}>LinkedIn</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer


