import { useStudent } from '@/context/StudentContext';
import { COMPETENCIES } from '@/data/competencies';
import { BADGES } from '@/data/badges';

export default function AchievementsPage() {
  const { student } = useStudent();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800">🏆 Pencapaian</h1>
        <p className="text-slate-500 mt-2 text-lg">Badge diberikan berdasarkan kompetensi yang telah kamu kuasai.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-card border border-emerald-100 p-6 sm:p-8">
        <h2 className="text-xl font-extrabold text-slate-800 mb-5">Status Kompetensi</h2>
        <div className="space-y-3">
          {COMPETENCIES.map((c) => {
            const rec = student.mastery[c.id];
            const status = rec?.status ?? 'locked';
            const badge = {
              mastered: '✓ MASTERED',
              developing: 'DEVELOPING',
              needs_remediation: 'PERLU LATIHAN',
              learning: 'SEDANG BELAJAR',
              locked: '🔒 BELUM',
            }[status];
            const cls = {
              mastered: 'bg-emerald-100 text-emerald-700',
              developing: 'bg-amber-100 text-amber-700',
              needs_remediation: 'bg-rose-100 text-rose-700',
              learning: 'bg-sky-100 text-sky-700',
              locked: 'bg-slate-100 text-slate-500',
            }[status];
            return (
              <div key={c.id} className="flex items-center justify-between gap-4 p-4 rounded-2xl border-2 border-slate-100 bg-slate-50/50">
                <div className="min-w-0">
                  <div className="font-bold text-slate-800">{c.title}</div>
                  <div className="text-sm text-slate-500">
                    {rec ? `Skor: ${rec.score}% • Percobaan: ${rec.attempts}` : 'Belum dikerjakan'}
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap ${cls}`}>{badge}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-card border border-emerald-100 p-6 sm:p-8">
        <h2 className="text-xl font-extrabold text-slate-800 mb-5">Koleksi Badge</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {Object.entries(BADGES).map(([id, b]) => {
            const owned = student.badges.some((x) => x.id === id);
            return (
              <div key={id} className={`rounded-2xl border-2 p-4 text-center ${owned ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-slate-50 opacity-60'}`}>
                <div className={`text-3xl mb-2 ${owned ? '' : 'grayscale'}`}>{b.icon}</div>
                <div className={`text-sm font-bold leading-snug ${owned ? 'text-emerald-800' : 'text-slate-500'}`}>{b.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}