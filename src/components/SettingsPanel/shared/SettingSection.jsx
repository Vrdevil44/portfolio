import React from 'react';
import './SettingSection.css';

export const SettingSection = ({ title, children, isOpen, onToggle }) => {
  return (
    <div className="setting-section">
      <button className="section-header" onClick={onToggle}>
        {title}
        <span className="section-icon">{isOpen ? '×' : '+'}</span>
      </button>
      {isOpen && (
        <div className="section-content">
          {children}
        </div>
      )}
    </div>
  );
};

export const SettingRow = ({ label, children }) => {
  return (
    <div className="setting-row">
      <label className="setting-label">{label}</label>
      <div className="setting-control">
        {children}
      </div>
    </div>
  );
};

export const Toggle = ({ value, onChange, label }) => {
  return (
    <div className="toggle-container">
      <label className="toggle" aria-label={label}>
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="toggle-slider"></span>
      </label>
      {label && <span className="toggle-label">{label}</span>}
    </div>
  );
};

export const ColorInput = ({ value, onChange, showHex = true }) => {
  const hexValue = typeof value === 'number' ? 
    `#${value.toString(16).padStart(6, '0')}` : value;

  return (
    <div className="color-input">
      <input
        type="color"
        value={hexValue}
        onChange={(e) => {
          const hex = e.target.value.slice(1);
          onChange(parseInt(hex, 16));
        }}
      />
      {showHex && (
        <input
          type="text"
          className="hex-input"
          value={hexValue}
          onChange={(e) => {
            const hex = e.target.value.replace('#', '');
            if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
              onChange(parseInt(hex, 16));
            }
          }}
        />
      )}
    </div>
  );
};

export const Slider = ({ value, onChange, min, max, step, label, showValue = true }) => {
  return (
    <div className="slider-container">
      {label && <span className="slider-label">{label}</span>}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
      {showValue && <span className="slider-value">{value}</span>}
    </div>
  );
}; 