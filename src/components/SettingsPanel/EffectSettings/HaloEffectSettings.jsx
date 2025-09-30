import React from 'react';
import { SettingSection, SettingRow, ColorInput, Slider } from '../shared/SettingSection';

const HaloEffectSettings = ({ settings, onSettingChange, expandedSections, onSectionToggle }) => {
  return (
    <>
      <SettingSection
        title="Colors"
        isOpen={expandedSections.colors}
        onToggle={() => onSectionToggle('colors')}
      >
        <SettingRow label="Base Color">
          <ColorInput
            value={settings.baseColor}
            onChange={(value) => onSettingChange('baseColor', value)}
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
        title="Size & Amplitude"
        isOpen={expandedSections.size}
        onToggle={() => onSectionToggle('size')}
      >
        <SettingRow label="Size">
          <Slider
            value={settings.size}
            onChange={(value) => onSettingChange('size', value)}
            min={0.5}
            max={2}
            step={0.1}
          />
        </SettingRow>
        <SettingRow label="Amplitude Factor">
          <Slider
            value={settings.amplitudeFactor}
            onChange={(value) => onSettingChange('amplitudeFactor', value)}
            min={0}
            max={2}
            step={0.1}
          />
        </SettingRow>
      </SettingSection>

      <SettingSection
        title="Position"
        isOpen={expandedSections.position}
        onToggle={() => onSectionToggle('position')}
      >
        <SettingRow label="X Offset">
          <Slider
            value={settings.xOffset}
            onChange={(value) => onSettingChange('xOffset', value)}
            min={-1}
            max={1}
            step={0.1}
          />
        </SettingRow>
        <SettingRow label="Y Offset">
          <Slider
            value={settings.yOffset}
            onChange={(value) => onSettingChange('yOffset', value)}
            min={-1}
            max={1}
            step={0.1}
          />
        </SettingRow>
      </SettingSection>
    </>
  );
};

export default HaloEffectSettings; 