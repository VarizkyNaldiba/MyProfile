import { Users } from 'lucide-react';
import imgDensityModel from './assets/hology-density-model.png';

export const crowdDensityHology = {
  id: 6,
  slug: "crowd-density-hology",
  title: "Crowd Density Estimation (Hology Finalist)",
  role: "Deep Learning & Computer Vision Engineer (Team Penyelam Handal)",
  desc: "Deep convolutional density map regression system estimating crowd counts in unconstrained surveillance imagery, advancing to National Finalist at Hology 8.0 Data Mining Competition.",
  tech: ["Python", "TensorFlow", "PyTorch", "MCNN", "CSRNet", "OpenCV"],
  categories: ["Machine Learning", "Data Science"],
  links: [
    { type: "repo", label: "Source Code", url: "https://github.com/VarizkyNaldiba/PenyelamHandal_Hology" }
  ],
  icon: Users,
  images: [imgDensityModel],
  details: {
    overview: "Developed for the Hology Data Mining competition by team Penyelam Handal. The goal was to accurately predict the number of individuals in high-density scenes characterized by severe perspective distortion, partial body occlusions, and variable lighting.",
    features: [
      "Advanced as National Finalist at Hology Data Mining Competition with team Penyelam Handal",
      "Deep density map regression architecture implementing Multi-Column Convolutional Neural Networks (MCNN)",
      "Trained on a benchmark dataset of 1,900 dense images with rigorous multi-scale data augmentations",
      "Model convergence validated across 500 benchmark test images using Mean Absolute Error (MAE) and Mean Squared Error (MSE)"
    ],
    challenges: "Exponential scale variance of human heads caused by extreme camera perspective angles and heavy multi-body occlusion.",
    solution: "Designed multi-branch convolutional pathways with disparate kernel sizes (3x3, 5x5, 7x7) to extract scale-invariant density features before density map reconstruction."
  }
};
