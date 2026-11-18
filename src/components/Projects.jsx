import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, TrendingUp, Bot, Brain, X, Cpu, Globe, Grid, AlertCircle,
  Check, ArrowUpRight, UserCheck
} from 'lucide-react';
import { projectsData } from '../projects';

const filterCategories = [
  { id: "All", name: "All", icon: Grid },
  { id: "Machine Learning", name: "Machine Learning", icon: Bot },
  { id: "IoT", name: "IoT", icon: Cpu },
  { id: "Data Science", name: "Data Science", icon: Brain },
  { id: "Web Dev", name: "Web Dev", icon: Globe },
  { id: "Data Analyst", name: "Data Analyst", icon: TrendingUp }
];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeLightboxImg, setActiveLightboxImg] = useState(null);

  const dialogRef = useRef(null);

  // Sync native dialog with selectedProject state
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (selectedProject) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [selectedProject]);

  // Handle Escape key for lightbox or dialog
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (activeLightboxImg) {
          setActiveLightboxImg(null);
        } else if (selectedProject) {
          setSelectedProject(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxImg, selectedProject]);

  const filteredProjects = projectsData.filter((project) => {
    const matchesCategory = selectedCategory === "All" || project.categories.includes(selectedCategory);
    const query = searchQuery.toLowerCase().trim();
    
    if (!query) return matchesCategory;

    const matchesSearch = 
      project.title.toLowerCase().includes(query) ||
      project.role.toLowerCase().includes(query) ||
      project.desc.toLowerCase().includes(query) ||
      project.tech.some(t => t.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  const getCategoryCount = (category) => {
    if (category === "All") return projectsData.length;
    return projectsData.filter(p => p.categories.includes(category)).length;
  };

  const handleTechClick = (e, tag) => {
    e.stopPropagation();
    setSearchQuery(tag);
  };

  return (
    <section className="section-container" id="projects">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-head">
          <span className="section-kicker">Portfolio & Case Studies</span>
          <h2 className="section-title">Engineered Projects & Systems</h2>
          <p className="section-subtitle">
            Curated applied machine learning pipelines, IoT telemetry firmware, geospatial spatial intelligence, 
            and enterprise software platforms backed by authentic repositories and verified competition results.
          </p>
        </div>

        {/* Controls: Search and Filters */}
        <div className="projects-controls-container">
          
          {/* Search Box */}
          <div className="search-bar">
            <Search size={16} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by technology, algorithm, system, or keyword..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-field"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")} 
                className="search-clear"
                aria-label="Clear search query"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="filter-pill-row">
            {filterCategories.map(({ name, icon: CategoryIcon }) => {
              const count = getCategoryCount(name);
              const isActive = selectedCategory === name;
              return (
                <button
                  key={name}
                  className={`filter-pill ${isActive ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(name)}
                >
                  <CategoryIcon size={14} />
                  <span>{name}</span>
                  <span className="filter-pill-count">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Search status line */}
          <div className="search-status-bar">
            <span>Showing {filteredProjects.length} of {projectsData.length} engineered systems</span>
            {searchQuery && (
              <span className="search-query-tag">
                Filter tag: "{searchQuery}"
                <button onClick={() => setSearchQuery("")} className="clear-tag-btn">×</button>
              </span>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div className="projects-card-grid" layout>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const Icon = project.icon;
              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  className="project-box"
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Card Header */}
                  <div className="project-box-header">
                    <div className="project-box-icon">
                      <Icon size={20} />
                    </div>
                    <div className="project-box-categories">
                      {project.categories.slice(0, 2).map(c => (
                        <span key={c} className="category-tag">{c}</span>
                      ))}
                    </div>
                  </div>

                  {/* Title & Role */}
                  <h3 className="project-box-title">{project.title}</h3>
                  <div className="project-box-role">
                    <UserCheck size={13} />
                    <span>{project.role}</span>
                  </div>

                  {/* Summary */}
                  <p className="project-box-desc">{project.desc}</p>

                  {/* Tech Badges (Clickable per Google Guidance) */}
                  <div className="project-tech-row">
                    {project.tech.map((tag) => (
                      <span 
                        key={tag} 
                        className="tech-badge"
                        title={`Filter projects by ${tag}`}
                        onClick={(e) => handleTechClick(e, tag)}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Card Bottom Links */}
                  <div className="project-box-footer" onClick={(e) => e.stopPropagation()}>
                    <div className="project-box-links">
                      {project.links.slice(0, 2).map((link) => (
                        <a 
                          key={link.url}
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="project-link-btn"
                          title={link.label}
                        >
                          <span>{link.label}</span>
                          <ArrowUpRight size={13} />
                        </a>
                      ))}
                    </div>

                    <button 
                      onClick={() => setSelectedProject(project)}
                      className="btn-case-study"
                      title="Read Case Study & Technical Specifications"
                    >
                      Case Study
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="empty-projects-state">
            <AlertCircle size={36} />
            <p>No projects match your current filter or search criteria.</p>
            <button 
              className="btn-secondary" 
              onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Modern Native Dialog Modal (Google Modern Web Guidance) */}
      <dialog 
        ref={dialogRef}
        className="modal-native-dialog"
        aria-labelledby="modal-case-study-title"
        onCancel={(e) => {
          e.preventDefault();
          setSelectedProject(null);
        }}
        onClick={(e) => {
          // Native light dismiss outside check
          const rect = e.currentTarget.getBoundingClientRect();
          const isOutside = (
            e.clientX < rect.left ||
            e.clientX > rect.right ||
            e.clientY < rect.top ||
            e.clientY > rect.bottom
          );
          if (isOutside) {
            setSelectedProject(null);
          }
        }}
      >
        {selectedProject && (
          <div className="modal-window" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button 
              className="modal-close" 
              onClick={() => setSelectedProject(null)}
              aria-label="Close case study dialog"
            >
              <X size={18} />
            </button>

            {/* Modal Head */}
            <div className="modal-head">
              <div className="modal-head-icon">
                {selectedProject.icon && <selectedProject.icon size={24} />}
              </div>
              <div className="modal-head-titles">
                <h3 className="modal-title" id="modal-case-study-title">{selectedProject.title}</h3>
                <div className="modal-role-line">
                  <UserCheck size={14} />
                  <span>{selectedProject.role}</span>
                  <span className="modal-dot">•</span>
                  <span>{projectCategoriesToString(selectedProject.categories)}</span>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="modal-scrollable-body">
              
              {/* Image Gallery (if project has screenshots) */}
              {selectedProject.images && selectedProject.images.length > 0 && (
                <div className="modal-gallery-container">
                  <span className="modal-subheading">Technical Artifacts & Screenshots (Click to Expand)</span>
                  <div className="modal-gallery-row">
                    {selectedProject.images.map((img, i) => (
                      <div 
                        key={i} 
                        className="gallery-thumbnail-wrap"
                        onClick={() => setActiveLightboxImg(img)}
                      >
                        <img 
                          src={img} 
                          alt={`${selectedProject.title} Technical Artifact ${i + 1}`} 
                          className="gallery-thumbnail"
                          loading="lazy"
                          fetchpriority="low"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Overview */}
              <div className="modal-block">
                <h4 className="modal-subheading">System Architecture & Overview</h4>
                <p className="modal-paragraph">{selectedProject.details.overview}</p>
              </div>

              {/* Key Features */}
              <div className="modal-block">
                <h4 className="modal-subheading">Engineering Specifications</h4>
                <ul className="modal-checklist">
                  {selectedProject.details.features.map((feat, idx) => (
                    <li key={idx} className="modal-checklist-item">
                      <Check size={14} className="checklist-icon" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Challenges & Solution Grid */}
              <div className="modal-challenge-grid">
                <div className="challenge-card">
                  <span className="challenge-tag challenge">Engineering Challenge</span>
                  <p className="challenge-desc">{selectedProject.details.challenges}</p>
                </div>
                <div className="challenge-card">
                  <span className="challenge-tag solution">Technical Solution</span>
                  <p className="challenge-desc">{selectedProject.details.solution}</p>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="modal-block">
                <h4 className="modal-subheading">Technologies & Frameworks</h4>
                <div className="modal-tech-cloud">
                  {selectedProject.tech.map(t => (
                    <span 
                      key={t} 
                      className="tech-badge"
                      title={`Filter by ${t}`}
                      onClick={(e) => {
                        setSelectedProject(null);
                        handleTechClick(e, t);
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer Links */}
            <div className="modal-foot">
              <div className="modal-foot-links">
                {selectedProject.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-action-btn"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight size={14} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </dialog>

      {/* Lightbox for screenshots */}
      <AnimatePresence>
        {activeLightboxImg && (
          <div 
            className="lightbox-backdrop"
            onClick={() => setActiveLightboxImg(null)}
          >
            <button 
              className="lightbox-close"
              onClick={() => setActiveLightboxImg(null)}
              aria-label="Close fullscreen preview"
            >
              <X size={22} />
            </button>
            <motion.img
              src={activeLightboxImg}
              alt="Expanded technical preview"
              className="lightbox-large-image"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

function projectCategoriesToString(categories) {
  if (!categories || !Array.isArray(categories)) return '';
  return categories.join(', ');
}
