import { useMemo } from 'react'
import { useDesign } from '../../../contexts/DesignContext'
import '../SettingsPanel.css'

const VAR_OPTIONS = [
  { name: '--color-primary', label: 'Primary Color', type: 'color' },
  { name: '--color-secondary', label: 'Secondary Color', type: 'color' },
  { name: '--blur', label: 'Blur (px)', type: 'range', min: 0, max: 40, step: 1 },
  { name: '--radius', label: 'Radius (px)', type: 'range', min: 0, max: 40, step: 1 },
]

export default function DesignSettings() {
  const { isDesignMode, toggleDesignMode, selectedId, overridesById, setOverride, clearOverrides } = useDesign()

  const currentOverrides = overridesById[selectedId] || {}

  return (
    <div className="setting-group">
      <div className="setting-row" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <label style={{ flex: '0 0 120px' }}>Design Mode</label>
        <button className="setting-button" onClick={toggleDesignMode}>
          {isDesignMode ? 'Disable' : 'Enable'}
        </button>
      </div>

      <div className="setting-row">
        <div style={{ color: 'white', opacity: 0.8 }}>
          Selected: {selectedId ? selectedId : 'None (click an element)'}
        </div>
        {selectedId && (
          <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
            <button className="setting-button" onClick={() => clearOverrides(selectedId)}>Clear element overrides</button>
          </div>
        )}
      </div>

      {selectedId && (
        <div style={{ display: 'grid', gap: 12 }}>
          {VAR_OPTIONS.map((opt) => (
            <div key={opt.name} className="setting-row" style={{ display: 'grid', gridTemplateColumns: '140px 1fr auto', gap: 12, alignItems: 'center' }}>
              <label>{opt.label}</label>
              {opt.type === 'color' ? (
                <input
                  type="color"
                  value={currentOverrides[opt.name] || ''}
                  onChange={(e) => setOverride(selectedId, opt.name, e.target.value)}
                  style={{ width: 56, height: 32, background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 8 }}
                />
              ) : (
                <input
                  type="range"
                  min={opt.min}
                  max={opt.max}
                  step={opt.step}
                  value={parseInt((currentOverrides[opt.name] || '').replace('px','')) || 0}
                  onChange={(e) => setOverride(selectedId, opt.name, `${e.target.value}px`)}
                />
              )}
              <input
                type="text"
                placeholder="custom value"
                value={currentOverrides[opt.name] || ''}
                onChange={(e) => setOverride(selectedId, opt.name, e.target.value)}
                className="setting-input"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


