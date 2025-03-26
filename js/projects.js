// Project Showcase Functionality

// DOM Elements
const projectFilters = document.querySelectorAll('.project-filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const projectModals = document.querySelectorAll('.project-modal');
const projectViewButtons = document.querySelectorAll('.view-project');
const modalCloseButtons = document.querySelectorAll('.project-modal-close');

// Initialize project showcase functionality
function initProjectShowcase() {
    // Filter functionality
    setupProjectFilters();
    
    // Modal functionality
    setupProjectModals();
    
    // Animation on scroll
    setupProjectAnimations();
}

// Setup project filtering
function setupProjectFilters() {
    projectFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            // Remove active class from all filters
            projectFilters.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked filter
            filter.classList.add('active');
            
            // Get filter value
            const filterValue = filter.getAttribute('data-filter');
            
            // Filter projects
            filterProjects(filterValue);
        });
    });
}

// Filter projects based on category
function filterProjects(category) {
    projectCards.forEach(card => {
        // Get card categories
        const cardCategories = card.getAttribute('data-category').split(',');
        
        // Reset animation
        card.style.animation = 'none';
        card.offsetHeight; // Trigger reflow
        
        if (category === 'all' || cardCategories.includes(category)) {
            // Show card with animation
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease forwards';
            
            // Add staggered delay based on index
            const index = Array.from(projectCards).indexOf(card);
            card.style.animationDelay = `${index * 0.1}s`;
        } else {
            // Hide card
            card.style.display = 'none';
        }
    });
}

// Setup project modal functionality
function setupProjectModals() {
    // Open modal when view project button is clicked
    projectViewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get project ID
            const projectId = button.getAttribute('data-project');
            
            // Open corresponding modal
            openProjectModal(projectId);
        });
    });
    
    // Close modal when close button is clicked
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', () => {
            closeAllProjectModals();
        });
    });
    
    // Close modal when clicking outside content
    projectModals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeAllProjectModals();
            }
        });
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllProjectModals();
        }
    });
}

// Open project modal
function openProjectModal(projectId) {
    const modal = document.getElementById(`modal-${projectId}`);
    
    if (modal) {
        // Disable scrolling on body
        document.body.style.overflow = 'hidden';
        
        // Show modal with animation
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        
        // Add animation to modal content
        const modalContent = modal.querySelector('.project-modal-content');
        modalContent.style.transform = 'translateY(20px) scale(0.95)';
        modalContent.style.opacity = '0';
        
        setTimeout(() => {
            modalContent.style.transition = 'all 0.4s ease';
            modalContent.style.transform = 'translateY(0) scale(1)';
            modalContent.style.opacity = '1';
        }, 50);
    }
}

// Close all project modals
function closeAllProjectModals() {
    // Enable scrolling on body
    document.body.style.overflow = '';
    
    // Hide all modals with animation
    projectModals.forEach(modal => {
        const modalContent = modal.querySelector('.project-modal-content');
        
        // Animate modal content out
        modalContent.style.transform = 'translateY(20px) scale(0.95)';
        modalContent.style.opacity = '0';
        
        // Remove active class
        modal.classList.remove('active');
        
        // Hide modal after animation
        setTimeout(() => {
            modal.style.display = 'none';
            
            // Reset modal content styles
            modalContent.style.transition = '';
            modalContent.style.transform = '';
            modalContent.style.opacity = '';
        }, 400);
    });
}

// Setup project animations
function setupProjectAnimations() {
    // Animate project cards when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    // Observe all project cards
    projectCards.forEach(card => {
        card.classList.add('animate-on-scroll');
        observer.observe(card);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initProjectShowcase();
});
