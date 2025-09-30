// Lightweight theme engine to compute derived CSS variables and apply them to :root

function hexToRgb(hex) {
  const sanitized = hex.replace('#', '')
  const r = parseInt(sanitized.substring(0, 2), 16)
  const g = parseInt(sanitized.substring(2, 4), 16)
  const b = parseInt(sanitized.substring(4, 6), 16)
  return { r, g, b }
}

function rgbaString({ r, g, b }, alpha) {
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function clamp(val, min, max) {
  return Math.min(max, Math.max(min, val))
}

export function applyThemeTokens(options) {
  if (typeof document === 'undefined') return

  const root = document.documentElement
  const {
    primaryHex = '#6a00ff',
    secondaryHex = '#00e0ff',
    tertiaryHex = '#ffd166',
    neutralHex = '#0b0f1a',
    overlayOpacity = 0.6,
    blurPx = 16,
    glassBackground = 'rgba(255,255,255,0.08)',
    glassBorder = '1px solid rgba(255,255,255,0.18)',
    radiusPx = 20,
    glow = { enabled: true, color: '#a970ff', intensity: 24, spread: 0.3 },
    overlayVisible = true,
    panelAlpha = null,
    cardAlpha = null,
    controlAlpha = null,
    motionScale = 1,
  } = options || {}

  const primaryRGB = hexToRgb(primaryHex)
  const secondaryRGB = hexToRgb(secondaryHex)
  const tertiaryRGB = hexToRgb(tertiaryHex)
  const op = clamp(overlayOpacity, 0, 1)

  // Derived overlay colors
  const overlay1 = rgbaString(primaryRGB, op)
  const overlay2 = rgbaString(secondaryRGB, op)
  const overlay = `linear-gradient(var(--overlay-angle), ${overlay1}, ${overlay2})`

  // Focus ring based on secondary
  const focusRing = `0 0 0 3px ${rgbaString(secondaryRGB, 0.35)}`

  // Apply
  root.style.setProperty('--color-primary', primaryHex)
  root.style.setProperty('--color-secondary', secondaryHex)
  // Brand palette
  root.style.setProperty('--brand-accent', primaryHex)
  root.style.setProperty('--brand-secondary', secondaryHex)
  root.style.setProperty('--brand-tertiary', tertiaryHex)
  root.style.setProperty('--brand-neutral', neutralHex)
  // Role mapping (semantic)
  root.style.setProperty('--role-primary', `var(--brand-accent)`)
  root.style.setProperty('--role-secondary', `var(--brand-secondary)`)
  root.style.setProperty('--role-emphasis', `var(--brand-tertiary)`) 
  root.style.setProperty('--role-bg', `var(--brand-neutral)`)
  root.style.setProperty('--role-focus', rgbaString(secondaryRGB, 0.35))
  // Tints/strengths
  root.style.setProperty('--accent-strong', rgbaString(primaryRGB, 0.85))
  root.style.setProperty('--accent', rgbaString(primaryRGB, 0.6))
  root.style.setProperty('--accent-soft', rgbaString(primaryRGB, 0.15))
  root.style.setProperty('--secondary-strong', rgbaString(secondaryRGB, 0.85))
  root.style.setProperty('--secondary', rgbaString(secondaryRGB, 0.6))
  root.style.setProperty('--secondary-soft', rgbaString(secondaryRGB, 0.15))
  root.style.setProperty('--tertiary-strong', rgbaString(tertiaryRGB, 0.85))
  root.style.setProperty('--tertiary', rgbaString(tertiaryRGB, 0.6))
  root.style.setProperty('--tertiary-soft', rgbaString(tertiaryRGB, 0.15))
  root.style.setProperty('--overlay-rgba-1', overlay1)
  root.style.setProperty('--overlay-rgba-2', overlay2)
  root.style.setProperty('--overlay', overlay)
  root.style.setProperty('--blur', `${Math.round(blurPx)}px`)
  root.style.setProperty('--radius', `${Math.round(radiusPx)}px`)
  root.style.setProperty('--glass-bg', glassBackground)
  root.style.setProperty('--glass-border', glassBorder)
  root.style.setProperty('--focus-ring', focusRing)
  root.style.setProperty('--overlay-visible', overlayVisible ? '1' : '0')
  root.style.setProperty('--motion-scale', String(motionScale))

  // Glow tokens
  root.style.setProperty('--glow-color', glow?.color || '#a970ff')
  root.style.setProperty('--glow-intensity', `${glow?.intensity ?? 24}px`)
  root.style.setProperty('--glow-spread', `${glow?.spread ?? 0.3}`)

  // Parent surfaces (derive subtle differences)
  // Panels slightly more translucent than cards; controls slightly more solid
  try {
    const baseRgb = hexToRgb('#ffffff')
    const getWithAlpha = (alpha) => rgbaString(baseRgb, clamp(alpha, 0, 1))
    const baseAlpha = parseFloat(/rgba\([^,]+,[^,]+,[^,]+,\s*([0-9.]+)\)/.exec(glassBackground || '')?.[1] || '0.08')

    const panelBg = panelAlpha != null ? getWithAlpha(panelAlpha) : (glassBackground || getWithAlpha(baseAlpha))
    const cardBg = cardAlpha != null ? getWithAlpha(cardAlpha) : panelBg.replace(/rgba\(([^)]+),\s*([0-9.]+)\)/, (m, cols, a) => `rgba(${cols}, ${clamp(parseFloat(a || '0.08') + 0.02, 0, 1)})`)
    const controlBg = controlAlpha != null ? getWithAlpha(controlAlpha) : panelBg.replace(/rgba\(([^)]+),\s*([0-9.]+)\)/, (m, cols, a) => `rgba(${cols}, ${clamp(parseFloat(a || '0.08') + 0.04, 0, 1)})`)
    root.style.setProperty('--surface-panel-bg', panelBg)
    root.style.setProperty('--surface-card-bg', cardBg)
    root.style.setProperty('--surface-control-bg', controlBg)
  } catch {}
}


