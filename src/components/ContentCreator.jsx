import { ArrowUpRight } from 'lucide-react';
import { TikTok, Bilibili } from './BrandIcons';

export default function ContentCreator() {
  const channels = [
    {
      id: 'tiktok',
      platform: 'TikTok',
      handle: '@oryzasatirva',
      title: 'Short-Form Motion Production & Visual Storytelling',
      desc: 'Producing dynamic short-form video reels, competitive mechanics pacing, and motion graphics—optimizing editorial retention and cross-platform engagement.',
      url: 'https://www.tiktok.com/@oryzasatirva',
      icon: TikTok,
      tags: ['Motion Graphics', 'Short-Form Production', 'Audience Growth'],
      cta: 'Explore TikTok Channel'
    },
    {
      id: 'bilibili',
      platform: 'Bilibili',
      handle: 'Space 1416802109',
      title: 'Long-Form Video Documentation & Game Analysis',
      desc: 'Publishing high-fidelity match archives, in-depth mechanic breakdowns, and comprehensive video guides for dedicated community audiences.',
      url: 'https://www.bilibili.tv/id/space/1416802109',
      icon: Bilibili,
      tags: ['Long-Form Documentation', 'Mechanics Analysis', 'Community Publishing'],
      cta: 'Explore Bilibili Channel'
    }
  ];

  return (
    <section className="section-container" id="creative">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-head">
          <span className="section-kicker">Digital Media & Production</span>
          <h2 className="section-title">Media Production & Distribution</h2>
          <p className="section-subtitle">
            Applying digital storytelling, video engineering, and audience engagement strategies across high-reach multimedia channels.
          </p>
        </div>

        {/* Channel Cards */}
        <div className="creative-card-grid">
          {channels.map((ch) => {
            const Icon = ch.icon;
            return (
              <div key={ch.id} className="creative-card">
                <div className="creative-card-header">
                  <div className="creative-icon-wrap">
                    <Icon size={22} />
                  </div>
                  <div className="creative-platform-meta">
                    <span className="creative-platform-name">{ch.platform}</span>
                    <span className="creative-handle">{ch.handle}</span>
                  </div>
                </div>

                <h3 className="creative-title">{ch.title}</h3>
                <p className="creative-desc">{ch.desc}</p>

                <div className="creative-tags">
                  {ch.tags.map(t => (
                    <span key={t} className="creative-tag-pill">{t}</span>
                  ))}
                </div>

                <a 
                  href={ch.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="creative-cta-btn"
                >
                  <span>{ch.cta}</span>
                  <ArrowUpRight size={15} />
                </a>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
