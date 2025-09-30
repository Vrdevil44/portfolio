import { useState, useRef, useEffect } from 'react'
import './SettingsPanel.css'
import ThemeSettings from './ThemeSettings'
import DesignSettings from './design/DesignSettings'
import EffectSettings from './EffectSettings'

function SettingsPanel({ isOpen, onClose, onEffectSettingsChange, onEffectTypeChange, effectSettings, effectType }) {
  const [activeTab, setActiveTab] = useState('effect')
  const panelRef = useRef(null)

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }

  return (
    <>
      {isOpen && (
        <div className="settings-backdrop" onClick={onClose} aria-hidden></div>
      )}
      <div 
        ref={panelRef} 
        className={`settings-panel ${isOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Settings Panel"
        onPointerDown={(e) => e.stopPropagation()}
      >
      
      <div className="settings-header">
        <div className="settings-title">Settings</div>
      <button className="close-button" onClick={onClose} aria-label="Close settings">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div className="tabs" role="tablist" aria-label="Settings Tabs">
          <button
            className={`tab ${activeTab === 'effect' ? 'active' : ''}`}
            onClick={() => handleTabClick('effect')}
            role="tab"
            aria-selected={activeTab === 'effect'}
            aria-controls="effects-panel"
          >
            Effect
          </button>
          <button
            className={`tab ${activeTab === 'theme' ? 'active' : ''}`}
            onClick={() => handleTabClick('theme')}
            role="tab"
            aria-selected={activeTab === 'theme'}
            aria-controls="theme-panel"
          >
            Theme
          </button>
          <button
            className={`tab ${activeTab === 'design' ? 'active' : ''}`}
            onClick={() => handleTabClick('design')}
            role="tab"
            aria-selected={activeTab === 'design'}
            aria-controls="design-panel"
          >
            Design
          </button>
        </div>
        
      </div>
      <div className="settings-content">
        {activeTab === 'effect' && (
          <div id="effects-panel" role="tabpanel">
            <EffectSettings 
              onEffectSettingsChange={onEffectSettingsChange}
              onEffectTypeChange={onEffectTypeChange}
              effectSettings={effectSettings}
              effectType={effectType}
            />
          </div>
        )}
        {activeTab === 'theme' && (
          <div id="theme-panel" role="tabpanel">
            <ThemeSettings />
          </div>
        )}
        {activeTab === 'design' && (
          <div id="design-panel" role="tabpanel">
            <DesignSettings />
          </div>
        )}

        <div className="setting-group">
          <button className="setting-button" onClick={() => {
            const config = { effectType, effectSettings }
            navigator.clipboard?.writeText(JSON.stringify(config, null, 2))
          }}>Copy current config JSON</button>
          <button className="setting-button" onClick={() => window.location.reload()}>Reset all</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default SettingsPanel 