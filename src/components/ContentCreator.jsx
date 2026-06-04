import React from 'react';
import { motion } from 'framer-motion';
import { Video, Gamepad2, Users, Film, MessageSquare } from 'lucide-react';

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const BilibiliIcon = () => (
  <svg viewBox="0 0 64 64" fill="currentColor" width="70" height="70">
    <path d="M54 22.8c.8 0 1.5.7 1.5 1.5v20.4c0 .8-.7 1.5-1.5 1.5H10c-.8 0-1.5-.7-1.5-1.5V24.3c0-.8.7-1.5 1.5-1.5h44m0-3H10C7.2 19.8 5 22 5 24.8v20.4C5 48 7.2 50.2 10 50.2h44c2.8 0 5-2.2 5-5V24.8c0-2.8-2.2-5-5-5z" />
    <path d="M19.1 10.4l8.3 8.3-2.1 2.1-8.3-8.3zM44.9 10.4l2.1 2.1-8.3 8.3-2.1-2.1z" />
    <path d="M21 29.5h6v4.5h-6zM37 29.5h6v4.5h-6z" />
    <path d="M26 39.5c6 3 12 0 12 0" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
  </svg>
);

const getChannelData = () => [
  {
    id: 1,
    title: "TikTok Content",
    platform: "TikTok",
    desc: "Creating short-form gaming content, creative highlights, and gameplay edits from Mobile Legends, Valorant, Genshin Impact, PUBG, and more.",
    link: "https://www.tiktok.com/@oryzasatirva",
    gradient: "#161823",
    icon: TikTokIcon,
    features: [
      { icon: Gamepad2, label: "Gaming Clips" },
      { icon: Video, label: "Short Highlights" },
      { icon: Users, label: "Gaming Community" }
    ],
    buttonText: "Visit TikTok"
  },
  {
    id: 2,
    title: "Bilibili Channel",
    platform: "Bilibili",
    desc: "Sharing full gameplay videos, walkthrough guides, and high-quality game edits for a variety of popular game titles.",
    link: "https://www.bilibili.tv/id/space/1416802109",
    gradient: "#00a1d6",
    icon: BilibiliIcon,
    features: [
      { icon: Film, label: "Gameplay Videos" },
      { icon: Gamepad2, label: "Game Walkthroughs" },
      { icon: MessageSquare, label: "Interactive Space" }
    ],
    buttonText: "Visit Bilibili"
  }
];

export default function ContentCreator() {
  const channelData = getChannelData();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
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
    <section className="section-wrapper" id="content">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge">Channels</span>
          <h2 className="section-title">Content Creation</h2>
          <p className="section-desc text-secondary">
            Sharing gameplay highlights, video game edits, and walkthroughs of Mobile Legends, Valorant, Genshin Impact, PUBG, and other popular titles.
          </p>
        </div>

        {/* Content Channels Grid */}
        <motion.div 
          className="content-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {channelData.map((channel) => {
            const IconComponent = channel.icon;
            return (
              <motion.div
                key={channel.id}
                className="content-card"
                variants={cardVariants}
              >
                <div 
                  className="content-banner" 
                  style={{ background: channel.gradient }}
                >
                  <div className="content-banner-glow"></div>
                  <div className="content-banner-icon">
                    <IconComponent />
                  </div>
                </div>

                <div className="content-body">
                  <h3 className="content-title">{channel.title}</h3>
                  <p className="content-desc">{channel.desc}</p>

                  <div className="content-features">
                    {channel.features.map((feature, index) => {
                      const FeatureIcon = feature.icon;
                      return (
                        <div key={index} className="content-feature-item">
                          <FeatureIcon size={16} />
                          <span>{feature.label}</span>
                        </div>
                      );
                    })}
                  </div>

                  <a 
                    href={channel.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-glowing"
                    style={{ background: channel.platform === 'TikTok' ? '#fe2c55' : '#00b5e5' }}
                  >
                    {channel.buttonText}
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
