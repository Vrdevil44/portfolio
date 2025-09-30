import React from 'react';
import { SettingSection, SettingRow, ColorInput, Slider } from '../shared/SettingSection';

const WavesEffectSettings = ({ settings, onSettingChange, expandedSections, onSectionToggle }) => {
  return (
    <>
      <SettingSection
        title="Wave Properties"
        isOpen={expandedSections.waves}
        onToggle={() => onSectionToggle('waves')}
      >
        <SettingRow label="Wave Height">
          <Slider
            value={settings.waveHeight}
            onChange={(value) => onSettingChange('waveHeight', value)}
            min={0}
            max={30}
            step={1}
          />
        </SettingRow>
        <SettingRow label="Wave Speed">
          <Slider
            value={settings.waveSpeed}
            onChange={(value) => onSettingChange('waveSpeed', value)}
            min={0}
            max={2}
            step={0.1}
          />
        </SettingRow>
        <SettingRow label="Zoom">
          <Slider
            value={settings.zoom}
            onChange={(value) => onSettingChange('zoom', value)}
            min={0.5}
            max={2}
            step={0.1}
          />
        </SettingRow>
      </SettingSection>

      <SettingSection
        title="Material"
        isOpen={expandedSections.material}
        onToggle={() => onSectionToggle('material')}
      >
        <SettingRow label="Color">
          <ColorInput
            value={settings.color}
            onChange={(value) => onSettingChange('color', value)}
          />
        </SettingRow>
        <SettingRow label="Shininess">
          <Slider
            value={settings.shininess}
            onChange={(value) => onSettingChange('shininess', value)}
            min={0}
            max={100}
            step={1}
          />
        </SettingRow>
      </SettingSection>
    </>
  );
};

export default WavesEffectSettings; 