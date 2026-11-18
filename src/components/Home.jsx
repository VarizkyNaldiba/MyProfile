import { motion } from 'framer-motion';
import { ArrowRight, FileText, Mail, MapPin } from 'lucide-react';
import { Github, Linkedin, Instagram } from './BrandIcons';

export default function Home() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 80;
      const targetPos = el.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 12, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] },
    },
  };

  return (
    <section className="hero-section" id="home">
      <div className="container">
        <motion.div
          className="hero-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Hero Copy */}
          <div className="hero-main">
            {/* Live Status Pill */}
            <motion.div className="status-pill" variants={itemVariants}>
              <span className="status-dot"></span>
              <span className="status-text">Open to Software & ML Engineering Opportunities</span>
            </motion.div>

            {/* Name & Headline */}
            <motion.h1 className="hero-heading" variants={itemVariants}>
              Varizky Naldiba Rimra
            </motion.h1>

            <motion.div className="hero-subheading" variants={itemVariants}>
              <span>Applied Machine Learning</span>
              <span className="hero-separator">/</span>
              <span>IoT Systems Engineer</span>
            </motion.div>

            {/* Location & Institution Tag */}
            <motion.div className="hero-meta" variants={itemVariants}>
              <span className="meta-item">
                <MapPin size={14} /> Malang, East Java, Indonesia
              </span>
              <span className="meta-bullet">•</span>
              <span className="meta-item">Politeknik Negeri Malang (Polinema)</span>
            </motion.div>

            {/* Executive Bio */}
            <motion.p className="hero-paragraph" variants={itemVariants}>
              Informatics Engineer with a proven track record in architecting data-driven systems. 
              Specializing in applied machine learning, computer vision pipelines, and IoT edge telemetry—delivering 
              resilient solutions from calibrated microcontroller firmware and spatial analytics to cloud-connected platforms.
            </motion.p>

            {/* Primary Action Buttons */}
            <motion.div className="hero-actions" variants={itemVariants}>
              <button 
                onClick={() => scrollTo('projects')} 
                className="btn-primary"
              >
                <span>View Engineered Projects</span>
                <ArrowRight size={16} />
              </button>

              <a 
                href="/CV - Varizky Naldiba Rimra.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                title="Download Curriculum Vitae (PDF)"
              >
                <FileText size={16} />
                <span>Curriculum Vitae (PDF)</span>
              </a>

              <a 
                href="/Portofolio - Varizky Naldiba Rimra.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                title="Download Portfolio Presentation Deck (PDF)"
              >
                <FileText size={16} />
                <span>Portfolio Deck (PDF)</span>
              </a>

              <button 
                onClick={() => scrollTo('contact')} 
                className="btn-ghost"
              >
                <Mail size={16} />
                <span>Contact Directly</span>
              </button>
            </motion.div>

            {/* Social & Contact Direct Links */}
            <motion.div className="hero-social-row" variants={itemVariants}>
              <a 
                href="https://github.com/VarizkyNaldiba" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon-btn" 
                title="GitHub Profile"
                aria-label="GitHub Profile"
              >
                <Github size={18} />
              </a>
              <a 
                href="https://www.linkedin.com/in/varizkynaldiba/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon-btn" 
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="mailto:varizkynr@gmail.com" 
                className="social-icon-btn" 
                title="Email: varizkynr@gmail.com"
                aria-label="Send Email"
              >
                <Mail size={18} />
              </a>
              <a 
                href="https://www.instagram.com/v.naldiba/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon-btn" 
                title="Instagram Profile"
                aria-label="Instagram Profile"
              >
                <Instagram size={18} />
              </a>
            </motion.div>
          </div>

          {/* Profile Card / Avatar Column */}
          <motion.div className="hero-profile-col" variants={itemVariants}>
            <div className="profile-card">
              <div className="profile-image-container">
                <img 
                  src="/assets/image/saya.jpg" 
                  alt="Varizky Naldiba Rimra" 
                  className="profile-img"
                  fetchpriority="high"
                  width="400"
                  height="400"
                />
              </div>

              {/* Quick Highlight Stats */}
              <div className="profile-stats-grid">
                <div className="stat-box">
                  <span className="stat-number">13</span>
                  <span className="stat-label">Engineered Systems</span>
                </div>
                <div className="stat-box">
                  <span className="stat-number">Awarded</span>
                  <span className="stat-label">TFS & Competition Honors</span>
                </div>
                <div className="stat-box">
                  <span className="stat-number">Polinema</span>
                  <span className="stat-label">Informatics Engineering</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
