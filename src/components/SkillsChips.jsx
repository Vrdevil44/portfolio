import React from 'react'

const Chip = ({ label }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', padding: '6px 12px',
    borderRadius: 999, fontSize: 13, color: 'var(--color-text)',
    background: 'color-mix(in oklab, var(--accent-soft), transparent 60%)',
    border: '1px solid color-mix(in oklab, var(--role-primary), white 70%)'
  }}>{label}</span>
)

const SkillsChips = ({ items = [] }) => (
  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
    {items.map((s) => <Chip key={s} label={s} />)}
  </div>
)

export default SkillsChips


