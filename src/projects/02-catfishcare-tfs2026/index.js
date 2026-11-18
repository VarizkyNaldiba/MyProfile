import { Trophy } from 'lucide-react';
import imgPiala from './assets/piala-juara-harapan-2.jpg';
import imgSertifikat from './assets/sertifikat-tfs-2026.jpg';
import imgStage1 from './assets/1-salinan-img_4717.jpg';
import imgStage2 from './assets/2-salinan-img_4729.jpg';
import imgStage3 from './assets/3-salinan-img_4862.jpg';
import imgStage4 from './assets/4-salinan-img_4990.jpg';

export const catfishCareTfs2026 = {
  id: 2,
  slug: "catfishcare-tfs2026",
  title: "CatfishCare — Automated Aquaculture Care System",
  role: "Lead Systems Architect & Competitor",
  desc: "Award-winning IoT ecosystem for catfish farm monitoring and automated care, recognized as Juara Harapan 2 at the National Scientific Writing Competition Techno Fair and Seminar (TFS) 2026.",
  tech: ["ESP32", "C++", "IoT Telemetry", "Automated Care", "Sensors"],
  categories: ["IoT", "Hardware & Systems"],
  links: [
    { type: "repo", label: "IoT Firmware Repo", url: "https://github.com/VarizkyNaldiba/Smart_Aqua_IOT" },
    { type: "web", label: "Live Dashboard", url: "https://aqua-vion.vercel.app/" }
  ],
  icon: Trophy,
  images: [imgPiala, imgSertifikat, imgStage1, imgStage2, imgStage3, imgStage4],
  details: {
    overview: "Formulated for the National Scientific Writing Competition Techno Fair and Seminar (TFS) 2026 at Politeknik Negeri Malang under the theme 'Empowering Indonesia's Digital Sovereignty'. CatfishCare introduces an autonomous framework bridging IoT sensing directly to actionable physical pond interventions.",
    features: [
      "Awarded Juara Harapan 2 at National Level LKTI Techno Fair and Seminar (TFS) 2026 (SK No. 27881/PL2.3/KM/2026)",
      "Real-time continuous water quality monitoring (pH, temperature, turbidity, water level)",
      "Automated water exchange actuation mechanism triggered when water parameters breach safety thresholds",
      "Actionable architecture framework: DATA (Sensors) -> INTELLIGENCE (Analytics & Prediction) -> ACTION (Automated Care)"
    ],
    challenges: "Synchronizing high-load physical actuator triggers (water pumps and solenoids) without causing electrical noise interference on sensitive analog probe readings.",
    solution: "Designed optocoupler galvanic isolation relays between ESP32 control logic and inductive pump loads, paired with moving-window software debounce algorithms."
  }
};
