import { Thermometer } from 'lucide-react';
import imgRank18 from './assets/leaderboard-rank18.jpg';
import imgLabSession from './assets/sesi-coding-lab.jpg';

export const agroclimatologyIntelecta = {
  id: 7,
  slug: "agroclimatology-intelecta",
  title: "Intelecta Cup 2025 Data Mining (Rank 18/82)",
  role: "ML Engineer & Data Scientist (Team P-1 ML)",
  desc: "Competitive time-series climate regression pipeline achieving Rank 18 out of 82 national teams with a Kaggle score of 94.310 at the INTELECTA CUP 2025 Data Mining Competition.",
  tech: ["Python", "CatBoost", "XGBoost", "Scikit-Learn", "Pandas", "Feature Engineering"],
  categories: ["Machine Learning", "Data Science"],
  links: [
    { type: "repo", label: "Source Code", url: "https://github.com/VarizkyNaldiba/Intelecta_P-1ML" }
  ],
  icon: Thermometer,
  images: [imgRank18, imgLabSession],
  details: {
    overview: "Built for the INTELECTA CUP 2025 Data Mining Competition by team P-1 ML from Politeknik Negeri Malang. Serving as ML Engineer, handled end-to-end data preprocessing, model exploration across boosting algorithms, and final submission formulation—achieving 18th place among 82 national university teams.",
    features: [
      "Achieved 18th place out of 82 participants on the official Kaggle Scoreboard with an accuracy index of 94.310",
      "Optimized regression pipeline utilizing CatBoost and XGBoost ensemble algorithms",
      "Extensive meteorological feature engineering including multi-period rolling statistics and cyclical transformations",
      "Rigorous cross-validation mitigating overfitting on localized East Java climatic anomalies"
    ],
    challenges: "Handling high multi-collinearity between ambient temperature, humidity, and barometric pressure under sudden seasonal weather anomalies.",
    solution: "Engineered harmonic sine/cosine seasonal date encodings combined with feature attribution importance thresholds, elevating predictive score to 94.310."
  }
};
