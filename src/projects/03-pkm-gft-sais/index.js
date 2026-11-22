import { FileText } from 'lucide-react';
import imgProposal from './assets/proposal-sais-pkm-gft.png';
import imgSkLolos from './assets/sk-lolos-tahap2-pkm.png';

export const pkmGftSais = {
  id: 3,
  slug: "pkm-gft-sais",
  title: "Smart Aquaculture Intelligence System (SAIS)",
  role: "Principal Author & System Conceptor",
  desc: "Nationally funded conceptual blueprint (Selected for Phase 2 National Research Grant Polinema 2026) designing an AI-driven, distributed aquaculture management framework for freshwater fish food self-sufficiency.",
  tech: ["AI Systems", "Digital Twin", "Autonomous Smart Farm", "IoT Telemetry", "National Policy Modeling"],
  categories: ["Research & AI", "IoT"],
  links: [
    { type: "doc", label: "Official Award Letter (SK PKM 2026)", url: "#" }
  ],
  icon: FileText,
  images: [imgProposal, imgSkLolos],
  details: {
    overview: "Written as an official PKM-GFT proposal at Politeknik Negeri Malang and successfully selected under the Phase 2 Incentive Scheme (Letter No: 40/WADIR.III/KM/2026). The paper outlines the SAIS 2045 blueprint to transform traditional fragmented aquaculture into a unified data-backed national infrastructure.",
    features: [
      "Official selection in PKM POLINEMA 2026 Phase 2 Incentive Scheme under the authorship of Varizky Naldiba Rimra",
      "SAIS 2045 architectural layer unifying sensing nodes, edge compute, and national regulatory dashboards",
      "Autonomous Smart Farm algorithmic flowchart coordinating closed-loop feeding, aeration, and bio-floc monitoring",
      "Digital Twin simulation layer modeling microclimate fluctuations against catfish mortality rates"
    ],
    challenges: "Synthesizing macro-level socio-economic fishery statistics across East Java with micro-level edge sensor realities into a single coherent governance framework.",
    solution: "Engineered a tiered hierarchy separating edge hardware loops (instant survival triggers) from cloud analytical tiers (regional supply chain and harvest forecasting)."
  }
};
