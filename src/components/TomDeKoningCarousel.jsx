import { useState, useRef, useEffect, useCallback } from 'react';
import { 
  ChevronLeft, ChevronRight, ArrowUpRight, ExternalLink, 
  X, CheckCircle, Maximize2, Check, Image as ImageIcon,
  GalleryHorizontal, Columns2
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
  
  // View Mode: 'horizontal' (Geser Samping) or 'vertical' (Vertikal Kiri-Kanan)
  const [viewMode, setViewMode] = useState('horizontal');

  // Custom cover image index per project (allows swapping the outer photo)
  const [cardCoverIndexes, setCardCoverIndexes] = useState({});

  // Drag & momentum physics states
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Floating cursor follower states (tomdekoning.work style)
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorMode, setCursorMode] = useState('drag'); // 'drag' | 'view' | 'grab'

  const trackRef = useRef(null);
  const isProgrammaticScroll = useRef(false);
  const scrollTimeoutRef = useRef(null);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const momentumRafRef = useRef(null);

  const filteredProjects = projectsData.filter((p) => {
    if (selectedCat === 'All') return true;
    return p.categories.some(c => c.toLowerCase().includes(selectedCat.toLowerCase()));
  });

  // Accurate scroll handler: syncs currentIndex based on which card center is closest to track center
  const handleScroll = () => {
    if (!trackRef.current || isProgrammaticScroll.current) return;
    const track = trackRef.current;
    const cards = track.querySelectorAll('.carousel-project-card');
    if (!cards || cards.length === 0) return;

    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    let closestIdx = 0;
    let minDiff = Infinity;

    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const diff = Math.abs(cardCenter - trackCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = i;
      }
    });

    setCurrentIndex(closestIdx);
  };

  // Programmatic smooth scroll to card index (solves arrow error & avoids scrollIntoView window jump)
  const scrollToCardIndex = useCallback((targetIdx) => {
    if (!trackRef.current) return;
    const cards = trackRef.current.querySelectorAll('.carousel-project-card');
    if (!cards || cards.length === 0) return;

    const boundedIdx = Math.max(0, Math.min(filteredProjects.length - 1, targetIdx));
    const targetCard = cards[boundedIdx];
    if (!targetCard) return;

    isProgrammaticScroll.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    if (momentumRafRef.current) cancelAnimationFrame(momentumRafRef.current);

    const track = trackRef.current;
    const paddingLeft = parseFloat(getComputedStyle(track).paddingLeft) || 0;
    const targetLeft = targetCard.offsetLeft - track.offsetLeft - paddingLeft;

    track.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: 'smooth'
    });

    setCurrentIndex(boundedIdx);

    scrollTimeoutRef.current = setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 450);
  }, [filteredProjects.length]);

  const handlePrev = useCallback(() => {
    scrollToCardIndex(currentIndex - 1);
  }, [currentIndex, scrollToCardIndex]);

  const handleNext = useCallback(() => {
    scrollToCardIndex(currentIndex + 1);
  }, [currentIndex, scrollToCardIndex]);

  // Horizontal mouse-wheel support in carousel mode (seamless horizontal glide like tomdekoning.work)
  useEffect(() => {
    const track = trackRef.current;
    if (!track || viewMode !== 'horizontal') return;

    const onWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && Math.abs(e.deltaY) > 5) {
        e.preventDefault();
        track.scrollLeft += e.deltaY * 1.25;
      }
    };

    track.addEventListener('wheel', onWheel, { passive: false });
    return () => track.removeEventListener('wheel', onWheel);
  }, [viewMode]);

  // Drag-to-scroll with inertia momentum implementation
  const handleMouseDown = (e) => {
    if (!trackRef.current || viewMode !== 'horizontal') return;
    if (momentumRafRef.current) cancelAnimationFrame(momentumRafRef.current);

    setIsDragging(true);
    setCursorMode('grab');
    setStartX(e.pageX);
    setScrollLeft(trackRef.current.scrollLeft);
    lastXRef.current = e.pageX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setCursorVisible(false);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setCursorMode('drag');

    // Apply inertia deceleration
    let vel = velocityRef.current * 16;
    const friction = 0.92;

    const stepMomentum = () => {
      if (Math.abs(vel) < 0.5 || !trackRef.current) return;
      trackRef.current.scrollLeft -= vel;
      vel *= friction;
      momentumRafRef.current = requestAnimationFrame(stepMomentum);
    };

    momentumRafRef.current = requestAnimationFrame(stepMomentum);
  };

  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
    if (!cursorVisible) setCursorVisible(true);

    if (!isDragging || !trackRef.current || viewMode !== 'horizontal') return;
    e.preventDefault();

    const now = performance.now();
    const dt = now - lastTimeRef.current;
    if (dt > 0) {
      const dx = e.pageX - lastXRef.current;
      velocityRef.current = dx / dt;
      lastXRef.current = e.pageX;
      lastTimeRef.current = now;
    }

    const walk = (e.pageX - startX) * 1.35;
    trackRef.current.scrollLeft = scrollLeft - walk;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedProject) {
        if (e.key === 'Escape') setSelectedProject(null);
        return;
      }
      if (viewMode === 'horizontal') {
        if (e.key === 'ArrowLeft') handlePrev();
        if (e.key === 'ArrowRight') handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, viewMode, handlePrev, handleNext]);

  // Photo Switcher on Card: lets visitor/user flip outer photo right on the card
  const handleCardPhotoSwitch = (e, proj, direction) => {
    e.stopPropagation();
    const total = proj.images ? proj.images.length : 1;
    if (total <= 1) return;

    setCardCoverIndexes(prev => {
      const current = prev[proj.id] ?? 0;
      const next = (current + direction + total) % total;
      return { ...prev, [proj.id]: next };
    });
  };

  const handleSetCoverDirect = (e, projId, idx) => {
    e.stopPropagation();
    setCardCoverIndexes(prev => ({ ...prev, [projId]: idx }));
  };

  const progressPercent = filteredProjects.length > 0 
    ? Math.min(100, Math.round(((currentIndex + 1) / filteredProjects.length) * 100))
    : 0;

  // Find honor label for key projects
  const getProjectHonor = (slug) => {
    switch (slug) {
      case 'catfishcare-tfs2026':
        return 'Juara Harapan 2 LKTI Techno Fair and Seminar (TFS) 2026';
      case 'pkm-gft-sais':
        return 'PKM-GFT 2026 Tahap 2 Insentif';
      case 'algasense':
        return 'Finalis Nasional LKTI Techno Fair and Seminar (TFS) 2025';
      case 'agroclimatology-intelecta':
        return 'Peringkat 18/82 Intelecta Cup';
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
      {/* Floating magnetic cursor (tomdekoning.work luxury follower - active in horizontal mode) */}
      {cursorVisible && !selectedProject && viewMode === 'horizontal' && (
        <div 
          className={`tdk-cursor-pill ${cursorMode === 'view' ? 'view-mode' : ''} ${cursorMode === 'grab' ? 'grab-mode' : ''}`}
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`
          }}
        >
          {cursorMode === 'grab' ? 'GRABBING' : (cursorMode === 'view' ? 'VIEW SPECS ↗' : '← DRAG →')}
        </div>
      )}

      <div className="container">
        
        {/* Section Head */}
        <div className="section-head">
          <div className="kicker">Featured Engineering Systems</div>
          <h2 className="section-title">13 Engineered Systems & Portfolios</h2>
          <p className="section-subtitle">
            Pilih tata letak (Geser Samping atau Vertikal Kiri-Kanan) dan filter kategori untuk mengeksplorasi arsitektur machine learning, telemetri IoT, WebGIS, dan platform enterprise.
          </p>
        </div>

        {/* Controls Bar: Categories & Layout Mode Switcher */}
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

          {/* Navigation Controls & View Mode Toggle */}
          <div className="carousel-nav-group">
            {/* View Mode Toggle: Samping (Carousel) vs Vertikal (Kiri-Kanan) */}
            <div className="view-mode-toggle-group">
              <button
                type="button"
                className={`view-toggle-btn ${viewMode === 'horizontal' ? 'active' : ''}`}
                onClick={() => setViewMode('horizontal')}
                title="Tampilan Geser Samping (Horizontal Carousel)"
                aria-label="Tampilan Geser Samping"
              >
                <GalleryHorizontal size={15} />
                <span>Samping</span>
              </button>
              <button
                type="button"
                className={`view-toggle-btn ${viewMode === 'vertical' ? 'active' : ''}`}
                onClick={() => setViewMode('vertical')}
                title="Tampilan Vertikal Kiri-Kanan (Split Showcase)"
                aria-label="Tampilan Vertikal Kiri-Kanan"
              >
                <Columns2 size={15} />
                <span>Vertikal Kiri-Kanan</span>
              </button>
            </div>

            {/* In Horizontal Mode: Show slide counter & arrow buttons */}
            {viewMode === 'horizontal' ? (
              <>
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
                  title="Previous project"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  className="carousel-arrow-btn"
                  onClick={handleNext}
                  disabled={currentIndex >= filteredProjects.length - 1}
                  aria-label="Next slide"
                  title="Next project"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            ) : (
              <div className="carousel-counter">
                <span className="active-num">{filteredProjects.length}</span> Systems Listed
              </div>
            )}
          </div>
        </div>

      </div>

      {/* ==========================================================================
          VIEW MODE 1: HORIZONTAL CAROUSEL (SAMPING / TOM DE KONING STYLE)
          ========================================================================== */}
      {viewMode === 'horizontal' && (
        <>
          <div 
            className="carousel-track-outer"
            ref={trackRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setCursorVisible(true)}
          >
            <div className="carousel-track-inner">
              {filteredProjects.map((proj, idx) => {
                const totalImgs = proj.images ? proj.images.length : 0;
                const activeCoverIdx = cardCoverIndexes[proj.id] ?? 0;
                const coverImg = (proj.images && proj.images[activeCoverIdx]) 
                  ? getImgSrc(proj.images[activeCoverIdx]) 
                  : (proj.images && proj.images[0] ? getImgSrc(proj.images[0]) : '');
                const honor = getProjectHonor(proj.slug);
                const numStr = String(idx + 1).padStart(2, '0');

                return (
                  <article 
                    key={proj.id} 
                    className="carousel-project-card"
                    onMouseEnter={() => setCursorMode('view')}
                    onMouseLeave={() => setCursorMode('drag')}
                    onClick={() => {
                      setSelectedProject(proj);
                      setActiveModalImg(activeCoverIdx);
                    }}
                  >
                    {/* Image Cover with Interactive Switcher */}
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
                      
                      {/* Category & Honor Badges */}
                      <div className="card-badge-row">
                        <span className="card-cat-badge">{proj.categories[0] || 'Engineering'}</span>
                        {honor && (
                          <span className="card-honor-badge">{honor}</span>
                        )}
                      </div>

                      {/* Interactive Photo Switcher Controls */}
                      {totalImgs > 1 && (
                        <>
                          <button
                            type="button"
                            className="card-photo-switcher prev-photo"
                            onClick={(e) => handleCardPhotoSwitch(e, proj, -1)}
                            title="Foto Sebelumnya"
                            aria-label="Previous photo"
                          >
                            <ChevronLeft size={16} />
                          </button>

                          <button
                            type="button"
                            className="card-photo-switcher next-photo"
                            onClick={(e) => handleCardPhotoSwitch(e, proj, 1)}
                            title="Foto Berikutnya"
                            aria-label="Next photo"
                          >
                            <ChevronRight size={16} />
                          </button>

                          <div className="card-photo-dots" onClick={(e) => e.stopPropagation()}>
                            {proj.images.map((_, pIdx) => (
                              <button
                                key={pIdx}
                                type="button"
                                className={`card-photo-dot ${activeCoverIdx === pIdx ? 'active' : ''}`}
                                onClick={(e) => handleSetCoverDirect(e, proj.id, pIdx)}
                                title={`Foto ${pIdx + 1} dari ${totalImgs}`}
                                aria-label={`Switch to photo ${pIdx + 1}`}
                              />
                            ))}
                          </div>

                          <div className="card-photo-pill">
                            {activeCoverIdx + 1}/{totalImgs}
                          </div>
                        </>
                      )}
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
                            setActiveModalImg(activeCoverIdx);
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
        </>
      )}

      {/* ==========================================================================
          VIEW MODE 2: VERTICAL LEFT-RIGHT SPLIT SHOWCASE (VERTIKAL KIRI-KANAN / SAMPING)
          ========================================================================== */}
      {viewMode === 'vertical' && (
        <div className="container">
          <div className="projects-vertical-stack">
            {filteredProjects.map((proj, idx) => {
              const totalImgs = proj.images ? proj.images.length : 0;
              const activeCoverIdx = cardCoverIndexes[proj.id] ?? 0;
              const coverImg = (proj.images && proj.images[activeCoverIdx]) 
                ? getImgSrc(proj.images[activeCoverIdx]) 
                : (proj.images && proj.images[0] ? getImgSrc(proj.images[0]) : '');
              const honor = getProjectHonor(proj.slug);
              const numStr = String(idx + 1).padStart(2, '0');

              return (
                <article 
                  key={proj.id} 
                  className="vertical-project-card"
                  onClick={() => {
                    setSelectedProject(proj);
                    setActiveModalImg(activeCoverIdx);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Left Column (Kiri): Large Image with Photo Switcher */}
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
                    
                    {/* Badges */}
                    <div className="card-badge-row">
                      <span className="card-cat-badge">{proj.categories[0] || 'Engineering'}</span>
                      {honor && (
                        <span className="card-honor-badge">{honor}</span>
                      )}
                    </div>

                    {/* Photo Switcher on Card */}
                    {totalImgs > 1 && (
                      <>
                        <button
                          type="button"
                          className="card-photo-switcher prev-photo"
                          onClick={(e) => handleCardPhotoSwitch(e, proj, -1)}
                          title="Foto Sebelumnya"
                          aria-label="Previous photo"
                        >
                          <ChevronLeft size={16} />
                        </button>

                        <button
                          type="button"
                          className="card-photo-switcher next-photo"
                          onClick={(e) => handleCardPhotoSwitch(e, proj, 1)}
                          title="Foto Berikutnya"
                          aria-label="Next photo"
                        >
                          <ChevronRight size={16} />
                        </button>

                        <div className="card-photo-dots" onClick={(e) => e.stopPropagation()}>
                          {proj.images.map((_, pIdx) => (
                            <button
                              key={pIdx}
                              type="button"
                              className={`card-photo-dot ${activeCoverIdx === pIdx ? 'active' : ''}`}
                              onClick={(e) => handleSetCoverDirect(e, proj.id, pIdx)}
                              title={`Foto ${pIdx + 1} dari ${totalImgs}`}
                              aria-label={`Switch to photo ${pIdx + 1}`}
                            />
                          ))}
                        </div>

                        <div className="card-photo-pill">
                          {activeCoverIdx + 1}/{totalImgs}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Right Column (Kanan / Samping): Full Details & Actions */}
                  <div className="card-body">
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                        <span className="card-index">SYSTEM {numStr}</span>
                        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                          ID: #{proj.id}
                        </span>
                      </div>

                      <h3 className="card-title" style={{ fontSize: '1.45rem', marginBottom: '0.35rem' }}>
                        {proj.title}
                      </h3>
                      
                      <span className="card-role" style={{ fontSize: '0.88rem', marginBottom: '1rem', display: 'block' }}>
                        {proj.role}
                      </span>

                      <p className="card-desc">
                        {proj.desc}
                      </p>

                      {/* Tech Tags Cloud */}
                      <div className="card-tech-cloud" style={{ marginBottom: '1.75rem' }}>
                        {proj.tech.map((t, i) => (
                          <span key={i} className="card-tech-pill">{t}</span>
                        ))}
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="card-footer-actions" onClick={(e) => e.stopPropagation()} style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem', marginTop: '1rem' }}>
                      <button 
                        type="button"
                        className="card-explore-btn"
                        onClick={() => {
                          setSelectedProject(proj);
                          setActiveModalImg(activeCoverIdx);
                        }}
                      >
                        <Maximize2 size={14} />
                        <span>Buka Spesifikasi Lengkap</span>
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
      )}

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
              
              {/* Gallery of Assets with 'Set as Card Cover' Option */}
              {selectedProject.images && selectedProject.images.length > 0 && (
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-subtle)', marginBottom: '0.75rem', aspectRatio: '16/9', background: '#090b10', position: 'relative' }}>
                    <img 
                      src={getImgSrc(selectedProject.images[activeModalImg])} 
                      alt={selectedProject.title}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />

                    {/* Set As Card Cover Button inside Modal */}
                    <button
                      type="button"
                      onClick={() => {
                        setCardCoverIndexes(prev => ({
                          ...prev,
                          [selectedProject.id]: activeModalImg
                        }));
                      }}
                      style={{
                        position: 'absolute',
                        bottom: '1rem',
                        right: '1rem',
                        padding: '0.45rem 0.9rem',
                        borderRadius: '9999px',
                        background: (cardCoverIndexes[selectedProject.id] ?? 0) === activeModalImg ? 'var(--accent-cyan)' : 'rgba(10, 14, 22, 0.85)',
                        color: (cardCoverIndexes[selectedProject.id] ?? 0) === activeModalImg ? '#06080d' : '#ffffff',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        cursor: 'pointer',
                        backdropFilter: 'blur(8px)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {(cardCoverIndexes[selectedProject.id] ?? 0) === activeModalImg ? (
                        <>
                          <Check size={14} />
                          <span>Foto Sampul Terpilih</span>
                        </>
                      ) : (
                        <>
                          <ImageIcon size={14} />
                          <span>Jadikan Sampul Luar</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Thumbnail Row */}
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
                            cursor: 'pointer',
                            position: 'relative',
                            flexShrink: 0
                          }}
                        >
                          <img 
                            src={getImgSrc(img)} 
                            alt={`Preview ${iIdx + 1}`}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                          {(cardCoverIndexes[selectedProject.id] ?? 0) === iIdx && (
                            <span style={{
                              position: 'absolute',
                              top: '2px',
                              right: '2px',
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              background: 'var(--accent-cyan)'
                            }} />
                          )}
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
