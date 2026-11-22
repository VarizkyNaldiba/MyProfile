import { useState, useRef, useEffect, useCallback } from 'react';
import { 
  ChevronLeft, ChevronRight, ArrowUpRight, ExternalLink, 
  X, CheckCircle, Maximize2, Check, Image as ImageIcon
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
  const [viewMode] = useState('3d'); // '3d' (Curved Panoramic) or 'flat' (Classic Track)
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeModalImg, setActiveModalImg] = useState(0);

  // Custom cover image index per project (allows swapping the outer photo, persisted)
  const [cardCoverIndexes, setCardCoverIndexes] = useState(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const savedCovers = localStorage.getItem('vnr_card_cover_indexes');
        if (savedCovers) {
          return JSON.parse(savedCovers);
        }
      }
    } catch {
      // LocalStorage access may fail in private browsing
    }
    return {};
  });

  // Toast notification for saved persistent preferences
  const [toastMessage, setToastMessage] = useState(null);
  const toastTimerRef = useRef(null);

  const showToast = (msg) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToastMessage(msg);
    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const updateCardCover = (projId, newIdx, projTitle) => {
    setCardCoverIndexes(prev => {
      const updated = { ...prev, [projId]: newIdx };
      try {
        localStorage.setItem('vnr_card_cover_indexes', JSON.stringify(updated));
      } catch {
        // Storage might be full or restricted
      }
      return updated;
    });
    showToast(`Foto sampul "${projTitle || 'proyek'}" tersimpan!`);
  };

  // Floating cursor follower states (VIEW SPECS pill)
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorVisible, setCursorVisible] = useState(false);

  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const isProgrammaticScroll = useRef(false);
  const scrollTimeoutRef = useRef(null);

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
    if (viewMode === '3d') {
      setCurrentIndex(prev => {
        const total = filteredProjects.length;
        if (total <= 1) return 0;
        return (prev - 1 + total) % total;
      });
    } else {
      scrollToCardIndex(currentIndex - 1);
    }
  }, [viewMode, currentIndex, filteredProjects.length, scrollToCardIndex]);

  const handleNext = useCallback(() => {
    if (viewMode === '3d') {
      setCurrentIndex(prev => {
        const total = filteredProjects.length;
        if (total <= 1) return 0;
        return (prev + 1) % total;
      });
    } else {
      scrollToCardIndex(currentIndex + 1);
    }
  }, [viewMode, currentIndex, filteredProjects.length, scrollToCardIndex]);

  // Auto-advance slideshow with 6s reading pause (jeda agar bisa dibaca)
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayTimerRef = useRef(null);

  useEffect(() => {
    if (viewMode !== '3d' || !isAutoPlay || isHovered || selectedProject) {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      handleNext();
    }, 6000); // 6 detik jeda baca per elemen proyek

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [viewMode, isAutoPlay, isHovered, selectedProject, handleNext]);

  // 3D Viewport Interaction: Pointer Drag
  const dragStartX = useRef(0);
  const isPointerDown = useRef(false);

  const handlePointerDown = (e) => {
    dragStartX.current = e.clientX;
    isPointerDown.current = true;
  };

  const handlePointerUp = (e) => {
    if (!isPointerDown.current) return;
    isPointerDown.current = false;
    const deltaX = e.clientX - dragStartX.current;
    if (deltaX < -45) {
      handleNext();
    } else if (deltaX > 45) {
      handlePrev();
    }
  };

  // 3D Viewport Wheel Navigation (Throttled)
  const last3DWheelTime = useRef(0);
  const handle3DWheel = (e) => {
    const now = Date.now();
    if (now - last3DWheelTime.current < 260) return;
    const delta = Math.abs(e.deltaX) >= Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (delta > 20) {
      handleNext();
      last3DWheelTime.current = now;
    } else if (delta < -20) {
      handlePrev();
      last3DWheelTime.current = now;
    }
  };

  // Horizontal mouse-wheel support via Shift + Scroll & horizontal gestures
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const onWheel = (e) => {
      // Normalize wheel delta across deltaMode (0: pixels, 1: lines, 2: pages)
      const lineMultiplier = 40;
      const pageMultiplier = 800;
      let dx = e.deltaX;
      let dy = e.deltaY;

      if (e.deltaMode === 1) {
        dx *= lineMultiplier;
        dy *= lineMultiplier;
      } else if (e.deltaMode === 2) {
        dx *= pageMultiplier;
        dy *= pageMultiplier;
      }

      // 1. Shift key is held: map vertical or horizontal wheel to sideways carousel movement
      if (e.shiftKey) {
        // Chromium Windows maps Shift+Wheel to dx; Firefox/macOS may use dy
        const scrollDelta = Math.abs(dx) >= Math.abs(dy) ? dx : dy;
        if (Math.abs(scrollDelta) > 0) {
          e.preventDefault();
          track.scrollLeft += scrollDelta * 1.35;
        }
      } else if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 0) {
        // 2. Native horizontal gestures (touchpad swipe or mouse horizontal tilt wheel)
        e.preventDefault();
        track.scrollLeft += dx * 1.35;
      }
    };

    section.addEventListener('wheel', onWheel, { passive: false });
    return () => section.removeEventListener('wheel', onWheel);
  }, []);

  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
    if (!cursorVisible) setCursorVisible(true);
  };

  const handleMouseLeave = () => {
    setCursorVisible(false);
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

  // Photo Switcher on Card: lets visitor/user flip outer photo right on the card (persisted)
  const handleCardPhotoSwitch = (e, proj, direction) => {
    e.stopPropagation();
    const total = proj.images ? proj.images.length : 1;
    if (total <= 1) return;

    const current = cardCoverIndexes[proj.id] ?? 0;
    const next = (current + direction + total) % total;
    updateCardCover(proj.id, next, proj.title);
  };

  const handleSetCoverDirect = (e, projId, idx, projTitle) => {
    e.stopPropagation();
    updateCardCover(projId, idx, projTitle);
  };

  const progressPercent = filteredProjects.length > 0 
    ? Math.min(100, Math.round(((currentIndex + 1) / filteredProjects.length) * 100))
    : 0;

  // Short clean project name for 3D curved mode & cards
  const getShortProjectTitle = (proj) => {
    if (!proj) return '';
    switch (proj.slug) {
      case 'catfishcare-tfs2026':
        return 'CatfishCare';
      case 'simojang-brin-webgis':
        return 'SIMOJANG Brantas';
      case 'algasense':
        return 'AlgaSense';
      case 'pkm-gft-sais':
        return 'SAIS Aquaculture';
      case 'crowd-density-hology':
        return 'Crowd Density';
      case 'agroclimatology-intelecta':
        return 'Agroclimatology';
      case 'slb-spatial-disparity':
        return 'SLB Spatial Disparity';
      case 'ai-restaurant-advisory':
        return 'AI Restaurant Advisory';
      case 'fruit-classification':
        return 'Fruit Classification';
      case 'simpres':
        return 'SIMPRES';
      case 'tata-tertib-mahasiswa':
        return 'SIM Tatib Mahasiswa';
      case 'school-spatial-gis':
        return 'School Spatial GIS';
      case 'aquavion':
        return 'Aquavion';
      default:
        return (proj.title || '')
          .replace(/\s*\(.*?\)/g, '')
          .split('—')[0]
          .split(':')[0]
          .trim();
    }
  };

  // Find honor label for key projects
  const getProjectHonor = (slug) => {
    switch (slug) {
      case 'catfishcare-tfs2026':
        return 'Juara Harapan 2 LKTI Techno Fair and Seminar (TFS) 2026';
      case 'pkm-gft-sais':
        return 'PKM-GFT 2026 Tahap 2 Insentif';
      case 'simojang-brin-webgis':
        return 'Kolaborasi Riset Terapan BRIN x Polinema';
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

  const getHonorBadgeClass = (text) => {
    if (!text) return '';
    const lower = text.toLowerCase();
    if (lower.includes('juara')) return 'honor-juara';
    if (lower.includes('finalis') || lower.includes('finalist')) return 'honor-finalist';
    if (lower.includes('peserta')) return 'honor-peserta';
    return 'honor-general';
  };

  const activeProj = filteredProjects[currentIndex] || filteredProjects[0];

  return (
    <section ref={sectionRef} className="section-padding carousel-section" id="projects" aria-labelledby="projects-title" data-chapter="projects" data-in>
      {/* Floating magnetic cursor (VIEW SPECS pill) */}
      {cursorVisible && !selectedProject && (
        <div 
          className="tdk-cursor-pill view-mode"
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`
          }}
          aria-hidden="true"
        >
          VIEW SPECS ↗
        </div>
      )}

      <div className="container">
        
        {/* Section Head */}
        <div className="section-head">
          <div className="kicker">Featured Projects</div>
          <h2 className="section-title" id="projects-title">Featured Projects &amp; Portfolios</h2>
          <p className="section-subtitle">
            Eksplorasi arsitektur machine learning, telemetri IoT, WebGIS, dan platform enterprise. Gunakan tombol navigasi atau tahan Shift + scroll mouse untuk menjelajah.
          </p>
        </div>

        {/* Controls Bar: Categories */}
        <div className="carousel-controls-bar">
          {/* Category Filter Pills */}
          <div className="carousel-filter-pills" role="group" aria-label="Filter kategori proyek">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                type="button"
                aria-pressed={selectedCat === cat.id}
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
        </div>

      </div>

      {/* 3D Curved Cylindrical Carousel Stage vs Flat Track */}
      {viewMode === '3d' ? (
        <div 
          className="carousel-3d-stage-wrapper"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onWheel={handle3DWheel}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          {/* Dynamic Background Canvas without line grids */}
          <div className="carousel-3d-bg-canvas" aria-hidden="true">
            {/* Clean 3D Circular Pedestal Platform */}
            <div className="carousel-3d-pedestal-platform">
              <div className="pedestal-ring-glow" />
            </div>
          </div>

          {/* Floating Typography Watermark (In-Out Animation on Project Switch) */}
          {activeProj && (
            <div className="carousel-3d-hero-meta" key={activeProj.id} aria-hidden="true">
              <div className="carousel-3d-watermark-title animate-in-out-title">
                {getShortProjectTitle(activeProj)}
              </div>
              <div className="carousel-3d-watermark-subtitle animate-in-out-subtitle">
                {activeProj.categories[0]} <span className="meta-sep">/</span> {activeProj.role}
              </div>
            </div>
          )}

          {/* Cylindrical 3D Stage Viewport */}
          <div className="carousel-3d-viewport">
            {filteredProjects.map((proj, idx) => {
              const total = filteredProjects.length;
              let diff = idx - currentIndex;
              if (total > 0) {
                while (diff > total / 2) diff -= total;
                while (diff < -total / 2) diff += total;
              }
              if (Math.abs(diff) > 2) return null;

              const totalImgs = proj.images ? proj.images.length : 0;
              const activeCoverIdx = cardCoverIndexes[proj.id] ?? 0;
              const coverImg = (proj.images && proj.images[activeCoverIdx]) 
                ? getImgSrc(proj.images[activeCoverIdx]) 
                : (proj.images && proj.images[0] ? getImgSrc(proj.images[0]) : '');
              const honor = getProjectHonor(proj.slug);
              const isCenter = diff === 0;

              // Cylindrical 3D Circular Math (Reversed/Flipped Curve Direction):
              const angle = diff * 25; // angle in degrees
              const rotateY = -angle; // flipped curve direction (-diff instead of +diff)
              const translateX = diff * 325; // horizontal spacing in px along cylinder
              const translateZ = -Math.abs(diff) * 135; // depth into screen
              const scale = isCenter ? 1 : Math.max(0.78, 1 - Math.abs(diff) * 0.12);
              const opacity = isCenter ? 1 : (Math.abs(diff) === 1 ? 0.72 : 0.35);
              const zIndex = 20 - Math.abs(diff);

              return (
                <div
                  key={proj.id}
                  className={`carousel-3d-card-frame ${isCenter ? 'is-center' : 'is-side'}`}
                  style={{
                    transform: `translate3d(${translateX}px, 0px, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    opacity,
                    zIndex
                  }}
                  onClick={() => {
                    if (!isCenter) {
                      setCurrentIndex(idx);
                    } else {
                      setSelectedProject(proj);
                      setActiveModalImg(activeCoverIdx);
                    }
                  }}
                >
                  <article className="carousel-project-card curved-card">
                    {/* 1. Card Header: Title & Meta placed at the very top */}
                    <div className="curved-card-header">
                      <div className="card-index-row">
                        <div className="card-index-left">
                          <span className="card-index">{proj.categories[0] || 'ENGINEERED SYSTEM'}</span>
                        </div>
                        {isCenter && (
                          <span className="card-focus-indicator">● ACTIVE FOCUS</span>
                        )}
                      </div>
                      <h3 className="card-title">{getShortProjectTitle(proj)}</h3>
                      <span className="card-role">{proj.role}</span>
                    </div>

                    {/* 2. Image Cover */}
                    <div className="card-img-wrap curved-img-wrap">
                      {coverImg ? (
                        <img src={coverImg} alt={proj.title} loading="lazy" width="600" height="375" />
                      ) : (
                        <div style={{ width: '100%', height: '100%', background: '#111622' }} />
                      )}

                      {honor && (
                        <div className="card-badge-row">
                          <span className={`card-honor-badge ${getHonorBadgeClass(honor)}`} title={honor}>
                            {honor}
                          </span>
                        </div>
                      )}

                      {/* Photo switcher (active on center card) */}
                      {isCenter && totalImgs > 1 && (
                        <>
                          <button
                            type="button"
                            className="card-photo-switcher prev-photo"
                            onClick={(e) => handleCardPhotoSwitch(e, proj, -1)}
                            title="Foto Sebelumnya"
                            aria-label={`Foto sebelumnya untuk ${getShortProjectTitle(proj)}`}
                          >
                            <ChevronLeft size={16} aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            className="card-photo-switcher next-photo"
                            onClick={(e) => handleCardPhotoSwitch(e, proj, 1)}
                            title="Foto Berikutnya"
                            aria-label={`Foto berikutnya untuk ${getShortProjectTitle(proj)}`}
                          >
                            <ChevronRight size={16} aria-hidden="true" />
                          </button>
                          <div className="card-photo-dots" onClick={(e) => e.stopPropagation()}>
                            {proj.images.map((_, pIdx) => (
                              <button
                                key={pIdx}
                                type="button"
                                className={`card-photo-dot ${activeCoverIdx === pIdx ? 'active' : ''}`}
                                onClick={(e) => handleSetCoverDirect(e, proj.id, pIdx, proj.title)}
                                title={`Foto ${pIdx + 1} dari ${totalImgs}`}
                                aria-label={`Pilih foto ${pIdx + 1} dari ${totalImgs} untuk ${getShortProjectTitle(proj)}`}
                              />
                            ))}
                          </div>
                          <div className="card-photo-pill">{activeCoverIdx + 1}/{totalImgs}</div>
                        </>
                      )}
                    </div>

                    {/* 3. Card Body: Description, Tech Tags & Action Buttons */}
                    <div className="card-body curved-card-body">
                      <p className="card-desc">{proj.desc}</p>

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
                          aria-label={`Lihat spesifikasi detail teknis ${getShortProjectTitle(proj)}`}
                        >
                          <Maximize2 size={14} aria-hidden="true" />
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
                                aria-label={`${link.label} (${getShortProjectTitle(proj)})`}
                              >
                                {isGit ? <Github size={14} /> : <ExternalLink size={14} />}
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>

          {/* Minimalist Bottom Counter & Nav (Connected Track Reference Design) */}
          <div className="carousel-3d-bottom-bar">
            <button
              type="button"
              className="carousel-3d-side-btn"
              onClick={handlePrev}
              title="Proyek Sebelumnya"
              aria-label="Pindah ke proyek sebelumnya"
            >
              <ChevronLeft size={15} aria-hidden="true" />
              <span>PREV</span>
            </button>

            <button 
              type="button"
              className="carousel-3d-counter-pill"
              onClick={() => setIsAutoPlay(prev => !prev)}
              title={isAutoPlay ? 'Klik untuk jeda tayang otomatis (6s)' : 'Klik untuk mulai tayang otomatis'}
              aria-label={isAutoPlay ? 'Jeda tayang otomatis (6 detik per proyek)' : 'Mulai tayang otomatis'}
            >
              <span className="current" style={{ fontSize: '0.74rem', letterSpacing: '0.06em' }}>
                {isAutoPlay ? 'AUTOPLAY' : 'PAUSED'}
              </span>
              <div 
                key={currentIndex} 
                className={`carousel-3d-reading-timer ${isAutoPlay && !isHovered ? 'running' : 'paused'}`} 
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              className="carousel-3d-side-btn"
              onClick={handleNext}
              title="Proyek Berikutnya"
              aria-label="Pindah ke proyek berikutnya"
            >
              <span>NEXT</span>
              <ChevronRight size={15} aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : (
        /* Horizontal Carousel Track */
        <div 
          className="carousel-track-outer"
          ref={trackRef}
          onScroll={handleScroll}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setCursorVisible(true)}
        >
          <div className="carousel-track-inner">
            {filteredProjects.map((proj) => {
              const totalImgs = proj.images ? proj.images.length : 0;
              const activeCoverIdx = cardCoverIndexes[proj.id] ?? 0;
              const coverImg = (proj.images && proj.images[activeCoverIdx]) 
                ? getImgSrc(proj.images[activeCoverIdx]) 
                : (proj.images && proj.images[0] ? getImgSrc(proj.images[0]) : '');
              const honor = getProjectHonor(proj.slug);

              return (
                <article 
                  key={proj.id} 
                  className="carousel-project-card"
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
                        width="600"
                        height="375"
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: '#111622' }} />
                    )}
                    
                    {/* Category & Honor Badges */}
                    <div className="card-badge-row">
                      <span className="card-cat-badge">{proj.categories[0] || 'Engineering'}</span>
                      {honor && (
                        <span className={`card-honor-badge ${getHonorBadgeClass(honor)}`} title={honor}>
                          {honor}
                        </span>
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
                              onClick={(e) => handleSetCoverDirect(e, proj.id, pIdx, proj.title)}
                              title={`Foto ${pIdx + 1} dari ${totalImgs}`}
                              aria-label={`Switch to photo ${pIdx + 1}`}
                            />
                          ))}
                        </div>

                        <div className="card-photo-pill">
                          PHOTO ARCHIVE
                        </div>
                      </>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="card-body">
                    <span className="card-index">{proj.categories[0] || 'ENGINEERED SYSTEM'}</span>
                    <h3 className="card-title">{getShortProjectTitle(proj)}</h3>
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
      )}

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
          role="presentation"
        >
          <div 
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
          >
            {/* Modal Header */}
            <div className="modal-header">
              <div>
                <span className="card-index">SPECIFICATION ARCHIVE · {selectedProject.categories?.[0] || 'SYSTEM ARCHITECTURE'}</span>
                <h2 id="modal-project-title" className="modal-title" style={{ fontSize: '1.65rem', fontWeight: 800, color: '#ffffff' }}>
                  {selectedProject.title}
                </h2>
                <span style={{ fontSize: '0.85rem', color: '#cbd5e1', display: 'block', marginBottom: '0.4rem' }}>
                  {selectedProject.role}
                </span>
                {getProjectHonor(selectedProject.slug) && (
                  <span className={`card-honor-badge ${getHonorBadgeClass(getProjectHonor(selectedProject.slug))}`} style={{ maxWidth: '100%', marginTop: '0.25rem' }}>
                    {getProjectHonor(selectedProject.slug)}
                  </span>
                )}
              </div>
              <button 
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedProject(null)}
                aria-label="Tutup jendela spesifikasi proyek (atau tekan tombol Escape)"
              >
                <X size={18} aria-hidden="true" />
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
                      alt={`Foto detail proyek: ${selectedProject.title}`}
                      width="800"
                      height="450"
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />

                    {/* Set As Card Cover Button inside Modal (persisted) */}
                    <button
                      type="button"
                      onClick={() => {
                        updateCardCover(selectedProject.id, activeModalImg, selectedProject.title);
                      }}
                      aria-label={(cardCoverIndexes[selectedProject.id] ?? 0) === activeModalImg ? 'Foto sampul luar terpilih' : 'Jadikan foto ini sebagai sampul luar'}
                      style={{
                        position: 'absolute',
                        bottom: '1rem',
                        right: '1rem',
                        padding: '0.45rem 0.9rem',
                        borderRadius: 'var(--radius-lg)',
                        background: (cardCoverIndexes[selectedProject.id] ?? 0) === activeModalImg ? 'var(--accent-action)' : 'rgba(11, 19, 43, 0.9)',
                        color: (cardCoverIndexes[selectedProject.id] ?? 0) === activeModalImg ? '#0b132b' : '#ffffff',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
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
                          <Check size={14} aria-hidden="true" />
                          <span>Foto Sampul Terpilih</span>
                        </>
                      ) : (
                        <>
                          <ImageIcon size={14} aria-hidden="true" />
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
                          aria-label={`Pilih foto thumbnail ${iIdx + 1} dari ${selectedProject.images.length} untuk proyek ${selectedProject.title}`}
                          style={{
                            width: '80px',
                            height: '52px',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            border: activeModalImg === iIdx ? '2px solid var(--accent-action)' : '1px solid rgba(255, 255, 255, 0.12)',
                            background: '#050a16',
                            padding: 0,
                            cursor: 'pointer',
                            position: 'relative',
                            flexShrink: 0
                          }}
                        >
                          <img 
                            src={getImgSrc(img)} 
                            alt={`Thumbnail ${iIdx + 1}: ${selectedProject.title}`}
                            width="80"
                            height="52"
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
                              background: 'var(--accent-action)'
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
                  <p style={{ color: '#cbd5e1', fontSize: '0.94rem', lineHeight: 1.65 }}>
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
                      <p style={{ fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.55 }}>
                        {selectedProject.details.challenges}
                      </p>
                    </div>
                  )}

                  {selectedProject.details?.solution && (
                    <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '12px', padding: '1.25rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.4rem' }}>
                        Architected Solution
                      </span>
                      <p style={{ fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.55 }}>
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
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.8rem',
                        color: '#cbd5e1',
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

      {/* Persistent Toast Notification */}
      {toastMessage && (
        <div className="save-toast-pill" role="status" aria-live="polite">
          <CheckCircle size={16} style={{ color: '#4ade80' }} />
          <span>{toastMessage}</span>
        </div>
      )}

    </section>
  );
}
