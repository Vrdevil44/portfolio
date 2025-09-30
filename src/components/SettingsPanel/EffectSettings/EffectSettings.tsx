import React, { useCallback } from 'react';
import './EffectSettings.css';

interface EffectSettingsProps {
  effect: any;
  onUpdateEffect: (effectId: string, updates: any) => void;
}

export const EffectSettings: React.FC<EffectSettingsProps> = ({ effect, onUpdateEffect }) => {
  const handleChange = useCallback((property: string, value: any) => {
    onUpdateEffect(effect.id, { [property]: value });
  }, [effect.id, onUpdateEffect]);

  const renderSetting = (key: string, value: any) => {
    if (typeof value === 'number') {
      const isBackgroundAlpha = key === 'backgroundAlpha';
      const min = isBackgroundAlpha ? 0 : 0;
      const max = isBackgroundAlpha ? 1 : 100;
      const step = isBackgroundAlpha ? 0.01 : 1;

      return (
        <div className="setting-group" key={key}>
          <label>
            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            <span>{value.toFixed(isBackgroundAlpha ? 2 : 0)}</span>
          </label>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => handleChange(key, parseFloat(e.target.value))}
          />
        </div>
      );
    }

    if (typeof value === 'string' && value.startsWith('#')) {
      return (
        <div className="setting-group" key={key}>
          <label>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
          <div className="color-input-group">
            <input
              type="color"
              value={value}
              onChange={(e) => handleChange(key, e.target.value)}
            />
            <input
              type="text"
              value={value}
              onChange={(e) => handleChange(key, e.target.value)}
              pattern="^#[0-9A-Fa-f]{6}$"
            />
          </div>
        </div>
      );
    }

    if (typeof value === 'boolean') {
      return (
        <div className="setting-group" key={key}>
          <label>
            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => handleChange(key, e.target.checked)}
            />
          </label>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="effect-settings">
      {Object.entries(effect.properties || {}).map(([key, value]) => renderSetting(key, value))}
    </div>
  );
};

export default EffectSettings; 