import React from 'react';
import { SettingSection, SettingRow, ColorInput, Slider } from '../shared/SettingSection';
import './RingsEffectSettings.css';

const RingsEffectSettings = ({ settings, onSettingChange, expandedSections, onSectionToggle }) => {
  const generateRandomColor = () => {
    return Math.floor(Math.random() * 16777215); // Generates a random hex color
  };

  const generateRandomSettings = () => {
    const newSettings = {
      color: generateRandomColor(),
      backgroundColor: generateRandomColor(),
      backgroundAlpha: Math.random(),
      scale: 0.5 + Math.random() * 1.5 // Random scale between 0.5 and 2
    };

    // Apply each new setting individually
    Object.entries(newSettings).forEach(([key, value]) => {
      onSettingChange(key, value);
    });
  };

  return (
    <>
      <SettingSection
        title="Randomize"
        isOpen={expandedSections.randomize}
        onToggle={() => onSectionToggle('randomize')}
      >
        <SettingRow>
          <button
            className="setting-button"
            onClick={generateRandomSettings}
          >
            Generate Random Pattern
          </button>
        </SettingRow>
      </SettingSection>

      <SettingSection
        title="Colors"
        isOpen={expandedSections.colors}
        onToggle={() => onSectionToggle('colors')}
      >
        <SettingRow label="Ring Color">
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
        <SettingRow label="Background Opacity">
          <Slider
            value={settings.backgroundAlpha}
            onChange={(value) => onSettingChange('backgroundAlpha', value)}
            min={0}
            max={1}
            step={0.1}
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

export default RingsEffectSettings; 