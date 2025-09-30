export const VANTA_EFFECTS = {
  BIRDS: 'birds',
  FOG: 'fog',
  WAVES: 'waves',
  GLOBE: 'globe',
  NET: 'net',
  CELLS: 'cells',
  TRUNK: 'trunk',
  TOPOLOGY: 'topology',
  DOTS: 'dots',
  RINGS: 'rings',
  HALO: 'halo'
};

export const defaultBirdsPreset = {
  name: 'Default Birds',
  type: VANTA_EFFECTS.BIRDS,
  settings: {
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    // Pad short hexes to full 6-digit RGB for predictability
    backgroundColor: 0x07192f,
    backgroundAlpha: 1,
    // Colors
    color1: 0xff0000,
    color2: 0x00d1ff,
    colorMode: "varianceGradient", // Can be: lerp, variance, lerpGradient, varianceGradient
    // Size
    birdSize: 1,
    wingSpan: 30,
    quantity: 4,
    // Dynamics
    speedLimit: 5,
    separation: 20,
    alignment: 20,
    cohesion: 20
  }
};

export const defaultFogPreset = {
  name: 'Default Fog',
  type: VANTA_EFFECTS.FOG,
  settings: {
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    highlightColor: 0xffc300,
    midtoneColor: 0xff1f00,
    lowlightColor: 0x2d00ff,
    baseColor: 0xffebeb,
    blurFactor: 0.6,
    zoom: 1,
    speed: 1
  }
};

export const defaultWavesPreset = {
  settings: {
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x5588ff,
    shininess: 30,
    waveHeight: 15,
    waveSpeed: 1,
    zoom: 1
  }
};

export const defaultGlobePreset = {
  name: 'Default Globe',
  type: VANTA_EFFECTS.GLOBE,
  settings: {
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    backgroundColor: 0x23153c,
    color: 0xff3f81,
    color2: 0xffffff,
    size: 1
  }
};

export const defaultNetPreset = {
  name: 'Default Net',
  type: VANTA_EFFECTS.NET,
  settings: {
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0xff3f81,
    backgroundColor: 0x23153c,
    points: 10,
    maxDistance: 20,
    spacing: 15,
    showDots: true
  }
};

export const defaultCellsPreset = {
  name: 'Default Cells',
  type: VANTA_EFFECTS.CELLS,
  settings: {
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color1: 0x8c8c8c,
    color2: 0xf2e735,
    size: 1.5,
    speed: 1
  }
};

export const defaultTrunkPreset = {
  name: 'Default Trunk',
  type: VANTA_EFFECTS.TRUNK,
  settings: {
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    backgroundColor: 0x222426,
    color: 0x98465f,
    spacing: 0,
    chaos: 1
  }
};

export const defaultTopologyPreset = {
  name: 'Default Topology',
  type: VANTA_EFFECTS.TOPOLOGY,
  settings: {
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    backgroundColor: 0x002222,
    color: 0x89964e
  }
};

export const defaultDotsPreset = {
  name: 'Default Dots',
  type: VANTA_EFFECTS.DOTS,
  settings: {
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    backgroundColor: 0x222222,
    color: 0xff8820,
    color2: 0xff8820,
    size: 3,
    spacing: 35,
    showLines: true
  }
};

export const defaultRingsPreset = {
  name: 'Default Rings',
  type: VANTA_EFFECTS.RINGS,
  settings: {
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x88ff00,
    backgroundColor: 0x202428,
    backgroundAlpha: 1
  }
};

export const defaultHaloPreset = {
  name: 'Default Halo',
  type: VANTA_EFFECTS.HALO,
  settings: {
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    backgroundColor: 0x131a43,
    baseColor: 0x001a59,
    size: 1,
    amplitudeFactor: 1,
    xOffset: 0,
    yOffset: 0
  }
};

export const fogSettingsCategories = {
  colors: {
    label: 'Colors',
    settings: [
      { key: 'highlightColor', label: 'Highlight Color', type: 'color' },
      { key: 'midtoneColor', label: 'Midtone Color', type: 'color' },
      { key: 'lowlightColor', label: 'Lowlight Color', type: 'color' },
      { key: 'baseColor', label: 'Base Color', type: 'color' }
    ]
  },
  effects: {
    label: 'Effects',
    settings: [
      { key: 'blurFactor', label: 'Blur Factor', type: 'range', min: 0.1, max: 1.0, step: 0.1 },
      { key: 'zoom', label: 'Zoom', type: 'range', min: 0.1, max: 3.0, step: 0.1 },
      { key: 'speed', label: 'Speed', type: 'range', min: 0.1, max: 3.0, step: 0.1 }
    ]
  }
};

export const birdsSettingsCategories = {
  colors: {
    label: 'Colors',
    settings: [
      { key: 'color1', label: 'Primary Color', type: 'color' },
      { key: 'color2', label: 'Secondary Color', type: 'color' },
      { key: 'colorMode', label: 'Color Mode', type: 'select', options: ['lerp', 'variance', 'lerpGradient', 'varianceGradient'] }
    ]
  },
  size: {
    label: 'Size & Quantity',
    settings: [
      { key: 'birdSize', label: 'Bird Size', type: 'range', min: 0.5, max: 3, step: 0.1 },
      { key: 'wingSpan', label: 'Wing Span', type: 'range', min: 10, max: 40, step: 1 },
      { key: 'quantity', label: 'Quantity', type: 'range', min: 1, max: 8, step: 1 }
    ]
  },
  dynamics: {
    label: 'Movement & Behavior',
    settings: [
      { key: 'speedLimit', label: 'Speed Limit', type: 'range', min: 1, max: 10, step: 1 },
      { key: 'separation', label: 'Separation', type: 'range', min: 10, max: 100, step: 5 },
      { key: 'alignment', label: 'Alignment', type: 'range', min: 10, max: 100, step: 5 },
      { key: 'cohesion', label: 'Cohesion', type: 'range', min: 10, max: 100, step: 5 }
    ]
  }
}; 