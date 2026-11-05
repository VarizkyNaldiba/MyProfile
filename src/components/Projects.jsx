import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, TrendingUp, Bot, Camera, ShieldAlert, Trophy, 
  Droplet, GraduationCap, Users, Map, Thermometer,
  UserCheck, Brain, X, Cpu, Globe, Grid, AlertCircle,
  Check, ArrowUpRight
} from 'lucide-react';

// Project assets
import imgAquavionIot from '../assets/iot-AquaVion.jpeg';
import imgAquavionDashboard from '../assets/dashboardAqua-vion.png';
import imgFruitDetection from '../assets/fruitdetection.png';
import imgDatathon from '../assets/datathon1.png';
import imgRmPadang from '../assets/rmpadang.png';

const getProjectsData = () => [
  {
    id: 1,
    title: "Aquavion",
    role: "Systems Lead & IoT Firmware Engineer",
    desc: "Industrial-grade IoT aquaculture telemetry platform for catfish farming. Integrates submerged ESP32 sensor probes, automated non-linear calibration offsets, and a Next.js analytics dashboard.",
    tech: ["Next.js", "Firebase", "ESP32", "Arduino", "C++", "IoT"],
    categories: ["IoT", "Web Dev"],
    links: [
      { type: "iot", label: "IoT Firmware", url: "https://github.com/VarizkyNaldiba/Smart_Aqua_IOT" },
      { type: "web", label: "Live Dashboard", url: "https://aqua-vion.vercel.app/" },
      { type: "progress", label: "Technical Roadmap", url: "https://dashboard-notion-aqua-vion.vercel.app/" }
    ],
    icon: Droplet,
    images: [imgAquavionIot, imgAquavionDashboard],
    details: {
      overview: "Aquavion is an end-to-end telemetry and monitoring system designed to optimize freshwater catfish (lele) aquaculture. It continuously monitors critical water parameters—including pH, temperature, and turbidity—transmitting telemetry to a Firebase Realtime Database and alerting operators via a Next.js web application to prevent toxic water conditions and harvest losses.",
      features: [
        "Continuous multi-sensor telemetry (analog pH, DS18B20 temperature, nephelometric turbidity)",
        "Microcontroller firmware calibrated with custom non-linear sensor offset curves and temperature compensation",
        "Non-volatile circular flash buffer on ESP32 ensuring zero data loss during agricultural network downtime",
        "Interactive Next.js analytics dashboard with threshold-based visual alerts and telemetry trends synchronized via Firebase"
      ],
      challenges: "Sensor probe calibration drift under constant underwater exposure, coupled with intermittent agricultural WiFi connections causing erratic data loss.",
      solution: "Engineered firmware-level polynomial calibration offset curves and a non-volatile local circular buffer on the ESP32 that caches telemetry readings and auto-synchronizes upon reconnection."
    }
  },
  {
    id: 2,
    title: "AI Restaurant Advisory System",
    role: "Applied AI & Data Scientist",
    desc: "Generative AI decision-support platform for food service enterprises powered by Google Gemini API and Streamlit, synthesizing financial margins, ingredient seasonality, and menu engineering matrices.",
    tech: ["Python", "Gemini API", "Streamlit", "Prompt Engineering"],
    categories: ["Data Science", "Machine Learning"],
    links: [
      { type: "web", label: "Live Streamlit App", url: "https://varizkynaldiba-project-of-llm-based-tools-and-gem-fnb-rm-vjbmhr.streamlit.app/" },
      { type: "repo", label: "Source Code", url: "https://github.com/VarizkyNaldiba/Project-of-LLM-Based-Tools-and-Gemini-API-Integration-for-Data-Scientists" }
    ],
    icon: Bot,
    images: [imgRmPadang],
    details: {
      overview: "An AI business advisory tool designed for traditional and independent food service operators (such as RM Padang). Grounded in practical commercial culinary operations, the application analyzes menu item margins, seasonal ingredient price swings, and customer reviews to provide actionable culinary optimizations and portion cost controls.",
      features: [
        "Contextual domain reasoning powered by Google Gemini API with strict system prompt schemas",
        "Interactive Streamlit analytical interface tailored for independent and multi-outlet F&B operators",
        "Menu engineering BCG matrix automating profitability vs popularity categorization",
        "Automated recipe costing audits and dynamic inventory replenishment recommendations"
      ],
      challenges: "Eliminating generative hallucination and standardizing localized culinary cost indices and ingredient perishability curves.",
      solution: "Developed structured prompt engineering templates with schema-validated context injection, enforcing deterministic calculations for margins, supplier cost shifts, and shelf-life metrics."
    }
  },
  {
    id: 3,
    title: "Fruit Classification Computer Vision",
    role: "Computer Vision & ML Engineer",
    desc: "Production-ready image classification pipeline recognizing 16 fruit varieties using hybrid feature extraction (GLCM, Wavelet, HOG) coupled with hyperparameter-tuned Support Vector Machines.",
    tech: ["Python", "OpenCV", "Scikit-Learn", "HuggingFace", "Streamlit"],
    categories: ["Machine Learning", "Data Science"],
    links: [
      { type: "web", label: "HuggingFace Space", url: "https://huggingface.co/spaces/Zelectra/PBL.MachineLearningAndPCVK" },
      { type: "repo", label: "Source Code", url: "https://github.com/VarizkyNaldiba/PBL_SMT_5" }
    ],
    icon: Camera,
    images: [imgFruitDetection],
    details: {
      overview: "A Project-Based Learning research system exploring feature engineering for multi-class visual recognition. By extracting spatial texture descriptors, wavelet frequency distributions, and gradient orientations, the system achieves robust 16-category fruit classification using Support Vector Machines without requiring massive compute budgets.",
      features: [
        "Multi-scale feature extraction combining GLCM texture matrices, 2D Discrete Wavelet Transform, and HOG edge descriptors",
        "Multi-class Support Vector Machine (SVM) classifier optimized with Radial Basis Function (RBF) kernel tuning",
        "Production inference service hosted on HuggingFace Spaces with client-side image uploads and sub-second classification",
        "Real-time prediction confidence vector and probability breakdown across all 16 target classes"
      ],
      challenges: "High intraclass variability, uneven illumination gradients, and subtle boundary textures among similar botanical classes.",
      solution: "Implemented Contrast Limited Adaptive Histogram Equalization (CLAHE) with morphological foreground masks to produce an illumination-invariant composite feature representation."
    }
  },
  {
    id: 4,
    title: "SLB Spatial Disparity Analysis",
    role: "Lead Geospatial Data Analyst",
    desc: "Geodemographic research and spatial analytics platform evaluating accessibility and infrastructure equity across 38 East Java regencies for Special Education Schools (SLB).",
    tech: ["Python", "Pandas", "Matplotlib", "GeoJSON", "HuggingFace"],
    categories: ["Data Science", "Data Analyst"],
    links: [
      { type: "web", label: "Interactive GIS Dashboard", url: "https://huggingface.co/spaces/Tim-Maju-Lancar-Datathon/Dashboard-Tim-Maju-Lancar-Datathon-Jatim-2025" },
      { type: "repo", label: "Source Code", url: "https://github.com/FarrelAD/Tim-Maju-Lancar-Datathon-Jatim-2025" }
    ],
    icon: GraduationCap,
    images: [imgDatathon],
    details: {
      overview: "An analytical study developed for Datathon Jatim 2025 by team Tim Maju Lancar. The project investigated the spatial distribution of special education facilities across East Java, producing a data-driven gap index to highlight underserved municipalities and assist public resource allocation.",
      features: [
        "Demographic and municipal data harmonization across 38 administrative regencies and cities in East Java",
        "Spatial Accessibility Index (SAI) formulation correlating special education capacity with regional youth disability statistics",
        "Interactive web GIS dashboard with choropleth heatmaps deployed to HuggingFace Spaces",
        "Data-backed policy dossier submitted to competition evaluators for municipal infrastructure planning"
      ],
      challenges: "Reconciling disparate municipal registries with inconsistent administrative naming conventions, missing coordinates, and incompatible spatial boundaries.",
      solution: "Engineered an automated Python ETL pipeline leveraging Levenshtein fuzzy string matching to standardize location metadata and bind attributes directly to GeoJSON polygon geometries."
    }
  },
  {
    id: 5,
    title: "Crowd Density Estimation Model",
    role: "Deep Learning & Computer Vision Engineer",
    desc: "Convolutional density map regression architecture estimating crowd counts in unconstrained surveillance imagery under extreme occlusion and perspective distortions.",
    tech: ["Python", "TensorFlow", "Keras", "CNNs", "OpenCV"],
    categories: ["Machine Learning", "Data Science"],
    links: [
      { type: "repo", label: "Source Code", url: "https://github.com/VarizkyNaldiba/PenyelamHandal_Hology" }
    ],
    icon: Users,
    images: [],
    details: {
      overview: "Developed for the Hology Data Mining competition by team Penyelam Handal. The goal was to accurately predict the number of individuals in high-density scenes characterized by severe perspective distortion, partial body occlusions, and variable lighting.",
      features: [
        "Deep density map regression architecture implementing Multi-Column Convolutional Neural Networks (MCNN)",
        "Trained on a benchmark dataset of 1,900 dense images with rigorous multi-scale data augmentations",
        "Model convergence validated across 500 benchmark test images using Mean Absolute Error (MAE) and Mean Squared Error (MSE)",
        "Parallel receptive field filters capturing high-density background heads and foreground subjects simultaneously"
      ],
      challenges: "Exponential scale variance of human heads caused by extreme camera perspective angles and heavy multi-body occlusion.",
      solution: "Designed multi-branch convolutional pathways with disparate kernel sizes (3x3, 5x5, 7x7) to extract scale-invariant density features before density map reconstruction."
    }
  },
  {
    id: 6,
    title: "AlgaSense: Marine Seaweed IoT & ML",
    role: "Machine Learning & Embedded Systems Engineer",
    desc: "Intelligent subsea telemetry and predictive deep learning system monitoring seaweed aquaculture in Sumenep, Madura, using LSTM neural networks to forecast optimal harvest cycles.",
    tech: ["Python", "TensorFlow", "Keras", "LSTM", "Google Colab", "IoT"],
    categories: ["IoT", "Machine Learning"],
    links: [
      { type: "repo", label: "Source Code", url: "https://github.com/VarizkyNaldiba/Algasense" },
      { type: "colab", label: "Colab Notebook", url: "https://colab.research.google.com/drive/188LKZtiXvQ8Q-nwy9ZtR2h_-UmRNYp_3" }
    ],
    icon: Droplet,
    images: [],
    details: {
      overview: "A scientific and engineering initiative assisting marine seaweed cultivators in Sumenep, East Java. It pairs underwater IoT sensor nodes (measuring salinity, pH, temperature, and dissolved oxygen) with time-series deep learning to predict growth cycles and prevent crop damage from sudden environmental shifts.",
      features: [
        "Underwater telemetry acquisition pipeline monitoring pH, temperature, salinity, and dissolved oxygen in marine environments",
        "Long Short-Term Memory (LSTM) recurrent neural network architecture forecasting seaweed growth trajectories",
        "End-to-end model training, hyperparameter search, and loss curve analysis documented in Google Colab",
        "Actionable harvest maturity index protecting cultivators from unexpected environmental salinity drops"
      ],
      challenges: "High-frequency sensor telemetry noise caused by tidal turbulence and limited historical oceanic time-series samples.",
      solution: "Applied moving-average temporal smoothing algorithms and implemented recurrent dropout regularization within LSTM memory cells to prevent overfitting on seasonal anomalies."
    }
  },
  {
    id: 7,
    title: "SIMPRES: Student Achievement Management System",
    role: "Full-Stack Systems Engineer",
    desc: "Enterprise academic portal for the Information Technology Department at Politeknik Negeri Malang, streamlining student competition verification and integrating Decision Support System (DSS) matching.",
    tech: ["Laravel", "PHP", "MySQL", "Bootstrap", "DSS"],
    categories: ["Web Dev"],
    links: [
      { type: "repo", label: "Source Code", url: "https://github.com/VarizkyNaldiba/Prestasi-Mahasiswa-S4" }
    ],
    icon: Trophy,
    images: [],
    details: {
      overview: "Developed as the 4th-semester Project-Based Learning capstone for the Information Technology Department at Politeknik Negeri Malang. It unifies the submission, advisory, and verification workflows for student academic and non-academic competition achievements.",
      features: [
        "Role-based access control (RBAC) supporting Students, Faculty Mentors, and Department Administrators",
        "Comprehensive Faculty portal for reviewing achievement evidence, audit trails, and official competition recommendations",
        "Decision Support System (DSS) algorithm recommending national and international contests based on verified student competencies",
        "Automated generation of cryptographic-ready departmental accomplishment transcripts in PDF format"
      ],
      challenges: "Architecting relational database integrity across multi-tiered approval chains during high-volume end-of-semester certification deadlines.",
      solution: "Designed normalized MySQL schemas with transactional ACID guarantees, database indexing on approval state machines, and authenticated document storage."
    }
  },
  {
    id: 8,
    title: "Sistem Tata Tertib Mahasiswa",
    role: "UI/UX & Frontend Systems Developer",
    desc: "Institutional compliance and disciplinary management platform developed for Politeknik Negeri Malang to digitize code-of-conduct enforcement, transparent penalty logging, and student appeals.",
    tech: ["Figma", "Laravel", "Bootstrap", "UI/UX Design"],
    categories: ["Web Dev"],
    links: [
      { type: "repo", label: "Source Code", url: "https://github.com/VarizkyNaldiba/TataTertibMhs" }
    ],
    icon: ShieldAlert,
    images: [],
    details: {
      overview: "A 3rd-semester Project-Based Learning initiative modernizing how student conduct and institutional policies are tracked at Politeknik Negeri Malang. It replaced paper notices with an accessible, transparent digital workflow.",
      features: [
        "End-to-end Figma UI/UX design architecture, design system tokens, and interactive user journeys",
        "Student compliance dashboard providing real-time visibility into conduct standings, violation thresholds, and policy references",
        "Administrative departmental console for structured violation logging, photo evidence attachment, and sanction assignment",
        "Transparent grievance and dispute resolution workflow for student affairs officers"
      ],
      challenges: "Balancing administrative policy rigor with transparent, constructive user flows to prevent adversarial student experiences.",
      solution: "Conducted stakeholder alignment sessions with campus administration and student council leaders, implementing an objective, state-driven status hierarchy."
    }
  },
  {
    id: 9,
    title: "School Spatial Distribution GIS",
    role: "Spatial Data Analyst",
    desc: "Geographic Information System (GIS) analytics project investigating the spatial clustering, regional density, and accessibility radii of secondary schools across East Java.",
    tech: ["Python", "GeoJSON", "Folium", "GIS", "Pandas"],
    categories: ["Data Science", "Data Analyst"],
    links: [
      { type: "repo", label: "Source Code", url: "https://github.com/VarizkyNaldiba/SchoolSpatial_on_EastJava" }
    ],
    icon: Map,
    images: [],
    details: {
      overview: "A spatial data analytics project investigating the geographic concentration and gaps in educational infrastructure across East Java. The analysis highlights accessibility challenges between urban education centers and remote rural districts.",
      features: [
        "Geospatial vector analysis rendering academic facilities over regional polygon boundaries using Folium and GeoJSON",
        "Spatial point pattern analysis and K-Means clustering identifying educational saturation hubs versus underserved rural areas",
        "Euclidean and network distance matrices computing accessibility buffers from peripheral settlements to secondary institutions"
      ],
      challenges: "Browser memory exhaustion and frame rate degradation when rendering thousands of geospatial coordinate markers simultaneously.",
      solution: "Implemented hierarchical marker clustering algorithms in Folium and reduced coordinate precision in GeoJSON topology, yielding a 65% decrease in client rendering overhead."
    }
  },
  {
    id: 10,
    title: "Agroclimatology Weather Prediction",
    role: "Predictive Modeling & Data Scientist",
    desc: "Supervised machine learning time-series regression model forecasting agricultural temperature trends and precipitation patterns to optimize regional irrigation and planting windows.",
    tech: ["Python", "Scikit-Learn", "Pandas", "Matplotlib"],
    categories: ["Machine Learning", "Data Science"],
    links: [
      { type: "repo", label: "Source Code", url: "https://github.com/VarizkyNaldiba/Intelecta_P-1ML" }
    ],
    icon: Thermometer,
    images: [],
    details: {
      overview: "A predictive machine learning model designed to forecast regional temperature patterns and climate metrics. The predictions help agricultural growers optimize planting and harvesting schedules against weather volatility.",
      features: [
        "Time-series feature engineering pipeline incorporating rolling statistics, temporal lags, and cyclical calendar transformations",
        "Empirical benchmarking across multiple regression paradigms: Ordinary Least Squares, Random Forest Regressor, and Gradient Boosting",
        "Gini importance and SHAP-based feature attribution isolating primary meteorological predictors of temperature variance",
        "Model validation rigorous against Mean Absolute Error (MAE), Root Mean Squared Error (RMSE), and coefficient of determination (R²)"
      ],
      challenges: "Managing multi-collinearity among ambient humidity, pressure, and solar radiation while accounting for non-linear seasonal shocks.",
      solution: "Engineered 7-day and 30-day temporal lag indicators alongside harmonic sine/cosine seasonal encodings, reducing root mean squared error by 15.4% over baseline estimators."
    }
  }
];

const filterCategories = [
  { id: "All", name: "All", icon: Grid },
  { id: "Machine Learning", name: "Machine Learning", icon: Bot },
  { id: "IoT", name: "IoT", icon: Cpu },
  { id: "Data Science", name: "Data Science", icon: Brain },
  { id: "Web Dev", name: "Web Dev", icon: Globe },
  { id: "Data Analyst", name: "Data Analyst", icon: TrendingUp }
];

export default function Projects() {
  const projectsData = getProjectsData();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeLightboxImg, setActiveLightboxImg] = useState(null);

  // Close modals on Escape key
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

  return (
    <section className="section-container" id="projects">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-head">
          <span className="section-kicker">Portfolio & Case Studies</span>
          <h2 className="section-title">Engineered Projects</h2>
          <p className="section-subtitle">
            A curated selection of applied machine learning models, IoT telemetry systems, 
            geospatial data analyses, and enterprise full-stack platforms.
          </p>
        </div>

        {/* Controls: Search and Filters */}
        <div className="projects-controls-container">
          
          {/* Search Box */}
          <div className="search-bar">
            <Search size={16} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by technology, name, or keyword..." 
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
            <span>Showing {filteredProjects.length} of {projectsData.length} projects</span>
            {searchQuery && <span className="search-query-tag">for "{searchQuery}"</span>}
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
                      {project.categories.map(c => (
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

                  {/* Tech Badges */}
                  <div className="project-tech-row">
                    {project.tech.map((tag) => (
                      <span key={tag} className="tech-badge">{tag}</span>
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
                      title="Read Case Study & Technical Details"
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

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div 
            className="modal-backdrop"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="modal-window"
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                className="modal-close" 
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal window"
              >
                <X size={18} />
              </button>

              {/* Modal Head */}
              <div className="modal-head">
                <div className="modal-head-icon">
                  {selectedProject.icon && <selectedProject.icon size={24} />}
                </div>
                <div className="modal-head-titles">
                  <h3 className="modal-title">{selectedProject.title}</h3>
                  <div className="modal-role-line">
                    <UserCheck size={14} />
                    <span>{selectedProject.role}</span>
                    <span className="modal-dot">•</span>
                    <span>{selectedProject.categories.join(', ')}</span>
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
                      <span key={t} className="tech-badge">{t}</span>
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
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
              aria-label="Close fullscreen view"
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
