import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, TrendingUp, Bot, Camera, ShieldAlert, Trophy, 
  Droplet, GraduationCap, Wifi, Users, Map, Thermometer,
  ExternalLink, UserCheck
} from 'lucide-react';
import { Github } from './BrandIcons';

const projectsData = [
  {
    id: 1,
    title: "AquaVion",
    role: "Project Manager",
    desc: "Web-based dashboard for catfish (lele) pond water quality monitoring, integrating live telemetry.",
    tech: ["Next.js", "Firebase", "ESP32"],
    categories: ["Web Dev"],
    links: [
      { type: "web", url: "https://aqua-vion.vercel.app/" },
      { type: "repo", url: "https://github.com/Naditya206/AquaVion" }
    ],
    icon: TrendingUp
  },
  {
    id: 2,
    title: "AI Consultant for Restaurants",
    role: "Data Scientist",
    desc: "LLM-based advisory system for restaurant owners using generative AI models to provide business insights.",
    tech: ["Python", "Gemini API", "Streamlit"],
    categories: ["Data Science", "Machine Learning"],
    links: [
      { type: "web", url: "https://varizkynaldiba-project-of-llm-based-tools-and-gem-fnb-rm-vjbmhr.streamlit.app/" },
      { type: "repo", url: "https://github.com/VarizkyNaldiba/Project-of-LLM-Based-Tools-and-Gemini-API-Integration-for-Data-Scientists" }
    ],
    icon: Bot
  },
  {
    id: 3,
    title: "Fruit Detection Computer Vision",
    role: "Data Scientist",
    desc: "SVM-based image classifier utilizing GLCM, Wavelet, and HOG features to recognize 16 fruit categories.",
    tech: ["Python", "HuggingFace", "Computer Vision"],
    categories: ["Machine Learning", "Data Science"],
    links: [
      { type: "web", url: "https://huggingface.co/spaces/Zelectra/PBL.MachineLearningAndPCVK" },
      { type: "repo", url: "https://github.com/VarizkyNaldiba/PBL_SMT_5" }
    ],
    icon: Camera
  },
  {
    id: 4,
    title: "Student Rules System",
    role: "UI/UX Designer",
    desc: "Interactive system designed for tracking student disciplinary status and rules violations.",
    tech: ["Figma", "Laravel", "Bootstrap"],
    categories: ["Web Dev"],
    links: [
      { type: "repo", url: "https://github.com/VarizkyNaldiba/TataTertibMhs" }
    ],
    icon: ShieldAlert
  },
  {
    id: 5,
    title: "Achievement Recording Platform",
    role: "Fullstack Developer",
    desc: "Centralized web platform built to record, manage, and verify student academic and non-academic awards.",
    tech: ["Laravel", "MySQL", "Bootstrap"],
    categories: ["Web Dev"],
    links: [
      { type: "repo", url: "https://github.com/VarizkyNaldiba/Prestasi-Mahasiswa-S4" }
    ],
    icon: Trophy
  },
  {
    id: 6,
    title: "AlgaSense",
    role: "Machine Learning Engineer",
    desc: "IoT seaweed culture monitoring system powered by deep learning harvest predictors.",
    tech: ["Python", "TensorFlow", "Keras", "IoT"],
    categories: ["IoT", "Machine Learning"],
    links: [
      { type: "repo", url: "https://github.com/VarizkyNaldiba/Algasense" }
    ],
    icon: Droplet
  },
  {
    id: 7,
    title: "Education Accessibility Analysis",
    role: "Data Analyst",
    desc: "Data-driven study analyzing regional distribution of Special Education Schools (SLB) across East Java.",
    tech: ["Python", "Pandas", "Matplotlib", "Excel"],
    categories: ["Data Science", "Data Analyst"],
    links: [
      { type: "repo", url: "https://github.com/FarrelAD/Tim-Maju-Lancar-Datathon-Jatim-2025" }
    ],
    icon: GraduationCap
  },
  {
    id: 8,
    title: "Smart Aqua IoT",
    role: "Project Manager",
    desc: "Telemetry client enabling automated sensor updates from ponds straight to Firebase realtime storage.",
    tech: ["ESP32", "Arduino", "Firebase"],
    categories: ["IoT"],
    links: [
      { type: "repo", url: "https://github.com/VarizkyNaldiba/Smart_Aqua_IOT" }
    ],
    icon: Wifi
  },
  {
    id: 9,
    title: "Crowd Counting Model",
    role: "Data Scientist",
    desc: "Computer vision density estimation system designed for public safety crowd estimation.",
    tech: ["Python", "Deep Learning", "TensorFlow"],
    categories: ["Machine Learning", "Data Science"],
    links: [
      { type: "repo", url: "https://github.com/VarizkyNaldiba/PenyelamHandal_Hology" }
    ],
    icon: Users
  },
  {
    id: 10,
    title: "School Spatial Distribution",
    role: "Data Analyst",
    desc: "Geographic distribution mapping of academic locations in East Java utilizing GIS datasets.",
    tech: ["Python", "GeoJSON", "GIS"],
    categories: ["Data Science", "Data Analyst"],
    links: [
      { type: "repo", url: "https://github.com/VarizkyNaldiba/SchoolSpatial_on_EastJava" }
    ],
    icon: Map
  },
  {
    id: 11,
    title: "Weather Prediction Model",
    role: "Data Scientist",
    desc: "Predictive agroclimatology temperature forecasting model utilizing statistical regression.",
    tech: ["Python", "Scikit-Learn"],
    categories: ["Machine Learning", "Data Science"],
    links: [
      { type: "repo", url: "https://github.com/VarizkyNaldiba/Intelecta_P-1ML" }
    ],
    icon: Thermometer
  }
];

const filterCategories = ["All", "IoT", "Data Science", "Machine Learning", "Web Dev", "Data Analyst"];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projectsData.filter((project) => {
    const matchesCategory = selectedCategory === "All" || project.categories.includes(selectedCategory);
    
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <section className="section-wrapper" id="projects">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge">Gallery</span>
          <h2 className="section-title">My Projects</h2>
          <p className="section-desc text-secondary">
            A comprehensive showcase of academic, competition, and IoT/AI projects demonstrating my engineering and analytic capabilities.
          </p>
        </div>

        {/* Controls Layout (Search & Filter) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px', alignItems: 'center' }}>
          
          {/* Custom Search Box */}
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '450px'
          }}>
            <Search size={18} style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-tertiary)'
            }} />
            <input 
              type="text" 
              placeholder="Search by name, role, or technology..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px 12px 42px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                outline: 'none',
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                transition: 'var(--transition-fast)'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent-color)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
            />
          </div>

          {/* Filter Categories Bar */}
          <div className="project-filters">
            {filterCategories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid Display with Animation */}
        <motion.div 
          className="projects-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const IconComponent = project.icon;
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ y: -6 }}
                  transition={{
                    opacity: { duration: 0.2 },
                    scale: { duration: 0.2 },
                    layout: { type: 'spring', stiffness: 250, damping: 28 },
                    y: { type: 'spring', stiffness: 400, damping: 25 }
                  }}
                  className="project-card"
                >
                  <div className="project-card-header">
                    <div className="project-card-icon">
                      <IconComponent size={24} />
                    </div>
                  </div>

                  <h3 className="project-card-title">{project.title}</h3>
                  
                  <div className="project-card-role">
                    <UserCheck size={14} />
                    <span>{project.role}</span>
                  </div>

                  <p className="project-card-desc">{project.desc}</p>

                  <div className="project-card-tech">
                    {project.tech.map((tag) => (
                      <span key={tag} className="project-tech-badge">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="project-card-links">
                    {project.links.map((link, idx) => (
                      <React.Fragment key={link.url}>
                        {idx > 0 && <span className="project-card-btn-divider"></span>}
                        <a 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="project-card-btn"
                        >
                          {link.type === 'web' ? (
                            <>
                              View Web <ExternalLink size={14} />
                            </>
                          ) : (
                            <>
                              View Repo <Github size={14} />
                            </>
                          )}
                        </a>
                      </React.Fragment>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-tertiary)' }}
          >
            <p style={{ fontSize: '1.1rem' }}>No projects found matching the criteria.</p>
          </motion.div>
        )}

      </div>
    </section>
  );
}
