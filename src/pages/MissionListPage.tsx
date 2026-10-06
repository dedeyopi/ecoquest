import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStudent } from '@/context/StudentContext';
import { MISSIONS } from '@/data/missions';

export default function MissionListPage() {
  const { student } = useStudent();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800">🗺️ Peta Misi</h1>
        <p className="text-slate-500 mt-2 text-lg">Delapan misi untuk memahami dan menjaga lingkungan kita.</p>
      </div>
      <div className="bg-white rounded-3xl shadow-card border border-emerald-100 p-5 sm:p-7">
        <div className="space-y-3">
          {MISSIONS.map((m, i) => {
            const prev = i > 0 ? MISSIONS[i - 1] : null;
            const unlocked = i === 0 || !!student.mastery[prev!.competency]?.attempts;
            const rec = student.mastery[m.competency];
            const status = rec?.status ?? 'locked';
            const label = { mastered: '✓ MASTERED', developing: 'DEVELOPING', needs_remediation: 'PERLU LATIHAN', learning: 'SEDANG BELAJAR', locked: '🔒 TERKUNCI' }[unlocked ? status : 'locked'];
            const cls = { mastered: 'bg-emerald-100 text-emerald-700', developing: 'bg-amber-100 text-amber-700', needs_remediation: 'bg-rose-100 text-rose-700', learning: 'bg-sky-100 text-sky-700', locked: 'bg-slate-100 text-slate-500' }[unlocked ? status : 'locked'];

            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={unlocked ? `/misi/${m.id}` : '#'}
                  onClick={(e) => !unlocked && e.preventDefault()}
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition ${
                    unlocked
                      ? 'border-emerald-100 bg-white hover:border-emerald-400 hover:bg-emerald-50/60'
                      : 'border-slate-100 bg-slate-50 opacity-70 cursor-not-allowed'
                  }`}
                >
                  <div className={`w-14 h-14 shrink-0 rounded-2xl grid place-items-center text-2xl ${unlocked ? 'bg-emerald-100' : 'bg-slate-200'}`}>
                    {unlocked ? m.icon : '🔒'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-base font-bold text-slate-800">Misi {m.num} — {m.title}</div>
                    <div className="text-sm text-slate-500 truncate">{m.subtitle}</div>
                  </div>
                  <div className="hidden sm:block">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${cls}`}>{label}</span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}