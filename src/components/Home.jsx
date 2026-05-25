import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal } from 'lucide-react';
import { Github, Linkedin, Instagram, Twitter } from './BrandIcons';

export default function Home({ setActiveTab }) {
  // Animation settings
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 8, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.35, ease: "easeOut" },
    },
  };

  const avatarVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      className="hero-section"
      id="home"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container">
        <div className="hero-wrapper">
          
          {/* Hero text content */}
          <div className="hero-content">
            <motion.div className="hero-tag" variants={itemVariants}>
              <Terminal size={14} />
              <span>Welcome to my workspace</span>
            </motion.div>

            <motion.h1 className="hero-name" variants={itemVariants}>
              Hi, I'm <span>Varizky Naldiba Rimra</span>
            </motion.h1>

            <motion.h3 className="hero-title" variants={itemVariants}>
              Informatics Student & Data Enthusiast
            </motion.h3>

            <motion.p className="hero-bio" variants={itemVariants}>
              "Data is Using the Past for a Better Future." Specializing in Data Science, Data Analysis, Machine Learning, Full-Stack Development, and IoT.
            </motion.p>

            <motion.div className="hero-buttons" variants={itemVariants}>
              <button 
                onClick={() => setActiveTab('projects')} 
                className="btn-primary"
              >
                Explore Projects <ArrowRight size={18} />
              </button>
            </motion.div>

            <motion.div className="hero-socials" variants={itemVariants}>
              <a 
                href="https://github.com/VarizkyNaldiba" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hero-social-link" 
                title="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/in/varizkynaldiba/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hero-social-link" 
                title="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://www.instagram.com/v.naldiba/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hero-social-link" 
                title="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://x.com/VNaldiba" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hero-social-link" 
                title="Twitter/X"
              >
                <Twitter size={20} />
              </a>
            </motion.div>
          </div>

          {/* Profile Image with Glow and interactive effects */}
          <div className="hero-image-area">
            <motion.div className="profile-avatar-wrapper" variants={avatarVariants}>
              <div className="profile-avatar-glow"></div>
              <img 
                src="/assets/image/saya.jpg" 
                alt="Varizky Naldiba Rimra" 
                className="profile-avatar"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </motion.section>
  );
}
