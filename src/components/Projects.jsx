import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, TrendingUp, Bot, Camera, ShieldAlert, Trophy, 
  Droplet, GraduationCap, Wifi, Users, Map, Thermometer,
  ExternalLink, UserCheck, Brain, X, Cpu, Globe, Grid, AlertCircle,
  Check, BookOpen, Lightbulb, Code, Key
} from 'lucide-react';
import { Github } from './BrandIcons';

// Import newly added project screenshots and photographs
import imgAquavionIot from '../assets/iot-AquaVion.jpeg';
import imgAquavionDashboard from '../assets/dashboardAqua-vion.png';
import imgFruitDetection from '../assets/fruitdetection.png';
import imgDatathon from '../assets/datathon1.png';
import imgRmPadang from '../assets/rmpadang.png';

const getProjectsData = () => [
  {
    id: 1,
    title: "Aquavion",
    role: "Project Manager",
    desc: "Comprehensive IoT water quality monitoring system for catfish ponds. Integrates ESP32 telemetry, Firebase real-time data syncing, and a Next.js web dashboard.",
    tech: ["Next.js", "Firebase", "ESP32", "Arduino", "IoT"],
    categories: ["Web Dev", "IoT"],
    links: [
      { type: "iot", url: "https://github.com/VarizkyNaldiba/Smart_Aqua_IOT" },
      { type: "web", url: "https://aqua-vion.vercel.app/" },
      { type: "progress", url: "https://github.com/Naditya206/AquaVion" }
    ],
    icon: Droplet,
    images: [imgAquavionIot, imgAquavionDashboard],
    details: {
      overview: "Aquavion is an end-to-end telemetry and monitoring system designed to optimize catfish (lele) farming. It monitors key water quality parameters such as temperature, pH, and turbidity in real-time, sending data to a Firebase Realtime Database. The information is then visualized on a responsive web dashboard for farmers to prevent crop failure.",
      features: [
        "Real-time water quality tracking (temperature, pH, turbidity)",
        "Automated ESP32/Arduino sensor calibration and Firebase sync",
        "Interactive analytics charts and dashboard alerts",
        "Cross-platform responsive dashboard layout"
      ],
      challenges: "Calibrating water sensors (pH, temperature, turbidity) for continuous underwater operation and handling network disconnection on the ESP32 side to ensure data reliability.",
      solution: "Implemented automatic sensor recalibration offset formulas in the firmware and a local buffer system on the ESP32 to cache telemetry data during brief WiFi dropouts.",
      assetsNeeded: ""
    }
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
    icon: Bot,
    images: [imgRmPadang],
    details: {
      overview: "An AI-powered advisory system that helps restaurant owners make data-driven business decisions. It takes inputs such as regional trends, ingredient costs, and customer reviews to recommend menu adjustments, marketing campaigns, and staffing strategies.",
      features: [
        "Generative AI integration using the Gemini API",
        "Streamlit-based user-friendly chat and dashboard interface",
        "Natural language advice on menu pricing and optimizations",
        "Insight reports generated dynamically in PDF/Markdown format"
      ],
      challenges: "Managing LLM hallucinations regarding local restaurant menus and optimizing API response times for complex queries.",
      solution: "Engineered strict system prompts with context injection of regional culinary data, and implemented asynchronous API calls in Streamlit.",
      assetsNeeded: ""
    }
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
    icon: Camera,
    images: [imgFruitDetection],
    details: {
      overview: "A comprehensive computer vision model designed to classify fruits across 16 different categories. It utilizes traditional texture and shape features like Gray-Level Co-occurrence Matrix (GLCM), Wavelet transform, and Histogram of Oriented Gradients (HOG) coupled with a Support Vector Machine (SVM).",
      features: [
        "Feature extraction pipelines using GLCM, Wavelet, and HOG",
        "Support Vector Machine (SVM) multi-class classification model",
        "Web interface deployed on HuggingFace Spaces",
        "Real-time prediction with image upload capability"
      ],
      challenges: "Varying lighting conditions and background noise in fruit photos causing classification errors in similar looking fruits (e.g. orange vs lemon).",
      solution: "Applied robust image preprocessing techniques including background removal masks and adaptive histogram equalization.",
      assetsNeeded: ""
    }
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
    icon: ShieldAlert,
    images: [],
    details: {
      overview: "A student rules and discipline management system aimed at simplifying how universities track and process student policy violations. The project covers the UI/UX design prototype in Figma and subsequent frontend implementation in Laravel.",
      features: [
        "Figma user journey and wireframes",
        "Student dashboard displaying current status and demerit points",
        "Admin panel for staff to submit violation reports and attach evidence",
        "Notification system for warnings and disciplinary actions"
      ],
      challenges: "Designing an interface that is clear and non-punitive for students, while providing complete information for administrative staff.",
      solution: "Conducted user research with students and university administrators, implementing a clean visual dashboard with progress rings for demerit thresholds.",
      assetsNeeded: "Requires high-fidelity Figma screen mockups showing student dashboard and admin tracking views."
    }
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
    icon: Trophy,
    images: [],
    details: {
      overview: "A centralized platform designed for university students to log their achievements, certifications, and awards, which are then routed to department heads for official verification.",
      features: [
        "Role-based authentication (Student, Department Head, Administrator)",
        "Document upload system for award verification certificates",
        "Automated PDF report generation of verified achievements",
        "Dynamic statistics dashboard showing achievements by category"
      ],
      challenges: "Ensuring secure and tamper-proof storage of uploaded PDF certificate evidence and handling heavy traffic during student graduation seasons.",
      solution: "Implemented secure file storage with hashed file naming and query optimizations in Laravel using indexes on achievement statuses.",
      assetsNeeded: "Requires a screenshot of the student achievement submission form and the department head approval screen."
    }
  },
  {
    id: 6,
    title: "AlgaSense",
    role: "Machine Learning Engineer",
    desc: "IoT seaweed culture monitoring system powered by deep learning harvest predictors.",
    tech: ["Python", "TensorFlow", "Keras", "IoT"],
    categories: ["IoT", "Machine Learning"],
    links: [
      { type: "repo", url: "https://github.com/VarizkyNaldiba/Algasense" },
      { type: "colab", url: "https://colab.research.google.com/drive/188LKZtiXvQ8Q-nwy9ZtR2h_-UmRNYp_3" }
    ],
    icon: Droplet,
    images: [],
    details: {
      overview: "AlgaSense is an intelligent IoT system that monitors marine seaweed farms. It collects environmental data such as salinity, temperature, and turbidity, and inputs it into a TensorFlow-based deep learning model to forecast optimal seaweed harvest cycles.",
      features: [
        "Environmental data gathering via subsea IoT sensors",
        "Deep learning prediction model built with TensorFlow & Keras",
        "Google Colab training notebook with visualization plots",
        "Interactive telemetry dashboard showing historical growth predictions"
      ],
      challenges: "Handling sparse and noisy data points collected from remote marine sensor nodes.",
      solution: "Utilized LSTM layers to model temporal trends and applied Kalman filters on the incoming sensor streams to smooth out telemetry noise.",
      assetsNeeded: "Requires a photograph of the subsea sensor node prototype and the model's loss/accuracy graphs from training."
    }
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
    icon: GraduationCap,
    images: [imgDatathon],
    details: {
      overview: "A comprehensive datathon analysis investigating the accessibility and distribution of special education facilities (SLB) in East Java. The study highlights underserved regencies to support better resource allocation.",
      features: [
        "Data cleaning and preprocessing using Pandas",
        "Statistical correlation analysis of population density vs school availability",
        "Choropleth mapping of East Java regencies using spatial datasets",
        "Actionable recommendations for the East Java Department of Education"
      ],
      challenges: "Merging disjointed municipal school registries with geographic coordinates and census data.",
      solution: "Created custom data alignment pipelines in Python and used fuzzy matching to reconcile inconsistent location spelling.",
      assetsNeeded: ""
    }
  },
  {
    id: 8,
    title: "Crowd Counting Model",
    role: "Data Scientist",
    desc: "Computer vision density estimation system designed for public safety crowd estimation.",
    tech: ["Python", "Deep Learning", "TensorFlow"],
    categories: ["Machine Learning", "Data Science"],
    links: [
      { type: "repo", url: "https://github.com/VarizkyNaldiba/PenyelamHandal_Hology" }
    ],
    icon: Users,
    images: [],
    details: {
      overview: "A deep learning computer vision model designed to count individuals in densely packed crowds. Useful for public safety monitoring, event planning, and facility queue management.",
      features: [
        "Convolutional Neural Network (CNN) density map estimator",
        "TensorFlow model architecture optimized for high-density images",
        "Custom dataset augmentation pipeline for crowd scaling",
        "Performance validation using Mean Absolute Error (MAE) metrics"
      ],
      challenges: "Severe perspective distortions and overlaps between people in highly congested images.",
      solution: "Employed a multi-column CNN (MCNN) architecture that uses filters of varying sizes to capture features at different scales.",
      assetsNeeded: "Requires density heatmap sample visuals showing people correctly detected and highlighted."
    }
  },
  {
    id: 9,
    title: "School Spatial Distribution",
    role: "Data Analyst",
    desc: "Geographic distribution mapping of academic locations in East Java utilizing GIS datasets.",
    tech: ["Python", "GeoJSON", "GIS"],
    categories: ["Data Science", "Data Analyst"],
    links: [
      { type: "repo", url: "https://github.com/VarizkyNaldiba/SchoolSpatial_on_EastJava" }
    ],
    icon: Map,
    images: [],
    details: {
      overview: "A geographic information system (GIS) mapping project visualizing the spatial coordinates of schools in East Java. It helps researchers identify patterns of school clustering and regions lacking educational access.",
      features: [
        "Interactive spatial plotting using Folium and GeoJSON",
        "Clustering analysis to find high density educational hubs",
        "Distance calculations between rural settlements and nearest schools",
        "Clean web-based map visualizations"
      ],
      challenges: "Rendering thousands of school nodes on web maps without lagging or interface clutter.",
      solution: "Implemented marker clustering groups in Folium and optimized GeoJSON files by simplifying polygon boundaries.",
      assetsNeeded: "Requires school coordinate map plot screenshot or Folium web map output."
    }
  },
  {
    id: 10,
    title: "Weather Prediction Model",
    role: "Data Scientist",
    desc: "Predictive agroclimatology temperature forecasting model utilizing statistical regression.",
    tech: ["Python", "Scikit-Learn"],
    categories: ["Machine Learning", "Data Science"],
    links: [
      { type: "repo", url: "https://github.com/VarizkyNaldiba/Intelecta_P-1ML" }
    ],
    icon: Thermometer,
    images: [],
    details: {
      overview: "A statistical regression model designed to predict agricultural temperatures and rainfall patterns. This tool helps farmers optimize their crop planting cycles based on predicted climate metrics.",
      features: [
        "Time-series pre-processing of regional weather data",
        "Multiple regression algorithms (Linear, Random Forest, Gradient Boosting)",
        "Feature importance scoring for climate factors",
        "Integration-ready prediction module for farm management software"
      ],
      challenges: "Extreme seasonality patterns and unexpected weather anomalies causing forecasting inaccuracy.",
      solution: "Added lag features and monthly seasonal indicators to the training dataset, yielding 15% better accuracy metrics.",
      assetsNeeded: "Requires temperature prediction line graph showing comparison of actual vs predicted climate trends."
    }
  }
];

const getFilterCategories = () => [
  { id: "All", name: "All", icon: Grid },
  { id: "IoT", name: "IoT", icon: Cpu },
  { id: "Data Science", name: "Data Science", icon: Brain },
  { id: "Machine Learning", name: "Machine Learning", icon: Bot },
  { id: "Web Dev", name: "Web Dev", icon: Globe },
  { id: "Data Analyst", name: "Data Analyst", icon: TrendingUp }
];

export default function Projects() {
  const projectsData = getProjectsData();
  const filterCategories = getFilterCategories();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);

  // API Token Copy State
  const [copied, setCopied] = useState(false);
  const [activeLightboxImg, setActiveLightboxImg] = useState(null);

  const handleCopyToken = () => {
    navigator.clipboard.writeText("AIzaSyDLEdd0VZsvF0SeQpf1eAHoWnv8Ktlvmpw");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Close modal or fullscreen lightbox on Escape key down
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
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeLightboxImg, selectedProject]);

  const filteredProjects = projectsData.filter((project) => {
    const matchesCategory = selectedCategory === "All" || project.categories.includes(selectedCategory);
    
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const getProjectCount = (category) => {
    if (category === "All") return projectsData.length;
    return projectsData.filter(p => p.categories.includes(category)).length;
  };

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
  };

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
        <div className="project-controls">
          
          {/* Custom Search Box */}
          <div className="search-box-wrapper">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by name, role, or technology..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")} 
                className="search-clear-btn"
                title="Clear Search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Filter Categories Bar */}
          <div className="project-filters">
            {filterCategories.map(({ name, icon: CategoryIcon }) => {
              const count = getProjectCount(name);
              const isActive = selectedCategory === name;
              return (
                <button
                  key={name}
                  className={`filter-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(name)}
                >
                  <CategoryIcon size={14} className="filter-btn-icon" />
                  <span>{name}</span>
                  <span className={`filter-badge ${isActive ? 'active' : ''}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Result Counts status */}
          <div className="results-status">
            Showing <strong>{filteredProjects.length}</strong> of <strong>{projectsData.length}</strong> projects
            {searchQuery && <span> for search: "{searchQuery}"</span>}
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
                  onClick={() => setSelectedProject(project)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="project-card-header">
                    <div className="project-card-icon">
                      <IconComponent size={24} />
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                      }}
                      className="card-detail-btn"
                      title="View Project Details"
                    >
                      Details &rarr;
                    </button>
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

                  <div className="project-card-links" onClick={(e) => e.stopPropagation()}>
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
                          ) : link.type === 'colab' ? (
                            <>
                              View Colab <Brain size={14} />
                            </>
                          ) : link.type === 'iot' ? (
                            <>
                              IoT System <Cpu size={14} />
                            </>
                          ) : link.type === 'progress' ? (
                            <>
                              Progress <TrendingUp size={14} />
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
            className="empty-state-wrapper"
          >
            <AlertCircle size={40} className="empty-state-icon" />
            <p>No projects found matching the criteria.</p>
            <button className="btn-secondary" onClick={handleResetFilters}>
              Reset Filters & Search
            </button>
          </motion.div>
        )}

      </div>

      {/* Details Popup Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                className="modal-close-btn" 
                onClick={() => setSelectedProject(null)}
                aria-label="Close details"
              >
                <X size={20} />
              </button>

              {/* Modal Header */}
              <div className="modal-header">
                <div className="modal-project-icon">
                  {React.createElement(selectedProject.icon, { size: 28 })}
                </div>
                <div className="modal-header-text">
                  <h3 className="modal-title">{selectedProject.title}</h3>
                  <div className="modal-meta-row">
                    <div className="modal-role">
                      <UserCheck size={14} />
                      <span>{selectedProject.role}</span>
                    </div>
                    <div className="modal-categories">
                      {selectedProject.categories.map(cat => (
                        <span key={cat} className="modal-category-badge">{cat}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Scrollable Body */}
              <div className="modal-body">
                {/* Overview */}
                <div className="modal-section">
                  <h4 className="modal-section-title">Overview</h4>
                  <p className="modal-text">{selectedProject.details.overview}</p>
                </div>

                {/* Project Screenshot Gallery */}
                {selectedProject.images && selectedProject.images.length > 0 && (
                  <div className="modal-gallery">
                    {selectedProject.images.map((img, idx) => (
                      <img 
                        key={idx} 
                        src={img} 
                        alt={`${selectedProject.title} Preview ${idx + 1}`} 
                        className="modal-gallery-img" 
                        onClick={() => setActiveLightboxImg(img)}
                        style={{ cursor: 'zoom-in' }}
                      />
                    ))}
                  </div>
                )}

                {/* Key Features */}
                <div className="modal-section">
                  <h4 className="modal-section-title">Key Features</h4>
                  <ul className="modal-features-list">
                    {selectedProject.details.features.map((feature, i) => (
                      <li key={i} className="modal-feature-item">
                        <Check size={14} className="feature-check-icon" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Challenges & Solutions */}
                <div className="modal-grid-2col">
                  <div className="modal-section">
                    <h4 className="modal-section-title text-warning">The Challenge</h4>
                    <p className="modal-text small-text">{selectedProject.details.challenges}</p>
                  </div>
                  <div className="modal-section">
                    <h4 className="modal-section-title text-success">Our Solution</h4>
                    <p className="modal-text small-text">{selectedProject.details.solution}</p>
                  </div>
                </div>

                {/* Assets / Image Requirements */}
                {selectedProject.details.assetsNeeded && (
                  <div className="modal-assets-notice">
                    <div className="assets-notice-header">
                      <span>Asset & Image Requirements</span>
                    </div>
                    <p className="assets-notice-text">
                      {selectedProject.details.assetsNeeded}
                    </p>
                  </div>
                )}

                {/* Gemini API Token Display (for AI Consultant, id: 2) */}
                {selectedProject.id === 2 && (
                  <div className="modal-section api-token-section">
                    <h4 className="modal-section-title">Gemini API Token</h4>
                    <p className="modal-text small-text">
                      This application runs on the Gemini API. You can use the public API token below to test and run the live advisory system:
                    </p>
                    <div className="api-token-container" onClick={(e) => e.stopPropagation()}>
                      <code className="api-token-code">AIzaSyDLEdd0VZsvF0SeQpf1eAHoWnv8Ktlvmpw</code>
                      <button 
                        onClick={handleCopyToken}
                        className="api-token-copy-btn"
                        type="button"
                      >
                        {copied ? (
                          <>
                            <Check size={14} />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <ExternalLink size={14} />
                            <span>Copy Token</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Tech Stack Badges */}
                <div className="modal-section">
                  <h4 className="modal-section-title">Technologies Used</h4>
                  <div className="modal-tech-grid">
                    {selectedProject.tech.map(tech => (
                      <span key={tech} className="modal-tech-badge">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer Links */}
              <div className="modal-footer">
                {selectedProject.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-cta-btn"
                  >
                    {link.type === 'web' ? (
                      <>
                        <Globe size={16} />
                        <span>View Web</span>
                      </>
                    ) : link.type === 'colab' ? (
                      <>
                        <Brain size={16} />
                        <span>View Colab</span>
                      </>
                    ) : link.type === 'iot' ? (
                      <>
                        <Cpu size={16} />
                        <span>IoT System</span>
                      </>
                    ) : link.type === 'progress' ? (
                      <>
                        <TrendingUp size={16} />
                        <span>Project Progress</span>
                      </>
                    ) : (
                      <>
                        <Github size={16} />
                        <span>View Repository</span>
                      </>
                    )}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Lightbox Overlay */}
      <AnimatePresence>
        {activeLightboxImg && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLightboxImg(null)}
          >
            <button 
              className="lightbox-close-btn"
              onClick={() => setActiveLightboxImg(null)}
              aria-label="Close fullscreen preview"
            >
              <X size={24} />
            </button>
            <motion.img
              src={activeLightboxImg}
              alt="Fullscreen Preview"
              className="lightbox-img"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

