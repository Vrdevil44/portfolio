// Gallery and Media Functionality

// Configuration
const galleryItems = [
    {
        id: 'gallery-1',
        title: 'Web Development Project',
        category: 'web',
        image: 'images/profile.png', // Using profile image as placeholder
        description: 'Responsive website design with modern UI/UX principles'
    },
    {
        id: 'gallery-2',
        title: 'Mobile App Interface',
        category: 'app',
        image: 'images/profile.png', // Using profile image as placeholder
        description: 'User interface design for mobile application'
    },
    {
        id: 'gallery-3',
        title: 'IT Infrastructure Setup',
        category: 'it',
        image: 'images/profile.png', // Using profile image as placeholder
        description: 'Server rack and network infrastructure implementation'
    },
    {
        id: 'gallery-4',
        title: 'Table Tennis Tournament',
        category: 'personal',
        image: 'images/profile.png', // Using profile image as placeholder
        description: 'National level table tennis competition'
    },
    {
        id: 'gallery-5',
        title: 'UI/UX Design Concept',
        category: 'design',
        image: 'images/profile.png', // Using profile image as placeholder
        description: 'Modern interface design with glassmorphism effects'
    },
    {
        id: 'gallery-6',
        title: 'Technical Support Setup',
        category: 'it',
        image: 'images/profile.png', // Using profile image as placeholder
        description: 'Workstation configuration for technical support'
    }
];

// DOM Elements
let galleryContainer;
let galleryFilters;
let galleryLightbox;
let lightboxImage;
let lightboxCaption;
let lightboxPrev;
let lightboxNext;
let currentGalleryIndex = 0;

// Audio tracks for audio player
const audioTracks = [
    {
        id: 'track-1',
        title: 'MusicPad Demo Track 1',
        duration: '2:45',
        file: '#' // Placeholder
    },
    {
        id: 'track-2',
        title: 'MusicPad Demo Track 2',
        duration: '3:12',
        file: '#' // Placeholder
    },
    {
        id: 'track-3',
        title: 'MusicPad Demo Track 3',
        duration: '1:58',
        file: '#' // Placeholder
    }
];

// Initialize gallery and media functionality
function initGalleryAndMedia() {
    // Get DOM elements
    galleryContainer = document.getElementById('gallery-container');
    galleryFilters = document.querySelectorAll('.gallery-filter-btn');
    galleryLightbox = document.getElementById('gallery-lightbox');
    lightboxImage = document.getElementById('lightbox-image');
    lightboxCaption = document.getElementById('lightbox-caption');
    lightboxPrev = document.getElementById('lightbox-prev');
    lightboxNext = document.getElementById('lightbox-next');
    
    // Create gallery items
    createGalleryItems();
    
    // Setup gallery filters
    setupGalleryFilters();
    
    // Setup lightbox functionality
    setupLightbox();
    
    // Setup audio player
    setupAudioPlayer();
    
    // Setup video player
    setupVideoPlayer();
}

// Create gallery items
function createGalleryItems() {
    if (!galleryContainer) return;
    
    // Clear container
    galleryContainer.innerHTML = '';
    
    // Create items
    galleryItems.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-category', item.category);
        galleryItem.setAttribute('data-index', index);
        
        // Make first item featured
        if (index === 0) {
            galleryItem.classList.add('featured');
        }
        
        galleryItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="gallery-item-caption">
                <h3 class="gallery-item-title">${item.title}</h3>
                <p class="gallery-item-category">${item.category}</p>
            </div>
        `;
        
        // Add click event to open lightbox
        galleryItem.addEventListener('click', () => {
            openLightbox(index);
        });
        
        galleryContainer.appendChild(galleryItem);
    });
}

// Setup gallery filters
function setupGalleryFilters() {
    if (!galleryFilters) return;
    
    galleryFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            // Remove active class from all filters
            galleryFilters.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked filter
            filter.classList.add('active');
            
            // Get filter value
            const filterValue = filter.getAttribute('data-filter');
            
            // Filter gallery items
            filterGalleryItems(filterValue);
        });
    });
}

// Filter gallery items
function filterGalleryItems(category) {
    const items = document.querySelectorAll('.gallery-item');
    
    items.forEach(item => {
        // Get item category
        const itemCategory = item.getAttribute('data-category');
        
        // Reset animation
        item.style.animation = 'none';
        item.offsetHeight; // Trigger reflow
        
        if (category === 'all' || itemCategory === category) {
            // Show item with animation
            item.style.display = 'block';
            item.style.animation = 'fadeIn 0.5s ease forwards';
            
            // Add staggered delay based on index
            const index = Array.from(items).indexOf(item);
            item.style.animationDelay = `${index * 0.1}s`;
        } else {
            // Hide item
            item.style.display = 'none';
        }
    });
}

// Setup lightbox functionality
function setupLightbox() {
    if (!galleryLightbox) return;
    
    // Close lightbox when clicking close button
    const closeBtn = document.getElementById('lightbox-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }
    
    // Close lightbox when clicking outside content
    galleryLightbox.addEventListener('click', (e) => {
        if (e.target === galleryLightbox) {
            closeLightbox();
        }
    });
    
    // Close lightbox with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
    
    // Navigate with arrow keys
    document.addEventListener('keydown', (e) => {
        if (galleryLightbox.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                navigateLightbox('prev');
            } else if (e.key === 'ArrowRight') {
                navigateLightbox('next');
            }
        }
    });
    
    // Setup navigation buttons
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => {
            navigateLightbox('prev');
        });
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => {
            navigateLightbox('next');
        });
    }
}

// Open lightbox
function openLightbox(index) {
    if (!galleryLightbox || !lightboxImage || !lightboxCaption) return;
    
    // Set current index
    currentGalleryIndex = index;
    
    // Update lightbox content
    updateLightboxContent();
    
    // Show lightbox
    galleryLightbox.classList.add('active');
    
    // Disable scrolling on body
    document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightbox() {
    if (!galleryLightbox) return;
    
    // Hide lightbox
    galleryLightbox.classList.remove('active');
    
    // Enable scrolling on body
    document.body.style.overflow = '';
}

// Update lightbox content
function updateLightboxContent() {
    if (!lightboxImage || !lightboxCaption) return;
    
    const item = galleryItems[currentGalleryIndex];
    
    // Update image
    lightboxImage.src = item.image;
    
    // Update caption
    lightboxCaption.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.description}</p>
    `;
}

// Navigate lightbox
function navigateLightbox(direction) {
    if (direction === 'prev') {
        currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
    } else {
        currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
    }
    
    // Update lightbox content with animation
    lightboxImage.style.opacity = '0';
    lightboxCaption.style.opacity = '0';
    
    setTimeout(() => {
        updateLightboxContent();
        lightboxImage.style.opacity = '1';
        lightboxCaption.style.opacity = '1';
    }, 300);
}

// Setup audio player
function setupAudioPlayer() {
    const audioPlayer = document.getElementById('audio-player');
    const audioTracks = document.getElementById('audio-tracks');
    
    if (!audioPlayer || !audioTracks) return;
    
    // Set first track as active
    if (audioTracks.children.length > 0) {
        audioTracks.children[0].classList.add('active');
    }
    
    // Add click event to tracks
    const tracks = document.querySelectorAll('.audio-track');
    tracks.forEach(track => {
        track.addEventListener('click', () => {
            // Remove active class from all tracks
            tracks.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked track
            track.classList.add('active');
            
            // Get track file
            const trackFile = track.getAttribute('data-file');
            
            // Update audio player source
            if (audioPlayer && trackFile) {
                audioPlayer.src = trackFile;
                audioPlayer.play();
            }
        });
    });
}

// Setup video player
function setupVideoPlayer() {
    const videoOverlay = document.getElementById('video-overlay');
    const videoContainer = document.getElementById('video-container');
    
    if (!videoOverlay || !videoContainer) return;
    
    videoOverlay.addEventListener('click', () => {
        // Hide overlay
        videoOverlay.style.display = 'none';
        
        // Create iframe if it doesn't exist
        if (!videoContainer.querySelector('iframe')) {
            const iframe = document.createElement('iframe');
            iframe.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'; // Placeholder
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;
            
            videoContainer.appendChild(iframe);
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if gallery section exists
    if (document.getElementById('gallery')) {
        initGalleryAndMedia();
    }
});
