import React from 'react';
import { SettingSection, SettingRow, ColorInput } from '../shared/SettingSection';

const FogEffectSettings = ({ settings, onSettingChange, expandedSections, onSectionToggle }) => {
  return (
    <>
      <SettingSection
        title="Colors"
        isOpen={expandedSections.colors}
        onToggle={() => onSectionToggle('colors')}
      >
        <SettingRow label="Highlight Color">
          <ColorInput
            value={settings.highlightColor}
            onChange={(value) => onSettingChange('highlightColor', value)}
          />
        </SettingRow>
        <SettingRow label="Midtone Color">
          <ColorInput
            value={settings.midtoneColor}
            onChange={(value) => onSettingChange('midtoneColor', value)}
          />
        </SettingRow>
        <SettingRow label="Lowlight Color">
          <ColorInput
            value={settings.lowlightColor}
            onChange={(value) => onSettingChange('lowlightColor', value)}
          />
        </SettingRow>
        <SettingRow label="Base Color">
          <ColorInput
            value={settings.baseColor}
            onChange={(value) => onSettingChange('baseColor', value)}
          />
        </SettingRow>
      </SettingSection>

      <SettingSection
        title="Effects"
        isOpen={expandedSections.effects}
        onToggle={() => onSectionToggle('effects')}
      >
        <SettingRow label="Blur Factor">
          <div className="slider-container">
            <input
              type="range"
              value={settings.blurFactor}
              onChange={(e) => onSettingChange('blurFactor', parseFloat(e.target.value))}
              min="0.1"
              max="1.0"
              step="0.1"
              className="slider-input"
            />
            <span className="slider-value">{settings.blurFactor.toFixed(1)}</span>
          </div>
        </SettingRow>
        <SettingRow label="Zoom">
          <div className="slider-container">
            <input
              type="range"
              value={settings.zoom}
              onChange={(e) => onSettingChange('zoom', parseFloat(e.target.value))}
              min="0.1"
              max="3.0"
              step="0.1"
              className="slider-input"
            />
            <span className="slider-value">{settings.zoom.toFixed(1)}</span>
          </div>
        </SettingRow>
        <SettingRow label="Speed">
          <div className="slider-container">
            <input
              type="range"
              value={settings.speed}
              onChange={(e) => onSettingChange('speed', parseFloat(e.target.value))}
              min="0.1"
              max="3.0"
              step="0.1"
              className="slider-input"
            />
            <span className="slider-value">{settings.speed.toFixed(1)}</span>
          </div>
        </SettingRow>
      </SettingSection>
    </>
  );
};

export default FogEffectSettings; 