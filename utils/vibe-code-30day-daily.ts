export interface VibePromptTemplate {
  label: string
  bad: string
  good: string
  notes?: string[]
}

export interface VibeDailyExtra {
  selfCheck: string[]
  promptTemplate: VibePromptTemplate
}

export const DAILY_EXTRA: Record<number, VibeDailyExtra> = {
  1: {
    selfCheck: [
      'Bisa sebut kapan Tab, Chat, Agent, dan inline (Ctrl/Cmd+K), masing-masing 1 contoh',
      'Sudah 1 tugas Agent dengan batas 1 file, lalu jelaskan diff-nya',
      'Tidak pakai Agent untuk tanya yang cukup di Chat',
    ],
    promptTemplate: {
      label: 'Prompt hari ini',
      bad: 'Perbaiki semua yang error, vibe coding aja.',
      good: 'Jangan edit dulu. Petakan 8 folder penting. Lalu 1 tugas saja: rapikan `src/utils/formatDate.ts`. Jelaskan diff. Jangan sentuh file lain.',
      notes: [
        'Tab: lanjut ngetik. Chat: paham. Agent: kerja. Inline: ubah blok yang diseleksi.',
        'Expert mulai dari pilih pintu yang tepat, bukan dari prompt panjang.',
      ],
    },
  },
  2: {
    selfCheck: [
      'Sudah bandingkan 1 tugas tanpa @file vs dengan @file',
      'Chat baru untuk tugas baru. Thread lama tidak dipaksa campur topik',
      'Tidak paste 10 file. Maksimal 1-3 yang relevan',
    ],
    promptTemplate: {
      label: 'Prompt hari ini',
      bad: 'Tambahin validasi form ya.',
      good: 'Lihat @pages/login.vue dan @composables/useAuth.ts. Tambah validasi email mengikuti pola error yang sudah ada. Jangan bikin sistem validasi baru.',
      notes: [
        '@file mengalahkan cerita. Konteks sampah bikin agent ngawur.',
        '20 baris stack cukup. 400 baris log jarang membantu.',
      ],
    },
  },
  3: {
    selfCheck: [
      'Paragraf rencana punya: apa, siapa pakai, selesai kalau apa',
      'Plan mode atau "jangan edit dulu" sudah dipakai sebelum Agent nulis',
      'Keputusan produk (empty, gagal, auth) ditulis sendiri, bukan diserahkan',
    ],
    promptTemplate: {
      label: 'Prompt hari ini',
      bad: 'Buat fitur catatan. Surprise me. Langsung code.',
      good: 'Mode plan. Fitur: daftar catatan di localStorage key `notes-v1`. Persist setelah refresh. User kosong lihat "Belum ada catatan" plus tombol tambah. Selesai kalau 2 item tahan refresh. Tulis rencana plus 3 risiko. Jangan edit sebelum aku bilang jalan.',
      notes: [
        'Vibe yang tahan: rencana pendek, agent nulis kencang, kamu cek hasil.',
        'Tanpa definisi selesai kamu bukan gerbang.',
      ],
    },
  },
  4: {
    selfCheck: [
      'Tahu chat panjang campur topik bikin agent lupa batas',
      'Sudah pilih model yang cocok untuk 1 tugas (cepat vs teliti), bukan default buta',
      'Tidak tempel seluruh repo ke satu kiriman',
    ],
    promptTemplate: {
      label: 'Prompt hari ini',
      bad: '[12 file + 400 baris log] perbaiki semuanya, pake model terkuat.',
      good: 'Error saat klik Simpan di `/settings`. Stack: [20 baris]. Tersangka: @composables/useSettings.ts. Repro: isi nama, Simpan, refresh. Jangan refactor. Cari penyebab, usul 1 perbaikan.',
      notes: [
        'Model mahal tidak menolong input sampah.',
        'Tugas teliti (arsitektur, review) beda dengan tugas cepat (rename, test merah).',
      ],
    },
  },
  5: {
    selfCheck: [
      '1 fitur dirancang di ChatGPT atau Claude, dieksekusi di Cursor Agent',
      'Bisa sebut 1 kelebihan Cursor vs Copilot Tab vs Claude Code, tanpa fanboy',
      'Rumah tetap Cursor. Tool lain pelengkap',
    ],
    promptTemplate: {
      label: 'Prompt (rancang di chat, eksekusi di Cursor)',
      bad: 'Mana tool terbaik 2026? Pindah stack dong.',
      good: 'Aku pakai Cursor sebagai rumah. Rancang 1 paragraf fitur [nama] plus kriteria selesai. Jangan nulis code. Nanti aku bawa ke Agent di repo.',
      notes: [
        'Chat biasa enak ngerancang. Cursor enak karena lihat file asli.',
        'Copilot Tab enak lanjut ngetik. Jangan pindah rumah tiap minggu.',
      ],
    },
  },
  6: {
    selfCheck: [
      'Hafal 4 bagian: tujuan, konteks, batasan, cara cek selesai',
      'Sudah ubah 1 prompt lama jadi 4 bagian, lalu dipakai',
      'Tidak pakai "act as senior" sebagai pengganti file',
    ],
    promptTemplate: {
      label: 'Kerangka prompt',
      bad: 'Act as a world-class engineer. Buat login yang seamless dan modern.',
      good: 'Tujuan: halaman login. Konteks: @pages/login.vue, Nuxt 3, belum ada auth server. Batasan: jangan pasang library baru, jangan ubah layout. Selesai: form email+kata sandi, error di bawah field, dummy submit tidak nge-crash.',
      notes: [
        'Peran teatrikal jarang nyambung. File dan definisi selesai yang nyambung.',
        'Satu istilah per konsep di prompt yang sama.',
      ],
    },
  },
  7: {
    selfCheck: [
      'Sudah jalankan prompt kabur vs spesifik untuk 1 fitur yang sama',
      'Tahu 3 keputusan yang hanya kamu yang boleh ambil (auth, empty, gagal)',
      'Hasil spesifik lebih sedikit tebakan agent',
    ],
    promptTemplate: {
      label: 'Prompt hari ini',
      bad: 'Buat login.',
      good: 'Tambah `/login`. Field: email, kata sandi. Belum masuk diarahkan ke `/login`. Dummy sukses ke `/`. Error "email atau kata sandi salah" di bawah form, bukan toast yang hilang sendiri. Belum perlu database.',
      notes: [
        'Yang kabur diisi tebakan. Tebakan beda tiap generate.',
        'Kamu putuskan perilaku. Agent nulis.',
      ],
    },
  },
  8: {
    selfCheck: [
      '1 fitur dipecah 3-4 langkah. Langkah 2 baru jalan setelah langkah 1 dicek',
      'Tidak minta "buat app lengkap" dalam 1 kiriman',
      'Tiap langkah punya cara cek yang kelihatan (UI atau test)',
    ],
    promptTemplate: {
      label: 'Prompt hari ini',
      bad: 'Buatkan todo lengkap: auth, database, dark mode, notifikasi, deploy.',
      good: 'Hanya langkah 1/4: daftar todo di `pages/todos.vue`, 3 item dummy. Belum simpan, belum hapus. Selesai kalau 3 item kelihatan. Tunggu langkah 2.',
      notes: [
        'Prompt raksasa = puluhan keputusan tersembunyi.',
        'Expert pecah. Cek. Lanjut.',
      ],
    },
  },
  9: {
    selfCheck: [
      'Kirim gejala + file + stack pendek + repro, bukan "gak work"',
      '1x debug tanpa minta rewrite seluruh file',
      'Kalau agent ngawur: stop, perjelas gejala, jangan numuk patch',
    ],
    promptTemplate: {
      label: 'Prompt hari ini',
      bad: 'Gak work. Perbaiki semua.',
      good: 'Gejala: klik Simpan, halaman kosong. Console: `TypeError: Cannot read properties of undefined (reading "id")` di `UserCard.vue:24`. Repro: buka `/team`, Simpan tanpa pilih user. Dugaan: user null. Jangan rewrite. Tambah guard.',
      notes: [
        'Debug expert = gejala, tempat, cara ulang, dugaan.',
        '"Gak work" memaksa tebak dunia.',
      ],
    },
  },
  10: {
    selfCheck: [
      'Minta komponen baru "seperti file X", bukan "yang clean"',
      'Punya 3 anti-pola tertulis: kabur, terlalu luas, paste tanpa pilih',
      'Bisa tulis ulang prompt jelek jadi 4 bagian dalam 5 menit',
    ],
    promptTemplate: {
      label: 'Prompt hari ini',
      bad: 'Bikin card yang bagus kayak punya Apple, super clean.',
      good: 'Buat `UserRow.vue` mengikuti @components/OrderRow.vue: 1 baris, nama kiri, angka kanan `tabular-nums`, tanpa card di dalam card. Props: `name`, `amount`. Tanpa library baru.',
      notes: [
        'Contoh di repo mengalahkan kata sifat.',
        'Clean, modern, seamless: buang. Ganti path file.',
      ],
    },
  },
  11: {
    selfCheck: [
      'User Rules 3-8 baris, konkret (bahasa, commit, .env), bukan "tulis code bagus"',
      'Tidak ada kunci atau data pribadi di rules',
      'Chat baru mengikuti gaya rules (dicek 1x)',
    ],
    promptTemplate: {
      label: 'Isi User Rules (contoh)',
      bad: 'Always write clean, maintainable, production-ready code. Be a 10x engineer.',
      good: 'Bahasa UI: Indonesia, semi-formal, tanpa em dash. Jangan commit kecuali aku minta. Kalau ada trade-off, tanya 1 pertanyaan, jangan tebak. Jangan sentuh .env.',
      notes: [
        'Rules kabur diabaikan. Rules konkret diikuti.',
        'User Rules = kebiasaanmu di semua project.',
      ],
    },
  },
  12: {
    selfCheck: [
      'Ada 1 `.cursor/rules/*.mdc` dengan glob atau description yang jelas',
      'Rule di bawah 1 layar, ada contoh, bukan salinan style guide',
      'Tahu Always vs Intelligent vs Globs vs Manual',
    ],
    promptTemplate: {
      label: 'Prompt hari ini',
      bad: 'Buatkan rules lengkap biar agent selalu sempurna.',
      good: 'Buat `.cursor/rules/vue-pages.mdc`. Isi: script setup, SEO lewat useSeoMeta, jangan card bersarang. alwaysApply false, globs `pages/**/*.vue`. Jangan salin style guide utuh.',
      notes: [
        'Tambah rule setelah agent salah berulang. Bukan encyclopedia hari pertama.',
        'Project rules ikut git. Tim dapat yang sama.',
      ],
    },
  },
  13: {
    selfCheck: [
      'Ada `AGENTS.md` pendek di root project latihan, atau nested di folder yang relevan',
      'Isinya perintah kerja, bukan esai',
      'Bisa bedakan kapan AGENTS.md cukup vs kapan perlu `.mdc` + glob',
    ],
    promptTemplate: {
      label: 'Prompt hari ini',
      bad: 'Tulis AGENTS.md 2000 baris covering everything.',
      good: 'Tulis `AGENTS.md` 40 baris: cara jalanin dev, jangan commit .env, UI Indonesia, minta plan sebelum edit fitur baru. Tidak perlu mengulang linter.',
      notes: [
        'AGENTS.md polos. `.mdc` kalau perlu glob atau alwaysApply.',
        'Nested AGENTS.md berlaku di folder itu dan anaknya.',
      ],
    },
  },
  14: {
    selfCheck: [
      'Bisa jelaskan: rule = tetap, skill = prosedur, slash = kamu yang panggil',
      'Tahu folder `.agents/skills/` dan `.cursor/skills/`',
      'Tidak mengubah skill jadi always-on rule yang gemuk',
    ],
    promptTemplate: {
      label: 'Prompt hari ini',
      bad: 'Buat 20 skills biar lengkap.',
      good: 'Jelaskan beda rule vs skill vs slash, pakai contoh repo ini. Usul 1 skill yang layak, bukan 10. Jangan tulis file sebelum aku setuju namanya.',
      notes: [
        'Cursor baca `.agents/skills/` dan `.cursor/skills/`.',
        'Description kabur = skill tidur.',
      ],
    },
  },
  15: {
    selfCheck: [
      'Ada 1 folder skill, `name` di SKILL.md sama dengan nama folder',
      'Description menyebut kapan dipakai, bukan cuma apa isinya',
      'Sudah dipanggil lewat `/nama-skill` dan hasilnya sesuai langkah',
    ],
    promptTemplate: {
      label: 'Prompt hari ini',
      bad: '/create-skill buat skill all-in-one coding god.',
      good: '/create-skill. Nama: `review-pr-kecil`. Dipakai saat aku minta review diff. Langkah: ringkas perubahan, cari bug nyata, jangan puji. Simpan di `.agents/skills/review-pr-kecil/SKILL.md`.',
      notes: [
        'Satu skill kepakai mengalahkan 10 skill tidur.',
        'Langkah yang harus identik tiap kali: taruh script di `scripts/`.',
      ],
    },
  },
  16: {
    selfCheck: [
      'Detail panjang pindah ke `references/`, SKILL.md tetap pendek',
      'Skill berbahaya (deploy, hapus) pakai `disable-model-invocation: true`',
      'Tidak load 5 skill sekaligus tanpa alasan',
    ],
    promptTemplate: {
      label: 'Prompt hari ini',
      bad: 'Selalu pakai semua skill setiap chat. Taruh semua docs di SKILL.md.',
      good: 'Pecah skill review: SKILL.md langkah singkat, detail checklist di `references/checklist.md`. Skill deploy: `disable-model-invocation: true`. Jangan auto.',
      notes: [
        'Progressive disclosure: description murah, body on demand, references kalau perlu.',
        '`/` di chat untuk panggil. `/loop` bukan skill deploy.',
      ],
    },
  },
  17: {
    selfCheck: [
      'MCP dipasang maksimal 1-2 yang dipakai, atau nol kalau belum perlu',
      'Tahu risiko: data keluar, auth, aksi tanpa preview',
      'Tidak pasang 15 MCP "untuk jaga-jaga"',
    ],
    promptTemplate: {
      label: 'Prompt hari ini',
      bad: 'Connect semua MCP yang ada.',
      good: 'Aku butuh agent buka docs resmi. Usul 1 MCP, plus risiko auth dan data keluar. Jangan install sendiri. Tunggu aku izinkan.',
      notes: [
        'MCP berguna. MCP kebanyakan bikin agent bingung pilih tool.',
        'Jangan kasih tool kirim/hapus tanpa preview.',
      ],
    },
  },
  18: {
    selfCheck: [
      'Tahu `/loop 5m …` untuk cek berulang, bukan nulis fitur',
      'Bisa sebut 1 kasus cocok (CI, test) dan 1 kasus jangan (refactor liar)',
      'Tahu cara minta stop. Loop tidak dibiarkan hidup tanpa alasan',
    ],
    promptTemplate: {
      label: 'Prompt hari ini',
      bad: '/loop 30s buatkan fitur baru terus sampai sempurna.',
      good: '/loop 5m cek `npm test`. Laporkan yang gagal dalam 5 baris. Jangan edit code. Stop kalau aku bilang stop atau test hijau 2x berturut.',
      notes: [
        'Loop = jaga dan pantau. Bukan pabrik tanpa gerbang.',
        'Interval terlalu rapat cuma ramai. 5 menit sering cukup.',
      ],
    },
  },
  19: {
    selfCheck: [
      'Tahu hooks = skrip di momen hidup agent (sebelum/sesudah edit, command)',
      'Sudah baca docs Hooks atau `/create-hook`, walau belum wajib pasang',
      'Tidak pakai hook untuk mengganti review manusia',
    ],
    promptTemplate: {
      label: 'Prompt hari ini',
      bad: 'Pasang hook yang otomatis accept semua edit.',
      good: '/create-hook. Tujuan: sebelum commit, tolak kalau ada `.env` di staged files. Jelaskan dulu event mana. Jangan tulis hook yang menyembunyikan diff dari aku.',
      notes: [
        'Hook expert: pagar otomatis. Bukan autopilot buta.',
        'Kalau belum perlu, cukup paham kapan kamu akan pasang.',
      ],
    },
  },
  20: {
    selfCheck: [
      'Tahu subagent = tugas terpisah dengan konteks sendiri, bukan 1 chat campur 5 kerja',
      '1x coba pecah: agent A review, agent B nulis, atau `/create-subagent`',
      'Tidak suruh satu agent kerjakan deploy + refactor + copy UI sekaligus',
    ],
    promptTemplate: {
      label: 'Prompt hari ini',
      bad: 'Kerjakan semuanya: fitur, review, docs, deploy, dalam 1 chat.',
      good: 'Pecah. Subagent 1: tulis test untuk `parsePrice` sampai merah yang benar. Subagent 2: isi implementasi sampai hijau. Aku yang gabungkan. Jangan overlapping file tanpa bilang.',
      notes: [
        'Parallel enak kalau batas file jelas. Tanpa batas, saling injak.',
        'Kamu tetap gerbang merge.',
      ],
    },
  },
  21: {
    selfCheck: [
      'Commit kecil sebelum tugas berisiko. Punya jejak untuk undo',
      '1x revert lewat checkpoint Agent atau git. Tidak numuk patch',
      'Tahu kapan worktree/branch terpisah lebih aman dari edit di tempat',
    ],
    promptTemplate: {
      label: 'Prompt hari ini',
      bad: 'Lanjut coba semua cara sampai beres, gapapa rusak.',
      good: 'Stop. Arah terakhir salah. Kembalikan `[path]` ke commit terakhir. Usul 3 pendekatan baru, 3 bullet. Tunggu aku pilih. Jangan patch di atas patch.',
      notes: [
        'Expert recover: kembali, lalu arah baru.',
        'Worktree enak untuk eksperimen yang bisa dibuang.',
      ],
    },
  },
  22: {
    selfCheck: [
      'Test atau cara cek ditulis sebelum Agent nulis habis',
      'Agent disuruh merah dulu yang benar, baru hijau',
      'Tidak biarkan Agent hapus test yang mengganggu',
    ],
    promptTemplate: {
      label: 'Prompt hari ini',
      bad: 'Bikin parsePrice, kira-kira benar.',
      good: 'Tulis test dulu untuk `parsePrice`: `"10.000"` jadi `10000`, `""` jadi `null`, `"abc"` lempar error. Jangan implementasi dulu. Setelah merah yang benar, isi function sampai hijau. Jangan hapus test.',
      notes: [
        'Kriteria sukses > daftar langkah. Agent jago ngulang sampai lolos.',
        'Test yang kamu pahami mengalahkan test yang agent karang tanpa cek.',
      ],
    },
  },
  23: {
    selfCheck: [
      'Tidak Accept All untuk diff yang belum dibaca',
      'Sudah tolak atau revert 1 usulan di luar permintaan',
      'Bisa 1 kalimat per file: apa yang berubah, kenapa aman atau tidak',
    ],
    promptTemplate: {
      label: 'Prompt hari ini',
      bad: 'Lanjut aja, accept semua.',
      good: 'Tunjuk diff. Tiap file: 1 kalimat apa yang berubah. Flag yang di luar permintaan. Jangan lanjut file lain sebelum aku accept yang ini. Kalau ada `/cursor-blame`, pakai untuk jejak prompt yang nulis hunk aneh.',
      notes: [
        'Salahnya sekarang: asumsi, bukan syntax.',
        'Accept All tanpa baca = menyerahkan gerbang.',
      ],
    },
  },
  24: {
    selfCheck: [
      '.env tidak pernah di-paste ke chat',
      'Command Agent dibaca dulu, baru diizinkan',
      'Tidak ada kunci di file yang di-commit',
    ],
    promptTemplate: {
      label: 'Prompt hari ini',
      bad: 'Ini .env-ku, bantu debug: API_KEY=sk-...',
      good: 'Error 401 ke API pembayaran. Key ada di .env lokal, tidak akan aku paste. Cek @server/api/charge.ts: header, URL, timeout. Jangan log secret. Jangan commit file rahasia.',
      notes: [
        'Chat tersimpan. Kunci kepaste anggap bocor.',
        'Expert tidak minta agent "jalanin aja".',
      ],
    },
  },
  25: {
    selfCheck: [
      'Tahu `/review` atau `/review-bugbot` / `/review-security` sebagai gerbang kedua',
      '1x minta review setelah fitur, sebelum commit besar',
      'Review AI tidak mengganti baca diff sendiri',
    ],
    promptTemplate: {
      label: 'Prompt hari ini',
      bad: 'Udah bagus kan? Commit.',
      good: '/review-bugbot. Fokus regresi dan null. Jangan puji. Setelah itu aku yang baca diff. Jangan commit.',
      notes: [
        'Review agent = asisten. Kamu tetap yang setuju.',
        'Security review sebelum yang sentuh auth, bayar, atau file rahasia.',
      ],
    },
  },
  26: {
    selfCheck: [
      'Bisa bedakan `/loop` (sesi ini) vs automation (jadwal, GitHub, Slack)',
      'Tidak pasang automation yang nulis code ke main tanpa review',
      '1 kasus nyata tertulis: kapan loop cukup, kapan automation masuk akal',
    ],
    promptTemplate: {
      label: 'Prompt hari ini',
      bad: '/automate tiap 5 menit rewrite production.',
      good: '/automate hanya kalau: PR masuk, jalankan test, komentar yang gagal. Jangan auto-merge. Jangan edit main. Kalau cukup `/loop 5m` di sesi ini, bilang begitu.',
      notes: [
        'Automation expert: sinyal jelas, aksi sempit, manusia tetap merge.',
        'Loop untuk kamu yang sedang nunggu. Automation untuk yang terjadi saat kamu tidak di depan layar.',
      ],
    },
  },
  27: {
    selfCheck: [
      'Fitur multi-file: paragraf rencana, Agent, cek poin, commit',
      'Yang nyimpang scope ditolak, bukan dibiarkan karena "bonus"',
      'Semua file berubah bisa dijelaskan dengan kata sendiri',
    ],
    promptTemplate: {
      label: 'Prompt hari ini',
      bad: 'Bikin fitur catatan. Surprise me. Tambah dark mode juga.',
      good: 'Rencana: `/notes` daftar + form 1 field, localStorage `notes-v1`, persist refresh, Hapus semua dengan konfirmasi yang menyebut objek. Jangan auth, jangan backend, jangan ganti layout. Flag kalau mau nyimpang. Setelah edit, ringkas diff per file.',
      notes: [
        'Ini studio expert. Kamu lead.',
        'Preview kelihatan jalan bukan berarti sesuai rencana.',
      ],
    },
  },
  28: {
    selfCheck: [
      'Bisa tunjuk slop: wrapper 1 kali pakai, nama aneh, file numpuk',
      'Refactor sederhanakan tanpa ganti perilaku. Baris berkurang atau lebih jelas',
      'Tidak minta "clean architecture" sebagai solusi default',
    ],
    promptTemplate: {
      label: 'Prompt hari ini',
      bad: 'Refactor biar clean architecture, tambah service factory provider.',
      good: 'File [path] hasil AI kebanyakan wrapper. Hapus layer numpang, inline yang dipakai 1 kali. Jangan ganti perilaku. Tunjuk sebelum/sesudah jumlah baris.',
      notes: [
        'Agent suka overengineer. Kalimat expert: "ini tidak perlu".',
        'Simple problem, simple code.',
      ],
    },
  },
  29: {
    selfCheck: [
      'Agent salah berulang sudah diubah jadi rule atau skill, bukan cuma dimarahi di chat',
      '5 item kompetensi dikerjakan tanpa buka tutorial',
      'Tahu 1 kelemahan tersisa, plus 1 perbaikan untuk besok',
    ],
    promptTemplate: {
      label: 'Prompt hari ini',
      bad: 'Kasih cheat sheet lengkap semua Cursor.',
      good: 'Agent 3x masih nambah library tanpa izin. Update project rule: jangan pasang dependency baru kecuali aku sebut nama paket. Lalu uji aku: 5 soal (Tab vs Agent, skill vs rule, /loop, prompt 4 bagian, baca diff). Jangan kasih jawaban dulu.',
      notes: [
        'Context engineering: yang salah diulang = taruh di rule/skill.',
        'Dry run lebih jujur dari semangat hari 30.',
      ],
    },
  },
  30: {
    selfCheck: [
      '1 fitur: rencana, Agent, review diff, tes, commit, plus 1 update rule atau skill',
      'Bisa jelaskan semua file yang berubah',
      'Checklist kompetensi akhir diisi jujur',
    ],
    promptTemplate: {
      label: 'Prompt ujian',
      bad: 'Bikin sesuatu yang wow dalam 1 jam.',
      good: 'Aku lead. Kamu eksekusi. Fitur: [isi]. Rencana sudah di atas. Jangan tambah scope. Setelah edit, ringkas diff per file. Aku tes di browser, review, commit. Kalau ada pola yang harus diingat, usul 1 patch ke rule atau skill. Jangan nulis sendiri sebelum aku setuju.',
      notes: [
        'Lulus expert = kamu masih ngerti, gerbang masih di tangan, agent sudah diajari cara kerja repo ini.',
        'Bukan cuma demonya kelihatan.',
      ],
    },
  },
}
