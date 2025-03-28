// Mobile Navigation Functionality

// DOM Elements
let hamburger;
let navMenu;

// Initialize mobile navigation
function initMobileNavigation() {
    // Get DOM elements
    hamburger = document.querySelector('.hamburger');
    navMenu = document.querySelector('.nav-menu');
    
    if (!hamburger || !navMenu) return;
    
    // Toggle menu on hamburger click
    hamburger.addEventListener('click', toggleMenu);
    
    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            closeMenu();
        }
    });
    
    // Add resize listener to handle window resizing
    window.addEventListener('resize', handleResize);
}

// Toggle mobile menu
function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Disable scrolling when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Close mobile menu
function closeMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
}

// Handle window resize
function handleResize() {
    // If window width is greater than 992px and menu is open, close it
    if (window.innerWidth > 992 && navMenu.classList.contains('active')) {
        closeMenu();
    }
}

// Responsive image loading
function loadResponsiveImages() {
    const images = document.querySelectorAll('[data-src]');
    
    images.forEach(img => {
        // Get appropriate image source based on screen width
        const mobileSrc = img.getAttribute('data-src-mobile');
        const tabletSrc = img.getAttribute('data-src-tablet');
        const desktopSrc = img.getAttribute('data-src');
        
        // Set source based on screen width
        if (window.innerWidth <= 576 && mobileSrc) {
            img.src = mobileSrc;
        } else if (window.innerWidth <= 992 && tabletSrc) {
            img.src = tabletSrc;
        } else {
            img.src = desktopSrc;
        }
        
        // Remove data attributes after setting source
        img.removeAttribute('data-src');
        img.removeAttribute('data-src-mobile');
        img.removeAttribute('data-src-tablet');
    });
}

// Initialize responsive functionality
document.addEventListener('DOMContentLoaded', () => {
    initMobileNavigation();
    loadResponsiveImages();
    
    // Add scroll event listener for performance optimization
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                // Optimize animations and effects on scroll
                optimizeOnScroll();
                scrollTimeout = null;
            }, 100);
        }
    });
    
    // Add resize event listener for responsive adjustments
    let resizeTimeout;
    window.addEventListener('resize', () => {
        if (!resizeTimeout) {
            resizeTimeout = setTimeout(() => {
                // Reload responsive images
                loadResponsiveImages();
                
                // Adjust Three.js canvas size
                adjustCanvasSize();
                
                resizeTimeout = null;
            }, 200);
        }
    });
});

// Optimize animations and effects on scroll
function optimizeOnScroll() {
    // Check if elements are in viewport and only animate them
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    animatedElements.forEach(element => {
        if (isInViewport(element) && !element.classList.contains('visible')) {
            element.classList.add('visible');
        }
    });
}

// Adjust Three.js canvas size
function adjustCanvasSize() {
    const canvas = document.querySelector('canvas');
    if (canvas) {
        // Resize canvas to fit container
        const container = document.getElementById('three-js-container');
        if (container) {
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
        }
    }
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
    );
}

// Add debounce utility
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Optimize resize handler
window.addEventListener('resize', debounce(() => {
    loadResponsiveImages();
    adjustCanvasSize();
}, 200));
