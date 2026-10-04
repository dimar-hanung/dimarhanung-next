// Everything the SRS case study shows lives here, so real values can be
// dropped in without touching the layout. Keep copy public-safe: no internal
// rules, no production data, no numbers that have not been confirmed.

export type SrsMock = "dashboard" | "registration" | "record" | "report";

export interface SrsScreen {
  url: string;
  alt: string;
  // Set `image` to a real screenshot (e.g. "/project/srs/dashboard.webp",
  // dummy data only). Without it the stylised CSS mock named by `mock` is shown.
  image?: string;
  mock?: SrsMock;
}

export interface SrsFact {
  label: string;
  value: string;
}

export interface SrsMetric {
  value: string;
  label: string;
}

export interface SrsFeature {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  points: string[];
  screen: SrsScreen;
}

export interface SrsModule {
  id: string;
  label: string;
  track: string;
  icon: string;
  description: string;
  tags: string[];
}

export interface SrsStage {
  id: string;
  title: string;
  summary: string;
  highlights: string[];
}

export interface SrsStackItem {
  name: string;
  icon: string;
}

export interface SrsStackGroup {
  title: string;
  items: SrsStackItem[];
}

export const liveUrl = "https://srs5g.ut.ac.id";

export const hero = {
  kicker: "Case study · Universitas Terbuka",
  title: "Student Record System",
  generation: "Generation 5",
  pitch:
    "I work full-stack on SRS5G, the staff platform that manages student academic records at Universitas Terbuka, from enrollment through graduation, across every study program.",
  screen: {
    url: "srs5g.ut.ac.id/dashboard",
    alt: "Illustrative mock of the SRS5G staff dashboard with sample data",
    mock: "dashboard",
  } satisfies SrsScreen,
};

// Add confirmed facts here, e.g. { label: "Period", value: "2021 – present" }
// or { label: "Team", value: "4 engineers" }.
export const facts: SrsFact[] = [
  { label: "Role", value: "Full-stack developer" },
  { label: "Organization", value: "Universitas Terbuka" },
  { label: "Users", value: "University staff" },
  { label: "Stack", value: "Vue + NestJS" },
  { label: "Status", value: "In daily use" },
];

export const problem = {
  title: "Problem",
  body: "Universitas Terbuka is Indonesia's open and distance learning university. Staff have to keep student academic data accurate and coordinate registrations for undergraduate, graduate, and specialized programs, across each student's entire study journey.",
};

export const built = {
  title: "What I built",
  points: [
    "A Vue.js staff frontend with Vuex and Tailwind CSS, shipped as a Progressive Web App",
    "A NestJS and TypeORM backend on PostgreSQL and MySQL",
    "Background work on Redis and message queues",
    "Azure AD sign-in, real-time updates, and report generation",
    "Production monitoring with Sentry",
  ],
};

export const outcome = {
  title: "Outcome",
  points: [
    "Student academic data lives in one trusted system",
    "Registration, course enrollment, reporting, and graduation prep in one place",
    "In daily use by university staff",
    "Built for long-running enterprise operations",
  ],
};

// Confirmed impact numbers go here, e.g. { value: "40+", label: "Study programs" }.
// The metrics row stays hidden while this list is empty.
export const outcomeMetrics: SrsMetric[] = [];

export const features: SrsFeature[] = [
  {
    id: "registration",
    eyebrow: "Every term",
    title: "Registration & course enrollment",
    summary:
      "Staff capture and verify student identity and program choice, then coordinate course selection, schedules, and study formats each semester.",
    points: [
      "Personal data intake and validation",
      "Program and study-path assignment",
      "Semester-based course enrollment",
    ],
    screen: {
      url: "srs5g.ut.ac.id/registrasi",
      alt: "Illustrative mock of a course registration screen with sample data",
      mock: "registration",
    },
  },
  {
    id: "record",
    eyebrow: "Every program",
    title: "One record per student",
    summary:
      "While students study, their record stays current: profile changes, academic status, and supporting documents, whichever program they are in.",
    points: [
      "Ongoing profile maintenance",
      "Academic status tracking",
      "Undergraduate, graduate, and specialized programs",
    ],
    screen: {
      url: "srs5g.ut.ac.id/mahasiswa",
      alt: "Illustrative mock of a student record view with sample data",
      mock: "record",
    },
  },
  {
    id: "report",
    eyebrow: "Every milestone",
    title: "Results, reports & graduation",
    summary:
      "Exam results and academic progress feed back into the record, and staff generate documents and prepare graduation from the same data.",
    points: [
      "Grade and result management",
      "Document and report generation",
      "Graduation preparation and final checks",
    ],
    screen: {
      url: "srs5g.ut.ac.id/laporan",
      alt: "Illustrative mock of a report and graduation checklist with sample data",
      mock: "report",
    },
  },
];

export const modules: SrsModule[] = [
  {
    id: "undergrad",
    label: "Undergraduate & diploma",
    track: "Academic programs",
    icon: "mdi:book-open-page-variant-outline",
    description:
      "Core workflows for bachelor and diploma students: registration, course enrollment, personal data, and academic reporting.",
    tags: ["Registration", "Courses", "Reports"],
  },
  {
    id: "graduate",
    label: "Graduate studies",
    track: "Academic programs",
    icon: "mdi:school-outline",
    description:
      "Dedicated flows for postgraduate students, with data capture and validation suited to advanced programs.",
    tags: ["Postgraduate", "Validation"],
  },
  {
    id: "ppg",
    label: "Teacher certification",
    track: "Specialized track",
    icon: "mdi:certificate-outline",
    description:
      "A focused area for professional teacher education programs and their distinct record-keeping needs.",
    tags: ["PPG", "Professional"],
  },
  {
    id: "scholarship",
    label: "Scholarships",
    track: "Student support",
    icon: "mdi:hand-coin-outline",
    description:
      "Scholarship-related student information, managed alongside the main academic record.",
    tags: ["Financial aid"],
  },
  {
    id: "graduation",
    label: "Graduation",
    track: "Completion",
    icon: "mdi:trophy-outline",
    description:
      "Preparation as students approach graduation: clearance steps, ceremonies, and final checks.",
    tags: ["Ceremony", "Clearance"],
  },
  {
    id: "utilities",
    label: "Utilities",
    track: "Operations",
    icon: "mdi:cog-outline",
    description:
      "Account management, password resets, and operational helpers that keep the platform running for staff.",
    tags: ["Accounts", "Admin"],
  },
  {
    id: "master",
    label: "Master data",
    track: "Foundation",
    icon: "mdi:database-outline",
    description:
      "Reference data every other module depends on: programs, calendars, and shared lookups.",
    tags: ["Reference", "Config"],
  },
];

export const stages: SrsStage[] = [
  {
    id: "enroll",
    title: "Enroll",
    summary: "Identity, program choice, and profile data are captured and verified.",
    highlights: ["Personal data intake", "Study-path assignment", "Student accounts"],
  },
  {
    id: "register",
    title: "Register",
    summary: "Each term, courses, schedules, and study formats are coordinated.",
    highlights: ["Course enrollment", "Schedules and locations", "Varied study formats"],
  },
  {
    id: "study",
    title: "Study",
    summary: "The record stays current through status changes and academic events.",
    highlights: ["Profile maintenance", "Status tracking", "Documents and reports"],
  },
  {
    id: "assess",
    title: "Assess",
    summary: "Exams, scores, and progress checks feed back into the record.",
    highlights: ["Exam scheduling", "Grades and results", "Progress over terms"],
  },
  {
    id: "graduate",
    title: "Graduate",
    summary: "Staff prepare graduation steps and final academic clearance.",
    highlights: ["Graduation prep", "Final verification", "Ceremony support"],
  },
];

export const techStack: SrsStackGroup[] = [
  {
    title: "Frontend",
    items: [
      { name: "Vue.js", icon: "logos:vue" },
      { name: "Vuex", icon: "mdi:vuejs" },
      { name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
      { name: "Progressive Web App", icon: "logos:pwa" },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "NestJS", icon: "logos:nestjs" },
      { name: "TypeORM", icon: "logos:typeorm" },
      { name: "PostgreSQL & MySQL", icon: "logos:postgresql" },
      { name: "Redis & message queues", icon: "logos:redis" },
    ],
  },
  {
    title: "Platform",
    items: [
      { name: "Azure AD authentication", icon: "logos:microsoft-azure" },
      { name: "Real-time updates", icon: "mdi:lightning-bolt-outline" },
      { name: "Report generation", icon: "mdi:file-chart-outline" },
      { name: "Sentry monitoring", icon: "logos:sentry-icon" },
    ],
  },
];

// The real sign-in page, shown next to the "See the live system" call to action.
export const loginScreen: SrsScreen = {
  url: "srs5g.ut.ac.id",
  alt: "SRS5G sign-in page on srs5g.ut.ac.id",
  image: "/project/srs/banner.png",
};
