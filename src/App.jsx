import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import ContentCreator from './components/ContentCreator';
import Socials from './components/Socials';
import { ArrowUp } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.querySelector('meta[name="color-scheme"]')?.setAttribute('content', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="site-wrapper">
      {/* Navigation Header */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Main Content Sections */}
      <main className="main-content">
        <Home />
        <About />
        <Projects />
        <Skills />
        <ContentCreator />
        <Socials />
      </main>

      {/* Modern Footer */}
      <footer className="site-footer">
        <div className="container footer-container">
          <div className="footer-left">
            <span className="footer-brand">Varizky Naldiba Rimra</span>
            <p className="footer-subtext">
              Informatics Engineering — State Polytechnic of Malang. Applied Machine Learning & IoT Systems.
            </p>
          </div>

          <div className="footer-right">
            <p className="footer-copyright">
              &copy; {new Date().getFullYear()} Varizky Naldiba Rimra. All rights reserved.
            </p>
            <button
              onClick={scrollToTop}
              className="btn-back-to-top"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
