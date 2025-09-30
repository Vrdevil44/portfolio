import React from 'react';
import { useFontContext } from '../../../contexts/FontContext';
import { DISPLAY_FONTS, HEADING_FONTS, BODY_FONTS, FONT_WEIGHTS } from '../../../constants/fonts';
import styles from './FontSettings.module.css';

const FontSettings = () => {
  const { 
    accentFont, setAccentFont,
    headingFont, setHeadingFont,
    bodyFont, setBodyFont 
  } = useFontContext();

  const handleAccentFontChange = (e) => {
    const { name, value } = e.target;
    setAccentFont(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleHeadingFontChange = (e) => {
    const { name, value } = e.target;
    setHeadingFont(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBodyFontChange = (e) => {
    const { name, value } = e.target;
    setBodyFont(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className={styles.fontSettings}>
      {/* Accent Font Settings */}
      <section className={styles.fontSection}>
        <h3>Accent Font</h3>
        <div className={styles.previewSection}>
          <p 
            className={styles.preview}
            style={{
              fontFamily: accentFont.family,
              fontWeight: accentFont.weight,
              color: accentFont.color,
              letterSpacing: `${accentFont.letterSpacing}px`,
              background: accentFont.useGradient ? accentFont.gradient : 'none',
              textShadow: accentFont.useGlow ? `0 0 10px ${accentFont.color}` : 'none'
            }}
          >
            Preview Text - Accent Font
          </p>
        </div>
        
        <div className={styles.controls}>
          <div className={styles.inputGroup}>
            <label htmlFor="accent-family">Font Family</label>
            <select 
              id="accent-family"
              name="family"
              value={accentFont.family}
              onChange={handleAccentFontChange}
            >
              {DISPLAY_FONTS.map(font => (
                <option key={font} value={font}>{font}</option>
              ))}
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="accent-weight">Font Weight</label>
            <select
              id="accent-weight"
              name="weight"
              value={accentFont.weight}
              onChange={handleAccentFontChange}
            >
              {FONT_WEIGHTS.map(weight => (
                <option key={weight} value={weight}>{weight}</option>
              ))}
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="accent-color">Color</label>
            <input
              type="color"
              id="accent-color"
              name="color"
              value={accentFont.color}
              onChange={handleAccentFontChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="accent-spacing">Letter Spacing</label>
            <input
              type="range"
              id="accent-spacing"
              name="letterSpacing"
              min="-2"
              max="10"
              step="0.5"
              value={accentFont.letterSpacing}
              onChange={handleAccentFontChange}
            />
            <span>{accentFont.letterSpacing}px</span>
          </div>

          <div className={styles.effectsGroup}>
            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="accent-gradient"
                name="useGradient"
                checked={accentFont.useGradient}
                onChange={(e) => handleAccentFontChange({
                  target: { name: 'useGradient', value: e.target.checked }
                })}
              />
              <label htmlFor="accent-gradient">Use Gradient</label>
            </div>

            {accentFont.useGradient && (
              <input
                type="text"
                name="gradient"
                value={accentFont.gradient}
                onChange={handleAccentFontChange}
                placeholder="linear-gradient(...)"
                className={styles.gradientInput}
              />
            )}
          </div>

          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="accent-glow"
              name="useGlow"
              checked={accentFont.useGlow}
              onChange={(e) => handleAccentFontChange({
                target: { name: 'useGlow', value: e.target.checked }
              })}
            />
            <label htmlFor="accent-glow">Add Glow Effect</label>
          </div>
        </div>
      </section>

      {/* Heading Font Settings */}
      <section className={styles.fontSection}>
        <h3>Heading Font</h3>
        <div className={styles.previewSection}>
          <p 
            className={styles.preview}
            style={{
              fontFamily: headingFont.family,
              fontWeight: headingFont.weight,
              color: headingFont.color,
              letterSpacing: `${headingFont.letterSpacing}px`
            }}
          >
            Preview Text - Heading Font
          </p>
        </div>

        <div className={styles.controls}>
          <div className={styles.inputGroup}>
            <label htmlFor="heading-family">Font Family</label>
            <select
              id="heading-family"
              name="family"
              value={headingFont.family}
              onChange={handleHeadingFontChange}
            >
              {HEADING_FONTS.map(font => (
                <option key={font} value={font}>{font}</option>
              ))}
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="heading-weight">Font Weight</label>
            <select
              id="heading-weight"
              name="weight"
              value={headingFont.weight}
              onChange={handleHeadingFontChange}
            >
              {FONT_WEIGHTS.map(weight => (
                <option key={weight} value={weight}>{weight}</option>
              ))}
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="heading-color">Color</label>
            <input
              type="color"
              id="heading-color"
              name="color"
              value={headingFont.color}
              onChange={handleHeadingFontChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="heading-spacing">Letter Spacing</label>
            <input
              type="range"
              id="heading-spacing"
              name="letterSpacing"
              min="-1"
              max="5"
              step="0.25"
              value={headingFont.letterSpacing}
              onChange={handleHeadingFontChange}
            />
            <span>{headingFont.letterSpacing}px</span>
          </div>
        </div>
      </section>

      {/* Body Font Settings */}
      <section className={styles.fontSection}>
        <h3>Body Font</h3>
        <div className={styles.previewSection}>
          <p 
            className={styles.preview}
            style={{
              fontFamily: bodyFont.family,
              fontWeight: bodyFont.weight,
              color: bodyFont.color,
              letterSpacing: `${bodyFont.letterSpacing}px`
            }}
          >
            Preview Text - Body Font. This is how your main content will appear throughout the site.
          </p>
        </div>

        <div className={styles.controls}>
          <div className={styles.inputGroup}>
            <label htmlFor="body-family">Font Family</label>
            <select
              id="body-family"
              name="family"
              value={bodyFont.family}
              onChange={handleBodyFontChange}
            >
              {BODY_FONTS.map(font => (
                <option key={font} value={font}>{font}</option>
              ))}
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="body-weight">Font Weight</label>
            <select
              id="body-weight"
              name="weight"
              value={bodyFont.weight}
              onChange={handleBodyFontChange}
            >
              {FONT_WEIGHTS.map(weight => (
                <option key={weight} value={weight}>{weight}</option>
              ))}
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="body-color">Color</label>
            <input
              type="color"
              id="body-color"
              name="color"
              value={bodyFont.color}
              onChange={handleBodyFontChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="body-spacing">Letter Spacing</label>
            <input
              type="range"
              id="body-spacing"
              name="letterSpacing"
              min="-0.5"
              max="2"
              step="0.1"
              value={bodyFont.letterSpacing}
              onChange={handleBodyFontChange}
            />
            <span>{bodyFont.letterSpacing}px</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FontSettings; 