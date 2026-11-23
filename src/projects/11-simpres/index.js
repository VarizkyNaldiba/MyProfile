import { Trophy } from 'lucide-react';
import imgDashboard from './assets/dashboard-simpres.jpg';
import imgPromethee from './assets/hasil-promethee.jpg';
import imgPenilaian from './assets/penilaian.jpg';

export const simpres = {
  id: 11,
  slug: "simpres",
  title: "SIMPRES: Student Achievement Management System",
  role: "Full-Stack Systems Engineer",
  desc: "Enterprise academic portal for the Information Technology Department at Politeknik Negeri Malang, streamlining student competition verification and integrating PROMETHEE Decision Support System (DSS) matching.",
  tech: ["Laravel", "PHP", "MySQL", "PROMETHEE DSS", "Bootstrap", "RBAC"],
  categories: ["Web Dev"],
  links: [
    { type: "repo", label: "Source Code", url: "https://github.com/VarizkyNaldiba/Prestasi-Mahasiswa-S4" }
  ],
  icon: Trophy,
  images: [imgDashboard, imgPromethee, imgPenilaian],
  details: {
    overview: "Developed as the 5th-semester Project-Based Learning capstone for the Information Technology Department at Politeknik Negeri Malang. It unifies the submission, advisory, and verification workflows for student academic and non-academic competition achievements.",
    features: [
      "Role-based access control (RBAC) supporting Students, Faculty Mentors, and Department Administrators",
      "Comprehensive Faculty portal for reviewing achievement evidence, audit trails, and official competition recommendations",
      "PROMETHEE II Decision Support System algorithm matching verified student competencies to national and international contests",
      "Automated generation of departmental accomplishment transcripts and student achievement portfolios"
    ],
    challenges: "Architecting relational database integrity across multi-tiered approval chains during high-volume end-of-semester certification deadlines.",
    solution: "Designed normalized MySQL schemas with transactional ACID guarantees, database indexing on approval state machines, and authenticated document storage."
  }
};
