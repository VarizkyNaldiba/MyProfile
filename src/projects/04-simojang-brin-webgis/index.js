import { Map } from 'lucide-react';
import imgLiveMap from './assets/simojang-live-map.png';
import imgWebProduction from './assets/simojang-web-production.png';
import imgDiskusiBrin from './assets/diskusi-riset-brin.jpg';
import imgField1 from './assets/img-20260518-wa0020.jpg';
import imgField2 from './assets/img-20260519-wa0055.jpg';
import imgTelemetry from './assets/img-20260521-wa0027.jpg';
import imgDokumen1 from './assets/dokumen-riset-brin-1.png';
import imgDokumen2 from './assets/dokumen-riset-brin-2.png';

export const simojangBrinWebgis = {
  id: 4,
  slug: "simojang-brin-webgis",
  title: "SIMOJANG Brantas (Riset BRIN x Polinema)",
  role: "IT & WebGIS Production Developer",
  desc: "Participatory WebGIS spatial information and early warning platform for flood monitoring in the Upper Brantas River Basin, developed under institutional research collaboration with BRIN.",
  tech: ["WebGIS", "Leaflet", "OpenStreetMap", "BMKG Telemetry", "BPBD Inundation Data", "Spatial DB"],
  categories: ["Web Dev", "Data Science", "Data Analyst"],
  links: [
    { type: "web", label: "Live Production WebGIS", url: "https://simojang.let.polinema.ac.id/" }
  ],
  icon: Map,
  images: [imgLiveMap, imgWebProduction, imgDiskusiBrin, imgField1, imgField2, imgTelemetry, imgDokumen1, imgDokumen2],
  details: {
    overview: "Developed as part of applied research (Riset Terapan Inovasi DIPA Polinema in collaboration with Badan Riset dan Inovasi Nasional / BRIN). SIMOJANG Brantas establishes a collaborative, location-based early warning system consolidating hydrometeorological radar data and municipal emergency records.",
    features: [
      "Production-deployed WebGIS platform accessible publicly at simojang.let.polinema.ac.id",
      "Real-time precipitation layer integration with BMKG radar reflectivity bands (very light to extreme rainfall)",
      "Municipal BPBD secondary flood reporting with georeferenced affected household counts (<10, 10-100, >100 households)",
      "Elevation contours and participatory crowdsourced flood hazard submission portal for local communities"
    ],
    challenges: "Rendering dense vector boundaries and high-frequency live spatial weather updates smoothly on lightweight client browsers without frame drops.",
    solution: "Structured dynamic GeoJSON feature layers with Leaflet canvas rendering and coordinate precision pruning, backed by optimized server-side query endpoints."
  }
};
