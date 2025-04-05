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
async function initGithubIntegration() {
    try {
        // Fetch user data
        const userData = await fetch(`https://api.github.com/users/${githubUsername}`).then(res => res.json());
        
        // Update profile information
        if (document.getElementById('github-avatar-img')) {
            document.getElementById('github-avatar-img').src = userData.avatar_url;
        }
        if (document.getElementById('github-username')) {
            document.getElementById('github-username').textContent = userData.name || userData.login;
        }
        if (document.getElementById('github-bio')) {
            document.getElementById('github-bio').textContent = userData.bio || 'Full-stack Developer';
        }
        if (document.getElementById('github-repos-count')) {
            document.getElementById('github-repos-count').textContent = userData.public_repos;
        }
        if (document.getElementById('github-followers')) {
            document.getElementById('github-followers').textContent = userData.followers;
        }
        if (document.getElementById('github-following')) {
            document.getElementById('github-following').textContent = userData.following;
        }

        // Fetch and display repositories
        const reposData = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=${maxRepos}`).then(res => res.json());
        const reposContainer = document.getElementById('github-repos');
        if (reposContainer) {
            reposContainer.innerHTML = '';
            reposData.forEach((repo, index) => {
                const repoCard = createRepoCard(repo, index);
                reposContainer.appendChild(repoCard);
            });
        }

        // Fetch and display activity
        const eventsData = await fetch(`https://api.github.com/users/${githubUsername}/events/public`).then(res => res.json());
        const activityContainer = document.getElementById('github-recent-activity');
        if (activityContainer) {
            activityContainer.innerHTML = '';
            const recentEvents = eventsData.slice(0, 5);
            recentEvents.forEach((event, index) => {
                const activityItem = createActivityItem(event, index);
                activityContainer.appendChild(activityItem);
            });
        }

        // Generate contributions graph
        await generateContributionsGraph();

    } catch (error) {
        console.error('Error initializing GitHub integration:', error);
        displayErrorMessage();
    }
}

function createRepoCard(repo, index) {
    const card = document.createElement('div');
    card.className = 'github-repo glass-card';
    card.style.animationDelay = `${0.2 + (index * 0.1)}s`;

    card.innerHTML = `
        <h3 class="github-repo-name">${repo.name}</h3>
        <p class="github-repo-description">${repo.description || 'No description available.'}</p>
        <div class="github-repo-stats">
            <span class="github-repo-stat"><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
            <span class="github-repo-stat"><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
            <span class="github-repo-stat"><i class="fas fa-eye"></i> ${repo.watchers_count}</span>
        </div>
        <div class="github-repo-languages">
            <span class="github-repo-language">
                <span class="github-repo-language-color language-${(repo.language || 'none').toLowerCase()}"></span>
                ${repo.language || 'Various'}
            </span>
        </div>
        <div class="github-repo-links">
            <a href="${repo.html_url}" target="_blank" class="github-repo-link">
                <i class="fas fa-code"></i> View Code
            </a>
        </div>
    `;
    
    return card;
}

function createActivityItem(event, index) {
    const item = document.createElement('div');
    item.className = 'github-activity-item';
    item.style.animationDelay = `${0.3 + (index * 0.1)}s`;

    let icon, action, target;
    switch (event.type) {
        case 'PushEvent':
            icon = 'fa-code-branch';
            action = `Pushed to`;
            target = event.repo.name;
            break;
        case 'CreateEvent':
            icon = 'fa-plus-circle';
            action = `Created ${event.payload.ref_type}`;
            target = event.repo.name;
            break;
        case 'WatchEvent':
            icon = 'fa-star';
            action = `Starred`;
            target = event.repo.name;
            break;
        case 'ForkEvent':
            icon = 'fa-code-branch';
            action = `Forked`;
            target = event.repo.name;
            break;
        default:
            icon = 'fa-code';
            action = `Acted on`;
            target = event.repo.name;
    }
    
    const date = new Date(event.created_at);
    const timeAgo = getTimeAgo(date);

    item.innerHTML = `
        <div class="github-activity-icon">
            <i class="fas ${icon}"></i>
        </div>
        <div class="github-activity-content">
            <p class="github-activity-text">${action} <a href="https://github.com/${target}" target="_blank">${target}</a></p>
            <span class="github-activity-time">${timeAgo}</span>
        </div>
    `;
    
    return item;
}

function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) return interval + ' years ago';
    if (interval === 1) return 'a year ago';
    
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return interval + ' months ago';
    if (interval === 1) return 'a month ago';
    
    interval = Math.floor(seconds / 86400);
    if (interval > 1) return interval + ' days ago';
    if (interval === 1) return 'yesterday';
    
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return interval + ' hours ago';
    if (interval === 1) return 'an hour ago';
    
    interval = Math.floor(seconds / 60);
    if (interval > 1) return interval + ' minutes ago';
    if (interval === 1) return 'a minute ago';
    
    return 'just now';
}

async function generateContributionsGraph() {
    try {
        const container = document.getElementById('github-contributions-graph');
        if (!container) return;

        // Since GitHub's contribution graph requires authentication or web scraping,
        // we'll create a simplified version with random data for demonstration
        container.innerHTML = '';
        
        // Create 52 weeks (1 year) of contribution data
        for (let week = 0; week < 52; week++) {
            const weekColumn = document.createElement('div');
            weekColumn.className = 'github-contribution-column';
            
            // Create 7 days per week
            for (let day = 0; day < 7; day++) {
                const dayElement = document.createElement('div');
                dayElement.className = 'github-contribution-day';
                
                // Random contribution count (0-10)
                const contributions = Math.floor(Math.random() * 10);
                const opacity = contributions === 0 ? 0.1 : (0.2 + (contributions / 10) * 0.8);
                
                dayElement.style.backgroundColor = `rgba(45, 91, 255, ${opacity})`;
                dayElement.style.height = '10px';
                dayElement.title = `${contributions} contributions`;
                
                weekColumn.appendChild(dayElement);
            }
            
            container.appendChild(weekColumn);
        }
    } catch (error) {
        console.error('Error generating contributions graph:', error);
        if (document.getElementById('github-contributions-graph')) {
            document.getElementById('github-contributions-graph').innerHTML = '<p>Failed to load contributions</p>';
        }
    }
}

function displayErrorMessage() {
    const containers = ['github-repos', 'github-recent-activity', 'github-contributions-graph'];
    containers.forEach(id => {
        const container = document.getElementById(id);
        if (container) {
            container.innerHTML = `
                <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                    <p>Error loading GitHub data. Please try again later.</p>
        </div>
    `;
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('github')) {
        initGithubIntegration();
    }
});
