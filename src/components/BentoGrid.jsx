import React from 'react'
import Surface from './ui/Surface'

export const BentoGrid = ({ children }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gap: 'var(--space-4)',
    padding: '0 var(--container-pad) var(--space-6)'
  }}>
    {children}
  </div>
)

export const BentoItem = ({ col = 'span 6', row = 'span 2', children }) => (
  <Surface type="card" elevation={2} radius="lg" style={{
    gridColumn: col,
    gridRow: row,
    padding: 'var(--space-6)'
  }}>
    {children}
  </Surface>
)


