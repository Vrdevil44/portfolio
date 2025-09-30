import { createContext, useContext, useState, useEffect } from 'react'
import { applyThemeTokens } from '../../../theme/themeEngine'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [bgColor1, setBgColor1] = useState('#6a00ff')
  const [bgColor2, setBgColor2] = useState('#00e0ff')
  const [blurIntensity, setBlurIntensity] = useState(12)
  const [overlayOpacity, setOverlayOpacity] = useState(0.6)
  const [isOverlayVisible, setIsOverlayVisible] = useState(true)

  // Glassmorphism tokens
  const [glass, setGlass] = useState({
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.18)',
    blur: 16,
    radius: 20,
  })

  // Glow tokens
  const [glow, setGlow] = useState({
    enabled: true,
    color: '#a970ff',
    intensity: 24,
    spread: 0.3,
  })

  // Surface overrides (alpha for panel/card/control). If null, derive from glass background
  const [surfaces, setSurfaces] = useState({
    panelAlpha: null,
    cardAlpha: null,
    controlAlpha: null,
  })

  // Motion scale
  const [motionScale, setMotionScale] = useState(1)

  // Convert decimal opacity to hex
  const toHex = (opacity) => Math.round(opacity * 255).toString(16).padStart(2, '0')

  // Generate background style
  const overlayStyle = {
    background: `linear-gradient(135deg, 
      ${bgColor1}${toHex(overlayOpacity)}, 
      ${bgColor2}${toHex(overlayOpacity)}
    )`,
    backdropFilter: `blur(${blurIntensity}px)`,
    WebkitBackdropFilter: `blur(${blurIntensity}px)`,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    opacity: isOverlayVisible ? 1 : 0,
    transition: 'opacity 0.3s ease'
  }

  // Update document background when colors change
  useEffect(() => {
    const background = `linear-gradient(135deg, ${bgColor1}${toHex(overlayOpacity)}, ${bgColor2}${toHex(overlayOpacity)})`
    document.documentElement.style.setProperty('--bg-overlay', background)
  }, [bgColor1, bgColor2, overlayOpacity, toHex])

  // Push tokens to CSS variables (theme engine)
  useEffect(() => {
    applyThemeTokens({
      primaryHex: bgColor1,
      secondaryHex: bgColor2,
      overlayOpacity,
      blurPx: blurIntensity,
      glassBackground: glass.background,
      glassBorder: glass.border,
      radiusPx: glass.radius,
      glow,
      overlayVisible: isOverlayVisible,
      panelAlpha: surfaces.panelAlpha,
      cardAlpha: surfaces.cardAlpha,
      controlAlpha: surfaces.controlAlpha,
      motionScale,
    })
  }, [bgColor1, bgColor2, overlayOpacity, blurIntensity, glass, glow, isOverlayVisible, surfaces, motionScale])

  return (
    <ThemeContext.Provider value={{
      bgColor1,
      setBgColor1,
      bgColor2,
      setBgColor2,
      blurIntensity,
      setBlurIntensity,
      overlayOpacity,
      setOverlayOpacity,
      isOverlayVisible,
      setIsOverlayVisible,
      overlayStyle,
      glass,
      setGlass,
      glow,
      setGlow,
      surfaces,
      setSurfaces,
      motionScale,
      setMotionScale,
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
} 