import React from 'react'

const Step = ({ index, title, description }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '32px 1fr', gap: 12, alignItems: 'start' }}>
    <div style={{
      width: 32, height: 32, borderRadius: 16,
      background: 'color-mix(in oklab, var(--role-primary), transparent 70%)',
      border: '1px solid color-mix(in oklab, var(--role-primary), white 70%)',
      display: 'grid', placeItems: 'center', color: 'white', fontSize: 14
    }}>{index}</div>
    <div>
      <h4 style={{ margin: '0 0 4px' }}>{title}</h4>
      <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>{description}</p>
    </div>
  </div>
)

const ProcessTimeline = ({ steps = [] }) => (
  <div style={{ display: 'grid', gap: 16 }}>
    {steps.map((s, i) => <Step key={i} index={i+1} {...s} />)}
  </div>
)

export default ProcessTimeline


