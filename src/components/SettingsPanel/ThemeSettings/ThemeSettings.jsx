import { useState } from 'react';
import { useTheme } from './ThemeContext';
import FontSettings from '../FontSettings/FontSettings';
import './ThemeSettings.css';

const ThemeSettings = () => {
  const { theme, updateTheme } = useTheme();
  const [expandedSections, setExpandedSections] = useState({
    backgroundOverlay: false,
    fontSettings: false,
    colorPalette: false,
    glowEffects: false,
    glassMorphism: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="theme-settings">
      <details className="setting-section" open={expandedSections.colorPalette}>
        <summary onClick={(e) => {
          e.preventDefault();
          toggleSection('colorPalette');
        }}>
          Brand Palette (60/30/10)
        </summary>
        <div className="setting-content">
          <div className="color-group">
            <label>Accent (60%)</label>
            <input
              type="color"
              value={theme.primaryColor}
              onChange={(e) => updateTheme({ primaryColor: e.target.value })}
            />
          </div>
          <div className="color-group">
            <label>Secondary (30%)</label>
            <input
              type="color"
              value={theme.secondaryColor}
              onChange={(e) => updateTheme({ secondaryColor: e.target.value })}
            />
          </div>
          <div className="color-group">
            <label>Tertiary (10%)</label>
            <input
              type="color"
              value={theme.accentColor}
              onChange={(e) => updateTheme({ accentColor: e.target.value })}
            />
          </div>
        </div>
      </details>

      <details className="setting-section" open={expandedSections.backgroundOverlay}>
        <summary onClick={(e) => {
          e.preventDefault();
          toggleSection('backgroundOverlay');
        }}>
          Background Overlay
        </summary>
        <div className="setting-content">
          <div className="overlay-controls">
            <label className="switch">
              <input
                type="checkbox"
                checked={theme.showOverlay}
                onChange={(e) => updateTheme({ showOverlay: e.target.checked })}
              />
              <span className="slider"></span>
            </label>
            <span>Show Overlay</span>
          </div>
          {theme.showOverlay && (
            <>
              <div className="color-group">
                <label>Background Color 1</label>
                <input
                  type="color"
                  value={theme.backgroundColor1}
                  onChange={(e) => updateTheme({ backgroundColor1: e.target.value })}
                />
              </div>
              <div className="color-group">
                <label>Background Color 2</label>
                <input
                  type="color"
                  value={theme.backgroundColor2}
                  onChange={(e) => updateTheme({ backgroundColor2: e.target.value })}
                />
              </div>
              <div className="slider-group">
                <label>Blur Intensity: {theme.blurIntensity}px</label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={theme.blurIntensity}
                  onChange={(e) => updateTheme({ blurIntensity: parseInt(e.target.value) })}
                />
              </div>
              <div className="slider-group">
                <label>Overlay Opacity: {theme.overlayOpacity}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={theme.overlayOpacity}
                  onChange={(e) => updateTheme({ overlayOpacity: parseInt(e.target.value) })}
                />
              </div>
            </>
          )}
        </div>
      </details>

      <details className="setting-section" open={expandedSections.fontSettings}>
        <summary onClick={(e) => {
          e.preventDefault();
          toggleSection('fontSettings');
        }}>
          Font Settings
        </summary>
        <div className="setting-content">
          <FontSettings />
        </div>
      </details>

      

      <details className="setting-section" open={expandedSections.glowEffects}>
        <summary onClick={(e) => {
          e.preventDefault();
          toggleSection('glowEffects');
        }}>
          Glow Effects
        </summary>
        <div className="setting-content">
          {/* Glow effects settings will be implemented later */}
        </div>
      </details>

      <details className="setting-section" open={expandedSections.glassMorphism}>
        <summary onClick={(e) => {
          e.preventDefault();
          toggleSection('glassMorphism');
        }}>
          Glass Morphism
        </summary>
        <div className="setting-content">
          {/* Glass morphism settings will be implemented later */}
        </div>
      </details>
    </div>
  );
};

export default ThemeSettings; 