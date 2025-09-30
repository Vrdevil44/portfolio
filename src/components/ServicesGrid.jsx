import React from 'react'
import Surface from './ui/Surface'

const ServiceCard = ({ icon, title, description, features = [] }) => (
  <Surface type="card" elevation={2} radius="lg" style={{ padding: 20 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
      <div style={{ width: 36, height: 36, borderRadius: 8, background: 'color-mix(in oklab, var(--accent-soft), transparent 40%)', display: 'grid', placeItems: 'center' }}>{icon}</div>
      <h3 style={{ margin: 0 }}>{title}</h3>
    </div>
    <p style={{ color: 'var(--color-text-muted)' }}>{description}</p>
    {features.length > 0 && (
      <ul style={{ paddingLeft: 18, margin: '8px 0 0', color: 'var(--color-text-muted)' }}>
        {features.map((f, i) => <li key={i}>{f}</li>)}
      </ul>
    )}
  </Surface>
)

const ServicesGrid = ({ items = [] }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
    {items.map((s, i) => <ServiceCard key={i} {...s} />)}
  </div>
)

export default ServicesGrid


