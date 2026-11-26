import { Cpu, Brain, Database, Utensils, BookOpen } from 'lucide-react';

export default function About() {
  const pillars = [
    {
      icon: Cpu,
      title: "Edge-to-Cloud Telemetry",
      desc: "Architecting end-to-end telemetry pipelines from calibrated sensor microcontrollers (ESP32/Arduino) to real-time cloud datastores (Firebase) and responsive analytic dashboards (Next.js)."
    },
    {
      icon: Brain,
      title: "Applied Computer Vision & ML",
      desc: "Developing production-oriented model pipelines—including convolutional crowd density regressors (CSRNet/MCNN), recurrent sequence predictors (LSTM), and multi-modal feature classifiers (SVM)."
    },
    {
      icon: Database,
      title: "Geospatial & Statistical Analytics",
      desc: "Processing regional public and municipal datasets into actionable geospatial intelligence—identifying spatial infrastructure disparities and informing strategic resource allocation."
    },
    {
      icon: Utensils,
      title: "Operational Rigor & Execution",
      desc: "Hands-on experience in commercial operations instills a focus on real-world constraints: fault tolerance, supply-chain logistics, and user-centric system reliability under high-load conditions."
    }
  ];

  return (
    <section className="section-container" id="about">
      <div className="container">

        {/* Section Header */}
        <div className="section-head">
          <span className="section-kicker">Professional Background</span>
          <h2 className="section-title">Engineering with Purpose</h2>
          <p className="section-subtitle">
            An overview of my academic foundation at Politeknik Negeri Malang and my approach to building dependable systems.
          </p>
        </div>

        {/* Narrative & Pillars Grid */}
        <div className="about-layout">
          {/* Left Narrative */}
          <div className="about-narrative">
            <h3 className="narrative-heading">
              Merging practical software craft with rigorous data science.
            </h3>
            <p className="narrative-text">
              I am an <strong>Informatics Engineer (D4 Teknik Informatika) from State Polytechnic of Malang</strong>.
              My engineering foundation is built upon rigorous Project-Based Learning (PBL), systems architecture,
              and applied research across artificial intelligence and the Internet of Things.
            </p>
            <p className="narrative-text">
              Rather than building abstract prototypes, I prioritize solving real operational challenges:
              calibrating water quality probes for catfish and seaweed cultivators in East Java,
              evaluating educational equity through spatial GIS analytics, and designing transparent
              academic tracking systems for university departments.
            </p>
            <p className="narrative-text">
              My previous experience in professional kitchen and culinary operations taught me how
              to execute under pressure, manage supply flows, and maintain exacting standards—an operational
              discipline I bring directly to every codebase, model, and data pipeline I build.
            </p>

            {/* Quick Education Callout Box */}
            <div className="education-box">
              <div className="education-icon">
                <BookOpen size={20} />
              </div>
              <div className="education-info">
                <span className="education-degree">D4 Teknik Informatika (Informatics Engineering)</span>
                <span className="education-school">State Polytechnic of Malang · 2022 – Present</span>
                <span className="education-focus">Specialization: Applied AI, IoT Telemetry, and Information Systems</span>
              </div>
            </div>
          </div>

          {/* Right Core Pillars */}
          <div className="about-pillars">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div key={idx} className="pillar-card">
                  <div className="pillar-icon">
                    <Icon size={20} />
                  </div>
                  <div className="pillar-body">
                    <h4 className="pillar-title">{pillar.title}</h4>
                    <p className="pillar-desc">{pillar.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
