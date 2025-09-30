import { createContext, useContext, useState } from 'react';

// Predefined font options
export const DISPLAY_FONTS = {
  'Poppins': "'Poppins', sans-serif",
  'Montserrat': "'Montserrat', sans-serif",
  'Raleway': "'Raleway', sans-serif",
  'Inter': "'Inter', sans-serif",
  'Playfair Display': "'Playfair Display', serif",
};

export const HEADING_FONTS = {
  'Roboto': "'Roboto', sans-serif",
  'Open Sans': "'Open Sans', sans-serif",
  'Lato': "'Lato', sans-serif",
  'Inter': "'Inter', sans-serif",
  'Ubuntu': "'Ubuntu', sans-serif"
};

export const BODY_FONTS = {
  'Inter': "'Inter', sans-serif",
  'Open Sans': "'Open Sans', sans-serif",
  'Roboto': "'Roboto', sans-serif",
  'Source Code Pro': "'Source Code Pro', monospace",
  'Lato': "'Lato', sans-serif",
};

export const FONT_WEIGHTS = {
  'Extra Light': 200,
  'Light': 300,
  'Regular': 400,
  'Medium': 500,
  'Semi Bold': 600,
  'Bold': 700,
  'Extra Bold': 800
};

const FontContext = createContext();

export const FontProvider = ({ children }) => {
  const [fontSettings, setFontSettings] = useState({
    // Themed/Accent Font (for attention-grabbing text)
    accentFont: {
      family: 'Poppins',
      weight: 600,
      color: '#ffffff',
      gradient: {
        enabled: true,
        color1: '#00ffee',
        color2: '#ff00ff',
      },
      glow: {
        enabled: true,
        color: '#00ffee',
        intensity: 10
      },
      letterSpacing: 1
    },
    
    // Secondary Font (for headings and key points)
    headingFont: {
      family: 'Inter',
      weight: 700,
      color: '#ffffff',
      letterSpacing: 0
    },
    
    // Body Font (for regular text)
    bodyFont: {
      family: 'Inter',
      weight: 300,
      color: 'rgba(255, 255, 255, 0.9)',
      letterSpacing: 0,
      lineHeight: 1.6
    }
  });

  const updateFontSettings = (newSettings) => {
    setFontSettings(prev => ({
      ...prev,
      ...newSettings
    }));

    // Update CSS variables for accent font
    if (newSettings.accentFont) {
      const accent = newSettings.accentFont;
      document.documentElement.style.setProperty('--accent-font', DISPLAY_FONTS[accent.family] || DISPLAY_FONTS[fontSettings.accentFont.family]);
      document.documentElement.style.setProperty('--accent-font-weight', accent.weight || fontSettings.accentFont.weight);
      document.documentElement.style.setProperty('--accent-font-color', accent.color || fontSettings.accentFont.color);
      document.documentElement.style.setProperty('--accent-letter-spacing', `${accent.letterSpacing || fontSettings.accentFont.letterSpacing}px`);
      
      if (accent.gradient?.enabled) {
        document.documentElement.style.setProperty(
          '--accent-font-gradient',
          `linear-gradient(135deg, ${accent.gradient.color1 || fontSettings.accentFont.gradient.color1}, ${accent.gradient.color2 || fontSettings.accentFont.gradient.color2})`
        );
      }
      
      if (accent.glow?.enabled) {
        document.documentElement.style.setProperty('--accent-glow-color', accent.glow.color || fontSettings.accentFont.glow.color);
        document.documentElement.style.setProperty('--accent-glow-intensity', `${accent.glow.intensity || fontSettings.accentFont.glow.intensity}px`);
      }
    }

    // Update CSS variables for heading font
    if (newSettings.headingFont) {
      const heading = newSettings.headingFont;
      document.documentElement.style.setProperty('--heading-font', HEADING_FONTS[heading.family] || HEADING_FONTS[fontSettings.headingFont.family]);
      document.documentElement.style.setProperty('--heading-font-weight', heading.weight || fontSettings.headingFont.weight);
      document.documentElement.style.setProperty('--heading-font-color', heading.color || fontSettings.headingFont.color);
      document.documentElement.style.setProperty('--heading-letter-spacing', `${heading.letterSpacing || fontSettings.headingFont.letterSpacing}px`);
    }

    // Update CSS variables for body font
    if (newSettings.bodyFont) {
      const body = newSettings.bodyFont;
      document.documentElement.style.setProperty('--body-font', BODY_FONTS[body.family] || BODY_FONTS[fontSettings.bodyFont.family]);
      document.documentElement.style.setProperty('--body-font-weight', body.weight || fontSettings.bodyFont.weight);
      document.documentElement.style.setProperty('--body-font-color', body.color || fontSettings.bodyFont.color);
      document.documentElement.style.setProperty('--body-letter-spacing', `${body.letterSpacing || fontSettings.bodyFont.letterSpacing}px`);
      document.documentElement.style.setProperty('--body-line-height', body.lineHeight || fontSettings.bodyFont.lineHeight);
    }
  };

  return (
    <FontContext.Provider value={{ fontSettings, updateFontSettings }}>
      {children}
    </FontContext.Provider>
  );
};

export const useFontSettings = () => {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error('useFontSettings must be used within a FontProvider');
  }
  return context;
}; 