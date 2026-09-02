import { CAPCUT_DAILY_EXTRA, type CapcutDailyExtra } from './capcut-tiktok-30day-daily'

export type CapcutPhase = 0 | 1 | 2 | 3 | 4 | 5

export interface CapcutRef {
  label: string
  href: string
}

export interface CapcutDay {
  day: number
  phase: CapcutPhase
  title: string
  focus: string
  minutes: number
  tasks: string[]
  tip: string
  refs: CapcutRef[]
  selfCheck: string[]
  videoScript: CapcutDailyExtra['videoScript']
}

export interface CapcutCompetency {
  id: string
  label: string
}

export const PHASE_META: Record<
  CapcutPhase,
  { label: string; short: string; color: string }
> = {
  0: { label: 'Setup + AI map', short: 'Setup', color: '#A8A29E' },
  1: { label: 'Potong + AI cut', short: 'Potong', color: '#F97316' },
  2: { label: 'AI caption + audio', short: 'Caption', color: '#FB923C' },
  3: { label: 'Motion & visual', short: 'Motion', color: '#FBBF24' },
  4: { label: 'Polish + gaya', short: 'Polish', color: '#F59E0B' },
  5: { label: 'Batch lanjutan', short: 'Batch', color: '#EAB308' },
}

/** Referensi inti — dipakai ulang di beberapa hari */
export const CORE_REFS = {
  learningPath: {
    label: 'CapCutGuide learning path',
    href: 'https://capcutguide.com/capcut-tutorial/',
  },
  cutTrimSplit: {
    label: 'Cut, trim & split (2026)',
    href: 'https://capcutguide.com/how-to-cut-trim-split-video-capcut/',
  },
  autoCaptions: {
    label: 'Auto captions: tambah, perbaiki, export',
    href: 'https://capcutguide.com/capcut-auto-captions/',
  },
  exportSettings: {
    label: 'Export settings TikTok & Shorts',
    href: 'https://capcutguide.com/capcut-export-settings/',
  },
  textLayers: {
    label: 'Teks manual vs auto caption',
    href: 'https://capcutguide.com/how-to-add-text-in-capcut/',
  },
  stabilize: {
    label: 'Stabilize footage goyang',
    href: 'https://capcutguide.com/stabilize-video-capcut/',
  },
  featuresMap: {
    label: 'CapCut features map (2026)',
    href: 'https://capcutguide.com/capcut-video-editor-features-guide/',
  },
  tiktokEdit: {
    label: 'Edit TikTok dengan CapCut (resmi)',
    href: 'https://www.capcut.com/resource/how-to-edit-tiktok-videos',
  },
  advancedTools: {
    label: 'CapCut advanced + AI tools (resmi)',
    href: 'https://www.capcut.com/resource/how-to-use-capcut',
  },
  templatesTrends: {
    label: 'Templates & trends 2026',
    href: 'https://www.capcut.com/help/templates-and-trends',
  },
  autoCut: {
    label: 'Auto Cut (resmi)',
    href: 'https://www.capcut.com/help/auto-cut-in-capcut',
  },
  proTips: {
    label: 'Pro tips CapCut TikTok',
    href: 'https://www.freevisuals.net/post/secret-pro-tips-for-editing-tiktok-videos-with-capcut',
  },
  fastWorkflow: {
    label: 'Fast workflow TikTok 2025',
    href: 'https://www.avramify.com/blogs/news/capcut-2025-fast-editing-workflows-for-viral-tiktoks',
  },
  creatorPortal: {
    label: 'Creator Portal CapCut',
    href: 'https://www.capcut.com/partners/creator-portal',
  },
  aiSubtitles: {
    label: 'AI subtitles workflow 2026',
    href: 'https://videocaptionstudio.com/blog/capcut-ai-subtitles-2025',
  },
} as const satisfies Record<string, CapcutRef>

export const COMPETENCY_ITEMS: CapcutCompetency[] = [
  {
    id: 'ai-cut-proofread',
    label:
      'Auto Cut rough pass + koreksi hook 3 detik dan pacing dalam 15 menit',
  },
  {
    id: 'caption-proofread',
    label: 'AI caption + proofread nama/istilah dalam 5 menit',
  },
  {
    id: 'audio-ducking',
    label: 'Ducking musik saat bicara (manual atau Dynamic Loudness)',
  },
  {
    id: 'beat-keyframe',
    label: 'Beat sync + 1 keyframe zoom/teks di momen penting',
  },
  {
    id: 'speed-ramp',
    label: 'Speed ramp di beat, lalu kembali normal',
  },
  {
    id: 'ai-remove-bg',
    label: 'Remove background AI + rapikan tepi subjek',
  },
  {
    id: 'signature-style',
    label: 'Terapkan signature style (font + warna + 1 gerak) ke 3 video',
  },
  {
    id: 'batch-ai',
    label: 'Batch 3 video dengan AI assist dalam ~60 menit',
  },
  {
    id: 'export-master',
    label: 'Export 1080x1920 H.264, cek file asli di HP sebelum post',
  },
]

export const CAPCUT_DAYS: CapcutDay[] = (
  [
  {
    day: 1,
    phase: 0,
    title: 'Canvas + peta AI CapCut',
    focus: '9:16 + tool AI yang tersedia di akunmu',
    minutes: 45,
    tasks: [
      'Buat project 9:16, 1080x1920; siapkan folder raw/, music/, export/',
      'Cek fitur AI di buildmu: Auto Cut, Auto Captions, Remove BG, Enhance Voice',
      'Rekam 4-6 klip pendek untuk latihan sebulan',
    ],
    tip: 'AI mempercepat first pass. Keputusan hook, pacing, dan proofread tetap manual.',
    refs: [CORE_REFS.featuresMap, CORE_REFS.aiSubtitles, CORE_REFS.learningPath],
  },
  {
    day: 2,
    phase: 1,
    title: 'Auto Cut + hook manual',
    focus: 'AI rough cut, kamu perbaiki pembukaan',
    minutes: 60,
    tasks: [
      'Import klip, jalankan Auto Cut / scene detect sebagai rough pass',
      'Koreksi manual: hook 3 detik harus langsung jelas',
      'Hapus cut AI yang merusak arti atau timing',
    ],
    tip: 'Auto Cut buang dead air cepat. Hook dan pacing tetap keputusanmu.',
    refs: [CORE_REFS.autoCut, CORE_REFS.cutTrimSplit],
  },
  {
    day: 3,
    phase: 1,
    title: 'Jump cut sisa jeda',
    focus: 'Perbaiki yang AI lewatkan',
    minutes: 60,
    tasks: [
      'Split dan hapus jeda/nafas yang Auto Cut tidak tangkap',
      'Rapatkan gap di main track, cek layer tidak bergeser',
      'Target durasi ~25-30 detik, arti kalimat utuh',
    ],
    tip: 'Fundamental: bisa jump cut manual walau sudah pakai AI.',
    refs: [CORE_REFS.cutTrimSplit],
  },
  {
    day: 4,
    phase: 1,
    title: 'Pacing + export uji',
    focus: 'Versi agresif vs normal',
    minutes: 75,
    tasks: [
      'Duplikat: versi pacing normal vs cut lebih agresif (~20 detik)',
      'Export 1080x1920 H.264, tonton file asli di HP',
      'Pilih versi yang lebih enak ditahan tanpa suara',
    ],
    tip: 'Pacing yang enak terasa lebih cepat dari dugaan saat edit.',
    refs: [CORE_REFS.exportSettings, CORE_REFS.proTips],
  },
  {
    day: 5,
    phase: 1,
    title: 'Safe zone & frame',
    focus: 'Siap untuk caption dan teks',
    minutes: 45,
    tasks: [
      'Crop/transform: subjek aman di frame vertikal',
      'Tandai area aman dari UI TikTok (bawah & samping)',
      'Simpan sebagai video bersih fase potong (tanpa efek)',
    ],
    tip: 'Safe zone wajib sebelum caption AI menutupi wajah.',
    refs: [CORE_REFS.exportSettings, CORE_REFS.textLayers],
  },
  {
    day: 6,
    phase: 2,
    title: 'AI caption + proofread',
    focus: 'Generate cepat, koreksi teliti',
    minutes: 60,
    tasks: [
      'Voice final dulu, baru generate auto captions',
      'Proofread: nama, istilah, tanda baca, timing per baris',
      'Split baris panjang di jeda natural',
    ],
    tip: 'AI caption = draft. Proofread adalah skill, bukan opsional.',
    refs: [CORE_REFS.autoCaptions, CORE_REFS.aiSubtitles],
  },
  {
    day: 7,
    phase: 2,
    title: 'Preset caption merek',
    focus: 'Satu klik apply ke semua baris',
    minutes: 45,
    tasks: [
      'Font tebal, kontras tinggi, shadow untuk layar kecil',
      'Simpan preset caption merek',
      'Apply ke semua baris, cek di HP',
    ],
    tip: 'Preset + AI caption = styling cepat setelah proofread.',
    refs: [CORE_REFS.textLayers],
  },
  {
    day: 8,
    phase: 2,
    title: 'Audio ducking',
    focus: 'Voice di depan, musik di belakang',
    minutes: 60,
    tasks: [
      'Tambah musik di track terpisah',
      'Ducking manual atau Dynamic Loudness jika ada',
      'Cek tidak clipping di headphone',
    ],
    tip: 'AI tidak mengganti balance audio. Ini tetap fundamental.',
    refs: [CORE_REFS.fastWorkflow, CORE_REFS.featuresMap],
  },
  {
    day: 9,
    phase: 2,
    title: 'Hook teks + multi-track',
    focus: 'Layer manual vs caption AI',
    minutes: 60,
    tasks: [
      'Text overlay hook (layer manual, bukan caption)',
      'Lock track caption/musik sebelum edit video',
      'Export 1 draft TikTok',
    ],
    tip: 'Caption = suara. Overlay = judul/CTA. Jangan dicampur.',
    refs: [CORE_REFS.textLayers],
  },
  {
    day: 10,
    phase: 3,
    title: 'Beat sync + retensi',
    focus: 'Potong di ketukan, perubahan tiap 3-5 dtk',
    minutes: 75,
    tasks: [
      'Potong klip di beat musik',
      'Tandai timeline: perubahan visual/audio tiap 3-5 detik',
      'Tambah 1-2 SFX ringan di hook',
    ],
    tip: 'Retensi > efek mahal. Beat sync bikin edit terasa intentional.',
    refs: [CORE_REFS.fastWorkflow, CORE_REFS.proTips],
  },
  {
    day: 11,
    phase: 3,
    title: 'Keyframe teks & zoom',
    focus: 'Gerak dengan sengaja',
    minutes: 75,
    tasks: [
      'Keyframe zoom pelan ke subjek di poin penting',
      'Animasi teks in/out (preset atau keyframe)',
      'Preview di HP: masih terbaca',
    ],
    tip: 'Motion lanjutan dimulai minggu 2 karena AI sudah handle caption/cut.',
    refs: [CORE_REFS.proTips, CORE_REFS.featuresMap],
  },
  {
    day: 12,
    phase: 3,
    title: 'Speed ramp',
    focus: 'Slow-mo di beat',
    minutes: 60,
    tasks: [
      'Satu klip slow-mo di beat dramatis',
      'Ramp kembali ke kecepatan normal',
      'Sinkron dengan musik',
    ],
    tip: 'Satu slow-mo per video cukup.',
    refs: [CORE_REFS.advancedTools],
  },
  {
    day: 13,
    phase: 3,
    title: 'Template tren deconstruct',
    focus: 'Pelajari strukturnya, bukan hanya ganti footage',
    minutes: 75,
    tasks: [
      'Ambil 1 template trending, ganti footage + teks',
      'Catat: beat, durasi teks, jumlah cut',
      'Rebuild 1 bagian manual tanpa template',
    ],
    tip: 'Template = referensi pacing. Advanced = bisa tiru strukturnya manual.',
    refs: [CORE_REFS.templatesTrends],
  },
  {
    day: 14,
    phase: 3,
    title: 'Transisi + filter ringan',
    focus: '1 transisi, 1 look konsisten',
    minutes: 60,
    tasks: [
      'Tambah maksimal 1-2 transisi (0,3-0,8 dtk) di cut yang sudah enak',
      'Filter ringan konsisten antar klip',
      'Tonton tanpa suara: masih menarik?',
    ],
    tip: 'Cut bagus dulu. Transisi dan filter hanya polish.',
    refs: [CORE_REFS.templatesTrends, CORE_REFS.advancedTools],
  },
  {
    day: 15,
    phase: 4,
    title: 'Remove background AI',
    focus: 'Cutout + rapikan tepi',
    minutes: 75,
    tasks: [
      'Remove background pada 1 klip (tanpa green screen)',
      'Perbaiki tepi subjek yang bergerak (feather/erode jika ada)',
      'Composite di background baru atau B-roll',
    ],
    tip: 'AI cutout cepat. Tepi rambut dan gerak cepat masih perlu sentuhan manual.',
    refs: [CORE_REFS.advancedTools, CORE_REFS.featuresMap],
  },
  {
    day: 16,
    phase: 4,
    title: 'B-roll + stabilize',
    focus: 'Retensi + footage goyang',
    minutes: 75,
    tasks: [
      'B-roll singkat tiap 6-8 detik di bagian monoton',
      'Stabilize hanya segmen goyang (split dulu)',
      'Color adjust ringan: brightness, contrast, saturation',
    ],
    tip: 'Stabilize per segmen, bukan satu klip panjang.',
    refs: [CORE_REFS.stabilize],
  },
  {
    day: 17,
    phase: 4,
    title: 'Enhance voice + noise',
    focus: 'AI audio polish',
    minutes: 60,
    tasks: [
      'Coba Enhance Voice / noise reduction pada voice track',
      'Bandingkan sebelum/sesudah di headphone',
      'Jangan over-process sampai suara terdengar robot',
    ],
    tip: 'Enhance voice membantu, tapi ducking tetap wajib.',
    refs: [CORE_REFS.featuresMap, CORE_REFS.aiSubtitles],
  },
  {
    day: 18,
    phase: 4,
    title: 'Signature style',
    focus: 'Paket 2-3 pilihan berulang',
    minutes: 90,
    tasks: [
      'Kunci: font caption + warna + 1 gerak (zoom atau teks)',
      'Simpan preset teks, caption, dan warna',
      'Terapkan ke 1 video lama dalam satu sesi',
    ],
    tip: 'Signature style = repeatable system, bukan 20 efek berbeda.',
    refs: [CORE_REFS.exportSettings],
  },
  {
    day: 19,
    phase: 4,
    title: '2 gaya publish-ready',
    focus: 'Edukasi + tren',
    minutes: 90,
    tasks: [
      'Finalisasi video edukasi (AI cut + caption + keyframe ringan)',
      'Finalisasi video tren/template dengan signature style',
      'Simpan 2 draft TikTok',
    ],
    tip: 'Dua gaya cukup untuk minggu ini. Variasi melatih selera.',
    refs: [CORE_REFS.tiktokEdit],
  },
  {
    day: 20,
    phase: 5,
    title: 'Workflow AI timed',
    focus: 'Auto cut → caption → preset → export <25 mnt',
    minutes: 75,
    tasks: [
      'Catat waktu tiap langkah: Auto Cut, proofread caption, ducking, export',
      'Target: 1 video 30 detik selesai dalam 25 menit',
      'Catat di mana AI menghemat waktu vs di mana masih manual',
    ],
    tip: 'Ukur workflow. AI tanpa timer mudah terasa cepat padahal belum.',
    refs: [CORE_REFS.fastWorkflow, CORE_REFS.autoCut],
  },
  {
    day: 21,
    phase: 5,
    title: 'Batch 2 video',
    focus: 'Reuse preset, beda footage',
    minutes: 90,
    tasks: [
      'Selesaikan 2 video dengan workflow yang sama',
      'Reuse preset caption + signature style',
      'Naming: hook-topik-tanggal',
    ],
    tip: 'Batch = sistem yang sama, konten berbeda.',
    refs: [CORE_REFS.fastWorkflow],
  },
  {
    day: 22,
    phase: 5,
    title: 'Batch 3 video / 1 jam',
    focus: 'Kecepatan tanpa turun kualitas',
    minutes: 90,
    tasks: [
      '3 draft dalam ~60 menit dengan AI assist',
      'Export 1080x1920 H.264, file asli (bukan re-upload)',
      'Proofread caption tiap video sebelum export',
    ],
    tip: 'Jangan skip proofread demi kecepatan batch.',
    refs: [CORE_REFS.exportSettings, CORE_REFS.creatorPortal],
  },
  {
    day: 23,
    phase: 5,
    title: 'Masking / cutout lanjutan',
    focus: 'Composite lebih kompleks',
    minutes: 75,
    tasks: [
      'Mask sederhana atau cutout untuk 1 efek (split screen / highlight produk)',
      'Keyframe mask jika tool tersedia di buildmu',
      'Skip jika fitur tidak ada; ganti dengan overlay B-roll',
    ],
    tip: 'Masking opsional per platform. Jangan blokir batch karena satu fitur.',
    refs: [CORE_REFS.featuresMap, CORE_REFS.advancedTools],
  },
  {
    day: 24,
    phase: 5,
    title: 'Smart reframe / auto resize',
    focus: '9:16 dari footage horizontal',
    minutes: 60,
    tasks: [
      'Coba smart reframe atau auto resize pada 1 klip landscape',
      'Cek subjek tetap di frame saat bergerak',
      'Bandingkan dengan crop manual: mana lebih cepat/rapi',
    ],
    tip: 'AI reframe berguna untuk B-roll landscape. Tetap cek di HP.',
    refs: [CORE_REFS.aiSubtitles, CORE_REFS.featuresMap],
  },
  {
    day: 25,
    phase: 5,
    title: 'A/B hook test',
    focus: '2 pembukaan, 1 video',
    minutes: 75,
    tasks: [
      'Buat 2 versi hook (3 detik pertama berbeda)',
      'Export keduanya, simpan sebagai draft A dan B',
      'Catat hipotesis: mana yang lebih jelas tanpa suara',
    ],
    tip: 'Advanced = menguji keputusan edit, bukan menambah efek.',
    refs: [CORE_REFS.proTips],
  },
  {
    day: 26,
    phase: 5,
    title: 'Motion tracking intro',
    focus: 'Teks mengikuti subjek (jika ada)',
    minutes: 75,
    tasks: [
      'Coba motion tracking pada 1 klip (teks/sticker ikut subjek)',
      'Jika tidak tersedia: ganti dengan keyframe manual',
      'Preview di HP',
    ],
    tip: 'Motion tracking bonus. Keyframe manual sudah cukup untuk TikTok.',
    refs: [CORE_REFS.featuresMap],
  },
  {
    day: 27,
    phase: 5,
    title: 'Publish + ukur',
    focus: 'Waktu edit vs watch time',
    minutes: 75,
    tasks: [
      'Publish 3-5 video',
      'Catat waktu edit (dengan AI) vs watch time awal',
      'Catat apakah penonton sampai 50%',
    ],
    tip: 'Ukur apakah AI benar-benar mempercepat, atau hanya menghemat langkah kecil.',
    refs: [CORE_REFS.creatorPortal],
  },
  {
    day: 28,
    phase: 5,
    title: 'Signature reel mini',
    focus: '5 cut pendek, gaya sama',
    minutes: 90,
    tasks: [
      'Buat 5 clip 10-15 detik dengan signature style yang sama',
      'Batch dengan preset + AI caption',
      'Simpan sebagai library gaya pribadi',
    ],
    tip: 'Konsistensi gaya = advanced creator habit.',
    refs: [CORE_REFS.creatorPortal],
  },
  {
    day: 29,
    phase: 5,
    title: 'Dry run ujian',
    focus: 'Checklist tanpa tutorial',
    minutes: 60,
    tasks: [
      'Kerjakan 5 item acak dari checklist kompetensi',
      'Catat yang masih lambat atau masih buka tutorial',
      'Perbaiki 1 kelemahan sebelum hari 30',
    ],
    tip: 'Dry run lebih jujur dari langsung ujian hari 30.',
    refs: [CORE_REFS.learningPath],
  },
  {
    day: 30,
    phase: 5,
    title: 'Ujian mandiri',
    focus: 'Batch 3 video + checklist penuh',
    minutes: 90,
    tasks: [
      'Batch 3 video 30-45 detik dalam 60 menit (AI assist boleh)',
      'Kerjakan semua checklist kompetensi',
      'Tonton file export di HP sebelum anggap lulus',
    ],
    tip: 'Lulus = cepat dengan AI, tapi hook, proofread, dan export check tetap kuat.',
    refs: [CORE_REFS.learningPath, CORE_REFS.exportSettings],
  },
] as const satisfies readonly Omit<CapcutDay, 'selfCheck' | 'videoScript'>[]
).map((day) => ({
  ...day,
  ...CAPCUT_DAILY_EXTRA[day.day],
}))

export function taskKey(day: number, taskIndex: number) {
  return `d${day}-t${taskIndex}`
}

export function selfCheckKey(day: number, checkIndex: number) {
  return `d${day}-sc${checkIndex}`
}

export function daySelfCheckKeys(day: CapcutDay) {
  return day.selfCheck.map((_, i) => selfCheckKey(day.day, i))
}

export function dayTaskKeys(day: CapcutDay) {
  return day.tasks.map((_, i) => taskKey(day.day, i))
}
