// GitHub Integration Functionality

// Configuration
const githubUsername = 'Vrdevil44';
const maxRepos = 4; // Maximum number of repositories to display
const maxActivities = 5; // Maximum number of activities to display

// DOM Elements
let githubAvatarImg;
let githubUsernameEl;
let githubBioEl;
let githubReposCountEl;
let githubFollowersEl;
let githubFollowingEl;
let githubReposContainer;
let githubContributionsGraph;
let githubContributionTooltip;
let githubRecentActivity;

// Initialize GitHub integration
function initGithubIntegration() {
    // Get DOM elements
    githubAvatarImg = document.getElementById('github-avatar-img');
    githubUsernameEl = document.getElementById('github-username');
    githubBioEl = document.getElementById('github-bio');
    githubReposCountEl = document.getElementById('github-repos-count');
    githubFollowersEl = document.getElementById('github-followers');
    githubFollowingEl = document.getElementById('github-following');
    githubReposContainer = document.getElementById('github-repos');
    githubContributionsGraph = document.getElementById('github-contributions-graph');
    githubContributionTooltip = document.getElementById('github-contribution-tooltip');
    githubRecentActivity = document.getElementById('github-recent-activity');
    
    // Fetch GitHub data
    fetchGithubProfile();
    fetchGithubRepos();
    generateContributionsGraph();
    fetchGithubActivity();
}

// Fetch GitHub profile data
async function fetchGithubProfile() {
    try {
        // In a real implementation, this would fetch from GitHub API
        // For demo purposes, we'll use placeholder data
        
        // Update profile information
        githubAvatarImg.src = `images/profile.png`; // Use the profile image we already have
        githubUsernameEl.textContent = 'Vibhu Dikshit';
        githubBioEl.textContent = 'Full-stack Developer | UI/UX Designer | Technical Support Specialist';
        
        // Update stats
        githubReposCountEl.textContent = '12';
        githubFollowersEl.textContent = '45';
        githubFollowingEl.textContent = '38';
        
        // Add animation
        animateCounters();
    } catch (error) {
        console.error('Error fetching GitHub profile:', error);
        githubBioEl.textContent = 'Error loading profile data. Please try again later.';
    }
}

// Fetch GitHub repositories
async function fetchGithubRepos() {
    try {
        // Clear loading placeholder
        githubReposContainer.innerHTML = '';
        
        // In a real implementation, this would fetch from GitHub API
        // For demo purposes, we'll create sample repositories
        const sampleRepos = [
            {
                name: 'MusicPad',
                description: 'A collaborative web-based platform enabling users to create, share, and discover original music.',
                language: 'JavaScript',
                stars: 15,
                forks: 3,
                updated: '2 weeks ago'
            },
            {
                name: 'Billing-Management-System',
                description: 'A comprehensive billing solution with Next.js and React.js, featuring dynamic search and business analytics.',
                language: 'TypeScript',
                stars: 8,
                forks: 2,
                updated: '1 month ago'
            },
            {
                name: 'Social-Companion-Robots',
                description: 'Research project focused on implementing and testing MiRo-E robots using machine learning techniques.',
                language: 'Python',
                stars: 12,
                forks: 4,
                updated: '3 weeks ago'
            },
            {
                name: 'Portfolio-Website',
                description: 'My personal portfolio website showcasing projects and skills with Three.js and interactive elements.',
                language: 'HTML',
                stars: 5,
                forks: 1,
                updated: 'Just now'
            }
        ];
        
        // Create repository cards
        sampleRepos.forEach((repo, index) => {
            const repoCard = createRepoCard(repo, index);
            githubReposContainer.appendChild(repoCard);
        });
    } catch (error) {
        console.error('Error fetching GitHub repositories:', error);
        githubReposContainer.innerHTML = `
            <div class="github-repo glass-card">
                <h3 class="github-repo-name">Error Loading Repositories</h3>
                <p class="github-repo-description">There was an error loading repositories. Please try again later.</p>
            </div>
        `;
    }
}

// Create repository card
function createRepoCard(repo, index) {
    const repoCard = document.createElement('div');
    repoCard.className = 'github-repo glass-card';
    repoCard.style.animationDelay = `${0.2 + (index * 0.1)}s`;
    
    // Get language color class
    const languageClass = `language-${repo.language.toLowerCase()}`;
    
    repoCard.innerHTML = `
        <h3 class="github-repo-name">${repo.name}</h3>
        <p class="github-repo-description">${repo.description}</p>
        <div class="github-repo-stats">
            <span class="github-repo-stat"><i class="fas fa-star"></i> ${repo.stars}</span>
            <span class="github-repo-stat"><i class="fas fa-code-branch"></i> ${repo.forks}</span>
            <span class="github-repo-stat"><i class="fas fa-history"></i> ${repo.updated}</span>
        </div>
        <div class="github-repo-languages">
            <span class="github-repo-language">
                <span class="github-repo-language-color ${languageClass}"></span>
                ${repo.language}
            </span>
        </div>
        <div class="github-repo-links">
            <a href="https://github.com/${githubUsername}/${repo.name}" target="_blank" class="github-repo-link">
                <i class="fas fa-code"></i> View Code
            </a>
            <a href="https://github.com/${githubUsername}/${repo.name}/stargazers" target="_blank" class="github-repo-link">
                <i class="fas fa-star"></i> Star
            </a>
        </div>
    `;
    
    return repoCard;
}

// Generate contributions graph
function generateContributionsGraph() {
    try {
        // Clear existing content
        githubContributionsGraph.innerHTML = '';
        
        // In a real implementation, this would fetch from GitHub API
        // For demo purposes, we'll generate random contribution data
        const days = 30; // Last 30 days
        const maxContributions = 10;
        
        for (let i = 0; i < days; i++) {
            // Generate random contribution count (more recent days have higher probability of contributions)
            const recencyFactor = 1 + ((days - i) / days);
            const contributions = Math.floor(Math.random() * maxContributions * recencyFactor);
            
            // Create column for this day
            const column = document.createElement('div');
            column.className = 'github-contribution-column';
            
            // Calculate date for this day
            const date = new Date();
            date.setDate(date.getDate() - (days - i - 1));
            const dateString = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            
            // Add contribution blocks
            for (let j = 0; j < contributions; j++) {
                const day = document.createElement('div');
                day.className = 'github-contribution-day';
                
                // Height based on contribution count (1-10px)
                const height = 1 + Math.floor(Math.random() * 10);
                day.style.height = `${height}px`;
                
                // Color intensity based on contribution count
                const opacity = 0.3 + (j / contributions * 0.7);
                day.style.opacity = opacity;
                
                // Add tooltip data
                day.setAttribute('data-date', dateString);
                day.setAttribute('data-count', j + 1);
                
                // Add hover event for tooltip
                day.addEventListener('mouseenter', showContributionTooltip);
                day.addEventListener('mouseleave', hideContributionTooltip);
                
                column.appendChild(day);
            }
            
            // If no contributions, add empty day
            if (contributions === 0) {
                const emptyDay = document.createElement('div');
                emptyDay.className = 'github-contribution-day';
                emptyDay.style.height = '1px';
                emptyDay.style.opacity = '0.1';
                
                // Add tooltip data
                emptyDay.setAttribute('data-date', dateString);
                emptyDay.setAttribute('data-count', 0);
                
                // Add hover event for tooltip
                emptyDay.addEventListener('mouseenter', showContributionTooltip);
                emptyDay.addEventListener('mouseleave', hideContributionTooltip);
                
                column.appendChild(emptyDay);
            }
            
            githubContributionsGraph.appendChild(column);
        }
    } catch (error) {
        console.error('Error generating contributions graph:', error);
        githubContributionsGraph.innerHTML = '<p class="error-message">Error loading contribution data</p>';
    }
}

// Show contribution tooltip
function showContributionTooltip(event) {
    const day = event.target;
    const date = day.getAttribute('data-date');
    const count = day.getAttribute('data-count');
    
    // Update tooltip content
    githubContributionTooltip.textContent = `${count} contributions on ${date}`;
    
    // Position tooltip
    const rect = day.getBoundingClientRect();
    const graphRect = githubContributionsGraph.getBoundingClientRect();
    
    githubContributionTooltip.style.left = `${rect.left - graphRect.left + (rect.width / 2)}px`;
    githubContributionTooltip.style.top = `${rect.top - graphRect.top - 30}px`;
    
    // Show tooltip
    githubContributionTooltip.style.opacity = '1';
}

// Hide contribution tooltip
function hideContributionTooltip() {
    githubContributionTooltip.style.opacity = '0';
}

// Fetch GitHub activity
async function fetchGithubActivity() {
    try {
        // Clear existing content
        githubRecentActivity.innerHTML = '';
        
        // In a real implementation, this would fetch from GitHub API
        // For demo purposes, we'll create sample activities
        const sampleActivities = [
            {
                type: 'push',
                repo: 'Portfolio-Website',
                message: 'Pushed 5 commits to',
                time: '2 hours ago'
            },
            {
                type: 'star',
                repo: 'react-three-fiber',
                message: 'Starred',
                time: '1 day ago'
            },
            {
                type: 'fork',
                repo: 'three.js',
                message: 'Forked',
                time: '3 days ago'
            },
            {
                type: 'pull',
                repo: 'MusicPad',
                message: 'Opened pull request in',
                time: '1 week ago'
            },
            {
                type: 'issue',
                repo: 'Billing-Management-System',
                message: 'Closed issue in',
                time: '2 weeks ago'
            }
        ];
        
        // Create activity items
        sampleActivities.forEach((activity, index) => {
            const activityItem = createActivityItem(activity, index);
            githubRecentActivity.appendChild(activityItem);
        });
    } catch (error) {
        console.error('Error fetching GitHub activity:', error);
        githubRecentActivity.innerHTML = `
            <div class="github-activity-item">
                <div class="github-activity-icon">
                    <i class="fas fa-exclamation-circle"></i>
                </div>
                <div class="github-activity-content">
                    <p class="github-activity-text">Error loading activity data</p>
                    <span class="github-activity-time">Please try again later</span>
                </div>
            </div>
        `;
    }
}

// Create activity item
function createActivityItem(activity, index) {
    const activityItem = document.createElement('div');
    activityItem.className = 'github-activity-item';
    activityItem.style.animationDelay = `${0.3 + (index * 0.1)}s`;
    
    // Get icon based on activity type
    let icon;
    switch (activity.type) {
        case 'push':
            icon = 'fa-code-branch';
            break;
        case 'star':
            icon = 'fa-star';
            break;
        case 'fork':
            icon = 'fa-code-branch';
            break;
        case 'pull':
            icon = 'fa-code-pull-request';
            break;
        case 'issue':
            icon = 'fa-exclamation-circle';
            break;
        default:
            icon = 'fa-code';
    }
    
    activityItem.innerHTML = `
        <div class="github-activity-icon">
            <i class="fas ${icon}"></i>
        </div>
        <div class="github-activity-content">
            <p class="github-activity-text">${activity.message} <a href="https://github.com/${githubUsername}/${activity.repo}" target="_blank" class="github-activity-repo">${activity.repo}</a></p>
            <span class="github-activity-time">${activity.time}</span>
        </div>
    `;
    
    return activityItem;
}

// Animate counter elements
function animateCounters() {
    const counters = [githubReposCountEl, githubFollowersEl, githubFollowingEl];
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        let count = 0;
        const duration = 2000; // 2 seconds
        const interval = 50; // Update every 50ms
        const increment = target / (duration / interval);
        
        const timer = setInterval(() => {
            count += increment;
            
            if (count >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(count);
            }
        }, interval);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if GitHub section exists
    if (document.getElementById('github')) {
        initGithubIntegration();
    }
});
