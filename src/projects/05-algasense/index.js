import { Droplet } from 'lucide-react';
import imgTimBanner from './assets/tim-algasense-banner.jpg';
import imgPanggung from './assets/panggung-tfs-2025.jpg';
import imgSertifikat from './assets/sertifikat-tfs2025-finalist.png';

export const algasense = {
  id: 5,
  slug: "algasense",
  title: "AlgaSense: Marine Seaweed IoT & ML (TFS 2025)",
  role: "Machine Learning & Embedded Systems Engineer",
  desc: "Intelligent subsea marine telemetry and predictive deep learning system monitoring seaweed aquaculture in Sumenep, Madura, awarded National Finalist at Techno Fair and Seminar (TFS) 2025.",
  tech: ["Python", "TensorFlow", "Keras", "LSTM", "Google Colab", "ESP32", "Salinity & DO Sensors"],
  categories: ["IoT", "Machine Learning"],
  links: [
    { type: "repo", label: "Source Code", url: "https://github.com/VarizkyNaldiba/Algasense" },
    { type: "colab", label: "Colab Notebook", url: "https://colab.research.google.com/drive/188LKZtiXvQ8Q-nwy9ZtR2h_-UmRNYp_3" }
  ],
  icon: Droplet,
  images: [imgTimBanner, imgPanggung, imgSertifikat],
  details: {
    overview: "Developed as a scientific innovation for the National Scientific Writing Competition Techno Fair and Seminar (TFS) 2025 at Politeknik Negeri Malang (Sertifikat No. 16002/PL2.3/KM/2025). It pairs subsea IoT sensing (salinity, pH, temperature, dissolved oxygen) with recurrent deep learning to safeguard marine seaweed cultivators in Sumenep.",
    features: [
      "National Finalist at LKTI Nasional Techno Fair and Seminar (TFS) 2025 (UKM Pendidikan dan Penalaran Polinema)",
      "Continuous oceanic telemetry acquisition capturing ambient salinity, pH, temperature, and dissolved oxygen",
      "Long Short-Term Memory (LSTM) recurrent neural network architecture forecasting seaweed growth trajectories",
      "Actionable harvest maturity index protecting cultivators from unexpected environmental salinity drops"
    ],
    challenges: "High-frequency sensor telemetry noise caused by tidal turbulence and limited historical oceanic time-series samples.",
    solution: "Applied moving-average temporal smoothing algorithms and implemented recurrent dropout regularization within LSTM memory cells to prevent overfitting on seasonal anomalies."
  }
};
