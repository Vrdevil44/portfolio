import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './NavigationBar.css';

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const handleNavClick = (section, isVDTab = false) => {
    if (isVDTab) {
      setIsOpen(prev => !prev);
    } else {
      setActiveSection(section);
    }
  };

  return (
    <div className={`nav-container ${isOpen ? 'open' : ''}`} data-design-id="nav-container">
      <nav className="navigation-panel" data-design-id="nav-panel">
        <ul className="nav-links" data-design-id="nav-links">
          {[
            { id: 'home', label: 'Home', path: '/' },
            { id: 'about', label: 'About', path: '/about' },
            { id: 'projects', label: 'Projects', path: '/projects' },
            { id: 'services', label: 'Services', path: '/services' },
            { id: 'blog', label: 'Blog', path: '/blog' },
            { id: 'labs', label: 'Labs', path: '/labs' },
            { id: 'resume', label: 'Resume', path: '/resume' },
            { id: 'store', label: 'Store', path: '/store' },
            { id: 'gallery', label: 'Gallery', path: '/gallery' },
            { id: 'contact', label: 'Contact', path: '/contact' },
            { id: 'vd', label: 'VD', isVDTab: true }
          ].map(({ id, label, path, isVDTab }) => (
            <li key={id} data-design-id={`nav-item-${id}`}>
              {isVDTab ? (
                <a
                  href="#"
                  className={activeSection === id ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(id, true);
                  }}
                  data-design-id={`nav-link-${id}`}
                >
                  {label}
                </a>
              ) : (
                <NavLink
                  to={path}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                  onClick={() => handleNavClick(id)}
                  end={id === 'home'}
                  data-design-id={`nav-link-${id}`}
                >
                  {label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default NavigationBar; 