import { Trophy } from 'lucide-react';
import imgPiala from './assets/piala-juara-harapan-2.jpg';
import imgSertifikat from './assets/sertifikat-tfs-2026.jpg';
import imgStage from './assets/stage-presentasi.jpg';

export const catfishCareTfs2026 = {
  id: 2,
  slug: "catfishcare-tfs2026",
  title: "CatfishCare (Juara Harapan 2 TFS 2026)",
  role: "Lead Systems Architect & Competitor",
  desc: "Award-winning IoT ecosystem for catfish farm monitoring and automated care, recognized as Juara Harapan 2 at the National Scientific Writing Competition Techno Fair & Seminar (TFS) 2026.",
  tech: ["ESP32", "C++", "IoT Telemetry", "Automated Care", "Sensors"],
  categories: ["IoT", "Hardware & Systems"],
  links: [
    { type: "repo", label: "IoT Firmware Repo", url: "https://github.com/VarizkyNaldiba/Smart_Aqua_IOT" },
    { type: "web", label: "Live Dashboard", url: "https://aqua-vion.vercel.app/" }
  ],
  icon: Trophy,
  images: [imgPiala, imgStage, imgSertifikat],
  details: {
    overview: "Formulated for the National Scientific Writing Competition Techno Fair and Seminar 2026 at Politeknik Negeri Malang under the theme 'Empowering Indonesia's Digital Sovereignty'. CatfishCare introduces an autonomous framework bridging IoT sensing directly to actionable physical pond interventions.",
    features: [
      "Awarded Juara Harapan 2 at National Level LKTI Techno Fair & Seminar 2026 (SK No. 27881/PL2.3/KM/2026)",
      "Real-time continuous water quality monitoring (pH, temperature, turbidity, water level)",
      "Automated water exchange actuation mechanism triggered when water parameters breach safety thresholds",
      "Actionable architecture framework: DATA (Sensors) -> INTELLIGENCE (Analytics & Prediction) -> ACTION (Automated Care)"
    ],
    challenges: "Synchronizing high-load physical actuator triggers (water pumps and solenoids) without causing electrical noise interference on sensitive analog probe readings.",
    solution: "Designed optocoupler galvanic isolation relays between ESP32 control logic and inductive pump loads, paired with moving-window software debounce algorithms."
  }
};
