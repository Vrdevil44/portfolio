import React from 'react'
import Surface from './ui/Surface'

const Testimonial = ({ quote, author, role }) => (
  <Surface type="card" elevation={2} radius="lg" style={{ padding: 20 }}>
    <p style={{ margin: 0, color: 'var(--color-text)' }}>
      “{quote}”
    </p>
    <div style={{ marginTop: 10, color: 'var(--color-text-muted)', fontSize: 14 }}>
      — {author}{role ? `, ${role}` : ''}
    </div>
  </Surface>
)

const Testimonials = ({ items = [] }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
    {items.map((it, i) => (
      <Testimonial key={i} {...it} />
    ))}
  </div>
)

export default Testimonials


