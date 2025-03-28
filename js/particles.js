// Particle System Implementation
class ParticleSystem {
    constructor(scene) {
        this.scene = scene;
        this.particleCount = window.innerWidth < 768 ? 1000 : 2000;
        this.particleSystem = null;
        this.lastTime = performance.now();
        this.frameCount = 0;
        this.fps = 60;
    }

    init() {
        try {
            // Check if Three.js is loaded
            if (typeof THREE === 'undefined') {
                console.error('Three.js is not loaded');
                return;
            }
            
            // Check WebGL support
            if (!this.checkWebGLSupport()) {
                console.error('WebGL not supported');
                return;
            }
            
            this.createParticles();
        } catch (error) {
            console.error('Failed to initialize particle system:', error);
        }
    }

    checkWebGLSupport() {
        try {
            const canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext && 
                (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        } catch (e) {
            return false;
        }
    }

    createParticles() {
        // Create a basic geometry for particles
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(this.particleCount * 3);
        const colors = new Float32Array(this.particleCount * 3);
        const sizes = new Float32Array(this.particleCount);
        
        const color1 = new THREE.Color(0x2D5BFF);
        const color2 = new THREE.Color(0x7B68EE);
        
        for (let i = 0; i < this.particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 20;
            positions[i + 1] = (Math.random() - 0.5) * 20;
            positions[i + 2] = (Math.random() - 0.5) * 20;
            
            const mixFactor = Math.random();
            const particleColor = color1.clone().lerp(color2, mixFactor);
            
            colors[i] = particleColor.r;
            colors[i + 1] = particleColor.g;
            colors[i + 2] = particleColor.b;
            
            sizes[i/3] = Math.random() * 0.08 + 0.02;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        
        // Create shader material
        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0.0 },
                pointTexture: { 
                    value: new THREE.TextureLoader().load('https://threejs.org/examples/textures/sprites/disc.png', 
                        // Success callback
                        () => {
                            console.log('Particle texture loaded successfully');
                        },
                        // Progress callback
                        (xhr) => {
                            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                        },
                        // Error callback
                        (error) => {
                            console.error('Error loading particle texture:', error);
                            // Fallback to a basic circle texture
                            this.createFallbackTexture();
                        }
                    )
                }
            },
            vertexShader: `
                attribute float size;
                varying vec3 vColor;
                uniform float time;
                
                void main() {
                    vColor = color;
                    vec3 pos = position;
                    
                    // More interesting particle movement
                    float speed = 0.3;
                    float amplitude = 0.1;
                    pos.x += sin((pos.y + time) * speed) * amplitude;
                    pos.y += cos((pos.z + time) * speed) * amplitude;
                    pos.z += sin((pos.x + time) * speed) * amplitude;
                    
                    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                    gl_PointSize = size * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                uniform sampler2D pointTexture;
                varying vec3 vColor;
                
                void main() {
                    gl_FragColor = vec4(vColor, 1.0);
                    gl_FragColor = gl_FragColor * texture2D(pointTexture, gl_PointCoord);
                    
                    // Enhance particle appearance
                    float brightness = 1.2;
                    gl_FragColor.rgb *= brightness;
                    
                    // Smooth edges
                    if (gl_FragColor.a < 0.3) discard;
                }
            `,
            blending: THREE.AdditiveBlending,
            depthTest: false,
            transparent: true,
            vertexColors: true
        });
        
        // Clean up existing particle system if it exists
        if (this.particleSystem) {
            this.cleanup();
        }
        
        this.particleSystem = new THREE.Points(geometry, material);
        this.scene.add(this.particleSystem);
    }

    createFallbackTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        
        ctx.beginPath();
        ctx.arc(32, 32, 16, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        
        const texture = new THREE.CanvasTexture(canvas);
        if (this.particleSystem && this.particleSystem.material) {
            this.particleSystem.material.uniforms.pointTexture.value = texture;
        }
    }

    update(time) {
        if (this.particleSystem && this.particleSystem.material) {
            this.particleSystem.material.uniforms.time.value = time;
            this.updatePerformance();
            this.particleSystem.rotation.y = time * 0.05;
        }
    }

    updatePerformance() {
        this.frameCount++;
        const currentTime = performance.now();
        if (currentTime - this.lastTime >= 1000) {
            this.fps = this.frameCount;
            this.frameCount = 0;
            this.lastTime = currentTime;
            
            if (this.fps < 30 && this.particleCount > 500) {
                this.particleCount = Math.max(500, this.particleCount - 100);
                this.recreateParticles();
            } else if (this.fps > 55 && this.particleCount < 2000) {
                this.particleCount = Math.min(2000, this.particleCount + 100);
                this.recreateParticles();
            }
        }
    }

    recreateParticles() {
        this.cleanup();
        this.createParticles();
    }

    cleanup() {
        if (this.particleSystem) {
            if (this.particleSystem.geometry) {
                this.particleSystem.geometry.dispose();
            }
            if (this.particleSystem.material) {
                this.particleSystem.material.dispose();
            }
            this.scene.remove(this.particleSystem);
            this.particleSystem = null;
        }
    }

    fallbackBackground() {
        document.body.style.background = 'linear-gradient(45deg, #2D5BFF, #7B68EE)';
    }

    onResize() {
        if (this.particleSystem) {
            const scale = window.innerWidth < 768 ? 0.5 : 1;
            this.particleSystem.scale.set(scale, scale, scale);
        }
    }
}

// Export the ParticleSystem class
window.ParticleSystem = ParticleSystem;

function createEnhancedParticles() {
    createBackgroundParticles();
    createFlowFieldParticles();
    createInteractiveParticles();
    
    // Initialize flow field
    initFlowField();
}

// Add all the particle system functions here
// (createBackgroundParticles, createFlowFieldParticles, etc.) 