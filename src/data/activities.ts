export const DETECTIVE_CASES = [
  { kind: 'river-dirty', q: 'Apa perubahan utama yang terlihat pada sungai ini?',
    opts: ['Air menjadi keruh dan permukaannya tertutup sampah', 'Air menjadi lebih jernih dan deras', 'Sungai berubah menjadi daratan'],
    ans: 0, cause: 1, causeOpts: ['Perubahan alami', 'Akibat aktivitas manusia'],
    explain: 'Sampah dan limbah yang masuk ke sungai berasal dari aktivitas manusia. Kekeruhan meningkat karena partikel limbah tersuspensi di air.' },
  { kind: 'forest-cut', q: 'Apa perubahan utama yang terlihat pada kawasan ini?',
    opts: ['Hutan menjadi lebih lebat', 'Pohon ditebang dan lahan menjadi terbuka', 'Terjadi letusan gunung berapi'],
    ans: 1, cause: 1, causeOpts: ['Perubahan alami', 'Akibat aktivitas manusia'],
    explain: 'Lahan terbuka dengan tunggul pohon menunjukkan penebangan. Perubahan ini tergolong antropogenik (akibat manusia).' },
  { kind: 'volcano', q: 'Apa perubahan utama yang terlihat pada kawasan ini?',
    opts: ['Terjadi aktivitas vulkanik yang mengubah lingkungan sekitar', 'Terjadi pembangunan permukiman baru', 'Terjadi pembuangan limbah industri'],
    ans: 0, cause: 0, causeOpts: ['Perubahan alami', 'Akibat aktivitas manusia'],
    explain: 'Letusan gunung berapi adalah peristiwa alam.' },
  { kind: 'city', q: 'Apa yang paling menonjol dari kondisi lingkungan ini?',
    opts: ['Udara berkabut dan padat bangunan serta kendaraan', 'Hutan yang masih sangat lebat', 'Sungai yang jernih dan sepi'],
    ans: 0, cause: 1, causeOpts: ['Perubahan alami', 'Akibat aktivitas manusia'],
    explain: 'Kepadatan kendaraan dan bangunan berkaitan dengan aktivitas manusia.' },
  { kind: 'forest-clean', q: 'Bagaimana kondisi lingkungan pada ilustrasi ini?',
    opts: ['Hutan lebat dengan vegetasi rapat', 'Lahan terbuka tanpa vegetasi', 'Kawasan industri padat'],
    ans: 0, cause: 0, causeOpts: ['Kondisi alami yang terjaga', 'Akibat aktivitas manusia'],
    explain: 'Hutan lebat dengan vegetasi rapat menunjukkan lingkungan yang masih terjaga.' },
];

export const POLLUTION_OBJECTS = [
  { icon: '🚗', name: 'Kendaraan bermotor', pol: 'CO, NOₓ, hidrokarbon, partikulat (PM)',
    dampak: 'Gangguan pernapasan, iritasi mata, memperburuk asma.' },
  { icon: '🏭', name: 'Industri', pol: 'SO₂, NOₓ, partikulat, logam berat, limbah cair',
    dampak: 'Pencemaran udara dan air, hujan asam, gangguan kesehatan.' },
  { icon: '🔥', name: 'Pembakaran sampah', pol: 'CO, partikulat halus, dioksin',
    dampak: 'Asap berbahaya bagi saluran pernapasan.' },
  { icon: '🏠', name: 'Aktivitas rumah tangga', pol: 'Limbah detergen, sisa makanan, asap dapur',
    dampak: 'Menurunkan oksigen terlarut, memicu pertumbuhan alga berlebih.' },
  { icon: '🌳', name: 'Ruang hijau', pol: 'Tidak menghasilkan polutan',
    dampak: 'Menurunkan suhu, menyerap partikulat, memperbaiki kualitas udara.' },
];

export interface WasteItem { id: string; icon: string; name: string; cat: 'organik' | 'daurulang' | 'residu' | 'b3'; }

export const WASTE_ITEMS: WasteItem[] = [
  { id: 'w1', icon: '🍌', name: 'Kulit pisang', cat: 'organik' },
  { id: 'w2', icon: '🥤', name: 'Botol plastik', cat: 'daurulang' },
  { id: 'w3', icon: '🔋', name: 'Baterai bekas', cat: 'b3' },
  { id: 'w4', icon: '📄', name: 'Kertas', cat: 'daurulang' },
  { id: 'w5', icon: '🥫', name: 'Kaleng', cat: 'daurulang' },
  { id: 'w6', icon: '🧴', name: 'Sachet kemasan', cat: 'residu' },
  { id: 'w7', icon: '🍂', name: 'Daun kering', cat: 'organik' },
  { id: 'w8', icon: '💡', name: 'Lampu neon', cat: 'b3' },
  { id: 'w9', icon: '🥡', name: 'Styrofoam', cat: 'residu' },
  { id: 'w10', icon: '🍎', name: 'Sisa buah', cat: 'organik' },
];

export const BINS = [
  { key: 'organik', label: 'Organik', icon: '🍃', desc: 'Mudah terurai' },
  { key: 'daurulang', label: 'Daur Ulang', icon: '♻️', desc: 'Bernilai kembali' },
  { key: 'residu', label: 'Residu', icon: '🗑️', desc: 'Sulit didaur ulang' },
  { key: 'b3', label: 'B3', icon: '☣️', desc: 'Berbahaya' },
] as const;

export const MP_STEPS = [
  { title: '1. Plastik Besar', desc: 'Botol plastik terbuang. Masih berukuran besar dan terlihat jelas.', extra: '> 5 cm' },
  { title: '2. Terpapar Faktor Lingkungan', desc: 'Sinar UV, panas, air, dan gesekan melemahkan ikatan permukaan.', extra: 'UV • panas • air • gesekan' },
  { title: '3. Muncul Retakan', desc: 'Permukaan plastik mulai retak dan mengelupas.', extra: 'Retakan mikro' },
  { title: '4. Terpecah Menjadi Serpihan', desc: 'Plastik terpecah menjadi serpihan kecil.', extra: 'Mulai < 5 mm' },
  { title: '5. Menjadi Mikroplastik', desc: 'Serpihan menjadi mikroplastik < 5 mm.', extra: '< 5 mm' },
  { title: '6. Menyebar ke Lingkungan', desc: 'Mikroplastik ditemukan di air, tanah, sedimen, organisme.', extra: 'Air • tanah • sedimen • organisme' },
];

export const CARBON_QUESTIONS = [
  { id: 'q1', q: 'Bagaimana kamu biasanya pergi ke sekolah?',
    opts: [
      { t: 'Jalan kaki / bersepeda', v: 0 },
      { t: 'Transportasi umum', v: 1 },
      { t: 'Diantar motor', v: 3 },
      { t: 'Diantar mobil pribadi', v: 5 },
    ] },
  { id: 'q2', q: 'Berapa lama kamu menggunakan perangkat elektronik untuk hiburan setiap hari?',
    opts: [
      { t: 'Kurang dari 1 jam', v: 0 },
      { t: '1–2 jam', v: 1 },
      { t: '3–4 jam', v: 2 },
      { t: 'Lebih dari 4 jam', v: 3 },
    ] },
  { id: 'q3', q: 'Bagaimana penggunaan pendingin ruangan (AC) di rumahmu?',
    opts: [
      { t: 'Tidak menggunakan AC', v: 0 },
      { t: 'Kadang, suhu 26°C atau lebih', v: 1 },
      { t: 'Sering, suhu 24–25°C', v: 2 },
      { t: 'Hampir sepanjang hari, < 24°C', v: 4 },
    ] },
  { id: 'q4', q: 'Seberapa sering kamu mengonsumsi makanan dari hewan?',
    opts: [
      { t: 'Jarang / tidak sama sekali', v: 0 },
      { t: 'Beberapa kali seminggu', v: 1 },
      { t: 'Hampir setiap hari', v: 2 },
      { t: 'Setiap hari, lebih dari sekali', v: 3 },
    ] },
  { id: 'q5', q: 'Seberapa sering kamu membeli barang baru?',
    opts: [
      { t: 'Jarang, hanya bila perlu', v: 0 },
      { t: 'Beberapa kali setahun', v: 1 },
      { t: 'Setiap bulan', v: 2 },
      { t: 'Sangat sering', v: 3 },
    ] },
  { id: 'q6', q: 'Bagaimana kebiasaanmu menggunakan plastik sekali pakai?',
    opts: [
      { t: 'Selalu membawa botol & wadah sendiri', v: 0 },
      { t: 'Kadang-kadang membawa sendiri', v: 1 },
      { t: 'Sering membeli air minum kemasan', v: 2 },
      { t: 'Hampir selalu kemasan sekali pakai', v: 3 },
    ] },
];

export const CASE_STEPS = [
  { key: 'masalah', title: 'STEP 1 — Identifikasi Masalah',
    prompt: 'Apa masalah utama yang dilaporkan?',
    options: [
      'Sungai berubah warna, berbau, jumlah ikan menurun',
      'Warga mengeluh harga ikan naik',
      'Curah hujan di kawasan tersebut meningkat',
      'Jalan menuju sungai rusak',
    ], answer: 0 },
  { key: 'bukti', title: 'STEP 2 — Cari Bukti',
    prompt: 'Manakah yang termasuk BUKTI (data), bukan dugaan?',
    options: [
      'Sungai terlihat menjijikkan',
      'pH 5,2; DO 2,1 mg/L; ikan turun 120 → 18',
      'Sepertinya pabrik yang salah',
      'Warga pasti buang sampah sembarangan',
    ], answer: 1 },
  { key: 'penyebab', title: 'STEP 3 — Tentukan Kemungkinan Penyebab',
    prompt: 'Berdasarkan data, penyebab yang paling mungkin adalah…',
    options: [
      'Masuknya limbah domestik & industri ke sungai',
      'Ikan bermigrasi ke sungai lain karena ingin',
      'Sungai menyusut karena musim kemarau',
      'Warna sungai berubah karena pantulan langit',
    ], answer: 0 },
  { key: 'sebab', title: 'STEP 4 — Hubungkan Sebab & Akibat',
    prompt: 'Rantai sebab-akibat yang paling tepat adalah…',
    options: [
      'Limbah masuk → bahan organik naik → DO turun → ikan sulit bertahan',
      'Ikan menurun → limbah masuk → pH naik',
      'Hujan turun → ikan hilang → limbah muncul',
      'Warna berubah → pabrik dibangun → pH turun',
    ], answer: 0 },
  { key: 'dampak', title: 'STEP 5 — Tentukan Dampak',
    prompt: 'Siapa atau apa yang paling terdampak langsung?',
    options: [
      'Ekosistem sungai dan warga pengguna air',
      'Hanya pemilik pabrik',
      'Tidak ada yang terdampak',
      'Hanya ikan di laut lepas',
    ], answer: 0 },
  { key: 'solusi', title: 'STEP 6 — Pilih Solusi',
    prompt: 'Solusi yang paling tepat adalah…',
    options: [
      'Mengolah limbah, menambah ruang hijau, memantau kualitas air',
      'Membiarkan sungai pulih sendiri tanpa tindakan',
      'Menutup sungai dengan beton',
      'Memindahkan semua warga',
    ], answer: 0 },
];

export const FINAL_FIELDS: { k: string; label: string; hint: string; ph: string }[] = [
  { k: 'masalah', label: '1. Masalah', hint: 'Apa masalah utama?', ph: 'Contoh: Sekolah menghasilkan banyak sampah plastik.' },
  { k: 'bukti', label: '2. Bukti', hint: 'Data apa yang mendukung?', ph: 'Contoh: 200 botol plastik terkumpul setiap hari.' },
  { k: 'penyebab', label: '3. Penyebab', hint: 'Apa penyebabnya?', ph: 'Contoh: Kemasan sekali pakai murah dan mudah didapat.' },
  { k: 'dampak', label: '4. Dampak', hint: 'Siapa/apa yang terdampak?', ph: 'Contoh: Lingkungan sekolah & petugas kebersihan.' },
  { k: 'solusi', label: '5. Solusi', hint: 'Apa solusi yang dapat dilakukan?', ph: 'Contoh: Dispenser air minum + tempat sampah terpilah.' },
  { k: 'prediksi', label: '6. Prediksi', hint: 'Apa yang mungkin terjadi jika solusi diterapkan?', ph: 'Contoh: Botol plastik turun hingga setengahnya.' },
  { k: 'aksi', label: '7. Action Plan', hint: 'Langkah konkret, siapa, kapan?', ph: 'Contoh: Minggu 1 survei. Minggu 2 pemasangan.' },
  { k: 'indikator', label: '8. Indikator Keberhasilan', hint: 'Bagaimana mengukur?', ph: 'Contoh: Botol plastik turun 50% dalam 1 bulan.' },
];