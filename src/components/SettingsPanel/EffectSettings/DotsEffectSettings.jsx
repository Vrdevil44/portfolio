import React from 'react';
import { SettingSection, SettingRow, ColorInput, Slider } from '../shared/SettingSection';

const DotsEffectSettings = ({ settings, onSettingChange, expandedSections, onSectionToggle }) => {
  return (
    <>
      <SettingSection
        title="Colors"
        isOpen={expandedSections.colors}
        onToggle={() => onSectionToggle('colors')}
      >
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
        <SettingRow label="Background Color">
          <ColorInput
            value={settings.backgroundColor}
            onChange={(value) => onSettingChange('backgroundColor', value)}
          />
        </SettingRow>
      </SettingSection>

      <SettingSection
        title="Pattern"
        isOpen={expandedSections.pattern}
        onToggle={() => onSectionToggle('pattern')}
      >
        <SettingRow label="Size">
          <Slider
            value={settings.size}
            onChange={(value) => onSettingChange('size', value)}
            min={0.5}
            max={5}
            step={0.1}
          />
        </SettingRow>
        <SettingRow label="Spacing">
          <Slider
            value={settings.spacing}
            onChange={(value) => onSettingChange('spacing', value)}
            min={10}
            max={60}
            step={1}
          />
        </SettingRow>
        <SettingRow label="Show Lines">
          <input
            type="checkbox"
            checked={settings.showLines}
            onChange={(e) => onSettingChange('showLines', e.target.checked)}
          />
        </SettingRow>
      </SettingSection>
    </>
  );
};

export default DotsEffectSettings; 