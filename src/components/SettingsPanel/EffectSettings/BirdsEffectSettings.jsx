import React from 'react';
import { SettingSection, SettingRow } from '../shared/SettingSection';

const BirdsEffectSettings = ({ settings, onSettingChange, expandedSections, onSectionToggle }) => {
  return (
    <>
      <SettingSection
        title="Size & Quantity"
        isOpen={expandedSections.size}
        onToggle={() => onSectionToggle('size')}
      >
        <SettingRow label="Bird Size">
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            value={settings.birdSize}
            onChange={(e) => onSettingChange('birdSize', parseFloat(e.target.value))}
          />
          <span>{settings.birdSize}</span>
        </SettingRow>
        <SettingRow label="Wing Span">
          <input
            type="range"
            min="10"
            max="40"
            step="1"
            value={settings.wingSpan}
            onChange={(e) => onSettingChange('wingSpan', parseInt(e.target.value))}
          />
          <span>{settings.wingSpan}</span>
        </SettingRow>
        <SettingRow label="Quantity">
          <input
            type="range"
            min="1"
            max="8"
            step="1"
            value={settings.quantity}
            onChange={(e) => onSettingChange('quantity', parseInt(e.target.value))}
          />
          <span>{settings.quantity}</span>
        </SettingRow>
      </SettingSection>

      <SettingSection
        title="Movement & Behavior"
        isOpen={expandedSections.dynamics}
        onToggle={() => onSectionToggle('dynamics')}
      >
        <SettingRow label="Speed Limit">
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={settings.speedLimit}
            onChange={(e) => onSettingChange('speedLimit', parseInt(e.target.value))}
          />
          <span>{settings.speedLimit}</span>
        </SettingRow>
        <SettingRow label="Separation">
          <input
            type="range"
            min="10"
            max="100"
            step="5"
            value={settings.separation}
            onChange={(e) => onSettingChange('separation', parseInt(e.target.value))}
          />
          <span>{settings.separation}</span>
        </SettingRow>
        <SettingRow label="Alignment">
          <input
            type="range"
            min="10"
            max="100"
            step="5"
            value={settings.alignment}
            onChange={(e) => onSettingChange('alignment', parseInt(e.target.value))}
          />
          <span>{settings.alignment}</span>
        </SettingRow>
        <SettingRow label="Cohesion">
          <input
            type="range"
            min="10"
            max="100"
            step="5"
            value={settings.cohesion}
            onChange={(e) => onSettingChange('cohesion', parseInt(e.target.value))}
          />
          <span>{settings.cohesion}</span>
        </SettingRow>
      </SettingSection>
    </>
  );
};

export default BirdsEffectSettings; 