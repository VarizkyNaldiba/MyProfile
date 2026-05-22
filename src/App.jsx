import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Projects from './components/Projects';
import ContentCreator from './components/ContentCreator';
import Socials from './components/Socials';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home key="home" setActiveTab={setActiveTab} />;
      case 'projects':
        return <Projects key="projects" />;
      case 'content':
        return <ContentCreator key="content" />;
      case 'socials':
        return <Socials key="socials" />;
      default:
        return <Home key="home" setActiveTab={setActiveTab} />;
    }
  };

  // Page Transition Animations (Minimalist snappy fade)
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <div className="app-container">
      {/* Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        theme={theme} 
        toggleTheme={toggleTheme} 
      />

      {/* Main View Shell with animated transitions */}
      <main style={{ flexGrow: 1 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Unified Footer */}
      <footer className="footer">
        <div className="container">
          <p className="footer-text">
            &copy; {new Date().getFullYear()} Varizky Naldiba Rimra. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
