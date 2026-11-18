import { Droplet } from 'lucide-react';
import imgLiveDashboard from './assets/aquavion-dashboard-live.png';
import imgDashboard from './assets/dashboardAqua-vion.png';
import imgIot from './assets/iot-AquaVion.jpeg';

export const aquavion = {
  id: 1,
  slug: "aquavion",
  title: "Aquavion",
  role: "Systems Lead & IoT Firmware Engineer",
  desc: "Industrial-grade IoT freshwater catfish aquaculture telemetry platform integrating submerged ESP32 sensor probes, automated non-linear calibration offsets, and a Next.js real-time analytics dashboard.",
  tech: ["Next.js", "Firebase", "ESP32", "Arduino", "C++", "IoT"],
  categories: ["IoT", "Web Dev"],
  links: [
    { type: "iot", label: "IoT Firmware", url: "https://github.com/VarizkyNaldiba/Smart_Aqua_IOT" },
    { type: "web", label: "Live Dashboard", url: "https://aqua-vion.vercel.app/" },
    { type: "progress", label: "Technical Roadmap", url: "https://dashboard-notion-aqua-vion.vercel.app/" }
  ],
  icon: Droplet,
  images: [imgLiveDashboard, imgDashboard, imgIot],
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
};
