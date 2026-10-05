// Everything the Admisi UT case study shows lives here, so real values can be
// dropped in without touching the layout. Keep copy public-safe: no admission
// rules, no applicant data, no numbers that have not been confirmed.

export type AdmisiMock = "overview" | "register" | "billing" | "forms" | "documents";

export interface AdmisiScreen {
  url: string;
  alt: string;
  // Set `image` to a real screenshot (e.g. "/project/admisi-ut/billing.webp",
  // dummy data only). Without it the stylised CSS mock named by `mock` is shown.
  image?: string;
  mock?: AdmisiMock;
}

// One illustration slot. Every illustration on this page comes from the same
// IconScout pack (see `illustrationCredit`), recoloured to the page palette.
// An empty `alt` marks the art as decorative; width and height are the SVG's
// aspect ratio so the slot reserves its space before the file loads.
export interface AdmisiIllustration {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface AdmisiFact {
  label: string;
  value: string;
}

export interface AdmisiMetric {
  value: string;
  label: string;
}

export interface AdmisiFeature {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  points: string[];
  screen: AdmisiScreen;
}

export interface AdmisiCounter {
  id: string;
  title: string;
  icon: string;
  summary: string;
}

export interface AdmisiApplicant {
  id: string;
  name: string;
  tag: string;
  icon: string;
  text: string;
  route: string;
}

export interface AdmisiStackItem {
  name: string;
  icon: string;
}

export interface AdmisiStackGroup {
  title: string;
  items: AdmisiStackItem[];
}

export const liveUrl = "https://admisi-sia.ut.ac.id";

export const hero = {
  kicker: "Case study · New-student admission",
  title: "Admisi UT",
  subtitle: "SIA Admission Portal",
  pitch:
    "I work full-stack on Admisi UT, the front door of Universitas Terbuka. New students register, clear the admission bill, pick a study program and upload their documents here, all before their first semester begins.",
  screen: {
    url: "admisi-sia.ut.ac.id/beranda",
    alt: "Illustrative mock of the Admisi UT applicant home with an onboarding checklist and sample data",
    mock: "overview",
  } satisfies AdmisiScreen,
};

// Add confirmed facts here, e.g. { label: "Period", value: "2022 – present" }
// or { label: "Team", value: "3 engineers" }.
export const facts: AdmisiFact[] = [
  { label: "Role", value: "Full-stack developer" },
  { label: "Organization", value: "Universitas Terbuka" },
  { label: "Users", value: "New-student applicants" },
  { label: "Stack", value: "Vue 2.7 · PWA" },
  { label: "Status", value: "Live every admission season" },
];

export const illustrationCredit = {
  contributor: "Roundsquid",
  url: "https://iconscout.com/illustration-pack/university-79",
};

export const problem = {
  title: "Problem",
  illustration: {
    src: "/project/admisi-ut/admission-notice-board.svg",
    alt: "",
    width: 271,
    height: 245,
  } satisfies AdmisiIllustration,
  body: "Universitas Terbuka is Indonesia's open and distance university, so admission happens online. Before someone can study, they have to register, settle the admission bill, fill in their data, choose a study program and upload documents, and they need to see at every step what is done and what comes next.",
};

export const built = {
  title: "What I built",
  illustration: {
    src: "/project/admisi-ut/online-registration-laptop.svg",
    alt: "",
    width: 271,
    height: 240,
  } satisfies AdmisiIllustration,
  points: [
    "A Vue 2.7 applicant frontend with Vuex and Tailwind CSS, shipped as a Progressive Web App",
    "Account registration with email verification",
    "An admission invoice with a clear payment status",
    "Guided forms for personal data, contact details and study-program choice",
    "Document upload and review, including credit-transfer files",
  ],
};

export const outcome = {
  title: "Outcome",
  illustration: {
    src: "/project/admisi-ut/arrival-university-gate.svg",
    alt: "",
    width: 263,
    height: 243,
  } satisfies AdmisiIllustration,
  points: [
    "One online path from first sign-up to a student number",
    "Applicants can see which step is done and which comes next",
    "The finish line hands new students over to the student portal",
    "Live and welcoming new students every admission season",
  ],
};

// Confirmed impact numbers go here, e.g. { value: "100k+", label: "Applicants per year" }.
// The metrics row stays hidden while this list is empty.
export const outcomeMetrics: AdmisiMetric[] = [];

export const features: AdmisiFeature[] = [
  {
    id: "register",
    eyebrow: "Sign up",
    title: "Registration with email verification",
    summary:
      "An applicant starts with a short sign-up form. The account only opens once the email address is confirmed, so every later step reaches the right person.",
    points: [
      "Short sign-up form for new applicants",
      "Activation link sent by email",
      "Resend the link when it has expired",
    ],
    screen: {
      url: "admisi-sia.ut.ac.id/daftar",
      alt: "Illustrative mock of the sign-up form and the email verification notice with sample data",
      mock: "register",
    },
  },
  {
    id: "billing",
    eyebrow: "Admission bill",
    title: "An invoice with a clear status",
    summary:
      "The admission bill sits on its own page with its payment status, so applicants know whether they can carry on with onboarding.",
    points: [
      "Invoice details in one place",
      "Payment status from issued to verified",
      "Onboarding continues once the bill is settled",
    ],
    screen: {
      url: "admisi-sia.ut.ac.id/tagihan",
      alt: "Illustrative mock of the admission invoice and its payment status with sample data",
      mock: "billing",
    },
  },
  {
    id: "forms",
    eyebrow: "Onboarding",
    title: "Guided forms, one step at a time",
    summary:
      "Personal data, contact details and the study-program choice are split into short steps, with a progress rail that always shows where the applicant is.",
    points: [
      "Personal and contact details",
      "Study-program choice",
      "Progress rail across every step",
    ],
    screen: {
      url: "admisi-sia.ut.ac.id/program-studi",
      alt: "Illustrative mock of the study-program step of the onboarding form with sample data",
      mock: "forms",
    },
  },
  {
    id: "documents",
    eyebrow: "Documents",
    title: "Upload and review in one list",
    summary:
      "Applicants upload the required files and follow each one's review status, including files for credit transfer.",
    points: [
      "Upload for each required document",
      "Review status per file",
      "Credit-transfer files alongside the rest",
    ],
    screen: {
      url: "admisi-sia.ut.ac.id/dokumen",
      alt: "Illustrative mock of the document upload list with review statuses and sample data",
      mock: "documents",
    },
  },
];

// The admission journey, shown as the six counters of an admission lobby.
export const counters: AdmisiCounter[] = [
  {
    id: "register",
    title: "Register",
    icon: "mdi:account-plus-outline",
    summary: "Create an account and confirm the email address.",
  },
  {
    id: "bill",
    title: "Admission bill",
    icon: "mdi:receipt-text-outline",
    summary: "See the admission invoice and its payment status.",
  },
  {
    id: "personal",
    title: "Personal data",
    icon: "mdi:card-account-details-outline",
    summary: "Fill in identity and contact details in guided forms.",
  },
  {
    id: "program",
    title: "Study program",
    icon: "mdi:school-outline",
    summary: "Choose the program to study.",
  },
  {
    id: "documents",
    title: "Documents",
    icon: "mdi:file-upload-outline",
    summary: "Upload the required files and follow their review.",
  },
  {
    id: "student-number",
    title: "Student number",
    icon: "mdi:badge-account-outline",
    summary: "Receive a student number and move on to the student portal.",
  },
];

export const journeyIllustration: AdmisiIllustration = {
  src: "/project/admisi-ut/documents-folder.svg",
  alt: "Illustration of a student walking to a notice board with a folder of documents",
  width: 263,
  height: 237,
};

export const applicants: AdmisiApplicant[] = [
  {
    id: "fresh",
    name: "Fresh applicant",
    tag: "First degree",
    icon: "mdi:account-school-outline",
    text: "Starting fresh after school, this applicant visits every counter once, from sign-up to student number.",
    route: "All six counters, first to last",
  },
  {
    id: "credit-transfer",
    name: "Credit transfer",
    tag: "Recognised prior learning",
    icon: "mdi:folder-account-outline",
    text: "Brings earlier coursework or work experience. An extra evaluation looks at what can carry over.",
    route: "The six counters, plus a prior-learning evaluation",
  },
  {
    id: "teacher",
    name: "Teacher track",
    tag: "Teacher programs",
    icon: "mdi:human-male-board",
    text: "Answers a few extra questions about where and what they teach, so the program can support them.",
    route: "The six counters, plus a teaching-context form",
  },
  {
    id: "support",
    name: "Disability support",
    tag: "Assisted study",
    icon: "mdi:hand-heart-outline",
    text: "An optional form asks what support makes studying workable, so it can be arranged before the term starts.",
    route: "The six counters, plus a support-needs form",
  },
];

export const techStack: AdmisiStackGroup[] = [
  {
    title: "Frontend",
    items: [
      { name: "Vue.js 2.7 LTS", icon: "logos:vue" },
      { name: "Vuex", icon: "mdi:vuejs" },
      { name: "Vue Router", icon: "mdi:routes" },
      { name: "Tailwind CSS & SASS", icon: "logos:tailwindcss-icon" },
    ],
  },
  {
    title: "Platform",
    items: [
      { name: "Progressive Web App", icon: "logos:pwa" },
      { name: "Axios", icon: "mdi:api" },
      { name: "Sentry monitoring", icon: "logos:sentry-icon" },
      { name: "NestJS backend", icon: "logos:nestjs" },
    ],
  },
];

// The real sign-in page, shown next to the footer call to action.
export const loginScreen: AdmisiScreen = {
  url: "admisi-sia.ut.ac.id",
  alt: "Admisi UT sign-in page on admisi-sia.ut.ac.id",
  image: "/project/admisi-ut/banner.png",
};

// Closes the story with a new student on campus, next to the footer call to action.
export const footerIllustration: AdmisiIllustration = {
  src: "/project/admisi-ut/new-student-backpack.svg",
  alt: "Illustration of a new student with a backpack waving in front of a campus building",
  width: 271,
  height: 245,
};
