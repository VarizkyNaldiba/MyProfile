import { useState } from 'react';
import { Mail, Check, Copy, FileText, ArrowUpRight } from 'lucide-react';
import { Github, Linkedin, Instagram, Facebook, TikTok } from './BrandIcons';

export default function Socials() {
  const [copied, setCopied] = useState(false);
  const emailAddress = "varizkynr@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const socialLinks = [
    {
      name: "GitHub",
      handle: "@VarizkyNaldiba",
      desc: "Production repositories, machine learning models, and embedded IoT firmware.",
      url: "https://github.com/VarizkyNaldiba",
      icon: Github
    },
    {
      name: "LinkedIn",
      handle: "varizkynaldiba",
      desc: "Professional background, engineering credentials, and academic networking.",
      url: "https://www.linkedin.com/in/varizkynaldiba/",
      icon: Linkedin
    },
    {
      name: "Instagram",
      handle: "@v.naldiba",
      desc: "Technical milestones, university research activities, and campus updates.",
      url: "https://www.instagram.com/v.naldiba/",
      icon: Instagram
    },
    {
      name: "TikTok",
      handle: "@oryzasatirva",
      desc: "Short-form digital media, motion graphics video edits, and production showcase.",
      url: "https://www.tiktok.com/@oryzasatirva",
      icon: TikTok
    },
    {
      name: "Facebook",
      handle: "varizkynaldiba.rimra",
      desc: "Professional network and regional alumni community.",
      url: "https://www.facebook.com/varizkynaldiba.rimra",
      icon: Facebook
    }
  ];

  return (
    <section className="section-container" id="contact">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-head">
          <span className="section-kicker">Professional Inquiries</span>
          <h2 className="section-title">Communication & Network</h2>
          <p className="section-subtitle">
            Available for software engineering roles, applied research initiatives, and technical collaborations. Direct inquiries are welcome.
          </p>
        </div>

        {/* Primary Contact Action Hub */}
        <div className="contact-hub-wrapper">
          {/* Main Direct Email Card */}
          <div className="contact-email-card">
            <div className="email-card-icon">
              <Mail size={24} />
            </div>
            <div className="email-card-text">
              <span className="email-card-label">Primary Direct Email</span>
              <span className="email-card-address">{emailAddress}</span>
            </div>
            <div className="email-card-buttons">
              <button 
                onClick={handleCopyEmail}
                className="btn-copy-email"
                type="button"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <>
                    <Check size={14} />
                    <span>Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy Address</span>
                  </>
                )}
              </button>

              <a 
                href={`mailto:${emailAddress}`}
                className="btn-send-email"
              >
                <span>Compose Message</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* Quick Resume Download Banner */}
          <div className="resume-banner-card">
            <div className="resume-banner-content">
              <FileText size={22} className="resume-icon" />
              <div>
                <h4 className="resume-title">Curriculum Vitae</h4>
                <p className="resume-desc">Arsip komprehensif proyek rekayasa, penghargaan kompetisi nasional terverifikasi, riwayat akademik, dan sertifikasi resmi.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <a 
                href="/CV - Varizky Naldiba Rimra.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-download-resume"
                title="Download CV (PDF)"
              >
                <span>Unduh CV</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Social Network Cards Grid */}
        <div className="social-links-grid">
          {socialLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a 
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-portal-card"
              >
                <div className="social-portal-icon">
                  <Icon size={18} />
                </div>
                <div className="social-portal-content">
                  <div className="social-portal-top">
                    <span className="social-portal-name">{item.name}</span>
                    <ArrowUpRight size={13} className="portal-arrow" />
                  </div>
                  <span className="social-portal-handle">{item.handle}</span>
                  <p className="social-portal-desc">{item.desc}</p>
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
