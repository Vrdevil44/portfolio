// Vanta effect configurations
const VANTA_CONFIG = {
    WAVES: {
        name: 'Waves',
        ranges: {
            waveHeight: [0, 40],
            waveSpeed: [0, 2],
            zoom: [0.1, 2],
            scale: [0.1, 2.0]
        },
        colors: ['color', 'backgroundColor'],
        defaults: {
            waveHeight: 20,
            waveSpeed: 0.75,
            zoom: 0.75,
            scale: 1.0
        }
    },
    BIRDS: {
        name: 'Birds',
        ranges: {
            birdSize: [0.5, 3],
            wingSpan: [10, 40],
            speedLimit: [1, 10],
            separation: [1, 100],
            alignment: [1, 100],
            cohesion: [1, 100],
            quantity: [1, 100]
        },
        colors: ['color', 'backgroundColor'],
        defaults: {
            birdSize: 1.5,
            wingSpan: 20,
            speedLimit: 5,
            separation: 20,
            alignment: 20,
            cohesion: 20,
            quantity: 30
        }
    },
    FOG: {
        name: 'Fog',
        ranges: {
            speed: [0.1, 5.0],
            zoom: [0.1, 3.0],
            blur: [0, 20]
        },
        colors: ['highlightColor', 'midtoneColor', 'lowlightColor', 'baseColor'],
        defaults: {
            speed: 1.0,
            zoom: 1.0,
            blur: 0.8
        }
    },
    CLOUDS: {
        name: 'Clouds',
        ranges: {
            speed: [0.1, 5],
            scale: [0.1, 2.0],
            width: [0.1, 3.0],
            height: [0.1, 3.0]
        },
        colors: ['skyColor', 'cloudColor', 'cloudShadowColor'],
        defaults: {
            speed: 1.0,
            scale: 1.0,
            width: 1.0,
            height: 1.0
        }
    },
    GLOBE: {
        name: 'Globe',
        ranges: {
            size: [0.1, 2],
            scale: [0.1, 2.0],
            spacing: [0, 20],
            rotation: [0, 360]
        },
        colors: ['color', 'backgroundColor'],
        defaults: {
            size: 1.0,
            scale: 1.0,
            spacing: 0,
            rotation: 0
        }
    },
    NET: {
        name: 'Net',
        ranges: {
            points: [1, 20],
            maxDistance: [10, 50],
            spacing: [10, 50],
            scale: [0.1, 2.0]
        },
        colors: ['color', 'backgroundColor'],
        defaults: {
            points: 10,
            maxDistance: 20,
            spacing: 15,
            scale: 1.0
        }
    },
    RINGS: {
        name: 'Rings',
        ranges: {
            scale: [0.1, 2.0],
            spacing: [0, 20],
            rotation: [0, 360],
            size: [0.1, 2.0]
        },
        colors: ['color', 'backgroundColor'],
        defaults: {
            scale: 1.0,
            spacing: 0,
            rotation: 0,
            size: 1.0
        }
    },
    CELLS: {
        name: 'Cells',
        ranges: {
            scale: [0.1, 2.0],
            size: [0.1, 3.0],
            speed: [0.1, 5.0],
            color: [0, 1]
        },
        colors: ['color', 'backgroundColor'],
        defaults: {
            scale: 1.0,
            size: 1.0,
            speed: 1.0,
            color: 0.5
        }
    },
    TRUNK: {
        name: 'Trunk',
        ranges: {
            scale: [0.1, 2.0],
            spacing: [10, 100],
            speed: [0.1, 5.0]
        },
        colors: ['color', 'backgroundColor'],
        defaults: {
            scale: 1.0,
            spacing: 30,
            speed: 1.0
        }
    },
    TOPOLOGY: {
        name: 'Topology',
        ranges: {
            scale: [0.1, 2.0],
            spacing: [10, 100],
            speed: [0.1, 5.0],
            points: [1, 20]
        },
        colors: ['color', 'backgroundColor'],
        defaults: {
            scale: 1.0,
            spacing: 30,
            speed: 1.0,
            points: 10
        }
    },
    DOTS: {
        name: 'Dots',
        ranges: {
            scale: [0.1, 2.0],
            spacing: [10, 100],
            size: [0.1, 3.0],
            speed: [0.1, 5.0]
        },
        colors: ['color', 'backgroundColor'],
        defaults: {
            scale: 1.0,
            spacing: 30,
            size: 1.0,
            speed: 1.0
        }
    },
    HALO: {
        name: 'Halo',
        ranges: {
            size: [0.1, 2.0],
            scale: [0.1, 2.0],
            spacing: [0, 20],
            rotation: [0, 360]
        },
        colors: ['color', 'backgroundColor'],
        defaults: {
            size: 1.0,
            scale: 1.0,
            spacing: 0,
            rotation: 0
        }
    }
};

// Helper functions for effect configuration
function getEffectConfig(effectName) {
    return VANTA_CONFIG[effectName] || null;
}

function getEffectDefaults(effectName) {
    const config = getEffectConfig(effectName);
    return config ? config.defaults : {};
}

function getEffectRanges(effectName) {
    const config = getEffectConfig(effectName);
    return config ? config.ranges : {};
}

function getEffectColors(effectName) {
    const config = getEffectConfig(effectName);
    return config ? config.colors : [];
}

// Export the configuration and helper functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        VANTA_CONFIG,
        getEffectConfig,
        getEffectDefaults,
        getEffectRanges,
        getEffectColors
    };
} 