import { Camera } from 'lucide-react';
import imgFruitClassifier from './assets/fruit-classifier-live.jpg';
import imgFruit from './assets/fruitdetection.png';

export const fruitClassification = {
  id: 10,
  slug: "fruit-classification",
  title: "Fruit Classification Computer Vision",
  role: "Computer Vision & ML Engineer",
  desc: "Production-ready image classification pipeline recognizing 16 fruit varieties using hybrid feature extraction (GLCM, Wavelet, HOG) coupled with hyperparameter-tuned Support Vector Machines.",
  tech: ["Python", "OpenCV", "Scikit-Learn", "GLCM", "Wavelet", "HOG", "SVM", "HuggingFace"],
  categories: ["Machine Learning", "Data Science"],
  links: [
    { type: "web", label: "HuggingFace Space", url: "https://huggingface.co/spaces/Zelectra/PBL.MachineLearningAndPCVK" },
    { type: "repo", label: "Source Code", url: "https://github.com/VarizkyNaldiba/PBL_SMT_5" }
  ],
  icon: Camera,
  images: [imgFruitClassifier, imgFruit],
  details: {
    overview: "A Project-Based Learning research system exploring feature engineering for multi-class visual recognition. By extracting spatial texture descriptors, wavelet frequency distributions, and gradient orientations, the system achieves robust 16-category fruit classification using Support Vector Machines without requiring massive compute budgets.",
    features: [
      "Multi-scale feature extraction combining GLCM texture matrices, 2D Discrete Wavelet Transform, and HOG edge descriptors",
      "Multi-class Support Vector Machine (SVM) classifier optimized with Radial Basis Function (RBF) kernel tuning",
      "Production inference service hosted on HuggingFace Spaces with client-side image uploads and sub-second classification",
      "Real-time prediction confidence vector and probability breakdown across all 16 target classes"
    ],
    challenges: "High intraclass variability, uneven illumination gradients, and subtle boundary textures among similar botanical classes.",
    solution: "Implemented Contrast Limited Adaptive Histogram Equalization (CLAHE) with morphological foreground masks to produce an illumination-invariant composite feature representation."
  }
};
