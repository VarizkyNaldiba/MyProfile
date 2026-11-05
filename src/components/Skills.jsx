import { Brain, Database, Globe, Cpu, Wrench } from 'lucide-react';

export default function Skills() {
  const skillCategories = [
    {
      icon: Brain,
      title: "Machine Learning & AI",
      skills: [
        "TensorFlow", "Keras", "OpenCV", "Scikit-Learn", 
        "LSTM Networks", "CSRNet & MCNN", "Support Vector Machines", 
        "GLCM & HOG Features", "Gemini API", "Model Benchmarking"
      ]
    },
    {
      icon: Database,
      title: "Data Science & Geospatial",
      skills: [
        "Python", "Pandas", "NumPy", "Matplotlib", 
        "GeoJSON", "Folium GIS", "Spatial Disparity Indexing", 
        "Fuzzy String Matching", "Statistical Regression", "ETL Pipelines"
      ]
    },
    {
      icon: Globe,
      title: "Web & Full-Stack Systems",
      skills: [
        "React", "Next.js", "Laravel (PHP)", "Streamlit", 
        "Firebase Realtime DB", "MySQL", "REST APIs", 
        "Decision Support Systems", "Bootstrap", "HTML5 & Modern CSS"
      ]
    },
    {
      icon: Cpu,
      title: "IoT & Embedded Telemetry",
      skills: [
        "ESP32", "Arduino", "C / C++", 
        "Water Quality Sensors (pH, Turbidity, Temp)", 
        "Sensor Calibration Curves", "Local Flash Failover Buffers", 
        "WiFi Telemetry Sync"
      ]
    },
    {
      icon: Wrench,
      title: "Workflow & Engineering Tools",
      skills: [
        "Git & GitHub", "Figma (UI/UX Prototyping)", 
        "HuggingFace Spaces", "Google Colab", 
        "VS Code", "Vite", "Linux Basics"
      ]
    }
  ];

  return (
    <section className="section-container" id="skills">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-head">
          <span className="section-kicker">Technical Capabilities</span>
          <h2 className="section-title">Skills & Tooling</h2>
          <p className="section-subtitle">
            Technologies and frameworks applied across academic, competition, and production deployments.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="skills-grid">
          {skillCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div key={idx} className="skill-card">
                <div className="skill-card-header">
                  <div className="skill-card-icon">
                    <Icon size={18} />
                  </div>
                  <h3 className="skill-card-title">{cat.title}</h3>
                </div>

                <div className="skill-badge-cloud">
                  {cat.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="skill-badge">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
