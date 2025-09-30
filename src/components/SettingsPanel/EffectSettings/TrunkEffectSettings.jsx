import React from 'react';
import { SettingSection, SettingRow, ColorInput, Slider } from '../shared/SettingSection';

const TrunkEffectSettings = ({ settings, onSettingChange, expandedSections, onSectionToggle }) => {
  return (
    <>
      <SettingSection
        title="Colors"
        isOpen={expandedSections.colors}
        onToggle={() => onSectionToggle('colors')}
      >
        <SettingRow label="Trunk Color">
          <ColorInput
            value={settings.color}
            onChange={(value) => onSettingChange('color', value)}
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
        <SettingRow label="Spacing">
          <Slider
            value={settings.spacing}
            onChange={(value) => onSettingChange('spacing', value)}
            min={0}
            max={10}
            step={0.5}
          />
        </SettingRow>
        <SettingRow label="Chaos">
          <Slider
            value={settings.chaos}
            onChange={(value) => onSettingChange('chaos', value)}
            min={0}
            max={5}
            step={0.1}
          />
        </SettingRow>
      </SettingSection>
    </>
  );
};

export default TrunkEffectSettings; 