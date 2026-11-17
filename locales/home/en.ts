// English copy for the home page (/). The Indonesian twin is ./id.ts and must
// keep the same shape.

import type { HomeThemeId } from "~/data/home-themes";

// Inquiry form budget options and the starting price under "How I can help".
const budgets = ["$20-60", "$60-300", "$300-600", "$600+", "Not sure yet"];
const startingPrice = "Projects start from about $20.";

export type NeedKey = "web" | "ai" | "frontend" | "other";

// Name and one line per theme in the theme picker (data/home-themes.ts).
interface ThemeCopy {
  name: string;
  description: string;
}

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
      "I build web apps fast with AI, and they hold up in production. 6+ years of experience, from first idea to a stable release.",
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
    lead: "Strong fundamentals and a safe way of working with AI: I pick up whatever stack your product needs and take it from first idea to a stable release.",
    discuss: "Discuss your project",
    seeWork: "See my work",
    downloadCv: "Download CV",
    location: "Tangerang Selatan · WIB (UTC+7)",
    remote: "Remote, worldwide",
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
  themes: {
    title: "Change the look of this page",
    sub: "Ten complete designs for this same page. I researched and built each one with AI, then checked and edited it by hand. Your pick is saved for your next visit.",
    listLabel: "Themes",
    current: (name: string, description: string) => `Now showing ${name}. ${description}`,
    items: {
      modern: { name: "Modern", description: "Clean sans-serif, soft rounded panels and one rose accent. The default." },
      brutalist: { name: "Brutalist", description: "Raw structure: mono type, heavy black borders, no polish." },
      cartoon: {
        name: "Cartoon",
        description: "Thick outlines, flat bright fills and bouncy shapes, like a Sunday-morning cartoon.",
      },
      ancient: { name: "Illuminated", description: "An illuminated manuscript: vellum, gilded initials, blackletter." },
      terminal: { name: "Terminal", description: "Green phosphor on a CRT, everything in monospace." },
      swiss: {
        name: "Swiss",
        description: "International Typographic Style: a strict grid, grotesk type, red and black.",
      },
      newspaper: { name: "Broadsheet", description: "A broadsheet front page: serif headlines, columns and rules." },
      "retro-os": {
        name: "Retro desktop",
        description: "A late-90s desktop: bevelled grey windows, title bars, teal wallpaper.",
      },
      pixel: { name: "Pixel", description: "8-bit arcade: pixel type, chunky blocks, a small palette." },
      lab: {
        name: "Future Gadget Lab",
        description: "The lab from Steins;Gate: nixie tubes, worn notebooks, divergence readouts.",
      },
    } satisfies Record<HomeThemeId, ThemeCopy>,
    // Copy for a theme's slot components (pages/(home)/components/themes/<id>/).
    // Each theme owns its block; add the same keys to id.ts.
    extras: {
      // ---- theme: modern ----
      modern: {},

      // ---- theme: brutalist ----
      brutalist: {},

      // ---- theme: cartoon ----
      cartoon: {},

      // ---- theme: ancient ----
      ancient: {},

      // ---- theme: terminal ----
      terminal: {},

      // ---- theme: swiss ----
      swiss: {},

      // ---- theme: newspaper ----
      newspaper: {},

      // ---- theme: retro-os ----
      "retro-os": {},

      // ---- theme: pixel ----
      pixel: {},

      // ---- theme: lab ----
      // The sign-off under the footer (themes/lab/page-end.vue). A line from
      // the show, so it stays the same in both languages.
      lab: { signoff: "El Psy Kongroo." },
    },
  },
  work: {
    title: "Selected work",
    sub: "Systems I designed and built end to end, now running for thousands of students and staff.",
    filters: {
      all: "All",
      fullstack: "Full-stack",
      frontend: "Front-end",
      backend: "Back-end",
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
          "Frontend, backend and database, in the stack that fits your team",
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
  contact: {
    title: "Have a project in mind?",
    lead: `Tell me what you're building. I reply within one working day with questions or a first plan, and the first call is free.`,
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
