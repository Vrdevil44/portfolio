// Enhanced JavaScript for interactive elements and animations

// Global variables
let scene, camera, renderer, controls;
let particles, particleSystem;
let mixer, clock;
let model;
let isLoaded = false;
let isAnimating = false;
let scrollPosition = 0;

// Initialize Three.js scene
function init() {
    // Create scene
    scene = new THREE.Scene();
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('three-container').appendChild(renderer.domElement);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Add point lights for dramatic effect
    const pointLight1 = new THREE.PointLight(0x2D5BFF, 1, 10);
    pointLight1.position.set(2, 1, 3);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0x7B68EE, 1, 10);
    pointLight2.position.set(-2, -1, 3);
    scene.add(pointLight2);
    
    // Add orbit controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    
    // Initialize clock for animations
    clock = new THREE.Clock();
    
    // Create particles
    createParticles();
    
    // Create placeholder geometry (will be replaced with loaded model)
    createPlaceholderGeometry();
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
    
    // Start animation loop
    animate();
}

// Create particle system for background
function createParticles() {
    const particleCount = 2000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    const color1 = new THREE.Color(0x2D5BFF); // Primary accent
    const color2 = new THREE.Color(0x7B68EE); // Secondary accent
    
    for (let i = 0; i < particleCount * 3; i += 3) {
        // Position
        positions[i] = (Math.random() - 0.5) * 30;
        positions[i + 1] = (Math.random() - 0.5) * 30;
        positions[i + 2] = (Math.random() - 0.5) * 30;
        
        // Color
        const mixFactor = Math.random();
        const particleColor = color1.clone().lerp(color2, mixFactor);
        
        colors[i] = particleColor.r;
        colors[i + 1] = particleColor.g;
        colors[i + 2] = particleColor.b;
        
        // Size
        sizes[i/3] = Math.random() * 0.1 + 0.03;
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    // Create shader material for better-looking particles
    const particleMaterial = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0.0 },
            pointTexture: { value: new THREE.TextureLoader().load('https://threejs.org/examples/textures/sprites/disc.png') }
        },
        vertexShader: `
            attribute float size;
            varying vec3 vColor;
            uniform float time;
            void main() {
                vColor = color;
                vec3 pos = position;
                // Simple sine wave animation
                pos.y += sin((pos.x + time) * 0.3) * 0.1;
                pos.x += sin((pos.y + time) * 0.3) * 0.1;
                
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
                if (gl_FragColor.a < 0.3) discard;
            }
        `,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true,
        vertexColors: true
    });
    
    particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);
}

// Create placeholder geometry until model is loaded
function createPlaceholderGeometry() {
    // Create a group of objects representing tech and interests
    const group = new THREE.Group();
    
    // Laptop (representing web dev)
    const laptopBase = new THREE.BoxGeometry(1.5, 0.1, 1);
    const laptopScreen = new THREE.BoxGeometry(1.4, 1, 0.1);
    
    const laptopMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x2D3250,
        specular: 0x555555,
        shininess: 30 
    });
    
    const screenMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x2D5BFF,
        emissive: 0x2D5BFF,
        emissiveIntensity: 0.2,
        specular: 0xffffff,
        shininess: 100 
    });
    
    const laptopBaseMesh = new THREE.Mesh(laptopBase, laptopMaterial);
    const laptopScreenMesh = new THREE.Mesh(laptopScreen, screenMaterial);
    
    laptopScreenMesh.position.y = 0.5;
    laptopScreenMesh.position.z = 0.45;
    laptopScreenMesh.rotation.x = Math.PI / 6;
    
    const laptop = new THREE.Group();
    laptop.add(laptopBaseMesh);
    laptop.add(laptopScreenMesh);
    laptop.position.x = -0.5;
    laptop.position.y = 0;
    laptop.scale.set(0.5, 0.5, 0.5);
    
    group.add(laptop);
    
    // Server rack (representing IT)
    const serverRack = new THREE.BoxGeometry(0.8, 1, 0.5);
    const serverMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x424769,
        specular: 0x222222,
        shininess: 20 
    });
    
    const serverMesh = new THREE.Mesh(serverRack, serverMaterial);
    serverMesh.position.x = 0.8;
    serverMesh.position.y = 0;
    serverMesh.scale.set(0.5, 0.5, 0.5);
    
    // Add server details
    for (let i = 0; i < 3; i++) {
        const serverUnit = new THREE.BoxGeometry(0.7, 0.2, 0.45);
        const unitMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x333333,
            specular: 0x666666,
            shininess: 30 
        });
        
        const unitMesh = new THREE.Mesh(serverUnit, unitMaterial);
        unitMesh.position.y = -0.3 + (i * 0.25);
        unitMesh.position.x = 0;
        unitMesh.position.z = 0.01;
        
        // Add LED
        const led = new THREE.SphereGeometry(0.02, 8, 8);
        const ledMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const ledMesh = new THREE.Mesh(led, ledMaterial);
        ledMesh.position.set(0.25, 0, 0.23);
        unitMesh.add(ledMesh);
        
        serverMesh.add(unitMesh);
    }
    
    group.add(serverMesh);
    
    // Table tennis paddle
    const paddleHandle = new THREE.CylinderGeometry(0.03, 0.03, 0.3, 16);
    const paddleHead = new THREE.CircleGeometry(0.15, 32);
    
    const handleMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const headMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    
    const handleMesh = new THREE.Mesh(paddleHandle, handleMaterial);
    const headMesh = new THREE.Mesh(paddleHead, headMaterial);
    
    headMesh.position.y = 0.15;
    headMesh.rotation.x = Math.PI / 2;
    
    const paddle = new THREE.Group();
    paddle.add(handleMesh);
    paddle.add(headMesh);
    paddle.position.set(0, -0.5, 0);
    paddle.rotation.z = Math.PI / 4;
    paddle.scale.set(0.5, 0.5, 0.5);
    
    group.add(paddle);
    
    // Network cable (representing IT infrastructure)
    const cablePath = new THREE.CurvePath();
    
    // Create a curved path for the cable
    const startPoint = new THREE.Vector3(-0.8, -0.3, 0);
    const endPoint = new THREE.Vector3(0.5, -0.3, 0);
    const controlPoint1 = new THREE.Vector3(-0.4, -0.5, 0.3);
    const controlPoint2 = new THREE.Vector3(0.1, -0.5, 0.3);
    
    const curve = new THREE.CubicBezierCurve3(
        startPoint,
        controlPoint1,
        controlPoint2,
        endPoint
    );
    
    cablePath.add(curve);
    
    const cableGeometry = new THREE.TubeGeometry(
        cablePath,
        64,
        0.02,
        8,
        false
    );
    
    const cableMaterial = new THREE.MeshPhongMaterial({
        color: 0x00aaff,
        shininess: 100
    });
    
    const cable = new THREE.Mesh(cableGeometry, cableMaterial);
    group.add(cable);
    
    // Position and add the group to the scene
    group.position.y = -0.5;
    group.rotation.y = Math.PI / 6;
    
    model = group;
    scene.add(model);
    
    // Add interactive animation for the model
    document.addEventListener('mousemove', onMouseMove);
}

// Mouse move handler for model interaction
function onMouseMove(event) {
    if (!isAnimating && model) {
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        
        // Subtle tilt based on mouse position
        gsap.to(model.rotation, {
            x: mouseY * 0.1,
            y: mouseX * 0.1 + Math.PI / 6,
            duration: 1,
            ease: "power2.out"
        });
    }
}

// Window resize handler
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Update controls
    controls.update();
    
    // Update particle shader time uniform
    if (particleSystem && particleSystem.material.uniforms) {
        particleSystem.material.uniforms.time.value = clock.getElapsedTime();
    }
    
    // Animate particles
    if (particleSystem) {
        particleSystem.rotation.y += 0.0003;
        
        // Make particles respond to mouse movement
        if (mouseX && mouseY) {
            particleSystem.rotation.x += (mouseY * 0.00005 - particleSystem.rotation.x) * 0.05;
            particleSystem.rotation.y += (mouseX * 0.00005 - particleSystem.rotation.y) * 0.05;
        }
    }
    
    // Update animations if mixer exists
    if (mixer) {
        mixer.update(clock.getDelta());
    }
    
    // Render scene
    renderer.render(scene, camera);
}

// Track mouse position for particle interaction
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - window.innerWidth / 2);
    mouseY = (event.clientY - window.innerHeight / 2);
});

// Mobile touch tracking
document.addEventListener('touchmove', (event) => {
    if (event.touches.length > 0) {
        mouseX = (event.touches[0].clientX - window.innerWidth / 2);
        mouseY = (event.touches[0].clientY - window.innerHeight / 2);
    }
}, { passive: true });

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
        
        // Update scroll position for parallax effects
        scrollPosition = scrollY;
        
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

// Parallax effect for section backgrounds
function parallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    });
}

// Typing animation for intro text
function typingAnimation() {
    const typingElement = document.querySelector('.typing-element');
    if (typingElement) {
        const text = typingElement.textContent;
        typingElement.textContent = '';
        typingElement.classList.add('typing-animation');
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        typeWriter();
    }
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
                    const targetWidth = level.style.getPropertyValue('--target-width') || level.dataset.width || level.getAttribute('style').match(/width:\s*(\d+)%/)[1] + '%';
                    level.style.width = targetWidth;
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

// Interactive story navigation
function setupStoryNavigation() {
    const storyChapters = document.querySelectorAll('.story-chapter');
    const storyNav = document.querySelector('.story-navigation');
    
    if (storyChapters.length > 0 && storyNav) {
        // Create navigation dots
        storyChapters.forEach((chapter, index) => {
            const dot = document.createElement('div');
            dot.classList.add('story-nav-dot');
            if (index === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                // Hide all chapters
                storyChapters.forEach(ch => ch.classList.remove('active'));
                
                // Show selected chapter
                storyChapters[index].classList.add('active');
                
                // Update active dot
                document.querySelectorAll('.story-nav-dot').forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
            });
            
            storyNav.appendChild(dot);
        });
        
        // Show only first chapter initially
        storyChapters.forEach((chapter, index) => {
            if (index !== 0) chapter.classList.remove('active');
            else chapter.classList.add('active');
        });
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
            
            // Show success message (in a real implementation, this would send the data)
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
                setupContactForm(); // Re-setup the form
            });
        });
    }
}

// Loading screen handler
function handleLoading() {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const loadingScreen = document.querySelector('.loading-screen');
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    isLoaded = true;
                    
                    // Start intro animations
                    typingAnimation();
                    animateIntro();
                }, 500);
            } else {
                isLoaded = true;
                typingAnimation();
                animateIntro();
            }
        }, 1500); // Simulate loading time
    });
}

// Animate intro elements
function animateIntro() {
    // Animate main title
    const mainTitle = document.querySelector('.hero-title');
    if (mainTitle) {
        gsap.from(mainTitle, {
            y: -50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    }
    
    // Animate subtitle
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        gsap.from(subtitle, {
            y: -30,
            opacity: 0,
            duration: 1,
            delay: 0.3,
            ease: "power3.out"
        });
    }
    
    // Animate tagline
    const tagline = document.querySelector('.hero-tagline');
    if (tagline) {
        gsap.from(tagline, {
            y: -20,
            opacity: 0,
            duration: 1,
            delay: 0.6,
            ease: "power3.out"
        });
    }
    
    // Animate CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-btn');
    if (ctaButtons.length > 0) {
        gsap.from(ctaButtons, {
            y: 30,
            opacity: 0,
            duration: 1,
            delay: 0.9,
            stagger: 0.2,
            ease: "power3.out"
        });
    }
    
    // Animate scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        gsap.from(scrollIndicator, {
            y: 20,
            opacity: 0,
            duration: 1,
            delay: 1.5,
            ease: "power3.out",
            onComplete: () => {
                // Add pulsing animation
                gsap.to(scrollIndicator, {
                    y: 10,
                    opacity: 0.7,
                    duration: 1.5,
                    repeat: -1,
                    yoyo: true,
                    ease: "power1.inOut"
                });
            }
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Three.js
    init();
    
    // Setup navigation
    navSlide();
    
    // Setup scroll effects
    scrollEffects();
    
    // Setup parallax effects
    parallaxEffect();
    
    // Setup skill bar animations
    animateSkillBars();
    
    // Setup story navigation
    setupStoryNavigation();
    
    // Setup contact form
    setupContactForm();
    
    // Handle loading screen
    handleLoading();
    
    // Add animate-on-scroll class to elements
    document.querySelectorAll('.section-title, .glass-card, .timeline-item, .education-item').forEach(element => {
        element.classList.add('animate-on-scroll');
    });
});
