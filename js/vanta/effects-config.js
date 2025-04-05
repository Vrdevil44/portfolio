// Vanta.js Effects Configuration
const VANTA_CONFIG = {
    WAVES: {
        color: { type: "color", default: "#2451FF" },
        shininess: { type: "slider", default: 50, min: 0, max: 100, step: 1 },
        waveHeight: { type: "slider", default: 20, min: 0, max: 100, step: 1 },
        waveSpeed: { type: "slider", default: 1.5, min: 0, max: 5, step: 0.1 },
        zoom: { type: "slider", default: 1.5, min: 0, max: 3, step: 0.1 }
    },
    FOG: {
        highlightColor: { type: "color", default: "#2451FF" },
        midtoneColor: { type: "color", default: "#7B68EE" },
        lowlightColor: { type: "color", default: "#000000" },
        baseColor: { type: "color", default: "#000000" },
        blurFactor: { type: "slider", default: 0.6, min: 0, max: 1, step: 0.01 },
        speed: { type: "slider", default: 1, min: 0, max: 5, step: 0.1 },
        zoom: { type: "slider", default: 1.5, min: 0, max: 3, step: 0.1 }
    },
    GLOBE: {
        color: { type: "color", default: "#2451FF" },
        backgroundColor: { type: "color", default: "#000000" },
        size: { type: "slider", default: 1, min: 0, max: 2, step: 0.1 },
        speed: { type: "slider", default: 1, min: 0, max: 5, step: 0.1 }
    },
    NET: {
        color: { type: "color", default: "#2451FF" },
        backgroundColor: { type: "color", default: "#000000" },
        points: { type: "slider", default: 10, min: 1, max: 20, step: 1 },
        maxDistance: { type: "slider", default: 25, min: 0, max: 50, step: 1 },
        spacing: { type: "slider", default: 20, min: 0, max: 50, step: 1 },
        showDots: { type: "checkbox", default: true }
    },
    RINGS: {
        backgroundColor: { type: "color", default: "#000000" },
        color: { type: "color", default: "#2451FF" },
        radius: { type: "slider", default: 1.5, min: 0, max: 3, step: 0.1 },
        speed: { type: "slider", default: 1, min: 0, max: 5, step: 0.1 },
        rotationSpeed: { type: "slider", default: 1, min: 0, max: 5, step: 0.1 }
    },
    CELLS: {
        color: { type: "color", default: "#2451FF" },
        backgroundColor: { type: "color", default: "#000000" },
        size: { type: "slider", default: 1.5, min: 0, max: 3, step: 0.1 },
        speed: { type: "slider", default: 1, min: 0, max: 5, step: 0.1 }
    },
    HALO: {
        color: { type: "color", default: "#2451FF" },
        backgroundColor: { type: "color", default: "#000000" },
        amplitudeFactor: { type: "slider", default: 2, min: 0, max: 5, step: 0.1 },
        size: { type: "slider", default: 1.5, min: 0, max: 3, step: 0.1 },
        speed: { type: "slider", default: 1, min: 0, max: 5, step: 0.1 }
    },
    DOTS: {
        color: { type: "color", default: "#2451FF" },
        backgroundColor: { type: "color", default: "#000000" },
        size: { type: "slider", default: 3, min: 0, max: 10, step: 0.1 },
        spacing: { type: "slider", default: 30, min: 0, max: 100, step: 1 },
        speed: { type: "slider", default: 1, min: 0, max: 5, step: 0.1 }
    }
};

// Default values for each effect
const VANTA_DEFAULTS = {
    WAVES: {
        color: "#2451FF",
        shininess: 50,
        waveHeight: 20,
        waveSpeed: 1.5,
        zoom: 1.5
    },
    FOG: {
        highlightColor: "#2451FF",
        midtoneColor: "#7B68EE",
        lowlightColor: "#000000",
        baseColor: "#000000",
        blurFactor: 0.6,
        speed: 1,
        zoom: 1.5
    },
    GLOBE: {
        color: "#2451FF",
        backgroundColor: "#000000",
        size: 1,
        speed: 1
    },
    NET: {
        color: "#2451FF",
        backgroundColor: "#000000",
        points: 10,
        maxDistance: 25,
        spacing: 20,
        showDots: true
    },
    RINGS: {
        backgroundColor: "#000000",
        color: "#2451FF",
        radius: 1.5,
        speed: 1,
        rotationSpeed: 1
    },
    CELLS: {
        color: "#2451FF",
        backgroundColor: "#000000",
        size: 1.5,
        speed: 1
    },
    HALO: {
        color: "#2451FF",
        backgroundColor: "#000000",
        amplitudeFactor: 2,
        size: 1.5,
        speed: 1
    },
    DOTS: {
        color: "#2451FF",
        backgroundColor: "#000000",
        size: 3,
        spacing: 30,
        speed: 1
    }
};

// Helper function to get effect configuration
function getEffectConfig(effectName) {
    return VANTA_CONFIG[effectName] || {};
}

// Helper function to get effect defaults
function getEffectDefaults(effectName) {
    return VANTA_DEFAULTS[effectName] || {};
}

// Export the configuration and helper functions
window.VANTA_CONFIG = VANTA_CONFIG;
window.VANTA_DEFAULTS = VANTA_DEFAULTS;
window.getEffectConfig = getEffectConfig;
window.getEffectDefaults = getEffectDefaults; 