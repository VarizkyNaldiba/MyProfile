import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';
import { Facebook, Instagram, Github, Linkedin } from './BrandIcons';

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const getSocialData = () => [
  {
    id: 1,
    name: "Facebook",
    desc: "Connect with me on Facebook for social updates and networking.",
    url: "https://www.facebook.com/varizkynaldiba.rimra",
    color: "#1877f2",
    icon: Facebook,
    actionText: "Visit Profile"
  },
  {
    id: 2,
    name: "TikTok",
    desc: "Follow my TikTok channel for engaging and creative short videos.",
    url: "https://www.tiktok.com/@oryzasatirva",
    color: "#000000",
    icon: TikTokIcon,
    actionText: "Visit Profile"
  },
  {
    id: 3,
    name: "Instagram",
    desc: "Check out my daily posts, study updates, and tech stories on Instagram.",
    url: "https://www.instagram.com/v.naldiba/",
    color: "#e4405f",
    icon: Instagram,
    actionText: "Visit Profile"
  },
  {
    id: 4,
    name: "GitHub",
    desc: "Browse my repositories, check out source code, and inspect open-source contributions.",
    url: "https://github.com/VarizkyNaldiba",
    color: "#24292e",
    icon: Github,
    actionText: "Explore Projects"
  },
  {
    id: 5,
    name: "LinkedIn",
    desc: "Connect with me professionally, read my career posts, and networking.",
    url: "https://www.linkedin.com/in/varizkynaldiba/",
    color: "#0077b5",
    icon: Linkedin,
    actionText: "Connect with Me"
  },
  {
    id: 6,
    name: "Email",
    desc: "Send me an email for collaborations, questions, or project discussions.",
    url: "mailto:varizky.naldiba@gmail.com",
    color: "#ea4335",
    icon: Mail,
    actionText: "Send Email"
  }
];

export default function Socials() {
  const socialData = getSocialData();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04 }
    }
  };

  const cardVariants = {
    hidden: { y: 6, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  return (
    <section className="section-wrapper" id="socials">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge">Connect</span>
          <h2 className="section-title">Let's Stay Connected</h2>
          <p className="section-desc text-secondary">
            Feel free to connect, collaborate, or reach out on any of these social platforms. I'm always open to discussing new ideas!
          </p>
        </div>

        {/* Social Cards Grid */}
        <motion.div 
          className="social-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {socialData.map((social) => {
            const IconComponent = social.icon;
            return (
              <motion.a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-card"
                variants={cardVariants}
              >
                <div 
                  className="social-icon-wrapper" 
                  style={{ backgroundColor: social.color }}
                >
                  <IconComponent size={28} />
                </div>

                <h3 className="social-card-title">{social.name}</h3>
                <p className="social-card-desc">{social.desc}</p>

                <div className="social-card-action">
                  <span>{social.actionText}</span>
                  <ArrowRight size={14} />
                </div>
              </motion.a>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
