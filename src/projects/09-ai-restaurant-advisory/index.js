import { Bot } from 'lucide-react';
import imgLiveApp from './assets/rmpadang-live-app.png';
import imgRmPadang from './assets/rmpadang.png';

export const aiRestaurantAdvisory = {
  id: 9,
  slug: "ai-restaurant-advisory",
  title: "AI Restaurant Advisory System",
  role: "Applied AI & Data Scientist",
  desc: "Generative AI decision-support platform for food service enterprises (RM Padang) powered by Google Gemini API and Streamlit, synthesizing financial margins, ingredient seasonality, and BCG menu matrices.",
  tech: ["Python", "Google Gemini API", "Streamlit", "Prompt Engineering", "Pandas"],
  categories: ["Data Science", "Machine Learning"],
  links: [
    { type: "web", label: "Live Streamlit App", url: "https://varizkynaldiba-project-of-llm-based-tools-and-gem-fnb-rm-vjbmhr.streamlit.app/" },
    { type: "repo", label: "Source Code", url: "https://github.com/VarizkyNaldiba/Project-of-LLM-Based-Tools-and-Gemini-API-Integration-for-Data-Scientists" }
  ],
  icon: Bot,
  images: [imgLiveApp, imgRmPadang],
  details: {
    overview: "An AI business advisory tool designed for traditional and independent food service operators (such as RM Padang). Grounded in practical commercial culinary operations, the application analyzes menu item margins, seasonal ingredient price swings, and customer reviews to provide actionable culinary optimizations and portion cost controls.",
    features: [
      "Contextual domain reasoning powered by Google Gemini API with strict system prompt schemas",
      "Interactive Streamlit analytical interface tailored for independent and multi-outlet F&B operators",
      "Menu engineering BCG matrix automating profitability vs popularity categorization",
      "Automated recipe costing audits and dynamic inventory replenishment recommendations"
    ],
    challenges: "Eliminating generative hallucination and standardizing localized culinary cost indices and ingredient perishability curves.",
    solution: "Developed structured prompt engineering templates with schema-validated context injection, enforcing deterministic calculations for margins, supplier cost shifts, and shelf-life metrics."
  }
};
