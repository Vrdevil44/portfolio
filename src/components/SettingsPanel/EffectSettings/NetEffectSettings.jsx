import React from 'react';
import { SettingSection, SettingRow, ColorInput, Slider, Toggle } from '../shared/SettingSection';

const NetEffectSettings = ({ settings, onSettingChange, expandedSections, onSectionToggle }) => {
  return (
    <>
      <SettingSection
        title="Colors"
        isOpen={expandedSections.colors}
        onToggle={() => onSectionToggle('colors')}
      >
        <SettingRow label="Net Color">
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
        title="Network Properties"
        isOpen={expandedSections.network}
        onToggle={() => onSectionToggle('network')}
      >
        <SettingRow label="Points">
          <Slider
            value={settings.points}
            onChange={(value) => onSettingChange('points', value)}
            min={5}
            max={20}
            step={1}
          />
        </SettingRow>
        <SettingRow label="Max Distance">
          <Slider
            value={settings.maxDistance}
            onChange={(value) => onSettingChange('maxDistance', value)}
            min={10}
            max={40}
            step={1}
          />
        </SettingRow>
        <SettingRow label="Spacing">
          <Slider
            value={settings.spacing}
            onChange={(value) => onSettingChange('spacing', value)}
            min={5}
            max={30}
            step={1}
          />
        </SettingRow>
        <SettingRow label="Show Dots">
          <Toggle
            value={settings.showDots}
            onChange={(value) => onSettingChange('showDots', value)}
          />
        </SettingRow>
      </SettingSection>
    </>
  );
};

export default NetEffectSettings; 