import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import VantaBackground from '../components/VantaBackground'
import NavigationBar from '../components/NavigationBar/NavigationBar'
import SettingsPanel from '../components/SettingsPanel'
import { useTheme } from '../components/SettingsPanel/ThemeSettings/ThemeContext'
import { defaultBirdsPreset, VANTA_EFFECTS } from '../components/SettingsPanel/EffectSettings/VantaPresets'
import ProgressBar from '../components/ProgressBar'
import { DesignProvider } from '../contexts/DesignContext'
import DesignOverlay from '../components/DesignOverlay'
import DesignStylesApplier from '../components/DesignStylesApplier'
import Footer from '../components/Footer'
import '../components/VantaBackground.css'
import '../App.css'

const AppShell = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [effectSettings, setEffectSettings] = useState(defaultBirdsPreset.settings)
  const [effectType, setEffectType] = useState(VANTA_EFFECTS.BIRDS)
  const { overlayStyle } = useTheme()

  const handleEffectSettingsChange = (newSettings) => {
    setEffectSettings(prevSettings => ({
      ...prevSettings,
      ...newSettings
    }))
  }

  const handleEffectTypeChange = (newType) => {
    setEffectType(newType)
  }

  const togglePanel = () => setIsPanelOpen(prev => !prev)

  useEffect(() => {
    const setVH = () => {
      let vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }
    setVH()
    window.addEventListener('resize', setVH)
    return () => window.removeEventListener('resize', setVH)
  }, [])

  return (
    <>
      <ProgressBar />
      <VantaBackground settings={effectSettings} effectType={effectType} />
      <div className="background-overlay" style={overlayStyle}></div>
      <DesignProvider>
        <DesignOverlay />
        <DesignStylesApplier />
        <NavigationBar />
        <div className="landing-page">
        <div 
          className={`settings-icon ${isPanelOpen ? 'hidden' : ''}`} 
          onClick={togglePanel}
          role="button"
          aria-label="Toggle settings panel"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        </div>

          <Outlet />

          <SettingsPanel 
            isOpen={isPanelOpen}
            onClose={() => setIsPanelOpen(false)}
            onEffectSettingsChange={handleEffectSettingsChange}
            onEffectTypeChange={handleEffectTypeChange}
            effectSettings={effectSettings}
            effectType={effectType}
          />
          <Footer />
        </div>
      </DesignProvider>
    </>
  )
}

export default AppShell


