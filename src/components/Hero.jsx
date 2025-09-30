import React from "react";
import { useFontContext } from "../contexts/FontContext";
import { useTheme } from "./SettingsPanel/ThemeSettings/ThemeContext";
import "./Hero.css";

// Hero layout: image on the left with two floating glass cards; text on the right
const Hero = ({
  imageUrl,
  title = "Designing interactive systems",
  subtitle = "I craft immersive, performant experiences with AI, 3D and motion.",
  ctaPrimary = "View Work",
  ctaSecondary = "Contact",
}) => {
  const { accentFont } = useFontContext();
  const { glow } = useTheme();

  return (
    <section className="hero" data-design-id="hero">
      <div className="hero-grid">
        <div className="hero-media" data-design-id="hero-media">
          <div className="hero-image-frame" data-design-id="hero-image-frame">
            {imageUrl ? (
              <img src={imageUrl} alt="Featured" className="hero-image" data-design-id="hero-image" />
            ) : (
              <div className="hero-image placeholder" aria-hidden data-design-id="hero-image" />
            )}
            <div className="glass-card card-top-right" data-design-id="hero-card-top-right" />
            <div className="glass-card card-bottom-left" data-design-id="hero-card-bottom-left" />
          </div>
        </div>
        <div className="hero-content" data-design-id="hero-content">
          <h1
            className="hero-heading"
            data-design-id="hero-heading"
            style={{
              fontFamily: accentFont.family,
              fontWeight: accentFont.weight,
            }}
          >
            {title}
          </h1>
          <p className="hero-subtitle" data-design-id="hero-subtitle">{subtitle}</p>
          <div className="hero-actions" data-design-id="hero-actions">
            <button className="ui-button primary" data-design-id="hero-cta-primary">{ctaPrimary}</button>
            <button className="ui-button ghost" data-design-id="hero-cta-secondary">{ctaSecondary}</button>
          </div>
          {glow?.enabled && <div className="hero-glow" aria-hidden />}
        </div>
      </div>
    </section>
  );
};

export default Hero;