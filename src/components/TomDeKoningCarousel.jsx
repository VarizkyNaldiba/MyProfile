import { useState, useRef, useEffect, useCallback } from 'react';
import { 
  ChevronLeft, ChevronRight, ArrowUpRight, ExternalLink, 
  X, CheckCircle, Maximize2
} from 'lucide-react';
import { Github } from './BrandIcons';
import { projectsData } from '../projects';

const CATEGORIES = [
  { id: 'All', label: 'All Projects', count: 13 },
  { id: 'Machine Learning', label: 'Machine Learning & CV', count: 5 },
  { id: 'IoT', label: 'IoT & Telemetry', count: 4 },
  { id: 'Data Science', label: 'Data Science & GIS', count: 4 },
  { id: 'Web Dev', label: 'Web & Enterprise', count: 4 }
];

const getImgSrc = (img) => {
  if (!img) return '';
  if (typeof img === 'string') return img;
  if (img.src) return img.src;
  if (img.default) return typeof img.default === 'string' ? img.default : (img.default.src || '');
  return '';
};

export default function TomDeKoningCarousel() {
  const [selectedCat, setSelectedCat] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeModalImg, setActiveModalImg] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const trackRef = useRef(null);

  const filteredProjects = projectsData.filter((p) => {
    if (selectedCat === 'All') return true;
    return p.categories.some(c => c.toLowerCase().includes(selectedCat.toLowerCase()));
  });

  // Calculate scroll position and active index
  const handleScroll = () => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) {
      setCurrentIndex(0);
      return;
    }
    const ratio = scrollLeft / maxScroll;
    const idx = Math.min(
      Math.round(ratio * (filteredProjects.length - 1)),
      filteredProjects.length - 1
    );
    setCurrentIndex(Math.max(0, idx));
  };

  const scrollToCard = (index) => {
    if (!trackRef.current) return;
    const cards = trackRef.current.querySelectorAll('.carousel-project-card');
    if (cards[index]) {
      cards[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      });
    }
  };

  const handlePrev = useCallback(() => {
    const nextIdx = Math.max(0, currentIndex - 1);
    scrollToCard(nextIdx);
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    const nextIdx = Math.min(filteredProjects.length - 1, currentIndex + 1);
    scrollToCard(nextIdx);
  }, [currentIndex, filteredProjects.length]);

  // Drag-to-scroll implementation
  const handleMouseDown = (e) => {
    if (!trackRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 1.6;
    trackRef.current.scrollLeft = scrollLeft - walk;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedProject) {
        if (e.key === 'Escape') setSelectedProject(null);
        return;
      }
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, handlePrev, handleNext]);

  const progressPercent = filteredProjects.length > 0 
    ? Math.min(100, Math.round(((currentIndex + 1) / filteredProjects.length) * 100))
    : 0;

  // Find honor label for key projects
  const getProjectHonor = (slug) => {
    switch (slug) {
      case 'catfishcare-tfs2026':
        return 'Juara Harapan 2 LKTI Techno Fair and Seminar (TFS) 2026';
      case 'pkm-gft-sais':
        return 'PKM-GFT 2026 Tahap 2';
      case 'algasense':
        return 'Finalis Nasional LKTI Techno Fair and Seminar (TFS) 2025';
      case 'agroclimatology-intelecta':
        return 'Peringkat 18/82 Kaggle 94.310';
      case 'slb-spatial-disparity':
        return 'Peserta Resmi Jatim Datathon 2025';
      case 'crowd-density-hology':
        return 'Peserta Resmi Hology 8.0';
      default:
        return null;
    }
  };

  return (
    <section className="section-padding carousel-section" id="projects">
      <div className="container">
        
        {/* Section Head */}
        <div className="section-head">
          <div className="kicker">Featured Engineering Systems</div>
          <h2 className="section-title">13 Engineered Systems & Portfolios</h2>
          <p className="section-subtitle">
            Pilih kategori atau geser trek horisontal untuk mengeksplorasi arsitektur machine learning, telemetri IoT akuakultur, WebGIS hidrologi, dan platform enterprise.
          </p>
        </div>

        {/* Controls Bar: Categories & Counter/Arrows */}
        <div className="carousel-controls-bar">
          {/* Category Filter Pills */}
          <div className="carousel-filter-pills">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                type="button"
                className={`filter-pill ${selectedCat === cat.id ? 'active' : ''}`}
                onClick={() => {
                  setSelectedCat(cat.id);
                  setCurrentIndex(0);
                  if (trackRef.current) trackRef.current.scrollLeft = 0;
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Navigation Controls: Slide Counter & Prev/Next */}
          <div className="carousel-nav-group">
            <div className="carousel-counter">
              <span className="active-num">
                {String(currentIndex + 1).padStart(2, '0')}
              </span>
              {' '}/ {String(filteredProjects.length).padStart(2, '0')}
            </div>
            
            <button
              type="button"
              className="carousel-arrow-btn"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              aria-label="Previous slide"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              className="carousel-arrow-btn"
              onClick={handleNext}
              disabled={currentIndex >= filteredProjects.length - 1}
              aria-label="Next slide"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

      </div>

      {/* Full-width Draggable Track */}
      <div 
        className="carousel-track-outer"
        ref={trackRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div className="carousel-track-inner">
          {filteredProjects.map((proj, idx) => {
            const coverImg = proj.images && proj.images[0] ? getImgSrc(proj.images[0]) : '';
            const honor = getProjectHonor(proj.slug);
            const numStr = String(idx + 1).padStart(2, '0');

            return (
              <article 
                key={proj.id} 
                className="carousel-project-card"
                onClick={() => {
                  setSelectedProject(proj);
                  setActiveModalImg(0);
                }}
              >
                {/* Image Cover */}
                <div className="card-img-wrap">
                  {coverImg ? (
                    <img 
                      src={coverImg} 
                      alt={proj.title}
                      loading="lazy"
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: '#111622' }} />
                  )}
                  
                  <div className="card-badge-row">
                    <span className="card-cat-badge">{proj.categories[0] || 'Engineering'}</span>
                    {honor && (
                      <span className="card-honor-badge">{honor}</span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="card-body">
                  <span className="card-index">SYSTEM {numStr}</span>
                  <h3 className="card-title">{proj.title}</h3>
                  <span className="card-role">{proj.role}</span>
                  <p className="card-desc">{proj.desc}</p>

                  {/* Tech Tags Cloud */}
                  <div className="card-tech-cloud">
                    {proj.tech.slice(0, 4).map((t, i) => (
                      <span key={i} className="card-tech-pill">{t}</span>
                    ))}
                    {proj.tech.length > 4 && (
                      <span className="card-tech-pill">+{proj.tech.length - 4}</span>
                    )}
                  </div>

                  {/* Footer Actions */}
                  <div className="card-footer-actions" onClick={(e) => e.stopPropagation()}>
                    <button 
                      type="button"
                      className="card-explore-btn"
                      onClick={() => {
                        setSelectedProject(proj);
                        setActiveModalImg(0);
                      }}
                    >
                      <Maximize2 size={14} />
                      <span>Deep Dive Specs</span>
                    </button>

                    <div className="card-links-group">
                      {proj.links && proj.links.map((link, lIdx) => {
                        const isGit = link.url.includes('github.com');
                        return (
                          <a
                            key={lIdx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="card-link-icon"
                            title={link.label}
                            aria-label={link.label}
                          >
                            {isGit ? <Github size={14} /> : <ExternalLink size={14} />}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="container">
        {/* Continuous Progress Bar */}
        <div className="carousel-progress-track">
          <div 
            className="carousel-progress-bar"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* ==========================================================================
          INTERACTIVE DEEP DIVE MODAL
          ========================================================================== */}
      {selectedProject && (
        <div 
          className="modal-backdrop"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="modal-header">
              <div>
                <span className="card-index">SPECIFICATION ARCHIVE · #{selectedProject.id}</span>
                <h2 className="modal-title" style={{ fontSize: '1.65rem', fontWeight: 800, color: '#fff' }}>
                  {selectedProject.title}
                </h2>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {selectedProject.role}
                </span>
              </div>
              <button 
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="modal-content-body">
              
              {/* Gallery of Assets */}
              {selectedProject.images && selectedProject.images.length > 0 && (
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-subtle)', marginBottom: '0.75rem', aspectRatio: '16/9', background: '#090b10' }}>
                    <img 
                      src={getImgSrc(selectedProject.images[activeModalImg])} 
                      alt={selectedProject.title}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </div>
                  {selectedProject.images.length > 1 && (
                    <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                      {selectedProject.images.map((img, iIdx) => (
                        <button
                          key={iIdx}
                          type="button"
                          onClick={() => setActiveModalImg(iIdx)}
                          style={{
                            width: '80px',
                            height: '52px',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            border: activeModalImg === iIdx ? '2px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                            background: '#090b10',
                            padding: 0,
                            cursor: 'pointer'
                          }}
                        >
                          <img 
                            src={getImgSrc(img)} 
                            alt={`Preview ${iIdx + 1}`}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Overview & Context */}
              {selectedProject.details?.overview && (
                <div className="modal-section-block">
                  <h4 className="modal-section-title">System Architecture Overview</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', lineHeight: 1.65 }}>
                    {selectedProject.details.overview}
                  </p>
                </div>
              )}

              {/* Core Features */}
              {selectedProject.details?.features && (
                <div className="modal-section-block">
                  <h4 className="modal-section-title">Engineered Capabilities</h4>
                  <ul className="modal-features-list">
                    {selectedProject.details.features.map((feat, fIdx) => (
                      <li key={fIdx} className="modal-feature-item">
                        <CheckCircle size={16} className="modal-feature-bullet" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Engineering Challenges & Solution */}
              {(selectedProject.details?.challenges || selectedProject.details?.solution) && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.75rem' }}>
                  {selectedProject.details?.challenges && (
                    <div style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '12px', padding: '1.25rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f87171', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.4rem' }}>
                        Engineering Challenge
                      </span>
                      <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                        {selectedProject.details.challenges}
                      </p>
                    </div>
                  )}

                  {selectedProject.details?.solution && (
                    <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '12px', padding: '1.25rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.4rem' }}>
                        Architected Solution
                      </span>
                      <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                        {selectedProject.details.solution}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Full Tech Stack */}
              <div className="modal-section-block">
                <h4 className="modal-section-title">Technology Stack & Frameworks</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {selectedProject.tech.map((t, idx) => (
                    <span 
                      key={idx}
                      style={{
                        padding: '0.35rem 0.75rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '9999px',
                        fontSize: '0.8rem',
                        color: 'var(--text-main)',
                        fontWeight: 500
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons Row */}
              {selectedProject.links && selectedProject.links.length > 0 && (
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)', marginTop: '2rem' }}>
                  {selectedProject.links.map((link, lIdx) => (
                    <a
                      key={lIdx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm"
                      style={{ textDecoration: 'none' }}
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight size={14} />
                    </a>
                  ))}
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </section>
  );
}
