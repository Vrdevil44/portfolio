import React from 'react'

const FilterTabs = ({ tabs = [], value, onChange }) => {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {tabs.map((t) => {
        const active = value === t.value
        return (
          <button
            key={t.value}
            className="ui-button"
            onClick={() => onChange?.(t.value)}
            style={{
              background: active
                ? 'color-mix(in oklab, var(--role-primary), transparent 70%)'
                : 'var(--surface-card-bg)',
              borderColor: active
                ? 'color-mix(in oklab, var(--role-primary), white 70%)'
                : 'rgba(255,255,255,0.2)'
            }}
          >{t.label}</button>
        )
      })}
    </div>
  )
}

export default FilterTabs


