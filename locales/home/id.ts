// Indonesian copy for the home page (/id). Same shape as ./en.ts.
// Voice: saya/Anda, no em/en dashes.
import type { HomeMessages, NeedKey, WhatsAppFields } from "./en";

// Inquiry form budget options and the starting price under "Yang bisa saya bantu".
const budgets = ["Rp300 rb-1 jt", "Rp1-5 jt", "Rp5-10 jt", "Di atas Rp10 jt", "Belum tahu"];
const startingPrice = "Proyek mulai dari Rp300 rb.";

const id: HomeMessages = {
  seo: {
    title: "Dimar Hanung | Software Engineer Freelance",
    description:
      "Saya membangun aplikasi web dengan cepat berkat AI, dan tetap stabil di production. Pengalaman 6+ tahun, dari ide awal sampai rilis yang stabil.",
    ogLocale: "id_ID",
  },
  nav: {
    home: "Dimar Hanung, beranda",
    work: "Proyek",
    services: "Layanan",
    process: "Cara kerja",
    blog: "Blog",
    contact: "Kontak",
    language: "Bahasa",
    english: "English",
    indonesian: "Bahasa Indonesia",
  },
  hero: {
    intro: "Dimar Hanung · Software Engineer, 6+ tahun",
    role: "Software Engineer, 6+ tahun",
    titleStart: "Aplikasi web selesai cepat dengan AI,",
    titleAccent: "tetap stabil saat dipakai ribuan orang.",
    lead: "Fondasi yang kuat dan cara pakai AI yang aman: saya bisa langsung bekerja dengan stack apa pun yang dipakai produk Anda, dari ide awal sampai rilis yang stabil.",
    discuss: "Diskusikan proyek Anda",
    seeWork: "Lihat proyek",
    downloadCv: "Unduh CV",
    location: "Tangerang Selatan · WIB (UTC+7)",
    remote: "Remote, dari mana saja",
    caption:
      "Software Engineer di Universitas Terbuka. Tinggal di Tangerang Selatan, bekerja remote.",
    photoToggle: "Tampilkan foto asli saya",
    proof: [
      { value: "6+ tahun", label: "merilis software ke production" },
      { value: "7", label: "sistem untuk Universitas Terbuka" },
      { value: "15+", label: "proyek kerja dan pribadi" },
      { value: "3 kyu", label: "peringkat Codewars" },
    ],
  },
  themes: {
    title: "Ganti tampilan halaman ini",
    sub: "Sepuluh desain lengkap untuk halaman yang sama. Saya riset dan bangun tiap desain bersama AI, lalu saya periksa dan rapikan sendiri. Pilihan Anda tersimpan untuk kunjungan berikutnya.",
    listLabel: "Tema",
    current: (name: string, description: string) => `Sekarang: ${name}. ${description}`,
    items: {
      modern: {
        name: "Modern",
        description: "Huruf sans-serif yang bersih, panel bersudut lembut, satu warna aksen. Tampilan bawaan.",
      },
      brutalist: { name: "Brutalis", description: "Struktur mentah: huruf mono, garis hitam tebal, tanpa poles." },
      cartoon: {
        name: "Kartun",
        description: "Garis tepi tebal, warna cerah yang rata, bentuk membulat seperti kartun Minggu pagi.",
      },
      ancient: {
        name: "Manuskrip",
        description: "Naskah kuno beriluminasi: kertas vellum, huruf awal berlapis emas, huruf gotik.",
      },
      terminal: { name: "Terminal", description: "Fosfor hijau di layar CRT, semua teks monospace." },
      swiss: {
        name: "Swiss",
        description: "Gaya Tipografi Internasional: grid ketat, huruf grotesk, merah dan hitam.",
      },
      newspaper: { name: "Koran", description: "Halaman depan koran: judul serif, kolom, dan garis pemisah." },
      "retro-os": {
        name: "Desktop jadul",
        description: "Desktop akhir 90-an: jendela abu-abu bertepi timbul, title bar, wallpaper hijau toska.",
      },
      pixel: { name: "Piksel", description: "Arkade 8-bit: font piksel, blok kotak besar, palet warna terbatas." },
      lab: {
        name: "Lab Gadget Masa Depan",
        description: "Lab dari Steins;Gate: tabung nixie, buku catatan lusuh, angka divergence meter.",
      },
    },
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
    title: "Proyek pilihan",
    sub: "Sistem yang saya rancang dan bangun dari awal sampai akhir, kini dipakai ribuan mahasiswa dan staf.",
    filters: {
      all: "Semua",
      fullstack: "Full-stack",
      frontend: "Front-end",
      backend: "Back-end",
      ai: "AI",
    },
    filterLabel: "Filter proyek",
    caseStudy: "Studi kasus",
    screenshotAlt: (title: string) => `Tampilan ${title}`,
    seeAll: "Lihat semua 15+ proyek",
  },
  services: {
    title: "Yang bisa saya bantu",
    sub: "Tiga cara tim biasanya bekerja dengan saya. Belum yakin yang mana? Ceritakan masalahnya, nanti saya sarankan.",
    startingPrice,
    timelineLabel: "Perkiraan waktu",
    ask: "Tanya soal ini",
    items: [
      {
        need: "web" as NeedKey,
        title: "Aplikasi web baru, dari nol",
        body: "Dari ide sampai produk yang sudah online: frontend, backend, database, dan halaman admin.",
        points: [
          "Frontend, backend, dan database, dengan stack yang cocok untuk tim Anda",
          "Login, role, pembayaran, upload file",
          "Sudah deploy, dipantau, dan terdokumentasi",
        ],
        timeline: "4-8 minggu",
      },
      {
        need: "ai" as NeedKey,
        title: "Prototipe AI → produk sungguhan",
        body: "Anda punya MVP hasil vibe coding yang kadang jalan, kadang tidak. Saya rapikan supaya tahan dipakai pengguna sungguhan.",
        points: [
          "Struktur rapi yang bisa terus dikembangkan",
          "Test, penanganan error, dan dasar keamanan",
          "Fitur AI yang tetap cepat dan hemat biaya",
        ],
        timeline: "2-4 minggu",
      },
      {
        need: "frontend" as NeedKey,
        title: "Frontend yang terasa pas",
        body: "Desain ulang atau percepat tampilan yang sudah ada, sampai ke detail kecil yang diperhatikan pengguna.",
        points: [
          "Halaman lebih cepat, interaksi lebih mulus",
          "UI yang aksesibel, responsif, dan konsisten",
          "Library komponen yang bisa dipakai ulang tim Anda",
        ],
        timeline: "1-3 minggu",
      },
    ],
  },
  process: {
    title: "Cara kita bekerja sama",
    steps: [
      {
        title: "Obrolan awal 30 menit",
        body: "Gratis. Kita bahas masalah dan tenggatnya, bukan teknologinya.",
      },
      {
        title: "Rencana dan estimasi tertulis",
        body: "Lingkup, harga, dan milestone tertulis dalam dua hari.",
      },
      {
        title: "Demo setiap minggu",
        body: "Link yang bisa langsung dicoba, bukan laporan status. Cepat berkat AI, tetap saya review.",
      },
      {
        title: "Serah terima, tanpa ketergantungan",
        body: "Kode, dokumentasi, dan walkthrough, supaya tim Anda bisa melanjutkan sendiri.",
      },
    ],
  },
  contact: {
    title: "Punya proyek yang ingin dibangun?",
    lead: `Ceritakan apa yang sedang Anda bangun. Saya balas dalam satu hari kerja dengan pertanyaan atau rencana awal, dan obrolan pertama gratis.`,
    emailLabel: "Email",
    copyEmail: "Salin email",
    copied: "Tersalin",
    localTime: (time: string) => `Pukul ${time.replace(":", ".")} di Tangerang Selatan (WIB)`,
    localTimeFallback: "Tangerang Selatan, Indonesia (WIB)",
    introCall: "Obrolan awal 30 menit, gratis",
    nda: "NDA bila diperlukan",
  },
  form: {
    title: "Ceritakan proyek Anda",
    subtitle: "Cukup satu menit.",
    name: "Nama",
    namePlaceholder: "Budi Santoso",
    nameError: "Isi nama Anda.",
    email: "Email",
    emailPlaceholder: "budi@perusahaan.com",
    emailError: "Format email salah.",
    need: "Apa yang Anda butuhkan?",
    needs: {
      web: "Aplikasi web baru",
      ai: "Prototipe AI → produk",
      frontend: "Rapikan frontend",
      other: "Lainnya",
    },
    needError: "Pilih satu supaya saya tahu harus mulai dari mana.",
    budget: "Anggaran",
    optional: "(opsional)",
    budgets,
    message: "Tentang proyek",
    messagePlaceholder: "Apa yang sedang Anda bangun, dan seperti apa hasil akhirnya?",
    messageError: "Satu atau dua kalimat sudah cukup supaya balasan saya berguna.",
    submit: "Kirim lewat WhatsApp",
    note: "WhatsApp akan terbuka dengan pesan yang sudah terisi.",
    thanks: (name: string) => `Terima kasih, ${name}!`,
    sent: "Pesan Anda sudah siap di WhatsApp. Tekan kirim di sana, nanti saya balas dalam satu hari kerja.",
    summaryNeed: "Kebutuhan",
    summaryBudget: "Anggaran",
    summaryReply: "Balas ke",
    summaryNone: "Tidak diisi",
    openAgain: "WhatsApp tidak terbuka? Buka lagi",
    again: "Kirim lagi",
    whatsappMessage: (f: WhatsAppFields) =>
      `Halo Dimar, saya ${f.name} (${f.email}).\n\nKebutuhan: ${f.need}\nAnggaran: ${f.budget}\n\n${f.message}`,
  },
  more: {
    title: "Di luar pekerjaan klien",
    items: [
      { source: "Codewars · SoloLearn", title: "Tantangan", count: "3 kyu", to: "/challenges" },
      { source: "Pencapaian", title: "Sertifikat", count: "12+", to: "/certificates/gallery" },
      { source: "Frontend Mentor", title: "Tantangan UI", count: "10+", to: "/challenges/ui-general" },
      { source: "Eksperimen", title: "Fun stuff", count: "10+", to: "" },
    ],
  },
  footer: {
    siteLabel: "Di situs ini",
    socialLabel: "Di tempat lain",
    site: {
      projects: "Proyek",
      blog: "Blog",
      tools: "Tools",
      certificates: "Sertifikat",
      challenges: "Tantangan",
    },
    builtWith: "Dibuat dengan Nuxt dan Tailwind CSS.",
    source: "Kode sumber di GitHub",
    backToTop: "Kembali ke atas",
  },
  mobileBar: {
    note: "Balas dalam 1 hari kerja",
    cta: "Diskusikan proyek Anda",
  },
};

export default id;
