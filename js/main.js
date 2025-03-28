// Enhanced JavaScript for interactive elements and animations

// Global variables
let isAnimating = false;
let vantaEffect = null;
let gui = null;
let guiContainer = null;

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
    applyTheme(defaultTheme);
    updateGuiDisplay();
}

// Vanta background configuration
const VANTA_EFFECTS = [
    { name: 'WAVES', init: VANTA.WAVES },
    { name: 'BIRDS', init: VANTA.BIRDS },
    { name: 'FOG', init: VANTA.FOG },
    { name: 'CLOUDS', init: VANTA.CLOUDS },
    { name: 'GLOBE', init: VANTA.GLOBE },
    { name: 'NET', init: VANTA.NET },
    { name: 'RINGS', init: VANTA.RINGS },
    { name: 'CELLS', init: VANTA.CELLS },
    { name: 'TRUNK', init: VANTA.TRUNK },
    { name: 'TOPOLOGY', init: VANTA.TOPOLOGY },
    { name: 'HALO', init: VANTA.HALO },
    { name: 'DOTS', init: VANTA.DOTS }

];

// Initialize background effect
function initBackground() {
    const container = document.getElementById('vanta-background');
    if (!container) return;

    // Get a random effect every time
    const randomEffect = VANTA_EFFECTS[Math.floor(Math.random() * VANTA_EFFECTS.length)];
    
    // Get effect configuration
    const effectConfig = getEffectConfig(randomEffect.name);
    const effectDefaults = getEffectDefaults(randomEffect.name);
    
    // Base configuration
    const config = {
        el: container,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        ...effectDefaults
    };

    // Initialize the effect
    vantaEffect = randomEffect.init(config);

    // Store the effect name for the GUI
    localStorage.setItem('lastVantaEffect', randomEffect.name);

    // Initialize GUI controls
    initGuiControls(randomEffect.name);
}

// Safely destroy GUI
function destroyGui() {
    if (gui) {
        // Remove the container if it exists
        if (guiContainer && guiContainer.parentNode) {
            guiContainer.parentNode.removeChild(guiContainer);
        }
        
        // Destroy the GUI
        gui.destroy();
        gui = null;
    }
    
    // Remove any existing style elements
    const oldStyle = document.getElementById('gui-style');
    if (oldStyle && oldStyle.parentNode) {
        oldStyle.parentNode.removeChild(oldStyle);
    }
}

// Initialize GUI controls based on effect type
function initGuiControls(effectName) {
    // Safely destroy existing GUI
    destroyGui();

    // Create new GUI
    gui = new dat.GUI({ autoPlace: false });
    gui.domElement.id = 'vanta-controls';

    // Create and setup GUI container
    guiContainer = document.createElement('div');
    guiContainer.id = 'gui-container';
    guiContainer.style.position = 'fixed';
    guiContainer.style.top = '80px';
    guiContainer.style.right = '10px';
    guiContainer.style.zIndex = '1000';
    document.body.appendChild(guiContainer);
    guiContainer.appendChild(gui.domElement);

    // Theme Settings
    const themeFolder = gui.addFolder('Theme Settings');
    const currentTheme = getCurrentTheme();
    const themeControls = { ...currentTheme, resetTheme };

    // Add theme controls
    Object.keys(defaultTheme).forEach(prop => {
        if (prop !== 'resetTheme') {
            themeFolder.addColor(themeControls, prop)
                .onChange(value => {
                    themeControls[prop] = value;
                    applyTheme(themeControls);
                    updateGuiStyle();
                });
        }
    });

    themeFolder.add(themeControls, 'resetTheme').name('Reset Theme');

    // Effect Settings
    const effectFolder = gui.addFolder(effectName + ' Settings');
    
    // Get effect configuration
    const effectConfig = getEffectConfig(effectName);
    
    if (effectConfig) {
        // Create controls object based on current effect options
        const effectControls = {};
        
        // Add controls for numeric properties with defined ranges
        Object.entries(effectConfig.ranges).forEach(([key, range]) => {
            effectControls[key] = vantaEffect.options[key] || effectConfig.defaults[key];
            effectFolder.add(effectControls, key, ...range).onChange(value => {
                const options = {};
                options[key] = value;
                vantaEffect.setOptions(options);
            });
        });
        
        // Add controls for colors
        effectConfig.colors.forEach(colorKey => {
            const currentColor = vantaEffect.options[colorKey] || effectConfig.defaults[colorKey] || 0x2451FF;
            effectControls[colorKey] = '#' + currentColor.toString(16).padStart(6, '0');
            effectFolder.addColor(effectControls, colorKey).onChange(value => {
                const options = {};
                options[colorKey] = new THREE.Color(value).getHex();
                vantaEffect.setOptions(options);
            });
        });
    }

    // Effect switcher
    const switcherControls = {
        currentEffect: effectName,
        switchEffect: function() {
            const currentOptions = vantaEffect.options;
            if (vantaEffect) {
                vantaEffect.destroy();
            }
            const newEffect = VANTA_EFFECTS.find(e => e.name === this.currentEffect);
            const newConfig = getEffectConfig(this.currentEffect);
            
            // Combine default options with current options
            const combinedOptions = {
                ...newConfig.defaults,
                el: document.getElementById('vanta-background'),
                mouseControls: currentOptions.mouseControls,
                touchControls: currentOptions.touchControls,
                gyroControls: currentOptions.gyroControls,
                minHeight: currentOptions.minHeight,
                minWidth: currentOptions.minWidth
            };

            // Initialize new effect
            vantaEffect = newEffect.init(combinedOptions);
            
            // Store the effect name
            localStorage.setItem('lastVantaEffect', this.currentEffect);
            
            // Reinitialize controls
            initGuiControls(this.currentEffect);
        }
    };

    gui.add(switcherControls, 'currentEffect', VANTA_EFFECTS.map(e => e.name))
        .onChange(() => switcherControls.switchEffect());

    updateGuiStyle();

    // Open folders by default
    themeFolder.open();
    effectFolder.open();
}

// Function to update GUI styling based on current theme
function updateGuiStyle() {
    const style = document.createElement('style');
    const theme = {
        primary: getComputedStyle(document.documentElement).getPropertyValue('--primary-accent').trim(),
        text: getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim(),
        background: getComputedStyle(document.documentElement).getPropertyValue('--background-primary').trim(),
        glass: getComputedStyle(document.documentElement).getPropertyValue('--glass-background').trim()
    };

    style.textContent = `
        #gui-container {
            background: ${theme.glass};
            border-radius: 10px;
            padding: 10px;
            backdrop-filter: blur(10px);
            border: 1px solid ${theme.primary}40;
            box-shadow: 0 4px 6px ${theme.primary}20;
        }
        .dg.main {
            font-family: 'Inter', sans-serif !important;
            color: ${theme.text} !important;
        }
        .dg .c select {
            color: ${theme.primary} !important;
            background: ${theme.background} !important;
        }
        .dg .cr.number input[type=text] {
            color: ${theme.primary} !important;
            background: ${theme.background} !important;
        }
        .dg .c .slider {
            background: ${theme.primary} !important;
        }
        .dg .c .slider:hover {
            background: ${theme.primary}80 !important;
        }
        .dg .closed li.title {
            background: ${theme.background} !important;
        }
        .dg .cr.boolean {
            border-left: 3px solid ${theme.primary} !important;
        }
        .dg .cr.color {
            border-left: 3px solid ${theme.primary} !important;
        }
        .dg .cr.number {
            border-left: 3px solid ${theme.primary} !important;
        }
        .dg .cr.function {
            border-left: 3px solid ${theme.primary} !important;
        }
        .dg li:not(.folder) {
            background: ${theme.background}CC !important;
            border-bottom: 1px solid ${theme.primary}20 !important;
        }
        .dg li.title {
            background: ${theme.background}E6 !important;
        }
        .dg .property-name {
            color: ${theme.text} !important;
        }
        .dg .c input[type=text] {
            border: none !important;
            box-shadow: inset 0 0 0 1px ${theme.primary}40 !important;
        }
    `;

    // Remove old style if exists
    const oldStyle = document.getElementById('gui-style');
    if (oldStyle && oldStyle.parentNode) {
        oldStyle.parentNode.removeChild(oldStyle);
    }
    style.id = 'gui-style';
    document.head.appendChild(style);
}

// Helper function to update GUI display
function updateGuiDisplay() {
    if (gui && gui.__folders['Theme Settings']) {
        const controllers = gui.__folders['Theme Settings'].__controllers;
        controllers.forEach(controller => {
            if (controller.updateDisplay) {
                controller.updateDisplay();
            }
        });
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

// Scroll effects
function scrollEffects() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;
        
        // Check which section is in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
        
        // Animate elements when they come into view
        animateOnScroll();
    });
}

// Animate elements when they come into view
function animateOnScroll() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    animateElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Skill bar animation
function animateSkillBars() {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    // Initial state - width: 0
    skillLevels.forEach(level => {
        level.style.width = '0';
    });
    
    // Animate when skills section comes into view
    const skillsSection = document.querySelector('.skills-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate all skill bars
                skillLevels.forEach(level => {
                    let targetWidth = '0%';
                    
                    // Try to get width from different sources
                    if (level.dataset.width) {
                        targetWidth = level.dataset.width;
                    } else if (level.style.getPropertyValue('--target-width')) {
                        targetWidth = level.style.getPropertyValue('--target-width');
                    } else {
                        const styleMatch = level.getAttribute('style') && level.getAttribute('style').match(/width:\s*(\d+)%/);
                        if (styleMatch) {
                            targetWidth = styleMatch[1] + '%';
                        }
                    }
                    
                    // Apply the width with animation
                    gsap.to(level, {
                        width: targetWidth,
                        duration: 1,
                        ease: "power2.out"
                    });
                });
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
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

    const updateProgress = () => {
        if (progress < 100) {
                progress += 1;
            if (progressBar) progressBar.style.width = `${progress}%`;
            if (progressText) progressText.textContent = `${progress}%`;
            
            if (progress === 100) {
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
                }, 500);
            } else {
                setTimeout(updateProgress, 30);
            }
        }
    };

    setTimeout(updateProgress, 500);
});
}

// Background toggle functionality
function initBackgroundToggle() {
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'background-toggle';
    toggleBtn.innerHTML = '<i class="fas fa-eye"></i>';
    toggleBtn.title = 'Toggle Background Animation';
    document.body.appendChild(toggleBtn);

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
    
    if (background) {
        background.style.opacity = enabled ? '1' : '0.1';
    }
    
    if (toggleBtn) {
        toggleBtn.innerHTML = enabled ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    }
    
    // Update Vanta effect
    if (vantaEffect) {
        if (!enabled) {
            vantaEffect.setOptions({
                mouseControls: false,
                touchControls: false
            });
        } else {
            vantaEffect.setOptions({
                mouseControls: true,
                touchControls: true
            });
        }
    }
}

// Cleanup function for Vanta effect and GUI
function cleanupVantaEffect() {
    if (vantaEffect) {
        vantaEffect.destroy();
        vantaEffect = null;
    }
    destroyGui();
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
                // Handle space character
                char.className = 'char space';
                char.innerHTML = '&nbsp;';
                char.style.marginRight = '0.5em'; // Add explicit spacing
            } else {
                char.className = 'char';
                char.textContent = text[currentChar];
            }
            
            // Set initial styles
            char.style.opacity = '1';
            char.style.color = 'white';
            char.style.display = 'inline-block';
            
            // Insert before cursor
            animatedTitle.insertBefore(char, cursor);
            
            // Add visible class with slight delay
            setTimeout(() => {
                char.classList.add('visible');
            }, 50);

            currentChar++;
            setTimeout(typeChar, 150); // Slightly slower typing speed
        } else {
            // After typing complete
            setTimeout(() => {
                cursor.remove();
                
                // Add gradient effect to each character
                const chars = animatedTitle.querySelectorAll('.char');
                chars.forEach((char, index) => {
                    setTimeout(() => {
                        char.classList.add('gradient-text');
                    }, index * 100); // Slower gradient transition
                });

                // Add glow effect after all characters have gradient
                setTimeout(() => {
                    animatedTitle.classList.add('glow-effect');
                    
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
                }, text.length * 100 + 500);
            }, 500);
        }
    }

    // Start typing animation
    setTimeout(typeChar, 500);
}

// Initialize animations in sequence
async function initializeAnimations() {
    // First initialize background
    initBackground();
    
    // Initialize background toggle
    initBackgroundToggle();
    
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

    // Initialize header logo animations
    animateHeaderLogo();

    // Initialize hover effects
    initializeHoverEffects();

    // Add cleanup on page unload
    window.addEventListener('beforeunload', cleanupVantaEffect);
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
            const x = e.clientX - rect.left; // relative mouse X
            const y = e.clientY - rect.top;  // relative mouse Y
            
            // Update the background position of the gradient
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
            tagline.style.color = 'transparent';
        });

        // Reset on mouse leave
        tagline.addEventListener('mouseleave', () => {
            tagline.style.backgroundImage = 'none';
            tagline.style.webkitTextFillColor = 'initial';
            tagline.style.color = 'var(--text-primary)';
            tagline.style.textShadow = 'none';
        });

        // Remove old hover effects
        tagline.removeEventListener('mouseover', () => {});
        tagline.removeEventListener('mouseout', () => {});
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    initializeAnimations().catch(console.error);
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
