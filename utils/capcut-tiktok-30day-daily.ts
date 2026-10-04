export interface CapcutVideoScript {
  hook: string
  body: string[]
  cta: string
  onScreen?: string[]
}

export interface CapcutDailyExtra {
  selfCheck: string[]
  videoScript: CapcutVideoScript
}

export const CAPCUT_DAILY_EXTRA: Record<number, CapcutDailyExtra> = {
  1: {
    selfCheck: [
      'Project 9:16 (1080×1920) sudah dibuat',
      'Bisa sebut minimal 3 fitur AI di build CapCut-mu',
      'Folder raw/, music/, export/ siap dan 4-6 klip latihan sudah direkam',
    ],
    videoScript: {
      hook: 'Hari 1/30 challenge CapCut buat TikTok. Hari ini belum edit, cuma setup.',
      body: [
        'Pertama bikin canvas 9:16, 1080 kali 1920. Ini ukuran standar TikTok.',
        'Kedua audit fitur AI di akunmu: Auto Cut, caption, remove BG, enhance voice. Tiap build beda.',
        'Ketiga siapkan folder bahan dan rekam 4-6 klip pendek buat latihan sebulan.',
      ],
      cta: 'Besok Auto Cut plus hook manual. Ikut challenge ini? Follow dan tunggu hari 2.',
      onScreen: ['Screen record buka project 9:16', 'Tunjuk menu AI di CapCut', 'Tunjuk folder bahan latihan'],
    },
  },
  2: {
    selfCheck: [
      'Auto Cut sudah dijalankan sebagai rough pass',
      'Hook 3 detik pertama sudah dikoreksi manual',
      'Cut AI yang merusak arti sudah dihapus',
    ],
    videoScript: {
      hook: 'Hari 2: pertama kali pakai Auto Cut di CapCut. AI buang dead air, tapi hook tetap manual.',
      body: [
        'Import klip, jalankan Auto Cut. Ini rough pass, bukan keputusan final.',
        '3 detik pertama harus langsung jelas. Kalau AI potong terlalu agresif, undo dan perbaiki.',
        'Yang dipelajari hari ini: AI cepat, keputusan pacing tetap di tangan kamu.',
      ],
      cta: 'Besok jump cut sisa jeda. Simpan draft rough cut-mu.',
      onScreen: ['Before/after Auto Cut', 'Tunjuk hook 3 detik di timeline'],
    },
  },
  3: {
    selfCheck: [
      'Jeda dan nafas yang AI lewatkan sudah di-split dan dihapus',
      'Durasi video sekitar 25-30 detik, arti kalimat masih utuh',
      'Layer tidak bergeser salah setelah jump cut',
    ],
    videoScript: {
      hook: 'Hari 3: Auto Cut belum sempurna. Hari ini jump cut manual sisa jeda.',
      body: [
        'Split di titik jeda, hapus bagian mati yang AI tidak tangkap.',
        'Target 25-30 detik. Arti kalimat harus utuh, jangan terlalu agresif.',
        'Skill fundamental: bisa jump cut manual walau sudah pakai AI.',
      ],
      cta: 'Besok dua versi pacing. Cek hasil rough cut di HP.',
      onScreen: ['Tunjuk split di timeline', 'Play preview sebelum vs sesudah'],
    },
  },
  4: {
    selfCheck: [
      'Dua versi pacing (normal vs agresif) sudah dibuat',
      'Export 1080×1920 H.264 dan ditonton file asli di HP',
      'Sudah pilih versi yang lebih enak ditahan tanpa suara',
    ],
    videoScript: {
      hook: 'Hari 4: pacing bikin video terasa cepat atau lambat. Aku bandingin dua versi.',
      body: [
        'Duplikat timeline: versi normal dan versi cut lebih agresif sekitar 20 detik.',
        'Export keduanya, tonton di HP tanpa suara. Yang mana lebih enak ditahan?',
        'Pacing yang enak sering terasa lebih cepat dari dugaan saat edit.',
      ],
      cta: 'Besok safe zone. Jangan lupa cek di HP, bukan cuma di layar edit.',
      onScreen: ['Side by side dua versi', 'Tonton di HP on camera'],
    },
  },
  5: {
    selfCheck: [
      'Subjek aman di frame vertikal setelah crop/transform',
      'Area aman dari UI TikTok sudah ditandai',
      'Video bersih fase potong tersimpan tanpa efek',
    ],
    videoScript: {
      hook: 'Hari 5: sebelum caption, pastikan frame aman dari UI TikTok.',
      body: [
        'Crop dan transform supaya subjek tidak kepotong di 9:16.',
        'Tandai area bawah dan samping: jangan sampai wajah ketutup tombol like atau caption nanti.',
        'Simpan video bersih tanpa efek. Ini fondasi sebelum caption AI.',
      ],
      cta: 'Minggu depan masuk caption AI. Follow kalau mau lanjut.',
      onScreen: ['Overlay safe zone di preview', 'Tunjuk area bawah yang harus kosong'],
    },
  },
  6: {
    selfCheck: [
      'Voice final dulu sebelum generate caption',
      'Proofread nama, istilah, dan tanda baca selesai',
      'Baris caption panjang sudah di-split di jeda natural',
    ],
    videoScript: {
      hook: 'Hari 6: AI caption di CapCut. Generate cepat, proofread wajib.',
      body: [
        'Voice harus final dulu, baru generate auto captions.',
        'AI sering salah nama, istilah, dan timing. Koreksi manual itu skill, bukan opsional.',
        'Split baris panjang di jeda natural supaya enak dibaca di HP kecil.',
      ],
      cta: 'Besok bikin preset caption merek. Simpan style yang repeatable.',
      onScreen: ['Before/after proofread caption', 'Tunjuk typo yang AI buat'],
    },
  },
  7: {
    selfCheck: [
      'Preset caption merek sudah disimpan (font, kontras, shadow)',
      'Preset bisa di-apply ke semua baris dalam satu klik',
      'Sudah dicek di HP, masih terbaca',
    ],
    videoScript: {
      hook: 'Hari 7: bikin preset caption biar styling tidak ulang dari nol.',
      body: [
        'Font tebal, kontras tinggi, shadow untuk layar kecil.',
        'Simpan sebagai preset merek, apply ke semua baris caption.',
        'Cek di HP. Kalau kecil atau pudar, perbaiki sekarang.',
      ],
      cta: 'Besok audio ducking. Caption sudah rapi, suara harus seimbang.',
      onScreen: ['Tunjuk preset di CapCut', 'Preview caption di HP'],
    },
  },
  8: {
    selfCheck: [
      'Musik di track terpisah dari voice',
      'Ducking manual atau Dynamic Loudness sudah diterapkan',
      'Tidak clipping di headphone saat voice dan musik bersamaan',
    ],
    videoScript: {
      hook: 'Hari 8: musik jangan menenggelamkan suara. Ini audio ducking.',
      body: [
        'Voice di depan, musik di belakang. Pakai track terpisah.',
        'Ducking manual atau Dynamic Loudness kalau ada di buildmu.',
        'AI tidak mengganti balance audio. Ini tetap fundamental.',
      ],
      cta: 'Besok hook teks manual. Caption beda dengan overlay.',
      onScreen: ['Waveform voice vs musik', 'Play bagian bicara dengan musik turun'],
    },
  },
  9: {
    selfCheck: [
      'Text overlay hook sudah dibuat di layer manual',
      'Track caption dan musik sudah di-lock sebelum edit video',
      '1 draft TikTok sudah di-export',
    ],
    videoScript: {
      hook: 'Hari 9: caption beda dengan teks hook. Jangan dicampur.',
      body: [
        'Caption = transcript suara. Overlay = judul atau CTA di layer manual.',
        'Lock track caption dan musik sebelum geser klip video.',
        'Export 1 draft. Fase caption + audio minggu ini selesai.',
      ],
      cta: 'Minggu depan motion: beat sync dan keyframe. Siap naik level.',
      onScreen: ['Tunjuk layer caption vs overlay', 'Export draft final'],
    },
  },
  10: {
    selfCheck: [
      'Minimal 3 cut sinkron dengan beat musik',
      'Ada perubahan visual atau audio tiap 3-5 detik',
      '1-2 SFX ringan sudah ditambah di hook',
    ],
    videoScript: {
      hook: 'Hari 10: potong di beat musik. Edit terasa lebih intentional.',
      body: [
        'Align cut dengan ketukan. Retensi naik kalau ada perubahan tiap 3-5 detik.',
        'Tambah 1-2 SFX ringan di hook, jangan berlebihan.',
        'Retensi lebih penting dari efek mahal.',
      ],
      cta: 'Besok keyframe zoom. Motion dimulai minggu ini.',
      onScreen: ['Timeline dengan marker beat', 'Play cut di ketukan'],
    },
  },
  11: {
    selfCheck: [
      'Keyframe zoom ke subjek di poin penting sudah dibuat',
      'Animasi teks in/out sudah diterapkan',
      'Preview di HP, teks masih terbaca',
    ],
    videoScript: {
      hook: 'Hari 11: keyframe zoom di CapCut. Gerak dengan sengaja, bukan asal.',
      body: [
        'Keyframe zoom pelan ke subjek saat poin penting.',
        'Animasi teks masuk dan keluar, preset atau keyframe manual.',
        'Cek di HP. Motion yang bagus tetap terbaca di layar kecil.',
      ],
      cta: 'Besok speed ramp. Satu slow-mo di beat cukup.',
      onScreen: ['Tunjuk keyframe di timeline', 'Before/after zoom'],
    },
  },
  12: {
    selfCheck: [
      'Satu klip slow-mo di beat dramatis sudah dibuat',
      'Speed ramp kembali ke normal tanpa jank',
      'Slow-mo sinkron dengan musik',
    ],
    videoScript: {
      hook: 'Hari 12: speed ramp. Satu slow-mo di beat, lalu balik normal.',
      body: [
        'Pilih satu momen dramatis, slow-mo di beat.',
        'Ramp kembali ke kecepatan normal. Jangan over-use.',
        'Satu slow-mo per video biasanya cukup untuk TikTok.',
      ],
      cta: 'Besok deconstruct template tren. Pelajari strukturnya, bukan cuma ganti footage.',
      onScreen: ['Tunjuk speed curve', 'Play slow-mo di beat'],
    },
  },
  13: {
    selfCheck: [
      '1 template trending sudah diganti footage dan teksnya',
      'Sudah catat beat, durasi teks, dan jumlah cut',
      '1 bagian sudah di-rebuild manual tanpa template',
    ],
    videoScript: {
      hook: 'Hari 13: template tren itu referensi pacing, bukan shortcut tanpa belajar.',
      body: [
        'Ambil template trending, ganti footage dan teks.',
        'Catat: beat di mana, durasi teks, berapa cut.',
        'Rebuild 1 bagian manual. Advanced = bisa tiru strukturnya tanpa template.',
      ],
      cta: 'Besok transisi ringan. Cut bagus dulu, transisi cuma polish.',
      onScreen: ['Tunjuk template asli vs hasilmu', 'Tulis catatan struktur di layar'],
    },
  },
  14: {
    selfCheck: [
      'Maksimal 1-2 transisi (0,3-0,8 dtk) di cut yang sudah enak',
      'Filter ringan konsisten di semua klip',
      'Sudah ditonton tanpa suara, masih menarik',
    ],
    videoScript: {
      hook: 'Hari 14: transisi dan filter. Polish, bukan penutup cut jelek.',
      body: [
        'Maksimal 1-2 transisi pendek di cut yang sudah enak.',
        'Filter ringan, konsisten antar klip.',
        'Tonton tanpa suara. Kalau boring, masalahnya pacing, bukan efek.',
      ],
      cta: 'Minggu depan polish: remove BG dan stabilize. Fase motion selesai.',
      onScreen: ['Tunjuk transisi 0,5 detik', 'Tonton tanpa suara on camera'],
    },
  },
  15: {
    selfCheck: [
      'Remove background berhasil di 1 klip tanpa green screen',
      'Tepi subjek yang bergerak sudah dirapikan',
      'Composite di background baru atau B-roll sudah rapi',
    ],
    videoScript: {
      hook: 'Hari 15: remove background AI di CapCut. Cepat, tapi tepi masih perlu sentuhan manual.',
      body: [
        'Remove BG pada 1 klip tanpa green screen.',
        'Rapikan tepi rambut dan gerak cepat pakai feather atau erode kalau ada.',
        'Composite di background baru. AI cutout cepat, detail tetap manual.',
      ],
      cta: 'Besok B-roll plus stabilize. Footage goyang bisa diselamatkan.',
      onScreen: ['Before/after remove BG', 'Zoom tepi subjek'],
    },
  },
  16: {
    selfCheck: [
      'B-roll singkat tiap 6-8 detik di bagian monoton',
      'Stabilize hanya pada segmen goyang (split dulu)',
      'Color adjust ringan sudah diterapkan',
    ],
    videoScript: {
      hook: 'Hari 16: B-roll jaga retensi. Stabilize cuma segmen yang goyang.',
      body: [
        'B-roll singkat tiap 6-8 detik di bagian monoton.',
        'Split dulu, stabilize per segmen. Jangan satu klip panjang.',
        'Color adjust ringan: brightness, contrast, saturation.',
      ],
      cta: 'Besok enhance voice. Audio polish tanpa terdengar robot.',
      onScreen: ['Tunjuk B-roll insert', 'Before/after stabilize'],
    },
  },
  17: {
    selfCheck: [
      'Enhance Voice atau noise reduction sudah dicoba',
      'Sudah bandingkan sebelum/sesudah di headphone',
      'Suara tidak over-process sampai terdengar robot',
    ],
    videoScript: {
      hook: 'Hari 17: enhance voice di CapCut. Bantu, tapi jangan sampai suara jadi robot.',
      body: [
        'Coba Enhance Voice atau noise reduction pada voice track.',
        'Bandingkan sebelum dan sesudah di headphone.',
        'Enhance voice membantu, ducking tetap wajib.',
      ],
      cta: 'Besok kunci signature style. Font, warna, satu gerak berulang.',
      onScreen: ['Waveform before/after', 'Play audio comparison'],
    },
  },
  18: {
    selfCheck: [
      'Font caption, warna, dan 1 gerak sudah dikunci sebagai signature',
      'Preset teks, caption, dan warna sudah disimpan',
      'Signature style sudah diterapkan ke 1 video lama',
    ],
    videoScript: {
      hook: 'Hari 18: signature style. Bukan 20 efek beda, tapi sistem yang repeatable.',
      body: [
        'Kunci font caption, warna, dan 1 gerak: zoom atau teks.',
        'Simpan preset teks, caption, dan warna.',
        'Terapkan ke 1 video lama dalam satu sesi. Konsistensi = advanced habit.',
      ],
      cta: 'Besok 2 video publish-ready: edukasi dan tren.',
      onScreen: ['Tunjuk preset library', '3 video dengan gaya sama'],
    },
  },
  19: {
    selfCheck: [
      'Video edukasi sudah final (AI cut + caption + keyframe ringan)',
      'Video tren/template sudah final dengan signature style',
      '2 draft TikTok tersimpan',
    ],
    videoScript: {
      hook: 'Hari 19: dua gaya video publish-ready. Edukasi dan tren.',
      body: [
        'Finalisasi video edukasi: AI cut, caption, keyframe ringan.',
        'Finalisasi video tren dengan signature style yang sama.',
        'Dua gaya melatih selera. Variasi tanpa kehilangan identitas.',
      ],
      cta: 'Minggu depan batch workflow. Ukur waktu edit dengan timer.',
      onScreen: ['Thumbnail kedua video', 'Play hook masing-masing 3 detik'],
    },
  },
  20: {
    selfCheck: [
      'Waktu tiap langkah sudah dicatat (Auto Cut, proofread, ducking, export)',
      '1 video 30 detik selesai dalam 25 menit atau catat berapa lama',
      'Sudah tahu di mana AI menghemat waktu vs masih manual',
    ],
    videoScript: {
      hook: 'Hari 20: timed workflow. AI terasa cepat, tapi cuma timer yang jujur.',
      body: [
        'Catat waktu: Auto Cut, proofread caption, ducking, export.',
        'Target 1 video 30 detik dalam 25 menit.',
        'Tahu di mana AI bantu dan di mana masih manual. Ukur, jangan nebak.',
      ],
      cta: 'Besok batch 2 video. Sistem sama, konten beda.',
      onScreen: ['Tunjuk timer/stopwatch', 'Breakdown waktu di layar'],
    },
  },
  21: {
    selfCheck: [
      '2 video selesai dengan workflow yang sama',
      'Preset caption dan signature style di-reuse',
      'File dinamai hook-topik-tanggal',
    ],
    videoScript: {
      hook: 'Hari 21: batch 2 video. Reuse preset, beda footage.',
      body: [
        'Selesaikan 2 video dengan workflow yang sama.',
        'Reuse preset caption dan signature style.',
        'Naming konsisten: hook-topik-tanggal. Batch = sistem, bukan kebetulan.',
      ],
      cta: 'Besok target 3 video dalam 60 menit. Proofread tetap wajib.',
      onScreen: ['Dua project side by side', 'Tunjuk naming file'],
    },
  },
  22: {
    selfCheck: [
      '3 draft selesai dalam sekitar 60 menit',
      'Export 1080×1920 H.264, file asli bukan re-upload',
      'Caption tiap video sudah di-proofread sebelum export',
    ],
    videoScript: {
      hook: 'Hari 22: 3 video dalam 1 jam dengan AI assist. Proofread tidak boleh diskip.',
      body: [
        '3 draft dalam sekitar 60 menit. AI assist boleh, hook dan proofread tetap manual.',
        'Export file asli, jangan re-upload dari platform lain.',
        'Jangan skip proofread demi kecepatan. Itu yang bikin caption jelek di feed.',
      ],
      cta: 'Besok masking lanjutan. Opsional kalau fitur tidak ada di buildmu.',
      onScreen: ['Timer 60 menit', '3 file export di folder'],
    },
  },
  23: {
    selfCheck: [
      'Mask atau cutout untuk 1 efek sudah dibuat (atau diganti overlay B-roll)',
      'Composite split screen atau highlight produk sudah rapi',
      'Kalau fitur tidak ada, sudah pakai alternatif B-roll',
    ],
    videoScript: {
      hook: 'Hari 23: masking lanjutan. Split screen atau highlight produk.',
      body: [
        'Mask sederhana untuk split screen atau highlight produk.',
        'Keyframe mask kalau tool tersedia. Kalau tidak, overlay B-roll juga oke.',
        'Jangan blokir batch karena satu fitur tidak ada di buildmu.',
      ],
      cta: 'Besok smart reframe. Footage landscape jadi 9:16.',
      onScreen: ['Tunjuk mask di timeline', 'Hasil split screen'],
    },
  },
  24: {
    selfCheck: [
      'Smart reframe atau auto resize sudah dicoba di 1 klip landscape',
      'Subjek tetap di frame saat bergerak',
      'Sudah bandingkan dengan crop manual: mana lebih cepat/rapi',
    ],
    videoScript: {
      hook: 'Hari 24: smart reframe. Footage horizontal jadi 9:16 tanpa crop manual panjang.',
      body: [
        'Coba smart reframe pada klip landscape.',
        'Cek subjek tetap di frame saat bergerak.',
        'Bandingkan dengan crop manual. AI reframe berguna, tetap cek di HP.',
      ],
      cta: 'Besok A/B hook test. Dua pembukaan, satu video.',
      onScreen: ['Landscape vs hasil 9:16', 'Play subjek bergerak'],
    },
  },
  25: {
    selfCheck: [
      '2 versi hook (3 detik pertama berbeda) sudah dibuat',
      'Export keduanya sebagai draft A dan B',
      'Hipotesis sudah dicatat: mana lebih jelas tanpa suara',
    ],
    videoScript: {
      hook: 'Hari 25: A/B hook test. Advanced = uji keputusan edit, bukan tambah efek.',
      body: [
        'Buat 2 versi hook, 3 detik pertama beda.',
        'Export keduanya. Catat hipotesis: mana lebih jelas tanpa suara.',
        'Hook yang menang sering bukan yang paling dramatis, tapi yang paling jelas.',
      ],
      cta: 'Besok motion tracking intro. Bonus kalau fitur ada.',
      onScreen: ['Play hook A vs B', 'Tulis hipotesis di layar'],
    },
  },
  26: {
    selfCheck: [
      'Motion tracking sudah dicoba (atau diganti keyframe manual)',
      'Teks atau sticker mengikuti subjek dengan rapi',
      'Preview di HP sudah dicek',
    ],
    videoScript: {
      hook: 'Hari 26: motion tracking intro. Teks ikut subjek. Kalau tidak ada, keyframe manual cukup.',
      body: [
        'Coba motion tracking: teks atau sticker ikut subjek.',
        'Kalau fitur tidak ada, keyframe manual sudah cukup untuk TikTok.',
        'Motion tracking bonus. Jangan stuck kalau buildmu tidak punya.',
      ],
      cta: 'Besok publish dan ukur. Waktu edit vs watch time.',
      onScreen: ['Tunjuk tracking di preview', 'Fallback keyframe manual'],
    },
  },
  27: {
    selfCheck: [
      '3-5 video sudah dipublish',
      'Waktu edit (dengan AI) vs watch time awal sudah dicatat',
      'Sudah catat apakah penonton sampai 50%',
    ],
    videoScript: {
      hook: 'Hari 27: publish dan ukur. AI cepat edit, tapi watch time yang bilang hasilnya.',
      body: [
        'Publish 3-5 video. Catat waktu edit dengan AI assist.',
        'Bandingkan dengan watch time awal dan retention 50%.',
        'Ukur apakah AI benar-benar mempercepat atau cuma hemat langkah kecil.',
      ],
      cta: 'Besok signature reel mini. 5 clip, gaya sama.',
      onScreen: ['Screenshot analytics TikTok', 'Tabel waktu edit vs watch time'],
    },
  },
  28: {
    selfCheck: [
      '5 clip 10-15 detik dengan signature style sama sudah dibuat',
      'Batch dengan preset dan AI caption',
      'Library gaya pribadi tersimpan',
    ],
    videoScript: {
      hook: 'Hari 28: signature reel mini. 5 cut pendek, gaya konsisten.',
      body: [
        'Buat 5 clip 10-15 detik dengan signature style yang sama.',
        'Batch pakai preset dan AI caption.',
        'Konsistensi gaya = habit creator advanced.',
      ],
      cta: 'Besok dry run ujian. Cek kelemahan sebelum hari 30.',
      onScreen: ['Grid 5 clip', 'Play montage signature style'],
    },
  },
  29: {
    selfCheck: [
      '5 item acak dari checklist kompetensi sudah dikerjakan tanpa tutorial',
      'Yang masih lambat sudah dicatat',
      '1 kelemahan sudah diperbaiki sebelum hari 30',
    ],
    videoScript: {
      hook: 'Hari 29: dry run ujian. Lebih jujur dari langsung ujian besok.',
      body: [
        'Kerjakan 5 item acak dari checklist kompetensi tanpa buka tutorial.',
        'Catat yang masih lambat atau masih bingung.',
        'Perbaiki 1 kelemahan hari ini. Besok ujian beneran.',
      ],
      cta: 'Besok hari 30: batch 3 video dalam 60 menit. Siap?',
      onScreen: ['Checklist kompetensi', 'Centang yang lulus dry run'],
    },
  },
  30: {
    selfCheck: [
      '3 video 30-45 detik selesai dalam 60 menit (AI assist boleh)',
      'Semua checklist kompetensi akhir sudah dicek',
      'File export sudah ditonton di HP sebelum anggap lulus',
    ],
    videoScript: {
      hook: 'Hari 30/30: ujian mandiri. Batch 3 video dalam 60 menit. Challenge selesai.',
      body: [
        'Batch 3 video 30-45 detik dalam 60 menit. AI assist boleh.',
        'Hook, proofread caption, ducking, export check tetap manual.',
        'Tonton file asli di HP. Lulus = cepat dengan AI, tapi kualitas tetap kuat.',
      ],
      cta: '30 hari selesai. Drop komentar kalau ikut challenge ini sampai akhir.',
      onScreen: ['Timer 60 menit', '3 export + checklist kompetensi centang penuh'],
    },
  },
}
