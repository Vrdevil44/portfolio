import React, { createContext, useContext, useState } from 'react';

const FontContext = createContext();

export const FontProvider = ({ children }) => {
  const [accentFont, setAccentFont] = useState({
    family: 'Inter',
    weight: '400',
    color: '#ffffff',
    letterSpacing: 0,
    useGradient: false,
    gradient: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)'
  });

  const [headingFont, setHeadingFont] = useState({
    family: 'Inter',
    weight: '600',
    color: '#ffffff',
    letterSpacing: 0,
    useGradient: false,
    gradient: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)'
  });

  const [bodyFont, setBodyFont] = useState({
    family: 'Inter',
    weight: '400',
    color: '#ffffff',
    letterSpacing: 0,
    useGradient: false,
    gradient: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)'
  });

  const value = {
    accentFont,
    setAccentFont,
    headingFont,
    setHeadingFont,
    bodyFont,
    setBodyFont,
  };

  return (
    <FontContext.Provider value={value}>
      {children}
    </FontContext.Provider>
  );
};

export const useFontContext = () => {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error('useFontContext must be used within a FontProvider');
  }
  return context;
}; 