import { Map } from 'lucide-react';
import imgDistribusi from './assets/distribusi-sekolah.png';
import imgKomparasi from './assets/komparasi-sekolah.png';
import imgPetaTotal from './assets/peta-sebaran-total.png';

export const schoolSpatialGis = {
  id: 13,
  slug: "school-spatial-gis",
  title: "School Spatial Distribution GIS",
  role: "Spatial Data Analyst",
  desc: "Geographic Information System (GIS) analytics project investigating the spatial clustering, regional density, and accessibility radii of secondary schools across East Java.",
  tech: ["Python", "GeoJSON", "Folium", "GIS", "Pandas", "K-Means"],
  categories: ["Data Science", "Data Analyst"],
  links: [
    { type: "repo", label: "Source Code", url: "https://github.com/VarizkyNaldiba/SchoolSpatial_on_EastJava" }
  ],
  icon: Map,
  images: [imgPetaTotal, imgDistribusi, imgKomparasi],
  details: {
    overview: "A spatial data analytics project investigating the geographic concentration and gaps in educational infrastructure across East Java. The analysis highlights accessibility challenges between urban education centers and remote rural districts.",
    features: [
      "Geospatial vector analysis rendering academic facilities over regional polygon boundaries using Folium and GeoJSON",
      "Spatial point pattern analysis and K-Means clustering identifying educational saturation hubs versus underserved rural areas",
      "Euclidean and network distance matrices computing accessibility buffers from peripheral settlements to secondary institutions"
    ],
    challenges: "Browser memory exhaustion and frame rate degradation when rendering thousands of geospatial coordinate markers simultaneously.",
    solution: "Implemented hierarchical marker clustering algorithms in Folium and reduced coordinate precision in GeoJSON topology, yielding a 65% decrease in client rendering overhead."
  }
};
