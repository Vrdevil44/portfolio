import React from 'react';
import { SettingSection, SettingRow, ColorInput, Slider } from '../shared/SettingSection';

const CellsEffectSettings = ({ settings, onSettingChange, expandedSections, onSectionToggle }) => {
  return (
    <>
      <SettingSection
        title="Colors"
        isOpen={expandedSections.colors}
        onToggle={() => onSectionToggle('colors')}
      >
        <SettingRow label="Primary Color">
          <ColorInput
            value={settings.color1}
            onChange={(value) => onSettingChange('color1', value)}
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
        title="Animation"
        isOpen={expandedSections.animation}
        onToggle={() => onSectionToggle('animation')}
      >
        <SettingRow label="Cell Size">
          <Slider
            value={settings.size}
            onChange={(value) => onSettingChange('size', value)}
            min={0.5}
            max={3.0}
            step={0.1}
          />
        </SettingRow>
        <SettingRow label="Animation Speed">
          <Slider
            value={settings.speed}
            onChange={(value) => onSettingChange('speed', value)}
            min={0.1}
            max={3.0}
            step={0.1}
          />
        </SettingRow>
      </SettingSection>
    </>
  );
};

export default CellsEffectSettings; 