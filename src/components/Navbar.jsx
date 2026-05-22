import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, FolderGit2 } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'content', label: 'Content Creator' },
    { id: 'socials', label: 'Social Media' },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    // Smooth scroll to top when changing tab
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <a href="#home" className="nav-brand" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>
        <FolderGit2 size={22} className="brand-accent" />
        <span>Porto<span className="brand-accent">folio</span></span>
      </a>

      {/* Desktop Menu */}
      <ul className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <li key={item.id}>
            <a
              className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="nav-actions">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="theme-toggle-btn"
          aria-label="Toggle Theme"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
}
