import React, { useEffect, useRef, useState } from 'react';
import { defaultBirdsPreset, VANTA_EFFECTS } from './SettingsPanel/EffectSettings/VantaPresets';
import './VantaBackground.css';

const VantaBackground = ({ settings = defaultBirdsPreset.settings, effectType = VANTA_EFFECTS.BIRDS }) => {
  const vantaRef = useRef(null);
  const effectRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if VANTA and THREE are available
    if (typeof window === 'undefined' || !window.VANTA || !window.THREE) {
      setError('Required dependencies (VANTA or THREE) not loaded');
      return;
    }

    // Check WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setError('WebGL not supported in your browser');
      return;
    }

    // Clean up previous effect
    if (effectRef.current) {
      effectRef.current.destroy();
      effectRef.current = null;
    }

    try {
      const effectFunction = window.VANTA[effectType.toUpperCase()];
      if (!effectFunction) {
        setError(`Effect type ${effectType} not found`);
        return;
      }

      // Remove any properties that aren't relevant to the current effect type
      const cleanedSettings = { ...settings };
      if (effectType === VANTA_EFFECTS.FOG) {
        delete cleanedSettings.colorMode;
        delete cleanedSettings.color1;
        delete cleanedSettings.color2;
        delete cleanedSettings.birdSize;
        delete cleanedSettings.wingSpan;
        delete cleanedSettings.quantity;
        delete cleanedSettings.speedLimit;
        delete cleanedSettings.separation;
        delete cleanedSettings.alignment;
        delete cleanedSettings.cohesion;
      } else if (effectType === VANTA_EFFECTS.BIRDS) {
        delete cleanedSettings.highlightColor;
        delete cleanedSettings.midtoneColor;
        delete cleanedSettings.lowlightColor;
        delete cleanedSettings.baseColor;
        delete cleanedSettings.blurFactor;
        delete cleanedSettings.zoom;
        delete cleanedSettings.speed;
      }

      effectRef.current = effectFunction({
        el: vantaRef.current,
        THREE: window.THREE,
        ...cleanedSettings
      });

      // Update effect settings when they change
      Object.entries(cleanedSettings).forEach(([key, value]) => {
        if (effectRef.current.options[key] !== value) {
          effectRef.current.setOptions({
            [key]: value
          });
        }
      });
    } catch (err) {
      setError(`Failed to initialize effect: ${err.message}`);
      console.error('Vanta effect initialization error:', err);
    }

    // Cleanup function
    return () => {
      if (effectRef.current) {
        effectRef.current.destroy();
        effectRef.current = null;
      }
    };
  }, [settings, effectType]); // Re-run effect when settings or effectType changes

  if (error) {
    return (
      <div className="vanta-error">
        <p>{error}</p>
      </div>
    );
  }

  return <div ref={vantaRef} className="vanta-background" />;
};

export default VantaBackground; 