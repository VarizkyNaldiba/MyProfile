import { GraduationCap } from 'lucide-react';
import imgMap1 from './assets/datathon1.png';
import imgLeaderboard from './assets/datathon-documentation-1.jpg';
import imgTeamLab from './assets/datathon-documentation-2.jpg';
import imgSertifikat from './assets/sertifikat-peserta-datathon.png';

export const slbSpatialDisparity = {
  id: 8,
  slug: "slb-spatial-disparity",
  title: "SLB Spatial Disparity Analysis (Jatim Datathon 2025)",
  role: "Lead Geospatial Data Analyst (Team Tim Maju Lancar)",
  desc: "Geodemographic spatial accessibility analysis evaluating infrastructure equity across 38 East Java regencies for Special Education Schools (SLB) at Jatim Datathon 2025.",
  tech: ["Python", "Pandas", "Matplotlib", "GeoJSON", "Folium", "HuggingFace"],
  categories: ["Data Science", "Data Analyst"],
  links: [
    { type: "web", label: "Interactive GIS Dashboard", url: "https://huggingface.co/spaces/Tim-Maju-Lancar-Datathon/Dashboard-Tim-Maju-Lancar-Datathon-Jatim-2025" },
    { type: "repo", label: "Source Code", url: "https://github.com/FarrelAD/Tim-Maju-Lancar-Datathon-Jatim-2025" }
  ],
  icon: GraduationCap,
  images: [imgMap1, imgLeaderboard, imgTeamLab, imgSertifikat],
  details: {
    overview: "An analytical study developed for Datathon Jatim 2025 ('Shaping The Future with Open Data') by team Tim Maju Lancar (Politeknik Negeri Malang). The project investigated the spatial distribution of special education facilities across East Java, producing a data-driven gap index to highlight underserved municipalities and assist public resource allocation.",
    features: [
      "Official Participant in Jatim Datathon 2025 ('Shaping The Future with Open Data') by Diskominfo Provinsi Jawa Timur",
      "Achieved 22nd National Rank with an official score of 83.85 on the Jatim Datathon 2025 Leaderboard",
      "Demographic and municipal data harmonization across 38 administrative regencies and cities in East Java",
      "Spatial Accessibility Index (SAI) formulation correlating special education capacity with regional youth disability statistics",
      "Interactive web GIS dashboard with choropleth heatmaps deployed to HuggingFace Spaces"
    ],
    challenges: "Reconciling disparate municipal registries with inconsistent administrative naming conventions, missing coordinates, and incompatible spatial boundaries.",
    solution: "Engineered an automated Python ETL pipeline leveraging Levenshtein fuzzy string matching to standardize location metadata and bind attributes directly to GeoJSON polygon geometries."
  }
};
