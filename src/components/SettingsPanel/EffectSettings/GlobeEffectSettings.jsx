import React from 'react';
import { SettingSection, SettingRow, ColorInput, Slider } from '../shared/SettingSection';

const GlobeEffectSettings = ({ settings, onSettingChange, expandedSections, onSectionToggle }) => {
  return (
    <>
      <SettingSection
        title="Colors"
        isOpen={expandedSections.colors}
        onToggle={() => onSectionToggle('colors')}
      >
        <SettingRow label="Background Color">
          <ColorInput
            value={settings.backgroundColor}
            onChange={(value) => onSettingChange('backgroundColor', value)}
          />
        </SettingRow>
        <SettingRow label="Primary Color">
          <ColorInput
            value={settings.color}
            onChange={(value) => onSettingChange('color', value)}
          />
        </SettingRow>
        <SettingRow label="Secondary Color">
          <ColorInput
            value={settings.color2}
            onChange={(value) => onSettingChange('color2', value)}
          />
        </SettingRow>
      </SettingSection>

      <SettingSection
        title="Size & Scale"
        isOpen={expandedSections.size}
        onToggle={() => onSectionToggle('size')}
      >
        <SettingRow label="Globe Size">
          <Slider
            value={settings.size}
            onChange={(value) => onSettingChange('size', value)}
            min={0.5}
            max={2}
            step={0.1}
          />
        </SettingRow>
      </SettingSection>
    </>
  );
};

export default GlobeEffectSettings; 