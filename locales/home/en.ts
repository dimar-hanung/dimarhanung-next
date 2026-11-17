// English copy for the home page (/). The Indonesian twin is ./id.ts and must
// keep the same shape.

// Update each quarter: the month new projects can start.
const availableFrom = "January 2027";

// Inquiry form budget options and the starting price under "How I can help".
const budgets = ["$20-60", "$60-300", "$300-600", "$600+", "Not sure yet"];
const startingPrice = "Projects start from about $20.";

export type NeedKey = "web" | "ai" | "frontend" | "other";

export interface WhatsAppFields {
  name: string;
  email: string;
  need: string;
  budget: string;
  message: string;
}

const en = {
  seo: {
    title: "Dimar Hanung | Freelance Software Engineer",
    description:
      "I build web apps fast with AI, and they hold up in production. 6+ years of experience, including the portals Universitas Terbuka students use every day. Booking new projects from " +
      availableFrom +
      ".",
    ogLocale: "en_US",
  },
  nav: {
    home: "Dimar Hanung, home",
    work: "Work",
    services: "Services",
    process: "How I work",
    blog: "Blog",
    contact: "Contact",
    language: "Language",
    english: "English",
    indonesian: "Bahasa Indonesia",
  },
  hero: {
    intro: "Dimar Hanung · Software Engineer, 6+ years",
    role: "Software Engineer, 6+ years",
    titleStart: "I ship web apps fast with AI,",
    titleAccent: "and they hold up in production.",
    lead: "I built the portals Universitas Terbuka students use every day: My UT, admissions and the student record system. I can do the same for your product, from first idea to a stable release.",
    discuss: "Discuss your project",
    seeWork: "See my work",
    downloadCv: "Download CV",
    availability: `Booking new projects from ${availableFrom}. I reply within one working day.`,
    location: "Tangerang Selatan · WIB (UTC+7)",
    remote: "Remote, worldwide",
    stack: "Vue · Nuxt · NestJS · PostgreSQL",
    caption:
      "Software Engineer at Universitas Terbuka. Based in Tangerang Selatan, working remote.",
    photoToggle: "Show my real photo",
    proof: [
      { value: "6+ yrs", label: "shipping production software" },
      { value: "7", label: "systems built for Universitas Terbuka" },
      { value: "15+", label: "work & personal projects" },
      { value: "3 kyu", label: "Codewars rank" },
    ],
  },
  work: {
    title: "Selected work",
    sub: "Systems I designed and built end to end, now running for thousands of students and staff.",
    filters: {
      all: "All",
      fullstack: "Full-stack",
      frontend: "Front-end",
      ai: "AI",
    },
    filterLabel: "Filter projects",
    caseStudy: "Case study",
    screenshotAlt: (title: string) => `${title} screenshot`,
    seeAll: "See all 15+ projects",
  },
  services: {
    title: "How I can help",
    sub: "Three ways teams usually work with me. Not sure which fits? Describe the problem and I'll suggest one.",
    startingPrice,
    timelineLabel: "Typical timeline",
    ask: "Ask about this",
    items: [
      {
        need: "web" as NeedKey,
        title: "New web app, end to end",
        body: "From idea to a deployed product: frontend, backend, database and the admin side.",
        points: [
          "Vue / Nuxt frontend, NestJS + PostgreSQL backend",
          "Login, roles, payments, file uploads",
          "Deployed, monitored and documented",
        ],
        timeline: "4–8 weeks",
      },
      {
        need: "ai" as NeedKey,
        title: "AI prototype → real product",
        body: "You have a vibe-coded MVP that works on a good day. I make it survive real users.",
        points: [
          "Clean structure you can keep building on",
          "Tests, error handling and security basics",
          "AI features that stay fast and affordable",
        ],
        timeline: "2–4 weeks",
      },
      {
        need: "frontend" as NeedKey,
        title: "Frontend that feels right",
        body: "Redesign or speed up an existing interface, down to the small details users notice.",
        points: [
          "Faster pages and smoother interactions",
          "Accessible, responsive, consistent UI",
          "A component library your team can reuse",
        ],
        timeline: "1–3 weeks",
      },
    ],
  },
  process: {
    title: "How we'd work together",
    steps: [
      {
        title: "30-minute intro call",
        body: "Free. We talk about the problem and the deadline, not the tech.",
      },
      {
        title: "Written plan & estimate",
        body: "Scope, price and milestones in writing within two days.",
      },
      {
        title: "A demo every week",
        body: "A link you can click, not a status report. AI speed, reviewed by me.",
      },
      {
        title: "Handover, no lock-in",
        body: "Code, docs and a walkthrough, so your team can carry it on.",
      },
    ],
  },
  stack: {
    title: "Tools I ship with",
    note: "I adapt to the stack the project needs, not the other way around.",
    groups: {
      frontend: "Frontend",
      backend: "Backend & Data",
      ai: "AI & Tooling",
    },
  },
  contact: {
    title: "Have a project in mind?",
    lead: `Tell me what you're building. I reply within one working day with questions or a first plan. The first call is free, and I'm booking new projects from ${availableFrom}.`,
    emailLabel: "Email",
    copyEmail: "Copy email",
    copied: "Copied",
    localTime: (time: string) => `It's ${time} in Tangerang Selatan (WIB)`,
    localTimeFallback: "Tangerang Selatan, Indonesia (WIB)",
    introCall: "Free 30-minute intro call",
    nda: "NDA on request",
  },
  form: {
    title: "Send a project inquiry",
    subtitle: "Takes about a minute.",
    name: "Your name",
    namePlaceholder: "Jane Doe",
    nameError: "Please add your name.",
    email: "Email",
    emailPlaceholder: "jane@company.com",
    emailError: "That email doesn't look right.",
    need: "What do you need?",
    needs: {
      web: "New web app",
      ai: "AI prototype → product",
      frontend: "Frontend polish",
      other: "Something else",
    } as Record<NeedKey, string>,
    needError: "Pick one so I know where to start.",
    budget: "Budget",
    optional: "(optional)",
    budgets,
    message: "About the project",
    messagePlaceholder: "What are you building, and what does done look like?",
    messageError: "A sentence or two helps me reply with something useful.",
    submit: "Send via WhatsApp",
    note: "Opens WhatsApp with your message filled in.",
    thanks: (name: string) => `Thanks, ${name}!`,
    sent: "WhatsApp has your message ready. Press send there, and I'll reply within one working day.",
    summaryNeed: "Need",
    summaryBudget: "Budget",
    summaryReply: "Reply to",
    summaryNone: "Not given",
    openAgain: "WhatsApp didn't open? Open it again",
    again: "Send another",
    whatsappMessage: (f: WhatsAppFields) =>
      `Hi Dimar, I'm ${f.name} (${f.email}).\n\nNeed: ${f.need}\nBudget: ${f.budget}\n\n${f.message}`,
  },
  more: {
    title: "Beyond client work",
    items: [
      { source: "Codewars · SoloLearn", title: "Challenges", count: "3 kyu", to: "/challenges" },
      { source: "Achievements", title: "Certificates", count: "12+", to: "/certificates/gallery" },
      { source: "Frontend Mentor", title: "UI challenges", count: "10+", to: "/challenges/ui-general" },
      // No /fun-stuff index page yet, so this one is not a link.
      { source: "Experiments", title: "Fun stuff", count: "10+", to: "" },
    ],
  },
  footer: {
    siteLabel: "On this site",
    socialLabel: "Elsewhere",
    site: {
      projects: "Projects",
      blog: "Blog",
      tools: "Tools",
      certificates: "Certificates",
      challenges: "Challenges",
    },
    builtWith: "Built with Nuxt and Tailwind CSS.",
    source: "Source on GitHub",
    backToTop: "Back to top",
  },
  mobileBar: {
    note: "Replies within a day",
    cta: "Discuss your project",
  },
};

export type HomeMessages = typeof en;

export default en;
