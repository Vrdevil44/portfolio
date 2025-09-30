import React, { useState, useEffect } from 'react';
import BirdsEffectSettings from './BirdsEffectSettings';
import FogEffectSettings from './FogEffectSettings';
import WavesEffectSettings from './WavesEffectSettings';
import GlobeEffectSettings from './GlobeEffectSettings';
import NetEffectSettings from './NetEffectSettings';
import CellsEffectSettings from './CellsEffectSettings';
import TrunkEffectSettings from './TrunkEffectSettings';
import TopologyEffectSettings from './TopologyEffectSettings';
import DotsEffectSettings from './DotsEffectSettings';
import RingsEffectSettings from './RingsEffectSettings';
import HaloEffectSettings from './HaloEffectSettings';
import { 
  defaultBirdsPreset, 
  defaultFogPreset, 
  defaultWavesPreset, 
  defaultGlobePreset,
  defaultNetPreset,
  defaultCellsPreset,
  defaultTrunkPreset,
  defaultTopologyPreset,
  defaultDotsPreset,
  defaultRingsPreset,
  defaultHaloPreset,
  VANTA_EFFECTS 
} from './VantaPresets';
import { SettingSection, SettingRow } from '../shared/SettingSection';
import './EffectSettings.css';

const COLOR_MODES = [
  { value: 'lerp', label: 'Linear Interpolation' },
  { value: 'variance', label: 'Variance' },
  { value: 'lerpGradient', label: 'Linear Gradient' },
  { value: 'varianceGradient', label: 'Variance Gradient' }
];

const EFFECT_OPTIONS = [
  { id: VANTA_EFFECTS.BIRDS, label: 'Birds' },
  { id: VANTA_EFFECTS.FOG, label: 'Fog' },
  { id: VANTA_EFFECTS.WAVES, label: 'Waves' },
  { id: VANTA_EFFECTS.GLOBE, label: 'Globe' },
  { id: VANTA_EFFECTS.NET, label: 'Net' },
  { id: VANTA_EFFECTS.CELLS, label: 'Cells' },
  { id: VANTA_EFFECTS.TRUNK, label: 'Trunk' },
  { id: VANTA_EFFECTS.TOPOLOGY, label: 'Topology' },
  { id: VANTA_EFFECTS.DOTS, label: 'Dots' },
  { id: VANTA_EFFECTS.RINGS, label: 'Rings' },
  { id: VANTA_EFFECTS.HALO, label: 'Halo' }
];

const EffectSettings = ({ onEffectSettingsChange, effectSettings = defaultBirdsPreset.settings, onEffectTypeChange, effectType }) => {
  const [selectedEffect, setSelectedEffect] = useState(effectType || VANTA_EFFECTS.BIRDS);
  const [expandedSections, setExpandedSections] = useState({
    effectType: false,
    colors: false,
    size: false,
    dynamics: false,
    effects: false,
    waves: false,
    material: false,
    network: false,
    animation: false,
    pattern: false
  });

  // Keep selectedEffect in sync with effectType prop
  useEffect(() => {
    if (effectType && effectType !== selectedEffect) {
      setSelectedEffect(effectType);
    }
  }, [effectType]);

  const handleSettingChange = (key, value) => {
    onEffectSettingsChange({
      ...effectSettings,
      [key]: value
    });
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleEffectChange = (effectId) => {
    if (selectedEffect !== effectId) {
      setSelectedEffect(effectId);
      
      if (effectId === VANTA_EFFECTS.BIRDS) {
        onEffectSettingsChange({...defaultBirdsPreset.settings});
        onEffectTypeChange(VANTA_EFFECTS.BIRDS);
      } else if (effectId === VANTA_EFFECTS.FOG) {
        onEffectSettingsChange({...defaultFogPreset.settings});
        onEffectTypeChange(VANTA_EFFECTS.FOG);
      } else if (effectId === VANTA_EFFECTS.WAVES) {
        onEffectSettingsChange({...defaultWavesPreset.settings});
        onEffectTypeChange(VANTA_EFFECTS.WAVES);
      } else if (effectId === VANTA_EFFECTS.GLOBE) {
        onEffectSettingsChange({...defaultGlobePreset.settings});
        onEffectTypeChange(VANTA_EFFECTS.GLOBE);
      } else if (effectId === VANTA_EFFECTS.NET) {
        onEffectSettingsChange({...defaultNetPreset.settings});
        onEffectTypeChange(VANTA_EFFECTS.NET);
      } else if (effectId === VANTA_EFFECTS.CELLS) {
        onEffectSettingsChange({...defaultCellsPreset.settings});
        onEffectTypeChange(VANTA_EFFECTS.CELLS);
      } else if (effectId === VANTA_EFFECTS.TRUNK) {
        onEffectSettingsChange({...defaultTrunkPreset.settings});
        onEffectTypeChange(VANTA_EFFECTS.TRUNK);
      } else if (effectId === VANTA_EFFECTS.TOPOLOGY) {
        onEffectSettingsChange({...defaultTopologyPreset.settings});
        onEffectTypeChange(VANTA_EFFECTS.TOPOLOGY);
      } else if (effectId === VANTA_EFFECTS.DOTS) {
        onEffectSettingsChange({...defaultDotsPreset.settings});
        onEffectTypeChange(VANTA_EFFECTS.DOTS);
      } else if (effectId === VANTA_EFFECTS.RINGS) {
        onEffectSettingsChange({...defaultRingsPreset.settings});
        onEffectTypeChange(VANTA_EFFECTS.RINGS);
      } else if (effectId === VANTA_EFFECTS.HALO) {
        onEffectSettingsChange({...defaultHaloPreset.settings});
        onEffectTypeChange(VANTA_EFFECTS.HALO);
      }
    }
  };

  const currentEffect = EFFECT_OPTIONS.find(effect => effect.id === selectedEffect);

  const handleEffectTypeChange = (event) => {
    onEffectTypeChange(event.target.value);
  };

  const quickPresets = [
    { name: 'Neon Birds', effect: VANTA_EFFECTS.BIRDS, settings: { ...defaultBirdsPreset.settings, color1: 0x8a2be2, color2: 0x00e0ff, colorMode: 'varianceGradient' } },
    { name: 'Mystic Fog', effect: VANTA_EFFECTS.FOG, settings: { ...defaultFogPreset.settings, highlightColor: 0xaa66ff, midtoneColor: 0x3300ff, lowlightColor: 0x110033, baseColor: 0x000000, blurFactor: 0.7 } },
    { name: 'Ocean Waves', effect: VANTA_EFFECTS.WAVES, settings: { ...defaultWavesPreset.settings, color: 0x00aaff, waveHeight: 20 } },
  ]

  return (
    <div className="effect-settings">
      <SettingSection
        title={`Effect Type: ${currentEffect?.label || 'Birds'}`}
        isOpen={expandedSections.effectType}
        onToggle={() => toggleSection('effectType')}
      >
        <div className="effect-type-grid">
          {EFFECT_OPTIONS.map(effect => (
            <button
              key={effect.id}
              className={`effect-button ${selectedEffect === effect.id ? 'selected' : ''}`}
              onClick={() => handleEffectChange(effect.id)}
            >
              {effect.label}
            </button>
          ))}
        </div>
      </SettingSection>

      {selectedEffect === VANTA_EFFECTS.BIRDS && (
        <>
          <SettingSection
            title="Colors"
            isOpen={expandedSections.colors}
            onToggle={() => toggleSection('colors')}
          >
            <SettingRow label="Primary Color">
              <input
                type="color"
                value={`#${effectSettings.color1.toString(16).padStart(6, '0')}`}
                onChange={(e) => {
                  const hex = e.target.value.slice(1);
                  handleSettingChange('color1', parseInt(hex, 16));
                }}
              />
            </SettingRow>
            <SettingRow label="Secondary Color">
              <input
                type="color"
                value={`#${effectSettings.color2.toString(16).padStart(6, '0')}`}
                onChange={(e) => {
                  const hex = e.target.value.slice(1);
                  handleSettingChange('color2', parseInt(hex, 16));
                }}
              />
            </SettingRow>
            <SettingRow label="Color Mode">
              <select
                value={effectSettings.colorMode}
                onChange={(e) => handleSettingChange('colorMode', e.target.value)}
                className="color-mode-select"
              >
                {COLOR_MODES.map(mode => (
                  <option key={mode.value} value={mode.value}>
                    {mode.label}
                  </option>
                ))}
              </select>
            </SettingRow>
          </SettingSection>

          <BirdsEffectSettings
            settings={effectSettings}
            onSettingChange={handleSettingChange}
            expandedSections={expandedSections}
            onSectionToggle={toggleSection}
          />
        </>
      )}

      {selectedEffect === VANTA_EFFECTS.FOG && (
        <FogEffectSettings
          settings={effectSettings}
          onSettingChange={handleSettingChange}
          expandedSections={expandedSections}
          onSectionToggle={toggleSection}
        />
      )}

      {selectedEffect === VANTA_EFFECTS.WAVES && (
        <WavesEffectSettings
          settings={effectSettings}
          onSettingChange={handleSettingChange}
          expandedSections={expandedSections}
          onSectionToggle={toggleSection}
        />
      )}

      {selectedEffect === VANTA_EFFECTS.GLOBE && (
        <GlobeEffectSettings
          settings={effectSettings}
          onSettingChange={handleSettingChange}
          expandedSections={expandedSections}
          onSectionToggle={toggleSection}
        />
      )}

      {selectedEffect === VANTA_EFFECTS.NET && (
        <NetEffectSettings
          settings={effectSettings}
          onSettingChange={handleSettingChange}
          expandedSections={expandedSections}
          onSectionToggle={toggleSection}
        />
      )}

      {selectedEffect === VANTA_EFFECTS.CELLS && (
        <CellsEffectSettings
          settings={effectSettings}
          onSettingChange={handleSettingChange}
          expandedSections={expandedSections}
          onSectionToggle={toggleSection}
        />
      )}

      {selectedEffect === VANTA_EFFECTS.TRUNK && (
        <TrunkEffectSettings
          settings={effectSettings}
          onSettingChange={handleSettingChange}
          expandedSections={expandedSections}
          onSectionToggle={toggleSection}
        />
      )}

      {selectedEffect === VANTA_EFFECTS.TOPOLOGY && (
        <TopologyEffectSettings
          settings={effectSettings}
          onSettingChange={handleSettingChange}
          expandedSections={expandedSections}
          onSectionToggle={toggleSection}
        />
      )}

      {selectedEffect === VANTA_EFFECTS.DOTS && (
        <DotsEffectSettings
          settings={effectSettings}
          onSettingChange={handleSettingChange}
          expandedSections={expandedSections}
          onSectionToggle={toggleSection}
        />
      )}

      {selectedEffect === VANTA_EFFECTS.RINGS && (
        <RingsEffectSettings
          settings={effectSettings}
          onSettingChange={handleSettingChange}
          expandedSections={expandedSections}
          onSectionToggle={toggleSection}
        />
      )}

      {selectedEffect === VANTA_EFFECTS.HALO && (
        <HaloEffectSettings
          settings={effectSettings}
          onSettingChange={handleSettingChange}
          expandedSections={expandedSections}
          onSectionToggle={toggleSection}
        />
      )}

      <div className="setting-group">
        <label>Quick Presets</label>
        <div className="effect-type-grid">
          {quickPresets.map((p) => (
            <button key={p.name} className="effect-button" onClick={() => { onEffectSettingsChange({ ...p.settings }); onEffectTypeChange(p.effect); setSelectedEffect(p.effect); }}>
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className="setting-group">
        <label htmlFor="mouseControls">Mouse Controls</label>
        <input
          type="checkbox"
          id="mouseControls"
          checked={effectSettings.mouseControls}
          onChange={(e) => handleSettingChange('mouseControls', e.target.checked)}
        />
      </div>

      <div className="setting-group">
        <label htmlFor="touchControls">Touch Controls</label>
        <input
          type="checkbox"
          id="touchControls"
          checked={effectSettings.touchControls}
          onChange={(e) => handleSettingChange('touchControls', e.target.checked)}
        />
      </div>

      <div className="setting-group">
        <label htmlFor="gyroControls">Gyro Controls</label>
        <input
          type="checkbox"
          id="gyroControls"
          checked={effectSettings.gyroControls}
          onChange={(e) => handleSettingChange('gyroControls', e.target.checked)}
        />
      </div>

      <div className="setting-group">
        <label htmlFor="minHeight">Min Height</label>
        <input
          type="number"
          id="minHeight"
          value={effectSettings.minHeight}
          onChange={(e) => handleSettingChange('minHeight', parseInt(e.target.value))}
          min="200"
          max="1000"
        />
      </div>

      <div className="setting-group">
        <label htmlFor="minWidth">Min Width</label>
        <input
          type="number"
          id="minWidth"
          value={effectSettings.minWidth}
          onChange={(e) => handleSettingChange('minWidth', parseInt(e.target.value))}
          min="200"
          max="1000"
        />
      </div>

      <div className="setting-group">
        <label htmlFor="scale">Scale</label>
        <input
          type="number"
          id="scale"
          value={effectSettings.scale}
          onChange={(e) => handleSettingChange('scale', parseFloat(e.target.value))}
          step="0.1"
          min="0.1"
          max="5"
        />
      </div>
    </div>
  );
};

export default EffectSettings; 