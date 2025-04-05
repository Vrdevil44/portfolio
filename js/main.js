// Enhanced JavaScript for interactive elements and animations

// Global variables
let isAnimating = false;
let vantaEffect = null;

// Theme management
const defaultTheme = {
    primaryAccent: '#2451FF',
    secondaryAccent: '#7B68EE',
    textPrimary: '#FFFFFF',
    textSecondary: '#A0A0A0',
    backgroundPrimary: '#0A0A0A',
    backgroundSecondary: '#1A1A1A',
    glassBackground: 'rgba(10, 10, 10, 0.8)'
};

function getCurrentTheme() {
    const savedTheme = localStorage.getItem('portfolioTheme');
    return savedTheme ? JSON.parse(savedTheme) : defaultTheme;
}

function applyTheme(theme) {
    Object.entries(theme).forEach(([key, value]) => {
        document.documentElement.style.setProperty(
            `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`,
            value
        );
    });
    localStorage.setItem('portfolioTheme', JSON.stringify(theme));
}

function resetTheme() {
    const defaultTheme = {
        primaryAccent: '#2451FF',
        secondaryAccent: '#7B68EE',
        textPrimary: '#FFFFFF',
        textSecondary: '#A0A0A0',
        backgroundPrimary: '#0A0A0A',
        backgroundSecondary: '#1A1A1A',
        glassOpacity: 0.8,
        glassBlur: '10px',
        glowIntensity: 0.5,
        borderGlow: 0.3,
        transitionSpeed: '0.3s'
    };

    // Reset all CSS variables
    document.documentElement.style.setProperty('--primary-accent', defaultTheme.primaryAccent);
    document.documentElement.style.setProperty('--secondary-accent', defaultTheme.secondaryAccent);
    document.documentElement.style.setProperty('--text-primary', defaultTheme.textPrimary);
    document.documentElement.style.setProperty('--text-secondary', defaultTheme.textSecondary);
    document.documentElement.style.setProperty('--background-primary', defaultTheme.backgroundPrimary);
    document.documentElement.style.setProperty('--background-secondary', defaultTheme.backgroundSecondary);
    
    // Reset effect intensities
    document.documentElement.style.setProperty('--glass-opacity', defaultTheme.glassOpacity);
    document.documentElement.style.setProperty('--glass-blur', defaultTheme.glassBlur);
    document.documentElement.style.setProperty('--glow-intensity', defaultTheme.glowIntensity);
    document.documentElement.style.setProperty('--border-glow', defaultTheme.borderGlow);
    document.documentElement.style.setProperty('--transition-speed', defaultTheme.transitionSpeed);

    // Convert hex to RGB for the primary accent
    const primaryRGB = hexToRgb(defaultTheme.primaryAccent);
    document.documentElement.style.setProperty('--primary-accent-rgb', primaryRGB);

    // Convert hex to RGB for the secondary accent
    const secondaryRGB = hexToRgb(defaultTheme.secondaryAccent);
    document.documentElement.style.setProperty('--secondary-accent-rgb', secondaryRGB);

    // Update all effects
    updateGradients();
    updateGlowEffects();
    updateBorderEffects();

    // Reset sliders to default values
    const sliders = document.querySelectorAll('.theme-slider');
    sliders.forEach(slider => {
        const property = slider.dataset.slider;
        switch(property) {
            case 'glass-opacity':
                slider.value = defaultTheme.glassOpacity;
                slider.nextElementSibling.textContent = `${defaultTheme.glassOpacity * 100}%`;
                break;
            case 'glass-blur':
                slider.value = parseInt(defaultTheme.glassBlur);
                slider.nextElementSibling.textContent = defaultTheme.glassBlur;
                break;
            case 'glow-intensity':
                slider.value = defaultTheme.glowIntensity;
                slider.nextElementSibling.textContent = `${defaultTheme.glowIntensity * 100}%`;
                break;
            case 'border-glow':
                slider.value = defaultTheme.borderGlow;
                slider.nextElementSibling.textContent = `${defaultTheme.borderGlow * 100}%`;
                break;
            case 'transition-speed':
                slider.value = parseFloat(defaultTheme.transitionSpeed);
                slider.nextElementSibling.textContent = defaultTheme.transitionSpeed;
                break;
        }
    });

    // Reset color pickers
    const colorPickers = document.querySelectorAll('.color-picker');
    colorPickers.forEach(picker => {
        const property = picker.dataset.color;
        switch(property) {
            case 'primary-accent':
                picker.value = defaultTheme.primaryAccent;
                break;
            case 'secondary-accent':
                picker.value = defaultTheme.secondaryAccent;
                break;
            case 'text-primary':
                picker.value = defaultTheme.textPrimary;
                break;
            case 'text-secondary':
                picker.value = defaultTheme.textSecondary;
                break;
            case 'background-primary':
                picker.value = defaultTheme.backgroundPrimary;
                break;
            case 'background-secondary':
                picker.value = defaultTheme.backgroundSecondary;
                break;
        }
    });

    // Reset theme preset select if it exists
    const presetSelect = document.querySelector('.theme-select');
    if (presetSelect) {
        presetSelect.value = 'dark';
    }

    // Save to localStorage
    localStorage.setItem('portfolioTheme', JSON.stringify(defaultTheme));
}

// Vanta background configuration
const VANTA_EFFECTS = [
    { name: 'WAVES', init: VANTA.WAVES },
    { name: 'FOG', init: VANTA.FOG },
    { name: 'GLOBE', init: VANTA.GLOBE },
    { name: 'NET', init: VANTA.NET },
    { name: 'RINGS', init: VANTA.RINGS },
    { name: 'CELLS', init: VANTA.CELLS },
    { name: 'HALO', init: VANTA.HALO },
    { name: 'DOTS', init: VANTA.DOTS }
];

// Initialize background effect
function initBackground() {
    const container = document.getElementById('vanta-background');
    if (!container) {
        console.warn('Vanta background container not found');
        return;
    }

    // Check if Three.js and Vanta are available
    if (typeof THREE === 'undefined') {
        console.error('Three.js not loaded');
        return;
    }

    if (typeof VANTA === 'undefined') {
        console.error('Vanta.js not loaded');
        return;
    }

    try {
        // Cleanup any existing effect
        if (vantaEffect) {
            vantaEffect.destroy();
            vantaEffect = null;
        }

        // Get a random effect every time
        const randomEffect = VANTA_EFFECTS[Math.floor(Math.random() * VANTA_EFFECTS.length)];
        
        // Base configuration
        const config = {
            el: container,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            color: '#2451FF', // Fixed primary color for Vanta
            backgroundColor: '#0A0A0A', // Fixed background color for Vanta
            THREE: THREE // Explicitly pass THREE to the effect
        };

        // Initialize the effect
        vantaEffect = randomEffect.init(config);

        // Add resize handler
        window.addEventListener('resize', () => {
            if (vantaEffect) vantaEffect.resize();
        });

    } catch (error) {
        console.error('Error initializing Vanta effect:', error);
        // Fallback to a simple background color
        if (container) {
            container.style.backgroundColor = getComputedStyle(document.documentElement)
                .getPropertyValue('--background-primary').trim() || '#0A0A0A';
        }
    }
}

// Window resize handler
function onWindowResize() {
    // Handle any resize-related updates here
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    // Add any continuous animations here
}

// Navigation functionality
function navSlide() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });
}

// Scroll animation for elements
function scrollEffects() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Skill bar animation
function animateSkillBars() {
    const skillLevels = document.querySelectorAll('.skill-level');
    const skillsSection = document.querySelector('.skills-section');
    
    // Create intersection observer for skills section
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate all skill bars when section is visible
                skillLevels.forEach(level => {
                    const targetWidth = level.style.width || '0%';
                    // First set to 0
                    level.style.width = '0%';
                    // Force reflow
                    level.offsetWidth;
                    // Then animate to target
                    requestAnimationFrame(() => {
                    level.style.width = targetWidth;
                });
                });
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% of the section is visible
    });
    
    // Start observing skills section
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

// Form submission handler
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formValues = Object.fromEntries(formData.entries());
            
            // Show success message
            const formContainer = contactForm.parentElement;
            const successMessage = document.createElement('div');
            successMessage.classList.add('success-message');
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out, ${formValues.name}. I'll get back to you soon.</p>
                <button class="btn primary-btn" id="resetForm">Send Another Message</button>
            `;
            
            // Replace form with success message
            formContainer.innerHTML = '';
            formContainer.appendChild(successMessage);
            
            // Add event listener to reset button
            document.getElementById('resetForm').addEventListener('click', () => {
                formContainer.innerHTML = '';
                formContainer.appendChild(contactForm);
                contactForm.reset();
                setupContactForm();
            });
        });
    }
}

// Loading screen functionality
function initLoadingScreen() {
    return new Promise((resolve) => {
        const progressBar = document.querySelector('.progress-bar');
        const progressText = document.querySelector('.progress-text');
        const introScreen = document.querySelector('.intro-screen');
        let progress = 0;

        // Set initial styles
        if (progressBar) {
            progressBar.style.width = '0%';
            progressBar.style.background = 'linear-gradient(90deg, #2451FF, #7B68EE)';
            progressBar.style.boxShadow = '0 0 20px rgba(36, 81, 255, 0.5), 0 0 40px rgba(36, 81, 255, 0.3)';
        }

        const updateProgress = () => {
            if (progress < 100) {
                progress += 1;
                if (progressBar) {
                    progressBar.style.width = `${progress}%`;
                }
                if (progressText) {
                    progressText.textContent = `${progress}%`;
                    progressText.style.color = '#FFFFFF';
                    progressText.style.textShadow = '0 0 10px rgba(36, 81, 255, 0.5)';
                }
                
                setTimeout(updateProgress, 20);
            } else {
                setTimeout(() => {
                    if (introScreen) {
                        introScreen.style.animation = 'fadeOut 1s ease-in-out forwards';
                        setTimeout(() => {
                            introScreen.style.display = 'none';
                            resolve();
                        }, 1000);
                    } else {
                        resolve();
                    }
                }, 200);
            }
        };

        setTimeout(updateProgress, 100);
    });
}

// Background toggle functionality
function initBackgroundToggle() {
    const toggleBtn = document.querySelector('.background-toggle');
    const toggleContainer = document.querySelector('.background-toggle-container');
    if (!toggleBtn || !toggleContainer) return;

    // Initialize state from localStorage or default to true
    let isBackgroundEnabled = localStorage.getItem('backgroundEnabled') !== 'false';
    updateBackgroundState(isBackgroundEnabled);

    // Add click handler
    toggleBtn.addEventListener('click', () => {
        isBackgroundEnabled = !isBackgroundEnabled;
        updateBackgroundState(isBackgroundEnabled);
        localStorage.setItem('backgroundEnabled', isBackgroundEnabled);
    });
}

function updateBackgroundState(enabled) {
    const background = document.getElementById('vanta-background');
    const toggleBtn = document.querySelector('.background-toggle');
    const blurSlider = document.querySelector('[data-slider="background-blur"]');
    const opacitySlider = document.querySelector('[data-slider="background-opacity"]');
    
    if (background) {
        if (enabled) {
            background.style.opacity = '1';
            background.style.filter = 'none';
            background.style.backdropFilter = 'none';
            background.style.webkitBackdropFilter = 'none';
            background.style.backgroundColor = 'transparent';
        } else {
            const blurValue = blurSlider ? blurSlider.value : 20;
            const opacityValue = opacitySlider ? opacitySlider.value : 15;
            
            background.style.opacity = opacityValue / 100;
            background.style.filter = `blur(${blurValue}px) brightness(0.8)`;
            background.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
        }
    }
    
    if (toggleBtn) {
        toggleBtn.innerHTML = enabled ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        toggleBtn.title = enabled ? 'Hide Background' : 'Show Background';
        toggleBtn.classList.toggle('active', !enabled);
    }
    
    // Only update Vanta effect if it exists and is properly initialized
    if (vantaEffect && typeof vantaEffect.setOptions === 'function') {
        try {
            vantaEffect.setOptions({
                mouseControls: enabled,
                touchControls: enabled
            });
        } catch (error) {
            console.warn('Could not update Vanta effect options:', error);
        }
    }
}

// Cleanup function for Vanta effect
function cleanupVantaEffect() {
    if (vantaEffect) {
        vantaEffect.destroy();
        vantaEffect = null;
    }
}

// Animated text typing effect
function initAnimatedText() {
    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;

    // Remove any existing h1 to avoid duplication
    const existingTitle = heroContent.querySelector('h1');
    if (existingTitle) {
        existingTitle.remove();
    }

    // Create the animated title container
    const animatedTitle = document.createElement('h1');
    animatedTitle.className = 'animated-title';
    animatedTitle.style.opacity = '1';
    heroContent.insertBefore(animatedTitle, heroContent.firstChild);

    const text = 'Vibhu Dikshit';
    let currentChar = 0;

    // Create cursor element
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.textContent = '|';
    animatedTitle.appendChild(cursor);

    // Typing animation with whitespace handling
    function typeChar() {
        if (currentChar < text.length) {
            const char = document.createElement('span');
            
            if (text[currentChar] === ' ') {
                char.className = 'char space gradient-text';
                char.innerHTML = '&nbsp;';
                char.style.marginRight = '0.5em';
            } else {
                char.className = 'char gradient-text';
                char.textContent = text[currentChar];
            }
            
            // Insert before cursor
            animatedTitle.insertBefore(char, cursor);
            
            // Add visible class with slight delay
            setTimeout(() => {
                char.classList.add('visible');
                // Apply current theme colors
                updateGradients();
            }, 50);

            currentChar++;
            setTimeout(typeChar, 150);
        } else {
            // After typing complete
            setTimeout(() => {
                cursor.remove();
                
                // Add glow effect
                animatedTitle.classList.add('glow-effect');
                
                // Update colors one final time
                updateGradients();
                
                // Add hover effects
                animatedTitle.addEventListener('mouseover', () => {
                    gsap.to('.char', {
                        duration: 0.3,
                        scale: 1.1,
                        stagger: {
                            each: 0.05,
                            from: "center"
                        }
                    });
                });

                animatedTitle.addEventListener('mouseout', () => {
                    gsap.to('.char', {
                        duration: 0.3,
                        scale: 1,
                        stagger: {
                            each: 0.05,
                            from: "edges"
                        }
                    });
                });
            }, 500);
        }
    }

    // Start typing animation
    setTimeout(typeChar, 500);
}

// Settings Panel Tab Functionality
function initSettingsTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding pane
            const tabId = `${button.dataset.tab}-tab`;
            const pane = document.getElementById(tabId);
            if (pane) {
                pane.classList.add('active');
                
                // Add subtle animation
                gsap.from(pane, {
            opacity: 0,
                    y: 10,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });
    });
}

function initSettingsPanel() {
    const settingsPanel = document.querySelector('.settings-panel');
    const settingsToggle = document.querySelector('.settings-toggle');
    if (!settingsPanel || !settingsToggle) return;

    // Set initial HTML structure
    settingsPanel.innerHTML = `
        <div class="settings-content">
            <div class="settings-header">
                <h3>Settings</h3>
            </div>
            <div class="background-toggle-container">
                <span>Show Background</span>
                <button class="background-toggle">
                    <i class="fas fa-eye"></i>
                </button>
            </div>
            <div class="settings-tabs">
                <button class="tab-button active" data-tab="themes">
                    <i class="fas fa-palette"></i> Themes
                </button>
                <button class="tab-button" data-tab="effects">
                    <i class="fas fa-magic"></i> Effects
                </button>
            </div>
            <div class="tab-content">
                <div id="themes-tab" class="tab-pane active">
                    <div class="theme-options">
                        <!-- Theme options will be inserted here -->
                    </div>
                </div>
                <div id="effects-tab" class="tab-pane">
                    <div class="effect-options">
                        <!-- Effect options will be inserted here -->
                    </div>
                </div>
            </div>
        </div>
    `;

    // Initialize theme options
    initThemeOptions();
    
    // Initialize effects options
    initEffectOptions();
    
    // Initialize tabs
    initSettingsTabs();
    
    // Initialize background toggle
    initBackgroundToggle();

    let isPanelOpen = false;
    
    settingsToggle.addEventListener('click', () => {
        isPanelOpen = !isPanelOpen;
        settingsPanel.classList.toggle('active');
        settingsToggle.classList.toggle('active');
        
        const icon = settingsToggle.querySelector('i');
        gsap.to(icon, {
            rotation: isPanelOpen ? 90 : 0,
            x: isPanelOpen ? -20 : 0,
            duration: 0.3,
            ease: "power2.inOut"
        });
    });
}

function initThemeActions() {
    const randomBtn = document.querySelector('.random-btn');
    const resetBtn = document.querySelector('.reset-btn');
    
    if (randomBtn) {
        randomBtn.addEventListener('click', () => {
            generateRandomTheme();
            // Add spin animation to icon
            const icon = randomBtn.querySelector('i');
            if (icon) {
                gsap.to(icon, {
                    rotation: "+=360",
                    duration: 0.5,
                    ease: "power2.inOut"
                });
            }
        });
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            resetTheme();
            // Add spin animation to icon
            const icon = resetBtn.querySelector('i');
            if (icon) {
                gsap.to(icon, {
                    rotation: "-=360",
        duration: 0.5,
                    ease: "power2.inOut"
                });
            }
        });
    }
}

function initThemeOptions() {
    const themeOptions = document.querySelector('.theme-options');
    if (!themeOptions) return;

    themeOptions.innerHTML = `
        <div class="theme-section">
            <div class="theme-row">
                <div class="theme-group">
                    <label>Primary Accent</label>
                    <input type="color" class="color-picker" data-color="primary-accent">
                </div>
                <div class="theme-group">
                    <label>Secondary Accent</label>
                    <input type="color" class="color-picker" data-color="secondary-accent">
                </div>
            </div>

            <div class="theme-row">
                <div class="theme-group">
                    <label>Text Color</label>
                    <input type="color" class="color-picker" data-color="text-primary">
                </div>
                <div class="theme-group">
                    <label>Subtext Color</label>
                    <input type="color" class="color-picker" data-color="text-secondary">
                </div>
            </div>

            <div class="theme-row">
                <div class="theme-group">
                    <label>Background</label>
                    <input type="color" class="color-picker" data-color="background-primary">
                </div>
                <div class="theme-group">
                    <label>Bg Accent</label>
                    <input type="color" class="color-picker" data-color="background-secondary">
                </div>
            </div>

            <div class="theme-row full-width">
                <div class="theme-group">
                    <label>Glass Effect</label>
                    <div class="slider-group">
                        <span>Opacity</span>
                        <input type="range" class="theme-slider" data-slider="glass-opacity" min="0" max="1" step="0.05" value="0.8">
                        <span class="slider-value">80%</span>
                    </div>
                    <div class="slider-group">
                        <span>Blur</span>
                        <input type="range" class="theme-slider" data-slider="glass-blur" min="0" max="20" step="1" value="10">
                        <span class="slider-value">10px</span>
                    </div>
                </div>
            </div>

            <div class="theme-row full-width">
                <div class="theme-group">
                    <label>Effects</label>
                    <div class="slider-group">
                        <span>Glow Intensity</span>
                        <input type="range" class="theme-slider" data-slider="glow-intensity" min="0" max="1" step="0.05" value="0.5">
                        <span class="slider-value">50%</span>
                    </div>
                    <div class="slider-group">
                        <span>Border Glow</span>
                        <input type="range" class="theme-slider" data-slider="border-glow" min="0" max="1" step="0.05" value="0.3">
                        <span class="slider-value">30%</span>
                    </div>
                </div>
            </div>

            <div class="theme-row full-width">
                <div class="theme-group">
                    <label>Animation Speed</label>
                    <div class="slider-group">
                        <span>Transitions</span>
                        <input type="range" class="theme-slider" data-slider="transition-speed" min="0.1" max="2" step="0.1" value="0.3">
                        <span class="slider-value">0.3s</span>
                    </div>
                </div>
            </div>

            <div class="theme-row">
                <select class="theme-select" data-control="preset-theme">
                    <option value="dark">Dark Theme</option>
                    <option value="light">Light Theme</option>
                    <option value="cyberpunk">Cyberpunk</option>
                    <option value="nature">Nature</option>
                    <option value="sunset">Sunset</option>
                </select>
                <div class="theme-actions">
                    <button class="theme-btn random-btn" data-action="random">
                        <i class="fas fa-random"></i>
                    </button>
                    <button class="theme-btn reset-btn" data-action="reset">
                        <i class="fas fa-undo"></i>
                    </button>
                </div>
            </div>
        </div>
    `;

    // Initialize color pickers
    initColorPickers();
    
    // Initialize sliders
    initThemeSliders();
    
    // Initialize theme actions (buttons and presets)
    initThemeActions();
}

// Add new function to handle theme sliders
function initThemeSliders() {
    const sliders = document.querySelectorAll('.theme-slider');
    
    sliders.forEach(slider => {
        const valueDisplay = slider.nextElementSibling;
        
        // Update value display and apply effect
        const updateSlider = () => {
            const value = slider.value;
            const property = slider.dataset.slider;
            
            switch(property) {
                case 'glass-opacity':
                    valueDisplay.textContent = `${Math.round(value * 100)}%`;
                    document.documentElement.style.setProperty('--glass-opacity', value);
                    break;
                case 'glass-blur':
                    valueDisplay.textContent = `${value}px`;
                    document.documentElement.style.setProperty('--glass-blur', `${value}px`);
                    break;
                case 'glow-intensity':
                    valueDisplay.textContent = `${Math.round(value * 100)}%`;
                    document.documentElement.style.setProperty('--glow-intensity', value);
                    updateGlowEffects();
                    break;
                case 'border-glow':
                    valueDisplay.textContent = `${Math.round(value * 100)}%`;
                    document.documentElement.style.setProperty('--border-glow', value);
                    updateBorderEffects();
                    break;
                case 'transition-speed':
                    valueDisplay.textContent = `${value}s`;
                    document.documentElement.style.setProperty('--transition-speed', `${value}s`);
                    break;
            }
        };
        
        slider.addEventListener('input', updateSlider);
        updateSlider(); // Initialize value
    });
}

// Add new functions for updating effects
function updateGlowEffects() {
    const intensity = getComputedStyle(document.documentElement).getPropertyValue('--glow-intensity').trim();
    const primary = getComputedStyle(document.documentElement).getPropertyValue('--primary-accent').trim();
    
    // Update text glow
    document.documentElement.style.setProperty(
        '--text-glow',
        `0 0 ${10 * intensity}px rgba(${hexToRgb(primary)}, ${intensity})`
    );
    
    // Update box glow
    document.documentElement.style.setProperty(
        '--box-glow',
        `0 0 ${20 * intensity}px rgba(${hexToRgb(primary)}, ${intensity * 0.5})`
    );
}

function updateBorderEffects() {
    const intensity = getComputedStyle(document.documentElement).getPropertyValue('--border-glow').trim();
    const primary = getComputedStyle(document.documentElement).getPropertyValue('--primary-accent').trim();
    const secondary = getComputedStyle(document.documentElement).getPropertyValue('--secondary-accent').trim();
    
    document.documentElement.style.setProperty(
        '--border-glow-color',
        `linear-gradient(45deg, 
            rgba(${hexToRgb(primary)}, ${intensity}), 
            rgba(${hexToRgb(secondary)}, ${intensity})
        )`
    );
}

// Helper function to convert hex to rgb
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 
        `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
        '0, 0, 0';
}

function initEffectOptions() {
    const effectOptions = document.querySelector('.effect-options');
    if (!effectOptions) return;
    
    effectOptions.innerHTML = `
        <div class="theme-section">
            <div class="theme-row full-width">
                <div class="theme-group">
                    <label>Background Filter</label>
                    <div class="slider-group">
                        <span>Blur Intensity</span>
                        <input type="range" class="theme-slider" data-slider="background-blur" min="0" max="40" step="1" value="20">
                        <span class="slider-value">20px</span>
                    </div>
                    <div class="slider-group">
                        <span>Background Opacity</span>
                        <input type="range" class="theme-slider" data-slider="background-opacity" min="0" max="100" step="1" value="15">
                        <span class="slider-value">15%</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Initialize the sliders
    initBackgroundFilterSliders();
}

function initBackgroundFilterSliders() {
    const sliders = document.querySelectorAll('.theme-slider');
    
    sliders.forEach(slider => {
        const valueDisplay = slider.nextElementSibling;
        const property = slider.dataset.slider;
        
        // Update value display and apply effect
        const updateSlider = () => {
            const value = slider.value;
            const background = document.getElementById('vanta-background');
            
            if (background) {
                switch(property) {
                    case 'background-blur':
                        valueDisplay.textContent = `${value}px`;
                        background.style.filter = `blur(${value}px) brightness(0.8)`;
                        break;
                    case 'background-opacity':
                        valueDisplay.textContent = `${value}%`;
                        background.style.opacity = value / 100;
                        break;
                }
            }
        };
        
        // Set initial values
        updateSlider();
        
        // Add event listener for changes
        slider.addEventListener('input', updateSlider);
    });
}

function initColorPickers() {
    const colorInputs = document.querySelectorAll('.theme-color');
    const glassOpacity = document.querySelector('.glass-opacity');
    const glowIntensity = document.querySelector('.glow-intensity');
    const presetSelect = document.getElementById('themePreset');
    const resetThemeBtn = document.getElementById('resetTheme');
    const randomThemeBtn = document.getElementById('randomTheme');

    // Theme presets
    const themePresets = {
        dark: {
            primaryAccent: '#2451FF',
            secondaryAccent: '#7B68EE',
            textPrimary: '#FFFFFF',
            textSecondary: '#A0A0A0',
            backgroundPrimary: '#0A0A0A',
            backgroundSecondary: '#1A1A1A',
            glassBackground: '#0A0A0A',
            glassOpacity: 80,
            glowIntensity: 50
        },
        light: {
            primaryAccent: '#2451FF',
            secondaryAccent: '#7B68EE',
            textPrimary: '#1A1A1A',
            textSecondary: '#4A4A4A',
            backgroundPrimary: '#FFFFFF',
            backgroundSecondary: '#F0F0F0',
            glassBackground: '#FFFFFF',
            glassOpacity: 80,
            glowIntensity: 30
        },
        cyberpunk: {
            primaryAccent: '#FF2E6C',
            secondaryAccent: '#00FF9F',
            textPrimary: '#FFFFFF',
            textSecondary: '#00FF9F',
            backgroundPrimary: '#120458',
            backgroundSecondary: '#1A0B2E',
            glassBackground: '#120458',
            glassOpacity: 85,
            glowIntensity: 70
        },
        nature: {
            primaryAccent: '#4CAF50',
            secondaryAccent: '#8BC34A',
            textPrimary: '#FFFFFF',
            textSecondary: '#B0BEC5',
            backgroundPrimary: '#1B5E20',
            backgroundSecondary: '#2E7D32',
            glassBackground: '#1B5E20',
            glassOpacity: 75,
            glowIntensity: 40
        },
        sunset: {
            primaryAccent: '#FF9800',
            secondaryAccent: '#FF5722',
            textPrimary: '#FFFFFF',
            textSecondary: '#FFCCBC',
            backgroundPrimary: '#BF360C',
            backgroundSecondary: '#D84315',
            glassBackground: '#BF360C',
            glassOpacity: 70,
            glowIntensity: 60
        }
    };

    // Update theme when color inputs change
    colorInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const property = e.target.dataset.theme;
            const value = e.target.value;
            updateThemeProperty(property, value);
        });
    });

    // Update glass opacity
    if (glassOpacity) {
        glassOpacity.addEventListener('input', (e) => {
            const value = e.target.value;
            document.querySelector('.opacity-value').textContent = `${value}%`;
            const glassColor = document.querySelector('[data-theme="glassBackground"]').value;
            updateThemeProperty('glassBackground', glassColor, value);
        });
    }

    // Update glow intensity
    if (glowIntensity) {
        glowIntensity.addEventListener('input', (e) => {
            const value = e.target.value;
            document.querySelector('.intensity-value').textContent = `${value}%`;
            updateGlowIntensity(value);
        });
    }

    // Handle preset selection
    if (presetSelect) {
        presetSelect.addEventListener('change', () => {
            const preset = themePresets[presetSelect.value];
            if (preset) {
                applyThemePreset(preset);
            }
        });
    }

    // Save theme
    if (randomThemeBtn) {
        randomThemeBtn.addEventListener('click', generateRandomTheme);
    }

    // Reset theme
    if (resetThemeBtn) {
        resetThemeBtn.addEventListener('click', () => {
            applyThemePreset(themePresets.dark);
            presetSelect.value = 'dark';
        });
    }
}

function generateRandomTheme() {
    const randomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const primaryAccent = randomColor();
    const secondaryAccent = randomColor();
    const primaryRGB = hexToRgb(primaryAccent);
    const secondaryRGB = hexToRgb(secondaryAccent);

    const randomTheme = {
        primaryAccent: primaryAccent,
        secondaryAccent: secondaryAccent,
        textPrimary: '#FFFFFF',
        textSecondary: '#A0A0A0',
        backgroundPrimary: randomColor(),
        backgroundSecondary: randomColor()
    };

    // Update RGB variables
    document.documentElement.style.setProperty('--primary-accent-rgb', primaryRGB);
    document.documentElement.style.setProperty('--secondary-accent-rgb', secondaryRGB);

    // Apply the random theme
    applyThemePreset(randomTheme);

    // Update gradients and effects
    updateGradients();
    updateGlowEffects();
    updateBorderEffects();

    // Do not update Vanta effect colors
}

function updateThemeProperty(property, value, opacity = null) {
    const cssProperty = property.replace(/([A-Z])/g, '-$1').toLowerCase();
    if (property === 'glassBackground') {
        const alpha = opacity ? opacity / 100 : 0.8;
        const rgba = hexToRGBA(value, alpha);
        document.documentElement.style.setProperty(`--glass-bg`, rgba);
    } else {
        document.documentElement.style.setProperty(`--${cssProperty}`, value);
    }
    
    // Update related effects
    updateEffects(property, value);
}

function updateEffects(property, value) {
    // Update gradients, glows, and other effects based on the changed property
    if (property === 'primaryAccent' || property === 'secondaryAccent') {
        updateGradients();
        updateGlowEffects();
    }
}

function updateGradients() {
    const primary = getComputedStyle(document.documentElement).getPropertyValue('--primary-accent').trim();
    const secondary = getComputedStyle(document.documentElement).getPropertyValue('--secondary-accent').trim();
    const intensity = getComputedStyle(document.documentElement).getPropertyValue('--glow-intensity').trim() || '0.5';
    
    // Update all gradient text elements
    document.querySelectorAll('.gradient-text, .animated-title .char').forEach(element => {
        // Apply gradient background
        element.style.backgroundImage = `linear-gradient(45deg, ${primary}, ${secondary})`;
        element.style.webkitBackgroundClip = 'text';
        element.style.backgroundClip = 'text';
        element.style.webkitTextFillColor = 'transparent';
        
        // Apply glow effect
        const glowColor = `rgba(${hexToRgb(primary)}, ${intensity})`;
        element.style.textShadow = `0 0 10px ${glowColor}, 0 0 20px ${glowColor}`;
    });

    // Update the animated title container
    const animatedTitle = document.querySelector('.animated-title');
    if (animatedTitle) {
        animatedTitle.style.backgroundImage = `linear-gradient(45deg, ${primary}, ${secondary})`;
        animatedTitle.style.webkitBackgroundClip = 'text';
        animatedTitle.style.backgroundClip = 'text';
        animatedTitle.style.webkitTextFillColor = 'transparent';
        
        // Apply glow effect to the title
        const glowColor = `rgba(${hexToRgb(primary)}, ${intensity})`;
        animatedTitle.style.textShadow = `0 0 10px ${glowColor}, 0 0 20px ${glowColor}`;
    }
}

function updateGlowIntensity(intensity) {
    const primary = getComputedStyle(document.documentElement).getPropertyValue('--primary-accent').trim();
    const alpha = intensity / 100;
    document.documentElement.style.setProperty('--glow-intensity', alpha);
    updateGlowEffects();
}

function hexToRGBA(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function applyThemePreset(preset) {
    Object.entries(preset).forEach(([property, value]) => {
        if (property === 'glassOpacity') {
            const glassOpacitySlider = document.querySelector('.glass-opacity');
            if (glassOpacitySlider) {
                glassOpacitySlider.value = value;
                document.querySelector('.opacity-value').textContent = `${value}%`;
            }
        } else if (property === 'glowIntensity') {
            const glowIntensitySlider = document.querySelector('.glow-intensity');
            if (glowIntensitySlider) {
                glowIntensitySlider.value = value;
                document.querySelector('.intensity-value').textContent = `${value}%`;
            }
            updateGlowIntensity(value);
        } else {
            const input = document.querySelector(`[data-theme="${property}"]`);
            if (input) {
                input.value = value;
            }
            updateThemeProperty(property, value);
        }
    });
}

// Initialize animations in sequence
async function initializeAnimations() {
    try {
        // First initialize background
        initBackground();
        
        // Initialize background toggle
        initBackgroundToggle();
        
        // Initialize settings panel
        initSettingsPanel();
        
        // Wait for loading screen to complete
        await initLoadingScreen();
        
        // Then initialize animated text
        initAnimatedText();
    
    // Setup navigation
    navSlide();
    
    // Setup scroll effects
    scrollEffects();
    
    // Setup skill bar animations
    animateSkillBars();
    
    // Setup contact form
    setupContactForm();
    
    // Add animate-on-scroll class to elements
    document.querySelectorAll('.section-title, .glass-card, .timeline-item, .education-item').forEach(element => {
        element.classList.add('animate-on-scroll');
    });

    // Animate logo letters
    const logoLetters = document.querySelectorAll('.logo-letter');
        if (logoLetters.length > 0) {
    logoLetters.forEach((letter, index) => {
        gsap.to(letter, {
            y: -3,
                    duration: 1.5,
                    yoyo: true,
            repeat: -1,
            ease: "power1.inOut",
            delay: index * 0.5
        });
    });
        }

        // Initialize header logo animations
    animateHeaderLogo();

        // Initialize hover effects
        initializeHoverEffects();

        // Add cleanup on page unload
        window.addEventListener('beforeunload', cleanupVantaEffect);
    } catch (error) {
        console.error('Error initializing animations:', error);
    }
}

// Separate hover effects initialization
function initializeHoverEffects() {
    // Animate name on hover
    const nameTitle = document.querySelector('.name-title');
    if (nameTitle) {
        nameTitle.addEventListener('mouseover', () => {
            gsap.to(nameTitle, {
                duration: 0.3,
                scale: 1.05,
                letterSpacing: "2px",
                filter: "drop-shadow(0 0 20px rgba(45, 91, 255, 0.5))",
                ease: "power2.out"
            });
        });

        nameTitle.addEventListener('mouseout', () => {
            gsap.to(nameTitle, {
                duration: 0.3,
                scale: 1,
                letterSpacing: "0px",
                filter: "none",
                ease: "power2.in"
            });
        });
    }

    // Animate profession tags
    const professions = document.querySelectorAll('.profession');
    professions.forEach(profession => {
        profession.addEventListener('mouseover', () => {
            gsap.to(profession, {
                duration: 0.3,
                y: -3,
                backgroundColor: "rgba(45, 91, 255, 0.2)",
                boxShadow: "0 5px 15px rgba(45, 91, 255, 0.2)",
                ease: "power2.out"
            });
        });

        profession.addEventListener('mouseout', () => {
            gsap.to(profession, {
                duration: 0.3,
                y: 0,
                backgroundColor: "rgba(45, 91, 255, 0.1)",
                boxShadow: "none",
                ease: "power2.in"
            });
        });
    });

    // Add gradient text follow effect for tagline
    const tagline = document.querySelector('.tagline');
    if (tagline) {
        // Remove old gradient overlay if exists
        const oldOverlay = tagline.querySelector('.gradient-cursor-overlay');
        if (oldOverlay) {
            oldOverlay.remove();
        }

        // Update gradient position on mouse move
        tagline.addEventListener('mousemove', (e) => {
            const rect = tagline.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            tagline.style.backgroundImage = `
                linear-gradient(
                    45deg,
                    var(--primary-accent),
                    var(--secondary-accent) 45%,
                    var(--text-primary) 50%,
                    var(--secondary-accent) 55%,
                    var(--primary-accent)
                )
            `;
            tagline.style.backgroundSize = '200% 200%';
            tagline.style.backgroundPosition = `${(x / rect.width) * 100}% ${(y / rect.height) * 100}%`;
            tagline.style.webkitBackgroundClip = 'text';
            tagline.style.backgroundClip = 'text';
            tagline.style.webkitTextFillColor = 'transparent';
        });

        // Reset on mouse leave
        tagline.addEventListener('mouseleave', () => {
            tagline.style.backgroundImage = 'none';
            tagline.style.webkitTextFillColor = 'initial';
            tagline.style.color = 'var(--text-primary)';
            tagline.style.textShadow = 'none';
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    // Add a small delay to ensure all scripts are loaded
    setTimeout(() => {
        initializeAnimations().catch(error => {
            console.error('Error in initialization:', error);
        });
    }, 100);
});

// Add this new function for the header logo animations
function animateHeaderLogo() {
    const letterV = document.querySelector('.nav-logo .logo-letter:first-child');
    const letterD = document.querySelector('.nav-logo .logo-letter:last-child');
    
    // Create a sequence of animations using GSAP timeline
    const timeline = gsap.timeline({
        repeat: -1, // Infinite loop
        repeatDelay: 0.5 // Pause between sequences
    });

    // Animation 1: Floating effect
    timeline.to([letterV, letterD], {
        y: -10,
        duration: 1,
        ease: "power1.inOut",
        stagger: 0.2,
        filter: "drop-shadow(0 0 10px rgba(45, 91, 255, 0.5))"
    })
    .to([letterV, letterD], {
        y: 0,
        duration: 1,
        ease: "power1.inOut",
        stagger: 0.2
    });

    // Animation 2: 3D Spin
    timeline.to([letterV, letterD], {
        rotateY: 360,
        duration: 1.5,
        ease: "power2.inOut",
        stagger: 0.2,
        filter: "drop-shadow(0 0 15px rgba(45, 91, 255, 0.7))"
    });

    // Animation 3: Bounce and Scale
    timeline.to([letterV, letterD], {
        scale: 1.2,
        y: -5,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.2,
        filter: "drop-shadow(0 0 20px rgba(45, 91, 255, 0.8))"
    })
    .to([letterV, letterD], {
        scale: 1,
        y: 0,
        duration: 0.5,
        ease: "bounce.out",
        stagger: 0.2
    });

    // Animation 4: Shake and Glow
    timeline.to([letterV, letterD], {
        x: -5,
        rotation: -5,
        duration: 0.1,
        ease: "none",
        stagger: 0.1,
        repeat: 5,
        yoyo: true,
        filter: "drop-shadow(0 0 25px rgba(45, 91, 255, 0.9))"
    });

    // Animation 5: Smooth Wave
    timeline.to([letterV, letterD], {
        rotation: 10,
        duration: 1,
        ease: "sine.inOut",
        stagger: 0.2,
        filter: "drop-shadow(0 0 15px rgba(45, 91, 255, 0.6))"
    })
    .to([letterV, letterD], {
        rotation: 0,
        duration: 1,
        ease: "sine.inOut",
        stagger: 0.2
    });

    // Hover effect
    const logoContainer = document.querySelector('.nav-logo');
    
    logoContainer.addEventListener('mouseenter', () => {
        gsap.to([letterV, letterD], {
            scale: 1.3,
            duration: 0.3,
            filter: "drop-shadow(0 0 30px rgba(45, 91, 255, 1))",
            stagger: 0.1,
            ease: "back.out(1.7)"
        });
    });

    logoContainer.addEventListener('mouseleave', () => {
        gsap.to([letterV, letterD], {
            scale: 1,
            duration: 0.3,
            filter: "drop-shadow(0 0 10px rgba(45, 91, 255, 0.5))",
            stagger: 0.1,
            ease: "back.out(1.7)"
        });
    });
}

// Add a function to force a new random effect
function forceNewRandomEffect() {
    if (vantaEffect) {
        vantaEffect.destroy();
    }
    
    // Remove the last effect from localStorage to ensure randomness
    localStorage.removeItem('lastVantaEffect');
    
    // Initialize with a new random effect
    initBackground();
}

// Add a keyboard shortcut for testing (Press 'R' to randomize)
document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'r') {
        forceNewRandomEffect();
    }
});

// Initialize theme immediately
document.addEventListener('DOMContentLoaded', function() {
    // Apply default theme immediately
    initializeTheme();
    
    // Initialize Vanta background with default theme colors
    initVantaBackground();
    
    // Remove loading screen quickly
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
    
    // Remove intro screen quickly
        const introScreen = document.querySelector('.intro-screen');
        if (introScreen) {
        introScreen.style.opacity = '0';
            setTimeout(() => {
                introScreen.style.display = 'none';
        }, 500);
    }
    
    // Show content immediately
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.opacity = '1';
    }
    
    // Initialize other components
    initAnimatedText();
    initThemeControls();
    initBackgroundControls();
});

function initializeTheme() {
    // Set default theme variables
    const defaultTheme = {
        primaryAccent: '#2451FF',
        primaryAccentRgb: '45, 91, 255',
        secondaryAccent: '#7B68EE',
        secondaryAccentRgb: '123, 104, 238',
        textPrimary: '#FFFFFF',
        textSecondary: '#A0A0A0',
        backgroundPrimary: '#0A0A0A',
        backgroundSecondary: '#1A1A1A',
        glassOpacity: 0.8,
        glassBlur: '10px',
        glowIntensity: 0.5,
        borderGlow: 0.3
    };

    // Apply theme immediately
    applyTheme(defaultTheme);
    
    // Save theme to localStorage
    localStorage.setItem('theme', JSON.stringify(defaultTheme));
}

function applyTheme(theme) {
    const root = document.documentElement;
    
    // Apply colors
    root.style.setProperty('--primary-accent', theme.primaryAccent);
    root.style.setProperty('--primary-accent-rgb', theme.primaryAccentRgb);
    root.style.setProperty('--secondary-accent', theme.secondaryAccent);
    root.style.setProperty('--secondary-accent-rgb', theme.secondaryAccentRgb);
    root.style.setProperty('--text-primary', theme.textPrimary);
    root.style.setProperty('--text-secondary', theme.textSecondary);
    root.style.setProperty('--background-primary', theme.backgroundPrimary);
    root.style.setProperty('--background-secondary', theme.backgroundSecondary);
    
    // Apply effects
    root.style.setProperty('--glass-opacity', theme.glassOpacity);
    root.style.setProperty('--glass-blur', theme.glassBlur);
    root.style.setProperty('--glow-intensity', theme.glowIntensity);
    root.style.setProperty('--border-glow', theme.borderGlow);
    
    // Update derived variables
    updateGlowEffects();
    updateBorderEffects();
    updateGradients();
    
    // Update Vanta background if it exists
    if (window.vantaEffect) {
        window.vantaEffect.setOptions({
            color: theme.primaryAccent,
            backgroundColor: theme.backgroundPrimary
        });
    }
}

// Add scroll indicator functionality
document.addEventListener('DOMContentLoaded', function() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            // Get all sections
            const sections = document.querySelectorAll('.section');
            const viewportHeight = window.innerHeight;
            
            // Find the first section that's below the current viewport
            let nextSection = null;
            for (const section of sections) {
                const rect = section.getBoundingClientRect();
                if (rect.top > viewportHeight * 0.5) {
                    nextSection = section;
                    break;
                }
            }
            
            // If no next section found, scroll to the first section
            if (!nextSection && sections.length > 0) {
                nextSection = sections[0];
            }
            
            // Scroll to the next section
            if (nextSection) {
                nextSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});

// Remove the invalid :in-viewport selector usage
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.section');
    const viewportHeight = window.innerHeight;
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= viewportHeight * 0.5) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });
});
