import React from 'react';
import { SettingSection, SettingRow, ColorInput, Slider } from '../shared/SettingSection';

const TopologyEffectSettings = ({ settings, onSettingChange, expandedSections, onSectionToggle }) => {
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
        <SettingRow label="Background Color">
          <ColorInput
            value={settings.backgroundColor}
            onChange={(value) => onSettingChange('backgroundColor', value)}
          />
        </SettingRow>
      </SettingSection>

      <SettingSection
        title="Scale"
        isOpen={expandedSections.scale}
        onToggle={() => onSectionToggle('scale')}
      >
        <SettingRow label="Scale">
          <Slider
            value={settings.scale}
            onChange={(value) => onSettingChange('scale', value)}
            min={0.5}
            max={2}
            step={0.1}
          />
        </SettingRow>
      </SettingSection>
    </>
  );
};

export default TopologyEffectSettings; 