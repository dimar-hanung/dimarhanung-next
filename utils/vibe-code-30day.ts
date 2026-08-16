import { DAILY_EXTRA, type VibePromptTemplate } from './vibe-code-30day-daily'

export type VibePhase = 0 | 1 | 2 | 3 | 4 | 5

export interface VibeRef {
  label: string
  href: string
}

export type { VibePromptTemplate } from './vibe-code-30day-daily'

export interface VibeDay {
  day: number
  phase: VibePhase
  title: string
  focus: string
  minutes: number
  tasks: string[]
  tip: string
  refs: VibeRef[]
  selfCheck: string[]
  promptTemplate: VibePromptTemplate
}

export interface VibeCompetency {
  id: string
  label: string
}

export const VIBE_PHASE_META: Record<
  VibePhase,
  { label: string; short: string; color: string }
> = {
  0: { label: 'Cursor rumah', short: 'Cursor', color: '#5EEAD4' },
  1: { label: 'Prompt yang enak', short: 'Prompt', color: '#2EE59D' },
  2: { label: 'Ajari agent', short: 'Ajari', color: '#34D399' },
  3: { label: 'Operasi expert', short: 'Operasi', color: '#86EFAC' },
  4: { label: 'Mutu dan pagar', short: 'Mutu', color: '#4ADE80' },
  5: { label: 'Studio expert', short: 'Expert', color: '#A7F3D0' },
}

const CORE_REFS = {
  cursorDocs: {
    label: 'Cursor docs',
    href: 'https://cursor.com/docs',
  },
  cursorAgent: {
    label: 'Cursor Agent',
    href: 'https://cursor.com/docs/agent',
  },
  cursorRules: {
    label: 'Rules, AGENTS.md, User Rules',
    href: 'https://cursor.com/docs/rules',
  },
  cursorSkills: {
    label: 'Agent Skills (SKILL.md)',
    href: 'https://cursor.com/docs/skills',
  },
  cursorHelpSkills: {
    label: 'Skills vs rules (help)',
    href: 'https://cursor.com/help/customization/skills',
  },
  cursorCustomize: {
    label: 'Customize: rules, skills, MCP',
    href: 'https://cursor.com/docs/customize-cursor',
  },
  cursorLearnAgents: {
    label: 'Cara agent kerja',
    href: 'https://cursor.com/learn/agents',
  },
  cursorHooks: {
    label: 'Hooks (siklus hidup agent)',
    href: 'https://cursor.com/docs/hooks',
  },
  agentSkillsSpec: {
    label: 'Spesifikasi Agent Skills',
    href: 'https://agentskills.io/specification',
  },
  gitBookId: {
    label: 'Pro Git (Bahasa Indonesia)',
    href: 'https://git-scm.com/book/id/v2',
  },
  githubCopilot: {
    label: 'GitHub Copilot (Tab / chat)',
    href: 'https://docs.github.com/en/copilot',
  },
  claudeCode: {
    label: 'Claude Code overview',
    href: 'https://docs.anthropic.com/en/docs/claude-code',
  },
} as const satisfies Record<string, VibeRef>

export const VIBE_COMPETENCY_ITEMS: VibeCompetency[] = [
  {
    id: 'pilih-pintu',
    label: 'Pilih Tab, Chat, Agent, Plan, atau inline dengan alasan',
  },
  {
    id: 'prompt-4',
    label: 'Prompt 4 bagian: tujuan, konteks, batasan, cara cek selesai. Pecah tugas',
  },
  {
    id: 'rule-agents',
    label: 'Punya User Rules plus 1 project rule atau AGENTS.md yang konkret',
  },
  {
    id: 'skill-kepakai',
    label: '1 skill di .agents/skills atau .cursor/skills, description kapan dipakai, sudah diuji lewat /nama',
  },
  {
    id: 'loop-mcp',
    label: 'Tahu kapan /loop dan MCP. Tidak pasang tool kebanyakan. Loop bukan pabrik fitur',
  },
  {
    id: 'subagent-hook',
    label: 'Pecah kerja (subagent/parallel) atau pasang pagar (hook) tanpa lepas gerbang',
  },
  {
    id: 'baca-diff',
    label: 'Baca diff. Tidak Accept All. Review kedua (/review atau Bugbot) tidak mengganti mata sendiri',
  },
  {
    id: 'test-rahasia',
    label: 'Kriteria selesai atau test dulu. .env tidak masuk chat. Command dibaca sebelum izin',
  },
  {
    id: 'slop-context',
    label: 'Rapikan slop tanpa ganti perilaku. Salah berulang jadi rule atau skill',
  },
  {
    id: 'fitur-lead',
    label: 'Fitur multi-file: kamu lead, Agent eksekusi, tes, commit, 1 update rule atau skill',
  },
]

export const VIBE_DAYS: VibeDay[] = (
  [
    {
      day: 1,
      phase: 0,
      title: 'Empat pintu Cursor',
      focus: 'Tab, Chat, Agent, inline. Pilih yang pas',
      minutes: 55,
      tasks: [
        'Dalam 1 sesi: Tab lanjut 1 function, Chat tanya 1 konsep tanpa edit, inline (Ctrl/Cmd+K) ubah 1 blok, Agent 1 file',
        'Baca diff Agent. Jelaskan apa yang berubah, 3 kalimat',
        'Tulis di notes: 1 contoh kapan masing-masing pintu dipakai',
        'Buka Customize: Rules, Skills, MCP. Catat yang sudah ada, jangan numpuk plugin',
      ],
      tip: 'Expert bukan yang paling sering buka Agent. Yang paling tepat pilih pintu.',
      refs: [CORE_REFS.cursorDocs, CORE_REFS.cursorAgent, CORE_REFS.cursorCustomize],
    },
    {
      day: 2,
      phase: 0,
      title: 'Konteks yang tepat',
      focus: '@file mengalahkan paste raksasa',
      minutes: 50,
      tasks: [
        'Ulangi 1 tugas dua kali: tanpa @file, lalu dengan @file. Bandingkan tebakan agent',
        'Mulai chat baru untuk tugas berikutnya. Jangan campur topik',
        'Saat error: kirim 20 baris stack, bukan seluruh log',
        'Hapus kebiasaan paste 10 file. Maksimal 1-3 yang relevan',
      ],
      tip: 'Konteks sampah bikin model mahal tetap ngawur.',
      refs: [CORE_REFS.cursorAgent, CORE_REFS.cursorLearnAgents],
    },
    {
      day: 3,
      phase: 0,
      title: 'Plan dulu, baru nulis',
      focus: 'Paragraf gerbang: apa, siapa, selesai kalau',
      minutes: 55,
      tasks: [
        'Tulis 1 paragraf rencana fitur yang mau disimpan minggu ini',
        'Masuk Plan mode atau "jangan edit dulu". Koreksi rencana sebelum izin nulis',
        'Tulis 3 keputusan produk yang hanya kamu yang boleh ambil',
        'Izinkan Agent langkah 1 saja. Cek. Stop',
      ],
      tip: 'Vibe yang tahan bukan tanpa rencana. Rencananya pendek, lalu agent kencang.',
      refs: [CORE_REFS.cursorLearnAgents, CORE_REFS.cursorAgent],
    },
    {
      day: 4,
      phase: 0,
      title: 'Model dan jatah konteks',
      focus: 'Input rapi lebih penting dari model terkuat',
      minutes: 45,
      tasks: [
        'Pilih 1 tugas cepat dan 1 tugas teliti. Bedakan model atau mode-nya',
        'Selesaikan, lalu chat baru. Jangan paksa thread campur',
        'Potong konteks: buang file yang tidak tersangka',
        'Catat 1 kali kamu memaksa thread lama. Jangan diulang',
      ],
      tip: 'Yang mahal sering bukan ngetik. Konteks sampah.',
      refs: [CORE_REFS.cursorAgent],
    },
    {
      day: 5,
      phase: 0,
      title: 'Tool lain, rumah Cursor',
      focus: 'Rancang di luar, eksekusi di repo',
      minutes: 50,
      tasks: [
        'Rancang 1 fitur di ChatGPT atau Claude. Tanpa code utuh. Bawa ke Cursor Agent',
        'Kalau ada Copilot: bandingkan Tab Copilot vs Tab Cursor di 1 file',
        'Tulis 3 baris: apa yang tetap di Cursor, apa yang boleh di tool lain',
        'Jangan pindah rumah. Challenge ini Cursor-first',
      ],
      tip: 'Chat biasa enak ngerancang. Cursor enak karena lihat file asli.',
      refs: [CORE_REFS.githubCopilot, CORE_REFS.claudeCode, CORE_REFS.cursorAgent],
    },
    {
      day: 6,
      phase: 1,
      title: 'Anatomi prompt',
      focus: 'Tujuan, konteks, batasan, cara cek selesai',
      minutes: 50,
      tasks: [
        'Hafalkan 4 bagian. Tulis di notes, tanpa buka halaman ini',
        'Ubah 2 prompt lama jadi 4 bagian. Pakai 1 di Agent',
        'Buang "act as senior". Ganti file dan definisi selesai',
        'Simpan kerangka itu. Dipakai tiap hari ke depan',
      ],
      tip: 'Peran teatrikal jarang nyambung. Batasan dan cara cek yang nyambung.',
      refs: [CORE_REFS.cursorLearnAgents],
    },
    {
      day: 7,
      phase: 1,
      title: 'Spesifik vs kabur',
      focus: 'Yang kabur diisi tebakan agent',
      minutes: 50,
      tasks: [
        'Tulis prompt kabur dan spesifik untuk 1 fitur. Bandingkan rencana atau hasil',
        'Catat keputusan produk yang hanya kamu yang boleh ambil',
        'Jalankan yang spesifik. Tolak yang nyimpang',
        'Simpan pasangan kabur/spesifik di notes sebagai pengingat',
      ],
      tip: 'Auth, empty state, gagal simpan: keputusanmu. Bukan terserah AI.',
      refs: [CORE_REFS.cursorAgent],
    },
    {
      day: 8,
      phase: 1,
      title: 'Pecah tugas',
      focus: 'Satu kiriman, satu yang bisa dicek',
      minutes: 50,
      tasks: [
        'Ambil 1 fitur. Pecah 3-4 langkah, masing-masing punya cara cek',
        'Agent hanya langkah 1. Cek di browser atau test. Baru langkah 2',
        'Tolak kalau agent meloncat ke langkah 3',
        'Catat waktu. Pecah biasanya lebih cepat dari 1 prompt raksasa yang di-undo',
      ],
      tip: '"Buat app lengkap" = puluhan keputusan tersembunyi.',
      refs: [CORE_REFS.cursorAgent],
    },
    {
      day: 9,
      phase: 1,
      title: 'Debug: gejala, bukan "gak work"',
      focus: 'Error + repro + dugaan',
      minutes: 55,
      tasks: [
        'Pecahkan 1 bug nyata, atau buat bug sengaja lalu perbaiki',
        'Kirim: gejala, file, stack pendek, cara ulang, dugaan',
        'Tolak rewrite seluruh file kalau yang rusak 1 guard',
        'Kalau agent ngawur: stop, perjelas, jangan numuk',
      ],
      tip: '"Gak work" memaksa tebak. Gejala memaksa kerja.',
      refs: [CORE_REFS.cursorAgent],
    },
    {
      day: 10,
      phase: 1,
      title: 'Contoh mengalahkan kata sifat',
      focus: 'Tunjuk file acuan',
      minutes: 50,
      tasks: [
        'Minta komponen atau function "seperti file X". Bukan "yang clean"',
        'Kumpul 3 anti-pola: kabur, terlalu luas, paste tanpa pilih',
        'Tulis ulang 1 prompt jelek minggu ini jadi 4 bagian + file acuan',
        'Review hasil: apakah meniru pola file X, atau malah bikin sistem baru',
      ],
      tip: 'Clean, modern, seamless: buang. Ganti path.',
      refs: [CORE_REFS.cursorLearnAgents, CORE_REFS.cursorDocs],
    },
    {
      day: 11,
      phase: 2,
      title: 'User Rules yang konkret',
      focus: 'Kebiasaanmu di semua project',
      minutes: 45,
      tasks: [
        'Tulis 3-8 baris User Rules: bahasa, commit, .env, tanya trade-off',
        'Tes chat baru. Apakah gaya jawaban ikut',
        'Hapus kalimat kosong ("tulis code bagus", "be a 10x")',
        'Jangan taruh kunci atau data pribadi',
      ],
      tip: '"Jangan commit kecuali aku minta" mengubah perilaku. "Clean code" tidak.',
      refs: [CORE_REFS.cursorRules, CORE_REFS.cursorCustomize],
    },
    {
      day: 12,
      phase: 2,
      title: 'Project rules .mdc',
      focus: 'Aturan repo yang ikut git',
      minutes: 55,
      tasks: [
        'Baca docs: Always, Intelligent, Globs, Manual',
        'Tambah 1 `.mdc` untuk pola nyata (halaman Vue, API, test)',
        'Isi pendek, ada contoh. Di bawah 1 layar',
        'Sengaja minta Agent kerja di file yang kena glob. Cek apakah rule kepakai',
      ],
      tip: 'Tambah rule setelah salah berulang. Bukan encyclopedia dari hari pertama.',
      refs: [CORE_REFS.cursorRules],
    },
    {
      day: 13,
      phase: 2,
      title: 'AGENTS.md',
      focus: 'Instruksi polos di root atau nested',
      minutes: 45,
      tasks: [
        'Tulis `AGENTS.md` pendek: cara dev, yang dilarang, kapan minta plan',
        'Kalau monorepo: nested di folder yang relevan',
        'Jangan duplikat linter. Tunjuk file acuan',
        'Commit. Ini dokumen tim, bukan catatan rahasia',
      ],
      tip: 'AGENTS.md enak polos. `.mdc` kalau perlu glob.',
      refs: [CORE_REFS.cursorRules],
    },
    {
      day: 14,
      phase: 2,
      title: 'Rule vs skill vs slash',
      focus: 'Pilih wadah yang benar',
      minutes: 50,
      tasks: [
        'Baca docs Skills. Catat `.agents/skills/` dan `.cursor/skills/`',
        'Tulis 3 baris: 1 kandidat rule, 1 kandidat skill, 1 yang cukup slash',
        'Buka 1 SKILL.md contoh. Perhatikan description "kapan dipakai"',
        'Jangan bikin 10 skill. Pilih 1 untuk besok',
      ],
      tip: 'Rule = tetap. Skill = prosedur. Slash = kamu yang panggil.',
      refs: [CORE_REFS.cursorSkills, CORE_REFS.cursorHelpSkills, CORE_REFS.agentSkillsSpec],
    },
    {
      day: 15,
      phase: 2,
      title: 'Skill pertama yang kepakai',
      focus: 'Description jelas, langkah bisa diuji',
      minutes: 70,
      tasks: [
        '`/create-skill` atau tulis manual. `name` = nama folder',
        'Description: kapan agent harus memakai ini',
        'Uji `/nama-skill`. Koreksi langkah yang dilewati',
        'Commit skill. Satu yang hidup mengalahkan sepuluh tidur',
      ],
      tip: 'Langkah identik tiap kali: taruh script. Judgment: taruh markdown.',
      refs: [CORE_REFS.cursorSkills, CORE_REFS.agentSkillsSpec],
    },
    {
      day: 16,
      phase: 2,
      title: 'Skill dewasa',
      focus: 'references/, manual untuk yang berbahaya',
      minutes: 55,
      tasks: [
        'Pindah detail panjang ke `references/`. SKILL.md tetap pendek',
        'Skill deploy/hapus: `disable-model-invocation: true`',
        'Ketik `/`. Pastikan skill muncul. Jangan suruh "pakai semua skill"',
        'Kalau ada rule cerdas yang mestinya skill: catat, opsional `/migrate-to-skills`',
      ],
      tip: 'Skill auto enak untuk review. Skill auto menakutkan untuk produksi.',
      refs: [CORE_REFS.cursorSkills, CORE_REFS.cursorHelpSkills],
    },
    {
      day: 17,
      phase: 3,
      title: 'MCP: sedikit, yang dipakai',
      focus: 'Tool luar, tetap gerbang',
      minutes: 45,
      tasks: [
        'Baca MCP di Customize. Jangan pasang 15',
        'Pilih 0-2 yang relevan. Tulis risiko: data keluar, auth, aksi tanpa preview',
        'Tes 1 panggilan. Baca apa yang dikirim keluar',
        'Cabut yang tidak kepakai minggu ini',
      ],
      tip: 'Prompt bagus dan @file lebih dulu. MCP bukan syarat expert.',
      refs: [CORE_REFS.cursorCustomize, CORE_REFS.cursorAgent],
    },
    {
      day: 18,
      phase: 3,
      title: '/loop: pantau, jangan liar',
      focus: 'Cek berulang. Bukan pabrik fitur',
      minutes: 50,
      tasks: [
        'Baca `/loop` (interval + prompt). Latihan 1 loop cek test atau status, tanpa edit',
        'Tulis 1 kasus jangan: "bikin sampai sempurna"',
        'Stop loop. Jangan biarkan hidup semalaman tanpa alasan',
        'Catat interval yang masuk akal (sering 5 menit, bukan 30 detik)',
      ],
      tip: 'Loop cocok CI, log, test. Tidak cocok refactor liar.',
      refs: [CORE_REFS.cursorSkills, CORE_REFS.cursorAgent],
    },
    {
      day: 19,
      phase: 3,
      title: 'Hooks sebagai pagar',
      focus: 'Otomatis di momen hidup agent',
      minutes: 55,
      tasks: [
        'Baca docs Hooks. Catat 2 event yang relevan (sebelum commit, sesudah edit)',
        'Rancang 1 hook: misal tolak staged `.env`. Boleh `/create-hook`',
        'Kalau belum pasang: tulis spek 8 baris. Yang penting paham pagar vs autopilot',
        'Jangan hook yang auto-accept diff',
      ],
      tip: 'Hook expert: pagar. Bukan ganti mata kamu.',
      refs: [CORE_REFS.cursorHooks, CORE_REFS.cursorCustomize],
    },
    {
      day: 20,
      phase: 3,
      title: 'Subagent dan parallel',
      focus: 'Pecah kerja, batas file jelas',
      minutes: 60,
      tasks: [
        'Pecah 1 pekerjaan jadi 2 jalur: misal test vs implementasi, atau review vs nulis',
        'Batas file masing-masing. Kamu yang merge',
        'Opsional `/create-subagent` untuk peran yang diulang',
        'Catat 1 kali overlapping yang hampir injak. Perbaiki batasnya',
      ],
      tip: 'Satu chat campur 5 kerja = konteks kacau. Pecah.',
      refs: [CORE_REFS.cursorAgent, CORE_REFS.cursorLearnAgents],
    },
    {
      day: 21,
      phase: 3,
      title: 'Recover: checkpoint, git, worktree',
      focus: 'Kembali, lalu arah baru',
      minutes: 50,
      tasks: [
        'Commit kecil sebelum tugas berisiko',
        'Sengaja terima 1 edit salah. Kembalikan lewat checkpoint atau git',
        'Minta 3 pendekatan baru. Pilih 1. Jangan patch di atas patch',
        'Kalau eksperimen besar: branch atau worktree, bukan rusak working tree utama',
      ],
      tip: 'Lubang lebih dalam kalau terus "lanjut perbaiki" tanpa undo.',
      refs: [CORE_REFS.cursorAgent, CORE_REFS.gitBookId],
    },
    {
      day: 22,
      phase: 3,
      title: 'Test dulu, agent ngulang',
      focus: 'Kriteria sukses, lalu hijau',
      minutes: 65,
      tasks: [
        'Tulis 2-4 kasus test atau cara cek manual sebelum implementasi',
        'Agent: merah yang benar dulu, baru isi sampai hijau',
        'Jangan biarkan test dihapus karena "mengganggu"',
        'Simpan pola ini. Dipakai di studio minggu terakhir',
      ],
      tip: 'Agent jago loop sampai lolos. Kamu tentukan lolos itu apa.',
      refs: [CORE_REFS.cursorAgent],
    },
    {
      day: 23,
      phase: 4,
      title: 'Hawk: baca diff',
      focus: 'Salahnya sekarang asumsi, bukan syntax',
      minutes: 55,
      tasks: [
        '1 perubahan Agent. Review hunk per hunk. 1 kalimat per file',
        'Tolak yang di luar permintaan',
        'Coba `/cursor-blame` atau jejak prompt kalau ada hunk aneh',
        'Latihan menolak Accept All walau terburu-buru',
      ],
      tip: 'Accept All tanpa baca = menyerahkan gerbang.',
      refs: [CORE_REFS.cursorAgent, CORE_REFS.cursorLearnAgents],
    },
    {
      day: 24,
      phase: 4,
      title: 'Rahasia dan command',
      focus: '.env tidak masuk chat',
      minutes: 45,
      tasks: [
        'Cek .gitignore. Pastikan .env tidak ke-commit',
        'Debug 401 atau config tanpa paste kunci',
        'Kalau Agent minta command: baca, baru izinkan',
        'Tambah 1 baris rule: jangan log secret, jangan commit file rahasia',
      ],
      tip: 'Chat tersimpan. Kunci kepaste anggap bocor.',
      refs: [CORE_REFS.cursorAgent, CORE_REFS.gitBookId],
    },
    {
      day: 25,
      phase: 4,
      title: 'Review kedua',
      focus: '/review, Bugbot, security. Mata sendiri tetap wajib',
      minutes: 50,
      tasks: [
        'Setelah 1 fitur: `/review` atau `/review-bugbot`. Minta temuan, bukan pujian',
        'Kalau sentuh auth/bayar: `/review-security`',
        'Bandingkan temuan review vs diff yang sudah kamu baca',
        'Jangan commit sebelum kamu setuju, walau review bilang bersih',
      ],
      tip: 'Review AI asisten. Bukan stempel lulus.',
      refs: [CORE_REFS.cursorSkills, CORE_REFS.cursorAgent],
    },
    {
      day: 26,
      phase: 4,
      title: 'Automation vs /loop',
      focus: 'Sinyal jelas, aksi sempit',
      minutes: 50,
      tasks: [
        'Tulis 1 kasus: cukup `/loop` di sesi ini',
        'Tulis 1 kasus: automation (PR, jadwal) masuk akal',
        'Kalau pakai `/automate`: tidak auto-merge, tidak edit main',
        'Cabut ide automation yang nulis code tanpa review manusia',
      ],
      tip: 'Expert otomatisasi yang sempit. Bukan pabrik ke production.',
      refs: [CORE_REFS.cursorSkills, CORE_REFS.cursorCustomize],
    },
    {
      day: 27,
      phase: 5,
      title: 'Lead fitur multi-file',
      focus: 'Rencana, eksekusi, cek, commit',
      minutes: 80,
      tasks: [
        'Paragraf rencana 1 fitur multi-file (boleh localStorage, tanpa backend wajib)',
        'Agent kerjakan. Tolak nyimpang scope (dark mode, library, auth dadakan)',
        'Cek poin demi poin di browser atau test',
        'Commit dengan pesan kenapa. Semua file harus bisa kamu jelaskan',
      ],
      tip: 'Preview kelihatan jalan bukan berarti sesuai rencana.',
      refs: [CORE_REFS.cursorAgent, CORE_REFS.cursorLearnAgents],
    },
    {
      day: 28,
      phase: 5,
      title: 'Rapikan slop',
      focus: 'Kurangi layer, jangan tambah pabrik',
      minutes: 65,
      tasks: [
        'Pilih file hasil AI yang ribet. Tunjuk wrapper 1 kali pakai',
        'Minta sederhanakan tanpa ganti perilaku. Bandingkan jumlah baris',
        'Hapus abstraksi "untuk jaga-jaga"',
        'Kalau agent minta factory/provider: tolak kecuali dipakai 3+ tempat',
      ],
      tip: 'Kalimat expert yang paling berguna: "ini tidak perlu".',
      refs: [CORE_REFS.cursorAgent],
    },
    {
      day: 29,
      phase: 5,
      title: 'Salah berulang jadi sistem',
      focus: 'Update rule atau skill, bukan marahin chat',
      minutes: 60,
      tasks: [
        'Pilih 1 kesalahan Agent yang sudah 2+ kali. Ubah jadi rule atau skill',
        'Uji chat baru: apakah kesalahan itu berhenti',
        'Kerjakan 5 item acak kompetensi tanpa tutorial',
        'Tulis 1 kelemahan tersisa plus perbaikan hari 30',
      ],
      tip: 'Context engineering: yang diulang, taruh di file. Jangan andalkan ingatan chat.',
      refs: [CORE_REFS.cursorRules, CORE_REFS.cursorSkills],
    },
    {
      day: 30,
      phase: 5,
      title: 'Ujian expert',
      focus: 'Kamu lead. Agent sudah diajari repo ini',
      minutes: 90,
      tasks: [
        '1 fitur: rencana, Agent, review diff, tes, commit',
        '1 update rule atau skill dari pola hari ini',
        'Isi checklist kompetensi dengan jujur',
        'Tulis 3 habit yang dibawa: pintu tepat, prompt 4 bagian, gerbang diff',
      ],
      tip: 'Lulus = kamu ngerti file yang berubah, gerbang di tangan, agent ikut cara kerja repo.',
      refs: [CORE_REFS.cursorDocs, CORE_REFS.cursorSkills, CORE_REFS.cursorRules, CORE_REFS.cursorHooks],
    },
  ] as const satisfies readonly Omit<VibeDay, 'selfCheck' | 'promptTemplate'>[]
).map((day) => ({
  ...day,
  ...DAILY_EXTRA[day.day],
}))

export function vibeTaskKey(day: number, taskIndex: number) {
  return `d${day}-t${taskIndex}`
}

export function vibeSelfCheckKey(day: number, checkIndex: number) {
  return `d${day}-sc${checkIndex}`
}

export function vibeDaySelfCheckKeys(day: VibeDay) {
  return day.selfCheck.map((_, i) => vibeSelfCheckKey(day.day, i))
}

export function vibeDayTaskKeys(day: VibeDay) {
  return day.tasks.map((_, i) => vibeTaskKey(day.day, i))
}
