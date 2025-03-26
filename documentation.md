# Vibhu Dikshit Portfolio Documentation

## Overview

This documentation provides comprehensive instructions for maintaining and updating your interactive portfolio website. The portfolio has been designed with a dark theme featuring glassmorphism effects, Three.js interactive elements, and a modular structure that makes it easy to update.

Your portfolio is now live at: [https://qbqcubvf.manus.space](https://qbqcubvf.manus.space)

## File Structure

```
portfolio_project/
├── index.html              # Main HTML file
├── css/                    # CSS stylesheets
│   ├── styles.css          # Main styles
│   ├── glassmorphism.css   # Glassmorphism effects
│   ├── sections.css        # Section-specific styles
│   ├── projects.css        # Project showcase styles
│   ├── gallery.css         # Gallery styles
│   ├── github.css          # GitHub section styles
│   └── responsive.css      # Responsive design styles
├── js/                     # JavaScript files
│   ├── main.js             # Main JavaScript with Three.js setup
│   ├── projects.js         # Project filtering functionality
│   ├── gallery.js          # Gallery interaction
│   ├── github.js           # GitHub integration
│   └── responsive.js       # Responsive behavior
├── assets/                 # Static assets
│   └── images/             # Image files
│       └── profile.png     # Your profile picture
├── models/                 # 3D models for Three.js
└── documentation.md        # This documentation file
```

## How to Update Content

### Updating Personal Information

To update your personal information (name, contact details, etc.), edit the relevant sections in `index.html`:

1. Find the section you want to update (About, Contact, etc.)
2. Modify the text content within the HTML tags
3. Save the file

### Adding New Work Experience

To add a new work experience:

1. Open `index.html`
2. Locate the Experience section (search for `<!-- Experience Section -->`)
3. Add a new experience entry following this template:

```html
<div class="timeline-item">
  <div class="timeline-date">
    <span>Start Date - End Date</span>
  </div>
  <div class="timeline-content glass-card">
    <h3>Job Title</h3>
    <h4>Company Name – Location</h4>
    <ul>
      <li>Achievement or responsibility 1</li>
      <li>Achievement or responsibility 2</li>
      <li>Achievement or responsibility 3</li>
    </ul>
    <div class="skills-tags">
      <span class="skill-tag">Skill 1</span>
      <span class="skill-tag">Skill 2</span>
    </div>
  </div>
</div>
```

4. Replace the placeholder text with your new experience details
5. Save the file

### Adding New Projects

To add a new project:

1. Open `index.html`
2. Locate the Projects section (search for `<!-- Projects Section -->`)
3. Add a new project entry following this template:

```html
<div class="project-card glass-card" data-category="category-name">
  <img src="path/to/project-image.jpg" alt="Project Name">
  <div class="project-info">
    <h3>Project Name</h3>
    <p>Brief project description that explains what the project does and the technologies used.</p>
    <div class="tech-stack">
      <span>Technology 1</span>
      <span>Technology 2</span>
    </div>
    <div class="project-links">
      <a href="#" class="view-details">View Details</a>
      <a href="https://github.com/yourusername/repo" class="github-link">GitHub</a>
    </div>
  </div>
</div>
```

4. Replace the placeholder text with your new project details
5. Add the project image to the `images` folder
6. Update the image path in the HTML
7. Save the file

### Adding Project Details Modal

For each new project, you should also add a modal with detailed information:

1. Locate the modals section at the bottom of the `index.html` file (search for `<!-- Project Modals -->`)
2. Add a new modal following this template:

```html
<div class="project-modal" id="project-name-modal">
  <div class="modal-content glass-card">
    <span class="close-modal">&times;</span>
    <h2>Project Name</h2>
    <h3>Detailed Description</h3>
    <img src="path/to/project-image.jpg" alt="Project Name">
    <p>Detailed project description that explains the problem, solution, and your role in the project.</p>
    <h3>Key Features</h3>
    <ul>
      <li>Feature 1</li>
      <li>Feature 2</li>
      <li>Feature 3</li>
    </ul>
    <h3>Technologies Used</h3>
    <div class="tech-stack">
      <span>Technology 1</span>
      <span>Technology 2</span>
    </div>
    <div class="project-links">
      <a href="https://github.com/yourusername/repo" target="_blank">GitHub Repository</a>
      <a href="https://live-demo-link.com" target="_blank">Live Demo</a>
    </div>
  </div>
</div>
```

3. Update the modal ID to match your project name (e.g., `id="project-name-modal"`)
4. Update the "View Details" link in your project card to open this modal:

```html
<a href="#" class="view-details" data-modal="project-name-modal">View Details</a>
```

### Updating Skills

To update your skills:

1. Open `index.html`
2. Locate the Skills section (search for `<!-- Skills Section -->`)
3. Add or modify skills in the appropriate category:

```html
<div class="skill-category">
  <h3>Category Name</h3>
  <div class="skills-list">
    <div class="skill-item">
      <span class="skill-name">Skill Name</span>
      <div class="skill-bar">
        <div class="skill-level" style="width: 90%;"></div>
      </div>
    </div>
    <!-- Add more skills here -->
  </div>
</div>
```

4. Adjust the skill level by changing the width percentage in the `style` attribute
5. Save the file

### Adding New Education

To add new education:

1. Open `index.html`
2. Locate the Education section (search for `<!-- Education Section -->`)
3. Add a new education entry following the existing format
4. Save the file

## Customizing the Design

### Changing Colors

The color scheme uses a 60:30:10 distribution with dark theme. To modify the colors:

1. Open `css/styles.css`
2. Locate the `:root` section at the top of the file
3. Modify the color variables:

```css
:root {
  --primary-bg: #121212;        /* Primary background (60%) */
  --secondary-bg: #2D3250;      /* Secondary background (30%) */
  --accent-color: #2D5BFF;      /* Accent color (10%) */
  --text-color: #ffffff;        /* Main text color */
  --text-secondary: #cccccc;    /* Secondary text color */
  --glass-bg: rgba(45, 50, 80, 0.3); /* Glassmorphism background */
  --glass-border: rgba(255, 255, 255, 0.1); /* Glassmorphism border */
}
```

4. Save the file

### Modifying Glassmorphism Effects

To adjust the glassmorphism effects:

1. Open `css/glassmorphism.css`
2. Modify the `.glass-card` class properties:

```css
.glass-card {
  background: rgba(45, 50, 80, 0.3);  /* Background opacity */
  backdrop-filter: blur(10px);        /* Blur intensity */
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1); /* Border opacity */
  border-radius: 15px;                /* Border radius */
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2); /* Shadow intensity */
}
```

3. Save the file

### Adjusting Three.js Animation

To modify the Three.js background animation:

1. Open `js/main.js`
2. Locate the Three.js initialization section
3. Adjust parameters such as particle count, speed, colors, etc.
4. Save the file

## Responsive Design

The portfolio is designed to be responsive across all devices. The responsive behavior is controlled by:

1. `css/responsive.css` - Contains media queries for different screen sizes
2. `js/responsive.js` - Contains JavaScript for responsive behavior

If you need to adjust the responsive behavior:

1. Modify the breakpoints in `css/responsive.css`
2. Test on various device sizes to ensure proper display

## GitHub Integration

The GitHub section is designed to display your repositories and activity. To update your GitHub username:

1. Open `js/github.js`
2. Locate the GitHub username variable
3. Replace with your GitHub username
4. Save the file

## Contact Form

The contact form is set up to send messages to your email. To update the form settings:

1. Open `index.html`
2. Locate the contact form section
3. Update the form action and method as needed
4. Save the file

## Deployment Updates

To update your deployed website:

1. Make your changes to the local files
2. Test locally by opening `index.html` in a browser
3. Once satisfied, redeploy using the same deployment method:
   - If using Manus deployment: Use the `deploy_apply_deployment` tool with the same settings
   - If using another hosting service: Follow their specific update procedures

## Troubleshooting

### Common Issues

1. **Three.js not loading**: Check browser console for errors, ensure all script paths are correct
2. **Images not displaying**: Verify image paths and file names
3. **Responsive issues**: Test on multiple devices and adjust media queries as needed
4. **GitHub integration not working**: Check your GitHub username in the configuration

### Getting Help

If you encounter issues that aren't covered in this documentation:

1. Check browser console for error messages
2. Review the code comments for guidance
3. Refer to the official documentation for specific technologies:
   - [Three.js Documentation](https://threejs.org/docs/)
   - [CSS Glassmorphism Guide](https://css-tricks.com/almanac/properties/b/backdrop-filter/)
   - [HTML/CSS/JavaScript References](https://developer.mozilla.org/)

## Backup

It's recommended to maintain a backup of your portfolio files:

1. Keep a copy of the entire `portfolio_project` directory
2. Consider using version control (like Git) to track changes
3. Backup any custom images or assets separately

## Conclusion

This portfolio website has been designed to showcase your skills, experience, and projects in an interactive and visually appealing way. The modular structure makes it easy to update as your career progresses.

Remember to keep your portfolio updated with your latest work and achievements to make the best impression on potential employers or clients.
