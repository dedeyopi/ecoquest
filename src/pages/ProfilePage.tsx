import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, Code2 } from 'lucide-react';
import { useStudent } from '@/context/StudentContext';
import { useToast } from '@/hooks/useToast';
import { COMPETENCIES } from '@/data/competencies';

export default function ProfilePage() {
  const { student, reset, setReduceMotion, saveReflection } = useStudent();
  const { push } = useToast();

  const mastered = COMPETENCIES.filter((c) => student.mastery[c.id]?.status === 'mastered').length;
  const progress = Math.round((mastered / COMPETENCIES.length) * 70 + Math.min(student.completedActivities.length, 10) / 10 * 30);

  const [refl, setRefl] = useState({
    dulu: student.reflections.find((r) => r.k === 'dulu')?.v || '',
    sekarang: student.reflections.find((r) => r.k === 'sekarang')?.v || '',
    selanjutnya: student.reflections.find((r) => r.k === 'selanjutnya')?.v || '',
  });

  function handleSave() {
    saveReflection([
      { k: 'dulu', v: refl.dulu, date: Date.now() },
      { k: 'sekarang', v: refl.sekarang, date: Date.now() },
      { k: 'selanjutnya', v: refl.selanjutnya, date: Date.now() },
    ]);
    push('Refleksi tersimpan 💾');
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800">👤 Profil</h1>
        <p className="text-slate-500 mt-2 text-lg">Data belajarmu dan pengaturan aplikasi.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-card border border-emerald-100 p-6 sm:p-8">
        <div className="flex items-center gap-5 mb-6">
          <div className="w-20 h-20 rounded-3xl bg-emerald-600 text-white grid place-items-center text-3xl font-extrabold shadow-soft">
            {student.name.trim().charAt(0).toUpperCase() || 'S'}
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-800">{student.name}</div>
            <div className="text-lg text-slate-500">Kelas {student.className}</div>
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="rounded-3xl border border-emerald-100 p-6">
            <div className="text-3xl mb-2">📈</div>
            <div className="text-base font-semibold text-slate-500">Progress</div>
            <div className="text-3xl font-extrabold text-emerald-700 mt-1">{progress}%</div>
          </div>
          <div className="rounded-3xl border border-emerald-100 p-6">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-base font-semibold text-slate-500">Kompetensi</div>
            <div className="text-3xl font-extrabold text-emerald-700 mt-1">{mastered}/8</div>
          </div>
          <div className="rounded-3xl border border-emerald-100 p-6">
            <div className="text-3xl mb-2">🏅</div>
            <div className="text-base font-semibold text-slate-500">Badge</div>
            <div className="text-3xl font-extrabold text-emerald-700 mt-1">{student.badges.length}</div>
          </div>
        </div>

        <div className="mt-6 grid sm:grid-cols-2 gap-3">
          <Link to="/sertifikat" className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-200 hover:bg-emerald-100 transition">
            <Award className="w-6 h-6 text-emerald-700" />
            <div>
              <div className="font-bold text-slate-800">Sertifikat Penyelesaian</div>
              <div className="text-sm text-slate-500">Unduh atau cetak sertifikat</div>
            </div>
          </Link>
          <Link to="/pengembang" className="flex items-center gap-3 p-4 rounded-2xl bg-cyan-50 border-2 border-cyan-200 hover:bg-cyan-100 transition">
            <Code2 className="w-6 h-6 text-cyan-700" />
            <div>
              <div className="font-bold text-slate-800">Tentang Pengembang</div>
              <div className="text-sm text-slate-500">Profil & kontak</div>
            </div>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-card border border-emerald-100 p-6 sm:p-8">
        <h2 className="text-xl font-extrabold text-slate-800 mb-5">📝 Jurnal Refleksi</h2>
        <p className="text-base text-slate-600 mb-4">
          Setelah mempelajari isu lingkungan, apakah pandanganmu terhadap lingkungan berubah?
        </p>
        <div className="grid md:grid-cols-3 gap-4 mb-5">
          {([
            { key: 'dulu' as const, label: '🌤️ DULU — Apa yang saya pikirkan?', ph: 'Tuliskan pandanganmu sebelumnya…' },
            { key: 'sekarang' as const, label: '🌱 SEKARANG — Apa yang saya pahami?', ph: 'Tuliskan pemahaman barumu…' },
            { key: 'selanjutnya' as const, label: '🚀 SELANJUTNYA — Apa yang akan saya lakukan?', ph: 'Tuliskan rencana tindakanmu…' },
          ]).map((f) => (
            <div key={f.key} className="rounded-2xl border-2 border-slate-200 p-4">
              <label className="block font-bold text-slate-700 mb-2">{f.label}</label>
              <textarea
                value={refl[f.key]}
                onChange={(e) => setRefl((p) => ({ ...p, [f.key]: e.target.value }))}
                rows={4}
                placeholder={f.ph}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none text-base resize-y"
              />
            </div>
          ))}
        </div>
        <button
          onClick={handleSave}
          className="px-6 py-3.5 rounded-2xl bg-emerald-600 text-white font-bold text-lg hover:bg-emerald-700 transition"
        >
          💾 Simpan Refleksi
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-card border border-emerald-100 p-6 sm:p-8">
        <h2 className="text-xl font-extrabold text-slate-800 mb-5">⚙️ Pengaturan</h2>
        <div className="space-y-4">
          <label className="flex items-center justify-between gap-4 p-4 rounded-2xl border-2 border-slate-200 cursor-pointer hover:bg-slate-50 transition">
            <div>
              <div className="font-bold text-slate-800">Reduce Motion</div>
              <div className="text-base text-slate-500">Kurangi animasi dan transisi pada aplikasi.</div>
            </div>
            <input
              type="checkbox"
              checked={student.settings.reduceMotion}
              onChange={(e) => setReduceMotion(e.target.checked)}
              className="w-6 h-6 accent-emerald-600 rounded cursor-pointer"
            />
          </label>
          <div className="p-4 rounded-2xl border-2 border-rose-200 bg-rose-50">
            <div className="font-bold text-rose-800 mb-1">Reset Progress</div>
            <div className="text-base text-rose-700 mb-3">
              Menghapus seluruh data belajar, badge, dan refleksi di perangkat ini.
            </div>
            <button
              onClick={() => {
                if (confirm('Yakin ingin menghapus seluruh progress belajar?') && confirm('Konfirmasi terakhir: semua data akan hilang.')) {
                  reset();
                  push('Progress telah direset.', 'info');
                }
              }}
              className="px-5 py-3 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-700 transition"
            >
              Reset Progress
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-card border border-emerald-100 p-6 sm:p-8">
        <h2 className="text-xl font-extrabold text-slate-800 mb-4">ℹ️ Tentang ECOQUEST</h2>
        <div className="space-y-2 text-base text-slate-600 leading-relaxed">
          <p><b>Nama aplikasi:</b> ECOQUEST — Misi Menyelamatkan Lingkungan</p>
          <p><b>Tagline:</b> Kenali Masalahnya. Buktikan Penyebabnya. Temukan Solusinya.</p>
          <p><b>Sasaran:</b> Siswa SMP Kelas 9, Fase D, usia 14–15 tahun</p>
          <p><b>Mata pelajaran:</b> Ilmu Pengetahuan Alam (IPA)</p>
          <p><b>Pendekatan:</b> Engage → Explore → Explain → Elaborate → Evaluate, dipadukan dengan Mastery Learning, Problem-Based Learning, Scientific Inquiry, dan Environmental Literacy.</p>
          <p><b>Ambang mastery:</b> ≥ 80% (Mastered) • 60–79% (Developing) • &lt; 60% (Need Support)</p>
          <p><b>Versi:</b> 2.0 (React + TypeScript + Vite)</p>
          <p><b>Penyimpanan:</b> Progres disimpan secara lokal di perangkat ini (localStorage). Tidak ada data yang dikirim ke server.</p>
        </div>
      </div>
    </div>
  );
}