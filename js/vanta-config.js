// Vanta.js effect configurations
const VANTA_CONFIG = {
    DOTS: {
        ranges: {
            size: [0.5, 3],
            spacing: [10, 50],
            showDots: [true, false],
            backgroundColor: [0x000000, 0xffffff],
            color1: [0x2451FF, 0xffffff],
            color2: [0x7B68EE, 0xffffff],
            colorMode: ['variance', 'variance'],
            gyroControls: [false, true],
            mouseControls: [true, false],
            touchControls: [true, false],
            minHeight: [200, 800],
            minWidth: [200, 800]
        },
        colors: ['backgroundColor', 'color1', 'color2'],
        defaults: {
            size: 1,
            spacing: 30,
            showDots: true,
            backgroundColor: 0x0A0A0A,
            color1: 0x2451FF,
            color2: 0x7B68EE,
            colorMode: 'variance',
            gyroControls: false,
            mouseControls: true,
            touchControls: true,
            minHeight: 200,
            minWidth: 200
        }
    },
    HALO: {
        ranges: {
            amplitudeFactor: [1, 5],
            baseColor: [0x2451FF, 0xffffff],
            backgroundColor: [0x000000, 0xffffff],
            size: [0.5, 2],
            xOffset: [-0.5, 0.5],
            yOffset: [-0.5, 0.5],
            gyroControls: [false, true],
            mouseControls: [true, false],
            touchControls: [true, false],
            minHeight: [200, 800],
            minWidth: [200, 800]
        },
        colors: ['baseColor', 'backgroundColor'],
        defaults: {
            amplitudeFactor: 2,
            baseColor: 0x2451FF,
            backgroundColor: 0x0A0A0A,
            size: 1,
            xOffset: 0,
            yOffset: 0,
            gyroControls: false,
            mouseControls: true,
            touchControls: true,
            minHeight: 200,
            minWidth: 200
        }
    },
    TOPOLOGY: {
        ranges: {
            backgroundColor: [0x000000, 0xffffff],
            lineColor: [0x2451FF, 0xffffff],
            points: [5, 20],
            maxDistance: [10, 50],
            spacing: [10, 50],
            gyroControls: [false, true],
            mouseControls: [true, false],
            touchControls: [true, false],
            minHeight: [200, 800],
            minWidth: [200, 800]
        },
        colors: ['backgroundColor', 'lineColor'],
        defaults: {
            backgroundColor: 0x0A0A0A,
            lineColor: 0x2451FF,
            points: 10,
            maxDistance: 25,
            spacing: 30,
            gyroControls: false,
            mouseControls: true,
            touchControls: true,
            minHeight: 200,
            minWidth: 200
        }
    },
    WAVES: {
        ranges: {
            amplitude: [0.5, 5],
            amplitudeFactor: [0.5, 5],
            speed: [0.5, 2],
            zoom: [0.5, 2],
            backgroundColor: [0x000000, 0xffffff],
            color: [0x2451FF, 0xffffff],
            gyroControls: [false, true],
            mouseControls: [true, false],
            touchControls: [true, false],
            minHeight: [200, 800],
            minWidth: [200, 800]
        },
        colors: ['backgroundColor', 'color'],
        defaults: {
            amplitude: 1.5,
            amplitudeFactor: 1.5,
            speed: 1,
            zoom: 1,
            backgroundColor: 0x0A0A0A,
            color: 0x2451FF,
            gyroControls: false,
            mouseControls: true,
            touchControls: true,
            minHeight: 200,
            minWidth: 200
        }
    },
    BIRDS: {
        ranges: {
            backgroundColor: [0x000000, 0xffffff],
            color1: [0x2451FF, 0xffffff],
            color2: [0x7B68EE, 0xffffff],
            colorMode: ['variance', 'variance'],
            quantity: [1, 5],
            separation: [10, 50],
            gyroControls: [false, true],
            mouseControls: [true, false],
            touchControls: [true, false],
            minHeight: [200, 800],
            minWidth: [200, 800]
        },
        colors: ['backgroundColor', 'color1', 'color2'],
        defaults: {
            backgroundColor: 0x0A0A0A,
            color1: 0x2451FF,
            color2: 0x7B68EE,
            colorMode: 'variance',
            quantity: 3,
            separation: 30,
            gyroControls: false,
            mouseControls: true,
            touchControls: true,
            minHeight: 200,
            minWidth: 200
        }
    },
    FOG: {
        ranges: {
            highlightColor: [0x2451FF, 0xffffff],
            midtoneColor: [0x7B68EE, 0xffffff],
            lowlightColor: [0x000000, 0xffffff],
            baseColor: [0x000000, 0xffffff],
            blurFactor: [0.5, 2],
            speed: [0.5, 2],
            zoom: [0.5, 2],
            gyroControls: [false, true],
            mouseControls: [true, false],
            touchControls: [true, false],
            minHeight: [200, 800],
            minWidth: [200, 800]
        },
        colors: ['highlightColor', 'midtoneColor', 'lowlightColor', 'baseColor'],
        defaults: {
            highlightColor: 0x2451FF,
            midtoneColor: 0x7B68EE,
            lowlightColor: 0x000000,
            baseColor: 0x0A0A0A,
            blurFactor: 1,
            speed: 1,
            zoom: 1,
            gyroControls: false,
            mouseControls: true,
            touchControls: true,
            minHeight: 200,
            minWidth: 200
        }
    },
    CLOUDS: {
        ranges: {
            backgroundColor: [0x000000, 0xffffff],
            cloudColor: [0x2451FF, 0xffffff],
            cloudShadowColor: [0x7B68EE, 0xffffff],
            speed: [0.5, 2],
            texturePath: ['/noise.png', '/noise.png'],
            gyroControls: [false, true],
            mouseControls: [true, false],
            touchControls: [true, false],
            minHeight: [200, 800],
            minWidth: [200, 800]
        },
        colors: ['backgroundColor', 'cloudColor', 'cloudShadowColor'],
        defaults: {
            backgroundColor: 0x0A0A0A,
            cloudColor: 0x2451FF,
            cloudShadowColor: 0x7B68EE,
            speed: 1,
            texturePath: '/noise.png',
            gyroControls: false,
            mouseControls: true,
            touchControls: true,
            minHeight: 200,
            minWidth: 200
        }
    },
    GLOBE: {
        ranges: {
            backgroundColor: [0x000000, 0xffffff],
            color: [0x2451FF, 0xffffff],
            points: [5, 20],
            maxDistance: [10, 50],
            spacing: [10, 50],
            gyroControls: [false, true],
            mouseControls: [true, false],
            touchControls: [true, false],
            minHeight: [200, 800],
            minWidth: [200, 800]
        },
        colors: ['backgroundColor', 'color'],
        defaults: {
            backgroundColor: 0x0A0A0A,
            color: 0x2451FF,
            points: 10,
            maxDistance: 25,
            spacing: 30,
            gyroControls: false,
            mouseControls: true,
            touchControls: true,
            minHeight: 200,
            minWidth: 200
        }
    },
    NET: {
        ranges: {
            backgroundColor: [0x000000, 0xffffff],
            color: [0x2451FF, 0xffffff],
            points: [5, 20],
            maxDistance: [10, 50],
            spacing: [10, 50],
            gyroControls: [false, true],
            mouseControls: [true, false],
            touchControls: [true, false],
            minHeight: [200, 800],
            minWidth: [200, 800]
        },
        colors: ['backgroundColor', 'color'],
        defaults: {
            backgroundColor: 0x0A0A0A,
            color: 0x2451FF,
            points: 10,
            maxDistance: 25,
            spacing: 30,
            gyroControls: false,
            mouseControls: true,
            touchControls: true,
            minHeight: 200,
            minWidth: 200
        }
    },
    RINGS: {
        ranges: {
            backgroundColor: [0x000000, 0xffffff],
            color: [0x2451FF, 0xffffff],
            points: [5, 20],
            maxDistance: [10, 50],
            spacing: [10, 50],
            gyroControls: [false, true],
            mouseControls: [true, false],
            touchControls: [true, false],
            minHeight: [200, 800],
            minWidth: [200, 800]
        },
        colors: ['backgroundColor', 'color'],
        defaults: {
            backgroundColor: 0x0A0A0A,
            color: 0x2451FF,
            points: 10,
            maxDistance: 25,
            spacing: 30,
            gyroControls: false,
            mouseControls: true,
            touchControls: true,
            minHeight: 200,
            minWidth: 200
        }
    },
    CELLS: {
        ranges: {
            backgroundColor: [0x000000, 0xffffff],
            color: [0x2451FF, 0xffffff],
            points: [5, 20],
            maxDistance: [10, 50],
            spacing: [10, 50],
            gyroControls: [false, true],
            mouseControls: [true, false],
            touchControls: [true, false],
            minHeight: [200, 800],
            minWidth: [200, 800]
        },
        colors: ['backgroundColor', 'color'],
        defaults: {
            backgroundColor: 0x0A0A0A,
            color: 0x2451FF,
            points: 10,
            maxDistance: 25,
            spacing: 30,
            gyroControls: false,
            mouseControls: true,
            touchControls: true,
            minHeight: 200,
            minWidth: 200
        }
    },
    TRUNK: {
        ranges: {
            backgroundColor: [0x000000, 0xffffff],
            color: [0x2451FF, 0xffffff],
            points: [5, 20],
            maxDistance: [10, 50],
            spacing: [10, 50],
            gyroControls: [false, true],
            mouseControls: [true, false],
            touchControls: [true, false],
            minHeight: [200, 800],
            minWidth: [200, 800]
        },
        colors: ['backgroundColor', 'color'],
        defaults: {
            backgroundColor: 0x0A0A0A,
            color: 0x2451FF,
            points: 10,
            maxDistance: 25,
            spacing: 30,
            gyroControls: false,
            mouseControls: true,
            touchControls: true,
            minHeight: 200,
            minWidth: 200
        }
    }
};

// Helper functions
function getEffectConfig(effectName) {
    return VANTA_CONFIG[effectName];
}

function getEffectDefaults(effectName) {
    return VANTA_CONFIG[effectName]?.defaults || {};
}

function getEffectRanges(effectName) {
    return VANTA_CONFIG[effectName]?.ranges || {};
}

function getEffectColors(effectName) {
    return VANTA_CONFIG[effectName]?.colors || [];
}

// Export the configuration and helper functions
window.VANTA_CONFIG = VANTA_CONFIG;
window.getEffectConfig = getEffectConfig;
window.getEffectDefaults = getEffectDefaults;
window.getEffectRanges = getEffectRanges;
window.getEffectColors = getEffectColors; 