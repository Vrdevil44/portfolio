import ColorPicker from './ColorPicker'
import BlurSettings from './BlurSettings'
import OpacitySettings from './OpacitySettings'
import { useTheme } from './ThemeContext'
import { Toggle } from '../shared/SettingSection'
import FontSettings from '../FontSettings/FontSettings'
import './ThemeSettings.css'

const ThemeSettings = () => {
  const {
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
    glass,
    setGlass,
    glow,
    setGlow,
    surfaces,
    setSurfaces,
    motionScale,
    setMotionScale,
  } = useTheme()

  // Convert decimal opacity to hex
  const toHex = (opacity) => {
    return Math.round(opacity * 255).toString(16).padStart(2, '0')
  }

  // Generate background style
  const overlayStyle = {
    background: `linear-gradient(135deg, 
      ${bgColor1}${toHex(overlayOpacity)}, 
      ${bgColor2}${toHex(overlayOpacity)}
    )`,
    backdropFilter: `blur(${blurIntensity}px)`,
    WebkitBackdropFilter: `blur(${blurIntensity}px)`,
  }

  return (
    <div className="theme-settings">
      <details className="setting-section">
        <summary>Background Overlay</summary>
        <div className="setting-content">
          <div className="setting-row">
            <Toggle
              value={isOverlayVisible}
              onChange={setIsOverlayVisible}
              label="Show Overlay"
            />
          </div>
          <ColorPicker 
            label="Background Color 1"
            value={bgColor1}
            onChange={setBgColor1}
          />
          <ColorPicker 
            label="Background Color 2"
            value={bgColor2}
            onChange={setBgColor2}
          />
          <BlurSettings 
            value={blurIntensity}
            onChange={setBlurIntensity}
          />
          <OpacitySettings 
            value={overlayOpacity}
            onChange={setOverlayOpacity}
          />
          <div className="gradient-preview" style={{
            background: `linear-gradient(135deg, ${bgColor1}, ${bgColor2})`
          }}></div>
        </div>
      </details>

      <details className="setting-section">
        <summary>Font Settings</summary>
        <div className="setting-content">
          <FontSettings />
        </div>
      </details>

      <details className="setting-section">
        <summary>Color Palette</summary>
        <div className="setting-content">
          <div className="color-group">
            <label>Primary Color</label>
            <ColorPicker 
              label="Primary"
              value={bgColor1}
              onChange={setBgColor1}
            />
          </div>
          <div className="color-group">
            <label>Secondary Color</label>
            <ColorPicker 
              label="Secondary"
              value={bgColor2}
              onChange={setBgColor2}
            />
          </div>
          <div className="color-group">
            <label>Accent Color</label>
            <ColorPicker 
              label="Accent"
              value={bgColor1}
              onChange={setBgColor1}
            />
          </div>
        </div>
      </details>

      <details className="setting-section">
        <summary>Glow Effects</summary>
        <div className="setting-content">
          <div className="slider-group">
            <label>Enable Glows</label>
            <div className="setting-row">
              <input type="checkbox" checked={glow.enabled} onChange={(e)=>setGlow({ ...glow, enabled: e.target.checked })} />
            </div>
          </div>
          <div className="color-group">
            <label>Glow Color</label>
            <input type="color" value={glow.color} onChange={(e)=>setGlow({ ...glow, color: e.target.value })} />
          </div>
          <div className="slider-group">
            <label>Glow Intensity: {glow.intensity}px</label>
            <input type="range" min="0" max="48" step="1" value={glow.intensity} onChange={(e)=>setGlow({ ...glow, intensity: parseInt(e.target.value) })} />
          </div>
          <div className="slider-group">
            <label>Glow Spread: {glow.spread}</label>
            <input type="range" min="0" max="1" step="0.05" value={glow.spread} onChange={(e)=>setGlow({ ...glow, spread: parseFloat(e.target.value) })} />
          </div>
        </div>
      </details>

      <details className="setting-section">
        <summary>Surfaces</summary>
        <div className="setting-content">
          <div className="slider-group">
            <label>Panel Alpha: {surfaces.panelAlpha ?? 'auto'}</label>
            <input type="range" min="0" max="1" step="0.02" value={surfaces.panelAlpha ?? 0.08} onChange={(e)=>setSurfaces({ ...surfaces, panelAlpha: parseFloat(e.target.value) })} />
          </div>
          <div className="slider-group">
            <label>Card Alpha: {surfaces.cardAlpha ?? 'auto'}</label>
            <input type="range" min="0" max="1" step="0.02" value={surfaces.cardAlpha ?? 0.1} onChange={(e)=>setSurfaces({ ...surfaces, cardAlpha: parseFloat(e.target.value) })} />
          </div>
          <div className="slider-group">
            <label>Control Alpha: {surfaces.controlAlpha ?? 'auto'}</label>
            <input type="range" min="0" max="1" step="0.02" value={surfaces.controlAlpha ?? 0.12} onChange={(e)=>setSurfaces({ ...surfaces, controlAlpha: parseFloat(e.target.value) })} />
          </div>
        </div>
      </details>

      <details className="setting-section">
        <summary>Radius & Motion</summary>
        <div className="setting-content">
          <div className="slider-group">
            <label>Border Radius: {glass.radius}px</label>
            <input type="range" min="0" max="40" value={glass.radius} onChange={(e)=>setGlass({ ...glass, radius: parseInt(e.target.value) })} />
          </div>
          <div className="slider-group">
            <label>Motion Scale: {motionScale}</label>
            <input type="range" min="0" max="1.5" step="0.05" value={motionScale} onChange={(e)=>setMotionScale(parseFloat(e.target.value))} />
          </div>
        </div>
      </details>

      <details className="setting-section">
        <summary>Glass Morphism</summary>
        <div className="setting-content">
          <div className="slider-group">
            <label>Glass Blur: {glass.blur}px</label>
            <input type="range" min="0" max="30" value={glass.blur} onChange={(e)=>setGlass({ ...glass, blur: parseInt(e.target.value) })} />
          </div>
          <div className="slider-group">
            <label>Border Radius: {glass.radius}px</label>
            <input type="range" min="0" max="40" value={glass.radius} onChange={(e)=>setGlass({ ...glass, radius: parseInt(e.target.value) })} />
          </div>
          <div className="color-group">
            <label>Panel Background</label>
            <input type="color" value={rgbaToHex(glass.background)} onChange={(e)=>setGlass({ ...glass, background: hexToRgbaString(e.target.value, 0.08) })} />
          </div>
          <div className="color-group">
            <label>Border Color</label>
            <input type="color" value={rgbaToHex(extractColorFromBorder(glass.border))} onChange={(e)=>setGlass({ ...glass, border: `1px solid ${e.target.value}33` })} />
          </div>
        </div>
      </details>
    </div>
  )
}

export default ThemeSettings 

// Helpers to convert rgba strings to hex for the simple inputs
function rgbaToHex(rgba) {
  const m = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(rgba)
  if (!m) return '#ffffff'
  const [r,g,b] = m.slice(1,4).map(n=>parseInt(n))
  return '#' + [r,g,b].map(x=>x.toString(16).padStart(2,'0')).join('')
}
function extractColorFromBorder(border) {
  const m = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(border)
  if (!m) return 'rgba(255,255,255,0.18)'
  return `rgba(${m[1]}, ${m[2]}, ${m[3]}, 1)`
}
function hexToRgbaString(hex, alpha=0.08) {
  const h = hex.replace('#','')
  const r = parseInt(h.substring(0,2),16)
  const g = parseInt(h.substring(2,4),16)
  const b = parseInt(h.substring(4,6),16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}