import { ShieldAlert } from 'lucide-react';
import imgUiFull from './assets/ui-tatib-full.png';

export const tataTertibMahasiswa = {
  id: 12,
  slug: "tata-tertib-mahasiswa",
  title: "Sistem Tata Tertib Mahasiswa",
  role: "UI/UX & Frontend Systems Developer",
  desc: "Institutional compliance and disciplinary management platform developed for Politeknik Negeri Malang to digitize code-of-conduct enforcement, transparent penalty logging, and student appeals.",
  tech: ["Figma", "Laravel", "Bootstrap", "UI/UX Design"],
  categories: ["Web Dev"],
  links: [
    { type: "repo", label: "Source Code", url: "https://github.com/VarizkyNaldiba/TataTertibMhs" }
  ],
  icon: ShieldAlert,
  images: [imgUiFull],
  details: {
    overview: "A 3rd-semester Project-Based Learning initiative modernizing how student conduct and institutional policies are tracked at Politeknik Negeri Malang. It replaced paper notices with an accessible, transparent digital workflow.",
    features: [
      "End-to-end Figma UI/UX design architecture, design system tokens, and interactive user journeys",
      "Student compliance dashboard providing real-time visibility into conduct standings, violation thresholds, and policy references",
      "Administrative departmental console for structured violation logging, photo evidence attachment, and sanction assignment",
      "Transparent grievance and dispute resolution workflow for student affairs officers"
    ],
    challenges: "Balancing administrative policy rigor with transparent, constructive user flows to prevent adversarial student experiences.",
    solution: "Conducted stakeholder alignment sessions with campus administration and student council leaders, implementing an objective, state-driven status hierarchy."
  }
};
