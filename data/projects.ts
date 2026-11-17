// One list for the /project page (components/home/project.vue) and the
// "Selected work" section on the home page.

// "backend" marks every project where I built the server side (all full-stack ones).
export type WorkCategory = "fullstack" | "frontend" | "backend" | "ai";

export interface Project {
  // Listing on /project (Indonesian descriptions, kept as they were).
  title: string;
  description: string;
  image: string;
  link?: string;
  detailPath?: string;
  tags: string[];
  contribution: number;
  complexity: number;
  // Only projects with `home` show in "Selected work", sorted by `order`.
  home?: {
    order: number;
    title: string;
    role: "Full-stack" | "Front-end";
    stack: string[];
    categories: WorkCategory[];
    description: { en: string; id: string };
    // false hides the live-site domain (e.g. a dev URL).
    showLink: boolean;
  };
}

export const projects: Project[] = [
  {
    title: "Student Record System (SRS)",
    description:
      "Adalah sebuah aplikasi berbasis web yang digunakan untuk mengelola data mahasiswa.",
    image: "/home/project/srs.png",
    link: "https://srs5g.ut.ac.id",
    detailPath: "/project/srs",
    tags: ["Full-Stack", "Vue", "TailwindCSS"],
    contribution: 5,
    complexity: 5,
    home: {
      order: 4,
      title: "Student Record System",
      role: "Full-stack",
      stack: ["Vue", "Tailwind"],
      categories: ["fullstack", "backend"],
      description: {
        en: "Manages student records across the university, from enrolment to graduation.",
        id: "Mengelola data mahasiswa satu universitas, dari pendaftaran sampai lulus.",
      },
      showLink: true,
    },
  },
  {
    title: "Sistem Informasi Akademik (SIA)",
    description:
      "Portal pendaftaran mahasiswa baru Universitas Terbuka: daftar, pilih program, unggah berkas.",
    image: "/home/project/sia.png",
    link: "https://admisi-sia.ut.ac.id",
    detailPath: "/project/admisi-ut",
    tags: ["Full-Stack", "Vue", "Nest.js"],
    contribution: 5,
    complexity: 5,
    home: {
      order: 2,
      title: "SIA Admissions",
      role: "Full-stack",
      stack: ["Vue", "NestJS"],
      categories: ["fullstack", "backend"],
      description: {
        en: "New-student admissions: sign up, choose a program and upload documents, all online.",
        id: "Pendaftaran mahasiswa baru: daftar, pilih program studi, dan upload berkas secara online.",
      },
      showLink: true,
    },
  },
  {
    title: "My UT",
    description:
      "Portal akademik mahasiswa Universitas Terbuka: registrasi, pembayaran, modul, ujian, dan e-KTM.",
    image: "/home/project/myut.png",
    link: "https://myut.ut.ac.id",
    detailPath: "/project/myut",
    tags: ["Full-Stack", "Vue", "Nest.js"],
    contribution: 5,
    complexity: 5,
    home: {
      order: 1,
      title: "My UT",
      role: "Full-stack",
      stack: ["Vue", "NestJS", "PostgreSQL"],
      categories: ["fullstack", "backend"],
      description: {
        en: "Academic portal for students: registration, payments, course modules, exams and a digital student ID.",
        id: "Portal akademik mahasiswa: registrasi, pembayaran, modul kuliah, ujian, dan e-KTM.",
      },
      showLink: true,
    },
  },
  {
    title: "App UT (Portal)",
    description:
      "Adalah sebuah aplikasi berbasis mobile yang digunakan untuk mengelola data karyawan.",
    image: "/home/project/apput.png",
    // link: "https://example.com",
    tags: ["Front-End", "Vue"],
    contribution: 5,
    complexity: 2,
  },
  {
    title: "Sistem Survey Pelanggan (Si Supel)",
    description:
      "Adalah sebuah aplikasi berbasis web yang digunakan untuk mengelola data survey pelanggan.",
    image: "/home/project/sisupel.png",
    link: "https://sisupel.ut.ac.id",
    tags: ["Front-End", "Vue", "TailwindCSS"],
    contribution: 5,
    complexity: 4,
    home: {
      order: 5,
      title: "Si Supel",
      role: "Front-end",
      stack: ["Vue", "Tailwind"],
      categories: ["frontend"],
      description: {
        en: "Customer survey platform: build surveys, collect answers and read the results.",
        id: "Platform survei pelanggan: buat survei, kumpulkan jawaban, lalu baca hasilnya.",
      },
      showLink: true,
    },
  },
  {
    title: "Human Resource Information System (HRIS)",
    description:
      "Adalah sebuah aplikasi berbasis mobile yang digunakan untuk mengelola data karyawan.",
    image: "/home/project/hris.png",
    link: "https://hris.ut.ac.id",
    tags: ["Full-Stack", "Vue"],
    contribution: 3,
    complexity: 5,
    home: {
      order: 6,
      title: "HRIS",
      role: "Full-stack",
      stack: ["Vue"],
      categories: ["fullstack", "backend"],
      description: {
        en: "Employee data and HR workflows for university staff.",
        id: "Data karyawan dan alur kerja HR untuk staf universitas.",
      },
      showLink: true,
    },
  },
  {
    title: "AI Tutor E-Learning",
    description:
      "Adalah sebuah aplikasi berbasis mobile yang digunakan untuk mengelola data karyawan.",
    image: "/home/project/aitutor.png",
    link: "https://aitutor.dev.ut.web.id/",
    tags: ["Full-Stack", "Vue"],
    contribution: 5,
    complexity: 5,
    home: {
      order: 3,
      title: "AI Tutor E-Learning",
      role: "Full-stack",
      stack: ["Vue", "AI"],
      categories: ["fullstack", "backend", "ai"],
      description: {
        en: "An AI tutor that helps students learn inside their own course material.",
        id: "Tutor AI yang membantu mahasiswa belajar langsung dari materi kuliahnya.",
      },
      // The live link is a dev URL; the mockup shows no domain for it.
      showLink: false,
    },
  },
];
